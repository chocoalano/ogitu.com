import { mergeModels, useSlots, useModel, useId, computed, unref, mergeProps, withCtx, createBlock, openBlock, createVNode, resolveDynamicComponent, renderSlot, createTextVNode, toDisplayString, createCommentVNode, useSSRContext } from 'vue';
import { ssrRenderComponent, ssrRenderClass, ssrRenderVNode, ssrRenderSlot, ssrInterpolate } from 'vue/server-renderer';
import { useForwardProps, Primitive, Label, CheckboxRoot, CheckboxIndicator } from 'reka-ui';
import { reactivePick } from '@vueuse/core';
import { a as useAppConfig } from './virtual_nuxt-ui-plugins-BqI2j5ZJ.js';
import { u as useFormField, t as tv, _ as _sfc_main$1 } from './Button-BBveOjhJ.js';

const theme = {
  "slots": {
    "root": "relative flex items-start",
    "container": "flex items-center",
    "base": "rounded-sm ring ring-inset ring-accented overflow-hidden focus-visible:outline-2 focus-visible:outline-offset-2",
    "indicator": "flex items-center justify-center size-full text-inverted",
    "icon": "shrink-0 size-full",
    "wrapper": "w-full",
    "label": "block font-medium text-default",
    "description": "text-muted"
  },
  "variants": {
    "color": {
      "primary": {
        "base": "focus-visible:outline-primary",
        "indicator": "bg-primary"
      },
      "secondary": {
        "base": "focus-visible:outline-secondary",
        "indicator": "bg-secondary"
      },
      "success": {
        "base": "focus-visible:outline-success",
        "indicator": "bg-success"
      },
      "info": {
        "base": "focus-visible:outline-info",
        "indicator": "bg-info"
      },
      "warning": {
        "base": "focus-visible:outline-warning",
        "indicator": "bg-warning"
      },
      "error": {
        "base": "focus-visible:outline-error",
        "indicator": "bg-error"
      },
      "neutral": {
        "base": "focus-visible:outline-inverted",
        "indicator": "bg-inverted"
      }
    },
    "variant": {
      "list": {
        "root": ""
      },
      "card": {
        "root": "border border-muted rounded-lg"
      }
    },
    "indicator": {
      "start": {
        "root": "flex-row",
        "wrapper": "ms-2"
      },
      "end": {
        "root": "flex-row-reverse",
        "wrapper": "me-2"
      },
      "hidden": {
        "base": "sr-only",
        "wrapper": "text-center"
      }
    },
    "size": {
      "xs": {
        "base": "size-3",
        "container": "h-4",
        "wrapper": "text-xs"
      },
      "sm": {
        "base": "size-3.5",
        "container": "h-4",
        "wrapper": "text-xs"
      },
      "md": {
        "base": "size-4",
        "container": "h-5",
        "wrapper": "text-sm"
      },
      "lg": {
        "base": "size-4.5",
        "container": "h-5",
        "wrapper": "text-sm"
      },
      "xl": {
        "base": "size-5",
        "container": "h-6",
        "wrapper": "text-base"
      }
    },
    "required": {
      "true": {
        "label": "after:content-['*'] after:ms-0.5 after:text-error"
      }
    },
    "disabled": {
      "true": {
        "root": "opacity-75",
        "base": "cursor-not-allowed",
        "label": "cursor-not-allowed",
        "description": "cursor-not-allowed"
      }
    },
    "checked": {
      "true": ""
    }
  },
  "compoundVariants": [
    {
      "size": "xs",
      "variant": "card",
      "class": {
        "root": "p-2.5"
      }
    },
    {
      "size": "sm",
      "variant": "card",
      "class": {
        "root": "p-3"
      }
    },
    {
      "size": "md",
      "variant": "card",
      "class": {
        "root": "p-3.5"
      }
    },
    {
      "size": "lg",
      "variant": "card",
      "class": {
        "root": "p-4"
      }
    },
    {
      "size": "xl",
      "variant": "card",
      "class": {
        "root": "p-4.5"
      }
    },
    {
      "color": "primary",
      "variant": "card",
      "class": {
        "root": "has-data-[state=checked]:border-primary"
      }
    },
    {
      "color": "secondary",
      "variant": "card",
      "class": {
        "root": "has-data-[state=checked]:border-secondary"
      }
    },
    {
      "color": "success",
      "variant": "card",
      "class": {
        "root": "has-data-[state=checked]:border-success"
      }
    },
    {
      "color": "info",
      "variant": "card",
      "class": {
        "root": "has-data-[state=checked]:border-info"
      }
    },
    {
      "color": "warning",
      "variant": "card",
      "class": {
        "root": "has-data-[state=checked]:border-warning"
      }
    },
    {
      "color": "error",
      "variant": "card",
      "class": {
        "root": "has-data-[state=checked]:border-error"
      }
    },
    {
      "color": "neutral",
      "variant": "card",
      "class": {
        "root": "has-data-[state=checked]:border-inverted"
      }
    },
    {
      "variant": "card",
      "disabled": true,
      "class": {
        "root": "cursor-not-allowed"
      }
    }
  ],
  "defaultVariants": {
    "size": "md",
    "color": "primary",
    "variant": "list",
    "indicator": "start"
  }
};

