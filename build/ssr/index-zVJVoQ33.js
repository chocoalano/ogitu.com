import { _ as _sfc_main$f } from './Textarea-yrK84h3-.js';
import { _ as _sfc_main$5 } from './Card-h3oZeDee.js';
import { _ as _sfc_main$6, a as _sfc_main$7 } from './Button-BTdvmZ8N.js';
import { defineComponent, withCtx, createTextVNode, createBlock, openBlock, createVNode, Fragment, renderList, createCommentVNode, toDisplayString, useSSRContext, ref, watch, onMounted, resolveComponent, computed, mergeProps, unref } from 'vue';
import { ssrRenderComponent, ssrRenderList, ssrRenderClass, ssrInterpolate, ssrRenderAttr, ssrRenderAttrs } from 'vue/server-renderer';
import { Head, router } from '@inertiajs/vue3';
import { _ as _sfc_main$h } from './default-pjkA2Ka0.js';
import { a as _sfc_main$8, _ as _sfc_main$d, u as useToast } from './Badge-CQlYH3Fo.js';
import { u as useMidtrans } from './use_midtrans-C-FzEF4G.js';
import { _ as _sfc_main$9 } from './Separator-WKKr0N6B.js';
import { _ as _sfc_main$g } from './Checkbox-DCS-_c5K.js';
import { _ as _sfc_main$e } from './SelectMenu-BqLaY6AT.js';
import { _ as _sfc_main$c } from './FormField-CdECN7pk.js';
import { _ as _sfc_main$b } from './Alert-B0mCzyXY.js';
import { _ as _sfc_main$a } from './Modal-VctJV7vb.js';
import 'reka-ui';
import '@vueuse/core';
import './virtual_nuxt-ui-plugins-CrG8Uaxr.js';
import '@unhead/vue/client';
import 'tailwindcss/colors';
import 'hookable';
import 'defu';
import 'ohash/utils';
import '@unhead/vue';
import 'tailwind-variants';
import '@iconify/vue';
import 'ufo';
import 'vaul-vue';
import './DropdownMenu-Zcq6i1qV.js';
import 'reka-ui/namespaced';

