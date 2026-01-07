import { defineComponent, mergeProps, withCtx, createTextVNode, useSSRContext, unref, toDisplayString, ref, computed, createVNode, useId, inject, provide, onMounted, nextTick, readonly, onUnmounted, reactive, resolveDynamicComponent, renderSlot, watch, createCommentVNode, createBlock, openBlock, withModifiers } from 'vue';
import { ssrRenderAttrs, ssrInterpolate, ssrRenderComponent, ssrRenderAttr, ssrRenderList, ssrRenderVNode, ssrRenderSlot } from 'vue/server-renderer';
import { router } from '@inertiajs/vue3';
import { A as AdminLayout } from './admin-ELJtfEoX.js';
import { a as _sfc_main$8, _ as _sfc_main$9, t as tv, f as formBusInjectionKey, c as formStateInjectionKey, d as formErrorsInjectionKey, e as formInputsInjectionKey, g as formLoadingInjectionKey, h as formOptionsInjectionKey } from './Button-BTdvmZ8N.js';
import { a as _sfc_main$a, _ as _sfc_main$b } from './Badge-CQlYH3Fo.js';
import { _ as _sfc_main$f } from './Checkbox-DCS-_c5K.js';
import { _ as _sfc_main$e } from './Textarea-yrK84h3-.js';
import { _ as _sfc_main$d } from './Select-mEsLh9Ds.js';
import { useEventBus } from '@vueuse/core';
import { a as useAppConfig } from './virtual_nuxt-ui-plugins-CrG8Uaxr.js';
import { _ as _sfc_main$c } from './Modal-VctJV7vb.js';
import './Tooltip-C54KurGy.js';
import 'defu';
import 'reka-ui';
import 'tailwind-variants';
import '@iconify/vue';
import 'ufo';
import 'reka-ui/namespaced';
import '@unhead/vue/client';
import 'tailwindcss/colors';
import 'hookable';
import 'ohash/utils';
import '@unhead/vue';

const _sfc_main$7 = /* @__PURE__ */ defineComponent({
  __name: "CategoryHeader",
  __ssrInlineRender: true,
  props: {
    storeName: {}
  },
  emits: ["add"],
  setup(__props, { emit: __emit }) {
    const emit = __emit;
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UButton = _sfc_main$8;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4" }, _attrs))}><div><h1 class="text-2xl font-bold text-slate-900 dark:text-white">Kategori Produk</h1><p class="text-sm text-slate-500 dark:text-slate-400 mt-1"> Kelola kategori produk untuk toko ${ssrInterpolate(__props.storeName)}</p></div>`);
      _push(ssrRenderComponent(_component_UButton, {
        icon: "i-heroicons-plus",
        color: "primary",
        onClick: ($event) => emit("add")
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` Tambah Kategori `);
          } else {
            return [
              createTextVNode(" Tambah Kategori ")
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

const _sfc_setup$7 = _sfc_main$7.setup;
_sfc_main$7.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("inertia/components/admin/products/categories/CategoryHeader.vue");
  return _sfc_setup$7 ? _sfc_setup$7(props, ctx) : void 0;
};

const _sfc_main$6 = /* @__PURE__ */ defineComponent({
  __name: "CategoryStats",
  __ssrInlineRender: true,
  props: {
    stats: {}
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UIcon = _sfc_main$9;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "grid grid-cols-2 md:grid-cols-4 gap-4" }, _attrs))}><!-- Total Categories --><div class="bg-white dark:bg-slate-800 rounded-xl p-4 border border-slate-200 dark:border-slate-700"><div class="flex items-center gap-3"><div class="w-10 h-10 rounded-lg bg-violet-100 dark:bg-violet-900/30 flex items-center justify-center">`);
      _push(ssrRenderComponent(_component_UIcon, {
        name: "i-heroicons-folder",
        class: "w-5 h-5 text-violet-500"
      }, null, _parent));
      _push(`</div><div><p class="text-xs text-slate-500 dark:text-slate-400">Total Kategori</p><p class="text-lg font-semibold text-slate-900 dark:text-white">${ssrInterpolate(__props.stats.totalCategories)}</p></div></div></div><!-- Main Categories --><div class="bg-white dark:bg-slate-800 rounded-xl p-4 border border-slate-200 dark:border-slate-700"><div class="flex items-center gap-3"><div class="w-10 h-10 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">`);
      _push(ssrRenderComponent(_component_UIcon, {
        name: "i-heroicons-folder-open",
        class: "w-5 h-5 text-blue-500"
      }, null, _parent));
      _push(`</div><div><p class="text-xs text-slate-500 dark:text-slate-400">Kategori Utama</p><p class="text-lg font-semibold text-slate-900 dark:text-white">${ssrInterpolate(__props.stats.mainCategories)}</p></div></div></div><!-- Sub Categories --><div class="bg-white dark:bg-slate-800 rounded-xl p-4 border border-slate-200 dark:border-slate-700"><div class="flex items-center gap-3"><div class="w-10 h-10 rounded-lg bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center">`);
      _push(ssrRenderComponent(_component_UIcon, {
        name: "i-heroicons-rectangle-stack",
        class: "w-5 h-5 text-amber-500"
      }, null, _parent));
      _push(`</div><div><p class="text-xs text-slate-500 dark:text-slate-400">Sub-Kategori</p><p class="text-lg font-semibold text-slate-900 dark:text-white">${ssrInterpolate(__props.stats.subCategories)}</p></div></div></div><!-- Active Categories --><div class="bg-white dark:bg-slate-800 rounded-xl p-4 border border-slate-200 dark:border-slate-700"><div class="flex items-center gap-3"><div class="w-10 h-10 rounded-lg bg-green-100 dark:bg-green-900/30 flex items-center justify-center">`);
      _push(ssrRenderComponent(_component_UIcon, {
        name: "i-heroicons-check-circle",
        class: "w-5 h-5 text-green-500"
      }, null, _parent));
      _push(`</div><div><p class="text-xs text-slate-500 dark:text-slate-400">Kategori Aktif</p><p class="text-lg font-semibold text-slate-900 dark:text-white">${ssrInterpolate(__props.stats.activeCategories)}</p></div></div></div></div>`);
    };
  }
});

const _sfc_setup$6 = _sfc_main$6.setup;
_sfc_main$6.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("inertia/components/admin/products/categories/CategoryStats.vue");
  return _sfc_setup$6 ? _sfc_setup$6(props, ctx) : void 0;
};

function useImageHelper() {
  const isValidImageUrl = (url) => {
    if (!url) return false;
    if (url.includes("placehold.co")) return false;
    if (url === "/images/placeholder.png") return false;
    return true;
  };
  const getImageUrl = (url, placeholder = "No Image") => {
    if (!url || url.includes("placehold.co")) {
      return `https://placehold.co/100x100/1a1a2e/ffffff?text=${encodeURIComponent(placeholder)}`;
    }
    return url;
  };
  const getCategoryImageUrl = (imageUrl) => {
    return getImageUrl(imageUrl, "Category");
  };
  const getProductImageUrl = (imageUrl) => {
    return getImageUrl(imageUrl, "Product");
  };
  const getAvatarUrl = (avatarUrl) => {
    return getImageUrl(avatarUrl, "User");
  };
  return {
    getImageUrl,
    getCategoryImageUrl,
    getProductImageUrl,
    getAvatarUrl,
    isValidImageUrl
  };
}

const _sfc_main$5 = /* @__PURE__ */ defineComponent({
  __name: "CategoryItem",
  __ssrInlineRender: true,
  props: {
    category: {},
    isExpanded: { type: Boolean }
  },
  emits: ["toggle", "edit", "delete", "toggle-active"],
  setup(__props, { emit: __emit }) {
    const emit = __emit;
    const { getCategoryImageUrl, isValidImageUrl } = useImageHelper();
    const handleEdit = (event, category) => {
      event.stopPropagation();
      emit("edit", category);
    };
    const handleDelete = (event, category) => {
      event.stopPropagation();
      emit("delete", category);
    };
    const handleToggleActive = (event, category) => {
      event.stopPropagation();
      emit("toggle-active", category);
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UIcon = _sfc_main$9;
      const _component_UBadge = _sfc_main$a;
      const _component_UButton = _sfc_main$8;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "border border-slate-200 dark:border-slate-700 rounded-lg overflow-hidden" }, _attrs))}><!-- Parent Category Header --><div class="flex items-center gap-3 p-4 bg-slate-50 dark:bg-slate-900/30 hover:bg-slate-100 dark:hover:bg-slate-900/50 transition-colors"><!-- Expand Button -->`);
      if (__props.category.children.length > 0) {
        _push(`<button class="w-6 h-6 flex items-center justify-center rounded hover:bg-slate-200 dark:hover:bg-slate-700">`);
        _push(ssrRenderComponent(_component_UIcon, {
          name: __props.isExpanded ? "i-heroicons-chevron-down" : "i-heroicons-chevron-right",
          class: "w-4 h-4 text-slate-500 transition-transform"
        }, null, _parent));
        _push(`</button>`);
      } else {
        _push(`<div class="w-6 h-6"></div>`);
      }
      _push(`<!-- Category Icon --><div class="w-10 h-10 rounded-lg overflow-hidden bg-violet-100 dark:bg-violet-900/30 flex items-center justify-center shrink-0">`);
      if (unref(isValidImageUrl)(__props.category.image)) {
        _push(`<img${ssrRenderAttr("src", unref(getCategoryImageUrl)(__props.category.image))}${ssrRenderAttr("alt", __props.category.name)} class="w-full h-full object-cover">`);
      } else {
        _push(ssrRenderComponent(_component_UIcon, {
          name: "i-heroicons-folder",
          class: "w-5 h-5 text-violet-500"
        }, null, _parent));
      }
      _push(`</div><!-- Category Info --><div class="flex-1 min-w-0"><div class="flex items-center gap-2"><p class="font-medium text-slate-900 dark:text-white">${ssrInterpolate(__props.category.name)}</p>`);
      if (!__props.category.isActive) {
        _push(ssrRenderComponent(_component_UBadge, {
          color: "neutral",
          variant: "subtle",
          size: "xs"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(` Nonaktif `);
            } else {
              return [
                createTextVNode(" Nonaktif ")
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
      if (__props.category.description) {
        _push(`<p class="text-xs text-slate-500 dark:text-slate-400 truncate">${ssrInterpolate(__props.category.description)}</p>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><!-- Children Count -->`);
      if (__props.category.children.length > 0) {
        _push(ssrRenderComponent(_component_UBadge, {
          color: "primary",
          variant: "subtle",
          size: "sm"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`${ssrInterpolate(__props.category.children.length)} sub-kategori `);
            } else {
              return [
                createTextVNode(
                  toDisplayString(__props.category.children.length) + " sub-kategori ",
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
      _push(`<!-- Action Buttons --><div class="flex items-center gap-1">`);
      _push(ssrRenderComponent(_component_UButton, {
        icon: "i-heroicons-pencil",
        color: "neutral",
        variant: "ghost",
        size: "xs",
        onClick: (e) => handleEdit(e, __props.category)
      }, null, _parent));
      _push(ssrRenderComponent(_component_UButton, {
        icon: __props.category.isActive ? "i-heroicons-eye-slash" : "i-heroicons-eye",
        color: __props.category.isActive ? "warning" : "success",
        variant: "ghost",
        size: "xs",
        onClick: (e) => handleToggleActive(e, __props.category)
      }, null, _parent));
      _push(ssrRenderComponent(_component_UButton, {
        icon: "i-heroicons-trash",
        color: "error",
        variant: "ghost",
        size: "xs",
        onClick: (e) => handleDelete(e, __props.category)
      }, null, _parent));
      _push(`</div></div><!-- Children Categories (Collapsible) -->`);
      if (__props.isExpanded && __props.category.children.length > 0) {
        _push(`<div class="overflow-hidden"><div class="divide-y divide-slate-200 dark:divide-slate-700"><!--[-->`);
        ssrRenderList(__props.category.children, (child) => {
          _push(`<div class="flex items-center gap-3 px-4 py-3 pl-16 hover:bg-slate-50 dark:hover:bg-slate-900/20 transition-colors">`);
          _push(ssrRenderComponent(_component_UIcon, {
            name: "i-heroicons-arrow-turn-down-right",
            class: "w-4 h-4 text-slate-400 shrink-0"
          }, null, _parent));
          _push(`<!-- Child Icon --><div class="w-8 h-8 rounded-lg overflow-hidden bg-slate-100 dark:bg-slate-700 flex items-center justify-center shrink-0">`);
          if (unref(isValidImageUrl)(child.image)) {
            _push(`<img${ssrRenderAttr("src", unref(getCategoryImageUrl)(child.image))}${ssrRenderAttr("alt", child.name)} class="w-full h-full object-cover">`);
          } else {
            _push(ssrRenderComponent(_component_UIcon, {
              name: "i-heroicons-tag",
              class: "w-4 h-4 text-slate-400"
            }, null, _parent));
          }
          _push(`</div><!-- Child Info --><div class="flex-1 min-w-0"><div class="flex items-center gap-2"><p class="text-sm text-slate-700 dark:text-slate-300">${ssrInterpolate(child.name)}</p>`);
          if (!child.isActive) {
            _push(ssrRenderComponent(_component_UBadge, {
              color: "neutral",
              variant: "subtle",
              size: "xs"
            }, {
              default: withCtx((_, _push2, _parent2, _scopeId) => {
                if (_push2) {
                  _push2(` Nonaktif `);
                } else {
                  return [
                    createTextVNode(" Nonaktif ")
                  ];
                }
              }),
              _: 2
              /* DYNAMIC */
            }, _parent));
          } else {
            _push(`<!---->`);
          }
          _push(`</div>`);
          if (child.description) {
            _push(`<p class="text-xs text-slate-500 dark:text-slate-400 truncate">${ssrInterpolate(child.description)}</p>`);
          } else {
            _push(`<!---->`);
          }
          _push(`</div><!-- Child Action Buttons --><div class="flex items-center gap-1">`);
          _push(ssrRenderComponent(_component_UButton, {
            icon: "i-heroicons-pencil",
            color: "neutral",
            variant: "ghost",
            size: "xs",
            onClick: (e) => handleEdit(e, child)
          }, null, _parent));
          _push(ssrRenderComponent(_component_UButton, {
            icon: child.isActive ? "i-heroicons-eye-slash" : "i-heroicons-eye",
            color: child.isActive ? "warning" : "success",
            variant: "ghost",
            size: "xs",
            onClick: (e) => handleToggleActive(e, child)
          }, null, _parent));
          _push(ssrRenderComponent(_component_UButton, {
            icon: "i-heroicons-trash",
            color: "error",
            variant: "ghost",
            size: "xs",
            onClick: (e) => handleDelete(e, child)
          }, null, _parent));
          _push(`</div></div>`);
        });
        _push(`<!--]--></div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
    };
  }
});

