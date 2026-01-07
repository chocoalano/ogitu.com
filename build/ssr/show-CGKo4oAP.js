import { _ as _sfc_main$7, b as _sfc_main$b, a as _sfc_main$c } from './Button-BBveOjhJ.js';
import { b as _export_sfc, a as _sfc_main$8, u as useToast } from './Badge-DaOjA2YD.js';
import { defineComponent, mergeProps, withCtx, createVNode, createBlock, openBlock, Fragment, renderList, toDisplayString, useSSRContext, unref, createTextVNode, computed, ref, onMounted, onUnmounted, createCommentVNode } from 'vue';
import { ssrRenderComponent, ssrRenderList, ssrRenderClass, ssrInterpolate, ssrRenderAttr, ssrRenderAttrs } from 'vue/server-renderer';
import { Head } from '@inertiajs/vue3';
import { _ as _sfc_main$a } from './default-ChIG0McX.js';
import { B as BlockRenderer } from './BlockRenderer-CnNUonue.js';
import { _ as _sfc_main$6 } from './Card-Ci6a5H8H.js';
import { a as formatCount, C as CATEGORY_COLORS } from './article-waySavyG.js';
import { _ as _sfc_main$9 } from './Tooltip-N44Fzd4m.js';
import { useShare } from '@vueuse/core';
import { useHead } from '@unhead/vue';
import 'defu';
import 'reka-ui';
import './virtual_nuxt-ui-plugins-BqI2j5ZJ.js';
import '@unhead/vue/client';
import 'tailwindcss/colors';
import 'hookable';
import 'ohash/utils';
import 'tailwind-variants';
import '@iconify/vue';
import 'ufo';
import 'reka-ui/namespaced';
import './Modal-lw8uQ47S.js';
import 'vaul-vue';
import './DropdownMenu-DnaZdPLR.js';
import './Checkbox-9gbT5PLz.js';
import './Alert-D5zWQYXW.js';

