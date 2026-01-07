import { onMounted, onUnmounted, defineComponent, mergeProps, withCtx, createVNode, createTextVNode, createCommentVNode, createBlock, openBlock, Fragment, renderList, toDisplayString, useSSRContext, ref, computed, useSlots, unref, renderSlot, watch } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderList, ssrRenderClass, ssrInterpolate, ssrRenderAttr, ssrRenderStyle, ssrRenderSlot } from 'vue/server-renderer';
import { Head, router } from '@inertiajs/vue3';
import { useHead } from '@unhead/vue';
import { a as _sfc_main$b, _ as _sfc_main$j } from './default-pjkA2Ka0.js';
import { b as _export_sfc, u as useToast } from './Badge-CQlYH3Fo.js';
import { a as _sfc_main$c, _ as _sfc_main$d, t as tv, k as _sfc_main$f, b as _sfc_main$g, n as _sfc_main$h } from './Button-BTdvmZ8N.js';
import { _ as _sfc_main$e } from './ProductCard-Dppblc24.js';
import { Primitive } from 'reka-ui';
import { a as useAppConfig, n as getSlotChildrenText } from './virtual_nuxt-ui-plugins-CrG8Uaxr.js';
import { pausableFilter, useMouseInElement } from '@vueuse/core';
import { _ as _sfc_main$i } from './Separator-WKKr0N6B.js';
import 'defu';
import './Modal-VctJV7vb.js';
import 'vaul-vue';
import './DropdownMenu-Zcq6i1qV.js';
import 'reka-ui/namespaced';
import './Checkbox-DCS-_c5K.js';
import 'tailwind-variants';
import '@iconify/vue';
import 'ufo';
import '@unhead/vue/client';
import 'tailwindcss/colors';
import 'hookable';
import 'ohash/utils';

function useScrollReveal() {
  let observer = null;
  const observeElements = () => {
    if (typeof globalThis.IntersectionObserver === "undefined") return;
    observer = new globalThis.IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-in");
          }
        });
      },
      { threshold: 0.1 }
    );
    if (typeof globalThis.document !== "undefined") {
      globalThis.document.querySelectorAll(".scroll-reveal").forEach((el) => {
        observer?.observe(el);
      });
    }
  };
  onMounted(() => {
    setTimeout(observeElements, 100);
  });
  onUnmounted(() => {
    observer?.disconnect();
  });
  return {
    observeElements
  };
}

