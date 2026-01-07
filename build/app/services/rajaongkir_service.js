import env from '#start/env';
import axios from 'axios';
import logger from '@adonisjs/core/services/logger';
export default class RajaOngkirService {
    apiKey;
    deliveryApiKey;
    baseUrl;
    constructor() {
        this.apiKey = env.get('RAJAONGKIR_API_KEY_SHIPPING');
        this.deliveryApiKey = env.get('RAJAONGKIR_API_KEY_DELIVERY');
        this.baseUrl = env.get('RAJAONGKIR_BASE_URL');
    }
    async getProvinces() {
        try {
            const response = await axios.get(`${this.baseUrl}/destination/province`, {
                headers: {
                    key: this.apiKey,
                },
            });
            return response.data?.data || [];
        }
        catch (error) {
            console.error('RajaOngkir Get Provinces Error:', error);
            return [];
        }
    }
    async getCities(provinceId) {
        try {
            if (!provinceId) {
                return [];
            }
            const response = await axios.get(`${this.baseUrl}/destination/city/${provinceId}`, {
                headers: {
                    key: this.apiKey,
                },
            });
            return response.data?.data || [];
        }
        catch (error) {
            console.error('RajaOngkir Get Cities Error:', error);
            return [];
        }
    }
    async getSubdistricts(cityId) {
        try {
            if (!cityId) {
                return [];
            }
            const response = await axios.get(`${this.baseUrl}/destination/district/${cityId}`, {
                headers: {
                    key: this.apiKey,
                },
            });
            return response.data?.data || [];
        }
        catch (error) {
            console.error('RajaOngkir Get Districts Error:', error);
            return [];
        }
    }
    async calculateCost(originDistrictId, destinationDistrictId, weight, courier) {
        const formData = new URLSearchParams();
        formData.append('origin', originDistrictId);
        formData.append('destination', destinationDistrictId);
        formData.append('weight', weight.toString());
        formData.append('courier', courier);
        const endpoints = [
            '/calculate/district/domestic-cost',
            '/cost',
            '/v1/calculate/domestic-cost',
            '/calculate/domestic-cost',
        ];
        for (const endpoint of endpoints) {
            try {
                logger.info(`Trying endpoint: ${this.baseUrl}${endpoint}`);
                const response = await axios.post(`${this.baseUrl}${endpoint}`, formData.toString(), {
                    headers: {
                        'key': this.apiKey,
                        'Content-Type': 'application/x-www-form-urlencoded',
                    },
                });
                logger.info(`Success with endpoint: ${endpoint}`, response.data);
                let services = [];
                if (response.data?.data && Array.isArray(response.data.data)) {
                    services = response.data.data;
                }
                else if (response.data?.rajaongkir?.results) {
                    return response.data.rajaongkir.results;
                }
                else if (Array.isArray(response.data)) {
                    services = response.data;
                }
                if (services.length === 0) {
                    continue;
                }
                const courierServices = services.filter((service) => service.code?.toLowerCase() === courier.toLowerCase());
                if (courierServices.length === 0) {
                    if (services[0]?.costs) {
                        return services;
                    }
                    continue;
                }
                const courierName = courierServices[0]?.name || courier.toUpperCase();
                return [
                    {
                        code: courier,
                        name: courierName,
                        costs: courierServices.map((service) => ({
                            service: service.service || '',
                            description: service.description || '',
                            cost: [
                                {
                                    value: service.cost || 0,
                                    etd: service.etd || '',
                                    note: '',
                                },
                            ],
                        })),
                    },
                ];
            }
            catch (error) {
                if (axios.isAxiosError(error)) {
                    logger.error(`Endpoint ${endpoint} failed:`, error.response?.status, error.response?.data?.message || error.message);
                }
                continue;
            }
        }
        console.warn('All shipping cost endpoints failed', {
            origin: originDistrictId,
            destination: destinationDistrictId,
            courier,
        });
        return [
            {
                code: courier,
                name: courier.toUpperCase(),
                costs: [],
            },
        ];
    }
    async getShippingOptions(origin, destination, weight) {
        const couriers = this.getCommonCouriers();
        const allOptions = [];
        for (const [courierCode] of Object.entries(couriers)) {
            try {
                const results = await this.calculateCost(origin, destination, weight, courierCode);
                if (results && results.length > 0) {
                    const courierData = results[0];
                    if (courierData.costs && courierData.costs.length > 0) {
                        const services = courierData.costs.map((cost) => ({
                            courier_code: courierData.code,
                            courier_name: courierData.name,
                            service: cost.service,
                            description: cost.description,
                            cost: cost.cost[0]?.value || 0,
                            etd: cost.cost[0]?.etd || '',
                        }));
                        allOptions.push(...services);
                    }
                }
            }
            catch (error) {
                console.error(`Error fetching ${courierCode} rates:`, error);
            }
        }
        return allOptions;
    }
    getCommonCouriers() {
        return {
            jne: 'JNE',
            pos: 'POS Indonesia',
            tiki: 'TIKI',
            jnt: 'J&T Express',
            sicepat: 'SiCepat',
            anteraja: 'AnterAja',
            ninja: 'Ninja Xpress',
            idexpress: 'ID Express',
            rpx: 'RPX',
            sap: 'SAP Express',
        };
    }
    async trackWaybill(waybill, courier) {
        try {
            const formData = new URLSearchParams();
            formData.append('waybill', waybill);
            formData.append('courier', courier);
            const response = await axios.post(`${this.baseUrl}/track/waybill`, formData.toString(), {
                headers: {
                    'key': this.deliveryApiKey,
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
            });
            return response.data?.data || null;
        }
        catch (error) {
            console.error('RajaOngkir Tracking Error:', error);
            return null;
        }
    }
    async getTrackingInfo(waybill, courier) {
        const result = await this.trackWaybill(waybill, courier);
        if (!result) {
            return null;
        }
        return {
            waybill: result.waybill,
            courier: {
                code: courier,
                name: result.summary?.courier_name || courier.toUpperCase(),
            },
            status: result.delivery_status?.status || 'UNKNOWN',
            statusDescription: result.delivery_status?.pod_receiver || '',
            shipper: result.summary?.shipper_name || '',
            receiver: result.summary?.receiver_name || '',
            origin: result.summary?.origin || '',
            destination: result.summary?.destination || '',
            history: result.manifest?.map((item) => ({
                date: item.manifest_date,
                time: item.manifest_time,
                description: item.manifest_description,
                city: item.city_name,
            })) || [],
        };
    }
}
//# sourceMappingURL=rajaongkir_service.js.map