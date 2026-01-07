# Quick Migration Guide

## 🔄 Perubahan Struktur

### SEBELUM:
```
users
├── customers (dalam satu tabel)
└── sellers (via users.id)
```

### SESUDAH:
```
users (SuperAdmin saja)
customers (Pengguna biasa & Seller)
└── sellers (via customers.id)
```

## 📝 Step by Step Setup

### 1. Drop database lama (jika ada)
```bash
# Rollback all migrations
node ace migration:rollback --batch=0

# Or drop database
mysql -u root -p -e "DROP DATABASE app; CREATE DATABASE app;"
```

### 2. Run migrations
```bash
node ace migration:run
```

Urutan migration:
1. ✅ users (superadmin)
2. ✅ customers (customer/seller accounts)
3. ✅ sellers (reference customers)
4. ✅ categories
5. ✅ products
6. ✅ product_variants
7. ✅ product_images
8. ✅ addresses (reference customers)
9. ✅ orders (reference customers)
10. ✅ order_items
11. ✅ reviews (reference customers)
12. ✅ cart_items (reference customers)
13. ✅ payments
14. ✅ shippings

### 3. Seed superadmin
```bash
node ace db:seed
```

Default admin:
- Email: `admin@ogitu.com`
- Password: `Admin123!`

### 4. Configure auth guards

Update `config/auth.ts`:
```typescript
import { defineConfig } from '@adonisjs/auth'
import { sessionGuard, sessionUserProvider } from '@adonisjs/auth/session'

const authConfig = defineConfig({
  default: 'customer',
  guards: {
    customer: sessionGuard({
      useRememberMeTokens: false,
      provider: sessionUserProvider({
        model: () => import('#models/customer'),
      }),
    }),
    admin: sessionGuard({
      useRememberMeTokens: false,
      provider: sessionUserProvider({
        model: () => import('#models/user'),
      }),
    }),
  },
})

export default authConfig
```

## 🔐 Authentication Examples

### Customer Registration
```typescript
import Customer from '#models/customer'

const customer = await Customer.create({
  fullName: 'John Doe',
  email: 'john@example.com',
  password: 'password123',
})

// Send verification email
// await mail.send(new VerifyEmailNotification(customer))
```

### Customer Login
```typescript
// routes.ts
router.post('/login', async ({ auth, request, response }) => {
  const { email, password } = request.only(['email', 'password'])

  try {
    const customer = await Customer.verifyCredentials(email, password)
    await auth.use('customer').login(customer)
    
    return response.ok({ message: 'Logged in successfully' })
  } catch {
    return response.unauthorized({ message: 'Invalid credentials' })
  }
})
```

### Admin Login
```typescript
router.post('/admin/login', async ({ auth, request, response }) => {
  const { email, password } = request.only(['email', 'password'])

  try {
    const admin = await User.verifyCredentials(email, password)
    await auth.use('admin').login(admin)
    
    return response.ok({ message: 'Admin logged in' })
  } catch {
    return response.unauthorized({ message: 'Invalid credentials' })
  }
})
```

### Register as Seller
```typescript
import Seller from '#models/seller'

// Customer mendaftar sebagai seller
router.post('/seller/register', async ({ auth, request, response }) => {
  const customer = auth.user! // Already authenticated as customer
  
  // Check if already a seller
  await customer.load('seller')
  if (customer.seller) {
    return response.conflict({ message: 'You are already a seller' })
  }

  const data = request.only([
    'storeName',
    'slug',
    'description',
    'phone',
    'cityId',
    'provinceId',
  ])

  const seller = await Seller.create({
    customerId: customer.id,
    ...data,
    status: 'pending', // Waiting for admin approval
  })

  return response.created({
    message: 'Seller registration submitted. Waiting for approval.',
    seller,
  })
})
```

### Check if Customer is Seller
```typescript
router.get('/profile', async ({ auth, response }) => {
  const customer = auth.user!
  
  await customer.load('seller')
  
  return response.ok({
    customer: {
      id: customer.id,
      fullName: customer.fullName,
      email: customer.email,
      isSeller: !!customer.seller,
      seller: customer.seller ? {
        storeName: customer.seller.storeName,
        status: customer.seller.status,
        rating: customer.seller.rating,
      } : null,
    },
  })
})
```

## 🛡️ Route Protection

### Customer Routes
```typescript
import router from '@adonisjs/core/services/router'
import { middleware } from '#start/kernel'

// Public routes
router.post('/register', [AuthController, 'register'])
router.post('/login', [AuthController, 'login'])

// Protected customer routes
router.group(() => {
  router.get('/profile', [CustomersController, 'profile'])
  router.get('/orders', [OrdersController, 'index'])
  router.post('/cart/add', [CartController, 'add'])
  router.post('/checkout', [CheckoutController, 'process'])
}).use(middleware.auth({ guards: ['customer'] }))
```

### Seller Routes
```typescript
// Seller-specific routes (requires seller account)
router.group(() => {
  router.get('/dashboard', [SellerDashboardController, 'index'])
  router.get('/products', [SellerProductsController, 'index'])
  router.post('/products', [SellerProductsController, 'store'])
  router.get('/orders', [SellerOrdersController, 'index'])
}).use([
  middleware.auth({ guards: ['customer'] }),
  middleware.seller(), // Custom middleware
])
```

### Admin Routes
```typescript
// Admin routes
router.group(() => {
  router.get('/dashboard', [AdminDashboardController, 'index'])
  router.get('/sellers/pending', [AdminSellersController, 'pending'])
  router.post('/sellers/:id/approve', [AdminSellersController, 'approve'])
  router.get('/customers', [AdminCustomersController, 'index'])
  router.get('/orders', [AdminOrdersController, 'index'])
}).prefix('/admin').use(middleware.auth({ guards: ['admin'] }))
```

## 🧪 Testing

### Create test customer
```typescript
const customer = await Customer.create({
  fullName: 'Test Customer',
  email: 'customer@test.com',
  password: 'password123',
  isVerified: true,
  isActive: true,
})
```

### Create test seller
```typescript
const seller = await Seller.create({
  customerId: customer.id,
  storeName: 'Test Store',
  slug: 'test-store',
  cityId: '501',
  provinceId: '6',
  status: 'active',
})
```

### Create test order
```typescript
const order = await Order.create({
  orderNumber: `ORD-${Date.now()}`,
  customerId: customer.id,
  sellerId: seller.id,
  total: 100000,
  status: 'pending_payment',
})
```

## ⚠️ Important Notes

1. **Users table hanya untuk SuperAdmin** - Jangan gunakan untuk customer/seller
2. **Customers table untuk semua pengguna** - Customer biasa dan seller
3. **Seller adalah optional upgrade** - Customer bisa, tapi tidak harus jadi seller
4. **Seller status: pending → active** - Perlu approval dari admin
5. **Gunakan guard yang tepat** - 'customer' untuk customer/seller, 'admin' untuk superadmin

## 🔑 Default Credentials

**SuperAdmin:**
- Email: `admin@ogitu.com`
- Password: `Admin123!`
- Role: `superadmin`

**Test Customer (manual create):**
```bash
node ace tinker
```
```typescript
const Customer = await import('#models/customer')
await Customer.default.create({
  fullName: 'Test Customer',
  email: 'test@customer.com',
  password: 'password123',
  isVerified: true,
  isActive: true
})
```
