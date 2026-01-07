import { _ as _sfc_main$5 } from './Checkbox-DCS-_c5K.js';
import { _ as _sfc_main$2, a as _sfc_main$4 } from './Button-BTdvmZ8N.js';
import { _ as _sfc_main$3 } from './Badge-CQlYH3Fo.js';
import { defineComponent, ref, computed, watch, mergeProps, withCtx, createVNode, createTextVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderClass, ssrInterpolate, ssrIncludeBooleanAttr } from 'vue/server-renderer';
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
import 'tailwind-variants';
import '@iconify/vue';
import 'ufo';
import 'reka-ui/namespaced';
import './Modal-VctJV7vb.js';
import 'vaul-vue';
import './DropdownMenu-Zcq6i1qV.js';

const _sfc_main = /* @__PURE__ */ defineComponent({
  ...{
    layout: _sfc_main$1
  },
  __name: "register",
  __ssrInlineRender: true,
  setup(__props) {
    const step = ref("info");
    const showPassword = ref(false);
    const showConfirmPassword = ref(false);
    const isLoading = ref(false);
    const errorMessage = ref("");
    const ageConfirmed = ref(false);
    const otpCode = ref("");
    const otpCountdown = ref(0);
    const otpTimer = ref(null);
    const form = ref({
      fullName: "",
      email: "",
      phone: "",
      password: "",
      passwordConfirmation: "",
      birthDate: "",
      agreeTerms: false
    });
    const passwordMatch = computed(() => {
      if (!form.value.passwordConfirmation) return true;
      return form.value.password === form.value.passwordConfirmation;
    });
    const calculatedAge = computed(() => {
      if (!form.value.birthDate) return null;
      const birth = new Date(form.value.birthDate);
      const today = /* @__PURE__ */ new Date();
      let age = today.getFullYear() - birth.getFullYear();
      const monthDiff = today.getMonth() - birth.getMonth();
      if (monthDiff < 0 || monthDiff === 0 && today.getDate() < birth.getDate()) {
        age--;
      }
      return age;
    });
    const isAgeValid = computed(() => {
      return calculatedAge.value !== null && calculatedAge.value >= 21;
    });
    const canProceedToOtp = computed(() => {
      return form.value.fullName.trim() !== "" && form.value.email.trim() !== "" && form.value.password.length >= 8 && passwordMatch.value && form.value.agreeTerms && form.value.birthDate !== "" && isAgeValid.value && ageConfirmed.value;
    });
    watch(() => form.value.birthDate, () => {
      ageConfirmed.value = false;
    });
    const goBack = () => {
      step.value = "info";
      otpCode.value = "";
      if (otpTimer.value) clearInterval(otpTimer.value);
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UIcon = _sfc_main$2;
      const _component_UInput = _sfc_main$3;
      const _component_UButton = _sfc_main$4;
      const _component_UCheckbox = _sfc_main$5;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "min-h-screen flex" }, _attrs))}><!-- Left Side - Decorative --><div class="hidden lg:flex lg:w-1/2 bg-linear-to-br from-purple-600 via-pink-600 to-orange-500 relative overflow-hidden"><!-- Background Pattern --><div class="absolute inset-0 opacity-10"><div class="absolute top-20 left-20 w-72 h-72 bg-white rounded-full blur-3xl"></div><div class="absolute bottom-20 right-20 w-96 h-96 bg-white rounded-full blur-3xl"></div><div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-white rounded-full blur-2xl"></div></div><!-- Content --><div class="relative z-10 flex flex-col justify-center items-center text-white p-12"><!-- Logo --><div class="w-24 h-24 bg-white/20 backdrop-blur-sm rounded-3xl flex items-center justify-center mb-8 shadow-2xl">`);
      _push(ssrRenderComponent(_component_UIcon, {
        name: "i-heroicons-bolt",
        class: "w-14 h-14 text-white"
      }, null, _parent));
      _push(`</div><h1 class="text-4xl font-bold mb-4 text-center">Bergabung dengan OGITU</h1><p class="text-xl text-white/80 mb-12 text-center">Nikmati pengalaman belanja vape terbaik</p><!-- Benefits --><div class="space-y-6 w-full max-w-sm"><div class="flex items-center gap-4 bg-white/10 backdrop-blur-sm rounded-2xl p-4"><div class="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">`);
      _push(ssrRenderComponent(_component_UIcon, {
        name: "i-heroicons-gift",
        class: "w-6 h-6"
      }, null, _parent));
      _push(`</div><div><div class="font-semibold">Diskon Member</div><div class="text-sm text-white/70">Dapatkan diskon eksklusif member</div></div></div><div class="flex items-center gap-4 bg-white/10 backdrop-blur-sm rounded-2xl p-4"><div class="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">`);
      _push(ssrRenderComponent(_component_UIcon, {
        name: "i-heroicons-currency-dollar",
        class: "w-6 h-6"
      }, null, _parent));
      _push(`</div><div><div class="font-semibold">Poin Rewards</div><div class="text-sm text-white/70">Kumpulkan poin dari setiap transaksi</div></div></div><div class="flex items-center gap-4 bg-white/10 backdrop-blur-sm rounded-2xl p-4"><div class="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">`);
      _push(ssrRenderComponent(_component_UIcon, {
        name: "i-heroicons-bell",
        class: "w-6 h-6"
      }, null, _parent));
      _push(`</div><div><div class="font-semibold">Notifikasi Promo</div><div class="text-sm text-white/70">Info flash sale &amp; promo terbaru</div></div></div></div><!-- Age Warning --><div class="mt-12 p-4 bg-amber-500/20 backdrop-blur-sm rounded-xl"><div class="flex items-center gap-3 mb-2">`);
      _push(ssrRenderComponent(_component_UIcon, {
        name: "i-heroicons-exclamation-triangle",
        class: "w-6 h-6 text-amber-300"
      }, null, _parent));
      _push(`<span class="font-semibold text-amber-100">Verifikasi Usia Diperlukan</span></div><p class="text-sm text-amber-100/80"> Produk vape hanya untuk pengguna berusia 21 tahun ke atas. Anda akan diminta untuk memverifikasi usia saat pendaftaran. </p></div></div></div><!-- Right Side - Form --><div class="flex-1 flex items-center justify-center bg-gray-50 dark:bg-gray-950 p-4 sm:p-8 overflow-y-auto"><div class="w-full max-w-md py-8"><!-- Mobile Logo --><div class="lg:hidden text-center mb-8"><div class="w-16 h-16 bg-linear-to-br from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-purple-500/30">`);
      _push(ssrRenderComponent(_component_UIcon, {
        name: "i-heroicons-bolt",
        class: "w-9 h-9 text-white"
      }, null, _parent));
      _push(`</div><h1 class="text-2xl font-bold text-gray-900 dark:text-white">Daftar OGITU</h1></div><!-- Step Indicator --><div class="flex items-center justify-center gap-3 mb-8"><div class="${ssrRenderClass([
        "w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-all",
        step.value === "info" ? "bg-purple-500 text-white shadow-lg shadow-purple-500/30" : "bg-purple-100 text-purple-600 dark:bg-purple-900/30"
      ])}"> 1 </div><div class="w-12 h-1 rounded-full bg-gray-200 dark:bg-gray-700"><div class="${ssrRenderClass(["h-full rounded-full bg-purple-500 transition-all", step.value === "otp" ? "w-full" : "w-0"])}"></div></div><div class="${ssrRenderClass([
        "w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-all",
        step.value === "otp" ? "bg-purple-500 text-white shadow-lg shadow-purple-500/30" : "bg-gray-200 text-gray-400 dark:bg-gray-700"
      ])}"> 2 </div></div><!-- Info Step -->`);
      if (step.value === "info") {
        _push(`<div><!-- Header --><div class="text-center mb-8"><h2 class="text-2xl font-bold text-gray-900 dark:text-white"> Buat Akun Baru </h2><p class="mt-2 text-gray-600 dark:text-gray-400"> Isi data diri Anda untuk mendaftar </p></div><!-- Form --><form class="space-y-4"><!-- Error Alert -->`);
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
        _push(`<!-- Full Name --><div class="space-y-2"><label class="text-sm font-medium text-gray-700 dark:text-gray-300">Nama Lengkap <span class="text-red-500">*</span></label>`);
        _push(ssrRenderComponent(_component_UInput, {
          modelValue: form.value.fullName,
          "onUpdate:modelValue": ($event) => form.value.fullName = $event,
          type: "text",
          placeholder: "John Doe",
          icon: "i-heroicons-user",
          size: "lg",
          class: "w-full",
          autocomplete: "name",
          ui: { rounded: "rounded-xl" }
        }, null, _parent));
        _push(`</div><!-- Email --><div class="space-y-2"><label class="text-sm font-medium text-gray-700 dark:text-gray-300">Email <span class="text-red-500">*</span></label>`);
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
        _push(`</div><!-- Phone --><div class="space-y-2"><label class="text-sm font-medium text-gray-700 dark:text-gray-300">Nomor Telepon</label>`);
        _push(ssrRenderComponent(_component_UInput, {
          modelValue: form.value.phone,
          "onUpdate:modelValue": ($event) => form.value.phone = $event,
          type: "tel",
          placeholder: "08xxxxxxxxxx",
          icon: "i-heroicons-phone",
          size: "lg",
          class: "w-full",
          autocomplete: "tel",
          ui: { rounded: "rounded-xl" }
        }, null, _parent));
        _push(`</div><!-- Birth Date --><div class="space-y-2"><label class="text-sm font-medium text-gray-700 dark:text-gray-300">Tanggal Lahir <span class="text-red-500">*</span></label>`);
        _push(ssrRenderComponent(_component_UInput, {
          modelValue: form.value.birthDate,
          "onUpdate:modelValue": ($event) => form.value.birthDate = $event,
          type: "date",
          icon: "i-heroicons-calendar",
          size: "lg",
          class: "w-full",
          max: (/* @__PURE__ */ new Date()).toISOString().split("T")[0],
          ui: { rounded: "rounded-xl" }
        }, null, _parent));
        _push(`<!-- Age Verification Display -->`);
        if (form.value.birthDate) {
          _push(`<div class="${ssrRenderClass([[
            isAgeValid.value ? "bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800" : "bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800"
          ], "mt-2 p-3 rounded-lg"])}"><div class="flex items-center gap-2">`);
          _push(ssrRenderComponent(_component_UIcon, {
            name: isAgeValid.value ? "i-heroicons-check-circle" : "i-heroicons-x-circle",
            class: ["w-5 h-5", isAgeValid.value ? "text-green-600" : "text-red-500"]
          }, null, _parent));
          _push(`<span class="${ssrRenderClass(["text-sm font-medium", isAgeValid.value ? "text-green-700 dark:text-green-400" : "text-red-700 dark:text-red-400"])}"> Usia: ${ssrInterpolate(calculatedAge.value)} tahun `);
          if (!isAgeValid.value) {
            _push(`<span class="font-normal"> (minimal 21 tahun)</span>`);
          } else {
            _push(`<!---->`);
          }
          _push(`</span></div></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div><!-- Password --><div class="space-y-2"><label class="text-sm font-medium text-gray-700 dark:text-gray-300">Password <span class="text-red-500">*</span></label>`);
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
        _push(`</div><!-- Confirm Password --><div class="space-y-2"><label class="text-sm font-medium text-gray-700 dark:text-gray-300">Konfirmasi Password <span class="text-red-500">*</span></label>`);
        _push(ssrRenderComponent(_component_UInput, {
          modelValue: form.value.passwordConfirmation,
          "onUpdate:modelValue": ($event) => form.value.passwordConfirmation = $event,
          type: showConfirmPassword.value ? "text" : "password",
          placeholder: "Ulangi password",
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
        _push(`</div><!-- Terms Checkbox --><div class="pt-2">`);
        _push(ssrRenderComponent(_component_UCheckbox, {
          modelValue: form.value.agreeTerms,
          "onUpdate:modelValue": ($event) => form.value.agreeTerms = $event
        }, {
          label: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<span class="text-sm text-gray-600 dark:text-gray-400"${_scopeId}> Saya setuju dengan <a href="/terms" class="text-primary-600 hover:text-primary-500 font-medium"${_scopeId}>Syarat &amp; Ketentuan</a> dan <a href="/privacy" class="text-primary-600 hover:text-primary-500 font-medium"${_scopeId}>Kebijakan Privasi</a></span>`);
            } else {
              return [
                createVNode("span", { class: "text-sm text-gray-600 dark:text-gray-400" }, [
                  createTextVNode(" Saya setuju dengan "),
                  createVNode("a", {
                    href: "/terms",
                    class: "text-primary-600 hover:text-primary-500 font-medium"
                  }, "Syarat & Ketentuan"),
                  createTextVNode(" dan "),
                  createVNode("a", {
                    href: "/privacy",
                    class: "text-primary-600 hover:text-primary-500 font-medium"
                  }, "Kebijakan Privasi")
                ])
              ];
            }
          }),
          _: 1
          /* STABLE */
        }, _parent));
        _push(`</div><!-- Age Confirmation Checkbox -->`);
        if (isAgeValid.value) {
          _push(`<div class="p-4 bg-amber-50 dark:bg-amber-900/20 rounded-xl border border-amber-200 dark:border-amber-800">`);
          _push(ssrRenderComponent(_component_UCheckbox, {
            modelValue: ageConfirmed.value,
            "onUpdate:modelValue": ($event) => ageConfirmed.value = $event
          }, {
            label: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`<span class="text-sm text-amber-800 dark:text-amber-200"${_scopeId}> Saya menyatakan dengan sesungguhnya bahwa saya berusia <strong${_scopeId}>21 tahun atau lebih</strong> dan memahami bahwa produk vape/rokok elektrik memiliki risiko kesehatan. </span>`);
              } else {
                return [
                  createVNode("span", { class: "text-sm text-amber-800 dark:text-amber-200" }, [
                    createTextVNode(" Saya menyatakan dengan sesungguhnya bahwa saya berusia "),
                    createVNode("strong", null, "21 tahun atau lebih"),
                    createTextVNode(" dan memahami bahwa produk vape/rokok elektrik memiliki risiko kesehatan. ")
                  ])
                ];
              }
            }),
            _: 1
            /* STABLE */
          }, _parent));
          _push(`</div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<!-- Next Button -->`);
        _push(ssrRenderComponent(_component_UButton, {
          type: "submit",
          color: "primary",
          size: "lg",
          block: "",
          loading: isLoading.value,
          disabled: !canProceedToOtp.value || isLoading.value,
          class: "rounded-xl h-12 mt-6 bg-linear-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<span${_scopeId}>Lanjutkan</span>`);
              _push2(ssrRenderComponent(_component_UIcon, {
                name: "i-heroicons-arrow-right",
                class: "w-5 h-5 ml-2"
              }, null, _parent2, _scopeId));
            } else {
              return [
                createVNode("span", null, "Lanjutkan"),
                createVNode(_component_UIcon, {
                  name: "i-heroicons-arrow-right",
                  class: "w-5 h-5 ml-2"
                })
              ];
            }
          }),
          _: 1
          /* STABLE */
        }, _parent));
        _push(`</form><!-- Login Link --><p class="mt-8 text-center text-sm text-gray-600 dark:text-gray-400"> Sudah punya akun? <a href="/login" class="font-semibold text-primary-600 hover:text-primary-500 ml-1"> Masuk di sini </a></p></div>`);
      } else {
        _push(`<div><!-- Header --><div class="text-center mb-8"><div class="w-20 h-20 bg-linear-to-br from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 rounded-2xl flex items-center justify-center mx-auto mb-4">`);
        _push(ssrRenderComponent(_component_UIcon, {
          name: "i-heroicons-envelope-open",
          class: "w-10 h-10 text-purple-600 dark:text-purple-400"
        }, null, _parent));
        _push(`</div><h2 class="text-2xl font-bold text-gray-900 dark:text-white"> Verifikasi Email </h2><p class="mt-2 text-gray-600 dark:text-gray-400"> Masukkan kode OTP yang dikirim ke </p><p class="font-semibold text-purple-600 dark:text-purple-400">${ssrInterpolate(form.value.email)}</p></div><!-- OTP Form --><form class="space-y-6"><!-- Error Alert -->`);
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
          disabled: otpCode.value.length !== 6 || isLoading.value,
          class: "rounded-xl h-12 bg-linear-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(_component_UIcon, {
                name: "i-heroicons-check-circle",
                class: "w-5 h-5 mr-2"
              }, null, _parent2, _scopeId));
              _push2(` Verifikasi &amp; Daftar `);
            } else {
              return [
                createVNode(_component_UIcon, {
                  name: "i-heroicons-check-circle",
                  class: "w-5 h-5 mr-2"
                }),
                createTextVNode(" Verifikasi & Daftar ")
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
      }
      _push(`</div></div></div>`);
    };
  }
});

const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("inertia/pages/auth/register.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
