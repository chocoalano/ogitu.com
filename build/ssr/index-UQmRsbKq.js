import { a as _sfc_main$6, _ as _sfc_main$a } from './Badge-CQlYH3Fo.js';
import { _ as _sfc_main$9 } from './FormField-CdECN7pk.js';
import { _ as _sfc_main$8 } from './Switch-eKFRwox7.js';
import { _ as _sfc_main$7 } from './Modal-VctJV7vb.js';
import { _ as _sfc_main$5 } from './DropdownMenu-Zcq6i1qV.js';
import { a as _sfc_main$2, _ as _sfc_main$4 } from './Button-BTdvmZ8N.js';
import { _ as _sfc_main$3 } from './Card-h3oZeDee.js';
import { _ as _sfc_main$1 } from './Alert-B0mCzyXY.js';
import { defineComponent, ref, computed, unref, withCtx, createVNode, toDisplayString, createTextVNode, createCommentVNode, createBlock, openBlock, Fragment, renderList, useSSRContext } from 'vue';
import { ssrRenderComponent, ssrInterpolate, ssrRenderList, ssrRenderAttr, ssrRenderStyle } from 'vue/server-renderer';
import { useForm, Head, router } from '@inertiajs/vue3';
import { A as AdminLayout } from './admin-ELJtfEoX.js';
import 'reka-ui';
import '@vueuse/core';
import './virtual_nuxt-ui-plugins-CrG8Uaxr.js';
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
import './Tooltip-C54KurGy.js';

