<script setup lang="ts">
import { ref } from 'vue'
import { router, Link } from '@inertiajs/vue3'
import AdminLayout from '~/layouts/admin.vue'
import PromotionStatsCards from '~/components/admin/promotions/PromotionStatsCards.vue'
import PromotionFilters from '~/components/admin/promotions/PromotionFilters.vue'
import PromotionStatusBadge from '~/components/admin/promotions/PromotionStatusBadge.vue'
import PromotionPagination from '~/components/admin/promotions/PromotionPagination.vue'
import DeleteConfirmModal from '~/components/admin/promotions/DeleteConfirmModal.vue'
import type { Discount, PromotionStats, PromotionPagination as PaginationType } from '~/types/promotion'

defineOptions({
  layout: AdminLayout,
})

interface Props {
  discounts: Discount[]
  pagination: PaginationType
  stats: PromotionStats
  filters: {
    status: string
    search: string
    type: string
  }
}

const props = defineProps<Props>()

// Filter state
const selectedStatus = ref(props.filters.status || 'all')
const searchQuery = ref(props.filters.search)
const selectedType = ref(props.filters.type || 'all')
const isLoading = ref(false)

// Delete modal state
const showDeleteModal = ref(false)
const selectedDiscount = ref<Discount | null>(null)
const isDeleting = ref(false)

// Type options for filter
const typeOptions = [
  { label: 'Semua Tipe', value: 'all' },
  { label: 'Persentase', value: 'percentage' },
  { label: 'Nominal', value: 'fixed' },
]

// Dropdown menu items generator
const getDropdownItems = (discount: Discount) => [
  [
    { label: 'Lihat Detail', icon: 'i-heroicons-eye', to: `/admin/promotions/discounts/${discount.id}` },
    { label: 'Edit', icon: 'i-heroicons-pencil', to: `/admin/promotions/discounts/${discount.id}/edit` },
  ],
  [
    { label: 'Hapus', icon: 'i-heroicons-trash', color: 'error' as const, onSelect: () => confirmDelete(discount) },
  ],
]

// Apply filters
const applyFilters = () => {
  isLoading.value = true
  const params: Record<string, string> = {}
  if (selectedStatus.value && selectedStatus.value !== 'all') params.status = selectedStatus.value
  if (searchQuery.value) params.search = searchQuery.value
  if (selectedType.value && selectedType.value !== 'all') params.type = selectedType.value

  router.get(
    '/admin/promotions/discounts',
    params,
    {
      preserveState: true,
      preserveScroll: true,
      onFinish: () => {
        isLoading.value = false
      },
    }
  )
}

// Pagination
const goToPage = (page: number) => {
  isLoading.value = true
  const params: Record<string, string | number> = { page }
  if (selectedStatus.value && selectedStatus.value !== 'all') params.status = selectedStatus.value
  if (searchQuery.value) params.search = searchQuery.value
  if (selectedType.value && selectedType.value !== 'all') params.type = selectedType.value

  router.get(
    '/admin/promotions/discounts',
    params,
    {
      preserveState: true,
      preserveScroll: true,
      onFinish: () => {
        isLoading.value = false
      },
    }
  )
}

// Toggle active
const toggleActive = (discount: Discount) => {
  router.post(`/admin/promotions/discounts/${discount.id}/toggle`, {}, {
    preserveScroll: true,
  })
}

// Delete discount
const confirmDelete = (discount: Discount) => {
  selectedDiscount.value = discount
  showDeleteModal.value = true
}

const deleteDiscount = () => {
  if (!selectedDiscount.value) return

  isDeleting.value = true
  router.delete(`/admin/promotions/discounts/${selectedDiscount.value.id}`, {
    preserveScroll: true,
    onFinish: () => {
      isDeleting.value = false
      showDeleteModal.value = false
      selectedDiscount.value = null
    },
  })
}

// Format helpers
const formatDate = (dateStr: string) => {
  return new Date(dateStr).toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })
}
</script>

