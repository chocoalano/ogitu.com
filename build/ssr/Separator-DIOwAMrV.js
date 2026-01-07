import { useSlots, computed, unref, mergeProps, withCtx, createVNode, createBlock, createCommentVNode, openBlock, Fragment, renderSlot, toDisplayString, useSSRContext } from 'vue';
import { ssrRenderComponent, ssrRenderClass, ssrRenderSlot, ssrInterpolate } from 'vue/server-renderer';
import { useForwardProps, Separator } from 'reka-ui';
import { reactivePick } from '@vueuse/core';
import { a as useAppConfig } from './virtual_nuxt-ui-plugins-BqI2j5ZJ.js';
import { t as tv, _ as _sfc_main$1, b as _sfc_main$2 } from './Button-BBveOjhJ.js';

const theme = {
  "slots": {
    "root": "flex items-center align-center text-center",
    "border": "",
    "container": "font-medium text-default flex",
    "icon": "shrink-0 size-5",
    "avatar": "shrink-0",
    "avatarSize": "2xs",
    "label": "text-sm"
  },
  "variants": {
    "color": {
      "primary": {
        "border": "border-primary"
      },
      "secondary": {
        "border": "border-secondary"
      },
      "success": {
        "border": "border-success"
      },
      "info": {
        "border": "border-info"
      },
      "warning": {
        "border": "border-warning"
      },
      "error": {
        "border": "border-error"
      },
      "neutral": {
        "border": "border-default"
      }
    },
    "orientation": {
      "horizontal": {
        "root": "w-full flex-row",
        "border": "w-full",
        "container": "mx-3 whitespace-nowrap"
      },
      "vertical": {
        "root": "h-full flex-col",
        "border": "h-full",
        "container": "my-2"
      }
    },
    "size": {
      "xs": "",
      "sm": "",
      "md": "",
      "lg": "",
      "xl": ""
    },
    "type": {
      "solid": {
        "border": "border-solid"
      },
      "dashed": {
        "border": "border-dashed"
      },
      "dotted": {
        "border": "border-dotted"
      }
    }
  },
  "compoundVariants": [
    {
      "orientation": "horizontal",
      "size": "xs",
      "class": {
        "border": "border-t"
      }
    },
    {
      "orientation": "horizontal",
      "size": "sm",
      "class": {
        "border": "border-t-[2px]"
      }
    },
    {
      "orientation": "horizontal",
      "size": "md",
      "class": {
        "border": "border-t-[3px]"
      }
    },
    {
      "orientation": "horizontal",
      "size": "lg",
      "class": {
        "border": "border-t-[4px]"
      }
    },
    {
      "orientation": "horizontal",
      "size": "xl",
      "class": {
        "border": "border-t-[5px]"
      }
    },
    {
      "orientation": "vertical",
      "size": "xs",
      "class": {
        "border": "border-s"
      }
    },
    {
      "orientation": "vertical",
      "size": "sm",
      "class": {
        "border": "border-s-[2px]"
      }
    },
    {
      "orientation": "vertical",
      "size": "md",
      "class": {
        "border": "border-s-[3px]"
      }
    },
    {
      "orientation": "vertical",
      "size": "lg",
      "class": {
        "border": "border-s-[4px]"
      }
    },
    {
      "orientation": "vertical",
      "size": "xl",
      "class": {
        "border": "border-s-[5px]"
      }
    }
  ],
  "defaultVariants": {
    "color": "neutral",
    "size": "xs",
    "type": "solid"
  }
};