const _sfc_main$a = /* @__PURE__ */ defineComponent({
  __name: "HomeHero",
  __ssrInlineRender: true,
  setup(__props) {
    const promos = [
      { icon: "i-lucide-zap", emoji: "⚡", title: "Diskon 40%", subtitle: "Pod System", gradient: "from-primary-500 to-secondary-500" },
      { icon: "i-lucide-gift", emoji: "🎁", title: "Gratis Ongkir", subtitle: "Min. Belanja 100K", gradient: "from-pink-500 to-purple-500" },
      { icon: "i-lucide-diamond", emoji: "💎", title: "Cashback 20%", subtitle: "Pakai E-Wallet", gradient: "from-blue-500 to-cyan-500" }
    ];
    const stats = [
      { value: "15K+", label: "Produk", gradient: "from-primary-400 to-secondary-400" },
      { value: "50K+", label: "Customer", gradient: "from-pink-400 to-primary-400" }
    ];
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UContainer = _sfc_main$b;
      const _component_UButton = _sfc_main$c;
      const _component_UIcon = _sfc_main$d;
      _push(`<section${ssrRenderAttrs(mergeProps({ class: "relative overflow-hidden" }, _attrs))}>`);
      _push(ssrRenderComponent(_component_UContainer, { class: "relative z-10" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="grid lg:grid-cols-2 gap-12 items-center py-20 lg:py-28"${_scopeId}><!-- Hero Content --><div class="text-center lg:text-left scroll-reveal"${_scopeId}><!-- Title --><h1 class="text-4xl lg:text-6xl xl:text-7xl font-black mb-6 leading-tight"${_scopeId}> Marketplace Vape <span class="block bg-linear-to-r from-primary-400 via-secondary-400 to-pink-400 dark:from-primary-300 dark:via-secondary-300 dark:to-pink-300 text-transparent bg-clip-text"${_scopeId}> Terpercaya </span> Indonesia </h1><!-- Description --><p class="text-lg lg:text-xl mb-8 leading-relaxed max-w-2xl mx-auto lg:mx-0"${_scopeId}> Ribuan produk vape &amp; rokok elektrik original dari ratusan brand terpercaya. Gratis ongkir, garansi resmi, dan harga terbaik! </p><!-- CTA Buttons --><div class="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-8"${_scopeId}>`);
            _push2(ssrRenderComponent(_component_UButton, {
              to: "/collections",
              size: "xl",
              class: "shadow-2xl shadow-primary-500/50 dark:shadow-primary-500/30 font-bold hover:shadow-primary-500/70 dark:hover:shadow-primary-500/50 hover:scale-105 transition-all group"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_UIcon, {
                    name: "i-lucide-shopping-bag",
                    class: "w-5 h-5 group-hover:rotate-12 transition-transform"
                  }, null, _parent3, _scopeId2));
                  _push3(` Belanja Sekarang `);
                } else {
                  return [
                    createVNode(_component_UIcon, {
                      name: "i-lucide-shopping-bag",
                      class: "w-5 h-5 group-hover:rotate-12 transition-transform"
                    }),
                    createTextVNode(" Belanja Sekarang ")
                  ];
                }
              }),
              _: 1
              /* STABLE */
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_UButton, {
              to: "/register",
              size: "xl",
              variant: "outline",
              color: "white",
              class: "font-bold hover:bg-white/10 dark:hover:bg-white/5 hover:scale-105 transition-all group border-white/30 dark:border-white/20"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_UIcon, {
                    name: "i-lucide-store",
                    class: "w-5 h-5 group-hover:scale-110 transition-transform"
                  }, null, _parent3, _scopeId2));
                  _push3(` Jadi Pengguna `);
                } else {
                  return [
                    createVNode(_component_UIcon, {
                      name: "i-lucide-store",
                      class: "w-5 h-5 group-hover:scale-110 transition-transform"
                    }),
                    createTextVNode(" Jadi Pengguna ")
                  ];
                }
              }),
              _: 1
              /* STABLE */
            }, _parent2, _scopeId));
            _push2(`</div><!-- Stats --><div class="grid grid-cols-3 gap-6 pt-6 border-t border-white/10 dark:border-white/5"${_scopeId}><!--[-->`);
            ssrRenderList(stats, (stat, index) => {
              _push2(`<div class="${ssrRenderClass([
                "scroll-reveal",
                `scroll-reveal-delay-${index + 1}`,
                "hover:scale-110 transition-transform cursor-default"
              ])}"${_scopeId}><div class="${ssrRenderClass(["text-2xl lg:text-3xl font-black bg-linear-to-r text-transparent bg-clip-text mb-1", stat.gradient])}"${_scopeId}>${ssrInterpolate(stat.value)}</div><div class="text-sm text-gray-700 dark:text-gray-500"${_scopeId}>${ssrInterpolate(stat.label)}</div></div>`);
            });
            _push2(`<!--]--></div></div><!-- Hero Card - Vape Device Illustration --><div class="relative scroll-reveal scroll-reveal-delay-2 floating-animation"${_scopeId}><!-- Glow Background --><div class="absolute inset-0 bg-linear-to-br from-primary-500 to-secondary-500 dark:from-primary-600 dark:to-secondary-600 rounded-3xl blur-2xl opacity-30 dark:opacity-20 animate-pulse"${_scopeId}></div><div class="relative bg-white/10 dark:bg-white/5 backdrop-blur-xl border border-white/20 dark:border-white/10 rounded-3xl p-8 shadow-2xl hover:shadow-primary-500/20 dark:hover:shadow-primary-500/10 transition-all hover:scale-[1.02] group"${_scopeId}><!-- SVG Vape Device Illustration --><div class="flex justify-center mb-6"${_scopeId}><svg class="w-48 h-48 drop-shadow-2xl" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg"${_scopeId}><!-- Vapor Clouds --><g class="animate-vapor opacity-60"${_scopeId}><ellipse cx="100" cy="25" rx="20" ry="10" class="fill-white/40 dark:fill-white/20"${_scopeId}></ellipse><ellipse cx="85" cy="35" rx="15" ry="8" class="fill-white/30 dark:fill-white/15"${_scopeId}></ellipse><ellipse cx="115" cy="30" rx="18" ry="9" class="fill-white/35 dark:fill-white/18"${_scopeId}></ellipse><ellipse cx="95" cy="15" rx="12" ry="6" class="fill-white/25 dark:fill-white/12"${_scopeId}></ellipse></g><!-- Main Device Body --><defs${_scopeId}><linearGradient id="deviceGradient" x1="0%" y1="0%" x2="100%" y2="100%"${_scopeId}><stop offset="0%" class="[stop-color:var(--color-primary-400)]"${_scopeId}></stop><stop offset="50%" class="[stop-color:var(--color-secondary-500)]"${_scopeId}></stop><stop offset="100%" class="[stop-color:var(--color-primary-600)]"${_scopeId}></stop></linearGradient><linearGradient id="screenGradient" x1="0%" y1="0%" x2="0%" y2="100%"${_scopeId}><stop offset="0%" stop-color="#1a1a2e"${_scopeId}></stop><stop offset="100%" stop-color="#0f0f1a"${_scopeId}></stop></linearGradient><linearGradient id="glassGradient" x1="0%" y1="0%" x2="100%" y2="100%"${_scopeId}><stop offset="0%" stop-color="rgba(255,255,255,0.3)"${_scopeId}></stop><stop offset="50%" stop-color="rgba(255,255,255,0.1)"${_scopeId}></stop><stop offset="100%" stop-color="rgba(255,255,255,0.2)"${_scopeId}></stop></linearGradient></defs><!-- Device Shadow --><ellipse cx="100" cy="185" rx="35" ry="8" class="fill-black/20 dark:fill-black/40 blur-sm"${_scopeId}></ellipse><!-- Main Body --><rect x="70" y="50" width="60" height="130" rx="12" fill="url(#deviceGradient)" class="drop-shadow-lg"${_scopeId}></rect><!-- Body Highlight --><rect x="72" y="52" width="20" height="126" rx="10" class="fill-white/20"${_scopeId}></rect><!-- Drip Tip (Mouthpiece) --><rect x="85" y="40" width="30" height="15" rx="4" class="fill-gray-800 dark:fill-gray-900"${_scopeId}></rect><rect x="90" y="35" width="20" height="10" rx="3" class="fill-gray-700 dark:fill-gray-800"${_scopeId}></rect><!-- Tank/Pod Section --><rect x="78" y="55" width="44" height="50" rx="6" fill="url(#glassGradient)" class="stroke-white/30" stroke-width="1"${_scopeId}></rect><!-- E-liquid Level --><rect x="80" y="75" width="40" height="28" rx="4" class="fill-primary-400/60 dark:fill-primary-500/40"${_scopeId}></rect><rect x="80" y="70" width="40" height="10" rx="2" class="fill-primary-300/40 dark:fill-primary-400/30"${_scopeId}></rect><!-- Coil visible through tank --><rect x="95" y="80" width="10" height="20" rx="2" class="fill-gray-600/50"${_scopeId}></rect><!-- Screen Area --><rect x="78" y="115" width="44" height="35" rx="4" fill="url(#screenGradient)"${_scopeId}></rect><!-- Screen Content --><text x="100" y="130" text-anchor="middle" class="fill-primary-400 text-[8px] font-bold"${_scopeId}>50W</text><text x="100" y="142" text-anchor="middle" class="fill-gray-400 text-[6px]"${_scopeId}>0.5Ω</text><!-- Battery Indicator --><rect x="83" y="147" width="34" height="4" rx="1" class="fill-gray-700"${_scopeId}></rect><rect x="84" y="148" width="25" height="2" rx="0.5" class="fill-primary-500 animate-pulse"${_scopeId}></rect><!-- Fire Button --><circle cx="100" cy="165" r="8" class="fill-gray-800 dark:fill-gray-900 stroke-gray-600" stroke-width="1"${_scopeId}></circle><circle cx="100" cy="165" r="5" class="fill-primary-500/80 animate-pulse"${_scopeId}></circle><!-- Side Buttons --><rect x="130" y="120" width="4" height="12" rx="2" class="fill-gray-600"${_scopeId}></rect><rect x="130" y="135" width="4" height="12" rx="2" class="fill-gray-600"${_scopeId}></rect><!-- USB Port --><rect x="92" y="178" width="16" height="4" rx="1" class="fill-gray-700"${_scopeId}></rect></svg></div><!-- Card Title --><h3 class="text-2xl font-bold text-gray-600 dark:text-gray-100 mb-2 text-center"${_scopeId}>Premium Vape Devices</h3><p class="text-gray-600 dark:text-gray-400 text-center text-sm mb-6"${_scopeId}>Koleksi terbaik dengan garansi resmi</p><!-- Promo Items --><div class="space-y-3"${_scopeId}><!--[-->`);
            ssrRenderList(promos, (promo) => {
              _push2(`<div class="flex items-center justify-between p-4 bg-linear-to-r from-white/10 to-white/5 dark:from-white/5 dark:to-transparent hover:from-white/15 hover:to-white/10 dark:hover:from-white/10 dark:hover:to-white/5 rounded-xl border border-white/15 dark:border-white/10 transition-all hover:scale-[1.02] hover:shadow-lg cursor-pointer group/item"${_scopeId}><div class="flex items-center gap-3"${_scopeId}><div class="${ssrRenderClass(["w-11 h-11 bg-linear-to-br rounded-xl flex items-center justify-center shadow-lg group-hover/item:rotate-12 group-hover/item:scale-110 transition-all", promo.gradient])}"${_scopeId}>`);
              _push2(ssrRenderComponent(_component_UIcon, {
                name: promo.icon,
                class: "w-5 h-5 text-white"
              }, null, _parent2, _scopeId));
              _push2(`</div><div${_scopeId}><div class="text-gray-800 font-semibold text-sm"${_scopeId}>${ssrInterpolate(promo.title)}</div><div class="text-xs text-gray-600 dark:text-gray-400"${_scopeId}>${ssrInterpolate(promo.subtitle)}</div></div></div>`);
              _push2(ssrRenderComponent(_component_UIcon, {
                name: "i-lucide-chevron-right",
                class: "w-5 h-5 text-gray-600 dark:text-gray-400 group-hover/item:translate-x-1 transition-all"
              }, null, _parent2, _scopeId));
              _push2(`</div>`);
            });
            _push2(`<!--]--></div><!-- CTA Button -->`);
            _push2(ssrRenderComponent(_component_UButton, {
              to: "/collections",
              block: "",
              size: "lg",
              class: "mt-6 font-semibold group/btn"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<span${_scopeId2}>Lihat Semua Produk</span>`);
                  _push3(ssrRenderComponent(_component_UIcon, {
                    name: "i-lucide-arrow-right",
                    class: "w-4 h-4 group-hover/btn:translate-x-1 transition-transform"
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode("span", null, "Lihat Semua Produk"),
                    createVNode(_component_UIcon, {
                      name: "i-lucide-arrow-right",
                      class: "w-4 h-4 group-hover/btn:translate-x-1 transition-transform"
                    })
                  ];
                }
              }),
              _: 1
              /* STABLE */
            }, _parent2, _scopeId));
            _push2(`</div></div></div>`);
          } else {
            return [
              createVNode("div", { class: "grid lg:grid-cols-2 gap-12 items-center py-20 lg:py-28" }, [
                createCommentVNode(" Hero Content "),
                createVNode("div", { class: "text-center lg:text-left scroll-reveal" }, [
                  createCommentVNode(" Title "),
                  createVNode("h1", { class: "text-4xl lg:text-6xl xl:text-7xl font-black mb-6 leading-tight" }, [
                    createTextVNode(" Marketplace Vape "),
                    createVNode("span", { class: "block bg-linear-to-r from-primary-400 via-secondary-400 to-pink-400 dark:from-primary-300 dark:via-secondary-300 dark:to-pink-300 text-transparent bg-clip-text" }, " Terpercaya "),
                    createTextVNode(" Indonesia ")
                  ]),
                  createCommentVNode(" Description "),
                  createVNode("p", { class: "text-lg lg:text-xl mb-8 leading-relaxed max-w-2xl mx-auto lg:mx-0" }, " Ribuan produk vape & rokok elektrik original dari ratusan brand terpercaya. Gratis ongkir, garansi resmi, dan harga terbaik! "),
                  createCommentVNode(" CTA Buttons "),
                  createVNode("div", { class: "flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-8" }, [
                    createVNode(_component_UButton, {
                      to: "/collections",
                      size: "xl",
                      class: "shadow-2xl shadow-primary-500/50 dark:shadow-primary-500/30 font-bold hover:shadow-primary-500/70 dark:hover:shadow-primary-500/50 hover:scale-105 transition-all group"
                    }, {
                      default: withCtx(() => [
                        createVNode(_component_UIcon, {
                          name: "i-lucide-shopping-bag",
                          class: "w-5 h-5 group-hover:rotate-12 transition-transform"
                        }),
                        createTextVNode(" Belanja Sekarang ")
                      ]),
                      _: 1
                      /* STABLE */
                    }),
                    createVNode(_component_UButton, {
                      to: "/register",
                      size: "xl",
                      variant: "outline",
                      color: "white",
                      class: "font-bold hover:bg-white/10 dark:hover:bg-white/5 hover:scale-105 transition-all group border-white/30 dark:border-white/20"
                    }, {
                      default: withCtx(() => [
                        createVNode(_component_UIcon, {
                          name: "i-lucide-store",
                          class: "w-5 h-5 group-hover:scale-110 transition-transform"
                        }),
                        createTextVNode(" Jadi Pengguna ")
                      ]),
                      _: 1
                      /* STABLE */
                    })
                  ]),
                  createCommentVNode(" Stats "),
                  createVNode("div", { class: "grid grid-cols-3 gap-6 pt-6 border-t border-white/10 dark:border-white/5" }, [
                    (openBlock(), createBlock(
                      Fragment,
                      null,
                      renderList(stats, (stat, index) => {
                        return createVNode(
                          "div",
                          {
                            key: stat.label,
                            class: [
                              "scroll-reveal",
                              `scroll-reveal-delay-${index + 1}`,
                              "hover:scale-110 transition-transform cursor-default"
                            ]
                          },
                          [
                            createVNode(
                              "div",
                              {
                                class: ["text-2xl lg:text-3xl font-black bg-linear-to-r text-transparent bg-clip-text mb-1", stat.gradient]
                              },
                              toDisplayString(stat.value),
                              3
                              /* TEXT, CLASS */
                            ),
                            createVNode(
                              "div",
                              { class: "text-sm text-gray-700 dark:text-gray-500" },
                              toDisplayString(stat.label),
                              1
                              /* TEXT */
                            )
                          ],
                          2
                          /* CLASS */
                        );
                      }),
                      64
                      /* STABLE_FRAGMENT */
                    ))
                  ])
                ]),
                createCommentVNode(" Hero Card - Vape Device Illustration "),
                createVNode("div", { class: "relative scroll-reveal scroll-reveal-delay-2 floating-animation" }, [
                  createCommentVNode(" Glow Background "),
                  createVNode("div", { class: "absolute inset-0 bg-linear-to-br from-primary-500 to-secondary-500 dark:from-primary-600 dark:to-secondary-600 rounded-3xl blur-2xl opacity-30 dark:opacity-20 animate-pulse" }),
                  createVNode("div", { class: "relative bg-white/10 dark:bg-white/5 backdrop-blur-xl border border-white/20 dark:border-white/10 rounded-3xl p-8 shadow-2xl hover:shadow-primary-500/20 dark:hover:shadow-primary-500/10 transition-all hover:scale-[1.02] group" }, [
                    createCommentVNode(" SVG Vape Device Illustration "),
                    createVNode("div", { class: "flex justify-center mb-6" }, [
                      (openBlock(), createBlock("svg", {
                        class: "w-48 h-48 drop-shadow-2xl",
                        viewBox: "0 0 200 200",
                        fill: "none",
                        xmlns: "http://www.w3.org/2000/svg"
                      }, [
                        createCommentVNode(" Vapor Clouds "),
                        createVNode("g", { class: "animate-vapor opacity-60" }, [
                          createVNode("ellipse", {
                            cx: "100",
                            cy: "25",
                            rx: "20",
                            ry: "10",
                            class: "fill-white/40 dark:fill-white/20"
                          }),
                          createVNode("ellipse", {
                            cx: "85",
                            cy: "35",
                            rx: "15",
                            ry: "8",
                            class: "fill-white/30 dark:fill-white/15"
                          }),
                          createVNode("ellipse", {
                            cx: "115",
                            cy: "30",
                            rx: "18",
                            ry: "9",
                            class: "fill-white/35 dark:fill-white/18"
                          }),
                          createVNode("ellipse", {
                            cx: "95",
                            cy: "15",
                            rx: "12",
                            ry: "6",
                            class: "fill-white/25 dark:fill-white/12"
                          })
                        ]),
                        createCommentVNode(" Main Device Body "),
                        createVNode("defs", null, [
                          createVNode("linearGradient", {
                            id: "deviceGradient",
                            x1: "0%",
                            y1: "0%",
                            x2: "100%",
                            y2: "100%"
                          }, [
                            createVNode("stop", {
                              offset: "0%",
                              class: "[stop-color:var(--color-primary-400)]"
                            }),
                            createVNode("stop", {
                              offset: "50%",
                              class: "[stop-color:var(--color-secondary-500)]"
                            }),
                            createVNode("stop", {
                              offset: "100%",
                              class: "[stop-color:var(--color-primary-600)]"
                            })
                          ]),
                          createVNode("linearGradient", {
                            id: "screenGradient",
                            x1: "0%",
                            y1: "0%",
                            x2: "0%",
                            y2: "100%"
                          }, [
                            createVNode("stop", {
                              offset: "0%",
                              "stop-color": "#1a1a2e"
                            }),
                            createVNode("stop", {
                              offset: "100%",
                              "stop-color": "#0f0f1a"
                            })
                          ]),
                          createVNode("linearGradient", {
                            id: "glassGradient",
                            x1: "0%",
                            y1: "0%",
                            x2: "100%",
                            y2: "100%"
                          }, [
                            createVNode("stop", {
                              offset: "0%",
                              "stop-color": "rgba(255,255,255,0.3)"
                            }),
                            createVNode("stop", {
                              offset: "50%",
                              "stop-color": "rgba(255,255,255,0.1)"
                            }),
                            createVNode("stop", {
                              offset: "100%",
                              "stop-color": "rgba(255,255,255,0.2)"
                            })
                          ])
                        ]),
                        createCommentVNode(" Device Shadow "),
                        createVNode("ellipse", {
                          cx: "100",
                          cy: "185",
                          rx: "35",
                          ry: "8",
                          class: "fill-black/20 dark:fill-black/40 blur-sm"
                        }),
                        createCommentVNode(" Main Body "),
                        createVNode("rect", {
                          x: "70",
                          y: "50",
                          width: "60",
                          height: "130",
                          rx: "12",
                          fill: "url(#deviceGradient)",
                          class: "drop-shadow-lg"
                        }),
                        createCommentVNode(" Body Highlight "),
                        createVNode("rect", {
                          x: "72",
                          y: "52",
                          width: "20",
                          height: "126",
                          rx: "10",
                          class: "fill-white/20"
                        }),
                        createCommentVNode(" Drip Tip (Mouthpiece) "),
                        createVNode("rect", {
                          x: "85",
                          y: "40",
                          width: "30",
                          height: "15",
                          rx: "4",
                          class: "fill-gray-800 dark:fill-gray-900"
                        }),
                        createVNode("rect", {
                          x: "90",
                          y: "35",
                          width: "20",
                          height: "10",
                          rx: "3",
                          class: "fill-gray-700 dark:fill-gray-800"
                        }),
                        createCommentVNode(" Tank/Pod Section "),
                        createVNode("rect", {
                          x: "78",
                          y: "55",
                          width: "44",
                          height: "50",
                          rx: "6",
                          fill: "url(#glassGradient)",
                          class: "stroke-white/30",
                          "stroke-width": "1"
                        }),
                        createCommentVNode(" E-liquid Level "),
                        createVNode("rect", {
                          x: "80",
                          y: "75",
                          width: "40",
                          height: "28",
                          rx: "4",
                          class: "fill-primary-400/60 dark:fill-primary-500/40"
                        }),
                        createVNode("rect", {
                          x: "80",
                          y: "70",
                          width: "40",
                          height: "10",
                          rx: "2",
                          class: "fill-primary-300/40 dark:fill-primary-400/30"
                        }),
                        createCommentVNode(" Coil visible through tank "),
                        createVNode("rect", {
                          x: "95",
                          y: "80",
                          width: "10",
                          height: "20",
                          rx: "2",
                          class: "fill-gray-600/50"
                        }),
                        createCommentVNode(" Screen Area "),
                        createVNode("rect", {
                          x: "78",
                          y: "115",
                          width: "44",
                          height: "35",
                          rx: "4",
                          fill: "url(#screenGradient)"
                        }),
                        createCommentVNode(" Screen Content "),
                        createVNode("text", {
                          x: "100",
                          y: "130",
                          "text-anchor": "middle",
                          class: "fill-primary-400 text-[8px] font-bold"
                        }, "50W"),
                        createVNode("text", {
                          x: "100",
                          y: "142",
                          "text-anchor": "middle",
                          class: "fill-gray-400 text-[6px]"
                        }, "0.5Ω"),
                        createCommentVNode(" Battery Indicator "),
                        createVNode("rect", {
                          x: "83",
                          y: "147",
                          width: "34",
                          height: "4",
                          rx: "1",
                          class: "fill-gray-700"
                        }),
                        createVNode("rect", {
                          x: "84",
                          y: "148",
                          width: "25",
                          height: "2",
                          rx: "0.5",
                          class: "fill-primary-500 animate-pulse"
                        }),
                        createCommentVNode(" Fire Button "),
                        createVNode("circle", {
                          cx: "100",
                          cy: "165",
                          r: "8",
                          class: "fill-gray-800 dark:fill-gray-900 stroke-gray-600",
                          "stroke-width": "1"
                        }),
                        createVNode("circle", {
                          cx: "100",
                          cy: "165",
                          r: "5",
                          class: "fill-primary-500/80 animate-pulse"
                        }),
                        createCommentVNode(" Side Buttons "),
                        createVNode("rect", {
                          x: "130",
                          y: "120",
                          width: "4",
                          height: "12",
                          rx: "2",
                          class: "fill-gray-600"
                        }),
                        createVNode("rect", {
                          x: "130",
                          y: "135",
                          width: "4",
                          height: "12",
                          rx: "2",
                          class: "fill-gray-600"
                        }),
                        createCommentVNode(" USB Port "),
                        createVNode("rect", {
                          x: "92",
                          y: "178",
                          width: "16",
                          height: "4",
                          rx: "1",
                          class: "fill-gray-700"
                        })
                      ]))
                    ]),
                    createCommentVNode(" Card Title "),
                    createVNode("h3", { class: "text-2xl font-bold text-gray-600 dark:text-gray-100 mb-2 text-center" }, "Premium Vape Devices"),
                    createVNode("p", { class: "text-gray-600 dark:text-gray-400 text-center text-sm mb-6" }, "Koleksi terbaik dengan garansi resmi"),
                    createCommentVNode(" Promo Items "),
                    createVNode("div", { class: "space-y-3" }, [
                      (openBlock(), createBlock(
                        Fragment,
                        null,
                        renderList(promos, (promo) => {
                          return createVNode("div", {
                            key: promo.title,
                            class: "flex items-center justify-between p-4 bg-linear-to-r from-white/10 to-white/5 dark:from-white/5 dark:to-transparent hover:from-white/15 hover:to-white/10 dark:hover:from-white/10 dark:hover:to-white/5 rounded-xl border border-white/15 dark:border-white/10 transition-all hover:scale-[1.02] hover:shadow-lg cursor-pointer group/item"
                          }, [
                            createVNode("div", { class: "flex items-center gap-3" }, [
                              createVNode(
                                "div",
                                {
                                  class: ["w-11 h-11 bg-linear-to-br rounded-xl flex items-center justify-center shadow-lg group-hover/item:rotate-12 group-hover/item:scale-110 transition-all", promo.gradient]
                                },
                                [
                                  createVNode(_component_UIcon, {
                                    name: promo.icon,
                                    class: "w-5 h-5 text-white"
                                  }, null, 8, ["name"])
                                ],
                                2
                                /* CLASS */
                              ),
                              createVNode("div", null, [
                                createVNode(
                                  "div",
                                  { class: "text-gray-800 font-semibold text-sm" },
                                  toDisplayString(promo.title),
                                  1
                                  /* TEXT */
                                ),
                                createVNode(
                                  "div",
                                  { class: "text-xs text-gray-600 dark:text-gray-400" },
                                  toDisplayString(promo.subtitle),
                                  1
                                  /* TEXT */
                                )
                              ])
                            ]),
                            createVNode(_component_UIcon, {
                              name: "i-lucide-chevron-right",
                              class: "w-5 h-5 text-gray-600 dark:text-gray-400 group-hover/item:translate-x-1 transition-all"
                            })
                          ]);
                        }),
                        64
                        /* STABLE_FRAGMENT */
                      ))
                    ]),
                    createCommentVNode(" CTA Button "),
                    createVNode(_component_UButton, {
                      to: "/collections",
                      block: "",
                      size: "lg",
                      class: "mt-6 font-semibold group/btn"
                    }, {
                      default: withCtx(() => [
                        createVNode("span", null, "Lihat Semua Produk"),
                        createVNode(_component_UIcon, {
                          name: "i-lucide-arrow-right",
                          class: "w-4 h-4 group-hover/btn:translate-x-1 transition-transform"
                        })
                      ]),
                      _: 1
                      /* STABLE */
                    })
                  ])
                ])
              ])
            ];
          }
        }),
        _: 1
        /* STABLE */
      }, _parent));
      _push(`</section>`);
    };
  }
});

const _sfc_setup$a = _sfc_main$a.setup;
_sfc_main$a.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("inertia/components/home/HomeHero.vue");
  return _sfc_setup$a ? _sfc_setup$a(props, ctx) : void 0;
};

const _sfc_main$9 = /* @__PURE__ */ defineComponent({
  __name: "HomeCategories",
  __ssrInlineRender: true,
  props: {
    categories: {}
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UContainer = _sfc_main$b;
      const _component_UIcon = _sfc_main$d;
      const _component_UButton = _sfc_main$c;
      _push(`<section${ssrRenderAttrs(mergeProps({ class: "py-16 lg:py-24 relative overflow-hidden" }, _attrs))}>`);
      _push(ssrRenderComponent(_component_UContainer, { class: "relative z-10" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<!-- Section Header --><div class="text-center mb-12 lg:mb-16 scroll-reveal"${_scopeId}><!-- Badge --><div class="inline-flex items-center gap-2 px-4 py-2 bg-primary-100/80 dark:bg-white/10 backdrop-blur-md border border-primary-200/50 dark:border-white/20 rounded-full mb-6 shadow-sm"${_scopeId}><div class="w-2 h-2 bg-primary-500 dark:bg-primary-400 rounded-full animate-pulse"${_scopeId}></div><span class="text-sm font-medium text-primary-700 dark:text-white/80"${_scopeId}>Explore Categories</span></div><h2 class="text-3xl lg:text-5xl font-black text-gray-900 dark:text-white mb-4"${_scopeId}> Kategori <span class="bg-linear-to-r from-primary-500 via-secondary-500 to-pink-500 dark:from-primary-400 dark:via-secondary-400 dark:to-pink-400 text-transparent bg-clip-text"${_scopeId}>Populer</span></h2><p class="text-gray-600 dark:text-gray-300 text-lg max-w-2xl mx-auto"${_scopeId}> Temukan produk vape &amp; rokok elektrik terbaik sesuai kebutuhan Anda </p></div><!-- Categories Grid --><div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4 lg:gap-6"${_scopeId}><!--[-->`);
            ssrRenderList(__props.categories, (category, index) => {
              _push2(`<a${ssrRenderAttr("href", category.href)} class="${ssrRenderClass([
                "scroll-reveal",
                `scroll-reveal-delay-${index % 6 + 1}`,
                "group relative rounded-2xl sm:rounded-3xl p-4 sm:p-6 overflow-hidden",
                "bg-white/80 dark:bg-white/5 backdrop-blur-xl",
                "border border-gray-200/80 dark:border-white/10",
                "hover:bg-white dark:hover:bg-white/10 hover:border-primary-300 dark:hover:border-primary-500/50",
                "transition-all duration-500 ease-out",
                "hover:shadow-xl hover:shadow-primary-500/10 dark:hover:shadow-primary-500/20",
                "active:scale-95 sm:hover:-translate-y-2 cursor-pointer"
              ])}"${_scopeId}><!-- Card Glow Effect --><div class="absolute inset-0 bg-linear-to-br from-primary-500/0 via-secondary-500/0 to-pink-500/0 group-hover:from-primary-500/5 dark:group-hover:from-primary-500/20 group-hover:via-secondary-500/5 dark:group-hover:via-secondary-500/10 group-hover:to-pink-500/5 dark:group-hover:to-pink-500/20 rounded-2xl sm:rounded-3xl transition-all duration-500 pointer-events-none"${_scopeId}></div><!-- Animated Border Glow --><div class="absolute inset-0 rounded-2xl sm:rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"${_scopeId}><div class="absolute -inset-px bg-linear-to-r from-primary-500 via-secondary-500 to-pink-500 rounded-2xl sm:rounded-3xl blur-sm animate-border-glow opacity-30 dark:opacity-100"${_scopeId}></div></div><div class="relative text-center z-10"${_scopeId}><!-- Icon Container --><div class="relative w-14 h-14 sm:w-16 sm:h-16 mx-auto mb-3 sm:mb-4"${_scopeId}><!-- Icon Background Glow --><div class="absolute inset-0 bg-linear-to-br from-primary-500 to-secondary-500 rounded-xl sm:rounded-2xl blur-lg opacity-30 dark:opacity-50 group-hover:opacity-60 dark:group-hover:opacity-80 transition-opacity"${_scopeId}></div><!-- Icon Box --><div class="relative w-full h-full bg-linear-to-br from-primary-500 to-secondary-500 rounded-xl sm:rounded-2xl flex items-center justify-center group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-lg shadow-primary-500/20"${_scopeId}>`);
              _push2(ssrRenderComponent(_component_UIcon, {
                name: category.icon,
                class: "w-7 h-7 sm:w-8 sm:h-8 text-white drop-shadow-lg"
              }, null, _parent2, _scopeId));
              _push2(`</div><!-- Particle Effects on Hover --><div class="absolute -top-1 -right-1 w-3 h-3 bg-primary-400 rounded-full opacity-0 group-hover:opacity-100 group-hover:animate-ping transition-opacity"${_scopeId}></div><div class="absolute -bottom-1 -left-1 w-2 h-2 bg-secondary-400 rounded-full opacity-0 group-hover:opacity-100 group-hover:animate-ping transition-opacity" style="${ssrRenderStyle({ "animation-delay": "0.2s" })}"${_scopeId}></div></div><!-- Category Name --><h3 class="font-bold text-gray-900 dark:text-white mb-1 text-xs sm:text-sm lg:text-base group-hover:text-primary-600 dark:group-hover:text-primary-300 transition-colors"${_scopeId}>${ssrInterpolate(category.name)}</h3><!-- Category Description -->`);
              if (category.description) {
                _push2(`<p class="text-[10px] sm:text-xs text-gray-500 dark:text-gray-400 group-hover:text-primary-500 dark:group-hover:text-white/80 transition-colors line-clamp-1"${_scopeId}>${ssrInterpolate(category.description)}</p>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div><!-- Bottom Shine Effect --><div class="absolute bottom-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-primary-400/30 dark:via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"${_scopeId}></div></a>`);
            });
            _push2(`<!--]--></div><!-- Bottom CTA --><div class="text-center mt-10 lg:mt-12 scroll-reveal"${_scopeId}>`);
            _push2(ssrRenderComponent(_component_UButton, {
              to: "/collections",
              size: "lg",
              variant: "outline",
              class: "group font-semibold text-primary-600 dark:text-white border-primary-300 dark:border-white/50 hover:bg-primary-50 dark:hover:bg-white/10 hover:border-primary-400 dark:hover:border-white transition-all shadow-sm"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<span${_scopeId2}>Lihat Semua Koleksi</span>`);
                  _push3(ssrRenderComponent(_component_UIcon, {
                    name: "i-lucide-arrow-right",
                    class: "w-4 h-4 group-hover:translate-x-1 transition-transform"
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode("span", null, "Lihat Semua Koleksi"),
                    createVNode(_component_UIcon, {
                      name: "i-lucide-arrow-right",
                      class: "w-4 h-4 group-hover:translate-x-1 transition-transform"
                    })
                  ];
                }
              }),
              _: 1
              /* STABLE */
            }, _parent2, _scopeId));
            _push2(`</div>`);
          } else {
            return [
              createCommentVNode(" Section Header "),
              createVNode("div", { class: "text-center mb-12 lg:mb-16 scroll-reveal" }, [
                createCommentVNode(" Badge "),
                createVNode("div", { class: "inline-flex items-center gap-2 px-4 py-2 bg-primary-100/80 dark:bg-white/10 backdrop-blur-md border border-primary-200/50 dark:border-white/20 rounded-full mb-6 shadow-sm" }, [
                  createVNode("div", { class: "w-2 h-2 bg-primary-500 dark:bg-primary-400 rounded-full animate-pulse" }),
                  createVNode("span", { class: "text-sm font-medium text-primary-700 dark:text-white/80" }, "Explore Categories")
                ]),
                createVNode("h2", { class: "text-3xl lg:text-5xl font-black text-gray-900 dark:text-white mb-4" }, [
                  createTextVNode(" Kategori "),
                  createVNode("span", { class: "bg-linear-to-r from-primary-500 via-secondary-500 to-pink-500 dark:from-primary-400 dark:via-secondary-400 dark:to-pink-400 text-transparent bg-clip-text" }, "Populer")
                ]),
                createVNode("p", { class: "text-gray-600 dark:text-gray-300 text-lg max-w-2xl mx-auto" }, " Temukan produk vape & rokok elektrik terbaik sesuai kebutuhan Anda ")
              ]),
              createCommentVNode(" Categories Grid "),
              createVNode("div", { class: "grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4 lg:gap-6" }, [
                (openBlock(true), createBlock(
                  Fragment,
                  null,
                  renderList(__props.categories, (category, index) => {
                    return openBlock(), createBlock("a", {
                      key: category.name,
                      href: category.href,
                      class: [
                        "scroll-reveal",
                        `scroll-reveal-delay-${index % 6 + 1}`,
                        "group relative rounded-2xl sm:rounded-3xl p-4 sm:p-6 overflow-hidden",
                        "bg-white/80 dark:bg-white/5 backdrop-blur-xl",
                        "border border-gray-200/80 dark:border-white/10",
                        "hover:bg-white dark:hover:bg-white/10 hover:border-primary-300 dark:hover:border-primary-500/50",
                        "transition-all duration-500 ease-out",
                        "hover:shadow-xl hover:shadow-primary-500/10 dark:hover:shadow-primary-500/20",
                        "active:scale-95 sm:hover:-translate-y-2 cursor-pointer"
                      ]
                    }, [
                      createCommentVNode(" Card Glow Effect "),
                      createVNode("div", { class: "absolute inset-0 bg-linear-to-br from-primary-500/0 via-secondary-500/0 to-pink-500/0 group-hover:from-primary-500/5 dark:group-hover:from-primary-500/20 group-hover:via-secondary-500/5 dark:group-hover:via-secondary-500/10 group-hover:to-pink-500/5 dark:group-hover:to-pink-500/20 rounded-2xl sm:rounded-3xl transition-all duration-500 pointer-events-none" }),
                      createCommentVNode(" Animated Border Glow "),
                      createVNode("div", { class: "absolute inset-0 rounded-2xl sm:rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" }, [
                        createVNode("div", { class: "absolute -inset-px bg-linear-to-r from-primary-500 via-secondary-500 to-pink-500 rounded-2xl sm:rounded-3xl blur-sm animate-border-glow opacity-30 dark:opacity-100" })
                      ]),
                      createVNode("div", { class: "relative text-center z-10" }, [
                        createCommentVNode(" Icon Container "),
                        createVNode("div", { class: "relative w-14 h-14 sm:w-16 sm:h-16 mx-auto mb-3 sm:mb-4" }, [
                          createCommentVNode(" Icon Background Glow "),
                          createVNode("div", { class: "absolute inset-0 bg-linear-to-br from-primary-500 to-secondary-500 rounded-xl sm:rounded-2xl blur-lg opacity-30 dark:opacity-50 group-hover:opacity-60 dark:group-hover:opacity-80 transition-opacity" }),
                          createCommentVNode(" Icon Box "),
                          createVNode("div", { class: "relative w-full h-full bg-linear-to-br from-primary-500 to-secondary-500 rounded-xl sm:rounded-2xl flex items-center justify-center group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-lg shadow-primary-500/20" }, [
                            createVNode(_component_UIcon, {
                              name: category.icon,
                              class: "w-7 h-7 sm:w-8 sm:h-8 text-white drop-shadow-lg"
                            }, null, 8, ["name"])
                          ]),
                          createCommentVNode(" Particle Effects on Hover "),
                          createVNode("div", { class: "absolute -top-1 -right-1 w-3 h-3 bg-primary-400 rounded-full opacity-0 group-hover:opacity-100 group-hover:animate-ping transition-opacity" }),
                          createVNode("div", {
                            class: "absolute -bottom-1 -left-1 w-2 h-2 bg-secondary-400 rounded-full opacity-0 group-hover:opacity-100 group-hover:animate-ping transition-opacity",
                            style: { "animation-delay": "0.2s" }
                          })
                        ]),
                        createCommentVNode(" Category Name "),
                        createVNode(
                          "h3",
                          { class: "font-bold text-gray-900 dark:text-white mb-1 text-xs sm:text-sm lg:text-base group-hover:text-primary-600 dark:group-hover:text-primary-300 transition-colors" },
                          toDisplayString(category.name),
                          1
                          /* TEXT */
                        ),
                        createCommentVNode(" Category Description "),
                        category.description ? (openBlock(), createBlock(
                          "p",
                          {
                            key: 0,
                            class: "text-[10px] sm:text-xs text-gray-500 dark:text-gray-400 group-hover:text-primary-500 dark:group-hover:text-white/80 transition-colors line-clamp-1"
                          },
                          toDisplayString(category.description),
                          1
                          /* TEXT */
                        )) : createCommentVNode("v-if", true)
                      ]),
                      createCommentVNode(" Bottom Shine Effect "),
                      createVNode("div", { class: "absolute bottom-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-primary-400/30 dark:via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" })
                    ], 10, ["href"]);
                  }),
                  128
                  /* KEYED_FRAGMENT */
                ))
              ]),
              createCommentVNode(" Bottom CTA "),
              createVNode("div", { class: "text-center mt-10 lg:mt-12 scroll-reveal" }, [
                createVNode(_component_UButton, {
                  to: "/collections",
                  size: "lg",
                  variant: "outline",
                  class: "group font-semibold text-primary-600 dark:text-white border-primary-300 dark:border-white/50 hover:bg-primary-50 dark:hover:bg-white/10 hover:border-primary-400 dark:hover:border-white transition-all shadow-sm"
                }, {
                  default: withCtx(() => [
                    createVNode("span", null, "Lihat Semua Koleksi"),
                    createVNode(_component_UIcon, {
                      name: "i-lucide-arrow-right",
                      class: "w-4 h-4 group-hover:translate-x-1 transition-transform"
                    })
                  ]),
                  _: 1
                  /* STABLE */
                })
              ])
            ];
          }
        }),
        _: 1
        /* STABLE */
      }, _parent));
      _push(`</section>`);
    };
  }
});

const _sfc_setup$9 = _sfc_main$9.setup;
_sfc_main$9.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("inertia/components/home/HomeCategories.vue");
  return _sfc_setup$9 ? _sfc_setup$9(props, ctx) : void 0;
};

const _sfc_main$8 = /* @__PURE__ */ defineComponent({
  __name: "HomeFeaturedProducts",
  __ssrInlineRender: true,
  props: {
    products: {},
    title: { default: "Produk Pilihan" },
    subtitle: { default: "Produk terlaris dan terpopuler minggu ini" }
  },
  emits: ["addToCart", "addToWishlist"],
  setup(__props, { emit: __emit }) {
    const emit = __emit;
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UContainer = _sfc_main$b;
      const _component_UButton = _sfc_main$c;
      const _component_UIcon = _sfc_main$d;
      _push(`<section${ssrRenderAttrs(mergeProps({ class: "py-16 lg:py-24 relative overflow-hidden" }, _attrs))}>`);
      _push(ssrRenderComponent(_component_UContainer, { class: "relative z-10" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<!-- Section Header --><div class="flex flex-col md:flex-row items-center justify-between mb-12 lg:mb-16 scroll-reveal"${_scopeId}><div class="text-center md:text-left mb-6 md:mb-0"${_scopeId}><!-- Section Badge --><div class="inline-flex items-center gap-2 px-4 py-2 bg-primary-100 dark:bg-primary-900/30 rounded-full mb-4"${_scopeId}><div class="w-2 h-2 bg-primary-500 rounded-full animate-pulse"${_scopeId}></div><span class="text-sm font-semibold text-primary-700 dark:text-primary-300"${_scopeId}> Trending Now </span></div><h2 class="text-3xl lg:text-5xl font-black text-gray-900 dark:text-white mb-3"${_scopeId}>${ssrInterpolate(__props.title.split(" ")[0])} <span class="bg-linear-to-r from-primary-600 via-secondary-500 to-pink-500 text-transparent bg-clip-text"${_scopeId}>${ssrInterpolate(__props.title.split(" ").slice(1).join(" "))}</span></h2><p class="text-gray-600 dark:text-gray-400 text-lg max-w-md"${_scopeId}>${ssrInterpolate(__props.subtitle)}</p></div>`);
            _push2(ssrRenderComponent(_component_UButton, {
              to: "/collections",
              variant: "soft",
              size: "lg",
              class: "hidden md:flex group hover:scale-105 transition-all shadow-lg hover:shadow-xl"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<span${_scopeId2}>Lihat Semua</span>`);
                  _push3(ssrRenderComponent(_component_UIcon, {
                    name: "i-lucide-arrow-right",
                    class: "w-4 h-4 group-hover:translate-x-1 transition-transform"
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode("span", null, "Lihat Semua"),
                    createVNode(_component_UIcon, {
                      name: "i-lucide-arrow-right",
                      class: "w-4 h-4 group-hover:translate-x-1 transition-transform"
                    })
                  ];
                }
              }),
              _: 1
              /* STABLE */
            }, _parent2, _scopeId));
            _push2(`</div><!-- Products Grid --><div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6"${_scopeId}><!--[-->`);
            ssrRenderList(__props.products, (product, index) => {
              _push2(ssrRenderComponent(_sfc_main$e, {
                key: product.id,
                product,
                class: ["scroll-reveal", `scroll-reveal-delay-${index % 4 + 1}`],
                onAddToCart: ($event) => emit("addToCart", product),
                onAddToWishlist: ($event) => emit("addToWishlist", product)
              }, null, _parent2, _scopeId));
            });
            _push2(`<!--]--></div><!-- Mobile View All Button --><div class="text-center mt-10 md:hidden scroll-reveal"${_scopeId}>`);
            _push2(ssrRenderComponent(_component_UButton, {
              to: "/collections",
              block: "",
              size: "lg",
              class: "shadow-xl shadow-primary-500/20 font-bold"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<span${_scopeId2}>Lihat Semua Produk</span>`);
                  _push3(ssrRenderComponent(_component_UIcon, {
                    name: "i-lucide-arrow-right",
                    class: "w-4 h-4"
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode("span", null, "Lihat Semua Produk"),
                    createVNode(_component_UIcon, {
                      name: "i-lucide-arrow-right",
                      class: "w-4 h-4"
                    })
                  ];
                }
              }),
              _: 1
              /* STABLE */
            }, _parent2, _scopeId));
            _push2(`</div><!-- Trust Indicators --><div class="mt-10 sm:mt-16 pt-8 sm:pt-10 border-t border-gray-200 dark:border-gray-800 scroll-reveal"${_scopeId}><div class="grid grid-cols-4 gap-2 sm:gap-6 lg:gap-8"${_scopeId}><div class="flex flex-col items-center text-center group"${_scopeId}><div class="w-10 h-10 sm:w-14 sm:h-14 bg-linear-to-br from-primary-100 to-primary-50 dark:from-primary-900/50 dark:to-primary-900/30 rounded-xl sm:rounded-2xl flex items-center justify-center mb-2 sm:mb-3 group-hover:scale-110 transition-transform shadow-md sm:shadow-lg shadow-primary-500/10"${_scopeId}>`);
            _push2(ssrRenderComponent(_component_UIcon, {
              name: "i-lucide-shield-check",
              class: "w-5 h-5 sm:w-7 sm:h-7 text-primary-600 dark:text-primary-400"
            }, null, _parent2, _scopeId));
            _push2(`</div><span class="font-bold text-gray-900 dark:text-white text-[10px] sm:text-sm"${_scopeId}> Original </span><span class="text-[9px] sm:text-xs text-gray-500 dark:text-gray-400 hidden sm:block"${_scopeId}> Garansi Resmi </span></div><div class="flex flex-col items-center text-center group"${_scopeId}><div class="w-10 h-10 sm:w-14 sm:h-14 bg-linear-to-br from-secondary-100 to-secondary-50 dark:from-secondary-900/50 dark:to-secondary-900/30 rounded-xl sm:rounded-2xl flex items-center justify-center mb-2 sm:mb-3 group-hover:scale-110 transition-transform shadow-md sm:shadow-lg shadow-secondary-500/10"${_scopeId}>`);
            _push2(ssrRenderComponent(_component_UIcon, {
              name: "i-lucide-truck",
              class: "w-5 h-5 sm:w-7 sm:h-7 text-secondary-600 dark:text-secondary-400"
            }, null, _parent2, _scopeId));
            _push2(`</div><span class="font-bold text-gray-900 dark:text-white text-[10px] sm:text-sm"${_scopeId}> Free Ongkir </span><span class="text-[9px] sm:text-xs text-gray-500 dark:text-gray-400 hidden sm:block"${_scopeId}> Min. 100K </span></div><div class="flex flex-col items-center text-center group"${_scopeId}><div class="w-10 h-10 sm:w-14 sm:h-14 bg-linear-to-br from-pink-100 to-pink-50 dark:from-pink-900/50 dark:to-pink-900/30 rounded-xl sm:rounded-2xl flex items-center justify-center mb-2 sm:mb-3 group-hover:scale-110 transition-transform shadow-md sm:shadow-lg shadow-pink-500/10"${_scopeId}>`);
            _push2(ssrRenderComponent(_component_UIcon, {
              name: "i-lucide-refresh-cw",
              class: "w-5 h-5 sm:w-7 sm:h-7 text-pink-600 dark:text-pink-400"
            }, null, _parent2, _scopeId));
            _push2(`</div><span class="font-bold text-gray-900 dark:text-white text-[10px] sm:text-sm"${_scopeId}> Return </span><span class="text-[9px] sm:text-xs text-gray-500 dark:text-gray-400 hidden sm:block"${_scopeId}> 7 Hari </span></div><div class="flex flex-col items-center text-center group"${_scopeId}><div class="w-10 h-10 sm:w-14 sm:h-14 bg-linear-to-br from-blue-100 to-blue-50 dark:from-blue-900/50 dark:to-blue-900/30 rounded-xl sm:rounded-2xl flex items-center justify-center mb-2 sm:mb-3 group-hover:scale-110 transition-transform shadow-md sm:shadow-lg shadow-blue-500/10"${_scopeId}>`);
            _push2(ssrRenderComponent(_component_UIcon, {
              name: "i-lucide-headphones",
              class: "w-5 h-5 sm:w-7 sm:h-7 text-blue-600 dark:text-blue-400"
            }, null, _parent2, _scopeId));
            _push2(`</div><span class="font-bold text-gray-900 dark:text-white text-[10px] sm:text-sm"${_scopeId}> Support </span><span class="text-[9px] sm:text-xs text-gray-500 dark:text-gray-400 hidden sm:block"${_scopeId}> 24/7 </span></div></div></div>`);
          } else {
            return [
              createCommentVNode(" Section Header "),
              createVNode("div", { class: "flex flex-col md:flex-row items-center justify-between mb-12 lg:mb-16 scroll-reveal" }, [
                createVNode("div", { class: "text-center md:text-left mb-6 md:mb-0" }, [
                  createCommentVNode(" Section Badge "),
                  createVNode("div", { class: "inline-flex items-center gap-2 px-4 py-2 bg-primary-100 dark:bg-primary-900/30 rounded-full mb-4" }, [
                    createVNode("div", { class: "w-2 h-2 bg-primary-500 rounded-full animate-pulse" }),
                    createVNode("span", { class: "text-sm font-semibold text-primary-700 dark:text-primary-300" }, " Trending Now ")
                  ]),
                  createVNode("h2", { class: "text-3xl lg:text-5xl font-black text-gray-900 dark:text-white mb-3" }, [
                    createTextVNode(
                      toDisplayString(__props.title.split(" ")[0]) + " ",
                      1
                      /* TEXT */
                    ),
                    createVNode(
                      "span",
                      { class: "bg-linear-to-r from-primary-600 via-secondary-500 to-pink-500 text-transparent bg-clip-text" },
                      toDisplayString(__props.title.split(" ").slice(1).join(" ")),
                      1
                      /* TEXT */
                    )
                  ]),
                  createVNode(
                    "p",
                    { class: "text-gray-600 dark:text-gray-400 text-lg max-w-md" },
                    toDisplayString(__props.subtitle),
                    1
                    /* TEXT */
                  )
                ]),
                createVNode(_component_UButton, {
                  to: "/collections",
                  variant: "soft",
                  size: "lg",
                  class: "hidden md:flex group hover:scale-105 transition-all shadow-lg hover:shadow-xl"
                }, {
                  default: withCtx(() => [
                    createVNode("span", null, "Lihat Semua"),
                    createVNode(_component_UIcon, {
                      name: "i-lucide-arrow-right",
                      class: "w-4 h-4 group-hover:translate-x-1 transition-transform"
                    })
                  ]),
                  _: 1
                  /* STABLE */
                })
              ]),
              createCommentVNode(" Products Grid "),
              createVNode("div", { class: "grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6" }, [
                (openBlock(true), createBlock(
                  Fragment,
                  null,
                  renderList(__props.products, (product, index) => {
                    return openBlock(), createBlock(_sfc_main$e, {
                      key: product.id,
                      product,
                      class: ["scroll-reveal", `scroll-reveal-delay-${index % 4 + 1}`],
                      onAddToCart: ($event) => emit("addToCart", product),
                      onAddToWishlist: ($event) => emit("addToWishlist", product)
                    }, null, 8, ["product", "class", "onAddToCart", "onAddToWishlist"]);
                  }),
                  128
                  /* KEYED_FRAGMENT */
                ))
              ]),
              createCommentVNode(" Mobile View All Button "),
              createVNode("div", { class: "text-center mt-10 md:hidden scroll-reveal" }, [
                createVNode(_component_UButton, {
                  to: "/collections",
                  block: "",
                  size: "lg",
                  class: "shadow-xl shadow-primary-500/20 font-bold"
                }, {
                  default: withCtx(() => [
                    createVNode("span", null, "Lihat Semua Produk"),
                    createVNode(_component_UIcon, {
                      name: "i-lucide-arrow-right",
                      class: "w-4 h-4"
                    })
                  ]),
                  _: 1
                  /* STABLE */
                })
              ]),
              createCommentVNode(" Trust Indicators "),
              createVNode("div", { class: "mt-10 sm:mt-16 pt-8 sm:pt-10 border-t border-gray-200 dark:border-gray-800 scroll-reveal" }, [
                createVNode("div", { class: "grid grid-cols-4 gap-2 sm:gap-6 lg:gap-8" }, [
                  createVNode("div", { class: "flex flex-col items-center text-center group" }, [
                    createVNode("div", { class: "w-10 h-10 sm:w-14 sm:h-14 bg-linear-to-br from-primary-100 to-primary-50 dark:from-primary-900/50 dark:to-primary-900/30 rounded-xl sm:rounded-2xl flex items-center justify-center mb-2 sm:mb-3 group-hover:scale-110 transition-transform shadow-md sm:shadow-lg shadow-primary-500/10" }, [
                      createVNode(_component_UIcon, {
                        name: "i-lucide-shield-check",
                        class: "w-5 h-5 sm:w-7 sm:h-7 text-primary-600 dark:text-primary-400"
                      })
                    ]),
                    createVNode("span", { class: "font-bold text-gray-900 dark:text-white text-[10px] sm:text-sm" }, " Original "),
                    createVNode("span", { class: "text-[9px] sm:text-xs text-gray-500 dark:text-gray-400 hidden sm:block" }, " Garansi Resmi ")
                  ]),
                  createVNode("div", { class: "flex flex-col items-center text-center group" }, [
                    createVNode("div", { class: "w-10 h-10 sm:w-14 sm:h-14 bg-linear-to-br from-secondary-100 to-secondary-50 dark:from-secondary-900/50 dark:to-secondary-900/30 rounded-xl sm:rounded-2xl flex items-center justify-center mb-2 sm:mb-3 group-hover:scale-110 transition-transform shadow-md sm:shadow-lg shadow-secondary-500/10" }, [
                      createVNode(_component_UIcon, {
                        name: "i-lucide-truck",
                        class: "w-5 h-5 sm:w-7 sm:h-7 text-secondary-600 dark:text-secondary-400"
                      })
                    ]),
                    createVNode("span", { class: "font-bold text-gray-900 dark:text-white text-[10px] sm:text-sm" }, " Free Ongkir "),
                    createVNode("span", { class: "text-[9px] sm:text-xs text-gray-500 dark:text-gray-400 hidden sm:block" }, " Min. 100K ")
                  ]),
                  createVNode("div", { class: "flex flex-col items-center text-center group" }, [
                    createVNode("div", { class: "w-10 h-10 sm:w-14 sm:h-14 bg-linear-to-br from-pink-100 to-pink-50 dark:from-pink-900/50 dark:to-pink-900/30 rounded-xl sm:rounded-2xl flex items-center justify-center mb-2 sm:mb-3 group-hover:scale-110 transition-transform shadow-md sm:shadow-lg shadow-pink-500/10" }, [
                      createVNode(_component_UIcon, {
                        name: "i-lucide-refresh-cw",
                        class: "w-5 h-5 sm:w-7 sm:h-7 text-pink-600 dark:text-pink-400"
                      })
                    ]),
                    createVNode("span", { class: "font-bold text-gray-900 dark:text-white text-[10px] sm:text-sm" }, " Return "),
                    createVNode("span", { class: "text-[9px] sm:text-xs text-gray-500 dark:text-gray-400 hidden sm:block" }, " 7 Hari ")
                  ]),
                  createVNode("div", { class: "flex flex-col items-center text-center group" }, [
                    createVNode("div", { class: "w-10 h-10 sm:w-14 sm:h-14 bg-linear-to-br from-blue-100 to-blue-50 dark:from-blue-900/50 dark:to-blue-900/30 rounded-xl sm:rounded-2xl flex items-center justify-center mb-2 sm:mb-3 group-hover:scale-110 transition-transform shadow-md sm:shadow-lg shadow-blue-500/10" }, [
                      createVNode(_component_UIcon, {
                        name: "i-lucide-headphones",
                        class: "w-5 h-5 sm:w-7 sm:h-7 text-blue-600 dark:text-blue-400"
                      })
                    ]),
                    createVNode("span", { class: "font-bold text-gray-900 dark:text-white text-[10px] sm:text-sm" }, " Support "),
                    createVNode("span", { class: "text-[9px] sm:text-xs text-gray-500 dark:text-gray-400 hidden sm:block" }, " 24/7 ")
                  ])
                ])
              ])
            ];
          }
        }),
        _: 1
        /* STABLE */
      }, _parent));
      _push(`</section>`);
    };
  }
});

const _sfc_setup$8 = _sfc_main$8.setup;
_sfc_main$8.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("inertia/components/home/HomeFeaturedProducts.vue");
  return _sfc_setup$8 ? _sfc_setup$8(props, ctx) : void 0;
};

const _sfc_main$7 = /* @__PURE__ */ defineComponent({
  __name: "HomeBenefits",
  __ssrInlineRender: true,
  props: {
    benefits: {}
  },
  setup(__props) {
    const counters = ref({
      products: 0,
      customers: 0,
      rating: 0,
      brands: 0
    });
    const targetValues = {
      products: 15e3,
      customers: 5e4,
      rating: 4.9,
      brands: 200
    };
    const animateCounters = () => {
      const duration = 2e3;
      const steps = 60;
      const interval = duration / steps;
      let step = 0;
      const timer = setInterval(() => {
        step++;
        const progress = step / steps;
        counters.value.products = Math.floor(targetValues.products * progress);
        counters.value.customers = Math.floor(targetValues.customers * progress);
        counters.value.rating = Math.round(targetValues.rating * progress * 10) / 10;
        counters.value.brands = Math.floor(targetValues.brands * progress);
        if (step >= steps) {
          clearInterval(timer);
          counters.value.products = targetValues.products;
          counters.value.customers = targetValues.customers;
          counters.value.rating = targetValues.rating;
          counters.value.brands = targetValues.brands;
        }
      }, interval);
    };
    onMounted(() => {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              animateCounters();
              observer.disconnect();
            }
          });
        },
        { threshold: 0.3 }
      );
      const statsSection = document.querySelector(".stats-section");
      if (statsSection) observer.observe(statsSection);
    });
    const cardColors = [
      { from: "from-violet-500", to: "to-purple-600", glow: "violet" },
      { from: "from-cyan-500", to: "to-blue-600", glow: "cyan" },
      { from: "from-pink-500", to: "to-rose-600", glow: "pink" },
      { from: "from-amber-500", to: "to-orange-600", glow: "amber" }
    ];
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UContainer = _sfc_main$b;
      const _component_UIcon = _sfc_main$d;
      const _component_UButton = _sfc_main$c;
      _push(`<section${ssrRenderAttrs(mergeProps({ class: "py-20 lg:py-32 relative overflow-hidden" }, _attrs))} data-v-4c72f544>`);
      _push(ssrRenderComponent(_component_UContainer, { class: "relative z-10" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<!-- Section Header --><div class="text-center mb-16 lg:mb-20 scroll-reveal" data-v-4c72f544${_scopeId}><!-- Animated Badge --><div class="inline-flex items-center gap-2 px-5 py-2.5 bg-white/80 dark:bg-white/10 backdrop-blur-xl border border-gray-200/50 dark:border-white/20 rounded-full mb-8 shadow-lg shadow-gray-200/30 dark:shadow-none animate-bounce-subtle" data-v-4c72f544${_scopeId}><div class="relative" data-v-4c72f544${_scopeId}>`);
            _push2(ssrRenderComponent(_component_UIcon, {
              name: "i-lucide-zap",
              class: "w-5 h-5 text-amber-500"
            }, null, _parent2, _scopeId));
            _push2(`<div class="absolute inset-0 animate-ping" data-v-4c72f544${_scopeId}>`);
            _push2(ssrRenderComponent(_component_UIcon, {
              name: "i-lucide-zap",
              class: "w-5 h-5 text-amber-500 opacity-50"
            }, null, _parent2, _scopeId));
            _push2(`</div></div><span class="text-sm font-semibold bg-linear-to-r from-violet-600 to-cyan-600 dark:from-violet-400 dark:to-cyan-400 text-transparent bg-clip-text" data-v-4c72f544${_scopeId}> #1 Vape Store Indonesia </span></div><h2 class="text-4xl lg:text-6xl font-black text-gray-900 dark:text-white mb-6 leading-tight" data-v-4c72f544${_scopeId}> Kenapa Harus Pilih <br class="hidden sm:block" data-v-4c72f544${_scopeId}><span class="relative inline-block mt-2" data-v-4c72f544${_scopeId}><span class="relative z-10 bg-linear-to-r from-violet-600 via-primary-600 to-cyan-600 dark:from-violet-400 dark:via-primary-400 dark:to-cyan-400 text-transparent bg-clip-text animate-gradient-x" data-v-4c72f544${_scopeId}> ogitu.com </span><svg class="absolute -bottom-2 left-0 w-full h-3 text-primary-500/30" viewBox="0 0 200 8" preserveAspectRatio="none" data-v-4c72f544${_scopeId}><path d="M0,5 Q50,0 100,5 T200,5" stroke="currentColor" stroke-width="3" fill="none" class="animate-draw-line" data-v-4c72f544${_scopeId}></path></svg></span> ? </h2><p class="text-gray-600 dark:text-gray-400 text-lg lg:text-xl max-w-3xl mx-auto leading-relaxed" data-v-4c72f544${_scopeId}> Pengalaman belanja vape premium dengan <span class="text-primary-600 dark:text-primary-400 font-semibold" data-v-4c72f544${_scopeId}>produk 100% original</span>, harga terbaik, dan layanan pelanggan yang siap membantu 24/7 </p></div><!-- Benefits Grid - Bento Style --><div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6" data-v-4c72f544${_scopeId}><!--[-->`);
            ssrRenderList(__props.benefits, (benefit, index) => {
              _push2(`<div class="${ssrRenderClass([
                "scroll-reveal",
                `scroll-reveal-delay-${index % 4 + 1}`,
                "group relative rounded-3xl p-6 lg:p-8 overflow-hidden cursor-pointer",
                "bg-white/70 dark:bg-gray-800/50 backdrop-blur-xl",
                "border border-gray-200/50 dark:border-gray-700/50",
                "hover:border-transparent",
                "transition-all duration-700 ease-out",
                "shadow-xl shadow-gray-200/40 dark:shadow-gray-900/20",
                "hover:shadow-2xl",
                "sm:hover:-translate-y-3 sm:hover:scale-[1.02]",
                "active:scale-[0.98]"
              ])}" data-v-4c72f544${_scopeId}><!-- Animated Gradient Border on Hover --><div class="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10" data-v-4c72f544${_scopeId}><div class="${ssrRenderClass([
                "absolute -inset-0.5 rounded-3xl bg-linear-to-r",
                cardColors[index % 4].from,
                cardColors[index % 4].to,
                "animate-gradient-xy"
              ])}" data-v-4c72f544${_scopeId}></div><div class="absolute inset-px rounded-3xl bg-white dark:bg-gray-900" data-v-4c72f544${_scopeId}></div></div><!-- Glow Effect --><div class="${ssrRenderClass([
                "absolute -inset-20 opacity-0 group-hover:opacity-100 transition-opacity duration-700 blur-3xl -z-20",
                `bg-${cardColors[index % 4].glow}-500/20 dark:bg-${cardColors[index % 4].glow}-500/10`
              ])}" data-v-4c72f544${_scopeId}></div><!-- Content --><div class="relative z-10" data-v-4c72f544${_scopeId}><!-- Icon with 3D Effect --><div class="relative w-16 h-16 lg:w-20 lg:h-20 mb-6 perspective-1000" data-v-4c72f544${_scopeId}><!-- Shadow --><div class="${ssrRenderClass([
                "absolute inset-0 rounded-2xl bg-linear-to-br",
                cardColors[index % 4].from,
                cardColors[index % 4].to,
                "blur-xl opacity-40 group-hover:opacity-60 transition-opacity duration-500 translate-y-2"
              ])}" data-v-4c72f544${_scopeId}></div><!-- Icon Container --><div class="${ssrRenderClass([
                "relative w-full h-full rounded-2xl bg-linear-to-br flex items-center justify-center",
                cardColors[index % 4].from,
                cardColors[index % 4].to,
                "shadow-lg group-hover:shadow-2xl transition-all duration-500",
                "group-hover:scale-110 group-hover:-rotate-6",
                "transform-gpu preserve-3d"
              ])}" data-v-4c72f544${_scopeId}>`);
              _push2(ssrRenderComponent(_component_UIcon, {
                name: benefit.icon,
                class: "w-8 h-8 lg:w-10 lg:h-10 text-white drop-shadow-lg"
              }, null, _parent2, _scopeId));
              _push2(`<!-- Shine Effect --><div class="absolute inset-0 rounded-2xl bg-linear-to-br from-white/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" data-v-4c72f544${_scopeId}></div></div><!-- Floating Particles --><div class="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-white shadow-lg opacity-0 group-hover:opacity-100 group-hover:animate-bounce transition-opacity" data-v-4c72f544${_scopeId}></div><div class="absolute -bottom-1 -left-1 w-2 h-2 rounded-full bg-white/80 shadow-lg opacity-0 group-hover:opacity-100 group-hover:animate-bounce animation-delay-100 transition-opacity" data-v-4c72f544${_scopeId}></div></div><!-- Title with Gradient on Hover --><h3 class="${ssrRenderClass([
                "text-xl lg:text-2xl font-bold mb-3 transition-all duration-500",
                "text-gray-900 dark:text-white",
                "group-hover:bg-linear-to-r group-hover:text-transparent group-hover:bg-clip-text",
                `group-hover:${cardColors[index % 4].from} group-hover:${cardColors[index % 4].to}`
              ])}" data-v-4c72f544${_scopeId}>${ssrInterpolate(benefit.title)}</h3><!-- Description --><p class="text-gray-600 dark:text-gray-400 leading-relaxed group-hover:text-gray-700 dark:group-hover:text-gray-300 transition-colors duration-500" data-v-4c72f544${_scopeId}>${ssrInterpolate(benefit.description)}</p><!-- Learn More Link --><div class="mt-5 flex items-center gap-2 text-sm font-semibold opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-500" data-v-4c72f544${_scopeId}><span class="${ssrRenderClass([
                "bg-linear-to-r text-transparent bg-clip-text",
                cardColors[index % 4].from,
                cardColors[index % 4].to
              ])}" data-v-4c72f544${_scopeId}> Pelajari lebih lanjut </span>`);
              _push2(ssrRenderComponent(_component_UIcon, {
                name: "i-lucide-arrow-right",
                class: [
                  "w-4 h-4 group-hover:translate-x-1 transition-transform",
                  cardColors[index % 4].from.replace("from-", "text-")
                ]
              }, null, _parent2, _scopeId));
              _push2(`</div></div></div>`);
            });
            _push2(`<!--]--></div><!-- Stats Section - Glassmorphism Style --><div class="stats-section mt-20 lg:mt-28 scroll-reveal" data-v-4c72f544${_scopeId}><div class="relative rounded-3xl overflow-hidden" data-v-4c72f544${_scopeId}><!-- Background --><div class="absolute inset-0 bg-linear-to-r from-violet-600 via-primary-600 to-cyan-600" data-v-4c72f544${_scopeId}></div><div class="absolute inset-0 bg-[url(&#39;data:image/svg+xml,%3Csvg width=\\&#39;60\\&#39; height=\\&#39;60\\&#39; viewBox=\\&#39;0 0 60 60\\&#39; xmlns=\\&#39;http://www.w3.org/2000/svg\\&#39;%3E%3Cg fill=\\&#39;none\\&#39; fill-rule=\\&#39;evenodd\\&#39;%3E%3Cg fill=\\&#39;%23ffffff\\&#39; fill-opacity=\\&#39;0.05\\&#39;%3E%3Cpath d=\\&#39;M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\\&#39;/%3E%3C/g%3E%3C/g%3E%3C/svg%3E&#39;)]" data-v-4c72f544${_scopeId}></div><!-- Content --><div class="relative px-6 py-12 lg:px-12 lg:py-16" data-v-4c72f544${_scopeId}><!-- Header --><div class="text-center mb-10 lg:mb-12" data-v-4c72f544${_scopeId}><h3 class="text-2xl lg:text-3xl font-bold text-white mb-2" data-v-4c72f544${_scopeId}> Dipercaya Ribuan Vapers Indonesia </h3><p class="text-white/70" data-v-4c72f544${_scopeId}> Bergabunglah dengan komunitas vaping terbesar di Indonesia </p></div><!-- Stats Grid --><div class="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8" data-v-4c72f544${_scopeId}><!-- Products --><div class="group text-center" data-v-4c72f544${_scopeId}><div class="relative inline-block" data-v-4c72f544${_scopeId}><div class="text-4xl sm:text-5xl lg:text-6xl font-black text-white mb-2 tabular-nums" data-v-4c72f544${_scopeId}>${ssrInterpolate(counters.value.products >= 1e3 ? `${(counters.value.products / 1e3).toFixed(counters.value.products >= targetValues.products ? 0 : 1)}K` : counters.value.products)}+ </div><div class="absolute -inset-4 bg-white/10 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity" data-v-4c72f544${_scopeId}></div></div><div class="flex items-center justify-center gap-2 text-white/80" data-v-4c72f544${_scopeId}>`);
            _push2(ssrRenderComponent(_component_UIcon, {
              name: "i-lucide-package",
              class: "w-4 h-4"
            }, null, _parent2, _scopeId));
            _push2(`<span class="text-sm font-medium" data-v-4c72f544${_scopeId}>Produk Tersedia</span></div></div><!-- Customers --><div class="group text-center" data-v-4c72f544${_scopeId}><div class="relative inline-block" data-v-4c72f544${_scopeId}><div class="text-4xl sm:text-5xl lg:text-6xl font-black text-white mb-2 tabular-nums" data-v-4c72f544${_scopeId}>${ssrInterpolate(counters.value.customers >= 1e3 ? `${(counters.value.customers / 1e3).toFixed(counters.value.customers >= targetValues.customers ? 0 : 1)}K` : counters.value.customers)}+ </div><div class="absolute -inset-4 bg-white/10 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity" data-v-4c72f544${_scopeId}></div></div><div class="flex items-center justify-center gap-2 text-white/80" data-v-4c72f544${_scopeId}>`);
            _push2(ssrRenderComponent(_component_UIcon, {
              name: "i-lucide-users",
              class: "w-4 h-4"
            }, null, _parent2, _scopeId));
            _push2(`<span class="text-sm font-medium" data-v-4c72f544${_scopeId}>Happy Customers</span></div></div><!-- Rating --><div class="group text-center" data-v-4c72f544${_scopeId}><div class="relative inline-block" data-v-4c72f544${_scopeId}><div class="text-4xl sm:text-5xl lg:text-6xl font-black text-white mb-2 tabular-nums" data-v-4c72f544${_scopeId}>${ssrInterpolate(counters.value.rating.toFixed(1))}</div><div class="absolute -inset-4 bg-white/10 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity" data-v-4c72f544${_scopeId}></div></div><div class="flex items-center justify-center gap-2 text-white/80" data-v-4c72f544${_scopeId}><div class="flex items-center gap-0.5" data-v-4c72f544${_scopeId}><!--[-->`);
            ssrRenderList(5, (i) => {
              _push2(ssrRenderComponent(_component_UIcon, {
                key: i,
                name: "i-lucide-star",
                class: "w-3.5 h-3.5 text-amber-400 fill-amber-400"
              }, null, _parent2, _scopeId));
            });
            _push2(`<!--]--></div><span class="text-sm font-medium" data-v-4c72f544${_scopeId}>Rating</span></div></div><!-- Brands --><div class="group text-center" data-v-4c72f544${_scopeId}><div class="relative inline-block" data-v-4c72f544${_scopeId}><div class="text-4xl sm:text-5xl lg:text-6xl font-black text-white mb-2 tabular-nums" data-v-4c72f544${_scopeId}>${ssrInterpolate(counters.value.brands)}+ </div><div class="absolute -inset-4 bg-white/10 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity" data-v-4c72f544${_scopeId}></div></div><div class="flex items-center justify-center gap-2 text-white/80" data-v-4c72f544${_scopeId}>`);
            _push2(ssrRenderComponent(_component_UIcon, {
              name: "i-lucide-award",
              class: "w-4 h-4"
            }, null, _parent2, _scopeId));
            _push2(`<span class="text-sm font-medium" data-v-4c72f544${_scopeId}>Brand Premium</span></div></div></div><!-- CTA --><div class="mt-10 lg:mt-12 text-center" data-v-4c72f544${_scopeId}>`);
            _push2(ssrRenderComponent(_component_UButton, {
              to: "/collections",
              size: "xl",
              class: "bg-white text-primary-600 hover:bg-gray-100 shadow-xl shadow-black/20 font-bold px-8"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_UIcon, {
                    name: "i-lucide-shopping-bag",
                    class: "w-5 h-5 mr-2"
                  }, null, _parent3, _scopeId2));
                  _push3(` Mulai Belanja Sekarang `);
                  _push3(ssrRenderComponent(_component_UIcon, {
                    name: "i-lucide-arrow-right",
                    class: "w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform"
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_UIcon, {
                      name: "i-lucide-shopping-bag",
                      class: "w-5 h-5 mr-2"
                    }),
                    createTextVNode(" Mulai Belanja Sekarang "),
                    createVNode(_component_UIcon, {
                      name: "i-lucide-arrow-right",
                      class: "w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform"
                    })
                  ];
                }
              }),
              _: 1
              /* STABLE */
            }, _parent2, _scopeId));
            _push2(`</div></div></div></div><!-- Trust Badges --><div class="mt-12 lg:mt-16 scroll-reveal" data-v-4c72f544${_scopeId}><div class="flex flex-wrap items-center justify-center gap-6 lg:gap-10" data-v-4c72f544${_scopeId}><div class="flex items-center gap-2 text-gray-500 dark:text-gray-400" data-v-4c72f544${_scopeId}>`);
            _push2(ssrRenderComponent(_component_UIcon, {
              name: "i-lucide-shield-check",
              class: "w-5 h-5 text-emerald-500"
            }, null, _parent2, _scopeId));
            _push2(`<span class="text-sm font-medium" data-v-4c72f544${_scopeId}>100% Original</span></div><div class="flex items-center gap-2 text-gray-500 dark:text-gray-400" data-v-4c72f544${_scopeId}>`);
            _push2(ssrRenderComponent(_component_UIcon, {
              name: "i-lucide-truck",
              class: "w-5 h-5 text-blue-500"
            }, null, _parent2, _scopeId));
            _push2(`<span class="text-sm font-medium" data-v-4c72f544${_scopeId}>Free Shipping*</span></div><div class="flex items-center gap-2 text-gray-500 dark:text-gray-400" data-v-4c72f544${_scopeId}>`);
            _push2(ssrRenderComponent(_component_UIcon, {
              name: "i-lucide-refresh-cw",
              class: "w-5 h-5 text-amber-500"
            }, null, _parent2, _scopeId));
            _push2(`<span class="text-sm font-medium" data-v-4c72f544${_scopeId}>Easy Return</span></div><div class="flex items-center gap-2 text-gray-500 dark:text-gray-400" data-v-4c72f544${_scopeId}>`);
            _push2(ssrRenderComponent(_component_UIcon, {
              name: "i-lucide-headphones",
              class: "w-5 h-5 text-purple-500"
            }, null, _parent2, _scopeId));
            _push2(`<span class="text-sm font-medium" data-v-4c72f544${_scopeId}>24/7 Support</span></div></div></div>`);
          } else {
            return [
              createCommentVNode(" Section Header "),
              createVNode("div", { class: "text-center mb-16 lg:mb-20 scroll-reveal" }, [
                createCommentVNode(" Animated Badge "),
                createVNode("div", { class: "inline-flex items-center gap-2 px-5 py-2.5 bg-white/80 dark:bg-white/10 backdrop-blur-xl border border-gray-200/50 dark:border-white/20 rounded-full mb-8 shadow-lg shadow-gray-200/30 dark:shadow-none animate-bounce-subtle" }, [
                  createVNode("div", { class: "relative" }, [
                    createVNode(_component_UIcon, {
                      name: "i-lucide-zap",
                      class: "w-5 h-5 text-amber-500"
                    }),
                    createVNode("div", { class: "absolute inset-0 animate-ping" }, [
                      createVNode(_component_UIcon, {
                        name: "i-lucide-zap",
                        class: "w-5 h-5 text-amber-500 opacity-50"
                      })
                    ])
                  ]),
                  createVNode("span", { class: "text-sm font-semibold bg-linear-to-r from-violet-600 to-cyan-600 dark:from-violet-400 dark:to-cyan-400 text-transparent bg-clip-text" }, " #1 Vape Store Indonesia ")
                ]),
                createVNode("h2", { class: "text-4xl lg:text-6xl font-black text-gray-900 dark:text-white mb-6 leading-tight" }, [
                  createTextVNode(" Kenapa Harus Pilih "),
                  createVNode("br", { class: "hidden sm:block" }),
                  createVNode("span", { class: "relative inline-block mt-2" }, [
                    createVNode("span", { class: "relative z-10 bg-linear-to-r from-violet-600 via-primary-600 to-cyan-600 dark:from-violet-400 dark:via-primary-400 dark:to-cyan-400 text-transparent bg-clip-text animate-gradient-x" }, " ogitu.com "),
                    (openBlock(), createBlock("svg", {
                      class: "absolute -bottom-2 left-0 w-full h-3 text-primary-500/30",
                      viewBox: "0 0 200 8",
                      preserveAspectRatio: "none"
                    }, [
                      createVNode("path", {
                        d: "M0,5 Q50,0 100,5 T200,5",
                        stroke: "currentColor",
                        "stroke-width": "3",
                        fill: "none",
                        class: "animate-draw-line"
                      })
                    ]))
                  ]),
                  createTextVNode(" ? ")
                ]),
                createVNode("p", { class: "text-gray-600 dark:text-gray-400 text-lg lg:text-xl max-w-3xl mx-auto leading-relaxed" }, [
                  createTextVNode(" Pengalaman belanja vape premium dengan "),
                  createVNode("span", { class: "text-primary-600 dark:text-primary-400 font-semibold" }, "produk 100% original"),
                  createTextVNode(", harga terbaik, dan layanan pelanggan yang siap membantu 24/7 ")
                ])
              ]),
              createCommentVNode(" Benefits Grid - Bento Style "),
              createVNode("div", { class: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6" }, [
                (openBlock(true), createBlock(
                  Fragment,
                  null,
                  renderList(__props.benefits, (benefit, index) => {
                    return openBlock(), createBlock(
                      "div",
                      {
                        key: benefit.title,
                        class: [
                          "scroll-reveal",
                          `scroll-reveal-delay-${index % 4 + 1}`,
                          "group relative rounded-3xl p-6 lg:p-8 overflow-hidden cursor-pointer",
                          "bg-white/70 dark:bg-gray-800/50 backdrop-blur-xl",
                          "border border-gray-200/50 dark:border-gray-700/50",
                          "hover:border-transparent",
                          "transition-all duration-700 ease-out",
                          "shadow-xl shadow-gray-200/40 dark:shadow-gray-900/20",
                          "hover:shadow-2xl",
                          "sm:hover:-translate-y-3 sm:hover:scale-[1.02]",
                          "active:scale-[0.98]"
                        ]
                      },
                      [
                        createCommentVNode(" Animated Gradient Border on Hover "),
                        createVNode("div", { class: "absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10" }, [
                          createVNode(
                            "div",
                            {
                              class: [
                                "absolute -inset-0.5 rounded-3xl bg-linear-to-r",
                                cardColors[index % 4].from,
                                cardColors[index % 4].to,
                                "animate-gradient-xy"
                              ]
                            },
                            null,
                            2
                            /* CLASS */
                          ),
                          createVNode("div", { class: "absolute inset-px rounded-3xl bg-white dark:bg-gray-900" })
                        ]),
                        createCommentVNode(" Glow Effect "),
                        createVNode(
                          "div",
                          {
                            class: [
                              "absolute -inset-20 opacity-0 group-hover:opacity-100 transition-opacity duration-700 blur-3xl -z-20",
                              `bg-${cardColors[index % 4].glow}-500/20 dark:bg-${cardColors[index % 4].glow}-500/10`
                            ]
                          },
                          null,
                          2
                          /* CLASS */
                        ),
                        createCommentVNode(" Content "),
                        createVNode("div", { class: "relative z-10" }, [
                          createCommentVNode(" Icon with 3D Effect "),
                          createVNode("div", { class: "relative w-16 h-16 lg:w-20 lg:h-20 mb-6 perspective-1000" }, [
                            createCommentVNode(" Shadow "),
                            createVNode(
                              "div",
                              {
                                class: [
                                  "absolute inset-0 rounded-2xl bg-linear-to-br",
                                  cardColors[index % 4].from,
                                  cardColors[index % 4].to,
                                  "blur-xl opacity-40 group-hover:opacity-60 transition-opacity duration-500 translate-y-2"
                                ]
                              },
                              null,
                              2
                              /* CLASS */
                            ),
                            createCommentVNode(" Icon Container "),
                            createVNode(
                              "div",
                              {
                                class: [
                                  "relative w-full h-full rounded-2xl bg-linear-to-br flex items-center justify-center",
                                  cardColors[index % 4].from,
                                  cardColors[index % 4].to,
                                  "shadow-lg group-hover:shadow-2xl transition-all duration-500",
                                  "group-hover:scale-110 group-hover:-rotate-6",
                                  "transform-gpu preserve-3d"
                                ]
                              },
                              [
                                createVNode(_component_UIcon, {
                                  name: benefit.icon,
                                  class: "w-8 h-8 lg:w-10 lg:h-10 text-white drop-shadow-lg"
                                }, null, 8, ["name"]),
                                createCommentVNode(" Shine Effect "),
                                createVNode("div", { class: "absolute inset-0 rounded-2xl bg-linear-to-br from-white/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" })
                              ],
                              2
                              /* CLASS */
                            ),
                            createCommentVNode(" Floating Particles "),
                            createVNode("div", { class: "absolute -top-1 -right-1 w-3 h-3 rounded-full bg-white shadow-lg opacity-0 group-hover:opacity-100 group-hover:animate-bounce transition-opacity" }),
                            createVNode("div", { class: "absolute -bottom-1 -left-1 w-2 h-2 rounded-full bg-white/80 shadow-lg opacity-0 group-hover:opacity-100 group-hover:animate-bounce animation-delay-100 transition-opacity" })
                          ]),
                          createCommentVNode(" Title with Gradient on Hover "),
                          createVNode(
                            "h3",
                            {
                              class: [
                                "text-xl lg:text-2xl font-bold mb-3 transition-all duration-500",
                                "text-gray-900 dark:text-white",
                                "group-hover:bg-linear-to-r group-hover:text-transparent group-hover:bg-clip-text",
                                `group-hover:${cardColors[index % 4].from} group-hover:${cardColors[index % 4].to}`
                              ]
                            },
                            toDisplayString(benefit.title),
                            3
                            /* TEXT, CLASS */
                          ),
                          createCommentVNode(" Description "),
                          createVNode(
                            "p",
                            { class: "text-gray-600 dark:text-gray-400 leading-relaxed group-hover:text-gray-700 dark:group-hover:text-gray-300 transition-colors duration-500" },
                            toDisplayString(benefit.description),
                            1
                            /* TEXT */
                          ),
                          createCommentVNode(" Learn More Link "),
                          createVNode("div", { class: "mt-5 flex items-center gap-2 text-sm font-semibold opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-500" }, [
                            createVNode(
                              "span",
                              {
                                class: [
                                  "bg-linear-to-r text-transparent bg-clip-text",
                                  cardColors[index % 4].from,
                                  cardColors[index % 4].to
                                ]
                              },
                              " Pelajari lebih lanjut ",
                              2
                              /* CLASS */
                            ),
                            createVNode(_component_UIcon, {
                              name: "i-lucide-arrow-right",
                              class: [
                                "w-4 h-4 group-hover:translate-x-1 transition-transform",
                                cardColors[index % 4].from.replace("from-", "text-")
                              ]
                            }, null, 8, ["class"])
                          ])
                        ])
                      ],
                      2
                      /* CLASS */
                    );
                  }),
                  128
                  /* KEYED_FRAGMENT */
                ))
              ]),
              createCommentVNode(" Stats Section - Glassmorphism Style "),
              createVNode("div", { class: "stats-section mt-20 lg:mt-28 scroll-reveal" }, [
                createVNode("div", { class: "relative rounded-3xl overflow-hidden" }, [
                  createCommentVNode(" Background "),
                  createVNode("div", { class: "absolute inset-0 bg-linear-to-r from-violet-600 via-primary-600 to-cyan-600" }),
                  createVNode("div", { class: "absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=\\'60\\' height=\\'60\\' viewBox=\\'0 0 60 60\\' xmlns=\\'http://www.w3.org/2000/svg\\'%3E%3Cg fill=\\'none\\' fill-rule=\\'evenodd\\'%3E%3Cg fill=\\'%23ffffff\\' fill-opacity=\\'0.05\\'%3E%3Cpath d=\\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')]" }),
                  createCommentVNode(" Content "),
                  createVNode("div", { class: "relative px-6 py-12 lg:px-12 lg:py-16" }, [
                    createCommentVNode(" Header "),
                    createVNode("div", { class: "text-center mb-10 lg:mb-12" }, [
                      createVNode("h3", { class: "text-2xl lg:text-3xl font-bold text-white mb-2" }, " Dipercaya Ribuan Vapers Indonesia "),
                      createVNode("p", { class: "text-white/70" }, " Bergabunglah dengan komunitas vaping terbesar di Indonesia ")
                    ]),
                    createCommentVNode(" Stats Grid "),
                    createVNode("div", { class: "grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8" }, [
                      createCommentVNode(" Products "),
                      createVNode("div", { class: "group text-center" }, [
                        createVNode("div", { class: "relative inline-block" }, [
                          createVNode(
                            "div",
                            { class: "text-4xl sm:text-5xl lg:text-6xl font-black text-white mb-2 tabular-nums" },
                            toDisplayString(counters.value.products >= 1e3 ? `${(counters.value.products / 1e3).toFixed(counters.value.products >= targetValues.products ? 0 : 1)}K` : counters.value.products) + "+ ",
                            1
                            /* TEXT */
                          ),
                          createVNode("div", { class: "absolute -inset-4 bg-white/10 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity" })
                        ]),
                        createVNode("div", { class: "flex items-center justify-center gap-2 text-white/80" }, [
                          createVNode(_component_UIcon, {
                            name: "i-lucide-package",
                            class: "w-4 h-4"
                          }),
                          createVNode("span", { class: "text-sm font-medium" }, "Produk Tersedia")
                        ])
                      ]),
                      createCommentVNode(" Customers "),
                      createVNode("div", { class: "group text-center" }, [
                        createVNode("div", { class: "relative inline-block" }, [
                          createVNode(
                            "div",
                            { class: "text-4xl sm:text-5xl lg:text-6xl font-black text-white mb-2 tabular-nums" },
                            toDisplayString(counters.value.customers >= 1e3 ? `${(counters.value.customers / 1e3).toFixed(counters.value.customers >= targetValues.customers ? 0 : 1)}K` : counters.value.customers) + "+ ",
                            1
                            /* TEXT */
                          ),
                          createVNode("div", { class: "absolute -inset-4 bg-white/10 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity" })
                        ]),
                        createVNode("div", { class: "flex items-center justify-center gap-2 text-white/80" }, [
                          createVNode(_component_UIcon, {
                            name: "i-lucide-users",
                            class: "w-4 h-4"
                          }),
                          createVNode("span", { class: "text-sm font-medium" }, "Happy Customers")
                        ])
                      ]),
                      createCommentVNode(" Rating "),
                      createVNode("div", { class: "group text-center" }, [
                        createVNode("div", { class: "relative inline-block" }, [
                          createVNode(
                            "div",
                            { class: "text-4xl sm:text-5xl lg:text-6xl font-black text-white mb-2 tabular-nums" },
                            toDisplayString(counters.value.rating.toFixed(1)),
                            1
                            /* TEXT */
                          ),
                          createVNode("div", { class: "absolute -inset-4 bg-white/10 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity" })
                        ]),
                        createVNode("div", { class: "flex items-center justify-center gap-2 text-white/80" }, [
                          createVNode("div", { class: "flex items-center gap-0.5" }, [
                            (openBlock(), createBlock(
                              Fragment,
                              null,
                              renderList(5, (i) => {
                                return createVNode(_component_UIcon, {
                                  key: i,
                                  name: "i-lucide-star",
                                  class: "w-3.5 h-3.5 text-amber-400 fill-amber-400"
                                });
                              }),
                              64
                              /* STABLE_FRAGMENT */
                            ))
                          ]),
                          createVNode("span", { class: "text-sm font-medium" }, "Rating")
                        ])
                      ]),
                      createCommentVNode(" Brands "),
                      createVNode("div", { class: "group text-center" }, [
                        createVNode("div", { class: "relative inline-block" }, [
                          createVNode(
                            "div",
                            { class: "text-4xl sm:text-5xl lg:text-6xl font-black text-white mb-2 tabular-nums" },
                            toDisplayString(counters.value.brands) + "+ ",
                            1
                            /* TEXT */
                          ),
                          createVNode("div", { class: "absolute -inset-4 bg-white/10 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity" })
                        ]),
                        createVNode("div", { class: "flex items-center justify-center gap-2 text-white/80" }, [
                          createVNode(_component_UIcon, {
                            name: "i-lucide-award",
                            class: "w-4 h-4"
                          }),
                          createVNode("span", { class: "text-sm font-medium" }, "Brand Premium")
                        ])
                      ])
                    ]),
                    createCommentVNode(" CTA "),
                    createVNode("div", { class: "mt-10 lg:mt-12 text-center" }, [
                      createVNode(_component_UButton, {
                        to: "/collections",
                        size: "xl",
                        class: "bg-white text-primary-600 hover:bg-gray-100 shadow-xl shadow-black/20 font-bold px-8"
                      }, {
                        default: withCtx(() => [
                          createVNode(_component_UIcon, {
                            name: "i-lucide-shopping-bag",
                            class: "w-5 h-5 mr-2"
                          }),
                          createTextVNode(" Mulai Belanja Sekarang "),
                          createVNode(_component_UIcon, {
                            name: "i-lucide-arrow-right",
                            class: "w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform"
                          })
                        ]),
                        _: 1
                        /* STABLE */
                      })
                    ])
                  ])
                ])
              ]),
              createCommentVNode(" Trust Badges "),
              createVNode("div", { class: "mt-12 lg:mt-16 scroll-reveal" }, [
                createVNode("div", { class: "flex flex-wrap items-center justify-center gap-6 lg:gap-10" }, [
                  createVNode("div", { class: "flex items-center gap-2 text-gray-500 dark:text-gray-400" }, [
                    createVNode(_component_UIcon, {
                      name: "i-lucide-shield-check",
                      class: "w-5 h-5 text-emerald-500"
                    }),
                    createVNode("span", { class: "text-sm font-medium" }, "100% Original")
                  ]),
                  createVNode("div", { class: "flex items-center gap-2 text-gray-500 dark:text-gray-400" }, [
                    createVNode(_component_UIcon, {
                      name: "i-lucide-truck",
                      class: "w-5 h-5 text-blue-500"
                    }),
                    createVNode("span", { class: "text-sm font-medium" }, "Free Shipping*")
                  ]),
                  createVNode("div", { class: "flex items-center gap-2 text-gray-500 dark:text-gray-400" }, [
                    createVNode(_component_UIcon, {
                      name: "i-lucide-refresh-cw",
                      class: "w-5 h-5 text-amber-500"
                    }),
                    createVNode("span", { class: "text-sm font-medium" }, "Easy Return")
                  ]),
                  createVNode("div", { class: "flex items-center gap-2 text-gray-500 dark:text-gray-400" }, [
                    createVNode(_component_UIcon, {
                      name: "i-lucide-headphones",
                      class: "w-5 h-5 text-purple-500"
                    }),
                    createVNode("span", { class: "text-sm font-medium" }, "24/7 Support")
                  ])
                ])
              ])
            ];
          }
        }),
        _: 1
        /* STABLE */
      }, _parent));
      _push(`</section>`);
    };
  }
});

