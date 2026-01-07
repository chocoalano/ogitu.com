import { a as _sfc_main$1 } from './Button-BBveOjhJ.js';
import { defineComponent, ref, onMounted, mergeProps, unref, withCtx, createVNode, useSSRContext } from 'vue';
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
  __name: "create",
  __ssrInlineRender: true,
  props: {
    categories: { default: () => [] },
    admin: { default: () => ({
      id: 0,
      storeName: "Admin",
      slug: "admin",
      status: "active"
    }) },
    isDev: { type: Boolean, default: false }
  },
  setup(__props) {
    const props = __props;
    const toast = useToast();
    const generateFakeData = () => {
      const productNames = [
        "Kemeja Batik Premium",
        "Celana Jeans Slim Fit",
        "Sepatu Sneakers Original",
        "Tas Ransel Laptop",
        "Jam Tangan Digital",
        "Kaos Polos Cotton Combed",
        "Jaket Hoodie Unisex",
        "Sandal Kulit Asli",
        "Topi Baseball Cap",
        "Dompet Kulit Pria"
      ];
      const brands = ["Nike", "Adidas", "Puma", "Zara", "H&M", "Uniqlo", "Local Brand", "Supreme", "Gucci", "Louis Vuitton"];
      const descriptions = [
        "Produk berkualitas tinggi dengan bahan premium yang nyaman digunakan sehari-hari. Cocok untuk berbagai acara formal maupun casual.",
        "Dibuat dengan material terbaik, produk ini memberikan kenyamanan maksimal dan tahan lama. Desain modern yang stylish.",
        "Koleksi terbaru dengan desain eksklusif. Sangat cocok untuk Anda yang ingin tampil beda dan percaya diri."
      ];
      const randomName = productNames[Math.floor(Math.random() * productNames.length)];
      const randomPrice = Math.floor(Math.random() * 9e5) + 1e5;
      const hasDiscount = Math.random() > 0.5;
      const discountPercent = Math.floor(Math.random() * 30) + 10;
      return {
        name: randomName,
        slug: randomName.toLowerCase().replace(/\s+/g, "-"),
        sku: `SKU-${Date.now().toString(36).toUpperCase()}`,
        categoryId: props.categories.length > 0 ? props.categories[Math.floor(Math.random() * props.categories.length)].id : null,
        description: descriptions[Math.floor(Math.random() * descriptions.length)],
        specifications: [
          { key: "Material", value: "Cotton 100%" },
          { key: "Ukuran", value: "S, M, L, XL" },
          { key: "Warna", value: "Hitam, Putih, Navy" }
        ],
        price: randomPrice,
        discountPrice: hasDiscount ? Math.floor(randomPrice * (1 - discountPercent / 100)) : null,
        stock: Math.floor(Math.random() * 100) + 10,
        minOrder: 1,
        maxOrder: 10,
        weight: Math.floor(Math.random() * 1e3) + 100,
        // 100-1100 gram
        brand: brands[Math.floor(Math.random() * brands.length)],
        condition: "new",
        status: "draft",
        isFeatured: Math.random() > 0.7,
        images: [],
        variants: []
      };
    };
    const formData = ref({
      name: "",
      slug: "",
      sku: "",
      categoryId: null,
      description: "",
      specifications: [],
      price: 0,
      discountPrice: null,
      stock: 0,
      minOrder: 1,
      maxOrder: null,
      weight: 0,
      brand: "",
      condition: "new",
      status: "draft",
      isFeatured: false,
      images: [],
      variants: []
    });
    onMounted(() => {
      if (props.isDev) {
        const fakeData = generateFakeData();
        formData.value = fakeData;
      }
    });
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
        if (formData.value.slug) form.append("slug", formData.value.slug);
        if (formData.value.sku) form.append("sku", formData.value.sku);
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
        const newImagesMeta = [];
        for (const image of formData.value.images) {
          if (image.file && !image.isDeleted) {
            form.append("newImages", image.file);
            newImagesMeta.push({
              isPrimary: image.isPrimary,
              sortOrder: image.sortOrder
            });
          }
        }
        form.append("newImagesMeta", JSON.stringify(newImagesMeta));
        const activeVariants = formData.value.variants.filter((v) => v.isActive !== false).map((v) => ({
          name: v.name,
          value: v.value,
          sku: v.sku,
          priceAdjustment: v.priceAdjustment,
          stock: v.stock,
          isActive: v.isActive
        }));
        form.append("variants", JSON.stringify(activeVariants));
        const response = await fetch("/admin/products", {
          method: "POST",
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
        toast.error("Error", "Terjadi kesalahan saat menyimpan produk");
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
      _push(`<div><h1 class="text-2xl font-bold text-slate-900 dark:text-white">Tambah Produk</h1><p class="text-sm text-slate-500 dark:text-slate-400 mt-1"> Tambah produk baru ke toko ${ssrInterpolate(props.admin.storeName)}</p></div></div><!-- Form -->`);
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("inertia/pages/admin/products/create.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
