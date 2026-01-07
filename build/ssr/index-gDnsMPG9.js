import { ref, computed, defineComponent, mergeProps, withCtx, createTextVNode, toDisplayString, createVNode, useSSRContext, unref, watch, onMounted, isRef } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderList, ssrRenderClass, ssrRenderSlot } from 'vue/server-renderer';
import { A as AdminLayout } from './admin-CGUULoJY.js';
import { u as useAdminNotifications } from './use_transmit-Bm-A_dwm.js';
import { router } from '@inertiajs/vue3';
import { _ as _sfc_main$8, a as _sfc_main$a } from './Button-BBveOjhJ.js';
import { a as _sfc_main$9 } from './Badge-DaOjA2YD.js';
import { _ as _sfc_main$b } from './Select-1_-G9zx4.js';
import { _ as _sfc_main$c } from './Pagination-C9h35VkF.js';
import { _ as _sfc_main$d } from './Modal-lw8uQ47S.js';
import './Tooltip-N44Fzd4m.js';
import 'defu';
import 'reka-ui';
import '@vueuse/core';
import './virtual_nuxt-ui-plugins-BqI2j5ZJ.js';
import '@unhead/vue/client';
import 'tailwindcss/colors';
import 'hookable';
import 'ohash/utils';
import '@unhead/vue';
import '@adonisjs/transmit-client';
import 'tailwind-variants';
import '@iconify/vue';
import 'ufo';
import 'reka-ui/namespaced';

