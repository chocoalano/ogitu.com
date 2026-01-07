import { useSlots, computed, ref, unref, mergeProps, withCtx, renderSlot, createBlock, createCommentVNode, openBlock, createTextVNode, toDisplayString, createVNode, Fragment, renderList, useSSRContext, defineComponent, watch } from 'vue';
import { ssrRenderComponent, ssrRenderSlot, ssrRenderList, ssrRenderClass, ssrInterpolate, ssrRenderAttrs, ssrRenderAttr } from 'vue/server-renderer';
import { useForwardPropsEmits, TabsRoot, TabsList, TabsIndicator, TabsTrigger, TabsContent } from 'reka-ui';
import { reactivePick } from '@vueuse/core';
import { a as useAppConfig, g as get } from './virtual_nuxt-ui-plugins-CrG8Uaxr.js';
import { t as tv, _ as _sfc_main$3, b as _sfc_main$4, a as _sfc_main$8 } from './Button-BTdvmZ8N.js';
import { a as _sfc_main$5, _ as _sfc_main$a } from './Badge-CQlYH3Fo.js';
import { _ as _sfc_main$d } from './Card-h3oZeDee.js';
import { _ as _sfc_main$c } from './Modal-VctJV7vb.js';
import { B as BLOCK_DEFINITIONS, d as BLOCK_CATEGORIES } from './admin_article-Cy4gA9-J.js';
import { _ as _sfc_main$b } from './Alert-B0mCzyXY.js';
import { _ as _sfc_main$9 } from './Checkbox-DCS-_c5K.js';
import { _ as _sfc_main$7 } from './Select-mEsLh9Ds.js';
import { _ as _sfc_main$6 } from './Textarea-yrK84h3-.js';

const theme = {
  "slots": {
    "root": "flex items-center gap-2",
    "list": "relative flex p-1 group",
    "indicator": "absolute transition-[translate,width] duration-200",
    "trigger": [
      "group relative inline-flex items-center min-w-0 data-[state=inactive]:text-muted hover:data-[state=inactive]:not-disabled:text-default font-medium rounded-md disabled:cursor-not-allowed disabled:opacity-75",
      "transition-colors"
    ],
    "leadingIcon": "shrink-0",
    "leadingAvatar": "shrink-0",
    "leadingAvatarSize": "",
    "label": "truncate",
    "trailingBadge": "shrink-0",
    "trailingBadgeSize": "sm",
    "content": "focus:outline-none w-full"
  },
  "variants": {
    "color": {
      "primary": "",
      "secondary": "",
      "success": "",
      "info": "",
      "warning": "",
      "error": "",
      "neutral": ""
    },
    "variant": {
      "pill": {
        "list": "bg-elevated rounded-lg",
        "trigger": "grow",
        "indicator": "rounded-md shadow-xs"
      },
      "link": {
        "list": "border-default",
        "indicator": "rounded-full",
        "trigger": "focus:outline-none"
      }
    },
    "orientation": {
      "horizontal": {
        "root": "flex-col",
        "list": "w-full",
        "indicator": "left-0 w-(--reka-tabs-indicator-size) translate-x-(--reka-tabs-indicator-position)",
        "trigger": "justify-center"
      },
      "vertical": {
        "list": "flex-col",
        "indicator": "top-0 h-(--reka-tabs-indicator-size) translate-y-(--reka-tabs-indicator-position)"
      }
    },
    "size": {
      "xs": {
        "trigger": "px-2 py-1 text-xs gap-1",
        "leadingIcon": "size-4",
        "leadingAvatarSize": "3xs"
      },
      "sm": {
        "trigger": "px-2.5 py-1.5 text-xs gap-1.5",
        "leadingIcon": "size-4",
        "leadingAvatarSize": "3xs"
      },
      "md": {
        "trigger": "px-3 py-1.5 text-sm gap-1.5",
        "leadingIcon": "size-5",
        "leadingAvatarSize": "2xs"
      },
      "lg": {
        "trigger": "px-3 py-2 text-sm gap-2",
        "leadingIcon": "size-5",
        "leadingAvatarSize": "2xs"
      },
      "xl": {
        "trigger": "px-3 py-2 text-base gap-2",
        "leadingIcon": "size-6",
        "leadingAvatarSize": "xs"
      }
    }
  },
  "compoundVariants": [
    {
      "orientation": "horizontal",
      "variant": "pill",
      "class": {
        "indicator": "inset-y-1"
      }
    },
    {
      "orientation": "horizontal",
      "variant": "link",
      "class": {
        "list": "border-b -mb-px",
        "indicator": "-bottom-px h-px"
      }
    },
    {
      "orientation": "vertical",
      "variant": "pill",
      "class": {
        "indicator": "inset-x-1",
        "list": "items-center"
      }
    },
    {
      "orientation": "vertical",
      "variant": "link",
      "class": {
        "list": "border-s -ms-px",
        "indicator": "-start-px w-px"
      }
    },
    {
      "color": "primary",
      "variant": "pill",
      "class": {
        "indicator": "bg-primary",
        "trigger": "data-[state=active]:text-inverted focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
      }
    },
    {
      "color": "secondary",
      "variant": "pill",
      "class": {
        "indicator": "bg-secondary",
        "trigger": "data-[state=active]:text-inverted focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary"
      }
    },
    {
      "color": "success",
      "variant": "pill",
      "class": {
        "indicator": "bg-success",
        "trigger": "data-[state=active]:text-inverted focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-success"
      }
    },
    {
      "color": "info",
      "variant": "pill",
      "class": {
        "indicator": "bg-info",
        "trigger": "data-[state=active]:text-inverted focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-info"
      }
    },
    {
      "color": "warning",
      "variant": "pill",
      "class": {
        "indicator": "bg-warning",
        "trigger": "data-[state=active]:text-inverted focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-warning"
      }
    },
    {
      "color": "error",
      "variant": "pill",
      "class": {
        "indicator": "bg-error",
        "trigger": "data-[state=active]:text-inverted focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-error"
      }
    },
    {
      "color": "neutral",
      "variant": "pill",
      "class": {
        "indicator": "bg-inverted",
        "trigger": "data-[state=active]:text-inverted focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-inverted"
      }
    },
    {
      "color": "primary",
      "variant": "link",
      "class": {
        "indicator": "bg-primary",
        "trigger": "data-[state=active]:text-primary focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary"
      }
    },
    {
      "color": "secondary",
      "variant": "link",
      "class": {
        "indicator": "bg-secondary",
        "trigger": "data-[state=active]:text-secondary focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-secondary"
      }
    },
    {
      "color": "success",
      "variant": "link",
      "class": {
        "indicator": "bg-success",
        "trigger": "data-[state=active]:text-success focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-success"
      }
    },
    {
      "color": "info",
      "variant": "link",
      "class": {
        "indicator": "bg-info",
        "trigger": "data-[state=active]:text-info focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-info"
      }
    },
    {
      "color": "warning",
      "variant": "link",
      "class": {
        "indicator": "bg-warning",
        "trigger": "data-[state=active]:text-warning focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-warning"
      }
    },
    {
      "color": "error",
      "variant": "link",
      "class": {
        "indicator": "bg-error",
        "trigger": "data-[state=active]:text-error focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-error"
      }
    },
    {
      "color": "neutral",
      "variant": "link",
      "class": {
        "indicator": "bg-inverted",
        "trigger": "data-[state=active]:text-highlighted focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-inverted"
      }
    }
  ],
  "defaultVariants": {
    "color": "primary",
    "variant": "pill",
    "size": "md"
  }
};

