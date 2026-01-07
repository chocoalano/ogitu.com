<template>
  <div class="bg-gray-50 dark:bg-gray-950 border-b border-gray-200 dark:border-gray-800">
    <UContainer>
      <div class="flex justify-between items-center h-9 text-xs">
        <div class="flex items-center gap-4 text-gray-600 dark:text-gray-400">
          <a href="/about"
            class="hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
            Tentang Kami
          </a>
        </div>
        <div class="flex items-center gap-4 text-gray-600 dark:text-gray-400">
          <a href="/track"
            class="hidden md:inline hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
            Lacak Pesanan
          </a>
          <span class="hidden md:inline">|</span>
          <a href="/help" class="hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
            Bantuan
          </a>
        </div>
      </div>
    </UContainer>
  </div>
</template>
