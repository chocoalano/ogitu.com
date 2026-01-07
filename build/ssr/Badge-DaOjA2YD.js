import { computed, reactive, onMounted, useSlots, useTemplateRef, unref, mergeProps, withCtx, createVNode, renderSlot, createBlock, createCommentVNode, openBlock, useSSRContext, inject, ref, nextTick, createTextVNode, toDisplayString, Fragment, renderList, resolveDynamicComponent, withModifiers, provide, toRef, shallowReactive, markRaw, useId, defineComponent, toHandlers } from 'vue';
import { ssrRenderComponent, ssrRenderAttrs, ssrRenderSlot, ssrRenderClass, ssrRenderStyle, ssrInterpolate, ssrRenderList, ssrRenderVNode, ssrRenderTeleport } from 'vue/server-renderer';
import { Primitive, useForwardPropsEmits, ProgressRoot, ProgressIndicator, ToastRoot, ToastTitle, ToastDescription, ToastAction, ToastClose, useForwardProps, ToastProvider, ToastPortal, ToastViewport, ConfigProvider, TooltipProvider } from 'reka-ui';
import { createSharedComposable, useVModel, reactivePick, reactiveOmit } from '@vueuse/core';
import { a as useAppConfig, l as looseToNumber, c as useState, d as useLocale, o as omit, e as localeContextInjectionKey, f as useColorMode } from './virtual_nuxt-ui-plugins-BqI2j5ZJ.js';
import { u as useFormField, i as useFieldGroup, j as useComponentIcons, t as tv, _ as _sfc_main$b, b as _sfc_main$c, a as _sfc_main$d } from './Button-BBveOjhJ.js';
import { defu } from 'defu';
import { HoverCard, Popover } from 'reka-ui/namespaced';

const kbdKeysMap = {
  meta: "",
  ctrl: "",
  alt: "",
  win: "\u229E",
  command: "\u2318",
  shift: "\u21E7",
  control: "\u2303",
  option: "\u2325",
  enter: "\u21B5",
  delete: "\u2326",
  backspace: "\u232B",
  escape: "Esc",
  tab: "\u21E5",
  capslock: "\u21EA",
  arrowup: "\u2191",
  arrowright: "\u2192",
  arrowdown: "\u2193",
  arrowleft: "\u2190",
  pageup: "\u21DE",
  pagedown: "\u21DF",
  home: "\u2196",
  end: "\u2198"
};
const _useKbd = () => {
  const macOS = computed(() => navigator && navigator.userAgent && navigator.userAgent.match(/Macintosh;/));
  const kbdKeysSpecificMap = reactive({
    meta: " ",
    alt: " ",
    ctrl: " "
  });
  onMounted(() => {
    kbdKeysSpecificMap.meta = macOS.value ? kbdKeysMap.command : "Ctrl";
    kbdKeysSpecificMap.ctrl = macOS.value ? kbdKeysMap.control : "Ctrl";
    kbdKeysSpecificMap.alt = macOS.value ? kbdKeysMap.option : "Alt";
  });
  function getKbdKey(value) {
    if (!value) {
      return;
    }
    if (["meta", "alt", "ctrl"].includes(value)) {
      return kbdKeysSpecificMap[value];
    }
    return kbdKeysMap[value] || value;
  }
  return {
    macOS,
    getKbdKey
  };
};
const useKbd = /* @__PURE__ */ createSharedComposable(_useKbd);

const theme$6 = {
  "slots": {
    "root": "relative inline-flex items-center",
    "base": [
      "w-full rounded-md border-0 appearance-none placeholder:text-dimmed focus:outline-none disabled:cursor-not-allowed disabled:opacity-75",
      "transition-colors"
    ],
    "leading": "absolute inset-y-0 start-0 flex items-center",
    "leadingIcon": "shrink-0 text-dimmed",
    "leadingAvatar": "shrink-0",
    "leadingAvatarSize": "",
    "trailing": "absolute inset-y-0 end-0 flex items-center",
    "trailingIcon": "shrink-0 text-dimmed"
  },
  "variants": {
    "fieldGroup": {
      "horizontal": {
        "root": "group has-focus-visible:z-[1]",
        "base": "group-not-only:group-first:rounded-e-none group-not-only:group-last:rounded-s-none group-not-last:group-not-first:rounded-none"
      },
      "vertical": {
        "root": "group has-focus-visible:z-[1]",
        "base": "group-not-only:group-first:rounded-b-none group-not-only:group-last:rounded-t-none group-not-last:group-not-first:rounded-none"
      }
    },
    "size": {
      "xs": {
        "base": "px-2 py-1 text-xs gap-1",
        "leading": "ps-2",
        "trailing": "pe-2",
        "leadingIcon": "size-4",
        "leadingAvatarSize": "3xs",
        "trailingIcon": "size-4"
      },
      "sm": {
        "base": "px-2.5 py-1.5 text-xs gap-1.5",
        "leading": "ps-2.5",
        "trailing": "pe-2.5",
        "leadingIcon": "size-4",
        "leadingAvatarSize": "3xs",
        "trailingIcon": "size-4"
      },
      "md": {
        "base": "px-2.5 py-1.5 text-sm gap-1.5",
        "leading": "ps-2.5",
        "trailing": "pe-2.5",
        "leadingIcon": "size-5",
        "leadingAvatarSize": "2xs",
        "trailingIcon": "size-5"
      },
      "lg": {
        "base": "px-3 py-2 text-sm gap-2",
        "leading": "ps-3",
        "trailing": "pe-3",
        "leadingIcon": "size-5",
        "leadingAvatarSize": "2xs",
        "trailingIcon": "size-5"
      },
      "xl": {
        "base": "px-3 py-2 text-base gap-2",
        "leading": "ps-3",
        "trailing": "pe-3",
        "leadingIcon": "size-6",
        "leadingAvatarSize": "xs",
        "trailingIcon": "size-6"
      }
    },
    "variant": {
      "outline": "text-highlighted bg-default ring ring-inset ring-accented",
      "soft": "text-highlighted bg-elevated/50 hover:bg-elevated focus:bg-elevated disabled:bg-elevated/50",
      "subtle": "text-highlighted bg-elevated ring ring-inset ring-accented",
      "ghost": "text-highlighted bg-transparent hover:bg-elevated focus:bg-elevated disabled:bg-transparent dark:disabled:bg-transparent",
      "none": "text-highlighted bg-transparent"
    },
    "color": {
      "primary": "",
      "secondary": "",
      "success": "",
      "info": "",
      "warning": "",
      "error": "",
      "neutral": ""
    },
    "leading": {
      "true": ""
    },
    "trailing": {
      "true": ""
    },
    "loading": {
      "true": ""
    },
    "highlight": {
      "true": ""
    },
    "type": {
      "file": "file:me-1.5 file:font-medium file:text-muted file:outline-none"
    }
  },
  "compoundVariants": [
    {
      "color": "primary",
      "variant": [
        "outline",
        "subtle"
      ],
      "class": "focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary"
    },
    {
      "color": "secondary",
      "variant": [
        "outline",
        "subtle"
      ],
      "class": "focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-secondary"
    },
    {
      "color": "success",
      "variant": [
        "outline",
        "subtle"
      ],
      "class": "focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-success"
    },
    {
      "color": "info",
      "variant": [
        "outline",
        "subtle"
      ],
      "class": "focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-info"
    },
    {
      "color": "warning",
      "variant": [
        "outline",
        "subtle"
      ],
      "class": "focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-warning"
    },
    {
      "color": "error",
      "variant": [
        "outline",
        "subtle"
      ],
      "class": "focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-error"
    },
    {
      "color": "primary",
      "highlight": true,
      "class": "ring ring-inset ring-primary"
    },
    {
      "color": "secondary",
      "highlight": true,
      "class": "ring ring-inset ring-secondary"
    },
    {
      "color": "success",
      "highlight": true,
      "class": "ring ring-inset ring-success"
    },
    {
      "color": "info",
      "highlight": true,
      "class": "ring ring-inset ring-info"
    },
    {
      "color": "warning",
      "highlight": true,
      "class": "ring ring-inset ring-warning"
    },
    {
      "color": "error",
      "highlight": true,
      "class": "ring ring-inset ring-error"
    },
    {
      "color": "neutral",
      "variant": [
        "outline",
        "subtle"
      ],
      "class": "focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-inverted"
    },
    {
      "color": "neutral",
      "highlight": true,
      "class": "ring ring-inset ring-inverted"
    },
    {
      "leading": true,
      "size": "xs",
      "class": "ps-7"
    },
    {
      "leading": true,
      "size": "sm",
      "class": "ps-8"
    },
    {
      "leading": true,
      "size": "md",
      "class": "ps-9"
    },
    {
      "leading": true,
      "size": "lg",
      "class": "ps-10"
    },
    {
      "leading": true,
      "size": "xl",
      "class": "ps-11"
    },
    {
      "trailing": true,
      "size": "xs",
      "class": "pe-7"
    },
    {
      "trailing": true,
      "size": "sm",
      "class": "pe-8"
    },
    {
      "trailing": true,
      "size": "md",
      "class": "pe-9"
    },
    {
      "trailing": true,
      "size": "lg",
      "class": "pe-10"
    },
    {
      "trailing": true,
      "size": "xl",
      "class": "pe-11"
    },
    {
      "loading": true,
      "leading": true,
      "class": {
        "leadingIcon": "animate-spin"
      }
    },
    {
      "loading": true,
      "leading": false,
      "trailing": true,
      "class": {
        "trailingIcon": "animate-spin"
      }
    }
  ],
  "defaultVariants": {
    "size": "md",
    "color": "primary",
    "variant": "outline"
  }
};

