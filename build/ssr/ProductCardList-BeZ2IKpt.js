import { _ as _sfc_main$1, a as _sfc_main$3 } from './Button-BBveOjhJ.js';
import { a as _sfc_main$2 } from './Badge-DaOjA2YD.js';
import { defineComponent, unref, mergeProps, withCtx, createVNode, createTextVNode, createCommentVNode, createBlock, openBlock, toDisplayString, useSSRContext } from 'vue';
import { ssrRenderComponent, ssrRenderAttr, ssrInterpolate } from 'vue/server-renderer';
import { Link } from '@inertiajs/vue3';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "ProductCardList",
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
      const _component_UBadge = _sfc_main$2;
      const _component_UButton = _sfc_main$3;
      _push(ssrRenderComponent(unref(Link), mergeProps({
        href: productUrl,
        class: "group bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 overflow-hidden hover:shadow-xl hover:shadow-primary-500/10 transition-all duration-300 block"
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="flex flex-col sm:flex-row"${_scopeId}><!-- Product Image --><div class="relative w-full sm:w-48 lg:w-64 aspect-square sm:aspect-auto sm:h-48 lg:h-56 bg-gray-100 dark:bg-gray-800 overflow-hidden shrink-0"${_scopeId}>`);
            if (__props.product.image) {
              _push2(`<img${ssrRenderAttr("src", __props.product.image)}${ssrRenderAttr("alt", __props.product.name)} class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy"${_scopeId}>`);
            } else {
              _push2(`<div class="w-full h-full flex items-center justify-center"${_scopeId}>`);
              _push2(ssrRenderComponent(_component_UIcon, {
                name: "i-heroicons-photo",
                class: "w-12 h-12 text-gray-300 dark:text-gray-600"
              }, null, _parent2, _scopeId));
              _push2(`</div>`);
            }
            _push2(`<!-- Badge -->`);
            if (__props.product.badge) {
              _push2(`<div class="absolute top-3 left-3"${_scopeId}>`);
              _push2(ssrRenderComponent(_component_UBadge, {
                label: __props.product.badge,
                color: "primary"
              }, null, _parent2, _scopeId));
              _push2(`</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`<!-- Discount Badge -->`);
            if (__props.product.discount > 0) {
              _push2(`<div class="absolute top-3 right-3"${_scopeId}>`);
              _push2(ssrRenderComponent(_component_UBadge, {
                label: `-${__props.product.discount}%`,
                color: "error"
              }, null, _parent2, _scopeId));
              _push2(`</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><!-- Product Info --><div class="flex-1 p-4 lg:p-6 flex flex-col justify-between"${_scopeId}><div${_scopeId}><!-- Name --><h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-primary-500 transition-colors"${_scopeId}>${ssrInterpolate(__props.product.name)}</h3><!-- Rating & Stats --><div class="flex flex-wrap items-center gap-4 mb-3"${_scopeId}><div class="flex items-center gap-1"${_scopeId}>`);
            _push2(ssrRenderComponent(_component_UIcon, {
              name: "i-heroicons-star-solid",
              class: "w-4 h-4 text-yellow-400"
            }, null, _parent2, _scopeId));
            _push2(`<span class="text-sm font-medium text-gray-700 dark:text-gray-300"${_scopeId}>${ssrInterpolate(Number(__props.product.rating || 0).toFixed(1))}</span><span class="text-sm text-gray-400"${_scopeId}>(${ssrInterpolate(__props.product.totalReviews)} ulasan)</span></div><span class="text-sm text-gray-500 dark:text-gray-400"${_scopeId}>${ssrInterpolate(__props.product.totalSold)} terjual </span>`);
            if (__props.product.stock < 10 && __props.product.stock > 0) {
              _push2(ssrRenderComponent(_component_UBadge, {
                label: "Stok Terbatas",
                color: "warning",
                variant: "soft",
                size: "xs"
              }, null, _parent2, _scopeId));
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><!-- Brand -->`);
            if (__props.product.brand) {
              _push2(`<div class="mb-3"${_scopeId}>`);
              _push2(ssrRenderComponent(_component_UBadge, {
                label: __props.product.brand,
                color: "neutral",
                variant: "soft"
              }, null, _parent2, _scopeId));
              _push2(`</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><!-- Price & Actions --><div class="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-gray-100 dark:border-gray-800"${_scopeId}><div${_scopeId}><div class="flex items-baseline gap-2"${_scopeId}><span class="text-xl font-bold text-primary-500"${_scopeId}>${ssrInterpolate(__props.product.formattedPrice)}</span>`);
            if (__props.product.formattedOriginalPrice) {
              _push2(`<span class="text-sm text-gray-400 line-through"${_scopeId}>${ssrInterpolate(__props.product.formattedOriginalPrice)}</span>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div></div><div class="flex gap-2"${_scopeId}>`);
            _push2(ssrRenderComponent(_component_UButton, {
              color: "primary",
              variant: "soft",
              onClick: ($event) => emit("addToWishlist", __props.product)
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_UIcon, {
                    name: "i-heroicons-heart",
                    class: "w-4 h-4"
                  }, null, _parent3, _scopeId2));
                  _push3(` Wishlist `);
                } else {
                  return [
                    createVNode(_component_UIcon, {
                      name: "i-heroicons-heart",
                      class: "w-4 h-4"
                    }),
                    createTextVNode(" Wishlist ")
                  ];
                }
              }),
              _: 1
              /* STABLE */
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_UButton, {
              color: "primary",
              onClick: ($event) => emit("addToCart", __props.product)
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_UIcon, {
                    name: "i-heroicons-shopping-cart",
                    class: "w-4 h-4"
                  }, null, _parent3, _scopeId2));
                  _push3(` Tambah ke Keranjang `);
                } else {
                  return [
                    createVNode(_component_UIcon, {
                      name: "i-heroicons-shopping-cart",
                      class: "w-4 h-4"
                    }),
                    createTextVNode(" Tambah ke Keranjang ")
                  ];
                }
              }),
              _: 1
              /* STABLE */
            }, _parent2, _scopeId));
            _push2(`</div></div></div></div>`);
          } else {
            return [
              createVNode("div", { class: "flex flex-col sm:flex-row" }, [
                createCommentVNode(" Product Image "),
                createVNode("div", { class: "relative w-full sm:w-48 lg:w-64 aspect-square sm:aspect-auto sm:h-48 lg:h-56 bg-gray-100 dark:bg-gray-800 overflow-hidden shrink-0" }, [
                  __props.product.image ? (openBlock(), createBlock("img", {
                    key: 0,
                    src: __props.product.image,
                    alt: __props.product.name,
                    class: "w-full h-full object-cover group-hover:scale-105 transition-transform duration-500",
                    loading: "lazy"
                  }, null, 8, ["src", "alt"])) : (openBlock(), createBlock("div", {
                    key: 1,
                    class: "w-full h-full flex items-center justify-center"
                  }, [
                    createVNode(_component_UIcon, {
                      name: "i-heroicons-photo",
                      class: "w-12 h-12 text-gray-300 dark:text-gray-600"
                    })
                  ])),
                  createCommentVNode(" Badge "),
                  __props.product.badge ? (openBlock(), createBlock("div", {
                    key: 2,
                    class: "absolute top-3 left-3"
                  }, [
                    createVNode(_component_UBadge, {
                      label: __props.product.badge,
                      color: "primary"
                    }, null, 8, ["label"])
                  ])) : createCommentVNode("v-if", true),
                  createCommentVNode(" Discount Badge "),
                  __props.product.discount > 0 ? (openBlock(), createBlock("div", {
                    key: 3,
                    class: "absolute top-3 right-3"
                  }, [
                    createVNode(_component_UBadge, {
                      label: `-${__props.product.discount}%`,
                      color: "error"
                    }, null, 8, ["label"])
                  ])) : createCommentVNode("v-if", true)
                ]),
                createCommentVNode(" Product Info "),
                createVNode("div", { class: "flex-1 p-4 lg:p-6 flex flex-col justify-between" }, [
                  createVNode("div", null, [
                    createCommentVNode(" Name "),
                    createVNode(
                      "h3",
                      { class: "text-lg font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-primary-500 transition-colors" },
                      toDisplayString(__props.product.name),
                      1
                      /* TEXT */
                    ),
                    createCommentVNode(" Rating & Stats "),
                    createVNode("div", { class: "flex flex-wrap items-center gap-4 mb-3" }, [
                      createVNode("div", { class: "flex items-center gap-1" }, [
                        createVNode(_component_UIcon, {
                          name: "i-heroicons-star-solid",
                          class: "w-4 h-4 text-yellow-400"
                        }),
                        createVNode(
                          "span",
                          { class: "text-sm font-medium text-gray-700 dark:text-gray-300" },
                          toDisplayString(Number(__props.product.rating || 0).toFixed(1)),
                          1
                          /* TEXT */
                        ),
                        createVNode(
                          "span",
                          { class: "text-sm text-gray-400" },
                          "(" + toDisplayString(__props.product.totalReviews) + " ulasan)",
                          1
                          /* TEXT */
                        )
                      ]),
                      createVNode(
                        "span",
                        { class: "text-sm text-gray-500 dark:text-gray-400" },
                        toDisplayString(__props.product.totalSold) + " terjual ",
                        1
                        /* TEXT */
                      ),
                      __props.product.stock < 10 && __props.product.stock > 0 ? (openBlock(), createBlock(_component_UBadge, {
                        key: 0,
                        label: "Stok Terbatas",
                        color: "warning",
                        variant: "soft",
                        size: "xs"
                      })) : createCommentVNode("v-if", true)
                    ]),
                    createCommentVNode(" Brand "),
                    __props.product.brand ? (openBlock(), createBlock("div", {
                      key: 0,
                      class: "mb-3"
                    }, [
                      createVNode(_component_UBadge, {
                        label: __props.product.brand,
                        color: "neutral",
                        variant: "soft"
                      }, null, 8, ["label"])
                    ])) : createCommentVNode("v-if", true)
                  ]),
                  createCommentVNode(" Price & Actions "),
                  createVNode("div", { class: "flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-gray-100 dark:border-gray-800" }, [
                    createVNode("div", null, [
                      createVNode("div", { class: "flex items-baseline gap-2" }, [
                        createVNode(
                          "span",
                          { class: "text-xl font-bold text-primary-500" },
                          toDisplayString(__props.product.formattedPrice),
                          1
                          /* TEXT */
                        ),
                        __props.product.formattedOriginalPrice ? (openBlock(), createBlock(
                          "span",
                          {
                            key: 0,
                            class: "text-sm text-gray-400 line-through"
                          },
                          toDisplayString(__props.product.formattedOriginalPrice),
                          1
                          /* TEXT */
                        )) : createCommentVNode("v-if", true)
                      ])
                    ]),
                    createVNode("div", { class: "flex gap-2" }, [
                      createVNode(_component_UButton, {
                        color: "primary",
                        variant: "soft",
                        onClick: ($event) => emit("addToWishlist", __props.product)
                      }, {
                        default: withCtx(() => [
                          createVNode(_component_UIcon, {
                            name: "i-heroicons-heart",
                            class: "w-4 h-4"
                          }),
                          createTextVNode(" Wishlist ")
                        ]),
                        _: 1
                        /* STABLE */
                      }, 8, ["onClick"]),
                      createVNode(_component_UButton, {
                        color: "primary",
                        onClick: ($event) => emit("addToCart", __props.product)
                      }, {
                        default: withCtx(() => [
                          createVNode(_component_UIcon, {
                            name: "i-heroicons-shopping-cart",
                            class: "w-4 h-4"
                          }),
                          createTextVNode(" Tambah ke Keranjang ")
                        ]),
                        _: 1
                        /* STABLE */
                      }, 8, ["onClick"])
                    ])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("inertia/components/ProductCardList.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as _ };