const _sfc_main$5 = /* @__PURE__ */ defineComponent({
  __name: "TableOfContents",
  __ssrInlineRender: true,
  props: {
    items: {},
    activeId: {}
  },
  emits: ["scrollTo"],
  setup(__props, { emit: __emit }) {
    const emit = __emit;
    const getHeadingClass = (heading, activeId) => {
      const baseClass = heading.level === 3 ? "pl-4" : "";
      const activeClass = activeId === heading.id ? "text-primary-500 font-medium" : "text-gray-600 dark:text-gray-400 hover:text-primary-500";
      return `${baseClass} ${activeClass}`.trim();
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UCard = _sfc_main$6;
      const _component_UIcon = _sfc_main$7;
      _push(ssrRenderComponent(_component_UCard, mergeProps({ class: "sticky top-24" }, _attrs), {
        header: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="flex items-center gap-2"${_scopeId}>`);
            _push2(ssrRenderComponent(_component_UIcon, {
              name: "i-lucide-list",
              class: "w-5 h-5 text-primary-500"
            }, null, _parent2, _scopeId));
            _push2(`<h3 class="font-semibold"${_scopeId}>Daftar Isi</h3></div>`);
          } else {
            return [
              createVNode("div", { class: "flex items-center gap-2" }, [
                createVNode(_component_UIcon, {
                  name: "i-lucide-list",
                  class: "w-5 h-5 text-primary-500"
                }),
                createVNode("h3", { class: "font-semibold" }, "Daftar Isi")
              ])
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<nav class="space-y-2"${_scopeId}><!--[-->`);
            ssrRenderList(__props.items, (heading) => {
              _push2(`<button class="${ssrRenderClass([getHeadingClass(heading, __props.activeId), "block w-full text-left text-sm transition-colors"])}"${_scopeId}>${ssrInterpolate(heading.text)}</button>`);
            });
            _push2(`<!--]--></nav>`);
          } else {
            return [
              createVNode("nav", { class: "space-y-2" }, [
                (openBlock(true), createBlock(
                  Fragment,
                  null,
                  renderList(__props.items, (heading) => {
                    return openBlock(), createBlock("button", {
                      key: heading.id,
                      class: ["block w-full text-left text-sm transition-colors", getHeadingClass(heading, __props.activeId)],
                      onClick: ($event) => emit("scrollTo", heading.id)
                    }, toDisplayString(heading.text), 11, ["onClick"]);
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
      }, _parent));
    };
  }
});

const _sfc_setup$5 = _sfc_main$5.setup;
_sfc_main$5.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("inertia/components/article/TableOfContents.vue");
  return _sfc_setup$5 ? _sfc_setup$5(props, ctx) : void 0;
};

const _sfc_main$4 = /* @__PURE__ */ defineComponent({
  __name: "PopularArticlesSidebar",
  __ssrInlineRender: true,
  props: {
    articles: {}
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UCard = _sfc_main$6;
      const _component_UIcon = _sfc_main$7;
      _push(ssrRenderComponent(_component_UCard, _attrs, {
        header: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="flex items-center gap-2" data-v-dc305d34${_scopeId}>`);
            _push2(ssrRenderComponent(_component_UIcon, {
              name: "i-lucide-trending-up",
              class: "w-5 h-5 text-primary-500"
            }, null, _parent2, _scopeId));
            _push2(`<h3 class="font-semibold" data-v-dc305d34${_scopeId}>Artikel Populer</h3></div>`);
          } else {
            return [
              createVNode("div", { class: "flex items-center gap-2" }, [
                createVNode(_component_UIcon, {
                  name: "i-lucide-trending-up",
                  class: "w-5 h-5 text-primary-500"
                }),
                createVNode("h3", { class: "font-semibold" }, "Artikel Populer")
              ])
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="space-y-4" data-v-dc305d34${_scopeId}><!--[-->`);
            ssrRenderList(__props.articles.slice(0, 5), (article, index) => {
              _push2(`<a${ssrRenderAttr("href", `/artikel/${article.slug}`)} class="group flex gap-3 p-2 -mx-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors" data-v-dc305d34${_scopeId}><span class="shrink-0 w-8 h-8 rounded-full bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 flex items-center justify-center font-bold text-sm" data-v-dc305d34${_scopeId}>${ssrInterpolate(index + 1)}</span><div class="flex-1 min-w-0" data-v-dc305d34${_scopeId}><h4 class="text-sm font-medium text-gray-900 dark:text-white line-clamp-2 group-hover:text-primary-500 transition-colors" data-v-dc305d34${_scopeId}>${ssrInterpolate(article.title)}</h4><p class="text-xs text-gray-500 mt-1" data-v-dc305d34${_scopeId}>${ssrInterpolate(unref(formatCount)(article.viewCount))} views </p></div></a>`);
            });
            _push2(`<!--]--></div>`);
          } else {
            return [
              createVNode("div", { class: "space-y-4" }, [
                (openBlock(true), createBlock(
                  Fragment,
                  null,
                  renderList(__props.articles.slice(0, 5), (article, index) => {
                    return openBlock(), createBlock("a", {
                      key: article.id,
                      href: `/artikel/${article.slug}`,
                      class: "group flex gap-3 p-2 -mx-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                    }, [
                      createVNode(
                        "span",
                        { class: "shrink-0 w-8 h-8 rounded-full bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 flex items-center justify-center font-bold text-sm" },
                        toDisplayString(index + 1),
                        1
                        /* TEXT */
                      ),
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
                          toDisplayString(unref(formatCount)(article.viewCount)) + " views ",
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
      }, _parent));
    };
  }
});

/* unplugin-vue-components disabled */

const _sfc_setup$4 = _sfc_main$4.setup;
_sfc_main$4.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("inertia/components/article/PopularArticlesSidebar.vue");
  return _sfc_setup$4 ? _sfc_setup$4(props, ctx) : void 0;
};
const PopularArticlesSidebar = /* @__PURE__ */ _export_sfc(_sfc_main$4, [["__scopeId", "data-v-dc305d34"]]);

const _sfc_main$3 = /* @__PURE__ */ defineComponent({
  __name: "CategoriesSidebar",
  __ssrInlineRender: true,
  props: {
    categories: {}
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UCard = _sfc_main$6;
      const _component_UIcon = _sfc_main$7;
      const _component_UBadge = _sfc_main$8;
      _push(ssrRenderComponent(_component_UCard, _attrs, {
        header: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="flex items-center gap-2"${_scopeId}>`);
            _push2(ssrRenderComponent(_component_UIcon, {
              name: "i-lucide-folder",
              class: "w-5 h-5 text-primary-500"
            }, null, _parent2, _scopeId));
            _push2(`<h3 class="font-semibold"${_scopeId}>Kategori</h3></div>`);
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
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="space-y-2"${_scopeId}><!--[-->`);
            ssrRenderList(__props.categories, (category) => {
              _push2(`<a${ssrRenderAttr("href", `/artikel/kategori/${category.slug}`)} class="flex items-center justify-between px-3 py-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"${_scopeId}><span class="flex items-center gap-2"${_scopeId}>`);
              _push2(ssrRenderComponent(_component_UBadge, {
                color: unref(CATEGORY_COLORS)[category.slug] || "neutral",
                size: "xs"
              }, null, _parent2, _scopeId));
              _push2(` ${ssrInterpolate(category.label)}</span>`);
              _push2(ssrRenderComponent(_component_UBadge, {
                color: "neutral",
                variant: "subtle",
                size: "xs"
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`${ssrInterpolate(category.count)}`);
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
              }, _parent2, _scopeId));
              _push2(`</a>`);
            });
            _push2(`<!--]--></div>`);
          } else {
            return [
              createVNode("div", { class: "space-y-2" }, [
                (openBlock(true), createBlock(
                  Fragment,
                  null,
                  renderList(__props.categories, (category) => {
                    return openBlock(), createBlock("a", {
                      key: category.slug,
                      href: `/artikel/kategori/${category.slug}`,
                      class: "flex items-center justify-between px-3 py-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
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
      }, _parent));
    };
  }
});

const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("inertia/components/article/CategoriesSidebar.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};

const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "RelatedArticles",
  __ssrInlineRender: true,
  props: {
    articles: {}
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UIcon = _sfc_main$7;
      const _component_UBadge = _sfc_main$8;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "grid gap-6 md:grid-cols-2" }, _attrs))} data-v-637b9f30><!--[-->`);
      ssrRenderList(__props.articles, (article) => {
        _push(`<a${ssrRenderAttr("href", `/artikel/${article.slug}`)} class="group bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-lg transition-all overflow-hidden" data-v-637b9f30><div class="aspect-video overflow-hidden bg-gray-100 dark:bg-gray-700" data-v-637b9f30>`);
        if (article.thumbnail) {
          _push(`<img${ssrRenderAttr("src", article.thumbnail)}${ssrRenderAttr("alt", article.title)} class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" data-v-637b9f30>`);
        } else {
          _push(`<div class="w-full h-full flex items-center justify-center" data-v-637b9f30>`);
          _push(ssrRenderComponent(_component_UIcon, {
            name: "i-lucide-image",
            class: "w-10 h-10 text-gray-300"
          }, null, _parent));
          _push(`</div>`);
        }
        _push(`</div><div class="p-4" data-v-637b9f30>`);
        _push(ssrRenderComponent(_component_UBadge, {
          color: unref(CATEGORY_COLORS)[article.category] || "neutral",
          size: "xs",
          class: "mb-2"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`${ssrInterpolate(article.categoryLabel)}`);
            } else {
              return [
                createTextVNode(
                  toDisplayString(article.categoryLabel),
                  1
                  /* TEXT */
                )
              ];
            }
          }),
          _: 2
          /* DYNAMIC */
        }, _parent));
        _push(`<h3 class="font-semibold text-gray-900 dark:text-white line-clamp-2 group-hover:text-primary-500 transition-colors" data-v-637b9f30>${ssrInterpolate(article.title)}</h3><p class="text-sm text-gray-500 mt-2" data-v-637b9f30>${ssrInterpolate(article.readTime)} menit baca </p></div></a>`);
      });
      _push(`<!--]--></div>`);
    };
  }
});

/* unplugin-vue-components disabled */

const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("inertia/components/article/RelatedArticles.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const RelatedArticles = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["__scopeId", "data-v-637b9f30"]]);

const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "SocialShareButtons",
  __ssrInlineRender: true,
  props: {
    urls: {}
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UTooltip = _sfc_main$9;
      const _component_UIcon = _sfc_main$7;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "flex items-center gap-2" }, _attrs))}><span class="text-sm text-gray-500 mr-2">Bagikan ke:</span>`);
      _push(ssrRenderComponent(_component_UTooltip, { text: "Facebook" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<a${ssrRenderAttr("href", __props.urls.facebook)} target="_blank" rel="noopener noreferrer" class="w-9 h-9 rounded-full bg-blue-600 hover:bg-blue-700 flex items-center justify-center text-white transition-colors"${_scopeId}>`);
            _push2(ssrRenderComponent(_component_UIcon, {
              name: "i-lucide-facebook",
              class: "w-4 h-4"
            }, null, _parent2, _scopeId));
            _push2(`</a>`);
          } else {
            return [
              createVNode("a", {
                href: __props.urls.facebook,
                target: "_blank",
                rel: "noopener noreferrer",
                class: "w-9 h-9 rounded-full bg-blue-600 hover:bg-blue-700 flex items-center justify-center text-white transition-colors"
              }, [
                createVNode(_component_UIcon, {
                  name: "i-lucide-facebook",
                  class: "w-4 h-4"
                })
              ], 8, ["href"])
            ];
          }
        }),
        _: 1
        /* STABLE */
      }, _parent));
      _push(ssrRenderComponent(_component_UTooltip, { text: "Twitter" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<a${ssrRenderAttr("href", __props.urls.twitter)} target="_blank" rel="noopener noreferrer" class="w-9 h-9 rounded-full bg-sky-500 hover:bg-sky-600 flex items-center justify-center text-white transition-colors"${_scopeId}>`);
            _push2(ssrRenderComponent(_component_UIcon, {
              name: "i-lucide-twitter",
              class: "w-4 h-4"
            }, null, _parent2, _scopeId));
            _push2(`</a>`);
          } else {
            return [
              createVNode("a", {
                href: __props.urls.twitter,
                target: "_blank",
                rel: "noopener noreferrer",
                class: "w-9 h-9 rounded-full bg-sky-500 hover:bg-sky-600 flex items-center justify-center text-white transition-colors"
              }, [
                createVNode(_component_UIcon, {
                  name: "i-lucide-twitter",
                  class: "w-4 h-4"
                })
              ], 8, ["href"])
            ];
          }
        }),
        _: 1
        /* STABLE */
      }, _parent));
      _push(ssrRenderComponent(_component_UTooltip, { text: "WhatsApp" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<a${ssrRenderAttr("href", __props.urls.whatsapp)} target="_blank" rel="noopener noreferrer" class="w-9 h-9 rounded-full bg-green-500 hover:bg-green-600 flex items-center justify-center text-white transition-colors"${_scopeId}>`);
            _push2(ssrRenderComponent(_component_UIcon, {
              name: "i-lucide-message-circle",
              class: "w-4 h-4"
            }, null, _parent2, _scopeId));
            _push2(`</a>`);
          } else {
            return [
              createVNode("a", {
                href: __props.urls.whatsapp,
                target: "_blank",
                rel: "noopener noreferrer",
                class: "w-9 h-9 rounded-full bg-green-500 hover:bg-green-600 flex items-center justify-center text-white transition-colors"
              }, [
                createVNode(_component_UIcon, {
                  name: "i-lucide-message-circle",
                  class: "w-4 h-4"
                })
              ], 8, ["href"])
            ];
          }
        }),
        _: 1
        /* STABLE */
      }, _parent));
      _push(ssrRenderComponent(_component_UTooltip, { text: "Telegram" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<a${ssrRenderAttr("href", __props.urls.telegram)} target="_blank" rel="noopener noreferrer" class="w-9 h-9 rounded-full bg-blue-500 hover:bg-blue-600 flex items-center justify-center text-white transition-colors"${_scopeId}>`);
            _push2(ssrRenderComponent(_component_UIcon, {
              name: "i-lucide-send",
              class: "w-4 h-4"
            }, null, _parent2, _scopeId));
            _push2(`</a>`);
          } else {
            return [
              createVNode("a", {
                href: __props.urls.telegram,
                target: "_blank",
                rel: "noopener noreferrer",
                class: "w-9 h-9 rounded-full bg-blue-500 hover:bg-blue-600 flex items-center justify-center text-white transition-colors"
              }, [
                createVNode(_component_UIcon, {
                  name: "i-lucide-send",
                  class: "w-4 h-4"
                })
              ], 8, ["href"])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("inertia/components/article/SocialShareButtons.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};

function useArticleActions(options) {
  const { title, excerpt, slug, initialLikeCount } = options;
  const toast = useToast();
  const { share, isSupported: isShareSupported } = useShare();
  const articleUrl = computed(() => `https://ogitu.com/artikel/${slug}`);
  const shareUrls = computed(() => {
    const url = encodeURIComponent(articleUrl.value);
    const encodedTitle = encodeURIComponent(title);
    const encodedText = encodeURIComponent(excerpt || title);
    return {
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${url}`,
      twitter: `https://twitter.com/intent/tweet?url=${url}&text=${encodedTitle}`,
      whatsapp: `https://api.whatsapp.com/send?text=${encodedTitle}%20${url}`,
      telegram: `https://t.me/share/url?url=${url}&text=${encodedTitle}`,
      linkedin: `https://www.linkedin.com/shareArticle?mini=true&url=${url}&title=${encodedTitle}&summary=${encodedText}`
    };
  });
  const shareArticle = async () => {
    if (isShareSupported.value) {
      try {
        await share({
          title,
          text: excerpt || title,
          url: typeof globalThis.window !== "undefined" ? globalThis.window.location.href : articleUrl.value
        });
      } catch {
      }
    } else {
      await copyLink();
    }
  };
  const copyLink = async () => {
    try {
      const url = typeof globalThis.window !== "undefined" ? globalThis.window.location.href : articleUrl.value;
      if (typeof globalThis.navigator !== "undefined" && globalThis.navigator.clipboard) {
        await globalThis.navigator.clipboard.writeText(url);
        toast.success("Link Disalin", "Link artikel berhasil disalin ke clipboard");
      }
    } catch {
      toast.error("Gagal", "Tidak dapat menyalin link");
    }
  };
  const isLiked = ref(false);
  const localLikeCount = ref(initialLikeCount);
  const toggleLike = () => {
    isLiked.value = !isLiked.value;
    localLikeCount.value += isLiked.value ? 1 : -1;
    toast.success(isLiked.value ? "Disukai!" : "Batal menyukai", "");
  };
  return {
    // Share
    shareUrls,
    shareArticle,
    copyLink,
    isShareSupported,
    // Like
    isLiked,
    localLikeCount,
    toggleLike
  };
}

function useTableOfContents() {
  const activeHeadingId = ref("");
  let observer = null;
  const initObserver = () => {
    if (typeof globalThis.IntersectionObserver === "undefined") return;
    observer = new globalThis.IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            activeHeadingId.value = entry.target.id;
          }
        });
      },
      { rootMargin: "-100px 0px -80% 0px" }
    );
    setTimeout(() => {
      if (typeof globalThis.document === "undefined") return;
      const contentEl = globalThis.document.querySelector(".article-content");
      if (contentEl) {
        const headings = contentEl.querySelectorAll("h1, h2, h3, h4");
        headings.forEach((heading) => {
          if (heading.id) observer?.observe(heading);
        });
      }
    }, 200);
  };
  const scrollToHeading = (id) => {
    if (typeof globalThis.document === "undefined") return;
    const element = globalThis.document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
      activeHeadingId.value = id;
    }
  };
  const getHeadingClass = (heading) => {
    const baseClass = heading.level === 3 ? "pl-4" : "";
    const activeClass = activeHeadingId.value === heading.id ? "text-primary-500 font-medium" : "text-gray-600 dark:text-gray-400 hover:text-primary-500";
    return `${baseClass} ${activeClass}`.trim();
  };
  onMounted(() => {
    initObserver();
  });
  onUnmounted(() => {
    observer?.disconnect();
  });
  return {
    activeHeadingId,
    scrollToHeading,
    getHeadingClass
  };
}