const _sfc_main$a = /*@__PURE__*/Object.assign({ inheritAttrs: false }, {
  __name: 'Input',
  __ssrInlineRender: true,
  props: {
  as: { type: null, required: false },
  id: { type: String, required: false },
  name: { type: String, required: false },
  type: { type: null, required: false, default: "text" },
  placeholder: { type: String, required: false },
  color: { type: null, required: false },
  variant: { type: null, required: false },
  size: { type: null, required: false },
  required: { type: Boolean, required: false },
  autocomplete: { type: null, required: false, default: "off" },
  autofocus: { type: Boolean, required: false },
  autofocusDelay: { type: Number, required: false, default: 0 },
  disabled: { type: Boolean, required: false },
  highlight: { type: Boolean, required: false },
  modelValue: { type: null, required: false },
  defaultValue: { type: null, required: false },
  modelModifiers: { type: Object, required: false },
  class: { type: null, required: false },
  ui: { type: null, required: false },
  icon: { type: null, required: false },
  avatar: { type: Object, required: false },
  leading: { type: Boolean, required: false },
  leadingIcon: { type: null, required: false },
  trailing: { type: Boolean, required: false },
  trailingIcon: { type: null, required: false },
  loading: { type: Boolean, required: false },
  loadingIcon: { type: null, required: false }
},
  emits: ["update:modelValue", "blur", "change"],
  setup(__props, { expose: __expose, emit: __emit }) {


const props = __props;
const emits = __emit;
const slots = useSlots();
const modelValue = useVModel(props, "modelValue", emits, { defaultValue: props.defaultValue });
const appConfig = useAppConfig();
const { emitFormBlur, emitFormInput, emitFormChange, size: formGroupSize, color, id, name, highlight, disabled, emitFormFocus, ariaAttrs } = useFormField(props, { deferInputValidation: true });
const { orientation, size: fieldGroupSize } = useFieldGroup(props);
const { isLeading, isTrailing, leadingIconName, trailingIconName } = useComponentIcons(props);
const inputSize = computed(() => fieldGroupSize.value || formGroupSize.value);
const ui = computed(() => tv({ extend: tv(theme$6), ...appConfig.ui?.input || {} })({
  type: props.type,
  color: color.value,
  variant: props.variant,
  size: inputSize?.value,
  loading: props.loading,
  highlight: highlight.value,
  leading: isLeading.value || !!props.avatar || !!slots.leading,
  trailing: isTrailing.value || !!slots.trailing,
  fieldGroup: orientation.value
}));
const inputRef = useTemplateRef("inputRef");
function updateInput(value) {
  if (props.modelModifiers?.trim) {
    value = value?.trim() ?? null;
  }
  if (props.modelModifiers?.number || props.type === "number") {
    value = looseToNumber(value);
  }
  if (props.modelModifiers?.nullable) {
    value ||= null;
  }
  if (props.modelModifiers?.optional) {
    value ||= void 0;
  }
  modelValue.value = value;
  emitFormInput();
}
function onInput(event) {
  if (!props.modelModifiers?.lazy) {
    updateInput(event.target.value);
  }
}
function onChange(event) {
  const value = event.target.value;
  if (props.modelModifiers?.lazy) {
    updateInput(value);
  }
  if (props.modelModifiers?.trim) {
    event.target.value = value.trim();
  }
  emitFormChange();
  emits("change", event);
}
function onBlur(event) {
  emitFormBlur();
  emits("blur", event);
}
function autoFocus() {
  if (props.autofocus) {
    inputRef.value?.focus();
  }
}
onMounted(() => {
  setTimeout(() => {
    autoFocus();
  }, props.autofocusDelay);
});
__expose({
  inputRef
});

return (_ctx, _push, _parent, _attrs) => {
  _push(ssrRenderComponent(unref(Primitive), mergeProps({
    as: __props.as,
    "data-slot": "root",
    class: ui.value.root({ class: [props.ui?.root, props.class] })
  }, _attrs), {
    default: withCtx((_, _push, _parent, _scopeId) => {
      if (_push) {
        _push(`<input${
          ssrRenderAttrs(mergeProps({
            id: unref(id),
            ref_key: "inputRef",
            ref: inputRef,
            type: __props.type,
            value: unref(modelValue),
            name: unref(name),
            placeholder: __props.placeholder,
            "data-slot": "base",
            class: ui.value.base({ class: props.ui?.base }),
            disabled: unref(disabled),
            required: __props.required,
            autocomplete: __props.autocomplete
          }, { ..._ctx.$attrs, ...unref(ariaAttrs) }))
        }${
          _scopeId
        }>`);
        ssrRenderSlot(_ctx.$slots, "default", { ui: ui.value }, null, _push, _parent, _scopeId);
        if (unref(isLeading) || !!__props.avatar || !!slots.leading) {
          _push(`<span data-slot="leading" class="${
            ssrRenderClass(ui.value.leading({ class: props.ui?.leading }))
          }"${
            _scopeId
          }>`);
          ssrRenderSlot(_ctx.$slots, "leading", { ui: ui.value }, () => {
            if (unref(isLeading) && unref(leadingIconName)) {
              _push(ssrRenderComponent(_sfc_main$b, {
                name: unref(leadingIconName),
                "data-slot": "leadingIcon",
                class: ui.value.leadingIcon({ class: props.ui?.leadingIcon })
              }, null, _parent, _scopeId));
            } else if (!!__props.avatar) {
              _push(ssrRenderComponent(_sfc_main$c, mergeProps({
                size: props.ui?.leadingAvatarSize || ui.value.leadingAvatarSize()
              }, __props.avatar, {
                "data-slot": "leadingAvatar",
                class: ui.value.leadingAvatar({ class: props.ui?.leadingAvatar })
              }), null, _parent, _scopeId));
            } else {
              _push(`<!---->`);
            }
          }, _push, _parent, _scopeId);
          _push(`</span>`);
        } else {
          _push(`<!---->`);
        }
        if (unref(isTrailing) || !!slots.trailing) {
          _push(`<span data-slot="trailing" class="${
            ssrRenderClass(ui.value.trailing({ class: props.ui?.trailing }))
          }"${
            _scopeId
          }>`);
          ssrRenderSlot(_ctx.$slots, "trailing", { ui: ui.value }, () => {
            if (unref(trailingIconName)) {
              _push(ssrRenderComponent(_sfc_main$b, {
                name: unref(trailingIconName),
                "data-slot": "trailingIcon",
                class: ui.value.trailingIcon({ class: props.ui?.trailingIcon })
              }, null, _parent, _scopeId));
            } else {
              _push(`<!---->`);
            }
          }, _push, _parent, _scopeId);
          _push(`</span>`);
        } else {
          _push(`<!---->`);
        }
      } else {
        return [
          createVNode("input", mergeProps({
            id: unref(id),
            ref_key: "inputRef",
            ref: inputRef,
            type: __props.type,
            value: unref(modelValue),
            name: unref(name),
            placeholder: __props.placeholder,
            "data-slot": "base",
            class: ui.value.base({ class: props.ui?.base }),
            disabled: unref(disabled),
            required: __props.required,
            autocomplete: __props.autocomplete
          }, { ..._ctx.$attrs, ...unref(ariaAttrs) }, {
            onInput: onInput,
            onBlur: onBlur,
            onChange: onChange,
            onFocus: unref(emitFormFocus)
          }), null, 16 /* FULL_PROPS */, ["id", "type", "value", "name", "placeholder", "disabled", "required", "autocomplete", "onFocus"]),
          renderSlot(_ctx.$slots, "default", { ui: ui.value }),
          (unref(isLeading) || !!__props.avatar || !!slots.leading)
            ? (openBlock(), createBlock("span", {
                key: 0,
                "data-slot": "leading",
                class: ui.value.leading({ class: props.ui?.leading })
              }, [
                renderSlot(_ctx.$slots, "leading", { ui: ui.value }, () => [
                  (unref(isLeading) && unref(leadingIconName))
                    ? (openBlock(), createBlock(_sfc_main$b, {
                        key: 0,
                        name: unref(leadingIconName),
                        "data-slot": "leadingIcon",
                        class: ui.value.leadingIcon({ class: props.ui?.leadingIcon })
                      }, null, 8 /* PROPS */, ["name", "class"]))
                    : (!!__props.avatar)
                      ? (openBlock(), createBlock(_sfc_main$c, mergeProps({
                          key: 1,
                          size: props.ui?.leadingAvatarSize || ui.value.leadingAvatarSize()
                        }, __props.avatar, {
                          "data-slot": "leadingAvatar",
                          class: ui.value.leadingAvatar({ class: props.ui?.leadingAvatar })
                        }), null, 16 /* FULL_PROPS */, ["size", "class"]))
                      : createCommentVNode("v-if", true)
                ])
              ], 2 /* CLASS */))
            : createCommentVNode("v-if", true),
          (unref(isTrailing) || !!slots.trailing)
            ? (openBlock(), createBlock("span", {
                key: 1,
                "data-slot": "trailing",
                class: ui.value.trailing({ class: props.ui?.trailing })
              }, [
                renderSlot(_ctx.$slots, "trailing", { ui: ui.value }, () => [
                  (unref(trailingIconName))
                    ? (openBlock(), createBlock(_sfc_main$b, {
                        key: 0,
                        name: unref(trailingIconName),
                        "data-slot": "trailingIcon",
                        class: ui.value.trailingIcon({ class: props.ui?.trailingIcon })
                      }, null, 8 /* PROPS */, ["name", "class"]))
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

});
const _sfc_setup$a = _sfc_main$a.setup;
_sfc_main$a.setup = (props, ctx) => {
  const ssrContext = useSSRContext()
  ;(ssrContext.modules || (ssrContext.modules = new Set())).add("node_modules/@nuxt/ui/dist/runtime/components/Input.vue");
  return _sfc_setup$a ? _sfc_setup$a(props, ctx) : undefined
};

const portalTargetInjectionKey = Symbol("nuxt-ui.portal-target");
function usePortal(portal) {
  const globalPortal = inject(portalTargetInjectionKey, void 0);
  const value = computed(() => portal.value === true ? globalPortal?.value : portal.value);
  const disabled = computed(() => typeof value.value === "boolean" ? !value.value : false);
  const to = computed(() => typeof value.value === "boolean" ? "body" : value.value);
  return computed(() => ({
    to: to.value,
    disabled: disabled.value
  }));
}

const toastMaxInjectionKey = Symbol("nuxt-ui.toast-max");
function useToast$1() {
  const toasts = useState("toasts", () => []);
  const max = inject(toastMaxInjectionKey, void 0);
  const running = ref(false);
  const queue = [];
  const generateId = () => `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
  async function processQueue() {
    if (running.value || queue.length === 0) {
      return;
    }
    running.value = true;
    while (queue.length > 0) {
      const toast = queue.shift();
      await nextTick();
      toasts.value = [...toasts.value, toast].slice(-(max?.value ?? 5));
    }
    running.value = false;
  }
  function add(toast) {
    const body = {
      id: generateId(),
      open: true,
      ...toast
    };
    queue.push(body);
    processQueue();
    return body;
  }
  function update(id, toast) {
    const index = toasts.value.findIndex((t) => t.id === id);
    if (index !== -1) {
      toasts.value[index] = {
        ...toasts.value[index],
        ...toast
      };
    }
  }
  function remove(id) {
    const index = toasts.value.findIndex((t) => t.id === id);
    if (index !== -1) {
      toasts.value[index] = {
        ...toasts.value[index],
        open: false
      };
    }
    setTimeout(() => {
      toasts.value = toasts.value.filter((t) => t.id !== id);
    }, 200);
  }
  function clear() {
    toasts.value = [];
  }
  return {
    toasts,
    add,
    update,
    remove,
    clear
  };
}

const theme$5 = {
  "slots": {
    "root": "gap-2",
    "base": "relative overflow-hidden rounded-full bg-accented",
    "indicator": "rounded-full size-full transition-transform duration-200 ease-out",
    "status": "flex text-dimmed transition-[width] duration-200",
    "steps": "grid items-end",
    "step": "truncate text-end row-start-1 col-start-1 transition-opacity"
  },
  "variants": {
    "animation": {
      "carousel": "",
      "carousel-inverse": "",
      "swing": "",
      "elastic": ""
    },
    "color": {
      "primary": {
        "indicator": "bg-primary",
        "steps": "text-primary"
      },
      "secondary": {
        "indicator": "bg-secondary",
        "steps": "text-secondary"
      },
      "success": {
        "indicator": "bg-success",
        "steps": "text-success"
      },
      "info": {
        "indicator": "bg-info",
        "steps": "text-info"
      },
      "warning": {
        "indicator": "bg-warning",
        "steps": "text-warning"
      },
      "error": {
        "indicator": "bg-error",
        "steps": "text-error"
      },
      "neutral": {
        "indicator": "bg-inverted",
        "steps": "text-inverted"
      }
    },
    "size": {
      "2xs": {
        "status": "text-xs",
        "steps": "text-xs"
      },
      "xs": {
        "status": "text-xs",
        "steps": "text-xs"
      },
      "sm": {
        "status": "text-sm",
        "steps": "text-sm"
      },
      "md": {
        "status": "text-sm",
        "steps": "text-sm"
      },
      "lg": {
        "status": "text-sm",
        "steps": "text-sm"
      },
      "xl": {
        "status": "text-base",
        "steps": "text-base"
      },
      "2xl": {
        "status": "text-base",
        "steps": "text-base"
      }
    },
    "step": {
      "active": {
        "step": "opacity-100"
      },
      "first": {
        "step": "opacity-100 text-muted"
      },
      "other": {
        "step": "opacity-0"
      },
      "last": {
        "step": ""
      }
    },
    "orientation": {
      "horizontal": {
        "root": "w-full flex flex-col",
        "base": "w-full",
        "status": "flex-row items-center justify-end min-w-fit"
      },
      "vertical": {
        "root": "h-full flex flex-row-reverse",
        "base": "h-full",
        "status": "flex-col justify-end min-h-fit"
      }
    },
    "inverted": {
      "true": {
        "status": "self-end"
      }
    }
  },
  "compoundVariants": [
    {
      "inverted": true,
      "orientation": "horizontal",
      "class": {
        "step": "text-start",
        "status": "flex-row-reverse"
      }
    },
    {
      "inverted": true,
      "orientation": "vertical",
      "class": {
        "steps": "items-start",
        "status": "flex-col-reverse"
      }
    },
    {
      "orientation": "horizontal",
      "size": "2xs",
      "class": "h-px"
    },
    {
      "orientation": "horizontal",
      "size": "xs",
      "class": "h-0.5"
    },
    {
      "orientation": "horizontal",
      "size": "sm",
      "class": "h-1"
    },
    {
      "orientation": "horizontal",
      "size": "md",
      "class": "h-2"
    },
    {
      "orientation": "horizontal",
      "size": "lg",
      "class": "h-3"
    },
    {
      "orientation": "horizontal",
      "size": "xl",
      "class": "h-4"
    },
    {
      "orientation": "horizontal",
      "size": "2xl",
      "class": "h-5"
    },
    {
      "orientation": "vertical",
      "size": "2xs",
      "class": "w-px"
    },
    {
      "orientation": "vertical",
      "size": "xs",
      "class": "w-0.5"
    },
    {
      "orientation": "vertical",
      "size": "sm",
      "class": "w-1"
    },
    {
      "orientation": "vertical",
      "size": "md",
      "class": "w-2"
    },
    {
      "orientation": "vertical",
      "size": "lg",
      "class": "w-3"
    },
    {
      "orientation": "vertical",
      "size": "xl",
      "class": "w-4"
    },
    {
      "orientation": "vertical",
      "size": "2xl",
      "class": "w-5"
    },
    {
      "orientation": "horizontal",
      "animation": "carousel",
      "class": {
        "indicator": "data-[state=indeterminate]:animate-[carousel_2s_ease-in-out_infinite] data-[state=indeterminate]:rtl:animate-[carousel-rtl_2s_ease-in-out_infinite]"
      }
    },
    {
      "orientation": "vertical",
      "animation": "carousel",
      "class": {
        "indicator": "data-[state=indeterminate]:animate-[carousel-vertical_2s_ease-in-out_infinite]"
      }
    },
    {
      "orientation": "horizontal",
      "animation": "carousel-inverse",
      "class": {
        "indicator": "data-[state=indeterminate]:animate-[carousel-inverse_2s_ease-in-out_infinite] data-[state=indeterminate]:rtl:animate-[carousel-inverse-rtl_2s_ease-in-out_infinite]"
      }
    },
    {
      "orientation": "vertical",
      "animation": "carousel-inverse",
      "class": {
        "indicator": "data-[state=indeterminate]:animate-[carousel-inverse-vertical_2s_ease-in-out_infinite]"
      }
    },
    {
      "orientation": "horizontal",
      "animation": "swing",
      "class": {
        "indicator": "data-[state=indeterminate]:animate-[swing_2s_ease-in-out_infinite]"
      }
    },
    {
      "orientation": "vertical",
      "animation": "swing",
      "class": {
        "indicator": "data-[state=indeterminate]:animate-[swing-vertical_2s_ease-in-out_infinite]"
      }
    },
    {
      "orientation": "horizontal",
      "animation": "elastic",
      "class": {
        "indicator": "data-[state=indeterminate]:animate-[elastic_2s_ease-in-out_infinite]"
      }
    },
    {
      "orientation": "vertical",
      "animation": "elastic",
      "class": {
        "indicator": "data-[state=indeterminate]:animate-[elastic-vertical_2s_ease-in-out_infinite]"
      }
    }
  ],
  "defaultVariants": {
    "animation": "carousel",
    "color": "primary",
    "size": "md"
  }
};

const _sfc_main$9 = {
  __name: 'Progress',
  __ssrInlineRender: true,
  props: {
  as: { type: null, required: false },
  max: { type: [Number, Array], required: false },
  status: { type: Boolean, required: false },
  inverted: { type: Boolean, required: false, default: false },
  size: { type: null, required: false },
  color: { type: null, required: false },
  orientation: { type: null, required: false, default: "horizontal" },
  animation: { type: null, required: false },
  class: { type: null, required: false },
  ui: { type: null, required: false },
  getValueLabel: { type: Function, required: false },
  getValueText: { type: Function, required: false },
  modelValue: { type: [Number, null], required: false, default: null }
},
  emits: ["update:modelValue", "update:max"],
  setup(__props, { emit: __emit }) {

const props = __props;
const emits = __emit;
const slots = useSlots();
const { dir } = useLocale();
const appConfig = useAppConfig();
const rootProps = useForwardPropsEmits(reactivePick(props, "getValueLabel", "getValueText", "modelValue"), emits);
const isIndeterminate = computed(() => rootProps.value.modelValue === null);
const hasSteps = computed(() => Array.isArray(props.max));
const realMax = computed(() => {
  if (isIndeterminate.value || !props.max) {
    return void 0;
  }
  if (Array.isArray(props.max)) {
    return props.max.length - 1;
  }
  return Number(props.max);
});
const percent = computed(() => {
  if (isIndeterminate.value) {
    return void 0;
  }
  switch (true) {
    case rootProps.value.modelValue < 0:
      return 0;
    case rootProps.value.modelValue > (realMax.value ?? 100):
      return 100;
    default:
      return Math.round(rootProps.value.modelValue / (realMax.value ?? 100) * 100);
  }
});
const indicatorStyle = computed(() => {
  if (percent.value === void 0) {
    return;
  }
  if (props.orientation === "vertical") {
    return {
      transform: `translateY(${props.inverted ? "" : "-"}${100 - percent.value}%)`
    };
  } else {
    if (dir.value === "rtl") {
      return {
        transform: `translateX(${props.inverted ? "-" : ""}${100 - percent.value}%)`
      };
    } else {
      return {
        transform: `translateX(${props.inverted ? "" : "-"}${100 - percent.value}%)`
      };
    }
  }
});
const statusStyle = computed(() => {
  const value = `${Math.max(percent.value ?? 0, 0)}%`;
  return props.orientation === "vertical" ? { height: value } : { width: value };
});
function isActive(index) {
  return index === Number(props.modelValue);
}
function isFirst(index) {
  return index === 0;
}
function isLast(index) {
  return index === realMax.value;
}
function stepVariant(index) {
  index = Number(index);
  if (isActive(index) && !isFirst(index)) {
    return "active";
  }
  if (isFirst(index) && isActive(index)) {
    return "first";
  }
  if (isLast(index) && isActive(index)) {
    return "last";
  }
  return "other";
}
const ui = computed(() => tv({ extend: tv(theme$5), ...appConfig.ui?.progress || {} })({
  animation: props.animation,
  size: props.size,
  color: props.color,
  orientation: props.orientation,
  inverted: props.inverted
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
        if (!isIndeterminate.value && (__props.status || !!slots.status)) {
          _push(`<div data-slot="status" class="${
            ssrRenderClass(ui.value.status({ class: props.ui?.status }))
          }" style="${
            ssrRenderStyle(statusStyle.value)
          }"${
            _scopeId
          }>`);
          ssrRenderSlot(_ctx.$slots, "status", { percent: percent.value }, () => {
            _push(`${ssrInterpolate(percent.value)}% `);
          }, _push, _parent, _scopeId);
          _push(`</div>`);
        } else {
          _push(`<!---->`);
        }
        _push(ssrRenderComponent(unref(ProgressRoot), mergeProps(unref(rootProps), {
          max: realMax.value,
          "data-slot": "base",
          class: ui.value.base({ class: props.ui?.base }),
          style: {"transform":"translateZ(0)"}
        }), {
          default: withCtx((_, _push, _parent, _scopeId) => {
            if (_push) {
              _push(ssrRenderComponent(unref(ProgressIndicator), {
                "data-slot": "indicator",
                class: ui.value.indicator({ class: props.ui?.indicator }),
                style: indicatorStyle.value
              }, null, _parent, _scopeId));
            } else {
              return [
                createVNode(unref(ProgressIndicator), {
                  "data-slot": "indicator",
                  class: ui.value.indicator({ class: props.ui?.indicator }),
                  style: indicatorStyle.value
                }, null, 8 /* PROPS */, ["class", "style"])
              ]
            }
          }),
          _: 1 /* STABLE */
        }, _parent, _scopeId));
        if (hasSteps.value) {
          _push(`<div data-slot="steps" class="${
            ssrRenderClass(ui.value.steps({ class: props.ui?.steps }))
          }"${
            _scopeId
          }><!--[-->`);
          ssrRenderList(__props.max, (step, index) => {
            _push(`<div data-slot="step" class="${
              ssrRenderClass(ui.value.step({ class: props.ui?.step, step: stepVariant(index) }))
            }"${
              _scopeId
            }>`);
            ssrRenderSlot(_ctx.$slots, `step-${index}`, { step: step }, () => {
              _push(`${ssrInterpolate(step)}`);
            }, _push, _parent, _scopeId);
            _push(`</div>`);
          });
          _push(`<!--]--></div>`);
        } else {
          _push(`<!---->`);
        }
      } else {
        return [
          (!isIndeterminate.value && (__props.status || !!slots.status))
            ? (openBlock(), createBlock("div", {
                key: 0,
                "data-slot": "status",
                class: ui.value.status({ class: props.ui?.status }),
                style: statusStyle.value
              }, [
                renderSlot(_ctx.$slots, "status", { percent: percent.value }, () => [
                  createTextVNode(toDisplayString(percent.value) + "% ", 1 /* TEXT */)
                ])
              ], 6 /* CLASS, STYLE */))
            : createCommentVNode("v-if", true),
          createVNode(unref(ProgressRoot), mergeProps(unref(rootProps), {
            max: realMax.value,
            "data-slot": "base",
            class: ui.value.base({ class: props.ui?.base }),
            style: {"transform":"translateZ(0)"}
          }), {
            default: withCtx(() => [
              createVNode(unref(ProgressIndicator), {
                "data-slot": "indicator",
                class: ui.value.indicator({ class: props.ui?.indicator }),
                style: indicatorStyle.value
              }, null, 8 /* PROPS */, ["class", "style"])
            ]),
            _: 1 /* STABLE */
          }, 16 /* FULL_PROPS */, ["max", "class"]),
          (hasSteps.value)
            ? (openBlock(), createBlock("div", {
                key: 1,
                "data-slot": "steps",
                class: ui.value.steps({ class: props.ui?.steps })
              }, [
                (openBlock(true), createBlock(Fragment, null, renderList(__props.max, (step, index) => {
                  return (openBlock(), createBlock("div", {
                    key: index,
                    "data-slot": "step",
                    class: ui.value.step({ class: props.ui?.step, step: stepVariant(index) })
                  }, [
                    renderSlot(_ctx.$slots, `step-${index}`, { step: step }, () => [
                      createTextVNode(toDisplayString(step), 1 /* TEXT */)
                    ])
                  ], 2 /* CLASS */))
                }), 128 /* KEYED_FRAGMENT */))
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
const _sfc_setup$9 = _sfc_main$9.setup;
_sfc_main$9.setup = (props, ctx) => {
  const ssrContext = useSSRContext()
  ;(ssrContext.modules || (ssrContext.modules = new Set())).add("node_modules/@nuxt/ui/dist/runtime/components/Progress.vue");
  return _sfc_setup$9 ? _sfc_setup$9(props, ctx) : undefined
};

const theme$4 = {
  "slots": {
    "root": "relative group overflow-hidden bg-default shadow-lg rounded-lg ring ring-default p-4 flex gap-2.5 focus:outline-none",
    "wrapper": "w-0 flex-1 flex flex-col",
    "title": "text-sm font-medium text-highlighted",
    "description": "text-sm text-muted",
    "icon": "shrink-0 size-5",
    "avatar": "shrink-0",
    "avatarSize": "2xl",
    "actions": "flex gap-1.5 shrink-0",
    "progress": "absolute inset-x-0 bottom-0",
    "close": "p-0"
  },
  "variants": {
    "color": {
      "primary": {
        "root": "focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary",
        "icon": "text-primary"
      },
      "secondary": {
        "root": "focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-secondary",
        "icon": "text-secondary"
      },
      "success": {
        "root": "focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-success",
        "icon": "text-success"
      },
      "info": {
        "root": "focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-info",
        "icon": "text-info"
      },
      "warning": {
        "root": "focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-warning",
        "icon": "text-warning"
      },
      "error": {
        "root": "focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-error",
        "icon": "text-error"
      },
      "neutral": {
        "root": "focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-inverted",
        "icon": "text-highlighted"
      }
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
  "defaultVariants": {
    "color": "primary"
  }
};

const _sfc_main$8 = {
  __name: 'Toast',
  __ssrInlineRender: true,
  props: {
  as: { type: null, required: false },
  title: { type: [String, Object, Function], required: false },
  description: { type: [String, Object, Function], required: false },
  icon: { type: null, required: false },
  avatar: { type: Object, required: false },
  color: { type: null, required: false },
  orientation: { type: null, required: false, default: "vertical" },
  close: { type: [Boolean, Object], required: false, default: true },
  closeIcon: { type: null, required: false },
  actions: { type: Array, required: false },
  progress: { type: [Boolean, Object], required: false, default: true },
  class: { type: null, required: false },
  ui: { type: null, required: false },
  defaultOpen: { type: Boolean, required: false },
  open: { type: Boolean, required: false },
  type: { type: String, required: false },
  duration: { type: Number, required: false }
},
  emits: ["escapeKeyDown", "pause", "resume", "swipeStart", "swipeMove", "swipeCancel", "swipeEnd", "update:open"],
  setup(__props, { expose: __expose, emit: __emit }) {

const props = __props;
const emits = __emit;
const slots = useSlots();
const { t } = useLocale();
const appConfig = useAppConfig();
const rootProps = useForwardPropsEmits(reactivePick(props, "as", "defaultOpen", "open", "duration", "type"), emits);
const ui = computed(() => tv({ extend: tv(theme$4), ...appConfig.ui?.toast || {} })({
  color: props.color,
  orientation: props.orientation,
  title: !!props.title || !!slots.title
}));
const rootRef = useTemplateRef("rootRef");
const height = ref(0);
onMounted(() => {
  if (!rootRef.value) {
    return;
  }
  nextTick(() => {
    height.value = rootRef.value?.$el?.getBoundingClientRect()?.height;
  });
});
__expose({
  height
});

return (_ctx, _push, _parent, _attrs) => {
  _push(ssrRenderComponent(unref(ToastRoot), mergeProps({
    ref_key: "rootRef",
    ref: rootRef
  }, unref(rootProps), {
    "data-orientation": __props.orientation,
    "data-slot": "root",
    class: ui.value.root({ class: [props.ui?.root, props.class] }),
    style: { '--height': height.value }
  }, _attrs), {
    default: withCtx(({ remaining, duration, open }, _push, _parent, _scopeId) => {
      if (_push) {
        ssrRenderSlot(_ctx.$slots, "leading", { ui: ui.value }, () => {
          if (__props.avatar) {
            _push(ssrRenderComponent(_sfc_main$c, mergeProps({
              size: props.ui?.avatarSize || ui.value.avatarSize()
            }, __props.avatar, {
              "data-slot": "avatar",
              class: ui.value.avatar({ class: props.ui?.avatar })
            }), null, _parent, _scopeId));
          } else if (__props.icon) {
            _push(ssrRenderComponent(_sfc_main$b, {
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
          _push(ssrRenderComponent(unref(ToastTitle), {
            "data-slot": "title",
            class: ui.value.title({ class: props.ui?.title })
          }, {
            default: withCtx((_, _push, _parent, _scopeId) => {
              if (_push) {
                ssrRenderSlot(_ctx.$slots, "title", {}, () => {
                  if (typeof __props.title === 'function') {
                    ssrRenderVNode(_push, createVNode(resolveDynamicComponent(__props.title()), null, null), _parent, _scopeId);
                  } else if (typeof __props.title === 'object') {
                    ssrRenderVNode(_push, createVNode(resolveDynamicComponent(__props.title), null, null), _parent, _scopeId);
                  } else {
                    _push(`<!--[-->${ssrInterpolate(__props.title)}<!--]-->`);
                  }
                }, _push, _parent, _scopeId);
              } else {
                return [
                  renderSlot(_ctx.$slots, "title", {}, () => [
                    (typeof __props.title === 'function')
                      ? (openBlock(), createBlock(resolveDynamicComponent(__props.title()), { key: 0 }))
                      : (typeof __props.title === 'object')
                        ? (openBlock(), createBlock(resolveDynamicComponent(__props.title), { key: 1 }))
                        : (openBlock(), createBlock(Fragment, { key: 2 }, [
                            createTextVNode(toDisplayString(__props.title), 1 /* TEXT */)
                          ], 64 /* STABLE_FRAGMENT */))
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
          _push(ssrRenderComponent(unref(ToastDescription), {
            "data-slot": "description",
            class: ui.value.description({ class: props.ui?.description })
          }, {
            default: withCtx((_, _push, _parent, _scopeId) => {
              if (_push) {
                ssrRenderSlot(_ctx.$slots, "description", {}, () => {
                  if (typeof __props.description === 'function') {
                    ssrRenderVNode(_push, createVNode(resolveDynamicComponent(__props.description()), null, null), _parent, _scopeId);
                  } else if (typeof __props.description === 'object') {
                    ssrRenderVNode(_push, createVNode(resolveDynamicComponent(__props.description), null, null), _parent, _scopeId);
                  } else {
                    _push(`<!--[-->${ssrInterpolate(__props.description)}<!--]-->`);
                  }
                }, _push, _parent, _scopeId);
              } else {
                return [
                  renderSlot(_ctx.$slots, "description", {}, () => [
                    (typeof __props.description === 'function')
                      ? (openBlock(), createBlock(resolveDynamicComponent(__props.description()), { key: 0 }))
                      : (typeof __props.description === 'object')
                        ? (openBlock(), createBlock(resolveDynamicComponent(__props.description), { key: 1 }))
                        : (openBlock(), createBlock(Fragment, { key: 2 }, [
                            createTextVNode(toDisplayString(__props.description), 1 /* TEXT */)
                          ], 64 /* STABLE_FRAGMENT */))
                  ])
                ]
              }
            }),
            _: 2 /* DYNAMIC */
          }, _parent, _scopeId));
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
              _push(ssrRenderComponent(unref(ToastAction), {
                key: index,
                "alt-text": action.label || 'Action',
                "as-child": "",
                onClick: () => {}
              }, {
                default: withCtx((_, _push, _parent, _scopeId) => {
                  if (_push) {
                    _push(ssrRenderComponent(_sfc_main$d, mergeProps({
                      size: "xs",
                      color: __props.color
                    }, { ref_for: true }, action), null, _parent, _scopeId));
                  } else {
                    return [
                      createVNode(_sfc_main$d, mergeProps({
                        size: "xs",
                        color: __props.color
                      }, { ref_for: true }, action), null, 16 /* FULL_PROPS */, ["color"])
                    ]
                  }
                }),
                _: 2 /* DYNAMIC */
              }, _parent, _scopeId));
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
                _push(ssrRenderComponent(unref(ToastAction), {
                  key: index,
                  "alt-text": action.label || 'Action',
                  "as-child": "",
                  onClick: () => {}
                }, {
                  default: withCtx((_, _push, _parent, _scopeId) => {
                    if (_push) {
                      _push(ssrRenderComponent(_sfc_main$d, mergeProps({
                        size: "xs",
                        color: __props.color
                      }, { ref_for: true }, action), null, _parent, _scopeId));
                    } else {
                      return [
                        createVNode(_sfc_main$d, mergeProps({
                          size: "xs",
                          color: __props.color
                        }, { ref_for: true }, action), null, 16 /* FULL_PROPS */, ["color"])
                      ]
                    }
                  }),
                  _: 2 /* DYNAMIC */
                }, _parent, _scopeId));
              });
              _push(`<!--]-->`);
            }, _push, _parent, _scopeId);
          } else {
            _push(`<!---->`);
          }
          if (__props.close || !!slots.close) {
            _push(ssrRenderComponent(unref(ToastClose), { "as-child": "" }, {
              default: withCtx((_, _push, _parent, _scopeId) => {
                if (_push) {
                  ssrRenderSlot(_ctx.$slots, "close", { ui: ui.value }, () => {
                    if (__props.close) {
                      _push(ssrRenderComponent(_sfc_main$d, mergeProps({
                        icon: __props.closeIcon || unref(appConfig).ui.icons.close,
                        color: "neutral",
                        variant: "link",
                        "aria-label": unref(t)('toast.close')
                      }, typeof __props.close === 'object' ? __props.close : {}, {
                        "data-slot": "close",
                        class: ui.value.close({ class: props.ui?.close }),
                        onClick: () => {}
                      }), null, _parent, _scopeId));
                    } else {
                      _push(`<!---->`);
                    }
                  }, _push, _parent, _scopeId);
                } else {
                  return [
                    renderSlot(_ctx.$slots, "close", { ui: ui.value }, () => [
                      (__props.close)
                        ? (openBlock(), createBlock(_sfc_main$d, mergeProps({
                            key: 0,
                            icon: __props.closeIcon || unref(appConfig).ui.icons.close,
                            color: "neutral",
                            variant: "link",
                            "aria-label": unref(t)('toast.close')
                          }, typeof __props.close === 'object' ? __props.close : {}, {
                            "data-slot": "close",
                            class: ui.value.close({ class: props.ui?.close }),
                            onClick: withModifiers(() => {}, ["stop"])
                          }), null, 16 /* FULL_PROPS */, ["icon", "aria-label", "class", "onClick"]))
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
          _push(`</div>`);
        } else {
          _push(`<!---->`);
        }
        if (__props.progress && open && remaining > 0 && duration) {
          _push(ssrRenderComponent(_sfc_main$9, mergeProps({
            "model-value": remaining / duration * 100,
            color: __props.color
          }, typeof __props.progress === 'object' ? __props.progress : {}, {
            size: "sm",
            "data-slot": "progress",
            class: ui.value.progress({ class: props.ui?.progress })
          }), null, _parent, _scopeId));
        } else {
          _push(`<!---->`);
        }
      } else {
        return [
          renderSlot(_ctx.$slots, "leading", { ui: ui.value }, () => [
            (__props.avatar)
              ? (openBlock(), createBlock(_sfc_main$c, mergeProps({
                  key: 0,
                  size: props.ui?.avatarSize || ui.value.avatarSize()
                }, __props.avatar, {
                  "data-slot": "avatar",
                  class: ui.value.avatar({ class: props.ui?.avatar })
                }), null, 16 /* FULL_PROPS */, ["size", "class"]))
              : (__props.icon)
                ? (openBlock(), createBlock(_sfc_main$b, {
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
              ? (openBlock(), createBlock(unref(ToastTitle), {
                  key: 0,
                  "data-slot": "title",
                  class: ui.value.title({ class: props.ui?.title })
                }, {
                  default: withCtx(() => [
                    renderSlot(_ctx.$slots, "title", {}, () => [
                      (typeof __props.title === 'function')
                        ? (openBlock(), createBlock(resolveDynamicComponent(__props.title()), { key: 0 }))
                        : (typeof __props.title === 'object')
                          ? (openBlock(), createBlock(resolveDynamicComponent(__props.title), { key: 1 }))
                          : (openBlock(), createBlock(Fragment, { key: 2 }, [
                              createTextVNode(toDisplayString(__props.title), 1 /* TEXT */)
                            ], 64 /* STABLE_FRAGMENT */))
                    ])
                  ]),
                  _: 3 /* FORWARDED */
                }, 8 /* PROPS */, ["class"]))
              : createCommentVNode("v-if", true),
            (__props.description || !!slots.description)
              ? (openBlock(), createBlock(unref(ToastDescription), {
                  key: 1,
                  "data-slot": "description",
                  class: ui.value.description({ class: props.ui?.description })
                }, {
                  default: withCtx(() => [
                    renderSlot(_ctx.$slots, "description", {}, () => [
                      (typeof __props.description === 'function')
                        ? (openBlock(), createBlock(resolveDynamicComponent(__props.description()), { key: 0 }))
                        : (typeof __props.description === 'object')
                          ? (openBlock(), createBlock(resolveDynamicComponent(__props.description), { key: 1 }))
                          : (openBlock(), createBlock(Fragment, { key: 2 }, [
                              createTextVNode(toDisplayString(__props.description), 1 /* TEXT */)
                            ], 64 /* STABLE_FRAGMENT */))
                    ])
                  ]),
                  _: 3 /* FORWARDED */
                }, 8 /* PROPS */, ["class"]))
              : createCommentVNode("v-if", true),
            (__props.orientation === 'vertical' && (__props.actions?.length || !!slots.actions))
              ? (openBlock(), createBlock("div", {
                  key: 2,
                  "data-slot": "actions",
                  class: ui.value.actions({ class: props.ui?.actions })
                }, [
                  renderSlot(_ctx.$slots, "actions", {}, () => [
                    (openBlock(true), createBlock(Fragment, null, renderList(__props.actions, (action, index) => {
                      return (openBlock(), createBlock(unref(ToastAction), {
                        key: index,
                        "alt-text": action.label || 'Action',
                        "as-child": "",
                        onClick: withModifiers(() => {}, ["stop"])
                      }, {
                        default: withCtx(() => [
                          createVNode(_sfc_main$d, mergeProps({
                            size: "xs",
                            color: __props.color
                          }, { ref_for: true }, action), null, 16 /* FULL_PROPS */, ["color"])
                        ]),
                        _: 2 /* DYNAMIC */
                      }, 1032 /* PROPS, DYNAMIC_SLOTS */, ["alt-text", "onClick"]))
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
                        return (openBlock(), createBlock(unref(ToastAction), {
                          key: index,
                          "alt-text": action.label || 'Action',
                          "as-child": "",
                          onClick: withModifiers(() => {}, ["stop"])
                        }, {
                          default: withCtx(() => [
                            createVNode(_sfc_main$d, mergeProps({
                              size: "xs",
                              color: __props.color
                            }, { ref_for: true }, action), null, 16 /* FULL_PROPS */, ["color"])
                          ]),
                          _: 2 /* DYNAMIC */
                        }, 1032 /* PROPS, DYNAMIC_SLOTS */, ["alt-text", "onClick"]))
                      }), 128 /* KEYED_FRAGMENT */))
                    ])
                  : createCommentVNode("v-if", true),
                (__props.close || !!slots.close)
                  ? (openBlock(), createBlock(unref(ToastClose), {
                      key: 1,
                      "as-child": ""
                    }, {
                      default: withCtx(() => [
                        renderSlot(_ctx.$slots, "close", { ui: ui.value }, () => [
                          (__props.close)
                            ? (openBlock(), createBlock(_sfc_main$d, mergeProps({
                                key: 0,
                                icon: __props.closeIcon || unref(appConfig).ui.icons.close,
                                color: "neutral",
                                variant: "link",
                                "aria-label": unref(t)('toast.close')
                              }, typeof __props.close === 'object' ? __props.close : {}, {
                                "data-slot": "close",
                                class: ui.value.close({ class: props.ui?.close }),
                                onClick: withModifiers(() => {}, ["stop"])
                              }), null, 16 /* FULL_PROPS */, ["icon", "aria-label", "class", "onClick"]))
                            : createCommentVNode("v-if", true)
                        ])
                      ]),
                      _: 3 /* FORWARDED */
                    }))
                  : createCommentVNode("v-if", true)
              ], 2 /* CLASS */))
            : createCommentVNode("v-if", true),
          (__props.progress && open && remaining > 0 && duration)
            ? (openBlock(), createBlock(_sfc_main$9, mergeProps({
                key: 1,
                "model-value": remaining / duration * 100,
                color: __props.color
              }, typeof __props.progress === 'object' ? __props.progress : {}, {
                size: "sm",
                "data-slot": "progress",
                class: ui.value.progress({ class: props.ui?.progress })
              }), null, 16 /* FULL_PROPS */, ["model-value", "color", "class"]))
            : createCommentVNode("v-if", true)
        ]
      }
    }),
    _: 3 /* FORWARDED */
  }, _parent));
}
}

};
const _sfc_setup$8 = _sfc_main$8.setup;
_sfc_main$8.setup = (props, ctx) => {
  const ssrContext = useSSRContext()
  ;(ssrContext.modules || (ssrContext.modules = new Set())).add("node_modules/@nuxt/ui/dist/runtime/components/Toast.vue");
  return _sfc_setup$8 ? _sfc_setup$8(props, ctx) : undefined
};

const theme$3 = {
  "slots": {
    "viewport": "fixed flex flex-col w-[calc(100%-2rem)] sm:w-96 z-[100] data-[expanded=true]:h-(--height) focus:outline-none",
    "base": "pointer-events-auto absolute inset-x-0 z-(--index) transform-(--transform) data-[expanded=false]:data-[front=false]:h-(--front-height) data-[expanded=false]:data-[front=false]:*:opacity-0 data-[front=false]:*:transition-opacity data-[front=false]:*:duration-100 data-[state=closed]:animate-[toast-closed_200ms_ease-in-out] data-[state=closed]:data-[expanded=false]:data-[front=false]:animate-[toast-collapsed-closed_200ms_ease-in-out] data-[swipe=move]:transition-none transition-[transform,translate,height] duration-200 ease-out"
  },
  "variants": {
    "position": {
      "top-left": {
        "viewport": "left-4"
      },
      "top-center": {
        "viewport": "left-1/2 transform -translate-x-1/2"
      },
      "top-right": {
        "viewport": "right-4"
      },
      "bottom-left": {
        "viewport": "left-4"
      },
      "bottom-center": {
        "viewport": "left-1/2 transform -translate-x-1/2"
      },
      "bottom-right": {
        "viewport": "right-4"
      }
    },
    "swipeDirection": {
      "up": "data-[swipe=end]:animate-[toast-slide-up_200ms_ease-out]",
      "right": "data-[swipe=end]:animate-[toast-slide-right_200ms_ease-out]",
      "down": "data-[swipe=end]:animate-[toast-slide-down_200ms_ease-out]",
      "left": "data-[swipe=end]:animate-[toast-slide-left_200ms_ease-out]"
    }
  },
  "compoundVariants": [
    {
      "position": [
        "top-left",
        "top-center",
        "top-right"
      ],
      "class": {
        "viewport": "top-4",
        "base": "top-0 data-[state=open]:animate-[slide-in-from-top_200ms_ease-in-out]"
      }
    },
    {
      "position": [
        "bottom-left",
        "bottom-center",
        "bottom-right"
      ],
      "class": {
        "viewport": "bottom-4",
        "base": "bottom-0 data-[state=open]:animate-[slide-in-from-bottom_200ms_ease-in-out]"
      }
    },
    {
      "swipeDirection": [
        "left",
        "right"
      ],
      "class": "data-[swipe=move]:translate-x-(--reka-toast-swipe-move-x) data-[swipe=end]:translate-x-(--reka-toast-swipe-end-x) data-[swipe=cancel]:translate-x-0"
    },
    {
      "swipeDirection": [
        "up",
        "down"
      ],
      "class": "data-[swipe=move]:translate-y-(--reka-toast-swipe-move-y) data-[swipe=end]:translate-y-(--reka-toast-swipe-end-y) data-[swipe=cancel]:translate-y-0"
    }
  ],
  "defaultVariants": {
    "position": "bottom-right"
  }
};

const __default__$1 = {
  name: "Toaster"
};

const _sfc_main$7 = /*@__PURE__*/Object.assign(__default__$1, {
  __ssrInlineRender: true,
  props: {
  position: { type: null, required: false },
  expand: { type: Boolean, required: false, default: true },
  progress: { type: Boolean, required: false, default: true },
  portal: { type: [Boolean, String], required: false, skipCheck: true, default: true },
  max: { type: Number, required: false, default: 5 },
  class: { type: null, required: false },
  ui: { type: null, required: false },
  label: { type: String, required: false },
  duration: { type: Number, required: false, default: 5e3 },
  disableSwipe: { type: Boolean, required: false },
  swipeThreshold: { type: Number, required: false }
},
  setup(__props) {

const props = __props;

const { toasts, remove } = useToast$1();
const appConfig = useAppConfig();
provide(toastMaxInjectionKey, toRef(() => props.max));
const providerProps = useForwardProps(reactivePick(props, "duration", "label", "swipeThreshold", "disableSwipe"));
const portalProps = usePortal(toRef(() => props.portal));
const swipeDirection = computed(() => {
  switch (props.position) {
    case "top-center":
      return "up";
    case "top-right":
    case "bottom-right":
      return "right";
    case "bottom-center":
      return "down";
    case "top-left":
    case "bottom-left":
      return "left";
  }
  return "right";
});
const ui = computed(() => tv({ extend: tv(theme$3), ...appConfig.ui?.toaster || {} })({
  position: props.position,
  swipeDirection: swipeDirection.value
}));
function onUpdateOpen(value, id) {
  if (value) {
    return;
  }
  remove(id);
}
const hovered = ref(false);
const expanded = computed(() => props.expand || hovered.value);
const refs = ref([]);
const height = computed(() => refs.value.reduce((acc, { height: height2 }) => acc + height2 + 16, 0));
const frontHeight = computed(() => refs.value[refs.value.length - 1]?.height || 0);
function getOffset(index) {
  return refs.value.slice(index + 1).reduce((acc, { height: height2 }) => acc + height2 + 16, 0);
}

return (_ctx, _push, _parent, _attrs) => {
  _push(ssrRenderComponent(unref(ToastProvider), mergeProps({ "swipe-direction": swipeDirection.value }, unref(providerProps), _attrs), {
    default: withCtx((_, _push, _parent, _scopeId) => {
      if (_push) {
        ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent, _scopeId);
        _push(`<!--[-->`);
        ssrRenderList(unref(toasts), (toast, index) => {
          _push(ssrRenderComponent(_sfc_main$8, mergeProps({
            key: toast.id,
            ref_for: true,
            ref_key: "refs",
            ref: refs,
            progress: __props.progress
          }, { ref_for: true }, unref(omit)(toast, ['id', 'close']), {
            close: toast.close,
            "data-expanded": expanded.value,
            "data-front": !expanded.value && index === unref(toasts).length - 1,
            style: {
  '--index': index - unref(toasts).length + unref(toasts).length,
  '--before': unref(toasts).length - 1 - index,
  '--offset': getOffset(index),
  '--scale': expanded.value ? '1' : 'calc(1 - var(--before) * var(--scale-factor))',
  '--translate': expanded.value ? 'calc(var(--offset) * var(--translate-factor))' : 'calc(var(--before) * var(--gap))',
  '--transform': 'translateY(var(--translate)) scale(var(--scale))'
},
            "data-slot": "base",
            class: ui.value.base({ class: [props.ui?.base, toast.onClick ? 'cursor-pointer' : void 0] }),
            "onUpdate:open": $event => (onUpdateOpen($event, toast.id)),
            onClick: $event => (toast.onClick && toast.onClick(toast))
          }), null, _parent, _scopeId));
        });
        _push(`<!--]-->`);
        _push(ssrRenderComponent(unref(ToastPortal), unref(portalProps), {
          default: withCtx((_, _push, _parent, _scopeId) => {
            if (_push) {
              _push(ssrRenderComponent(unref(ToastViewport), {
                "data-expanded": expanded.value,
                "data-slot": "viewport",
                class: ui.value.viewport({ class: [props.ui?.viewport, props.class] }),
                style: {
  '--scale-factor': '0.05',
  '--translate-factor': __props.position?.startsWith('top') ? '1px' : '-1px',
  '--gap': __props.position?.startsWith('top') ? '16px' : '-16px',
  '--front-height': `${frontHeight.value}px`,
  '--height': `${height.value}px`
},
                onMouseenter: $event => (hovered.value = true),
                onMouseleave: $event => (hovered.value = false)
              }, null, _parent, _scopeId));
            } else {
              return [
                createVNode(unref(ToastViewport), {
                  "data-expanded": expanded.value,
                  "data-slot": "viewport",
                  class: ui.value.viewport({ class: [props.ui?.viewport, props.class] }),
                  style: {
  '--scale-factor': '0.05',
  '--translate-factor': __props.position?.startsWith('top') ? '1px' : '-1px',
  '--gap': __props.position?.startsWith('top') ? '16px' : '-16px',
  '--front-height': `${frontHeight.value}px`,
  '--height': `${height.value}px`
},
                  onMouseenter: $event => (hovered.value = true),
                  onMouseleave: $event => (hovered.value = false)
                }, null, 8 /* PROPS */, ["data-expanded", "class", "style", "onMouseenter", "onMouseleave"])
              ]
            }
          }),
          _: 1 /* STABLE */
        }, _parent, _scopeId));
      } else {
        return [
          renderSlot(_ctx.$slots, "default"),
          (openBlock(true), createBlock(Fragment, null, renderList(unref(toasts), (toast, index) => {
            return (openBlock(), createBlock(_sfc_main$8, mergeProps({
              key: toast.id,
              ref_for: true,
              ref_key: "refs",
              ref: refs,
              progress: __props.progress
            }, { ref_for: true }, unref(omit)(toast, ['id', 'close']), {
              close: toast.close,
              "data-expanded": expanded.value,
              "data-front": !expanded.value && index === unref(toasts).length - 1,
              style: {
  '--index': index - unref(toasts).length + unref(toasts).length,
  '--before': unref(toasts).length - 1 - index,
  '--offset': getOffset(index),
  '--scale': expanded.value ? '1' : 'calc(1 - var(--before) * var(--scale-factor))',
  '--translate': expanded.value ? 'calc(var(--offset) * var(--translate-factor))' : 'calc(var(--before) * var(--gap))',
  '--transform': 'translateY(var(--translate)) scale(var(--scale))'
},
              "data-slot": "base",
              class: ui.value.base({ class: [props.ui?.base, toast.onClick ? 'cursor-pointer' : void 0] }),
              "onUpdate:open": $event => (onUpdateOpen($event, toast.id)),
              onClick: $event => (toast.onClick && toast.onClick(toast))
            }), null, 16 /* FULL_PROPS */, ["progress", "close", "data-expanded", "data-front", "style", "class", "onUpdate:open", "onClick"]))
          }), 128 /* KEYED_FRAGMENT */)),
          createVNode(unref(ToastPortal), unref(portalProps), {
            default: withCtx(() => [
              createVNode(unref(ToastViewport), {
                "data-expanded": expanded.value,
                "data-slot": "viewport",
                class: ui.value.viewport({ class: [props.ui?.viewport, props.class] }),
                style: {
  '--scale-factor': '0.05',
  '--translate-factor': __props.position?.startsWith('top') ? '1px' : '-1px',
  '--gap': __props.position?.startsWith('top') ? '16px' : '-16px',
  '--front-height': `${frontHeight.value}px`,
  '--height': `${height.value}px`
},
                onMouseenter: $event => (hovered.value = true),
                onMouseleave: $event => (hovered.value = false)
              }, null, 8 /* PROPS */, ["data-expanded", "class", "style", "onMouseenter", "onMouseleave"])
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

});
const _sfc_setup$7 = _sfc_main$7.setup;
_sfc_main$7.setup = (props, ctx) => {
  const ssrContext = useSSRContext()
  ;(ssrContext.modules || (ssrContext.modules = new Set())).add("node_modules/@nuxt/ui/dist/runtime/components/Toaster.vue");
  return _sfc_setup$7 ? _sfc_setup$7(props, ctx) : undefined
};

function _useOverlay() {
  const overlays = shallowReactive([]);
  const create = (component, _options) => {
    const { props, defaultOpen, destroyOnClose } = _options || {};
    const options = reactive({
      id: Symbol(import.meta.dev ? "useOverlay" : ""),
      isOpen: !!defaultOpen,
      component: markRaw(component),
      isMounted: !!defaultOpen,
      destroyOnClose: !!destroyOnClose,
      originalProps: props || {},
      props: { ...props }
    });
    overlays.push(options);
    return {
      ...options,
      open: (props2) => open(options.id, props2),
      close: (value) => close(options.id, value),
      patch: (props2) => patch(options.id, props2)
    };
  };
  const open = (id, props) => {
    const overlay = getOverlay(id);
    if (props) {
      overlay.props = { ...overlay.originalProps, ...props };
    } else {
      overlay.props = { ...overlay.originalProps };
    }
    overlay.isOpen = true;
    overlay.isMounted = true;
    const result = new Promise((resolve) => overlay.resolvePromise = resolve);
    return Object.assign(result, {
      id,
      isMounted: overlay.isMounted,
      isOpen: overlay.isOpen,
      result
    });
  };
  const close = (id, value) => {
    const overlay = getOverlay(id);
    overlay.isOpen = false;
    if (overlay.resolvePromise) {
      overlay.resolvePromise(value);
      overlay.resolvePromise = void 0;
    }
  };
  const closeAll = () => {
    overlays.forEach((overlay) => close(overlay.id));
  };
  const unmount = (id) => {
    const overlay = getOverlay(id);
    overlay.isMounted = false;
    if (overlay.destroyOnClose) {
      const index = overlays.findIndex((overlay2) => overlay2.id === id);
      overlays.splice(index, 1);
    }
  };
  const patch = (id, props) => {
    const overlay = getOverlay(id);
    overlay.props = { ...overlay.props, ...props };
  };
  const getOverlay = (id) => {
    const overlay = overlays.find((overlay2) => overlay2.id === id);
    if (!overlay) {
      throw new Error("Overlay not found");
    }
    return overlay;
  };
  const isOpen = (id) => {
    const overlay = getOverlay(id);
    return overlay.isOpen;
  };
  return {
    overlays,
    open,
    close,
    closeAll,
    create,
    patch,
    unmount,
    isOpen
  };
}
const useOverlay = /* @__PURE__ */ createSharedComposable(_useOverlay);

const _sfc_main$6 = {
  __name: 'OverlayProvider',
  __ssrInlineRender: true,
  setup(__props) {

const { overlays, unmount, close } = useOverlay();
const mountedOverlays = computed(() => overlays.filter((overlay) => overlay.isMounted));
const onAfterLeave = (id) => {
  close(id);
  unmount(id);
};
const onClose = (id, value) => {
  close(id, value);
};

return (_ctx, _push, _parent, _attrs) => {
  _push(`<!--[-->`);
  ssrRenderList(mountedOverlays.value, (overlay) => {
    ssrRenderVNode(_push, createVNode(resolveDynamicComponent(overlay.component), mergeProps({
      key: overlay.id
    }, { ref_for: true }, overlay.props, {
      open: overlay.isOpen,
      "onUpdate:open": $event => ((overlay.isOpen) = $event),
      onClose: (value) => onClose(overlay.id, value),
      "onAfter:leave": $event => (onAfterLeave(overlay.id))
    }), null), _parent);
  });
  _push(`<!--]-->`);
}
}

};
const _sfc_setup$6 = _sfc_main$6.setup;
_sfc_main$6.setup = (props, ctx) => {
  const ssrContext = useSSRContext()
  ;(ssrContext.modules || (ssrContext.modules = new Set())).add("node_modules/@nuxt/ui/dist/runtime/components/OverlayProvider.vue");
  return _sfc_setup$6 ? _sfc_setup$6(props, ctx) : undefined
};

const __default__ = {
  name: "App"
};

const _sfc_main$5 = /*@__PURE__*/Object.assign(__default__, {
  __ssrInlineRender: true,
  props: {
  tooltip: { type: Object, required: false },
  toaster: { type: [Object, null], required: false },
  locale: { type: Object, required: false },
  portal: { type: [Boolean, String], required: false, skipCheck: true, default: "body" },
  dir: { type: String, required: false },
  scrollBody: { type: [Boolean, Object], required: false },
  nonce: { type: String, required: false }
},
  setup(__props) {

const props = __props;

const configProviderProps = useForwardProps(reactivePick(props, "scrollBody"));
const tooltipProps = toRef(() => props.tooltip);
const toasterProps = toRef(() => props.toaster);
const locale = toRef(() => props.locale);
provide(localeContextInjectionKey, locale);
const portal = toRef(() => props.portal);
provide(portalTargetInjectionKey, portal);

return (_ctx, _push, _parent, _attrs) => {
  _push(ssrRenderComponent(unref(ConfigProvider), mergeProps({
    "use-id": () => useId(),
    dir: props.dir || locale.value?.dir,
    locale: locale.value?.code
  }, unref(configProviderProps), _attrs), {
    default: withCtx((_, _push, _parent, _scopeId) => {
      if (_push) {
        _push(ssrRenderComponent(unref(TooltipProvider), tooltipProps.value, {
          default: withCtx((_, _push, _parent, _scopeId) => {
            if (_push) {
              if (__props.toaster !== null) {
                _push(ssrRenderComponent(_sfc_main$7, toasterProps.value, {
                  default: withCtx((_, _push, _parent, _scopeId) => {
                    if (_push) {
                      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent, _scopeId);
                    } else {
                      return [
                        renderSlot(_ctx.$slots, "default")
                      ]
                    }
                  }),
                  _: 3 /* FORWARDED */
                }, _parent, _scopeId));
              } else {
                ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent, _scopeId);
              }
              _push(ssrRenderComponent(_sfc_main$6, null, null, _parent, _scopeId));
            } else {
              return [
                (__props.toaster !== null)
                  ? (openBlock(), createBlock(_sfc_main$7, mergeProps({ key: 0 }, toasterProps.value), {
                      default: withCtx(() => [
                        renderSlot(_ctx.$slots, "default")
                      ]),
                      _: 3 /* FORWARDED */
                    }, 16 /* FULL_PROPS */))
                  : renderSlot(_ctx.$slots, "default", { key: 1 }),
                createVNode(_sfc_main$6)
              ]
            }
          }),
          _: 3 /* FORWARDED */
        }, _parent, _scopeId));
      } else {
        return [
          createVNode(unref(TooltipProvider), tooltipProps.value, {
            default: withCtx(() => [
              (__props.toaster !== null)
                ? (openBlock(), createBlock(_sfc_main$7, mergeProps({ key: 0 }, toasterProps.value), {
                    default: withCtx(() => [
                      renderSlot(_ctx.$slots, "default")
                    ]),
                    _: 3 /* FORWARDED */
                  }, 16 /* FULL_PROPS */))
                : renderSlot(_ctx.$slots, "default", { key: 1 }),
              createVNode(_sfc_main$6)
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

});
const _sfc_setup$5 = _sfc_main$5.setup;
_sfc_main$5.setup = (props, ctx) => {
  const ssrContext = useSSRContext()
  ;(ssrContext.modules || (ssrContext.modules = new Set())).add("node_modules/@nuxt/ui/dist/runtime/components/App.vue");
  return _sfc_setup$5 ? _sfc_setup$5(props, ctx) : undefined
};

const toasts = ref([]);
let toastId = 0;
function useToast() {
  const addToast = (toast) => {
    const id = ++toastId;
    const duration = toast.duration ?? 5e3;
    toasts.value.push({ ...toast, id });
    if (duration > 0) {
      setTimeout(() => {
        removeToast(id);
      }, duration);
    }
    return id;
  };
  const removeToast = (id) => {
    const index = toasts.value.findIndex((t) => t.id === id);
    if (index > -1) {
      toasts.value.splice(index, 1);
    }
  };
  const success = (title, message, duration) => {
    return addToast({ type: "success", title, message, duration });
  };
  const error = (title, message, duration) => {
    return addToast({ type: "error", title, message, duration });
  };
  const warning = (title, message, duration) => {
    return addToast({ type: "warning", title, message, duration });
  };
  const info = (title, message, duration) => {
    return addToast({ type: "info", title, message, duration });
  };
  const clearAll = () => {
    toasts.value = [];
  };
  return {
    toasts,
    addToast,
    removeToast,
    success,
    error,
    warning,
    info,
    clearAll
  };
}

const _sfc_main$4 = /* @__PURE__ */ defineComponent({
  __name: "ToastContainer",
  __ssrInlineRender: true,
  setup(__props) {
    const { toasts} = useToast();
    const getToastIcon = (type) => {
      switch (type) {
        case "success":
          return "i-lucide-check-circle";
        case "error":
          return "i-lucide-x-circle";
        case "warning":
          return "i-lucide-alert-triangle";
        case "info":
        default:
          return "i-lucide-info";
      }
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UIcon = _sfc_main$b;
      ssrRenderTeleport(_push, (_push2) => {
        _push2(`<div class="fixed bottom-4 right-4 z-100 flex flex-col gap-2 max-w-sm w-full"><!--[-->`);
        ssrRenderList(unref(toasts), (toast) => {
          _push2(`<div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 p-4"><div class="flex items-start gap-3">`);
          _push2(ssrRenderComponent(_component_UIcon, {
            name: getToastIcon(toast.type),
            class: [
              "w-5 h-5 shrink-0 mt-0.5",
              {
                "text-green-500": toast.type === "success",
                "text-red-500": toast.type === "error",
                "text-yellow-500": toast.type === "warning",
                "text-blue-500": toast.type === "info"
              }
            ]
          }, null, _parent));
          _push2(`<div class="flex-1 min-w-0"><p class="text-sm font-medium text-gray-900 dark:text-white">${ssrInterpolate(toast.title)}</p>`);
          if (toast.message) {
            _push2(`<p class="mt-1 text-sm text-gray-500 dark:text-gray-400">${ssrInterpolate(toast.message)}</p>`);
          } else {
            _push2(`<!---->`);
          }
          _push2(`</div><button type="button" class="shrink-0 text-gray-400 hover:text-gray-500 dark:hover:text-gray-300">`);
          _push2(ssrRenderComponent(_component_UIcon, {
            name: "i-lucide-x",
            class: "w-4 h-4"
          }, null, _parent));
          _push2(`</button></div></div>`);
        });
        _push2(`<!--]--></div>`);
      }, "body", false, _parent);
    };
  }
});

const _sfc_setup$4 = _sfc_main$4.setup;
_sfc_main$4.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("inertia/components/ToastContainer.vue");
  return _sfc_setup$4 ? _sfc_setup$4(props, ctx) : void 0;
};

