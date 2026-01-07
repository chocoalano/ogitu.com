import { ref, computed, defineComponent, mergeProps, unref, withCtx, createVNode, createTextVNode, useSSRContext, toDisplayString } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderAttr, ssrInterpolate, ssrRenderClass, ssrRenderList } from 'vue/server-renderer';
import { Link, Head } from '@inertiajs/vue3';
import { _ as _sfc_main$b } from './default-pjkA2Ka0.js';
import { _ as _sfc_main$8, a as _sfc_main$9 } from './Button-BTdvmZ8N.js';
import { _ as _sfc_main$a, b as _export_sfc } from './Badge-CQlYH3Fo.js';
import 'reka-ui';
import './virtual_nuxt-ui-plugins-CrG8Uaxr.js';
import '@unhead/vue/client';
import 'tailwindcss/colors';
import 'hookable';
import '@vueuse/core';
import 'defu';
import 'ohash/utils';
import '@unhead/vue';
import './Modal-VctJV7vb.js';
import 'vaul-vue';
import './DropdownMenu-Zcq6i1qV.js';
import 'reka-ui/namespaced';
import './Checkbox-DCS-_c5K.js';
import 'tailwind-variants';
import '@iconify/vue';
import 'ufo';

function useProfile({ customer }) {
  const isEditing = ref(false);
  const isSaving = ref(false);
  const error = ref(null);
  const form = ref({
    fullName: customer.fullName,
    phone: customer.phone || ""
  });
  const initials = computed(() => {
    return customer.fullName.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2);
  });
  const hasChanges = computed(() => {
    return form.value.fullName !== customer.fullName || form.value.phone !== (customer.phone || "");
  });
  const formatPrice = (price) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(price);
  };
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("id-ID", {
      year: "numeric",
      month: "long",
      day: "numeric"
    });
  };
  const getXsrfToken = () => {
    if (typeof document === "undefined") return null;
    const match = document.cookie.match(/XSRF-TOKEN=([^;]+)/);
    return match ? decodeURIComponent(match[1]) : null;
  };
  const startEditing = () => {
    isEditing.value = true;
    error.value = null;
  };
  const cancelEdit = () => {
    form.value.fullName = customer.fullName;
    form.value.phone = customer.phone || "";
    isEditing.value = false;
    error.value = null;
  };
  const saveProfile = async () => {
    if (!hasChanges.value) {
      isEditing.value = false;
      return true;
    }
    isSaving.value = true;
    error.value = null;
    try {
      const xsrfToken = getXsrfToken();
      const response = await fetch("/api/profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
          "X-Requested-With": "XMLHttpRequest",
          ...xsrfToken && { "X-XSRF-TOKEN": xsrfToken }
        },
        body: JSON.stringify(form.value)
      });
      const data = await response.json();
      if (data.success) {
        isEditing.value = false;
        globalThis.window?.location?.reload();
        return true;
      } else {
        error.value = data.message || "Gagal menyimpan profil";
        return false;
      }
    } catch (err) {
      console.error("Failed to save profile:", err);
      error.value = "Terjadi kesalahan saat menyimpan profil";
      return false;
    } finally {
      isSaving.value = false;
    }
  };
  return {
    // State
    isEditing,
    isSaving,
    error,
    form,
    // Computed
    initials,
    hasChanges,
    // Formatters
    formatPrice,
    formatDate,
    // Actions
    startEditing,
    cancelEdit,
    saveProfile
  };
}

const _sfc_main$7 = /* @__PURE__ */ defineComponent({
  __name: "ProfileBreadcrumb",
  __ssrInlineRender: true,
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UIcon = _sfc_main$8;
      _push(`<nav${ssrRenderAttrs(mergeProps({ class: "flex items-center gap-2 text-sm mb-6" }, _attrs))}>`);
      _push(ssrRenderComponent(unref(Link), {
        href: "/",
        class: "text-gray-500 hover:text-primary-500 transition-colors"
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
        class: "w-4 h-4 text-gray-400"
      }, null, _parent));
      _push(ssrRenderComponent(unref(Link), {
        href: "/dashboard",
        class: "text-gray-500 hover:text-primary-500 transition-colors"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` Dashboard `);
          } else {
            return [
              createTextVNode(" Dashboard ")
            ];
          }
        }),
        _: 1
        /* STABLE */
      }, _parent));
      _push(ssrRenderComponent(_component_UIcon, {
        name: "i-heroicons-chevron-right",
        class: "w-4 h-4 text-gray-400"
      }, null, _parent));
      _push(`<span class="text-gray-900 dark:text-white font-medium">Profil</span></nav>`);
    };
  }
});

