import { _ as _sfc_main$1, a as _sfc_main$2 } from './Button-BBveOjhJ.js';
import { defineComponent, unref, mergeProps, withCtx, createVNode, createTextVNode, createCommentVNode, createBlock, openBlock, toDisplayString, withModifiers, useSSRContext } from 'vue';
import { ssrRenderComponent, ssrRenderAttr, ssrInterpolate } from 'vue/server-renderer';
import { Link } from '@inertiajs/vue3';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "ProductCard",
  __ssrInlineRender: true,
  props: {
    product: {}
  },
  emits: ["addToCart", "addToWishlist"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const productUrl = `/products/${props.product.slug}`;
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UIcon = _sfc_main$1;
      const _component_UButton = _sfc_main$2;
      _push(ssrRenderComponent(unref(Link), mergeProps({
        href: productUrl,
        class: "group relative bg-white dark:bg-gray-900/80 rounded-2xl sm:rounded-3xl overflow-hidden border border-gray-200/80 dark:border-gray-800/80 hover:border-primary-400/50 dark:hover:border-primary-500/50 shadow-md sm:shadow-lg shadow-gray-200/50 dark:shadow-black/20 hover:shadow-xl sm:hover:shadow-2xl hover:shadow-primary-500/20 dark:hover:shadow-primary-500/10 transition-all duration-500 ease-out active:scale-[0.98] sm:hover:-translate-y-2 cursor-pointer block"
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<!-- Glow Effect on Hover --><div class="absolute inset-0 bg-linear-to-br from-primary-500/0 via-secondary-500/0 to-pink-500/0 group-hover:from-primary-500/5 group-hover:via-secondary-500/5 group-hover:to-pink-500/5 transition-all duration-500 pointer-events-none"${_scopeId}></div><!-- Product Image --><div class="relative aspect-square bg-linear-to-br from-gray-100 via-gray-50 to-white dark:from-gray-800 dark:via-gray-850 dark:to-gray-900 flex items-center justify-center overflow-hidden"${_scopeId}><!-- Animated Background Pattern --><div class="absolute inset-0 opacity-30 dark:opacity-20"${_scopeId}><div class="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(var(--color-primary-500),0.1)_0%,transparent_50%)] group-hover:scale-150 transition-transform duration-700"${_scopeId}></div></div><!-- Product Image --><div class="relative z-10 w-full h-full"${_scopeId}>`);
            if (__props.product.image) {
              _push2(`<img${ssrRenderAttr("src", __props.product.image)}${ssrRenderAttr("alt", __props.product.name)} class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" loading="lazy"${_scopeId}>`);
            } else {
              _push2(`<div class="w-full h-full flex items-center justify-center"${_scopeId}>`);
              _push2(ssrRenderComponent(_component_UIcon, {
                name: "i-lucide-package",
                class: "w-16 h-16 text-gray-300 dark:text-gray-600"
              }, null, _parent2, _scopeId));
              _push2(`</div>`);
            }
            _push2(`</div><!-- Badge -->`);
            if (__props.product.badge) {
              _push2(`<div class="absolute top-2 right-2 sm:top-3 sm:right-3 px-2 sm:px-3 py-1 sm:py-1.5 bg-linear-to-r from-primary-500 to-secondary-500 text-white text-[10px] sm:text-xs font-bold rounded-full shadow-lg shadow-primary-500/30"${_scopeId}>${ssrInterpolate(__props.product.badge)}</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`<!-- Discount Badge -->`);
            if (__props.product.discount > 0 && !__props.product.badge) {
              _push2(`<div class="absolute top-2 right-2 sm:top-3 sm:right-3 px-2 sm:px-3 py-1 sm:py-1.5 bg-red-500 text-white text-[10px] sm:text-xs font-bold rounded-full shadow-lg shadow-red-500/30"${_scopeId}> -${ssrInterpolate(__props.product.discount)}% </div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`<!-- Wishlist Button --><button class="absolute top-2 left-2 sm:top-3 sm:left-3 bg-white/95 dark:bg-gray-800/95 backdrop-blur-md rounded-full p-1.5 sm:p-2 sm:opacity-0 sm:-translate-x-2 sm:group-hover:opacity-100 sm:group-hover:translate-x-0 transition-all duration-300 hover:scale-110 active:bg-red-500 sm:hover:bg-red-500 active:text-white sm:hover:text-white shadow-md sm:shadow-lg"${_scopeId}>`);
            _push2(ssrRenderComponent(_component_UIcon, {
              name: "i-lucide-heart",
              class: "w-4 h-4 sm:w-5 sm:h-5"
            }, null, _parent2, _scopeId));
            _push2(`</button><!-- Quick View Button --><div class="hidden sm:block absolute inset-x-4 bottom-4 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 delay-75"${_scopeId}>`);
            _push2(ssrRenderComponent(_component_UButton, {
              block: "",
              variant: "solid",
              color: "white",
              size: "sm",
              class: "backdrop-blur-md shadow-xl"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_UIcon, {
                    name: "i-lucide-eye",
                    class: "w-4 h-4"
                  }, null, _parent3, _scopeId2));
                  _push3(` Quick View `);
                } else {
                  return [
                    createVNode(_component_UIcon, {
                      name: "i-lucide-eye",
                      class: "w-4 h-4"
                    }),
                    createTextVNode(" Quick View ")
                  ];
                }
              }),
              _: 1
              /* STABLE */
            }, _parent2, _scopeId));
            _push2(`</div></div><!-- Product Info --><div class="p-3 sm:p-4 lg:p-5 space-y-2 sm:space-y-3"${_scopeId}><!-- Product Name --><h3 class="font-bold text-gray-900 dark:text-white line-clamp-2 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors text-xs sm:text-sm lg:text-base leading-tight min-h-10 sm:min-h-0"${_scopeId}>${ssrInterpolate(__props.product.name)}</h3><!-- Rating & Sold --><div class="flex flex-wrap items-center gap-1.5 sm:gap-3"${_scopeId}><div class="flex items-center gap-1 sm:gap-1.5 px-1.5 sm:px-2 py-0.5 sm:py-1 bg-yellow-50 dark:bg-yellow-500/10 rounded-full"${_scopeId}>`);
            _push2(ssrRenderComponent(_component_UIcon, {
              name: "i-lucide-star",
              class: "w-3 h-3 sm:w-4 sm:h-4 text-yellow-500"
            }, null, _parent2, _scopeId));
            _push2(`<span class="text-xs sm:text-sm font-bold text-yellow-700 dark:text-yellow-400"${_scopeId}>${ssrInterpolate(Number(__props.product.rating || 0).toFixed(1))}</span></div><span class="text-[10px] sm:text-xs text-gray-500 dark:text-gray-400 flex items-center gap-0.5 sm:gap-1"${_scopeId}>`);
            _push2(ssrRenderComponent(_component_UIcon, {
              name: "i-lucide-shopping-bag",
              class: "w-2.5 h-2.5 sm:w-3 sm:h-3 hidden sm:block"
            }, null, _parent2, _scopeId));
            _push2(` ${ssrInterpolate(__props.product.totalSold)} Terjual </span></div><!-- Price --><div class="flex flex-col sm:flex-row sm:items-center gap-0.5 sm:gap-2"${_scopeId}><span class="text-sm sm:text-lg lg:text-xl font-black text-primary-600 dark:text-primary-400"${_scopeId}>${ssrInterpolate(__props.product.formattedPrice)}</span>`);
            if (__props.product.formattedOriginalPrice) {
              _push2(`<span class="text-[10px] sm:text-xs text-gray-400 line-through"${_scopeId}>${ssrInterpolate(__props.product.formattedOriginalPrice)}</span>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><!-- Add to Cart Button -->`);
            _push2(ssrRenderComponent(_component_UButton, {
              block: "",
              size: "sm",
              class: "mt-1 sm:mt-2 font-semibold group/btn overflow-hidden relative text-xs sm:text-sm",
              onClick: ($event) => emit("addToCart", __props.product)
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<span class="relative z-10 flex items-center justify-center gap-1 sm:gap-2"${_scopeId2}>`);
                  _push3(ssrRenderComponent(_component_UIcon, {
                    name: "i-lucide-shopping-cart",
                    class: "w-3.5 h-3.5 sm:w-4 sm:h-4 group-hover/btn:animate-bounce"
                  }, null, _parent3, _scopeId2));
                  _push3(`<span class="hidden sm:inline"${_scopeId2}>Tambah Keranjang</span><span class="sm:hidden"${_scopeId2}>+ Keranjang</span></span>`);
                } else {
                  return [
                    createVNode("span", { class: "relative z-10 flex items-center justify-center gap-1 sm:gap-2" }, [
                      createVNode(_component_UIcon, {
                        name: "i-lucide-shopping-cart",
                        class: "w-3.5 h-3.5 sm:w-4 sm:h-4 group-hover/btn:animate-bounce"
                      }),
                      createVNode("span", { class: "hidden sm:inline" }, "Tambah Keranjang"),
                      createVNode("span", { class: "sm:hidden" }, "+ Keranjang")
                    ])
                  ];
                }
              }),
              _: 1
              /* STABLE */
            }, _parent2, _scopeId));
            _push2(`</div><!-- Corner Accent --><div class="absolute -bottom-2 -right-2 w-20 h-20 bg-linear-to-br from-primary-500/10 to-secondary-500/10 dark:from-primary-500/5 dark:to-secondary-500/5 rounded-full blur-xl group-hover:scale-150 transition-transform duration-500"${_scopeId}></div>`);
          } else {
            return [
              createCommentVNode(" Glow Effect on Hover "),
              createVNode("div", { class: "absolute inset-0 bg-linear-to-br from-primary-500/0 via-secondary-500/0 to-pink-500/0 group-hover:from-primary-500/5 group-hover:via-secondary-500/5 group-hover:to-pink-500/5 transition-all duration-500 pointer-events-none" }),
              createCommentVNode(" Product Image "),
              createVNode("div", { class: "relative aspect-square bg-linear-to-br from-gray-100 via-gray-50 to-white dark:from-gray-800 dark:via-gray-850 dark:to-gray-900 flex items-center justify-center overflow-hidden" }, [
                createCommentVNode(" Animated Background Pattern "),
                createVNode("div", { class: "absolute inset-0 opacity-30 dark:opacity-20" }, [
                  createVNode("div", { class: "absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(var(--color-primary-500),0.1)_0%,transparent_50%)] group-hover:scale-150 transition-transform duration-700" })
                ]),
                createCommentVNode(" Product Image "),
                createVNode("div", { class: "relative z-10 w-full h-full" }, [
                  __props.product.image ? (openBlock(), createBlock("img", {
                    key: 0,
                    src: __props.product.image,
                    alt: __props.product.name,
                    class: "w-full h-full object-cover group-hover:scale-110 transition-transform duration-500",
                    loading: "lazy"
                  }, null, 8, ["src", "alt"])) : (openBlock(), createBlock("div", {
                    key: 1,
                    class: "w-full h-full flex items-center justify-center"
                  }, [
                    createVNode(_component_UIcon, {
                      name: "i-lucide-package",
                      class: "w-16 h-16 text-gray-300 dark:text-gray-600"
                    })
                  ]))
                ]),
                createCommentVNode(" Badge "),
                __props.product.badge ? (openBlock(), createBlock(
                  "div",
                  {
                    key: 0,
                    class: "absolute top-2 right-2 sm:top-3 sm:right-3 px-2 sm:px-3 py-1 sm:py-1.5 bg-linear-to-r from-primary-500 to-secondary-500 text-white text-[10px] sm:text-xs font-bold rounded-full shadow-lg shadow-primary-500/30"
                  },
                  toDisplayString(__props.product.badge),
                  1
                  /* TEXT */
                )) : createCommentVNode("v-if", true),
                createCommentVNode(" Discount Badge "),
                __props.product.discount > 0 && !__props.product.badge ? (openBlock(), createBlock(
                  "div",
                  {
                    key: 1,
                    class: "absolute top-2 right-2 sm:top-3 sm:right-3 px-2 sm:px-3 py-1 sm:py-1.5 bg-red-500 text-white text-[10px] sm:text-xs font-bold rounded-full shadow-lg shadow-red-500/30"
                  },
                  " -" + toDisplayString(__props.product.discount) + "% ",
                  1
                  /* TEXT */
                )) : createCommentVNode("v-if", true),
                createCommentVNode(" Wishlist Button "),
                createVNode("button", {
                  class: "absolute top-2 left-2 sm:top-3 sm:left-3 bg-white/95 dark:bg-gray-800/95 backdrop-blur-md rounded-full p-1.5 sm:p-2 sm:opacity-0 sm:-translate-x-2 sm:group-hover:opacity-100 sm:group-hover:translate-x-0 transition-all duration-300 hover:scale-110 active:bg-red-500 sm:hover:bg-red-500 active:text-white sm:hover:text-white shadow-md sm:shadow-lg",
                  onClick: withModifiers(($event) => emit("addToWishlist", __props.product), ["stop"])
                }, [
                  createVNode(_component_UIcon, {
                    name: "i-lucide-heart",
                    class: "w-4 h-4 sm:w-5 sm:h-5"
                  })
                ], 8, ["onClick"]),
                createCommentVNode(" Quick View Button "),
                createVNode("div", { class: "hidden sm:block absolute inset-x-4 bottom-4 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 delay-75" }, [
                  createVNode(_component_UButton, {
                    block: "",
                    variant: "solid",
                    color: "white",
                    size: "sm",
                    class: "backdrop-blur-md shadow-xl"
                  }, {
                    default: withCtx(() => [
                      createVNode(_component_UIcon, {
                        name: "i-lucide-eye",
                        class: "w-4 h-4"
                      }),
                      createTextVNode(" Quick View ")
                    ]),
                    _: 1
                    /* STABLE */
                  })
                ])
              ]),
              createCommentVNode(" Product Info "),
              createVNode("div", { class: "p-3 sm:p-4 lg:p-5 space-y-2 sm:space-y-3" }, [
                createCommentVNode(" Product Name "),
                createVNode(
                  "h3",
                  { class: "font-bold text-gray-900 dark:text-white line-clamp-2 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors text-xs sm:text-sm lg:text-base leading-tight min-h-10 sm:min-h-0" },
                  toDisplayString(__props.product.name),
                  1
                  /* TEXT */
                ),
                createCommentVNode(" Rating & Sold "),
                createVNode("div", { class: "flex flex-wrap items-center gap-1.5 sm:gap-3" }, [
                  createVNode("div", { class: "flex items-center gap-1 sm:gap-1.5 px-1.5 sm:px-2 py-0.5 sm:py-1 bg-yellow-50 dark:bg-yellow-500/10 rounded-full" }, [
                    createVNode(_component_UIcon, {
                      name: "i-lucide-star",
                      class: "w-3 h-3 sm:w-4 sm:h-4 text-yellow-500"
                    }),
                    createVNode(
                      "span",
                      { class: "text-xs sm:text-sm font-bold text-yellow-700 dark:text-yellow-400" },
                      toDisplayString(Number(__props.product.rating || 0).toFixed(1)),
                      1
                      /* TEXT */
                    )
                  ]),
                  createVNode("span", { class: "text-[10px] sm:text-xs text-gray-500 dark:text-gray-400 flex items-center gap-0.5 sm:gap-1" }, [
                    createVNode(_component_UIcon, {
                      name: "i-lucide-shopping-bag",
                      class: "w-2.5 h-2.5 sm:w-3 sm:h-3 hidden sm:block"
                    }),
                    createTextVNode(
                      " " + toDisplayString(__props.product.totalSold) + " Terjual ",
                      1
                      /* TEXT */
                    )
                  ])
                ]),
                createCommentVNode(" Price "),
                createVNode("div", { class: "flex flex-col sm:flex-row sm:items-center gap-0.5 sm:gap-2" }, [
                  createVNode(
                    "span",
                    { class: "text-sm sm:text-lg lg:text-xl font-black text-primary-600 dark:text-primary-400" },
                    toDisplayString(__props.product.formattedPrice),
                    1
                    /* TEXT */
                  ),
                  __props.product.formattedOriginalPrice ? (openBlock(), createBlock(
                    "span",
                    {
                      key: 0,
                      class: "text-[10px] sm:text-xs text-gray-400 line-through"
                    },
                    toDisplayString(__props.product.formattedOriginalPrice),
                    1
                    /* TEXT */
                  )) : createCommentVNode("v-if", true)
                ]),
                createCommentVNode(" Add to Cart Button "),
                createVNode(_component_UButton, {
                  block: "",
                  size: "sm",
                  class: "mt-1 sm:mt-2 font-semibold group/btn overflow-hidden relative text-xs sm:text-sm",
                  onClick: withModifiers(($event) => emit("addToCart", __props.product), ["stop"])
                }, {
                  default: withCtx(() => [
                    createVNode("span", { class: "relative z-10 flex items-center justify-center gap-1 sm:gap-2" }, [
                      createVNode(_component_UIcon, {
                        name: "i-lucide-shopping-cart",
                        class: "w-3.5 h-3.5 sm:w-4 sm:h-4 group-hover/btn:animate-bounce"
                      }),
                      createVNode("span", { class: "hidden sm:inline" }, "Tambah Keranjang"),
                      createVNode("span", { class: "sm:hidden" }, "+ Keranjang")
                    ])
                  ]),
                  _: 1
                  /* STABLE */
                }, 8, ["onClick"])
              ]),
              createCommentVNode(" Corner Accent "),
              createVNode("div", { class: "absolute -bottom-2 -right-2 w-20 h-20 bg-linear-to-br from-primary-500/10 to-secondary-500/10 dark:from-primary-500/5 dark:to-secondary-500/5 rounded-full blur-xl group-hover:scale-150 transition-transform duration-500" })
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("inertia/components/ProductCard.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as _ };