/* unplugin-vue-components disabled */

const _sfc_setup$7 = _sfc_main$7.setup;
_sfc_main$7.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("inertia/components/home/HomeBenefits.vue");
  return _sfc_setup$7 ? _sfc_setup$7(props, ctx) : void 0;
};
const HomeBenefits = /* @__PURE__ */ _export_sfc(_sfc_main$7, [["__scopeId", "data-v-4c72f544"]]);

const _sfc_main$6 = /* @__PURE__ */ defineComponent({
  __name: "HomeBrands",
  __ssrInlineRender: true,
  props: {
    brands: {}
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UContainer = _sfc_main$b;
      const _component_UIcon = _sfc_main$d;
      const _component_UButton = _sfc_main$c;
      _push(`<section${ssrRenderAttrs(mergeProps({ class: "py-16 lg:py-24 relative overflow-hidden" }, _attrs))}>`);
      _push(ssrRenderComponent(_component_UContainer, { class: "relative z-10" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<!-- Section Header --><div class="text-center mb-12 lg:mb-16 scroll-reveal"${_scopeId}><!-- Badge --><div class="inline-flex items-center gap-2 px-4 py-2 bg-primary-100 dark:bg-white/10 backdrop-blur-md border border-primary-200 dark:border-white/20 rounded-full mb-6"${_scopeId}>`);
            _push2(ssrRenderComponent(_component_UIcon, {
              name: "i-lucide-award",
              class: "w-4 h-4 text-primary-600 dark:text-primary-400"
            }, null, _parent2, _scopeId));
            _push2(`<span class="text-sm font-medium text-primary-700 dark:text-white/80"${_scopeId}>Official Partners</span></div><h2 class="text-3xl lg:text-5xl font-black text-gray-900 dark:text-white mb-4"${_scopeId}> Brand <span class="bg-linear-to-r from-primary-600 via-secondary-600 to-pink-600 dark:from-primary-400 dark:via-secondary-400 dark:to-pink-400 text-transparent bg-clip-text"${_scopeId}>Ternama</span> yang Tersedia </h2><p class="text-gray-600 dark:text-gray-400 text-lg max-w-2xl mx-auto"${_scopeId}> Produk original dari brand vape terpercaya dunia dengan garansi resmi </p></div><!-- Brands Grid --><div class="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3 sm:gap-4"${_scopeId}><!--[-->`);
            ssrRenderList(__props.brands, (brand, index) => {
              _push2(`<div class="${ssrRenderClass([
                "scroll-reveal",
                `scroll-reveal-delay-${index % 8 + 1}`,
                "group relative aspect-square rounded-2xl overflow-hidden cursor-pointer",
                "bg-white dark:bg-white/5 backdrop-blur-xl",
                "border border-gray-200 dark:border-white/10",
                "hover:border-primary-400 dark:hover:border-primary-500/50",
                "shadow-md shadow-gray-200/50 dark:shadow-none",
                "hover:shadow-xl hover:shadow-primary-500/20",
                "transition-all duration-500 ease-out",
                "active:scale-95 sm:hover:-translate-y-2 sm:hover:scale-105"
              ])}"${_scopeId}><!-- Card Glow Effect --><div class="absolute inset-0 bg-linear-to-br from-primary-500/0 to-secondary-500/0 group-hover:from-primary-500/10 group-hover:to-secondary-500/10 transition-all duration-500"${_scopeId}></div><!-- Animated Border on Hover --><div class="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"${_scopeId}><div class="absolute -inset-px bg-linear-to-r from-primary-500 via-secondary-500 to-pink-500 rounded-2xl blur-sm animate-border-glow"${_scopeId}></div></div><!-- Content --><div class="relative z-10 w-full h-full flex flex-col items-center justify-center p-3"${_scopeId}><!-- Brand Icon/Logo Placeholder --><div class="w-10 h-10 sm:w-12 sm:h-12 mb-2 bg-linear-to-br from-primary-100 to-secondary-100 dark:from-primary-900/50 dark:to-secondary-900/50 rounded-xl flex items-center justify-center group-hover:scale-110 group-hover:rotate-6 transition-all duration-500"${_scopeId}>`);
              _push2(ssrRenderComponent(_component_UIcon, {
                name: "i-lucide-box",
                class: "w-5 h-5 sm:w-6 sm:h-6 text-primary-600 dark:text-primary-400"
              }, null, _parent2, _scopeId));
              _push2(`</div><!-- Brand Name --><span class="font-bold text-gray-800 dark:text-white text-xs sm:text-sm text-center group-hover:text-primary-600 dark:group-hover:text-primary-300 transition-colors"${_scopeId}>${ssrInterpolate(brand)}</span></div><!-- Particle on Hover --><div class="absolute top-2 right-2 w-2 h-2 bg-primary-400 rounded-full opacity-0 group-hover:opacity-100 group-hover:animate-ping"${_scopeId}></div></div>`);
            });
            _push2(`<!--]--></div><!-- Bottom CTA --><div class="text-center mt-10 lg:mt-12 scroll-reveal"${_scopeId}><div class="inline-flex flex-col sm:flex-row items-center gap-4"${_scopeId}>`);
            _push2(ssrRenderComponent(_component_UButton, {
              to: "/brands",
              size: "lg",
              class: "group font-semibold shadow-lg shadow-primary-500/20 hover:shadow-xl hover:shadow-primary-500/30 transition-all"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<span${_scopeId2}>Lihat Semua Brand</span>`);
                  _push3(ssrRenderComponent(_component_UIcon, {
                    name: "i-lucide-arrow-right",
                    class: "w-4 h-4 group-hover:translate-x-1 transition-transform"
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode("span", null, "Lihat Semua Brand"),
                    createVNode(_component_UIcon, {
                      name: "i-lucide-arrow-right",
                      class: "w-4 h-4 group-hover:translate-x-1 transition-transform"
                    })
                  ];
                }
              }),
              _: 1
              /* STABLE */
            }, _parent2, _scopeId));
            _push2(`<span class="text-sm text-gray-500 dark:text-gray-400 flex items-center gap-2"${_scopeId}>`);
            _push2(ssrRenderComponent(_component_UIcon, {
              name: "i-lucide-shield-check",
              class: "w-4 h-4 text-green-500"
            }, null, _parent2, _scopeId));
            _push2(` 100% Produk Original </span></div></div>`);
          } else {
            return [
              createCommentVNode(" Section Header "),
              createVNode("div", { class: "text-center mb-12 lg:mb-16 scroll-reveal" }, [
                createCommentVNode(" Badge "),
                createVNode("div", { class: "inline-flex items-center gap-2 px-4 py-2 bg-primary-100 dark:bg-white/10 backdrop-blur-md border border-primary-200 dark:border-white/20 rounded-full mb-6" }, [
                  createVNode(_component_UIcon, {
                    name: "i-lucide-award",
                    class: "w-4 h-4 text-primary-600 dark:text-primary-400"
                  }),
                  createVNode("span", { class: "text-sm font-medium text-primary-700 dark:text-white/80" }, "Official Partners")
                ]),
                createVNode("h2", { class: "text-3xl lg:text-5xl font-black text-gray-900 dark:text-white mb-4" }, [
                  createTextVNode(" Brand "),
                  createVNode("span", { class: "bg-linear-to-r from-primary-600 via-secondary-600 to-pink-600 dark:from-primary-400 dark:via-secondary-400 dark:to-pink-400 text-transparent bg-clip-text" }, "Ternama"),
                  createTextVNode(" yang Tersedia ")
                ]),
                createVNode("p", { class: "text-gray-600 dark:text-gray-400 text-lg max-w-2xl mx-auto" }, " Produk original dari brand vape terpercaya dunia dengan garansi resmi ")
              ]),
              createCommentVNode(" Brands Grid "),
              createVNode("div", { class: "grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3 sm:gap-4" }, [
                (openBlock(true), createBlock(
                  Fragment,
                  null,
                  renderList(__props.brands, (brand, index) => {
                    return openBlock(), createBlock(
                      "div",
                      {
                        key: brand,
                        class: [
                          "scroll-reveal",
                          `scroll-reveal-delay-${index % 8 + 1}`,
                          "group relative aspect-square rounded-2xl overflow-hidden cursor-pointer",
                          "bg-white dark:bg-white/5 backdrop-blur-xl",
                          "border border-gray-200 dark:border-white/10",
                          "hover:border-primary-400 dark:hover:border-primary-500/50",
                          "shadow-md shadow-gray-200/50 dark:shadow-none",
                          "hover:shadow-xl hover:shadow-primary-500/20",
                          "transition-all duration-500 ease-out",
                          "active:scale-95 sm:hover:-translate-y-2 sm:hover:scale-105"
                        ]
                      },
                      [
                        createCommentVNode(" Card Glow Effect "),
                        createVNode("div", { class: "absolute inset-0 bg-linear-to-br from-primary-500/0 to-secondary-500/0 group-hover:from-primary-500/10 group-hover:to-secondary-500/10 transition-all duration-500" }),
                        createCommentVNode(" Animated Border on Hover "),
                        createVNode("div", { class: "absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" }, [
                          createVNode("div", { class: "absolute -inset-px bg-linear-to-r from-primary-500 via-secondary-500 to-pink-500 rounded-2xl blur-sm animate-border-glow" })
                        ]),
                        createCommentVNode(" Content "),
                        createVNode("div", { class: "relative z-10 w-full h-full flex flex-col items-center justify-center p-3" }, [
                          createCommentVNode(" Brand Icon/Logo Placeholder "),
                          createVNode("div", { class: "w-10 h-10 sm:w-12 sm:h-12 mb-2 bg-linear-to-br from-primary-100 to-secondary-100 dark:from-primary-900/50 dark:to-secondary-900/50 rounded-xl flex items-center justify-center group-hover:scale-110 group-hover:rotate-6 transition-all duration-500" }, [
                            createVNode(_component_UIcon, {
                              name: "i-lucide-box",
                              class: "w-5 h-5 sm:w-6 sm:h-6 text-primary-600 dark:text-primary-400"
                            })
                          ]),
                          createCommentVNode(" Brand Name "),
                          createVNode(
                            "span",
                            { class: "font-bold text-gray-800 dark:text-white text-xs sm:text-sm text-center group-hover:text-primary-600 dark:group-hover:text-primary-300 transition-colors" },
                            toDisplayString(brand),
                            1
                            /* TEXT */
                          )
                        ]),
                        createCommentVNode(" Particle on Hover "),
                        createVNode("div", { class: "absolute top-2 right-2 w-2 h-2 bg-primary-400 rounded-full opacity-0 group-hover:opacity-100 group-hover:animate-ping" })
                      ],
                      2
                      /* CLASS */
                    );
                  }),
                  128
                  /* KEYED_FRAGMENT */
                ))
              ]),
              createCommentVNode(" Bottom CTA "),
              createVNode("div", { class: "text-center mt-10 lg:mt-12 scroll-reveal" }, [
                createVNode("div", { class: "inline-flex flex-col sm:flex-row items-center gap-4" }, [
                  createVNode(_component_UButton, {
                    to: "/brands",
                    size: "lg",
                    class: "group font-semibold shadow-lg shadow-primary-500/20 hover:shadow-xl hover:shadow-primary-500/30 transition-all"
                  }, {
                    default: withCtx(() => [
                      createVNode("span", null, "Lihat Semua Brand"),
                      createVNode(_component_UIcon, {
                        name: "i-lucide-arrow-right",
                        class: "w-4 h-4 group-hover:translate-x-1 transition-transform"
                      })
                    ]),
                    _: 1
                    /* STABLE */
                  }),
                  createVNode("span", { class: "text-sm text-gray-500 dark:text-gray-400 flex items-center gap-2" }, [
                    createVNode(_component_UIcon, {
                      name: "i-lucide-shield-check",
                      class: "w-4 h-4 text-green-500"
                    }),
                    createTextVNode(" 100% Produk Original ")
                  ])
                ])
              ])
            ];
          }
        }),
        _: 1
        /* STABLE */
      }, _parent));
      _push(`</section>`);
    };
  }
});

const _sfc_setup$6 = _sfc_main$6.setup;
_sfc_main$6.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("inertia/components/home/HomeBrands.vue");
  return _sfc_setup$6 ? _sfc_setup$6(props, ctx) : void 0;
};

const _sfc_main$5 = /* @__PURE__ */ defineComponent({
  __name: "HomeCTA",
  __ssrInlineRender: true,
  props: {
    ranks: {}
  },
  setup(__props) {
    const props = __props;
    const stats = [
      { value: "0%", label: "Biaya Pendaftaran", linear: "from-green-400 to-emerald-400", icon: "i-lucide-badge-check" },
      { value: "10%", label: "Komisi Affiliate", linear: "from-primary-400 to-secondary-400", icon: "i-lucide-percent" },
      { value: "∞", label: "Passive Income", linear: "from-pink-400 to-rose-400", icon: "i-lucide-wallet" }
    ];
    const features = [
      { icon: "i-lucide-link", text: "Link Referral Unik" },
      { icon: "i-lucide-coins", text: "Komisi Setiap Transaksi" },
      { icon: "i-lucide-bar-chart-3", text: "Dashboard Affiliate" },
      { icon: "i-lucide-crown", text: "Sistem Ranking VIP" }
    ];
    const rankVisuals = {
      1: {
        icon: "i-lucide-flame",
        linear: "from-slate-400 via-slate-500 to-slate-600",
        glowColor: "shadow-slate-500/50",
        borderColor: "border-slate-400/50",
        bgColor: "from-slate-500/20 to-slate-600/10",
        desc: "Mulai petualangan vape-mu!"
      },
      2: {
        icon: "i-lucide-zap",
        linear: "from-blue-400 via-cyan-500 to-teal-500",
        glowColor: "shadow-cyan-500/50",
        borderColor: "border-cyan-400/50",
        bgColor: "from-cyan-500/20 to-teal-500/10",
        desc: "Vaper sejati yang aktif!"
      },
      3: {
        icon: "i-lucide-crown",
        linear: "from-amber-400 via-orange-500 to-red-500",
        glowColor: "shadow-orange-500/60",
        borderColor: "border-orange-400/50",
        bgColor: "from-orange-500/20 to-red-500/10",
        desc: "Legend of Vapers! 🏆"
      }
    };
    const defaultVisual = {
      icon: "i-lucide-star",
      linear: "from-purple-400 via-pink-500 to-rose-500",
      glowColor: "shadow-purple-500/50",
      borderColor: "border-purple-400/50",
      bgColor: "from-purple-500/20 to-rose-500/10",
      desc: "Elite Vaper!"
    };
    const displayRanks = computed(() => {
      return props.ranks.map((rank) => {
        const visual = rankVisuals[rank.level] || defaultVisual;
        return {
          ...rank,
          ...visual,
          benefit: `Cashback ${rank.cashbackRate}%`,
          xp: formatXpRange(rank)
        };
      });
    });
    const maxCashback = computed(() => {
      if (!props.ranks.length) return 10;
      return Math.max(...props.ranks.map((r) => r.cashbackRate));
    });
    function formatXpRange(rank) {
      const currentIndex = props.ranks.findIndex((r) => r.id === rank.id);
      const nextRank = props.ranks[currentIndex + 1];
      const minXp = formatNumber(rank.minSpent);
      if (nextRank) {
        const maxXp = formatNumber(nextRank.minSpent - 1);
        return `${minXp} - ${maxXp} XP`;
      }
      return `${minXp}+ XP`;
    }
    function formatNumber(num) {
      if (num >= 1e3) {
        return (num / 1e3).toFixed(0).replace(/\.0$/, "") + "K";
      }
      return num.toString();
    }
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UContainer = _sfc_main$b;
      const _component_UIcon = _sfc_main$d;
      const _component_UButton = _sfc_main$c;
      _push(`<section${ssrRenderAttrs(mergeProps({ class: "py-16 lg:py-24 relative overflow-hidden" }, _attrs))}>`);
      _push(ssrRenderComponent(_component_UContainer, { class: "relative z-10" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="max-w-4xl mx-auto text-center scroll-reveal"${_scopeId}><!-- Badge --><div class="inline-flex items-center gap-2 px-4 py-2 bg-linear-to-r from-primary-100 to-secondary-100 dark:from-primary-500/20 dark:to-secondary-500/20 backdrop-blur-md border border-primary-200 dark:border-primary-500/30 rounded-full mb-6 hover:scale-105 transition-all cursor-default"${_scopeId}><div class="w-2 h-2 bg-green-500 dark:bg-green-400 rounded-full animate-pulse"${_scopeId}></div><span class="text-sm font-bold text-primary-700 dark:text-primary-300"${_scopeId}>🔥 Program Affiliate Dibuka!</span>`);
            _push2(ssrRenderComponent(_component_UIcon, {
              name: "i-lucide-sparkles",
              class: "w-4 h-4 text-yellow-500 dark:text-yellow-400 animate-bounce"
            }, null, _parent2, _scopeId));
            _push2(`</div><!-- Icon --><div class="relative w-24 h-24 mx-auto mb-8"${_scopeId}><!-- Glow Effect --><div class="absolute inset-0 bg-linear-to-br from-primary-500 to-secondary-500 rounded-3xl blur-xl opacity-40 dark:opacity-60 animate-pulse-glow"${_scopeId}></div><!-- Icon Box --><div class="relative w-full h-full bg-linear-to-br from-primary-500 to-secondary-500 rounded-3xl flex items-center justify-center shadow-2xl shadow-primary-500/30 dark:shadow-primary-500/50 floating-animation"${_scopeId}>`);
            _push2(ssrRenderComponent(_component_UIcon, {
              name: "i-lucide-hand-coins",
              class: "w-12 h-12 text-white drop-shadow-lg"
            }, null, _parent2, _scopeId));
            _push2(`</div><!-- Particles --><div class="absolute -top-2 -right-2 w-4 h-4 bg-yellow-400 rounded-full animate-ping opacity-75"${_scopeId}></div><div class="absolute -bottom-1 -left-1 w-3 h-3 bg-cyan-400 rounded-full animate-ping opacity-75" style="${ssrRenderStyle({ "animation-delay": "0.5s" })}"${_scopeId}></div></div><!-- Title --><h2 class="text-3xl sm:text-4xl lg:text-6xl font-black text-gray-900 dark:text-white mb-4 leading-tight"${_scopeId}> Raih <span class="bg-linear-to-r from-primary-600 via-secondary-600 to-pink-600 dark:from-primary-400 dark:via-secondary-400 dark:to-pink-400 text-transparent bg-clip-text"${_scopeId}> Passive Income</span></h2><h3 class="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-700 dark:text-gray-300 mb-6"${_scopeId}> Jadi Affiliator <span class="bg-linear-to-r from-yellow-500 to-orange-500 text-transparent bg-clip-text"${_scopeId}>ogitu.com</span> Sekarang! 🚀 </h3><!-- Description --><p class="text-lg sm:text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed max-w-2xl mx-auto"${_scopeId}><span class="font-semibold text-primary-600 dark:text-primary-400"${_scopeId}>Bagikan link, dapat komisi!</span> Setiap teman yang belanja pakai link kamu, kamu dapat <span class="font-bold text-green-600 dark:text-green-400"${_scopeId}>komisi hingga 10%</span>. Plus, naik level dari <span class="font-bold text-slate-500"${_scopeId}>${ssrInterpolate(displayRanks.value[0]?.name || "Vapor Newbie")}</span> ke <span class="font-bold bg-linear-to-r from-amber-500 to-orange-500 text-transparent bg-clip-text"${_scopeId}>${ssrInterpolate(displayRanks.value[displayRanks.value.length - 1]?.name || "Vapor Pro")}</span> untuk cashback hingga ${ssrInterpolate(maxCashback.value)}%! </p><!-- Features Pills --><div class="flex flex-wrap justify-center gap-3 mb-10"${_scopeId}><!--[-->`);
            ssrRenderList(features, (feature) => {
              _push2(`<div class="flex items-center gap-2 px-4 py-2 bg-white dark:bg-white/5 backdrop-blur-md border border-gray-200 dark:border-white/10 rounded-full shadow-sm hover:shadow-md dark:shadow-none hover:bg-gray-50 dark:hover:bg-white/10 hover:border-primary-300 dark:hover:border-white/20 transition-all cursor-default group"${_scopeId}>`);
              _push2(ssrRenderComponent(_component_UIcon, {
                name: feature.icon,
                class: "w-4 h-4 text-primary-600 dark:text-primary-400 group-hover:scale-110 transition-transform"
              }, null, _parent2, _scopeId));
              _push2(`<span class="text-sm text-gray-700 dark:text-white/80 group-hover:text-gray-900 dark:group-hover:text-white transition-colors"${_scopeId}>${ssrInterpolate(feature.text)}</span></div>`);
            });
            _push2(`<!--]--></div><!-- Rank Preview - Game Style --><div class="mb-10 p-6 sm:p-8 bg-linear-to-br from-gray-900 via-gray-800 to-gray-900 dark:from-black dark:via-gray-900 dark:to-black backdrop-blur-md border border-gray-700/50 rounded-3xl relative overflow-hidden"${_scopeId}><!-- Background Effects --><div class="absolute inset-0 bg-[url(&#39;data:image/svg+xml,%3Csvg width=%2260%22 height=%2260%22 viewBox=%220 0 60 60%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cg fill=%22none%22 fill-rule=%22evenodd%22%3E%3Cg fill=%22%239C92AC%22 fill-opacity=%220.05%22%3E%3Cpath d=%22M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E&#39;)] opacity-30"${_scopeId}></div><!-- Floating Particles --><div class="absolute top-4 left-8 w-2 h-2 bg-cyan-400 rounded-full animate-pulse opacity-60"${_scopeId}></div><div class="absolute top-12 right-12 w-1.5 h-1.5 bg-orange-400 rounded-full animate-ping opacity-50"${_scopeId}></div><div class="absolute bottom-8 left-16 w-1 h-1 bg-purple-400 rounded-full animate-bounce opacity-40"${_scopeId}></div><div class="relative z-10"${_scopeId}><!-- Header --><div class="flex items-center justify-center gap-3 mb-6"${_scopeId}><div class="h-px w-12 bg-linear-to-r from-transparent to-cyan-500"${_scopeId}></div><h4 class="text-xl sm:text-2xl font-black text-white flex items-center gap-2"${_scopeId}>`);
            _push2(ssrRenderComponent(_component_UIcon, {
              name: "i-lucide-gamepad-2",
              class: "w-6 h-6 text-cyan-400"
            }, null, _parent2, _scopeId));
            _push2(`<span class="bg-linear-to-r from-cyan-400 via-purple-400 to-orange-400 text-transparent bg-clip-text"${_scopeId}>LEVEL UP SYSTEM</span></h4><div class="h-px w-12 bg-linear-to-l from-transparent to-orange-500"${_scopeId}></div></div><p class="text-gray-400 text-sm mb-8"${_scopeId}>Belanja &amp; referral untuk naik level dan unlock benefit eksklusif!</p><!-- Rank Cards --><div class="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6"${_scopeId}><!--[-->`);
            ssrRenderList(displayRanks.value, (rank, index) => {
              _push2(`<div class="${ssrRenderClass([
                "relative group cursor-default",
                "transform hover:scale-105 hover:-translate-y-2 transition-all duration-300"
              ])}"${_scopeId}><!-- Card Glow --><div class="${ssrRenderClass(["absolute -inset-1 bg-linear-to-r rounded-2xl opacity-0 group-hover:opacity-75 blur-lg transition-all duration-300", rank.linear])}"${_scopeId}></div><!-- Card --><div class="${ssrRenderClass(["relative p-5 rounded-2xl border-2 bg-linear-to-br backdrop-blur-sm", rank.borderColor, rank.bgColor])}"${_scopeId}><!-- Level Badge --><div class="absolute -top-3 -right-3 w-10 h-10 bg-gray-900 border-2 border-gray-600 rounded-xl flex items-center justify-center shadow-lg"${_scopeId}><span class="text-sm font-black text-white"${_scopeId}>${ssrInterpolate(rank.level)}</span></div><!-- Rank Icon --><div class="relative w-16 h-16 mx-auto mb-4"${_scopeId}><!-- Icon Glow --><div class="${ssrRenderClass(["absolute inset-0 bg-linear-to-r rounded-2xl blur-md opacity-60 group-hover:opacity-100 transition-opacity", rank.linear])}"${_scopeId}></div><!-- Icon Container --><div class="${ssrRenderClass(["relative w-full h-full bg-linear-to-br rounded-2xl flex items-center justify-center shadow-xl", rank.linear, rank.glowColor])}"${_scopeId}>`);
              _push2(ssrRenderComponent(_component_UIcon, {
                name: rank.icon,
                class: "w-8 h-8 text-white drop-shadow-lg"
              }, null, _parent2, _scopeId));
              _push2(`</div></div><!-- Rank Name --><h5 class="${ssrRenderClass(["text-lg font-black mb-1 bg-linear-to-r text-transparent bg-clip-text", rank.linear])}"${_scopeId}>${ssrInterpolate(rank.name)}</h5><!-- Description --><p class="text-xs text-gray-400 mb-3"${_scopeId}>${ssrInterpolate(rank.desc)}</p><!-- XP Range --><div class="flex items-center justify-center gap-1.5 mb-3"${_scopeId}>`);
              _push2(ssrRenderComponent(_component_UIcon, {
                name: "i-lucide-star",
                class: "w-3.5 h-3.5 text-yellow-400"
              }, null, _parent2, _scopeId));
              _push2(`<span class="text-xs font-medium text-gray-300"${_scopeId}>${ssrInterpolate(rank.xp)}</span></div><!-- Benefit Badge --><div class="${ssrRenderClass(["inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-linear-to-r text-white text-xs font-bold shadow-lg", rank.linear])}"${_scopeId}>`);
              _push2(ssrRenderComponent(_component_UIcon, {
                name: "i-lucide-gift",
                class: "w-3.5 h-3.5"
              }, null, _parent2, _scopeId));
              _push2(` ${ssrInterpolate(rank.benefit)}</div></div><!-- Connector Line (between cards) -->`);
              if (index < displayRanks.value.length - 1) {
                _push2(`<div class="hidden sm:block absolute top-1/2 -right-3 sm:-right-4 w-6 sm:w-8 h-0.5 bg-linear-to-r from-gray-600 to-gray-700"${_scopeId}>`);
                _push2(ssrRenderComponent(_component_UIcon, {
                  name: "i-lucide-chevron-right",
                  class: "absolute -right-1 -top-1.5 w-4 h-4 text-gray-500"
                }, null, _parent2, _scopeId));
                _push2(`</div>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div>`);
            });
            _push2(`<!--]--></div><!-- Progress Hint --><div class="mt-8 flex items-center justify-center gap-2 text-sm"${_scopeId}><div class="flex items-center gap-1 px-3 py-1.5 bg-gray-800/80 rounded-full border border-gray-700"${_scopeId}>`);
            _push2(ssrRenderComponent(_component_UIcon, {
              name: "i-lucide-info",
              class: "w-4 h-4 text-cyan-400"
            }, null, _parent2, _scopeId));
            _push2(`<span class="text-gray-300"${_scopeId}>XP didapat dari <span class="text-cyan-400 font-semibold"${_scopeId}>belanja</span> &amp; <span class="text-orange-400 font-semibold"${_scopeId}>referral</span></span></div></div></div></div><!-- CTA Buttons --><div class="flex flex-col sm:flex-row gap-4 justify-center mb-12"${_scopeId}>`);
            _push2(ssrRenderComponent(_component_UButton, {
              to: "/register",
              size: "xl",
              class: "font-bold shadow-xl shadow-primary-500/20 hover:shadow-2xl hover:shadow-primary-500/30 hover:scale-105 transition-all group"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_UIcon, {
                    name: "i-lucide-rocket",
                    class: "w-5 h-5 group-hover:rotate-12 group-hover:-translate-y-0.5 transition-transform"
                  }, null, _parent3, _scopeId2));
                  _push3(` Daftar &amp; Jadi Affiliator `);
                } else {
                  return [
                    createVNode(_component_UIcon, {
                      name: "i-lucide-rocket",
                      class: "w-5 h-5 group-hover:rotate-12 group-hover:-translate-y-0.5 transition-transform"
                    }),
                    createTextVNode(" Daftar & Jadi Affiliator ")
                  ];
                }
              }),
              _: 1
              /* STABLE */
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_UButton, {
              to: "/affiliate",
              size: "xl",
              variant: "outline",
              class: "font-bold text-gray-700 dark:text-white border-gray-300 dark:border-white/30 hover:bg-gray-100 dark:hover:bg-white/10 hover:border-gray-400 dark:hover:border-white/50 hover:scale-105 transition-all group"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_UIcon, {
                    name: "i-lucide-info",
                    class: "w-5 h-5 group-hover:scale-110 transition-transform"
                  }, null, _parent3, _scopeId2));
                  _push3(` Cara Kerja Affiliate `);
                } else {
                  return [
                    createVNode(_component_UIcon, {
                      name: "i-lucide-info",
                      class: "w-5 h-5 group-hover:scale-110 transition-transform"
                    }),
                    createTextVNode(" Cara Kerja Affiliate ")
                  ];
                }
              }),
              _: 1
              /* STABLE */
            }, _parent2, _scopeId));
            _push2(`</div><!-- Stats --><div class="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 pt-10 border-t border-gray-200 dark:border-white/10"${_scopeId}><!--[-->`);
            ssrRenderList(stats, (stat, index) => {
              _push2(`<div class="${ssrRenderClass([
                "scroll-reveal",
                `scroll-reveal-delay-${index + 1}`,
                "group relative p-6 rounded-2xl",
                "bg-white dark:bg-white/5 backdrop-blur-md border border-gray-200 dark:border-white/10",
                "shadow-lg shadow-gray-200/50 dark:shadow-none",
                "hover:bg-gray-50 dark:hover:bg-white/10 hover:border-primary-300 dark:hover:border-primary-500/50 transition-all cursor-default"
              ])}"${_scopeId}><!-- Stat Glow --><div class="absolute inset-0 bg-linear-to-br from-primary-500/0 to-secondary-500/0 group-hover:from-primary-500/5 dark:group-hover:from-primary-500/10 group-hover:to-secondary-500/5 dark:group-hover:to-secondary-500/10 rounded-2xl transition-all"${_scopeId}></div><div class="relative z-10"${_scopeId}><!-- Icon --><div class="w-10 h-10 mx-auto mb-3 bg-linear-to-br from-primary-100 to-secondary-100 dark:from-white/10 dark:to-white/5 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform"${_scopeId}>`);
              _push2(ssrRenderComponent(_component_UIcon, {
                name: stat.icon,
                class: "w-5 h-5 text-primary-600 dark:text-white/70"
              }, null, _parent2, _scopeId));
              _push2(`</div><div class="${ssrRenderClass(["text-3xl sm:text-4xl font-black bg-linear-to-r text-transparent bg-clip-text mb-2 group-hover:scale-105 transition-transform", stat.linear])}"${_scopeId}>${ssrInterpolate(stat.value)}</div><div class="text-sm text-gray-600 dark:text-gray-400 group-hover:text-gray-700 dark:group-hover:text-gray-300 transition-colors"${_scopeId}>${ssrInterpolate(stat.label)}</div></div></div>`);
            });
            _push2(`<!--]--></div><!-- Trust Badge --><div class="mt-10 flex flex-wrap items-center justify-center gap-6 text-sm text-gray-600 dark:text-gray-400"${_scopeId}><div class="flex items-center gap-2 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"${_scopeId}>`);
            _push2(ssrRenderComponent(_component_UIcon, {
              name: "i-lucide-users",
              class: "w-4 h-4 text-primary-600 dark:text-primary-400"
            }, null, _parent2, _scopeId));
            _push2(`<span${_scopeId}>1000+ Affiliator Aktif</span></div><div class="flex items-center gap-2 hover:text-yellow-600 dark:hover:text-yellow-400 transition-colors"${_scopeId}>`);
            _push2(ssrRenderComponent(_component_UIcon, {
              name: "i-lucide-wallet",
              class: "w-4 h-4 text-green-500 dark:text-green-400"
            }, null, _parent2, _scopeId));
            _push2(`<span${_scopeId}>Rp 50jt+ Komisi Dibayar</span></div><div class="flex items-center gap-2 hover:text-green-600 dark:hover:text-green-400 transition-colors"${_scopeId}>`);
            _push2(ssrRenderComponent(_component_UIcon, {
              name: "i-lucide-clock",
              class: "w-4 h-4 text-blue-500 dark:text-blue-400"
            }, null, _parent2, _scopeId));
            _push2(`<span${_scopeId}>Withdraw Cepat 1x24 Jam</span></div></div></div>`);
          } else {
            return [
              createVNode("div", { class: "max-w-4xl mx-auto text-center scroll-reveal" }, [
                createCommentVNode(" Badge "),
                createVNode("div", { class: "inline-flex items-center gap-2 px-4 py-2 bg-linear-to-r from-primary-100 to-secondary-100 dark:from-primary-500/20 dark:to-secondary-500/20 backdrop-blur-md border border-primary-200 dark:border-primary-500/30 rounded-full mb-6 hover:scale-105 transition-all cursor-default" }, [
                  createVNode("div", { class: "w-2 h-2 bg-green-500 dark:bg-green-400 rounded-full animate-pulse" }),
                  createVNode("span", { class: "text-sm font-bold text-primary-700 dark:text-primary-300" }, "🔥 Program Affiliate Dibuka!"),
                  createVNode(_component_UIcon, {
                    name: "i-lucide-sparkles",
                    class: "w-4 h-4 text-yellow-500 dark:text-yellow-400 animate-bounce"
                  })
                ]),
                createCommentVNode(" Icon "),
                createVNode("div", { class: "relative w-24 h-24 mx-auto mb-8" }, [
                  createCommentVNode(" Glow Effect "),
                  createVNode("div", { class: "absolute inset-0 bg-linear-to-br from-primary-500 to-secondary-500 rounded-3xl blur-xl opacity-40 dark:opacity-60 animate-pulse-glow" }),
                  createCommentVNode(" Icon Box "),
                  createVNode("div", { class: "relative w-full h-full bg-linear-to-br from-primary-500 to-secondary-500 rounded-3xl flex items-center justify-center shadow-2xl shadow-primary-500/30 dark:shadow-primary-500/50 floating-animation" }, [
                    createVNode(_component_UIcon, {
                      name: "i-lucide-hand-coins",
                      class: "w-12 h-12 text-white drop-shadow-lg"
                    })
                  ]),
                  createCommentVNode(" Particles "),
                  createVNode("div", { class: "absolute -top-2 -right-2 w-4 h-4 bg-yellow-400 rounded-full animate-ping opacity-75" }),
                  createVNode("div", {
                    class: "absolute -bottom-1 -left-1 w-3 h-3 bg-cyan-400 rounded-full animate-ping opacity-75",
                    style: { "animation-delay": "0.5s" }
                  })
                ]),
                createCommentVNode(" Title "),
                createVNode("h2", { class: "text-3xl sm:text-4xl lg:text-6xl font-black text-gray-900 dark:text-white mb-4 leading-tight" }, [
                  createTextVNode(" Raih "),
                  createVNode("span", { class: "bg-linear-to-r from-primary-600 via-secondary-600 to-pink-600 dark:from-primary-400 dark:via-secondary-400 dark:to-pink-400 text-transparent bg-clip-text" }, " Passive Income")
                ]),
                createVNode("h3", { class: "text-xl sm:text-2xl lg:text-3xl font-bold text-gray-700 dark:text-gray-300 mb-6" }, [
                  createTextVNode(" Jadi Affiliator "),
                  createVNode("span", { class: "bg-linear-to-r from-yellow-500 to-orange-500 text-transparent bg-clip-text" }, "ogitu.com"),
                  createTextVNode(" Sekarang! 🚀 ")
                ]),
                createCommentVNode(" Description "),
                createVNode("p", { class: "text-lg sm:text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed max-w-2xl mx-auto" }, [
                  createVNode("span", { class: "font-semibold text-primary-600 dark:text-primary-400" }, "Bagikan link, dapat komisi!"),
                  createTextVNode(" Setiap teman yang belanja pakai link kamu, kamu dapat "),
                  createVNode("span", { class: "font-bold text-green-600 dark:text-green-400" }, "komisi hingga 10%"),
                  createTextVNode(". Plus, naik level dari "),
                  createVNode(
                    "span",
                    { class: "font-bold text-slate-500" },
                    toDisplayString(displayRanks.value[0]?.name || "Vapor Newbie"),
                    1
                    /* TEXT */
                  ),
                  createTextVNode(" ke "),
                  createVNode(
                    "span",
                    { class: "font-bold bg-linear-to-r from-amber-500 to-orange-500 text-transparent bg-clip-text" },
                    toDisplayString(displayRanks.value[displayRanks.value.length - 1]?.name || "Vapor Pro"),
                    1
                    /* TEXT */
                  ),
                  createTextVNode(
                    " untuk cashback hingga " + toDisplayString(maxCashback.value) + "%! ",
                    1
                    /* TEXT */
                  )
                ]),
                createCommentVNode(" Features Pills "),
                createVNode("div", { class: "flex flex-wrap justify-center gap-3 mb-10" }, [
                  (openBlock(), createBlock(
                    Fragment,
                    null,
                    renderList(features, (feature) => {
                      return createVNode("div", {
                        key: feature.text,
                        class: "flex items-center gap-2 px-4 py-2 bg-white dark:bg-white/5 backdrop-blur-md border border-gray-200 dark:border-white/10 rounded-full shadow-sm hover:shadow-md dark:shadow-none hover:bg-gray-50 dark:hover:bg-white/10 hover:border-primary-300 dark:hover:border-white/20 transition-all cursor-default group"
                      }, [
                        createVNode(_component_UIcon, {
                          name: feature.icon,
                          class: "w-4 h-4 text-primary-600 dark:text-primary-400 group-hover:scale-110 transition-transform"
                        }, null, 8, ["name"]),
                        createVNode(
                          "span",
                          { class: "text-sm text-gray-700 dark:text-white/80 group-hover:text-gray-900 dark:group-hover:text-white transition-colors" },
                          toDisplayString(feature.text),
                          1
                          /* TEXT */
                        )
                      ]);
                    }),
                    64
                    /* STABLE_FRAGMENT */
                  ))
                ]),
                createCommentVNode(" Rank Preview - Game Style "),
                createVNode("div", { class: "mb-10 p-6 sm:p-8 bg-linear-to-br from-gray-900 via-gray-800 to-gray-900 dark:from-black dark:via-gray-900 dark:to-black backdrop-blur-md border border-gray-700/50 rounded-3xl relative overflow-hidden" }, [
                  createCommentVNode(" Background Effects "),
                  createVNode("div", { class: "absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=%2260%22 height=%2260%22 viewBox=%220 0 60 60%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cg fill=%22none%22 fill-rule=%22evenodd%22%3E%3Cg fill=%22%239C92AC%22 fill-opacity=%220.05%22%3E%3Cpath d=%22M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-30" }),
                  createCommentVNode(" Floating Particles "),
                  createVNode("div", { class: "absolute top-4 left-8 w-2 h-2 bg-cyan-400 rounded-full animate-pulse opacity-60" }),
                  createVNode("div", { class: "absolute top-12 right-12 w-1.5 h-1.5 bg-orange-400 rounded-full animate-ping opacity-50" }),
                  createVNode("div", { class: "absolute bottom-8 left-16 w-1 h-1 bg-purple-400 rounded-full animate-bounce opacity-40" }),
                  createVNode("div", { class: "relative z-10" }, [
                    createCommentVNode(" Header "),
                    createVNode("div", { class: "flex items-center justify-center gap-3 mb-6" }, [
                      createVNode("div", { class: "h-px w-12 bg-linear-to-r from-transparent to-cyan-500" }),
                      createVNode("h4", { class: "text-xl sm:text-2xl font-black text-white flex items-center gap-2" }, [
                        createVNode(_component_UIcon, {
                          name: "i-lucide-gamepad-2",
                          class: "w-6 h-6 text-cyan-400"
                        }),
                        createVNode("span", { class: "bg-linear-to-r from-cyan-400 via-purple-400 to-orange-400 text-transparent bg-clip-text" }, "LEVEL UP SYSTEM")
                      ]),
                      createVNode("div", { class: "h-px w-12 bg-linear-to-l from-transparent to-orange-500" })
                    ]),
                    createVNode("p", { class: "text-gray-400 text-sm mb-8" }, "Belanja & referral untuk naik level dan unlock benefit eksklusif!"),
                    createCommentVNode(" Rank Cards "),
                    createVNode("div", { class: "grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6" }, [
                      (openBlock(true), createBlock(
                        Fragment,
                        null,
                        renderList(displayRanks.value, (rank, index) => {
                          return openBlock(), createBlock("div", {
                            key: rank.id,
                            class: [
                              "relative group cursor-default",
                              "transform hover:scale-105 hover:-translate-y-2 transition-all duration-300"
                            ]
                          }, [
                            createCommentVNode(" Card Glow "),
                            createVNode(
                              "div",
                              {
                                class: ["absolute -inset-1 bg-linear-to-r rounded-2xl opacity-0 group-hover:opacity-75 blur-lg transition-all duration-300", rank.linear]
                              },
                              null,
                              2
                              /* CLASS */
                            ),
                            createCommentVNode(" Card "),
                            createVNode(
                              "div",
                              {
                                class: ["relative p-5 rounded-2xl border-2 bg-linear-to-br backdrop-blur-sm", rank.borderColor, rank.bgColor]
                              },
                              [
                                createCommentVNode(" Level Badge "),
                                createVNode("div", { class: "absolute -top-3 -right-3 w-10 h-10 bg-gray-900 border-2 border-gray-600 rounded-xl flex items-center justify-center shadow-lg" }, [
                                  createVNode(
                                    "span",
                                    { class: "text-sm font-black text-white" },
                                    toDisplayString(rank.level),
                                    1
                                    /* TEXT */
                                  )
                                ]),
                                createCommentVNode(" Rank Icon "),
                                createVNode("div", { class: "relative w-16 h-16 mx-auto mb-4" }, [
                                  createCommentVNode(" Icon Glow "),
                                  createVNode(
                                    "div",
                                    {
                                      class: ["absolute inset-0 bg-linear-to-r rounded-2xl blur-md opacity-60 group-hover:opacity-100 transition-opacity", rank.linear]
                                    },
                                    null,
                                    2
                                    /* CLASS */
                                  ),
                                  createCommentVNode(" Icon Container "),
                                  createVNode(
                                    "div",
                                    {
                                      class: ["relative w-full h-full bg-linear-to-br rounded-2xl flex items-center justify-center shadow-xl", rank.linear, rank.glowColor]
                                    },
                                    [
                                      createVNode(_component_UIcon, {
                                        name: rank.icon,
                                        class: "w-8 h-8 text-white drop-shadow-lg"
                                      }, null, 8, ["name"])
                                    ],
                                    2
                                    /* CLASS */
                                  )
                                ]),
                                createCommentVNode(" Rank Name "),
                                createVNode(
                                  "h5",
                                  {
                                    class: ["text-lg font-black mb-1 bg-linear-to-r text-transparent bg-clip-text", rank.linear]
                                  },
                                  toDisplayString(rank.name),
                                  3
                                  /* TEXT, CLASS */
                                ),
                                createCommentVNode(" Description "),
                                createVNode(
                                  "p",
                                  { class: "text-xs text-gray-400 mb-3" },
                                  toDisplayString(rank.desc),
                                  1
                                  /* TEXT */
                                ),
                                createCommentVNode(" XP Range "),
                                createVNode("div", { class: "flex items-center justify-center gap-1.5 mb-3" }, [
                                  createVNode(_component_UIcon, {
                                    name: "i-lucide-star",
                                    class: "w-3.5 h-3.5 text-yellow-400"
                                  }),
                                  createVNode(
                                    "span",
                                    { class: "text-xs font-medium text-gray-300" },
                                    toDisplayString(rank.xp),
                                    1
                                    /* TEXT */
                                  )
                                ]),
                                createCommentVNode(" Benefit Badge "),
                                createVNode(
                                  "div",
                                  {
                                    class: ["inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-linear-to-r text-white text-xs font-bold shadow-lg", rank.linear]
                                  },
                                  [
                                    createVNode(_component_UIcon, {
                                      name: "i-lucide-gift",
                                      class: "w-3.5 h-3.5"
                                    }),
                                    createTextVNode(
                                      " " + toDisplayString(rank.benefit),
                                      1
                                      /* TEXT */
                                    )
                                  ],
                                  2
                                  /* CLASS */
                                )
                              ],
                              2
                              /* CLASS */
                            ),
                            createCommentVNode(" Connector Line (between cards) "),
                            index < displayRanks.value.length - 1 ? (openBlock(), createBlock("div", {
                              key: 0,
                              class: "hidden sm:block absolute top-1/2 -right-3 sm:-right-4 w-6 sm:w-8 h-0.5 bg-linear-to-r from-gray-600 to-gray-700"
                            }, [
                              createVNode(_component_UIcon, {
                                name: "i-lucide-chevron-right",
                                class: "absolute -right-1 -top-1.5 w-4 h-4 text-gray-500"
                              })
                            ])) : createCommentVNode("v-if", true)
                          ]);
                        }),
                        128
                        /* KEYED_FRAGMENT */
                      ))
                    ]),
                    createCommentVNode(" Progress Hint "),
                    createVNode("div", { class: "mt-8 flex items-center justify-center gap-2 text-sm" }, [
                      createVNode("div", { class: "flex items-center gap-1 px-3 py-1.5 bg-gray-800/80 rounded-full border border-gray-700" }, [
                        createVNode(_component_UIcon, {
                          name: "i-lucide-info",
                          class: "w-4 h-4 text-cyan-400"
                        }),
                        createVNode("span", { class: "text-gray-300" }, [
                          createTextVNode("XP didapat dari "),
                          createVNode("span", { class: "text-cyan-400 font-semibold" }, "belanja"),
                          createTextVNode(" & "),
                          createVNode("span", { class: "text-orange-400 font-semibold" }, "referral")
                        ])
                      ])
                    ])
                  ])
                ]),
                createCommentVNode(" CTA Buttons "),
                createVNode("div", { class: "flex flex-col sm:flex-row gap-4 justify-center mb-12" }, [
                  createVNode(_component_UButton, {
                    to: "/register",
                    size: "xl",
                    class: "font-bold shadow-xl shadow-primary-500/20 hover:shadow-2xl hover:shadow-primary-500/30 hover:scale-105 transition-all group"
                  }, {
                    default: withCtx(() => [
                      createVNode(_component_UIcon, {
                        name: "i-lucide-rocket",
                        class: "w-5 h-5 group-hover:rotate-12 group-hover:-translate-y-0.5 transition-transform"
                      }),
                      createTextVNode(" Daftar & Jadi Affiliator ")
                    ]),
                    _: 1
                    /* STABLE */
                  }),
                  createVNode(_component_UButton, {
                    to: "/affiliate",
                    size: "xl",
                    variant: "outline",
                    class: "font-bold text-gray-700 dark:text-white border-gray-300 dark:border-white/30 hover:bg-gray-100 dark:hover:bg-white/10 hover:border-gray-400 dark:hover:border-white/50 hover:scale-105 transition-all group"
                  }, {
                    default: withCtx(() => [
                      createVNode(_component_UIcon, {
                        name: "i-lucide-info",
                        class: "w-5 h-5 group-hover:scale-110 transition-transform"
                      }),
                      createTextVNode(" Cara Kerja Affiliate ")
                    ]),
                    _: 1
                    /* STABLE */
                  })
                ]),
                createCommentVNode(" Stats "),
                createVNode("div", { class: "grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 pt-10 border-t border-gray-200 dark:border-white/10" }, [
                  (openBlock(), createBlock(
                    Fragment,
                    null,
                    renderList(stats, (stat, index) => {
                      return createVNode(
                        "div",
                        {
                          key: stat.label,
                          class: [
                            "scroll-reveal",
                            `scroll-reveal-delay-${index + 1}`,
                            "group relative p-6 rounded-2xl",
                            "bg-white dark:bg-white/5 backdrop-blur-md border border-gray-200 dark:border-white/10",
                            "shadow-lg shadow-gray-200/50 dark:shadow-none",
                            "hover:bg-gray-50 dark:hover:bg-white/10 hover:border-primary-300 dark:hover:border-primary-500/50 transition-all cursor-default"
                          ]
                        },
                        [
                          createCommentVNode(" Stat Glow "),
                          createVNode("div", { class: "absolute inset-0 bg-linear-to-br from-primary-500/0 to-secondary-500/0 group-hover:from-primary-500/5 dark:group-hover:from-primary-500/10 group-hover:to-secondary-500/5 dark:group-hover:to-secondary-500/10 rounded-2xl transition-all" }),
                          createVNode("div", { class: "relative z-10" }, [
                            createCommentVNode(" Icon "),
                            createVNode("div", { class: "w-10 h-10 mx-auto mb-3 bg-linear-to-br from-primary-100 to-secondary-100 dark:from-white/10 dark:to-white/5 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform" }, [
                              createVNode(_component_UIcon, {
                                name: stat.icon,
                                class: "w-5 h-5 text-primary-600 dark:text-white/70"
                              }, null, 8, ["name"])
                            ]),
                            createVNode(
                              "div",
                              {
                                class: ["text-3xl sm:text-4xl font-black bg-linear-to-r text-transparent bg-clip-text mb-2 group-hover:scale-105 transition-transform", stat.linear]
                              },
                              toDisplayString(stat.value),
                              3
                              /* TEXT, CLASS */
                            ),
                            createVNode(
                              "div",
                              { class: "text-sm text-gray-600 dark:text-gray-400 group-hover:text-gray-700 dark:group-hover:text-gray-300 transition-colors" },
                              toDisplayString(stat.label),
                              1
                              /* TEXT */
                            )
                          ])
                        ],
                        2
                        /* CLASS */
                      );
                    }),
                    64
                    /* STABLE_FRAGMENT */
                  ))
                ]),
                createCommentVNode(" Trust Badge "),
                createVNode("div", { class: "mt-10 flex flex-wrap items-center justify-center gap-6 text-sm text-gray-600 dark:text-gray-400" }, [
                  createVNode("div", { class: "flex items-center gap-2 hover:text-primary-600 dark:hover:text-primary-400 transition-colors" }, [
                    createVNode(_component_UIcon, {
                      name: "i-lucide-users",
                      class: "w-4 h-4 text-primary-600 dark:text-primary-400"
                    }),
                    createVNode("span", null, "1000+ Affiliator Aktif")
                  ]),
                  createVNode("div", { class: "flex items-center gap-2 hover:text-yellow-600 dark:hover:text-yellow-400 transition-colors" }, [
                    createVNode(_component_UIcon, {
                      name: "i-lucide-wallet",
                      class: "w-4 h-4 text-green-500 dark:text-green-400"
                    }),
                    createVNode("span", null, "Rp 50jt+ Komisi Dibayar")
                  ]),
                  createVNode("div", { class: "flex items-center gap-2 hover:text-green-600 dark:hover:text-green-400 transition-colors" }, [
                    createVNode(_component_UIcon, {
                      name: "i-lucide-clock",
                      class: "w-4 h-4 text-blue-500 dark:text-blue-400"
                    }),
                    createVNode("span", null, "Withdraw Cepat 1x24 Jam")
                  ])
                ])
              ])
            ];
          }
        }),
        _: 1
        /* STABLE */
      }, _parent));
      _push(`</section>`);
    };
  }
});

