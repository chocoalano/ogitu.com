import { _ as _sfc_main$5 } from './Textarea-DTaAAeeU.js';
import { _ as _sfc_main$4 } from './Badge-DaOjA2YD.js';
import { _ as _sfc_main$2, a as _sfc_main$3 } from './Button-BBveOjhJ.js';
import { defineComponent, ref, resolveComponent, unref, withCtx, createVNode, createTextVNode, useSSRContext } from 'vue';
import { ssrRenderComponent, ssrRenderList, ssrRenderAttr, ssrRenderClass, ssrInterpolate } from 'vue/server-renderer';
import { Head, Link } from '@inertiajs/vue3';
import { _ as _sfc_main$1 } from './default-ChIG0McX.js';
import 'reka-ui';
import '@vueuse/core';
import './virtual_nuxt-ui-plugins-BqI2j5ZJ.js';
import '@unhead/vue/client';
import 'tailwindcss/colors';
import 'hookable';
import 'defu';
import 'ohash/utils';
import '@unhead/vue';
import 'reka-ui/namespaced';
import 'tailwind-variants';
import '@iconify/vue';
import 'ufo';
import './Modal-lw8uQ47S.js';
import 'vaul-vue';
import './DropdownMenu-DnaZdPLR.js';
import './Checkbox-9gbT5PLz.js';

