import { defineComponent, computed, mergeProps, unref, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrInterpolate, ssrRenderComponent } from 'vue/server-renderer';
import { A as AdminLayout, _ as _sfc_main$1, a as _sfc_main$2, b as _sfc_main$3, c as _sfc_main$4, d as _sfc_main$5, e as _sfc_main$6, f as _sfc_main$7 } from './admin-CGUULoJY.js';
import './Badge-DaOjA2YD.js';
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
import './Button-BBveOjhJ.js';
import 'tailwind-variants';
import '@iconify/vue';
import 'ufo';
import 'reka-ui/namespaced';
import './Tooltip-N44Fzd4m.js';

const _sfc_main = /* @__PURE__ */ defineComponent({
  ...{
    layout: AdminLayout
  },
  __name: "dashboard",
  __ssrInlineRender: true,
  props: {
    user: { default: () => ({
      id: 0,
      fullName: "Admin",
      email: "",
      role: "admin"
    }) },
    stats: { default: () => ({
      totalProducts: 0,
      totalOrders: 0,
      totalCustomers: 0,
      totalCategories: 0,
      pendingReviews: 0,
      monthlyRevenue: 0,
      ordersByStatus: {}
    }) },
    recentOrders: { default: () => [] }
  },
  setup(__props) {
    const props = __props;
    const isSuperAdmin = computed(() => props.user.role === "superadmin");
    const dashboardStats = computed(() => ({
      totalProducts: props.stats.totalProducts,
      activeProducts: props.stats.totalProducts,
      draftProducts: 0,
      outOfStockProducts: 0,
      totalOrders: props.stats.totalOrders,
      pendingOrders: props.stats.ordersByStatus?.pending || 0,
      processingOrders: props.stats.ordersByStatus?.processing || 0,
      shippedOrders: props.stats.ordersByStatus?.shipped || 0,
      deliveredOrders: props.stats.ordersByStatus?.delivered || 0,
      cancelledOrders: props.stats.ordersByStatus?.cancelled || 0,
      totalRevenue: props.stats.monthlyRevenue,
      monthlyRevenue: props.stats.monthlyRevenue,
      weeklyRevenue: 0,
      todayRevenue: 0
    }));
    const recentOrdersTransformed = computed(
      () => props.recentOrders.map((order) => ({
        ...order,
        customerAvatar: null,
        itemCount: 1
      }))
    );
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "space-y-6" }, _attrs))}><!-- Page Header --><div class="flex items-center justify-between"><div><h1 class="text-2xl font-bold text-gray-900 dark:text-white">Dashboard</h1><p class="text-gray-500 dark:text-gray-400"> Selamat datang kembali, ${ssrInterpolate(props.user.fullName)}</p></div></div><!-- Stats Cards -->`);
      _push(ssrRenderComponent(unref(_sfc_main$1), { stats: dashboardStats.value }, null, _parent));
      _push(`<!-- Quick Actions -->`);
      _push(ssrRenderComponent(unref(_sfc_main$2), null, null, _parent));
      _push(`<!-- Content Grid --><div class="grid grid-cols-1 lg:grid-cols-3 gap-6"><!-- Left Column - Recent Orders --><div class="lg:col-span-2 space-y-6"><!-- Recent Orders -->`);
      _push(ssrRenderComponent(unref(_sfc_main$3), { orders: recentOrdersTransformed.value }, null, _parent));
      _push(`</div><!-- Right Column - System Info & Tips --><div class="space-y-6"><!-- System Health Widget -->`);
      _push(ssrRenderComponent(unref(_sfc_main$4), null, null, _parent));
      _push(`<!-- Queue Widget -->`);
      _push(ssrRenderComponent(unref(_sfc_main$5), { "is-super-admin": isSuperAdmin.value }, null, _parent));
      _push(`<!-- Tips Card -->`);
      _push(ssrRenderComponent(unref(_sfc_main$6), null, null, _parent));
      _push(`<!-- Product Categories -->`);
      _push(ssrRenderComponent(unref(_sfc_main$7), null, null, _parent));
      _push(`</div></div></div>`);
    };
  }
});

const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("inertia/pages/admin/dashboard.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
