<script setup lang="ts">
import AdminLayout from '~/layouts/admin.vue'
import VoucherForm from '~/components/admin/promotions/VoucherForm.vue'
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
  <VoucherForm :products="products" mode="create" />
</template>