function useNotifications(options = {}) {
  const notifications = ref(
    Array.isArray(options.initialNotifications) ? [...options.initialNotifications] : []
  );
  const unreadCount = ref(options.initialUnreadCount || 0);
  const isLoading = ref(false);
  const currentPage = ref(options.initialMeta?.currentPage || 1);
  const selectedType = ref(options.initialFilters?.type || "all");
  const selectedReadStatus = ref(options.initialFilters?.isRead || "all");
  const hasActiveFilters = computed(() => {
    return selectedType.value !== "all" || selectedReadStatus.value !== "all";
  });
  const hasReadNotifications = computed(() => {
    return notifications.value.some((n) => n.isRead);
  });
  const syncWithProps = (props) => {
    if (props.notifications) {
      notifications.value = Array.isArray(props.notifications) ? [...props.notifications] : [];
    }
    if (props.unreadCount !== void 0) {
      unreadCount.value = props.unreadCount;
    }
    if (props.meta?.currentPage) {
      currentPage.value = props.meta.currentPage;
    }
    if (props.filters) {
      selectedType.value = props.filters.type || "all";
      selectedReadStatus.value = props.filters.isRead || "all";
    }
  };
  const fetchNotifications = (fetchOptions = {}) => {
    isLoading.value = true;
    const params = {
      page: fetchOptions.page || currentPage.value,
      type: selectedType.value,
      isRead: selectedReadStatus.value
    };
    if (params.type === "all") delete params.type;
    if (params.isRead === "all") delete params.isRead;
    router.get("/admin/notifications", params, {
      preserveState: true,
      preserveScroll: fetchOptions.preserveScroll ?? true,
      onFinish: () => {
        isLoading.value = false;
      }
    });
  };
  const applyFilters = () => {
    currentPage.value = 1;
    fetchNotifications({ page: 1 });
  };
  const resetFilters = () => {
    selectedType.value = "all";
    selectedReadStatus.value = "all";
    currentPage.value = 1;
    fetchNotifications({ page: 1 });
  };
  const handlePageChange = (page) => {
    currentPage.value = page;
    fetchNotifications({ page, preserveScroll: false });
  };
  const markAsRead = async (id) => {
    try {
      const response = await fetch(`/admin/notifications/${id}/read`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "X-Requested-With": "XMLHttpRequest"
        }
      });
      if (response.ok) {
        const notification = notifications.value.find((n) => n.id === id);
        if (notification && !notification.isRead) {
          notification.isRead = true;
          notification.readAt = (/* @__PURE__ */ new Date()).toISOString();
          unreadCount.value = Math.max(0, unreadCount.value - 1);
        }
        return true;
      }
      return false;
    } catch (error) {
      console.error("Failed to mark notification as read:", error);
      return false;
    }
  };
  const markAllAsRead = async () => {
    try {
      const response = await fetch("/admin/notifications/read-all", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Requested-With": "XMLHttpRequest"
        }
      });
      if (response.ok) {
        notifications.value.forEach((n) => {
          if (!n.isRead) {
            n.isRead = true;
            n.readAt = (/* @__PURE__ */ new Date()).toISOString();
          }
        });
        unreadCount.value = 0;
        return true;
      }
      return false;
    } catch (error) {
      console.error("Failed to mark all notifications as read:", error);
      return false;
    }
  };
  const deleteNotification = async (id) => {
    try {
      const response = await fetch(`/admin/notifications/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "X-Requested-With": "XMLHttpRequest"
        }
      });
      if (response.ok) {
        const index = notifications.value.findIndex((n) => n.id === id);
        if (index !== -1) {
          const notification = notifications.value[index];
          if (!notification.isRead) {
            unreadCount.value = Math.max(0, unreadCount.value - 1);
          }
          notifications.value.splice(index, 1);
        }
        return true;
      }
      return false;
    } catch (error) {
      console.error("Failed to delete notification:", error);
      return false;
    }
  };
  const clearReadNotifications = async () => {
    try {
      const response = await fetch("/admin/notifications/clear-read", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "X-Requested-With": "XMLHttpRequest"
        }
      });
      if (response.ok) {
        notifications.value = notifications.value.filter((n) => !n.isRead);
        return true;
      }
      return false;
    } catch (error) {
      console.error("Failed to clear read notifications:", error);
      return false;
    }
  };
  return {
    // State
    notifications,
    unreadCount,
    isLoading,
    currentPage,
    selectedType,
    selectedReadStatus,
    // Computed
    hasActiveFilters,
    hasReadNotifications,
    // Methods
    syncWithProps,
    fetchNotifications,
    applyFilters,
    resetFilters,
    handlePageChange,
    markAsRead,
    markAllAsRead,
    deleteNotification,
    clearReadNotifications
  };
}

const _sfc_main$7 = /* @__PURE__ */ defineComponent({
  __name: "NotificationHeader",
  __ssrInlineRender: true,
  props: {
    isConnected: { type: Boolean },
    unreadCount: {},
    hasReadNotifications: { type: Boolean }
  },
  emits: ["markAllAsRead", "clearRead"],
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UIcon = _sfc_main$8;
      const _component_UBadge = _sfc_main$9;
      const _component_UButton = _sfc_main$a;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4" }, _attrs))}><div class="flex items-center gap-4"><div class="p-3 bg-linear-to-br from-violet-500 to-purple-600 rounded-xl shadow-lg shadow-violet-500/25">`);
      _push(ssrRenderComponent(_component_UIcon, {
        name: "i-heroicons-bell",
        class: "w-7 h-7 text-white"
      }, null, _parent));
      _push(`</div><div><div class="flex items-center gap-3"><h1 class="text-2xl font-bold text-slate-900 dark:text-white">Pusat Notifikasi</h1>`);
      if (__props.unreadCount > 0) {
        _push(ssrRenderComponent(_component_UBadge, {
          color: "error",
          variant: "solid",
          size: "sm"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`${ssrInterpolate(__props.unreadCount)} baru `);
            } else {
              return [
                createTextVNode(
                  toDisplayString(__props.unreadCount) + " baru ",
                  1
                  /* TEXT */
                )
              ];
            }
          }),
          _: 1
          /* STABLE */
        }, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(`</div><p class="text-sm text-slate-500 dark:text-slate-400 mt-0.5"> Kelola notifikasi pesanan, pembayaran, dan pembaruan sistem </p></div></div><div class="flex items-center gap-2"><!-- Realtime Connection Status -->`);
      if (__props.isConnected) {
        _push(ssrRenderComponent(_component_UBadge, {
          color: "success",
          variant: "subtle",
          size: "sm",
          class: "flex items-center gap-1.5"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<span class="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"${_scopeId}></span> Live `);
            } else {
              return [
                createVNode("span", { class: "w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" }),
                createTextVNode(" Live ")
              ];
            }
          }),
          _: 1
          /* STABLE */
        }, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(`<!-- Mark All as Read -->`);
      if (__props.unreadCount > 0) {
        _push(ssrRenderComponent(_component_UButton, {
          color: "primary",
          variant: "soft",
          size: "sm",
          icon: "i-heroicons-check-circle",
          onClick: ($event) => _ctx.$emit("markAllAsRead")
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(` Tandai Semua Dibaca `);
            } else {
              return [
                createTextVNode(" Tandai Semua Dibaca ")
              ];
            }
          }),
          _: 1
          /* STABLE */
        }, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(`<!-- Clear Read -->`);
      if (__props.hasReadNotifications) {
        _push(ssrRenderComponent(_component_UButton, {
          color: "error",
          variant: "ghost",
          size: "sm",
          icon: "i-heroicons-trash",
          onClick: ($event) => _ctx.$emit("clearRead")
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(` Hapus Dibaca `);
            } else {
              return [
                createTextVNode(" Hapus Dibaca ")
              ];
            }
          }),
          _: 1
          /* STABLE */
        }, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div>`);
    };
  }
});

const _sfc_setup$7 = _sfc_main$7.setup;
_sfc_main$7.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("inertia/components/admin/notifications/NotificationHeader.vue");
  return _sfc_setup$7 ? _sfc_setup$7(props, ctx) : void 0;
};

