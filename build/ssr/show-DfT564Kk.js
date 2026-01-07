import { a as _sfc_main$1, b as _sfc_main$4, _ as _sfc_main$5 } from './Button-BBveOjhJ.js';
import { _ as _sfc_main$3 } from './Card-Ci6a5H8H.js';
import { a as _sfc_main$2 } from './Badge-DaOjA2YD.js';
import { defineComponent, unref, withCtx, createTextVNode, toDisplayString, createVNode, createBlock, createCommentVNode, openBlock, Fragment, renderList, useSSRContext } from 'vue';
import { ssrRenderComponent, ssrInterpolate, ssrRenderAttr, ssrRenderList, ssrRenderClass } from 'vue/server-renderer';
import { Head, router } from '@inertiajs/vue3';
import { A as AdminLayout } from './admin-CGUULoJY.js';
import { B as BlockRenderer } from './BlockRenderer-CnNUonue.js';
import { g as getStatusColor, b as getStatusLabel, e as getCategoryColor } from './admin_article-Cy4gA9-J.js';
import 'defu';
import 'reka-ui';
import './virtual_nuxt-ui-plugins-BqI2j5ZJ.js';
import '@unhead/vue/client';
import 'tailwindcss/colors';
import 'hookable';
import '@vueuse/core';
import 'ohash/utils';
import '@unhead/vue';
import 'tailwind-variants';
import '@iconify/vue';
import 'ufo';
import 'reka-ui/namespaced';
import './Tooltip-N44Fzd4m.js';
import './Alert-D5zWQYXW.js';
import './Checkbox-9gbT5PLz.js';