const _sfc_setup$7 = _sfc_main$7.setup;
_sfc_main$7.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("inertia/components/profile/ProfileBreadcrumb.vue");
  return _sfc_setup$7 ? _sfc_setup$7(props, ctx) : void 0;
};

const _sfc_main$6 = /* @__PURE__ */ defineComponent({
  __name: "ProfileHeader",
  __ssrInlineRender: true,
  props: {
    customer: {},
    currentRank: {},
    initials: {},
    isEditing: { type: Boolean },
    formatDate: { type: Function }
  },
  emits: ["edit"],
  setup(__props, { emit: __emit }) {
    const emit = __emit;
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UIcon = _sfc_main$8;
      const _component_UButton = _sfc_main$9;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "relative bg-white dark:bg-gray-800/80 rounded-3xl border border-gray-200/80 dark:border-gray-700/50 overflow-hidden mb-8" }, _attrs))}><!-- Header Background with Gradient --><div class="h-32 sm:h-40 bg-linear-to-r from-primary-500 via-purple-500 to-cyan-500 relative"><!-- Pattern Overlay --><div class="absolute inset-0 opacity-20"><svg class="w-full h-full" xmlns="http://www.w3.org/2000/svg"><defs><pattern id="vape-pattern" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse"><circle cx="20" cy="20" r="2" fill="white"></circle></pattern></defs><rect width="100%" height="100%" fill="url(#vape-pattern)"></rect></svg></div><!-- Smoke Effect --><div class="absolute bottom-0 left-0 right-0 h-16 bg-linear-to-t from-white dark:from-gray-800/80 to-transparent"></div></div><!-- Profile Content --><div class="relative px-6 sm:px-8 pb-6"><!-- Avatar --><div class="absolute -top-16 left-6 sm:left-8"><div class="relative"><div class="w-28 h-28 sm:w-32 sm:h-32 rounded-2xl bg-linear-to-br from-primary-500 to-purple-600 p-1 shadow-xl shadow-primary-500/30"><div class="w-full h-full rounded-xl bg-white dark:bg-gray-800 flex items-center justify-center overflow-hidden">`);
      if (__props.customer.avatar) {
        _push(`<img${ssrRenderAttr("src", __props.customer.avatar)}${ssrRenderAttr("alt", __props.customer.fullName)} class="w-full h-full object-cover">`);
      } else {
        _push(`<span class="text-3xl sm:text-4xl font-bold bg-linear-to-br from-primary-500 to-purple-600 bg-clip-text text-transparent">${ssrInterpolate(__props.initials)}</span>`);
      }
      _push(`</div></div><!-- Verified Badge -->`);
      if (__props.customer.isVerified) {
        _push(`<div class="absolute -bottom-1 -right-1 w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center shadow-lg">`);
        _push(ssrRenderComponent(_component_UIcon, {
          name: "i-heroicons-check-badge-solid",
          class: "w-5 h-5 text-white"
        }, null, _parent));
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div><!-- User Info --><div class="pt-16 sm:pt-20 sm:ml-40"><div class="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4"><div><div class="flex items-center gap-3 mb-1"><h1 class="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">${ssrInterpolate(__props.customer.fullName)}</h1><!-- Rank Badge -->`);
      if (__props.currentRank) {
        _push(`<div class="${ssrRenderClass(["inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-medium", __props.currentRank.color])}">`);
        _push(ssrRenderComponent(_component_UIcon, {
          name: __props.currentRank.icon,
          class: "w-4 h-4"
        }, null, _parent));
        _push(` ${ssrInterpolate(__props.currentRank.name)}</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><p class="text-gray-500 dark:text-gray-400">${ssrInterpolate(__props.customer.email)}</p><p class="text-sm text-gray-400 dark:text-gray-500 mt-1"> Bergabung sejak ${ssrInterpolate(__props.formatDate(__props.customer.createdAt))}</p></div>`);
      if (!__props.isEditing) {
        _push(ssrRenderComponent(_component_UButton, {
          color: "primary",
          variant: "soft",
          onClick: ($event) => emit("edit")
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(_component_UIcon, {
                name: "i-heroicons-pencil-square",
                class: "w-4 h-4 mr-2"
              }, null, _parent2, _scopeId));
              _push2(` Edit Profil `);
            } else {
              return [
                createVNode(_component_UIcon, {
                  name: "i-heroicons-pencil-square",
                  class: "w-4 h-4 mr-2"
                }),
                createTextVNode(" Edit Profil ")
              ];
            }
          }),
          _: 1
          /* STABLE */
        }, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div></div></div>`);
    };
  }
});

