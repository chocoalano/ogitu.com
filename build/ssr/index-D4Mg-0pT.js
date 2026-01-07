import { _ as _sfc_main$2, a as _sfc_main$3 } from './Button-BTdvmZ8N.js';
import { defineComponent, ref, unref, withCtx, createVNode, toDisplayString, createTextVNode, useSSRContext } from 'vue';
import { ssrRenderComponent, ssrRenderList, ssrInterpolate, ssrRenderAttr } from 'vue/server-renderer';
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
  __name: "index",
  __ssrInlineRender: true,
  props: {
    faqs: {},
    contactInfo: {}
  },
  setup(__props) {
    const openItems = ref({});
    const quickLinks = [
      { title: "Cara Order", icon: "i-heroicons-shopping-cart", href: "#order" },
      { title: "Pembayaran", icon: "i-heroicons-credit-card", href: "#pembayaran" },
      { title: "Pengiriman", icon: "i-heroicons-truck", href: "#pengiriman" },
      { title: "Lacak Pesanan", icon: "i-heroicons-map-pin", href: "/track" }
    ];
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UIcon = _sfc_main$2;
      const _component_UButton = _sfc_main$3;
      _push(`<!--[-->`);
      _push(ssrRenderComponent(unref(Head), { title: "Pusat Bantuan - Ogitu" }, null, _parent));
      _push(`<div class="min-h-screen bg-linear-to-b from-gray-50 via-white to-gray-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-900"><!-- Background Effects --><div class="fixed inset-0 -z-10 overflow-hidden pointer-events-none"><div class="absolute top-0 left-1/4 w-125 h-125 bg-emerald-500/10 rounded-full blur-3xl"></div><div class="absolute top-1/3 right-1/4 w-100 h-100 bg-teal-500/10 rounded-full blur-3xl"></div></div><!-- Hero Section --><div class="relative bg-linear-to-r from-emerald-500 via-teal-500 to-cyan-500 overflow-hidden"><div class="absolute inset-0 opacity-10"><svg class="w-full h-full" xmlns="http://www.w3.org/2000/svg"><defs><pattern id="help-pattern" x="0" y="0" width="60" height="60" patternUnits="userSpaceOnUse"><circle cx="30" cy="30" r="4" fill="white"></circle><circle cx="0" cy="0" r="2" fill="white"></circle><circle cx="60" cy="60" r="2" fill="white"></circle></pattern></defs><rect width="100%" height="100%" fill="url(#help-pattern)"></rect></svg></div><div class="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16"><!-- Breadcrumb --><nav class="flex items-center gap-2 text-sm mb-6 text-white/80">`);
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
      _push(`<span class="text-white font-medium">Pusat Bantuan</span></nav><div class="text-center"><div class="w-16 h-16 mx-auto mb-4 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center">`);
      _push(ssrRenderComponent(_component_UIcon, {
        name: "i-heroicons-question-mark-circle",
        class: "w-8 h-8 text-white"
      }, null, _parent));
      _push(`</div><h1 class="text-3xl sm:text-4xl font-bold text-white mb-3">Pusat Bantuan</h1><p class="text-white/80 max-w-2xl mx-auto"> Temukan jawaban untuk pertanyaan seputar produk vape, cara order, pembayaran, dan pengiriman </p></div></div></div><!-- Quick Links --><div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-10"><div class="grid grid-cols-2 sm:grid-cols-4 gap-4"><!--[-->`);
      ssrRenderList(quickLinks, (link) => {
        _push(ssrRenderComponent(unref(Link), {
          key: link.title,
          href: link.href,
          class: "group bg-white dark:bg-gray-800/80 rounded-2xl border border-gray-200/80 dark:border-gray-700/50 p-4 text-center hover:shadow-lg hover:scale-105 transition-all duration-300"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<div class="w-12 h-12 mx-auto mb-3 rounded-xl bg-primary-500/10 group-hover:bg-primary-500/20 flex items-center justify-center transition-colors"${_scopeId}>`);
              _push2(ssrRenderComponent(_component_UIcon, {
                name: link.icon,
                class: "w-6 h-6 text-primary-600 dark:text-primary-400"
              }, null, _parent2, _scopeId));
              _push2(`</div><p class="font-medium text-gray-900 dark:text-white text-sm"${_scopeId}>${ssrInterpolate(link.title)}</p>`);
            } else {
              return [
                createVNode("div", { class: "w-12 h-12 mx-auto mb-3 rounded-xl bg-primary-500/10 group-hover:bg-primary-500/20 flex items-center justify-center transition-colors" }, [
                  createVNode(_component_UIcon, {
                    name: link.icon,
                    class: "w-6 h-6 text-primary-600 dark:text-primary-400"
                  }, null, 8, ["name"])
                ]),
                createVNode(
                  "p",
                  { class: "font-medium text-gray-900 dark:text-white text-sm" },
                  toDisplayString(link.title),
                  1
                  /* TEXT */
                )
              ];
            }
          }),
          _: 2
          /* DYNAMIC */
        }, _parent));
      });
      _push(`<!--]--></div></div><!-- Content --><div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12"><div class="grid grid-cols-1 lg:grid-cols-3 gap-8"><!-- FAQ Section --><div class="lg:col-span-2 space-y-8"><!--[-->`);
      ssrRenderList(__props.faqs, (category) => {
        _push(`<div${ssrRenderAttr("id", category.category.toLowerCase().replace(/\s+/g, "-"))} class="bg-white dark:bg-gray-800/80 rounded-2xl border border-gray-200/80 dark:border-gray-700/50 overflow-hidden"><!-- Category Header --><div class="bg-linear-to-r from-primary-500/10 to-transparent p-6 border-b border-gray-200/50 dark:border-gray-700/50"><div class="flex items-center gap-3"><div class="w-10 h-10 rounded-xl bg-primary-500/20 flex items-center justify-center">`);
        _push(ssrRenderComponent(_component_UIcon, {
          name: category.icon,
          class: "w-5 h-5 text-primary-600 dark:text-primary-400"
        }, null, _parent));
        _push(`</div><h2 class="text-lg font-bold text-gray-900 dark:text-white">${ssrInterpolate(category.category)}</h2></div></div><!-- Questions Accordion --><div class="divide-y divide-gray-100 dark:divide-gray-700/50"><!--[-->`);
        ssrRenderList(category.questions, (item, index) => {
          _push(`<div class="group"><button class="w-full px-6 py-4 text-left flex items-center justify-between gap-4 hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors"><span class="font-medium text-gray-900 dark:text-white">${ssrInterpolate(item.question)}</span>`);
          _push(ssrRenderComponent(_component_UIcon, {
            name: "i-heroicons-chevron-down",
            class: [
              "w-5 h-5 text-gray-400 transition-transform duration-200 shrink-0",
              openItems.value[category.category] === index ? "rotate-180" : ""
            ]
          }, null, _parent));
          _push(`</button>`);
          if (openItems.value[category.category] === index) {
            _push(`<div class="px-6 pb-4 overflow-hidden"><div class="text-gray-600 dark:text-gray-400 text-sm leading-relaxed prose prose-sm dark:prose-invert max-w-none">${item.answer ?? ""}</div></div>`);
          } else {
            _push(`<!---->`);
          }
          _push(`</div>`);
        });
        _push(`<!--]--></div></div>`);
      });
      _push(`<!--]--></div><!-- Sidebar --><div class="space-y-6"><!-- Contact Us --><div class="bg-white dark:bg-gray-800/80 rounded-2xl border border-gray-200/80 dark:border-gray-700/50 p-6 sticky top-24"><h3 class="font-semibold text-gray-900 dark:text-white mb-4">Hubungi Kami</h3><p class="text-sm text-gray-600 dark:text-gray-400 mb-6"> Tidak menemukan jawaban? Hubungi tim support kami. </p><div class="space-y-4"><!-- WhatsApp --><a${ssrRenderAttr("href", `https://wa.me/${__props.contactInfo.whatsapp.replace(/[^0-9]/g, "")}`)} target="_blank" class="flex items-center gap-3 p-3 rounded-xl bg-green-50 dark:bg-green-900/20 hover:bg-green-100 dark:hover:bg-green-900/30 transition-colors"><div class="w-10 h-10 rounded-xl bg-green-500 flex items-center justify-center">`);
      _push(ssrRenderComponent(_component_UIcon, {
        name: "i-simple-icons-whatsapp",
        class: "w-5 h-5 text-white"
      }, null, _parent));
      _push(`</div><div><p class="font-medium text-gray-900 dark:text-white text-sm">WhatsApp</p><p class="text-xs text-gray-500 dark:text-gray-400">${ssrInterpolate(__props.contactInfo.whatsapp)}</p></div></a><!-- Email --><a${ssrRenderAttr("href", `mailto:${__props.contactInfo.email}`)} class="flex items-center gap-3 p-3 rounded-xl bg-blue-50 dark:bg-blue-900/20 hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors"><div class="w-10 h-10 rounded-xl bg-blue-500 flex items-center justify-center">`);
      _push(ssrRenderComponent(_component_UIcon, {
        name: "i-heroicons-envelope",
        class: "w-5 h-5 text-white"
      }, null, _parent));
      _push(`</div><div><p class="font-medium text-gray-900 dark:text-white text-sm">Email</p><p class="text-xs text-gray-500 dark:text-gray-400">${ssrInterpolate(__props.contactInfo.email)}</p></div></a><!-- Instagram --><a${ssrRenderAttr("href", `https://instagram.com/${__props.contactInfo.instagram.replace("@", "")}`)} target="_blank" class="flex items-center gap-3 p-3 rounded-xl bg-pink-50 dark:bg-pink-900/20 hover:bg-pink-100 dark:hover:bg-pink-900/30 transition-colors"><div class="w-10 h-10 rounded-xl bg-linear-to-br from-purple-500 to-pink-500 flex items-center justify-center">`);
      _push(ssrRenderComponent(_component_UIcon, {
        name: "i-simple-icons-instagram",
        class: "w-5 h-5 text-white"
      }, null, _parent));
      _push(`</div><div><p class="font-medium text-gray-900 dark:text-white text-sm">Instagram</p><p class="text-xs text-gray-500 dark:text-gray-400">${ssrInterpolate(__props.contactInfo.instagram)}</p></div></a></div><!-- Working Hours --><div class="mt-6 p-4 bg-gray-50 dark:bg-gray-700/30 rounded-xl"><div class="flex items-center gap-2 mb-2">`);
      _push(ssrRenderComponent(_component_UIcon, {
        name: "i-heroicons-clock",
        class: "w-4 h-4 text-primary-500"
      }, null, _parent));
      _push(`<p class="font-medium text-gray-900 dark:text-white text-sm">Jam Operasional</p></div><p class="text-sm text-gray-600 dark:text-gray-400">${ssrInterpolate(__props.contactInfo.workingHours)}</p></div></div><!-- Track Order CTA --><div class="bg-linear-to-br from-blue-500 to-indigo-600 rounded-2xl p-6 text-white"><div class="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center mb-4">`);
      _push(ssrRenderComponent(_component_UIcon, {
        name: "i-heroicons-truck",
        class: "w-6 h-6"
      }, null, _parent));
      _push(`</div><h3 class="font-semibold mb-2">Lacak Pesanan</h3><p class="text-sm text-white/80 mb-4"> Cek status pengiriman pesanan Anda secara real-time </p>`);
      _push(ssrRenderComponent(unref(Link), { href: "/track" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_UButton, {
              color: "white",
              block: ""
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Lacak Sekarang `);
                } else {
                  return [
                    createTextVNode(" Lacak Sekarang ")
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
                block: ""
              }, {
                default: withCtx(() => [
                  createTextVNode(" Lacak Sekarang ")
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
      _push(`</div><!-- Age Verification Notice --><div class="bg-amber-50 dark:bg-amber-900/20 rounded-2xl border border-amber-200 dark:border-amber-800 p-6"><div class="flex items-start gap-3">`);
      _push(ssrRenderComponent(_component_UIcon, {
        name: "i-heroicons-exclamation-triangle",
        class: "w-6 h-6 text-amber-500 shrink-0"
      }, null, _parent));
      _push(`<div><h4 class="font-semibold text-gray-900 dark:text-white mb-2">Peringatan</h4><p class="text-sm text-gray-600 dark:text-gray-400"> Produk vape hanya untuk pengguna berusia 21 tahun ke atas. Dengan melakukan pembelian, Anda menyatakan bahwa usia Anda sudah memenuhi syarat. </p></div></div></div></div></div></div><!-- Still Need Help Section --><div class="bg-linear-to-r from-gray-900 to-gray-800 dark:from-gray-800 dark:to-gray-900"><div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12"><div class="text-center"><h2 class="text-2xl font-bold text-white mb-3">Masih Butuh Bantuan?</h2><p class="text-gray-400 max-w-xl mx-auto mb-8"> Tim customer service kami siap membantu Anda 24/7. Jangan ragu untuk menghubungi kami melalui WhatsApp. </p><div class="flex flex-wrap justify-center gap-4"><a${ssrRenderAttr("href", `https://wa.me/${__props.contactInfo.whatsapp.replace(/[^0-9]/g, "")}`)} target="_blank">`);
      _push(ssrRenderComponent(_component_UButton, {
        color: "primary",
        size: "lg"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_UIcon, {
              name: "i-simple-icons-whatsapp",
              class: "w-5 h-5 mr-2"
            }, null, _parent2, _scopeId));
            _push2(` Chat via WhatsApp `);
          } else {
            return [
              createVNode(_component_UIcon, {
                name: "i-simple-icons-whatsapp",
                class: "w-5 h-5 mr-2"
              }),
              createTextVNode(" Chat via WhatsApp ")
            ];
          }
        }),
        _: 1
        /* STABLE */
      }, _parent));
      _push(`</a>`);
      _push(ssrRenderComponent(unref(Link), { href: "/" }, {
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
                    name: "i-heroicons-home",
                    class: "w-5 h-5 mr-2"
                  }, null, _parent3, _scopeId2));
                  _push3(` Kembali ke Beranda `);
                } else {
                  return [
                    createVNode(_component_UIcon, {
                      name: "i-heroicons-home",
                      class: "w-5 h-5 mr-2"
                    }),
                    createTextVNode(" Kembali ke Beranda ")
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
                    name: "i-heroicons-home",
                    class: "w-5 h-5 mr-2"
                  }),
                  createTextVNode(" Kembali ke Beranda ")
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
      _push(`</div></div></div></div></div><!--]-->`);
    };
  }
});

const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("inertia/pages/help/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
