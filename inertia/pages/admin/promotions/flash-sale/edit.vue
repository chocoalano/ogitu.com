<script setup lang="ts">
import AdminLayout from '~/layouts/admin.vue'
import FlashSaleForm from '~/components/admin/promotions/FlashSaleForm.vue'
import type { PromotionProduct } from '~/types/promotion'

defineOptions({
  layout: AdminLayout,
})

interface FlashSaleProduct {
  product_id: number
  name: string
  image: string
  original_price: number
  flash_price: number
  stock_limit: number
  sold_count?: number
}

interface FlashSaleData {
  id: number
  name: string
  description: string | null
  startDate: string
  endDate: string
  isActive: boolean
  products: FlashSaleProduct[]
}

interface Props {
  flashSale: FlashSaleData
  products: PromotionProduct[]
}

defineProps<Props>()
</script>

<template>
  <FlashSaleForm mode="edit" :flash-sale="flashSale" :products="products" />
</template>