const _sfc_setup$6 = _sfc_main$6.setup;
_sfc_main$6.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("inertia/components/profile/ProfileHeader.vue");
  return _sfc_setup$6 ? _sfc_setup$6(props, ctx) : void 0;
};

const _sfc_main$5 = /* @__PURE__ */ defineComponent({
  __name: "ProfileStatsCards",
  __ssrInlineRender: true,
  props: {
    stats: {},
    wallet: {},
    formatPrice: { type: Function }
  },
  setup(__props) {
    const props = __props;
    const statsCards = computed(() => [
      {
        icon: "i-heroicons-shopping-bag",
        value: props.stats.totalOrders.toString(),
        label: "Total Pesanan",
        color: "blue",
        bgClass: "bg-blue-500/10",
        iconClass: "text-blue-500"
      },
      {
        icon: "i-heroicons-banknotes",
        value: props.formatPrice(props.stats.totalSpent),
        label: "Total Belanja",
        color: "emerald",
        bgClass: "bg-emerald-500/10",
        iconClass: "text-emerald-500"
      },
      {
        icon: "i-heroicons-wallet",
        value: props.formatPrice(props.wallet.balance),
        label: "Saldo Wallet",
        color: "purple",
        bgClass: "bg-purple-500/10",
        iconClass: "text-purple-500"
      },
      {
        icon: "i-heroicons-clock",
        value: props.formatPrice(props.wallet.pendingBalance),
        label: "Pending Balance",
        color: "orange",
        bgClass: "bg-orange-500/10",
        iconClass: "text-orange-500"
      }
    ]);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UIcon = _sfc_main$8;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8" }, _attrs))}><!--[-->`);
      ssrRenderList(statsCards.value, (card) => {
        _push(`<div class="bg-white dark:bg-gray-800/80 rounded-2xl border border-gray-200/80 dark:border-gray-700/50 p-5 hover:shadow-lg hover:border-gray-300 dark:hover:border-gray-600 transition-all duration-300 group"><div class="${ssrRenderClass(["w-10 h-10 rounded-xl flex items-center justify-center mb-3 transition-transform duration-300 group-hover:scale-110", card.bgClass])}">`);
        _push(ssrRenderComponent(_component_UIcon, {
          name: card.icon,
          class: ["w-5 h-5", card.iconClass]
        }, null, _parent));
        _push(`</div><p class="text-2xl font-bold text-gray-900 dark:text-white truncate">${ssrInterpolate(card.value)}</p><p class="text-sm text-gray-500 dark:text-gray-400">${ssrInterpolate(card.label)}</p></div>`);
      });
      _push(`<!--]--></div>`);
    };
  }
});

const _sfc_setup$5 = _sfc_main$5.setup;
_sfc_main$5.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("inertia/components/profile/ProfileStatsCards.vue");
  return _sfc_setup$5 ? _sfc_setup$5(props, ctx) : void 0;
};

