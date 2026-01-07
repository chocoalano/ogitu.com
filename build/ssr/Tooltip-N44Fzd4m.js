import { useSlots, toRef, computed, unref, mergeProps, withCtx, renderSlot, createBlock, createCommentVNode, openBlock, toDisplayString, Fragment, renderList, createVNode, useSSRContext } from 'vue';
import { ssrRenderComponent, ssrRenderSlot, ssrRenderClass, ssrInterpolate, ssrRenderList } from 'vue/server-renderer';
import { defu } from 'defu';
import { useForwardPropsEmits, TooltipRoot, TooltipTrigger, TooltipPortal, TooltipContent, TooltipArrow } from 'reka-ui';
import { reactivePick } from '@vueuse/core';
import { a as useAppConfig } from './virtual_nuxt-ui-plugins-BqI2j5ZJ.js';
import { g as usePortal, h as _sfc_main$1 } from './Badge-DaOjA2YD.js';
import { t as tv } from './Button-BBveOjhJ.js';

const theme = {
  "slots": {
    "content": "flex items-center gap-1 bg-default text-highlighted shadow-sm rounded-sm ring ring-default h-6 px-2.5 py-1 text-xs select-none data-[state=delayed-open]:animate-[scale-in_100ms_ease-out] data-[state=closed]:animate-[scale-out_100ms_ease-in] origin-(--reka-tooltip-content-transform-origin) pointer-events-auto",
    "arrow": "fill-default",
    "text": "truncate",
    "kbds": "hidden lg:inline-flex items-center shrink-0 gap-0.5 not-first-of-type:before:content-['·'] not-first-of-type:before:me-0.5",
    "kbdsSize": "sm"
  }
};

