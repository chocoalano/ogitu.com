import { defineComponent, unref, useSSRContext } from 'vue';
import { ssrRenderComponent } from 'vue/server-renderer';
import { Head } from '@inertiajs/vue3';
import { _ as _sfc_main$1 } from './default-ChIG0McX.js';
import { a as useOrderActions, b as useOrders } from './use_orders-BXfsuIbb.js';
import { u as useToast } from './Badge-DaOjA2YD.js';
import { u as useMidtrans } from './use_midtrans-C-FzEF4G.js';
import { O as OrderPageHeader, a as OrderStatusTabs, b as OrderList, _ as _sfc_main$2 } from './OrderDetailActions-CLrpnhBR.js';
import 'reka-ui';
import './virtual_nuxt-ui-plugins-BqI2j5ZJ.js';
import '@unhead/vue/client';
import 'tailwindcss/colors';
import 'hookable';
import '@vueuse/core';
import 'defu';
import 'ohash/utils';
import '@unhead/vue';
import './Button-BBveOjhJ.js';
import 'tailwind-variants';
import '@iconify/vue';
import 'ufo';
import './Modal-lw8uQ47S.js';
import 'vaul-vue';
import './DropdownMenu-DnaZdPLR.js';
import 'reka-ui/namespaced';
import './Checkbox-9gbT5PLz.js';

const _sfc_main = /* @__PURE__ */ defineComponent({
  ...{ layout: _sfc_main$1 },
  __name: "index",
  __ssrInlineRender: true,
  props: {
    orders: {},
    pagination: {},
    filters: {},
    statusOptions: {}
  },
  setup(__props) {
    const props = __props;
    const toast = useToast();
    const { cancelOrder, confirmReceived, payOrder, verifyPayment, isProcessing } = useOrderActions();
    const { payWithSnap, isPaymentOpen } = useMidtrans();
    const {
      selectedStatus,
      isLoading,
      hasPagination,
      statusOptionsWithIcons,
      filterByStatus,
      goToPage,
      refreshOrders
    } = useOrders({
      orders: props.orders,
      pagination: props.pagination,
      filters: props.filters,
      statusOptions: props.statusOptions
    });
    const handlePay = async (order) => {
      const result = await payOrder(order.id);
      if (!result.success) {
        toast.error(result.message);
        return;
      }
      if (!result.snapToken) {
        toast.error("Token pembayaran tidak tersedia");
        return;
      }
      await payWithSnap(result.snapToken, {
        onSuccess: async (midtransResult) => {
          const verifyResult = await verifyPayment(
            order.id,
            midtransResult?.transaction_status || "settlement",
            midtransResult?.transaction_id
          );
          if (verifyResult.success) {
            toast.success("Pembayaran berhasil! Pesanan sedang diproses.");
          } else {
            toast.success("Pembayaran berhasil!");
          }
          refreshOrders();
        },
        onPending: async (midtransResult) => {
          await verifyPayment(
            order.id,
            midtransResult?.transaction_status || "pending",
            midtransResult?.transaction_id
          );
          toast.info("Menunggu pembayaran. Silakan selesaikan pembayaran Anda.");
          refreshOrders();
        },
        onError: (message) => {
          toast.error(message);
        },
        onClose: () => {
          toast.info("Pembayaran dibatalkan");
        }
      });
    };
    const handleConfirmReceived = async (order) => {
      const confirmed = window.confirm("Konfirmasi bahwa Anda sudah menerima pesanan ini?");
      if (!confirmed) return;
      const result = await confirmReceived(order.id);
      if (result.success) {
        toast.success(result.message);
        refreshOrders();
      } else {
        toast.error(result.message);
      }
    };
    const handleCancel = async (order) => {
      const confirmed = window.confirm("Apakah Anda yakin ingin membatalkan pesanan ini?");
      if (!confirmed) return;
      const result = await cancelOrder(order.id);
      if (result.success) {
        toast.success(result.message);
        refreshOrders();
      } else {
        toast.error(result.message);
      }
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
      _push(ssrRenderComponent(unref(Head), { title: "Pesanan Saya - Ogitu" }, null, _parent));
      _push(`<div class="min-h-screen bg-linear-to-b from-gray-50 via-white to-gray-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-900"><!-- Background Pattern --><div class="fixed inset-0 -z-10 overflow-hidden pointer-events-none"><!-- Gradient Mesh --><div class="absolute top-0 left-1/4 w-96 h-96 bg-primary-500/10 rounded-full blur-3xl"></div><div class="absolute top-1/3 right-1/4 w-80 h-80 bg-secondary-500/10 rounded-full blur-3xl"></div><div class="absolute bottom-1/4 left-1/3 w-72 h-72 bg-primary-500/5 rounded-full blur-3xl"></div><!-- Grid Pattern --><div class="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.02)_1px,transparent_1px)] dark:bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-size-[60px_60px]"></div></div><!-- Content --><div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12"><!-- Page Header -->`);
      _push(ssrRenderComponent(unref(OrderPageHeader), {
        title: "Pesanan Saya",
        subtitle: "Kelola dan lacak pesanan vape Anda"
      }, null, _parent));
      _push(`<!-- Status Filter Tabs -->`);
      _push(ssrRenderComponent(unref(OrderStatusTabs), {
        options: unref(statusOptionsWithIcons),
        selected: unref(selectedStatus),
        loading: unref(isLoading),
        onSelect: unref(filterByStatus)
      }, null, _parent));
      _push(`<!-- Orders List -->`);
      _push(ssrRenderComponent(unref(OrderList), {
        orders: __props.orders,
        loading: unref(isLoading) || unref(isProcessing) || unref(isPaymentOpen),
        filtered: unref(selectedStatus) !== "all",
        onPay: handlePay,
        onConfirmReceived: handleConfirmReceived,
        onCancel: handleCancel
      }, null, _parent));
      _push(`<!-- Pagination -->`);
      if (unref(hasPagination)) {
        _push(ssrRenderComponent(unref(_sfc_main$2), {
          "current-page": __props.pagination.currentPage,
          "last-page": __props.pagination.lastPage,
          total: __props.pagination.total,
          "per-page": __props.pagination.perPage,
          onChange: unref(goToPage)
        }, null, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div><!--]-->`);
    };
  }
});

const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("inertia/pages/orders/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
