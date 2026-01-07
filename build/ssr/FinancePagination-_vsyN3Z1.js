import { a as _sfc_main$1 } from './Button-BTdvmZ8N.js';
import { defineComponent, mergeProps, withCtx, createTextVNode, toDisplayString, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrInterpolate, ssrRenderComponent, ssrRenderList } from 'vue/server-renderer';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "FinancePagination",
  __ssrInlineRender: true,
  props: {
    pagination: {}
  },
  emits: ["page-change"],
  setup(__props, { emit: __emit }) {
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UButton = _sfc_main$1;
      if (__props.pagination.lastPage > 1) {
        _push(`<div${ssrRenderAttrs(mergeProps({ class: "flex items-center justify-between" }, _attrs))}><p class="text-sm text-gray-500 dark:text-gray-400"> Menampilkan ${ssrInterpolate((__props.pagination.currentPage - 1) * __props.pagination.perPage + 1)} - ${ssrInterpolate(Math.min(__props.pagination.currentPage * __props.pagination.perPage, __props.pagination.total))} dari ${ssrInterpolate(__props.pagination.total)} data </p><div class="flex items-center gap-2">`);
        _push(ssrRenderComponent(_component_UButton, {
          icon: "i-heroicons-chevron-left",
          color: "neutral",
          variant: "ghost",
          size: "sm",
          disabled: __props.pagination.currentPage <= 1,
          onClick: ($event) => _ctx.$emit("page-change", __props.pagination.currentPage - 1)
        }, null, _parent));
        _push(`<!--[-->`);
        ssrRenderList(__props.pagination.lastPage, (page) => {
          _push(`<!--[-->`);
          if (page === 1 || page === __props.pagination.lastPage || page >= __props.pagination.currentPage - 1 && page <= __props.pagination.currentPage + 1) {
            _push(ssrRenderComponent(_component_UButton, {
              color: page === __props.pagination.currentPage ? "primary" : "neutral",
              variant: page === __props.pagination.currentPage ? "solid" : "ghost",
              size: "sm",
              onClick: ($event) => _ctx.$emit("page-change", page)
            }, {
              default: withCtx((_, _push2, _parent2, _scopeId) => {
                if (_push2) {
                  _push2(`${ssrInterpolate(page)}`);
                } else {
                  return [
                    createTextVNode(
                      toDisplayString(page),
                      1
                      /* TEXT */
                    )
                  ];
                }
              }),
              _: 2
              /* DYNAMIC */
            }, _parent));
          } else if (page === __props.pagination.currentPage - 2 || page === __props.pagination.currentPage + 2) {
            _push(`<span class="text-gray-400"> ... </span>`);
          } else {
            _push(`<!---->`);
          }
          _push(`<!--]-->`);
        });
        _push(`<!--]-->`);
        _push(ssrRenderComponent(_component_UButton, {
          icon: "i-heroicons-chevron-right",
          color: "neutral",
          variant: "ghost",
          size: "sm",
          disabled: __props.pagination.currentPage >= __props.pagination.lastPage,
          onClick: ($event) => _ctx.$emit("page-change", __props.pagination.currentPage + 1)
        }, null, _parent));
        _push(`</div></div>`);
      } else {
        _push(`<!---->`);
      }
    };
  }
});

const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("inertia/components/admin/finance/FinancePagination.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as _ };
