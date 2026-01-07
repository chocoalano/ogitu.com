import { a as _sfc_main$7, _ as _sfc_main$8, b as _export_sfc } from './Badge-DaOjA2YD.js';
import { _ as _sfc_main$6 } from './Card-Ci6a5H8H.js';
import { t as tv, _ as _sfc_main$2, a as _sfc_main$5 } from './Button-BBveOjhJ.js';
import { useSlots, computed, unref, mergeProps, withCtx, renderSlot, createBlock, createCommentVNode, openBlock, createTextVNode, toDisplayString, createVNode, Fragment, renderList, useSSRContext, defineComponent, resolveComponent, resolveDynamicComponent, createSlots } from 'vue';
import { ssrRenderComponent, ssrRenderList, ssrRenderSlot, ssrRenderClass, ssrInterpolate, ssrRenderAttrs, ssrRenderVNode, ssrRenderAttr, ssrRenderStyle } from 'vue/server-renderer';
import { useForwardPropsEmits, AccordionRoot, AccordionItem, AccordionHeader, AccordionTrigger, AccordionContent } from 'reka-ui';
import { reactivePick } from '@vueuse/core';
import { a as useAppConfig, g as get } from './virtual_nuxt-ui-plugins-BqI2j5ZJ.js';
import { _ as _sfc_main$4 } from './Alert-D5zWQYXW.js';
import { _ as _sfc_main$3 } from './Checkbox-9gbT5PLz.js';

const theme = {
  "slots": {
    "root": "w-full",
    "item": "border-b border-default last:border-b-0",
    "header": "flex",
    "trigger": "group flex-1 flex items-center gap-1.5 font-medium text-sm py-3.5 focus-visible:outline-primary min-w-0",
    "content": "data-[state=open]:animate-[accordion-down_200ms_ease-out] data-[state=closed]:animate-[accordion-up_200ms_ease-out] overflow-hidden focus:outline-none",
    "body": "text-sm pb-3.5",
    "leadingIcon": "shrink-0 size-5",
    "trailingIcon": "shrink-0 size-5 ms-auto group-data-[state=open]:rotate-180 transition-transform duration-200",
    "label": "text-start break-words"
  },
  "variants": {
    "disabled": {
      "true": {
        "trigger": "cursor-not-allowed opacity-75"
      }
    }
  }
};

