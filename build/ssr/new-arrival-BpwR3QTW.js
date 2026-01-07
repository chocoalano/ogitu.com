import { _ as _sfc_main$8, u as useToast, b as _export_sfc } from './Badge-DaOjA2YD.js';
import { _ as _sfc_main$7 } from './Pagination-C9h35VkF.js';
import { _ as _sfc_main$2, a as _sfc_main$4 } from './Button-BBveOjhJ.js';
import { _ as _sfc_main$3 } from './SelectMenu-CGTADs72.js';
import { defineComponent, ref, computed, unref, withCtx, createVNode, toDisplayString, createTextVNode, useSSRContext } from 'vue';
import { ssrRenderComponent, ssrInterpolate, ssrRenderAttr, ssrRenderList } from 'vue/server-renderer';
import { Head, Link, router } from '@inertiajs/vue3';
import { useHead } from '@unhead/vue';
import { _ as _sfc_main$1 } from './default-ChIG0McX.js';
import { _ as _sfc_main$5 } from './ProductCard-CDOl-6l6.js';
import { _ as _sfc_main$6 } from './ProductCardList-BeZ2IKpt.js';
import 'reka-ui';
import '@vueuse/core';
import './virtual_nuxt-ui-plugins-BqI2j5ZJ.js';
import '@unhead/vue/client';
import 'tailwindcss/colors';
import 'hookable';
import 'defu';
import 'ohash/utils';
import 'reka-ui/namespaced';
import 'tailwind-variants';
import '@iconify/vue';
import 'ufo';
import './Modal-lw8uQ47S.js';
import 'vaul-vue';
import './DropdownMenu-DnaZdPLR.js';
import './Checkbox-9gbT5PLz.js';

