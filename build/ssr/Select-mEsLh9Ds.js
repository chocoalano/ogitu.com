import { useSlots, toRef, computed, useTemplateRef, onMounted, unref, mergeProps, withCtx, createBlock, createCommentVNode, renderSlot, openBlock, Fragment, renderList, toDisplayString, createTextVNode, createVNode, useSSRContext } from 'vue';
import { ssrRenderComponent, ssrRenderClass, ssrRenderSlot, ssrRenderList, ssrInterpolate } from 'vue/server-renderer';
import { useForwardPropsEmits, SelectRoot, SelectTrigger, SelectPortal, SelectContent, SelectGroup, SelectLabel, SelectSeparator, SelectItem, SelectItemText, SelectItemIndicator, SelectArrow } from 'reka-ui';
import { defu } from 'defu';
import { reactivePick } from '@vueuse/core';
import { a as useAppConfig, i as isArrayOfArray, g as get, j as getDisplayValue } from './virtual_nuxt-ui-plugins-CrG8Uaxr.js';
import { u as useFormField, i as useFieldGroup, j as useComponentIcons, t as tv, _ as _sfc_main$1, b as _sfc_main$2, k as _sfc_main$3 } from './Button-BTdvmZ8N.js';
import { g as usePortal } from './Badge-CQlYH3Fo.js';

