<script setup lang="ts">
const props = defineProps<{
  status: string
}>()

const statusConfig = {
  active: { label: 'Aktif', color: 'success' as const },
  upcoming: { label: 'Akan Datang', color: 'info' as const },
  expired: { label: 'Kadaluarsa', color: 'neutral' as const },
  inactive: { label: 'Nonaktif', color: 'warning' as const },
}

const config = statusConfig[props.status as keyof typeof statusConfig] || statusConfig.inactive
</script>

<template>
  <UBadge :color="config.color" variant="soft" size="sm">
    {{ config.label }}
  </UBadge>
</template>
