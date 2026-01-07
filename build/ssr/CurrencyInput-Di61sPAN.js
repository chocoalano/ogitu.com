import { _ as _sfc_main$1 } from './Badge-CQlYH3Fo.js';
import { defineComponent, ref, watch, mergeProps, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent } from 'vue/server-renderer';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "CurrencyInput",
  __ssrInlineRender: true,
  props: {
    modelValue: {},
    placeholder: { default: "0" },
    min: { default: 0 },
    max: {},
    color: {},
    disabled: { type: Boolean, default: false }
  },
  emits: ["update:modelValue"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const displayValue = ref("");
    const formatCurrency = (value) => {
      if (value === null || value === void 0 || value === 0) return "";
      return new Intl.NumberFormat("id-ID").format(value);
    };
    const parseCurrency = (value) => {
      if (!value || value.trim() === "") return null;
      const numericValue = value.replace(/[^\d]/g, "");
      const parsed = parseInt(numericValue, 10);
      return isNaN(parsed) ? null : parsed;
    };
    displayValue.value = formatCurrency(props.modelValue);
    watch(
      () => props.modelValue,
      (newValue) => {
        const currentParsed = parseCurrency(displayValue.value);
        if (currentParsed !== newValue) {
          displayValue.value = formatCurrency(newValue);
        }
      }
    );
    const onInput = (event) => {
      const input = event.target;
      let value = input.value;
      const numericOnly = value.replace(/[^\d]/g, "");
      if (numericOnly === "") {
        displayValue.value = "";
        emit("update:modelValue", null);
        return;
      }
      let numericValue = parseInt(numericOnly, 10);
      if (props.min !== void 0 && numericValue < props.min) {
        numericValue = props.min;
      }
      if (props.max !== void 0 && numericValue > props.max) {
        numericValue = props.max;
      }
      displayValue.value = formatCurrency(numericValue);
      emit("update:modelValue", numericValue);
    };
    const onBlur = () => {
      const parsed = parseCurrency(displayValue.value);
      displayValue.value = formatCurrency(parsed);
    };
    const onFocus = (event) => {
      const input = event.target;
      setTimeout(() => input.select(), 0);
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UInput = _sfc_main$1;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "relative" }, _attrs))}><span class="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400 text-sm pointer-events-none"> Rp </span>`);
      _push(ssrRenderComponent(_component_UInput, {
        "model-value": displayValue.value,
        onInput,
        onBlur,
        onFocus,
        placeholder: __props.placeholder,
        color: __props.color,
        disabled: __props.disabled,
        class: "w-full pl-10",
        inputmode: "numeric"
      }, null, _parent));
      _push(`</div>`);
    };
  }
});

const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("inertia/components/admin/CurrencyInput.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as _ };