const _sfc_main = {
  __name: 'Tooltip',
  __ssrInlineRender: true,
  props: {
  text: { type: String, required: false },
  kbds: { type: Array, required: false },
  content: { type: Object, required: false },
  arrow: { type: [Boolean, Object], required: false },
  portal: { type: [Boolean, String], required: false, skipCheck: true, default: true },
  reference: { type: null, required: false },
  class: { type: null, required: false },
  ui: { type: null, required: false },
  defaultOpen: { type: Boolean, required: false },
  open: { type: Boolean, required: false },
  delayDuration: { type: Number, required: false },
  disableHoverableContent: { type: Boolean, required: false },
  disableClosingTrigger: { type: Boolean, required: false },
  disabled: { type: Boolean, required: false },
  ignoreNonKeyboardFocus: { type: Boolean, required: false }
},
  emits: ["update:open"],
  setup(__props, { emit: __emit }) {

const props = __props;
const emits = __emit;
const slots = useSlots();
const appConfig = useAppConfig();
const rootProps = useForwardPropsEmits(reactivePick(props, "defaultOpen", "open", "delayDuration", "disableHoverableContent", "disableClosingTrigger", "ignoreNonKeyboardFocus"), emits);
const portalProps = usePortal(toRef(() => props.portal));
const contentProps = toRef(() => defu(props.content, { side: "bottom", sideOffset: 8, collisionPadding: 8 }));
const arrowProps = toRef(() => props.arrow);
const ui = computed(() => tv({ extend: tv(theme), ...appConfig.ui?.tooltip || {} })({
  side: contentProps.value.side
}));

return (_ctx, _push, _parent, _attrs) => {
  _push(ssrRenderComponent(unref(TooltipRoot), mergeProps(unref(rootProps), {
    disabled: !(__props.text || __props.kbds?.length || !!slots.content) || props.disabled
  }, _attrs), {
    default: withCtx(({ open }, _push, _parent, _scopeId) => {
      if (_push) {
        if (!!slots.default || !!__props.reference) {
          _push(ssrRenderComponent(unref(TooltipTrigger), mergeProps(_ctx.$attrs, {
            "as-child": "",
            reference: __props.reference,
            class: props.class
          }), {
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
        _push(ssrRenderComponent(unref(TooltipPortal), unref(portalProps), {
          default: withCtx((_, _push, _parent, _scopeId) => {
            if (_push) {
              _push(ssrRenderComponent(unref(TooltipContent), mergeProps(contentProps.value, {
                "data-slot": "content",
                class: ui.value.content({ class: [!slots.default && props.class, props.ui?.content] })
              }), {
                default: withCtx((_, _push, _parent, _scopeId) => {
                  if (_push) {
                    ssrRenderSlot(_ctx.$slots, "content", { ui: ui.value }, () => {
                      if (__props.text) {
                        _push(`<span data-slot="text" class="${
                          ssrRenderClass(ui.value.text({ class: props.ui?.text }))
                        }"${
                          _scopeId
                        }>${
                          ssrInterpolate(__props.text)
                        }</span>`);
                      } else {
                        _push(`<!---->`);
                      }
                      if (__props.kbds?.length) {
                        _push(`<span data-slot="kbds" class="${
                          ssrRenderClass(ui.value.kbds({ class: props.ui?.kbds }))
                        }"${
                          _scopeId
                        }><!--[-->`);
                        ssrRenderList(__props.kbds, (kbd, index) => {
                          _push(ssrRenderComponent(_sfc_main$1, mergeProps({
                            key: index,
                            size: props.ui?.kbdsSize || ui.value.kbdsSize()
                          }, { ref_for: true }, typeof kbd === 'string' ? { value: kbd } : kbd), null, _parent, _scopeId));
                        });
                        _push(`<!--]--></span>`);
                      } else {
                        _push(`<!---->`);
                      }
                    }, _push, _parent, _scopeId);
                    if (!!__props.arrow) {
                      _push(ssrRenderComponent(unref(TooltipArrow), mergeProps(arrowProps.value, {
                        "data-slot": "arrow",
                        class: ui.value.arrow({ class: props.ui?.arrow })
                      }), null, _parent, _scopeId));
                    } else {
                      _push(`<!---->`);
                    }
                  } else {
                    return [
                      renderSlot(_ctx.$slots, "content", { ui: ui.value }, () => [
                        (__props.text)
                          ? (openBlock(), createBlock("span", {
                              key: 0,
                              "data-slot": "text",
                              class: ui.value.text({ class: props.ui?.text })
                            }, toDisplayString(__props.text), 3 /* TEXT, CLASS */))
                          : createCommentVNode("v-if", true),
                        (__props.kbds?.length)
                          ? (openBlock(), createBlock("span", {
                              key: 1,
                              "data-slot": "kbds",
                              class: ui.value.kbds({ class: props.ui?.kbds })
                            }, [
                              (openBlock(true), createBlock(Fragment, null, renderList(__props.kbds, (kbd, index) => {
                                return (openBlock(), createBlock(_sfc_main$1, mergeProps({
                                  key: index,
                                  size: props.ui?.kbdsSize || ui.value.kbdsSize()
                                }, { ref_for: true }, typeof kbd === 'string' ? { value: kbd } : kbd), null, 16 /* FULL_PROPS */, ["size"]))
                              }), 128 /* KEYED_FRAGMENT */))
                            ], 2 /* CLASS */))
                          : createCommentVNode("v-if", true)
                      ]),
                      (!!__props.arrow)
                        ? (openBlock(), createBlock(unref(TooltipArrow), mergeProps({ key: 0 }, arrowProps.value, {
                            "data-slot": "arrow",
                            class: ui.value.arrow({ class: props.ui?.arrow })
                          }), null, 16 /* FULL_PROPS */, ["class"]))
                        : createCommentVNode("v-if", true)
                    ]
                  }
                }),
                _: 2 /* DYNAMIC */
              }, _parent, _scopeId));
            } else {
              return [
                createVNode(unref(TooltipContent), mergeProps(contentProps.value, {
                  "data-slot": "content",
                  class: ui.value.content({ class: [!slots.default && props.class, props.ui?.content] })
                }), {
                  default: withCtx(() => [
                    renderSlot(_ctx.$slots, "content", { ui: ui.value }, () => [
                      (__props.text)
                        ? (openBlock(), createBlock("span", {
                            key: 0,
                            "data-slot": "text",
                            class: ui.value.text({ class: props.ui?.text })
                          }, toDisplayString(__props.text), 3 /* TEXT, CLASS */))
                        : createCommentVNode("v-if", true),
                      (__props.kbds?.length)
                        ? (openBlock(), createBlock("span", {
                            key: 1,
                            "data-slot": "kbds",
                            class: ui.value.kbds({ class: props.ui?.kbds })
                          }, [
                            (openBlock(true), createBlock(Fragment, null, renderList(__props.kbds, (kbd, index) => {
                              return (openBlock(), createBlock(_sfc_main$1, mergeProps({
                                key: index,
                                size: props.ui?.kbdsSize || ui.value.kbdsSize()
                              }, { ref_for: true }, typeof kbd === 'string' ? { value: kbd } : kbd), null, 16 /* FULL_PROPS */, ["size"]))
                            }), 128 /* KEYED_FRAGMENT */))
                          ], 2 /* CLASS */))
                        : createCommentVNode("v-if", true)
                    ]),
                    (!!__props.arrow)
                      ? (openBlock(), createBlock(unref(TooltipArrow), mergeProps({ key: 0 }, arrowProps.value, {
                          "data-slot": "arrow",
                          class: ui.value.arrow({ class: props.ui?.arrow })
                        }), null, 16 /* FULL_PROPS */, ["class"]))
                      : createCommentVNode("v-if", true)
                  ]),
                  _: 3 /* FORWARDED */
                }, 16 /* FULL_PROPS */, ["class"])
              ]
            }
          }),
          _: 2 /* DYNAMIC */
        }, _parent, _scopeId));
      } else {
        return [
          (!!slots.default || !!__props.reference)
            ? (openBlock(), createBlock(unref(TooltipTrigger), mergeProps({ key: 0 }, _ctx.$attrs, {
                "as-child": "",
                reference: __props.reference,
                class: props.class
              }), {
                default: withCtx(() => [
                  renderSlot(_ctx.$slots, "default", { open: open })
                ]),
                _: 2 /* DYNAMIC */
              }, 1040 /* FULL_PROPS, DYNAMIC_SLOTS */, ["reference", "class"]))
            : createCommentVNode("v-if", true),
          createVNode(unref(TooltipPortal), unref(portalProps), {
            default: withCtx(() => [
              createVNode(unref(TooltipContent), mergeProps(contentProps.value, {
                "data-slot": "content",
                class: ui.value.content({ class: [!slots.default && props.class, props.ui?.content] })
              }), {
                default: withCtx(() => [
                  renderSlot(_ctx.$slots, "content", { ui: ui.value }, () => [
                    (__props.text)
                      ? (openBlock(), createBlock("span", {
                          key: 0,
                          "data-slot": "text",
                          class: ui.value.text({ class: props.ui?.text })
                        }, toDisplayString(__props.text), 3 /* TEXT, CLASS */))
                      : createCommentVNode("v-if", true),
                    (__props.kbds?.length)
                      ? (openBlock(), createBlock("span", {
                          key: 1,
                          "data-slot": "kbds",
                          class: ui.value.kbds({ class: props.ui?.kbds })
                        }, [
                          (openBlock(true), createBlock(Fragment, null, renderList(__props.kbds, (kbd, index) => {
                            return (openBlock(), createBlock(_sfc_main$1, mergeProps({
                              key: index,
                              size: props.ui?.kbdsSize || ui.value.kbdsSize()
                            }, { ref_for: true }, typeof kbd === 'string' ? { value: kbd } : kbd), null, 16 /* FULL_PROPS */, ["size"]))
                          }), 128 /* KEYED_FRAGMENT */))
                        ], 2 /* CLASS */))
                      : createCommentVNode("v-if", true)
                  ]),
                  (!!__props.arrow)
                    ? (openBlock(), createBlock(unref(TooltipArrow), mergeProps({ key: 0 }, arrowProps.value, {
                        "data-slot": "arrow",
                        class: ui.value.arrow({ class: props.ui?.arrow })
                      }), null, 16 /* FULL_PROPS */, ["class"]))
                    : createCommentVNode("v-if", true)
                ]),
                _: 3 /* FORWARDED */
              }, 16 /* FULL_PROPS */, ["class"])
            ]),
            _: 3 /* FORWARDED */
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
  ;(ssrContext.modules || (ssrContext.modules = new Set())).add("node_modules/@nuxt/ui/dist/runtime/components/Tooltip.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : undefined
};

export { _sfc_main as _ };
