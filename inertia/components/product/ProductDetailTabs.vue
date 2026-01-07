<script setup lang="ts">
import { ref, computed } from 'vue'
import type { ProductDetail, SpecificationItem } from '~/types/product_detail'

const props = defineProps<{
  product: ProductDetail
}>()

const activeTab = ref<'description' | 'specifications' | 'reviews'>('description')

const specifications = computed((): SpecificationItem[] => {
  if (!props.product.specifications) return []
  try {
    return JSON.parse(props.product.specifications)
  } catch {
    return props.product.specifications.split('\n').map((line: string) => {
      const [key, value] = line.split(':')
      return { key: key?.trim() || '', value: value?.trim() || '' }
    })
  }
})

const tabs = computed(() => [
  { id: 'description' as const, label: 'Deskripsi' },
  { id: 'specifications' as const, label: 'Spesifikasi' },
  { id: 'reviews' as const, label: `Ulasan (${props.product.reviewSummary?.totalReviews || 0})` },
])

const reviewSummary = computed(() => props.product.reviewSummary)
const reviews = computed(() => props.product.reviews || [])

const formatDate = (dateString: string) => {
  const date = new Date(dateString)
  return date.toLocaleDateString('id-ID', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

const getStarArray = (rating: number) => {
  return Array.from({ length: 5 }, (_, i) => i < rating)
}

const getRatingPercentage = (stars: number) => {
  if (!reviewSummary.value || reviewSummary.value.totalReviews === 0) return 0
  const count = reviewSummary.value.ratingDistribution[stars] || 0
  return Math.round((count / reviewSummary.value.totalReviews) * 100)
}
</script>

<template>
  <div class="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
      <!-- Tabs Navigation -->
      <div
        class="flex border-b border-gray-200 dark:border-gray-800 overflow-x-auto scrollbar-hide"
      >
        <button
          v-for="tab in tabs"
          :key="tab.id"
          class="px-6 py-4 text-sm font-medium border-b-2 transition-colors whitespace-nowrap"
          :class="
            activeTab === tab.id
              ? 'border-primary-500 text-primary-600 dark:text-primary-400'
              : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
          "
          @click="activeTab = tab.id"
        >
          {{ tab.label }}
        </button>
      </div>

      <!-- Tab Content -->
      <div class="py-6">
        <!-- Description -->
        <div v-if="activeTab === 'description'" class="prose dark:prose-invert max-w-none">
          <div v-if="product.description" v-html="product.description"></div>
          <p v-else class="text-gray-500 dark:text-gray-400">
            Belum ada deskripsi untuk produk ini.
          </p>
        </div>

        <!-- Specifications -->
        <div v-if="activeTab === 'specifications'" class="space-y-4">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <!-- Basic Info -->
            <div class="p-4 bg-gray-50 dark:bg-gray-800 rounded-xl space-y-3">
              <h3 class="font-semibold text-gray-900 dark:text-white">Informasi Dasar</h3>
              <div class="space-y-2 text-sm">
                <div class="flex justify-between">
                  <span class="text-gray-500 dark:text-gray-400">SKU</span>
                  <span class="text-gray-900 dark:text-white font-medium">{{
                    product.sku || '-'
                  }}</span>
                </div>
                <div class="flex justify-between">
                  <span class="text-gray-500 dark:text-gray-400">Berat</span>
                  <span class="text-gray-900 dark:text-white font-medium"
                    >{{ product.weight }}g</span
                  >
                </div>
                <div class="flex justify-between">
                  <span class="text-gray-500 dark:text-gray-400">Brand</span>
                  <span class="text-gray-900 dark:text-white font-medium">{{
                    product.brand || '-'
                  }}</span>
                </div>
                <div class="flex justify-between">
                  <span class="text-gray-500 dark:text-gray-400">Kategori</span>
                  <span class="text-gray-900 dark:text-white font-medium">{{
                    product.category?.name || '-'
                  }}</span>
                </div>
              </div>
            </div>

            <!-- Custom Specifications -->
            <div
              v-if="specifications.length > 0"
              class="p-4 bg-gray-50 dark:bg-gray-800 rounded-xl space-y-3"
            >
              <h3 class="font-semibold text-gray-900 dark:text-white">Spesifikasi Teknis</h3>
              <div class="space-y-2 text-sm">
                <div
                  v-for="(spec, index) in specifications"
                  :key="index"
                  class="flex justify-between"
                >
                  <span class="text-gray-500 dark:text-gray-400">{{ spec.key }}</span>
                  <span class="text-gray-900 dark:text-white font-medium">{{ spec.value }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Reviews -->
        <div v-if="activeTab === 'reviews'" class="space-y-6">
          <!-- Empty State -->
          <div v-if="reviews.length === 0" class="text-center py-12">
            <UIcon
              name="i-lucide-message-square"
              class="w-12 h-12 text-gray-300 dark:text-gray-600 mx-auto mb-4"
            />
            <p class="text-gray-500 dark:text-gray-400">Belum ada ulasan untuk produk ini.</p>
            <p class="text-sm text-gray-400 dark:text-gray-500 mt-1">
              Jadilah yang pertama memberikan ulasan!
            </p>
          </div>

          <!-- Reviews Content -->
          <div v-else class="space-y-8">
            <!-- Review Summary -->
            <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
              <!-- Average Rating -->
              <div class="bg-gray-50 dark:bg-gray-800 rounded-xl p-6 text-center">
                <div class="text-5xl font-bold text-primary-600 mb-2">
                  {{ reviewSummary?.averageRating?.toFixed(1) || '0.0' }}
                </div>
                <div class="flex justify-center gap-1 mb-2">
                  <UIcon
                    v-for="(filled, index) in getStarArray(Math.round(reviewSummary?.averageRating || 0))"
                    :key="index"
                    :name="filled ? 'i-lucide-star' : 'i-lucide-star'"
                    class="w-5 h-5"
                    :class="filled ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'"
                  />
                </div>
                <p class="text-sm text-gray-500 dark:text-gray-400">
                  {{ reviewSummary?.totalReviews || 0 }} ulasan
                </p>
              </div>

              <!-- Rating Distribution -->
              <div class="md:col-span-2 bg-gray-50 dark:bg-gray-800 rounded-xl p-6">
                <h4 class="font-semibold text-gray-900 dark:text-white mb-4">Distribusi Rating</h4>
                <div class="space-y-2">
                  <div v-for="stars in [5, 4, 3, 2, 1]" :key="stars" class="flex items-center gap-3">
                    <span class="text-sm text-gray-600 dark:text-gray-400 w-8">{{ stars }} ★</span>
                    <div class="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div
                        class="bg-yellow-400 h-2 rounded-full transition-all"
                        :style="{ width: `${getRatingPercentage(stars)}%` }"
                      ></div>
                    </div>
                    <span class="text-sm text-gray-500 dark:text-gray-400 w-12 text-right">
                      {{ reviewSummary?.ratingDistribution?.[stars] || 0 }}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <!-- Reviews List -->
            <div class="space-y-4">
              <h4 class="font-semibold text-gray-900 dark:text-white">
                Semua Ulasan ({{ reviews.length }})
              </h4>

              <div
                v-for="review in reviews"
                :key="review.id"
                class="bg-gray-50 dark:bg-gray-800 rounded-xl p-5"
              >
                <div class="flex items-start gap-4">
                  <!-- Avatar -->
                  <div class="shrink-0">
                    <img
                      v-if="review.customer?.avatar"
                      :src="review.customer.avatar"
                      :alt="review.customer.fullName"
                      class="w-10 h-10 rounded-full object-cover"
                    />
                    <div
                      v-else
                      class="w-10 h-10 rounded-full bg-primary-100 dark:bg-primary-900 flex items-center justify-center"
                    >
                      <span class="text-primary-600 dark:text-primary-400 font-semibold text-sm">
                        {{ review.customer?.fullName?.charAt(0)?.toUpperCase() || 'U' }}
                      </span>
                    </div>
                  </div>

                  <!-- Content -->
                  <div class="flex-1 min-w-0">
                    <div class="flex items-center justify-between gap-2 mb-1">
                      <div class="flex items-center gap-2">
                        <span class="font-medium text-gray-900 dark:text-white">
                          {{ review.customer?.fullName || 'Pengguna' }}
                        </span>
                        <UBadge
                          v-if="review.isVerifiedPurchase"
                          color="success"
                          variant="soft"
                          size="xs"
                        >
                          Pembeli Terverifikasi
                        </UBadge>
                      </div>
                      <span class="text-xs text-gray-500 dark:text-gray-400 shrink-0">
                        {{ formatDate(review.createdAt) }}
                      </span>
                    </div>

                    <!-- Rating Stars -->
                    <div class="flex gap-0.5 mb-2">
                      <UIcon
                        v-for="(filled, index) in getStarArray(review.rating)"
                        :key="index"
                        :name="filled ? 'i-lucide-star' : 'i-lucide-star'"
                        class="w-4 h-4"
                        :class="filled ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'"
                      />
                    </div>

                    <!-- Comment -->
                    <p v-if="review.comment" class="text-gray-700 dark:text-gray-300 text-sm">
                      {{ review.comment }}
                    </p>

                    <!-- Review Images -->
                    <div v-if="review.images && review.images.length > 0" class="flex gap-2 mt-3">
                      <img
                        v-for="(img, idx) in review.images"
                        :key="idx"
                        :src="img"
                        :alt="`Review image ${idx + 1}`"
                        class="w-16 h-16 object-cover rounded-lg cursor-pointer hover:opacity-80 transition-opacity"
                      />
                    </div>

                    <!-- Helpful -->
                    <div v-if="review.helpfulCount > 0" class="mt-3 text-xs text-gray-500 dark:text-gray-400">
                      <UIcon name="i-lucide-thumbs-up" class="w-3 h-3 inline-block mr-1" />
                      {{ review.helpfulCount }} orang menganggap ulasan ini membantu
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.scrollbar-hide {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
.scrollbar-hide::-webkit-scrollbar {
  display: none;
}
</style>
