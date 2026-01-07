import { _ as _sfc_main$2, a as _sfc_main$3 } from './Button-BTdvmZ8N.js';
import { defineComponent, unref, withCtx, createVNode, createTextVNode, useSSRContext } from 'vue';
import { ssrRenderComponent, ssrInterpolate, ssrRenderList } from 'vue/server-renderer';
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
  __name: "careers",
  __ssrInlineRender: true,
  props: {
    careersData: {}
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UIcon = _sfc_main$2;
      const _component_UButton = _sfc_main$3;
      _push(`<!--[-->`);
      _push(ssrRenderComponent(unref(Head), { title: "Karir - Ogitu" }, null, _parent));
      _push(`<div class="min-h-screen bg-linear-to-b from-gray-50 via-white to-gray-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-900"><!-- Hero Section --><div class="relative bg-linear-to-r from-pink-500 via-rose-500 to-red-500 overflow-hidden"><div class="absolute inset-0 opacity-10"><svg class="w-full h-full" xmlns="http://www.w3.org/2000/svg"><defs><pattern id="careers-pattern" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse"><circle cx="20" cy="20" r="15" fill="none" stroke="white" stroke-width="1"></circle><circle cx="20" cy="20" r="5" fill="white"></circle></pattern></defs><rect width="100%" height="100%" fill="url(#careers-pattern)"></rect></svg></div><div class="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24"><nav class="flex items-center gap-2 text-sm mb-8 text-white/80">`);
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
      _push(`<span class="text-white font-medium">Karir</span></nav><div class="max-w-3xl"><h1 class="text-4xl sm:text-5xl font-bold text-white mb-6">${ssrInterpolate(__props.careersData.intro.title)}</h1><p class="text-xl text-white/80">${ssrInterpolate(__props.careersData.intro.description)}</p></div></div></div><div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16"><!-- Benefits --><div class="mb-16"><h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-8 text-center">Benefit Karyawan</h2><div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4"><!--[-->`);
      ssrRenderList(__props.careersData.benefits, (benefit) => {
        _push(`<div class="bg-white dark:bg-gray-800/80 rounded-2xl border border-gray-200/80 dark:border-gray-700/50 p-4 text-center hover:shadow-lg transition-shadow"><div class="w-12 h-12 mx-auto mb-3 rounded-xl bg-pink-500/10 flex items-center justify-center">`);
        _push(ssrRenderComponent(_component_UIcon, {
          name: benefit.icon,
          class: "w-6 h-6 text-pink-600 dark:text-pink-400"
        }, null, _parent));
        _push(`</div><p class="text-sm font-medium text-gray-900 dark:text-white">${ssrInterpolate(benefit.title)}</p></div>`);
      });
      _push(`<!--]--></div></div><!-- Open Positions --><div class="mb-16"><h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-8">Lowongan Tersedia</h2>`);
      if (__props.careersData.openings.length === 0) {
        _push(`<div class="text-center py-12"><div class="w-20 h-20 mx-auto mb-4 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center">`);
        _push(ssrRenderComponent(_component_UIcon, {
          name: "i-heroicons-briefcase",
          class: "w-10 h-10 text-gray-400"
        }, null, _parent));
        _push(`</div><h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">Belum Ada Lowongan</h3><p class="text-gray-600 dark:text-gray-400"> Saat ini belum ada lowongan tersedia. Cek kembali nanti atau kirim CV Anda untuk database kami. </p></div>`);
      } else {
        _push(`<div class="space-y-4"><!--[-->`);
        ssrRenderList(__props.careersData.openings, (job) => {
          _push(`<div class="bg-white dark:bg-gray-800/80 rounded-2xl border border-gray-200/80 dark:border-gray-700/50 p-6 hover:shadow-lg transition-shadow"><div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"><div><h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">${ssrInterpolate(job.title)}</h3><div class="flex flex-wrap gap-3 text-sm"><span class="flex items-center gap-1 text-gray-500 dark:text-gray-400">`);
          _push(ssrRenderComponent(_component_UIcon, {
            name: "i-heroicons-building-office-2",
            class: "w-4 h-4"
          }, null, _parent));
          _push(` ${ssrInterpolate(job.department)}</span><span class="flex items-center gap-1 text-gray-500 dark:text-gray-400">`);
          _push(ssrRenderComponent(_component_UIcon, {
            name: "i-heroicons-map-pin",
            class: "w-4 h-4"
          }, null, _parent));
          _push(` ${ssrInterpolate(job.location)}</span><span class="px-2 py-0.5 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 rounded-full text-xs">${ssrInterpolate(job.type)}</span></div><p class="text-sm text-gray-600 dark:text-gray-400 mt-2">${ssrInterpolate(job.description)}</p></div><div class="shrink-0">`);
          _push(ssrRenderComponent(_component_UButton, { color: "primary" }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(` Lamar `);
                _push2(ssrRenderComponent(_component_UIcon, {
                  name: "i-heroicons-arrow-right",
                  class: "w-4 h-4 ml-1"
                }, null, _parent2, _scopeId));
              } else {
                return [
                  createTextVNode(" Lamar "),
                  createVNode(_component_UIcon, {
                    name: "i-heroicons-arrow-right",
                    class: "w-4 h-4 ml-1"
                  })
                ];
              }
            }),
            _: 2
            /* DYNAMIC */
          }, _parent));
          _push(`</div></div></div>`);
        });
        _push(`<!--]--></div>`);
      }
      _push(`</div><!-- Why Join Us --><div class="bg-gray-100 dark:bg-gray-800 rounded-3xl p-8 sm:p-12 mb-16"><div class="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center"><div><h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-4">Kenapa Bergabung dengan Ogitu?</h2><div class="space-y-4 text-gray-600 dark:text-gray-400"><p> Di Ogitu, kami percaya bahwa karyawan adalah aset terpenting. Kami menciptakan lingkungan kerja yang suportif, kolaboratif, dan penuh kesempatan untuk berkembang. </p><ul class="space-y-2"><li class="flex items-start gap-2">`);
      _push(ssrRenderComponent(_component_UIcon, {
        name: "i-heroicons-check-circle",
        class: "w-5 h-5 text-green-500 shrink-0 mt-0.5"
      }, null, _parent));
      _push(`<span>Budaya kerja yang terbuka dan inklusif</span></li><li class="flex items-start gap-2">`);
      _push(ssrRenderComponent(_component_UIcon, {
        name: "i-heroicons-check-circle",
        class: "w-5 h-5 text-green-500 shrink-0 mt-0.5"
      }, null, _parent));
      _push(`<span>Kesempatan untuk belajar dan berkembang</span></li><li class="flex items-start gap-2">`);
      _push(ssrRenderComponent(_component_UIcon, {
        name: "i-heroicons-check-circle",
        class: "w-5 h-5 text-green-500 shrink-0 mt-0.5"
      }, null, _parent));
      _push(`<span>Work-life balance yang sehat</span></li><li class="flex items-start gap-2">`);
      _push(ssrRenderComponent(_component_UIcon, {
        name: "i-heroicons-check-circle",
        class: "w-5 h-5 text-green-500 shrink-0 mt-0.5"
      }, null, _parent));
      _push(`<span>Menjadi bagian dari industri yang berkembang</span></li></ul></div></div><div class="bg-white dark:bg-gray-700 rounded-2xl p-8 text-center"><div class="w-24 h-24 mx-auto mb-4 rounded-full bg-pink-500/10 flex items-center justify-center">`);
      _push(ssrRenderComponent(_component_UIcon, {
        name: "i-heroicons-heart",
        class: "w-12 h-12 text-pink-500"
      }, null, _parent));
      _push(`</div><h3 class="text-xl font-bold text-gray-900 dark:text-white mb-2">Kirim CV Anda</h3><p class="text-gray-600 dark:text-gray-400 mb-4"> Tidak menemukan posisi yang cocok? Kirim CV Anda dan kami akan menghubungi jika ada lowongan yang sesuai. </p>`);
      _push(ssrRenderComponent(_component_UButton, {
        color: "primary",
        size: "lg"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_UIcon, {
              name: "i-heroicons-envelope",
              class: "w-5 h-5 mr-2"
            }, null, _parent2, _scopeId));
            _push2(` careers@ogitu.com `);
          } else {
            return [
              createVNode(_component_UIcon, {
                name: "i-heroicons-envelope",
                class: "w-5 h-5 mr-2"
              }),
              createTextVNode(" careers@ogitu.com ")
            ];
          }
        }),
        _: 1
        /* STABLE */
      }, _parent));
      _push(`</div></div></div><!-- Life at Ogitu --><div class="text-center"><h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-8">Life at Ogitu</h2><div class="grid grid-cols-2 sm:grid-cols-4 gap-4"><!--[-->`);
      ssrRenderList(4, (i) => {
        _push(`<div class="aspect-square bg-gray-200 dark:bg-gray-700 rounded-2xl flex items-center justify-center">`);
        _push(ssrRenderComponent(_component_UIcon, {
          name: "i-heroicons-photo",
          class: "w-12 h-12 text-gray-400"
        }, null, _parent));
        _push(`</div>`);
      });
      _push(`<!--]--></div><p class="text-gray-600 dark:text-gray-400 mt-4"> Ikuti <a href="https://instagram.com/ogitu.id" target="_blank" class="text-primary-500 hover:underline">@ogitu.id</a> untuk melihat keseruan tim kami! </p></div></div></div><!--]-->`);
    };
  }
});

const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("inertia/pages/pages/careers.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