const _sfc_main$2 = {
  __name: 'Tabs',
  __ssrInlineRender: true,
  props: {
  as: { type: null, required: false },
  items: { type: Array, required: false },
  color: { type: null, required: false },
  variant: { type: null, required: false },
  size: { type: null, required: false },
  orientation: { type: null, required: false, default: "horizontal" },
  content: { type: Boolean, required: false, default: true },
  labelKey: { type: null, required: false, default: "label" },
  class: { type: null, required: false },
  ui: { type: null, required: false },
  defaultValue: { type: null, required: false, default: "0" },
  modelValue: { type: null, required: false },
  activationMode: { type: String, required: false },
  unmountOnHide: { type: Boolean, required: false, default: true }
},
  emits: ["update:modelValue"],
  setup(__props, { expose: __expose, emit: __emit }) {

const props = __props;
const emits = __emit;
const slots = useSlots();
const appConfig = useAppConfig();
const rootProps = useForwardPropsEmits(reactivePick(props, "as", "unmountOnHide"), emits);
const ui = computed(() => tv({ extend: tv(theme), ...appConfig.ui?.tabs || {} })({
  color: props.color,
  variant: props.variant,
  size: props.size,
  orientation: props.orientation
}));
const triggersRef = ref([]);
__expose({
  triggersRef
});

return (_ctx, _push, _parent, _attrs) => {
  _push(ssrRenderComponent(unref(TabsRoot), mergeProps(unref(rootProps), {
    "model-value": __props.modelValue,
    "default-value": __props.defaultValue,
    orientation: __props.orientation,
    "activation-mode": __props.activationMode,
    "data-slot": "root",
    class: ui.value.root({ class: [props.ui?.root, props.class] })
  }, _attrs), {
    default: withCtx((_, _push, _parent, _scopeId) => {
      if (_push) {
        _push(ssrRenderComponent(unref(TabsList), {
          "data-slot": "list",
          class: ui.value.list({ class: props.ui?.list })
        }, {
          default: withCtx((_, _push, _parent, _scopeId) => {
            if (_push) {
              _push(ssrRenderComponent(unref(TabsIndicator), {
                "data-slot": "indicator",
                class: ui.value.indicator({ class: props.ui?.indicator })
              }, null, _parent, _scopeId));
              ssrRenderSlot(_ctx.$slots, "list-leading", {}, null, _push, _parent, _scopeId);
              _push(`<!--[-->`);
              ssrRenderList(__props.items, (item, index) => {
                _push(ssrRenderComponent(unref(TabsTrigger), {
                  key: index,
                  ref_for: true,
                  ref: (el) => triggersRef.value[index] = el,
                  value: item.value ?? String(index),
                  disabled: item.disabled,
                  "data-slot": "trigger",
                  class: ui.value.trigger({ class: [props.ui?.trigger, item.ui?.trigger] })
                }, {
                  default: withCtx((_, _push, _parent, _scopeId) => {
                    if (_push) {
                      ssrRenderSlot(_ctx.$slots, "leading", {
                        item: item,
                        index: index,
                        ui: ui.value
                      }, () => {
                        if (item.icon) {
                          _push(ssrRenderComponent(_sfc_main$3, {
                            name: item.icon,
                            "data-slot": "leadingIcon",
                            class: ui.value.leadingIcon({ class: [props.ui?.leadingIcon, item.ui?.leadingIcon] })
                          }, null, _parent, _scopeId));
                        } else if (item.avatar) {
                          _push(ssrRenderComponent(_sfc_main$4, mergeProps({
                            size: item.ui?.leadingAvatarSize || props.ui?.leadingAvatarSize || ui.value.leadingAvatarSize()
                          }, { ref_for: true }, item.avatar, {
                            "data-slot": "leadingAvatar",
                            class: ui.value.leadingAvatar({ class: [props.ui?.leadingAvatar, item.ui?.leadingAvatar] })
                          }), null, _parent, _scopeId));
                        } else {
                          _push(`<!---->`);
                        }
                      }, _push, _parent, _scopeId);
                      if (unref(get)(item, props.labelKey) || !!slots.default) {
                        _push(`<span data-slot="label" class="${
                          ssrRenderClass(ui.value.label({ class: [props.ui?.label, item.ui?.label] }))
                        }"${
                          _scopeId
                        }>`);
                        ssrRenderSlot(_ctx.$slots, "default", {
                          item: item,
                          index: index
                        }, () => {
                          _push(`${ssrInterpolate(unref(get)(item, props.labelKey))}`);
                        }, _push, _parent, _scopeId);
                        _push(`</span>`);
                      } else {
                        _push(`<!---->`);
                      }
                      ssrRenderSlot(_ctx.$slots, "trailing", {
                        item: item,
                        index: index,
                        ui: ui.value
                      }, () => {
                        if (item.badge || item.badge === 0) {
                          _push(ssrRenderComponent(_sfc_main$5, mergeProps({
                            color: "neutral",
                            variant: "outline",
                            size: item.ui?.trailingBadgeSize || props.ui?.trailingBadgeSize || ui.value.trailingBadgeSize()
                          }, { ref_for: true }, typeof item.badge === 'string' || typeof item.badge === 'number' ? { label: item.badge } : item.badge, {
                            "data-slot": "trailingBadge",
                            class: ui.value.trailingBadge({ class: [props.ui?.trailingBadge, item.ui?.trailingBadge] })
                          }), null, _parent, _scopeId));
                        } else {
                          _push(`<!---->`);
                        }
                      }, _push, _parent, _scopeId);
                    } else {
                      return [
                        renderSlot(_ctx.$slots, "leading", {
                          item: item,
                          index: index,
                          ui: ui.value
                        }, () => [
                          (item.icon)
                            ? (openBlock(), createBlock(_sfc_main$3, {
                                key: 0,
                                name: item.icon,
                                "data-slot": "leadingIcon",
                                class: ui.value.leadingIcon({ class: [props.ui?.leadingIcon, item.ui?.leadingIcon] })
                              }, null, 8 /* PROPS */, ["name", "class"]))
                            : (item.avatar)
                              ? (openBlock(), createBlock(_sfc_main$4, mergeProps({
                                  key: 1,
                                  size: item.ui?.leadingAvatarSize || props.ui?.leadingAvatarSize || ui.value.leadingAvatarSize()
                                }, { ref_for: true }, item.avatar, {
                                  "data-slot": "leadingAvatar",
                                  class: ui.value.leadingAvatar({ class: [props.ui?.leadingAvatar, item.ui?.leadingAvatar] })
                                }), null, 16 /* FULL_PROPS */, ["size", "class"]))
                              : createCommentVNode("v-if", true)
                        ]),
                        (unref(get)(item, props.labelKey) || !!slots.default)
                          ? (openBlock(), createBlock("span", {
                              key: 0,
                              "data-slot": "label",
                              class: ui.value.label({ class: [props.ui?.label, item.ui?.label] })
                            }, [
                              renderSlot(_ctx.$slots, "default", {
                                item: item,
                                index: index
                              }, () => [
                                createTextVNode(toDisplayString(unref(get)(item, props.labelKey)), 1 /* TEXT */)
                              ])
                            ], 2 /* CLASS */))
                          : createCommentVNode("v-if", true),
                        renderSlot(_ctx.$slots, "trailing", {
                          item: item,
                          index: index,
                          ui: ui.value
                        }, () => [
                          (item.badge || item.badge === 0)
                            ? (openBlock(), createBlock(_sfc_main$5, mergeProps({
                                key: 0,
                                color: "neutral",
                                variant: "outline",
                                size: item.ui?.trailingBadgeSize || props.ui?.trailingBadgeSize || ui.value.trailingBadgeSize()
                              }, { ref_for: true }, typeof item.badge === 'string' || typeof item.badge === 'number' ? { label: item.badge } : item.badge, {
                                "data-slot": "trailingBadge",
                                class: ui.value.trailingBadge({ class: [props.ui?.trailingBadge, item.ui?.trailingBadge] })
                              }), null, 16 /* FULL_PROPS */, ["size", "class"]))
                            : createCommentVNode("v-if", true)
                        ])
                      ]
                    }
                  }),
                  _: 2 /* DYNAMIC */
                }, _parent, _scopeId));
              });
              _push(`<!--]-->`);
              ssrRenderSlot(_ctx.$slots, "list-trailing", {}, null, _push, _parent, _scopeId);
            } else {
              return [
                createVNode(unref(TabsIndicator), {
                  "data-slot": "indicator",
                  class: ui.value.indicator({ class: props.ui?.indicator })
                }, null, 8 /* PROPS */, ["class"]),
                renderSlot(_ctx.$slots, "list-leading"),
                (openBlock(true), createBlock(Fragment, null, renderList(__props.items, (item, index) => {
                  return (openBlock(), createBlock(unref(TabsTrigger), {
                    key: index,
                    ref_for: true,
                    ref: (el) => triggersRef.value[index] = el,
                    value: item.value ?? String(index),
                    disabled: item.disabled,
                    "data-slot": "trigger",
                    class: ui.value.trigger({ class: [props.ui?.trigger, item.ui?.trigger] })
                  }, {
                    default: withCtx(() => [
                      renderSlot(_ctx.$slots, "leading", {
                        item: item,
                        index: index,
                        ui: ui.value
                      }, () => [
                        (item.icon)
                          ? (openBlock(), createBlock(_sfc_main$3, {
                              key: 0,
                              name: item.icon,
                              "data-slot": "leadingIcon",
                              class: ui.value.leadingIcon({ class: [props.ui?.leadingIcon, item.ui?.leadingIcon] })
                            }, null, 8 /* PROPS */, ["name", "class"]))
                          : (item.avatar)
                            ? (openBlock(), createBlock(_sfc_main$4, mergeProps({
                                key: 1,
                                size: item.ui?.leadingAvatarSize || props.ui?.leadingAvatarSize || ui.value.leadingAvatarSize()
                              }, { ref_for: true }, item.avatar, {
                                "data-slot": "leadingAvatar",
                                class: ui.value.leadingAvatar({ class: [props.ui?.leadingAvatar, item.ui?.leadingAvatar] })
                              }), null, 16 /* FULL_PROPS */, ["size", "class"]))
                            : createCommentVNode("v-if", true)
                      ]),
                      (unref(get)(item, props.labelKey) || !!slots.default)
                        ? (openBlock(), createBlock("span", {
                            key: 0,
                            "data-slot": "label",
                            class: ui.value.label({ class: [props.ui?.label, item.ui?.label] })
                          }, [
                            renderSlot(_ctx.$slots, "default", {
                              item: item,
                              index: index
                            }, () => [
                              createTextVNode(toDisplayString(unref(get)(item, props.labelKey)), 1 /* TEXT */)
                            ])
                          ], 2 /* CLASS */))
                        : createCommentVNode("v-if", true),
                      renderSlot(_ctx.$slots, "trailing", {
                        item: item,
                        index: index,
                        ui: ui.value
                      }, () => [
                        (item.badge || item.badge === 0)
                          ? (openBlock(), createBlock(_sfc_main$5, mergeProps({
                              key: 0,
                              color: "neutral",
                              variant: "outline",
                              size: item.ui?.trailingBadgeSize || props.ui?.trailingBadgeSize || ui.value.trailingBadgeSize()
                            }, { ref_for: true }, typeof item.badge === 'string' || typeof item.badge === 'number' ? { label: item.badge } : item.badge, {
                              "data-slot": "trailingBadge",
                              class: ui.value.trailingBadge({ class: [props.ui?.trailingBadge, item.ui?.trailingBadge] })
                            }), null, 16 /* FULL_PROPS */, ["size", "class"]))
                          : createCommentVNode("v-if", true)
                      ])
                    ]),
                    _: 2 /* DYNAMIC */
                  }, 1032 /* PROPS, DYNAMIC_SLOTS */, ["value", "disabled", "class"]))
                }), 128 /* KEYED_FRAGMENT */)),
                renderSlot(_ctx.$slots, "list-trailing")
              ]
            }
          }),
          _: 3 /* FORWARDED */
        }, _parent, _scopeId));
        if (!!__props.content) {
          _push(`<!--[-->`);
          ssrRenderList(__props.items, (item, index) => {
            _push(ssrRenderComponent(unref(TabsContent), {
              key: index,
              value: item.value ?? String(index),
              "data-slot": "content",
              class: ui.value.content({ class: [props.ui?.content, item.ui?.content, item.class] })
            }, {
              default: withCtx((_, _push, _parent, _scopeId) => {
                if (_push) {
                  ssrRenderSlot(_ctx.$slots, item.slot || 'content', {
                    item: item,
                    index: index,
                    ui: ui.value
                  }, () => {
                    _push(`${ssrInterpolate(item.content)}`);
                  }, _push, _parent, _scopeId);
                } else {
                  return [
                    renderSlot(_ctx.$slots, item.slot || 'content', {
                      item: item,
                      index: index,
                      ui: ui.value
                    }, () => [
                      createTextVNode(toDisplayString(item.content), 1 /* TEXT */)
                    ])
                  ]
                }
              }),
              _: 2 /* DYNAMIC */
            }, _parent, _scopeId));
          });
          _push(`<!--]-->`);
        } else {
          _push(`<!---->`);
        }
      } else {
        return [
          createVNode(unref(TabsList), {
            "data-slot": "list",
            class: ui.value.list({ class: props.ui?.list })
          }, {
            default: withCtx(() => [
              createVNode(unref(TabsIndicator), {
                "data-slot": "indicator",
                class: ui.value.indicator({ class: props.ui?.indicator })
              }, null, 8 /* PROPS */, ["class"]),
              renderSlot(_ctx.$slots, "list-leading"),
              (openBlock(true), createBlock(Fragment, null, renderList(__props.items, (item, index) => {
                return (openBlock(), createBlock(unref(TabsTrigger), {
                  key: index,
                  ref_for: true,
                  ref: (el) => triggersRef.value[index] = el,
                  value: item.value ?? String(index),
                  disabled: item.disabled,
                  "data-slot": "trigger",
                  class: ui.value.trigger({ class: [props.ui?.trigger, item.ui?.trigger] })
                }, {
                  default: withCtx(() => [
                    renderSlot(_ctx.$slots, "leading", {
                      item: item,
                      index: index,
                      ui: ui.value
                    }, () => [
                      (item.icon)
                        ? (openBlock(), createBlock(_sfc_main$3, {
                            key: 0,
                            name: item.icon,
                            "data-slot": "leadingIcon",
                            class: ui.value.leadingIcon({ class: [props.ui?.leadingIcon, item.ui?.leadingIcon] })
                          }, null, 8 /* PROPS */, ["name", "class"]))
                        : (item.avatar)
                          ? (openBlock(), createBlock(_sfc_main$4, mergeProps({
                              key: 1,
                              size: item.ui?.leadingAvatarSize || props.ui?.leadingAvatarSize || ui.value.leadingAvatarSize()
                            }, { ref_for: true }, item.avatar, {
                              "data-slot": "leadingAvatar",
                              class: ui.value.leadingAvatar({ class: [props.ui?.leadingAvatar, item.ui?.leadingAvatar] })
                            }), null, 16 /* FULL_PROPS */, ["size", "class"]))
                          : createCommentVNode("v-if", true)
                    ]),
                    (unref(get)(item, props.labelKey) || !!slots.default)
                      ? (openBlock(), createBlock("span", {
                          key: 0,
                          "data-slot": "label",
                          class: ui.value.label({ class: [props.ui?.label, item.ui?.label] })
                        }, [
                          renderSlot(_ctx.$slots, "default", {
                            item: item,
                            index: index
                          }, () => [
                            createTextVNode(toDisplayString(unref(get)(item, props.labelKey)), 1 /* TEXT */)
                          ])
                        ], 2 /* CLASS */))
                      : createCommentVNode("v-if", true),
                    renderSlot(_ctx.$slots, "trailing", {
                      item: item,
                      index: index,
                      ui: ui.value
                    }, () => [
                      (item.badge || item.badge === 0)
                        ? (openBlock(), createBlock(_sfc_main$5, mergeProps({
                            key: 0,
                            color: "neutral",
                            variant: "outline",
                            size: item.ui?.trailingBadgeSize || props.ui?.trailingBadgeSize || ui.value.trailingBadgeSize()
                          }, { ref_for: true }, typeof item.badge === 'string' || typeof item.badge === 'number' ? { label: item.badge } : item.badge, {
                            "data-slot": "trailingBadge",
                            class: ui.value.trailingBadge({ class: [props.ui?.trailingBadge, item.ui?.trailingBadge] })
                          }), null, 16 /* FULL_PROPS */, ["size", "class"]))
                        : createCommentVNode("v-if", true)
                    ])
                  ]),
                  _: 2 /* DYNAMIC */
                }, 1032 /* PROPS, DYNAMIC_SLOTS */, ["value", "disabled", "class"]))
              }), 128 /* KEYED_FRAGMENT */)),
              renderSlot(_ctx.$slots, "list-trailing")
            ]),
            _: 3 /* FORWARDED */
          }, 8 /* PROPS */, ["class"]),
          (!!__props.content)
            ? (openBlock(true), createBlock(Fragment, { key: 0 }, renderList(__props.items, (item, index) => {
                return (openBlock(), createBlock(unref(TabsContent), {
                  key: index,
                  value: item.value ?? String(index),
                  "data-slot": "content",
                  class: ui.value.content({ class: [props.ui?.content, item.ui?.content, item.class] })
                }, {
                  default: withCtx(() => [
                    renderSlot(_ctx.$slots, item.slot || 'content', {
                      item: item,
                      index: index,
                      ui: ui.value
                    }, () => [
                      createTextVNode(toDisplayString(item.content), 1 /* TEXT */)
                    ])
                  ]),
                  _: 2 /* DYNAMIC */
                }, 1032 /* PROPS, DYNAMIC_SLOTS */, ["value", "class"]))
              }), 128 /* KEYED_FRAGMENT */))
            : createCommentVNode("v-if", true)
        ]
      }
    }),
    _: 3 /* FORWARDED */
  }, _parent));
}
}

};
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext()
  ;(ssrContext.modules || (ssrContext.modules = new Set())).add("node_modules/@nuxt/ui/dist/runtime/components/Tabs.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : undefined
};

