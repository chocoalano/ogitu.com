import { useSlots, toRef, computed, unref, withCtx, mergeProps, createVNode, renderSlot, createBlock, createCommentVNode, openBlock, createTextVNode, toDisplayString, Fragment, renderList, resolveDynamicComponent, createSlots, useSSRContext } from 'vue';
import { ssrRenderComponent, ssrRenderSlot, ssrRenderClass, ssrInterpolate, ssrRenderList, ssrRenderVNode } from 'vue/server-renderer';
import { defu } from 'defu';
import { useForwardPropsEmits, DropdownMenuRoot, DropdownMenuTrigger, DropdownMenuArrow } from 'reka-ui';
import { reactiveOmit, createReusableTemplate, reactivePick } from '@vueuse/core';
import { d as useLocale, a as useAppConfig, i as isArrayOfArray, g as get, o as omit } from './virtual_nuxt-ui-plugins-CrG8Uaxr.js';
import { _ as _sfc_main$2, b as _sfc_main$3, n as _sfc_main$5, p as pickLinkProps, o as _sfc_main$6, t as tv } from './Button-BTdvmZ8N.js';
import { DropdownMenu } from 'reka-ui/namespaced';
import { g as usePortal, h as _sfc_main$4 } from './Badge-CQlYH3Fo.js';