const _sfc_setup$5 = _sfc_main$5.setup;
_sfc_main$5.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("inertia/components/home/HomeCTA.vue");
  return _sfc_setup$5 ? _sfc_setup$5(props, ctx) : void 0;
};

const theme$2 = {
  "slots": {
    "root": "relative group/user",
    "wrapper": "",
    "name": "font-medium",
    "description": "text-muted",
    "avatar": "shrink-0"
  },
  "variants": {
    "orientation": {
      "horizontal": {
        "root": "flex items-center"
      },
      "vertical": {
        "root": "flex flex-col"
      }
    },
    "to": {
      "true": {
        "name": [
          "text-default peer-hover:text-highlighted",
          "transition-colors"
        ],
        "description": [
          "peer-hover:text-toned",
          "transition-colors"
        ],
        "avatar": "transform transition-transform duration-200 group-hover/user:scale-115"
      },
      "false": {
        "name": "text-highlighted",
        "description": ""
      }
    },
    "size": {
      "3xs": {
        "root": "gap-1",
        "wrapper": "flex items-center gap-1",
        "name": "text-xs",
        "description": "text-xs"
      },
      "2xs": {
        "root": "gap-1.5",
        "wrapper": "flex items-center gap-1.5",
        "name": "text-xs",
        "description": "text-xs"
      },
      "xs": {
        "root": "gap-1.5",
        "wrapper": "flex items-center gap-1.5",
        "name": "text-xs",
        "description": "text-xs"
      },
      "sm": {
        "root": "gap-2",
        "name": "text-xs",
        "description": "text-xs"
      },
      "md": {
        "root": "gap-2",
        "name": "text-sm",
        "description": "text-xs"
      },
      "lg": {
        "root": "gap-2.5",
        "name": "text-sm",
        "description": "text-sm"
      },
      "xl": {
        "root": "gap-2.5",
        "name": "text-base",
        "description": "text-sm"
      },
      "2xl": {
        "root": "gap-3",
        "name": "text-base",
        "description": "text-base"
      },
      "3xl": {
        "root": "gap-3",
        "name": "text-lg",
        "description": "text-base"
      }
    }
  },
  "defaultVariants": {
    "size": "md"
  }
};

