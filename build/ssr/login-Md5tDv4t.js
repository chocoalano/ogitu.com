import { ref, computed, onUnmounted, defineComponent, mergeProps, useSSRContext, withCtx, createVNode, createTextVNode, toDisplayString, renderSlot, onMounted, unref } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderList, ssrRenderSlot, ssrRenderClass, ssrRenderAttr, ssrIncludeBooleanAttr } from 'vue/server-renderer';
import { _ as _sfc_main$b } from './default-ChIG0McX.js';
import { u as useToast, _ as _sfc_main$8 } from './Badge-DaOjA2YD.js';
import { _ as _sfc_main$7, a as _sfc_main$9 } from './Button-BBveOjhJ.js';
import { _ as _sfc_main$a } from './Checkbox-9gbT5PLz.js';
import 'reka-ui';
import './virtual_nuxt-ui-plugins-BqI2j5ZJ.js';
import '@unhead/vue/client';
import 'tailwindcss/colors';
import 'hookable';
import '@inertiajs/vue3';
import '@vueuse/core';
import 'defu';
import 'ohash/utils';
import '@unhead/vue';
import './Modal-lw8uQ47S.js';
import 'vaul-vue';
import './DropdownMenu-DnaZdPLR.js';
import 'reka-ui/namespaced';
import 'tailwind-variants';
import '@iconify/vue';
import 'ufo';

