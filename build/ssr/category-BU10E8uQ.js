import { _ as _sfc_main$7 } from './Pagination-C9h35VkF.js';
import { _ as _sfc_main$2, a as _sfc_main$5, b as _sfc_main$6 } from './Button-BBveOjhJ.js';
import { _ as _sfc_main$4 } from './Card-Ci6a5H8H.js';
import { a as _sfc_main$3, b as _export_sfc } from './Badge-DaOjA2YD.js';
import { defineComponent, ref, computed, unref, withCtx, createTextVNode, toDisplayString, createVNode, createBlock, openBlock, Fragment, renderList, createCommentVNode, useSSRContext } from 'vue';
import { ssrRenderComponent, ssrInterpolate, ssrRenderList, ssrRenderAttr } from 'vue/server-renderer';
import { Head, router } from '@inertiajs/vue3';
import { useHead } from '@unhead/vue';
import { _ as _sfc_main$1 } from './default-ChIG0McX.js';
import 'reka-ui';
import '@vueuse/core';
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

const siteUrl = "https://ogitu.com";
const siteName = "Ogitu";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "category",
  __ssrInlineRender: true,
  props: {
    articles: {},
    category: {},
    categories: {},
    featuredArticles: {},
    popularTags: {}
  },
  setup(__props) {
    const props = __props;
    const isLoading = ref(false);
    const categoryColors = {
      tips: "primary",
      review: "success",
      news: "info",
      guide: "warning",
      promo: "error"
    };
    const categoryDescriptions = {
      tips: "Tips dan trik untuk pengalaman vaping yang lebih baik. Mulai dari perawatan device hingga cara menghemat liquid.",
      review: "Review lengkap produk vape terbaru. Pod system, mod box, liquid, dan aksesoris dengan penilaian objektif.",
      news: "Berita terkini dari dunia vape dan rokok elektrik. Regulasi, tren, dan perkembangan industri.",
      guide: "Panduan lengkap untuk pemula hingga expert. Mulai dari dasar vaping hingga teknik lanjutan.",
      promo: "Informasi promo, diskon, dan penawaran menarik. Jangan lewatkan kesempatan hemat belanja!"
    };
    const categoryIcons = {
      tips: "i-lucide-lightbulb",
      review: "i-lucide-star",
      news: "i-lucide-newspaper",
      guide: "i-lucide-book-open",
      promo: "i-lucide-percent"
    };
    const goToPage = (page) => {
      if (page < 1 || page > props.articles.meta.lastPage) return;
      isLoading.value = true;
      router.get(
        `/artikel/kategori/${props.category.slug}`,
        { page },
        {
          preserveState: true,
          preserveScroll: false,
          onFinish: () => {
            isLoading.value = false;
          }
        }
      );
    };
    const formatDate = (dateString) => {
      if (!dateString) return "";
      return new Date(dateString).toLocaleDateString("id-ID", {
        day: "numeric",
        month: "long",
        year: "numeric"
      });
    };
    const formatCount = (count) => {
      if (count >= 1e6) return `${(count / 1e6).toFixed(1)}M`;
      if (count >= 1e3) return `${(count / 1e3).toFixed(1)}K`;
      return count.toString();
    };
    const seo = computed(() => ({
      title: `${props.category.name} - Artikel Vape & Rokok Elektrik | ${siteName}`,
      description: categoryDescriptions[props.category.slug] || `Baca artikel ${props.category.name} seputar vape dan rokok elektrik di blog Ogitu.`,
      keywords: `${props.category.name.toLowerCase()}, artikel vape, blog vape, ${props.category.slug}, vape indonesia`
    }));
    useHead({
      title: seo.value.title,
      meta: [
        { name: "description", content: seo.value.description },
        { name: "keywords", content: seo.value.keywords },
        { property: "og:title", content: seo.value.title },
        { property: "og:description", content: seo.value.description },
        { property: "og:type", content: "website" },
        { property: "og:url", content: `${siteUrl}/artikel/kategori/${props.category.slug}` }
      ]
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UIcon = _sfc_main$2;
      const _component_UBadge = _sfc_main$3;
      const _component_UCard = _sfc_main$4;
      const _component_UButton = _sfc_main$5;
      const _component_UAvatar = _sfc_main$6;
      const _component_UPagination = _sfc_main$7;
      _push(`<!--[-->`);
      _push(ssrRenderComponent(unref(Head), {
        title: seo.value.title
      }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$1, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<!-- Hero Section --><section class="relative bg-linear-to-br from-gray-900 via-gray-800 to-gray-900 py-16 lg:py-20" data-v-84c2b601${_scopeId}><div class="absolute inset-0 overflow-hidden" data-v-84c2b601${_scopeId}><div class="absolute top-0 right-0 w-1/2 h-full bg-linear-to-l from-primary-500/10 to-transparent" data-v-84c2b601${_scopeId}></div></div><div class="container mx-auto px-4 relative" data-v-84c2b601${_scopeId}><div class="max-w-3xl mx-auto text-center" data-v-84c2b601${_scopeId}><!-- Breadcrumb --><nav class="flex items-center justify-center gap-2 text-sm text-gray-400 mb-6" data-v-84c2b601${_scopeId}><a href="/" class="hover:text-white transition-colors" data-v-84c2b601${_scopeId}>Beranda</a>`);
            _push2(ssrRenderComponent(_component_UIcon, {
              name: "i-lucide-chevron-right",
              class: "w-4 h-4"
            }, null, _parent2, _scopeId));
            _push2(`<a href="/artikel" class="hover:text-white transition-colors" data-v-84c2b601${_scopeId}>Artikel</a>`);
            _push2(ssrRenderComponent(_component_UIcon, {
              name: "i-lucide-chevron-right",
              class: "w-4 h-4"
            }, null, _parent2, _scopeId));
            _push2(`<span class="text-white" data-v-84c2b601${_scopeId}>${ssrInterpolate(__props.category.name)}</span></nav><div class="w-16 h-16 mx-auto mb-4 rounded-2xl bg-primary-500/20 flex items-center justify-center" data-v-84c2b601${_scopeId}>`);
            _push2(ssrRenderComponent(_component_UIcon, {
              name: categoryIcons[__props.category.slug] || "i-lucide-folder",
              class: "w-8 h-8 text-primary-400"
            }, null, _parent2, _scopeId));
            _push2(`</div>`);
            _push2(ssrRenderComponent(_component_UBadge, {
              color: categoryColors[__props.category.slug] || "neutral",
              size: "lg",
              class: "mb-4"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`${ssrInterpolate(__props.articles.meta.total)} Artikel `);
                } else {
                  return [
                    createTextVNode(
                      toDisplayString(__props.articles.meta.total) + " Artikel ",
                      1
                      /* TEXT */
                    )
                  ];
                }
              }),
              _: 1
              /* STABLE */
            }, _parent2, _scopeId));
            _push2(`<h1 class="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4" data-v-84c2b601${_scopeId}>${ssrInterpolate(__props.category.name)}</h1><p class="text-gray-400 text-lg max-w-2xl mx-auto" data-v-84c2b601${_scopeId}>${ssrInterpolate(categoryDescriptions[__props.category.slug] || `Artikel seputar ${__props.category.name}`)}</p></div></div></section><!-- Main Content --><section class="py-12 bg-gray-50 dark:bg-gray-900" data-v-84c2b601${_scopeId}><div class="container mx-auto px-4" data-v-84c2b601${_scopeId}><div class="flex flex-col lg:flex-row gap-8" data-v-84c2b601${_scopeId}><!-- Sidebar --><aside class="lg:w-80 shrink-0 space-y-6 lg:order-2" data-v-84c2b601${_scopeId}><!-- Categories -->`);
            _push2(ssrRenderComponent(_component_UCard, null, {
              header: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="flex items-center gap-2" data-v-84c2b601${_scopeId2}>`);
                  _push3(ssrRenderComponent(_component_UIcon, {
                    name: "i-lucide-folder",
                    class: "w-5 h-5 text-primary-500"
                  }, null, _parent3, _scopeId2));
                  _push3(`<h3 class="font-semibold" data-v-84c2b601${_scopeId2}>Kategori Lain</h3></div>`);
                } else {
                  return [
                    createVNode("div", { class: "flex items-center gap-2" }, [
                      createVNode(_component_UIcon, {
                        name: "i-lucide-folder",
                        class: "w-5 h-5 text-primary-500"
                      }),
                      createVNode("h3", { class: "font-semibold" }, "Kategori Lain")
                    ])
                  ];
                }
              }),
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="space-y-2" data-v-84c2b601${_scopeId2}><!--[-->`);
                  ssrRenderList(__props.categories.filter((c) => c.slug !== __props.category.slug), (cat) => {
                    _push3(`<a${ssrRenderAttr("href", `/artikel/kategori/${cat.slug}`)} class="flex items-center justify-between px-3 py-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors" data-v-84c2b601${_scopeId2}><span class="flex items-center gap-2" data-v-84c2b601${_scopeId2}>`);
                    _push3(ssrRenderComponent(_component_UBadge, {
                      color: categoryColors[cat.slug] || "neutral",
                      size: "xs"
                    }, null, _parent3, _scopeId2));
                    _push3(` ${ssrInterpolate(cat.label)}</span>`);
                    _push3(ssrRenderComponent(_component_UBadge, {
                      color: "neutral",
                      variant: "subtle",
                      size: "xs"
                    }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`${ssrInterpolate(cat.count)}`);
                        } else {
                          return [
                            createTextVNode(
                              toDisplayString(cat.count),
                              1
                              /* TEXT */
                            )
                          ];
                        }
                      }),
                      _: 2
                      /* DYNAMIC */
                    }, _parent3, _scopeId2));
                    _push3(`</a>`);
                  });
                  _push3(`<!--]--></div>`);
                } else {
                  return [
                    createVNode("div", { class: "space-y-2" }, [
                      (openBlock(true), createBlock(
                        Fragment,
                        null,
                        renderList(__props.categories.filter((c) => c.slug !== __props.category.slug), (cat) => {
                          return openBlock(), createBlock("a", {
                            key: cat.slug,
                            href: `/artikel/kategori/${cat.slug}`,
                            class: "flex items-center justify-between px-3 py-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                          }, [
                            createVNode("span", { class: "flex items-center gap-2" }, [
                              createVNode(_component_UBadge, {
                                color: categoryColors[cat.slug] || "neutral",
                                size: "xs"
                              }, null, 8, ["color"]),
                              createTextVNode(
                                " " + toDisplayString(cat.label),
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
                                    toDisplayString(cat.count),
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
            _push2(`<!-- Featured Articles -->`);
            if (__props.featuredArticles.length > 0) {
              _push2(ssrRenderComponent(_component_UCard, null, {
                header: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`<div class="flex items-center gap-2" data-v-84c2b601${_scopeId2}>`);
                    _push3(ssrRenderComponent(_component_UIcon, {
                      name: "i-lucide-star",
                      class: "w-5 h-5 text-yellow-500"
                    }, null, _parent3, _scopeId2));
                    _push3(`<h3 class="font-semibold" data-v-84c2b601${_scopeId2}>Artikel Pilihan</h3></div>`);
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
                    _push3(`<div class="space-y-4" data-v-84c2b601${_scopeId2}><!--[-->`);
                    ssrRenderList(__props.featuredArticles.slice(0, 4), (article) => {
                      _push3(`<a${ssrRenderAttr("href", `/artikel/${article.slug}`)} class="group flex gap-3 p-2 -mx-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors" data-v-84c2b601${_scopeId2}><div class="shrink-0 w-16 h-16 rounded-lg overflow-hidden bg-gray-200 dark:bg-gray-700" data-v-84c2b601${_scopeId2}>`);
                      if (article.thumbnail) {
                        _push3(`<img${ssrRenderAttr("src", article.thumbnail)}${ssrRenderAttr("alt", article.title)} class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" data-v-84c2b601${_scopeId2}>`);
                      } else {
                        _push3(`<div class="w-full h-full flex items-center justify-center" data-v-84c2b601${_scopeId2}>`);
                        _push3(ssrRenderComponent(_component_UIcon, {
                          name: "i-lucide-image",
                          class: "w-6 h-6 text-gray-400"
                        }, null, _parent3, _scopeId2));
                        _push3(`</div>`);
                      }
                      _push3(`</div><div class="flex-1 min-w-0" data-v-84c2b601${_scopeId2}><h4 class="text-sm font-medium text-gray-900 dark:text-white line-clamp-2 group-hover:text-primary-500 transition-colors" data-v-84c2b601${_scopeId2}>${ssrInterpolate(article.title)}</h4><p class="text-xs text-gray-500 mt-1" data-v-84c2b601${_scopeId2}>${ssrInterpolate(article.readTime)} menit baca </p></div></a>`);
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
            _push2(`<!-- Popular Tags -->`);
            if (__props.popularTags.length > 0) {
              _push2(ssrRenderComponent(_component_UCard, null, {
                header: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`<div class="flex items-center gap-2" data-v-84c2b601${_scopeId2}>`);
                    _push3(ssrRenderComponent(_component_UIcon, {
                      name: "i-lucide-tags",
                      class: "w-5 h-5 text-primary-500"
                    }, null, _parent3, _scopeId2));
                    _push3(`<h3 class="font-semibold" data-v-84c2b601${_scopeId2}>Tag Populer</h3></div>`);
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
                    _push3(`<div class="flex flex-wrap gap-2" data-v-84c2b601${_scopeId2}><!--[-->`);
                    ssrRenderList(__props.popularTags.slice(0, 15), (tag) => {
                      _push3(`<a${ssrRenderAttr("href", `/artikel?tag=${encodeURIComponent(tag)}`)} data-v-84c2b601${_scopeId2}>`);
                      _push3(ssrRenderComponent(_component_UBadge, {
                        color: "neutral",
                        variant: "subtle",
                        class: "hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
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
                      _push3(`</a>`);
                    });
                    _push3(`<!--]--></div>`);
                  } else {
                    return [
                      createVNode("div", { class: "flex flex-wrap gap-2" }, [
                        (openBlock(true), createBlock(
                          Fragment,
                          null,
                          renderList(__props.popularTags.slice(0, 15), (tag) => {
                            return openBlock(), createBlock("a", {
                              key: tag,
                              href: `/artikel?tag=${encodeURIComponent(tag)}`
                            }, [
                              createVNode(
                                _component_UBadge,
                                {
                                  color: "neutral",
                                  variant: "subtle",
                                  class: "hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                                },
                                {
                                  default: withCtx(() => [
                                    createTextVNode(
                                      " #" + toDisplayString(tag),
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
            _push2(`<!-- Back to All -->`);
            _push2(ssrRenderComponent(_component_UButton, {
              to: "/artikel",
              color: "neutral",
              variant: "soft",
              block: "",
              size: "lg"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_UIcon, {
                    name: "i-lucide-arrow-left",
                    class: "w-4 h-4 mr-2"
                  }, null, _parent3, _scopeId2));
                  _push3(` Semua Artikel `);
                } else {
                  return [
                    createVNode(_component_UIcon, {
                      name: "i-lucide-arrow-left",
                      class: "w-4 h-4 mr-2"
                    }),
                    createTextVNode(" Semua Artikel ")
                  ];
                }
              }),
              _: 1
              /* STABLE */
            }, _parent2, _scopeId));
            _push2(`</aside><!-- Article List --><div class="flex-1 min-w-0 lg:order-1" data-v-84c2b601${_scopeId}><!-- Loading State -->`);
            if (isLoading.value) {
              _push2(`<div class="grid gap-6 md:grid-cols-2" data-v-84c2b601${_scopeId}><!--[-->`);
              ssrRenderList(6, (i) => {
                _push2(`<div class="bg-white dark:bg-gray-800 rounded-xl p-4 animate-pulse" data-v-84c2b601${_scopeId}><div class="aspect-video bg-gray-200 dark:bg-gray-700 rounded-lg mb-4" data-v-84c2b601${_scopeId}></div><div class="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/4 mb-3" data-v-84c2b601${_scopeId}></div><div class="h-6 bg-gray-200 dark:bg-gray-700 rounded mb-2" data-v-84c2b601${_scopeId}></div><div class="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4" data-v-84c2b601${_scopeId}></div></div>`);
              });
              _push2(`<!--]--></div>`);
            } else if (__props.articles.data.length > 0) {
              _push2(`<!--[--><!-- Article Grid --><div class="grid gap-6 md:grid-cols-2" data-v-84c2b601${_scopeId}><!--[-->`);
              ssrRenderList(__props.articles.data, (article) => {
                _push2(`<a${ssrRenderAttr("href", `/artikel/${article.slug}`)} class="group bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden" data-v-84c2b601${_scopeId}><!-- Thumbnail --><div class="aspect-video relative overflow-hidden bg-gray-100 dark:bg-gray-700" data-v-84c2b601${_scopeId}>`);
                if (article.thumbnail) {
                  _push2(`<img${ssrRenderAttr("src", article.thumbnail)}${ssrRenderAttr("alt", article.title)} class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" data-v-84c2b601${_scopeId}>`);
                } else {
                  _push2(`<div class="w-full h-full flex items-center justify-center" data-v-84c2b601${_scopeId}>`);
                  _push2(ssrRenderComponent(_component_UIcon, {
                    name: "i-lucide-image",
                    class: "w-12 h-12 text-gray-300 dark:text-gray-600"
                  }, null, _parent2, _scopeId));
                  _push2(`</div>`);
                }
                _push2(`</div><!-- Content --><div class="p-5" data-v-84c2b601${_scopeId}><!-- Meta --><div class="flex items-center gap-3 text-xs text-gray-500 dark:text-gray-400 mb-3" data-v-84c2b601${_scopeId}><span class="flex items-center gap-1" data-v-84c2b601${_scopeId}>`);
                _push2(ssrRenderComponent(_component_UIcon, {
                  name: "i-lucide-calendar",
                  class: "w-3.5 h-3.5"
                }, null, _parent2, _scopeId));
                _push2(` ${ssrInterpolate(formatDate(article.publishedAt))}</span><span class="flex items-center gap-1" data-v-84c2b601${_scopeId}>`);
                _push2(ssrRenderComponent(_component_UIcon, {
                  name: "i-lucide-clock",
                  class: "w-3.5 h-3.5"
                }, null, _parent2, _scopeId));
                _push2(` ${ssrInterpolate(article.readTime)} min </span></div><!-- Title --><h2 class="text-lg font-semibold text-gray-900 dark:text-white mb-2 line-clamp-2 group-hover:text-primary-500 transition-colors" data-v-84c2b601${_scopeId}>${ssrInterpolate(article.title)}</h2><!-- Excerpt -->`);
                if (article.excerpt) {
                  _push2(`<p class="text-sm text-gray-600 dark:text-gray-400 line-clamp-2 mb-4" data-v-84c2b601${_scopeId}>${ssrInterpolate(article.excerpt)}</p>`);
                } else {
                  _push2(`<!---->`);
                }
                _push2(`<!-- Footer --><div class="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-gray-700" data-v-84c2b601${_scopeId}><!-- Author -->`);
                if (article.author) {
                  _push2(`<div class="flex items-center gap-2" data-v-84c2b601${_scopeId}>`);
                  _push2(ssrRenderComponent(_component_UAvatar, {
                    src: article.author.avatar,
                    alt: article.author.fullName,
                    size: "xs"
                  }, null, _parent2, _scopeId));
                  _push2(`<span class="text-xs text-gray-600 dark:text-gray-400" data-v-84c2b601${_scopeId}>${ssrInterpolate(article.author.fullName)}</span></div>`);
                } else {
                  _push2(`<!---->`);
                }
                _push2(`<!-- Stats --><div class="flex items-center gap-3 text-xs text-gray-500" data-v-84c2b601${_scopeId}><span class="flex items-center gap-1" data-v-84c2b601${_scopeId}>`);
                _push2(ssrRenderComponent(_component_UIcon, {
                  name: "i-lucide-eye",
                  class: "w-3.5 h-3.5"
                }, null, _parent2, _scopeId));
                _push2(` ${ssrInterpolate(formatCount(article.viewCount))}</span><span class="flex items-center gap-1" data-v-84c2b601${_scopeId}>`);
                _push2(ssrRenderComponent(_component_UIcon, {
                  name: "i-lucide-heart",
                  class: "w-3.5 h-3.5"
                }, null, _parent2, _scopeId));
                _push2(` ${ssrInterpolate(formatCount(article.likeCount))}</span></div></div></div></a>`);
              });
              _push2(`<!--]--></div><!--]-->`);
            } else {
              _push2(`<!--[--><!-- Empty State --><div class="text-center py-16 bg-white dark:bg-gray-800 rounded-xl" data-v-84c2b601${_scopeId}><div class="w-24 h-24 mx-auto mb-6 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center" data-v-84c2b601${_scopeId}>`);
              _push2(ssrRenderComponent(_component_UIcon, {
                name: "i-lucide-file-search",
                class: "w-12 h-12 text-gray-400"
              }, null, _parent2, _scopeId));
              _push2(`</div><h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-2" data-v-84c2b601${_scopeId}> Belum Ada Artikel </h3><p class="text-gray-500 dark:text-gray-400 mb-6 max-w-md mx-auto" data-v-84c2b601${_scopeId}> Belum ada artikel dalam kategori ${ssrInterpolate(__props.category.name)}. Coba lihat kategori lainnya. </p>`);
              _push2(ssrRenderComponent(_component_UButton, {
                color: "primary",
                to: "/artikel"
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`Lihat Semua Artikel`);
                  } else {
                    return [
                      createTextVNode("Lihat Semua Artikel")
                    ];
                  }
                }),
                _: 1
                /* STABLE */
              }, _parent2, _scopeId));
              _push2(`</div><!--]-->`);
            }
            _push2(`<!-- Pagination -->`);
            if (__props.articles.data.length > 0 && __props.articles.meta.lastPage > 1) {
              _push2(`<div class="flex justify-center mt-8" data-v-84c2b601${_scopeId}>`);
              _push2(ssrRenderComponent(_component_UPagination, {
                "model-value": __props.articles.meta.currentPage,
                total: __props.articles.meta.total,
                "page-count": __props.articles.meta.perPage,
                "onUpdate:modelValue": goToPage
              }, null, _parent2, _scopeId));
              _push2(`</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div></div></div></section>`);
          } else {
            return [
              createCommentVNode(" Hero Section "),
              createVNode("section", { class: "relative bg-linear-to-br from-gray-900 via-gray-800 to-gray-900 py-16 lg:py-20" }, [
                createVNode("div", { class: "absolute inset-0 overflow-hidden" }, [
                  createVNode("div", { class: "absolute top-0 right-0 w-1/2 h-full bg-linear-to-l from-primary-500/10 to-transparent" })
                ]),
                createVNode("div", { class: "container mx-auto px-4 relative" }, [
                  createVNode("div", { class: "max-w-3xl mx-auto text-center" }, [
                    createCommentVNode(" Breadcrumb "),
                    createVNode("nav", { class: "flex items-center justify-center gap-2 text-sm text-gray-400 mb-6" }, [
                      createVNode("a", {
                        href: "/",
                        class: "hover:text-white transition-colors"
                      }, "Beranda"),
                      createVNode(_component_UIcon, {
                        name: "i-lucide-chevron-right",
                        class: "w-4 h-4"
                      }),
                      createVNode("a", {
                        href: "/artikel",
                        class: "hover:text-white transition-colors"
                      }, "Artikel"),
                      createVNode(_component_UIcon, {
                        name: "i-lucide-chevron-right",
                        class: "w-4 h-4"
                      }),
                      createVNode(
                        "span",
                        { class: "text-white" },
                        toDisplayString(__props.category.name),
                        1
                        /* TEXT */
                      )
                    ]),
                    createVNode("div", { class: "w-16 h-16 mx-auto mb-4 rounded-2xl bg-primary-500/20 flex items-center justify-center" }, [
                      createVNode(_component_UIcon, {
                        name: categoryIcons[__props.category.slug] || "i-lucide-folder",
                        class: "w-8 h-8 text-primary-400"
                      }, null, 8, ["name"])
                    ]),
                    createVNode(_component_UBadge, {
                      color: categoryColors[__props.category.slug] || "neutral",
                      size: "lg",
                      class: "mb-4"
                    }, {
                      default: withCtx(() => [
                        createTextVNode(
                          toDisplayString(__props.articles.meta.total) + " Artikel ",
                          1
                          /* TEXT */
                        )
                      ]),
                      _: 1
                      /* STABLE */
                    }, 8, ["color"]),
                    createVNode(
                      "h1",
                      { class: "text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4" },
                      toDisplayString(__props.category.name),
                      1
                      /* TEXT */
                    ),
                    createVNode(
                      "p",
                      { class: "text-gray-400 text-lg max-w-2xl mx-auto" },
                      toDisplayString(categoryDescriptions[__props.category.slug] || `Artikel seputar ${__props.category.name}`),
                      1
                      /* TEXT */
                    )
                  ])
                ])
              ]),
              createCommentVNode(" Main Content "),
              createVNode("section", { class: "py-12 bg-gray-50 dark:bg-gray-900" }, [
                createVNode("div", { class: "container mx-auto px-4" }, [
                  createVNode("div", { class: "flex flex-col lg:flex-row gap-8" }, [
                    createCommentVNode(" Sidebar "),
                    createVNode("aside", { class: "lg:w-80 shrink-0 space-y-6 lg:order-2" }, [
                      createCommentVNode(" Categories "),
                      createVNode(_component_UCard, null, {
                        header: withCtx(() => [
                          createVNode("div", { class: "flex items-center gap-2" }, [
                            createVNode(_component_UIcon, {
                              name: "i-lucide-folder",
                              class: "w-5 h-5 text-primary-500"
                            }),
                            createVNode("h3", { class: "font-semibold" }, "Kategori Lain")
                          ])
                        ]),
                        default: withCtx(() => [
                          createVNode("div", { class: "space-y-2" }, [
                            (openBlock(true), createBlock(
                              Fragment,
                              null,
                              renderList(__props.categories.filter((c) => c.slug !== __props.category.slug), (cat) => {
                                return openBlock(), createBlock("a", {
                                  key: cat.slug,
                                  href: `/artikel/kategori/${cat.slug}`,
                                  class: "flex items-center justify-between px-3 py-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                                }, [
                                  createVNode("span", { class: "flex items-center gap-2" }, [
                                    createVNode(_component_UBadge, {
                                      color: categoryColors[cat.slug] || "neutral",
                                      size: "xs"
                                    }, null, 8, ["color"]),
                                    createTextVNode(
                                      " " + toDisplayString(cat.label),
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
                                          toDisplayString(cat.count),
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
                                ], 8, ["href"]);
                              }),
                              128
                              /* KEYED_FRAGMENT */
                            ))
                          ])
                        ]),
                        _: 1
                        /* STABLE */
                      }),
                      createCommentVNode(" Featured Articles "),
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
                      createCommentVNode(" Popular Tags "),
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
                                return openBlock(), createBlock("a", {
                                  key: tag,
                                  href: `/artikel?tag=${encodeURIComponent(tag)}`
                                }, [
                                  createVNode(
                                    _component_UBadge,
                                    {
                                      color: "neutral",
                                      variant: "subtle",
                                      class: "hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                                    },
                                    {
                                      default: withCtx(() => [
                                        createTextVNode(
                                          " #" + toDisplayString(tag),
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
                      createCommentVNode(" Back to All "),
                      createVNode(_component_UButton, {
                        to: "/artikel",
                        color: "neutral",
                        variant: "soft",
                        block: "",
                        size: "lg"
                      }, {
                        default: withCtx(() => [
                          createVNode(_component_UIcon, {
                            name: "i-lucide-arrow-left",
                            class: "w-4 h-4 mr-2"
                          }),
                          createTextVNode(" Semua Artikel ")
                        ]),
                        _: 1
                        /* STABLE */
                      })
                    ]),
                    createCommentVNode(" Article List "),
                    createVNode("div", { class: "flex-1 min-w-0 lg:order-1" }, [
                      createCommentVNode(" Loading State "),
                      isLoading.value ? (openBlock(), createBlock("div", {
                        key: 0,
                        class: "grid gap-6 md:grid-cols-2"
                      }, [
                        (openBlock(), createBlock(
                          Fragment,
                          null,
                          renderList(6, (i) => {
                            return createVNode("div", {
                              key: i,
                              class: "bg-white dark:bg-gray-800 rounded-xl p-4 animate-pulse"
                            }, [
                              createVNode("div", { class: "aspect-video bg-gray-200 dark:bg-gray-700 rounded-lg mb-4" }),
                              createVNode("div", { class: "h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/4 mb-3" }),
                              createVNode("div", { class: "h-6 bg-gray-200 dark:bg-gray-700 rounded mb-2" }),
                              createVNode("div", { class: "h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4" })
                            ]);
                          }),
                          64
                          /* STABLE_FRAGMENT */
                        ))
                      ])) : __props.articles.data.length > 0 ? (openBlock(), createBlock(
                        Fragment,
                        { key: 1 },
                        [
                          createCommentVNode(" Article Grid "),
                          createVNode("div", { class: "grid gap-6 md:grid-cols-2" }, [
                            (openBlock(true), createBlock(
                              Fragment,
                              null,
                              renderList(__props.articles.data, (article) => {
                                return openBlock(), createBlock("a", {
                                  key: article.id,
                                  href: `/artikel/${article.slug}`,
                                  class: "group bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden"
                                }, [
                                  createCommentVNode(" Thumbnail "),
                                  createVNode("div", { class: "aspect-video relative overflow-hidden bg-gray-100 dark:bg-gray-700" }, [
                                    article.thumbnail ? (openBlock(), createBlock("img", {
                                      key: 0,
                                      src: article.thumbnail,
                                      alt: article.title,
                                      class: "w-full h-full object-cover group-hover:scale-105 transition-transform duration-500",
                                      loading: "lazy"
                                    }, null, 8, ["src", "alt"])) : (openBlock(), createBlock("div", {
                                      key: 1,
                                      class: "w-full h-full flex items-center justify-center"
                                    }, [
                                      createVNode(_component_UIcon, {
                                        name: "i-lucide-image",
                                        class: "w-12 h-12 text-gray-300 dark:text-gray-600"
                                      })
                                    ]))
                                  ]),
                                  createCommentVNode(" Content "),
                                  createVNode("div", { class: "p-5" }, [
                                    createCommentVNode(" Meta "),
                                    createVNode("div", { class: "flex items-center gap-3 text-xs text-gray-500 dark:text-gray-400 mb-3" }, [
                                      createVNode("span", { class: "flex items-center gap-1" }, [
                                        createVNode(_component_UIcon, {
                                          name: "i-lucide-calendar",
                                          class: "w-3.5 h-3.5"
                                        }),
                                        createTextVNode(
                                          " " + toDisplayString(formatDate(article.publishedAt)),
                                          1
                                          /* TEXT */
                                        )
                                      ]),
                                      createVNode("span", { class: "flex items-center gap-1" }, [
                                        createVNode(_component_UIcon, {
                                          name: "i-lucide-clock",
                                          class: "w-3.5 h-3.5"
                                        }),
                                        createTextVNode(
                                          " " + toDisplayString(article.readTime) + " min ",
                                          1
                                          /* TEXT */
                                        )
                                      ])
                                    ]),
                                    createCommentVNode(" Title "),
                                    createVNode(
                                      "h2",
                                      { class: "text-lg font-semibold text-gray-900 dark:text-white mb-2 line-clamp-2 group-hover:text-primary-500 transition-colors" },
                                      toDisplayString(article.title),
                                      1
                                      /* TEXT */
                                    ),
                                    createCommentVNode(" Excerpt "),
                                    article.excerpt ? (openBlock(), createBlock(
                                      "p",
                                      {
                                        key: 0,
                                        class: "text-sm text-gray-600 dark:text-gray-400 line-clamp-2 mb-4"
                                      },
                                      toDisplayString(article.excerpt),
                                      1
                                      /* TEXT */
                                    )) : createCommentVNode("v-if", true),
                                    createCommentVNode(" Footer "),
                                    createVNode("div", { class: "flex items-center justify-between pt-4 border-t border-gray-100 dark:border-gray-700" }, [
                                      createCommentVNode(" Author "),
                                      article.author ? (openBlock(), createBlock("div", {
                                        key: 0,
                                        class: "flex items-center gap-2"
                                      }, [
                                        createVNode(_component_UAvatar, {
                                          src: article.author.avatar,
                                          alt: article.author.fullName,
                                          size: "xs"
                                        }, null, 8, ["src", "alt"]),
                                        createVNode(
                                          "span",
                                          { class: "text-xs text-gray-600 dark:text-gray-400" },
                                          toDisplayString(article.author.fullName),
                                          1
                                          /* TEXT */
                                        )
                                      ])) : createCommentVNode("v-if", true),
                                      createCommentVNode(" Stats "),
                                      createVNode("div", { class: "flex items-center gap-3 text-xs text-gray-500" }, [
                                        createVNode("span", { class: "flex items-center gap-1" }, [
                                          createVNode(_component_UIcon, {
                                            name: "i-lucide-eye",
                                            class: "w-3.5 h-3.5"
                                          }),
                                          createTextVNode(
                                            " " + toDisplayString(formatCount(article.viewCount)),
                                            1
                                            /* TEXT */
                                          )
                                        ]),
                                        createVNode("span", { class: "flex items-center gap-1" }, [
                                          createVNode(_component_UIcon, {
                                            name: "i-lucide-heart",
                                            class: "w-3.5 h-3.5"
                                          }),
                                          createTextVNode(
                                            " " + toDisplayString(formatCount(article.likeCount)),
                                            1
                                            /* TEXT */
                                          )
                                        ])
                                      ])
                                    ])
                                  ])
                                ], 8, ["href"]);
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
                        { key: 2 },
                        [
                          createCommentVNode(" Empty State "),
                          createVNode("div", { class: "text-center py-16 bg-white dark:bg-gray-800 rounded-xl" }, [
                            createVNode("div", { class: "w-24 h-24 mx-auto mb-6 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center" }, [
                              createVNode(_component_UIcon, {
                                name: "i-lucide-file-search",
                                class: "w-12 h-12 text-gray-400"
                              })
                            ]),
                            createVNode("h3", { class: "text-xl font-semibold text-gray-900 dark:text-white mb-2" }, " Belum Ada Artikel "),
                            createVNode(
                              "p",
                              { class: "text-gray-500 dark:text-gray-400 mb-6 max-w-md mx-auto" },
                              " Belum ada artikel dalam kategori " + toDisplayString(__props.category.name) + ". Coba lihat kategori lainnya. ",
                              1
                              /* TEXT */
                            ),
                            createVNode(_component_UButton, {
                              color: "primary",
                              to: "/artikel"
                            }, {
                              default: withCtx(() => [
                                createTextVNode("Lihat Semua Artikel")
                              ]),
                              _: 1
                              /* STABLE */
                            })
                          ])
                        ],
                        2112
                        /* STABLE_FRAGMENT, DEV_ROOT_FRAGMENT */
                      )),
                      createCommentVNode(" Pagination "),
                      __props.articles.data.length > 0 && __props.articles.meta.lastPage > 1 ? (openBlock(), createBlock("div", {
                        key: 3,
                        class: "flex justify-center mt-8"
                      }, [
                        createVNode(_component_UPagination, {
                          "model-value": __props.articles.meta.currentPage,
                          total: __props.articles.meta.total,
                          "page-count": __props.articles.meta.perPage,
                          "onUpdate:modelValue": goToPage
                        }, null, 8, ["model-value", "total", "page-count"])
                      ])) : createCommentVNode("v-if", true)
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
      _push(`<!--]-->`);
    };
  }
});

/* unplugin-vue-components disabled */

const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("inertia/pages/artikel/category.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const category = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-84c2b601"]]);

export { category as default };
