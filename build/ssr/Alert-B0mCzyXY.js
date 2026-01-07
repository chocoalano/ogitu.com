import { useSlots, computed, unref, mergeProps, withCtx, renderSlot, createVNode, createBlock, createCommentVNode, openBlock, createTextVNode, toDisplayString, Fragment, renderList, useSSRContext } from 'vue';
import { ssrRenderComponent, ssrRenderSlot, ssrRenderClass, ssrInterpolate, ssrRenderList } from 'vue/server-renderer';
import { Primitive } from 'reka-ui';
import { d as useLocale, a as useAppConfig } from './virtual_nuxt-ui-plugins-CrG8Uaxr.js';
import { t as tv, b as _sfc_main$1, _ as _sfc_main$2, a as _sfc_main$3 } from './Button-BTdvmZ8N.js';

const theme = {
  "slots": {
    "root": "relative overflow-hidden w-full rounded-lg p-4 flex gap-2.5",
    "wrapper": "min-w-0 flex-1 flex flex-col",
    "title": "text-sm font-medium",
    "description": "text-sm opacity-90",
    "icon": "shrink-0 size-5",
    "avatar": "shrink-0",
    "avatarSize": "2xl",
    "actions": "flex flex-wrap gap-1.5 shrink-0",
    "close": "p-0"
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
      "solid": "",
      "outline": "",
      "soft": "",
      "subtle": ""
    },
    "orientation": {
      "horizontal": {
        "root": "items-center",
        "actions": "items-center"
      },
      "vertical": {
        "root": "items-start",
        "actions": "items-start mt-2.5"
      }
    },
    "title": {
      "true": {
        "description": "mt-1"
      }
    }
  },
  "compoundVariants": [
    {
      "color": "primary",
      "variant": "solid",
      "class": {
        "root": "bg-primary text-inverted"
      }
    },
    {
      "color": "secondary",
      "variant": "solid",
      "class": {
        "root": "bg-secondary text-inverted"
      }
    },
    {
      "color": "success",
      "variant": "solid",
      "class": {
        "root": "bg-success text-inverted"
      }
    },
    {
      "color": "info",
      "variant": "solid",
      "class": {
        "root": "bg-info text-inverted"
      }
    },
    {
      "color": "warning",
      "variant": "solid",
      "class": {
        "root": "bg-warning text-inverted"
      }
    },
    {
      "color": "error",
      "variant": "solid",
      "class": {
        "root": "bg-error text-inverted"
      }
    },
    {
      "color": "primary",
      "variant": "outline",
      "class": {
        "root": "text-primary ring ring-inset ring-primary/25"
      }
    },
    {
      "color": "secondary",
      "variant": "outline",
      "class": {
        "root": "text-secondary ring ring-inset ring-secondary/25"
      }
    },
    {
      "color": "success",
      "variant": "outline",
      "class": {
        "root": "text-success ring ring-inset ring-success/25"
      }
    },
    {
      "color": "info",
      "variant": "outline",
      "class": {
        "root": "text-info ring ring-inset ring-info/25"
      }
    },
    {
      "color": "warning",
      "variant": "outline",
      "class": {
        "root": "text-warning ring ring-inset ring-warning/25"
      }
    },
    {
      "color": "error",
      "variant": "outline",
      "class": {
        "root": "text-error ring ring-inset ring-error/25"
      }
    },
    {
      "color": "primary",
      "variant": "soft",
      "class": {
        "root": "bg-primary/10 text-primary"
      }
    },
    {
      "color": "secondary",
      "variant": "soft",
      "class": {
        "root": "bg-secondary/10 text-secondary"
      }
    },
    {
      "color": "success",
      "variant": "soft",
      "class": {
        "root": "bg-success/10 text-success"
      }
    },
    {
      "color": "info",
      "variant": "soft",
      "class": {
        "root": "bg-info/10 text-info"
      }
    },
    {
      "color": "warning",
      "variant": "soft",
      "class": {
        "root": "bg-warning/10 text-warning"
      }
    },
    {
      "color": "error",
      "variant": "soft",
      "class": {
        "root": "bg-error/10 text-error"
      }
    },
    {
      "color": "primary",
      "variant": "subtle",
      "class": {
        "root": "bg-primary/10 text-primary ring ring-inset ring-primary/25"
      }
    },
    {
      "color": "secondary",
      "variant": "subtle",
      "class": {
        "root": "bg-secondary/10 text-secondary ring ring-inset ring-secondary/25"
      }
    },
    {
      "color": "success",
      "variant": "subtle",
      "class": {
        "root": "bg-success/10 text-success ring ring-inset ring-success/25"
      }
    },
    {
      "color": "info",
      "variant": "subtle",
      "class": {
        "root": "bg-info/10 text-info ring ring-inset ring-info/25"
      }
    },
    {
      "color": "warning",
      "variant": "subtle",
      "class": {
        "root": "bg-warning/10 text-warning ring ring-inset ring-warning/25"
      }
    },
    {
      "color": "error",
      "variant": "subtle",
      "class": {
        "root": "bg-error/10 text-error ring ring-inset ring-error/25"
      }
    },
    {
      "color": "neutral",
      "variant": "solid",
      "class": {
        "root": "text-inverted bg-inverted"
      }
    },
    {
      "color": "neutral",
      "variant": "outline",
      "class": {
        "root": "text-highlighted bg-default ring ring-inset ring-default"
      }
    },
    {
      "color": "neutral",
      "variant": "soft",
      "class": {
        "root": "text-highlighted bg-elevated/50"
      }
    },
    {
      "color": "neutral",
      "variant": "subtle",
      "class": {
        "root": "text-highlighted bg-elevated/50 ring ring-inset ring-accented"
      }
    }
  ],
  "defaultVariants": {
    "color": "primary",
    "variant": "solid"
  }
};