const _sfc_main$6 = /* @__PURE__ */ defineComponent({
  __name: "NotificationStats",
  __ssrInlineRender: true,
  props: {
    total: {},
    unreadCount: {},
    readCount: {}
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UIcon = _sfc_main$8;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "grid grid-cols-1 sm:grid-cols-3 gap-4" }, _attrs))}><!-- Total Notifications --><div class="relative overflow-hidden bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-5"><div class="absolute top-0 right-0 w-24 h-24 -mr-8 -mt-8 bg-linear-to-br from-blue-500/10 to-cyan-500/10 rounded-full blur-2xl"></div><div class="relative flex items-center gap-4"><div class="p-3 bg-linear-to-br from-blue-500 to-cyan-500 rounded-xl shadow-lg shadow-blue-500/25">`);
      _push(ssrRenderComponent(_component_UIcon, {
        name: "i-heroicons-bell",
        class: "w-6 h-6 text-white"
      }, null, _parent));
      _push(`</div><div><p class="text-sm font-medium text-slate-500 dark:text-slate-400">Total</p><p class="text-2xl font-bold text-slate-900 dark:text-white">${ssrInterpolate(__props.total)}</p></div></div></div><!-- Unread --><div class="relative overflow-hidden bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-5"><div class="absolute top-0 right-0 w-24 h-24 -mr-8 -mt-8 bg-linear-to-br from-amber-500/10 to-orange-500/10 rounded-full blur-2xl"></div><div class="relative flex items-center gap-4"><div class="p-3 bg-linear-to-br from-amber-500 to-orange-500 rounded-xl shadow-lg shadow-amber-500/25">`);
      _push(ssrRenderComponent(_component_UIcon, {
        name: "i-heroicons-envelope",
        class: "w-6 h-6 text-white"
      }, null, _parent));
      _push(`</div><div><p class="text-sm font-medium text-slate-500 dark:text-slate-400">Belum Dibaca</p><p class="text-2xl font-bold text-slate-900 dark:text-white">${ssrInterpolate(__props.unreadCount)}</p></div></div></div><!-- Read --><div class="relative overflow-hidden bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-5"><div class="absolute top-0 right-0 w-24 h-24 -mr-8 -mt-8 bg-linear-to-br from-emerald-500/10 to-green-500/10 rounded-full blur-2xl"></div><div class="relative flex items-center gap-4"><div class="p-3 bg-linear-to-br from-emerald-500 to-green-500 rounded-xl shadow-lg shadow-emerald-500/25">`);
      _push(ssrRenderComponent(_component_UIcon, {
        name: "i-heroicons-envelope-open",
        class: "w-6 h-6 text-white"
      }, null, _parent));
      _push(`</div><div><p class="text-sm font-medium text-slate-500 dark:text-slate-400">Sudah Dibaca</p><p class="text-2xl font-bold text-slate-900 dark:text-white">${ssrInterpolate(__props.readCount)}</p></div></div></div></div>`);
    };
  }
});

const _sfc_setup$6 = _sfc_main$6.setup;
_sfc_main$6.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("inertia/components/admin/notifications/NotificationStats.vue");
  return _sfc_setup$6 ? _sfc_setup$6(props, ctx) : void 0;
};

const getNotificationCategory = (type) => {
  if (type.startsWith("order_")) return "order";
  if (type.startsWith("product_")) return "stock";
  if (type.startsWith("withdrawal_")) return "payment";
  if (type === "review_new") return "review";
  if (type === "system") return "system";
  return "other";
};
const categoryIcons = {
  order: "i-heroicons-shopping-bag",
  payment: "i-heroicons-credit-card",
  stock: "i-heroicons-cube",
  system: "i-heroicons-cog-6-tooth",
  review: "i-heroicons-star",
  other: "i-heroicons-bell"
};
const categoryColors = {
  order: "primary",
  payment: "success",
  stock: "warning",
  system: "info",
  review: "warning",
  other: "neutral"
};
const categoryBgClasses = {
  order: "bg-violet-100 dark:bg-violet-900/30",
  payment: "bg-emerald-100 dark:bg-emerald-900/30",
  stock: "bg-amber-100 dark:bg-amber-900/30",
  system: "bg-blue-100 dark:bg-blue-900/30",
  review: "bg-orange-100 dark:bg-orange-900/30",
  other: "bg-slate-100 dark:bg-slate-700"
};
const categoryTextClasses = {
  order: "text-violet-600 dark:text-violet-400",
  payment: "text-emerald-600 dark:text-emerald-400",
  stock: "text-amber-600 dark:text-amber-400",
  system: "text-blue-600 dark:text-blue-400",
  review: "text-orange-600 dark:text-orange-400",
  other: "text-slate-600 dark:text-slate-400"
};
const getNotificationIcon = (type) => {
  const category = getNotificationCategory(type);
  return categoryIcons[category];
};
const getNotificationColor = (type) => {
  const category = getNotificationCategory(type);
  return categoryColors[category];
};
const getNotificationBgClass = (type) => {
  const category = getNotificationCategory(type);
  return categoryBgClasses[category];
};
const getNotificationTextClass = (type) => {
  const category = getNotificationCategory(type);
  return categoryTextClasses[category];
};
const formatRelativeTime = (dateString) => {
  const date = new Date(dateString);
  const now = /* @__PURE__ */ new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffSecs = Math.floor(diffMs / 1e3);
  const diffMins = Math.floor(diffSecs / 60);
  const diffHours = Math.floor(diffMins / 60);
  const diffDays = Math.floor(diffHours / 24);
  if (diffSecs < 60) return "Baru saja";
  if (diffMins < 60) return `${diffMins} menit lalu`;
  if (diffHours < 24) return `${diffHours} jam lalu`;
  if (diffDays < 7) return `${diffDays} hari lalu`;
  return date.toLocaleDateString("id-ID", {
    day: "numeric",
    month: "short",
    year: date.getFullYear() !== now.getFullYear() ? "numeric" : void 0
  });
};
const getNotificationTypeLabel = (type) => {
  const labels = {
    order_new: "Pesanan Baru",
    order_paid: "Pembayaran",
    order_cancelled: "Dibatalkan",
    order_shipped: "Dikirim",
    order_completed: "Selesai",
    review_new: "Ulasan Baru",
    product_low_stock: "Stok Rendah",
    product_out_of_stock: "Stok Habis",
    withdrawal_approved: "Penarikan Disetujui",
    withdrawal_rejected: "Penarikan Ditolak",
    system: "Sistem"
  };
  return labels[type] || type;
};
const typeFilterOptions = [
  { label: "Semua Tipe", value: "all", icon: "i-heroicons-squares-2x2" },
  { label: "Pesanan", value: "order", icon: "i-heroicons-shopping-bag" },
  { label: "Pembayaran", value: "payment", icon: "i-heroicons-credit-card" },
  { label: "Stok", value: "stock", icon: "i-heroicons-cube" },
  { label: "Sistem", value: "system", icon: "i-heroicons-cog-6-tooth" },
  { label: "Ulasan", value: "review", icon: "i-heroicons-star" }
];
const readStatusOptions = [
  { label: "Semua", value: "all" },
  { label: "Belum Dibaca", value: "unread" },
  { label: "Sudah Dibaca", value: "read" }
];

const _sfc_main$5 = /* @__PURE__ */ defineComponent({
  __name: "NotificationFilterBar",
  __ssrInlineRender: true,
  props: {
    selectedType: {},
    selectedReadStatus: {},
    typeStats: { default: () => ({}) }
  },
  emits: ["update:selectedType", "update:selectedReadStatus", "filter", "reset"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const hasActiveFilters = computed(() => {
      return props.selectedType !== "all" || props.selectedReadStatus !== "all";
    });
    const handleTypeChange = (value) => {
      emit("update:selectedType", value);
      emit("filter");
    };
    const handleReadStatusChange = (value) => {
      emit("update:selectedReadStatus", value);
      emit("filter");
    };
    const handleStatClick = (type) => {
      emit("update:selectedType", type);
      emit("filter");
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UIcon = _sfc_main$8;
      const _component_USelect = _sfc_main$b;
      const _component_UButton = _sfc_main$a;
      const _component_UBadge = _sfc_main$9;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-4" }, _attrs))}><div class="flex flex-col sm:flex-row items-start sm:items-center gap-4"><div class="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">`);
      _push(ssrRenderComponent(_component_UIcon, {
        name: "i-heroicons-funnel",
        class: "w-4 h-4"
      }, null, _parent));
      _push(`<span class="font-medium">Filter:</span></div><div class="flex flex-wrap items-center gap-3 flex-1">`);
      _push(ssrRenderComponent(_component_USelect, {
        "model-value": __props.selectedType,
        items: unref(typeFilterOptions),
        placeholder: "Tipe Notifikasi",
        size: "sm",
        class: "w-44",
        "onUpdate:modelValue": handleTypeChange
      }, null, _parent));
      _push(ssrRenderComponent(_component_USelect, {
        "model-value": __props.selectedReadStatus,
        items: unref(readStatusOptions),
        placeholder: "Status",
        size: "sm",
        class: "w-36",
        "onUpdate:modelValue": handleReadStatusChange
      }, null, _parent));
      if (hasActiveFilters.value) {
        _push(ssrRenderComponent(_component_UButton, {
          color: "neutral",
          variant: "ghost",
          size: "sm",
          icon: "i-heroicons-x-mark",
          onClick: ($event) => _ctx.$emit("reset")
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(` Reset `);
            } else {
              return [
                createTextVNode(" Reset ")
              ];
            }
          }),
          _: 1
          /* STABLE */
        }, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(`</div><!-- Type Stats Pills --><div class="hidden lg:flex items-center gap-2"><!--[-->`);
      ssrRenderList(__props.typeStats, (count, type) => {
        _push(`<!--[-->`);
        if (count > 0) {
          _push(ssrRenderComponent(_component_UBadge, {
            color: unref(getNotificationColor)(String(type)),
            variant: "subtle",
            size: "xs",
            class: "cursor-pointer hover:opacity-80 transition-opacity",
            onClick: ($event) => handleStatClick(String(type))
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(ssrRenderComponent(_component_UIcon, {
                  name: unref(getNotificationIcon)(String(type)),
                  class: "w-3 h-3 mr-1"
                }, null, _parent2, _scopeId));
                _push2(` ${ssrInterpolate(count)}`);
              } else {
                return [
                  createVNode(_component_UIcon, {
                    name: unref(getNotificationIcon)(String(type)),
                    class: "w-3 h-3 mr-1"
                  }, null, 8, ["name"]),
                  createTextVNode(
                    " " + toDisplayString(count),
                    1
                    /* TEXT */
                  )
                ];
              }
            }),
            _: 2
            /* DYNAMIC */
          }, _parent));
        } else {
          _push(`<!---->`);
        }
        _push(`<!--]-->`);
      });
      _push(`<!--]--></div></div></div>`);
    };
  }
});

