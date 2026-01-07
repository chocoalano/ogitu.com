import { defineComponent, mergeProps, unref, withCtx, createTextVNode, toDisplayString, useSSRContext, ref, computed, createBlock, createCommentVNode, openBlock, createVNode, watch, onMounted } from 'vue';
import { ssrRenderAttrs, ssrRenderList, ssrRenderComponent, ssrInterpolate, ssrRenderAttr, ssrRenderClass, ssrRenderStyle, ssrIncludeBooleanAttr } from 'vue/server-renderer';
import { Link, router, usePage } from '@inertiajs/vue3';
import { c as useWishlist, u as useCart, _ as _sfc_main$g } from './default-pjkA2Ka0.js';
import { _ as _sfc_main$b, a as _sfc_main$c } from './Button-BTdvmZ8N.js';
import { b as _export_sfc, a as _sfc_main$d, u as useToast } from './Badge-CQlYH3Fo.js';
import { _ as _sfc_main$f } from './Carousel-DO4g9mgK.js';
import { _ as _sfc_main$e } from './ProductCard-Dppblc24.js';
import { useSeoMeta, useHead } from '@unhead/vue';
import 'reka-ui';
import './virtual_nuxt-ui-plugins-CrG8Uaxr.js';
import '@unhead/vue/client';
import 'tailwindcss/colors';
import 'hookable';
import '@vueuse/core';
import 'defu';
import 'ohash/utils';
import './Modal-VctJV7vb.js';
import 'vaul-vue';
import './DropdownMenu-Zcq6i1qV.js';
import 'reka-ui/namespaced';
import './Checkbox-DCS-_c5K.js';
import 'tailwind-variants';
import '@iconify/vue';
import 'ufo';
import 'embla-carousel-vue';

