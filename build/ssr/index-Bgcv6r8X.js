import { _ as _sfc_main$8 } from './Switch-eKFRwox7.js';
import { i as _sfc_main$7 } from './Badge-CQlYH3Fo.js';
import { a as _sfc_main$1, _ as _sfc_main$6 } from './Button-BTdvmZ8N.js';
import { _ as _sfc_main$4 } from './Card-h3oZeDee.js';
import { defineComponent, ref, mergeProps, unref, withCtx, createTextVNode, createVNode, createCommentVNode, createBlock, toDisplayString, openBlock, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderList, ssrInterpolate } from 'vue/server-renderer';
import { Link, router } from '@inertiajs/vue3';
import { A as AdminLayout } from './admin-ELJtfEoX.js';
import { _ as _sfc_main$2, a as _sfc_main$3, b as _sfc_main$9, c as _sfc_main$a } from './DeleteConfirmModal-D0QO-xQ8.js';
import { _ as _sfc_main$5 } from './PromotionStatusBadge-Bwh-Yb4e.js';
import 'reka-ui';
import '@vueuse/core';
import './virtual_nuxt-ui-plugins-CrG8Uaxr.js';
import '@unhead/vue/client';
import 'tailwindcss/colors';
import 'hookable';
import 'defu';
import 'ohash/utils';
import '@unhead/vue';
import 'reka-ui/namespaced';
import 'tailwind-variants';
import '@iconify/vue';
import 'ufo';
import './Tooltip-C54KurGy.js';
import './SelectMenu-BqLaY6AT.js';
import './Modal-VctJV7vb.js';

