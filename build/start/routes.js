import router from '@adonisjs/core/services/router';
import { middleware } from './kernel.js';
import transmit from '@adonisjs/transmit/services/main';
import { throttle, authThrottle, otpThrottle, publicThrottle, customerApiThrottle, checkoutThrottle, webhookThrottle, } from './limiter.js';
transmit.registerRoutes();
const HomeController = () => import('#controllers/ecommerce/home_controller');
const CollectionsController = () => import('#controllers/ecommerce/collections_controller');
const ProductsController = () => import('#controllers/ecommerce/products_controller');
const CartsController = () => import('#controllers/ecommerce/carts_controller');
const WishlistsController = () => import('#controllers/ecommerce/wishlists_controller');
const AuthController = () => import('#controllers/ecommerce/auth_controller');
const CheckoutsController = () => import('#controllers/ecommerce/checkouts_controller');
const OrdersController = () => import('#controllers/ecommerce/orders_controller');
const DashboardController = () => import('#controllers/ecommerce/dashboard_controller');
const PagesController = () => import('#controllers/ecommerce/pages_controller');
const MidtransWebhookController = () => import('#controllers/midtrans_webhook_controller');
const ArticlesController = () => import('#controllers/ecommerce/articles_controller');
import './routes/admin.js';
router.post('/webhooks/midtrans', [MidtransWebhookController, 'handle']).use(webhookThrottle);
router.get('/', [HomeController, 'index']).use(publicThrottle);
router.get('/collections', [CollectionsController, 'index']).use(publicThrottle);
router.get('/collections/:slug', [CollectionsController, 'view']).use(publicThrottle);
router.get('/best-seller', [CollectionsController, 'bestSeller']).use(publicThrottle);
router.get('/new-arrival', [CollectionsController, 'newArrival']).use(publicThrottle);
router.get('/track', [OrdersController, 'track']).use(publicThrottle);
router.get('/help', [PagesController, 'help']).use(publicThrottle);
router.get('/shipping', [PagesController, 'shipping']).use(publicThrottle);
router.get('/payment', [PagesController, 'payment']).use(publicThrottle);
router.get('/returns', [PagesController, 'returns']).use(publicThrottle);
router.get('/contact', [PagesController, 'contact']).use(publicThrottle);
router.get('/about', [PagesController, 'about']).use(publicThrottle);
router.get('/blog', [PagesController, 'blog']).use(publicThrottle);
router.get('/careers', [PagesController, 'careers']).use(publicThrottle);
router.get('/press', [PagesController, 'press']).use(publicThrottle);
router.get('/affiliate', [PagesController, 'affiliate']).use(publicThrottle);
router.get('/products/:slug', [ProductsController, 'view']).use(publicThrottle);
router.get('/artikel', [ArticlesController, 'index']).use(publicThrottle);
router.get('/artikel/kategori/:category', [ArticlesController, 'category']).use(publicThrottle);
router.get('/artikel/:slug', [ArticlesController, 'show']).use(publicThrottle);
router
    .get('/login', [AuthController, 'showLogin'])
    .use([middleware.guest({ guards: ['customer'] }), throttle]);
router
    .post('/login', [AuthController, 'login'])
    .use([middleware.guest({ guards: ['customer'] }), authThrottle]);
router
    .post('/auth/send-otp', [AuthController, 'sendLoginOtp'])
    .use([middleware.guest({ guards: ['customer'] }), otpThrottle]);
router
    .post('/auth/verify-otp', [AuthController, 'verifyLoginOtp'])
    .use([middleware.guest({ guards: ['customer'] }), authThrottle]);
router
    .post('/auth/resend-otp', [AuthController, 'resendOtp'])
    .use([middleware.guest({ guards: ['customer'] }), otpThrottle]);
router
    .get('/register', [AuthController, 'showRegister'])
    .use([middleware.guest({ guards: ['customer'] }), throttle]);
router
    .post('/register', [AuthController, 'register'])
    .use([middleware.guest({ guards: ['customer'] }), authThrottle]);
router
    .post('/auth/register/send-otp', [AuthController, 'sendRegisterOtp'])
    .use([middleware.guest({ guards: ['customer'] }), otpThrottle]);
router
    .post('/auth/register/verify-otp', [AuthController, 'verifyRegisterOtp'])
    .use([middleware.guest({ guards: ['customer'] }), authThrottle]);
router
    .get('/forgot-password', [AuthController, 'showForgotPassword'])
    .use([middleware.guest({ guards: ['customer'] }), throttle]);
router
    .post('/auth/forgot-password/send-otp', [AuthController, 'sendResetOtp'])
    .use([middleware.guest({ guards: ['customer'] }), otpThrottle]);
router
    .post('/auth/forgot-password/verify-otp', [AuthController, 'verifyResetOtp'])
    .use([middleware.guest({ guards: ['customer'] }), authThrottle]);
