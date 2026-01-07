<script setup lang="ts">
/**
 * Profile Background Effects Component
 * Renders animated background elements for the profile page
 */
</script>

<template>
  <div class="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
    <div class="absolute top-0 left-1/4 w-125 h-125 bg-primary-500/10 rounded-full blur-3xl animate-pulse" />
    <div class="absolute top-1/3 right-1/4 w-100 h-100 bg-purple-500/10 rounded-full blur-3xl" />
    <div class="absolute bottom-1/4 left-1/2 w-150 h-75 bg-cyan-500/5 rounded-full blur-3xl" />
    <!-- Smoke-like effects -->
    <div class="absolute top-20 right-20 w-32 h-32 bg-white/5 rounded-full blur-2xl animate-float" />
    <div class="absolute bottom-40 left-20 w-24 h-24 bg-white/3 rounded-full blur-xl animate-float-delayed" />
  </div>
</template>

<style scoped>
@keyframes float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-20px); }
}

@keyframes float-delayed {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-15px); }
}

.animate-float {
  animation: float 6s ease-in-out infinite;
}

.animate-float-delayed {
  animation: float-delayed 8s ease-in-out infinite;
  animation-delay: 2s;
}
</style>