const _sfc_main$4 = /* @__PURE__ */ defineComponent({
  __name: "CheckoutAddressCard",
  __ssrInlineRender: true,
  props: {
    addresses: {},
    selectedAddressId: {}
  },
  emits: ["update:selectedAddressId", "add-address"],
  setup(__props, { emit: __emit }) {
    const emit = __emit;
    const selectAddress = (id) => {
      emit("update:selectedAddressId", id);
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UCard = _sfc_main$5;
      const _component_UIcon = _sfc_main$6;
      const _component_UButton = _sfc_main$7;
      const _component_UBadge = _sfc_main$8;
      _push(ssrRenderComponent(_component_UCard, _attrs, {
        header: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="flex items-center justify-between"${_scopeId}><h3 class="text-lg font-semibold text-gray-900 dark:text-white flex items-center gap-2"${_scopeId}>`);
            _push2(ssrRenderComponent(_component_UIcon, {
              name: "i-heroicons-map-pin",
              class: "text-primary"
            }, null, _parent2, _scopeId));
            _push2(` Alamat Pengiriman </h3>`);
            _push2(ssrRenderComponent(_component_UButton, {
              size: "sm",
              variant: "ghost",
              onClick: ($event) => emit("add-address")
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_UIcon, {
                    name: "i-heroicons-plus",
                    class: "mr-1"
                  }, null, _parent3, _scopeId2));
                  _push3(` Tambah Alamat `);
                } else {
                  return [
                    createVNode(_component_UIcon, {
                      name: "i-heroicons-plus",
                      class: "mr-1"
                    }),
                    createTextVNode(" Tambah Alamat ")
                  ];
                }
              }),
              _: 1
              /* STABLE */
            }, _parent2, _scopeId));
            _push2(`</div>`);
          } else {
            return [
              createVNode("div", { class: "flex items-center justify-between" }, [
                createVNode("h3", { class: "text-lg font-semibold text-gray-900 dark:text-white flex items-center gap-2" }, [
                  createVNode(_component_UIcon, {
                    name: "i-heroicons-map-pin",
                    class: "text-primary"
                  }),
                  createTextVNode(" Alamat Pengiriman ")
                ]),
                createVNode(_component_UButton, {
                  size: "sm",
                  variant: "ghost",
                  onClick: ($event) => emit("add-address")
                }, {
                  default: withCtx(() => [
                    createVNode(_component_UIcon, {
                      name: "i-heroicons-plus",
                      class: "mr-1"
                    }),
                    createTextVNode(" Tambah Alamat ")
                  ]),
                  _: 1
                  /* STABLE */
                }, 8, ["onClick"])
              ])
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            if (__props.addresses.length === 0) {
              _push2(`<div class="text-center py-8"${_scopeId}>`);
              _push2(ssrRenderComponent(_component_UIcon, {
                name: "i-heroicons-map-pin",
                class: "w-12 h-12 mx-auto text-gray-300 dark:text-gray-600"
              }, null, _parent2, _scopeId));
              _push2(`<p class="mt-2 text-gray-500 dark:text-gray-400"${_scopeId}>Belum ada alamat tersimpan</p>`);
              _push2(ssrRenderComponent(_component_UButton, {
                class: "mt-4",
                onClick: ($event) => emit("add-address")
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(` Tambah Alamat Baru `);
                  } else {
                    return [
                      createTextVNode(" Tambah Alamat Baru ")
                    ];
                  }
                }),
                _: 1
                /* STABLE */
              }, _parent2, _scopeId));
              _push2(`</div>`);
            } else {
              _push2(`<div class="space-y-3"${_scopeId}><!--[-->`);
              ssrRenderList(__props.addresses, (address) => {
                _push2(`<div class="${ssrRenderClass([__props.selectedAddressId === address.id ? "border-primary bg-primary/5 dark:bg-primary/10" : "border-gray-200 dark:border-gray-700 hover:border-primary/50", "relative border rounded-lg p-4 cursor-pointer transition-all"])}"${_scopeId}><div class="flex items-start gap-3"${_scopeId}><div class="mt-1"${_scopeId}><div class="${ssrRenderClass([__props.selectedAddressId === address.id ? "border-primary bg-primary" : "border-gray-300 dark:border-gray-600", "w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors"])}"${_scopeId}>`);
                if (__props.selectedAddressId === address.id) {
                  _push2(`<div class="w-2 h-2 rounded-full bg-white"${_scopeId}></div>`);
                } else {
                  _push2(`<!---->`);
                }
                _push2(`</div></div><div class="flex-1"${_scopeId}><div class="flex items-center gap-2 mb-1"${_scopeId}><span class="font-medium text-gray-900 dark:text-white"${_scopeId}>${ssrInterpolate(address.label)}</span>`);
                if (address.isDefault) {
                  _push2(ssrRenderComponent(_component_UBadge, {
                    size: "xs",
                    color: "primary",
                    variant: "soft"
                  }, {
                    default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                      if (_push3) {
                        _push3(`Default`);
                      } else {
                        return [
                          createTextVNode("Default")
                        ];
                      }
                    }),
                    _: 2
                    /* DYNAMIC */
                  }, _parent2, _scopeId));
                } else {
                  _push2(`<!---->`);
                }
                _push2(`</div><p class="font-semibold text-gray-800 dark:text-gray-200"${_scopeId}>${ssrInterpolate(address.recipientName)}</p><p class="text-sm text-gray-600 dark:text-gray-400"${_scopeId}>${ssrInterpolate(address.phone)}</p><p class="text-sm text-gray-600 dark:text-gray-400 mt-1"${_scopeId}>${ssrInterpolate(address.addressLine1)} `);
                if (address.addressLine2) {
                  _push2(`<span${_scopeId}>, ${ssrInterpolate(address.addressLine2)}</span>`);
                } else {
                  _push2(`<!---->`);
                }
                _push2(`</p><p class="text-sm text-gray-600 dark:text-gray-400"${_scopeId}>${ssrInterpolate(address.cityName)}, ${ssrInterpolate(address.provinceName)} ${ssrInterpolate(address.postalCode)}</p></div></div></div>`);
              });
              _push2(`<!--]--></div>`);
            }
          } else {
            return [
              __props.addresses.length === 0 ? (openBlock(), createBlock("div", {
                key: 0,
                class: "text-center py-8"
              }, [
                createVNode(_component_UIcon, {
                  name: "i-heroicons-map-pin",
                  class: "w-12 h-12 mx-auto text-gray-300 dark:text-gray-600"
                }),
                createVNode("p", { class: "mt-2 text-gray-500 dark:text-gray-400" }, "Belum ada alamat tersimpan"),
                createVNode(_component_UButton, {
                  class: "mt-4",
                  onClick: ($event) => emit("add-address")
                }, {
                  default: withCtx(() => [
                    createTextVNode(" Tambah Alamat Baru ")
                  ]),
                  _: 1
                  /* STABLE */
                }, 8, ["onClick"])
              ])) : (openBlock(), createBlock("div", {
                key: 1,
                class: "space-y-3"
              }, [
                (openBlock(true), createBlock(
                  Fragment,
                  null,
                  renderList(__props.addresses, (address) => {
                    return openBlock(), createBlock("div", {
                      key: address.id,
                      class: ["relative border rounded-lg p-4 cursor-pointer transition-all", __props.selectedAddressId === address.id ? "border-primary bg-primary/5 dark:bg-primary/10" : "border-gray-200 dark:border-gray-700 hover:border-primary/50"],
                      onClick: ($event) => selectAddress(address.id)
                    }, [
                      createVNode("div", { class: "flex items-start gap-3" }, [
                        createVNode("div", { class: "mt-1" }, [
                          createVNode(
                            "div",
                            {
                              class: ["w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors", __props.selectedAddressId === address.id ? "border-primary bg-primary" : "border-gray-300 dark:border-gray-600"]
                            },
                            [
                              __props.selectedAddressId === address.id ? (openBlock(), createBlock("div", {
                                key: 0,
                                class: "w-2 h-2 rounded-full bg-white"
                              })) : createCommentVNode("v-if", true)
                            ],
                            2
                            /* CLASS */
                          )
                        ]),
                        createVNode("div", { class: "flex-1" }, [
                          createVNode("div", { class: "flex items-center gap-2 mb-1" }, [
                            createVNode(
                              "span",
                              { class: "font-medium text-gray-900 dark:text-white" },
                              toDisplayString(address.label),
                              1
                              /* TEXT */
                            ),
                            address.isDefault ? (openBlock(), createBlock(_component_UBadge, {
                              key: 0,
                              size: "xs",
                              color: "primary",
                              variant: "soft"
                            }, {
                              default: withCtx(() => [
                                createTextVNode("Default")
                              ]),
                              _: 1
                              /* STABLE */
                            })) : createCommentVNode("v-if", true)
                          ]),
                          createVNode(
                            "p",
                            { class: "font-semibold text-gray-800 dark:text-gray-200" },
                            toDisplayString(address.recipientName),
                            1
                            /* TEXT */
                          ),
                          createVNode(
                            "p",
                            { class: "text-sm text-gray-600 dark:text-gray-400" },
                            toDisplayString(address.phone),
                            1
                            /* TEXT */
                          ),
                          createVNode("p", { class: "text-sm text-gray-600 dark:text-gray-400 mt-1" }, [
                            createTextVNode(
                              toDisplayString(address.addressLine1) + " ",
                              1
                              /* TEXT */
                            ),
                            address.addressLine2 ? (openBlock(), createBlock(
                              "span",
                              { key: 0 },
                              ", " + toDisplayString(address.addressLine2),
                              1
                              /* TEXT */
                            )) : createCommentVNode("v-if", true)
                          ]),
                          createVNode(
                            "p",
                            { class: "text-sm text-gray-600 dark:text-gray-400" },
                            toDisplayString(address.cityName) + ", " + toDisplayString(address.provinceName) + " " + toDisplayString(address.postalCode),
                            1
                            /* TEXT */
                          )
                        ])
                      ])
                    ], 10, ["onClick"]);
                  }),
                  128
                  /* KEYED_FRAGMENT */
                ))
              ]))
            ];
          }
        }),
        _: 1
        /* STABLE */
      }, _parent));
    };
  }
});

const _sfc_setup$4 = _sfc_main$4.setup;
_sfc_main$4.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("inertia/components/checkout/CheckoutAddressCard.vue");
  return _sfc_setup$4 ? _sfc_setup$4(props, ctx) : void 0;
};

const _sfc_main$3 = /* @__PURE__ */ defineComponent({
  __name: "CheckoutItemsCard",
  __ssrInlineRender: true,
  props: {
    items: {},
    totalWeight: {},
    subtotal: {},
    destinationDistrictId: {},
    selectedShipping: {}
  },
  emits: ["update:selectedShipping"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const shippingOptions = ref([]);
    const isLoadingShipping = ref(false);
    const selectedCourier = ref(null);
    const formatPrice = (price) => {
      return new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
      }).format(price);
    };
    const getXsrfToken = () => {
      if (typeof document === "undefined") return null;
      const match = document.cookie.match(/XSRF-TOKEN=([^;]+)/);
      return match ? decodeURIComponent(match[1]) : null;
    };
    const fetchShippingRates = async () => {
      if (!props.destinationDistrictId) {
        shippingOptions.value = [];
        return;
      }
      isLoadingShipping.value = true;
      try {
        const xsrfToken = getXsrfToken();
        const response = await fetch("/api/shipping/rates", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-Requested-With": "XMLHttpRequest",
            ...xsrfToken && { "X-XSRF-TOKEN": xsrfToken }
          },
          credentials: "include",
          body: JSON.stringify({
            destinationDistrictId: props.destinationDistrictId,
            weight: props.totalWeight
          })
        });
        const result = await response.json();
        if (result.success) {
          shippingOptions.value = result.data || [];
        }
      } catch (error) {
        console.error("Failed to fetch shipping rates:", error);
        shippingOptions.value = [];
      } finally {
        isLoadingShipping.value = false;
      }
    };
    const selectShipping = (option) => {
      selectedCourier.value = `${option.courierCode}-${option.courierService}`;
      emit("update:selectedShipping", {
        courierCode: option.courierCode,
        courierService: option.courierService,
        courierName: option.courierName,
        serviceDescription: option.serviceDescription,
        cost: option.cost,
        etd: option.etd
      });
    };
    watch(() => props.destinationDistrictId, fetchShippingRates);
    onMounted(() => {
      if (props.destinationDistrictId) {
        fetchShippingRates();
      }
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UCard = _sfc_main$5;
      const _component_UIcon = _sfc_main$6;
      const _component_URadio = resolveComponent("URadio");
      _push(ssrRenderComponent(_component_UCard, _attrs, {
        header: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="flex items-center justify-between"${_scopeId}><h3 class="font-semibold text-gray-900 dark:text-white"${_scopeId}>Detail Pesanan</h3><span class="text-sm text-gray-500 dark:text-gray-400"${_scopeId}>${ssrInterpolate(__props.items.length)} item</span></div>`);
          } else {
            return [
              createVNode("div", { class: "flex items-center justify-between" }, [
                createVNode("h3", { class: "font-semibold text-gray-900 dark:text-white" }, "Detail Pesanan"),
                createVNode(
                  "span",
                  { class: "text-sm text-gray-500 dark:text-gray-400" },
                  toDisplayString(__props.items.length) + " item",
                  1
                  /* TEXT */
                )
              ])
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="divide-y divide-gray-100 dark:divide-gray-800"${_scopeId}><!--[-->`);
            ssrRenderList(__props.items, (item) => {
              _push2(`<div class="flex gap-4 py-4 first:pt-0 last:pb-0"${_scopeId}><img${ssrRenderAttr("src", item.image || "/images/placeholder.png")}${ssrRenderAttr("alt", item.productName)} class="w-16 h-16 rounded-lg object-cover bg-gray-100 dark:bg-gray-800"${_scopeId}><div class="flex-1 min-w-0"${_scopeId}><p class="font-medium text-gray-900 dark:text-white truncate"${_scopeId}>${ssrInterpolate(item.productName)}</p>`);
              if (item.variantName) {
                _push2(`<p class="text-sm text-gray-500 dark:text-gray-400"${_scopeId}>${ssrInterpolate(item.variantName)}</p>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`<div class="flex items-center justify-between mt-1"${_scopeId}><span class="text-sm text-gray-500 dark:text-gray-400"${_scopeId}>x${ssrInterpolate(item.quantity)}</span><span class="font-medium text-gray-900 dark:text-white"${_scopeId}>${ssrInterpolate(formatPrice(item.price * item.quantity))}</span></div></div></div>`);
            });
            _push2(`<!--]--></div><div class="mt-4 pt-4 border-t border-gray-100 dark:border-gray-800"${_scopeId}><div class="flex justify-between text-sm"${_scopeId}><span class="text-gray-500 dark:text-gray-400"${_scopeId}>Subtotal</span><span class="font-semibold text-gray-900 dark:text-white"${_scopeId}>${ssrInterpolate(formatPrice(__props.subtotal))}</span></div><div class="flex justify-between text-sm mt-1"${_scopeId}><span class="text-gray-500 dark:text-gray-400"${_scopeId}>Berat Total</span><span class="text-gray-900 dark:text-white"${_scopeId}>${ssrInterpolate(__props.totalWeight)} gram</span></div></div><div class="mt-6 pt-4 border-t border-gray-100 dark:border-gray-800"${_scopeId}><h4 class="font-medium text-gray-900 dark:text-white mb-3"${_scopeId}>Pilih Pengiriman</h4><!-- Loading -->`);
            if (isLoadingShipping.value) {
              _push2(`<div class="flex items-center justify-center py-4"${_scopeId}>`);
              _push2(ssrRenderComponent(_component_UIcon, {
                name: "i-heroicons-arrow-path",
                class: "w-5 h-5 animate-spin text-primary-500"
              }, null, _parent2, _scopeId));
              _push2(`<span class="ml-2 text-sm text-gray-500 dark:text-gray-400"${_scopeId}>Memuat opsi pengiriman...</span></div>`);
            } else if (!__props.destinationDistrictId) {
              _push2(`<!--[--><!-- No Address Selected --><div class="text-center py-4"${_scopeId}>`);
              _push2(ssrRenderComponent(_component_UIcon, {
                name: "i-heroicons-map-pin",
                class: "w-8 h-8 mx-auto text-gray-300 dark:text-gray-600"
              }, null, _parent2, _scopeId));
              _push2(`<p class="mt-2 text-sm text-gray-500 dark:text-gray-400"${_scopeId}>Pilih alamat pengiriman terlebih dahulu</p></div><!--]-->`);
            } else if (shippingOptions.value.length === 0) {
              _push2(`<!--[--><!-- No Options Available --><div class="text-center py-4"${_scopeId}>`);
              _push2(ssrRenderComponent(_component_UIcon, {
                name: "i-heroicons-truck",
                class: "w-8 h-8 mx-auto text-gray-300 dark:text-gray-600"
              }, null, _parent2, _scopeId));
              _push2(`<p class="mt-2 text-sm text-gray-500 dark:text-gray-400"${_scopeId}>Tidak ada opsi pengiriman tersedia</p></div><!--]-->`);
            } else {
              _push2(`<!--[--><!-- Shipping Options List --><div class="space-y-2"${_scopeId}><!--[-->`);
              ssrRenderList(shippingOptions.value, (option) => {
                _push2(`<div class="${ssrRenderClass([
                  selectedCourier.value === `${option.courierCode}-${option.courierService}` ? "border-primary-500 bg-primary-50 dark:bg-primary-900/20" : "border-gray-200 dark:border-gray-700 hover:border-primary-300 dark:hover:border-primary-600",
                  "flex items-center p-3 rounded-lg border cursor-pointer transition-colors"
                ])}"${_scopeId}>`);
                _push2(ssrRenderComponent(_component_URadio, {
                  "model-value": selectedCourier.value === `${option.courierCode}-${option.courierService}`,
                  class: "mr-3"
                }, null, _parent2, _scopeId));
                _push2(`<div class="flex-1"${_scopeId}><div class="flex items-center justify-between"${_scopeId}><span class="font-medium text-gray-900 dark:text-white"${_scopeId}>${ssrInterpolate(option.courierName)}</span><span class="font-semibold text-primary-600 dark:text-primary-400"${_scopeId}>${ssrInterpolate(formatPrice(option.cost))}</span></div><div class="flex items-center justify-between mt-1"${_scopeId}><span class="text-sm text-gray-500 dark:text-gray-400"${_scopeId}>${ssrInterpolate(option.serviceDescription)}</span><span class="text-xs text-gray-400 dark:text-gray-500"${_scopeId}>${ssrInterpolate(option.etd)}</span></div></div></div>`);
              });
              _push2(`<!--]--></div><!--]-->`);
            }
            _push2(`</div>`);
          } else {
            return [
              createVNode("div", { class: "divide-y divide-gray-100 dark:divide-gray-800" }, [
                (openBlock(true), createBlock(
                  Fragment,
                  null,
                  renderList(__props.items, (item) => {
                    return openBlock(), createBlock("div", {
                      key: item.id,
                      class: "flex gap-4 py-4 first:pt-0 last:pb-0"
                    }, [
                      createVNode("img", {
                        src: item.image || "/images/placeholder.png",
                        alt: item.productName,
                        class: "w-16 h-16 rounded-lg object-cover bg-gray-100 dark:bg-gray-800"
                      }, null, 8, ["src", "alt"]),
                      createVNode("div", { class: "flex-1 min-w-0" }, [
                        createVNode(
                          "p",
                          { class: "font-medium text-gray-900 dark:text-white truncate" },
                          toDisplayString(item.productName),
                          1
                          /* TEXT */
                        ),
                        item.variantName ? (openBlock(), createBlock(
                          "p",
                          {
                            key: 0,
                            class: "text-sm text-gray-500 dark:text-gray-400"
                          },
                          toDisplayString(item.variantName),
                          1
                          /* TEXT */
                        )) : createCommentVNode("v-if", true),
                        createVNode("div", { class: "flex items-center justify-between mt-1" }, [
                          createVNode(
                            "span",
                            { class: "text-sm text-gray-500 dark:text-gray-400" },
                            "x" + toDisplayString(item.quantity),
                            1
                            /* TEXT */
                          ),
                          createVNode(
                            "span",
                            { class: "font-medium text-gray-900 dark:text-white" },
                            toDisplayString(formatPrice(item.price * item.quantity)),
                            1
                            /* TEXT */
                          )
                        ])
                      ])
                    ]);
                  }),
                  128
                  /* KEYED_FRAGMENT */
                ))
              ]),
              createVNode("div", { class: "mt-4 pt-4 border-t border-gray-100 dark:border-gray-800" }, [
                createVNode("div", { class: "flex justify-between text-sm" }, [
                  createVNode("span", { class: "text-gray-500 dark:text-gray-400" }, "Subtotal"),
                  createVNode(
                    "span",
                    { class: "font-semibold text-gray-900 dark:text-white" },
                    toDisplayString(formatPrice(__props.subtotal)),
                    1
                    /* TEXT */
                  )
                ]),
                createVNode("div", { class: "flex justify-between text-sm mt-1" }, [
                  createVNode("span", { class: "text-gray-500 dark:text-gray-400" }, "Berat Total"),
                  createVNode(
                    "span",
                    { class: "text-gray-900 dark:text-white" },
                    toDisplayString(__props.totalWeight) + " gram",
                    1
                    /* TEXT */
                  )
                ])
              ]),
              createVNode("div", { class: "mt-6 pt-4 border-t border-gray-100 dark:border-gray-800" }, [
                createVNode("h4", { class: "font-medium text-gray-900 dark:text-white mb-3" }, "Pilih Pengiriman"),
                createCommentVNode(" Loading "),
                isLoadingShipping.value ? (openBlock(), createBlock("div", {
                  key: 0,
                  class: "flex items-center justify-center py-4"
                }, [
                  createVNode(_component_UIcon, {
                    name: "i-heroicons-arrow-path",
                    class: "w-5 h-5 animate-spin text-primary-500"
                  }),
                  createVNode("span", { class: "ml-2 text-sm text-gray-500 dark:text-gray-400" }, "Memuat opsi pengiriman...")
                ])) : !__props.destinationDistrictId ? (openBlock(), createBlock(
                  Fragment,
                  { key: 1 },
                  [
                    createCommentVNode(" No Address Selected "),
                    createVNode("div", { class: "text-center py-4" }, [
                      createVNode(_component_UIcon, {
                        name: "i-heroicons-map-pin",
                        class: "w-8 h-8 mx-auto text-gray-300 dark:text-gray-600"
                      }),
                      createVNode("p", { class: "mt-2 text-sm text-gray-500 dark:text-gray-400" }, "Pilih alamat pengiriman terlebih dahulu")
                    ])
                  ],
                  2112
                  /* STABLE_FRAGMENT, DEV_ROOT_FRAGMENT */
                )) : shippingOptions.value.length === 0 ? (openBlock(), createBlock(
                  Fragment,
                  { key: 2 },
                  [
                    createCommentVNode(" No Options Available "),
                    createVNode("div", { class: "text-center py-4" }, [
                      createVNode(_component_UIcon, {
                        name: "i-heroicons-truck",
                        class: "w-8 h-8 mx-auto text-gray-300 dark:text-gray-600"
                      }),
                      createVNode("p", { class: "mt-2 text-sm text-gray-500 dark:text-gray-400" }, "Tidak ada opsi pengiriman tersedia")
                    ])
                  ],
                  2112
                  /* STABLE_FRAGMENT, DEV_ROOT_FRAGMENT */
                )) : (openBlock(), createBlock(
                  Fragment,
                  { key: 3 },
                  [
                    createCommentVNode(" Shipping Options List "),
                    createVNode("div", { class: "space-y-2" }, [
                      (openBlock(true), createBlock(
                        Fragment,
                        null,
                        renderList(shippingOptions.value, (option) => {
                          return openBlock(), createBlock("div", {
                            key: `${option.courierCode}-${option.courierService}`,
                            class: [
                              "flex items-center p-3 rounded-lg border cursor-pointer transition-colors",
                              selectedCourier.value === `${option.courierCode}-${option.courierService}` ? "border-primary-500 bg-primary-50 dark:bg-primary-900/20" : "border-gray-200 dark:border-gray-700 hover:border-primary-300 dark:hover:border-primary-600"
                            ],
                            onClick: ($event) => selectShipping(option)
                          }, [
                            createVNode(_component_URadio, {
                              "model-value": selectedCourier.value === `${option.courierCode}-${option.courierService}`,
                              class: "mr-3"
                            }, null, 8, ["model-value"]),
                            createVNode("div", { class: "flex-1" }, [
                              createVNode("div", { class: "flex items-center justify-between" }, [
                                createVNode(
                                  "span",
                                  { class: "font-medium text-gray-900 dark:text-white" },
                                  toDisplayString(option.courierName),
                                  1
                                  /* TEXT */
                                ),
                                createVNode(
                                  "span",
                                  { class: "font-semibold text-primary-600 dark:text-primary-400" },
                                  toDisplayString(formatPrice(option.cost)),
                                  1
                                  /* TEXT */
                                )
                              ]),
                              createVNode("div", { class: "flex items-center justify-between mt-1" }, [
                                createVNode(
                                  "span",
                                  { class: "text-sm text-gray-500 dark:text-gray-400" },
                                  toDisplayString(option.serviceDescription),
                                  1
                                  /* TEXT */
                                ),
                                createVNode(
                                  "span",
                                  { class: "text-xs text-gray-400 dark:text-gray-500" },
                                  toDisplayString(option.etd),
                                  1
                                  /* TEXT */
                                )
                              ])
                            ])
                          ], 10, ["onClick"]);
                        }),
                        128
                        /* KEYED_FRAGMENT */
                      ))
                    ])
                  ],
                  2112
                  /* STABLE_FRAGMENT, DEV_ROOT_FRAGMENT */
                ))
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

const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("inertia/components/checkout/CheckoutItemsCard.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};

const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "CheckoutSummaryCard",
  __ssrInlineRender: true,
  props: {
    subtotal: {},
    totalItems: {},
    totalShipping: {},
    canCheckout: { type: Boolean },
    isProcessing: { type: Boolean }
  },
  emits: ["checkout"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const grandTotal = computed(() => props.subtotal + props.totalShipping);
    const formatPrice = (price) => {
      return new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        minimumFractionDigits: 0
      }).format(price);
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UCard = _sfc_main$5;
      const _component_USeparator = _sfc_main$9;
      const _component_UButton = _sfc_main$7;
      const _component_UIcon = _sfc_main$6;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "sticky top-4" }, _attrs))}>`);
      _push(ssrRenderComponent(_component_UCard, null, {
        header: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<h3 class="text-lg font-semibold text-gray-900 dark:text-white"${_scopeId}>Ringkasan Pesanan</h3>`);
          } else {
            return [
              createVNode("h3", { class: "text-lg font-semibold text-gray-900 dark:text-white" }, "Ringkasan Pesanan")
            ];
          }
        }),
        footer: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_UButton, {
              block: "",
              size: "lg",
              disabled: !__props.canCheckout || __props.isProcessing,
              loading: __props.isProcessing,
              onClick: ($event) => emit("checkout")
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  if (!__props.isProcessing) {
                    _push3(ssrRenderComponent(_component_UIcon, {
                      name: "i-heroicons-credit-card",
                      class: "mr-2"
                    }, null, _parent3, _scopeId2));
                  } else {
                    _push3(`<!---->`);
                  }
                  _push3(` ${ssrInterpolate(__props.isProcessing ? "Memproses..." : "Bayar Sekarang")}`);
                } else {
                  return [
                    !__props.isProcessing ? (openBlock(), createBlock(_component_UIcon, {
                      key: 0,
                      name: "i-heroicons-credit-card",
                      class: "mr-2"
                    })) : createCommentVNode("v-if", true),
                    createTextVNode(
                      " " + toDisplayString(__props.isProcessing ? "Memproses..." : "Bayar Sekarang"),
                      1
                      /* TEXT */
                    )
                  ];
                }
              }),
              _: 1
              /* STABLE */
            }, _parent2, _scopeId));
            _push2(`<p class="text-xs text-center text-gray-500 dark:text-gray-400 mt-3"${_scopeId}> Dengan melanjutkan, Anda menyetujui syarat dan ketentuan yang berlaku </p>`);
          } else {
            return [
              createVNode(_component_UButton, {
                block: "",
                size: "lg",
                disabled: !__props.canCheckout || __props.isProcessing,
                loading: __props.isProcessing,
                onClick: ($event) => emit("checkout")
              }, {
                default: withCtx(() => [
                  !__props.isProcessing ? (openBlock(), createBlock(_component_UIcon, {
                    key: 0,
                    name: "i-heroicons-credit-card",
                    class: "mr-2"
                  })) : createCommentVNode("v-if", true),
                  createTextVNode(
                    " " + toDisplayString(__props.isProcessing ? "Memproses..." : "Bayar Sekarang"),
                    1
                    /* TEXT */
                  )
                ]),
                _: 1
                /* STABLE */
              }, 8, ["disabled", "loading", "onClick"]),
              createVNode("p", { class: "text-xs text-center text-gray-500 dark:text-gray-400 mt-3" }, " Dengan melanjutkan, Anda menyetujui syarat dan ketentuan yang berlaku ")
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="space-y-3"${_scopeId}><div class="flex justify-between"${_scopeId}><span class="text-gray-600 dark:text-gray-400"${_scopeId}>Subtotal (${ssrInterpolate(__props.totalItems)} item)</span><span class="font-medium text-gray-900 dark:text-white"${_scopeId}>${ssrInterpolate(formatPrice(__props.subtotal))}</span></div><div class="flex justify-between"${_scopeId}><span class="text-gray-600 dark:text-gray-400"${_scopeId}>Total Ongkos Kirim</span><span class="font-medium text-gray-900 dark:text-white"${_scopeId}>${ssrInterpolate(formatPrice(__props.totalShipping))}</span></div>`);
            _push2(ssrRenderComponent(_component_USeparator, null, null, _parent2, _scopeId));
            _push2(`<div class="flex justify-between text-lg"${_scopeId}><span class="font-semibold text-gray-900 dark:text-white"${_scopeId}>Total</span><span class="font-bold text-primary"${_scopeId}>${ssrInterpolate(formatPrice(grandTotal.value))}</span></div></div>`);
          } else {
            return [
              createVNode("div", { class: "space-y-3" }, [
                createVNode("div", { class: "flex justify-between" }, [
                  createVNode(
                    "span",
                    { class: "text-gray-600 dark:text-gray-400" },
                    "Subtotal (" + toDisplayString(__props.totalItems) + " item)",
                    1
                    /* TEXT */
                  ),
                  createVNode(
                    "span",
                    { class: "font-medium text-gray-900 dark:text-white" },
                    toDisplayString(formatPrice(__props.subtotal)),
                    1
                    /* TEXT */
                  )
                ]),
                createVNode("div", { class: "flex justify-between" }, [
                  createVNode("span", { class: "text-gray-600 dark:text-gray-400" }, "Total Ongkos Kirim"),
                  createVNode(
                    "span",
                    { class: "font-medium text-gray-900 dark:text-white" },
                    toDisplayString(formatPrice(__props.totalShipping)),
                    1
                    /* TEXT */
                  )
                ]),
                createVNode(_component_USeparator),
                createVNode("div", { class: "flex justify-between text-lg" }, [
                  createVNode("span", { class: "font-semibold text-gray-900 dark:text-white" }, "Total"),
                  createVNode(
                    "span",
                    { class: "font-bold text-primary" },
                    toDisplayString(formatPrice(grandTotal.value)),
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
      _push(`</div>`);
    };
  }
});

const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("inertia/components/checkout/CheckoutSummaryCard.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};

const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "CheckoutAddressModal",
  __ssrInlineRender: true,
  props: {
    open: { type: Boolean },
    defaultName: {},
    defaultPhone: {},
    isFirstAddress: { type: Boolean }
  },
  emits: ["update:open", "saved"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const form = ref({
      label: "",
      recipientName: props.defaultName || "",
      phone: props.defaultPhone || "",
      addressLine1: "",
      addressLine2: "",
      provinceId: "",
      provinceName: "",
      cityId: "",
      cityName: "",
      districtId: "",
      districtName: "",
      postalCode: "",
      isDefault: props.isFirstAddress || false
    });
    const provinces = ref([]);
    const cities = ref([]);
    const districts = ref([]);
    const loadingProvinces = ref(false);
    const loadingCities = ref(false);
    const loadingDistricts = ref(false);
    const saving = ref(false);
    const error = ref(null);
    const getXsrfToken = () => {
      if (typeof document === "undefined") return null;
      const match = document.cookie.match(/XSRF-TOKEN=([^;]+)/);
      return match ? decodeURIComponent(match[1]) : null;
    };
    const fetchProvinces = async () => {
      loadingProvinces.value = true;
      try {
        const xsrfToken = getXsrfToken();
        const response = await fetch("/api/location/provinces", {
          headers: {
            "X-Requested-With": "XMLHttpRequest",
            ...xsrfToken && { "X-XSRF-TOKEN": xsrfToken }
          },
          credentials: "include"
        });
        const result = await response.json();
        if (result.success) {
          provinces.value = result.data || [];
        }
      } catch (err) {
        console.error("Error fetching provinces:", err);
      } finally {
        loadingProvinces.value = false;
      }
    };
    const fetchCities = async (provinceId) => {
      loadingCities.value = true;
      cities.value = [];
      districts.value = [];
      form.value.cityId = "";
      form.value.cityName = "";
      form.value.districtId = "";
      form.value.districtName = "";
      try {
        const xsrfToken = getXsrfToken();
        const response = await fetch(`/api/location/cities?provinceId=${provinceId}`, {
          headers: {
            "X-Requested-With": "XMLHttpRequest",
            ...xsrfToken && { "X-XSRF-TOKEN": xsrfToken }
          },
          credentials: "include"
        });
        const result = await response.json();
        if (result.success) {
          cities.value = result.data || [];
        }
      } catch (err) {
        console.error("Error fetching cities:", err);
      } finally {
        loadingCities.value = false;
      }
    };
    const fetchDistricts = async (cityId) => {
      loadingDistricts.value = true;
      districts.value = [];
      form.value.districtId = "";
      form.value.districtName = "";
      try {
        const xsrfToken = getXsrfToken();
        const response = await fetch(`/api/location/districts?cityId=${cityId}`, {
          headers: {
            "X-Requested-With": "XMLHttpRequest",
            ...xsrfToken && { "X-XSRF-TOKEN": xsrfToken }
          },
          credentials: "include"
        });
        const result = await response.json();
        if (result.success) {
          districts.value = result.data || [];
        }
      } catch (err) {
        console.error("Error fetching districts:", err);
      } finally {
        loadingDistricts.value = false;
      }
    };
    const saveAddress = async () => {
      error.value = null;
      if (!form.value.recipientName || !form.value.phone || !form.value.addressLine1 || !form.value.provinceId || !form.value.cityId || !form.value.postalCode) {
        error.value = "Mohon lengkapi semua field yang diperlukan";
        return;
      }
      saving.value = true;
      try {
        const xsrfToken = getXsrfToken();
        const response = await fetch("/api/address", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-Requested-With": "XMLHttpRequest",
            ...xsrfToken && { "X-XSRF-TOKEN": xsrfToken }
          },
          credentials: "include",
          body: JSON.stringify(form.value)
        });
        const result = await response.json();
        if (result.success) {
          emit("saved");
          emit("update:open", false);
        } else {
          error.value = result.message || "Gagal menyimpan alamat";
        }
      } catch (err) {
        console.error("Error saving address:", err);
        error.value = "Gagal menyimpan alamat";
      } finally {
        saving.value = false;
      }
    };
    const close = () => {
      emit("update:open", false);
    };
    const resetForm = () => {
      form.value = {
        label: "",
        recipientName: props.defaultName || "",
        phone: props.defaultPhone || "",
        addressLine1: "",
        addressLine2: "",
        provinceId: "",
        provinceName: "",
        cityId: "",
        cityName: "",
        districtId: "",
        districtName: "",
        postalCode: "",
        isDefault: props.isFirstAddress || false
      };
      error.value = null;
    };
    const provinceOptions = computed(
      () => provinces.value.map((p) => ({
        label: p.name,
        value: String(p.id)
      }))
    );
    const cityOptions = computed(
      () => cities.value.map((c) => ({
        label: c.type ? `${c.type} ${c.name}` : c.name,
        value: String(c.id)
      }))
    );
    const districtOptions = computed(
      () => districts.value.map((d) => ({
        label: d.name,
        value: String(d.id)
      }))
    );
    watch(() => form.value.provinceId, (newVal) => {
      if (newVal) {
        const province = provinces.value.find((p) => String(p.id) === newVal);
        form.value.provinceName = province?.name || "";
        fetchCities(newVal);
      }
    });
    watch(() => form.value.cityId, (newVal) => {
      if (newVal) {
        const city = cities.value.find((c) => String(c.id) === newVal);
        form.value.cityName = city ? city.type ? `${city.type} ${city.name}` : city.name : "";
        fetchDistricts(newVal);
      }
    });
    watch(() => form.value.districtId, (newVal) => {
      if (newVal) {
        const district = districts.value.find((d) => String(d.id) === newVal);
        form.value.districtName = district?.name || "";
      }
    });
    watch(() => props.open, (isOpen) => {
      if (isOpen) {
        resetForm();
        if (provinces.value.length === 0) {
          fetchProvinces();
        }
      }
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UModal = _sfc_main$a;
      const _component_UAlert = _sfc_main$b;
      const _component_UFormField = _sfc_main$c;
      const _component_UInput = _sfc_main$d;
      const _component_USelectMenu = _sfc_main$e;
      const _component_UTextarea = _sfc_main$f;
      const _component_UCheckbox = _sfc_main$g;
      const _component_UButton = _sfc_main$7;
      _push(ssrRenderComponent(_component_UModal, mergeProps({
        open: __props.open,
        "onUpdate:open": ($event) => emit("update:open", $event),
        title: "Tambah Alamat Baru",
        description: "Isi form berikut untuk menambahkan alamat pengiriman baru",
        ui: { overlay: "z-[100]", content: "z-[100]" }
      }, _attrs), {
        body: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="space-y-4 max-h-[60vh] overflow-y-auto overflow-x-visible p-4"${_scopeId}>`);
            if (error.value) {
              _push2(ssrRenderComponent(_component_UAlert, {
                color: "error",
                title: error.value,
                icon: "i-heroicons-exclamation-circle"
              }, null, _parent2, _scopeId));
            } else {
              _push2(`<!---->`);
            }
            _push2(ssrRenderComponent(_component_UFormField, { label: "Label Alamat" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_UInput, {
                    modelValue: form.value.label,
                    "onUpdate:modelValue": ($event) => form.value.label = $event,
                    placeholder: "Contoh: Rumah, Kantor",
                    class: "w-full"
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_UInput, {
                      modelValue: form.value.label,
                      "onUpdate:modelValue": ($event) => form.value.label = $event,
                      placeholder: "Contoh: Rumah, Kantor",
                      class: "w-full"
                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                  ];
                }
              }),
              _: 1
              /* STABLE */
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_UFormField, {
              label: "Nama Penerima",
              required: ""
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_UInput, {
                    modelValue: form.value.recipientName,
                    "onUpdate:modelValue": ($event) => form.value.recipientName = $event,
                    placeholder: "Nama lengkap penerima",
                    class: "w-full"
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_UInput, {
                      modelValue: form.value.recipientName,
                      "onUpdate:modelValue": ($event) => form.value.recipientName = $event,
                      placeholder: "Nama lengkap penerima",
                      class: "w-full"
                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                  ];
                }
              }),
              _: 1
              /* STABLE */
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_UFormField, {
              label: "No. Telepon",
              required: ""
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_UInput, {
                    modelValue: form.value.phone,
                    "onUpdate:modelValue": ($event) => form.value.phone = $event,
                    placeholder: "08xxxxxxxxxx",
                    type: "tel",
                    class: "w-full"
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_UInput, {
                      modelValue: form.value.phone,
                      "onUpdate:modelValue": ($event) => form.value.phone = $event,
                      placeholder: "08xxxxxxxxxx",
                      type: "tel",
                      class: "w-full"
                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                  ];
                }
              }),
              _: 1
              /* STABLE */
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_UFormField, {
              label: "Provinsi",
              required: ""
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_USelectMenu, {
                    modelValue: form.value.provinceId,
                    "onUpdate:modelValue": ($event) => form.value.provinceId = $event,
                    items: provinceOptions.value,
                    placeholder: "Pilih Provinsi",
                    loading: loadingProvinces.value,
                    "value-key": "value",
                    ui: { content: "z-[200] bg-white dark:bg-gray-900" },
                    class: "w-full"
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_USelectMenu, {
                      modelValue: form.value.provinceId,
                      "onUpdate:modelValue": ($event) => form.value.provinceId = $event,
                      items: provinceOptions.value,
                      placeholder: "Pilih Provinsi",
                      loading: loadingProvinces.value,
                      "value-key": "value",
                      ui: { content: "z-[200] bg-white dark:bg-gray-900" },
                      class: "w-full"
                    }, null, 8, ["modelValue", "onUpdate:modelValue", "items", "loading"])
                  ];
                }
              }),
              _: 1
              /* STABLE */
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_UFormField, {
              label: "Kota/Kabupaten",
              required: ""
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_USelectMenu, {
                    modelValue: form.value.cityId,
                    "onUpdate:modelValue": ($event) => form.value.cityId = $event,
                    items: cityOptions.value,
                    placeholder: "Pilih Kota/Kabupaten",
                    loading: loadingCities.value,
                    disabled: !form.value.provinceId,
                    "value-key": "value",
                    ui: { content: "z-[200] bg-white dark:bg-gray-900" },
                    class: "w-full"
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_USelectMenu, {
                      modelValue: form.value.cityId,
                      "onUpdate:modelValue": ($event) => form.value.cityId = $event,
                      items: cityOptions.value,
                      placeholder: "Pilih Kota/Kabupaten",
                      loading: loadingCities.value,
                      disabled: !form.value.provinceId,
                      "value-key": "value",
                      ui: { content: "z-[200] bg-white dark:bg-gray-900" },
                      class: "w-full"
                    }, null, 8, ["modelValue", "onUpdate:modelValue", "items", "loading", "disabled"])
                  ];
                }
              }),
              _: 1
              /* STABLE */
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_UFormField, {
              label: "Kecamatan",
              required: ""
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_USelectMenu, {
                    modelValue: form.value.districtId,
                    "onUpdate:modelValue": ($event) => form.value.districtId = $event,
                    items: districtOptions.value,
                    placeholder: "Pilih Kecamatan",
                    loading: loadingDistricts.value,
                    disabled: !form.value.cityId,
                    "value-key": "value",
                    ui: { content: "z-[200] bg-white dark:bg-gray-900" },
                    class: "w-full"
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_USelectMenu, {
                      modelValue: form.value.districtId,
                      "onUpdate:modelValue": ($event) => form.value.districtId = $event,
                      items: districtOptions.value,
                      placeholder: "Pilih Kecamatan",
                      loading: loadingDistricts.value,
                      disabled: !form.value.cityId,
                      "value-key": "value",
                      ui: { content: "z-[200] bg-white dark:bg-gray-900" },
                      class: "w-full"
                    }, null, 8, ["modelValue", "onUpdate:modelValue", "items", "loading", "disabled"])
                  ];
                }
              }),
              _: 1
              /* STABLE */
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_UFormField, {
              label: "Alamat Lengkap",
              required: ""
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_UTextarea, {
                    modelValue: form.value.addressLine1,
                    "onUpdate:modelValue": ($event) => form.value.addressLine1 = $event,
                    placeholder: "Nama jalan, nomor rumah, RT/RW",
                    rows: 2,
                    class: "w-full"
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_UTextarea, {
                      modelValue: form.value.addressLine1,
                      "onUpdate:modelValue": ($event) => form.value.addressLine1 = $event,
                      placeholder: "Nama jalan, nomor rumah, RT/RW",
                      rows: 2,
                      class: "w-full"
                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                  ];
                }
              }),
              _: 1
              /* STABLE */
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_UFormField, { label: "Detail Tambahan" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_UInput, {
                    modelValue: form.value.addressLine2,
                    "onUpdate:modelValue": ($event) => form.value.addressLine2 = $event,
                    placeholder: "Patokan, nama gedung, dll (opsional)",
                    class: "w-full"
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_UInput, {
                      modelValue: form.value.addressLine2,
                      "onUpdate:modelValue": ($event) => form.value.addressLine2 = $event,
                      placeholder: "Patokan, nama gedung, dll (opsional)",
                      class: "w-full"
                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                  ];
                }
              }),
              _: 1
              /* STABLE */
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_UFormField, {
              label: "Kode Pos",
              required: ""
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_UInput, {
                    modelValue: form.value.postalCode,
                    "onUpdate:modelValue": ($event) => form.value.postalCode = $event,
                    placeholder: "12345",
                    class: "w-full"
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_UInput, {
                      modelValue: form.value.postalCode,
                      "onUpdate:modelValue": ($event) => form.value.postalCode = $event,
                      placeholder: "12345",
                      class: "w-full"
                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                  ];
                }
              }),
              _: 1
              /* STABLE */
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_UCheckbox, {
              modelValue: form.value.isDefault,
              "onUpdate:modelValue": ($event) => form.value.isDefault = $event,
              label: "Jadikan alamat utama",
              class: "w-full"
            }, null, _parent2, _scopeId));
            _push2(`</div>`);
          } else {
            return [
              createVNode("div", { class: "space-y-4 max-h-[60vh] overflow-y-auto overflow-x-visible p-4" }, [
                error.value ? (openBlock(), createBlock(_component_UAlert, {
                  key: 0,
                  color: "error",
                  title: error.value,
                  icon: "i-heroicons-exclamation-circle"
                }, null, 8, ["title"])) : createCommentVNode("v-if", true),
                createVNode(_component_UFormField, { label: "Label Alamat" }, {
                  default: withCtx(() => [
                    createVNode(_component_UInput, {
                      modelValue: form.value.label,
                      "onUpdate:modelValue": ($event) => form.value.label = $event,
                      placeholder: "Contoh: Rumah, Kantor",
                      class: "w-full"
                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                  ]),
                  _: 1
                  /* STABLE */
                }),
                createVNode(_component_UFormField, {
                  label: "Nama Penerima",
                  required: ""
                }, {
                  default: withCtx(() => [
                    createVNode(_component_UInput, {
                      modelValue: form.value.recipientName,
                      "onUpdate:modelValue": ($event) => form.value.recipientName = $event,
                      placeholder: "Nama lengkap penerima",
                      class: "w-full"
                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                  ]),
                  _: 1
                  /* STABLE */
                }),
                createVNode(_component_UFormField, {
                  label: "No. Telepon",
                  required: ""
                }, {
                  default: withCtx(() => [
                    createVNode(_component_UInput, {
                      modelValue: form.value.phone,
                      "onUpdate:modelValue": ($event) => form.value.phone = $event,
                      placeholder: "08xxxxxxxxxx",
                      type: "tel",
                      class: "w-full"
                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                  ]),
                  _: 1
                  /* STABLE */
                }),
                createVNode(_component_UFormField, {
                  label: "Provinsi",
                  required: ""
                }, {
                  default: withCtx(() => [
                    createVNode(_component_USelectMenu, {
                      modelValue: form.value.provinceId,
                      "onUpdate:modelValue": ($event) => form.value.provinceId = $event,
                      items: provinceOptions.value,
                      placeholder: "Pilih Provinsi",
                      loading: loadingProvinces.value,
                      "value-key": "value",
                      ui: { content: "z-[200] bg-white dark:bg-gray-900" },
                      class: "w-full"
                    }, null, 8, ["modelValue", "onUpdate:modelValue", "items", "loading"])
                  ]),
                  _: 1
                  /* STABLE */
                }),
                createVNode(_component_UFormField, {
                  label: "Kota/Kabupaten",
                  required: ""
                }, {
                  default: withCtx(() => [
                    createVNode(_component_USelectMenu, {
                      modelValue: form.value.cityId,
                      "onUpdate:modelValue": ($event) => form.value.cityId = $event,
                      items: cityOptions.value,
                      placeholder: "Pilih Kota/Kabupaten",
                      loading: loadingCities.value,
                      disabled: !form.value.provinceId,
                      "value-key": "value",
                      ui: { content: "z-[200] bg-white dark:bg-gray-900" },
                      class: "w-full"
                    }, null, 8, ["modelValue", "onUpdate:modelValue", "items", "loading", "disabled"])
                  ]),
                  _: 1
                  /* STABLE */
                }),
                createVNode(_component_UFormField, {
                  label: "Kecamatan",
                  required: ""
                }, {
                  default: withCtx(() => [
                    createVNode(_component_USelectMenu, {
                      modelValue: form.value.districtId,
                      "onUpdate:modelValue": ($event) => form.value.districtId = $event,
                      items: districtOptions.value,
                      placeholder: "Pilih Kecamatan",
                      loading: loadingDistricts.value,
                      disabled: !form.value.cityId,
                      "value-key": "value",
                      ui: { content: "z-[200] bg-white dark:bg-gray-900" },
                      class: "w-full"
                    }, null, 8, ["modelValue", "onUpdate:modelValue", "items", "loading", "disabled"])
                  ]),
                  _: 1
                  /* STABLE */
                }),
                createVNode(_component_UFormField, {
                  label: "Alamat Lengkap",
                  required: ""
                }, {
                  default: withCtx(() => [
                    createVNode(_component_UTextarea, {
                      modelValue: form.value.addressLine1,
                      "onUpdate:modelValue": ($event) => form.value.addressLine1 = $event,
                      placeholder: "Nama jalan, nomor rumah, RT/RW",
                      rows: 2,
                      class: "w-full"
                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                  ]),
                  _: 1
                  /* STABLE */
                }),
                createVNode(_component_UFormField, { label: "Detail Tambahan" }, {
                  default: withCtx(() => [
                    createVNode(_component_UInput, {
                      modelValue: form.value.addressLine2,
                      "onUpdate:modelValue": ($event) => form.value.addressLine2 = $event,
                      placeholder: "Patokan, nama gedung, dll (opsional)",
                      class: "w-full"
                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                  ]),
                  _: 1
                  /* STABLE */
                }),
                createVNode(_component_UFormField, {
                  label: "Kode Pos",
                  required: ""
                }, {
                  default: withCtx(() => [
                    createVNode(_component_UInput, {
                      modelValue: form.value.postalCode,
                      "onUpdate:modelValue": ($event) => form.value.postalCode = $event,
                      placeholder: "12345",
                      class: "w-full"
                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                  ]),
                  _: 1
                  /* STABLE */
                }),
                createVNode(_component_UCheckbox, {
                  modelValue: form.value.isDefault,
                  "onUpdate:modelValue": ($event) => form.value.isDefault = $event,
                  label: "Jadikan alamat utama",
                  class: "w-full"
                }, null, 8, ["modelValue", "onUpdate:modelValue"])
              ])
            ];
          }
        }),
        footer: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="flex justify-end gap-3 p-4"${_scopeId}>`);
            _push2(ssrRenderComponent(_component_UButton, {
              variant: "ghost",
              onClick: close
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`Batal`);
                } else {
                  return [
                    createTextVNode("Batal")
                  ];
                }
              }),
              _: 1
              /* STABLE */
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_UButton, {
              loading: saving.value,
              onClick: saveAddress
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`Simpan Alamat`);
                } else {
                  return [
                    createTextVNode("Simpan Alamat")
                  ];
                }
              }),
              _: 1
              /* STABLE */
            }, _parent2, _scopeId));
            _push2(`</div>`);
          } else {
            return [
              createVNode("div", { class: "flex justify-end gap-3 p-4" }, [
                createVNode(_component_UButton, {
                  variant: "ghost",
                  onClick: close
                }, {
                  default: withCtx(() => [
                    createTextVNode("Batal")
                  ]),
                  _: 1
                  /* STABLE */
                }),
                createVNode(_component_UButton, {
                  loading: saving.value,
                  onClick: saveAddress
                }, {
                  default: withCtx(() => [
                    createTextVNode("Simpan Alamat")
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
    };
  }
});

const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("inertia/components/checkout/CheckoutAddressModal.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};

const _sfc_main = /* @__PURE__ */ defineComponent({
  ...{ layout: _sfc_main$h },
  __name: "index",
  __ssrInlineRender: true,
  props: {
    addresses: {},
    items: {},
    summary: {},
    customer: {}
  },
  setup(__props) {
    const props = __props;
    const toast = useToast();
    const { openSnapPopup, isSnapLoaded } = useMidtrans();
    const selectedAddressId = ref(
      props.addresses.find((a) => a.isDefault)?.id || props.addresses[0]?.id || null
    );
    const selectedShipping = ref(null);
    const notes = ref("");
    const isProcessing = ref(false);
    const showAddressModal = ref(false);
    const selectedAddress = computed(() => {
      return props.addresses.find((a) => a.id === selectedAddressId.value);
    });
    const destinationDistrictId = computed(() => {
      return selectedAddress.value?.districtId || null;
    });
    const totalShipping = computed(() => {
      return selectedShipping.value?.cost || 0;
    });
    const canCheckout = computed(() => {
      if (!selectedAddressId.value) return false;
      if (props.items.length === 0) return false;
      if (!selectedShipping.value) return false;
      return true;
    });
    const getXsrfToken = () => {
      if (typeof document === "undefined") return null;
      const match = document.cookie.match(/XSRF-TOKEN=([^;]+)/);
      return match ? decodeURIComponent(match[1]) : null;
    };
    const handleShippingUpdate = (shipping) => {
      selectedShipping.value = shipping;
    };
    const handleAddressChange = (addressId) => {
      selectedAddressId.value = addressId;
      selectedShipping.value = null;
    };
    const handleAddressSaved = () => {
      toast.success("Alamat berhasil ditambahkan");
      router.reload({ only: ["addresses"] });
    };
    const processCheckout = async () => {
      if (!canCheckout.value) {
        toast.error("Mohon pilih alamat dan metode pengiriman");
        return;
      }
      isProcessing.value = true;
      try {
        const xsrfToken = getXsrfToken();
        const response = await fetch("/api/checkout", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-Requested-With": "XMLHttpRequest",
            ...xsrfToken && { "X-XSRF-TOKEN": xsrfToken }
          },
          credentials: "include",
          body: JSON.stringify({
            addressId: selectedAddressId.value,
            shipping: selectedShipping.value,
            notes: notes.value
          })
        });
        const result = await response.json();
        if (result.success && result.data?.payment?.snapToken) {
          if (isSnapLoaded()) {
            await openSnapPopup(result.data.payment.snapToken, {
              onSuccess: async (midtransResult) => {
                if (result.data.order?.id) {
                  await fetch(`/api/orders/${result.data.order.id}/verify-payment`, {
                    method: "POST",
                    headers: {
                      "Content-Type": "application/json",
                      "X-Requested-With": "XMLHttpRequest",
                      ...xsrfToken && { "X-XSRF-TOKEN": xsrfToken }
                    },
                    credentials: "include",
                    body: JSON.stringify({
                      transactionStatus: midtransResult?.transaction_status || "settlement",
                      transactionId: midtransResult?.transaction_id
                    })
                  });
                }
                toast.success("Pembayaran berhasil!");
                router.visit("/orders");
              },
              onPending: async (midtransResult) => {
                if (result.data.order?.id) {
                  await fetch(`/api/orders/${result.data.order.id}/verify-payment`, {
                    method: "POST",
                    headers: {
                      "Content-Type": "application/json",
                      "X-Requested-With": "XMLHttpRequest",
                      ...xsrfToken && { "X-XSRF-TOKEN": xsrfToken }
                    },
                    credentials: "include",
                    body: JSON.stringify({
                      transactionStatus: midtransResult?.transaction_status || "pending",
                      transactionId: midtransResult?.transaction_id
                    })
                  });
                }
                toast.info("Menunggu pembayaran...");
                router.visit("/orders");
              },
              onError: (res) => {
                toast.error(res.status_message || "Pembayaran gagal");
                router.visit("/orders");
              },
              onClose: () => {
                toast.info("Pembayaran dibatalkan. Silakan selesaikan pembayaran melalui halaman pesanan.");
                router.visit("/orders");
              }
            });
          } else {
            window.location.href = result.data.payment.snapRedirectUrl;
          }
        } else {
          toast.error(result.message || "Gagal memproses checkout");
        }
      } catch (error) {
        console.error("Checkout error:", error);
        toast.error("Terjadi kesalahan saat memproses checkout");
      } finally {
        isProcessing.value = false;
      }
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UIcon = _sfc_main$6;
      const _component_UButton = _sfc_main$7;
      const _component_UCard = _sfc_main$5;
      const _component_UTextarea = _sfc_main$f;
      _push(`<!--[-->`);
      _push(ssrRenderComponent(unref(Head), { title: "Checkout - Ogitu" }, null, _parent));
      _push(`<div class="min-h-screen bg-gray-50 dark:bg-gray-900 py-8"><div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"><!-- Header --><div class="mb-8"><h1 class="text-2xl font-bold text-gray-900 dark:text-white">Checkout</h1><p class="text-gray-500 dark:text-gray-400 mt-1">${ssrInterpolate(__props.summary.totalItems)} item dalam pesanan</p></div><!-- Empty State -->`);
      if (__props.items.length === 0) {
        _push(`<div class="text-center py-16">`);
        _push(ssrRenderComponent(_component_UIcon, {
          name: "i-heroicons-shopping-cart",
          class: "w-16 h-16 mx-auto text-gray-300 dark:text-gray-600"
        }, null, _parent));
        _push(`<h2 class="mt-4 text-xl font-semibold text-gray-900 dark:text-white">Tidak ada item untuk checkout</h2><p class="mt-2 text-gray-500 dark:text-gray-400">Pilih item dari keranjang terlebih dahulu</p>`);
        _push(ssrRenderComponent(_component_UButton, {
          to: "/cart",
          class: "mt-4"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(` Kembali ke Keranjang `);
            } else {
              return [
                createTextVNode(" Kembali ke Keranjang ")
              ];
            }
          }),
          _: 1
          /* STABLE */
        }, _parent));
        _push(`</div>`);
      } else {
        _push(`<!--[--><!-- Checkout Content --><div class="grid grid-cols-1 lg:grid-cols-3 gap-8"><!-- Left Column - Items & Shipping --><div class="lg:col-span-2 space-y-6"><!-- Address Section -->`);
        _push(ssrRenderComponent(_sfc_main$4, {
          addresses: __props.addresses,
          "selected-address-id": selectedAddressId.value,
          "onUpdate:selectedAddressId": handleAddressChange,
          onAddAddress: ($event) => showAddressModal.value = true
        }, null, _parent));
        _push(`<!-- Items & Shipping -->`);
        _push(ssrRenderComponent(_sfc_main$3, {
          items: __props.items,
          "total-weight": __props.summary.totalWeight,
          subtotal: __props.summary.subtotal,
          "destination-district-id": destinationDistrictId.value,
          "selected-shipping": selectedShipping.value,
          "onUpdate:selectedShipping": handleShippingUpdate
        }, null, _parent));
        _push(`<!-- Notes -->`);
        _push(ssrRenderComponent(_component_UCard, null, {
          header: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<h3 class="font-semibold text-gray-900 dark:text-white"${_scopeId}>Catatan (Opsional)</h3>`);
            } else {
              return [
                createVNode("h3", { class: "font-semibold text-gray-900 dark:text-white" }, "Catatan (Opsional)")
              ];
            }
          }),
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(_component_UTextarea, {
                modelValue: notes.value,
                "onUpdate:modelValue": ($event) => notes.value = $event,
                placeholder: "Tambahkan catatan untuk pesanan Anda...",
                rows: 3
              }, null, _parent2, _scopeId));
            } else {
              return [
                createVNode(_component_UTextarea, {
                  modelValue: notes.value,
                  "onUpdate:modelValue": ($event) => notes.value = $event,
                  placeholder: "Tambahkan catatan untuk pesanan Anda...",
                  rows: 3
                }, null, 8, ["modelValue", "onUpdate:modelValue"])
              ];
            }
          }),
          _: 1
          /* STABLE */
        }, _parent));
        _push(`</div><!-- Right Column - Summary --><div class="lg:col-span-1">`);
        _push(ssrRenderComponent(_sfc_main$2, {
          subtotal: __props.summary.subtotal,
          "total-items": __props.summary.totalItems,
          "total-shipping": totalShipping.value,
          "can-checkout": canCheckout.value,
          "is-processing": isProcessing.value,
          onCheckout: processCheckout
        }, null, _parent));
        _push(`</div></div><!--]-->`);
      }
      _push(`</div></div><!-- Add Address Modal -->`);
      _push(ssrRenderComponent(_sfc_main$1, {
        open: showAddressModal.value,
        "onUpdate:open": ($event) => showAddressModal.value = $event,
        "default-name": __props.customer.fullName,
        "default-phone": __props.customer.phone,
        "is-first-address": __props.addresses.length === 0,
        onSaved: handleAddressSaved
      }, null, _parent));
      _push(`<!--]-->`);
    };
  }
});

const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("inertia/pages/checkout/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