const _sfc_main$4 = /*@__PURE__*/Object.assign({ inheritAttrs: false }, {
  __name: 'User',
  __ssrInlineRender: true,
  props: {
  as: { type: null, required: false },
  name: { type: String, required: false },
  description: { type: String, required: false },
  avatar: { type: Object, required: false },
  chip: { type: [Boolean, Object], required: false },
  size: { type: null, required: false },
  orientation: { type: null, required: false, default: "horizontal" },
  to: { type: null, required: false },
  target: { type: [String, Object, null], required: false },
  onClick: { type: Function, required: false },
  class: { type: null, required: false },
  ui: { type: null, required: false }
},
  setup(__props) {


const props = __props;
const slots = useSlots();
const appConfig = useAppConfig();
const ui = computed(() => tv({ extend: tv(theme$2), ...appConfig.ui?.user || {} })({
  size: props.size,
  orientation: props.orientation,
  to: !!props.to || !!props.onClick
}));

return (_ctx, _push, _parent, _attrs) => {
  _push(ssrRenderComponent(unref(Primitive), mergeProps({
    as: __props.as,
    "data-orientation": __props.orientation,
    "data-slot": "root",
    class: ui.value.root({ class: [props.ui?.root, props.class] }),
    onClick: __props.onClick
  }, _attrs), {
    default: withCtx((_, _push, _parent, _scopeId) => {
      if (_push) {
        ssrRenderSlot(_ctx.$slots, "avatar", { ui: ui.value }, () => {
          if (__props.chip && __props.avatar) {
            _push(ssrRenderComponent(_sfc_main$f, mergeProps({ inset: "" }, typeof __props.chip === 'object' ? __props.chip : {}, { size: __props.size }), {
              default: withCtx((_, _push, _parent, _scopeId) => {
                if (_push) {
                  _push(ssrRenderComponent(_sfc_main$g, mergeProps({ alt: __props.name }, __props.avatar, {
                    size: __props.size,
                    "data-slot": "avatar",
                    class: ui.value.avatar({ class: props.ui?.avatar })
                  }), null, _parent, _scopeId));
                } else {
                  return [
                    createVNode(_sfc_main$g, mergeProps({ alt: __props.name }, __props.avatar, {
                      size: __props.size,
                      "data-slot": "avatar",
                      class: ui.value.avatar({ class: props.ui?.avatar })
                    }), null, 16 /* FULL_PROPS */, ["alt", "size", "class"])
                  ]
                }
              }),
              _: 1 /* STABLE */
            }, _parent, _scopeId));
          } else if (__props.avatar) {
            _push(ssrRenderComponent(_sfc_main$g, mergeProps({ alt: __props.name }, __props.avatar, {
              size: __props.size,
              "data-slot": "avatar",
              class: ui.value.avatar({ class: props.ui?.avatar })
            }), null, _parent, _scopeId));
          } else {
            _push(`<!---->`);
          }
        }, _push, _parent, _scopeId);
        _push(`<div data-slot="wrapper" class="${
          ssrRenderClass(ui.value.wrapper({ class: props.ui?.wrapper }))
        }"${
          _scopeId
        }>`);
        if (__props.to) {
          _push(ssrRenderComponent(_sfc_main$h, mergeProps({ "aria-label": __props.name }, { to: __props.to, target: __props.target, ..._ctx.$attrs }, {
            class: "focus:outline-none peer",
            tabindex: "-1",
            raw: ""
          }), {
            default: withCtx((_, _push, _parent, _scopeId) => {
              if (_push) {
                _push(`<span class="absolute inset-0" aria-hidden="true"${_scopeId}></span>`);
              } else {
                return [
                  createVNode("span", {
                    class: "absolute inset-0",
                    "aria-hidden": "true"
                  })
                ]
              }
            }),
            _: 1 /* STABLE */
          }, _parent, _scopeId));
        } else {
          _push(`<!---->`);
        }
        ssrRenderSlot(_ctx.$slots, "default", {}, () => {
          if (__props.name || !!slots.name) {
            _push(`<p data-slot="name" class="${
              ssrRenderClass(ui.value.name({ class: props.ui?.name }))
            }"${
              _scopeId
            }>`);
            ssrRenderSlot(_ctx.$slots, "name", {}, () => {
              _push(`${ssrInterpolate(__props.name)}`);
            }, _push, _parent, _scopeId);
            _push(`</p>`);
          } else {
            _push(`<!---->`);
          }
          if (__props.description || !!slots.description) {
            _push(`<p data-slot="description" class="${
              ssrRenderClass(ui.value.description({ class: props.ui?.description }))
            }"${
              _scopeId
            }>`);
            ssrRenderSlot(_ctx.$slots, "description", {}, () => {
              _push(`${ssrInterpolate(__props.description)}`);
            }, _push, _parent, _scopeId);
            _push(`</p>`);
          } else {
            _push(`<!---->`);
          }
        }, _push, _parent, _scopeId);
        _push(`</div>`);
      } else {
        return [
          renderSlot(_ctx.$slots, "avatar", { ui: ui.value }, () => [
            (__props.chip && __props.avatar)
              ? (openBlock(), createBlock(_sfc_main$f, mergeProps({
                  key: 0,
                  inset: ""
                }, typeof __props.chip === 'object' ? __props.chip : {}, { size: __props.size }), {
                  default: withCtx(() => [
                    createVNode(_sfc_main$g, mergeProps({ alt: __props.name }, __props.avatar, {
                      size: __props.size,
                      "data-slot": "avatar",
                      class: ui.value.avatar({ class: props.ui?.avatar })
                    }), null, 16 /* FULL_PROPS */, ["alt", "size", "class"])
                  ]),
                  _: 1 /* STABLE */
                }, 16 /* FULL_PROPS */, ["size"]))
              : (__props.avatar)
                ? (openBlock(), createBlock(_sfc_main$g, mergeProps({
                    key: 1,
                    alt: __props.name
                  }, __props.avatar, {
                    size: __props.size,
                    "data-slot": "avatar",
                    class: ui.value.avatar({ class: props.ui?.avatar })
                  }), null, 16 /* FULL_PROPS */, ["alt", "size", "class"]))
                : createCommentVNode("v-if", true)
          ]),
          createVNode("div", {
            "data-slot": "wrapper",
            class: ui.value.wrapper({ class: props.ui?.wrapper })
          }, [
            (__props.to)
              ? (openBlock(), createBlock(_sfc_main$h, mergeProps({
                  key: 0,
                  "aria-label": __props.name
                }, { to: __props.to, target: __props.target, ..._ctx.$attrs }, {
                  class: "focus:outline-none peer",
                  tabindex: "-1",
                  raw: ""
                }), {
                  default: withCtx(() => [
                    createVNode("span", {
                      class: "absolute inset-0",
                      "aria-hidden": "true"
                    })
                  ]),
                  _: 1 /* STABLE */
                }, 16 /* FULL_PROPS */, ["aria-label"]))
              : createCommentVNode("v-if", true),
            renderSlot(_ctx.$slots, "default", {}, () => [
              (__props.name || !!slots.name)
                ? (openBlock(), createBlock("p", {
                    key: 0,
                    "data-slot": "name",
                    class: ui.value.name({ class: props.ui?.name })
                  }, [
                    renderSlot(_ctx.$slots, "name", {}, () => [
                      createTextVNode(toDisplayString(__props.name), 1 /* TEXT */)
                    ])
                  ], 2 /* CLASS */))
                : createCommentVNode("v-if", true),
              (__props.description || !!slots.description)
                ? (openBlock(), createBlock("p", {
                    key: 1,
                    "data-slot": "description",
                    class: ui.value.description({ class: props.ui?.description })
                  }, [
                    renderSlot(_ctx.$slots, "description", {}, () => [
                      createTextVNode(toDisplayString(__props.description), 1 /* TEXT */)
                    ])
                  ], 2 /* CLASS */))
                : createCommentVNode("v-if", true)
            ])
          ], 2 /* CLASS */)
        ]
      }
    }),
    _: 3 /* FORWARDED */
  }, _parent));
}
}

});
const _sfc_setup$4 = _sfc_main$4.setup;
_sfc_main$4.setup = (props, ctx) => {
  const ssrContext = useSSRContext()
  ;(ssrContext.modules || (ssrContext.modules = new Set())).add("node_modules/@nuxt/ui/dist/runtime/components/User.vue");
  return _sfc_setup$4 ? _sfc_setup$4(props, ctx) : undefined
};

