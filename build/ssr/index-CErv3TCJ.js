import { _ as _sfc_main$7, a as _sfc_main$b, b as _sfc_main$c } from './Button-BBveOjhJ.js';
import { a as _sfc_main$8, _ as _sfc_main$9 } from './Badge-DaOjA2YD.js';
import { defineComponent, computed, mergeProps, withCtx, createTextVNode, toDisplayString, useSSRContext, ref, watch, createVNode, onMounted, onUnmounted, unref } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderList, ssrRenderStyle, ssrRenderAttr } from 'vue/server-renderer';
import { router } from '@inertiajs/vue3';
import { A as AdminLayout } from './admin-CGUULoJY.js';
import { _ as _sfc_main$a } from './SelectMenu-CGTADs72.js';
import { _ as _sfc_main$f } from './Textarea-DTaAAeeU.js';
import { _ as _sfc_main$e } from './FormField-BIqlRgyi.js';
import { _ as _sfc_main$d } from './Modal-lw8uQ47S.js';
import { _ as _sfc_main$h } from './Pagination-C9h35VkF.js';
import { _ as _sfc_main$g } from './Select-1_-G9zx4.js';
import { a as useAdminReviews } from './use_transmit-Bm-A_dwm.js';
import 'defu';
import 'reka-ui';
import './virtual_nuxt-ui-plugins-BqI2j5ZJ.js';
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
import './Tooltip-N44Fzd4m.js';
import '@adonisjs/transmit-client';

const _sfc_main$6 = /* @__PURE__ */ defineComponent({
  __name: "ReviewStatsCards",
  __ssrInlineRender: true,
  props: {
    stats: {}
  },
  setup(__props) {
    const props = __props;
    const approvalRate = computed(() => {
      if (props.stats.total === 0) return 0;
      return (props.stats.approved / props.stats.total * 100).toFixed(1);
    });
    const pendingPercentage = computed(() => {
      if (props.stats.total === 0) return 0;
      return (props.stats.pending / props.stats.total * 100).toFixed(0);
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UIcon = _sfc_main$7;
      const _component_UBadge = _sfc_main$8;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 h-full" }, _attrs))}><!-- Total Reviews with gradient --><div class="group relative bg-linear-to-br from-blue-500 to-blue-600 dark:from-blue-600 dark:to-blue-700 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden"><!-- Background decoration --><div class="absolute -right-8 -bottom-8 w-32 h-32 bg-white/10 rounded-full group-hover:scale-110 transition-transform duration-300"></div><div class="absolute -right-4 -top-4 w-24 h-24 bg-white/5 rounded-full group-hover:scale-110 transition-transform duration-300"></div><div class="relative z-10"><div class="flex items-start justify-between mb-3"><div class="p-3 rounded-lg bg-white/20 backdrop-blur-sm">`);
      _push(ssrRenderComponent(_component_UIcon, {
        name: "i-heroicons-chat-bubble-left-right",
        class: "w-6 h-6 text-white"
      }, null, _parent));
      _push(`</div>`);
      _push(ssrRenderComponent(_component_UBadge, {
        color: "white",
        variant: "solid",
        size: "xs",
        class: "text-blue-600"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` Total `);
          } else {
            return [
              createTextVNode(" Total ")
            ];
          }
        }),
        _: 1
        /* STABLE */
      }, _parent));
      _push(`</div><div><p class="text-3xl font-bold text-white mb-1">${ssrInterpolate(__props.stats.total.toLocaleString())}</p><p class="text-sm text-blue-100">Total Review</p></div></div></div><!-- Average Rating with stars --><div class="group relative bg-linear-to-br from-yellow-400 to-orange-500 dark:from-yellow-500 dark:to-orange-600 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden"><!-- Background decoration --><div class="absolute -right-8 -bottom-8 w-32 h-32 bg-white/10 rounded-full group-hover:scale-110 transition-transform duration-300"></div><div class="absolute -right-4 -top-4 w-24 h-24 bg-white/5 rounded-full group-hover:scale-110 transition-transform duration-300"></div><div class="relative z-10"><div class="flex items-start justify-between mb-3"><div class="p-3 rounded-lg bg-white/20 backdrop-blur-sm">`);
      _push(ssrRenderComponent(_component_UIcon, {
        name: "i-heroicons-star-solid",
        class: "w-6 h-6 text-white"
      }, null, _parent));
      _push(`</div><div class="flex gap-0.5"><!--[-->`);
      ssrRenderList(5, (i) => {
        _push(ssrRenderComponent(_component_UIcon, {
          key: i,
          name: "i-heroicons-star-solid",
          class: ["w-3 h-3", i <= Math.round(__props.stats.averageRating) ? "text-white" : "text-white/30"]
        }, null, _parent));
      });
      _push(`<!--]--></div></div><div><p class="text-3xl font-bold text-white mb-1">${ssrInterpolate(__props.stats.averageRating.toFixed(1))}</p><p class="text-sm text-orange-100">Rating Rata-rata</p></div></div></div><!-- Pending Reviews with progress --><div class="group relative bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-300 border border-gray-200 dark:border-gray-700"><div class="relative z-10"><div class="flex items-start justify-between mb-3"><div class="p-3 rounded-lg bg-orange-100 dark:bg-orange-900/30 group-hover:scale-110 transition-transform duration-300">`);
      _push(ssrRenderComponent(_component_UIcon, {
        name: "i-heroicons-clock",
        class: "w-6 h-6 text-orange-600 dark:text-orange-400"
      }, null, _parent));
      _push(`</div>`);
      _push(ssrRenderComponent(_component_UBadge, {
        color: "orange",
        variant: "soft",
        size: "xs"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`${ssrInterpolate(pendingPercentage.value)}% `);
          } else {
            return [
              createTextVNode(
                toDisplayString(pendingPercentage.value) + "% ",
                1
                /* TEXT */
              )
            ];
          }
        }),
        _: 1
        /* STABLE */
      }, _parent));
      _push(`</div><div><p class="text-3xl font-bold text-gray-900 dark:text-white mb-1">${ssrInterpolate(__props.stats.pending)}</p><p class="text-sm text-gray-500 dark:text-gray-400 mb-3">Menunggu Persetujuan</p><!-- Progress bar --><div class="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5 overflow-hidden"><div class="h-full bg-linear-to-r from-orange-400 to-orange-600 rounded-full transition-all duration-500" style="${ssrRenderStyle({ width: `${pendingPercentage.value}%` })}"></div></div></div></div></div><!-- Approved Reviews with success indicator --><div class="group relative bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-300 border border-gray-200 dark:border-gray-700"><div class="relative z-10"><div class="flex items-start justify-between mb-3"><div class="p-3 rounded-lg bg-green-100 dark:bg-green-900/30 group-hover:scale-110 transition-transform duration-300">`);
      _push(ssrRenderComponent(_component_UIcon, {
        name: "i-heroicons-check-circle",
        class: "w-6 h-6 text-green-600 dark:text-green-400"
      }, null, _parent));
      _push(`</div>`);
      _push(ssrRenderComponent(_component_UBadge, {
        color: "green",
        variant: "soft",
        size: "xs"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`${ssrInterpolate(approvalRate.value)}% `);
          } else {
            return [
              createTextVNode(
                toDisplayString(approvalRate.value) + "% ",
                1
                /* TEXT */
              )
            ];
          }
        }),
        _: 1
        /* STABLE */
      }, _parent));
      _push(`</div><div><p class="text-3xl font-bold text-gray-900 dark:text-white mb-1">${ssrInterpolate(__props.stats.approved)}</p><p class="text-sm text-gray-500 dark:text-gray-400 mb-3">Telah Disetujui</p><!-- Progress bar --><div class="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5 overflow-hidden"><div class="h-full bg-linear-to-r from-green-400 to-green-600 rounded-full transition-all duration-500" style="${ssrRenderStyle({ width: `${approvalRate.value}%` })}"></div></div></div></div></div></div>`);
    };
  }
});