const _sfc_setup$5 = _sfc_main$5.setup;
_sfc_main$5.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("inertia/components/admin/notifications/NotificationFilterBar.vue");
  return _sfc_setup$5 ? _sfc_setup$5(props, ctx) : void 0;
};

const _sfc_main$4 = /* @__PURE__ */ defineComponent({
  __name: "NotificationItem",
  __ssrInlineRender: true,
  props: {
    notification: {}
  },
  emits: ["read", "delete"],
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UIcon = _sfc_main$8;
      const _component_UBadge = _sfc_main$9;
      const _component_UButton = _sfc_main$a;
      _push(`<div${ssrRenderAttrs(mergeProps({
        class: ["group relative p-4 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors", { "bg-violet-50/50 dark:bg-violet-900/10": !__props.notification.isRead }]
      }, _attrs))}><!-- Unread Indicator -->`);
      if (!__props.notification.isRead) {
        _push(`<div class="absolute left-0 top-0 bottom-0 w-1 bg-linear-to-b from-violet-500 to-purple-600"></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="flex items-start gap-4 pl-2"><!-- Icon --><div class="${ssrRenderClass([unref(getNotificationBgClass)(__props.notification.type), "shrink-0 p-2.5 rounded-xl"])}">`);
      _push(ssrRenderComponent(_component_UIcon, {
        name: __props.notification.icon || unref(getNotificationIcon)(__props.notification.type),
        class: ["w-5 h-5", unref(getNotificationTextClass)(__props.notification.type)]
      }, null, _parent));
      _push(`</div><!-- Content --><div class="flex-1 min-w-0"><div class="flex items-start justify-between gap-4"><div class="flex-1 min-w-0"><div class="flex items-center gap-2 mb-1"><h3 class="${ssrRenderClass([
        __props.notification.isRead ? "text-slate-700 dark:text-slate-300" : "text-slate-900 dark:text-white",
        "font-semibold truncate"
      ])}">${ssrInterpolate(__props.notification.title)}</h3>`);
      _push(ssrRenderComponent(_component_UBadge, {
        color: unref(getNotificationColor)(__props.notification.type),
        variant: "subtle",
        size: "xs"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`${ssrInterpolate(unref(getNotificationTypeLabel)(__props.notification.type))}`);
          } else {
            return [
              createTextVNode(
                toDisplayString(unref(getNotificationTypeLabel)(__props.notification.type)),
                1
                /* TEXT */
              )
            ];
          }
        }),
        _: 1
        /* STABLE */
      }, _parent));
      _push(`</div><p class="${ssrRenderClass([
        __props.notification.isRead ? "text-slate-500 dark:text-slate-400" : "text-slate-600 dark:text-slate-300",
        "text-sm line-clamp-2"
      ])}">${ssrInterpolate(__props.notification.message)}</p><p class="text-xs text-slate-400 dark:text-slate-500 mt-2 flex items-center gap-1">`);
      _push(ssrRenderComponent(_component_UIcon, {
        name: "i-heroicons-clock",
        class: "w-3.5 h-3.5"
      }, null, _parent));
      _push(` ${ssrInterpolate(unref(formatRelativeTime)(__props.notification.createdAt))}</p></div><!-- Actions --><div class="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">`);
      if (!__props.notification.isRead) {
        _push(ssrRenderComponent(_component_UButton, {
          color: "primary",
          variant: "ghost",
          size: "xs",
          icon: "i-heroicons-check",
          square: "",
          onClick: ($event) => _ctx.$emit("read", __props.notification.id)
        }, null, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(ssrRenderComponent(_component_UButton, {
        color: "error",
        variant: "ghost",
        size: "xs",
        icon: "i-heroicons-trash",
        square: "",
        onClick: ($event) => _ctx.$emit("delete", __props.notification.id)
      }, null, _parent));
      _push(`</div></div></div></div></div>`);
    };
  }
});