const theme$1 = {
  "slots": {
    "root": "relative flex rounded-lg",
    "spotlight": "absolute inset-0 rounded-[inherit] pointer-events-none bg-default/90",
    "container": "relative flex flex-col flex-1 lg:grid gap-x-8 gap-y-4 p-4 sm:p-6",
    "wrapper": "flex flex-col flex-1 items-start",
    "header": "mb-4",
    "body": "flex-1",
    "footer": "pt-4 mt-auto",
    "leading": "inline-flex items-center mb-2.5",
    "leadingIcon": "size-5 shrink-0 text-primary",
    "title": "text-base text-pretty font-semibold text-highlighted",
    "description": "text-[15px] text-pretty"
  },
  "variants": {
    "orientation": {
      "horizontal": {
        "container": "lg:grid-cols-2 lg:items-center"
      },
      "vertical": {
        "container": ""
      }
    },
    "reverse": {
      "true": {
        "wrapper": "lg:order-last"
      }
    },
    "variant": {
      "solid": {
        "root": "bg-inverted text-inverted",
        "title": "text-inverted",
        "description": "text-dimmed"
      },
      "outline": {
        "root": "bg-default ring ring-default",
        "description": "text-muted"
      },
      "soft": {
        "root": "bg-elevated/50",
        "description": "text-toned"
      },
      "subtle": {
        "root": "bg-elevated/50 ring ring-default",
        "description": "text-toned"
      },
      "ghost": {
        "description": "text-muted"
      },
      "naked": {
        "container": "p-0 sm:p-0",
        "description": "text-muted"
      }
    },
    "to": {
      "true": {
        "root": [
          "transition"
        ]
      }
    },
    "title": {
      "true": {
        "description": "mt-1"
      }
    },
    "highlight": {
      "true": {
        "root": "ring-2"
      }
    },
    "highlightColor": {
      "primary": "",
      "secondary": "",
      "success": "",
      "info": "",
      "warning": "",
      "error": "",
      "neutral": ""
    },
    "spotlight": {
      "true": {
        "root": "[--spotlight-size:400px] before:absolute before:-inset-px before:pointer-events-none before:rounded-[inherit] before:bg-[radial-gradient(var(--spotlight-size)_var(--spotlight-size)_at_calc(var(--spotlight-x,0px))_calc(var(--spotlight-y,0px)),var(--spotlight-color),transparent_70%)]"
      }
    },
    "spotlightColor": {
      "primary": "",
      "secondary": "",
      "success": "",
      "info": "",
      "warning": "",
      "error": "",
      "neutral": ""
    }
  },
  "compoundVariants": [
    {
      "variant": "solid",
      "to": true,
      "class": {
        "root": "hover:bg-inverted/90"
      }
    },
    {
      "variant": "outline",
      "to": true,
      "class": {
        "root": "hover:bg-elevated/50"
      }
    },
    {
      "variant": "soft",
      "to": true,
      "class": {
        "root": "hover:bg-elevated"
      }
    },
    {
      "variant": "subtle",
      "to": true,
      "class": {
        "root": "hover:bg-elevated"
      }
    },
    {
      "variant": "subtle",
      "to": true,
      "highlight": false,
      "class": {
        "root": "hover:ring-accented"
      }
    },
    {
      "variant": "ghost",
      "to": true,
      "class": {
        "root": "hover:bg-elevated/50"
      }
    },
    {
      "highlightColor": "primary",
      "highlight": true,
      "class": {
        "root": "ring-primary"
      }
    },
    {
      "highlightColor": "secondary",
      "highlight": true,
      "class": {
        "root": "ring-secondary"
      }
    },
    {
      "highlightColor": "success",
      "highlight": true,
      "class": {
        "root": "ring-success"
      }
    },
    {
      "highlightColor": "info",
      "highlight": true,
      "class": {
        "root": "ring-info"
      }
    },
    {
      "highlightColor": "warning",
      "highlight": true,
      "class": {
        "root": "ring-warning"
      }
    },
    {
      "highlightColor": "error",
      "highlight": true,
      "class": {
        "root": "ring-error"
      }
    },
    {
      "highlightColor": "neutral",
      "highlight": true,
      "class": {
        "root": "ring-inverted"
      }
    },
    {
      "spotlightColor": "primary",
      "spotlight": true,
      "class": {
        "root": "[--spotlight-color:var(--ui-primary)]"
      }
    },
    {
      "spotlightColor": "secondary",
      "spotlight": true,
      "class": {
        "root": "[--spotlight-color:var(--ui-secondary)]"
      }
    },
    {
      "spotlightColor": "success",
      "spotlight": true,
      "class": {
        "root": "[--spotlight-color:var(--ui-success)]"
      }
    },
    {
      "spotlightColor": "info",
      "spotlight": true,
      "class": {
        "root": "[--spotlight-color:var(--ui-info)]"
      }
    },
    {
      "spotlightColor": "warning",
      "spotlight": true,
      "class": {
        "root": "[--spotlight-color:var(--ui-warning)]"
      }
    },
    {
      "spotlightColor": "error",
      "spotlight": true,
      "class": {
        "root": "[--spotlight-color:var(--ui-error)]"
      }
    },
    {
      "spotlightColor": "neutral",
      "spotlight": true,
      "class": {
        "root": "[--spotlight-color:var(--ui-bg-inverted)]"
      }
    },
    {
      "to": true,
      "class": {
        "root": "has-focus-visible:ring-2 has-focus-visible:ring-primary"
      }
    }
  ],
  "defaultVariants": {
    "variant": "outline",
    "highlightColor": "primary",
    "spotlightColor": "primary"
  }
};