function useAdminAuth(config) {
  const { basePath, defaultRedirect, otpExpiryTime = 300 } = config;
  const toast = useToast();
  const step = ref("credentials");
  const isLoading = ref(false);
  const isSendingOtp = ref(false);
  const errorMessage = ref("");
  const form = ref({
    email: "",
    password: "",
    remember: false
  });
  const otpCode = ref("");
  const otpExpiry = ref(otpExpiryTime);
  const otpTimer = ref(null);
  const canResend = ref(false);
  const isCredentialsStep = computed(() => step.value === "credentials");
  const isOtpStep = computed(() => step.value === "otp");
  const isFormValid = computed(() => !!form.value.email && !!form.value.password);
  const isOtpValid = computed(() => otpCode.value.length === 6);
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };
  const formattedOtpExpiry = computed(() => formatTime(otpExpiry.value));
  const getXsrfToken = () => {
    const match = document.cookie.match(/XSRF-TOKEN=([^;]+)/);
    return match ? decodeURIComponent(match[1]) : "";
  };
  const apiRequest = async (endpoint, body) => {
    try {
      const response = await fetch(`${basePath}${endpoint}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
          "X-XSRF-TOKEN": getXsrfToken()
        },
        body: JSON.stringify(body)
      });
      const data = await response.json();
      return {
        success: data.success ?? false,
        data,
        message: data.message,
        redirect: data.redirect
      };
    } catch (error) {
      console.error(`API request error (${endpoint}):`, error);
      return {
        success: false,
        message: "Terjadi kesalahan, silakan coba lagi"
      };
    }
  };
  const startOtpTimer = () => {
    otpExpiry.value = otpExpiryTime;
    canResend.value = false;
    if (otpTimer.value) clearInterval(otpTimer.value);
    otpTimer.value = setInterval(() => {
      otpExpiry.value--;
      if (otpExpiry.value <= 0) {
        canResend.value = true;
        if (otpTimer.value) clearInterval(otpTimer.value);
      }
    }, 1e3);
  };
  const clearOtpTimer = () => {
    if (otpTimer.value) {
      clearInterval(otpTimer.value);
      otpTimer.value = null;
    }
  };
  const sendOtp = async () => {
    if (isSendingOtp.value || !isFormValid.value) return false;
    errorMessage.value = "";
    isSendingOtp.value = true;
    try {
      const result = await apiRequest("/send-otp", {
        email: form.value.email,
        password: form.value.password
      });
      if (result.success) {
        step.value = "otp";
        startOtpTimer();
        toast.success(result.message || "Kode OTP telah dikirim ke email Anda");
        return true;
      } else {
        errorMessage.value = result.message || "Gagal mengirim OTP";
        toast.error(result.message || "Gagal mengirim OTP");
        return false;
      }
    } finally {
      isSendingOtp.value = false;
    }
  };
  const verifyOtp = async (redirectTo) => {
    if (isLoading.value || !isOtpValid.value) return false;
    errorMessage.value = "";
    isLoading.value = true;
    try {
      const result = await apiRequest("/verify-otp", {
        email: form.value.email,
        otp: otpCode.value,
        remember: form.value.remember,
        redirect: redirectTo
      });
      if (result.success) {
        toast.success(result.message || "Login berhasil!");
        setTimeout(() => {
          globalThis.window?.location?.assign(result.redirect || defaultRedirect);
        }, 500);
        return true;
      } else {
        errorMessage.value = result.message || "Verifikasi OTP gagal";
        toast.error(result.message || "Verifikasi OTP gagal");
        return false;
      }
    } finally {
      isLoading.value = false;
    }
  };
  const resendOtp = async () => {
    if (!canResend.value || isSendingOtp.value) return false;
    isSendingOtp.value = true;
    errorMessage.value = "";
    try {
      const result = await apiRequest("/resend-otp", {
        email: form.value.email,
        type: "login"
      });
      if (result.success) {
        toast.success("Kode OTP baru telah dikirim");
        startOtpTimer();
        otpCode.value = "";
        return true;
      } else {
        toast.error(result.message || "Gagal mengirim ulang OTP");
        return false;
      }
    } finally {
      isSendingOtp.value = false;
    }
  };
  const goBack = () => {
    step.value = "credentials";
    otpCode.value = "";
    errorMessage.value = "";
    clearOtpTimer();
  };
  const reset = () => {
    step.value = "credentials";
    form.value = { email: "", password: "", remember: false };
    otpCode.value = "";
    errorMessage.value = "";
    isLoading.value = false;
    isSendingOtp.value = false;
    clearOtpTimer();
  };
  const setForm = (data) => {
    form.value = { ...form.value, ...data };
  };
  onUnmounted(() => {
    clearOtpTimer();
  });
  return {
    // State
    step,
    form,
    otpCode,
    otpExpiry,
    canResend,
    isLoading,
    isSendingOtp,
    errorMessage,
    // Computed
    isCredentialsStep,
    isOtpStep,
    isFormValid,
    isOtpValid,
    formattedOtpExpiry,
    // Methods
    sendOtp,
    verifyOtp,
    resendOtp,
    goBack,
    reset,
    setForm,
    formatTime
  };
}

const _sfc_main$6 = /* @__PURE__ */ defineComponent({
  __name: "AuthLoginSidebar",
  __ssrInlineRender: true,
  props: {
    logoIcon: { default: "i-heroicons-building-storefront" },
    title: { default: "Admin Center" },
    subtitle: { default: "Kelola toko dan produk Anda" },
    features: { default: () => [] },
    gradientFrom: { default: "emerald-600" },
    gradientVia: { default: "teal-600" },
    gradientTo: { default: "cyan-500" }
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UIcon = _sfc_main$7;
      _push(`<div${ssrRenderAttrs(mergeProps({
        class: [
          "hidden lg:flex lg:w-1/2 relative overflow-hidden",
          `bg-linear-to-br from-${__props.gradientFrom} via-${__props.gradientVia} to-${__props.gradientTo}`
        ]
      }, _attrs))}><!-- Background Pattern --><div class="absolute inset-0 opacity-10"><div class="absolute top-20 left-20 w-72 h-72 bg-white rounded-full blur-3xl"></div><div class="absolute bottom-20 right-20 w-96 h-96 bg-white rounded-full blur-3xl"></div><div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-white rounded-full blur-2xl"></div></div><!-- Content --><div class="relative z-10 flex flex-col justify-center items-center text-white p-12 w-full"><!-- Logo --><div class="w-24 h-24 bg-white/20 backdrop-blur-sm rounded-3xl flex items-center justify-center mb-8 shadow-2xl">`);
      _push(ssrRenderComponent(_component_UIcon, {
        name: __props.logoIcon,
        class: "w-14 h-14 text-white"
      }, null, _parent));
      _push(`</div><h1 class="text-4xl font-bold mb-4 text-center">${ssrInterpolate(__props.title)}</h1><p class="text-xl text-white/80 mb-12 text-center">${ssrInterpolate(__props.subtitle)}</p><!-- Features -->`);
      if (__props.features.length > 0) {
        _push(`<div class="space-y-6 w-full max-w-sm"><!--[-->`);
        ssrRenderList(__props.features, (feature, index) => {
          _push(`<div class="flex items-center gap-4 bg-white/10 backdrop-blur-sm rounded-2xl p-4"><div class="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center shrink-0">`);
          _push(ssrRenderComponent(_component_UIcon, {
            name: feature.icon,
            class: "w-6 h-6"
          }, null, _parent));
          _push(`</div><div><div class="font-semibold">${ssrInterpolate(feature.title)}</div><div class="text-sm text-white/70">${ssrInterpolate(feature.description)}</div></div></div>`);
        });
        _push(`<!--]--></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<!-- Custom Slot for additional content -->`);
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`</div></div>`);
    };
  }
});

