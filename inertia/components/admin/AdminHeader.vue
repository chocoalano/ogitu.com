<script setup lang="ts">
import { Link } from '@inertiajs/vue3'
import type { AdminData } from './types'

withDefaults(defineProps<{
  admin?: AdminData
  sidebarOpen?: boolean
}>(), {
  admin: () => ({ id: 0, name: '', email: '', avatar: null, role: 'admin' as const }),
  sidebarOpen: true,
})

defineEmits<{
  toggleSidebar: []
  toggleMobileSidebar: []
  logout: []
}>()
</script>

<template>
  <!-- Top Header -->
  <header class="sticky top-0 z-10 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border-b border-slate-200 dark:border-slate-700/50">
    <div class="flex items-center justify-between px-4 lg:px-6 py-3">
      <div class="flex items-center gap-3">
        <!-- Mobile Menu Button -->
        <button
          class="lg:hidden p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400"
          @click="$emit('toggleMobileSidebar')"
        >
          <UIcon name="i-heroicons-bars-3" class="w-6 h-6" />
        </button>

        <!-- Desktop Expand Button (when collapsed) -->
        <button
          v-if="!sidebarOpen"
          class="hidden lg:flex p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400"
          @click="$emit('toggleSidebar')"
        >
          <UIcon name="i-heroicons-bars-3" class="w-6 h-6" />
        </button>

        <!-- Search Bar -->
        <div class="hidden md:flex items-center">
          <div class="relative">
            <UInput
              placeholder="Cari produk, pesanan..."
              icon="i-heroicons-magnifying-glass"
              class="w-64 lg:w-80"
              :ui="{
                rounded: 'rounded-xl',
                color: {
                  white: {
                    outline: 'bg-slate-50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700',
                  },
                },
              }"
            />
          </div>
        </div>
      </div>

      <div class="flex items-center gap-2">
        <!-- Dark Mode Toggle -->
        <UColorModeButton size="sm" />

        <!-- Notifications -->
        <UPopover :modal="false">
          <UButton
            icon="i-heroicons-bell"
            color="neutral"
            variant="ghost"
            size="sm"
            class="relative"
          >
            <span
              class="absolute top-0.5 right-0.5 w-2 h-2 bg-red-500 rounded-full ring-2 ring-white dark:ring-slate-900"
            ></span>
          </UButton>
          <template #content>
            <div class="p-4 w-80 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 shadow-xl">
              <h4 class="font-semibold text-slate-900 dark:text-white mb-3">Notifikasi</h4>
              <div class="space-y-3">
                <div
                  class="flex items-start gap-3 p-2 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700/50 cursor-pointer"
                >
                  <div
                    class="w-8 h-8 rounded-full bg-linear-to-br from-violet-500 to-fuchsia-600 flex items-center justify-center shrink-0"
                  >
                    <UIcon name="i-heroicons-shopping-bag" class="w-4 h-4 text-white" />
                  </div>
                  <div class="flex-1 min-w-0">
                    <p class="text-sm text-slate-900 dark:text-white font-medium">Pesanan Baru</p>
                    <p class="text-xs text-slate-500 dark:text-slate-400 truncate">
                      Anda menerima pesanan baru #ORD-001
                    </p>
                    <span class="text-xs text-violet-500">5 menit lalu</span>
                  </div>
                </div>
              </div>
              <Link
                href="/admin/notifications"
                class="block mt-3 text-center text-sm text-violet-500 hover:text-violet-600 font-medium"
              >
                Lihat Semua
              </Link>
            </div>
          </template>
        </UPopover>

        <!-- User Menu -->
        <UPopover :modal="false">
          <UButton color="neutral" variant="ghost" class="gap-2 p-1.5">
            <div
              class="w-8 h-8 rounded-full bg-linear-to-br from-violet-500 to-fuchsia-600 flex items-center justify-center text-white font-semibold text-sm"
            >
              {{ admin.storeName?.charAt(0).toUpperCase() }}
            </div>
            <UIcon name="i-heroicons-chevron-down" class="w-4 h-4 text-slate-400 hidden sm:block" />
          </UButton>
          <template #content>
            <div class="p-2 w-56 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 shadow-xl">
              <div class="px-3 py-2 border-b border-slate-200 dark:border-slate-700">
                <p class="font-semibold text-slate-900 dark:text-white text-sm">
                  {{ admin.storeName }}
                </p>
                <p class="text-xs text-slate-500 dark:text-slate-400">Admin Account</p>
              </div>
              <div class="py-1">
                <Link
                  href="/admin/settings/profile"
                  class="flex items-center gap-2 px-3 py-2 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg"
                >
                  <UIcon name="i-heroicons-user-circle" class="w-4 h-4" />
                  Profil
                </Link>
                <Link
                  href="/admin/settings"
                  class="flex items-center gap-2 px-3 py-2 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg"
                >
                  <UIcon name="i-heroicons-cog-6-tooth" class="w-4 h-4" />
                  Pengaturan
                </Link>
              </div>
              <div class="pt-1 border-t border-slate-200 dark:border-slate-700">
                <UButton
                  color="error"
                  variant="ghost"
                  class="w-full justify-start"
                  @click="$emit('logout')"
                >
                  <UIcon name="i-heroicons-arrow-right-on-rectangle" class="w-4 h-4" />
                  Logout
                </UButton>
              </div>
            </div>
          </template>
        </UPopover>
      </div>
    </div>
  </header>
</template>
