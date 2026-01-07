<script setup lang="ts">
import AdminLayout from '~/layouts/admin.vue'
import FlashSaleForm from '~/components/admin/promotions/FlashSaleForm.vue'
import type { PromotionProduct } from '~/types/promotion'

defineOptions({
  layout: AdminLayout,
})

interface Props {
  products: PromotionProduct[]
}

defineProps<Props>()
</script>

<template>
  <FlashSaleForm mode="create" :products="products" />
</template>
