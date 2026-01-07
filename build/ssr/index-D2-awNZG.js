import { _ as _sfc_main$2, a as _sfc_main$4 } from './Button-BBveOjhJ.js';
import { _ as _sfc_main$3 } from './Badge-DaOjA2YD.js';
import { defineComponent, ref, computed, unref, withCtx, createVNode, createTextVNode, useSSRContext } from 'vue';
import { ssrRenderComponent, ssrInterpolate, ssrRenderClass, ssrRenderList } from 'vue/server-renderer';
import { Head, Link, router } from '@inertiajs/vue3';
import { _ as _sfc_main$1 } from './default-ChIG0McX.js';
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
import 'reka-ui/namespaced';
import './Modal-lw8uQ47S.js';
import 'vaul-vue';
import './DropdownMenu-DnaZdPLR.js';
import './Checkbox-9gbT5PLz.js';

const _sfc_main = /* @__PURE__ */ defineComponent({
  ...{ layout: _sfc_main$1 },
  __name: "index",
  __ssrInlineRender: true,
  props: {
    order: {},
    searchQuery: {}
  },
  setup(__props) {
    const props = __props;
    const searchInput = ref(props.searchQuery);
    const isSearching = ref(false);
    const formatPrice = (price) => {
      return new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
      }).format(price);
    };
    const formatDate = (dateString) => {
      if (!dateString) return "-";
      return new Date(dateString).toLocaleDateString("id-ID", {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit"
      });
    };
    const getStatusConfig = (status) => {
      const configs = {
        pending_payment: { label: "Menunggu Pembayaran", color: "bg-amber-100 text-amber-700", icon: "i-heroicons-clock" },
        paid: { label: "Dibayar", color: "bg-blue-100 text-blue-700", icon: "i-heroicons-credit-card" },
        processing: { label: "Diproses", color: "bg-indigo-100 text-indigo-700", icon: "i-heroicons-cog-6-tooth" },
        shipped: { label: "Dikirim", color: "bg-purple-100 text-purple-700", icon: "i-heroicons-truck" },
        delivered: { label: "Selesai", color: "bg-emerald-100 text-emerald-700", icon: "i-heroicons-check-circle" },
        cancelled: { label: "Dibatalkan", color: "bg-red-100 text-red-700", icon: "i-heroicons-x-circle" }
      };
      return configs[status] || { label: status, color: "bg-gray-100 text-gray-700", icon: "i-heroicons-question-mark-circle" };
    };
    const timelineSteps = computed(() => {
      if (!props.order) return [];
      const steps = [
        { key: "created", label: "Pesanan Dibuat", date: props.order.createdAt, icon: "i-heroicons-shopping-bag" },
        { key: "paid", label: "Pembayaran Dikonfirmasi", date: props.order.paidAt, icon: "i-heroicons-credit-card" },
        { key: "processing", label: "Pesanan Diproses", date: props.order.paidAt, icon: "i-heroicons-cog-6-tooth" },
        { key: "shipped", label: "Pesanan Dikirim", date: props.order.shippedAt, icon: "i-heroicons-truck" },
        { key: "delivered", label: "Pesanan Diterima", date: props.order.deliveredAt, icon: "i-heroicons-check-circle" }
      ];
      if (props.order.status === "cancelled") {
        return [
          steps[0],
          { key: "cancelled", label: "Pesanan Dibatalkan", date: props.order.cancelledAt, icon: "i-heroicons-x-circle" }
        ];
      }
      return steps;
    });
    const currentStepIndex = computed(() => {
      if (!props.order) return -1;
      const statusMap = {
        pending_payment: 0,
        paid: 1,
        processing: 2,
        shipped: 3,
        delivered: 4,
        cancelled: 1
      };
      return statusMap[props.order.status] ?? 0;
    });
    const copyToClipboard = (text) => {
      if (typeof window !== "undefined" && navigator.clipboard) {
        navigator.clipboard.writeText(text);
      }
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UIcon = _sfc_main$2;
      const _component_UInput = _sfc_main$3;
      const _component_UButton = _sfc_main$4;
      _push(`<!--[-->`);
      _push(ssrRenderComponent(unref(Head), { title: "Lacak Pesanan - Ogitu" }, null, _parent));
      _push(`<div class="min-h-screen bg-linear-to-b from-gray-50 via-white to-gray-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-900"><!-- Background Effects --><div class="fixed inset-0 -z-10 overflow-hidden pointer-events-none"><div class="absolute top-0 left-1/4 w-125 h-125 bg-blue-500/10 rounded-full blur-3xl"></div><div class="absolute top-1/3 right-1/4 w-100 h-100 bg-purple-500/10 rounded-full blur-3xl"></div></div><!-- Hero Section --><div class="relative bg-linear-to-r from-blue-500 via-indigo-500 to-purple-500 overflow-hidden"><div class="absolute inset-0 opacity-10"><svg class="w-full h-full" xmlns="http://www.w3.org/2000/svg"><defs><pattern id="track-pattern" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse"><circle cx="20" cy="20" r="2" fill="white"></circle></pattern></defs><rect width="100%" height="100%" fill="url(#track-pattern)"></rect></svg></div><div class="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16"><!-- Breadcrumb --><nav class="flex items-center gap-2 text-sm mb-6 text-white/80">`);
      _push(ssrRenderComponent(unref(Link), {
        href: "/",
        class: "hover:text-white transition-colors"
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
        class: "w-4 h-4"
      }, null, _parent));
      _push(`<span class="text-white font-medium">Lacak Pesanan</span></nav><div class="text-center"><div class="w-16 h-16 mx-auto mb-4 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center">`);
      _push(ssrRenderComponent(_component_UIcon, {
        name: "i-heroicons-map-pin",
        class: "w-8 h-8 text-white"
      }, null, _parent));
      _push(`</div><h1 class="text-3xl sm:text-4xl font-bold text-white mb-3">Lacak Pesanan</h1><p class="text-white/80 max-w-md mx-auto mb-8"> Masukkan nomor pesanan untuk melacak status pengiriman </p><!-- Search Form --><form class="max-w-lg mx-auto"><div class="flex gap-3">`);
      _push(ssrRenderComponent(_component_UInput, {
        modelValue: searchInput.value,
        "onUpdate:modelValue": ($event) => searchInput.value = $event,
        placeholder: "Masukkan nomor pesanan (contoh: ORD-20231213-XXXXX)",
        size: "lg",
        class: "flex-1",
        ui: { base: "bg-white/90 backdrop-blur-sm" }
      }, null, _parent));
      _push(ssrRenderComponent(_component_UButton, {
        type: "submit",
        color: "white",
        size: "lg",
        loading: isSearching.value
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_UIcon, {
              name: "i-heroicons-magnifying-glass",
              class: "w-5 h-5"
            }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_UIcon, {
                name: "i-heroicons-magnifying-glass",
                class: "w-5 h-5"
              })
            ];
          }
        }),
        _: 1
        /* STABLE */
      }, _parent));
      _push(`</div></form></div></div></div><!-- Content --><div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12"><!-- Order Found -->`);
      if (__props.order) {
        _push(`<div><!-- Order Header --><div class="bg-white dark:bg-gray-800/80 rounded-2xl border border-gray-200/80 dark:border-gray-700/50 p-6 mb-6"><div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"><div><p class="text-sm text-gray-500 dark:text-gray-400 mb-1">Nomor Pesanan</p><h2 class="text-xl font-bold text-gray-900 dark:text-white">${ssrInterpolate(__props.order.orderNumber)}</h2><p class="text-sm text-gray-500 dark:text-gray-400 mt-1">${ssrInterpolate(formatDate(__props.order.createdAt))}</p></div><div class="${ssrRenderClass(["inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium", getStatusConfig(__props.order.status).color])}">`);
        _push(ssrRenderComponent(_component_UIcon, {
          name: getStatusConfig(__props.order.status).icon,
          class: "w-4 h-4"
        }, null, _parent));
        _push(` ${ssrInterpolate(getStatusConfig(__props.order.status).label)}</div></div></div><!-- Timeline --><div class="bg-white dark:bg-gray-800/80 rounded-2xl border border-gray-200/80 dark:border-gray-700/50 p-6 mb-6"><h3 class="font-semibold text-gray-900 dark:text-white mb-6">Status Pengiriman</h3><div class="relative"><!-- Timeline line --><div class="absolute left-5 top-0 bottom-0 w-0.5 bg-gray-200 dark:bg-gray-700"></div><!-- Timeline items --><div class="space-y-6"><!--[-->`);
        ssrRenderList(timelineSteps.value, (step, index) => {
          _push(`<div class="relative flex gap-4"><!-- Icon --><div class="${ssrRenderClass([
            "relative z-10 w-10 h-10 rounded-full flex items-center justify-center shrink-0",
            index <= currentStepIndex.value ? step.key === "cancelled" ? "bg-red-500 text-white" : "bg-primary-500 text-white" : "bg-gray-100 dark:bg-gray-700 text-gray-400"
          ])}">`);
          _push(ssrRenderComponent(_component_UIcon, {
            name: step.icon,
            class: "w-5 h-5"
          }, null, _parent));
          _push(`</div><!-- Content --><div class="pt-2 pb-4"><p class="${ssrRenderClass([
            "font-medium",
            index <= currentStepIndex.value ? "text-gray-900 dark:text-white" : "text-gray-400 dark:text-gray-500"
          ])}">${ssrInterpolate(step.label)}</p>`);
          if (step.date && index <= currentStepIndex.value) {
            _push(`<p class="text-sm text-gray-500 dark:text-gray-400 mt-1">${ssrInterpolate(formatDate(step.date))}</p>`);
          } else {
            _push(`<!---->`);
          }
          _push(`</div></div>`);
        });
        _push(`<!--]--></div></div></div><!-- Shipping Info -->`);
        if (__props.order.shipping) {
          _push(`<div class="bg-white dark:bg-gray-800/80 rounded-2xl border border-gray-200/80 dark:border-gray-700/50 p-6 mb-6"><h3 class="font-semibold text-gray-900 dark:text-white mb-4">Informasi Pengiriman</h3><div class="grid grid-cols-1 sm:grid-cols-2 gap-4"><div><p class="text-sm text-gray-500 dark:text-gray-400">Kurir</p><p class="font-medium text-gray-900 dark:text-white">${ssrInterpolate(__props.order.shipping.courier.toUpperCase())} - ${ssrInterpolate(__props.order.shipping.service)}</p></div><div><p class="text-sm text-gray-500 dark:text-gray-400">Estimasi</p><p class="font-medium text-gray-900 dark:text-white">${ssrInterpolate(__props.order.shipping.estimatedDays || "-")} hari </p></div><div class="sm:col-span-2"><p class="text-sm text-gray-500 dark:text-gray-400">No. Resi</p><div class="flex items-center gap-2"><p class="font-medium text-gray-900 dark:text-white font-mono">${ssrInterpolate(__props.order.shipping.trackingNumber || "Belum tersedia")}</p>`);
          if (__props.order.shipping.trackingNumber) {
            _push(ssrRenderComponent(_component_UButton, {
              variant: "ghost",
              size: "xs",
              onClick: ($event) => copyToClipboard(__props.order.shipping.trackingNumber)
            }, {
              default: withCtx((_, _push2, _parent2, _scopeId) => {
                if (_push2) {
                  _push2(ssrRenderComponent(_component_UIcon, {
                    name: "i-heroicons-clipboard-document",
                    class: "w-4 h-4"
                  }, null, _parent2, _scopeId));
                } else {
                  return [
                    createVNode(_component_UIcon, {
                      name: "i-heroicons-clipboard-document",
                      class: "w-4 h-4"
                    })
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
        } else {
          _push(`<!---->`);
        }
        _push(`<!-- Order Items --><div class="bg-white dark:bg-gray-800/80 rounded-2xl border border-gray-200/80 dark:border-gray-700/50 p-6 mb-6"><h3 class="font-semibold text-gray-900 dark:text-white mb-4">Detail Pesanan</h3><div class="space-y-4"><!--[-->`);
        ssrRenderList(__props.order.items, (item) => {
          _push(`<div class="flex items-center justify-between py-3 border-b border-gray-100 dark:border-gray-700/50 last:border-0"><div><p class="font-medium text-gray-900 dark:text-white">${ssrInterpolate(item.productName)}</p>`);
          if (item.variantName) {
            _push(`<p class="text-sm text-gray-500 dark:text-gray-400">${ssrInterpolate(item.variantName)}</p>`);
          } else {
            _push(`<!---->`);
          }
          _push(`<p class="text-sm text-gray-500 dark:text-gray-400">${ssrInterpolate(item.quantity)}x ${ssrInterpolate(formatPrice(item.price))}</p></div><p class="font-medium text-gray-900 dark:text-white">${ssrInterpolate(formatPrice(item.subtotal))}</p></div>`);
        });
        _push(`<!--]--></div><!-- Totals --><div class="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700 space-y-2"><div class="flex justify-between text-sm"><span class="text-gray-500 dark:text-gray-400">Subtotal</span><span class="text-gray-900 dark:text-white">${ssrInterpolate(formatPrice(__props.order.subtotal))}</span></div><div class="flex justify-between text-sm"><span class="text-gray-500 dark:text-gray-400">Ongkos Kirim</span><span class="text-gray-900 dark:text-white">${ssrInterpolate(formatPrice(__props.order.shippingCost))}</span></div><div class="flex justify-between font-bold text-lg pt-2"><span class="text-gray-900 dark:text-white">Total</span><span class="text-primary-600 dark:text-primary-400">${ssrInterpolate(formatPrice(__props.order.total))}</span></div></div></div><!-- Need Help --><div class="bg-blue-50 dark:bg-blue-900/20 rounded-2xl p-6 border border-blue-200 dark:border-blue-800"><div class="flex items-start gap-4"><div class="w-12 h-12 rounded-xl bg-blue-100 dark:bg-blue-900/50 flex items-center justify-center shrink-0">`);
        _push(ssrRenderComponent(_component_UIcon, {
          name: "i-heroicons-question-mark-circle",
          class: "w-6 h-6 text-blue-600 dark:text-blue-400"
        }, null, _parent));
        _push(`</div><div><h4 class="font-semibold text-gray-900 dark:text-white mb-1">Butuh Bantuan?</h4><p class="text-sm text-gray-600 dark:text-gray-400 mb-3"> Jika ada kendala dengan pesanan, silakan hubungi customer service kami. </p><div class="flex flex-wrap gap-2">`);
        _push(ssrRenderComponent(unref(Link), { href: "/help" }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(_component_UButton, {
                color: "primary",
                variant: "soft",
                size: "sm"
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(_component_UIcon, {
                      name: "i-heroicons-book-open",
                      class: "w-4 h-4 mr-1"
                    }, null, _parent3, _scopeId2));
                    _push3(` Pusat Bantuan `);
                  } else {
                    return [
                      createVNode(_component_UIcon, {
                        name: "i-heroicons-book-open",
                        class: "w-4 h-4 mr-1"
                      }),
                      createTextVNode(" Pusat Bantuan ")
                    ];
                  }
                }),
                _: 1
                /* STABLE */
              }, _parent2, _scopeId));
            } else {
              return [
                createVNode(_component_UButton, {
                  color: "primary",
                  variant: "soft",
                  size: "sm"
                }, {
                  default: withCtx(() => [
                    createVNode(_component_UIcon, {
                      name: "i-heroicons-book-open",
                      class: "w-4 h-4 mr-1"
                    }),
                    createTextVNode(" Pusat Bantuan ")
                  ]),
                  _: 1
                  /* STABLE */
                })
              ];
            }
          }),
          _: 1
          /* STABLE */
        }, _parent));
        _push(ssrRenderComponent(_component_UButton, {
          color: "primary",
          variant: "soft",
          size: "sm",
          as: "a",
          href: "https://wa.me/6281234567890",
          target: "_blank"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(_component_UIcon, {
                name: "i-simple-icons-whatsapp",
                class: "w-4 h-4 mr-1"
              }, null, _parent2, _scopeId));
              _push2(` WhatsApp `);
            } else {
              return [
                createVNode(_component_UIcon, {
                  name: "i-simple-icons-whatsapp",
                  class: "w-4 h-4 mr-1"
                }),
                createTextVNode(" WhatsApp ")
              ];
            }
          }),
          _: 1
          /* STABLE */
        }, _parent));
        _push(`</div></div></div></div></div>`);
      } else if (__props.searchQuery) {
        _push(`<!--[--><!-- Order Not Found --><div class="text-center py-16"><div class="w-24 h-24 mx-auto mb-6 rounded-3xl bg-red-500/10 flex items-center justify-center">`);
        _push(ssrRenderComponent(_component_UIcon, {
          name: "i-heroicons-magnifying-glass",
          class: "w-12 h-12 text-red-500"
        }, null, _parent));
        _push(`</div><h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-3">Pesanan Tidak Ditemukan</h2><p class="text-gray-500 dark:text-gray-400 max-w-md mx-auto mb-6"> Tidak ada pesanan dengan nomor &quot;${ssrInterpolate(__props.searchQuery)}&quot;. Pastikan nomor pesanan sudah benar. </p>`);
        _push(ssrRenderComponent(_component_UButton, {
          color: "primary",
          onClick: ($event) => {
            searchInput.value = "";
            unref(router).get("/track");
          }
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(` Coba Lagi `);
            } else {
              return [
                createTextVNode(" Coba Lagi ")
              ];
            }
          }),
          _: 1
          /* STABLE */
        }, _parent));
        _push(`</div><!--]-->`);
      } else {
        _push(`<!--[--><!-- Initial State --><div class="text-center py-16"><div class="w-24 h-24 mx-auto mb-6 rounded-3xl bg-blue-500/10 flex items-center justify-center">`);
        _push(ssrRenderComponent(_component_UIcon, {
          name: "i-heroicons-truck",
          class: "w-12 h-12 text-blue-500"
        }, null, _parent));
        _push(`</div><h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-3">Lacak Pesanan Anda</h2><p class="text-gray-500 dark:text-gray-400 max-w-md mx-auto mb-8"> Masukkan nomor pesanan di atas untuk melihat status pengiriman secara real-time. </p><!-- Tips --><div class="max-w-lg mx-auto bg-white dark:bg-gray-800/80 rounded-2xl border border-gray-200/80 dark:border-gray-700/50 p-6 text-left"><h3 class="font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">`);
        _push(ssrRenderComponent(_component_UIcon, {
          name: "i-heroicons-light-bulb",
          class: "w-5 h-5 text-yellow-500"
        }, null, _parent));
        _push(` Tips </h3><ul class="space-y-3 text-sm text-gray-600 dark:text-gray-400"><li class="flex items-start gap-2">`);
        _push(ssrRenderComponent(_component_UIcon, {
          name: "i-heroicons-check",
          class: "w-4 h-4 text-primary-500 mt-0.5 shrink-0"
        }, null, _parent));
        _push(`<span>Nomor pesanan bisa ditemukan di email konfirmasi atau halaman pesanan</span></li><li class="flex items-start gap-2">`);
        _push(ssrRenderComponent(_component_UIcon, {
          name: "i-heroicons-check",
          class: "w-4 h-4 text-primary-500 mt-0.5 shrink-0"
        }, null, _parent));
        _push(`<span>Format nomor pesanan: ORD-YYYYMMDD-XXXXX</span></li><li class="flex items-start gap-2">`);
        _push(ssrRenderComponent(_component_UIcon, {
          name: "i-heroicons-check",
          class: "w-4 h-4 text-primary-500 mt-0.5 shrink-0"
        }, null, _parent));
        _push(`<span>Jika sudah login, cek riwayat pesanan di halaman `);
        _push(ssrRenderComponent(unref(Link), {
          href: "/orders",
          class: "text-primary-500 hover:underline"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`Pesanan Saya`);
            } else {
              return [
                createTextVNode("Pesanan Saya")
              ];
            }
          }),
          _: 1
          /* STABLE */
        }, _parent));
        _push(`</span></li></ul></div></div><!--]-->`);
      }
      _push(`</div></div><!--]-->`);
    };
  }
});

const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("inertia/pages/track/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