<template>
  <div class="p-6 space-y-6">
    <!-- Header -->
    <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      <div>
        <h1 class="text-2xl font-bold text-gray-900 dark:text-white">Diskon Produk</h1>
        <p class="text-gray-500 dark:text-gray-400">
          Kelola diskon yang berlaku untuk customer di seluruh platform
        </p>
      </div>
      <Link href="/admin/promotions/discounts/create">
        <UButton icon="i-heroicons-plus" color="primary">
          Buat Diskon
        </UButton>
      </Link>
    </div>

    <!-- Stats -->
    <PromotionStatsCards :stats="stats" type="discount" />

    <!-- Filters -->
    <PromotionFilters
      v-model:status="selectedStatus"
      v-model:search="searchQuery"
      v-model:type="selectedType"
      show-type-filter
      :type-options="typeOptions"
      @filter="applyFilters"
    />

    <!-- Discounts Table -->
    <UCard :ui="{ body: { padding: '' } }">
      <div class="overflow-x-auto">
        <table class="w-full">
          <thead>
            <tr class="border-b border-gray-200 dark:border-gray-700">
              <th class="px-4 py-3 text-left text-sm font-medium text-gray-500 dark:text-gray-400">
                Nama Diskon
              </th>
              <th class="px-4 py-3 text-left text-sm font-medium text-gray-500 dark:text-gray-400">
                Tipe
              </th>
              <th class="px-4 py-3 text-left text-sm font-medium text-gray-500 dark:text-gray-400">
                Nilai
              </th>
              <th class="px-4 py-3 text-left text-sm font-medium text-gray-500 dark:text-gray-400">
                Periode
              </th>
              <th class="px-4 py-3 text-left text-sm font-medium text-gray-500 dark:text-gray-400">
                Penggunaan
              </th>
              <th class="px-4 py-3 text-left text-sm font-medium text-gray-500 dark:text-gray-400">
                Status
              </th>
              <th class="px-4 py-3 text-right text-sm font-medium text-gray-500 dark:text-gray-400">
                Aksi
              </th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-200 dark:divide-gray-700">
            <tr
              v-for="discount in discounts"
              :key="discount.id"
              class="hover:bg-gray-50 dark:hover:bg-gray-800/50"
            >
              <td class="px-4 py-4">
                <div>
                  <p class="font-medium text-gray-900 dark:text-white">
                    {{ discount.name }}
                  </p>
                  <p class="text-sm text-gray-500 dark:text-gray-400">
                    {{ discount.appliesToAll ? 'Semua produk' : `${discount.productCount} produk` }}
                  </p>
                </div>
              </td>
              <td class="px-4 py-4">
                <UBadge :color="discount.type === 'percentage' ? 'primary' : 'info'" variant="soft" size="sm">
                  {{ discount.typeLabel }}
                </UBadge>
              </td>
              <td class="px-4 py-4">
                <span class="font-semibold text-gray-900 dark:text-white">
                  {{ discount.valueDisplay }}
                </span>
              </td>
              <td class="px-4 py-4">
                <div class="text-sm">
                  <p class="text-gray-900 dark:text-white">
                    {{ formatDate(discount.startDate) }}
                  </p>
                  <p class="text-gray-500 dark:text-gray-400">
                    s/d {{ formatDate(discount.endDate) }}
                  </p>
                </div>
              </td>
              <td class="px-4 py-4">
                <div class="text-sm">
                  <p class="text-gray-900 dark:text-white">
                    {{ discount.usageCount }} kali
                  </p>
                  <p v-if="discount.usageLimit" class="text-gray-500 dark:text-gray-400">
                    dari {{ discount.usageLimit }}
                  </p>
                </div>
              </td>
              <td class="px-4 py-4">
                <PromotionStatusBadge :status="discount.status" />
              </td>
              <td class="px-4 py-4">
                <div class="flex items-center justify-end gap-2">
                  <USwitch
                    :model-value="Boolean(discount.isActive)"
                    size="sm"
                    @update:model-value="toggleActive(discount)"
                  />
                  <UDropdownMenu :items="getDropdownItems(discount)">
                    <UButton
                      icon="i-heroicons-ellipsis-vertical"
                      color="neutral"
                      variant="ghost"
                      size="sm"
                    />
                  </UDropdownMenu>
                </div>
              </td>
            </tr>

            <tr v-if="discounts.length === 0">
              <td colspan="7" class="px-4 py-12 text-center">
                <div class="flex flex-col items-center">
                  <UIcon name="i-heroicons-tag" class="w-12 h-12 text-gray-300 dark:text-gray-600 mb-4" />
                  <p class="text-gray-500 dark:text-gray-400 mb-4">Belum ada diskon</p>
                  <Link href="/admin/promotions/discounts/create">
                    <UButton icon="i-heroicons-plus" color="primary" variant="soft">
                      Buat Diskon Pertama
                    </UButton>
                  </Link>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Pagination -->
      <div v-if="discounts.length > 0" class="px-4 pb-4">
        <PromotionPagination
          :current-page="pagination.currentPage"
          :last-page="pagination.lastPage"
          :total="pagination.total"
          :per-page="pagination.perPage"
          @page-change="goToPage"
        />
      </div>
    </UCard>

    <!-- Delete Modal -->
    <DeleteConfirmModal
      :show="showDeleteModal"
      title="Hapus Diskon"
      :message="`Apakah Anda yakin ingin menghapus diskon '${selectedDiscount?.name}'? Tindakan ini tidak dapat dibatalkan.`"
      :loading="isDeleting"
      @close="showDeleteModal = false"
      @confirm="deleteDiscount"
    />
  </div>
</template>