const _sfc_main = /* @__PURE__ */ defineComponent({
  ...{ layout: AdminLayout },
  __name: "show",
  __ssrInlineRender: true,
  props: {
    article: {}
  },
  setup(__props) {
    const props = __props;
    function formatDate(date) {
      if (!date) return "-";
      return new Date(date).toLocaleDateString("id-ID", {
        day: "numeric",
        month: "long",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit"
      });
    }
    function handleEdit() {
      router.visit(`/admin/articles/${props.article.id}/edit`);
    }
    function handleDelete() {
      if (!confirm(`Apakah Anda yakin ingin menghapus artikel "${props.article.title}"?`)) return;
      router.delete(`/admin/articles/${props.article.id}`);
    }
    function handleToggleStatus() {
      router.patch(`/admin/articles/${props.article.id}/status`);
    }
    function openPublicView() {
      window.open(`/artikel/${props.article.slug}`, "_blank");
    }
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UButton = _sfc_main$1;
      const _component_UBadge = _sfc_main$2;
      const _component_UCard = _sfc_main$3;
      const _component_UAvatar = _sfc_main$4;
      const _component_UIcon = _sfc_main$5;
      _push(`<!--[-->`);
      _push(ssrRenderComponent(unref(Head), {
        title: __props.article.title
      }, null, _parent));
      _push(`<div class="space-y-6"><!-- Header --><div class="flex flex-col gap-4 md:flex-row md:items-start md:justify-between"><div class="flex items-start gap-4">`);
      _push(ssrRenderComponent(_component_UButton, {
        icon: "i-heroicons-arrow-left",
        color: "neutral",
        variant: "ghost",
        to: "/admin/articles"
      }, null, _parent));
      _push(`<div><div class="flex flex-wrap items-center gap-2"><h1 class="text-2xl font-bold text-gray-900 dark:text-white">${ssrInterpolate(__props.article.title)}</h1>`);
      _push(ssrRenderComponent(_component_UBadge, {
        color: unref(getStatusColor)(__props.article.status),
        variant: "soft"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`${ssrInterpolate(unref(getStatusLabel)(__props.article.status))}`);
          } else {
            return [
              createTextVNode(
                toDisplayString(unref(getStatusLabel)(__props.article.status)),
                1
                /* TEXT */
              )
            ];
          }
        }),
        _: 1
        /* STABLE */
      }, _parent));
      if (__props.article.isFeatured) {
        _push(ssrRenderComponent(_component_UBadge, {
          color: "warning",
          variant: "soft"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(` Unggulan `);
            } else {
              return [
                createTextVNode(" Unggulan ")
              ];
            }
          }),
          _: 1
          /* STABLE */
        }, _parent));
      } else {
        _push(`<!---->`);
      }
      if (__props.article.isPinned) {
        _push(ssrRenderComponent(_component_UBadge, {
          color: "info",
          variant: "soft"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(` Disematkan `);
            } else {
              return [
                createTextVNode(" Disematkan ")
              ];
            }
          }),
          _: 1
          /* STABLE */
        }, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(`</div><p class="mt-1 text-sm text-gray-500">${ssrInterpolate(__props.article.slug)}</p></div></div><div class="flex items-center gap-2">`);
      _push(ssrRenderComponent(_component_UButton, {
        color: "neutral",
        variant: "soft",
        icon: "i-heroicons-eye",
        onClick: openPublicView
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` Lihat Publik `);
          } else {
            return [
              createTextVNode(" Lihat Publik ")
            ];
          }
        }),
        _: 1
        /* STABLE */
      }, _parent));
      _push(ssrRenderComponent(_component_UButton, {
        color: __props.article.status === "published" ? "warning" : "success",
        variant: "soft",
        icon: __props.article.status === "published" ? "i-heroicons-archive-box" : "i-heroicons-paper-airplane",
        onClick: handleToggleStatus
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`${ssrInterpolate(__props.article.status === "published" ? "Jadikan Draft" : "Publikasikan")}`);
          } else {
            return [
              createTextVNode(
                toDisplayString(__props.article.status === "published" ? "Jadikan Draft" : "Publikasikan"),
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
        color: "primary",
        icon: "i-heroicons-pencil",
        onClick: handleEdit
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` Edit `);
          } else {
            return [
              createTextVNode(" Edit ")
            ];
          }
        }),
        _: 1
        /* STABLE */
      }, _parent));
      _push(ssrRenderComponent(_component_UButton, {
        color: "error",
        variant: "ghost",
        icon: "i-heroicons-trash",
        onClick: handleDelete
      }, null, _parent));
      _push(`</div></div><div class="grid gap-6 lg:grid-cols-3"><!-- Main Content --><div class="lg:col-span-2 space-y-6"><!-- Banner -->`);
      if (__props.article.banner) {
        _push(ssrRenderComponent(_component_UCard, { class: "overflow-hidden p-0" }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<img${ssrRenderAttr("src", __props.article.banner)}${ssrRenderAttr("alt", __props.article.title)} class="w-full aspect-video object-cover"${_scopeId}>`);
            } else {
              return [
                createVNode("img", {
                  src: __props.article.banner,
                  alt: __props.article.title,
                  class: "w-full aspect-video object-cover"
                }, null, 8, ["src", "alt"])
              ];
            }
          }),
          _: 1
          /* STABLE */
        }, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(`<!-- Article Content -->`);
      _push(ssrRenderComponent(_component_UCard, null, {
        header: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<h3 class="font-semibold"${_scopeId}>Konten Artikel</h3>`);
          } else {
            return [
              createVNode("h3", { class: "font-semibold" }, "Konten Artikel")
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            if (__props.article.excerpt) {
              _push2(`<div class="mb-6 text-lg text-gray-600 dark:text-gray-400 italic border-l-4 border-primary-500 pl-4"${_scopeId}>${ssrInterpolate(__props.article.excerpt)}</div>`);
            } else {
              _push2(`<!---->`);
            }
            if (__props.article.tableOfContents?.length > 0) {
              _push2(`<div class="mb-6 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg"${_scopeId}><h4 class="font-semibold mb-3"${_scopeId}>Daftar Isi</h4><nav${_scopeId}><ul class="space-y-1"${_scopeId}><!--[-->`);
              ssrRenderList(__props.article.tableOfContents, (item) => {
                _push2(`<li class="${ssrRenderClass({ "ml-4": item.level > 2, "ml-8": item.level > 3 })}"${_scopeId}><a${ssrRenderAttr("href", `#${item.id}`)} class="text-sm text-primary-600 hover:underline"${_scopeId}>${ssrInterpolate(item.text)}</a></li>`);
              });
              _push2(`<!--]--></ul></nav></div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`<div class="prose prose-gray dark:prose-invert max-w-none"${_scopeId}>`);
            _push2(ssrRenderComponent(BlockRenderer, {
              blocks: __props.article.blocks
            }, null, _parent2, _scopeId));
            _push2(`</div>`);
          } else {
            return [
              __props.article.excerpt ? (openBlock(), createBlock(
                "div",
                {
                  key: 0,
                  class: "mb-6 text-lg text-gray-600 dark:text-gray-400 italic border-l-4 border-primary-500 pl-4"
                },
                toDisplayString(__props.article.excerpt),
                1
                /* TEXT */
              )) : createCommentVNode("v-if", true),
              __props.article.tableOfContents?.length > 0 ? (openBlock(), createBlock("div", {
                key: 1,
                class: "mb-6 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg"
              }, [
                createVNode("h4", { class: "font-semibold mb-3" }, "Daftar Isi"),
                createVNode("nav", null, [
                  createVNode("ul", { class: "space-y-1" }, [
                    (openBlock(true), createBlock(
                      Fragment,
                      null,
                      renderList(__props.article.tableOfContents, (item) => {
                        return openBlock(), createBlock(
                          "li",
                          {
                            key: item.id,
                            class: { "ml-4": item.level > 2, "ml-8": item.level > 3 }
                          },
                          [
                            createVNode("a", {
                              href: `#${item.id}`,
                              class: "text-sm text-primary-600 hover:underline"
                            }, toDisplayString(item.text), 9, ["href"])
                          ],
                          2
                          /* CLASS */
                        );
                      }),
                      128
                      /* KEYED_FRAGMENT */
                    ))
                  ])
                ])
              ])) : createCommentVNode("v-if", true),
              createVNode("div", { class: "prose prose-gray dark:prose-invert max-w-none" }, [
                createVNode(BlockRenderer, {
                  blocks: __props.article.blocks
                }, null, 8, ["blocks"])
              ])
            ];
          }
        }),
        _: 1
        /* STABLE */
      }, _parent));
      _push(`</div><!-- Sidebar --><div class="space-y-6"><!-- Info Card -->`);
      _push(ssrRenderComponent(_component_UCard, null, {
        header: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<h3 class="font-semibold"${_scopeId}>Informasi Artikel</h3>`);
          } else {
            return [
              createVNode("h3", { class: "font-semibold" }, "Informasi Artikel")
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="space-y-4"${_scopeId}><!-- Author --><div${_scopeId}><p class="text-xs text-gray-500 mb-1"${_scopeId}>Penulis</p>`);
            if (__props.article.author) {
              _push2(`<div class="flex items-center gap-2"${_scopeId}>`);
              _push2(ssrRenderComponent(_component_UAvatar, {
                src: __props.article.author.avatar || void 0,
                alt: __props.article.author.fullName,
                size: "sm"
              }, null, _parent2, _scopeId));
              _push2(`<div${_scopeId}><p class="font-medium text-sm"${_scopeId}>${ssrInterpolate(__props.article.author.fullName)}</p><p class="text-xs text-gray-500"${_scopeId}>${ssrInterpolate(__props.article.author.email)}</p></div></div>`);
            } else {
              _push2(`<p class="text-gray-500"${_scopeId}>-</p>`);
            }
            _push2(`</div><!-- Category --><div${_scopeId}><p class="text-xs text-gray-500 mb-1"${_scopeId}>Kategori</p>`);
            _push2(ssrRenderComponent(_component_UBadge, {
              color: unref(getCategoryColor)(__props.article.category),
              variant: "soft"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`${ssrInterpolate(__props.article.category)}`);
                } else {
                  return [
                    createTextVNode(
                      toDisplayString(__props.article.category),
                      1
                      /* TEXT */
                    )
                  ];
                }
              }),
              _: 1
              /* STABLE */
            }, _parent2, _scopeId));
            _push2(`</div><!-- Tags --><div${_scopeId}><p class="text-xs text-gray-500 mb-1"${_scopeId}>Tags</p>`);
            if (__props.article.tags?.length > 0) {
              _push2(`<div class="flex flex-wrap gap-1"${_scopeId}><!--[-->`);
              ssrRenderList(__props.article.tags, (tag) => {
                _push2(ssrRenderComponent(_component_UBadge, {
                  key: tag,
                  color: "neutral",
                  variant: "soft",
                  size: "xs"
                }, {
                  default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      _push3(`${ssrInterpolate(tag)}`);
                    } else {
                      return [
                        createTextVNode(
                          toDisplayString(tag),
                          1
                          /* TEXT */
                        )
                      ];
                    }
                  }),
                  _: 2
                  /* DYNAMIC */
                }, _parent2, _scopeId));
              });
              _push2(`<!--]--></div>`);
            } else {
              _push2(`<p class="text-gray-500"${_scopeId}>-</p>`);
            }
            _push2(`</div><!-- Dates --><div${_scopeId}><p class="text-xs text-gray-500 mb-1"${_scopeId}>Dibuat</p><p class="text-sm"${_scopeId}>${ssrInterpolate(formatDate(__props.article.createdAt))}</p></div><div${_scopeId}><p class="text-xs text-gray-500 mb-1"${_scopeId}>Terakhir diubah</p><p class="text-sm"${_scopeId}>${ssrInterpolate(formatDate(__props.article.updatedAt))}</p></div>`);
            if (__props.article.publishedAt) {
              _push2(`<div${_scopeId}><p class="text-xs text-gray-500 mb-1"${_scopeId}>Dipublikasikan</p><p class="text-sm"${_scopeId}>${ssrInterpolate(formatDate(__props.article.publishedAt))}</p></div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div>`);
          } else {
            return [
              createVNode("div", { class: "space-y-4" }, [
                createCommentVNode(" Author "),
                createVNode("div", null, [
                  createVNode("p", { class: "text-xs text-gray-500 mb-1" }, "Penulis"),
                  __props.article.author ? (openBlock(), createBlock("div", {
                    key: 0,
                    class: "flex items-center gap-2"
                  }, [
                    createVNode(_component_UAvatar, {
                      src: __props.article.author.avatar || void 0,
                      alt: __props.article.author.fullName,
                      size: "sm"
                    }, null, 8, ["src", "alt"]),
                    createVNode("div", null, [
                      createVNode(
                        "p",
                        { class: "font-medium text-sm" },
                        toDisplayString(__props.article.author.fullName),
                        1
                        /* TEXT */
                      ),
                      createVNode(
                        "p",
                        { class: "text-xs text-gray-500" },
                        toDisplayString(__props.article.author.email),
                        1
                        /* TEXT */
                      )
                    ])
                  ])) : (openBlock(), createBlock("p", {
                    key: 1,
                    class: "text-gray-500"
                  }, "-"))
                ]),
                createCommentVNode(" Category "),
                createVNode("div", null, [
                  createVNode("p", { class: "text-xs text-gray-500 mb-1" }, "Kategori"),
                  createVNode(_component_UBadge, {
                    color: unref(getCategoryColor)(__props.article.category),
                    variant: "soft"
                  }, {
                    default: withCtx(() => [
                      createTextVNode(
                        toDisplayString(__props.article.category),
                        1
                        /* TEXT */
                      )
                    ]),
                    _: 1
                    /* STABLE */
                  }, 8, ["color"])
                ]),
                createCommentVNode(" Tags "),
                createVNode("div", null, [
                  createVNode("p", { class: "text-xs text-gray-500 mb-1" }, "Tags"),
                  __props.article.tags?.length > 0 ? (openBlock(), createBlock("div", {
                    key: 0,
                    class: "flex flex-wrap gap-1"
                  }, [
                    (openBlock(true), createBlock(
                      Fragment,
                      null,
                      renderList(__props.article.tags, (tag) => {
                        return openBlock(), createBlock(
                          _component_UBadge,
                          {
                            key: tag,
                            color: "neutral",
                            variant: "soft",
                            size: "xs"
                          },
                          {
                            default: withCtx(() => [
                              createTextVNode(
                                toDisplayString(tag),
                                1
                                /* TEXT */
                              )
                            ]),
                            _: 2
                            /* DYNAMIC */
                          },
                          1024
                          /* DYNAMIC_SLOTS */
                        );
                      }),
                      128
                      /* KEYED_FRAGMENT */
                    ))
                  ])) : (openBlock(), createBlock("p", {
                    key: 1,
                    class: "text-gray-500"
                  }, "-"))
                ]),
                createCommentVNode(" Dates "),
                createVNode("div", null, [
                  createVNode("p", { class: "text-xs text-gray-500 mb-1" }, "Dibuat"),
                  createVNode(
                    "p",
                    { class: "text-sm" },
                    toDisplayString(formatDate(__props.article.createdAt)),
                    1
                    /* TEXT */
                  )
                ]),
                createVNode("div", null, [
                  createVNode("p", { class: "text-xs text-gray-500 mb-1" }, "Terakhir diubah"),
                  createVNode(
                    "p",
                    { class: "text-sm" },
                    toDisplayString(formatDate(__props.article.updatedAt)),
                    1
                    /* TEXT */
                  )
                ]),
                __props.article.publishedAt ? (openBlock(), createBlock("div", { key: 0 }, [
                  createVNode("p", { class: "text-xs text-gray-500 mb-1" }, "Dipublikasikan"),
                  createVNode(
                    "p",
                    { class: "text-sm" },
                    toDisplayString(formatDate(__props.article.publishedAt)),
                    1
                    /* TEXT */
                  )
                ])) : createCommentVNode("v-if", true)
              ])
            ];
          }
        }),
        _: 1
        /* STABLE */
      }, _parent));
      _push(`<!-- Stats Card -->`);
      _push(ssrRenderComponent(_component_UCard, null, {
        header: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<h3 class="font-semibold"${_scopeId}>Statistik</h3>`);
          } else {
            return [
              createVNode("h3", { class: "font-semibold" }, "Statistik")
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="grid grid-cols-2 gap-4"${_scopeId}><div class="text-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg"${_scopeId}>`);
            _push2(ssrRenderComponent(_component_UIcon, {
              name: "i-heroicons-eye",
              class: "h-5 w-5 mx-auto text-gray-400 mb-1"
            }, null, _parent2, _scopeId));
            _push2(`<p class="text-xl font-bold"${_scopeId}>${ssrInterpolate(__props.article.viewCount.toLocaleString("id-ID"))}</p><p class="text-xs text-gray-500"${_scopeId}>Views</p></div><div class="text-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg"${_scopeId}>`);
            _push2(ssrRenderComponent(_component_UIcon, {
              name: "i-heroicons-heart",
              class: "h-5 w-5 mx-auto text-gray-400 mb-1"
            }, null, _parent2, _scopeId));
            _push2(`<p class="text-xl font-bold"${_scopeId}>${ssrInterpolate(__props.article.likeCount.toLocaleString("id-ID"))}</p><p class="text-xs text-gray-500"${_scopeId}>Likes</p></div><div class="text-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg"${_scopeId}>`);
            _push2(ssrRenderComponent(_component_UIcon, {
              name: "i-heroicons-share",
              class: "h-5 w-5 mx-auto text-gray-400 mb-1"
            }, null, _parent2, _scopeId));
            _push2(`<p class="text-xl font-bold"${_scopeId}>${ssrInterpolate(__props.article.shareCount.toLocaleString("id-ID"))}</p><p class="text-xs text-gray-500"${_scopeId}>Shares</p></div><div class="text-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg"${_scopeId}>`);
            _push2(ssrRenderComponent(_component_UIcon, {
              name: "i-heroicons-clock",
              class: "h-5 w-5 mx-auto text-gray-400 mb-1"
            }, null, _parent2, _scopeId));
            _push2(`<p class="text-xl font-bold"${_scopeId}>${ssrInterpolate(__props.article.readTime)}</p><p class="text-xs text-gray-500"${_scopeId}>Menit baca</p></div></div>`);
          } else {
            return [
              createVNode("div", { class: "grid grid-cols-2 gap-4" }, [
                createVNode("div", { class: "text-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg" }, [
                  createVNode(_component_UIcon, {
                    name: "i-heroicons-eye",
                    class: "h-5 w-5 mx-auto text-gray-400 mb-1"
                  }),
                  createVNode(
                    "p",
                    { class: "text-xl font-bold" },
                    toDisplayString(__props.article.viewCount.toLocaleString("id-ID")),
                    1
                    /* TEXT */
                  ),
                  createVNode("p", { class: "text-xs text-gray-500" }, "Views")
                ]),
                createVNode("div", { class: "text-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg" }, [
                  createVNode(_component_UIcon, {
                    name: "i-heroicons-heart",
                    class: "h-5 w-5 mx-auto text-gray-400 mb-1"
                  }),
                  createVNode(
                    "p",
                    { class: "text-xl font-bold" },
                    toDisplayString(__props.article.likeCount.toLocaleString("id-ID")),
                    1
                    /* TEXT */
                  ),
                  createVNode("p", { class: "text-xs text-gray-500" }, "Likes")
                ]),
                createVNode("div", { class: "text-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg" }, [
                  createVNode(_component_UIcon, {
                    name: "i-heroicons-share",
                    class: "h-5 w-5 mx-auto text-gray-400 mb-1"
                  }),
                  createVNode(
                    "p",
                    { class: "text-xl font-bold" },
                    toDisplayString(__props.article.shareCount.toLocaleString("id-ID")),
                    1
                    /* TEXT */
                  ),
                  createVNode("p", { class: "text-xs text-gray-500" }, "Shares")
                ]),
                createVNode("div", { class: "text-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg" }, [
                  createVNode(_component_UIcon, {
                    name: "i-heroicons-clock",
                    class: "h-5 w-5 mx-auto text-gray-400 mb-1"
                  }),
                  createVNode(
                    "p",
                    { class: "text-xl font-bold" },
                    toDisplayString(__props.article.readTime),
                    1
                    /* TEXT */
                  ),
                  createVNode("p", { class: "text-xs text-gray-500" }, "Menit baca")
                ])
              ])
            ];
          }
        }),
        _: 1
        /* STABLE */
      }, _parent));
      _push(`<!-- SEO Card -->`);
      _push(ssrRenderComponent(_component_UCard, null, {
        header: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<h3 class="font-semibold"${_scopeId}>SEO</h3>`);
          } else {
            return [
              createVNode("h3", { class: "font-semibold" }, "SEO")
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="space-y-3"${_scopeId}><div${_scopeId}><p class="text-xs text-gray-500 mb-1"${_scopeId}>Meta Title</p><p class="text-sm"${_scopeId}>${ssrInterpolate(__props.article.metaTitle || __props.article.title)}</p></div><div${_scopeId}><p class="text-xs text-gray-500 mb-1"${_scopeId}>Meta Description</p><p class="text-sm"${_scopeId}>${ssrInterpolate(__props.article.metaDescription || __props.article.excerpt || "-")}</p></div>`);
            if (__props.article.metaKeywords) {
              _push2(`<div${_scopeId}><p class="text-xs text-gray-500 mb-1"${_scopeId}>Meta Keywords</p><p class="text-sm"${_scopeId}>${ssrInterpolate(__props.article.metaKeywords)}</p></div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div>`);
          } else {
            return [
              createVNode("div", { class: "space-y-3" }, [
                createVNode("div", null, [
                  createVNode("p", { class: "text-xs text-gray-500 mb-1" }, "Meta Title"),
                  createVNode(
                    "p",
                    { class: "text-sm" },
                    toDisplayString(__props.article.metaTitle || __props.article.title),
                    1
                    /* TEXT */
                  )
                ]),
                createVNode("div", null, [
                  createVNode("p", { class: "text-xs text-gray-500 mb-1" }, "Meta Description"),
                  createVNode(
                    "p",
                    { class: "text-sm" },
                    toDisplayString(__props.article.metaDescription || __props.article.excerpt || "-"),
                    1
                    /* TEXT */
                  )
                ]),
                __props.article.metaKeywords ? (openBlock(), createBlock("div", { key: 0 }, [
                  createVNode("p", { class: "text-xs text-gray-500 mb-1" }, "Meta Keywords"),
                  createVNode(
                    "p",
                    { class: "text-sm" },
                    toDisplayString(__props.article.metaKeywords),
                    1
                    /* TEXT */
                  )
                ])) : createCommentVNode("v-if", true)
              ])
            ];
          }
        }),
        _: 1
        /* STABLE */
      }, _parent));
      _push(`<!-- Thumbnail Card -->`);
      if (__props.article.thumbnail) {
        _push(ssrRenderComponent(_component_UCard, null, {
          header: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<h3 class="font-semibold"${_scopeId}>Thumbnail</h3>`);
            } else {
              return [
                createVNode("h3", { class: "font-semibold" }, "Thumbnail")
              ];
            }
          }),
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<img${ssrRenderAttr("src", __props.article.thumbnail)}${ssrRenderAttr("alt", __props.article.title)} class="w-full rounded-lg"${_scopeId}>`);
            } else {
              return [
                createVNode("img", {
                  src: __props.article.thumbnail,
                  alt: __props.article.title,
                  class: "w-full rounded-lg"
                }, null, 8, ["src", "alt"])
              ];
            }
          }),
          _: 1
          /* STABLE */
        }, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div></div><!--]-->`);
    };
  }
});

const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("inertia/pages/admin/articles/show.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
