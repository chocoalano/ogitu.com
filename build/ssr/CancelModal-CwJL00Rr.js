import { ref, defineComponent, mergeModels, useModel, computed, watch, mergeProps, withCtx, createVNode, unref, createCommentVNode, toDisplayString, createTextVNode, useSSRContext } from 'vue';
import { router } from '@inertiajs/vue3';
import { u as useToast, _ as _sfc_main$6 } from './Badge-DaOjA2YD.js';
import { _ as _sfc_main$5 } from './SelectMenu-CGTADs72.js';
import { _ as _sfc_main$4 } from './FormField-BIqlRgyi.js';
import { a as _sfc_main$7 } from './Button-BBveOjhJ.js';
import { _ as _sfc_main$3 } from './Card-Ci6a5H8H.js';
import { _ as _sfc_main$2 } from './Modal-lw8uQ47S.js';
import { ssrRenderComponent, ssrInterpolate } from 'vue/server-renderer';
import { _ as _sfc_main$9 } from './Textarea-DTaAAeeU.js';
import { _ as _sfc_main$8 } from './Alert-D5zWQYXW.js';

function getToken() {
  if (typeof document === "undefined") return "";
  const match = document.cookie.match(/XSRF-TOKEN=([^;]+)/);
  return match ? decodeURIComponent(match[1]) : "";
}
function useOrderActions() {
  const toast = useToast();
  const isLoading = ref(false);
  const processOrder = async (orderId) => {
    isLoading.value = true;
    try {
      const response = await fetch(`/api/admin/orders/${orderId}/process`, {
        method: "POST",
        headers: {
          "Accept": "application/json",
          "X-XSRF-TOKEN": getToken()
        }
      });
      const data = await response.json();
      if (data.success) {
        toast.success("Berhasil", "Pesanan sedang diproses");
        return true;
      } else {
        toast.error("Gagal", data.message || "Gagal memproses");
        return false;
      }
    } catch (error) {
      toast.error("Error", "Terjadi kesalahan saat memproses pesanan");
      return false;
    } finally {
      isLoading.value = false;
    }
  };
  const submitShipping = async (orderId, form, isUpdate = false) => {
    if (!form.courierCode || !form.waybill) {
      toast.error("Error", "Kurir dan nomor resi wajib diisi");
      return false;
    }
    isLoading.value = true;
    try {
      const method = isUpdate ? "PUT" : "POST";
      const url = `/api/admin/orders/${orderId}/shipping`;
      const response = await fetch(url, {
        method,
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
          "X-XSRF-TOKEN": getToken()
        },
        body: JSON.stringify(form)
      });
      const data = await response.json();
      if (data.success) {
        toast.success("Berhasil", isUpdate ? "Data pengiriman diperbarui" : "Pesanan telah dikirim");
        return true;
      } else {
        toast.error("Gagal", data.message || "Gagal menyimpan");
        return false;
      }
    } catch (error) {
      toast.error("Error", "Terjadi kesalahan saat menyimpan data pengiriman");
      return false;
    } finally {
      isLoading.value = false;
    }
  };
  const refreshTracking = async (orderId) => {
    isLoading.value = true;
    try {
      const response = await fetch(`/api/admin/orders/${orderId}/track`, {
        headers: { Accept: "application/json" }
      });
      const data = await response.json();
      if (data.success) {
        toast.success("Berhasil", "Data tracking diperbarui");
        return data.tracking;
      } else {
        toast.warning("Info", data.message || "Data tracking belum tersedia");
        return null;
      }
    } catch (error) {
      toast.error("Error", "Gagal memuat data tracking");
      return null;
    } finally {
      isLoading.value = false;
    }
  };
  const cancelOrder = async (orderId, reason = "") => {
    isLoading.value = true;
    try {
      const response = await fetch(`/api/admin/orders/${orderId}/cancel`, {
        method: "POST",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
          "X-XSRF-TOKEN": getToken()
        },
        body: JSON.stringify({ reason })
      });
      const data = await response.json();
      if (data.success) {
        toast.success("Berhasil", "Pesanan dibatalkan");
        return true;
      } else {
        toast.error("Gagal", data.message || "Gagal membatalkan");
        return false;
      }
    } catch (error) {
      toast.error("Error", "Terjadi kesalahan saat membatalkan pesanan");
      return false;
    } finally {
      isLoading.value = false;
    }
  };
  const reloadOrders = (only = ["orders", "stats"]) => {
    router.reload({ only });
  };
  const reloadPage = () => {
    router.reload();
  };
  const copyToClipboard = (text) => {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(text);
      toast.success("Disalin", "Teks berhasil disalin ke clipboard");
    }
  };
  return {
    isLoading,
    processOrder,
    submitShipping,
    refreshTracking,
    cancelOrder,
    reloadOrders,
    reloadPage,
    copyToClipboard
  };
}

