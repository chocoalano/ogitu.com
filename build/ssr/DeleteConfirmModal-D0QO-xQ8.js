import { _ as _sfc_main$5, a as _sfc_main$7 } from './Button-BTdvmZ8N.js';
import { _ as _sfc_main$4 } from './Card-h3oZeDee.js';
import { defineComponent, mergeProps, withCtx, createVNode, toDisplayString, useSSRContext, ref, watch, createBlock, createCommentVNode, openBlock, createTextVNode, computed } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderList } from 'vue/server-renderer';
import { _ as _sfc_main$8 } from './SelectMenu-BqLaY6AT.js';
import { _ as _sfc_main$6 } from './Badge-CQlYH3Fo.js';
import { _ as _sfc_main$9 } from './Modal-VctJV7vb.js';

const _sfc_main$3 = /* @__PURE__ */ defineComponent({
  __name: "PromotionStatsCards",
  __ssrInlineRender: true,
  props: {
    stats: {},
    type: {}
  },
  setup(__props) {
    const labels = {
      discount: {
        active: "Aktif",
        upcoming: "Akan Datang",
        expired: "Kadaluarsa",
        inactive: "Nonaktif"
      },
      voucher: {
        active: "Aktif",
        upcoming: "Akan Datang",
        expired: "Kadaluarsa",
        inactive: "Nonaktif"
      },
      "flash-sale": {
        active: "Sedang Berlangsung",
        upcoming: "Akan Datang",
        expired: "Berakhir",
        inactive: "Nonaktif"
      }
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UCard = _sfc_main$4;
      const _component_UIcon = _sfc_main$5;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "grid grid-cols-2 lg:grid-cols-5 gap-4" }, _attrs))}>`);
      _push(ssrRenderComponent(_component_UCard, { class: "relative overflow-hidden" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="flex items-center gap-4"${_scopeId}><div class="p-3 rounded-xl bg-gray-100 dark:bg-gray-800"${_scopeId}>`);
            _push2(ssrRenderComponent(_component_UIcon, {
              name: "i-heroicons-tag",
              class: "w-6 h-6 text-gray-600 dark:text-gray-400"
            }, null, _parent2, _scopeId));
            _push2(`</div><div${_scopeId}><p class="text-2xl font-bold text-gray-900 dark:text-white"${_scopeId}>${ssrInterpolate(__props.stats.total)}</p><p class="text-sm text-gray-500 dark:text-gray-400"${_scopeId}>Total</p></div></div>`);
          } else {
            return [
              createVNode("div", { class: "flex items-center gap-4" }, [
                createVNode("div", { class: "p-3 rounded-xl bg-gray-100 dark:bg-gray-800" }, [
                  createVNode(_component_UIcon, {
                    name: "i-heroicons-tag",
                    class: "w-6 h-6 text-gray-600 dark:text-gray-400"
                  })
                ]),
                createVNode("div", null, [
                  createVNode(
                    "p",
                    { class: "text-2xl font-bold text-gray-900 dark:text-white" },
                    toDisplayString(__props.stats.total),
                    1
                    /* TEXT */
                  ),
                  createVNode("p", { class: "text-sm text-gray-500 dark:text-gray-400" }, "Total")
                ])
              ])
            ];
          }
        }),
        _: 1
        /* STABLE */
      }, _parent));
      _push(ssrRenderComponent(_component_UCard, { class: "relative overflow-hidden" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="flex items-center gap-4"${_scopeId}><div class="p-3 rounded-xl bg-green-100 dark:bg-green-900/30"${_scopeId}>`);
            _push2(ssrRenderComponent(_component_UIcon, {
              name: "i-heroicons-check-circle",
              class: "w-6 h-6 text-green-600 dark:text-green-400"
            }, null, _parent2, _scopeId));
            _push2(`</div><div${_scopeId}><p class="text-2xl font-bold text-gray-900 dark:text-white"${_scopeId}>${ssrInterpolate(__props.stats.active)}</p><p class="text-sm text-gray-500 dark:text-gray-400"${_scopeId}>${ssrInterpolate(labels[__props.type].active)}</p></div></div>`);
          } else {
            return [
              createVNode("div", { class: "flex items-center gap-4" }, [
                createVNode("div", { class: "p-3 rounded-xl bg-green-100 dark:bg-green-900/30" }, [
                  createVNode(_component_UIcon, {
                    name: "i-heroicons-check-circle",
                    class: "w-6 h-6 text-green-600 dark:text-green-400"
                  })
                ]),
                createVNode("div", null, [
                  createVNode(
                    "p",
                    { class: "text-2xl font-bold text-gray-900 dark:text-white" },
                    toDisplayString(__props.stats.active),
                    1
                    /* TEXT */
                  ),
                  createVNode(
                    "p",
                    { class: "text-sm text-gray-500 dark:text-gray-400" },
                    toDisplayString(labels[__props.type].active),
                    1
                    /* TEXT */
                  )
                ])
              ])
            ];
          }
        }),
        _: 1
        /* STABLE */
      }, _parent));
      _push(ssrRenderComponent(_component_UCard, { class: "relative overflow-hidden" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="flex items-center gap-4"${_scopeId}><div class="p-3 rounded-xl bg-blue-100 dark:bg-blue-900/30"${_scopeId}>`);
            _push2(ssrRenderComponent(_component_UIcon, {
              name: "i-heroicons-clock",
              class: "w-6 h-6 text-blue-600 dark:text-blue-400"
            }, null, _parent2, _scopeId));
            _push2(`</div><div${_scopeId}><p class="text-2xl font-bold text-gray-900 dark:text-white"${_scopeId}>${ssrInterpolate(__props.stats.upcoming)}</p><p class="text-sm text-gray-500 dark:text-gray-400"${_scopeId}>${ssrInterpolate(labels[__props.type].upcoming)}</p></div></div>`);
          } else {
            return [
              createVNode("div", { class: "flex items-center gap-4" }, [
                createVNode("div", { class: "p-3 rounded-xl bg-blue-100 dark:bg-blue-900/30" }, [
                  createVNode(_component_UIcon, {
                    name: "i-heroicons-clock",
                    class: "w-6 h-6 text-blue-600 dark:text-blue-400"
                  })
                ]),
                createVNode("div", null, [
                  createVNode(
                    "p",
                    { class: "text-2xl font-bold text-gray-900 dark:text-white" },
                    toDisplayString(__props.stats.upcoming),
                    1
                    /* TEXT */
                  ),
                  createVNode(
                    "p",
                    { class: "text-sm text-gray-500 dark:text-gray-400" },
                    toDisplayString(labels[__props.type].upcoming),
                    1
                    /* TEXT */
                  )
                ])
              ])
            ];
          }
        }),
        _: 1
        /* STABLE */
      }, _parent));
      _push(ssrRenderComponent(_component_UCard, { class: "relative overflow-hidden" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="flex items-center gap-4"${_scopeId}><div class="p-3 rounded-xl bg-gray-100 dark:bg-gray-800"${_scopeId}>`);
            _push2(ssrRenderComponent(_component_UIcon, {
              name: "i-heroicons-x-circle",
              class: "w-6 h-6 text-gray-500 dark:text-gray-500"
            }, null, _parent2, _scopeId));
            _push2(`</div><div${_scopeId}><p class="text-2xl font-bold text-gray-900 dark:text-white"${_scopeId}>${ssrInterpolate(__props.stats.expired)}</p><p class="text-sm text-gray-500 dark:text-gray-400"${_scopeId}>${ssrInterpolate(labels[__props.type].expired)}</p></div></div>`);
          } else {
            return [
              createVNode("div", { class: "flex items-center gap-4" }, [
                createVNode("div", { class: "p-3 rounded-xl bg-gray-100 dark:bg-gray-800" }, [
                  createVNode(_component_UIcon, {
                    name: "i-heroicons-x-circle",
                    class: "w-6 h-6 text-gray-500 dark:text-gray-500"
                  })
                ]),
                createVNode("div", null, [
                  createVNode(
                    "p",
                    { class: "text-2xl font-bold text-gray-900 dark:text-white" },
                    toDisplayString(__props.stats.expired),
                    1
                    /* TEXT */
                  ),
                  createVNode(
                    "p",
                    { class: "text-sm text-gray-500 dark:text-gray-400" },
                    toDisplayString(labels[__props.type].expired),
                    1
                    /* TEXT */
                  )
                ])
              ])
            ];
          }
        }),
        _: 1
        /* STABLE */
      }, _parent));
      _push(ssrRenderComponent(_component_UCard, { class: "relative overflow-hidden" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="flex items-center gap-4"${_scopeId}><div class="p-3 rounded-xl bg-yellow-100 dark:bg-yellow-900/30"${_scopeId}>`);
            _push2(ssrRenderComponent(_component_UIcon, {
              name: "i-heroicons-pause-circle",
              class: "w-6 h-6 text-yellow-600 dark:text-yellow-400"
            }, null, _parent2, _scopeId));
            _push2(`</div><div${_scopeId}><p class="text-2xl font-bold text-gray-900 dark:text-white"${_scopeId}>${ssrInterpolate(__props.stats.inactive)}</p><p class="text-sm text-gray-500 dark:text-gray-400"${_scopeId}>${ssrInterpolate(labels[__props.type].inactive)}</p></div></div>`);
          } else {
            return [
              createVNode("div", { class: "flex items-center gap-4" }, [
                createVNode("div", { class: "p-3 rounded-xl bg-yellow-100 dark:bg-yellow-900/30" }, [
                  createVNode(_component_UIcon, {
                    name: "i-heroicons-pause-circle",
                    class: "w-6 h-6 text-yellow-600 dark:text-yellow-400"
                  })
                ]),
                createVNode("div", null, [
                  createVNode(
                    "p",
                    { class: "text-2xl font-bold text-gray-900 dark:text-white" },
                    toDisplayString(__props.stats.inactive),
                    1
                    /* TEXT */
                  ),
                  createVNode(
                    "p",
                    { class: "text-sm text-gray-500 dark:text-gray-400" },
                    toDisplayString(labels[__props.type].inactive),
                    1
                    /* TEXT */
                  )
                ])
              ])
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

const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("inertia/components/admin/promotions/PromotionStatsCards.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};

const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "PromotionFilters",
  __ssrInlineRender: true,
  props: {
    status: {},
    search: {},
    type: {},
    showTypeFilter: { type: Boolean },
    typeOptions: {}
  },
  emits: ["update:status", "update:search", "update:type", "filter"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const localStatus = ref(props.status);
    const localSearch = ref(props.search);
    const localType = ref(props.type || "");
    const statusOptions = [
      { label: "Semua", value: "all" },
      { label: "Aktif", value: "active" },
      { label: "Akan Datang", value: "upcoming" },
      { label: "Kadaluarsa", value: "expired" },
      { label: "Nonaktif", value: "inactive" }
    ];
    watch([localStatus, localType], () => {
      emit("update:status", localStatus.value);
      emit("update:type", localType.value);
      emit("filter");
    });
    const handleSearch = () => {
      emit("update:search", localSearch.value);
      emit("filter");
    };
    const handleKeydown = (e) => {
      if (e.key === "Enter") {
        handleSearch();
      }
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UCard = _sfc_main$4;
      const _component_UInput = _sfc_main$6;
      const _component_UButton = _sfc_main$7;
      const _component_USelectMenu = _sfc_main$8;
      _push(ssrRenderComponent(_component_UCard, _attrs, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="flex flex-col sm:flex-row gap-4"${_scopeId}>`);
            _push2(ssrRenderComponent(_component_UInput, {
              modelValue: localSearch.value,
              "onUpdate:modelValue": ($event) => localSearch.value = $event,
              placeholder: "Cari...",
              icon: "i-heroicons-magnifying-glass",
              class: "flex-1",
              onKeydown: handleKeydown
            }, {
              trailing: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  if (localSearch.value) {
                    _push3(ssrRenderComponent(_component_UButton, {
                      color: "neutral",
                      variant: "link",
                      icon: "i-heroicons-x-mark",
                      padded: false,
                      onClick: ($event) => {
                        localSearch.value = "";
                        handleSearch();
                      }
                    }, null, _parent3, _scopeId2));
                  } else {
                    _push3(`<!---->`);
                  }
                } else {
                  return [
                    localSearch.value ? (openBlock(), createBlock(_component_UButton, {
                      key: 0,
                      color: "neutral",
                      variant: "link",
                      icon: "i-heroicons-x-mark",
                      padded: false,
                      onClick: ($event) => {
                        localSearch.value = "";
                        handleSearch();
                      }
                    }, null, 8, ["onClick"])) : createCommentVNode("v-if", true)
                  ];
                }
              }),
              _: 1
              /* STABLE */
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_USelectMenu, {
              modelValue: localStatus.value,
              "onUpdate:modelValue": ($event) => localStatus.value = $event,
              items: statusOptions,
              "value-key": "value",
              placeholder: "Status",
              class: "w-full sm:w-48"
            }, null, _parent2, _scopeId));
            if (__props.showTypeFilter && __props.typeOptions) {
              _push2(ssrRenderComponent(_component_USelectMenu, {
                modelValue: localType.value,
                "onUpdate:modelValue": ($event) => localType.value = $event,
                items: __props.typeOptions,
                "value-key": "value",
                placeholder: "Tipe",
                class: "w-full sm:w-48"
              }, null, _parent2, _scopeId));
            } else {
              _push2(`<!---->`);
            }
            _push2(ssrRenderComponent(_component_UButton, {
              icon: "i-heroicons-magnifying-glass",
              color: "primary",
              onClick: handleSearch
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Cari `);
                } else {
                  return [
                    createTextVNode(" Cari ")
                  ];
                }
              }),
              _: 1
              /* STABLE */
            }, _parent2, _scopeId));
            _push2(`</div>`);
          } else {
            return [
              createVNode("div", { class: "flex flex-col sm:flex-row gap-4" }, [
                createVNode(_component_UInput, {
                  modelValue: localSearch.value,
                  "onUpdate:modelValue": ($event) => localSearch.value = $event,
                  placeholder: "Cari...",
                  icon: "i-heroicons-magnifying-glass",
                  class: "flex-1",
                  onKeydown: handleKeydown
                }, {
                  trailing: withCtx(() => [
                    localSearch.value ? (openBlock(), createBlock(_component_UButton, {
                      key: 0,
                      color: "neutral",
                      variant: "link",
                      icon: "i-heroicons-x-mark",
                      padded: false,
                      onClick: ($event) => {
                        localSearch.value = "";
                        handleSearch();
                      }
                    }, null, 8, ["onClick"])) : createCommentVNode("v-if", true)
                  ]),
                  _: 1
                  /* STABLE */
                }, 8, ["modelValue", "onUpdate:modelValue"]),
                createVNode(_component_USelectMenu, {
                  modelValue: localStatus.value,
                  "onUpdate:modelValue": ($event) => localStatus.value = $event,
                  items: statusOptions,
                  "value-key": "value",
                  placeholder: "Status",
                  class: "w-full sm:w-48"
                }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                __props.showTypeFilter && __props.typeOptions ? (openBlock(), createBlock(_component_USelectMenu, {
                  key: 0,
                  modelValue: localType.value,
                  "onUpdate:modelValue": ($event) => localType.value = $event,
                  items: __props.typeOptions,
                  "value-key": "value",
                  placeholder: "Tipe",
                  class: "w-full sm:w-48"
                }, null, 8, ["modelValue", "onUpdate:modelValue", "items"])) : createCommentVNode("v-if", true),
                createVNode(_component_UButton, {
                  icon: "i-heroicons-magnifying-glass",
                  color: "primary",
                  onClick: handleSearch
                }, {
                  default: withCtx(() => [
                    createTextVNode(" Cari ")
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
    };
  }
});

const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("inertia/components/admin/promotions/PromotionFilters.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};

const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "PromotionPagination",
  __ssrInlineRender: true,
  props: {
    currentPage: {},
    lastPage: {},
    total: {},
    perPage: {}
  },
  emits: ["page-change"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const goToPage = (page) => {
      if (page >= 1 && page <= props.lastPage) {
        emit("page-change", page);
      }
    };
    const pages = computed(() => {
      const range = [];
      const delta = 2;
      for (let i = Math.max(2, props.currentPage - delta); i <= Math.min(props.lastPage - 1, props.currentPage + delta); i++) {
        range.push(i);
      }
      if (props.currentPage - delta > 2) {
        range.unshift(-1);
      }
      if (props.currentPage + delta < props.lastPage - 1) {
        range.push(-1);
      }
      range.unshift(1);
      if (props.lastPage > 1) {
        range.push(props.lastPage);
      }
      return range;
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UButton = _sfc_main$7;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "flex flex-col sm:flex-row items-center justify-between gap-4 mt-4" }, _attrs))}><p class="text-sm text-gray-500 dark:text-gray-400"> Menampilkan ${ssrInterpolate((__props.currentPage - 1) * __props.perPage + 1)} - ${ssrInterpolate(Math.min(__props.currentPage * __props.perPage, __props.total))} dari ${ssrInterpolate(__props.total)} data </p>`);
      if (__props.lastPage > 1) {
        _push(`<div class="flex items-center gap-1">`);
        _push(ssrRenderComponent(_component_UButton, {
          icon: "i-heroicons-chevron-left",
          size: "sm",
          color: "neutral",
          variant: "ghost",
          disabled: __props.currentPage === 1,
          onClick: ($event) => goToPage(__props.currentPage - 1)
        }, null, _parent));
        _push(`<!--[-->`);
        ssrRenderList(pages.value, (page, index) => {
          _push(`<!--[-->`);
          if (page === -1) {
            _push(`<span class="px-2 text-gray-400">...</span>`);
          } else {
            _push(ssrRenderComponent(_component_UButton, {
              size: "sm",
              color: page === __props.currentPage ? "primary" : "neutral",
              variant: page === __props.currentPage ? "solid" : "ghost",
              onClick: ($event) => goToPage(page)
            }, {
              default: withCtx((_, _push2, _parent2, _scopeId) => {
                if (_push2) {
                  _push2(`${ssrInterpolate(page)}`);
                } else {
                  return [
                    createTextVNode(
                      toDisplayString(page),
                      1
                      /* TEXT */
                    )
                  ];
                }
              }),
              _: 2
              /* DYNAMIC */
            }, _parent));
          }
          _push(`<!--]-->`);
        });
        _push(`<!--]-->`);
        _push(ssrRenderComponent(_component_UButton, {
          icon: "i-heroicons-chevron-right",
          size: "sm",
          color: "neutral",
          variant: "ghost",
          disabled: __props.currentPage === __props.lastPage,
          onClick: ($event) => goToPage(__props.currentPage + 1)
        }, null, _parent));
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
    };
  }
});

const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("inertia/components/admin/promotions/PromotionPagination.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "DeleteConfirmModal",
  __ssrInlineRender: true,
  props: {
    show: { type: Boolean },
    title: {},
    message: {},
    loading: { type: Boolean }
  },
  emits: ["close", "confirm"],
  setup(__props, { emit: __emit }) {
    const emit = __emit;
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UModal = _sfc_main$9;
      const _component_UCard = _sfc_main$4;
      const _component_UIcon = _sfc_main$5;
      const _component_UButton = _sfc_main$7;
      _push(ssrRenderComponent(_component_UModal, mergeProps({
        open: __props.show,
        onClose: ($event) => emit("close"),
        ui: { overlay: "z-[100]", content: "z-[100]" }
      }, _attrs), {
        content: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_UCard, { class: "max-h-[85vh] overflow-y-auto" }, {
              header: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="flex items-center gap-3"${_scopeId2}><div class="p-2 rounded-full bg-red-100 dark:bg-red-900/30"${_scopeId2}>`);
                  _push3(ssrRenderComponent(_component_UIcon, {
                    name: "i-heroicons-exclamation-triangle",
                    class: "w-6 h-6 text-red-600 dark:text-red-400"
                  }, null, _parent3, _scopeId2));
                  _push3(`</div><h3 class="text-lg font-semibold text-gray-900 dark:text-white"${_scopeId2}>${ssrInterpolate(__props.title)}</h3></div>`);
                } else {
                  return [
                    createVNode("div", { class: "flex items-center gap-3" }, [
                      createVNode("div", { class: "p-2 rounded-full bg-red-100 dark:bg-red-900/30" }, [
                        createVNode(_component_UIcon, {
                          name: "i-heroicons-exclamation-triangle",
                          class: "w-6 h-6 text-red-600 dark:text-red-400"
                        })
                      ]),
                      createVNode(
                        "h3",
                        { class: "text-lg font-semibold text-gray-900 dark:text-white" },
                        toDisplayString(__props.title),
                        1
                        /* TEXT */
                      )
                    ])
                  ];
                }
              }),
              footer: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="flex justify-end gap-3"${_scopeId2}>`);
                  _push3(ssrRenderComponent(_component_UButton, {
                    color: "neutral",
                    variant: "ghost",
                    disabled: __props.loading,
                    onClick: ($event) => emit("close")
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(` Batal `);
                      } else {
                        return [
                          createTextVNode(" Batal ")
                        ];
                      }
                    }),
                    _: 1
                    /* STABLE */
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_UButton, {
                    color: "error",
                    loading: __props.loading,
                    onClick: ($event) => emit("confirm")
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(` Hapus `);
                      } else {
                        return [
                          createTextVNode(" Hapus ")
                        ];
                      }
                    }),
                    _: 1
                    /* STABLE */
                  }, _parent3, _scopeId2));
                  _push3(`</div>`);
                } else {
                  return [
                    createVNode("div", { class: "flex justify-end gap-3" }, [
                      createVNode(_component_UButton, {
                        color: "neutral",
                        variant: "ghost",
                        disabled: __props.loading,
                        onClick: ($event) => emit("close")
                      }, {
                        default: withCtx(() => [
                          createTextVNode(" Batal ")
                        ]),
                        _: 1
                        /* STABLE */
                      }, 8, ["disabled", "onClick"]),
                      createVNode(_component_UButton, {
                        color: "error",
                        loading: __props.loading,
                        onClick: ($event) => emit("confirm")
                      }, {
                        default: withCtx(() => [
                          createTextVNode(" Hapus ")
                        ]),
                        _: 1
                        /* STABLE */
                      }, 8, ["loading", "onClick"])
                    ])
                  ];
                }
              }),
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<p class="text-gray-600 dark:text-gray-300"${_scopeId2}>${ssrInterpolate(__props.message)}</p>`);
                } else {
                  return [
                    createVNode(
                      "p",
                      { class: "text-gray-600 dark:text-gray-300" },
                      toDisplayString(__props.message),
                      1
                      /* TEXT */
                    )
                  ];
                }
              }),
              _: 1
              /* STABLE */
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_UCard, { class: "max-h-[85vh] overflow-y-auto" }, {
                header: withCtx(() => [
                  createVNode("div", { class: "flex items-center gap-3" }, [
                    createVNode("div", { class: "p-2 rounded-full bg-red-100 dark:bg-red-900/30" }, [
                      createVNode(_component_UIcon, {
                        name: "i-heroicons-exclamation-triangle",
                        class: "w-6 h-6 text-red-600 dark:text-red-400"
                      })
                    ]),
                    createVNode(
                      "h3",
                      { class: "text-lg font-semibold text-gray-900 dark:text-white" },
                      toDisplayString(__props.title),
                      1
                      /* TEXT */
                    )
                  ])
                ]),
                footer: withCtx(() => [
                  createVNode("div", { class: "flex justify-end gap-3" }, [
                    createVNode(_component_UButton, {
                      color: "neutral",
                      variant: "ghost",
                      disabled: __props.loading,
                      onClick: ($event) => emit("close")
                    }, {
                      default: withCtx(() => [
                        createTextVNode(" Batal ")
                      ]),
                      _: 1
                      /* STABLE */
                    }, 8, ["disabled", "onClick"]),
                    createVNode(_component_UButton, {
                      color: "error",
                      loading: __props.loading,
                      onClick: ($event) => emit("confirm")
                    }, {
                      default: withCtx(() => [
                        createTextVNode(" Hapus ")
                      ]),
                      _: 1
                      /* STABLE */
                    }, 8, ["loading", "onClick"])
                  ])
                ]),
                default: withCtx(() => [
                  createVNode(
                    "p",
                    { class: "text-gray-600 dark:text-gray-300" },
                    toDisplayString(__props.message),
                    1
                    /* TEXT */
                  )
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
    };
  }
});

const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("inertia/components/admin/promotions/DeleteConfirmModal.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main$3 as _, _sfc_main$2 as a, _sfc_main$1 as b, _sfc_main as c };