const _sfc_setup$6 = _sfc_main$6.setup;
_sfc_main$6.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("inertia/components/auth/AuthLoginSidebar.vue");
  return _sfc_setup$6 ? _sfc_setup$6(props, ctx) : void 0;
};

const _sfc_main$5 = /* @__PURE__ */ defineComponent({
  __name: "AuthMobileLogo",
  __ssrInlineRender: true,
  props: {
    logoIcon: { default: "i-heroicons-building-storefront" },
    title: { default: "Admin Center" },
    mobileOnly: { type: Boolean, default: true }
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UIcon = _sfc_main$7;
      _push(`<div${ssrRenderAttrs(mergeProps({
        class: [__props.mobileOnly ? "lg:hidden" : "", "text-center mb-8"]
      }, _attrs))}><div class="w-16 h-16 bg-linear-to-br from-emerald-500 to-teal-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-emerald-500/30">`);
      _push(ssrRenderComponent(_component_UIcon, {
        name: __props.logoIcon,
        class: "w-9 h-9 text-white"
      }, null, _parent));
      _push(`</div><h1 class="text-2xl font-bold text-gray-900 dark:text-white">${ssrInterpolate(__props.title)}</h1>`);
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`</div>`);
    };
  }
});

const _sfc_setup$5 = _sfc_main$5.setup;
_sfc_main$5.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("inertia/components/auth/AuthMobileLogo.vue");
  return _sfc_setup$5 ? _sfc_setup$5(props, ctx) : void 0;
};

const _sfc_main$4 = /* @__PURE__ */ defineComponent({
  __name: "AuthStepIndicator",
  __ssrInlineRender: true,
  props: {
    currentStep: {},
    totalSteps: { default: 2 },
    activeColor: { default: "emerald" }
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "flex items-center justify-center gap-3 mb-8" }, _attrs))}><!--[-->`);
      ssrRenderList(__props.totalSteps, (stepNum) => {
        _push(`<!--[--><!-- Step Circle --><div class="${ssrRenderClass([
          "w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-all",
          stepNum <= __props.currentStep ? `bg-${__props.activeColor}-500 text-white shadow-lg shadow-${__props.activeColor}-500/30` : stepNum === __props.currentStep + 1 ? "bg-gray-200 text-gray-400 dark:bg-gray-700" : `bg-${__props.activeColor}-100 text-${__props.activeColor}-600 dark:bg-${__props.activeColor}-900/30`
        ])}">${ssrInterpolate(stepNum)}</div><!-- Connector Line (not after last step) -->`);
        if (stepNum < __props.totalSteps) {
          _push(`<div class="w-12 h-1 rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden"><div class="${ssrRenderClass([
            "h-full rounded-full transition-all",
            `bg-${__props.activeColor}-500`,
            stepNum < __props.currentStep ? "w-full" : "w-0"
          ])}"></div></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<!--]-->`);
      });
      _push(`<!--]--></div>`);
    };
  }
});

const _sfc_setup$4 = _sfc_main$4.setup;
_sfc_main$4.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("inertia/components/auth/AuthStepIndicator.vue");
  return _sfc_setup$4 ? _sfc_setup$4(props, ctx) : void 0;
};

