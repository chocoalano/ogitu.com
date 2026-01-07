import { useSlots, toRef, computed, unref, mergeProps, withCtx, toHandlers, renderSlot, createTextVNode, toDisplayString, createBlock, createCommentVNode, openBlock, createVNode, Fragment, useSSRContext } from 'vue';
import { ssrRenderComponent, ssrRenderSlot, ssrInterpolate, ssrRenderClass } from 'vue/server-renderer';
import { useForwardPropsEmits, DialogRoot, DialogContent, VisuallyHidden, DialogTitle, DialogDescription, DialogClose, DialogTrigger, DialogPortal, DialogOverlay } from 'reka-ui';
import { reactivePick, createReusableTemplate } from '@vueuse/core';
import { d as useLocale, a as useAppConfig } from './virtual_nuxt-ui-plugins-CrG8Uaxr.js';
import { g as usePortal } from './Badge-CQlYH3Fo.js';
import { t as tv, a as _sfc_main$1 } from './Button-BTdvmZ8N.js';

const theme = {
  "slots": {
    "overlay": "fixed inset-0",
    "content": "bg-default divide-y divide-default flex flex-col focus:outline-none",
    "header": "flex items-center gap-1.5 p-4 sm:px-6 min-h-16",
    "wrapper": "",
    "body": "flex-1 p-4 sm:p-6",
    "footer": "flex items-center gap-1.5 p-4 sm:px-6",
    "title": "text-highlighted font-semibold",
    "description": "mt-1 text-muted text-sm",
    "close": "absolute top-4 end-4"
  },
  "variants": {
    "transition": {
      "true": {
        "overlay": "data-[state=open]:animate-[fade-in_200ms_ease-out] data-[state=closed]:animate-[fade-out_200ms_ease-in]",
        "content": "data-[state=open]:animate-[scale-in_200ms_ease-out] data-[state=closed]:animate-[scale-out_200ms_ease-in]"
      }
    },
    "fullscreen": {
      "true": {
        "content": "inset-0"
      },
      "false": {
        "content": "w-[calc(100vw-2rem)] max-w-lg rounded-lg shadow-lg ring ring-default"
      }
    },
    "overlay": {
      "true": {
        "overlay": "bg-elevated/75"
      }
    },
    "scrollable": {
      "true": {
        "overlay": "overflow-y-auto",
        "content": "relative"
      },
      "false": {
        "content": "fixed",
        "body": "overflow-y-auto"
      }
    }
  },
  "compoundVariants": [
    {
      "scrollable": true,
      "fullscreen": false,
      "class": {
        "overlay": "grid place-items-center p-4 sm:py-8"
      }
    },
    {
      "scrollable": false,
      "fullscreen": false,
      "class": {
        "content": "top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 max-h-[calc(100dvh-2rem)] sm:max-h-[calc(100dvh-4rem)] overflow-hidden"
      }
    }
  ]
};