const _sfc_main$a = /* @__PURE__ */ defineComponent({
  __name: "ProductBreadcrumb",
  __ssrInlineRender: true,
  props: {
    items: {}
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UIcon = _sfc_main$b;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800" }, _attrs))}><div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3"><nav class="flex items-center gap-2 text-sm overflow-x-auto"><!--[-->`);
      ssrRenderList(__props.items, (item, index) => {
        _push(`<!--[-->`);
        if (item.href !== "#") {
          _push(ssrRenderComponent(unref(Link), {
            href: item.href,
            class: "text-gray-500 dark:text-gray-400 hover:text-primary-500 transition-colors whitespace-nowrap"
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`${ssrInterpolate(item.label)}`);
              } else {
                return [
                  createTextVNode(
                    toDisplayString(item.label),
                    1
                    /* TEXT */
                  )
                ];
              }
            }),
            _: 2
            /* DYNAMIC */
          }, _parent));
        } else {
          _push(`<span class="text-gray-900 dark:text-white font-medium line-clamp-1">${ssrInterpolate(item.label)}</span>`);
        }
        if (index < __props.items.length - 1) {
          _push(ssrRenderComponent(_component_UIcon, {
            name: "i-lucide-chevron-right",
            class: "w-4 h-4 text-gray-400 shrink-0"
          }, null, _parent));
        } else {
          _push(`<!---->`);
        }
        _push(`<!--]-->`);
      });
      _push(`<!--]--></nav></div></div>`);
    };
  }
});

const _sfc_setup$a = _sfc_main$a.setup;
_sfc_main$a.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("inertia/components/product/ProductBreadcrumb.vue");
  return _sfc_setup$a ? _sfc_setup$a(props, ctx) : void 0;
};

const _sfc_main$9 = /* @__PURE__ */ defineComponent({
  __name: "ProductGallery",
  __ssrInlineRender: true,
  props: {
    images: {},
    productName: {},
    badge: {},
    discount: {}
  },
  setup(__props) {
    const props = __props;
    const selectedIndex = ref(0);
    const isZoomed = ref(false);
    const zoomPosition = ref({ x: 0, y: 0 });
    const getImageUrl = (url) => {
      if (!url) return "https://placehold.co/600x600/1a1a2e/ffffff?text=No+Image";
      if (url.startsWith("http://") || url.startsWith("https://")) return url;
      return url;
    };
    const currentImage = computed(() => {
      const image = props.images[selectedIndex.value];
      return {
        ...image,
        url: getImageUrl(image?.url)
      };
    });
    const thumbnails = computed(
      () => props.images.map((img) => ({
        ...img,
        url: getImageUrl(img.url)
      }))
    );
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UIcon = _sfc_main$b;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "space-y-4" }, _attrs))} data-v-16f14d64><!-- Main Image --><div class="relative aspect-square bg-white dark:bg-gray-900 rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-800 cursor-zoom-in group" data-v-16f14d64><img${ssrRenderAttr("src", currentImage.value.url)}${ssrRenderAttr("alt", currentImage.value.altText || __props.productName)} class="${ssrRenderClass([{ "scale-150": isZoomed.value }, "w-full h-full object-contain transition-transform duration-300"])}" style="${ssrRenderStyle(isZoomed.value ? { transformOrigin: `${zoomPosition.value.x}% ${zoomPosition.value.y}%` } : {})}" data-v-16f14d64><!-- Badges --><div class="absolute top-4 left-4 flex flex-col gap-2" data-v-16f14d64>`);
      if (__props.badge) {
        _push(`<span class="px-3 py-1.5 bg-linear-to-r from-primary-500 to-secondary-500 text-white text-xs font-bold rounded-full shadow-lg" data-v-16f14d64>${ssrInterpolate(__props.badge)}</span>`);
      } else {
        _push(`<!---->`);
      }
      if (__props.discount && __props.discount > 0) {
        _push(`<span class="px-3 py-1.5 bg-red-500 text-white text-xs font-bold rounded-full shadow-lg" data-v-16f14d64> -${ssrInterpolate(__props.discount)}% </span>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><!-- Navigation Arrows -->`);
      if (__props.images.length > 1 && selectedIndex.value > 0) {
        _push(`<button class="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg hover:bg-white dark:hover:bg-gray-700 transition-colors" data-v-16f14d64>`);
        _push(ssrRenderComponent(_component_UIcon, {
          name: "i-lucide-chevron-left",
          class: "w-5 h-5"
        }, null, _parent));
        _push(`</button>`);
      } else {
        _push(`<!---->`);
      }
      if (__props.images.length > 1 && selectedIndex.value < __props.images.length - 1) {
        _push(`<button class="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg hover:bg-white dark:hover:bg-gray-700 transition-colors" data-v-16f14d64>`);
        _push(ssrRenderComponent(_component_UIcon, {
          name: "i-lucide-chevron-right",
          class: "w-5 h-5"
        }, null, _parent));
        _push(`</button>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<!-- Image Counter -->`);
      if (__props.images.length > 1) {
        _push(`<div class="absolute bottom-4 right-4 px-3 py-1.5 bg-black/60 text-white text-xs font-medium rounded-full" data-v-16f14d64>${ssrInterpolate(selectedIndex.value + 1)} / ${ssrInterpolate(__props.images.length)}</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><!-- Thumbnail Images -->`);
      if (__props.images.length > 1) {
        _push(`<div class="flex gap-3 overflow-x-auto pb-2 scrollbar-hide" data-v-16f14d64><!--[-->`);
        ssrRenderList(thumbnails.value, (image, index) => {
          _push(`<button class="${ssrRenderClass([
            selectedIndex.value === index ? "border-primary-500 ring-2 ring-primary-500/30" : "border-gray-200 dark:border-gray-700 hover:border-primary-300",
            "w-20 h-20 shrink-0 rounded-xl overflow-hidden border-2 transition-all duration-200"
          ])}" data-v-16f14d64><img${ssrRenderAttr("src", image.url)}${ssrRenderAttr("alt", image.altText || `${__props.productName} - ${index + 1}`)} class="w-full h-full object-cover" data-v-16f14d64></button>`);
        });
        _push(`<!--]--></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
    };
  }
});

/* unplugin-vue-components disabled */

const _sfc_setup$9 = _sfc_main$9.setup;
_sfc_main$9.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("inertia/components/product/ProductGallery.vue");
  return _sfc_setup$9 ? _sfc_setup$9(props, ctx) : void 0;
};
const ProductGallery = /* @__PURE__ */ _export_sfc(_sfc_main$9, [["__scopeId", "data-v-16f14d64"]]);

const _sfc_main$8 = /* @__PURE__ */ defineComponent({
  __name: "ProductInfoHeader",
  __ssrInlineRender: true,
  props: {
    product: {},
    categoryBreadcrumb: {},
    formattedPrice: {},
    formattedOriginalPrice: {}
  },
  setup(__props) {
    const props = __props;
    const rating = computed(() => Number(props.product.rating) || 0);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UIcon = _sfc_main$b;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "space-y-6" }, _attrs))}><!-- Header --><div class="space-y-3"><!-- Brand & Category --><div class="flex items-center gap-3 flex-wrap">`);
      if (__props.product.brand) {
        _push(`<span class="px-3 py-1 bg-primary-50 dark:bg-primary-950 text-primary-600 dark:text-primary-400 text-xs font-semibold rounded-full">${ssrInterpolate(__props.product.brand)}</span>`);
      } else {
        _push(`<!---->`);
      }
      if (__props.categoryBreadcrumb) {
        _push(ssrRenderComponent(unref(Link), {
          href: __props.categoryBreadcrumb.href,
          class: "text-sm text-gray-500 dark:text-gray-400 hover:text-primary-500 transition-colors"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`${ssrInterpolate(__props.categoryBreadcrumb.name)}`);
            } else {
              return [
                createTextVNode(
                  toDisplayString(__props.categoryBreadcrumb.name),
                  1
                  /* TEXT */
                )
              ];
            }
          }),
          _: 1
          /* STABLE */
        }, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(`</div><!-- Product Name --><h1 class="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white">${ssrInterpolate(__props.product.name)}</h1><!-- Ratings & Stats --><div class="flex items-center gap-4 flex-wrap"><div class="flex items-center gap-1"><div class="flex"><!--[-->`);
      ssrRenderList(5, (i) => {
        _push(ssrRenderComponent(_component_UIcon, {
          key: i,
          name: "i-lucide-star",
          class: [
            "w-4 h-4",
            i <= Math.round(rating.value) ? "text-yellow-400 fill-yellow-400" : "text-gray-300 dark:text-gray-600"
          ]
        }, null, _parent));
      });
      _push(`<!--]--></div><span class="text-sm font-medium text-gray-900 dark:text-white ml-1">${ssrInterpolate(rating.value.toFixed(1))}</span><span class="text-sm text-gray-500 dark:text-gray-400"> (${ssrInterpolate(__props.product.totalReviews)} ulasan) </span></div><span class="text-gray-300 dark:text-gray-700">|</span><span class="text-sm text-gray-500 dark:text-gray-400">${ssrInterpolate(__props.product.totalSold.toLocaleString("id-ID"))} terjual </span></div></div><!-- Price --><div class="space-y-2"><div class="flex items-end gap-3"><span class="text-3xl sm:text-4xl font-bold text-primary-600 dark:text-primary-400">${ssrInterpolate(__props.formattedPrice)}</span>`);
      if (__props.formattedOriginalPrice) {
        _push(`<span class="text-lg text-gray-400 line-through mb-1">${ssrInterpolate(__props.formattedOriginalPrice)}</span>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
      if (__props.product.discount > 0) {
        _push(`<p class="text-sm text-green-600 dark:text-green-400"> Kamu hemat ${ssrInterpolate(__props.product.discount)}%! </p>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div>`);
    };
  }
});

const _sfc_setup$8 = _sfc_main$8.setup;
_sfc_main$8.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("inertia/components/product/ProductInfoHeader.vue");
  return _sfc_setup$8 ? _sfc_setup$8(props, ctx) : void 0;
};

const _sfc_main$7 = /* @__PURE__ */ defineComponent({
  __name: "ProductVariantSelector",
  __ssrInlineRender: true,
  props: {
    variantGroups: {},
    selectedVariant: {}
  },
  emits: ["select"],
  setup(__props, { emit: __emit }) {
    return (_ctx, _push, _parent, _attrs) => {
      if (Object.keys(__props.variantGroups).length > 0) {
        _push(`<div${ssrRenderAttrs(mergeProps({ class: "space-y-4" }, _attrs))}><!--[-->`);
        ssrRenderList(__props.variantGroups, (variants, name) => {
          _push(`<div class="space-y-2"><label class="text-sm font-medium text-gray-700 dark:text-gray-300">${ssrInterpolate(name)}</label><div class="flex flex-wrap gap-2"><!--[-->`);
          ssrRenderList(variants, (variant) => {
            _push(`<button class="${ssrRenderClass([
              __props.selectedVariant?.id === variant.id ? "border-primary-500 bg-primary-50 dark:bg-primary-950 text-primary-600 dark:text-primary-400" : variant.stock > 0 ? "border-gray-200 dark:border-gray-700 hover:border-primary-300 text-gray-700 dark:text-gray-300" : "border-gray-200 dark:border-gray-800 bg-gray-100 dark:bg-gray-900 text-gray-400 cursor-not-allowed",
              "px-4 py-2 rounded-lg border-2 text-sm font-medium transition-all duration-200"
            ])}"${ssrIncludeBooleanAttr(variant.stock <= 0) ? " disabled" : ""}>${ssrInterpolate(variant.value)} `);
            if (variant.stock <= 0) {
              _push(`<span class="text-xs text-red-500 ml-1">(Habis)</span>`);
            } else {
              _push(`<!---->`);
            }
            _push(`</button>`);
          });
          _push(`<!--]--></div></div>`);
        });
        _push(`<!--]--></div>`);
      } else {
        _push(`<!---->`);
      }
    };
  }
});

const _sfc_setup$7 = _sfc_main$7.setup;
_sfc_main$7.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("inertia/components/product/ProductVariantSelector.vue");
  return _sfc_setup$7 ? _sfc_setup$7(props, ctx) : void 0;
};

