<script setup lang="ts">
import { Link } from '@inertiajs/vue3'
import type { MenuItem } from './types'
import { isMenuActive } from './types'

const props = defineProps<{
  menuItems: MenuItem[]
  currentPath: string
  badges: Record<string, number>
}>()

const isActive = (item: MenuItem) => isMenuActive(item, props.currentPath)

const isChildActive = (childTo: string) => {
  return props.currentPath.startsWith(childTo.split('?')[0])
}
</script>

<template>
  <!-- Mobile Navigation Menu -->
  <nav class="flex-1 overflow-y-auto py-4 scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-transparent">
    <ul class="space-y-1 px-2">
      <li v-for="item in menuItems" :key="item.label">
        <!-- Menu with children -->
        <template v-if="item.children">
          <div class="mb-2">
            <div
              class="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium"
              :class="
                isActive(item)
                  ? 'bg-linear-to-r from-violet-600/20 to-fuchsia-600/20 text-white border border-violet-500/30'
                  : 'text-slate-300'
              "
            >
              <div
                class="w-8 h-8 rounded-lg flex items-center justify-center"
                :class="
                  isActive(item)
                    ? 'bg-linear-to-br from-violet-500 to-fuchsia-600 shadow-lg shadow-violet-500/30'
                    : 'bg-slate-700/50'
                "
              >
                <UIcon :name="item.icon" class="w-4 h-4" :class="isActive(item) ? 'text-white' : 'text-slate-400'" />
              </div>
              <span>{{ item.label }}</span>
              <span
                v-if="item.badge && badges[item.badge]"
                class="ml-auto px-2 py-0.5 rounded-full text-xs font-semibold bg-linear-to-r from-violet-500 to-fuchsia-500 text-white"
              >
                {{ badges[item.badge] }}
              </span>
            </div>
            <!-- Submenu always visible on mobile -->
            <ul class="mt-1 ml-11 space-y-1">
              <li v-for="child in item.children" :key="child.to">
                <Link
                  :href="child.to"
                  class="block px-3 py-2 rounded-lg text-sm transition-all duration-200"
                  :class="
                    isChildActive(child.to)
                      ? 'text-violet-400 bg-violet-500/10 font-medium'
                      : 'text-slate-400 hover:text-white hover:bg-slate-700/30'
                  "
                >
                  {{ child.label }}
                </Link>
              </li>
            </ul>
          </div>
        </template>

        <!-- Menu without children -->
        <template v-else>
          <Link
            :href="item.to"
            class="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200"
            :class="
              isActive(item)
                ? 'bg-linear-to-r from-violet-600/20 to-fuchsia-600/20 text-white border border-violet-500/30'
                : 'text-slate-300 hover:bg-slate-700/50 hover:text-white'
            "
          >
            <div
              class="w-8 h-8 rounded-lg flex items-center justify-center"
              :class="
                isActive(item)
                  ? 'bg-linear-to-br from-violet-500 to-fuchsia-600 shadow-lg shadow-violet-500/30'
                  : 'bg-slate-700/50'
              "
            >
              <UIcon :name="item.icon" class="w-4 h-4" :class="isActive(item) ? 'text-white' : 'text-slate-400'" />
            </div>
            <span>{{ item.label }}</span>
          </Link>
        </template>
      </li>
    </ul>
  </nav>
</template>