const _sfc_setup$5 = _sfc_main$5.setup;
_sfc_main$5.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("inertia/components/admin/products/categories/CategoryItem.vue");
  return _sfc_setup$5 ? _sfc_setup$5(props, ctx) : void 0;
};

const _sfc_main$4 = /* @__PURE__ */ defineComponent({
  __name: "CategoryList",
  __ssrInlineRender: true,
  props: {
    categories: {}
  },
  emits: ["edit", "delete", "toggle-active"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const searchQuery = ref("");
    const expandedCategories = ref(/* @__PURE__ */ new Set());
    const toggleCategory = (categoryId) => {
      if (expandedCategories.value.has(categoryId)) {
        expandedCategories.value.delete(categoryId);
      } else {
        expandedCategories.value.add(categoryId);
      }
    };
    const expandAll = () => {
      props.categories.forEach((cat) => {
        if (cat.children.length > 0) {
          expandedCategories.value.add(cat.id);
        }
      });
    };
    const collapseAll = () => {
      expandedCategories.value.clear();
    };
    const filteredCategories = computed(() => {
      if (!searchQuery.value.trim()) {
        return props.categories;
      }
      const query = searchQuery.value.toLowerCase();
      return props.categories.filter((category) => {
        if (category.name.toLowerCase().includes(query)) {
          return true;
        }
        return category.children.some((child) => child.name.toLowerCase().includes(query));
      });
    });
    const hasSubCategories = computed(() => {
      return props.categories.some((cat) => cat.children.length > 0);
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UInput = _sfc_main$b;
      const _component_UButton = _sfc_main$8;
      const _component_UIcon = _sfc_main$9;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden" }, _attrs))}><!-- Header with Search --><div class="p-4 border-b border-slate-200 dark:border-slate-700"><div class="flex flex-col sm:flex-row gap-4"><div class="flex-1">`);
      _push(ssrRenderComponent(_component_UInput, {
        modelValue: searchQuery.value,
        "onUpdate:modelValue": ($event) => searchQuery.value = $event,
        placeholder: "Cari kategori...",
        icon: "i-heroicons-magnifying-glass"
      }, null, _parent));
      _push(`</div>`);
      if (hasSubCategories.value) {
        _push(`<div class="flex gap-2">`);
        _push(ssrRenderComponent(_component_UButton, {
          color: "neutral",
          variant: "outline",
          size: "sm",
          onClick: expandAll
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(_component_UIcon, {
                name: "i-heroicons-arrows-pointing-out",
                class: "w-4 h-4 mr-1"
              }, null, _parent2, _scopeId));
              _push2(` Buka Semua `);
            } else {
              return [
                createVNode(_component_UIcon, {
                  name: "i-heroicons-arrows-pointing-out",
                  class: "w-4 h-4 mr-1"
                }),
                createTextVNode(" Buka Semua ")
              ];
            }
          }),
          _: 1
          /* STABLE */
        }, _parent));
        _push(ssrRenderComponent(_component_UButton, {
          color: "neutral",
          variant: "outline",
          size: "sm",
          onClick: collapseAll
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(_component_UIcon, {
                name: "i-heroicons-arrows-pointing-in",
                class: "w-4 h-4 mr-1"
              }, null, _parent2, _scopeId));
              _push2(` Tutup Semua `);
            } else {
              return [
                createVNode(_component_UIcon, {
                  name: "i-heroicons-arrows-pointing-in",
                  class: "w-4 h-4 mr-1"
                }),
                createTextVNode(" Tutup Semua ")
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
      _push(`</div></div><!-- Categories List --><div class="p-4"><!-- Empty State -->`);
      if (__props.categories.length === 0) {
        _push(`<div class="text-center py-12"><div class="w-16 h-16 rounded-full bg-slate-100 dark:bg-slate-700 flex items-center justify-center mx-auto mb-4">`);
        _push(ssrRenderComponent(_component_UIcon, {
          name: "i-heroicons-folder",
          class: "w-8 h-8 text-slate-400"
        }, null, _parent));
        _push(`</div><p class="text-slate-900 dark:text-white font-medium">Belum ada kategori</p><p class="text-sm text-slate-500 dark:text-slate-400 mt-1"> Klik tombol &quot;Tambah Kategori&quot; untuk menambahkan kategori baru </p></div>`);
      } else if (filteredCategories.value.length === 0) {
        _push(`<!--[--><!-- No Search Results --><div class="text-center py-12"><div class="w-16 h-16 rounded-full bg-slate-100 dark:bg-slate-700 flex items-center justify-center mx-auto mb-4">`);
        _push(ssrRenderComponent(_component_UIcon, {
          name: "i-heroicons-magnifying-glass",
          class: "w-8 h-8 text-slate-400"
        }, null, _parent));
        _push(`</div><p class="text-slate-900 dark:text-white font-medium">Tidak ditemukan</p><p class="text-sm text-slate-500 dark:text-slate-400 mt-1"> Tidak ada kategori yang cocok dengan pencarian &quot;${ssrInterpolate(searchQuery.value)}&quot; </p>`);
        _push(ssrRenderComponent(_component_UButton, {
          color: "neutral",
          variant: "outline",
          size: "sm",
          class: "mt-4",
          onClick: ($event) => searchQuery.value = ""
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(` Reset Pencarian `);
            } else {
              return [
                createTextVNode(" Reset Pencarian ")
              ];
            }
          }),
          _: 1
          /* STABLE */
        }, _parent));
        _push(`</div><!--]-->`);
      } else {
        _push(`<!--[--><!-- Category Items --><div class="space-y-3"><!--[-->`);
        ssrRenderList(filteredCategories.value, (category) => {
          _push(ssrRenderComponent(_sfc_main$5, {
            key: category.id,
            category,
            "is-expanded": expandedCategories.value.has(category.id),
            onToggle: ($event) => toggleCategory(category.id),
            onEdit: ($event) => emit("edit", $event),
            onDelete: ($event) => emit("delete", $event),
            onToggleActive: ($event) => emit("toggle-active", $event)
          }, null, _parent));
        });
        _push(`<!--]--></div><!--]-->`);
      }
      _push(`</div></div>`);
    };
  }
});

