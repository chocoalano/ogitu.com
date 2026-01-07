/*
|--------------------------------------------------------------------------
| Admin Routes
|--------------------------------------------------------------------------
|
| Routes for admin panel
|
*/

import router from '@adonisjs/core/services/router'
import { middleware } from '../kernel.js'
import {
  throttle,
  authThrottle,
  otpThrottle,
  adminThrottle,
  writeThrottle,
  bulkThrottle,
} from '../limiter.js'

const AdminAuthController = () => import('#controllers/admin/auth_controller')
const AdminDashboardController = () => import('#controllers/admin/dashboard_controller')
const AdminProductsController = () => import('#controllers/admin/products_controller')
const AdminCategoriesController = () => import('#controllers/admin/categories_controller')
const AdminOrdersController = () => import('#controllers/admin/orders_controller')
const AdminCustomersController = () => import('#controllers/admin/customers_controller')
const AdminReviewsController = () => import('#controllers/admin/reviews_controller')
const AdminNotificationsController = () => import('#controllers/admin/notifications_controller')
const AdminDiscountsController = () => import('#controllers/admin/discounts_controller')
const AdminVouchersController = () => import('#controllers/admin/vouchers_controller')
const AdminFlashSalesController = () => import('#controllers/admin/flash_sales_controller')
const AdminFinanceController = () => import('#controllers/admin/finance_controller')
const AdminAnalyticsController = () => import('#controllers/admin/analytics_controller')
const AdminSettingsController = () => import('#controllers/admin/settings_controller')
const AdminNetworkController = () => import('#controllers/admin/network_controller')

// Admin Auth routes (with strict rate limiting)
router
  .get('/admin', ({ response }) => {
    return response.redirect().toRoute('admin.login')
  })
  .as('admin')

router.get('/admin/login', [AdminAuthController, 'showLogin']).as('admin.login').use(throttle)

router.post('/admin/login', [AdminAuthController, 'login']).as('admin.login.post').use(authThrottle)

// OTP routes with strict rate limiting (3 requests per 5 minutes)
router
  .post('/admin/auth/send-otp', [AdminAuthController, 'sendOtp'])
  .as('admin.sendOtp')
  .use(otpThrottle)

router
  .post('/admin/auth/verify-otp', [AdminAuthController, 'verifyOtp'])
  .as('admin.verifyOtp')
  .use(authThrottle)

router
  .post('/admin/auth/resend-otp', [AdminAuthController, 'resendOtp'])
  .as('admin.resendOtp')
  .use(otpThrottle)

router.post('/admin/logout', [AdminAuthController, 'logout']).as('admin.logout').use(throttle)

