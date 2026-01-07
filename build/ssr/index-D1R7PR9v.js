import { a as _sfc_main$1, _ as _sfc_main$6 } from './Button-BTdvmZ8N.js';
import { _ as _sfc_main$5 } from './DropdownMenu-Zcq6i1qV.js';
import { a as _sfc_main$4 } from './Badge-CQlYH3Fo.js';
import { _ as _sfc_main$3 } from './Card-h3oZeDee.js';
import { _ as _sfc_main$2 } from './Alert-B0mCzyXY.js';
import { defineComponent, unref, withCtx, createTextVNode, createVNode, createCommentVNode, createBlock, openBlock, toDisplayString, useSSRContext } from 'vue';
import { ssrRenderComponent, ssrRenderList, ssrInterpolate } from 'vue/server-renderer';
import { Head, router } from '@inertiajs/vue3';
import { A as AdminLayout } from './admin-ELJtfEoX.js';
import 'defu';
import 'reka-ui';
import './virtual_nuxt-ui-plugins-CrG8Uaxr.js';
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
import './Tooltip-C54KurGy.js';

const _sfc_main = /* @__PURE__ */ defineComponent({
  ...{ layout: AdminLayout },
  __name: "index",
  __ssrInlineRender: true,
  props: {
    addresses: {}
  },
  setup(__props) {
    const props = __props;
    const formatPhone = (phone) => {
      if (!phone) return "-";
      return phone.replace(/(\d{4})(\d{4})(\d+)/, "$1-$2-$3");
    };
    const handleSetDefault = (address) => {
      router.post(`/admin/settings/address/${address.id}/default`);
    };
    const handleToggleActive = (address) => {
      router.post(`/admin/settings/address/${address.id}/toggle`);
    };
    const handleDelete = (address) => {
      if (confirm(`Hapus alamat "${address.name}"?`)) {
        router.delete(`/admin/settings/address/${address.id}`);
      }
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UButton = _sfc_main$1;
      const _component_UAlert = _sfc_main$2;
      const _component_UCard = _sfc_main$3;
      const _component_UBadge = _sfc_main$4;
      const _component_UDropdownMenu = _sfc_main$5;
      const _component_UIcon = _sfc_main$6;
      _push(`<!--[-->`);
      _push(ssrRenderComponent(unref(Head), { title: "Alamat & Gudang" }, null, _parent));
      _push(`<div class="space-y-6"><!-- Header --><div class="flex items-center justify-between"><div><h1 class="text-2xl font-bold text-gray-900 dark:text-white">Alamat &amp; Gudang</h1><p class="mt-1 text-sm text-gray-500 dark:text-gray-400"> Kelola alamat gudang/toko untuk pengiriman produk </p></div>`);
      _push(ssrRenderComponent(_component_UButton, {
        icon: "i-heroicons-plus",
        label: "Tambah Alamat",
        color: "primary",
        onClick: ($event) => unref(router).visit("/admin/settings/address/create")
      }, null, _parent));
      _push(`</div><!-- Info Box -->`);
      _push(ssrRenderComponent(_component_UAlert, {
        icon: "i-heroicons-information-circle",
        color: "info",
        title: "Alamat Pengiriman",
        description: "Alamat default akan digunakan sebagai lokasi asal untuk menghitung ongkos kirim. Pastikan alamat lengkap sampai tingkat kecamatan agar perhitungan ongkir akurat."
      }, null, _parent));
      _push(`<!-- Address List -->`);
      if (props.addresses.length > 0) {
        _push(`<div class="grid gap-4 md:grid-cols-2"><!--[-->`);
        ssrRenderList(props.addresses, (address) => {
          _push(ssrRenderComponent(_component_UCard, {
            key: address.id,
            class: [
              "relative",
              address.isDefault ? "ring-2 ring-primary-500" : "",
              !address.isActive ? "opacity-60" : ""
            ]
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`<!-- Default Badge -->`);
                if (address.isDefault) {
                  _push2(`<div class="absolute -top-2 -right-2"${_scopeId}>`);
                  _push2(ssrRenderComponent(_component_UBadge, {
                    color: "primary",
                    size: "sm"
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
                  _push2(`</div>`);
                } else {
                  _push2(`<!---->`);
                }
                _push2(`<!-- Inactive Badge -->`);
                if (!address.isActive) {
                  _push2(`<div class="absolute -top-2 left-2"${_scopeId}>`);
                  _push2(ssrRenderComponent(_component_UBadge, {
                    color: "neutral",
                    size: "sm"
                  }, {
                    default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                      if (_push3) {
                        _push3(`Nonaktif`);
                      } else {
                        return [
                          createTextVNode("Nonaktif")
                        ];
                      }
                    }),
                    _: 2
                    /* DYNAMIC */
                  }, _parent2, _scopeId));
                  _push2(`</div>`);
                } else {
                  _push2(`<!---->`);
                }
                _push2(`<div class="space-y-4"${_scopeId}><!-- Header --><div class="flex items-start justify-between"${_scopeId}><div${_scopeId}><h3 class="font-semibold text-gray-900 dark:text-white"${_scopeId}>${ssrInterpolate(address.name)}</h3><p class="text-sm text-gray-500 dark:text-gray-400"${_scopeId}>${ssrInterpolate(address.contactName)} • ${ssrInterpolate(formatPhone(address.phone))}</p></div>`);
                _push2(ssrRenderComponent(_component_UDropdownMenu, {
                  items: [
                    [
                      {
                        label: "Edit",
                        icon: "i-heroicons-pencil",
                        click: () => unref(router).visit(`/admin/settings/address/${address.id}/edit`)
                      },
                      {
                        label: address.isDefault ? "Sudah Default" : "Jadikan Default",
                        icon: "i-heroicons-star",
                        disabled: address.isDefault,
                        click: () => handleSetDefault(address)
                      },
                      {
                        label: address.isActive ? "Nonaktifkan" : "Aktifkan",
                        icon: address.isActive ? "i-heroicons-eye-slash" : "i-heroicons-eye",
                        disabled: address.isDefault && address.isActive,
                        click: () => handleToggleActive(address)
                      }
                    ],
                    [
                      {
                        label: "Hapus",
                        icon: "i-heroicons-trash",
                        color: "error",
                        click: () => handleDelete(address)
                      }
                    ]
                  ]
                }, {
                  default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      _push3(ssrRenderComponent(_component_UButton, {
                        icon: "i-heroicons-ellipsis-vertical",
                        color: "neutral",
                        variant: "ghost",
                        size: "sm"
                      }, null, _parent3, _scopeId2));
                    } else {
                      return [
                        createVNode(_component_UButton, {
                          icon: "i-heroicons-ellipsis-vertical",
                          color: "neutral",
                          variant: "ghost",
                          size: "sm"
                        })
                      ];
                    }
                  }),
                  _: 2
                  /* DYNAMIC */
                }, _parent2, _scopeId));
                _push2(`</div><!-- Address --><div class="text-sm text-gray-600 dark:text-gray-300"${_scopeId}><p${_scopeId}>${ssrInterpolate(address.addressLine1)}</p>`);
                if (address.addressLine2) {
                  _push2(`<p${_scopeId}>${ssrInterpolate(address.addressLine2)}</p>`);
                } else {
                  _push2(`<!---->`);
                }
                _push2(`<p${_scopeId}>${ssrInterpolate(address.districtName)}, ${ssrInterpolate(address.cityName)}</p><p${_scopeId}>${ssrInterpolate(address.provinceName)} ${ssrInterpolate(address.postalCode)}</p></div><!-- Location IDs (for debugging) --><div class="flex flex-wrap gap-2 text-xs text-gray-400"${_scopeId}><span${_scopeId}>Kec: ${ssrInterpolate(address.districtId)}</span><span${_scopeId}>•</span><span${_scopeId}>Kota: ${ssrInterpolate(address.cityId)}</span><span${_scopeId}>•</span><span${_scopeId}>Prov: ${ssrInterpolate(address.provinceId)}</span></div></div>`);
              } else {
                return [
                  createCommentVNode(" Default Badge "),
                  address.isDefault ? (openBlock(), createBlock("div", {
                    key: 0,
                    class: "absolute -top-2 -right-2"
                  }, [
                    createVNode(_component_UBadge, {
                      color: "primary",
                      size: "sm"
                    }, {
                      default: withCtx(() => [
                        createTextVNode("Default")
                      ]),
                      _: 1
                      /* STABLE */
                    })
                  ])) : createCommentVNode("v-if", true),
                  createCommentVNode(" Inactive Badge "),
                  !address.isActive ? (openBlock(), createBlock("div", {
                    key: 1,
                    class: "absolute -top-2 left-2"
                  }, [
                    createVNode(_component_UBadge, {
                      color: "neutral",
                      size: "sm"
                    }, {
                      default: withCtx(() => [
                        createTextVNode("Nonaktif")
                      ]),
                      _: 1
                      /* STABLE */
                    })
                  ])) : createCommentVNode("v-if", true),
                  createVNode("div", { class: "space-y-4" }, [
                    createCommentVNode(" Header "),
                    createVNode("div", { class: "flex items-start justify-between" }, [
                      createVNode("div", null, [
                        createVNode(
                          "h3",
                          { class: "font-semibold text-gray-900 dark:text-white" },
                          toDisplayString(address.name),
                          1
                          /* TEXT */
                        ),
                        createVNode(
                          "p",
                          { class: "text-sm text-gray-500 dark:text-gray-400" },
                          toDisplayString(address.contactName) + " • " + toDisplayString(formatPhone(address.phone)),
                          1
                          /* TEXT */
                        )
                      ]),
                      createVNode(_component_UDropdownMenu, {
                        items: [
                          [
                            {
                              label: "Edit",
                              icon: "i-heroicons-pencil",
                              click: () => unref(router).visit(`/admin/settings/address/${address.id}/edit`)
                            },
                            {
                              label: address.isDefault ? "Sudah Default" : "Jadikan Default",
                              icon: "i-heroicons-star",
                              disabled: address.isDefault,
                              click: () => handleSetDefault(address)
                            },
                            {
                              label: address.isActive ? "Nonaktifkan" : "Aktifkan",
                              icon: address.isActive ? "i-heroicons-eye-slash" : "i-heroicons-eye",
                              disabled: address.isDefault && address.isActive,
                              click: () => handleToggleActive(address)
                            }
                          ],
                          [
                            {
                              label: "Hapus",
                              icon: "i-heroicons-trash",
                              color: "error",
                              click: () => handleDelete(address)
                            }
                          ]
                        ]
                      }, {
                        default: withCtx(() => [
                          createVNode(_component_UButton, {
                            icon: "i-heroicons-ellipsis-vertical",
                            color: "neutral",
                            variant: "ghost",
                            size: "sm"
                          })
                        ]),
                        _: 1
                        /* STABLE */
                      }, 8, ["items"])
                    ]),
                    createCommentVNode(" Address "),
                    createVNode("div", { class: "text-sm text-gray-600 dark:text-gray-300" }, [
                      createVNode(
                        "p",
                        null,
                        toDisplayString(address.addressLine1),
                        1
                        /* TEXT */
                      ),
                      address.addressLine2 ? (openBlock(), createBlock(
                        "p",
                        { key: 0 },
                        toDisplayString(address.addressLine2),
                        1
                        /* TEXT */
                      )) : createCommentVNode("v-if", true),
                      createVNode(
                        "p",
                        null,
                        toDisplayString(address.districtName) + ", " + toDisplayString(address.cityName),
                        1
                        /* TEXT */
                      ),
                      createVNode(
                        "p",
                        null,
                        toDisplayString(address.provinceName) + " " + toDisplayString(address.postalCode),
                        1
                        /* TEXT */
                      )
                    ]),
                    createCommentVNode(" Location IDs (for debugging) "),
                    createVNode("div", { class: "flex flex-wrap gap-2 text-xs text-gray-400" }, [
                      createVNode(
                        "span",
                        null,
                        "Kec: " + toDisplayString(address.districtId),
                        1
                        /* TEXT */
                      ),
                      createVNode("span", null, "•"),
                      createVNode(
                        "span",
                        null,
                        "Kota: " + toDisplayString(address.cityId),
                        1
                        /* TEXT */
                      ),
                      createVNode("span", null, "•"),
                      createVNode(
                        "span",
                        null,
                        "Prov: " + toDisplayString(address.provinceId),
                        1
                        /* TEXT */
                      )
                    ])
                  ])
                ];
              }
            }),
            _: 2
            /* DYNAMIC */
          }, _parent));
        });
        _push(`<!--]--></div>`);
      } else {
        _push(`<!--[--><!-- Empty State -->`);
        _push(ssrRenderComponent(_component_UCard, { class: "text-center py-12" }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<div class="flex flex-col items-center"${_scopeId}>`);
              _push2(ssrRenderComponent(_component_UIcon, {
                name: "i-heroicons-map-pin",
                class: "w-12 h-12 text-gray-400 mb-4"
              }, null, _parent2, _scopeId));
              _push2(`<h3 class="text-lg font-medium text-gray-900 dark:text-white mb-2"${_scopeId}> Belum ada alamat </h3><p class="text-gray-500 dark:text-gray-400 mb-4"${_scopeId}> Tambahkan alamat gudang/toko untuk memulai </p>`);
              _push2(ssrRenderComponent(_component_UButton, {
                icon: "i-heroicons-plus",
                label: "Tambah Alamat",
                color: "primary",
                onClick: ($event) => unref(router).visit("/admin/settings/address/create")
              }, null, _parent2, _scopeId));
              _push2(`</div>`);
            } else {
              return [
                createVNode("div", { class: "flex flex-col items-center" }, [
                  createVNode(_component_UIcon, {
                    name: "i-heroicons-map-pin",
                    class: "w-12 h-12 text-gray-400 mb-4"
                  }),
                  createVNode("h3", { class: "text-lg font-medium text-gray-900 dark:text-white mb-2" }, " Belum ada alamat "),
                  createVNode("p", { class: "text-gray-500 dark:text-gray-400 mb-4" }, " Tambahkan alamat gudang/toko untuk memulai "),
                  createVNode(_component_UButton, {
                    icon: "i-heroicons-plus",
                    label: "Tambah Alamat",
                    color: "primary",
                    onClick: ($event) => unref(router).visit("/admin/settings/address/create")
                  }, null, 8, ["onClick"])
                ])
              ];
            }
          }),
          _: 1
          /* STABLE */
        }, _parent));
        _push(`<!--]-->`);
      }
      _push(`</div><!--]-->`);
    };
  }
});

const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("inertia/pages/admin/settings/address/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