const _sfc_main$1 = {
  __name: 'DropdownMenuContent',
  __ssrInlineRender: true,
  props: {
  items: { type: null, required: false },
  portal: { type: [Boolean, String], required: false, skipCheck: true },
  sub: { type: Boolean, required: false },
  labelKey: { type: null, required: true },
  descriptionKey: { type: null, required: true },
  checkedIcon: { type: null, required: false },
  loadingIcon: { type: null, required: false },
  externalIcon: { type: [Boolean, String], required: false, skipCheck: true },
  class: { type: null, required: false },
  ui: { type: null, required: true },
  uiOverride: { type: null, required: false },
  loop: { type: Boolean, required: false },
  side: { type: null, required: false },
  sideOffset: { type: Number, required: false },
  sideFlip: { type: Boolean, required: false },
  align: { type: null, required: false },
  alignOffset: { type: Number, required: false },
  alignFlip: { type: Boolean, required: false },
  avoidCollisions: { type: Boolean, required: false },
  collisionBoundary: { type: null, required: false },
  collisionPadding: { type: [Number, Object], required: false },
  arrowPadding: { type: Number, required: false },
  sticky: { type: String, required: false },
  hideWhenDetached: { type: Boolean, required: false },
  positionStrategy: { type: String, required: false },
  updatePositionStrategy: { type: String, required: false },
  disableUpdateOnLayoutShift: { type: Boolean, required: false },
  prioritizePosition: { type: Boolean, required: false },
  reference: { type: null, required: false }
},
  emits: ["escapeKeyDown", "pointerDownOutside", "focusOutside", "interactOutside", "closeAutoFocus"],
  setup(__props, { emit: __emit }) {

const props = __props;
const emits = __emit;
const slots = useSlots();
const { dir } = useLocale();
const appConfig = useAppConfig();
const portalProps = usePortal(toRef(() => props.portal));
const contentProps = useForwardPropsEmits(reactiveOmit(props, "sub", "items", "portal", "labelKey", "descriptionKey", "checkedIcon", "loadingIcon", "externalIcon", "class", "ui", "uiOverride"), emits);
const getProxySlots = () => omit(slots, ["default"]);
const [DefineItemTemplate, ReuseItemTemplate] = createReusableTemplate();
const childrenIcon = computed(() => dir.value === "rtl" ? appConfig.ui.icons.chevronLeft : appConfig.ui.icons.chevronRight);
const groups = computed(
  () => props.items?.length ? isArrayOfArray(props.items) ? props.items : [props.items] : []
);

return (_ctx, _push, _parent, _attrs) => {
  _push(`<!--[-->`);
  _push(ssrRenderComponent(unref(DefineItemTemplate), null, {
    default: withCtx(({ item, active, index }, _push, _parent, _scopeId) => {
      if (_push) {
        ssrRenderSlot(_ctx.$slots, item.slot || 'item', {
          item: item,
          index: index,
          ui: __props.ui
        }, () => {
          ssrRenderSlot(_ctx.$slots, item.slot ? `${item.slot}-leading` : 'item-leading', {
            item: item,
            active: active,
            index: index,
            ui: __props.ui
          }, () => {
            if (item.loading) {
              _push(ssrRenderComponent(_sfc_main$2, {
                name: __props.loadingIcon || unref(appConfig).ui.icons.loading,
                "data-slot": "itemLeadingIcon",
                class: __props.ui.itemLeadingIcon({ class: [__props.uiOverride?.itemLeadingIcon, item.ui?.itemLeadingIcon], color: item?.color, loading: true })
              }, null, _parent, _scopeId));
            } else if (item.icon) {
              _push(ssrRenderComponent(_sfc_main$2, {
                name: item.icon,
                "data-slot": "itemLeadingIcon",
                class: __props.ui.itemLeadingIcon({ class: [__props.uiOverride?.itemLeadingIcon, item.ui?.itemLeadingIcon], color: item?.color, active })
              }, null, _parent, _scopeId));
            } else if (item.avatar) {
              _push(ssrRenderComponent(_sfc_main$3, mergeProps({
                size: item.ui?.itemLeadingAvatarSize || __props.uiOverride?.itemLeadingAvatarSize || __props.ui.itemLeadingAvatarSize()
              }, item.avatar, {
                "data-slot": "itemLeadingAvatar",
                class: __props.ui.itemLeadingAvatar({ class: [__props.uiOverride?.itemLeadingAvatar, item.ui?.itemLeadingAvatar], active })
              }), null, _parent, _scopeId));
            } else {
              _push(`<!---->`);
            }
          }, _push, _parent, _scopeId);
          if (unref(get)(item, props.labelKey) || !!slots[item.slot ? `${item.slot}-label` : 'item-label'] || (unref(get)(item, props.descriptionKey) || !!slots[item.slot ? `${item.slot}-description` : 'item-description'])) {
            _push(`<span data-slot="itemWrapper" class="${
              ssrRenderClass(__props.ui.itemWrapper({ class: [__props.uiOverride?.itemWrapper, item.ui?.itemWrapper] }))
            }"${
              _scopeId
            }><span data-slot="itemLabel" class="${
              ssrRenderClass(__props.ui.itemLabel({ class: [__props.uiOverride?.itemLabel, item.ui?.itemLabel], active }))
            }"${
              _scopeId
            }>`);
            ssrRenderSlot(_ctx.$slots, item.slot ? `${item.slot}-label` : 'item-label', {
              item: item,
              active: active,
              index: index
            }, () => {
              _push(`${ssrInterpolate(unref(get)(item, props.labelKey))}`);
            }, _push, _parent, _scopeId);
            if (item.target === '_blank' && __props.externalIcon !== false) {
              _push(ssrRenderComponent(_sfc_main$2, {
                name: typeof __props.externalIcon === 'string' ? __props.externalIcon : unref(appConfig).ui.icons.external,
                "data-slot": "itemLabelExternalIcon",
                class: __props.ui.itemLabelExternalIcon({ class: [__props.uiOverride?.itemLabelExternalIcon, item.ui?.itemLabelExternalIcon], color: item?.color, active })
              }, null, _parent, _scopeId));
            } else {
              _push(`<!---->`);
            }
            _push(`</span>`);
            if (unref(get)(item, props.descriptionKey)) {
              _push(`<span data-slot="itemDescription" class="${
                ssrRenderClass(__props.ui.itemDescription({ class: [__props.uiOverride?.itemDescription, item.ui?.itemDescription] }))
              }"${
                _scopeId
              }>`);
              ssrRenderSlot(_ctx.$slots, item.slot ? `${item.slot}-description` : 'item-description', {
                item: item,
                active: active,
                index: index
              }, () => {
                _push(`${ssrInterpolate(unref(get)(item, props.descriptionKey))}`);
              }, _push, _parent, _scopeId);
              _push(`</span>`);
            } else {
              _push(`<!---->`);
            }
            _push(`</span>`);
          } else {
            _push(`<!---->`);
          }
          _push(`<span data-slot="itemTrailing" class="${
            ssrRenderClass(__props.ui.itemTrailing({ class: [__props.uiOverride?.itemTrailing, item.ui?.itemTrailing] }))
          }"${
            _scopeId
          }>`);
          ssrRenderSlot(_ctx.$slots, item.slot ? `${item.slot}-trailing` : 'item-trailing', {
            item: item,
            active: active,
            index: index,
            ui: __props.ui
          }, () => {
            if (item.children?.length) {
              _push(ssrRenderComponent(_sfc_main$2, {
                name: childrenIcon.value,
                "data-slot": "itemTrailingIcon",
                class: __props.ui.itemTrailingIcon({ class: [__props.uiOverride?.itemTrailingIcon, item.ui?.itemTrailingIcon], color: item?.color, active })
              }, null, _parent, _scopeId));
            } else if (item.kbds?.length) {
              _push(`<span data-slot="itemTrailingKbds" class="${
                ssrRenderClass(__props.ui.itemTrailingKbds({ class: [__props.uiOverride?.itemTrailingKbds, item.ui?.itemTrailingKbds] }))
              }"${
                _scopeId
              }><!--[-->`);
              ssrRenderList(item.kbds, (kbd, kbdIndex) => {
                _push(ssrRenderComponent(_sfc_main$4, mergeProps({
                  key: kbdIndex,
                  size: item.ui?.itemTrailingKbdsSize || __props.uiOverride?.itemTrailingKbdsSize || __props.ui.itemTrailingKbdsSize()
                }, { ref_for: true }, typeof kbd === 'string' ? { value: kbd } : kbd), null, _parent, _scopeId));
              });
              _push(`<!--]--></span>`);
            } else {
              _push(`<!---->`);
            }
          }, _push, _parent, _scopeId);
          _push(ssrRenderComponent(unref(DropdownMenu).ItemIndicator, { "as-child": "" }, {
            default: withCtx((_, _push, _parent, _scopeId) => {
              if (_push) {
                _push(ssrRenderComponent(_sfc_main$2, {
                  name: __props.checkedIcon || unref(appConfig).ui.icons.check,
                  "data-slot": "itemTrailingIcon",
                  class: __props.ui.itemTrailingIcon({ class: [__props.uiOverride?.itemTrailingIcon, item.ui?.itemTrailingIcon], color: item?.color })
                }, null, _parent, _scopeId));
              } else {
                return [
                  createVNode(_sfc_main$2, {
                    name: __props.checkedIcon || unref(appConfig).ui.icons.check,
                    "data-slot": "itemTrailingIcon",
                    class: __props.ui.itemTrailingIcon({ class: [__props.uiOverride?.itemTrailingIcon, item.ui?.itemTrailingIcon], color: item?.color })
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
          renderSlot(_ctx.$slots, item.slot || 'item', {
            item: item,
            index: index,
            ui: __props.ui
          }, () => [
            renderSlot(_ctx.$slots, item.slot ? `${item.slot}-leading` : 'item-leading', {
              item: item,
              active: active,
              index: index,
              ui: __props.ui
            }, () => [
              (item.loading)
                ? (openBlock(), createBlock(_sfc_main$2, {
                    key: 0,
                    name: __props.loadingIcon || unref(appConfig).ui.icons.loading,
                    "data-slot": "itemLeadingIcon",
                    class: __props.ui.itemLeadingIcon({ class: [__props.uiOverride?.itemLeadingIcon, item.ui?.itemLeadingIcon], color: item?.color, loading: true })
                  }, null, 8 /* PROPS */, ["name", "class"]))
                : (item.icon)
                  ? (openBlock(), createBlock(_sfc_main$2, {
                      key: 1,
                      name: item.icon,
                      "data-slot": "itemLeadingIcon",
                      class: __props.ui.itemLeadingIcon({ class: [__props.uiOverride?.itemLeadingIcon, item.ui?.itemLeadingIcon], color: item?.color, active })
                    }, null, 8 /* PROPS */, ["name", "class"]))
                  : (item.avatar)
                    ? (openBlock(), createBlock(_sfc_main$3, mergeProps({
                        key: 2,
                        size: item.ui?.itemLeadingAvatarSize || __props.uiOverride?.itemLeadingAvatarSize || __props.ui.itemLeadingAvatarSize()
                      }, item.avatar, {
                        "data-slot": "itemLeadingAvatar",
                        class: __props.ui.itemLeadingAvatar({ class: [__props.uiOverride?.itemLeadingAvatar, item.ui?.itemLeadingAvatar], active })
                      }), null, 16 /* FULL_PROPS */, ["size", "class"]))
                    : createCommentVNode("v-if", true)
            ]),
            (unref(get)(item, props.labelKey) || !!slots[item.slot ? `${item.slot}-label` : 'item-label'] || (unref(get)(item, props.descriptionKey) || !!slots[item.slot ? `${item.slot}-description` : 'item-description']))
              ? (openBlock(), createBlock("span", {
                  key: 0,
                  "data-slot": "itemWrapper",
                  class: __props.ui.itemWrapper({ class: [__props.uiOverride?.itemWrapper, item.ui?.itemWrapper] })
                }, [
                  createVNode("span", {
                    "data-slot": "itemLabel",
                    class: __props.ui.itemLabel({ class: [__props.uiOverride?.itemLabel, item.ui?.itemLabel], active })
                  }, [
                    renderSlot(_ctx.$slots, item.slot ? `${item.slot}-label` : 'item-label', {
                      item: item,
                      active: active,
                      index: index
                    }, () => [
                      createTextVNode(toDisplayString(unref(get)(item, props.labelKey)), 1 /* TEXT */)
                    ]),
                    (item.target === '_blank' && __props.externalIcon !== false)
                      ? (openBlock(), createBlock(_sfc_main$2, {
                          key: 0,
                          name: typeof __props.externalIcon === 'string' ? __props.externalIcon : unref(appConfig).ui.icons.external,
                          "data-slot": "itemLabelExternalIcon",
                          class: __props.ui.itemLabelExternalIcon({ class: [__props.uiOverride?.itemLabelExternalIcon, item.ui?.itemLabelExternalIcon], color: item?.color, active })
                        }, null, 8 /* PROPS */, ["name", "class"]))
                      : createCommentVNode("v-if", true)
                  ], 2 /* CLASS */),
                  (unref(get)(item, props.descriptionKey))
                    ? (openBlock(), createBlock("span", {
                        key: 0,
                        "data-slot": "itemDescription",
                        class: __props.ui.itemDescription({ class: [__props.uiOverride?.itemDescription, item.ui?.itemDescription] })
                      }, [
                        renderSlot(_ctx.$slots, item.slot ? `${item.slot}-description` : 'item-description', {
                          item: item,
                          active: active,
                          index: index
                        }, () => [
                          createTextVNode(toDisplayString(unref(get)(item, props.descriptionKey)), 1 /* TEXT */)
                        ])
                      ], 2 /* CLASS */))
                    : createCommentVNode("v-if", true)
                ], 2 /* CLASS */))
              : createCommentVNode("v-if", true),
            createVNode("span", {
              "data-slot": "itemTrailing",
              class: __props.ui.itemTrailing({ class: [__props.uiOverride?.itemTrailing, item.ui?.itemTrailing] })
            }, [
              renderSlot(_ctx.$slots, item.slot ? `${item.slot}-trailing` : 'item-trailing', {
                item: item,
                active: active,
                index: index,
                ui: __props.ui
              }, () => [
                (item.children?.length)
                  ? (openBlock(), createBlock(_sfc_main$2, {
                      key: 0,
                      name: childrenIcon.value,
                      "data-slot": "itemTrailingIcon",
                      class: __props.ui.itemTrailingIcon({ class: [__props.uiOverride?.itemTrailingIcon, item.ui?.itemTrailingIcon], color: item?.color, active })
                    }, null, 8 /* PROPS */, ["name", "class"]))
                  : (item.kbds?.length)
                    ? (openBlock(), createBlock("span", {
                        key: 1,
                        "data-slot": "itemTrailingKbds",
                        class: __props.ui.itemTrailingKbds({ class: [__props.uiOverride?.itemTrailingKbds, item.ui?.itemTrailingKbds] })
                      }, [
                        (openBlock(true), createBlock(Fragment, null, renderList(item.kbds, (kbd, kbdIndex) => {
                          return (openBlock(), createBlock(_sfc_main$4, mergeProps({
                            key: kbdIndex,
                            size: item.ui?.itemTrailingKbdsSize || __props.uiOverride?.itemTrailingKbdsSize || __props.ui.itemTrailingKbdsSize()
                          }, { ref_for: true }, typeof kbd === 'string' ? { value: kbd } : kbd), null, 16 /* FULL_PROPS */, ["size"]))
                        }), 128 /* KEYED_FRAGMENT */))
                      ], 2 /* CLASS */))
                    : createCommentVNode("v-if", true)
              ]),
              createVNode(unref(DropdownMenu).ItemIndicator, { "as-child": "" }, {
                default: withCtx(() => [
                  createVNode(_sfc_main$2, {
                    name: __props.checkedIcon || unref(appConfig).ui.icons.check,
                    "data-slot": "itemTrailingIcon",
                    class: __props.ui.itemTrailingIcon({ class: [__props.uiOverride?.itemTrailingIcon, item.ui?.itemTrailingIcon], color: item?.color })
                  }, null, 8 /* PROPS */, ["name", "class"])
                ]),
                _: 2 /* DYNAMIC */
              }, 1024 /* DYNAMIC_SLOTS */)
            ], 2 /* CLASS */)
          ])
        ]
      }
    }),
    _: 3 /* FORWARDED */
  }, _parent));
  _push(ssrRenderComponent(unref(DropdownMenu).Portal, unref(portalProps), {
    default: withCtx((_, _push, _parent, _scopeId) => {
      if (_push) {
        ssrRenderVNode(_push, createVNode(resolveDynamicComponent(__props.sub ? unref(DropdownMenu).SubContent : unref(DropdownMenu).Content), mergeProps({
          "data-slot": "content",
          class: __props.ui.content({ class: [__props.uiOverride?.content, props.class] })
        }, unref(contentProps)), {
          default: withCtx((_, _push, _parent, _scopeId) => {
            if (_push) {
              ssrRenderSlot(_ctx.$slots, "content-top", {}, null, _push, _parent, _scopeId);
              _push(`<div role="presentation" data-slot="viewport" class="${
                ssrRenderClass(__props.ui.viewport({ class: __props.uiOverride?.viewport }))
              }"${
                _scopeId
              }><!--[-->`);
              ssrRenderList(groups.value, (group, groupIndex) => {
                _push(ssrRenderComponent(unref(DropdownMenu).Group, {
                  key: `group-${groupIndex}`,
                  "data-slot": "group",
                  class: __props.ui.group({ class: __props.uiOverride?.group })
                }, {
                  default: withCtx((_, _push, _parent, _scopeId) => {
                    if (_push) {
                      _push(`<!--[-->`);
                      ssrRenderList(group, (item, index) => {
                        _push(`<!--[-->`);
                        if (item.type === 'label') {
                          _push(ssrRenderComponent(unref(DropdownMenu).Label, {
                            "data-slot": "label",
                            class: __props.ui.label({ class: [__props.uiOverride?.label, item.ui?.label, item.class] })
                          }, {
                            default: withCtx((_, _push, _parent, _scopeId) => {
                              if (_push) {
                                _push(ssrRenderComponent(unref(ReuseItemTemplate), {
                                  item: item,
                                  index: index
                                }, null, _parent, _scopeId));
                              } else {
                                return [
                                  createVNode(unref(ReuseItemTemplate), {
                                    item: item,
                                    index: index
                                  }, null, 8 /* PROPS */, ["item", "index"])
                                ]
                              }
                            }),
                            _: 2 /* DYNAMIC */
                          }, _parent, _scopeId));
                        } else if (item.type === 'separator') {
                          _push(ssrRenderComponent(unref(DropdownMenu).Separator, {
                            "data-slot": "separator",
                            class: __props.ui.separator({ class: [__props.uiOverride?.separator, item.ui?.separator, item.class] })
                          }, null, _parent, _scopeId));
                        } else if (item?.children?.length) {
                          _push(ssrRenderComponent(unref(DropdownMenu).Sub, {
                            open: item.open,
                            "default-open": item.defaultOpen
                          }, {
                            default: withCtx((_, _push, _parent, _scopeId) => {
                              if (_push) {
                                _push(ssrRenderComponent(unref(DropdownMenu).SubTrigger, {
                                  as: "button",
                                  type: "button",
                                  disabled: item.disabled,
                                  "text-value": unref(get)(item, props.labelKey),
                                  "data-slot": "item",
                                  class: __props.ui.item({ class: [__props.uiOverride?.item, item.ui?.item, item.class], color: item?.color })
                                }, {
                                  default: withCtx((_, _push, _parent, _scopeId) => {
                                    if (_push) {
                                      _push(ssrRenderComponent(unref(ReuseItemTemplate), {
                                        item: item,
                                        index: index
                                      }, null, _parent, _scopeId));
                                    } else {
                                      return [
                                        createVNode(unref(ReuseItemTemplate), {
                                          item: item,
                                          index: index
                                        }, null, 8 /* PROPS */, ["item", "index"])
                                      ]
                                    }
                                  }),
                                  _: 2 /* DYNAMIC */
                                }, _parent, _scopeId));
                                _push(ssrRenderComponent(_sfc_main$1, mergeProps({
                                  sub: "",
                                  class: item.ui?.content,
                                  ui: __props.ui,
                                  "ui-override": __props.uiOverride,
                                  portal: __props.portal,
                                  items: item.children,
                                  align: "start",
                                  "align-offset": -4,
                                  "side-offset": 3,
                                  "label-key": __props.labelKey,
                                  "description-key": __props.descriptionKey,
                                  "checked-icon": __props.checkedIcon,
                                  "loading-icon": __props.loadingIcon,
                                  "external-icon": __props.externalIcon
                                }, { ref_for: true }, item.content), createSlots({ _: 2 /* DYNAMIC */ }, [
                                  renderList(getProxySlots(), (_, name) => {
                                    return {
                                      name: name,
                                      fn: withCtx((slotData, _push, _parent, _scopeId) => {
                                        if (_push) {
                                          ssrRenderSlot(_ctx.$slots, name, mergeProps({ ref_for: true }, slotData), null, _push, _parent, _scopeId);
                                        } else {
                                          return [
                                            renderSlot(_ctx.$slots, name, mergeProps({ ref_for: true }, slotData))
                                          ]
                                        }
                                      })
                                    }
                                  })
                                ]), _parent, _scopeId));
                              } else {
                                return [
                                  createVNode(unref(DropdownMenu).SubTrigger, {
                                    as: "button",
                                    type: "button",
                                    disabled: item.disabled,
                                    "text-value": unref(get)(item, props.labelKey),
                                    "data-slot": "item",
                                    class: __props.ui.item({ class: [__props.uiOverride?.item, item.ui?.item, item.class], color: item?.color })
                                  }, {
                                    default: withCtx(() => [
                                      createVNode(unref(ReuseItemTemplate), {
                                        item: item,
                                        index: index
                                      }, null, 8 /* PROPS */, ["item", "index"])
                                    ]),
                                    _: 2 /* DYNAMIC */
                                  }, 1032 /* PROPS, DYNAMIC_SLOTS */, ["disabled", "text-value", "class"]),
                                  createVNode(_sfc_main$1, mergeProps({
                                    sub: "",
                                    class: item.ui?.content,
                                    ui: __props.ui,
                                    "ui-override": __props.uiOverride,
                                    portal: __props.portal,
                                    items: item.children,
                                    align: "start",
                                    "align-offset": -4,
                                    "side-offset": 3,
                                    "label-key": __props.labelKey,
                                    "description-key": __props.descriptionKey,
                                    "checked-icon": __props.checkedIcon,
                                    "loading-icon": __props.loadingIcon,
                                    "external-icon": __props.externalIcon
                                  }, { ref_for: true }, item.content), createSlots({ _: 2 /* DYNAMIC */ }, [
                                    renderList(getProxySlots(), (_, name) => {
                                      return {
                                        name: name,
                                        fn: withCtx((slotData) => [
                                          renderSlot(_ctx.$slots, name, mergeProps({ ref_for: true }, slotData))
                                        ])
                                      }
                                    })
                                  ]), 1040 /* FULL_PROPS, DYNAMIC_SLOTS */, ["class", "ui", "ui-override", "portal", "items", "label-key", "description-key", "checked-icon", "loading-icon", "external-icon"])
                                ]
                              }
                            }),
                            _: 2 /* DYNAMIC */
                          }, _parent, _scopeId));
                        } else if (item.type === 'checkbox') {
                          _push(ssrRenderComponent(unref(DropdownMenu).CheckboxItem, {
                            "model-value": item.checked,
                            disabled: item.disabled,
                            "text-value": unref(get)(item, props.labelKey),
                            "data-slot": "item",
                            class: __props.ui.item({ class: [__props.uiOverride?.item, item.ui?.item, item.class], color: item?.color }),
                            "onUpdate:modelValue": item.onUpdateChecked,
                            onSelect: item.onSelect
                          }, {
                            default: withCtx((_, _push, _parent, _scopeId) => {
                              if (_push) {
                                _push(ssrRenderComponent(unref(ReuseItemTemplate), {
                                  item: item,
                                  index: index
                                }, null, _parent, _scopeId));
                              } else {
                                return [
                                  createVNode(unref(ReuseItemTemplate), {
                                    item: item,
                                    index: index
                                  }, null, 8 /* PROPS */, ["item", "index"])
                                ]
                              }
                            }),
                            _: 2 /* DYNAMIC */
                          }, _parent, _scopeId));
                        } else {
                          _push(ssrRenderComponent(unref(DropdownMenu).Item, {
                            "as-child": "",
                            disabled: item.disabled,
                            "text-value": unref(get)(item, props.labelKey),
                            onSelect: item.onSelect
                          }, {
                            default: withCtx((_, _push, _parent, _scopeId) => {
                              if (_push) {
                                _push(ssrRenderComponent(_sfc_main$5, mergeProps({ ref_for: true }, unref(pickLinkProps)(item), { custom: "" }), {
                                  default: withCtx(({ active, ...slotProps }, _push, _parent, _scopeId) => {
                                    if (_push) {
                                      _push(ssrRenderComponent(_sfc_main$6, mergeProps({ ref_for: true }, slotProps, {
                                        "data-slot": "item",
                                        class: __props.ui.item({ class: [__props.uiOverride?.item, item.ui?.item, item.class], color: item?.color, active })
                                      }), {
                                        default: withCtx((_, _push, _parent, _scopeId) => {
                                          if (_push) {
                                            _push(ssrRenderComponent(unref(ReuseItemTemplate), {
                                              item: item,
                                              active: active,
                                              index: index
                                            }, null, _parent, _scopeId));
                                          } else {
                                            return [
                                              createVNode(unref(ReuseItemTemplate), {
                                                item: item,
                                                active: active,
                                                index: index
                                              }, null, 8 /* PROPS */, ["item", "active", "index"])
                                            ]
                                          }
                                        }),
                                        _: 2 /* DYNAMIC */
                                      }, _parent, _scopeId));
                                    } else {
                                      return [
                                        createVNode(_sfc_main$6, mergeProps({ ref_for: true }, slotProps, {
                                          "data-slot": "item",
                                          class: __props.ui.item({ class: [__props.uiOverride?.item, item.ui?.item, item.class], color: item?.color, active })
                                        }), {
                                          default: withCtx(() => [
                                            createVNode(unref(ReuseItemTemplate), {
                                              item: item,
                                              active: active,
                                              index: index
                                            }, null, 8 /* PROPS */, ["item", "active", "index"])
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
                                  createVNode(_sfc_main$5, mergeProps({ ref_for: true }, unref(pickLinkProps)(item), { custom: "" }), {
                                    default: withCtx(({ active, ...slotProps }) => [
                                      createVNode(_sfc_main$6, mergeProps({ ref_for: true }, slotProps, {
                                        "data-slot": "item",
                                        class: __props.ui.item({ class: [__props.uiOverride?.item, item.ui?.item, item.class], color: item?.color, active })
                                      }), {
                                        default: withCtx(() => [
                                          createVNode(unref(ReuseItemTemplate), {
                                            item: item,
                                            active: active,
                                            index: index
                                          }, null, 8 /* PROPS */, ["item", "active", "index"])
                                        ]),
                                        _: 2 /* DYNAMIC */
                                      }, 1040 /* FULL_PROPS, DYNAMIC_SLOTS */, ["class"])
                                    ]),
                                    _: 2 /* DYNAMIC */
                                  }, 1040 /* FULL_PROPS, DYNAMIC_SLOTS */)
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
                            (item.type === 'label')
                              ? (openBlock(), createBlock(unref(DropdownMenu).Label, {
                                  key: 0,
                                  "data-slot": "label",
                                  class: __props.ui.label({ class: [__props.uiOverride?.label, item.ui?.label, item.class] })
                                }, {
                                  default: withCtx(() => [
                                    createVNode(unref(ReuseItemTemplate), {
                                      item: item,
                                      index: index
                                    }, null, 8 /* PROPS */, ["item", "index"])
                                  ]),
                                  _: 2 /* DYNAMIC */
                                }, 1032 /* PROPS, DYNAMIC_SLOTS */, ["class"]))
                              : (item.type === 'separator')
                                ? (openBlock(), createBlock(unref(DropdownMenu).Separator, {
                                    key: 1,
                                    "data-slot": "separator",
                                    class: __props.ui.separator({ class: [__props.uiOverride?.separator, item.ui?.separator, item.class] })
                                  }, null, 8 /* PROPS */, ["class"]))
                                : (item?.children?.length)
                                  ? (openBlock(), createBlock(unref(DropdownMenu).Sub, {
                                      key: 2,
                                      open: item.open,
                                      "default-open": item.defaultOpen
                                    }, {
                                      default: withCtx(() => [
                                        createVNode(unref(DropdownMenu).SubTrigger, {
                                          as: "button",
                                          type: "button",
                                          disabled: item.disabled,
                                          "text-value": unref(get)(item, props.labelKey),
                                          "data-slot": "item",
                                          class: __props.ui.item({ class: [__props.uiOverride?.item, item.ui?.item, item.class], color: item?.color })
                                        }, {
                                          default: withCtx(() => [
                                            createVNode(unref(ReuseItemTemplate), {
                                              item: item,
                                              index: index
                                            }, null, 8 /* PROPS */, ["item", "index"])
                                          ]),
                                          _: 2 /* DYNAMIC */
                                        }, 1032 /* PROPS, DYNAMIC_SLOTS */, ["disabled", "text-value", "class"]),
                                        createVNode(_sfc_main$1, mergeProps({
                                          sub: "",
                                          class: item.ui?.content,
                                          ui: __props.ui,
                                          "ui-override": __props.uiOverride,
                                          portal: __props.portal,
                                          items: item.children,
                                          align: "start",
                                          "align-offset": -4,
                                          "side-offset": 3,
                                          "label-key": __props.labelKey,
                                          "description-key": __props.descriptionKey,
                                          "checked-icon": __props.checkedIcon,
                                          "loading-icon": __props.loadingIcon,
                                          "external-icon": __props.externalIcon
                                        }, { ref_for: true }, item.content), createSlots({ _: 2 /* DYNAMIC */ }, [
                                          renderList(getProxySlots(), (_, name) => {
                                            return {
                                              name: name,
                                              fn: withCtx((slotData) => [
                                                renderSlot(_ctx.$slots, name, mergeProps({ ref_for: true }, slotData))
                                              ])
                                            }
                                          })
                                        ]), 1040 /* FULL_PROPS, DYNAMIC_SLOTS */, ["class", "ui", "ui-override", "portal", "items", "label-key", "description-key", "checked-icon", "loading-icon", "external-icon"])
                                      ]),
                                      _: 2 /* DYNAMIC */
                                    }, 1032 /* PROPS, DYNAMIC_SLOTS */, ["open", "default-open"]))
                                  : (item.type === 'checkbox')
                                    ? (openBlock(), createBlock(unref(DropdownMenu).CheckboxItem, {
                                        key: 3,
                                        "model-value": item.checked,
                                        disabled: item.disabled,
                                        "text-value": unref(get)(item, props.labelKey),
                                        "data-slot": "item",
                                        class: __props.ui.item({ class: [__props.uiOverride?.item, item.ui?.item, item.class], color: item?.color }),
                                        "onUpdate:modelValue": item.onUpdateChecked,
                                        onSelect: item.onSelect
                                      }, {
                                        default: withCtx(() => [
                                          createVNode(unref(ReuseItemTemplate), {
                                            item: item,
                                            index: index
                                          }, null, 8 /* PROPS */, ["item", "index"])
                                        ]),
                                        _: 2 /* DYNAMIC */
                                      }, 1032 /* PROPS, DYNAMIC_SLOTS */, ["model-value", "disabled", "text-value", "class", "onUpdate:modelValue", "onSelect"]))
                                    : (openBlock(), createBlock(unref(DropdownMenu).Item, {
                                        key: 4,
                                        "as-child": "",
                                        disabled: item.disabled,
                                        "text-value": unref(get)(item, props.labelKey),
                                        onSelect: item.onSelect
                                      }, {
                                        default: withCtx(() => [
                                          createVNode(_sfc_main$5, mergeProps({ ref_for: true }, unref(pickLinkProps)(item), { custom: "" }), {
                                            default: withCtx(({ active, ...slotProps }) => [
                                              createVNode(_sfc_main$6, mergeProps({ ref_for: true }, slotProps, {
                                                "data-slot": "item",
                                                class: __props.ui.item({ class: [__props.uiOverride?.item, item.ui?.item, item.class], color: item?.color, active })
                                              }), {
                                                default: withCtx(() => [
                                                  createVNode(unref(ReuseItemTemplate), {
                                                    item: item,
                                                    active: active,
                                                    index: index
                                                  }, null, 8 /* PROPS */, ["item", "active", "index"])
                                                ]),
                                                _: 2 /* DYNAMIC */
                                              }, 1040 /* FULL_PROPS, DYNAMIC_SLOTS */, ["class"])
                                            ]),
                                            _: 2 /* DYNAMIC */
                                          }, 1040 /* FULL_PROPS, DYNAMIC_SLOTS */)
                                        ]),
                                        _: 2 /* DYNAMIC */
                                      }, 1032 /* PROPS, DYNAMIC_SLOTS */, ["disabled", "text-value", "onSelect"]))
                          ], 64 /* STABLE_FRAGMENT */))
                        }), 128 /* KEYED_FRAGMENT */))
                      ]
                    }
                  }),
                  _: 2 /* DYNAMIC */
                }, _parent, _scopeId));
              });
              _push(`<!--]--></div>`);
              ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent, _scopeId);
              ssrRenderSlot(_ctx.$slots, "content-bottom", {}, null, _push, _parent, _scopeId);
            } else {
              return [
                renderSlot(_ctx.$slots, "content-top"),
                createVNode("div", {
                  role: "presentation",
                  "data-slot": "viewport",
                  class: __props.ui.viewport({ class: __props.uiOverride?.viewport })
                }, [
                  (openBlock(true), createBlock(Fragment, null, renderList(groups.value, (group, groupIndex) => {
                    return (openBlock(), createBlock(unref(DropdownMenu).Group, {
                      key: `group-${groupIndex}`,
                      "data-slot": "group",
                      class: __props.ui.group({ class: __props.uiOverride?.group })
                    }, {
                      default: withCtx(() => [
                        (openBlock(true), createBlock(Fragment, null, renderList(group, (item, index) => {
                          return (openBlock(), createBlock(Fragment, {
                            key: `group-${groupIndex}-${index}`
                          }, [
                            (item.type === 'label')
                              ? (openBlock(), createBlock(unref(DropdownMenu).Label, {
                                  key: 0,
                                  "data-slot": "label",
                                  class: __props.ui.label({ class: [__props.uiOverride?.label, item.ui?.label, item.class] })
                                }, {
                                  default: withCtx(() => [
                                    createVNode(unref(ReuseItemTemplate), {
                                      item: item,
                                      index: index
                                    }, null, 8 /* PROPS */, ["item", "index"])
                                  ]),
                                  _: 2 /* DYNAMIC */
                                }, 1032 /* PROPS, DYNAMIC_SLOTS */, ["class"]))
                              : (item.type === 'separator')
                                ? (openBlock(), createBlock(unref(DropdownMenu).Separator, {
                                    key: 1,
                                    "data-slot": "separator",
                                    class: __props.ui.separator({ class: [__props.uiOverride?.separator, item.ui?.separator, item.class] })
                                  }, null, 8 /* PROPS */, ["class"]))
                                : (item?.children?.length)
                                  ? (openBlock(), createBlock(unref(DropdownMenu).Sub, {
                                      key: 2,
                                      open: item.open,
                                      "default-open": item.defaultOpen
                                    }, {
                                      default: withCtx(() => [
                                        createVNode(unref(DropdownMenu).SubTrigger, {
                                          as: "button",
                                          type: "button",
                                          disabled: item.disabled,
                                          "text-value": unref(get)(item, props.labelKey),
                                          "data-slot": "item",
                                          class: __props.ui.item({ class: [__props.uiOverride?.item, item.ui?.item, item.class], color: item?.color })
                                        }, {
                                          default: withCtx(() => [
                                            createVNode(unref(ReuseItemTemplate), {
                                              item: item,
                                              index: index
                                            }, null, 8 /* PROPS */, ["item", "index"])
                                          ]),
                                          _: 2 /* DYNAMIC */
                                        }, 1032 /* PROPS, DYNAMIC_SLOTS */, ["disabled", "text-value", "class"]),
                                        createVNode(_sfc_main$1, mergeProps({
                                          sub: "",
                                          class: item.ui?.content,
                                          ui: __props.ui,
                                          "ui-override": __props.uiOverride,
                                          portal: __props.portal,
                                          items: item.children,
                                          align: "start",
                                          "align-offset": -4,
                                          "side-offset": 3,
                                          "label-key": __props.labelKey,
                                          "description-key": __props.descriptionKey,
                                          "checked-icon": __props.checkedIcon,
                                          "loading-icon": __props.loadingIcon,
                                          "external-icon": __props.externalIcon
                                        }, { ref_for: true }, item.content), createSlots({ _: 2 /* DYNAMIC */ }, [
                                          renderList(getProxySlots(), (_, name) => {
                                            return {
                                              name: name,
                                              fn: withCtx((slotData) => [
                                                renderSlot(_ctx.$slots, name, mergeProps({ ref_for: true }, slotData))
                                              ])
                                            }
                                          })
                                        ]), 1040 /* FULL_PROPS, DYNAMIC_SLOTS */, ["class", "ui", "ui-override", "portal", "items", "label-key", "description-key", "checked-icon", "loading-icon", "external-icon"])
                                      ]),
                                      _: 2 /* DYNAMIC */
                                    }, 1032 /* PROPS, DYNAMIC_SLOTS */, ["open", "default-open"]))
                                  : (item.type === 'checkbox')
                                    ? (openBlock(), createBlock(unref(DropdownMenu).CheckboxItem, {
                                        key: 3,
                                        "model-value": item.checked,
                                        disabled: item.disabled,
                                        "text-value": unref(get)(item, props.labelKey),
                                        "data-slot": "item",
                                        class: __props.ui.item({ class: [__props.uiOverride?.item, item.ui?.item, item.class], color: item?.color }),
                                        "onUpdate:modelValue": item.onUpdateChecked,
                                        onSelect: item.onSelect
                                      }, {
                                        default: withCtx(() => [
                                          createVNode(unref(ReuseItemTemplate), {
                                            item: item,
                                            index: index
                                          }, null, 8 /* PROPS */, ["item", "index"])
                                        ]),
                                        _: 2 /* DYNAMIC */
                                      }, 1032 /* PROPS, DYNAMIC_SLOTS */, ["model-value", "disabled", "text-value", "class", "onUpdate:modelValue", "onSelect"]))
                                    : (openBlock(), createBlock(unref(DropdownMenu).Item, {
                                        key: 4,
                                        "as-child": "",
                                        disabled: item.disabled,
                                        "text-value": unref(get)(item, props.labelKey),
                                        onSelect: item.onSelect
                                      }, {
                                        default: withCtx(() => [
                                          createVNode(_sfc_main$5, mergeProps({ ref_for: true }, unref(pickLinkProps)(item), { custom: "" }), {
                                            default: withCtx(({ active, ...slotProps }) => [
                                              createVNode(_sfc_main$6, mergeProps({ ref_for: true }, slotProps, {
                                                "data-slot": "item",
                                                class: __props.ui.item({ class: [__props.uiOverride?.item, item.ui?.item, item.class], color: item?.color, active })
                                              }), {
                                                default: withCtx(() => [
                                                  createVNode(unref(ReuseItemTemplate), {
                                                    item: item,
                                                    active: active,
                                                    index: index
                                                  }, null, 8 /* PROPS */, ["item", "active", "index"])
                                                ]),
                                                _: 2 /* DYNAMIC */
                                              }, 1040 /* FULL_PROPS, DYNAMIC_SLOTS */, ["class"])
                                            ]),
                                            _: 2 /* DYNAMIC */
                                          }, 1040 /* FULL_PROPS, DYNAMIC_SLOTS */)
                                        ]),
                                        _: 2 /* DYNAMIC */
                                      }, 1032 /* PROPS, DYNAMIC_SLOTS */, ["disabled", "text-value", "onSelect"]))
                          ], 64 /* STABLE_FRAGMENT */))
                        }), 128 /* KEYED_FRAGMENT */))
                      ]),
                      _: 2 /* DYNAMIC */
                    }, 1032 /* PROPS, DYNAMIC_SLOTS */, ["class"]))
                  }), 128 /* KEYED_FRAGMENT */))
                ], 2 /* CLASS */),
                renderSlot(_ctx.$slots, "default"),
                renderSlot(_ctx.$slots, "content-bottom")
              ]
            }
          }),
          _: 3 /* FORWARDED */
        }), _parent, _scopeId);
      } else {
        return [
          (openBlock(), createBlock(resolveDynamicComponent(__props.sub ? unref(DropdownMenu).SubContent : unref(DropdownMenu).Content), mergeProps({
            "data-slot": "content",
            class: __props.ui.content({ class: [__props.uiOverride?.content, props.class] })
          }, unref(contentProps)), {
            default: withCtx(() => [
              renderSlot(_ctx.$slots, "content-top"),
              createVNode("div", {
                role: "presentation",
                "data-slot": "viewport",
                class: __props.ui.viewport({ class: __props.uiOverride?.viewport })
              }, [
                (openBlock(true), createBlock(Fragment, null, renderList(groups.value, (group, groupIndex) => {
                  return (openBlock(), createBlock(unref(DropdownMenu).Group, {
                    key: `group-${groupIndex}`,
                    "data-slot": "group",
                    class: __props.ui.group({ class: __props.uiOverride?.group })
                  }, {
                    default: withCtx(() => [
                      (openBlock(true), createBlock(Fragment, null, renderList(group, (item, index) => {
                        return (openBlock(), createBlock(Fragment, {
                          key: `group-${groupIndex}-${index}`
                        }, [
                          (item.type === 'label')
                            ? (openBlock(), createBlock(unref(DropdownMenu).Label, {
                                key: 0,
                                "data-slot": "label",
                                class: __props.ui.label({ class: [__props.uiOverride?.label, item.ui?.label, item.class] })
                              }, {
                                default: withCtx(() => [
                                  createVNode(unref(ReuseItemTemplate), {
                                    item: item,
                                    index: index
                                  }, null, 8 /* PROPS */, ["item", "index"])
                                ]),
                                _: 2 /* DYNAMIC */
                              }, 1032 /* PROPS, DYNAMIC_SLOTS */, ["class"]))
                            : (item.type === 'separator')
                              ? (openBlock(), createBlock(unref(DropdownMenu).Separator, {
                                  key: 1,
                                  "data-slot": "separator",
                                  class: __props.ui.separator({ class: [__props.uiOverride?.separator, item.ui?.separator, item.class] })
                                }, null, 8 /* PROPS */, ["class"]))
                              : (item?.children?.length)
                                ? (openBlock(), createBlock(unref(DropdownMenu).Sub, {
                                    key: 2,
                                    open: item.open,
                                    "default-open": item.defaultOpen
                                  }, {
                                    default: withCtx(() => [
                                      createVNode(unref(DropdownMenu).SubTrigger, {
                                        as: "button",
                                        type: "button",
                                        disabled: item.disabled,
                                        "text-value": unref(get)(item, props.labelKey),
                                        "data-slot": "item",
                                        class: __props.ui.item({ class: [__props.uiOverride?.item, item.ui?.item, item.class], color: item?.color })
                                      }, {
                                        default: withCtx(() => [
                                          createVNode(unref(ReuseItemTemplate), {
                                            item: item,
                                            index: index
                                          }, null, 8 /* PROPS */, ["item", "index"])
                                        ]),
                                        _: 2 /* DYNAMIC */
                                      }, 1032 /* PROPS, DYNAMIC_SLOTS */, ["disabled", "text-value", "class"]),
                                      createVNode(_sfc_main$1, mergeProps({
                                        sub: "",
                                        class: item.ui?.content,
                                        ui: __props.ui,
                                        "ui-override": __props.uiOverride,
                                        portal: __props.portal,
                                        items: item.children,
                                        align: "start",
                                        "align-offset": -4,
                                        "side-offset": 3,
                                        "label-key": __props.labelKey,
                                        "description-key": __props.descriptionKey,
                                        "checked-icon": __props.checkedIcon,
                                        "loading-icon": __props.loadingIcon,
                                        "external-icon": __props.externalIcon
                                      }, { ref_for: true }, item.content), createSlots({ _: 2 /* DYNAMIC */ }, [
                                        renderList(getProxySlots(), (_, name) => {
                                          return {
                                            name: name,
                                            fn: withCtx((slotData) => [
                                              renderSlot(_ctx.$slots, name, mergeProps({ ref_for: true }, slotData))
                                            ])
                                          }
                                        })
                                      ]), 1040 /* FULL_PROPS, DYNAMIC_SLOTS */, ["class", "ui", "ui-override", "portal", "items", "label-key", "description-key", "checked-icon", "loading-icon", "external-icon"])
                                    ]),
                                    _: 2 /* DYNAMIC */
                                  }, 1032 /* PROPS, DYNAMIC_SLOTS */, ["open", "default-open"]))
                                : (item.type === 'checkbox')
                                  ? (openBlock(), createBlock(unref(DropdownMenu).CheckboxItem, {
                                      key: 3,
                                      "model-value": item.checked,
                                      disabled: item.disabled,
                                      "text-value": unref(get)(item, props.labelKey),
                                      "data-slot": "item",
                                      class: __props.ui.item({ class: [__props.uiOverride?.item, item.ui?.item, item.class], color: item?.color }),
                                      "onUpdate:modelValue": item.onUpdateChecked,
                                      onSelect: item.onSelect
                                    }, {
                                      default: withCtx(() => [
                                        createVNode(unref(ReuseItemTemplate), {
                                          item: item,
                                          index: index
                                        }, null, 8 /* PROPS */, ["item", "index"])
                                      ]),
                                      _: 2 /* DYNAMIC */
                                    }, 1032 /* PROPS, DYNAMIC_SLOTS */, ["model-value", "disabled", "text-value", "class", "onUpdate:modelValue", "onSelect"]))
                                  : (openBlock(), createBlock(unref(DropdownMenu).Item, {
                                      key: 4,
                                      "as-child": "",
                                      disabled: item.disabled,
                                      "text-value": unref(get)(item, props.labelKey),
                                      onSelect: item.onSelect
                                    }, {
                                      default: withCtx(() => [
                                        createVNode(_sfc_main$5, mergeProps({ ref_for: true }, unref(pickLinkProps)(item), { custom: "" }), {
                                          default: withCtx(({ active, ...slotProps }) => [
                                            createVNode(_sfc_main$6, mergeProps({ ref_for: true }, slotProps, {
                                              "data-slot": "item",
                                              class: __props.ui.item({ class: [__props.uiOverride?.item, item.ui?.item, item.class], color: item?.color, active })
                                            }), {
                                              default: withCtx(() => [
                                                createVNode(unref(ReuseItemTemplate), {
                                                  item: item,
                                                  active: active,
                                                  index: index
                                                }, null, 8 /* PROPS */, ["item", "active", "index"])
                                              ]),
                                              _: 2 /* DYNAMIC */
                                            }, 1040 /* FULL_PROPS, DYNAMIC_SLOTS */, ["class"])
                                          ]),
                                          _: 2 /* DYNAMIC */
                                        }, 1040 /* FULL_PROPS, DYNAMIC_SLOTS */)
                                      ]),
                                      _: 2 /* DYNAMIC */
                                    }, 1032 /* PROPS, DYNAMIC_SLOTS */, ["disabled", "text-value", "onSelect"]))
                        ], 64 /* STABLE_FRAGMENT */))
                      }), 128 /* KEYED_FRAGMENT */))
                    ]),
                    _: 2 /* DYNAMIC */
                  }, 1032 /* PROPS, DYNAMIC_SLOTS */, ["class"]))
                }), 128 /* KEYED_FRAGMENT */))
              ], 2 /* CLASS */),
              renderSlot(_ctx.$slots, "default"),
              renderSlot(_ctx.$slots, "content-bottom")
            ]),
            _: 3 /* FORWARDED */
          }, 16 /* FULL_PROPS */, ["class"]))
        ]
      }
    }),
    _: 3 /* FORWARDED */
  }, _parent));
  _push(`<!--]-->`);
}
}

};
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext()
  ;(ssrContext.modules || (ssrContext.modules = new Set())).add("node_modules/@nuxt/ui/dist/runtime/components/DropdownMenuContent.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : undefined
};

const theme = {
  "slots": {
    "content": "min-w-32 bg-default shadow-lg rounded-md ring ring-default overflow-hidden data-[state=open]:animate-[scale-in_100ms_ease-out] data-[state=closed]:animate-[scale-out_100ms_ease-in] origin-(--reka-dropdown-menu-content-transform-origin) flex flex-col",
    "viewport": "relative divide-y divide-default scroll-py-1 overflow-y-auto flex-1",
    "arrow": "fill-default",
    "group": "p-1 isolate",
    "label": "w-full flex items-center font-semibold text-highlighted",
    "separator": "-mx-1 my-1 h-px bg-border",
    "item": "group relative w-full flex items-start select-none outline-none before:absolute before:z-[-1] before:inset-px before:rounded-md data-disabled:cursor-not-allowed data-disabled:opacity-75",
    "itemLeadingIcon": "shrink-0",
    "itemLeadingAvatar": "shrink-0",
    "itemLeadingAvatarSize": "",
    "itemTrailing": "ms-auto inline-flex gap-1.5 items-center",
    "itemTrailingIcon": "shrink-0",
    "itemTrailingKbds": "hidden lg:inline-flex items-center shrink-0",
    "itemTrailingKbdsSize": "",
    "itemWrapper": "flex-1 flex flex-col text-start min-w-0",
    "itemLabel": "truncate",
    "itemDescription": "truncate text-muted",
    "itemLabelExternalIcon": "inline-block size-3 align-top text-dimmed"
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
    "active": {
      "true": {
        "item": "text-highlighted before:bg-elevated",
        "itemLeadingIcon": "text-default"
      },
      "false": {
        "item": [
          "text-default data-highlighted:text-highlighted data-[state=open]:text-highlighted data-highlighted:before:bg-elevated/50 data-[state=open]:before:bg-elevated/50",
          "transition-colors before:transition-colors"
        ],
        "itemLeadingIcon": [
          "text-dimmed group-data-highlighted:text-default group-data-[state=open]:text-default",
          "transition-colors"
        ]
      }
    },
    "loading": {
      "true": {
        "itemLeadingIcon": "animate-spin"
      }
    },
    "size": {
      "xs": {
        "label": "p-1 text-xs gap-1",
        "item": "p-1 text-xs gap-1",
        "itemLeadingIcon": "size-4",
        "itemLeadingAvatarSize": "3xs",
        "itemTrailingIcon": "size-4",
        "itemTrailingKbds": "gap-0.5",
        "itemTrailingKbdsSize": "sm"
      },
      "sm": {
        "label": "p-1.5 text-xs gap-1.5",
        "item": "p-1.5 text-xs gap-1.5",
        "itemLeadingIcon": "size-4",
        "itemLeadingAvatarSize": "3xs",
        "itemTrailingIcon": "size-4",
        "itemTrailingKbds": "gap-0.5",
        "itemTrailingKbdsSize": "sm"
      },
      "md": {
        "label": "p-1.5 text-sm gap-1.5",
        "item": "p-1.5 text-sm gap-1.5",
        "itemLeadingIcon": "size-5",
        "itemLeadingAvatarSize": "2xs",
        "itemTrailingIcon": "size-5",
        "itemTrailingKbds": "gap-0.5",
        "itemTrailingKbdsSize": "md"
      },
      "lg": {
        "label": "p-2 text-sm gap-2",
        "item": "p-2 text-sm gap-2",
        "itemLeadingIcon": "size-5",
        "itemLeadingAvatarSize": "2xs",
        "itemTrailingIcon": "size-5",
        "itemTrailingKbds": "gap-1",
        "itemTrailingKbdsSize": "md"
      },
      "xl": {
        "label": "p-2 text-base gap-2",
        "item": "p-2 text-base gap-2",
        "itemLeadingIcon": "size-6",
        "itemLeadingAvatarSize": "xs",
        "itemTrailingIcon": "size-6",
        "itemTrailingKbds": "gap-1",
        "itemTrailingKbdsSize": "lg"
      }
    }
  },
  "compoundVariants": [
    {
      "color": "primary",
      "active": false,
      "class": {
        "item": "text-primary data-highlighted:text-primary data-highlighted:before:bg-primary/10 data-[state=open]:before:bg-primary/10",
        "itemLeadingIcon": "text-primary/75 group-data-highlighted:text-primary group-data-[state=open]:text-primary"
      }
    },
    {
      "color": "secondary",
      "active": false,
      "class": {
        "item": "text-secondary data-highlighted:text-secondary data-highlighted:before:bg-secondary/10 data-[state=open]:before:bg-secondary/10",
        "itemLeadingIcon": "text-secondary/75 group-data-highlighted:text-secondary group-data-[state=open]:text-secondary"
      }
    },
    {
      "color": "success",
      "active": false,
      "class": {
        "item": "text-success data-highlighted:text-success data-highlighted:before:bg-success/10 data-[state=open]:before:bg-success/10",
        "itemLeadingIcon": "text-success/75 group-data-highlighted:text-success group-data-[state=open]:text-success"
      }
    },
    {
      "color": "info",
      "active": false,
      "class": {
        "item": "text-info data-highlighted:text-info data-highlighted:before:bg-info/10 data-[state=open]:before:bg-info/10",
        "itemLeadingIcon": "text-info/75 group-data-highlighted:text-info group-data-[state=open]:text-info"
      }
    },
    {
      "color": "warning",
      "active": false,
      "class": {
        "item": "text-warning data-highlighted:text-warning data-highlighted:before:bg-warning/10 data-[state=open]:before:bg-warning/10",
        "itemLeadingIcon": "text-warning/75 group-data-highlighted:text-warning group-data-[state=open]:text-warning"
      }
    },
    {
      "color": "error",
      "active": false,
      "class": {
        "item": "text-error data-highlighted:text-error data-highlighted:before:bg-error/10 data-[state=open]:before:bg-error/10",
        "itemLeadingIcon": "text-error/75 group-data-highlighted:text-error group-data-[state=open]:text-error"
      }
    },
    {
      "color": "primary",
      "active": true,
      "class": {
        "item": "text-primary before:bg-primary/10",
        "itemLeadingIcon": "text-primary"
      }
    },
    {
      "color": "secondary",
      "active": true,
      "class": {
        "item": "text-secondary before:bg-secondary/10",
        "itemLeadingIcon": "text-secondary"
      }
    },
    {
      "color": "success",
      "active": true,
      "class": {
        "item": "text-success before:bg-success/10",
        "itemLeadingIcon": "text-success"
      }
    },
    {
      "color": "info",
      "active": true,
      "class": {
        "item": "text-info before:bg-info/10",
        "itemLeadingIcon": "text-info"
      }
    },
    {
      "color": "warning",
      "active": true,
      "class": {
        "item": "text-warning before:bg-warning/10",
        "itemLeadingIcon": "text-warning"
      }
    },
    {
      "color": "error",
      "active": true,
      "class": {
        "item": "text-error before:bg-error/10",
        "itemLeadingIcon": "text-error"
      }
    }
  ],
  "defaultVariants": {
    "size": "md"
  }
};

const _sfc_main = {
  __name: 'DropdownMenu',
  __ssrInlineRender: true,
  props: {
  size: { type: null, required: false },
  items: { type: null, required: false },
  checkedIcon: { type: null, required: false },
  loadingIcon: { type: null, required: false },
  externalIcon: { type: [Boolean, String], required: false, skipCheck: true, default: true },
  content: { type: Object, required: false },
  arrow: { type: [Boolean, Object], required: false },
  portal: { type: [Boolean, String], required: false, skipCheck: true, default: true },
  labelKey: { type: null, required: false, default: "label" },
  descriptionKey: { type: null, required: false, default: "description" },
  disabled: { type: Boolean, required: false },
  class: { type: null, required: false },
  ui: { type: null, required: false },
  defaultOpen: { type: Boolean, required: false },
  open: { type: Boolean, required: false },
  modal: { type: Boolean, required: false, default: true }
},
  emits: ["update:open"],
  setup(__props, { emit: __emit }) {

const props = __props;
const emits = __emit;
const slots = useSlots();
const appConfig = useAppConfig();
const rootProps = useForwardPropsEmits(reactivePick(props, "defaultOpen", "open", "modal"), emits);
const contentProps = toRef(() => defu(props.content, { side: "bottom", sideOffset: 8, collisionPadding: 8 }));
const arrowProps = toRef(() => props.arrow);
const getProxySlots = () => omit(slots, ["default"]);
const ui = computed(() => tv({ extend: tv(theme), ...appConfig.ui?.dropdownMenu || {} })({
  size: props.size
}));

return (_ctx, _push, _parent, _attrs) => {
  _push(ssrRenderComponent(unref(DropdownMenuRoot), mergeProps(unref(rootProps), _attrs), {
    default: withCtx(({ open }, _push, _parent, _scopeId) => {
      if (_push) {
        if (!!slots.default) {
          _push(ssrRenderComponent(unref(DropdownMenuTrigger), {
            "as-child": "",
            class: props.class,
            disabled: __props.disabled
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
        _push(ssrRenderComponent(_sfc_main$1, mergeProps({
          class: ui.value.content({ class: [!slots.default && props.class, props.ui?.content] }),
          ui: ui.value,
          "ui-override": props.ui
        }, contentProps.value, {
          items: __props.items,
          portal: __props.portal,
          "label-key": __props.labelKey,
          "description-key": __props.descriptionKey,
          "checked-icon": __props.checkedIcon,
          "loading-icon": __props.loadingIcon,
          "external-icon": __props.externalIcon
        }), createSlots({
          default: withCtx((_, _push, _parent, _scopeId) => {
            if (_push) {
              if (!!__props.arrow) {
                _push(ssrRenderComponent(unref(DropdownMenuArrow), mergeProps(arrowProps.value, {
                  "data-slot": "arrow",
                  class: ui.value.arrow({ class: props.ui?.arrow })
                }), null, _parent, _scopeId));
              } else {
                _push(`<!---->`);
              }
            } else {
              return [
                (!!__props.arrow)
                  ? (openBlock(), createBlock(unref(DropdownMenuArrow), mergeProps({ key: 0 }, arrowProps.value, {
                      "data-slot": "arrow",
                      class: ui.value.arrow({ class: props.ui?.arrow })
                    }), null, 16 /* FULL_PROPS */, ["class"]))
                  : createCommentVNode("v-if", true)
              ]
            }
          }),
          _: 2 /* DYNAMIC */
        }, [
          renderList(getProxySlots(), (_, name) => {
            return {
              name: name,
              fn: withCtx((slotData, _push, _parent, _scopeId) => {
                if (_push) {
                  ssrRenderSlot(_ctx.$slots, name, slotData, null, _push, _parent, _scopeId);
                } else {
                  return [
                    renderSlot(_ctx.$slots, name, slotData)
                  ]
                }
              })
            }
          })
        ]), _parent, _scopeId));
      } else {
        return [
          (!!slots.default)
            ? (openBlock(), createBlock(unref(DropdownMenuTrigger), {
                key: 0,
                "as-child": "",
                class: props.class,
                disabled: __props.disabled
              }, {
                default: withCtx(() => [
                  renderSlot(_ctx.$slots, "default", { open: open })
                ]),
                _: 2 /* DYNAMIC */
              }, 1032 /* PROPS, DYNAMIC_SLOTS */, ["class", "disabled"]))
            : createCommentVNode("v-if", true),
          createVNode(_sfc_main$1, mergeProps({
            class: ui.value.content({ class: [!slots.default && props.class, props.ui?.content] }),
            ui: ui.value,
            "ui-override": props.ui
          }, contentProps.value, {
            items: __props.items,
            portal: __props.portal,
            "label-key": __props.labelKey,
            "description-key": __props.descriptionKey,
            "checked-icon": __props.checkedIcon,
            "loading-icon": __props.loadingIcon,
            "external-icon": __props.externalIcon
          }), createSlots({
            default: withCtx(() => [
              (!!__props.arrow)
                ? (openBlock(), createBlock(unref(DropdownMenuArrow), mergeProps({ key: 0 }, arrowProps.value, {
                    "data-slot": "arrow",
                    class: ui.value.arrow({ class: props.ui?.arrow })
                  }), null, 16 /* FULL_PROPS */, ["class"]))
                : createCommentVNode("v-if", true)
            ]),
            _: 2 /* DYNAMIC */
          }, [
            renderList(getProxySlots(), (_, name) => {
              return {
                name: name,
                fn: withCtx((slotData) => [
                  renderSlot(_ctx.$slots, name, slotData)
                ])
              }
            })
          ]), 1040 /* FULL_PROPS, DYNAMIC_SLOTS */, ["class", "ui", "ui-override", "items", "portal", "label-key", "description-key", "checked-icon", "loading-icon", "external-icon"])
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
  ;(ssrContext.modules || (ssrContext.modules = new Set())).add("node_modules/@nuxt/ui/dist/runtime/components/DropdownMenu.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : undefined
};

export { _sfc_main as _ };
