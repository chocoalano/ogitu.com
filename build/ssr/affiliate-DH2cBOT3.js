import { _ as _sfc_main$2, a as _sfc_main$3 } from './Button-BTdvmZ8N.js';
import { defineComponent, ref, unref, withCtx, createVNode, createTextVNode, useSSRContext } from 'vue';
import { ssrRenderComponent, ssrInterpolate, ssrRenderList, ssrRenderClass } from 'vue/server-renderer';
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
  __name: "affiliate",
  __ssrInlineRender: true,
  props: {
    affiliateData: {}
  },
  setup(__props) {
    const openFaq = ref(null);
    const getTierColor = (tier) => {
      const colors = {
        Bronze: "from-amber-600 to-amber-700",
        Silver: "from-gray-400 to-gray-500",
        Gold: "from-yellow-400 to-yellow-500",
        Platinum: "from-cyan-400 to-blue-500"
      };
      return colors[tier] || "from-gray-400 to-gray-500";
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UIcon = _sfc_main$2;
      const _component_UButton = _sfc_main$3;
      _push(`<!--[-->`);
      _push(ssrRenderComponent(unref(Head), { title: "Program Afiliasi - Ogitu" }, null, _parent));
      _push(`<div class="min-h-screen bg-linear-to-b from-gray-50 via-white to-gray-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-900"><!-- Hero Section --><div class="relative bg-linear-to-r from-emerald-500 via-green-500 to-teal-500 overflow-hidden"><div class="absolute inset-0 opacity-10"><svg class="w-full h-full" xmlns="http://www.w3.org/2000/svg"><defs><pattern id="affiliate-pattern" x="0" y="0" width="60" height="60" patternUnits="userSpaceOnUse"><circle cx="30" cy="30" r="20" fill="none" stroke="white" stroke-width="1"></circle><circle cx="30" cy="30" r="10" fill="none" stroke="white" stroke-width="1"></circle><circle cx="30" cy="30" r="3" fill="white"></circle></pattern></defs><rect width="100%" height="100%" fill="url(#affiliate-pattern)"></rect></svg></div><div class="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24"><nav class="flex items-center gap-2 text-sm mb-8 text-white/80">`);
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
      _push(`<span class="text-white font-medium">Afiliasi</span></nav><div class="text-center max-w-3xl mx-auto"><div class="w-20 h-20 mx-auto mb-6 rounded-3xl bg-white/20 backdrop-blur-sm flex items-center justify-center">`);
      _push(ssrRenderComponent(_component_UIcon, {
        name: "i-heroicons-currency-dollar",
        class: "w-10 h-10 text-white"
      }, null, _parent));
      _push(`</div><h1 class="text-4xl sm:text-5xl font-bold text-white mb-6">${ssrInterpolate(__props.affiliateData.hero.title)}</h1><p class="text-xl text-white/80 mb-8">${ssrInterpolate(__props.affiliateData.hero.subtitle)}</p><div class="flex flex-wrap justify-center gap-4">`);
      _push(ssrRenderComponent(unref(Link), { href: "/register" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_UButton, {
              color: "white",
              size: "xl"
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
                size: "xl"
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
      _push(ssrRenderComponent(unref(Link), { href: "/login" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_UButton, {
              color: "white",
              variant: "outline",
              size: "xl"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_UIcon, {
                    name: "i-heroicons-arrow-right-on-rectangle",
                    class: "w-5 h-5 mr-2"
                  }, null, _parent3, _scopeId2));
                  _push3(` Login ke Dashboard `);
                } else {
                  return [
                    createVNode(_component_UIcon, {
                      name: "i-heroicons-arrow-right-on-rectangle",
                      class: "w-5 h-5 mr-2"
                    }),
                    createTextVNode(" Login ke Dashboard ")
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
                size: "xl"
              }, {
                default: withCtx(() => [
                  createVNode(_component_UIcon, {
                    name: "i-heroicons-arrow-right-on-rectangle",
                    class: "w-5 h-5 mr-2"
                  }),
                  createTextVNode(" Login ke Dashboard ")
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
      _push(`</div></div></div></div><div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16"><!-- Commission Tiers --><div class="mb-16"><h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-8 text-center">Tingkat Komisi</h2><div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"><!--[-->`);
      ssrRenderList(__props.affiliateData.commissions, (tier) => {
        _push(`<div class="relative bg-white dark:bg-gray-800/80 rounded-2xl border border-gray-200/80 dark:border-gray-700/50 p-6 hover:shadow-lg transition-shadow overflow-hidden"><!-- Tier badge --><div class="${ssrRenderClass(["absolute top-0 right-0 w-20 h-20 bg-linear-to-br rounded-bl-full", getTierColor(tier.tier)])}"></div><div class="absolute top-2 right-2 text-white text-xs font-bold">${ssrInterpolate(tier.commission)}</div><div class="relative"><h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">${ssrInterpolate(tier.tier)}</h3><div class="space-y-2 text-sm"><div class="flex justify-between"><span class="text-gray-500 dark:text-gray-400">Min. Penjualan</span><span class="text-gray-900 dark:text-white font-medium">${ssrInterpolate(tier.minSales)}</span></div><div class="flex justify-between"><span class="text-gray-500 dark:text-gray-400">Max. Penjualan</span><span class="text-gray-900 dark:text-white font-medium">${ssrInterpolate(tier.maxSales)}</span></div><div class="pt-2 border-t border-gray-100 dark:border-gray-700"><div class="flex justify-between"><span class="text-gray-500 dark:text-gray-400">Komisi</span><span class="text-green-600 dark:text-green-400 font-bold text-lg">${ssrInterpolate(tier.commission)}</span></div></div></div></div></div>`);
      });
      _push(`<!--]--></div></div><!-- How It Works --><div class="mb-16"><h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-8 text-center">Cara Kerja</h2><div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"><!--[-->`);
      ssrRenderList(__props.affiliateData.howItWorks, (step) => {
        _push(`<div class="relative"><!-- Connector -->`);
        if (step.step < __props.affiliateData.howItWorks.length) {
          _push(`<div class="hidden lg:block absolute top-10 left-1/2 w-full h-0.5 bg-gray-200 dark:bg-gray-700"></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<div class="relative bg-white dark:bg-gray-800/80 rounded-2xl border border-gray-200/80 dark:border-gray-700/50 p-6 text-center hover:shadow-lg transition-shadow"><div class="w-14 h-14 mx-auto mb-4 rounded-2xl bg-green-500/10 flex items-center justify-center relative">`);
        _push(ssrRenderComponent(_component_UIcon, {
          name: step.icon,
          class: "w-7 h-7 text-green-600 dark:text-green-400"
        }, null, _parent));
        _push(`<span class="absolute -top-2 -right-2 w-6 h-6 bg-green-500 text-white text-xs font-bold rounded-full flex items-center justify-center">${ssrInterpolate(step.step)}</span></div><h3 class="font-semibold text-gray-900 dark:text-white mb-2">${ssrInterpolate(step.title)}</h3><p class="text-sm text-gray-600 dark:text-gray-400">${ssrInterpolate(step.description)}</p></div></div>`);
      });
      _push(`<!--]--></div></div><!-- Benefits --><div class="mb-16"><div class="bg-green-50 dark:bg-green-900/20 rounded-3xl p-8 sm:p-12"><h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-8 text-center">Keuntungan Affiliate</h2><div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"><!--[-->`);
      ssrRenderList(__props.affiliateData.benefits, (benefit, index) => {
        _push(`<div class="flex items-center gap-3 p-4 bg-white dark:bg-gray-800 rounded-xl"><div class="w-10 h-10 rounded-xl bg-green-500 flex items-center justify-center shrink-0">`);
        _push(ssrRenderComponent(_component_UIcon, {
          name: "i-heroicons-check",
          class: "w-5 h-5 text-white"
        }, null, _parent));
        _push(`</div><span class="text-gray-700 dark:text-gray-300">${ssrInterpolate(benefit)}</span></div>`);
      });
      _push(`<!--]--></div></div></div><!-- Testimonials --><div class="mb-16"><h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-8 text-center">Kata Mereka</h2><div class="grid grid-cols-1 sm:grid-cols-2 gap-6"><!--[-->`);
      ssrRenderList(__props.affiliateData.testimonials, (testimonial) => {
        _push(`<div class="bg-white dark:bg-gray-800/80 rounded-2xl border border-gray-200/80 dark:border-gray-700/50 p-6"><div class="flex items-start gap-4 mb-4"><div class="w-14 h-14 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center shrink-0">`);
        _push(ssrRenderComponent(_component_UIcon, {
          name: "i-heroicons-user",
          class: "w-7 h-7 text-gray-400"
        }, null, _parent));
        _push(`</div><div><h3 class="font-semibold text-gray-900 dark:text-white">${ssrInterpolate(testimonial.name)}</h3><p class="text-sm text-gray-500 dark:text-gray-400">${ssrInterpolate(testimonial.role)}</p><span class="inline-block mt-1 px-2 py-0.5 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 text-xs rounded-full">${ssrInterpolate(testimonial.earnings)}</span></div></div><p class="text-gray-600 dark:text-gray-400 italic"> &quot;${ssrInterpolate(testimonial.quote)}&quot; </p></div>`);
      });
      _push(`<!--]--></div></div><!-- FAQ --><div class="mb-16"><h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-8 text-center">FAQ</h2><div class="max-w-3xl mx-auto space-y-4"><!--[-->`);
      ssrRenderList(__props.affiliateData.faq, (item, index) => {
        _push(`<div class="bg-white dark:bg-gray-800/80 rounded-2xl border border-gray-200/80 dark:border-gray-700/50 overflow-hidden"><button class="w-full px-6 py-4 text-left flex items-center justify-between gap-4 hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors"><span class="font-medium text-gray-900 dark:text-white">${ssrInterpolate(item.question)}</span>`);
        _push(ssrRenderComponent(_component_UIcon, {
          name: "i-heroicons-chevron-down",
          class: [
            "w-5 h-5 text-gray-400 transition-transform duration-200",
            openFaq.value === index ? "rotate-180" : ""
          ]
        }, null, _parent));
        _push(`</button>`);
        if (openFaq.value === index) {
          _push(`<div class="px-6 pb-4 overflow-hidden"><p class="text-gray-600 dark:text-gray-400">${ssrInterpolate(item.answer)}</p></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div>`);
      });
      _push(`<!--]--></div></div><!-- CTA --><div class="bg-linear-to-r from-emerald-500 to-green-600 rounded-3xl p-8 sm:p-12 text-center text-white"><h2 class="text-2xl sm:text-3xl font-bold mb-4">Mulai Hasilkan Uang Sekarang!</h2><p class="text-white/80 max-w-xl mx-auto mb-8"> Bergabung dengan ribuan affiliate sukses di Ogitu. Daftar gratis dan dapatkan kode referral unik Anda. </p><div class="flex flex-wrap justify-center gap-4">`);
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
                    name: "i-heroicons-rocket-launch",
                    class: "w-5 h-5 mr-2"
                  }, null, _parent3, _scopeId2));
                  _push3(` Daftar Gratis `);
                } else {
                  return [
                    createVNode(_component_UIcon, {
                      name: "i-heroicons-rocket-launch",
                      class: "w-5 h-5 mr-2"
                    }),
                    createTextVNode(" Daftar Gratis ")
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
                    name: "i-heroicons-rocket-launch",
                    class: "w-5 h-5 mr-2"
                  }),
                  createTextVNode(" Daftar Gratis ")
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
              color: "white",
              variant: "outline",
              size: "lg"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_UIcon, {
                    name: "i-heroicons-question-mark-circle",
                    class: "w-5 h-5 mr-2"
                  }, null, _parent3, _scopeId2));
                  _push3(` Pelajari Lebih Lanjut `);
                } else {
                  return [
                    createVNode(_component_UIcon, {
                      name: "i-heroicons-question-mark-circle",
                      class: "w-5 h-5 mr-2"
                    }),
                    createTextVNode(" Pelajari Lebih Lanjut ")
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
                    name: "i-heroicons-question-mark-circle",
                    class: "w-5 h-5 mr-2"
                  }),
                  createTextVNode(" Pelajari Lebih Lanjut ")
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("inertia/pages/pages/affiliate.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
