<script setup lang="ts">
import type { RoleOption } from './types'

defineProps<{
  roleOptions: RoleOption[]
}>()

const globalFilter = defineModel<string>('globalFilter', { default: '' })
const selectedRole = defineModel<string>('selectedRole', { default: 'all' })

const emit = defineEmits<{
  search: []
  roleChange: []
  clear: []
}>()

const handleSearch = () => {
  emit('search')
}

const handleRoleChange = () => {
  emit('roleChange')
}

const handleClear = () => {
  emit('clear')
}
</script>

<template>
  <div class="flex flex-col sm:flex-row gap-4 px-4 py-3.5 border-b border-slate-200 dark:border-slate-800">
    <!-- Search -->
    <div class="flex-1">
      <UInput
        v-model="globalFilter"
        placeholder="Cari nama atau email..."
        icon="i-heroicons-magnifying-glass"
        class="max-w-sm"
        @keyup.enter="handleSearch"
      />
    </div>

    <!-- Role Filter -->
    <div class="w-full sm:w-48">
      <USelect
        v-model="selectedRole"
        :items="roleOptions"
        placeholder="Filter Role"
        @change="handleRoleChange"
      />
    </div>

    <!-- Actions -->
    <div class="flex gap-2">
      <UButton
        icon="i-heroicons-magnifying-glass"
        color="primary"
        @click="handleSearch"
      >
        Cari
      </UButton>
      <UButton
        icon="i-heroicons-x-mark"
        color="neutral"
        variant="outline"
        @click="handleClear"
      >
        Reset
      </UButton>
    </div>
  </div>
</template>
