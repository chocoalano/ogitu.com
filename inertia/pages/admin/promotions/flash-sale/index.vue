<script setup lang="ts">
import { ref } from 'vue'
import { router, Link } from '@inertiajs/vue3'
import AdminLayout from '~/layouts/admin.vue'
import PromotionStatsCards from '~/components/admin/promotions/PromotionStatsCards.vue'
import PromotionFilters from '~/components/admin/promotions/PromotionFilters.vue'
import PromotionStatusBadge from '~/components/admin/promotions/PromotionStatusBadge.vue'
import PromotionPagination from '~/components/admin/promotions/PromotionPagination.vue'
import DeleteConfirmModal from '~/components/admin/promotions/DeleteConfirmModal.vue'
import type { FlashSale, PromotionStats, PromotionPagination as PaginationType } from '~/types/promotion'

defineOptions({
  layout: AdminLayout,
})

interface Props {
  flashSales: FlashSale[]
  pagination: PaginationType
  stats: PromotionStats
  filters: {
    status: string
    search: string
  }
}

const props = defineProps<Props>()

// Filter state
const selectedStatus = ref(props.filters.status)
const searchQuery = ref(props.filters.search)
const isLoading = ref(false)

// Delete modal state
const showDeleteModal = ref(false)
const selectedFlashSale = ref<FlashSale | null>(null)
const isDeleting = ref(false)

