import { a as _sfc_main$1 } from './Button-BBveOjhJ.js';
import { defineComponent, computed, mergeProps, withCtx, createTextVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrInterpolate, ssrRenderComponent } from 'vue/server-renderer';
import { router } from '@inertiajs/vue3';
import 'defu';
import 'reka-ui';
import './virtual_nuxt-ui-plugins-BqI2j5ZJ.js';
import '@unhead/vue/client';
import 'tailwindcss/colors';
import 'hookable';
import '@vueuse/core';
import 'ohash/utils';
import '@unhead/vue';
import 'tailwind-variants';
import '@iconify/vue';
import 'ufo';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "server_error",
  __ssrInlineRender: true,
  props: {
    error: {},
    isAdminAuth: { type: Boolean, default: false }
  },
  setup(__props) {
    const props = __props;
    const redirectUrl = computed(() => props.isAdminAuth ? "/admin/dashboard" : "/");
    const goHome = () => {
      router.visit(redirectUrl.value);
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UButton = _sfc_main$1;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 px-4" }, _attrs))}><div class="text-center"><p class="text-9xl font-bold text-red-500">500</p><h1 class="mt-4 text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-5xl"> Terjadi Kesalahan </h1><p class="mt-6 text-base leading-7 text-gray-600 dark:text-gray-400">${ssrInterpolate(__props.error?.message || "Terjadi kesalahan pada server. Silakan coba lagi nanti.")}</p><div class="mt-10">`);
      _push(ssrRenderComponent(_component_UButton, {
        size: "lg",
        icon: "i-heroicons-home",
        onClick: goHome
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` Kembali ke Beranda `);
          } else {
            return [
              createTextVNode(" Kembali ke Beranda ")
            ];
          }
        }),
        _: 1
        /* STABLE */
      }, _parent));
      _push(`</div></div></div>`);
    };
  }
});

const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("inertia/pages/errors/server_error.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