const _sfc_main = /* @__PURE__ */ defineComponent({
  ...{ layout: AdminLayout },
  __name: "index",
  __ssrInlineRender: true,
  props: {
    couriers: {},
    availableCouriers: {},
    defaultAddress: {}
  },
  setup(__props) {
    const props = __props;
    const showAddCourierModal = ref(false);
    const showEditCourierModal = ref(false);
    const selectedCourier = ref(null);
    const selectedAvailableCourier = ref(null);
    const addForm = useForm({
      code: "",
      name: "",
      logo: "",
      description: "",
      services: []
    });
    const editForm = useForm({
      name: "",
      description: "",
      services: [],
      isActive: true
    });
    const availableCouriersToAdd = computed(() => {
      const existingCodes = props.couriers.map((c) => c.code);
      return props.availableCouriers.filter((c) => !existingCodes.includes(c.code));
    });
    const openAddModal = (courier) => {
      selectedAvailableCourier.value = courier;
      addForm.code = courier.code;
      addForm.name = courier.name;
      addForm.logo = courier.logo;
      addForm.description = "";
      addForm.services = courier.services.map((s) => ({
        code: s.code,
        name: s.name,
        enabled: true
      }));
      showAddCourierModal.value = true;
    };
    const openEditModal = (courier) => {
      selectedCourier.value = courier;
      editForm.name = courier.name;
      editForm.description = courier.description || "";
      editForm.services = [...courier.services];
      editForm.isActive = courier.isActive;
      showEditCourierModal.value = true;
    };
    const submitAddCourier = () => {
      addForm.post("/admin/settings/shipping/courier", {
        onSuccess: () => {
          showAddCourierModal.value = false;
          addForm.reset();
          selectedAvailableCourier.value = null;
        }
      });
    };
    const submitEditCourier = () => {
      if (!selectedCourier.value) return;
      editForm.put(`/admin/settings/shipping/courier/${selectedCourier.value.id}`, {
        onSuccess: () => {
          showEditCourierModal.value = false;
          editForm.reset();
          selectedCourier.value = null;
        }
      });
    };
    const toggleCourierActive = (courier) => {
      router.post(`/admin/settings/shipping/courier/${courier.id}/toggle`);
    };
    const removeCourier = (courier) => {
      if (confirm(`Hapus kurir "${courier.name}" dari daftar?`)) {
        router.delete(`/admin/settings/shipping/courier/${courier.id}`);
      }
    };
    const getCourierLogo = (courier) => {
      const available = props.availableCouriers.find((c) => c.code === courier.code);
      return courier.logo || available?.logo || void 0;
    };
    const getCourierInitials = (name) => {
      return name.split(" ").map((word) => word[0]).join("").toUpperCase().slice(0, 2);
    };
    const handleImageError = (event) => {
      const img = event.target;
      img.style.display = "none";
      const fallback = img.nextElementSibling;
      if (fallback) {
        fallback.style.display = "flex";
      }
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UAlert = _sfc_main$1;
      const _component_UButton = _sfc_main$2;
      const _component_UCard = _sfc_main$3;
      const _component_UIcon = _sfc_main$4;
      const _component_UDropdownMenu = _sfc_main$5;
      const _component_UBadge = _sfc_main$6;
      const _component_UModal = _sfc_main$7;
      const _component_USwitch = _sfc_main$8;
      const _component_UFormField = _sfc_main$9;
      const _component_UInput = _sfc_main$a;
      _push(`<!--[-->`);
      _push(ssrRenderComponent(unref(Head), { title: "Pengaturan Pengiriman" }, null, _parent));
      _push(`<div class="space-y-6"><!-- Header --><div><h1 class="text-2xl font-bold text-gray-900 dark:text-white">Pengaturan Pengiriman</h1><p class="mt-1 text-sm text-gray-500 dark:text-gray-400"> Kelola kurir dan layanan pengiriman yang tersedia </p></div><!-- Default Address Warning -->`);
      if (!props.defaultAddress) {
        _push(ssrRenderComponent(_component_UAlert, {
          icon: "i-heroicons-exclamation-triangle",
          color: "warning",
          title: "Alamat Belum Diatur",
          description: "Anda perlu menambahkan alamat gudang/toko terlebih dahulu untuk menghitung ongkos kirim."
        }, {
          actions: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(_component_UButton, {
                size: "sm",
                color: "warning",
                variant: "outline",
                label: "Atur Alamat",
                onClick: ($event) => unref(router).visit("/admin/settings/address")
              }, null, _parent2, _scopeId));
            } else {
              return [
                createVNode(_component_UButton, {
                  size: "sm",
                  color: "warning",
                  variant: "outline",
                  label: "Atur Alamat",
                  onClick: ($event) => unref(router).visit("/admin/settings/address")
                }, null, 8, ["onClick"])
              ];
            }
          }),
          _: 1
          /* STABLE */
        }, _parent));
      } else {
        _push(`<!--[--><!-- Default Address Info -->`);
        _push(ssrRenderComponent(_component_UCard, null, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<div class="flex items-center justify-between"${_scopeId}><div class="flex items-center gap-4"${_scopeId}><div class="p-3 bg-primary-50 dark:bg-primary-900/20 rounded-lg"${_scopeId}>`);
              _push2(ssrRenderComponent(_component_UIcon, {
                name: "i-heroicons-map-pin",
                class: "w-6 h-6 text-primary-500"
              }, null, _parent2, _scopeId));
              _push2(`</div><div${_scopeId}><h3 class="font-medium text-gray-900 dark:text-white"${_scopeId}> Alamat Pengiriman: ${ssrInterpolate(props.defaultAddress.name)}</h3><p class="text-sm text-gray-500 dark:text-gray-400"${_scopeId}>${ssrInterpolate(props.defaultAddress.districtName)}, ${ssrInterpolate(props.defaultAddress.cityName)}, ${ssrInterpolate(props.defaultAddress.provinceName)}</p></div></div>`);
              _push2(ssrRenderComponent(_component_UButton, {
                size: "sm",
                color: "neutral",
                variant: "outline",
                label: "Ubah",
                onClick: ($event) => unref(router).visit("/admin/settings/address")
              }, null, _parent2, _scopeId));
              _push2(`</div>`);
            } else {
              return [
                createVNode("div", { class: "flex items-center justify-between" }, [
                  createVNode("div", { class: "flex items-center gap-4" }, [
                    createVNode("div", { class: "p-3 bg-primary-50 dark:bg-primary-900/20 rounded-lg" }, [
                      createVNode(_component_UIcon, {
                        name: "i-heroicons-map-pin",
                        class: "w-6 h-6 text-primary-500"
                      })
                    ]),
                    createVNode("div", null, [
                      createVNode(
                        "h3",
                        { class: "font-medium text-gray-900 dark:text-white" },
                        " Alamat Pengiriman: " + toDisplayString(props.defaultAddress.name),
                        1
                        /* TEXT */
                      ),
                      createVNode(
                        "p",
                        { class: "text-sm text-gray-500 dark:text-gray-400" },
                        toDisplayString(props.defaultAddress.districtName) + ", " + toDisplayString(props.defaultAddress.cityName) + ", " + toDisplayString(props.defaultAddress.provinceName),
                        1
                        /* TEXT */
                      )
                    ])
                  ]),
                  createVNode(_component_UButton, {
                    size: "sm",
                    color: "neutral",
                    variant: "outline",
                    label: "Ubah",
                    onClick: ($event) => unref(router).visit("/admin/settings/address")
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
      _push(`<!-- Active Couriers --><div><div class="flex items-center justify-between mb-4"><h2 class="text-lg font-semibold text-gray-900 dark:text-white">Kurir Aktif</h2></div>`);
      if (props.couriers.length > 0) {
        _push(`<div class="grid gap-4 md:grid-cols-2 lg:grid-cols-3"><!--[-->`);
        ssrRenderList(props.couriers, (courier) => {
          _push(ssrRenderComponent(_component_UCard, {
            key: courier.id,
            class: [!courier.isActive ? "opacity-60" : ""]
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`<div class="space-y-4"${_scopeId}><!-- Header --><div class="flex items-start justify-between"${_scopeId}><div class="flex items-center gap-3"${_scopeId}><div class="w-12 h-12 rounded-lg bg-gray-100 dark:bg-gray-800 p-1 shrink-0 relative"${_scopeId}>`);
                if (getCourierLogo(courier)) {
                  _push2(`<img${ssrRenderAttr("src", getCourierLogo(courier))}${ssrRenderAttr("alt", courier.name)} class="w-full h-full object-contain"${_scopeId}>`);
                } else {
                  _push2(`<!---->`);
                }
                _push2(`<div class="w-full h-full items-center justify-center text-sm font-bold text-gray-500 dark:text-gray-400" style="${ssrRenderStyle({ display: getCourierLogo(courier) ? "none" : "flex" })}"${_scopeId}>${ssrInterpolate(getCourierInitials(courier.name))}</div></div><div${_scopeId}><h3 class="font-semibold text-gray-900 dark:text-white"${_scopeId}>${ssrInterpolate(courier.name)}</h3><p class="text-xs text-gray-500 uppercase"${_scopeId}>${ssrInterpolate(courier.code)}</p></div></div>`);
                _push2(ssrRenderComponent(_component_UDropdownMenu, {
                  items: [
                    [
                      {
                        label: "Edit Layanan",
                        icon: "i-heroicons-pencil",
                        click: () => openEditModal(courier)
                      },
                      {
                        label: courier.isActive ? "Nonaktifkan" : "Aktifkan",
                        icon: courier.isActive ? "i-heroicons-eye-slash" : "i-heroicons-eye",
                        click: () => toggleCourierActive(courier)
                      }
                    ],
                    [
                      {
                        label: "Hapus",
                        icon: "i-heroicons-trash",
                        color: "error",
                        click: () => removeCourier(courier)
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
                _push2(`</div><!-- Status --><div class="flex items-center gap-2"${_scopeId}>`);
                _push2(ssrRenderComponent(_component_UBadge, {
                  color: courier.isActive ? "success" : "neutral",
                  size: "sm"
                }, {
                  default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      _push3(`${ssrInterpolate(courier.isActive ? "Aktif" : "Nonaktif")}`);
                    } else {
                      return [
                        createTextVNode(
                          toDisplayString(courier.isActive ? "Aktif" : "Nonaktif"),
                          1
                          /* TEXT */
                        )
                      ];
                    }
                  }),
                  _: 2
                  /* DYNAMIC */
                }, _parent2, _scopeId));
                _push2(`</div><!-- Services --><div class="space-y-2"${_scopeId}><p class="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase"${_scopeId}>Layanan</p><div class="flex flex-wrap gap-1"${_scopeId}><!--[-->`);
                ssrRenderList(courier.services, (service) => {
                  _push2(`<!--[-->`);
                  if (service.enabled) {
                    _push2(ssrRenderComponent(_component_UBadge, {
                      color: "primary",
                      variant: "soft",
                      size: "xs"
                    }, {
                      default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                        if (_push3) {
                          _push3(`${ssrInterpolate(service.code)}`);
                        } else {
                          return [
                            createTextVNode(
                              toDisplayString(service.code),
                              1
                              /* TEXT */
                            )
                          ];
                        }
                      }),
                      _: 2
                      /* DYNAMIC */
                    }, _parent2, _scopeId));
                  } else {
                    _push2(`<!---->`);
                  }
                  _push2(`<!--]-->`);
                });
                _push2(`<!--]-->`);
                if (courier.services.filter((s) => s.enabled).length === 0) {
                  _push2(`<span class="text-xs text-gray-400"${_scopeId}> Tidak ada layanan aktif </span>`);
                } else {
                  _push2(`<!---->`);
                }
                _push2(`</div></div></div>`);
              } else {
                return [
                  createVNode("div", { class: "space-y-4" }, [
                    createCommentVNode(" Header "),
                    createVNode("div", { class: "flex items-start justify-between" }, [
                      createVNode("div", { class: "flex items-center gap-3" }, [
                        createVNode("div", { class: "w-12 h-12 rounded-lg bg-gray-100 dark:bg-gray-800 p-1 shrink-0 relative" }, [
                          getCourierLogo(courier) ? (openBlock(), createBlock("img", {
                            key: 0,
                            src: getCourierLogo(courier),
                            alt: courier.name,
                            class: "w-full h-full object-contain",
                            onError: handleImageError
                          }, null, 40, ["src", "alt"])) : createCommentVNode("v-if", true),
                          createVNode(
                            "div",
                            {
                              class: "w-full h-full items-center justify-center text-sm font-bold text-gray-500 dark:text-gray-400",
                              style: { display: getCourierLogo(courier) ? "none" : "flex" }
                            },
                            toDisplayString(getCourierInitials(courier.name)),
                            5
                            /* TEXT, STYLE */
                          )
                        ]),
                        createVNode("div", null, [
                          createVNode(
                            "h3",
                            { class: "font-semibold text-gray-900 dark:text-white" },
                            toDisplayString(courier.name),
                            1
                            /* TEXT */
                          ),
                          createVNode(
                            "p",
                            { class: "text-xs text-gray-500 uppercase" },
                            toDisplayString(courier.code),
                            1
                            /* TEXT */
                          )
                        ])
                      ]),
                      createVNode(_component_UDropdownMenu, {
                        items: [
                          [
                            {
                              label: "Edit Layanan",
                              icon: "i-heroicons-pencil",
                              click: () => openEditModal(courier)
                            },
                            {
                              label: courier.isActive ? "Nonaktifkan" : "Aktifkan",
                              icon: courier.isActive ? "i-heroicons-eye-slash" : "i-heroicons-eye",
                              click: () => toggleCourierActive(courier)
                            }
                          ],
                          [
                            {
                              label: "Hapus",
                              icon: "i-heroicons-trash",
                              color: "error",
                              click: () => removeCourier(courier)
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
                    createCommentVNode(" Status "),
                    createVNode("div", { class: "flex items-center gap-2" }, [
                      createVNode(_component_UBadge, {
                        color: courier.isActive ? "success" : "neutral",
                        size: "sm"
                      }, {
                        default: withCtx(() => [
                          createTextVNode(
                            toDisplayString(courier.isActive ? "Aktif" : "Nonaktif"),
                            1
                            /* TEXT */
                          )
                        ]),
                        _: 2
                        /* DYNAMIC */
                      }, 1032, ["color"])
                    ]),
                    createCommentVNode(" Services "),
                    createVNode("div", { class: "space-y-2" }, [
                      createVNode("p", { class: "text-xs font-medium text-gray-500 dark:text-gray-400 uppercase" }, "Layanan"),
                      createVNode("div", { class: "flex flex-wrap gap-1" }, [
                        (openBlock(true), createBlock(
                          Fragment,
                          null,
                          renderList(courier.services, (service) => {
                            return openBlock(), createBlock(
                              Fragment,
                              {
                                key: service.code
                              },
                              [
                                service.enabled ? (openBlock(), createBlock(
                                  _component_UBadge,
                                  {
                                    key: 0,
                                    color: "primary",
                                    variant: "soft",
                                    size: "xs"
                                  },
                                  {
                                    default: withCtx(() => [
                                      createTextVNode(
                                        toDisplayString(service.code),
                                        1
                                        /* TEXT */
                                      )
                                    ]),
                                    _: 2
                                    /* DYNAMIC */
                                  },
                                  1024
                                  /* DYNAMIC_SLOTS */
                                )) : createCommentVNode("v-if", true)
                              ],
                              64
                              /* STABLE_FRAGMENT */
                            );
                          }),
                          128
                          /* KEYED_FRAGMENT */
                        )),
                        courier.services.filter((s) => s.enabled).length === 0 ? (openBlock(), createBlock("span", {
                          key: 0,
                          class: "text-xs text-gray-400"
                        }, " Tidak ada layanan aktif ")) : createCommentVNode("v-if", true)
                      ])
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
        _push(`<!--[--><!-- Empty Active Couriers -->`);
        _push(ssrRenderComponent(_component_UCard, { class: "text-center py-8" }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(_component_UIcon, {
                name: "i-heroicons-truck",
                class: "w-12 h-12 text-gray-400 mx-auto mb-4"
              }, null, _parent2, _scopeId));
              _push2(`<h3 class="font-medium text-gray-900 dark:text-white mb-2"${_scopeId}>Belum ada kurir aktif</h3><p class="text-sm text-gray-500 dark:text-gray-400"${_scopeId}> Tambahkan kurir dari daftar di bawah </p>`);
            } else {
              return [
                createVNode(_component_UIcon, {
                  name: "i-heroicons-truck",
                  class: "w-12 h-12 text-gray-400 mx-auto mb-4"
                }),
                createVNode("h3", { class: "font-medium text-gray-900 dark:text-white mb-2" }, "Belum ada kurir aktif"),
                createVNode("p", { class: "text-sm text-gray-500 dark:text-gray-400" }, " Tambahkan kurir dari daftar di bawah ")
              ];
            }
          }),
          _: 1
          /* STABLE */
        }, _parent));
        _push(`<!--]-->`);
      }
      _push(`</div><!-- Available Couriers to Add -->`);
      if (availableCouriersToAdd.value.length > 0) {
        _push(`<div><h2 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">Tambah Kurir</h2><div class="grid gap-4 md:grid-cols-3 lg:grid-cols-4"><!--[-->`);
        ssrRenderList(availableCouriersToAdd.value, (courier) => {
          _push(ssrRenderComponent(_component_UCard, {
            key: courier.code,
            class: "cursor-pointer hover:ring-2 hover:ring-primary-500 transition-all",
            onClick: ($event) => openAddModal(courier)
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`<div class="flex flex-col items-center text-center"${_scopeId}><div class="w-16 h-16 rounded-lg bg-gray-100 dark:bg-gray-800 p-2 mb-3 shrink-0 relative"${_scopeId}>`);
                if (courier.logo) {
                  _push2(`<img${ssrRenderAttr("src", courier.logo)}${ssrRenderAttr("alt", courier.name)} class="w-full h-full object-contain"${_scopeId}>`);
                } else {
                  _push2(`<!---->`);
                }
                _push2(`<div class="w-full h-full items-center justify-center text-lg font-bold text-gray-500 dark:text-gray-400" style="${ssrRenderStyle({ display: courier.logo ? "none" : "flex" })}"${_scopeId}>${ssrInterpolate(getCourierInitials(courier.name))}</div></div><h3 class="font-medium text-gray-900 dark:text-white"${_scopeId}>${ssrInterpolate(courier.name)}</h3><p class="text-xs text-gray-500"${_scopeId}>${ssrInterpolate(courier.services.length)} layanan</p></div>`);
              } else {
                return [
                  createVNode("div", { class: "flex flex-col items-center text-center" }, [
                    createVNode("div", { class: "w-16 h-16 rounded-lg bg-gray-100 dark:bg-gray-800 p-2 mb-3 shrink-0 relative" }, [
                      courier.logo ? (openBlock(), createBlock("img", {
                        key: 0,
                        src: courier.logo,
                        alt: courier.name,
                        class: "w-full h-full object-contain",
                        onError: handleImageError
                      }, null, 40, ["src", "alt"])) : createCommentVNode("v-if", true),
                      createVNode(
                        "div",
                        {
                          class: "w-full h-full items-center justify-center text-lg font-bold text-gray-500 dark:text-gray-400",
                          style: { display: courier.logo ? "none" : "flex" }
                        },
                        toDisplayString(getCourierInitials(courier.name)),
                        5
                        /* TEXT, STYLE */
                      )
                    ]),
                    createVNode(
                      "h3",
                      { class: "font-medium text-gray-900 dark:text-white" },
                      toDisplayString(courier.name),
                      1
                      /* TEXT */
                    ),
                    createVNode(
                      "p",
                      { class: "text-xs text-gray-500" },
                      toDisplayString(courier.services.length) + " layanan",
                      1
                      /* TEXT */
                    )
                  ])
                ];
              }
            }),
            _: 2
            /* DYNAMIC */
          }, _parent));
        });
        _push(`<!--]--></div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<!-- Add Courier Modal -->`);
      _push(ssrRenderComponent(_component_UModal, {
        open: showAddCourierModal.value,
        "onUpdate:open": ($event) => showAddCourierModal.value = $event,
        ui: { overlay: "z-[100]", content: "z-[100]" }
      }, {
        header: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="flex items-center gap-3"${_scopeId}><div class="w-10 h-10 rounded bg-gray-100 dark:bg-gray-800 p-1 shrink-0 flex items-center justify-center"${_scopeId}>`);
            if (selectedAvailableCourier.value?.logo) {
              _push2(`<img${ssrRenderAttr("src", selectedAvailableCourier.value.logo)}${ssrRenderAttr("alt", selectedAvailableCourier.value.name)} class="w-full h-full object-contain"${_scopeId}>`);
            } else {
              _push2(`<span class="text-sm font-bold text-gray-500 dark:text-gray-400"${_scopeId}>${ssrInterpolate(selectedAvailableCourier.value ? getCourierInitials(selectedAvailableCourier.value.name) : "")}</span>`);
            }
            _push2(`</div><div${_scopeId}><h3 class="text-lg font-semibold"${_scopeId}>Tambah ${ssrInterpolate(selectedAvailableCourier.value?.name)}</h3><p class="text-sm text-gray-500"${_scopeId}>Pilih layanan yang ingin diaktifkan</p></div></div>`);
          } else {
            return [
              createVNode("div", { class: "flex items-center gap-3" }, [
                createVNode("div", { class: "w-10 h-10 rounded bg-gray-100 dark:bg-gray-800 p-1 shrink-0 flex items-center justify-center" }, [
                  selectedAvailableCourier.value?.logo ? (openBlock(), createBlock("img", {
                    key: 0,
                    src: selectedAvailableCourier.value.logo,
                    alt: selectedAvailableCourier.value.name,
                    class: "w-full h-full object-contain",
                    onError: handleImageError
                  }, null, 40, ["src", "alt"])) : (openBlock(), createBlock(
                    "span",
                    {
                      key: 1,
                      class: "text-sm font-bold text-gray-500 dark:text-gray-400"
                    },
                    toDisplayString(selectedAvailableCourier.value ? getCourierInitials(selectedAvailableCourier.value.name) : ""),
                    1
                    /* TEXT */
                  ))
                ]),
                createVNode("div", null, [
                  createVNode(
                    "h3",
                    { class: "text-lg font-semibold" },
                    "Tambah " + toDisplayString(selectedAvailableCourier.value?.name),
                    1
                    /* TEXT */
                  ),
                  createVNode("p", { class: "text-sm text-gray-500" }, "Pilih layanan yang ingin diaktifkan")
                ])
              ])
            ];
          }
        }),
        footer: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="flex justify-end gap-3"${_scopeId}>`);
            _push2(ssrRenderComponent(_component_UButton, {
              color: "neutral",
              variant: "outline",
              label: "Batal",
              onClick: ($event) => showAddCourierModal.value = false
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_UButton, {
              color: "primary",
              label: "Tambah Kurir",
              loading: unref(addForm).processing,
              onClick: submitAddCourier
            }, null, _parent2, _scopeId));
            _push2(`</div>`);
          } else {
            return [
              createVNode("div", { class: "flex justify-end gap-3" }, [
                createVNode(_component_UButton, {
                  color: "neutral",
                  variant: "outline",
                  label: "Batal",
                  onClick: ($event) => showAddCourierModal.value = false
                }, null, 8, ["onClick"]),
                createVNode(_component_UButton, {
                  color: "primary",
                  label: "Tambah Kurir",
                  loading: unref(addForm).processing,
                  onClick: submitAddCourier
                }, null, 8, ["loading"])
              ])
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="p-4 space-y-4"${_scopeId}><!-- Services --><div class="space-y-2"${_scopeId}><label class="text-sm font-medium text-gray-700 dark:text-gray-300"${_scopeId}>Layanan</label><div class="space-y-2"${_scopeId}><!--[-->`);
            ssrRenderList(unref(addForm).services, (service) => {
              _push2(`<div class="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg"${_scopeId}><div${_scopeId}><p class="font-medium text-gray-900 dark:text-white"${_scopeId}>${ssrInterpolate(service.code)}</p><p class="text-sm text-gray-500"${_scopeId}>${ssrInterpolate(service.name)}</p></div>`);
              _push2(ssrRenderComponent(_component_USwitch, {
                modelValue: service.enabled,
                "onUpdate:modelValue": ($event) => service.enabled = $event
              }, null, _parent2, _scopeId));
              _push2(`</div>`);
            });
            _push2(`<!--]--></div></div></div>`);
          } else {
            return [
              createVNode("div", { class: "p-4 space-y-4" }, [
                createCommentVNode(" Services "),
                createVNode("div", { class: "space-y-2" }, [
                  createVNode("label", { class: "text-sm font-medium text-gray-700 dark:text-gray-300" }, "Layanan"),
                  createVNode("div", { class: "space-y-2" }, [
                    (openBlock(true), createBlock(
                      Fragment,
                      null,
                      renderList(unref(addForm).services, (service) => {
                        return openBlock(), createBlock("div", {
                          key: service.code,
                          class: "flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg"
                        }, [
                          createVNode("div", null, [
                            createVNode(
                              "p",
                              { class: "font-medium text-gray-900 dark:text-white" },
                              toDisplayString(service.code),
                              1
                              /* TEXT */
                            ),
                            createVNode(
                              "p",
                              { class: "text-sm text-gray-500" },
                              toDisplayString(service.name),
                              1
                              /* TEXT */
                            )
                          ]),
                          createVNode(_component_USwitch, {
                            modelValue: service.enabled,
                            "onUpdate:modelValue": ($event) => service.enabled = $event
                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                        ]);
                      }),
                      128
                      /* KEYED_FRAGMENT */
                    ))
                  ])
                ])
              ])
            ];
          }
        }),
        _: 1
        /* STABLE */
      }, _parent));
      _push(`<!-- Edit Courier Modal -->`);
      _push(ssrRenderComponent(_component_UModal, {
        open: showEditCourierModal.value,
        "onUpdate:open": ($event) => showEditCourierModal.value = $event,
        ui: { overlay: "z-[100]", content: "z-[100]" }
      }, {
        header: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<h3 class="text-lg font-semibold"${_scopeId}>Edit ${ssrInterpolate(selectedCourier.value?.name)}</h3>`);
          } else {
            return [
              createVNode(
                "h3",
                { class: "text-lg font-semibold" },
                "Edit " + toDisplayString(selectedCourier.value?.name),
                1
                /* TEXT */
              )
            ];
          }
        }),
        footer: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="flex justify-end gap-3"${_scopeId}>`);
            _push2(ssrRenderComponent(_component_UButton, {
              color: "neutral",
              variant: "outline",
              label: "Batal",
              onClick: ($event) => showEditCourierModal.value = false
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_UButton, {
              color: "primary",
              label: "Simpan",
              loading: unref(editForm).processing,
              onClick: submitEditCourier
            }, null, _parent2, _scopeId));
            _push2(`</div>`);
          } else {
            return [
              createVNode("div", { class: "flex justify-end gap-3" }, [
                createVNode(_component_UButton, {
                  color: "neutral",
                  variant: "outline",
                  label: "Batal",
                  onClick: ($event) => showEditCourierModal.value = false
                }, null, 8, ["onClick"]),
                createVNode(_component_UButton, {
                  color: "primary",
                  label: "Simpan",
                  loading: unref(editForm).processing,
                  onClick: submitEditCourier
                }, null, 8, ["loading"])
              ])
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="p-4 space-y-4"${_scopeId}><!-- Description -->`);
            _push2(ssrRenderComponent(_component_UFormField, { label: "Deskripsi (Opsional)" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_UInput, {
                    modelValue: unref(editForm).description,
                    "onUpdate:modelValue": ($event) => unref(editForm).description = $event,
                    placeholder: "Catatan untuk kurir ini"
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_UInput, {
                      modelValue: unref(editForm).description,
                      "onUpdate:modelValue": ($event) => unref(editForm).description = $event,
                      placeholder: "Catatan untuk kurir ini"
                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                  ];
                }
              }),
              _: 1
              /* STABLE */
            }, _parent2, _scopeId));
            _push2(`<!-- Services --><div class="space-y-2"${_scopeId}><label class="text-sm font-medium text-gray-700 dark:text-gray-300"${_scopeId}>Layanan</label><div class="space-y-2"${_scopeId}><!--[-->`);
            ssrRenderList(unref(editForm).services, (service) => {
              _push2(`<div class="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg"${_scopeId}><div${_scopeId}><p class="font-medium text-gray-900 dark:text-white"${_scopeId}>${ssrInterpolate(service.code)}</p><p class="text-sm text-gray-500"${_scopeId}>${ssrInterpolate(service.name)}</p></div>`);
              _push2(ssrRenderComponent(_component_USwitch, {
                modelValue: service.enabled,
                "onUpdate:modelValue": ($event) => service.enabled = $event
              }, null, _parent2, _scopeId));
              _push2(`</div>`);
            });
            _push2(`<!--]--></div></div></div>`);
          } else {
            return [
              createVNode("div", { class: "p-4 space-y-4" }, [
                createCommentVNode(" Description "),
                createVNode(_component_UFormField, { label: "Deskripsi (Opsional)" }, {
                  default: withCtx(() => [
                    createVNode(_component_UInput, {
                      modelValue: unref(editForm).description,
                      "onUpdate:modelValue": ($event) => unref(editForm).description = $event,
                      placeholder: "Catatan untuk kurir ini"
                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                  ]),
                  _: 1
                  /* STABLE */
                }),
                createCommentVNode(" Services "),
                createVNode("div", { class: "space-y-2" }, [
                  createVNode("label", { class: "text-sm font-medium text-gray-700 dark:text-gray-300" }, "Layanan"),
                  createVNode("div", { class: "space-y-2" }, [
                    (openBlock(true), createBlock(
                      Fragment,
                      null,
                      renderList(unref(editForm).services, (service) => {
                        return openBlock(), createBlock("div", {
                          key: service.code,
                          class: "flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg"
                        }, [
                          createVNode("div", null, [
                            createVNode(
                              "p",
                              { class: "font-medium text-gray-900 dark:text-white" },
                              toDisplayString(service.code),
                              1
                              /* TEXT */
                            ),
                            createVNode(
                              "p",
                              { class: "text-sm text-gray-500" },
                              toDisplayString(service.name),
                              1
                              /* TEXT */
                            )
                          ]),
                          createVNode(_component_USwitch, {
                            modelValue: service.enabled,
                            "onUpdate:modelValue": ($event) => service.enabled = $event
                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                        ]);
                      }),
                      128
                      /* KEYED_FRAGMENT */
                    ))
                  ])
                ])
              ])
            ];
          }
        }),
        _: 1
        /* STABLE */
      }, _parent));
      _push(`</div><!--]-->`);
    };
  }
});

const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("inertia/pages/admin/settings/shipping/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
