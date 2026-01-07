import { _ as _sfc_main$7 } from './Pagination-B8CAUWkD.js';
import { _ as _sfc_main$2, a as _sfc_main$4 } from './Button-BTdvmZ8N.js';
import { _ as _sfc_main$3 } from './SelectMenu-BqLaY6AT.js';
import { defineComponent, ref, computed, unref, withCtx, createVNode, toDisplayString, createBlock, createCommentVNode, openBlock, createTextVNode, useSSRContext } from 'vue';
import { ssrRenderComponent, ssrInterpolate, ssrRenderAttr, ssrRenderList, ssrRenderClass } from 'vue/server-renderer';
import { Head, Link, router } from '@inertiajs/vue3';
import { useHead } from '@unhead/vue';
import { _ as _sfc_main$1 } from './default-pjkA2Ka0.js';
import { u as useToast } from './Badge-CQlYH3Fo.js';
import { _ as _sfc_main$5 } from './ProductCard-Dppblc24.js';
import { _ as _sfc_main$6 } from './ProductCardList-CZGKRxcP.js';
import 'reka-ui';
import '@vueuse/core';
import './virtual_nuxt-ui-plugins-CrG8Uaxr.js';
import '@unhead/vue/client';
import 'tailwindcss/colors';
import 'hookable';
import 'defu';
import 'ohash/utils';
import 'tailwind-variants';
import '@iconify/vue';
import 'ufo';
import './Modal-VctJV7vb.js';
import 'vaul-vue';
import './DropdownMenu-Zcq6i1qV.js';
import 'reka-ui/namespaced';
import './Checkbox-DCS-_c5K.js';