const COURIER_SERVICES = [
  { value: "REG", label: "Regular" },
  { value: "YES", label: "Yakin Esok Sampai" },
  { value: "OKE", label: "Ongkos Kirim Ekonomis" },
  { value: "JTR", label: "JTR (J&T Cargo)" },
  { value: "EXPRESS", label: "Express" },
  { value: "SAME_DAY", label: "Same Day" }
];
const STATUS_COLOR_MAP = {
  warning: "warning",
  info: "info",
  primary: "primary",
  success: "success",
  error: "error",
  neutral: "neutral"
};
function getStatusBadgeColor(color) {
  return STATUS_COLOR_MAP[color] || "neutral";
}

function useOrderFormatters() {
  const formatCurrency = (value) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value);
  };
  const formatDate = (dateString) => {
    if (!dateString) return "-";
    const date = new Date(dateString);
    return date.toLocaleDateString("id-ID", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    });
  };
  const formatShortDate = (dateString) => {
    if (!dateString) return "-";
    const date = new Date(dateString);
    return date.toLocaleDateString("id-ID", {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    });
  };
  const formatRelativeTime = (dateString) => {
    const date = new Date(dateString);
    const now = /* @__PURE__ */ new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 6e4);
    const diffHours = Math.floor(diffMs / 36e5);
    const diffDays = Math.floor(diffMs / 864e5);
    if (diffMins < 1) return "Baru saja";
    if (diffMins < 60) return `${diffMins} menit lalu`;
    if (diffHours < 24) return `${diffHours} jam lalu`;
    if (diffDays < 7) return `${diffDays} hari lalu`;
    return formatShortDate(dateString);
  };
  const formatWeight = (grams) => {
    if (grams >= 1e3) {
      return `${(grams / 1e3).toFixed(1)} kg`;
    }
    return `${grams} gram`;
  };
  return {
    formatCurrency,
    formatDate,
    formatShortDate,
    formatRelativeTime,
    formatWeight
  };
}

