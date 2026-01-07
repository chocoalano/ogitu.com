<script setup lang="ts">
import AdminLayout from '~/layouts/admin.vue'
import DiscountForm from '~/components/admin/promotions/DiscountForm.vue'
import type { PromotionProduct } from '~/types/promotion'

defineOptions({
  layout: AdminLayout,
})

interface DiscountEditData {
  id: number
  name: string
  description: string | null
  type: 'percentage' | 'fixed'
  value: number
  minPurchase: number
  maxDiscount: number | null
  startDate: string
  endDate: string
  usageLimit: number | null
  usageCount?: number
  isActive: boolean
  appliesToAll: boolean
  productIds: number[]
}

interface Props {
  discount: DiscountEditData
  products: PromotionProduct[]
}

defineProps<Props>()
</script>

<template>
  <DiscountForm :discount="discount" :products="products" mode="edit" />
</template>
