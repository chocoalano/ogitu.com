<script setup lang="ts">
import { Link } from '@inertiajs/vue3'

/**
 * OrderEmptyState - Empty state when no orders found
 */
defineProps<{
  filtered?: boolean
  status?: string
}>()
</script>

<template>
  <div
    class="relative py-16 sm:py-24 text-center overflow-hidden"
  >
    <!-- Background Animation -->
    <div class="absolute inset-0 -z-10">
      <!-- Floating Particles -->
      <div class="absolute top-1/4 left-1/4 w-2 h-2 bg-primary-500/20 rounded-full animate-float-1" />
      <div class="absolute top-1/3 right-1/3 w-3 h-3 bg-secondary-500/20 rounded-full animate-float-2" />
      <div class="absolute bottom-1/3 left-1/3 w-2 h-2 bg-primary-500/15 rounded-full animate-float-3" />
      <div class="absolute top-1/2 right-1/4 w-4 h-4 bg-secondary-500/15 rounded-full animate-float-1" />

      <!-- Gradient Glow -->
      <div class="absolute inset-0 bg-linear-to-b from-transparent via-primary-500/5 to-transparent" />
    </div>

    <!-- Icon -->
    <div class="relative mx-auto w-24 h-24 sm:w-32 sm:h-32 mb-6">
      <!-- Glow Ring -->
      <div class="absolute inset-0 bg-linear-to-br from-primary-500/20 to-secondary-500/20 rounded-full blur-2xl animate-pulse" />

      <!-- Icon Container -->
      <div
        class="relative w-full h-full rounded-full bg-linear-to-br from-gray-100 to-gray-50 dark:from-gray-800 dark:to-gray-900 flex items-center justify-center border border-gray-200/50 dark:border-gray-700/50"
      >
        <UIcon
          name="i-heroicons-shopping-bag"
          class="w-12 h-12 sm:w-16 sm:h-16 text-gray-300 dark:text-gray-600"
        />

        <!-- Decorative elements -->
        <div class="absolute -top-1 -right-1 w-4 h-4 bg-primary-500/20 rounded-full" />
        <div class="absolute -bottom-2 -left-2 w-6 h-6 bg-secondary-500/20 rounded-full" />
      </div>
    </div>

    <!-- Content -->
    <div class="relative space-y-4">
      <h2
        class="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white"
      >
        {{ filtered ? 'Tidak Ada Pesanan' : 'Belum Ada Pesanan' }}
      </h2>

      <p class="text-gray-500 dark:text-gray-400 max-w-sm mx-auto">
        <template v-if="filtered">
          Tidak ada pesanan dengan status ini. Coba filter dengan status lainnya.
        </template>
        <template v-else>
          Anda belum memiliki pesanan. Yuk, mulai belanja produk vape berkualitas!
        </template>
      </p>

      <!-- CTA Button -->
      <div class="pt-4">
        <Link href="/collections">
          <UButton
            color="primary"
            size="lg"
            class="shadow-lg shadow-primary-500/30 hover:shadow-xl hover:shadow-primary-500/40 transition-all duration-300 hover:-translate-y-0.5"
          >
            <UIcon name="i-heroicons-shopping-cart" class="w-5 h-5 mr-2" />
            Mulai Belanja
          </UButton>
        </Link>
      </div>
    </div>

    <!-- Decorative Bottom -->
    <div class="absolute bottom-0 inset-x-0 h-px bg-linear-to-r from-transparent via-gray-200 dark:via-gray-700 to-transparent" />
  </div>
</template>

<style scoped>
@keyframes float-1 {
  0%, 100% {
    transform: translateY(0) translateX(0);
  }
  50% {
    transform: translateY(-20px) translateX(10px);
  }
}

@keyframes float-2 {
  0%, 100% {
    transform: translateY(0) translateX(0);
  }
  50% {
    transform: translateY(-15px) translateX(-15px);
  }
}

@keyframes float-3 {
  0%, 100% {
    transform: translateY(0) translateX(0);
  }
  50% {
    transform: translateY(-25px) translateX(5px);
  }
}

.animate-float-1 {
  animation: float-1 6s ease-in-out infinite;
}

.animate-float-2 {
  animation: float-2 7s ease-in-out infinite 0.5s;
}

.animate-float-3 {
  animation: float-3 5s ease-in-out infinite 1s;
}
</style>
