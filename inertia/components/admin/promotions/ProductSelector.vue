<script setup lang="ts">
import { ref, computed, watch } from 'vue'

interface Product {
  id: number
  name: string
  image: string
  price: number
}

const props = defineProps<{
  products: Product[]
  selectedIds: number[]
  appliesToAll: boolean
}>()

const emit = defineEmits<{
  (e: 'update:selectedIds', value: number[]): void
  (e: 'update:appliesToAll', value: boolean): void
}>()

const searchQuery = ref('')
const localSelectedIds = ref<number[]>([...props.selectedIds])
const localAppliesToAll = ref(props.appliesToAll)

watch(() => props.selectedIds, (newVal) => {
  localSelectedIds.value = [...newVal]
})

watch(() => props.appliesToAll, (newVal) => {
  localAppliesToAll.value = newVal
})

const filteredProducts = computed(() => {
  if (!searchQuery.value) return props.products
  return props.products.filter((p) =>
    p.name.toLowerCase().includes(searchQuery.value.toLowerCase())
  )
})

const selectedProducts = computed(() => {
  return props.products.filter((p) => localSelectedIds.value.includes(p.id))
})

const isSelected = (id: number) => localSelectedIds.value.includes(id)

const toggleProduct = (id: number) => {
  const index = localSelectedIds.value.indexOf(id)
  if (index === -1) {
    localSelectedIds.value.push(id)
  } else {
    localSelectedIds.value.splice(index, 1)
  }
  emit('update:selectedIds', localSelectedIds.value)
}

const removeProduct = (id: number) => {
  localSelectedIds.value = localSelectedIds.value.filter((i) => i !== id)
  emit('update:selectedIds', localSelectedIds.value)
}

const selectAll = () => {
  localSelectedIds.value = props.products.map((p) => p.id)
  emit('update:selectedIds', localSelectedIds.value)
}

const deselectAll = () => {
  localSelectedIds.value = []
  emit('update:selectedIds', localSelectedIds.value)
}

const toggleAppliesToAll = (value: boolean) => {
  localAppliesToAll.value = value
  emit('update:appliesToAll', value)
  if (value) {
    localSelectedIds.value = []
    emit('update:selectedIds', [])
  }
}

const formatPrice = (price: number) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
  }).format(price)
}

// Image URL helper
const getImageUrl = (url: string | undefined | null): string => {
  if (!url || url === '/images/placeholder.png') {
    return 'https://placehold.co/100x100/1a1a2e/ffffff?text=No+Image'
  }
  if (url.startsWith('http://') || url.startsWith('https://')) {
    return url
  }
  // Relative path - already formatted by backend with /storage/ prefix
  return url
}
</script>

<template>
  <div class="space-y-4">
    <!-- Applies to all toggle -->
    <div class="flex items-center justify-between p-4 rounded-lg bg-gray-50 dark:bg-gray-800">
      <div>
        <p class="font-medium text-gray-900 dark:text-white">Berlaku untuk semua produk</p>
        <p class="text-sm text-gray-500 dark:text-gray-400">
          Promosi akan berlaku untuk semua produk di platform
        </p>
      </div>
      <USwitch :model-value="localAppliesToAll" @update:model-value="toggleAppliesToAll" />
    </div>

    <!-- Product selection (only shown when not applies to all) -->
    <template v-if="!localAppliesToAll">
      <!-- Selected products summary -->
      <div v-if="selectedProducts.length > 0" class="space-y-2">
        <div class="flex items-center justify-between">
          <p class="font-medium text-gray-900 dark:text-white">
            {{ selectedProducts.length }} produk dipilih
          </p>
          <UButton size="xs" color="neutral" variant="ghost" @click="deselectAll">
            Hapus Semua
          </UButton>
        </div>
        <div class="flex flex-wrap gap-2">
          <UBadge
            v-for="product in selectedProducts"
            :key="product.id"
            color="primary"
            variant="soft"
            class="pr-1"
          >
            <span class="mr-1">{{ product.name }}</span>
            <UButton
              size="2xs"
              color="primary"
              variant="ghost"
              icon="i-heroicons-x-mark"
              :padded="false"
              @click.stop="removeProduct(product.id)"
            />
          </UBadge>
        </div>
      </div>

      <!-- Search and product list -->
      <div class="space-y-3">
        <div class="flex items-center gap-2">
          <UInput
            v-model="searchQuery"
            placeholder="Cari produk..."
            icon="i-heroicons-magnifying-glass"
            class="flex-1"
          />
          <UButton
            v-if="selectedProducts.length < products.length"
            size="sm"
            color="neutral"
            variant="ghost"
            @click="selectAll"
          >
            Pilih Semua
          </UButton>
        </div>

        <div class="max-h-64 overflow-y-auto space-y-2 border border-gray-200 dark:border-gray-700 rounded-lg p-3">
          <div
            v-for="product in filteredProducts"
            :key="product.id"
            class="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer transition-colors"
            :class="{ 'bg-primary-50 dark:bg-primary-900/20': isSelected(product.id) }"
            @click="toggleProduct(product.id)"
          >
            <UCheckbox :model-value="isSelected(product.id)" @click.stop />
            <img
              :src="getImageUrl(product.image)"
              :alt="product.name"
              class="w-10 h-10 rounded object-cover bg-gray-100 dark:bg-gray-800"
            />
            <div class="flex-1 min-w-0">
              <p class="font-medium text-gray-900 dark:text-white truncate text-sm">
                {{ product.name }}
              </p>
              <p class="text-xs text-gray-500 dark:text-gray-400">
                {{ formatPrice(product.price) }}
              </p>
            </div>
          </div>

          <div v-if="filteredProducts.length === 0" class="text-center py-8 text-gray-500 dark:text-gray-400">
            <UIcon name="i-heroicons-inbox" class="w-8 h-8 mx-auto mb-2" />
            <p>Tidak ada produk ditemukan</p>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>