const _sfc_main = /* @__PURE__ */ defineComponent({
  ...{
    layout: AdminLayout
  },
  __name: "index",
  __ssrInlineRender: true,
  props: {
    flashSales: {},
    pagination: {},
    stats: {},
    filters: {}
  },
  setup(__props) {
    const props = __props;
    const selectedStatus = ref(props.filters.status);
    const searchQuery = ref(props.filters.search);
    const isLoading = ref(false);
    const showDeleteModal = ref(false);
    const selectedFlashSale = ref(null);
    const isDeleting = ref(false);
    const applyFilters = () => {
      isLoading.value = true;
      router.get(
        "/admin/promotions/flash-sale",
        {
          status: selectedStatus.value,
          search: searchQuery.value
        },
        {
          preserveState: true,
          preserveScroll: true,
          onFinish: () => {
            isLoading.value = false;
          }
        }
      );
    };
    const goToPage = (page) => {
      isLoading.value = true;
      router.get(
        "/admin/promotions/flash-sale",
        {
          status: selectedStatus.value,
          search: searchQuery.value,
          page
        },
        {
          preserveState: true,
          preserveScroll: true,
          onFinish: () => {
            isLoading.value = false;
          }
        }
      );
    };
    const toggleActive = (flashSale) => {
      router.post(`/admin/promotions/flash-sale/${flashSale.id}/toggle`, {}, {
        preserveScroll: true
      });
    };
    const confirmDelete = (flashSale) => {
      selectedFlashSale.value = flashSale;
      showDeleteModal.value = true;
    };
    const deleteFlashSale = () => {
      if (!selectedFlashSale.value) return;
      isDeleting.value = true;
      router.delete(`/admin/promotions/flash-sale/${selectedFlashSale.value.id}`, {
        preserveScroll: true,
        onFinish: () => {
          isDeleting.value = false;
          showDeleteModal.value = false;
          selectedFlashSale.value = null;
        }
      });
    };
    const formatDate = (dateStr) => {
      return new Date(dateStr).toLocaleDateString("id-ID", {
        day: "numeric",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit"
      });
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UButton = _sfc_main$1;
      const _component_UCard = _sfc_main$4;
      const _component_UIcon = _sfc_main$6;
      const _component_UProgress = _sfc_main$7;
      const _component_USwitch = _sfc_main$8;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "p-6 space-y-6" }, _attrs))}><!-- Header --><div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"><div><h1 class="text-2xl font-bold text-gray-900 dark:text-white">Flash Sale</h1><p class="text-gray-500 dark:text-gray-400"> Kelola flash sale untuk meningkatkan penjualan </p></div>`);
      _push(ssrRenderComponent(unref(Link), { href: "/admin/promotions/flash-sale/create" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_UButton, {
              icon: "i-heroicons-plus",
              color: "primary"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Buat Flash Sale `);
                } else {
                  return [
                    createTextVNode(" Buat Flash Sale ")
                  ];
                }
              }),
              _: 1
              /* STABLE */
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_UButton, {
                icon: "i-heroicons-plus",
                color: "primary"
              }, {
                default: withCtx(() => [
                  createTextVNode(" Buat Flash Sale ")
                ]),
                _: 1
                /* STABLE */
              })
            ];
          }
        }),
        _: 1
        /* STABLE */
      }, _parent));
      _push(`</div><!-- Stats -->`);
      _push(ssrRenderComponent(_sfc_main$2, {
        stats: __props.stats,
        type: "flash-sale"
      }, null, _parent));
      _push(`<!-- Filters -->`);
      _push(ssrRenderComponent(_sfc_main$3, {
        status: selectedStatus.value,
        "onUpdate:status": ($event) => selectedStatus.value = $event,
        search: searchQuery.value,
        "onUpdate:search": ($event) => searchQuery.value = $event,
        onFilter: applyFilters
      }, null, _parent));
      _push(`<!-- Flash Sales Grid -->`);
      if (__props.flashSales.length > 0) {
        _push(`<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"><!--[-->`);
        ssrRenderList(__props.flashSales, (flashSale) => {
          _push(ssrRenderComponent(_component_UCard, {
            key: flashSale.id,
            class: "relative overflow-hidden"
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`<!-- Status Badge --><div class="absolute top-4 right-4 z-10"${_scopeId}>`);
                _push2(ssrRenderComponent(_sfc_main$5, {
                  status: flashSale.status
                }, null, _parent2, _scopeId));
                _push2(`</div><div class="space-y-4"${_scopeId}><!-- Header --><div${_scopeId}><h3 class="font-semibold text-gray-900 dark:text-white pr-20 line-clamp-1"${_scopeId}>${ssrInterpolate(flashSale.name)}</h3>`);
                if (flashSale.description) {
                  _push2(`<p class="text-sm text-gray-500 dark:text-gray-400 line-clamp-2 mt-1"${_scopeId}>${ssrInterpolate(flashSale.description)}</p>`);
                } else {
                  _push2(`<!---->`);
                }
                _push2(`</div><!-- Period --><div class="text-sm"${_scopeId}><div class="flex items-center gap-2 text-gray-600 dark:text-gray-300"${_scopeId}>`);
                _push2(ssrRenderComponent(_component_UIcon, {
                  name: "i-heroicons-calendar",
                  class: "w-4 h-4"
                }, null, _parent2, _scopeId));
                _push2(`<span${_scopeId}>${ssrInterpolate(formatDate(flashSale.startDate))}</span></div><div class="flex items-center gap-2 text-gray-500 dark:text-gray-400 mt-1"${_scopeId}>`);
                _push2(ssrRenderComponent(_component_UIcon, {
                  name: "i-heroicons-arrow-right",
                  class: "w-4 h-4"
                }, null, _parent2, _scopeId));
                _push2(`<span${_scopeId}>${ssrInterpolate(formatDate(flashSale.endDate))}</span></div></div><!-- Progress (for active) -->`);
                if (flashSale.status === "active") {
                  _push2(`<div class="space-y-2"${_scopeId}><div class="flex items-center justify-between text-sm"${_scopeId}><span class="text-gray-500 dark:text-gray-400"${_scopeId}>Progress</span><span class="font-medium text-primary-600 dark:text-primary-400"${_scopeId}>${ssrInterpolate(flashSale.timeRemaining)}</span></div>`);
                  _push2(ssrRenderComponent(_component_UProgress, {
                    value: flashSale.progress,
                    color: "primary",
                    size: "sm"
                  }, null, _parent2, _scopeId));
                  _push2(`</div>`);
                } else {
                  _push2(`<!---->`);
                }
                _push2(`<!-- Stats --><div class="grid grid-cols-2 gap-4 pt-2 border-t border-gray-200 dark:border-gray-700"${_scopeId}><div class="text-center"${_scopeId}><p class="text-2xl font-bold text-gray-900 dark:text-white"${_scopeId}>${ssrInterpolate(flashSale.productCount)}</p><p class="text-xs text-gray-500 dark:text-gray-400"${_scopeId}>Produk</p></div><div class="text-center"${_scopeId}><p class="text-2xl font-bold text-primary-600 dark:text-primary-400"${_scopeId}>${ssrInterpolate(flashSale.totalSold)}</p><p class="text-xs text-gray-500 dark:text-gray-400"${_scopeId}>Terjual</p></div></div><!-- Actions --><div class="flex items-center justify-between pt-2 border-t border-gray-200 dark:border-gray-700"${_scopeId}>`);
                _push2(ssrRenderComponent(_component_USwitch, {
                  "model-value": Boolean(flashSale.isActive),
                  size: "sm",
                  "onUpdate:modelValue": ($event) => toggleActive(flashSale)
                }, null, _parent2, _scopeId));
                _push2(`<div class="flex items-center gap-1"${_scopeId}>`);
                _push2(ssrRenderComponent(unref(Link), {
                  href: `/admin/promotions/flash-sale/${flashSale.id}`
                }, {
                  default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      _push3(ssrRenderComponent(_component_UButton, {
                        icon: "i-heroicons-eye",
                        color: "neutral",
                        variant: "ghost",
                        size: "sm"
                      }, null, _parent3, _scopeId2));
                    } else {
                      return [
                        createVNode(_component_UButton, {
                          icon: "i-heroicons-eye",
                          color: "neutral",
                          variant: "ghost",
                          size: "sm"
                        })
                      ];
                    }
                  }),
                  _: 2
                  /* DYNAMIC */
                }, _parent2, _scopeId));
                _push2(ssrRenderComponent(unref(Link), {
                  href: `/admin/promotions/flash-sale/${flashSale.id}/edit`
                }, {
                  default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      _push3(ssrRenderComponent(_component_UButton, {
                        icon: "i-heroicons-pencil",
                        color: "neutral",
                        variant: "ghost",
                        size: "sm"
                      }, null, _parent3, _scopeId2));
                    } else {
                      return [
                        createVNode(_component_UButton, {
                          icon: "i-heroicons-pencil",
                          color: "neutral",
                          variant: "ghost",
                          size: "sm"
                        })
                      ];
                    }
                  }),
                  _: 2
                  /* DYNAMIC */
                }, _parent2, _scopeId));
                _push2(ssrRenderComponent(_component_UButton, {
                  icon: "i-heroicons-trash",
                  color: "error",
                  variant: "ghost",
                  size: "sm",
                  onClick: ($event) => confirmDelete(flashSale)
                }, null, _parent2, _scopeId));
                _push2(`</div></div></div>`);
              } else {
                return [
                  createCommentVNode(" Status Badge "),
                  createVNode("div", { class: "absolute top-4 right-4 z-10" }, [
                    createVNode(_sfc_main$5, {
                      status: flashSale.status
                    }, null, 8, ["status"])
                  ]),
                  createVNode("div", { class: "space-y-4" }, [
                    createCommentVNode(" Header "),
                    createVNode("div", null, [
                      createVNode(
                        "h3",
                        { class: "font-semibold text-gray-900 dark:text-white pr-20 line-clamp-1" },
                        toDisplayString(flashSale.name),
                        1
                        /* TEXT */
                      ),
                      flashSale.description ? (openBlock(), createBlock(
                        "p",
                        {
                          key: 0,
                          class: "text-sm text-gray-500 dark:text-gray-400 line-clamp-2 mt-1"
                        },
                        toDisplayString(flashSale.description),
                        1
                        /* TEXT */
                      )) : createCommentVNode("v-if", true)
                    ]),
                    createCommentVNode(" Period "),
                    createVNode("div", { class: "text-sm" }, [
                      createVNode("div", { class: "flex items-center gap-2 text-gray-600 dark:text-gray-300" }, [
                        createVNode(_component_UIcon, {
                          name: "i-heroicons-calendar",
                          class: "w-4 h-4"
                        }),
                        createVNode(
                          "span",
                          null,
                          toDisplayString(formatDate(flashSale.startDate)),
                          1
                          /* TEXT */
                        )
                      ]),
                      createVNode("div", { class: "flex items-center gap-2 text-gray-500 dark:text-gray-400 mt-1" }, [
                        createVNode(_component_UIcon, {
                          name: "i-heroicons-arrow-right",
                          class: "w-4 h-4"
                        }),
                        createVNode(
                          "span",
                          null,
                          toDisplayString(formatDate(flashSale.endDate)),
                          1
                          /* TEXT */
                        )
                      ])
                    ]),
                    createCommentVNode(" Progress (for active) "),
                    flashSale.status === "active" ? (openBlock(), createBlock("div", {
                      key: 0,
                      class: "space-y-2"
                    }, [
                      createVNode("div", { class: "flex items-center justify-between text-sm" }, [
                        createVNode("span", { class: "text-gray-500 dark:text-gray-400" }, "Progress"),
                        createVNode(
                          "span",
                          { class: "font-medium text-primary-600 dark:text-primary-400" },
                          toDisplayString(flashSale.timeRemaining),
                          1
                          /* TEXT */
                        )
                      ]),
                      createVNode(_component_UProgress, {
                        value: flashSale.progress,
                        color: "primary",
                        size: "sm"
                      }, null, 8, ["value"])
                    ])) : createCommentVNode("v-if", true),
                    createCommentVNode(" Stats "),
                    createVNode("div", { class: "grid grid-cols-2 gap-4 pt-2 border-t border-gray-200 dark:border-gray-700" }, [
                      createVNode("div", { class: "text-center" }, [
                        createVNode(
                          "p",
                          { class: "text-2xl font-bold text-gray-900 dark:text-white" },
                          toDisplayString(flashSale.productCount),
                          1
                          /* TEXT */
                        ),
                        createVNode("p", { class: "text-xs text-gray-500 dark:text-gray-400" }, "Produk")
                      ]),
                      createVNode("div", { class: "text-center" }, [
                        createVNode(
                          "p",
                          { class: "text-2xl font-bold text-primary-600 dark:text-primary-400" },
                          toDisplayString(flashSale.totalSold),
                          1
                          /* TEXT */
                        ),
                        createVNode("p", { class: "text-xs text-gray-500 dark:text-gray-400" }, "Terjual")
                      ])
                    ]),
                    createCommentVNode(" Actions "),
                    createVNode("div", { class: "flex items-center justify-between pt-2 border-t border-gray-200 dark:border-gray-700" }, [
                      createVNode(_component_USwitch, {
                        "model-value": Boolean(flashSale.isActive),
                        size: "sm",
                        "onUpdate:modelValue": ($event) => toggleActive(flashSale)
                      }, null, 8, ["model-value", "onUpdate:modelValue"]),
                      createVNode("div", { class: "flex items-center gap-1" }, [
                        createVNode(unref(Link), {
                          href: `/admin/promotions/flash-sale/${flashSale.id}`
                        }, {
                          default: withCtx(() => [
                            createVNode(_component_UButton, {
                              icon: "i-heroicons-eye",
                              color: "neutral",
                              variant: "ghost",
                              size: "sm"
                            })
                          ]),
                          _: 1
                          /* STABLE */
                        }, 8, ["href"]),
                        createVNode(unref(Link), {
                          href: `/admin/promotions/flash-sale/${flashSale.id}/edit`
                        }, {
                          default: withCtx(() => [
                            createVNode(_component_UButton, {
                              icon: "i-heroicons-pencil",
                              color: "neutral",
                              variant: "ghost",
                              size: "sm"
                            })
                          ]),
                          _: 1
                          /* STABLE */
                        }, 8, ["href"]),
                        createVNode(_component_UButton, {
                          icon: "i-heroicons-trash",
                          color: "error",
                          variant: "ghost",
                          size: "sm",
                          onClick: ($event) => confirmDelete(flashSale)
                        }, null, 8, ["onClick"])
                      ])
                    ])
                  ])
                ];
              }
            }),
            _: 2
            /* DYNAMIC */
          }, _parent));
        });
        _push(`<!--]--></div>`);
      } else {
        _push(`<!--[--><!-- Empty State -->`);
        _push(ssrRenderComponent(_component_UCard, null, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<div class="text-center py-12"${_scopeId}>`);
              _push2(ssrRenderComponent(_component_UIcon, {
                name: "i-heroicons-bolt",
                class: "w-12 h-12 text-gray-300 dark:text-gray-600 mx-auto mb-4"
              }, null, _parent2, _scopeId));
              _push2(`<p class="text-gray-500 dark:text-gray-400 mb-4"${_scopeId}>Belum ada flash sale</p>`);
              _push2(ssrRenderComponent(unref(Link), { href: "/admin/promotions/flash-sale/create" }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(_component_UButton, {
                      icon: "i-heroicons-plus",
                      color: "primary",
                      variant: "soft"
                    }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(` Buat Flash Sale Pertama `);
                        } else {
                          return [
                            createTextVNode(" Buat Flash Sale Pertama ")
                          ];
                        }
                      }),
                      _: 1
                      /* STABLE */
                    }, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(_component_UButton, {
                        icon: "i-heroicons-plus",
                        color: "primary",
                        variant: "soft"
                      }, {
                        default: withCtx(() => [
                          createTextVNode(" Buat Flash Sale Pertama ")
                        ]),
                        _: 1
                        /* STABLE */
                      })
                    ];
                  }
                }),
                _: 1
                /* STABLE */
              }, _parent2, _scopeId));
              _push2(`</div>`);
            } else {
              return [
                createVNode("div", { class: "text-center py-12" }, [
                  createVNode(_component_UIcon, {
                    name: "i-heroicons-bolt",
                    class: "w-12 h-12 text-gray-300 dark:text-gray-600 mx-auto mb-4"
                  }),
                  createVNode("p", { class: "text-gray-500 dark:text-gray-400 mb-4" }, "Belum ada flash sale"),
                  createVNode(unref(Link), { href: "/admin/promotions/flash-sale/create" }, {
                    default: withCtx(() => [
                      createVNode(_component_UButton, {
                        icon: "i-heroicons-plus",
                        color: "primary",
                        variant: "soft"
                      }, {
                        default: withCtx(() => [
                          createTextVNode(" Buat Flash Sale Pertama ")
                        ]),
                        _: 1
                        /* STABLE */
                      })
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
        }, _parent));
        _push(`<!--]-->`);
      }
      _push(`<!-- Pagination -->`);
      if (__props.flashSales.length > 0) {
        _push(`<div>`);
        _push(ssrRenderComponent(_sfc_main$9, {
          "current-page": __props.pagination.currentPage,
          "last-page": __props.pagination.lastPage,
          total: __props.pagination.total,
          "per-page": __props.pagination.perPage,
          onPageChange: goToPage
        }, null, _parent));
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<!-- Delete Modal -->`);
      _push(ssrRenderComponent(_sfc_main$a, {
        show: showDeleteModal.value,
        title: "Hapus Flash Sale",
        message: `Apakah Anda yakin ingin menghapus flash sale '${selectedFlashSale.value?.name}'? Tindakan ini tidak dapat dibatalkan.`,
        loading: isDeleting.value,
        onClose: ($event) => showDeleteModal.value = false,
        onConfirm: deleteFlashSale
      }, null, _parent));
      _push(`</div>`);
    };
  }
});

const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("inertia/pages/admin/promotions/flash-sale/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
