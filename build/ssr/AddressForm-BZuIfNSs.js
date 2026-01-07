import { a as _sfc_main$6 } from './Button-BTdvmZ8N.js';
import { _ as _sfc_main$5 } from './SelectMenu-BqLaY6AT.js';
import { _ as _sfc_main$4 } from './Textarea-yrK84h3-.js';
import { _ as _sfc_main$3 } from './Switch-eKFRwox7.js';
import { _ as _sfc_main$2 } from './Badge-CQlYH3Fo.js';
import { _ as _sfc_main$1 } from './FormField-CdECN7pk.js';
import { defineComponent, ref, onMounted, computed, watch, mergeProps, withCtx, createVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent } from 'vue/server-renderer';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "AddressForm",
  __ssrInlineRender: true,
  props: {
    provinces: {},
    initialCities: {},
    initialDistricts: {},
    initialData: {},
    processing: { type: Boolean },
    submitLabel: {}
  },
  emits: ["submit", "cancel"],
  setup(__props, { expose: __expose, emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const formData = ref({
      name: props.initialData?.name || "",
      contactName: props.initialData?.contactName || "",
      phone: props.initialData?.phone || "",
      addressLine1: props.initialData?.addressLine1 || "",
      addressLine2: props.initialData?.addressLine2 || "",
      provinceId: props.initialData?.provinceId || "",
      provinceName: props.initialData?.provinceName || "",
      cityId: props.initialData?.cityId || "",
      cityName: props.initialData?.cityName || "",
      districtId: props.initialData?.districtId || "",
      districtName: props.initialData?.districtName || "",
      postalCode: props.initialData?.postalCode || "",
      isDefault: props.initialData?.isDefault || false
    });
    const cities = ref(props.initialCities || []);
    const districts = ref(props.initialDistricts || []);
    const loadingCities = ref(false);
    const loadingDistricts = ref(false);
    const initialized = ref(!props.initialData);
    onMounted(() => {
      if (props.initialData) {
        setTimeout(() => {
          initialized.value = true;
        }, 100);
      }
    });
    const provinceOptions = computed(
      () => props.provinces.map((p) => ({
        label: p.province,
        value: p.province_id
      }))
    );
    const cityOptions = computed(
      () => cities.value.map((c) => ({
        label: `${c.type} ${c.city_name}`,
        value: c.city_id
      }))
    );
    const districtOptions = computed(
      () => districts.value.map((d) => ({
        label: d.district_name,
        value: d.district_id
      }))
    );
    const fetchCities = async (provinceId) => {
      try {
        const response = await fetch(`/admin/api/locations/cities/${provinceId}`);
        const data = await response.json();
        return data.data || [];
      } catch (error) {
        console.error("Failed to load cities:", error);
        return [];
      }
    };
    const fetchDistricts = async (cityId) => {
      try {
        const response = await fetch(`/admin/api/locations/districts/${cityId}`);
        const data = await response.json();
        return data.data || [];
      } catch (error) {
        console.error("Failed to load districts:", error);
        return [];
      }
    };
    watch(
      () => formData.value.provinceId,
      async (newProvinceId, oldProvinceId) => {
        if (!initialized.value) return;
        if (!newProvinceId) {
          cities.value = [];
          formData.value.cityId = "";
          formData.value.cityName = "";
          formData.value.districtId = "";
          formData.value.districtName = "";
          districts.value = [];
          return;
        }
        const province = props.provinces.find((p) => p.province_id === newProvinceId);
        if (province) {
          formData.value.provinceName = province.province;
        }
        if (oldProvinceId !== void 0 && newProvinceId !== oldProvinceId) {
          loadingCities.value = true;
          cities.value = await fetchCities(newProvinceId);
          loadingCities.value = false;
          formData.value.cityId = "";
          formData.value.cityName = "";
          formData.value.districtId = "";
          formData.value.districtName = "";
          districts.value = [];
        }
      }
    );
    watch(
      () => formData.value.cityId,
      async (newCityId, oldCityId) => {
        if (!initialized.value) return;
        if (!newCityId) {
          districts.value = [];
          formData.value.districtId = "";
          formData.value.districtName = "";
          return;
        }
        const city = cities.value.find((c) => c.city_id === newCityId);
        if (city) {
          formData.value.cityName = city.city_name;
          if (!formData.value.postalCode || oldCityId !== void 0) {
            formData.value.postalCode = city.postal_code || "";
          }
        }
        if (oldCityId !== void 0 && newCityId !== oldCityId) {
          loadingDistricts.value = true;
          districts.value = await fetchDistricts(newCityId);
          loadingDistricts.value = false;
          formData.value.districtId = "";
          formData.value.districtName = "";
        }
      }
    );
    watch(
      () => formData.value.districtId,
      (newDistrictId) => {
        if (!initialized.value) return;
        if (!newDistrictId) {
          formData.value.districtName = "";
          return;
        }
        const district = districts.value.find((d) => d.district_id === newDistrictId);
        if (district) {
          formData.value.districtName = district.district_name;
        }
      }
    );
    const errors = ref({});
    const validate = () => {
      errors.value = {};
      if (!formData.value.name.trim()) {
        errors.value.name = "Nama alamat wajib diisi";
      }
      if (!formData.value.contactName.trim()) {
        errors.value.contactName = "Nama kontak wajib diisi";
      }
      if (!formData.value.phone.trim()) {
        errors.value.phone = "Nomor telepon wajib diisi";
      } else if (!/^0[0-9]{9,13}$/.test(formData.value.phone.replace(/\D/g, ""))) {
        errors.value.phone = "Format nomor telepon tidak valid";
      }
      if (!formData.value.addressLine1.trim()) {
        errors.value.addressLine1 = "Alamat lengkap wajib diisi";
      }
      if (!formData.value.provinceId) {
        errors.value.provinceId = "Provinsi wajib dipilih";
      }
      if (!formData.value.cityId) {
        errors.value.cityId = "Kota wajib dipilih";
      }
      if (!formData.value.districtId) {
        errors.value.districtId = "Kecamatan wajib dipilih";
      }
      if (!formData.value.postalCode.trim()) {
        errors.value.postalCode = "Kode pos wajib diisi";
      }
      return Object.keys(errors.value).length === 0;
    };
    const handleCancel = () => {
      emit("cancel");
    };
    __expose({
      formData,
      validate,
      reset: () => {
        formData.value = {
          name: "",
          contactName: "",
          phone: "",
          addressLine1: "",
          addressLine2: "",
          provinceId: "",
          provinceName: "",
          cityId: "",
          cityName: "",
          districtId: "",
          districtName: "",
          postalCode: "",
          isDefault: false
        };
        cities.value = [];
        districts.value = [];
        errors.value = {};
      }
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UFormField = _sfc_main$1;
      const _component_UInput = _sfc_main$2;
      const _component_USwitch = _sfc_main$3;
      const _component_UTextarea = _sfc_main$4;
      const _component_USelectMenu = _sfc_main$5;
      const _component_UButton = _sfc_main$6;
      _push(`<form${ssrRenderAttrs(mergeProps({ class: "space-y-6" }, _attrs))}><!-- Basic Info --><div class="grid gap-4 md:grid-cols-2">`);
      _push(ssrRenderComponent(_component_UFormField, {
        label: "Nama Alamat",
        required: "",
        error: errors.value.name
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_UInput, {
              modelValue: formData.value.name,
              "onUpdate:modelValue": ($event) => formData.value.name = $event,
              placeholder: "Contoh: Gudang Utama, Toko Pusat",
              class: "w-full",
              disabled: __props.processing,
              color: errors.value.name ? "error" : void 0
            }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_UInput, {
                modelValue: formData.value.name,
                "onUpdate:modelValue": ($event) => formData.value.name = $event,
                placeholder: "Contoh: Gudang Utama, Toko Pusat",
                class: "w-full",
                disabled: __props.processing,
                color: errors.value.name ? "error" : void 0
              }, null, 8, ["modelValue", "onUpdate:modelValue", "disabled", "color"])
            ];
          }
        }),
        _: 1
        /* STABLE */
      }, _parent));
      _push(ssrRenderComponent(_component_UFormField, { label: "Jadikan Default" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="flex items-center gap-2 h-10"${_scopeId}>`);
            _push2(ssrRenderComponent(_component_USwitch, {
              modelValue: formData.value.isDefault,
              "onUpdate:modelValue": ($event) => formData.value.isDefault = $event,
              disabled: __props.processing
            }, null, _parent2, _scopeId));
            _push2(`<span class="text-sm text-gray-500 dark:text-gray-400"${_scopeId}> Gunakan sebagai alamat pengiriman default </span></div>`);
          } else {
            return [
              createVNode("div", { class: "flex items-center gap-2 h-10" }, [
                createVNode(_component_USwitch, {
                  modelValue: formData.value.isDefault,
                  "onUpdate:modelValue": ($event) => formData.value.isDefault = $event,
                  disabled: __props.processing
                }, null, 8, ["modelValue", "onUpdate:modelValue", "disabled"]),
                createVNode("span", { class: "text-sm text-gray-500 dark:text-gray-400" }, " Gunakan sebagai alamat pengiriman default ")
              ])
            ];
          }
        }),
        _: 1
        /* STABLE */
      }, _parent));
      _push(`</div><!-- Contact Info --><div class="grid gap-4 md:grid-cols-2">`);
      _push(ssrRenderComponent(_component_UFormField, {
        label: "Nama Kontak",
        required: "",
        error: errors.value.contactName
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_UInput, {
              modelValue: formData.value.contactName,
              "onUpdate:modelValue": ($event) => formData.value.contactName = $event,
              placeholder: "Nama penanggung jawab",
              class: "w-full",
              disabled: __props.processing,
              color: errors.value.contactName ? "error" : void 0
            }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_UInput, {
                modelValue: formData.value.contactName,
                "onUpdate:modelValue": ($event) => formData.value.contactName = $event,
                placeholder: "Nama penanggung jawab",
                class: "w-full",
                disabled: __props.processing,
                color: errors.value.contactName ? "error" : void 0
              }, null, 8, ["modelValue", "onUpdate:modelValue", "disabled", "color"])
            ];
          }
        }),
        _: 1
        /* STABLE */
      }, _parent));
      _push(ssrRenderComponent(_component_UFormField, {
        label: "Nomor Telepon",
        required: "",
        error: errors.value.phone
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_UInput, {
              modelValue: formData.value.phone,
              "onUpdate:modelValue": ($event) => formData.value.phone = $event,
              placeholder: "08xxxxxxxxxx",
              class: "w-full",
              disabled: __props.processing,
              color: errors.value.phone ? "error" : void 0
            }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_UInput, {
                modelValue: formData.value.phone,
                "onUpdate:modelValue": ($event) => formData.value.phone = $event,
                placeholder: "08xxxxxxxxxx",
                class: "w-full",
                disabled: __props.processing,
                color: errors.value.phone ? "error" : void 0
              }, null, 8, ["modelValue", "onUpdate:modelValue", "disabled", "color"])
            ];
          }
        }),
        _: 1
        /* STABLE */
      }, _parent));
      _push(`</div><!-- Address -->`);
      _push(ssrRenderComponent(_component_UFormField, {
        label: "Alamat Lengkap",
        required: "",
        error: errors.value.addressLine1
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_UTextarea, {
              modelValue: formData.value.addressLine1,
              "onUpdate:modelValue": ($event) => formData.value.addressLine1 = $event,
              placeholder: "Nama jalan, nomor rumah, RT/RW",
              class: "w-full",
              rows: 2,
              disabled: __props.processing,
              color: errors.value.addressLine1 ? "error" : void 0
            }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_UTextarea, {
                modelValue: formData.value.addressLine1,
                "onUpdate:modelValue": ($event) => formData.value.addressLine1 = $event,
                placeholder: "Nama jalan, nomor rumah, RT/RW",
                class: "w-full",
                rows: 2,
                disabled: __props.processing,
                color: errors.value.addressLine1 ? "error" : void 0
              }, null, 8, ["modelValue", "onUpdate:modelValue", "disabled", "color"])
            ];
          }
        }),
        _: 1
        /* STABLE */
      }, _parent));
      _push(ssrRenderComponent(_component_UFormField, { label: "Alamat Tambahan (Opsional)" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_UInput, {
              modelValue: formData.value.addressLine2,
              "onUpdate:modelValue": ($event) => formData.value.addressLine2 = $event,
              placeholder: "Patokan, nama gedung, dll",
              class: "w-full",
              disabled: __props.processing
            }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_UInput, {
                modelValue: formData.value.addressLine2,
                "onUpdate:modelValue": ($event) => formData.value.addressLine2 = $event,
                placeholder: "Patokan, nama gedung, dll",
                class: "w-full",
                disabled: __props.processing
              }, null, 8, ["modelValue", "onUpdate:modelValue", "disabled"])
            ];
          }
        }),
        _: 1
        /* STABLE */
      }, _parent));
      _push(`<!-- Location --><div class="grid gap-4 md:grid-cols-3">`);
      _push(ssrRenderComponent(_component_UFormField, {
        label: "Provinsi",
        required: "",
        error: errors.value.provinceId
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_USelectMenu, {
              modelValue: formData.value.provinceId,
              "onUpdate:modelValue": ($event) => formData.value.provinceId = $event,
              items: provinceOptions.value,
              "value-key": "value",
              placeholder: "Pilih Provinsi",
              disabled: __props.processing,
              searchable: "",
              class: "w-full"
            }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_USelectMenu, {
                modelValue: formData.value.provinceId,
                "onUpdate:modelValue": ($event) => formData.value.provinceId = $event,
                items: provinceOptions.value,
                "value-key": "value",
                placeholder: "Pilih Provinsi",
                disabled: __props.processing,
                searchable: "",
                class: "w-full"
              }, null, 8, ["modelValue", "onUpdate:modelValue", "items", "disabled"])
            ];
          }
        }),
        _: 1
        /* STABLE */
      }, _parent));
      _push(ssrRenderComponent(_component_UFormField, {
        label: "Kota/Kabupaten",
        required: "",
        error: errors.value.cityId
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_USelectMenu, {
              modelValue: formData.value.cityId,
              "onUpdate:modelValue": ($event) => formData.value.cityId = $event,
              items: cityOptions.value,
              "value-key": "value",
              placeholder: "Pilih Kota",
              disabled: __props.processing || !formData.value.provinceId || loadingCities.value,
              loading: loadingCities.value,
              searchable: "",
              class: "w-full"
            }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_USelectMenu, {
                modelValue: formData.value.cityId,
                "onUpdate:modelValue": ($event) => formData.value.cityId = $event,
                items: cityOptions.value,
                "value-key": "value",
                placeholder: "Pilih Kota",
                disabled: __props.processing || !formData.value.provinceId || loadingCities.value,
                loading: loadingCities.value,
                searchable: "",
                class: "w-full"
              }, null, 8, ["modelValue", "onUpdate:modelValue", "items", "disabled", "loading"])
            ];
          }
        }),
        _: 1
        /* STABLE */
      }, _parent));
      _push(ssrRenderComponent(_component_UFormField, {
        label: "Kecamatan",
        required: "",
        error: errors.value.districtId
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_USelectMenu, {
              modelValue: formData.value.districtId,
              "onUpdate:modelValue": ($event) => formData.value.districtId = $event,
              items: districtOptions.value,
              "value-key": "value",
              placeholder: "Pilih Kecamatan",
              disabled: __props.processing || !formData.value.cityId || loadingDistricts.value,
              loading: loadingDistricts.value,
              searchable: "",
              class: "w-full"
            }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_USelectMenu, {
                modelValue: formData.value.districtId,
                "onUpdate:modelValue": ($event) => formData.value.districtId = $event,
                items: districtOptions.value,
                "value-key": "value",
                placeholder: "Pilih Kecamatan",
                disabled: __props.processing || !formData.value.cityId || loadingDistricts.value,
                loading: loadingDistricts.value,
                searchable: "",
                class: "w-full"
              }, null, 8, ["modelValue", "onUpdate:modelValue", "items", "disabled", "loading"])
            ];
          }
        }),
        _: 1
        /* STABLE */
      }, _parent));
      _push(`</div><div class="grid gap-4 md:grid-cols-3">`);
      _push(ssrRenderComponent(_component_UFormField, {
        label: "Kode Pos",
        required: "",
        error: errors.value.postalCode
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_UInput, {
              modelValue: formData.value.postalCode,
              "onUpdate:modelValue": ($event) => formData.value.postalCode = $event,
              placeholder: "Kode pos",
              disabled: __props.processing,
              color: errors.value.postalCode ? "error" : void 0,
              class: "w-full"
            }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_UInput, {
                modelValue: formData.value.postalCode,
                "onUpdate:modelValue": ($event) => formData.value.postalCode = $event,
                placeholder: "Kode pos",
                disabled: __props.processing,
                color: errors.value.postalCode ? "error" : void 0,
                class: "w-full"
              }, null, 8, ["modelValue", "onUpdate:modelValue", "disabled", "color"])
            ];
          }
        }),
        _: 1
        /* STABLE */
      }, _parent));
      _push(`</div><!-- Actions --><div class="flex justify-end gap-3 pt-4 border-t border-gray-200 dark:border-gray-700">`);
      _push(ssrRenderComponent(_component_UButton, {
        type: "button",
        color: "neutral",
        variant: "outline",
        label: "Batal",
        disabled: __props.processing,
        onClick: handleCancel
      }, null, _parent));
      _push(ssrRenderComponent(_component_UButton, {
        type: "submit",
        color: "primary",
        label: __props.submitLabel || "Simpan",
        loading: __props.processing
      }, null, _parent));
      _push(`</div></form>`);
    };
  }
});

const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("inertia/components/admin/settings/AddressForm.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as _ };