const _export_sfc = (sfc, props) => {
  const target = sfc.__vccOpts || sfc;
  for (const [key, val] of props) {
    target[key] = val;
  }
  return target;
};

const theme$2 = {
  "base": "inline-flex items-center justify-center px-1 rounded-sm font-medium font-sans uppercase",
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
    "size": {
      "sm": "h-4 min-w-[16px] text-[10px]",
      "md": "h-5 min-w-[20px] text-[11px]",
      "lg": "h-6 min-w-[24px] text-[12px]"
    }
  },
  "compoundVariants": [
    {
      "color": "primary",
      "variant": "solid",
      "class": "text-inverted bg-primary"
    },
    {
      "color": "secondary",
      "variant": "solid",
      "class": "text-inverted bg-secondary"
    },
    {
      "color": "success",
      "variant": "solid",
      "class": "text-inverted bg-success"
    },
    {
      "color": "info",
      "variant": "solid",
      "class": "text-inverted bg-info"
    },
    {
      "color": "warning",
      "variant": "solid",
      "class": "text-inverted bg-warning"
    },
    {
      "color": "error",
      "variant": "solid",
      "class": "text-inverted bg-error"
    },
    {
      "color": "primary",
      "variant": "outline",
      "class": "ring ring-inset ring-primary/50 text-primary"
    },
    {
      "color": "secondary",
      "variant": "outline",
      "class": "ring ring-inset ring-secondary/50 text-secondary"
    },
    {
      "color": "success",
      "variant": "outline",
      "class": "ring ring-inset ring-success/50 text-success"
    },
    {
      "color": "info",
      "variant": "outline",
      "class": "ring ring-inset ring-info/50 text-info"
    },
    {
      "color": "warning",
      "variant": "outline",
      "class": "ring ring-inset ring-warning/50 text-warning"
    },
    {
      "color": "error",
      "variant": "outline",
      "class": "ring ring-inset ring-error/50 text-error"
    },
    {
      "color": "primary",
      "variant": "soft",
      "class": "text-primary bg-primary/10"
    },
    {
      "color": "secondary",
      "variant": "soft",
      "class": "text-secondary bg-secondary/10"
    },
    {
      "color": "success",
      "variant": "soft",
      "class": "text-success bg-success/10"
    },
    {
      "color": "info",
      "variant": "soft",
      "class": "text-info bg-info/10"
    },
    {
      "color": "warning",
      "variant": "soft",
      "class": "text-warning bg-warning/10"
    },
    {
      "color": "error",
      "variant": "soft",
      "class": "text-error bg-error/10"
    },
    {
      "color": "primary",
      "variant": "subtle",
      "class": "text-primary ring ring-inset ring-primary/25 bg-primary/10"
    },
    {
      "color": "secondary",
      "variant": "subtle",
      "class": "text-secondary ring ring-inset ring-secondary/25 bg-secondary/10"
    },
    {
      "color": "success",
      "variant": "subtle",
      "class": "text-success ring ring-inset ring-success/25 bg-success/10"
    },
    {
      "color": "info",
      "variant": "subtle",
      "class": "text-info ring ring-inset ring-info/25 bg-info/10"
    },
    {
      "color": "warning",
      "variant": "subtle",
      "class": "text-warning ring ring-inset ring-warning/25 bg-warning/10"
    },
    {
      "color": "error",
      "variant": "subtle",
      "class": "text-error ring ring-inset ring-error/25 bg-error/10"
    },
    {
      "color": "neutral",
      "variant": "solid",
      "class": "text-inverted bg-inverted"
    },
    {
      "color": "neutral",
      "variant": "outline",
      "class": "ring ring-inset ring-accented text-default bg-default"
    },
    {
      "color": "neutral",
      "variant": "soft",
      "class": "text-default bg-elevated"
    },
    {
      "color": "neutral",
      "variant": "subtle",
      "class": "ring ring-inset ring-accented text-default bg-elevated"
    }
  ],
  "defaultVariants": {
    "variant": "outline",
    "color": "neutral",
    "size": "md"
  }
};

