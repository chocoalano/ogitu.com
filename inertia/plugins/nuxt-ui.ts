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
export const ref = (value: any) => ({ value })
export const computed = (fn: any) => ({ value: fn() })
export const onMounted = (fn: any) => {}
export const watch = (source: any, cb: any) => {}

export default {
  install(app: App) {
    // Initialize Nuxt UI components globally if needed
  },
}
