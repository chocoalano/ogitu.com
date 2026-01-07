import { defineConfig } from 'vite'
import { getDirname } from '@adonisjs/core/helpers'
import inertia from '@adonisjs/inertia/client'
import vue from '@vitejs/plugin-vue'
import ui from '@nuxt/ui/vite'
import adonisjs from '@adonisjs/vite/client'
import nuxt_uiConfig from './inertia/nuxt_ui.config.js'

export default defineConfig({
  plugins: [
    inertia({
      ssr: {
        enabled: true,
        entrypoint: 'inertia/app/ssr.ts',
      },
    }),
    vue(),
    adonisjs({
      entrypoints: ['inertia/app/app.ts'],
      reload: ['resources/views/**/*.edge'],
    }),
    ui({
      inertia: true,
      ...nuxt_uiConfig,
    }),
  ],

  /**
   * Build configuration
   */
  build: {
    target: 'esnext',
  },

  /**
   * Optimize dependencies
   */
  optimizeDeps: {
    esbuildOptions: {
      target: 'esnext',
    },
  },

  /**
   * Define environment variables to expose to frontend
   */
  define: {
    'import.meta.env.VITE_MIDTRANS_CLIENT_KEY': JSON.stringify(process.env.MIDTRANS_CLIENT_KEY),
    'import.meta.env.VITE_MIDTRANS_SNAP_URL': JSON.stringify(
      process.env.MIDTRANS_IS_PRODUCTION === 'true'
        ? 'https://app.midtrans.com/snap/snap.js'
        : 'https://app.sandbox.midtrans.com/snap/snap.js'
    ),
  },

  /**
   * Define aliases for importing modules from
   * your frontend code
   */
  resolve: {
    alias: {
      '~/': `${getDirname(import.meta.url)}/inertia/`,
      '@/': `${getDirname(import.meta.url)}/inertia/`,
    },
  },
})
