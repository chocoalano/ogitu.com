import { useSlots, computed, inject, ref, useId, watch, provide, unref, mergeProps, withCtx, renderSlot, createTextVNode, toDisplayString, createVNode, createBlock, createCommentVNode, openBlock, useSSRContext } from 'vue';
import { ssrRenderComponent, ssrRenderClass, ssrRenderSlot, ssrInterpolate, ssrRenderAttr } from 'vue/server-renderer';
import { Primitive, Label } from 'reka-ui';
import { a as useAppConfig } from './virtual_nuxt-ui-plugins-BqI2j5ZJ.js';
import { t as tv, d as formErrorsInjectionKey, e as formInputsInjectionKey, l as inputIdInjectionKey, m as formFieldInjectionKey } from './Button-BBveOjhJ.js';

const theme = {
  "slots": {
    "root": "",
    "wrapper": "",
    "labelWrapper": "flex content-center items-center justify-between",
    "label": "block font-medium text-default",
    "container": "mt-1 relative",
    "description": "text-muted",
    "error": "mt-2 text-error",
    "hint": "text-muted",
    "help": "mt-2 text-muted"
  },
  "variants": {
    "size": {
      "xs": {
        "root": "text-xs"
      },
      "sm": {
        "root": "text-xs"
      },
      "md": {
        "root": "text-sm"
      },
      "lg": {
        "root": "text-sm"
      },
      "xl": {
        "root": "text-base"
      }
    },
    "required": {
      "true": {
        "label": "after:content-['*'] after:ms-0.5 after:text-error"
      }
    }
  },
  "defaultVariants": {
    "size": "md"
  }
};