const _sfc_main = /*@__PURE__*/Object.assign({ inheritAttrs: false }, {
  __name: 'Checkbox',
  __ssrInlineRender: true,
  props: /*@__PURE__*/mergeModels({
  as: { type: null, required: false },
  label: { type: String, required: false },
  description: { type: String, required: false },
  color: { type: null, required: false },
  variant: { type: null, required: false },
  size: { type: null, required: false },
  indicator: { type: null, required: false },
  icon: { type: null, required: false },
  indeterminateIcon: { type: null, required: false },
  class: { type: null, required: false },
  ui: { type: null, required: false },
  disabled: { type: Boolean, required: false },
  required: { type: Boolean, required: false },
  name: { type: String, required: false },
  value: { type: null, required: false },
  id: { type: String, required: false },
  defaultValue: { type: [Boolean, String], required: false }
}, {
    "modelValue": { type: [Boolean, String], ...{ default: void 0 } },
    "modelModifiers": {},
  }),
  emits: /*@__PURE__*/mergeModels(["change"], ["update:modelValue"]),
  setup(__props, { emit: __emit }) {


const props = __props;
const slots = useSlots();
const emits = __emit;
const modelValue = useModel(__props, "modelValue", { type: [Boolean, String], ...{ default: void 0 } });
const appConfig = useAppConfig();
const rootProps = useForwardProps(reactivePick(props, "required", "value", "defaultValue"));
const { id: _id, emitFormChange, emitFormInput, size, color, name, disabled, ariaAttrs } = useFormField(props);
const id = _id.value ?? useId();
const ui = computed(() => tv({ extend: tv(theme), ...appConfig.ui?.checkbox || {} })({
  size: size.value,
  color: color.value,
  variant: props.variant,
  indicator: props.indicator,
  required: props.required,
  disabled: disabled.value
}));
function onUpdate(value) {
  const event = new Event("change", { target: { value } });
  emits("change", event);
  emitFormChange();
  emitFormInput();
}

return (_ctx, _push, _parent, _attrs) => {
  _push(ssrRenderComponent(unref(Primitive), mergeProps({
    as: !__props.variant || __props.variant === 'list' ? __props.as : unref(Label),
    "data-slot": "root",
    class: ui.value.root({ class: [props.ui?.root, props.class] })
  }, _attrs), {
    default: withCtx((_, _push, _parent, _scopeId) => {
      if (_push) {
        _push(`<div data-slot="container" class="${
          ssrRenderClass(ui.value.container({ class: props.ui?.container }))
        }"${
          _scopeId
        }>`);
        _push(ssrRenderComponent(unref(CheckboxRoot), mergeProps({ id: unref(id) }, { ...unref(rootProps), ..._ctx.$attrs, ...unref(ariaAttrs) }, {
          modelValue: modelValue.value,
          "onUpdate:modelValue": [$event => ((modelValue).value = $event), onUpdate],
          name: unref(name),
          disabled: unref(disabled),
          "data-slot": "base",
          class: ui.value.base({ class: props.ui?.base })
        }), {
          default: withCtx(({ modelValue }, _push, _parent, _scopeId) => {
            if (_push) {
              _push(ssrRenderComponent(unref(CheckboxIndicator), {
                "data-slot": "indicator",
                class: ui.value.indicator({ class: props.ui?.indicator })
              }, {
                default: withCtx((_, _push, _parent, _scopeId) => {
                  if (_push) {
                    if (modelValue === 'indeterminate') {
                      _push(ssrRenderComponent(_sfc_main$1, {
                        name: __props.indeterminateIcon || unref(appConfig).ui.icons.minus,
                        "data-slot": "icon",
                        class: ui.value.icon({ class: props.ui?.icon })
                      }, null, _parent, _scopeId));
                    } else {
                      _push(ssrRenderComponent(_sfc_main$1, {
                        name: __props.icon || unref(appConfig).ui.icons.check,
                        "data-slot": "icon",
                        class: ui.value.icon({ class: props.ui?.icon })
                      }, null, _parent, _scopeId));
                    }
                  } else {
                    return [
                      (modelValue === 'indeterminate')
                        ? (openBlock(), createBlock(_sfc_main$1, {
                            key: 0,
                            name: __props.indeterminateIcon || unref(appConfig).ui.icons.minus,
                            "data-slot": "icon",
                            class: ui.value.icon({ class: props.ui?.icon })
                          }, null, 8 /* PROPS */, ["name", "class"]))
                        : (openBlock(), createBlock(_sfc_main$1, {
                            key: 1,
                            name: __props.icon || unref(appConfig).ui.icons.check,
                            "data-slot": "icon",
                            class: ui.value.icon({ class: props.ui?.icon })
                          }, null, 8 /* PROPS */, ["name", "class"]))
                    ]
                  }
                }),
                _: 2 /* DYNAMIC */
              }, _parent, _scopeId));
            } else {
              return [
                createVNode(unref(CheckboxIndicator), {
                  "data-slot": "indicator",
                  class: ui.value.indicator({ class: props.ui?.indicator })
                }, {
                  default: withCtx(() => [
                    (modelValue === 'indeterminate')
                      ? (openBlock(), createBlock(_sfc_main$1, {
                          key: 0,
                          name: __props.indeterminateIcon || unref(appConfig).ui.icons.minus,
                          "data-slot": "icon",
                          class: ui.value.icon({ class: props.ui?.icon })
                        }, null, 8 /* PROPS */, ["name", "class"]))
                      : (openBlock(), createBlock(_sfc_main$1, {
                          key: 1,
                          name: __props.icon || unref(appConfig).ui.icons.check,
                          "data-slot": "icon",
                          class: ui.value.icon({ class: props.ui?.icon })
                        }, null, 8 /* PROPS */, ["name", "class"]))
                  ]),
                  _: 2 /* DYNAMIC */
                }, 1032 /* PROPS, DYNAMIC_SLOTS */, ["class"])
              ]
            }
          }),
          _: 1 /* STABLE */
        }, _parent, _scopeId));
        _push(`</div>`);
        if (__props.label || !!slots.label || (__props.description || !!slots.description)) {
          _push(`<div data-slot="wrapper" class="${
            ssrRenderClass(ui.value.wrapper({ class: props.ui?.wrapper }))
          }"${
            _scopeId
          }>`);
          if (__props.label || !!slots.label) {
            ssrRenderVNode(_push, createVNode(resolveDynamicComponent(!__props.variant || __props.variant === 'list' ? unref(Label) : 'p'), {
              for: unref(id),
              "data-slot": "label",
              class: ui.value.label({ class: props.ui?.label })
            }, {
              default: withCtx((_, _push, _parent, _scopeId) => {
                if (_push) {
                  ssrRenderSlot(_ctx.$slots, "label", { label: __props.label }, () => {
                    _push(`${ssrInterpolate(__props.label)}`);
                  }, _push, _parent, _scopeId);
                } else {
                  return [
                    renderSlot(_ctx.$slots, "label", { label: __props.label }, () => [
                      createTextVNode(toDisplayString(__props.label), 1 /* TEXT */)
                    ])
                  ]
                }
              }),
              _: 3 /* FORWARDED */
            }), _parent, _scopeId);
          } else {
            _push(`<!---->`);
          }
          if (__props.description || !!slots.description) {
            _push(`<p data-slot="description" class="${
              ssrRenderClass(ui.value.description({ class: props.ui?.description }))
            }"${
              _scopeId
            }>`);
            ssrRenderSlot(_ctx.$slots, "description", { description: __props.description }, () => {
              _push(`${ssrInterpolate(__props.description)}`);
            }, _push, _parent, _scopeId);
            _push(`</p>`);
          } else {
            _push(`<!---->`);
          }
          _push(`</div>`);
        } else {
          _push(`<!---->`);
        }
      } else {
        return [
          createVNode("div", {
            "data-slot": "container",
            class: ui.value.container({ class: props.ui?.container })
          }, [
            createVNode(unref(CheckboxRoot), mergeProps({ id: unref(id) }, { ...unref(rootProps), ..._ctx.$attrs, ...unref(ariaAttrs) }, {
              modelValue: modelValue.value,
              "onUpdate:modelValue": [$event => ((modelValue).value = $event), onUpdate],
              name: unref(name),
              disabled: unref(disabled),
              "data-slot": "base",
              class: ui.value.base({ class: props.ui?.base })
            }), {
              default: withCtx(({ modelValue }) => [
                createVNode(unref(CheckboxIndicator), {
                  "data-slot": "indicator",
                  class: ui.value.indicator({ class: props.ui?.indicator })
                }, {
                  default: withCtx(() => [
                    (modelValue === 'indeterminate')
                      ? (openBlock(), createBlock(_sfc_main$1, {
                          key: 0,
                          name: __props.indeterminateIcon || unref(appConfig).ui.icons.minus,
                          "data-slot": "icon",
                          class: ui.value.icon({ class: props.ui?.icon })
                        }, null, 8 /* PROPS */, ["name", "class"]))
                      : (openBlock(), createBlock(_sfc_main$1, {
                          key: 1,
                          name: __props.icon || unref(appConfig).ui.icons.check,
                          "data-slot": "icon",
                          class: ui.value.icon({ class: props.ui?.icon })
                        }, null, 8 /* PROPS */, ["name", "class"]))
                  ]),
                  _: 2 /* DYNAMIC */
                }, 1032 /* PROPS, DYNAMIC_SLOTS */, ["class"])
              ]),
              _: 1 /* STABLE */
            }, 16 /* FULL_PROPS */, ["id", "modelValue", "onUpdate:modelValue", "name", "disabled", "class"])
          ], 2 /* CLASS */),
          (__props.label || !!slots.label || (__props.description || !!slots.description))
            ? (openBlock(), createBlock("div", {
                key: 0,
                "data-slot": "wrapper",
                class: ui.value.wrapper({ class: props.ui?.wrapper })
              }, [
                (__props.label || !!slots.label)
                  ? (openBlock(), createBlock(resolveDynamicComponent(!__props.variant || __props.variant === 'list' ? unref(Label) : 'p'), {
                      key: 0,
                      for: unref(id),
                      "data-slot": "label",
                      class: ui.value.label({ class: props.ui?.label })
                    }, {
                      default: withCtx(() => [
                        renderSlot(_ctx.$slots, "label", { label: __props.label }, () => [
                          createTextVNode(toDisplayString(__props.label), 1 /* TEXT */)
                        ])
                      ]),
                      _: 3 /* FORWARDED */
                    }, 8 /* PROPS */, ["for", "class"]))
                  : createCommentVNode("v-if", true),
                (__props.description || !!slots.description)
                  ? (openBlock(), createBlock("p", {
                      key: 1,
                      "data-slot": "description",
                      class: ui.value.description({ class: props.ui?.description })
                    }, [
                      renderSlot(_ctx.$slots, "description", { description: __props.description }, () => [
                        createTextVNode(toDisplayString(__props.description), 1 /* TEXT */)
                      ])
                    ], 2 /* CLASS */))
                  : createCommentVNode("v-if", true)
              ], 2 /* CLASS */))
            : createCommentVNode("v-if", true)
        ]
      }
    }),
    _: 3 /* FORWARDED */
  }, _parent));
}
}

});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext()
  ;(ssrContext.modules || (ssrContext.modules = new Set())).add("node_modules/@nuxt/ui/dist/runtime/components/Checkbox.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : undefined
};

export { _sfc_main as _ };
