<script setup lang="ts">
import { Link } from '@inertiajs/vue3'
import type { MenuItem } from './types'
import { isMenuActive } from './types'

const props = defineProps<{
  menuItems: MenuItem[]
  sidebarOpen: boolean
  currentPath: string
  badges: Record<string, number>
  expandedMenus: Set<string>
}>()

const emit = defineEmits<{
  toggleSubmenu: [label: string]
}>()

const isActive = (item: MenuItem) => isMenuActive(item, props.currentPath)

const isChildActive = (childTo: string) => {
  return props.currentPath.startsWith(childTo.split('?')[0])
}
</script>

<template>
  <!-- Navigation Menu -->
  <nav class="flex-1 overflow-y-auto py-4 scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-transparent">
    <ul class="space-y-1 px-2">
      <li v-for="item in menuItems" :key="item.label">
        <!-- Menu with children -->
        <template v-if="item.children">
          <button
            v-if="sidebarOpen"
            class="w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200"
            :class="
              isActive(item)
                ? 'bg-linear-to-r from-violet-600/20 to-fuchsia-600/20 text-white border border-violet-500/30'
                : 'text-slate-300 hover:bg-slate-700/50 hover:text-white'
            "
            @click="$emit('toggleSubmenu', item.label)"
          >
            <div class="flex items-center gap-3">
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
            </div>
            <div class="flex items-center gap-2">
              <span
                v-if="item.badge && badges[item.badge]"
                class="px-2 py-0.5 rounded-full text-xs font-semibold bg-linear-to-r from-violet-500 to-fuchsia-500 text-white"
              >
                {{ badges[item.badge] }}
              </span>
              <UIcon
                name="i-heroicons-chevron-down"
                class="w-4 h-4 transition-transform duration-200"
                :class="expandedMenus.has(item.label) ? 'rotate-180' : ''"
              />
            </div>
          </button>

          <!-- Collapsed state with dropdown -->
          <UPopover v-else :ui="{ content: 'min-w-45' }" :modal="false">
            <UButton
              color="neutral"
              variant="ghost"
              class="w-full flex justify-center p-2.5 rounded-xl transition-all duration-200"
              :class="
                isActive(item)
                  ? 'bg-linear-to-r from-violet-600/20 to-fuchsia-600/20 text-white border border-violet-500/30'
                  : 'text-slate-300 hover:bg-slate-700/50'
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
            </UButton>
            <template #content>
              <div class="p-2 bg-slate-800 rounded-xl">
                <span class="px-3 py-2 text-xs font-semibold text-slate-400 uppercase">{{ item.label }}</span>
                <Link
                  v-for="child in item.children"
                  :key="child.to"
                  :href="child.to"
                  class="flex items-center px-3 py-2 mt-1 rounded-lg text-sm transition-colors duration-200"
                  :class="isChildActive(child.to) ? 'bg-violet-600/20 text-violet-400' : 'text-slate-300 hover:bg-slate-700/50 hover:text-white'"
                >
                  {{ child.label }}
                </Link>
              </div>
            </template>
          </UPopover>

          <!-- Submenu (expanded state) -->
          <Transition
            enter-active-class="transition-all duration-200 ease-out"
            enter-from-class="opacity-0 max-h-0"
            enter-to-class="opacity-100 max-h-96"
            leave-active-class="transition-all duration-200 ease-in"
            leave-from-class="opacity-100 max-h-96"
            leave-to-class="opacity-0 max-h-0"
          >
            <ul v-if="sidebarOpen && expandedMenus.has(item.label)" class="mt-1 ml-11 space-y-1 overflow-hidden">
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
          </Transition>
        </template>

        <!-- Menu without children -->
        <template v-else>
          <Link
            v-if="sidebarOpen"
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

          <!-- Collapsed state -->
          <UTooltip v-else :text="item.label" :popper="{ placement: 'right' }">
            <Link
              :href="item.to"
              class="flex justify-center p-2.5 rounded-xl transition-all duration-200"
              :class="
                isActive(item)
                  ? 'bg-linear-to-r from-violet-600/20 to-fuchsia-600/20 text-white border border-violet-500/30'
                  : 'text-slate-300 hover:bg-slate-700/50'
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
            </Link>
          </UTooltip>
        </template>
      </li>
    </ul>
  </nav>
</template>