const _sfc_main$3 = {
  __name: 'Kbd',
  __ssrInlineRender: true,
  props: {
  as: { type: null, required: false, default: "kbd" },
  value: { type: null, required: false },
  color: { type: null, required: false },
  variant: { type: null, required: false },
  size: { type: null, required: false },
  class: { type: null, required: false }
},
  setup(__props) {

const props = __props;

const { getKbdKey } = useKbd();
const appConfig = useAppConfig();
const ui = computed(() => tv({ extend: tv(theme$2), ...appConfig.ui?.kbd || {} }));

return (_ctx, _push, _parent, _attrs) => {
  _push(ssrRenderComponent(unref(Primitive), mergeProps({
    as: __props.as,
    class: ui.value({ class: props.class, color: props.color, variant: props.variant, size: props.size })
  }, _attrs), {
    default: withCtx((_, _push, _parent, _scopeId) => {
      if (_push) {
        ssrRenderSlot(_ctx.$slots, "default", {}, () => {
          _push(`${ssrInterpolate(unref(getKbdKey)(__props.value))}`);
        }, _push, _parent, _scopeId);
      } else {
        return [
          renderSlot(_ctx.$slots, "default", {}, () => [
            createTextVNode(toDisplayString(unref(getKbdKey)(__props.value)), 1 /* TEXT */)
          ])
        ]
      }
    }),
    _: 3 /* FORWARDED */
  }, _parent));
}
}

};
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext()
  ;(ssrContext.modules || (ssrContext.modules = new Set())).add("node_modules/@nuxt/ui/dist/runtime/components/Kbd.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : undefined
};

