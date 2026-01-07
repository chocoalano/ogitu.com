import { useSlots, computed, unref, mergeProps, withCtx, createBlock, createCommentVNode, openBlock, renderSlot, useSSRContext } from 'vue';
import { ssrRenderComponent, ssrRenderClass, ssrRenderSlot } from 'vue/server-renderer';
import { Primitive } from 'reka-ui';
import { a as useAppConfig } from './virtual_nuxt-ui-plugins-BqI2j5ZJ.js';
import { t as tv } from './Button-BBveOjhJ.js';

const theme = {
  "slots": {
    "root": "rounded-lg overflow-hidden",
    "header": "p-4 sm:px-6",
    "body": "p-4 sm:p-6",
    "footer": "p-4 sm:px-6"
  },
  "variants": {
    "variant": {
      "solid": {
        "root": "bg-inverted text-inverted"
      },
      "outline": {
        "root": "bg-default ring ring-default divide-y divide-default"
      },
      "soft": {
        "root": "bg-elevated/50 divide-y divide-default"
      },
      "subtle": {
        "root": "bg-elevated/50 ring ring-default divide-y divide-default"
      }
    }
  },
  "defaultVariants": {
    "variant": "outline"
  }
};

const _sfc_main = {
  __name: 'Card',
  __ssrInlineRender: true,
  props: {
  as: { type: null, required: false },
  variant: { type: null, required: false },
  class: { type: null, required: false },
  ui: { type: null, required: false }
},
  setup(__props) {

const props = __props;
const slots = useSlots();
const appConfig = useAppConfig();
const ui = computed(() => tv({ extend: tv(theme), ...appConfig.ui?.card || {} })({
  variant: props.variant
}));

return (_ctx, _push, _parent, _attrs) => {
  _push(ssrRenderComponent(unref(Primitive), mergeProps({
    as: __props.as,
    "data-slot": "root",
    class: ui.value.root({ class: [props.ui?.root, props.class] })
  }, _attrs), {
    default: withCtx((_, _push, _parent, _scopeId) => {
      if (_push) {
        if (!!slots.header) {
          _push(`<div data-slot="header" class="${
            ssrRenderClass(ui.value.header({ class: props.ui?.header }))
          }"${
            _scopeId
          }>`);
          ssrRenderSlot(_ctx.$slots, "header", {}, null, _push, _parent, _scopeId);
          _push(`</div>`);
        } else {
          _push(`<!---->`);
        }
        if (!!slots.default) {
          _push(`<div data-slot="body" class="${
            ssrRenderClass(ui.value.body({ class: props.ui?.body }))
          }"${
            _scopeId
          }>`);
          ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent, _scopeId);
          _push(`</div>`);
        } else {
          _push(`<!---->`);
        }
        if (!!slots.footer) {
          _push(`<div data-slot="footer" class="${
            ssrRenderClass(ui.value.footer({ class: props.ui?.footer }))
          }"${
            _scopeId
          }>`);
          ssrRenderSlot(_ctx.$slots, "footer", {}, null, _push, _parent, _scopeId);
          _push(`</div>`);
        } else {
          _push(`<!---->`);
        }
      } else {
        return [
          (!!slots.header)
            ? (openBlock(), createBlock("div", {
                key: 0,
                "data-slot": "header",
                class: ui.value.header({ class: props.ui?.header })
              }, [
                renderSlot(_ctx.$slots, "header")
              ], 2 /* CLASS */))
            : createCommentVNode("v-if", true),
          (!!slots.default)
            ? (openBlock(), createBlock("div", {
                key: 1,
                "data-slot": "body",
                class: ui.value.body({ class: props.ui?.body })
              }, [
                renderSlot(_ctx.$slots, "default")
              ], 2 /* CLASS */))
            : createCommentVNode("v-if", true),
          (!!slots.footer)
            ? (openBlock(), createBlock("div", {
                key: 2,
                "data-slot": "footer",
                class: ui.value.footer({ class: props.ui?.footer })
              }, [
                renderSlot(_ctx.$slots, "footer")
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
  ;(ssrContext.modules || (ssrContext.modules = new Set())).add("node_modules/@nuxt/ui/dist/runtime/components/Card.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : undefined
};

export { _sfc_main as _ };
