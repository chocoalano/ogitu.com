# 📋 Summary: E-Commerce Vape Marketplace Schema

## ✅ Yang Sudah Dibuat

### 1. Database Migrations (12 tabel)
- ✅ `users` - User authentication
- ✅ `sellers` - Multi-seller marketplace dengan RajaOngkir city_id
- ✅ `categories` - Hierarchical categories
- ✅ `products` - Product catalog dengan weight untuk shipping
- ✅ `product_variants` - Product variations (rasa, ukuran, dll)
- ✅ `product_images` - Multiple product images
- ✅ `addresses` - Customer addresses dengan RajaOngkir city_id
- ✅ `orders` - Order management (status: pending_payment → paid → processing → shipped → delivered)
- ✅ `order_items` - Order details dengan snapshot data
- ✅ `payments` - **Midtrans integration** (transaction_id, snap_token, status)
- ✅ `shippings` - **RajaOngkir integration** (courier, cost, waybill, ETD)
- ✅ `reviews` - Product reviews
- ✅ `cart_items` - Shopping cart

### 2. Models (13 files)
Semua model dibuat dengan:
- TypeScript types untuk AdonisJS v6
- Relasi lengkap (BelongsTo, HasMany, HasOne)
- JSON column untuk API responses (audit trail)

### 3. Services
- ✅ `RajaOngkirService` - Get provinces, cities, calculate shipping cost
- ✅ `MidtransService` - Create snap token, verify webhook, process notifications

### 4. Controllers
- ✅ `MidtransWebhookController` - Handle payment notifications dari Midtrans

### 5. Configuration
- ✅ `.env.example` - Template dengan RajaOngkir & Midtrans config
- ✅ `start/env.ts` - Validation untuk environment variables

### 6. Documentation
- ✅ `DATABASE_SCHEMA.md` - Penjelasan struktur database lengkap
- ✅ `API_INTEGRATION_GUIDE.md` - Panduan integrasi RajaOngkir & Midtrans

---

## 🎯 Key Features

### Multi-Seller Support
- Setiap seller punya store dengan city_id untuk origin shipping
- Order dipisahkan per seller (untuk fee management)
- Rating & review per seller

### RajaOngkir Integration
- City & Province ID tersimpan di `sellers` dan `addresses`
- Calculate shipping cost berdasarkan origin-destination-weight
- Support multiple couriers (JNE, POS, TIKI, dll)
- Tracking dengan waybill/resi

### Midtrans Payment Gateway
- Snap Payment (popup checkout)
- Support semua payment methods (VA, E-Wallet, Credit Card, dll)
- Webhook untuk auto-update payment status
- Signature verification untuk security

### Product Management
- Support variants (warna, ukuran, rasa liquid, dll)
- Multiple images per product
- Stock management
- Weight untuk shipping calculation

---

## 🚀 Cara Menggunakan

### 1. Setup Database
```bash
# Copy .env
cp .env.example .env

# Edit .env dan isi:
# - Database credentials
# - RajaOngkir API key
# - Midtrans Server & Client key

# Run migrations
node ace migration:run
```

### 2. Install Dependencies
```bash
npm install axios
```

### 3. Implementasi di Controller

**Example: Checkout Flow**
```typescript
// 1. Get shipping options
const rajaongkir = new RajaOngkirService()
const options = await rajaongkir.getShippingOptions(
  seller.cityId,
  address.cityId,
  totalWeight
)

// 2. Create order & payment
const order = await Order.create({ /* ... */ })
await Shipping.create({ /* shipping data */ })

const midtrans = new MidtransService()
const snap = await midtrans.createSnapToken({ /* ... */ })

await Payment.create({
  orderId: order.id,
  snapToken: snap.token,
  // ...
})

// 3. Return snap token ke frontend
return { snapToken: snap.token }
```

### 4. Setup Webhook
```typescript
// start/routes.ts
router.post('/webhooks/midtrans', [MidtransWebhookController, 'handle'])
```

