import { _ as _sfc_main$5 } from './Switch-eKFRwox7.js';
import { a as _sfc_main$4 } from './Badge-CQlYH3Fo.js';
import { a as _sfc_main$1, _ as _sfc_main$3 } from './Button-BTdvmZ8N.js';
import { _ as _sfc_main$2 } from './Card-h3oZeDee.js';
import { defineComponent, computed, ref, unref, withCtx, createTextVNode, createVNode, createBlock, openBlock, Fragment, renderList, createCommentVNode, toDisplayString, useSSRContext } from 'vue';
import { ssrRenderComponent, ssrRenderList, ssrRenderClass, ssrInterpolate, ssrRenderTeleport } from 'vue/server-renderer';
import { Head, useForm } from '@inertiajs/vue3';
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
    settings: {}
  },
  setup(__props) {
    const props = __props;
    const allNotifications = computed(() => {
      return [
        ...props.settings.orders,
        ...props.settings.payments,
        ...props.settings.promotions,
        ...props.settings.system
      ];
    });
    const groupLabels = {
      orders: {
        label: "Pesanan",
        icon: "i-heroicons-shopping-bag",
        description: "Notifikasi terkait status dan aktivitas pesanan"
      },
      payments: {
        label: "Pembayaran",
        icon: "i-heroicons-credit-card",
        description: "Notifikasi terkait transaksi dan pembayaran"
      },
      promotions: {
        label: "Promosi",
        icon: "i-heroicons-megaphone",
        description: "Notifikasi terkait promosi dan penawaran"
      },
      system: {
        label: "Sistem",
        icon: "i-heroicons-cog-6-tooth",
        description: "Notifikasi terkait sistem dan keamanan"
      }
    };
    const notificationGroups = computed(() => [
      { key: "orders", notifications: props.settings.orders },
      { key: "payments", notifications: props.settings.payments },
      { key: "promotions", notifications: props.settings.promotions },
      { key: "system", notifications: props.settings.system }
    ]);
    const hasChanges = ref(false);
    const changedSettings = ref(/* @__PURE__ */ new Map());
    const toggleChannel = (notification, channel) => {
      const currentValue = notification[channel];
      notification[channel] = !currentValue;
      if (!changedSettings.value.has(notification.id)) {
        changedSettings.value.set(notification.id, { id: notification.id });
      }
      const changes = changedSettings.value.get(notification.id);
      changes[channel] = notification[channel];
      hasChanges.value = true;
    };
    const saving = ref(false);
    const saveChanges = async () => {
      if (changedSettings.value.size === 0) return;
      saving.value = true;
      const updates = Array.from(changedSettings.value.values());
      useForm({ notifications: updates }).post("/admin/settings/notifications/bulk", {
        onSuccess: () => {
          hasChanges.value = false;
          changedSettings.value.clear();
        },
        onFinish: () => {
          saving.value = false;
        }
      });
    };
    const resetChanges = () => {
      window.location.reload();
    };
    const channels = [
      {
        key: "emailEnabled",
        label: "Email",
        icon: "i-heroicons-envelope",
        available: true
      },
      {
        key: "pushEnabled",
        label: "Push",
        icon: "i-heroicons-bell",
        available: true
      },
      {
        key: "whatsappEnabled",
        label: "WhatsApp",
        icon: "i-heroicons-chat-bubble-left-right",
        available: false
        // Can be enabled when WhatsApp integration is ready
      }
    ];
    const isNotificationEnabled = (notification) => {
      return Boolean(notification.emailEnabled) || Boolean(notification.pushEnabled) || Boolean(notification.whatsappEnabled);
    };
    const getChannelValue = (notification, key) => {
      return Boolean(notification[key]);
    };
    const toggleNotificationEnabled = (notification) => {
      const enabled = isNotificationEnabled(notification);
      const newValue = !enabled;
      channels.forEach((channel) => {
        if (channel.available) {
          notification[channel.key] = newValue;
          if (!changedSettings.value.has(notification.id)) {
            changedSettings.value.set(notification.id, { id: notification.id });
          }
          const changes = changedSettings.value.get(notification.id);
          changes[channel.key] = newValue;
        }
      });
      hasChanges.value = true;
    };
    const isGroupEnabled = (notifications) => {
      return notifications.every((n) => isNotificationEnabled(n));
    };
    const isGroupPartiallyEnabled = (notifications) => {
      const enabledCount = notifications.filter((n) => isNotificationEnabled(n)).length;
      return enabledCount > 0 && enabledCount < notifications.length;
    };
    const toggleGroupEnabled = (notifications) => {
      const allEnabled = isGroupEnabled(notifications);
      const newValue = !allEnabled;
      notifications.forEach((notification) => {
        channels.forEach((channel) => {
          if (channel.available) {
            notification[channel.key] = newValue;
            if (!changedSettings.value.has(notification.id)) {
              changedSettings.value.set(notification.id, { id: notification.id });
            }
            const changes = changedSettings.value.get(notification.id);
            changes[channel.key] = newValue;
          }
        });
      });
      hasChanges.value = true;
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UButton = _sfc_main$1;
      const _component_UCard = _sfc_main$2;
      const _component_UIcon = _sfc_main$3;
      const _component_UBadge = _sfc_main$4;
      const _component_USwitch = _sfc_main$5;
      _push(`<!--[-->`);
      _push(ssrRenderComponent(unref(Head), { title: "Pengaturan Notifikasi" }, null, _parent));
      _push(`<div class="space-y-6"><!-- Header --><div class="flex items-center justify-between"><div><h1 class="text-2xl font-bold text-gray-900 dark:text-white">Pengaturan Notifikasi</h1><p class="mt-1 text-sm text-gray-500 dark:text-gray-400"> Kelola preferensi notifikasi untuk berbagai event </p></div><!-- Save Button -->`);
      if (hasChanges.value) {
        _push(`<div class="flex items-center gap-3"><span class="text-sm text-amber-600 dark:text-amber-400"> Ada perubahan yang belum disimpan </span>`);
        _push(ssrRenderComponent(_component_UButton, {
          color: "neutral",
          variant: "outline",
          label: "Batal",
          onClick: resetChanges
        }, null, _parent));
        _push(ssrRenderComponent(_component_UButton, {
          color: "primary",
          label: "Simpan Perubahan",
          loading: saving.value,
          onClick: saveChanges
        }, null, _parent));
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><!-- Channel Legend -->`);
      _push(ssrRenderComponent(_component_UCard, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="flex items-center justify-between"${_scopeId}><div${_scopeId}><h3 class="font-medium text-gray-900 dark:text-white"${_scopeId}>Saluran Notifikasi</h3><p class="text-sm text-gray-500 dark:text-gray-400"${_scopeId}> Pilih saluran yang ingin digunakan untuk setiap jenis notifikasi </p></div><div class="flex items-center gap-4"${_scopeId}><!--[-->`);
            ssrRenderList(channels, (channel) => {
              _push2(`<div class="${ssrRenderClass([[!channel.available ? "opacity-50" : ""], "flex items-center gap-2"])}"${_scopeId}>`);
              _push2(ssrRenderComponent(_component_UIcon, {
                name: channel.icon,
                class: "w-5 h-5 text-gray-400"
              }, null, _parent2, _scopeId));
              _push2(`<span class="text-sm text-gray-600 dark:text-gray-400"${_scopeId}>${ssrInterpolate(channel.label)}</span>`);
              if (!channel.available) {
                _push2(ssrRenderComponent(_component_UBadge, {
                  size: "xs",
                  color: "neutral",
                  variant: "soft"
                }, {
                  default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      _push3(` Segera `);
                    } else {
                      return [
                        createTextVNode(" Segera ")
                      ];
                    }
                  }),
                  _: 2
                  /* DYNAMIC */
                }, _parent2, _scopeId));
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div>`);
            });
            _push2(`<!--]--></div></div>`);
          } else {
            return [
              createVNode("div", { class: "flex items-center justify-between" }, [
                createVNode("div", null, [
                  createVNode("h3", { class: "font-medium text-gray-900 dark:text-white" }, "Saluran Notifikasi"),
                  createVNode("p", { class: "text-sm text-gray-500 dark:text-gray-400" }, " Pilih saluran yang ingin digunakan untuk setiap jenis notifikasi ")
                ]),
                createVNode("div", { class: "flex items-center gap-4" }, [
                  (openBlock(), createBlock(
                    Fragment,
                    null,
                    renderList(channels, (channel) => {
                      return createVNode(
                        "div",
                        {
                          key: channel.key,
                          class: ["flex items-center gap-2", [!channel.available ? "opacity-50" : ""]]
                        },
                        [
                          createVNode(_component_UIcon, {
                            name: channel.icon,
                            class: "w-5 h-5 text-gray-400"
                          }, null, 8, ["name"]),
                          createVNode(
                            "span",
                            { class: "text-sm text-gray-600 dark:text-gray-400" },
                            toDisplayString(channel.label),
                            1
                            /* TEXT */
                          ),
                          !channel.available ? (openBlock(), createBlock(_component_UBadge, {
                            key: 0,
                            size: "xs",
                            color: "neutral",
                            variant: "soft"
                          }, {
                            default: withCtx(() => [
                              createTextVNode(" Segera ")
                            ]),
                            _: 1
                            /* STABLE */
                          })) : createCommentVNode("v-if", true)
                        ],
                        2
                        /* CLASS */
                      );
                    }),
                    64
                    /* STABLE_FRAGMENT */
                  ))
                ])
              ])
            ];
          }
        }),
        _: 1
        /* STABLE */
      }, _parent));
      _push(`<!-- Notification Groups --><div class="space-y-6"><!--[-->`);
      ssrRenderList(notificationGroups.value, (group) => {
        _push(`<div>`);
        _push(ssrRenderComponent(_component_UCard, null, {
          header: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<div class="flex items-center justify-between"${_scopeId}><div class="flex items-center gap-3"${_scopeId}><div class="p-2 bg-primary-50 dark:bg-primary-900/20 rounded-lg"${_scopeId}>`);
              _push2(ssrRenderComponent(_component_UIcon, {
                name: groupLabels[group.key]?.icon || "i-heroicons-bell",
                class: "w-5 h-5 text-primary-500"
              }, null, _parent2, _scopeId));
              _push2(`</div><div${_scopeId}><h2 class="font-semibold text-gray-900 dark:text-white"${_scopeId}>${ssrInterpolate(groupLabels[group.key]?.label || group.key)}</h2><p class="text-sm text-gray-500 dark:text-gray-400"${_scopeId}>${ssrInterpolate(groupLabels[group.key]?.description)}</p></div></div><!-- Group Toggle --><div class="flex items-center gap-2"${_scopeId}><span class="text-sm text-gray-500 dark:text-gray-400"${_scopeId}>${ssrInterpolate(isGroupEnabled(group.notifications) ? "Aktif" : "Nonaktif")}</span>`);
              _push2(ssrRenderComponent(_component_USwitch, {
                "model-value": isGroupEnabled(group.notifications),
                indeterminate: isGroupPartiallyEnabled(group.notifications),
                "onUpdate:modelValue": ($event) => toggleGroupEnabled(group.notifications)
              }, null, _parent2, _scopeId));
              _push2(`</div></div>`);
            } else {
              return [
                createVNode("div", { class: "flex items-center justify-between" }, [
                  createVNode("div", { class: "flex items-center gap-3" }, [
                    createVNode("div", { class: "p-2 bg-primary-50 dark:bg-primary-900/20 rounded-lg" }, [
                      createVNode(_component_UIcon, {
                        name: groupLabels[group.key]?.icon || "i-heroicons-bell",
                        class: "w-5 h-5 text-primary-500"
                      }, null, 8, ["name"])
                    ]),
                    createVNode("div", null, [
                      createVNode(
                        "h2",
                        { class: "font-semibold text-gray-900 dark:text-white" },
                        toDisplayString(groupLabels[group.key]?.label || group.key),
                        1
                        /* TEXT */
                      ),
                      createVNode(
                        "p",
                        { class: "text-sm text-gray-500 dark:text-gray-400" },
                        toDisplayString(groupLabels[group.key]?.description),
                        1
                        /* TEXT */
                      )
                    ])
                  ]),
                  createCommentVNode(" Group Toggle "),
                  createVNode("div", { class: "flex items-center gap-2" }, [
                    createVNode(
                      "span",
                      { class: "text-sm text-gray-500 dark:text-gray-400" },
                      toDisplayString(isGroupEnabled(group.notifications) ? "Aktif" : "Nonaktif"),
                      1
                      /* TEXT */
                    ),
                    createVNode(_component_USwitch, {
                      "model-value": isGroupEnabled(group.notifications),
                      indeterminate: isGroupPartiallyEnabled(group.notifications),
                      "onUpdate:modelValue": ($event) => toggleGroupEnabled(group.notifications)
                    }, null, 8, ["model-value", "indeterminate", "onUpdate:modelValue"])
                  ])
                ])
              ];
            }
          }),
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<div class="divide-y divide-gray-200 dark:divide-gray-700"${_scopeId}><!--[-->`);
              ssrRenderList(group.notifications, (notification) => {
                _push2(`<div class="${ssrRenderClass([{ "opacity-50": !isNotificationEnabled(notification) }, "py-4 first:pt-0 last:pb-0"])}"${_scopeId}><div class="flex items-center justify-between gap-4"${_scopeId}><!-- Enable/Disable Toggle --><div class="flex items-center gap-3"${_scopeId}>`);
                _push2(ssrRenderComponent(_component_USwitch, {
                  "model-value": isNotificationEnabled(notification),
                  size: "lg",
                  "onUpdate:modelValue": ($event) => toggleNotificationEnabled(notification)
                }, null, _parent2, _scopeId));
                _push2(`<div class="flex-1"${_scopeId}><h4 class="font-medium text-gray-900 dark:text-white"${_scopeId}>${ssrInterpolate(notification.eventName)}</h4><p class="text-sm text-gray-500 dark:text-gray-400"${_scopeId}>${ssrInterpolate(notification.description || "Tidak ada deskripsi")}</p></div></div><!-- Channel Toggles --><div class="flex items-center gap-6"${_scopeId}><!--[-->`);
                ssrRenderList(channels, (channel) => {
                  _push2(`<div class="flex flex-col items-center gap-1"${_scopeId}>`);
                  _push2(ssrRenderComponent(_component_USwitch, {
                    "model-value": getChannelValue(notification, channel.key),
                    disabled: !channel.available || !isNotificationEnabled(notification),
                    "onUpdate:modelValue": ($event) => toggleChannel(notification, channel.key)
                  }, null, _parent2, _scopeId));
                  _push2(`<span class="text-xs text-gray-400"${_scopeId}>${ssrInterpolate(channel.label)}</span></div>`);
                });
                _push2(`<!--]--></div></div></div>`);
              });
              _push2(`<!--]--></div>`);
            } else {
              return [
                createVNode("div", { class: "divide-y divide-gray-200 dark:divide-gray-700" }, [
                  (openBlock(true), createBlock(
                    Fragment,
                    null,
                    renderList(group.notifications, (notification) => {
                      return openBlock(), createBlock(
                        "div",
                        {
                          key: notification.id,
                          class: ["py-4 first:pt-0 last:pb-0", { "opacity-50": !isNotificationEnabled(notification) }]
                        },
                        [
                          createVNode("div", { class: "flex items-center justify-between gap-4" }, [
                            createCommentVNode(" Enable/Disable Toggle "),
                            createVNode("div", { class: "flex items-center gap-3" }, [
                              createVNode(_component_USwitch, {
                                "model-value": isNotificationEnabled(notification),
                                size: "lg",
                                "onUpdate:modelValue": ($event) => toggleNotificationEnabled(notification)
                              }, null, 8, ["model-value", "onUpdate:modelValue"]),
                              createVNode("div", { class: "flex-1" }, [
                                createVNode(
                                  "h4",
                                  { class: "font-medium text-gray-900 dark:text-white" },
                                  toDisplayString(notification.eventName),
                                  1
                                  /* TEXT */
                                ),
                                createVNode(
                                  "p",
                                  { class: "text-sm text-gray-500 dark:text-gray-400" },
                                  toDisplayString(notification.description || "Tidak ada deskripsi"),
                                  1
                                  /* TEXT */
                                )
                              ])
                            ]),
                            createCommentVNode(" Channel Toggles "),
                            createVNode("div", { class: "flex items-center gap-6" }, [
                              (openBlock(), createBlock(
                                Fragment,
                                null,
                                renderList(channels, (channel) => {
                                  return createVNode("div", {
                                    key: channel.key,
                                    class: "flex flex-col items-center gap-1"
                                  }, [
                                    createVNode(_component_USwitch, {
                                      "model-value": getChannelValue(notification, channel.key),
                                      disabled: !channel.available || !isNotificationEnabled(notification),
                                      "onUpdate:modelValue": ($event) => toggleChannel(notification, channel.key)
                                    }, null, 8, ["model-value", "disabled", "onUpdate:modelValue"]),
                                    createVNode(
                                      "span",
                                      { class: "text-xs text-gray-400" },
                                      toDisplayString(channel.label),
                                      1
                                      /* TEXT */
                                    )
                                  ]);
                                }),
                                64
                                /* STABLE_FRAGMENT */
                              ))
                            ])
                          ])
                        ],
                        2
                        /* CLASS */
                      );
                    }),
                    128
                    /* KEYED_FRAGMENT */
                  ))
                ])
              ];
            }
          }),
          _: 2
          /* DYNAMIC */
        }, _parent));
        _push(`</div>`);
      });
      _push(`<!--]--></div><!-- Empty State -->`);
      if (allNotifications.value.length === 0) {
        _push(ssrRenderComponent(_component_UCard, { class: "text-center py-12" }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(_component_UIcon, {
                name: "i-heroicons-bell-slash",
                class: "w-12 h-12 text-gray-400 mx-auto mb-4"
              }, null, _parent2, _scopeId));
              _push2(`<h3 class="font-medium text-gray-900 dark:text-white mb-2"${_scopeId}> Tidak ada pengaturan notifikasi </h3><p class="text-sm text-gray-500 dark:text-gray-400 mb-4"${_scopeId}> Pengaturan notifikasi belum diinisialisasi </p>`);
              _push2(ssrRenderComponent(_component_UButton, {
                color: "primary",
                label: "Inisialisasi Notifikasi",
                onClick: ($event) => unref(useForm)({}).post("/admin/settings/notifications/initialize")
              }, null, _parent2, _scopeId));
            } else {
              return [
                createVNode(_component_UIcon, {
                  name: "i-heroicons-bell-slash",
                  class: "w-12 h-12 text-gray-400 mx-auto mb-4"
                }),
                createVNode("h3", { class: "font-medium text-gray-900 dark:text-white mb-2" }, " Tidak ada pengaturan notifikasi "),
                createVNode("p", { class: "text-sm text-gray-500 dark:text-gray-400 mb-4" }, " Pengaturan notifikasi belum diinisialisasi "),
                createVNode(_component_UButton, {
                  color: "primary",
                  label: "Inisialisasi Notifikasi",
                  onClick: ($event) => unref(useForm)({}).post("/admin/settings/notifications/initialize")
                }, null, 8, ["onClick"])
              ];
            }
          }),
          _: 1
          /* STABLE */
        }, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(`<!-- Floating Save Button (Mobile) -->`);
      ssrRenderTeleport(_push, (_push2) => {
        if (hasChanges.value) {
          _push2(`<div class="fixed bottom-4 left-4 right-4 md:hidden bg-white dark:bg-gray-800 p-4 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 z-50"><div class="flex items-center justify-between"><span class="text-sm text-amber-600 dark:text-amber-400"> Perubahan belum disimpan </span><div class="flex gap-2">`);
          _push2(ssrRenderComponent(_component_UButton, {
            size: "sm",
            color: "neutral",
            variant: "outline",
            label: "Batal",
            onClick: resetChanges
          }, null, _parent));
          _push2(ssrRenderComponent(_component_UButton, {
            size: "sm",
            color: "primary",
            label: "Simpan",
            loading: saving.value,
            onClick: saveChanges
          }, null, _parent));
          _push2(`</div></div></div>`);
        } else {
          _push2(`<!---->`);
        }
      }, "body", false, _parent);
      _push(`</div><!--]-->`);
    };
  }
});

const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("inertia/pages/admin/settings/notifications/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