const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "ShippingModal",
  __ssrInlineRender: true,
  props: /* @__PURE__ */ mergeModels({
    order: {},
    couriers: {},
    loading: { type: Boolean }
  }, {
    "open": { type: Boolean, ...{ required: true } },
    "openModifiers": {}
  }),
  emits: /* @__PURE__ */ mergeModels(["submit"], ["update:open"]),
  setup(__props, { emit: __emit }) {
    const open = useModel(__props, "open");
    const props = __props;
    const emit = __emit;
    const form = ref({
      courierCode: "",
      courierService: "REG",
      waybill: "",
      weight: 1e3
    });
    const isUpdate = computed(() => !!props.order?.shipping?.waybill);
    watch(() => props.order, (newOrder) => {
      if (newOrder) {
        form.value = {
          courierCode: newOrder.shipping?.courierCode || "",
          courierService: newOrder.shipping?.courierService || "REG",
          waybill: newOrder.shipping?.waybill || "",
          weight: newOrder.shipping?.weight || 1e3
        };
      }
    }, { immediate: true });
    const handleSubmit = () => {
      emit("submit", { ...form.value }, isUpdate.value);
    };
    const handleClose = () => {
      open.value = false;
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UModal = _sfc_main$2;
      const _component_UCard = _sfc_main$3;
      const _component_UButton = _sfc_main$7;
      const _component_UFormField = _sfc_main$4;
      const _component_USelectMenu = _sfc_main$5;
      const _component_UInput = _sfc_main$6;
      _push(ssrRenderComponent(_component_UModal, mergeProps({
        open: open.value,
        "onUpdate:open": ($event) => open.value = $event,
        title: isUpdate.value ? "Update Pengiriman" : "Input Pengiriman",
        description: "Masukkan informasi pengiriman pesanan",
        ui: { overlay: "z-[100]", content: "z-[100]" }
      }, _attrs), {
        content: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_UCard, { class: "max-h-[85vh] overflow-y-auto" }, {
              header: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="flex items-center justify-between"${_scopeId2}><h3 class="text-lg font-semibold text-gray-900 dark:text-white"${_scopeId2}>${ssrInterpolate(isUpdate.value ? "Update Pengiriman" : "Input Pengiriman")}</h3>`);
                  _push3(ssrRenderComponent(_component_UButton, {
                    color: "neutral",
                    variant: "ghost",
                    icon: "i-heroicons-x-mark",
                    onClick: handleClose
                  }, null, _parent3, _scopeId2));
                  _push3(`</div>`);
                } else {
                  return [
                    createVNode("div", { class: "flex items-center justify-between" }, [
                      createVNode(
                        "h3",
                        { class: "text-lg font-semibold text-gray-900 dark:text-white" },
                        toDisplayString(isUpdate.value ? "Update Pengiriman" : "Input Pengiriman"),
                        1
                        /* TEXT */
                      ),
                      createVNode(_component_UButton, {
                        color: "neutral",
                        variant: "ghost",
                        icon: "i-heroicons-x-mark",
                        onClick: handleClose
                      })
                    ])
                  ];
                }
              }),
              footer: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="flex justify-end gap-3"${_scopeId2}>`);
                  _push3(ssrRenderComponent(_component_UButton, {
                    color: "neutral",
                    variant: "ghost",
                    onClick: handleClose
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(` Batal `);
                      } else {
                        return [
                          createTextVNode(" Batal ")
                        ];
                      }
                    }),
                    _: 1
                    /* STABLE */
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_UButton, {
                    color: "primary",
                    loading: __props.loading,
                    onClick: handleSubmit
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`${ssrInterpolate(isUpdate.value ? "Perbarui" : "Kirim Pesanan")}`);
                      } else {
                        return [
                          createTextVNode(
                            toDisplayString(isUpdate.value ? "Perbarui" : "Kirim Pesanan"),
                            1
                            /* TEXT */
                          )
                        ];
                      }
                    }),
                    _: 1
                    /* STABLE */
                  }, _parent3, _scopeId2));
                  _push3(`</div>`);
                } else {
                  return [
                    createVNode("div", { class: "flex justify-end gap-3" }, [
                      createVNode(_component_UButton, {
                        color: "neutral",
                        variant: "ghost",
                        onClick: handleClose
                      }, {
                        default: withCtx(() => [
                          createTextVNode(" Batal ")
                        ]),
                        _: 1
                        /* STABLE */
                      }),
                      createVNode(_component_UButton, {
                        color: "primary",
                        loading: __props.loading,
                        onClick: handleSubmit
                      }, {
                        default: withCtx(() => [
                          createTextVNode(
                            toDisplayString(isUpdate.value ? "Perbarui" : "Kirim Pesanan"),
                            1
                            /* TEXT */
                          )
                        ]),
                        _: 1
                        /* STABLE */
                      }, 8, ["loading"])
                    ])
                  ];
                }
              }),
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="space-y-4"${_scopeId2}><!-- Order Info --><div class="p-3 bg-gray-50 dark:bg-gray-900 rounded-lg"${_scopeId2}><p class="font-medium text-gray-900 dark:text-white"${_scopeId2}>${ssrInterpolate(__props.order?.orderNumber)}</p><p class="text-sm text-gray-500 dark:text-gray-400"${_scopeId2}>${ssrInterpolate(__props.order?.customer?.name)} • ${ssrInterpolate(__props.order?.itemCount)} item </p></div><!-- Courier Select -->`);
                  _push3(ssrRenderComponent(_component_UFormField, {
                    label: "Kurir",
                    required: ""
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_USelectMenu, {
                          modelValue: form.value.courierCode,
                          "onUpdate:modelValue": ($event) => form.value.courierCode = $event,
                          items: __props.couriers,
                          "value-key": "code",
                          "option-attribute": "name",
                          placeholder: "Pilih kurir",
                          class: "w-full"
                        }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_USelectMenu, {
                            modelValue: form.value.courierCode,
                            "onUpdate:modelValue": ($event) => form.value.courierCode = $event,
                            items: __props.couriers,
                            "value-key": "code",
                            "option-attribute": "name",
                            placeholder: "Pilih kurir",
                            class: "w-full"
                          }, null, 8, ["modelValue", "onUpdate:modelValue", "items"])
                        ];
                      }
                    }),
                    _: 1
                    /* STABLE */
                  }, _parent3, _scopeId2));
                  _push3(`<!-- Service Select -->`);
                  _push3(ssrRenderComponent(_component_UFormField, { label: "Layanan" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_USelectMenu, {
                          modelValue: form.value.courierService,
                          "onUpdate:modelValue": ($event) => form.value.courierService = $event,
                          items: unref(COURIER_SERVICES),
                          "value-key": "value",
                          "option-attribute": "label",
                          placeholder: "Pilih layanan",
                          class: "w-full"
                        }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_USelectMenu, {
                            modelValue: form.value.courierService,
                            "onUpdate:modelValue": ($event) => form.value.courierService = $event,
                            items: unref(COURIER_SERVICES),
                            "value-key": "value",
                            "option-attribute": "label",
                            placeholder: "Pilih layanan",
                            class: "w-full"
                          }, null, 8, ["modelValue", "onUpdate:modelValue", "items"])
                        ];
                      }
                    }),
                    _: 1
                    /* STABLE */
                  }, _parent3, _scopeId2));
                  _push3(`<!-- Waybill Input -->`);
                  _push3(ssrRenderComponent(_component_UFormField, {
                    label: "Nomor Resi",
                    required: ""
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_UInput, {
                          modelValue: form.value.waybill,
                          "onUpdate:modelValue": ($event) => form.value.waybill = $event,
                          placeholder: "Masukkan nomor resi",
                          class: "w-full font-mono"
                        }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_UInput, {
                            modelValue: form.value.waybill,
                            "onUpdate:modelValue": ($event) => form.value.waybill = $event,
                            placeholder: "Masukkan nomor resi",
                            class: "w-full font-mono"
                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                        ];
                      }
                    }),
                    _: 1
                    /* STABLE */
                  }, _parent3, _scopeId2));
                  _push3(`<!-- Weight Input -->`);
                  _push3(ssrRenderComponent(_component_UFormField, { label: "Berat (gram)" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_UInput, {
                          modelValue: form.value.weight,
                          "onUpdate:modelValue": ($event) => form.value.weight = $event,
                          type: "number",
                          placeholder: "Berat dalam gram",
                          class: "w-full"
                        }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_UInput, {
                            modelValue: form.value.weight,
                            "onUpdate:modelValue": ($event) => form.value.weight = $event,
                            type: "number",
                            placeholder: "Berat dalam gram",
                            class: "w-full"
                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                        ];
                      }
                    }),
                    _: 1
                    /* STABLE */
                  }, _parent3, _scopeId2));
                  _push3(`</div>`);
                } else {
                  return [
                    createVNode("div", { class: "space-y-4" }, [
                      createCommentVNode(" Order Info "),
                      createVNode("div", { class: "p-3 bg-gray-50 dark:bg-gray-900 rounded-lg" }, [
                        createVNode(
                          "p",
                          { class: "font-medium text-gray-900 dark:text-white" },
                          toDisplayString(__props.order?.orderNumber),
                          1
                          /* TEXT */
                        ),
                        createVNode(
                          "p",
                          { class: "text-sm text-gray-500 dark:text-gray-400" },
                          toDisplayString(__props.order?.customer?.name) + " • " + toDisplayString(__props.order?.itemCount) + " item ",
                          1
                          /* TEXT */
                        )
                      ]),
                      createCommentVNode(" Courier Select "),
                      createVNode(_component_UFormField, {
                        label: "Kurir",
                        required: ""
                      }, {
                        default: withCtx(() => [
                          createVNode(_component_USelectMenu, {
                            modelValue: form.value.courierCode,
                            "onUpdate:modelValue": ($event) => form.value.courierCode = $event,
                            items: __props.couriers,
                            "value-key": "code",
                            "option-attribute": "name",
                            placeholder: "Pilih kurir",
                            class: "w-full"
                          }, null, 8, ["modelValue", "onUpdate:modelValue", "items"])
                        ]),
                        _: 1
                        /* STABLE */
                      }),
                      createCommentVNode(" Service Select "),
                      createVNode(_component_UFormField, { label: "Layanan" }, {
                        default: withCtx(() => [
                          createVNode(_component_USelectMenu, {
                            modelValue: form.value.courierService,
                            "onUpdate:modelValue": ($event) => form.value.courierService = $event,
                            items: unref(COURIER_SERVICES),
                            "value-key": "value",
                            "option-attribute": "label",
                            placeholder: "Pilih layanan",
                            class: "w-full"
                          }, null, 8, ["modelValue", "onUpdate:modelValue", "items"])
                        ]),
                        _: 1
                        /* STABLE */
                      }),
                      createCommentVNode(" Waybill Input "),
                      createVNode(_component_UFormField, {
                        label: "Nomor Resi",
                        required: ""
                      }, {
                        default: withCtx(() => [
                          createVNode(_component_UInput, {
                            modelValue: form.value.waybill,
                            "onUpdate:modelValue": ($event) => form.value.waybill = $event,
                            placeholder: "Masukkan nomor resi",
                            class: "w-full font-mono"
                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                        ]),
                        _: 1
                        /* STABLE */
                      }),
                      createCommentVNode(" Weight Input "),
                      createVNode(_component_UFormField, { label: "Berat (gram)" }, {
                        default: withCtx(() => [
                          createVNode(_component_UInput, {
                            modelValue: form.value.weight,
                            "onUpdate:modelValue": ($event) => form.value.weight = $event,
                            type: "number",
                            placeholder: "Berat dalam gram",
                            class: "w-full"
                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                        ]),
                        _: 1
                        /* STABLE */
                      })
                    ])
                  ];
                }
              }),
              _: 1
              /* STABLE */
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_UCard, { class: "max-h-[85vh] overflow-y-auto" }, {
                header: withCtx(() => [
                  createVNode("div", { class: "flex items-center justify-between" }, [
                    createVNode(
                      "h3",
                      { class: "text-lg font-semibold text-gray-900 dark:text-white" },
                      toDisplayString(isUpdate.value ? "Update Pengiriman" : "Input Pengiriman"),
                      1
                      /* TEXT */
                    ),
                    createVNode(_component_UButton, {
                      color: "neutral",
                      variant: "ghost",
                      icon: "i-heroicons-x-mark",
                      onClick: handleClose
                    })
                  ])
                ]),
                footer: withCtx(() => [
                  createVNode("div", { class: "flex justify-end gap-3" }, [
                    createVNode(_component_UButton, {
                      color: "neutral",
                      variant: "ghost",
                      onClick: handleClose
                    }, {
                      default: withCtx(() => [
                        createTextVNode(" Batal ")
                      ]),
                      _: 1
                      /* STABLE */
                    }),
                    createVNode(_component_UButton, {
                      color: "primary",
                      loading: __props.loading,
                      onClick: handleSubmit
                    }, {
                      default: withCtx(() => [
                        createTextVNode(
                          toDisplayString(isUpdate.value ? "Perbarui" : "Kirim Pesanan"),
                          1
                          /* TEXT */
                        )
                      ]),
                      _: 1
                      /* STABLE */
                    }, 8, ["loading"])
                  ])
                ]),
                default: withCtx(() => [
                  createVNode("div", { class: "space-y-4" }, [
                    createCommentVNode(" Order Info "),
                    createVNode("div", { class: "p-3 bg-gray-50 dark:bg-gray-900 rounded-lg" }, [
                      createVNode(
                        "p",
                        { class: "font-medium text-gray-900 dark:text-white" },
                        toDisplayString(__props.order?.orderNumber),
                        1
                        /* TEXT */
                      ),
                      createVNode(
                        "p",
                        { class: "text-sm text-gray-500 dark:text-gray-400" },
                        toDisplayString(__props.order?.customer?.name) + " • " + toDisplayString(__props.order?.itemCount) + " item ",
                        1
                        /* TEXT */
                      )
                    ]),
                    createCommentVNode(" Courier Select "),
                    createVNode(_component_UFormField, {
                      label: "Kurir",
                      required: ""
                    }, {
                      default: withCtx(() => [
                        createVNode(_component_USelectMenu, {
                          modelValue: form.value.courierCode,
                          "onUpdate:modelValue": ($event) => form.value.courierCode = $event,
                          items: __props.couriers,
                          "value-key": "code",
                          "option-attribute": "name",
                          placeholder: "Pilih kurir",
                          class: "w-full"
                        }, null, 8, ["modelValue", "onUpdate:modelValue", "items"])
                      ]),
                      _: 1
                      /* STABLE */
                    }),
                    createCommentVNode(" Service Select "),
                    createVNode(_component_UFormField, { label: "Layanan" }, {
                      default: withCtx(() => [
                        createVNode(_component_USelectMenu, {
                          modelValue: form.value.courierService,
                          "onUpdate:modelValue": ($event) => form.value.courierService = $event,
                          items: unref(COURIER_SERVICES),
                          "value-key": "value",
                          "option-attribute": "label",
                          placeholder: "Pilih layanan",
                          class: "w-full"
                        }, null, 8, ["modelValue", "onUpdate:modelValue", "items"])
                      ]),
                      _: 1
                      /* STABLE */
                    }),
                    createCommentVNode(" Waybill Input "),
                    createVNode(_component_UFormField, {
                      label: "Nomor Resi",
                      required: ""
                    }, {
                      default: withCtx(() => [
                        createVNode(_component_UInput, {
                          modelValue: form.value.waybill,
                          "onUpdate:modelValue": ($event) => form.value.waybill = $event,
                          placeholder: "Masukkan nomor resi",
                          class: "w-full font-mono"
                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                      ]),
                      _: 1
                      /* STABLE */
                    }),
                    createCommentVNode(" Weight Input "),
                    createVNode(_component_UFormField, { label: "Berat (gram)" }, {
                      default: withCtx(() => [
                        createVNode(_component_UInput, {
                          modelValue: form.value.weight,
                          "onUpdate:modelValue": ($event) => form.value.weight = $event,
                          type: "number",
                          placeholder: "Berat dalam gram",
                          class: "w-full"
                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                      ]),
                      _: 1
                      /* STABLE */
                    })
                  ])
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
    };
  }
});

const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("inertia/components/admin/orders/ShippingModal.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "CancelModal",
  __ssrInlineRender: true,
  props: /* @__PURE__ */ mergeModels({
    order: {},
    loading: { type: Boolean }
  }, {
    "open": { type: Boolean, ...{ required: true } },
    "openModifiers": {}
  }),
  emits: /* @__PURE__ */ mergeModels(["confirm"], ["update:open"]),
  setup(__props, { emit: __emit }) {
    const open = useModel(__props, "open");
    const emit = __emit;
    const { formatCurrency } = useOrderFormatters();
    const reason = ref("");
    watch(open, (isOpen) => {
      if (!isOpen) {
        reason.value = "";
      }
    });
    const handleConfirm = () => {
      emit("confirm", reason.value);
    };
    const handleClose = () => {
      open.value = false;
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UModal = _sfc_main$2;
      const _component_UCard = _sfc_main$3;
      const _component_UButton = _sfc_main$7;
      const _component_UAlert = _sfc_main$8;
      const _component_UFormField = _sfc_main$4;
      const _component_UTextarea = _sfc_main$9;
      _push(ssrRenderComponent(_component_UModal, mergeProps({
        open: open.value,
        "onUpdate:open": ($event) => open.value = $event,
        title: "Batalkan Pesanan",
        description: "Konfirmasi pembatalan pesanan",
        ui: { overlay: "z-[100]", content: "z-[100]" }
      }, _attrs), {
        content: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_UCard, { class: "max-h-[85vh] overflow-y-auto" }, {
              header: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="flex items-center justify-between"${_scopeId2}><h3 class="text-lg font-semibold text-gray-900 dark:text-white"${_scopeId2}> Batalkan Pesanan </h3>`);
                  _push3(ssrRenderComponent(_component_UButton, {
                    color: "neutral",
                    variant: "ghost",
                    icon: "i-heroicons-x-mark",
                    onClick: handleClose
                  }, null, _parent3, _scopeId2));
                  _push3(`</div>`);
                } else {
                  return [
                    createVNode("div", { class: "flex items-center justify-between" }, [
                      createVNode("h3", { class: "text-lg font-semibold text-gray-900 dark:text-white" }, " Batalkan Pesanan "),
                      createVNode(_component_UButton, {
                        color: "neutral",
                        variant: "ghost",
                        icon: "i-heroicons-x-mark",
                        onClick: handleClose
                      })
                    ])
                  ];
                }
              }),
              footer: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="flex justify-end gap-3"${_scopeId2}>`);
                  _push3(ssrRenderComponent(_component_UButton, {
                    color: "neutral",
                    variant: "ghost",
                    onClick: handleClose
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(` Kembali `);
                      } else {
                        return [
                          createTextVNode(" Kembali ")
                        ];
                      }
                    }),
                    _: 1
                    /* STABLE */
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_UButton, {
                    color: "error",
                    loading: __props.loading,
                    onClick: handleConfirm
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(` Ya, Batalkan Pesanan `);
                      } else {
                        return [
                          createTextVNode(" Ya, Batalkan Pesanan ")
                        ];
                      }
                    }),
                    _: 1
                    /* STABLE */
                  }, _parent3, _scopeId2));
                  _push3(`</div>`);
                } else {
                  return [
                    createVNode("div", { class: "flex justify-end gap-3" }, [
                      createVNode(_component_UButton, {
                        color: "neutral",
                        variant: "ghost",
                        onClick: handleClose
                      }, {
                        default: withCtx(() => [
                          createTextVNode(" Kembali ")
                        ]),
                        _: 1
                        /* STABLE */
                      }),
                      createVNode(_component_UButton, {
                        color: "error",
                        loading: __props.loading,
                        onClick: handleConfirm
                      }, {
                        default: withCtx(() => [
                          createTextVNode(" Ya, Batalkan Pesanan ")
                        ]),
                        _: 1
                        /* STABLE */
                      }, 8, ["loading"])
                    ])
                  ];
                }
              }),
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="space-y-4"${_scopeId2}>`);
                  _push3(ssrRenderComponent(_component_UAlert, {
                    color: "warning",
                    variant: "soft",
                    icon: "i-heroicons-exclamation-triangle",
                    title: "Perhatian",
                    description: "Pembatalan pesanan tidak dapat dibatalkan. Pastikan Anda sudah berkomunikasi dengan pembeli."
                  }, null, _parent3, _scopeId2));
                  _push3(`<!-- Order Info --><div class="p-3 bg-gray-50 dark:bg-gray-900 rounded-lg"${_scopeId2}><p class="font-medium text-gray-900 dark:text-white"${_scopeId2}>${ssrInterpolate(__props.order?.orderNumber)}</p><p class="text-sm text-gray-500 dark:text-gray-400"${_scopeId2}>${ssrInterpolate(__props.order?.customer?.name)} • ${ssrInterpolate(unref(formatCurrency)(__props.order?.total || 0))}</p></div><!-- Reason Input -->`);
                  _push3(ssrRenderComponent(_component_UFormField, { label: "Alasan Pembatalan" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_UTextarea, {
                          modelValue: reason.value,
                          "onUpdate:modelValue": ($event) => reason.value = $event,
                          placeholder: "Masukkan alasan pembatalan (opsional)",
                          rows: 3,
                          class: "w-full"
                        }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_UTextarea, {
                            modelValue: reason.value,
                            "onUpdate:modelValue": ($event) => reason.value = $event,
                            placeholder: "Masukkan alasan pembatalan (opsional)",
                            rows: 3,
                            class: "w-full"
                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                        ];
                      }
                    }),
                    _: 1
                    /* STABLE */
                  }, _parent3, _scopeId2));
                  _push3(`</div>`);
                } else {
                  return [
                    createVNode("div", { class: "space-y-4" }, [
                      createVNode(_component_UAlert, {
                        color: "warning",
                        variant: "soft",
                        icon: "i-heroicons-exclamation-triangle",
                        title: "Perhatian",
                        description: "Pembatalan pesanan tidak dapat dibatalkan. Pastikan Anda sudah berkomunikasi dengan pembeli."
                      }),
                      createCommentVNode(" Order Info "),
                      createVNode("div", { class: "p-3 bg-gray-50 dark:bg-gray-900 rounded-lg" }, [
                        createVNode(
                          "p",
                          { class: "font-medium text-gray-900 dark:text-white" },
                          toDisplayString(__props.order?.orderNumber),
                          1
                          /* TEXT */
                        ),
                        createVNode(
                          "p",
                          { class: "text-sm text-gray-500 dark:text-gray-400" },
                          toDisplayString(__props.order?.customer?.name) + " • " + toDisplayString(unref(formatCurrency)(__props.order?.total || 0)),
                          1
                          /* TEXT */
                        )
                      ]),
                      createCommentVNode(" Reason Input "),
                      createVNode(_component_UFormField, { label: "Alasan Pembatalan" }, {
                        default: withCtx(() => [
                          createVNode(_component_UTextarea, {
                            modelValue: reason.value,
                            "onUpdate:modelValue": ($event) => reason.value = $event,
                            placeholder: "Masukkan alasan pembatalan (opsional)",
                            rows: 3,
                            class: "w-full"
                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                        ]),
                        _: 1
                        /* STABLE */
                      })
                    ])
                  ];
                }
              }),
              _: 1
              /* STABLE */
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_UCard, { class: "max-h-[85vh] overflow-y-auto" }, {
                header: withCtx(() => [
                  createVNode("div", { class: "flex items-center justify-between" }, [
                    createVNode("h3", { class: "text-lg font-semibold text-gray-900 dark:text-white" }, " Batalkan Pesanan "),
                    createVNode(_component_UButton, {
                      color: "neutral",
                      variant: "ghost",
                      icon: "i-heroicons-x-mark",
                      onClick: handleClose
                    })
                  ])
                ]),
                footer: withCtx(() => [
                  createVNode("div", { class: "flex justify-end gap-3" }, [
                    createVNode(_component_UButton, {
                      color: "neutral",
                      variant: "ghost",
                      onClick: handleClose
                    }, {
                      default: withCtx(() => [
                        createTextVNode(" Kembali ")
                      ]),
                      _: 1
                      /* STABLE */
                    }),
                    createVNode(_component_UButton, {
                      color: "error",
                      loading: __props.loading,
                      onClick: handleConfirm
                    }, {
                      default: withCtx(() => [
                        createTextVNode(" Ya, Batalkan Pesanan ")
                      ]),
                      _: 1
                      /* STABLE */
                    }, 8, ["loading"])
                  ])
                ]),
                default: withCtx(() => [
                  createVNode("div", { class: "space-y-4" }, [
                    createVNode(_component_UAlert, {
                      color: "warning",
                      variant: "soft",
                      icon: "i-heroicons-exclamation-triangle",
                      title: "Perhatian",
                      description: "Pembatalan pesanan tidak dapat dibatalkan. Pastikan Anda sudah berkomunikasi dengan pembeli."
                    }),
                    createCommentVNode(" Order Info "),
                    createVNode("div", { class: "p-3 bg-gray-50 dark:bg-gray-900 rounded-lg" }, [
                      createVNode(
                        "p",
                        { class: "font-medium text-gray-900 dark:text-white" },
                        toDisplayString(__props.order?.orderNumber),
                        1
                        /* TEXT */
                      ),
                      createVNode(
                        "p",
                        { class: "text-sm text-gray-500 dark:text-gray-400" },
                        toDisplayString(__props.order?.customer?.name) + " • " + toDisplayString(unref(formatCurrency)(__props.order?.total || 0)),
                        1
                        /* TEXT */
                      )
                    ]),
                    createCommentVNode(" Reason Input "),
                    createVNode(_component_UFormField, { label: "Alasan Pembatalan" }, {
                      default: withCtx(() => [
                        createVNode(_component_UTextarea, {
                          modelValue: reason.value,
                          "onUpdate:modelValue": ($event) => reason.value = $event,
                          placeholder: "Masukkan alasan pembatalan (opsional)",
                          rows: 3,
                          class: "w-full"
                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                      ]),
                      _: 1
                      /* STABLE */
                    })
                  ])
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
    };
  }
});

const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("inertia/components/admin/orders/CancelModal.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main$1 as _, useOrderActions as a, _sfc_main as b, getStatusBadgeColor as g, useOrderFormatters as u };
