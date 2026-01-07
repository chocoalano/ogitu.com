import { _ as _sfc_main$4 } from './Badge-CQlYH3Fo.js';
import { _ as _sfc_main$2, a as _sfc_main$3 } from './Button-BTdvmZ8N.js';
import { defineComponent, ref, computed, mergeProps, withCtx, createVNode, createTextVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderClass } from 'vue/server-renderer';
import { _ as _sfc_main$1 } from './default-pjkA2Ka0.js';
import 'reka-ui';
import '@vueuse/core';
import './virtual_nuxt-ui-plugins-CrG8Uaxr.js';
import '@unhead/vue/client';
import 'tailwindcss/colors';
import 'hookable';
import '@inertiajs/vue3';
import 'defu';
import 'ohash/utils';
import '@unhead/vue';
import 'reka-ui/namespaced';
import 'tailwind-variants';
import '@iconify/vue';
import 'ufo';
import './Modal-VctJV7vb.js';
import 'vaul-vue';
import './DropdownMenu-Zcq6i1qV.js';
import './Checkbox-DCS-_c5K.js';

const _sfc_main = /* @__PURE__ */ defineComponent({
  ...{
    layout: _sfc_main$1
  },
  __name: "reset-password",
  __ssrInlineRender: true,
  props: {
    email: {},
    token: {}
  },
  setup(__props) {
    const props = __props;
    const isLoading = ref(false);
    const errorMessage = ref("");
    const successMessage = ref("");
    const showPassword = ref(false);
    const showConfirmPassword = ref(false);
    const form = ref({
      password: "",
      passwordConfirmation: ""
    });
    const passwordMatch = computed(() => {
      if (!form.value.passwordConfirmation) return true;
      return form.value.password === form.value.passwordConfirmation;
    });
    const canSubmit = computed(() => {
      return props.email && props.token && form.value.password.length >= 8 && passwordMatch.value;
    });
    const goToForgotPassword = () => {
      window.location.href = "/forgot-password";
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UIcon = _sfc_main$2;
      const _component_UButton = _sfc_main$3;
      const _component_UInput = _sfc_main$4;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "min-h-screen flex" }, _attrs))}><!-- Left Side - Decorative --><div class="hidden lg:flex lg:w-1/2 bg-linear-to-br from-purple-600 via-pink-600 to-orange-500 relative overflow-hidden"><!-- Background Pattern --><div class="absolute inset-0 opacity-10"><div class="absolute top-20 left-20 w-72 h-72 bg-white rounded-full blur-3xl"></div><div class="absolute bottom-20 right-20 w-96 h-96 bg-white rounded-full blur-3xl"></div><div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-white rounded-full blur-2xl"></div></div><!-- Content --><div class="relative z-10 flex flex-col justify-center items-center text-white p-12"><!-- Logo --><div class="w-24 h-24 bg-white/20 backdrop-blur-sm rounded-3xl flex items-center justify-center mb-8 shadow-2xl">`);
      _push(ssrRenderComponent(_component_UIcon, {
        name: "i-heroicons-bolt",
        class: "w-14 h-14 text-white"
      }, null, _parent));
      _push(`</div><h1 class="text-4xl font-bold mb-4 text-center">Buat Password Baru</h1><p class="text-xl text-white/80 mb-12 text-center">Langkah terakhir untuk mengamankan akun Anda</p><!-- Security Tips --><div class="space-y-6 w-full max-w-sm"><div class="flex items-center gap-4 bg-white/10 backdrop-blur-sm rounded-2xl p-4"><div class="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">`);
      _push(ssrRenderComponent(_component_UIcon, {
        name: "i-heroicons-check-circle",
        class: "w-6 h-6"
      }, null, _parent));
      _push(`</div><div><div class="font-semibold">Minimal 8 Karakter</div><div class="text-sm text-white/70">Password yang lebih panjang lebih aman</div></div></div><div class="flex items-center gap-4 bg-white/10 backdrop-blur-sm rounded-2xl p-4"><div class="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">`);
      _push(ssrRenderComponent(_component_UIcon, {
        name: "i-heroicons-shield-check",
        class: "w-6 h-6"
      }, null, _parent));
      _push(`</div><div><div class="font-semibold">Kombinasi Unik</div><div class="text-sm text-white/70">Gunakan huruf, angka, dan simbol</div></div></div><div class="flex items-center gap-4 bg-white/10 backdrop-blur-sm rounded-2xl p-4"><div class="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">`);
      _push(ssrRenderComponent(_component_UIcon, {
        name: "i-heroicons-eye-slash",
        class: "w-6 h-6"
      }, null, _parent));
      _push(`</div><div><div class="font-semibold">Jaga Kerahasiaan</div><div class="text-sm text-white/70">Jangan bagikan password kepada siapapun</div></div></div></div></div></div><!-- Right Side - Form --><div class="flex-1 flex items-center justify-center bg-gray-50 dark:bg-gray-950 p-4 sm:p-8"><div class="w-full max-w-md"><!-- Mobile Logo --><div class="lg:hidden text-center mb-8"><div class="w-16 h-16 bg-linear-to-br from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-purple-500/30">`);
      _push(ssrRenderComponent(_component_UIcon, {
        name: "i-heroicons-bolt",
        class: "w-9 h-9 text-white"
      }, null, _parent));
      _push(`</div><h1 class="text-2xl font-bold text-gray-900 dark:text-white">Reset Password</h1></div><!-- Invalid Token Warning -->`);
      if (!__props.email || !__props.token) {
        _push(`<div class="text-center"><div class="w-20 h-20 bg-red-100 dark:bg-red-900/30 rounded-2xl flex items-center justify-center mx-auto mb-6">`);
        _push(ssrRenderComponent(_component_UIcon, {
          name: "i-heroicons-exclamation-triangle",
          class: "w-10 h-10 text-red-500"
        }, null, _parent));
        _push(`</div><h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-2"> Link Tidak Valid </h2><p class="text-gray-600 dark:text-gray-400 mb-6"> Link reset password tidak valid atau sudah kadaluarsa. Silakan minta link baru. </p>`);
        _push(ssrRenderComponent(_component_UButton, {
          color: "primary",
          size: "lg",
          class: "rounded-xl bg-linear-to-r from-purple-500 to-pink-600",
          onClick: goToForgotPassword
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(_component_UIcon, {
                name: "i-heroicons-arrow-path",
                class: "w-5 h-5 mr-2"
              }, null, _parent2, _scopeId));
              _push2(` Minta Link Baru `);
            } else {
              return [
                createVNode(_component_UIcon, {
                  name: "i-heroicons-arrow-path",
                  class: "w-5 h-5 mr-2"
                }),
                createTextVNode(" Minta Link Baru ")
              ];
            }
          }),
          _: 1
          /* STABLE */
        }, _parent));
        _push(`</div>`);
      } else {
        _push(`<!--[--><!-- Reset Password Form --><div><!-- Header --><div class="text-center mb-8"><div class="w-20 h-20 bg-linear-to-br from-green-100 to-emerald-100 dark:from-green-900/30 dark:to-emerald-900/30 rounded-2xl flex items-center justify-center mx-auto mb-4">`);
        _push(ssrRenderComponent(_component_UIcon, {
          name: "i-heroicons-lock-closed",
          class: "w-10 h-10 text-green-600 dark:text-green-400"
        }, null, _parent));
        _push(`</div><h2 class="text-2xl font-bold text-gray-900 dark:text-white"> Buat Password Baru </h2><p class="mt-2 text-gray-600 dark:text-gray-400"> Masukkan password baru untuk akun </p><p class="font-semibold text-purple-600 dark:text-purple-400">${ssrInterpolate(__props.email)}</p></div><!-- Success Message -->`);
        if (successMessage.value) {
          _push(`<div class="mb-6 p-4 rounded-xl bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800"><div class="flex items-center gap-3"><div class="w-8 h-8 rounded-lg bg-green-100 dark:bg-green-900/30 flex items-center justify-center">`);
          _push(ssrRenderComponent(_component_UIcon, {
            name: "i-heroicons-check-circle",
            class: "w-5 h-5 text-green-500"
          }, null, _parent));
          _push(`</div><div><span class="text-sm text-green-700 dark:text-green-400">${ssrInterpolate(successMessage.value)}</span><p class="text-xs text-green-600 dark:text-green-500 mt-1">Mengalihkan ke halaman login...</p></div></div></div>`);
        } else {
          _push(`<!--[--><!-- Form --><form class="space-y-6"><!-- Error Alert -->`);
          if (errorMessage.value) {
            _push(`<div class="p-4 rounded-xl bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800"><div class="flex items-center gap-3"><div class="w-8 h-8 rounded-lg bg-red-100 dark:bg-red-900/30 flex items-center justify-center">`);
            _push(ssrRenderComponent(_component_UIcon, {
              name: "i-heroicons-exclamation-circle",
              class: "w-5 h-5 text-red-500"
            }, null, _parent));
            _push(`</div><span class="text-sm text-red-700 dark:text-red-400">${ssrInterpolate(errorMessage.value)}</span></div></div>`);
          } else {
            _push(`<!---->`);
          }
          _push(`<!-- New Password --><div class="space-y-2"><label class="text-sm font-medium text-gray-700 dark:text-gray-300">Password Baru</label>`);
          _push(ssrRenderComponent(_component_UInput, {
            modelValue: form.value.password,
            "onUpdate:modelValue": ($event) => form.value.password = $event,
            type: showPassword.value ? "text" : "password",
            placeholder: "Minimal 8 karakter",
            icon: "i-heroicons-lock-closed",
            size: "lg",
            class: "w-full",
            autocomplete: "new-password",
            ui: { rounded: "rounded-xl" }
          }, {
            trailing: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(ssrRenderComponent(_component_UButton, {
                  icon: showPassword.value ? "i-heroicons-eye-slash" : "i-heroicons-eye",
                  color: "neutral",
                  variant: "ghost",
                  size: "xs",
                  onClick: ($event) => showPassword.value = !showPassword.value
                }, null, _parent2, _scopeId));
              } else {
                return [
                  createVNode(_component_UButton, {
                    icon: showPassword.value ? "i-heroicons-eye-slash" : "i-heroicons-eye",
                    color: "neutral",
                    variant: "ghost",
                    size: "xs",
                    onClick: ($event) => showPassword.value = !showPassword.value
                  }, null, 8, ["icon", "onClick"])
                ];
              }
            }),
            _: 1
            /* STABLE */
          }, _parent));
          if (form.value.password && form.value.password.length < 8) {
            _push(`<p class="text-xs text-amber-600"> Password minimal 8 karakter </p>`);
          } else {
            _push(`<!---->`);
          }
          _push(`</div><!-- Confirm Password --><div class="space-y-2"><label class="text-sm font-medium text-gray-700 dark:text-gray-300">Konfirmasi Password</label>`);
          _push(ssrRenderComponent(_component_UInput, {
            modelValue: form.value.passwordConfirmation,
            "onUpdate:modelValue": ($event) => form.value.passwordConfirmation = $event,
            type: showConfirmPassword.value ? "text" : "password",
            placeholder: "Ulangi password baru",
            icon: "i-heroicons-lock-closed",
            size: "lg",
            class: "w-full",
            autocomplete: "new-password",
            color: !passwordMatch.value ? "error" : void 0,
            ui: { rounded: "rounded-xl" }
          }, {
            trailing: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(ssrRenderComponent(_component_UButton, {
                  icon: showConfirmPassword.value ? "i-heroicons-eye-slash" : "i-heroicons-eye",
                  color: "neutral",
                  variant: "ghost",
                  size: "xs",
                  onClick: ($event) => showConfirmPassword.value = !showConfirmPassword.value
                }, null, _parent2, _scopeId));
              } else {
                return [
                  createVNode(_component_UButton, {
                    icon: showConfirmPassword.value ? "i-heroicons-eye-slash" : "i-heroicons-eye",
                    color: "neutral",
                    variant: "ghost",
                    size: "xs",
                    onClick: ($event) => showConfirmPassword.value = !showConfirmPassword.value
                  }, null, 8, ["icon", "onClick"])
                ];
              }
            }),
            _: 1
            /* STABLE */
          }, _parent));
          if (!passwordMatch.value) {
            _push(`<p class="text-xs text-red-500"> Password tidak cocok </p>`);
          } else {
            _push(`<!---->`);
          }
          _push(`</div><!-- Password Strength Indicator -->`);
          if (form.value.password) {
            _push(`<div class="space-y-2"><div class="flex items-center justify-between text-xs"><span class="text-gray-500 dark:text-gray-400">Kekuatan Password</span><span class="${ssrRenderClass([
              form.value.password.length >= 12 ? "text-green-500" : form.value.password.length >= 8 ? "text-amber-500" : "text-red-500"
            ])}">${ssrInterpolate(form.value.password.length >= 12 ? "Kuat" : form.value.password.length >= 8 ? "Sedang" : "Lemah")}</span></div><div class="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden"><div class="${ssrRenderClass([[
              form.value.password.length >= 12 ? "bg-green-500 w-full" : form.value.password.length >= 8 ? "bg-amber-500 w-2/3" : "bg-red-500 w-1/3"
            ], "h-full transition-all rounded-full"])}"></div></div></div>`);
          } else {
            _push(`<!---->`);
          }
          _push(`<!-- Submit Button -->`);
          _push(ssrRenderComponent(_component_UButton, {
            type: "submit",
            color: "primary",
            size: "lg",
            block: "",
            loading: isLoading.value,
            disabled: !canSubmit.value || isLoading.value,
            class: "rounded-xl h-12 bg-linear-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700"
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(ssrRenderComponent(_component_UIcon, {
                  name: "i-heroicons-check-circle",
                  class: "w-5 h-5 mr-2"
                }, null, _parent2, _scopeId));
                _push2(` Reset Password `);
              } else {
                return [
                  createVNode(_component_UIcon, {
                    name: "i-heroicons-check-circle",
                    class: "w-5 h-5 mr-2"
                  }),
                  createTextVNode(" Reset Password ")
                ];
              }
            }),
            _: 1
            /* STABLE */
          }, _parent));
          _push(`</form><!--]-->`);
        }
        _push(`<!-- Back to Login --><p class="mt-8 text-center text-sm text-gray-600 dark:text-gray-400"><a href="/login" class="font-semibold text-primary-600 hover:text-primary-500">`);
        _push(ssrRenderComponent(_component_UIcon, {
          name: "i-heroicons-arrow-left",
          class: "w-4 h-4 inline mr-1"
        }, null, _parent));
        _push(` Kembali ke Login </a></p></div><!--]-->`);
      }
      _push(`</div></div></div>`);
    };
  }
});

const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("inertia/pages/auth/reset-password.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
