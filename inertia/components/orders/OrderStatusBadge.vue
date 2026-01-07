<script setup lang="ts">
import { ORDER_STATUS_CONFIG } from '~/types/order'
import type { OrderStatusType } from '~/types/order'

/**
 * OrderStatusBadge - Styled status badge with icon
 */
const props = defineProps<{
  status: OrderStatusType | string
  size?: 'sm' | 'md' | 'lg'
  showIcon?: boolean
  animated?: boolean
}>()

const config = ORDER_STATUS_CONFIG[props.status] || ORDER_STATUS_CONFIG.pending_payment

const sizeClasses = {
  sm: 'px-2 py-1 text-xs gap-1',
  md: 'px-3 py-1.5 text-sm gap-1.5',
  lg: 'px-4 py-2 text-base gap-2',
}

const iconSizes = {
  sm: 'w-3 h-3',
  md: 'w-4 h-4',
  lg: 'w-5 h-5',
}
</script>

<template>
  <span
    :class="[
      'inline-flex items-center font-medium rounded-full border transition-all duration-300',
      config.bgClass,
      config.textClass,
      config.borderClass,
      sizeClasses[size || 'md'],
      animated && 'hover:scale-105',
      animated && config.glowClass && `hover:shadow-lg ${config.glowClass}`,
    ]"
  >
    <!-- Pulse indicator for pending -->
    <span
      v-if="status === 'pending_payment'"
      class="relative flex h-2 w-2"
    >
      <span
        class="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"
      />
      <span class="relative inline-flex rounded-full h-2 w-2 bg-amber-500" />
    </span>

    <!-- Icon -->
    <UIcon
      v-else-if="showIcon !== false"
      :name="config.icon"
      :class="[
        iconSizes[size || 'md'],
        status === 'processing' && 'animate-spin',
      ]"
    />

    <!-- Label -->
    <span>{{ config.label }}</span>
  </span>
</template>
