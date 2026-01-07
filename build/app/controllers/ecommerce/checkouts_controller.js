import Address from '#models/address';
import Order from '#models/order';
import OrderItem from '#models/order_item';
import Payment from '#models/payment';
import Shipping from '#models/shipping';
import CartItem from '#models/cart_item';
import MidtransService from '#services/midtrans_service';
import RajaOngkirService from '#services/rajaongkir_service';
import Helper from '#services/helper';
import BugReportService from '#services/bug_report_service';
import db from '@adonisjs/lucid/services/db';
import env from '#start/env';
export default class CheckoutsController {
    midtransService;
    rajaOngkirService;
    constructor() {
        this.midtransService = new MidtransService();
        this.rajaOngkirService = new RajaOngkirService();
    }
    async view({ auth, inertia, response }) {
        const customer = auth.use('customer').user;
        const cartItems = await CartItem.query()
            .where('customerId', customer.id)
            .where('checked', true)
            .preload('product', (query) => {
            query.preload('images', (imgQuery) => {
                imgQuery.where('is_primary', true).limit(1);
            });
        })
            .preload('productVariant');
        if (cartItems.length === 0) {
            return response.redirect('/cart');
        }
        const addresses = await Address.query()
            .where('customerId', customer.id)
            .orderBy('isDefault', 'desc')
            .orderBy('createdAt', 'desc');
        const checkoutItems = cartItems.map((item) => {
            const basePrice = Number(item.product.discountPrice) || Number(item.product.price);
            const variantAdjustment = item.productVariant
                ? Number(item.productVariant.priceAdjustment) || 0
                : 0;
            const itemPrice = basePrice + variantAdjustment;
            return {
                id: item.id,
                productId: item.productId,
                variantId: item.productVariantId,
                quantity: item.quantity,
                product: {
                    id: item.product.id,
                    name: item.product.name,
                    slug: item.product.slug,
                    price: Number(item.product.price),
                    discountPrice: item.product.discountPrice ? Number(item.product.discountPrice) : null,
                    weight: item.product.weight,
                    image: item.product.images[0]
                        ? Helper.getFullImageUrl(item.product.images[0].url)
                        : 'https://placehold.co/400x400/1a1a2e/ffffff?text=No+Image',
                },
                variant: item.productVariant
                    ? {
                        id: item.productVariant.id,
                        name: item.productVariant.name,
                        value: item.productVariant.value,
                        price: itemPrice,
                    }
                    : null,
                itemPrice,
                subtotal: itemPrice * item.quantity,
                weight: item.product.weight * item.quantity,
            };
        });
        const subtotal = checkoutItems.reduce((sum, item) => sum + item.subtotal, 0);
        const totalWeight = checkoutItems.reduce((sum, item) => sum + item.weight, 0);
        const addressList = addresses.map((addr) => ({
            id: addr.id,
            label: addr.label,
            recipientName: addr.recipientName,
            phone: addr.phone,
            addressLine1: addr.addressLine1,
            addressLine2: addr.addressLine2,
            cityId: addr.cityId,
            cityName: addr.cityName,
            districtId: addr.districtId,
            districtName: addr.districtName,
            provinceId: addr.provinceId,
            provinceName: addr.provinceName,
            postalCode: addr.postalCode,
            isDefault: addr.isDefault,
        }));
        return inertia.render('checkout/index', {
            checkoutItems,
            addresses: addressList,
            summary: {
                subtotal,
                totalWeight,
                totalItems: checkoutItems.length,
            },
            customer: {
                id: customer.id,
                fullName: customer.fullName,
                email: customer.email,
                phone: customer.phone,
            },
            storeOrigin: {
                cityId: env.get('STORE_CITY_ID', ''),
                cityName: env.get('STORE_CITY_NAME', ''),
                districtId: env.get('STORE_DISTRICT_ID', ''),
                districtName: env.get('STORE_DISTRICT_NAME', ''),
            },
        });
    }
    async getShippingCosts({ request, response }) {
        const { origin, destination, weight, courier } = request.only([
            'origin',
            'destination',
            'weight',
            'courier',
        ]);
        try {
            if (!origin || !destination || !weight || !courier) {
                return response.status(400).json({
                    success: false,
                    message: 'Origin, destination, weight, dan courier diperlukan',
                });
            }
            const results = await this.rajaOngkirService.calculateCost(origin, destination, weight, courier);
            return response.json({
                success: true,
                data: { results },
            });
        }
        catch (error) {
            await BugReportService.logGuestError({ request }, 'CheckoutsController', 'getShippingCosts', error, { origin, destination, weight, courier });
            return response.status(500).json({
                success: false,
                message: 'Gagal mendapatkan ongkos kirim',
            });
        }
    }
    async processCheckout({ auth, request, response }) {
        const trx = await db.transaction();
        const { addressId, shippingOption, notes } = request.only([
            'addressId',
            'shippingOption',
            'notes',
        ]);
        try {
            const customer = auth.use('customer').user;
            const address = await Address.query()
                .where('id', addressId)
                .where('customerId', customer.id)
                .first();
            if (!address) {
                await trx.rollback();
                return response.status(400).json({
                    success: false,
                    message: 'Alamat tidak valid',
                });
            }
            const cartItems = await CartItem.query()
                .where('customerId', customer.id)
                .where('checked', true)
                .preload('product')
                .preload('productVariant');
            if (cartItems.length === 0) {
                await trx.rollback();
                return response.status(400).json({
                    success: false,
                    message: 'Keranjang kosong',
                });
            }
            let subtotal = 0;
            let totalWeight = 0;
            for (const item of cartItems) {
                const basePrice = Number(item.product.discountPrice) || Number(item.product.price);
                const variantAdjustment = item.productVariant
                    ? Number(item.productVariant.priceAdjustment) || 0
                    : 0;
                subtotal += (basePrice + variantAdjustment) * item.quantity;
                totalWeight += item.product.weight * item.quantity;
            }
            const shippingCost = shippingOption?.cost || 0;
            const orderNumber = `ORD-${Date.now()}-${Math.random().toString(36).substring(2, 7).toUpperCase()}`;
            const order = await Order.create({
                orderNumber,
                customerId: customer.id,
                addressId: address.id,
                status: 'pending_payment',
                subtotal,
                tax: 0,
                shippingCost,
                discount: 0,
                adminFee: 0,
                total: subtotal + shippingCost,
                customerNotes: notes || null,
            }, { client: trx });
            const orderItems = [];
            for (const item of cartItems) {
                const basePrice = Number(item.product.discountPrice) || Number(item.product.price);
                const variantAdjustment = item.productVariant
                    ? Number(item.productVariant.priceAdjustment) || 0
                    : 0;
                const itemPrice = basePrice + variantAdjustment;
                const orderItem = await OrderItem.create({
                    orderId: order.id,
                    productId: item.productId,
                    productVariantId: item.productVariantId,
                    productName: item.product.name,
                    productSku: item.product.sku,
                    variantName: item.productVariant?.name || null,
                    price: itemPrice,
                    quantity: item.quantity,
                    subtotal: itemPrice * item.quantity,
                }, { client: trx });
                orderItems.push(orderItem);
            }
            if (shippingOption) {
                await Shipping.create({
                    orderId: order.id,
                    courierCode: shippingOption.courierCode,
                    courierService: shippingOption.courierService,
                    courierName: shippingOption.courierName || shippingOption.courierCode.toUpperCase(),
                    serviceDescription: shippingOption.serviceDescription || null,
                    cost: shippingOption.cost,
                    weight: totalWeight,
                    etd: shippingOption.etd || null,
                    originCityId: env.get('STORE_CITY_ID', ''),
                    destinationCityId: address.cityId,
                }, { client: trx });
            }
            const itemDetails = [];
            for (const item of orderItems) {
                itemDetails.push({
                    id: `PROD-${item.productId}`,
                    name: item.productName.substring(0, 50) + (item.variantName ? ` - ${item.variantName}` : ''),
                    price: Math.round(item.price),
                    quantity: item.quantity,
                });
            }
            if (shippingCost > 0) {
                itemDetails.push({
                    id: `SHIP-${order.id}`,
                    name: `Ongkos Kirim`,
                    price: Math.round(shippingCost),
                    quantity: 1,
                });
            }
            const snapResult = await this.midtransService.createSnapToken({
                orderId: orderNumber,
                grossAmount: Math.round(order.total),
                customerDetails: {
                    firstName: customer.fullName.split(' ')[0],
                    lastName: customer.fullName.split(' ').slice(1).join(' ') || undefined,
                    email: customer.email,
                    phone: customer.phone || '',
                },
                itemDetails,
            });
            await Payment.create({
                orderId: order.id,
                paymentType: 'snap',
                orderIdMidtrans: orderNumber,
                grossAmount: order.total,
                transactionStatus: 'pending',
                snapToken: snapResult.token,
                snapRedirectUrl: snapResult.redirect_url,
            }, { client: trx });
            await CartItem.query({ client: trx })
                .where('customerId', customer.id)
                .where('checked', true)
                .delete();
            await trx.commit();
            return response.json({
                success: true,
                message: 'Order berhasil dibuat',
                data: {
                    order: {
                        id: order.id,
                        orderNumber: order.orderNumber,
                        total: order.total,
                    },
                    payment: {
                        orderId: orderNumber,
                        snapToken: snapResult.token,
                        snapRedirectUrl: snapResult.redirect_url,
                    },
                },
            });
        }
        catch (error) {
            await trx.rollback();
            await BugReportService.logCustomerError({ request, auth }, 'CheckoutsController', 'processCheckout', error, { addressId, shippingOption }, 'high');
            return response.status(500).json({
                success: false,
                message: 'Gagal memproses checkout',
            });
        }
    }
    async getProvinces({ response }) {
        try {
            const provinces = await this.rajaOngkirService.getProvinces();
            return response.json({
                success: true,
                data: provinces,
            });
        }
        catch (error) {
            await BugReportService.log({
                module: 'CheckoutsController',
                action: 'getProvinces',
                error,
                userType: 'guest',
            });
            return response.status(500).json({
                success: false,
                message: 'Gagal mendapatkan data provinsi',
            });
        }
    }
    async getCities({ request, response }) {
        try {
            const provinceId = request.input('provinceId');
            const cities = await this.rajaOngkirService.getCities(provinceId);
            return response.json({
                success: true,
                data: cities,
            });
        }
        catch (error) {
            await BugReportService.logGuestError({ request }, 'CheckoutsController', 'getCities', error, {
                provinceId: request.input('provinceId'),
            });
            return response.status(500).json({
                success: false,
                message: 'Gagal mendapatkan data kota',
            });
        }
    }
    async getSubdistricts({ request, response }) {
        try {
            const cityId = request.input('cityId');
            if (!cityId) {
                return response.status(400).json({
                    success: false,
                    message: 'City ID diperlukan',
                });
            }
            const subdistricts = await this.rajaOngkirService.getSubdistricts(cityId);
            return response.json({
                success: true,
                data: subdistricts,
            });
        }
        catch (error) {
            await BugReportService.logGuestError({ request }, 'CheckoutsController', 'getSubdistricts', error, { cityId: request.input('cityId') });
            return response.status(500).json({
                success: false,
                message: 'Gagal mendapatkan data kecamatan',
            });
        }
    }
    async saveAddress({ auth, request, response }) {
        try {
            const customer = auth.use('customer').user;
            const data = request.only([
                'label',
                'recipientName',
                'phone',
                'addressLine1',
                'addressLine2',
                'cityId',
                'cityName',
                'districtId',
                'districtName',
                'provinceId',
                'provinceName',
                'postalCode',
                'isDefault',
            ]);
            if (data.isDefault) {
                await Address.query().where('customerId', customer.id).update({ isDefault: false });
            }
            const address = await Address.create({
                customerId: customer.id,
                label: data.label || 'Alamat',
                recipientName: data.recipientName,
                phone: data.phone,
                addressLine1: data.addressLine1,
                addressLine2: data.addressLine2 || null,
                cityId: data.cityId,
                cityName: data.cityName,
                districtId: data.districtId || null,
                districtName: data.districtName || null,
                provinceId: data.provinceId,
                provinceName: data.provinceName,
                postalCode: data.postalCode,
                country: 'Indonesia',
                isDefault: data.isDefault || false,
            });
            return response.status(201).json({
                success: true,
                message: 'Alamat berhasil disimpan',
                data: address,
            });
        }
        catch (error) {
            console.error('Save address error:', error);
            return response.status(500).json({
                success: false,
                message: 'Gagal menyimpan alamat',
            });
        }
    }
}
//# sourceMappingURL=checkouts_controller.js.map