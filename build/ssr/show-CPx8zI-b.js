import { defineComponent, mergeProps, unref, withCtx, createVNode, createTextVNode, useSSRContext, toDisplayString, computed, ref, createBlock, openBlock, mergeModels, useModel } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderAttr, ssrRenderClass, ssrRenderList } from 'vue/server-renderer';
import { A as AdminLayout } from './admin-CGUULoJY.js';
import { a as _sfc_main$a, _ as _sfc_main$b } from './Button-BBveOjhJ.js';
import { Link, router } from '@inertiajs/vue3';
import { a as _sfc_main$c, u as useToast } from './Badge-DaOjA2YD.js';
import { b as getStatusConfig, g as getConditionConfig, a as formatPrice, f as formatNumber } from './types-Juw5hnH9.js';
import { _ as _sfc_main$d } from './Modal-lw8uQ47S.js';
import './Tooltip-N44Fzd4m.js';
import 'defu';
import 'reka-ui';
import '@vueuse/core';
import './virtual_nuxt-ui-plugins-BqI2j5ZJ.js';
import '@unhead/vue/client';
import 'tailwindcss/colors';
import 'hookable';
import 'ohash/utils';
import '@unhead/vue';
import 'tailwind-variants';
import '@iconify/vue';
import 'ufo';
import 'reka-ui/namespaced';

const _sfc_main$9 = /* @__PURE__ */ defineComponent({
  __name: "ProductShowHeader",
  __ssrInlineRender: true,
  props: {
    productName: {},
    productId: {}
  },
  emits: ["delete"],
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UButton = _sfc_main$a;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4" }, _attrs))}><div class="flex items-center gap-4">`);
      _push(ssrRenderComponent(unref(Link), { href: "/admin/products" }, {
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
      _push(`<div><h1 class="text-2xl font-bold text-slate-900 dark:text-white">Detail Produk</h1><p class="text-sm text-slate-500 dark:text-slate-400 mt-1">${ssrInterpolate(__props.productName)}</p></div></div><div class="flex items-center gap-2">`);
      _push(ssrRenderComponent(unref(Link), {
        href: `/admin/products/${__props.productId}/edit`
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_UButton, {
              icon: "i-heroicons-pencil",
              color: "primary",
              variant: "outline"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Edit `);
                } else {
                  return [
                    createTextVNode(" Edit ")
                  ];
                }
              }),
              _: 1
              /* STABLE */
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_UButton, {
                icon: "i-heroicons-pencil",
                color: "primary",
                variant: "outline"
              }, {
                default: withCtx(() => [
                  createTextVNode(" Edit ")
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
      _push(ssrRenderComponent(_component_UButton, {
        icon: "i-heroicons-trash",
        color: "error",
        variant: "outline",
        onClick: ($event) => _ctx.$emit("delete")
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
      _push(`</div></div>`);
    };
  }
});

const _sfc_setup$9 = _sfc_main$9.setup;
_sfc_main$9.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("inertia/components/admin/products/show/ProductShowHeader.vue");
  return _sfc_setup$9 ? _sfc_setup$9(props, ctx) : void 0;
};

const _sfc_main$8 = /* @__PURE__ */ defineComponent({
  __name: "ProductShowInfo",
  __ssrInlineRender: true,
  props: {
    product: {},
    primaryImage: {}
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UIcon = _sfc_main$b;
      const _component_UBadge = _sfc_main$c;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6" }, _attrs))}><div class="flex flex-col sm:flex-row gap-6"><!-- Image --><div class="w-full sm:w-48 h-48 rounded-xl bg-slate-100 dark:bg-slate-700 overflow-hidden shrink-0">`);
      if (__props.primaryImage?.url) {
        _push(`<img${ssrRenderAttr("src", __props.primaryImage.url)}${ssrRenderAttr("alt", __props.product.name)} class="w-full h-full object-cover">`);
      } else {
        _push(`<div class="w-full h-full flex items-center justify-center">`);
        _push(ssrRenderComponent(_component_UIcon, {
          name: "i-heroicons-photo",
          class: "w-16 h-16 text-slate-400"
        }, null, _parent));
        _push(`</div>`);
      }
      _push(`</div><!-- Info --><div class="flex-1 min-w-0"><div class="flex items-center gap-2 mb-2 flex-wrap">`);
      _push(ssrRenderComponent(_component_UBadge, {
        color: unref(getStatusConfig)(__props.product.status).color,
        variant: "subtle"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`${ssrInterpolate(unref(getStatusConfig)(__props.product.status).label)}`);
          } else {
            return [
              createTextVNode(
                toDisplayString(unref(getStatusConfig)(__props.product.status).label),
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
        color: unref(getConditionConfig)(__props.product.condition).color,
        variant: "subtle"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`${ssrInterpolate(unref(getConditionConfig)(__props.product.condition).label)}`);
          } else {
            return [
              createTextVNode(
                toDisplayString(unref(getConditionConfig)(__props.product.condition).label),
                1
                /* TEXT */
              )
            ];
          }
        }),
        _: 1
        /* STABLE */
      }, _parent));
      if (__props.product.isFeatured) {
        _push(ssrRenderComponent(_component_UBadge, {
          color: "warning",
          variant: "subtle"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(_component_UIcon, {
                name: "i-heroicons-star",
                class: "w-3 h-3 mr-0.5"
              }, null, _parent2, _scopeId));
              _push2(` Featured `);
            } else {
              return [
                createVNode(_component_UIcon, {
                  name: "i-heroicons-star",
                  class: "w-3 h-3 mr-0.5"
                }),
                createTextVNode(" Featured ")
              ];
            }
          }),
          _: 1
          /* STABLE */
        }, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(`</div><h2 class="text-xl font-bold text-slate-900 dark:text-white mb-2">${ssrInterpolate(__props.product.name)}</h2><div class="flex items-center gap-4 text-sm text-slate-500 dark:text-slate-400 mb-4 flex-wrap"><span>SKU: ${ssrInterpolate(__props.product.sku)}</span>`);
      if (__props.product.category) {
        _push(`<span>• ${ssrInterpolate(__props.product.category.name)}</span>`);
      } else {
        _push(`<!---->`);
      }
      if (__props.product.brand) {
        _push(`<span>• ${ssrInterpolate(__props.product.brand)}</span>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div class="flex items-baseline gap-3 mb-4 flex-wrap"><span class="text-2xl font-bold text-violet-600 dark:text-violet-400">${ssrInterpolate(unref(formatPrice)(__props.product.discountPrice || __props.product.price))}</span>`);
      if (__props.product.discountPrice) {
        _push(`<span class="text-lg text-slate-400 line-through">${ssrInterpolate(unref(formatPrice)(__props.product.price))}</span>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div class="grid grid-cols-2 sm:grid-cols-4 gap-4"><div><p class="text-xs text-slate-500 dark:text-slate-400">Stok</p><p class="${ssrRenderClass([
        __props.product.stock === 0 ? "text-red-500" : __props.product.stock <= 10 ? "text-amber-500" : "text-slate-900 dark:text-white",
        "font-semibold"
      ])}">${ssrInterpolate(unref(formatNumber)(__props.product.stock))}</p></div><div><p class="text-xs text-slate-500 dark:text-slate-400">Terjual</p><p class="font-semibold text-slate-900 dark:text-white">${ssrInterpolate(unref(formatNumber)(__props.product.totalSold))}</p></div><div><p class="text-xs text-slate-500 dark:text-slate-400">Rating</p><div class="flex items-center gap-1">`);
      _push(ssrRenderComponent(_component_UIcon, {
        name: "i-heroicons-star-solid",
        class: "w-4 h-4 text-amber-400"
      }, null, _parent));
      _push(`<span class="font-semibold text-slate-900 dark:text-white">${ssrInterpolate(Number(__props.product.rating || 0).toFixed(1))}</span><span class="text-xs text-slate-500">(${ssrInterpolate(__props.product.totalReviews)})</span></div></div><div><p class="text-xs text-slate-500 dark:text-slate-400">Dilihat</p><p class="font-semibold text-slate-900 dark:text-white">${ssrInterpolate(unref(formatNumber)(__props.product.viewCount))}</p></div></div></div></div></div>`);
    };
  }
});

const _sfc_setup$8 = _sfc_main$8.setup;
_sfc_main$8.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("inertia/components/admin/products/show/ProductShowInfo.vue");
  return _sfc_setup$8 ? _sfc_setup$8(props, ctx) : void 0;
};

const _sfc_main$7 = /* @__PURE__ */ defineComponent({
  __name: "ProductShowDescription",
  __ssrInlineRender: true,
  props: {
    description: {}
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      if (__props.description) {
        _push(`<div${ssrRenderAttrs(mergeProps({ class: "bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6" }, _attrs))}><h3 class="font-semibold text-slate-900 dark:text-white mb-3">Deskripsi</h3><div class="prose prose-slate dark:prose-invert max-w-none text-sm"><p class="whitespace-pre-wrap">${ssrInterpolate(__props.description)}</p></div></div>`);
      } else {
        _push(`<!---->`);
      }
    };
  }
});

