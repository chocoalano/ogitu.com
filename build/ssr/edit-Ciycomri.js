import { _ as _sfc_main$2 } from './Card-Ci6a5H8H.js';
import { a as _sfc_main$1 } from './Button-BBveOjhJ.js';
import { defineComponent, unref, withCtx, createVNode, useSSRContext } from 'vue';
import { ssrRenderComponent, ssrInterpolate } from 'vue/server-renderer';
import { useForm, Head, router } from '@inertiajs/vue3';
import { A as AdminLayout } from './admin-CGUULoJY.js';
import { _ as _sfc_main$3 } from './AddressForm-BTXNjgye.js';
import 'reka-ui';
import './virtual_nuxt-ui-plugins-BqI2j5ZJ.js';
import '@unhead/vue/client';
import 'tailwindcss/colors';
import 'hookable';
import '@vueuse/core';
import 'defu';
import 'ohash/utils';
import '@unhead/vue';
import 'tailwind-variants';
import '@iconify/vue';
import 'ufo';
import './Badge-DaOjA2YD.js';
import 'reka-ui/namespaced';
import './Tooltip-N44Fzd4m.js';
import './SelectMenu-CGTADs72.js';
import './Textarea-DTaAAeeU.js';
import './Switch-BkqmHkc6.js';
import './FormField-BIqlRgyi.js';

const _sfc_main = /* @__PURE__ */ defineComponent({
  ...{ layout: AdminLayout },
  __name: "edit",
  __ssrInlineRender: true,
  props: {
    address: {},
    provinces: {},
    cities: {},
    districts: {}
  },
  setup(__props) {
    const props = __props;
    const form = useForm({
      name: props.address?.name || "",
      contactName: props.address?.contactName || "",
      phone: props.address?.phone || "",
      addressLine1: props.address?.addressLine1 || "",
      addressLine2: props.address?.addressLine2 || "",
      provinceId: props.address?.provinceId || "",
      provinceName: props.address?.provinceName || "",
      cityId: props.address?.cityId || "",
      cityName: props.address?.cityName || "",
      districtId: props.address?.districtId || "",
      districtName: props.address?.districtName || "",
      postalCode: props.address?.postalCode || "",
      isDefault: props.address?.isDefault || false
    });
    const handleSubmit = (data) => {
      form.name = data.name;
      form.contactName = data.contactName;
      form.phone = data.phone;
      form.addressLine1 = data.addressLine1;
      form.addressLine2 = data.addressLine2;
      form.provinceId = data.provinceId;
      form.provinceName = data.provinceName;
      form.cityId = data.cityId;
      form.cityName = data.cityName;
      form.districtId = data.districtId;
      form.districtName = data.districtName;
      form.postalCode = data.postalCode;
      form.isDefault = data.isDefault;
      form.put(`/admin/settings/address/${props.address?.id}`);
    };
    const handleCancel = () => {
      router.visit("/admin/settings/address");
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UButton = _sfc_main$1;
      const _component_UCard = _sfc_main$2;
      _push(`<!--[-->`);
      _push(ssrRenderComponent(unref(Head), { title: "Edit Alamat" }, null, _parent));
      _push(`<div class="space-y-6"><!-- Header --><div class="flex items-center gap-4">`);
      _push(ssrRenderComponent(_component_UButton, {
        icon: "i-heroicons-arrow-left",
        color: "neutral",
        variant: "ghost",
        onClick: ($event) => unref(router).visit("/admin/settings/address")
      }, null, _parent));
      _push(`<div><h1 class="text-2xl font-bold text-gray-900 dark:text-white">Edit Alamat</h1><p class="mt-1 text-sm text-gray-500 dark:text-gray-400">${ssrInterpolate(props.address?.name)}</p></div></div><!-- Form -->`);
      _push(ssrRenderComponent(_component_UCard, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_sfc_main$3, {
              provinces: props.provinces,
              "initial-cities": props.cities,
              "initial-districts": props.districts,
              "initial-data": props.address,
              processing: unref(form).processing,
              "submit-label": "Simpan Perubahan",
              onSubmit: handleSubmit,
              onCancel: handleCancel
            }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(_sfc_main$3, {
                provinces: props.provinces,
                "initial-cities": props.cities,
                "initial-districts": props.districts,
                "initial-data": props.address,
                processing: unref(form).processing,
                "submit-label": "Simpan Perubahan",
                onSubmit: handleSubmit,
                onCancel: handleCancel
              }, null, 8, ["provinces", "initial-cities", "initial-districts", "initial-data", "processing"])
            ];
          }
        }),
        _: 1
        /* STABLE */
      }, _parent));
      _push(`</div><!--]-->`);
    };
  }
});

const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("inertia/pages/admin/settings/address/edit.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