const _sfc_main = {
  __name: 'Separator',
  __ssrInlineRender: true,
  props: {
  as: { type: null, required: false },
  label: { type: String, required: false },
  icon: { type: null, required: false },
  avatar: { type: Object, required: false },
  color: { type: null, required: false },
  size: { type: null, required: false },
  type: { type: null, required: false },
  orientation: { type: null, required: false, default: "horizontal" },
  class: { type: null, required: false },
  ui: { type: null, required: false },
  decorative: { type: Boolean, required: false }
},
  setup(__props) {

const props = __props;
const slots = useSlots();
const appConfig = useAppConfig();
const rootProps = useForwardProps(reactivePick(props, "as", "decorative", "orientation"));
const ui = computed(() => tv({ extend: tv(theme), ...appConfig.ui?.separator || {} })({
  color: props.color,
  orientation: props.orientation,
  size: props.size,
  type: props.type
}));

return (_ctx, _push, _parent, _attrs) => {
  _push(ssrRenderComponent(unref(Separator), mergeProps(unref(rootProps), {
    "data-slot": "root",
    class: ui.value.root({ class: [props.ui?.root, props.class] })
  }, _attrs), {
    default: withCtx((_, _push, _parent, _scopeId) => {
      if (_push) {
        _push(`<div data-slot="border" class="${
          ssrRenderClass(ui.value.border({ class: props.ui?.border }))
        }"${
          _scopeId
        }></div>`);
        if (__props.label || __props.icon || __props.avatar || !!slots.default) {
          _push(`<!--[--><div data-slot="container" class="${
            ssrRenderClass(ui.value.container({ class: props.ui?.container }))
          }"${
            _scopeId
          }>`);
          ssrRenderSlot(_ctx.$slots, "default", { ui: ui.value }, () => {
            if (__props.label) {
              _push(`<span data-slot="label" class="${
                ssrRenderClass(ui.value.label({ class: props.ui?.label }))
              }"${
                _scopeId
              }>${
                ssrInterpolate(__props.label)
              }</span>`);
            } else if (__props.icon) {
              _push(ssrRenderComponent(_sfc_main$1, {
                name: __props.icon,
                "data-slot": "icon",
                class: ui.value.icon({ class: props.ui?.icon })
              }, null, _parent, _scopeId));
            } else if (__props.avatar) {
              _push(ssrRenderComponent(_sfc_main$2, mergeProps({
                size: props.ui?.avatarSize || ui.value.avatarSize()
              }, __props.avatar, {
                "data-slot": "avatar",
                class: ui.value.avatar({ class: props.ui?.avatar })
              }), null, _parent, _scopeId));
            } else {
              _push(`<!---->`);
            }
          }, _push, _parent, _scopeId);
          _push(`</div><div data-slot="border" class="${
            ssrRenderClass(ui.value.border({ class: props.ui?.border }))
          }"${
            _scopeId
          }></div><!--]-->`);
        } else {
          _push(`<!---->`);
        }
      } else {
        return [
          createVNode("div", {
            "data-slot": "border",
            class: ui.value.border({ class: props.ui?.border })
          }, null, 2 /* CLASS */),
          (__props.label || __props.icon || __props.avatar || !!slots.default)
            ? (openBlock(), createBlock(Fragment, { key: 0 }, [
                createVNode("div", {
                  "data-slot": "container",
                  class: ui.value.container({ class: props.ui?.container })
                }, [
                  renderSlot(_ctx.$slots, "default", { ui: ui.value }, () => [
                    (__props.label)
                      ? (openBlock(), createBlock("span", {
                          key: 0,
                          "data-slot": "label",
                          class: ui.value.label({ class: props.ui?.label })
                        }, toDisplayString(__props.label), 3 /* TEXT, CLASS */))
                      : (__props.icon)
                        ? (openBlock(), createBlock(_sfc_main$1, {
                            key: 1,
                            name: __props.icon,
                            "data-slot": "icon",
                            class: ui.value.icon({ class: props.ui?.icon })
                          }, null, 8 /* PROPS */, ["name", "class"]))
                        : (__props.avatar)
                          ? (openBlock(), createBlock(_sfc_main$2, mergeProps({
                              key: 2,
                              size: props.ui?.avatarSize || ui.value.avatarSize()
                            }, __props.avatar, {
                              "data-slot": "avatar",
                              class: ui.value.avatar({ class: props.ui?.avatar })
                            }), null, 16 /* FULL_PROPS */, ["size", "class"]))
                          : createCommentVNode("v-if", true)
                  ])
                ], 2 /* CLASS */),
                createVNode("div", {
                  "data-slot": "border",
                  class: ui.value.border({ class: props.ui?.border })
                }, null, 2 /* CLASS */)
              ], 64 /* STABLE_FRAGMENT */))
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
  ;(ssrContext.modules || (ssrContext.modules = new Set())).add("node_modules/@nuxt/ui/dist/runtime/components/Separator.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : undefined
};

export { _sfc_main as _ };
