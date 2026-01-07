<template>
  <div class="border-t border-gray-200 dark:border-gray-800 bg-gray-100 dark:bg-gray-950">
    <UContainer>
      <div class="flex flex-col md:flex-row items-center justify-between gap-4 py-4">
        <div class="text-xs text-gray-600 dark:text-gray-400 text-center md:text-left">
          © {{ new Date().getFullYear() }} <span class="font-semibold">ogitu.com</span> — Marketplace Vape & Rokok Elektrik Indonesia. Semua hak cipta dilindungi.
        </div>
        <div class="flex flex-wrap items-center justify-center gap-4 text-xs text-gray-600 dark:text-gray-400">
          <a href="/terms" class="hover:text-primary-600 dark:hover:text-primary-400 transition-colors">Syarat & Ketentuan</a>
          <span class="text-gray-300 dark:text-gray-700">•</span>
          <a href="/privacy" class="hover:text-primary-600 dark:hover:text-primary-400 transition-colors">Kebijakan Privasi</a>
          <span class="text-gray-300 dark:text-gray-700">•</span>
          <a href="/cookies" class="hover:text-primary-600 dark:hover:text-primary-400 transition-colors">Kebijakan Cookie</a>
          <span class="text-gray-300 dark:text-gray-700">•</span>
          <a href="/disclaimer" class="hover:text-primary-600 dark:hover:text-primary-400 transition-colors">Disclaimer</a>
        </div>
      </div>
    </UContainer>
  </div>
</template>