const theme$1 = {
  "slots": {
    "content": "bg-default shadow-lg rounded-md ring ring-default data-[state=open]:animate-[scale-in_100ms_ease-out] data-[state=closed]:animate-[scale-out_100ms_ease-in] origin-(--reka-popover-content-transform-origin) focus:outline-none pointer-events-auto",
    "arrow": "fill-default"
  }
};

const _sfc_main$2 = {
  __name: 'Popover',
  __ssrInlineRender: true,
  props: {
  mode: { type: null, required: false, default: "click" },
  content: { type: Object, required: false },
  arrow: { type: [Boolean, Object], required: false },
  portal: { type: [Boolean, String], required: false, skipCheck: true, default: true },
  reference: { type: null, required: false },
  dismissible: { type: Boolean, required: false, default: true },
  class: { type: null, required: false },
  ui: { type: null, required: false },
  defaultOpen: { type: Boolean, required: false },
  open: { type: Boolean, required: false },
  modal: { type: Boolean, required: false },
  openDelay: { type: Number, required: false, default: 0 },
  closeDelay: { type: Number, required: false, default: 0 }
},
  emits: ["close:prevent", "update:open"],
  setup(__props, { emit: __emit }) {

const props = __props;
const emits = __emit;
const slots = useSlots();
const appConfig = useAppConfig();
const pick = props.mode === "hover" ? reactivePick(props, "defaultOpen", "open", "openDelay", "closeDelay") : reactivePick(props, "defaultOpen", "open", "modal");
const rootProps = useForwardPropsEmits(pick, emits);
const portalProps = usePortal(toRef(() => props.portal));
const contentProps = toRef(() => defu(props.content, { side: "bottom", sideOffset: 8, collisionPadding: 8 }));
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
  return {};
});
const arrowProps = toRef(() => props.arrow);
const ui = computed(() => tv({ extend: tv(theme$1), ...appConfig.ui?.popover || {} })({
  side: contentProps.value.side
}));
const Component = computed(() => props.mode === "hover" ? HoverCard : Popover);

