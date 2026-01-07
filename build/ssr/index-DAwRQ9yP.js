import { _ as _sfc_main$b } from './Pagination-C9h35VkF.js';
import { _ as _sfc_main$a } from './Card-Ci6a5H8H.js';
import { _ as _sfc_main$4, b as _sfc_main$6, a as _sfc_main$7 } from './Button-BBveOjhJ.js';
import { a as _sfc_main$5, _ as _sfc_main$9, b as _export_sfc } from './Badge-DaOjA2YD.js';
import { defineComponent, mergeProps, unref, withCtx, createTextVNode, toDisplayString, useSSRContext, ref, watch, computed, createVNode, isRef, createBlock, createCommentVNode, openBlock, Fragment, renderList, withModifiers } from 'vue';
import { ssrRenderAttrs, ssrRenderAttr, ssrRenderComponent, ssrInterpolate, ssrRenderList, ssrRenderClass } from 'vue/server-renderer';
import { router, Head } from '@inertiajs/vue3';
import { useHead } from '@unhead/vue';
import { _ as _sfc_main$8 } from './default-ChIG0McX.js';
import { C as CATEGORY_COLORS, f as formatDate, a as formatCount } from './article-waySavyG.js';
import { useDebounceFn } from '@vueuse/core';
import 'reka-ui';
import './virtual_nuxt-ui-plugins-BqI2j5ZJ.js';
import '@unhead/vue/client';
import 'tailwindcss/colors';
import 'hookable';
import 'defu';
import 'ohash/utils';
import 'tailwind-variants';
import '@iconify/vue';
import 'ufo';
import 'reka-ui/namespaced';
import './Modal-lw8uQ47S.js';
import 'vaul-vue';
import './DropdownMenu-DnaZdPLR.js';
import './Checkbox-9gbT5PLz.js';

const _sfc_main$3 = /* @__PURE__ */ defineComponent({
  __name: "ArticleCard",
  __ssrInlineRender: true,
  props: {
    article: {}
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UIcon = _sfc_main$4;
      const _component_UBadge = _sfc_main$5;
      const _component_UAvatar = _sfc_main$6;
      _push(`<a${ssrRenderAttrs(mergeProps({
        href: `/artikel/${__props.article.slug}`,
        class: "group bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden"
      }, _attrs))}><!-- Thumbnail --><div class="aspect-video relative overflow-hidden bg-gray-100 dark:bg-gray-700">`);
      if (__props.article.thumbnail) {
        _push(`<img${ssrRenderAttr("src", __props.article.thumbnail)}${ssrRenderAttr("alt", __props.article.title)} class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy">`);
      } else {
        _push(`<div class="w-full h-full flex items-center justify-center">`);
        _push(ssrRenderComponent(_component_UIcon, {
          name: "i-lucide-image",
          class: "w-12 h-12 text-gray-300 dark:text-gray-600"
        }, null, _parent));
        _push(`</div>`);
      }
      _push(`<!-- Category Badge -->`);
      _push(ssrRenderComponent(_component_UBadge, {
        color: unref(CATEGORY_COLORS)[__props.article.category] || "neutral",
        class: "absolute top-3 left-3"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`${ssrInterpolate(__props.article.categoryLabel)}`);
          } else {
            return [
              createTextVNode(
                toDisplayString(__props.article.categoryLabel),
                1
                /* TEXT */
              )
            ];
          }
        }),
        _: 1
        /* STABLE */
      }, _parent));
      _push(`</div><!-- Content --><div class="p-5"><!-- Meta --><div class="flex items-center gap-3 text-xs text-gray-500 dark:text-gray-400 mb-3"><span class="flex items-center gap-1">`);
      _push(ssrRenderComponent(_component_UIcon, {
        name: "i-lucide-calendar",
        class: "w-3.5 h-3.5"
      }, null, _parent));
      _push(` ${ssrInterpolate(unref(formatDate)(__props.article.publishedAt))}</span><span class="flex items-center gap-1">`);
      _push(ssrRenderComponent(_component_UIcon, {
        name: "i-lucide-clock",
        class: "w-3.5 h-3.5"
      }, null, _parent));
      _push(` ${ssrInterpolate(__props.article.readTime)} min </span></div><!-- Title --><h2 class="text-lg font-semibold text-gray-900 dark:text-white mb-2 line-clamp-2 group-hover:text-primary-500 transition-colors">${ssrInterpolate(__props.article.title)}</h2><!-- Excerpt -->`);
      if (__props.article.excerpt) {
        _push(`<p class="text-sm text-gray-600 dark:text-gray-400 line-clamp-2 mb-4">${ssrInterpolate(__props.article.excerpt)}</p>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<!-- Footer --><div class="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-gray-700"><!-- Author -->`);
      if (__props.article.author) {
        _push(`<div class="flex items-center gap-2">`);
        _push(ssrRenderComponent(_component_UAvatar, {
          src: __props.article.author.avatar,
          alt: __props.article.author.fullName,
          size: "xs"
        }, null, _parent));
        _push(`<span class="text-xs text-gray-600 dark:text-gray-400">${ssrInterpolate(__props.article.author.fullName)}</span></div>`);
      } else {
        _push(`<div></div>`);
      }
      _push(`<!-- Stats --><div class="flex items-center gap-3 text-xs text-gray-500"><span class="flex items-center gap-1">`);
      _push(ssrRenderComponent(_component_UIcon, {
        name: "i-lucide-eye",
        class: "w-3.5 h-3.5"
      }, null, _parent));
      _push(` ${ssrInterpolate(unref(formatCount)(__props.article.viewCount))}</span><span class="flex items-center gap-1">`);
      _push(ssrRenderComponent(_component_UIcon, {
        name: "i-lucide-heart",
        class: "w-3.5 h-3.5"
      }, null, _parent));
      _push(` ${ssrInterpolate(unref(formatCount)(__props.article.likeCount))}</span></div></div></div></a>`);
    };
  }
});

const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("inertia/components/article/ArticleCard.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};

const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "ArticleCardSkeleton",
  __ssrInlineRender: true,
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "bg-white dark:bg-gray-800 rounded-xl p-4 animate-pulse" }, _attrs))}><div class="aspect-video bg-gray-200 dark:bg-gray-700 rounded-lg mb-4"></div><div class="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/4 mb-3"></div><div class="h-6 bg-gray-200 dark:bg-gray-700 rounded mb-2"></div><div class="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div></div>`);
    };
  }
});