const _sfc_main$3 = /*@__PURE__*/Object.assign({ inheritAttrs: false }, {
  __name: 'PageCard',
  __ssrInlineRender: true,
  props: {
  as: { type: null, required: false },
  icon: { type: null, required: false },
  title: { type: String, required: false },
  description: { type: String, required: false },
  orientation: { type: null, required: false, default: "vertical" },
  reverse: { type: Boolean, required: false },
  highlight: { type: Boolean, required: false },
  highlightColor: { type: null, required: false },
  spotlight: { type: Boolean, required: false },
  spotlightColor: { type: null, required: false },
  variant: { type: null, required: false },
  to: { type: null, required: false },
  target: { type: [String, Object, null], required: false },
  onClick: { type: Function, required: false },
  class: { type: null, required: false },
  ui: { type: null, required: false }
},
  setup(__props) {


const props = __props;
const slots = useSlots();
const cardRef = ref();
const motionControl = pausableFilter();
const appConfig = useAppConfig();
const { elementX, elementY } = useMouseInElement(cardRef, {
  eventFilter: motionControl.eventFilter
});
const spotlight = computed(() => props.spotlight && (elementX.value !== 0 || elementY.value !== 0));
watch(() => props.spotlight, (value) => {
  if (value) {
    motionControl.resume();
  } else {
    motionControl.pause();
  }
}, { immediate: true });
const ui = computed(() => tv({ extend: tv(theme$1), ...appConfig.ui?.pageCard || {} })({
  orientation: props.orientation,
  reverse: props.reverse,
  variant: props.variant,
  to: !!props.to || !!props.onClick,
  title: !!props.title || !!slots.title,
  highlight: props.highlight,
  highlightColor: props.highlightColor,
  spotlight: spotlight.value,
  spotlightColor: props.spotlightColor
}));
const ariaLabel = computed(() => {
  const slotText = slots.title && getSlotChildrenText(slots.title());
  return (slotText || props.title || "Card link").trim();
});

return (_ctx, _push, _parent, _attrs) => {
  _push(ssrRenderComponent(unref(Primitive), mergeProps({
    ref_key: "cardRef",
    ref: cardRef,
    as: __props.as,
    "data-orientation": __props.orientation,
    "data-slot": "root",
    class: ui.value.root({ class: [props.ui?.root, props.class] }),
    style: spotlight.value && { '--spotlight-x': `${unref(elementX)}px`, '--spotlight-y': `${unref(elementY)}px` },
    onClick: __props.onClick
  }, _attrs), {
    default: withCtx((_, _push, _parent, _scopeId) => {
      if (_push) {
        if (props.spotlight) {
          _push(`<div data-slot="spotlight" class="${
            ssrRenderClass(ui.value.spotlight({ class: props.ui?.spotlight }))
          }"${
            _scopeId
          }></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<div data-slot="container" class="${
          ssrRenderClass(ui.value.container({ class: props.ui?.container }))
        }"${
          _scopeId
        }>`);
        if (!!slots.header || (__props.icon || !!slots.leading) || !!slots.body || (__props.title || !!slots.title) || (__props.description || !!slots.description) || !!slots.footer) {
          _push(`<div data-slot="wrapper" class="${
            ssrRenderClass(ui.value.wrapper({ class: props.ui?.wrapper }))
          }"${
            _scopeId
          }>`);
          if (!!slots.header) {
            _push(`<div data-slot="header" class="${
              ssrRenderClass(ui.value.header({ class: props.ui?.header }))
            }"${
              _scopeId
            }>`);
            ssrRenderSlot(_ctx.$slots, "header", {}, null, _push, _parent, _scopeId);
            _push(`</div>`);
          } else {
            _push(`<!---->`);
          }
          if (__props.icon || !!slots.leading) {
            _push(`<div data-slot="leading" class="${
              ssrRenderClass(ui.value.leading({ class: props.ui?.leading }))
            }"${
              _scopeId
            }>`);
            ssrRenderSlot(_ctx.$slots, "leading", { ui: ui.value }, () => {
              if (__props.icon) {
                _push(ssrRenderComponent(_sfc_main$d, {
                  name: __props.icon,
                  "data-slot": "leadingIcon",
                  class: ui.value.leadingIcon({ class: props.ui?.leadingIcon })
                }, null, _parent, _scopeId));
              } else {
                _push(`<!---->`);
              }
            }, _push, _parent, _scopeId);
            _push(`</div>`);
          } else {
            _push(`<!---->`);
          }
          if (!!slots.body || (__props.title || !!slots.title) || (__props.description || !!slots.description)) {
            _push(`<div data-slot="body" class="${
              ssrRenderClass(ui.value.body({ class: props.ui?.body }))
            }"${
              _scopeId
            }>`);
            ssrRenderSlot(_ctx.$slots, "body", {}, () => {
              if (__props.title || !!slots.title) {
                _push(`<div data-slot="title" class="${
                  ssrRenderClass(ui.value.title({ class: props.ui?.title }))
                }"${
                  _scopeId
                }>`);
                ssrRenderSlot(_ctx.$slots, "title", {}, () => {
                  _push(`${ssrInterpolate(__props.title)}`);
                }, _push, _parent, _scopeId);
                _push(`</div>`);
              } else {
                _push(`<!---->`);
              }
              if (__props.description || !!slots.description) {
                _push(`<div data-slot="description" class="${
                  ssrRenderClass(ui.value.description({ class: props.ui?.description }))
                }"${
                  _scopeId
                }>`);
                ssrRenderSlot(_ctx.$slots, "description", {}, () => {
                  _push(`${ssrInterpolate(__props.description)}`);
                }, _push, _parent, _scopeId);
                _push(`</div>`);
              } else {
                _push(`<!---->`);
              }
            }, _push, _parent, _scopeId);
            _push(`</div>`);
          } else {
            _push(`<!---->`);
          }
          if (!!slots.footer) {
            _push(`<div data-slot="footer" class="${
              ssrRenderClass(ui.value.footer({ class: props.ui?.footer }))
            }"${
              _scopeId
            }>`);
            ssrRenderSlot(_ctx.$slots, "footer", {}, null, _push, _parent, _scopeId);
            _push(`</div>`);
          } else {
            _push(`<!---->`);
          }
          _push(`</div>`);
        } else {
          _push(`<!---->`);
        }
        ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent, _scopeId);
        _push(`</div>`);
        if (__props.to) {
          _push(ssrRenderComponent(_sfc_main$h, mergeProps({ "aria-label": ariaLabel.value }, { to: __props.to, target: __props.target, ..._ctx.$attrs }, {
            class: "focus:outline-none peer",
            raw: ""
          }), {
            default: withCtx((_, _push, _parent, _scopeId) => {
              if (_push) {
                _push(`<span class="absolute inset-0" aria-hidden="true"${_scopeId}></span>`);
              } else {
                return [
                  createVNode("span", {
                    class: "absolute inset-0",
                    "aria-hidden": "true"
                  })
                ]
              }
            }),
            _: 1 /* STABLE */
          }, _parent, _scopeId));
        } else {
          _push(`<!---->`);
        }
      } else {
        return [
          (props.spotlight)
            ? (openBlock(), createBlock("div", {
                key: 0,
                "data-slot": "spotlight",
                class: ui.value.spotlight({ class: props.ui?.spotlight })
              }, null, 2 /* CLASS */))
            : createCommentVNode("v-if", true),
          createVNode("div", {
            "data-slot": "container",
            class: ui.value.container({ class: props.ui?.container })
          }, [
            (!!slots.header || (__props.icon || !!slots.leading) || !!slots.body || (__props.title || !!slots.title) || (__props.description || !!slots.description) || !!slots.footer)
              ? (openBlock(), createBlock("div", {
                  key: 0,
                  "data-slot": "wrapper",
                  class: ui.value.wrapper({ class: props.ui?.wrapper })
                }, [
                  (!!slots.header)
                    ? (openBlock(), createBlock("div", {
                        key: 0,
                        "data-slot": "header",
                        class: ui.value.header({ class: props.ui?.header })
                      }, [
                        renderSlot(_ctx.$slots, "header")
                      ], 2 /* CLASS */))
                    : createCommentVNode("v-if", true),
                  (__props.icon || !!slots.leading)
                    ? (openBlock(), createBlock("div", {
                        key: 1,
                        "data-slot": "leading",
                        class: ui.value.leading({ class: props.ui?.leading })
                      }, [
                        renderSlot(_ctx.$slots, "leading", { ui: ui.value }, () => [
                          (__props.icon)
                            ? (openBlock(), createBlock(_sfc_main$d, {
                                key: 0,
                                name: __props.icon,
                                "data-slot": "leadingIcon",
                                class: ui.value.leadingIcon({ class: props.ui?.leadingIcon })
                              }, null, 8 /* PROPS */, ["name", "class"]))
                            : createCommentVNode("v-if", true)
                        ])
                      ], 2 /* CLASS */))
                    : createCommentVNode("v-if", true),
                  (!!slots.body || (__props.title || !!slots.title) || (__props.description || !!slots.description))
                    ? (openBlock(), createBlock("div", {
                        key: 2,
                        "data-slot": "body",
                        class: ui.value.body({ class: props.ui?.body })
                      }, [
                        renderSlot(_ctx.$slots, "body", {}, () => [
                          (__props.title || !!slots.title)
                            ? (openBlock(), createBlock("div", {
                                key: 0,
                                "data-slot": "title",
                                class: ui.value.title({ class: props.ui?.title })
                              }, [
                                renderSlot(_ctx.$slots, "title", {}, () => [
                                  createTextVNode(toDisplayString(__props.title), 1 /* TEXT */)
                                ])
                              ], 2 /* CLASS */))
                            : createCommentVNode("v-if", true),
                          (__props.description || !!slots.description)
                            ? (openBlock(), createBlock("div", {
                                key: 1,
                                "data-slot": "description",
                                class: ui.value.description({ class: props.ui?.description })
                              }, [
                                renderSlot(_ctx.$slots, "description", {}, () => [
                                  createTextVNode(toDisplayString(__props.description), 1 /* TEXT */)
                                ])
                              ], 2 /* CLASS */))
                            : createCommentVNode("v-if", true)
                        ])
                      ], 2 /* CLASS */))
                    : createCommentVNode("v-if", true),
                  (!!slots.footer)
                    ? (openBlock(), createBlock("div", {
                        key: 3,
                        "data-slot": "footer",
                        class: ui.value.footer({ class: props.ui?.footer })
                      }, [
                        renderSlot(_ctx.$slots, "footer")
                      ], 2 /* CLASS */))
                    : createCommentVNode("v-if", true)
                ], 2 /* CLASS */))
              : createCommentVNode("v-if", true),
            renderSlot(_ctx.$slots, "default")
          ], 2 /* CLASS */),
          (__props.to)
            ? (openBlock(), createBlock(_sfc_main$h, mergeProps({
                key: 1,
                "aria-label": ariaLabel.value
              }, { to: __props.to, target: __props.target, ..._ctx.$attrs }, {
                class: "focus:outline-none peer",
                raw: ""
              }), {
                default: withCtx(() => [
                  createVNode("span", {
                    class: "absolute inset-0",
                    "aria-hidden": "true"
                  })
                ]),
                _: 1 /* STABLE */
              }, 16 /* FULL_PROPS */, ["aria-label"]))
            : createCommentVNode("v-if", true)
        ]
      }
    }),
    _: 3 /* FORWARDED */
  }, _parent));
}
}

});
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext()
  ;(ssrContext.modules || (ssrContext.modules = new Set())).add("node_modules/@nuxt/ui/dist/runtime/components/PageCard.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : undefined
};

const theme = {
  "slots": {
    "root": "group relative flex items-center overflow-hidden gap-(--gap) [--gap:--spacing(16)] [--duration:20s]",
    "content": "flex items-center shrink-0 justify-around gap-(--gap) min-w-max"
  },
  "variants": {
    "orientation": {
      "horizontal": {
        "content": "w-full"
      },
      "vertical": {
        "content": "h-full"
      }
    },
    "pauseOnHover": {
      "true": {
        "content": "group-hover:[animation-play-state:paused]"
      }
    },
    "reverse": {
      "true": {
        "content": "![animation-direction:reverse]"
      }
    },
    "overlay": {
      "true": {
        "root": 'before:absolute before:pointer-events-none before:content-[""] before:z-2 before:from-default before:to-transparent after:absolute after:pointer-events-none after:content-[""] after:z-2 after:from-default after:to-transparent'
      }
    }
  },
  "compoundVariants": [
    {
      "orientation": "horizontal",
      "class": {
        "root": "flex-row",
        "content": "flex-row animate-[marquee_var(--duration)_linear_infinite] rtl:animate-[marquee-rtl_var(--duration)_linear_infinite] backface-hidden"
      }
    },
    {
      "orientation": "horizontal",
      "overlay": true,
      "class": {
        "root": "before:inset-y-0 before:left-0 before:h-full before:w-1/3 before:bg-gradient-to-r after:inset-y-0 after:right-0 after:h-full after:w-1/3 after:bg-gradient-to-l backface-hidden"
      }
    },
    {
      "orientation": "vertical",
      "class": {
        "root": "flex-col",
        "content": "flex-col animate-[marquee-vertical_var(--duration)_linear_infinite] rtl:animate-[marquee-vertical-rtl_var(--duration)_linear_infinite] h-[fit-content] backface-hidden"
      }
    },
    {
      "orientation": "vertical",
      "overlay": true,
      "class": {
        "root": "before:inset-x-0 before:top-0 before:w-full before:h-1/3 before:bg-gradient-to-b after:inset-x-0 after:bottom-0 after:w-full after:h-1/3 after:bg-gradient-to-t backface-hidden"
      }
    }
  ]
};

const _sfc_main$2 = {
  __name: 'Marquee',
  __ssrInlineRender: true,
  props: {
  as: { type: null, required: false },
  pauseOnHover: { type: Boolean, required: false },
  reverse: { type: Boolean, required: false },
  orientation: { type: null, required: false, default: "horizontal" },
  repeat: { type: Number, required: false, default: 4 },
  overlay: { type: Boolean, required: false, default: true },
  class: { type: null, required: false },
  ui: { type: null, required: false }
},
  setup(__props) {

const props = __props;

const appConfig = useAppConfig();
const ui = computed(() => tv({ extend: tv(theme), ...appConfig.ui?.marquee || {} })({
  pauseOnHover: props.pauseOnHover,
  orientation: props.orientation,
  reverse: props.reverse,
  overlay: props.overlay
}));

return (_ctx, _push, _parent, _attrs) => {
  _push(ssrRenderComponent(unref(Primitive), mergeProps({
    as: __props.as,
    "data-orientation": __props.orientation,
    "data-slot": "root",
    class: ui.value.root({ class: [props.ui?.root, props.class] })
  }, _attrs), {
    default: withCtx((_, _push, _parent, _scopeId) => {
      if (_push) {
        _push(`<!--[-->`);
        ssrRenderList(__props.repeat, (i) => {
          _push(`<div data-slot="content" class="${
            ssrRenderClass(ui.value.content({ class: [props.ui?.content] }))
          }"${
            _scopeId
          }>`);
          ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent, _scopeId);
          _push(`</div>`);
        });
        _push(`<!--]-->`);
      } else {
        return [
          (openBlock(true), createBlock(Fragment, null, renderList(__props.repeat, (i) => {
            return (openBlock(), createBlock("div", {
              key: i,
              "data-slot": "content",
              class: ui.value.content({ class: [props.ui?.content] })
            }, [
              renderSlot(_ctx.$slots, "default")
            ], 2 /* CLASS */))
          }), 128 /* KEYED_FRAGMENT */))
        ]
      }
    }),
    _: 3 /* FORWARDED */
  }, _parent));
}
}

};
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext()
  ;(ssrContext.modules || (ssrContext.modules = new Set())).add("node_modules/@nuxt/ui/dist/runtime/components/Marquee.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : undefined
};

