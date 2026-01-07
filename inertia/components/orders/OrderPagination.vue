<script setup lang="ts">
/**
 * OrderPagination - Modern pagination component
 */
const props = defineProps<{
  currentPage: number
  lastPage: number
  total: number
  perPage: number
}>()

const emit = defineEmits<{
  change: [page: number]
}>()

const getPageNumbers = () => {
  const pages: (number | string)[] = []
  const { currentPage, lastPage } = props

  if (lastPage <= 7) {
    for (let i = 1; i <= lastPage; i++) {
      pages.push(i)
    }
  } else {
    pages.push(1)

    if (currentPage > 3) {
      pages.push('...')
    }

    const start = Math.max(2, currentPage - 1)
    const end = Math.min(lastPage - 1, currentPage + 1)

    for (let i = start; i <= end; i++) {
      pages.push(i)
    }

    if (currentPage < lastPage - 2) {
      pages.push('...')
    }

    pages.push(lastPage)
  }

  return pages
}

const goToPage = (page: number | string) => {
  if (typeof page === 'number' && page !== props.currentPage) {
    emit('change', page)
  }
}
</script>

<template>
  <div
    v-if="lastPage > 1"
    class="flex flex-col sm:flex-row items-center justify-between gap-4 mt-8"
  >
    <!-- Info -->
    <p class="text-sm text-gray-500 dark:text-gray-400 order-2 sm:order-1">
      Menampilkan
      <span class="font-medium text-gray-700 dark:text-gray-300">
        {{ (currentPage - 1) * perPage + 1 }}
      </span>
      -
      <span class="font-medium text-gray-700 dark:text-gray-300">
        {{ Math.min(currentPage * perPage, total) }}
      </span>
      dari
      <span class="font-medium text-gray-700 dark:text-gray-300">{{ total }}</span>
      pesanan
    </p>

    <!-- Pagination -->
    <nav class="flex items-center gap-1 order-1 sm:order-2" aria-label="Pagination">
      <!-- Previous -->
      <button
        :disabled="currentPage === 1"
        :class="[
          'relative p-2 rounded-lg transition-all duration-200',
          currentPage === 1
            ? 'text-gray-300 dark:text-gray-600 cursor-not-allowed'
            : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white',
        ]"
        @click="goToPage(currentPage - 1)"
      >
        <UIcon name="i-heroicons-chevron-left" class="w-5 h-5" />
      </button>

      <!-- Pages -->
      <div class="flex items-center gap-1">
        <template v-for="(page, index) in getPageNumbers()" :key="index">
          <!-- Ellipsis -->
          <span
            v-if="page === '...'"
            class="px-2 text-gray-400 dark:text-gray-500"
          >
            ...
          </span>

          <!-- Page Number -->
          <button
            v-else
            :class="[
              'relative min-w-[40px] h-10 px-3 rounded-lg font-medium transition-all duration-200',
              page === currentPage
                ? 'bg-linear-to-r from-primary-500 to-secondary-500 text-white shadow-lg shadow-primary-500/30'
                : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white',
            ]"
            @click="goToPage(page)"
          >
            {{ page }}

            <!-- Active indicator glow -->
            <div
              v-if="page === currentPage"
              class="absolute inset-0 bg-linear-to-r from-primary-500/30 to-secondary-500/30 rounded-lg blur-lg -z-10"
            />
          </button>
        </template>
      </div>

      <!-- Next -->
      <button
        :disabled="currentPage === lastPage"
        :class="[
          'relative p-2 rounded-lg transition-all duration-200',
          currentPage === lastPage
            ? 'text-gray-300 dark:text-gray-600 cursor-not-allowed'
            : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white',
        ]"
        @click="goToPage(currentPage + 1)"
      >
        <UIcon name="i-heroicons-chevron-right" class="w-5 h-5" />
      </button>
    </nav>
  </div>
</template>
