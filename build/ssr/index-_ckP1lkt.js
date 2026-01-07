import { _ as _sfc_main$c } from './Pagination-B8CAUWkD.js';
import { a as _sfc_main$3, _ as _sfc_main$8 } from './default-pjkA2Ka0.js';
import { _ as _sfc_main$6, u as useToast } from './Badge-CQlYH3Fo.js';
import { defineComponent, mergeProps, withCtx, createTextVNode, createVNode, createCommentVNode, renderSlot, toDisplayString, useSSRContext, mergeModels, useModel, ref, computed, unref, createBlock, openBlock, withKeys, isRef, Fragment, renderList } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderSlot, ssrRenderList, ssrRenderAttr, ssrIncludeBooleanAttr, ssrLooseEqual } from 'vue/server-renderer';
import { Head, router } from '@inertiajs/vue3';
import { useHead } from '@unhead/vue';
import { u as useCollectionFilters, _ as _sfc_main$9, a as _sfc_main$d, b as _sfc_main$e } from './CollectionEmptyState-fuGeWGgR.js';
import { n as _sfc_main$4, _ as _sfc_main$5, a as _sfc_main$7 } from './Button-BTdvmZ8N.js';
import { _ as _sfc_main$a } from './ProductCard-Dppblc24.js';
import { _ as _sfc_main$b } from './ProductCardList-CZGKRxcP.js';
import 'reka-ui';
import '@vueuse/core';
import './virtual_nuxt-ui-plugins-CrG8Uaxr.js';
import '@unhead/vue/client';
import 'tailwindcss/colors';
import 'hookable';
import 'defu';
import 'ohash/utils';
import './Modal-VctJV7vb.js';
import 'vaul-vue';
import './DropdownMenu-Zcq6i1qV.js';
import 'reka-ui/namespaced';
import './Checkbox-DCS-_c5K.js';
import './SelectMenu-BqLaY6AT.js';
import 'tailwind-variants';
import '@iconify/vue';
import 'ufo';

const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "CollectionHeader",
  __ssrInlineRender: true,
  props: {
    activeCategory: {}
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UContainer = _sfc_main$3;
      const _component_ULink = _sfc_main$4;
      const _component_UIcon = _sfc_main$5;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800" }, _attrs))}>`);
      _push(ssrRenderComponent(_component_UContainer, { class: "py-6 lg:py-8" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="flex flex-col gap-4"${_scopeId}><!-- Breadcrumb --><nav class="flex items-center gap-2 text-sm"${_scopeId}>`);
            _push2(ssrRenderComponent(_component_ULink, {
              to: "/",
              class: "text-gray-500 dark:text-gray-400 hover:text-primary-500"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Beranda `);
                } else {
                  return [
                    createTextVNode(" Beranda ")
                  ];
                }
              }),
              _: 1
              /* STABLE */
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_UIcon, {
              name: "i-heroicons-chevron-right",
              class: "w-4 h-4 text-gray-400"
            }, null, _parent2, _scopeId));
            _push2(`<span class="text-gray-900 dark:text-white font-medium"${_scopeId}>${ssrInterpolate(__props.activeCategory ? __props.activeCategory.name : "Semua Produk")}</span></nav><!-- Title & Description --><div${_scopeId}><h1 class="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white"${_scopeId}>${ssrInterpolate(__props.activeCategory ? __props.activeCategory.name : "Koleksi Produk")}</h1><p class="mt-1 text-gray-600 dark:text-gray-400"${_scopeId}>${ssrInterpolate(__props.activeCategory?.description || "Temukan berbagai produk vape berkualitas")}</p></div><!-- Mobile Search Slot -->`);
            ssrRenderSlot(_ctx.$slots, "mobile-search", {}, null, _push2, _parent2, _scopeId);
            _push2(`</div>`);
          } else {
            return [
              createVNode("div", { class: "flex flex-col gap-4" }, [
                createCommentVNode(" Breadcrumb "),
                createVNode("nav", { class: "flex items-center gap-2 text-sm" }, [
                  createVNode(_component_ULink, {
                    to: "/",
                    class: "text-gray-500 dark:text-gray-400 hover:text-primary-500"
                  }, {
                    default: withCtx(() => [
                      createTextVNode(" Beranda ")
                    ]),
                    _: 1
                    /* STABLE */
                  }),
                  createVNode(_component_UIcon, {
                    name: "i-heroicons-chevron-right",
                    class: "w-4 h-4 text-gray-400"
                  }),
                  createVNode(
                    "span",
                    { class: "text-gray-900 dark:text-white font-medium" },
                    toDisplayString(__props.activeCategory ? __props.activeCategory.name : "Semua Produk"),
                    1
                    /* TEXT */
                  )
                ]),
                createCommentVNode(" Title & Description "),
                createVNode("div", null, [
                  createVNode(
                    "h1",
                    { class: "text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white" },
                    toDisplayString(__props.activeCategory ? __props.activeCategory.name : "Koleksi Produk"),
                    1
                    /* TEXT */
                  ),
                  createVNode(
                    "p",
                    { class: "mt-1 text-gray-600 dark:text-gray-400" },
                    toDisplayString(__props.activeCategory?.description || "Temukan berbagai produk vape berkualitas"),
                    1
                    /* TEXT */
                  )
                ]),
                createCommentVNode(" Mobile Search Slot "),
                renderSlot(_ctx.$slots, "mobile-search")
              ])
            ];
          }
        }),
        _: 3
        /* FORWARDED */
      }, _parent));
      _push(`</div>`);
    };
  }
});