const _sfc_setup$7 = _sfc_main$7.setup;
_sfc_main$7.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("inertia/components/admin/products/show/ProductShowDescription.vue");
  return _sfc_setup$7 ? _sfc_setup$7(props, ctx) : void 0;
};

const _sfc_main$6 = /* @__PURE__ */ defineComponent({
  __name: "ProductShowSpecifications",
  __ssrInlineRender: true,
  props: {
    specifications: {}
  },
  setup(__props) {
    const props = __props;
    const parsedSpecifications = computed(() => {
      if (!props.specifications) return null;
      try {
        if (typeof props.specifications === "object") {
          return props.specifications;
        }
        return JSON.parse(props.specifications);
      } catch {
        return null;
      }
    });
    return (_ctx, _push, _parent, _attrs) => {
      if (__props.specifications) {
        _push(`<div${ssrRenderAttrs(mergeProps({ class: "bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6" }, _attrs))}><h3 class="font-semibold text-slate-900 dark:text-white mb-3">Spesifikasi</h3><!-- If specifications is valid JSON object, show as table -->`);
        if (parsedSpecifications.value) {
          _push(`<div class="overflow-x-auto"><table class="w-full text-sm"><tbody class="divide-y divide-slate-200 dark:divide-slate-700"><!--[-->`);
          ssrRenderList(parsedSpecifications.value, (value, key) => {
            _push(`<tr class="hover:bg-slate-50 dark:hover:bg-slate-900/30"><td class="py-2 pr-4 text-slate-500 dark:text-slate-400 capitalize font-medium w-1/3">${ssrInterpolate(String(key).replace(/_/g, " "))}</td><td class="py-2 text-slate-900 dark:text-white">${ssrInterpolate(value)}</td></tr>`);
          });
          _push(`<!--]--></tbody></table></div>`);
        } else {
          _push(`<!--[--><!-- Fallback: show as raw text if not valid JSON --><div class="prose prose-slate dark:prose-invert max-w-none text-sm"><p class="whitespace-pre-wrap">${ssrInterpolate(__props.specifications)}</p></div><!--]-->`);
        }
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
    };
  }
});

const _sfc_setup$6 = _sfc_main$6.setup;
_sfc_main$6.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("inertia/components/admin/products/show/ProductShowSpecifications.vue");
  return _sfc_setup$6 ? _sfc_setup$6(props, ctx) : void 0;
};