const _sfc_main$6 = /* @__PURE__ */ defineComponent({
  __name: "ProductQuantitySelector",
  __ssrInlineRender: true,
  props: {
    modelValue: {},
    max: {},
    min: {}
  },
  emits: ["update:modelValue"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const minQty = props.min ?? 1;
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UIcon = _sfc_main$b;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "space-y-2" }, _attrs))} data-v-05f5d141><label class="text-sm font-medium text-gray-700 dark:text-gray-300" data-v-05f5d141>Jumlah</label><div class="flex items-center gap-4" data-v-05f5d141><div class="flex items-center border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden" data-v-05f5d141><button class="w-10 h-10 flex items-center justify-center hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"${ssrIncludeBooleanAttr(__props.modelValue <= unref(minQty)) ? " disabled" : ""} data-v-05f5d141>`);
      _push(ssrRenderComponent(_component_UIcon, {
        name: "i-lucide-minus",
        class: "w-4 h-4"
      }, null, _parent));
      _push(`</button><input${ssrRenderAttr("value", __props.modelValue)} type="number"${ssrRenderAttr("min", unref(minQty))}${ssrRenderAttr("max", __props.max)} class="w-16 h-10 text-center border-x border-gray-200 dark:border-gray-700 bg-transparent focus:outline-none" data-v-05f5d141><button class="w-10 h-10 flex items-center justify-center hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"${ssrIncludeBooleanAttr(__props.modelValue >= __props.max) ? " disabled" : ""} data-v-05f5d141>`);
      _push(ssrRenderComponent(_component_UIcon, {
        name: "i-lucide-plus",
        class: "w-4 h-4"
      }, null, _parent));
      _push(`</button></div><span class="text-sm text-gray-500 dark:text-gray-400" data-v-05f5d141> Stok: <span class="${ssrRenderClass(__props.max <= 5 ? "text-red-500 font-semibold" : "")}" data-v-05f5d141>${ssrInterpolate(__props.max)}</span></span></div></div>`);
    };
  }
});

/* unplugin-vue-components disabled */

const _sfc_setup$6 = _sfc_main$6.setup;
_sfc_main$6.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("inertia/components/product/ProductQuantitySelector.vue");
  return _sfc_setup$6 ? _sfc_setup$6(props, ctx) : void 0;
};
const ProductQuantitySelector = /* @__PURE__ */ _export_sfc(_sfc_main$6, [["__scopeId", "data-v-05f5d141"]]);

const _sfc_main$5 = /* @__PURE__ */ defineComponent({
  __name: "ProductActions",
  __ssrInlineRender: true,
  props: {
    isOutOfStock: { type: Boolean },
    isWishlisted: { type: Boolean },
    isAddingToCart: { type: Boolean },
    isBuyingNow: { type: Boolean },
    isTogglingWishlist: { type: Boolean }
  },
  emits: ["addToCart", "buyNow", "toggleWishlist", "share"],
  setup(__props, { emit: __emit }) {
    const emit = __emit;
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UButton = _sfc_main$c;
      const _component_UIcon = _sfc_main$b;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "space-y-4" }, _attrs))}><!-- Primary Actions --><div class="flex flex-col sm:flex-row gap-3">`);
      _push(ssrRenderComponent(_component_UButton, {
        size: "xl",
        color: "primary",
        class: "flex-1",
        disabled: __props.isOutOfStock || __props.isAddingToCart,
        loading: __props.isAddingToCart,
        onClick: ($event) => emit("addToCart")
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            if (!__props.isAddingToCart) {
              _push2(ssrRenderComponent(_component_UIcon, {
                name: "i-lucide-shopping-cart",
                class: "w-5 h-5"
              }, null, _parent2, _scopeId));
            } else {
              _push2(`<!---->`);
            }
            _push2(` ${ssrInterpolate(__props.isOutOfStock ? "Stok Habis" : __props.isAddingToCart ? "Menambahkan..." : "Tambah ke Keranjang")}`);
          } else {
            return [
              !__props.isAddingToCart ? (openBlock(), createBlock(_component_UIcon, {
                key: 0,
                name: "i-lucide-shopping-cart",
                class: "w-5 h-5"
              })) : createCommentVNode("v-if", true),
              createTextVNode(
                " " + toDisplayString(__props.isOutOfStock ? "Stok Habis" : __props.isAddingToCart ? "Menambahkan..." : "Tambah ke Keranjang"),
                1
                /* TEXT */
              )
            ];
          }
        }),
        _: 1
        /* STABLE */
      }, _parent));
      _push(ssrRenderComponent(_component_UButton, {
        size: "xl",
        variant: "solid",
        color: "neutral",
        class: "flex-1",
        disabled: __props.isOutOfStock || __props.isBuyingNow,
        loading: __props.isBuyingNow,
        onClick: ($event) => emit("buyNow")
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            if (!__props.isBuyingNow) {
              _push2(ssrRenderComponent(_component_UIcon, {
                name: "i-lucide-zap",
                class: "w-5 h-5"
              }, null, _parent2, _scopeId));
            } else {
              _push2(`<!---->`);
            }
            _push2(` ${ssrInterpolate(__props.isBuyingNow ? "Memproses..." : "Beli Sekarang")}`);
          } else {
            return [
              !__props.isBuyingNow ? (openBlock(), createBlock(_component_UIcon, {
                key: 0,
                name: "i-lucide-zap",
                class: "w-5 h-5"
              })) : createCommentVNode("v-if", true),
              createTextVNode(
                " " + toDisplayString(__props.isBuyingNow ? "Memproses..." : "Beli Sekarang"),
                1
                /* TEXT */
              )
            ];
          }
        }),
        _: 1
        /* STABLE */
      }, _parent));
      _push(`</div><!-- Secondary Actions --><div class="flex items-center gap-4 pt-2"><button class="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 hover:text-red-500 transition-colors disabled:opacity-50"${ssrIncludeBooleanAttr(__props.isTogglingWishlist) ? " disabled" : ""}>`);
      if (!__props.isTogglingWishlist) {
        _push(ssrRenderComponent(_component_UIcon, {
          name: "i-lucide-heart",
          class: ["w-5 h-5", __props.isWishlisted ? "text-red-500 fill-red-500" : ""]
        }, null, _parent));
      } else {
        _push(ssrRenderComponent(_component_UIcon, {
          name: "i-lucide-loader-2",
          class: "w-5 h-5 animate-spin"
        }, null, _parent));
      }
      _push(` ${ssrInterpolate(__props.isWishlisted ? "Tersimpan" : "Simpan")}</button><button class="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 hover:text-primary-500 transition-colors">`);
      _push(ssrRenderComponent(_component_UIcon, {
        name: "i-lucide-share-2",
        class: "w-5 h-5"
      }, null, _parent));
      _push(` Bagikan </button></div></div>`);
    };
  }
});

const _sfc_setup$5 = _sfc_main$5.setup;
_sfc_main$5.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("inertia/components/product/ProductActions.vue");
  return _sfc_setup$5 ? _sfc_setup$5(props, ctx) : void 0;
};