const siteUrl = "https://ogitu.com";
const pageTitle = "Produk Terlaris - Best Seller Vape & Rokok Elektrik | Ogitu";
const _sfc_main = /* @__PURE__ */ defineComponent({
  ...{ layout: _sfc_main$1 },
  __name: "best-seller",
  __ssrInlineRender: true,
  props: {
    products: {},
    meta: {},
    categories: {},
    brands: {},
    filters: {}
  },
  setup(__props) {
    const props = __props;
    const viewMode = ref("grid");
    const currentPage = ref(props.meta.currentPage);
    const localFilters = ref({ ...props.filters });
    const totalPages = computed(() => props.meta.lastPage);
    const applyFilters = () => {
      const params = new URLSearchParams();
      if (localFilters.value.brand && localFilters.value.brand !== "all") params.set("brand", localFilters.value.brand);
      if (localFilters.value.minPrice) params.set("minPrice", localFilters.value.minPrice);
      if (localFilters.value.maxPrice) params.set("maxPrice", localFilters.value.maxPrice);
      if (currentPage.value > 1) params.set("page", String(currentPage.value));
      const queryString = params.toString();
      window.location.href = `/best-seller${queryString ? `?${queryString}` : ""}`;
    };
    const clearFilters = () => {
      localFilters.value = { brand: "all", minPrice: "", maxPrice: "" };
      window.location.href = "/best-seller";
    };
    const goToPage = (page) => {
      currentPage.value = page;
      applyFilters();
    };
    const toast = useToast();
    const isAddingToCart = ref(null);
    const isTogglingWishlist = ref(null);
    const getToken = () => {
      const match = document.cookie.match(/XSRF-TOKEN=([^;]+)/);
      return match ? decodeURIComponent(match[1]) : "";
    };
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
    const pageDescription = `Temukan ${props.meta.total}+ produk vape terlaris dan paling diminati. Pod system, mod kit, liquid premium dari brand ternama dengan harga terbaik. Gratis ongkir!`;
    const structuredData = computed(() => ({
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      name: "Produk Terlaris Vape & Rokok Elektrik",
      description: pageDescription,
      url: `${siteUrl}/best-seller`,
      mainEntity: {
        "@type": "ItemList",
        numberOfItems: props.meta.total,
        itemListElement: props.products.slice(0, 10).map((product, index) => ({
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
            }
          }
        }))
      }
    }));
    useHead({
      script: [
        {
          type: "application/ld+json",
          innerHTML: computed(() => JSON.stringify(structuredData.value))
        }
      ]
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UIcon = _sfc_main$2;
      const _component_USelectMenu = _sfc_main$3;
      const _component_UButton = _sfc_main$4;
      const _component_UPagination = _sfc_main$7;
      _push(`<!--[-->`);
      _push(ssrRenderComponent(unref(Head), null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<title${_scopeId}>${ssrInterpolate(pageTitle)}</title><meta name="description"${ssrRenderAttr("content", pageDescription)}${_scopeId}><meta name="robots" content="index, follow"${_scopeId}><link rel="canonical"${ssrRenderAttr("href", `${siteUrl}/best-seller`)}${_scopeId}><meta property="og:title"${ssrRenderAttr("content", pageTitle)}${_scopeId}><meta property="og:description"${ssrRenderAttr("content", pageDescription)}${_scopeId}><meta property="og:type" content="website"${_scopeId}><meta property="og:url"${ssrRenderAttr("content", `${siteUrl}/best-seller`)}${_scopeId}>`);
          } else {
            return [
              createVNode("title", null, toDisplayString(pageTitle)),
              createVNode("meta", {
                name: "description",
                content: pageDescription
              }),
              createVNode("meta", {
                name: "robots",
                content: "index, follow"
              }),
              createVNode("link", {
                rel: "canonical",
                href: `${siteUrl}/best-seller`
              }, null, 8, ["href"]),
              createVNode("meta", {
                property: "og:title",
                content: pageTitle
              }),
              createVNode("meta", {
                property: "og:description",
                content: pageDescription
              }),
              createVNode("meta", {
                property: "og:type",
                content: "website"
              }),
              createVNode("meta", {
                property: "og:url",
                content: `${siteUrl}/best-seller`
              }, null, 8, ["content"])
            ];
          }
        }),
        _: 1
        /* STABLE */
      }, _parent));
      _push(`<div class="min-h-screen bg-linear-to-b from-gray-50 via-white to-gray-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-900"><!-- Background Effects --><div class="fixed inset-0 -z-10 overflow-hidden pointer-events-none"><div class="absolute top-0 left-1/4 w-125 h-125 bg-orange-500/10 rounded-full blur-3xl"></div><div class="absolute top-1/3 right-1/4 w-100 h-100 bg-red-500/10 rounded-full blur-3xl"></div><div class="absolute bottom-1/4 left-1/2 w-150 h-75 bg-yellow-500/5 rounded-full blur-3xl"></div></div><!-- Hero Section --><div class="relative bg-linear-to-r from-orange-500 via-red-500 to-pink-500 overflow-hidden"><!-- Pattern Overlay --><div class="absolute inset-0 opacity-10"><svg class="w-full h-full" xmlns="http://www.w3.org/2000/svg"><defs><pattern id="fire-pattern" x="0" y="0" width="60" height="60" patternUnits="userSpaceOnUse"><circle cx="30" cy="30" r="2" fill="white"></circle><circle cx="10" cy="10" r="1" fill="white"></circle><circle cx="50" cy="50" r="1" fill="white"></circle></pattern></defs><rect width="100%" height="100%" fill="url(#fire-pattern)"></rect></svg></div><div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16"><!-- Breadcrumb --><nav class="flex items-center gap-2 text-sm mb-6 text-white/80">`);
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
      _push(`<span class="text-white font-medium">Best Seller</span></nav><div class="flex flex-col md:flex-row md:items-center md:justify-between gap-6"><div><div class="flex items-center gap-4 mb-4"><div class="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center">`);
      _push(ssrRenderComponent(_component_UIcon, {
        name: "i-heroicons-fire",
        class: "w-8 h-8 text-white"
      }, null, _parent));
      _push(`</div><div><h1 class="text-3xl sm:text-4xl font-bold text-white">Best Seller</h1><p class="text-white/80 mt-1">Produk Terlaris Pilihan Vapers</p></div></div><p class="text-white/70 max-w-xl"> Temukan produk vape yang paling banyak dibeli dan dipercaya oleh ribuan customer. Kualitas terjamin, harga terbaik! </p></div><!-- Stats --><div class="flex gap-6"><div class="text-center"><p class="text-3xl font-bold text-white">${ssrInterpolate(__props.meta.total)}+</p><p class="text-sm text-white/70">Produk Terlaris</p></div><div class="text-center"><p class="text-3xl font-bold text-white">50K+</p><p class="text-sm text-white/70">Terjual</p></div></div></div></div></div><!-- Main Content --><div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8"><!-- Toolbar --><div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6"><div class="flex items-center gap-4"><p class="text-sm text-gray-500 dark:text-gray-400"> Menampilkan <span class="font-medium text-gray-900 dark:text-white">${ssrInterpolate(__props.products.length)}</span> dari <span class="font-medium text-gray-900 dark:text-white">${ssrInterpolate(__props.meta.total)}</span> produk </p></div><div class="flex items-center gap-3"><!-- Brand Filter -->`);
      _push(ssrRenderComponent(_component_USelectMenu, {
        modelValue: localFilters.value.brand,
        "onUpdate:modelValue": [($event) => localFilters.value.brand = $event, applyFilters],
        items: [{ label: "Semua Brand", value: "all" }, ...__props.brands.map((b) => ({ label: b, value: b }))],
        placeholder: "Filter Brand",
        "value-key": "value",
        class: "w-40"
      }, null, _parent));
      _push(`<!-- View Mode Toggle --><div class="hidden sm:flex items-center gap-1 p-1 bg-gray-100 dark:bg-gray-800 rounded-lg">`);
      _push(ssrRenderComponent(_component_UButton, {
        color: viewMode.value === "grid" ? "primary" : "neutral",
        variant: viewMode.value === "grid" ? "solid" : "ghost",
        size: "sm",
        square: "",
        onClick: ($event) => viewMode.value = "grid"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_UIcon, {
              name: "i-heroicons-squares-2x2",
              class: "w-4 h-4"
            }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_UIcon, {
                name: "i-heroicons-squares-2x2",
                class: "w-4 h-4"
              })
            ];
          }
        }),
        _: 1
        /* STABLE */
      }, _parent));
      _push(ssrRenderComponent(_component_UButton, {
        color: viewMode.value === "list" ? "primary" : "neutral",
        variant: viewMode.value === "list" ? "solid" : "ghost",
        size: "sm",
        square: "",
        onClick: ($event) => viewMode.value = "list"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_UIcon, {
              name: "i-heroicons-list-bullet",
              class: "w-4 h-4"
            }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_UIcon, {
                name: "i-heroicons-list-bullet",
                class: "w-4 h-4"
              })
            ];
          }
        }),
        _: 1
        /* STABLE */
      }, _parent));
      _push(`</div></div></div><!-- Products Grid -->`);
      if (__props.products.length > 0) {
        _push(`<div><!-- Grid View -->`);
        if (viewMode.value === "grid") {
          _push(`<div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4"><!--[-->`);
          ssrRenderList(__props.products, (product, index) => {
            _push(ssrRenderComponent(_sfc_main$5, {
              key: product.id,
              product,
              onAddToCart: handleAddToCart,
              onAddToWishlist: handleAddToWishlist
            }, {
              badge: withCtx((_, _push2, _parent2, _scopeId) => {
                if (_push2) {
                  if (index < 3) {
                    _push2(`<div class="absolute top-2 left-2 z-10"${_scopeId}><div class="${ssrRenderClass([
                      "w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-lg",
                      index === 0 ? "bg-yellow-500" : index === 1 ? "bg-gray-400" : "bg-orange-600"
                    ])}"${_scopeId}>${ssrInterpolate(index + 1)}</div></div>`);
                  } else {
                    _push2(`<!---->`);
                  }
                } else {
                  return [
                    index < 3 ? (openBlock(), createBlock("div", {
                      key: 0,
                      class: "absolute top-2 left-2 z-10"
                    }, [
                      createVNode(
                        "div",
                        {
                          class: [
                            "w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-lg",
                            index === 0 ? "bg-yellow-500" : index === 1 ? "bg-gray-400" : "bg-orange-600"
                          ]
                        },
                        toDisplayString(index + 1),
                        3
                        /* TEXT, CLASS */
                      )
                    ])) : createCommentVNode("v-if", true)
                  ];
                }
              }),
              _: 2
              /* DYNAMIC */
            }, _parent));
          });
          _push(`<!--]--></div>`);
        } else {
          _push(`<!--[--><!-- List View --><div class="space-y-4"><!--[-->`);
          ssrRenderList(__props.products, (product) => {
            _push(ssrRenderComponent(_sfc_main$6, {
              key: product.id,
              product,
              onAddToCart: handleAddToCart,
              onAddToWishlist: handleAddToWishlist
            }, null, _parent));
          });
          _push(`<!--]--></div><!--]-->`);
        }
        _push(`<!-- Pagination -->`);
        if (totalPages.value > 1) {
          _push(`<div class="mt-8 flex justify-center">`);
          _push(ssrRenderComponent(_component_UPagination, {
            page: currentPage.value,
            "onUpdate:page": [($event) => currentPage.value = $event, goToPage],
            total: __props.meta.total,
            "items-per-page": __props.meta.perPage,
            "show-edges": ""
          }, null, _parent));
          _push(`</div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div>`);
      } else {
        _push(`<!--[--><!-- Empty State --><div class="text-center py-16"><div class="w-24 h-24 mx-auto mb-6 rounded-3xl bg-orange-500/10 flex items-center justify-center">`);
        _push(ssrRenderComponent(_component_UIcon, {
          name: "i-heroicons-fire",
          class: "w-12 h-12 text-orange-500"
        }, null, _parent));
        _push(`</div><h2 class="text-xl font-bold text-gray-900 dark:text-white mb-2">Belum Ada Produk</h2><p class="text-gray-500 dark:text-gray-400 mb-6">Coba ubah filter untuk menemukan produk best seller.</p>`);
        _push(ssrRenderComponent(_component_UButton, {
          color: "primary",
          onClick: clearFilters
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(` Reset Filter `);
            } else {
              return [
                createTextVNode(" Reset Filter ")
              ];
            }
          }),
          _: 1
          /* STABLE */
        }, _parent));
        _push(`</div><!--]-->`);
      }
      _push(`</div><!-- Why Best Seller Section --><div class="bg-white dark:bg-gray-800/50 border-y border-gray-200 dark:border-gray-700"><div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12"><h2 class="text-2xl font-bold text-gray-900 dark:text-white text-center mb-8"> Kenapa Pilih Produk Best Seller? </h2><div class="grid grid-cols-1 md:grid-cols-3 gap-6"><div class="text-center p-6"><div class="w-14 h-14 mx-auto mb-4 rounded-2xl bg-orange-500/10 flex items-center justify-center">`);
      _push(ssrRenderComponent(_component_UIcon, {
        name: "i-heroicons-star",
        class: "w-7 h-7 text-orange-500"
      }, null, _parent));
      _push(`</div><h3 class="font-semibold text-gray-900 dark:text-white mb-2">Terbukti Berkualitas</h3><p class="text-sm text-gray-500 dark:text-gray-400"> Dipilih dan direview positif oleh ribuan customer satisfied </p></div><div class="text-center p-6"><div class="w-14 h-14 mx-auto mb-4 rounded-2xl bg-red-500/10 flex items-center justify-center">`);
      _push(ssrRenderComponent(_component_UIcon, {
        name: "i-heroicons-shield-check",
        class: "w-7 h-7 text-red-500"
      }, null, _parent));
      _push(`</div><h3 class="font-semibold text-gray-900 dark:text-white mb-2">Garansi Original</h3><p class="text-sm text-gray-500 dark:text-gray-400"> 100% produk original dengan garansi resmi dari brand </p></div><div class="text-center p-6"><div class="w-14 h-14 mx-auto mb-4 rounded-2xl bg-yellow-500/10 flex items-center justify-center">`);
      _push(ssrRenderComponent(_component_UIcon, {
        name: "i-heroicons-truck",
        class: "w-7 h-7 text-yellow-500"
      }, null, _parent));
      _push(`</div><h3 class="font-semibold text-gray-900 dark:text-white mb-2">Fast Delivery</h3><p class="text-sm text-gray-500 dark:text-gray-400"> Stok selalu ready, pengiriman cepat ke seluruh Indonesia </p></div></div></div></div></div><!--]-->`);
    };
  }
});

const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("inertia/pages/collections/best-seller.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
