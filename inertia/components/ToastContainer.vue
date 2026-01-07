<script setup lang="ts">
import { useToast, type Toast } from '~/composables/use_toast'

const { toasts, removeToast } = useToast()

const getToastIcon = (type: Toast['type']) => {
  switch (type) {
    case 'success':
      return 'i-lucide-check-circle'
    case 'error':
      return 'i-lucide-x-circle'
    case 'warning':
      return 'i-lucide-alert-triangle'
    case 'info':
    default:
      return 'i-lucide-info'
  }
}
</script>

<template>
  <Teleport to="body">
    <div class="fixed bottom-4 right-4 z-100 flex flex-col gap-2 max-w-sm w-full">
      <TransitionGroup
        enter-active-class="transition duration-300 ease-out"
        enter-from-class="opacity-0 translate-x-4"
        enter-to-class="opacity-100 translate-x-0"
        leave-active-class="transition duration-200 ease-in"
        leave-from-class="opacity-100 translate-x-0"
        leave-to-class="opacity-0 translate-x-4"
      >
        <div
          v-for="toast in toasts"
          :key="toast.id"
          class="bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 p-4"
        >
          <div class="flex items-start gap-3">
            <UIcon
              :name="getToastIcon(toast.type)"
              :class="[
                'w-5 h-5 shrink-0 mt-0.5',
                {
                  'text-green-500': toast.type === 'success',
                  'text-red-500': toast.type === 'error',
                  'text-yellow-500': toast.type === 'warning',
                  'text-blue-500': toast.type === 'info',
                },
              ]"
            />
            <div class="flex-1 min-w-0">
              <p class="text-sm font-medium text-gray-900 dark:text-white">
                {{ toast.title }}
              </p>
              <p v-if="toast.message" class="mt-1 text-sm text-gray-500 dark:text-gray-400">
                {{ toast.message }}
              </p>
            </div>
            <button
              type="button"
              class="shrink-0 text-gray-400 hover:text-gray-500 dark:hover:text-gray-300"
              @click="removeToast(toast.id)"
            >
              <UIcon name="i-lucide-x" class="w-4 h-4" />
            </button>
          </div>
        </div>
      </TransitionGroup>
    </div>
  </Teleport>
</template>
