<script setup lang="ts">
import { Link } from '@inertiajs/vue3'

// Vape product categories with custom SVG icons
const categories = [
  {
    label: 'Device/Mod',
    to: '/admin/products?category=device',
    color: 'from-violet-500 to-purple-600',
  },
  {
    label: 'Liquid',
    to: '/admin/products?category=liquid',
    color: 'from-blue-500 to-cyan-600',
  },
  {
    label: 'Coil',
    to: '/admin/products?category=coil',
    color: 'from-orange-500 to-red-600',
  },
  {
    label: 'Aksesoris',
    to: '/admin/products?category=accessories',
    color: 'from-emerald-500 to-teal-600',
  },
]
</script>

<template>
  <div class="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5">
    <h3 class="font-semibold text-slate-900 dark:text-white mb-3">Kategori Produk</h3>
    <div class="grid grid-cols-2 gap-2">
      <Link
        v-for="category in categories"
        :key="category.label"
        :href="category.to"
        class="p-3 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-violet-100 dark:hover:bg-violet-900/20 transition-all text-center group"
      >
        <!-- Device/Mod Icon - Vape Box Mod -->
        <div v-if="category.label === 'Device/Mod'" class="flex justify-center">
          <div :class="['w-10 h-10 rounded-xl bg-linear-to-br flex items-center justify-center group-hover:scale-110 transition-transform', category.color]">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <!-- Vape mod body -->
              <rect x="7" y="2" width="10" height="20" rx="2" ry="2"/>
              <!-- Screen -->
              <rect x="9" y="5" width="6" height="4" rx="1"/>
              <!-- Fire button -->
              <circle cx="12" cy="13" r="2"/>
              <!-- Battery indicator -->
              <line x1="10" y1="18" x2="14" y2="18"/>
            </svg>
          </div>
        </div>

        <!-- Liquid Icon - E-Liquid Bottle -->
        <div v-else-if="category.label === 'Liquid'" class="flex justify-center">
          <div :class="['w-10 h-10 rounded-xl bg-linear-to-br flex items-center justify-center group-hover:scale-110 transition-transform', category.color]">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <!-- Bottle body -->
              <path d="M10 2h4v4l2 2v12a2 2 0 0 1-2 2h-4a2 2 0 0 1-2-2V8l2-2V2z"/>
              <!-- Dropper tip -->
              <path d="M10 2h4v2h-4z"/>
              <!-- Liquid level -->
              <path d="M8 14h8"/>
              <!-- Droplet -->
              <circle cx="12" cy="17" r="1"/>
            </svg>
          </div>
        </div>

        <!-- Coil Icon - Heating Coil -->
        <div v-else-if="category.label === 'Coil'" class="flex justify-center">
          <div :class="['w-10 h-10 rounded-xl bg-linear-to-br flex items-center justify-center group-hover:scale-110 transition-transform', category.color]">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <!-- Coil spiral -->
              <path d="M12 4c-2 0-4 1-4 3s2 3 4 3 4 1 4 3-2 3-4 3"/>
              <!-- Heat waves -->
              <path d="M8 2v2"/>
              <path d="M16 2v2"/>
              <path d="M8 20v2"/>
              <path d="M16 20v2"/>
              <!-- Center pin -->
              <line x1="12" y1="18" x2="12" y2="22"/>
              <line x1="12" y1="2" x2="12" y2="4"/>
            </svg>
          </div>
        </div>

        <!-- Accessories Icon - Tools/Parts -->
        <div v-else class="flex justify-center">
          <div :class="['w-10 h-10 rounded-xl bg-linear-to-br flex items-center justify-center group-hover:scale-110 transition-transform', category.color]">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <!-- Battery -->
              <rect x="4" y="8" width="16" height="8" rx="2"/>
              <line x1="22" y1="10" x2="22" y2="14"/>
              <!-- Plus sign -->
              <line x1="8" y1="12" x2="10" y2="12"/>
              <!-- Minus sign -->
              <line x1="14" y1="12" x2="16" y2="12"/>
            </svg>
          </div>
        </div>

        <p class="text-xs text-slate-600 dark:text-slate-400 mt-2 group-hover:text-violet-600 dark:group-hover:text-violet-400 transition-colors font-medium">
          {{ category.label }}
        </p>
      </Link>
    </div>
  </div>
</template>