const _sfc_setup$4 = _sfc_main$4.setup;
_sfc_main$4.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("inertia/components/admin/notifications/NotificationItem.vue");
  return _sfc_setup$4 ? _sfc_setup$4(props, ctx) : void 0;
};

const _sfc_main$3 = /* @__PURE__ */ defineComponent({
  __name: "NotificationList",
  __ssrInlineRender: true,
  props: {
    notifications: {},
    isLoading: { type: Boolean },
    hasFilters: { type: Boolean }
  },
  emits: ["read", "delete", "resetFilters"],
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UIcon = _sfc_main$8;
      const _component_UButton = _sfc_main$a;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden" }, _attrs))}><!-- Loading State -->`);
      if (__props.isLoading) {
        _push(`<div class="flex items-center justify-center py-16"><div class="flex flex-col items-center gap-3">`);
        _push(ssrRenderComponent(_component_UIcon, {
          name: "i-heroicons-arrow-path",
          class: "w-8 h-8 text-violet-500 animate-spin"
        }, null, _parent));
        _push(`<p class="text-sm text-slate-500 dark:text-slate-400">Memuat notifikasi...</p></div></div>`);
      } else if (__props.notifications.length > 0) {
        _push(`<!--[--><!-- Notifications --><div class="divide-y divide-slate-100 dark:divide-slate-700"><!--[-->`);
        ssrRenderList(__props.notifications, (notification) => {
          _push(ssrRenderComponent(_sfc_main$4, {
            key: notification.id,
            notification,
            onRead: ($event) => _ctx.$emit("read", $event),
            onDelete: ($event) => _ctx.$emit("delete", $event)
          }, null, _parent));
        });
        _push(`<!--]--></div><!--]-->`);
      } else {
        _push(`<!--[--><!-- Empty State --><div class="py-16 text-center"><div class="inline-flex items-center justify-center w-16 h-16 rounded-full bg-slate-100 dark:bg-slate-700 mb-4">`);
        _push(ssrRenderComponent(_component_UIcon, {
          name: "i-heroicons-bell-slash",
          class: "w-8 h-8 text-slate-400 dark:text-slate-500"
        }, null, _parent));
        _push(`</div><h3 class="text-lg font-semibold text-slate-900 dark:text-white mb-2"> Tidak Ada Notifikasi </h3><p class="text-sm text-slate-500 dark:text-slate-400 max-w-sm mx-auto">${ssrInterpolate(__props.hasFilters ? "Tidak ada notifikasi yang sesuai dengan filter Anda." : "Anda belum memiliki notifikasi. Notifikasi akan muncul saat ada pesanan baru, pembayaran, atau pembaruan sistem.")}</p>`);
        if (__props.hasFilters) {
          _push(ssrRenderComponent(_component_UButton, {
            color: "primary",
            variant: "soft",
            size: "sm",
            class: "mt-4",
            onClick: ($event) => _ctx.$emit("resetFilters")
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(` Reset Filter `);
              } else {
                return [
                  createTextVNode(" Reset Filter ")
                ];
              }
            }),
            _: 1
            /* STABLE */
          }, _parent));
        } else {
          _push(`<!---->`);
        }
        _push(`</div><!--]-->`);
      }
      _push(`<!-- Pagination Slot -->`);
      ssrRenderSlot(_ctx.$slots, "pagination", {}, null, _push, _parent);
      _push(`</div>`);
    };
  }
});

