import { _ as _sfc_main$2, a as _sfc_main$b } from './Button-BBveOjhJ.js';
import { _ as _sfc_main$a } from './Modal-lw8uQ47S.js';
import { defineComponent, ref, unref, withCtx, createVNode, createTextVNode, toDisplayString, createBlock, createCommentVNode, openBlock, useSSRContext } from 'vue';
import { ssrRenderComponent, ssrInterpolate } from 'vue/server-renderer';
import { Head, Link, router } from '@inertiajs/vue3';
import { _ as _sfc_main$1 } from './default-ChIG0McX.js';
import { a as useOrderActions, u as useOrderFormatters } from './use_orders-BXfsuIbb.js';
import { u as useToast } from './Badge-DaOjA2YD.js';
import { u as useMidtrans } from './use_midtrans-C-FzEF4G.js';
import { c as _sfc_main$3, d as _sfc_main$4, e as _sfc_main$5, f as _sfc_main$6, g as _sfc_main$7, h as _sfc_main$8, i as _sfc_main$9 } from './OrderDetailActions-CLrpnhBR.js';
import 'defu';
import 'reka-ui';
import './virtual_nuxt-ui-plugins-BqI2j5ZJ.js';
import '@unhead/vue/client';
import 'tailwindcss/colors';
import 'hookable';
import '@vueuse/core';
import 'ohash/utils';
import '@unhead/vue';
import 'tailwind-variants';
import '@iconify/vue';
import 'ufo';
import 'vaul-vue';
import './DropdownMenu-DnaZdPLR.js';
import 'reka-ui/namespaced';
import './Checkbox-9gbT5PLz.js';

