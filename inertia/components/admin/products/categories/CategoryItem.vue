<script setup lang="ts">
import type { Category } from './types'
import { useImageHelper } from '~/composables/use_image_helper'

interface Props {
  category: Category
  isExpanded: boolean
}

defineProps<Props>()

const emit = defineEmits<{
  (e: 'toggle'): void
  (e: 'edit', category: Category): void
  (e: 'delete', category: Category): void
  (e: 'toggle-active', category: Category): void
}>()

const { getCategoryImageUrl, isValidImageUrl } = useImageHelper()

// Stop propagation for action buttons
const handleEdit = (event: Event, category: Category) => {
  event.stopPropagation()
  emit('edit', category)
}

const handleDelete = (event: Event, category: Category) => {
  event.stopPropagation()
  emit('delete', category)
}

const handleToggleActive = (event: Event, category: Category) => {
  event.stopPropagation()
  emit('toggle-active', category)
}
</script>

<template>
  <div class="border border-slate-200 dark:border-slate-700 rounded-lg overflow-hidden">
    <!-- Parent Category Header -->
    <div
      class="flex items-center gap-3 p-4 bg-slate-50 dark:bg-slate-900/30 hover:bg-slate-100 dark:hover:bg-slate-900/50 transition-colors"
    >
      <!-- Expand Button -->
      <button
        v-if="category.children.length > 0"
        class="w-6 h-6 flex items-center justify-center rounded hover:bg-slate-200 dark:hover:bg-slate-700"
        @click="emit('toggle')"
      >
        <UIcon
          :name="isExpanded ? 'i-heroicons-chevron-down' : 'i-heroicons-chevron-right'"
          class="w-4 h-4 text-slate-500 transition-transform"
        />
      </button>
      <div v-else class="w-6 h-6"></div>

      <!-- Category Icon -->
      <div class="w-10 h-10 rounded-lg overflow-hidden bg-violet-100 dark:bg-violet-900/30 flex items-center justify-center shrink-0">
        <img
          v-if="isValidImageUrl(category.image)"
          :src="getCategoryImageUrl(category.image)"
          :alt="category.name"
          class="w-full h-full object-cover"
        />
        <UIcon v-else name="i-heroicons-folder" class="w-5 h-5 text-violet-500" />
      </div>

      <!-- Category Info -->
      <div class="flex-1 min-w-0">
        <div class="flex items-center gap-2">
          <p class="font-medium text-slate-900 dark:text-white">{{ category.name }}</p>
          <UBadge v-if="!category.isActive" color="neutral" variant="subtle" size="xs">
            Nonaktif
          </UBadge>
        </div>
        <p v-if="category.description" class="text-xs text-slate-500 dark:text-slate-400 truncate">
          {{ category.description }}
        </p>
      </div>

      <!-- Children Count -->
      <UBadge v-if="category.children.length > 0" color="primary" variant="subtle" size="sm">
        {{ category.children.length }} sub-kategori
      </UBadge>

      <!-- Action Buttons -->
      <div class="flex items-center gap-1">
        <UButton
          icon="i-heroicons-pencil"
          color="neutral"
          variant="ghost"
          size="xs"
          @click="(e: Event) => handleEdit(e, category)"
        />
        <UButton
          :icon="category.isActive ? 'i-heroicons-eye-slash' : 'i-heroicons-eye'"
          :color="category.isActive ? 'warning' : 'success'"
          variant="ghost"
          size="xs"
          @click="(e: Event) => handleToggleActive(e, category)"
        />
        <UButton
          icon="i-heroicons-trash"
          color="error"
          variant="ghost"
          size="xs"
          @click="(e: Event) => handleDelete(e, category)"
        />
      </div>
    </div>

    <!-- Children Categories (Collapsible) -->
    <Transition
      enter-active-class="transition-all duration-200 ease-out"
      enter-from-class="opacity-0 max-h-0"
      enter-to-class="opacity-100 max-h-[1000px]"
      leave-active-class="transition-all duration-200 ease-in"
      leave-from-class="opacity-100 max-h-[1000px]"
      leave-to-class="opacity-0 max-h-0"
    >
      <div v-if="isExpanded && category.children.length > 0" class="overflow-hidden">
        <div class="divide-y divide-slate-200 dark:divide-slate-700">
          <div
            v-for="child in category.children"
            :key="child.id"
            class="flex items-center gap-3 px-4 py-3 pl-16 hover:bg-slate-50 dark:hover:bg-slate-900/20 transition-colors"
          >
            <UIcon name="i-heroicons-arrow-turn-down-right" class="w-4 h-4 text-slate-400 shrink-0" />

            <!-- Child Icon -->
            <div class="w-8 h-8 rounded-lg overflow-hidden bg-slate-100 dark:bg-slate-700 flex items-center justify-center shrink-0">
              <img
                v-if="isValidImageUrl(child.image)"
                :src="getCategoryImageUrl(child.image)"
                :alt="child.name"
                class="w-full h-full object-cover"
              />
              <UIcon v-else name="i-heroicons-tag" class="w-4 h-4 text-slate-400" />
            </div>

            <!-- Child Info -->
            <div class="flex-1 min-w-0">
              <div class="flex items-center gap-2">
                <p class="text-sm text-slate-700 dark:text-slate-300">{{ child.name }}</p>
                <UBadge v-if="!child.isActive" color="neutral" variant="subtle" size="xs">
                  Nonaktif
                </UBadge>
              </div>
              <p v-if="child.description" class="text-xs text-slate-500 dark:text-slate-400 truncate">
                {{ child.description }}
              </p>
            </div>

            <!-- Child Action Buttons -->
            <div class="flex items-center gap-1">
              <UButton
                icon="i-heroicons-pencil"
                color="neutral"
                variant="ghost"
                size="xs"
                @click="(e: Event) => handleEdit(e, child)"
              />
              <UButton
                :icon="child.isActive ? 'i-heroicons-eye-slash' : 'i-heroicons-eye'"
                :color="child.isActive ? 'warning' : 'success'"
                variant="ghost"
                size="xs"
                @click="(e: Event) => handleToggleActive(e, child)"
              />
              <UButton
                icon="i-heroicons-trash"
                color="error"
                variant="ghost"
                size="xs"
                @click="(e: Event) => handleDelete(e, child)"
              />
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>