const _sfc_main$4 = /* @__PURE__ */ defineComponent({
  __name: "ProductHighlights",
  __ssrInlineRender: true,
  setup(__props) {
    const highlights = [
      {
        icon: "i-lucide-shield-check",
        iconColor: "text-green-500",
        title: "100% Original",
        subtitle: "Produk Asli"
      },
      {
        icon: "i-lucide-truck",
        iconColor: "text-blue-500",
        title: "Gratis Ongkir",
        subtitle: "Min. belanja"
      },
      {
        icon: "i-lucide-refresh-cw",
        iconColor: "text-orange-500",
        title: "7 Hari Retur",
        subtitle: "Jaminan"
      },
      {
        icon: "i-lucide-credit-card",
        iconColor: "text-purple-500",
        title: "Pembayaran Aman",
        subtitle: "Multi Opsi"
      }
    ];
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UIcon = _sfc_main$b;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "grid grid-cols-2 gap-4 p-4 bg-linear-to-br from-primary-50 to-secondary-50 dark:from-primary-950/50 dark:to-secondary-950/50 rounded-xl" }, _attrs))}><!--[-->`);
      ssrRenderList(highlights, (highlight) => {
        _push(`<div class="flex items-center gap-3"><div class="w-10 h-10 rounded-full bg-white dark:bg-gray-800 flex items-center justify-center shadow-sm">`);
        _push(ssrRenderComponent(_component_UIcon, {
          name: highlight.icon,
          class: ["w-5 h-5", highlight.iconColor]
        }, null, _parent));
        _push(`</div><div><p class="text-sm font-medium text-gray-900 dark:text-white">${ssrInterpolate(highlight.title)}</p><p class="text-xs text-gray-500 dark:text-gray-400">${ssrInterpolate(highlight.subtitle)}</p></div></div>`);
      });
      _push(`<!--]--></div>`);
    };
  }
});

const _sfc_setup$4 = _sfc_main$4.setup;
_sfc_main$4.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("inertia/components/product/ProductHighlights.vue");
  return _sfc_setup$4 ? _sfc_setup$4(props, ctx) : void 0;
};

const _sfc_main$3 = /* @__PURE__ */ defineComponent({
  __name: "ProductDetailTabs",
  __ssrInlineRender: true,
  props: {
    product: {}
  },
  setup(__props) {
    const props = __props;
    const activeTab = ref("description");
    const specifications = computed(() => {
      if (!props.product.specifications) return [];
      try {
        return JSON.parse(props.product.specifications);
      } catch {
        return props.product.specifications.split("\n").map((line) => {
          const [key, value] = line.split(":");
          return { key: key?.trim() || "", value: value?.trim() || "" };
        });
      }
    });
    const tabs = computed(() => [
      { id: "description", label: "Deskripsi" },
      { id: "specifications", label: "Spesifikasi" },
      { id: "reviews", label: `Ulasan (${props.product.reviewSummary?.totalReviews || 0})` }
    ]);
    const reviewSummary = computed(() => props.product.reviewSummary);
    const reviews = computed(() => props.product.reviews || []);
    const formatDate = (dateString) => {
      const date = new Date(dateString);
      return date.toLocaleDateString("id-ID", {
        year: "numeric",
        month: "long",
        day: "numeric"
      });
    };
    const getStarArray = (rating) => {
      return Array.from({ length: 5 }, (_, i) => i < rating);
    };
    const getRatingPercentage = (stars) => {
      if (!reviewSummary.value || reviewSummary.value.totalReviews === 0) return 0;
      const count = reviewSummary.value.ratingDistribution[stars] || 0;
      return Math.round(count / reviewSummary.value.totalReviews * 100);
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UIcon = _sfc_main$b;
      const _component_UBadge = _sfc_main$d;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800" }, _attrs))} data-v-d188bcf2><div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12" data-v-d188bcf2><!-- Tabs Navigation --><div class="flex border-b border-gray-200 dark:border-gray-800 overflow-x-auto scrollbar-hide" data-v-d188bcf2><!--[-->`);
      ssrRenderList(tabs.value, (tab) => {
        _push(`<button class="${ssrRenderClass([
          activeTab.value === tab.id ? "border-primary-500 text-primary-600 dark:text-primary-400" : "border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300",
          "px-6 py-4 text-sm font-medium border-b-2 transition-colors whitespace-nowrap"
        ])}" data-v-d188bcf2>${ssrInterpolate(tab.label)}</button>`);
      });
      _push(`<!--]--></div><!-- Tab Content --><div class="py-6" data-v-d188bcf2><!-- Description -->`);
      if (activeTab.value === "description") {
        _push(`<div class="prose dark:prose-invert max-w-none" data-v-d188bcf2>`);
        if (__props.product.description) {
          _push(`<div data-v-d188bcf2>${__props.product.description ?? ""}</div>`);
        } else {
          _push(`<p class="text-gray-500 dark:text-gray-400" data-v-d188bcf2> Belum ada deskripsi untuk produk ini. </p>`);
        }
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<!-- Specifications -->`);
      if (activeTab.value === "specifications") {
        _push(`<div class="space-y-4" data-v-d188bcf2><div class="grid grid-cols-1 md:grid-cols-2 gap-4" data-v-d188bcf2><!-- Basic Info --><div class="p-4 bg-gray-50 dark:bg-gray-800 rounded-xl space-y-3" data-v-d188bcf2><h3 class="font-semibold text-gray-900 dark:text-white" data-v-d188bcf2>Informasi Dasar</h3><div class="space-y-2 text-sm" data-v-d188bcf2><div class="flex justify-between" data-v-d188bcf2><span class="text-gray-500 dark:text-gray-400" data-v-d188bcf2>SKU</span><span class="text-gray-900 dark:text-white font-medium" data-v-d188bcf2>${ssrInterpolate(__props.product.sku || "-")}</span></div><div class="flex justify-between" data-v-d188bcf2><span class="text-gray-500 dark:text-gray-400" data-v-d188bcf2>Berat</span><span class="text-gray-900 dark:text-white font-medium" data-v-d188bcf2>${ssrInterpolate(__props.product.weight)}g</span></div><div class="flex justify-between" data-v-d188bcf2><span class="text-gray-500 dark:text-gray-400" data-v-d188bcf2>Brand</span><span class="text-gray-900 dark:text-white font-medium" data-v-d188bcf2>${ssrInterpolate(__props.product.brand || "-")}</span></div><div class="flex justify-between" data-v-d188bcf2><span class="text-gray-500 dark:text-gray-400" data-v-d188bcf2>Kategori</span><span class="text-gray-900 dark:text-white font-medium" data-v-d188bcf2>${ssrInterpolate(__props.product.category?.name || "-")}</span></div></div></div><!-- Custom Specifications -->`);
        if (specifications.value.length > 0) {
          _push(`<div class="p-4 bg-gray-50 dark:bg-gray-800 rounded-xl space-y-3" data-v-d188bcf2><h3 class="font-semibold text-gray-900 dark:text-white" data-v-d188bcf2>Spesifikasi Teknis</h3><div class="space-y-2 text-sm" data-v-d188bcf2><!--[-->`);
          ssrRenderList(specifications.value, (spec, index) => {
            _push(`<div class="flex justify-between" data-v-d188bcf2><span class="text-gray-500 dark:text-gray-400" data-v-d188bcf2>${ssrInterpolate(spec.key)}</span><span class="text-gray-900 dark:text-white font-medium" data-v-d188bcf2>${ssrInterpolate(spec.value)}</span></div>`);
          });
          _push(`<!--]--></div></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<!-- Reviews -->`);
      if (activeTab.value === "reviews") {
        _push(`<div class="space-y-6" data-v-d188bcf2><!-- Empty State -->`);
        if (reviews.value.length === 0) {
          _push(`<div class="text-center py-12" data-v-d188bcf2>`);
          _push(ssrRenderComponent(_component_UIcon, {
            name: "i-lucide-message-square",
            class: "w-12 h-12 text-gray-300 dark:text-gray-600 mx-auto mb-4"
          }, null, _parent));
          _push(`<p class="text-gray-500 dark:text-gray-400" data-v-d188bcf2>Belum ada ulasan untuk produk ini.</p><p class="text-sm text-gray-400 dark:text-gray-500 mt-1" data-v-d188bcf2> Jadilah yang pertama memberikan ulasan! </p></div>`);
        } else {
          _push(`<!--[--><!-- Reviews Content --><div class="space-y-8" data-v-d188bcf2><!-- Review Summary --><div class="grid grid-cols-1 md:grid-cols-3 gap-6" data-v-d188bcf2><!-- Average Rating --><div class="bg-gray-50 dark:bg-gray-800 rounded-xl p-6 text-center" data-v-d188bcf2><div class="text-5xl font-bold text-primary-600 mb-2" data-v-d188bcf2>${ssrInterpolate(reviewSummary.value?.averageRating?.toFixed(1) || "0.0")}</div><div class="flex justify-center gap-1 mb-2" data-v-d188bcf2><!--[-->`);
          ssrRenderList(getStarArray(Math.round(reviewSummary.value?.averageRating || 0)), (filled, index) => {
            _push(ssrRenderComponent(_component_UIcon, {
              key: index,
              name: filled ? "i-lucide-star" : "i-lucide-star",
              class: ["w-5 h-5", filled ? "text-yellow-400 fill-yellow-400" : "text-gray-300"]
            }, null, _parent));
          });
          _push(`<!--]--></div><p class="text-sm text-gray-500 dark:text-gray-400" data-v-d188bcf2>${ssrInterpolate(reviewSummary.value?.totalReviews || 0)} ulasan </p></div><!-- Rating Distribution --><div class="md:col-span-2 bg-gray-50 dark:bg-gray-800 rounded-xl p-6" data-v-d188bcf2><h4 class="font-semibold text-gray-900 dark:text-white mb-4" data-v-d188bcf2>Distribusi Rating</h4><div class="space-y-2" data-v-d188bcf2><!--[-->`);
          ssrRenderList([5, 4, 3, 2, 1], (stars) => {
            _push(`<div class="flex items-center gap-3" data-v-d188bcf2><span class="text-sm text-gray-600 dark:text-gray-400 w-8" data-v-d188bcf2>${ssrInterpolate(stars)} ★</span><div class="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-2" data-v-d188bcf2><div class="bg-yellow-400 h-2 rounded-full transition-all" style="${ssrRenderStyle({ width: `${getRatingPercentage(stars)}%` })}" data-v-d188bcf2></div></div><span class="text-sm text-gray-500 dark:text-gray-400 w-12 text-right" data-v-d188bcf2>${ssrInterpolate(reviewSummary.value?.ratingDistribution?.[stars] || 0)}</span></div>`);
          });
          _push(`<!--]--></div></div></div><!-- Reviews List --><div class="space-y-4" data-v-d188bcf2><h4 class="font-semibold text-gray-900 dark:text-white" data-v-d188bcf2> Semua Ulasan (${ssrInterpolate(reviews.value.length)}) </h4><!--[-->`);
          ssrRenderList(reviews.value, (review) => {
            _push(`<div class="bg-gray-50 dark:bg-gray-800 rounded-xl p-5" data-v-d188bcf2><div class="flex items-start gap-4" data-v-d188bcf2><!-- Avatar --><div class="shrink-0" data-v-d188bcf2>`);
            if (review.customer?.avatar) {
              _push(`<img${ssrRenderAttr("src", review.customer.avatar)}${ssrRenderAttr("alt", review.customer.fullName)} class="w-10 h-10 rounded-full object-cover" data-v-d188bcf2>`);
            } else {
              _push(`<div class="w-10 h-10 rounded-full bg-primary-100 dark:bg-primary-900 flex items-center justify-center" data-v-d188bcf2><span class="text-primary-600 dark:text-primary-400 font-semibold text-sm" data-v-d188bcf2>${ssrInterpolate(review.customer?.fullName?.charAt(0)?.toUpperCase() || "U")}</span></div>`);
            }
            _push(`</div><!-- Content --><div class="flex-1 min-w-0" data-v-d188bcf2><div class="flex items-center justify-between gap-2 mb-1" data-v-d188bcf2><div class="flex items-center gap-2" data-v-d188bcf2><span class="font-medium text-gray-900 dark:text-white" data-v-d188bcf2>${ssrInterpolate(review.customer?.fullName || "Pengguna")}</span>`);
            if (review.isVerifiedPurchase) {
              _push(ssrRenderComponent(_component_UBadge, {
                color: "success",
                variant: "soft",
                size: "xs"
              }, {
                default: withCtx((_, _push2, _parent2, _scopeId) => {
                  if (_push2) {
                    _push2(` Pembeli Terverifikasi `);
                  } else {
                    return [
                      createTextVNode(" Pembeli Terverifikasi ")
                    ];
                  }
                }),
                _: 2
                /* DYNAMIC */
              }, _parent));
            } else {
              _push(`<!---->`);
            }
            _push(`</div><span class="text-xs text-gray-500 dark:text-gray-400 shrink-0" data-v-d188bcf2>${ssrInterpolate(formatDate(review.createdAt))}</span></div><!-- Rating Stars --><div class="flex gap-0.5 mb-2" data-v-d188bcf2><!--[-->`);
            ssrRenderList(getStarArray(review.rating), (filled, index) => {
              _push(ssrRenderComponent(_component_UIcon, {
                key: index,
                name: filled ? "i-lucide-star" : "i-lucide-star",
                class: ["w-4 h-4", filled ? "text-yellow-400 fill-yellow-400" : "text-gray-300"]
              }, null, _parent));
            });
            _push(`<!--]--></div><!-- Comment -->`);
            if (review.comment) {
              _push(`<p class="text-gray-700 dark:text-gray-300 text-sm" data-v-d188bcf2>${ssrInterpolate(review.comment)}</p>`);
            } else {
              _push(`<!---->`);
            }
            _push(`<!-- Review Images -->`);
            if (review.images && review.images.length > 0) {
              _push(`<div class="flex gap-2 mt-3" data-v-d188bcf2><!--[-->`);
              ssrRenderList(review.images, (img, idx) => {
                _push(`<img${ssrRenderAttr("src", img)}${ssrRenderAttr("alt", `Review image ${idx + 1}`)} class="w-16 h-16 object-cover rounded-lg cursor-pointer hover:opacity-80 transition-opacity" data-v-d188bcf2>`);
              });
              _push(`<!--]--></div>`);
            } else {
              _push(`<!---->`);
            }
            _push(`<!-- Helpful -->`);
            if (review.helpfulCount > 0) {
              _push(`<div class="mt-3 text-xs text-gray-500 dark:text-gray-400" data-v-d188bcf2>`);
              _push(ssrRenderComponent(_component_UIcon, {
                name: "i-lucide-thumbs-up",
                class: "w-3 h-3 inline-block mr-1"
              }, null, _parent));
              _push(` ${ssrInterpolate(review.helpfulCount)} orang menganggap ulasan ini membantu </div>`);
            } else {
              _push(`<!---->`);
            }
            _push(`</div></div></div>`);
          });
          _push(`<!--]--></div></div><!--]-->`);
        }
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div></div>`);
    };
  }
});

