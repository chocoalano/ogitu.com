import AnalyticsRepository from '#repositories/analytics_repository';
export default class AnalyticsController {
    analyticsRepository;
    constructor() {
        this.analyticsRepository = new AnalyticsRepository();
    }
    async sales({ inertia, request }) {
        const period = request.input('period', '30days');
        const dateFrom = request.input('dateFrom', '');
        const dateTo = request.input('dateTo', '');
        const { startDate, endDate } = this.analyticsRepository.getDateRange(period, dateFrom, dateTo);
        const analyticsData = await this.analyticsRepository.getSalesAnalytics({
            period,
            dateFrom,
            dateTo,
        });
        return inertia.render('admin/analytics/sales/index', {
            ...analyticsData,
            filters: {
                period,
                dateFrom: dateFrom || startDate.toISODate(),
                dateTo: dateTo || endDate.toISODate(),
            },
        });
    }
    async products({ inertia, request }) {
        const period = request.input('period', '30days');
        const dateFrom = request.input('dateFrom', '');
        const dateTo = request.input('dateTo', '');
        const sortBy = request.input('sortBy', 'totalSold');
        const search = request.input('search', '');
        const page = request.input('page', 1);
        const { startDate, endDate } = this.analyticsRepository.getDateRange(period, dateFrom, dateTo);
        const analyticsData = await this.analyticsRepository.getProductAnalytics({
            period,
            dateFrom,
            dateTo,
            sortBy,
            search,
            page,
        });
        return inertia.render('admin/analytics/products/index', {
            ...analyticsData,
            filters: {
                period,
                dateFrom: dateFrom || startDate.toISODate(),
                dateTo: dateTo || endDate.toISODate(),
                sortBy,
                search,
            },
        });
    }
    async finance({ inertia, request }) {
        const period = request.input('period', '30days');
        const dateFrom = request.input('dateFrom', '');
        const dateTo = request.input('dateTo', '');
        const { startDate, endDate } = this.analyticsRepository.getDateRange(period, dateFrom, dateTo);
        const analyticsData = await this.analyticsRepository.getFinanceAnalytics({
            period,
            dateFrom,
            dateTo,
        });
        return inertia.render('admin/analytics/finance/index', {
            ...analyticsData,
            filters: {
                period,
                dateFrom: dateFrom || startDate.toISODate(),
                dateTo: dateTo || endDate.toISODate(),
            },
        });
    }
}
//# sourceMappingURL=analytics_controller.js.map