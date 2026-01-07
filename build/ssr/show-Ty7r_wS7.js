import { _ as _sfc_main$3 } from './Card-Ci6a5H8H.js';
import { a as _sfc_main$2 } from './Badge-DaOjA2YD.js';
import { a as _sfc_main$1 } from './Button-BBveOjhJ.js';
import { defineComponent, ref, mergeProps, unref, withCtx, createVNode, createTextVNode, toDisplayString, createBlock, createCommentVNode, openBlock, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderAttr } from 'vue/server-renderer';
import { Link } from '@inertiajs/vue3';
import { A as AdminLayout } from './admin-CGUULoJY.js';
import { _ as _sfc_main$4 } from './WithdrawalActionModal-Be1yi15q.js';
import { f as formatCurrency, b as formatDate } from './finance-BXYpuocZ.js';
import 'reka-ui';
import './virtual_nuxt-ui-plugins-BqI2j5ZJ.js';
import '@unhead/vue/client';
import 'tailwindcss/colors';
import 'hookable';
import '@vueuse/core';
import 'defu';
import 'ohash/utils';
import '@unhead/vue';
import 'reka-ui/namespaced';
import 'tailwind-variants';
import '@iconify/vue';
import 'ufo';
import './Tooltip-N44Fzd4m.js';
import './Textarea-DTaAAeeU.js';
import './FormField-BIqlRgyi.js';
import './Modal-lw8uQ47S.js';

