import { BaseSeeder } from '@adonisjs/lucid/seeders'
import Order from '#models/order'
import OrderItem from '#models/order_item'
import Payment from '#models/payment'
import Shipping from '#models/shipping'
import Review from '#models/review'
import Customer from '#models/customer'
import Address from '#models/address'
import Product from '#models/product'
import ProductVariant from '#models/product_variant'
import { DateTime } from 'luxon'
import logger from '@adonisjs/core/services/logger'

export default class extends BaseSeeder {
  async run() {
    // Get required data
    const customers = await Customer.all()
    const products = await Product.all()
    const variants = await ProductVariant.all()
    const addresses = await Address.all()

    const productMap = new Map(products.map((p) => [p.slug, p]))
    const variantMap = new Map(variants.map((v) => [v.sku, v]))

    // Sample orders
    const ordersData = [
      {
        customerEmail: 'ahmad.fauzi@gmail.com',
        status: 'delivered' as const,
        items: [
          { productSlug: 'smok-nord-5-pod-kit-80w', variantSku: 'SMOK-NORD5-BLK', quantity: 1 },
          {
            productSlug: 'emkay-brew-mango-smoothie-60ml',
            variantSku: 'EMKAY-MANGO-3MG',
            quantity: 2,
          },
        ],
        shippingCost: 18000,
        courier: { code: 'jne', service: 'REG', name: 'JNE Regular', etd: '2-3' },
        daysAgo: 15,
      },
      {
        customerEmail: 'siti.rahayu@gmail.com',
        status: 'delivered' as const,
        items: [
          { productSlug: 'relx-infinity-plus-device', variantSku: 'RELX-INF-RSG', quantity: 1 },
          { productSlug: 'relx-pod-pro-grape-30ml', variantSku: 'RELX-GRAPE-30MG', quantity: 3 },
        ],
        shippingCost: 9000,
        courier: { code: 'jne', service: 'YES', name: 'JNE YES', etd: '1' },
        daysAgo: 12,
      },
      {
        customerEmail: 'budi.santoso@gmail.com',
        status: 'delivered' as const,
        items: [
          { productSlug: 'geekvape-aegis-legend-2-kit', variantSku: 'GEEK-AGL2-BLK', quantity: 1 },
          { productSlug: 'sony-vtc6-18650-3000mah-30a', variantSku: null, quantity: 4 },
          { productSlug: 'cotton-bacon-prime', variantSku: null, quantity: 2 },
        ],
        shippingCost: 12000,
        courier: { code: 'sicepat', service: 'REG', name: 'SiCepat REG', etd: '1-2' },
        daysAgo: 20,
      },
      {
        customerEmail: 'dewi.lestari@gmail.com',
        status: 'shipped' as const,
        items: [
          { productSlug: 'voopoo-argus-p1-pod-kit', variantSku: 'VOOP-P1-PNK', quantity: 1 },
          { productSlug: 'nasty-juice-cush-man-60ml', variantSku: 'NASTY-CUSH-3MG', quantity: 2 },
        ],
        shippingCost: 24000,
        courier: { code: 'jne', service: 'REG', name: 'JNE Regular', etd: '3-4' },
        daysAgo: 3,
      },
      {
        customerEmail: 'rudi.hermawan@gmail.com',
        status: 'processing' as const,
        items: [
          { productSlug: 'voopoo-drag-4-mod', variantSku: 'VOOP-D4-GNM', quantity: 1 },
          { productSlug: 'hellvape-dead-rabbit-3-rda', variantSku: 'HELL-DR3-BLK', quantity: 1 },
        ],
        shippingCost: 15000,
        courier: { code: 'jne', service: 'REG', name: 'JNE Regular', etd: '2-3' },
        daysAgo: 1,
      },
      {
        customerEmail: 'rina.wulandari@gmail.com',
        status: 'delivered' as const,
        items: [
          { productSlug: 'vaporesso-xros-3-mini', variantSku: 'VAPO-X3M-RPK', quantity: 1 },
          {
            productSlug: 'naked-100-salt-polar-breeze-30ml',
            variantSku: 'NKD-POLAR-35MG',
            quantity: 2,
          },
        ],
        shippingCost: 9000,
        courier: { code: 'jnt', service: 'REG', name: 'J&T Regular', etd: '1-2' },
        daysAgo: 8,
      },
      {
        customerEmail: 'doni.pratama@gmail.com',
        status: 'paid' as const,
        items: [
          {
            productSlug: 'indonesian-juice-kopi-susu-60ml',
            variantSku: 'INDJ-KOPI-6MG',
            quantity: 5,
          },
        ],
        shippingCost: 9000,
        courier: { code: 'jne', service: 'OKE', name: 'JNE OKE', etd: '2-3' },
        daysAgo: 0,
      },
      {
        customerEmail: 'maya.sari@gmail.com',
        status: 'delivered' as const,
        items: [
          { productSlug: 'iget-bar-plus-6000-puffs', variantSku: 'IGET-6000-GRAPE', quantity: 3 },
        ],
        shippingCost: 35000,
        courier: { code: 'jne', service: 'REG', name: 'JNE Regular', etd: '4-5' },
        daysAgo: 10,
      },
      {
        customerEmail: 'eko.wijaya@gmail.com',
        status: 'delivered' as const,
        items: [
          { productSlug: 'smok-rpm3-mesh-coil-023ohm-5pcs', variantSku: null, quantity: 2 },
          { productSlug: 'nitecore-i4-intellicharger', variantSku: null, quantity: 1 },
        ],
        shippingCost: 12000,
        courier: { code: 'sicepat', service: 'BEST', name: 'SiCepat BEST', etd: '1' },
        daysAgo: 25,
      },
      {
        customerEmail: 'fitri.handayani@gmail.com',
        status: 'pending_payment' as const,
        items: [
          { productSlug: 'coil-master-diy-kit-v3', variantSku: null, quantity: 1 },
          { productSlug: 'coilology-alien-clapton-wire-ss316l', variantSku: null, quantity: 2 },
        ],
        shippingCost: 18000,
        courier: { code: 'jne', service: 'REG', name: 'JNE Regular', etd: '2-3' },
        daysAgo: 0,
      },
    ]

    // Check if orders already exist
    const existingOrders = await Order.query().count('* as total')
    if (Number(existingOrders[0].$extras.total) > 0) {
      logger.info('✅ Orders already seeded, skipping...')
      return
    }

    let orderCount = 0
    let reviewCount = 0

    for (const orderData of ordersData) {
      const customer = customers.find((c) => c.email === orderData.customerEmail)
      const address = addresses.find((a) => a.customerId === customer?.id && a.isDefault)

      if (!customer || !address) continue

      // Calculate order totals
      let subtotal = 0
      const orderItems: Array<{
        product: Product
        variant: ProductVariant | null
        quantity: number
        price: number
        subtotal: number
      }> = []

      for (const item of orderData.items) {
        const product = productMap.get(item.productSlug)
        if (!product) continue

        const variant = item.variantSku ? variantMap.get(item.variantSku) : null
        const basePrice = Number(product.discountPrice) || Number(product.price) || 0
        const variantAdjustment = variant ? Number(variant.priceAdjustment) || 0 : 0
        const price = basePrice + variantAdjustment
        const itemSubtotal = price * item.quantity
        subtotal += itemSubtotal

        orderItems.push({
          product,
          variant: variant || null,
          quantity: item.quantity,
          price,
          subtotal: itemSubtotal,
        })
      }

      // Skip if no valid order items
      if (orderItems.length === 0 || subtotal === 0) {
        logger.info(`   ⚠️ Skipping order for ${orderData.customerEmail} - no valid items found`)
        continue
      }

      const total = subtotal + orderData.shippingCost
      const orderDate = DateTime.now().minus({ days: orderData.daysAgo })
      const orderNumber = `OGT${orderDate.toFormat('yyyyMMdd')}${String(orderCount + 1).padStart(4, '0')}`

      // Create order
      const order = await Order.create({
        orderNumber,
        customerId: customer.id,
        addressId: address.id,
        status: orderData.status,
        subtotal,
        tax: 0,
        shippingCost: orderData.shippingCost,
        discount: 0,
        adminFee: 0,
        total,
        createdAt: orderDate,
        updatedAt: orderDate,
        ...(orderData.status !== 'pending_payment' && {
          paidAt: orderDate.plus({ minutes: 30 }),
        }),
        ...(orderData.status === 'processing' && {
          processedAt: orderDate.plus({ hours: 2 }),
        }),
        ...(['shipped', 'delivered'].includes(orderData.status) && {
          processedAt: orderDate.plus({ hours: 2 }),
          shippedAt: orderDate.plus({ days: 1 }),
        }),
        ...(orderData.status === 'delivered' && {
          deliveredAt: orderDate.plus({
            days: Number.parseInt(orderData.courier.etd.split('-')[1] || orderData.courier.etd) + 1,
          }),
        }),
      })

      // Create order items
      for (const item of orderItems) {
        await OrderItem.create({
          orderId: order.id,
          productId: item.product.id,
          productVariantId: item.variant?.id || null,
          productName: item.product.name,
          productSku: item.variant?.sku || item.product.sku,
          variantName: item.variant ? `${item.variant.name}: ${item.variant.value}` : null,
          price: item.price,
          quantity: item.quantity,
          subtotal: item.subtotal,
        })
      }

      // Create payment
      if (orderData.status !== 'pending_payment') {
        await Payment.create({
          orderId: order.id,
          paymentType: ['bank_transfer', 'gopay', 'credit_card', 'qris'][
            Math.floor(Math.random() * 4)
          ],
          transactionId: `TXN${orderNumber}`,
          orderIdMidtrans: orderNumber,
          grossAmount: total,
          transactionStatus: 'settlement',
          statusCode: '200',
          transactionTime: orderDate.plus({ minutes: 30 }),
          settlementTime: orderDate.plus({ minutes: 35 }),
        })
      } else {
        await Payment.create({
          orderId: order.id,
          paymentType: 'bank_transfer',
          orderIdMidtrans: orderNumber,
          grossAmount: total,
          transactionStatus: 'pending',
          statusCode: '201',
          snapToken: `SNAP_${orderNumber}_TOKEN`,
          snapRedirectUrl: `https://app.sandbox.midtrans.com/snap/v3/redirection/${orderNumber}`,
          expiryTime: DateTime.now().plus({ hours: 24 }),
        })
      }

      // Create shipping
      if (['processing', 'shipped', 'delivered'].includes(orderData.status)) {
        const totalWeight = orderItems.reduce(
          (sum, item) => sum + item.product.weight * item.quantity,
          0
        )
        await Shipping.create({
          orderId: order.id,
          courierCode: orderData.courier.code,
          courierService: orderData.courier.service,
          courierName: orderData.courier.name,
          serviceDescription: `${orderData.courier.name} Service`,
          cost: orderData.shippingCost,
          weight: totalWeight,
          etd: orderData.courier.etd,
          waybill:
            orderData.status !== 'processing'
              ? `${orderData.courier.code.toUpperCase()}${Date.now()}${orderCount}`
              : null,
          originCityId: '151', // Default Jakarta
          destinationCityId: address.cityId,
          ...(orderData.status !== 'processing' && {
            shippedAt: orderDate.plus({ days: 1 }),
          }),
          ...(orderData.status === 'delivered' && {
            deliveredAt: orderDate.plus({
              days:
                Number.parseInt(orderData.courier.etd.split('-')[1] || orderData.courier.etd) + 1,
            }),
          }),
        })
      }

      // Create reviews for delivered orders
      if (orderData.status === 'delivered') {
        for (const item of orderItems) {
          const reviewTexts = [
            'Produk original dan berkualitas! Pengiriman cepat, packing aman. Recommended!',
            'Barang sesuai deskripsi, fast response. Puas banget sama pelayanannya.',
            'Liquid nya enak banget, rasa nya pas! Pasti repeat order.',
            'Device nya smooth, battery awet. Worth the price!',
            'Coil nya tahan lama, flavor production bagus. Mantap!',
            'Packaging rapi dan aman. Admin ramah dan helpful.',
            'Kualitas premium dengan harga terjangkau. Top!',
            'Sudah langganan di sini, selalu puas dengan produknya.',
          ]

          await Review.create({
            productId: item.product.id,
            customerId: customer.id,
            orderId: order.id,
            rating: Math.floor(Math.random() * 2) + 4, // 4-5 stars
            comment: reviewTexts[Math.floor(Math.random() * reviewTexts.length)],
            isVerifiedPurchase: true,
            isApproved: true,
            helpfulCount: Math.floor(Math.random() * 15),
          })
          reviewCount++
        }
      }

      orderCount++
    }

    logger.info('✅ Orders & Related Data seeded:')
    logger.info(`   ${orderCount} orders created`)
    logger.info(`   ${reviewCount} reviews created`)
  }
}