router
    .get('/reset-password', [AuthController, 'showResetPassword'])
    .use([middleware.guest({ guards: ['customer'] }), throttle]);
router
    .post('/auth/reset-password', [AuthController, 'resetPassword'])
    .use([middleware.guest({ guards: ['customer'] }), authThrottle]);
router
    .post('/logout', [AuthController, 'logout'])
    .use([middleware.auth({ guards: ['customer'] }), throttle]);
router.get('/api/me', [AuthController, 'me']).use(throttle);
router
    .get('/dashboard', [DashboardController, 'index'])
    .use([middleware.auth({ guards: ['customer'] }), throttle]);
router
    .get('/profile', [DashboardController, 'profile'])
    .use([middleware.auth({ guards: ['customer'] }), throttle]);
router
    .get('/cart', [CartsController, 'view'])
    .use([middleware.auth({ guards: ['customer'] }), throttle]);
router
    .get('/checkout', [CheckoutsController, 'view'])
    .use([middleware.auth({ guards: ['customer'] }), throttle]);
router
    .get('/wishlist', [WishlistsController, 'view'])
    .use([middleware.auth({ guards: ['customer'] }), throttle]);
router
    .get('/orders', [OrdersController, 'index'])
    .use([middleware.auth({ guards: ['customer'] }), throttle]);
router
    .get('/orders/:id', [OrdersController, 'show'])
    .use([middleware.auth({ guards: ['customer'] }), throttle]);
router
    .group(() => {
    router.get('/cart', [CartsController, 'index']);
    router.get('/cart/summary', [CartsController, 'summary']);
    router.get('/cart/count', [CartsController, 'count']);
    router.get('/cart/total-quantity', [CartsController, 'totalQuantity']);
    router.post('/cart', [CartsController, 'store']);
    router.put('/cart/:id', [CartsController, 'update']);
    router.put('/cart/:id/checked', [CartsController, 'toggleChecked']);
    router.delete('/cart/:id', [CartsController, 'destroy']);
    router.post('/cart/bulk-delete', [CartsController, 'bulkDestroy']);
    router.delete('/cart', [CartsController, 'clear']);
    router.get('/wishlist', [WishlistsController, 'index']);
    router.get('/wishlist/count', [WishlistsController, 'count']);
    router.get('/wishlist/check/:productId', [WishlistsController, 'check']);
    router.post('/wishlist/toggle', [WishlistsController, 'toggle']);
    router.post('/wishlist/check-batch', [WishlistsController, 'checkBatch']);
    router.post('/wishlist/:productId/move-to-cart', [WishlistsController, 'moveToCart']);
    router.delete('/wishlist/:productId', [WishlistsController, 'destroy']);
    router.delete('/wishlist', [WishlistsController, 'clear']);
    router.get('/location/provinces', [CheckoutsController, 'getProvinces']);
    router.get('/location/cities', [CheckoutsController, 'getCities']);
    router.get('/location/subdistricts', [CheckoutsController, 'getSubdistricts']);
    router.get('/location/districts', [CheckoutsController, 'getSubdistricts']);
    router.get('/orders', [OrdersController, 'list']);
    router.get('/orders/:id', [OrdersController, 'detail']);
    router.post('/orders/:id/cancel', [OrdersController, 'cancel']);
    router.post('/orders/:id/confirm-received', [OrdersController, 'confirmReceived']);
    router.post('/dashboard/address', [DashboardController, 'saveAddress']);
    router.delete('/dashboard/address/:id', [DashboardController, 'deleteAddress']);
    router.put('/dashboard/address/:id/default', [DashboardController, 'setDefaultAddress']);
    router.get('/dashboard/wallet/topup/:id/status', [DashboardController, 'getTopupStatus']);
    router.delete('/dashboard/wallet/topup/:id', [DashboardController, 'cancelTopup']);
    router.put('/profile', [DashboardController, 'updateProfile']);
})
    .prefix('/api')
    .use([middleware.auth({ guards: ['customer'] }), customerApiThrottle]);
router
    .group(() => {
    router.post('/checkout', [CheckoutsController, 'processCheckout']);
    router.post('/shipping/cost', [CheckoutsController, 'getShippingCosts']);
    router.post('/address', [CheckoutsController, 'saveAddress']);
    router.post('/orders/:id/pay', [OrdersController, 'pay']);
    router.post('/orders/:id/verify-payment', [OrdersController, 'verifyPayment']);
    router.post('/dashboard/wallet/topup', [DashboardController, 'topupWallet']);
    router.post('/dashboard/wallet/topup/:id/confirm', [DashboardController, 'confirmTopup']);
})
    .prefix('/api')
    .use([middleware.auth({ guards: ['customer'] }), checkoutThrottle]);
//# sourceMappingURL=routes.js.map