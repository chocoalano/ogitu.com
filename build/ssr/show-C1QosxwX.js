import { _ as _sfc_main$4 } from './Modal-lw8uQ47S.js';
import { a as _sfc_main$3, u as useToast } from './Badge-DaOjA2YD.js';
import { _ as _sfc_main$1, a as _sfc_main$2 } from './Button-BBveOjhJ.js';
import { defineComponent, ref, mergeProps, unref, withCtx, createVNode, createTextVNode, toDisplayString, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate } from 'vue/server-renderer';
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
    user: {}
  },
  setup(__props) {
    const props = __props;
    const toast = useToast();
    const deleteModalOpen = ref(false);
    const formatDate = (date) => {
      return new Date(date).toLocaleDateString("id-ID", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit"
      });
    };
    const getRoleBadgeColor = (role) => {
      return role === "superadmin" ? "primary" : "neutral";
    };
    const confirmDelete = () => {
      router.delete(`/admin/users/${props.user.id}`, {
        onSuccess: () => {
          toast.success("Pengguna berhasil dihapus");
        },
        onError: () => {
          toast.error("Gagal menghapus pengguna");
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
        href: "/admin/users",
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
      _push(`<div><h1 class="text-2xl font-bold text-gray-900 dark:text-white">Detail Pengguna</h1><p class="text-gray-500 dark:text-gray-400"> Informasi lengkap pengguna </p></div></div><div class="flex gap-2">`);
      _push(ssrRenderComponent(_component_UButton, {
        icon: "i-heroicons-pencil-square",
        color: "primary",
        variant: "outline",
        to: `/admin/users/${props.user.id}/edit`
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
      _push(`</div></div><!-- User Info Card --><div class="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden"><!-- Header with Avatar --><div class="bg-linear-to-r from-violet-500 to-purple-600 px-6 py-8"><div class="flex items-center gap-4"><div class="w-20 h-20 rounded-full bg-white/20 flex items-center justify-center">`);
      _push(ssrRenderComponent(_component_UIcon, {
        name: "i-heroicons-user",
        class: "w-10 h-10 text-white"
      }, null, _parent));
      _push(`</div><div><h2 class="text-2xl font-bold text-white">${ssrInterpolate(props.user.fullName || "Belum diisi")}</h2><p class="text-white/80">${ssrInterpolate(props.user.email)}</p>`);
      _push(ssrRenderComponent(_component_UBadge, {
        color: getRoleBadgeColor(props.user.role),
        class: "mt-2"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`${ssrInterpolate(props.user.role === "superadmin" ? "Super Admin" : "Admin")}`);
          } else {
            return [
              createTextVNode(
                toDisplayString(props.user.role === "superadmin" ? "Super Admin" : "Admin"),
                1
                /* TEXT */
              )
            ];
          }
        }),
        _: 1
        /* STABLE */
      }, _parent));
      _push(`</div></div></div><!-- Details --><div class="p-6"><h3 class="text-lg font-semibold text-slate-900 dark:text-white mb-4"> Informasi Pengguna </h3><div class="grid grid-cols-1 md:grid-cols-2 gap-6"><div class="space-y-4"><div><label class="block text-sm text-slate-500 dark:text-slate-400">ID</label><p class="text-slate-900 dark:text-white font-medium">#${ssrInterpolate(props.user.id)}</p></div><div><label class="block text-sm text-slate-500 dark:text-slate-400">Nama Lengkap</label><p class="text-slate-900 dark:text-white font-medium">${ssrInterpolate(props.user.fullName || "Belum diisi")}</p></div><div><label class="block text-sm text-slate-500 dark:text-slate-400">Email</label><p class="text-slate-900 dark:text-white font-medium">${ssrInterpolate(props.user.email)}</p></div></div><div class="space-y-4"><div><label class="block text-sm text-slate-500 dark:text-slate-400">Role</label>`);
      _push(ssrRenderComponent(_component_UBadge, {
        color: getRoleBadgeColor(props.user.role),
        variant: "subtle"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`${ssrInterpolate(props.user.role === "superadmin" ? "Super Admin" : "Admin")}`);
          } else {
            return [
              createTextVNode(
                toDisplayString(props.user.role === "superadmin" ? "Super Admin" : "Admin"),
                1
                /* TEXT */
              )
            ];
          }
        }),
        _: 1
        /* STABLE */
      }, _parent));
      _push(`</div><div><label class="block text-sm text-slate-500 dark:text-slate-400">Tanggal Dibuat</label><p class="text-slate-900 dark:text-white font-medium">${ssrInterpolate(formatDate(props.user.createdAt))}</p></div>`);
      if (props.user.updatedAt) {
        _push(`<div><label class="block text-sm text-slate-500 dark:text-slate-400">Terakhir Diperbarui</label><p class="text-slate-900 dark:text-white font-medium">${ssrInterpolate(formatDate(props.user.updatedAt))}</p></div>`);
      } else {
        _push(`<!---->`);
      }
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
            _push2(`</div><div${_scopeId}><h3 class="text-lg font-semibold text-slate-900 dark:text-white"${_scopeId}>Hapus Pengguna</h3><p class="text-slate-500 dark:text-slate-400"${_scopeId}> Apakah Anda yakin ingin menghapus <strong${_scopeId}>${ssrInterpolate(props.user.fullName || props.user.email)}</strong>? </p></div></div><div class="flex justify-end gap-3"${_scopeId}>`);
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
                    createVNode("h3", { class: "text-lg font-semibold text-slate-900 dark:text-white" }, "Hapus Pengguna"),
                    createVNode("p", { class: "text-slate-500 dark:text-slate-400" }, [
                      createTextVNode(" Apakah Anda yakin ingin menghapus "),
                      createVNode(
                        "strong",
                        null,
                        toDisplayString(props.user.fullName || props.user.email),
                        1
                        /* TEXT */
                      ),
                      createTextVNode("? ")
                    ])
                  ])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("inertia/pages/admin/users/show.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