/* unplugin-vue-components disabled */

const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("inertia/components/product/ProductDetailTabs.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const ProductDetailTabs = /* @__PURE__ */ _export_sfc(_sfc_main$3, [["__scopeId", "data-v-d188bcf2"]]);

const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "ProductRecommendationSection",
  __ssrInlineRender: true,
  props: {
    title: {},
    subtitle: {},
    products: {},
    viewAllLink: {},
    viewAllLabel: {},
    useGrid: { type: Boolean }
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UIcon = _sfc_main$b;
      const _component_UCarousel = _sfc_main$f;
      if (__props.products.length > 0) {
        _push(`<section${ssrRenderAttrs(mergeProps({ class: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" }, _attrs))}><div class="flex items-center justify-between mb-6"><div><h2 class="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">${ssrInterpolate(__props.title)}</h2>`);
        if (__props.subtitle) {
          _push(`<p class="text-gray-500 dark:text-gray-400 text-sm mt-1">${ssrInterpolate(__props.subtitle)}</p>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div>`);
        if (__props.viewAllLink) {
          _push(ssrRenderComponent(unref(Link), {
            href: __props.viewAllLink,
            class: "text-primary-500 hover:text-primary-600 text-sm font-medium flex items-center gap-1"
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`${ssrInterpolate(__props.viewAllLabel || "Lihat Semua")} `);
                _push2(ssrRenderComponent(_component_UIcon, {
                  name: "i-lucide-arrow-right",
                  class: "w-4 h-4"
                }, null, _parent2, _scopeId));
              } else {
                return [
                  createTextVNode(
                    toDisplayString(__props.viewAllLabel || "Lihat Semua") + " ",
                    1
                    /* TEXT */
                  ),
                  createVNode(_component_UIcon, {
                    name: "i-lucide-arrow-right",
                    class: "w-4 h-4"
                  })
                ];
              }
            }),
            _: 1
            /* STABLE */
          }, _parent));
        } else {
          _push(`<!---->`);
        }
        _push(`</div><!-- Grid Layout -->`);
        if (__props.useGrid) {
          _push(`<div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-4"><!--[-->`);
          ssrRenderList(__props.products, (product) => {
            _push(ssrRenderComponent(_sfc_main$e, {
              key: product.id,
              product
            }, null, _parent));
          });
          _push(`<!--]--></div>`);
        } else {
          _push(`<!--[--><!-- Carousel Layout -->`);
          _push(ssrRenderComponent(_component_UCarousel, {
            items: __props.products,
            ui: {
              container: "gap-4",
              item: "basis-[380px] sm:basis-[300px]"
            },
            arrows: ""
          }, {
            default: withCtx(({ item }, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(ssrRenderComponent(_sfc_main$e, {
                  product: item,
                  class: "h-full"
                }, null, _parent2, _scopeId));
              } else {
                return [
                  createVNode(_sfc_main$e, {
                    product: item,
                    class: "h-full"
                  }, null, 8, ["product"])
                ];
              }
            }),
            _: 1
            /* STABLE */
          }, _parent));
          _push(`<!--]-->`);
        }
        _push(`</section>`);
      } else {
        _push(`<!---->`);
      }
    };
  }
});