const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("inertia/components/admin/notifications/NotificationList.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};

const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "NotificationPagination",
  __ssrInlineRender: true,
  props: {
    currentPage: {},
    total: {},
    perPage: {},
    lastPage: {}
  },
  emits: ["update:currentPage"],
  setup(__props) {
    const props = __props;
    const startItem = computed(() => {
      return (props.currentPage - 1) * props.perPage + 1;
    });
    const endItem = computed(() => {
      return Math.min(props.currentPage * props.perPage, props.total);
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UPagination = _sfc_main$c;
      if (__props.lastPage > 1) {
        _push(`<div${ssrRenderAttrs(mergeProps({ class: "flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-slate-200 dark:border-slate-700 px-4 py-3" }, _attrs))}><p class="text-sm text-slate-500 dark:text-slate-400"> Menampilkan ${ssrInterpolate(startItem.value)} - ${ssrInterpolate(endItem.value)} dari ${ssrInterpolate(__props.total)} notifikasi </p>`);
        _push(ssrRenderComponent(_component_UPagination, {
          page: __props.currentPage,
          total: __props.total,
          "items-per-page": __props.perPage,
          "sibling-count": 1,
          "show-edges": "",
          size: "sm",
          "onUpdate:page": ($event) => _ctx.$emit("update:currentPage", $event)
        }, null, _parent));
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
    };
  }
});

const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("inertia/components/admin/notifications/NotificationPagination.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};

const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "ConfirmModal",
  __ssrInlineRender: true,
  props: {
    open: { type: Boolean },
    title: {},
    description: {},
    message: {},
    confirmLabel: { default: "Konfirmasi" },
    cancelLabel: { default: "Batal" },
    variant: { default: "danger" }
  },
  emits: ["update:open", "confirm", "cancel"],
  setup(__props, { emit: __emit }) {
    const emit = __emit;
    const handleConfirm = () => {
      emit("confirm");
    };
    const handleCancel = () => {
      emit("update:open", false);
      emit("cancel");
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UModal = _sfc_main$d;
      const _component_UIcon = _sfc_main$8;
      const _component_UButton = _sfc_main$a;
      _push(ssrRenderComponent(_component_UModal, mergeProps({
        open: __props.open,
        "onUpdate:open": ($event) => _ctx.$emit("update:open", $event),
        ui: { overlay: "z-[100]", content: "z-[100]" }
      }, _attrs), {
        content: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="p-6 max-h-[85vh] overflow-y-auto"${_scopeId}><div class="flex items-center gap-4 mb-4"${_scopeId}><div class="${ssrRenderClass([
              __props.variant === "danger" ? "bg-red-100 dark:bg-red-900/30" : "bg-amber-100 dark:bg-amber-900/30",
              "w-12 h-12 rounded-full flex items-center justify-center"
            ])}"${_scopeId}>`);
            _push2(ssrRenderComponent(_component_UIcon, {
              name: __props.variant === "danger" ? "i-heroicons-trash" : "i-heroicons-exclamation-triangle",
              class: ["w-6 h-6", __props.variant === "danger" ? "text-red-500" : "text-amber-500"]
            }, null, _parent2, _scopeId));
            _push2(`</div><div${_scopeId}><h3 class="text-lg font-semibold text-slate-900 dark:text-white"${_scopeId}>${ssrInterpolate(__props.title)}</h3><p class="text-sm text-slate-500 dark:text-slate-400"${_scopeId}>${ssrInterpolate(__props.description)}</p></div></div><p class="text-sm text-slate-600 dark:text-slate-400 mb-6"${_scopeId}>${ssrInterpolate(__props.message)}</p><div class="flex justify-end gap-3"${_scopeId}>`);
            _push2(ssrRenderComponent(_component_UButton, {
              color: "neutral",
              variant: "outline",
              onClick: handleCancel
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`${ssrInterpolate(__props.cancelLabel)}`);
                } else {
                  return [
                    createTextVNode(
                      toDisplayString(__props.cancelLabel),
                      1
                      /* TEXT */
                    )
                  ];
                }
              }),
              _: 1
              /* STABLE */
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_UButton, {
              color: "error",
              onClick: handleConfirm
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`${ssrInterpolate(__props.confirmLabel)}`);
                } else {
                  return [
                    createTextVNode(
                      toDisplayString(__props.confirmLabel),
                      1
                      /* TEXT */
                    )
                  ];
                }
              }),
              _: 1
              /* STABLE */
            }, _parent2, _scopeId));
            _push2(`</div></div>`);
          } else {
            return [
              createVNode("div", { class: "p-6 max-h-[85vh] overflow-y-auto" }, [
                createVNode("div", { class: "flex items-center gap-4 mb-4" }, [
                  createVNode(
                    "div",
                    {
                      class: [
                        "w-12 h-12 rounded-full flex items-center justify-center",
                        __props.variant === "danger" ? "bg-red-100 dark:bg-red-900/30" : "bg-amber-100 dark:bg-amber-900/30"
                      ]
                    },
                    [
                      createVNode(_component_UIcon, {
                        name: __props.variant === "danger" ? "i-heroicons-trash" : "i-heroicons-exclamation-triangle",
                        class: ["w-6 h-6", __props.variant === "danger" ? "text-red-500" : "text-amber-500"]
                      }, null, 8, ["name", "class"])
                    ],
                    2
                    /* CLASS */
                  ),
                  createVNode("div", null, [
                    createVNode(
                      "h3",
                      { class: "text-lg font-semibold text-slate-900 dark:text-white" },
                      toDisplayString(__props.title),
                      1
                      /* TEXT */
                    ),
                    createVNode(
                      "p",
                      { class: "text-sm text-slate-500 dark:text-slate-400" },
                      toDisplayString(__props.description),
                      1
                      /* TEXT */
                    )
                  ])
                ]),
                createVNode(
                  "p",
                  { class: "text-sm text-slate-600 dark:text-slate-400 mb-6" },
                  toDisplayString(__props.message),
                  1
                  /* TEXT */
                ),
                createVNode("div", { class: "flex justify-end gap-3" }, [
                  createVNode(_component_UButton, {
                    color: "neutral",
                    variant: "outline",
                    onClick: handleCancel
                  }, {
                    default: withCtx(() => [
                      createTextVNode(
                        toDisplayString(__props.cancelLabel),
                        1
                        /* TEXT */
                      )
                    ]),
                    _: 1
                    /* STABLE */
                  }),
                  createVNode(_component_UButton, {
                    color: "error",
                    onClick: handleConfirm
                  }, {
                    default: withCtx(() => [
                      createTextVNode(
                        toDisplayString(__props.confirmLabel),
                        1
                        /* TEXT */
                      )
                    ]),
                    _: 1
                    /* STABLE */
                  })
                ])
              ])
            ];
          }
        }),
        _: 1
        /* STABLE */
      }, _parent));
    };
  }
});

