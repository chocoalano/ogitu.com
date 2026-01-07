import { _ as _sfc_main$5, a as _sfc_main$6 } from './Button-BBveOjhJ.js';
import { _ as _sfc_main$4 } from './Textarea-DTaAAeeU.js';
import { _ as _sfc_main$3 } from './FormField-BIqlRgyi.js';
import { _ as _sfc_main$2 } from './Card-Ci6a5H8H.js';
import { _ as _sfc_main$1 } from './Modal-lw8uQ47S.js';
import { defineComponent, mergeModels, useModel, ref, mergeProps, withCtx, unref, createBlock, openBlock, createCommentVNode, createVNode, toDisplayString, createTextVNode, useSSRContext } from 'vue';
import { ssrRenderComponent, ssrInterpolate, ssrRenderClass } from 'vue/server-renderer';
import { router } from '@inertiajs/vue3';
import { f as formatCurrency } from './finance-BXYpuocZ.js';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "WithdrawalActionModal",
  __ssrInlineRender: true,
  props: /* @__PURE__ */ mergeModels({
    withdrawal: {},
    type: {}
  }, {
    "modelValue": { type: Boolean, ...{ default: false } },
    "modelModifiers": {}
  }),
  emits: ["update:modelValue"],
  setup(__props) {
    const props = __props;
    const isOpen = useModel(__props, "modelValue");
    const isProcessing = ref(false);
    const notes = ref("");
    const reason = ref("");
    const handleConfirm = () => {
      if (!props.withdrawal) return;
      isProcessing.value = true;
      if (props.type === "approve") {
        router.post(
          `/admin/finance/withdraw/${props.withdrawal.id}/approve`,
          { notes: notes.value },
          {
            onFinish: () => {
              isProcessing.value = false;
              isOpen.value = false;
              notes.value = "";
            }
          }
        );
      } else {
        router.post(
          `/admin/finance/withdraw/${props.withdrawal.id}/reject`,
          { reason: reason.value || "Ditolak oleh admin" },
          {
            onFinish: () => {
              isProcessing.value = false;
              isOpen.value = false;
              reason.value = "";
            }
          }
        );
      }
    };
    const handleClose = () => {
      isOpen.value = false;
      notes.value = "";
      reason.value = "";
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UModal = _sfc_main$1;
      const _component_UCard = _sfc_main$2;
      const _component_UIcon = _sfc_main$5;
      const _component_UFormField = _sfc_main$3;
      const _component_UTextarea = _sfc_main$4;
      const _component_UButton = _sfc_main$6;
      _push(ssrRenderComponent(_component_UModal, mergeProps({
        open: isOpen.value,
        "onUpdate:open": ($event) => isOpen.value = $event,
        ui: { overlay: "z-[100]", content: "z-[100]" }
      }, _attrs), {
        content: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_UCard, { class: "max-h-[85vh] overflow-y-auto" }, {
              header: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="flex items-center gap-3"${_scopeId2}><div class="${ssrRenderClass([
                    "p-2 rounded-lg",
                    __props.type === "approve" ? "bg-success-100 dark:bg-success-900/30" : "bg-error-100 dark:bg-error-900/30"
                  ])}"${_scopeId2}>`);
                  _push3(ssrRenderComponent(_component_UIcon, {
                    name: __props.type === "approve" ? "i-heroicons-check-circle" : "i-heroicons-x-circle",
                    class: [
                      "w-5 h-5",
                      __props.type === "approve" ? "text-success-600 dark:text-success-400" : "text-error-600 dark:text-error-400"
                    ]
                  }, null, _parent3, _scopeId2));
                  _push3(`</div><div${_scopeId2}><h3 class="font-semibold text-gray-900 dark:text-white"${_scopeId2}>${ssrInterpolate(__props.type === "approve" ? "Setujui Permintaan Withdraw" : "Tolak Permintaan Withdraw")}</h3><p class="text-sm text-gray-500 dark:text-gray-400"${_scopeId2}>${ssrInterpolate(__props.withdrawal?.customerName)}</p></div></div>`);
                } else {
                  return [
                    createVNode("div", { class: "flex items-center gap-3" }, [
                      createVNode(
                        "div",
                        {
                          class: [
                            "p-2 rounded-lg",
                            __props.type === "approve" ? "bg-success-100 dark:bg-success-900/30" : "bg-error-100 dark:bg-error-900/30"
                          ]
                        },
                        [
                          createVNode(_component_UIcon, {
                            name: __props.type === "approve" ? "i-heroicons-check-circle" : "i-heroicons-x-circle",
                            class: [
                              "w-5 h-5",
                              __props.type === "approve" ? "text-success-600 dark:text-success-400" : "text-error-600 dark:text-error-400"
                            ]
                          }, null, 8, ["name", "class"])
                        ],
                        2
                        /* CLASS */
                      ),
                      createVNode("div", null, [
                        createVNode(
                          "h3",
                          { class: "font-semibold text-gray-900 dark:text-white" },
                          toDisplayString(__props.type === "approve" ? "Setujui Permintaan Withdraw" : "Tolak Permintaan Withdraw"),
                          1
                          /* TEXT */
                        ),
                        createVNode(
                          "p",
                          { class: "text-sm text-gray-500 dark:text-gray-400" },
                          toDisplayString(__props.withdrawal?.customerName),
                          1
                          /* TEXT */
                        )
                      ])
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
                    disabled: isProcessing.value,
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
                    color: __props.type === "approve" ? "success" : "error",
                    loading: isProcessing.value,
                    onClick: handleConfirm
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`${ssrInterpolate(__props.type === "approve" ? "Setujui" : "Tolak")}`);
                      } else {
                        return [
                          createTextVNode(
                            toDisplayString(__props.type === "approve" ? "Setujui" : "Tolak"),
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
                        disabled: isProcessing.value,
                        onClick: handleClose
                      }, {
                        default: withCtx(() => [
                          createTextVNode(" Batal ")
                        ]),
                        _: 1
                        /* STABLE */
                      }, 8, ["disabled"]),
                      createVNode(_component_UButton, {
                        color: __props.type === "approve" ? "success" : "error",
                        loading: isProcessing.value,
                        onClick: handleConfirm
                      }, {
                        default: withCtx(() => [
                          createTextVNode(
                            toDisplayString(__props.type === "approve" ? "Setujui" : "Tolak"),
                            1
                            /* TEXT */
                          )
                        ]),
                        _: 1
                        /* STABLE */
                      }, 8, ["color", "loading"])
                    ])
                  ];
                }
              }),
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  if (__props.withdrawal) {
                    _push3(`<div class="space-y-4"${_scopeId2}><!-- Withdrawal Info --><div class="p-4 rounded-lg bg-gray-50 dark:bg-gray-800/50"${_scopeId2}><div class="grid grid-cols-2 gap-4 text-sm"${_scopeId2}><div${_scopeId2}><p class="text-gray-500 dark:text-gray-400"${_scopeId2}>Jumlah</p><p class="font-bold text-lg text-gray-900 dark:text-white"${_scopeId2}>${ssrInterpolate(unref(formatCurrency)(__props.withdrawal.amount))}</p></div><div${_scopeId2}><p class="text-gray-500 dark:text-gray-400"${_scopeId2}>Bank</p><p class="font-medium text-gray-900 dark:text-white"${_scopeId2}>${ssrInterpolate(__props.withdrawal.bankName)}</p></div><div${_scopeId2}><p class="text-gray-500 dark:text-gray-400"${_scopeId2}>Nomor Rekening</p><p class="font-medium text-gray-900 dark:text-white"${_scopeId2}>${ssrInterpolate(__props.withdrawal.accountNumber)}</p></div><div${_scopeId2}><p class="text-gray-500 dark:text-gray-400"${_scopeId2}>Atas Nama</p><p class="font-medium text-gray-900 dark:text-white"${_scopeId2}>${ssrInterpolate(__props.withdrawal.accountName)}</p></div></div></div><!-- Notes/Reason Input -->`);
                    _push3(ssrRenderComponent(_component_UFormField, {
                      label: __props.type === "approve" ? "Catatan (Opsional)" : "Alasan Penolakan",
                      required: __props.type === "reject"
                    }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          if (__props.type === "approve") {
                            _push4(ssrRenderComponent(_component_UTextarea, {
                              modelValue: notes.value,
                              "onUpdate:modelValue": ($event) => notes.value = $event,
                              placeholder: "Tambahkan catatan jika diperlukan...",
                              rows: 3
                            }, null, _parent4, _scopeId3));
                          } else {
                            _push4(ssrRenderComponent(_component_UTextarea, {
                              modelValue: reason.value,
                              "onUpdate:modelValue": ($event) => reason.value = $event,
                              placeholder: "Masukkan alasan penolakan...",
                              rows: 3
                            }, null, _parent4, _scopeId3));
                          }
                        } else {
                          return [
                            __props.type === "approve" ? (openBlock(), createBlock(_component_UTextarea, {
                              key: 0,
                              modelValue: notes.value,
                              "onUpdate:modelValue": ($event) => notes.value = $event,
                              placeholder: "Tambahkan catatan jika diperlukan...",
                              rows: 3
                            }, null, 8, ["modelValue", "onUpdate:modelValue"])) : (openBlock(), createBlock(_component_UTextarea, {
                              key: 1,
                              modelValue: reason.value,
                              "onUpdate:modelValue": ($event) => reason.value = $event,
                              placeholder: "Masukkan alasan penolakan...",
                              rows: 3
                            }, null, 8, ["modelValue", "onUpdate:modelValue"]))
                          ];
                        }
                      }),
                      _: 1
                      /* STABLE */
                    }, _parent3, _scopeId2));
                    _push3(`<!-- Warning for reject -->`);
                    if (__props.type === "reject") {
                      _push3(`<div class="p-3 rounded-lg bg-warning-50 dark:bg-warning-900/20 text-warning-700 dark:text-warning-300 text-sm"${_scopeId2}><div class="flex items-start gap-2"${_scopeId2}>`);
                      _push3(ssrRenderComponent(_component_UIcon, {
                        name: "i-heroicons-exclamation-triangle",
                        class: "w-5 h-5 shrink-0 mt-0.5"
                      }, null, _parent3, _scopeId2));
                      _push3(`<p${_scopeId2}> Saldo sebesar ${ssrInterpolate(unref(formatCurrency)(__props.withdrawal.amount))} akan dikembalikan ke wallet customer. </p></div></div>`);
                    } else {
                      _push3(`<!---->`);
                    }
                    _push3(`</div>`);
                  } else {
                    _push3(`<!---->`);
                  }
                } else {
                  return [
                    __props.withdrawal ? (openBlock(), createBlock("div", {
                      key: 0,
                      class: "space-y-4"
                    }, [
                      createCommentVNode(" Withdrawal Info "),
                      createVNode("div", { class: "p-4 rounded-lg bg-gray-50 dark:bg-gray-800/50" }, [
                        createVNode("div", { class: "grid grid-cols-2 gap-4 text-sm" }, [
                          createVNode("div", null, [
                            createVNode("p", { class: "text-gray-500 dark:text-gray-400" }, "Jumlah"),
                            createVNode(
                              "p",
                              { class: "font-bold text-lg text-gray-900 dark:text-white" },
                              toDisplayString(unref(formatCurrency)(__props.withdrawal.amount)),
                              1
                              /* TEXT */
                            )
                          ]),
                          createVNode("div", null, [
                            createVNode("p", { class: "text-gray-500 dark:text-gray-400" }, "Bank"),
                            createVNode(
                              "p",
                              { class: "font-medium text-gray-900 dark:text-white" },
                              toDisplayString(__props.withdrawal.bankName),
                              1
                              /* TEXT */
                            )
                          ]),
                          createVNode("div", null, [
                            createVNode("p", { class: "text-gray-500 dark:text-gray-400" }, "Nomor Rekening"),
                            createVNode(
                              "p",
                              { class: "font-medium text-gray-900 dark:text-white" },
                              toDisplayString(__props.withdrawal.accountNumber),
                              1
                              /* TEXT */
                            )
                          ]),
                          createVNode("div", null, [
                            createVNode("p", { class: "text-gray-500 dark:text-gray-400" }, "Atas Nama"),
                            createVNode(
                              "p",
                              { class: "font-medium text-gray-900 dark:text-white" },
                              toDisplayString(__props.withdrawal.accountName),
                              1
                              /* TEXT */
                            )
                          ])
                        ])
                      ]),
                      createCommentVNode(" Notes/Reason Input "),
                      createVNode(_component_UFormField, {
                        label: __props.type === "approve" ? "Catatan (Opsional)" : "Alasan Penolakan",
                        required: __props.type === "reject"
                      }, {
                        default: withCtx(() => [
                          __props.type === "approve" ? (openBlock(), createBlock(_component_UTextarea, {
                            key: 0,
                            modelValue: notes.value,
                            "onUpdate:modelValue": ($event) => notes.value = $event,
                            placeholder: "Tambahkan catatan jika diperlukan...",
                            rows: 3
                          }, null, 8, ["modelValue", "onUpdate:modelValue"])) : (openBlock(), createBlock(_component_UTextarea, {
                            key: 1,
                            modelValue: reason.value,
                            "onUpdate:modelValue": ($event) => reason.value = $event,
                            placeholder: "Masukkan alasan penolakan...",
                            rows: 3
                          }, null, 8, ["modelValue", "onUpdate:modelValue"]))
                        ]),
                        _: 1
                        /* STABLE */
                      }, 8, ["label", "required"]),
                      createCommentVNode(" Warning for reject "),
                      __props.type === "reject" ? (openBlock(), createBlock("div", {
                        key: 0,
                        class: "p-3 rounded-lg bg-warning-50 dark:bg-warning-900/20 text-warning-700 dark:text-warning-300 text-sm"
                      }, [
                        createVNode("div", { class: "flex items-start gap-2" }, [
                          createVNode(_component_UIcon, {
                            name: "i-heroicons-exclamation-triangle",
                            class: "w-5 h-5 shrink-0 mt-0.5"
                          }),
                          createVNode(
                            "p",
                            null,
                            " Saldo sebesar " + toDisplayString(unref(formatCurrency)(__props.withdrawal.amount)) + " akan dikembalikan ke wallet customer. ",
                            1
                            /* TEXT */
                          )
                        ])
                      ])) : createCommentVNode("v-if", true)
                    ])) : createCommentVNode("v-if", true)
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
                  createVNode("div", { class: "flex items-center gap-3" }, [
                    createVNode(
                      "div",
                      {
                        class: [
                          "p-2 rounded-lg",
                          __props.type === "approve" ? "bg-success-100 dark:bg-success-900/30" : "bg-error-100 dark:bg-error-900/30"
                        ]
                      },
                      [
                        createVNode(_component_UIcon, {
                          name: __props.type === "approve" ? "i-heroicons-check-circle" : "i-heroicons-x-circle",
                          class: [
                            "w-5 h-5",
                            __props.type === "approve" ? "text-success-600 dark:text-success-400" : "text-error-600 dark:text-error-400"
                          ]
                        }, null, 8, ["name", "class"])
                      ],
                      2
                      /* CLASS */
                    ),
                    createVNode("div", null, [
                      createVNode(
                        "h3",
                        { class: "font-semibold text-gray-900 dark:text-white" },
                        toDisplayString(__props.type === "approve" ? "Setujui Permintaan Withdraw" : "Tolak Permintaan Withdraw"),
                        1
                        /* TEXT */
                      ),
                      createVNode(
                        "p",
                        { class: "text-sm text-gray-500 dark:text-gray-400" },
                        toDisplayString(__props.withdrawal?.customerName),
                        1
                        /* TEXT */
                      )
                    ])
                  ])
                ]),
                footer: withCtx(() => [
                  createVNode("div", { class: "flex justify-end gap-3" }, [
                    createVNode(_component_UButton, {
                      color: "neutral",
                      variant: "ghost",
                      disabled: isProcessing.value,
                      onClick: handleClose
                    }, {
                      default: withCtx(() => [
                        createTextVNode(" Batal ")
                      ]),
                      _: 1
                      /* STABLE */
                    }, 8, ["disabled"]),
                    createVNode(_component_UButton, {
                      color: __props.type === "approve" ? "success" : "error",
                      loading: isProcessing.value,
                      onClick: handleConfirm
                    }, {
                      default: withCtx(() => [
                        createTextVNode(
                          toDisplayString(__props.type === "approve" ? "Setujui" : "Tolak"),
                          1
                          /* TEXT */
                        )
                      ]),
                      _: 1
                      /* STABLE */
                    }, 8, ["color", "loading"])
                  ])
                ]),
                default: withCtx(() => [
                  __props.withdrawal ? (openBlock(), createBlock("div", {
                    key: 0,
                    class: "space-y-4"
                  }, [
                    createCommentVNode(" Withdrawal Info "),
                    createVNode("div", { class: "p-4 rounded-lg bg-gray-50 dark:bg-gray-800/50" }, [
                      createVNode("div", { class: "grid grid-cols-2 gap-4 text-sm" }, [
                        createVNode("div", null, [
                          createVNode("p", { class: "text-gray-500 dark:text-gray-400" }, "Jumlah"),
                          createVNode(
                            "p",
                            { class: "font-bold text-lg text-gray-900 dark:text-white" },
                            toDisplayString(unref(formatCurrency)(__props.withdrawal.amount)),
                            1
                            /* TEXT */
                          )
                        ]),
                        createVNode("div", null, [
                          createVNode("p", { class: "text-gray-500 dark:text-gray-400" }, "Bank"),
                          createVNode(
                            "p",
                            { class: "font-medium text-gray-900 dark:text-white" },
                            toDisplayString(__props.withdrawal.bankName),
                            1
                            /* TEXT */
                          )
                        ]),
                        createVNode("div", null, [
                          createVNode("p", { class: "text-gray-500 dark:text-gray-400" }, "Nomor Rekening"),
                          createVNode(
                            "p",
                            { class: "font-medium text-gray-900 dark:text-white" },
                            toDisplayString(__props.withdrawal.accountNumber),
                            1
                            /* TEXT */
                          )
                        ]),
                        createVNode("div", null, [
                          createVNode("p", { class: "text-gray-500 dark:text-gray-400" }, "Atas Nama"),
                          createVNode(
                            "p",
                            { class: "font-medium text-gray-900 dark:text-white" },
                            toDisplayString(__props.withdrawal.accountName),
                            1
                            /* TEXT */
                          )
                        ])
                      ])
                    ]),
                    createCommentVNode(" Notes/Reason Input "),
                    createVNode(_component_UFormField, {
                      label: __props.type === "approve" ? "Catatan (Opsional)" : "Alasan Penolakan",
                      required: __props.type === "reject"
                    }, {
                      default: withCtx(() => [
                        __props.type === "approve" ? (openBlock(), createBlock(_component_UTextarea, {
                          key: 0,
                          modelValue: notes.value,
                          "onUpdate:modelValue": ($event) => notes.value = $event,
                          placeholder: "Tambahkan catatan jika diperlukan...",
                          rows: 3
                        }, null, 8, ["modelValue", "onUpdate:modelValue"])) : (openBlock(), createBlock(_component_UTextarea, {
                          key: 1,
                          modelValue: reason.value,
                          "onUpdate:modelValue": ($event) => reason.value = $event,
                          placeholder: "Masukkan alasan penolakan...",
                          rows: 3
                        }, null, 8, ["modelValue", "onUpdate:modelValue"]))
                      ]),
                      _: 1
                      /* STABLE */
                    }, 8, ["label", "required"]),
                    createCommentVNode(" Warning for reject "),
                    __props.type === "reject" ? (openBlock(), createBlock("div", {
                      key: 0,
                      class: "p-3 rounded-lg bg-warning-50 dark:bg-warning-900/20 text-warning-700 dark:text-warning-300 text-sm"
                    }, [
                      createVNode("div", { class: "flex items-start gap-2" }, [
                        createVNode(_component_UIcon, {
                          name: "i-heroicons-exclamation-triangle",
                          class: "w-5 h-5 shrink-0 mt-0.5"
                        }),
                        createVNode(
                          "p",
                          null,
                          " Saldo sebesar " + toDisplayString(unref(formatCurrency)(__props.withdrawal.amount)) + " akan dikembalikan ke wallet customer. ",
                          1
                          /* TEXT */
                        )
                      ])
                    ])) : createCommentVNode("v-if", true)
                  ])) : createCommentVNode("v-if", true)
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("inertia/components/admin/finance/WithdrawalActionModal.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as _ };
