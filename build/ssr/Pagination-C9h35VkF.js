import { useSlots, computed, unref, mergeProps, withCtx, renderSlot, createVNode, createBlock, createCommentVNode, openBlock, Fragment, renderList, useSSRContext } from 'vue';
import { ssrRenderComponent, ssrRenderSlot, ssrRenderList } from 'vue/server-renderer';
import { useForwardPropsEmits, PaginationRoot, PaginationList, PaginationFirst, PaginationPrev, PaginationListItem, PaginationEllipsis, PaginationNext, PaginationLast } from 'reka-ui';
import { reactivePick } from '@vueuse/core';
import { d as useLocale, a as useAppConfig } from './virtual_nuxt-ui-plugins-BqI2j5ZJ.js';
import { t as tv, a as _sfc_main$1 } from './Button-BBveOjhJ.js';

const theme = {
  "slots": {
    "root": "",
    "list": "flex items-center gap-1",
    "ellipsis": "pointer-events-none",
    "label": "min-w-5 text-center",
    "first": "",
    "prev": "",
    "item": "",
    "next": "",
    "last": ""
  }
};

const _sfc_main = {
  __name: 'Pagination',
  __ssrInlineRender: true,
  props: {
  as: { type: null, required: false },
  firstIcon: { type: null, required: false },
  prevIcon: { type: null, required: false },
  nextIcon: { type: null, required: false },
  lastIcon: { type: null, required: false },
  ellipsisIcon: { type: null, required: false },
  color: { type: null, required: false, default: "neutral" },
  variant: { type: null, required: false, default: "outline" },
  activeColor: { type: null, required: false, default: "primary" },
  activeVariant: { type: null, required: false, default: "solid" },
  showControls: { type: Boolean, required: false, default: true },
  size: { type: null, required: false },
  to: { type: Function, required: false },
  class: { type: null, required: false },
  ui: { type: null, required: false },
  defaultPage: { type: Number, required: false },
  disabled: { type: Boolean, required: false },
  itemsPerPage: { type: Number, required: false, default: 10 },
  page: { type: Number, required: false },
  showEdges: { type: Boolean, required: false, default: false },
  siblingCount: { type: Number, required: false, default: 2 },
  total: { type: Number, required: false, default: 0 }
},
  emits: ["update:page"],
  setup(__props, { emit: __emit }) {

const props = __props;
const emits = __emit;
const slots = useSlots();
const { dir } = useLocale();
const appConfig = useAppConfig();
const rootProps = useForwardPropsEmits(reactivePick(props, "as", "defaultPage", "disabled", "itemsPerPage", "page", "showEdges", "siblingCount", "total"), emits);
const firstIcon = computed(() => props.firstIcon || (dir.value === "rtl" ? appConfig.ui.icons.chevronDoubleRight : appConfig.ui.icons.chevronDoubleLeft));
const prevIcon = computed(() => props.prevIcon || (dir.value === "rtl" ? appConfig.ui.icons.chevronRight : appConfig.ui.icons.chevronLeft));
const nextIcon = computed(() => props.nextIcon || (dir.value === "rtl" ? appConfig.ui.icons.chevronLeft : appConfig.ui.icons.chevronRight));
const lastIcon = computed(() => props.lastIcon || (dir.value === "rtl" ? appConfig.ui.icons.chevronDoubleLeft : appConfig.ui.icons.chevronDoubleRight));
const ui = computed(() => tv({ extend: tv(theme), ...appConfig.ui?.pagination || {} })());

return (_ctx, _push, _parent, _attrs) => {
  _push(ssrRenderComponent(unref(PaginationRoot), mergeProps(unref(rootProps), {
    "data-slot": "root",
    class: ui.value.root({ class: [props.ui?.root, props.class] })
  }, _attrs), {
    default: withCtx(({ page, pageCount }, _push, _parent, _scopeId) => {
      if (_push) {
        _push(ssrRenderComponent(unref(PaginationList), {
          "data-slot": "list",
          class: ui.value.list({ class: props.ui?.list })
        }, {
          default: withCtx(({ items }, _push, _parent, _scopeId) => {
            if (_push) {
              if (__props.showControls || !!slots.first) {
                _push(ssrRenderComponent(unref(PaginationFirst), {
                  "as-child": "",
                  "data-slot": "first",
                  class: ui.value.first({ class: props.ui?.first })
                }, {
                  default: withCtx((_, _push, _parent, _scopeId) => {
                    if (_push) {
                      ssrRenderSlot(_ctx.$slots, "first", {}, () => {
                        _push(ssrRenderComponent(_sfc_main$1, {
                          color: __props.color,
                          variant: __props.variant,
                          size: __props.size,
                          icon: firstIcon.value,
                          to: __props.to?.(1)
                        }, null, _parent, _scopeId));
                      }, _push, _parent, _scopeId);
                    } else {
                      return [
                        renderSlot(_ctx.$slots, "first", {}, () => [
                          createVNode(_sfc_main$1, {
                            color: __props.color,
                            variant: __props.variant,
                            size: __props.size,
                            icon: firstIcon.value,
                            to: __props.to?.(1)
                          }, null, 8 /* PROPS */, ["color", "variant", "size", "icon", "to"])
                        ])
                      ]
                    }
                  }),
                  _: 2 /* DYNAMIC */
                }, _parent, _scopeId));
              } else {
                _push(`<!---->`);
              }
              if (__props.showControls || !!slots.prev) {
                _push(ssrRenderComponent(unref(PaginationPrev), {
                  "as-child": "",
                  "data-slot": "prev",
                  class: ui.value.prev({ class: props.ui?.prev })
                }, {
                  default: withCtx((_, _push, _parent, _scopeId) => {
                    if (_push) {
                      ssrRenderSlot(_ctx.$slots, "prev", {}, () => {
                        _push(ssrRenderComponent(_sfc_main$1, {
                          color: __props.color,
                          variant: __props.variant,
                          size: __props.size,
                          icon: prevIcon.value,
                          to: page > 1 ? __props.to?.(page - 1) : void 0
                        }, null, _parent, _scopeId));
                      }, _push, _parent, _scopeId);
                    } else {
                      return [
                        renderSlot(_ctx.$slots, "prev", {}, () => [
                          createVNode(_sfc_main$1, {
                            color: __props.color,
                            variant: __props.variant,
                            size: __props.size,
                            icon: prevIcon.value,
                            to: page > 1 ? __props.to?.(page - 1) : void 0
                          }, null, 8 /* PROPS */, ["color", "variant", "size", "icon", "to"])
                        ])
                      ]
                    }
                  }),
                  _: 2 /* DYNAMIC */
                }, _parent, _scopeId));
              } else {
                _push(`<!---->`);
              }
              _push(`<!--[-->`);
              ssrRenderList(items, (item, index) => {
                _push(`<!--[-->`);
                if (item.type === 'page') {
                  _push(ssrRenderComponent(unref(PaginationListItem), {
                    "as-child": "",
                    value: item.value,
                    "data-slot": "item",
                    class: ui.value.item({ class: props.ui?.item })
                  }, {
                    default: withCtx((_, _push, _parent, _scopeId) => {
                      if (_push) {
                        ssrRenderSlot(_ctx.$slots, "item", mergeProps({ ref_for: true }, { item, index, page, pageCount }), () => {
                          _push(ssrRenderComponent(_sfc_main$1, {
                            color: page === item.value ? __props.activeColor : __props.color,
                            variant: page === item.value ? __props.activeVariant : __props.variant,
                            size: __props.size,
                            label: String(item.value),
                            ui: { label: ui.value.label() },
                            to: __props.to?.(item.value),
                            square: ""
                          }, null, _parent, _scopeId));
                        }, _push, _parent, _scopeId);
                      } else {
                        return [
                          renderSlot(_ctx.$slots, "item", mergeProps({ ref_for: true }, { item, index, page, pageCount }), () => [
                            createVNode(_sfc_main$1, {
                              color: page === item.value ? __props.activeColor : __props.color,
                              variant: page === item.value ? __props.activeVariant : __props.variant,
                              size: __props.size,
                              label: String(item.value),
                              ui: { label: ui.value.label() },
                              to: __props.to?.(item.value),
                              square: ""
                            }, null, 8 /* PROPS */, ["color", "variant", "size", "label", "ui", "to"])
                          ])
                        ]
                      }
                    }),
                    _: 2 /* DYNAMIC */
                  }, _parent, _scopeId));
                } else {
                  _push(ssrRenderComponent(unref(PaginationEllipsis), {
                    "as-child": "",
                    "data-slot": "ellipsis",
                    class: ui.value.ellipsis({ class: props.ui?.ellipsis })
                  }, {
                    default: withCtx((_, _push, _parent, _scopeId) => {
                      if (_push) {
                        ssrRenderSlot(_ctx.$slots, "ellipsis", { ui: ui.value }, () => {
                          _push(ssrRenderComponent(_sfc_main$1, {
                            as: "div",
                            color: __props.color,
                            variant: __props.variant,
                            size: __props.size,
                            icon: __props.ellipsisIcon || unref(appConfig).ui.icons.ellipsis
                          }, null, _parent, _scopeId));
                        }, _push, _parent, _scopeId);
                      } else {
                        return [
                          renderSlot(_ctx.$slots, "ellipsis", { ui: ui.value }, () => [
                            createVNode(_sfc_main$1, {
                              as: "div",
                              color: __props.color,
                              variant: __props.variant,
                              size: __props.size,
                              icon: __props.ellipsisIcon || unref(appConfig).ui.icons.ellipsis
                            }, null, 8 /* PROPS */, ["color", "variant", "size", "icon"])
                          ])
                        ]
                      }
                    }),
                    _: 2 /* DYNAMIC */
                  }, _parent, _scopeId));
                }
                _push(`<!--]-->`);
              });
              _push(`<!--]-->`);
              if (__props.showControls || !!slots.next) {
                _push(ssrRenderComponent(unref(PaginationNext), {
                  "as-child": "",
                  "data-slot": "next",
                  class: ui.value.next({ class: props.ui?.next })
                }, {
                  default: withCtx((_, _push, _parent, _scopeId) => {
                    if (_push) {
                      ssrRenderSlot(_ctx.$slots, "next", {}, () => {
                        _push(ssrRenderComponent(_sfc_main$1, {
                          color: __props.color,
                          variant: __props.variant,
                          size: __props.size,
                          icon: nextIcon.value,
                          to: page < pageCount ? __props.to?.(page + 1) : void 0
                        }, null, _parent, _scopeId));
                      }, _push, _parent, _scopeId);
                    } else {
                      return [
                        renderSlot(_ctx.$slots, "next", {}, () => [
                          createVNode(_sfc_main$1, {
                            color: __props.color,
                            variant: __props.variant,
                            size: __props.size,
                            icon: nextIcon.value,
                            to: page < pageCount ? __props.to?.(page + 1) : void 0
                          }, null, 8 /* PROPS */, ["color", "variant", "size", "icon", "to"])
                        ])
                      ]
                    }
                  }),
                  _: 2 /* DYNAMIC */
                }, _parent, _scopeId));
              } else {
                _push(`<!---->`);
              }
              if (__props.showControls || !!slots.last) {
                _push(ssrRenderComponent(unref(PaginationLast), {
                  "as-child": "",
                  "data-slot": "last",
                  class: ui.value.last({ class: props.ui?.last })
                }, {
                  default: withCtx((_, _push, _parent, _scopeId) => {
                    if (_push) {
                      ssrRenderSlot(_ctx.$slots, "last", {}, () => {
                        _push(ssrRenderComponent(_sfc_main$1, {
                          color: __props.color,
                          variant: __props.variant,
                          size: __props.size,
                          icon: lastIcon.value,
                          to: __props.to?.(pageCount)
                        }, null, _parent, _scopeId));
                      }, _push, _parent, _scopeId);
                    } else {
                      return [
                        renderSlot(_ctx.$slots, "last", {}, () => [
                          createVNode(_sfc_main$1, {
                            color: __props.color,
                            variant: __props.variant,
                            size: __props.size,
                            icon: lastIcon.value,
                            to: __props.to?.(pageCount)
                          }, null, 8 /* PROPS */, ["color", "variant", "size", "icon", "to"])
                        ])
                      ]
                    }
                  }),
                  _: 2 /* DYNAMIC */
                }, _parent, _scopeId));
              } else {
                _push(`<!---->`);
              }
            } else {
              return [
                (__props.showControls || !!slots.first)
                  ? (openBlock(), createBlock(unref(PaginationFirst), {
                      key: 0,
                      "as-child": "",
                      "data-slot": "first",
                      class: ui.value.first({ class: props.ui?.first })
                    }, {
                      default: withCtx(() => [
                        renderSlot(_ctx.$slots, "first", {}, () => [
                          createVNode(_sfc_main$1, {
                            color: __props.color,
                            variant: __props.variant,
                            size: __props.size,
                            icon: firstIcon.value,
                            to: __props.to?.(1)
                          }, null, 8 /* PROPS */, ["color", "variant", "size", "icon", "to"])
                        ])
                      ]),
                      _: 3 /* FORWARDED */
                    }, 8 /* PROPS */, ["class"]))
                  : createCommentVNode("v-if", true),
                (__props.showControls || !!slots.prev)
                  ? (openBlock(), createBlock(unref(PaginationPrev), {
                      key: 1,
                      "as-child": "",
                      "data-slot": "prev",
                      class: ui.value.prev({ class: props.ui?.prev })
                    }, {
                      default: withCtx(() => [
                        renderSlot(_ctx.$slots, "prev", {}, () => [
                          createVNode(_sfc_main$1, {
                            color: __props.color,
                            variant: __props.variant,
                            size: __props.size,
                            icon: prevIcon.value,
                            to: page > 1 ? __props.to?.(page - 1) : void 0
                          }, null, 8 /* PROPS */, ["color", "variant", "size", "icon", "to"])
                        ])
                      ]),
                      _: 2 /* DYNAMIC */
                    }, 1032 /* PROPS, DYNAMIC_SLOTS */, ["class"]))
                  : createCommentVNode("v-if", true),
                (openBlock(true), createBlock(Fragment, null, renderList(items, (item, index) => {
                  return (openBlock(), createBlock(Fragment, { key: index }, [
                    (item.type === 'page')
                      ? (openBlock(), createBlock(unref(PaginationListItem), {
                          key: 0,
                          "as-child": "",
                          value: item.value,
                          "data-slot": "item",
                          class: ui.value.item({ class: props.ui?.item })
                        }, {
                          default: withCtx(() => [
                            renderSlot(_ctx.$slots, "item", mergeProps({ ref_for: true }, { item, index, page, pageCount }), () => [
                              createVNode(_sfc_main$1, {
                                color: page === item.value ? __props.activeColor : __props.color,
                                variant: page === item.value ? __props.activeVariant : __props.variant,
                                size: __props.size,
                                label: String(item.value),
                                ui: { label: ui.value.label() },
                                to: __props.to?.(item.value),
                                square: ""
                              }, null, 8 /* PROPS */, ["color", "variant", "size", "label", "ui", "to"])
                            ])
                          ]),
                          _: 2 /* DYNAMIC */
                        }, 1032 /* PROPS, DYNAMIC_SLOTS */, ["value", "class"]))
                      : (openBlock(), createBlock(unref(PaginationEllipsis), {
                          key: 1,
                          "as-child": "",
                          "data-slot": "ellipsis",
                          class: ui.value.ellipsis({ class: props.ui?.ellipsis })
                        }, {
                          default: withCtx(() => [
                            renderSlot(_ctx.$slots, "ellipsis", { ui: ui.value }, () => [
                              createVNode(_sfc_main$1, {
                                as: "div",
                                color: __props.color,
                                variant: __props.variant,
                                size: __props.size,
                                icon: __props.ellipsisIcon || unref(appConfig).ui.icons.ellipsis
                              }, null, 8 /* PROPS */, ["color", "variant", "size", "icon"])
                            ])
                          ]),
                          _: 3 /* FORWARDED */
                        }, 8 /* PROPS */, ["class"]))
                  ], 64 /* STABLE_FRAGMENT */))
                }), 128 /* KEYED_FRAGMENT */)),
                (__props.showControls || !!slots.next)
                  ? (openBlock(), createBlock(unref(PaginationNext), {
                      key: 2,
                      "as-child": "",
                      "data-slot": "next",
                      class: ui.value.next({ class: props.ui?.next })
                    }, {
                      default: withCtx(() => [
                        renderSlot(_ctx.$slots, "next", {}, () => [
                          createVNode(_sfc_main$1, {
                            color: __props.color,
                            variant: __props.variant,
                            size: __props.size,
                            icon: nextIcon.value,
                            to: page < pageCount ? __props.to?.(page + 1) : void 0
                          }, null, 8 /* PROPS */, ["color", "variant", "size", "icon", "to"])
                        ])
                      ]),
                      _: 2 /* DYNAMIC */
                    }, 1032 /* PROPS, DYNAMIC_SLOTS */, ["class"]))
                  : createCommentVNode("v-if", true),
                (__props.showControls || !!slots.last)
                  ? (openBlock(), createBlock(unref(PaginationLast), {
                      key: 3,
                      "as-child": "",
                      "data-slot": "last",
                      class: ui.value.last({ class: props.ui?.last })
                    }, {
                      default: withCtx(() => [
                        renderSlot(_ctx.$slots, "last", {}, () => [
                          createVNode(_sfc_main$1, {
                            color: __props.color,
                            variant: __props.variant,
                            size: __props.size,
                            icon: lastIcon.value,
                            to: __props.to?.(pageCount)
                          }, null, 8 /* PROPS */, ["color", "variant", "size", "icon", "to"])
                        ])
                      ]),
                      _: 2 /* DYNAMIC */
                    }, 1032 /* PROPS, DYNAMIC_SLOTS */, ["class"]))
                  : createCommentVNode("v-if", true)
              ]
            }
          }),
          _: 2 /* DYNAMIC */
        }, _parent, _scopeId));
      } else {
        return [
          createVNode(unref(PaginationList), {
            "data-slot": "list",
            class: ui.value.list({ class: props.ui?.list })
          }, {
            default: withCtx(({ items }) => [
              (__props.showControls || !!slots.first)
                ? (openBlock(), createBlock(unref(PaginationFirst), {
                    key: 0,
                    "as-child": "",
                    "data-slot": "first",
                    class: ui.value.first({ class: props.ui?.first })
                  }, {
                    default: withCtx(() => [
                      renderSlot(_ctx.$slots, "first", {}, () => [
                        createVNode(_sfc_main$1, {
                          color: __props.color,
                          variant: __props.variant,
                          size: __props.size,
                          icon: firstIcon.value,
                          to: __props.to?.(1)
                        }, null, 8 /* PROPS */, ["color", "variant", "size", "icon", "to"])
                      ])
                    ]),
                    _: 3 /* FORWARDED */
                  }, 8 /* PROPS */, ["class"]))
                : createCommentVNode("v-if", true),
              (__props.showControls || !!slots.prev)
                ? (openBlock(), createBlock(unref(PaginationPrev), {
                    key: 1,
                    "as-child": "",
                    "data-slot": "prev",
                    class: ui.value.prev({ class: props.ui?.prev })
                  }, {
                    default: withCtx(() => [
                      renderSlot(_ctx.$slots, "prev", {}, () => [
                        createVNode(_sfc_main$1, {
                          color: __props.color,
                          variant: __props.variant,
                          size: __props.size,
                          icon: prevIcon.value,
                          to: page > 1 ? __props.to?.(page - 1) : void 0
                        }, null, 8 /* PROPS */, ["color", "variant", "size", "icon", "to"])
                      ])
                    ]),
                    _: 2 /* DYNAMIC */
                  }, 1032 /* PROPS, DYNAMIC_SLOTS */, ["class"]))
                : createCommentVNode("v-if", true),
              (openBlock(true), createBlock(Fragment, null, renderList(items, (item, index) => {
                return (openBlock(), createBlock(Fragment, { key: index }, [
                  (item.type === 'page')
                    ? (openBlock(), createBlock(unref(PaginationListItem), {
                        key: 0,
                        "as-child": "",
                        value: item.value,
                        "data-slot": "item",
                        class: ui.value.item({ class: props.ui?.item })
                      }, {
                        default: withCtx(() => [
                          renderSlot(_ctx.$slots, "item", mergeProps({ ref_for: true }, { item, index, page, pageCount }), () => [
                            createVNode(_sfc_main$1, {
                              color: page === item.value ? __props.activeColor : __props.color,
                              variant: page === item.value ? __props.activeVariant : __props.variant,
                              size: __props.size,
                              label: String(item.value),
                              ui: { label: ui.value.label() },
                              to: __props.to?.(item.value),
                              square: ""
                            }, null, 8 /* PROPS */, ["color", "variant", "size", "label", "ui", "to"])
                          ])
                        ]),
                        _: 2 /* DYNAMIC */
                      }, 1032 /* PROPS, DYNAMIC_SLOTS */, ["value", "class"]))
                    : (openBlock(), createBlock(unref(PaginationEllipsis), {
                        key: 1,
                        "as-child": "",
                        "data-slot": "ellipsis",
                        class: ui.value.ellipsis({ class: props.ui?.ellipsis })
                      }, {
                        default: withCtx(() => [
                          renderSlot(_ctx.$slots, "ellipsis", { ui: ui.value }, () => [
                            createVNode(_sfc_main$1, {
                              as: "div",
                              color: __props.color,
                              variant: __props.variant,
                              size: __props.size,
                              icon: __props.ellipsisIcon || unref(appConfig).ui.icons.ellipsis
                            }, null, 8 /* PROPS */, ["color", "variant", "size", "icon"])
                          ])
                        ]),
                        _: 3 /* FORWARDED */
                      }, 8 /* PROPS */, ["class"]))
                ], 64 /* STABLE_FRAGMENT */))
              }), 128 /* KEYED_FRAGMENT */)),
              (__props.showControls || !!slots.next)
                ? (openBlock(), createBlock(unref(PaginationNext), {
                    key: 2,
                    "as-child": "",
                    "data-slot": "next",
                    class: ui.value.next({ class: props.ui?.next })
                  }, {
                    default: withCtx(() => [
                      renderSlot(_ctx.$slots, "next", {}, () => [
                        createVNode(_sfc_main$1, {
                          color: __props.color,
                          variant: __props.variant,
                          size: __props.size,
                          icon: nextIcon.value,
                          to: page < pageCount ? __props.to?.(page + 1) : void 0
                        }, null, 8 /* PROPS */, ["color", "variant", "size", "icon", "to"])
                      ])
                    ]),
                    _: 2 /* DYNAMIC */
                  }, 1032 /* PROPS, DYNAMIC_SLOTS */, ["class"]))
                : createCommentVNode("v-if", true),
              (__props.showControls || !!slots.last)
                ? (openBlock(), createBlock(unref(PaginationLast), {
                    key: 3,
                    "as-child": "",
                    "data-slot": "last",
                    class: ui.value.last({ class: props.ui?.last })
                  }, {
                    default: withCtx(() => [
                      renderSlot(_ctx.$slots, "last", {}, () => [
                        createVNode(_sfc_main$1, {
                          color: __props.color,
                          variant: __props.variant,
                          size: __props.size,
                          icon: lastIcon.value,
                          to: __props.to?.(pageCount)
                        }, null, 8 /* PROPS */, ["color", "variant", "size", "icon", "to"])
                      ])
                    ]),
                    _: 2 /* DYNAMIC */
                  }, 1032 /* PROPS, DYNAMIC_SLOTS */, ["class"]))
                : createCommentVNode("v-if", true)
            ]),
            _: 2 /* DYNAMIC */
          }, 1032 /* PROPS, DYNAMIC_SLOTS */, ["class"])
        ]
      }
    }),
    _: 3 /* FORWARDED */
  }, _parent));
}
}

};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext()
  ;(ssrContext.modules || (ssrContext.modules = new Set())).add("node_modules/@nuxt/ui/dist/runtime/components/Pagination.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : undefined
};

export { _sfc_main as _ };