const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("inertia/components/admin/notifications/ConfirmModal.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};

const _sfc_main = /* @__PURE__ */ defineComponent({
  ...{
    layout: AdminLayout
  },
  __name: "index",
  __ssrInlineRender: true,
  props: {
    admin: { default: () => ({ id: 0, name: "Admin" }) },
    notifications: { default: () => [] },
    meta: { default: () => ({
      total: 0,
      perPage: 20,
      currentPage: 1,
      lastPage: 1,
      firstPage: 1
    }) },
    unreadCount: { default: 0 },
    typeStats: { default: () => ({}) },
    filters: { default: () => ({
      type: "all",
      isRead: "all"
    }) }
  },
  setup(__props) {
    const props = __props;
    const {
      notifications: localNotifications,
      unreadCount: localUnreadCount,
      isLoading,
      currentPage,
      selectedType,
      selectedReadStatus,
      hasActiveFilters,
      hasReadNotifications,
      syncWithProps,
      applyFilters,
      resetFilters,
      handlePageChange,
      markAsRead,
      markAllAsRead,
      deleteNotification,
      clearReadNotifications
    } = useNotifications({
      initialNotifications: props.notifications,
      initialMeta: props.meta,
      initialUnreadCount: props.unreadCount,
      initialFilters: props.filters
    });
    const deleteModalOpen = ref(false);
    const deleteTargetId = ref(null);
    const clearReadModalOpen = ref(false);
    watch(
      () => props.notifications,
      () => syncWithProps({ notifications: props.notifications }),
      { deep: true }
    );
    watch(
      () => props.unreadCount,
      () => syncWithProps({ unreadCount: props.unreadCount })
    );
    watch(
      () => props.meta?.currentPage,
      () => syncWithProps({ meta: props.meta })
    );
    const {
      isConnected,
      setNotifications,
      setUnreadCount,
      markAsRead: transmitMarkAsRead,
      markAllAsRead: transmitMarkAllAsRead
    } = useAdminNotifications();
    onMounted(() => {
      setNotifications(localNotifications.value);
      setUnreadCount(localUnreadCount.value);
    });
    const readNotificationsCount = computed(() => {
      return (props.meta?.total ?? 0) - localUnreadCount.value;
    });
    const handleMarkAsRead = async (id) => {
      const success = await markAsRead(id);
      if (success) {
        transmitMarkAsRead(id);
      }
    };
    const handleMarkAllAsRead = async () => {
      const success = await markAllAsRead();
      if (success) {
        transmitMarkAllAsRead();
      }
    };
    const openDeleteModal = (id) => {
      deleteTargetId.value = id;
      deleteModalOpen.value = true;
    };
    const handleDelete = async () => {
      if (!deleteTargetId.value) return;
      await deleteNotification(deleteTargetId.value);
      deleteModalOpen.value = false;
      deleteTargetId.value = null;
    };
    const handleClearRead = async () => {
      await clearReadNotifications();
      clearReadModalOpen.value = false;
    };
    const handleFilterChange = () => {
      applyFilters();
    };
    const handleResetFilters = () => {
      resetFilters();
    };
    const handlePageUpdate = (page) => {
      handlePageChange(page);
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "space-y-6" }, _attrs))}><!-- Page Header -->`);
      _push(ssrRenderComponent(_sfc_main$7, {
        "is-connected": unref(isConnected),
        "unread-count": unref(localUnreadCount),
        "has-read-notifications": unref(hasReadNotifications),
        onMarkAllAsRead: handleMarkAllAsRead,
        onClearRead: ($event) => clearReadModalOpen.value = true
      }, null, _parent));
      _push(`<!-- Stats Cards -->`);
      _push(ssrRenderComponent(_sfc_main$6, {
        total: props.meta?.total ?? 0,
        "unread-count": unref(localUnreadCount),
        "read-count": readNotificationsCount.value
      }, null, _parent));
      _push(`<!-- Filters -->`);
      _push(ssrRenderComponent(_sfc_main$5, {
        "selected-type": unref(selectedType),
        "onUpdate:selectedType": ($event) => isRef(selectedType) ? selectedType.value = $event : null,
        "selected-read-status": unref(selectedReadStatus),
        "onUpdate:selectedReadStatus": ($event) => isRef(selectedReadStatus) ? selectedReadStatus.value = $event : null,
        "type-stats": props.typeStats,
        onFilter: handleFilterChange,
        onReset: handleResetFilters
      }, null, _parent));
      _push(`<!-- Notifications List -->`);
      _push(ssrRenderComponent(_sfc_main$3, {
        notifications: unref(localNotifications),
        "is-loading": unref(isLoading),
        "has-filters": unref(hasActiveFilters),
        onRead: handleMarkAsRead,
        onDelete: openDeleteModal,
        onResetFilters: handleResetFilters
      }, {
        pagination: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_sfc_main$2, {
              "current-page": unref(currentPage),
              total: props.meta?.total ?? 0,
              "per-page": props.meta?.perPage ?? 20,
              "last-page": props.meta?.lastPage ?? 1,
              "onUpdate:currentPage": handlePageUpdate
            }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(_sfc_main$2, {
                "current-page": unref(currentPage),
                total: props.meta?.total ?? 0,
                "per-page": props.meta?.perPage ?? 20,
                "last-page": props.meta?.lastPage ?? 1,
                "onUpdate:currentPage": handlePageUpdate
              }, null, 8, ["current-page", "total", "per-page", "last-page"])
            ];
          }
        }),
        _: 1
        /* STABLE */
      }, _parent));
      _push(`<!-- Delete Confirmation Modal -->`);
      _push(ssrRenderComponent(_sfc_main$1, {
        open: deleteModalOpen.value,
        "onUpdate:open": ($event) => deleteModalOpen.value = $event,
        title: "Hapus Notifikasi",
        description: "Apakah Anda yakin ingin menghapus notifikasi ini?",
        message: "Tindakan ini tidak dapat dibatalkan.",
        "confirm-label": "Hapus",
        variant: "danger",
        onConfirm: handleDelete
      }, null, _parent));
      _push(`<!-- Clear Read Modal -->`);
      _push(ssrRenderComponent(_sfc_main$1, {
        open: clearReadModalOpen.value,
        "onUpdate:open": ($event) => clearReadModalOpen.value = $event,
        title: "Hapus Notifikasi Dibaca",
        description: "Hapus semua notifikasi yang sudah dibaca?",
        message: "Semua notifikasi yang sudah ditandai sebagai dibaca akan dihapus secara permanen.",
        "confirm-label": "Hapus Semua",
        variant: "warning",
        onConfirm: handleClearRead
      }, null, _parent));
      _push(`</div>`);
    };
  }
});

const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("inertia/pages/admin/notifications/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