// Apply filters
const applyFilters = () => {
  isLoading.value = true
  router.get(
    '/admin/promotions/flash-sale',
    {
      status: selectedStatus.value,
      search: searchQuery.value,
    },
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
  router.get(
    '/admin/promotions/flash-sale',
    {
      status: selectedStatus.value,
      search: searchQuery.value,
      page,
    },
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
const toggleActive = (flashSale: FlashSale) => {
  router.post(`/admin/promotions/flash-sale/${flashSale.id}/toggle`, {}, {
    preserveScroll: true,
  })
}

// Delete flash sale
const confirmDelete = (flashSale: FlashSale) => {
  selectedFlashSale.value = flashSale
  showDeleteModal.value = true
}

const deleteFlashSale = () => {
  if (!selectedFlashSale.value) return

  isDeleting.value = true
  router.delete(`/admin/promotions/flash-sale/${selectedFlashSale.value.id}`, {
    preserveScroll: true,
    onFinish: () => {
      isDeleting.value = false
      showDeleteModal.value = false
      selectedFlashSale.value = null
    },
  })
}

// Format helpers
const formatDate = (dateStr: string) => {
  return new Date(dateStr).toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}
</script>

<template>
  <div class="p-6 space-y-6">
    <!-- Header -->
    <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      <div>
        <h1 class="text-2xl font-bold text-gray-900 dark:text-white">Flash Sale</h1>
        <p class="text-gray-500 dark:text-gray-400">
          Kelola flash sale untuk meningkatkan penjualan
        </p>
      </div>
      <Link href="/admin/promotions/flash-sale/create">
        <UButton icon="i-heroicons-plus" color="primary">
          Buat Flash Sale
        </UButton>
      </Link>
    </div>

    <!-- Stats -->
    <PromotionStatsCards :stats="stats" type="flash-sale" />

    <!-- Filters -->
    <PromotionFilters
      v-model:status="selectedStatus"
      v-model:search="searchQuery"
      @filter="applyFilters"
    />

    <!-- Flash Sales Grid -->
    <div v-if="flashSales.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <UCard v-for="flashSale in flashSales" :key="flashSale.id" class="relative overflow-hidden">
        <!-- Status Badge -->
        <div class="absolute top-4 right-4 z-10">
          <PromotionStatusBadge :status="flashSale.status" />
        </div>

        <div class="space-y-4">
          <!-- Header -->
          <div>
            <h3 class="font-semibold text-gray-900 dark:text-white pr-20 line-clamp-1">
              {{ flashSale.name }}
            </h3>
            <p v-if="flashSale.description" class="text-sm text-gray-500 dark:text-gray-400 line-clamp-2 mt-1">
              {{ flashSale.description }}
            </p>
          </div>

          <!-- Period -->
          <div class="text-sm">
            <div class="flex items-center gap-2 text-gray-600 dark:text-gray-300">
              <UIcon name="i-heroicons-calendar" class="w-4 h-4" />
              <span>{{ formatDate(flashSale.startDate) }}</span>
            </div>
            <div class="flex items-center gap-2 text-gray-500 dark:text-gray-400 mt-1">
              <UIcon name="i-heroicons-arrow-right" class="w-4 h-4" />
              <span>{{ formatDate(flashSale.endDate) }}</span>
            </div>
          </div>

          <!-- Progress (for active) -->
          <div v-if="flashSale.status === 'active'" class="space-y-2">
            <div class="flex items-center justify-between text-sm">
              <span class="text-gray-500 dark:text-gray-400">Progress</span>
              <span class="font-medium text-primary-600 dark:text-primary-400">
                {{ flashSale.timeRemaining }}
              </span>
            </div>
            <UProgress :value="flashSale.progress" color="primary" size="sm" />
          </div>

          <!-- Stats -->
          <div class="grid grid-cols-2 gap-4 pt-2 border-t border-gray-200 dark:border-gray-700">
            <div class="text-center">
              <p class="text-2xl font-bold text-gray-900 dark:text-white">
                {{ flashSale.productCount }}
              </p>
              <p class="text-xs text-gray-500 dark:text-gray-400">Produk</p>
            </div>
            <div class="text-center">
              <p class="text-2xl font-bold text-primary-600 dark:text-primary-400">
                {{ flashSale.totalSold }}
              </p>
              <p class="text-xs text-gray-500 dark:text-gray-400">Terjual</p>
            </div>
          </div>

          <!-- Actions -->
          <div class="flex items-center justify-between pt-2 border-t border-gray-200 dark:border-gray-700">
            <USwitch
              :model-value="Boolean(flashSale.isActive)"
              size="sm"
              @update:model-value="toggleActive(flashSale)"
            />
            <div class="flex items-center gap-1">
              <Link :href="`/admin/promotions/flash-sale/${flashSale.id}`">
                <UButton icon="i-heroicons-eye" color="neutral" variant="ghost" size="sm" />
              </Link>
              <Link :href="`/admin/promotions/flash-sale/${flashSale.id}/edit`">
                <UButton icon="i-heroicons-pencil" color="neutral" variant="ghost" size="sm" />
              </Link>
              <UButton
                icon="i-heroicons-trash"
                color="error"
                variant="ghost"
                size="sm"
                @click="confirmDelete(flashSale)"
              />
            </div>
          </div>
        </div>
      </UCard>
    </div>

    <!-- Empty State -->
    <UCard v-else>
      <div class="text-center py-12">
        <UIcon name="i-heroicons-bolt" class="w-12 h-12 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
        <p class="text-gray-500 dark:text-gray-400 mb-4">Belum ada flash sale</p>
        <Link href="/admin/promotions/flash-sale/create">
          <UButton icon="i-heroicons-plus" color="primary" variant="soft">
            Buat Flash Sale Pertama
          </UButton>
        </Link>
      </div>
    </UCard>

    <!-- Pagination -->
    <div v-if="flashSales.length > 0">
      <PromotionPagination
        :current-page="pagination.currentPage"
        :last-page="pagination.lastPage"
        :total="pagination.total"
        :per-page="pagination.perPage"
        @page-change="goToPage"
      />
    </div>

    <!-- Delete Modal -->
    <DeleteConfirmModal
      :show="showDeleteModal"
      title="Hapus Flash Sale"
      :message="`Apakah Anda yakin ingin menghapus flash sale '${selectedFlashSale?.name}'? Tindakan ini tidak dapat dibatalkan.`"
      :loading="isDeleting"
      @close="showDeleteModal = false"
      @confirm="deleteFlashSale"
    />
  </div>
</template>
