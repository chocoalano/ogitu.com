<script setup lang="ts">
import { Link } from '@inertiajs/vue3'
// No props needed for footer
</script>

<template>
  <!-- Footer -->
  <footer class="border-t border-slate-200 dark:border-slate-700/50 py-4 px-6 bg-white/50 dark:bg-slate-900/50">
    <div class="flex flex-col sm:flex-row items-center justify-between gap-3 text-sm text-slate-500 dark:text-slate-400">
      <p>&copy; {{ new Date().getFullYear() }} Ogitu Admin Center. All rights reserved.</p>
      <div class="flex items-center gap-4">
        <Link href="/admin/help" class="hover:text-violet-500 transition-colors"> Bantuan </Link>
        <Link href="/admin/terms" class="hover:text-violet-500 transition-colors">
          Syarat & Ketentuan
        </Link>
        <Link href="/admin/privacy" class="hover:text-violet-500 transition-colors">
          Kebijakan Privasi
        </Link>
      </div>
    </div>
  </footer>
</template>