const _sfc_setup$4 = _sfc_main$4.setup;
_sfc_main$4.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("inertia/components/admin/products/categories/CategoryList.vue");
  return _sfc_setup$4 ? _sfc_setup$4(props, ctx) : void 0;
};

function isSuperStructSchema(schema) {
  return "schema" in schema && typeof schema.coercer === "function" && typeof schema.validator === "function" && typeof schema.refiner === "function";
}
function isStandardSchema(schema) {
  return "~standard" in schema;
}
async function validateStandardSchema(state, schema) {
  const result = await schema["~standard"].validate(state);
  if (result.issues) {
    return {
      errors: result.issues?.map((issue) => ({
        name: issue.path?.map((item) => typeof item === "object" ? item.key : item).join(".") || "",
        message: issue.message
      })) || [],
      result: null
    };
  }
  return {
    errors: null,
    result: result.value
  };
}
async function validateSuperstructSchema(state, schema) {
  const [err, result] = schema.validate(state);
  if (err) {
    const errors = err.failures().map((error) => ({
      message: error.message,
      name: error.path.join(".")
    }));
    return {
      errors,
      result: null
    };
  }
  return {
    errors: null,
    result
  };
}
function validateSchema(state, schema) {
  if (isStandardSchema(schema)) {
    return validateStandardSchema(state, schema);
  } else if (isSuperStructSchema(schema)) {
    return validateSuperstructSchema(state, schema);
  } else {
    throw new Error("Form validation failed: Unsupported form schema");
  }
}
function getAtPath(data, path) {
  if (!path) return data;
  const value = path.split(".").reduce(
    (value2, key) => value2?.[key],
    data
  );
  return value;
}
function setAtPath(data, path, value) {
  if (!path) return Object.assign(data, value);
  if (!data) return data;
  const keys = path.split(".");
  let current = data;
  for (let i = 0; i < keys.length - 1; i++) {
    const key = keys[i];
    if (current[key] === void 0 || current[key] === null) {
      if (i + 1 < keys.length && !Number.isNaN(Number(keys[i + 1]))) {
        current[key] = [];
      } else {
        current[key] = {};
      }
    }
    current = current[key];
  }
  const lastKey = keys[keys.length - 1];
  current[lastKey] = value;
  return data;
}

class FormValidationException extends Error {
  formId;
  errors;
  constructor(formId, errors) {
    super("Form validation exception");
    this.formId = formId;
    this.errors = errors;
    Object.setPrototypeOf(this, FormValidationException.prototype);
  }
}

const theme = {
  "base": ""
};

