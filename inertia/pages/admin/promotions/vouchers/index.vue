<script setup lang="ts">
import { ref } from 'vue'
import { router, Link } from '@inertiajs/vue3'
import AdminLayout from '~/layouts/admin.vue'
import PromotionStatsCards from '~/components/admin/promotions/PromotionStatsCards.vue'
import PromotionFilters from '~/components/admin/promotions/PromotionFilters.vue'
import PromotionStatusBadge from '~/components/admin/promotions/PromotionStatusBadge.vue'
import PromotionPagination from '~/components/admin/promotions/PromotionPagination.vue'
import DeleteConfirmModal from '~/components/admin/promotions/DeleteConfirmModal.vue'
import type { Voucher, PromotionStats, PromotionPagination as PaginationType } from '~/types/promotion'

defineOptions({
  layout: AdminLayout,
})

interface Props {
  vouchers: Voucher[]
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
const selectedVoucher = ref<Voucher | null>(null)
const isDeleting = ref(false)

// Type options for filter
const typeOptions = [
  { label: 'Semua Tipe', value: 'all' },
  { label: 'Persentase', value: 'percentage' },
  { label: 'Nominal', value: 'fixed' },
  { label: 'Gratis Ongkir', value: 'free_shipping' },
]

// Dropdown menu items generator
const getDropdownItems = (voucher: Voucher) => [
  [
    { label: 'Lihat Detail', icon: 'i-heroicons-eye', to: `/admin/promotions/vouchers/${voucher.id}` },
    { label: 'Edit', icon: 'i-heroicons-pencil', to: `/admin/promotions/vouchers/${voucher.id}/edit` },
  ],
  [
    { label: 'Hapus', icon: 'i-heroicons-trash', color: 'error' as const, onSelect: () => confirmDelete(voucher) },
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
    '/admin/promotions/vouchers',
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
    '/admin/promotions/vouchers',
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
const toggleActive = (voucher: Voucher) => {
  router.post(`/admin/promotions/vouchers/${voucher.id}/toggle`, {}, {
    preserveScroll: true,
  })
}

// Delete voucher
const confirmDelete = (voucher: Voucher) => {
  selectedVoucher.value = voucher
  showDeleteModal.value = true
}

const deleteVoucher = () => {
  if (!selectedVoucher.value) return

  isDeleting.value = true
  router.delete(`/admin/promotions/vouchers/${selectedVoucher.value.id}`, {
    preserveScroll: true,
    onFinish: () => {
      isDeleting.value = false
      showDeleteModal.value = false
      selectedVoucher.value = null
    },
  })
}

// Copy voucher code
const copyCode = (code: string) => {
  navigator.clipboard.writeText(code)
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
        <h1 class="text-2xl font-bold text-gray-900 dark:text-white">Voucher</h1>
        <p class="text-gray-500 dark:text-gray-400">
          Kelola voucher untuk pelanggan Anda
        </p>
      </div>
      <Link href="/admin/promotions/vouchers/create">
        <UButton icon="i-heroicons-plus" color="primary">
          Buat Voucher
        </UButton>
      </Link>
    </div>

    <!-- Stats -->
    <PromotionStatsCards :stats="stats" type="voucher" />

    <!-- Filters -->
    <PromotionFilters
      v-model:status="selectedStatus"
      v-model:search="searchQuery"
      v-model:type="selectedType"
      show-type-filter
      :type-options="typeOptions"
      @filter="applyFilters"
    />

    <!-- Vouchers Table -->
    <UCard :ui="{ body: { padding: '' } }">
      <div class="overflow-x-auto">
        <table class="w-full">
          <thead>
            <tr class="border-b border-gray-200 dark:border-gray-700">
              <th class="px-4 py-3 text-left text-sm font-medium text-gray-500 dark:text-gray-400">
                Kode & Nama
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
              v-for="voucher in vouchers"
              :key="voucher.id"
              class="hover:bg-gray-50 dark:hover:bg-gray-800/50"
            >
              <td class="px-4 py-4">
                <div>
                  <div class="flex items-center gap-2">
                    <code class="px-2 py-1 rounded bg-gray-100 dark:bg-gray-800 text-sm font-mono text-primary-600 dark:text-primary-400">
                      {{ voucher.code }}
                    </code>
                    <UButton
                      icon="i-heroicons-clipboard-document"
                      color="neutral"
                      variant="ghost"
                      size="xs"
                      @click="copyCode(voucher.code)"
                    />
                  </div>
                  <p class="text-sm text-gray-500 dark:text-gray-400 mt-1">
                    {{ voucher.name }}
                  </p>
                </div>
              </td>
              <td class="px-4 py-4">
                <UBadge
                  :color="voucher.type === 'free_shipping' ? 'success' : voucher.type === 'percentage' ? 'primary' : 'info'"
                  variant="soft"
                  size="sm"
                >
                  {{ voucher.typeLabel }}
                </UBadge>
              </td>
              <td class="px-4 py-4">
                <span class="font-semibold text-gray-900 dark:text-white">
                  {{ voucher.valueDisplay }}
                </span>
              </td>
              <td class="px-4 py-4">
                <div class="text-sm">
                  <p class="text-gray-900 dark:text-white">
                    {{ formatDate(voucher.startDate) }}
                  </p>
                  <p class="text-gray-500 dark:text-gray-400">
                    s/d {{ formatDate(voucher.endDate) }}
                  </p>
                </div>
              </td>
              <td class="px-4 py-4">
                <div class="text-sm">
                  <p class="text-gray-900 dark:text-white">
                    {{ voucher.usageCount }} kali
                  </p>
                  <p v-if="voucher.usageLimit" class="text-gray-500 dark:text-gray-400">
                    dari {{ voucher.usageLimit }}
                  </p>
                </div>
              </td>
              <td class="px-4 py-4">
                <div class="flex flex-col gap-1">
                  <PromotionStatusBadge :status="voucher.status" />
                  <UBadge v-if="voucher.isPublic" color="info" variant="soft" size="xs">
                    Publik
                  </UBadge>
                </div>
              </td>
              <td class="px-4 py-4">
                <div class="flex items-center justify-end gap-2">
                  <USwitch
                    :model-value="Boolean(voucher.isActive)"
                    size="sm"
                    @update:model-value="toggleActive(voucher)"
                  />
                  <UDropdownMenu :items="getDropdownItems(voucher)">
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

            <tr v-if="vouchers.length === 0">
              <td colspan="7" class="px-4 py-12 text-center">
                <div class="flex flex-col items-center">
                  <UIcon name="i-heroicons-ticket" class="w-12 h-12 text-gray-300 dark:text-gray-600 mb-4" />
                  <p class="text-gray-500 dark:text-gray-400 mb-4">Belum ada voucher</p>
                  <Link href="/admin/promotions/vouchers/create">
                    <UButton icon="i-heroicons-plus" color="primary" variant="soft">
                      Buat Voucher Pertama
                    </UButton>
                  </Link>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Pagination -->
      <div v-if="vouchers.length > 0" class="px-4 pb-4">
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
      title="Hapus Voucher"
      :message="`Apakah Anda yakin ingin menghapus voucher '${selectedVoucher?.code}'? Tindakan ini tidak dapat dibatalkan.`"
      :loading="isDeleting"
      @close="showDeleteModal = false"
      @confirm="deleteVoucher"
    />
  </div>
</template>
