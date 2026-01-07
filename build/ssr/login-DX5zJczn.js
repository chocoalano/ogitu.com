import { _ as _sfc_main$5 } from './Checkbox-9gbT5PLz.js';
import { _ as _sfc_main$2, a as _sfc_main$4 } from './Button-BBveOjhJ.js';
import { _ as _sfc_main$3 } from './Badge-DaOjA2YD.js';
import { defineComponent, ref, computed, onUnmounted, mergeProps, withCtx, createVNode, createTextVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderClass, ssrInterpolate, ssrIncludeBooleanAttr } from 'vue/server-renderer';
import { _ as _sfc_main$1 } from './default-ChIG0McX.js';
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
import 'tailwind-variants';
import '@iconify/vue';
import 'ufo';
import 'reka-ui/namespaced';
import './Modal-lw8uQ47S.js';
import 'vaul-vue';
import './DropdownMenu-DnaZdPLR.js';

const _sfc_main = /* @__PURE__ */ defineComponent({
  ...{
    layout: _sfc_main$1
  },
  __name: "login",
  __ssrInlineRender: true,
  props: {
    redirect: {}
  },
  setup(__props) {
    const props = __props;
    const step = ref("credentials");
    const showPassword = ref(false);
    const isLoading = ref(false);
    const isSendingOtp = ref(false);
    const errorMessage = ref("");
    const form = ref({
      email: "",
      password: "",
      remember: false
    });
    const otpCode = ref("");
    const otpExpiry = ref(300);
    const otpTimer = ref(null);
    const canResend = ref(false);
    computed(() => props.redirect || "/");
    const formatTime = (seconds) => {
      const mins = Math.floor(seconds / 60);
      const secs = seconds % 60;
      return `${mins}:${secs.toString().padStart(2, "0")}`;
    };
    onUnmounted(() => {
      if (otpTimer.value) clearInterval(otpTimer.value);
    });
    const goBack = () => {
      step.value = "credentials";
      otpCode.value = "";
      if (otpTimer.value) clearInterval(otpTimer.value);
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UIcon = _sfc_main$2;
      const _component_UInput = _sfc_main$3;
      const _component_UButton = _sfc_main$4;
      const _component_UCheckbox = _sfc_main$5;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "min-h-screen flex" }, _attrs))}><!-- Left Side - Decorative --><div class="hidden lg:flex lg:w-1/2 bg-linear-to-br from-primary-600 via-purple-600 to-pink-600 relative overflow-hidden"><!-- Background Pattern --><div class="absolute inset-0 opacity-10"><div class="absolute top-20 left-20 w-72 h-72 bg-white rounded-full blur-3xl"></div><div class="absolute bottom-20 right-20 w-96 h-96 bg-white rounded-full blur-3xl"></div><div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-white rounded-full blur-2xl"></div></div><!-- Content --><div class="relative z-10 flex flex-col justify-center items-center text-white p-12"><!-- Logo --><div class="w-24 h-24 bg-white/20 backdrop-blur-sm rounded-3xl flex items-center justify-center mb-8 shadow-2xl">`);
      _push(ssrRenderComponent(_component_UIcon, {
        name: "i-heroicons-bolt",
        class: "w-14 h-14 text-white"
      }, null, _parent));
      _push(`</div><h1 class="text-4xl font-bold mb-4 text-center">OGITU Vape</h1><p class="text-xl text-white/80 mb-12 text-center">Premium Vape Marketplace</p><!-- Features --><div class="space-y-6 w-full max-w-sm"><div class="flex items-center gap-4 bg-white/10 backdrop-blur-sm rounded-2xl p-4"><div class="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">`);
      _push(ssrRenderComponent(_component_UIcon, {
        name: "i-heroicons-shield-check",
        class: "w-6 h-6"
      }, null, _parent));
      _push(`</div><div><div class="font-semibold">Keamanan Terjamin</div><div class="text-sm text-white/70">Verifikasi OTP untuk keamanan akun</div></div></div><div class="flex items-center gap-4 bg-white/10 backdrop-blur-sm rounded-2xl p-4"><div class="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">`);
      _push(ssrRenderComponent(_component_UIcon, {
        name: "i-heroicons-truck",
        class: "w-6 h-6"
      }, null, _parent));
      _push(`</div><div><div class="font-semibold">Gratis Ongkir</div><div class="text-sm text-white/70">Pengiriman gratis ke seluruh Indonesia</div></div></div><div class="flex items-center gap-4 bg-white/10 backdrop-blur-sm rounded-2xl p-4"><div class="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">`);
      _push(ssrRenderComponent(_component_UIcon, {
        name: "i-heroicons-sparkles",
        class: "w-6 h-6"
      }, null, _parent));
      _push(`</div><div><div class="font-semibold">Produk Original</div><div class="text-sm text-white/70">100% produk asli dan berkualitas</div></div></div></div><!-- Age Warning --><div class="mt-12 flex items-center gap-3 bg-amber-500/20 backdrop-blur-sm rounded-xl px-4 py-3">`);
      _push(ssrRenderComponent(_component_UIcon, {
        name: "i-heroicons-exclamation-triangle",
        class: "w-5 h-5 text-amber-300"
      }, null, _parent));
      _push(`<span class="text-sm text-amber-100">Khusus 21 tahun ke atas</span></div></div></div><!-- Right Side - Form --><div class="flex-1 flex items-center justify-center bg-gray-50 dark:bg-gray-950 p-4 sm:p-8"><div class="w-full max-w-md"><!-- Mobile Logo --><div class="lg:hidden text-center mb-8"><div class="w-16 h-16 bg-linear-to-br from-primary-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-primary-500/30">`);
      _push(ssrRenderComponent(_component_UIcon, {
        name: "i-heroicons-bolt",
        class: "w-9 h-9 text-white"
      }, null, _parent));
      _push(`</div><h1 class="text-2xl font-bold text-gray-900 dark:text-white">OGITU Vape</h1></div><!-- Step Indicator --><div class="flex items-center justify-center gap-3 mb-8"><div class="${ssrRenderClass([
        "w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-all",
        step.value === "credentials" ? "bg-primary-500 text-white shadow-lg shadow-primary-500/30" : "bg-primary-100 text-primary-600 dark:bg-primary-900/30"
      ])}"> 1 </div><div class="w-12 h-1 rounded-full bg-gray-200 dark:bg-gray-700"><div class="${ssrRenderClass(["h-full rounded-full bg-primary-500 transition-all", step.value === "otp" ? "w-full" : "w-0"])}"></div></div><div class="${ssrRenderClass([
        "w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-all",
        step.value === "otp" ? "bg-primary-500 text-white shadow-lg shadow-primary-500/30" : "bg-gray-200 text-gray-400 dark:bg-gray-700"
      ])}"> 2 </div></div><!-- Credentials Step -->`);
      if (step.value === "credentials") {
        _push(`<div><!-- Header --><div class="text-center mb-8"><h2 class="text-2xl font-bold text-gray-900 dark:text-white"> Masuk ke Akun </h2><p class="mt-2 text-gray-600 dark:text-gray-400"> Masukkan email dan password Anda </p></div><!-- Form --><form class="space-y-5"><!-- Error Alert -->`);
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
        _push(`<!-- Email --><div class="space-y-2"><label class="text-sm font-medium text-gray-700 dark:text-gray-300">Email</label>`);
        _push(ssrRenderComponent(_component_UInput, {
          modelValue: form.value.email,
          "onUpdate:modelValue": ($event) => form.value.email = $event,
          type: "email",
          placeholder: "email@example.com",
          icon: "i-heroicons-envelope",
          size: "lg",
          class: "w-full",
          autocomplete: "email",
          ui: { rounded: "rounded-xl" }
        }, null, _parent));
        _push(`</div><!-- Password --><div class="space-y-2"><label class="text-sm font-medium text-gray-700 dark:text-gray-300">Password</label>`);
        _push(ssrRenderComponent(_component_UInput, {
          modelValue: form.value.password,
          "onUpdate:modelValue": ($event) => form.value.password = $event,
          type: showPassword.value ? "text" : "password",
          placeholder: "••••••••",
          icon: "i-heroicons-lock-closed",
          size: "lg",
          class: "w-full",
          autocomplete: "current-password",
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
        _push(`</div><!-- Remember Me & Forgot Password --><div class="flex items-center justify-between">`);
        _push(ssrRenderComponent(_component_UCheckbox, {
          modelValue: form.value.remember,
          "onUpdate:modelValue": ($event) => form.value.remember = $event,
          label: "Ingat saya"
        }, null, _parent));
        _push(`<a href="/forgot-password" class="text-sm font-medium text-primary-600 hover:text-primary-500"> Lupa password? </a></div><!-- Submit Button -->`);
        _push(ssrRenderComponent(_component_UButton, {
          type: "submit",
          color: "primary",
          size: "lg",
          block: "",
          loading: isSendingOtp.value,
          disabled: isSendingOtp.value || !form.value.email || !form.value.password,
          class: "rounded-xl h-12"
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
        _push(`</form><!-- Divider --><div class="relative my-8"><div class="absolute inset-0 flex items-center"><div class="w-full border-t border-gray-200 dark:border-gray-700"></div></div><div class="relative flex justify-center text-sm"><span class="px-4 bg-gray-50 dark:bg-gray-950 text-gray-500"> Atau masuk dengan </span></div></div><!-- Social Login --><div class="grid grid-cols-2 gap-3">`);
        _push(ssrRenderComponent(_component_UButton, {
          color: "neutral",
          variant: "outline",
          size: "lg",
          block: "",
          disabled: "",
          class: "rounded-xl"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(_component_UIcon, {
                name: "i-simple-icons-google",
                class: "w-5 h-5 mr-2"
              }, null, _parent2, _scopeId));
              _push2(` Google `);
            } else {
              return [
                createVNode(_component_UIcon, {
                  name: "i-simple-icons-google",
                  class: "w-5 h-5 mr-2"
                }),
                createTextVNode(" Google ")
              ];
            }
          }),
          _: 1
          /* STABLE */
        }, _parent));
        _push(ssrRenderComponent(_component_UButton, {
          color: "neutral",
          variant: "outline",
          size: "lg",
          block: "",
          disabled: "",
          class: "rounded-xl"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(_component_UIcon, {
                name: "i-simple-icons-facebook",
                class: "w-5 h-5 mr-2"
              }, null, _parent2, _scopeId));
              _push2(` Facebook `);
            } else {
              return [
                createVNode(_component_UIcon, {
                  name: "i-simple-icons-facebook",
                  class: "w-5 h-5 mr-2"
                }),
                createTextVNode(" Facebook ")
              ];
            }
          }),
          _: 1
          /* STABLE */
        }, _parent));
        _push(`</div><!-- Register Link --><p class="mt-8 text-center text-sm text-gray-600 dark:text-gray-400"> Belum punya akun? <a href="/register" class="font-semibold text-primary-600 hover:text-primary-500 ml-1"> Daftar Sekarang </a></p></div>`);
      } else {
        _push(`<div><!-- Header --><div class="text-center mb-8"><div class="w-16 h-16 bg-primary-100 dark:bg-primary-900/30 rounded-2xl flex items-center justify-center mx-auto mb-4">`);
        _push(ssrRenderComponent(_component_UIcon, {
          name: "i-heroicons-envelope-open",
          class: "w-8 h-8 text-primary-600 dark:text-primary-400"
        }, null, _parent));
        _push(`</div><h2 class="text-2xl font-bold text-gray-900 dark:text-white"> Verifikasi OTP </h2><p class="mt-2 text-gray-600 dark:text-gray-400"> Masukkan 6 digit kode yang dikirim ke </p><p class="font-medium text-gray-900 dark:text-white">${ssrInterpolate(form.value.email)}</p></div><!-- OTP Form --><form class="space-y-6"><!-- Error Alert -->`);
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
        _push(`<!-- OTP Input --><div class="space-y-2"><label class="text-sm font-medium text-gray-700 dark:text-gray-300">Kode OTP</label>`);
        _push(ssrRenderComponent(_component_UInput, {
          modelValue: otpCode.value,
          "onUpdate:modelValue": ($event) => otpCode.value = $event,
          type: "text",
          placeholder: "000000",
          size: "xl",
          class: "w-full text-center tracking-[0.5em] font-mono text-2xl",
          maxlength: "6",
          autocomplete: "one-time-code",
          ui: { rounded: "rounded-xl" }
        }, null, _parent));
        _push(`</div><!-- Timer --><div class="text-center">`);
        if (!canResend.value) {
          _push(`<div class="flex items-center justify-center gap-2 text-gray-600 dark:text-gray-400">`);
          _push(ssrRenderComponent(_component_UIcon, {
            name: "i-heroicons-clock",
            class: "w-5 h-5"
          }, null, _parent));
          _push(`<span>Kode berlaku dalam <span class="font-semibold text-primary-600">${ssrInterpolate(formatTime(otpExpiry.value))}</span></span></div>`);
        } else {
          _push(`<div class="text-amber-600 dark:text-amber-400"> Kode OTP telah kadaluarsa </div>`);
        }
        _push(`</div><!-- Verify Button -->`);
        _push(ssrRenderComponent(_component_UButton, {
          type: "submit",
          color: "primary",
          size: "lg",
          block: "",
          loading: isLoading.value,
          disabled: isLoading.value || otpCode.value.length !== 6,
          class: "rounded-xl h-12"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(_component_UIcon, {
                name: "i-heroicons-check-badge",
                class: "w-5 h-5 mr-2"
              }, null, _parent2, _scopeId));
              _push2(` Verifikasi &amp; Masuk `);
            } else {
              return [
                createVNode(_component_UIcon, {
                  name: "i-heroicons-check-badge",
                  class: "w-5 h-5 mr-2"
                }),
                createTextVNode(" Verifikasi & Masuk ")
              ];
            }
          }),
          _: 1
          /* STABLE */
        }, _parent));
        _push(`<!-- Resend --><div class="text-center"><span class="text-gray-600 dark:text-gray-400">Tidak menerima kode? </span><button type="button"${ssrIncludeBooleanAttr(!canResend.value || isSendingOtp.value) ? " disabled" : ""} class="${ssrRenderClass([
          "font-semibold transition-colors",
          canResend.value ? "text-primary-600 hover:text-primary-500 cursor-pointer" : "text-gray-400 cursor-not-allowed"
        ])}">${ssrInterpolate(isSendingOtp.value ? "Mengirim..." : "Kirim Ulang")}</button></div><!-- Back Button -->`);
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
        _push(`</form></div>`);
      }
      _push(`</div></div></div>`);
    };
  }
});

const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("inertia/pages/auth/login.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