const _sfc_main$4 = /* @__PURE__ */ defineComponent({
  __name: "ProfileForm",
  __ssrInlineRender: true,
  props: {
    customer: {},
    form: {},
    isEditing: { type: Boolean },
    isSaving: { type: Boolean },
    formatDate: { type: Function }
  },
  emits: ["update:form", "save", "cancel"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const updateFullName = (value) => {
      emit("update:form", { ...props.form, fullName: value });
    };
    const updatePhone = (value) => {
      emit("update:form", { ...props.form, phone: value });
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UIcon = _sfc_main$8;
      const _component_UInput = _sfc_main$a;
      const _component_UButton = _sfc_main$9;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "bg-white dark:bg-gray-800/80 rounded-2xl border border-gray-200/80 dark:border-gray-700/50 overflow-hidden" }, _attrs))}><!-- Header --><div class="px-6 py-4 border-b border-gray-100 dark:border-gray-700/50"><h2 class="text-lg font-semibold text-gray-900 dark:text-white flex items-center gap-2">`);
      _push(ssrRenderComponent(_component_UIcon, {
        name: "i-heroicons-user-circle",
        class: "w-5 h-5 text-primary-500"
      }, null, _parent));
      _push(` Informasi Profil </h2></div><div class="p-6 space-y-5"><!-- Full Name --><div><label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5"> Nama Lengkap </label>`);
      _push(ssrRenderComponent(_component_UInput, {
        "model-value": __props.form.fullName,
        "onUpdate:modelValue": updateFullName,
        disabled: !__props.isEditing,
        placeholder: "Masukkan nama lengkap",
        size: "lg",
        class: "w-full",
        ui: { base: "disabled:bg-gray-50 dark:disabled:bg-gray-800" }
      }, null, _parent));
      _push(`</div><!-- Email --><div><label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5"> Email </label>`);
      _push(ssrRenderComponent(_component_UInput, {
        "model-value": __props.customer.email,
        disabled: "",
        class: "w-full",
        size: "lg",
        ui: { base: "disabled:bg-gray-50 dark:disabled:bg-gray-800" }
      }, null, _parent));
      _push(`<p class="text-xs text-gray-500 mt-1">Email tidak dapat diubah</p></div><!-- Phone --><div><label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5"> Nomor Telepon </label>`);
      _push(ssrRenderComponent(_component_UInput, {
        "model-value": __props.form.phone,
        "onUpdate:modelValue": updatePhone,
        disabled: !__props.isEditing,
        placeholder: "08xxxxxxxxxx",
        class: "w-full",
        size: "lg",
        ui: { base: "disabled:bg-gray-50 dark:disabled:bg-gray-800" }
      }, null, _parent));
      _push(`</div><!-- Member Since --><div><label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5"> Terdaftar Sejak </label>`);
      _push(ssrRenderComponent(_component_UInput, {
        "model-value": __props.formatDate(__props.customer.createdAt),
        disabled: "",
        class: "w-full",
        size: "lg",
        ui: { base: "disabled:bg-gray-50 dark:disabled:bg-gray-800" }
      }, null, _parent));
      _push(`</div><!-- Action Buttons -->`);
      if (__props.isEditing) {
        _push(`<div class="flex items-center justify-end gap-3 pt-4 border-t border-gray-100 dark:border-gray-700/50">`);
        _push(ssrRenderComponent(_component_UButton, {
          variant: "ghost",
          color: "neutral",
          onClick: ($event) => emit("cancel"),
          disabled: __props.isSaving
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
          color: "primary",
          onClick: ($event) => emit("save"),
          loading: __props.isSaving
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(_component_UIcon, {
                name: "i-heroicons-check",
                class: "w-4 h-4 mr-2"
              }, null, _parent2, _scopeId));
              _push2(` Simpan Perubahan `);
            } else {
              return [
                createVNode(_component_UIcon, {
                  name: "i-heroicons-check",
                  class: "w-4 h-4 mr-2"
                }),
                createTextVNode(" Simpan Perubahan ")
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
      _push(`</div></div>`);
    };
  }
});

const _sfc_setup$4 = _sfc_main$4.setup;
_sfc_main$4.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("inertia/components/profile/ProfileForm.vue");
  return _sfc_setup$4 ? _sfc_setup$4(props, ctx) : void 0;
};

