import { _ as _sfc_main$4 } from './Checkbox-9gbT5PLz.js';
import { _ as _sfc_main$2, a as _sfc_main$3 } from './Button-BBveOjhJ.js';
import { defineComponent, ref, computed, unref, withCtx, createVNode, createTextVNode, toDisplayString, useSSRContext } from 'vue';
import { ssrRenderComponent, ssrInterpolate, ssrRenderList, ssrRenderClass, ssrRenderAttr } from 'vue/server-renderer';
import { Head, Link } from '@inertiajs/vue3';
import { _ as _sfc_main$1 } from './default-ChIG0McX.js';
import { b as _export_sfc } from './Badge-DaOjA2YD.js';
import 'reka-ui';
import '@vueuse/core';
import './virtual_nuxt-ui-plugins-BqI2j5ZJ.js';
import '@unhead/vue/client';
import 'tailwindcss/colors';
import 'hookable';
import 'defu';
import 'ohash/utils';
import '@unhead/vue';
import 'tailwind-variants';
import '@iconify/vue';
import 'ufo';
import './Modal-lw8uQ47S.js';
import 'vaul-vue';
import './DropdownMenu-DnaZdPLR.js';
import 'reka-ui/namespaced';

const _sfc_main = /* @__PURE__ */ defineComponent({
  ...{ layout: _sfc_main$1 },
  __name: "index",
  __ssrInlineRender: true,
  props: {
    items: {},
    totalItems: {}
  },
  setup(__props) {
    const props = __props;
    const wishlistItems = ref([...props.items]);
    const selectedItems = ref([]);
    const isDeleting = ref(null);
    const isMovingToCart = ref(null);
    const isBulkMoving = ref(false);
    const formatPrice = (price) => {
      return new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
      }).format(price);
    };
    const getDiscountPercentage = (price, discountPrice) => {
      return Math.round((price - discountPrice) / price * 100);
    };
    const getXsrfToken = () => {
      if (typeof document === "undefined") return null;
      const match = document.cookie.match(/XSRF-TOKEN=([^;]+)/);
      return match ? decodeURIComponent(match[1]) : null;
    };
    const isAllSelected = computed(() => {
      return wishlistItems.value.length > 0 && selectedItems.value.length === wishlistItems.value.length;
    });
    const toggleSelectAll = () => {
      if (isAllSelected.value) {
        selectedItems.value = [];
      } else {
        selectedItems.value = wishlistItems.value.map((item) => item.productId);
      }
    };
    const deleteItem = async (productId) => {
      if (isDeleting.value) return;
      isDeleting.value = productId;
      try {
        const xsrfToken = getXsrfToken();
        const response = await fetch(`/api/wishlist/${productId}`, {
          method: "DELETE",
          headers: {
            "Accept": "application/json",
            "X-Requested-With": "XMLHttpRequest",
            ...xsrfToken && { "X-XSRF-TOKEN": xsrfToken }
          }
        });
        const data = await response.json();
        if (data.success) {
          wishlistItems.value = wishlistItems.value.filter((item) => item.productId !== productId);
          selectedItems.value = selectedItems.value.filter((id) => id !== productId);
        } else {
          alert(data.message || "Gagal menghapus dari wishlist");
        }
      } catch (error) {
        console.error("Failed to delete from wishlist:", error);
        alert("Terjadi kesalahan saat menghapus dari wishlist");
      } finally {
        isDeleting.value = null;
      }
    };
    const moveToCart = async (productId) => {
      if (isMovingToCart.value) return;
      isMovingToCart.value = productId;
      try {
        const xsrfToken = getXsrfToken();
        const response = await fetch(`/api/wishlist/${productId}/move-to-cart`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "X-Requested-With": "XMLHttpRequest",
            ...xsrfToken && { "X-XSRF-TOKEN": xsrfToken }
          },
          body: JSON.stringify({ quantity: 1 })
        });
        const data = await response.json();
        if (data.success) {
          wishlistItems.value = wishlistItems.value.filter((item) => item.productId !== productId);
          selectedItems.value = selectedItems.value.filter((id) => id !== productId);
          alert("Produk berhasil dipindahkan ke keranjang");
        } else {
          alert(data.message || "Gagal memindahkan ke keranjang");
        }
      } catch (error) {
        console.error("Failed to move to cart:", error);
        alert("Terjadi kesalahan saat memindahkan ke keranjang");
      } finally {
        isMovingToCart.value = null;
      }
    };
    const moveSelectedToCart = async () => {
      if (isBulkMoving.value || selectedItems.value.length === 0) return;
      isBulkMoving.value = true;
      const xsrfToken = getXsrfToken();
      const errors = [];
      for (const productId of selectedItems.value) {
        try {
          const response = await fetch(`/api/wishlist/${productId}/move-to-cart`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "Accept": "application/json",
              "X-Requested-With": "XMLHttpRequest",
              ...xsrfToken && { "X-XSRF-TOKEN": xsrfToken }
            },
            body: JSON.stringify({ quantity: 1 })
          });
          const data = await response.json();
          if (data.success) {
            wishlistItems.value = wishlistItems.value.filter((item) => item.productId !== productId);
          } else {
            const item = wishlistItems.value.find((i) => i.productId === productId);
            errors.push(`${item?.product.name}: ${data.message}`);
          }
        } catch (error) {
          console.error("Failed to move to cart:", error);
        }
      }
      selectedItems.value = [];
      isBulkMoving.value = false;
      if (errors.length > 0) {
        alert(`Beberapa produk gagal dipindahkan:
${errors.join("\n")}`);
      } else {
        alert("Semua produk terpilih berhasil dipindahkan ke keranjang");
      }
    };
    const deleteSelected = async () => {
      if (selectedItems.value.length === 0) return;
      if (!confirm(`Hapus ${selectedItems.value.length} item dari wishlist?`)) return;
      const xsrfToken = getXsrfToken();
      for (const productId of selectedItems.value) {
        try {
          await fetch(`/api/wishlist/${productId}`, {
            method: "DELETE",
            headers: {
              "Accept": "application/json",
              "X-Requested-With": "XMLHttpRequest",
              ...xsrfToken && { "X-XSRF-TOKEN": xsrfToken }
            }
          });
          wishlistItems.value = wishlistItems.value.filter((item) => item.productId !== productId);
        } catch (error) {
          console.error("Failed to delete from wishlist:", error);
        }
      }
      selectedItems.value = [];
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UIcon = _sfc_main$2;
      const _component_UButton = _sfc_main$3;
      const _component_UCheckbox = _sfc_main$4;
      _push(`<!--[-->`);
      _push(ssrRenderComponent(unref(Head), { title: "Wishlist - Ogitu" }, null, _parent));
      _push(`<div class="min-h-screen bg-linear-to-b from-gray-50 via-white to-gray-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-900" data-v-a67d89de><!-- Background Effects --><div class="fixed inset-0 -z-10 overflow-hidden pointer-events-none" data-v-a67d89de><div class="absolute top-0 left-1/4 w-125 h-125 bg-pink-500/10 rounded-full blur-3xl" data-v-a67d89de></div><div class="absolute top-1/3 right-1/4 w-100 h-100 bg-purple-500/10 rounded-full blur-3xl" data-v-a67d89de></div><div class="absolute bottom-1/4 left-1/2 w-150 h-75 bg-primary-500/5 rounded-full blur-3xl" data-v-a67d89de></div></div><div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12" data-v-a67d89de><!-- Breadcrumb --><nav class="flex items-center gap-2 text-sm mb-6" data-v-a67d89de>`);
      _push(ssrRenderComponent(unref(Link), {
        href: "/",
        class: "text-gray-500 hover:text-primary-500 transition-colors"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_UIcon, {
              name: "i-heroicons-home",
              class: "w-4 h-4"
            }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_UIcon, {
                name: "i-heroicons-home",
                class: "w-4 h-4"
              })
            ];
          }
        }),
        _: 1
        /* STABLE */
      }, _parent));
      _push(ssrRenderComponent(_component_UIcon, {
        name: "i-heroicons-chevron-right",
        class: "w-4 h-4 text-gray-400"
      }, null, _parent));
      _push(`<span class="text-gray-900 dark:text-white font-medium" data-v-a67d89de>Wishlist</span></nav><!-- Header --><div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8" data-v-a67d89de><div data-v-a67d89de><h1 class="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white flex items-center gap-3" data-v-a67d89de><div class="w-12 h-12 rounded-2xl bg-linear-to-br from-pink-500 to-rose-500 flex items-center justify-center" data-v-a67d89de>`);
      _push(ssrRenderComponent(_component_UIcon, {
        name: "i-heroicons-heart-solid",
        class: "w-6 h-6 text-white"
      }, null, _parent));
      _push(`</div> Wishlist Saya </h1><p class="text-gray-500 dark:text-gray-400 mt-2" data-v-a67d89de>${ssrInterpolate(wishlistItems.value.length)} produk favorit tersimpan </p></div><!-- Bulk Actions -->`);
      if (wishlistItems.value.length > 0) {
        _push(`<div class="flex items-center gap-3" data-v-a67d89de>`);
        if (selectedItems.value.length > 0) {
          _push(ssrRenderComponent(_component_UButton, {
            color: "primary",
            variant: "soft",
            loading: isBulkMoving.value,
            onClick: moveSelectedToCart
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(ssrRenderComponent(_component_UIcon, {
                  name: "i-heroicons-shopping-cart",
                  class: "w-4 h-4 mr-2"
                }, null, _parent2, _scopeId));
                _push2(` Pindahkan ke Keranjang (${ssrInterpolate(selectedItems.value.length)}) `);
              } else {
                return [
                  createVNode(_component_UIcon, {
                    name: "i-heroicons-shopping-cart",
                    class: "w-4 h-4 mr-2"
                  }),
                  createTextVNode(
                    " Pindahkan ke Keranjang (" + toDisplayString(selectedItems.value.length) + ") ",
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
        if (selectedItems.value.length > 0) {
          _push(ssrRenderComponent(_component_UButton, {
            color: "red",
            variant: "soft",
            onClick: deleteSelected
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(ssrRenderComponent(_component_UIcon, {
                  name: "i-heroicons-trash",
                  class: "w-4 h-4 mr-2"
                }, null, _parent2, _scopeId));
                _push2(` Hapus (${ssrInterpolate(selectedItems.value.length)}) `);
              } else {
                return [
                  createVNode(_component_UIcon, {
                    name: "i-heroicons-trash",
                    class: "w-4 h-4 mr-2"
                  }),
                  createTextVNode(
                    " Hapus (" + toDisplayString(selectedItems.value.length) + ") ",
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
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><!-- Wishlist Content -->`);
      if (wishlistItems.value.length > 0) {
        _push(`<div data-v-a67d89de><!-- Select All --><div class="bg-white dark:bg-gray-800/80 rounded-2xl border border-gray-200/80 dark:border-gray-700/50 p-4 mb-4" data-v-a67d89de><label class="flex items-center gap-3 cursor-pointer" data-v-a67d89de>`);
        _push(ssrRenderComponent(_component_UCheckbox, {
          "model-value": isAllSelected.value,
          "onUpdate:modelValue": toggleSelectAll
        }, null, _parent));
        _push(`<span class="font-medium text-gray-700 dark:text-gray-300" data-v-a67d89de> Pilih Semua (${ssrInterpolate(wishlistItems.value.length)} produk) </span></label></div><!-- Wishlist Grid --><div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4" data-v-a67d89de><!--[-->`);
        ssrRenderList(wishlistItems.value, (item) => {
          _push(`<div class="${ssrRenderClass([{ "ring-2 ring-primary-500": selectedItems.value.includes(item.productId) }, "group bg-white dark:bg-gray-800/80 rounded-2xl border border-gray-200/80 dark:border-gray-700/50 overflow-hidden hover:shadow-xl transition-all duration-300"])}" data-v-a67d89de><!-- Product Image --><div class="relative aspect-square bg-gray-100 dark:bg-gray-700 overflow-hidden" data-v-a67d89de>`);
          _push(ssrRenderComponent(unref(Link), {
            href: `/products/${item.product.slug}`
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`<img${ssrRenderAttr("src", item.product.image)}${ssrRenderAttr("alt", item.product.name)} class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" data-v-a67d89de${_scopeId}>`);
              } else {
                return [
                  createVNode("img", {
                    src: item.product.image,
                    alt: item.product.name,
                    class: "w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  }, null, 8, ["src", "alt"])
                ];
              }
            }),
            _: 2
            /* DYNAMIC */
          }, _parent));
          _push(`<!-- Select Checkbox --><div class="absolute top-3 left-3" data-v-a67d89de><div class="w-8 h-8 rounded-lg bg-white/90 dark:bg-gray-800/90 flex items-center justify-center cursor-pointer backdrop-blur-sm" data-v-a67d89de>`);
          _push(ssrRenderComponent(_component_UCheckbox, {
            "model-value": selectedItems.value.includes(item.productId)
          }, null, _parent));
          _push(`</div></div><!-- Discount Badge -->`);
          if (item.product.discountPrice) {
            _push(`<div class="absolute top-3 right-3 px-2 py-1 bg-red-500 text-white text-xs font-bold rounded-lg" data-v-a67d89de> -${ssrInterpolate(getDiscountPercentage(item.product.price, item.product.discountPrice))}% </div>`);
          } else {
            _push(`<!---->`);
          }
          _push(`<!-- Out of Stock Overlay -->`);
          if (item.product.stock <= 0 || item.product.status !== "active") {
            _push(`<div class="absolute inset-0 bg-black/50 flex items-center justify-center" data-v-a67d89de><span class="px-4 py-2 bg-gray-900/80 text-white text-sm font-medium rounded-lg" data-v-a67d89de> Stok Habis </span></div>`);
          } else {
            _push(`<!---->`);
          }
          _push(`<!-- Quick Actions --><div class="absolute bottom-3 left-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity" data-v-a67d89de>`);
          _push(ssrRenderComponent(_component_UButton, {
            color: "primary",
            size: "sm",
            class: "flex-1",
            loading: isMovingToCart.value === item.productId,
            disabled: item.product.stock <= 0 || item.product.status !== "active",
            onClick: ($event) => moveToCart(item.productId)
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(ssrRenderComponent(_component_UIcon, {
                  name: "i-heroicons-shopping-cart",
                  class: "w-4 h-4 mr-1"
                }, null, _parent2, _scopeId));
                _push2(` Keranjang `);
              } else {
                return [
                  createVNode(_component_UIcon, {
                    name: "i-heroicons-shopping-cart",
                    class: "w-4 h-4 mr-1"
                  }),
                  createTextVNode(" Keranjang ")
                ];
              }
            }),
            _: 2
            /* DYNAMIC */
          }, _parent));
          _push(ssrRenderComponent(_component_UButton, {
            color: "red",
            variant: "soft",
            size: "sm",
            square: "",
            loading: isDeleting.value === item.productId,
            onClick: ($event) => deleteItem(item.productId)
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
          _push(`</div></div><!-- Product Info --><div class="p-4" data-v-a67d89de><!-- Product Name -->`);
          _push(ssrRenderComponent(unref(Link), {
            href: `/products/${item.product.slug}`
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`<h3 class="font-medium text-gray-900 dark:text-white line-clamp-2 hover:text-primary-500 transition-colors mb-2" data-v-a67d89de${_scopeId}>${ssrInterpolate(item.product.name)}</h3>`);
              } else {
                return [
                  createVNode(
                    "h3",
                    { class: "font-medium text-gray-900 dark:text-white line-clamp-2 hover:text-primary-500 transition-colors mb-2" },
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
          _push(`<!-- Price --><div class="flex items-center gap-2" data-v-a67d89de><span class="text-lg font-bold text-primary-600 dark:text-primary-400" data-v-a67d89de>${ssrInterpolate(formatPrice(item.product.discountPrice || item.product.price))}</span>`);
          if (item.product.discountPrice) {
            _push(`<span class="text-sm text-gray-400 line-through" data-v-a67d89de>${ssrInterpolate(formatPrice(item.product.price))}</span>`);
          } else {
            _push(`<!---->`);
          }
          _push(`</div><!-- Stock Info --><p class="${ssrRenderClass([item.product.stock > 0 ? "text-emerald-500" : "text-red-500", "text-xs mt-2"])}" data-v-a67d89de>${ssrInterpolate(item.product.stock > 0 ? `Stok: ${item.product.stock}` : "Stok Habis")}</p><!-- Mobile Actions --><div class="flex gap-2 mt-4 sm:hidden" data-v-a67d89de>`);
          _push(ssrRenderComponent(_component_UButton, {
            color: "primary",
            size: "sm",
            class: "flex-1",
            loading: isMovingToCart.value === item.productId,
            disabled: item.product.stock <= 0 || item.product.status !== "active",
            onClick: ($event) => moveToCart(item.productId)
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(ssrRenderComponent(_component_UIcon, {
                  name: "i-heroicons-shopping-cart",
                  class: "w-4 h-4 mr-1"
                }, null, _parent2, _scopeId));
                _push2(` Keranjang `);
              } else {
                return [
                  createVNode(_component_UIcon, {
                    name: "i-heroicons-shopping-cart",
                    class: "w-4 h-4 mr-1"
                  }),
                  createTextVNode(" Keranjang ")
                ];
              }
            }),
            _: 2
            /* DYNAMIC */
          }, _parent));
          _push(ssrRenderComponent(_component_UButton, {
            color: "red",
            variant: "soft",
            size: "sm",
            square: "",
            loading: isDeleting.value === item.productId,
            onClick: ($event) => deleteItem(item.productId)
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
          _push(`</div></div></div>`);
        });
        _push(`<!--]--></div></div>`);
      } else {
        _push(`<!--[--><!-- Empty State --><div class="text-center py-16" data-v-a67d89de><div class="relative inline-block mb-6" data-v-a67d89de><div class="w-32 h-32 rounded-3xl bg-linear-to-br from-pink-500/20 to-rose-500/20 flex items-center justify-center" data-v-a67d89de>`);
        _push(ssrRenderComponent(_component_UIcon, {
          name: "i-heroicons-heart",
          class: "w-16 h-16 text-pink-500"
        }, null, _parent));
        _push(`</div><!-- Floating hearts animation --><div class="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-pink-500/20 flex items-center justify-center animate-bounce" data-v-a67d89de>`);
        _push(ssrRenderComponent(_component_UIcon, {
          name: "i-heroicons-heart-solid",
          class: "w-4 h-4 text-pink-500"
        }, null, _parent));
        _push(`</div><div class="absolute -bottom-1 -left-3 w-6 h-6 rounded-full bg-rose-500/20 flex items-center justify-center animate-bounce delay-150" data-v-a67d89de>`);
        _push(ssrRenderComponent(_component_UIcon, {
          name: "i-heroicons-heart-solid",
          class: "w-3 h-3 text-rose-500"
        }, null, _parent));
        _push(`</div></div><h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-3" data-v-a67d89de> Wishlist Masih Kosong </h2><p class="text-gray-500 dark:text-gray-400 max-w-md mx-auto mb-8" data-v-a67d89de> Simpan produk vape favoritmu di sini untuk memudahkan kamu menemukan dan membeli nanti. </p><div class="flex flex-col sm:flex-row items-center justify-center gap-4" data-v-a67d89de>`);
        _push(ssrRenderComponent(unref(Link), { href: "/collections" }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(_component_UButton, {
                color: "primary",
                size: "lg"
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(_component_UIcon, {
                      name: "i-heroicons-shopping-bag",
                      class: "w-5 h-5 mr-2"
                    }, null, _parent3, _scopeId2));
                    _push3(` Mulai Belanja `);
                  } else {
                    return [
                      createVNode(_component_UIcon, {
                        name: "i-heroicons-shopping-bag",
                        class: "w-5 h-5 mr-2"
                      }),
                      createTextVNode(" Mulai Belanja ")
                    ];
                  }
                }),
                _: 1
                /* STABLE */
              }, _parent2, _scopeId));
            } else {
              return [
                createVNode(_component_UButton, {
                  color: "primary",
                  size: "lg"
                }, {
                  default: withCtx(() => [
                    createVNode(_component_UIcon, {
                      name: "i-heroicons-shopping-bag",
                      class: "w-5 h-5 mr-2"
                    }),
                    createTextVNode(" Mulai Belanja ")
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
        _push(ssrRenderComponent(unref(Link), { href: "/dashboard" }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(_component_UButton, {
                variant: "ghost",
                color: "neutral",
                size: "lg"
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(_component_UIcon, {
                      name: "i-heroicons-arrow-left",
                      class: "w-5 h-5 mr-2"
                    }, null, _parent3, _scopeId2));
                    _push3(` Kembali ke Dashboard `);
                  } else {
                    return [
                      createVNode(_component_UIcon, {
                        name: "i-heroicons-arrow-left",
                        class: "w-5 h-5 mr-2"
                      }),
                      createTextVNode(" Kembali ke Dashboard ")
                    ];
                  }
                }),
                _: 1
                /* STABLE */
              }, _parent2, _scopeId));
            } else {
              return [
                createVNode(_component_UButton, {
                  variant: "ghost",
                  color: "neutral",
                  size: "lg"
                }, {
                  default: withCtx(() => [
                    createVNode(_component_UIcon, {
                      name: "i-heroicons-arrow-left",
                      class: "w-5 h-5 mr-2"
                    }),
                    createTextVNode(" Kembali ke Dashboard ")
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
        _push(`</div><!-- Vape Tips --><div class="mt-16 max-w-2xl mx-auto" data-v-a67d89de><div class="bg-linear-to-r from-pink-500/10 via-purple-500/10 to-primary-500/10 rounded-2xl p-6 border border-pink-500/20" data-v-a67d89de><div class="flex items-start gap-4" data-v-a67d89de><div class="w-12 h-12 rounded-xl bg-linear-to-br from-pink-500 to-purple-500 flex items-center justify-center shrink-0" data-v-a67d89de>`);
        _push(ssrRenderComponent(_component_UIcon, {
          name: "i-heroicons-light-bulb",
          class: "w-6 h-6 text-white"
        }, null, _parent));
        _push(`</div><div class="text-left" data-v-a67d89de><h3 class="font-semibold text-gray-900 dark:text-white mb-1" data-v-a67d89de>Tips Belanja Vape</h3><p class="text-sm text-gray-600 dark:text-gray-400" data-v-a67d89de> Gunakan wishlist untuk membandingkan produk sebelum membeli. Kamu juga bisa mendapat notifikasi ketika ada diskon pada produk di wishlist-mu! </p></div></div></div></div></div><!--]-->`);
      }
      _push(`</div></div><!--]-->`);
    };
  }
});

/* unplugin-vue-components disabled */

const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("inertia/pages/wishlist/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-a67d89de"]]);

export { index as default };
