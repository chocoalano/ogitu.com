import type { App } from 'vue'

// Nuxt UI color mode composable stub for non-Nuxt environment
export function useColorMode() {
  const colorMode = ref('light')

  return {
    preference: colorMode,
    value: colorMode,
  }
}

// Auto-import stubs for Nuxt UI
export const ref = (value: unknown) => ({ value })
export const computed = (fn: () => unknown) => ({ value: fn() })
export const onMounted = (_fn: () => void) => {}
export const watch = (_source: unknown, _cb: () => void) => {}

export default {
  install(_app: App) {
    // Initialize Nuxt UI components globally if needed
  },
}