const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "BlockEditor",
  __ssrInlineRender: true,
  props: {
    modelValue: {},
    uploadHandler: { type: Function }
  },
  emits: ["update:modelValue"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const block = computed({
      get: () => props.modelValue,
      set: (val) => emit("update:modelValue", val)
    });
    const blockData = computed(() => block.value.data);
    function updateData(key, value) {
      const updatedBlock = {
        ...props.modelValue,
        data: {
          ...props.modelValue.data,
          [key]: value
        }
      };
      emit("update:modelValue", updatedBlock);
    }
    function addListItem() {
      if (block.value.type !== "list") return;
      const items = [...block.value.data.items || []];
      items.push({ text: "" });
      updateData("items", items);
    }
    function removeListItem(index) {
      if (block.value.type !== "list") return;
      const items = [...block.value.data.items || []];
      items.splice(index, 1);
      updateData("items", items);
    }
    function updateListItem(index, text) {
      if (block.value.type !== "list") return;
      const items = [...block.value.data.items || []];
      items[index] = { ...items[index], text };
      updateData("items", items);
    }
    function addProsItem() {
      if (block.value.type !== "pros-cons") return;
      const pros = [...block.value.data.pros || []];
      pros.push("");
      updateData("pros", pros);
    }
    function removeProsItem(index) {
      if (block.value.type !== "pros-cons") return;
      const pros = [...block.value.data.pros || []];
      pros.splice(index, 1);
      updateData("pros", pros);
    }
    function addConsItem() {
      if (block.value.type !== "pros-cons") return;
      const cons = [...block.value.data.cons || []];
      cons.push("");
      updateData("cons", cons);
    }
    function removeConsItem(index) {
      if (block.value.type !== "pros-cons") return;
      const cons = [...block.value.data.cons || []];
      cons.splice(index, 1);
      updateData("cons", cons);
    }
    function addAccordionItem() {
      if (block.value.type !== "accordion") return;
      const items = [...block.value.data.items || []];
      items.push({ title: "", content: "" });
      updateData("items", items);
    }
    function removeAccordionItem(index) {
      if (block.value.type !== "accordion") return;
      const items = [...block.value.data.items || []];
      items.splice(index, 1);
      updateData("items", items);
    }
    function addTableColumn() {
      if (block.value.type !== "table") return;
      const headers = [...block.value.data.headers || []];
      const rows = [...block.value.data.rows || []];
      headers.push("Kolom Baru");
      rows.forEach((row) => row.push(""));
      updateData("headers", headers);
      updateData("rows", rows);
    }
    function removeTableColumn(index) {
      if (block.value.type !== "table") return;
      const headers = [...block.value.data.headers || []];
      const rows = [...block.value.data.rows || []];
      headers.splice(index, 1);
      rows.forEach((row) => row.splice(index, 1));
      updateData("headers", headers);
      updateData("rows", rows);
    }
    function addTableRow() {
      if (block.value.type !== "table") return;
      const rows = [...block.value.data.rows || []];
      const columnCount = block.value.data.headers?.length || 2;
      rows.push(Array(columnCount).fill(""));
      updateData("rows", rows);
    }
    function removeTableRow(index) {
      if (block.value.type !== "table") return;
      const rows = [...block.value.data.rows || []];
      rows.splice(index, 1);
      updateData("rows", rows);
    }
    function removeGalleryImage(index) {
      if (block.value.type !== "gallery") return;
      const images = [...block.value.data.images || []];
      images.splice(index, 1);
      updateData("images", images);
    }
    function addRatingCriteria() {
      if (block.value.type !== "rating-box") return;
      const criteria = [...block.value.data.criteria || []];
      criteria.push({ label: "", rating: 3 });
      updateData("criteria", criteria);
    }
    function removeRatingCriteria(index) {
      if (block.value.type !== "rating-box") return;
      const criteria = [...block.value.data.criteria || []];
      criteria.splice(index, 1);
      updateData("criteria", criteria);
    }
    const headingLevels = [
      { value: 1, label: "H1 - Judul Utama" },
      { value: 2, label: "H2 - Sub Judul" },
      { value: 3, label: "H3 - Sub Sub Judul" },
      { value: 4, label: "H4" },
      { value: 5, label: "H5" },
      { value: 6, label: "H6" }
    ];
    const alignmentOptions = [
      { value: "left", label: "Kiri", icon: "i-heroicons-bars-3-bottom-left" },
      { value: "center", label: "Tengah", icon: "i-heroicons-bars-3" },
      { value: "right", label: "Kanan", icon: "i-heroicons-bars-3-bottom-right" }
    ];
    const listStyleOptions = [
      { value: "unordered", label: "Bullet" },
      { value: "ordered", label: "Numbered" },
      { value: "checklist", label: "Checklist" }
    ];
    const alertTypeOptions = [
      { value: "info", label: "Info", color: "info" },
      { value: "success", label: "Sukses", color: "success" },
      { value: "warning", label: "Peringatan", color: "warning" },
      { value: "error", label: "Error", color: "error" },
      { value: "tip", label: "Tips", color: "primary" }
    ];
    const dividerStyleOptions = [
      { value: "solid", label: "Solid" },
      { value: "dashed", label: "Dashed" },
      { value: "dotted", label: "Dotted" },
      { value: "gradient", label: "Gradient" }
    ];
    const spacerSizeOptions = [
      { value: "xs", label: "Extra Small" },
      { value: "sm", label: "Small" },
      { value: "md", label: "Medium" },
      { value: "lg", label: "Large" },
      { value: "xl", label: "Extra Large" }
    ];
    const buttonStyleOptions = [
      { value: "primary", label: "Primary" },
      { value: "secondary", label: "Secondary" },
      { value: "outline", label: "Outline" },
      { value: "ghost", label: "Ghost" }
    ];
    const codeLanguageOptions = [
      { value: "javascript", label: "JavaScript" },
      { value: "typescript", label: "TypeScript" },
      { value: "python", label: "Python" },
      { value: "php", label: "PHP" },
      { value: "html", label: "HTML" },
      { value: "css", label: "CSS" },
      { value: "json", label: "JSON" },
      { value: "bash", label: "Bash" },
      { value: "sql", label: "SQL" }
    ];
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UTextarea = _sfc_main$6;
      const _component_USelect = _sfc_main$7;
      const _component_UButton = _sfc_main$8;
      const _component_UCheckbox = _sfc_main$9;
      const _component_UIcon = _sfc_main$3;
      const _component_UInput = _sfc_main$a;
      const _component_UAlert = _sfc_main$b;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "block-editor" }, _attrs))}><!-- Heading Block -->`);
      if (block.value.type === "heading") {
        _push(`<div class="space-y-3">`);
        _push(ssrRenderComponent(_component_UTextarea, {
          "model-value": blockData.value.text,
          placeholder: "Masukkan teks heading...",
          rows: 1,
          autoresize: "",
          "onUpdate:modelValue": ($event) => updateData("text", $event),
          class: "w-full"
        }, null, _parent));
        _push(`<div class="flex flex-wrap gap-3">`);
        _push(ssrRenderComponent(_component_USelect, {
          "model-value": blockData.value.level,
          options: headingLevels,
          "option-attribute": "label",
          "value-attribute": "value",
          size: "sm",
          class: "w-40",
          "onUpdate:modelValue": ($event) => updateData("level", $event)
        }, null, _parent));
        _push(`<div class="inline-flex items-center rounded-md shadow-sm"><!--[-->`);
        ssrRenderList(alignmentOptions, (opt) => {
          _push(ssrRenderComponent(_component_UButton, {
            key: opt.value,
            icon: opt.icon,
            color: blockData.value.alignment === opt.value ? "primary" : "neutral",
            variant: blockData.value.alignment === opt.value ? "soft" : "ghost",
            onClick: ($event) => updateData("alignment", opt.value)
          }, null, _parent));
        });
        _push(`<!--]--></div></div></div>`);
      } else if (block.value.type === "paragraph") {
        _push(`<!--[--><!-- Paragraph Block --><div class="space-y-3">`);
        _push(ssrRenderComponent(_component_UTextarea, {
          "model-value": blockData.value.text,
          placeholder: "Tulis paragraf...",
          rows: 4,
          autoresize: "",
          "onUpdate:modelValue": ($event) => updateData("text", $event),
          class: "w-full"
        }, null, _parent));
        _push(`<div class="flex flex-wrap items-center gap-3"><div class="inline-flex items-center rounded-md shadow-sm"><!--[-->`);
        ssrRenderList(alignmentOptions, (opt) => {
          _push(ssrRenderComponent(_component_UButton, {
            key: opt.value,
            icon: opt.icon,
            color: blockData.value.alignment === opt.value ? "primary" : "neutral",
            variant: blockData.value.alignment === opt.value ? "soft" : "ghost",
            onClick: ($event) => updateData("alignment", opt.value)
          }, null, _parent));
        });
        _push(`<!--]--></div>`);
        _push(ssrRenderComponent(_component_UCheckbox, {
          "model-value": blockData.value.dropCap,
          label: "Drop Cap",
          "onUpdate:modelValue": ($event) => updateData("dropCap", $event)
        }, null, _parent));
        _push(`</div></div><!--]-->`);
      } else if (block.value.type === "image") {
        _push(`<!--[--><!-- Image Block --><div class="space-y-3">`);
        if (blockData.value.src) {
          _push(`<div class="relative"><img${ssrRenderAttr("src", blockData.value.src)}${ssrRenderAttr("alt", blockData.value.alt)} class="max-h-64 rounded-lg object-contain">`);
          _push(ssrRenderComponent(_component_UButton, {
            icon: "i-heroicons-x-mark",
            color: "error",
            variant: "solid",
            size: "xs",
            class: "absolute right-2 top-2",
            onClick: ($event) => updateData("src", "")
          }, null, _parent));
          _push(`</div>`);
        } else {
          _push(`<div class="flex flex-col items-center gap-3 rounded-lg border-2 border-dashed border-gray-300 p-6 dark:border-gray-600">`);
          _push(ssrRenderComponent(_component_UIcon, {
            name: "i-heroicons-photo",
            class: "h-10 w-10 text-gray-400"
          }, null, _parent));
          _push(`<div class="text-center"><label class="cursor-pointer text-sm text-primary-600 hover:underline"> Upload gambar <input type="file" class="hidden" accept="image/*"></label><p class="mt-1 text-xs text-gray-500">atau masukkan URL di bawah</p></div></div>`);
        }
        _push(ssrRenderComponent(_component_UInput, {
          "model-value": blockData.value.src,
          placeholder: "URL gambar...",
          icon: "i-heroicons-link",
          "onUpdate:modelValue": ($event) => updateData("src", $event),
          class: "w-full"
        }, null, _parent));
        _push(ssrRenderComponent(_component_UInput, {
          "model-value": blockData.value.alt,
          placeholder: "Alt text (deskripsi gambar)...",
          "onUpdate:modelValue": ($event) => updateData("alt", $event),
          class: "w-full"
        }, null, _parent));
        _push(ssrRenderComponent(_component_UInput, {
          "model-value": blockData.value.caption,
          placeholder: "Caption (opsional)...",
          "onUpdate:modelValue": ($event) => updateData("caption", $event),
          class: "w-full"
        }, null, _parent));
        _push(`</div><!--]-->`);
      } else if (block.value.type === "list") {
        _push(`<!--[--><!-- List Block --><div class="space-y-3">`);
        _push(ssrRenderComponent(_component_USelect, {
          "model-value": blockData.value.style,
          options: listStyleOptions,
          "option-attribute": "label",
          "value-attribute": "value",
          size: "sm",
          class: "w-40",
          "onUpdate:modelValue": ($event) => updateData("style", $event)
        }, null, _parent));
        _push(`<div class="space-y-2"><!--[-->`);
        ssrRenderList(blockData.value.items, (item, index) => {
          _push(`<div class="flex items-center gap-2">`);
          _push(ssrRenderComponent(_component_UIcon, {
            name: blockData.value.style === "ordered" ? "i-heroicons-list-bullet" : blockData.value.style === "checklist" ? "i-heroicons-check-circle" : "i-heroicons-minus",
            class: "h-4 w-4 shrink-0 text-gray-400"
          }, null, _parent));
          _push(ssrRenderComponent(_component_UInput, {
            "model-value": item.text,
            placeholder: "Item...",
            class: "flex-1 w-full",
            "onUpdate:modelValue": ($event) => updateListItem(Number(index), $event)
          }, null, _parent));
          _push(ssrRenderComponent(_component_UButton, {
            icon: "i-heroicons-x-mark",
            color: "error",
            variant: "ghost",
            size: "xs",
            onClick: ($event) => removeListItem(Number(index))
          }, null, _parent));
          _push(`</div>`);
        });
        _push(`<!--]--></div>`);
        _push(ssrRenderComponent(_component_UButton, {
          icon: "i-heroicons-plus",
          variant: "soft",
          size: "sm",
          onClick: addListItem
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(` Tambah Item `);
            } else {
              return [
                createTextVNode(" Tambah Item ")
              ];
            }
          }),
          _: 1
          /* STABLE */
        }, _parent));
        _push(`</div><!--]-->`);
      } else if (block.value.type === "quote") {
        _push(`<!--[--><!-- Quote Block --><div class="space-y-3">`);
        _push(ssrRenderComponent(_component_UTextarea, {
          "model-value": blockData.value.text,
          placeholder: "Masukkan kutipan...",
          rows: 3,
          autoresize: "",
          "onUpdate:modelValue": ($event) => updateData("text", $event),
          class: "w-full"
        }, null, _parent));
        _push(ssrRenderComponent(_component_UInput, {
          "model-value": blockData.value.citation,
          placeholder: "Sumber kutipan (opsional)...",
          icon: "i-heroicons-user",
          "onUpdate:modelValue": ($event) => updateData("citation", $event),
          class: "w-full"
        }, null, _parent));
        _push(`</div><!--]-->`);
      } else if (block.value.type === "code") {
        _push(`<!--[--><!-- Code Block --><div class="space-y-3"><div class="flex gap-3">`);
        _push(ssrRenderComponent(_component_USelect, {
          "model-value": blockData.value.language,
          options: codeLanguageOptions,
          "option-attribute": "label",
          "value-attribute": "value",
          size: "sm",
          class: "w-40",
          "onUpdate:modelValue": ($event) => updateData("language", $event)
        }, null, _parent));
        _push(ssrRenderComponent(_component_UInput, {
          "model-value": blockData.value.filename,
          placeholder: "Nama file (opsional)...",
          size: "sm",
          class: "flex-1 w-full",
          "onUpdate:modelValue": ($event) => updateData("filename", $event)
        }, null, _parent));
        _push(`</div>`);
        _push(ssrRenderComponent(_component_UTextarea, {
          "model-value": blockData.value.code,
          placeholder: "// Masukkan kode...",
          rows: 6,
          class: "font-mono w-full",
          "onUpdate:modelValue": ($event) => updateData("code", $event)
        }, null, _parent));
        _push(`</div><!--]-->`);
      } else if (block.value.type === "alert") {
        _push(`<!--[--><!-- Alert Block --><div class="space-y-3">`);
        _push(ssrRenderComponent(_component_USelect, {
          "model-value": blockData.value.type,
          options: alertTypeOptions,
          "option-attribute": "label",
          "value-attribute": "value",
          size: "sm",
          class: "w-40",
          "onUpdate:modelValue": ($event) => updateData("type", $event)
        }, null, _parent));
        _push(ssrRenderComponent(_component_UInput, {
          "model-value": blockData.value.title,
          placeholder: "Judul (opsional)...",
          "onUpdate:modelValue": ($event) => updateData("title", $event),
          class: "w-full"
        }, null, _parent));
        _push(ssrRenderComponent(_component_UTextarea, {
          "model-value": blockData.value.text,
          placeholder: "Pesan...",
          rows: 2,
          autoresize: "",
          "onUpdate:modelValue": ($event) => updateData("text", $event),
          class: "w-full"
        }, null, _parent));
        _push(`</div><!--]-->`);
      } else if (block.value.type === "divider") {
        _push(`<!--[--><!-- Divider Block --><div class="flex items-center gap-3"><span class="text-sm text-gray-500">Style:</span>`);
        _push(ssrRenderComponent(_component_USelect, {
          "model-value": blockData.value.style,
          options: dividerStyleOptions,
          "option-attribute": "label",
          "value-attribute": "value",
          size: "sm",
          class: "w-32",
          "onUpdate:modelValue": ($event) => updateData("style", $event)
        }, null, _parent));
        _push(`<span class="text-sm text-gray-500">Spacing:</span>`);
        _push(ssrRenderComponent(_component_USelect, {
          "model-value": blockData.value.spacing,
          options: spacerSizeOptions,
          "option-attribute": "label",
          "value-attribute": "value",
          size: "sm",
          class: "w-32",
          "onUpdate:modelValue": ($event) => updateData("spacing", $event)
        }, null, _parent));
        _push(`</div><!--]-->`);
      } else if (block.value.type === "spacer") {
        _push(`<!--[--><!-- Spacer Block --><div class="flex items-center gap-3"><span class="text-sm text-gray-500">Tinggi:</span>`);
        _push(ssrRenderComponent(_component_USelect, {
          "model-value": blockData.value.height,
          options: spacerSizeOptions,
          "option-attribute": "label",
          "value-attribute": "value",
          size: "sm",
          class: "w-40",
          "onUpdate:modelValue": ($event) => updateData("height", $event)
        }, null, _parent));
        _push(`</div><!--]-->`);
      } else if (block.value.type === "button") {
        _push(`<!--[--><!-- Button Block --><div class="space-y-3"><div class="flex gap-3">`);
        _push(ssrRenderComponent(_component_UInput, {
          "model-value": blockData.value.text,
          placeholder: "Teks button...",
          class: "flex-1 w-full",
          "onUpdate:modelValue": ($event) => updateData("text", $event)
        }, null, _parent));
        _push(ssrRenderComponent(_component_USelect, {
          "model-value": blockData.value.style,
          options: buttonStyleOptions,
          "option-attribute": "label",
          "value-attribute": "value",
          size: "sm",
          class: "w-32",
          "onUpdate:modelValue": ($event) => updateData("style", $event)
        }, null, _parent));
        _push(`</div>`);
        _push(ssrRenderComponent(_component_UInput, {
          "model-value": blockData.value.url,
          placeholder: "URL tujuan...",
          icon: "i-heroicons-link",
          class: "w-full",
          "onUpdate:modelValue": ($event) => updateData("url", $event)
        }, null, _parent));
        _push(`<div class="flex items-center gap-4">`);
        _push(ssrRenderComponent(_component_UCheckbox, {
          "model-value": blockData.value.fullWidth,
          label: "Full Width",
          "onUpdate:modelValue": ($event) => updateData("fullWidth", $event)
        }, null, _parent));
        _push(ssrRenderComponent(_component_UCheckbox, {
          "model-value": blockData.value.newTab,
          label: "Buka di tab baru",
          "onUpdate:modelValue": ($event) => updateData("newTab", $event)
        }, null, _parent));
        _push(`</div></div><!--]-->`);
      } else if (block.value.type === "embed") {
        _push(`<!--[--><!-- Embed Block --><div class="space-y-3">`);
        _push(ssrRenderComponent(_component_UInput, {
          "model-value": blockData.value.url,
          placeholder: "URL YouTube, TikTok, Instagram, dll...",
          icon: "i-heroicons-play",
          class: "w-full",
          "onUpdate:modelValue": ($event) => updateData("url", $event)
        }, null, _parent));
        _push(ssrRenderComponent(_component_UInput, {
          "model-value": blockData.value.caption,
          placeholder: "Caption (opsional)...",
          class: "w-full",
          "onUpdate:modelValue": ($event) => updateData("caption", $event)
        }, null, _parent));
        _push(`</div><!--]-->`);
      } else if (block.value.type === "pros-cons") {
        _push(`<!--[--><!-- Pros Cons Block --><div class="space-y-4">`);
        _push(ssrRenderComponent(_component_UInput, {
          "model-value": blockData.value.title,
          placeholder: "Judul (opsional)...",
          class: "w-full",
          "onUpdate:modelValue": ($event) => updateData("title", $event)
        }, null, _parent));
        _push(`<div class="grid gap-4 md:grid-cols-2"><!-- Pros --><div class="space-y-2"><div class="flex items-center gap-2">`);
        _push(ssrRenderComponent(_component_UIcon, {
          name: "i-heroicons-check-circle",
          class: "h-5 w-5 text-green-500"
        }, null, _parent));
        _push(`<span class="font-medium text-green-600">Kelebihan</span></div><!--[-->`);
        ssrRenderList(blockData.value.pros, (item, index) => {
          _push(`<div class="flex items-center gap-2">`);
          _push(ssrRenderComponent(_component_UInput, {
            "model-value": item,
            placeholder: "Kelebihan...",
            class: "flex-1 w-full",
            "onUpdate:modelValue": (val) => {
              const pros = [...blockData.value.pros || []];
              pros[Number(index)] = val;
              updateData("pros", pros);
            }
          }, null, _parent));
          _push(ssrRenderComponent(_component_UButton, {
            icon: "i-heroicons-x-mark",
            color: "error",
            variant: "ghost",
            size: "xs",
            onClick: ($event) => removeProsItem(Number(index))
          }, null, _parent));
          _push(`</div>`);
        });
        _push(`<!--]-->`);
        _push(ssrRenderComponent(_component_UButton, {
          icon: "i-heroicons-plus",
          variant: "soft",
          size: "sm",
          onClick: addProsItem
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(` Tambah `);
            } else {
              return [
                createTextVNode(" Tambah ")
              ];
            }
          }),
          _: 1
          /* STABLE */
        }, _parent));
        _push(`</div><!-- Cons --><div class="space-y-2"><div class="flex items-center gap-2">`);
        _push(ssrRenderComponent(_component_UIcon, {
          name: "i-heroicons-x-circle",
          class: "h-5 w-5 text-red-500"
        }, null, _parent));
        _push(`<span class="font-medium text-red-600">Kekurangan</span></div><!--[-->`);
        ssrRenderList(blockData.value.cons, (item, index) => {
          _push(`<div class="flex items-center gap-2">`);
          _push(ssrRenderComponent(_component_UInput, {
            "model-value": item,
            placeholder: "Kekurangan...",
            class: "flex-1 w-full",
            "onUpdate:modelValue": (val) => {
              const cons = [...blockData.value.cons || []];
              cons[Number(index)] = val;
              updateData("cons", cons);
            }
          }, null, _parent));
          _push(ssrRenderComponent(_component_UButton, {
            icon: "i-heroicons-x-mark",
            color: "error",
            variant: "ghost",
            size: "xs",
            onClick: ($event) => removeConsItem(Number(index))
          }, null, _parent));
          _push(`</div>`);
        });
        _push(`<!--]-->`);
        _push(ssrRenderComponent(_component_UButton, {
          icon: "i-heroicons-plus",
          variant: "soft",
          size: "sm",
          onClick: addConsItem
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(` Tambah `);
            } else {
              return [
                createTextVNode(" Tambah ")
              ];
            }
          }),
          _: 1
          /* STABLE */
        }, _parent));
        _push(`</div></div></div><!--]-->`);
      } else if (block.value.type === "rating-box") {
        _push(`<!--[--><!-- Rating Box Block --><div class="space-y-4">`);
        _push(ssrRenderComponent(_component_UInput, {
          "model-value": blockData.value.title,
          placeholder: "Judul rating...",
          class: "w-full",
          "onUpdate:modelValue": ($event) => updateData("title", $event)
        }, null, _parent));
        _push(`<div class="flex items-center gap-3"><span class="text-sm text-gray-500">Rating Keseluruhan:</span>`);
        _push(ssrRenderComponent(_component_UInput, {
          "model-value": blockData.value.overallRating,
          type: "number",
          min: "0",
          max: "5",
          step: "0.5",
          class: "w-20",
          "onUpdate:modelValue": ($event) => updateData("overallRating", Number($event))
        }, null, _parent));
        _push(`<span class="text-sm text-gray-500">/ 5</span></div><div class="space-y-2"><div class="flex items-center justify-between"><span class="text-sm font-medium">Kriteria</span>`);
        _push(ssrRenderComponent(_component_UButton, {
          icon: "i-heroicons-plus",
          variant: "soft",
          size: "xs",
          onClick: addRatingCriteria
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(` Tambah `);
            } else {
              return [
                createTextVNode(" Tambah ")
              ];
            }
          }),
          _: 1
          /* STABLE */
        }, _parent));
        _push(`</div><!--[-->`);
        ssrRenderList(blockData.value.criteria, (crit, index) => {
          _push(`<div class="flex items-center gap-2">`);
          _push(ssrRenderComponent(_component_UInput, {
            "model-value": crit.label,
            placeholder: "Label...",
            class: "flex-1 w-full",
            "onUpdate:modelValue": (val) => {
              const criteria = [...blockData.value.criteria || []];
              criteria[Number(index)] = { ...criteria[Number(index)], label: val };
              updateData("criteria", criteria);
            }
          }, null, _parent));
          _push(ssrRenderComponent(_component_UInput, {
            "model-value": crit.rating,
            type: "number",
            min: "0",
            max: "5",
            step: "0.5",
            class: "w-16",
            "onUpdate:modelValue": (val) => {
              const criteria = [...blockData.value.criteria || []];
              criteria[Number(index)] = { ...criteria[Number(index)], rating: Number(val) };
              updateData("criteria", criteria);
            }
          }, null, _parent));
          _push(ssrRenderComponent(_component_UButton, {
            icon: "i-heroicons-x-mark",
            color: "error",
            variant: "ghost",
            size: "xs",
            onClick: ($event) => removeRatingCriteria(Number(index))
          }, null, _parent));
          _push(`</div>`);
        });
        _push(`<!--]--></div>`);
        _push(ssrRenderComponent(_component_UTextarea, {
          "model-value": blockData.value.verdict,
          placeholder: "Kesimpulan/verdict...",
          rows: 2,
          class: "w-full",
          "onUpdate:modelValue": ($event) => updateData("verdict", $event)
        }, null, _parent));
        _push(`</div><!--]-->`);
      } else if (block.value.type === "cta-box") {
        _push(`<!--[--><!-- CTA Box Block --><div class="space-y-3">`);
        _push(ssrRenderComponent(_component_UInput, {
          "model-value": blockData.value.title,
          placeholder: "Judul CTA...",
          class: "w-full",
          "onUpdate:modelValue": ($event) => updateData("title", $event)
        }, null, _parent));
        _push(ssrRenderComponent(_component_UTextarea, {
          "model-value": blockData.value.description,
          placeholder: "Deskripsi (opsional)...",
          rows: 2,
          class: "w-full",
          "onUpdate:modelValue": ($event) => updateData("description", $event)
        }, null, _parent));
        _push(`<div class="flex gap-3">`);
        _push(ssrRenderComponent(_component_UInput, {
          "model-value": blockData.value.buttonText,
          placeholder: "Teks button...",
          class: "flex-1 w-full",
          "onUpdate:modelValue": ($event) => updateData("buttonText", $event)
        }, null, _parent));
        _push(ssrRenderComponent(_component_UInput, {
          "model-value": blockData.value.buttonUrl,
          placeholder: "URL button...",
          class: "flex-1 w-full",
          "onUpdate:modelValue": ($event) => updateData("buttonUrl", $event)
        }, null, _parent));
        _push(`</div></div><!--]-->`);
      } else if (block.value.type === "accordion") {
        _push(`<!--[--><!-- Accordion Block --><div class="space-y-3"><!--[-->`);
        ssrRenderList(blockData.value.items, (item, index) => {
          _push(`<div class="rounded border p-3 dark:border-gray-700"><div class="mb-2 flex items-center justify-between"><span class="text-sm font-medium">Item ${ssrInterpolate(Number(index) + 1)}</span>`);
          _push(ssrRenderComponent(_component_UButton, {
            icon: "i-heroicons-x-mark",
            color: "error",
            variant: "ghost",
            size: "xs",
            onClick: ($event) => removeAccordionItem(Number(index))
          }, null, _parent));
          _push(`</div><div class="space-y-2">`);
          _push(ssrRenderComponent(_component_UInput, {
            "model-value": item.title,
            placeholder: "Judul...",
            class: "w-full",
            "onUpdate:modelValue": (val) => {
              const items = [...blockData.value.items || []];
              items[Number(index)] = { ...items[Number(index)], title: val };
              updateData("items", items);
            }
          }, null, _parent));
          _push(ssrRenderComponent(_component_UTextarea, {
            "model-value": item.content,
            placeholder: "Konten...",
            rows: 2,
            class: "w-full",
            "onUpdate:modelValue": (val) => {
              const items = [...blockData.value.items || []];
              items[Number(index)] = { ...items[Number(index)], content: val };
              updateData("items", items);
            }
          }, null, _parent));
          _push(`</div></div>`);
        });
        _push(`<!--]-->`);
        _push(ssrRenderComponent(_component_UButton, {
          icon: "i-heroicons-plus",
          variant: "soft",
          size: "sm",
          onClick: addAccordionItem
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(` Tambah Item `);
            } else {
              return [
                createTextVNode(" Tambah Item ")
              ];
            }
          }),
          _: 1
          /* STABLE */
        }, _parent));
        _push(`</div><!--]-->`);
      } else if (block.value.type === "table") {
        _push(`<!--[--><!-- Table Block --><div class="space-y-3"><div class="flex items-center gap-2">`);
        _push(ssrRenderComponent(_component_UButton, {
          icon: "i-heroicons-plus",
          variant: "soft",
          size: "xs",
          onClick: addTableColumn
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(` Kolom `);
            } else {
              return [
                createTextVNode(" Kolom ")
              ];
            }
          }),
          _: 1
          /* STABLE */
        }, _parent));
        _push(ssrRenderComponent(_component_UButton, {
          icon: "i-heroicons-plus",
          variant: "soft",
          size: "xs",
          onClick: addTableRow
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(` Baris `);
            } else {
              return [
                createTextVNode(" Baris ")
              ];
            }
          }),
          _: 1
          /* STABLE */
        }, _parent));
        _push(`</div><div class="overflow-x-auto"><table class="min-w-full border dark:border-gray-700"><thead><tr><!--[-->`);
        ssrRenderList(blockData.value.headers, (header, colIndex) => {
          _push(`<th class="border-b bg-gray-50 p-2 dark:border-gray-700 dark:bg-gray-800"><div class="flex items-center gap-1">`);
          _push(ssrRenderComponent(_component_UInput, {
            "model-value": header,
            size: "sm",
            class: "flex-1 w-full",
            "onUpdate:modelValue": (val) => {
              const headers = [...blockData.value.headers || []];
              headers[Number(colIndex)] = val;
              updateData("headers", headers);
            }
          }, null, _parent));
          _push(ssrRenderComponent(_component_UButton, {
            icon: "i-heroicons-x-mark",
            color: "error",
            variant: "ghost",
            size: "xs",
            onClick: ($event) => removeTableColumn(Number(colIndex))
          }, null, _parent));
          _push(`</div></th>`);
        });
        _push(`<!--]--></tr></thead><tbody><!--[-->`);
        ssrRenderList(blockData.value.rows, (row, rowIndex) => {
          _push(`<tr><!--[-->`);
          ssrRenderList(row, (cell, colIndex) => {
            _push(`<td class="border-b p-2 dark:border-gray-700">`);
            _push(ssrRenderComponent(_component_UInput, {
              "model-value": cell,
              size: "sm",
              class: "w-full",
              "onUpdate:modelValue": (val) => {
                const rows = [...blockData.value.rows || []];
                rows[Number(rowIndex)][Number(colIndex)] = val;
                updateData("rows", rows);
              }
            }, null, _parent));
            _push(`</td>`);
          });
          _push(`<!--]--><td class="border-b p-2 dark:border-gray-700">`);
          _push(ssrRenderComponent(_component_UButton, {
            icon: "i-heroicons-x-mark",
            color: "error",
            variant: "ghost",
            size: "xs",
            onClick: ($event) => removeTableRow(Number(rowIndex))
          }, null, _parent));
          _push(`</td></tr>`);
        });
        _push(`<!--]--></tbody></table></div></div><!--]-->`);
      } else if (block.value.type === "gallery") {
        _push(`<!--[--><!-- Gallery Block --><div class="space-y-3"><div class="flex items-center gap-3"><span class="text-sm text-gray-500">Kolom:</span>`);
        _push(ssrRenderComponent(_component_USelect, {
          "model-value": blockData.value.columns,
          options: [
            { value: 2, label: "2 Kolom" },
            { value: 3, label: "3 Kolom" },
            { value: 4, label: "4 Kolom" }
          ],
          "option-attribute": "label",
          "value-attribute": "value",
          size: "sm",
          class: "w-32",
          "onUpdate:modelValue": ($event) => updateData("columns", $event)
        }, null, _parent));
        _push(`</div><div class="grid grid-cols-4 gap-2"><!--[-->`);
        ssrRenderList(blockData.value.images, (img, index) => {
          _push(`<div class="group relative aspect-square"><img${ssrRenderAttr("src", img.src)}${ssrRenderAttr("alt", img.alt)} class="h-full w-full rounded object-cover">`);
          _push(ssrRenderComponent(_component_UButton, {
            icon: "i-heroicons-x-mark",
            color: "error",
            variant: "solid",
            size: "xs",
            class: "absolute right-1 top-1 opacity-0 transition group-hover:opacity-100",
            onClick: ($event) => removeGalleryImage(Number(index))
          }, null, _parent));
          _push(`</div>`);
        });
        _push(`<!--]--><label class="flex aspect-square cursor-pointer flex-col items-center justify-center rounded border-2 border-dashed border-gray-300 hover:border-primary-500 dark:border-gray-600">`);
        _push(ssrRenderComponent(_component_UIcon, {
          name: "i-heroicons-plus",
          class: "h-6 w-6 text-gray-400"
        }, null, _parent));
        _push(`<span class="mt-1 text-xs text-gray-500">Tambah</span><input type="file" class="hidden" accept="image/*" multiple></label></div></div><!--]-->`);
      } else if (block.value.type === "toc") {
        _push(`<!--[--><!-- TOC Block --><div class="space-y-3">`);
        _push(ssrRenderComponent(_component_UInput, {
          "model-value": blockData.value.title,
          placeholder: "Judul Daftar Isi...",
          class: "w-full",
          "onUpdate:modelValue": ($event) => updateData("title", $event)
        }, null, _parent));
        _push(`<div class="flex items-center gap-3"><span class="text-sm text-gray-500">Max Depth:</span>`);
        _push(ssrRenderComponent(_component_USelect, {
          "model-value": blockData.value.maxDepth,
          options: [
            { value: 2, label: "H2 saja" },
            { value: 3, label: "H2 - H3" },
            { value: 4, label: "H2 - H4" }
          ],
          "option-attribute": "label",
          "value-attribute": "value",
          size: "sm",
          class: "w-32",
          "onUpdate:modelValue": ($event) => updateData("maxDepth", $event)
        }, null, _parent));
        _push(`</div><p class="text-sm text-gray-500"> Daftar isi akan dibuat otomatis berdasarkan heading dalam artikel. </p></div><!--]-->`);
      } else if (block.value.type === "product-card") {
        _push(`<!--[--><!-- Product Card Block --><div class="space-y-3">`);
        _push(ssrRenderComponent(_component_UInput, {
          "model-value": blockData.value.productSlug,
          placeholder: "Slug produk (kosongkan untuk input manual)...",
          class: "w-full",
          "onUpdate:modelValue": ($event) => updateData("productSlug", $event)
        }, null, _parent));
        _push(`<div class="text-sm text-gray-500">atau input manual:</div><div class="grid gap-3 md:grid-cols-2">`);
        _push(ssrRenderComponent(_component_UInput, {
          "model-value": blockData.value.name,
          placeholder: "Nama produk...",
          class: "w-full",
          "onUpdate:modelValue": ($event) => updateData("name", $event)
        }, null, _parent));
        _push(ssrRenderComponent(_component_UInput, {
          "model-value": blockData.value.url,
          placeholder: "URL produk...",
          class: "w-full",
          "onUpdate:modelValue": ($event) => updateData("url", $event)
        }, null, _parent));
        _push(ssrRenderComponent(_component_UInput, {
          "model-value": blockData.value.price,
          type: "number",
          placeholder: "Harga...",
          class: "w-full",
          "onUpdate:modelValue": ($event) => updateData("price", Number($event))
        }, null, _parent));
        _push(ssrRenderComponent(_component_UInput, {
          "model-value": blockData.value.image,
          placeholder: "URL gambar...",
          class: "w-full",
          "onUpdate:modelValue": ($event) => updateData("image", $event)
        }, null, _parent));
        _push(`</div></div><!--]-->`);
      } else if (block.value.type === "product-list") {
        _push(`<!--[--><!-- Product List Block --><div class="space-y-3">`);
        _push(ssrRenderComponent(_component_UInput, {
          "model-value": blockData.value.title,
          placeholder: "Judul (opsional)...",
          class: "w-full",
          "onUpdate:modelValue": ($event) => updateData("title", $event)
        }, null, _parent));
        _push(ssrRenderComponent(_component_UInput, {
          "model-value": blockData.value.category,
          placeholder: "Kategori produk...",
          class: "w-full",
          "onUpdate:modelValue": ($event) => updateData("category", $event)
        }, null, _parent));
        _push(`<div class="flex items-center gap-3"><span class="text-sm text-gray-500">Jumlah:</span>`);
        _push(ssrRenderComponent(_component_UInput, {
          "model-value": blockData.value.limit,
          type: "number",
          min: "1",
          max: "12",
          class: "w-20",
          "onUpdate:modelValue": ($event) => updateData("limit", Number($event))
        }, null, _parent));
        _push(`<span class="text-sm text-gray-500">Kolom:</span>`);
        _push(ssrRenderComponent(_component_USelect, {
          "model-value": blockData.value.columns,
          options: [
            { value: 2, label: "2" },
            { value: 3, label: "3" },
            { value: 4, label: "4" }
          ],
          "option-attribute": "label",
          "value-attribute": "value",
          size: "sm",
          class: "w-20",
          "onUpdate:modelValue": ($event) => updateData("columns", $event)
        }, null, _parent));
        _push(`</div></div><!--]-->`);
      } else if (block.value.type === "html") {
        _push(`<!--[--><!-- HTML Block --><div class="space-y-3">`);
        _push(ssrRenderComponent(_component_UTextarea, {
          "model-value": blockData.value.html,
          placeholder: "<div>HTML kustom...</div>",
          rows: 6,
          class: "font-mono w-full",
          "onUpdate:modelValue": ($event) => updateData("html", $event)
        }, null, _parent));
        _push(ssrRenderComponent(_component_UAlert, {
          color: "warning",
          variant: "soft",
          icon: "i-heroicons-exclamation-triangle",
          title: "Perhatian",
          description: "HTML kustom bisa berbahaya. Pastikan kode yang dimasukkan aman."
        }, null, _parent));
        _push(`</div><!--]-->`);
      } else if (block.value.type === "newsletter") {
        _push(`<!--[--><!-- Newsletter Block --><div class="space-y-3">`);
        _push(ssrRenderComponent(_component_UInput, {
          "model-value": blockData.value.title,
          placeholder: "Judul...",
          class: "w-full",
          "onUpdate:modelValue": ($event) => updateData("title", $event)
        }, null, _parent));
        _push(ssrRenderComponent(_component_UTextarea, {
          "model-value": blockData.value.description,
          placeholder: "Deskripsi...",
          rows: 2,
          class: "w-full",
          "onUpdate:modelValue": ($event) => updateData("description", $event)
        }, null, _parent));
        _push(ssrRenderComponent(_component_UInput, {
          "model-value": blockData.value.buttonText,
          placeholder: "Teks button...",
          class: "w-full",
          "onUpdate:modelValue": ($event) => updateData("buttonText", $event)
        }, null, _parent));
        _push(`</div><!--]-->`);
      } else if (block.value.type === "author-box") {
        _push(`<!--[--><!-- Author Box Block --><div class="space-y-3"><div class="flex items-center gap-4">`);
        _push(ssrRenderComponent(_component_UCheckbox, {
          "model-value": blockData.value.showBio,
          label: "Tampilkan bio",
          "onUpdate:modelValue": ($event) => updateData("showBio", $event)
        }, null, _parent));
        _push(ssrRenderComponent(_component_UCheckbox, {
          "model-value": blockData.value.showSocial,
          label: "Tampilkan social media",
          "onUpdate:modelValue": ($event) => updateData("showSocial", $event)
        }, null, _parent));
        _push(`</div><p class="text-sm text-gray-500"> Info penulis akan diambil otomatis dari data penulis artikel. </p></div><!--]-->`);
      } else if (block.value.type === "related-articles") {
        _push(`<!--[--><!-- Related Articles Block --><div class="space-y-3">`);
        _push(ssrRenderComponent(_component_UInput, {
          "model-value": blockData.value.title,
          placeholder: "Judul (opsional)...",
          class: "w-full",
          "onUpdate:modelValue": ($event) => updateData("title", $event)
        }, null, _parent));
        _push(ssrRenderComponent(_component_UInput, {
          "model-value": blockData.value.category,
          placeholder: "Kategori (kosongkan untuk otomatis)...",
          class: "w-full",
          "onUpdate:modelValue": ($event) => updateData("category", $event)
        }, null, _parent));
        _push(`<div class="flex items-center gap-3"><span class="text-sm text-gray-500">Jumlah:</span>`);
        _push(ssrRenderComponent(_component_UInput, {
          "model-value": blockData.value.limit,
          type: "number",
          min: "1",
          max: "6",
          class: "w-20",
          "onUpdate:modelValue": ($event) => updateData("limit", Number($event))
        }, null, _parent));
        _push(`</div></div><!--]-->`);
      } else {
        _push(`<!--[--><!-- Default fallback --><div class="rounded bg-yellow-50 p-4 text-center text-sm text-yellow-700 dark:bg-yellow-900/20 dark:text-yellow-400"> Editor untuk blok &quot;${ssrInterpolate(block.value.type)}&quot; belum tersedia. </div><!--]-->`);
      }
      _push(`</div>`);
    };
  }
});

const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("inertia/components/admin/BlockEditor.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "ArticlePageBuilder",
  __ssrInlineRender: true,
  props: {
    modelValue: {},
    uploadUrl: {}
  },
  emits: ["update:modelValue"],
  setup(__props, { emit: __emit }) {
    function generateId() {
      return `block_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
    }
    const props = __props;
    const emit = __emit;
    const blocks = ref([...props.modelValue]);
    const selectedBlockIndex = ref(null);
    const showBlockPicker = ref(false);
    const insertPosition = ref("bottom");
    const activeCategory = ref("text");
    watch(
      () => props.modelValue,
      (val) => {
        if (JSON.stringify(val) !== JSON.stringify(blocks.value)) {
          blocks.value = [...val];
        }
      }
    );
    watch(
      blocks,
      (val) => {
        emit("update:modelValue", val);
      },
      { deep: true }
    );
    const filteredBlocks = computed(() => {
      return BLOCK_DEFINITIONS.filter((b) => b.category === activeCategory.value);
    });
    function addBlock(type) {
      const newBlock = createBlock$1(type);
      if (insertPosition.value === "top") {
        blocks.value.unshift(newBlock);
        selectedBlockIndex.value = 0;
      } else if (insertPosition.value === "bottom") {
        blocks.value.push(newBlock);
        selectedBlockIndex.value = blocks.value.length - 1;
      } else {
        const pos = insertPosition.value;
        blocks.value.splice(pos + 1, 0, newBlock);
        selectedBlockIndex.value = pos + 1;
      }
      showBlockPicker.value = false;
    }
    function createBlock$1(type) {
      const id = generateId();
      const defaults = {
        heading: { id, type: "heading", data: { text: "", level: 2 } },
        paragraph: { id, type: "paragraph", data: { text: "" } },
        image: { id, type: "image", data: { src: "", alt: "" } },
        gallery: { id, type: "gallery", data: { images: [], columns: 3 } },
        list: { id, type: "list", data: { style: "unordered", items: [{ text: "" }] } },
        quote: { id, type: "quote", data: { text: "" } },
        code: { id, type: "code", data: { code: "", language: "javascript" } },
        table: { id, type: "table", data: { headers: ["Kolom 1", "Kolom 2"], rows: [["", ""]] } },
        divider: { id, type: "divider", data: { style: "solid" } },
        embed: { id, type: "embed", data: { url: "" } },
        alert: { id, type: "alert", data: { text: "", type: "info" } },
        accordion: { id, type: "accordion", data: { items: [{ title: "", content: "" }] } },
        button: { id, type: "button", data: { text: "Button", url: "" } },
        "product-card": { id, type: "product-card", data: {} },
        "product-list": { id, type: "product-list", data: { limit: 4 } },
        "cta-box": { id, type: "cta-box", data: { title: "", buttonText: "", buttonUrl: "" } },
        "pros-cons": { id, type: "pros-cons", data: { pros: [""], cons: [""] } },
        "rating-box": { id, type: "rating-box", data: { overallRating: 4 } },
        "comparison-table": { id, type: "comparison-table", data: { headers: [], features: [] } },
        toc: { id, type: "toc", data: { title: "Daftar Isi" } },
        "author-box": { id, type: "author-box", data: {} },
        "related-articles": { id, type: "related-articles", data: { limit: 3 } },
        newsletter: { id, type: "newsletter", data: { title: "Berlangganan Newsletter" } },
        spacer: { id, type: "spacer", data: { height: "md" } },
        columns: { id, type: "columns", data: { columns: [{ width: "1/2", blocks: [] }, { width: "1/2", blocks: [] }] } },
        html: { id, type: "html", data: { html: "" } }
      };
      return defaults[type] || { id, type, data: {} };
    }
    function removeBlock(index) {
      blocks.value.splice(index, 1);
      selectedBlockIndex.value = null;
    }
    function duplicateBlock(index) {
      const original = blocks.value[index];
      const duplicate = {
        ...JSON.parse(JSON.stringify(original)),
        id: generateId()
      };
      blocks.value.splice(index + 1, 0, duplicate);
      selectedBlockIndex.value = index + 1;
    }
    function moveBlock(index, direction) {
      const newIndex = direction === "up" ? index - 1 : index + 1;
      if (newIndex < 0 || newIndex >= blocks.value.length) return;
      const [block] = blocks.value.splice(index, 1);
      blocks.value.splice(newIndex, 0, block);
      selectedBlockIndex.value = newIndex;
    }
    function openBlockPicker(position = "bottom") {
      insertPosition.value = position;
      showBlockPicker.value = true;
    }
    function getBlockIcon(type) {
      const def = BLOCK_DEFINITIONS.find((b) => b.type === type);
      return def?.icon || "i-heroicons-square-3-stack-3d";
    }
    function getBlockLabel(type) {
      const def = BLOCK_DEFINITIONS.find((b) => b.type === type);
      return def?.label || type;
    }
    async function handleImageUpload(file) {
      if (!props.uploadUrl) {
        return new Promise((resolve) => {
          const reader = new FileReader();
          reader.onload = () => resolve(reader.result);
          reader.readAsDataURL(file);
        });
      }
      const formData = new FormData();
      formData.append("image", file);
      const response = await fetch(props.uploadUrl, {
        method: "POST",
        body: formData
      });
      const data = await response.json();
      return data.url;
    }
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UButton = _sfc_main$8;
      const _component_UIcon = _sfc_main$3;
      const _component_UModal = _sfc_main$c;
      const _component_UCard = _sfc_main$d;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "article-page-builder" }, _attrs))}><!-- Toolbar --><div class="mb-4 flex items-center justify-between rounded-lg border border-gray-200 bg-white p-3 dark:border-gray-700 dark:bg-gray-800"><div class="flex items-center gap-2">`);
      _push(ssrRenderComponent(_component_UButton, {
        icon: "i-heroicons-plus",
        color: "primary",
        variant: "soft",
        size: "sm",
        onClick: ($event) => openBlockPicker("bottom")
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` Tambah Blok `);
          } else {
            return [
              createTextVNode(" Tambah Blok ")
            ];
          }
        }),
        _: 1
        /* STABLE */
      }, _parent));
      _push(`<span class="text-sm text-gray-500">${ssrInterpolate(blocks.value.length)} blok </span></div><div class="flex items-center gap-2">`);
      if (blocks.value.length > 0) {
        _push(ssrRenderComponent(_component_UButton, {
          icon: "i-heroicons-trash",
          color: "error",
          variant: "ghost",
          size: "sm",
          onClick: ($event) => blocks.value = []
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(` Hapus Semua `);
            } else {
              return [
                createTextVNode(" Hapus Semua ")
              ];
            }
          }),
          _: 1
          /* STABLE */
        }, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div><!-- Empty state -->`);
      if (blocks.value.length === 0) {
        _push(`<div class="flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 p-12 text-center dark:border-gray-600">`);
        _push(ssrRenderComponent(_component_UIcon, {
          name: "i-heroicons-document-plus",
          class: "mb-4 h-12 w-12 text-gray-300"
        }, null, _parent));
        _push(`<h3 class="mb-2 text-lg font-medium text-gray-900 dark:text-white"> Mulai membangun konten </h3><p class="mb-4 text-sm text-gray-500"> Klik tombol di bawah untuk menambahkan blok pertama </p>`);
        _push(ssrRenderComponent(_component_UButton, {
          icon: "i-heroicons-plus",
          color: "primary",
          onClick: ($event) => openBlockPicker()
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(` Tambah Blok `);
            } else {
              return [
                createTextVNode(" Tambah Blok ")
              ];
            }
          }),
          _: 1
          /* STABLE */
        }, _parent));
        _push(`</div>`);
      } else {
        _push(`<!--[--><!-- Blocks list --><div class="space-y-2"><!-- Add block at top --><button class="flex w-full items-center justify-center gap-2 rounded border-2 border-dashed border-gray-200 py-2 text-sm text-gray-400 transition hover:border-primary-500 hover:text-primary-500 dark:border-gray-700">`);
        _push(ssrRenderComponent(_component_UIcon, {
          name: "i-heroicons-plus",
          class: "h-4 w-4"
        }, null, _parent));
        _push(`<span>Tambah di atas</span></button><!--[-->`);
        ssrRenderList(blocks.value, (block, index) => {
          _push(`<div class="group relative"><!-- Block wrapper --><div class="${ssrRenderClass([
            "rounded-lg border-2 bg-white p-4 transition dark:bg-gray-800",
            selectedBlockIndex.value === index ? "border-primary-500 ring-2 ring-primary-500/20" : "border-gray-200 hover:border-gray-300 dark:border-gray-700 dark:hover:border-gray-600"
          ])}"><!-- Block header --><div class="mb-3 flex items-center justify-between"><div class="flex items-center gap-2"><div class="flex h-8 w-8 items-center justify-center rounded bg-gray-100 dark:bg-gray-700">`);
          _push(ssrRenderComponent(_component_UIcon, {
            name: getBlockIcon(block.type),
            class: "h-4 w-4 text-gray-500"
          }, null, _parent));
          _push(`</div><span class="text-sm font-medium text-gray-700 dark:text-gray-300">${ssrInterpolate(getBlockLabel(block.type))}</span></div><div class="flex items-center gap-1">`);
          _push(ssrRenderComponent(_component_UButton, {
            icon: "i-heroicons-chevron-up",
            color: "neutral",
            variant: "ghost",
            size: "xs",
            disabled: index === 0,
            onClick: ($event) => moveBlock(index, "up")
          }, null, _parent));
          _push(ssrRenderComponent(_component_UButton, {
            icon: "i-heroicons-chevron-down",
            color: "neutral",
            variant: "ghost",
            size: "xs",
            disabled: index === blocks.value.length - 1,
            onClick: ($event) => moveBlock(index, "down")
          }, null, _parent));
          _push(ssrRenderComponent(_component_UButton, {
            icon: "i-heroicons-document-duplicate",
            color: "neutral",
            variant: "ghost",
            size: "xs",
            onClick: ($event) => duplicateBlock(index)
          }, null, _parent));
          _push(ssrRenderComponent(_component_UButton, {
            icon: "i-heroicons-trash",
            color: "error",
            variant: "ghost",
            size: "xs",
            onClick: ($event) => removeBlock(index)
          }, null, _parent));
          _push(`</div></div><!-- Block editor -->`);
          _push(ssrRenderComponent(_sfc_main$1, {
            modelValue: blocks.value[index],
            "onUpdate:modelValue": ($event) => blocks.value[index] = $event,
            "upload-handler": handleImageUpload
          }, null, _parent));
          _push(`</div><!-- Add block after --><button class="mt-2 flex w-full items-center justify-center gap-2 rounded border-2 border-dashed border-transparent py-1 text-sm text-gray-400 opacity-0 transition group-hover:border-gray-200 group-hover:opacity-100 hover:border-primary-500! hover:text-primary-500! dark:group-hover:border-gray-700">`);
          _push(ssrRenderComponent(_component_UIcon, {
            name: "i-heroicons-plus",
            class: "h-4 w-4"
          }, null, _parent));
          _push(`<span>Tambah blok</span></button></div>`);
        });
        _push(`<!--]--></div><!--]-->`);
      }
      _push(`<!-- Block picker modal -->`);
      _push(ssrRenderComponent(_component_UModal, {
        modelValue: showBlockPicker.value,
        "onUpdate:modelValue": ($event) => showBlockPicker.value = $event,
        ui: { width: "sm:max-w-2xl" }
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_UCard, null, {
              header: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="flex items-center justify-between"${_scopeId2}><h3 class="text-lg font-semibold"${_scopeId2}>Pilih Blok</h3>`);
                  _push3(ssrRenderComponent(_component_UButton, {
                    icon: "i-heroicons-x-mark",
                    color: "neutral",
                    variant: "ghost",
                    size: "sm",
                    onClick: ($event) => showBlockPicker.value = false
                  }, null, _parent3, _scopeId2));
                  _push3(`</div>`);
                } else {
                  return [
                    createVNode("div", { class: "flex items-center justify-between" }, [
                      createVNode("h3", { class: "text-lg font-semibold" }, "Pilih Blok"),
                      createVNode(_component_UButton, {
                        icon: "i-heroicons-x-mark",
                        color: "neutral",
                        variant: "ghost",
                        size: "sm",
                        onClick: ($event) => showBlockPicker.value = false
                      }, null, 8, ["onClick"])
                    ])
                  ];
                }
              }),
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="space-y-4"${_scopeId2}><!-- Category tabs --><div class="flex flex-wrap gap-2"${_scopeId2}><!--[-->`);
                  ssrRenderList(unref(BLOCK_CATEGORIES), (cat) => {
                    _push3(ssrRenderComponent(_component_UButton, {
                      key: cat.id,
                      color: activeCategory.value === cat.id ? "primary" : "neutral",
                      variant: activeCategory.value === cat.id ? "soft" : "ghost",
                      size: "sm",
                      onClick: ($event) => activeCategory.value = cat.id
                    }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`${ssrInterpolate(cat.label)}`);
                        } else {
                          return [
                            createTextVNode(
                              toDisplayString(cat.label),
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
                  _push3(`<!--]--></div><!-- Block grid --><div class="grid grid-cols-3 gap-3 sm:grid-cols-4"${_scopeId2}><!--[-->`);
                  ssrRenderList(filteredBlocks.value, (def) => {
                    _push3(`<button class="flex flex-col items-center gap-2 rounded-lg border border-gray-200 p-4 transition hover:border-primary-500 hover:bg-primary-50 dark:border-gray-700 dark:hover:bg-primary-900/20"${_scopeId2}>`);
                    _push3(ssrRenderComponent(_component_UIcon, {
                      name: def.icon,
                      class: "h-6 w-6 text-gray-500"
                    }, null, _parent3, _scopeId2));
                    _push3(`<span class="text-xs text-gray-700 dark:text-gray-300"${_scopeId2}>${ssrInterpolate(def.label)}</span></button>`);
                  });
                  _push3(`<!--]--></div></div>`);
                } else {
                  return [
                    createVNode("div", { class: "space-y-4" }, [
                      createCommentVNode(" Category tabs "),
                      createVNode("div", { class: "flex flex-wrap gap-2" }, [
                        (openBlock(true), createBlock(
                          Fragment,
                          null,
                          renderList(unref(BLOCK_CATEGORIES), (cat) => {
                            return openBlock(), createBlock(_component_UButton, {
                              key: cat.id,
                              color: activeCategory.value === cat.id ? "primary" : "neutral",
                              variant: activeCategory.value === cat.id ? "soft" : "ghost",
                              size: "sm",
                              onClick: ($event) => activeCategory.value = cat.id
                            }, {
                              default: withCtx(() => [
                                createTextVNode(
                                  toDisplayString(cat.label),
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
                      ]),
                      createCommentVNode(" Block grid "),
                      createVNode("div", { class: "grid grid-cols-3 gap-3 sm:grid-cols-4" }, [
                        (openBlock(true), createBlock(
                          Fragment,
                          null,
                          renderList(filteredBlocks.value, (def) => {
                            return openBlock(), createBlock("button", {
                              key: def.type,
                              class: "flex flex-col items-center gap-2 rounded-lg border border-gray-200 p-4 transition hover:border-primary-500 hover:bg-primary-50 dark:border-gray-700 dark:hover:bg-primary-900/20",
                              onClick: ($event) => addBlock(def.type)
                            }, [
                              createVNode(_component_UIcon, {
                                name: def.icon,
                                class: "h-6 w-6 text-gray-500"
                              }, null, 8, ["name"]),
                              createVNode(
                                "span",
                                { class: "text-xs text-gray-700 dark:text-gray-300" },
                                toDisplayString(def.label),
                                1
                                /* TEXT */
                              )
                            ], 8, ["onClick"]);
                          }),
                          128
                          /* KEYED_FRAGMENT */
                        ))
                      ])
                    ])
                  ];
                }
              }),
              _: 1
              /* STABLE */
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_UCard, null, {
                header: withCtx(() => [
                  createVNode("div", { class: "flex items-center justify-between" }, [
                    createVNode("h3", { class: "text-lg font-semibold" }, "Pilih Blok"),
                    createVNode(_component_UButton, {
                      icon: "i-heroicons-x-mark",
                      color: "neutral",
                      variant: "ghost",
                      size: "sm",
                      onClick: ($event) => showBlockPicker.value = false
                    }, null, 8, ["onClick"])
                  ])
                ]),
                default: withCtx(() => [
                  createVNode("div", { class: "space-y-4" }, [
                    createCommentVNode(" Category tabs "),
                    createVNode("div", { class: "flex flex-wrap gap-2" }, [
                      (openBlock(true), createBlock(
                        Fragment,
                        null,
                        renderList(unref(BLOCK_CATEGORIES), (cat) => {
                          return openBlock(), createBlock(_component_UButton, {
                            key: cat.id,
                            color: activeCategory.value === cat.id ? "primary" : "neutral",
                            variant: activeCategory.value === cat.id ? "soft" : "ghost",
                            size: "sm",
                            onClick: ($event) => activeCategory.value = cat.id
                          }, {
                            default: withCtx(() => [
                              createTextVNode(
                                toDisplayString(cat.label),
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
                    ]),
                    createCommentVNode(" Block grid "),
                    createVNode("div", { class: "grid grid-cols-3 gap-3 sm:grid-cols-4" }, [
                      (openBlock(true), createBlock(
                        Fragment,
                        null,
                        renderList(filteredBlocks.value, (def) => {
                          return openBlock(), createBlock("button", {
                            key: def.type,
                            class: "flex flex-col items-center gap-2 rounded-lg border border-gray-200 p-4 transition hover:border-primary-500 hover:bg-primary-50 dark:border-gray-700 dark:hover:bg-primary-900/20",
                            onClick: ($event) => addBlock(def.type)
                          }, [
                            createVNode(_component_UIcon, {
                              name: def.icon,
                              class: "h-6 w-6 text-gray-500"
                            }, null, 8, ["name"]),
                            createVNode(
                              "span",
                              { class: "text-xs text-gray-700 dark:text-gray-300" },
                              toDisplayString(def.label),
                              1
                              /* TEXT */
                            )
                          ], 8, ["onClick"]);
                        }),
                        128
                        /* KEYED_FRAGMENT */
                      ))
                    ])
                  ])
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
      _push(`</div>`);
    };
  }
});

const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("inertia/components/admin/ArticlePageBuilder.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main$2 as _, _sfc_main as a };
