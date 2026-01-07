<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  specifications: string | null | Record<string, unknown>
}>()

// Parse specifications JSON to object
const parsedSpecifications = computed(() => {
  if (!props.specifications) return null
  try {
    // If already an object, return as is
    if (typeof props.specifications === 'object') {
      return props.specifications
    }
    // Parse JSON string
    return JSON.parse(props.specifications)
  } catch {
    // If not valid JSON, return null (will show raw text)
    return null
  }
})
</script>

<template>
  <div
    v-if="specifications"
    class="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6"
  >
    <h3 class="font-semibold text-slate-900 dark:text-white mb-3">Spesifikasi</h3>
    <!-- If specifications is valid JSON object, show as table -->
    <div v-if="parsedSpecifications" class="overflow-x-auto">
      <table class="w-full text-sm">
        <tbody class="divide-y divide-slate-200 dark:divide-slate-700">
          <tr
            v-for="(value, key) in parsedSpecifications"
            :key="key"
            class="hover:bg-slate-50 dark:hover:bg-slate-900/30"
          >
            <td class="py-2 pr-4 text-slate-500 dark:text-slate-400 capitalize font-medium w-1/3">
              {{ String(key).replace(/_/g, ' ') }}
            </td>
            <td class="py-2 text-slate-900 dark:text-white">
              {{ value }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <!-- Fallback: show as raw text if not valid JSON -->
    <div v-else class="prose prose-slate dark:prose-invert max-w-none text-sm">
      <p class="whitespace-pre-wrap">{{ specifications }}</p>
    </div>
  </div>
</template>
