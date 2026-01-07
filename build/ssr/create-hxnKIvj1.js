import { _ as _sfc_main$1, a as _sfc_main$5 } from './Button-BTdvmZ8N.js';
import { _ as _sfc_main$4 } from './Switch-eKFRwox7.js';
import { _ as _sfc_main$3 } from './Select-mEsLh9Ds.js';
import { _ as _sfc_main$2 } from './Badge-CQlYH3Fo.js';
import { defineComponent, ref, mergeProps, unref, withCtx, createVNode, createTextVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate } from 'vue/server-renderer';
import { Link } from '@inertiajs/vue3';
import { A as AdminLayout } from './admin-ELJtfEoX.js';
import 'defu';
import 'reka-ui';
import './virtual_nuxt-ui-plugins-CrG8Uaxr.js';
import '@unhead/vue/client';
import 'tailwindcss/colors';
import 'hookable';
import '@vueuse/core';
import 'ohash/utils';
import '@unhead/vue';
import 'tailwind-variants';
import '@iconify/vue';
import 'ufo';
import 'reka-ui/namespaced';
import './Tooltip-C54KurGy.js';

const _sfc_main = /* @__PURE__ */ defineComponent({
  ...{
    layout: AdminLayout
  },
  __name: "create",
  __ssrInlineRender: true,
  setup(__props) {
    const form = ref({
      fullName: "",
      email: "",
      password: "",
      passwordConfirmation: "",
      phone: "",
      gender: "",
      isActive: true,
      isVerified: false
    });
    const isSubmitting = ref(false);
    const errors = ref({});
    const genderOptions = [
      { label: "Laki-laki", value: "male" },
      { label: "Perempuan", value: "female" }
    ];
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UIcon = _sfc_main$1;
      const _component_UInput = _sfc_main$2;
      const _component_USelect = _sfc_main$3;
      const _component_USwitch = _sfc_main$4;
      const _component_UButton = _sfc_main$5;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "space-y-6" }, _attrs))}><!-- Page Header --><div class="flex items-center gap-4">`);
      _push(ssrRenderComponent(unref(Link), {
        href: "/admin/customers",
        class: "w-10 h-10 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_UIcon, {
              name: "i-heroicons-arrow-left",
              class: "w-5 h-5 text-slate-600 dark:text-slate-400"
            }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_UIcon, {
                name: "i-heroicons-arrow-left",
                class: "w-5 h-5 text-slate-600 dark:text-slate-400"
              })
            ];
          }
        }),
        _: 1
        /* STABLE */
      }, _parent));
      _push(`<div><h1 class="text-2xl font-bold text-gray-900 dark:text-white">Tambah Pelanggan</h1><p class="text-gray-500 dark:text-gray-400"> Tambah pelanggan baru </p></div></div><!-- Form --><div class="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6"><form class="space-y-6"><!-- Full Name --><div><label class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2"> Nama Lengkap <span class="text-red-500">*</span></label>`);
      _push(ssrRenderComponent(_component_UInput, {
        modelValue: form.value.fullName,
        "onUpdate:modelValue": ($event) => form.value.fullName = $event,
        placeholder: "Masukkan nama lengkap",
        error: !!errors.value.fullName
      }, null, _parent));
      if (errors.value.fullName) {
        _push(`<p class="mt-1 text-sm text-red-500">${ssrInterpolate(errors.value.fullName)}</p>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><!-- Email --><div><label class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2"> Email <span class="text-red-500">*</span></label>`);
      _push(ssrRenderComponent(_component_UInput, {
        modelValue: form.value.email,
        "onUpdate:modelValue": ($event) => form.value.email = $event,
        type: "email",
        placeholder: "Masukkan email",
        error: !!errors.value.email
      }, null, _parent));
      if (errors.value.email) {
        _push(`<p class="mt-1 text-sm text-red-500">${ssrInterpolate(errors.value.email)}</p>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><!-- Password --><div class="grid grid-cols-1 md:grid-cols-2 gap-4"><div><label class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2"> Password <span class="text-red-500">*</span></label>`);
      _push(ssrRenderComponent(_component_UInput, {
        modelValue: form.value.password,
        "onUpdate:modelValue": ($event) => form.value.password = $event,
        type: "password",
        placeholder: "Masukkan password",
        error: !!errors.value.password
      }, null, _parent));
      if (errors.value.password) {
        _push(`<p class="mt-1 text-sm text-red-500">${ssrInterpolate(errors.value.password)}</p>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div><label class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2"> Konfirmasi Password <span class="text-red-500">*</span></label>`);
      _push(ssrRenderComponent(_component_UInput, {
        modelValue: form.value.passwordConfirmation,
        "onUpdate:modelValue": ($event) => form.value.passwordConfirmation = $event,
        type: "password",
        placeholder: "Konfirmasi password",
        error: !!errors.value.passwordConfirmation
      }, null, _parent));
      if (errors.value.passwordConfirmation) {
        _push(`<p class="mt-1 text-sm text-red-500">${ssrInterpolate(errors.value.passwordConfirmation)}</p>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div><!-- Phone & Gender --><div class="grid grid-cols-1 md:grid-cols-2 gap-4"><div><label class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2"> Nomor Telepon </label>`);
      _push(ssrRenderComponent(_component_UInput, {
        modelValue: form.value.phone,
        "onUpdate:modelValue": ($event) => form.value.phone = $event,
        placeholder: "Contoh: 081234567890",
        error: !!errors.value.phone
      }, null, _parent));
      if (errors.value.phone) {
        _push(`<p class="mt-1 text-sm text-red-500">${ssrInterpolate(errors.value.phone)}</p>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div><label class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2"> Gender </label>`);
      _push(ssrRenderComponent(_component_USelect, {
        modelValue: form.value.gender,
        "onUpdate:modelValue": ($event) => form.value.gender = $event,
        items: genderOptions,
        placeholder: "Pilih Gender"
      }, null, _parent));
      _push(`</div></div><!-- Status Toggles --><div class="grid grid-cols-1 md:grid-cols-2 gap-4"><div class="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-800/50 rounded-lg"><div><p class="font-medium text-slate-900 dark:text-white">Status Aktif</p><p class="text-sm text-slate-500 dark:text-slate-400">Pelanggan dapat login dan berbelanja</p></div>`);
      _push(ssrRenderComponent(_component_USwitch, {
        modelValue: form.value.isActive,
        "onUpdate:modelValue": ($event) => form.value.isActive = $event
      }, null, _parent));
      _push(`</div><div class="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-800/50 rounded-lg"><div><p class="font-medium text-slate-900 dark:text-white">Email Terverifikasi</p><p class="text-sm text-slate-500 dark:text-slate-400">Tandai email sebagai terverifikasi</p></div>`);
      _push(ssrRenderComponent(_component_USwitch, {
        modelValue: form.value.isVerified,
        "onUpdate:modelValue": ($event) => form.value.isVerified = $event
      }, null, _parent));
      _push(`</div></div><!-- Submit --><div class="flex justify-end gap-3 pt-4 border-t border-slate-200 dark:border-slate-700">`);
      _push(ssrRenderComponent(_component_UButton, {
        color: "neutral",
        variant: "outline",
        to: "/admin/customers"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` Batal `);
          } else {
            return [
              createTextVNode(" Batal ")
            ];
          }
        }),
        _: 1
        /* STABLE */
      }, _parent));
      _push(ssrRenderComponent(_component_UButton, {
        type: "submit",
        color: "primary",
        loading: isSubmitting.value
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` Simpan Pelanggan `);
          } else {
            return [
              createTextVNode(" Simpan Pelanggan ")
            ];
          }
        }),
        _: 1
        /* STABLE */
      }, _parent));
      _push(`</div></form></div></div>`);
    };
  }
});

const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("inertia/pages/admin/customers/create.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
