import { _ as _sfc_main$2 } from './Button-BBveOjhJ.js';
import { defineComponent, unref, withCtx, createVNode, createTextVNode, useSSRContext } from 'vue';
import { ssrRenderComponent, ssrRenderList, ssrInterpolate } from 'vue/server-renderer';
import { Head, Link } from '@inertiajs/vue3';
import { _ as _sfc_main$1 } from './default-ChIG0McX.js';
import 'defu';
import 'reka-ui';
import './virtual_nuxt-ui-plugins-BqI2j5ZJ.js';
import '@unhead/vue/client';
import 'tailwindcss/colors';
import 'hookable';
import '@vueuse/core';
import 'ohash/utils';
import '@unhead/vue';
import 'tailwind-variants';
import '@iconify/vue';
import 'ufo';
import './Badge-DaOjA2YD.js';
import 'reka-ui/namespaced';
import './Modal-lw8uQ47S.js';
import 'vaul-vue';
import './DropdownMenu-DnaZdPLR.js';
import './Checkbox-9gbT5PLz.js';

const _sfc_main = /* @__PURE__ */ defineComponent({
  ...{ layout: _sfc_main$1 },
  __name: "payment",
  __ssrInlineRender: true,
  props: {
    paymentMethods: {}
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UIcon = _sfc_main$2;
      _push(`<!--[-->`);
      _push(ssrRenderComponent(unref(Head), { title: "Metode Pembayaran - Ogitu" }, null, _parent));
      _push(`<div class="min-h-screen bg-linear-to-b from-gray-50 via-white to-gray-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-900"><!-- Hero Section --><div class="relative bg-linear-to-r from-green-500 via-emerald-500 to-teal-500 overflow-hidden"><div class="absolute inset-0 opacity-10"><svg class="w-full h-full" xmlns="http://www.w3.org/2000/svg"><defs><pattern id="payment-pattern" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse"><rect x="10" y="10" width="20" height="14" rx="2" fill="none" stroke="white" stroke-width="1"></rect><line x1="10" y1="17" x2="30" y2="17" stroke="white" stroke-width="1"></line></pattern></defs><rect width="100%" height="100%" fill="url(#payment-pattern)"></rect></svg></div><div class="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16"><nav class="flex items-center gap-2 text-sm mb-6 text-white/80">`);
      _push(ssrRenderComponent(unref(Link), {
        href: "/",
        class: "hover:text-white transition-colors"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_UIcon, {
              name: "i-heroicons-home",
              class: "w-4 h-4"
            }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_UIcon, {
                name: "i-heroicons-home",
                class: "w-4 h-4"
              })
            ];
          }
        }),
        _: 1
        /* STABLE */
      }, _parent));
      _push(ssrRenderComponent(_component_UIcon, {
        name: "i-heroicons-chevron-right",
        class: "w-4 h-4"
      }, null, _parent));
      _push(`<span class="text-white font-medium">Metode Pembayaran</span></nav><div class="text-center"><div class="w-16 h-16 mx-auto mb-4 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center">`);
      _push(ssrRenderComponent(_component_UIcon, {
        name: "i-heroicons-credit-card",
        class: "w-8 h-8 text-white"
      }, null, _parent));
      _push(`</div><h1 class="text-3xl sm:text-4xl font-bold text-white mb-3">Metode Pembayaran</h1><p class="text-white/80 max-w-2xl mx-auto"> Berbagai pilihan pembayaran aman dan mudah untuk kenyamanan berbelanja Anda </p></div></div></div><div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12"><!-- Bank Transfer / VA --><div class="mb-12"><h2 class="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">`);
      _push(ssrRenderComponent(_component_UIcon, {
        name: "i-heroicons-building-library",
        class: "w-6 h-6 text-blue-500"
      }, null, _parent));
      _push(` Virtual Account (Transfer Bank) </h2><div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"><!--[-->`);
      ssrRenderList(__props.paymentMethods.banks, (bank) => {
        _push(`<div class="bg-white dark:bg-gray-800/80 rounded-2xl border border-gray-200/80 dark:border-gray-700/50 p-6 hover:shadow-lg transition-shadow"><div class="flex items-center gap-4 mb-4"><div class="w-16 h-10 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center"><span class="font-bold text-gray-600 dark:text-gray-300">${ssrInterpolate(bank.name)}</span></div><div><h3 class="font-semibold text-gray-900 dark:text-white">${ssrInterpolate(bank.name)}</h3><p class="text-xs text-gray-500 dark:text-gray-400">${ssrInterpolate(bank.type)}</p></div></div><div class="space-y-2 text-sm"><div class="flex justify-between"><span class="text-gray-500 dark:text-gray-400">Biaya Admin</span><span class="font-medium text-green-600 dark:text-green-400">${ssrInterpolate(bank.fee)}</span></div><div class="flex justify-between"><span class="text-gray-500 dark:text-gray-400">Proses</span><span class="text-gray-900 dark:text-white">${ssrInterpolate(bank.processing)}</span></div></div></div>`);
      });
      _push(`<!--]--></div></div><!-- E-Wallet --><div class="mb-12"><h2 class="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">`);
      _push(ssrRenderComponent(_component_UIcon, {
        name: "i-heroicons-device-phone-mobile",
        class: "w-6 h-6 text-purple-500"
      }, null, _parent));
      _push(` E-Wallet </h2><div class="grid grid-cols-2 sm:grid-cols-4 gap-4"><!--[-->`);
      ssrRenderList(__props.paymentMethods.ewallets, (ewallet) => {
        _push(`<div class="bg-white dark:bg-gray-800/80 rounded-2xl border border-gray-200/80 dark:border-gray-700/50 p-6 text-center hover:shadow-lg transition-shadow"><div class="w-16 h-16 mx-auto mb-3 bg-gray-100 dark:bg-gray-700 rounded-2xl flex items-center justify-center"><span class="font-bold text-gray-600 dark:text-gray-300">${ssrInterpolate(ewallet.name.slice(0, 2))}</span></div><h3 class="font-semibold text-gray-900 dark:text-white mb-1">${ssrInterpolate(ewallet.name)}</h3><p class="text-xs text-green-600 dark:text-green-400">${ssrInterpolate(ewallet.fee)}</p></div>`);
      });
      _push(`<!--]--></div></div><!-- Other Methods --><div class="mb-12"><h2 class="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">`);
      _push(ssrRenderComponent(_component_UIcon, {
        name: "i-heroicons-qr-code",
        class: "w-6 h-6 text-orange-500"
      }, null, _parent));
      _push(` Metode Lainnya </h2><div class="grid grid-cols-1 sm:grid-cols-3 gap-4"><!--[-->`);
      ssrRenderList(__props.paymentMethods.others, (method) => {
        _push(`<div class="bg-white dark:bg-gray-800/80 rounded-2xl border border-gray-200/80 dark:border-gray-700/50 p-6 hover:shadow-lg transition-shadow"><div class="flex items-start gap-4"><div class="w-14 h-14 bg-gray-100 dark:bg-gray-700 rounded-xl flex items-center justify-center shrink-0"><span class="font-bold text-xs text-gray-600 dark:text-gray-300">${ssrInterpolate(method.name)}</span></div><div class="flex-1"><h3 class="font-semibold text-gray-900 dark:text-white mb-1">${ssrInterpolate(method.name)}</h3><p class="text-sm text-gray-600 dark:text-gray-400 mb-2">${ssrInterpolate(method.description)}</p><div class="flex flex-wrap gap-2 text-xs"><span class="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded"> Biaya: ${ssrInterpolate(method.fee)}</span><span class="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded">${ssrInterpolate(method.processing)}</span></div></div></div></div>`);
      });
      _push(`<!--]--></div></div><!-- Security Features --><div class="mb-12"><h2 class="text-xl font-bold text-gray-900 dark:text-white mb-6 text-center">Keamanan Transaksi</h2><div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"><!--[-->`);
      ssrRenderList(__props.paymentMethods.securityFeatures, (feature) => {
        _push(`<div class="bg-linear-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-800/50 rounded-2xl p-6 text-center"><div class="w-14 h-14 mx-auto mb-4 rounded-2xl bg-green-500/10 flex items-center justify-center">`);
        _push(ssrRenderComponent(_component_UIcon, {
          name: feature.icon,
          class: "w-7 h-7 text-green-600 dark:text-green-400"
        }, null, _parent));
        _push(`</div><h3 class="font-semibold text-gray-900 dark:text-white mb-2">${ssrInterpolate(feature.title)}</h3><p class="text-sm text-gray-600 dark:text-gray-400">${ssrInterpolate(feature.description)}</p></div>`);
      });
      _push(`<!--]--></div></div><!-- Payment Tips --><div class="bg-amber-50 dark:bg-amber-900/20 rounded-2xl border border-amber-200 dark:border-amber-800 p-6 sm:p-8"><h3 class="font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">`);
      _push(ssrRenderComponent(_component_UIcon, {
        name: "i-heroicons-light-bulb",
        class: "w-5 h-5 text-amber-500"
      }, null, _parent));
      _push(` Tips Pembayaran </h3><ul class="space-y-3 text-sm text-gray-600 dark:text-gray-400"><li class="flex items-start gap-2">`);
      _push(ssrRenderComponent(_component_UIcon, {
        name: "i-heroicons-check",
        class: "w-4 h-4 text-green-500 mt-0.5 shrink-0"
      }, null, _parent));
      _push(`<span>Selesaikan pembayaran dalam <strong class="text-gray-900 dark:text-white">24 jam</strong> sebelum pesanan otomatis dibatalkan</span></li><li class="flex items-start gap-2">`);
      _push(ssrRenderComponent(_component_UIcon, {
        name: "i-heroicons-check",
        class: "w-4 h-4 text-green-500 mt-0.5 shrink-0"
      }, null, _parent));
      _push(`<span>Gunakan <strong class="text-gray-900 dark:text-white">Virtual Account</strong> untuk konfirmasi pembayaran otomatis dan instan</span></li><li class="flex items-start gap-2">`);
      _push(ssrRenderComponent(_component_UIcon, {
        name: "i-heroicons-check",
        class: "w-4 h-4 text-green-500 mt-0.5 shrink-0"
      }, null, _parent));
      _push(`<span>Simpan bukti pembayaran sampai pesanan diterima</span></li><li class="flex items-start gap-2">`);
      _push(ssrRenderComponent(_component_UIcon, {
        name: "i-heroicons-check",
        class: "w-4 h-4 text-green-500 mt-0.5 shrink-0"
      }, null, _parent));
      _push(`<span>Hubungi `);
      _push(ssrRenderComponent(unref(Link), {
        href: "/contact",
        class: "text-primary-500 hover:underline"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`customer service`);
          } else {
            return [
              createTextVNode("customer service")
            ];
          }
        }),
        _: 1
        /* STABLE */
      }, _parent));
      _push(` jika ada kendala pembayaran</span></li></ul></div></div></div><!--]-->`);
    };
  }
});

const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("inertia/pages/pages/payment.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
