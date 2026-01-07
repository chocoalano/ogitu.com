# Updated Database Schema

## 🔐 Authentication Structure

### 1. **users** - SuperAdmin Only
- Hanya untuk admin/superadmin system
- Role: superadmin, admin
- Tidak ada relasi ke order/product

### 2. **customers** - Customer/Seller Accounts
- Akun untuk semua pengguna (customer biasa & seller)
- Authentication dengan email + password
- Customer bisa upgrade jadi seller dengan mendaftar
- Relasi: hasOne Seller, hasMany Orders, Reviews, CartItems, Addresses

### 3. **sellers** - Seller Profiles
- One-to-one dengan Customer (customer_id)
- Customer yang sudah daftar sebagai seller
- Status: pending, active, suspended, inactive

## 🔄 User Flow

### Customer Registration
```typescript
// Register sebagai customer biasa
const customer = await Customer.create({
  fullName: 'John Doe',
  email: 'john@example.com',
  password: 'hashed_password',
  isActive: true,
  isVerified: false
})
```

### Customer → Seller Upgrade
```typescript
// Customer mendaftar sebagai seller
const seller = await Seller.create({
  customerId: customer.id,
  storeName: 'John Vape Store',
  slug: 'john-vape-store',
  status: 'pending', // Menunggu approval admin
  cityId: '501', // RajaOngkir city ID
  // ... other fields
})
```

### Admin Authentication
```typescript
// Login admin/superadmin
const admin = await User.verifyCredentials(email, password)
// admin.role = 'superadmin' atau 'admin'
```

### Customer Authentication
```typescript
// Login customer/seller
const customer = await Customer.verifyCredentials(email, password)

// Check apakah customer adalah seller
await customer.load('seller')
if (customer.seller) {
  // Customer ini adalah seller
  console.log(customer.seller.storeName)
}
```

## 📊 Relasi Lengkap

```
users (SuperAdmin)
└── No relations to business logic

customers
├── hasOne → sellers (customer bisa jadi seller)
├── hasMany → addresses (alamat pengiriman)
├── hasMany → orders (pesanan customer)
├── hasMany → reviews (review produk)
└── hasMany → cart_items (shopping cart)

sellers
├── belongsTo → customers (seller adalah customer)
├── hasMany → products
└── hasMany → orders (orders dari seller ini)

orders
├── belongsTo → customers (pembeli)
├── belongsTo → sellers (penjual)
├── belongsTo → addresses (alamat pengiriman)
├── hasMany → order_items
├── hasOne → payments (Midtrans)
└── hasOne → shippings (RajaOngkir)
```

## 🚀 Implementation Examples

### Route Guards

```typescript
// routes.ts

// Customer routes (untuk customer & seller yang login)
router.group(() => {
  router.get('/profile', [CustomersController, 'profile'])
  router.get('/orders', [OrdersController, 'index'])
  router.post('/cart/add', [CartController, 'add'])
}).use(middleware.auth({ guards: ['customer'] }))

// Seller routes (hanya untuk customer yang sudah jadi seller)
router.group(() => {
  router.get('/dashboard', [SellerDashboardController, 'index'])
  router.post('/products', [SellerProductsController, 'store'])
  router.get('/orders', [SellerOrdersController, 'index'])
}).use([
  middleware.auth({ guards: ['customer'] }),
  middleware.seller() // Custom middleware check customer.seller exists
])

// Admin routes (untuk superadmin/admin)
router.group(() => {
  router.get('/dashboard', [AdminDashboardController, 'index'])
  router.get('/sellers/pending', [AdminSellersController, 'pending'])
  router.post('/sellers/:id/approve', [AdminSellersController, 'approve'])
}).use(middleware.auth({ guards: ['admin'] }))
```

### Middleware Seller Check

```typescript
// app/middleware/seller_middleware.ts
export default class SellerMiddleware {
  async handle({ auth, response }: HttpContext, next: NextFn) {
    const customer = auth.user!
    
    await customer.load('seller')
    
    if (!customer.seller) {
      return response.forbidden({ 
        message: 'You need to be a seller to access this resource' 
      })
    }
    
    if (customer.seller.status !== 'active') {
      return response.forbidden({ 
        message: 'Your seller account is not active' 
      })
    }
    
    await next()
  }
}
```

### Auth Configuration

```typescript
// config/auth.ts
export default defineConfig({
  default: 'customer',
  guards: {
    customer: sessionGuard({
      useRememberMeTokens: false,
      provider: sessionUserProvider({
        model: () => import('#models/customer')
      })
    }),
    admin: sessionGuard({
      useRememberMeTokens: false,
      provider: sessionUserProvider({
        model: () => import('#models/user')
      })
    })
  }
})
```

## ✅ Advantages

1. **Separation of Concerns**: Admin system terpisah dari customer system
2. **Security**: SuperAdmin tidak tercampur dengan customer data
3. **Flexibility**: Customer bisa upgrade/downgrade status seller
4. **Clear Access Control**: Role-based access lebih jelas
5. **Better Audit**: Admin actions vs Customer actions terpisah

## 📝 Database Changes Summary

### Modified Tables:
- ✅ `users` → Added `role` column (superadmin/admin)
- ✅ `sellers` → Changed `user_id` to `customer_id`
- ✅ `addresses` → Changed `user_id` to `customer_id`
- ✅ `orders` → Changed `user_id` to `customer_id`
- ✅ `reviews` → Changed `user_id` to `customer_id`
- ✅ `cart_items` → Changed `user_id` to `customer_id`

### New Table:
- ✅ `customers` → Full customer account management with authentication

### Modified Models:
- ✅ `User` → Simplified for admin only
- ✅ `Customer` → New model with auth
- ✅ `Seller`, `Address`, `Order`, `Review`, `CartItem` → Updated relations