const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("inertia/components/collections/CollectionHeader.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};

const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "CollectionFilters",
  __ssrInlineRender: true,
  props: /* @__PURE__ */ mergeModels({
    categories: {},
    brands: {},
    hasActiveFilters: { type: Boolean }
  }, {
    "filters": { required: true },
    "filtersModifiers": {}
  }),
  emits: /* @__PURE__ */ mergeModels(["apply", "clear"], ["update:filters"]),
  setup(__props, { emit: __emit }) {
    const filters = useModel(__props, "filters");
    const emit = __emit;
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UInput = _sfc_main$6;
      const _component_UButton = _sfc_main$7;
      const _component_UIcon = _sfc_main$5;
      _push(`<aside${ssrRenderAttrs(mergeProps({ class: "hidden lg:block w-64 shrink-0" }, _attrs))}><div class="sticky top-24 space-y-6"><!-- Search --><div class="bg-white dark:bg-gray-900 rounded-xl p-4 border border-gray-200 dark:border-gray-800"><h3 class="font-semibold text-gray-900 dark:text-white mb-3">Pencarian</h3>`);
      _push(ssrRenderComponent(_component_UInput, {
        modelValue: filters.value.search,
        "onUpdate:modelValue": ($event) => filters.value.search = $event,
        placeholder: "Cari produk...",
        icon: "i-heroicons-magnifying-glass",
        onKeyup: ($event) => emit("apply")
      }, null, _parent));
      _push(`</div><!-- Categories --><div class="bg-white dark:bg-gray-900 rounded-xl p-4 border border-gray-200 dark:border-gray-800"><h3 class="font-semibold text-gray-900 dark:text-white mb-3">Kategori</h3><div class="space-y-2 max-h-60 overflow-y-auto"><!--[-->`);
      ssrRenderList(__props.categories, (category) => {
        _push(`<label class="flex items-center gap-2 cursor-pointer group"><input type="radio"${ssrRenderAttr("value", category.slug)}${ssrIncludeBooleanAttr(ssrLooseEqual(filters.value.category, category.slug)) ? " checked" : ""} class="w-4 h-4 text-primary-500 border-gray-300 dark:border-gray-600 focus:ring-primary-500"><span class="text-sm text-gray-700 dark:text-gray-300 group-hover:text-primary-500 transition-colors">${ssrInterpolate(category.name)}</span></label>`);
      });
      _push(`<!--]--><label class="flex items-center gap-2 cursor-pointer group"><input type="radio" value=""${ssrIncludeBooleanAttr(ssrLooseEqual(filters.value.category, "")) ? " checked" : ""} class="w-4 h-4 text-primary-500 border-gray-300 dark:border-gray-600 focus:ring-primary-500"><span class="text-sm text-gray-700 dark:text-gray-300 group-hover:text-primary-500 transition-colors"> Semua Kategori </span></label></div></div><!-- Brands --><div class="bg-white dark:bg-gray-900 rounded-xl p-4 border border-gray-200 dark:border-gray-800"><h3 class="font-semibold text-gray-900 dark:text-white mb-3">Brand</h3><div class="space-y-2 max-h-60 overflow-y-auto"><!--[-->`);
      ssrRenderList(__props.brands, (brand) => {
        _push(`<label class="flex items-center gap-2 cursor-pointer group"><input type="radio"${ssrRenderAttr("value", brand)}${ssrIncludeBooleanAttr(ssrLooseEqual(filters.value.brand, brand)) ? " checked" : ""} class="w-4 h-4 text-primary-500 border-gray-300 dark:border-gray-600 focus:ring-primary-500"><span class="text-sm text-gray-700 dark:text-gray-300 group-hover:text-primary-500 transition-colors">${ssrInterpolate(brand)}</span></label>`);
      });
      _push(`<!--]--><label class="flex items-center gap-2 cursor-pointer group"><input type="radio" value=""${ssrIncludeBooleanAttr(ssrLooseEqual(filters.value.brand, "")) ? " checked" : ""} class="w-4 h-4 text-primary-500 border-gray-300 dark:border-gray-600 focus:ring-primary-500"><span class="text-sm text-gray-700 dark:text-gray-300 group-hover:text-primary-500 transition-colors"> Semua Brand </span></label></div></div><!-- Price Range --><div class="bg-white dark:bg-gray-900 rounded-xl p-4 border border-gray-200 dark:border-gray-800"><h3 class="font-semibold text-gray-900 dark:text-white mb-3">Rentang Harga</h3><div class="space-y-3">`);
      _push(ssrRenderComponent(_component_UInput, {
        modelValue: filters.value.minPrice,
        "onUpdate:modelValue": ($event) => filters.value.minPrice = $event,
        type: "number",
        placeholder: "Harga Min",
        icon: "i-heroicons-currency-dollar"
      }, null, _parent));
      _push(ssrRenderComponent(_component_UInput, {
        modelValue: filters.value.maxPrice,
        "onUpdate:modelValue": ($event) => filters.value.maxPrice = $event,
        type: "number",
        placeholder: "Harga Max",
        icon: "i-heroicons-currency-dollar"
      }, null, _parent));
      _push(`</div></div><!-- Apply & Clear Buttons --><div class="flex flex-col gap-2">`);
      _push(ssrRenderComponent(_component_UButton, {
        color: "primary",
        block: "",
        onClick: ($event) => emit("apply")
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_UIcon, {
              name: "i-heroicons-funnel",
              class: "w-4 h-4"
            }, null, _parent2, _scopeId));
            _push2(` Terapkan Filter `);
          } else {
            return [
              createVNode(_component_UIcon, {
                name: "i-heroicons-funnel",
                class: "w-4 h-4"
              }),
              createTextVNode(" Terapkan Filter ")
            ];
          }
        }),
        _: 1
        /* STABLE */
      }, _parent));
      if (__props.hasActiveFilters) {
        _push(ssrRenderComponent(_component_UButton, {
          color: "neutral",
          variant: "ghost",
          block: "",
          onClick: ($event) => emit("clear")
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(_component_UIcon, {
                name: "i-heroicons-x-mark",
                class: "w-4 h-4"
              }, null, _parent2, _scopeId));
              _push2(` Hapus Filter `);
            } else {
              return [
                createVNode(_component_UIcon, {
                  name: "i-heroicons-x-mark",
                  class: "w-4 h-4"
                }),
                createTextVNode(" Hapus Filter ")
              ];
            }
          }),
          _: 1
          /* STABLE */
        }, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div></aside>`);
    };
  }
});

const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("inertia/components/collections/CollectionFilters.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};

const siteUrl = "https://ogitu.com";
const siteName = "Ogitu";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  props: {
    products: {},
    meta: {},
    categories: {},
    brands: {},
    filters: {},
    activeCategory: {}
  },
  setup(__props) {
    const props = __props;
    const {
      localFilters,
      isMobileFilterOpen,
      hasActiveFilters,
      activeFilterCount,
      applyFilters,
      clearFilters,
      clearSingleFilter,
      goToPage,
      sortOptions
    } = useCollectionFilters(props.filters);
    const viewMode = ref("grid");
    const currentPage = ref(props.meta.currentPage);
    const totalPages = computed(() => props.meta.lastPage);
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
    const pageTitle = computed(() => {
      if (props.activeCategory) {
        return `${props.activeCategory.name} - Beli Vape & Rokok Elektrik Original | ${siteName}`;
      }
      if (props.filters.search) {
        return `Hasil Pencarian "${props.filters.search}" - ${siteName}`;
      }
      if (props.filters.brand) {
        return `Produk ${props.filters.brand} - Vape & Rokok Elektrik | ${siteName}`;
      }
      return `Koleksi Vape & Rokok Elektrik Terlengkap | ${siteName}`;
    });
    const pageDescription = computed(() => {
      const totalProducts = props.meta.total;
      if (props.activeCategory) {
        return `Jual ${props.activeCategory.name} original ${totalProducts}+ pilihan. ${props.activeCategory.description || "Temukan vape, pod system, mod kit, liquid premium dengan harga terbaik."} Garansi resmi & gratis ongkir ke seluruh Indonesia.`;
      }
      if (props.filters.search) {
        return `Temukan ${totalProducts} produk untuk "${props.filters.search}". Belanja vape, pod, liquid, dan aksesoris berkualitas dengan harga terbaik di Ogitu.`;
      }
      if (props.filters.brand) {
        return `Koleksi lengkap produk ${props.filters.brand} original. ${totalProducts}+ varian vape, pod system, dan liquid tersedia. Garansi resmi, gratis ongkir.`;
      }
      return `Belanja vape, rokok elektrik, pod system, mod kit, liquid premium dari ${totalProducts}+ produk. Harga terbaik, 100% original, gratis ongkir ke seluruh Indonesia.`;
    });
    const pageKeywords = computed(() => {
      const baseKeywords = [
        "vape",
        "rokok elektrik",
        "pod system",
        "mod kit",
        "liquid vape",
        "e-liquid",
        "salt nicotine",
        "coil",
        "atomizer",
        "vaporizer",
        "toko vape online",
        "jual vape murah",
        "vape indonesia"
      ];
      if (props.activeCategory) {
        return [props.activeCategory.name, `jual ${props.activeCategory.name}`, `beli ${props.activeCategory.name}`, ...baseKeywords].join(", ");
      }
      if (props.filters.brand) {
        return [`${props.filters.brand} vape`, `${props.filters.brand} pod`, `${props.filters.brand} original`, ...baseKeywords].join(", ");
      }
      return baseKeywords.join(", ");
    });
    const canonicalUrl = computed(() => {
      let url = `${siteUrl}/collections`;
      const params = new URLSearchParams();
      if (props.filters.category) params.set("category", props.filters.category);
      if (props.filters.brand) params.set("brand", props.filters.brand);
      if (props.filters.search) params.set("search", props.filters.search);
      if (props.meta.currentPage > 1) params.set("page", String(props.meta.currentPage));
      const queryString = params.toString();
      return queryString ? `${url}?${queryString}` : url;
    });
    const structuredData = computed(() => ({
      "@context": "https://schema.org",
      "@graph": [
        // BreadcrumbList
        {
          "@type": "BreadcrumbList",
          itemListElement: [
            {
              "@type": "ListItem",
              position: 1,
              name: "Beranda",
              item: siteUrl
            },
            {
              "@type": "ListItem",
              position: 2,
              name: "Koleksi Produk",
              item: `${siteUrl}/collections`
            },
            ...props.activeCategory ? [
              {
                "@type": "ListItem",
                position: 3,
                name: props.activeCategory.name,
                item: `${siteUrl}/collections/${props.activeCategory.slug}`
              }
            ] : []
          ]
        },
        // CollectionPage / SearchResultsPage
        {
          "@type": props.filters.search ? "SearchResultsPage" : "CollectionPage",
          name: props.activeCategory?.name || "Koleksi Vape & Rokok Elektrik",
          description: pageDescription.value,
          url: canonicalUrl.value,
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
                description: `${product.name} - ${product.brand || "Vape"} berkualitas`,
                brand: product.brand ? {
                  "@type": "Brand",
                  name: product.brand
                } : void 0,
                offers: {
                  "@type": "Offer",
                  price: product.discountPrice || product.price,
                  priceCurrency: "IDR",
                  availability: product.stock > 0 ? "https://schema.org/InStock" : "https://schema.org/OutOfStock"
                },
                ...product.rating > 0 && {
                  aggregateRating: {
                    "@type": "AggregateRating",
                    ratingValue: product.rating,
                    reviewCount: product.totalReviews,
                    bestRating: 5,
                    worstRating: 1
                  }
                }
              }
            }))
          }
        },
        // WebSite SearchAction
        {
          "@type": "WebSite",
          "@id": `${siteUrl}/#website`,
          url: siteUrl,
          name: siteName,
          potentialAction: {
            "@type": "SearchAction",
            target: {
              "@type": "EntryPoint",
              urlTemplate: `${siteUrl}/collections?search={search_term_string}`
            },
            "query-input": "required name=search_term_string"
          }
        },
        // Organization
        {
          "@type": "Organization",
          "@id": `${siteUrl}/#organization`,
          name: siteName,
          url: siteUrl,
          logo: `${siteUrl}/images/logo.png`,
          sameAs: [
            "https://www.facebook.com/ogitu.id",
            "https://www.instagram.com/ogitu.id",
            "https://twitter.com/ogitu_id",
            "https://www.tiktok.com/@ogitu.id"
          ]
        }
      ]
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
      const _component_UInput = _sfc_main$6;
      const _component_UContainer = _sfc_main$3;
      const _component_UPagination = _sfc_main$c;
      _push(ssrRenderComponent(_sfc_main$8, _attrs, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(Head), null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<title${_scopeId2}>${ssrInterpolate(pageTitle.value)}</title><meta name="description"${ssrRenderAttr("content", pageDescription.value)}${_scopeId2}><meta name="keywords"${ssrRenderAttr("content", pageKeywords.value)}${_scopeId2}><meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"${_scopeId2}><link rel="canonical"${ssrRenderAttr("href", canonicalUrl.value)}${_scopeId2}><!-- Pagination SEO -->`);
                  if (__props.meta.currentPage > 1) {
                    _push3(`<link rel="prev"${ssrRenderAttr("href", `${canonicalUrl.value.replace(/page=\d+/, `page=${__props.meta.currentPage - 1}`)}`)}${_scopeId2}>`);
                  } else {
                    _push3(`<!---->`);
                  }
                  if (__props.meta.currentPage < __props.meta.lastPage) {
                    _push3(`<link rel="next"${ssrRenderAttr("href", `${canonicalUrl.value.includes("page=") ? canonicalUrl.value.replace(/page=\d+/, `page=${__props.meta.currentPage + 1}`) : `${canonicalUrl.value}${canonicalUrl.value.includes("?") ? "&" : "?"}page=${__props.meta.currentPage + 1}`}`)}${_scopeId2}>`);
                  } else {
                    _push3(`<!---->`);
                  }
                  _push3(`<!-- Open Graph --><meta property="og:title"${ssrRenderAttr("content", pageTitle.value)}${_scopeId2}><meta property="og:description"${ssrRenderAttr("content", pageDescription.value)}${_scopeId2}><meta property="og:type" content="website"${_scopeId2}><meta property="og:url"${ssrRenderAttr("content", canonicalUrl.value)}${_scopeId2}><meta property="og:site_name" content="Ogitu"${_scopeId2}><meta property="og:locale" content="id_ID"${_scopeId2}><meta property="og:image"${ssrRenderAttr("content", __props.products[0]?.image || "https://ogitu.com/images/og-collections.jpg")}${_scopeId2}><meta property="og:image:width" content="1200"${_scopeId2}><meta property="og:image:height" content="630"${_scopeId2}><meta property="og:image:alt"${ssrRenderAttr("content", __props.activeCategory?.name || "Koleksi Vape & Rokok Elektrik Ogitu")}${_scopeId2}><!-- Twitter Card --><meta name="twitter:card" content="summary_large_image"${_scopeId2}><meta name="twitter:site" content="@ogitu_id"${_scopeId2}><meta name="twitter:title"${ssrRenderAttr("content", pageTitle.value)}${_scopeId2}><meta name="twitter:description"${ssrRenderAttr("content", pageDescription.value)}${_scopeId2}><meta name="twitter:image"${ssrRenderAttr("content", __props.products[0]?.image || "https://ogitu.com/images/og-collections.jpg")}${_scopeId2}><!-- Additional E-commerce Meta --><meta property="product:price:currency" content="IDR"${_scopeId2}>`);
                  if (__props.products.length > 0) {
                    _push3(`<meta property="product:price:amount"${ssrRenderAttr("content", String(__props.products[0].discountPrice || __props.products[0].price))}${_scopeId2}>`);
                  } else {
                    _push3(`<!---->`);
                  }
                  _push3(`<meta property="product:availability"${ssrRenderAttr("content", __props.products.some((p) => p.stock > 0) ? "in stock" : "out of stock")}${_scopeId2}>`);
                } else {
                  return [
                    createVNode(
                      "title",
                      null,
                      toDisplayString(pageTitle.value),
                      1
                      /* TEXT */
                    ),
                    createVNode("meta", {
                      name: "description",
                      content: pageDescription.value
                    }, null, 8, ["content"]),
                    createVNode("meta", {
                      name: "keywords",
                      content: pageKeywords.value
                    }, null, 8, ["content"]),
                    createVNode("meta", {
                      name: "robots",
                      content: "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"
                    }),
                    createVNode("link", {
                      rel: "canonical",
                      href: canonicalUrl.value
                    }, null, 8, ["href"]),
                    createCommentVNode(" Pagination SEO "),
                    __props.meta.currentPage > 1 ? (openBlock(), createBlock("link", {
                      key: 0,
                      rel: "prev",
                      href: `${canonicalUrl.value.replace(/page=\d+/, `page=${__props.meta.currentPage - 1}`)}`
                    }, null, 8, ["href"])) : createCommentVNode("v-if", true),
                    __props.meta.currentPage < __props.meta.lastPage ? (openBlock(), createBlock("link", {
                      key: 1,
                      rel: "next",
                      href: `${canonicalUrl.value.includes("page=") ? canonicalUrl.value.replace(/page=\d+/, `page=${__props.meta.currentPage + 1}`) : `${canonicalUrl.value}${canonicalUrl.value.includes("?") ? "&" : "?"}page=${__props.meta.currentPage + 1}`}`
                    }, null, 8, ["href"])) : createCommentVNode("v-if", true),
                    createCommentVNode(" Open Graph "),
                    createVNode("meta", {
                      property: "og:title",
                      content: pageTitle.value
                    }, null, 8, ["content"]),
                    createVNode("meta", {
                      property: "og:description",
                      content: pageDescription.value
                    }, null, 8, ["content"]),
                    createVNode("meta", {
                      property: "og:type",
                      content: "website"
                    }),
                    createVNode("meta", {
                      property: "og:url",
                      content: canonicalUrl.value
                    }, null, 8, ["content"]),
                    createVNode("meta", {
                      property: "og:site_name",
                      content: "Ogitu"
                    }),
                    createVNode("meta", {
                      property: "og:locale",
                      content: "id_ID"
                    }),
                    createVNode("meta", {
                      property: "og:image",
                      content: __props.products[0]?.image || "https://ogitu.com/images/og-collections.jpg"
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
                      property: "og:image:alt",
                      content: __props.activeCategory?.name || "Koleksi Vape & Rokok Elektrik Ogitu"
                    }, null, 8, ["content"]),
                    createCommentVNode(" Twitter Card "),
                    createVNode("meta", {
                      name: "twitter:card",
                      content: "summary_large_image"
                    }),
                    createVNode("meta", {
                      name: "twitter:site",
                      content: "@ogitu_id"
                    }),
                    createVNode("meta", {
                      name: "twitter:title",
                      content: pageTitle.value
                    }, null, 8, ["content"]),
                    createVNode("meta", {
                      name: "twitter:description",
                      content: pageDescription.value
                    }, null, 8, ["content"]),
                    createVNode("meta", {
                      name: "twitter:image",
                      content: __props.products[0]?.image || "https://ogitu.com/images/og-collections.jpg"
                    }, null, 8, ["content"]),
                    createCommentVNode(" Additional E-commerce Meta "),
                    createVNode("meta", {
                      property: "product:price:currency",
                      content: "IDR"
                    }),
                    __props.products.length > 0 ? (openBlock(), createBlock("meta", {
                      key: 2,
                      property: "product:price:amount",
                      content: String(__props.products[0].discountPrice || __props.products[0].price)
                    }, null, 8, ["content"])) : createCommentVNode("v-if", true),
                    createVNode("meta", {
                      property: "product:availability",
                      content: __props.products.some((p) => p.stock > 0) ? "in stock" : "out of stock"
                    }, null, 8, ["content"])
                  ];
                }
              }),
              _: 1
              /* STABLE */
            }, _parent2, _scopeId));
            _push2(`<div class="min-h-screen bg-gray-50 dark:bg-gray-950"${_scopeId}><!-- Page Header -->`);
            _push2(ssrRenderComponent(_sfc_main$2, { "active-category": __props.activeCategory }, {
              "mobile-search": withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="lg:hidden"${_scopeId2}>`);
                  _push3(ssrRenderComponent(_component_UInput, {
                    modelValue: unref(localFilters).search,
                    "onUpdate:modelValue": ($event) => unref(localFilters).search = $event,
                    placeholder: "Cari produk...",
                    icon: "i-heroicons-magnifying-glass",
                    size: "lg",
                    onKeyup: unref(applyFilters)
                  }, null, _parent3, _scopeId2));
                  _push3(`</div>`);
                } else {
                  return [
                    createVNode("div", { class: "lg:hidden" }, [
                      createVNode(_component_UInput, {
                        modelValue: unref(localFilters).search,
                        "onUpdate:modelValue": ($event) => unref(localFilters).search = $event,
                        placeholder: "Cari produk...",
                        icon: "i-heroicons-magnifying-glass",
                        size: "lg",
                        onKeyup: withKeys(unref(applyFilters), ["enter"])
                      }, null, 8, ["modelValue", "onUpdate:modelValue", "onKeyup"])
                    ])
                  ];
                }
              }),
              _: 1
              /* STABLE */
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_UContainer, { class: "py-6 lg:py-8" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="flex flex-col lg:flex-row gap-6 lg:gap-8"${_scopeId2}><!-- Sidebar Filters (Desktop) -->`);
                  _push3(ssrRenderComponent(_sfc_main$1, {
                    filters: unref(localFilters),
                    "onUpdate:filters": ($event) => isRef(localFilters) ? localFilters.value = $event : null,
                    categories: __props.categories,
                    brands: __props.brands,
                    "has-active-filters": unref(hasActiveFilters),
                    onApply: unref(applyFilters),
                    onClear: unref(clearFilters)
                  }, null, _parent3, _scopeId2));
                  _push3(`<!-- Main Content --><div class="flex-1 min-w-0"${_scopeId2}><!-- Toolbar -->`);
                  _push3(ssrRenderComponent(_sfc_main$9, {
                    "view-mode": viewMode.value,
                    "onUpdate:viewMode": ($event) => viewMode.value = $event,
                    filters: unref(localFilters),
                    "onUpdate:filters": ($event) => isRef(localFilters) ? localFilters.value = $event : null,
                    "total-shown": __props.products.length,
                    "total-products": __props.meta.total,
                    categories: __props.categories,
                    "active-filter-count": unref(activeFilterCount),
                    "has-active-filters": unref(hasActiveFilters),
                    "sort-options": unref(sortOptions),
                    onOpenMobileFilter: ($event) => isMobileFilterOpen.value = true,
                    onApply: unref(applyFilters),
                    onClearFilter: unref(clearSingleFilter)
                  }, null, _parent3, _scopeId2));
                  _push3(`<!-- Products -->`);
                  if (__props.products.length > 0) {
                    _push3(`<div${_scopeId2}><!-- Grid View -->`);
                    if (viewMode.value === "grid") {
                      _push3(`<div class="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4 lg:gap-6"${_scopeId2}><!--[-->`);
                      ssrRenderList(__props.products, (product) => {
                        _push3(ssrRenderComponent(_sfc_main$a, {
                          key: product.id,
                          product,
                          onAddToCart: handleAddToCart,
                          onAddToWishlist: handleAddToWishlist
                        }, null, _parent3, _scopeId2));
                      });
                      _push3(`<!--]--></div>`);
                    } else {
                      _push3(`<!--[--><!-- List View --><div class="space-y-4"${_scopeId2}><!--[-->`);
                      ssrRenderList(__props.products, (product) => {
                        _push3(ssrRenderComponent(_sfc_main$b, {
                          key: product.id,
                          product,
                          onAddToCart: handleAddToCart,
                          onAddToWishlist: handleAddToWishlist
                        }, null, _parent3, _scopeId2));
                      });
                      _push3(`<!--]--></div><!--]-->`);
                    }
                    _push3(`<!-- Pagination -->`);
                    if (totalPages.value > 1) {
                      _push3(`<div class="mt-8 flex justify-center"${_scopeId2}>`);
                      _push3(ssrRenderComponent(_component_UPagination, {
                        page: currentPage.value,
                        "onUpdate:page": [($event) => currentPage.value = $event, unref(goToPage)],
                        total: __props.meta.total,
                        "items-per-page": __props.meta.perPage,
                        "show-edges": ""
                      }, null, _parent3, _scopeId2));
                      _push3(`</div>`);
                    } else {
                      _push3(`<!---->`);
                    }
                    _push3(`</div>`);
                  } else {
                    _push3(`<!--[--><!-- Empty State -->`);
                    _push3(ssrRenderComponent(_sfc_main$d, { onReset: unref(clearFilters) }, null, _parent3, _scopeId2));
                    _push3(`<!--]-->`);
                  }
                  _push3(`</div></div>`);
                } else {
                  return [
                    createVNode("div", { class: "flex flex-col lg:flex-row gap-6 lg:gap-8" }, [
                      createCommentVNode(" Sidebar Filters (Desktop) "),
                      createVNode(_sfc_main$1, {
                        filters: unref(localFilters),
                        "onUpdate:filters": ($event) => isRef(localFilters) ? localFilters.value = $event : null,
                        categories: __props.categories,
                        brands: __props.brands,
                        "has-active-filters": unref(hasActiveFilters),
                        onApply: unref(applyFilters),
                        onClear: unref(clearFilters)
                      }, null, 8, ["filters", "onUpdate:filters", "categories", "brands", "has-active-filters", "onApply", "onClear"]),
                      createCommentVNode(" Main Content "),
                      createVNode("div", { class: "flex-1 min-w-0" }, [
                        createCommentVNode(" Toolbar "),
                        createVNode(_sfc_main$9, {
                          "view-mode": viewMode.value,
                          "onUpdate:viewMode": ($event) => viewMode.value = $event,
                          filters: unref(localFilters),
                          "onUpdate:filters": ($event) => isRef(localFilters) ? localFilters.value = $event : null,
                          "total-shown": __props.products.length,
                          "total-products": __props.meta.total,
                          categories: __props.categories,
                          "active-filter-count": unref(activeFilterCount),
                          "has-active-filters": unref(hasActiveFilters),
                          "sort-options": unref(sortOptions),
                          onOpenMobileFilter: ($event) => isMobileFilterOpen.value = true,
                          onApply: unref(applyFilters),
                          onClearFilter: unref(clearSingleFilter)
                        }, null, 8, ["view-mode", "onUpdate:viewMode", "filters", "onUpdate:filters", "total-shown", "total-products", "categories", "active-filter-count", "has-active-filters", "sort-options", "onOpenMobileFilter", "onApply", "onClearFilter"]),
                        createCommentVNode(" Products "),
                        __props.products.length > 0 ? (openBlock(), createBlock("div", { key: 0 }, [
                          createCommentVNode(" Grid View "),
                          viewMode.value === "grid" ? (openBlock(), createBlock("div", {
                            key: 0,
                            class: "grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4 lg:gap-6"
                          }, [
                            (openBlock(true), createBlock(
                              Fragment,
                              null,
                              renderList(__props.products, (product) => {
                                return openBlock(), createBlock(_sfc_main$a, {
                                  key: product.id,
                                  product,
                                  onAddToCart: handleAddToCart,
                                  onAddToWishlist: handleAddToWishlist
                                }, null, 8, ["product"]);
                              }),
                              128
                              /* KEYED_FRAGMENT */
                            ))
                          ])) : (openBlock(), createBlock(
                            Fragment,
                            { key: 1 },
                            [
                              createCommentVNode(" List View "),
                              createVNode("div", { class: "space-y-4" }, [
                                (openBlock(true), createBlock(
                                  Fragment,
                                  null,
                                  renderList(__props.products, (product) => {
                                    return openBlock(), createBlock(_sfc_main$b, {
                                      key: product.id,
                                      product,
                                      onAddToCart: handleAddToCart,
                                      onAddToWishlist: handleAddToWishlist
                                    }, null, 8, ["product"]);
                                  }),
                                  128
                                  /* KEYED_FRAGMENT */
                                ))
                              ])
                            ],
                            2112
                            /* STABLE_FRAGMENT, DEV_ROOT_FRAGMENT */
                          )),
                          createCommentVNode(" Pagination "),
                          totalPages.value > 1 ? (openBlock(), createBlock("div", {
                            key: 2,
                            class: "mt-8 flex justify-center"
                          }, [
                            createVNode(_component_UPagination, {
                              page: currentPage.value,
                              "onUpdate:page": [($event) => currentPage.value = $event, unref(goToPage)],
                              total: __props.meta.total,
                              "items-per-page": __props.meta.perPage,
                              "show-edges": ""
                            }, null, 8, ["page", "onUpdate:page", "total", "items-per-page"])
                          ])) : createCommentVNode("v-if", true)
                        ])) : (openBlock(), createBlock(
                          Fragment,
                          { key: 1 },
                          [
                            createCommentVNode(" Empty State "),
                            createVNode(_sfc_main$d, { onReset: unref(clearFilters) }, null, 8, ["onReset"])
                          ],
                          2112
                          /* STABLE_FRAGMENT, DEV_ROOT_FRAGMENT */
                        ))
                      ])
                    ])
                  ];
                }
              }),
              _: 1
              /* STABLE */
            }, _parent2, _scopeId));
            _push2(`</div><!-- Mobile Filter Sidebar -->`);
            _push2(ssrRenderComponent(_sfc_main$e, {
              open: unref(isMobileFilterOpen),
              "onUpdate:open": ($event) => isRef(isMobileFilterOpen) ? isMobileFilterOpen.value = $event : null,
              filters: unref(localFilters),
              "onUpdate:filters": ($event) => isRef(localFilters) ? localFilters.value = $event : null,
              categories: __props.categories,
              brands: __props.brands,
              "has-active-filters": unref(hasActiveFilters),
              onApply: unref(applyFilters),
              onClear: unref(clearFilters)
            }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(unref(Head), null, {
                default: withCtx(() => [
                  createVNode(
                    "title",
                    null,
                    toDisplayString(pageTitle.value),
                    1
                    /* TEXT */
                  ),
                  createVNode("meta", {
                    name: "description",
                    content: pageDescription.value
                  }, null, 8, ["content"]),
                  createVNode("meta", {
                    name: "keywords",
                    content: pageKeywords.value
                  }, null, 8, ["content"]),
                  createVNode("meta", {
                    name: "robots",
                    content: "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"
                  }),
                  createVNode("link", {
                    rel: "canonical",
                    href: canonicalUrl.value
                  }, null, 8, ["href"]),
                  createCommentVNode(" Pagination SEO "),
                  __props.meta.currentPage > 1 ? (openBlock(), createBlock("link", {
                    key: 0,
                    rel: "prev",
                    href: `${canonicalUrl.value.replace(/page=\d+/, `page=${__props.meta.currentPage - 1}`)}`
                  }, null, 8, ["href"])) : createCommentVNode("v-if", true),
                  __props.meta.currentPage < __props.meta.lastPage ? (openBlock(), createBlock("link", {
                    key: 1,
                    rel: "next",
                    href: `${canonicalUrl.value.includes("page=") ? canonicalUrl.value.replace(/page=\d+/, `page=${__props.meta.currentPage + 1}`) : `${canonicalUrl.value}${canonicalUrl.value.includes("?") ? "&" : "?"}page=${__props.meta.currentPage + 1}`}`
                  }, null, 8, ["href"])) : createCommentVNode("v-if", true),
                  createCommentVNode(" Open Graph "),
                  createVNode("meta", {
                    property: "og:title",
                    content: pageTitle.value
                  }, null, 8, ["content"]),
                  createVNode("meta", {
                    property: "og:description",
                    content: pageDescription.value
                  }, null, 8, ["content"]),
                  createVNode("meta", {
                    property: "og:type",
                    content: "website"
                  }),
                  createVNode("meta", {
                    property: "og:url",
                    content: canonicalUrl.value
                  }, null, 8, ["content"]),
                  createVNode("meta", {
                    property: "og:site_name",
                    content: "Ogitu"
                  }),
                  createVNode("meta", {
                    property: "og:locale",
                    content: "id_ID"
                  }),
                  createVNode("meta", {
                    property: "og:image",
                    content: __props.products[0]?.image || "https://ogitu.com/images/og-collections.jpg"
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
                    property: "og:image:alt",
                    content: __props.activeCategory?.name || "Koleksi Vape & Rokok Elektrik Ogitu"
                  }, null, 8, ["content"]),
                  createCommentVNode(" Twitter Card "),
                  createVNode("meta", {
                    name: "twitter:card",
                    content: "summary_large_image"
                  }),
                  createVNode("meta", {
                    name: "twitter:site",
                    content: "@ogitu_id"
                  }),
                  createVNode("meta", {
                    name: "twitter:title",
                    content: pageTitle.value
                  }, null, 8, ["content"]),
                  createVNode("meta", {
                    name: "twitter:description",
                    content: pageDescription.value
                  }, null, 8, ["content"]),
                  createVNode("meta", {
                    name: "twitter:image",
                    content: __props.products[0]?.image || "https://ogitu.com/images/og-collections.jpg"
                  }, null, 8, ["content"]),
                  createCommentVNode(" Additional E-commerce Meta "),
                  createVNode("meta", {
                    property: "product:price:currency",
                    content: "IDR"
                  }),
                  __props.products.length > 0 ? (openBlock(), createBlock("meta", {
                    key: 2,
                    property: "product:price:amount",
                    content: String(__props.products[0].discountPrice || __props.products[0].price)
                  }, null, 8, ["content"])) : createCommentVNode("v-if", true),
                  createVNode("meta", {
                    property: "product:availability",
                    content: __props.products.some((p) => p.stock > 0) ? "in stock" : "out of stock"
                  }, null, 8, ["content"])
                ]),
                _: 1
                /* STABLE */
              }),
              createVNode("div", { class: "min-h-screen bg-gray-50 dark:bg-gray-950" }, [
                createCommentVNode(" Page Header "),
                createVNode(_sfc_main$2, { "active-category": __props.activeCategory }, {
                  "mobile-search": withCtx(() => [
                    createVNode("div", { class: "lg:hidden" }, [
                      createVNode(_component_UInput, {
                        modelValue: unref(localFilters).search,
                        "onUpdate:modelValue": ($event) => unref(localFilters).search = $event,
                        placeholder: "Cari produk...",
                        icon: "i-heroicons-magnifying-glass",
                        size: "lg",
                        onKeyup: withKeys(unref(applyFilters), ["enter"])
                      }, null, 8, ["modelValue", "onUpdate:modelValue", "onKeyup"])
                    ])
                  ]),
                  _: 1
                  /* STABLE */
                }, 8, ["active-category"]),
                createVNode(_component_UContainer, { class: "py-6 lg:py-8" }, {
                  default: withCtx(() => [
                    createVNode("div", { class: "flex flex-col lg:flex-row gap-6 lg:gap-8" }, [
                      createCommentVNode(" Sidebar Filters (Desktop) "),
                      createVNode(_sfc_main$1, {
                        filters: unref(localFilters),
                        "onUpdate:filters": ($event) => isRef(localFilters) ? localFilters.value = $event : null,
                        categories: __props.categories,
                        brands: __props.brands,
                        "has-active-filters": unref(hasActiveFilters),
                        onApply: unref(applyFilters),
                        onClear: unref(clearFilters)
                      }, null, 8, ["filters", "onUpdate:filters", "categories", "brands", "has-active-filters", "onApply", "onClear"]),
                      createCommentVNode(" Main Content "),
                      createVNode("div", { class: "flex-1 min-w-0" }, [
                        createCommentVNode(" Toolbar "),
                        createVNode(_sfc_main$9, {
                          "view-mode": viewMode.value,
                          "onUpdate:viewMode": ($event) => viewMode.value = $event,
                          filters: unref(localFilters),
                          "onUpdate:filters": ($event) => isRef(localFilters) ? localFilters.value = $event : null,
                          "total-shown": __props.products.length,
                          "total-products": __props.meta.total,
                          categories: __props.categories,
                          "active-filter-count": unref(activeFilterCount),
                          "has-active-filters": unref(hasActiveFilters),
                          "sort-options": unref(sortOptions),
                          onOpenMobileFilter: ($event) => isMobileFilterOpen.value = true,
                          onApply: unref(applyFilters),
                          onClearFilter: unref(clearSingleFilter)
                        }, null, 8, ["view-mode", "onUpdate:viewMode", "filters", "onUpdate:filters", "total-shown", "total-products", "categories", "active-filter-count", "has-active-filters", "sort-options", "onOpenMobileFilter", "onApply", "onClearFilter"]),
                        createCommentVNode(" Products "),
                        __props.products.length > 0 ? (openBlock(), createBlock("div", { key: 0 }, [
                          createCommentVNode(" Grid View "),
                          viewMode.value === "grid" ? (openBlock(), createBlock("div", {
                            key: 0,
                            class: "grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4 lg:gap-6"
                          }, [
                            (openBlock(true), createBlock(
                              Fragment,
                              null,
                              renderList(__props.products, (product) => {
                                return openBlock(), createBlock(_sfc_main$a, {
                                  key: product.id,
                                  product,
                                  onAddToCart: handleAddToCart,
                                  onAddToWishlist: handleAddToWishlist
                                }, null, 8, ["product"]);
                              }),
                              128
                              /* KEYED_FRAGMENT */
                            ))
                          ])) : (openBlock(), createBlock(
                            Fragment,
                            { key: 1 },
                            [
                              createCommentVNode(" List View "),
                              createVNode("div", { class: "space-y-4" }, [
                                (openBlock(true), createBlock(
                                  Fragment,
                                  null,
                                  renderList(__props.products, (product) => {
                                    return openBlock(), createBlock(_sfc_main$b, {
                                      key: product.id,
                                      product,
                                      onAddToCart: handleAddToCart,
                                      onAddToWishlist: handleAddToWishlist
                                    }, null, 8, ["product"]);
                                  }),
                                  128
                                  /* KEYED_FRAGMENT */
                                ))
                              ])
                            ],
                            2112
                            /* STABLE_FRAGMENT, DEV_ROOT_FRAGMENT */
                          )),
                          createCommentVNode(" Pagination "),
                          totalPages.value > 1 ? (openBlock(), createBlock("div", {
                            key: 2,
                            class: "mt-8 flex justify-center"
                          }, [
                            createVNode(_component_UPagination, {
                              page: currentPage.value,
                              "onUpdate:page": [($event) => currentPage.value = $event, unref(goToPage)],
                              total: __props.meta.total,
                              "items-per-page": __props.meta.perPage,
                              "show-edges": ""
                            }, null, 8, ["page", "onUpdate:page", "total", "items-per-page"])
                          ])) : createCommentVNode("v-if", true)
                        ])) : (openBlock(), createBlock(
                          Fragment,
                          { key: 1 },
                          [
                            createCommentVNode(" Empty State "),
                            createVNode(_sfc_main$d, { onReset: unref(clearFilters) }, null, 8, ["onReset"])
                          ],
                          2112
                          /* STABLE_FRAGMENT, DEV_ROOT_FRAGMENT */
                        ))
                      ])
                    ])
                  ]),
                  _: 1
                  /* STABLE */
                })
              ]),
              createCommentVNode(" Mobile Filter Sidebar "),
              createVNode(_sfc_main$e, {
                open: unref(isMobileFilterOpen),
                "onUpdate:open": ($event) => isRef(isMobileFilterOpen) ? isMobileFilterOpen.value = $event : null,
                filters: unref(localFilters),
                "onUpdate:filters": ($event) => isRef(localFilters) ? localFilters.value = $event : null,
                categories: __props.categories,
                brands: __props.brands,
                "has-active-filters": unref(hasActiveFilters),
                onApply: unref(applyFilters),
                onClear: unref(clearFilters)
              }, null, 8, ["open", "onUpdate:open", "filters", "onUpdate:filters", "categories", "brands", "has-active-filters", "onApply", "onClear"])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("inertia/pages/collections/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