const _sfc_main$3 = /* @__PURE__ */ defineComponent({
  __name: "AuthErrorAlert",
  __ssrInlineRender: true,
  props: {
    message: {}
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UIcon = _sfc_main$7;
      if (__props.message) {
        _push(`<div${ssrRenderAttrs(mergeProps({ class: "p-4 rounded-xl bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800" }, _attrs))}><div class="flex items-center gap-3"><div class="w-8 h-8 rounded-lg bg-red-100 dark:bg-red-900/30 flex items-center justify-center shrink-0">`);
        _push(ssrRenderComponent(_component_UIcon, {
          name: "i-heroicons-exclamation-circle",
          class: "w-5 h-5 text-red-500"
        }, null, _parent));
        _push(`</div><span class="text-sm text-red-700 dark:text-red-400">${ssrInterpolate(__props.message)}</span></div></div>`);
      } else {
        _push(`<!---->`);
      }
    };
  }
});

const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("inertia/components/auth/AuthErrorAlert.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};

const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "AuthCredentialsForm",
  __ssrInlineRender: true,
  props: {
    modelValue: {},
    errorMessage: { default: "" },
    isLoading: { type: Boolean, default: false },
    submitText: { default: "Kirim Kode OTP" },
    submitIcon: { default: "i-heroicons-paper-airplane" },
    showRegisterLink: { type: Boolean, default: true },
    registerUrl: { default: "/admin/register" },
    showCustomerLink: { type: Boolean, default: true },
    customerLoginUrl: { default: "/login" },
    forgotPasswordUrl: { default: "/forgot-password" }
  },
  emits: ["update:modelValue", "submit"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const showPassword = ref(false);
    const email = computed({
      get: () => props.modelValue.email,
      set: (value) => emit("update:modelValue", { ...props.modelValue, email: value })
    });
    const password = computed({
      get: () => props.modelValue.password,
      set: (value) => emit("update:modelValue", { ...props.modelValue, password: value })
    });
    const remember = computed({
      get: () => props.modelValue.remember,
      set: (value) => emit("update:modelValue", { ...props.modelValue, remember: value })
    });
    const isFormValid = computed(() => !!email.value && !!password.value);
    const togglePassword = () => {
      showPassword.value = !showPassword.value;
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UInput = _sfc_main$8;
      const _component_UButton = _sfc_main$9;
      const _component_UCheckbox = _sfc_main$a;
      const _component_UIcon = _sfc_main$7;
      _push(`<div${ssrRenderAttrs(_attrs)}><!-- Header --><div class="text-center mb-8"><h2 class="text-2xl font-bold text-gray-900 dark:text-white">`);
      ssrRenderSlot(_ctx.$slots, "title", {}, () => {
        _push(`Login Admin`);
      }, _push, _parent);
      _push(`</h2><p class="mt-2 text-gray-600 dark:text-gray-400">`);
      ssrRenderSlot(_ctx.$slots, "subtitle", {}, () => {
        _push(`Masuk ke Admin Center`);
      }, _push, _parent);
      _push(`</p></div><!-- Form --><form class="space-y-5"><!-- Error Alert -->`);
      _push(ssrRenderComponent(_sfc_main$3, { message: __props.errorMessage }, null, _parent));
      _push(`<!-- Email --><div class="space-y-2"><label class="text-sm font-medium text-gray-700 dark:text-gray-300">Email</label>`);
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
      _push(`</div><!-- Password --><div class="space-y-2"><label class="text-sm font-medium text-gray-700 dark:text-gray-300">Password</label>`);
      _push(ssrRenderComponent(_component_UInput, {
        modelValue: password.value,
        "onUpdate:modelValue": ($event) => password.value = $event,
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
              onClick: togglePassword
            }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_UButton, {
                icon: showPassword.value ? "i-heroicons-eye-slash" : "i-heroicons-eye",
                color: "neutral",
                variant: "ghost",
                size: "xs",
                onClick: togglePassword
              }, null, 8, ["icon"])
            ];
          }
        }),
        _: 1
        /* STABLE */
      }, _parent));
      _push(`</div><!-- Remember Me & Forgot Password --><div class="flex items-center justify-between">`);
      _push(ssrRenderComponent(_component_UCheckbox, {
        modelValue: remember.value,
        "onUpdate:modelValue": ($event) => remember.value = $event,
        label: "Ingat saya"
      }, null, _parent));
      _push(`<a${ssrRenderAttr("href", __props.forgotPasswordUrl)} class="text-sm font-medium text-emerald-600 hover:text-emerald-500"> Lupa password? </a></div><!-- Submit Button -->`);
      _push(ssrRenderComponent(_component_UButton, {
        type: "submit",
        color: "primary",
        size: "lg",
        block: "",
        loading: __props.isLoading,
        disabled: __props.isLoading || !isFormValid.value,
        class: "rounded-xl h-12 bg-linear-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_UIcon, {
              name: __props.submitIcon,
              class: "w-5 h-5 mr-2"
            }, null, _parent2, _scopeId));
            _push2(` ${ssrInterpolate(__props.submitText)}`);
          } else {
            return [
              createVNode(_component_UIcon, {
                name: __props.submitIcon,
                class: "w-5 h-5 mr-2"
              }, null, 8, ["name"]),
              createTextVNode(
                " " + toDisplayString(__props.submitText),
                1
                /* TEXT */
              )
            ];
          }
        }),
        _: 1
        /* STABLE */
      }, _parent));
      _push(`</form><!-- Register Link -->`);
      if (__props.showRegisterLink) {
        _push(`<div class="mt-8 p-4 bg-emerald-50 dark:bg-emerald-900/20 rounded-xl border border-emerald-200 dark:border-emerald-800"><p class="text-sm text-emerald-800 dark:text-emerald-200 text-center">`);
        ssrRenderSlot(_ctx.$slots, "register-text", {}, () => {
          _push(`Belum menjadi admin?`);
        }, _push, _parent);
        _push(`<a${ssrRenderAttr("href", __props.registerUrl)} class="font-semibold hover:underline ml-1">`);
        ssrRenderSlot(_ctx.$slots, "register-link-text", {}, () => {
          _push(`Daftar Sekarang`);
        }, _push, _parent);
        _push(`</a></p></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<!-- Back to Customer -->`);
      if (__props.showCustomerLink) {
        _push(`<p class="mt-4 text-center text-sm text-gray-600 dark:text-gray-400"><a${ssrRenderAttr("href", __props.customerLoginUrl)} class="font-medium text-gray-500 hover:text-gray-700">`);
        _push(ssrRenderComponent(_component_UIcon, {
          name: "i-heroicons-arrow-left",
          class: "w-4 h-4 inline mr-1"
        }, null, _parent));
        ssrRenderSlot(_ctx.$slots, "customer-link-text", {}, () => {
          _push(`Login sebagai Customer`);
        }, _push, _parent);
        _push(`</a></p>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
    };
  }
});

const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("inertia/components/auth/AuthCredentialsForm.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};

const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "AuthOtpForm",
  __ssrInlineRender: true,
  props: {
    modelValue: {},
    email: {},
    errorMessage: { default: "" },
    isVerifying: { type: Boolean, default: false },
    isResending: { type: Boolean, default: false },
    remainingTime: {},
    canResend: { type: Boolean },
    otpLength: { default: 6 }
  },
  emits: ["update:modelValue", "submit", "resend", "back"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const otpCode = computed({
      get: () => props.modelValue,
      set: (value) => emit("update:modelValue", value)
    });
    const isOtpValid = computed(() => otpCode.value.length === props.otpLength);
    const formatTime = (seconds) => {
      const mins = Math.floor(seconds / 60);
      const secs = seconds % 60;
      return `${mins}:${secs.toString().padStart(2, "0")}`;
    };
    const handleBack = () => {
      emit("back");
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UIcon = _sfc_main$7;
      const _component_UInput = _sfc_main$8;
      const _component_UButton = _sfc_main$9;
      _push(`<div${ssrRenderAttrs(_attrs)}><!-- Header --><div class="text-center mb-8"><div class="w-20 h-20 bg-linear-to-br from-emerald-100 to-teal-100 dark:from-emerald-900/30 dark:to-teal-900/30 rounded-2xl flex items-center justify-center mx-auto mb-4">`);
      _push(ssrRenderComponent(_component_UIcon, {
        name: "i-heroicons-shield-check",
        class: "w-10 h-10 text-emerald-600 dark:text-emerald-400"
      }, null, _parent));
      _push(`</div><h2 class="text-2xl font-bold text-gray-900 dark:text-white">`);
      ssrRenderSlot(_ctx.$slots, "title", {}, () => {
        _push(`Verifikasi OTP`);
      }, _push, _parent);
      _push(`</h2><p class="mt-2 text-gray-600 dark:text-gray-400">`);
      ssrRenderSlot(_ctx.$slots, "subtitle", {}, () => {
        _push(`Masukkan kode OTP yang dikirim ke`);
      }, _push, _parent);
      _push(`</p><p class="font-semibold text-emerald-600 dark:text-emerald-400">${ssrInterpolate(__props.email)}</p></div><!-- OTP Form --><form class="space-y-6"><!-- Error Alert -->`);
      _push(ssrRenderComponent(_sfc_main$3, { message: __props.errorMessage }, null, _parent));
      _push(`<!-- OTP Input --><div class="space-y-2"><label class="text-sm font-medium text-gray-700 dark:text-gray-300"> Kode OTP (${ssrInterpolate(__props.otpLength)} digit) </label>`);
      _push(ssrRenderComponent(_component_UInput, {
        modelValue: otpCode.value,
        "onUpdate:modelValue": ($event) => otpCode.value = $event,
        type: "text",
        placeholder: "000000",
        icon: "i-heroicons-key",
        size: "lg",
        class: "w-full",
        maxlength: __props.otpLength,
        pattern: "[0-9]*",
        inputmode: "numeric",
        autocomplete: "one-time-code",
        ui: {
          rounded: "rounded-xl",
          base: "text-center tracking-[0.5em] font-mono text-2xl"
        }
      }, null, _parent));
      _push(`</div><!-- Timer / Resend --><div class="text-center">`);
      if (!__props.canResend) {
        _push(`<p class="text-sm text-gray-500 dark:text-gray-400"> Kode berlaku selama <span class="font-semibold text-emerald-600">${ssrInterpolate(formatTime(__props.remainingTime))}</span></p>`);
      } else {
        _push(`<button type="button"${ssrIncludeBooleanAttr(__props.isResending) ? " disabled" : ""} class="text-sm font-semibold text-emerald-600 hover:text-emerald-500 disabled:opacity-50">`);
        if (__props.isResending) {
          _push(`<span>Mengirim...</span>`);
        } else {
          _push(`<span>Kirim Ulang Kode OTP</span>`);
        }
        _push(`</button>`);
      }
      _push(`</div><!-- Verify Button -->`);
      _push(ssrRenderComponent(_component_UButton, {
        type: "submit",
        color: "primary",
        size: "lg",
        block: "",
        loading: __props.isVerifying,
        disabled: __props.isVerifying || !isOtpValid.value,
        class: "rounded-xl h-12 bg-linear-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_UIcon, {
              name: "i-heroicons-check-circle",
              class: "w-5 h-5 mr-2"
            }, null, _parent2, _scopeId));
            ssrRenderSlot(_ctx.$slots, "submit-text", {}, () => {
              _push2(`Verifikasi &amp; Login`);
            }, _push2, _parent2, _scopeId);
          } else {
            return [
              createVNode(_component_UIcon, {
                name: "i-heroicons-check-circle",
                class: "w-5 h-5 mr-2"
              }),
              renderSlot(_ctx.$slots, "submit-text", {}, () => [
                createTextVNode("Verifikasi & Login")
              ])
            ];
          }
        }),
        _: 3
        /* FORWARDED */
      }, _parent));
      _push(`<!-- Back Button -->`);
      _push(ssrRenderComponent(_component_UButton, {
        type: "button",
        color: "neutral",
        variant: "ghost",
        block: "",
        onClick: handleBack,
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
      _push(`<p class="text-xs text-gray-500 dark:text-gray-400">`);
      ssrRenderSlot(_ctx.$slots, "info-text", {}, () => {
        _push(` Kode OTP berlaku selama 5 menit. Periksa folder spam jika email tidak ditemukan di inbox. `);
      }, _push, _parent);
      _push(`</p></div></div></div>`);
    };
  }
});

const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("inertia/components/auth/AuthOtpForm.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};

const _sfc_main = /* @__PURE__ */ defineComponent({
  ...{
    layout: _sfc_main$b
  },
  __name: "login",
  __ssrInlineRender: true,
  props: {
    redirect: {}
  },
  setup(__props) {
    const props = __props;
    const auth = useAdminAuth({
      basePath: "/admin/auth",
      defaultRedirect: "/admin/dashboard"
    });
    const redirectTo = computed(() => props.redirect || "/admin/dashboard");
    const currentStep = computed(() => auth.isOtpStep.value ? 2 : 1);
    const sidebarFeatures = [
      {
        icon: "i-heroicons-chart-bar",
        title: "Dashboard Analytics",
        description: "Pantau performa penjualan Anda"
      },
      {
        icon: "i-heroicons-cube",
        title: "Manajemen Produk",
        description: "Upload dan atur produk dengan mudah"
      },
      {
        icon: "i-heroicons-truck",
        title: "Kelola Pesanan",
        description: "Proses pesanan pelanggan Anda"
      }
    ];
    const handleSendOtp = () => auth.sendOtp();
    const handleVerifyOtp = () => auth.verifyOtp(redirectTo.value);
    const handleResendOtp = () => auth.resendOtp();
    const handleGoBack = () => auth.goBack();
    onMounted(() => {
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "min-h-screen flex" }, _attrs))}><!-- Left Side - Decorative Sidebar -->`);
      _push(ssrRenderComponent(_sfc_main$6, {
        title: "Admin Center",
        subtitle: "Kelola toko dan produk Anda",
        features: sidebarFeatures
      }, null, _parent));
      _push(`<!-- Right Side - Form --><div class="flex-1 flex items-center justify-center bg-gray-50 dark:bg-gray-950 p-4 sm:p-8"><div class="w-full max-w-md"><!-- Mobile Logo -->`);
      _push(ssrRenderComponent(_sfc_main$5, { title: "Admin Center" }, null, _parent));
      _push(`<!-- Step Indicator -->`);
      _push(ssrRenderComponent(_sfc_main$4, {
        "current-step": currentStep.value,
        "total-steps": 2
      }, null, _parent));
      _push(`<!-- Form Steps with Transition -->`);
      if (unref(auth).isCredentialsStep.value) {
        _push(ssrRenderComponent(_sfc_main$2, {
          key: "credentials",
          modelValue: unref(auth).form.value,
          "onUpdate:modelValue": ($event) => unref(auth).form.value = $event,
          "error-message": unref(auth).errorMessage.value,
          "is-loading": unref(auth).isSendingOtp.value,
          onSubmit: handleSendOtp
        }, {
          title: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`Login Admin`);
            } else {
              return [
                createTextVNode("Login Admin")
              ];
            }
          }),
          subtitle: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`Masuk ke Admin Center OGITU`);
            } else {
              return [
                createTextVNode("Masuk ke Admin Center OGITU")
              ];
            }
          }),
          _: 1
          /* STABLE */
        }, _parent));
      } else {
        _push(ssrRenderComponent(_sfc_main$1, {
          key: "otp",
          modelValue: unref(auth).otpCode.value,
          "onUpdate:modelValue": ($event) => unref(auth).otpCode.value = $event,
          email: unref(auth).form.value.email,
          "error-message": unref(auth).errorMessage.value,
          "is-verifying": unref(auth).isLoading.value,
          "is-resending": unref(auth).isSendingOtp.value,
          "remaining-time": unref(auth).otpExpiry.value,
          "can-resend": unref(auth).canResend.value,
          onSubmit: handleVerifyOtp,
          onResend: handleResendOtp,
          onBack: handleGoBack
        }, null, _parent));
      }
      _push(`</div></div></div>`);
    };
  }
});

const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("inertia/pages/admin/auth/login.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
