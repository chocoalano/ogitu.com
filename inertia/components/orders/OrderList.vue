<script setup lang="ts">
import type { Order } from '~/types/order'
import OrderCard from './OrderCard.vue'
import OrderEmptyState from './OrderEmptyState.vue'
import OrderListSkeleton from './OrderListSkeleton.vue'

/**
 * OrderList - Orders list container with transitions
 */
defineProps<{
  orders: Order[]
  loading?: boolean
  filtered?: boolean
}>()

const emit = defineEmits<{
  pay: [order: Order]
  confirmReceived: [order: Order]
  cancel: [order: Order]
}>()
</script>

<template>
  <div>
    <!-- Loading State -->
    <OrderListSkeleton v-if="loading" :count="3" />

    <!-- Orders List -->
    <TransitionGroup
      v-else-if="orders.length > 0"
      tag="div"
      name="list"
      class="space-y-4 sm:space-y-6"
    >
      <OrderCard
        v-for="(order, index) in orders"
        :key="order.id"
        :order="order"
        :index="index"
        @pay="emit('pay', order)"
        @confirm-received="emit('confirmReceived', order)"
        @cancel="emit('cancel', order)"
      />
    </TransitionGroup>

    <!-- Empty State -->
    <OrderEmptyState v-else :filtered="filtered" />
  </div>
</template>

<style scoped>
.list-move,
.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateY(30px);
}

.list-leave-active {
  position: absolute;
  width: 100%;
}
</style>
