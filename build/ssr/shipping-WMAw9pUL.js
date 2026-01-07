import { _ as _sfc_main$2, a as _sfc_main$3 } from './Button-BTdvmZ8N.js';
import { defineComponent, unref, withCtx, createVNode, createTextVNode, useSSRContext } from 'vue';
import { ssrRenderComponent, ssrRenderList, ssrInterpolate } from 'vue/server-renderer';
import { Head, Link } from '@inertiajs/vue3';
import { _ as _sfc_main$1 } from './default-pjkA2Ka0.js';
import 'defu';
import 'reka-ui';
import './virtual_nuxt-ui-plugins-CrG8Uaxr.js';
import '@unhead/vue/client';
import 'tailwindcss/colors';
import 'hookable';
import '@vueuse/core';
import 'ohash/utils';
import '@unhead/vue';
import 'tailwind-variants';
import '@iconify/vue';
import 'ufo';
import './Badge-CQlYH3Fo.js';
import 'reka-ui/namespaced';
import './Modal-VctJV7vb.js';
import 'vaul-vue';
import './DropdownMenu-Zcq6i1qV.js';
import './Checkbox-DCS-_c5K.js';

const _sfc_main = /* @__PURE__ */ defineComponent({
  ...{ layout: _sfc_main$1 },
  __name: "shipping",
  __ssrInlineRender: true,
  props: {
    shippingInfo: {}
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UIcon = _sfc_main$2;
      const _component_UButton = _sfc_main$3;
      _push(`<!--[-->`);
      _push(ssrRenderComponent(unref(Head), { title: "Cara Belanja & Pengiriman - Ogitu" }, null, _parent));
      _push(`<div class="min-h-screen bg-linear-to-b from-gray-50 via-white to-gray-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-900"><!-- Hero Section --><div class="relative bg-linear-to-r from-purple-500 via-indigo-500 to-blue-500 overflow-hidden"><div class="absolute inset-0 opacity-10"><svg class="w-full h-full" xmlns="http://www.w3.org/2000/svg"><defs><pattern id="shipping-pattern" x="0" y="0" width="60" height="60" patternUnits="userSpaceOnUse"><path d="M30 5 L55 20 L55 50 L30 65 L5 50 L5 20 Z" fill="none" stroke="white" stroke-width="1"></path></pattern></defs><rect width="100%" height="100%" fill="url(#shipping-pattern)"></rect></svg></div><div class="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16"><nav class="flex items-center gap-2 text-sm mb-6 text-white/80">`);
      _push(ssrRenderComponent(unref(Link), {
        href: "/",
        class: "hover:text-white transition-colors"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_UIcon, {
              name: "i-heroicons-home",
              class: "w-4 h-4"
            }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_UIcon, {
                name: "i-heroicons-home",
                class: "w-4 h-4"
              })
            ];
          }
        }),
        _: 1
        /* STABLE */
      }, _parent));
      _push(ssrRenderComponent(_component_UIcon, {
        name: "i-heroicons-chevron-right",
        class: "w-4 h-4"
      }, null, _parent));
      _push(`<span class="text-white font-medium">Cara Belanja</span></nav><div class="text-center"><div class="w-16 h-16 mx-auto mb-4 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center">`);
      _push(ssrRenderComponent(_component_UIcon, {
        name: "i-heroicons-truck",
        class: "w-8 h-8 text-white"
      }, null, _parent));
      _push(`</div><h1 class="text-3xl sm:text-4xl font-bold text-white mb-3">Cara Belanja &amp; Pengiriman</h1><p class="text-white/80 max-w-2xl mx-auto"> Panduan lengkap berbelanja di Ogitu dan informasi pengiriman ke seluruh Indonesia </p></div></div></div><div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12"><!-- How to Order --><div class="mb-16"><h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-8 text-center">Langkah Berbelanja</h2><div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6"><!--[-->`);
      ssrRenderList(__props.shippingInfo.steps, (step, index) => {
        _push(`<div class="relative"><!-- Connector line -->`);
        if (index < __props.shippingInfo.steps.length - 1) {
          _push(`<div class="hidden lg:block absolute top-10 left-1/2 w-full h-0.5 bg-gray-200 dark:bg-gray-700"></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<div class="relative bg-white dark:bg-gray-800/80 rounded-2xl border border-gray-200/80 dark:border-gray-700/50 p-6 text-center hover:shadow-lg transition-shadow"><div class="w-16 h-16 mx-auto mb-4 rounded-2xl bg-primary-500/10 flex items-center justify-center relative">`);
        _push(ssrRenderComponent(_component_UIcon, {
          name: step.icon,
          class: "w-8 h-8 text-primary-600 dark:text-primary-400"
        }, null, _parent));
        _push(`<span class="absolute -top-2 -right-2 w-6 h-6 bg-primary-500 text-white text-xs font-bold rounded-full flex items-center justify-center">${ssrInterpolate(index + 1)}</span></div><h3 class="font-semibold text-gray-900 dark:text-white mb-2">${ssrInterpolate(step.title)}</h3><p class="text-sm text-gray-600 dark:text-gray-400">${ssrInterpolate(step.description)}</p></div></div>`);
      });
      _push(`<!--]--></div></div><!-- Courier Partners --><div class="mb-16"><h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-8 text-center">Partner Ekspedisi</h2><div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"><!--[-->`);
      ssrRenderList(__props.shippingInfo.couriers, (courier) => {
        _push(`<div class="bg-white dark:bg-gray-800/80 rounded-2xl border border-gray-200/80 dark:border-gray-700/50 p-6 hover:shadow-lg transition-shadow"><div class="w-20 h-12 mb-4 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center"><span class="text-lg font-bold text-gray-600 dark:text-gray-300">${ssrInterpolate(courier.name)}</span></div><h3 class="font-semibold text-gray-900 dark:text-white mb-2">${ssrInterpolate(courier.name)}</h3><p class="text-sm text-gray-600 dark:text-gray-400 mb-3">${ssrInterpolate(courier.description)}</p><div class="flex flex-wrap gap-2"><!--[-->`);
        ssrRenderList(courier.services, (service) => {
          _push(`<span class="px-2 py-1 bg-primary-500/10 text-primary-600 dark:text-primary-400 text-xs rounded-full">${ssrInterpolate(service)}</span>`);
        });
        _push(`<!--]--></div></div>`);
      });
      _push(`<!--]--></div></div><!-- Delivery Estimation --><div class="mb-16"><h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-8 text-center">Estimasi Pengiriman</h2><div class="bg-white dark:bg-gray-800/80 rounded-2xl border border-gray-200/80 dark:border-gray-700/50 overflow-hidden"><div class="overflow-x-auto"><table class="w-full"><thead><tr class="bg-gray-50 dark:bg-gray-700/50"><th class="px-6 py-4 text-left text-sm font-semibold text-gray-900 dark:text-white">Wilayah</th><th class="px-6 py-4 text-center text-sm font-semibold text-gray-900 dark:text-white">Regular</th><th class="px-6 py-4 text-center text-sm font-semibold text-gray-900 dark:text-white">Express</th></tr></thead><tbody class="divide-y divide-gray-200 dark:divide-gray-700"><!--[-->`);
      ssrRenderList(__props.shippingInfo.estimations, (est) => {
        _push(`<tr class="hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors"><td class="px-6 py-4 text-sm text-gray-900 dark:text-white">${ssrInterpolate(est.area)}</td><td class="px-6 py-4 text-sm text-center text-gray-600 dark:text-gray-400">${ssrInterpolate(est.regular)}</td><td class="px-6 py-4 text-sm text-center"><span class="px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 rounded-full">${ssrInterpolate(est.express)}</span></td></tr>`);
      });
      _push(`<!--]--></tbody></table></div></div><p class="mt-4 text-sm text-gray-500 dark:text-gray-400 text-center"> * Estimasi dapat berbeda tergantung kondisi dan lokasi spesifik </p></div><!-- CTA --><div class="bg-linear-to-r from-primary-500 to-indigo-600 rounded-3xl p-8 sm:p-12 text-center text-white"><h2 class="text-2xl sm:text-3xl font-bold mb-4">Siap Berbelanja?</h2><p class="text-white/80 max-w-xl mx-auto mb-8"> Temukan berbagai produk vape berkualitas dengan harga terbaik dan pengiriman cepat ke seluruh Indonesia. </p><div class="flex flex-wrap justify-center gap-4">`);
      _push(ssrRenderComponent(unref(Link), { href: "/collections" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_UButton, {
              color: "white",
              size: "lg"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_UIcon, {
                    name: "i-heroicons-shopping-bag",
                    class: "w-5 h-5 mr-2"
                  }, null, _parent3, _scopeId2));
                  _push3(` Mulai Belanja `);
                } else {
                  return [
                    createVNode(_component_UIcon, {
                      name: "i-heroicons-shopping-bag",
                      class: "w-5 h-5 mr-2"
                    }),
                    createTextVNode(" Mulai Belanja ")
                  ];
                }
              }),
              _: 1
              /* STABLE */
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_UButton, {
                color: "white",
                size: "lg"
              }, {
                default: withCtx(() => [
                  createVNode(_component_UIcon, {
                    name: "i-heroicons-shopping-bag",
                    class: "w-5 h-5 mr-2"
                  }),
                  createTextVNode(" Mulai Belanja ")
                ]),
                _: 1
                /* STABLE */
              })
            ];
          }
        }),
        _: 1
        /* STABLE */
      }, _parent));
      _push(ssrRenderComponent(unref(Link), { href: "/track" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_UButton, {
              color: "white",
              variant: "outline",
              size: "lg"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_UIcon, {
                    name: "i-heroicons-map-pin",
                    class: "w-5 h-5 mr-2"
                  }, null, _parent3, _scopeId2));
                  _push3(` Lacak Pesanan `);
                } else {
                  return [
                    createVNode(_component_UIcon, {
                      name: "i-heroicons-map-pin",
                      class: "w-5 h-5 mr-2"
                    }),
                    createTextVNode(" Lacak Pesanan ")
                  ];
                }
              }),
              _: 1
              /* STABLE */
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_UButton, {
                color: "white",
                variant: "outline",
                size: "lg"
              }, {
                default: withCtx(() => [
                  createVNode(_component_UIcon, {
                    name: "i-heroicons-map-pin",
                    class: "w-5 h-5 mr-2"
                  }),
                  createTextVNode(" Lacak Pesanan ")
                ]),
                _: 1
                /* STABLE */
              })
            ];
          }
        }),
        _: 1
        /* STABLE */
      }, _parent));
      _push(`</div></div></div></div><!--]-->`);
    };
  }
});

const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("inertia/pages/pages/shipping.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