const _sfc_main$5 = /* @__PURE__ */ defineComponent({
  __name: "ProductShowGallery",
  __ssrInlineRender: true,
  props: {
    images: {},
    productName: {}
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      if (__props.images && __props.images.length > 0) {
        _push(`<div${ssrRenderAttrs(mergeProps({ class: "bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6" }, _attrs))}><h3 class="font-semibold text-slate-900 dark:text-white mb-3"> Galeri Gambar (${ssrInterpolate(__props.images.length)}) </h3><div class="grid grid-cols-4 sm:grid-cols-6 gap-3"><!--[-->`);
        ssrRenderList(__props.images, (image) => {
          _push(`<div class="aspect-square rounded-lg bg-slate-100 dark:bg-slate-700 overflow-hidden relative"><img${ssrRenderAttr("src", image.url)}${ssrRenderAttr("alt", image.alt || __props.productName)} class="w-full h-full object-cover">`);
          if (image.isPrimary) {
            _push(`<div class="absolute top-1 left-1 px-1.5 py-0.5 bg-violet-500 text-white text-[10px] rounded"> Utama </div>`);
          } else {
            _push(`<!---->`);
          }
          _push(`</div>`);
        });
        _push(`<!--]--></div></div>`);
      } else {
        _push(`<!---->`);
      }
    };
  }
});

const _sfc_setup$5 = _sfc_main$5.setup;
_sfc_main$5.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("inertia/components/admin/products/show/ProductShowGallery.vue");
  return _sfc_setup$5 ? _sfc_setup$5(props, ctx) : void 0;
};

const _sfc_main$4 = /* @__PURE__ */ defineComponent({
  __name: "ProductShowDetails",
  __ssrInlineRender: true,
  props: {
    product: {}
  },
  setup(__props) {
    const formatDate = (date) => {
      return new Date(date).toLocaleDateString("id-ID", {
        day: "numeric",
        month: "long",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit"
      });
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6" }, _attrs))}><h3 class="font-semibold text-slate-900 dark:text-white mb-4">Detail Produk</h3><dl class="space-y-3 text-sm"><div class="flex justify-between"><dt class="text-slate-500 dark:text-slate-400">Berat</dt><dd class="font-medium text-slate-900 dark:text-white">${ssrInterpolate(unref(formatNumber)(__props.product.weight))} gram</dd></div><div class="flex justify-between"><dt class="text-slate-500 dark:text-slate-400">Min. Pembelian</dt><dd class="font-medium text-slate-900 dark:text-white">${ssrInterpolate(__props.product.minOrder)}</dd></div>`);
      if (__props.product.maxOrder) {
        _push(`<div class="flex justify-between"><dt class="text-slate-500 dark:text-slate-400">Maks. Pembelian</dt><dd class="font-medium text-slate-900 dark:text-white">${ssrInterpolate(__props.product.maxOrder)}</dd></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="flex justify-between"><dt class="text-slate-500 dark:text-slate-400">Dibuat</dt><dd class="font-medium text-slate-900 dark:text-white text-right">${ssrInterpolate(formatDate(__props.product.createdAt))}</dd></div><div class="flex justify-between"><dt class="text-slate-500 dark:text-slate-400">Diperbarui</dt><dd class="font-medium text-slate-900 dark:text-white text-right">${ssrInterpolate(formatDate(__props.product.updatedAt))}</dd></div></dl></div>`);
    };
  }
});

const _sfc_setup$4 = _sfc_main$4.setup;
_sfc_main$4.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("inertia/components/admin/products/show/ProductShowDetails.vue");
  return _sfc_setup$4 ? _sfc_setup$4(props, ctx) : void 0;
};

