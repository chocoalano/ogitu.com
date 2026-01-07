import { defineComponent, mergeProps, useSSRContext } from 'vue';
import { ssrRenderComponent } from 'vue/server-renderer';
import { A as AdminLayout } from './admin-CGUULoJY.js';
import { _ as _sfc_main$1 } from './FlashSaleForm-CroRwvCK.js';
import './Badge-DaOjA2YD.js';
import 'reka-ui';
import '@vueuse/core';
import './virtual_nuxt-ui-plugins-BqI2j5ZJ.js';
import '@unhead/vue/client';
import 'tailwindcss/colors';
import 'hookable';
import '@inertiajs/vue3';
import 'defu';
import 'ohash/utils';
import '@unhead/vue';
import './Button-BBveOjhJ.js';
import 'tailwind-variants';
import '@iconify/vue';
import 'ufo';
import 'reka-ui/namespaced';
import './Tooltip-N44Fzd4m.js';
import './Switch-BkqmHkc6.js';
import './Textarea-DTaAAeeU.js';
import './FormField-BIqlRgyi.js';
import './Card-Ci6a5H8H.js';
import './CurrencyInput-Cdh5jdqQ.js';

const _sfc_main = /* @__PURE__ */ defineComponent({
  ...{
    layout: AdminLayout
  },
  __name: "edit",
  __ssrInlineRender: true,
  props: {
    flashSale: {},
    products: {}
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(_sfc_main$1, mergeProps({
        mode: "edit",
        "flash-sale": __props.flashSale,
        products: __props.products
      }, _attrs), null, _parent));
    };
  }
});

const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("inertia/pages/admin/promotions/flash-sale/edit.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