const _sfc_main = {
  __name: 'Alert',
  __ssrInlineRender: true,
  props: {
  as: { type: null, required: false },
  title: { type: String, required: false },
  description: { type: String, required: false },
  icon: { type: null, required: false },
  avatar: { type: Object, required: false },
  color: { type: null, required: false },
  variant: { type: null, required: false },
  orientation: { type: null, required: false, default: "vertical" },
  actions: { type: Array, required: false },
  close: { type: [Boolean, Object], required: false },
  closeIcon: { type: null, required: false },
  class: { type: null, required: false },
  ui: { type: null, required: false }
},
  emits: ["update:open"],
  setup(__props, { emit: __emit }) {

const props = __props;
const emits = __emit;
const slots = useSlots();
const { t } = useLocale();
const appConfig = useAppConfig();
const ui = computed(() => tv({ extend: tv(theme), ...appConfig.ui?.alert || {} })({
  color: props.color,
  variant: props.variant,
  orientation: props.orientation,
  title: !!props.title || !!slots.title
}));

return (_ctx, _push, _parent, _attrs) => {
  _push(ssrRenderComponent(unref(Primitive), mergeProps({
    as: __props.as,
    "data-orientation": __props.orientation,
    "data-slot": "root",
    class: ui.value.root({ class: [props.ui?.root, props.class] })
  }, _attrs), {
    default: withCtx((_, _push, _parent, _scopeId) => {
      if (_push) {
        ssrRenderSlot(_ctx.$slots, "leading", { ui: ui.value }, () => {
          if (__props.avatar) {
            _push(ssrRenderComponent(_sfc_main$1, mergeProps({
              size: props.ui?.avatarSize || ui.value.avatarSize()
            }, __props.avatar, {
              "data-slot": "avatar",
              class: ui.value.avatar({ class: props.ui?.avatar })
            }), null, _parent, _scopeId));
          } else if (__props.icon) {
            _push(ssrRenderComponent(_sfc_main$2, {
              name: __props.icon,
              "data-slot": "icon",
              class: ui.value.icon({ class: props.ui?.icon })
            }, null, _parent, _scopeId));
          } else {
            _push(`<!---->`);
          }
        }, _push, _parent, _scopeId);
        _push(`<div data-slot="wrapper" class="${
          ssrRenderClass(ui.value.wrapper({ class: props.ui?.wrapper }))
        }"${
          _scopeId
        }>`);
        if (__props.title || !!slots.title) {
          _push(`<div data-slot="title" class="${
            ssrRenderClass(ui.value.title({ class: props.ui?.title }))
          }"${
            _scopeId
          }>`);
          ssrRenderSlot(_ctx.$slots, "title", {}, () => {
            _push(`${ssrInterpolate(__props.title)}`);
          }, _push, _parent, _scopeId);
          _push(`</div>`);
        } else {
          _push(`<!---->`);
        }
        if (__props.description || !!slots.description) {
          _push(`<div data-slot="description" class="${
            ssrRenderClass(ui.value.description({ class: props.ui?.description }))
          }"${
            _scopeId
          }>`);
          ssrRenderSlot(_ctx.$slots, "description", {}, () => {
            _push(`${ssrInterpolate(__props.description)}`);
          }, _push, _parent, _scopeId);
          _push(`</div>`);
        } else {
          _push(`<!---->`);
        }
        if (__props.orientation === 'vertical' && (__props.actions?.length || !!slots.actions)) {
          _push(`<div data-slot="actions" class="${
            ssrRenderClass(ui.value.actions({ class: props.ui?.actions }))
          }"${
            _scopeId
          }>`);
          ssrRenderSlot(_ctx.$slots, "actions", {}, () => {
            _push(`<!--[-->`);
            ssrRenderList(__props.actions, (action, index) => {
              _push(ssrRenderComponent(_sfc_main$3, mergeProps({
                key: index,
                size: "xs"
              }, { ref_for: true }, action), null, _parent, _scopeId));
            });
            _push(`<!--]-->`);
          }, _push, _parent, _scopeId);
          _push(`</div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div>`);
        if (__props.orientation === 'horizontal' && (__props.actions?.length || !!slots.actions) || __props.close) {
          _push(`<div data-slot="actions" class="${
            ssrRenderClass(ui.value.actions({ class: props.ui?.actions, orientation: 'horizontal' }))
          }"${
            _scopeId
          }>`);
          if (__props.orientation === 'horizontal' && (__props.actions?.length || !!slots.actions)) {
            ssrRenderSlot(_ctx.$slots, "actions", {}, () => {
              _push(`<!--[-->`);
              ssrRenderList(__props.actions, (action, index) => {
                _push(ssrRenderComponent(_sfc_main$3, mergeProps({
                  key: index,
                  size: "xs"
                }, { ref_for: true }, action), null, _parent, _scopeId));
              });
              _push(`<!--]-->`);
            }, _push, _parent, _scopeId);
          } else {
            _push(`<!---->`);
          }
          ssrRenderSlot(_ctx.$slots, "close", { ui: ui.value }, () => {
            if (__props.close) {
              _push(ssrRenderComponent(_sfc_main$3, mergeProps({
                icon: __props.closeIcon || unref(appConfig).ui.icons.close,
                color: "neutral",
                variant: "link",
                "aria-label": unref(t)('alert.close')
              }, typeof __props.close === 'object' ? __props.close : {}, {
                "data-slot": "close",
                class: ui.value.close({ class: props.ui?.close }),
                onClick: $event => (emits('update:open', false))
              }), null, _parent, _scopeId));
            } else {
              _push(`<!---->`);
            }
          }, _push, _parent, _scopeId);
          _push(`</div>`);
        } else {
          _push(`<!---->`);
        }
      } else {
        return [
          renderSlot(_ctx.$slots, "leading", { ui: ui.value }, () => [
            (__props.avatar)
              ? (openBlock(), createBlock(_sfc_main$1, mergeProps({
                  key: 0,
                  size: props.ui?.avatarSize || ui.value.avatarSize()
                }, __props.avatar, {
                  "data-slot": "avatar",
                  class: ui.value.avatar({ class: props.ui?.avatar })
                }), null, 16 /* FULL_PROPS */, ["size", "class"]))
              : (__props.icon)
                ? (openBlock(), createBlock(_sfc_main$2, {
                    key: 1,
                    name: __props.icon,
                    "data-slot": "icon",
                    class: ui.value.icon({ class: props.ui?.icon })
                  }, null, 8 /* PROPS */, ["name", "class"]))
                : createCommentVNode("v-if", true)
          ]),
          createVNode("div", {
            "data-slot": "wrapper",
            class: ui.value.wrapper({ class: props.ui?.wrapper })
          }, [
            (__props.title || !!slots.title)
              ? (openBlock(), createBlock("div", {
                  key: 0,
                  "data-slot": "title",
                  class: ui.value.title({ class: props.ui?.title })
                }, [
                  renderSlot(_ctx.$slots, "title", {}, () => [
                    createTextVNode(toDisplayString(__props.title), 1 /* TEXT */)
                  ])
                ], 2 /* CLASS */))
              : createCommentVNode("v-if", true),
            (__props.description || !!slots.description)
              ? (openBlock(), createBlock("div", {
                  key: 1,
                  "data-slot": "description",
                  class: ui.value.description({ class: props.ui?.description })
                }, [
                  renderSlot(_ctx.$slots, "description", {}, () => [
                    createTextVNode(toDisplayString(__props.description), 1 /* TEXT */)
                  ])
                ], 2 /* CLASS */))
              : createCommentVNode("v-if", true),
            (__props.orientation === 'vertical' && (__props.actions?.length || !!slots.actions))
              ? (openBlock(), createBlock("div", {
                  key: 2,
                  "data-slot": "actions",
                  class: ui.value.actions({ class: props.ui?.actions })
                }, [
                  renderSlot(_ctx.$slots, "actions", {}, () => [
                    (openBlock(true), createBlock(Fragment, null, renderList(__props.actions, (action, index) => {
                      return (openBlock(), createBlock(_sfc_main$3, mergeProps({
                        key: index,
                        size: "xs"
                      }, { ref_for: true }, action), null, 16 /* FULL_PROPS */))
                    }), 128 /* KEYED_FRAGMENT */))
                  ])
                ], 2 /* CLASS */))
              : createCommentVNode("v-if", true)
          ], 2 /* CLASS */),
          (__props.orientation === 'horizontal' && (__props.actions?.length || !!slots.actions) || __props.close)
            ? (openBlock(), createBlock("div", {
                key: 0,
                "data-slot": "actions",
                class: ui.value.actions({ class: props.ui?.actions, orientation: 'horizontal' })
              }, [
                (__props.orientation === 'horizontal' && (__props.actions?.length || !!slots.actions))
                  ? renderSlot(_ctx.$slots, "actions", { key: 0 }, () => [
                      (openBlock(true), createBlock(Fragment, null, renderList(__props.actions, (action, index) => {
                        return (openBlock(), createBlock(_sfc_main$3, mergeProps({
                          key: index,
                          size: "xs"
                        }, { ref_for: true }, action), null, 16 /* FULL_PROPS */))
                      }), 128 /* KEYED_FRAGMENT */))
                    ])
                  : createCommentVNode("v-if", true),
                renderSlot(_ctx.$slots, "close", { ui: ui.value }, () => [
                  (__props.close)
                    ? (openBlock(), createBlock(_sfc_main$3, mergeProps({
                        key: 0,
                        icon: __props.closeIcon || unref(appConfig).ui.icons.close,
                        color: "neutral",
                        variant: "link",
                        "aria-label": unref(t)('alert.close')
                      }, typeof __props.close === 'object' ? __props.close : {}, {
                        "data-slot": "close",
                        class: ui.value.close({ class: props.ui?.close }),
                        onClick: $event => (emits('update:open', false))
                      }), null, 16 /* FULL_PROPS */, ["icon", "aria-label", "class", "onClick"]))
                    : createCommentVNode("v-if", true)
                ])
              ], 2 /* CLASS */))
            : createCommentVNode("v-if", true)
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
  ;(ssrContext.modules || (ssrContext.modules = new Set())).add("node_modules/@nuxt/ui/dist/runtime/components/Alert.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : undefined
};

export { _sfc_main as _ };
