import { a as _sfc_main$1 } from './Badge-CQlYH3Fo.js';
import { defineComponent, mergeProps, unref, withCtx, createTextVNode, toDisplayString, useSSRContext } from 'vue';
import { ssrRenderComponent, ssrInterpolate } from 'vue/server-renderer';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "PromotionStatusBadge",
  __ssrInlineRender: true,
  props: {
    status: {}
  },
  setup(__props) {
    const props = __props;
    const statusConfig = {
      active: { label: "Aktif", color: "success" },
      upcoming: { label: "Akan Datang", color: "info" },
      expired: { label: "Kadaluarsa", color: "neutral" },
      inactive: { label: "Nonaktif", color: "warning" }
    };
    const config = statusConfig[props.status] || statusConfig.inactive;
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UBadge = _sfc_main$1;
      _push(ssrRenderComponent(_component_UBadge, mergeProps({
        color: unref(config).color,
        variant: "soft",
        size: "sm"
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`${ssrInterpolate(unref(config).label)}`);
          } else {
            return [
              createTextVNode(
                toDisplayString(unref(config).label),
                1
                /* TEXT */
              )
            ];
          }
        }),
        _: 1
        /* STABLE */
      }, _parent));
    };
  }
});

const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("inertia/components/admin/promotions/PromotionStatusBadge.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as _ };
