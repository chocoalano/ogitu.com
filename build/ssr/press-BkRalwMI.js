import { _ as _sfc_main$2, a as _sfc_main$3 } from './Button-BTdvmZ8N.js';
import { defineComponent, unref, withCtx, createVNode, createTextVNode, toDisplayString, useSSRContext } from 'vue';
import { ssrRenderComponent, ssrInterpolate, ssrRenderAttr, ssrRenderList } from 'vue/server-renderer';
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
  __name: "press",
  __ssrInlineRender: true,
  props: {
    pressData: {}
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UIcon = _sfc_main$2;
      const _component_UButton = _sfc_main$3;
      _push(`<!--[-->`);
      _push(ssrRenderComponent(unref(Head), { title: "Press & Media - Ogitu" }, null, _parent));
      _push(`<div class="min-h-screen bg-linear-to-b from-gray-50 via-white to-gray-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-900"><!-- Hero Section --><div class="relative bg-linear-to-r from-gray-800 via-gray-900 to-black overflow-hidden"><div class="absolute inset-0 opacity-20"><svg class="w-full h-full" xmlns="http://www.w3.org/2000/svg"><defs><pattern id="press-pattern" x="0" y="0" width="80" height="80" patternUnits="userSpaceOnUse"><line x1="0" y1="40" x2="80" y2="40" stroke="white" stroke-width="0.5"></line><line x1="40" y1="0" x2="40" y2="80" stroke="white" stroke-width="0.5"></line></pattern></defs><rect width="100%" height="100%" fill="url(#press-pattern)"></rect></svg></div><div class="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24"><nav class="flex items-center gap-2 text-sm mb-8 text-white/60">`);
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
      _push(`<span class="text-white/80 font-medium">Press</span></nav><div class="max-w-3xl"><h1 class="text-4xl sm:text-5xl font-bold text-white mb-6">${ssrInterpolate(__props.pressData.intro.title)}</h1><p class="text-xl text-gray-300 mb-8">${ssrInterpolate(__props.pressData.intro.description)}</p><div class="flex flex-wrap gap-4"><a${ssrRenderAttr("href", `mailto:${__props.pressData.intro.contact.email}`)}>`);
      _push(ssrRenderComponent(_component_UButton, {
        color: "white",
        size: "lg"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_UIcon, {
              name: "i-heroicons-envelope",
              class: "w-5 h-5 mr-2"
            }, null, _parent2, _scopeId));
            _push2(` ${ssrInterpolate(__props.pressData.intro.contact.email)}`);
          } else {
            return [
              createVNode(_component_UIcon, {
                name: "i-heroicons-envelope",
                class: "w-5 h-5 mr-2"
              }),
              createTextVNode(
                " " + toDisplayString(__props.pressData.intro.contact.email),
                1
                /* TEXT */
              )
            ];
          }
        }),
        _: 1
        /* STABLE */
      }, _parent));
      _push(`</a><a${ssrRenderAttr("href", `tel:${__props.pressData.intro.contact.phone}`)}>`);
      _push(ssrRenderComponent(_component_UButton, {
        color: "white",
        variant: "outline",
        size: "lg"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_UIcon, {
              name: "i-heroicons-phone",
              class: "w-5 h-5 mr-2"
            }, null, _parent2, _scopeId));
            _push2(` ${ssrInterpolate(__props.pressData.intro.contact.phone)}`);
          } else {
            return [
              createVNode(_component_UIcon, {
                name: "i-heroicons-phone",
                class: "w-5 h-5 mr-2"
              }),
              createTextVNode(
                " " + toDisplayString(__props.pressData.intro.contact.phone),
                1
                /* TEXT */
              )
            ];
          }
        }),
        _: 1
        /* STABLE */
      }, _parent));
      _push(`</a></div></div></div></div><div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16"><!-- Press Releases --><div class="mb-16"><h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-8">Press Release</h2><div class="space-y-6"><!--[-->`);
      ssrRenderList(__props.pressData.releases, (release) => {
        _push(`<div class="group bg-white dark:bg-gray-800/80 rounded-2xl border border-gray-200/80 dark:border-gray-700/50 overflow-hidden hover:shadow-lg transition-all"><div class="grid grid-cols-1 sm:grid-cols-4 gap-0"><div class="aspect-video sm:aspect-square bg-gray-200 dark:bg-gray-700"><div class="w-full h-full flex items-center justify-center text-gray-400">`);
        _push(ssrRenderComponent(_component_UIcon, {
          name: "i-heroicons-photo",
          class: "w-12 h-12"
        }, null, _parent));
        _push(`</div></div><div class="sm:col-span-3 p-6 flex flex-col justify-center"><span class="text-sm text-gray-500 dark:text-gray-400 mb-2">${ssrInterpolate(release.date)}</span><h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-3 group-hover:text-primary-500 transition-colors">${ssrInterpolate(release.title)}</h3><p class="text-gray-600 dark:text-gray-400 mb-4">${ssrInterpolate(release.excerpt)}</p><div>`);
        _push(ssrRenderComponent(_component_UButton, {
          color: "primary",
          variant: "soft",
          size: "sm"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(` Baca Selengkapnya `);
              _push2(ssrRenderComponent(_component_UIcon, {
                name: "i-heroicons-arrow-right",
                class: "w-4 h-4 ml-1"
              }, null, _parent2, _scopeId));
            } else {
              return [
                createTextVNode(" Baca Selengkapnya "),
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
        _push(`</div></div></div></div>`);
      });
      _push(`<!--]--></div></div><!-- Media Coverage --><div class="mb-16"><h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-8">Media Coverage</h2><div class="grid grid-cols-1 sm:grid-cols-3 gap-6"><!--[-->`);
      ssrRenderList(__props.pressData.coverage, (item) => {
        _push(`<div class="bg-white dark:bg-gray-800/80 rounded-2xl border border-gray-200/80 dark:border-gray-700/50 p-6 hover:shadow-lg transition-shadow"><div class="w-full h-12 mb-4 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center"><span class="font-bold text-gray-500 dark:text-gray-400">${ssrInterpolate(item.outlet)}</span></div><p class="text-gray-900 dark:text-white font-medium"> &quot;${ssrInterpolate(item.title)}&quot; </p></div>`);
      });
      _push(`<!--]--></div></div><!-- Media Kit --><div class="bg-gray-100 dark:bg-gray-800 rounded-3xl p-8 sm:p-12"><div class="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center"><div><h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-4">Media Kit</h2><p class="text-gray-600 dark:text-gray-400 mb-6">${ssrInterpolate(__props.pressData.mediaKit.description)}</p><div class="space-y-3"><!--[-->`);
      ssrRenderList(__props.pressData.mediaKit.files, (file) => {
        _push(`<div class="flex items-center justify-between p-4 bg-white dark:bg-gray-700 rounded-xl"><div class="flex items-center gap-3"><div class="w-10 h-10 rounded-lg bg-primary-500/10 flex items-center justify-center">`);
        _push(ssrRenderComponent(_component_UIcon, {
          name: file.format === "PDF" ? "i-heroicons-document-text" : "i-heroicons-folder",
          class: "w-5 h-5 text-primary-600 dark:text-primary-400"
        }, null, _parent));
        _push(`</div><div><p class="font-medium text-gray-900 dark:text-white">${ssrInterpolate(file.name)}</p><p class="text-xs text-gray-500 dark:text-gray-400">${ssrInterpolate(file.format)} • ${ssrInterpolate(file.size)}</p></div></div>`);
        _push(ssrRenderComponent(_component_UButton, {
          color: "primary",
          variant: "ghost",
          size: "sm"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(_component_UIcon, {
                name: "i-heroicons-arrow-down-tray",
                class: "w-4 h-4"
              }, null, _parent2, _scopeId));
            } else {
              return [
                createVNode(_component_UIcon, {
                  name: "i-heroicons-arrow-down-tray",
                  class: "w-4 h-4"
                })
              ];
            }
          }),
          _: 2
          /* DYNAMIC */
        }, _parent));
        _push(`</div>`);
      });
      _push(`<!--]--></div></div><div class="text-center lg:text-left"><div class="inline-block p-8 bg-white dark:bg-gray-700 rounded-3xl"><div class="text-6xl font-bold text-primary-500 mb-4">O</div><p class="text-gray-600 dark:text-gray-400 text-sm"> Download logo dan asset brand Ogitu dalam berbagai format </p></div></div></div></div><!-- Contact CTA --><div class="mt-16 text-center"><h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-4">Pertanyaan Media?</h2><p class="text-gray-600 dark:text-gray-400 max-w-xl mx-auto mb-8"> Tim PR kami siap membantu untuk interview, kolaborasi, atau kebutuhan media lainnya. </p><div class="flex flex-wrap justify-center gap-4"><a${ssrRenderAttr("href", `mailto:${__props.pressData.intro.contact.email}`)}>`);
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
            _push2(` Hubungi PR Team `);
          } else {
            return [
              createVNode(_component_UIcon, {
                name: "i-heroicons-envelope",
                class: "w-5 h-5 mr-2"
              }),
              createTextVNode(" Hubungi PR Team ")
            ];
          }
        }),
        _: 1
        /* STABLE */
      }, _parent));
      _push(`</a>`);
      _push(ssrRenderComponent(unref(Link), { href: "/contact" }, {
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
                    name: "i-heroicons-chat-bubble-left-right",
                    class: "w-5 h-5 mr-2"
                  }, null, _parent3, _scopeId2));
                  _push3(` Kontak Lainnya `);
                } else {
                  return [
                    createVNode(_component_UIcon, {
                      name: "i-heroicons-chat-bubble-left-right",
                      class: "w-5 h-5 mr-2"
                    }),
                    createTextVNode(" Kontak Lainnya ")
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
                    name: "i-heroicons-chat-bubble-left-right",
                    class: "w-5 h-5 mr-2"
                  }),
                  createTextVNode(" Kontak Lainnya ")
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("inertia/pages/pages/press.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