return (_ctx, _push, _parent, _attrs) => {
  _push(ssrRenderComponent(unref(Component).Root, mergeProps(unref(rootProps), _attrs), {
    default: withCtx(({ open, close }, _push, _parent, _scopeId) => {
      if (_push) {
        if (!!slots.default || !!__props.reference) {
          _push(ssrRenderComponent(unref(Component).Trigger, {
            "as-child": "",
            reference: __props.reference,
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
        if ('Anchor' in Component.value && !!slots.anchor) {
          _push(ssrRenderComponent(unref(Component).Anchor, { "as-child": "" }, {
            default: withCtx((_, _push, _parent, _scopeId) => {
              if (_push) {
                ssrRenderSlot(_ctx.$slots, "anchor", close ? { close } : {}, null, _push, _parent, _scopeId);
              } else {
                return [
                  renderSlot(_ctx.$slots, "anchor", close ? { close } : {})
                ]
              }
            }),
            _: 2 /* DYNAMIC */
          }, _parent, _scopeId));
        } else {
          _push(`<!---->`);
        }
        _push(ssrRenderComponent(unref(Component).Portal, unref(portalProps), {
          default: withCtx((_, _push, _parent, _scopeId) => {
            if (_push) {
              _push(ssrRenderComponent(unref(Component).Content, mergeProps(contentProps.value, {
                "data-slot": "content",
                class: ui.value.content({ class: [!slots.default && props.class, props.ui?.content] })
              }, toHandlers(contentEvents.value)), {
                default: withCtx((_, _push, _parent, _scopeId) => {
                  if (_push) {
                    ssrRenderSlot(_ctx.$slots, "content", close ? { close } : {}, null, _push, _parent, _scopeId);
                    if (!!__props.arrow) {
                      _push(ssrRenderComponent(unref(Component).Arrow, mergeProps(arrowProps.value, {
                        "data-slot": "arrow",
                        class: ui.value.arrow({ class: props.ui?.arrow })
                      }), null, _parent, _scopeId));
                    } else {
                      _push(`<!---->`);
                    }
                  } else {
                    return [
                      renderSlot(_ctx.$slots, "content", close ? { close } : {}),
                      (!!__props.arrow)
                        ? (openBlock(), createBlock(unref(Component).Arrow, mergeProps({ key: 0 }, arrowProps.value, {
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
                createVNode(unref(Component).Content, mergeProps(contentProps.value, {
                  "data-slot": "content",
                  class: ui.value.content({ class: [!slots.default && props.class, props.ui?.content] })
                }, toHandlers(contentEvents.value)), {
                  default: withCtx(() => [
                    renderSlot(_ctx.$slots, "content", close ? { close } : {}),
                    (!!__props.arrow)
                      ? (openBlock(), createBlock(unref(Component).Arrow, mergeProps({ key: 0 }, arrowProps.value, {
                          "data-slot": "arrow",
                          class: ui.value.arrow({ class: props.ui?.arrow })
                        }), null, 16 /* FULL_PROPS */, ["class"]))
                      : createCommentVNode("v-if", true)
                  ]),
                  _: 2 /* DYNAMIC */
                }, 1040 /* FULL_PROPS, DYNAMIC_SLOTS */, ["class"])
              ]
            }
          }),
          _: 2 /* DYNAMIC */
        }, _parent, _scopeId));
      } else {
        return [
          (!!slots.default || !!__props.reference)
            ? (openBlock(), createBlock(unref(Component).Trigger, {
                key: 0,
                "as-child": "",
                reference: __props.reference,
                class: props.class
              }, {
                default: withCtx(() => [
                  renderSlot(_ctx.$slots, "default", { open: open })
                ]),
                _: 2 /* DYNAMIC */
              }, 1032 /* PROPS, DYNAMIC_SLOTS */, ["reference", "class"]))
            : createCommentVNode("v-if", true),
          ('Anchor' in Component.value && !!slots.anchor)
            ? (openBlock(), createBlock(unref(Component).Anchor, {
                key: 1,
                "as-child": ""
              }, {
                default: withCtx(() => [
                  renderSlot(_ctx.$slots, "anchor", close ? { close } : {})
                ]),
                _: 2 /* DYNAMIC */
              }, 1024 /* DYNAMIC_SLOTS */))
            : createCommentVNode("v-if", true),
          createVNode(unref(Component).Portal, unref(portalProps), {
            default: withCtx(() => [
              createVNode(unref(Component).Content, mergeProps(contentProps.value, {
                "data-slot": "content",
                class: ui.value.content({ class: [!slots.default && props.class, props.ui?.content] })
              }, toHandlers(contentEvents.value)), {
                default: withCtx(() => [
                  renderSlot(_ctx.$slots, "content", close ? { close } : {}),
                  (!!__props.arrow)
                    ? (openBlock(), createBlock(unref(Component).Arrow, mergeProps({ key: 0 }, arrowProps.value, {
                        "data-slot": "arrow",
                        class: ui.value.arrow({ class: props.ui?.arrow })
                      }), null, 16 /* FULL_PROPS */, ["class"]))
                    : createCommentVNode("v-if", true)
                ]),
                _: 2 /* DYNAMIC */
              }, 1040 /* FULL_PROPS, DYNAMIC_SLOTS */, ["class"])
            ]),
            _: 2 /* DYNAMIC */
          }, 1040 /* FULL_PROPS, DYNAMIC_SLOTS */)
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
  ;(ssrContext.modules || (ssrContext.modules = new Set())).add("node_modules/@nuxt/ui/dist/runtime/components/Popover.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : undefined
};

const _sfc_main$1 = /*@__PURE__*/Object.assign({ inheritAttrs: false }, {
  __name: 'ColorModeButton',
  __ssrInlineRender: true,
  props: {
  color: { type: null, required: false, default: "neutral" },
  variant: { type: null, required: false, default: "ghost" },
  label: { type: String, required: false },
  activeColor: { type: null, required: false },
  activeVariant: { type: null, required: false },
  size: { type: null, required: false },
  square: { type: Boolean, required: false },
  block: { type: Boolean, required: false },
  loadingAuto: { type: Boolean, required: false },
  onClick: { type: [Function, Array], required: false },
  class: { type: null, required: false },
  ui: { type: null, required: false },
  icon: { type: null, required: false },
  avatar: { type: Object, required: false },
  leading: { type: Boolean, required: false },
  leadingIcon: { type: null, required: false },
  trailing: { type: Boolean, required: false },
  trailingIcon: { type: null, required: false },
  loading: { type: Boolean, required: false },
  loadingIcon: { type: null, required: false },
  as: { type: null, required: false },
  type: { type: null, required: false },
  disabled: { type: Boolean, required: false },
  active: { type: Boolean, required: false },
  exact: { type: Boolean, required: false },
  exactQuery: { type: [Boolean, String], required: false },
  exactHash: { type: Boolean, required: false },
  inactiveClass: { type: String, required: false },
  to: { type: null, required: false },
  href: { type: null, required: false },
  external: { type: Boolean, required: false },
  target: { type: [String, Object, null], required: false },
  rel: { type: [String, Object, null], required: false },
  noRel: { type: Boolean, required: false },
  prefetchedClass: { type: String, required: false },
  prefetch: { type: Boolean, required: false },
  prefetchOn: { type: [String, Object], required: false },
  noPrefetch: { type: Boolean, required: false },
  trailingSlash: { type: String, required: false },
  activeClass: { type: String, required: false },
  exactActiveClass: { type: String, required: false },
  ariaCurrentValue: { type: String, required: false },
  viewTransition: { type: Boolean, required: false },
  replace: { type: Boolean, required: false }
},
  setup(__props) {


const props = __props;
const { t } = useLocale();
const colorMode = useColorMode();
const appConfig = useAppConfig();
const buttonProps = useForwardProps(reactiveOmit(props, "icon"));
const isDark = computed({
  get() {
    return colorMode.value === "dark";
  },
  set(_isDark) {
    colorMode.preference = _isDark ? "dark" : "light";
  }
});

return (_ctx, _push, _parent, _attrs) => {
  _push(ssrRenderComponent(_sfc_main$d, mergeProps({
  ...unref(buttonProps),
  'aria-label': isDark.value ? unref(t)('colorMode.switchToLight') : unref(t)('colorMode.switchToDark'),
  ..._ctx.$attrs
}, {
    onClick: $event => (isDark.value = !isDark.value)
  }, _attrs), {
    leading: withCtx(({ ui }, _push, _parent, _scopeId) => {
      if (_push) {
        _push(ssrRenderComponent(_sfc_main$b, {
          class: [ui.leadingIcon({ class: props.ui?.leadingIcon }), "hidden dark:inline"],
          name: unref(appConfig).ui.icons.dark
        }, null, _parent, _scopeId));
        _push(ssrRenderComponent(_sfc_main$b, {
          class: [ui.leadingIcon({ class: props.ui?.leadingIcon }), "inline dark:hidden"],
          name: unref(appConfig).ui.icons.light
        }, null, _parent, _scopeId));
      } else {
        return [
          createVNode(_sfc_main$b, {
            class: [ui.leadingIcon({ class: props.ui?.leadingIcon }), "hidden dark:inline"],
            name: unref(appConfig).ui.icons.dark
          }, null, 8 /* PROPS */, ["class", "name"]),
          createVNode(_sfc_main$b, {
            class: [ui.leadingIcon({ class: props.ui?.leadingIcon }), "inline dark:hidden"],
            name: unref(appConfig).ui.icons.light
          }, null, 8 /* PROPS */, ["class", "name"])
        ]
      }
    }),
    _: 1 /* STABLE */
  }, _parent));
}
}

});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext()
  ;(ssrContext.modules || (ssrContext.modules = new Set())).add("node_modules/@nuxt/ui/dist/runtime/components/color-mode/ColorModeButton.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : undefined
};

const theme = {
  "slots": {
    "base": "font-medium inline-flex items-center",
    "label": "truncate",
    "leadingIcon": "shrink-0",
    "leadingAvatar": "shrink-0",
    "leadingAvatarSize": "",
    "trailingIcon": "shrink-0"
  },
  "variants": {
    "fieldGroup": {
      "horizontal": "not-only:first:rounded-e-none not-only:last:rounded-s-none not-last:not-first:rounded-none focus-visible:z-[1]",
      "vertical": "not-only:first:rounded-b-none not-only:last:rounded-t-none not-last:not-first:rounded-none focus-visible:z-[1]"
    },
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
    "size": {
      "xs": {
        "base": "text-[8px]/3 px-1 py-0.5 gap-1 rounded-sm",
        "leadingIcon": "size-3",
        "leadingAvatarSize": "3xs",
        "trailingIcon": "size-3"
      },
      "sm": {
        "base": "text-[10px]/3 px-1.5 py-1 gap-1 rounded-sm",
        "leadingIcon": "size-3",
        "leadingAvatarSize": "3xs",
        "trailingIcon": "size-3"
      },
      "md": {
        "base": "text-xs px-2 py-1 gap-1 rounded-md",
        "leadingIcon": "size-4",
        "leadingAvatarSize": "3xs",
        "trailingIcon": "size-4"
      },
      "lg": {
        "base": "text-sm px-2 py-1 gap-1.5 rounded-md",
        "leadingIcon": "size-5",
        "leadingAvatarSize": "2xs",
        "trailingIcon": "size-5"
      },
      "xl": {
        "base": "text-base px-2.5 py-1 gap-1.5 rounded-md",
        "leadingIcon": "size-6",
        "leadingAvatarSize": "2xs",
        "trailingIcon": "size-6"
      }
    },
    "square": {
      "true": ""
    }
  },
  "compoundVariants": [
    {
      "color": "primary",
      "variant": "solid",
      "class": "bg-primary text-inverted"
    },
    {
      "color": "secondary",
      "variant": "solid",
      "class": "bg-secondary text-inverted"
    },
    {
      "color": "success",
      "variant": "solid",
      "class": "bg-success text-inverted"
    },
    {
      "color": "info",
      "variant": "solid",
      "class": "bg-info text-inverted"
    },
    {
      "color": "warning",
      "variant": "solid",
      "class": "bg-warning text-inverted"
    },
    {
      "color": "error",
      "variant": "solid",
      "class": "bg-error text-inverted"
    },
    {
      "color": "primary",
      "variant": "outline",
      "class": "text-primary ring ring-inset ring-primary/50"
    },
    {
      "color": "secondary",
      "variant": "outline",
      "class": "text-secondary ring ring-inset ring-secondary/50"
    },
    {
      "color": "success",
      "variant": "outline",
      "class": "text-success ring ring-inset ring-success/50"
    },
    {
      "color": "info",
      "variant": "outline",
      "class": "text-info ring ring-inset ring-info/50"
    },
    {
      "color": "warning",
      "variant": "outline",
      "class": "text-warning ring ring-inset ring-warning/50"
    },
    {
      "color": "error",
      "variant": "outline",
      "class": "text-error ring ring-inset ring-error/50"
    },
    {
      "color": "primary",
      "variant": "soft",
      "class": "bg-primary/10 text-primary"
    },
    {
      "color": "secondary",
      "variant": "soft",
      "class": "bg-secondary/10 text-secondary"
    },
    {
      "color": "success",
      "variant": "soft",
      "class": "bg-success/10 text-success"
    },
    {
      "color": "info",
      "variant": "soft",
      "class": "bg-info/10 text-info"
    },
    {
      "color": "warning",
      "variant": "soft",
      "class": "bg-warning/10 text-warning"
    },
    {
      "color": "error",
      "variant": "soft",
      "class": "bg-error/10 text-error"
    },
    {
      "color": "primary",
      "variant": "subtle",
      "class": "bg-primary/10 text-primary ring ring-inset ring-primary/25"
    },
    {
      "color": "secondary",
      "variant": "subtle",
      "class": "bg-secondary/10 text-secondary ring ring-inset ring-secondary/25"
    },
    {
      "color": "success",
      "variant": "subtle",
      "class": "bg-success/10 text-success ring ring-inset ring-success/25"
    },
    {
      "color": "info",
      "variant": "subtle",
      "class": "bg-info/10 text-info ring ring-inset ring-info/25"
    },
    {
      "color": "warning",
      "variant": "subtle",
      "class": "bg-warning/10 text-warning ring ring-inset ring-warning/25"
    },
    {
      "color": "error",
      "variant": "subtle",
      "class": "bg-error/10 text-error ring ring-inset ring-error/25"
    },
    {
      "color": "neutral",
      "variant": "solid",
      "class": "text-inverted bg-inverted"
    },
    {
      "color": "neutral",
      "variant": "outline",
      "class": "ring ring-inset ring-accented text-default bg-default"
    },
    {
      "color": "neutral",
      "variant": "soft",
      "class": "text-default bg-elevated"
    },
    {
      "color": "neutral",
      "variant": "subtle",
      "class": "ring ring-inset ring-accented text-default bg-elevated"
    },
    {
      "size": "xs",
      "square": true,
      "class": "p-0.5"
    },
    {
      "size": "sm",
      "square": true,
      "class": "p-1"
    },
    {
      "size": "md",
      "square": true,
      "class": "p-1"
    },
    {
      "size": "lg",
      "square": true,
      "class": "p-1"
    },
    {
      "size": "xl",
      "square": true,
      "class": "p-1"
    }
  ],
  "defaultVariants": {
    "color": "primary",
    "variant": "solid",
    "size": "md"
  }
};

const _sfc_main = {
  __name: 'Badge',
  __ssrInlineRender: true,
  props: {
  as: { type: null, required: false, default: "span" },
  label: { type: [String, Number], required: false },
  color: { type: null, required: false },
  variant: { type: null, required: false },
  size: { type: null, required: false },
  square: { type: Boolean, required: false },
  class: { type: null, required: false },
  ui: { type: null, required: false },
  icon: { type: null, required: false },
  avatar: { type: Object, required: false },
  leading: { type: Boolean, required: false },
  leadingIcon: { type: null, required: false },
  trailing: { type: Boolean, required: false },
  trailingIcon: { type: null, required: false }
},
  setup(__props) {

const props = __props;
const slots = useSlots();
const appConfig = useAppConfig();
const { orientation, size: fieldGroupSize } = useFieldGroup(props);
const { isLeading, isTrailing, leadingIconName, trailingIconName } = useComponentIcons(props);
const ui = computed(() => tv({ extend: tv(theme), ...appConfig.ui?.badge || {} })({
  color: props.color,
  variant: props.variant,
  size: fieldGroupSize.value || props.size,
  square: props.square || !slots.default && !props.label,
  fieldGroup: orientation.value
}));

return (_ctx, _push, _parent, _attrs) => {
  _push(ssrRenderComponent(unref(Primitive), mergeProps({
    as: __props.as,
    "data-slot": "base",
    class: ui.value.base({ class: [props.ui?.base, props.class] })
  }, _attrs), {
    default: withCtx((_, _push, _parent, _scopeId) => {
      if (_push) {
        ssrRenderSlot(_ctx.$slots, "leading", { ui: ui.value }, () => {
          if (unref(isLeading) && unref(leadingIconName)) {
            _push(ssrRenderComponent(_sfc_main$b, {
              name: unref(leadingIconName),
              "data-slot": "leadingIcon",
              class: ui.value.leadingIcon({ class: props.ui?.leadingIcon })
            }, null, _parent, _scopeId));
          } else if (!!__props.avatar) {
            _push(ssrRenderComponent(_sfc_main$c, mergeProps({
              size: props.ui?.leadingAvatarSize || ui.value.leadingAvatarSize()
            }, __props.avatar, {
              "data-slot": "leadingAvatar",
              class: ui.value.leadingAvatar({ class: props.ui?.leadingAvatar })
            }), null, _parent, _scopeId));
          } else {
            _push(`<!---->`);
          }
        }, _push, _parent, _scopeId);
        ssrRenderSlot(_ctx.$slots, "default", { ui: ui.value }, () => {
          if (__props.label !== void 0 && __props.label !== null) {
            _push(`<span data-slot="label" class="${
              ssrRenderClass(ui.value.label({ class: props.ui?.label }))
            }"${
              _scopeId
            }>${
              ssrInterpolate(__props.label)
            }</span>`);
          } else {
            _push(`<!---->`);
          }
        }, _push, _parent, _scopeId);
        ssrRenderSlot(_ctx.$slots, "trailing", { ui: ui.value }, () => {
          if (unref(isTrailing) && unref(trailingIconName)) {
            _push(ssrRenderComponent(_sfc_main$b, {
              name: unref(trailingIconName),
              "data-slot": "trailingIcon",
              class: ui.value.trailingIcon({ class: props.ui?.trailingIcon })
            }, null, _parent, _scopeId));
          } else {
            _push(`<!---->`);
          }
        }, _push, _parent, _scopeId);
      } else {
        return [
          renderSlot(_ctx.$slots, "leading", { ui: ui.value }, () => [
            (unref(isLeading) && unref(leadingIconName))
              ? (openBlock(), createBlock(_sfc_main$b, {
                  key: 0,
                  name: unref(leadingIconName),
                  "data-slot": "leadingIcon",
                  class: ui.value.leadingIcon({ class: props.ui?.leadingIcon })
                }, null, 8 /* PROPS */, ["name", "class"]))
              : (!!__props.avatar)
                ? (openBlock(), createBlock(_sfc_main$c, mergeProps({
                    key: 1,
                    size: props.ui?.leadingAvatarSize || ui.value.leadingAvatarSize()
                  }, __props.avatar, {
                    "data-slot": "leadingAvatar",
                    class: ui.value.leadingAvatar({ class: props.ui?.leadingAvatar })
                  }), null, 16 /* FULL_PROPS */, ["size", "class"]))
                : createCommentVNode("v-if", true)
          ]),
          renderSlot(_ctx.$slots, "default", { ui: ui.value }, () => [
            (__props.label !== void 0 && __props.label !== null)
              ? (openBlock(), createBlock("span", {
                  key: 0,
                  "data-slot": "label",
                  class: ui.value.label({ class: props.ui?.label })
                }, toDisplayString(__props.label), 3 /* TEXT, CLASS */))
              : createCommentVNode("v-if", true)
          ]),
          renderSlot(_ctx.$slots, "trailing", { ui: ui.value }, () => [
            (unref(isTrailing) && unref(trailingIconName))
              ? (openBlock(), createBlock(_sfc_main$b, {
                  key: 0,
                  name: unref(trailingIconName),
                  "data-slot": "trailingIcon",
                  class: ui.value.trailingIcon({ class: props.ui?.trailingIcon })
                }, null, 8 /* PROPS */, ["name", "class"]))
              : createCommentVNode("v-if", true)
          ])
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
  ;(ssrContext.modules || (ssrContext.modules = new Set())).add("node_modules/@nuxt/ui/dist/runtime/components/Badge.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : undefined
};

export { _sfc_main$a as _, _sfc_main as a, _export_sfc as b, _sfc_main$2 as c, _sfc_main$1 as d, _sfc_main$5 as e, _sfc_main$4 as f, usePortal as g, _sfc_main$3 as h, _sfc_main$9 as i, useToast as u };