const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("inertia/components/product/ProductRecommendationSection.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};

const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "ProductStickyFooter",
  __ssrInlineRender: true,
  props: {
    formattedPrice: {},
    isOutOfStock: { type: Boolean },
    isAddingToCart: { type: Boolean },
    isBuyingNow: { type: Boolean }
  },
  emits: ["addToCart", "buyNow"],
  setup(__props, { emit: __emit }) {
    const emit = __emit;
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UButton = _sfc_main$c;
      const _component_UIcon = _sfc_main$b;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 p-4 lg:hidden z-50" }, _attrs))}><div class="flex items-center gap-3"><div class="flex-1"><p class="text-xs text-gray-500 dark:text-gray-400">Harga</p><p class="text-lg font-bold text-primary-600 dark:text-primary-400">${ssrInterpolate(__props.formattedPrice)}</p></div>`);
      _push(ssrRenderComponent(_component_UButton, {
        size: "lg",
        variant: "outline",
        class: "shrink-0",
        disabled: __props.isOutOfStock || __props.isAddingToCart,
        loading: __props.isAddingToCart,
        onClick: ($event) => emit("addToCart")
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            if (!__props.isAddingToCart) {
              _push2(ssrRenderComponent(_component_UIcon, {
                name: "i-lucide-shopping-cart",
                class: "w-5 h-5"
              }, null, _parent2, _scopeId));
            } else {
              _push2(`<!---->`);
            }
          } else {
            return [
              !__props.isAddingToCart ? (openBlock(), createBlock(_component_UIcon, {
                key: 0,
                name: "i-lucide-shopping-cart",
                class: "w-5 h-5"
              })) : createCommentVNode("v-if", true)
            ];
          }
        }),
        _: 1
        /* STABLE */
      }, _parent));
      _push(ssrRenderComponent(_component_UButton, {
        size: "lg",
        color: "primary",
        class: "shrink-0",
        disabled: __props.isOutOfStock || __props.isBuyingNow,
        loading: __props.isBuyingNow,
        onClick: ($event) => emit("buyNow")
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`${ssrInterpolate(__props.isBuyingNow ? "Memproses..." : "Beli Sekarang")}`);
          } else {
            return [
              createTextVNode(
                toDisplayString(__props.isBuyingNow ? "Memproses..." : "Beli Sekarang"),
                1
                /* TEXT */
              )
            ];
          }
        }),
        _: 1
        /* STABLE */
      }, _parent));
      _push(`</div></div>`);
    };
  }
});

