import { _ as _sfc_main$2, a as _sfc_main$3 } from './Button-BBveOjhJ.js';
import { defineComponent, unref, withCtx, createVNode, createTextVNode, useSSRContext } from 'vue';
import { ssrRenderComponent, ssrInterpolate, ssrRenderList, ssrRenderClass } from 'vue/server-renderer';
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
  __name: "about",
  __ssrInlineRender: true,
  props: {
    aboutData: {}
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UIcon = _sfc_main$2;
      const _component_UButton = _sfc_main$3;
      _push(`<!--[-->`);
      _push(ssrRenderComponent(unref(Head), { title: "Tentang Kami - Ogitu" }, null, _parent));
      _push(`<div class="min-h-screen bg-linear-to-b from-gray-50 via-white to-gray-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-900"><!-- Hero Section --><div class="relative bg-linear-to-r from-gray-900 via-gray-800 to-gray-900 overflow-hidden"><div class="absolute inset-0 opacity-20"><div class="absolute inset-0 bg-[url(&#39;/images/hero-pattern.svg&#39;)] bg-center"></div></div><div class="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24"><nav class="flex items-center gap-2 text-sm mb-8 text-white/60">`);
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
      _push(`<span class="text-white/80 font-medium">Tentang Kami</span></nav><div class="max-w-3xl"><h1 class="text-4xl sm:text-5xl font-bold text-white mb-4">${ssrInterpolate(__props.aboutData.company.name)}</h1><p class="text-xl text-primary-400 font-medium mb-6">${ssrInterpolate(__props.aboutData.company.tagline)}</p><p class="text-gray-300 text-lg leading-relaxed">${ssrInterpolate(__props.aboutData.company.description)}</p></div></div></div><!-- Stats Section --><div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 -mt-12 relative z-10"><div class="grid grid-cols-2 sm:grid-cols-4 gap-4"><!--[-->`);
      ssrRenderList(__props.aboutData.stats, (stat) => {
        _push(`<div class="bg-white dark:bg-gray-800/80 rounded-2xl border border-gray-200/80 dark:border-gray-700/50 p-6 text-center hover:shadow-lg transition-shadow"><div class="w-12 h-12 mx-auto mb-3 rounded-xl bg-primary-500/10 flex items-center justify-center">`);
        _push(ssrRenderComponent(_component_UIcon, {
          name: stat.icon,
          class: "w-6 h-6 text-primary-600 dark:text-primary-400"
        }, null, _parent));
        _push(`</div><div class="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-1">${ssrInterpolate(stat.value)}</div><p class="text-sm text-gray-500 dark:text-gray-400">${ssrInterpolate(stat.label)}</p></div>`);
      });
      _push(`<!--]--></div></div><div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16"><!-- Our Values --><div class="mb-16"><h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-8 text-center">Mengapa Pilih Ogitu?</h2><div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"><!--[-->`);
      ssrRenderList(__props.aboutData.values, (value) => {
        _push(`<div class="bg-white dark:bg-gray-800/80 rounded-2xl border border-gray-200/80 dark:border-gray-700/50 p-6 hover:shadow-lg transition-shadow"><div class="w-14 h-14 mb-4 rounded-2xl bg-linear-to-br from-primary-500 to-indigo-600 flex items-center justify-center">`);
        _push(ssrRenderComponent(_component_UIcon, {
          name: value.icon,
          class: "w-7 h-7 text-white"
        }, null, _parent));
        _push(`</div><h3 class="font-semibold text-gray-900 dark:text-white mb-2">${ssrInterpolate(value.title)}</h3><p class="text-sm text-gray-600 dark:text-gray-400">${ssrInterpolate(value.description)}</p></div>`);
      });
      _push(`<!--]--></div></div><!-- Our Journey --><div class="mb-16"><h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-8 text-center">Perjalanan Kami</h2><div class="relative"><!-- Timeline line --><div class="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gray-200 dark:bg-gray-700 hidden sm:block"></div><div class="space-y-8"><!--[-->`);
      ssrRenderList(__props.aboutData.milestones, (milestone, index) => {
        _push(`<div class="${ssrRenderClass([
          "relative sm:w-1/2",
          index % 2 === 0 ? "sm:pr-12" : "sm:pl-12 sm:ml-auto"
        ])}"><!-- Dot --><div class="${ssrRenderClass([
          "hidden sm:flex absolute top-2 w-5 h-5 bg-primary-500 rounded-full border-4 border-white dark:border-gray-900",
          index % 2 === 0 ? "right-0 translate-x-1/2" : "left-0 -translate-x-1/2"
        ])}"></div><div class="bg-white dark:bg-gray-800/80 rounded-2xl border border-gray-200/80 dark:border-gray-700/50 p-6"><span class="inline-block px-3 py-1 bg-primary-500 text-white text-sm font-bold rounded-full mb-2">${ssrInterpolate(milestone.year)}</span><p class="text-gray-700 dark:text-gray-300">${ssrInterpolate(milestone.event)}</p></div></div>`);
      });
      _push(`<!--]--></div></div></div><!-- Team Section --><div class="mb-16"><h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-8 text-center">Tim Kami</h2><div class="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl mx-auto"><!--[-->`);
      ssrRenderList(__props.aboutData.team, (member) => {
        _push(`<div class="bg-white dark:bg-gray-800/80 rounded-2xl border border-gray-200/80 dark:border-gray-700/50 p-6 text-center hover:shadow-lg transition-shadow"><div class="w-24 h-24 mx-auto mb-4 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">`);
        _push(ssrRenderComponent(_component_UIcon, {
          name: "i-heroicons-user",
          class: "w-12 h-12 text-gray-400"
        }, null, _parent));
        _push(`</div><h3 class="font-semibold text-gray-900 dark:text-white">${ssrInterpolate(member.name)}</h3><p class="text-sm text-primary-600 dark:text-primary-400">${ssrInterpolate(member.role)}</p></div>`);
      });
      _push(`<!--]--></div></div><!-- CTA --><div class="bg-linear-to-r from-primary-500 to-indigo-600 rounded-3xl p-8 sm:p-12 text-center text-white"><h2 class="text-2xl sm:text-3xl font-bold mb-4">Bergabung Bersama Kami</h2><p class="text-white/80 max-w-xl mx-auto mb-8"> Jadilah bagian dari komunitas vapers terbesar di Indonesia. Daftar sekarang dan nikmati berbagai benefit eksklusif. </p><div class="flex flex-wrap justify-center gap-4">`);
      _push(ssrRenderComponent(unref(Link), { href: "/register" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_UButton, {
              color: "white",
              size: "lg"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_UIcon, {
                    name: "i-heroicons-user-plus",
                    class: "w-5 h-5 mr-2"
                  }, null, _parent3, _scopeId2));
                  _push3(` Daftar Sekarang `);
                } else {
                  return [
                    createVNode(_component_UIcon, {
                      name: "i-heroicons-user-plus",
                      class: "w-5 h-5 mr-2"
                    }),
                    createTextVNode(" Daftar Sekarang ")
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
                    name: "i-heroicons-user-plus",
                    class: "w-5 h-5 mr-2"
                  }),
                  createTextVNode(" Daftar Sekarang ")
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("inertia/pages/pages/about.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