const SITE_URL = "https://ogitu.com";
const SITE_NAME = "Ogitu";
function useArticleSeo(article) {
  const seo = computed(() => ({
    title: article.metaTitle || `${article.title} | ${SITE_NAME}`,
    description: article.metaDescription || article.excerpt || `Baca artikel ${article.title} di blog Ogitu`,
    keywords: article.metaKeywords || article.tags.join(", ") + ", vape, rokok elektrik",
    image: article.banner || article.thumbnail || `${SITE_URL}/images/og-default.jpg`,
    url: `${SITE_URL}/artikel/${article.slug}`
  }));
  const structuredData = computed(() => ({
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": article.title,
    "description": article.excerpt,
    "image": article.banner || article.thumbnail,
    "datePublished": article.publishedAt,
    "author": article.author ? {
      "@type": "Person",
      "name": article.author.fullName
    } : void 0,
    "publisher": {
      "@type": "Organization",
      "name": SITE_NAME,
      "logo": {
        "@type": "ImageObject",
        "url": `${SITE_URL}/images/logo.png`
      }
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": seo.value.url
    }
  }));
  useHead({
    title: seo.value.title,
    meta: [
      { name: "description", content: seo.value.description },
      { name: "keywords", content: seo.value.keywords },
      { property: "og:title", content: seo.value.title },
      { property: "og:description", content: seo.value.description },
      { property: "og:image", content: seo.value.image },
      { property: "og:type", content: "article" },
      { property: "og:url", content: seo.value.url },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: seo.value.title },
      { name: "twitter:description", content: seo.value.description },
      { name: "twitter:image", content: seo.value.image }
    ],
    script: [
      {
        type: "application/ld+json",
        innerHTML: JSON.stringify(structuredData.value)
      }
    ]
  });
  return { seo };
}

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "show",
  __ssrInlineRender: true,
  props: {
    article: {},
    relatedArticles: {},
    popularArticles: {},
    categories: {}
  },
  setup(__props) {
    const props = __props;
    const {
      shareUrls,
      shareArticle,
      copyLink,
      isLiked,
      localLikeCount,
      toggleLike
    } = useArticleActions({
      title: props.article.title,
      excerpt: props.article.excerpt,
      slug: props.article.slug,
      initialLikeCount: props.article.likeCount
    });
    const { activeHeadingId, scrollToHeading } = useTableOfContents();
    const { seo } = useArticleSeo(props.article);
    const tableOfContents = computed(() => props.article.tableOfContents || []);
    const hasTableOfContents = computed(() => tableOfContents.value.length > 0);
    const hasRelatedArticles = computed(() => props.relatedArticles.length > 0);
    const hasPopularArticles = computed(() => props.popularArticles.length > 0);
    const hasTags = computed(() => props.article.tags.length > 0);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UIcon = _sfc_main$7;
      const _component_UBadge = _sfc_main$8;
      const _component_UAvatar = _sfc_main$b;
      const _component_UButton = _sfc_main$c;
      _push(`<!--[-->`);
      _push(ssrRenderComponent(unref(Head), {
        title: unref(seo).title
      }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$a, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<!-- Hero Banner --><section class="relative bg-gray-900" data-v-6a3e8dd0${_scopeId}><!-- Banner Image -->`);
            if (__props.article.banner || __props.article.thumbnail) {
              _push2(`<div class="absolute inset-0 overflow-hidden" data-v-6a3e8dd0${_scopeId}><img${ssrRenderAttr("src", __props.article.banner || __props.article.thumbnail || "")}${ssrRenderAttr("alt", __props.article.title)} class="w-full h-full object-cover opacity-30" data-v-6a3e8dd0${_scopeId}><div class="absolute inset-0 bg-linear-to-t from-gray-900 via-gray-900/80 to-gray-900/60" data-v-6a3e8dd0${_scopeId}></div></div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`<div class="container mx-auto px-4 relative py-16 lg:py-24" data-v-6a3e8dd0${_scopeId}><div class="max-w-7xl mx-auto" data-v-6a3e8dd0${_scopeId}><!-- Breadcrumb --><nav class="flex items-center gap-2 text-sm text-gray-400 mb-6" data-v-6a3e8dd0${_scopeId}><a href="/" class="hover:text-white transition-colors" data-v-6a3e8dd0${_scopeId}>Beranda</a>`);
            _push2(ssrRenderComponent(_component_UIcon, {
              name: "i-lucide-chevron-right",
              class: "w-4 h-4"
            }, null, _parent2, _scopeId));
            _push2(`<a href="/artikel" class="hover:text-white transition-colors" data-v-6a3e8dd0${_scopeId}>Artikel</a>`);
            _push2(ssrRenderComponent(_component_UIcon, {
              name: "i-lucide-chevron-right",
              class: "w-4 h-4"
            }, null, _parent2, _scopeId));
            _push2(`<a${ssrRenderAttr("href", `/artikel/kategori/${__props.article.category}`)} class="hover:text-white transition-colors" data-v-6a3e8dd0${_scopeId}>${ssrInterpolate(__props.article.categoryLabel)}</a></nav><!-- Category Badge -->`);
            _push2(ssrRenderComponent(_component_UBadge, {
              color: unref(CATEGORY_COLORS)[__props.article.category] || "neutral",
              size: "lg",
              class: "mb-4"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`${ssrInterpolate(__props.article.categoryLabel)}`);
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
            }, _parent2, _scopeId));
            _push2(`<!-- Title --><h1 class="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight" data-v-6a3e8dd0${_scopeId}>${ssrInterpolate(__props.article.title)}</h1><!-- Meta Info --><div class="flex flex-wrap items-center gap-4 text-gray-400" data-v-6a3e8dd0${_scopeId}><!-- Author -->`);
            if (__props.article.author) {
              _push2(`<div class="flex items-center gap-2" data-v-6a3e8dd0${_scopeId}>`);
              _push2(ssrRenderComponent(_component_UAvatar, {
                src: __props.article.author.avatar,
                alt: __props.article.author.fullName,
                size: "sm"
              }, null, _parent2, _scopeId));
              _push2(`<span data-v-6a3e8dd0${_scopeId}>${ssrInterpolate(__props.article.author.fullName)}</span></div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`<span class="hidden sm:block" data-v-6a3e8dd0${_scopeId}>•</span><!-- Date --><span class="flex items-center gap-1" data-v-6a3e8dd0${_scopeId}>`);
            _push2(ssrRenderComponent(_component_UIcon, {
              name: "i-lucide-calendar",
              class: "w-4 h-4"
            }, null, _parent2, _scopeId));
            _push2(` ${ssrInterpolate(__props.article.formattedPublishedAt)}</span><span class="hidden sm:block" data-v-6a3e8dd0${_scopeId}>•</span><!-- Read Time --><span class="flex items-center gap-1" data-v-6a3e8dd0${_scopeId}>`);
            _push2(ssrRenderComponent(_component_UIcon, {
              name: "i-lucide-clock",
              class: "w-4 h-4"
            }, null, _parent2, _scopeId));
            _push2(` ${ssrInterpolate(__props.article.readTime)} menit baca </span><span class="hidden sm:block" data-v-6a3e8dd0${_scopeId}>•</span><!-- Views --><span class="flex items-center gap-1" data-v-6a3e8dd0${_scopeId}>`);
            _push2(ssrRenderComponent(_component_UIcon, {
              name: "i-lucide-eye",
              class: "w-4 h-4"
            }, null, _parent2, _scopeId));
            _push2(` ${ssrInterpolate(unref(formatCount)(__props.article.viewCount))} views </span></div></div></div></section><!-- Main Content --><section class="py-12 bg-gray-50 dark:bg-gray-900" data-v-6a3e8dd0${_scopeId}><div class="container mx-auto px-4" data-v-6a3e8dd0${_scopeId}><div class="flex flex-col lg:flex-row gap-8" data-v-6a3e8dd0${_scopeId}><!-- Article Content --><article class="flex-1 min-w-0" data-v-6a3e8dd0${_scopeId}><div class="bg-white dark:bg-gray-800 rounded-2xl shadow-sm overflow-hidden" data-v-6a3e8dd0${_scopeId}><!-- Featured Image (if no banner) -->`);
            if (__props.article.thumbnail && !__props.article.banner) {
              _push2(`<div class="aspect-video overflow-hidden" data-v-6a3e8dd0${_scopeId}><img${ssrRenderAttr("src", __props.article.thumbnail)}${ssrRenderAttr("alt", __props.article.title)} class="w-full h-full object-cover" data-v-6a3e8dd0${_scopeId}></div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`<!-- Content --><div class="p-6 lg:p-10" data-v-6a3e8dd0${_scopeId}><!-- Excerpt -->`);
            if (__props.article.excerpt) {
              _push2(`<p class="text-lg text-gray-600 dark:text-gray-400 italic border-l-4 border-primary-500 pl-4 mb-8" data-v-6a3e8dd0${_scopeId}>${ssrInterpolate(__props.article.excerpt)}</p>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`<!-- Article Body --><div class="article-content prose prose-lg dark:prose-invert max-w-none" data-v-6a3e8dd0${_scopeId}>`);
            _push2(ssrRenderComponent(BlockRenderer, {
              blocks: __props.article.blocks
            }, null, _parent2, _scopeId));
            _push2(`</div><!-- Tags -->`);
            if (hasTags.value) {
              _push2(`<div class="mt-10 pt-6 border-t border-gray-200 dark:border-gray-700" data-v-6a3e8dd0${_scopeId}><h4 class="text-sm font-semibold text-gray-500 dark:text-gray-400 mb-3" data-v-6a3e8dd0${_scopeId}> Tag Artikel: </h4><div class="flex flex-wrap gap-2" data-v-6a3e8dd0${_scopeId}><!--[-->`);
              ssrRenderList(__props.article.tags, (tag) => {
                _push2(`<a${ssrRenderAttr("href", `/artikel?tag=${encodeURIComponent(tag)}`)} class="inline-block" data-v-6a3e8dd0${_scopeId}>`);
                _push2(ssrRenderComponent(_component_UBadge, {
                  color: "neutral",
                  variant: "subtle",
                  class: "hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                }, {
                  default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      _push3(` #${ssrInterpolate(tag)}`);
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
                }, _parent2, _scopeId));
                _push2(`</a>`);
              });
              _push2(`<!--]--></div></div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`<!-- Actions --><div class="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700" data-v-6a3e8dd0${_scopeId}><div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4" data-v-6a3e8dd0${_scopeId}><!-- Like & Share Buttons --><div class="flex items-center gap-4" data-v-6a3e8dd0${_scopeId}>`);
            _push2(ssrRenderComponent(_component_UButton, {
              color: unref(isLiked) ? "error" : "neutral",
              variant: unref(isLiked) ? "soft" : "ghost",
              onClick: unref(toggleLike)
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_UIcon, {
                    name: "i-lucide-heart",
                    class: [[unref(isLiked) ? "text-red-500 fill-current" : ""], "w-5 h-5 mr-1"]
                  }, null, _parent3, _scopeId2));
                  _push3(` ${ssrInterpolate(unref(formatCount)(unref(localLikeCount)))} Suka `);
                } else {
                  return [
                    createVNode(_component_UIcon, {
                      name: "i-lucide-heart",
                      class: [[unref(isLiked) ? "text-red-500 fill-current" : ""], "w-5 h-5 mr-1"]
                    }, null, 8, ["class"]),
                    createTextVNode(
                      " " + toDisplayString(unref(formatCount)(unref(localLikeCount))) + " Suka ",
                      1
                      /* TEXT */
                    )
                  ];
                }
              }),
              _: 1
              /* STABLE */
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_UButton, {
              color: "neutral",
              variant: "ghost",
              onClick: unref(shareArticle)
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_UIcon, {
                    name: "i-lucide-share-2",
                    class: "w-5 h-5 mr-1"
                  }, null, _parent3, _scopeId2));
                  _push3(` Bagikan `);
                } else {
                  return [
                    createVNode(_component_UIcon, {
                      name: "i-lucide-share-2",
                      class: "w-5 h-5 mr-1"
                    }),
                    createTextVNode(" Bagikan ")
                  ];
                }
              }),
              _: 1
              /* STABLE */
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_UButton, {
              color: "neutral",
              variant: "ghost",
              onClick: unref(copyLink)
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_UIcon, {
                    name: "i-lucide-link",
                    class: "w-5 h-5 mr-1"
                  }, null, _parent3, _scopeId2));
                  _push3(` Salin Link `);
                } else {
                  return [
                    createVNode(_component_UIcon, {
                      name: "i-lucide-link",
                      class: "w-5 h-5 mr-1"
                    }),
                    createTextVNode(" Salin Link ")
                  ];
                }
              }),
              _: 1
              /* STABLE */
            }, _parent2, _scopeId));
            _push2(`</div><!-- Social Share -->`);
            _push2(ssrRenderComponent(_sfc_main$1, { urls: unref(shareUrls) }, null, _parent2, _scopeId));
            _push2(`</div></div></div></div><!-- Author Box -->`);
            if (__props.article.author) {
              _push2(`<div class="mt-8 bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-6 lg:p-8" data-v-6a3e8dd0${_scopeId}><div class="flex flex-col sm:flex-row items-center sm:items-start gap-4" data-v-6a3e8dd0${_scopeId}>`);
              _push2(ssrRenderComponent(_component_UAvatar, {
                src: __props.article.author.avatar,
                alt: __props.article.author.fullName,
                size: "xl"
              }, null, _parent2, _scopeId));
              _push2(`<div class="text-center sm:text-left" data-v-6a3e8dd0${_scopeId}><h3 class="text-lg font-semibold text-gray-900 dark:text-white" data-v-6a3e8dd0${_scopeId}>${ssrInterpolate(__props.article.author.fullName)}</h3><p class="text-gray-500 dark:text-gray-400 mt-1" data-v-6a3e8dd0${_scopeId}> Penulis di Ogitu.com </p><p class="text-gray-600 dark:text-gray-300 mt-2" data-v-6a3e8dd0${_scopeId}> Berbagi pengetahuan dan tips seputar vape, rokok elektrik, dan gaya hidup modern. </p></div></div></div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`<!-- Related Articles -->`);
            if (hasRelatedArticles.value) {
              _push2(`<div class="mt-8" data-v-6a3e8dd0${_scopeId}><h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-6" data-v-6a3e8dd0${_scopeId}> Artikel Terkait </h2>`);
              _push2(ssrRenderComponent(RelatedArticles, { articles: __props.relatedArticles }, null, _parent2, _scopeId));
              _push2(`</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</article><!-- Sidebar --><aside class="lg:w-80 shrink-0 space-y-6" data-v-6a3e8dd0${_scopeId}><!-- Table of Contents -->`);
            if (hasTableOfContents.value) {
              _push2(ssrRenderComponent(_sfc_main$5, {
                items: tableOfContents.value,
                "active-id": unref(activeHeadingId),
                onScrollTo: unref(scrollToHeading)
              }, null, _parent2, _scopeId));
            } else {
              _push2(`<!---->`);
            }
            _push2(`<!-- Popular Articles -->`);
            if (hasPopularArticles.value) {
              _push2(ssrRenderComponent(PopularArticlesSidebar, { articles: __props.popularArticles }, null, _parent2, _scopeId));
            } else {
              _push2(`<!---->`);
            }
            _push2(`<!-- Categories -->`);
            _push2(ssrRenderComponent(_sfc_main$3, { categories: __props.categories }, null, _parent2, _scopeId));
            _push2(`<!-- Back to Articles -->`);
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
                  _push3(` Kembali ke Artikel `);
                } else {
                  return [
                    createVNode(_component_UIcon, {
                      name: "i-lucide-arrow-left",
                      class: "w-4 h-4 mr-2"
                    }),
                    createTextVNode(" Kembali ke Artikel ")
                  ];
                }
              }),
              _: 1
              /* STABLE */
            }, _parent2, _scopeId));
            _push2(`</aside></div></div></section>`);
          } else {
            return [
              createCommentVNode(" Hero Banner "),
              createVNode("section", { class: "relative bg-gray-900" }, [
                createCommentVNode(" Banner Image "),
                __props.article.banner || __props.article.thumbnail ? (openBlock(), createBlock("div", {
                  key: 0,
                  class: "absolute inset-0 overflow-hidden"
                }, [
                  createVNode("img", {
                    src: __props.article.banner || __props.article.thumbnail || "",
                    alt: __props.article.title,
                    class: "w-full h-full object-cover opacity-30"
                  }, null, 8, ["src", "alt"]),
                  createVNode("div", { class: "absolute inset-0 bg-linear-to-t from-gray-900 via-gray-900/80 to-gray-900/60" })
                ])) : createCommentVNode("v-if", true),
                createVNode("div", { class: "container mx-auto px-4 relative py-16 lg:py-24" }, [
                  createVNode("div", { class: "max-w-7xl mx-auto" }, [
                    createCommentVNode(" Breadcrumb "),
                    createVNode("nav", { class: "flex items-center gap-2 text-sm text-gray-400 mb-6" }, [
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
                      createVNode("a", {
                        href: `/artikel/kategori/${__props.article.category}`,
                        class: "hover:text-white transition-colors"
                      }, toDisplayString(__props.article.categoryLabel), 9, ["href"])
                    ]),
                    createCommentVNode(" Category Badge "),
                    createVNode(_component_UBadge, {
                      color: unref(CATEGORY_COLORS)[__props.article.category] || "neutral",
                      size: "lg",
                      class: "mb-4"
                    }, {
                      default: withCtx(() => [
                        createTextVNode(
                          toDisplayString(__props.article.categoryLabel),
                          1
                          /* TEXT */
                        )
                      ]),
                      _: 1
                      /* STABLE */
                    }, 8, ["color"]),
                    createCommentVNode(" Title "),
                    createVNode(
                      "h1",
                      { class: "text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight" },
                      toDisplayString(__props.article.title),
                      1
                      /* TEXT */
                    ),
                    createCommentVNode(" Meta Info "),
                    createVNode("div", { class: "flex flex-wrap items-center gap-4 text-gray-400" }, [
                      createCommentVNode(" Author "),
                      __props.article.author ? (openBlock(), createBlock("div", {
                        key: 0,
                        class: "flex items-center gap-2"
                      }, [
                        createVNode(_component_UAvatar, {
                          src: __props.article.author.avatar,
                          alt: __props.article.author.fullName,
                          size: "sm"
                        }, null, 8, ["src", "alt"]),
                        createVNode(
                          "span",
                          null,
                          toDisplayString(__props.article.author.fullName),
                          1
                          /* TEXT */
                        )
                      ])) : createCommentVNode("v-if", true),
                      createVNode("span", { class: "hidden sm:block" }, "•"),
                      createCommentVNode(" Date "),
                      createVNode("span", { class: "flex items-center gap-1" }, [
                        createVNode(_component_UIcon, {
                          name: "i-lucide-calendar",
                          class: "w-4 h-4"
                        }),
                        createTextVNode(
                          " " + toDisplayString(__props.article.formattedPublishedAt),
                          1
                          /* TEXT */
                        )
                      ]),
                      createVNode("span", { class: "hidden sm:block" }, "•"),
                      createCommentVNode(" Read Time "),
                      createVNode("span", { class: "flex items-center gap-1" }, [
                        createVNode(_component_UIcon, {
                          name: "i-lucide-clock",
                          class: "w-4 h-4"
                        }),
                        createTextVNode(
                          " " + toDisplayString(__props.article.readTime) + " menit baca ",
                          1
                          /* TEXT */
                        )
                      ]),
                      createVNode("span", { class: "hidden sm:block" }, "•"),
                      createCommentVNode(" Views "),
                      createVNode("span", { class: "flex items-center gap-1" }, [
                        createVNode(_component_UIcon, {
                          name: "i-lucide-eye",
                          class: "w-4 h-4"
                        }),
                        createTextVNode(
                          " " + toDisplayString(unref(formatCount)(__props.article.viewCount)) + " views ",
                          1
                          /* TEXT */
                        )
                      ])
                    ])
                  ])
                ])
              ]),
              createCommentVNode(" Main Content "),
              createVNode("section", { class: "py-12 bg-gray-50 dark:bg-gray-900" }, [
                createVNode("div", { class: "container mx-auto px-4" }, [
                  createVNode("div", { class: "flex flex-col lg:flex-row gap-8" }, [
                    createCommentVNode(" Article Content "),
                    createVNode("article", { class: "flex-1 min-w-0" }, [
                      createVNode("div", { class: "bg-white dark:bg-gray-800 rounded-2xl shadow-sm overflow-hidden" }, [
                        createCommentVNode(" Featured Image (if no banner) "),
                        __props.article.thumbnail && !__props.article.banner ? (openBlock(), createBlock("div", {
                          key: 0,
                          class: "aspect-video overflow-hidden"
                        }, [
                          createVNode("img", {
                            src: __props.article.thumbnail,
                            alt: __props.article.title,
                            class: "w-full h-full object-cover"
                          }, null, 8, ["src", "alt"])
                        ])) : createCommentVNode("v-if", true),
                        createCommentVNode(" Content "),
                        createVNode("div", { class: "p-6 lg:p-10" }, [
                          createCommentVNode(" Excerpt "),
                          __props.article.excerpt ? (openBlock(), createBlock(
                            "p",
                            {
                              key: 0,
                              class: "text-lg text-gray-600 dark:text-gray-400 italic border-l-4 border-primary-500 pl-4 mb-8"
                            },
                            toDisplayString(__props.article.excerpt),
                            1
                            /* TEXT */
                          )) : createCommentVNode("v-if", true),
                          createCommentVNode(" Article Body "),
                          createVNode("div", { class: "article-content prose prose-lg dark:prose-invert max-w-none" }, [
                            createVNode(BlockRenderer, {
                              blocks: __props.article.blocks
                            }, null, 8, ["blocks"])
                          ]),
                          createCommentVNode(" Tags "),
                          hasTags.value ? (openBlock(), createBlock("div", {
                            key: 1,
                            class: "mt-10 pt-6 border-t border-gray-200 dark:border-gray-700"
                          }, [
                            createVNode("h4", { class: "text-sm font-semibold text-gray-500 dark:text-gray-400 mb-3" }, " Tag Artikel: "),
                            createVNode("div", { class: "flex flex-wrap gap-2" }, [
                              (openBlock(true), createBlock(
                                Fragment,
                                null,
                                renderList(__props.article.tags, (tag) => {
                                  return openBlock(), createBlock("a", {
                                    key: tag,
                                    href: `/artikel?tag=${encodeURIComponent(tag)}`,
                                    class: "inline-block"
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
                          ])) : createCommentVNode("v-if", true),
                          createCommentVNode(" Actions "),
                          createVNode("div", { class: "mt-8 pt-6 border-t border-gray-200 dark:border-gray-700" }, [
                            createVNode("div", { class: "flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4" }, [
                              createCommentVNode(" Like & Share Buttons "),
                              createVNode("div", { class: "flex items-center gap-4" }, [
                                createVNode(_component_UButton, {
                                  color: unref(isLiked) ? "error" : "neutral",
                                  variant: unref(isLiked) ? "soft" : "ghost",
                                  onClick: unref(toggleLike)
                                }, {
                                  default: withCtx(() => [
                                    createVNode(_component_UIcon, {
                                      name: "i-lucide-heart",
                                      class: [[unref(isLiked) ? "text-red-500 fill-current" : ""], "w-5 h-5 mr-1"]
                                    }, null, 8, ["class"]),
                                    createTextVNode(
                                      " " + toDisplayString(unref(formatCount)(unref(localLikeCount))) + " Suka ",
                                      1
                                      /* TEXT */
                                    )
                                  ]),
                                  _: 1
                                  /* STABLE */
                                }, 8, ["color", "variant", "onClick"]),
                                createVNode(_component_UButton, {
                                  color: "neutral",
                                  variant: "ghost",
                                  onClick: unref(shareArticle)
                                }, {
                                  default: withCtx(() => [
                                    createVNode(_component_UIcon, {
                                      name: "i-lucide-share-2",
                                      class: "w-5 h-5 mr-1"
                                    }),
                                    createTextVNode(" Bagikan ")
                                  ]),
                                  _: 1
                                  /* STABLE */
                                }, 8, ["onClick"]),
                                createVNode(_component_UButton, {
                                  color: "neutral",
                                  variant: "ghost",
                                  onClick: unref(copyLink)
                                }, {
                                  default: withCtx(() => [
                                    createVNode(_component_UIcon, {
                                      name: "i-lucide-link",
                                      class: "w-5 h-5 mr-1"
                                    }),
                                    createTextVNode(" Salin Link ")
                                  ]),
                                  _: 1
                                  /* STABLE */
                                }, 8, ["onClick"])
                              ]),
                              createCommentVNode(" Social Share "),
                              createVNode(_sfc_main$1, { urls: unref(shareUrls) }, null, 8, ["urls"])
                            ])
                          ])
                        ])
                      ]),
                      createCommentVNode(" Author Box "),
                      __props.article.author ? (openBlock(), createBlock("div", {
                        key: 0,
                        class: "mt-8 bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-6 lg:p-8"
                      }, [
                        createVNode("div", { class: "flex flex-col sm:flex-row items-center sm:items-start gap-4" }, [
                          createVNode(_component_UAvatar, {
                            src: __props.article.author.avatar,
                            alt: __props.article.author.fullName,
                            size: "xl"
                          }, null, 8, ["src", "alt"]),
                          createVNode("div", { class: "text-center sm:text-left" }, [
                            createVNode(
                              "h3",
                              { class: "text-lg font-semibold text-gray-900 dark:text-white" },
                              toDisplayString(__props.article.author.fullName),
                              1
                              /* TEXT */
                            ),
                            createVNode("p", { class: "text-gray-500 dark:text-gray-400 mt-1" }, " Penulis di Ogitu.com "),
                            createVNode("p", { class: "text-gray-600 dark:text-gray-300 mt-2" }, " Berbagi pengetahuan dan tips seputar vape, rokok elektrik, dan gaya hidup modern. ")
                          ])
                        ])
                      ])) : createCommentVNode("v-if", true),
                      createCommentVNode(" Related Articles "),
                      hasRelatedArticles.value ? (openBlock(), createBlock("div", {
                        key: 1,
                        class: "mt-8"
                      }, [
                        createVNode("h2", { class: "text-2xl font-bold text-gray-900 dark:text-white mb-6" }, " Artikel Terkait "),
                        createVNode(RelatedArticles, { articles: __props.relatedArticles }, null, 8, ["articles"])
                      ])) : createCommentVNode("v-if", true)
                    ]),
                    createCommentVNode(" Sidebar "),
                    createVNode("aside", { class: "lg:w-80 shrink-0 space-y-6" }, [
                      createCommentVNode(" Table of Contents "),
                      hasTableOfContents.value ? (openBlock(), createBlock(_sfc_main$5, {
                        key: 0,
                        items: tableOfContents.value,
                        "active-id": unref(activeHeadingId),
                        onScrollTo: unref(scrollToHeading)
                      }, null, 8, ["items", "active-id", "onScrollTo"])) : createCommentVNode("v-if", true),
                      createCommentVNode(" Popular Articles "),
                      hasPopularArticles.value ? (openBlock(), createBlock(PopularArticlesSidebar, {
                        key: 1,
                        articles: __props.popularArticles
                      }, null, 8, ["articles"])) : createCommentVNode("v-if", true),
                      createCommentVNode(" Categories "),
                      createVNode(_sfc_main$3, { categories: __props.categories }, null, 8, ["categories"]),
                      createCommentVNode(" Back to Articles "),
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
                          createTextVNode(" Kembali ke Artikel ")
                        ]),
                        _: 1
                        /* STABLE */
                      })
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("inertia/pages/artikel/show.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const show = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-6a3e8dd0"]]);

export { show as default };