// Admin Dashboard routes (protected with admin rate limiting)
router
  .group(() => {
    router.get('/dashboard', [AdminDashboardController, 'index']).as('admin.dashboard')

    // Products routes (GET - read operations)
    router.get('/products', [AdminProductsController, 'index']).as('admin.products.index')
    router.get('/products/create', [AdminProductsController, 'create']).as('admin.products.create')
    router
      .get('/products/inventory', [AdminProductsController, 'inventory'])
      .as('admin.products.inventory')
    router
      .get('/products/categories', [AdminCategoriesController, 'productsCategories'])
      .as('admin.products.categories')
    router.get('/products/:id', [AdminProductsController, 'show']).as('admin.products.show')
    router.get('/products/:id/edit', [AdminProductsController, 'edit']).as('admin.products.edit')

    // Products write operations with stricter rate limiting
    router
      .group(() => {
        router
          .post('/products/categories', [AdminCategoriesController, 'storeCategory'])
          .as('admin.products.categories.store')
        router
          .post('/products/categories/:id', [AdminCategoriesController, 'updateCategory'])
          .as('admin.products.categories.update')
        router
          .delete('/products/categories/:id', [AdminCategoriesController, 'destroyCategory'])
          .as('admin.products.categories.destroy')
        router
          .patch('/products/categories/:id/toggle', [
            AdminCategoriesController,
            'toggleCategoryActive',
          ])
          .as('admin.products.categories.toggle')
        router.post('/products', [AdminProductsController, 'store']).as('admin.products.store')
        router
          .post('/products/update-stock', [AdminProductsController, 'updateStock'])
          .as('admin.products.updateStock')
        router.put('/products/:id', [AdminProductsController, 'update']).as('admin.products.update')
        router
          .patch('/products/:id/status', [AdminProductsController, 'toggleStatus'])
          .as('admin.products.toggleStatus')
        router
          .patch('/products/:id/featured', [AdminProductsController, 'toggleFeatured'])
          .as('admin.products.toggleFeatured')
        router
          .post('/products/:id/duplicate', [AdminProductsController, 'duplicate'])
          .as('admin.products.duplicate')
        router
          .delete('/products/:id', [AdminProductsController, 'destroy'])
          .as('admin.products.destroy')
      })
      .use(writeThrottle)

    // Bulk operations with even stricter rate limiting
    router
      .post('/products/inventory/bulk-update', [AdminProductsController, 'updateStock'])
      .as('admin.products.bulkUpdateStock')
      .use(bulkThrottle)

    // Categories routes
    router.get('/categories', [AdminCategoriesController, 'index']).as('admin.categories.index')
    router.post('/categories', [AdminCategoriesController, 'store']).as('admin.categories.store')
    router
      .put('/categories/:id', [AdminCategoriesController, 'update'])
      .as('admin.categories.update')
    router
      .delete('/categories/:id', [AdminCategoriesController, 'destroy'])
      .as('admin.categories.destroy')
    router
      .patch('/categories/:id/active', [AdminCategoriesController, 'toggleActive'])
      .as('admin.categories.toggleActive')

    // Orders routes
    router.get('/orders', [AdminOrdersController, 'index']).as('admin.orders.index')
    router.get('/orders/:id', [AdminOrdersController, 'show']).as('admin.orders.show')
    router
      .patch('/orders/:id/status', [AdminOrdersController, 'updateStatus'])
      .as('admin.orders.updateStatus')

    // Users routes (Admin management - superadmin only)
    const AdminUsersController = () => import('#controllers/admin/users_controller')
    router
      .group(() => {
        router.get('/users', [AdminUsersController, 'index']).as('admin.users.index')
        router.get('/users/create', [AdminUsersController, 'create']).as('admin.users.create')
        router.post('/users', [AdminUsersController, 'store']).as('admin.users.store')
        router.get('/users/:id', [AdminUsersController, 'show']).as('admin.users.show')
        router.get('/users/:id/edit', [AdminUsersController, 'edit']).as('admin.users.edit')
        router.put('/users/:id', [AdminUsersController, 'update']).as('admin.users.update')
        router.delete('/users/:id', [AdminUsersController, 'destroy']).as('admin.users.destroy')
      })
      .use([middleware.superadmin()])

    // Customers routes
    router.get('/customers', [AdminCustomersController, 'index']).as('admin.customers.index')
    router
      .get('/customers/create', [AdminCustomersController, 'create'])
      .as('admin.customers.create')
    router.post('/customers', [AdminCustomersController, 'store']).as('admin.customers.store')
    router.get('/customers/:id', [AdminCustomersController, 'show']).as('admin.customers.show')
    router.get('/customers/:id/edit', [AdminCustomersController, 'edit']).as('admin.customers.edit')
    router.put('/customers/:id', [AdminCustomersController, 'update']).as('admin.customers.update')
    router
      .delete('/customers/:id', [AdminCustomersController, 'destroy'])
      .as('admin.customers.destroy')
    router
      .patch('/customers/:id/active', [AdminCustomersController, 'toggleActive'])
      .as('admin.customers.toggleActive')
    router
      .patch('/customers/:id/verified', [AdminCustomersController, 'toggleVerified'])
      .as('admin.customers.toggleVerified')
    router
      .post('/customers/:id/impersonate', [AdminCustomersController, 'impersonate'])
      .as('admin.customers.impersonate')
    router
      .post('/impersonate/stop', [AdminCustomersController, 'stopImpersonate'])
      .as('admin.impersonate.stop')

    // Reviews routes
    router.get('/reviews', [AdminReviewsController, 'index']).as('admin.reviews.index')
    router
      .patch('/reviews/:id/approve', [AdminReviewsController, 'approve'])
      .as('admin.reviews.approve')
    router
      .patch('/reviews/:id/reject', [AdminReviewsController, 'reject'])
      .as('admin.reviews.reject')
    router.post('/reviews/:id/reply', [AdminReviewsController, 'reply']).as('admin.reviews.reply')
    router.delete('/reviews/:id', [AdminReviewsController, 'destroy']).as('admin.reviews.destroy')

    // Notifications routes
    router
      .get('/notifications', [AdminNotificationsController, 'index'])
      .as('admin.notifications.index')
    router
      .patch('/notifications/:id/read', [AdminNotificationsController, 'markAsRead'])
      .as('admin.notifications.markAsRead')
    router
      .post('/notifications/read-all', [AdminNotificationsController, 'markAllAsRead'])
      .as('admin.notifications.markAllAsRead')
    router
      .delete('/notifications/:id', [AdminNotificationsController, 'destroy'])
      .as('admin.notifications.destroy')
    router
      .delete('/notifications/clear-read', [AdminNotificationsController, 'clearRead'])
      .as('admin.notifications.clearRead')

    // Promotions - Discounts routes
    router
      .get('/promotions/discounts', [AdminDiscountsController, 'index'])
      .as('admin.discounts.index')
    router
      .get('/promotions/discounts/create', [AdminDiscountsController, 'create'])
      .as('admin.discounts.create')
    router
      .post('/promotions/discounts', [AdminDiscountsController, 'store'])
      .as('admin.discounts.store')
    router
      .get('/promotions/discounts/:id', [AdminDiscountsController, 'show'])
      .as('admin.discounts.show')
    router
      .get('/promotions/discounts/:id/edit', [AdminDiscountsController, 'edit'])
      .as('admin.discounts.edit')
    router
      .put('/promotions/discounts/:id', [AdminDiscountsController, 'update'])
      .as('admin.discounts.update')
    router
      .delete('/promotions/discounts/:id', [AdminDiscountsController, 'destroy'])
      .as('admin.discounts.destroy')
    router
      .post('/promotions/discounts/:id/toggle', [AdminDiscountsController, 'toggleStatus'])
      .as('admin.discounts.toggle')

    // Promotions - Vouchers routes
    router
      .get('/promotions/vouchers', [AdminVouchersController, 'index'])
      .as('admin.vouchers.index')
    router
      .get('/promotions/vouchers/create', [AdminVouchersController, 'create'])
      .as('admin.vouchers.create')
    router
      .post('/promotions/vouchers', [AdminVouchersController, 'store'])
      .as('admin.vouchers.store')
    router
      .get('/promotions/vouchers/generate-code', [AdminVouchersController, 'generateCode'])
      .as('admin.vouchers.generateCode')
    router
      .get('/promotions/vouchers/:id', [AdminVouchersController, 'show'])
      .as('admin.vouchers.show')
    router
      .get('/promotions/vouchers/:id/edit', [AdminVouchersController, 'edit'])
      .as('admin.vouchers.edit')
    router
      .put('/promotions/vouchers/:id', [AdminVouchersController, 'update'])
      .as('admin.vouchers.update')
    router
      .delete('/promotions/vouchers/:id', [AdminVouchersController, 'destroy'])
      .as('admin.vouchers.destroy')
    router
      .post('/promotions/vouchers/:id/toggle', [AdminVouchersController, 'toggleStatus'])
      .as('admin.vouchers.toggle')

    // Promotions - Flash Sales routes
    router
      .get('/promotions/flash-sale', [AdminFlashSalesController, 'index'])
      .as('admin.flashSales.index')
    router
      .get('/promotions/flash-sale/create', [AdminFlashSalesController, 'create'])
      .as('admin.flashSales.create')
    router
      .post('/promotions/flash-sale', [AdminFlashSalesController, 'store'])
      .as('admin.flashSales.store')
    router
      .get('/promotions/flash-sale/:id', [AdminFlashSalesController, 'show'])
      .as('admin.flashSales.show')
    router
      .get('/promotions/flash-sale/:id/edit', [AdminFlashSalesController, 'edit'])
      .as('admin.flashSales.edit')
    router
      .put('/promotions/flash-sale/:id', [AdminFlashSalesController, 'update'])
      .as('admin.flashSales.update')
    router
      .delete('/promotions/flash-sale/:id', [AdminFlashSalesController, 'destroy'])
      .as('admin.flashSales.destroy')
    router
      .post('/promotions/flash-sale/:id/toggle', [AdminFlashSalesController, 'toggleStatus'])
      .as('admin.flashSales.toggle')

    // Finance - Withdraw routes
    router
      .get('/finance/withdraw', [AdminFinanceController, 'withdrawIndex'])
      .as('admin.finance.withdraw.index')
    router
      .get('/finance/withdraw/:id', [AdminFinanceController, 'withdrawShow'])
      .as('admin.finance.withdraw.show')
    router
      .post('/finance/withdraw/:id/approve', [AdminFinanceController, 'withdrawApprove'])
      .as('admin.finance.withdraw.approve')
    router
      .post('/finance/withdraw/:id/reject', [AdminFinanceController, 'withdrawReject'])
      .as('admin.finance.withdraw.reject')

    // Finance - Transactions routes
    router
      .get('/finance/transactions', [AdminFinanceController, 'transactionsIndex'])
      .as('admin.finance.transactions.index')
    router
      .get('/finance/transactions/:id', [AdminFinanceController, 'transactionShow'])
      .as('admin.finance.transactions.show')

    // Analytics routes
    router.get('/analytics/sales', [AdminAnalyticsController, 'sales']).as('admin.analytics.sales')
    router
      .get('/analytics/products', [AdminAnalyticsController, 'products'])
      .as('admin.analytics.products')
    router
      .get('/analytics/finance', [AdminAnalyticsController, 'finance'])
      .as('admin.analytics.finance')

    // Settings - Address/Warehouse routes
    router
      .get('/settings/address', [AdminSettingsController, 'addressIndex'])
      .as('admin.settings.address.index')
    router
      .get('/settings/address/create', [AdminSettingsController, 'addressCreate'])
      .as('admin.settings.address.create')
    router
      .post('/settings/address', [AdminSettingsController, 'addressStore'])
      .as('admin.settings.address.store')
    router
      .get('/settings/address/:id/edit', [AdminSettingsController, 'addressEdit'])
      .as('admin.settings.address.edit')
    router
      .put('/settings/address/:id', [AdminSettingsController, 'addressUpdate'])
      .as('admin.settings.address.update')
    router
      .delete('/settings/address/:id', [AdminSettingsController, 'addressDestroy'])
      .as('admin.settings.address.destroy')
    router
      .post('/settings/address/:id/default', [AdminSettingsController, 'addressSetDefault'])
      .as('admin.settings.address.setDefault')
    router
      .post('/settings/address/:id/toggle', [AdminSettingsController, 'addressToggleActive'])
      .as('admin.settings.address.toggle')

    // Settings - Shipping routes
    router
      .get('/settings/shipping', [AdminSettingsController, 'shippingIndex'])
      .as('admin.settings.shipping.index')
    router
      .post('/settings/shipping/courier', [AdminSettingsController, 'shippingAddCourier'])
      .as('admin.settings.shipping.addCourier')
    router
      .put('/settings/shipping/courier/:id', [AdminSettingsController, 'shippingUpdateCourier'])
      .as('admin.settings.shipping.updateCourier')
    router
      .delete('/settings/shipping/courier/:id', [AdminSettingsController, 'shippingRemoveCourier'])
      .as('admin.settings.shipping.removeCourier')
    router
      .post('/settings/shipping/courier/:id/toggle', [
        AdminSettingsController,
        'shippingToggleCourier',
      ])
      .as('admin.settings.shipping.toggleCourier')
    router
      .post('/settings/shipping/reorder', [AdminSettingsController, 'shippingReorderCouriers'])
      .as('admin.settings.shipping.reorder')

    // Settings - Notification routes
    router
      .get('/settings/notifications', [AdminSettingsController, 'notificationsIndex'])
      .as('admin.settings.notifications.index')
    router
      .put('/settings/notifications/:id', [AdminSettingsController, 'notificationsUpdate'])
      .as('admin.settings.notifications.update')
    router
      .post('/settings/notifications/bulk', [AdminSettingsController, 'notificationsBulkUpdate'])
      .as('admin.settings.notifications.bulkUpdate')

    // Settings - Location API routes
    router
      .get('/api/locations/provinces', [AdminSettingsController, 'getProvinces'])
      .as('admin.api.locations.provinces')
    router
      .get('/api/locations/cities/:provinceId', [AdminSettingsController, 'getCities'])
      .as('admin.api.locations.cities')
    router
      .get('/api/locations/districts/:cityId', [AdminSettingsController, 'getDistricts'])
      .as('admin.api.locations.districts')

    // Network MLM management routes
    router.get('/network', [AdminNetworkController, 'index']).as('admin.network.index')
    router
      .get('/network/:affiliateId/referred-customers', [
        AdminNetworkController,
        'getReferredCustomers',
      ])
      .as('admin.network.referredCustomers')
    router
      .get('/network/:affiliateId/tree', [AdminNetworkController, 'getNetworkTree'])
      .as('admin.network.tree')
    router
      .get('/network/:affiliateId/affiliated-customers', [
        AdminNetworkController,
        'getAffiliatedCustomers',
      ])
      .as('admin.network.affiliatedCustomers')
    router
      .post('/network/place', [AdminNetworkController, 'placeCustomer'])
      .as('admin.network.place')
    router
      .post('/network/bulk-place', [AdminNetworkController, 'bulkPlaceCustomers'])
      .as('admin.network.bulkPlace')
    router
      .delete('/network/referral/:referralId', [AdminNetworkController, 'removeFromTree'])
      .as('admin.network.remove')
    router
      .post('/network/create-affiliate', [AdminNetworkController, 'createAffiliate'])
      .as('admin.network.createAffiliate')
    router
      .get('/network/customers-without-affiliate', [
        AdminNetworkController,
        'getCustomersWithoutAffiliate',
      ])
      .as('admin.network.customersWithoutAffiliate')
    router
      .get('/network/affiliated-without-referral-code', [
        AdminNetworkController,
        'getAffiliatedCustomersWithoutReferralCode',
      ])
      .as('admin.network.affiliatedWithoutReferralCode')
    router
      .post('/network/setup-referral-code', [
        AdminNetworkController,
        'setupReferralCodeForCustomer',
      ])
      .as('admin.network.setupReferralCode')
    router
      .post('/network/bulk-setup-referral-codes', [
        AdminNetworkController,
        'bulkSetupReferralCodes',
      ])
      .as('admin.network.bulkSetupReferralCodes')
    router
      .get('/network/:affiliateId/search-customers', [
        AdminNetworkController,
        'searchCustomersForTree',
      ])
      .as('admin.network.searchCustomersForTree')
    router
      .post('/network/add-member', [AdminNetworkController, 'addMemberToTree'])
      .as('admin.network.addMember')

    // System Health & Queue management routes
    const HealthController = () => import('#controllers/admin/health_controller')
    const QueueController = () => import('#controllers/admin/queue_controller')

    // Health check routes (accessible by all admins)
    router.get('/api/health', [HealthController, 'health']).as('admin.api.health')
    router.get('/api/queue-stats', [HealthController, 'queueStats']).as('admin.api.queueStats')
    router
      .get('/api/system-dashboard', [HealthController, 'dashboardData'])
      .as('admin.api.systemDashboard')

    // Queue management routes (superadmin only)
    router
      .group(() => {
        router.get('/stats', [QueueController, 'stats']).as('admin.queue.stats')
        router.get('/:queue/failed', [QueueController, 'failedJobs']).as('admin.queue.failed')
        router.post('/:queue/retry/:jobId', [QueueController, 'retryJob']).as('admin.queue.retry')
        router.delete('/:queue/job/:jobId', [QueueController, 'removeJob']).as('admin.queue.remove')
        router.post('/:queue/pause', [QueueController, 'pauseQueue']).as('admin.queue.pause')
        router.post('/:queue/resume', [QueueController, 'resumeQueue']).as('admin.queue.resume')
        router.post('/:queue/clean', [QueueController, 'cleanQueue']).as('admin.queue.clean')
      })
      .prefix('/queue')
      .use([middleware.superadmin()])

    // Articles routes
    const AdminArticlesController = () => import('#controllers/admin/articles_controller')

    // Read operations
    router.get('/articles', [AdminArticlesController, 'index']).as('admin.articles.index')
    router.get('/articles/create', [AdminArticlesController, 'create']).as('admin.articles.create')
    router.get('/articles/:id', [AdminArticlesController, 'show']).as('admin.articles.show')
    router.get('/articles/:id/edit', [AdminArticlesController, 'edit']).as('admin.articles.edit')

    // Write operations with rate limiting
    router
      .group(() => {
        router.post('/articles', [AdminArticlesController, 'store']).as('admin.articles.store')
        router.put('/articles/:id', [AdminArticlesController, 'update']).as('admin.articles.update')
        router
          .delete('/articles/:id', [AdminArticlesController, 'destroy'])
          .as('admin.articles.destroy')
        router
          .patch('/articles/:id/status', [AdminArticlesController, 'toggleStatus'])
          .as('admin.articles.toggleStatus')
        router
          .patch('/articles/:id/featured', [AdminArticlesController, 'toggleFeatured'])
          .as('admin.articles.toggleFeatured')
        router
          .post('/articles/:id/duplicate', [AdminArticlesController, 'duplicate'])
          .as('admin.articles.duplicate')
        router
          .post('/articles/upload-image', [AdminArticlesController, 'uploadImage'])
          .as('admin.articles.uploadImage')
      })
      .use(writeThrottle)

    // API endpoint for admin data
    router.get('/api/me', [AdminDashboardController, 'me']).as('admin.api.me')
  })
  .prefix('/admin')
  .use([middleware.auth({ guards: ['web'] }), middleware.admin(), adminThrottle])
