import { _ as _sfc_main$6 } from './SelectMenu-CGTADs72.js';
import { _ as _sfc_main$5 } from './Textarea-DTaAAeeU.js';
import { a as _sfc_main$1, _ as _sfc_main$4, u as useToast } from './Badge-DaOjA2YD.js';
import { a as _sfc_main$2, _ as _sfc_main$3 } from './Button-BBveOjhJ.js';
import { defineComponent, ref, computed, watch, onMounted, mergeProps, withCtx, createTextVNode, toDisplayString, createVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderAttr } from 'vue/server-renderer';
import { router } from '@inertiajs/vue3';
import { A as AdminLayout } from './admin-CGUULoJY.js';
import 'reka-ui';
import 'defu';
import '@vueuse/core';
import './virtual_nuxt-ui-plugins-BqI2j5ZJ.js';
import '@unhead/vue/client';
import 'tailwindcss/colors';
import 'hookable';
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
  __name: "profile",
  __ssrInlineRender: true,
  props: {
    admin: { default: () => ({
      id: 0,
      storeName: "",
      slug: "",
      description: null,
      logo: null,
      banner: null,
      phone: null,
      email: null,
      address: null,
      cityId: null,
      cityName: null,
      districtId: null,
      districtName: null,
      provinceId: null,
      provinceName: null,
      postalCode: null,
      status: "",
      rating: 0,
      totalReviews: 0,
      totalSales: 0,
      createdAt: ""
    }) }
  },
  setup(__props) {
    const props = __props;
    const toast = useToast();
    const form = ref({
      storeName: props.admin.storeName,
      description: props.admin.description || "",
      phone: props.admin.phone || "",
      email: props.admin.email || "",
      address: props.admin.address || "",
      cityId: props.admin.cityId || "",
      cityName: props.admin.cityName || "",
      districtId: props.admin.districtId || "",
      districtName: props.admin.districtName || "",
      provinceId: props.admin.provinceId || "",
      provinceName: props.admin.provinceName || "",
      postalCode: props.admin.postalCode || ""
    });
    const logo = ref(props.admin.logo);
    const banner = ref(props.admin.banner);
    const logoFailed = ref(false);
    const bannerFailed = ref(false);
    const provinces = ref([]);
    const cities = ref([]);
    const districts = ref([]);
    const isLoadingProvinces = ref(false);
    const isLoadingCities = ref(false);
    const isLoadingDistricts = ref(false);
    const isSaving = ref(false);
    const isUploadingLogo = ref(false);
    const isUploadingBanner = ref(false);
    const isDeletingLogo = ref(false);
    const isDeletingBanner = ref(false);
    const logoInput = ref(null);
    const bannerInput = ref(null);
    const getToken = () => {
      const match = document.cookie.match(/XSRF-TOKEN=([^;]+)/);
      return match ? decodeURIComponent(match[1]) : "";
    };
    const getInitials = (name) => {
      if (!name) return "??";
      const words = name.trim().split(/\s+/);
      if (words.length >= 2) {
        return (words[0].charAt(0) + words[1].charAt(0)).toUpperCase();
      }
      return name.slice(0, 2).toUpperCase();
    };
    const hasChanges = computed(() => {
      return form.value.storeName !== props.admin.storeName || form.value.description !== (props.admin.description || "") || form.value.phone !== (props.admin.phone || "") || form.value.email !== (props.admin.email || "") || form.value.address !== (props.admin.address || "") || form.value.cityId !== (props.admin.cityId || "") || form.value.cityName !== (props.admin.cityName || "") || form.value.districtId !== (props.admin.districtId || "") || form.value.districtName !== (props.admin.districtName || "") || form.value.provinceId !== (props.admin.provinceId || "") || form.value.provinceName !== (props.admin.provinceName || "") || form.value.postalCode !== (props.admin.postalCode || "");
    });
    const statusConfig = computed(() => {
      const configs = {
        active: { label: "Aktif", color: "success" },
        pending: { label: "Pending", color: "warning" },
        suspended: { label: "Ditangguhkan", color: "error" },
        inactive: { label: "Tidak Aktif", color: "neutral" }
      };
      return configs[props.admin.status] || { label: props.admin.status, color: "neutral" };
    });
    const formatDate = (dateStr) => {
      return new Date(dateStr).toLocaleDateString("id-ID", {
        day: "numeric",
        month: "long",
        year: "numeric"
      });
    };
    const fetchProvinces = async () => {
      isLoadingProvinces.value = true;
      try {
        const response = await fetch("/api/location/provinces", {
          headers: {
            "X-Requested-With": "XMLHttpRequest"
          },
          credentials: "include"
        });
        const data = await response.json();
        if (data.success && Array.isArray(data.data)) {
          provinces.value = data.data.map((p) => ({
            id: String(p.province_id || p.id),
            name: p.province || p.name
          }));
        }
      } catch (error) {
        console.error("Fetch provinces error:", error);
      } finally {
        isLoadingProvinces.value = false;
      }
    };
    const fetchCities = async (provinceId) => {
      if (!provinceId) {
        cities.value = [];
        return;
      }
      isLoadingCities.value = true;
      try {
        const response = await fetch(`/api/location/cities?provinceId=${provinceId}`, {
          headers: {
            "X-Requested-With": "XMLHttpRequest"
          },
          credentials: "include"
        });
        const data = await response.json();
        if (data.success && Array.isArray(data.data)) {
          cities.value = data.data.map((c) => ({
            id: String(c.city_id || c.id),
            name: c.city_name || (c.type ? `${c.type} ${c.city}` : c.name)
          }));
        }
      } catch (error) {
        console.error("Fetch cities error:", error);
      } finally {
        isLoadingCities.value = false;
      }
    };
    const fetchDistricts = async (cityId) => {
      if (!cityId) {
        districts.value = [];
        return;
      }
      isLoadingDistricts.value = true;
      try {
        const response = await fetch(`/api/location/districts?cityId=${cityId}`, {
          headers: {
            "X-Requested-With": "XMLHttpRequest"
          },
          credentials: "include"
        });
        const data = await response.json();
        if (data.success && Array.isArray(data.data)) {
          districts.value = data.data.map((d) => ({
            id: String(d.subdistrict_id || d.district_id || d.id),
            name: d.subdistrict_name || d.district_name || d.name
          }));
        }
      } catch (error) {
        console.error("Fetch districts error:", error);
      } finally {
        isLoadingDistricts.value = false;
      }
    };
    const provinceOptions = computed(
      () => provinces.value.map((p) => ({
        label: p.name,
        value: p.id
      }))
    );
    const cityOptions = computed(
      () => cities.value.map((c) => ({
        label: c.name,
        value: c.id
      }))
    );
    const districtOptions = computed(
      () => districts.value.map((d) => ({
        label: d.name,
        value: d.id
      }))
    );
    watch(
      () => form.value.provinceId,
      (newVal, oldVal) => {
        if (newVal && newVal !== oldVal) {
          const province = provinces.value.find((p) => p.id === newVal);
          form.value.provinceName = province?.name || "";
          form.value.cityId = "";
          form.value.cityName = "";
          form.value.districtId = "";
          form.value.districtName = "";
          cities.value = [];
          districts.value = [];
          fetchCities(newVal);
        }
      }
    );
    watch(
      () => form.value.cityId,
      (newVal, oldVal) => {
        if (newVal && newVal !== oldVal) {
          const city = cities.value.find((c) => c.id === newVal);
          form.value.cityName = city?.name || "";
          form.value.districtId = "";
          form.value.districtName = "";
          districts.value = [];
          fetchDistricts(newVal);
        }
      }
    );
    watch(
      () => form.value.districtId,
      (newVal) => {
        if (newVal) {
          const district = districts.value.find((d) => d.id === newVal);
          form.value.districtName = district?.name || "";
        }
      }
    );
    onMounted(async () => {
      await fetchProvinces();
      if (props.admin.provinceId) {
        await fetchCities(props.admin.provinceId);
      }
      if (props.admin.cityId) {
        await fetchDistricts(props.admin.cityId);
      }
    });
    const saveProfile = async () => {
      if (!form.value.storeName.trim()) {
        toast.error("Error", "Nama toko tidak boleh kosong");
        return;
      }
      if (form.value.storeName.trim().length < 3) {
        toast.error("Error", "Nama toko minimal 3 karakter");
        return;
      }
      isSaving.value = true;
      try {
        const response = await fetch("/admin/settings/profile", {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            "X-Requested-With": "XMLHttpRequest",
            "X-XSRF-TOKEN": getToken()
          },
          credentials: "include",
          body: JSON.stringify(form.value)
        });
        const data = await response.json();
        if (data.success) {
          toast.success("Berhasil", data.message);
          router.reload({ only: ["admin"] });
        } else {
          toast.error("Gagal", data.message);
        }
      } catch (error) {
        console.error("Save profile error:", error);
        toast.error("Error", "Terjadi kesalahan saat menyimpan profil");
      } finally {
        isSaving.value = false;
      }
    };
    const deleteLogo = async () => {
      if (!confirm("Apakah Anda yakin ingin menghapus logo?")) return;
      isDeletingLogo.value = true;
      try {
        const response = await fetch("/admin/settings/logo", {
          method: "DELETE",
          headers: {
            "X-Requested-With": "XMLHttpRequest",
            "X-XSRF-TOKEN": getToken()
          },
          credentials: "include"
        });
        const data = await response.json();
        if (data.success) {
          logo.value = null;
          toast.success("Berhasil", data.message);
        } else {
          toast.error("Gagal", data.message);
        }
      } catch (error) {
        console.error("Delete logo error:", error);
        toast.error("Error", "Terjadi kesalahan saat menghapus logo");
      } finally {
        isDeletingLogo.value = false;
      }
    };
    const deleteBanner = async () => {
      if (!confirm("Apakah Anda yakin ingin menghapus banner?")) return;
      isDeletingBanner.value = true;
      try {
        const response = await fetch("/admin/settings/banner", {
          method: "DELETE",
          headers: {
            "X-Requested-With": "XMLHttpRequest",
            "X-XSRF-TOKEN": getToken()
          },
          credentials: "include"
        });
        const data = await response.json();
        if (data.success) {
          banner.value = null;
          toast.success("Berhasil", data.message);
        } else {
          toast.error("Gagal", data.message);
        }
      } catch (error) {
        console.error("Delete banner error:", error);
        toast.error("Error", "Terjadi kesalahan saat menghapus banner");
      } finally {
        isDeletingBanner.value = false;
      }
    };
    const resetForm = () => {
      form.value = {
        storeName: props.admin.storeName,
        description: props.admin.description || "",
        phone: props.admin.phone || "",
        email: props.admin.email || "",
        address: props.admin.address || "",
        cityId: props.admin.cityId || "",
        cityName: props.admin.cityName || "",
        districtId: props.admin.districtId || "",
        districtName: props.admin.districtName || "",
        provinceId: props.admin.provinceId || "",
        provinceName: props.admin.provinceName || "",
        postalCode: props.admin.postalCode || ""
      };
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UBadge = _sfc_main$1;
      const _component_UButton = _sfc_main$2;
      const _component_UIcon = _sfc_main$3;
      const _component_UInput = _sfc_main$4;
      const _component_UTextarea = _sfc_main$5;
      const _component_USelectMenu = _sfc_main$6;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "space-y-6" }, _attrs))}><!-- Page Header --><div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"><div><h1 class="text-2xl font-bold text-slate-900 dark:text-white">Profil Toko</h1><p class="text-sm text-slate-500 dark:text-slate-400 mt-1"> Kelola informasi dan tampilan toko Anda </p></div>`);
      _push(ssrRenderComponent(_component_UBadge, {
        color: statusConfig.value.color,
        size: "lg"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`${ssrInterpolate(statusConfig.value.label)}`);
          } else {
            return [
              createTextVNode(
                toDisplayString(statusConfig.value.label),
                1
                /* TEXT */
              )
            ];
          }
        }),
        _: 1
        /* STABLE */
      }, _parent));
      _push(`</div><!-- Store Info Card --><div class="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden"><!-- Banner Section --><div class="relative h-48 bg-linear-to-r from-violet-500 to-fuchsia-500">`);
      if (banner.value && !bannerFailed.value) {
        _push(`<img${ssrRenderAttr("src", banner.value)} alt="Store Banner" class="w-full h-full object-cover">`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="absolute inset-0 bg-black/20"></div><!-- Banner Actions --><div class="absolute top-4 right-4 flex gap-2"><input type="file" accept="image/jpeg,image/jpg,image/png,image/webp" class="hidden">`);
      _push(ssrRenderComponent(_component_UButton, {
        color: "white",
        variant: "solid",
        size: "sm",
        loading: isUploadingBanner.value,
        onClick: ($event) => bannerInput.value?.click()
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_UIcon, {
              name: "i-heroicons-camera",
              class: "w-4 h-4 mr-1"
            }, null, _parent2, _scopeId));
            _push2(` ${ssrInterpolate(banner.value ? "Ganti" : "Upload")} Banner `);
          } else {
            return [
              createVNode(_component_UIcon, {
                name: "i-heroicons-camera",
                class: "w-4 h-4 mr-1"
              }),
              createTextVNode(
                " " + toDisplayString(banner.value ? "Ganti" : "Upload") + " Banner ",
                1
                /* TEXT */
              )
            ];
          }
        }),
        _: 1
        /* STABLE */
      }, _parent));
      if (banner.value) {
        _push(ssrRenderComponent(_component_UButton, {
          color: "error",
          variant: "soft",
          size: "sm",
          loading: isDeletingBanner.value,
          onClick: deleteBanner
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
          _: 1
          /* STABLE */
        }, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(`</div><!-- Logo Section --><div class="absolute -bottom-12 left-6"><div class="relative"><div class="w-24 h-24 rounded-xl overflow-hidden border-4 border-white dark:border-slate-800 shadow-lg bg-white dark:bg-slate-700">`);
      if (logo.value && !logoFailed.value) {
        _push(`<img${ssrRenderAttr("src", logo.value)} alt="Store Logo" class="w-full h-full object-cover">`);
      } else {
        _push(`<div class="w-full h-full bg-linear-to-br from-violet-500 to-fuchsia-600 flex items-center justify-center text-white font-bold text-2xl">${ssrInterpolate(getInitials(form.value.storeName))}</div>`);
      }
      _push(`</div><!-- Logo Actions --><div class="absolute -bottom-2 -right-2 flex gap-1"><input type="file" accept="image/jpeg,image/jpg,image/png,image/webp" class="hidden">`);
      _push(ssrRenderComponent(_component_UButton, {
        color: "primary",
        size: "xs",
        class: "rounded-full shadow-lg",
        loading: isUploadingLogo.value,
        onClick: ($event) => logoInput.value?.click()
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_UIcon, {
              name: "i-heroicons-camera",
              class: "w-3 h-3"
            }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_UIcon, {
                name: "i-heroicons-camera",
                class: "w-3 h-3"
              })
            ];
          }
        }),
        _: 1
        /* STABLE */
      }, _parent));
      if (logo.value) {
        _push(ssrRenderComponent(_component_UButton, {
          color: "error",
          size: "xs",
          class: "rounded-full shadow-lg",
          loading: isDeletingLogo.value,
          onClick: deleteLogo
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(_component_UIcon, {
                name: "i-heroicons-trash",
                class: "w-3 h-3"
              }, null, _parent2, _scopeId));
            } else {
              return [
                createVNode(_component_UIcon, {
                  name: "i-heroicons-trash",
                  class: "w-3 h-3"
                })
              ];
            }
          }),
          _: 1
          /* STABLE */
        }, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div></div></div><!-- Store Stats --><div class="pt-16 px-6 pb-6"><div class="flex flex-wrap items-center gap-6 mb-6"><div><h2 class="text-xl font-bold text-slate-900 dark:text-white">${ssrInterpolate(form.value.storeName)}</h2><p class="text-sm text-slate-500 dark:text-slate-400"> Bergabung sejak ${ssrInterpolate(formatDate(__props.admin.createdAt))}</p></div><div class="flex gap-6 ml-auto"><div class="text-center"><div class="flex items-center gap-1 text-lg font-bold text-slate-900 dark:text-white">`);
      _push(ssrRenderComponent(_component_UIcon, {
        name: "i-heroicons-star-solid",
        class: "w-5 h-5 text-amber-400"
      }, null, _parent));
      _push(` ${ssrInterpolate(Number(__props.admin.rating || 0).toFixed(1))}</div><p class="text-xs text-slate-500 dark:text-slate-400">Rating</p></div><div class="text-center"><p class="text-lg font-bold text-slate-900 dark:text-white">${ssrInterpolate(__props.admin.totalReviews || 0)}</p><p class="text-xs text-slate-500 dark:text-slate-400">Ulasan</p></div><div class="text-center"><p class="text-lg font-bold text-slate-900 dark:text-white">${ssrInterpolate(__props.admin.totalSales || 0)}</p><p class="text-xs text-slate-500 dark:text-slate-400">Terjual</p></div></div></div></div></div><!-- Profile Form --><div class="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6"><h3 class="text-lg font-semibold text-slate-900 dark:text-white mb-6">Informasi Toko</h3><div class="space-y-6"><!-- Store Name --><div class="grid grid-cols-1 md:grid-cols-2 gap-6"><div><label class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1"> Nama Toko <span class="text-red-500">*</span></label>`);
      _push(ssrRenderComponent(_component_UInput, {
        modelValue: form.value.storeName,
        "onUpdate:modelValue": ($event) => form.value.storeName = $event,
        placeholder: "Masukkan nama toko",
        size: "lg",
        class: "w-full"
      }, null, _parent));
      _push(`<p class="text-xs text-slate-500 dark:text-slate-400 mt-1"> URL Toko: ogitu.com/store/${ssrInterpolate(__props.admin.slug)}</p></div><div><label class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1"> Email Toko </label>`);
      _push(ssrRenderComponent(_component_UInput, {
        modelValue: form.value.email,
        "onUpdate:modelValue": ($event) => form.value.email = $event,
        type: "email",
        placeholder: "email@toko.com",
        size: "lg",
        class: "w-full"
      }, null, _parent));
      _push(`</div></div><!-- Phone --><div><label class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1"> Nomor Telepon </label>`);
      _push(ssrRenderComponent(_component_UInput, {
        modelValue: form.value.phone,
        "onUpdate:modelValue": ($event) => form.value.phone = $event,
        placeholder: "08xxxxxxxxxx",
        size: "lg",
        class: "w-full md:w-1/2"
      }, null, _parent));
      _push(`</div><!-- Description --><div><label class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1"> Deskripsi Toko </label>`);
      _push(ssrRenderComponent(_component_UTextarea, {
        modelValue: form.value.description,
        "onUpdate:modelValue": ($event) => form.value.description = $event,
        placeholder: "Ceritakan tentang toko Anda...",
        rows: 4,
        class: "w-full"
      }, null, _parent));
      _push(`</div><!-- Address --><div><label class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1"> Alamat Lengkap </label>`);
      _push(ssrRenderComponent(_component_UTextarea, {
        modelValue: form.value.address,
        "onUpdate:modelValue": ($event) => form.value.address = $event,
        placeholder: "Alamat lengkap toko",
        rows: 2,
        class: "w-full"
      }, null, _parent));
      _push(`</div><!-- Location Section Header --><div class="border-t border-slate-200 dark:border-slate-700 pt-6"><h4 class="text-base font-semibold text-slate-900 dark:text-white mb-1">`);
      _push(ssrRenderComponent(_component_UIcon, {
        name: "i-heroicons-map-pin",
        class: "w-5 h-5 inline-block mr-2 text-violet-600"
      }, null, _parent));
      _push(` Alamat Pickup </h4><p class="text-sm text-slate-500 dark:text-slate-400 mb-4"> Alamat ini digunakan untuk perhitungan ongkos kirim dan pickup barang </p></div><!-- Location Dropdowns --><div class="grid grid-cols-1 md:grid-cols-3 gap-6"><div><label class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1"> Provinsi <span class="text-red-500">*</span></label>`);
      _push(ssrRenderComponent(_component_USelectMenu, {
        modelValue: form.value.provinceId,
        "onUpdate:modelValue": ($event) => form.value.provinceId = $event,
        items: provinceOptions.value,
        placeholder: "Pilih provinsi",
        loading: isLoadingProvinces.value,
        "value-key": "value",
        class: "w-full"
      }, null, _parent));
      _push(`</div><div><label class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1"> Kota/Kabupaten <span class="text-red-500">*</span></label>`);
      _push(ssrRenderComponent(_component_USelectMenu, {
        modelValue: form.value.cityId,
        "onUpdate:modelValue": ($event) => form.value.cityId = $event,
        items: cityOptions.value,
        placeholder: "Pilih kota/kabupaten",
        loading: isLoadingCities.value,
        disabled: !form.value.provinceId,
        "value-key": "value",
        class: "w-full"
      }, null, _parent));
      _push(`</div><div><label class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1"> Kecamatan <span class="text-red-500">*</span></label>`);
      _push(ssrRenderComponent(_component_USelectMenu, {
        modelValue: form.value.districtId,
        "onUpdate:modelValue": ($event) => form.value.districtId = $event,
        items: districtOptions.value,
        placeholder: "Pilih kecamatan",
        loading: isLoadingDistricts.value,
        disabled: !form.value.cityId,
        "value-key": "value",
        class: "w-full"
      }, null, _parent));
      _push(`</div></div><!-- Postal Code --><div class="grid grid-cols-1 md:grid-cols-3 gap-6"><div><label class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1"> Kode Pos </label>`);
      _push(ssrRenderComponent(_component_UInput, {
        modelValue: form.value.postalCode,
        "onUpdate:modelValue": ($event) => form.value.postalCode = $event,
        placeholder: "12345",
        size: "lg",
        class: "w-full"
      }, null, _parent));
      _push(`</div><div class="md:col-span-2"><label class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1"> Lokasi Saat Ini </label><div class="h-11 px-4 flex items-center bg-slate-50 dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-700 text-sm text-slate-600 dark:text-slate-400">`);
      _push(ssrRenderComponent(_component_UIcon, {
        name: "i-heroicons-map-pin",
        class: "w-4 h-4 mr-2 text-slate-400"
      }, null, _parent));
      if (form.value.districtName && form.value.cityName && form.value.provinceName) {
        _push(`<span>${ssrInterpolate(form.value.districtName)}, ${ssrInterpolate(form.value.cityName)}, ${ssrInterpolate(form.value.provinceName)}</span>`);
      } else {
        _push(`<span class="text-slate-400"> Belum ada lokasi dipilih </span>`);
      }
      _push(`</div></div></div><!-- Actions --><div class="flex justify-end gap-3 pt-4 border-t border-slate-200 dark:border-slate-700">`);
      if (hasChanges.value) {
        _push(ssrRenderComponent(_component_UButton, {
          color: "neutral",
          variant: "outline",
          onClick: resetForm
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
      } else {
        _push(`<!---->`);
      }
      _push(ssrRenderComponent(_component_UButton, {
        color: "primary",
        loading: isSaving.value,
        disabled: !hasChanges.value,
        onClick: saveProfile
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_UIcon, {
              name: "i-heroicons-check",
              class: "w-4 h-4 mr-1"
            }, null, _parent2, _scopeId));
            _push2(` Simpan Perubahan `);
          } else {
            return [
              createVNode(_component_UIcon, {
                name: "i-heroicons-check",
                class: "w-4 h-4 mr-1"
              }),
              createTextVNode(" Simpan Perubahan ")
            ];
          }
        }),
        _: 1
        /* STABLE */
      }, _parent));
      _push(`</div></div></div><!-- Tips Card --><div class="bg-violet-50 dark:bg-violet-900/20 rounded-xl border border-violet-200 dark:border-violet-800 p-6"><div class="flex gap-4"><div class="w-10 h-10 rounded-lg bg-violet-100 dark:bg-violet-900/50 flex items-center justify-center shrink-0">`);
      _push(ssrRenderComponent(_component_UIcon, {
        name: "i-heroicons-light-bulb",
        class: "w-5 h-5 text-violet-600 dark:text-violet-400"
      }, null, _parent));
      _push(`</div><div><h4 class="font-semibold text-violet-900 dark:text-violet-100 mb-2">Tips Profil Toko</h4><ul class="text-sm text-violet-700 dark:text-violet-300 space-y-1"><li>• Gunakan logo yang jelas dan mudah dikenali</li><li>• Banner dengan ukuran 1200x300 pixel akan terlihat optimal</li><li>• Deskripsi yang lengkap membantu pembeli mengenal toko Anda</li><li>• <strong>Alamat Pickup wajib diisi</strong> agar ongkos kirim dapat dihitung dengan akurat, <strong>Kami hanya akan menampilkan produk aktif untuk toko yang sudah memiliki alamat pickup!</strong></li><li>• Pilih kecamatan dengan benar untuk estimasi pengiriman yang tepat</li></ul></div></div></div></div>`);
    };
  }
});

const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("inertia/pages/admin/settings/profile.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