const _sfc_main$3 = {
  __name: 'Form',
  __ssrInlineRender: true,
  props: {
  id: { type: [String, Number], required: false },
  schema: { type: null, required: false },
  state: { type: null, required: false },
  validate: { type: Function, required: false },
  validateOn: { type: Array, required: false, default() {
    return ["input", "blur", "change"];
  } },
  disabled: { type: Boolean, required: false },
  name: { type: null, required: false },
  validateOnInputDelay: { type: Number, required: false, default: 300 },
  transform: { type: null, required: false, default: () => true },
  nested: { type: Boolean, required: false },
  loadingAuto: { type: Boolean, required: false, default: true },
  class: { type: null, required: false },
  onSubmit: { type: Function, required: false }
},
  emits: ["submit", "error"],
  setup(__props, { expose: __expose, emit: __emit }) {

const props = __props;
const emits = __emit;

const appConfig = useAppConfig();
const ui = computed(() => tv({ extend: tv(theme), ...appConfig.ui?.form || {} }));
const formId = props.id ?? useId();
const bus = useEventBus(`form-${formId}`);
const parentBus = props.nested === true && inject(
  formBusInjectionKey,
  void 0
);
const parentState = props.nested === true ? inject(formStateInjectionKey, void 0) : void 0;
const state = computed(() => {
  if (parentState?.value) {
    return props.name ? getAtPath(parentState.value, props.name) : parentState.value;
  }
  return props.state;
});
provide(formBusInjectionKey, bus);
provide(formStateInjectionKey, state);
const nestedForms = ref(/* @__PURE__ */ new Map());
onMounted(async () => {
  if (parentBus) {
    await nextTick();
    parentBus.emit({ type: "attach", validate: _validate, formId, name: props.name, api });
  }
});
onUnmounted(() => {
  bus.reset();
  if (parentBus) {
    parentBus.emit({ type: "detach", formId });
  }
});
onMounted(async () => {
  bus.on(async (event) => {
    if (event.type === "attach") {
      nestedForms.value.set(event.formId, { validate: event.validate, name: event.name, api: event.api });
    } else if (event.type === "detach") {
      nestedForms.value.delete(event.formId);
    } else if (props.validateOn?.includes(event.type) && !loading.value) {
      if (event.type !== "input") {
        await _validate({ name: event.name, silent: true, nested: false });
      } else if (event.eager || blurredFields.has(event.name)) {
        await _validate({ name: event.name, silent: true, nested: false });
      }
    }
    if (event.type === "blur") {
      blurredFields.add(event.name);
    }
    if (event.type === "change" || event.type === "input" || event.type === "blur" || event.type === "focus") {
      touchedFields.add(event.name);
    }
    if (event.type === "change" || event.type === "input") {
      dirtyFields.add(event.name);
    }
  });
});
const errors = ref([]);
provide(formErrorsInjectionKey, errors);
const inputs = ref({});
provide(formInputsInjectionKey, inputs);
const dirtyFields = reactive(/* @__PURE__ */ new Set());
const touchedFields = reactive(/* @__PURE__ */ new Set());
const blurredFields = reactive(/* @__PURE__ */ new Set());
function resolveErrorIds(errs) {
  return errs.map((err) => ({
    ...err,
    id: err?.name ? inputs.value[err.name]?.id : void 0
  }));
}
const transformedState = ref(null);
async function getErrors() {
  let errs = props.validate ? await props.validate(state.value) ?? [] : [];
  if (props.schema) {
    const { errors: errors2, result } = await validateSchema(state.value, props.schema);
    if (errors2) {
      errs = errs.concat(errors2);
    } else {
      transformedState.value = result;
    }
  }
  return resolveErrorIds(errs);
}
async function _validate(opts = { silent: false, nested: false, transform: false }) {
  const names = opts.name && !Array.isArray(opts.name) ? [opts.name] : opts.name;
  let nestedResults = [];
  let nestedErrors = [];
  if (!names && opts.nested) {
    const validations = Array.from(nestedForms.value.values()).map(
      (form) => validateNestedForm(form, opts)
    );
    const results = await Promise.all(validations);
    nestedErrors = results.filter((r) => r.error).flatMap((r) => r.error.errors.map((e) => addFormPath(e, r.name)));
    nestedResults = results.filter((r) => r.output !== void 0);
  }
  const currentErrors = await getErrors();
  const allErrors = [...currentErrors, ...nestedErrors];
  if (names) {
    errors.value = filterErrorsByNames(allErrors, names);
  } else {
    errors.value = allErrors;
  }
  if (errors.value?.length) {
    if (opts.silent) return false;
    throw new FormValidationException(formId, errors.value);
  }
  if (opts.transform) {
    nestedResults.forEach((result) => {
      if (result.name) {
        setAtPath(transformedState.value, result.name, result.output);
      } else {
        Object.assign(transformedState.value, result.output);
      }
    });
    return transformedState.value ?? state.value;
  }
  return state.value;
}
const loading = ref(false);
provide(formLoadingInjectionKey, readonly(loading));
async function onSubmitWrapper(payload) {
  loading.value = props.loadingAuto && true;
  const event = payload;
  try {
    event.data = await _validate({ nested: true, transform: props.transform });
    await props.onSubmit?.(event);
    dirtyFields.clear();
  } catch (error) {
    if (!(error instanceof FormValidationException)) {
      throw error;
    }
    const errorEvent = {
      ...event,
      errors: error.errors
    };
    emits("error", errorEvent);
  } finally {
    loading.value = false;
  }
}
const disabled = computed(() => props.disabled || loading.value);
provide(formOptionsInjectionKey, computed(() => ({
  disabled: disabled.value,
  validateOnInputDelay: props.validateOnInputDelay
})));
async function validateNestedForm(form, opts) {
  try {
    const result = await form.validate({ ...opts, silent: false });
    return { name: form.name, output: result };
  } catch (error) {
    if (!(error instanceof FormValidationException)) throw error;
    return { name: form.name, error };
  }
}
function addFormPath(error, formPath) {
  if (!formPath || !error.name) return error;
  return { ...error, name: formPath + "." + error.name };
}
function stripFormPath(error, formPath) {
  const prefix = formPath + ".";
  const name = error?.name?.startsWith(prefix) ? error.name.substring(prefix.length) : error.name;
  return { ...error, name };
}
function filterFormErrors(errors2, formPath) {
  if (!formPath) return errors2;
  return errors2.filter((e) => e?.name?.startsWith(formPath + ".")).map((e) => stripFormPath(e, formPath));
}
function getFormErrors(form) {
  return form.api.getErrors().map(
    (e) => form.name ? { ...e, name: form.name + "." + e.name } : e
  );
}
function matchesTarget(target, path) {
  if (!target || !path) return true;
  if (target instanceof RegExp) return target.test(path);
  return path === target || typeof target === "string" && target.startsWith(path + ".");
}
function getNestedTarget(target, formPath) {
  if (!target || target instanceof RegExp) return target;
  if (formPath === target) return void 0;
  if (typeof target === "string" && target.startsWith(formPath + ".")) {
    return target.substring(formPath.length + 1);
  }
  return target;
}
function filterErrorsByNames(allErrors, names) {
  const nameSet = new Set(names);
  const patterns = names.map((name) => inputs.value?.[name]?.pattern).filter(Boolean);
  const matchesNames = (error) => {
    if (!error.name) return false;
    if (nameSet.has(error.name)) return true;
    return patterns.some((pattern) => pattern.test(error.name));
  };
  const keepErrors = errors.value.filter((error) => !matchesNames(error));
  const newErrors = allErrors.filter(matchesNames);
  return [...keepErrors, ...newErrors];
}
function filterErrorsByTarget(currentErrors, target) {
  return currentErrors.filter(
    (err) => target instanceof RegExp ? !(err.name && target.test(err.name)) : !err.name || err.name !== target
  );
}
function isLocalError(error) {
  return !error.name || !!inputs.value[error.name];
}
const api = {
  validate: _validate,
  errors,
  setErrors(errs, name) {
    const localErrors = resolveErrorIds(errs.filter(isLocalError));
    const nestedErrors = [];
    for (const form of nestedForms.value.values()) {
      if (matchesTarget(name, form.name)) {
        const formErrors = filterFormErrors(errs, form.name);
        form.api.setErrors(formErrors, getNestedTarget(name, form.name || ""));
        nestedErrors.push(...getFormErrors(form));
      }
    }
    if (name) {
      const keepErrors = filterErrorsByTarget(errors.value, name);
      errors.value = [...keepErrors, ...localErrors, ...nestedErrors];
    } else {
      errors.value = [...localErrors, ...nestedErrors];
    }
  },
  async submit() {
    await onSubmitWrapper(new Event("submit"));
  },
  getErrors(name) {
    if (!name) return errors.value;
    return errors.value.filter(
      (err) => name instanceof RegExp ? err.name && name.test(err.name) : err.name === name
    );
  },
  clear(name) {
    const localErrors = name ? errors.value.filter(
      (err) => isLocalError(err) && (name instanceof RegExp ? !(err.name && name.test(err.name)) : err.name !== name)
    ) : [];
    const nestedErrors = [];
    for (const form of nestedForms.value.values()) {
      if (matchesTarget(name, form.name)) form.api.clear();
      nestedErrors.push(...getFormErrors(form));
    }
    errors.value = [...localErrors, ...nestedErrors];
  },
  disabled,
  loading,
  dirty: computed(() => !!dirtyFields.size),
  dirtyFields: readonly(dirtyFields),
  blurredFields: readonly(blurredFields),
  touchedFields: readonly(touchedFields)
};
__expose(api);

return (_ctx, _push, _parent, _attrs) => {
  ssrRenderVNode(_push, createVNode(resolveDynamicComponent(unref(parentBus) ? 'div' : 'form'), mergeProps({
    id: unref(formId),
    class: ui.value({ class: props.class }),
    onSubmit: onSubmitWrapper
  }, _attrs), {
    default: withCtx((_, _push, _parent, _scopeId) => {
      if (_push) {
        ssrRenderSlot(_ctx.$slots, "default", {
          errors: errors.value,
          loading: loading.value
        }, null, _push, _parent, _scopeId);
      } else {
        return [
          renderSlot(_ctx.$slots, "default", {
            errors: errors.value,
            loading: loading.value
          })
        ]
      }
    }),
    _: 3 /* FORWARDED */
  }), _parent);
}
}

};
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext()
  ;(ssrContext.modules || (ssrContext.modules = new Set())).add("node_modules/@nuxt/ui/dist/runtime/components/Form.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : undefined
};