const _sfc_main$3 = /* @__PURE__ */ defineComponent({
  __name: "ProfileQuickMenu",
  __ssrInlineRender: true,
  props: {
    menuItems: {}
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UIcon = _sfc_main$8;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "bg-white dark:bg-gray-800/80 rounded-2xl border border-gray-200/80 dark:border-gray-700/50 overflow-hidden" }, _attrs))}><!-- Header --><div class="px-6 py-4 border-b border-gray-100 dark:border-gray-700/50"><h2 class="text-lg font-semibold text-gray-900 dark:text-white flex items-center gap-2">`);
      _push(ssrRenderComponent(_component_UIcon, {
        name: "i-heroicons-squares-2x2",
        class: "w-5 h-5 text-primary-500"
      }, null, _parent));
      _push(` Menu Cepat </h2></div><div class="p-2"><!--[-->`);
      ssrRenderList(__props.menuItems, (item) => {
        _push(ssrRenderComponent(unref(Link), {
          key: item.label,
          href: item.href,
          class: "flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors group"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<div class="${ssrRenderClass(["w-10 h-10 rounded-xl flex items-center justify-center", item.color.replace("text-", "bg-").replace("500", "500/10")])}"${_scopeId}>`);
              _push2(ssrRenderComponent(_component_UIcon, {
                name: item.icon,
                class: ["w-5 h-5", item.color]
              }, null, _parent2, _scopeId));
              _push2(`</div><span class="font-medium text-gray-700 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-white transition-colors"${_scopeId}>${ssrInterpolate(item.label)}</span>`);
              _push2(ssrRenderComponent(_component_UIcon, {
                name: "i-heroicons-chevron-right",
                class: "w-4 h-4 text-gray-400 ml-auto"
              }, null, _parent2, _scopeId));
            } else {
              return [
                createVNode(
                  "div",
                  {
                    class: ["w-10 h-10 rounded-xl flex items-center justify-center", item.color.replace("text-", "bg-").replace("500", "500/10")]
                  },
                  [
                    createVNode(_component_UIcon, {
                      name: item.icon,
                      class: ["w-5 h-5", item.color]
                    }, null, 8, ["name", "class"])
                  ],
                  2
                  /* CLASS */
                ),
                createVNode(
                  "span",
                  { class: "font-medium text-gray-700 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-white transition-colors" },
                  toDisplayString(item.label),
                  1
                  /* TEXT */
                ),
                createVNode(_component_UIcon, {
                  name: "i-heroicons-chevron-right",
                  class: "w-4 h-4 text-gray-400 ml-auto"
                })
              ];
            }
          }),
          _: 2
          /* DYNAMIC */
        }, _parent));
      });
      _push(`<!--]--></div></div>`);
    };
  }
});

const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("inertia/components/profile/ProfileQuickMenu.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};

const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "ProfileTipCard",
  __ssrInlineRender: true,
  props: {
    title: {},
    description: {}
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UIcon = _sfc_main$8;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "bg-linear-to-br from-primary-500 to-purple-600 rounded-2xl p-6 text-white relative overflow-hidden" }, _attrs))}><!-- Background Pattern --><div class="absolute inset-0 opacity-10"><svg class="w-full h-full" xmlns="http://www.w3.org/2000/svg"><defs><pattern id="tip-pattern" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse"><circle cx="10" cy="10" r="1" fill="white"></circle></pattern></defs><rect width="100%" height="100%" fill="url(#tip-pattern)"></rect></svg></div><div class="relative"><div class="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center mb-4">`);
      _push(ssrRenderComponent(_component_UIcon, {
        name: "i-heroicons-light-bulb",
        class: "w-6 h-6"
      }, null, _parent));
      _push(`</div><h3 class="font-bold text-lg mb-2">${ssrInterpolate(__props.title ?? "Tips Vaping")}</h3><p class="text-white/80 text-sm leading-relaxed">${ssrInterpolate(__props.description ?? "Simpan e-liquid di tempat sejuk dan gelap untuk menjaga kualitas rasa. Hindari paparan sinar matahari langsung!")}</p></div></div>`);
    };
  }
});

