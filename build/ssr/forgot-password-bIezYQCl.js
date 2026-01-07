import { _ as _sfc_main$2, a as _sfc_main$4 } from './Button-BTdvmZ8N.js';
import { _ as _sfc_main$3 } from './Badge-CQlYH3Fo.js';
import { defineComponent, ref, computed, mergeProps, withCtx, createVNode, createTextVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderClass, ssrInterpolate, ssrIncludeBooleanAttr } from 'vue/server-renderer';
import { _ as _sfc_main$1 } from './default-pjkA2Ka0.js';
import 'defu';
import 'reka-ui';
import './virtual_nuxt-ui-plugins-CrG8Uaxr.js';
import '@unhead/vue/client';
import 'tailwindcss/colors';
import 'hookable';
import '@inertiajs/vue3';
import '@vueuse/core';
import 'ohash/utils';
import '@unhead/vue';
import 'tailwind-variants';
import '@iconify/vue';
import 'ufo';
import 'reka-ui/namespaced';
import './Modal-VctJV7vb.js';
import 'vaul-vue';
import './DropdownMenu-Zcq6i1qV.js';
import './Checkbox-DCS-_c5K.js';

const _sfc_main = /* @__PURE__ */ defineComponent({
  ...{
    layout: _sfc_main$1
  },
  __name: "forgot-password",
  __ssrInlineRender: true,
  setup(__props) {
    const step = ref("email");
    const isLoading = ref(false);
    const errorMessage = ref("");
    const otpCode = ref("");
    const otpCountdown = ref(0);
    const otpTimer = ref(null);
    ref("");
    const email = ref("");
    const canSendOtp = computed(() => {
      return email.value.trim() !== "" && email.value.includes("@");
    });
    const canVerifyOtp = computed(() => {
      return otpCode.value.length === 6;
    });
    const goBack = () => {
      if (step.value === "otp") {
        step.value = "email";
        otpCode.value = "";
        if (otpTimer.value) clearInterval(otpTimer.value);
      }
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UIcon = _sfc_main$2;
      const _component_UInput = _sfc_main$3;
      const _component_UButton = _sfc_main$4;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "min-h-screen flex" }, _attrs))}><!-- Left Side - Decorative --><div class="hidden lg:flex lg:w-1/2 bg-linear-to-br from-purple-600 via-pink-600 to-orange-500 relative overflow-hidden"><!-- Background Pattern --><div class="absolute inset-0 opacity-10"><div class="absolute top-20 left-20 w-72 h-72 bg-white rounded-full blur-3xl"></div><div class="absolute bottom-20 right-20 w-96 h-96 bg-white rounded-full blur-3xl"></div><div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-white rounded-full blur-2xl"></div></div><!-- Content --><div class="relative z-10 flex flex-col justify-center items-center text-white p-12"><!-- Logo --><div class="w-24 h-24 bg-white/20 backdrop-blur-sm rounded-3xl flex items-center justify-center mb-8 shadow-2xl">`);
      _push(ssrRenderComponent(_component_UIcon, {
        name: "i-heroicons-bolt",
        class: "w-14 h-14 text-white"
      }, null, _parent));
      _push(`</div><h1 class="text-4xl font-bold mb-4 text-center">Lupa Password?</h1><p class="text-xl text-white/80 mb-12 text-center">Jangan khawatir, kami akan bantu Anda</p><!-- Steps Info --><div class="space-y-6 w-full max-w-sm"><div class="flex items-center gap-4 bg-white/10 backdrop-blur-sm rounded-2xl p-4"><div class="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center font-bold text-lg"> 1 </div><div><div class="font-semibold">Masukkan Email</div><div class="text-sm text-white/70">Email yang terdaftar di akun Anda</div></div></div><div class="flex items-center gap-4 bg-white/10 backdrop-blur-sm rounded-2xl p-4"><div class="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center font-bold text-lg"> 2 </div><div><div class="font-semibold">Verifikasi OTP</div><div class="text-sm text-white/70">Masukkan kode yang dikirim ke email</div></div></div><div class="flex items-center gap-4 bg-white/10 backdrop-blur-sm rounded-2xl p-4"><div class="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center font-bold text-lg"> 3 </div><div><div class="font-semibold">Buat Password Baru</div><div class="text-sm text-white/70">Atur password baru untuk akun Anda</div></div></div></div></div></div><!-- Right Side - Form --><div class="flex-1 flex items-center justify-center bg-gray-50 dark:bg-gray-950 p-4 sm:p-8"><div class="w-full max-w-md"><!-- Mobile Logo --><div class="lg:hidden text-center mb-8"><div class="w-16 h-16 bg-linear-to-br from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-purple-500/30">`);
      _push(ssrRenderComponent(_component_UIcon, {
        name: "i-heroicons-bolt",
        class: "w-9 h-9 text-white"
      }, null, _parent));
      _push(`</div><h1 class="text-2xl font-bold text-gray-900 dark:text-white">Lupa Password</h1></div><!-- Step Indicator --><div class="flex items-center justify-center gap-3 mb-8"><div class="${ssrRenderClass([
        "w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-all",
        step.value === "email" ? "bg-purple-500 text-white shadow-lg shadow-purple-500/30" : "bg-purple-100 text-purple-600 dark:bg-purple-900/30"
      ])}"> 1 </div><div class="w-12 h-1 rounded-full bg-gray-200 dark:bg-gray-700"><div class="${ssrRenderClass(["h-full rounded-full bg-purple-500 transition-all", step.value === "otp" ? "w-full" : "w-0"])}"></div></div><div class="${ssrRenderClass([
        "w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-all",
        step.value === "otp" ? "bg-purple-500 text-white shadow-lg shadow-purple-500/30" : "bg-gray-200 text-gray-400 dark:bg-gray-700"
      ])}"> 2 </div></div>`);
      if (step.value === "email") {
        _push(`<div><!-- Header --><div class="text-center mb-8"><div class="w-20 h-20 bg-linear-to-br from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 rounded-2xl flex items-center justify-center mx-auto mb-4">`);
        _push(ssrRenderComponent(_component_UIcon, {
          name: "i-heroicons-key",
          class: "w-10 h-10 text-purple-600 dark:text-purple-400"
        }, null, _parent));
        _push(`</div><h2 class="text-2xl font-bold text-gray-900 dark:text-white"> Reset Password </h2><p class="mt-2 text-gray-600 dark:text-gray-400"> Masukkan email Anda untuk menerima kode verifikasi </p></div><!-- Form --><form class="space-y-6"><!-- Error Alert -->`);
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
        _push(`<!-- Email Input --><div class="space-y-2"><label class="text-sm font-medium text-gray-700 dark:text-gray-300">Email</label>`);
        _push(ssrRenderComponent(_component_UInput, {
          modelValue: email.value,
          "onUpdate:modelValue": ($event) => email.value = $event,
          type: "email",
          placeholder: "email@example.com",
          icon: "i-heroicons-envelope",
          size: "lg",
          class: "w-full",
          autocomplete: "email",
          ui: { rounded: "rounded-xl" }
        }, null, _parent));
        _push(`</div><!-- Submit Button -->`);
        _push(ssrRenderComponent(_component_UButton, {
          type: "submit",
          color: "primary",
          size: "lg",
          block: "",
          loading: isLoading.value,
          disabled: !canSendOtp.value || isLoading.value,
          class: "rounded-xl h-12 bg-linear-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(_component_UIcon, {
                name: "i-heroicons-paper-airplane",
                class: "w-5 h-5 mr-2"
              }, null, _parent2, _scopeId));
              _push2(` Kirim Kode OTP `);
            } else {
              return [
                createVNode(_component_UIcon, {
                  name: "i-heroicons-paper-airplane",
                  class: "w-5 h-5 mr-2"
                }),
                createTextVNode(" Kirim Kode OTP ")
              ];
            }
          }),
          _: 1
          /* STABLE */
        }, _parent));
        _push(`</form><!-- Back to Login --><p class="mt-8 text-center text-sm text-gray-600 dark:text-gray-400"> Ingat password Anda? <a href="/login" class="font-semibold text-primary-600 hover:text-primary-500 ml-1"> Kembali ke Login </a></p></div>`);
      } else if (step.value === "otp") {
        _push(`<div><!-- Header --><div class="text-center mb-8"><div class="w-20 h-20 bg-linear-to-br from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 rounded-2xl flex items-center justify-center mx-auto mb-4">`);
        _push(ssrRenderComponent(_component_UIcon, {
          name: "i-heroicons-envelope-open",
          class: "w-10 h-10 text-purple-600 dark:text-purple-400"
        }, null, _parent));
        _push(`</div><h2 class="text-2xl font-bold text-gray-900 dark:text-white"> Verifikasi Email </h2><p class="mt-2 text-gray-600 dark:text-gray-400"> Masukkan kode OTP yang dikirim ke </p><p class="font-semibold text-purple-600 dark:text-purple-400">${ssrInterpolate(email.value)}</p></div><!-- OTP Form --><form class="space-y-6"><!-- Error Alert -->`);
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
        _push(`<!-- OTP Input --><div class="space-y-2"><label class="text-sm font-medium text-gray-700 dark:text-gray-300">Kode OTP (6 digit)</label>`);
        _push(ssrRenderComponent(_component_UInput, {
          modelValue: otpCode.value,
          "onUpdate:modelValue": ($event) => otpCode.value = $event,
          type: "text",
          placeholder: "000000",
          icon: "i-heroicons-key",
          size: "lg",
          class: "w-full",
          maxlength: "6",
          pattern: "[0-9]*",
          inputmode: "numeric",
          autocomplete: "one-time-code",
          ui: {
            rounded: "rounded-xl",
            base: "text-center tracking-[0.5em] font-mono text-2xl"
          }
        }, null, _parent));
        _push(`</div><!-- Timer & Resend --><div class="text-center">`);
        if (otpCountdown.value > 0) {
          _push(`<p class="text-sm text-gray-500 dark:text-gray-400"> Kirim ulang kode dalam <span class="font-semibold text-purple-600">${ssrInterpolate(otpCountdown.value)}</span> detik </p>`);
        } else {
          _push(`<button type="button"${ssrIncludeBooleanAttr(isLoading.value) ? " disabled" : ""} class="text-sm font-semibold text-purple-600 hover:text-purple-500 disabled:opacity-50"> Kirim Ulang Kode OTP </button>`);
        }
        _push(`</div><!-- Verify Button -->`);
        _push(ssrRenderComponent(_component_UButton, {
          type: "submit",
          color: "primary",
          size: "lg",
          block: "",
          loading: isLoading.value,
          disabled: !canVerifyOtp.value || isLoading.value,
          class: "rounded-xl h-12 bg-linear-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(_component_UIcon, {
                name: "i-heroicons-check-circle",
                class: "w-5 h-5 mr-2"
              }, null, _parent2, _scopeId));
              _push2(` Verifikasi OTP `);
            } else {
              return [
                createVNode(_component_UIcon, {
                  name: "i-heroicons-check-circle",
                  class: "w-5 h-5 mr-2"
                }),
                createTextVNode(" Verifikasi OTP ")
              ];
            }
          }),
          _: 1
          /* STABLE */
        }, _parent));
        _push(`<!-- Back Button -->`);
        _push(ssrRenderComponent(_component_UButton, {
          type: "button",
          color: "neutral",
          variant: "ghost",
          block: "",
          onClick: goBack,
          class: "rounded-xl"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(_component_UIcon, {
                name: "i-heroicons-arrow-left",
                class: "w-5 h-5 mr-2"
              }, null, _parent2, _scopeId));
              _push2(` Kembali `);
            } else {
              return [
                createVNode(_component_UIcon, {
                  name: "i-heroicons-arrow-left",
                  class: "w-5 h-5 mr-2"
                }),
                createTextVNode(" Kembali ")
              ];
            }
          }),
          _: 1
          /* STABLE */
        }, _parent));
        _push(`</form><!-- Info --><div class="mt-8 p-4 bg-gray-100 dark:bg-gray-800 rounded-xl"><div class="flex items-start gap-3">`);
        _push(ssrRenderComponent(_component_UIcon, {
          name: "i-heroicons-information-circle",
          class: "w-5 h-5 text-gray-500 shrink-0 mt-0.5"
        }, null, _parent));
        _push(`<p class="text-xs text-gray-500 dark:text-gray-400"> Kode OTP berlaku selama 5 menit. Periksa folder spam jika email tidak ditemukan di inbox. </p></div></div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div></div>`);
    };
  }
});

const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("inertia/pages/auth/forgot-password.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
