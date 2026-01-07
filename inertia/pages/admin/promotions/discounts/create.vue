<script setup lang="ts">
import AdminLayout from '~/layouts/admin.vue'
import DiscountForm from '~/components/admin/promotions/DiscountForm.vue'
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
  <DiscountForm :products="products" mode="create" />
</template>
