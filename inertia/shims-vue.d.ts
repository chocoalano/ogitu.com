/* eslint-disable */
/**
 * Shim file for .vue single file component type declarations
 * This allows TypeScript to understand .vue file imports
 */
declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}

/**
 * Extend globalThis to include browser globals for SSR safety
 */
declare global {
  var window: Window & typeof globalThis | undefined
  var document: Document | undefined
  var navigator: Navigator | undefined
  var IntersectionObserver: typeof IntersectionObserver | undefined
}

export {}
