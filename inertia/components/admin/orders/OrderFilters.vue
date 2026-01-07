<script setup lang="ts">
import type { StatusOption } from '~/types/admin_order'

const search = defineModel<string>('search', { default: '' })
const status = defineModel<string>('status', { default: '' })

defineProps<{
  statusOptions: StatusOption[]
}>()
</script>

<template>
  <UCard>
    <div class="flex flex-col sm:flex-row gap-4">
      <UInput
        v-model="search"
        placeholder="Cari nomor pesanan atau nama customer..."
        icon="i-heroicons-magnifying-glass"
        class="flex-1"
        size="lg"
      />
      <USelectMenu
        v-model="status"
        :items="statusOptions"
        value-key="value"
        option-attribute="label"
        placeholder="Filter Status"
        class="w-full sm:w-64"
        size="lg"
      >
        <template #leading>
          <UIcon name="i-heroicons-funnel" class="w-5 h-5 text-gray-400" />
        </template>
      </USelectMenu>
    </div>
  </UCard>
</template>