const _sfc_main = {
  __name: 'FormField',
  __ssrInlineRender: true,
  props: {
  as: { type: null, required: false },
  name: { type: String, required: false },
  errorPattern: { type: null, required: false },
  label: { type: String, required: false },
  description: { type: String, required: false },
  help: { type: String, required: false },
  error: { type: [Boolean, String], required: false },
  hint: { type: String, required: false },
  size: { type: null, required: false },
  required: { type: Boolean, required: false },
  eagerValidation: { type: Boolean, required: false },
  validateOnInputDelay: { type: Number, required: false },
  class: { type: null, required: false },
  ui: { type: null, required: false }
},
  setup(__props) {

const props = __props;
const slots = useSlots();
const appConfig = useAppConfig();
const ui = computed(() => tv({ extend: tv(theme), ...appConfig.ui?.formField || {} })({
  size: props.size,
  required: props.required
}));
const formErrors = inject(formErrorsInjectionKey, null);
const error = computed(() => props.error || formErrors?.value?.find((error2) => error2.name === props.name || props.errorPattern && error2.name?.match(props.errorPattern))?.message);
const id = ref(useId());
const ariaId = id.value;
const formInputs = inject(formInputsInjectionKey, void 0);
watch(id, () => {
  if (formInputs && props.name) {
    formInputs.value[props.name] = { id: id.value, pattern: props.errorPattern };
  }
}, { immediate: true });
provide(inputIdInjectionKey, id);
provide(formFieldInjectionKey, computed(() => ({
  error: error.value,
  name: props.name,
  size: props.size,
  eagerValidation: props.eagerValidation,
  validateOnInputDelay: props.validateOnInputDelay,
  errorPattern: props.errorPattern,
  hint: props.hint,
  description: props.description,
  help: props.help,
  ariaId
})));

return (_ctx, _push, _parent, _attrs) => {
  _push(ssrRenderComponent(unref(Primitive), mergeProps({
    as: __props.as,
    "data-slot": "root",
    class: ui.value.root({ class: [props.ui?.root, props.class] })
  }, _attrs), {
    default: withCtx((_, _push, _parent, _scopeId) => {
      if (_push) {
        _push(`<div data-slot="wrapper" class="${
          ssrRenderClass(ui.value.wrapper({ class: props.ui?.wrapper }))
        }"${
          _scopeId
        }>`);
        if (__props.label || !!slots.label) {
          _push(`<div data-slot="labelWrapper" class="${
            ssrRenderClass(ui.value.labelWrapper({ class: props.ui?.labelWrapper }))
          }"${
            _scopeId
          }>`);
          _push(ssrRenderComponent(unref(Label), {
            for: id.value,
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
          }, _parent, _scopeId));
          if (__props.hint || !!slots.hint) {
            _push(`<span${
              ssrRenderAttr("id", `${unref(ariaId)}-hint`)
            } data-slot="hint" class="${
              ssrRenderClass(ui.value.hint({ class: props.ui?.hint }))
            }"${
              _scopeId
            }>`);
            ssrRenderSlot(_ctx.$slots, "hint", { hint: __props.hint }, () => {
              _push(`${ssrInterpolate(__props.hint)}`);
            }, _push, _parent, _scopeId);
            _push(`</span>`);
          } else {
            _push(`<!---->`);
          }
          _push(`</div>`);
        } else {
          _push(`<!---->`);
        }
        if (__props.description || !!slots.description) {
          _push(`<p${
            ssrRenderAttr("id", `${unref(ariaId)}-description`)
          } data-slot="description" class="${
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
        _push(`</div><div class="${
          ssrRenderClass([(__props.label || !!slots.label || __props.description || !!slots.description) && ui.value.container({ class: props.ui?.container })])
        }"${
          _scopeId
        }>`);
        ssrRenderSlot(_ctx.$slots, "default", { error: error.value }, null, _push, _parent, _scopeId);
        if (typeof error.value === 'string' && error.value || !!slots.error) {
          _push(`<div${
            ssrRenderAttr("id", `${unref(ariaId)}-error`)
          } data-slot="error" class="${
            ssrRenderClass(ui.value.error({ class: props.ui?.error }))
          }"${
            _scopeId
          }>`);
          ssrRenderSlot(_ctx.$slots, "error", { error: error.value }, () => {
            _push(`${ssrInterpolate(error.value)}`);
          }, _push, _parent, _scopeId);
          _push(`</div>`);
        } else if (__props.help || !!slots.help) {
          _push(`<div${
            ssrRenderAttr("id", `${unref(ariaId)}-help`)
          } data-slot="help" class="${
            ssrRenderClass(ui.value.help({ class: props.ui?.help }))
          }"${
            _scopeId
          }>`);
          ssrRenderSlot(_ctx.$slots, "help", { help: __props.help }, () => {
            _push(`${ssrInterpolate(__props.help)}`);
          }, _push, _parent, _scopeId);
          _push(`</div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div>`);
      } else {
        return [
          createVNode("div", {
            "data-slot": "wrapper",
            class: ui.value.wrapper({ class: props.ui?.wrapper })
          }, [
            (__props.label || !!slots.label)
              ? (openBlock(), createBlock("div", {
                  key: 0,
                  "data-slot": "labelWrapper",
                  class: ui.value.labelWrapper({ class: props.ui?.labelWrapper })
                }, [
                  createVNode(unref(Label), {
                    for: id.value,
                    "data-slot": "label",
                    class: ui.value.label({ class: props.ui?.label })
                  }, {
                    default: withCtx(() => [
                      renderSlot(_ctx.$slots, "label", { label: __props.label }, () => [
                        createTextVNode(toDisplayString(__props.label), 1 /* TEXT */)
                      ])
                    ]),
                    _: 3 /* FORWARDED */
                  }, 8 /* PROPS */, ["for", "class"]),
                  (__props.hint || !!slots.hint)
                    ? (openBlock(), createBlock("span", {
                        key: 0,
                        id: `${unref(ariaId)}-hint`,
                        "data-slot": "hint",
                        class: ui.value.hint({ class: props.ui?.hint })
                      }, [
                        renderSlot(_ctx.$slots, "hint", { hint: __props.hint }, () => [
                          createTextVNode(toDisplayString(__props.hint), 1 /* TEXT */)
                        ])
                      ], 10 /* CLASS, PROPS */, ["id"]))
                    : createCommentVNode("v-if", true)
                ], 2 /* CLASS */))
              : createCommentVNode("v-if", true),
            (__props.description || !!slots.description)
              ? (openBlock(), createBlock("p", {
                  key: 1,
                  id: `${unref(ariaId)}-description`,
                  "data-slot": "description",
                  class: ui.value.description({ class: props.ui?.description })
                }, [
                  renderSlot(_ctx.$slots, "description", { description: __props.description }, () => [
                    createTextVNode(toDisplayString(__props.description), 1 /* TEXT */)
                  ])
                ], 10 /* CLASS, PROPS */, ["id"]))
              : createCommentVNode("v-if", true)
          ], 2 /* CLASS */),
          createVNode("div", {
            class: [(__props.label || !!slots.label || __props.description || !!slots.description) && ui.value.container({ class: props.ui?.container })]
          }, [
            renderSlot(_ctx.$slots, "default", { error: error.value }),
            (typeof error.value === 'string' && error.value || !!slots.error)
              ? (openBlock(), createBlock("div", {
                  key: 0,
                  id: `${unref(ariaId)}-error`,
                  "data-slot": "error",
                  class: ui.value.error({ class: props.ui?.error })
                }, [
                  renderSlot(_ctx.$slots, "error", { error: error.value }, () => [
                    createTextVNode(toDisplayString(error.value), 1 /* TEXT */)
                  ])
                ], 10 /* CLASS, PROPS */, ["id"]))
              : (__props.help || !!slots.help)
                ? (openBlock(), createBlock("div", {
                    key: 1,
                    id: `${unref(ariaId)}-help`,
                    "data-slot": "help",
                    class: ui.value.help({ class: props.ui?.help })
                  }, [
                    renderSlot(_ctx.$slots, "help", { help: __props.help }, () => [
                      createTextVNode(toDisplayString(__props.help), 1 /* TEXT */)
                    ])
                  ], 10 /* CLASS, PROPS */, ["id"]))
                : createCommentVNode("v-if", true)
          ], 2 /* CLASS */)
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
  ;(ssrContext.modules || (ssrContext.modules = new Set())).add("node_modules/@nuxt/ui/dist/runtime/components/FormField.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : undefined
};

export { _sfc_main as _ };