const siteUrl = "https://ogitu.com";
const pageTitle = "Produk Terbaru - New Arrival Vape & Rokok Elektrik | Ogitu";
const _sfc_main = /* @__PURE__ */ defineComponent({
  ...{ layout: _sfc_main$1 },
  __name: "new-arrival",
  __ssrInlineRender: true,
  props: {
    products: {},
    meta: {},
    categories: {},
    brands: {},
    filters: {}
  },
  setup(__props) {
    const props = __props;
    const viewMode = ref("grid");
    const currentPage = ref(props.meta.currentPage);
    const localFilters = ref({ ...props.filters });
    const totalPages = computed(() => props.meta.lastPage);
    const applyFilters = () => {
      const params = new URLSearchParams();
      if (localFilters.value.brand && localFilters.value.brand !== "all") params.set("brand", localFilters.value.brand);
      if (localFilters.value.minPrice) params.set("minPrice", localFilters.value.minPrice);
      if (localFilters.value.maxPrice) params.set("maxPrice", localFilters.value.maxPrice);
      if (currentPage.value > 1) params.set("page", String(currentPage.value));
      const queryString = params.toString();
      window.location.href = `/new-arrival${queryString ? `?${queryString}` : ""}`;
    };
    const clearFilters = () => {
      localFilters.value = { brand: "all", minPrice: "", maxPrice: "" };
      window.location.href = "/new-arrival";
    };
    const goToPage = (page) => {
      currentPage.value = page;
      applyFilters();
    };
    const toast = useToast();
    const isAddingToCart = ref(null);
    const isTogglingWishlist = ref(null);
    const getToken = () => {
      const match = document.cookie.match(/XSRF-TOKEN=([^;]+)/);
      return match ? decodeURIComponent(match[1]) : "";
    };
    const handleAddToCart = async (product) => {
      if (isAddingToCart.value) return;
      isAddingToCart.value = product.id;
      try {
        const response = await fetch("/api/cart", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-Requested-With": "XMLHttpRequest",
            "X-XSRF-TOKEN": getToken()
          },
          credentials: "include",
          body: JSON.stringify({
            productId: product.id,
            quantity: 1
          })
        });
        const data = await response.json();
        if (response.status === 401) {
          toast.warning("Login Diperlukan", "Silakan login untuk menambahkan ke keranjang");
          router.visit("/login");
          return;
        }
        if (data.success) {
          toast.success("Berhasil", data.message || "Produk ditambahkan ke keranjang");
        } else {
          toast.error("Gagal", data.message || "Gagal menambahkan ke keranjang");
        }
      } catch (error) {
        console.error("Add to cart error:", error);
        toast.error("Error", "Terjadi kesalahan saat menambahkan ke keranjang");
      } finally {
        isAddingToCart.value = null;
      }
    };
    const handleAddToWishlist = async (product) => {
      if (isTogglingWishlist.value) return;
      isTogglingWishlist.value = product.id;
      try {
        const response = await fetch("/api/wishlist/toggle", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-Requested-With": "XMLHttpRequest",
            "X-XSRF-TOKEN": getToken()
          },
          credentials: "include",
          body: JSON.stringify({
            productId: product.id
          })
        });
        const data = await response.json();
        if (response.status === 401) {
          toast.warning("Login Diperlukan", "Silakan login untuk menambahkan ke wishlist");
          router.visit("/login");
          return;
        }
        if (data.success) {
          if (data.data?.isWishlisted) {
            toast.success("Berhasil", "Produk ditambahkan ke wishlist");
          } else {
            toast.info("Info", "Produk dihapus dari wishlist");
          }
        } else {
          toast.error("Gagal", data.message || "Gagal memproses wishlist");
        }
      } catch (error) {
        console.error("Toggle wishlist error:", error);
        toast.error("Error", "Terjadi kesalahan saat memproses wishlist");
      } finally {
        isTogglingWishlist.value = null;
      }
    };
    const pageDescription = `Jelajahi ${props.meta.total}+ produk vape terbaru yang baru saja datang. Pod system, mod kit, liquid premium terkini dari brand ternama. Jadilah yang pertama memilikinya!`;
    const structuredData = computed(() => ({
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      name: "Produk Terbaru Vape & Rokok Elektrik",
      description: pageDescription,
      url: `${siteUrl}/new-arrival`,
      mainEntity: {
        "@type": "ItemList",
        numberOfItems: props.meta.total,
        itemListElement: props.products.slice(0, 10).map((product, index) => ({
          "@type": "ListItem",
          position: index + 1,
          item: {
            "@type": "Product",
            name: product.name,
            image: product.image,
            url: `${siteUrl}/products/${product.slug}`,
            offers: {
              "@type": "Offer",
              price: product.discountPrice || product.price,
              priceCurrency: "IDR",
              availability: product.stock > 0 ? "https://schema.org/InStock" : "https://schema.org/OutOfStock"
            }
          }
        }))
      }
    }));
    useHead({
      script: [
        {
          type: "application/ld+json",
          innerHTML: computed(() => JSON.stringify(structuredData.value))
        }
      ]
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UIcon = _sfc_main$2;
      const _component_USelectMenu = _sfc_main$3;
      const _component_UButton = _sfc_main$4;
      const _component_UPagination = _sfc_main$7;
      const _component_UInput = _sfc_main$8;
      _push(`<!--[-->`);
      _push(ssrRenderComponent(unref(Head), null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<title data-v-2ee52fc1${_scopeId}>${ssrInterpolate(pageTitle)}</title><meta name="description"${ssrRenderAttr("content", pageDescription)} data-v-2ee52fc1${_scopeId}><meta name="robots" content="index, follow" data-v-2ee52fc1${_scopeId}><link rel="canonical"${ssrRenderAttr("href", `${siteUrl}/new-arrival`)} data-v-2ee52fc1${_scopeId}><meta property="og:title"${ssrRenderAttr("content", pageTitle)} data-v-2ee52fc1${_scopeId}><meta property="og:description"${ssrRenderAttr("content", pageDescription)} data-v-2ee52fc1${_scopeId}><meta property="og:type" content="website" data-v-2ee52fc1${_scopeId}><meta property="og:url"${ssrRenderAttr("content", `${siteUrl}/new-arrival`)} data-v-2ee52fc1${_scopeId}>`);
          } else {
            return [
              createVNode("title", null, toDisplayString(pageTitle)),
              createVNode("meta", {
                name: "description",
                content: pageDescription
              }),
              createVNode("meta", {
                name: "robots",
                content: "index, follow"
              }),
              createVNode("link", {
                rel: "canonical",
                href: `${siteUrl}/new-arrival`
              }, null, 8, ["href"]),
              createVNode("meta", {
                property: "og:title",
                content: pageTitle
              }),
              createVNode("meta", {
                property: "og:description",
                content: pageDescription
              }),
              createVNode("meta", {
                property: "og:type",
                content: "website"
              }),
              createVNode("meta", {
                property: "og:url",
                content: `${siteUrl}/new-arrival`
              }, null, 8, ["content"])
            ];
          }
        }),
        _: 1
        /* STABLE */
      }, _parent));
      _push(`<div class="min-h-screen bg-linear-to-b from-gray-50 via-white to-gray-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-900" data-v-2ee52fc1><!-- Background Effects --><div class="fixed inset-0 -z-10 overflow-hidden pointer-events-none" data-v-2ee52fc1><div class="absolute top-0 left-1/4 w-125 h-125 bg-cyan-500/10 rounded-full blur-3xl" data-v-2ee52fc1></div><div class="absolute top-1/3 right-1/4 w-100 h-100 bg-blue-500/10 rounded-full blur-3xl" data-v-2ee52fc1></div><div class="absolute bottom-1/4 left-1/2 w-150 h-75 bg-purple-500/5 rounded-full blur-3xl" data-v-2ee52fc1></div></div><!-- Hero Section --><div class="relative bg-linear-to-r from-cyan-500 via-blue-500 to-purple-500 overflow-hidden" data-v-2ee52fc1><!-- Animated Particles --><div class="absolute inset-0 overflow-hidden" data-v-2ee52fc1><div class="absolute top-10 left-10 w-4 h-4 bg-white/30 rounded-full animate-float" data-v-2ee52fc1></div><div class="absolute top-20 right-20 w-3 h-3 bg-white/20 rounded-full animate-float-delayed" data-v-2ee52fc1></div><div class="absolute bottom-10 left-1/3 w-5 h-5 bg-white/25 rounded-full animate-float" data-v-2ee52fc1></div><div class="absolute top-1/2 right-1/4 w-2 h-2 bg-white/30 rounded-full animate-float-delayed" data-v-2ee52fc1></div></div><!-- Pattern Overlay --><div class="absolute inset-0 opacity-10" data-v-2ee52fc1><svg class="w-full h-full" xmlns="http://www.w3.org/2000/svg" data-v-2ee52fc1><defs data-v-2ee52fc1><pattern id="star-pattern" x="0" y="0" width="80" height="80" patternUnits="userSpaceOnUse" data-v-2ee52fc1><polygon points="40,5 45,35 75,35 50,55 60,85 40,65 20,85 30,55 5,35 35,35" fill="white" opacity="0.3" transform="scale(0.3) translate(60, 60)" data-v-2ee52fc1></polygon></pattern></defs><rect width="100%" height="100%" fill="url(#star-pattern)" data-v-2ee52fc1></rect></svg></div><div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16" data-v-2ee52fc1><!-- Breadcrumb --><nav class="flex items-center gap-2 text-sm mb-6 text-white/80" data-v-2ee52fc1>`);
      _push(ssrRenderComponent(unref(Link), {
        href: "/",
        class: "hover:text-white transition-colors"
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
        class: "w-4 h-4"
      }, null, _parent));
      _push(`<span class="text-white font-medium" data-v-2ee52fc1>New Arrival</span></nav><div class="flex flex-col md:flex-row md:items-center md:justify-between gap-6" data-v-2ee52fc1><div data-v-2ee52fc1><div class="flex items-center gap-4 mb-4" data-v-2ee52fc1><div class="relative" data-v-2ee52fc1><div class="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center" data-v-2ee52fc1>`);
      _push(ssrRenderComponent(_component_UIcon, {
        name: "i-heroicons-sparkles",
        class: "w-8 h-8 text-white"
      }, null, _parent));
      _push(`</div><!-- NEW Badge --><div class="absolute -top-2 -right-2 px-2 py-0.5 bg-yellow-400 text-yellow-900 text-xs font-bold rounded-full animate-pulse" data-v-2ee52fc1> NEW </div></div><div data-v-2ee52fc1><h1 class="text-3xl sm:text-4xl font-bold text-white" data-v-2ee52fc1>New Arrival</h1><p class="text-white/80 mt-1" data-v-2ee52fc1>Produk Terbaru Untuk Kamu</p></div></div><p class="text-white/70 max-w-xl" data-v-2ee52fc1> Jadilah yang pertama mencoba produk vape terbaru! Update koleksimu dengan inovasi terkini dari brand ternama. </p></div><!-- Stats --><div class="flex gap-6" data-v-2ee52fc1><div class="text-center" data-v-2ee52fc1><p class="text-3xl font-bold text-white" data-v-2ee52fc1>${ssrInterpolate(__props.meta.total)}+</p><p class="text-sm text-white/70" data-v-2ee52fc1>Produk Baru</p></div><div class="text-center" data-v-2ee52fc1><p class="text-3xl font-bold text-white" data-v-2ee52fc1>Weekly</p><p class="text-sm text-white/70" data-v-2ee52fc1>Update</p></div></div></div></div></div><!-- Main Content --><div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8" data-v-2ee52fc1><!-- Toolbar --><div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6" data-v-2ee52fc1><div class="flex items-center gap-4" data-v-2ee52fc1><p class="text-sm text-gray-500 dark:text-gray-400" data-v-2ee52fc1> Menampilkan <span class="font-medium text-gray-900 dark:text-white" data-v-2ee52fc1>${ssrInterpolate(__props.products.length)}</span> dari <span class="font-medium text-gray-900 dark:text-white" data-v-2ee52fc1>${ssrInterpolate(__props.meta.total)}</span> produk </p></div><div class="flex items-center gap-3" data-v-2ee52fc1><!-- Brand Filter -->`);
      _push(ssrRenderComponent(_component_USelectMenu, {
        modelValue: localFilters.value.brand,
        "onUpdate:modelValue": [($event) => localFilters.value.brand = $event, applyFilters],
        items: [{ label: "Semua Brand", value: "all" }, ...__props.brands.map((b) => ({ label: b, value: b }))],
        placeholder: "Filter Brand",
        "value-key": "value",
        class: "w-40"
      }, null, _parent));
      _push(`<!-- View Mode Toggle --><div class="hidden sm:flex items-center gap-1 p-1 bg-gray-100 dark:bg-gray-800 rounded-lg" data-v-2ee52fc1>`);
      _push(ssrRenderComponent(_component_UButton, {
        color: viewMode.value === "grid" ? "primary" : "neutral",
        variant: viewMode.value === "grid" ? "solid" : "ghost",
        size: "sm",
        square: "",
        onClick: ($event) => viewMode.value = "grid"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_UIcon, {
              name: "i-heroicons-squares-2x2",
              class: "w-4 h-4"
            }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_UIcon, {
                name: "i-heroicons-squares-2x2",
                class: "w-4 h-4"
              })
            ];
          }
        }),
        _: 1
        /* STABLE */
      }, _parent));
      _push(ssrRenderComponent(_component_UButton, {
        color: viewMode.value === "list" ? "primary" : "neutral",
        variant: viewMode.value === "list" ? "solid" : "ghost",
        size: "sm",
        square: "",
        onClick: ($event) => viewMode.value = "list"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_UIcon, {
              name: "i-heroicons-list-bullet",
              class: "w-4 h-4"
            }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_UIcon, {
                name: "i-heroicons-list-bullet",
                class: "w-4 h-4"
              })
            ];
          }
        }),
        _: 1
        /* STABLE */
      }, _parent));
      _push(`</div></div></div><!-- Products Grid -->`);
      if (__props.products.length > 0) {
        _push(`<div data-v-2ee52fc1><!-- Grid View -->`);
        if (viewMode.value === "grid") {
          _push(`<div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4" data-v-2ee52fc1><!--[-->`);
          ssrRenderList(__props.products, (product) => {
            _push(`<div class="relative" data-v-2ee52fc1><!-- NEW Badge for recent products --><div class="absolute top-2 left-2 z-10 px-2 py-1 bg-cyan-500 text-white text-xs font-bold rounded-lg shadow-lg" data-v-2ee52fc1><span class="flex items-center gap-1" data-v-2ee52fc1>`);
            _push(ssrRenderComponent(_component_UIcon, {
              name: "i-heroicons-sparkles",
              class: "w-3 h-3"
            }, null, _parent));
            _push(` BARU </span></div>`);
            _push(ssrRenderComponent(_sfc_main$5, {
              product,
              onAddToCart: handleAddToCart,
              onAddToWishlist: handleAddToWishlist
            }, null, _parent));
            _push(`</div>`);
          });
          _push(`<!--]--></div>`);
        } else {
          _push(`<!--[--><!-- List View --><div class="space-y-4" data-v-2ee52fc1><!--[-->`);
          ssrRenderList(__props.products, (product) => {
            _push(`<div class="relative" data-v-2ee52fc1>`);
            _push(ssrRenderComponent(_sfc_main$6, {
              product,
              onAddToCart: handleAddToCart,
              onAddToWishlist: handleAddToWishlist
            }, null, _parent));
            _push(`</div>`);
          });
          _push(`<!--]--></div><!--]-->`);
        }
        _push(`<!-- Pagination -->`);
        if (totalPages.value > 1) {
          _push(`<div class="mt-8 flex justify-center" data-v-2ee52fc1>`);
          _push(ssrRenderComponent(_component_UPagination, {
            page: currentPage.value,
            "onUpdate:page": [($event) => currentPage.value = $event, goToPage],
            total: __props.meta.total,
            "items-per-page": __props.meta.perPage,
            "show-edges": ""
          }, null, _parent));
          _push(`</div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div>`);
      } else {
        _push(`<!--[--><!-- Empty State --><div class="text-center py-16" data-v-2ee52fc1><div class="w-24 h-24 mx-auto mb-6 rounded-3xl bg-cyan-500/10 flex items-center justify-center" data-v-2ee52fc1>`);
        _push(ssrRenderComponent(_component_UIcon, {
          name: "i-heroicons-sparkles",
          class: "w-12 h-12 text-cyan-500"
        }, null, _parent));
        _push(`</div><h2 class="text-xl font-bold text-gray-900 dark:text-white mb-2" data-v-2ee52fc1>Belum Ada Produk Baru</h2><p class="text-gray-500 dark:text-gray-400 mb-6" data-v-2ee52fc1>Coba ubah filter atau cek kembali nanti untuk produk terbaru.</p>`);
        _push(ssrRenderComponent(_component_UButton, {
          color: "primary",
          onClick: clearFilters
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(` Reset Filter `);
            } else {
              return [
                createTextVNode(" Reset Filter ")
              ];
            }
          }),
          _: 1
          /* STABLE */
        }, _parent));
        _push(`</div><!--]-->`);
      }
      _push(`</div><!-- Features Section --><div class="bg-white dark:bg-gray-800/50 border-y border-gray-200 dark:border-gray-700" data-v-2ee52fc1><div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12" data-v-2ee52fc1><h2 class="text-2xl font-bold text-gray-900 dark:text-white text-center mb-8" data-v-2ee52fc1> Keuntungan Belanja Produk Terbaru </h2><div class="grid grid-cols-1 md:grid-cols-3 gap-6" data-v-2ee52fc1><div class="text-center p-6" data-v-2ee52fc1><div class="w-14 h-14 mx-auto mb-4 rounded-2xl bg-cyan-500/10 flex items-center justify-center" data-v-2ee52fc1>`);
      _push(ssrRenderComponent(_component_UIcon, {
        name: "i-heroicons-bolt",
        class: "w-7 h-7 text-cyan-500"
      }, null, _parent));
      _push(`</div><h3 class="font-semibold text-gray-900 dark:text-white mb-2" data-v-2ee52fc1>Teknologi Terkini</h3><p class="text-sm text-gray-500 dark:text-gray-400" data-v-2ee52fc1> Dapatkan fitur dan teknologi vaping terbaru dari inovasi brand ternama </p></div><div class="text-center p-6" data-v-2ee52fc1><div class="w-14 h-14 mx-auto mb-4 rounded-2xl bg-blue-500/10 flex items-center justify-center" data-v-2ee52fc1>`);
      _push(ssrRenderComponent(_component_UIcon, {
        name: "i-heroicons-gift",
        class: "w-7 h-7 text-blue-500"
      }, null, _parent));
      _push(`</div><h3 class="font-semibold text-gray-900 dark:text-white mb-2" data-v-2ee52fc1>Promo Launching</h3><p class="text-sm text-gray-500 dark:text-gray-400" data-v-2ee52fc1> Nikmati harga spesial dan bonus eksklusif untuk produk baru </p></div><div class="text-center p-6" data-v-2ee52fc1><div class="w-14 h-14 mx-auto mb-4 rounded-2xl bg-purple-500/10 flex items-center justify-center" data-v-2ee52fc1>`);
      _push(ssrRenderComponent(_component_UIcon, {
        name: "i-heroicons-clock",
        class: "w-7 h-7 text-purple-500"
      }, null, _parent));
      _push(`</div><h3 class="font-semibold text-gray-900 dark:text-white mb-2" data-v-2ee52fc1>First to Try</h3><p class="text-sm text-gray-500 dark:text-gray-400" data-v-2ee52fc1> Jadilah yang pertama merasakan sensasi vaping dengan produk terbaru </p></div></div></div></div><!-- Newsletter CTA --><div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12" data-v-2ee52fc1><div class="bg-linear-to-r from-cyan-500/10 via-blue-500/10 to-purple-500/10 rounded-3xl p-8 border border-cyan-500/20 text-center" data-v-2ee52fc1><div class="w-16 h-16 mx-auto mb-4 rounded-2xl bg-linear-to-r from-cyan-500 to-blue-500 flex items-center justify-center" data-v-2ee52fc1>`);
      _push(ssrRenderComponent(_component_UIcon, {
        name: "i-heroicons-bell-alert",
        class: "w-8 h-8 text-white"
      }, null, _parent));
      _push(`</div><h3 class="text-xl font-bold text-gray-900 dark:text-white mb-2" data-v-2ee52fc1> Jangan Ketinggalan Produk Terbaru! </h3><p class="text-gray-500 dark:text-gray-400 mb-6 max-w-md mx-auto" data-v-2ee52fc1> Subscribe untuk mendapat notifikasi setiap ada produk baru dan promo eksklusif </p><div class="flex flex-col sm:flex-row items-center justify-center gap-3 max-w-md mx-auto" data-v-2ee52fc1>`);
      _push(ssrRenderComponent(_component_UInput, {
        placeholder: "Email kamu...",
        size: "lg",
        class: "w-full sm:flex-1"
      }, null, _parent));
      _push(ssrRenderComponent(_component_UButton, {
        color: "primary",
        size: "lg"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` Subscribe `);
          } else {
            return [
              createTextVNode(" Subscribe ")
            ];
          }
        }),
        _: 1
        /* STABLE */
      }, _parent));
      _push(`</div></div></div></div><!--]-->`);
    };
  }
});

/* unplugin-vue-components disabled */

const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("inertia/pages/collections/new-arrival.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const newArrival = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-2ee52fc1"]]);

export { newArrival as default };
