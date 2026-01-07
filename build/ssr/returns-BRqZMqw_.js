import { _ as _sfc_main$2, a as _sfc_main$3 } from './Button-BBveOjhJ.js';
import { defineComponent, unref, withCtx, createVNode, createTextVNode, useSSRContext } from 'vue';
import { ssrRenderComponent, ssrRenderList, ssrRenderClass, ssrInterpolate } from 'vue/server-renderer';
import { Head, Link } from '@inertiajs/vue3';
import { _ as _sfc_main$1 } from './default-ChIG0McX.js';
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
import './Badge-DaOjA2YD.js';
import 'reka-ui/namespaced';
import './Modal-lw8uQ47S.js';
import 'vaul-vue';
import './DropdownMenu-DnaZdPLR.js';
import './Checkbox-9gbT5PLz.js';

const _sfc_main = /* @__PURE__ */ defineComponent({
  ...{ layout: _sfc_main$1 },
  __name: "returns",
  __ssrInlineRender: true,
  props: {
    returnsPolicy: {}
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UIcon = _sfc_main$2;
      const _component_UButton = _sfc_main$3;
      _push(`<!--[-->`);
      _push(ssrRenderComponent(unref(Head), { title: "Kebijakan Pengembalian - Ogitu" }, null, _parent));
      _push(`<div class="min-h-screen bg-linear-to-b from-gray-50 via-white to-gray-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-900"><!-- Hero Section --><div class="relative bg-linear-to-r from-red-500 via-rose-500 to-pink-500 overflow-hidden"><div class="absolute inset-0 opacity-10"><svg class="w-full h-full" xmlns="http://www.w3.org/2000/svg"><defs><pattern id="returns-pattern" x="0" y="0" width="50" height="50" patternUnits="userSpaceOnUse"><path d="M25 5 L45 25 L25 45 L5 25 Z" fill="none" stroke="white" stroke-width="1"></path></pattern></defs><rect width="100%" height="100%" fill="url(#returns-pattern)"></rect></svg></div><div class="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16"><nav class="flex items-center gap-2 text-sm mb-6 text-white/80">`);
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
      _push(`<span class="text-white font-medium">Pengembalian</span></nav><div class="text-center"><div class="w-16 h-16 mx-auto mb-4 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center">`);
      _push(ssrRenderComponent(_component_UIcon, {
        name: "i-heroicons-arrow-path",
        class: "w-8 h-8 text-white"
      }, null, _parent));
      _push(`</div><h1 class="text-3xl sm:text-4xl font-bold text-white mb-3">Kebijakan Pengembalian</h1><p class="text-white/80 max-w-2xl mx-auto"> Panduan lengkap pengembalian dan refund untuk menjamin kepuasan belanja Anda </p></div></div></div><div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12"><!-- Eligibility --><div class="mb-12"><h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-6">Syarat Pengembalian</h2><div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"><!--[-->`);
      ssrRenderList(__props.returnsPolicy.conditions, (condition) => {
        _push(`<div class="${ssrRenderClass([
          "rounded-2xl border p-6",
          condition.eligible ? "bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800" : "bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800"
        ])}"><div class="flex items-start gap-4"><div class="${ssrRenderClass([
          "w-12 h-12 rounded-xl flex items-center justify-center shrink-0",
          condition.eligible ? "bg-green-500/20" : "bg-red-500/20"
        ])}">`);
        _push(ssrRenderComponent(_component_UIcon, {
          name: condition.icon,
          class: [
            "w-6 h-6",
            condition.eligible ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"
          ]
        }, null, _parent));
        _push(`</div><div><div class="flex items-center gap-2 mb-1"><h3 class="font-semibold text-gray-900 dark:text-white">${ssrInterpolate(condition.title)}</h3><span class="${ssrRenderClass([
          "px-2 py-0.5 text-xs rounded-full",
          condition.eligible ? "bg-green-500 text-white" : "bg-red-500 text-white"
        ])}">${ssrInterpolate(condition.eligible ? "Bisa" : "Tidak Bisa")}</span></div><p class="text-sm text-gray-600 dark:text-gray-400">${ssrInterpolate(condition.description)}</p></div></div></div>`);
      });
      _push(`<!--]--></div></div><!-- Process Steps --><div class="mb-12"><h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-6">Proses Pengembalian</h2><div class="space-y-4"><!--[-->`);
      ssrRenderList(__props.returnsPolicy.process, (step) => {
        _push(`<div class="bg-white dark:bg-gray-800/80 rounded-2xl border border-gray-200/80 dark:border-gray-700/50 p-6"><div class="flex items-start gap-6"><div class="w-14 h-14 rounded-2xl bg-primary-500 flex items-center justify-center shrink-0"><span class="text-xl font-bold text-white">${ssrInterpolate(step.step)}</span></div><div class="flex-1"><div class="flex items-center gap-3 mb-2"><div class="w-10 h-10 rounded-xl bg-primary-500/10 flex items-center justify-center">`);
        _push(ssrRenderComponent(_component_UIcon, {
          name: step.icon,
          class: "w-5 h-5 text-primary-600 dark:text-primary-400"
        }, null, _parent));
        _push(`</div><h3 class="text-lg font-semibold text-gray-900 dark:text-white">${ssrInterpolate(step.title)}</h3></div><p class="text-gray-600 dark:text-gray-400">${ssrInterpolate(step.description)}</p></div></div></div>`);
      });
      _push(`<!--]--></div></div><!-- Timeline --><div class="mb-12"><h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-6">Estimasi Waktu</h2><div class="grid grid-cols-1 sm:grid-cols-3 gap-4"><div class="bg-blue-50 dark:bg-blue-900/20 rounded-2xl p-6 text-center">`);
      _push(ssrRenderComponent(_component_UIcon, {
        name: "i-heroicons-clock",
        class: "w-10 h-10 mx-auto mb-3 text-blue-500"
      }, null, _parent));
      _push(`<h3 class="font-semibold text-gray-900 dark:text-white mb-1">Lapor Masalah</h3><p class="text-sm text-gray-600 dark:text-gray-400">${ssrInterpolate(__props.returnsPolicy.timeline.report)}</p></div><div class="bg-amber-50 dark:bg-amber-900/20 rounded-2xl p-6 text-center">`);
      _push(ssrRenderComponent(_component_UIcon, {
        name: "i-heroicons-clipboard-document-check",
        class: "w-10 h-10 mx-auto mb-3 text-amber-500"
      }, null, _parent));
      _push(`<h3 class="font-semibold text-gray-900 dark:text-white mb-1">Verifikasi Tim</h3><p class="text-sm text-gray-600 dark:text-gray-400">${ssrInterpolate(__props.returnsPolicy.timeline.verification)}</p></div><div class="bg-green-50 dark:bg-green-900/20 rounded-2xl p-6 text-center">`);
      _push(ssrRenderComponent(_component_UIcon, {
        name: "i-heroicons-banknotes",
        class: "w-10 h-10 mx-auto mb-3 text-green-500"
      }, null, _parent));
      _push(`<h3 class="font-semibold text-gray-900 dark:text-white mb-1">Proses Refund</h3><p class="text-sm text-gray-600 dark:text-gray-400">${ssrInterpolate(__props.returnsPolicy.timeline.refund)}</p></div></div></div><!-- Important Notes --><div class="bg-gray-100 dark:bg-gray-800 rounded-2xl p-6 sm:p-8"><h3 class="font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">`);
      _push(ssrRenderComponent(_component_UIcon, {
        name: "i-heroicons-information-circle",
        class: "w-5 h-5 text-blue-500"
      }, null, _parent));
      _push(` Catatan Penting </h3><ul class="space-y-3 text-sm text-gray-600 dark:text-gray-400"><li class="flex items-start gap-2">`);
      _push(ssrRenderComponent(_component_UIcon, {
        name: "i-heroicons-arrow-right",
        class: "w-4 h-4 text-primary-500 mt-0.5 shrink-0"
      }, null, _parent));
      _push(`<span>Foto/video unboxing sangat disarankan untuk memudahkan proses klaim</span></li><li class="flex items-start gap-2">`);
      _push(ssrRenderComponent(_component_UIcon, {
        name: "i-heroicons-arrow-right",
        class: "w-4 h-4 text-primary-500 mt-0.5 shrink-0"
      }, null, _parent));
      _push(`<span>Ongkos kirim pengembalian ditanggung seller jika produk terbukti cacat/tidak sesuai</span></li><li class="flex items-start gap-2">`);
      _push(ssrRenderComponent(_component_UIcon, {
        name: "i-heroicons-arrow-right",
        class: "w-4 h-4 text-primary-500 mt-0.5 shrink-0"
      }, null, _parent));
      _push(`<span>Refund akan dikembalikan ke metode pembayaran awal atau wallet Ogitu</span></li><li class="flex items-start gap-2">`);
      _push(ssrRenderComponent(_component_UIcon, {
        name: "i-heroicons-arrow-right",
        class: "w-4 h-4 text-primary-500 mt-0.5 shrink-0"
      }, null, _parent));
      _push(`<span>Produk liquid yang sudah dibuka tidak dapat dikembalikan demi alasan kesehatan</span></li></ul></div><!-- CTA --><div class="mt-12 text-center"><p class="text-gray-600 dark:text-gray-400 mb-4">Ada pertanyaan tentang pengembalian?</p><div class="flex flex-wrap justify-center gap-4">`);
      _push(ssrRenderComponent(unref(Link), { href: "/contact" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_UButton, {
              color: "primary",
              size: "lg"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_UIcon, {
                    name: "i-heroicons-chat-bubble-left-right",
                    class: "w-5 h-5 mr-2"
                  }, null, _parent3, _scopeId2));
                  _push3(` Hubungi Kami `);
                } else {
                  return [
                    createVNode(_component_UIcon, {
                      name: "i-heroicons-chat-bubble-left-right",
                      class: "w-5 h-5 mr-2"
                    }),
                    createTextVNode(" Hubungi Kami ")
                  ];
                }
              }),
              _: 1
              /* STABLE */
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_UButton, {
                color: "primary",
                size: "lg"
              }, {
                default: withCtx(() => [
                  createVNode(_component_UIcon, {
                    name: "i-heroicons-chat-bubble-left-right",
                    class: "w-5 h-5 mr-2"
                  }),
                  createTextVNode(" Hubungi Kami ")
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
      _push(ssrRenderComponent(unref(Link), { href: "/help" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_UButton, {
              color: "gray",
              variant: "outline",
              size: "lg"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_UIcon, {
                    name: "i-heroicons-question-mark-circle",
                    class: "w-5 h-5 mr-2"
                  }, null, _parent3, _scopeId2));
                  _push3(` Pusat Bantuan `);
                } else {
                  return [
                    createVNode(_component_UIcon, {
                      name: "i-heroicons-question-mark-circle",
                      class: "w-5 h-5 mr-2"
                    }),
                    createTextVNode(" Pusat Bantuan ")
                  ];
                }
              }),
              _: 1
              /* STABLE */
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_UButton, {
                color: "gray",
                variant: "outline",
                size: "lg"
              }, {
                default: withCtx(() => [
                  createVNode(_component_UIcon, {
                    name: "i-heroicons-question-mark-circle",
                    class: "w-5 h-5 mr-2"
                  }),
                  createTextVNode(" Pusat Bantuan ")
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("inertia/pages/pages/returns.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
