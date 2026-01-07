# Database Schema untuk E-Commerce Marketplace Vape Multi-Seller

## 📊 Struktur Database (12 Tabel)

### 1. **users** - User Management
- Data user (customer & seller)
- Authentication dengan email + password
- Relasi: hasOne Seller, hasMany Orders, Reviews, CartItems, Addresses

### 2. **sellers** - Seller/Vendor Management
- One-to-one dengan User
- Menyimpan informasi toko
- **city_id & province_id** untuk integrasi RajaOngkir (origin shipping)
- Status: pending, active, suspended, inactive

### 3. **categories** - Product Categories
- Mendukung hierarchical categories (parent-child)
- Untuk kategori: Vape Devices, Liquid, Accessories, dll

### 4. **products** - Product Catalog
- Produk milik seller
- Harga, stok, berat (untuk shipping calculation)
- Status: draft, active, inactive, out_of_stock

### 5. **product_variants** - Product Variations
- Varian produk (warna, ukuran, rasa liquid, dll)
- Price adjustment & stock per variant

### 6. **product_images** - Product Images
- Multiple images per product
- Primary image flag & sort order

### 7. **addresses** - Shipping Addresses
- Alamat pengiriman user
- **city_id & province_id** untuk integrasi RajaOngkir (destination)
- Menyimpan city_name & province_name untuk display

### 8. **orders** - Order Management
- Order header dengan subtotal, tax, shipping_cost, discount, admin_fee
- Status flow: pending_payment → paid → processing → shipped → delivered
- Single address_id (tidak perlu billing & shipping terpisah)
- Relasi ke Payment & Shipping table

### 9. **order_items** - Order Detail
- Detail item dalam order
- Snapshot data produk (nama, sku, harga) untuk history

### 10. **payments** - Midtrans Payment Integration
- One-to-one dengan Order
- Menyimpan semua data transaksi Midtrans:
  - `transaction_id`: Midtrans transaction ID
  - `order_id_midtrans`: Order ID yang dikirim ke Midtrans
  - `snap_token`: Token untuk Snap Payment
  - `transaction_status`: pending, capture, settlement, deny, cancel, expire, refund
  - `payment_details`: Full JSON response dari Midtrans
- Transaction timestamps (transaction_time, settlement_time, expiry_time)

### 11. **shippings** - RajaOngkir Shipping Integration
- One-to-one dengan Order
- Menyimpan data shipping dari RajaOngkir:
  - `courier_code`: jne, pos, tiki, etc
  - `courier_service`: REG, OKE, YES, etc
  - `cost`: Shipping cost dari RajaOngkir
  - `weight`: Total weight
  - `etd`: Estimated Time Delivery
  - `waybill`: Nomor resi tracking
  - `origin_city_id`: City ID seller (dari sellers table)
  - `destination_city_id`: City ID customer (dari addresses table)
  - `rajaongkir_response`: Full JSON response dari RajaOngkir

### 12. **reviews** - Product Reviews
- Rating & review produk
- Verifikasi pembelian (is_verified_purchase)
- Review approval system

### 13. **cart_items** - Shopping Cart
- Shopping cart items
- Unique constraint: user_id + product_id + product_variant_id

---

## 🔄 Data Flow

### Order Creation Flow:
```
1. Customer add to cart → cart_items
2. Checkout → Pilih address → Get shipping cost dari RajaOngkir API
3. Create Order (status: pending_payment)
4. Create Payment record → Request Snap Token ke Midtrans
5. Customer bayar via Midtrans → Webhook notification
6. Update Payment status → Update Order status ke 'paid'
7. Seller process → Create Shipping record dengan courier info
8. Update tracking/waybill → Customer bisa track
9. Delivered → Order complete
```

---

## 🌐 Integrasi API

### RajaOngkir API
**Endpoint yang dibutuhkan:**
- `GET /province` - List provinsi
- `GET /city` - List kota by province_id
- `POST /cost` - Calculate shipping cost
  ```json
  {
    "origin": "city_id_seller",
    "destination": "city_id_customer", 
    "weight": 1000,
    "courier": "jne"
  }
  ```

**Data yang disimpan:**
- `sellers.city_id` & `sellers.province_id` (origin)
- `addresses.city_id` & `addresses.province_id` (destination)
- `shippings.*` (hasil calculation & tracking)

### Midtrans Payment API
**Snap Payment Flow:**
1. Create transaction → Get Snap Token
   ```json
   {
     "transaction_details": {
       "order_id": "ORDER-123",
       "gross_amount": 100000
     },
     "customer_details": {...}
   }
   ```
2. Frontend load Snap.js dengan token
3. Customer bayar
4. Midtrans kirim notification ke webhook
5. Update payment & order status

**Data yang disimpan:**
- `payments.snap_token` - untuk frontend
- `payments.transaction_id` - dari Midtrans
- `payments.transaction_status` - status pembayaran
- `payments.payment_details` - full response JSON

---

## ✅ Optimasi & Best Practices

### Data Redundancy - Dihilangkan:
- ❌ Billing address terpisah → Gunakan satu address saja
- ❌ Payment info di orders → Pindah ke table payments
- ❌ Shipping info di orders → Pindah ke table shippings
- ❌ State/province string → Gunakan RajaOngkir ID
- ❌ confirmed_at redundant → Gunakan paid_at

### Solid Design:
- ✅ Single Responsibility: Order table fokus ke order flow
- ✅ Payment & Shipping terpisah untuk flexibility
- ✅ City & Province ID untuk integrasi RajaOngkir
- ✅ Snapshot data di order_items untuk history
- ✅ JSON field untuk full API response (audit trail)

### Index yang Direkomendasikan:
```sql
-- Untuk performance
CREATE INDEX idx_products_seller_status ON products(seller_id, status);
CREATE INDEX idx_orders_user_status ON orders(user_id, status);
CREATE INDEX idx_orders_seller_status ON orders(seller_id, status);
CREATE INDEX idx_payments_transaction ON payments(transaction_id);
CREATE INDEX idx_payments_order ON payments(order_id);
CREATE INDEX idx_shippings_order ON shippings(order_id);
```

---

## 🚀 Next Steps

1. Run migrations: `node ace migration:run`
2. Setup RajaOngkir API key di `.env`
3. Setup Midtrans Server Key & Client Key di `.env`
4. Implement services:
   - `RajaOngkirService` untuk shipping calculation
   - `MidtransService` untuk payment processing
5. Setup webhook endpoint untuk Midtrans notifications