const _sfc_main = /* @__PURE__ */ defineComponent({
  ...{ layout: _sfc_main$1 },
  __name: "show",
  __ssrInlineRender: true,
  props: {
    order: {}
  },
  setup(__props) {
    const props = __props;
    const toast = useToast();
    const { formatDate, formatRelativeTime } = useOrderFormatters();
    const { cancelOrder, confirmReceived, payOrder, verifyPayment, isProcessing } = useOrderActions();
    const { payWithSnap, isPaymentOpen } = useMidtrans();
    const showCancelModal = ref(false);
    const isCancelling = ref(false);
    const showConfirmReceivedModal = ref(false);
    const isConfirming = ref(false);
    const handlePay = async () => {
      const result = await payOrder(props.order.id);
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
            props.order.id,
            midtransResult?.transaction_status || "settlement",
            midtransResult?.transaction_id
          );
          if (verifyResult.success) {
            toast.success("Pembayaran berhasil! Pesanan sedang diproses.");
          } else {
            toast.success("Pembayaran berhasil!");
          }
          router.reload();
        },
        onPending: async (midtransResult) => {
          await verifyPayment(
            props.order.id,
            midtransResult?.transaction_status || "pending",
            midtransResult?.transaction_id
          );
          toast.info("Menunggu pembayaran. Silakan selesaikan pembayaran Anda.");
          router.reload();
        },
        onError: (message) => {
          toast.error(message);
        },
        onClose: () => {
          toast.info("Pembayaran dibatalkan");
        }
      });
    };
    const handleConfirmReceived = () => {
      showConfirmReceivedModal.value = true;
    };
    const confirmReceivedOrder = async () => {
      isConfirming.value = true;
      const result = await confirmReceived(props.order.id);
      if (result.success) {
        toast.success(result.message);
        showConfirmReceivedModal.value = false;
        router.reload();
      } else {
        toast.error(result.message);
      }
      isConfirming.value = false;
    };
    const handleCancel = () => {
      showCancelModal.value = true;
    };
    const confirmCancelOrder = async () => {
      isCancelling.value = true;
      const result = await cancelOrder(props.order.id);
      if (result.success) {
        toast.success(result.message);
        showCancelModal.value = false;
        router.reload();
      } else {
        toast.error(result.message);
      }
      isCancelling.value = false;
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UIcon = _sfc_main$2;
      const _component_UModal = _sfc_main$a;
      const _component_UButton = _sfc_main$b;
      _push(`<!--[-->`);
      _push(ssrRenderComponent(unref(Head), {
        title: `Pesanan ${__props.order.orderNumber} - Ogitu`
      }, null, _parent));
      _push(`<div class="min-h-screen bg-linear-to-b from-gray-50 via-white to-gray-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-900"><!-- Background Pattern --><div class="fixed inset-0 -z-10 overflow-hidden pointer-events-none"><div class="absolute top-0 left-1/4 w-96 h-96 bg-primary-500/10 rounded-full blur-3xl"></div><div class="absolute top-1/3 right-1/4 w-80 h-80 bg-secondary-500/10 rounded-full blur-3xl"></div><div class="absolute bottom-1/4 left-1/3 w-72 h-72 bg-primary-500/5 rounded-full blur-3xl"></div></div><!-- Content --><div class="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12"><!-- Back Button -->`);
      _push(ssrRenderComponent(unref(Link), {
        href: "/orders",
        class: "inline-flex items-center gap-2 text-gray-500 dark:text-gray-400 hover:text-primary-500 dark:hover:text-primary-400 transition-colors duration-200 mb-6 group"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_UIcon, {
              name: "i-heroicons-arrow-left",
              class: "w-5 h-5 group-hover:-translate-x-1 transition-transform duration-200"
            }, null, _parent2, _scopeId));
            _push2(`<span${_scopeId}>Kembali ke Daftar Pesanan</span>`);
          } else {
            return [
              createVNode(_component_UIcon, {
                name: "i-heroicons-arrow-left",
                class: "w-5 h-5 group-hover:-translate-x-1 transition-transform duration-200"
              }),
              createVNode("span", null, "Kembali ke Daftar Pesanan")
            ];
          }
        }),
        _: 1
        /* STABLE */
      }, _parent));
      _push(`<!-- Order Header --><div class="relative mb-8 p-6 bg-white dark:bg-gray-800/80 rounded-2xl border border-gray-200/80 dark:border-gray-700/50 overflow-hidden"><!-- Decorative Glow --><div class="absolute top-0 right-0 w-64 h-64 bg-primary-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div><div class="relative flex flex-wrap items-start justify-between gap-4"><div class="flex items-center gap-4"><!-- Order Icon --><div class="hidden sm:flex w-16 h-16 rounded-2xl bg-linear-to-br from-primary-500 to-secondary-600 items-center justify-center shadow-lg shadow-primary-500/30">`);
      _push(ssrRenderComponent(_component_UIcon, {
        name: "i-heroicons-document-text",
        class: "w-8 h-8 text-white"
      }, null, _parent));
      _push(`</div><div><div class="flex items-center gap-3 mb-1"><h1 class="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">${ssrInterpolate(__props.order.orderNumber)}</h1></div><div class="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-gray-500 dark:text-gray-400"><span class="flex items-center gap-1.5">`);
      _push(ssrRenderComponent(_component_UIcon, {
        name: "i-heroicons-calendar",
        class: "w-4 h-4"
      }, null, _parent));
      _push(` ${ssrInterpolate(unref(formatDate)(__props.order.createdAt))}</span><span class="text-gray-300 dark:text-gray-600">•</span><span>${ssrInterpolate(unref(formatRelativeTime)(__props.order.createdAt))}</span></div></div></div>`);
      _push(ssrRenderComponent(unref(_sfc_main$3), {
        status: __props.order.status,
        size: "lg",
        animated: ""
      }, null, _parent));
      _push(`</div></div><!-- Main Content Grid --><div class="grid grid-cols-1 lg:grid-cols-3 gap-6"><!-- Left Column - Main Content --><div class="lg:col-span-2 space-y-6"><!-- Timeline -->`);
      if (__props.order.timeline) {
        _push(ssrRenderComponent(unref(_sfc_main$4), {
          timeline: __props.order.timeline
        }, null, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(`<!-- Items -->`);
      _push(ssrRenderComponent(unref(_sfc_main$5), {
        items: __props.order.items
      }, null, _parent));
      _push(`<!-- Shipping -->`);
      if (__props.order.shipping) {
        _push(ssrRenderComponent(unref(_sfc_main$6), {
          shipping: __props.order.shipping
        }, null, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(`<!-- Customer Notes -->`);
      if (__props.order.customerNotes) {
        _push(`<div class="bg-white dark:bg-gray-800/80 rounded-2xl border border-gray-200/80 dark:border-gray-700/50 overflow-hidden"><div class="px-5 py-4 border-b border-gray-100 dark:border-gray-700/50"><div class="flex items-center gap-3"><div class="w-10 h-10 rounded-xl bg-linear-to-br from-pink-500/10 to-rose-500/10 flex items-center justify-center">`);
        _push(ssrRenderComponent(_component_UIcon, {
          name: "i-heroicons-chat-bubble-left-ellipsis",
          class: "w-5 h-5 text-pink-500"
        }, null, _parent));
        _push(`</div><h2 class="font-semibold text-gray-900 dark:text-white">Catatan</h2></div></div><div class="p-5"><p class="text-gray-600 dark:text-gray-400">${ssrInterpolate(__props.order.customerNotes)}</p></div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><!-- Right Column - Sidebar --><div class="space-y-6"><!-- Address -->`);
      if (__props.order.address) {
        _push(ssrRenderComponent(unref(_sfc_main$7), {
          address: __props.order.address
        }, null, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(`<!-- Summary -->`);
      _push(ssrRenderComponent(unref(_sfc_main$8), { order: __props.order }, null, _parent));
      _push(`<!-- Actions -->`);
      _push(ssrRenderComponent(unref(_sfc_main$9), {
        order: __props.order,
        loading: unref(isProcessing) || unref(isPaymentOpen),
        onPay: handlePay,
        onConfirmReceived: handleConfirmReceived,
        onCancel: handleCancel
      }, null, _parent));
      _push(`</div></div></div></div><!-- Cancel Order Confirmation Modal -->`);
      _push(ssrRenderComponent(_component_UModal, {
        open: showCancelModal.value,
        "onUpdate:open": ($event) => showCancelModal.value = $event,
        title: "Batalkan Pesanan",
        description: "Apakah Anda yakin ingin membatalkan pesanan ini?",
        ui: { overlay: "z-[100]", content: "z-[100]" }
      }, {
        body: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="p-4 max-h-[70vh] overflow-y-auto"${_scopeId}><div class="flex items-start gap-4"${_scopeId}><div class="w-12 h-12 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center shrink-0"${_scopeId}>`);
            _push2(ssrRenderComponent(_component_UIcon, {
              name: "i-heroicons-exclamation-triangle",
              class: "w-6 h-6 text-red-600 dark:text-red-400"
            }, null, _parent2, _scopeId));
            _push2(`</div><div${_scopeId}><p class="text-gray-600 dark:text-gray-400"${_scopeId}> Pesanan <span class="font-semibold text-gray-900 dark:text-white"${_scopeId}>${ssrInterpolate(__props.order.orderNumber)}</span> akan dibatalkan. Tindakan ini tidak dapat dibatalkan. </p></div></div></div>`);
          } else {
            return [
              createVNode("div", { class: "p-4 max-h-[70vh] overflow-y-auto" }, [
                createVNode("div", { class: "flex items-start gap-4" }, [
                  createVNode("div", { class: "w-12 h-12 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center shrink-0" }, [
                    createVNode(_component_UIcon, {
                      name: "i-heroicons-exclamation-triangle",
                      class: "w-6 h-6 text-red-600 dark:text-red-400"
                    })
                  ]),
                  createVNode("div", null, [
                    createVNode("p", { class: "text-gray-600 dark:text-gray-400" }, [
                      createTextVNode(" Pesanan "),
                      createVNode(
                        "span",
                        { class: "font-semibold text-gray-900 dark:text-white" },
                        toDisplayString(__props.order.orderNumber),
                        1
                        /* TEXT */
                      ),
                      createTextVNode(" akan dibatalkan. Tindakan ini tidak dapat dibatalkan. ")
                    ])
                  ])
                ])
              ])
            ];
          }
        }),
        footer: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="flex justify-end gap-3 p-4 border-t border-gray-200 dark:border-gray-700"${_scopeId}>`);
            _push2(ssrRenderComponent(_component_UButton, {
              variant: "ghost",
              color: "neutral",
              disabled: isCancelling.value,
              onClick: ($event) => showCancelModal.value = false
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Kembali `);
                } else {
                  return [
                    createTextVNode(" Kembali ")
                  ];
                }
              }),
              _: 1
              /* STABLE */
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_UButton, {
              color: "error",
              loading: isCancelling.value,
              onClick: confirmCancelOrder
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_UIcon, {
                    name: "i-heroicons-x-circle",
                    class: "w-4 h-4 mr-2"
                  }, null, _parent3, _scopeId2));
                  _push3(` Ya, Batalkan Pesanan `);
                } else {
                  return [
                    createVNode(_component_UIcon, {
                      name: "i-heroicons-x-circle",
                      class: "w-4 h-4 mr-2"
                    }),
                    createTextVNode(" Ya, Batalkan Pesanan ")
                  ];
                }
              }),
              _: 1
              /* STABLE */
            }, _parent2, _scopeId));
            _push2(`</div>`);
          } else {
            return [
              createVNode("div", { class: "flex justify-end gap-3 p-4 border-t border-gray-200 dark:border-gray-700" }, [
                createVNode(_component_UButton, {
                  variant: "ghost",
                  color: "neutral",
                  disabled: isCancelling.value,
                  onClick: ($event) => showCancelModal.value = false
                }, {
                  default: withCtx(() => [
                    createTextVNode(" Kembali ")
                  ]),
                  _: 1
                  /* STABLE */
                }, 8, ["disabled", "onClick"]),
                createVNode(_component_UButton, {
                  color: "error",
                  loading: isCancelling.value,
                  onClick: confirmCancelOrder
                }, {
                  default: withCtx(() => [
                    createVNode(_component_UIcon, {
                      name: "i-heroicons-x-circle",
                      class: "w-4 h-4 mr-2"
                    }),
                    createTextVNode(" Ya, Batalkan Pesanan ")
                  ]),
                  _: 1
                  /* STABLE */
                }, 8, ["loading"])
              ])
            ];
          }
        }),
        _: 1
        /* STABLE */
      }, _parent));
      _push(`<!-- Confirm Received Modal -->`);
      _push(ssrRenderComponent(_component_UModal, {
        open: showConfirmReceivedModal.value,
        "onUpdate:open": ($event) => showConfirmReceivedModal.value = $event,
        title: "Konfirmasi Pesanan Diterima",
        description: "Pastikan Anda sudah menerima pesanan dengan baik",
        ui: { overlay: "z-[100]", content: "z-[100]" }
      }, {
        body: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="p-4 max-h-[70vh] overflow-y-auto"${_scopeId}><div class="flex items-start gap-4"${_scopeId}><div class="w-12 h-12 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center shrink-0"${_scopeId}>`);
            _push2(ssrRenderComponent(_component_UIcon, {
              name: "i-heroicons-check-badge",
              class: "w-6 h-6 text-emerald-600 dark:text-emerald-400"
            }, null, _parent2, _scopeId));
            _push2(`</div><div class="space-y-2"${_scopeId}><p class="text-gray-600 dark:text-gray-400"${_scopeId}> Konfirmasi bahwa pesanan <span class="font-semibold text-gray-900 dark:text-white"${_scopeId}>${ssrInterpolate(__props.order.orderNumber)}</span> sudah Anda terima dengan baik. </p>`);
            if (__props.order.shipping?.trackingNumber) {
              _push2(`<div class="flex items-center gap-2 text-sm"${_scopeId}>`);
              _push2(ssrRenderComponent(_component_UIcon, {
                name: "i-heroicons-truck",
                class: "w-4 h-4 text-gray-400"
              }, null, _parent2, _scopeId));
              _push2(`<span class="text-gray-500 dark:text-gray-400"${_scopeId}>No. Resi:</span><code class="px-2 py-0.5 bg-gray-100 dark:bg-gray-700 rounded text-xs font-mono text-gray-700 dark:text-gray-300"${_scopeId}>${ssrInterpolate(__props.order.shipping.trackingNumber)}</code></div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`<p class="text-xs text-amber-600 dark:text-amber-400"${_scopeId}>`);
            _push2(ssrRenderComponent(_component_UIcon, {
              name: "i-heroicons-information-circle",
              class: "w-4 h-4 inline mr-1"
            }, null, _parent2, _scopeId));
            _push2(` Setelah dikonfirmasi, dana akan diteruskan ke penjual. </p></div></div></div>`);
          } else {
            return [
              createVNode("div", { class: "p-4 max-h-[70vh] overflow-y-auto" }, [
                createVNode("div", { class: "flex items-start gap-4" }, [
                  createVNode("div", { class: "w-12 h-12 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center shrink-0" }, [
                    createVNode(_component_UIcon, {
                      name: "i-heroicons-check-badge",
                      class: "w-6 h-6 text-emerald-600 dark:text-emerald-400"
                    })
                  ]),
                  createVNode("div", { class: "space-y-2" }, [
                    createVNode("p", { class: "text-gray-600 dark:text-gray-400" }, [
                      createTextVNode(" Konfirmasi bahwa pesanan "),
                      createVNode(
                        "span",
                        { class: "font-semibold text-gray-900 dark:text-white" },
                        toDisplayString(__props.order.orderNumber),
                        1
                        /* TEXT */
                      ),
                      createTextVNode(" sudah Anda terima dengan baik. ")
                    ]),
                    __props.order.shipping?.trackingNumber ? (openBlock(), createBlock("div", {
                      key: 0,
                      class: "flex items-center gap-2 text-sm"
                    }, [
                      createVNode(_component_UIcon, {
                        name: "i-heroicons-truck",
                        class: "w-4 h-4 text-gray-400"
                      }),
                      createVNode("span", { class: "text-gray-500 dark:text-gray-400" }, "No. Resi:"),
                      createVNode(
                        "code",
                        { class: "px-2 py-0.5 bg-gray-100 dark:bg-gray-700 rounded text-xs font-mono text-gray-700 dark:text-gray-300" },
                        toDisplayString(__props.order.shipping.trackingNumber),
                        1
                        /* TEXT */
                      )
                    ])) : createCommentVNode("v-if", true),
                    createVNode("p", { class: "text-xs text-amber-600 dark:text-amber-400" }, [
                      createVNode(_component_UIcon, {
                        name: "i-heroicons-information-circle",
                        class: "w-4 h-4 inline mr-1"
                      }),
                      createTextVNode(" Setelah dikonfirmasi, dana akan diteruskan ke penjual. ")
                    ])
                  ])
                ])
              ])
            ];
          }
        }),
        footer: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="flex justify-end gap-3 p-4 border-t border-gray-200 dark:border-gray-700"${_scopeId}>`);
            _push2(ssrRenderComponent(_component_UButton, {
              variant: "ghost",
              color: "neutral",
              disabled: isConfirming.value,
              onClick: ($event) => showConfirmReceivedModal.value = false
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Kembali `);
                } else {
                  return [
                    createTextVNode(" Kembali ")
                  ];
                }
              }),
              _: 1
              /* STABLE */
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_UButton, {
              color: "success",
              loading: isConfirming.value,
              onClick: confirmReceivedOrder
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_UIcon, {
                    name: "i-heroicons-check-circle",
                    class: "w-4 h-4 mr-2"
                  }, null, _parent3, _scopeId2));
                  _push3(` Ya, Pesanan Diterima `);
                } else {
                  return [
                    createVNode(_component_UIcon, {
                      name: "i-heroicons-check-circle",
                      class: "w-4 h-4 mr-2"
                    }),
                    createTextVNode(" Ya, Pesanan Diterima ")
                  ];
                }
              }),
              _: 1
              /* STABLE */
            }, _parent2, _scopeId));
            _push2(`</div>`);
          } else {
            return [
              createVNode("div", { class: "flex justify-end gap-3 p-4 border-t border-gray-200 dark:border-gray-700" }, [
                createVNode(_component_UButton, {
                  variant: "ghost",
                  color: "neutral",
                  disabled: isConfirming.value,
                  onClick: ($event) => showConfirmReceivedModal.value = false
                }, {
                  default: withCtx(() => [
                    createTextVNode(" Kembali ")
                  ]),
                  _: 1
                  /* STABLE */
                }, 8, ["disabled", "onClick"]),
                createVNode(_component_UButton, {
                  color: "success",
                  loading: isConfirming.value,
                  onClick: confirmReceivedOrder
                }, {
                  default: withCtx(() => [
                    createVNode(_component_UIcon, {
                      name: "i-heroicons-check-circle",
                      class: "w-4 h-4 mr-2"
                    }),
                    createTextVNode(" Ya, Pesanan Diterima ")
                  ]),
                  _: 1
                  /* STABLE */
                }, 8, ["loading"])
              ])
            ];
          }
        }),
        _: 1
        /* STABLE */
      }, _parent));
      _push(`<!--]-->`);
    };
  }
});

const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("inertia/pages/orders/show.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