const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("inertia/components/product/ProductStickyFooter.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};

function useProductDetail(product, categoryBreadcrumb) {
  const { addToCart: addToCartApi } = useCart();
  const { toggleWishlist: toggleWishlistApi, checkWishlist } = useWishlist();
  const toast = useToast();
  const selectedVariant = ref(null);
  const quantity = ref(1);
  const isWishlisted = ref(false);
  const isAddingToCart = ref(false);
  const isBuyingNow = ref(false);
  const isTogglingWishlist = ref(false);
  const currentPrice = computed(() => {
    const basePrice = Number(product.discountPrice) || Number(product.price);
    if (selectedVariant.value) {
      return selectedVariant.value.price ?? basePrice + (Number(selectedVariant.value.priceAdjustment) || 0);
    }
    return basePrice;
  });
  const formattedCurrentPrice = computed(() => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0
    }).format(currentPrice.value);
  });
  const formattedOriginalPrice = computed(() => {
    if (!product.discountPrice) return null;
    const basePrice = Number(product.price);
    const price = selectedVariant.value ? basePrice + (Number(selectedVariant.value.priceAdjustment) || 0) : basePrice;
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0
    }).format(price);
  });
  const currentStock = computed(() => {
    if (selectedVariant.value) {
      return selectedVariant.value.stock;
    }
    return product.stock;
  });
  const isOutOfStock = computed(() => currentStock.value <= 0);
  const productImages = computed(() => {
    if (product.images.length === 0) {
      return [{ id: 0, url: product.image, altText: product.name, isPrimary: true }];
    }
    return product.images;
  });
  const variantGroups = computed(() => {
    const groups = {};
    product.variants.forEach((variant) => {
      if (!groups[variant.name]) {
        groups[variant.name] = [];
      }
      groups[variant.name].push(variant);
    });
    return groups;
  });
  const breadcrumbItems = computed(() => {
    const items = [
      { label: "Home", href: "/" },
      { label: "Koleksi", href: "/collections" }
    ];
    if (categoryBreadcrumb?.parent) {
      items.push({
        label: categoryBreadcrumb.parent.name,
        href: categoryBreadcrumb.parent.href
      });
    }
    if (categoryBreadcrumb) {
      items.push({
        label: categoryBreadcrumb.name,
        href: categoryBreadcrumb.href
      });
    }
    items.push({ label: product.name, href: "#" });
    return items;
  });
  const selectVariant = (variant) => {
    selectedVariant.value = variant;
    quantity.value = 1;
  };
  const setQuantity = (value) => {
    quantity.value = Math.max(1, Math.min(value, currentStock.value));
  };
  const toggleWishlist = async () => {
    if (isTogglingWishlist.value) return;
    isTogglingWishlist.value = true;
    const result = await toggleWishlistApi(product.id);
    if (result.success && result.data) {
      isWishlisted.value = result.data.isWishlisted;
      showToast(
        "success",
        result.data.isWishlisted ? "Produk ditambahkan ke wishlist" : "Produk dihapus dari wishlist"
      );
    } else if (result.message) {
      showToast("error", result.message);
    }
    isTogglingWishlist.value = false;
  };
  const addToCart = async () => {
    if (isAddingToCart.value || isOutOfStock.value) return;
    if (product.variants.length > 0 && !selectedVariant.value) {
      showToast("error", "Silakan pilih varian terlebih dahulu");
      return;
    }
    isAddingToCart.value = true;
    const result = await addToCartApi({
      productId: product.id,
      variantId: selectedVariant.value?.id,
      quantity: quantity.value
    });
    if (result.success) {
      showToast("success", "Produk berhasil ditambahkan ke keranjang");
    } else if (result.message) {
      showToast("error", result.message);
    }
    isAddingToCart.value = false;
  };
  const buyNow = async () => {
    if (isBuyingNow.value || isOutOfStock.value) return;
    if (product.variants.length > 0 && !selectedVariant.value) {
      showToast("error", "Silakan pilih varian terlebih dahulu");
      return;
    }
    isBuyingNow.value = true;
    const result = await addToCartApi({
      productId: product.id,
      variantId: selectedVariant.value?.id,
      quantity: quantity.value
    });
    if (result.success) {
      router.visit("/checkout");
    } else if (result.message) {
      showToast("error", result.message);
    }
    isBuyingNow.value = false;
  };
  const showToast = (type, message) => {
    if (type === "success") {
      toast.success(message);
    } else {
      toast.error(message);
    }
  };
  const shareProduct = async (url) => {
    if (typeof globalThis.navigator !== "undefined" && "share" in globalThis.navigator) {
      try {
        await globalThis.navigator.share({
          title: product.name,
          text: `Check out ${product.name} at Ogitu!`,
          url
        });
      } catch (err) {
        console.error("Share cancelled or failed:", err);
      }
    } else {
      try {
        if (typeof globalThis.navigator !== "undefined" && globalThis.navigator.clipboard) {
          await globalThis.navigator.clipboard.writeText(url);
          toast.success("Link produk berhasil disalin");
        }
      } catch {
        toast.error("Gagal menyalin link");
      }
    }
  };
  watch(selectedVariant, (newVariant) => {
    if (newVariant && quantity.value > newVariant.stock) {
      quantity.value = Math.max(1, newVariant.stock);
    }
  });
  onMounted(async () => {
    isWishlisted.value = await checkWishlist(product.id);
  });
  return {
    // State
    selectedVariant,
    quantity,
    isWishlisted,
    isAddingToCart,
    isBuyingNow,
    isTogglingWishlist,
    // Computed
    currentPrice,
    formattedCurrentPrice,
    formattedOriginalPrice,
    currentStock,
    isOutOfStock,
    productImages,
    variantGroups,
    breadcrumbItems,
    // Methods
    selectVariant,
    setQuantity,
    toggleWishlist,
    addToCart,
    buyNow,
    shareProduct,
    showToast
  };
}

