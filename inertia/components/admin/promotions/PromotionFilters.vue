<script setup lang="ts">
import { ref, watch } from 'vue'

const props = defineProps<{
  status: string
  search: string
  type?: string
  showTypeFilter?: boolean
  typeOptions?: Array<{ label: string; value: string }>
}>()

const emit = defineEmits<{
  (e: 'update:status', value: string): void
  (e: 'update:search', value: string): void
  (e: 'update:type', value: string): void
  (e: 'filter'): void
}>()

const localStatus = ref(props.status)
const localSearch = ref(props.search)
const localType = ref(props.type || '')

const statusOptions = [
  { label: 'Semua', value: 'all' },
  { label: 'Aktif', value: 'active' },
  { label: 'Akan Datang', value: 'upcoming' },
  { label: 'Kadaluarsa', value: 'expired' },
  { label: 'Nonaktif', value: 'inactive' },
]

watch([localStatus, localType], () => {
  emit('update:status', localStatus.value)
  emit('update:type', localType.value)
  emit('filter')
})

const handleSearch = () => {
  emit('update:search', localSearch.value)
  emit('filter')
}

const handleKeydown = (e: KeyboardEvent) => {
  if (e.key === 'Enter') {
    handleSearch()
  }
}
</script>

<template>
  <UCard>
    <div class="flex flex-col sm:flex-row gap-4">
      <UInput
        v-model="localSearch"
        placeholder="Cari..."
        icon="i-heroicons-magnifying-glass"
        class="flex-1"
        @keydown="handleKeydown"
      >
        <template #trailing>
          <UButton
            v-if="localSearch"
            color="neutral"
            variant="link"
            icon="i-heroicons-x-mark"
            :padded="false"
            @click="localSearch = ''; handleSearch()"
          />
        </template>
      </UInput>

      <USelectMenu
        v-model="localStatus"
        :items="statusOptions"
        value-key="value"
        placeholder="Status"
        class="w-full sm:w-48"
      />

      <USelectMenu
        v-if="showTypeFilter && typeOptions"
        v-model="localType"
        :items="typeOptions"
        value-key="value"
        placeholder="Tipe"
        class="w-full sm:w-48"
      />

      <UButton
        icon="i-heroicons-magnifying-glass"
        color="primary"
        @click="handleSearch"
      >
        Cari
      </UButton>
    </div>
  </UCard>
</template>