const theme = {
  "slots": {
    "base": [
      "relative group rounded-md inline-flex items-center focus:outline-none disabled:cursor-not-allowed disabled:opacity-75",
      "transition-colors"
    ],
    "leading": "absolute inset-y-0 start-0 flex items-center",
    "leadingIcon": "shrink-0 text-dimmed",
    "leadingAvatar": "shrink-0",
    "leadingAvatarSize": "",
    "trailing": "absolute inset-y-0 end-0 flex items-center",
    "trailingIcon": "shrink-0 text-dimmed",
    "value": "truncate pointer-events-none",
    "placeholder": "truncate text-dimmed",
    "arrow": "fill-default",
    "content": "max-h-60 w-(--reka-select-trigger-width) bg-default shadow-lg rounded-md ring ring-default overflow-hidden data-[state=open]:animate-[scale-in_100ms_ease-out] data-[state=closed]:animate-[scale-out_100ms_ease-in] origin-(--reka-select-content-transform-origin) pointer-events-auto flex flex-col",
    "viewport": "relative divide-y divide-default scroll-py-1 overflow-y-auto flex-1",
    "group": "p-1 isolate",
    "empty": "text-center text-muted",
    "label": "font-semibold text-highlighted",
    "separator": "-mx-1 my-1 h-px bg-border",
    "item": [
      "group relative w-full flex items-start select-none outline-none before:absolute before:z-[-1] before:inset-px before:rounded-md data-disabled:cursor-not-allowed data-disabled:opacity-75 text-default data-highlighted:not-data-disabled:text-highlighted data-highlighted:not-data-disabled:before:bg-elevated/50",
      "transition-colors before:transition-colors"
    ],
    "itemLeadingIcon": [
      "shrink-0 text-dimmed group-data-highlighted:not-group-data-disabled:text-default",
      "transition-colors"
    ],
    "itemLeadingAvatar": "shrink-0",
    "itemLeadingAvatarSize": "",
    "itemLeadingChip": "shrink-0",
    "itemLeadingChipSize": "",
    "itemTrailing": "ms-auto inline-flex gap-1.5 items-center",
    "itemTrailingIcon": "shrink-0",
    "itemWrapper": "flex-1 flex flex-col min-w-0",
    "itemLabel": "truncate",
    "itemDescription": "truncate text-muted"
  },
  "variants": {
    "fieldGroup": {
      "horizontal": "not-only:first:rounded-e-none not-only:last:rounded-s-none not-last:not-first:rounded-none focus-visible:z-[1]",
      "vertical": "not-only:first:rounded-b-none not-only:last:rounded-t-none not-last:not-first:rounded-none focus-visible:z-[1]"
    },
    "size": {
      "xs": {
        "base": "px-2 py-1 text-xs gap-1",
        "leading": "ps-2",
        "trailing": "pe-2",
        "leadingIcon": "size-4",
        "leadingAvatarSize": "3xs",
        "trailingIcon": "size-4",
        "label": "p-1 text-[10px]/3 gap-1",
        "item": "p-1 text-xs gap-1",
        "itemLeadingIcon": "size-4",
        "itemLeadingAvatarSize": "3xs",
        "itemLeadingChip": "size-4",
        "itemLeadingChipSize": "sm",
        "itemTrailingIcon": "size-4",
        "empty": "p-1 text-xs"
      },
      "sm": {
        "base": "px-2.5 py-1.5 text-xs gap-1.5",
        "leading": "ps-2.5",
        "trailing": "pe-2.5",
        "leadingIcon": "size-4",
        "leadingAvatarSize": "3xs",
        "trailingIcon": "size-4",
        "label": "p-1.5 text-[10px]/3 gap-1.5",
        "item": "p-1.5 text-xs gap-1.5",
        "itemLeadingIcon": "size-4",
        "itemLeadingAvatarSize": "3xs",
        "itemLeadingChip": "size-4",
        "itemLeadingChipSize": "sm",
        "itemTrailingIcon": "size-4",
        "empty": "p-1.5 text-xs"
      },
      "md": {
        "base": "px-2.5 py-1.5 text-sm gap-1.5",
        "leading": "ps-2.5",
        "trailing": "pe-2.5",
        "leadingIcon": "size-5",
        "leadingAvatarSize": "2xs",
        "trailingIcon": "size-5",
        "label": "p-1.5 text-xs gap-1.5",
        "item": "p-1.5 text-sm gap-1.5",
        "itemLeadingIcon": "size-5",
        "itemLeadingAvatarSize": "2xs",
        "itemLeadingChip": "size-5",
        "itemLeadingChipSize": "md",
        "itemTrailingIcon": "size-5",
        "empty": "p-1.5 text-sm"
      },
      "lg": {
        "base": "px-3 py-2 text-sm gap-2",
        "leading": "ps-3",
        "trailing": "pe-3",
        "leadingIcon": "size-5",
        "leadingAvatarSize": "2xs",
        "trailingIcon": "size-5",
        "label": "p-2 text-xs gap-2",
        "item": "p-2 text-sm gap-2",
        "itemLeadingIcon": "size-5",
        "itemLeadingAvatarSize": "2xs",
        "itemLeadingChip": "size-5",
        "itemLeadingChipSize": "md",
        "itemTrailingIcon": "size-5",
        "empty": "p-2 text-sm"
      },
      "xl": {
        "base": "px-3 py-2 text-base gap-2",
        "leading": "ps-3",
        "trailing": "pe-3",
        "leadingIcon": "size-6",
        "leadingAvatarSize": "xs",
        "trailingIcon": "size-6",
        "label": "p-2 text-sm gap-2",
        "item": "p-2 text-base gap-2",
        "itemLeadingIcon": "size-6",
        "itemLeadingAvatarSize": "xs",
        "itemLeadingChip": "size-6",
        "itemLeadingChipSize": "lg",
        "itemTrailingIcon": "size-6",
        "empty": "p-2 text-base"
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
      "class": "focus:ring-2 focus:ring-inset focus:ring-primary"
    },
    {
      "color": "secondary",
      "variant": [
        "outline",
        "subtle"
      ],
      "class": "focus:ring-2 focus:ring-inset focus:ring-secondary"
    },
    {
      "color": "success",
      "variant": [
        "outline",
        "subtle"
      ],
      "class": "focus:ring-2 focus:ring-inset focus:ring-success"
    },
    {
      "color": "info",
      "variant": [
        "outline",
        "subtle"
      ],
      "class": "focus:ring-2 focus:ring-inset focus:ring-info"
    },
    {
      "color": "warning",
      "variant": [
        "outline",
        "subtle"
      ],
      "class": "focus:ring-2 focus:ring-inset focus:ring-warning"
    },
    {
      "color": "error",
      "variant": [
        "outline",
        "subtle"
      ],
      "class": "focus:ring-2 focus:ring-inset focus:ring-error"
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
      "class": "focus:ring-2 focus:ring-inset focus:ring-inverted"
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

const _sfc_main = /*@__PURE__*/Object.assign({ inheritAttrs: false }, {
  __name: 'Select',
  __ssrInlineRender: true,
  props: {
  id: { type: String, required: false },
  placeholder: { type: String, required: false },
  color: { type: null, required: false },
  variant: { type: null, required: false },
  size: { type: null, required: false },
  trailingIcon: { type: null, required: false },
  selectedIcon: { type: null, required: false },
  content: { type: Object, required: false },
  arrow: { type: [Boolean, Object], required: false },
  portal: { type: [Boolean, String], required: false, skipCheck: true, default: true },
  valueKey: { type: null, required: false, default: "value" },
  labelKey: { type: null, required: false, default: "label" },
  descriptionKey: { type: null, required: false, default: "description" },
  items: { type: null, required: false },
  defaultValue: { type: null, required: false },
  modelValue: { type: null, required: false },
  multiple: { type: Boolean, required: false },
  highlight: { type: Boolean, required: false },
  autofocus: { type: Boolean, required: false },
  autofocusDelay: { type: Number, required: false, default: 0 },
  class: { type: null, required: false },
  ui: { type: null, required: false },
  open: { type: Boolean, required: false },
  defaultOpen: { type: Boolean, required: false },
  autocomplete: { type: String, required: false },
  disabled: { type: Boolean, required: false },
  name: { type: String, required: false },
  required: { type: Boolean, required: false },
  icon: { type: null, required: false },
  avatar: { type: Object, required: false },
  leading: { type: Boolean, required: false },
  leadingIcon: { type: null, required: false },
  trailing: { type: Boolean, required: false },
  loading: { type: Boolean, required: false },
  loadingIcon: { type: null, required: false }
},
  emits: ["update:open", "change", "blur", "focus", "update:modelValue"],
  setup(__props, { expose: __expose, emit: __emit }) {


const props = __props;
const emits = __emit;
const slots = useSlots();
const appConfig = useAppConfig();
const rootProps = useForwardPropsEmits(reactivePick(props, "open", "defaultOpen", "disabled", "autocomplete", "required", "multiple"), emits);
const portalProps = usePortal(toRef(() => props.portal));
const contentProps = toRef(() => defu(props.content, { side: "bottom", sideOffset: 8, collisionPadding: 8, position: "popper" }));
const arrowProps = toRef(() => props.arrow);
const { emitFormChange, emitFormInput, emitFormBlur, emitFormFocus, size: formGroupSize, color, id, name, highlight, disabled, ariaAttrs } = useFormField(props);
const { orientation, size: fieldGroupSize } = useFieldGroup(props);
const { isLeading, isTrailing, leadingIconName, trailingIconName } = useComponentIcons(toRef(() => defu(props, { trailingIcon: appConfig.ui.icons.chevronDown })));
const selectSize = computed(() => fieldGroupSize.value || formGroupSize.value);
const ui = computed(() => tv({ extend: tv(theme), ...appConfig.ui?.select || {} })({
  color: color.value,
  variant: props.variant,
  size: selectSize?.value,
  loading: props.loading,
  highlight: highlight.value,
  leading: isLeading.value || !!props.avatar || !!slots.leading,
  trailing: isTrailing.value || !!slots.trailing,
  fieldGroup: orientation.value
}));
const groups = computed(
  () => props.items?.length ? isArrayOfArray(props.items) ? props.items : [props.items] : []
);
const items = computed(() => groups.value.flatMap((group) => group));
function displayValue(value) {
  if (props.multiple && Array.isArray(value)) {
    const displayedValues = value.map((item) => getDisplayValue(items.value, item, {
      labelKey: props.labelKey,
      valueKey: props.valueKey
    })).filter((v) => v != null && v !== "");
    return displayedValues.length > 0 ? displayedValues.join(", ") : void 0;
  }
  return getDisplayValue(items.value, value, {
    labelKey: props.labelKey,
    valueKey: props.valueKey
  });
}
const triggerRef = useTemplateRef("triggerRef");
function autoFocus() {
  if (props.autofocus) {
    triggerRef.value?.$el?.focus({
      focusVisible: true
    });
  }
}
onMounted(() => {
  setTimeout(() => {
    autoFocus();
  }, props.autofocusDelay);
});
function onUpdate(value) {
  const event = new Event("change", { target: { value } });
  emits("change", event);
  emitFormChange();
  emitFormInput();
}
function onUpdateOpen(value) {
  if (!value) {
    const event = new FocusEvent("blur");
    emits("blur", event);
    emitFormBlur();
  } else {
    const event = new FocusEvent("focus");
    emits("focus", event);
    emitFormFocus();
  }
}
function isSelectItem(item) {
  return typeof item === "object" && item !== null;
}
__expose({
  triggerRef: toRef(() => triggerRef.value?.$el)
});

return (_ctx, _push, _parent, _attrs) => {
  _push(ssrRenderComponent(unref(SelectRoot), mergeProps({ name: unref(name) }, unref(rootProps), {
    autocomplete: __props.autocomplete,
    disabled: unref(disabled),
    "default-value": __props.defaultValue,
    "model-value": __props.modelValue,
    "onUpdate:modelValue": onUpdate,
    "onUpdate:open": onUpdateOpen
  }, _attrs), {
    default: withCtx(({ modelValue, open }, _push, _parent, _scopeId) => {
      if (_push) {
        _push(ssrRenderComponent(unref(SelectTrigger), mergeProps({
          id: unref(id),
          ref_key: "triggerRef",
          ref: triggerRef,
          "data-slot": "base",
          class: ui.value.base({ class: [props.ui?.base, props.class] })
        }, { ..._ctx.$attrs, ...unref(ariaAttrs) }), {
          default: withCtx((_, _push, _parent, _scopeId) => {
            if (_push) {
              if (unref(isLeading) || !!__props.avatar || !!slots.leading) {
                _push(`<span data-slot="leading" class="${
                  ssrRenderClass(ui.value.leading({ class: props.ui?.leading }))
                }"${
                  _scopeId
                }>`);
                ssrRenderSlot(_ctx.$slots, "leading", {
                  modelValue: modelValue,
                  open: open,
                  ui: ui.value
                }, () => {
                  if (unref(isLeading) && unref(leadingIconName)) {
                    _push(ssrRenderComponent(_sfc_main$1, {
                      name: unref(leadingIconName),
                      "data-slot": "leadingIcon",
                      class: ui.value.leadingIcon({ class: props.ui?.leadingIcon })
                    }, null, _parent, _scopeId));
                  } else if (!!__props.avatar) {
                    _push(ssrRenderComponent(_sfc_main$2, mergeProps({
                      size: props.ui?.itemLeadingAvatarSize || ui.value.itemLeadingAvatarSize()
                    }, __props.avatar, {
                      "data-slot": "itemLeadingAvatar",
                      class: ui.value.itemLeadingAvatar({ class: props.ui?.itemLeadingAvatar })
                    }), null, _parent, _scopeId));
                  } else {
                    _push(`<!---->`);
                  }
                }, _push, _parent, _scopeId);
                _push(`</span>`);
              } else {
                _push(`<!---->`);
              }
              ssrRenderSlot(_ctx.$slots, "default", {
                modelValue: modelValue,
                open: open,
                ui: ui.value
              }, () => {
                _push(`<!--[-->`);
                ssrRenderList([displayValue(modelValue)], (displayedModelValue) => {
                  _push(`<!--[-->`);
                  if (displayedModelValue !== void 0 && displayedModelValue !== null) {
                    _push(`<span data-slot="value" class="${
                      ssrRenderClass(ui.value.value({ class: props.ui?.value }))
                    }"${
                      _scopeId
                    }>${
                      ssrInterpolate(displayedModelValue)
                    }</span>`);
                  } else {
                    _push(`<span data-slot="placeholder" class="${
                      ssrRenderClass(ui.value.placeholder({ class: props.ui?.placeholder }))
                    }"${
                      _scopeId
                    }>${
                      ssrInterpolate(__props.placeholder ?? "\xA0")
                    }</span>`);
                  }
                  _push(`<!--]-->`);
                });
                _push(`<!--]-->`);
              }, _push, _parent, _scopeId);
              if (unref(isTrailing) || !!slots.trailing) {
                _push(`<span data-slot="trailing" class="${
                  ssrRenderClass(ui.value.trailing({ class: props.ui?.trailing }))
                }"${
                  _scopeId
                }>`);
                ssrRenderSlot(_ctx.$slots, "trailing", {
                  modelValue: modelValue,
                  open: open,
                  ui: ui.value
                }, () => {
                  if (unref(trailingIconName)) {
                    _push(ssrRenderComponent(_sfc_main$1, {
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
                (unref(isLeading) || !!__props.avatar || !!slots.leading)
                  ? (openBlock(), createBlock("span", {
                      key: 0,
                      "data-slot": "leading",
                      class: ui.value.leading({ class: props.ui?.leading })
                    }, [
                      renderSlot(_ctx.$slots, "leading", {
                        modelValue: modelValue,
                        open: open,
                        ui: ui.value
                      }, () => [
                        (unref(isLeading) && unref(leadingIconName))
                          ? (openBlock(), createBlock(_sfc_main$1, {
                              key: 0,
                              name: unref(leadingIconName),
                              "data-slot": "leadingIcon",
                              class: ui.value.leadingIcon({ class: props.ui?.leadingIcon })
                            }, null, 8 /* PROPS */, ["name", "class"]))
                          : (!!__props.avatar)
                            ? (openBlock(), createBlock(_sfc_main$2, mergeProps({
                                key: 1,
                                size: props.ui?.itemLeadingAvatarSize || ui.value.itemLeadingAvatarSize()
                              }, __props.avatar, {
                                "data-slot": "itemLeadingAvatar",
                                class: ui.value.itemLeadingAvatar({ class: props.ui?.itemLeadingAvatar })
                              }), null, 16 /* FULL_PROPS */, ["size", "class"]))
                            : createCommentVNode("v-if", true)
                      ])
                    ], 2 /* CLASS */))
                  : createCommentVNode("v-if", true),
                renderSlot(_ctx.$slots, "default", {
                  modelValue: modelValue,
                  open: open,
                  ui: ui.value
                }, () => [
                  (openBlock(true), createBlock(Fragment, null, renderList([displayValue(modelValue)], (displayedModelValue) => {
                    return (openBlock(), createBlock(Fragment, { key: displayedModelValue }, [
                      (displayedModelValue !== void 0 && displayedModelValue !== null)
                        ? (openBlock(), createBlock("span", {
                            key: 0,
                            "data-slot": "value",
                            class: ui.value.value({ class: props.ui?.value })
                          }, toDisplayString(displayedModelValue), 3 /* TEXT, CLASS */))
                        : (openBlock(), createBlock("span", {
                            key: 1,
                            "data-slot": "placeholder",
                            class: ui.value.placeholder({ class: props.ui?.placeholder })
                          }, toDisplayString(__props.placeholder ?? "\xA0"), 3 /* TEXT, CLASS */))
                    ], 64 /* STABLE_FRAGMENT */))
                  }), 128 /* KEYED_FRAGMENT */))
                ]),
                (unref(isTrailing) || !!slots.trailing)
                  ? (openBlock(), createBlock("span", {
                      key: 1,
                      "data-slot": "trailing",
                      class: ui.value.trailing({ class: props.ui?.trailing })
                    }, [
                      renderSlot(_ctx.$slots, "trailing", {
                        modelValue: modelValue,
                        open: open,
                        ui: ui.value
                      }, () => [
                        (unref(trailingIconName))
                          ? (openBlock(), createBlock(_sfc_main$1, {
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
          _: 2 /* DYNAMIC */
        }, _parent, _scopeId));
        _push(ssrRenderComponent(unref(SelectPortal), unref(portalProps), {
          default: withCtx((_, _push, _parent, _scopeId) => {
            if (_push) {
              _push(ssrRenderComponent(unref(SelectContent), mergeProps({
                "data-slot": "content",
                class: ui.value.content({ class: props.ui?.content })
              }, contentProps.value), {
                default: withCtx((_, _push, _parent, _scopeId) => {
                  if (_push) {
                    ssrRenderSlot(_ctx.$slots, "content-top", {}, null, _push, _parent, _scopeId);
                    _push(`<div role="presentation" data-slot="viewport" class="${
                      ssrRenderClass(ui.value.viewport({ class: props.ui?.viewport }))
                    }"${
                      _scopeId
                    }><!--[-->`);
                    ssrRenderList(groups.value, (group, groupIndex) => {
                      _push(ssrRenderComponent(unref(SelectGroup), {
                        key: `group-${groupIndex}`,
                        "data-slot": "group",
                        class: ui.value.group({ class: props.ui?.group })
                      }, {
                        default: withCtx((_, _push, _parent, _scopeId) => {
                          if (_push) {
                            _push(`<!--[-->`);
                            ssrRenderList(group, (item, index) => {
                              _push(`<!--[-->`);
                              if (isSelectItem(item) && item.type === 'label') {
                                _push(ssrRenderComponent(unref(SelectLabel), {
                                  "data-slot": "label",
                                  class: ui.value.label({ class: [props.ui?.label, item.ui?.label, item.class] })
                                }, {
                                  default: withCtx((_, _push, _parent, _scopeId) => {
                                    if (_push) {
                                      _push(`${ssrInterpolate(unref(get)(item, props.labelKey))}`);
                                    } else {
                                      return [
                                        createTextVNode(toDisplayString(unref(get)(item, props.labelKey)), 1 /* TEXT */)
                                      ]
                                    }
                                  }),
                                  _: 2 /* DYNAMIC */
                                }, _parent, _scopeId));
                              } else if (isSelectItem(item) && item.type === 'separator') {
                                _push(ssrRenderComponent(unref(SelectSeparator), {
                                  "data-slot": "separator",
                                  class: ui.value.separator({ class: [props.ui?.separator, item.ui?.separator, item.class] })
                                }, null, _parent, _scopeId));
                              } else {
                                _push(ssrRenderComponent(unref(SelectItem), {
                                  "data-slot": "item",
                                  class: ui.value.item({ class: [props.ui?.item, isSelectItem(item) && item.ui?.item, isSelectItem(item) && item.class] }),
                                  disabled: isSelectItem(item) && item.disabled,
                                  value: isSelectItem(item) ? unref(get)(item, props.valueKey) : item,
                                  onSelect: $event => (isSelectItem(item) && item.onSelect?.($event))
                                }, {
                                  default: withCtx((_, _push, _parent, _scopeId) => {
                                    if (_push) {
                                      ssrRenderSlot(_ctx.$slots, "item", {
                                        item: item,
                                        index: index,
                                        ui: ui.value
                                      }, () => {
                                        ssrRenderSlot(_ctx.$slots, "item-leading", {
                                          item: item,
                                          index: index,
                                          ui: ui.value
                                        }, () => {
                                          if (isSelectItem(item) && item.icon) {
                                            _push(ssrRenderComponent(_sfc_main$1, {
                                              name: item.icon,
                                              "data-slot": "itemLeadingIcon",
                                              class: ui.value.itemLeadingIcon({ class: [props.ui?.itemLeadingIcon, item.ui?.itemLeadingIcon] })
                                            }, null, _parent, _scopeId));
                                          } else if (isSelectItem(item) && item.avatar) {
                                            _push(ssrRenderComponent(_sfc_main$2, mergeProps({
                                              size: item.ui?.itemLeadingAvatarSize || props.ui?.itemLeadingAvatarSize || ui.value.itemLeadingAvatarSize()
                                            }, { ref_for: true }, item.avatar, {
                                              "data-slot": "itemLeadingAvatar",
                                              class: ui.value.itemLeadingAvatar({ class: [props.ui?.itemLeadingAvatar, item.ui?.itemLeadingAvatar] })
                                            }), null, _parent, _scopeId));
                                          } else if (isSelectItem(item) && item.chip) {
                                            _push(ssrRenderComponent(_sfc_main$3, mergeProps({
                                              size: item.ui?.itemLeadingChipSize || props.ui?.itemLeadingChipSize || ui.value.itemLeadingChipSize(),
                                              inset: "",
                                              standalone: ""
                                            }, { ref_for: true }, item.chip, {
                                              "data-slot": "itemLeadingChip",
                                              class: ui.value.itemLeadingChip({ class: [props.ui?.itemLeadingChip, item.ui?.itemLeadingChip] })
                                            }), null, _parent, _scopeId));
                                          } else {
                                            _push(`<!---->`);
                                          }
                                        }, _push, _parent, _scopeId);
                                        _push(`<span data-slot="itemWrapper" class="${
                                          ssrRenderClass(ui.value.itemWrapper({ class: [props.ui?.itemWrapper, isSelectItem(item) && item.ui?.itemWrapper] }))
                                        }"${
                                          _scopeId
                                        }>`);
                                        _push(ssrRenderComponent(unref(SelectItemText), {
                                          "data-slot": "itemLabel",
                                          class: ui.value.itemLabel({ class: [props.ui?.itemLabel, isSelectItem(item) && item.ui?.itemLabel] })
                                        }, {
                                          default: withCtx((_, _push, _parent, _scopeId) => {
                                            if (_push) {
                                              ssrRenderSlot(_ctx.$slots, "item-label", {
                                                item: item,
                                                index: index
                                              }, () => {
                                                _push(`${ssrInterpolate(isSelectItem(item) ? unref(get)(item, props.labelKey) : item)}`);
                                              }, _push, _parent, _scopeId);
                                            } else {
                                              return [
                                                renderSlot(_ctx.$slots, "item-label", {
                                                  item: item,
                                                  index: index
                                                }, () => [
                                                  createTextVNode(toDisplayString(isSelectItem(item) ? unref(get)(item, props.labelKey) : item), 1 /* TEXT */)
                                                ])
                                              ]
                                            }
                                          }),
                                          _: 2 /* DYNAMIC */
                                        }, _parent, _scopeId));
                                        if (isSelectItem(item) && (unref(get)(item, props.descriptionKey) || !!slots['item-description'])) {
                                          _push(`<span data-slot="itemDescription" class="${
                                            ssrRenderClass(ui.value.itemDescription({ class: [props.ui?.itemDescription, isSelectItem(item) && item.ui?.itemDescription] }))
                                          }"${
                                            _scopeId
                                          }>`);
                                          ssrRenderSlot(_ctx.$slots, "item-description", {
                                            item: item,
                                            index: index
                                          }, () => {
                                            _push(`${ssrInterpolate(unref(get)(item, props.descriptionKey))}`);
                                          }, _push, _parent, _scopeId);
                                          _push(`</span>`);
                                        } else {
                                          _push(`<!---->`);
                                        }
                                        _push(`</span><span data-slot="itemTrailing" class="${
                                          ssrRenderClass(ui.value.itemTrailing({ class: [props.ui?.itemTrailing, isSelectItem(item) && item.ui?.itemTrailing] }))
                                        }"${
                                          _scopeId
                                        }>`);
                                        ssrRenderSlot(_ctx.$slots, "item-trailing", {
                                          item: item,
                                          index: index,
                                          ui: ui.value
                                        }, null, _push, _parent, _scopeId);
                                        _push(ssrRenderComponent(unref(SelectItemIndicator), { "as-child": "" }, {
                                          default: withCtx((_, _push, _parent, _scopeId) => {
                                            if (_push) {
                                              _push(ssrRenderComponent(_sfc_main$1, {
                                                name: __props.selectedIcon || unref(appConfig).ui.icons.check,
                                                "data-slot": "itemTrailingIcon",
                                                class: ui.value.itemTrailingIcon({ class: [props.ui?.itemTrailingIcon, isSelectItem(item) && item.ui?.itemTrailingIcon] })
                                              }, null, _parent, _scopeId));
                                            } else {
                                              return [
                                                createVNode(_sfc_main$1, {
                                                  name: __props.selectedIcon || unref(appConfig).ui.icons.check,
                                                  "data-slot": "itemTrailingIcon",
                                                  class: ui.value.itemTrailingIcon({ class: [props.ui?.itemTrailingIcon, isSelectItem(item) && item.ui?.itemTrailingIcon] })
                                                }, null, 8 /* PROPS */, ["name", "class"])
                                              ]
                                            }
                                          }),
                                          _: 2 /* DYNAMIC */
                                        }, _parent, _scopeId));
                                        _push(`</span>`);
                                      }, _push, _parent, _scopeId);
                                    } else {
                                      return [
                                        renderSlot(_ctx.$slots, "item", {
                                          item: item,
                                          index: index,
                                          ui: ui.value
                                        }, () => [
                                          renderSlot(_ctx.$slots, "item-leading", {
                                            item: item,
                                            index: index,
                                            ui: ui.value
                                          }, () => [
                                            (isSelectItem(item) && item.icon)
                                              ? (openBlock(), createBlock(_sfc_main$1, {
                                                  key: 0,
                                                  name: item.icon,
                                                  "data-slot": "itemLeadingIcon",
                                                  class: ui.value.itemLeadingIcon({ class: [props.ui?.itemLeadingIcon, item.ui?.itemLeadingIcon] })
                                                }, null, 8 /* PROPS */, ["name", "class"]))
                                              : (isSelectItem(item) && item.avatar)
                                                ? (openBlock(), createBlock(_sfc_main$2, mergeProps({
                                                    key: 1,
                                                    size: item.ui?.itemLeadingAvatarSize || props.ui?.itemLeadingAvatarSize || ui.value.itemLeadingAvatarSize()
                                                  }, { ref_for: true }, item.avatar, {
                                                    "data-slot": "itemLeadingAvatar",
                                                    class: ui.value.itemLeadingAvatar({ class: [props.ui?.itemLeadingAvatar, item.ui?.itemLeadingAvatar] })
                                                  }), null, 16 /* FULL_PROPS */, ["size", "class"]))
                                                : (isSelectItem(item) && item.chip)
                                                  ? (openBlock(), createBlock(_sfc_main$3, mergeProps({
                                                      key: 2,
                                                      size: item.ui?.itemLeadingChipSize || props.ui?.itemLeadingChipSize || ui.value.itemLeadingChipSize(),
                                                      inset: "",
                                                      standalone: ""
                                                    }, { ref_for: true }, item.chip, {
                                                      "data-slot": "itemLeadingChip",
                                                      class: ui.value.itemLeadingChip({ class: [props.ui?.itemLeadingChip, item.ui?.itemLeadingChip] })
                                                    }), null, 16 /* FULL_PROPS */, ["size", "class"]))
                                                  : createCommentVNode("v-if", true)
                                          ]),
                                          createVNode("span", {
                                            "data-slot": "itemWrapper",
                                            class: ui.value.itemWrapper({ class: [props.ui?.itemWrapper, isSelectItem(item) && item.ui?.itemWrapper] })
                                          }, [
                                            createVNode(unref(SelectItemText), {
                                              "data-slot": "itemLabel",
                                              class: ui.value.itemLabel({ class: [props.ui?.itemLabel, isSelectItem(item) && item.ui?.itemLabel] })
                                            }, {
                                              default: withCtx(() => [
                                                renderSlot(_ctx.$slots, "item-label", {
                                                  item: item,
                                                  index: index
                                                }, () => [
                                                  createTextVNode(toDisplayString(isSelectItem(item) ? unref(get)(item, props.labelKey) : item), 1 /* TEXT */)
                                                ])
                                              ]),
                                              _: 2 /* DYNAMIC */
                                            }, 1032 /* PROPS, DYNAMIC_SLOTS */, ["class"]),
                                            (isSelectItem(item) && (unref(get)(item, props.descriptionKey) || !!slots['item-description']))
                                              ? (openBlock(), createBlock("span", {
                                                  key: 0,
                                                  "data-slot": "itemDescription",
                                                  class: ui.value.itemDescription({ class: [props.ui?.itemDescription, isSelectItem(item) && item.ui?.itemDescription] })
                                                }, [
                                                  renderSlot(_ctx.$slots, "item-description", {
                                                    item: item,
                                                    index: index
                                                  }, () => [
                                                    createTextVNode(toDisplayString(unref(get)(item, props.descriptionKey)), 1 /* TEXT */)
                                                  ])
                                                ], 2 /* CLASS */))
                                              : createCommentVNode("v-if", true)
                                          ], 2 /* CLASS */),
                                          createVNode("span", {
                                            "data-slot": "itemTrailing",
                                            class: ui.value.itemTrailing({ class: [props.ui?.itemTrailing, isSelectItem(item) && item.ui?.itemTrailing] })
                                          }, [
                                            renderSlot(_ctx.$slots, "item-trailing", {
                                              item: item,
                                              index: index,
                                              ui: ui.value
                                            }),
                                            createVNode(unref(SelectItemIndicator), { "as-child": "" }, {
                                              default: withCtx(() => [
                                                createVNode(_sfc_main$1, {
                                                  name: __props.selectedIcon || unref(appConfig).ui.icons.check,
                                                  "data-slot": "itemTrailingIcon",
                                                  class: ui.value.itemTrailingIcon({ class: [props.ui?.itemTrailingIcon, isSelectItem(item) && item.ui?.itemTrailingIcon] })
                                                }, null, 8 /* PROPS */, ["name", "class"])
                                              ]),
                                              _: 2 /* DYNAMIC */
                                            }, 1024 /* DYNAMIC_SLOTS */)
                                          ], 2 /* CLASS */)
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
                          } else {
                            return [
                              (openBlock(true), createBlock(Fragment, null, renderList(group, (item, index) => {
                                return (openBlock(), createBlock(Fragment, {
                                  key: `group-${groupIndex}-${index}`
                                }, [
                                  (isSelectItem(item) && item.type === 'label')
                                    ? (openBlock(), createBlock(unref(SelectLabel), {
                                        key: 0,
                                        "data-slot": "label",
                                        class: ui.value.label({ class: [props.ui?.label, item.ui?.label, item.class] })
                                      }, {
                                        default: withCtx(() => [
                                          createTextVNode(toDisplayString(unref(get)(item, props.labelKey)), 1 /* TEXT */)
                                        ]),
                                        _: 2 /* DYNAMIC */
                                      }, 1032 /* PROPS, DYNAMIC_SLOTS */, ["class"]))
                                    : (isSelectItem(item) && item.type === 'separator')
                                      ? (openBlock(), createBlock(unref(SelectSeparator), {
                                          key: 1,
                                          "data-slot": "separator",
                                          class: ui.value.separator({ class: [props.ui?.separator, item.ui?.separator, item.class] })
                                        }, null, 8 /* PROPS */, ["class"]))
                                      : (openBlock(), createBlock(unref(SelectItem), {
                                          key: 2,
                                          "data-slot": "item",
                                          class: ui.value.item({ class: [props.ui?.item, isSelectItem(item) && item.ui?.item, isSelectItem(item) && item.class] }),
                                          disabled: isSelectItem(item) && item.disabled,
                                          value: isSelectItem(item) ? unref(get)(item, props.valueKey) : item,
                                          onSelect: $event => (isSelectItem(item) && item.onSelect?.($event))
                                        }, {
                                          default: withCtx(() => [
                                            renderSlot(_ctx.$slots, "item", {
                                              item: item,
                                              index: index,
                                              ui: ui.value
                                            }, () => [
                                              renderSlot(_ctx.$slots, "item-leading", {
                                                item: item,
                                                index: index,
                                                ui: ui.value
                                              }, () => [
                                                (isSelectItem(item) && item.icon)
                                                  ? (openBlock(), createBlock(_sfc_main$1, {
                                                      key: 0,
                                                      name: item.icon,
                                                      "data-slot": "itemLeadingIcon",
                                                      class: ui.value.itemLeadingIcon({ class: [props.ui?.itemLeadingIcon, item.ui?.itemLeadingIcon] })
                                                    }, null, 8 /* PROPS */, ["name", "class"]))
                                                  : (isSelectItem(item) && item.avatar)
                                                    ? (openBlock(), createBlock(_sfc_main$2, mergeProps({
                                                        key: 1,
                                                        size: item.ui?.itemLeadingAvatarSize || props.ui?.itemLeadingAvatarSize || ui.value.itemLeadingAvatarSize()
                                                      }, { ref_for: true }, item.avatar, {
                                                        "data-slot": "itemLeadingAvatar",
                                                        class: ui.value.itemLeadingAvatar({ class: [props.ui?.itemLeadingAvatar, item.ui?.itemLeadingAvatar] })
                                                      }), null, 16 /* FULL_PROPS */, ["size", "class"]))
                                                    : (isSelectItem(item) && item.chip)
                                                      ? (openBlock(), createBlock(_sfc_main$3, mergeProps({
                                                          key: 2,
                                                          size: item.ui?.itemLeadingChipSize || props.ui?.itemLeadingChipSize || ui.value.itemLeadingChipSize(),
                                                          inset: "",
                                                          standalone: ""
                                                        }, { ref_for: true }, item.chip, {
                                                          "data-slot": "itemLeadingChip",
                                                          class: ui.value.itemLeadingChip({ class: [props.ui?.itemLeadingChip, item.ui?.itemLeadingChip] })
                                                        }), null, 16 /* FULL_PROPS */, ["size", "class"]))
                                                      : createCommentVNode("v-if", true)
                                              ]),
                                              createVNode("span", {
                                                "data-slot": "itemWrapper",
                                                class: ui.value.itemWrapper({ class: [props.ui?.itemWrapper, isSelectItem(item) && item.ui?.itemWrapper] })
                                              }, [
                                                createVNode(unref(SelectItemText), {
                                                  "data-slot": "itemLabel",
                                                  class: ui.value.itemLabel({ class: [props.ui?.itemLabel, isSelectItem(item) && item.ui?.itemLabel] })
                                                }, {
                                                  default: withCtx(() => [
                                                    renderSlot(_ctx.$slots, "item-label", {
                                                      item: item,
                                                      index: index
                                                    }, () => [
                                                      createTextVNode(toDisplayString(isSelectItem(item) ? unref(get)(item, props.labelKey) : item), 1 /* TEXT */)
                                                    ])
                                                  ]),
                                                  _: 2 /* DYNAMIC */
                                                }, 1032 /* PROPS, DYNAMIC_SLOTS */, ["class"]),
                                                (isSelectItem(item) && (unref(get)(item, props.descriptionKey) || !!slots['item-description']))
                                                  ? (openBlock(), createBlock("span", {
                                                      key: 0,
                                                      "data-slot": "itemDescription",
                                                      class: ui.value.itemDescription({ class: [props.ui?.itemDescription, isSelectItem(item) && item.ui?.itemDescription] })
                                                    }, [
                                                      renderSlot(_ctx.$slots, "item-description", {
                                                        item: item,
                                                        index: index
                                                      }, () => [
                                                        createTextVNode(toDisplayString(unref(get)(item, props.descriptionKey)), 1 /* TEXT */)
                                                      ])
                                                    ], 2 /* CLASS */))
                                                  : createCommentVNode("v-if", true)
                                              ], 2 /* CLASS */),
                                              createVNode("span", {
                                                "data-slot": "itemTrailing",
                                                class: ui.value.itemTrailing({ class: [props.ui?.itemTrailing, isSelectItem(item) && item.ui?.itemTrailing] })
                                              }, [
                                                renderSlot(_ctx.$slots, "item-trailing", {
                                                  item: item,
                                                  index: index,
                                                  ui: ui.value
                                                }),
                                                createVNode(unref(SelectItemIndicator), { "as-child": "" }, {
                                                  default: withCtx(() => [
                                                    createVNode(_sfc_main$1, {
                                                      name: __props.selectedIcon || unref(appConfig).ui.icons.check,
                                                      "data-slot": "itemTrailingIcon",
                                                      class: ui.value.itemTrailingIcon({ class: [props.ui?.itemTrailingIcon, isSelectItem(item) && item.ui?.itemTrailingIcon] })
                                                    }, null, 8 /* PROPS */, ["name", "class"])
                                                  ]),
                                                  _: 2 /* DYNAMIC */
                                                }, 1024 /* DYNAMIC_SLOTS */)
                                              ], 2 /* CLASS */)
                                            ])
                                          ]),
                                          _: 2 /* DYNAMIC */
                                        }, 1032 /* PROPS, DYNAMIC_SLOTS */, ["class", "disabled", "value", "onSelect"]))
                                ], 64 /* STABLE_FRAGMENT */))
                              }), 128 /* KEYED_FRAGMENT */))
                            ]
                          }
                        }),
                        _: 2 /* DYNAMIC */
                      }, _parent, _scopeId));
                    });
                    _push(`<!--]--></div>`);
                    ssrRenderSlot(_ctx.$slots, "content-bottom", {}, null, _push, _parent, _scopeId);
                    if (!!__props.arrow) {
                      _push(ssrRenderComponent(unref(SelectArrow), mergeProps(arrowProps.value, {
                        "data-slot": "arrow",
                        class: ui.value.arrow({ class: props.ui?.arrow })
                      }), null, _parent, _scopeId));
                    } else {
                      _push(`<!---->`);
                    }
                  } else {
                    return [
                      renderSlot(_ctx.$slots, "content-top"),
                      createVNode("div", {
                        role: "presentation",
                        "data-slot": "viewport",
                        class: ui.value.viewport({ class: props.ui?.viewport })
                      }, [
                        (openBlock(true), createBlock(Fragment, null, renderList(groups.value, (group, groupIndex) => {
                          return (openBlock(), createBlock(unref(SelectGroup), {
                            key: `group-${groupIndex}`,
                            "data-slot": "group",
                            class: ui.value.group({ class: props.ui?.group })
                          }, {
                            default: withCtx(() => [
                              (openBlock(true), createBlock(Fragment, null, renderList(group, (item, index) => {
                                return (openBlock(), createBlock(Fragment, {
                                  key: `group-${groupIndex}-${index}`
                                }, [
                                  (isSelectItem(item) && item.type === 'label')
                                    ? (openBlock(), createBlock(unref(SelectLabel), {
                                        key: 0,
                                        "data-slot": "label",
                                        class: ui.value.label({ class: [props.ui?.label, item.ui?.label, item.class] })
                                      }, {
                                        default: withCtx(() => [
                                          createTextVNode(toDisplayString(unref(get)(item, props.labelKey)), 1 /* TEXT */)
                                        ]),
                                        _: 2 /* DYNAMIC */
                                      }, 1032 /* PROPS, DYNAMIC_SLOTS */, ["class"]))
                                    : (isSelectItem(item) && item.type === 'separator')
                                      ? (openBlock(), createBlock(unref(SelectSeparator), {
                                          key: 1,
                                          "data-slot": "separator",
                                          class: ui.value.separator({ class: [props.ui?.separator, item.ui?.separator, item.class] })
                                        }, null, 8 /* PROPS */, ["class"]))
                                      : (openBlock(), createBlock(unref(SelectItem), {
                                          key: 2,
                                          "data-slot": "item",
                                          class: ui.value.item({ class: [props.ui?.item, isSelectItem(item) && item.ui?.item, isSelectItem(item) && item.class] }),
                                          disabled: isSelectItem(item) && item.disabled,
                                          value: isSelectItem(item) ? unref(get)(item, props.valueKey) : item,
                                          onSelect: $event => (isSelectItem(item) && item.onSelect?.($event))
                                        }, {
                                          default: withCtx(() => [
                                            renderSlot(_ctx.$slots, "item", {
                                              item: item,
                                              index: index,
                                              ui: ui.value
                                            }, () => [
                                              renderSlot(_ctx.$slots, "item-leading", {
                                                item: item,
                                                index: index,
                                                ui: ui.value
                                              }, () => [
                                                (isSelectItem(item) && item.icon)
                                                  ? (openBlock(), createBlock(_sfc_main$1, {
                                                      key: 0,
                                                      name: item.icon,
                                                      "data-slot": "itemLeadingIcon",
                                                      class: ui.value.itemLeadingIcon({ class: [props.ui?.itemLeadingIcon, item.ui?.itemLeadingIcon] })
                                                    }, null, 8 /* PROPS */, ["name", "class"]))
                                                  : (isSelectItem(item) && item.avatar)
                                                    ? (openBlock(), createBlock(_sfc_main$2, mergeProps({
                                                        key: 1,
                                                        size: item.ui?.itemLeadingAvatarSize || props.ui?.itemLeadingAvatarSize || ui.value.itemLeadingAvatarSize()
                                                      }, { ref_for: true }, item.avatar, {
                                                        "data-slot": "itemLeadingAvatar",
                                                        class: ui.value.itemLeadingAvatar({ class: [props.ui?.itemLeadingAvatar, item.ui?.itemLeadingAvatar] })
                                                      }), null, 16 /* FULL_PROPS */, ["size", "class"]))
                                                    : (isSelectItem(item) && item.chip)
                                                      ? (openBlock(), createBlock(_sfc_main$3, mergeProps({
                                                          key: 2,
                                                          size: item.ui?.itemLeadingChipSize || props.ui?.itemLeadingChipSize || ui.value.itemLeadingChipSize(),
                                                          inset: "",
                                                          standalone: ""
                                                        }, { ref_for: true }, item.chip, {
                                                          "data-slot": "itemLeadingChip",
                                                          class: ui.value.itemLeadingChip({ class: [props.ui?.itemLeadingChip, item.ui?.itemLeadingChip] })
                                                        }), null, 16 /* FULL_PROPS */, ["size", "class"]))
                                                      : createCommentVNode("v-if", true)
                                              ]),
                                              createVNode("span", {
                                                "data-slot": "itemWrapper",
                                                class: ui.value.itemWrapper({ class: [props.ui?.itemWrapper, isSelectItem(item) && item.ui?.itemWrapper] })
                                              }, [
                                                createVNode(unref(SelectItemText), {
                                                  "data-slot": "itemLabel",
                                                  class: ui.value.itemLabel({ class: [props.ui?.itemLabel, isSelectItem(item) && item.ui?.itemLabel] })
                                                }, {
                                                  default: withCtx(() => [
                                                    renderSlot(_ctx.$slots, "item-label", {
                                                      item: item,
                                                      index: index
                                                    }, () => [
                                                      createTextVNode(toDisplayString(isSelectItem(item) ? unref(get)(item, props.labelKey) : item), 1 /* TEXT */)
                                                    ])
                                                  ]),
                                                  _: 2 /* DYNAMIC */
                                                }, 1032 /* PROPS, DYNAMIC_SLOTS */, ["class"]),
                                                (isSelectItem(item) && (unref(get)(item, props.descriptionKey) || !!slots['item-description']))
                                                  ? (openBlock(), createBlock("span", {
                                                      key: 0,
                                                      "data-slot": "itemDescription",
                                                      class: ui.value.itemDescription({ class: [props.ui?.itemDescription, isSelectItem(item) && item.ui?.itemDescription] })
                                                    }, [
                                                      renderSlot(_ctx.$slots, "item-description", {
                                                        item: item,
                                                        index: index
                                                      }, () => [
                                                        createTextVNode(toDisplayString(unref(get)(item, props.descriptionKey)), 1 /* TEXT */)
                                                      ])
                                                    ], 2 /* CLASS */))
                                                  : createCommentVNode("v-if", true)
                                              ], 2 /* CLASS */),
                                              createVNode("span", {
                                                "data-slot": "itemTrailing",
                                                class: ui.value.itemTrailing({ class: [props.ui?.itemTrailing, isSelectItem(item) && item.ui?.itemTrailing] })
                                              }, [
                                                renderSlot(_ctx.$slots, "item-trailing", {
                                                  item: item,
                                                  index: index,
                                                  ui: ui.value
                                                }),
                                                createVNode(unref(SelectItemIndicator), { "as-child": "" }, {
                                                  default: withCtx(() => [
                                                    createVNode(_sfc_main$1, {
                                                      name: __props.selectedIcon || unref(appConfig).ui.icons.check,
                                                      "data-slot": "itemTrailingIcon",
                                                      class: ui.value.itemTrailingIcon({ class: [props.ui?.itemTrailingIcon, isSelectItem(item) && item.ui?.itemTrailingIcon] })
                                                    }, null, 8 /* PROPS */, ["name", "class"])
                                                  ]),
                                                  _: 2 /* DYNAMIC */
                                                }, 1024 /* DYNAMIC_SLOTS */)
                                              ], 2 /* CLASS */)
                                            ])
                                          ]),
                                          _: 2 /* DYNAMIC */
                                        }, 1032 /* PROPS, DYNAMIC_SLOTS */, ["class", "disabled", "value", "onSelect"]))
                                ], 64 /* STABLE_FRAGMENT */))
                              }), 128 /* KEYED_FRAGMENT */))
                            ]),
                            _: 2 /* DYNAMIC */
                          }, 1032 /* PROPS, DYNAMIC_SLOTS */, ["class"]))
                        }), 128 /* KEYED_FRAGMENT */))
                      ], 2 /* CLASS */),
                      renderSlot(_ctx.$slots, "content-bottom"),
                      (!!__props.arrow)
                        ? (openBlock(), createBlock(unref(SelectArrow), mergeProps({ key: 0 }, arrowProps.value, {
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
                createVNode(unref(SelectContent), mergeProps({
                  "data-slot": "content",
                  class: ui.value.content({ class: props.ui?.content })
                }, contentProps.value), {
                  default: withCtx(() => [
                    renderSlot(_ctx.$slots, "content-top"),
                    createVNode("div", {
                      role: "presentation",
                      "data-slot": "viewport",
                      class: ui.value.viewport({ class: props.ui?.viewport })
                    }, [
                      (openBlock(true), createBlock(Fragment, null, renderList(groups.value, (group, groupIndex) => {
                        return (openBlock(), createBlock(unref(SelectGroup), {
                          key: `group-${groupIndex}`,
                          "data-slot": "group",
                          class: ui.value.group({ class: props.ui?.group })
                        }, {
                          default: withCtx(() => [
                            (openBlock(true), createBlock(Fragment, null, renderList(group, (item, index) => {
                              return (openBlock(), createBlock(Fragment, {
                                key: `group-${groupIndex}-${index}`
                              }, [
                                (isSelectItem(item) && item.type === 'label')
                                  ? (openBlock(), createBlock(unref(SelectLabel), {
                                      key: 0,
                                      "data-slot": "label",
                                      class: ui.value.label({ class: [props.ui?.label, item.ui?.label, item.class] })
                                    }, {
                                      default: withCtx(() => [
                                        createTextVNode(toDisplayString(unref(get)(item, props.labelKey)), 1 /* TEXT */)
                                      ]),
                                      _: 2 /* DYNAMIC */
                                    }, 1032 /* PROPS, DYNAMIC_SLOTS */, ["class"]))
                                  : (isSelectItem(item) && item.type === 'separator')
                                    ? (openBlock(), createBlock(unref(SelectSeparator), {
                                        key: 1,
                                        "data-slot": "separator",
                                        class: ui.value.separator({ class: [props.ui?.separator, item.ui?.separator, item.class] })
                                      }, null, 8 /* PROPS */, ["class"]))
                                    : (openBlock(), createBlock(unref(SelectItem), {
                                        key: 2,
                                        "data-slot": "item",
                                        class: ui.value.item({ class: [props.ui?.item, isSelectItem(item) && item.ui?.item, isSelectItem(item) && item.class] }),
                                        disabled: isSelectItem(item) && item.disabled,
                                        value: isSelectItem(item) ? unref(get)(item, props.valueKey) : item,
                                        onSelect: $event => (isSelectItem(item) && item.onSelect?.($event))
                                      }, {
                                        default: withCtx(() => [
                                          renderSlot(_ctx.$slots, "item", {
                                            item: item,
                                            index: index,
                                            ui: ui.value
                                          }, () => [
                                            renderSlot(_ctx.$slots, "item-leading", {
                                              item: item,
                                              index: index,
                                              ui: ui.value
                                            }, () => [
                                              (isSelectItem(item) && item.icon)
                                                ? (openBlock(), createBlock(_sfc_main$1, {
                                                    key: 0,
                                                    name: item.icon,
                                                    "data-slot": "itemLeadingIcon",
                                                    class: ui.value.itemLeadingIcon({ class: [props.ui?.itemLeadingIcon, item.ui?.itemLeadingIcon] })
                                                  }, null, 8 /* PROPS */, ["name", "class"]))
                                                : (isSelectItem(item) && item.avatar)
                                                  ? (openBlock(), createBlock(_sfc_main$2, mergeProps({
                                                      key: 1,
                                                      size: item.ui?.itemLeadingAvatarSize || props.ui?.itemLeadingAvatarSize || ui.value.itemLeadingAvatarSize()
                                                    }, { ref_for: true }, item.avatar, {
                                                      "data-slot": "itemLeadingAvatar",
                                                      class: ui.value.itemLeadingAvatar({ class: [props.ui?.itemLeadingAvatar, item.ui?.itemLeadingAvatar] })
                                                    }), null, 16 /* FULL_PROPS */, ["size", "class"]))
                                                  : (isSelectItem(item) && item.chip)
                                                    ? (openBlock(), createBlock(_sfc_main$3, mergeProps({
                                                        key: 2,
                                                        size: item.ui?.itemLeadingChipSize || props.ui?.itemLeadingChipSize || ui.value.itemLeadingChipSize(),
                                                        inset: "",
                                                        standalone: ""
                                                      }, { ref_for: true }, item.chip, {
                                                        "data-slot": "itemLeadingChip",
                                                        class: ui.value.itemLeadingChip({ class: [props.ui?.itemLeadingChip, item.ui?.itemLeadingChip] })
                                                      }), null, 16 /* FULL_PROPS */, ["size", "class"]))
                                                    : createCommentVNode("v-if", true)
                                            ]),
                                            createVNode("span", {
                                              "data-slot": "itemWrapper",
                                              class: ui.value.itemWrapper({ class: [props.ui?.itemWrapper, isSelectItem(item) && item.ui?.itemWrapper] })
                                            }, [
                                              createVNode(unref(SelectItemText), {
                                                "data-slot": "itemLabel",
                                                class: ui.value.itemLabel({ class: [props.ui?.itemLabel, isSelectItem(item) && item.ui?.itemLabel] })
                                              }, {
                                                default: withCtx(() => [
                                                  renderSlot(_ctx.$slots, "item-label", {
                                                    item: item,
                                                    index: index
                                                  }, () => [
                                                    createTextVNode(toDisplayString(isSelectItem(item) ? unref(get)(item, props.labelKey) : item), 1 /* TEXT */)
                                                  ])
                                                ]),
                                                _: 2 /* DYNAMIC */
                                              }, 1032 /* PROPS, DYNAMIC_SLOTS */, ["class"]),
                                              (isSelectItem(item) && (unref(get)(item, props.descriptionKey) || !!slots['item-description']))
                                                ? (openBlock(), createBlock("span", {
                                                    key: 0,
                                                    "data-slot": "itemDescription",
                                                    class: ui.value.itemDescription({ class: [props.ui?.itemDescription, isSelectItem(item) && item.ui?.itemDescription] })
                                                  }, [
                                                    renderSlot(_ctx.$slots, "item-description", {
                                                      item: item,
                                                      index: index
                                                    }, () => [
                                                      createTextVNode(toDisplayString(unref(get)(item, props.descriptionKey)), 1 /* TEXT */)
                                                    ])
                                                  ], 2 /* CLASS */))
                                                : createCommentVNode("v-if", true)
                                            ], 2 /* CLASS */),
                                            createVNode("span", {
                                              "data-slot": "itemTrailing",
                                              class: ui.value.itemTrailing({ class: [props.ui?.itemTrailing, isSelectItem(item) && item.ui?.itemTrailing] })
                                            }, [
                                              renderSlot(_ctx.$slots, "item-trailing", {
                                                item: item,
                                                index: index,
                                                ui: ui.value
                                              }),
                                              createVNode(unref(SelectItemIndicator), { "as-child": "" }, {
                                                default: withCtx(() => [
                                                  createVNode(_sfc_main$1, {
                                                    name: __props.selectedIcon || unref(appConfig).ui.icons.check,
                                                    "data-slot": "itemTrailingIcon",
                                                    class: ui.value.itemTrailingIcon({ class: [props.ui?.itemTrailingIcon, isSelectItem(item) && item.ui?.itemTrailingIcon] })
                                                  }, null, 8 /* PROPS */, ["name", "class"])
                                                ]),
                                                _: 2 /* DYNAMIC */
                                              }, 1024 /* DYNAMIC_SLOTS */)
                                            ], 2 /* CLASS */)
                                          ])
                                        ]),
                                        _: 2 /* DYNAMIC */
                                      }, 1032 /* PROPS, DYNAMIC_SLOTS */, ["class", "disabled", "value", "onSelect"]))
                              ], 64 /* STABLE_FRAGMENT */))
                            }), 128 /* KEYED_FRAGMENT */))
                          ]),
                          _: 2 /* DYNAMIC */
                        }, 1032 /* PROPS, DYNAMIC_SLOTS */, ["class"]))
                      }), 128 /* KEYED_FRAGMENT */))
                    ], 2 /* CLASS */),
                    renderSlot(_ctx.$slots, "content-bottom"),
                    (!!__props.arrow)
                      ? (openBlock(), createBlock(unref(SelectArrow), mergeProps({ key: 0 }, arrowProps.value, {
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
          createVNode(unref(SelectTrigger), mergeProps({
            id: unref(id),
            ref_key: "triggerRef",
            ref: triggerRef,
            "data-slot": "base",
            class: ui.value.base({ class: [props.ui?.base, props.class] })
          }, { ..._ctx.$attrs, ...unref(ariaAttrs) }), {
            default: withCtx(() => [
              (unref(isLeading) || !!__props.avatar || !!slots.leading)
                ? (openBlock(), createBlock("span", {
                    key: 0,
                    "data-slot": "leading",
                    class: ui.value.leading({ class: props.ui?.leading })
                  }, [
                    renderSlot(_ctx.$slots, "leading", {
                      modelValue: modelValue,
                      open: open,
                      ui: ui.value
                    }, () => [
                      (unref(isLeading) && unref(leadingIconName))
                        ? (openBlock(), createBlock(_sfc_main$1, {
                            key: 0,
                            name: unref(leadingIconName),
                            "data-slot": "leadingIcon",
                            class: ui.value.leadingIcon({ class: props.ui?.leadingIcon })
                          }, null, 8 /* PROPS */, ["name", "class"]))
                        : (!!__props.avatar)
                          ? (openBlock(), createBlock(_sfc_main$2, mergeProps({
                              key: 1,
                              size: props.ui?.itemLeadingAvatarSize || ui.value.itemLeadingAvatarSize()
                            }, __props.avatar, {
                              "data-slot": "itemLeadingAvatar",
                              class: ui.value.itemLeadingAvatar({ class: props.ui?.itemLeadingAvatar })
                            }), null, 16 /* FULL_PROPS */, ["size", "class"]))
                          : createCommentVNode("v-if", true)
                    ])
                  ], 2 /* CLASS */))
                : createCommentVNode("v-if", true),
              renderSlot(_ctx.$slots, "default", {
                modelValue: modelValue,
                open: open,
                ui: ui.value
              }, () => [
                (openBlock(true), createBlock(Fragment, null, renderList([displayValue(modelValue)], (displayedModelValue) => {
                  return (openBlock(), createBlock(Fragment, { key: displayedModelValue }, [
                    (displayedModelValue !== void 0 && displayedModelValue !== null)
                      ? (openBlock(), createBlock("span", {
                          key: 0,
                          "data-slot": "value",
                          class: ui.value.value({ class: props.ui?.value })
                        }, toDisplayString(displayedModelValue), 3 /* TEXT, CLASS */))
                      : (openBlock(), createBlock("span", {
                          key: 1,
                          "data-slot": "placeholder",
                          class: ui.value.placeholder({ class: props.ui?.placeholder })
                        }, toDisplayString(__props.placeholder ?? "\xA0"), 3 /* TEXT, CLASS */))
                  ], 64 /* STABLE_FRAGMENT */))
                }), 128 /* KEYED_FRAGMENT */))
              ]),
              (unref(isTrailing) || !!slots.trailing)
                ? (openBlock(), createBlock("span", {
                    key: 1,
                    "data-slot": "trailing",
                    class: ui.value.trailing({ class: props.ui?.trailing })
                  }, [
                    renderSlot(_ctx.$slots, "trailing", {
                      modelValue: modelValue,
                      open: open,
                      ui: ui.value
                    }, () => [
                      (unref(trailingIconName))
                        ? (openBlock(), createBlock(_sfc_main$1, {
                            key: 0,
                            name: unref(trailingIconName),
                            "data-slot": "trailingIcon",
                            class: ui.value.trailingIcon({ class: props.ui?.trailingIcon })
                          }, null, 8 /* PROPS */, ["name", "class"]))
                        : createCommentVNode("v-if", true)
                    ])
                  ], 2 /* CLASS */))
                : createCommentVNode("v-if", true)
            ]),
            _: 2 /* DYNAMIC */
          }, 1040 /* FULL_PROPS, DYNAMIC_SLOTS */, ["id", "class"]),
          createVNode(unref(SelectPortal), unref(portalProps), {
            default: withCtx(() => [
              createVNode(unref(SelectContent), mergeProps({
                "data-slot": "content",
                class: ui.value.content({ class: props.ui?.content })
              }, contentProps.value), {
                default: withCtx(() => [
                  renderSlot(_ctx.$slots, "content-top"),
                  createVNode("div", {
                    role: "presentation",
                    "data-slot": "viewport",
                    class: ui.value.viewport({ class: props.ui?.viewport })
                  }, [
                    (openBlock(true), createBlock(Fragment, null, renderList(groups.value, (group, groupIndex) => {
                      return (openBlock(), createBlock(unref(SelectGroup), {
                        key: `group-${groupIndex}`,
                        "data-slot": "group",
                        class: ui.value.group({ class: props.ui?.group })
                      }, {
                        default: withCtx(() => [
                          (openBlock(true), createBlock(Fragment, null, renderList(group, (item, index) => {
                            return (openBlock(), createBlock(Fragment, {
                              key: `group-${groupIndex}-${index}`
                            }, [
                              (isSelectItem(item) && item.type === 'label')
                                ? (openBlock(), createBlock(unref(SelectLabel), {
                                    key: 0,
                                    "data-slot": "label",
                                    class: ui.value.label({ class: [props.ui?.label, item.ui?.label, item.class] })
                                  }, {
                                    default: withCtx(() => [
                                      createTextVNode(toDisplayString(unref(get)(item, props.labelKey)), 1 /* TEXT */)
                                    ]),
                                    _: 2 /* DYNAMIC */
                                  }, 1032 /* PROPS, DYNAMIC_SLOTS */, ["class"]))
                                : (isSelectItem(item) && item.type === 'separator')
                                  ? (openBlock(), createBlock(unref(SelectSeparator), {
                                      key: 1,
                                      "data-slot": "separator",
                                      class: ui.value.separator({ class: [props.ui?.separator, item.ui?.separator, item.class] })
                                    }, null, 8 /* PROPS */, ["class"]))
                                  : (openBlock(), createBlock(unref(SelectItem), {
                                      key: 2,
                                      "data-slot": "item",
                                      class: ui.value.item({ class: [props.ui?.item, isSelectItem(item) && item.ui?.item, isSelectItem(item) && item.class] }),
                                      disabled: isSelectItem(item) && item.disabled,
                                      value: isSelectItem(item) ? unref(get)(item, props.valueKey) : item,
                                      onSelect: $event => (isSelectItem(item) && item.onSelect?.($event))
                                    }, {
                                      default: withCtx(() => [
                                        renderSlot(_ctx.$slots, "item", {
                                          item: item,
                                          index: index,
                                          ui: ui.value
                                        }, () => [
                                          renderSlot(_ctx.$slots, "item-leading", {
                                            item: item,
                                            index: index,
                                            ui: ui.value
                                          }, () => [
                                            (isSelectItem(item) && item.icon)
                                              ? (openBlock(), createBlock(_sfc_main$1, {
                                                  key: 0,
                                                  name: item.icon,
                                                  "data-slot": "itemLeadingIcon",
                                                  class: ui.value.itemLeadingIcon({ class: [props.ui?.itemLeadingIcon, item.ui?.itemLeadingIcon] })
                                                }, null, 8 /* PROPS */, ["name", "class"]))
                                              : (isSelectItem(item) && item.avatar)
                                                ? (openBlock(), createBlock(_sfc_main$2, mergeProps({
                                                    key: 1,
                                                    size: item.ui?.itemLeadingAvatarSize || props.ui?.itemLeadingAvatarSize || ui.value.itemLeadingAvatarSize()
                                                  }, { ref_for: true }, item.avatar, {
                                                    "data-slot": "itemLeadingAvatar",
                                                    class: ui.value.itemLeadingAvatar({ class: [props.ui?.itemLeadingAvatar, item.ui?.itemLeadingAvatar] })
                                                  }), null, 16 /* FULL_PROPS */, ["size", "class"]))
                                                : (isSelectItem(item) && item.chip)
                                                  ? (openBlock(), createBlock(_sfc_main$3, mergeProps({
                                                      key: 2,
                                                      size: item.ui?.itemLeadingChipSize || props.ui?.itemLeadingChipSize || ui.value.itemLeadingChipSize(),
                                                      inset: "",
                                                      standalone: ""
                                                    }, { ref_for: true }, item.chip, {
                                                      "data-slot": "itemLeadingChip",
                                                      class: ui.value.itemLeadingChip({ class: [props.ui?.itemLeadingChip, item.ui?.itemLeadingChip] })
                                                    }), null, 16 /* FULL_PROPS */, ["size", "class"]))
                                                  : createCommentVNode("v-if", true)
                                          ]),
                                          createVNode("span", {
                                            "data-slot": "itemWrapper",
                                            class: ui.value.itemWrapper({ class: [props.ui?.itemWrapper, isSelectItem(item) && item.ui?.itemWrapper] })
                                          }, [
                                            createVNode(unref(SelectItemText), {
                                              "data-slot": "itemLabel",
                                              class: ui.value.itemLabel({ class: [props.ui?.itemLabel, isSelectItem(item) && item.ui?.itemLabel] })
                                            }, {
                                              default: withCtx(() => [
                                                renderSlot(_ctx.$slots, "item-label", {
                                                  item: item,
                                                  index: index
                                                }, () => [
                                                  createTextVNode(toDisplayString(isSelectItem(item) ? unref(get)(item, props.labelKey) : item), 1 /* TEXT */)
                                                ])
                                              ]),
                                              _: 2 /* DYNAMIC */
                                            }, 1032 /* PROPS, DYNAMIC_SLOTS */, ["class"]),
                                            (isSelectItem(item) && (unref(get)(item, props.descriptionKey) || !!slots['item-description']))
                                              ? (openBlock(), createBlock("span", {
                                                  key: 0,
                                                  "data-slot": "itemDescription",
                                                  class: ui.value.itemDescription({ class: [props.ui?.itemDescription, isSelectItem(item) && item.ui?.itemDescription] })
                                                }, [
                                                  renderSlot(_ctx.$slots, "item-description", {
                                                    item: item,
                                                    index: index
                                                  }, () => [
                                                    createTextVNode(toDisplayString(unref(get)(item, props.descriptionKey)), 1 /* TEXT */)
                                                  ])
                                                ], 2 /* CLASS */))
                                              : createCommentVNode("v-if", true)
                                          ], 2 /* CLASS */),
                                          createVNode("span", {
                                            "data-slot": "itemTrailing",
                                            class: ui.value.itemTrailing({ class: [props.ui?.itemTrailing, isSelectItem(item) && item.ui?.itemTrailing] })
                                          }, [
                                            renderSlot(_ctx.$slots, "item-trailing", {
                                              item: item,
                                              index: index,
                                              ui: ui.value
                                            }),
                                            createVNode(unref(SelectItemIndicator), { "as-child": "" }, {
                                              default: withCtx(() => [
                                                createVNode(_sfc_main$1, {
                                                  name: __props.selectedIcon || unref(appConfig).ui.icons.check,
                                                  "data-slot": "itemTrailingIcon",
                                                  class: ui.value.itemTrailingIcon({ class: [props.ui?.itemTrailingIcon, isSelectItem(item) && item.ui?.itemTrailingIcon] })
                                                }, null, 8 /* PROPS */, ["name", "class"])
                                              ]),
                                              _: 2 /* DYNAMIC */
                                            }, 1024 /* DYNAMIC_SLOTS */)
                                          ], 2 /* CLASS */)
                                        ])
                                      ]),
                                      _: 2 /* DYNAMIC */
                                    }, 1032 /* PROPS, DYNAMIC_SLOTS */, ["class", "disabled", "value", "onSelect"]))
                            ], 64 /* STABLE_FRAGMENT */))
                          }), 128 /* KEYED_FRAGMENT */))
                        ]),
                        _: 2 /* DYNAMIC */
                      }, 1032 /* PROPS, DYNAMIC_SLOTS */, ["class"]))
                    }), 128 /* KEYED_FRAGMENT */))
                  ], 2 /* CLASS */),
                  renderSlot(_ctx.$slots, "content-bottom"),
                  (!!__props.arrow)
                    ? (openBlock(), createBlock(unref(SelectArrow), mergeProps({ key: 0 }, arrowProps.value, {
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

});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext()
  ;(ssrContext.modules || (ssrContext.modules = new Set())).add("node_modules/@nuxt/ui/dist/runtime/components/Select.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : undefined
};

export { _sfc_main as _ };