const _sfc_main$1 = {
  __name: 'Accordion',
  __ssrInlineRender: true,
  props: {
  as: { type: null, required: false },
  items: { type: Array, required: false },
  trailingIcon: { type: null, required: false },
  labelKey: { type: null, required: false, default: "label" },
  class: { type: null, required: false },
  ui: { type: null, required: false },
  collapsible: { type: Boolean, required: false, default: true },
  defaultValue: { type: null, required: false },
  modelValue: { type: null, required: false },
  type: { type: String, required: false, default: "single" },
  disabled: { type: Boolean, required: false },
  unmountOnHide: { type: Boolean, required: false, default: true }
},
  emits: ["update:modelValue"],
  setup(__props, { emit: __emit }) {

const props = __props;
const emits = __emit;
const slots = useSlots();
const appConfig = useAppConfig();
const rootProps = useForwardPropsEmits(reactivePick(props, "as", "collapsible", "defaultValue", "disabled", "modelValue", "unmountOnHide"), emits);
const ui = computed(() => tv({ extend: tv(theme), ...appConfig.ui?.accordion || {} })({
  disabled: props.disabled
}));

return (_ctx, _push, _parent, _attrs) => {
  _push(ssrRenderComponent(unref(AccordionRoot), mergeProps(unref(rootProps), {
    type: __props.type,
    "data-slot": "root",
    class: ui.value.root({ class: [props.ui?.root, props.class] })
  }, _attrs), {
    default: withCtx((_, _push, _parent, _scopeId) => {
      if (_push) {
        _push(`<!--[-->`);
        ssrRenderList(props.items, (item, index) => {
          _push(ssrRenderComponent(unref(AccordionItem), {
            key: index,
            value: item.value || String(index),
            disabled: item.disabled,
            "data-slot": "item",
            class: ui.value.item({ class: [props.ui?.item, item.ui?.item, item.class] })
          }, {
            default: withCtx(({ open }, _push, _parent, _scopeId) => {
              if (_push) {
                _push(ssrRenderComponent(unref(AccordionHeader), {
                  as: "div",
                  "data-slot": "header",
                  class: ui.value.header({ class: [props.ui?.header, item.ui?.header] })
                }, {
                  default: withCtx((_, _push, _parent, _scopeId) => {
                    if (_push) {
                      _push(ssrRenderComponent(unref(AccordionTrigger), {
                        "data-slot": "trigger",
                        class: ui.value.trigger({ class: [props.ui?.trigger, item.ui?.trigger], disabled: item.disabled })
                      }, {
                        default: withCtx((_, _push, _parent, _scopeId) => {
                          if (_push) {
                            ssrRenderSlot(_ctx.$slots, "leading", {
                              item: item,
                              index: index,
                              open: open,
                              ui: ui.value
                            }, () => {
                              if (item.icon) {
                                _push(ssrRenderComponent(_sfc_main$2, {
                                  name: item.icon,
                                  "data-slot": "leadingIcon",
                                  class: ui.value.leadingIcon({ class: [props.ui?.leadingIcon, item?.ui?.leadingIcon] })
                                }, null, _parent, _scopeId));
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
                                index: index,
                                open: open
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
                              open: open,
                              ui: ui.value
                            }, () => {
                              _push(ssrRenderComponent(_sfc_main$2, {
                                name: item.trailingIcon || __props.trailingIcon || unref(appConfig).ui.icons.chevronDown,
                                "data-slot": "trailingIcon",
                                class: ui.value.trailingIcon({ class: [props.ui?.trailingIcon, item.ui?.trailingIcon] })
                              }, null, _parent, _scopeId));
                            }, _push, _parent, _scopeId);
                          } else {
                            return [
                              renderSlot(_ctx.$slots, "leading", {
                                item: item,
                                index: index,
                                open: open,
                                ui: ui.value
                              }, () => [
                                (item.icon)
                                  ? (openBlock(), createBlock(_sfc_main$2, {
                                      key: 0,
                                      name: item.icon,
                                      "data-slot": "leadingIcon",
                                      class: ui.value.leadingIcon({ class: [props.ui?.leadingIcon, item?.ui?.leadingIcon] })
                                    }, null, 8 /* PROPS */, ["name", "class"]))
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
                                      index: index,
                                      open: open
                                    }, () => [
                                      createTextVNode(toDisplayString(unref(get)(item, props.labelKey)), 1 /* TEXT */)
                                    ])
                                  ], 2 /* CLASS */))
                                : createCommentVNode("v-if", true),
                              renderSlot(_ctx.$slots, "trailing", {
                                item: item,
                                index: index,
                                open: open,
                                ui: ui.value
                              }, () => [
                                createVNode(_sfc_main$2, {
                                  name: item.trailingIcon || __props.trailingIcon || unref(appConfig).ui.icons.chevronDown,
                                  "data-slot": "trailingIcon",
                                  class: ui.value.trailingIcon({ class: [props.ui?.trailingIcon, item.ui?.trailingIcon] })
                                }, null, 8 /* PROPS */, ["name", "class"])
                              ])
                            ]
                          }
                        }),
                        _: 2 /* DYNAMIC */
                      }, _parent, _scopeId));
                    } else {
                      return [
                        createVNode(unref(AccordionTrigger), {
                          "data-slot": "trigger",
                          class: ui.value.trigger({ class: [props.ui?.trigger, item.ui?.trigger], disabled: item.disabled })
                        }, {
                          default: withCtx(() => [
                            renderSlot(_ctx.$slots, "leading", {
                              item: item,
                              index: index,
                              open: open,
                              ui: ui.value
                            }, () => [
                              (item.icon)
                                ? (openBlock(), createBlock(_sfc_main$2, {
                                    key: 0,
                                    name: item.icon,
                                    "data-slot": "leadingIcon",
                                    class: ui.value.leadingIcon({ class: [props.ui?.leadingIcon, item?.ui?.leadingIcon] })
                                  }, null, 8 /* PROPS */, ["name", "class"]))
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
                                    index: index,
                                    open: open
                                  }, () => [
                                    createTextVNode(toDisplayString(unref(get)(item, props.labelKey)), 1 /* TEXT */)
                                  ])
                                ], 2 /* CLASS */))
                              : createCommentVNode("v-if", true),
                            renderSlot(_ctx.$slots, "trailing", {
                              item: item,
                              index: index,
                              open: open,
                              ui: ui.value
                            }, () => [
                              createVNode(_sfc_main$2, {
                                name: item.trailingIcon || __props.trailingIcon || unref(appConfig).ui.icons.chevronDown,
                                "data-slot": "trailingIcon",
                                class: ui.value.trailingIcon({ class: [props.ui?.trailingIcon, item.ui?.trailingIcon] })
                              }, null, 8 /* PROPS */, ["name", "class"])
                            ])
                          ]),
                          _: 2 /* DYNAMIC */
                        }, 1032 /* PROPS, DYNAMIC_SLOTS */, ["class"])
                      ]
                    }
                  }),
                  _: 2 /* DYNAMIC */
                }, _parent, _scopeId));
                if (item.content || !!slots.content || item.slot && !!slots[item.slot] || !!slots.body || item.slot && !!slots[`${item.slot}-body`]) {
                  _push(ssrRenderComponent(unref(AccordionContent), {
                    "data-slot": "content",
                    class: ui.value.content({ class: [props.ui?.content, item.ui?.content] })
                  }, {
                    default: withCtx((_, _push, _parent, _scopeId) => {
                      if (_push) {
                        ssrRenderSlot(_ctx.$slots, item.slot || 'content', {
                          item: item,
                          index: index,
                          open: open,
                          ui: ui.value
                        }, () => {
                          _push(`<div data-slot="body" class="${
                            ssrRenderClass(ui.value.body({ class: [props.ui?.body, item.ui?.body] }))
                          }"${
                            _scopeId
                          }>`);
                          ssrRenderSlot(_ctx.$slots, item.slot ? `${item.slot}-body` : 'body', {
                            item: item,
                            index: index,
                            open: open,
                            ui: ui.value
                          }, () => {
                            _push(`${ssrInterpolate(item.content)}`);
                          }, _push, _parent, _scopeId);
                          _push(`</div>`);
                        }, _push, _parent, _scopeId);
                      } else {
                        return [
                          renderSlot(_ctx.$slots, item.slot || 'content', {
                            item: item,
                            index: index,
                            open: open,
                            ui: ui.value
                          }, () => [
                            createVNode("div", {
                              "data-slot": "body",
                              class: ui.value.body({ class: [props.ui?.body, item.ui?.body] })
                            }, [
                              renderSlot(_ctx.$slots, item.slot ? `${item.slot}-body` : 'body', {
                                item: item,
                                index: index,
                                open: open,
                                ui: ui.value
                              }, () => [
                                createTextVNode(toDisplayString(item.content), 1 /* TEXT */)
                              ])
                            ], 2 /* CLASS */)
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
                  createVNode(unref(AccordionHeader), {
                    as: "div",
                    "data-slot": "header",
                    class: ui.value.header({ class: [props.ui?.header, item.ui?.header] })
                  }, {
                    default: withCtx(() => [
                      createVNode(unref(AccordionTrigger), {
                        "data-slot": "trigger",
                        class: ui.value.trigger({ class: [props.ui?.trigger, item.ui?.trigger], disabled: item.disabled })
                      }, {
                        default: withCtx(() => [
                          renderSlot(_ctx.$slots, "leading", {
                            item: item,
                            index: index,
                            open: open,
                            ui: ui.value
                          }, () => [
                            (item.icon)
                              ? (openBlock(), createBlock(_sfc_main$2, {
                                  key: 0,
                                  name: item.icon,
                                  "data-slot": "leadingIcon",
                                  class: ui.value.leadingIcon({ class: [props.ui?.leadingIcon, item?.ui?.leadingIcon] })
                                }, null, 8 /* PROPS */, ["name", "class"]))
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
                                  index: index,
                                  open: open
                                }, () => [
                                  createTextVNode(toDisplayString(unref(get)(item, props.labelKey)), 1 /* TEXT */)
                                ])
                              ], 2 /* CLASS */))
                            : createCommentVNode("v-if", true),
                          renderSlot(_ctx.$slots, "trailing", {
                            item: item,
                            index: index,
                            open: open,
                            ui: ui.value
                          }, () => [
                            createVNode(_sfc_main$2, {
                              name: item.trailingIcon || __props.trailingIcon || unref(appConfig).ui.icons.chevronDown,
                              "data-slot": "trailingIcon",
                              class: ui.value.trailingIcon({ class: [props.ui?.trailingIcon, item.ui?.trailingIcon] })
                            }, null, 8 /* PROPS */, ["name", "class"])
                          ])
                        ]),
                        _: 2 /* DYNAMIC */
                      }, 1032 /* PROPS, DYNAMIC_SLOTS */, ["class"])
                    ]),
                    _: 2 /* DYNAMIC */
                  }, 1032 /* PROPS, DYNAMIC_SLOTS */, ["class"]),
                  (item.content || !!slots.content || item.slot && !!slots[item.slot] || !!slots.body || item.slot && !!slots[`${item.slot}-body`])
                    ? (openBlock(), createBlock(unref(AccordionContent), {
                        key: 0,
                        "data-slot": "content",
                        class: ui.value.content({ class: [props.ui?.content, item.ui?.content] })
                      }, {
                        default: withCtx(() => [
                          renderSlot(_ctx.$slots, item.slot || 'content', {
                            item: item,
                            index: index,
                            open: open,
                            ui: ui.value
                          }, () => [
                            createVNode("div", {
                              "data-slot": "body",
                              class: ui.value.body({ class: [props.ui?.body, item.ui?.body] })
                            }, [
                              renderSlot(_ctx.$slots, item.slot ? `${item.slot}-body` : 'body', {
                                item: item,
                                index: index,
                                open: open,
                                ui: ui.value
                              }, () => [
                                createTextVNode(toDisplayString(item.content), 1 /* TEXT */)
                              ])
                            ], 2 /* CLASS */)
                          ])
                        ]),
                        _: 2 /* DYNAMIC */
                      }, 1032 /* PROPS, DYNAMIC_SLOTS */, ["class"]))
                    : createCommentVNode("v-if", true)
                ]
              }
            }),
            _: 2 /* DYNAMIC */
          }, _parent, _scopeId));
        });
        _push(`<!--]-->`);
      } else {
        return [
          (openBlock(true), createBlock(Fragment, null, renderList(props.items, (item, index) => {
            return (openBlock(), createBlock(unref(AccordionItem), {
              key: index,
              value: item.value || String(index),
              disabled: item.disabled,
              "data-slot": "item",
              class: ui.value.item({ class: [props.ui?.item, item.ui?.item, item.class] })
            }, {
              default: withCtx(({ open }) => [
                createVNode(unref(AccordionHeader), {
                  as: "div",
                  "data-slot": "header",
                  class: ui.value.header({ class: [props.ui?.header, item.ui?.header] })
                }, {
                  default: withCtx(() => [
                    createVNode(unref(AccordionTrigger), {
                      "data-slot": "trigger",
                      class: ui.value.trigger({ class: [props.ui?.trigger, item.ui?.trigger], disabled: item.disabled })
                    }, {
                      default: withCtx(() => [
                        renderSlot(_ctx.$slots, "leading", {
                          item: item,
                          index: index,
                          open: open,
                          ui: ui.value
                        }, () => [
                          (item.icon)
                            ? (openBlock(), createBlock(_sfc_main$2, {
                                key: 0,
                                name: item.icon,
                                "data-slot": "leadingIcon",
                                class: ui.value.leadingIcon({ class: [props.ui?.leadingIcon, item?.ui?.leadingIcon] })
                              }, null, 8 /* PROPS */, ["name", "class"]))
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
                                index: index,
                                open: open
                              }, () => [
                                createTextVNode(toDisplayString(unref(get)(item, props.labelKey)), 1 /* TEXT */)
                              ])
                            ], 2 /* CLASS */))
                          : createCommentVNode("v-if", true),
                        renderSlot(_ctx.$slots, "trailing", {
                          item: item,
                          index: index,
                          open: open,
                          ui: ui.value
                        }, () => [
                          createVNode(_sfc_main$2, {
                            name: item.trailingIcon || __props.trailingIcon || unref(appConfig).ui.icons.chevronDown,
                            "data-slot": "trailingIcon",
                            class: ui.value.trailingIcon({ class: [props.ui?.trailingIcon, item.ui?.trailingIcon] })
                          }, null, 8 /* PROPS */, ["name", "class"])
                        ])
                      ]),
                      _: 2 /* DYNAMIC */
                    }, 1032 /* PROPS, DYNAMIC_SLOTS */, ["class"])
                  ]),
                  _: 2 /* DYNAMIC */
                }, 1032 /* PROPS, DYNAMIC_SLOTS */, ["class"]),
                (item.content || !!slots.content || item.slot && !!slots[item.slot] || !!slots.body || item.slot && !!slots[`${item.slot}-body`])
                  ? (openBlock(), createBlock(unref(AccordionContent), {
                      key: 0,
                      "data-slot": "content",
                      class: ui.value.content({ class: [props.ui?.content, item.ui?.content] })
                    }, {
                      default: withCtx(() => [
                        renderSlot(_ctx.$slots, item.slot || 'content', {
                          item: item,
                          index: index,
                          open: open,
                          ui: ui.value
                        }, () => [
                          createVNode("div", {
                            "data-slot": "body",
                            class: ui.value.body({ class: [props.ui?.body, item.ui?.body] })
                          }, [
                            renderSlot(_ctx.$slots, item.slot ? `${item.slot}-body` : 'body', {
                              item: item,
                              index: index,
                              open: open,
                              ui: ui.value
                            }, () => [
                              createTextVNode(toDisplayString(item.content), 1 /* TEXT */)
                            ])
                          ], 2 /* CLASS */)
                        ])
                      ]),
                      _: 2 /* DYNAMIC */
                    }, 1032 /* PROPS, DYNAMIC_SLOTS */, ["class"]))
                  : createCommentVNode("v-if", true)
              ]),
              _: 2 /* DYNAMIC */
            }, 1032 /* PROPS, DYNAMIC_SLOTS */, ["value", "disabled", "class"]))
          }), 128 /* KEYED_FRAGMENT */))
        ]
      }
    }),
    _: 3 /* FORWARDED */
  }, _parent));
}
}

};
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext()
  ;(ssrContext.modules || (ssrContext.modules = new Set())).add("node_modules/@nuxt/ui/dist/runtime/components/Accordion.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : undefined
};

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "BlockRenderer",
  __ssrInlineRender: true,
  props: {
    blocks: {},
    showTOC: { type: Boolean, default: false }
  },
  setup(__props) {
    const props = __props;
    function slugify(text) {
      return text.toLowerCase().replace(/<[^>]*>/g, "").replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
    }
    function getYouTubeId(url) {
      const match = url.match(
        /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/
      );
      return match ? match[1] : null;
    }
    function getTikTokId(url) {
      const match = url.match(/tiktok\.com\/@[\w.-]+\/video\/(\d+)/);
      return match ? match[1] : null;
    }
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UCheckbox = _sfc_main$3;
      const _component_UAlert = _sfc_main$4;
      const _component_UAccordion = _sfc_main$1;
      const _component_UButton = _sfc_main$5;
      const _component_UIcon = _sfc_main$2;
      const _component_BlockRenderer = resolveComponent("BlockRenderer", true);
      const _component_UCard = _sfc_main$6;
      const _component_UBadge = _sfc_main$7;
      const _component_UInput = _sfc_main$8;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "block-renderer" }, _attrs))} data-v-38bd03c6><!--[-->`);
      ssrRenderList(props.blocks, (block) => {
        _push(`<!--[--><!-- Heading Block -->`);
        if (block.type === "heading") {
          ssrRenderVNode(_push, createVNode(resolveDynamicComponent(`h${block.data.level}`), {
            id: block.data.anchor || slugify(block.data.text),
            class: [
              "scroll-mt-24",
              {
                "text-left": block.data.alignment === "left",
                "text-center": block.data.alignment === "center",
                "text-right": block.data.alignment === "right"
              }
            ]
          }, null), _parent);
        } else if (block.type === "paragraph") {
          _push(`<!--[--><!-- Paragraph Block --><p class="${ssrRenderClass([
            "leading-relaxed",
            {
              "text-left": block.data.alignment === "left",
              "text-center": block.data.alignment === "center",
              "text-right": block.data.alignment === "right",
              "text-justify": block.data.alignment === "justify",
              "first-letter:text-5xl first-letter:font-bold first-letter:float-left first-letter:mr-3 first-letter:mt-1": block.data.dropCap
            }
          ])}" data-v-38bd03c6>${block.data.text ?? ""}</p><!--]-->`);
        } else if (block.type === "image") {
          _push(`<!--[--><!-- Image Block --><figure class="${ssrRenderClass([
            "my-6",
            {
              "mx-auto max-w-2xl": block.data.alignment === "center",
              "float-left mr-6 max-w-sm": block.data.alignment === "left",
              "float-right ml-6 max-w-sm": block.data.alignment === "right",
              "w-full": block.data.alignment === "full"
            }
          ])}" data-v-38bd03c6>`);
          if (block.data.link) {
            _push(`<a${ssrRenderAttr("href", block.data.link)} target="_blank" rel="noopener" data-v-38bd03c6><img${ssrRenderAttr("src", block.data.src)}${ssrRenderAttr("alt", block.data.alt)}${ssrRenderAttr("width", block.data.width)}${ssrRenderAttr("height", block.data.height)} class="rounded-lg shadow-md w-full h-auto" loading="lazy" data-v-38bd03c6></a>`);
          } else {
            _push(`<img${ssrRenderAttr("src", block.data.src)}${ssrRenderAttr("alt", block.data.alt)}${ssrRenderAttr("width", block.data.width)}${ssrRenderAttr("height", block.data.height)} class="rounded-lg shadow-md w-full h-auto" loading="lazy" data-v-38bd03c6>`);
          }
          if (block.data.caption) {
            _push(`<figcaption class="mt-2 text-sm text-center text-gray-500 dark:text-gray-400" data-v-38bd03c6>${ssrInterpolate(block.data.caption)}</figcaption>`);
          } else {
            _push(`<!---->`);
          }
          _push(`</figure><!--]-->`);
        } else if (block.type === "gallery") {
          _push(`<!--[--><!-- Gallery Block --><div class="${ssrRenderClass([
            "grid my-6",
            {
              "grid-cols-2": block.data.columns === 2,
              "grid-cols-3": block.data.columns === 3,
              "grid-cols-4": block.data.columns === 4,
              "gap-2": block.data.gap === "sm",
              "gap-4": block.data.gap === "md" || !block.data.gap,
              "gap-6": block.data.gap === "lg"
            }
          ])}" data-v-38bd03c6><!--[-->`);
          ssrRenderList(block.data.images, (image, idx) => {
            _push(`<figure class="relative" data-v-38bd03c6><img${ssrRenderAttr("src", image.src)}${ssrRenderAttr("alt", image.alt)} class="rounded-lg w-full h-48 object-cover" loading="lazy" data-v-38bd03c6>`);
            if (image.caption) {
              _push(`<figcaption class="mt-1 text-xs text-gray-500 dark:text-gray-400 truncate" data-v-38bd03c6>${ssrInterpolate(image.caption)}</figcaption>`);
            } else {
              _push(`<!---->`);
            }
            _push(`</figure>`);
          });
          _push(`<!--]--></div><!--]-->`);
        } else if (block.type === "list") {
          _push(`<!--[--><!-- List Block -->`);
          ssrRenderVNode(_push, createVNode(resolveDynamicComponent(block.data.style === "ordered" ? "ol" : "ul"), {
            class: [
              "my-4 ml-6",
              {
                "list-decimal": block.data.style === "ordered",
                "list-disc": block.data.style === "unordered",
                "list-none": block.data.style === "checklist"
              }
            ]
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`<!--[-->`);
                ssrRenderList(block.data.items, (item, idx) => {
                  _push2(`<li class="mb-2" data-v-38bd03c6${_scopeId}><div class="flex items-start gap-2" data-v-38bd03c6${_scopeId}>`);
                  if (block.data.style === "checklist") {
                    _push2(ssrRenderComponent(_component_UCheckbox, {
                      "model-value": item.checked,
                      disabled: "",
                      class: "mt-0.5"
                    }, null, _parent2, _scopeId));
                  } else {
                    _push2(`<!---->`);
                  }
                  _push2(`<span data-v-38bd03c6${_scopeId}>${item.text ?? ""}</span></div>`);
                  if (item.children?.length) {
                    _push2(`<ul class="mt-2 ml-6 list-disc" data-v-38bd03c6${_scopeId}><!--[-->`);
                    ssrRenderList(item.children, (child, cidx) => {
                      _push2(`<li class="mb-1" data-v-38bd03c6${_scopeId}>${child.text ?? ""}</li>`);
                    });
                    _push2(`<!--]--></ul>`);
                  } else {
                    _push2(`<!---->`);
                  }
                  _push2(`</li>`);
                });
                _push2(`<!--]-->`);
              } else {
                return [
                  (openBlock(true), createBlock(
                    Fragment,
                    null,
                    renderList(block.data.items, (item, idx) => {
                      return openBlock(), createBlock("li", {
                        key: idx,
                        class: "mb-2"
                      }, [
                        createVNode("div", { class: "flex items-start gap-2" }, [
                          block.data.style === "checklist" ? (openBlock(), createBlock(_component_UCheckbox, {
                            key: 0,
                            "model-value": item.checked,
                            disabled: "",
                            class: "mt-0.5"
                          }, null, 8, ["model-value"])) : createCommentVNode("v-if", true),
                          createVNode("span", {
                            innerHTML: item.text
                          }, null, 8, ["innerHTML"])
                        ]),
                        item.children?.length ? (openBlock(), createBlock("ul", {
                          key: 0,
                          class: "mt-2 ml-6 list-disc"
                        }, [
                          (openBlock(true), createBlock(
                            Fragment,
                            null,
                            renderList(item.children, (child, cidx) => {
                              return openBlock(), createBlock("li", {
                                key: cidx,
                                class: "mb-1",
                                innerHTML: child.text
                              }, null, 8, ["innerHTML"]);
                            }),
                            128
                            /* KEYED_FRAGMENT */
                          ))
                        ])) : createCommentVNode("v-if", true)
                      ]);
                    }),
                    128
                    /* KEYED_FRAGMENT */
                  ))
                ];
              }
            }),
            _: 2
            /* DYNAMIC */
          }), _parent);
          _push(`<!--]-->`);
        } else if (block.type === "quote") {
          _push(`<!--[--><!-- Quote Block --><blockquote class="${ssrRenderClass([
            "my-6",
            {
              "border-l-4 border-primary-500 pl-4 italic": block.data.style === "default" || !block.data.style,
              "text-xl font-medium text-center py-6": block.data.style === "large",
              "border border-gray-200 dark:border-gray-700 rounded-lg p-4": block.data.style === "bordered",
              "bg-primary-50 dark:bg-primary-900/20 rounded-lg p-4": block.data.style === "highlighted"
            }
          ])}" data-v-38bd03c6><p data-v-38bd03c6>${block.data.text ?? ""}</p>`);
          if (block.data.citation) {
            _push(`<cite class="block mt-2 text-sm text-gray-500 dark:text-gray-400 not-italic" data-v-38bd03c6> — ${ssrInterpolate(block.data.citation)}</cite>`);
          } else {
            _push(`<!---->`);
          }
          _push(`</blockquote><!--]-->`);
        } else if (block.type === "code") {
          _push(`<!--[--><!-- Code Block --><div class="my-6" data-v-38bd03c6>`);
          if (block.data.filename) {
            _push(`<div class="bg-gray-800 text-gray-300 px-4 py-2 text-sm font-mono rounded-t-lg" data-v-38bd03c6>${ssrInterpolate(block.data.filename)}</div>`);
          } else {
            _push(`<!---->`);
          }
          _push(`<pre class="${ssrRenderClass([
            "bg-gray-900 text-gray-100 p-4 overflow-x-auto text-sm",
            block.data.filename ? "rounded-b-lg" : "rounded-lg"
          ])}" data-v-38bd03c6><code class="${ssrRenderClass(block.data.language ? `language-${block.data.language}` : "")}" data-v-38bd03c6>${ssrInterpolate(block.data.code)}</code></pre></div><!--]-->`);
        } else if (block.type === "table") {
          _push(`<!--[--><!-- Table Block --><div class="my-6 overflow-x-auto" data-v-38bd03c6><table class="${ssrRenderClass([
            "w-full",
            {
              "divide-y divide-gray-200 dark:divide-gray-700": !block.data.bordered,
              "border border-gray-200 dark:border-gray-700": block.data.bordered
            }
          ])}" data-v-38bd03c6><thead class="bg-gray-50 dark:bg-gray-800" data-v-38bd03c6><tr data-v-38bd03c6><!--[-->`);
          ssrRenderList(block.data.headers, (header, idx) => {
            _push(`<th class="${ssrRenderClass([{ "border border-gray-200 dark:border-gray-700": block.data.bordered }, "px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"])}" data-v-38bd03c6>${ssrInterpolate(header)}</th>`);
          });
          _push(`<!--]--></tr></thead><tbody class="${ssrRenderClass({
            "divide-y divide-gray-200 dark:divide-gray-700": !block.data.striped
          })}" data-v-38bd03c6><!--[-->`);
          ssrRenderList(block.data.rows, (row, ridx) => {
            _push(`<tr class="${ssrRenderClass({
              "bg-gray-50 dark:bg-gray-800/50": block.data.striped && ridx % 2 === 1
            })}" data-v-38bd03c6><!--[-->`);
            ssrRenderList(row, (cell, cidx) => {
              _push(`<td class="${ssrRenderClass([
                "px-4 text-sm",
                block.data.compact ? "py-2" : "py-4",
                { "border border-gray-200 dark:border-gray-700": block.data.bordered }
              ])}" data-v-38bd03c6>${cell ?? ""}</td>`);
            });
            _push(`<!--]--></tr>`);
          });
          _push(`<!--]--></tbody></table></div><!--]-->`);
        } else if (block.type === "divider") {
          _push(`<!--[--><!-- Divider Block --><hr class="${ssrRenderClass([
            {
              "border-solid": block.data.style === "solid" || !block.data.style,
              "border-dashed": block.data.style === "dashed",
              "border-dotted": block.data.style === "dotted",
              "my-4": block.data.spacing === "sm",
              "my-8": block.data.spacing === "md" || !block.data.spacing,
              "my-12": block.data.spacing === "lg",
              "border-0 h-1 bg-linear-to-r from-transparent via-gray-300 dark:via-gray-600 to-transparent": block.data.style === "gradient"
            }
          ])}" data-v-38bd03c6><!--]-->`);
        } else if (block.type === "embed") {
          _push(`<!--[--><!-- Embed Block (YouTube, TikTok, etc.) --><div class="my-6" data-v-38bd03c6><!-- YouTube -->`);
          if (block.data.provider === "youtube" || getYouTubeId(block.data.url)) {
            _push(`<div class="${ssrRenderClass([
              "relative w-full",
              {
                "aspect-video": block.data.aspectRatio === "16:9" || !block.data.aspectRatio,
                "aspect-4/3": block.data.aspectRatio === "4:3",
                "aspect-square": block.data.aspectRatio === "1:1",
                "aspect-9/16": block.data.aspectRatio === "9:16"
              }
            ])}" data-v-38bd03c6><iframe${ssrRenderAttr("src", `https://www.youtube.com/embed/${getYouTubeId(block.data.url)}`)} class="absolute inset-0 w-full h-full rounded-lg" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen data-v-38bd03c6></iframe></div>`);
          } else if (block.data.provider === "tiktok" || getTikTokId(block.data.url)) {
            _push(`<!--[--><!-- TikTok --><div class="flex justify-center" data-v-38bd03c6><iframe${ssrRenderAttr("src", `https://www.tiktok.com/embed/v2/${getTikTokId(block.data.url)}`)} class="rounded-lg" style="${ssrRenderStyle({ "width": "325px", "height": "750px" })}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen data-v-38bd03c6></iframe></div><!--]-->`);
          } else {
            _push(`<!--[--><!-- Generic embed --><div class="aspect-video w-full" data-v-38bd03c6><iframe${ssrRenderAttr("src", block.data.url)} class="w-full h-full rounded-lg" frameborder="0" data-v-38bd03c6></iframe></div><!--]-->`);
          }
          if (block.data.caption) {
            _push(`<p class="mt-2 text-sm text-center text-gray-500 dark:text-gray-400" data-v-38bd03c6>${ssrInterpolate(block.data.caption)}</p>`);
          } else {
            _push(`<!---->`);
          }
          _push(`</div><!--]-->`);
        } else if (block.type === "alert") {
          _push(`<!--[--><!-- Alert Block -->`);
          _push(ssrRenderComponent(_component_UAlert, {
            title: block.data.title,
            description: block.data.text,
            color: block.data.type === "error" ? "red" : block.data.type === "success" ? "green" : block.data.type === "warning" ? "yellow" : block.data.type === "tip" ? "purple" : "blue",
            icon: block.data.icon,
            class: "my-6"
          }, null, _parent));
          _push(`<!--]-->`);
        } else if (block.type === "accordion") {
          _push(`<!--[--><!-- Accordion Block -->`);
          _push(ssrRenderComponent(_component_UAccordion, {
            items: block.data.items.map((item, idx) => ({
              label: item.title,
              content: item.content,
              defaultOpen: item.defaultOpen,
              slot: `item-${idx}`
            })),
            multiple: block.data.allowMultiple,
            class: "my-6"
          }, createSlots({
            _: 2
            /* DYNAMIC */
          }, [
            renderList(block.data.items, (item, idx) => {
              return {
                name: `item-${idx}`,
                fn: withCtx((_, _push2, _parent2, _scopeId) => {
                  if (_push2) {
                    _push2(`<div class="prose dark:prose-invert max-w-none" data-v-38bd03c6${_scopeId}>${item.content ?? ""}</div>`);
                  } else {
                    return [
                      (openBlock(), createBlock("div", {
                        innerHTML: item.content,
                        class: "prose dark:prose-invert max-w-none"
                      }, null, 8, ["innerHTML"]))
                    ];
                  }
                })
              };
            })
          ]), _parent));
          _push(`<!--]-->`);
        } else if (block.type === "button") {
          _push(`<!--[--><!-- Button Block --><div class="${ssrRenderClass([
            "my-6 flex",
            {
              "justify-start": block.data.alignment === "left" || !block.data.alignment,
              "justify-center": block.data.alignment === "center",
              "justify-end": block.data.alignment === "right"
            }
          ])}" data-v-38bd03c6>`);
          _push(ssrRenderComponent(_component_UButton, {
            to: block.data.url,
            target: block.data.newTab ? "_blank" : void 0,
            variant: block.data.style === "outline" ? "outline" : block.data.style === "ghost" ? "ghost" : block.data.style === "secondary" ? "soft" : "solid",
            color: block.data.style === "secondary" ? "neutral" : "primary",
            size: block.data.size || "md",
            icon: block.data.iconPosition === "left" ? block.data.icon : void 0,
            "trailing-icon": block.data.iconPosition === "right" ? block.data.icon : void 0,
            class: [
              block.data.fullWidth ? "w-full" : "",
              // FIX: paksa label + semua child (termasuk svg icon) jadi putih
              "text-white! **:text-white! [&_svg]:stroke-white! [&_svg]:fill-white!"
            ]
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`${ssrInterpolate(block.data.text || "Button")}`);
              } else {
                return [
                  createTextVNode(
                    toDisplayString(block.data.text || "Button"),
                    1
                    /* TEXT */
                  )
                ];
              }
            }),
            _: 2
            /* DYNAMIC */
          }, _parent));
          _push(`</div><!--]-->`);
        } else if (block.type === "cta-box") {
          _push(`<!--[--><!-- CTA Box Block --><div class="${ssrRenderClass([
            // layout
            "my-8 rounded-xl p-8 text-center",
            // FIX: pastikan semua teks di dalam CTA putih + matikan efek typography (prose)
            "text-white! not-prose",
            // background variants
            {
              "bg-primary-500 dark:bg-primary-600": block.data.style === "default" || !block.data.style,
              "bg-linear-to-r from-primary-500 to-primary-700": block.data.style === "gradient"
            }
          ])}" style="${ssrRenderStyle(
            block.data.style === "image" && block.data.backgroundImage ? {
              backgroundImage: `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url(${block.data.backgroundImage})`,
              backgroundSize: "cover",
              backgroundPosition: "center"
            } : block.data.backgroundColor ? { backgroundColor: block.data.backgroundColor } : void 0
          )}" data-v-38bd03c6><h3 class="text-2xl font-bold mb-2 text-white!" data-v-38bd03c6>${ssrInterpolate(block.data.title)}</h3>`);
          if (block.data.description) {
            _push(`<p class="mb-6 text-white/90!" data-v-38bd03c6>${ssrInterpolate(block.data.description)}</p>`);
          } else {
            _push(`<!---->`);
          }
          _push(ssrRenderComponent(_component_UButton, {
            to: block.data.buttonUrl,
            color: "neutral",
            variant: "solid",
            class: "bg-white! text-primary-600! hover:bg-gray-100!",
            size: "lg"
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`${ssrInterpolate(block.data.buttonText || "Klik di sini")}`);
              } else {
                return [
                  createTextVNode(
                    toDisplayString(block.data.buttonText || "Klik di sini"),
                    1
                    /* TEXT */
                  )
                ];
              }
            }),
            _: 2
            /* DYNAMIC */
          }, _parent));
          _push(`</div><!--]-->`);
        } else if (block.type === "pros-cons") {
          _push(`<!--[--><!-- Pros & Cons Block --><div class="my-6" data-v-38bd03c6>`);
          if (block.data.title) {
            _push(`<h4 class="text-lg font-semibold mb-4" data-v-38bd03c6>${ssrInterpolate(block.data.title)}</h4>`);
          } else {
            _push(`<!---->`);
          }
          _push(`<div class="${ssrRenderClass([
            "grid gap-4",
            block.data.style === "side-by-side" ? "md:grid-cols-2" : "grid-cols-1"
          ])}" data-v-38bd03c6><!-- Pros --><div class="bg-green-50 dark:bg-green-900/20 rounded-lg p-4" data-v-38bd03c6><h5 class="font-semibold text-green-700 dark:text-green-400 mb-3 flex items-center gap-2" data-v-38bd03c6>`);
          _push(ssrRenderComponent(_component_UIcon, {
            name: "i-lucide-thumbs-up",
            class: "w-5 h-5"
          }, null, _parent));
          _push(` Kelebihan </h5><ul class="space-y-2" data-v-38bd03c6><!--[-->`);
          ssrRenderList(block.data.pros, (pro, idx) => {
            _push(`<li class="flex items-start gap-2 text-sm" data-v-38bd03c6>`);
            _push(ssrRenderComponent(_component_UIcon, {
              name: "i-lucide-check",
              class: "w-4 h-4 text-green-500 mt-0.5 shrink-0"
            }, null, _parent));
            _push(`<span data-v-38bd03c6>${ssrInterpolate(pro)}</span></li>`);
          });
          _push(`<!--]--></ul></div><!-- Cons --><div class="bg-red-50 dark:bg-red-900/20 rounded-lg p-4" data-v-38bd03c6><h5 class="font-semibold text-red-700 dark:text-red-400 mb-3 flex items-center gap-2" data-v-38bd03c6>`);
          _push(ssrRenderComponent(_component_UIcon, {
            name: "i-lucide-thumbs-down",
            class: "w-5 h-5"
          }, null, _parent));
          _push(` Kekurangan </h5><ul class="space-y-2" data-v-38bd03c6><!--[-->`);
          ssrRenderList(block.data.cons, (con, idx) => {
            _push(`<li class="flex items-start gap-2 text-sm" data-v-38bd03c6>`);
            _push(ssrRenderComponent(_component_UIcon, {
              name: "i-lucide-x",
              class: "w-4 h-4 text-red-500 mt-0.5 shrink-0"
            }, null, _parent));
            _push(`<span data-v-38bd03c6>${ssrInterpolate(con)}</span></li>`);
          });
          _push(`<!--]--></ul></div></div></div><!--]-->`);
        } else if (block.type === "rating-box") {
          _push(`<!--[--><!-- Rating Box Block --><div class="${ssrRenderClass([
            "my-6 border border-gray-200 dark:border-gray-700 rounded-xl p-6",
            { "p-4": block.data.style === "compact" }
          ])}" data-v-38bd03c6>`);
          if (block.data.title) {
            _push(`<h4 class="font-semibold mb-4" data-v-38bd03c6>${ssrInterpolate(block.data.title)}</h4>`);
          } else {
            _push(`<!---->`);
          }
          _push(`<div class="flex items-center gap-4 mb-4" data-v-38bd03c6><div class="text-4xl font-bold text-primary-600" data-v-38bd03c6>${ssrInterpolate(Number(block.data.overallRating || 0).toFixed(1))}</div><div data-v-38bd03c6><div class="flex gap-1" data-v-38bd03c6><!--[-->`);
          ssrRenderList(block.data.maxRating || 5, (star) => {
            _push(ssrRenderComponent(_component_UIcon, {
              key: star,
              name: star <= Math.floor(Number(block.data.overallRating || 0)) ? "i-lucide-star" : star - 0.5 <= Number(block.data.overallRating || 0) ? "i-lucide-star-half" : "i-lucide-star",
              class: [
                "w-5 h-5",
                star <= Number(block.data.overallRating || 0) ? "text-yellow-400" : "text-gray-300 dark:text-gray-600"
              ]
            }, null, _parent));
          });
          _push(`<!--]--></div><p class="text-sm text-gray-500 dark:text-gray-400" data-v-38bd03c6> dari ${ssrInterpolate(block.data.maxRating || 5)} bintang </p></div></div><!-- Criteria -->`);
          if (block.data.criteria?.length && block.data.style !== "compact") {
            _push(`<div class="space-y-3" data-v-38bd03c6><!--[-->`);
            ssrRenderList(block.data.criteria, (criterion, idx) => {
              _push(`<div class="flex items-center gap-3" data-v-38bd03c6><span class="w-32 text-sm text-gray-600 dark:text-gray-400" data-v-38bd03c6>${ssrInterpolate(criterion.label)}</span><div class="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-2" data-v-38bd03c6><div class="bg-primary-500 h-2 rounded-full" style="${ssrRenderStyle({
                width: `${criterion.rating / (block.data.maxRating || 5) * 100}%`
              })}" data-v-38bd03c6></div></div><span class="w-8 text-sm font-medium" data-v-38bd03c6>${ssrInterpolate(criterion.rating)}</span></div>`);
            });
            _push(`<!--]--></div>`);
          } else {
            _push(`<!---->`);
          }
          _push(`<!-- Verdict -->`);
          if (block.data.verdict && block.data.style !== "compact") {
            _push(`<p class="mt-4 text-sm bg-gray-50 dark:bg-gray-800 rounded-lg p-3" data-v-38bd03c6><strong data-v-38bd03c6>Kesimpulan:</strong> ${ssrInterpolate(block.data.verdict)}</p>`);
          } else {
            _push(`<!---->`);
          }
          _push(`</div><!--]-->`);
        } else if (block.type === "comparison-table") {
          _push(`<!--[--><!-- Comparison Table Block --><div class="my-6 overflow-x-auto" data-v-38bd03c6>`);
          if (block.data.title) {
            _push(`<h4 class="font-semibold mb-4" data-v-38bd03c6>${ssrInterpolate(block.data.title)}</h4>`);
          } else {
            _push(`<!---->`);
          }
          _push(`<table class="w-full border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden" data-v-38bd03c6><thead class="bg-gray-50 dark:bg-gray-800" data-v-38bd03c6><tr data-v-38bd03c6><th class="px-4 py-3 text-left text-sm font-medium text-gray-500 dark:text-gray-400 border-b border-gray-200 dark:border-gray-700" data-v-38bd03c6> Fitur </th><!--[-->`);
          ssrRenderList(block.data.headers, (header, idx) => {
            _push(`<th class="${ssrRenderClass([
              "px-4 py-3 text-center text-sm font-medium border-b border-gray-200 dark:border-gray-700",
              block.data.highlightColumn === idx ? "bg-primary-50 dark:bg-primary-900/30 text-primary-700 dark:text-primary-400" : "text-gray-500 dark:text-gray-400"
            ])}" data-v-38bd03c6>${ssrInterpolate(header)}</th>`);
          });
          _push(`<!--]--></tr></thead><tbody data-v-38bd03c6><!--[-->`);
          ssrRenderList(block.data.features, (feature, fidx) => {
            _push(`<tr class="border-b border-gray-200 dark:border-gray-700 last:border-0" data-v-38bd03c6><td class="px-4 py-3 text-sm font-medium text-gray-900 dark:text-white" data-v-38bd03c6>${ssrInterpolate(feature.label)}</td><!--[-->`);
            ssrRenderList(feature.values, (value, vidx) => {
              _push(`<td class="${ssrRenderClass([
                "px-4 py-3 text-center text-sm",
                block.data.highlightColumn === vidx ? "bg-primary-50/50 dark:bg-primary-900/10" : ""
              ])}" data-v-38bd03c6>`);
              if (typeof value === "boolean") {
                _push(ssrRenderComponent(_component_UIcon, {
                  name: value ? "i-lucide-check" : "i-lucide-x",
                  class: [value ? "text-green-500" : "text-red-500", "w-5 h-5 mx-auto"]
                }, null, _parent));
              } else {
                _push(`<!--[-->${ssrInterpolate(value)}<!--]-->`);
              }
              _push(`</td>`);
            });
            _push(`<!--]--></tr>`);
          });
          _push(`<!--]--></tbody></table></div><!--]-->`);
        } else if (block.type === "toc") {
          _push(`<!--[--><!-- Table of Contents Block --><nav class="my-6 bg-gray-50 dark:bg-gray-800 rounded-lg p-4" data-v-38bd03c6><h4 class="font-semibold mb-3" data-v-38bd03c6>${ssrInterpolate(block.data.title || "Daftar Isi")}</h4><!-- TOC is auto-generated from headings, passed via slot or computed -->`);
          ssrRenderSlot(_ctx.$slots, "toc", {}, () => {
            _push(`<p class="text-sm text-gray-500 dark:text-gray-400" data-v-38bd03c6> Table of contents akan di-generate otomatis </p>`);
          }, _push, _parent);
          _push(`</nav><!--]-->`);
        } else if (block.type === "spacer") {
          _push(`<!--[--><!-- Spacer Block --><div class="${ssrRenderClass({
            "h-4": block.data.height === "xs",
            "h-8": block.data.height === "sm",
            "h-12": block.data.height === "md",
            "h-16": block.data.height === "lg",
            "h-24": block.data.height === "xl"
          })}" data-v-38bd03c6></div><!--]-->`);
        } else if (block.type === "columns") {
          _push(`<!--[--><!-- Columns Block (Recursive) --><div class="${ssrRenderClass([
            "grid my-6",
            {
              "gap-4": block.data.gap === "sm",
              "gap-6": block.data.gap === "md" || !block.data.gap,
              "gap-8": block.data.gap === "lg",
              "items-start": block.data.verticalAlignment === "top",
              "items-center": block.data.verticalAlignment === "center",
              "items-end": block.data.verticalAlignment === "bottom"
            }
          ])}" style="${ssrRenderStyle({
            gridTemplateColumns: block.data.columns.map((col) => {
              switch (col.width) {
                case "1/2":
                  return "1fr";
                case "1/3":
                  return "1fr";
                case "2/3":
                  return "2fr";
                case "1/4":
                  return "1fr";
                case "3/4":
                  return "3fr";
                default:
                  return "auto";
              }
            }).join(" ")
          })}" data-v-38bd03c6><!--[-->`);
          ssrRenderList(block.data.columns, (col, idx) => {
            _push(`<div data-v-38bd03c6>`);
            _push(ssrRenderComponent(_component_BlockRenderer, {
              blocks: col.blocks
            }, null, _parent));
            _push(`</div>`);
          });
          _push(`<!--]--></div><!--]-->`);
        } else if (block.type === "html") {
          _push(`<!--[--><!-- HTML Block --><div class="my-6" data-v-38bd03c6>${block.data.html ?? ""}</div><!--]-->`);
        } else if (block.type === "product-card") {
          _push(`<!--[--><!-- Product Card Block --><div class="my-6" data-v-38bd03c6>`);
          _push(ssrRenderComponent(_component_UCard, {
            class: [
              {
                "flex flex-row": block.data.style === "horizontal"
              }
            ]
          }, createSlots({
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`<div data-v-38bd03c6${_scopeId}><h4 class="font-semibold mb-2" data-v-38bd03c6${_scopeId}>${ssrInterpolate(block.data.name || "Product Name")}</h4><div class="flex items-center gap-2 mb-2" data-v-38bd03c6${_scopeId}><span class="text-lg font-bold text-primary-600" data-v-38bd03c6${_scopeId}> Rp ${ssrInterpolate((block.data.price || 0).toLocaleString("id-ID"))}</span>`);
                if (block.data.originalPrice) {
                  _push2(`<span class="text-sm text-gray-500 line-through" data-v-38bd03c6${_scopeId}> Rp ${ssrInterpolate(block.data.originalPrice.toLocaleString("id-ID"))}</span>`);
                } else {
                  _push2(`<!---->`);
                }
                _push2(`</div>`);
                if (block.data.rating) {
                  _push2(`<div class="flex items-center gap-1 mb-3" data-v-38bd03c6${_scopeId}>`);
                  _push2(ssrRenderComponent(_component_UIcon, {
                    name: "i-lucide-star",
                    class: "w-4 h-4 text-yellow-400"
                  }, null, _parent2, _scopeId));
                  _push2(`<span class="text-sm" data-v-38bd03c6${_scopeId}>${ssrInterpolate(block.data.rating)}</span></div>`);
                } else {
                  _push2(`<!---->`);
                }
                if (block.data.url) {
                  _push2(ssrRenderComponent(_component_UButton, {
                    to: block.data.url,
                    size: "sm",
                    block: ""
                  }, {
                    default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                      if (_push3) {
                        _push3(` Lihat Produk `);
                      } else {
                        return [
                          createTextVNode(" Lihat Produk ")
                        ];
                      }
                    }),
                    _: 2
                    /* DYNAMIC */
                  }, _parent2, _scopeId));
                } else {
                  _push2(`<!---->`);
                }
                _push2(`</div>`);
              } else {
                return [
                  createVNode("div", null, [
                    createVNode(
                      "h4",
                      { class: "font-semibold mb-2" },
                      toDisplayString(block.data.name || "Product Name"),
                      1
                      /* TEXT */
                    ),
                    createVNode("div", { class: "flex items-center gap-2 mb-2" }, [
                      createVNode(
                        "span",
                        { class: "text-lg font-bold text-primary-600" },
                        " Rp " + toDisplayString((block.data.price || 0).toLocaleString("id-ID")),
                        1
                        /* TEXT */
                      ),
                      block.data.originalPrice ? (openBlock(), createBlock(
                        "span",
                        {
                          key: 0,
                          class: "text-sm text-gray-500 line-through"
                        },
                        " Rp " + toDisplayString(block.data.originalPrice.toLocaleString("id-ID")),
                        1
                        /* TEXT */
                      )) : createCommentVNode("v-if", true)
                    ]),
                    block.data.rating ? (openBlock(), createBlock("div", {
                      key: 0,
                      class: "flex items-center gap-1 mb-3"
                    }, [
                      createVNode(_component_UIcon, {
                        name: "i-lucide-star",
                        class: "w-4 h-4 text-yellow-400"
                      }),
                      createVNode(
                        "span",
                        { class: "text-sm" },
                        toDisplayString(block.data.rating),
                        1
                        /* TEXT */
                      )
                    ])) : createCommentVNode("v-if", true),
                    block.data.url ? (openBlock(), createBlock(_component_UButton, {
                      key: 1,
                      to: block.data.url,
                      size: "sm",
                      block: ""
                    }, {
                      default: withCtx(() => [
                        createTextVNode(" Lihat Produk ")
                      ]),
                      _: 1
                      /* STABLE */
                    }, 8, ["to"])) : createCommentVNode("v-if", true)
                  ])
                ];
              }
            }),
            _: 2
            /* DYNAMIC */
          }, [
            block.data.style !== "minimal" ? {
              name: "header",
              fn: withCtx((_, _push2, _parent2, _scopeId) => {
                if (_push2) {
                  _push2(`<div class="relative" data-v-38bd03c6${_scopeId}><img${ssrRenderAttr("src", block.data.image || "/images/placeholder-product.jpg")}${ssrRenderAttr("alt", block.data.name || "Product")} class="w-full h-48 object-cover" data-v-38bd03c6${_scopeId}>`);
                  if (block.data.badge) {
                    _push2(ssrRenderComponent(_component_UBadge, {
                      color: "red",
                      class: "absolute top-2 left-2"
                    }, {
                      default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                        if (_push3) {
                          _push3(`${ssrInterpolate(block.data.badge)}`);
                        } else {
                          return [
                            createTextVNode(
                              toDisplayString(block.data.badge),
                              1
                              /* TEXT */
                            )
                          ];
                        }
                      }),
                      _: 2
                      /* DYNAMIC */
                    }, _parent2, _scopeId));
                  } else {
                    _push2(`<!---->`);
                  }
                  _push2(`</div>`);
                } else {
                  return [
                    createVNode("div", { class: "relative" }, [
                      createVNode("img", {
                        src: block.data.image || "/images/placeholder-product.jpg",
                        alt: block.data.name || "Product",
                        class: "w-full h-48 object-cover"
                      }, null, 8, ["src", "alt"]),
                      block.data.badge ? (openBlock(), createBlock(
                        _component_UBadge,
                        {
                          key: 0,
                          color: "red",
                          class: "absolute top-2 left-2"
                        },
                        {
                          default: withCtx(() => [
                            createTextVNode(
                              toDisplayString(block.data.badge),
                              1
                              /* TEXT */
                            )
                          ]),
                          _: 2
                          /* DYNAMIC */
                        },
                        1024
                        /* DYNAMIC_SLOTS */
                      )) : createCommentVNode("v-if", true)
                    ])
                  ];
                }
              }),
              key: "0"
            } : void 0
          ]), _parent));
          _push(`</div><!--]-->`);
        } else if (block.type === "newsletter") {
          _push(`<!--[--><!-- Newsletter Block --><div class="${ssrRenderClass([
            "my-8 rounded-xl p-6",
            block.data.style === "card" ? "border border-gray-200 dark:border-gray-700" : "bg-gray-100 dark:bg-gray-800"
          ])}" style="${ssrRenderStyle(block.data.backgroundColor ? { backgroundColor: block.data.backgroundColor } : void 0)}" data-v-38bd03c6><h3 class="text-xl font-bold mb-2" data-v-38bd03c6>${ssrInterpolate(block.data.title || "Berlangganan Newsletter")}</h3><p class="text-gray-600 dark:text-gray-400 mb-4" data-v-38bd03c6>${ssrInterpolate(block.data.description || "Dapatkan update artikel terbaru langsung di inbox Anda.")}</p><form class="${ssrRenderClass([
            "flex gap-2",
            block.data.style === "inline" ? "flex-row" : "flex-col sm:flex-row"
          ])}" data-v-38bd03c6>`);
          _push(ssrRenderComponent(_component_UInput, {
            type: "email",
            placeholder: "Email Anda",
            class: "flex-1"
          }, null, _parent));
          _push(ssrRenderComponent(_component_UButton, { type: "submit" }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`${ssrInterpolate(block.data.buttonText || "Berlangganan")}`);
              } else {
                return [
                  createTextVNode(
                    toDisplayString(block.data.buttonText || "Berlangganan"),
                    1
                    /* TEXT */
                  )
                ];
              }
            }),
            _: 2
            /* DYNAMIC */
          }, _parent));
          _push(`</form></div><!--]-->`);
        } else {
          _push(`<!--[--><!-- Fallback for unknown block types --><div class="my-4 p-4 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg" data-v-38bd03c6><p class="text-sm text-yellow-700 dark:text-yellow-400" data-v-38bd03c6> Block type &quot;${ssrInterpolate(block.type)}&quot; tidak dikenali </p></div><!--]-->`);
        }
        _push(`<!--]-->`);
      });
      _push(`<!--]--></div>`);
    };
  }
});

/* unplugin-vue-components disabled */

const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("inertia/components/article/BlockRenderer.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const BlockRenderer = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-38bd03c6"]]);

export { BlockRenderer as B };