const _sfc_main = /* @__PURE__ */ defineComponent({
  ...{
    layout: AdminLayout
  },
  __name: "show",
  __ssrInlineRender: true,
  props: {
    withdrawal: {}
  },
  setup(__props) {
    const showApproveModal = ref(false);
    const showRejectModal = ref(false);
    const getAvatarUrl = (avatar) => {
      if (!avatar) {
        return "https://placehold.co/80x80/1a1a2e/ffffff?text=U";
      }
      return avatar;
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UButton = _sfc_main$1;
      const _component_UBadge = _sfc_main$2;
      const _component_UCard = _sfc_main$3;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "p-6 max-w-4xl mx-auto space-y-6" }, _attrs))}><!-- Header --><div class="flex items-center gap-4">`);
      _push(ssrRenderComponent(unref(Link), { href: "/admin/finance/withdraw" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_UButton, {
              icon: "i-heroicons-arrow-left",
              color: "neutral",
              variant: "ghost",
              size: "sm"
            }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_UButton, {
                icon: "i-heroicons-arrow-left",
                color: "neutral",
                variant: "ghost",
                size: "sm"
              })
            ];
          }
        }),
        _: 1
        /* STABLE */
      }, _parent));
      _push(`<div class="flex-1"><h1 class="text-2xl font-bold text-gray-900 dark:text-white"> Detail Permintaan Withdraw </h1><p class="text-gray-500 dark:text-gray-400">ID: #${ssrInterpolate(__props.withdrawal.id)}</p></div>`);
      _push(ssrRenderComponent(_component_UBadge, {
        color: __props.withdrawal.statusColor,
        variant: "soft",
        size: "lg"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`${ssrInterpolate(__props.withdrawal.statusLabel)}`);
          } else {
            return [
              createTextVNode(
                toDisplayString(__props.withdrawal.statusLabel),
                1
                /* TEXT */
              )
            ];
          }
        }),
        _: 1
        /* STABLE */
      }, _parent));
      _push(`</div><!-- Customer Info -->`);
      _push(ssrRenderComponent(_component_UCard, null, {
        header: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<h3 class="font-semibold text-gray-900 dark:text-white"${_scopeId}>Informasi Customer</h3>`);
          } else {
            return [
              createVNode("h3", { class: "font-semibold text-gray-900 dark:text-white" }, "Informasi Customer")
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="flex items-start gap-6"${_scopeId}><img${ssrRenderAttr("src", getAvatarUrl(__props.withdrawal.customerAvatar))}${ssrRenderAttr("alt", __props.withdrawal.customerName)} class="w-20 h-20 rounded-full object-cover"${_scopeId}><div class="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4"${_scopeId}><div${_scopeId}><p class="text-sm text-gray-500 dark:text-gray-400"${_scopeId}>Nama</p><p class="font-medium text-gray-900 dark:text-white"${_scopeId}>${ssrInterpolate(__props.withdrawal.customerName)}</p></div><div${_scopeId}><p class="text-sm text-gray-500 dark:text-gray-400"${_scopeId}>Email</p><p class="font-medium text-gray-900 dark:text-white"${_scopeId}>${ssrInterpolate(__props.withdrawal.customerEmail)}</p></div><div${_scopeId}><p class="text-sm text-gray-500 dark:text-gray-400"${_scopeId}>Telepon</p><p class="font-medium text-gray-900 dark:text-white"${_scopeId}>${ssrInterpolate(__props.withdrawal.customerPhone || "-")}</p></div><div${_scopeId}><p class="text-sm text-gray-500 dark:text-gray-400"${_scopeId}>Saldo Wallet Saat Ini</p><p class="font-medium text-gray-900 dark:text-white"${_scopeId}>${ssrInterpolate(unref(formatCurrency)(__props.withdrawal.walletBalance))}</p></div></div></div>`);
          } else {
            return [
              createVNode("div", { class: "flex items-start gap-6" }, [
                createVNode("img", {
                  src: getAvatarUrl(__props.withdrawal.customerAvatar),
                  alt: __props.withdrawal.customerName,
                  class: "w-20 h-20 rounded-full object-cover"
                }, null, 8, ["src", "alt"]),
                createVNode("div", { class: "flex-1 grid grid-cols-1 md:grid-cols-2 gap-4" }, [
                  createVNode("div", null, [
                    createVNode("p", { class: "text-sm text-gray-500 dark:text-gray-400" }, "Nama"),
                    createVNode(
                      "p",
                      { class: "font-medium text-gray-900 dark:text-white" },
                      toDisplayString(__props.withdrawal.customerName),
                      1
                      /* TEXT */
                    )
                  ]),
                  createVNode("div", null, [
                    createVNode("p", { class: "text-sm text-gray-500 dark:text-gray-400" }, "Email"),
                    createVNode(
                      "p",
                      { class: "font-medium text-gray-900 dark:text-white" },
                      toDisplayString(__props.withdrawal.customerEmail),
                      1
                      /* TEXT */
                    )
                  ]),
                  createVNode("div", null, [
                    createVNode("p", { class: "text-sm text-gray-500 dark:text-gray-400" }, "Telepon"),
                    createVNode(
                      "p",
                      { class: "font-medium text-gray-900 dark:text-white" },
                      toDisplayString(__props.withdrawal.customerPhone || "-"),
                      1
                      /* TEXT */
                    )
                  ]),
                  createVNode("div", null, [
                    createVNode("p", { class: "text-sm text-gray-500 dark:text-gray-400" }, "Saldo Wallet Saat Ini"),
                    createVNode(
                      "p",
                      { class: "font-medium text-gray-900 dark:text-white" },
                      toDisplayString(unref(formatCurrency)(__props.withdrawal.walletBalance)),
                      1
                      /* TEXT */
                    )
                  ])
                ])
              ])
            ];
          }
        }),
        _: 1
        /* STABLE */
      }, _parent));
      _push(`<!-- Withdrawal Details -->`);
      _push(ssrRenderComponent(_component_UCard, null, {
        header: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<h3 class="font-semibold text-gray-900 dark:text-white"${_scopeId}>Detail Penarikan</h3>`);
          } else {
            return [
              createVNode("h3", { class: "font-semibold text-gray-900 dark:text-white" }, "Detail Penarikan")
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="grid grid-cols-1 md:grid-cols-2 gap-6"${_scopeId}><div class="space-y-4"${_scopeId}><div${_scopeId}><p class="text-sm text-gray-500 dark:text-gray-400"${_scopeId}>Jumlah Penarikan</p><p class="text-2xl font-bold text-gray-900 dark:text-white"${_scopeId}>${ssrInterpolate(unref(formatCurrency)(__props.withdrawal.amount))}</p></div><div${_scopeId}><p class="text-sm text-gray-500 dark:text-gray-400"${_scopeId}>Saldo Sebelum</p><p class="font-medium text-gray-900 dark:text-white"${_scopeId}>${ssrInterpolate(unref(formatCurrency)(__props.withdrawal.balanceBefore))}</p></div><div${_scopeId}><p class="text-sm text-gray-500 dark:text-gray-400"${_scopeId}>Saldo Sesudah</p><p class="font-medium text-gray-900 dark:text-white"${_scopeId}>${ssrInterpolate(unref(formatCurrency)(__props.withdrawal.balanceAfter))}</p></div></div><div class="space-y-4"${_scopeId}><div${_scopeId}><p class="text-sm text-gray-500 dark:text-gray-400"${_scopeId}>Bank</p><p class="font-medium text-gray-900 dark:text-white"${_scopeId}>${ssrInterpolate(__props.withdrawal.bankName)}</p></div><div${_scopeId}><p class="text-sm text-gray-500 dark:text-gray-400"${_scopeId}>Nomor Rekening</p><p class="font-medium text-gray-900 dark:text-white"${_scopeId}>${ssrInterpolate(__props.withdrawal.accountNumber)}</p></div><div${_scopeId}><p class="text-sm text-gray-500 dark:text-gray-400"${_scopeId}>Atas Nama</p><p class="font-medium text-gray-900 dark:text-white"${_scopeId}>${ssrInterpolate(__props.withdrawal.accountName)}</p></div></div></div>`);
          } else {
            return [
              createVNode("div", { class: "grid grid-cols-1 md:grid-cols-2 gap-6" }, [
                createVNode("div", { class: "space-y-4" }, [
                  createVNode("div", null, [
                    createVNode("p", { class: "text-sm text-gray-500 dark:text-gray-400" }, "Jumlah Penarikan"),
                    createVNode(
                      "p",
                      { class: "text-2xl font-bold text-gray-900 dark:text-white" },
                      toDisplayString(unref(formatCurrency)(__props.withdrawal.amount)),
                      1
                      /* TEXT */
                    )
                  ]),
                  createVNode("div", null, [
                    createVNode("p", { class: "text-sm text-gray-500 dark:text-gray-400" }, "Saldo Sebelum"),
                    createVNode(
                      "p",
                      { class: "font-medium text-gray-900 dark:text-white" },
                      toDisplayString(unref(formatCurrency)(__props.withdrawal.balanceBefore)),
                      1
                      /* TEXT */
                    )
                  ]),
                  createVNode("div", null, [
                    createVNode("p", { class: "text-sm text-gray-500 dark:text-gray-400" }, "Saldo Sesudah"),
                    createVNode(
                      "p",
                      { class: "font-medium text-gray-900 dark:text-white" },
                      toDisplayString(unref(formatCurrency)(__props.withdrawal.balanceAfter)),
                      1
                      /* TEXT */
                    )
                  ])
                ]),
                createVNode("div", { class: "space-y-4" }, [
                  createVNode("div", null, [
                    createVNode("p", { class: "text-sm text-gray-500 dark:text-gray-400" }, "Bank"),
                    createVNode(
                      "p",
                      { class: "font-medium text-gray-900 dark:text-white" },
                      toDisplayString(__props.withdrawal.bankName),
                      1
                      /* TEXT */
                    )
                  ]),
                  createVNode("div", null, [
                    createVNode("p", { class: "text-sm text-gray-500 dark:text-gray-400" }, "Nomor Rekening"),
                    createVNode(
                      "p",
                      { class: "font-medium text-gray-900 dark:text-white" },
                      toDisplayString(__props.withdrawal.accountNumber),
                      1
                      /* TEXT */
                    )
                  ]),
                  createVNode("div", null, [
                    createVNode("p", { class: "text-sm text-gray-500 dark:text-gray-400" }, "Atas Nama"),
                    createVNode(
                      "p",
                      { class: "font-medium text-gray-900 dark:text-white" },
                      toDisplayString(__props.withdrawal.accountName),
                      1
                      /* TEXT */
                    )
                  ])
                ])
              ])
            ];
          }
        }),
        _: 1
        /* STABLE */
      }, _parent));
      _push(`<!-- Metadata -->`);
      if (__props.withdrawal.metadata) {
        _push(ssrRenderComponent(_component_UCard, null, {
          header: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<h3 class="font-semibold text-gray-900 dark:text-white"${_scopeId}>Informasi Tambahan</h3>`);
            } else {
              return [
                createVNode("h3", { class: "font-semibold text-gray-900 dark:text-white" }, "Informasi Tambahan")
              ];
            }
          }),
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<div class="grid grid-cols-1 md:grid-cols-2 gap-4"${_scopeId}>`);
              if (__props.withdrawal.metadata.approvedAt) {
                _push2(`<div${_scopeId}><p class="text-sm text-gray-500 dark:text-gray-400"${_scopeId}>Tanggal Disetujui</p><p class="font-medium text-gray-900 dark:text-white"${_scopeId}>${ssrInterpolate(unref(formatDate)(__props.withdrawal.metadata.approvedAt))}</p></div>`);
              } else {
                _push2(`<!---->`);
              }
              if (__props.withdrawal.metadata.approvalNotes) {
                _push2(`<div${_scopeId}><p class="text-sm text-gray-500 dark:text-gray-400"${_scopeId}>Catatan</p><p class="font-medium text-gray-900 dark:text-white"${_scopeId}>${ssrInterpolate(__props.withdrawal.metadata.approvalNotes)}</p></div>`);
              } else {
                _push2(`<!---->`);
              }
              if (__props.withdrawal.metadata.rejectedAt) {
                _push2(`<div${_scopeId}><p class="text-sm text-gray-500 dark:text-gray-400"${_scopeId}>Tanggal Ditolak</p><p class="font-medium text-gray-900 dark:text-white"${_scopeId}>${ssrInterpolate(unref(formatDate)(__props.withdrawal.metadata.rejectedAt))}</p></div>`);
              } else {
                _push2(`<!---->`);
              }
              if (__props.withdrawal.metadata.rejectionReason) {
                _push2(`<div${_scopeId}><p class="text-sm text-gray-500 dark:text-gray-400"${_scopeId}>Alasan Penolakan</p><p class="font-medium text-error-600 dark:text-error-400"${_scopeId}>${ssrInterpolate(__props.withdrawal.metadata.rejectionReason)}</p></div>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div>`);
            } else {
              return [
                createVNode("div", { class: "grid grid-cols-1 md:grid-cols-2 gap-4" }, [
                  __props.withdrawal.metadata.approvedAt ? (openBlock(), createBlock("div", { key: 0 }, [
                    createVNode("p", { class: "text-sm text-gray-500 dark:text-gray-400" }, "Tanggal Disetujui"),
                    createVNode(
                      "p",
                      { class: "font-medium text-gray-900 dark:text-white" },
                      toDisplayString(unref(formatDate)(__props.withdrawal.metadata.approvedAt)),
                      1
                      /* TEXT */
                    )
                  ])) : createCommentVNode("v-if", true),
                  __props.withdrawal.metadata.approvalNotes ? (openBlock(), createBlock("div", { key: 1 }, [
                    createVNode("p", { class: "text-sm text-gray-500 dark:text-gray-400" }, "Catatan"),
                    createVNode(
                      "p",
                      { class: "font-medium text-gray-900 dark:text-white" },
                      toDisplayString(__props.withdrawal.metadata.approvalNotes),
                      1
                      /* TEXT */
                    )
                  ])) : createCommentVNode("v-if", true),
                  __props.withdrawal.metadata.rejectedAt ? (openBlock(), createBlock("div", { key: 2 }, [
                    createVNode("p", { class: "text-sm text-gray-500 dark:text-gray-400" }, "Tanggal Ditolak"),
                    createVNode(
                      "p",
                      { class: "font-medium text-gray-900 dark:text-white" },
                      toDisplayString(unref(formatDate)(__props.withdrawal.metadata.rejectedAt)),
                      1
                      /* TEXT */
                    )
                  ])) : createCommentVNode("v-if", true),
                  __props.withdrawal.metadata.rejectionReason ? (openBlock(), createBlock("div", { key: 3 }, [
                    createVNode("p", { class: "text-sm text-gray-500 dark:text-gray-400" }, "Alasan Penolakan"),
                    createVNode(
                      "p",
                      { class: "font-medium text-error-600 dark:text-error-400" },
                      toDisplayString(__props.withdrawal.metadata.rejectionReason),
                      1
                      /* TEXT */
                    )
                  ])) : createCommentVNode("v-if", true)
                ])
              ];
            }
          }),
          _: 1
          /* STABLE */
        }, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(`<!-- Timestamps -->`);
      _push(ssrRenderComponent(_component_UCard, null, {
        header: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<h3 class="font-semibold text-gray-900 dark:text-white"${_scopeId}>Waktu</h3>`);
          } else {
            return [
              createVNode("h3", { class: "font-semibold text-gray-900 dark:text-white" }, "Waktu")
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="grid grid-cols-1 md:grid-cols-2 gap-4"${_scopeId}><div${_scopeId}><p class="text-sm text-gray-500 dark:text-gray-400"${_scopeId}>Tanggal Permintaan</p><p class="font-medium text-gray-900 dark:text-white"${_scopeId}>${ssrInterpolate(unref(formatDate)(__props.withdrawal.createdAt))}</p></div><div${_scopeId}><p class="text-sm text-gray-500 dark:text-gray-400"${_scopeId}>Terakhir Diupdate</p><p class="font-medium text-gray-900 dark:text-white"${_scopeId}>${ssrInterpolate(unref(formatDate)(__props.withdrawal.updatedAt))}</p></div></div>`);
          } else {
            return [
              createVNode("div", { class: "grid grid-cols-1 md:grid-cols-2 gap-4" }, [
                createVNode("div", null, [
                  createVNode("p", { class: "text-sm text-gray-500 dark:text-gray-400" }, "Tanggal Permintaan"),
                  createVNode(
                    "p",
                    { class: "font-medium text-gray-900 dark:text-white" },
                    toDisplayString(unref(formatDate)(__props.withdrawal.createdAt)),
                    1
                    /* TEXT */
                  )
                ]),
                createVNode("div", null, [
                  createVNode("p", { class: "text-sm text-gray-500 dark:text-gray-400" }, "Terakhir Diupdate"),
                  createVNode(
                    "p",
                    { class: "font-medium text-gray-900 dark:text-white" },
                    toDisplayString(unref(formatDate)(__props.withdrawal.updatedAt)),
                    1
                    /* TEXT */
                  )
                ])
              ])
            ];
          }
        }),
        _: 1
        /* STABLE */
      }, _parent));
      _push(`<!-- Actions -->`);
      if (__props.withdrawal.status === "pending") {
        _push(`<div class="flex justify-end gap-4">`);
        _push(ssrRenderComponent(_component_UButton, {
          color: "error",
          variant: "soft",
          icon: "i-heroicons-x-mark",
          onClick: ($event) => showRejectModal.value = true
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(` Tolak `);
            } else {
              return [
                createTextVNode(" Tolak ")
              ];
            }
          }),
          _: 1
          /* STABLE */
        }, _parent));
        _push(ssrRenderComponent(_component_UButton, {
          color: "success",
          icon: "i-heroicons-check",
          onClick: ($event) => showApproveModal.value = true
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(` Setujui `);
            } else {
              return [
                createTextVNode(" Setujui ")
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
      _push(`<!-- Modals -->`);
      _push(ssrRenderComponent(_sfc_main$4, {
        modelValue: showApproveModal.value,
        "onUpdate:modelValue": ($event) => showApproveModal.value = $event,
        withdrawal: __props.withdrawal,
        type: "approve"
      }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$4, {
        modelValue: showRejectModal.value,
        "onUpdate:modelValue": ($event) => showRejectModal.value = $event,
        withdrawal: __props.withdrawal,
        type: "reject"
      }, null, _parent));
      _push(`</div>`);
    };
  }
});

const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("inertia/pages/admin/finance/withdraw/show.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