Daftarkan URL webhook di Midtrans Dashboard:
```
https://yourdomain.com/webhooks/midtrans
```

---

## 📊 Database Optimizations

### Redundansi yang Dihilangkan
- ❌ Shipping & billing address terpisah → Gunakan 1 address
- ❌ Payment data di orders table → Terpisah ke `payments`
- ❌ Shipping data di orders table → Terpisah ke `shippings`
- ❌ String city/province → Gunakan RajaOngkir ID

### Data Integrity
- ✅ Foreign keys dengan CASCADE/SET NULL
- ✅ Unique constraints (order_number, sku, email, dll)
- ✅ Composite unique (cart: user_id + product_id + variant_id)
- ✅ Snapshot data di order_items (nama, harga, sku)

### Performance Tips
```sql
-- Recommended indexes
CREATE INDEX idx_products_seller_status ON products(seller_id, status);
CREATE INDEX idx_orders_user_status ON orders(user_id, status);
CREATE INDEX idx_orders_seller_status ON orders(seller_id, status);
CREATE INDEX idx_payments_order ON payments(order_id);
CREATE INDEX idx_shippings_order ON shippings(order_id);
```

---

## 🔐 Security Checklist

- ✅ Midtrans signature verification di webhook
- ✅ Server Key tidak di-expose ke frontend
- ⚠️ TODO: Rate limiting untuk API endpoints
- ⚠️ TODO: Input validation di controllers
- ⚠️ TODO: HTTPS untuk production webhook

---

## 📦 Next Steps

1. **Implement Controllers:**
   - ProductsController (CRUD produk)
   - OrdersController (create order, checkout)
   - CartController (manage cart)
   - AddressesController (manage addresses)

2. **Frontend Integration:**
   - Load Midtrans Snap.js
   - Implement payment UI
   - Order tracking page

3. **Background Jobs:**
   - Auto-cancel order jika tidak dibayar (24 jam)
   - Sync payment status dari Midtrans
   - Send email notifications

4. **Admin Panel:**
   - Seller approval
   - Order management
   - Payment monitoring

5. **Testing:**
   - Unit tests untuk services
   - Integration tests untuk checkout flow
   - Test dengan Midtrans sandbox

---

## 📚 File Structure

```
database/migrations/
├── 1765507642592_create_users_table.ts
├── 1765507642593_create_sellers_table.ts ⚡ RajaOngkir
├── 1765507642594_create_categories_table.ts
├── 1765507642595_create_products_table.ts
├── 1765507642596_create_product_variants_table.ts
├── 1765507642597_create_product_images_table.ts
├── 1765507642598_create_addresses_table.ts ⚡ RajaOngkir
├── 1765507642599_create_orders_table.ts
├── 1765507642600_create_order_items_table.ts
├── 1765507642601_create_reviews_table.ts
├── 1765507642602_create_cart_items_table.ts
├── 1765507642603_create_payments_table.ts ⚡ Midtrans
└── 1765507642604_create_shippings_table.ts ⚡ RajaOngkir

app/models/
├── user.ts
├── seller.ts
├── category.ts
├── product.ts
├── product_variant.ts
├── product_image.ts
├── address.ts
├── order.ts
├── order_item.ts
├── review.ts
├── cart_item.ts
├── payment.ts ⚡ Midtrans
└── shipping.ts ⚡ RajaOngkir

app/services/
├── rajaongkir_service.ts ⚡ NEW
└── midtrans_service.ts ⚡ NEW

app/controllers/
└── midtrans_webhook_controller.ts ⚡ NEW
```

---

## 🎉 Ready to Use!

Schema sudah solid, tidak ada redundansi, dan siap untuk:
- ✅ Multi-seller marketplace
- ✅ RajaOngkir shipping integration
- ✅ Midtrans payment integration
- ✅ Product variants & images
- ✅ Order tracking
- ✅ Review system
- ✅ Shopping cart

Run migrations dan mulai develop! 🚀
