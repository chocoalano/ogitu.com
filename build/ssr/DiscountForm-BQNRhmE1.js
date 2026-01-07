import { _ as _sfc_main$9 } from './Switch-eKFRwox7.js';
import { a as _sfc_main$1, _ as _sfc_main$8 } from './Button-BTdvmZ8N.js';
import { _ as _sfc_main$6 } from './SelectMenu-BqLaY6AT.js';
import { _ as _sfc_main$5 } from './Textarea-yrK84h3-.js';
import { _ as _sfc_main$4 } from './Badge-CQlYH3Fo.js';
import { _ as _sfc_main$3 } from './FormField-CdECN7pk.js';
import { _ as _sfc_main$2 } from './Card-h3oZeDee.js';
import { defineComponent, ref, computed, mergeProps, unref, withCtx, createVNode, createBlock, openBlock, createCommentVNode, toDisplayString, createTextVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate } from 'vue/server-renderer';
import { Link } from '@inertiajs/vue3';
import { _ as _sfc_main$a } from './ProductSelector-BS3fY-Sv.js';
import { _ as _sfc_main$7 } from './CurrencyInput-Di61sPAN.js';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "DiscountForm",
  __ssrInlineRender: true,
  props: {
    discount: {},
    products: {},
    mode: {}
  },
  setup(__props) {
    const props = __props;
    const formatDateTimeLocal = (dateStr) => {
      if (!dateStr) return "";
      const date = new Date(dateStr);
      return date.toISOString().slice(0, 16);
    };
    const defaultForm = {
      name: "",
      description: "",
      type: "percentage",
      value: 0,
      min_purchase: 0,
      max_discount: null,
      start_date: "",
      end_date: "",
      usage_limit: null,
      is_active: true,
      applies_to_all: false,
      product_ids: []
    };
    const form = ref(
      props.mode === "edit" && props.discount ? {
        name: props.discount.name,
        description: props.discount.description || "",
        type: props.discount.type,
        value: props.discount.value,
        min_purchase: props.discount.minPurchase,
        max_discount: props.discount.maxDiscount,
        start_date: formatDateTimeLocal(props.discount.startDate),
        end_date: formatDateTimeLocal(props.discount.endDate),
        usage_limit: props.discount.usageLimit,
        is_active: props.discount.isActive,
        applies_to_all: props.discount.appliesToAll,
        product_ids: props.discount.productIds || []
      } : { ...defaultForm }
    );
    const isSubmitting = ref(false);
    const errors = ref({});
    const typeOptions = [
      { label: "Persentase (%)", value: "percentage" },
      { label: "Nominal (Rp)", value: "fixed" }
    ];
    const formatPrice = (price) => {
      return new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        minimumFractionDigits: 0
      }).format(price);
    };
    const discountPreview = computed(() => {
      if (form.value.type === "percentage") {
        return `${form.value.value}%`;
      }
      return formatPrice(form.value.value);
    });
    const pageTitle = computed(() => props.mode === "edit" ? "Edit Diskon" : "Buat Diskon Baru");
    const pageSubtitle = computed(
      () => props.mode === "edit" ? props.discount?.name || "" : "Buat diskon untuk customer dan terapkan ke produk pilihan"
    );
    const submitButtonText = computed(
      () => props.mode === "edit" ? "Simpan Perubahan" : "Simpan Diskon"
    );
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UButton = _sfc_main$1;
      const _component_UCard = _sfc_main$2;
      const _component_UFormField = _sfc_main$3;
      const _component_UInput = _sfc_main$4;
      const _component_UTextarea = _sfc_main$5;
      const _component_USelectMenu = _sfc_main$6;
      const _component_UIcon = _sfc_main$8;
      const _component_USwitch = _sfc_main$9;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "p-6 max-w-7xl mx-auto space-y-6" }, _attrs))}><!-- Header --><div class="flex items-center gap-4">`);
      _push(ssrRenderComponent(unref(Link), { href: "/admin/promotions/discounts" }, {
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
      _push(`<div><h1 class="text-2xl font-bold text-gray-900 dark:text-white">${ssrInterpolate(pageTitle.value)}</h1><p class="text-gray-500 dark:text-gray-400">${ssrInterpolate(pageSubtitle.value)}</p></div></div><!-- Form --><form class="space-y-6"><!-- Basic Info -->`);
      _push(ssrRenderComponent(_component_UCard, null, {
        header: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<h3 class="font-semibold text-gray-900 dark:text-white"${_scopeId}>Informasi Dasar</h3>`);
          } else {
            return [
              createVNode("h3", { class: "font-semibold text-gray-900 dark:text-white" }, "Informasi Dasar")
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="space-y-4"${_scopeId}>`);
            _push2(ssrRenderComponent(_component_UFormField, {
              label: "Nama Diskon",
              error: errors.value.name,
              required: ""
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_UInput, {
                    modelValue: form.value.name,
                    "onUpdate:modelValue": ($event) => form.value.name = $event,
                    placeholder: "Contoh: Diskon Tahun Baru",
                    color: errors.value.name ? "error" : void 0,
                    class: "w-full"
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_UInput, {
                      modelValue: form.value.name,
                      "onUpdate:modelValue": ($event) => form.value.name = $event,
                      placeholder: "Contoh: Diskon Tahun Baru",
                      color: errors.value.name ? "error" : void 0,
                      class: "w-full"
                    }, null, 8, ["modelValue", "onUpdate:modelValue", "color"])
                  ];
                }
              }),
              _: 1
              /* STABLE */
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_UFormField, { label: "Deskripsi" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_UTextarea, {
                    modelValue: form.value.description,
                    "onUpdate:modelValue": ($event) => form.value.description = $event,
                    placeholder: "Deskripsi singkat tentang diskon ini",
                    rows: 3,
                    class: "w-full"
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_UTextarea, {
                      modelValue: form.value.description,
                      "onUpdate:modelValue": ($event) => form.value.description = $event,
                      placeholder: "Deskripsi singkat tentang diskon ini",
                      rows: 3,
                      class: "w-full"
                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                  ];
                }
              }),
              _: 1
              /* STABLE */
            }, _parent2, _scopeId));
            _push2(`</div>`);
          } else {
            return [
              createVNode("div", { class: "space-y-4" }, [
                createVNode(_component_UFormField, {
                  label: "Nama Diskon",
                  error: errors.value.name,
                  required: ""
                }, {
                  default: withCtx(() => [
                    createVNode(_component_UInput, {
                      modelValue: form.value.name,
                      "onUpdate:modelValue": ($event) => form.value.name = $event,
                      placeholder: "Contoh: Diskon Tahun Baru",
                      color: errors.value.name ? "error" : void 0,
                      class: "w-full"
                    }, null, 8, ["modelValue", "onUpdate:modelValue", "color"])
                  ]),
                  _: 1
                  /* STABLE */
                }, 8, ["error"]),
                createVNode(_component_UFormField, { label: "Deskripsi" }, {
                  default: withCtx(() => [
                    createVNode(_component_UTextarea, {
                      modelValue: form.value.description,
                      "onUpdate:modelValue": ($event) => form.value.description = $event,
                      placeholder: "Deskripsi singkat tentang diskon ini",
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
      }, _parent));
      _push(`<!-- Discount Value -->`);
      _push(ssrRenderComponent(_component_UCard, null, {
        header: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<h3 class="font-semibold text-gray-900 dark:text-white"${_scopeId}>Nilai Diskon</h3>`);
          } else {
            return [
              createVNode("h3", { class: "font-semibold text-gray-900 dark:text-white" }, "Nilai Diskon")
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="space-y-4"${_scopeId}><div class="grid grid-cols-1 md:grid-cols-2 gap-4"${_scopeId}>`);
            _push2(ssrRenderComponent(_component_UFormField, {
              label: "Tipe Diskon",
              required: ""
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_USelectMenu, {
                    modelValue: form.value.type,
                    "onUpdate:modelValue": ($event) => form.value.type = $event,
                    items: typeOptions,
                    "value-key": "value",
                    class: "w-full"
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_USelectMenu, {
                      modelValue: form.value.type,
                      "onUpdate:modelValue": ($event) => form.value.type = $event,
                      items: typeOptions,
                      "value-key": "value",
                      class: "w-full"
                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                  ];
                }
              }),
              _: 1
              /* STABLE */
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_UFormField, {
              label: form.value.type === "percentage" ? "Nilai (%)" : "Nilai (Rp)",
              error: errors.value.value,
              required: ""
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  if (form.value.type === "percentage") {
                    _push3(ssrRenderComponent(_component_UInput, {
                      modelValue: form.value.value,
                      "onUpdate:modelValue": ($event) => form.value.value = $event,
                      modelModifiers: { number: true },
                      type: "number",
                      min: 0,
                      max: 100,
                      placeholder: "10",
                      color: errors.value.value ? "error" : void 0,
                      class: "w-full"
                    }, null, _parent3, _scopeId2));
                  } else {
                    _push3(ssrRenderComponent(_sfc_main$7, {
                      modelValue: form.value.value,
                      "onUpdate:modelValue": ($event) => form.value.value = $event,
                      placeholder: "50.000",
                      color: errors.value.value ? "error" : void 0
                    }, null, _parent3, _scopeId2));
                  }
                } else {
                  return [
                    form.value.type === "percentage" ? (openBlock(), createBlock(_component_UInput, {
                      key: 0,
                      modelValue: form.value.value,
                      "onUpdate:modelValue": ($event) => form.value.value = $event,
                      modelModifiers: { number: true },
                      type: "number",
                      min: 0,
                      max: 100,
                      placeholder: "10",
                      color: errors.value.value ? "error" : void 0,
                      class: "w-full"
                    }, null, 8, ["modelValue", "onUpdate:modelValue", "color"])) : (openBlock(), createBlock(_sfc_main$7, {
                      key: 1,
                      modelValue: form.value.value,
                      "onUpdate:modelValue": ($event) => form.value.value = $event,
                      placeholder: "50.000",
                      color: errors.value.value ? "error" : void 0
                    }, null, 8, ["modelValue", "onUpdate:modelValue", "color"]))
                  ];
                }
              }),
              _: 1
              /* STABLE */
            }, _parent2, _scopeId));
            _push2(`</div><div class="grid grid-cols-1 md:grid-cols-2 gap-4"${_scopeId}>`);
            _push2(ssrRenderComponent(_component_UFormField, { label: "Minimal Pembelian" }, {
              hint: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<span class="text-xs text-gray-500"${_scopeId2}>Kosongkan jika tidak ada minimal</span>`);
                } else {
                  return [
                    createVNode("span", { class: "text-xs text-gray-500" }, "Kosongkan jika tidak ada minimal")
                  ];
                }
              }),
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_sfc_main$7, {
                    modelValue: form.value.min_purchase,
                    "onUpdate:modelValue": ($event) => form.value.min_purchase = $event,
                    placeholder: "0"
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_sfc_main$7, {
                      modelValue: form.value.min_purchase,
                      "onUpdate:modelValue": ($event) => form.value.min_purchase = $event,
                      placeholder: "0"
                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                  ];
                }
              }),
              _: 1
              /* STABLE */
            }, _parent2, _scopeId));
            if (form.value.type === "percentage") {
              _push2(ssrRenderComponent(_component_UFormField, { label: "Maksimal Diskon" }, {
                hint: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`<span class="text-xs text-gray-500"${_scopeId2}>Kosongkan jika tidak ada batasan</span>`);
                  } else {
                    return [
                      createVNode("span", { class: "text-xs text-gray-500" }, "Kosongkan jika tidak ada batasan")
                    ];
                  }
                }),
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(_sfc_main$7, {
                      modelValue: form.value.max_discount,
                      "onUpdate:modelValue": ($event) => form.value.max_discount = $event,
                      placeholder: "Tidak ada batasan"
                    }, null, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(_sfc_main$7, {
                        modelValue: form.value.max_discount,
                        "onUpdate:modelValue": ($event) => form.value.max_discount = $event,
                        placeholder: "Tidak ada batasan"
                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                    ];
                  }
                }),
                _: 1
                /* STABLE */
              }, _parent2, _scopeId));
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><!-- Preview --><div class="p-4 rounded-lg bg-primary-50 dark:bg-primary-900/20 border border-primary-200 dark:border-primary-800"${_scopeId}><div class="flex items-center gap-3"${_scopeId}><div class="p-2 rounded-full bg-primary-100 dark:bg-primary-800"${_scopeId}>`);
            _push2(ssrRenderComponent(_component_UIcon, {
              name: "i-heroicons-tag",
              class: "w-5 h-5 text-primary-600 dark:text-primary-400"
            }, null, _parent2, _scopeId));
            _push2(`</div><div${_scopeId}><p class="text-sm text-primary-600 dark:text-primary-400"${_scopeId}>Preview Diskon</p><p class="text-xl font-bold text-primary-700 dark:text-primary-300"${_scopeId}>${ssrInterpolate(discountPreview.value)}</p></div></div></div></div>`);
          } else {
            return [
              createVNode("div", { class: "space-y-4" }, [
                createVNode("div", { class: "grid grid-cols-1 md:grid-cols-2 gap-4" }, [
                  createVNode(_component_UFormField, {
                    label: "Tipe Diskon",
                    required: ""
                  }, {
                    default: withCtx(() => [
                      createVNode(_component_USelectMenu, {
                        modelValue: form.value.type,
                        "onUpdate:modelValue": ($event) => form.value.type = $event,
                        items: typeOptions,
                        "value-key": "value",
                        class: "w-full"
                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                    ]),
                    _: 1
                    /* STABLE */
                  }),
                  createVNode(_component_UFormField, {
                    label: form.value.type === "percentage" ? "Nilai (%)" : "Nilai (Rp)",
                    error: errors.value.value,
                    required: ""
                  }, {
                    default: withCtx(() => [
                      form.value.type === "percentage" ? (openBlock(), createBlock(_component_UInput, {
                        key: 0,
                        modelValue: form.value.value,
                        "onUpdate:modelValue": ($event) => form.value.value = $event,
                        modelModifiers: { number: true },
                        type: "number",
                        min: 0,
                        max: 100,
                        placeholder: "10",
                        color: errors.value.value ? "error" : void 0,
                        class: "w-full"
                      }, null, 8, ["modelValue", "onUpdate:modelValue", "color"])) : (openBlock(), createBlock(_sfc_main$7, {
                        key: 1,
                        modelValue: form.value.value,
                        "onUpdate:modelValue": ($event) => form.value.value = $event,
                        placeholder: "50.000",
                        color: errors.value.value ? "error" : void 0
                      }, null, 8, ["modelValue", "onUpdate:modelValue", "color"]))
                    ]),
                    _: 1
                    /* STABLE */
                  }, 8, ["label", "error"])
                ]),
                createVNode("div", { class: "grid grid-cols-1 md:grid-cols-2 gap-4" }, [
                  createVNode(_component_UFormField, { label: "Minimal Pembelian" }, {
                    hint: withCtx(() => [
                      createVNode("span", { class: "text-xs text-gray-500" }, "Kosongkan jika tidak ada minimal")
                    ]),
                    default: withCtx(() => [
                      createVNode(_sfc_main$7, {
                        modelValue: form.value.min_purchase,
                        "onUpdate:modelValue": ($event) => form.value.min_purchase = $event,
                        placeholder: "0"
                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                    ]),
                    _: 1
                    /* STABLE */
                  }),
                  form.value.type === "percentage" ? (openBlock(), createBlock(_component_UFormField, {
                    key: 0,
                    label: "Maksimal Diskon"
                  }, {
                    hint: withCtx(() => [
                      createVNode("span", { class: "text-xs text-gray-500" }, "Kosongkan jika tidak ada batasan")
                    ]),
                    default: withCtx(() => [
                      createVNode(_sfc_main$7, {
                        modelValue: form.value.max_discount,
                        "onUpdate:modelValue": ($event) => form.value.max_discount = $event,
                        placeholder: "Tidak ada batasan"
                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                    ]),
                    _: 1
                    /* STABLE */
                  })) : createCommentVNode("v-if", true)
                ]),
                createCommentVNode(" Preview "),
                createVNode("div", { class: "p-4 rounded-lg bg-primary-50 dark:bg-primary-900/20 border border-primary-200 dark:border-primary-800" }, [
                  createVNode("div", { class: "flex items-center gap-3" }, [
                    createVNode("div", { class: "p-2 rounded-full bg-primary-100 dark:bg-primary-800" }, [
                      createVNode(_component_UIcon, {
                        name: "i-heroicons-tag",
                        class: "w-5 h-5 text-primary-600 dark:text-primary-400"
                      })
                    ]),
                    createVNode("div", null, [
                      createVNode("p", { class: "text-sm text-primary-600 dark:text-primary-400" }, "Preview Diskon"),
                      createVNode(
                        "p",
                        { class: "text-xl font-bold text-primary-700 dark:text-primary-300" },
                        toDisplayString(discountPreview.value),
                        1
                        /* TEXT */
                      )
                    ])
                  ])
                ])
              ])
            ];
          }
        }),
        _: 1
        /* STABLE */
      }, _parent));
      _push(`<!-- Period -->`);
      _push(ssrRenderComponent(_component_UCard, null, {
        header: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<h3 class="font-semibold text-gray-900 dark:text-white"${_scopeId}>Periode &amp; Penggunaan</h3>`);
          } else {
            return [
              createVNode("h3", { class: "font-semibold text-gray-900 dark:text-white" }, "Periode & Penggunaan")
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="space-y-4"${_scopeId}><div class="grid grid-cols-1 md:grid-cols-2 gap-4"${_scopeId}>`);
            _push2(ssrRenderComponent(_component_UFormField, {
              label: "Tanggal Mulai",
              error: errors.value.start_date,
              required: ""
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_UInput, {
                    modelValue: form.value.start_date,
                    "onUpdate:modelValue": ($event) => form.value.start_date = $event,
                    type: "datetime-local",
                    color: errors.value.start_date ? "error" : void 0,
                    class: "w-full"
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_UInput, {
                      modelValue: form.value.start_date,
                      "onUpdate:modelValue": ($event) => form.value.start_date = $event,
                      type: "datetime-local",
                      color: errors.value.start_date ? "error" : void 0,
                      class: "w-full"
                    }, null, 8, ["modelValue", "onUpdate:modelValue", "color"])
                  ];
                }
              }),
              _: 1
              /* STABLE */
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_UFormField, {
              label: "Tanggal Selesai",
              error: errors.value.end_date,
              required: ""
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_UInput, {
                    modelValue: form.value.end_date,
                    "onUpdate:modelValue": ($event) => form.value.end_date = $event,
                    type: "datetime-local",
                    color: errors.value.end_date ? "error" : void 0,
                    class: "w-full"
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_UInput, {
                      modelValue: form.value.end_date,
                      "onUpdate:modelValue": ($event) => form.value.end_date = $event,
                      type: "datetime-local",
                      color: errors.value.end_date ? "error" : void 0,
                      class: "w-full"
                    }, null, 8, ["modelValue", "onUpdate:modelValue", "color"])
                  ];
                }
              }),
              _: 1
              /* STABLE */
            }, _parent2, _scopeId));
            _push2(`</div>`);
            _push2(ssrRenderComponent(_component_UFormField, { label: "Batas Penggunaan" }, {
              hint: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  if (__props.mode === "edit" && __props.discount?.usageCount) {
                    _push3(`<span class="text-xs text-gray-500"${_scopeId2}> Sudah digunakan: ${ssrInterpolate(__props.discount.usageCount)} kali </span>`);
                  } else {
                    _push3(`<span class="text-xs text-gray-500"${_scopeId2}> Kosongkan jika tidak ada batasan penggunaan </span>`);
                  }
                } else {
                  return [
                    __props.mode === "edit" && __props.discount?.usageCount ? (openBlock(), createBlock(
                      "span",
                      {
                        key: 0,
                        class: "text-xs text-gray-500"
                      },
                      " Sudah digunakan: " + toDisplayString(__props.discount.usageCount) + " kali ",
                      1
                      /* TEXT */
                    )) : (openBlock(), createBlock("span", {
                      key: 1,
                      class: "text-xs text-gray-500"
                    }, " Kosongkan jika tidak ada batasan penggunaan "))
                  ];
                }
              }),
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_UInput, {
                    modelValue: form.value.usage_limit,
                    "onUpdate:modelValue": ($event) => form.value.usage_limit = $event,
                    modelModifiers: { number: true },
                    type: "number",
                    min: 0,
                    placeholder: "Tidak ada batasan",
                    class: "w-full"
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_UInput, {
                      modelValue: form.value.usage_limit,
                      "onUpdate:modelValue": ($event) => form.value.usage_limit = $event,
                      modelModifiers: { number: true },
                      type: "number",
                      min: 0,
                      placeholder: "Tidak ada batasan",
                      class: "w-full"
                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                  ];
                }
              }),
              _: 1
              /* STABLE */
            }, _parent2, _scopeId));
            _push2(`<div class="flex items-center gap-3"${_scopeId}>`);
            _push2(ssrRenderComponent(_component_USwitch, {
              modelValue: form.value.is_active,
              "onUpdate:modelValue": ($event) => form.value.is_active = $event
            }, null, _parent2, _scopeId));
            _push2(`<div${_scopeId}><p class="font-medium text-gray-900 dark:text-white"${_scopeId}>Aktifkan Diskon</p><p class="text-sm text-gray-500 dark:text-gray-400"${_scopeId}> Diskon akan aktif sesuai periode yang ditentukan </p></div></div></div>`);
          } else {
            return [
              createVNode("div", { class: "space-y-4" }, [
                createVNode("div", { class: "grid grid-cols-1 md:grid-cols-2 gap-4" }, [
                  createVNode(_component_UFormField, {
                    label: "Tanggal Mulai",
                    error: errors.value.start_date,
                    required: ""
                  }, {
                    default: withCtx(() => [
                      createVNode(_component_UInput, {
                        modelValue: form.value.start_date,
                        "onUpdate:modelValue": ($event) => form.value.start_date = $event,
                        type: "datetime-local",
                        color: errors.value.start_date ? "error" : void 0,
                        class: "w-full"
                      }, null, 8, ["modelValue", "onUpdate:modelValue", "color"])
                    ]),
                    _: 1
                    /* STABLE */
                  }, 8, ["error"]),
                  createVNode(_component_UFormField, {
                    label: "Tanggal Selesai",
                    error: errors.value.end_date,
                    required: ""
                  }, {
                    default: withCtx(() => [
                      createVNode(_component_UInput, {
                        modelValue: form.value.end_date,
                        "onUpdate:modelValue": ($event) => form.value.end_date = $event,
                        type: "datetime-local",
                        color: errors.value.end_date ? "error" : void 0,
                        class: "w-full"
                      }, null, 8, ["modelValue", "onUpdate:modelValue", "color"])
                    ]),
                    _: 1
                    /* STABLE */
                  }, 8, ["error"])
                ]),
                createVNode(_component_UFormField, { label: "Batas Penggunaan" }, {
                  hint: withCtx(() => [
                    __props.mode === "edit" && __props.discount?.usageCount ? (openBlock(), createBlock(
                      "span",
                      {
                        key: 0,
                        class: "text-xs text-gray-500"
                      },
                      " Sudah digunakan: " + toDisplayString(__props.discount.usageCount) + " kali ",
                      1
                      /* TEXT */
                    )) : (openBlock(), createBlock("span", {
                      key: 1,
                      class: "text-xs text-gray-500"
                    }, " Kosongkan jika tidak ada batasan penggunaan "))
                  ]),
                  default: withCtx(() => [
                    createVNode(_component_UInput, {
                      modelValue: form.value.usage_limit,
                      "onUpdate:modelValue": ($event) => form.value.usage_limit = $event,
                      modelModifiers: { number: true },
                      type: "number",
                      min: 0,
                      placeholder: "Tidak ada batasan",
                      class: "w-full"
                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                  ]),
                  _: 1
                  /* STABLE */
                }),
                createVNode("div", { class: "flex items-center gap-3" }, [
                  createVNode(_component_USwitch, {
                    modelValue: form.value.is_active,
                    "onUpdate:modelValue": ($event) => form.value.is_active = $event
                  }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                  createVNode("div", null, [
                    createVNode("p", { class: "font-medium text-gray-900 dark:text-white" }, "Aktifkan Diskon"),
                    createVNode("p", { class: "text-sm text-gray-500 dark:text-gray-400" }, " Diskon akan aktif sesuai periode yang ditentukan ")
                  ])
                ])
              ])
            ];
          }
        }),
        _: 1
        /* STABLE */
      }, _parent));
      _push(`<!-- Products -->`);
      _push(ssrRenderComponent(_component_UCard, null, {
        header: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<h3 class="font-semibold text-gray-900 dark:text-white"${_scopeId}>Produk</h3>`);
          } else {
            return [
              createVNode("h3", { class: "font-semibold text-gray-900 dark:text-white" }, "Produk")
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_sfc_main$a, {
              products: __props.products,
              "selected-ids": form.value.product_ids,
              "onUpdate:selectedIds": ($event) => form.value.product_ids = $event,
              "applies-to-all": form.value.applies_to_all,
              "onUpdate:appliesToAll": ($event) => form.value.applies_to_all = $event
            }, null, _parent2, _scopeId));
            if (errors.value.products) {
              _push2(`<p class="mt-2 text-sm text-red-500"${_scopeId}>${ssrInterpolate(errors.value.products)}</p>`);
            } else {
              _push2(`<!---->`);
            }
          } else {
            return [
              createVNode(_sfc_main$a, {
                products: __props.products,
                "selected-ids": form.value.product_ids,
                "onUpdate:selectedIds": ($event) => form.value.product_ids = $event,
                "applies-to-all": form.value.applies_to_all,
                "onUpdate:appliesToAll": ($event) => form.value.applies_to_all = $event
              }, null, 8, ["products", "selected-ids", "onUpdate:selectedIds", "applies-to-all", "onUpdate:appliesToAll"]),
              errors.value.products ? (openBlock(), createBlock(
                "p",
                {
                  key: 0,
                  class: "mt-2 text-sm text-red-500"
                },
                toDisplayString(errors.value.products),
                1
                /* TEXT */
              )) : createCommentVNode("v-if", true)
            ];
          }
        }),
        _: 1
        /* STABLE */
      }, _parent));
      _push(`<!-- Actions --><div class="flex items-center justify-end gap-4">`);
      _push(ssrRenderComponent(unref(Link), { href: "/admin/promotions/discounts" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_UButton, {
              color: "neutral",
              variant: "ghost",
              disabled: isSubmitting.value
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
          } else {
            return [
              createVNode(_component_UButton, {
                color: "neutral",
                variant: "ghost",
                disabled: isSubmitting.value
              }, {
                default: withCtx(() => [
                  createTextVNode(" Batal ")
                ]),
                _: 1
                /* STABLE */
              }, 8, ["disabled"])
            ];
          }
        }),
        _: 1
        /* STABLE */
      }, _parent));
      _push(ssrRenderComponent(_component_UButton, {
        type: "submit",
        color: "primary",
        loading: isSubmitting.value
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`${ssrInterpolate(submitButtonText.value)}`);
          } else {
            return [
              createTextVNode(
                toDisplayString(submitButtonText.value),
                1
                /* TEXT */
              )
            ];
          }
        }),
        _: 1
        /* STABLE */
      }, _parent));
      _push(`</div></form></div>`);
    };
  }
});

const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("inertia/components/admin/promotions/DiscountForm.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as _ };
