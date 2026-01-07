import { a as _sfc_main$1 } from './Button-BBveOjhJ.js';
import { defineComponent, ref, mergeProps, unref, withCtx, createVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate } from 'vue/server-renderer';
import { Link, router } from '@inertiajs/vue3';
import { u as useToast } from './Badge-DaOjA2YD.js';
import { A as AdminLayout } from './admin-CGUULoJY.js';
import { _ as _sfc_main$2 } from './ProductForm-Bky92WAw.js';
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
import './Switch-BkqmHkc6.js';
import './Textarea-DTaAAeeU.js';
import './SelectMenu-CGTADs72.js';
import './FormField-BIqlRgyi.js';

const _sfc_main = /* @__PURE__ */ defineComponent({
  ...{
    layout: AdminLayout
  },
  __name: "edit",
  __ssrInlineRender: true,
  props: {
    product: {},
    categories: { default: () => [] },
    admin: { default: () => ({ id: 0, storeName: "", slug: "", status: "" }) }
  },
  setup(__props) {
    const props = __props;
    const toast = useToast();
    const formData = ref({
      name: props.product.name,
      slug: props.product.slug,
      sku: props.product.sku,
      categoryId: props.product.categoryId,
      description: props.product.description || "",
      specifications: parseSpecifications(props.product.specifications),
      price: Number(props.product.price) || 0,
      discountPrice: props.product.discountPrice ? Number(props.product.discountPrice) : null,
      stock: props.product.stock,
      minOrder: props.product.minOrder,
      maxOrder: props.product.maxOrder,
      weight: Number(props.product.weight) || 0,
      brand: props.product.brand || "",
      condition: props.product.condition,
      status: props.product.status,
      isFeatured: props.product.isFeatured,
      images: (props.product.images || []).map((img, index) => ({
        ...img,
        _uid: `existing-${img.id}`,
        isPrimary: img.isPrimary ?? false,
        sortOrder: img.sortOrder ?? index
      })),
      variants: props.product.variants || []
    });
    function parseSpecifications(specs) {
      if (!specs) return [];
      if (Array.isArray(specs)) return specs;
      if (typeof specs === "string") {
        try {
          const parsed = JSON.parse(specs);
          if (typeof parsed === "object" && !Array.isArray(parsed)) {
            return Object.entries(parsed).map(([key, value]) => ({
              key,
              value: String(value)
            }));
          }
        } catch {
          return [];
        }
      }
      if (typeof specs === "object" && !Array.isArray(specs)) {
        return Object.entries(specs).map(([key, value]) => ({
          key,
          value: String(value)
        }));
      }
      return [];
    }
    const errors = ref({});
    const isSubmitting = ref(false);
    const getToken = () => {
      if (typeof document === "undefined") return "";
      const match = document.cookie.match(/XSRF-TOKEN=([^;]+)/);
      return match ? decodeURIComponent(match[1]) : "";
    };
    const handleSubmit = async () => {
      isSubmitting.value = true;
      errors.value = {};
      try {
        const form = new FormData();
        form.append("name", formData.value.name);
        form.append("slug", formData.value.slug);
        form.append("sku", formData.value.sku);
        if (formData.value.categoryId) {
          form.append("categoryId", String(formData.value.categoryId));
        }
        form.append("description", formData.value.description || "");
        form.append("specifications", JSON.stringify(formData.value.specifications));
        form.append("price", String(formData.value.price));
        if (formData.value.discountPrice) {
          form.append("discountPrice", String(formData.value.discountPrice));
        }
        form.append("stock", String(formData.value.stock));
        form.append("minOrder", String(formData.value.minOrder || 1));
        if (formData.value.maxOrder) {
          form.append("maxOrder", String(formData.value.maxOrder));
        }
        form.append("weight", String(formData.value.weight));
        form.append("brand", formData.value.brand || "");
        form.append("condition", formData.value.condition);
        form.append("status", formData.value.status);
        form.append("isFeatured", String(formData.value.isFeatured));
        const existingImages = [];
        const deletedImageIds = [];
        const newImagesMeta = [];
        console.info("Processing images:", formData.value.images);
        for (const image of formData.value.images) {
          if (image.isDeleted && image.id) {
            deletedImageIds.push(image.id);
          } else if (image.file && !image.isDeleted) {
            form.append("newImages", image.file);
            newImagesMeta.push({
              isPrimary: image.isPrimary ?? false,
              sortOrder: image.sortOrder ?? 0
            });
          } else if (image.id && !image.isDeleted) {
            existingImages.push({
              id: image.id,
              url: image.url,
              isPrimary: image.isPrimary,
              sortOrder: image.sortOrder
            });
          }
        }
        console.info("existingImages:", existingImages);
        console.info("newImagesMeta:", newImagesMeta);
        console.info("deletedImageIds:", deletedImageIds);
        form.append("existingImages", JSON.stringify(existingImages));
        form.append("newImagesMeta", JSON.stringify(newImagesMeta));
        if (deletedImageIds.length > 0) {
          form.append("deletedImages", JSON.stringify(deletedImageIds));
        }
        const activeVariants = [];
        const deletedVariantIds = [];
        for (const variant of formData.value.variants) {
          if (variant.isActive === false && variant.id) {
            deletedVariantIds.push(variant.id);
          } else {
            activeVariants.push({
              id: variant.id,
              name: variant.name,
              value: variant.value,
              sku: variant.sku,
              priceAdjustment: variant.priceAdjustment,
              stock: variant.stock,
              isActive: variant.isActive
            });
          }
        }
        form.append("variants", JSON.stringify(activeVariants));
        if (deletedVariantIds.length > 0) {
          form.append("deletedVariantIds", JSON.stringify(deletedVariantIds));
        }
        const response = await fetch(`/admin/products/${props.product.id}`, {
          method: "PUT",
          headers: {
            "X-Requested-With": "XMLHttpRequest",
            "X-XSRF-TOKEN": getToken()
          },
          body: form
        });
        const data = await response.json();
        if (data.success) {
          toast.success("Berhasil", data.message);
          router.visit("/admin/products");
        } else {
          errors.value = data.errors || {};
          toast.error("Gagal", data.message);
        }
      } catch (error) {
        console.error("Submit error:", error);
        toast.error("Error", "Terjadi kesalahan saat memperbarui produk");
      } finally {
        isSubmitting.value = false;
      }
    };
    const handleCancel = () => {
      router.visit("/admin/products");
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UButton = _sfc_main$1;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "space-y-6" }, _attrs))}><!-- Page Header --><div class="flex items-center gap-4">`);
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
      _push(`<div><h1 class="text-2xl font-bold text-slate-900 dark:text-white">Edit Produk</h1><p class="text-sm text-slate-500 dark:text-slate-400 mt-1">${ssrInterpolate(__props.product.name)}</p></div></div><!-- Form -->`);
      _push(ssrRenderComponent(_sfc_main$2, {
        modelValue: formData.value,
        "onUpdate:modelValue": ($event) => formData.value = $event,
        categories: __props.categories,
        errors: errors.value,
        "is-submitting": isSubmitting.value,
        onSubmit: handleSubmit,
        onCancel: handleCancel
      }, null, _parent));
      _push(`</div>`);
    };
  }
});

const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("inertia/pages/admin/products/edit.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
