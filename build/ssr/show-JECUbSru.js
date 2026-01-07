import { _ as _sfc_main$4 } from './Modal-lw8uQ47S.js';
import { a as _sfc_main$3, u as useToast } from './Badge-DaOjA2YD.js';
import { _ as _sfc_main$1, a as _sfc_main$2 } from './Button-BBveOjhJ.js';
import { defineComponent, ref, mergeProps, unref, withCtx, createVNode, createTextVNode, toDisplayString, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderAttr, ssrInterpolate, ssrRenderList } from 'vue/server-renderer';
import { Link, router } from '@inertiajs/vue3';
import { A as AdminLayout } from './admin-CGUULoJY.js';
import 'reka-ui';
import '@vueuse/core';
import './virtual_nuxt-ui-plugins-BqI2j5ZJ.js';
import '@unhead/vue/client';
import 'tailwindcss/colors';
import 'hookable';
import 'defu';
import 'ohash/utils';
import '@unhead/vue';
import 'reka-ui/namespaced';
import 'tailwind-variants';
import '@iconify/vue';
import 'ufo';
import './Tooltip-N44Fzd4m.js';

const _sfc_main = /* @__PURE__ */ defineComponent({
  ...{
    layout: AdminLayout
  },
  __name: "show",
  __ssrInlineRender: true,
  props: {
    customer: {}
  },
  setup(__props) {
    const props = __props;
    const toast = useToast();
    const deleteModalOpen = ref(false);
    const formatDate = (date) => {
      return new Date(date).toLocaleDateString("id-ID", {
        year: "numeric",
        month: "long",
        day: "numeric"
      });
    };
    const formatDateTime = (date) => {
      return new Date(date).toLocaleDateString("id-ID", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit"
      });
    };
    const formatCurrency = (amount) => {
      return new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        minimumFractionDigits: 0
      }).format(amount);
    };
    const getOrderStatusColor = (status) => {
      const colors = {
        pending: "warning",
        paid: "primary",
        processing: "info",
        shipped: "info",
        delivered: "success",
        cancelled: "error",
        refunded: "neutral"
      };
      return colors[status] || "neutral";
    };
    const getOrderStatusLabel = (status) => {
      const labels = {
        pending: "Menunggu Pembayaran",
        paid: "Sudah Dibayar",
        processing: "Diproses",
        shipped: "Dikirim",
        delivered: "Selesai",
        cancelled: "Dibatalkan",
        refunded: "Dikembalikan"
      };
      return labels[status] || status;
    };
    const toggleActive = () => {
      router.patch(`/admin/customers/${props.customer.id}/active`, {}, {
        preserveScroll: true,
        onSuccess: () => {
          toast.success(`Pelanggan berhasil di${props.customer.isActive ? "nonaktifkan" : "aktifkan"}`);
        },
        onError: () => {
          toast.error("Gagal mengubah status pelanggan");
        }
      });
    };
    const toggleVerified = () => {
      router.patch(`/admin/customers/${props.customer.id}/verified`, {}, {
        preserveScroll: true,
        onSuccess: () => {
          toast.success(`Status verifikasi berhasil diubah`);
        },
        onError: () => {
          toast.error("Gagal mengubah status verifikasi");
        }
      });
    };
    const confirmDelete = () => {
      router.delete(`/admin/customers/${props.customer.id}`, {
        onSuccess: () => {
          toast.success("Pelanggan berhasil dihapus");
        },
        onError: () => {
          toast.error("Gagal menghapus pelanggan");
        }
      });
    };
    const impersonateCustomer = () => {
      if (!props.customer.isActive) {
        toast.error("Tidak dapat login sebagai customer yang tidak aktif");
        return;
      }
      router.post(`/admin/customers/${props.customer.id}/impersonate`, {}, {
        onSuccess: () => {
          toast.success(`Anda sekarang login sebagai ${props.customer.fullName}`);
        },
        onError: () => {
          toast.error("Gagal login sebagai customer");
        }
      });
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UIcon = _sfc_main$1;
      const _component_UButton = _sfc_main$2;
      const _component_UBadge = _sfc_main$3;
      const _component_UModal = _sfc_main$4;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "space-y-6" }, _attrs))}><!-- Page Header --><div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"><div class="flex items-center gap-4">`);
      _push(ssrRenderComponent(unref(Link), {
        href: "/admin/customers",
        class: "w-10 h-10 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_UIcon, {
              name: "i-heroicons-arrow-left",
              class: "w-5 h-5 text-slate-600 dark:text-slate-400"
            }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_UIcon, {
                name: "i-heroicons-arrow-left",
                class: "w-5 h-5 text-slate-600 dark:text-slate-400"
              })
            ];
          }
        }),
        _: 1
        /* STABLE */
      }, _parent));
      _push(`<div><h1 class="text-2xl font-bold text-gray-900 dark:text-white">Detail Pelanggan</h1><p class="text-gray-500 dark:text-gray-400"> Informasi lengkap pelanggan </p></div></div><div class="flex gap-2">`);
      _push(ssrRenderComponent(_component_UButton, {
        icon: "i-heroicons-user-circle",
        color: "primary",
        disabled: !props.customer.isActive,
        onClick: impersonateCustomer
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` Login sebagai Customer `);
          } else {
            return [
              createTextVNode(" Login sebagai Customer ")
            ];
          }
        }),
        _: 1
        /* STABLE */
      }, _parent));
      _push(ssrRenderComponent(_component_UButton, {
        icon: "i-heroicons-pencil-square",
        color: "primary",
        variant: "outline",
        to: `/admin/customers/${props.customer.id}/edit`
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` Edit `);
          } else {
            return [
              createTextVNode(" Edit ")
            ];
          }
        }),
        _: 1
        /* STABLE */
      }, _parent));
      _push(ssrRenderComponent(_component_UButton, {
        icon: "i-heroicons-trash",
        color: "error",
        variant: "outline",
        onClick: ($event) => deleteModalOpen.value = true
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` Hapus `);
          } else {
            return [
              createTextVNode(" Hapus ")
            ];
          }
        }),
        _: 1
        /* STABLE */
      }, _parent));
      _push(`</div></div><div class="grid grid-cols-1 lg:grid-cols-3 gap-6"><!-- Left Column - Customer Info --><div class="lg:col-span-2 space-y-6"><!-- Customer Info Card --><div class="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden"><!-- Header with Avatar --><div class="bg-linear-to-r from-violet-500 to-purple-600 px-6 py-8"><div class="flex items-center gap-4"><div class="w-20 h-20 rounded-full bg-white/20 flex items-center justify-center overflow-hidden">`);
      if (props.customer.avatar) {
        _push(`<img${ssrRenderAttr("src", props.customer.avatar)}${ssrRenderAttr("alt", props.customer.fullName)} class="w-full h-full object-cover">`);
      } else {
        _push(ssrRenderComponent(_component_UIcon, {
          name: "i-heroicons-user",
          class: "w-10 h-10 text-white"
        }, null, _parent));
      }
      _push(`</div><div><h2 class="text-2xl font-bold text-white">${ssrInterpolate(props.customer.fullName)}</h2><p class="text-white/80">${ssrInterpolate(props.customer.email)}</p><div class="flex gap-2 mt-2">`);
      _push(ssrRenderComponent(_component_UBadge, {
        color: props.customer.isActive ? "success" : "error"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`${ssrInterpolate(props.customer.isActive ? "Aktif" : "Tidak Aktif")}`);
          } else {
            return [
              createTextVNode(
                toDisplayString(props.customer.isActive ? "Aktif" : "Tidak Aktif"),
                1
                /* TEXT */
              )
            ];
          }
        }),
        _: 1
        /* STABLE */
      }, _parent));
      _push(ssrRenderComponent(_component_UBadge, {
        color: props.customer.isVerified ? "primary" : "neutral"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`${ssrInterpolate(props.customer.isVerified ? "Terverifikasi" : "Belum Verifikasi")}`);
          } else {
            return [
              createTextVNode(
                toDisplayString(props.customer.isVerified ? "Terverifikasi" : "Belum Verifikasi"),
                1
                /* TEXT */
              )
            ];
          }
        }),
        _: 1
        /* STABLE */
      }, _parent));
      _push(`</div></div></div></div><!-- Details --><div class="p-6"><h3 class="text-lg font-semibold text-slate-900 dark:text-white mb-4"> Informasi Pelanggan </h3><div class="grid grid-cols-1 md:grid-cols-2 gap-6"><div class="space-y-4"><div><label class="block text-sm text-slate-500 dark:text-slate-400">ID</label><p class="text-slate-900 dark:text-white font-medium">#${ssrInterpolate(props.customer.id)}</p></div><div><label class="block text-sm text-slate-500 dark:text-slate-400">Nama Lengkap</label><p class="text-slate-900 dark:text-white font-medium">${ssrInterpolate(props.customer.fullName)}</p></div><div><label class="block text-sm text-slate-500 dark:text-slate-400">Email</label><p class="text-slate-900 dark:text-white font-medium">${ssrInterpolate(props.customer.email)}</p></div><div><label class="block text-sm text-slate-500 dark:text-slate-400">Telepon</label><p class="text-slate-900 dark:text-white font-medium">${ssrInterpolate(props.customer.phone || "-")}</p></div></div><div class="space-y-4"><div><label class="block text-sm text-slate-500 dark:text-slate-400">Gender</label><p class="text-slate-900 dark:text-white font-medium">${ssrInterpolate(props.customer.gender === "male" ? "Laki-laki" : props.customer.gender === "female" ? "Perempuan" : "-")}</p></div><div><label class="block text-sm text-slate-500 dark:text-slate-400">Tanggal Lahir</label><p class="text-slate-900 dark:text-white font-medium">${ssrInterpolate(props.customer.birthDate ? formatDate(props.customer.birthDate) : "-")}</p></div><div><label class="block text-sm text-slate-500 dark:text-slate-400">Tanggal Bergabung</label><p class="text-slate-900 dark:text-white font-medium">${ssrInterpolate(formatDateTime(props.customer.createdAt))}</p></div>`);
      if (props.customer.referredByCode) {
        _push(`<div><label class="block text-sm text-slate-500 dark:text-slate-400">Kode Referral</label><p class="text-slate-900 dark:text-white font-medium">${ssrInterpolate(props.customer.referredByCode)}</p></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div></div></div><!-- Recent Orders --><div class="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden"><div class="p-4 border-b border-slate-200 dark:border-slate-800"><h3 class="text-lg font-semibold text-slate-900 dark:text-white">Pesanan Terakhir</h3></div>`);
      if (props.customer.orders && props.customer.orders.length > 0) {
        _push(`<div class="divide-y divide-slate-200 dark:divide-slate-800"><!--[-->`);
        ssrRenderList(props.customer.orders, (order) => {
          _push(`<div class="p-4 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"><div class="flex items-center justify-between"><div>`);
          _push(ssrRenderComponent(unref(Link), {
            href: `/admin/orders/${order.id}`,
            class: "font-medium text-violet-600 hover:text-violet-700 dark:text-violet-400"
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`${ssrInterpolate(order.orderNumber)}`);
              } else {
                return [
                  createTextVNode(
                    toDisplayString(order.orderNumber),
                    1
                    /* TEXT */
                  )
                ];
              }
            }),
            _: 2
            /* DYNAMIC */
          }, _parent));
          _push(`<p class="text-sm text-slate-500 dark:text-slate-400">${ssrInterpolate(formatDate(order.createdAt))}</p></div><div class="text-right"><p class="font-medium text-slate-900 dark:text-white">${ssrInterpolate(formatCurrency(order.total))}</p>`);
          _push(ssrRenderComponent(_component_UBadge, {
            color: getOrderStatusColor(order.status),
            variant: "subtle",
            size: "xs"
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`${ssrInterpolate(getOrderStatusLabel(order.status))}`);
              } else {
                return [
                  createTextVNode(
                    toDisplayString(getOrderStatusLabel(order.status)),
                    1
                    /* TEXT */
                  )
                ];
              }
            }),
            _: 2
            /* DYNAMIC */
          }, _parent));
          _push(`</div></div></div>`);
        });
        _push(`<!--]--></div>`);
      } else {
        _push(`<div class="p-8 text-center">`);
        _push(ssrRenderComponent(_component_UIcon, {
          name: "i-heroicons-shopping-cart",
          class: "w-12 h-12 text-slate-300 dark:text-slate-600 mx-auto mb-4"
        }, null, _parent));
        _push(`<p class="text-slate-500 dark:text-slate-400">Belum ada pesanan</p></div>`);
      }
      _push(`</div><!-- Addresses --><div class="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden"><div class="p-4 border-b border-slate-200 dark:border-slate-800"><h3 class="text-lg font-semibold text-slate-900 dark:text-white">Alamat</h3></div>`);
      if (props.customer.addresses && props.customer.addresses.length > 0) {
        _push(`<div class="divide-y divide-slate-200 dark:divide-slate-800"><!--[-->`);
        ssrRenderList(props.customer.addresses, (address) => {
          _push(`<div class="p-4"><div class="flex items-start justify-between"><div><div class="flex items-center gap-2 mb-1"><p class="font-medium text-slate-900 dark:text-white">${ssrInterpolate(address.label)}</p>`);
          if (address.isDefault) {
            _push(ssrRenderComponent(_component_UBadge, {
              color: "primary",
              variant: "subtle",
              size: "xs"
            }, {
              default: withCtx((_, _push2, _parent2, _scopeId) => {
                if (_push2) {
                  _push2(` Utama `);
                } else {
                  return [
                    createTextVNode(" Utama ")
                  ];
                }
              }),
              _: 2
              /* DYNAMIC */
            }, _parent));
          } else {
            _push(`<!---->`);
          }
          _push(`</div><p class="text-sm text-slate-600 dark:text-slate-400">${ssrInterpolate(address.recipientName)} - ${ssrInterpolate(address.phone)}</p><p class="text-sm text-slate-500 dark:text-slate-400 mt-1">${ssrInterpolate(address.fullAddress)}, ${ssrInterpolate(address.district)}, ${ssrInterpolate(address.city)}, ${ssrInterpolate(address.province)} ${ssrInterpolate(address.postalCode)}</p></div></div></div>`);
        });
        _push(`<!--]--></div>`);
      } else {
        _push(`<div class="p-8 text-center">`);
        _push(ssrRenderComponent(_component_UIcon, {
          name: "i-heroicons-map-pin",
          class: "w-12 h-12 text-slate-300 dark:text-slate-600 mx-auto mb-4"
        }, null, _parent));
        _push(`<p class="text-slate-500 dark:text-slate-400">Belum ada alamat tersimpan</p></div>`);
      }
      _push(`</div></div><!-- Right Column - Stats & Actions --><div class="space-y-6"><!-- Stats Card --><div class="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6"><h3 class="text-lg font-semibold text-slate-900 dark:text-white mb-4">Statistik</h3><div class="space-y-4"><div class="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-800/50 rounded-lg"><div class="flex items-center gap-3"><div class="w-10 h-10 rounded-lg bg-violet-500/10 flex items-center justify-center">`);
      _push(ssrRenderComponent(_component_UIcon, {
        name: "i-heroicons-shopping-cart",
        class: "w-5 h-5 text-violet-500"
      }, null, _parent));
      _push(`</div><span class="text-slate-600 dark:text-slate-400">Total Pesanan</span></div><span class="font-bold text-slate-900 dark:text-white">${ssrInterpolate(props.customer.totalOrdersCount)}</span></div><div class="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-800/50 rounded-lg"><div class="flex items-center gap-3"><div class="w-10 h-10 rounded-lg bg-emerald-500/10 flex items-center justify-center">`);
      _push(ssrRenderComponent(_component_UIcon, {
        name: "i-heroicons-banknotes",
        class: "w-5 h-5 text-emerald-500"
      }, null, _parent));
      _push(`</div><span class="text-slate-600 dark:text-slate-400">Total Belanja</span></div><span class="font-bold text-emerald-600 dark:text-emerald-400">${ssrInterpolate(formatCurrency(props.customer.totalSpent))}</span></div>`);
      if (props.customer.wallet) {
        _push(`<div class="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-800/50 rounded-lg"><div class="flex items-center gap-3"><div class="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center">`);
        _push(ssrRenderComponent(_component_UIcon, {
          name: "i-heroicons-wallet",
          class: "w-5 h-5 text-blue-500"
        }, null, _parent));
        _push(`</div><span class="text-slate-600 dark:text-slate-400">Saldo Wallet</span></div><span class="font-bold text-blue-600 dark:text-blue-400">${ssrInterpolate(formatCurrency(props.customer.wallet.balance))}</span></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-800/50 rounded-lg"><div class="flex items-center gap-3"><div class="w-10 h-10 rounded-lg bg-amber-500/10 flex items-center justify-center">`);
      _push(ssrRenderComponent(_component_UIcon, {
        name: "i-heroicons-star",
        class: "w-5 h-5 text-amber-500"
      }, null, _parent));
      _push(`</div><span class="text-slate-600 dark:text-slate-400">Total Review</span></div><span class="font-bold text-slate-900 dark:text-white">${ssrInterpolate(props.customer.reviews?.length || 0)}</span></div></div></div><!-- Quick Actions --><div class="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6"><h3 class="text-lg font-semibold text-slate-900 dark:text-white mb-4">Aksi Cepat</h3><div class="space-y-3">`);
      _push(ssrRenderComponent(_component_UButton, {
        icon: props.customer.isActive ? "i-heroicons-x-circle" : "i-heroicons-check-circle",
        color: props.customer.isActive ? "warning" : "success",
        variant: "soft",
        block: "",
        onClick: toggleActive
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`${ssrInterpolate(props.customer.isActive ? "Nonaktifkan Akun" : "Aktifkan Akun")}`);
          } else {
            return [
              createTextVNode(
                toDisplayString(props.customer.isActive ? "Nonaktifkan Akun" : "Aktifkan Akun"),
                1
                /* TEXT */
              )
            ];
          }
        }),
        _: 1
        /* STABLE */
      }, _parent));
      _push(ssrRenderComponent(_component_UButton, {
        icon: props.customer.isVerified ? "i-heroicons-shield-exclamation" : "i-heroicons-shield-check",
        color: props.customer.isVerified ? "neutral" : "primary",
        variant: "soft",
        block: "",
        onClick: toggleVerified
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`${ssrInterpolate(props.customer.isVerified ? "Batalkan Verifikasi" : "Verifikasi Email")}`);
          } else {
            return [
              createTextVNode(
                toDisplayString(props.customer.isVerified ? "Batalkan Verifikasi" : "Verifikasi Email"),
                1
                /* TEXT */
              )
            ];
          }
        }),
        _: 1
        /* STABLE */
      }, _parent));
      _push(`</div></div></div></div><!-- Delete Modal -->`);
      _push(ssrRenderComponent(_component_UModal, {
        open: deleteModalOpen.value,
        "onUpdate:open": ($event) => deleteModalOpen.value = $event,
        ui: { overlay: "z-[100]", content: "z-[100]" }
      }, {
        content: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="p-6 max-h-[85vh] overflow-y-auto"${_scopeId}><div class="flex items-center gap-4 mb-4"${_scopeId}><div class="w-12 h-12 rounded-full bg-red-100 dark:bg-red-500/20 flex items-center justify-center"${_scopeId}>`);
            _push2(ssrRenderComponent(_component_UIcon, {
              name: "i-heroicons-exclamation-triangle",
              class: "w-6 h-6 text-red-500"
            }, null, _parent2, _scopeId));
            _push2(`</div><div${_scopeId}><h3 class="text-lg font-semibold text-slate-900 dark:text-white"${_scopeId}>Hapus Pelanggan</h3><p class="text-slate-500 dark:text-slate-400"${_scopeId}> Apakah Anda yakin ingin menghapus <strong${_scopeId}>${ssrInterpolate(props.customer.fullName)}</strong>? </p></div></div><p class="text-sm text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-500/10 p-3 rounded-lg mb-4"${_scopeId}>`);
            _push2(ssrRenderComponent(_component_UIcon, {
              name: "i-heroicons-exclamation-triangle",
              class: "w-4 h-4 inline mr-1"
            }, null, _parent2, _scopeId));
            _push2(` Pelanggan dengan riwayat pesanan tidak dapat dihapus. </p><div class="flex justify-end gap-3"${_scopeId}>`);
            _push2(ssrRenderComponent(_component_UButton, {
              color: "neutral",
              variant: "outline",
              onClick: ($event) => deleteModalOpen.value = false
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Batal `);
                } else {
                  return [
                    createTextVNode(" Batal ")
                  ];
                }
              }),
              _: 1
              /* STABLE */
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_UButton, {
              color: "error",
              onClick: confirmDelete
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Hapus `);
                } else {
                  return [
                    createTextVNode(" Hapus ")
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
                  createVNode("div", { class: "w-12 h-12 rounded-full bg-red-100 dark:bg-red-500/20 flex items-center justify-center" }, [
                    createVNode(_component_UIcon, {
                      name: "i-heroicons-exclamation-triangle",
                      class: "w-6 h-6 text-red-500"
                    })
                  ]),
                  createVNode("div", null, [
                    createVNode("h3", { class: "text-lg font-semibold text-slate-900 dark:text-white" }, "Hapus Pelanggan"),
                    createVNode("p", { class: "text-slate-500 dark:text-slate-400" }, [
                      createTextVNode(" Apakah Anda yakin ingin menghapus "),
                      createVNode(
                        "strong",
                        null,
                        toDisplayString(props.customer.fullName),
                        1
                        /* TEXT */
                      ),
                      createTextVNode("? ")
                    ])
                  ])
                ]),
                createVNode("p", { class: "text-sm text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-500/10 p-3 rounded-lg mb-4" }, [
                  createVNode(_component_UIcon, {
                    name: "i-heroicons-exclamation-triangle",
                    class: "w-4 h-4 inline mr-1"
                  }),
                  createTextVNode(" Pelanggan dengan riwayat pesanan tidak dapat dihapus. ")
                ]),
                createVNode("div", { class: "flex justify-end gap-3" }, [
                  createVNode(_component_UButton, {
                    color: "neutral",
                    variant: "outline",
                    onClick: ($event) => deleteModalOpen.value = false
                  }, {
                    default: withCtx(() => [
                      createTextVNode(" Batal ")
                    ]),
                    _: 1
                    /* STABLE */
                  }, 8, ["onClick"]),
                  createVNode(_component_UButton, {
                    color: "error",
                    onClick: confirmDelete
                  }, {
                    default: withCtx(() => [
                      createTextVNode(" Hapus ")
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
      _push(`</div>`);
    };
  }
});

const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("inertia/pages/admin/customers/show.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