const _sfc_main$3 = /* @__PURE__ */ defineComponent({
  __name: "ProductShowActions",
  __ssrInlineRender: true,
  props: {
    productId: {},
    productName: {},
    status: {}
  },
  emits: ["delete"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const toast = useToast();
    const isLoading = ref(false);
    const duplicateModalOpen = ref(false);
    const statusModalOpen = ref(false);
    const getXsrfToken = () => {
      if (typeof document === "undefined") return null;
      const match = document.cookie.match(/XSRF-TOKEN=([^;]+)/);
      return match ? decodeURIComponent(match[1]) : null;
    };
    const handleDuplicate = async () => {
      isLoading.value = true;
      try {
        const xsrfToken = getXsrfToken();
        const response = await fetch(`/admin/products/${props.productId}/duplicate`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-Requested-With": "XMLHttpRequest",
            ...xsrfToken && { "X-XSRF-TOKEN": xsrfToken }
          }
        });
        const data = await response.json();
        if (data.success) {
          toast.success("Berhasil", data.message);
          duplicateModalOpen.value = false;
          router.visit(`/admin/products/${data.productId}/edit`);
        } else {
          toast.error("Gagal", data.message);
        }
      } catch (error) {
        toast.error("Error", "Terjadi kesalahan saat menduplikasi produk. Silakan coba lagi.");
      } finally {
        isLoading.value = false;
      }
    };
    const handleToggleStatus = async () => {
      isLoading.value = true;
      try {
        const xsrfToken = getXsrfToken();
        const response = await fetch(`/admin/products/${props.productId}/status`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            "X-Requested-With": "XMLHttpRequest",
            ...xsrfToken && { "X-XSRF-TOKEN": xsrfToken }
          }
        });
        const data = await response.json();
        if (data.success) {
          toast.success("Berhasil", data.message);
          statusModalOpen.value = false;
          router.reload();
        } else {
          toast.error("Gagal", data.message);
        }
      } catch (error) {
        toast.error("Error", "Terjadi kesalahan saat mengubah status produk. Silakan coba lagi.");
      } finally {
        isLoading.value = false;
      }
    };
    const statusActionText = props.status === "active" ? "menonaktifkan" : "mengaktifkan";
    const statusResultText = props.status === "active" ? "Nonaktif" : "Aktif";
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UButton = _sfc_main$a;
      const _component_UModal = _sfc_main$d;
      const _component_UIcon = _sfc_main$b;
      const _component_UBadge = _sfc_main$c;
      _push(`<!--[--><div class="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6"><h3 class="font-semibold text-slate-900 dark:text-white mb-4">Aksi Cepat</h3><div class="space-y-2">`);
      _push(ssrRenderComponent(unref(Link), {
        href: `/admin/products/${__props.productId}/edit`,
        class: "block"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_UButton, {
              icon: "i-heroicons-pencil",
              color: "primary",
              variant: "outline",
              class: "w-full justify-start"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Edit Produk `);
                } else {
                  return [
                    createTextVNode(" Edit Produk ")
                  ];
                }
              }),
              _: 1
              /* STABLE */
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_UButton, {
                icon: "i-heroicons-pencil",
                color: "primary",
                variant: "outline",
                class: "w-full justify-start"
              }, {
                default: withCtx(() => [
                  createTextVNode(" Edit Produk ")
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
      _push(ssrRenderComponent(_component_UButton, {
        icon: "i-heroicons-document-duplicate",
        color: "primary",
        variant: "outline",
        class: "w-full justify-start",
        onClick: ($event) => duplicateModalOpen.value = true
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` Duplikat Produk `);
          } else {
            return [
              createTextVNode(" Duplikat Produk ")
            ];
          }
        }),
        _: 1
        /* STABLE */
      }, _parent));
      if (__props.status === "active") {
        _push(ssrRenderComponent(_component_UButton, {
          icon: "i-heroicons-pause-circle",
          color: "warning",
          variant: "outline",
          class: "w-full justify-start",
          onClick: ($event) => statusModalOpen.value = true
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(` Nonaktifkan `);
            } else {
              return [
                createTextVNode(" Nonaktifkan ")
              ];
            }
          }),
          _: 1
          /* STABLE */
        }, _parent));
      } else {
        _push(ssrRenderComponent(_component_UButton, {
          icon: "i-heroicons-check-circle",
          color: "success",
          variant: "outline",
          class: "w-full justify-start",
          onClick: ($event) => statusModalOpen.value = true
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(` Aktifkan `);
            } else {
              return [
                createTextVNode(" Aktifkan ")
              ];
            }
          }),
          _: 1
          /* STABLE */
        }, _parent));
      }
      _push(ssrRenderComponent(_component_UButton, {
        icon: "i-heroicons-trash",
        color: "error",
        variant: "outline",
        class: "w-full justify-start",
        onClick: ($event) => emit("delete")
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` Hapus Produk `);
          } else {
            return [
              createTextVNode(" Hapus Produk ")
            ];
          }
        }),
        _: 1
        /* STABLE */
      }, _parent));
      _push(`</div></div><!-- Duplicate Confirmation Modal -->`);
      _push(ssrRenderComponent(_component_UModal, {
        open: duplicateModalOpen.value,
        "onUpdate:open": ($event) => duplicateModalOpen.value = $event,
        title: "Duplikat Produk",
        description: "Konfirmasi duplikasi produk"
      }, {
        content: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="p-6"${_scopeId}><div class="flex items-center gap-4 mb-4"${_scopeId}><div class="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center"${_scopeId}>`);
            _push2(ssrRenderComponent(_component_UIcon, {
              name: "i-heroicons-document-duplicate",
              class: "w-6 h-6 text-blue-500"
            }, null, _parent2, _scopeId));
            _push2(`</div><div${_scopeId}><h3 class="text-lg font-semibold text-slate-900 dark:text-white"${_scopeId}>Duplikat Produk</h3><p class="text-sm text-slate-500 dark:text-slate-400"${_scopeId}> Konfirmasi duplikasi produk </p></div></div><div class="bg-slate-50 dark:bg-slate-900/50 rounded-lg p-4 mb-4"${_scopeId}><p class="text-sm text-slate-600 dark:text-slate-400 mb-2"${_scopeId}> Anda akan menduplikasi produk: </p><p class="font-semibold text-slate-900 dark:text-white"${_scopeId}>${ssrInterpolate(__props.productName)}</p></div><div class="text-sm text-slate-600 dark:text-slate-400 mb-6 space-y-2"${_scopeId}><p class="flex items-center gap-2"${_scopeId}>`);
            _push2(ssrRenderComponent(_component_UIcon, {
              name: "i-heroicons-check-circle",
              class: "w-4 h-4 text-green-500"
            }, null, _parent2, _scopeId));
            _push2(` Produk baru akan dibuat dengan status <strong${_scopeId}>Draft</strong></p><p class="flex items-center gap-2"${_scopeId}>`);
            _push2(ssrRenderComponent(_component_UIcon, {
              name: "i-heroicons-check-circle",
              class: "w-4 h-4 text-green-500"
            }, null, _parent2, _scopeId));
            _push2(` SKU baru akan digenerate secara otomatis </p><p class="flex items-center gap-2"${_scopeId}>`);
            _push2(ssrRenderComponent(_component_UIcon, {
              name: "i-heroicons-check-circle",
              class: "w-4 h-4 text-green-500"
            }, null, _parent2, _scopeId));
            _push2(` Varian produk akan ikut diduplikasi </p><p class="flex items-center gap-2"${_scopeId}>`);
            _push2(ssrRenderComponent(_component_UIcon, {
              name: "i-heroicons-exclamation-triangle",
              class: "w-4 h-4 text-amber-500"
            }, null, _parent2, _scopeId));
            _push2(` Gambar produk <strong${_scopeId}>tidak</strong> akan diduplikasi </p></div><div class="flex justify-end gap-3"${_scopeId}>`);
            _push2(ssrRenderComponent(_component_UButton, {
              color: "neutral",
              variant: "outline",
              onClick: ($event) => duplicateModalOpen.value = false,
              disabled: isLoading.value
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
              color: "primary",
              onClick: handleDuplicate,
              loading: isLoading.value
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_UIcon, {
                    name: "i-heroicons-document-duplicate",
                    class: "w-4 h-4 mr-1"
                  }, null, _parent3, _scopeId2));
                  _push3(` Duplikat Sekarang `);
                } else {
                  return [
                    createVNode(_component_UIcon, {
                      name: "i-heroicons-document-duplicate",
                      class: "w-4 h-4 mr-1"
                    }),
                    createTextVNode(" Duplikat Sekarang ")
                  ];
                }
              }),
              _: 1
              /* STABLE */
            }, _parent2, _scopeId));
            _push2(`</div></div>`);
          } else {
            return [
              createVNode("div", { class: "p-6" }, [
                createVNode("div", { class: "flex items-center gap-4 mb-4" }, [
                  createVNode("div", { class: "w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center" }, [
                    createVNode(_component_UIcon, {
                      name: "i-heroicons-document-duplicate",
                      class: "w-6 h-6 text-blue-500"
                    })
                  ]),
                  createVNode("div", null, [
                    createVNode("h3", { class: "text-lg font-semibold text-slate-900 dark:text-white" }, "Duplikat Produk"),
                    createVNode("p", { class: "text-sm text-slate-500 dark:text-slate-400" }, " Konfirmasi duplikasi produk ")
                  ])
                ]),
                createVNode("div", { class: "bg-slate-50 dark:bg-slate-900/50 rounded-lg p-4 mb-4" }, [
                  createVNode("p", { class: "text-sm text-slate-600 dark:text-slate-400 mb-2" }, " Anda akan menduplikasi produk: "),
                  createVNode(
                    "p",
                    { class: "font-semibold text-slate-900 dark:text-white" },
                    toDisplayString(__props.productName),
                    1
                    /* TEXT */
                  )
                ]),
                createVNode("div", { class: "text-sm text-slate-600 dark:text-slate-400 mb-6 space-y-2" }, [
                  createVNode("p", { class: "flex items-center gap-2" }, [
                    createVNode(_component_UIcon, {
                      name: "i-heroicons-check-circle",
                      class: "w-4 h-4 text-green-500"
                    }),
                    createTextVNode(" Produk baru akan dibuat dengan status "),
                    createVNode("strong", null, "Draft")
                  ]),
                  createVNode("p", { class: "flex items-center gap-2" }, [
                    createVNode(_component_UIcon, {
                      name: "i-heroicons-check-circle",
                      class: "w-4 h-4 text-green-500"
                    }),
                    createTextVNode(" SKU baru akan digenerate secara otomatis ")
                  ]),
                  createVNode("p", { class: "flex items-center gap-2" }, [
                    createVNode(_component_UIcon, {
                      name: "i-heroicons-check-circle",
                      class: "w-4 h-4 text-green-500"
                    }),
                    createTextVNode(" Varian produk akan ikut diduplikasi ")
                  ]),
                  createVNode("p", { class: "flex items-center gap-2" }, [
                    createVNode(_component_UIcon, {
                      name: "i-heroicons-exclamation-triangle",
                      class: "w-4 h-4 text-amber-500"
                    }),
                    createTextVNode(" Gambar produk "),
                    createVNode("strong", null, "tidak"),
                    createTextVNode(" akan diduplikasi ")
                  ])
                ]),
                createVNode("div", { class: "flex justify-end gap-3" }, [
                  createVNode(_component_UButton, {
                    color: "neutral",
                    variant: "outline",
                    onClick: ($event) => duplicateModalOpen.value = false,
                    disabled: isLoading.value
                  }, {
                    default: withCtx(() => [
                      createTextVNode(" Batal ")
                    ]),
                    _: 1
                    /* STABLE */
                  }, 8, ["onClick", "disabled"]),
                  createVNode(_component_UButton, {
                    color: "primary",
                    onClick: handleDuplicate,
                    loading: isLoading.value
                  }, {
                    default: withCtx(() => [
                      createVNode(_component_UIcon, {
                        name: "i-heroicons-document-duplicate",
                        class: "w-4 h-4 mr-1"
                      }),
                      createTextVNode(" Duplikat Sekarang ")
                    ]),
                    _: 1
                    /* STABLE */
                  }, 8, ["loading"])
                ])
              ])
            ];
          }
        }),
        _: 1
        /* STABLE */
      }, _parent));
      _push(`<!-- Toggle Status Confirmation Modal -->`);
      _push(ssrRenderComponent(_component_UModal, {
        open: statusModalOpen.value,
        "onUpdate:open": ($event) => statusModalOpen.value = $event,
        title: __props.status === "active" ? "Nonaktifkan Produk" : "Aktifkan Produk",
        description: "Konfirmasi perubahan status produk"
      }, {
        content: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="p-6"${_scopeId}><div class="flex items-center gap-4 mb-4"${_scopeId}><div class="${ssrRenderClass([__props.status === "active" ? "bg-amber-100 dark:bg-amber-900/30" : "bg-green-100 dark:bg-green-900/30", "w-12 h-12 rounded-full flex items-center justify-center"])}"${_scopeId}>`);
            _push2(ssrRenderComponent(_component_UIcon, {
              name: __props.status === "active" ? "i-heroicons-pause-circle" : "i-heroicons-check-circle",
              class: ["w-6 h-6", __props.status === "active" ? "text-amber-500" : "text-green-500"]
            }, null, _parent2, _scopeId));
            _push2(`</div><div${_scopeId}><h3 class="text-lg font-semibold text-slate-900 dark:text-white"${_scopeId}>${ssrInterpolate(__props.status === "active" ? "Nonaktifkan" : "Aktifkan")} Produk </h3><p class="text-sm text-slate-500 dark:text-slate-400"${_scopeId}> Konfirmasi perubahan status produk </p></div></div><div class="bg-slate-50 dark:bg-slate-900/50 rounded-lg p-4 mb-4"${_scopeId}><p class="text-sm text-slate-600 dark:text-slate-400 mb-2"${_scopeId}> Anda akan ${ssrInterpolate(unref(statusActionText))} produk: </p><p class="font-semibold text-slate-900 dark:text-white"${_scopeId}>${ssrInterpolate(__props.productName)}</p></div><div class="text-sm text-slate-600 dark:text-slate-400 mb-6 space-y-2"${_scopeId}>`);
            if (__props.status === "active") {
              _push2(`<p class="flex items-start gap-2"${_scopeId}>`);
              _push2(ssrRenderComponent(_component_UIcon, {
                name: "i-heroicons-information-circle",
                class: "w-4 h-4 text-blue-500 mt-0.5"
              }, null, _parent2, _scopeId));
              _push2(`<span${_scopeId}>Produk yang dinonaktifkan <strong${_scopeId}>tidak akan tampil</strong> di etalase toko dan tidak bisa dibeli oleh pelanggan.</span></p>`);
            } else {
              _push2(`<p class="flex items-start gap-2"${_scopeId}>`);
              _push2(ssrRenderComponent(_component_UIcon, {
                name: "i-heroicons-information-circle",
                class: "w-4 h-4 text-blue-500 mt-0.5"
              }, null, _parent2, _scopeId));
              _push2(`<span${_scopeId}>Produk yang diaktifkan akan <strong${_scopeId}>tampil di etalase toko</strong> dan bisa dibeli oleh pelanggan.</span></p>`);
            }
            _push2(`<p class="flex items-center gap-2"${_scopeId}>`);
            _push2(ssrRenderComponent(_component_UIcon, {
              name: "i-heroicons-arrow-path",
              class: "w-4 h-4 text-slate-400"
            }, null, _parent2, _scopeId));
            _push2(` Status baru: `);
            _push2(ssrRenderComponent(_component_UBadge, {
              color: __props.status === "active" ? "warning" : "success",
              variant: "subtle",
              size: "xs"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`${ssrInterpolate(unref(statusResultText))}`);
                } else {
                  return [
                    createTextVNode(
                      toDisplayString(unref(statusResultText)),
                      1
                      /* TEXT */
                    )
                  ];
                }
              }),
              _: 1
              /* STABLE */
            }, _parent2, _scopeId));
            _push2(`</p></div><div class="flex justify-end gap-3"${_scopeId}>`);
            _push2(ssrRenderComponent(_component_UButton, {
              color: "neutral",
              variant: "outline",
              onClick: ($event) => statusModalOpen.value = false,
              disabled: isLoading.value
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
              color: __props.status === "active" ? "warning" : "success",
              onClick: handleToggleStatus,
              loading: isLoading.value
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_UIcon, {
                    name: __props.status === "active" ? "i-heroicons-pause-circle" : "i-heroicons-check-circle",
                    class: "w-4 h-4 mr-1"
                  }, null, _parent3, _scopeId2));
                  _push3(` ${ssrInterpolate(__props.status === "active" ? "Nonaktifkan" : "Aktifkan")} Sekarang `);
                } else {
                  return [
                    createVNode(_component_UIcon, {
                      name: __props.status === "active" ? "i-heroicons-pause-circle" : "i-heroicons-check-circle",
                      class: "w-4 h-4 mr-1"
                    }, null, 8, ["name"]),
                    createTextVNode(
                      " " + toDisplayString(__props.status === "active" ? "Nonaktifkan" : "Aktifkan") + " Sekarang ",
                      1
                      /* TEXT */
                    )
                  ];
                }
              }),
              _: 1
              /* STABLE */
            }, _parent2, _scopeId));
            _push2(`</div></div>`);
          } else {
            return [
              createVNode("div", { class: "p-6" }, [
                createVNode("div", { class: "flex items-center gap-4 mb-4" }, [
                  createVNode(
                    "div",
                    {
                      class: ["w-12 h-12 rounded-full flex items-center justify-center", __props.status === "active" ? "bg-amber-100 dark:bg-amber-900/30" : "bg-green-100 dark:bg-green-900/30"]
                    },
                    [
                      createVNode(_component_UIcon, {
                        name: __props.status === "active" ? "i-heroicons-pause-circle" : "i-heroicons-check-circle",
                        class: ["w-6 h-6", __props.status === "active" ? "text-amber-500" : "text-green-500"]
                      }, null, 8, ["name", "class"])
                    ],
                    2
                    /* CLASS */
                  ),
                  createVNode("div", null, [
                    createVNode(
                      "h3",
                      { class: "text-lg font-semibold text-slate-900 dark:text-white" },
                      toDisplayString(__props.status === "active" ? "Nonaktifkan" : "Aktifkan") + " Produk ",
                      1
                      /* TEXT */
                    ),
                    createVNode("p", { class: "text-sm text-slate-500 dark:text-slate-400" }, " Konfirmasi perubahan status produk ")
                  ])
                ]),
                createVNode("div", { class: "bg-slate-50 dark:bg-slate-900/50 rounded-lg p-4 mb-4" }, [
                  createVNode(
                    "p",
                    { class: "text-sm text-slate-600 dark:text-slate-400 mb-2" },
                    " Anda akan " + toDisplayString(unref(statusActionText)) + " produk: ",
                    1
                    /* TEXT */
                  ),
                  createVNode(
                    "p",
                    { class: "font-semibold text-slate-900 dark:text-white" },
                    toDisplayString(__props.productName),
                    1
                    /* TEXT */
                  )
                ]),
                createVNode("div", { class: "text-sm text-slate-600 dark:text-slate-400 mb-6 space-y-2" }, [
                  __props.status === "active" ? (openBlock(), createBlock("p", {
                    key: 0,
                    class: "flex items-start gap-2"
                  }, [
                    createVNode(_component_UIcon, {
                      name: "i-heroicons-information-circle",
                      class: "w-4 h-4 text-blue-500 mt-0.5"
                    }),
                    createVNode("span", null, [
                      createTextVNode("Produk yang dinonaktifkan "),
                      createVNode("strong", null, "tidak akan tampil"),
                      createTextVNode(" di etalase toko dan tidak bisa dibeli oleh pelanggan.")
                    ])
                  ])) : (openBlock(), createBlock("p", {
                    key: 1,
                    class: "flex items-start gap-2"
                  }, [
                    createVNode(_component_UIcon, {
                      name: "i-heroicons-information-circle",
                      class: "w-4 h-4 text-blue-500 mt-0.5"
                    }),
                    createVNode("span", null, [
                      createTextVNode("Produk yang diaktifkan akan "),
                      createVNode("strong", null, "tampil di etalase toko"),
                      createTextVNode(" dan bisa dibeli oleh pelanggan.")
                    ])
                  ])),
                  createVNode("p", { class: "flex items-center gap-2" }, [
                    createVNode(_component_UIcon, {
                      name: "i-heroicons-arrow-path",
                      class: "w-4 h-4 text-slate-400"
                    }),
                    createTextVNode(" Status baru: "),
                    createVNode(_component_UBadge, {
                      color: __props.status === "active" ? "warning" : "success",
                      variant: "subtle",
                      size: "xs"
                    }, {
                      default: withCtx(() => [
                        createTextVNode(
                          toDisplayString(unref(statusResultText)),
                          1
                          /* TEXT */
                        )
                      ]),
                      _: 1
                      /* STABLE */
                    }, 8, ["color"])
                  ])
                ]),
                createVNode("div", { class: "flex justify-end gap-3" }, [
                  createVNode(_component_UButton, {
                    color: "neutral",
                    variant: "outline",
                    onClick: ($event) => statusModalOpen.value = false,
                    disabled: isLoading.value
                  }, {
                    default: withCtx(() => [
                      createTextVNode(" Batal ")
                    ]),
                    _: 1
                    /* STABLE */
                  }, 8, ["onClick", "disabled"]),
                  createVNode(_component_UButton, {
                    color: __props.status === "active" ? "warning" : "success",
                    onClick: handleToggleStatus,
                    loading: isLoading.value
                  }, {
                    default: withCtx(() => [
                      createVNode(_component_UIcon, {
                        name: __props.status === "active" ? "i-heroicons-pause-circle" : "i-heroicons-check-circle",
                        class: "w-4 h-4 mr-1"
                      }, null, 8, ["name"]),
                      createTextVNode(
                        " " + toDisplayString(__props.status === "active" ? "Nonaktifkan" : "Aktifkan") + " Sekarang ",
                        1
                        /* TEXT */
                      )
                    ]),
                    _: 1
                    /* STABLE */
                  }, 8, ["color", "loading"])
                ])
              ])
            ];
          }
        }),
        _: 1
        /* STABLE */
      }, _parent));
      _push(`<!--]-->`);
    };
  }
});

const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("inertia/components/admin/products/show/ProductShowActions.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};

const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "ProductShowVariants",
  __ssrInlineRender: true,
  props: {
    variants: {}
  },
  setup(__props) {
    const formatVariantPrice = (price) => {
      const numPrice = Number(price);
      if (isNaN(numPrice)) return "Rp0";
      return formatPrice(numPrice);
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UBadge = _sfc_main$c;
      if (__props.variants && __props.variants.length > 0) {
        _push(`<div${ssrRenderAttrs(mergeProps({ class: "bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6" }, _attrs))}><h3 class="font-semibold text-slate-900 dark:text-white mb-4"> Varian (${ssrInterpolate(__props.variants.length)}) </h3><div class="space-y-3"><!--[-->`);
        ssrRenderList(__props.variants, (variant) => {
          _push(`<div class="p-3 rounded-lg bg-slate-50 dark:bg-slate-900/50"><div class="flex items-center justify-between"><div><p class="font-medium text-slate-900 dark:text-white text-sm">${ssrInterpolate(variant.name || "Varian")}: ${ssrInterpolate(variant.value)}</p>`);
          if (variant.sku) {
            _push(`<span class="text-xs text-slate-400">SKU: ${ssrInterpolate(variant.sku)}</span>`);
          } else {
            _push(`<!---->`);
          }
          _push(`</div>`);
          _push(ssrRenderComponent(_component_UBadge, {
            color: variant.isActive ? "success" : "neutral",
            variant: "subtle",
            size: "xs"
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`${ssrInterpolate(variant.isActive ? "Aktif" : "Nonaktif")}`);
              } else {
                return [
                  createTextVNode(
                    toDisplayString(variant.isActive ? "Aktif" : "Nonaktif"),
                    1
                    /* TEXT */
                  )
                ];
              }
            }),
            _: 2
            /* DYNAMIC */
          }, _parent));
          _push(`</div><div class="flex items-center justify-between mt-2 text-xs text-slate-500"><span class="font-semibold text-violet-600 dark:text-violet-400">${ssrInterpolate(variant.priceAdjustment > 0 ? "+" : "")}${ssrInterpolate(formatVariantPrice(variant.priceAdjustment))}</span><span>Stok: ${ssrInterpolate(variant.stock ?? 0)}</span></div></div>`);
        });
        _push(`<!--]--></div></div>`);
      } else {
        _push(`<!---->`);
      }
    };
  }
});

const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("inertia/components/admin/products/show/ProductShowVariants.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};

const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "ProductDeleteModal",
  __ssrInlineRender: true,
  props: /* @__PURE__ */ mergeModels({
    productId: {},
    productName: {}
  }, {
    "open": { type: Boolean, ...{ default: false } },
    "openModifiers": {}
  }),
  emits: ["update:open"],
  setup(__props) {
    const props = __props;
    const open = useModel(__props, "open");
    const toast = useToast();
    const isDeleting = ref(false);
    const getXsrfToken = () => {
      if (typeof document === "undefined") return null;
      const match = document.cookie.match(/XSRF-TOKEN=([^;]+)/);
      return match ? decodeURIComponent(match[1]) : null;
    };
    const handleDelete = async () => {
      isDeleting.value = true;
      try {
        const xsrfToken = getXsrfToken();
        const response = await fetch(`/admin/products/${props.productId}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            "X-Requested-With": "XMLHttpRequest",
            ...xsrfToken && { "X-XSRF-TOKEN": xsrfToken }
          }
        });
        const data = await response.json();
        if (data.success) {
          toast.success("Berhasil", data.message);
          router.visit("/admin/products");
        } else {
          toast.error("Gagal", data.message);
        }
      } catch (error) {
        toast.error("Error", "Terjadi kesalahan saat menghapus produk");
      } finally {
        isDeleting.value = false;
        open.value = false;
      }
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UModal = _sfc_main$d;
      const _component_UIcon = _sfc_main$b;
      const _component_UButton = _sfc_main$a;
      _push(ssrRenderComponent(_component_UModal, mergeProps({
        open: open.value,
        "onUpdate:open": ($event) => open.value = $event,
        title: "Hapus Produk",
        description: "Apakah Anda yakin ingin menghapus produk ini?"
      }, _attrs), {
        content: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="p-6"${_scopeId}><div class="flex items-center gap-4 mb-4"${_scopeId}><div class="w-12 h-12 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center"${_scopeId}>`);
            _push2(ssrRenderComponent(_component_UIcon, {
              name: "i-heroicons-trash",
              class: "w-6 h-6 text-red-500"
            }, null, _parent2, _scopeId));
            _push2(`</div><div${_scopeId}><h3 class="text-lg font-semibold text-slate-900 dark:text-white"${_scopeId}>Hapus Produk</h3><p class="text-sm text-slate-500 dark:text-slate-400"${_scopeId}> Apakah Anda yakin ingin menghapus produk ini? </p></div></div><p class="text-sm text-slate-600 dark:text-slate-400 mb-6"${_scopeId}><strong${_scopeId}>${ssrInterpolate(__props.productName)}</strong> akan dihapus secara permanen. Tindakan ini tidak dapat dibatalkan. </p><div class="flex justify-end gap-3"${_scopeId}>`);
            _push2(ssrRenderComponent(_component_UButton, {
              color: "neutral",
              variant: "outline",
              onClick: ($event) => open.value = false,
              disabled: isDeleting.value
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
              onClick: handleDelete,
              loading: isDeleting.value
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
              createVNode("div", { class: "p-6" }, [
                createVNode("div", { class: "flex items-center gap-4 mb-4" }, [
                  createVNode("div", { class: "w-12 h-12 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center" }, [
                    createVNode(_component_UIcon, {
                      name: "i-heroicons-trash",
                      class: "w-6 h-6 text-red-500"
                    })
                  ]),
                  createVNode("div", null, [
                    createVNode("h3", { class: "text-lg font-semibold text-slate-900 dark:text-white" }, "Hapus Produk"),
                    createVNode("p", { class: "text-sm text-slate-500 dark:text-slate-400" }, " Apakah Anda yakin ingin menghapus produk ini? ")
                  ])
                ]),
                createVNode("p", { class: "text-sm text-slate-600 dark:text-slate-400 mb-6" }, [
                  createVNode(
                    "strong",
                    null,
                    toDisplayString(__props.productName),
                    1
                    /* TEXT */
                  ),
                  createTextVNode(" akan dihapus secara permanen. Tindakan ini tidak dapat dibatalkan. ")
                ]),
                createVNode("div", { class: "flex justify-end gap-3" }, [
                  createVNode(_component_UButton, {
                    color: "neutral",
                    variant: "outline",
                    onClick: ($event) => open.value = false,
                    disabled: isDeleting.value
                  }, {
                    default: withCtx(() => [
                      createTextVNode(" Batal ")
                    ]),
                    _: 1
                    /* STABLE */
                  }, 8, ["onClick", "disabled"]),
                  createVNode(_component_UButton, {
                    color: "error",
                    onClick: handleDelete,
                    loading: isDeleting.value
                  }, {
                    default: withCtx(() => [
                      createTextVNode(" Hapus ")
                    ]),
                    _: 1
                    /* STABLE */
                  }, 8, ["loading"])
                ])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("inertia/components/admin/products/show/ProductDeleteModal.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};

const _sfc_main = /* @__PURE__ */ defineComponent({
  ...{
    layout: AdminLayout
  },
  __name: "show",
  __ssrInlineRender: true,
  props: {
    product: {},
    admin: { default: () => ({ id: 0, storeName: "", slug: "", status: "" }) }
  },
  setup(__props) {
    const props = __props;
    const deleteModalOpen = ref(false);
    const primaryImage = computed(() => {
      if (!props.product.images || props.product.images.length === 0) {
        return null;
      }
      return props.product.images.find((img) => img.isPrimary) || props.product.images[0] || null;
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "space-y-6" }, _attrs))}><!-- Page Header -->`);
      _push(ssrRenderComponent(unref(_sfc_main$9), {
        "product-name": __props.product.name,
        "product-id": __props.product.id,
        onDelete: ($event) => deleteModalOpen.value = true
      }, null, _parent));
      _push(`<div class="grid grid-cols-1 lg:grid-cols-3 gap-6"><!-- Main Content --><div class="lg:col-span-2 space-y-6"><!-- Product Info -->`);
      _push(ssrRenderComponent(unref(_sfc_main$8), {
        product: __props.product,
        "primary-image": primaryImage.value
      }, null, _parent));
      _push(`<!-- Description -->`);
      _push(ssrRenderComponent(unref(_sfc_main$7), {
        description: __props.product.description
      }, null, _parent));
      _push(`<!-- Specifications -->`);
      _push(ssrRenderComponent(unref(_sfc_main$6), {
        specifications: __props.product.specifications
      }, null, _parent));
      _push(`<!-- Images Gallery -->`);
      _push(ssrRenderComponent(unref(_sfc_main$5), {
        images: __props.product.images,
        "product-name": __props.product.name
      }, null, _parent));
      _push(`</div><!-- Sidebar --><div class="space-y-6"><!-- Details Card -->`);
      _push(ssrRenderComponent(unref(_sfc_main$4), { product: __props.product }, null, _parent));
      _push(`<!-- Quick Actions -->`);
      _push(ssrRenderComponent(unref(_sfc_main$3), {
        "product-id": __props.product.id,
        "product-name": __props.product.name,
        status: __props.product.status,
        onDelete: ($event) => deleteModalOpen.value = true
      }, null, _parent));
      _push(`<!-- Variants -->`);
      _push(ssrRenderComponent(unref(_sfc_main$2), {
        variants: __props.product.variants
      }, null, _parent));
      _push(`</div></div><!-- Delete Confirmation Modal -->`);
      _push(ssrRenderComponent(unref(_sfc_main$1), {
        open: deleteModalOpen.value,
        "onUpdate:open": ($event) => deleteModalOpen.value = $event,
        "product-id": __props.product.id,
        "product-name": __props.product.name
      }, null, _parent));
      _push(`</div>`);
    };
  }
});

const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("inertia/pages/admin/products/show.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