const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "CategoryFormModal",
  __ssrInlineRender: true,
  props: {
    open: { type: Boolean },
    category: {},
    parentCategories: {},
    isSubmitting: { type: Boolean }
  },
  emits: ["update:open", "submit"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const { isValidImageUrl } = useImageHelper();
    const form = ref({
      name: "",
      description: "",
      parentId: null,
      isActive: true,
      image: null
    });
    const imagePreview = ref(null);
    const fileInputRef = ref(null);
    const isEditing = computed(() => !!props.category);
    const modalTitle = computed(() => isEditing.value ? "Edit Kategori" : "Tambah Kategori Baru");
    const parentOptions = computed(() => {
      const options = [
        { label: "Tidak ada (Kategori Utama)", value: null }
      ];
      props.parentCategories.forEach((cat) => {
        if (!props.category || cat.id !== props.category.id) {
          options.push({ label: cat.name, value: cat.id });
        }
      });
      return options;
    });
    watch(
      () => [props.open, props.category],
      () => {
        if (props.open) {
          if (props.category) {
            form.value = {
              name: props.category.name,
              description: props.category.description || "",
              parentId: props.category.parentId,
              isActive: props.category.isActive,
              image: null
            };
            imagePreview.value = isValidImageUrl(props.category.image) ? props.category.image : null;
          } else {
            form.value = {
              name: "",
              description: "",
              parentId: null,
              isActive: true,
              image: null
            };
            imagePreview.value = null;
          }
        }
      },
      { immediate: true }
    );
    const handleFileSelect = (event) => {
      const input = event.target;
      const file = input.files?.[0];
      if (file) {
        form.value.image = file;
        const reader = new FileReader();
        reader.onload = (e) => {
          imagePreview.value = e.target?.result;
        };
        reader.readAsDataURL(file);
      }
    };
    const triggerFileInput = () => {
      fileInputRef.value?.click();
    };
    const removeImage = () => {
      form.value.image = null;
      imagePreview.value = null;
      if (fileInputRef.value) {
        fileInputRef.value.value = "";
      }
    };
    const handleSubmit = () => {
      if (!form.value.name.trim()) {
        return;
      }
      const formData = new FormData();
      formData.append("name", form.value.name.trim());
      formData.append("description", form.value.description.trim());
      formData.append("parentId", form.value.parentId?.toString() || "");
      formData.append("isActive", form.value.isActive ? "true" : "false");
      if (form.value.image) {
        formData.append("image", form.value.image);
      }
      emit("submit", formData);
    };
    const closeModal = () => {
      emit("update:open", false);
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UModal = _sfc_main$c;
      const _component_UIcon = _sfc_main$9;
      const _component_UForm = _sfc_main$3;
      const _component_UInput = _sfc_main$b;
      const _component_USelect = _sfc_main$d;
      const _component_UTextarea = _sfc_main$e;
      const _component_UButton = _sfc_main$8;
      const _component_UCheckbox = _sfc_main$f;
      _push(ssrRenderComponent(_component_UModal, mergeProps({
        open: __props.open,
        "onUpdate:open": closeModal,
        title: modalTitle.value,
        description: "Isi informasi kategori produk"
      }, _attrs), {
        content: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="p-6"${_scopeId}><!-- Header --><div class="flex items-center gap-4 mb-6"${_scopeId}><div class="w-12 h-12 rounded-full bg-violet-100 dark:bg-violet-900/30 flex items-center justify-center"${_scopeId}>`);
            _push2(ssrRenderComponent(_component_UIcon, {
              name: isEditing.value ? "i-heroicons-pencil-square" : "i-heroicons-folder-plus",
              class: "w-6 h-6 text-violet-500"
            }, null, _parent2, _scopeId));
            _push2(`</div><div${_scopeId}><h3 class="text-lg font-semibold text-slate-900 dark:text-white"${_scopeId}>${ssrInterpolate(modalTitle.value)}</h3><p class="text-sm text-slate-500 dark:text-slate-400"${_scopeId}>${ssrInterpolate(isEditing.value ? "Perbarui informasi kategori" : "Tambahkan kategori baru untuk produk")}</p></div></div><!-- Form -->`);
            _push2(ssrRenderComponent(_component_UForm, {
              onSubmit: handleSubmit,
              class: "space-y-4"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<!-- Name --><div${_scopeId2}><label class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1"${_scopeId2}> Nama Kategori <span class="text-red-500"${_scopeId2}>*</span></label>`);
                  _push3(ssrRenderComponent(_component_UInput, {
                    modelValue: form.value.name,
                    "onUpdate:modelValue": ($event) => form.value.name = $event,
                    placeholder: "Masukkan nama kategori",
                    disabled: __props.isSubmitting,
                    class: "w-full"
                  }, null, _parent3, _scopeId2));
                  _push3(`</div><!-- Parent Category --><div${_scopeId2}><label class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1"${_scopeId2}> Kategori Induk </label>`);
                  _push3(ssrRenderComponent(_component_USelect, {
                    modelValue: form.value.parentId,
                    "onUpdate:modelValue": ($event) => form.value.parentId = $event,
                    items: parentOptions.value,
                    "value-key": "value",
                    placeholder: "Pilih kategori induk",
                    disabled: __props.isSubmitting,
                    class: "w-full"
                  }, null, _parent3, _scopeId2));
                  _push3(`<p class="text-xs text-slate-500 dark:text-slate-400 mt-1"${_scopeId2}> Kosongkan untuk membuat kategori utama </p></div><!-- Description --><div${_scopeId2}><label class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1"${_scopeId2}> Deskripsi </label>`);
                  _push3(ssrRenderComponent(_component_UTextarea, {
                    modelValue: form.value.description,
                    "onUpdate:modelValue": ($event) => form.value.description = $event,
                    placeholder: "Deskripsi singkat kategori (opsional)",
                    rows: 3,
                    disabled: __props.isSubmitting,
                    class: "w-full"
                  }, null, _parent3, _scopeId2));
                  _push3(`</div><!-- Image Upload --><div${_scopeId2}><label class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1"${_scopeId2}> Gambar Kategori </label><input type="file" accept="image/jpeg,image/png,image/webp,image/gif" class="hidden"${_scopeId2}><!-- Preview -->`);
                  if (imagePreview.value) {
                    _push3(`<div class="relative w-32 h-32 mb-3"${_scopeId2}><img${ssrRenderAttr("src", imagePreview.value)} alt="Preview" class="w-full h-full object-cover rounded-lg border border-slate-200 dark:border-slate-700"${_scopeId2}><button type="button" class="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-red-500 text-white flex items-center justify-center hover:bg-red-600 transition-colors"${_scopeId2}>`);
                    _push3(ssrRenderComponent(_component_UIcon, {
                      name: "i-heroicons-x-mark",
                      class: "w-4 h-4"
                    }, null, _parent3, _scopeId2));
                    _push3(`</button></div>`);
                  } else {
                    _push3(`<!---->`);
                  }
                  _push3(`<!-- Upload Button -->`);
                  _push3(ssrRenderComponent(_component_UButton, {
                    type: "button",
                    color: "neutral",
                    variant: "outline",
                    onClick: triggerFileInput,
                    disabled: __props.isSubmitting
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_UIcon, {
                          name: "i-heroicons-photo",
                          class: "w-4 h-4 mr-2"
                        }, null, _parent4, _scopeId3));
                        _push4(` ${ssrInterpolate(imagePreview.value ? "Ganti Gambar" : "Pilih Gambar")}`);
                      } else {
                        return [
                          createVNode(_component_UIcon, {
                            name: "i-heroicons-photo",
                            class: "w-4 h-4 mr-2"
                          }),
                          createTextVNode(
                            " " + toDisplayString(imagePreview.value ? "Ganti Gambar" : "Pilih Gambar"),
                            1
                            /* TEXT */
                          )
                        ];
                      }
                    }),
                    _: 1
                    /* STABLE */
                  }, _parent3, _scopeId2));
                  _push3(`<p class="text-xs text-slate-500 dark:text-slate-400 mt-1"${_scopeId2}> Format: JPG, PNG, WebP, GIF. Maks. 2MB </p></div><!-- Active Status --><div class="flex items-center gap-3"${_scopeId2}>`);
                  _push3(ssrRenderComponent(_component_UCheckbox, {
                    modelValue: form.value.isActive,
                    "onUpdate:modelValue": ($event) => form.value.isActive = $event,
                    disabled: __props.isSubmitting
                  }, null, _parent3, _scopeId2));
                  _push3(`<label class="text-sm text-slate-700 dark:text-slate-300"${_scopeId2}> Kategori aktif </label></div><!-- Actions --><div class="flex justify-end gap-3 pt-4 border-t border-slate-200 dark:border-slate-700"${_scopeId2}>`);
                  _push3(ssrRenderComponent(_component_UButton, {
                    type: "button",
                    color: "neutral",
                    variant: "outline",
                    onClick: closeModal,
                    disabled: __props.isSubmitting
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(` Batal `);
                      } else {
                        return [
                          createTextVNode(" Batal ")
                        ];
                      }
                    }),
                    _: 1
                    /* STABLE */
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_UButton, {
                    type: "submit",
                    color: "primary",
                    loading: __props.isSubmitting,
                    disabled: !form.value.name.trim()
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`${ssrInterpolate(isEditing.value ? "Simpan Perubahan" : "Tambah Kategori")}`);
                      } else {
                        return [
                          createTextVNode(
                            toDisplayString(isEditing.value ? "Simpan Perubahan" : "Tambah Kategori"),
                            1
                            /* TEXT */
                          )
                        ];
                      }
                    }),
                    _: 1
                    /* STABLE */
                  }, _parent3, _scopeId2));
                  _push3(`</div>`);
                } else {
                  return [
                    createCommentVNode(" Name "),
                    createVNode("div", null, [
                      createVNode("label", { class: "block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1" }, [
                        createTextVNode(" Nama Kategori "),
                        createVNode("span", { class: "text-red-500" }, "*")
                      ]),
                      createVNode(_component_UInput, {
                        modelValue: form.value.name,
                        "onUpdate:modelValue": ($event) => form.value.name = $event,
                        placeholder: "Masukkan nama kategori",
                        disabled: __props.isSubmitting,
                        class: "w-full"
                      }, null, 8, ["modelValue", "onUpdate:modelValue", "disabled"])
                    ]),
                    createCommentVNode(" Parent Category "),
                    createVNode("div", null, [
                      createVNode("label", { class: "block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1" }, " Kategori Induk "),
                      createVNode(_component_USelect, {
                        modelValue: form.value.parentId,
                        "onUpdate:modelValue": ($event) => form.value.parentId = $event,
                        items: parentOptions.value,
                        "value-key": "value",
                        placeholder: "Pilih kategori induk",
                        disabled: __props.isSubmitting,
                        class: "w-full"
                      }, null, 8, ["modelValue", "onUpdate:modelValue", "items", "disabled"]),
                      createVNode("p", { class: "text-xs text-slate-500 dark:text-slate-400 mt-1" }, " Kosongkan untuk membuat kategori utama ")
                    ]),
                    createCommentVNode(" Description "),
                    createVNode("div", null, [
                      createVNode("label", { class: "block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1" }, " Deskripsi "),
                      createVNode(_component_UTextarea, {
                        modelValue: form.value.description,
                        "onUpdate:modelValue": ($event) => form.value.description = $event,
                        placeholder: "Deskripsi singkat kategori (opsional)",
                        rows: 3,
                        disabled: __props.isSubmitting,
                        class: "w-full"
                      }, null, 8, ["modelValue", "onUpdate:modelValue", "disabled"])
                    ]),
                    createCommentVNode(" Image Upload "),
                    createVNode("div", null, [
                      createVNode("label", { class: "block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1" }, " Gambar Kategori "),
                      createVNode(
                        "input",
                        {
                          ref_key: "fileInputRef",
                          ref: fileInputRef,
                          type: "file",
                          accept: "image/jpeg,image/png,image/webp,image/gif",
                          class: "hidden",
                          onChange: handleFileSelect
                        },
                        null,
                        544
                        /* NEED_HYDRATION, NEED_PATCH */
                      ),
                      createCommentVNode(" Preview "),
                      imagePreview.value ? (openBlock(), createBlock("div", {
                        key: 0,
                        class: "relative w-32 h-32 mb-3"
                      }, [
                        createVNode("img", {
                          src: imagePreview.value,
                          alt: "Preview",
                          class: "w-full h-full object-cover rounded-lg border border-slate-200 dark:border-slate-700"
                        }, null, 8, ["src"]),
                        createVNode("button", {
                          type: "button",
                          class: "absolute -top-2 -right-2 w-6 h-6 rounded-full bg-red-500 text-white flex items-center justify-center hover:bg-red-600 transition-colors",
                          onClick: removeImage
                        }, [
                          createVNode(_component_UIcon, {
                            name: "i-heroicons-x-mark",
                            class: "w-4 h-4"
                          })
                        ])
                      ])) : createCommentVNode("v-if", true),
                      createCommentVNode(" Upload Button "),
                      createVNode(_component_UButton, {
                        type: "button",
                        color: "neutral",
                        variant: "outline",
                        onClick: triggerFileInput,
                        disabled: __props.isSubmitting
                      }, {
                        default: withCtx(() => [
                          createVNode(_component_UIcon, {
                            name: "i-heroicons-photo",
                            class: "w-4 h-4 mr-2"
                          }),
                          createTextVNode(
                            " " + toDisplayString(imagePreview.value ? "Ganti Gambar" : "Pilih Gambar"),
                            1
                            /* TEXT */
                          )
                        ]),
                        _: 1
                        /* STABLE */
                      }, 8, ["disabled"]),
                      createVNode("p", { class: "text-xs text-slate-500 dark:text-slate-400 mt-1" }, " Format: JPG, PNG, WebP, GIF. Maks. 2MB ")
                    ]),
                    createCommentVNode(" Active Status "),
                    createVNode("div", { class: "flex items-center gap-3" }, [
                      createVNode(_component_UCheckbox, {
                        modelValue: form.value.isActive,
                        "onUpdate:modelValue": ($event) => form.value.isActive = $event,
                        disabled: __props.isSubmitting
                      }, null, 8, ["modelValue", "onUpdate:modelValue", "disabled"]),
                      createVNode("label", { class: "text-sm text-slate-700 dark:text-slate-300" }, " Kategori aktif ")
                    ]),
                    createCommentVNode(" Actions "),
                    createVNode("div", { class: "flex justify-end gap-3 pt-4 border-t border-slate-200 dark:border-slate-700" }, [
                      createVNode(_component_UButton, {
                        type: "button",
                        color: "neutral",
                        variant: "outline",
                        onClick: closeModal,
                        disabled: __props.isSubmitting
                      }, {
                        default: withCtx(() => [
                          createTextVNode(" Batal ")
                        ]),
                        _: 1
                        /* STABLE */
                      }, 8, ["disabled"]),
                      createVNode(_component_UButton, {
                        type: "submit",
                        color: "primary",
                        loading: __props.isSubmitting,
                        disabled: !form.value.name.trim()
                      }, {
                        default: withCtx(() => [
                          createTextVNode(
                            toDisplayString(isEditing.value ? "Simpan Perubahan" : "Tambah Kategori"),
                            1
                            /* TEXT */
                          )
                        ]),
                        _: 1
                        /* STABLE */
                      }, 8, ["loading", "disabled"])
                    ])
                  ];
                }
              }),
              _: 1
              /* STABLE */
            }, _parent2, _scopeId));
            _push2(`</div>`);
          } else {
            return [
              createVNode("div", { class: "p-6" }, [
                createCommentVNode(" Header "),
                createVNode("div", { class: "flex items-center gap-4 mb-6" }, [
                  createVNode("div", { class: "w-12 h-12 rounded-full bg-violet-100 dark:bg-violet-900/30 flex items-center justify-center" }, [
                    createVNode(_component_UIcon, {
                      name: isEditing.value ? "i-heroicons-pencil-square" : "i-heroicons-folder-plus",
                      class: "w-6 h-6 text-violet-500"
                    }, null, 8, ["name"])
                  ]),
                  createVNode("div", null, [
                    createVNode(
                      "h3",
                      { class: "text-lg font-semibold text-slate-900 dark:text-white" },
                      toDisplayString(modalTitle.value),
                      1
                      /* TEXT */
                    ),
                    createVNode(
                      "p",
                      { class: "text-sm text-slate-500 dark:text-slate-400" },
                      toDisplayString(isEditing.value ? "Perbarui informasi kategori" : "Tambahkan kategori baru untuk produk"),
                      1
                      /* TEXT */
                    )
                  ])
                ]),
                createCommentVNode(" Form "),
                createVNode(_component_UForm, {
                  onSubmit: withModifiers(handleSubmit, ["prevent"]),
                  class: "space-y-4"
                }, {
                  default: withCtx(() => [
                    createCommentVNode(" Name "),
                    createVNode("div", null, [
                      createVNode("label", { class: "block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1" }, [
                        createTextVNode(" Nama Kategori "),
                        createVNode("span", { class: "text-red-500" }, "*")
                      ]),
                      createVNode(_component_UInput, {
                        modelValue: form.value.name,
                        "onUpdate:modelValue": ($event) => form.value.name = $event,
                        placeholder: "Masukkan nama kategori",
                        disabled: __props.isSubmitting,
                        class: "w-full"
                      }, null, 8, ["modelValue", "onUpdate:modelValue", "disabled"])
                    ]),
                    createCommentVNode(" Parent Category "),
                    createVNode("div", null, [
                      createVNode("label", { class: "block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1" }, " Kategori Induk "),
                      createVNode(_component_USelect, {
                        modelValue: form.value.parentId,
                        "onUpdate:modelValue": ($event) => form.value.parentId = $event,
                        items: parentOptions.value,
                        "value-key": "value",
                        placeholder: "Pilih kategori induk",
                        disabled: __props.isSubmitting,
                        class: "w-full"
                      }, null, 8, ["modelValue", "onUpdate:modelValue", "items", "disabled"]),
                      createVNode("p", { class: "text-xs text-slate-500 dark:text-slate-400 mt-1" }, " Kosongkan untuk membuat kategori utama ")
                    ]),
                    createCommentVNode(" Description "),
                    createVNode("div", null, [
                      createVNode("label", { class: "block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1" }, " Deskripsi "),
                      createVNode(_component_UTextarea, {
                        modelValue: form.value.description,
                        "onUpdate:modelValue": ($event) => form.value.description = $event,
                        placeholder: "Deskripsi singkat kategori (opsional)",
                        rows: 3,
                        disabled: __props.isSubmitting,
                        class: "w-full"
                      }, null, 8, ["modelValue", "onUpdate:modelValue", "disabled"])
                    ]),
                    createCommentVNode(" Image Upload "),
                    createVNode("div", null, [
                      createVNode("label", { class: "block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1" }, " Gambar Kategori "),
                      createVNode(
                        "input",
                        {
                          ref_key: "fileInputRef",
                          ref: fileInputRef,
                          type: "file",
                          accept: "image/jpeg,image/png,image/webp,image/gif",
                          class: "hidden",
                          onChange: handleFileSelect
                        },
                        null,
                        544
                        /* NEED_HYDRATION, NEED_PATCH */
                      ),
                      createCommentVNode(" Preview "),
                      imagePreview.value ? (openBlock(), createBlock("div", {
                        key: 0,
                        class: "relative w-32 h-32 mb-3"
                      }, [
                        createVNode("img", {
                          src: imagePreview.value,
                          alt: "Preview",
                          class: "w-full h-full object-cover rounded-lg border border-slate-200 dark:border-slate-700"
                        }, null, 8, ["src"]),
                        createVNode("button", {
                          type: "button",
                          class: "absolute -top-2 -right-2 w-6 h-6 rounded-full bg-red-500 text-white flex items-center justify-center hover:bg-red-600 transition-colors",
                          onClick: removeImage
                        }, [
                          createVNode(_component_UIcon, {
                            name: "i-heroicons-x-mark",
                            class: "w-4 h-4"
                          })
                        ])
                      ])) : createCommentVNode("v-if", true),
                      createCommentVNode(" Upload Button "),
                      createVNode(_component_UButton, {
                        type: "button",
                        color: "neutral",
                        variant: "outline",
                        onClick: triggerFileInput,
                        disabled: __props.isSubmitting
                      }, {
                        default: withCtx(() => [
                          createVNode(_component_UIcon, {
                            name: "i-heroicons-photo",
                            class: "w-4 h-4 mr-2"
                          }),
                          createTextVNode(
                            " " + toDisplayString(imagePreview.value ? "Ganti Gambar" : "Pilih Gambar"),
                            1
                            /* TEXT */
                          )
                        ]),
                        _: 1
                        /* STABLE */
                      }, 8, ["disabled"]),
                      createVNode("p", { class: "text-xs text-slate-500 dark:text-slate-400 mt-1" }, " Format: JPG, PNG, WebP, GIF. Maks. 2MB ")
                    ]),
                    createCommentVNode(" Active Status "),
                    createVNode("div", { class: "flex items-center gap-3" }, [
                      createVNode(_component_UCheckbox, {
                        modelValue: form.value.isActive,
                        "onUpdate:modelValue": ($event) => form.value.isActive = $event,
                        disabled: __props.isSubmitting
                      }, null, 8, ["modelValue", "onUpdate:modelValue", "disabled"]),
                      createVNode("label", { class: "text-sm text-slate-700 dark:text-slate-300" }, " Kategori aktif ")
                    ]),
                    createCommentVNode(" Actions "),
                    createVNode("div", { class: "flex justify-end gap-3 pt-4 border-t border-slate-200 dark:border-slate-700" }, [
                      createVNode(_component_UButton, {
                        type: "button",
                        color: "neutral",
                        variant: "outline",
                        onClick: closeModal,
                        disabled: __props.isSubmitting
                      }, {
                        default: withCtx(() => [
                          createTextVNode(" Batal ")
                        ]),
                        _: 1
                        /* STABLE */
                      }, 8, ["disabled"]),
                      createVNode(_component_UButton, {
                        type: "submit",
                        color: "primary",
                        loading: __props.isSubmitting,
                        disabled: !form.value.name.trim()
                      }, {
                        default: withCtx(() => [
                          createTextVNode(
                            toDisplayString(isEditing.value ? "Simpan Perubahan" : "Tambah Kategori"),
                            1
                            /* TEXT */
                          )
                        ]),
                        _: 1
                        /* STABLE */
                      }, 8, ["loading", "disabled"])
                    ])
                  ]),
                  _: 1
                  /* STABLE */
                })
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

const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("inertia/components/admin/products/categories/CategoryFormModal.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};

const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "CategoryDeleteModal",
  __ssrInlineRender: true,
  props: {
    open: { type: Boolean },
    category: {},
    isDeleting: { type: Boolean }
  },
  emits: ["update:open", "confirm"],
  setup(__props, { emit: __emit }) {
    const emit = __emit;
    const closeModal = () => {
      emit("update:open", false);
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UModal = _sfc_main$c;
      const _component_UIcon = _sfc_main$9;
      const _component_UButton = _sfc_main$8;
      _push(ssrRenderComponent(_component_UModal, mergeProps({
        open: __props.open,
        "onUpdate:open": closeModal,
        title: "Hapus Kategori",
        description: "Konfirmasi penghapusan kategori"
      }, _attrs), {
        content: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="p-6"${_scopeId}><!-- Header --><div class="flex items-center gap-4 mb-4"${_scopeId}><div class="w-12 h-12 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center"${_scopeId}>`);
            _push2(ssrRenderComponent(_component_UIcon, {
              name: "i-heroicons-trash",
              class: "w-6 h-6 text-red-500"
            }, null, _parent2, _scopeId));
            _push2(`</div><div${_scopeId}><h3 class="text-lg font-semibold text-slate-900 dark:text-white"${_scopeId}>Hapus Kategori</h3><p class="text-sm text-slate-500 dark:text-slate-400"${_scopeId}> Tindakan ini tidak dapat dibatalkan </p></div></div><!-- Content -->`);
            if (__props.category) {
              _push2(`<div class="mb-6"${_scopeId}><p class="text-slate-600 dark:text-slate-400"${_scopeId}> Apakah Anda yakin ingin menghapus kategori <strong class="text-slate-900 dark:text-white"${_scopeId}>&quot;${ssrInterpolate(__props.category.name)}&quot;</strong>? </p>`);
              if (__props.category.children && __props.category.children.length > 0) {
                _push2(`<div class="mt-3 p-3 bg-amber-50 dark:bg-amber-900/20 rounded-lg border border-amber-200 dark:border-amber-800"${_scopeId}><div class="flex items-start gap-2"${_scopeId}>`);
                _push2(ssrRenderComponent(_component_UIcon, {
                  name: "i-heroicons-exclamation-triangle",
                  class: "w-5 h-5 text-amber-500 shrink-0 mt-0.5"
                }, null, _parent2, _scopeId));
                _push2(`<div${_scopeId}><p class="text-sm font-medium text-amber-800 dark:text-amber-200"${_scopeId}> Kategori ini memiliki ${ssrInterpolate(__props.category.children.length)} sub-kategori </p><p class="text-xs text-amber-600 dark:text-amber-400 mt-1"${_scopeId}> Hapus semua sub-kategori terlebih dahulu sebelum menghapus kategori ini </p></div></div></div>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`<!-- Actions --><div class="flex justify-end gap-3"${_scopeId}>`);
            _push2(ssrRenderComponent(_component_UButton, {
              color: "neutral",
              variant: "outline",
              onClick: closeModal,
              disabled: __props.isDeleting
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
              onClick: ($event) => emit("confirm"),
              loading: __props.isDeleting,
              disabled: __props.category?.children && __props.category.children.length > 0
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Hapus Kategori `);
                } else {
                  return [
                    createTextVNode(" Hapus Kategori ")
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
                createCommentVNode(" Header "),
                createVNode("div", { class: "flex items-center gap-4 mb-4" }, [
                  createVNode("div", { class: "w-12 h-12 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center" }, [
                    createVNode(_component_UIcon, {
                      name: "i-heroicons-trash",
                      class: "w-6 h-6 text-red-500"
                    })
                  ]),
                  createVNode("div", null, [
                    createVNode("h3", { class: "text-lg font-semibold text-slate-900 dark:text-white" }, "Hapus Kategori"),
                    createVNode("p", { class: "text-sm text-slate-500 dark:text-slate-400" }, " Tindakan ini tidak dapat dibatalkan ")
                  ])
                ]),
                createCommentVNode(" Content "),
                __props.category ? (openBlock(), createBlock("div", {
                  key: 0,
                  class: "mb-6"
                }, [
                  createVNode("p", { class: "text-slate-600 dark:text-slate-400" }, [
                    createTextVNode(" Apakah Anda yakin ingin menghapus kategori "),
                    createVNode(
                      "strong",
                      { class: "text-slate-900 dark:text-white" },
                      '"' + toDisplayString(__props.category.name) + '"',
                      1
                      /* TEXT */
                    ),
                    createTextVNode("? ")
                  ]),
                  __props.category.children && __props.category.children.length > 0 ? (openBlock(), createBlock("div", {
                    key: 0,
                    class: "mt-3 p-3 bg-amber-50 dark:bg-amber-900/20 rounded-lg border border-amber-200 dark:border-amber-800"
                  }, [
                    createVNode("div", { class: "flex items-start gap-2" }, [
                      createVNode(_component_UIcon, {
                        name: "i-heroicons-exclamation-triangle",
                        class: "w-5 h-5 text-amber-500 shrink-0 mt-0.5"
                      }),
                      createVNode("div", null, [
                        createVNode(
                          "p",
                          { class: "text-sm font-medium text-amber-800 dark:text-amber-200" },
                          " Kategori ini memiliki " + toDisplayString(__props.category.children.length) + " sub-kategori ",
                          1
                          /* TEXT */
                        ),
                        createVNode("p", { class: "text-xs text-amber-600 dark:text-amber-400 mt-1" }, " Hapus semua sub-kategori terlebih dahulu sebelum menghapus kategori ini ")
                      ])
                    ])
                  ])) : createCommentVNode("v-if", true)
                ])) : createCommentVNode("v-if", true),
                createCommentVNode(" Actions "),
                createVNode("div", { class: "flex justify-end gap-3" }, [
                  createVNode(_component_UButton, {
                    color: "neutral",
                    variant: "outline",
                    onClick: closeModal,
                    disabled: __props.isDeleting
                  }, {
                    default: withCtx(() => [
                      createTextVNode(" Batal ")
                    ]),
                    _: 1
                    /* STABLE */
                  }, 8, ["disabled"]),
                  createVNode(_component_UButton, {
                    color: "error",
                    onClick: ($event) => emit("confirm"),
                    loading: __props.isDeleting,
                    disabled: __props.category?.children && __props.category.children.length > 0
                  }, {
                    default: withCtx(() => [
                      createTextVNode(" Hapus Kategori ")
                    ]),
                    _: 1
                    /* STABLE */
                  }, 8, ["onClick", "loading", "disabled"])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("inertia/components/admin/products/categories/CategoryDeleteModal.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};

const _sfc_main = /* @__PURE__ */ defineComponent({
  ...{
    layout: AdminLayout
  },
  __name: "categories",
  __ssrInlineRender: true,
  props: {
    categories: { default: () => [] },
    admin: { default: () => ({ id: 0, storeName: "", slug: "", status: "" }) }
  },
  setup(__props) {
    const props = __props;
    const showFormModal = ref(false);
    const showDeleteModal = ref(false);
    const selectedCategory = ref(null);
    const isSubmitting = ref(false);
    const isDeleting = ref(false);
    const stats = computed(() => {
      const mainCategories = props.categories.length;
      const subCategories = props.categories.reduce((sum, cat) => sum + cat.children.length, 0);
      const totalCategories = mainCategories + subCategories;
      let activeCategories = props.categories.filter((cat) => cat.isActive).length;
      props.categories.forEach((cat) => {
        activeCategories += cat.children.filter((child) => child.isActive).length;
      });
      return {
        totalCategories,
        mainCategories,
        subCategories,
        activeCategories
      };
    });
    const parentCategories = computed(() => {
      return props.categories.map((cat) => ({
        id: cat.id,
        name: cat.name
      }));
    });
    const handleAdd = () => {
      selectedCategory.value = null;
      showFormModal.value = true;
    };
    const handleEdit = (category) => {
      selectedCategory.value = category;
      showFormModal.value = true;
    };
    const handleDelete = (category) => {
      selectedCategory.value = category;
      showDeleteModal.value = true;
    };
    const handleFormSubmit = (formData) => {
      isSubmitting.value = true;
      const url = selectedCategory.value ? `/admin/products/categories/${selectedCategory.value.id}` : "/admin/products/categories";
      router.post(url, formData, {
        preserveScroll: true,
        onSuccess: () => {
          showFormModal.value = false;
          selectedCategory.value = null;
        },
        onFinish: () => {
          isSubmitting.value = false;
        }
      });
    };
    const handleDeleteConfirm = () => {
      if (!selectedCategory.value) return;
      isDeleting.value = true;
      router.delete(`/admin/products/categories/${selectedCategory.value.id}`, {
        preserveScroll: true,
        onSuccess: () => {
          showDeleteModal.value = false;
          selectedCategory.value = null;
        },
        onFinish: () => {
          isDeleting.value = false;
        }
      });
    };
    const handleToggleActive = (category) => {
      router.patch(`/admin/products/categories/${category.id}/toggle`, {}, {
        preserveScroll: true
      });
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "space-y-6" }, _attrs))}><!-- Page Header -->`);
      _push(ssrRenderComponent(unref(_sfc_main$7), {
        "store-name": __props.admin.storeName,
        onAdd: handleAdd
      }, null, _parent));
      _push(`<!-- Stats Cards -->`);
      _push(ssrRenderComponent(unref(_sfc_main$6), { stats: stats.value }, null, _parent));
      _push(`<!-- Categories List -->`);
      _push(ssrRenderComponent(unref(_sfc_main$4), {
        categories: __props.categories,
        onEdit: handleEdit,
        onDelete: handleDelete,
        onToggleActive: handleToggleActive
      }, null, _parent));
      _push(`<!-- Form Modal (Create/Edit) -->`);
      _push(ssrRenderComponent(unref(_sfc_main$2), {
        open: showFormModal.value,
        "onUpdate:open": ($event) => showFormModal.value = $event,
        category: selectedCategory.value,
        "parent-categories": parentCategories.value,
        "is-submitting": isSubmitting.value,
        onSubmit: handleFormSubmit
      }, null, _parent));
      _push(`<!-- Delete Modal -->`);
      _push(ssrRenderComponent(unref(_sfc_main$1), {
        open: showDeleteModal.value,
        "onUpdate:open": ($event) => showDeleteModal.value = $event,
        category: selectedCategory.value,
        "is-deleting": isDeleting.value,
        onConfirm: handleDeleteConfirm
      }, null, _parent));
      _push(`</div>`);
    };
  }
});

const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("inertia/pages/admin/products/categories.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
