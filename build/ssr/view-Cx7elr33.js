import { _ as _sfc_main$a } from './Pagination-B8CAUWkD.js';
import { _ as _sfc_main$3, a as _sfc_main$7 } from './Button-BTdvmZ8N.js';
import { _ as _sfc_main$6, u as useToast, b as _export_sfc } from './Badge-CQlYH3Fo.js';
import { _ as _sfc_main$5 } from './Carousel-DO4g9mgK.js';
import { _ as _sfc_main$1, a as _sfc_main$2 } from './default-pjkA2Ka0.js';
import { defineComponent, computed, ref, withCtx, unref, createVNode, createCommentVNode, createBlock, toDisplayString, openBlock, createTextVNode, Fragment, renderList, isRef, withDirectives, vModelRadio, useSSRContext } from 'vue';
import { ssrRenderComponent, ssrInterpolate, ssrRenderAttr, ssrRenderStyle, ssrRenderList, ssrIncludeBooleanAttr, ssrLooseEqual } from 'vue/server-renderer';
import { Head, Link, router } from '@inertiajs/vue3';
import { useHead } from '@unhead/vue';
import { u as useCollectionFilters, _ as _sfc_main$8, a as _sfc_main$b, b as _sfc_main$c } from './CollectionEmptyState-fuGeWGgR.js';
import { _ as _sfc_main$4 } from './ProductCard-Dppblc24.js';
import { _ as _sfc_main$9 } from './ProductCardList-CZGKRxcP.js';
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
import 'reka-ui/namespaced';
import 'embla-carousel-vue';
import './Modal-VctJV7vb.js';
import 'vaul-vue';
import './DropdownMenu-Zcq6i1qV.js';
import './Checkbox-DCS-_c5K.js';
import './SelectMenu-BqLaY6AT.js';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "view",
  __ssrInlineRender: true,
  props: {
    category: {},
    parentCategory: {},
    subcategories: {},
    products: {},
    meta: {},
    brands: {},
    featuredProducts: {},
    newArrivals: {},
    filters: {}
  },
  setup(__props) {
    const props = __props;
    const extendedFilters = computed(() => ({
      search: "",
      category: props.category.slug,
      brand: props.filters.brand || "",
      minPrice: String(props.filters.minPrice || ""),
      maxPrice: String(props.filters.maxPrice || ""),
      sortBy: props.filters.sortBy || "newest"
    }));
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
    } = useCollectionFilters(extendedFilters.value);
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
              item: window.location.origin
            },
            {
              "@type": "ListItem",
              position: 2,
              name: "Koleksi",
              item: `${window.location.origin}/collections`
            },
            ...props.parentCategory ? [
              {
                "@type": "ListItem",
                position: 3,
                name: props.parentCategory.name,
                item: `${window.location.origin}/collections/${props.parentCategory.slug}`
              },
              {
                "@type": "ListItem",
                position: 4,
                name: props.category.name,
                item: `${window.location.origin}/collections/${props.category.slug}`
              }
            ] : [
              {
                "@type": "ListItem",
                position: 3,
                name: props.category.name,
                item: `${window.location.origin}/collections/${props.category.slug}`
              }
            ]
          ]
        },
        // CollectionPage
        {
          "@type": "CollectionPage",
          name: props.category.name,
          description: props.category.description || `Temukan berbagai produk ${props.category.name} berkualitas di Ogitu`,
          url: `${window.location.origin}/collections/${props.category.slug}`,
          ...props.category.image && { image: props.category.image },
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
                url: `${window.location.origin}/products/${product.slug}`,
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
                    reviewCount: product.totalReviews
                  }
                }
              }
            }))
          }
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
    const pageTitle = computed(() => `${props.category.name} - Koleksi Produk Vape`);
    const pageDescription = computed(
      () => props.category.description || `Jelajahi koleksi ${props.category.name} terlengkap. Temukan ${props.meta.total}+ produk berkualitas dengan harga terbaik hanya di Ogitu.`
    );
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UContainer = _sfc_main$2;
      const _component_UIcon = _sfc_main$3;
      const _component_UCarousel = _sfc_main$5;
      const _component_UInput = _sfc_main$6;
      const _component_UButton = _sfc_main$7;
      const _component_UPagination = _sfc_main$a;
      _push(ssrRenderComponent(_sfc_main$1, _attrs, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(Head), null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<title data-v-3b4cde4a${_scopeId2}>${ssrInterpolate(__props.category.name)}</title><meta name="description"${ssrRenderAttr("content", __props.category.description ?? `Jelajahi koleksi ${__props.category.name} terlengkap. Temukan ${__props.meta.total}+ produk berkualitas dengan harga terbaik hanya di Ogitu.`)} data-v-3b4cde4a${_scopeId2}><meta name="keywords"${ssrRenderAttr("content", `${__props.category.name}, vape, e-liquid, pod, mod, ogitu`)} data-v-3b4cde4a${_scopeId2}><!-- Open Graph --><meta property="og:title"${ssrRenderAttr("content", pageTitle.value)} data-v-3b4cde4a${_scopeId2}><meta property="og:description"${ssrRenderAttr("content", pageDescription.value)} data-v-3b4cde4a${_scopeId2}><meta property="og:type" content="website" data-v-3b4cde4a${_scopeId2}><meta property="og:url"${ssrRenderAttr("content", `${_ctx.$page.props.appUrl}/collections/${__props.category.slug}`)} data-v-3b4cde4a${_scopeId2}>`);
                  if (__props.category.image) {
                    _push3(`<meta property="og:image"${ssrRenderAttr("content", __props.category.image)} data-v-3b4cde4a${_scopeId2}>`);
                  } else {
                    _push3(`<!---->`);
                  }
                  _push3(`<!-- Twitter Card --><meta name="twitter:card" content="summary_large_image" data-v-3b4cde4a${_scopeId2}><meta name="twitter:title"${ssrRenderAttr("content", pageTitle.value)} data-v-3b4cde4a${_scopeId2}><meta name="twitter:description"${ssrRenderAttr("content", pageDescription.value)} data-v-3b4cde4a${_scopeId2}>`);
                } else {
                  return [
                    createVNode(
                      "title",
                      null,
                      toDisplayString(__props.category.name),
                      1
                      /* TEXT */
                    ),
                    createVNode("meta", {
                      name: "description",
                      content: __props.category.description ?? `Jelajahi koleksi ${__props.category.name} terlengkap. Temukan ${__props.meta.total}+ produk berkualitas dengan harga terbaik hanya di Ogitu.`
                    }, null, 8, ["content"]),
                    createVNode("meta", {
                      name: "keywords",
                      content: `${__props.category.name}, vape, e-liquid, pod, mod, ogitu`
                    }, null, 8, ["content"]),
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
                      content: `${_ctx.$page.props.appUrl}/collections/${__props.category.slug}`
                    }, null, 8, ["content"]),
                    __props.category.image ? (openBlock(), createBlock("meta", {
                      key: 0,
                      property: "og:image",
                      content: __props.category.image
                    }, null, 8, ["content"])) : createCommentVNode("v-if", true),
                    createCommentVNode(" Twitter Card "),
                    createVNode("meta", {
                      name: "twitter:card",
                      content: "summary_large_image"
                    }),
                    createVNode("meta", {
                      name: "twitter:title",
                      content: pageTitle.value
                    }, null, 8, ["content"]),
                    createVNode("meta", {
                      name: "twitter:description",
                      content: pageDescription.value
                    }, null, 8, ["content"])
                  ];
                }
              }),
              _: 1
              /* STABLE */
            }, _parent2, _scopeId));
            _push2(`<div class="min-h-screen bg-gray-50 dark:bg-gray-950" data-v-3b4cde4a${_scopeId}><!-- Category Hero Banner --><div class="relative bg-linear-to-br from-primary-600 via-primary-700 to-primary-800 dark:from-primary-800 dark:via-primary-900 dark:to-gray-900" data-v-3b4cde4a${_scopeId}><!-- Background Pattern --><div class="absolute inset-0 opacity-10" data-v-3b4cde4a${_scopeId}><svg class="w-full h-full" xmlns="http://www.w3.org/2000/svg" data-v-3b4cde4a${_scopeId}><defs data-v-3b4cde4a${_scopeId}><pattern id="hero-pattern" width="40" height="40" patternUnits="userSpaceOnUse" data-v-3b4cde4a${_scopeId}><circle cx="20" cy="20" r="2" fill="currentColor" data-v-3b4cde4a${_scopeId}></circle></pattern></defs><rect width="100%" height="100%" fill="url(#hero-pattern)" data-v-3b4cde4a${_scopeId}></rect></svg></div><!-- Category Image Overlay -->`);
            if (__props.category.image) {
              _push2(`<div class="absolute inset-0 bg-cover bg-center opacity-20" style="${ssrRenderStyle({ backgroundImage: `url(${__props.category.image})` })}" data-v-3b4cde4a${_scopeId}></div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(ssrRenderComponent(_component_UContainer, { class: "relative py-8 lg:py-12" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<!-- Breadcrumb --><nav class="mb-6" aria-label="Breadcrumb" data-v-3b4cde4a${_scopeId2}><ol class="flex items-center flex-wrap gap-2 text-sm" data-v-3b4cde4a${_scopeId2}><li data-v-3b4cde4a${_scopeId2}>`);
                  _push3(ssrRenderComponent(unref(Link), {
                    href: "/",
                    class: "text-white/70 hover:text-white transition-colors"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(` Beranda `);
                      } else {
                        return [
                          createTextVNode(" Beranda ")
                        ];
                      }
                    }),
                    _: 1
                    /* STABLE */
                  }, _parent3, _scopeId2));
                  _push3(`</li><li class="text-white/50" data-v-3b4cde4a${_scopeId2}>/</li><li data-v-3b4cde4a${_scopeId2}>`);
                  _push3(ssrRenderComponent(unref(Link), {
                    href: "/collections",
                    class: "text-white/70 hover:text-white transition-colors"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(` Koleksi `);
                      } else {
                        return [
                          createTextVNode(" Koleksi ")
                        ];
                      }
                    }),
                    _: 1
                    /* STABLE */
                  }, _parent3, _scopeId2));
                  _push3(`</li>`);
                  if (__props.parentCategory) {
                    _push3(`<!--[--><li class="text-white/50" data-v-3b4cde4a${_scopeId2}>/</li><li data-v-3b4cde4a${_scopeId2}>`);
                    _push3(ssrRenderComponent(unref(Link), {
                      href: `/collections/${__props.parentCategory.slug}`,
                      class: "text-white/70 hover:text-white transition-colors"
                    }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`${ssrInterpolate(__props.parentCategory.name)}`);
                        } else {
                          return [
                            createTextVNode(
                              toDisplayString(__props.parentCategory.name),
                              1
                              /* TEXT */
                            )
                          ];
                        }
                      }),
                      _: 1
                      /* STABLE */
                    }, _parent3, _scopeId2));
                    _push3(`</li><!--]-->`);
                  } else {
                    _push3(`<!---->`);
                  }
                  _push3(`<li class="text-white/50" data-v-3b4cde4a${_scopeId2}>/</li><li class="text-white font-medium" data-v-3b4cde4a${_scopeId2}>${ssrInterpolate(__props.category.name)}</li></ol></nav><!-- Category Info --><div class="max-w-3xl" data-v-3b4cde4a${_scopeId2}><h1 class="text-3xl lg:text-4xl xl:text-5xl font-bold text-white mb-4" data-v-3b4cde4a${_scopeId2}>${ssrInterpolate(__props.category.name)}</h1>`);
                  if (__props.category.description) {
                    _push3(`<p class="text-lg text-white/80 mb-6" data-v-3b4cde4a${_scopeId2}>${ssrInterpolate(__props.category.description)}</p>`);
                  } else {
                    _push3(`<!---->`);
                  }
                  _push3(`<div class="flex items-center gap-4 text-white/70" data-v-3b4cde4a${_scopeId2}><span class="flex items-center gap-2" data-v-3b4cde4a${_scopeId2}>`);
                  _push3(ssrRenderComponent(_component_UIcon, {
                    name: "i-heroicons-cube",
                    class: "w-5 h-5"
                  }, null, _parent3, _scopeId2));
                  _push3(` ${ssrInterpolate(__props.meta.total)} Produk </span>`);
                  if (__props.brands.length > 0) {
                    _push3(`<span class="flex items-center gap-2" data-v-3b4cde4a${_scopeId2}>`);
                    _push3(ssrRenderComponent(_component_UIcon, {
                      name: "i-heroicons-building-storefront",
                      class: "w-5 h-5"
                    }, null, _parent3, _scopeId2));
                    _push3(` ${ssrInterpolate(__props.brands.length)} Brand </span>`);
                  } else {
                    _push3(`<!---->`);
                  }
                  _push3(`</div></div>`);
                } else {
                  return [
                    createCommentVNode(" Breadcrumb "),
                    createVNode("nav", {
                      class: "mb-6",
                      "aria-label": "Breadcrumb"
                    }, [
                      createVNode("ol", { class: "flex items-center flex-wrap gap-2 text-sm" }, [
                        createVNode("li", null, [
                          createVNode(unref(Link), {
                            href: "/",
                            class: "text-white/70 hover:text-white transition-colors"
                          }, {
                            default: withCtx(() => [
                              createTextVNode(" Beranda ")
                            ]),
                            _: 1
                            /* STABLE */
                          })
                        ]),
                        createVNode("li", { class: "text-white/50" }, "/"),
                        createVNode("li", null, [
                          createVNode(unref(Link), {
                            href: "/collections",
                            class: "text-white/70 hover:text-white transition-colors"
                          }, {
                            default: withCtx(() => [
                              createTextVNode(" Koleksi ")
                            ]),
                            _: 1
                            /* STABLE */
                          })
                        ]),
                        __props.parentCategory ? (openBlock(), createBlock(
                          Fragment,
                          { key: 0 },
                          [
                            createVNode("li", { class: "text-white/50" }, "/"),
                            createVNode("li", null, [
                              createVNode(unref(Link), {
                                href: `/collections/${__props.parentCategory.slug}`,
                                class: "text-white/70 hover:text-white transition-colors"
                              }, {
                                default: withCtx(() => [
                                  createTextVNode(
                                    toDisplayString(__props.parentCategory.name),
                                    1
                                    /* TEXT */
                                  )
                                ]),
                                _: 1
                                /* STABLE */
                              }, 8, ["href"])
                            ])
                          ],
                          64
                          /* STABLE_FRAGMENT */
                        )) : createCommentVNode("v-if", true),
                        createVNode("li", { class: "text-white/50" }, "/"),
                        createVNode(
                          "li",
                          { class: "text-white font-medium" },
                          toDisplayString(__props.category.name),
                          1
                          /* TEXT */
                        )
                      ])
                    ]),
                    createCommentVNode(" Category Info "),
                    createVNode("div", { class: "max-w-3xl" }, [
                      createVNode(
                        "h1",
                        { class: "text-3xl lg:text-4xl xl:text-5xl font-bold text-white mb-4" },
                        toDisplayString(__props.category.name),
                        1
                        /* TEXT */
                      ),
                      __props.category.description ? (openBlock(), createBlock(
                        "p",
                        {
                          key: 0,
                          class: "text-lg text-white/80 mb-6"
                        },
                        toDisplayString(__props.category.description),
                        1
                        /* TEXT */
                      )) : createCommentVNode("v-if", true),
                      createVNode("div", { class: "flex items-center gap-4 text-white/70" }, [
                        createVNode("span", { class: "flex items-center gap-2" }, [
                          createVNode(_component_UIcon, {
                            name: "i-heroicons-cube",
                            class: "w-5 h-5"
                          }),
                          createTextVNode(
                            " " + toDisplayString(__props.meta.total) + " Produk ",
                            1
                            /* TEXT */
                          )
                        ]),
                        __props.brands.length > 0 ? (openBlock(), createBlock("span", {
                          key: 0,
                          class: "flex items-center gap-2"
                        }, [
                          createVNode(_component_UIcon, {
                            name: "i-heroicons-building-storefront",
                            class: "w-5 h-5"
                          }),
                          createTextVNode(
                            " " + toDisplayString(__props.brands.length) + " Brand ",
                            1
                            /* TEXT */
                          )
                        ])) : createCommentVNode("v-if", true)
                      ])
                    ])
                  ];
                }
              }),
              _: 1
              /* STABLE */
            }, _parent2, _scopeId));
            _push2(`</div><!-- Subcategories -->`);
            if (__props.subcategories.length > 0) {
              _push2(`<div class="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800" data-v-3b4cde4a${_scopeId}>`);
              _push2(ssrRenderComponent(_component_UContainer, { class: "py-4" }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`<div class="flex items-center gap-3 overflow-x-auto pb-2 scrollbar-hide" data-v-3b4cde4a${_scopeId2}><span class="text-sm text-gray-500 dark:text-gray-400 whitespace-nowrap" data-v-3b4cde4a${_scopeId2}>Subkategori:</span><!--[-->`);
                    ssrRenderList(__props.subcategories, (subcat) => {
                      _push3(ssrRenderComponent(unref(Link), {
                        key: subcat.id,
                        href: `/collections/${subcat.slug}`,
                        class: "inline-flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-800 hover:bg-primary-100 dark:hover:bg-primary-900/30 text-gray-700 dark:text-gray-300 hover:text-primary-700 dark:hover:text-primary-400 rounded-full text-sm font-medium transition-colors whitespace-nowrap"
                      }, {
                        default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                          if (_push4) {
                            if (subcat.image) {
                              _push4(`<img${ssrRenderAttr("src", subcat.image)}${ssrRenderAttr("alt", subcat.name)} class="w-5 h-5 rounded-full object-cover" data-v-3b4cde4a${_scopeId3}>`);
                            } else {
                              _push4(`<!---->`);
                            }
                            _push4(` ${ssrInterpolate(subcat.name)}`);
                          } else {
                            return [
                              subcat.image ? (openBlock(), createBlock("img", {
                                key: 0,
                                src: subcat.image,
                                alt: subcat.name,
                                class: "w-5 h-5 rounded-full object-cover"
                              }, null, 8, ["src", "alt"])) : createCommentVNode("v-if", true),
                              createTextVNode(
                                " " + toDisplayString(subcat.name),
                                1
                                /* TEXT */
                              )
                            ];
                          }
                        }),
                        _: 2
                        /* DYNAMIC */
                      }, _parent3, _scopeId2));
                    });
                    _push3(`<!--]--></div>`);
                  } else {
                    return [
                      createVNode("div", { class: "flex items-center gap-3 overflow-x-auto pb-2 scrollbar-hide" }, [
                        createVNode("span", { class: "text-sm text-gray-500 dark:text-gray-400 whitespace-nowrap" }, "Subkategori:"),
                        (openBlock(true), createBlock(
                          Fragment,
                          null,
                          renderList(__props.subcategories, (subcat) => {
                            return openBlock(), createBlock(unref(Link), {
                              key: subcat.id,
                              href: `/collections/${subcat.slug}`,
                              class: "inline-flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-800 hover:bg-primary-100 dark:hover:bg-primary-900/30 text-gray-700 dark:text-gray-300 hover:text-primary-700 dark:hover:text-primary-400 rounded-full text-sm font-medium transition-colors whitespace-nowrap"
                            }, {
                              default: withCtx(() => [
                                subcat.image ? (openBlock(), createBlock("img", {
                                  key: 0,
                                  src: subcat.image,
                                  alt: subcat.name,
                                  class: "w-5 h-5 rounded-full object-cover"
                                }, null, 8, ["src", "alt"])) : createCommentVNode("v-if", true),
                                createTextVNode(
                                  " " + toDisplayString(subcat.name),
                                  1
                                  /* TEXT */
                                )
                              ]),
                              _: 2
                              /* DYNAMIC */
                            }, 1032, ["href"]);
                          }),
                          128
                          /* KEYED_FRAGMENT */
                        ))
                      ])
                    ];
                  }
                }),
                _: 1
                /* STABLE */
              }, _parent2, _scopeId));
              _push2(`</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`<!-- Featured Products Section -->`);
            if (__props.featuredProducts.length > 0) {
              _push2(`<div class="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800" data-v-3b4cde4a${_scopeId}>`);
              _push2(ssrRenderComponent(_component_UContainer, { class: "py-8" }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`<div class="flex items-center justify-between mb-6" data-v-3b4cde4a${_scopeId2}><div data-v-3b4cde4a${_scopeId2}><h2 class="text-xl lg:text-2xl font-bold text-gray-900 dark:text-white" data-v-3b4cde4a${_scopeId2}> ⭐ Produk Unggulan ${ssrInterpolate(__props.category.name)}</h2><p class="text-sm text-gray-500 dark:text-gray-400 mt-1" data-v-3b4cde4a${_scopeId2}> Pilihan terbaik dari kategori ini </p></div></div><div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 sm:gap-4" data-v-3b4cde4a${_scopeId2}><!--[-->`);
                    ssrRenderList(__props.featuredProducts.slice(0, 6), (product) => {
                      _push3(ssrRenderComponent(_sfc_main$4, {
                        key: product.id,
                        product,
                        size: "sm",
                        onAddToCart: handleAddToCart,
                        onAddToWishlist: handleAddToWishlist
                      }, null, _parent3, _scopeId2));
                    });
                    _push3(`<!--]--></div>`);
                  } else {
                    return [
                      createVNode("div", { class: "flex items-center justify-between mb-6" }, [
                        createVNode("div", null, [
                          createVNode(
                            "h2",
                            { class: "text-xl lg:text-2xl font-bold text-gray-900 dark:text-white" },
                            " ⭐ Produk Unggulan " + toDisplayString(__props.category.name),
                            1
                            /* TEXT */
                          ),
                          createVNode("p", { class: "text-sm text-gray-500 dark:text-gray-400 mt-1" }, " Pilihan terbaik dari kategori ini ")
                        ])
                      ]),
                      createVNode("div", { class: "grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 sm:gap-4" }, [
                        (openBlock(true), createBlock(
                          Fragment,
                          null,
                          renderList(__props.featuredProducts.slice(0, 6), (product) => {
                            return openBlock(), createBlock(_sfc_main$4, {
                              key: product.id,
                              product,
                              size: "sm",
                              onAddToCart: handleAddToCart,
                              onAddToWishlist: handleAddToWishlist
                            }, null, 8, ["product"]);
                          }),
                          128
                          /* KEYED_FRAGMENT */
                        ))
                      ])
                    ];
                  }
                }),
                _: 1
                /* STABLE */
              }, _parent2, _scopeId));
              _push2(`</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`<!-- New Arrivals Section -->`);
            if (__props.newArrivals.length > 0) {
              _push2(`<div class="bg-gray-50 dark:bg-gray-950 border-b border-gray-200 dark:border-gray-800" data-v-3b4cde4a${_scopeId}>`);
              _push2(ssrRenderComponent(_component_UContainer, { class: "py-8" }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`<div class="flex items-center justify-between mb-6" data-v-3b4cde4a${_scopeId2}><div data-v-3b4cde4a${_scopeId2}><h2 class="text-xl lg:text-2xl font-bold text-gray-900 dark:text-white" data-v-3b4cde4a${_scopeId2}> Produk Terbaru </h2><p class="text-sm text-gray-500 dark:text-gray-400 mt-1" data-v-3b4cde4a${_scopeId2}> Baru ditambahkan di kategori ${ssrInterpolate(__props.category.name)}</p></div></div>`);
                    _push3(ssrRenderComponent(_component_UCarousel, {
                      items: __props.newArrivals.slice(0, 10),
                      arrows: "",
                      prev: {
                        color: "neutral",
                        variant: "solid",
                        class: "rounded-full shadow-lg"
                      },
                      next: {
                        color: "neutral",
                        variant: "solid",
                        class: "rounded-full shadow-lg"
                      },
                      ui: {
                        item: "basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/4 xl:basis-1/4",
                        prev: "start-2 sm:start-4",
                        next: "end-2 sm:end-4"
                      },
                      class: "w-full"
                    }, {
                      default: withCtx(({ item }, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`<div class="p-2" data-v-3b4cde4a${_scopeId3}>`);
                          _push4(ssrRenderComponent(_sfc_main$4, {
                            product: item,
                            onAddToCart: handleAddToCart,
                            onAddToWishlist: handleAddToWishlist
                          }, null, _parent4, _scopeId3));
                          _push4(`</div>`);
                        } else {
                          return [
                            createVNode("div", { class: "p-2" }, [
                              createVNode(_sfc_main$4, {
                                product: item,
                                onAddToCart: handleAddToCart,
                                onAddToWishlist: handleAddToWishlist
                              }, null, 8, ["product"])
                            ])
                          ];
                        }
                      }),
                      _: 1
                      /* STABLE */
                    }, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode("div", { class: "flex items-center justify-between mb-6" }, [
                        createVNode("div", null, [
                          createVNode("h2", { class: "text-xl lg:text-2xl font-bold text-gray-900 dark:text-white" }, " Produk Terbaru "),
                          createVNode(
                            "p",
                            { class: "text-sm text-gray-500 dark:text-gray-400 mt-1" },
                            " Baru ditambahkan di kategori " + toDisplayString(__props.category.name),
                            1
                            /* TEXT */
                          )
                        ])
                      ]),
                      createVNode(_component_UCarousel, {
                        items: __props.newArrivals.slice(0, 10),
                        arrows: "",
                        prev: {
                          color: "neutral",
                          variant: "solid",
                          class: "rounded-full shadow-lg"
                        },
                        next: {
                          color: "neutral",
                          variant: "solid",
                          class: "rounded-full shadow-lg"
                        },
                        ui: {
                          item: "basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/4 xl:basis-1/4",
                          prev: "start-2 sm:start-4",
                          next: "end-2 sm:end-4"
                        },
                        class: "w-full"
                      }, {
                        default: withCtx(({ item }) => [
                          createVNode("div", { class: "p-2" }, [
                            createVNode(_sfc_main$4, {
                              product: item,
                              onAddToCart: handleAddToCart,
                              onAddToWishlist: handleAddToWishlist
                            }, null, 8, ["product"])
                          ])
                        ]),
                        _: 1
                        /* STABLE */
                      }, 8, ["items"])
                    ];
                  }
                }),
                _: 1
                /* STABLE */
              }, _parent2, _scopeId));
              _push2(`</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`<!-- Main Products Section -->`);
            _push2(ssrRenderComponent(_component_UContainer, { class: "py-6 lg:py-8" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="flex flex-col lg:flex-row gap-6 lg:gap-8" data-v-3b4cde4a${_scopeId2}><!-- Sidebar Filters (Desktop) --><aside class="hidden lg:block w-64 shrink-0" data-v-3b4cde4a${_scopeId2}><div class="sticky top-24 bg-white dark:bg-gray-900 rounded-xl p-6 border border-gray-200 dark:border-gray-800" data-v-3b4cde4a${_scopeId2}><h3 class="font-semibold text-gray-900 dark:text-white mb-4" data-v-3b4cde4a${_scopeId2}>Filter</h3><!-- Brand Filter -->`);
                  if (__props.brands.length > 0) {
                    _push3(`<div class="mb-6" data-v-3b4cde4a${_scopeId2}><h4 class="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3" data-v-3b4cde4a${_scopeId2}>Brand</h4><div class="space-y-2 max-h-48 overflow-y-auto" data-v-3b4cde4a${_scopeId2}><!--[-->`);
                    ssrRenderList(__props.brands, (brand) => {
                      _push3(`<label class="flex items-center gap-2 cursor-pointer" data-v-3b4cde4a${_scopeId2}><input${ssrIncludeBooleanAttr(ssrLooseEqual(unref(localFilters).brand, brand)) ? " checked" : ""} type="radio"${ssrRenderAttr("value", brand)} name="brand" class="w-4 h-4 text-primary-600 border-gray-300 focus:ring-primary-500" data-v-3b4cde4a${_scopeId2}><span class="text-sm text-gray-600 dark:text-gray-400" data-v-3b4cde4a${_scopeId2}>${ssrInterpolate(brand)}</span></label>`);
                    });
                    _push3(`<!--]-->`);
                    if (unref(localFilters).brand) {
                      _push3(`<button type="button" class="text-xs text-primary-600 hover:text-primary-700 mt-2" data-v-3b4cde4a${_scopeId2}> Hapus filter brand </button>`);
                    } else {
                      _push3(`<!---->`);
                    }
                    _push3(`</div></div>`);
                  } else {
                    _push3(`<!---->`);
                  }
                  _push3(`<!-- Price Range --><div class="mb-6" data-v-3b4cde4a${_scopeId2}><h4 class="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3" data-v-3b4cde4a${_scopeId2}> Rentang Harga </h4><div class="flex gap-2" data-v-3b4cde4a${_scopeId2}>`);
                  _push3(ssrRenderComponent(_component_UInput, {
                    modelValue: unref(localFilters).minPrice,
                    "onUpdate:modelValue": ($event) => unref(localFilters).minPrice = $event,
                    type: "number",
                    placeholder: "Min",
                    size: "sm",
                    class: "flex-1"
                  }, null, _parent3, _scopeId2));
                  _push3(`<span class="text-gray-400 self-center" data-v-3b4cde4a${_scopeId2}>-</span>`);
                  _push3(ssrRenderComponent(_component_UInput, {
                    modelValue: unref(localFilters).maxPrice,
                    "onUpdate:modelValue": ($event) => unref(localFilters).maxPrice = $event,
                    type: "number",
                    placeholder: "Max",
                    size: "sm",
                    class: "flex-1"
                  }, null, _parent3, _scopeId2));
                  _push3(`</div></div><!-- Action Buttons --><div class="flex gap-2" data-v-3b4cde4a${_scopeId2}>`);
                  _push3(ssrRenderComponent(_component_UButton, {
                    color: "primary",
                    block: "",
                    onClick: unref(applyFilters)
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(` Terapkan `);
                      } else {
                        return [
                          createTextVNode(" Terapkan ")
                        ];
                      }
                    }),
                    _: 1
                    /* STABLE */
                  }, _parent3, _scopeId2));
                  if (unref(hasActiveFilters)) {
                    _push3(ssrRenderComponent(_component_UButton, {
                      color: "neutral",
                      variant: "ghost",
                      onClick: unref(clearFilters)
                    }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(` Reset `);
                        } else {
                          return [
                            createTextVNode(" Reset ")
                          ];
                        }
                      }),
                      _: 1
                      /* STABLE */
                    }, _parent3, _scopeId2));
                  } else {
                    _push3(`<!---->`);
                  }
                  _push3(`</div></div></aside><!-- Main Content --><div class="flex-1 min-w-0" data-v-3b4cde4a${_scopeId2}><!-- Section Header --><div class="mb-6" data-v-3b4cde4a${_scopeId2}><h2 class="text-xl lg:text-2xl font-bold text-gray-900 dark:text-white" data-v-3b4cde4a${_scopeId2}> Semua Produk ${ssrInterpolate(__props.category.name)}</h2><p class="text-sm text-gray-500 dark:text-gray-400 mt-1" data-v-3b4cde4a${_scopeId2}> Menampilkan ${ssrInterpolate(__props.products.length)} dari ${ssrInterpolate(__props.meta.total)} produk </p></div><!-- Toolbar -->`);
                  _push3(ssrRenderComponent(_sfc_main$8, {
                    "view-mode": viewMode.value,
                    "onUpdate:viewMode": ($event) => viewMode.value = $event,
                    filters: unref(localFilters),
                    "onUpdate:filters": ($event) => isRef(localFilters) ? localFilters.value = $event : null,
                    "total-shown": __props.products.length,
                    "total-products": __props.meta.total,
                    categories: [],
                    "active-filter-count": unref(activeFilterCount),
                    "has-active-filters": unref(hasActiveFilters),
                    "sort-options": unref(sortOptions),
                    onOpenMobileFilter: ($event) => isMobileFilterOpen.value = true,
                    onApply: unref(applyFilters),
                    onClearFilter: unref(clearSingleFilter)
                  }, null, _parent3, _scopeId2));
                  _push3(`<!-- Products -->`);
                  if (__props.products.length > 0) {
                    _push3(`<div data-v-3b4cde4a${_scopeId2}><!-- Grid View -->`);
                    if (viewMode.value === "grid") {
                      _push3(`<div class="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4 lg:gap-6" data-v-3b4cde4a${_scopeId2}><!--[-->`);
                      ssrRenderList(__props.products, (product) => {
                        _push3(ssrRenderComponent(_sfc_main$4, {
                          key: product.id,
                          product,
                          onAddToCart: handleAddToCart,
                          onAddToWishlist: handleAddToWishlist
                        }, null, _parent3, _scopeId2));
                      });
                      _push3(`<!--]--></div>`);
                    } else {
                      _push3(`<!--[--><!-- List View --><div class="space-y-4" data-v-3b4cde4a${_scopeId2}><!--[-->`);
                      ssrRenderList(__props.products, (product) => {
                        _push3(ssrRenderComponent(_sfc_main$9, {
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
                      _push3(`<div class="mt-8 flex justify-center" data-v-3b4cde4a${_scopeId2}>`);
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
                    _push3(ssrRenderComponent(_sfc_main$b, { onReset: unref(clearFilters) }, null, _parent3, _scopeId2));
                    _push3(`<!--]-->`);
                  }
                  _push3(`</div></div>`);
                } else {
                  return [
                    createVNode("div", { class: "flex flex-col lg:flex-row gap-6 lg:gap-8" }, [
                      createCommentVNode(" Sidebar Filters (Desktop) "),
                      createVNode("aside", { class: "hidden lg:block w-64 shrink-0" }, [
                        createVNode("div", { class: "sticky top-24 bg-white dark:bg-gray-900 rounded-xl p-6 border border-gray-200 dark:border-gray-800" }, [
                          createVNode("h3", { class: "font-semibold text-gray-900 dark:text-white mb-4" }, "Filter"),
                          createCommentVNode(" Brand Filter "),
                          __props.brands.length > 0 ? (openBlock(), createBlock("div", {
                            key: 0,
                            class: "mb-6"
                          }, [
                            createVNode("h4", { class: "text-sm font-medium text-gray-700 dark:text-gray-300 mb-3" }, "Brand"),
                            createVNode("div", { class: "space-y-2 max-h-48 overflow-y-auto" }, [
                              (openBlock(true), createBlock(
                                Fragment,
                                null,
                                renderList(__props.brands, (brand) => {
                                  return openBlock(), createBlock("label", {
                                    key: brand,
                                    class: "flex items-center gap-2 cursor-pointer"
                                  }, [
                                    withDirectives(createVNode("input", {
                                      "onUpdate:modelValue": ($event) => unref(localFilters).brand = $event,
                                      type: "radio",
                                      value: brand,
                                      name: "brand",
                                      class: "w-4 h-4 text-primary-600 border-gray-300 focus:ring-primary-500"
                                    }, null, 8, ["onUpdate:modelValue", "value"]), [
                                      [vModelRadio, unref(localFilters).brand]
                                    ]),
                                    createVNode(
                                      "span",
                                      { class: "text-sm text-gray-600 dark:text-gray-400" },
                                      toDisplayString(brand),
                                      1
                                      /* TEXT */
                                    )
                                  ]);
                                }),
                                128
                                /* KEYED_FRAGMENT */
                              )),
                              unref(localFilters).brand ? (openBlock(), createBlock("button", {
                                key: 0,
                                type: "button",
                                class: "text-xs text-primary-600 hover:text-primary-700 mt-2",
                                onClick: ($event) => unref(localFilters).brand = ""
                              }, " Hapus filter brand ", 8, ["onClick"])) : createCommentVNode("v-if", true)
                            ])
                          ])) : createCommentVNode("v-if", true),
                          createCommentVNode(" Price Range "),
                          createVNode("div", { class: "mb-6" }, [
                            createVNode("h4", { class: "text-sm font-medium text-gray-700 dark:text-gray-300 mb-3" }, " Rentang Harga "),
                            createVNode("div", { class: "flex gap-2" }, [
                              createVNode(_component_UInput, {
                                modelValue: unref(localFilters).minPrice,
                                "onUpdate:modelValue": ($event) => unref(localFilters).minPrice = $event,
                                type: "number",
                                placeholder: "Min",
                                size: "sm",
                                class: "flex-1"
                              }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                              createVNode("span", { class: "text-gray-400 self-center" }, "-"),
                              createVNode(_component_UInput, {
                                modelValue: unref(localFilters).maxPrice,
                                "onUpdate:modelValue": ($event) => unref(localFilters).maxPrice = $event,
                                type: "number",
                                placeholder: "Max",
                                size: "sm",
                                class: "flex-1"
                              }, null, 8, ["modelValue", "onUpdate:modelValue"])
                            ])
                          ]),
                          createCommentVNode(" Action Buttons "),
                          createVNode("div", { class: "flex gap-2" }, [
                            createVNode(_component_UButton, {
                              color: "primary",
                              block: "",
                              onClick: unref(applyFilters)
                            }, {
                              default: withCtx(() => [
                                createTextVNode(" Terapkan ")
                              ]),
                              _: 1
                              /* STABLE */
                            }, 8, ["onClick"]),
                            unref(hasActiveFilters) ? (openBlock(), createBlock(_component_UButton, {
                              key: 0,
                              color: "neutral",
                              variant: "ghost",
                              onClick: unref(clearFilters)
                            }, {
                              default: withCtx(() => [
                                createTextVNode(" Reset ")
                              ]),
                              _: 1
                              /* STABLE */
                            }, 8, ["onClick"])) : createCommentVNode("v-if", true)
                          ])
                        ])
                      ]),
                      createCommentVNode(" Main Content "),
                      createVNode("div", { class: "flex-1 min-w-0" }, [
                        createCommentVNode(" Section Header "),
                        createVNode("div", { class: "mb-6" }, [
                          createVNode(
                            "h2",
                            { class: "text-xl lg:text-2xl font-bold text-gray-900 dark:text-white" },
                            " Semua Produk " + toDisplayString(__props.category.name),
                            1
                            /* TEXT */
                          ),
                          createVNode(
                            "p",
                            { class: "text-sm text-gray-500 dark:text-gray-400 mt-1" },
                            " Menampilkan " + toDisplayString(__props.products.length) + " dari " + toDisplayString(__props.meta.total) + " produk ",
                            1
                            /* TEXT */
                          )
                        ]),
                        createCommentVNode(" Toolbar "),
                        createVNode(_sfc_main$8, {
                          "view-mode": viewMode.value,
                          "onUpdate:viewMode": ($event) => viewMode.value = $event,
                          filters: unref(localFilters),
                          "onUpdate:filters": ($event) => isRef(localFilters) ? localFilters.value = $event : null,
                          "total-shown": __props.products.length,
                          "total-products": __props.meta.total,
                          categories: [],
                          "active-filter-count": unref(activeFilterCount),
                          "has-active-filters": unref(hasActiveFilters),
                          "sort-options": unref(sortOptions),
                          onOpenMobileFilter: ($event) => isMobileFilterOpen.value = true,
                          onApply: unref(applyFilters),
                          onClearFilter: unref(clearSingleFilter)
                        }, null, 8, ["view-mode", "onUpdate:viewMode", "filters", "onUpdate:filters", "total-shown", "total-products", "active-filter-count", "has-active-filters", "sort-options", "onOpenMobileFilter", "onApply", "onClearFilter"]),
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
                                return openBlock(), createBlock(_sfc_main$4, {
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
                                    return openBlock(), createBlock(_sfc_main$9, {
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
                            createVNode(_sfc_main$b, { onReset: unref(clearFilters) }, null, 8, ["onReset"])
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
            _push2(`<!-- Related Categories Section -->`);
            if (__props.parentCategory || __props.subcategories.length > 0) {
              _push2(`<div class="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800" data-v-3b4cde4a${_scopeId}>`);
              _push2(ssrRenderComponent(_component_UContainer, { class: "py-8" }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`<h2 class="text-xl lg:text-2xl font-bold text-gray-900 dark:text-white mb-6" data-v-3b4cde4a${_scopeId2}> Kategori Terkait </h2><div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4" data-v-3b4cde4a${_scopeId2}><!-- Parent Category -->`);
                    if (__props.parentCategory) {
                      _push3(ssrRenderComponent(unref(Link), {
                        href: `/collections/${__props.parentCategory.slug}`,
                        class: "group flex flex-col items-center p-4 bg-gray-50 dark:bg-gray-800 rounded-xl hover:bg-primary-50 dark:hover:bg-primary-900/20 transition-colors"
                      }, {
                        default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                          if (_push4) {
                            _push4(`<div class="w-16 h-16 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center mb-3 group-hover:bg-primary-100 dark:group-hover:bg-primary-900/30 transition-colors overflow-hidden" data-v-3b4cde4a${_scopeId3}>`);
                            if (__props.parentCategory.image) {
                              _push4(`<img${ssrRenderAttr("src", __props.parentCategory.image)}${ssrRenderAttr("alt", __props.parentCategory.name)} class="w-full h-full object-cover" data-v-3b4cde4a${_scopeId3}>`);
                            } else {
                              _push4(ssrRenderComponent(_component_UIcon, {
                                name: "i-heroicons-folder",
                                class: "w-8 h-8 text-gray-400"
                              }, null, _parent4, _scopeId3));
                            }
                            _push4(`</div><span class="text-sm font-medium text-gray-700 dark:text-gray-300 group-hover:text-primary-700 dark:group-hover:text-primary-400 text-center" data-v-3b4cde4a${_scopeId3}>${ssrInterpolate(__props.parentCategory.name)}</span><span class="text-xs text-gray-400 mt-1" data-v-3b4cde4a${_scopeId3}>Kategori Utama</span>`);
                          } else {
                            return [
                              createVNode("div", { class: "w-16 h-16 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center mb-3 group-hover:bg-primary-100 dark:group-hover:bg-primary-900/30 transition-colors overflow-hidden" }, [
                                __props.parentCategory.image ? (openBlock(), createBlock("img", {
                                  key: 0,
                                  src: __props.parentCategory.image,
                                  alt: __props.parentCategory.name,
                                  class: "w-full h-full object-cover"
                                }, null, 8, ["src", "alt"])) : (openBlock(), createBlock(_component_UIcon, {
                                  key: 1,
                                  name: "i-heroicons-folder",
                                  class: "w-8 h-8 text-gray-400"
                                }))
                              ]),
                              createVNode(
                                "span",
                                { class: "text-sm font-medium text-gray-700 dark:text-gray-300 group-hover:text-primary-700 dark:group-hover:text-primary-400 text-center" },
                                toDisplayString(__props.parentCategory.name),
                                1
                                /* TEXT */
                              ),
                              createVNode("span", { class: "text-xs text-gray-400 mt-1" }, "Kategori Utama")
                            ];
                          }
                        }),
                        _: 1
                        /* STABLE */
                      }, _parent3, _scopeId2));
                    } else {
                      _push3(`<!---->`);
                    }
                    _push3(`<!-- Subcategories --><!--[-->`);
                    ssrRenderList(__props.subcategories, (subcat) => {
                      _push3(ssrRenderComponent(unref(Link), {
                        key: subcat.id,
                        href: `/collections/${subcat.slug}`,
                        class: "group flex flex-col items-center p-4 bg-gray-50 dark:bg-gray-800 rounded-xl hover:bg-primary-50 dark:hover:bg-primary-900/20 transition-colors"
                      }, {
                        default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                          if (_push4) {
                            _push4(`<div class="w-16 h-16 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center mb-3 group-hover:bg-primary-100 dark:group-hover:bg-primary-900/30 transition-colors overflow-hidden" data-v-3b4cde4a${_scopeId3}>`);
                            if (subcat.image) {
                              _push4(`<img${ssrRenderAttr("src", subcat.image)}${ssrRenderAttr("alt", subcat.name)} class="w-full h-full object-cover" data-v-3b4cde4a${_scopeId3}>`);
                            } else {
                              _push4(ssrRenderComponent(_component_UIcon, {
                                name: "i-heroicons-folder",
                                class: "w-8 h-8 text-gray-400"
                              }, null, _parent4, _scopeId3));
                            }
                            _push4(`</div><span class="text-sm font-medium text-gray-700 dark:text-gray-300 group-hover:text-primary-700 dark:group-hover:text-primary-400 text-center" data-v-3b4cde4a${_scopeId3}>${ssrInterpolate(subcat.name)}</span>`);
                          } else {
                            return [
                              createVNode("div", { class: "w-16 h-16 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center mb-3 group-hover:bg-primary-100 dark:group-hover:bg-primary-900/30 transition-colors overflow-hidden" }, [
                                subcat.image ? (openBlock(), createBlock("img", {
                                  key: 0,
                                  src: subcat.image,
                                  alt: subcat.name,
                                  class: "w-full h-full object-cover"
                                }, null, 8, ["src", "alt"])) : (openBlock(), createBlock(_component_UIcon, {
                                  key: 1,
                                  name: "i-heroicons-folder",
                                  class: "w-8 h-8 text-gray-400"
                                }))
                              ]),
                              createVNode(
                                "span",
                                { class: "text-sm font-medium text-gray-700 dark:text-gray-300 group-hover:text-primary-700 dark:group-hover:text-primary-400 text-center" },
                                toDisplayString(subcat.name),
                                1
                                /* TEXT */
                              )
                            ];
                          }
                        }),
                        _: 2
                        /* DYNAMIC */
                      }, _parent3, _scopeId2));
                    });
                    _push3(`<!--]--></div>`);
                  } else {
                    return [
                      createVNode("h2", { class: "text-xl lg:text-2xl font-bold text-gray-900 dark:text-white mb-6" }, " Kategori Terkait "),
                      createVNode("div", { class: "grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4" }, [
                        createCommentVNode(" Parent Category "),
                        __props.parentCategory ? (openBlock(), createBlock(unref(Link), {
                          key: 0,
                          href: `/collections/${__props.parentCategory.slug}`,
                          class: "group flex flex-col items-center p-4 bg-gray-50 dark:bg-gray-800 rounded-xl hover:bg-primary-50 dark:hover:bg-primary-900/20 transition-colors"
                        }, {
                          default: withCtx(() => [
                            createVNode("div", { class: "w-16 h-16 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center mb-3 group-hover:bg-primary-100 dark:group-hover:bg-primary-900/30 transition-colors overflow-hidden" }, [
                              __props.parentCategory.image ? (openBlock(), createBlock("img", {
                                key: 0,
                                src: __props.parentCategory.image,
                                alt: __props.parentCategory.name,
                                class: "w-full h-full object-cover"
                              }, null, 8, ["src", "alt"])) : (openBlock(), createBlock(_component_UIcon, {
                                key: 1,
                                name: "i-heroicons-folder",
                                class: "w-8 h-8 text-gray-400"
                              }))
                            ]),
                            createVNode(
                              "span",
                              { class: "text-sm font-medium text-gray-700 dark:text-gray-300 group-hover:text-primary-700 dark:group-hover:text-primary-400 text-center" },
                              toDisplayString(__props.parentCategory.name),
                              1
                              /* TEXT */
                            ),
                            createVNode("span", { class: "text-xs text-gray-400 mt-1" }, "Kategori Utama")
                          ]),
                          _: 1
                          /* STABLE */
                        }, 8, ["href"])) : createCommentVNode("v-if", true),
                        createCommentVNode(" Subcategories "),
                        (openBlock(true), createBlock(
                          Fragment,
                          null,
                          renderList(__props.subcategories, (subcat) => {
                            return openBlock(), createBlock(unref(Link), {
                              key: subcat.id,
                              href: `/collections/${subcat.slug}`,
                              class: "group flex flex-col items-center p-4 bg-gray-50 dark:bg-gray-800 rounded-xl hover:bg-primary-50 dark:hover:bg-primary-900/20 transition-colors"
                            }, {
                              default: withCtx(() => [
                                createVNode("div", { class: "w-16 h-16 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center mb-3 group-hover:bg-primary-100 dark:group-hover:bg-primary-900/30 transition-colors overflow-hidden" }, [
                                  subcat.image ? (openBlock(), createBlock("img", {
                                    key: 0,
                                    src: subcat.image,
                                    alt: subcat.name,
                                    class: "w-full h-full object-cover"
                                  }, null, 8, ["src", "alt"])) : (openBlock(), createBlock(_component_UIcon, {
                                    key: 1,
                                    name: "i-heroicons-folder",
                                    class: "w-8 h-8 text-gray-400"
                                  }))
                                ]),
                                createVNode(
                                  "span",
                                  { class: "text-sm font-medium text-gray-700 dark:text-gray-300 group-hover:text-primary-700 dark:group-hover:text-primary-400 text-center" },
                                  toDisplayString(subcat.name),
                                  1
                                  /* TEXT */
                                )
                              ]),
                              _: 2
                              /* DYNAMIC */
                            }, 1032, ["href"]);
                          }),
                          128
                          /* KEYED_FRAGMENT */
                        ))
                      ])
                    ];
                  }
                }),
                _: 1
                /* STABLE */
              }, _parent2, _scopeId));
              _push2(`</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`<!-- Back to Collections --><div class="bg-gray-50 dark:bg-gray-950 border-t border-gray-200 dark:border-gray-800" data-v-3b4cde4a${_scopeId}>`);
            _push2(ssrRenderComponent(_component_UContainer, { class: "py-6" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="flex justify-center" data-v-3b4cde4a${_scopeId2}>`);
                  _push3(ssrRenderComponent(unref(Link), {
                    href: "/collections",
                    class: "inline-flex items-center gap-2 text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300 font-medium transition-colors"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_UIcon, {
                          name: "i-heroicons-arrow-left",
                          class: "w-5 h-5"
                        }, null, _parent4, _scopeId3));
                        _push4(` Lihat Semua Koleksi `);
                      } else {
                        return [
                          createVNode(_component_UIcon, {
                            name: "i-heroicons-arrow-left",
                            class: "w-5 h-5"
                          }),
                          createTextVNode(" Lihat Semua Koleksi ")
                        ];
                      }
                    }),
                    _: 1
                    /* STABLE */
                  }, _parent3, _scopeId2));
                  _push3(`</div>`);
                } else {
                  return [
                    createVNode("div", { class: "flex justify-center" }, [
                      createVNode(unref(Link), {
                        href: "/collections",
                        class: "inline-flex items-center gap-2 text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300 font-medium transition-colors"
                      }, {
                        default: withCtx(() => [
                          createVNode(_component_UIcon, {
                            name: "i-heroicons-arrow-left",
                            class: "w-5 h-5"
                          }),
                          createTextVNode(" Lihat Semua Koleksi ")
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
            }, _parent2, _scopeId));
            _push2(`</div></div><!-- Mobile Filter Sidebar -->`);
            _push2(ssrRenderComponent(_sfc_main$c, {
              open: unref(isMobileFilterOpen),
              "onUpdate:open": ($event) => isRef(isMobileFilterOpen) ? isMobileFilterOpen.value = $event : null,
              filters: unref(localFilters),
              "onUpdate:filters": ($event) => isRef(localFilters) ? localFilters.value = $event : null,
              categories: [],
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
                    toDisplayString(__props.category.name),
                    1
                    /* TEXT */
                  ),
                  createVNode("meta", {
                    name: "description",
                    content: __props.category.description ?? `Jelajahi koleksi ${__props.category.name} terlengkap. Temukan ${__props.meta.total}+ produk berkualitas dengan harga terbaik hanya di Ogitu.`
                  }, null, 8, ["content"]),
                  createVNode("meta", {
                    name: "keywords",
                    content: `${__props.category.name}, vape, e-liquid, pod, mod, ogitu`
                  }, null, 8, ["content"]),
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
                    content: `${_ctx.$page.props.appUrl}/collections/${__props.category.slug}`
                  }, null, 8, ["content"]),
                  __props.category.image ? (openBlock(), createBlock("meta", {
                    key: 0,
                    property: "og:image",
                    content: __props.category.image
                  }, null, 8, ["content"])) : createCommentVNode("v-if", true),
                  createCommentVNode(" Twitter Card "),
                  createVNode("meta", {
                    name: "twitter:card",
                    content: "summary_large_image"
                  }),
                  createVNode("meta", {
                    name: "twitter:title",
                    content: pageTitle.value
                  }, null, 8, ["content"]),
                  createVNode("meta", {
                    name: "twitter:description",
                    content: pageDescription.value
                  }, null, 8, ["content"])
                ]),
                _: 1
                /* STABLE */
              }),
              createVNode("div", { class: "min-h-screen bg-gray-50 dark:bg-gray-950" }, [
                createCommentVNode(" Category Hero Banner "),
                createVNode("div", { class: "relative bg-linear-to-br from-primary-600 via-primary-700 to-primary-800 dark:from-primary-800 dark:via-primary-900 dark:to-gray-900" }, [
                  createCommentVNode(" Background Pattern "),
                  createVNode("div", { class: "absolute inset-0 opacity-10" }, [
                    (openBlock(), createBlock("svg", {
                      class: "w-full h-full",
                      xmlns: "http://www.w3.org/2000/svg"
                    }, [
                      createVNode("defs", null, [
                        createVNode("pattern", {
                          id: "hero-pattern",
                          width: "40",
                          height: "40",
                          patternUnits: "userSpaceOnUse"
                        }, [
                          createVNode("circle", {
                            cx: "20",
                            cy: "20",
                            r: "2",
                            fill: "currentColor"
                          })
                        ])
                      ]),
                      createVNode("rect", {
                        width: "100%",
                        height: "100%",
                        fill: "url(#hero-pattern)"
                      })
                    ]))
                  ]),
                  createCommentVNode(" Category Image Overlay "),
                  __props.category.image ? (openBlock(), createBlock(
                    "div",
                    {
                      key: 0,
                      class: "absolute inset-0 bg-cover bg-center opacity-20",
                      style: { backgroundImage: `url(${__props.category.image})` }
                    },
                    null,
                    4
                    /* STYLE */
                  )) : createCommentVNode("v-if", true),
                  createVNode(_component_UContainer, { class: "relative py-8 lg:py-12" }, {
                    default: withCtx(() => [
                      createCommentVNode(" Breadcrumb "),
                      createVNode("nav", {
                        class: "mb-6",
                        "aria-label": "Breadcrumb"
                      }, [
                        createVNode("ol", { class: "flex items-center flex-wrap gap-2 text-sm" }, [
                          createVNode("li", null, [
                            createVNode(unref(Link), {
                              href: "/",
                              class: "text-white/70 hover:text-white transition-colors"
                            }, {
                              default: withCtx(() => [
                                createTextVNode(" Beranda ")
                              ]),
                              _: 1
                              /* STABLE */
                            })
                          ]),
                          createVNode("li", { class: "text-white/50" }, "/"),
                          createVNode("li", null, [
                            createVNode(unref(Link), {
                              href: "/collections",
                              class: "text-white/70 hover:text-white transition-colors"
                            }, {
                              default: withCtx(() => [
                                createTextVNode(" Koleksi ")
                              ]),
                              _: 1
                              /* STABLE */
                            })
                          ]),
                          __props.parentCategory ? (openBlock(), createBlock(
                            Fragment,
                            { key: 0 },
                            [
                              createVNode("li", { class: "text-white/50" }, "/"),
                              createVNode("li", null, [
                                createVNode(unref(Link), {
                                  href: `/collections/${__props.parentCategory.slug}`,
                                  class: "text-white/70 hover:text-white transition-colors"
                                }, {
                                  default: withCtx(() => [
                                    createTextVNode(
                                      toDisplayString(__props.parentCategory.name),
                                      1
                                      /* TEXT */
                                    )
                                  ]),
                                  _: 1
                                  /* STABLE */
                                }, 8, ["href"])
                              ])
                            ],
                            64
                            /* STABLE_FRAGMENT */
                          )) : createCommentVNode("v-if", true),
                          createVNode("li", { class: "text-white/50" }, "/"),
                          createVNode(
                            "li",
                            { class: "text-white font-medium" },
                            toDisplayString(__props.category.name),
                            1
                            /* TEXT */
                          )
                        ])
                      ]),
                      createCommentVNode(" Category Info "),
                      createVNode("div", { class: "max-w-3xl" }, [
                        createVNode(
                          "h1",
                          { class: "text-3xl lg:text-4xl xl:text-5xl font-bold text-white mb-4" },
                          toDisplayString(__props.category.name),
                          1
                          /* TEXT */
                        ),
                        __props.category.description ? (openBlock(), createBlock(
                          "p",
                          {
                            key: 0,
                            class: "text-lg text-white/80 mb-6"
                          },
                          toDisplayString(__props.category.description),
                          1
                          /* TEXT */
                        )) : createCommentVNode("v-if", true),
                        createVNode("div", { class: "flex items-center gap-4 text-white/70" }, [
                          createVNode("span", { class: "flex items-center gap-2" }, [
                            createVNode(_component_UIcon, {
                              name: "i-heroicons-cube",
                              class: "w-5 h-5"
                            }),
                            createTextVNode(
                              " " + toDisplayString(__props.meta.total) + " Produk ",
                              1
                              /* TEXT */
                            )
                          ]),
                          __props.brands.length > 0 ? (openBlock(), createBlock("span", {
                            key: 0,
                            class: "flex items-center gap-2"
                          }, [
                            createVNode(_component_UIcon, {
                              name: "i-heroicons-building-storefront",
                              class: "w-5 h-5"
                            }),
                            createTextVNode(
                              " " + toDisplayString(__props.brands.length) + " Brand ",
                              1
                              /* TEXT */
                            )
                          ])) : createCommentVNode("v-if", true)
                        ])
                      ])
                    ]),
                    _: 1
                    /* STABLE */
                  })
                ]),
                createCommentVNode(" Subcategories "),
                __props.subcategories.length > 0 ? (openBlock(), createBlock("div", {
                  key: 0,
                  class: "bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800"
                }, [
                  createVNode(_component_UContainer, { class: "py-4" }, {
                    default: withCtx(() => [
                      createVNode("div", { class: "flex items-center gap-3 overflow-x-auto pb-2 scrollbar-hide" }, [
                        createVNode("span", { class: "text-sm text-gray-500 dark:text-gray-400 whitespace-nowrap" }, "Subkategori:"),
                        (openBlock(true), createBlock(
                          Fragment,
                          null,
                          renderList(__props.subcategories, (subcat) => {
                            return openBlock(), createBlock(unref(Link), {
                              key: subcat.id,
                              href: `/collections/${subcat.slug}`,
                              class: "inline-flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-800 hover:bg-primary-100 dark:hover:bg-primary-900/30 text-gray-700 dark:text-gray-300 hover:text-primary-700 dark:hover:text-primary-400 rounded-full text-sm font-medium transition-colors whitespace-nowrap"
                            }, {
                              default: withCtx(() => [
                                subcat.image ? (openBlock(), createBlock("img", {
                                  key: 0,
                                  src: subcat.image,
                                  alt: subcat.name,
                                  class: "w-5 h-5 rounded-full object-cover"
                                }, null, 8, ["src", "alt"])) : createCommentVNode("v-if", true),
                                createTextVNode(
                                  " " + toDisplayString(subcat.name),
                                  1
                                  /* TEXT */
                                )
                              ]),
                              _: 2
                              /* DYNAMIC */
                            }, 1032, ["href"]);
                          }),
                          128
                          /* KEYED_FRAGMENT */
                        ))
                      ])
                    ]),
                    _: 1
                    /* STABLE */
                  })
                ])) : createCommentVNode("v-if", true),
                createCommentVNode(" Featured Products Section "),
                __props.featuredProducts.length > 0 ? (openBlock(), createBlock("div", {
                  key: 1,
                  class: "bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800"
                }, [
                  createVNode(_component_UContainer, { class: "py-8" }, {
                    default: withCtx(() => [
                      createVNode("div", { class: "flex items-center justify-between mb-6" }, [
                        createVNode("div", null, [
                          createVNode(
                            "h2",
                            { class: "text-xl lg:text-2xl font-bold text-gray-900 dark:text-white" },
                            " ⭐ Produk Unggulan " + toDisplayString(__props.category.name),
                            1
                            /* TEXT */
                          ),
                          createVNode("p", { class: "text-sm text-gray-500 dark:text-gray-400 mt-1" }, " Pilihan terbaik dari kategori ini ")
                        ])
                      ]),
                      createVNode("div", { class: "grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 sm:gap-4" }, [
                        (openBlock(true), createBlock(
                          Fragment,
                          null,
                          renderList(__props.featuredProducts.slice(0, 6), (product) => {
                            return openBlock(), createBlock(_sfc_main$4, {
                              key: product.id,
                              product,
                              size: "sm",
                              onAddToCart: handleAddToCart,
                              onAddToWishlist: handleAddToWishlist
                            }, null, 8, ["product"]);
                          }),
                          128
                          /* KEYED_FRAGMENT */
                        ))
                      ])
                    ]),
                    _: 1
                    /* STABLE */
                  })
                ])) : createCommentVNode("v-if", true),
                createCommentVNode(" New Arrivals Section "),
                __props.newArrivals.length > 0 ? (openBlock(), createBlock("div", {
                  key: 2,
                  class: "bg-gray-50 dark:bg-gray-950 border-b border-gray-200 dark:border-gray-800"
                }, [
                  createVNode(_component_UContainer, { class: "py-8" }, {
                    default: withCtx(() => [
                      createVNode("div", { class: "flex items-center justify-between mb-6" }, [
                        createVNode("div", null, [
                          createVNode("h2", { class: "text-xl lg:text-2xl font-bold text-gray-900 dark:text-white" }, " Produk Terbaru "),
                          createVNode(
                            "p",
                            { class: "text-sm text-gray-500 dark:text-gray-400 mt-1" },
                            " Baru ditambahkan di kategori " + toDisplayString(__props.category.name),
                            1
                            /* TEXT */
                          )
                        ])
                      ]),
                      createVNode(_component_UCarousel, {
                        items: __props.newArrivals.slice(0, 10),
                        arrows: "",
                        prev: {
                          color: "neutral",
                          variant: "solid",
                          class: "rounded-full shadow-lg"
                        },
                        next: {
                          color: "neutral",
                          variant: "solid",
                          class: "rounded-full shadow-lg"
                        },
                        ui: {
                          item: "basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/4 xl:basis-1/4",
                          prev: "start-2 sm:start-4",
                          next: "end-2 sm:end-4"
                        },
                        class: "w-full"
                      }, {
                        default: withCtx(({ item }) => [
                          createVNode("div", { class: "p-2" }, [
                            createVNode(_sfc_main$4, {
                              product: item,
                              onAddToCart: handleAddToCart,
                              onAddToWishlist: handleAddToWishlist
                            }, null, 8, ["product"])
                          ])
                        ]),
                        _: 1
                        /* STABLE */
                      }, 8, ["items"])
                    ]),
                    _: 1
                    /* STABLE */
                  })
                ])) : createCommentVNode("v-if", true),
                createCommentVNode(" Main Products Section "),
                createVNode(_component_UContainer, { class: "py-6 lg:py-8" }, {
                  default: withCtx(() => [
                    createVNode("div", { class: "flex flex-col lg:flex-row gap-6 lg:gap-8" }, [
                      createCommentVNode(" Sidebar Filters (Desktop) "),
                      createVNode("aside", { class: "hidden lg:block w-64 shrink-0" }, [
                        createVNode("div", { class: "sticky top-24 bg-white dark:bg-gray-900 rounded-xl p-6 border border-gray-200 dark:border-gray-800" }, [
                          createVNode("h3", { class: "font-semibold text-gray-900 dark:text-white mb-4" }, "Filter"),
                          createCommentVNode(" Brand Filter "),
                          __props.brands.length > 0 ? (openBlock(), createBlock("div", {
                            key: 0,
                            class: "mb-6"
                          }, [
                            createVNode("h4", { class: "text-sm font-medium text-gray-700 dark:text-gray-300 mb-3" }, "Brand"),
                            createVNode("div", { class: "space-y-2 max-h-48 overflow-y-auto" }, [
                              (openBlock(true), createBlock(
                                Fragment,
                                null,
                                renderList(__props.brands, (brand) => {
                                  return openBlock(), createBlock("label", {
                                    key: brand,
                                    class: "flex items-center gap-2 cursor-pointer"
                                  }, [
                                    withDirectives(createVNode("input", {
                                      "onUpdate:modelValue": ($event) => unref(localFilters).brand = $event,
                                      type: "radio",
                                      value: brand,
                                      name: "brand",
                                      class: "w-4 h-4 text-primary-600 border-gray-300 focus:ring-primary-500"
                                    }, null, 8, ["onUpdate:modelValue", "value"]), [
                                      [vModelRadio, unref(localFilters).brand]
                                    ]),
                                    createVNode(
                                      "span",
                                      { class: "text-sm text-gray-600 dark:text-gray-400" },
                                      toDisplayString(brand),
                                      1
                                      /* TEXT */
                                    )
                                  ]);
                                }),
                                128
                                /* KEYED_FRAGMENT */
                              )),
                              unref(localFilters).brand ? (openBlock(), createBlock("button", {
                                key: 0,
                                type: "button",
                                class: "text-xs text-primary-600 hover:text-primary-700 mt-2",
                                onClick: ($event) => unref(localFilters).brand = ""
                              }, " Hapus filter brand ", 8, ["onClick"])) : createCommentVNode("v-if", true)
                            ])
                          ])) : createCommentVNode("v-if", true),
                          createCommentVNode(" Price Range "),
                          createVNode("div", { class: "mb-6" }, [
                            createVNode("h4", { class: "text-sm font-medium text-gray-700 dark:text-gray-300 mb-3" }, " Rentang Harga "),
                            createVNode("div", { class: "flex gap-2" }, [
                              createVNode(_component_UInput, {
                                modelValue: unref(localFilters).minPrice,
                                "onUpdate:modelValue": ($event) => unref(localFilters).minPrice = $event,
                                type: "number",
                                placeholder: "Min",
                                size: "sm",
                                class: "flex-1"
                              }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                              createVNode("span", { class: "text-gray-400 self-center" }, "-"),
                              createVNode(_component_UInput, {
                                modelValue: unref(localFilters).maxPrice,
                                "onUpdate:modelValue": ($event) => unref(localFilters).maxPrice = $event,
                                type: "number",
                                placeholder: "Max",
                                size: "sm",
                                class: "flex-1"
                              }, null, 8, ["modelValue", "onUpdate:modelValue"])
                            ])
                          ]),
                          createCommentVNode(" Action Buttons "),
                          createVNode("div", { class: "flex gap-2" }, [
                            createVNode(_component_UButton, {
                              color: "primary",
                              block: "",
                              onClick: unref(applyFilters)
                            }, {
                              default: withCtx(() => [
                                createTextVNode(" Terapkan ")
                              ]),
                              _: 1
                              /* STABLE */
                            }, 8, ["onClick"]),
                            unref(hasActiveFilters) ? (openBlock(), createBlock(_component_UButton, {
                              key: 0,
                              color: "neutral",
                              variant: "ghost",
                              onClick: unref(clearFilters)
                            }, {
                              default: withCtx(() => [
                                createTextVNode(" Reset ")
                              ]),
                              _: 1
                              /* STABLE */
                            }, 8, ["onClick"])) : createCommentVNode("v-if", true)
                          ])
                        ])
                      ]),
                      createCommentVNode(" Main Content "),
                      createVNode("div", { class: "flex-1 min-w-0" }, [
                        createCommentVNode(" Section Header "),
                        createVNode("div", { class: "mb-6" }, [
                          createVNode(
                            "h2",
                            { class: "text-xl lg:text-2xl font-bold text-gray-900 dark:text-white" },
                            " Semua Produk " + toDisplayString(__props.category.name),
                            1
                            /* TEXT */
                          ),
                          createVNode(
                            "p",
                            { class: "text-sm text-gray-500 dark:text-gray-400 mt-1" },
                            " Menampilkan " + toDisplayString(__props.products.length) + " dari " + toDisplayString(__props.meta.total) + " produk ",
                            1
                            /* TEXT */
                          )
                        ]),
                        createCommentVNode(" Toolbar "),
                        createVNode(_sfc_main$8, {
                          "view-mode": viewMode.value,
                          "onUpdate:viewMode": ($event) => viewMode.value = $event,
                          filters: unref(localFilters),
                          "onUpdate:filters": ($event) => isRef(localFilters) ? localFilters.value = $event : null,
                          "total-shown": __props.products.length,
                          "total-products": __props.meta.total,
                          categories: [],
                          "active-filter-count": unref(activeFilterCount),
                          "has-active-filters": unref(hasActiveFilters),
                          "sort-options": unref(sortOptions),
                          onOpenMobileFilter: ($event) => isMobileFilterOpen.value = true,
                          onApply: unref(applyFilters),
                          onClearFilter: unref(clearSingleFilter)
                        }, null, 8, ["view-mode", "onUpdate:viewMode", "filters", "onUpdate:filters", "total-shown", "total-products", "active-filter-count", "has-active-filters", "sort-options", "onOpenMobileFilter", "onApply", "onClearFilter"]),
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
                                return openBlock(), createBlock(_sfc_main$4, {
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
                                    return openBlock(), createBlock(_sfc_main$9, {
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
                            createVNode(_sfc_main$b, { onReset: unref(clearFilters) }, null, 8, ["onReset"])
                          ],
                          2112
                          /* STABLE_FRAGMENT, DEV_ROOT_FRAGMENT */
                        ))
                      ])
                    ])
                  ]),
                  _: 1
                  /* STABLE */
                }),
                createCommentVNode(" Related Categories Section "),
                __props.parentCategory || __props.subcategories.length > 0 ? (openBlock(), createBlock("div", {
                  key: 3,
                  class: "bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800"
                }, [
                  createVNode(_component_UContainer, { class: "py-8" }, {
                    default: withCtx(() => [
                      createVNode("h2", { class: "text-xl lg:text-2xl font-bold text-gray-900 dark:text-white mb-6" }, " Kategori Terkait "),
                      createVNode("div", { class: "grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4" }, [
                        createCommentVNode(" Parent Category "),
                        __props.parentCategory ? (openBlock(), createBlock(unref(Link), {
                          key: 0,
                          href: `/collections/${__props.parentCategory.slug}`,
                          class: "group flex flex-col items-center p-4 bg-gray-50 dark:bg-gray-800 rounded-xl hover:bg-primary-50 dark:hover:bg-primary-900/20 transition-colors"
                        }, {
                          default: withCtx(() => [
                            createVNode("div", { class: "w-16 h-16 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center mb-3 group-hover:bg-primary-100 dark:group-hover:bg-primary-900/30 transition-colors overflow-hidden" }, [
                              __props.parentCategory.image ? (openBlock(), createBlock("img", {
                                key: 0,
                                src: __props.parentCategory.image,
                                alt: __props.parentCategory.name,
                                class: "w-full h-full object-cover"
                              }, null, 8, ["src", "alt"])) : (openBlock(), createBlock(_component_UIcon, {
                                key: 1,
                                name: "i-heroicons-folder",
                                class: "w-8 h-8 text-gray-400"
                              }))
                            ]),
                            createVNode(
                              "span",
                              { class: "text-sm font-medium text-gray-700 dark:text-gray-300 group-hover:text-primary-700 dark:group-hover:text-primary-400 text-center" },
                              toDisplayString(__props.parentCategory.name),
                              1
                              /* TEXT */
                            ),
                            createVNode("span", { class: "text-xs text-gray-400 mt-1" }, "Kategori Utama")
                          ]),
                          _: 1
                          /* STABLE */
                        }, 8, ["href"])) : createCommentVNode("v-if", true),
                        createCommentVNode(" Subcategories "),
                        (openBlock(true), createBlock(
                          Fragment,
                          null,
                          renderList(__props.subcategories, (subcat) => {
                            return openBlock(), createBlock(unref(Link), {
                              key: subcat.id,
                              href: `/collections/${subcat.slug}`,
                              class: "group flex flex-col items-center p-4 bg-gray-50 dark:bg-gray-800 rounded-xl hover:bg-primary-50 dark:hover:bg-primary-900/20 transition-colors"
                            }, {
                              default: withCtx(() => [
                                createVNode("div", { class: "w-16 h-16 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center mb-3 group-hover:bg-primary-100 dark:group-hover:bg-primary-900/30 transition-colors overflow-hidden" }, [
                                  subcat.image ? (openBlock(), createBlock("img", {
                                    key: 0,
                                    src: subcat.image,
                                    alt: subcat.name,
                                    class: "w-full h-full object-cover"
                                  }, null, 8, ["src", "alt"])) : (openBlock(), createBlock(_component_UIcon, {
                                    key: 1,
                                    name: "i-heroicons-folder",
                                    class: "w-8 h-8 text-gray-400"
                                  }))
                                ]),
                                createVNode(
                                  "span",
                                  { class: "text-sm font-medium text-gray-700 dark:text-gray-300 group-hover:text-primary-700 dark:group-hover:text-primary-400 text-center" },
                                  toDisplayString(subcat.name),
                                  1
                                  /* TEXT */
                                )
                              ]),
                              _: 2
                              /* DYNAMIC */
                            }, 1032, ["href"]);
                          }),
                          128
                          /* KEYED_FRAGMENT */
                        ))
                      ])
                    ]),
                    _: 1
                    /* STABLE */
                  })
                ])) : createCommentVNode("v-if", true),
                createCommentVNode(" Back to Collections "),
                createVNode("div", { class: "bg-gray-50 dark:bg-gray-950 border-t border-gray-200 dark:border-gray-800" }, [
                  createVNode(_component_UContainer, { class: "py-6" }, {
                    default: withCtx(() => [
                      createVNode("div", { class: "flex justify-center" }, [
                        createVNode(unref(Link), {
                          href: "/collections",
                          class: "inline-flex items-center gap-2 text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300 font-medium transition-colors"
                        }, {
                          default: withCtx(() => [
                            createVNode(_component_UIcon, {
                              name: "i-heroicons-arrow-left",
                              class: "w-5 h-5"
                            }),
                            createTextVNode(" Lihat Semua Koleksi ")
                          ]),
                          _: 1
                          /* STABLE */
                        })
                      ])
                    ]),
                    _: 1
                    /* STABLE */
                  })
                ])
              ]),
              createCommentVNode(" Mobile Filter Sidebar "),
              createVNode(_sfc_main$c, {
                open: unref(isMobileFilterOpen),
                "onUpdate:open": ($event) => isRef(isMobileFilterOpen) ? isMobileFilterOpen.value = $event : null,
                filters: unref(localFilters),
                "onUpdate:filters": ($event) => isRef(localFilters) ? localFilters.value = $event : null,
                categories: [],
                brands: __props.brands,
                "has-active-filters": unref(hasActiveFilters),
                onApply: unref(applyFilters),
                onClear: unref(clearFilters)
              }, null, 8, ["open", "onUpdate:open", "filters", "onUpdate:filters", "brands", "has-active-filters", "onApply", "onClear"])
            ];
          }
        }),
        _: 1
        /* STABLE */
      }, _parent));
    };
  }
});

/* unplugin-vue-components disabled */

const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("inertia/pages/collections/view.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const view = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-3b4cde4a"]]);

export { view as default };