const _sfc_main = /* @__PURE__ */ defineComponent({
  ...{ layout: _sfc_main$1 },
  __name: "contact",
  __ssrInlineRender: true,
  props: {
    contactInfo: {}
  },
  setup(__props) {
    const form = ref({
      name: "",
      email: "",
      subject: "",
      message: ""
    });
    const isSubmitting = ref(false);
    const isSubmitted = ref(false);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UIcon = _sfc_main$2;
      const _component_UButton = _sfc_main$3;
      const _component_UFormGroup = resolveComponent("UFormGroup");
      const _component_UInput = _sfc_main$4;
      const _component_UTextarea = _sfc_main$5;
      _push(`<!--[-->`);
      _push(ssrRenderComponent(unref(Head), { title: "Hubungi Kami - Ogitu" }, null, _parent));
      _push(`<div class="min-h-screen bg-linear-to-b from-gray-50 via-white to-gray-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-900"><!-- Hero Section --><div class="relative bg-linear-to-r from-cyan-500 via-blue-500 to-indigo-500 overflow-hidden"><div class="absolute inset-0 opacity-10"><svg class="w-full h-full" xmlns="http://www.w3.org/2000/svg"><defs><pattern id="contact-pattern" x="0" y="0" width="30" height="30" patternUnits="userSpaceOnUse"><circle cx="15" cy="15" r="8" fill="none" stroke="white" stroke-width="1"></circle></pattern></defs><rect width="100%" height="100%" fill="url(#contact-pattern)"></rect></svg></div><div class="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16"><nav class="flex items-center gap-2 text-sm mb-6 text-white/80">`);
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
      _push(`<span class="text-white font-medium">Hubungi Kami</span></nav><div class="text-center"><div class="w-16 h-16 mx-auto mb-4 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center">`);
      _push(ssrRenderComponent(_component_UIcon, {
        name: "i-heroicons-chat-bubble-left-right",
        class: "w-8 h-8 text-white"
      }, null, _parent));
      _push(`</div><h1 class="text-3xl sm:text-4xl font-bold text-white mb-3">Hubungi Kami</h1><p class="text-white/80 max-w-2xl mx-auto"> Tim kami siap membantu Anda 24/7. Pilih channel yang paling nyaman untuk menghubungi kami. </p></div></div></div><div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12"><div class="grid grid-cols-1 lg:grid-cols-3 gap-8"><!-- Contact Channels --><div class="lg:col-span-2 space-y-6"><h2 class="text-xl font-bold text-gray-900 dark:text-white">Channel Kontak</h2><div class="grid grid-cols-1 sm:grid-cols-2 gap-4"><!--[-->`);
      ssrRenderList(__props.contactInfo.channels, (channel) => {
        _push(`<a${ssrRenderAttr("href", channel.link)} target="_blank" class="group bg-white dark:bg-gray-800/80 rounded-2xl border border-gray-200/80 dark:border-gray-700/50 p-6 hover:shadow-lg transition-all"><div class="flex items-start gap-4"><div class="${ssrRenderClass(["w-14 h-14 rounded-2xl flex items-center justify-center", channel.color])}">`);
        _push(ssrRenderComponent(_component_UIcon, {
          name: channel.icon,
          class: "w-7 h-7 text-white"
        }, null, _parent));
        _push(`</div><div><h3 class="font-semibold text-gray-900 dark:text-white group-hover:text-primary-500 transition-colors">${ssrInterpolate(channel.name)}</h3><p class="text-primary-600 dark:text-primary-400 font-medium">${ssrInterpolate(channel.value)}</p><p class="text-sm text-gray-500 dark:text-gray-400 mt-1">${ssrInterpolate(channel.description)}</p></div></div></a>`);
      });
      _push(`<!--]--></div><!-- Contact Form --><div class="bg-white dark:bg-gray-800/80 rounded-2xl border border-gray-200/80 dark:border-gray-700/50 p-6 sm:p-8"><h2 class="text-xl font-bold text-gray-900 dark:text-white mb-6">Kirim Pesan</h2>`);
      if (isSubmitted.value) {
        _push(`<div class="text-center py-12"><div class="w-20 h-20 mx-auto mb-4 rounded-full bg-green-500/10 flex items-center justify-center">`);
        _push(ssrRenderComponent(_component_UIcon, {
          name: "i-heroicons-check-circle",
          class: "w-10 h-10 text-green-500"
        }, null, _parent));
        _push(`</div><h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">Pesan Terkirim!</h3><p class="text-gray-600 dark:text-gray-400 mb-4"> Terima kasih telah menghubungi kami. Tim kami akan merespon dalam 1x24 jam. </p>`);
        _push(ssrRenderComponent(_component_UButton, {
          color: "primary",
          onClick: ($event) => {
            isSubmitted.value = false;
            form.value = { name: "", email: "", subject: "", message: "" };
          }
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(` Kirim Pesan Lagi `);
            } else {
              return [
                createTextVNode(" Kirim Pesan Lagi ")
              ];
            }
          }),
          _: 1
          /* STABLE */
        }, _parent));
        _push(`</div>`);
      } else {
        _push(`<form class="space-y-4"><div class="grid grid-cols-1 sm:grid-cols-2 gap-4">`);
        _push(ssrRenderComponent(_component_UFormGroup, {
          label: "Nama Lengkap",
          required: ""
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(_component_UInput, {
                modelValue: form.value.name,
                "onUpdate:modelValue": ($event) => form.value.name = $event,
                placeholder: "Nama Anda",
                required: ""
              }, null, _parent2, _scopeId));
            } else {
              return [
                createVNode(_component_UInput, {
                  modelValue: form.value.name,
                  "onUpdate:modelValue": ($event) => form.value.name = $event,
                  placeholder: "Nama Anda",
                  required: ""
                }, null, 8, ["modelValue", "onUpdate:modelValue"])
              ];
            }
          }),
          _: 1
          /* STABLE */
        }, _parent));
        _push(ssrRenderComponent(_component_UFormGroup, {
          label: "Email",
          required: ""
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(_component_UInput, {
                modelValue: form.value.email,
                "onUpdate:modelValue": ($event) => form.value.email = $event,
                type: "email",
                placeholder: "email@example.com",
                required: ""
              }, null, _parent2, _scopeId));
            } else {
              return [
                createVNode(_component_UInput, {
                  modelValue: form.value.email,
                  "onUpdate:modelValue": ($event) => form.value.email = $event,
                  type: "email",
                  placeholder: "email@example.com",
                  required: ""
                }, null, 8, ["modelValue", "onUpdate:modelValue"])
              ];
            }
          }),
          _: 1
          /* STABLE */
        }, _parent));
        _push(`</div>`);
        _push(ssrRenderComponent(_component_UFormGroup, {
          label: "Subjek",
          required: ""
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(_component_UInput, {
                modelValue: form.value.subject,
                "onUpdate:modelValue": ($event) => form.value.subject = $event,
                placeholder: "Perihal pesan Anda",
                required: ""
              }, null, _parent2, _scopeId));
            } else {
              return [
                createVNode(_component_UInput, {
                  modelValue: form.value.subject,
                  "onUpdate:modelValue": ($event) => form.value.subject = $event,
                  placeholder: "Perihal pesan Anda",
                  required: ""
                }, null, 8, ["modelValue", "onUpdate:modelValue"])
              ];
            }
          }),
          _: 1
          /* STABLE */
        }, _parent));
        _push(ssrRenderComponent(_component_UFormGroup, {
          label: "Pesan",
          required: ""
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(_component_UTextarea, {
                modelValue: form.value.message,
                "onUpdate:modelValue": ($event) => form.value.message = $event,
                placeholder: "Tulis pesan Anda di sini...",
                rows: 5,
                required: ""
              }, null, _parent2, _scopeId));
            } else {
              return [
                createVNode(_component_UTextarea, {
                  modelValue: form.value.message,
                  "onUpdate:modelValue": ($event) => form.value.message = $event,
                  placeholder: "Tulis pesan Anda di sini...",
                  rows: 5,
                  required: ""
                }, null, 8, ["modelValue", "onUpdate:modelValue"])
              ];
            }
          }),
          _: 1
          /* STABLE */
        }, _parent));
        _push(ssrRenderComponent(_component_UButton, {
          type: "submit",
          color: "primary",
          size: "lg",
          loading: isSubmitting.value,
          block: ""
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(_component_UIcon, {
                name: "i-heroicons-paper-airplane",
                class: "w-5 h-5 mr-2"
              }, null, _parent2, _scopeId));
              _push2(` Kirim Pesan `);
            } else {
              return [
                createVNode(_component_UIcon, {
                  name: "i-heroicons-paper-airplane",
                  class: "w-5 h-5 mr-2"
                }),
                createTextVNode(" Kirim Pesan ")
              ];
            }
          }),
          _: 1
          /* STABLE */
        }, _parent));
        _push(`</form>`);
      }
      _push(`</div></div><!-- Sidebar --><div class="space-y-6"><!-- Office Address --><div class="bg-white dark:bg-gray-800/80 rounded-2xl border border-gray-200/80 dark:border-gray-700/50 p-6"><h3 class="font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">`);
      _push(ssrRenderComponent(_component_UIcon, {
        name: "i-heroicons-building-office-2",
        class: "w-5 h-5 text-primary-500"
      }, null, _parent));
      _push(` Alamat Kantor </h3><div class="text-gray-600 dark:text-gray-400 text-sm space-y-1"><p class="font-medium text-gray-900 dark:text-white">${ssrInterpolate(__props.contactInfo.office.name)}</p><p>${ssrInterpolate(__props.contactInfo.office.address)}</p><p>${ssrInterpolate(__props.contactInfo.office.city)}, ${ssrInterpolate(__props.contactInfo.office.province)} ${ssrInterpolate(__props.contactInfo.office.postalCode)}</p><p>${ssrInterpolate(__props.contactInfo.office.country)}</p></div></div><!-- Working Hours --><div class="bg-white dark:bg-gray-800/80 rounded-2xl border border-gray-200/80 dark:border-gray-700/50 p-6"><h3 class="font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">`);
      _push(ssrRenderComponent(_component_UIcon, {
        name: "i-heroicons-clock",
        class: "w-5 h-5 text-primary-500"
      }, null, _parent));
      _push(` Jam Operasional </h3><div class="space-y-3 text-sm"><div class="flex justify-between"><span class="text-gray-500 dark:text-gray-400">Senin - Jumat</span><span class="text-gray-900 dark:text-white">09:00 - 21:00</span></div><div class="flex justify-between"><span class="text-gray-500 dark:text-gray-400">Sabtu - Minggu</span><span class="text-gray-900 dark:text-white">10:00 - 18:00</span></div><div class="flex justify-between"><span class="text-gray-500 dark:text-gray-400">Hari Libur</span><span class="text-red-500">Tutup</span></div></div></div><!-- Quick Response --><div class="bg-green-50 dark:bg-green-900/20 rounded-2xl border border-green-200 dark:border-green-800 p-6"><div class="flex items-start gap-3"><div class="w-12 h-12 rounded-xl bg-green-500 flex items-center justify-center shrink-0">`);
      _push(ssrRenderComponent(_component_UIcon, {
        name: "i-simple-icons-whatsapp",
        class: "w-6 h-6 text-white"
      }, null, _parent));
      _push(`</div><div><h4 class="font-semibold text-gray-900 dark:text-white mb-1">Respon Cepat</h4><p class="text-sm text-gray-600 dark:text-gray-400 mb-3"> Untuk respon tercepat, hubungi via WhatsApp </p><a${ssrRenderAttr("href", __props.contactInfo.channels.find((c) => c.name === "WhatsApp")?.link)} target="_blank">`);
      _push(ssrRenderComponent(_component_UButton, {
        color: "primary",
        size: "sm"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` Chat Sekarang `);
          } else {
            return [
              createTextVNode(" Chat Sekarang ")
            ];
          }
        }),
        _: 1
        /* STABLE */
      }, _parent));
      _push(`</a></div></div></div><!-- Map Placeholder --><div class="bg-white dark:bg-gray-800/80 rounded-2xl border border-gray-200/80 dark:border-gray-700/50 overflow-hidden"><div class="aspect-square bg-gray-100 dark:bg-gray-700 flex items-center justify-center"><div class="text-center text-gray-500 dark:text-gray-400">`);
      _push(ssrRenderComponent(_component_UIcon, {
        name: "i-heroicons-map",
        class: "w-12 h-12 mx-auto mb-2"
      }, null, _parent));
      _push(`<p class="text-sm">Google Maps</p></div></div></div></div></div></div></div><!--]-->`);
    };
  }
});

const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("inertia/pages/pages/contact.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