const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("inertia/components/article/ArticleCardSkeleton.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};

const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "ArticleEmptyState",
  __ssrInlineRender: true,
  emits: ["clearFilters"],
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UIcon = _sfc_main$4;
      const _component_UButton = _sfc_main$7;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "text-center py-16 bg-white dark:bg-gray-800 rounded-xl" }, _attrs))}><div class="w-24 h-24 mx-auto mb-6 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center">`);
      _push(ssrRenderComponent(_component_UIcon, {
        name: "i-lucide-file-search",
        class: "w-12 h-12 text-gray-400"
      }, null, _parent));
      _push(`</div><h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-2"> Artikel Tidak Ditemukan </h3><p class="text-gray-500 dark:text-gray-400 mb-6 max-w-md mx-auto"> Maaf, tidak ada artikel yang sesuai dengan pencarian Anda. Coba kata kunci lain atau hapus filter. </p>`);
      _push(ssrRenderComponent(_component_UButton, {
        color: "primary",
        onClick: ($event) => _ctx.$emit("clearFilters")
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` Hapus Filter `);
          } else {
            return [
              createTextVNode(" Hapus Filter ")
            ];
          }
        }),
        _: 1
        /* STABLE */
      }, _parent));
      _push(`</div>`);
    };
  }
});

const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("inertia/components/article/ArticleEmptyState.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};

function useArticleFilters(options) {
  const { initialFilters, categories } = options;
  const searchQuery = ref(initialFilters.search || "");
  const selectedCategory = ref(initialFilters.category || "");
  const selectedTag = ref(initialFilters.tag || "");
  const isLoading = ref(false);
  const buildQueryParams = (page = 1) => {
    const params = {};
    if (searchQuery.value) params.search = searchQuery.value;
    if (selectedCategory.value) params.category = selectedCategory.value;
    if (selectedTag.value) params.tag = selectedTag.value;
    params.page = page;
    return params;
  };
  const navigateWithFilters = (params) => {
    isLoading.value = true;
    router.get("/artikel", params, {
      preserveState: true,
      preserveScroll: false,
      onFinish: () => {
        isLoading.value = false;
      }
    });
  };
  const applyFilters = () => {
    navigateWithFilters(buildQueryParams(1));
  };
  const debouncedSearch = useDebounceFn(applyFilters, 500);
  watch(searchQuery, () => {
    debouncedSearch();
  });
  const clearFilters = () => {
    searchQuery.value = "";
    selectedCategory.value = "";
    selectedTag.value = "";
    router.get("/artikel", {}, { preserveState: true });
  };
  const toggleCategory = (slug) => {
    selectedCategory.value = slug === selectedCategory.value ? "" : slug;
    applyFilters();
  };
  const toggleTag = (tag) => {
    selectedTag.value = tag === selectedTag.value ? "" : tag;
    applyFilters();
  };
  const clearSearch = () => {
    searchQuery.value = "";
    applyFilters();
  };
  const goToPage = (page, meta) => {
    if (page < 1 || page > meta.lastPage) return;
    navigateWithFilters(buildQueryParams(page));
  };
  const hasActiveFilters = computed(() => {
    return !!(searchQuery.value || selectedCategory.value || selectedTag.value);
  });
  const selectedCategoryLabel = computed(() => {
    if (!selectedCategory.value) return null;
    return categories.find((c) => c.slug === selectedCategory.value)?.label || null;
  });
  return {
    // State
    searchQuery,
    selectedCategory,
    selectedTag,
    isLoading,
    // Computed
    hasActiveFilters,
    selectedCategoryLabel,
    // Actions
    applyFilters,
    clearFilters,
    toggleCategory,
    toggleTag,
    clearSearch,
    goToPage
  };
}

const SITE_URL = "https://ogitu.com";
const SITE_NAME = "Ogitu";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  props: {
    articles: {},
    categories: {},
    featuredArticles: {},
    popularTags: {},
    filters: {}
  },
  setup(__props) {
    const props = __props;
    const {
      searchQuery,
      selectedCategory,
      selectedTag,
      isLoading,
      hasActiveFilters,
      selectedCategoryLabel,
      clearFilters,
      toggleCategory,
      toggleTag,
      clearSearch,
      goToPage
    } = useArticleFilters({
      initialFilters: props.filters,
      categories: props.categories
    });
    const showPagination = computed(() => {
      return props.articles.data.length > 0 && props.articles.meta.lastPage > 1;
    });
    const seo = computed(() => ({
      title: selectedCategoryLabel.value ? `${selectedCategoryLabel.value} - Blog Vape & Rokok Elektrik | ${SITE_NAME}` : `Blog & Artikel Vape - Tips, Review, Panduan | ${SITE_NAME}`,
      description: "Baca artikel terbaru seputar dunia vape dan rokok elektrik. Tips perawatan, review produk, panduan pemula, berita industri, dan promo menarik.",
      keywords: "artikel vape, blog vape, tips vape, review vape, panduan vaping, berita vape, promo vape, vape indonesia"
    }));
    useHead({
      title: seo.value.title,
      meta: [
        { name: "description", content: seo.value.description },
        { name: "keywords", content: seo.value.keywords },
        { property: "og:title", content: seo.value.title },
        { property: "og:description", content: seo.value.description },
        { property: "og:type", content: "website" },
        { property: "og:url", content: `${SITE_URL}/artikel` }
      ]
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UBadge = _sfc_main$5;
      const _component_UIcon = _sfc_main$4;
      const _component_UInput = _sfc_main$9;
      const _component_UButton = _sfc_main$7;
      const _component_UCard = _sfc_main$a;
      const _component_UPagination = _sfc_main$b;
      _push(`<!--[-->`);
      _push(ssrRenderComponent(unref(Head), {
        title: seo.value.title
      }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$8, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<!-- Hero Section --><section class="relative bg-linear-to-br from-gray-900 via-gray-800 to-gray-900 py-16 lg:py-20" data-v-76a6b941${_scopeId}><!-- Background Decorations --><div class="absolute inset-0 overflow-hidden" data-v-76a6b941${_scopeId}><div class="absolute top-0 right-0 w-1/2 h-full bg-linear-to-l from-primary-500/10 to-transparent" data-v-76a6b941${_scopeId}></div><div class="absolute bottom-0 left-0 w-1/3 h-1/2 bg-linear-to-t from-primary-500/5 to-transparent" data-v-76a6b941${_scopeId}></div></div><div class="container mx-auto px-4 relative" data-v-76a6b941${_scopeId}><div class="max-w-3xl mx-auto text-center" data-v-76a6b941${_scopeId}><!-- Badge -->`);
            _push2(ssrRenderComponent(_component_UBadge, {
              color: "primary",
              variant: "soft",
              size: "lg",
              class: "mb-4"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_UIcon, {
                    name: "i-lucide-newspaper",
                    class: "w-4 h-4 mr-1"
                  }, null, _parent3, _scopeId2));
                  _push3(` Blog &amp; Artikel `);
                } else {
                  return [
                    createVNode(_component_UIcon, {
                      name: "i-lucide-newspaper",
                      class: "w-4 h-4 mr-1"
                    }),
                    createTextVNode(" Blog & Artikel ")
                  ];
                }
              }),
              _: 1
              /* STABLE */
            }, _parent2, _scopeId));
            _push2(`<!-- Title --><h1 class="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4" data-v-76a6b941${_scopeId}> Artikel Seputar <span class="text-transparent bg-clip-text bg-linear-to-r from-primary-400 to-primary-600" data-v-76a6b941${_scopeId}> Vape &amp; Rokok Elektrik </span></h1><!-- Description --><p class="text-gray-400 text-lg mb-8 max-w-2xl mx-auto" data-v-76a6b941${_scopeId}> Tips, review, panduan, dan berita terbaru dari dunia vaping. Temukan informasi yang Anda butuhkan untuk pengalaman vaping terbaik. </p><!-- Search Bar --><div class="max-w-xl mx-auto" data-v-76a6b941${_scopeId}>`);
            _push2(ssrRenderComponent(_component_UInput, {
              modelValue: unref(searchQuery),
              "onUpdate:modelValue": ($event) => isRef(searchQuery) ? searchQuery.value = $event : null,
              placeholder: "Cari artikel...",
              icon: "i-lucide-search",
              size: "xl",
              loading: unref(isLoading),
              class: "w-full",
              ui: {
                base: "bg-white/10 backdrop-blur-sm border-white/20 focus:border-primary-500",
                icon: { trailing: { pointer: "" } }
              }
            }, {
              trailing: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  if (unref(searchQuery)) {
                    _push3(ssrRenderComponent(_component_UButton, {
                      color: "neutral",
                      variant: "ghost",
                      size: "xs",
                      icon: "i-lucide-x",
                      onClick: unref(clearSearch)
                    }, null, _parent3, _scopeId2));
                  } else {
                    _push3(`<!---->`);
                  }
                } else {
                  return [
                    unref(searchQuery) ? (openBlock(), createBlock(_component_UButton, {
                      key: 0,
                      color: "neutral",
                      variant: "ghost",
                      size: "xs",
                      icon: "i-lucide-x",
                      onClick: unref(clearSearch)
                    }, null, 8, ["onClick"])) : createCommentVNode("v-if", true)
                  ];
                }
              }),
              _: 1
              /* STABLE */
            }, _parent2, _scopeId));
            _push2(`</div></div></div></section><!-- Main Content --><section class="py-12 bg-gray-50 dark:bg-gray-900" data-v-76a6b941${_scopeId}><div class="container mx-auto px-4" data-v-76a6b941${_scopeId}><div class="flex flex-col lg:flex-row gap-8" data-v-76a6b941${_scopeId}><!-- Sidebar --><aside class="lg:w-80 shrink-0 space-y-6" data-v-76a6b941${_scopeId}><!-- Categories Card -->`);
            _push2(ssrRenderComponent(_component_UCard, null, {
              header: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="flex items-center gap-2" data-v-76a6b941${_scopeId2}>`);
                  _push3(ssrRenderComponent(_component_UIcon, {
                    name: "i-lucide-folder",
                    class: "w-5 h-5 text-primary-500"
                  }, null, _parent3, _scopeId2));
                  _push3(`<h3 class="font-semibold" data-v-76a6b941${_scopeId2}>Kategori</h3></div>`);
                } else {
                  return [
                    createVNode("div", { class: "flex items-center gap-2" }, [
                      createVNode(_component_UIcon, {
                        name: "i-lucide-folder",
                        class: "w-5 h-5 text-primary-500"
                      }),
                      createVNode("h3", { class: "font-semibold" }, "Kategori")
                    ])
                  ];
                }
              }),
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="space-y-2" data-v-76a6b941${_scopeId2}><!--[-->`);
                  ssrRenderList(__props.categories, (category) => {
                    _push3(`<button class="${ssrRenderClass([[
                      unref(selectedCategory) === category.slug ? "bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400" : "hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300"
                    ], "w-full flex items-center justify-between px-3 py-2 rounded-lg text-left transition-all"])}" data-v-76a6b941${_scopeId2}><span class="flex items-center gap-2" data-v-76a6b941${_scopeId2}>`);
                    _push3(ssrRenderComponent(_component_UBadge, {
                      color: unref(CATEGORY_COLORS)[category.slug] || "neutral",
                      size: "xs"
                    }, null, _parent3, _scopeId2));
                    _push3(` ${ssrInterpolate(category.label)}</span>`);
                    _push3(ssrRenderComponent(_component_UBadge, {
                      color: "neutral",
                      variant: "subtle",
                      size: "xs"
                    }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`${ssrInterpolate(category.count)}`);
                        } else {
                          return [
                            createTextVNode(
                              toDisplayString(category.count),
                              1
                              /* TEXT */
                            )
                          ];
                        }
                      }),
                      _: 2
                      /* DYNAMIC */
                    }, _parent3, _scopeId2));
                    _push3(`</button>`);
                  });
                  _push3(`<!--]--></div>`);
                } else {
                  return [
                    createVNode("div", { class: "space-y-2" }, [
                      (openBlock(true), createBlock(
                        Fragment,
                        null,
                        renderList(__props.categories, (category) => {
                          return openBlock(), createBlock("button", {
                            key: category.slug,
                            class: ["w-full flex items-center justify-between px-3 py-2 rounded-lg text-left transition-all", [
                              unref(selectedCategory) === category.slug ? "bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400" : "hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300"
                            ]],
                            onClick: ($event) => unref(toggleCategory)(category.slug)
                          }, [
                            createVNode("span", { class: "flex items-center gap-2" }, [
                              createVNode(_component_UBadge, {
                                color: unref(CATEGORY_COLORS)[category.slug] || "neutral",
                                size: "xs"
                              }, null, 8, ["color"]),
                              createTextVNode(
                                " " + toDisplayString(category.label),
                                1
                                /* TEXT */
                              )
                            ]),
                            createVNode(
                              _component_UBadge,
                              {
                                color: "neutral",
                                variant: "subtle",
                                size: "xs"
                              },
                              {
                                default: withCtx(() => [
                                  createTextVNode(
                                    toDisplayString(category.count),
                                    1
                                    /* TEXT */
                                  )
                                ]),
                                _: 2
                                /* DYNAMIC */
                              },
                              1024
                              /* DYNAMIC_SLOTS */
                            )
                          ], 10, ["onClick"]);
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
            _push2(`<!-- Featured Articles Card -->`);
            if (__props.featuredArticles.length > 0) {
              _push2(ssrRenderComponent(_component_UCard, null, {
                header: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`<div class="flex items-center gap-2" data-v-76a6b941${_scopeId2}>`);
                    _push3(ssrRenderComponent(_component_UIcon, {
                      name: "i-lucide-star",
                      class: "w-5 h-5 text-yellow-500"
                    }, null, _parent3, _scopeId2));
                    _push3(`<h3 class="font-semibold" data-v-76a6b941${_scopeId2}>Artikel Pilihan</h3></div>`);
                  } else {
                    return [
                      createVNode("div", { class: "flex items-center gap-2" }, [
                        createVNode(_component_UIcon, {
                          name: "i-lucide-star",
                          class: "w-5 h-5 text-yellow-500"
                        }),
                        createVNode("h3", { class: "font-semibold" }, "Artikel Pilihan")
                      ])
                    ];
                  }
                }),
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`<div class="space-y-4" data-v-76a6b941${_scopeId2}><!--[-->`);
                    ssrRenderList(__props.featuredArticles.slice(0, 4), (article) => {
                      _push3(`<a${ssrRenderAttr("href", `/artikel/${article.slug}`)} class="group flex gap-3 p-2 -mx-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors" data-v-76a6b941${_scopeId2}><div class="shrink-0 w-16 h-16 rounded-lg overflow-hidden bg-gray-200 dark:bg-gray-700" data-v-76a6b941${_scopeId2}>`);
                      if (article.thumbnail) {
                        _push3(`<img${ssrRenderAttr("src", article.thumbnail)}${ssrRenderAttr("alt", article.title)} class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" data-v-76a6b941${_scopeId2}>`);
                      } else {
                        _push3(`<div class="w-full h-full flex items-center justify-center" data-v-76a6b941${_scopeId2}>`);
                        _push3(ssrRenderComponent(_component_UIcon, {
                          name: "i-lucide-image",
                          class: "w-6 h-6 text-gray-400"
                        }, null, _parent3, _scopeId2));
                        _push3(`</div>`);
                      }
                      _push3(`</div><div class="flex-1 min-w-0" data-v-76a6b941${_scopeId2}><h4 class="text-sm font-medium text-gray-900 dark:text-white line-clamp-2 group-hover:text-primary-500 transition-colors" data-v-76a6b941${_scopeId2}>${ssrInterpolate(article.title)}</h4><p class="text-xs text-gray-500 mt-1" data-v-76a6b941${_scopeId2}>${ssrInterpolate(article.readTime)} menit baca </p></div></a>`);
                    });
                    _push3(`<!--]--></div>`);
                  } else {
                    return [
                      createVNode("div", { class: "space-y-4" }, [
                        (openBlock(true), createBlock(
                          Fragment,
                          null,
                          renderList(__props.featuredArticles.slice(0, 4), (article) => {
                            return openBlock(), createBlock("a", {
                              key: article.id,
                              href: `/artikel/${article.slug}`,
                              class: "group flex gap-3 p-2 -mx-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                            }, [
                              createVNode("div", { class: "shrink-0 w-16 h-16 rounded-lg overflow-hidden bg-gray-200 dark:bg-gray-700" }, [
                                article.thumbnail ? (openBlock(), createBlock("img", {
                                  key: 0,
                                  src: article.thumbnail,
                                  alt: article.title,
                                  class: "w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                }, null, 8, ["src", "alt"])) : (openBlock(), createBlock("div", {
                                  key: 1,
                                  class: "w-full h-full flex items-center justify-center"
                                }, [
                                  createVNode(_component_UIcon, {
                                    name: "i-lucide-image",
                                    class: "w-6 h-6 text-gray-400"
                                  })
                                ]))
                              ]),
                              createVNode("div", { class: "flex-1 min-w-0" }, [
                                createVNode(
                                  "h4",
                                  { class: "text-sm font-medium text-gray-900 dark:text-white line-clamp-2 group-hover:text-primary-500 transition-colors" },
                                  toDisplayString(article.title),
                                  1
                                  /* TEXT */
                                ),
                                createVNode(
                                  "p",
                                  { class: "text-xs text-gray-500 mt-1" },
                                  toDisplayString(article.readTime) + " menit baca ",
                                  1
                                  /* TEXT */
                                )
                              ])
                            ], 8, ["href"]);
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
            } else {
              _push2(`<!---->`);
            }
            _push2(`<!-- Popular Tags Card -->`);
            if (__props.popularTags.length > 0) {
              _push2(ssrRenderComponent(_component_UCard, null, {
                header: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`<div class="flex items-center gap-2" data-v-76a6b941${_scopeId2}>`);
                    _push3(ssrRenderComponent(_component_UIcon, {
                      name: "i-lucide-tags",
                      class: "w-5 h-5 text-primary-500"
                    }, null, _parent3, _scopeId2));
                    _push3(`<h3 class="font-semibold" data-v-76a6b941${_scopeId2}>Tag Populer</h3></div>`);
                  } else {
                    return [
                      createVNode("div", { class: "flex items-center gap-2" }, [
                        createVNode(_component_UIcon, {
                          name: "i-lucide-tags",
                          class: "w-5 h-5 text-primary-500"
                        }),
                        createVNode("h3", { class: "font-semibold" }, "Tag Populer")
                      ])
                    ];
                  }
                }),
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`<div class="flex flex-wrap gap-2" data-v-76a6b941${_scopeId2}><!--[-->`);
                    ssrRenderList(__props.popularTags.slice(0, 15), (tag) => {
                      _push3(ssrRenderComponent(_component_UBadge, {
                        key: tag,
                        color: unref(selectedTag) === tag ? "primary" : "neutral",
                        variant: unref(selectedTag) === tag ? "solid" : "subtle",
                        class: "cursor-pointer hover:scale-105 transition-transform",
                        onClick: ($event) => unref(toggleTag)(tag)
                      }, {
                        default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                          if (_push4) {
                            _push4(` #${ssrInterpolate(tag)}`);
                          } else {
                            return [
                              createTextVNode(
                                " #" + toDisplayString(tag),
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
                      createVNode("div", { class: "flex flex-wrap gap-2" }, [
                        (openBlock(true), createBlock(
                          Fragment,
                          null,
                          renderList(__props.popularTags.slice(0, 15), (tag) => {
                            return openBlock(), createBlock(_component_UBadge, {
                              key: tag,
                              color: unref(selectedTag) === tag ? "primary" : "neutral",
                              variant: unref(selectedTag) === tag ? "solid" : "subtle",
                              class: "cursor-pointer hover:scale-105 transition-transform",
                              onClick: ($event) => unref(toggleTag)(tag)
                            }, {
                              default: withCtx(() => [
                                createTextVNode(
                                  " #" + toDisplayString(tag),
                                  1
                                  /* TEXT */
                                )
                              ]),
                              _: 2
                              /* DYNAMIC */
                            }, 1032, ["color", "variant", "onClick"]);
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
            } else {
              _push2(`<!---->`);
            }
            _push2(`</aside><!-- Article List --><div class="flex-1 min-w-0" data-v-76a6b941${_scopeId}><!-- Active Filters Bar -->`);
            if (unref(hasActiveFilters)) {
              _push2(`<div class="flex flex-wrap items-center gap-2 mb-6 p-4 bg-white dark:bg-gray-800 rounded-xl shadow-sm" data-v-76a6b941${_scopeId}><span class="text-sm text-gray-500" data-v-76a6b941${_scopeId}>Filter aktif:</span>`);
              if (unref(selectedCategory)) {
                _push2(ssrRenderComponent(_component_UBadge, {
                  color: "primary",
                  variant: "soft",
                  class: "cursor-pointer",
                  onClick: ($event) => unref(toggleCategory)(unref(selectedCategory))
                }, {
                  default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      _push3(`${ssrInterpolate(unref(selectedCategoryLabel))} `);
                      _push3(ssrRenderComponent(_component_UIcon, {
                        name: "i-lucide-x",
                        class: "w-3 h-3 ml-1"
                      }, null, _parent3, _scopeId2));
                    } else {
                      return [
                        createTextVNode(
                          toDisplayString(unref(selectedCategoryLabel)) + " ",
                          1
                          /* TEXT */
                        ),
                        createVNode(_component_UIcon, {
                          name: "i-lucide-x",
                          class: "w-3 h-3 ml-1"
                        })
                      ];
                    }
                  }),
                  _: 1
                  /* STABLE */
                }, _parent2, _scopeId));
              } else {
                _push2(`<!---->`);
              }
              if (unref(selectedTag)) {
                _push2(ssrRenderComponent(_component_UBadge, {
                  color: "primary",
                  variant: "soft",
                  class: "cursor-pointer",
                  onClick: ($event) => unref(toggleTag)(unref(selectedTag))
                }, {
                  default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      _push3(` #${ssrInterpolate(unref(selectedTag))} `);
                      _push3(ssrRenderComponent(_component_UIcon, {
                        name: "i-lucide-x",
                        class: "w-3 h-3 ml-1"
                      }, null, _parent3, _scopeId2));
                    } else {
                      return [
                        createTextVNode(
                          " #" + toDisplayString(unref(selectedTag)) + " ",
                          1
                          /* TEXT */
                        ),
                        createVNode(_component_UIcon, {
                          name: "i-lucide-x",
                          class: "w-3 h-3 ml-1"
                        })
                      ];
                    }
                  }),
                  _: 1
                  /* STABLE */
                }, _parent2, _scopeId));
              } else {
                _push2(`<!---->`);
              }
              if (unref(searchQuery)) {
                _push2(ssrRenderComponent(_component_UBadge, {
                  color: "primary",
                  variant: "soft",
                  class: "cursor-pointer",
                  onClick: unref(clearSearch)
                }, {
                  default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      _push3(` &quot;${ssrInterpolate(unref(searchQuery))}&quot; `);
                      _push3(ssrRenderComponent(_component_UIcon, {
                        name: "i-lucide-x",
                        class: "w-3 h-3 ml-1"
                      }, null, _parent3, _scopeId2));
                    } else {
                      return [
                        createTextVNode(
                          ' "' + toDisplayString(unref(searchQuery)) + '" ',
                          1
                          /* TEXT */
                        ),
                        createVNode(_component_UIcon, {
                          name: "i-lucide-x",
                          class: "w-3 h-3 ml-1"
                        })
                      ];
                    }
                  }),
                  _: 1
                  /* STABLE */
                }, _parent2, _scopeId));
              } else {
                _push2(`<!---->`);
              }
              _push2(ssrRenderComponent(_component_UButton, {
                color: "neutral",
                variant: "ghost",
                size: "xs",
                onClick: unref(clearFilters)
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(` Hapus semua `);
                  } else {
                    return [
                      createTextVNode(" Hapus semua ")
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
            _push2(`<!-- Results Count --><div class="flex items-center justify-between mb-6" data-v-76a6b941${_scopeId}><p class="text-gray-600 dark:text-gray-400" data-v-76a6b941${_scopeId}> Menampilkan <span class="font-semibold text-gray-900 dark:text-white" data-v-76a6b941${_scopeId}>${ssrInterpolate(__props.articles.meta.total)}</span> artikel </p></div><!-- Loading State -->`);
            if (unref(isLoading)) {
              _push2(`<div class="grid gap-6 md:grid-cols-2" data-v-76a6b941${_scopeId}><!--[-->`);
              ssrRenderList(6, (i) => {
                _push2(ssrRenderComponent(_sfc_main$2, { key: i }, null, _parent2, _scopeId));
              });
              _push2(`<!--]--></div>`);
            } else if (__props.articles.data.length > 0) {
              _push2(`<!--[--><!-- Article Grid --><div class="grid gap-6 md:grid-cols-2" data-v-76a6b941${_scopeId}><!--[-->`);
              ssrRenderList(__props.articles.data, (article) => {
                _push2(ssrRenderComponent(_sfc_main$3, {
                  key: article.id,
                  article
                }, null, _parent2, _scopeId));
              });
              _push2(`<!--]--></div><!--]-->`);
            } else {
              _push2(`<!--[--><!-- Empty State -->`);
              _push2(ssrRenderComponent(_sfc_main$1, { onClearFilters: unref(clearFilters) }, null, _parent2, _scopeId));
              _push2(`<!--]-->`);
            }
            _push2(`<!-- Pagination -->`);
            if (showPagination.value) {
              _push2(`<div class="flex justify-center mt-8" data-v-76a6b941${_scopeId}>`);
              _push2(ssrRenderComponent(_component_UPagination, {
                "model-value": __props.articles.meta.currentPage,
                total: __props.articles.meta.total,
                "page-count": __props.articles.meta.perPage,
                ui: {
                  wrapper: "flex items-center gap-1",
                  base: "min-w-[32px] h-8 flex items-center justify-center"
                },
                "onUpdate:modelValue": (page) => unref(goToPage)(page, __props.articles.meta)
              }, null, _parent2, _scopeId));
              _push2(`</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div></div></div></section><!-- Newsletter CTA Section --><section class="py-16 bg-linear-to-r from-primary-600 to-primary-700" data-v-76a6b941${_scopeId}><div class="container mx-auto px-4" data-v-76a6b941${_scopeId}><div class="max-w-2xl mx-auto text-center" data-v-76a6b941${_scopeId}>`);
            _push2(ssrRenderComponent(_component_UIcon, {
              name: "i-lucide-mail",
              class: "w-12 h-12 text-white/80 mx-auto mb-4"
            }, null, _parent2, _scopeId));
            _push2(`<h2 class="text-2xl md:text-3xl font-bold text-white mb-3" data-v-76a6b941${_scopeId}> Dapatkan Update Artikel Terbaru </h2><p class="text-white/80 mb-6" data-v-76a6b941${_scopeId}> Berlangganan newsletter kami untuk mendapatkan tips, review, dan promo menarik langsung di inbox Anda. </p><form class="flex flex-col sm:flex-row gap-3 max-w-md mx-auto" data-v-76a6b941${_scopeId}>`);
            _push2(ssrRenderComponent(_component_UInput, {
              placeholder: "Masukkan email Anda",
              type: "email",
              size: "lg",
              class: "flex-1",
              ui: { base: "bg-white/10 border-white/20 text-white placeholder-white/60" }
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_UButton, {
              color: "white",
              size: "lg",
              type: "submit"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Berlangganan `);
                } else {
                  return [
                    createTextVNode(" Berlangganan ")
                  ];
                }
              }),
              _: 1
              /* STABLE */
            }, _parent2, _scopeId));
            _push2(`</form></div></div></section>`);
          } else {
            return [
              createCommentVNode(" Hero Section "),
              createVNode("section", { class: "relative bg-linear-to-br from-gray-900 via-gray-800 to-gray-900 py-16 lg:py-20" }, [
                createCommentVNode(" Background Decorations "),
                createVNode("div", { class: "absolute inset-0 overflow-hidden" }, [
                  createVNode("div", { class: "absolute top-0 right-0 w-1/2 h-full bg-linear-to-l from-primary-500/10 to-transparent" }),
                  createVNode("div", { class: "absolute bottom-0 left-0 w-1/3 h-1/2 bg-linear-to-t from-primary-500/5 to-transparent" })
                ]),
                createVNode("div", { class: "container mx-auto px-4 relative" }, [
                  createVNode("div", { class: "max-w-3xl mx-auto text-center" }, [
                    createCommentVNode(" Badge "),
                    createVNode(_component_UBadge, {
                      color: "primary",
                      variant: "soft",
                      size: "lg",
                      class: "mb-4"
                    }, {
                      default: withCtx(() => [
                        createVNode(_component_UIcon, {
                          name: "i-lucide-newspaper",
                          class: "w-4 h-4 mr-1"
                        }),
                        createTextVNode(" Blog & Artikel ")
                      ]),
                      _: 1
                      /* STABLE */
                    }),
                    createCommentVNode(" Title "),
                    createVNode("h1", { class: "text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4" }, [
                      createTextVNode(" Artikel Seputar "),
                      createVNode("span", { class: "text-transparent bg-clip-text bg-linear-to-r from-primary-400 to-primary-600" }, " Vape & Rokok Elektrik ")
                    ]),
                    createCommentVNode(" Description "),
                    createVNode("p", { class: "text-gray-400 text-lg mb-8 max-w-2xl mx-auto" }, " Tips, review, panduan, dan berita terbaru dari dunia vaping. Temukan informasi yang Anda butuhkan untuk pengalaman vaping terbaik. "),
                    createCommentVNode(" Search Bar "),
                    createVNode("div", { class: "max-w-xl mx-auto" }, [
                      createVNode(_component_UInput, {
                        modelValue: unref(searchQuery),
                        "onUpdate:modelValue": ($event) => isRef(searchQuery) ? searchQuery.value = $event : null,
                        placeholder: "Cari artikel...",
                        icon: "i-lucide-search",
                        size: "xl",
                        loading: unref(isLoading),
                        class: "w-full",
                        ui: {
                          base: "bg-white/10 backdrop-blur-sm border-white/20 focus:border-primary-500",
                          icon: { trailing: { pointer: "" } }
                        }
                      }, {
                        trailing: withCtx(() => [
                          unref(searchQuery) ? (openBlock(), createBlock(_component_UButton, {
                            key: 0,
                            color: "neutral",
                            variant: "ghost",
                            size: "xs",
                            icon: "i-lucide-x",
                            onClick: unref(clearSearch)
                          }, null, 8, ["onClick"])) : createCommentVNode("v-if", true)
                        ]),
                        _: 1
                        /* STABLE */
                      }, 8, ["modelValue", "onUpdate:modelValue", "loading"])
                    ])
                  ])
                ])
              ]),
              createCommentVNode(" Main Content "),
              createVNode("section", { class: "py-12 bg-gray-50 dark:bg-gray-900" }, [
                createVNode("div", { class: "container mx-auto px-4" }, [
                  createVNode("div", { class: "flex flex-col lg:flex-row gap-8" }, [
                    createCommentVNode(" Sidebar "),
                    createVNode("aside", { class: "lg:w-80 shrink-0 space-y-6" }, [
                      createCommentVNode(" Categories Card "),
                      createVNode(_component_UCard, null, {
                        header: withCtx(() => [
                          createVNode("div", { class: "flex items-center gap-2" }, [
                            createVNode(_component_UIcon, {
                              name: "i-lucide-folder",
                              class: "w-5 h-5 text-primary-500"
                            }),
                            createVNode("h3", { class: "font-semibold" }, "Kategori")
                          ])
                        ]),
                        default: withCtx(() => [
                          createVNode("div", { class: "space-y-2" }, [
                            (openBlock(true), createBlock(
                              Fragment,
                              null,
                              renderList(__props.categories, (category) => {
                                return openBlock(), createBlock("button", {
                                  key: category.slug,
                                  class: ["w-full flex items-center justify-between px-3 py-2 rounded-lg text-left transition-all", [
                                    unref(selectedCategory) === category.slug ? "bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400" : "hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300"
                                  ]],
                                  onClick: ($event) => unref(toggleCategory)(category.slug)
                                }, [
                                  createVNode("span", { class: "flex items-center gap-2" }, [
                                    createVNode(_component_UBadge, {
                                      color: unref(CATEGORY_COLORS)[category.slug] || "neutral",
                                      size: "xs"
                                    }, null, 8, ["color"]),
                                    createTextVNode(
                                      " " + toDisplayString(category.label),
                                      1
                                      /* TEXT */
                                    )
                                  ]),
                                  createVNode(
                                    _component_UBadge,
                                    {
                                      color: "neutral",
                                      variant: "subtle",
                                      size: "xs"
                                    },
                                    {
                                      default: withCtx(() => [
                                        createTextVNode(
                                          toDisplayString(category.count),
                                          1
                                          /* TEXT */
                                        )
                                      ]),
                                      _: 2
                                      /* DYNAMIC */
                                    },
                                    1024
                                    /* DYNAMIC_SLOTS */
                                  )
                                ], 10, ["onClick"]);
                              }),
                              128
                              /* KEYED_FRAGMENT */
                            ))
                          ])
                        ]),
                        _: 1
                        /* STABLE */
                      }),
                      createCommentVNode(" Featured Articles Card "),
                      __props.featuredArticles.length > 0 ? (openBlock(), createBlock(_component_UCard, { key: 0 }, {
                        header: withCtx(() => [
                          createVNode("div", { class: "flex items-center gap-2" }, [
                            createVNode(_component_UIcon, {
                              name: "i-lucide-star",
                              class: "w-5 h-5 text-yellow-500"
                            }),
                            createVNode("h3", { class: "font-semibold" }, "Artikel Pilihan")
                          ])
                        ]),
                        default: withCtx(() => [
                          createVNode("div", { class: "space-y-4" }, [
                            (openBlock(true), createBlock(
                              Fragment,
                              null,
                              renderList(__props.featuredArticles.slice(0, 4), (article) => {
                                return openBlock(), createBlock("a", {
                                  key: article.id,
                                  href: `/artikel/${article.slug}`,
                                  class: "group flex gap-3 p-2 -mx-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                                }, [
                                  createVNode("div", { class: "shrink-0 w-16 h-16 rounded-lg overflow-hidden bg-gray-200 dark:bg-gray-700" }, [
                                    article.thumbnail ? (openBlock(), createBlock("img", {
                                      key: 0,
                                      src: article.thumbnail,
                                      alt: article.title,
                                      class: "w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                    }, null, 8, ["src", "alt"])) : (openBlock(), createBlock("div", {
                                      key: 1,
                                      class: "w-full h-full flex items-center justify-center"
                                    }, [
                                      createVNode(_component_UIcon, {
                                        name: "i-lucide-image",
                                        class: "w-6 h-6 text-gray-400"
                                      })
                                    ]))
                                  ]),
                                  createVNode("div", { class: "flex-1 min-w-0" }, [
                                    createVNode(
                                      "h4",
                                      { class: "text-sm font-medium text-gray-900 dark:text-white line-clamp-2 group-hover:text-primary-500 transition-colors" },
                                      toDisplayString(article.title),
                                      1
                                      /* TEXT */
                                    ),
                                    createVNode(
                                      "p",
                                      { class: "text-xs text-gray-500 mt-1" },
                                      toDisplayString(article.readTime) + " menit baca ",
                                      1
                                      /* TEXT */
                                    )
                                  ])
                                ], 8, ["href"]);
                              }),
                              128
                              /* KEYED_FRAGMENT */
                            ))
                          ])
                        ]),
                        _: 1
                        /* STABLE */
                      })) : createCommentVNode("v-if", true),
                      createCommentVNode(" Popular Tags Card "),
                      __props.popularTags.length > 0 ? (openBlock(), createBlock(_component_UCard, { key: 1 }, {
                        header: withCtx(() => [
                          createVNode("div", { class: "flex items-center gap-2" }, [
                            createVNode(_component_UIcon, {
                              name: "i-lucide-tags",
                              class: "w-5 h-5 text-primary-500"
                            }),
                            createVNode("h3", { class: "font-semibold" }, "Tag Populer")
                          ])
                        ]),
                        default: withCtx(() => [
                          createVNode("div", { class: "flex flex-wrap gap-2" }, [
                            (openBlock(true), createBlock(
                              Fragment,
                              null,
                              renderList(__props.popularTags.slice(0, 15), (tag) => {
                                return openBlock(), createBlock(_component_UBadge, {
                                  key: tag,
                                  color: unref(selectedTag) === tag ? "primary" : "neutral",
                                  variant: unref(selectedTag) === tag ? "solid" : "subtle",
                                  class: "cursor-pointer hover:scale-105 transition-transform",
                                  onClick: ($event) => unref(toggleTag)(tag)
                                }, {
                                  default: withCtx(() => [
                                    createTextVNode(
                                      " #" + toDisplayString(tag),
                                      1
                                      /* TEXT */
                                    )
                                  ]),
                                  _: 2
                                  /* DYNAMIC */
                                }, 1032, ["color", "variant", "onClick"]);
                              }),
                              128
                              /* KEYED_FRAGMENT */
                            ))
                          ])
                        ]),
                        _: 1
                        /* STABLE */
                      })) : createCommentVNode("v-if", true)
                    ]),
                    createCommentVNode(" Article List "),
                    createVNode("div", { class: "flex-1 min-w-0" }, [
                      createCommentVNode(" Active Filters Bar "),
                      unref(hasActiveFilters) ? (openBlock(), createBlock("div", {
                        key: 0,
                        class: "flex flex-wrap items-center gap-2 mb-6 p-4 bg-white dark:bg-gray-800 rounded-xl shadow-sm"
                      }, [
                        createVNode("span", { class: "text-sm text-gray-500" }, "Filter aktif:"),
                        unref(selectedCategory) ? (openBlock(), createBlock(_component_UBadge, {
                          key: 0,
                          color: "primary",
                          variant: "soft",
                          class: "cursor-pointer",
                          onClick: ($event) => unref(toggleCategory)(unref(selectedCategory))
                        }, {
                          default: withCtx(() => [
                            createTextVNode(
                              toDisplayString(unref(selectedCategoryLabel)) + " ",
                              1
                              /* TEXT */
                            ),
                            createVNode(_component_UIcon, {
                              name: "i-lucide-x",
                              class: "w-3 h-3 ml-1"
                            })
                          ]),
                          _: 1
                          /* STABLE */
                        }, 8, ["onClick"])) : createCommentVNode("v-if", true),
                        unref(selectedTag) ? (openBlock(), createBlock(_component_UBadge, {
                          key: 1,
                          color: "primary",
                          variant: "soft",
                          class: "cursor-pointer",
                          onClick: ($event) => unref(toggleTag)(unref(selectedTag))
                        }, {
                          default: withCtx(() => [
                            createTextVNode(
                              " #" + toDisplayString(unref(selectedTag)) + " ",
                              1
                              /* TEXT */
                            ),
                            createVNode(_component_UIcon, {
                              name: "i-lucide-x",
                              class: "w-3 h-3 ml-1"
                            })
                          ]),
                          _: 1
                          /* STABLE */
                        }, 8, ["onClick"])) : createCommentVNode("v-if", true),
                        unref(searchQuery) ? (openBlock(), createBlock(_component_UBadge, {
                          key: 2,
                          color: "primary",
                          variant: "soft",
                          class: "cursor-pointer",
                          onClick: unref(clearSearch)
                        }, {
                          default: withCtx(() => [
                            createTextVNode(
                              ' "' + toDisplayString(unref(searchQuery)) + '" ',
                              1
                              /* TEXT */
                            ),
                            createVNode(_component_UIcon, {
                              name: "i-lucide-x",
                              class: "w-3 h-3 ml-1"
                            })
                          ]),
                          _: 1
                          /* STABLE */
                        }, 8, ["onClick"])) : createCommentVNode("v-if", true),
                        createVNode(_component_UButton, {
                          color: "neutral",
                          variant: "ghost",
                          size: "xs",
                          onClick: unref(clearFilters)
                        }, {
                          default: withCtx(() => [
                            createTextVNode(" Hapus semua ")
                          ]),
                          _: 1
                          /* STABLE */
                        }, 8, ["onClick"])
                      ])) : createCommentVNode("v-if", true),
                      createCommentVNode(" Results Count "),
                      createVNode("div", { class: "flex items-center justify-between mb-6" }, [
                        createVNode("p", { class: "text-gray-600 dark:text-gray-400" }, [
                          createTextVNode(" Menampilkan "),
                          createVNode(
                            "span",
                            { class: "font-semibold text-gray-900 dark:text-white" },
                            toDisplayString(__props.articles.meta.total),
                            1
                            /* TEXT */
                          ),
                          createTextVNode(" artikel ")
                        ])
                      ]),
                      createCommentVNode(" Loading State "),
                      unref(isLoading) ? (openBlock(), createBlock("div", {
                        key: 1,
                        class: "grid gap-6 md:grid-cols-2"
                      }, [
                        (openBlock(), createBlock(
                          Fragment,
                          null,
                          renderList(6, (i) => {
                            return createVNode(_sfc_main$2, { key: i });
                          }),
                          64
                          /* STABLE_FRAGMENT */
                        ))
                      ])) : __props.articles.data.length > 0 ? (openBlock(), createBlock(
                        Fragment,
                        { key: 2 },
                        [
                          createCommentVNode(" Article Grid "),
                          createVNode("div", { class: "grid gap-6 md:grid-cols-2" }, [
                            (openBlock(true), createBlock(
                              Fragment,
                              null,
                              renderList(__props.articles.data, (article) => {
                                return openBlock(), createBlock(_sfc_main$3, {
                                  key: article.id,
                                  article
                                }, null, 8, ["article"]);
                              }),
                              128
                              /* KEYED_FRAGMENT */
                            ))
                          ])
                        ],
                        2112
                        /* STABLE_FRAGMENT, DEV_ROOT_FRAGMENT */
                      )) : (openBlock(), createBlock(
                        Fragment,
                        { key: 3 },
                        [
                          createCommentVNode(" Empty State "),
                          createVNode(_sfc_main$1, { onClearFilters: unref(clearFilters) }, null, 8, ["onClearFilters"])
                        ],
                        2112
                        /* STABLE_FRAGMENT, DEV_ROOT_FRAGMENT */
                      )),
                      createCommentVNode(" Pagination "),
                      showPagination.value ? (openBlock(), createBlock("div", {
                        key: 4,
                        class: "flex justify-center mt-8"
                      }, [
                        createVNode(_component_UPagination, {
                          "model-value": __props.articles.meta.currentPage,
                          total: __props.articles.meta.total,
                          "page-count": __props.articles.meta.perPage,
                          ui: {
                            wrapper: "flex items-center gap-1",
                            base: "min-w-[32px] h-8 flex items-center justify-center"
                          },
                          "onUpdate:modelValue": (page) => unref(goToPage)(page, __props.articles.meta)
                        }, null, 8, ["model-value", "total", "page-count", "onUpdate:modelValue"])
                      ])) : createCommentVNode("v-if", true)
                    ])
                  ])
                ])
              ]),
              createCommentVNode(" Newsletter CTA Section "),
              createVNode("section", { class: "py-16 bg-linear-to-r from-primary-600 to-primary-700" }, [
                createVNode("div", { class: "container mx-auto px-4" }, [
                  createVNode("div", { class: "max-w-2xl mx-auto text-center" }, [
                    createVNode(_component_UIcon, {
                      name: "i-lucide-mail",
                      class: "w-12 h-12 text-white/80 mx-auto mb-4"
                    }),
                    createVNode("h2", { class: "text-2xl md:text-3xl font-bold text-white mb-3" }, " Dapatkan Update Artikel Terbaru "),
                    createVNode("p", { class: "text-white/80 mb-6" }, " Berlangganan newsletter kami untuk mendapatkan tips, review, dan promo menarik langsung di inbox Anda. "),
                    createVNode("form", {
                      class: "flex flex-col sm:flex-row gap-3 max-w-md mx-auto",
                      onSubmit: withModifiers(() => {
                      }, ["prevent"])
                    }, [
                      createVNode(_component_UInput, {
                        placeholder: "Masukkan email Anda",
                        type: "email",
                        size: "lg",
                        class: "flex-1",
                        ui: { base: "bg-white/10 border-white/20 text-white placeholder-white/60" }
                      }),
                      createVNode(_component_UButton, {
                        color: "white",
                        size: "lg",
                        type: "submit"
                      }, {
                        default: withCtx(() => [
                          createTextVNode(" Berlangganan ")
                        ]),
                        _: 1
                        /* STABLE */
                      })
                    ], 40, ["onSubmit"])
                  ])
                ])
              ])
            ];
          }
        }),
        _: 1
        /* STABLE */
      }, _parent));
      _push(`<!--]-->`);
    };
  }
});

/* unplugin-vue-components disabled */

const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("inertia/pages/artikel/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-76a6b941"]]);

export { index as default };
