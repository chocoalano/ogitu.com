# API Integration Guide - RajaOngkir & Midtrans

## 🚀 Quick Start

### 1. Setup Environment Variables

Copy `.env.example` to `.env` dan isi kredensial API:

```bash
# RajaOngkir
RAJAONGKIR_API_KEY=your_api_key_here
RAJAONGKIR_BASE_URL=https://api.rajaongkir.com/starter

# Midtrans
MIDTRANS_SERVER_KEY=your_server_key_here
MIDTRANS_CLIENT_KEY=your_client_key_here
MIDTRANS_IS_PRODUCTION=false
```

### 2. Install Dependencies

```bash
npm install axios
```

### 3. Run Migrations

```bash
node ace migration:run
```

---

## 📦 RajaOngkir Integration

### Usage Example

```typescript
import RajaOngkirService from '#services/rajaongkir_service'

const rajaongkir = new RajaOngkirService()

// Get provinces
const provinces = await rajaongkir.getProvinces()

// Get cities by province
const cities = await rajaongkir.getCities('6') // 6 = DKI Jakarta

// Calculate shipping cost
const cost = await rajaongkir.calculateCost(
  '501', // Origin city ID (Jakarta Pusat)
  '114', // Destination city ID (Bandung)
  1000, // Weight in grams
  'jne' // Courier
)

// Get all shipping options
const options = await rajaongkir.getShippingOptions('501', '114', 1000)
```

### Checkout Flow dengan RajaOngkir

```typescript
// 1. User pilih alamat pengiriman
const address = await Address.findOrFail(addressId)

// 2. Hitung total berat produk di cart
const cartItems = await CartItem.query()
  .where('user_id', userId)
  .preload('product')

const totalWeight = cartItems.reduce((sum, item) => {
  return sum + item.product.weight * item.quantity
}, 0)

// 3. Get seller origin city
const seller = await Seller.findOrFail(sellerId)

// 4. Get shipping options
const rajaongkir = new RajaOngkirService()
const shippingOptions = await rajaongkir.getShippingOptions(
  seller.cityId!,
  address.cityId,
  totalWeight
)

// 5. User pilih shipping method
// Frontend display shippingOptions, user pilih salah satu

// 6. Create order dengan shipping cost
const selectedShipping = shippingOptions[0]
const order = await Order.create({
  // ... order data
  shippingCost: selectedShipping.cost,
})

// 7. Create shipping record
await Shipping.create({
  orderId: order.id,
  courierCode: selectedShipping.courier_code,
  courierService: selectedShipping.service,
  courierName: selectedShipping.courier_name,
  cost: selectedShipping.cost,
  weight: totalWeight,
  etd: selectedShipping.etd,
  originCityId: seller.cityId,
  destinationCityId: address.cityId,
})
```

---

## 💳 Midtrans Integration

### Create Payment Flow

```typescript
import MidtransService from '#services/midtrans_service'
import Payment from '#models/payment'

// 1. Create order
const order = await Order.create({
  orderNumber: `ORD-${Date.now()}`,
  userId: auth.user!.id,
  sellerId: seller.id,
  total: 100000,
  // ... other fields
})

// 2. Prepare payment details
const midtrans = new MidtransService()

const snapData = await midtrans.createSnapToken({
  orderId: order.orderNumber,
  grossAmount: order.total,
  customerDetails: {
    firstName: user.fullName || 'Customer',
    email: user.email,
    phone: address.phone,
  },
  itemDetails: orderItems.map((item) => ({
    id: item.productSku,
    name: item.productName,
    price: item.price,
    quantity: item.quantity,
  })),
})

// 3. Save payment record
await Payment.create({
  orderId: order.id,
  paymentType: 'snap',
  grossAmount: order.total,
  transactionStatus: 'pending',
  snapToken: snapData.token,
  snapRedirectUrl: snapData.redirect_url,
  orderIdMidtrans: order.orderNumber,
})

// 4. Return snap token to frontend
return { snapToken: snapData.token }
```

### Frontend Integration

