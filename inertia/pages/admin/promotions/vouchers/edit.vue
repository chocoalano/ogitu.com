<script setup lang="ts">
import AdminLayout from '~/layouts/admin.vue'
import VoucherForm from '~/components/admin/promotions/VoucherForm.vue'
import type { PromotionProduct } from '~/types/promotion'

defineOptions({
  layout: AdminLayout,
})

interface VoucherEditData {
  id: number
  code: string
  name: string
  description: string | null
  type: 'percentage' | 'fixed' | 'free_shipping'
  value: number
  minPurchase: number
  maxDiscount: number | null
  startDate: string
  endDate: string
  usageLimit: number | null
  usageCount?: number
  usageLimitPerCustomer: number
  isActive: boolean
  isPublic: boolean
  appliesToAll: boolean
  productIds: number[]
}

interface Props {
  voucher: VoucherEditData
  products: PromotionProduct[]
}

defineProps<Props>()
</script>

<template>
  <VoucherForm :voucher="voucher" :products="products" mode="edit" />
</template>