function useProductSeo(options) {
  const { product, productImages, currentPrice, isOutOfStock, breadcrumbItems, appUrl } = options;
  const canonicalUrl = computed(() => `${appUrl}/products/${product.slug}`);
  const seoTitle = computed(() => `${product.name} | Ogitu - Toko Vape & Rokok Elektrik`);
  const seoDescription = computed(
    () => product.description?.substring(0, 160) || `Beli ${product.name} dengan harga ${product.formattedPrice}. ${product.brand ? `Brand: ${product.brand}.` : ""} Tersedia di Ogitu - Toko Vape & Rokok Elektrik Terpercaya.`
  );
  useSeoMeta({
    title: seoTitle,
    description: seoDescription,
    ogTitle: seoTitle,
    ogDescription: seoDescription,
    ogImage: product.image,
    ogUrl: canonicalUrl,
    ogType: "website",
    twitterCard: "summary_large_image",
    twitterTitle: seoTitle,
    twitterDescription: seoDescription,
    twitterImage: product.image
  });
  const productSchema = computed(() => ({
    "@context": "https://schema.org",
    "@type": "Product",
    "name": product.name,
    "description": product.description || seoDescription.value,
    "image": productImages.value.map((img) => img.url),
    "sku": product.sku,
    "brand": product.brand ? {
      "@type": "Brand",
      "name": product.brand
    } : void 0,
    "category": product.category?.name || "Vape & Rokok Elektrik",
    "offers": {
      "@type": "Offer",
      "url": canonicalUrl.value,
      "priceCurrency": "IDR",
      "price": currentPrice.value,
      "priceValidUntil": new Date(Date.now() + 30 * 24 * 60 * 60 * 1e3).toISOString().split("T")[0],
      "availability": isOutOfStock.value ? "https://schema.org/OutOfStock" : "https://schema.org/InStock"
    },
    "aggregateRating": product.totalReviews > 0 ? {
      "@type": "AggregateRating",
      "ratingValue": Number(product.rating),
      "reviewCount": product.totalReviews,
      "bestRating": 5,
      "worstRating": 1
    } : void 0
  }));
  const breadcrumbSchema = computed(() => ({
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": breadcrumbItems.value.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.label,
      "item": item.href !== "#" ? `${appUrl}${item.href}` : void 0
    }))
  }));
  useHead({
    link: [{ rel: "canonical", href: canonicalUrl }],
    script: [
      { type: "application/ld+json", innerHTML: JSON.stringify(productSchema.value) },
      { type: "application/ld+json", innerHTML: JSON.stringify(breadcrumbSchema.value) }
    ]
  });
  return {
    canonicalUrl,
    seoTitle,
    seoDescription
  };
}

const _sfc_main = /* @__PURE__ */ defineComponent({
  ...{
    layout: _sfc_main$g
  },
  __name: "view",
  __ssrInlineRender: true,
  props: {
    product: {},
    categoryBreadcrumb: {},
    recommendations: {}
  },
  setup(__props) {
    const props = __props;
    const page = usePage();
    const appUrl = computed(() => page.props.appUrl || "https://ogitu.com");
    const {
      selectedVariant,
      quantity,
      isWishlisted,
      isAddingToCart,
      isBuyingNow,
      isTogglingWishlist,
      formattedCurrentPrice,
      formattedOriginalPrice,
      currentStock,
      isOutOfStock,
      productImages,
      variantGroups,
      breadcrumbItems,
      selectVariant,
      setQuantity,
      toggleWishlist,
      addToCart,
      buyNow,
      shareProduct
    } = useProductDetail(props.product, props.categoryBreadcrumb);
    const { canonicalUrl } = useProductSeo({
      product: props.product,
      productImages,
      currentPrice: computed(() => props.product.discountPrice || props.product.price),
      isOutOfStock,
      breadcrumbItems,
      appUrl: appUrl.value
    });
    const handleShare = () => {
      shareProduct(canonicalUrl.value);
    };
    const handleQuantityChange = (value) => {
      setQuantity(value);
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "min-h-screen bg-gray-50 dark:bg-gray-950" }, _attrs))}><!-- Breadcrumb -->`);
      _push(ssrRenderComponent(_sfc_main$a, { items: unref(breadcrumbItems) }, null, _parent));
      _push(`<!-- Main Product Section --><div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-10"><div class="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12"><!-- Product Images -->`);
      _push(ssrRenderComponent(ProductGallery, {
        images: unref(productImages),
        "product-name": __props.product.name,
        badge: __props.product.badge,
        discount: __props.product.discount
      }, null, _parent));
      _push(`<!-- Product Info --><div class="space-y-6"><!-- Header: Name, Rating, Price -->`);
      _push(ssrRenderComponent(_sfc_main$8, {
        product: __props.product,
        "category-breadcrumb": __props.categoryBreadcrumb,
        "formatted-price": unref(formattedCurrentPrice),
        "formatted-original-price": unref(formattedOriginalPrice)
      }, null, _parent));
      _push(`<!-- Variants -->`);
      _push(ssrRenderComponent(_sfc_main$7, {
        "variant-groups": unref(variantGroups),
        "selected-variant": unref(selectedVariant),
        onSelect: unref(selectVariant)
      }, null, _parent));
      _push(`<!-- Quantity -->`);
      _push(ssrRenderComponent(ProductQuantitySelector, {
        "model-value": unref(quantity),
        max: unref(currentStock),
        "onUpdate:modelValue": handleQuantityChange
      }, null, _parent));
      _push(`<!-- Actions -->`);
      _push(ssrRenderComponent(_sfc_main$5, {
        "is-out-of-stock": unref(isOutOfStock),
        "is-wishlisted": unref(isWishlisted),
        "is-adding-to-cart": unref(isAddingToCart),
        "is-buying-now": unref(isBuyingNow),
        "is-toggling-wishlist": unref(isTogglingWishlist),
        onAddToCart: unref(addToCart),
        onBuyNow: unref(buyNow),
        onToggleWishlist: unref(toggleWishlist),
        onShare: handleShare
      }, null, _parent));
      _push(`<!-- Product Highlights -->`);
      _push(ssrRenderComponent(_sfc_main$4, null, null, _parent));
      _push(`</div></div></div><!-- Product Details Tabs -->`);
      _push(ssrRenderComponent(ProductDetailTabs, { product: __props.product }, null, _parent));
      _push(`<!-- Recommendations Sections --><div class="space-y-8 lg:space-y-12 py-8 lg:py-12"><!-- Products from Same Brand -->`);
      if (__props.product.brand) {
        _push(ssrRenderComponent(_sfc_main$2, {
          title: `Produk ${__props.product.brand} Lainnya`,
          subtitle: "Lebih banyak pilihan dari brand yang sama",
          products: __props.recommendations.brandProducts,
          "view-all-link": `/collections?brand=${__props.product.brand}`
        }, null, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(`<!-- Products from Same Category -->`);
      _push(ssrRenderComponent(_sfc_main$2, {
        title: "Produk Terkait",
        subtitle: __props.categoryBreadcrumb?.name || "Kategori yang sama",
        products: __props.recommendations.categoryProducts,
        "view-all-link": __props.categoryBreadcrumb?.href
      }, null, _parent));
      _push(`<!-- Similar Products / You May Also Like -->`);
      if (__props.recommendations.similarProducts.length > 0) {
        _push(ssrRenderComponent(_sfc_main$2, {
          title: "Rekomendasi Untukmu",
          subtitle: "Produk serupa yang mungkin kamu suka",
          products: __props.recommendations.similarProducts,
          "use-grid": ""
        }, null, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(`</div><!-- Sticky Add to Cart (Mobile) -->`);
      _push(ssrRenderComponent(_sfc_main$1, {
        "formatted-price": unref(formattedCurrentPrice),
        "is-out-of-stock": unref(isOutOfStock),
        "is-adding-to-cart": unref(isAddingToCart),
        "is-buying-now": unref(isBuyingNow),
        onAddToCart: unref(addToCart),
        onBuyNow: unref(buyNow)
      }, null, _parent));
      _push(`<!-- Spacer for sticky footer --><div class="h-24 lg:hidden"></div></div>`);
    };
  }
});

const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("inertia/pages/products/view.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