const _sfc_setup$6 = _sfc_main$6.setup;
_sfc_main$6.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("inertia/components/admin/reviews/ReviewStatsCards.vue");
  return _sfc_setup$6 ? _sfc_setup$6(props, ctx) : void 0;
};

const _sfc_main$5 = /* @__PURE__ */ defineComponent({
  __name: "ReviewRatingDistribution",
  __ssrInlineRender: true,
  props: {
    stats: {}
  },
  setup(__props) {
    const getRatingPercentage = (count, total) => {
      if (total === 0) return 0;
      return Math.round(count / total * 100);
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UIcon = _sfc_main$7;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "bg-white dark:bg-gray-800 rounded-xl p-5 border border-gray-200 dark:border-gray-700 h-full flex flex-col" }, _attrs))}><h3 class="font-semibold text-gray-900 dark:text-white mb-3 text-sm">Distribusi Rating</h3><div class="space-y-1.5 flex-1 flex flex-col justify-center"><!-- 5 Stars --><div class="flex items-center gap-2"><span class="text-xs text-gray-600 dark:text-gray-400 w-4">5</span>`);
      _push(ssrRenderComponent(_component_UIcon, {
        name: "i-heroicons-star-solid",
        class: "w-3.5 h-3.5 text-yellow-500"
      }, null, _parent));
      _push(`<div class="flex-1 h-1.5 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden"><div class="h-full bg-yellow-500 rounded-full transition-all duration-300" style="${ssrRenderStyle({ width: `${getRatingPercentage(__props.stats.fiveStars, __props.stats.total)}%` })}"></div></div><span class="text-xs text-gray-600 dark:text-gray-400 w-6 text-right">${ssrInterpolate(__props.stats.fiveStars)}</span></div><!-- 4 Stars --><div class="flex items-center gap-2"><span class="text-xs text-gray-600 dark:text-gray-400 w-4">4</span>`);
      _push(ssrRenderComponent(_component_UIcon, {
        name: "i-heroicons-star-solid",
        class: "w-3.5 h-3.5 text-yellow-500"
      }, null, _parent));
      _push(`<div class="flex-1 h-1.5 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden"><div class="h-full bg-yellow-500 rounded-full transition-all duration-300" style="${ssrRenderStyle({ width: `${getRatingPercentage(__props.stats.fourStars, __props.stats.total)}%` })}"></div></div><span class="text-xs text-gray-600 dark:text-gray-400 w-6 text-right">${ssrInterpolate(__props.stats.fourStars)}</span></div><!-- 3 Stars --><div class="flex items-center gap-2"><span class="text-xs text-gray-600 dark:text-gray-400 w-4">3</span>`);
      _push(ssrRenderComponent(_component_UIcon, {
        name: "i-heroicons-star-solid",
        class: "w-3.5 h-3.5 text-yellow-500"
      }, null, _parent));
      _push(`<div class="flex-1 h-1.5 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden"><div class="h-full bg-yellow-500 rounded-full transition-all duration-300" style="${ssrRenderStyle({ width: `${getRatingPercentage(__props.stats.threeStars, __props.stats.total)}%` })}"></div></div><span class="text-xs text-gray-600 dark:text-gray-400 w-6 text-right">${ssrInterpolate(__props.stats.threeStars)}</span></div><!-- 2 Stars --><div class="flex items-center gap-2"><span class="text-xs text-gray-600 dark:text-gray-400 w-4">2</span>`);
      _push(ssrRenderComponent(_component_UIcon, {
        name: "i-heroicons-star-solid",
        class: "w-3.5 h-3.5 text-yellow-500"
      }, null, _parent));
      _push(`<div class="flex-1 h-1.5 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden"><div class="h-full bg-yellow-500 rounded-full transition-all duration-300" style="${ssrRenderStyle({ width: `${getRatingPercentage(__props.stats.twoStars, __props.stats.total)}%` })}"></div></div><span class="text-xs text-gray-600 dark:text-gray-400 w-6 text-right">${ssrInterpolate(__props.stats.twoStars)}</span></div><!-- 1 Star --><div class="flex items-center gap-2"><span class="text-xs text-gray-600 dark:text-gray-400 w-4">1</span>`);
      _push(ssrRenderComponent(_component_UIcon, {
        name: "i-heroicons-star-solid",
        class: "w-3.5 h-3.5 text-yellow-500"
      }, null, _parent));
      _push(`<div class="flex-1 h-1.5 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden"><div class="h-full bg-yellow-500 rounded-full transition-all duration-300" style="${ssrRenderStyle({ width: `${getRatingPercentage(__props.stats.oneStar, __props.stats.total)}%` })}"></div></div><span class="text-xs text-gray-600 dark:text-gray-400 w-6 text-right">${ssrInterpolate(__props.stats.oneStar)}</span></div></div></div>`);
    };
  }
});

const _sfc_setup$5 = _sfc_main$5.setup;
_sfc_main$5.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("inertia/components/admin/reviews/ReviewRatingDistribution.vue");
  return _sfc_setup$5 ? _sfc_setup$5(props, ctx) : void 0;
};

const _sfc_main$4 = /* @__PURE__ */ defineComponent({
  __name: "ReviewFilters",
  __ssrInlineRender: true,
  props: {
    products: {},
    status: {},
    rating: {},
    search: {},
    productId: {}
  },
  emits: ["filter"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const toNumberOrNull = (val) => {
      if (val === null || val === void 0 || val === "") return null;
      const num = typeof val === "string" ? parseInt(val, 10) : val;
      return isNaN(num) ? null : num;
    };
    const emit = __emit;
    const localStatus = ref(props.status);
    const localRating = ref(toNumberOrNull(props.rating));
    const localSearch = ref(props.search);
    const localProductId = ref(toNumberOrNull(props.productId));
    const statusOptions = [
      { label: "Semua Status", value: "all" },
      { label: "Menunggu Persetujuan", value: "pending" },
      { label: "Disetujui", value: "approved" },
      { label: "Sudah Dibalas", value: "replied" }
    ];
    const ratingOptions = [
      { label: "Semua Rating", value: null },
      { label: "5 Bintang", value: 5 },
      { label: "4 Bintang", value: 4 },
      { label: "3 Bintang", value: 3 },
      { label: "2 Bintang", value: 2 },
      { label: "1 Bintang", value: 1 }
    ];
    const productOptions = [
      { label: "Semua Produk", value: null },
      ...props.products.map((p) => ({
        label: `${p.name} (${p.reviewCount})`,
        value: p.id
      }))
    ];
    watch([localStatus, localRating, localProductId], () => {
      emit("filter", {
        status: localStatus.value,
        rating: localRating.value,
        search: localSearch.value,
        productId: localProductId.value
      });
    });
    const handleSearch = () => {
      emit("filter", {
        status: localStatus.value,
        rating: localRating.value,
        search: localSearch.value,
        productId: localProductId.value
      });
    };
    const clearFilters = () => {
      localStatus.value = "all";
      localRating.value = null;
      localSearch.value = "";
      localProductId.value = null;
      emit("filter", {
        status: "all",
        rating: null,
        search: "",
        productId: null
      });
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UInput = _sfc_main$9;
      const _component_USelectMenu = _sfc_main$a;
      const _component_UButton = _sfc_main$b;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700" }, _attrs))}><div class="flex flex-col lg:flex-row gap-4"><!-- Search --><div class="flex-1">`);
      _push(ssrRenderComponent(_component_UInput, {
        modelValue: localSearch.value,
        "onUpdate:modelValue": ($event) => localSearch.value = $event,
        placeholder: "Cari review, produk, atau pelanggan...",
        icon: "i-heroicons-magnifying-glass",
        onKeyup: handleSearch,
        class: "w-full"
      }, null, _parent));
      _push(`</div><!-- Filters --><div class="flex flex-wrap gap-3">`);
      _push(ssrRenderComponent(_component_USelectMenu, {
        modelValue: localStatus.value,
        "onUpdate:modelValue": ($event) => localStatus.value = $event,
        items: statusOptions,
        "value-key": "value",
        placeholder: "Status",
        class: "w-full sm:w-44"
      }, null, _parent));
      _push(ssrRenderComponent(_component_USelectMenu, {
        modelValue: localRating.value,
        "onUpdate:modelValue": ($event) => localRating.value = $event,
        items: ratingOptions,
        "value-key": "value",
        placeholder: "Rating",
        class: "w-full sm:w-36"
      }, null, _parent));
      _push(ssrRenderComponent(_component_USelectMenu, {
        modelValue: localProductId.value,
        "onUpdate:modelValue": ($event) => localProductId.value = $event,
        items: productOptions,
        "value-key": "value",
        placeholder: "Produk",
        class: "w-full sm:w-48"
      }, null, _parent));
      _push(ssrRenderComponent(_component_UButton, {
        color: "neutral",
        variant: "ghost",
        icon: "i-heroicons-x-mark",
        onClick: clearFilters
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` Reset `);
          } else {
            return [
              createTextVNode(" Reset ")
            ];
          }
        }),
        _: 1
        /* STABLE */
      }, _parent));
      _push(`</div></div></div>`);
    };
  }
});