const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("inertia/components/profile/ProfileTipCard.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};

const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "ProfileBackground",
  __ssrInlineRender: true,
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "fixed inset-0 -z-10 overflow-hidden pointer-events-none" }, _attrs))} data-v-a9ff5cfb><div class="absolute top-0 left-1/4 w-125 h-125 bg-primary-500/10 rounded-full blur-3xl animate-pulse" data-v-a9ff5cfb></div><div class="absolute top-1/3 right-1/4 w-100 h-100 bg-purple-500/10 rounded-full blur-3xl" data-v-a9ff5cfb></div><div class="absolute bottom-1/4 left-1/2 w-150 h-75 bg-cyan-500/5 rounded-full blur-3xl" data-v-a9ff5cfb></div><!-- Smoke-like effects --><div class="absolute top-20 right-20 w-32 h-32 bg-white/5 rounded-full blur-2xl animate-float" data-v-a9ff5cfb></div><div class="absolute bottom-40 left-20 w-24 h-24 bg-white/3 rounded-full blur-xl animate-float-delayed" data-v-a9ff5cfb></div></div>`);
    };
  }
});

/* unplugin-vue-components disabled */

const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("inertia/components/profile/ProfileBackground.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const ProfileBackground = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["__scopeId", "data-v-a9ff5cfb"]]);

const _sfc_main = /* @__PURE__ */ defineComponent({
  ...{ layout: _sfc_main$b },
  __name: "index",
  __ssrInlineRender: true,
  props: {
    customer: {},
    stats: {},
    wallet: {},
    currentRank: {}
  },
  setup(__props) {
    const props = __props;
    const {
      isEditing,
      isSaving,
      form,
      initials,
      formatPrice,
      formatDate,
      startEditing,
      cancelEdit,
      saveProfile
    } = useProfile({ customer: props.customer });
    const menuItems = [
      { icon: "i-heroicons-shopping-bag", label: "Pesanan Saya", href: "/orders", color: "text-blue-500" },
      { icon: "i-heroicons-map-pin", label: "Alamat", href: "/dashboard", color: "text-emerald-500" },
      { icon: "i-heroicons-wallet", label: "E-Wallet", href: "/dashboard", color: "text-purple-500" },
      { icon: "i-heroicons-heart", label: "Wishlist", href: "/dashboard", color: "text-pink-500" },
      { icon: "i-heroicons-users", label: "Program Afiliasi", href: "/dashboard", color: "text-orange-500" },
      { icon: "i-heroicons-cog-6-tooth", label: "Pengaturan", href: "/dashboard", color: "text-gray-500" }
    ];
    const handleFormUpdate = (newForm) => {
      form.value = newForm;
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
      _push(ssrRenderComponent(unref(Head), { title: "Profil Saya - Ogitu" }, null, _parent));
      _push(`<div class="min-h-screen bg-linear-to-b from-gray-50 via-white to-gray-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-900"><!-- Background Effects -->`);
      _push(ssrRenderComponent(unref(ProfileBackground), null, null, _parent));
      _push(`<div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12"><!-- Breadcrumb -->`);
      _push(ssrRenderComponent(unref(_sfc_main$7), null, null, _parent));
      _push(`<!-- Profile Header Card -->`);
      _push(ssrRenderComponent(unref(_sfc_main$6), {
        customer: __props.customer,
        "current-rank": __props.currentRank,
        initials: unref(initials),
        "is-editing": unref(isEditing),
        "format-date": unref(formatDate),
        onEdit: unref(startEditing)
      }, null, _parent));
      _push(`<!-- Stats Cards -->`);
      _push(ssrRenderComponent(unref(_sfc_main$5), {
        stats: __props.stats,
        wallet: __props.wallet,
        "format-price": unref(formatPrice)
      }, null, _parent));
      _push(`<!-- Main Content Grid --><div class="grid grid-cols-1 lg:grid-cols-3 gap-8"><!-- Profile Form --><div class="lg:col-span-2">`);
      _push(ssrRenderComponent(unref(_sfc_main$4), {
        customer: __props.customer,
        form: unref(form),
        "is-editing": unref(isEditing),
        "is-saving": unref(isSaving),
        "format-date": unref(formatDate),
        "onUpdate:form": handleFormUpdate,
        onSave: unref(saveProfile),
        onCancel: unref(cancelEdit)
      }, null, _parent));
      _push(`</div><!-- Sidebar --><div class="lg:col-span-1 space-y-6"><!-- Quick Menu -->`);
      _push(ssrRenderComponent(unref(_sfc_main$3), { "menu-items": menuItems }, null, _parent));
      _push(`<!-- Tip Card -->`);
      _push(ssrRenderComponent(unref(_sfc_main$2), null, null, _parent));
      _push(`</div></div></div></div><!--]-->`);
    };
  }
});

const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("inertia/pages/profile/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
