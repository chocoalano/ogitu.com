import { _ as _sfc_main$5 } from './Separator-WKKr0N6B.js';
import { _ as _sfc_main$4 } from './Checkbox-DCS-_c5K.js';
import { _ as _sfc_main$2, a as _sfc_main$3 } from './Button-BTdvmZ8N.js';
import { defineComponent, ref, computed, unref, withCtx, createTextVNode, toDisplayString, createVNode, useSSRContext } from 'vue';
import { ssrRenderComponent, ssrInterpolate, ssrRenderList, ssrRenderAttr, ssrIncludeBooleanAttr } from 'vue/server-renderer';
import { Head, Link, router } from '@inertiajs/vue3';
import { _ as _sfc_main$1, u as useCart } from './default-pjkA2Ka0.js';
import { u as useToast } from './Badge-CQlYH3Fo.js';
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
import './Modal-VctJV7vb.js';
import 'vaul-vue';
import './DropdownMenu-Zcq6i1qV.js';
import 'reka-ui/namespaced';

const _sfc_main = /* @__PURE__ */ defineComponent({
  ...{ layout: _sfc_main$1 },
  __name: "index",
  __ssrInlineRender: true,
  props: {
    cartItems: {},
    summary: {}
  },
  setup(__props) {
    const props = __props;
    const { removeFromCart, fetchCartItems } = useCart();
    const toast = useToast();
    const items = ref([...props.cartItems]);
    const isUpdating = ref(null);
    const isDeleting = ref(null);
    const selectedIds = ref(new Set(props.cartItems.filter((i) => i.checked).map((i) => i.id)));
    const isAllSelected = computed(() => {
      return items.value.length > 0 && selectedIds.value.size === items.value.length;
    });
    const selectedItems = computed(() => {
      return items.value.filter((item) => selectedIds.value.has(item.id));
    });
    const localSummary = computed(() => {
      const checked = selectedItems.value;
      return {
        totalItems: items.value.length,
        checkedItems: checked.length,
        subtotal: checked.reduce((sum, item) => sum + item.itemPrice * item.quantity, 0),
        totalQuantity: checked.reduce((sum, item) => sum + item.quantity, 0)
      };
    });
    const formatPrice = (price) => {
      return new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        minimumFractionDigits: 0
      }).format(price);
    };
    const getXsrfToken = () => {
      if (typeof document === "undefined") return null;
      const match = document.cookie.match(/XSRF-TOKEN=([^;]+)/);
      return match ? decodeURIComponent(match[1]) : null;
    };
    const toggleSelectAll = () => {
      if (isAllSelected.value) {
        selectedIds.value = /* @__PURE__ */ new Set();
      } else {
        selectedIds.value = new Set(items.value.map((i) => i.id));
      }
      updateAllCheckedStatus();
    };
    const toggleSelectItem = async (id) => {
      const newSet = new Set(selectedIds.value);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      selectedIds.value = newSet;
      try {
        const xsrfToken = getXsrfToken();
        await fetch(`/api/cart/${id}/checked`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            "X-Requested-With": "XMLHttpRequest",
            ...xsrfToken && { "X-XSRF-TOKEN": xsrfToken }
          },
          credentials: "include",
          body: JSON.stringify({ checked: newSet.has(id) })
        });
      } catch {
      }
    };
    const updateAllCheckedStatus = async () => {
      try {
        const xsrfToken = getXsrfToken();
        for (const item of items.value) {
          await fetch(`/api/cart/${item.id}/checked`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              "X-Requested-With": "XMLHttpRequest",
              ...xsrfToken && { "X-XSRF-TOKEN": xsrfToken }
            },
            credentials: "include",
            body: JSON.stringify({ checked: selectedIds.value.has(item.id) })
          });
        }
      } catch {
      }
    };
    const handleRemoveItem = async (id) => {
      isDeleting.value = id;
      const result = await removeFromCart(id);
      if (result.success) {
        items.value = items.value.filter((i) => i.id !== id);
        selectedIds.value.delete(id);
        toast.success("Item dihapus dari keranjang");
      } else {
        toast.error(result.message || "Gagal menghapus item");
      }
      isDeleting.value = null;
    };
    const handleBulkDelete = async () => {
      if (selectedIds.value.size === 0) {
        toast.warning("Pilih item yang ingin dihapus");
        return;
      }
      const ids = Array.from(selectedIds.value);
      try {
        const xsrfToken = getXsrfToken();
        const response = await fetch("/api/cart/bulk-delete", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-Requested-With": "XMLHttpRequest",
            ...xsrfToken && { "X-XSRF-TOKEN": xsrfToken }
          },
          credentials: "include",
          body: JSON.stringify({ ids })
        });
        const data = await response.json();
        if (data.success) {
          items.value = items.value.filter((i) => !ids.includes(i.id));
          selectedIds.value = /* @__PURE__ */ new Set();
          toast.success(`${data.data.deletedCount} item dihapus`);
          await fetchCartItems();
        } else {
          toast.error(data.message || "Gagal menghapus item");
        }
      } catch {
        toast.error("Terjadi kesalahan");
      }
    };
    const handleCheckout = () => {
      if (selectedIds.value.size === 0) {
        toast.warning("Pilih item untuk checkout");
        return;
      }
      router.visit("/checkout");
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UIcon = _sfc_main$2;
      const _component_UButton = _sfc_main$3;
      const _component_UCheckbox = _sfc_main$4;
      const _component_USeparator = _sfc_main$5;
      _push(`<!--[-->`);
      _push(ssrRenderComponent(unref(Head), { title: "Keranjang Belanja" }, null, _parent));
      _push(`<div class="container mx-auto px-4 py-8"><!-- Breadcrumb --><nav class="mb-6"><ol class="flex items-center gap-2 text-sm"><li>`);
      _push(ssrRenderComponent(unref(Link), {
        href: "/",
        class: "text-gray-500 hover:text-primary-600"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`Beranda`);
          } else {
            return [
              createTextVNode("Beranda")
            ];
          }
        }),
        _: 1
        /* STABLE */
      }, _parent));
      _push(`</li><li class="text-gray-400">/</li><li class="text-gray-900 dark:text-white font-medium">Keranjang</li></ol></nav><h1 class="text-2xl font-bold text-gray-900 dark:text-white mb-6">Keranjang Belanja</h1>`);
      if (items.value.length === 0) {
        _push(`<div class="text-center py-16">`);
        _push(ssrRenderComponent(_component_UIcon, {
          name: "i-heroicons-shopping-cart",
          class: "w-20 h-20 text-gray-300 mx-auto mb-4"
        }, null, _parent));
        _push(`<h2 class="text-xl font-semibold text-gray-900 dark:text-white mb-2">Keranjang Kosong</h2><p class="text-gray-500 mb-6">Belum ada produk di keranjang Anda</p>`);
        _push(ssrRenderComponent(_component_UButton, {
          to: "/",
          color: "primary"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`Mulai Belanja`);
            } else {
              return [
                createTextVNode("Mulai Belanja")
              ];
            }
          }),
          _: 1
          /* STABLE */
        }, _parent));
        _push(`</div>`);
      } else {
        _push(`<div class="grid grid-cols-1 lg:grid-cols-3 gap-8"><!-- Cart Items --><div class="lg:col-span-2 space-y-4"><!-- Select All Header --><div class="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-4"><div class="flex items-center justify-between"><div class="flex items-center gap-3">`);
        _push(ssrRenderComponent(_component_UCheckbox, {
          "model-value": isAllSelected.value,
          "onUpdate:modelValue": toggleSelectAll
        }, null, _parent));
        _push(`<span class="font-medium text-gray-900 dark:text-white"> Pilih Semua (${ssrInterpolate(items.value.length)} produk) </span></div>`);
        if (selectedIds.value.size > 0) {
          _push(ssrRenderComponent(_component_UButton, {
            color: "red",
            variant: "ghost",
            size: "sm",
            onClick: handleBulkDelete
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(` Hapus (${ssrInterpolate(selectedIds.value.size)}) `);
              } else {
                return [
                  createTextVNode(
                    " Hapus (" + toDisplayString(selectedIds.value.size) + ") ",
                    1
                    /* TEXT */
                  )
                ];
              }
            }),
            _: 1
            /* STABLE */
          }, _parent));
        } else {
          _push(`<!---->`);
        }
        _push(`</div></div><!-- Cart Items List --><!--[-->`);
        ssrRenderList(items.value, (item) => {
          _push(`<div class="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-4"><div class="flex gap-4"><!-- Checkbox --><div class="flex items-start pt-2">`);
          _push(ssrRenderComponent(_component_UCheckbox, {
            "model-value": selectedIds.value.has(item.id),
            "onUpdate:modelValue": ($event) => toggleSelectItem(item.id)
          }, null, _parent));
          _push(`</div><!-- Product Image -->`);
          _push(ssrRenderComponent(unref(Link), {
            href: `/products/${item.product.slug}`,
            class: "shrink-0"
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`<img${ssrRenderAttr("src", item.product.image)}${ssrRenderAttr("alt", item.product.name)} class="w-24 h-24 object-cover rounded-lg"${_scopeId}>`);
              } else {
                return [
                  createVNode("img", {
                    src: item.product.image,
                    alt: item.product.name,
                    class: "w-24 h-24 object-cover rounded-lg"
                  }, null, 8, ["src", "alt"])
                ];
              }
            }),
            _: 2
            /* DYNAMIC */
          }, _parent));
          _push(`<!-- Product Info --><div class="flex-1 min-w-0"><!-- Product Name -->`);
          _push(ssrRenderComponent(unref(Link), {
            href: `/products/${item.product.slug}`,
            class: "font-medium text-gray-900 dark:text-white hover:text-primary-600 line-clamp-2"
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`${ssrInterpolate(item.product.name)}`);
              } else {
                return [
                  createTextVNode(
                    toDisplayString(item.product.name),
                    1
                    /* TEXT */
                  )
                ];
              }
            }),
            _: 2
            /* DYNAMIC */
          }, _parent));
          _push(`<!-- Variant -->`);
          if (item.variant) {
            _push(`<p class="text-sm text-gray-500 mt-1">${ssrInterpolate(item.variant.name)}: ${ssrInterpolate(item.variant.value)}</p>`);
          } else {
            _push(`<!---->`);
          }
          _push(`<!-- Price --><div class="mt-2"><span class="font-semibold text-primary-600">${ssrInterpolate(formatPrice(item.itemPrice))}</span>`);
          if (item.product.discountPrice) {
            _push(`<span class="text-sm text-gray-400 line-through ml-2">${ssrInterpolate(formatPrice(item.product.price))}</span>`);
          } else {
            _push(`<!---->`);
          }
          _push(`</div><!-- Quantity & Delete --><div class="flex items-center justify-between mt-4"><div class="flex items-center gap-3"><!-- Quantity Controls --><div class="flex items-center border border-gray-300 dark:border-gray-600 rounded-lg"><button type="button" class="px-3 py-2 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-l-lg disabled:opacity-50"${ssrIncludeBooleanAttr(isUpdating.value === item.id || item.quantity <= 1) ? " disabled" : ""}>`);
          _push(ssrRenderComponent(_component_UIcon, {
            name: "i-heroicons-minus",
            class: "w-4 h-4"
          }, null, _parent));
          _push(`</button><span class="px-4 py-2 min-w-12 text-center font-medium">${ssrInterpolate(item.quantity)}</span><button type="button" class="px-3 py-2 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-r-lg disabled:opacity-50"${ssrIncludeBooleanAttr(isUpdating.value === item.id) ? " disabled" : ""}>`);
          _push(ssrRenderComponent(_component_UIcon, {
            name: "i-heroicons-plus",
            class: "w-4 h-4"
          }, null, _parent));
          _push(`</button></div><!-- Stock info --><span class="text-xs text-gray-500"> Stok: ${ssrInterpolate(item.variant?.stock ?? item.product.stock)}</span></div><!-- Delete Button -->`);
          _push(ssrRenderComponent(_component_UButton, {
            color: "red",
            variant: "ghost",
            size: "sm",
            loading: isDeleting.value === item.id,
            onClick: ($event) => handleRemoveItem(item.id)
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(ssrRenderComponent(_component_UIcon, {
                  name: "i-heroicons-trash",
                  class: "w-4 h-4"
                }, null, _parent2, _scopeId));
              } else {
                return [
                  createVNode(_component_UIcon, {
                    name: "i-heroicons-trash",
                    class: "w-4 h-4"
                  })
                ];
              }
            }),
            _: 2
            /* DYNAMIC */
          }, _parent));
          _push(`</div></div></div></div>`);
        });
        _push(`<!--]--></div><!-- Summary Sidebar --><div class="lg:col-span-1"><div class="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 sticky top-24"><h2 class="font-semibold text-lg text-gray-900 dark:text-white mb-4">Ringkasan Belanja</h2><div class="space-y-3 text-sm"><div class="flex justify-between text-gray-600 dark:text-gray-400"><span>Total Produk</span><span>${ssrInterpolate(localSummary.value.checkedItems)} item</span></div><div class="flex justify-between text-gray-600 dark:text-gray-400"><span>Total Quantity</span><span>${ssrInterpolate(localSummary.value.totalQuantity)}</span></div>`);
        _push(ssrRenderComponent(_component_USeparator, null, null, _parent));
        _push(`<div class="flex justify-between text-lg font-semibold text-gray-900 dark:text-white"><span>Subtotal</span><span class="text-primary-600">${ssrInterpolate(formatPrice(localSummary.value.subtotal))}</span></div></div>`);
        _push(ssrRenderComponent(_component_UButton, {
          color: "primary",
          block: "",
          size: "lg",
          class: "mt-6",
          disabled: selectedIds.value.size === 0,
          onClick: handleCheckout
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(` Checkout (${ssrInterpolate(selectedIds.value.size)}) `);
            } else {
              return [
                createTextVNode(
                  " Checkout (" + toDisplayString(selectedIds.value.size) + ") ",
                  1
                  /* TEXT */
                )
              ];
            }
          }),
          _: 1
          /* STABLE */
        }, _parent));
        _push(`<p class="text-xs text-gray-500 text-center mt-3"> Ongkos kirim dihitung saat checkout </p></div></div></div>`);
      }
      _push(`</div><!--]-->`);
    };
  }
});

const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("inertia/pages/cart/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
