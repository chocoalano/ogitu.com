# ✅ Schema & Model Update Complete

## 🔄 Perubahan Utama

### Authentication Structure
**SEBELUM:**
- `users` table untuk semua (admin + customer + seller)

**SESUDAH:**
- ✅ `users` → **SuperAdmin ONLY** (role: superadmin/admin)
- ✅ `customers` → **Customer & Seller accounts**
- ✅ `sellers` → Reference ke `customers` (bukan `users`)

## 📊 Struktur Database (13 Tabel)

### 1. Authentication
- `users` - SuperAdmin saja (role: superadmin, admin)
- `customers` - Customer accounts (dengan auth)

### 2. Seller & Products
- `sellers` - Customer yang upgrade jadi seller (customer_id)
- `categories` - Kategori produk
- `products` - Produk dengan weight untuk shipping
- `product_variants` - Varian produk
- `product_images` - Gambar produk

### 3. Shopping & Orders
- `addresses` - Alamat customer (customer_id)
- `cart_items` - Shopping cart (customer_id)
- `orders` - Order dari customer (customer_id)
- `order_items` - Detail order

### 4. Reviews & Payment
- `reviews` - Review dari customer (customer_id)
- `payments` - Midtrans integration
- `shippings` - RajaOngkir integration

## 🎯 Models Created/Updated

### New Model:
- ✅ `Customer` - With authentication (email/password)

### Updated Models:
- ✅ `User` - Simplified for admin only
- ✅ `Seller` - Reference Customer (customerId)
- ✅ `Address` - Reference Customer (customerId)
- ✅ `Order` - Reference Customer (customerId)
- ✅ `Review` - Reference Customer (customerId)
- ✅ `CartItem` - Reference Customer (customerId)

## 🔐 User Flows

### 1. Customer Registration
```typescript
const customer = await Customer.create({
  fullName: 'John Doe',
  email: 'john@example.com',
  password: 'password',
  isActive: true,
  isVerified: false
})
```

### 2. Customer → Seller Upgrade
```typescript
const seller = await Seller.create({
  customerId: customer.id,
  storeName: 'My Vape Store',
  slug: 'my-vape-store',
  status: 'pending', // Menunggu approval
  cityId: '501' // RajaOngkir
})
```

### 3. Admin Login (Separate)
```typescript
const admin = await User.verifyCredentials(email, password)
// admin.role = 'superadmin'
```

## 📁 Files Created

### Migrations:
- ✅ `1765507642591_create_customers_table.ts` (NEW)
- ✅ Updated: `sellers`, `addresses`, `orders`, `reviews`, `cart_items`

### Models:
- ✅ `app/models/customer.ts` (NEW)
- ✅ Updated: `user.ts`, `seller.ts`, `address.ts`, `order.ts`, `review.ts`, `cart_item.ts`

### Middleware:
- ✅ `app/middleware/seller_middleware.ts` - Check if customer is active seller

### Seeders:
- ✅ `database/seeders/user_seeder.ts` - Create default superadmin

### Documentation:
- ✅ `AUTH_STRUCTURE.md` - Authentication structure explained
- ✅ `MIGRATION_GUIDE.md` - Step by step setup guide

## 🚀 Next Steps

### 1. Setup Database
```bash
# Rollback if needed
node ace migration:rollback --batch=0

# Run migrations
node ace migration:run

# Seed superadmin
node ace db:seed
```

### 2. Configure Auth Guards
Update `config/auth.ts`:
```typescript
{
  default: 'customer',
  guards: {
    customer: sessionGuard({
      provider: sessionUserProvider({
        model: () => import('#models/customer')
      })
    }),
    admin: sessionGuard({
      provider: sessionUserProvider({
        model: () => import('#models/user')
      })
    })
  }
}
```

### 3. Register Middleware
Update `start/kernel.ts`:
```typescript
router.named({
  seller: () => import('#middleware/seller_middleware')
})
```

### 4. Create Routes
```typescript
// Customer routes
router.group(() => {
  router.get('/profile', [CustomersController, 'profile'])
  router.post('/seller/register', [SellersController, 'register'])
}).use(middleware.auth({ guards: ['customer'] }))

// Seller routes  
router.group(() => {
  router.get('/dashboard', [SellerDashboardController, 'index'])
  router.post('/products', [ProductsController, 'store'])
}).use([
  middleware.auth({ guards: ['customer'] }),
  middleware.seller()
])

// Admin routes
router.group(() => {
  router.get('/dashboard', [AdminController, 'index'])
  router.post('/sellers/:id/approve', [AdminController, 'approveSeller'])
}).prefix('/admin').use(middleware.auth({ guards: ['admin'] }))
```

## 🔑 Default Credentials

**SuperAdmin:**
- Email: `admin@ogitu.com`
- Password: `Admin123!`
- ⚠️ Change after first login!

## ✅ Advantages

1. **Clear Separation** - Admin terpisah dari customer
2. **Security** - SuperAdmin tidak tercampur dengan customer data
3. **Flexibility** - Customer bisa upgrade jadi seller kapan saja
4. **Role-based Access** - Guard terpisah untuk customer & admin
5. **Better Audit** - Admin actions vs Customer actions jelas

## 📚 Documentation

- [AUTH_STRUCTURE.md](AUTH_STRUCTURE.md) - Penjelasan struktur authentication
- [MIGRATION_GUIDE.md](MIGRATION_GUIDE.md) - Setup guide lengkap
- [docs/DATABASE_SCHEMA.md](docs/DATABASE_SCHEMA.md) - Database schema detail
- [docs/API_INTEGRATION_GUIDE.md](docs/API_INTEGRATION_GUIDE.md) - RajaOngkir & Midtrans integration

## ✨ Schema is Ready!

Database structure sudah solid dengan:
- ✅ Separation antara admin dan customer
- ✅ Customer bisa upgrade jadi seller
- ✅ Tidak ada data redundant
- ✅ Ready untuk RajaOngkir & Midtrans
- ✅ Multi-seller marketplace ready

Run migrations dan mulai development! 🚀