const _sfc_setup$4 = _sfc_main$4.setup;
_sfc_main$4.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("inertia/components/admin/reviews/ReviewFilters.vue");
  return _sfc_setup$4 ? _sfc_setup$4(props, ctx) : void 0;
};

const _sfc_main$3 = /* @__PURE__ */ defineComponent({
  __name: "ReviewStars",
  __ssrInlineRender: true,
  props: {
    rating: {},
    size: {}
  },
  setup(__props) {
    const getSizeClass = (size) => {
      switch (size) {
        case "xs":
          return "w-3 h-3";
        case "sm":
          return "w-4 h-4";
        case "lg":
          return "w-6 h-6";
        default:
          return "w-5 h-5";
      }
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UIcon = _sfc_main$7;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "flex items-center gap-0.5" }, _attrs))}><!--[-->`);
      ssrRenderList(5, (i) => {
        _push(ssrRenderComponent(_component_UIcon, {
          key: i,
          name: i <= __props.rating ? "i-heroicons-star-solid" : "i-heroicons-star",
          class: [
            getSizeClass(__props.size || "md"),
            i <= __props.rating ? "text-yellow-500" : "text-gray-300 dark:text-gray-600"
          ]
        }, null, _parent));
      });
      _push(`<!--]--></div>`);
    };
  }
});

const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("inertia/components/admin/reviews/ReviewStars.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};

const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "ReviewCard",
  __ssrInlineRender: true,
  props: {
    review: {}
  },
  setup(__props) {
    const props = __props;
    const showReplyModal = ref(false);
    const replyText = ref(props.review.adminReply || "");
    const isSubmitting = ref(false);
    const showImageModal = ref(false);
    const selectedImage = ref("");
    const formatDate = (dateStr) => {
      return new Date(dateStr).toLocaleDateString("id-ID", {
        day: "numeric",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit"
      });
    };
    const approveReview = () => {
      router.patch(`/admin/reviews/${props.review.id}/approve`, {}, {
        preserveScroll: true
      });
    };
    const submitReply = () => {
      if (!replyText.value.trim()) return;
      isSubmitting.value = true;
      router.post(
        `/admin/reviews/${props.review.id}/reply`,
        { reply: replyText.value },
        {
          preserveScroll: true,
          onFinish: () => {
            isSubmitting.value = false;
            showReplyModal.value = false;
          }
        }
      );
    };
    const deleteReply = () => {
      router.delete(`/admin/reviews/${props.review.id}/reply`, {
        preserveScroll: true
      });
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UBadge = _sfc_main$8;
      const _component_UIcon = _sfc_main$7;
      const _component_UAvatar = _sfc_main$c;
      const _component_UButton = _sfc_main$b;
      const _component_UModal = _sfc_main$d;
      const _component_UFormField = _sfc_main$e;
      const _component_UTextarea = _sfc_main$f;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden" }, _attrs))}><div class="p-4 sm:p-6"><!-- Header --><div class="flex flex-col sm:flex-row sm:items-start gap-4"><!-- Product Info --><div class="flex items-center gap-3 flex-1 min-w-0"><img${ssrRenderAttr("src", __props.review.product.image)}${ssrRenderAttr("alt", __props.review.product.name)} class="w-14 h-14 rounded-lg object-cover bg-gray-100 dark:bg-gray-700 shrink-0"><div class="min-w-0"><p class="font-medium text-gray-900 dark:text-white truncate">${ssrInterpolate(__props.review.product.name)}</p><p class="text-sm text-gray-500 dark:text-gray-400"> SKU: ${ssrInterpolate(__props.review.product.sku)}</p></div></div><!-- Status Badges --><div class="flex items-center gap-2 shrink-0">`);
      if (__props.review.isVerifiedPurchase) {
        _push(ssrRenderComponent(_component_UBadge, {
          color: "success",
          variant: "soft",
          size: "xs"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(_component_UIcon, {
                name: "i-heroicons-check-badge",
                class: "w-3 h-3 mr-1"
              }, null, _parent2, _scopeId));
              _push2(` Terverifikasi `);
            } else {
              return [
                createVNode(_component_UIcon, {
                  name: "i-heroicons-check-badge",
                  class: "w-3 h-3 mr-1"
                }),
                createTextVNode(" Terverifikasi ")
              ];
            }
          }),
          _: 1
          /* STABLE */
        }, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(ssrRenderComponent(_component_UBadge, {
        color: __props.review.isApproved ? "success" : "warning",
        variant: "soft",
        size: "xs"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`${ssrInterpolate(__props.review.isApproved ? "Disetujui" : "Menunggu")}`);
          } else {
            return [
              createTextVNode(
                toDisplayString(__props.review.isApproved ? "Disetujui" : "Menunggu"),
                1
                /* TEXT */
              )
            ];
          }
        }),
        _: 1
        /* STABLE */
      }, _parent));
      _push(`</div></div><!-- Divider --><div class="my-4 border-t border-gray-200 dark:border-gray-700"></div><!-- Review Content --><div class="space-y-3"><!-- Customer & Rating --><div class="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4"><div class="flex items-center gap-2">`);
      _push(ssrRenderComponent(_component_UAvatar, {
        src: __props.review.customer.avatar || void 0,
        alt: __props.review.customer.name,
        size: "sm"
      }, null, _parent));
      _push(`<span class="font-medium text-gray-900 dark:text-white">${ssrInterpolate(__props.review.customer.name)}</span></div><div class="flex items-center gap-2">`);
      _push(ssrRenderComponent(_sfc_main$3, {
        rating: __props.review.rating,
        size: "sm"
      }, null, _parent));
      _push(`<span class="text-sm text-gray-500 dark:text-gray-400">${ssrInterpolate(formatDate(__props.review.createdAt))}</span></div></div><!-- Comment -->`);
      if (__props.review.comment) {
        _push(`<p class="text-gray-700 dark:text-gray-300 whitespace-pre-wrap">${ssrInterpolate(__props.review.comment)}</p>`);
      } else {
        _push(`<p class="text-gray-400 dark:text-gray-500 italic"> Tidak ada komentar </p>`);
      }
      _push(`<!-- Images -->`);
      if (__props.review.images && __props.review.images.length > 0) {
        _push(`<div class="flex flex-wrap gap-2"><!--[-->`);
        ssrRenderList(__props.review.images, (image, index) => {
          _push(`<button class="relative group"><img${ssrRenderAttr("src", image)}${ssrRenderAttr("alt", `Review image ${index + 1}`)} class="w-16 h-16 rounded-lg object-cover bg-gray-100 dark:bg-gray-700 cursor-pointer hover:opacity-80 transition-opacity"><div class="absolute inset-0 flex items-center justify-center bg-black/50 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity">`);
          _push(ssrRenderComponent(_component_UIcon, {
            name: "i-heroicons-magnifying-glass-plus",
            class: "w-5 h-5 text-white"
          }, null, _parent));
          _push(`</div></button>`);
        });
        _push(`<!--]--></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<!-- Order Info -->`);
      if (__props.review.order) {
        _push(`<div class="text-sm text-gray-500 dark:text-gray-400"> Order: #${ssrInterpolate(__props.review.order.orderNumber)}</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><!-- Admin Reply -->`);
      if (__props.review.adminReply) {
        _push(`<div class="mt-4 p-4 rounded-lg bg-primary-50 dark:bg-primary-900/20 border border-primary-200 dark:border-primary-800"><div class="flex items-start justify-between gap-2"><div class="flex items-center gap-2 mb-2">`);
        _push(ssrRenderComponent(_component_UIcon, {
          name: "i-heroicons-chat-bubble-left-right",
          class: "w-4 h-4 text-primary-600 dark:text-primary-400"
        }, null, _parent));
        _push(`<span class="text-sm font-medium text-primary-700 dark:text-primary-300">Balasan Anda</span>`);
        if (__props.review.adminRepliedAt) {
          _push(`<span class="text-xs text-primary-500 dark:text-primary-400">${ssrInterpolate(formatDate(__props.review.adminRepliedAt))}</span>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div>`);
        _push(ssrRenderComponent(_component_UButton, {
          size: "xs",
          color: "error",
          variant: "ghost",
          icon: "i-heroicons-trash",
          onClick: deleteReply
        }, null, _parent));
        _push(`</div><p class="text-sm text-primary-700 dark:text-primary-300 whitespace-pre-wrap">${ssrInterpolate(__props.review.adminReply)}</p></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<!-- Actions --><div class="mt-4 flex flex-wrap items-center gap-2">`);
      if (!__props.review.isApproved) {
        _push(ssrRenderComponent(_component_UButton, {
          size: "sm",
          color: "success",
          variant: "soft",
          icon: "i-heroicons-check",
          onClick: approveReview
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(` Setujui `);
            } else {
              return [
                createTextVNode(" Setujui ")
              ];
            }
          }),
          _: 1
          /* STABLE */
        }, _parent));
      } else {
        _push(`<!---->`);
      }
      if (!__props.review.adminReply) {
        _push(ssrRenderComponent(_component_UButton, {
          size: "sm",
          color: "primary",
          variant: "soft",
          icon: "i-heroicons-chat-bubble-left-right",
          onClick: ($event) => showReplyModal.value = true
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(` Balas `);
            } else {
              return [
                createTextVNode(" Balas ")
              ];
            }
          }),
          _: 1
          /* STABLE */
        }, _parent));
      } else {
        _push(ssrRenderComponent(_component_UButton, {
          size: "sm",
          color: "neutral",
          variant: "soft",
          icon: "i-heroicons-pencil",
          onClick: ($event) => showReplyModal.value = true
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(` Edit Balasan `);
            } else {
              return [
                createTextVNode(" Edit Balasan ")
              ];
            }
          }),
          _: 1
          /* STABLE */
        }, _parent));
      }
      _push(`</div></div><!-- Reply Modal -->`);
      _push(ssrRenderComponent(_component_UModal, {
        open: showReplyModal.value,
        "onUpdate:open": ($event) => showReplyModal.value = $event,
        title: __props.review.adminReply ? "Edit Balasan" : "Balas Review",
        description: `Balas review dari ${__props.review.customer.name}`,
        ui: { overlay: "z-[100]", content: "z-[100]" }
      }, {
        content: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="p-6 max-h-[85vh] overflow-y-auto"${_scopeId}><div class="mb-4 p-3 rounded-lg bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700"${_scopeId}><div class="flex items-center gap-2 mb-2"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$3, {
              rating: __props.review.rating,
              size: "sm"
            }, null, _parent2, _scopeId));
            _push2(`<span class="text-sm text-gray-500 dark:text-gray-400"${_scopeId}> oleh ${ssrInterpolate(__props.review.customer.name)}</span></div><p class="text-sm text-gray-600 dark:text-gray-400 line-clamp-3"${_scopeId}>${ssrInterpolate(__props.review.comment || "Tidak ada komentar")}</p></div>`);
            _push2(ssrRenderComponent(_component_UFormField, { label: "Balasan Anda" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_UTextarea, {
                    modelValue: replyText.value,
                    "onUpdate:modelValue": ($event) => replyText.value = $event,
                    placeholder: "Tulis balasan untuk review ini...",
                    rows: 4,
                    class: "w-full"
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_UTextarea, {
                      modelValue: replyText.value,
                      "onUpdate:modelValue": ($event) => replyText.value = $event,
                      placeholder: "Tulis balasan untuk review ini...",
                      rows: 4,
                      class: "w-full"
                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                  ];
                }
              }),
              _: 1
              /* STABLE */
            }, _parent2, _scopeId));
            _push2(`<div class="mt-6 flex justify-end gap-3"${_scopeId}>`);
            _push2(ssrRenderComponent(_component_UButton, {
              color: "neutral",
              variant: "ghost",
              onClick: ($event) => showReplyModal.value = false
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
              loading: isSubmitting.value,
              disabled: !replyText.value.trim(),
              onClick: submitReply
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Simpan Balasan `);
                } else {
                  return [
                    createTextVNode(" Simpan Balasan ")
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
                createVNode("div", { class: "mb-4 p-3 rounded-lg bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700" }, [
                  createVNode("div", { class: "flex items-center gap-2 mb-2" }, [
                    createVNode(_sfc_main$3, {
                      rating: __props.review.rating,
                      size: "sm"
                    }, null, 8, ["rating"]),
                    createVNode(
                      "span",
                      { class: "text-sm text-gray-500 dark:text-gray-400" },
                      " oleh " + toDisplayString(__props.review.customer.name),
                      1
                      /* TEXT */
                    )
                  ]),
                  createVNode(
                    "p",
                    { class: "text-sm text-gray-600 dark:text-gray-400 line-clamp-3" },
                    toDisplayString(__props.review.comment || "Tidak ada komentar"),
                    1
                    /* TEXT */
                  )
                ]),
                createVNode(_component_UFormField, { label: "Balasan Anda" }, {
                  default: withCtx(() => [
                    createVNode(_component_UTextarea, {
                      modelValue: replyText.value,
                      "onUpdate:modelValue": ($event) => replyText.value = $event,
                      placeholder: "Tulis balasan untuk review ini...",
                      rows: 4,
                      class: "w-full"
                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                  ]),
                  _: 1
                  /* STABLE */
                }),
                createVNode("div", { class: "mt-6 flex justify-end gap-3" }, [
                  createVNode(_component_UButton, {
                    color: "neutral",
                    variant: "ghost",
                    onClick: ($event) => showReplyModal.value = false
                  }, {
                    default: withCtx(() => [
                      createTextVNode(" Batal ")
                    ]),
                    _: 1
                    /* STABLE */
                  }, 8, ["onClick"]),
                  createVNode(_component_UButton, {
                    color: "primary",
                    loading: isSubmitting.value,
                    disabled: !replyText.value.trim(),
                    onClick: submitReply
                  }, {
                    default: withCtx(() => [
                      createTextVNode(" Simpan Balasan ")
                    ]),
                    _: 1
                    /* STABLE */
                  }, 8, ["loading", "disabled"])
                ])
              ])
            ];
          }
        }),
        _: 1
        /* STABLE */
      }, _parent));
      _push(`<!-- Image Modal -->`);
      _push(ssrRenderComponent(_component_UModal, {
        open: showImageModal.value,
        "onUpdate:open": ($event) => showImageModal.value = $event,
        title: "Gambar Review",
        description: "Lihat gambar review dalam ukuran penuh",
        ui: { overlay: "z-[100]", content: "z-[100]", width: "max-w-4xl" }
      }, {
        content: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="p-2 max-h-[85vh] overflow-y-auto"${_scopeId}><img${ssrRenderAttr("src", selectedImage.value)} alt="Review image" class="max-w-full max-h-[80vh] object-contain rounded-lg"${_scopeId}></div>`);
          } else {
            return [
              createVNode("div", { class: "p-2 max-h-[85vh] overflow-y-auto" }, [
                createVNode("img", {
                  src: selectedImage.value,
                  alt: "Review image",
                  class: "max-w-full max-h-[80vh] object-contain rounded-lg"
                }, null, 8, ["src"])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("inertia/components/admin/reviews/ReviewCard.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};

const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "ReviewPagination",
  __ssrInlineRender: true,
  props: {
    meta: {}
  },
  emits: ["pageChange", "perPageChange"],
  setup(__props, { emit: __emit }) {
    const emit = __emit;
    const perPageOptions = [
      { label: "10", value: 10 },
      { label: "20", value: 20 },
      { label: "50", value: 50 }
    ];
    const handlePerPageChange = (value) => {
      emit("perPageChange", Number(value));
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_USelect = _sfc_main$g;
      const _component_UPagination = _sfc_main$h;
      if (__props.meta.total > 0) {
        _push(`<div${ssrRenderAttrs(mergeProps({ class: "flex flex-col sm:flex-row items-center justify-between gap-4 p-4 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700" }, _attrs))}><div class="text-sm text-gray-500 dark:text-gray-400"> Menampilkan ${ssrInterpolate((__props.meta.currentPage - 1) * __props.meta.perPage + 1)} - ${ssrInterpolate(Math.min(__props.meta.currentPage * __props.meta.perPage, __props.meta.total))} dari ${ssrInterpolate(__props.meta.total)} review </div><div class="flex items-center gap-4">`);
        _push(ssrRenderComponent(_component_USelect, {
          "model-value": __props.meta.perPage,
          items: perPageOptions,
          "value-key": "value",
          size: "sm",
          class: "w-20",
          "onUpdate:modelValue": handlePerPageChange
        }, null, _parent));
        _push(ssrRenderComponent(_component_UPagination, {
          "model-value": __props.meta.currentPage,
          total: __props.meta.total,
          "items-per-page": __props.meta.perPage,
          size: "sm",
          "onUpdate:modelValue": (page) => emit("pageChange", page)
        }, null, _parent));
        _push(`</div></div>`);
      } else {
        _push(`<!---->`);
      }
    };
  }
});

const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("inertia/components/admin/reviews/ReviewPagination.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};

const _sfc_main = /* @__PURE__ */ defineComponent({
  ...{
    layout: AdminLayout
  },
  __name: "index",
  __ssrInlineRender: true,
  props: {
    admin: { default: () => ({ id: 0, storeName: "Admin" }) },
    reviews: { default: () => [] },
    meta: { default: () => ({
      total: 0,
      perPage: 10,
      currentPage: 1,
      lastPage: 1,
      firstPage: 1
    }) },
    stats: { default: () => ({
      total: 0,
      pending: 0,
      approved: 0,
      averageRating: 0,
      fiveStars: 0,
      fourStars: 0,
      threeStars: 0,
      twoStars: 0,
      oneStar: 0
    }) },
    products: { default: () => [] },
    filters: { default: () => ({
      status: "all",
      rating: null,
      search: "",
      productId: null,
      dateFrom: "",
      dateTo: ""
    }) }
  },
  setup(__props) {
    const props = __props;
    const localReviews = ref(Array.isArray(props.reviews) ? [...props.reviews] : []);
    watch(
      () => props.reviews,
      (newReviews) => {
        localReviews.value = Array.isArray(newReviews) ? [...newReviews] : [];
      },
      { deep: true }
    );
    const { isConnected, onReplyReceived } = useAdminReviews();
    let cleanupReplyListener = null;
    onMounted(() => {
      cleanupReplyListener = onReplyReceived((data) => {
        const reviewIndex = localReviews.value.findIndex((r) => r.id === data.reviewId);
        if (reviewIndex !== -1) {
          localReviews.value[reviewIndex] = {
            ...localReviews.value[reviewIndex],
            adminReply: data.adminReply,
            adminRepliedAt: data.adminRepliedAt
          };
        }
      });
    });
    onUnmounted(() => {
      if (cleanupReplyListener) {
        cleanupReplyListener();
      }
    });
    const isLoading = ref(false);
    const currentFilters = ref({ ...props.filters });
    const applyFilters = (filters) => {
      currentFilters.value = { ...currentFilters.value, ...filters };
      fetchReviews();
    };
    const fetchReviews = (page = 1, perPage = props.meta.perPage) => {
      isLoading.value = true;
      const params = {
        page,
        perPage
      };
      if (currentFilters.value.status && currentFilters.value.status !== "all") {
        params.status = currentFilters.value.status;
      }
      if (currentFilters.value.rating) {
        params.rating = currentFilters.value.rating;
      }
      if (currentFilters.value.search) {
        params.search = currentFilters.value.search;
      }
      if (currentFilters.value.productId) {
        params.productId = currentFilters.value.productId;
      }
      router.get("/admin/reviews", params, {
        preserveState: true,
        preserveScroll: true,
        onFinish: () => {
          isLoading.value = false;
        }
      });
    };
    const handlePageChange = (page) => {
      fetchReviews(page);
    };
    const handlePerPageChange = (perPage) => {
      fetchReviews(1, perPage);
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UBadge = _sfc_main$8;
      const _component_UIcon = _sfc_main$7;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "p-6 space-y-6" }, _attrs))}><!-- Header --><div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"><div><h1 class="text-2xl font-bold text-gray-900 dark:text-white">Review Produk</h1><p class="text-gray-500 dark:text-gray-400"> Kelola ulasan pelanggan untuk produk Anda </p></div></div><!-- Stats Section --><div class="grid grid-cols-1 xl:grid-cols-4 gap-6"><div class="xl:col-span-3">`);
      _push(ssrRenderComponent(_sfc_main$6, {
        stats: props.stats
      }, null, _parent));
      _push(`</div><div class="xl:col-span-1">`);
      _push(ssrRenderComponent(_sfc_main$5, {
        stats: props.stats
      }, null, _parent));
      _push(`</div></div><!-- Filters -->`);
      _push(ssrRenderComponent(_sfc_main$4, {
        products: props.products,
        status: currentFilters.value.status,
        rating: currentFilters.value.rating,
        search: currentFilters.value.search,
        "product-id": currentFilters.value.productId,
        onFilter: applyFilters
      }, null, _parent));
      _push(`<!-- Realtime Connection Status -->`);
      if (unref(isConnected)) {
        _push(`<div class="fixed bottom-4 right-4 z-50">`);
        _push(ssrRenderComponent(_component_UBadge, {
          color: "success",
          variant: "soft",
          size: "xs",
          class: "flex items-center gap-1"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<span class="w-2 h-2 bg-green-500 rounded-full animate-pulse"${_scopeId}></span> Realtime `);
            } else {
              return [
                createVNode("span", { class: "w-2 h-2 bg-green-500 rounded-full animate-pulse" }),
                createTextVNode(" Realtime ")
              ];
            }
          }),
          _: 1
          /* STABLE */
        }, _parent));
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<!-- Loading State -->`);
      if (isLoading.value) {
        _push(`<div class="flex items-center justify-center py-12">`);
        _push(ssrRenderComponent(_component_UIcon, {
          name: "i-heroicons-arrow-path",
          class: "w-8 h-8 text-primary-500 animate-spin"
        }, null, _parent));
        _push(`</div>`);
      } else if (localReviews.value.length > 0) {
        _push(`<!--[--><!-- Reviews List --><div class="space-y-4"><!--[-->`);
        ssrRenderList(localReviews.value, (review) => {
          _push(ssrRenderComponent(_sfc_main$2, {
            key: review.id,
            review
          }, null, _parent));
        });
        _push(`<!--]--></div><!--]-->`);
      } else {
        _push(`<!--[--><!-- Empty State --><div class="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-12 text-center">`);
        _push(ssrRenderComponent(_component_UIcon, {
          name: "i-heroicons-chat-bubble-left-right",
          class: "w-16 h-16 mx-auto text-gray-300 dark:text-gray-600 mb-4"
        }, null, _parent));
        _push(`<h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2"> Belum Ada Review </h3><p class="text-gray-500 dark:text-gray-400 max-w-md mx-auto"> Produk Anda belum memiliki ulasan dari pelanggan. Review akan muncul setelah pelanggan memberikan ulasan. </p></div><!--]-->`);
      }
      _push(`<!-- Pagination -->`);
      _push(ssrRenderComponent(_sfc_main$1, {
        meta: props.meta,
        onPageChange: handlePageChange,
        onPerPageChange: handlePerPageChange
      }, null, _parent));
      _push(`</div>`);
    };
  }
});

const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("inertia/pages/admin/reviews/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
