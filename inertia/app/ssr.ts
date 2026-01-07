/// <reference path="../../adonisrc.ts" />
/// <reference path="../../config/inertia.ts" />

import '../css/app.css'
import { createInertiaApp } from '@inertiajs/vue3'
import createServer from '@inertiajs/vue3/server'
import ui from '@nuxt/ui/vue-plugin'
import { createHead, renderSSRHead } from '@unhead/vue/server'
import { resolvePageComponent } from '@adonisjs/inertia/helpers'
import { createSSRApp, type DefineComponent, h } from 'vue'
import { renderToString } from 'vue/server-renderer'

const appName = import.meta.env.VITE_APP_NAME || 'OGITU Vape Marketplace'

createServer(
  (page) => {
    const head = createHead()
    return createInertiaApp({
      page,
      render: renderToString,
      title: (title) => (title ? `${title} - ${appName}` : appName),
      resolve: (name) =>
        resolvePageComponent(
          `../pages/${name}.vue`,
          import.meta.glob<DefineComponent>('../pages/**/*.vue')
        ),
      setup: ({ App, props, plugin }) =>
        createSSRApp({ render: () => h(App, props) })
          .use(plugin)
          .use(head)
          .use(ui),
    }).then(async (app) => {
      const payload = await renderSSRHead(head)
      app.head.push(payload.headTags)
      return app
    })
  },
  { cluster: true }
)