const _sfc_main = {
  __name: 'Modal',
  __ssrInlineRender: true,
  props: {
  title: { type: String, required: false },
  description: { type: String, required: false },
  content: { type: Object, required: false },
  overlay: { type: Boolean, required: false, default: true },
  scrollable: { type: Boolean, required: false },
  transition: { type: Boolean, required: false, default: true },
  fullscreen: { type: Boolean, required: false },
  portal: { type: [Boolean, String], required: false, skipCheck: true, default: true },
  close: { type: [Boolean, Object], required: false, default: true },
  closeIcon: { type: null, required: false },
  dismissible: { type: Boolean, required: false, default: true },
  class: { type: null, required: false },
  ui: { type: null, required: false },
  open: { type: Boolean, required: false },
  defaultOpen: { type: Boolean, required: false },
  modal: { type: Boolean, required: false, default: true }
},
  emits: ["after:leave", "after:enter", "close:prevent", "update:open"],
  setup(__props, { emit: __emit }) {

const props = __props;
const emits = __emit;
const slots = useSlots();
const { t } = useLocale();
const appConfig = useAppConfig();
const rootProps = useForwardPropsEmits(reactivePick(props, "open", "defaultOpen", "modal"), emits);
const portalProps = usePortal(toRef(() => props.portal));
const contentProps = toRef(() => props.content);
const contentEvents = computed(() => {
  if (!props.dismissible) {
    const events = ["pointerDownOutside", "interactOutside", "escapeKeyDown"];
    return events.reduce((acc, curr) => {
      acc[curr] = (e) => {
        e.preventDefault();
        emits("close:prevent");
      };
      return acc;
    }, {});
  }
  if (props.scrollable) {
    return {
      // FIXME: This is a workaround to prevent the modal from closing when clicking on the scrollbar https://reka-ui.com/docs/components/dialog#scrollable-overlay but it's not working on Mac OS.
      pointerDownOutside: (e) => {
        const originalEvent = e.detail.originalEvent;
        const target = originalEvent.target;
        if (originalEvent.offsetX > target.clientWidth || originalEvent.offsetY > target.clientHeight) {
          e.preventDefault();
        }
      }
    };
  }
  return {};
});
const [DefineContentTemplate, ReuseContentTemplate] = createReusableTemplate();
const ui = computed(() => tv({ extend: tv(theme), ...appConfig.ui?.modal || {} })({
  transition: props.transition,
  fullscreen: props.fullscreen,
  overlay: props.overlay,
  scrollable: props.scrollable
}));

return (_ctx, _push, _parent, _attrs) => {
  _push(ssrRenderComponent(unref(DialogRoot), mergeProps(unref(rootProps), _attrs), {
    default: withCtx(({ open, close }, _push, _parent, _scopeId) => {
      if (_push) {
        _push(ssrRenderComponent(unref(DefineContentTemplate), null, {
          default: withCtx((_, _push, _parent, _scopeId) => {
            if (_push) {
              _push(ssrRenderComponent(unref(DialogContent), mergeProps({
                "data-slot": "content",
                class: ui.value.content({ class: [!slots.default && props.class, props.ui?.content] })
              }, contentProps.value, {
                onAfterEnter: $event => (emits('after:enter')),
                onAfterLeave: $event => (emits('after:leave'))
              }, toHandlers(contentEvents.value)), {
                default: withCtx((_, _push, _parent, _scopeId) => {
                  if (_push) {
                    if (!!slots.content && (__props.title || !!slots.title || (__props.description || !!slots.description))) {
                      _push(ssrRenderComponent(unref(VisuallyHidden), null, {
                        default: withCtx((_, _push, _parent, _scopeId) => {
                          if (_push) {
                            if (__props.title || !!slots.title) {
                              _push(ssrRenderComponent(unref(DialogTitle), null, {
                                default: withCtx((_, _push, _parent, _scopeId) => {
                                  if (_push) {
                                    ssrRenderSlot(_ctx.$slots, "title", {}, () => {
                                      _push(`${ssrInterpolate(__props.title)}`);
                                    }, _push, _parent, _scopeId);
                                  } else {
                                    return [
                                      renderSlot(_ctx.$slots, "title", {}, () => [
                                        createTextVNode(toDisplayString(__props.title), 1 /* TEXT */)
                                      ])
                                    ]
                                  }
                                }),
                                _: 2 /* DYNAMIC */
                              }, _parent, _scopeId));
                            } else {
                              _push(`<!---->`);
                            }
                            if (__props.description || !!slots.description) {
                              _push(ssrRenderComponent(unref(DialogDescription), null, {
                                default: withCtx((_, _push, _parent, _scopeId) => {
                                  if (_push) {
                                    ssrRenderSlot(_ctx.$slots, "description", {}, () => {
                                      _push(`${ssrInterpolate(__props.description)}`);
                                    }, _push, _parent, _scopeId);
                                  } else {
                                    return [
                                      renderSlot(_ctx.$slots, "description", {}, () => [
                                        createTextVNode(toDisplayString(__props.description), 1 /* TEXT */)
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
                              (__props.title || !!slots.title)
                                ? (openBlock(), createBlock(unref(DialogTitle), { key: 0 }, {
                                    default: withCtx(() => [
                                      renderSlot(_ctx.$slots, "title", {}, () => [
                                        createTextVNode(toDisplayString(__props.title), 1 /* TEXT */)
                                      ])
                                    ]),
                                    _: 3 /* FORWARDED */
                                  }))
                                : createCommentVNode("v-if", true),
                              (__props.description || !!slots.description)
                                ? (openBlock(), createBlock(unref(DialogDescription), { key: 1 }, {
                                    default: withCtx(() => [
                                      renderSlot(_ctx.$slots, "description", {}, () => [
                                        createTextVNode(toDisplayString(__props.description), 1 /* TEXT */)
                                      ])
                                    ]),
                                    _: 3 /* FORWARDED */
                                  }))
                                : createCommentVNode("v-if", true)
                            ]
                          }
                        }),
                        _: 2 /* DYNAMIC */
                      }, _parent, _scopeId));
                    } else {
                      _push(`<!---->`);
                    }
                    ssrRenderSlot(_ctx.$slots, "content", { close: close }, () => {
                      if (!!slots.header || (__props.title || !!slots.title) || (__props.description || !!slots.description) || (props.close || !!slots.close)) {
                        _push(`<div data-slot="header" class="${
                          ssrRenderClass(ui.value.header({ class: props.ui?.header }))
                        }"${
                          _scopeId
                        }>`);
                        ssrRenderSlot(_ctx.$slots, "header", { close: close }, () => {
                          _push(`<div data-slot="wrapper" class="${
                            ssrRenderClass(ui.value.wrapper({ class: props.ui?.wrapper }))
                          }"${
                            _scopeId
                          }>`);
                          if (__props.title || !!slots.title) {
                            _push(ssrRenderComponent(unref(DialogTitle), {
                              "data-slot": "title",
                              class: ui.value.title({ class: props.ui?.title })
                            }, {
                              default: withCtx((_, _push, _parent, _scopeId) => {
                                if (_push) {
                                  ssrRenderSlot(_ctx.$slots, "title", {}, () => {
                                    _push(`${ssrInterpolate(__props.title)}`);
                                  }, _push, _parent, _scopeId);
                                } else {
                                  return [
                                    renderSlot(_ctx.$slots, "title", {}, () => [
                                      createTextVNode(toDisplayString(__props.title), 1 /* TEXT */)
                                    ])
                                  ]
                                }
                              }),
                              _: 2 /* DYNAMIC */
                            }, _parent, _scopeId));
                          } else {
                            _push(`<!---->`);
                          }
                          if (__props.description || !!slots.description) {
                            _push(ssrRenderComponent(unref(DialogDescription), {
                              "data-slot": "description",
                              class: ui.value.description({ class: props.ui?.description })
                            }, {
                              default: withCtx((_, _push, _parent, _scopeId) => {
                                if (_push) {
                                  ssrRenderSlot(_ctx.$slots, "description", {}, () => {
                                    _push(`${ssrInterpolate(__props.description)}`);
                                  }, _push, _parent, _scopeId);
                                } else {
                                  return [
                                    renderSlot(_ctx.$slots, "description", {}, () => [
                                      createTextVNode(toDisplayString(__props.description), 1 /* TEXT */)
                                    ])
                                  ]
                                }
                              }),
                              _: 2 /* DYNAMIC */
                            }, _parent, _scopeId));
                          } else {
                            _push(`<!---->`);
                          }
                          _push(`</div>`);
                          ssrRenderSlot(_ctx.$slots, "actions", {}, null, _push, _parent, _scopeId);
                          if (props.close || !!slots.close) {
                            _push(ssrRenderComponent(unref(DialogClose), { "as-child": "" }, {
                              default: withCtx((_, _push, _parent, _scopeId) => {
                                if (_push) {
                                  ssrRenderSlot(_ctx.$slots, "close", { ui: ui.value }, () => {
                                    if (props.close) {
                                      _push(ssrRenderComponent(_sfc_main$1, mergeProps({
                                        icon: __props.closeIcon || unref(appConfig).ui.icons.close,
                                        color: "neutral",
                                        variant: "ghost",
                                        "aria-label": unref(t)('modal.close')
                                      }, typeof props.close === 'object' ? props.close : {}, {
                                        "data-slot": "close",
                                        class: ui.value.close({ class: props.ui?.close })
                                      }), null, _parent, _scopeId));
                                    } else {
                                      _push(`<!---->`);
                                    }
                                  }, _push, _parent, _scopeId);
                                } else {
                                  return [
                                    renderSlot(_ctx.$slots, "close", { ui: ui.value }, () => [
                                      (props.close)
                                        ? (openBlock(), createBlock(_sfc_main$1, mergeProps({
                                            key: 0,
                                            icon: __props.closeIcon || unref(appConfig).ui.icons.close,
                                            color: "neutral",
                                            variant: "ghost",
                                            "aria-label": unref(t)('modal.close')
                                          }, typeof props.close === 'object' ? props.close : {}, {
                                            "data-slot": "close",
                                            class: ui.value.close({ class: props.ui?.close })
                                          }), null, 16 /* FULL_PROPS */, ["icon", "aria-label", "class"]))
                                        : createCommentVNode("v-if", true)
                                    ])
                                  ]
                                }
                              }),
                              _: 2 /* DYNAMIC */
                            }, _parent, _scopeId));
                          } else {
                            _push(`<!---->`);
                          }
                        }, _push, _parent, _scopeId);
                        _push(`</div>`);
                      } else {
                        _push(`<!---->`);
                      }
                      if (!!slots.body) {
                        _push(`<div data-slot="body" class="${
                          ssrRenderClass(ui.value.body({ class: props.ui?.body }))
                        }"${
                          _scopeId
                        }>`);
                        ssrRenderSlot(_ctx.$slots, "body", { close: close }, null, _push, _parent, _scopeId);
                        _push(`</div>`);
                      } else {
                        _push(`<!---->`);
                      }
                      if (!!slots.footer) {
                        _push(`<div data-slot="footer" class="${
                          ssrRenderClass(ui.value.footer({ class: props.ui?.footer }))
                        }"${
                          _scopeId
                        }>`);
                        ssrRenderSlot(_ctx.$slots, "footer", { close: close }, null, _push, _parent, _scopeId);
                        _push(`</div>`);
                      } else {
                        _push(`<!---->`);
                      }
                    }, _push, _parent, _scopeId);
                  } else {
                    return [
                      (!!slots.content && (__props.title || !!slots.title || (__props.description || !!slots.description)))
                        ? (openBlock(), createBlock(unref(VisuallyHidden), { key: 0 }, {
                            default: withCtx(() => [
                              (__props.title || !!slots.title)
                                ? (openBlock(), createBlock(unref(DialogTitle), { key: 0 }, {
                                    default: withCtx(() => [
                                      renderSlot(_ctx.$slots, "title", {}, () => [
                                        createTextVNode(toDisplayString(__props.title), 1 /* TEXT */)
                                      ])
                                    ]),
                                    _: 3 /* FORWARDED */
                                  }))
                                : createCommentVNode("v-if", true),
                              (__props.description || !!slots.description)
                                ? (openBlock(), createBlock(unref(DialogDescription), { key: 1 }, {
                                    default: withCtx(() => [
                                      renderSlot(_ctx.$slots, "description", {}, () => [
                                        createTextVNode(toDisplayString(__props.description), 1 /* TEXT */)
                                      ])
                                    ]),
                                    _: 3 /* FORWARDED */
                                  }))
                                : createCommentVNode("v-if", true)
                            ]),
                            _: 3 /* FORWARDED */
                          }))
                        : createCommentVNode("v-if", true),
                      renderSlot(_ctx.$slots, "content", { close: close }, () => [
                        (!!slots.header || (__props.title || !!slots.title) || (__props.description || !!slots.description) || (props.close || !!slots.close))
                          ? (openBlock(), createBlock("div", {
                              key: 0,
                              "data-slot": "header",
                              class: ui.value.header({ class: props.ui?.header })
                            }, [
                              renderSlot(_ctx.$slots, "header", { close: close }, () => [
                                createVNode("div", {
                                  "data-slot": "wrapper",
                                  class: ui.value.wrapper({ class: props.ui?.wrapper })
                                }, [
                                  (__props.title || !!slots.title)
                                    ? (openBlock(), createBlock(unref(DialogTitle), {
                                        key: 0,
                                        "data-slot": "title",
                                        class: ui.value.title({ class: props.ui?.title })
                                      }, {
                                        default: withCtx(() => [
                                          renderSlot(_ctx.$slots, "title", {}, () => [
                                            createTextVNode(toDisplayString(__props.title), 1 /* TEXT */)
                                          ])
                                        ]),
                                        _: 3 /* FORWARDED */
                                      }, 8 /* PROPS */, ["class"]))
                                    : createCommentVNode("v-if", true),
                                  (__props.description || !!slots.description)
                                    ? (openBlock(), createBlock(unref(DialogDescription), {
                                        key: 1,
                                        "data-slot": "description",
                                        class: ui.value.description({ class: props.ui?.description })
                                      }, {
                                        default: withCtx(() => [
                                          renderSlot(_ctx.$slots, "description", {}, () => [
                                            createTextVNode(toDisplayString(__props.description), 1 /* TEXT */)
                                          ])
                                        ]),
                                        _: 3 /* FORWARDED */
                                      }, 8 /* PROPS */, ["class"]))
                                    : createCommentVNode("v-if", true)
                                ], 2 /* CLASS */),
                                renderSlot(_ctx.$slots, "actions"),
                                (props.close || !!slots.close)
                                  ? (openBlock(), createBlock(unref(DialogClose), {
                                      key: 0,
                                      "as-child": ""
                                    }, {
                                      default: withCtx(() => [
                                        renderSlot(_ctx.$slots, "close", { ui: ui.value }, () => [
                                          (props.close)
                                            ? (openBlock(), createBlock(_sfc_main$1, mergeProps({
                                                key: 0,
                                                icon: __props.closeIcon || unref(appConfig).ui.icons.close,
                                                color: "neutral",
                                                variant: "ghost",
                                                "aria-label": unref(t)('modal.close')
                                              }, typeof props.close === 'object' ? props.close : {}, {
                                                "data-slot": "close",
                                                class: ui.value.close({ class: props.ui?.close })
                                              }), null, 16 /* FULL_PROPS */, ["icon", "aria-label", "class"]))
                                            : createCommentVNode("v-if", true)
                                        ])
                                      ]),
                                      _: 2 /* DYNAMIC */
                                    }, 1024 /* DYNAMIC_SLOTS */))
                                  : createCommentVNode("v-if", true)
                              ])
                            ], 2 /* CLASS */))
                          : createCommentVNode("v-if", true),
                        (!!slots.body)
                          ? (openBlock(), createBlock("div", {
                              key: 1,
                              "data-slot": "body",
                              class: ui.value.body({ class: props.ui?.body })
                            }, [
                              renderSlot(_ctx.$slots, "body", { close: close })
                            ], 2 /* CLASS */))
                          : createCommentVNode("v-if", true),
                        (!!slots.footer)
                          ? (openBlock(), createBlock("div", {
                              key: 2,
                              "data-slot": "footer",
                              class: ui.value.footer({ class: props.ui?.footer })
                            }, [
                              renderSlot(_ctx.$slots, "footer", { close: close })
                            ], 2 /* CLASS */))
                          : createCommentVNode("v-if", true)
                      ])
                    ]
                  }
                }),
                _: 2 /* DYNAMIC */
              }, _parent, _scopeId));
            } else {
              return [
                createVNode(unref(DialogContent), mergeProps({
                  "data-slot": "content",
                  class: ui.value.content({ class: [!slots.default && props.class, props.ui?.content] })
                }, contentProps.value, {
                  onAfterEnter: $event => (emits('after:enter')),
                  onAfterLeave: $event => (emits('after:leave'))
                }, toHandlers(contentEvents.value)), {
                  default: withCtx(() => [
                    (!!slots.content && (__props.title || !!slots.title || (__props.description || !!slots.description)))
                      ? (openBlock(), createBlock(unref(VisuallyHidden), { key: 0 }, {
                          default: withCtx(() => [
                            (__props.title || !!slots.title)
                              ? (openBlock(), createBlock(unref(DialogTitle), { key: 0 }, {
                                  default: withCtx(() => [
                                    renderSlot(_ctx.$slots, "title", {}, () => [
                                      createTextVNode(toDisplayString(__props.title), 1 /* TEXT */)
                                    ])
                                  ]),
                                  _: 3 /* FORWARDED */
                                }))
                              : createCommentVNode("v-if", true),
                            (__props.description || !!slots.description)
                              ? (openBlock(), createBlock(unref(DialogDescription), { key: 1 }, {
                                  default: withCtx(() => [
                                    renderSlot(_ctx.$slots, "description", {}, () => [
                                      createTextVNode(toDisplayString(__props.description), 1 /* TEXT */)
                                    ])
                                  ]),
                                  _: 3 /* FORWARDED */
                                }))
                              : createCommentVNode("v-if", true)
                          ]),
                          _: 3 /* FORWARDED */
                        }))
                      : createCommentVNode("v-if", true),
                    renderSlot(_ctx.$slots, "content", { close: close }, () => [
                      (!!slots.header || (__props.title || !!slots.title) || (__props.description || !!slots.description) || (props.close || !!slots.close))
                        ? (openBlock(), createBlock("div", {
                            key: 0,
                            "data-slot": "header",
                            class: ui.value.header({ class: props.ui?.header })
                          }, [
                            renderSlot(_ctx.$slots, "header", { close: close }, () => [
                              createVNode("div", {
                                "data-slot": "wrapper",
                                class: ui.value.wrapper({ class: props.ui?.wrapper })
                              }, [
                                (__props.title || !!slots.title)
                                  ? (openBlock(), createBlock(unref(DialogTitle), {
                                      key: 0,
                                      "data-slot": "title",
                                      class: ui.value.title({ class: props.ui?.title })
                                    }, {
                                      default: withCtx(() => [
                                        renderSlot(_ctx.$slots, "title", {}, () => [
                                          createTextVNode(toDisplayString(__props.title), 1 /* TEXT */)
                                        ])
                                      ]),
                                      _: 3 /* FORWARDED */
                                    }, 8 /* PROPS */, ["class"]))
                                  : createCommentVNode("v-if", true),
                                (__props.description || !!slots.description)
                                  ? (openBlock(), createBlock(unref(DialogDescription), {
                                      key: 1,
                                      "data-slot": "description",
                                      class: ui.value.description({ class: props.ui?.description })
                                    }, {
                                      default: withCtx(() => [
                                        renderSlot(_ctx.$slots, "description", {}, () => [
                                          createTextVNode(toDisplayString(__props.description), 1 /* TEXT */)
                                        ])
                                      ]),
                                      _: 3 /* FORWARDED */
                                    }, 8 /* PROPS */, ["class"]))
                                  : createCommentVNode("v-if", true)
                              ], 2 /* CLASS */),
                              renderSlot(_ctx.$slots, "actions"),
                              (props.close || !!slots.close)
                                ? (openBlock(), createBlock(unref(DialogClose), {
                                    key: 0,
                                    "as-child": ""
                                  }, {
                                    default: withCtx(() => [
                                      renderSlot(_ctx.$slots, "close", { ui: ui.value }, () => [
                                        (props.close)
                                          ? (openBlock(), createBlock(_sfc_main$1, mergeProps({
                                              key: 0,
                                              icon: __props.closeIcon || unref(appConfig).ui.icons.close,
                                              color: "neutral",
                                              variant: "ghost",
                                              "aria-label": unref(t)('modal.close')
                                            }, typeof props.close === 'object' ? props.close : {}, {
                                              "data-slot": "close",
                                              class: ui.value.close({ class: props.ui?.close })
                                            }), null, 16 /* FULL_PROPS */, ["icon", "aria-label", "class"]))
                                          : createCommentVNode("v-if", true)
                                      ])
                                    ]),
                                    _: 2 /* DYNAMIC */
                                  }, 1024 /* DYNAMIC_SLOTS */))
                                : createCommentVNode("v-if", true)
                            ])
                          ], 2 /* CLASS */))
                        : createCommentVNode("v-if", true),
                      (!!slots.body)
                        ? (openBlock(), createBlock("div", {
                            key: 1,
                            "data-slot": "body",
                            class: ui.value.body({ class: props.ui?.body })
                          }, [
                            renderSlot(_ctx.$slots, "body", { close: close })
                          ], 2 /* CLASS */))
                        : createCommentVNode("v-if", true),
                      (!!slots.footer)
                        ? (openBlock(), createBlock("div", {
                            key: 2,
                            "data-slot": "footer",
                            class: ui.value.footer({ class: props.ui?.footer })
                          }, [
                            renderSlot(_ctx.$slots, "footer", { close: close })
                          ], 2 /* CLASS */))
                        : createCommentVNode("v-if", true)
                    ])
                  ]),
                  _: 2 /* DYNAMIC */
                }, 1040 /* FULL_PROPS, DYNAMIC_SLOTS */, ["class", "onAfterEnter", "onAfterLeave"])
              ]
            }
          }),
          _: 2 /* DYNAMIC */
        }, _parent, _scopeId));
        if (!!slots.default) {
          _push(ssrRenderComponent(unref(DialogTrigger), {
            "as-child": "",
            class: props.class
          }, {
            default: withCtx((_, _push, _parent, _scopeId) => {
              if (_push) {
                ssrRenderSlot(_ctx.$slots, "default", { open: open }, null, _push, _parent, _scopeId);
              } else {
                return [
                  renderSlot(_ctx.$slots, "default", { open: open })
                ]
              }
            }),
            _: 2 /* DYNAMIC */
          }, _parent, _scopeId));
        } else {
          _push(`<!---->`);
        }
        _push(ssrRenderComponent(unref(DialogPortal), unref(portalProps), {
          default: withCtx((_, _push, _parent, _scopeId) => {
            if (_push) {
              if (__props.scrollable) {
                _push(ssrRenderComponent(unref(DialogOverlay), {
                  "data-slot": "overlay",
                  class: ui.value.overlay({ class: props.ui?.overlay })
                }, {
                  default: withCtx((_, _push, _parent, _scopeId) => {
                    if (_push) {
                      _push(ssrRenderComponent(unref(ReuseContentTemplate), null, null, _parent, _scopeId));
                    } else {
                      return [
                        createVNode(unref(ReuseContentTemplate))
                      ]
                    }
                  }),
                  _: 2 /* DYNAMIC */
                }, _parent, _scopeId));
              } else {
                _push(`<!--[-->`);
                if (__props.overlay) {
                  _push(ssrRenderComponent(unref(DialogOverlay), {
                    "data-slot": "overlay",
                    class: ui.value.overlay({ class: props.ui?.overlay })
                  }, null, _parent, _scopeId));
                } else {
                  _push(`<!---->`);
                }
                _push(ssrRenderComponent(unref(ReuseContentTemplate), null, null, _parent, _scopeId));
                _push(`<!--]-->`);
              }
            } else {
              return [
                (__props.scrollable)
                  ? (openBlock(), createBlock(unref(DialogOverlay), {
                      key: 0,
                      "data-slot": "overlay",
                      class: ui.value.overlay({ class: props.ui?.overlay })
                    }, {
                      default: withCtx(() => [
                        createVNode(unref(ReuseContentTemplate))
                      ]),
                      _: 1 /* STABLE */
                    }, 8 /* PROPS */, ["class"]))
                  : (openBlock(), createBlock(Fragment, { key: 1 }, [
                      (__props.overlay)
                        ? (openBlock(), createBlock(unref(DialogOverlay), {
                            key: 0,
                            "data-slot": "overlay",
                            class: ui.value.overlay({ class: props.ui?.overlay })
                          }, null, 8 /* PROPS */, ["class"]))
                        : createCommentVNode("v-if", true),
                      createVNode(unref(ReuseContentTemplate))
                    ], 64 /* STABLE_FRAGMENT */))
              ]
            }
          }),
          _: 2 /* DYNAMIC */
        }, _parent, _scopeId));
      } else {
        return [
          createVNode(unref(DefineContentTemplate), null, {
            default: withCtx(() => [
              createVNode(unref(DialogContent), mergeProps({
                "data-slot": "content",
                class: ui.value.content({ class: [!slots.default && props.class, props.ui?.content] })
              }, contentProps.value, {
                onAfterEnter: $event => (emits('after:enter')),
                onAfterLeave: $event => (emits('after:leave'))
              }, toHandlers(contentEvents.value)), {
                default: withCtx(() => [
                  (!!slots.content && (__props.title || !!slots.title || (__props.description || !!slots.description)))
                    ? (openBlock(), createBlock(unref(VisuallyHidden), { key: 0 }, {
                        default: withCtx(() => [
                          (__props.title || !!slots.title)
                            ? (openBlock(), createBlock(unref(DialogTitle), { key: 0 }, {
                                default: withCtx(() => [
                                  renderSlot(_ctx.$slots, "title", {}, () => [
                                    createTextVNode(toDisplayString(__props.title), 1 /* TEXT */)
                                  ])
                                ]),
                                _: 3 /* FORWARDED */
                              }))
                            : createCommentVNode("v-if", true),
                          (__props.description || !!slots.description)
                            ? (openBlock(), createBlock(unref(DialogDescription), { key: 1 }, {
                                default: withCtx(() => [
                                  renderSlot(_ctx.$slots, "description", {}, () => [
                                    createTextVNode(toDisplayString(__props.description), 1 /* TEXT */)
                                  ])
                                ]),
                                _: 3 /* FORWARDED */
                              }))
                            : createCommentVNode("v-if", true)
                        ]),
                        _: 3 /* FORWARDED */
                      }))
                    : createCommentVNode("v-if", true),
                  renderSlot(_ctx.$slots, "content", { close: close }, () => [
                    (!!slots.header || (__props.title || !!slots.title) || (__props.description || !!slots.description) || (props.close || !!slots.close))
                      ? (openBlock(), createBlock("div", {
                          key: 0,
                          "data-slot": "header",
                          class: ui.value.header({ class: props.ui?.header })
                        }, [
                          renderSlot(_ctx.$slots, "header", { close: close }, () => [
                            createVNode("div", {
                              "data-slot": "wrapper",
                              class: ui.value.wrapper({ class: props.ui?.wrapper })
                            }, [
                              (__props.title || !!slots.title)
                                ? (openBlock(), createBlock(unref(DialogTitle), {
                                    key: 0,
                                    "data-slot": "title",
                                    class: ui.value.title({ class: props.ui?.title })
                                  }, {
                                    default: withCtx(() => [
                                      renderSlot(_ctx.$slots, "title", {}, () => [
                                        createTextVNode(toDisplayString(__props.title), 1 /* TEXT */)
                                      ])
                                    ]),
                                    _: 3 /* FORWARDED */
                                  }, 8 /* PROPS */, ["class"]))
                                : createCommentVNode("v-if", true),
                              (__props.description || !!slots.description)
                                ? (openBlock(), createBlock(unref(DialogDescription), {
                                    key: 1,
                                    "data-slot": "description",
                                    class: ui.value.description({ class: props.ui?.description })
                                  }, {
                                    default: withCtx(() => [
                                      renderSlot(_ctx.$slots, "description", {}, () => [
                                        createTextVNode(toDisplayString(__props.description), 1 /* TEXT */)
                                      ])
                                    ]),
                                    _: 3 /* FORWARDED */
                                  }, 8 /* PROPS */, ["class"]))
                                : createCommentVNode("v-if", true)
                            ], 2 /* CLASS */),
                            renderSlot(_ctx.$slots, "actions"),
                            (props.close || !!slots.close)
                              ? (openBlock(), createBlock(unref(DialogClose), {
                                  key: 0,
                                  "as-child": ""
                                }, {
                                  default: withCtx(() => [
                                    renderSlot(_ctx.$slots, "close", { ui: ui.value }, () => [
                                      (props.close)
                                        ? (openBlock(), createBlock(_sfc_main$1, mergeProps({
                                            key: 0,
                                            icon: __props.closeIcon || unref(appConfig).ui.icons.close,
                                            color: "neutral",
                                            variant: "ghost",
                                            "aria-label": unref(t)('modal.close')
                                          }, typeof props.close === 'object' ? props.close : {}, {
                                            "data-slot": "close",
                                            class: ui.value.close({ class: props.ui?.close })
                                          }), null, 16 /* FULL_PROPS */, ["icon", "aria-label", "class"]))
                                        : createCommentVNode("v-if", true)
                                    ])
                                  ]),
                                  _: 2 /* DYNAMIC */
                                }, 1024 /* DYNAMIC_SLOTS */))
                              : createCommentVNode("v-if", true)
                          ])
                        ], 2 /* CLASS */))
                      : createCommentVNode("v-if", true),
                    (!!slots.body)
                      ? (openBlock(), createBlock("div", {
                          key: 1,
                          "data-slot": "body",
                          class: ui.value.body({ class: props.ui?.body })
                        }, [
                          renderSlot(_ctx.$slots, "body", { close: close })
                        ], 2 /* CLASS */))
                      : createCommentVNode("v-if", true),
                    (!!slots.footer)
                      ? (openBlock(), createBlock("div", {
                          key: 2,
                          "data-slot": "footer",
                          class: ui.value.footer({ class: props.ui?.footer })
                        }, [
                          renderSlot(_ctx.$slots, "footer", { close: close })
                        ], 2 /* CLASS */))
                      : createCommentVNode("v-if", true)
                  ])
                ]),
                _: 2 /* DYNAMIC */
              }, 1040 /* FULL_PROPS, DYNAMIC_SLOTS */, ["class", "onAfterEnter", "onAfterLeave"])
            ]),
            _: 2 /* DYNAMIC */
          }, 1024 /* DYNAMIC_SLOTS */),
          (!!slots.default)
            ? (openBlock(), createBlock(unref(DialogTrigger), {
                key: 0,
                "as-child": "",
                class: props.class
              }, {
                default: withCtx(() => [
                  renderSlot(_ctx.$slots, "default", { open: open })
                ]),
                _: 2 /* DYNAMIC */
              }, 1032 /* PROPS, DYNAMIC_SLOTS */, ["class"]))
            : createCommentVNode("v-if", true),
          createVNode(unref(DialogPortal), unref(portalProps), {
            default: withCtx(() => [
              (__props.scrollable)
                ? (openBlock(), createBlock(unref(DialogOverlay), {
                    key: 0,
                    "data-slot": "overlay",
                    class: ui.value.overlay({ class: props.ui?.overlay })
                  }, {
                    default: withCtx(() => [
                      createVNode(unref(ReuseContentTemplate))
                    ]),
                    _: 1 /* STABLE */
                  }, 8 /* PROPS */, ["class"]))
                : (openBlock(), createBlock(Fragment, { key: 1 }, [
                    (__props.overlay)
                      ? (openBlock(), createBlock(unref(DialogOverlay), {
                          key: 0,
                          "data-slot": "overlay",
                          class: ui.value.overlay({ class: props.ui?.overlay })
                        }, null, 8 /* PROPS */, ["class"]))
                      : createCommentVNode("v-if", true),
                    createVNode(unref(ReuseContentTemplate))
                  ], 64 /* STABLE_FRAGMENT */))
            ]),
            _: 1 /* STABLE */
          }, 16 /* FULL_PROPS */)
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
  ;(ssrContext.modules || (ssrContext.modules = new Set())).add("node_modules/@nuxt/ui/dist/runtime/components/Modal.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : undefined
};

export { _sfc_main as _ };
