import { _ as _sfc_main$7 } from './Switch-BkqmHkc6.js';
import { a as _sfc_main$3, _ as _sfc_main$6 } from './Button-BBveOjhJ.js';
import { _ as _sfc_main$5 } from './Textarea-DTaAAeeU.js';
import { _ as _sfc_main$4 } from './SelectMenu-CGTADs72.js';
import { _ as _sfc_main$2 } from './Badge-DaOjA2YD.js';
import { _ as _sfc_main$1 } from './FormField-BIqlRgyi.js';
import { defineComponent, reactive, ref, watch, computed, mergeProps, withCtx, createVNode, createTextVNode, toDisplayString, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderList, ssrRenderClass, ssrRenderAttr, ssrInterpolate } from 'vue/server-renderer';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "ProductForm",
  __ssrInlineRender: true,
  props: {
    modelValue: {},
    categories: {},
    errors: {},
    isSubmitting: { type: Boolean }
  },
  emits: ["update:modelValue", "submit", "cancel"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const parseSpecifications = (specs) => {
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
      if (typeof specs === "object") {
        return Object.entries(specs).map(([key, value]) => ({
          key,
          value: String(value)
        }));
      }
      return [];
    };
    const parseVariants = (variants) => {
      if (!variants || !Array.isArray(variants)) return [];
      return variants.map((v) => ({
        id: v.id,
        name: v.name || "",
        value: v.value || "",
        sku: v.sku || "",
        priceAdjustment: Number(v.priceAdjustment) || 0,
        stock: Number(v.stock) || 0,
        isActive: Boolean(v.isActive ?? true)
      }));
    };
    const parseImages = (images) => {
      if (!images || !Array.isArray(images)) return [];
      return images.map((img, index) => ({
        id: img.id,
        _uid: img.id ? `db-${img.id}` : `init-${Date.now()}-${index}`,
        url: img.url || "",
        isPrimary: Boolean(img.isPrimary),
        sortOrder: img.sortOrder ?? index,
        isNew: false,
        isDeleted: false
      }));
    };
    const form = reactive({
      ...props.modelValue,
      specifications: parseSpecifications(props.modelValue.specifications),
      variants: parseVariants(props.modelValue.variants),
      images: parseImages(props.modelValue.images)
    });
    const fileInput = ref(null);
    let isUpdatingFromProps = false;
    let isUpdatingFromForm = false;
    watch(
      () => props.modelValue,
      (newVal) => {
        if (isUpdatingFromForm) return;
        isUpdatingFromProps = true;
        form.name = newVal.name;
        form.slug = newVal.slug;
        form.sku = newVal.sku;
        form.categoryId = newVal.categoryId;
        form.description = newVal.description;
        form.price = newVal.price;
        form.discountPrice = newVal.discountPrice;
        form.stock = newVal.stock;
        form.minOrder = newVal.minOrder;
        form.maxOrder = newVal.maxOrder;
        form.weight = newVal.weight;
        form.brand = newVal.brand;
        form.condition = newVal.condition;
        form.status = newVal.status;
        form.isFeatured = newVal.isFeatured;
        form.specifications = parseSpecifications(newVal.specifications);
        form.variants = parseVariants(newVal.variants);
        if (form.variants.length > 0) {
          showVariants.value = true;
        }
        isUpdatingFromProps = false;
      },
      { deep: true }
    );
    let emitTimeout = null;
    watch(
      form,
      (newVal) => {
        if (isUpdatingFromProps) return;
        if (emitTimeout) clearTimeout(emitTimeout);
        emitTimeout = setTimeout(() => {
          isUpdatingFromForm = true;
          const specsObject = newVal.specifications.reduce(
            (acc, item) => {
              if (item.key.trim()) {
                acc[item.key.trim()] = item.value;
              }
              return acc;
            },
            {}
          );
          const clonedImages = newVal.images.map((img) => ({
            ...img,
            isPrimary: img.isPrimary,
            isDeleted: img.isDeleted
          }));
          emit("update:modelValue", {
            ...newVal,
            specifications: specsObject,
            images: clonedImages
          });
          setTimeout(() => {
            isUpdatingFromForm = false;
          }, 50);
        }, 100);
      },
      { deep: true }
    );
    const categoryOptions = computed(() => [
      { label: "Pilih Kategori", value: "none" },
      ...props.categories.map((c) => ({ label: c.name, value: c.id.toString() }))
    ]);
    const selectedCategory = computed({
      get: () => form.categoryId?.toString() || "none",
      set: (val) => {
        form.categoryId = val === "none" ? null : Number(val);
      }
    });
    const conditionOptions = [
      { label: "Baru", value: "new" },
      { label: "Bekas", value: "used" }
    ];
    const statusOptions = [
      { label: "Draft", value: "draft" },
      { label: "Aktif", value: "active" },
      { label: "Nonaktif", value: "inactive" }
    ];
    const generateSlug = () => {
      form.slug = form.name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
    };
    let skuCounter = ref(1);
    const generateUniqueSku = () => {
      const now = /* @__PURE__ */ new Date();
      const year = now.getFullYear();
      const month = String(now.getMonth() + 1).padStart(2, "0");
      const day = String(now.getDate()).padStart(2, "0");
      const counter = String(skuCounter.value).padStart(4, "0");
      skuCounter.value++;
      return `${year}${month}${day}${counter}`;
    };
    const generateProductSku = () => {
      form.sku = `SKU-${generateUniqueSku()}`;
    };
    const generateVariantSkuAuto = (index) => {
      const variant = form.variants[index];
      variant.sku = `SKUV-${generateUniqueSku()}`;
    };
    const formatCurrency = (value) => {
      if (value === null || value === void 0 || isNaN(value)) return "";
      return new Intl.NumberFormat("id-ID").format(value);
    };
    const parseCurrency = (value) => {
      const cleaned = value.replace(/[^\d-]/g, "");
      const parsed = parseInt(cleaned, 10);
      return isNaN(parsed) ? 0 : parsed;
    };
    const formattedPrice = computed({
      get: () => formatCurrency(form.price),
      set: (val) => {
        form.price = parseCurrency(val);
      }
    });
    const formattedDiscountPrice = computed({
      get: () => formatCurrency(form.discountPrice),
      set: (val) => {
        const parsed = parseCurrency(val);
        form.discountPrice = parsed === 0 ? null : parsed;
      }
    });
    const getFormattedVariantPrice = (index) => {
      return formatCurrency(form.variants[index]?.priceAdjustment);
    };
    const setVariantPrice = (index, val) => {
      if (form.variants[index]) {
        form.variants[index].priceAdjustment = parseCurrency(val);
      }
    };
    const getError = (field) => {
      return props.errors?.[field]?.[0];
    };
    const addSpecification = () => {
      form.specifications.push({ key: "", value: "" });
    };
    const removeSpecification = (index) => {
      form.specifications.splice(index, 1);
    };
    const triggerFileInput = () => {
      fileInput.value?.click();
    };
    const removeImage = (index) => {
      if (index < 0 || index >= form.images.length) return;
      const image = form.images[index];
      const wasPrimary = image.isPrimary;
      if (wasPrimary) {
        image.isPrimary = false;
      }
      if (image.id) {
        image.isDeleted = true;
      } else {
        form.images.splice(index, 1);
      }
      if (wasPrimary) {
        const visible = form.images.filter((img) => !img.isDeleted);
        if (visible.length > 0) {
          const firstVisibleIndex = form.images.findIndex((img) => !img.isDeleted);
          if (firstVisibleIndex !== -1) {
            form.images[firstVisibleIndex].isPrimary = true;
          }
        }
      }
    };
    const removeImageByRef = (image) => {
      const index = form.images.findIndex((img) => img._uid === image._uid);
      if (index !== -1) {
        removeImage(index);
      } else {
        console.warn("Could not find image to remove by _uid:", image._uid);
      }
    };
    const setPrimaryImageByRef = (image) => {
      form.images.forEach((img) => {
        img.isPrimary = false;
      });
      const targetImage = form.images.find((img) => img._uid === image._uid);
      if (targetImage && !targetImage.isDeleted) {
        targetImage.isPrimary = true;
      }
      console.info("setPrimaryImageByRef - target:", image._uid);
      console.info("setPrimaryImageByRef - updated images:", form.images.map((img) => ({ id: img.id, _uid: img._uid, isPrimary: img.isPrimary })));
    };
    const visibleImages = computed(() => form.images.filter((img) => !img.isDeleted));
    const showVariants = ref(form.variants.length > 0);
    const toggleVariants = (value) => {
      if (!value) {
        form.variants = form.variants.filter((v) => v.id).map((v) => ({ ...v, isActive: false }));
      }
    };
    const addVariant = () => {
      form.variants.push({
        name: "",
        value: "",
        sku: "",
        priceAdjustment: 0,
        stock: 0,
        isActive: true
      });
    };
    const removeVariant = (index) => {
      form.variants.splice(index, 1);
    };
    const generateVariantSku = (index) => {
      const variant = form.variants[index];
      if (form.sku && variant.value) {
        variant.sku = `${form.sku}-${variant.value.toUpperCase().replace(/\s+/g, "-")}`;
      }
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UFormField = _sfc_main$1;
      const _component_UInput = _sfc_main$2;
      const _component_UButton = _sfc_main$3;
      const _component_USelectMenu = _sfc_main$4;
      const _component_UTextarea = _sfc_main$5;
      const _component_UIcon = _sfc_main$6;
      const _component_USwitch = _sfc_main$7;
      _push(`<form${ssrRenderAttrs(mergeProps({ class: "space-y-6" }, _attrs))}><!-- Basic Information --><div class="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6"><h3 class="text-lg font-semibold text-slate-900 dark:text-white mb-4">Informasi Dasar</h3><div class="grid grid-cols-1 lg:grid-cols-2 gap-6"><!-- Name --><div class="lg:col-span-2">`);
      _push(ssrRenderComponent(_component_UFormField, {
        label: "Nama Produk",
        error: getError("name"),
        required: "",
        help: "Gunakan nama yang jelas dan mudah dicari. Contoh: Kaos Polos Cotton Combed 30s"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_UInput, {
              modelValue: form.name,
              "onUpdate:modelValue": ($event) => form.name = $event,
              placeholder: "Masukkan nama produk",
              class: "w-full",
              onBlur: ($event) => !form.slug && generateSlug()
            }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_UInput, {
                modelValue: form.name,
                "onUpdate:modelValue": ($event) => form.name = $event,
                placeholder: "Masukkan nama produk",
                class: "w-full",
                onBlur: ($event) => !form.slug && generateSlug()
              }, null, 8, ["modelValue", "onUpdate:modelValue", "onBlur"])
            ];
          }
        }),
        _: 1
        /* STABLE */
      }, _parent));
      _push(`</div><!-- Slug --><div>`);
      _push(ssrRenderComponent(_component_UFormField, {
        label: "Slug (URL)",
        error: getError("slug"),
        help: "URL unik produk. Otomatis dibuat dari nama produk"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="flex gap-2"${_scopeId}>`);
            _push2(ssrRenderComponent(_component_UInput, {
              modelValue: form.slug,
              "onUpdate:modelValue": ($event) => form.slug = $event,
              placeholder: "nama-produk",
              class: "flex-1"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_UButton, {
              type: "button",
              icon: "i-heroicons-arrow-path",
              color: "neutral",
              variant: "outline",
              onClick: generateSlug,
              title: "Generate dari nama produk"
            }, null, _parent2, _scopeId));
            _push2(`</div>`);
          } else {
            return [
              createVNode("div", { class: "flex gap-2" }, [
                createVNode(_component_UInput, {
                  modelValue: form.slug,
                  "onUpdate:modelValue": ($event) => form.slug = $event,
                  placeholder: "nama-produk",
                  class: "flex-1"
                }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                createVNode(_component_UButton, {
                  type: "button",
                  icon: "i-heroicons-arrow-path",
                  color: "neutral",
                  variant: "outline",
                  onClick: generateSlug,
                  title: "Generate dari nama produk"
                })
              ])
            ];
          }
        }),
        _: 1
        /* STABLE */
      }, _parent));
      _push(`</div><!-- SKU --><div>`);
      _push(ssrRenderComponent(_component_UFormField, {
        label: "SKU",
        error: getError("sku"),
        help: "Kode unik produk untuk inventaris"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="flex gap-2"${_scopeId}>`);
            _push2(ssrRenderComponent(_component_UInput, {
              modelValue: form.sku,
              "onUpdate:modelValue": ($event) => form.sku = $event,
              placeholder: "SKU-12345",
              class: "flex-1"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_UButton, {
              type: "button",
              icon: "i-heroicons-sparkles",
              color: "neutral",
              variant: "outline",
              onClick: generateProductSku,
              title: "Generate SKU otomatis"
            }, null, _parent2, _scopeId));
            _push2(`</div>`);
          } else {
            return [
              createVNode("div", { class: "flex gap-2" }, [
                createVNode(_component_UInput, {
                  modelValue: form.sku,
                  "onUpdate:modelValue": ($event) => form.sku = $event,
                  placeholder: "SKU-12345",
                  class: "flex-1"
                }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                createVNode(_component_UButton, {
                  type: "button",
                  icon: "i-heroicons-sparkles",
                  color: "neutral",
                  variant: "outline",
                  onClick: generateProductSku,
                  title: "Generate SKU otomatis"
                })
              ])
            ];
          }
        }),
        _: 1
        /* STABLE */
      }, _parent));
      _push(`</div><!-- Category --><div>`);
      _push(ssrRenderComponent(_component_UFormField, {
        label: "Kategori",
        error: getError("categoryId"),
        help: "Pilih kategori yang paling sesuai dengan produk"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_USelectMenu, {
              modelValue: selectedCategory.value,
              "onUpdate:modelValue": ($event) => selectedCategory.value = $event,
              items: categoryOptions.value,
              "value-key": "value",
              placeholder: "Pilih kategori",
              class: "w-full"
            }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_USelectMenu, {
                modelValue: selectedCategory.value,
                "onUpdate:modelValue": ($event) => selectedCategory.value = $event,
                items: categoryOptions.value,
                "value-key": "value",
                placeholder: "Pilih kategori",
                class: "w-full"
              }, null, 8, ["modelValue", "onUpdate:modelValue", "items"])
            ];
          }
        }),
        _: 1
        /* STABLE */
      }, _parent));
      _push(`</div><!-- Brand --><div>`);
      _push(ssrRenderComponent(_component_UFormField, {
        label: "Brand / Merek",
        error: getError("brand"),
        help: "Opsional. Kosongkan jika tidak ada merek"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_UInput, {
              modelValue: form.brand,
              "onUpdate:modelValue": ($event) => form.brand = $event,
              placeholder: "Nama brand",
              class: "w-full"
            }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_UInput, {
                modelValue: form.brand,
                "onUpdate:modelValue": ($event) => form.brand = $event,
                placeholder: "Nama brand",
                class: "w-full"
              }, null, 8, ["modelValue", "onUpdate:modelValue"])
            ];
          }
        }),
        _: 1
        /* STABLE */
      }, _parent));
      _push(`</div><!-- Condition --><div>`);
      _push(ssrRenderComponent(_component_UFormField, {
        label: "Kondisi",
        error: getError("condition"),
        required: "",
        help: "Baru = belum pernah dipakai, Bekas = pernah dipakai"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_USelectMenu, {
              modelValue: form.condition,
              "onUpdate:modelValue": ($event) => form.condition = $event,
              items: conditionOptions,
              "value-key": "value",
              class: "w-full"
            }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_USelectMenu, {
                modelValue: form.condition,
                "onUpdate:modelValue": ($event) => form.condition = $event,
                items: conditionOptions,
                "value-key": "value",
                class: "w-full"
              }, null, 8, ["modelValue", "onUpdate:modelValue"])
            ];
          }
        }),
        _: 1
        /* STABLE */
      }, _parent));
      _push(`</div><!-- Status --><div>`);
      _push(ssrRenderComponent(_component_UFormField, {
        label: "Status",
        error: getError("status"),
        help: "Draft = belum tampil, Aktif = tampil di toko"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_USelectMenu, {
              modelValue: form.status,
              "onUpdate:modelValue": ($event) => form.status = $event,
              items: statusOptions,
              "value-key": "value",
              class: "w-full"
            }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_USelectMenu, {
                modelValue: form.status,
                "onUpdate:modelValue": ($event) => form.status = $event,
                items: statusOptions,
                "value-key": "value",
                class: "w-full"
              }, null, 8, ["modelValue", "onUpdate:modelValue"])
            ];
          }
        }),
        _: 1
        /* STABLE */
      }, _parent));
      _push(`</div><!-- Description --><div class="lg:col-span-2">`);
      _push(ssrRenderComponent(_component_UFormField, {
        label: "Deskripsi",
        error: getError("description"),
        help: "Jelaskan detail produk, bahan, ukuran, cara pemakaian, dll"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_UTextarea, {
              modelValue: form.description,
              "onUpdate:modelValue": ($event) => form.description = $event,
              placeholder: "Tulis deskripsi produk...",
              rows: 5,
              class: "w-full"
            }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_UTextarea, {
                modelValue: form.description,
                "onUpdate:modelValue": ($event) => form.description = $event,
                placeholder: "Tulis deskripsi produk...",
                rows: 5,
                class: "w-full"
              }, null, 8, ["modelValue", "onUpdate:modelValue"])
            ];
          }
        }),
        _: 1
        /* STABLE */
      }, _parent));
      _push(`</div></div></div><!-- Product Images --><div class="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6"><div class="flex items-center justify-between mb-4"><div><h3 class="text-lg font-semibold text-slate-900 dark:text-white">Gambar Produk</h3><p class="text-sm text-slate-500 dark:text-slate-400"> Upload maksimal 10 gambar. Gambar pertama akan menjadi gambar utama. </p></div>`);
      _push(ssrRenderComponent(_component_UButton, {
        type: "button",
        icon: "i-heroicons-plus",
        color: "primary",
        variant: "soft",
        size: "sm",
        disabled: visibleImages.value.length >= 10,
        onClick: triggerFileInput
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` Tambah Gambar `);
          } else {
            return [
              createTextVNode(" Tambah Gambar ")
            ];
          }
        }),
        _: 1
        /* STABLE */
      }, _parent));
      _push(`</div><input type="file" accept="image/*" multiple class="hidden"><!-- Image Grid -->`);
      if (visibleImages.value.length > 0) {
        _push(`<div class="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-5 gap-4"><!--[-->`);
        ssrRenderList(visibleImages.value, (image) => {
          _push(`<div class="${ssrRenderClass([image.isPrimary ? "border-violet-500" : "border-transparent", "relative group aspect-square rounded-lg bg-slate-100 dark:bg-slate-700 overflow-hidden border-2 transition-all"])}"><img${ssrRenderAttr("src", image.preview || image.url)}${ssrRenderAttr("alt", `Gambar produk`)} class="w-full h-full object-cover"><!-- Primary Badge -->`);
          if (image.isPrimary) {
            _push(`<div class="absolute top-2 left-2 px-2 py-0.5 bg-violet-500 text-white text-xs rounded-full"> Utama </div>`);
          } else {
            _push(`<!---->`);
          }
          _push(`<!-- Actions Overlay --><div class="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">`);
          if (!image.isPrimary) {
            _push(ssrRenderComponent(_component_UButton, {
              type: "button",
              icon: "i-heroicons-star",
              color: "warning",
              variant: "solid",
              size: "xs",
              onClick: ($event) => setPrimaryImageByRef(image)
            }, null, _parent));
          } else {
            _push(`<!---->`);
          }
          _push(ssrRenderComponent(_component_UButton, {
            type: "button",
            icon: "i-heroicons-trash",
            color: "error",
            variant: "solid",
            size: "xs",
            onClick: ($event) => removeImageByRef(image)
          }, null, _parent));
          _push(`</div></div>`);
        });
        _push(`<!--]--><!-- Add More Button -->`);
        if (visibleImages.value.length < 10) {
          _push(`<div class="aspect-square rounded-lg border-2 border-dashed border-slate-300 dark:border-slate-600 flex items-center justify-center cursor-pointer hover:border-violet-500 hover:bg-violet-50 dark:hover:bg-violet-900/20 transition-colors"><div class="text-center">`);
          _push(ssrRenderComponent(_component_UIcon, {
            name: "i-heroicons-plus",
            class: "w-8 h-8 text-slate-400"
          }, null, _parent));
          _push(`<p class="text-xs text-slate-500 mt-1">Tambah</p></div></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div>`);
      } else {
        _push(`<!--[--><!-- Empty State --><div class="border-2 border-dashed border-slate-300 dark:border-slate-600 rounded-lg p-8 text-center cursor-pointer hover:border-violet-500 hover:bg-violet-50 dark:hover:bg-violet-900/20 transition-colors">`);
        _push(ssrRenderComponent(_component_UIcon, {
          name: "i-heroicons-photo",
          class: "w-12 h-12 text-slate-400 mx-auto"
        }, null, _parent));
        _push(`<p class="text-sm text-slate-500 mt-2">Klik untuk upload gambar</p><p class="text-xs text-slate-400 mt-1">PNG, JPG, WEBP (Maks. 2MB)</p></div><!--]-->`);
      }
      _push(`</div><!-- Specifications --><div class="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6"><div class="flex items-center justify-between mb-4"><div><h3 class="text-lg font-semibold text-slate-900 dark:text-white">Spesifikasi</h3><p class="text-sm text-slate-500 dark:text-slate-400"> Tambahkan spesifikasi produk dalam format key-value </p></div>`);
      _push(ssrRenderComponent(_component_UButton, {
        type: "button",
        icon: "i-heroicons-plus",
        color: "primary",
        variant: "soft",
        size: "sm",
        onClick: addSpecification
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` Tambah `);
          } else {
            return [
              createTextVNode(" Tambah ")
            ];
          }
        }),
        _: 1
        /* STABLE */
      }, _parent));
      _push(`</div>`);
      if (form.specifications.length > 0) {
        _push(`<div class="space-y-3"><!--[-->`);
        ssrRenderList(form.specifications, (spec, index) => {
          _push(`<div class="flex items-start gap-3">`);
          _push(ssrRenderComponent(_component_UInput, {
            modelValue: spec.key,
            "onUpdate:modelValue": ($event) => spec.key = $event,
            placeholder: "Nama (contoh: Berat, Warna)",
            class: "w-1/3"
          }, null, _parent));
          _push(ssrRenderComponent(_component_UInput, {
            modelValue: spec.value,
            "onUpdate:modelValue": ($event) => spec.value = $event,
            placeholder: "Nilai",
            class: "flex-1"
          }, null, _parent));
          _push(ssrRenderComponent(_component_UButton, {
            type: "button",
            icon: "i-heroicons-trash",
            color: "error",
            variant: "ghost",
            onClick: ($event) => removeSpecification(index)
          }, null, _parent));
          _push(`</div>`);
        });
        _push(`<!--]--></div>`);
      } else {
        _push(`<div class="text-center py-8 border-2 border-dashed border-slate-200 dark:border-slate-700 rounded-lg">`);
        _push(ssrRenderComponent(_component_UIcon, {
          name: "i-heroicons-clipboard-document-list",
          class: "w-10 h-10 text-slate-400 mx-auto"
        }, null, _parent));
        _push(`<p class="text-sm text-slate-500 mt-2">Belum ada spesifikasi</p>`);
        _push(ssrRenderComponent(_component_UButton, {
          type: "button",
          color: "primary",
          variant: "soft",
          size: "sm",
          class: "mt-3",
          onClick: addSpecification
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(` Tambah Spesifikasi `);
            } else {
              return [
                createTextVNode(" Tambah Spesifikasi ")
              ];
            }
          }),
          _: 1
          /* STABLE */
        }, _parent));
        _push(`</div>`);
      }
      _push(`</div><!-- Pricing & Stock --><div class="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6"><h3 class="text-lg font-semibold text-slate-900 dark:text-white mb-4">Harga &amp; Stok</h3><div class="grid grid-cols-1 lg:grid-cols-3 gap-6"><!-- Price --><div>`);
      _push(ssrRenderComponent(_component_UFormField, {
        label: "Harga (Rp)",
        error: getError("price"),
        required: "",
        help: "Harga jual normal produk"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_UInput, {
              modelValue: formattedPrice.value,
              "onUpdate:modelValue": ($event) => formattedPrice.value = $event,
              placeholder: "0",
              class: "w-full",
              inputmode: "numeric"
            }, {
              leading: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<span class="text-slate-400 text-sm"${_scopeId2}>Rp</span>`);
                } else {
                  return [
                    createVNode("span", { class: "text-slate-400 text-sm" }, "Rp")
                  ];
                }
              }),
              _: 1
              /* STABLE */
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_UInput, {
                modelValue: formattedPrice.value,
                "onUpdate:modelValue": ($event) => formattedPrice.value = $event,
                placeholder: "0",
                class: "w-full",
                inputmode: "numeric"
              }, {
                leading: withCtx(() => [
                  createVNode("span", { class: "text-slate-400 text-sm" }, "Rp")
                ]),
                _: 1
                /* STABLE */
              }, 8, ["modelValue", "onUpdate:modelValue"])
            ];
          }
        }),
        _: 1
        /* STABLE */
      }, _parent));
      _push(`</div><!-- Discount Price --><div>`);
      _push(ssrRenderComponent(_component_UFormField, {
        label: "Harga Diskon (Rp)",
        error: getError("discountPrice"),
        help: "Opsional. Harus lebih kecil dari harga normal"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_UInput, {
              modelValue: formattedDiscountPrice.value,
              "onUpdate:modelValue": ($event) => formattedDiscountPrice.value = $event,
              placeholder: "Kosongkan jika tidak ada",
              class: "w-full",
              inputmode: "numeric"
            }, {
              leading: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<span class="text-slate-400 text-sm"${_scopeId2}>Rp</span>`);
                } else {
                  return [
                    createVNode("span", { class: "text-slate-400 text-sm" }, "Rp")
                  ];
                }
              }),
              _: 1
              /* STABLE */
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_UInput, {
                modelValue: formattedDiscountPrice.value,
                "onUpdate:modelValue": ($event) => formattedDiscountPrice.value = $event,
                placeholder: "Kosongkan jika tidak ada",
                class: "w-full",
                inputmode: "numeric"
              }, {
                leading: withCtx(() => [
                  createVNode("span", { class: "text-slate-400 text-sm" }, "Rp")
                ]),
                _: 1
                /* STABLE */
              }, 8, ["modelValue", "onUpdate:modelValue"])
            ];
          }
        }),
        _: 1
        /* STABLE */
      }, _parent));
      _push(`</div><!-- Stock --><div>`);
      _push(ssrRenderComponent(_component_UFormField, {
        label: "Stok",
        error: getError("stock"),
        required: "",
        help: "Jumlah produk tersedia. 0 = habis"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_UInput, {
              modelValue: form.stock,
              "onUpdate:modelValue": ($event) => form.stock = $event,
              modelModifiers: { number: true },
              type: "number",
              placeholder: "0",
              class: "w-full",
              min: "0"
            }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_UInput, {
                modelValue: form.stock,
                "onUpdate:modelValue": ($event) => form.stock = $event,
                modelModifiers: { number: true },
                type: "number",
                placeholder: "0",
                class: "w-full",
                min: "0"
              }, null, 8, ["modelValue", "onUpdate:modelValue"])
            ];
          }
        }),
        _: 1
        /* STABLE */
      }, _parent));
      _push(`</div><!-- Min Order --><div>`);
      _push(ssrRenderComponent(_component_UFormField, {
        label: "Minimal Pembelian",
        error: getError("minOrder"),
        help: "Jumlah minimal yang harus dibeli"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_UInput, {
              modelValue: form.minOrder,
              "onUpdate:modelValue": ($event) => form.minOrder = $event,
              modelModifiers: { number: true },
              type: "number",
              placeholder: "1",
              class: "w-full",
              min: "1"
            }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_UInput, {
                modelValue: form.minOrder,
                "onUpdate:modelValue": ($event) => form.minOrder = $event,
                modelModifiers: { number: true },
                type: "number",
                placeholder: "1",
                class: "w-full",
                min: "1"
              }, null, 8, ["modelValue", "onUpdate:modelValue"])
            ];
          }
        }),
        _: 1
        /* STABLE */
      }, _parent));
      _push(`</div><!-- Max Order --><div>`);
      _push(ssrRenderComponent(_component_UFormField, {
        label: "Maksimal Pembelian",
        error: getError("maxOrder"),
        help: "Opsional. Batasi jumlah per transaksi"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_UInput, {
              modelValue: form.maxOrder,
              "onUpdate:modelValue": ($event) => form.maxOrder = $event,
              modelModifiers: { number: true },
              type: "number",
              placeholder: "Kosongkan jika tidak ada",
              class: "w-full",
              min: "1"
            }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_UInput, {
                modelValue: form.maxOrder,
                "onUpdate:modelValue": ($event) => form.maxOrder = $event,
                modelModifiers: { number: true },
                type: "number",
                placeholder: "Kosongkan jika tidak ada",
                class: "w-full",
                min: "1"
              }, null, 8, ["modelValue", "onUpdate:modelValue"])
            ];
          }
        }),
        _: 1
        /* STABLE */
      }, _parent));
      _push(`</div><!-- Weight --><div>`);
      _push(ssrRenderComponent(_component_UFormField, {
        label: "Berat (gram)",
        error: getError("weight"),
        required: "",
        help: "Digunakan untuk kalkulasi ongkir"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_UInput, {
              modelValue: form.weight,
              "onUpdate:modelValue": ($event) => form.weight = $event,
              modelModifiers: { number: true },
              type: "number",
              placeholder: "0",
              class: "w-full",
              min: "0"
            }, {
              trailing: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<span class="text-slate-400 text-sm"${_scopeId2}>gram</span>`);
                } else {
                  return [
                    createVNode("span", { class: "text-slate-400 text-sm" }, "gram")
                  ];
                }
              }),
              _: 1
              /* STABLE */
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_UInput, {
                modelValue: form.weight,
                "onUpdate:modelValue": ($event) => form.weight = $event,
                modelModifiers: { number: true },
                type: "number",
                placeholder: "0",
                class: "w-full",
                min: "0"
              }, {
                trailing: withCtx(() => [
                  createVNode("span", { class: "text-slate-400 text-sm" }, "gram")
                ]),
                _: 1
                /* STABLE */
              }, 8, ["modelValue", "onUpdate:modelValue"])
            ];
          }
        }),
        _: 1
        /* STABLE */
      }, _parent));
      _push(`</div></div></div><!-- Variants --><div class="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6"><div class="flex items-center justify-between mb-4"><div class="flex items-center gap-3"><div><h3 class="text-lg font-semibold text-slate-900 dark:text-white">Varian Produk</h3><p class="text-sm text-slate-500 dark:text-slate-400"> Tambahkan varian jika produk memiliki variasi (warna, ukuran, dll) </p></div></div>`);
      _push(ssrRenderComponent(_component_USwitch, {
        modelValue: showVariants.value,
        "onUpdate:modelValue": [($event) => showVariants.value = $event, toggleVariants]
      }, null, _parent));
      _push(`</div>`);
      if (showVariants.value) {
        _push(`<div class="space-y-4">`);
        if (form.variants.length > 0) {
          _push(`<div class="space-y-4"><!--[-->`);
          ssrRenderList(form.variants, (variant, index) => {
            _push(`<div class="p-4 rounded-lg bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700"><div class="flex items-center justify-between mb-3"><span class="text-sm font-medium text-slate-700 dark:text-slate-300"> Varian ${ssrInterpolate(index + 1)}</span>`);
            _push(ssrRenderComponent(_component_UButton, {
              type: "button",
              icon: "i-heroicons-trash",
              color: "error",
              variant: "ghost",
              size: "xs",
              onClick: ($event) => removeVariant(index)
            }, null, _parent));
            _push(`</div><div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">`);
            _push(ssrRenderComponent(_component_UFormField, { label: "Nama Varian" }, {
              default: withCtx((_, _push2, _parent2, _scopeId) => {
                if (_push2) {
                  _push2(ssrRenderComponent(_component_UInput, {
                    modelValue: variant.name,
                    "onUpdate:modelValue": ($event) => variant.name = $event,
                    placeholder: "contoh: Warna",
                    size: "sm",
                    class: "w-full"
                  }, null, _parent2, _scopeId));
                } else {
                  return [
                    createVNode(_component_UInput, {
                      modelValue: variant.name,
                      "onUpdate:modelValue": ($event) => variant.name = $event,
                      placeholder: "contoh: Warna",
                      size: "sm",
                      class: "w-full"
                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                  ];
                }
              }),
              _: 2
              /* DYNAMIC */
            }, _parent));
            _push(ssrRenderComponent(_component_UFormField, { label: "Nilai" }, {
              default: withCtx((_, _push2, _parent2, _scopeId) => {
                if (_push2) {
                  _push2(ssrRenderComponent(_component_UInput, {
                    modelValue: variant.value,
                    "onUpdate:modelValue": ($event) => variant.value = $event,
                    placeholder: "contoh: Merah",
                    size: "sm",
                    class: "w-full",
                    onBlur: ($event) => generateVariantSku(index)
                  }, null, _parent2, _scopeId));
                } else {
                  return [
                    createVNode(_component_UInput, {
                      modelValue: variant.value,
                      "onUpdate:modelValue": ($event) => variant.value = $event,
                      placeholder: "contoh: Merah",
                      size: "sm",
                      class: "w-full",
                      onBlur: ($event) => generateVariantSku(index)
                    }, null, 8, ["modelValue", "onUpdate:modelValue", "onBlur"])
                  ];
                }
              }),
              _: 2
              /* DYNAMIC */
            }, _parent));
            _push(ssrRenderComponent(_component_UFormField, { label: "SKU Varian" }, {
              default: withCtx((_, _push2, _parent2, _scopeId) => {
                if (_push2) {
                  _push2(`<div class="flex gap-2"${_scopeId}>`);
                  _push2(ssrRenderComponent(_component_UInput, {
                    modelValue: variant.sku,
                    "onUpdate:modelValue": ($event) => variant.sku = $event,
                    placeholder: "SKU-VARIAN",
                    size: "sm",
                    class: "flex-1"
                  }, null, _parent2, _scopeId));
                  _push2(ssrRenderComponent(_component_UButton, {
                    type: "button",
                    icon: "i-heroicons-sparkles",
                    color: "neutral",
                    variant: "outline",
                    size: "sm",
                    onClick: ($event) => generateVariantSkuAuto(index),
                    title: "Generate SKU"
                  }, null, _parent2, _scopeId));
                  _push2(`</div>`);
                } else {
                  return [
                    createVNode("div", { class: "flex gap-2" }, [
                      createVNode(_component_UInput, {
                        modelValue: variant.sku,
                        "onUpdate:modelValue": ($event) => variant.sku = $event,
                        placeholder: "SKU-VARIAN",
                        size: "sm",
                        class: "flex-1"
                      }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                      createVNode(_component_UButton, {
                        type: "button",
                        icon: "i-heroicons-sparkles",
                        color: "neutral",
                        variant: "outline",
                        size: "sm",
                        onClick: ($event) => generateVariantSkuAuto(index),
                        title: "Generate SKU"
                      }, null, 8, ["onClick"])
                    ])
                  ];
                }
              }),
              _: 2
              /* DYNAMIC */
            }, _parent));
            _push(ssrRenderComponent(_component_UFormField, {
              label: "Penyesuaian Harga (Rp)",
              help: "Tambah/kurang dari harga dasar"
            }, {
              default: withCtx((_, _push2, _parent2, _scopeId) => {
                if (_push2) {
                  _push2(ssrRenderComponent(_component_UInput, {
                    "model-value": getFormattedVariantPrice(index),
                    "onUpdate:modelValue": (val) => setVariantPrice(index, val),
                    placeholder: "0",
                    size: "sm",
                    class: "w-full",
                    inputmode: "numeric"
                  }, {
                    leading: withCtx((_2, _push3, _parent3, _scopeId2) => {
                      if (_push3) {
                        _push3(`<span class="text-slate-400 text-xs"${_scopeId2}>Rp</span>`);
                      } else {
                        return [
                          createVNode("span", { class: "text-slate-400 text-xs" }, "Rp")
                        ];
                      }
                    }),
                    _: 2
                    /* DYNAMIC */
                  }, _parent2, _scopeId));
                } else {
                  return [
                    createVNode(_component_UInput, {
                      "model-value": getFormattedVariantPrice(index),
                      "onUpdate:modelValue": (val) => setVariantPrice(index, val),
                      placeholder: "0",
                      size: "sm",
                      class: "w-full",
                      inputmode: "numeric"
                    }, {
                      leading: withCtx(() => [
                        createVNode("span", { class: "text-slate-400 text-xs" }, "Rp")
                      ]),
                      _: 1
                      /* STABLE */
                    }, 8, ["model-value", "onUpdate:modelValue"])
                  ];
                }
              }),
              _: 2
              /* DYNAMIC */
            }, _parent));
            _push(ssrRenderComponent(_component_UFormField, {
              label: "Stok Varian",
              help: "Stok khusus varian ini"
            }, {
              default: withCtx((_, _push2, _parent2, _scopeId) => {
                if (_push2) {
                  _push2(ssrRenderComponent(_component_UInput, {
                    modelValue: variant.stock,
                    "onUpdate:modelValue": ($event) => variant.stock = $event,
                    modelModifiers: { number: true },
                    type: "number",
                    placeholder: "0",
                    size: "sm",
                    class: "w-full",
                    min: "0"
                  }, null, _parent2, _scopeId));
                } else {
                  return [
                    createVNode(_component_UInput, {
                      modelValue: variant.stock,
                      "onUpdate:modelValue": ($event) => variant.stock = $event,
                      modelModifiers: { number: true },
                      type: "number",
                      placeholder: "0",
                      size: "sm",
                      class: "w-full",
                      min: "0"
                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                  ];
                }
              }),
              _: 2
              /* DYNAMIC */
            }, _parent));
            _push(ssrRenderComponent(_component_UFormField, { label: "Status" }, {
              default: withCtx((_, _push2, _parent2, _scopeId) => {
                if (_push2) {
                  _push2(`<div class="flex items-center gap-2 h-9"${_scopeId}>`);
                  _push2(ssrRenderComponent(_component_USwitch, {
                    modelValue: variant.isActive,
                    "onUpdate:modelValue": ($event) => variant.isActive = $event
                  }, null, _parent2, _scopeId));
                  _push2(`<span class="text-sm text-slate-600 dark:text-slate-400"${_scopeId}>${ssrInterpolate(variant.isActive ? "Aktif" : "Nonaktif")}</span></div>`);
                } else {
                  return [
                    createVNode("div", { class: "flex items-center gap-2 h-9" }, [
                      createVNode(_component_USwitch, {
                        modelValue: variant.isActive,
                        "onUpdate:modelValue": ($event) => variant.isActive = $event
                      }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                      createVNode(
                        "span",
                        { class: "text-sm text-slate-600 dark:text-slate-400" },
                        toDisplayString(variant.isActive ? "Aktif" : "Nonaktif"),
                        1
                        /* TEXT */
                      )
                    ])
                  ];
                }
              }),
              _: 2
              /* DYNAMIC */
            }, _parent));
            _push(`</div></div>`);
          });
          _push(`<!--]--></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(ssrRenderComponent(_component_UButton, {
          type: "button",
          icon: "i-heroicons-plus",
          color: "primary",
          variant: "soft",
          size: "sm",
          onClick: addVariant
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(` Tambah Varian `);
            } else {
              return [
                createTextVNode(" Tambah Varian ")
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
      _push(`</div><!-- Featured --><div class="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6"><div class="flex items-center justify-between"><div><h3 class="text-lg font-semibold text-slate-900 dark:text-white">Produk Unggulan</h3><p class="text-sm text-slate-500 dark:text-slate-400"> Tampilkan produk ini di bagian unggulan toko </p></div>`);
      _push(ssrRenderComponent(_component_USwitch, {
        modelValue: form.isFeatured,
        "onUpdate:modelValue": ($event) => form.isFeatured = $event
      }, null, _parent));
      _push(`</div></div><!-- Actions --><div class="flex items-center justify-end gap-3">`);
      _push(ssrRenderComponent(_component_UButton, {
        type: "button",
        color: "neutral",
        variant: "outline",
        size: "lg",
        onClick: ($event) => _ctx.$emit("cancel")
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` Batal `);
          } else {
            return [
              createTextVNode(" Batal ")
            ];
          }
        }),
        _: 1
        /* STABLE */
      }, _parent));
      _push(ssrRenderComponent(_component_UButton, {
        type: "submit",
        color: "primary",
        size: "lg",
        loading: __props.isSubmitting
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_UIcon, {
              name: "i-heroicons-check",
              class: "w-5 h-5 mr-1"
            }, null, _parent2, _scopeId));
            _push2(` Simpan Produk `);
          } else {
            return [
              createVNode(_component_UIcon, {
                name: "i-heroicons-check",
                class: "w-5 h-5 mr-1"
              }),
              createTextVNode(" Simpan Produk ")
            ];
          }
        }),
        _: 1
        /* STABLE */
      }, _parent));
      _push(`</div></form>`);
    };
  }
});

const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("inertia/components/admin/products/ProductForm.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as _ };
