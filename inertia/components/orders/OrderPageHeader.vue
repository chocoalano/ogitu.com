<script setup lang="ts">
/**
 * OrderPageHeader - Page header with title and vapor animation
 */
defineProps<{
  title?: string
  subtitle?: string
}>()
</script>

<template>
  <div class="relative mb-8 overflow-hidden">
    <!-- Animated Background -->
    <div class="absolute inset-0 -z-10">
      <!-- Gradient Orbs -->
      <div
        class="absolute -top-20 -left-20 w-72 h-72 bg-primary-500/20 rounded-full blur-3xl animate-pulse"
      />
      <div
        class="absolute -top-10 right-0 w-64 h-64 bg-secondary-500/15 rounded-full blur-3xl animate-pulse delay-1000"
      />

      <!-- Vapor/Smoke Animation -->
      <div class="absolute inset-0 opacity-30 dark:opacity-20">
        <div
          class="absolute bottom-0 left-1/4 w-1 h-32 bg-linear-to-t from-gray-400/50 to-transparent rounded-full animate-vapor-1"
        />
        <div
          class="absolute bottom-0 left-1/3 w-0.5 h-24 bg-linear-to-t from-gray-300/40 to-transparent rounded-full animate-vapor-2"
        />
        <div
          class="absolute bottom-0 right-1/3 w-1 h-28 bg-linear-to-t from-gray-400/50 to-transparent rounded-full animate-vapor-3"
        />
      </div>
    </div>

    <!-- Content -->
    <div class="relative py-6">
      <div class="flex items-center gap-4">
        <!-- Icon with Glow -->
        <div class="relative">
          <div
            class="absolute inset-0 bg-primary-500/30 blur-xl rounded-full animate-pulse"
          />
          <div
            class="relative w-14 h-14 bg-linear-to-br from-primary-500 to-secondary-600 rounded-2xl flex items-center justify-center shadow-lg shadow-primary-500/30"
          >
            <UIcon name="i-heroicons-shopping-bag" class="w-7 h-7 text-white" />
          </div>
        </div>

        <!-- Text -->
        <div>
          <h1
            class="text-2xl sm:text-3xl font-bold bg-linear-to-r from-gray-900 via-gray-800 to-gray-900 dark:from-white dark:via-gray-100 dark:to-white bg-clip-text text-transparent"
          >
            {{ title || 'Pesanan Saya' }}
          </h1>
          <p class="text-gray-500 dark:text-gray-400 mt-1">
            {{ subtitle || 'Kelola dan lacak pesanan Anda' }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
@keyframes vapor-1 {
  0%,
  100% {
    opacity: 0;
    transform: translateY(0) scaleY(0.8);
  }
  50% {
    opacity: 1;
    transform: translateY(-40px) scaleY(1.2);
  }
}

@keyframes vapor-2 {
  0%,
  100% {
    opacity: 0;
    transform: translateY(0) scaleX(0.8);
  }
  50% {
    opacity: 0.8;
    transform: translateY(-50px) scaleX(1.5);
  }
}

@keyframes vapor-3 {
  0%,
  100% {
    opacity: 0;
    transform: translateY(0);
  }
  50% {
    opacity: 0.6;
    transform: translateY(-35px) rotate(5deg);
  }
}

.animate-vapor-1 {
  animation: vapor-1 4s ease-in-out infinite;
}

.animate-vapor-2 {
  animation: vapor-2 5s ease-in-out infinite 0.5s;
}

.animate-vapor-3 {
  animation: vapor-3 4.5s ease-in-out infinite 1s;
}
</style>