```html
<!-- Load Snap.js -->
<script src="https://app.sandbox.midtrans.com/snap/snap.js" data-client-key="YOUR_CLIENT_KEY"></script>

<script>
  // Trigger payment
  snap.pay('SNAP_TOKEN_FROM_BACKEND', {
    onSuccess: function(result) {
      // Payment success
      console.log('Payment success:', result)
      window.location.href = '/orders/' + result.order_id
    },
    onPending: function(result) {
      // Payment pending
      console.log('Payment pending:', result)
    },
    onError: function(result) {
      // Payment error
      console.log('Payment error:', result)
    },
    onClose: function() {
      // Customer closed popup
      console.log('Payment popup closed')
    }
  })
</script>
```

### Setup Webhook

**1. Register webhook URL di Midtrans Dashboard:**
```
https://yourdomain.com/webhooks/midtrans
```

**2. Add route** di `start/routes.ts`:
```typescript
import MidtransWebhookController from '#controllers/midtrans_webhook_controller'

router.post('/webhooks/midtrans', [MidtransWebhookController, 'handle'])
```

**3. Midtrans akan mengirim notifikasi saat payment status berubah:**
- `pending` - Menunggu pembayaran
- `settlement` - Pembayaran berhasil
- `cancel/deny/expire` - Pembayaran dibatalkan
- `refund` - Pembayaran di-refund

---

## 🔄 Complete Order Flow

```
1. [CART] User add products to cart
   └─> cart_items table

2. [CHECKOUT] User checkout
   ├─> Pilih address
   ├─> Get shipping options (RajaOngkir)
   └─> User pilih courier & service

3. [CREATE ORDER] Create order dengan status 'pending_payment'
   ├─> orders table
   ├─> order_items table
   └─> shippings table

4. [PAYMENT] Create payment & get Snap token
   ├─> payments table (status: pending)
   └─> Return snap_token to frontend

5. [USER PAYS] User bayar via Midtrans
   └─> Midtrans sends webhook notification

6. [WEBHOOK] Update payment & order status
   ├─> Update payments.transaction_status = 'settlement'
   └─> Update orders.status = 'paid'

7. [SELLER PROCESS] Seller process order
   └─> orders.status = 'processing'

8. [SHIPPING] Seller input tracking number
   ├─> Update shippings.waybill
   └─> orders.status = 'shipped'

9. [DELIVERED] Order delivered
   └─> orders.status = 'delivered'

10. [REVIEW] Customer bisa review produk
    └─> reviews table
```

---

## 🧪 Testing

### Test RajaOngkir

```typescript
// Create test route
router.get('/test/rajaongkir', async ({ response }) => {
  const rajaongkir = new RajaOngkirService()
  
  const provinces = await rajaongkir.getProvinces()
  const cities = await rajaongkir.getCities('6')
  const cost = await rajaongkir.calculateCost('501', '114', 1000, 'jne')
  
  return response.json({ provinces, cities, cost })
})
```

### Test Midtrans (Sandbox)

**Test Cards:**
```
Success: 4811 1111 1111 1114
Challenge: 4911 1111 1111 1113
Deny: 4411 1111 1111 1118
CVV: 123
Exp: 01/25
```

**Test Virtual Account:**
- BCA VA: akan auto-approve di sandbox
- Mandiri Bill: akan auto-approve di sandbox

---

## 📚 Resources

- **RajaOngkir Docs:** https://rajaongkir.com/dokumentasi
- **Midtrans Docs:** https://docs.midtrans.com
- **Midtrans Snap:** https://docs.midtrans.com/docs/snap-overview
- **Midtrans Webhook:** https://docs.midtrans.com/docs/http-notification-webhooks

## 🔒 Security Notes

1. **Never expose Server Key** - Gunakan hanya di backend
2. **Verify signature** - Selalu verify signature dari Midtrans webhook
3. **HTTPS required** - Production webhook harus menggunakan HTTPS
4. **Rate limiting** - Implementasikan rate limiting untuk API endpoints
