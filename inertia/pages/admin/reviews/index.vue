<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch } from 'vue'
import { router } from '@inertiajs/vue3'
import AdminLayout from '~/layouts/admin.vue'
import ReviewStatsCards from '~/components/admin/reviews/ReviewStatsCards.vue'
import ReviewRatingDistribution from '~/components/admin/reviews/ReviewRatingDistribution.vue'
import ReviewFilters from '~/components/admin/reviews/ReviewFilters.vue'
import ReviewCard from '~/components/admin/reviews/ReviewCard.vue'
import ReviewPagination from '~/components/admin/reviews/ReviewPagination.vue'
import { useAdminReviews } from '~/composables/use_transmit'
import type { Review, ReviewStats, ReviewFilters as ReviewFiltersType, ReviewProduct, ReviewMeta } from '~/types/review'

defineOptions({
  layout: AdminLayout,
})

interface Props {
  admin?: {
    id: number
    storeName: string
  }
  reviews?: Review[]
  meta?: ReviewMeta
  stats?: ReviewStats
  products?: ReviewProduct[]
  filters?: ReviewFiltersType
}

const props = withDefaults(defineProps<Props>(), {
  admin: () => ({ id: 0, storeName: 'Admin' }),
  reviews: () => [],
  meta: () => ({
    total: 0,
    perPage: 10,
    currentPage: 1,
    lastPage: 1,
    firstPage: 1,
  }),
  stats: () => ({
    total: 0,
    pending: 0,
    approved: 0,
    averageRating: 0,
    fiveStars: 0,
    fourStars: 0,
    threeStars: 0,
    twoStars: 0,
    oneStar: 0,
  }),
  products: () => [],
  filters: () => ({
    status: 'all',
    rating: null,
    search: '',
    productId: null,
    dateFrom: '',
    dateTo: '',
  }),
})

// Reactive reviews list for realtime updates
const localReviews = ref<Review[]>(Array.isArray(props.reviews) ? [...props.reviews] : [])

// Watch for props.reviews changes from server (page navigation, filter changes)
watch(
  () => props.reviews,
  (newReviews) => {
    localReviews.value = Array.isArray(newReviews) ? [...newReviews] : []
  },
  { deep: true }
)

// Setup realtime with transmit
const { isConnected, onReplyReceived } = useAdminReviews()

// Handle realtime reply updates
let cleanupReplyListener: (() => void) | null = null

onMounted(() => {
  cleanupReplyListener = onReplyReceived((data) => {
    // Update the review in local list
    const reviewIndex = localReviews.value.findIndex((r) => r.id === data.reviewId)
    if (reviewIndex !== -1) {
      localReviews.value[reviewIndex] = {
        ...localReviews.value[reviewIndex],
        adminReply: data.adminReply,
        adminRepliedAt: data.adminRepliedAt,
      }
    }
  })
})

onUnmounted(() => {
  if (cleanupReplyListener) {
    cleanupReplyListener()
  }
})

const isLoading = ref(false)
const currentFilters = ref({ ...props.filters })

// Apply filters
const applyFilters = (filters: { status: string; rating: number | null; search: string; productId: number | null }) => {
  currentFilters.value = { ...currentFilters.value, ...filters }
  fetchReviews()
}

// Fetch reviews with current filters
const fetchReviews = (page = 1, perPage = props.meta.perPage) => {
  isLoading.value = true

  const params: Record<string, any> = {
    page,
    perPage,
  }

  if (currentFilters.value.status && currentFilters.value.status !== 'all') {
    params.status = currentFilters.value.status
  }
  if (currentFilters.value.rating) {
    params.rating = currentFilters.value.rating
  }
  if (currentFilters.value.search) {
    params.search = currentFilters.value.search
  }
  if (currentFilters.value.productId) {
    params.productId = currentFilters.value.productId
  }

  router.get('/admin/reviews', params, {
    preserveState: true,
    preserveScroll: true,
    onFinish: () => {
      isLoading.value = false
    },
  })
}

// Handle page change
const handlePageChange = (page: number) => {
  fetchReviews(page)
}

// Handle per page change
const handlePerPageChange = (perPage: number) => {
  fetchReviews(1, perPage)
}
</script>

<template>
  <div class="p-6 space-y-6">
    <!-- Header -->
    <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      <div>
        <h1 class="text-2xl font-bold text-gray-900 dark:text-white">Review Produk</h1>
        <p class="text-gray-500 dark:text-gray-400">
          Kelola ulasan pelanggan untuk produk Anda
        </p>
      </div>
    </div>

    <!-- Stats Section -->
    <div class="grid grid-cols-1 xl:grid-cols-4 gap-6">
      <div class="xl:col-span-3">
        <ReviewStatsCards :stats="props.stats" />
      </div>
      <div class="xl:col-span-1">
        <ReviewRatingDistribution :stats="props.stats" />
      </div>
    </div>

    <!-- Filters -->
    <ReviewFilters
      :products="props.products"
      :status="currentFilters.status"
      :rating="currentFilters.rating"
      :search="currentFilters.search"
      :product-id="currentFilters.productId"
      @filter="applyFilters"
    />

    <!-- Realtime Connection Status -->
    <div v-if="isConnected" class="fixed bottom-4 right-4 z-50">
      <UBadge color="success" variant="soft" size="xs" class="flex items-center gap-1">
        <span class="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
        Realtime
      </UBadge>
    </div>

    <!-- Loading State -->
    <div v-if="isLoading" class="flex items-center justify-center py-12">
      <UIcon name="i-heroicons-arrow-path" class="w-8 h-8 text-primary-500 animate-spin" />
    </div>

    <!-- Reviews List -->
    <div v-else-if="localReviews.length > 0" class="space-y-4">
      <ReviewCard
        v-for="review in localReviews"
        :key="review.id"
        :review="review"
      />
    </div>

    <!-- Empty State -->
    <div
      v-else
      class="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-12 text-center"
    >
      <UIcon name="i-heroicons-chat-bubble-left-right" class="w-16 h-16 mx-auto text-gray-300 dark:text-gray-600 mb-4" />
      <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">
        Belum Ada Review
      </h3>
      <p class="text-gray-500 dark:text-gray-400 max-w-md mx-auto">
        Produk Anda belum memiliki ulasan dari pelanggan. Review akan muncul setelah pelanggan memberikan ulasan.
      </p>
    </div>

    <!-- Pagination -->
    <ReviewPagination
      :meta="props.meta"
      @page-change="handlePageChange"
      @per-page-change="handlePerPageChange"
    />
  </div>
</template>