const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "Testimonial",
  __ssrInlineRender: true,
  setup(__props) {
    const testimonials = [
      {
        user: {
          name: "Anthony Bettini",
          description: "CEO and founder of VulnCheck",
          avatar: {
            src: "https://media.licdn.com/dms/image/v2/C4E03AQEY3pmXsH8hDg/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1519741249442?e=1746057600&v=beta&t=dvQfBT9ah03MPNy9cnly30ugreeCdxG4nrxV3lwKAC8",
            loading: "lazy"
          }
        },
        quote: "We were using a SaaS service for the docs site, but were left unfulfilled. We put in the effort to do it in house, with UI Pro and not only did we get complimented by a prospect on our site, but they wanted to know our platform."
      },
      {
        user: {
          name: "Yaz Jallad",
          description: "Founder Ninjaparade Digital",
          avatar: {
            src: "https://pbs.twimg.com/profile_images/1824690890222485504/lQ7v1AGt_400x400.jpg",
            loading: "lazy"
          }
        },
        quote: "Wow, Nuxt UI Pro is a total game-changer! I'm seriously impressed with the quality, attention to detail, and the insane variety of components you get. It's like hitting the jackpot for any developer. I've saved countless hours that I would've spent stressing over making my apps look good, with amazing accessible UX,  and instead, I've been able to focus on the real deal – building the app itself. It's an instant buy for me, every single time. No second thoughts!"
      },
      {
        user: {
          name: "Kevin Olson",
          description: "Founder of Fume.app",
          avatar: {
            src: "https://ipx.nuxt.com/f_auto,s_40x40/gh_avatar/acidjazz",
            srcset: "https://ipx.nuxt.com/f_auto,s_80x80/gh_avatar/acidjazz 2x",
            loading: "lazy"
          }
        },
        quote: "Nuxt UI Pro saves 100s of hours of dev and design time while delivering a clean professional look on any device."
      },
      {
        user: {
          name: "Michael Hoffmann",
          description: "Senior Frontend Developer",
          avatar: {
            src: "https://ipx.nuxt.com/f_auto,s_40x40/gh_avatar/mokkapps",
            srcset: "https://ipx.nuxt.com/f_auto,s_80x80/gh_avatar/mokkapps 2x",
            loading: "lazy"
          }
        },
        quote: "I decided to replace my custom-built components with a component library and chose Nuxt UI Pro. It only took me a few hours, and the new UI looks more professional. Integrating the library is easy; the components are well-documented and highly customizable. I can only recommend it; this library is my new choice for new SaaS products."
      },
      {
        user: {
          name: "Harlan Wilton",
          description: "Nuxt core team member",
          avatar: {
            src: "https://ipx.nuxt.com/f_auto,s_40x40/gh_avatar/harlan-zw",
            srcset: "https://ipx.nuxt.com/f_auto,s_80x80/gh_avatar/harlan-zw 2x",
            loading: "lazy"
          }
        },
        quote: "Nuxt UI Pro is my go to component library. Out-of-the-box it handles all of the UI demands I throw at it while looking great. The customisation is really worth thought out, allowing you to override components in a breeze. Always amazed at the improvements dropped in each update as well, the team is doing an amazing job."
      },
      {
        user: {
          name: "Thomas Sanlis",
          description: "Freelance developer and designer",
          avatar: {
            src: "https://pbs.twimg.com/profile_images/1374040164180299791/ACw4G3nZ_400x400.jpg",
            loading: "lazy"
          }
        },
        quote: "I jumped at the chance to buy the Nuxt team's new UI kit as soon as I saw it. While I'm already a fan of Nuxt UI, the pro version takes it to a whole new level and lets me paste entire blocks into all my projects, saving me a ton of time."
      },
      {
        user: {
          name: "Benjamin Code",
          description: "YouTuber and SaaS builder",
          avatar: {
            src: "https://pbs.twimg.com/profile_images/1607353032420769793/I8qQSUfQ_400x400.jpg",
            loading: "lazy"
          }
        },
        quote: "Nuxt UI has allowed me to develop my SaaS without any prior mockups. The design quality of their components and the intelligence of the DX meant that I was able to try many different layouts for my application until I found the perfect UX for my users. Nuxt UI is the ui-kit I would have dreamed of building myself, and Nuxt UI Pro makes things even easier when you want to go further with your SaaS. Kudos to the team."
      },
      {
        user: {
          name: "Estéban Soubiran",
          description: "Web developer and UnJS member",
          avatar: {
            src: "https://pbs.twimg.com/profile_images/1801649350319218689/aS_X_iTm_400x400.jpg",
            loading: "lazy"
          }
        },
        quote: "Nuxt UI Pro is my preferred choice for everything, from a POC to a web platform. It's ready to use out-of-the-box and assists me in crafting pixel-perfect UIs. It saves me a significant amount of time while remaining highly customizable. Give it a try, and you won't be let down."
      }
    ];
    return (_ctx, _push, _parent, _attrs) => {
      const _component_USeparator = _sfc_main$i;
      const _component_UMarquee = _sfc_main$2;
      const _component_UPageCard = _sfc_main$3;
      const _component_UUser = _sfc_main$4;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "flex flex-col gap-4 w-full" }, _attrs))}>`);
      _push(ssrRenderComponent(_component_USeparator, {
        orientation: "horizontal",
        class: "h-48"
      }, null, _parent));
      _push(`<div class="text-center mb-12 lg:mb-16 scroll-reveal"><h2 class="text-3xl lg:text-5xl font-black text-gray-900 dark:text-white mb-4"> Apa kata mereka tentang <span class="bg-linear-to-r from-primary-600 via-secondary-600 to-cyan-600 dark:from-primary-400 dark:via-secondary-400 dark:to-cyan-400 text-transparent bg-clip-text">ogitu.com</span>? </h2><p class="text-gray-600 dark:text-gray-400 text-lg max-w-2xl mx-auto"> Dapatkan pengalaman belanja vape terbaik dengan jaminan kepuasan pelanggan </p></div>`);
      _push(ssrRenderComponent(_component_UMarquee, {
        "pause-on-hover": "",
        overlay: false,
        ui: { root: "[--gap:--spacing(4)]", content: "w-auto py-1" }
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<!--[-->`);
            ssrRenderList(testimonials, (testimonial, index) => {
              _push2(ssrRenderComponent(_component_UPageCard, {
                key: index,
                variant: "subtle",
                description: testimonial.quote,
                ui: {
                  description: "before:content-[open-quote] after:content-[close-quote] line-clamp-3"
                },
                class: "w-64 shrink-0"
              }, {
                footer: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(_component_UUser, mergeProps({ ref_for: true }, testimonial.user, {
                      size: "xl",
                      ui: { description: "line-clamp-1" }
                    }), null, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(
                        _component_UUser,
                        mergeProps({ ref_for: true }, testimonial.user, {
                          size: "xl",
                          ui: { description: "line-clamp-1" }
                        }),
                        null,
                        16
                        /* FULL_PROPS */
                      )
                    ];
                  }
                }),
                _: 2
                /* DYNAMIC */
              }, _parent2, _scopeId));
            });
            _push2(`<!--]-->`);
          } else {
            return [
              (openBlock(), createBlock(
                Fragment,
                null,
                renderList(testimonials, (testimonial, index) => {
                  return createVNode(_component_UPageCard, {
                    key: index,
                    variant: "subtle",
                    description: testimonial.quote,
                    ui: {
                      description: "before:content-[open-quote] after:content-[close-quote] line-clamp-3"
                    },
                    class: "w-64 shrink-0"
                  }, {
                    footer: withCtx(() => [
                      createVNode(
                        _component_UUser,
                        mergeProps({ ref_for: true }, testimonial.user, {
                          size: "xl",
                          ui: { description: "line-clamp-1" }
                        }),
                        null,
                        16
                        /* FULL_PROPS */
                      )
                    ]),
                    _: 2
                    /* DYNAMIC */
                  }, 1032, ["description"]);
                }),
                64
                /* STABLE_FRAGMENT */
              ))
            ];
          }
        }),
        _: 1
        /* STABLE */
      }, _parent));
      _push(ssrRenderComponent(_component_UMarquee, {
        "pause-on-hover": "",
        reverse: "",
        overlay: false,
        ui: { root: "[--gap:--spacing(4)]", content: "w-auto py-1" }
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<!--[-->`);
            ssrRenderList(testimonials, (testimonial, index) => {
              _push2(ssrRenderComponent(_component_UPageCard, {
                key: index,
                variant: "subtle",
                description: testimonial.quote,
                ui: {
                  description: "before:content-[open-quote] after:content-[close-quote] line-clamp-3"
                },
                class: "w-64 shrink-0"
              }, {
                footer: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(_component_UUser, mergeProps({ ref_for: true }, testimonial.user, {
                      size: "xl",
                      ui: { description: "line-clamp-1" }
                    }), null, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(
                        _component_UUser,
                        mergeProps({ ref_for: true }, testimonial.user, {
                          size: "xl",
                          ui: { description: "line-clamp-1" }
                        }),
                        null,
                        16
                        /* FULL_PROPS */
                      )
                    ];
                  }
                }),
                _: 2
                /* DYNAMIC */
              }, _parent2, _scopeId));
            });
            _push2(`<!--]-->`);
          } else {
            return [
              (openBlock(), createBlock(
                Fragment,
                null,
                renderList(testimonials, (testimonial, index) => {
                  return createVNode(_component_UPageCard, {
                    key: index,
                    variant: "subtle",
                    description: testimonial.quote,
                    ui: {
                      description: "before:content-[open-quote] after:content-[close-quote] line-clamp-3"
                    },
                    class: "w-64 shrink-0"
                  }, {
                    footer: withCtx(() => [
                      createVNode(
                        _component_UUser,
                        mergeProps({ ref_for: true }, testimonial.user, {
                          size: "xl",
                          ui: { description: "line-clamp-1" }
                        }),
                        null,
                        16
                        /* FULL_PROPS */
                      )
                    ]),
                    _: 2
                    /* DYNAMIC */
                  }, 1032, ["description"]);
                }),
                64
                /* STABLE_FRAGMENT */
              ))
            ];
          }
        }),
        _: 1
        /* STABLE */
      }, _parent));
      _push(ssrRenderComponent(_component_USeparator, {
        orientation: "horizontal",
        class: "h-48"
      }, null, _parent));
      _push(`</div>`);
    };
  }
});

const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("inertia/components/Testimonial.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};

const siteUrl = "https://ogitu.com";
const siteName = "Ogitu";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "home",
  __ssrInlineRender: true,
  props: {
    categories: {},
    featuredProducts: {},
    bestSellerProducts: {},
    brands: {},
    benefits: {},
    customerRanks: {}
  },
  setup(__props) {
    const props = __props;
    const seo = {
      title: "Ogitu - Marketplace Vape & Rokok Elektrik Terpercaya #1 Indonesia",
      description: "Belanja vape, pod system, mod kit, liquid, dan aksesoris vape terlengkap dengan harga terbaik. Garansi original, gratis ongkir, dan pengiriman cepat ke seluruh Indonesia.",
      keywords: "vape, rokok elektrik, pod system, mod kit, liquid vape, e-liquid, coil, atomizer, vaporizer, toko vape online, jual vape murah, vape indonesia, marketplace vape",
      image: `${siteUrl}/images/og-home.jpg`,
      type: "website"
    };
    const structuredData = computed(() => ({
      "@context": "https://schema.org",
      "@graph": [
        // Organization
        {
          "@type": "Organization",
          "@id": `${siteUrl}/#organization`,
          name: siteName,
          url: siteUrl,
          logo: {
            "@type": "ImageObject",
            url: `${siteUrl}/images/logo.png`,
            width: 200,
            height: 60
          },
          sameAs: [
            "https://www.facebook.com/ogitu.id",
            "https://www.instagram.com/ogitu.id",
            "https://twitter.com/ogitu_id",
            "https://www.tiktok.com/@ogitu.id"
          ],
          contactPoint: {
            "@type": "ContactPoint",
            telephone: "+62-812-3456-7890",
            contactType: "customer service",
            availableLanguage: ["Indonesian", "English"]
          }
        },
        // WebSite with SearchAction
        {
          "@type": "WebSite",
          "@id": `${siteUrl}/#website`,
          url: siteUrl,
          name: siteName,
          description: seo.description,
          publisher: { "@id": `${siteUrl}/#organization` },
          potentialAction: {
            "@type": "SearchAction",
            target: {
              "@type": "EntryPoint",
              urlTemplate: `${siteUrl}/collections?search={search_term_string}`
            },
            "query-input": "required name=search_term_string"
          }
        },
        // WebPage
        {
          "@type": "WebPage",
          "@id": `${siteUrl}/#webpage`,
          url: siteUrl,
          name: seo.title,
          isPartOf: { "@id": `${siteUrl}/#website` },
          about: { "@id": `${siteUrl}/#organization` },
          description: seo.description,
          inLanguage: "id-ID"
        },
        // ItemList for Featured Products
        {
          "@type": "ItemList",
          name: "Produk Pilihan",
          description: "Produk vape terlaris dan terpopuler minggu ini",
          itemListElement: props.featuredProducts.slice(0, 10).map((product, index) => ({
            "@type": "ListItem",
            position: index + 1,
            item: {
              "@type": "Product",
              name: product.name,
              image: product.image,
              url: `${siteUrl}/products/${product.slug}`,
              offers: {
                "@type": "Offer",
                price: product.discountPrice || product.price,
                priceCurrency: "IDR",
                availability: product.stock > 0 ? "https://schema.org/InStock" : "https://schema.org/OutOfStock"
              },
              aggregateRating: product.totalReviews > 0 ? {
                "@type": "AggregateRating",
                ratingValue: product.rating,
                reviewCount: product.totalReviews
              } : void 0
            }
          }))
        },
        // BreadcrumbList
        {
          "@type": "BreadcrumbList",
          itemListElement: [
            {
              "@type": "ListItem",
              position: 1,
              name: "Beranda",
              item: siteUrl
            }
          ]
        }
      ]
    }));
    useScrollReveal();
    const toast = useToast();
    const isAddingToCart = ref(null);
    const isTogglingWishlist = ref(null);
    const getToken = () => {
      const match = document.cookie.match(/XSRF-TOKEN=([^;]+)/);
      return match ? decodeURIComponent(match[1]) : "";
    };
    useHead({
      script: [
        {
          type: "application/ld+json",
          innerHTML: computed(() => JSON.stringify(structuredData.value))
        }
      ]
    });
    const handleAddToCart = async (product) => {
      if (isAddingToCart.value) return;
      isAddingToCart.value = product.id;
      try {
        const response = await fetch("/api/cart", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-Requested-With": "XMLHttpRequest",
            "X-XSRF-TOKEN": getToken()
          },
          credentials: "include",
          body: JSON.stringify({
            productId: product.id,
            quantity: 1
          })
        });
        const data = await response.json();
        if (response.status === 401) {
          toast.warning("Login Diperlukan", "Silakan login untuk menambahkan ke keranjang");
          router.visit("/login");
          return;
        }
        if (data.success) {
          toast.success("Berhasil", data.message || "Produk ditambahkan ke keranjang");
        } else {
          toast.error("Gagal", data.message || "Gagal menambahkan ke keranjang");
        }
      } catch (error) {
        console.error("Add to cart error:", error);
        toast.error("Error", "Terjadi kesalahan saat menambahkan ke keranjang");
      } finally {
        isAddingToCart.value = null;
      }
    };
    const handleAddToWishlist = async (product) => {
      if (isTogglingWishlist.value) return;
      isTogglingWishlist.value = product.id;
      try {
        const response = await fetch("/api/wishlist/toggle", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-Requested-With": "XMLHttpRequest",
            "X-XSRF-TOKEN": getToken()
          },
          credentials: "include",
          body: JSON.stringify({
            productId: product.id
          })
        });
        const data = await response.json();
        if (response.status === 401) {
          toast.warning("Login Diperlukan", "Silakan login untuk menambahkan ke wishlist");
          router.visit("/login");
          return;
        }
        if (data.success) {
          if (data.data?.isWishlisted) {
            toast.success("Berhasil", "Produk ditambahkan ke wishlist");
          } else {
            toast.info("Info", "Produk dihapus dari wishlist");
          }
        } else {
          toast.error("Gagal", data.message || "Gagal memproses wishlist");
        }
      } catch (error) {
        console.error("Toggle wishlist error:", error);
        toast.error("Error", "Terjadi kesalahan saat memproses wishlist");
      } finally {
        isTogglingWishlist.value = null;
      }
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(_sfc_main$j, _attrs, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<!-- SEO Head -->`);
            _push2(ssrRenderComponent(unref(Head), {
              title: seo.title
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<!-- Primary Meta Tags --><meta name="description"${ssrRenderAttr("content", seo.description)}${_scopeId2}><meta name="keywords"${ssrRenderAttr("content", seo.keywords)}${_scopeId2}><meta name="author" content="Ogitu"${_scopeId2}><meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"${_scopeId2}><link rel="canonical"${ssrRenderAttr("href", siteUrl)}${_scopeId2}><!-- Open Graph / Facebook --><meta property="og:type"${ssrRenderAttr("content", seo.type)}${_scopeId2}><meta property="og:url"${ssrRenderAttr("content", siteUrl)}${_scopeId2}><meta property="og:title"${ssrRenderAttr("content", seo.title)}${_scopeId2}><meta property="og:description"${ssrRenderAttr("content", seo.description)}${_scopeId2}><meta property="og:image"${ssrRenderAttr("content", seo.image)}${_scopeId2}><meta property="og:image:width" content="1200"${_scopeId2}><meta property="og:image:height" content="630"${_scopeId2}><meta property="og:site_name"${ssrRenderAttr("content", siteName)}${_scopeId2}><meta property="og:locale" content="id_ID"${_scopeId2}><!-- Twitter --><meta name="twitter:card" content="summary_large_image"${_scopeId2}><meta name="twitter:url"${ssrRenderAttr("content", siteUrl)}${_scopeId2}><meta name="twitter:title"${ssrRenderAttr("content", seo.title)}${_scopeId2}><meta name="twitter:description"${ssrRenderAttr("content", seo.description)}${_scopeId2}><meta name="twitter:image"${ssrRenderAttr("content", seo.image)}${_scopeId2}><meta name="twitter:site" content="@ogitu_id"${_scopeId2}><meta name="twitter:creator" content="@ogitu_id"${_scopeId2}><!-- Additional SEO --><meta name="geo.region" content="ID"${_scopeId2}><meta name="geo.placename" content="Indonesia"${_scopeId2}><meta name="language" content="Indonesian"${_scopeId2}><meta name="revisit-after" content="7 days"${_scopeId2}><meta name="rating" content="general"${_scopeId2}>`);
                } else {
                  return [
                    createCommentVNode(" Primary Meta Tags "),
                    createVNode("meta", {
                      name: "description",
                      content: seo.description
                    }, null, 8, ["content"]),
                    createVNode("meta", {
                      name: "keywords",
                      content: seo.keywords
                    }, null, 8, ["content"]),
                    createVNode("meta", {
                      name: "author",
                      content: "Ogitu"
                    }),
                    createVNode("meta", {
                      name: "robots",
                      content: "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"
                    }),
                    createVNode("link", {
                      rel: "canonical",
                      href: siteUrl
                    }),
                    createCommentVNode(" Open Graph / Facebook "),
                    createVNode("meta", {
                      property: "og:type",
                      content: seo.type
                    }, null, 8, ["content"]),
                    createVNode("meta", {
                      property: "og:url",
                      content: siteUrl
                    }),
                    createVNode("meta", {
                      property: "og:title",
                      content: seo.title
                    }, null, 8, ["content"]),
                    createVNode("meta", {
                      property: "og:description",
                      content: seo.description
                    }, null, 8, ["content"]),
                    createVNode("meta", {
                      property: "og:image",
                      content: seo.image
                    }, null, 8, ["content"]),
                    createVNode("meta", {
                      property: "og:image:width",
                      content: "1200"
                    }),
                    createVNode("meta", {
                      property: "og:image:height",
                      content: "630"
                    }),
                    createVNode("meta", {
                      property: "og:site_name",
                      content: siteName
                    }),
                    createVNode("meta", {
                      property: "og:locale",
                      content: "id_ID"
                    }),
                    createCommentVNode(" Twitter "),
                    createVNode("meta", {
                      name: "twitter:card",
                      content: "summary_large_image"
                    }),
                    createVNode("meta", {
                      name: "twitter:url",
                      content: siteUrl
                    }),
                    createVNode("meta", {
                      name: "twitter:title",
                      content: seo.title
                    }, null, 8, ["content"]),
                    createVNode("meta", {
                      name: "twitter:description",
                      content: seo.description
                    }, null, 8, ["content"]),
                    createVNode("meta", {
                      name: "twitter:image",
                      content: seo.image
                    }, null, 8, ["content"]),
                    createVNode("meta", {
                      name: "twitter:site",
                      content: "@ogitu_id"
                    }),
                    createVNode("meta", {
                      name: "twitter:creator",
                      content: "@ogitu_id"
                    }),
                    createCommentVNode(" Additional SEO "),
                    createVNode("meta", {
                      name: "geo.region",
                      content: "ID"
                    }),
                    createVNode("meta", {
                      name: "geo.placename",
                      content: "Indonesia"
                    }),
                    createVNode("meta", {
                      name: "language",
                      content: "Indonesian"
                    }),
                    createVNode("meta", {
                      name: "revisit-after",
                      content: "7 days"
                    }),
                    createVNode("meta", {
                      name: "rating",
                      content: "general"
                    })
                  ];
                }
              }),
              _: 1
              /* STABLE */
            }, _parent2, _scopeId));
            _push2(`<!-- Global Background Wrapper --><div class="home-page-wrapper min-h-screen"${_scopeId}><!-- Global Glow Orbs --><div class="global-glow-orbs"${_scopeId}><div class="orb-3"${_scopeId}></div></div><!-- Global Grid Pattern --><div class="global-grid-pattern"${_scopeId}></div><!-- Content Sections --><main class="relative z-10"${_scopeId}><!-- Hero Section -->`);
            _push2(ssrRenderComponent(_sfc_main$a, null, null, _parent2, _scopeId));
            _push2(`<!-- Categories Section --><section aria-label="Kategori Produk"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$9, {
              categories: props.categories
            }, null, _parent2, _scopeId));
            _push2(`</section><!-- Featured Products Section --><section aria-label="Produk Pilihan"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$8, {
              products: props.featuredProducts,
              title: "Produk Pilihan",
              subtitle: "Produk terlaris dan terpopuler minggu ini",
              onAddToCart: handleAddToCart,
              onAddToWishlist: handleAddToWishlist
            }, null, _parent2, _scopeId));
            _push2(`</section><!-- Benefits Section --><section aria-label="Keuntungan Belanja"${_scopeId}>`);
            _push2(ssrRenderComponent(HomeBenefits, {
              benefits: props.benefits
            }, null, _parent2, _scopeId));
            _push2(`</section><!-- Brands Section --><section aria-label="Brand Partner"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$6, {
              brands: props.brands
            }, null, _parent2, _scopeId));
            _push2(`</section><!-- Testimonial & CTA Section --><section aria-label="Testimoni Pelanggan"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$1, null, null, _parent2, _scopeId));
            _push2(`</section><section aria-label="Ajakan Bergabung"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$5, { ranks: __props.customerRanks }, null, _parent2, _scopeId));
            _push2(`</section></main></div>`);
          } else {
            return [
              createCommentVNode(" SEO Head "),
              createVNode(unref(Head), {
                title: seo.title
              }, {
                default: withCtx(() => [
                  createCommentVNode(" Primary Meta Tags "),
                  createVNode("meta", {
                    name: "description",
                    content: seo.description
                  }, null, 8, ["content"]),
                  createVNode("meta", {
                    name: "keywords",
                    content: seo.keywords
                  }, null, 8, ["content"]),
                  createVNode("meta", {
                    name: "author",
                    content: "Ogitu"
                  }),
                  createVNode("meta", {
                    name: "robots",
                    content: "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"
                  }),
                  createVNode("link", {
                    rel: "canonical",
                    href: siteUrl
                  }),
                  createCommentVNode(" Open Graph / Facebook "),
                  createVNode("meta", {
                    property: "og:type",
                    content: seo.type
                  }, null, 8, ["content"]),
                  createVNode("meta", {
                    property: "og:url",
                    content: siteUrl
                  }),
                  createVNode("meta", {
                    property: "og:title",
                    content: seo.title
                  }, null, 8, ["content"]),
                  createVNode("meta", {
                    property: "og:description",
                    content: seo.description
                  }, null, 8, ["content"]),
                  createVNode("meta", {
                    property: "og:image",
                    content: seo.image
                  }, null, 8, ["content"]),
                  createVNode("meta", {
                    property: "og:image:width",
                    content: "1200"
                  }),
                  createVNode("meta", {
                    property: "og:image:height",
                    content: "630"
                  }),
                  createVNode("meta", {
                    property: "og:site_name",
                    content: siteName
                  }),
                  createVNode("meta", {
                    property: "og:locale",
                    content: "id_ID"
                  }),
                  createCommentVNode(" Twitter "),
                  createVNode("meta", {
                    name: "twitter:card",
                    content: "summary_large_image"
                  }),
                  createVNode("meta", {
                    name: "twitter:url",
                    content: siteUrl
                  }),
                  createVNode("meta", {
                    name: "twitter:title",
                    content: seo.title
                  }, null, 8, ["content"]),
                  createVNode("meta", {
                    name: "twitter:description",
                    content: seo.description
                  }, null, 8, ["content"]),
                  createVNode("meta", {
                    name: "twitter:image",
                    content: seo.image
                  }, null, 8, ["content"]),
                  createVNode("meta", {
                    name: "twitter:site",
                    content: "@ogitu_id"
                  }),
                  createVNode("meta", {
                    name: "twitter:creator",
                    content: "@ogitu_id"
                  }),
                  createCommentVNode(" Additional SEO "),
                  createVNode("meta", {
                    name: "geo.region",
                    content: "ID"
                  }),
                  createVNode("meta", {
                    name: "geo.placename",
                    content: "Indonesia"
                  }),
                  createVNode("meta", {
                    name: "language",
                    content: "Indonesian"
                  }),
                  createVNode("meta", {
                    name: "revisit-after",
                    content: "7 days"
                  }),
                  createVNode("meta", {
                    name: "rating",
                    content: "general"
                  })
                ]),
                _: 1
                /* STABLE */
              }, 8, ["title"]),
              createCommentVNode(" Global Background Wrapper "),
              createVNode("div", { class: "home-page-wrapper min-h-screen" }, [
                createCommentVNode(" Global Glow Orbs "),
                createVNode("div", { class: "global-glow-orbs" }, [
                  createVNode("div", { class: "orb-3" })
                ]),
                createCommentVNode(" Global Grid Pattern "),
                createVNode("div", { class: "global-grid-pattern" }),
                createCommentVNode(" Content Sections "),
                createVNode("main", { class: "relative z-10" }, [
                  createCommentVNode(" Hero Section "),
                  createVNode(_sfc_main$a),
                  createCommentVNode(" Categories Section "),
                  createVNode("section", { "aria-label": "Kategori Produk" }, [
                    createVNode(_sfc_main$9, {
                      categories: props.categories
                    }, null, 8, ["categories"])
                  ]),
                  createCommentVNode(" Featured Products Section "),
                  createVNode("section", { "aria-label": "Produk Pilihan" }, [
                    createVNode(_sfc_main$8, {
                      products: props.featuredProducts,
                      title: "Produk Pilihan",
                      subtitle: "Produk terlaris dan terpopuler minggu ini",
                      onAddToCart: handleAddToCart,
                      onAddToWishlist: handleAddToWishlist
                    }, null, 8, ["products"])
                  ]),
                  createCommentVNode(" Benefits Section "),
                  createVNode("section", { "aria-label": "Keuntungan Belanja" }, [
                    createVNode(HomeBenefits, {
                      benefits: props.benefits
                    }, null, 8, ["benefits"])
                  ]),
                  createCommentVNode(" Brands Section "),
                  createVNode("section", { "aria-label": "Brand Partner" }, [
                    createVNode(_sfc_main$6, {
                      brands: props.brands
                    }, null, 8, ["brands"])
                  ]),
                  createCommentVNode(" Testimonial & CTA Section "),
                  createVNode("section", { "aria-label": "Testimoni Pelanggan" }, [
                    createVNode(_sfc_main$1)
                  ]),
                  createVNode("section", { "aria-label": "Ajakan Bergabung" }, [
                    createVNode(_sfc_main$5, { ranks: __props.customerRanks }, null, 8, ["ranks"])
                  ])
                ])
              ])
            ];
          }
        }),
        _: 1
        /* STABLE */
      }, _parent));
    };
  }
});

const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("inertia/pages/home.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
