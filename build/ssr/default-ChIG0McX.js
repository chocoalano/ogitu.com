import { computed, unref, mergeProps, withCtx, renderSlot, useSSRContext, defineComponent, ref, createTextVNode, createVNode, withModifiers, toDisplayString, useSlots, toRef, toHandlers, createBlock, createCommentVNode, openBlock, resolveDynamicComponent, mergeModels, useModel, watch, Fragment, renderList, onMounted, createSlots } from 'vue';
import { ssrRenderComponent, ssrRenderSlot, ssrRenderAttrs, ssrRenderList, ssrInterpolate, ssrRenderAttr, ssrRenderClass, ssrRenderVNode, ssrIncludeBooleanAttr } from 'vue/server-renderer';
import { Primitive, useForwardPropsEmits, DialogRoot, DialogTrigger, DialogPortal, DialogOverlay, DialogContent, VisuallyHidden, DialogTitle, DialogDescription, DialogClose } from 'reka-ui';
import { a as useAppConfig, d as useLocale, k as useRoute, n as getSlotChildrenText } from './virtual_nuxt-ui-plugins-BqI2j5ZJ.js';
import { t as tv, _ as _sfc_main$p, a as _sfc_main$r, n as _sfc_main$t, b as _sfc_main$u } from './Button-BBveOjhJ.js';
import { _ as _sfc_main$q, b as _export_sfc, g as usePortal, d as _sfc_main$v, a as _sfc_main$w, c as _sfc_main$x, u as useToast, e as _sfc_main$A, f as _sfc_main$B } from './Badge-DaOjA2YD.js';
import { defu } from 'defu';
import { reactivePick, createReusableTemplate } from '@vueuse/core';
import { _ as _sfc_main$s } from './Modal-lw8uQ47S.js';
import { DrawerRootNested, DrawerRoot, DrawerTrigger, DrawerPortal, DrawerOverlay, DrawerContent, DrawerHandle, DrawerTitle, DrawerDescription } from 'vaul-vue';
import { Link, router, usePage } from '@inertiajs/vue3';
import { _ as _sfc_main$z } from './DropdownMenu-DnaZdPLR.js';
import { _ as _sfc_main$y } from './Checkbox-9gbT5PLz.js';

const theme$4 = {
  "base": "min-h-[calc(100vh-var(--ui-header-height))]"
};

const _sfc_main$o = {
  __name: 'Main',
  __ssrInlineRender: true,
  props: {
  as: { type: null, required: false },
  class: { type: null, required: false }
},
  setup(__props) {

const props = __props;

const appConfig = useAppConfig();
const ui = computed(() => tv({ extend: tv(theme$4), ...appConfig.ui?.main || {} }));

return (_ctx, _push, _parent, _attrs) => {
  _push(ssrRenderComponent(unref(Primitive), mergeProps({
    as: __props.as,
    class: ui.value({ class: props.class })
  }, _attrs), {
    default: withCtx((_, _push, _parent, _scopeId) => {
      if (_push) {
        ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent, _scopeId);
      } else {
        return [
          renderSlot(_ctx.$slots, "default")
        ]
      }
    }),
    _: 3 /* FORWARDED */
  }, _parent));
}
}

};
const _sfc_setup$o = _sfc_main$o.setup;
_sfc_main$o.setup = (props, ctx) => {
  const ssrContext = useSSRContext()
  ;(ssrContext.modules || (ssrContext.modules = new Set())).add("node_modules/@nuxt/ui/dist/runtime/components/Main.vue");
  return _sfc_setup$o ? _sfc_setup$o(props, ctx) : undefined
};

const theme$3 = {
  "base": "w-full max-w-(--ui-container) mx-auto px-4 sm:px-6 lg:px-8"
};

const _sfc_main$n = {
  __name: 'Container',
  __ssrInlineRender: true,
  props: {
  as: { type: null, required: false },
  class: { type: null, required: false }
},
  setup(__props) {

const props = __props;

const appConfig = useAppConfig();
const ui = computed(() => tv({ extend: tv(theme$3), ...appConfig.ui?.container || {} }));

return (_ctx, _push, _parent, _attrs) => {
  _push(ssrRenderComponent(unref(Primitive), mergeProps({
    as: __props.as,
    class: ui.value({ class: props.class })
  }, _attrs), {
    default: withCtx((_, _push, _parent, _scopeId) => {
      if (_push) {
        ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent, _scopeId);
      } else {
        return [
          renderSlot(_ctx.$slots, "default")
        ]
      }
    }),
    _: 3 /* FORWARDED */
  }, _parent));
}
}

};
const _sfc_setup$n = _sfc_main$n.setup;
_sfc_main$n.setup = (props, ctx) => {
  const ssrContext = useSSRContext()
  ;(ssrContext.modules || (ssrContext.modules = new Set())).add("node_modules/@nuxt/ui/dist/runtime/components/Container.vue");
  return _sfc_setup$n ? _sfc_setup$n(props, ctx) : undefined
};

const _sfc_main$m = /* @__PURE__ */ defineComponent({
  __name: "NewsletterCTA",
  __ssrInlineRender: true,
  props: {
    initialEmail: { type: String, default: "" }
  },
  emits: ["subscribe"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const email = ref(props.initialEmail);
    const onSubmit = () => {
      if (email.value.trim()) emit("subscribe", email.value);
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UContainer = _sfc_main$n;
      const _component_UIcon = _sfc_main$p;
      const _component_UInput = _sfc_main$q;
      const _component_UButton = _sfc_main$r;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "bg-linear-to-r from-primary-600 via-primary-500 to-secondary-500" }, _attrs))}>`);
      _push(ssrRenderComponent(_component_UContainer, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="flex flex-col md:flex-row items-center justify-between gap-6 py-8"${_scopeId}><div class="text-center md:text-left"${_scopeId}><div class="flex items-center gap-2 justify-center md:justify-start mb-2"${_scopeId}>`);
            _push2(ssrRenderComponent(_component_UIcon, {
              name: "i-heroicons-envelope",
              class: "w-6 h-6 text-white"
            }, null, _parent2, _scopeId));
            _push2(`<h3 class="text-xl font-bold text-white"${_scopeId}>Berlangganan Newsletter</h3></div><p class="text-sm text-white/90"${_scopeId}>Dapatkan info promo eksklusif, flash sale, dan produk terbaru langsung ke email Anda!</p></div><form class="flex items-center gap-2 w-full md:w-auto md:min-w-100"${_scopeId}>`);
            _push2(ssrRenderComponent(_component_UInput, {
              modelValue: email.value,
              "onUpdate:modelValue": ($event) => email.value = $event,
              placeholder: "Masukkan email Anda",
              size: "lg",
              class: "flex-1",
              ui: { rounded: "rounded-lg" }
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_UButton, {
              type: "submit",
              size: "lg",
              class: "font-semibold"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`Subscribe`);
                } else {
                  return [
                    createTextVNode("Subscribe")
                  ];
                }
              }),
              _: 1
              /* STABLE */
            }, _parent2, _scopeId));
            _push2(`</form></div>`);
          } else {
            return [
              createVNode("div", { class: "flex flex-col md:flex-row items-center justify-between gap-6 py-8" }, [
                createVNode("div", { class: "text-center md:text-left" }, [
                  createVNode("div", { class: "flex items-center gap-2 justify-center md:justify-start mb-2" }, [
                    createVNode(_component_UIcon, {
                      name: "i-heroicons-envelope",
                      class: "w-6 h-6 text-white"
                    }),
                    createVNode("h3", { class: "text-xl font-bold text-white" }, "Berlangganan Newsletter")
                  ]),
                  createVNode("p", { class: "text-sm text-white/90" }, "Dapatkan info promo eksklusif, flash sale, dan produk terbaru langsung ke email Anda!")
                ]),
                createVNode(
                  "form",
                  {
                    onSubmit: withModifiers(onSubmit, ["prevent"]),
                    class: "flex items-center gap-2 w-full md:w-auto md:min-w-100"
                  },
                  [
                    createVNode(_component_UInput, {
                      modelValue: email.value,
                      "onUpdate:modelValue": ($event) => email.value = $event,
                      placeholder: "Masukkan email Anda",
                      size: "lg",
                      class: "flex-1",
                      ui: { rounded: "rounded-lg" }
                    }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                    createVNode(_component_UButton, {
                      type: "submit",
                      size: "lg",
                      class: "font-semibold"
                    }, {
                      default: withCtx(() => [
                        createTextVNode("Subscribe")
                      ]),
                      _: 1
                      /* STABLE */
                    })
                  ],
                  32
                  /* NEED_HYDRATION */
                )
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

const _sfc_setup$m = _sfc_main$m.setup;
_sfc_main$m.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("inertia/components/NewsletterCTA.vue");
  return _sfc_setup$m ? _sfc_setup$m(props, ctx) : void 0;
};

const _sfc_main$l = /* @__PURE__ */ defineComponent({
  __name: "SocialLinks",
  __ssrInlineRender: true,
  props: {
    variant: {},
    size: {}
  },
  setup(__props) {
    const props = __props;
    const variant = props.variant ?? "soft";
    const size = props.size ?? "sm";
    const socialLinks = [
      {
        name: "Instagram",
        url: "https://instagram.com/ogitu",
        icon: "i-lucide-instagram",
        color: "pink"
      },
      {
        name: "Facebook",
        url: "https://facebook.com/ogitu",
        icon: "i-lucide-facebook",
        color: "blue"
      },
      {
        name: "Twitter",
        url: "https://twitter.com/ogitu",
        icon: "i-lucide-twitter",
        color: "gray"
      },
      {
        name: "YouTube",
        url: "https://youtube.com/@ogitu",
        icon: "i-lucide-youtube",
        color: "red"
      }
    ];
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UButton = _sfc_main$r;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "flex items-center gap-2" }, _attrs))}><!--[-->`);
      ssrRenderList(socialLinks, (social) => {
        _push(ssrRenderComponent(_component_UButton, {
          key: social.name,
          href: social.url,
          target: "_blank",
          rel: "noopener noreferrer",
          variant: unref(variant),
          size: unref(size),
          color: social.color,
          icon: social.icon,
          "aria-label": social.name,
          square: ""
        }, null, _parent));
      });
      _push(`<!--]--></div>`);
    };
  }
});

const _sfc_setup$l = _sfc_main$l.setup;
_sfc_main$l.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("inertia/components/SocialLinks.vue");
  return _sfc_setup$l ? _sfc_setup$l(props, ctx) : void 0;
};

const _sfc_main$k = /* @__PURE__ */ defineComponent({
  __name: "FooterBrand",
  __ssrInlineRender: true,
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UIcon = _sfc_main$p;
      _push(`<div${ssrRenderAttrs(_attrs)}><div class="flex items-center gap-2 mb-4"><div class="w-10 h-10 rounded-xl bg-linear-to-br from-primary-500 to-secondary-500 flex items-center justify-center shadow-lg">`);
      _push(ssrRenderComponent(_component_UIcon, {
        name: "i-heroicons-bolt",
        class: "w-6 h-6 text-white"
      }, null, _parent));
      _push(`</div><div><div class="text-lg font-bold text-gray-900 dark:text-white">ogitu.com</div><div class="text-xs text-gray-600 dark:text-gray-400">Vape Marketplace Indonesia</div></div></div><p class="text-sm text-gray-600 dark:text-gray-400 leading-relaxed mb-4"> Platform marketplace vape &amp; rokok elektrik terpercaya dengan ratusan seller terbaik. Jaminan produk original, pengiriman cepat ke seluruh Indonesia. </p><div class="space-y-2 mb-4"><div class="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">`);
      _push(ssrRenderComponent(_component_UIcon, {
        name: "i-heroicons-phone",
        class: "w-4 h-4"
      }, null, _parent));
      _push(`<span>+62 812-3456-7890</span></div><div class="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">`);
      _push(ssrRenderComponent(_component_UIcon, {
        name: "i-heroicons-envelope",
        class: "w-4 h-4"
      }, null, _parent));
      _push(`<span>support@ogitu.com</span></div><div class="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">`);
      _push(ssrRenderComponent(_component_UIcon, {
        name: "i-heroicons-clock",
        class: "w-4 h-4"
      }, null, _parent));
      _push(`<span>Senin - Minggu (08:00 - 22:00)</span></div></div><div><div class="text-xs font-semibold text-gray-900 dark:text-white mb-2">Ikuti Kami</div>`);
      _push(ssrRenderComponent(_sfc_main$l, {
        variant: "soft",
        size: "sm"
      }, null, _parent));
      _push(`</div></div>`);
    };
  }
});

const _sfc_setup$k = _sfc_main$k.setup;
_sfc_main$k.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("inertia/components/FooterBrand.vue");
  return _sfc_setup$k ? _sfc_setup$k(props, ctx) : void 0;
};

const _sfc_main$j = /* @__PURE__ */ defineComponent({
  __name: "FooterLinksColumn",
  __ssrInlineRender: true,
  props: {
    title: {},
    links: {}
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UIcon = _sfc_main$p;
      _push(`<div${ssrRenderAttrs(_attrs)}><h4 class="text-sm font-bold text-gray-900 dark:text-white mb-4">${ssrInterpolate(__props.title)}</h4><ul class="space-y-2.5"><!--[-->`);
      ssrRenderList(__props.links, (link) => {
        _push(`<li><a${ssrRenderAttr("href", link.to)} class="text-sm text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors flex items-center gap-1.5">`);
        _push(ssrRenderComponent(_component_UIcon, {
          name: "i-heroicons-chevron-right",
          class: "w-3 h-3"
        }, null, _parent));
        _push(`${ssrInterpolate(link.label)}</a></li>`);
      });
      _push(`<!--]--></ul></div>`);
    };
  }
});

const _sfc_setup$j = _sfc_main$j.setup;
_sfc_main$j.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("inertia/components/FooterLinksColumn.vue");
  return _sfc_setup$j ? _sfc_setup$j(props, ctx) : void 0;
};

const _sfc_main$i = /* @__PURE__ */ defineComponent({
  __name: "AppDownload",
  __ssrInlineRender: true,
  setup(__props) {
    const appStores = [
      {
        name: "Google Play",
        url: "https://play.google.com",
        icon: "i-heroicons-device-phone-mobile",
        platform: "Google Play"
      },
      {
        name: "App Store",
        url: "https://apps.apple.com",
        icon: "i-heroicons-device-phone-mobile",
        platform: "App Store"
      }
    ];
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UIcon = _sfc_main$p;
      _push(`<div${ssrRenderAttrs(_attrs)}><h4 class="text-sm font-bold text-gray-900 dark:text-white mb-4">Download Aplikasi</h4><div class="space-y-3 mb-4"><!--[-->`);
      ssrRenderList(appStores, (store) => {
        _push(`<a${ssrRenderAttr("href", store.url)} target="_blank" rel="noopener noreferrer" class="flex items-center gap-3 p-3 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-primary-500 dark:hover:border-primary-500 transition-colors group">`);
        _push(ssrRenderComponent(_component_UIcon, {
          name: store.icon,
          class: "w-6 h-6 text-gray-900 dark:text-white group-hover:text-primary-600"
        }, null, _parent));
        _push(`<div><div class="text-[10px] text-gray-600 dark:text-gray-400">Download on</div><div class="text-xs font-semibold text-gray-900 dark:text-white">${ssrInterpolate(store.platform)}</div></div></a>`);
      });
      _push(`<!--]--></div><!-- QR Code --><div class="p-3 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 text-center"><div class="w-20 h-20 mx-auto bg-gray-100 dark:bg-gray-700 rounded flex items-center justify-center mb-2">`);
      _push(ssrRenderComponent(_component_UIcon, {
        name: "i-heroicons-qr-code",
        class: "w-12 h-12 text-gray-400"
      }, null, _parent));
      _push(`</div><p class="text-[10px] text-gray-600 dark:text-gray-400">Scan untuk download</p></div></div>`);
    };
  }
});

const _sfc_setup$i = _sfc_main$i.setup;
_sfc_main$i.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("inertia/components/AppDownload.vue");
  return _sfc_setup$i ? _sfc_setup$i(props, ctx) : void 0;
};

/* unplugin-vue-components disabled */const _sfc_main$h = {  };

function _sfc_ssrRender$4(_ctx, _push, _parent, _attrs) {
  _push(`<div${ssrRenderAttrs(_attrs)}><div class="text-xs font-semibold text-gray-900 dark:text-white mb-3">Metode Pembayaran</div><div class="flex flex-wrap items-center gap-2"><div class="px-3 py-1.5 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded text-xs text-gray-700 dark:text-gray-300">Midtrans</div><div class="px-3 py-1.5 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded text-xs text-gray-700 dark:text-gray-300">Gopay</div><div class="px-3 py-1.5 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded text-xs text-gray-700 dark:text-gray-300">OVO</div><div class="px-3 py-1.5 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded text-xs text-gray-700 dark:text-gray-300">DANA</div><div class="px-3 py-1.5 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded text-xs text-gray-700 dark:text-gray-300">ShopeePay</div><div class="px-3 py-1.5 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded text-xs text-gray-700 dark:text-gray-300">Transfer Bank</div><div class="px-3 py-1.5 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded text-xs text-gray-700 dark:text-gray-300">Kartu Kredit/Debit</div></div></div>`);
}
const _sfc_setup$h = _sfc_main$h.setup;
_sfc_main$h.setup = (props, ctx) => {
  const ssrContext = useSSRContext()
  ;(ssrContext.modules || (ssrContext.modules = new Set())).add("inertia/components/PaymentMethods.vue");
  return _sfc_setup$h ? _sfc_setup$h(props, ctx) : undefined
};
const PaymentMethods = /*#__PURE__*/_export_sfc(_sfc_main$h, [['ssrRender',_sfc_ssrRender$4]]);

/* unplugin-vue-components disabled */const _sfc_main$g = {  };

function _sfc_ssrRender$3(_ctx, _push, _parent, _attrs) {
  _push(`<div${ssrRenderAttrs(_attrs)}><div class="text-xs font-semibold text-gray-900 dark:text-white mb-3">Jasa Pengiriman (RajaOngkir)</div><div class="flex flex-wrap items-center gap-2"><div class="px-3 py-1.5 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded text-xs text-gray-700 dark:text-gray-300">JNE</div><div class="px-3 py-1.5 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded text-xs text-gray-700 dark:text-gray-300">JNT</div><div class="px-3 py-1.5 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded text-xs text-gray-700 dark:text-gray-300">SiCepat</div><div class="px-3 py-1.5 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded text-xs text-gray-700 dark:text-gray-300">Anteraja</div><div class="px-3 py-1.5 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded text-xs text-gray-700 dark:text-gray-300">Ninja Xpress</div><div class="px-3 py-1.5 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded text-xs text-gray-700 dark:text-gray-300">POS Indonesia</div></div></div>`);
}
const _sfc_setup$g = _sfc_main$g.setup;
_sfc_main$g.setup = (props, ctx) => {
  const ssrContext = useSSRContext()
  ;(ssrContext.modules || (ssrContext.modules = new Set())).add("inertia/components/ShippingPartners.vue");
  return _sfc_setup$g ? _sfc_setup$g(props, ctx) : undefined
};
const ShippingPartners = /*#__PURE__*/_export_sfc(_sfc_main$g, [['ssrRender',_sfc_ssrRender$3]]);

const _sfc_main$f = {  };

function _sfc_ssrRender$2(_ctx, _push, _parent, _attrs) {
  const _component_UContainer = _sfc_main$n;

  _push(`<div${ssrRenderAttrs(mergeProps({ class: "border-t border-gray-200 dark:border-gray-800 bg-gray-100 dark:bg-gray-950" }, _attrs))}>`);
  _push(ssrRenderComponent(_component_UContainer, null, {
    default: withCtx((_, _push, _parent, _scopeId) => {
      if (_push) {
        _push(`<div class="flex flex-col md:flex-row items-center justify-between gap-4 py-4"${
          _scopeId
        }><div class="text-xs text-gray-600 dark:text-gray-400 text-center md:text-left"${
          _scopeId
        }> © ${
          ssrInterpolate(new Date().getFullYear())
        } <span class="font-semibold"${
          _scopeId
        }>ogitu.com</span> — Marketplace Vape &amp; Rokok Elektrik Indonesia. Semua hak cipta dilindungi. </div><div class="flex flex-wrap items-center justify-center gap-4 text-xs text-gray-600 dark:text-gray-400"${
          _scopeId
        }><a href="/terms" class="hover:text-primary-600 dark:hover:text-primary-400 transition-colors"${
          _scopeId
        }>Syarat &amp; Ketentuan</a><span class="text-gray-300 dark:text-gray-700"${
          _scopeId
        }>•</span><a href="/privacy" class="hover:text-primary-600 dark:hover:text-primary-400 transition-colors"${
          _scopeId
        }>Kebijakan Privasi</a><span class="text-gray-300 dark:text-gray-700"${
          _scopeId
        }>•</span><a href="/cookies" class="hover:text-primary-600 dark:hover:text-primary-400 transition-colors"${
          _scopeId
        }>Kebijakan Cookie</a><span class="text-gray-300 dark:text-gray-700"${
          _scopeId
        }>•</span><a href="/disclaimer" class="hover:text-primary-600 dark:hover:text-primary-400 transition-colors"${
          _scopeId
        }>Disclaimer</a></div></div>`);
      } else {
        return [
          createVNode("div", { class: "flex flex-col md:flex-row items-center justify-between gap-4 py-4" }, [
            createVNode("div", { class: "text-xs text-gray-600 dark:text-gray-400 text-center md:text-left" }, [
              createTextVNode(" © " + toDisplayString(new Date().getFullYear()) + " ", 1 /* TEXT */),
              createVNode("span", { class: "font-semibold" }, "ogitu.com"),
              createTextVNode(" — Marketplace Vape & Rokok Elektrik Indonesia. Semua hak cipta dilindungi. ")
            ]),
            createVNode("div", { class: "flex flex-wrap items-center justify-center gap-4 text-xs text-gray-600 dark:text-gray-400" }, [
              createVNode("a", {
                href: "/terms",
                class: "hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
              }, "Syarat & Ketentuan"),
              createVNode("span", { class: "text-gray-300 dark:text-gray-700" }, "•"),
              createVNode("a", {
                href: "/privacy",
                class: "hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
              }, "Kebijakan Privasi"),
              createVNode("span", { class: "text-gray-300 dark:text-gray-700" }, "•"),
              createVNode("a", {
                href: "/cookies",
                class: "hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
              }, "Kebijakan Cookie"),
              createVNode("span", { class: "text-gray-300 dark:text-gray-700" }, "•"),
              createVNode("a", {
                href: "/disclaimer",
                class: "hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
              }, "Disclaimer")
            ])
          ])
        ]
      }
    }),
    _: 1 /* STABLE */
  }, _parent));
  _push(`</div>`);
}
const _sfc_setup$f = _sfc_main$f.setup;
_sfc_main$f.setup = (props, ctx) => {
  const ssrContext = useSSRContext()
  ;(ssrContext.modules || (ssrContext.modules = new Set())).add("inertia/components/LegalBar.vue");
  return _sfc_setup$f ? _sfc_setup$f(props, ctx) : undefined
};
const LegalBar = /*#__PURE__*/_export_sfc(_sfc_main$f, [['ssrRender',_sfc_ssrRender$2]]);

const _sfc_main$e = /* @__PURE__ */ defineComponent({
  __name: "Footer",
  __ssrInlineRender: true,
  setup(__props) {
    const subscribed = ref(false);
    const subscribe = () => {
      subscribed.value = true;
      alert("Terima kasih! Anda telah berlangganan newsletter.");
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UContainer = _sfc_main$n;
      _push(`<footer${ssrRenderAttrs(mergeProps({ class: "bg-gray-50 dark:bg-gray-900" }, _attrs))}><!-- Newsletter CTA -->`);
      _push(ssrRenderComponent(_sfc_main$m, { onSubscribe: subscribe }, null, _parent));
      _push(`<!-- Main Footer Content --><div class="border-t border-gray-200 dark:border-gray-800">`);
      _push(ssrRenderComponent(_component_UContainer, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-8 py-12"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$k, { class: "lg:col-span-2" }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$j, {
              title: "Kategori",
              links: [
                { label: "Pod System", to: "/collections/pod-system" },
                { label: "Mod & Kit", to: "/collections/mod-kit" },
                { label: "Liquid Premium", to: "/collections/liquid-premium" },
                { label: "Salt Nic", to: "/collections/salt-nicotine" },
                { label: "Coil & Atomizer", to: "/collections/atomizer-coil" },
                { label: "Aksesoris", to: "/collections/accessories" }
              ]
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$j, {
              title: "Layanan Pelanggan",
              links: [
                { label: "Pusat Bantuan", to: "/help" },
                { label: "Lacak Pesanan", to: "/track" },
                { label: "Cara Belanja", to: "/shipping" },
                { label: "Metode Pembayaran", to: "/payment" },
                { label: "Pengembalian", to: "/returns" },
                { label: "Hubungi Kami", to: "/contact" }
              ]
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$j, {
              title: "Tentang ogitu.com",
              links: [
                { label: "Tentang Kami", to: "/about" },
                { label: "Blog & Artikel", to: "/blog" },
                { label: "Karir", to: "/careers" },
                { label: "Press Release", to: "/press" },
                { label: "Program Afiliasi", to: "/affiliate" }
              ]
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$i, null, null, _parent2, _scopeId));
            _push2(`</div>`);
          } else {
            return [
              createVNode("div", { class: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-8 py-12" }, [
                createVNode(_sfc_main$k, { class: "lg:col-span-2" }),
                createVNode(_sfc_main$j, {
                  title: "Kategori",
                  links: [
                    { label: "Pod System", to: "/collections/pod-system" },
                    { label: "Mod & Kit", to: "/collections/mod-kit" },
                    { label: "Liquid Premium", to: "/collections/liquid-premium" },
                    { label: "Salt Nic", to: "/collections/salt-nicotine" },
                    { label: "Coil & Atomizer", to: "/collections/atomizer-coil" },
                    { label: "Aksesoris", to: "/collections/accessories" }
                  ]
                }),
                createVNode(_sfc_main$j, {
                  title: "Layanan Pelanggan",
                  links: [
                    { label: "Pusat Bantuan", to: "/help" },
                    { label: "Lacak Pesanan", to: "/track" },
                    { label: "Cara Belanja", to: "/shipping" },
                    { label: "Metode Pembayaran", to: "/payment" },
                    { label: "Pengembalian", to: "/returns" },
                    { label: "Hubungi Kami", to: "/contact" }
                  ]
                }),
                createVNode(_sfc_main$j, {
                  title: "Tentang ogitu.com",
                  links: [
                    { label: "Tentang Kami", to: "/about" },
                    { label: "Blog & Artikel", to: "/blog" },
                    { label: "Karir", to: "/careers" },
                    { label: "Press Release", to: "/press" },
                    { label: "Program Afiliasi", to: "/affiliate" }
                  ]
                }),
                createVNode(_sfc_main$i)
              ])
            ];
          }
        }),
        _: 1
        /* STABLE */
      }, _parent));
      _push(`</div><!-- Payment & Shipping --><div class="border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950">`);
      _push(ssrRenderComponent(_component_UContainer, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="grid grid-cols-1 md:grid-cols-2 gap-6 py-6"${_scopeId}>`);
            _push2(ssrRenderComponent(PaymentMethods, null, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(ShippingPartners, null, null, _parent2, _scopeId));
            _push2(`</div>`);
          } else {
            return [
              createVNode("div", { class: "grid grid-cols-1 md:grid-cols-2 gap-6 py-6" }, [
                createVNode(PaymentMethods),
                createVNode(ShippingPartners)
              ])
            ];
          }
        }),
        _: 1
        /* STABLE */
      }, _parent));
      _push(`</div><!-- Legal Bar -->`);
      _push(ssrRenderComponent(LegalBar, null, null, _parent));
      _push(`</footer>`);
    };
  }
});

const _sfc_setup$e = _sfc_main$e.setup;
_sfc_main$e.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("inertia/layouts/ecommerce/Footer.vue");
  return _sfc_setup$e ? _sfc_setup$e(props, ctx) : void 0;
};

const theme$2 = {
  "slots": {
    "overlay": "fixed inset-0 bg-elevated/75",
    "content": "fixed bg-default divide-y divide-default sm:ring ring-default sm:shadow-lg flex flex-col focus:outline-none",
    "header": "flex items-center gap-1.5 p-4 sm:px-6 min-h-16",
    "wrapper": "",
    "body": "flex-1 overflow-y-auto p-4 sm:p-6",
    "footer": "flex items-center gap-1.5 p-4 sm:px-6",
    "title": "text-highlighted font-semibold",
    "description": "mt-1 text-muted text-sm",
    "close": "absolute top-4 end-4"
  },
  "variants": {
    "side": {
      "top": {
        "content": "inset-x-0 top-0 max-h-full"
      },
      "right": {
        "content": "right-0 inset-y-0 w-full max-w-md"
      },
      "bottom": {
        "content": "inset-x-0 bottom-0 max-h-full"
      },
      "left": {
        "content": "left-0 inset-y-0 w-full max-w-md"
      }
    },
    "transition": {
      "true": {
        "overlay": "data-[state=open]:animate-[fade-in_200ms_ease-out] data-[state=closed]:animate-[fade-out_200ms_ease-in]"
      }
    }
  },
  "compoundVariants": [
    {
      "transition": true,
      "side": "top",
      "class": {
        "content": "data-[state=open]:animate-[slide-in-from-top_200ms_ease-in-out] data-[state=closed]:animate-[slide-out-to-top_200ms_ease-in-out]"
      }
    },
    {
      "transition": true,
      "side": "right",
      "class": {
        "content": "data-[state=open]:animate-[slide-in-from-right_200ms_ease-in-out] data-[state=closed]:animate-[slide-out-to-right_200ms_ease-in-out]"
      }
    },
    {
      "transition": true,
      "side": "bottom",
      "class": {
        "content": "data-[state=open]:animate-[slide-in-from-bottom_200ms_ease-in-out] data-[state=closed]:animate-[slide-out-to-bottom_200ms_ease-in-out]"
      }
    },
    {
      "transition": true,
      "side": "left",
      "class": {
        "content": "data-[state=open]:animate-[slide-in-from-left_200ms_ease-in-out] data-[state=closed]:animate-[slide-out-to-left_200ms_ease-in-out]"
      }
    }
  ]
};

const _sfc_main$d = {
  __name: 'Slideover',
  __ssrInlineRender: true,
  props: {
  title: { type: String, required: false },
  description: { type: String, required: false },
  content: { type: Object, required: false },
  overlay: { type: Boolean, required: false, default: true },
  transition: { type: Boolean, required: false, default: true },
  side: { type: null, required: false, default: "right" },
  portal: { type: [Boolean, String], required: false, skipCheck: true, default: true },
  close: { type: [Boolean, Object], required: false, default: true },
  closeIcon: { type: null, required: false },
  dismissible: { type: Boolean, required: false, default: true },
  class: { type: null, required: false },
  ui: { type: null, required: false },
  open: { type: Boolean, required: false },
  defaultOpen: { type: Boolean, required: false },
  modal: { type: Boolean, required: false, default: true }
},
  emits: ["after:leave", "after:enter", "close:prevent", "update:open"],
  setup(__props, { emit: __emit }) {

const props = __props;
const emits = __emit;
const slots = useSlots();
const { t } = useLocale();
const appConfig = useAppConfig();
const rootProps = useForwardPropsEmits(reactivePick(props, "open", "defaultOpen", "modal"), emits);
const portalProps = usePortal(toRef(() => props.portal));
const contentProps = toRef(() => props.content);
const contentEvents = computed(() => {
  if (!props.dismissible) {
    const events = ["pointerDownOutside", "interactOutside", "escapeKeyDown"];
    return events.reduce((acc, curr) => {
      acc[curr] = (e) => {
        e.preventDefault();
        emits("close:prevent");
      };
      return acc;
    }, {});
  }
  return {};
});
const ui = computed(() => tv({ extend: tv(theme$2), ...appConfig.ui?.slideover || {} })({
  transition: props.transition,
  side: props.side
}));

return (_ctx, _push, _parent, _attrs) => {
  _push(ssrRenderComponent(unref(DialogRoot), mergeProps(unref(rootProps), _attrs), {
    default: withCtx(({ open, close }, _push, _parent, _scopeId) => {
      if (_push) {
        if (!!slots.default) {
          _push(ssrRenderComponent(unref(DialogTrigger), {
            "as-child": "",
            class: props.class
          }, {
            default: withCtx((_, _push, _parent, _scopeId) => {
              if (_push) {
                ssrRenderSlot(_ctx.$slots, "default", { open: open }, null, _push, _parent, _scopeId);
              } else {
                return [
                  renderSlot(_ctx.$slots, "default", { open: open })
                ]
              }
            }),
            _: 2 /* DYNAMIC */
          }, _parent, _scopeId));
        } else {
          _push(`<!---->`);
        }
        _push(ssrRenderComponent(unref(DialogPortal), unref(portalProps), {
          default: withCtx((_, _push, _parent, _scopeId) => {
            if (_push) {
              if (__props.overlay) {
                _push(ssrRenderComponent(unref(DialogOverlay), {
                  "data-slot": "overlay",
                  class: ui.value.overlay({ class: props.ui?.overlay })
                }, null, _parent, _scopeId));
              } else {
                _push(`<!---->`);
              }
              _push(ssrRenderComponent(unref(DialogContent), mergeProps({
                "data-side": __props.side,
                "data-slot": "content",
                class: ui.value.content({ class: [!slots.default && props.class, props.ui?.content] })
              }, contentProps.value, {
                onAfterEnter: $event => (emits('after:enter')),
                onAfterLeave: $event => (emits('after:leave'))
              }, toHandlers(contentEvents.value)), {
                default: withCtx((_, _push, _parent, _scopeId) => {
                  if (_push) {
                    if (!!slots.content && (__props.title || !!slots.title || (__props.description || !!slots.description))) {
                      _push(ssrRenderComponent(unref(VisuallyHidden), null, {
                        default: withCtx((_, _push, _parent, _scopeId) => {
                          if (_push) {
                            if (__props.title || !!slots.title) {
                              _push(ssrRenderComponent(unref(DialogTitle), null, {
                                default: withCtx((_, _push, _parent, _scopeId) => {
                                  if (_push) {
                                    ssrRenderSlot(_ctx.$slots, "title", {}, () => {
                                      _push(`${ssrInterpolate(__props.title)}`);
                                    }, _push, _parent, _scopeId);
                                  } else {
                                    return [
                                      renderSlot(_ctx.$slots, "title", {}, () => [
                                        createTextVNode(toDisplayString(__props.title), 1 /* TEXT */)
                                      ])
                                    ]
                                  }
                                }),
                                _: 2 /* DYNAMIC */
                              }, _parent, _scopeId));
                            } else {
                              _push(`<!---->`);
                            }
                            if (__props.description || !!slots.description) {
                              _push(ssrRenderComponent(unref(DialogDescription), null, {
                                default: withCtx((_, _push, _parent, _scopeId) => {
                                  if (_push) {
                                    ssrRenderSlot(_ctx.$slots, "description", {}, () => {
                                      _push(`${ssrInterpolate(__props.description)}`);
                                    }, _push, _parent, _scopeId);
                                  } else {
                                    return [
                                      renderSlot(_ctx.$slots, "description", {}, () => [
                                        createTextVNode(toDisplayString(__props.description), 1 /* TEXT */)
                                      ])
                                    ]
                                  }
                                }),
                                _: 2 /* DYNAMIC */
                              }, _parent, _scopeId));
                            } else {
                              _push(`<!---->`);
                            }
                          } else {
                            return [
                              (__props.title || !!slots.title)
                                ? (openBlock(), createBlock(unref(DialogTitle), { key: 0 }, {
                                    default: withCtx(() => [
                                      renderSlot(_ctx.$slots, "title", {}, () => [
                                        createTextVNode(toDisplayString(__props.title), 1 /* TEXT */)
                                      ])
                                    ]),
                                    _: 3 /* FORWARDED */
                                  }))
                                : createCommentVNode("v-if", true),
                              (__props.description || !!slots.description)
                                ? (openBlock(), createBlock(unref(DialogDescription), { key: 1 }, {
                                    default: withCtx(() => [
                                      renderSlot(_ctx.$slots, "description", {}, () => [
                                        createTextVNode(toDisplayString(__props.description), 1 /* TEXT */)
                                      ])
                                    ]),
                                    _: 3 /* FORWARDED */
                                  }))
                                : createCommentVNode("v-if", true)
                            ]
                          }
                        }),
                        _: 2 /* DYNAMIC */
                      }, _parent, _scopeId));
                    } else {
                      _push(`<!---->`);
                    }
                    ssrRenderSlot(_ctx.$slots, "content", { close: close }, () => {
                      if (!!slots.header || (__props.title || !!slots.title) || (__props.description || !!slots.description) || (props.close || !!slots.close)) {
                        _push(`<div data-slot="header" class="${
                          ssrRenderClass(ui.value.header({ class: props.ui?.header }))
                        }"${
                          _scopeId
                        }>`);
                        ssrRenderSlot(_ctx.$slots, "header", { close: close }, () => {
                          _push(`<div data-slot="wrapper" class="${
                            ssrRenderClass(ui.value.wrapper({ class: props.ui?.wrapper }))
                          }"${
                            _scopeId
                          }>`);
                          if (__props.title || !!slots.title) {
                            _push(ssrRenderComponent(unref(DialogTitle), {
                              "data-slot": "title",
                              class: ui.value.title({ class: props.ui?.title })
                            }, {
                              default: withCtx((_, _push, _parent, _scopeId) => {
                                if (_push) {
                                  ssrRenderSlot(_ctx.$slots, "title", {}, () => {
                                    _push(`${ssrInterpolate(__props.title)}`);
                                  }, _push, _parent, _scopeId);
                                } else {
                                  return [
                                    renderSlot(_ctx.$slots, "title", {}, () => [
                                      createTextVNode(toDisplayString(__props.title), 1 /* TEXT */)
                                    ])
                                  ]
                                }
                              }),
                              _: 2 /* DYNAMIC */
                            }, _parent, _scopeId));
                          } else {
                            _push(`<!---->`);
                          }
                          if (__props.description || !!slots.description) {
                            _push(ssrRenderComponent(unref(DialogDescription), {
                              "data-slot": "description",
                              class: ui.value.description({ class: props.ui?.description })
                            }, {
                              default: withCtx((_, _push, _parent, _scopeId) => {
                                if (_push) {
                                  ssrRenderSlot(_ctx.$slots, "description", {}, () => {
                                    _push(`${ssrInterpolate(__props.description)}`);
                                  }, _push, _parent, _scopeId);
                                } else {
                                  return [
                                    renderSlot(_ctx.$slots, "description", {}, () => [
                                      createTextVNode(toDisplayString(__props.description), 1 /* TEXT */)
                                    ])
                                  ]
                                }
                              }),
                              _: 2 /* DYNAMIC */
                            }, _parent, _scopeId));
                          } else {
                            _push(`<!---->`);
                          }
                          _push(`</div>`);
                          ssrRenderSlot(_ctx.$slots, "actions", {}, null, _push, _parent, _scopeId);
                          if (props.close || !!slots.close) {
                            _push(ssrRenderComponent(unref(DialogClose), { "as-child": "" }, {
                              default: withCtx((_, _push, _parent, _scopeId) => {
                                if (_push) {
                                  ssrRenderSlot(_ctx.$slots, "close", { ui: ui.value }, () => {
                                    if (props.close) {
                                      _push(ssrRenderComponent(_sfc_main$r, mergeProps({
                                        icon: __props.closeIcon || unref(appConfig).ui.icons.close,
                                        color: "neutral",
                                        variant: "ghost",
                                        "aria-label": unref(t)('slideover.close')
                                      }, typeof props.close === 'object' ? props.close : {}, {
                                        "data-slot": "close",
                                        class: ui.value.close({ class: props.ui?.close })
                                      }), null, _parent, _scopeId));
                                    } else {
                                      _push(`<!---->`);
                                    }
                                  }, _push, _parent, _scopeId);
                                } else {
                                  return [
                                    renderSlot(_ctx.$slots, "close", { ui: ui.value }, () => [
                                      (props.close)
                                        ? (openBlock(), createBlock(_sfc_main$r, mergeProps({
                                            key: 0,
                                            icon: __props.closeIcon || unref(appConfig).ui.icons.close,
                                            color: "neutral",
                                            variant: "ghost",
                                            "aria-label": unref(t)('slideover.close')
                                          }, typeof props.close === 'object' ? props.close : {}, {
                                            "data-slot": "close",
                                            class: ui.value.close({ class: props.ui?.close })
                                          }), null, 16 /* FULL_PROPS */, ["icon", "aria-label", "class"]))
                                        : createCommentVNode("v-if", true)
                                    ])
                                  ]
                                }
                              }),
                              _: 2 /* DYNAMIC */
                            }, _parent, _scopeId));
                          } else {
                            _push(`<!---->`);
                          }
                        }, _push, _parent, _scopeId);
                        _push(`</div>`);
                      } else {
                        _push(`<!---->`);
                      }
                      _push(`<div data-slot="body" class="${
                        ssrRenderClass(ui.value.body({ class: props.ui?.body }))
                      }"${
                        _scopeId
                      }>`);
                      ssrRenderSlot(_ctx.$slots, "body", { close: close }, null, _push, _parent, _scopeId);
                      _push(`</div>`);
                      if (!!slots.footer) {
                        _push(`<div data-slot="footer" class="${
                          ssrRenderClass(ui.value.footer({ class: props.ui?.footer }))
                        }"${
                          _scopeId
                        }>`);
                        ssrRenderSlot(_ctx.$slots, "footer", { close: close }, null, _push, _parent, _scopeId);
                        _push(`</div>`);
                      } else {
                        _push(`<!---->`);
                      }
                    }, _push, _parent, _scopeId);
                  } else {
                    return [
                      (!!slots.content && (__props.title || !!slots.title || (__props.description || !!slots.description)))
                        ? (openBlock(), createBlock(unref(VisuallyHidden), { key: 0 }, {
                            default: withCtx(() => [
                              (__props.title || !!slots.title)
                                ? (openBlock(), createBlock(unref(DialogTitle), { key: 0 }, {
                                    default: withCtx(() => [
                                      renderSlot(_ctx.$slots, "title", {}, () => [
                                        createTextVNode(toDisplayString(__props.title), 1 /* TEXT */)
                                      ])
                                    ]),
                                    _: 3 /* FORWARDED */
                                  }))
                                : createCommentVNode("v-if", true),
                              (__props.description || !!slots.description)
                                ? (openBlock(), createBlock(unref(DialogDescription), { key: 1 }, {
                                    default: withCtx(() => [
                                      renderSlot(_ctx.$slots, "description", {}, () => [
                                        createTextVNode(toDisplayString(__props.description), 1 /* TEXT */)
                                      ])
                                    ]),
                                    _: 3 /* FORWARDED */
                                  }))
                                : createCommentVNode("v-if", true)
                            ]),
                            _: 3 /* FORWARDED */
                          }))
                        : createCommentVNode("v-if", true),
                      renderSlot(_ctx.$slots, "content", { close: close }, () => [
                        (!!slots.header || (__props.title || !!slots.title) || (__props.description || !!slots.description) || (props.close || !!slots.close))
                          ? (openBlock(), createBlock("div", {
                              key: 0,
                              "data-slot": "header",
                              class: ui.value.header({ class: props.ui?.header })
                            }, [
                              renderSlot(_ctx.$slots, "header", { close: close }, () => [
                                createVNode("div", {
                                  "data-slot": "wrapper",
                                  class: ui.value.wrapper({ class: props.ui?.wrapper })
                                }, [
                                  (__props.title || !!slots.title)
                                    ? (openBlock(), createBlock(unref(DialogTitle), {
                                        key: 0,
                                        "data-slot": "title",
                                        class: ui.value.title({ class: props.ui?.title })
                                      }, {
                                        default: withCtx(() => [
                                          renderSlot(_ctx.$slots, "title", {}, () => [
                                            createTextVNode(toDisplayString(__props.title), 1 /* TEXT */)
                                          ])
                                        ]),
                                        _: 3 /* FORWARDED */
                                      }, 8 /* PROPS */, ["class"]))
                                    : createCommentVNode("v-if", true),
                                  (__props.description || !!slots.description)
                                    ? (openBlock(), createBlock(unref(DialogDescription), {
                                        key: 1,
                                        "data-slot": "description",
                                        class: ui.value.description({ class: props.ui?.description })
                                      }, {
                                        default: withCtx(() => [
                                          renderSlot(_ctx.$slots, "description", {}, () => [
                                            createTextVNode(toDisplayString(__props.description), 1 /* TEXT */)
                                          ])
                                        ]),
                                        _: 3 /* FORWARDED */
                                      }, 8 /* PROPS */, ["class"]))
                                    : createCommentVNode("v-if", true)
                                ], 2 /* CLASS */),
                                renderSlot(_ctx.$slots, "actions"),
                                (props.close || !!slots.close)
                                  ? (openBlock(), createBlock(unref(DialogClose), {
                                      key: 0,
                                      "as-child": ""
                                    }, {
                                      default: withCtx(() => [
                                        renderSlot(_ctx.$slots, "close", { ui: ui.value }, () => [
                                          (props.close)
                                            ? (openBlock(), createBlock(_sfc_main$r, mergeProps({
                                                key: 0,
                                                icon: __props.closeIcon || unref(appConfig).ui.icons.close,
                                                color: "neutral",
                                                variant: "ghost",
                                                "aria-label": unref(t)('slideover.close')
                                              }, typeof props.close === 'object' ? props.close : {}, {
                                                "data-slot": "close",
                                                class: ui.value.close({ class: props.ui?.close })
                                              }), null, 16 /* FULL_PROPS */, ["icon", "aria-label", "class"]))
                                            : createCommentVNode("v-if", true)
                                        ])
                                      ]),
                                      _: 2 /* DYNAMIC */
                                    }, 1024 /* DYNAMIC_SLOTS */))
                                  : createCommentVNode("v-if", true)
                              ])
                            ], 2 /* CLASS */))
                          : createCommentVNode("v-if", true),
                        createVNode("div", {
                          "data-slot": "body",
                          class: ui.value.body({ class: props.ui?.body })
                        }, [
                          renderSlot(_ctx.$slots, "body", { close: close })
                        ], 2 /* CLASS */),
                        (!!slots.footer)
                          ? (openBlock(), createBlock("div", {
                              key: 1,
                              "data-slot": "footer",
                              class: ui.value.footer({ class: props.ui?.footer })
                            }, [
                              renderSlot(_ctx.$slots, "footer", { close: close })
                            ], 2 /* CLASS */))
                          : createCommentVNode("v-if", true)
                      ])
                    ]
                  }
                }),
                _: 2 /* DYNAMIC */
              }, _parent, _scopeId));
            } else {
              return [
                (__props.overlay)
                  ? (openBlock(), createBlock(unref(DialogOverlay), {
                      key: 0,
                      "data-slot": "overlay",
                      class: ui.value.overlay({ class: props.ui?.overlay })
                    }, null, 8 /* PROPS */, ["class"]))
                  : createCommentVNode("v-if", true),
                createVNode(unref(DialogContent), mergeProps({
                  "data-side": __props.side,
                  "data-slot": "content",
                  class: ui.value.content({ class: [!slots.default && props.class, props.ui?.content] })
                }, contentProps.value, {
                  onAfterEnter: $event => (emits('after:enter')),
                  onAfterLeave: $event => (emits('after:leave'))
                }, toHandlers(contentEvents.value)), {
                  default: withCtx(() => [
                    (!!slots.content && (__props.title || !!slots.title || (__props.description || !!slots.description)))
                      ? (openBlock(), createBlock(unref(VisuallyHidden), { key: 0 }, {
                          default: withCtx(() => [
                            (__props.title || !!slots.title)
                              ? (openBlock(), createBlock(unref(DialogTitle), { key: 0 }, {
                                  default: withCtx(() => [
                                    renderSlot(_ctx.$slots, "title", {}, () => [
                                      createTextVNode(toDisplayString(__props.title), 1 /* TEXT */)
                                    ])
                                  ]),
                                  _: 3 /* FORWARDED */
                                }))
                              : createCommentVNode("v-if", true),
                            (__props.description || !!slots.description)
                              ? (openBlock(), createBlock(unref(DialogDescription), { key: 1 }, {
                                  default: withCtx(() => [
                                    renderSlot(_ctx.$slots, "description", {}, () => [
                                      createTextVNode(toDisplayString(__props.description), 1 /* TEXT */)
                                    ])
                                  ]),
                                  _: 3 /* FORWARDED */
                                }))
                              : createCommentVNode("v-if", true)
                          ]),
                          _: 3 /* FORWARDED */
                        }))
                      : createCommentVNode("v-if", true),
                    renderSlot(_ctx.$slots, "content", { close: close }, () => [
                      (!!slots.header || (__props.title || !!slots.title) || (__props.description || !!slots.description) || (props.close || !!slots.close))
                        ? (openBlock(), createBlock("div", {
                            key: 0,
                            "data-slot": "header",
                            class: ui.value.header({ class: props.ui?.header })
                          }, [
                            renderSlot(_ctx.$slots, "header", { close: close }, () => [
                              createVNode("div", {
                                "data-slot": "wrapper",
                                class: ui.value.wrapper({ class: props.ui?.wrapper })
                              }, [
                                (__props.title || !!slots.title)
                                  ? (openBlock(), createBlock(unref(DialogTitle), {
                                      key: 0,
                                      "data-slot": "title",
                                      class: ui.value.title({ class: props.ui?.title })
                                    }, {
                                      default: withCtx(() => [
                                        renderSlot(_ctx.$slots, "title", {}, () => [
                                          createTextVNode(toDisplayString(__props.title), 1 /* TEXT */)
                                        ])
                                      ]),
                                      _: 3 /* FORWARDED */
                                    }, 8 /* PROPS */, ["class"]))
                                  : createCommentVNode("v-if", true),
                                (__props.description || !!slots.description)
                                  ? (openBlock(), createBlock(unref(DialogDescription), {
                                      key: 1,
                                      "data-slot": "description",
                                      class: ui.value.description({ class: props.ui?.description })
                                    }, {
                                      default: withCtx(() => [
                                        renderSlot(_ctx.$slots, "description", {}, () => [
                                          createTextVNode(toDisplayString(__props.description), 1 /* TEXT */)
                                        ])
                                      ]),
                                      _: 3 /* FORWARDED */
                                    }, 8 /* PROPS */, ["class"]))
                                  : createCommentVNode("v-if", true)
                              ], 2 /* CLASS */),
                              renderSlot(_ctx.$slots, "actions"),
                              (props.close || !!slots.close)
                                ? (openBlock(), createBlock(unref(DialogClose), {
                                    key: 0,
                                    "as-child": ""
                                  }, {
                                    default: withCtx(() => [
                                      renderSlot(_ctx.$slots, "close", { ui: ui.value }, () => [
                                        (props.close)
                                          ? (openBlock(), createBlock(_sfc_main$r, mergeProps({
                                              key: 0,
                                              icon: __props.closeIcon || unref(appConfig).ui.icons.close,
                                              color: "neutral",
                                              variant: "ghost",
                                              "aria-label": unref(t)('slideover.close')
                                            }, typeof props.close === 'object' ? props.close : {}, {
                                              "data-slot": "close",
                                              class: ui.value.close({ class: props.ui?.close })
                                            }), null, 16 /* FULL_PROPS */, ["icon", "aria-label", "class"]))
                                          : createCommentVNode("v-if", true)
                                      ])
                                    ]),
                                    _: 2 /* DYNAMIC */
                                  }, 1024 /* DYNAMIC_SLOTS */))
                                : createCommentVNode("v-if", true)
                            ])
                          ], 2 /* CLASS */))
                        : createCommentVNode("v-if", true),
                      createVNode("div", {
                        "data-slot": "body",
                        class: ui.value.body({ class: props.ui?.body })
                      }, [
                        renderSlot(_ctx.$slots, "body", { close: close })
                      ], 2 /* CLASS */),
                      (!!slots.footer)
                        ? (openBlock(), createBlock("div", {
                            key: 1,
                            "data-slot": "footer",
                            class: ui.value.footer({ class: props.ui?.footer })
                          }, [
                            renderSlot(_ctx.$slots, "footer", { close: close })
                          ], 2 /* CLASS */))
                        : createCommentVNode("v-if", true)
                    ])
                  ]),
                  _: 2 /* DYNAMIC */
                }, 1040 /* FULL_PROPS, DYNAMIC_SLOTS */, ["data-side", "class", "onAfterEnter", "onAfterLeave"])
              ]
            }
          }),
          _: 2 /* DYNAMIC */
        }, _parent, _scopeId));
      } else {
        return [
          (!!slots.default)
            ? (openBlock(), createBlock(unref(DialogTrigger), {
                key: 0,
                "as-child": "",
                class: props.class
              }, {
                default: withCtx(() => [
                  renderSlot(_ctx.$slots, "default", { open: open })
                ]),
                _: 2 /* DYNAMIC */
              }, 1032 /* PROPS, DYNAMIC_SLOTS */, ["class"]))
            : createCommentVNode("v-if", true),
          createVNode(unref(DialogPortal), unref(portalProps), {
            default: withCtx(() => [
              (__props.overlay)
                ? (openBlock(), createBlock(unref(DialogOverlay), {
                    key: 0,
                    "data-slot": "overlay",
                    class: ui.value.overlay({ class: props.ui?.overlay })
                  }, null, 8 /* PROPS */, ["class"]))
                : createCommentVNode("v-if", true),
              createVNode(unref(DialogContent), mergeProps({
                "data-side": __props.side,
                "data-slot": "content",
                class: ui.value.content({ class: [!slots.default && props.class, props.ui?.content] })
              }, contentProps.value, {
                onAfterEnter: $event => (emits('after:enter')),
                onAfterLeave: $event => (emits('after:leave'))
              }, toHandlers(contentEvents.value)), {
                default: withCtx(() => [
                  (!!slots.content && (__props.title || !!slots.title || (__props.description || !!slots.description)))
                    ? (openBlock(), createBlock(unref(VisuallyHidden), { key: 0 }, {
                        default: withCtx(() => [
                          (__props.title || !!slots.title)
                            ? (openBlock(), createBlock(unref(DialogTitle), { key: 0 }, {
                                default: withCtx(() => [
                                  renderSlot(_ctx.$slots, "title", {}, () => [
                                    createTextVNode(toDisplayString(__props.title), 1 /* TEXT */)
                                  ])
                                ]),
                                _: 3 /* FORWARDED */
                              }))
                            : createCommentVNode("v-if", true),
                          (__props.description || !!slots.description)
                            ? (openBlock(), createBlock(unref(DialogDescription), { key: 1 }, {
                                default: withCtx(() => [
                                  renderSlot(_ctx.$slots, "description", {}, () => [
                                    createTextVNode(toDisplayString(__props.description), 1 /* TEXT */)
                                  ])
                                ]),
                                _: 3 /* FORWARDED */
                              }))
                            : createCommentVNode("v-if", true)
                        ]),
                        _: 3 /* FORWARDED */
                      }))
                    : createCommentVNode("v-if", true),
                  renderSlot(_ctx.$slots, "content", { close: close }, () => [
                    (!!slots.header || (__props.title || !!slots.title) || (__props.description || !!slots.description) || (props.close || !!slots.close))
                      ? (openBlock(), createBlock("div", {
                          key: 0,
                          "data-slot": "header",
                          class: ui.value.header({ class: props.ui?.header })
                        }, [
                          renderSlot(_ctx.$slots, "header", { close: close }, () => [
                            createVNode("div", {
                              "data-slot": "wrapper",
                              class: ui.value.wrapper({ class: props.ui?.wrapper })
                            }, [
                              (__props.title || !!slots.title)
                                ? (openBlock(), createBlock(unref(DialogTitle), {
                                    key: 0,
                                    "data-slot": "title",
                                    class: ui.value.title({ class: props.ui?.title })
                                  }, {
                                    default: withCtx(() => [
                                      renderSlot(_ctx.$slots, "title", {}, () => [
                                        createTextVNode(toDisplayString(__props.title), 1 /* TEXT */)
                                      ])
                                    ]),
                                    _: 3 /* FORWARDED */
                                  }, 8 /* PROPS */, ["class"]))
                                : createCommentVNode("v-if", true),
                              (__props.description || !!slots.description)
                                ? (openBlock(), createBlock(unref(DialogDescription), {
                                    key: 1,
                                    "data-slot": "description",
                                    class: ui.value.description({ class: props.ui?.description })
                                  }, {
                                    default: withCtx(() => [
                                      renderSlot(_ctx.$slots, "description", {}, () => [
                                        createTextVNode(toDisplayString(__props.description), 1 /* TEXT */)
                                      ])
                                    ]),
                                    _: 3 /* FORWARDED */
                                  }, 8 /* PROPS */, ["class"]))
                                : createCommentVNode("v-if", true)
                            ], 2 /* CLASS */),
                            renderSlot(_ctx.$slots, "actions"),
                            (props.close || !!slots.close)
                              ? (openBlock(), createBlock(unref(DialogClose), {
                                  key: 0,
                                  "as-child": ""
                                }, {
                                  default: withCtx(() => [
                                    renderSlot(_ctx.$slots, "close", { ui: ui.value }, () => [
                                      (props.close)
                                        ? (openBlock(), createBlock(_sfc_main$r, mergeProps({
                                            key: 0,
                                            icon: __props.closeIcon || unref(appConfig).ui.icons.close,
                                            color: "neutral",
                                            variant: "ghost",
                                            "aria-label": unref(t)('slideover.close')
                                          }, typeof props.close === 'object' ? props.close : {}, {
                                            "data-slot": "close",
                                            class: ui.value.close({ class: props.ui?.close })
                                          }), null, 16 /* FULL_PROPS */, ["icon", "aria-label", "class"]))
                                        : createCommentVNode("v-if", true)
                                    ])
                                  ]),
                                  _: 2 /* DYNAMIC */
                                }, 1024 /* DYNAMIC_SLOTS */))
                              : createCommentVNode("v-if", true)
                          ])
                        ], 2 /* CLASS */))
                      : createCommentVNode("v-if", true),
                    createVNode("div", {
                      "data-slot": "body",
                      class: ui.value.body({ class: props.ui?.body })
                    }, [
                      renderSlot(_ctx.$slots, "body", { close: close })
                    ], 2 /* CLASS */),
                    (!!slots.footer)
                      ? (openBlock(), createBlock("div", {
                          key: 1,
                          "data-slot": "footer",
                          class: ui.value.footer({ class: props.ui?.footer })
                        }, [
                          renderSlot(_ctx.$slots, "footer", { close: close })
                        ], 2 /* CLASS */))
                      : createCommentVNode("v-if", true)
                  ])
                ]),
                _: 2 /* DYNAMIC */
              }, 1040 /* FULL_PROPS, DYNAMIC_SLOTS */, ["data-side", "class", "onAfterEnter", "onAfterLeave"])
            ]),
            _: 2 /* DYNAMIC */
          }, 1040 /* FULL_PROPS, DYNAMIC_SLOTS */)
        ]
      }
    }),
    _: 3 /* FORWARDED */
  }, _parent));
}
}

};
const _sfc_setup$d = _sfc_main$d.setup;
_sfc_main$d.setup = (props, ctx) => {
  const ssrContext = useSSRContext()
  ;(ssrContext.modules || (ssrContext.modules = new Set())).add("node_modules/@nuxt/ui/dist/runtime/components/Slideover.vue");
  return _sfc_setup$d ? _sfc_setup$d(props, ctx) : undefined
};

const theme$1 = {
  "slots": {
    "overlay": "fixed inset-0 bg-elevated/75",
    "content": "fixed bg-default ring ring-default flex focus:outline-none",
    "handle": [
      "shrink-0 !bg-accented",
      "transition-opacity"
    ],
    "container": "w-full flex flex-col gap-4 p-4 overflow-y-auto",
    "header": "",
    "title": "text-highlighted font-semibold",
    "description": "mt-1 text-muted text-sm",
    "body": "flex-1",
    "footer": "flex flex-col gap-1.5"
  },
  "variants": {
    "direction": {
      "top": {
        "content": "mb-24 flex-col-reverse",
        "handle": "mb-4"
      },
      "right": {
        "content": "flex-row",
        "handle": "!ml-4"
      },
      "bottom": {
        "content": "mt-24 flex-col",
        "handle": "mt-4"
      },
      "left": {
        "content": "flex-row-reverse",
        "handle": "!mr-4"
      }
    },
    "inset": {
      "true": {
        "content": "rounded-lg after:hidden overflow-hidden [--initial-transform:calc(100%+1.5rem)]"
      }
    },
    "snapPoints": {
      "true": ""
    }
  },
  "compoundVariants": [
    {
      "direction": [
        "top",
        "bottom"
      ],
      "class": {
        "content": "h-auto max-h-[96%]",
        "handle": "!w-12 !h-1.5 mx-auto"
      }
    },
    {
      "direction": [
        "top",
        "bottom"
      ],
      "snapPoints": true,
      "class": {
        "content": "h-full"
      }
    },
    {
      "direction": [
        "right",
        "left"
      ],
      "class": {
        "content": "w-auto max-w-[calc(100%-2rem)]",
        "handle": "!h-12 !w-1.5 mt-auto mb-auto"
      }
    },
    {
      "direction": [
        "right",
        "left"
      ],
      "snapPoints": true,
      "class": {
        "content": "w-full"
      }
    },
    {
      "direction": "top",
      "inset": true,
      "class": {
        "content": "inset-x-4 top-4"
      }
    },
    {
      "direction": "top",
      "inset": false,
      "class": {
        "content": "inset-x-0 top-0 rounded-b-lg"
      }
    },
    {
      "direction": "bottom",
      "inset": true,
      "class": {
        "content": "inset-x-4 bottom-4"
      }
    },
    {
      "direction": "bottom",
      "inset": false,
      "class": {
        "content": "inset-x-0 bottom-0 rounded-t-lg"
      }
    },
    {
      "direction": "left",
      "inset": true,
      "class": {
        "content": "inset-y-4 left-4"
      }
    },
    {
      "direction": "left",
      "inset": false,
      "class": {
        "content": "inset-y-0 left-0 rounded-r-lg"
      }
    },
    {
      "direction": "right",
      "inset": true,
      "class": {
        "content": "inset-y-4 right-4"
      }
    },
    {
      "direction": "right",
      "inset": false,
      "class": {
        "content": "inset-y-0 right-0 rounded-l-lg"
      }
    }
  ]
};

const _sfc_main$c = {
  __name: 'Drawer',
  __ssrInlineRender: true,
  props: {
  as: { type: null, required: false },
  title: { type: String, required: false },
  description: { type: String, required: false },
  inset: { type: Boolean, required: false },
  content: { type: Object, required: false },
  overlay: { type: Boolean, required: false, default: true },
  handle: { type: Boolean, required: false, default: true },
  portal: { type: [Boolean, String], required: false, skipCheck: true, default: true },
  nested: { type: Boolean, required: false },
  class: { type: null, required: false },
  ui: { type: null, required: false },
  activeSnapPoint: { type: [Number, String, null], required: false },
  closeThreshold: { type: Number, required: false },
  shouldScaleBackground: { type: Boolean, required: false },
  setBackgroundColorOnScale: { type: Boolean, required: false },
  scrollLockTimeout: { type: Number, required: false },
  fixed: { type: Boolean, required: false },
  dismissible: { type: Boolean, required: false, default: true },
  modal: { type: Boolean, required: false, default: true },
  open: { type: Boolean, required: false },
  defaultOpen: { type: Boolean, required: false },
  direction: { type: String, required: false, default: "bottom" },
  noBodyStyles: { type: Boolean, required: false },
  handleOnly: { type: Boolean, required: false },
  preventScrollRestoration: { type: Boolean, required: false },
  snapPoints: { type: Array, required: false }
},
  emits: ["close:prevent", "drag", "release", "close", "update:open", "update:activeSnapPoint", "animationEnd"],
  setup(__props, { emit: __emit }) {

const props = __props;
const emits = __emit;
const slots = useSlots();
const appConfig = useAppConfig();
const rootProps = useForwardPropsEmits(reactivePick(props, "activeSnapPoint", "closeThreshold", "shouldScaleBackground", "setBackgroundColorOnScale", "scrollLockTimeout", "fixed", "dismissible", "modal", "open", "defaultOpen", "nested", "direction", "noBodyStyles", "handleOnly", "preventScrollRestoration", "snapPoints"), emits);
const portalProps = usePortal(toRef(() => props.portal));
const contentProps = toRef(() => props.content);
const contentEvents = computed(() => {
  if (!props.dismissible) {
    const events = ["pointerDownOutside", "interactOutside", "escapeKeyDown"];
    return events.reduce((acc, curr) => {
      acc[curr] = (e) => {
        e.preventDefault();
        emits("close:prevent");
      };
      return acc;
    }, {});
  }
  return {};
});
const ui = computed(() => tv({ extend: tv(theme$1), ...appConfig.ui?.drawer || {} })({
  direction: props.direction,
  inset: props.inset,
  snapPoints: props.snapPoints && props.snapPoints.length > 0
}));

return (_ctx, _push, _parent, _attrs) => {
  ssrRenderVNode(_push, createVNode(resolveDynamicComponent(__props.nested ? unref(DrawerRootNested) : unref(DrawerRoot)), mergeProps(unref(rootProps), _attrs), {
    default: withCtx((_, _push, _parent, _scopeId) => {
      if (_push) {
        if (!!slots.default) {
          _push(ssrRenderComponent(unref(DrawerTrigger), {
            "as-child": "",
            class: props.class
          }, {
            default: withCtx((_, _push, _parent, _scopeId) => {
              if (_push) {
                ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent, _scopeId);
              } else {
                return [
                  renderSlot(_ctx.$slots, "default")
                ]
              }
            }),
            _: 3 /* FORWARDED */
          }, _parent, _scopeId));
        } else {
          _push(`<!---->`);
        }
        _push(ssrRenderComponent(unref(DrawerPortal), unref(portalProps), {
          default: withCtx((_, _push, _parent, _scopeId) => {
            if (_push) {
              if (__props.overlay) {
                _push(ssrRenderComponent(unref(DrawerOverlay), {
                  "data-slot": "overlay",
                  class: ui.value.overlay({ class: props.ui?.overlay })
                }, null, _parent, _scopeId));
              } else {
                _push(`<!---->`);
              }
              _push(ssrRenderComponent(unref(DrawerContent), mergeProps({
                "data-slot": "content",
                class: ui.value.content({ class: [!slots.default && props.class, props.ui?.content] })
              }, contentProps.value, toHandlers(contentEvents.value)), {
                default: withCtx((_, _push, _parent, _scopeId) => {
                  if (_push) {
                    if (__props.handle) {
                      _push(ssrRenderComponent(unref(DrawerHandle), {
                        "data-slot": "handle",
                        class: ui.value.handle({ class: props.ui?.handle })
                      }, null, _parent, _scopeId));
                    } else {
                      _push(`<!---->`);
                    }
                    if (!!slots.content && (__props.title || !!slots.title || (__props.description || !!slots.description))) {
                      _push(ssrRenderComponent(unref(VisuallyHidden), null, {
                        default: withCtx((_, _push, _parent, _scopeId) => {
                          if (_push) {
                            if (__props.title || !!slots.title) {
                              _push(ssrRenderComponent(unref(DrawerTitle), null, {
                                default: withCtx((_, _push, _parent, _scopeId) => {
                                  if (_push) {
                                    ssrRenderSlot(_ctx.$slots, "title", {}, () => {
                                      _push(`${ssrInterpolate(__props.title)}`);
                                    }, _push, _parent, _scopeId);
                                  } else {
                                    return [
                                      renderSlot(_ctx.$slots, "title", {}, () => [
                                        createTextVNode(toDisplayString(__props.title), 1 /* TEXT */)
                                      ])
                                    ]
                                  }
                                }),
                                _: 3 /* FORWARDED */
                              }, _parent, _scopeId));
                            } else {
                              _push(`<!---->`);
                            }
                            if (__props.description || !!slots.description) {
                              _push(ssrRenderComponent(unref(DrawerDescription), null, {
                                default: withCtx((_, _push, _parent, _scopeId) => {
                                  if (_push) {
                                    ssrRenderSlot(_ctx.$slots, "description", {}, () => {
                                      _push(`${ssrInterpolate(__props.description)}`);
                                    }, _push, _parent, _scopeId);
                                  } else {
                                    return [
                                      renderSlot(_ctx.$slots, "description", {}, () => [
                                        createTextVNode(toDisplayString(__props.description), 1 /* TEXT */)
                                      ])
                                    ]
                                  }
                                }),
                                _: 3 /* FORWARDED */
                              }, _parent, _scopeId));
                            } else {
                              _push(`<!---->`);
                            }
                          } else {
                            return [
                              (__props.title || !!slots.title)
                                ? (openBlock(), createBlock(unref(DrawerTitle), { key: 0 }, {
                                    default: withCtx(() => [
                                      renderSlot(_ctx.$slots, "title", {}, () => [
                                        createTextVNode(toDisplayString(__props.title), 1 /* TEXT */)
                                      ])
                                    ]),
                                    _: 3 /* FORWARDED */
                                  }))
                                : createCommentVNode("v-if", true),
                              (__props.description || !!slots.description)
                                ? (openBlock(), createBlock(unref(DrawerDescription), { key: 1 }, {
                                    default: withCtx(() => [
                                      renderSlot(_ctx.$slots, "description", {}, () => [
                                        createTextVNode(toDisplayString(__props.description), 1 /* TEXT */)
                                      ])
                                    ]),
                                    _: 3 /* FORWARDED */
                                  }))
                                : createCommentVNode("v-if", true)
                            ]
                          }
                        }),
                        _: 3 /* FORWARDED */
                      }, _parent, _scopeId));
                    } else {
                      _push(`<!---->`);
                    }
                    ssrRenderSlot(_ctx.$slots, "content", {}, () => {
                      _push(`<div data-slot="container" class="${
                        ssrRenderClass(ui.value.container({ class: props.ui?.container }))
                      }"${
                        _scopeId
                      }>`);
                      if (!!slots.header || (__props.title || !!slots.title) || (__props.description || !!slots.description)) {
                        _push(`<div data-slot="header" class="${
                          ssrRenderClass(ui.value.header({ class: props.ui?.header }))
                        }"${
                          _scopeId
                        }>`);
                        ssrRenderSlot(_ctx.$slots, "header", {}, () => {
                          if (__props.title || !!slots.title) {
                            _push(ssrRenderComponent(unref(DrawerTitle), {
                              "data-slot": "title",
                              class: ui.value.title({ class: props.ui?.title })
                            }, {
                              default: withCtx((_, _push, _parent, _scopeId) => {
                                if (_push) {
                                  ssrRenderSlot(_ctx.$slots, "title", {}, () => {
                                    _push(`${ssrInterpolate(__props.title)}`);
                                  }, _push, _parent, _scopeId);
                                } else {
                                  return [
                                    renderSlot(_ctx.$slots, "title", {}, () => [
                                      createTextVNode(toDisplayString(__props.title), 1 /* TEXT */)
                                    ])
                                  ]
                                }
                              }),
                              _: 3 /* FORWARDED */
                            }, _parent, _scopeId));
                          } else {
                            _push(`<!---->`);
                          }
                          if (__props.description || !!slots.description) {
                            _push(ssrRenderComponent(unref(DrawerDescription), {
                              "data-slot": "description",
                              class: ui.value.description({ class: props.ui?.description })
                            }, {
                              default: withCtx((_, _push, _parent, _scopeId) => {
                                if (_push) {
                                  ssrRenderSlot(_ctx.$slots, "description", {}, () => {
                                    _push(`${ssrInterpolate(__props.description)}`);
                                  }, _push, _parent, _scopeId);
                                } else {
                                  return [
                                    renderSlot(_ctx.$slots, "description", {}, () => [
                                      createTextVNode(toDisplayString(__props.description), 1 /* TEXT */)
                                    ])
                                  ]
                                }
                              }),
                              _: 3 /* FORWARDED */
                            }, _parent, _scopeId));
                          } else {
                            _push(`<!---->`);
                          }
                        }, _push, _parent, _scopeId);
                        _push(`</div>`);
                      } else {
                        _push(`<!---->`);
                      }
                      if (!!slots.body) {
                        _push(`<div data-slot="body" class="${
                          ssrRenderClass(ui.value.body({ class: props.ui?.body }))
                        }"${
                          _scopeId
                        }>`);
                        ssrRenderSlot(_ctx.$slots, "body", {}, null, _push, _parent, _scopeId);
                        _push(`</div>`);
                      } else {
                        _push(`<!---->`);
                      }
                      if (!!slots.footer) {
                        _push(`<div data-slot="footer" class="${
                          ssrRenderClass(ui.value.footer({ class: props.ui?.footer }))
                        }"${
                          _scopeId
                        }>`);
                        ssrRenderSlot(_ctx.$slots, "footer", {}, null, _push, _parent, _scopeId);
                        _push(`</div>`);
                      } else {
                        _push(`<!---->`);
                      }
                      _push(`</div>`);
                    }, _push, _parent, _scopeId);
                  } else {
                    return [
                      (__props.handle)
                        ? (openBlock(), createBlock(unref(DrawerHandle), {
                            key: 0,
                            "data-slot": "handle",
                            class: ui.value.handle({ class: props.ui?.handle })
                          }, null, 8 /* PROPS */, ["class"]))
                        : createCommentVNode("v-if", true),
                      (!!slots.content && (__props.title || !!slots.title || (__props.description || !!slots.description)))
                        ? (openBlock(), createBlock(unref(VisuallyHidden), { key: 1 }, {
                            default: withCtx(() => [
                              (__props.title || !!slots.title)
                                ? (openBlock(), createBlock(unref(DrawerTitle), { key: 0 }, {
                                    default: withCtx(() => [
                                      renderSlot(_ctx.$slots, "title", {}, () => [
                                        createTextVNode(toDisplayString(__props.title), 1 /* TEXT */)
                                      ])
                                    ]),
                                    _: 3 /* FORWARDED */
                                  }))
                                : createCommentVNode("v-if", true),
                              (__props.description || !!slots.description)
                                ? (openBlock(), createBlock(unref(DrawerDescription), { key: 1 }, {
                                    default: withCtx(() => [
                                      renderSlot(_ctx.$slots, "description", {}, () => [
                                        createTextVNode(toDisplayString(__props.description), 1 /* TEXT */)
                                      ])
                                    ]),
                                    _: 3 /* FORWARDED */
                                  }))
                                : createCommentVNode("v-if", true)
                            ]),
                            _: 3 /* FORWARDED */
                          }))
                        : createCommentVNode("v-if", true),
                      renderSlot(_ctx.$slots, "content", {}, () => [
                        createVNode("div", {
                          "data-slot": "container",
                          class: ui.value.container({ class: props.ui?.container })
                        }, [
                          (!!slots.header || (__props.title || !!slots.title) || (__props.description || !!slots.description))
                            ? (openBlock(), createBlock("div", {
                                key: 0,
                                "data-slot": "header",
                                class: ui.value.header({ class: props.ui?.header })
                              }, [
                                renderSlot(_ctx.$slots, "header", {}, () => [
                                  (__props.title || !!slots.title)
                                    ? (openBlock(), createBlock(unref(DrawerTitle), {
                                        key: 0,
                                        "data-slot": "title",
                                        class: ui.value.title({ class: props.ui?.title })
                                      }, {
                                        default: withCtx(() => [
                                          renderSlot(_ctx.$slots, "title", {}, () => [
                                            createTextVNode(toDisplayString(__props.title), 1 /* TEXT */)
                                          ])
                                        ]),
                                        _: 3 /* FORWARDED */
                                      }, 8 /* PROPS */, ["class"]))
                                    : createCommentVNode("v-if", true),
                                  (__props.description || !!slots.description)
                                    ? (openBlock(), createBlock(unref(DrawerDescription), {
                                        key: 1,
                                        "data-slot": "description",
                                        class: ui.value.description({ class: props.ui?.description })
                                      }, {
                                        default: withCtx(() => [
                                          renderSlot(_ctx.$slots, "description", {}, () => [
                                            createTextVNode(toDisplayString(__props.description), 1 /* TEXT */)
                                          ])
                                        ]),
                                        _: 3 /* FORWARDED */
                                      }, 8 /* PROPS */, ["class"]))
                                    : createCommentVNode("v-if", true)
                                ])
                              ], 2 /* CLASS */))
                            : createCommentVNode("v-if", true),
                          (!!slots.body)
                            ? (openBlock(), createBlock("div", {
                                key: 1,
                                "data-slot": "body",
                                class: ui.value.body({ class: props.ui?.body })
                              }, [
                                renderSlot(_ctx.$slots, "body")
                              ], 2 /* CLASS */))
                            : createCommentVNode("v-if", true),
                          (!!slots.footer)
                            ? (openBlock(), createBlock("div", {
                                key: 2,
                                "data-slot": "footer",
                                class: ui.value.footer({ class: props.ui?.footer })
                              }, [
                                renderSlot(_ctx.$slots, "footer")
                              ], 2 /* CLASS */))
                            : createCommentVNode("v-if", true)
                        ], 2 /* CLASS */)
                      ])
                    ]
                  }
                }),
                _: 3 /* FORWARDED */
              }, _parent, _scopeId));
            } else {
              return [
                (__props.overlay)
                  ? (openBlock(), createBlock(unref(DrawerOverlay), {
                      key: 0,
                      "data-slot": "overlay",
                      class: ui.value.overlay({ class: props.ui?.overlay })
                    }, null, 8 /* PROPS */, ["class"]))
                  : createCommentVNode("v-if", true),
                createVNode(unref(DrawerContent), mergeProps({
                  "data-slot": "content",
                  class: ui.value.content({ class: [!slots.default && props.class, props.ui?.content] })
                }, contentProps.value, toHandlers(contentEvents.value)), {
                  default: withCtx(() => [
                    (__props.handle)
                      ? (openBlock(), createBlock(unref(DrawerHandle), {
                          key: 0,
                          "data-slot": "handle",
                          class: ui.value.handle({ class: props.ui?.handle })
                        }, null, 8 /* PROPS */, ["class"]))
                      : createCommentVNode("v-if", true),
                    (!!slots.content && (__props.title || !!slots.title || (__props.description || !!slots.description)))
                      ? (openBlock(), createBlock(unref(VisuallyHidden), { key: 1 }, {
                          default: withCtx(() => [
                            (__props.title || !!slots.title)
                              ? (openBlock(), createBlock(unref(DrawerTitle), { key: 0 }, {
                                  default: withCtx(() => [
                                    renderSlot(_ctx.$slots, "title", {}, () => [
                                      createTextVNode(toDisplayString(__props.title), 1 /* TEXT */)
                                    ])
                                  ]),
                                  _: 3 /* FORWARDED */
                                }))
                              : createCommentVNode("v-if", true),
                            (__props.description || !!slots.description)
                              ? (openBlock(), createBlock(unref(DrawerDescription), { key: 1 }, {
                                  default: withCtx(() => [
                                    renderSlot(_ctx.$slots, "description", {}, () => [
                                      createTextVNode(toDisplayString(__props.description), 1 /* TEXT */)
                                    ])
                                  ]),
                                  _: 3 /* FORWARDED */
                                }))
                              : createCommentVNode("v-if", true)
                          ]),
                          _: 3 /* FORWARDED */
                        }))
                      : createCommentVNode("v-if", true),
                    renderSlot(_ctx.$slots, "content", {}, () => [
                      createVNode("div", {
                        "data-slot": "container",
                        class: ui.value.container({ class: props.ui?.container })
                      }, [
                        (!!slots.header || (__props.title || !!slots.title) || (__props.description || !!slots.description))
                          ? (openBlock(), createBlock("div", {
                              key: 0,
                              "data-slot": "header",
                              class: ui.value.header({ class: props.ui?.header })
                            }, [
                              renderSlot(_ctx.$slots, "header", {}, () => [
                                (__props.title || !!slots.title)
                                  ? (openBlock(), createBlock(unref(DrawerTitle), {
                                      key: 0,
                                      "data-slot": "title",
                                      class: ui.value.title({ class: props.ui?.title })
                                    }, {
                                      default: withCtx(() => [
                                        renderSlot(_ctx.$slots, "title", {}, () => [
                                          createTextVNode(toDisplayString(__props.title), 1 /* TEXT */)
                                        ])
                                      ]),
                                      _: 3 /* FORWARDED */
                                    }, 8 /* PROPS */, ["class"]))
                                  : createCommentVNode("v-if", true),
                                (__props.description || !!slots.description)
                                  ? (openBlock(), createBlock(unref(DrawerDescription), {
                                      key: 1,
                                      "data-slot": "description",
                                      class: ui.value.description({ class: props.ui?.description })
                                    }, {
                                      default: withCtx(() => [
                                        renderSlot(_ctx.$slots, "description", {}, () => [
                                          createTextVNode(toDisplayString(__props.description), 1 /* TEXT */)
                                        ])
                                      ]),
                                      _: 3 /* FORWARDED */
                                    }, 8 /* PROPS */, ["class"]))
                                  : createCommentVNode("v-if", true)
                              ])
                            ], 2 /* CLASS */))
                          : createCommentVNode("v-if", true),
                        (!!slots.body)
                          ? (openBlock(), createBlock("div", {
                              key: 1,
                              "data-slot": "body",
                              class: ui.value.body({ class: props.ui?.body })
                            }, [
                              renderSlot(_ctx.$slots, "body")
                            ], 2 /* CLASS */))
                          : createCommentVNode("v-if", true),
                        (!!slots.footer)
                          ? (openBlock(), createBlock("div", {
                              key: 2,
                              "data-slot": "footer",
                              class: ui.value.footer({ class: props.ui?.footer })
                            }, [
                              renderSlot(_ctx.$slots, "footer")
                            ], 2 /* CLASS */))
                          : createCommentVNode("v-if", true)
                      ], 2 /* CLASS */)
                    ])
                  ]),
                  _: 3 /* FORWARDED */
                }, 16 /* FULL_PROPS */, ["class"])
              ]
            }
          }),
          _: 3 /* FORWARDED */
        }, _parent, _scopeId));
      } else {
        return [
          (!!slots.default)
            ? (openBlock(), createBlock(unref(DrawerTrigger), {
                key: 0,
                "as-child": "",
                class: props.class
              }, {
                default: withCtx(() => [
                  renderSlot(_ctx.$slots, "default")
                ]),
                _: 3 /* FORWARDED */
              }, 8 /* PROPS */, ["class"]))
            : createCommentVNode("v-if", true),
          createVNode(unref(DrawerPortal), unref(portalProps), {
            default: withCtx(() => [
              (__props.overlay)
                ? (openBlock(), createBlock(unref(DrawerOverlay), {
                    key: 0,
                    "data-slot": "overlay",
                    class: ui.value.overlay({ class: props.ui?.overlay })
                  }, null, 8 /* PROPS */, ["class"]))
                : createCommentVNode("v-if", true),
              createVNode(unref(DrawerContent), mergeProps({
                "data-slot": "content",
                class: ui.value.content({ class: [!slots.default && props.class, props.ui?.content] })
              }, contentProps.value, toHandlers(contentEvents.value)), {
                default: withCtx(() => [
                  (__props.handle)
                    ? (openBlock(), createBlock(unref(DrawerHandle), {
                        key: 0,
                        "data-slot": "handle",
                        class: ui.value.handle({ class: props.ui?.handle })
                      }, null, 8 /* PROPS */, ["class"]))
                    : createCommentVNode("v-if", true),
                  (!!slots.content && (__props.title || !!slots.title || (__props.description || !!slots.description)))
                    ? (openBlock(), createBlock(unref(VisuallyHidden), { key: 1 }, {
                        default: withCtx(() => [
                          (__props.title || !!slots.title)
                            ? (openBlock(), createBlock(unref(DrawerTitle), { key: 0 }, {
                                default: withCtx(() => [
                                  renderSlot(_ctx.$slots, "title", {}, () => [
                                    createTextVNode(toDisplayString(__props.title), 1 /* TEXT */)
                                  ])
                                ]),
                                _: 3 /* FORWARDED */
                              }))
                            : createCommentVNode("v-if", true),
                          (__props.description || !!slots.description)
                            ? (openBlock(), createBlock(unref(DrawerDescription), { key: 1 }, {
                                default: withCtx(() => [
                                  renderSlot(_ctx.$slots, "description", {}, () => [
                                    createTextVNode(toDisplayString(__props.description), 1 /* TEXT */)
                                  ])
                                ]),
                                _: 3 /* FORWARDED */
                              }))
                            : createCommentVNode("v-if", true)
                        ]),
                        _: 3 /* FORWARDED */
                      }))
                    : createCommentVNode("v-if", true),
                  renderSlot(_ctx.$slots, "content", {}, () => [
                    createVNode("div", {
                      "data-slot": "container",
                      class: ui.value.container({ class: props.ui?.container })
                    }, [
                      (!!slots.header || (__props.title || !!slots.title) || (__props.description || !!slots.description))
                        ? (openBlock(), createBlock("div", {
                            key: 0,
                            "data-slot": "header",
                            class: ui.value.header({ class: props.ui?.header })
                          }, [
                            renderSlot(_ctx.$slots, "header", {}, () => [
                              (__props.title || !!slots.title)
                                ? (openBlock(), createBlock(unref(DrawerTitle), {
                                    key: 0,
                                    "data-slot": "title",
                                    class: ui.value.title({ class: props.ui?.title })
                                  }, {
                                    default: withCtx(() => [
                                      renderSlot(_ctx.$slots, "title", {}, () => [
                                        createTextVNode(toDisplayString(__props.title), 1 /* TEXT */)
                                      ])
                                    ]),
                                    _: 3 /* FORWARDED */
                                  }, 8 /* PROPS */, ["class"]))
                                : createCommentVNode("v-if", true),
                              (__props.description || !!slots.description)
                                ? (openBlock(), createBlock(unref(DrawerDescription), {
                                    key: 1,
                                    "data-slot": "description",
                                    class: ui.value.description({ class: props.ui?.description })
                                  }, {
                                    default: withCtx(() => [
                                      renderSlot(_ctx.$slots, "description", {}, () => [
                                        createTextVNode(toDisplayString(__props.description), 1 /* TEXT */)
                                      ])
                                    ]),
                                    _: 3 /* FORWARDED */
                                  }, 8 /* PROPS */, ["class"]))
                                : createCommentVNode("v-if", true)
                            ])
                          ], 2 /* CLASS */))
                        : createCommentVNode("v-if", true),
                      (!!slots.body)
                        ? (openBlock(), createBlock("div", {
                            key: 1,
                            "data-slot": "body",
                            class: ui.value.body({ class: props.ui?.body })
                          }, [
                            renderSlot(_ctx.$slots, "body")
                          ], 2 /* CLASS */))
                        : createCommentVNode("v-if", true),
                      (!!slots.footer)
                        ? (openBlock(), createBlock("div", {
                            key: 2,
                            "data-slot": "footer",
                            class: ui.value.footer({ class: props.ui?.footer })
                          }, [
                            renderSlot(_ctx.$slots, "footer")
                          ], 2 /* CLASS */))
                        : createCommentVNode("v-if", true)
                    ], 2 /* CLASS */)
                  ])
                ]),
                _: 3 /* FORWARDED */
              }, 16 /* FULL_PROPS */, ["class"])
            ]),
            _: 3 /* FORWARDED */
          }, 16 /* FULL_PROPS */)
        ]
      }
    }),
    _: 3 /* FORWARDED */
  }), _parent);
}
}

};
const _sfc_setup$c = _sfc_main$c.setup;
_sfc_main$c.setup = (props, ctx) => {
  const ssrContext = useSSRContext()
  ;(ssrContext.modules || (ssrContext.modules = new Set())).add("node_modules/@nuxt/ui/dist/runtime/components/Drawer.vue");
  return _sfc_setup$c ? _sfc_setup$c(props, ctx) : undefined
};

const theme = {
  "slots": {
    "root": "bg-default/75 backdrop-blur border-b border-default h-(--ui-header-height) sticky top-0 z-50",
    "container": "flex items-center justify-between gap-3 h-full",
    "left": "lg:flex-1 flex items-center gap-1.5",
    "center": "hidden lg:flex",
    "right": "flex items-center justify-end lg:flex-1 gap-1.5",
    "title": "shrink-0 font-bold text-xl text-highlighted flex items-end gap-1.5",
    "toggle": "lg:hidden",
    "content": "lg:hidden",
    "overlay": "lg:hidden",
    "header": "px-4 sm:px-6 h-(--ui-header-height) shrink-0 flex items-center justify-between gap-3",
    "body": "p-4 sm:p-6 overflow-y-auto"
  },
  "variants": {
    "toggleSide": {
      "left": {
        "toggle": "-ms-1.5"
      },
      "right": {
        "toggle": "-me-1.5"
      }
    }
  }
};

const _sfc_main$b = /*@__PURE__*/Object.assign({ inheritAttrs: false }, {
  __name: 'Header',
  __ssrInlineRender: true,
  props: /*@__PURE__*/mergeModels({
  as: { type: null, required: false, default: "header" },
  title: { type: String, required: false, default: "Nuxt UI" },
  to: { type: String, required: false, default: "/" },
  mode: { type: null, required: false, default: "modal" },
  menu: { type: null, required: false },
  toggle: { type: [Boolean, Object], required: false, default: true },
  toggleSide: { type: String, required: false, default: "right" },
  class: { type: null, required: false },
  ui: { type: null, required: false }
}, {
    "open": { type: Boolean, ...{ default: false } },
    "openModifiers": {},
  }),
  emits: ["update:open"],
  setup(__props) {


const props = __props;
const slots = useSlots();
const open = useModel(__props, "open", { type: Boolean, ...{ default: false } });
const route = useRoute();
const { t } = useLocale();
const appConfig = useAppConfig();
const [DefineLeftTemplate, ReuseLeftTemplate] = createReusableTemplate();
const [DefineRightTemplate, ReuseRightTemplate] = createReusableTemplate();
const [DefineToggleTemplate, ReuseToggleTemplate] = createReusableTemplate();
const ariaLabel = computed(() => {
  const slotText = slots.title && getSlotChildrenText(slots.title());
  return (slotText || props.title || "Nuxt UI").trim();
});
watch(() => route.fullPath, () => {
  open.value = false;
});
const ui = computed(() => tv({ extend: tv(theme), ...appConfig.ui?.header || {} })());
const Menu = computed(() => ({
  slideover: _sfc_main$d,
  modal: _sfc_main$s,
  drawer: _sfc_main$c
})[props.mode]);
const menuProps = toRef(() => defu(props.menu, {
  content: {
    onOpenAutoFocus: (e) => e.preventDefault()
  }
}, props.mode === "modal" ? { fullscreen: true, transition: false } : {}));
function toggleOpen() {
  open.value = !open.value;
}

return (_ctx, _push, _parent, _attrs) => {
  _push(`<!--[-->`);
  _push(ssrRenderComponent(unref(DefineToggleTemplate), null, {
    default: withCtx((_, _push, _parent, _scopeId) => {
      if (_push) {
        ssrRenderSlot(_ctx.$slots, "toggle", {
          open: open.value,
          toggle: toggleOpen,
          ui: ui.value
        }, () => {
          if (__props.toggle) {
            _push(ssrRenderComponent(_sfc_main$r, mergeProps({
              color: "neutral",
              variant: "ghost",
              "aria-label": open.value ? unref(t)('header.close') : unref(t)('header.open'),
              icon: open.value ? unref(appConfig).ui.icons.close : unref(appConfig).ui.icons.menu
            }, typeof __props.toggle === 'object' ? __props.toggle : {}, {
              "data-slot": "toggle",
              class: ui.value.toggle({ class: props.ui?.toggle, toggleSide: __props.toggleSide }),
              onClick: toggleOpen
            }), null, _parent, _scopeId));
          } else {
            _push(`<!---->`);
          }
        }, _push, _parent, _scopeId);
      } else {
        return [
          renderSlot(_ctx.$slots, "toggle", {
            open: open.value,
            toggle: toggleOpen,
            ui: ui.value
          }, () => [
            (__props.toggle)
              ? (openBlock(), createBlock(_sfc_main$r, mergeProps({
                  key: 0,
                  color: "neutral",
                  variant: "ghost",
                  "aria-label": open.value ? unref(t)('header.close') : unref(t)('header.open'),
                  icon: open.value ? unref(appConfig).ui.icons.close : unref(appConfig).ui.icons.menu
                }, typeof __props.toggle === 'object' ? __props.toggle : {}, {
                  "data-slot": "toggle",
                  class: ui.value.toggle({ class: props.ui?.toggle, toggleSide: __props.toggleSide }),
                  onClick: toggleOpen
                }), null, 16 /* FULL_PROPS */, ["aria-label", "icon", "class"]))
              : createCommentVNode("v-if", true)
          ])
        ]
      }
    }),
    _: 3 /* FORWARDED */
  }, _parent));
  _push(ssrRenderComponent(unref(DefineLeftTemplate), null, {
    default: withCtx((_, _push, _parent, _scopeId) => {
      if (_push) {
        _push(`<div data-slot="left" class="${
          ssrRenderClass(ui.value.left({ class: props.ui?.left }))
        }"${
          _scopeId
        }>`);
        if (__props.toggleSide === 'left') {
          _push(ssrRenderComponent(unref(ReuseToggleTemplate), null, null, _parent, _scopeId));
        } else {
          _push(`<!---->`);
        }
        ssrRenderSlot(_ctx.$slots, "left", {}, () => {
          _push(ssrRenderComponent(_sfc_main$t, {
            to: __props.to,
            "aria-label": ariaLabel.value,
            "data-slot": "title",
            class: ui.value.title({ class: props.ui?.title })
          }, {
            default: withCtx((_, _push, _parent, _scopeId) => {
              if (_push) {
                ssrRenderSlot(_ctx.$slots, "title", {}, () => {
                  _push(`${ssrInterpolate(__props.title)}`);
                }, _push, _parent, _scopeId);
              } else {
                return [
                  renderSlot(_ctx.$slots, "title", {}, () => [
                    createTextVNode(toDisplayString(__props.title), 1 /* TEXT */)
                  ])
                ]
              }
            }),
            _: 3 /* FORWARDED */
          }, _parent, _scopeId));
        }, _push, _parent, _scopeId);
        _push(`</div>`);
      } else {
        return [
          createVNode("div", {
            "data-slot": "left",
            class: ui.value.left({ class: props.ui?.left })
          }, [
            (__props.toggleSide === 'left')
              ? (openBlock(), createBlock(unref(ReuseToggleTemplate), { key: 0 }))
              : createCommentVNode("v-if", true),
            renderSlot(_ctx.$slots, "left", {}, () => [
              createVNode(_sfc_main$t, {
                to: __props.to,
                "aria-label": ariaLabel.value,
                "data-slot": "title",
                class: ui.value.title({ class: props.ui?.title })
              }, {
                default: withCtx(() => [
                  renderSlot(_ctx.$slots, "title", {}, () => [
                    createTextVNode(toDisplayString(__props.title), 1 /* TEXT */)
                  ])
                ]),
                _: 3 /* FORWARDED */
              }, 8 /* PROPS */, ["to", "aria-label", "class"])
            ])
          ], 2 /* CLASS */)
        ]
      }
    }),
    _: 3 /* FORWARDED */
  }, _parent));
  _push(ssrRenderComponent(unref(DefineRightTemplate), null, {
    default: withCtx((_, _push, _parent, _scopeId) => {
      if (_push) {
        _push(`<div data-slot="right" class="${
          ssrRenderClass(ui.value.right({ class: props.ui?.right }))
        }"${
          _scopeId
        }>`);
        ssrRenderSlot(_ctx.$slots, "right", {}, null, _push, _parent, _scopeId);
        if (__props.toggleSide === 'right') {
          _push(ssrRenderComponent(unref(ReuseToggleTemplate), null, null, _parent, _scopeId));
        } else {
          _push(`<!---->`);
        }
        _push(`</div>`);
      } else {
        return [
          createVNode("div", {
            "data-slot": "right",
            class: ui.value.right({ class: props.ui?.right })
          }, [
            renderSlot(_ctx.$slots, "right"),
            (__props.toggleSide === 'right')
              ? (openBlock(), createBlock(unref(ReuseToggleTemplate), { key: 0 }))
              : createCommentVNode("v-if", true)
          ], 2 /* CLASS */)
        ]
      }
    }),
    _: 3 /* FORWARDED */
  }, _parent));
  _push(ssrRenderComponent(unref(Primitive), mergeProps({ as: __props.as }, _ctx.$attrs, {
    "data-slot": "root",
    class: ui.value.root({ class: [props.ui?.root, props.class] })
  }), {
    default: withCtx((_, _push, _parent, _scopeId) => {
      if (_push) {
        ssrRenderSlot(_ctx.$slots, "top", {}, null, _push, _parent, _scopeId);
        _push(ssrRenderComponent(_sfc_main$n, {
          "data-slot": "container",
          class: ui.value.container({ class: props.ui?.container })
        }, {
          default: withCtx((_, _push, _parent, _scopeId) => {
            if (_push) {
              _push(ssrRenderComponent(unref(ReuseLeftTemplate), null, null, _parent, _scopeId));
              _push(`<div data-slot="center" class="${
                ssrRenderClass(ui.value.center({ class: props.ui?.center }))
              }"${
                _scopeId
              }>`);
              ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent, _scopeId);
              _push(`</div>`);
              _push(ssrRenderComponent(unref(ReuseRightTemplate), null, null, _parent, _scopeId));
            } else {
              return [
                createVNode(unref(ReuseLeftTemplate)),
                createVNode("div", {
                  "data-slot": "center",
                  class: ui.value.center({ class: props.ui?.center })
                }, [
                  renderSlot(_ctx.$slots, "default")
                ], 2 /* CLASS */),
                createVNode(unref(ReuseRightTemplate))
              ]
            }
          }),
          _: 3 /* FORWARDED */
        }, _parent, _scopeId));
        ssrRenderSlot(_ctx.$slots, "bottom", {}, null, _push, _parent, _scopeId);
      } else {
        return [
          renderSlot(_ctx.$slots, "top"),
          createVNode(_sfc_main$n, {
            "data-slot": "container",
            class: ui.value.container({ class: props.ui?.container })
          }, {
            default: withCtx(() => [
              createVNode(unref(ReuseLeftTemplate)),
              createVNode("div", {
                "data-slot": "center",
                class: ui.value.center({ class: props.ui?.center })
              }, [
                renderSlot(_ctx.$slots, "default")
              ], 2 /* CLASS */),
              createVNode(unref(ReuseRightTemplate))
            ]),
            _: 3 /* FORWARDED */
          }, 8 /* PROPS */, ["class"]),
          renderSlot(_ctx.$slots, "bottom")
        ]
      }
    }),
    _: 3 /* FORWARDED */
  }, _parent));
  _push(ssrRenderComponent(unref(Menu), mergeProps({
    open: open.value,
    "onUpdate:open": $event => ((open).value = $event),
    title: unref(t)('header.title'),
    description: unref(t)('header.description')
  }, menuProps.value, {
    ui: {
  overlay: ui.value.overlay({ class: props.ui?.overlay }),
  content: ui.value.content({ class: props.ui?.content })
}
  }), {
    content: withCtx((contentData, _push, _parent, _scopeId) => {
      if (_push) {
        ssrRenderSlot(_ctx.$slots, "content", contentData, () => {
          if (__props.mode !== 'drawer') {
            _push(`<div data-slot="header" class="${
              ssrRenderClass(ui.value.header({ class: props.ui?.header }))
            }"${
              _scopeId
            }>`);
            _push(ssrRenderComponent(unref(ReuseLeftTemplate), null, null, _parent, _scopeId));
            _push(ssrRenderComponent(unref(ReuseRightTemplate), null, null, _parent, _scopeId));
            _push(`</div>`);
          } else {
            _push(`<!---->`);
          }
          _push(`<div data-slot="body" class="${
            ssrRenderClass(ui.value.body({ class: props.ui?.body }))
          }"${
            _scopeId
          }>`);
          ssrRenderSlot(_ctx.$slots, "body", {}, null, _push, _parent, _scopeId);
          _push(`</div>`);
        }, _push, _parent, _scopeId);
      } else {
        return [
          renderSlot(_ctx.$slots, "content", contentData, () => [
            (__props.mode !== 'drawer')
              ? (openBlock(), createBlock("div", {
                  key: 0,
                  "data-slot": "header",
                  class: ui.value.header({ class: props.ui?.header })
                }, [
                  createVNode(unref(ReuseLeftTemplate)),
                  createVNode(unref(ReuseRightTemplate))
                ], 2 /* CLASS */))
              : createCommentVNode("v-if", true),
            createVNode("div", {
              "data-slot": "body",
              class: ui.value.body({ class: props.ui?.body })
            }, [
              renderSlot(_ctx.$slots, "body")
            ], 2 /* CLASS */)
          ])
        ]
      }
    }),
    _: 3 /* FORWARDED */
  }, _parent));
  _push(`<!--]-->`);
}
}

});
const _sfc_setup$b = _sfc_main$b.setup;
_sfc_main$b.setup = (props, ctx) => {
  const ssrContext = useSSRContext()
  ;(ssrContext.modules || (ssrContext.modules = new Set())).add("node_modules/@nuxt/ui/dist/runtime/components/Header.vue");
  return _sfc_setup$b ? _sfc_setup$b(props, ctx) : undefined
};

const _sfc_main$a = {  };

function _sfc_ssrRender$1(_ctx, _push, _parent, _attrs) {
  const _component_UContainer = _sfc_main$n;

  _push(`<div${ssrRenderAttrs(mergeProps({ class: "bg-gray-50 dark:bg-gray-950 border-b border-gray-200 dark:border-gray-800" }, _attrs))}>`);
  _push(ssrRenderComponent(_component_UContainer, null, {
    default: withCtx((_, _push, _parent, _scopeId) => {
      if (_push) {
        _push(`<div class="flex justify-between items-center h-9 text-xs"${
          _scopeId
        }><div class="flex items-center gap-4 text-gray-600 dark:text-gray-400"${
          _scopeId
        }><a href="/about" class="hover:text-primary-600 dark:hover:text-primary-400 transition-colors"${
          _scopeId
        }> Tentang Kami </a></div><div class="flex items-center gap-4 text-gray-600 dark:text-gray-400"${
          _scopeId
        }><a href="/track" class="hidden md:inline hover:text-primary-600 dark:hover:text-primary-400 transition-colors"${
          _scopeId
        }> Lacak Pesanan </a><span class="hidden md:inline"${
          _scopeId
        }>|</span><a href="/help" class="hover:text-primary-600 dark:hover:text-primary-400 transition-colors"${
          _scopeId
        }> Bantuan </a></div></div>`);
      } else {
        return [
          createVNode("div", { class: "flex justify-between items-center h-9 text-xs" }, [
            createVNode("div", { class: "flex items-center gap-4 text-gray-600 dark:text-gray-400" }, [
              createVNode("a", {
                href: "/about",
                class: "hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
              }, " Tentang Kami ")
            ]),
            createVNode("div", { class: "flex items-center gap-4 text-gray-600 dark:text-gray-400" }, [
              createVNode("a", {
                href: "/track",
                class: "hidden md:inline hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
              }, " Lacak Pesanan "),
              createVNode("span", { class: "hidden md:inline" }, "|"),
              createVNode("a", {
                href: "/help",
                class: "hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
              }, " Bantuan ")
            ])
          ])
        ]
      }
    }),
    _: 1 /* STABLE */
  }, _parent));
  _push(`</div>`);
}
const _sfc_setup$a = _sfc_main$a.setup;
_sfc_main$a.setup = (props, ctx) => {
  const ssrContext = useSSRContext()
  ;(ssrContext.modules || (ssrContext.modules = new Set())).add("inertia/layouts/ecommerce/Topbar.vue");
  return _sfc_setup$a ? _sfc_setup$a(props, ctx) : undefined
};
const Topbar = /*#__PURE__*/_export_sfc(_sfc_main$a, [['ssrRender',_sfc_ssrRender$1]]);

const _sfc_main$9 = {  };

function _sfc_ssrRender(_ctx, _push, _parent, _attrs) {
  const _component_UContainer = _sfc_main$n;
  const _component_UIcon = _sfc_main$p;

  _push(`<div${ssrRenderAttrs(mergeProps({ class: "bg-linear-to-r from-primary-500 via-secondary-500 to-primary-600" }, _attrs))}>`);
  _push(ssrRenderComponent(_component_UContainer, null, {
    default: withCtx((_, _push, _parent, _scopeId) => {
      if (_push) {
        _push(`<div class="flex items-center justify-center gap-3 py-2.5 text-white"${_scopeId}>`);
        _push(ssrRenderComponent(_component_UIcon, {
          name: "i-heroicons-fire",
          class: "w-4 h-4 animate-bounce"
        }, null, _parent, _scopeId));
        _push(`<p class="text-xs md:text-sm font-semibold"${_scopeId}> 🎉 FLASH SALE! Diskon hingga 50% untuk liquid premium - Hanya hari ini! </p>`);
        _push(ssrRenderComponent(_component_UIcon, {
          name: "i-heroicons-fire",
          class: "w-4 h-4 animate-bounce"
        }, null, _parent, _scopeId));
        _push(`</div>`);
      } else {
        return [
          createVNode("div", { class: "flex items-center justify-center gap-3 py-2.5 text-white" }, [
            createVNode(_component_UIcon, {
              name: "i-heroicons-fire",
              class: "w-4 h-4 animate-bounce"
            }),
            createVNode("p", { class: "text-xs md:text-sm font-semibold" }, " 🎉 FLASH SALE! Diskon hingga 50% untuk liquid premium - Hanya hari ini! "),
            createVNode(_component_UIcon, {
              name: "i-heroicons-fire",
              class: "w-4 h-4 animate-bounce"
            })
          ])
        ]
      }
    }),
    _: 1 /* STABLE */
  }, _parent));
  _push(`</div>`);
}
const _sfc_setup$9 = _sfc_main$9.setup;
_sfc_main$9.setup = (props, ctx) => {
  const ssrContext = useSSRContext()
  ;(ssrContext.modules || (ssrContext.modules = new Set())).add("inertia/layouts/ecommerce/BannerInfo.vue");
  return _sfc_setup$9 ? _sfc_setup$9(props, ctx) : undefined
};
const BannerInfo = /*#__PURE__*/_export_sfc(_sfc_main$9, [['ssrRender',_sfc_ssrRender]]);

const _sfc_main$8 = /* @__PURE__ */ defineComponent({
  __name: "HeaderMobileBody",
  __ssrInlineRender: true,
  props: {
    isLoggedIn: { type: Boolean, default: false },
    user: { type: Object, default: null },
    quickLinks: { type: Array, required: true },
    categories: { type: Array, required: true },
    searchQuery: { type: String, default: "" }
  },
  emits: ["update:searchQuery", "logout", "close"],
  setup(__props, { emit: __emit }) {
    const emit = __emit;
    const closeMenu = () => {
      emit("close");
    };
    const activeTab = ref("menu");
    const quickActions = [
      { label: "Dashboard", icon: "i-heroicons-squares-2x2", to: "/dashboard", color: "bg-primary-500" },
      { label: "Pesanan", icon: "i-heroicons-shopping-bag", to: "/orders", color: "bg-blue-500" },
      { label: "Wishlist", icon: "i-heroicons-heart", to: "/wishlist", color: "bg-pink-500" },
      { label: "Keranjang", icon: "i-heroicons-shopping-cart", to: "/cart", color: "bg-orange-500" }
    ];
    const menuItems = [
      { label: "Best Seller", icon: "i-heroicons-fire", to: "/best-seller", badge: "Hot", badgeColor: "bg-red-500" },
      { label: "New Arrival", icon: "i-heroicons-sparkles", to: "/new-arrival", badge: "New", badgeColor: "bg-green-500" },
      { label: "Promo", icon: "i-heroicons-tag", to: "/promo", badge: null, badgeColor: "" },
      { label: "Blog & Tips", icon: "i-heroicons-newspaper", to: "/blog", badge: null, badgeColor: "" }
    ];
    const supportLinks = [
      { label: "Lacak Pesanan", icon: "i-heroicons-map-pin", to: "/track" },
      { label: "Pusat Bantuan", icon: "i-heroicons-question-mark-circle", to: "/help" },
      { label: "Hubungi Kami", icon: "i-heroicons-chat-bubble-left-right", to: "/contact" }
    ];
    const handleLogout = () => {
      closeMenu();
      router.post("/logout", {}, {
        onSuccess: () => {
          emit("logout");
        }
      });
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UButton = _sfc_main$r;
      const _component_UInput = _sfc_main$q;
      const _component_UAvatar = _sfc_main$u;
      const _component_UIcon = _sfc_main$p;
      const _component_UColorModeButton = _sfc_main$v;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "md:hidden" }, _attrs))}><!-- Close Button --><div class="flex justify-end mb-2">`);
      _push(ssrRenderComponent(_component_UButton, {
        color: "neutral",
        variant: "ghost",
        size: "sm",
        icon: "i-heroicons-x-mark",
        onClick: closeMenu,
        class: "hover:bg-gray-100 dark:hover:bg-gray-800"
      }, null, _parent));
      _push(`</div><!-- Mobile Search Bar with vape styling --><div class="mb-4 pb-4 border-b border-gray-200/50 dark:border-gray-700/50"><div class="relative">`);
      _push(ssrRenderComponent(_component_UInput, {
        "model-value": __props.searchQuery,
        "onUpdate:modelValue": ($event) => emit("update:searchQuery", $event),
        placeholder: "Cari liquid, pod, mod...",
        icon: "i-heroicons-magnifying-glass",
        size: "lg",
        class: "w-full",
        ui: {
          base: "bg-gray-100 dark:bg-gray-800/80 border-0 focus:ring-2 focus:ring-primary-500/50",
          rounded: "rounded-xl"
        }
      }, null, _parent));
      _push(`</div></div><!-- User Section -->`);
      if (__props.isLoggedIn) {
        _push(`<div class="mb-4 pb-4 border-b border-gray-200/50 dark:border-gray-700/50"><!-- User Profile Card --><div class="bg-linear-to-r from-primary-500/10 via-purple-500/10 to-pink-500/10 dark:from-primary-900/30 dark:via-purple-900/30 dark:to-pink-900/30 rounded-2xl p-4 mb-4"><div class="flex items-center gap-3"><div class="relative">`);
        _push(ssrRenderComponent(_component_UAvatar, {
          src: __props.user?.avatar || void 0,
          alt: __props.user?.fullName || "User",
          size: "lg",
          class: "ring-2 ring-primary-500/50"
        }, null, _parent));
        _push(`<div class="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white dark:border-gray-900"></div></div><div class="flex-1 min-w-0"><div class="font-bold text-gray-900 dark:text-white truncate">${ssrInterpolate(__props.user?.fullName || "User")}</div><div class="text-xs text-gray-600 dark:text-gray-400 truncate">${ssrInterpolate(__props.user?.email || "")}</div><div class="mt-1 flex items-center gap-1"><span class="px-2 py-0.5 bg-primary-500/20 text-primary-600 dark:text-primary-400 text-xs font-medium rounded-full"> Member </span></div></div>`);
        _push(ssrRenderComponent(unref(Link), {
          href: "/profile",
          onClick: closeMenu
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(_component_UButton, {
                color: "neutral",
                variant: "ghost",
                size: "sm",
                icon: "i-heroicons-pencil-square"
              }, null, _parent2, _scopeId));
            } else {
              return [
                createVNode(_component_UButton, {
                  color: "neutral",
                  variant: "ghost",
                  size: "sm",
                  icon: "i-heroicons-pencil-square"
                })
              ];
            }
          }),
          _: 1
          /* STABLE */
        }, _parent));
        _push(`</div></div><!-- Quick Actions Grid --><div class="grid grid-cols-4 gap-2"><!--[-->`);
        ssrRenderList(quickActions, (action) => {
          _push(ssrRenderComponent(unref(Link), {
            key: action.label,
            href: action.to,
            onClick: closeMenu,
            class: "flex flex-col items-center gap-1.5 p-3 rounded-xl bg-gray-50 dark:bg-gray-800/50 hover:bg-gray-100 dark:hover:bg-gray-700/50 transition-colors"
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`<div class="${ssrRenderClass(["w-10 h-10 rounded-xl flex items-center justify-center", action.color])}"${_scopeId}>`);
                _push2(ssrRenderComponent(_component_UIcon, {
                  name: action.icon,
                  class: "w-5 h-5 text-white"
                }, null, _parent2, _scopeId));
                _push2(`</div><span class="text-xs font-medium text-gray-700 dark:text-gray-300"${_scopeId}>${ssrInterpolate(action.label)}</span>`);
              } else {
                return [
                  createVNode(
                    "div",
                    {
                      class: ["w-10 h-10 rounded-xl flex items-center justify-center", action.color]
                    },
                    [
                      createVNode(_component_UIcon, {
                        name: action.icon,
                        class: "w-5 h-5 text-white"
                      }, null, 8, ["name"])
                    ],
                    2
                    /* CLASS */
                  ),
                  createVNode(
                    "span",
                    { class: "text-xs font-medium text-gray-700 dark:text-gray-300" },
                    toDisplayString(action.label),
                    1
                    /* TEXT */
                  )
                ];
              }
            }),
            _: 2
            /* DYNAMIC */
          }, _parent));
        });
        _push(`<!--]--></div></div>`);
      } else {
        _push(`<!--[--><!-- Guest Auth Section --><div class="mb-4 pb-4 border-b border-gray-200/50 dark:border-gray-700/50"><div class="bg-linear-to-r from-primary-500 to-purple-600 rounded-2xl p-4 text-white"><div class="flex items-center gap-3 mb-3"><div class="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center">`);
        _push(ssrRenderComponent(_component_UIcon, {
          name: "i-heroicons-user-circle",
          class: "w-7 h-7"
        }, null, _parent));
        _push(`</div><div><div class="font-bold">Selamat Datang!</div><div class="text-sm text-white/80">Masuk untuk pengalaman lebih baik</div></div></div><div class="grid grid-cols-2 gap-2">`);
        _push(ssrRenderComponent(unref(Link), {
          href: "/login",
          onClick: closeMenu
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(_component_UButton, {
                color: "white",
                variant: "solid",
                block: "",
                size: "sm"
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(` Masuk `);
                  } else {
                    return [
                      createTextVNode(" Masuk ")
                    ];
                  }
                }),
                _: 1
                /* STABLE */
              }, _parent2, _scopeId));
            } else {
              return [
                createVNode(_component_UButton, {
                  color: "white",
                  variant: "solid",
                  block: "",
                  size: "sm"
                }, {
                  default: withCtx(() => [
                    createTextVNode(" Masuk ")
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
        _push(ssrRenderComponent(unref(Link), {
          href: "/register",
          onClick: closeMenu
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(_component_UButton, {
                color: "white",
                variant: "outline",
                block: "",
                size: "sm",
                class: "border-white/50 text-white hover:bg-white/10"
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(` Daftar `);
                  } else {
                    return [
                      createTextVNode(" Daftar ")
                    ];
                  }
                }),
                _: 1
                /* STABLE */
              }, _parent2, _scopeId));
            } else {
              return [
                createVNode(_component_UButton, {
                  color: "white",
                  variant: "outline",
                  block: "",
                  size: "sm",
                  class: "border-white/50 text-white hover:bg-white/10"
                }, {
                  default: withCtx(() => [
                    createTextVNode(" Daftar ")
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
        _push(`</div></div></div><!--]-->`);
      }
      _push(`<!-- Tab Navigation --><div class="flex gap-2 mb-4 p-1 bg-gray-100 dark:bg-gray-800/80 rounded-xl"><button class="${ssrRenderClass([
        "flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-all",
        activeTab.value === "menu" ? "bg-white dark:bg-gray-700 text-primary-600 dark:text-primary-400 shadow-sm" : "text-gray-600 dark:text-gray-400"
      ])}">`);
      _push(ssrRenderComponent(_component_UIcon, {
        name: "i-heroicons-bars-3",
        class: "w-4 h-4 inline mr-1"
      }, null, _parent));
      _push(` Menu </button><button class="${ssrRenderClass([
        "flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-all",
        activeTab.value === "categories" ? "bg-white dark:bg-gray-700 text-primary-600 dark:text-primary-400 shadow-sm" : "text-gray-600 dark:text-gray-400"
      ])}">`);
      _push(ssrRenderComponent(_component_UIcon, {
        name: "i-heroicons-squares-2x2",
        class: "w-4 h-4 inline mr-1"
      }, null, _parent));
      _push(` Kategori </button></div><!-- Menu Content -->`);
      if (activeTab.value === "menu") {
        _push(`<div class="space-y-2 mb-4"><!--[-->`);
        ssrRenderList(menuItems, (item) => {
          _push(ssrRenderComponent(unref(Link), {
            key: item.label,
            href: item.to,
            onClick: closeMenu,
            class: "flex items-center justify-between p-3 rounded-xl bg-gray-50 dark:bg-gray-800/50 hover:bg-gray-100 dark:hover:bg-gray-700/50 transition-colors"
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`<div class="flex items-center gap-3"${_scopeId}><div class="w-10 h-10 rounded-xl bg-primary-500/10 dark:bg-primary-500/20 flex items-center justify-center"${_scopeId}>`);
                _push2(ssrRenderComponent(_component_UIcon, {
                  name: item.icon,
                  class: "w-5 h-5 text-primary-600 dark:text-primary-400"
                }, null, _parent2, _scopeId));
                _push2(`</div><span class="font-medium text-gray-900 dark:text-white"${_scopeId}>${ssrInterpolate(item.label)}</span></div><div class="flex items-center gap-2"${_scopeId}>`);
                if (item.badge) {
                  _push2(`<span class="${ssrRenderClass(["px-2 py-0.5 text-xs font-bold text-white rounded-full", item.badgeColor])}"${_scopeId}>${ssrInterpolate(item.badge)}</span>`);
                } else {
                  _push2(`<!---->`);
                }
                _push2(ssrRenderComponent(_component_UIcon, {
                  name: "i-heroicons-chevron-right",
                  class: "w-4 h-4 text-gray-400"
                }, null, _parent2, _scopeId));
                _push2(`</div>`);
              } else {
                return [
                  createVNode("div", { class: "flex items-center gap-3" }, [
                    createVNode("div", { class: "w-10 h-10 rounded-xl bg-primary-500/10 dark:bg-primary-500/20 flex items-center justify-center" }, [
                      createVNode(_component_UIcon, {
                        name: item.icon,
                        class: "w-5 h-5 text-primary-600 dark:text-primary-400"
                      }, null, 8, ["name"])
                    ]),
                    createVNode(
                      "span",
                      { class: "font-medium text-gray-900 dark:text-white" },
                      toDisplayString(item.label),
                      1
                      /* TEXT */
                    )
                  ]),
                  createVNode("div", { class: "flex items-center gap-2" }, [
                    item.badge ? (openBlock(), createBlock(
                      "span",
                      {
                        key: 0,
                        class: ["px-2 py-0.5 text-xs font-bold text-white rounded-full", item.badgeColor]
                      },
                      toDisplayString(item.badge),
                      3
                      /* TEXT, CLASS */
                    )) : createCommentVNode("v-if", true),
                    createVNode(_component_UIcon, {
                      name: "i-heroicons-chevron-right",
                      class: "w-4 h-4 text-gray-400"
                    })
                  ])
                ];
              }
            }),
            _: 2
            /* DYNAMIC */
          }, _parent));
        });
        _push(`<!--]--></div>`);
      } else {
        _push(`<!--[--><!-- Categories Content --><div class="mb-4"><div class="grid grid-cols-2 gap-2"><!--[-->`);
        ssrRenderList(__props.categories, (category) => {
          _push(ssrRenderComponent(unref(Link), {
            key: category.label,
            href: category.to || "#",
            onClick: closeMenu,
            class: "flex items-center gap-3 p-3 rounded-xl bg-gray-50 dark:bg-gray-800/50 hover:bg-gray-100 dark:hover:bg-gray-700/50 transition-colors"
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`<div class="w-9 h-9 rounded-lg bg-linear-to-br from-primary-500/20 to-purple-500/20 flex items-center justify-center"${_scopeId}>`);
                _push2(ssrRenderComponent(_component_UIcon, {
                  name: category.icon || "i-heroicons-cube",
                  class: "w-4 h-4 text-primary-600 dark:text-primary-400"
                }, null, _parent2, _scopeId));
                _push2(`</div><span class="text-sm font-medium text-gray-900 dark:text-white truncate"${_scopeId}>${ssrInterpolate(category.label)}</span>`);
              } else {
                return [
                  createVNode("div", { class: "w-9 h-9 rounded-lg bg-linear-to-br from-primary-500/20 to-purple-500/20 flex items-center justify-center" }, [
                    createVNode(_component_UIcon, {
                      name: category.icon || "i-heroicons-cube",
                      class: "w-4 h-4 text-primary-600 dark:text-primary-400"
                    }, null, 8, ["name"])
                  ]),
                  createVNode(
                    "span",
                    { class: "text-sm font-medium text-gray-900 dark:text-white truncate" },
                    toDisplayString(category.label),
                    1
                    /* TEXT */
                  )
                ];
              }
            }),
            _: 2
            /* DYNAMIC */
          }, _parent));
        });
        _push(`<!--]--></div><!-- View All Categories -->`);
        _push(ssrRenderComponent(unref(Link), {
          href: "/collections",
          onClick: closeMenu,
          class: "mt-3 block"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(_component_UButton, {
                color: "primary",
                variant: "soft",
                block: "",
                size: "sm"
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(_component_UIcon, {
                      name: "i-heroicons-squares-2x2",
                      class: "w-4 h-4 mr-2"
                    }, null, _parent3, _scopeId2));
                    _push3(` Lihat Semua Kategori `);
                  } else {
                    return [
                      createVNode(_component_UIcon, {
                        name: "i-heroicons-squares-2x2",
                        class: "w-4 h-4 mr-2"
                      }),
                      createTextVNode(" Lihat Semua Kategori ")
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
                  variant: "soft",
                  block: "",
                  size: "sm"
                }, {
                  default: withCtx(() => [
                    createVNode(_component_UIcon, {
                      name: "i-heroicons-squares-2x2",
                      class: "w-4 h-4 mr-2"
                    }),
                    createTextVNode(" Lihat Semua Kategori ")
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
        _push(`</div><!--]-->`);
      }
      _push(`<!-- Support Links --><div class="mb-4 pb-4 border-t border-gray-200/50 dark:border-gray-700/50 pt-4"><div class="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3"> Bantuan &amp; Dukungan </div><div class="space-y-1"><!--[-->`);
      ssrRenderList(supportLinks, (link) => {
        _push(ssrRenderComponent(unref(Link), {
          key: link.label,
          href: link.to,
          onClick: closeMenu,
          class: "flex items-center gap-3 p-2.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800/50 transition-colors"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(_component_UIcon, {
                name: link.icon,
                class: "w-5 h-5 text-gray-500 dark:text-gray-400"
              }, null, _parent2, _scopeId));
              _push2(`<span class="text-sm text-gray-700 dark:text-gray-300"${_scopeId}>${ssrInterpolate(link.label)}</span>`);
            } else {
              return [
                createVNode(_component_UIcon, {
                  name: link.icon,
                  class: "w-5 h-5 text-gray-500 dark:text-gray-400"
                }, null, 8, ["name"]),
                createVNode(
                  "span",
                  { class: "text-sm text-gray-700 dark:text-gray-300" },
                  toDisplayString(link.label),
                  1
                  /* TEXT */
                )
              ];
            }
          }),
          _: 2
          /* DYNAMIC */
        }, _parent));
      });
      _push(`<!--]--></div></div><!-- Bottom Settings & Logout --><div class="pt-4 border-t border-gray-200/50 dark:border-gray-700/50 space-y-3"><!-- Theme Toggle --><div class="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800/50 rounded-xl"><div class="flex items-center gap-3"><div class="w-9 h-9 rounded-lg bg-gray-200 dark:bg-gray-700 flex items-center justify-center">`);
      _push(ssrRenderComponent(_component_UIcon, {
        name: "i-heroicons-moon",
        class: "w-5 h-5 text-gray-600 dark:text-gray-300"
      }, null, _parent));
      _push(`</div><span class="text-sm font-medium text-gray-700 dark:text-gray-300">Mode Gelap</span></div>`);
      _push(ssrRenderComponent(_component_UColorModeButton, {
        color: "neutral",
        variant: "ghost"
      }, null, _parent));
      _push(`</div><!-- Logout Button -->`);
      if (__props.isLoggedIn) {
        _push(ssrRenderComponent(_component_UButton, {
          onClick: handleLogout,
          block: "",
          color: "error",
          variant: "soft",
          size: "lg",
          class: "rounded-xl"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(_component_UIcon, {
                name: "i-heroicons-arrow-right-on-rectangle",
                class: "w-5 h-5 mr-2"
              }, null, _parent2, _scopeId));
              _push2(` Keluar dari Akun `);
            } else {
              return [
                createVNode(_component_UIcon, {
                  name: "i-heroicons-arrow-right-on-rectangle",
                  class: "w-5 h-5 mr-2"
                }),
                createTextVNode(" Keluar dari Akun ")
              ];
            }
          }),
          _: 1
          /* STABLE */
        }, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(`<!-- Age Verification Notice --><div class="bg-amber-50 dark:bg-amber-900/20 rounded-xl p-3 flex items-start gap-3">`);
      _push(ssrRenderComponent(_component_UIcon, {
        name: "i-heroicons-exclamation-triangle",
        class: "w-5 h-5 text-amber-500 shrink-0 mt-0.5"
      }, null, _parent));
      _push(`<div class="text-xs text-amber-700 dark:text-amber-400"><span class="font-semibold">Peringatan:</span> Produk ini hanya untuk pengguna berusia 21 tahun ke atas. </div></div></div></div>`);
    };
  }
});

const _sfc_setup$8 = _sfc_main$8.setup;
_sfc_main$8.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("inertia/components/HeaderMobileBody.vue");
  return _sfc_setup$8 ? _sfc_setup$8(props, ctx) : void 0;
};

const _sfc_main$7 = /* @__PURE__ */ defineComponent({
  __name: "SecondaryNav",
  __ssrInlineRender: true,
  props: {
    categories: { type: Array, required: true },
    quickLinks: { type: Array, required: true }
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UContainer = _sfc_main$n;
      const _component_UButton = _sfc_main$r;
      const _component_UBadge = _sfc_main$w;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "hidden lg:block bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800" }, _attrs))}>`);
      _push(ssrRenderComponent(_component_UContainer, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="flex items-center justify-between h-12"${_scopeId}><!-- Categories --><div class="flex items-center gap-1"${_scopeId}><!--[-->`);
            ssrRenderList(__props.categories.slice(0, 6), (category) => {
              _push2(ssrRenderComponent(_component_UButton, {
                key: category.label,
                to: category.to,
                color: "neutral",
                variant: "ghost",
                size: "sm",
                icon: category.icon
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`${ssrInterpolate(category.label)}`);
                  } else {
                    return [
                      createTextVNode(
                        toDisplayString(category.label),
                        1
                        /* TEXT */
                      )
                    ];
                  }
                }),
                _: 2
                /* DYNAMIC */
              }, _parent2, _scopeId));
            });
            _push2(`<!--]--></div><!-- Quick Links --><div class="flex items-center gap-1"${_scopeId}><!--[-->`);
            ssrRenderList(__props.quickLinks, (link) => {
              _push2(ssrRenderComponent(_component_UButton, {
                key: link.label,
                to: link.to,
                color: "neutral",
                variant: "ghost",
                size: "sm",
                icon: link.icon
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    if (link.badge) {
                      _push3(`<!--[--><span${_scopeId2}>${ssrInterpolate(link.label)}</span>`);
                      if (typeof link.badge === "object") {
                        _push3(ssrRenderComponent(_component_UBadge, mergeProps({ ref_for: true }, link.badge, { size: "xs" }), null, _parent3, _scopeId2));
                      } else {
                        _push3(`<!---->`);
                      }
                      _push3(`<!--]-->`);
                    } else {
                      _push3(`<!--[-->${ssrInterpolate(link.label)}<!--]-->`);
                    }
                  } else {
                    return [
                      link.badge ? (openBlock(), createBlock(
                        Fragment,
                        { key: 0 },
                        [
                          createVNode(
                            "span",
                            null,
                            toDisplayString(link.label),
                            1
                            /* TEXT */
                          ),
                          typeof link.badge === "object" ? (openBlock(), createBlock(
                            _component_UBadge,
                            mergeProps({
                              key: 0,
                              ref_for: true
                            }, link.badge, { size: "xs" }),
                            null,
                            16
                            /* FULL_PROPS */
                          )) : createCommentVNode("v-if", true)
                        ],
                        64
                        /* STABLE_FRAGMENT */
                      )) : (openBlock(), createBlock(
                        Fragment,
                        { key: 1 },
                        [
                          createTextVNode(
                            toDisplayString(link.label),
                            1
                            /* TEXT */
                          )
                        ],
                        64
                        /* STABLE_FRAGMENT */
                      ))
                    ];
                  }
                }),
                _: 2
                /* DYNAMIC */
              }, _parent2, _scopeId));
            });
            _push2(`<!--]--></div></div>`);
          } else {
            return [
              createVNode("div", { class: "flex items-center justify-between h-12" }, [
                createCommentVNode(" Categories "),
                createVNode("div", { class: "flex items-center gap-1" }, [
                  (openBlock(true), createBlock(
                    Fragment,
                    null,
                    renderList(__props.categories.slice(0, 6), (category) => {
                      return openBlock(), createBlock(_component_UButton, {
                        key: category.label,
                        to: category.to,
                        color: "neutral",
                        variant: "ghost",
                        size: "sm",
                        icon: category.icon
                      }, {
                        default: withCtx(() => [
                          createTextVNode(
                            toDisplayString(category.label),
                            1
                            /* TEXT */
                          )
                        ]),
                        _: 2
                        /* DYNAMIC */
                      }, 1032, ["to", "icon"]);
                    }),
                    128
                    /* KEYED_FRAGMENT */
                  ))
                ]),
                createCommentVNode(" Quick Links "),
                createVNode("div", { class: "flex items-center gap-1" }, [
                  (openBlock(true), createBlock(
                    Fragment,
                    null,
                    renderList(__props.quickLinks, (link) => {
                      return openBlock(), createBlock(_component_UButton, {
                        key: link.label,
                        to: link.to,
                        color: "neutral",
                        variant: "ghost",
                        size: "sm",
                        icon: link.icon
                      }, {
                        default: withCtx(() => [
                          link.badge ? (openBlock(), createBlock(
                            Fragment,
                            { key: 0 },
                            [
                              createVNode(
                                "span",
                                null,
                                toDisplayString(link.label),
                                1
                                /* TEXT */
                              ),
                              typeof link.badge === "object" ? (openBlock(), createBlock(
                                _component_UBadge,
                                mergeProps({
                                  key: 0,
                                  ref_for: true
                                }, link.badge, { size: "xs" }),
                                null,
                                16
                                /* FULL_PROPS */
                              )) : createCommentVNode("v-if", true)
                            ],
                            64
                            /* STABLE_FRAGMENT */
                          )) : (openBlock(), createBlock(
                            Fragment,
                            { key: 1 },
                            [
                              createTextVNode(
                                toDisplayString(link.label),
                                1
                                /* TEXT */
                              )
                            ],
                            64
                            /* STABLE_FRAGMENT */
                          ))
                        ]),
                        _: 2
                        /* DYNAMIC */
                      }, 1032, ["to", "icon"]);
                    }),
                    128
                    /* KEYED_FRAGMENT */
                  ))
                ])
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

const _sfc_setup$7 = _sfc_main$7.setup;
_sfc_main$7.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("inertia/components/SecondaryNav.vue");
  return _sfc_setup$7 ? _sfc_setup$7(props, ctx) : void 0;
};

const cartCount = ref(0);
const cartItems = ref([]);
const isLoading$1 = ref(false);
function getXsrfToken$1() {
  if (typeof document === "undefined") return null;
  const match = document.cookie.match(/XSRF-TOKEN=([^;]+)/);
  return match ? decodeURIComponent(match[1]) : null;
}
function useCart() {
  const fetchCartItems = async () => {
    try {
      const response = await fetch("/api/cart", {
        headers: {
          "X-Requested-With": "XMLHttpRequest"
        },
        credentials: "include"
      });
      if (response.ok) {
        const data = await response.json();
        cartItems.value = data.data?.items || [];
        cartCount.value = cartItems.value.length;
      }
    } catch {
    }
  };
  const addToCart = async (item) => {
    isLoading$1.value = true;
    try {
      const xsrfToken = getXsrfToken$1();
      const response = await fetch("/api/cart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Requested-With": "XMLHttpRequest",
          ...xsrfToken && { "X-XSRF-TOKEN": xsrfToken }
        },
        credentials: "include",
        body: JSON.stringify(item)
      });
      const data = await response.json();
      if (response.status === 401) {
        const currentPath = globalThis.window?.location?.pathname || "/";
        router.visit(`/login?redirect=${encodeURIComponent(currentPath)}`);
        return { success: false, message: "Silakan login terlebih dahulu" };
      }
      if (data.success) {
        await fetchCartItems();
      }
      return data;
    } catch (error) {
      console.error("Add to cart error:", error);
      return { success: false, message: "Terjadi kesalahan, silakan coba lagi" };
    } finally {
      isLoading$1.value = false;
    }
  };
  const updateCartItem = async (id, quantity) => {
    isLoading$1.value = true;
    try {
      const xsrfToken = getXsrfToken$1();
      const response = await fetch(`/api/cart/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "X-Requested-With": "XMLHttpRequest",
          ...xsrfToken && { "X-XSRF-TOKEN": xsrfToken }
        },
        credentials: "include",
        body: JSON.stringify({ quantity })
      });
      const data = await response.json();
      if (data.success) {
        await fetchCartItems();
      }
      return data;
    } catch (error) {
      console.error("Update cart error:", error);
      return { success: false, message: "Terjadi kesalahan, silakan coba lagi" };
    } finally {
      isLoading$1.value = false;
    }
  };
  const removeFromCart = async (id) => {
    isLoading$1.value = true;
    try {
      const xsrfToken = getXsrfToken$1();
      const response = await fetch(`/api/cart/${id}`, {
        method: "DELETE",
        headers: {
          "X-Requested-With": "XMLHttpRequest",
          ...xsrfToken && { "X-XSRF-TOKEN": xsrfToken }
        },
        credentials: "include"
      });
      const data = await response.json();
      if (data.success) {
        await fetchCartItems();
      }
      return data;
    } catch (error) {
      console.error("Remove from cart error:", error);
      return { success: false, message: "Terjadi kesalahan, silakan coba lagi" };
    } finally {
      isLoading$1.value = false;
    }
  };
  const fetchCartCount = async () => {
    try {
      const response = await fetch("/api/cart/count", {
        headers: {
          "X-Requested-With": "XMLHttpRequest"
        },
        credentials: "include"
      });
      if (response.ok) {
        const data = await response.json();
        cartCount.value = data.data?.count || 0;
      }
    } catch {
    }
  };
  const updateCartItemChecked = async (id, checked) => {
    try {
      const xsrfToken = getXsrfToken$1();
      const response = await fetch(`/api/cart/${id}/checked`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "X-Requested-With": "XMLHttpRequest",
          ...xsrfToken && { "X-XSRF-TOKEN": xsrfToken }
        },
        credentials: "include",
        body: JSON.stringify({ checked })
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Update cart item checked error:", error);
      return { success: false, message: "Terjadi kesalahan, silakan coba lagi" };
    }
  };
  return {
    cartCount,
    cartItems,
    isLoading: isLoading$1,
    addToCart,
    updateCartItem,
    removeFromCart,
    fetchCartItems,
    fetchCartCount,
    updateCartItemChecked
  };
}

const _sfc_main$6 = /* @__PURE__ */ defineComponent({
  __name: "CartDropdown",
  __ssrInlineRender: true,
  props: {
    isLoggedIn: { type: Boolean }
  },
  setup(__props) {
    const props = __props;
    const { cartItems, cartCount, isLoading, fetchCartItems, updateCartItem, removeFromCart, updateCartItemChecked } = useCart();
    const toast = useToast();
    const isOpen = ref(false);
    onMounted(async () => {
      if (props.isLoggedIn) {
        await fetchCartItems();
      }
    });
    watch(isOpen, async (open) => {
      if (open && props.isLoggedIn) {
        await fetchCartItems();
      }
    });
    const toggleSelectItem = async (id) => {
      const item = cartItems.value.find((i) => i.id === id);
      if (!item) return;
      const newChecked = !item.checked;
      item.checked = newChecked;
      const result = await updateCartItemChecked(id, newChecked);
      if (!result.success) {
        item.checked = !newChecked;
      }
    };
    const toggleSelectAll = async () => {
      const allChecked = isAllSelected.value;
      const newChecked = !allChecked;
      cartItems.value.forEach((item) => {
        item.checked = newChecked;
      });
      for (const item of cartItems.value) {
        await updateCartItemChecked(item.id, newChecked);
      }
    };
    const isAllSelected = computed(() => {
      return cartItems.value.length > 0 && cartItems.value.every((item) => item.checked);
    });
    const selectedCartItems = computed(() => {
      return cartItems.value.filter((item) => item.checked);
    });
    const subtotal = computed(() => {
      return selectedCartItems.value.reduce((sum, item) => {
        const price = item.variant?.price || item.product.discountPrice || item.product.price;
        return sum + price * item.quantity;
      }, 0);
    });
    const checkedCount = computed(() => {
      return cartItems.value.filter((item) => item.checked).length;
    });
    const formatPrice = (price) => {
      return new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        minimumFractionDigits: 0
      }).format(price);
    };
    const getItemPrice = (item) => {
      return item.variant?.price || item.product.discountPrice || item.product.price;
    };
    const handleUpdateQuantity = async (id, quantity) => {
      if (quantity < 1) return;
      const result = await updateCartItem(id, quantity);
      if (!result.success) {
        toast.error(result.message || "Gagal mengupdate quantity");
      }
    };
    const handleRemoveItem = async (id) => {
      const result = await removeFromCart(id);
      if (result.success) {
        toast.success("Item dihapus dari keranjang");
      } else {
        toast.error(result.message || "Gagal menghapus item");
      }
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UPopover = _sfc_main$x;
      const _component_UButton = _sfc_main$r;
      const _component_UIcon = _sfc_main$p;
      const _component_UBadge = _sfc_main$w;
      const _component_UCheckbox = _sfc_main$y;
      _push(ssrRenderComponent(_component_UPopover, mergeProps({
        open: isOpen.value,
        "onUpdate:open": ($event) => isOpen.value = $event,
        ui: { content: "w-96 max-h-[80vh] z-[200]" }
      }, _attrs), {
        content: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="p-4"${_scopeId}><div class="flex items-center justify-between mb-4"${_scopeId}><h3 class="font-semibold text-gray-900 dark:text-white"${_scopeId}>Keranjang Belanja</h3><span class="text-sm text-gray-500"${_scopeId}>${ssrInterpolate(unref(cartCount))} item</span></div><!-- Not logged in -->`);
            if (!__props.isLoggedIn) {
              _push2(`<div class="text-center py-8"${_scopeId}>`);
              _push2(ssrRenderComponent(_component_UIcon, {
                name: "i-heroicons-shopping-cart",
                class: "w-12 h-12 text-gray-300 mx-auto mb-3"
              }, null, _parent2, _scopeId));
              _push2(`<p class="text-gray-500 mb-4"${_scopeId}>Silakan login untuk melihat keranjang</p>`);
              _push2(ssrRenderComponent(_component_UButton, {
                to: "/login",
                color: "primary",
                size: "sm"
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`Masuk`);
                  } else {
                    return [
                      createTextVNode("Masuk")
                    ];
                  }
                }),
                _: 1
                /* STABLE */
              }, _parent2, _scopeId));
              _push2(`</div>`);
            } else if (unref(cartItems).length === 0) {
              _push2(`<!--[--><!-- Empty cart --><div class="text-center py-8"${_scopeId}>`);
              _push2(ssrRenderComponent(_component_UIcon, {
                name: "i-heroicons-shopping-cart",
                class: "w-12 h-12 text-gray-300 mx-auto mb-3"
              }, null, _parent2, _scopeId));
              _push2(`<p class="text-gray-500"${_scopeId}>Keranjang kosong</p></div><!--]-->`);
            } else {
              _push2(`<!--[--><!-- Cart items --><div${_scopeId}><!-- Select all --><div class="flex items-center gap-2 pb-3 border-b border-gray-200 dark:border-gray-700"${_scopeId}>`);
              _push2(ssrRenderComponent(_component_UCheckbox, {
                "model-value": isAllSelected.value,
                "onUpdate:modelValue": toggleSelectAll
              }, null, _parent2, _scopeId));
              _push2(`<span class="text-sm text-gray-600 dark:text-gray-400"${_scopeId}>Pilih Semua</span></div><!-- Items list --><div class="max-h-64 overflow-y-auto divide-y divide-gray-200 dark:divide-gray-700"${_scopeId}><!--[-->`);
              ssrRenderList(unref(cartItems), (item) => {
                _push2(`<div class="py-3 flex gap-3"${_scopeId}>`);
                _push2(ssrRenderComponent(_component_UCheckbox, {
                  "model-value": item.checked,
                  "onUpdate:modelValue": ($event) => toggleSelectItem(item.id),
                  class: "mt-2"
                }, null, _parent2, _scopeId));
                _push2(`<img${ssrRenderAttr("src", item.product.images[0]?.url || "/placeholder.png")}${ssrRenderAttr("alt", item.product.name)} class="w-16 h-16 object-cover rounded-lg shrink-0"${_scopeId}><div class="flex-1 min-w-0"${_scopeId}><a${ssrRenderAttr("href", `/products/${item.product.slug}`)} class="text-sm font-medium text-gray-900 dark:text-white hover:text-primary-600 line-clamp-2"${_scopeId}>${ssrInterpolate(item.product.name)}</a>`);
                if (item.variant) {
                  _push2(`<p class="text-xs text-gray-500 mt-0.5"${_scopeId}>${ssrInterpolate(item.variant.name)}</p>`);
                } else {
                  _push2(`<!---->`);
                }
                _push2(`<p class="text-sm font-semibold text-primary-600 mt-1"${_scopeId}>${ssrInterpolate(formatPrice(getItemPrice(item)))}</p><div class="flex items-center gap-2 mt-2"${_scopeId}><div class="flex items-center border border-gray-300 dark:border-gray-600 rounded"${_scopeId}><button type="button" class="px-2 py-1 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700"${ssrIncludeBooleanAttr(unref(isLoading) || item.quantity <= 1) ? " disabled" : ""}${_scopeId}>`);
                _push2(ssrRenderComponent(_component_UIcon, {
                  name: "i-heroicons-minus",
                  class: "w-3 h-3"
                }, null, _parent2, _scopeId));
                _push2(`</button><span class="px-2 text-sm min-w-8 text-center"${_scopeId}>${ssrInterpolate(item.quantity)}</span><button type="button" class="px-2 py-1 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700"${ssrIncludeBooleanAttr(unref(isLoading)) ? " disabled" : ""}${_scopeId}>`);
                _push2(ssrRenderComponent(_component_UIcon, {
                  name: "i-heroicons-plus",
                  class: "w-3 h-3"
                }, null, _parent2, _scopeId));
                _push2(`</button></div><button type="button" class="text-red-500 hover:text-red-600 p-1"${ssrIncludeBooleanAttr(unref(isLoading)) ? " disabled" : ""}${_scopeId}>`);
                _push2(ssrRenderComponent(_component_UIcon, {
                  name: "i-heroicons-trash",
                  class: "w-4 h-4"
                }, null, _parent2, _scopeId));
                _push2(`</button></div></div></div>`);
              });
              _push2(`<!--]--></div><!-- Summary --><div class="pt-4 border-t border-gray-200 dark:border-gray-700 mt-2"${_scopeId}><div class="flex items-center justify-between mb-3"${_scopeId}><span class="text-sm text-gray-600 dark:text-gray-400"${_scopeId}> Subtotal (${ssrInterpolate(checkedCount.value)} item) </span><span class="font-semibold text-gray-900 dark:text-white"${_scopeId}>${ssrInterpolate(formatPrice(subtotal.value))}</span></div><div class="grid grid-cols-2 gap-2"${_scopeId}>`);
              _push2(ssrRenderComponent(_component_UButton, {
                to: "/cart",
                color: "neutral",
                variant: "outline",
                block: "",
                onClick: ($event) => isOpen.value = false
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(` Lihat Keranjang `);
                  } else {
                    return [
                      createTextVNode(" Lihat Keranjang ")
                    ];
                  }
                }),
                _: 1
                /* STABLE */
              }, _parent2, _scopeId));
              _push2(ssrRenderComponent(_component_UButton, {
                to: "/checkout",
                color: "primary",
                block: "",
                disabled: checkedCount.value === 0,
                onClick: ($event) => isOpen.value = false
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(` Checkout `);
                  } else {
                    return [
                      createTextVNode(" Checkout ")
                    ];
                  }
                }),
                _: 1
                /* STABLE */
              }, _parent2, _scopeId));
              _push2(`</div></div></div><!--]-->`);
            }
            _push2(`</div>`);
          } else {
            return [
              createVNode("div", { class: "p-4" }, [
                createVNode("div", { class: "flex items-center justify-between mb-4" }, [
                  createVNode("h3", { class: "font-semibold text-gray-900 dark:text-white" }, "Keranjang Belanja"),
                  createVNode(
                    "span",
                    { class: "text-sm text-gray-500" },
                    toDisplayString(unref(cartCount)) + " item",
                    1
                    /* TEXT */
                  )
                ]),
                createCommentVNode(" Not logged in "),
                !__props.isLoggedIn ? (openBlock(), createBlock("div", {
                  key: 0,
                  class: "text-center py-8"
                }, [
                  createVNode(_component_UIcon, {
                    name: "i-heroicons-shopping-cart",
                    class: "w-12 h-12 text-gray-300 mx-auto mb-3"
                  }),
                  createVNode("p", { class: "text-gray-500 mb-4" }, "Silakan login untuk melihat keranjang"),
                  createVNode(_component_UButton, {
                    to: "/login",
                    color: "primary",
                    size: "sm"
                  }, {
                    default: withCtx(() => [
                      createTextVNode("Masuk")
                    ]),
                    _: 1
                    /* STABLE */
                  })
                ])) : unref(cartItems).length === 0 ? (openBlock(), createBlock(
                  Fragment,
                  { key: 1 },
                  [
                    createCommentVNode(" Empty cart "),
                    createVNode("div", { class: "text-center py-8" }, [
                      createVNode(_component_UIcon, {
                        name: "i-heroicons-shopping-cart",
                        class: "w-12 h-12 text-gray-300 mx-auto mb-3"
                      }),
                      createVNode("p", { class: "text-gray-500" }, "Keranjang kosong")
                    ])
                  ],
                  2112
                  /* STABLE_FRAGMENT, DEV_ROOT_FRAGMENT */
                )) : (openBlock(), createBlock(
                  Fragment,
                  { key: 2 },
                  [
                    createCommentVNode(" Cart items "),
                    createVNode("div", null, [
                      createCommentVNode(" Select all "),
                      createVNode("div", { class: "flex items-center gap-2 pb-3 border-b border-gray-200 dark:border-gray-700" }, [
                        createVNode(_component_UCheckbox, {
                          "model-value": isAllSelected.value,
                          "onUpdate:modelValue": toggleSelectAll
                        }, null, 8, ["model-value"]),
                        createVNode("span", { class: "text-sm text-gray-600 dark:text-gray-400" }, "Pilih Semua")
                      ]),
                      createCommentVNode(" Items list "),
                      createVNode("div", { class: "max-h-64 overflow-y-auto divide-y divide-gray-200 dark:divide-gray-700" }, [
                        (openBlock(true), createBlock(
                          Fragment,
                          null,
                          renderList(unref(cartItems), (item) => {
                            return openBlock(), createBlock("div", {
                              key: item.id,
                              class: "py-3 flex gap-3"
                            }, [
                              createVNode(_component_UCheckbox, {
                                "model-value": item.checked,
                                "onUpdate:modelValue": ($event) => toggleSelectItem(item.id),
                                class: "mt-2"
                              }, null, 8, ["model-value", "onUpdate:modelValue"]),
                              createVNode("img", {
                                src: item.product.images[0]?.url || "/placeholder.png",
                                alt: item.product.name,
                                class: "w-16 h-16 object-cover rounded-lg shrink-0"
                              }, null, 8, ["src", "alt"]),
                              createVNode("div", { class: "flex-1 min-w-0" }, [
                                createVNode("a", {
                                  href: `/products/${item.product.slug}`,
                                  class: "text-sm font-medium text-gray-900 dark:text-white hover:text-primary-600 line-clamp-2"
                                }, toDisplayString(item.product.name), 9, ["href"]),
                                item.variant ? (openBlock(), createBlock(
                                  "p",
                                  {
                                    key: 0,
                                    class: "text-xs text-gray-500 mt-0.5"
                                  },
                                  toDisplayString(item.variant.name),
                                  1
                                  /* TEXT */
                                )) : createCommentVNode("v-if", true),
                                createVNode(
                                  "p",
                                  { class: "text-sm font-semibold text-primary-600 mt-1" },
                                  toDisplayString(formatPrice(getItemPrice(item))),
                                  1
                                  /* TEXT */
                                ),
                                createVNode("div", { class: "flex items-center gap-2 mt-2" }, [
                                  createVNode("div", { class: "flex items-center border border-gray-300 dark:border-gray-600 rounded" }, [
                                    createVNode("button", {
                                      type: "button",
                                      class: "px-2 py-1 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700",
                                      disabled: unref(isLoading) || item.quantity <= 1,
                                      onClick: ($event) => handleUpdateQuantity(item.id, item.quantity - 1)
                                    }, [
                                      createVNode(_component_UIcon, {
                                        name: "i-heroicons-minus",
                                        class: "w-3 h-3"
                                      })
                                    ], 8, ["disabled", "onClick"]),
                                    createVNode(
                                      "span",
                                      { class: "px-2 text-sm min-w-8 text-center" },
                                      toDisplayString(item.quantity),
                                      1
                                      /* TEXT */
                                    ),
                                    createVNode("button", {
                                      type: "button",
                                      class: "px-2 py-1 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700",
                                      disabled: unref(isLoading),
                                      onClick: ($event) => handleUpdateQuantity(item.id, item.quantity + 1)
                                    }, [
                                      createVNode(_component_UIcon, {
                                        name: "i-heroicons-plus",
                                        class: "w-3 h-3"
                                      })
                                    ], 8, ["disabled", "onClick"])
                                  ]),
                                  createVNode("button", {
                                    type: "button",
                                    class: "text-red-500 hover:text-red-600 p-1",
                                    disabled: unref(isLoading),
                                    onClick: ($event) => handleRemoveItem(item.id)
                                  }, [
                                    createVNode(_component_UIcon, {
                                      name: "i-heroicons-trash",
                                      class: "w-4 h-4"
                                    })
                                  ], 8, ["disabled", "onClick"])
                                ])
                              ])
                            ]);
                          }),
                          128
                          /* KEYED_FRAGMENT */
                        ))
                      ]),
                      createCommentVNode(" Summary "),
                      createVNode("div", { class: "pt-4 border-t border-gray-200 dark:border-gray-700 mt-2" }, [
                        createVNode("div", { class: "flex items-center justify-between mb-3" }, [
                          createVNode(
                            "span",
                            { class: "text-sm text-gray-600 dark:text-gray-400" },
                            " Subtotal (" + toDisplayString(checkedCount.value) + " item) ",
                            1
                            /* TEXT */
                          ),
                          createVNode(
                            "span",
                            { class: "font-semibold text-gray-900 dark:text-white" },
                            toDisplayString(formatPrice(subtotal.value)),
                            1
                            /* TEXT */
                          )
                        ]),
                        createVNode("div", { class: "grid grid-cols-2 gap-2" }, [
                          createVNode(_component_UButton, {
                            to: "/cart",
                            color: "neutral",
                            variant: "outline",
                            block: "",
                            onClick: ($event) => isOpen.value = false
                          }, {
                            default: withCtx(() => [
                              createTextVNode(" Lihat Keranjang ")
                            ]),
                            _: 1
                            /* STABLE */
                          }, 8, ["onClick"]),
                          createVNode(_component_UButton, {
                            to: "/checkout",
                            color: "primary",
                            block: "",
                            disabled: checkedCount.value === 0,
                            onClick: ($event) => isOpen.value = false
                          }, {
                            default: withCtx(() => [
                              createTextVNode(" Checkout ")
                            ]),
                            _: 1
                            /* STABLE */
                          }, 8, ["disabled", "onClick"])
                        ])
                      ])
                    ])
                  ],
                  2112
                  /* STABLE_FRAGMENT, DEV_ROOT_FRAGMENT */
                ))
              ])
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_UButton, {
              color: "neutral",
              variant: "ghost",
              class: "relative"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_UIcon, {
                    name: "i-heroicons-shopping-cart",
                    class: "w-5 h-5"
                  }, null, _parent3, _scopeId2));
                  if (unref(cartCount) > 0) {
                    _push3(ssrRenderComponent(_component_UBadge, {
                      label: unref(cartCount).toString(),
                      color: "primary",
                      class: "absolute -top-1 -right-1 min-w-4.5 h-4.5 text-[10px]"
                    }, null, _parent3, _scopeId2));
                  } else {
                    _push3(`<!---->`);
                  }
                } else {
                  return [
                    createVNode(_component_UIcon, {
                      name: "i-heroicons-shopping-cart",
                      class: "w-5 h-5"
                    }),
                    unref(cartCount) > 0 ? (openBlock(), createBlock(_component_UBadge, {
                      key: 0,
                      label: unref(cartCount).toString(),
                      color: "primary",
                      class: "absolute -top-1 -right-1 min-w-4.5 h-4.5 text-[10px]"
                    }, null, 8, ["label"])) : createCommentVNode("v-if", true)
                  ];
                }
              }),
              _: 1
              /* STABLE */
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(
                _component_UButton,
                {
                  color: "neutral",
                  variant: "ghost",
                  class: "relative"
                },
                {
                  default: withCtx(() => [
                    createVNode(_component_UIcon, {
                      name: "i-heroicons-shopping-cart",
                      class: "w-5 h-5"
                    }),
                    unref(cartCount) > 0 ? (openBlock(), createBlock(_component_UBadge, {
                      key: 0,
                      label: unref(cartCount).toString(),
                      color: "primary",
                      class: "absolute -top-1 -right-1 min-w-4.5 h-4.5 text-[10px]"
                    }, null, 8, ["label"])) : createCommentVNode("v-if", true)
                  ]),
                  _: 2
                  /* DYNAMIC */
                },
                1024
                /* DYNAMIC_SLOTS */
              )
            ];
          }
        }),
        _: 1
        /* STABLE */
      }, _parent));
    };
  }
});

const _sfc_setup$6 = _sfc_main$6.setup;
_sfc_main$6.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("inertia/components/CartDropdown.vue");
  return _sfc_setup$6 ? _sfc_setup$6(props, ctx) : void 0;
};

const wishlistCount = ref(0);
const wishlistItems = ref([]);
const isLoading = ref(false);
function getXsrfToken() {
  if (typeof document === "undefined") return null;
  const match = document.cookie.match(/XSRF-TOKEN=([^;]+)/);
  return match ? decodeURIComponent(match[1]) : null;
}
function useWishlist() {
  const fetchWishlistItems = async () => {
    try {
      const response = await fetch("/api/wishlist", {
        headers: {
          "X-Requested-With": "XMLHttpRequest"
        },
        credentials: "include"
      });
      if (response.ok) {
        const data = await response.json();
        wishlistItems.value = data.data?.items || [];
        wishlistCount.value = wishlistItems.value.length;
      }
    } catch {
    }
  };
  const toggleWishlist = async (productId) => {
    isLoading.value = true;
    try {
      const xsrfToken = getXsrfToken();
      const response = await fetch("/api/wishlist/toggle", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Requested-With": "XMLHttpRequest",
          ...xsrfToken && { "X-XSRF-TOKEN": xsrfToken }
        },
        credentials: "include",
        body: JSON.stringify({ productId })
      });
      const data = await response.json();
      if (response.status === 401) {
        const currentPath = globalThis.window?.location?.pathname || "/";
        router.visit(`/login?redirect=${encodeURIComponent(currentPath)}`);
        return { success: false, message: "Silakan login terlebih dahulu" };
      }
      if (data.success) {
        await fetchWishlistItems();
      }
      return data;
    } catch (error) {
      console.error("Toggle wishlist error:", error);
      return { success: false, message: "Terjadi kesalahan, silakan coba lagi" };
    } finally {
      isLoading.value = false;
    }
  };
  const checkWishlist = async (productId) => {
    try {
      const response = await fetch(`/api/wishlist/check/${productId}`, {
        headers: {
          "X-Requested-With": "XMLHttpRequest"
        },
        credentials: "include"
      });
      if (response.ok) {
        const data = await response.json();
        return data.data?.isWishlisted || false;
      }
      return false;
    } catch {
      return false;
    }
  };
  const removeFromWishlist = async (productId) => {
    isLoading.value = true;
    try {
      const xsrfToken = getXsrfToken();
      const response = await fetch(`/api/wishlist/${productId}`, {
        method: "DELETE",
        headers: {
          "X-Requested-With": "XMLHttpRequest",
          ...xsrfToken && { "X-XSRF-TOKEN": xsrfToken }
        },
        credentials: "include"
      });
      const data = await response.json();
      if (data.success) {
        await fetchWishlistItems();
      }
      return data;
    } catch (error) {
      console.error("Remove from wishlist error:", error);
      return { success: false, message: "Terjadi kesalahan, silakan coba lagi" };
    } finally {
      isLoading.value = false;
    }
  };
  const fetchWishlistCount = async () => {
    try {
      const response = await fetch("/api/wishlist/count", {
        headers: {
          "X-Requested-With": "XMLHttpRequest"
        },
        credentials: "include"
      });
      if (response.ok) {
        const data = await response.json();
        wishlistCount.value = data.data?.count || 0;
      }
    } catch {
    }
  };
  return {
    wishlistCount,
    wishlistItems,
    isLoading,
    toggleWishlist,
    checkWishlist,
    removeFromWishlist,
    fetchWishlistItems,
    fetchWishlistCount
  };
}

const _sfc_main$5 = /* @__PURE__ */ defineComponent({
  __name: "WishlistDropdown",
  __ssrInlineRender: true,
  props: {
    isLoggedIn: { type: Boolean }
  },
  setup(__props) {
    const props = __props;
    const { wishlistItems, wishlistCount, isLoading: wishlistLoading, fetchWishlistItems, removeFromWishlist } = useWishlist();
    const { addToCart, isLoading: cartLoading } = useCart();
    const toast = useToast();
    const isOpen = ref(false);
    const addingToCart = ref(null);
    onMounted(async () => {
      if (props.isLoggedIn) {
        await fetchWishlistItems();
      }
    });
    watch(isOpen, async (open) => {
      if (open && props.isLoggedIn) {
        await fetchWishlistItems();
      }
    });
    const formatPrice = (price) => {
      return new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        minimumFractionDigits: 0
      }).format(price);
    };
    const getProductPrice = (product) => {
      return product.discountPrice || product.price;
    };
    const handleRemoveFromWishlist = async (productId) => {
      const result = await removeFromWishlist(productId);
      if (result.success) {
        toast.success("Item dihapus dari wishlist");
      } else {
        toast.error(result.message || "Gagal menghapus item");
      }
    };
    const handleAddToCart = async (item) => {
      addingToCart.value = item.productId;
      const result = await addToCart({
        productId: item.productId,
        quantity: 1
      });
      if (result.success) {
        toast.success("Ditambahkan ke keranjang");
      } else {
        toast.error(result.message || "Gagal menambahkan ke keranjang");
      }
      addingToCart.value = null;
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UPopover = _sfc_main$x;
      const _component_UButton = _sfc_main$r;
      const _component_UIcon = _sfc_main$p;
      const _component_UBadge = _sfc_main$w;
      _push(ssrRenderComponent(_component_UPopover, mergeProps({
        open: isOpen.value,
        "onUpdate:open": ($event) => isOpen.value = $event,
        ui: { content: "w-80 max-h-[80vh] z-[200]" }
      }, _attrs), {
        content: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="p-4"${_scopeId}><div class="flex items-center justify-between mb-4"${_scopeId}><h3 class="font-semibold text-gray-900 dark:text-white"${_scopeId}>Wishlist</h3><span class="text-sm text-gray-500"${_scopeId}>${ssrInterpolate(unref(wishlistCount))} item</span></div><!-- Not logged in -->`);
            if (!__props.isLoggedIn) {
              _push2(`<div class="text-center py-8"${_scopeId}>`);
              _push2(ssrRenderComponent(_component_UIcon, {
                name: "i-heroicons-heart",
                class: "w-12 h-12 text-gray-300 mx-auto mb-3"
              }, null, _parent2, _scopeId));
              _push2(`<p class="text-gray-500 mb-4"${_scopeId}>Silakan login untuk melihat wishlist</p>`);
              _push2(ssrRenderComponent(_component_UButton, {
                to: "/login",
                color: "primary",
                size: "sm"
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`Masuk`);
                  } else {
                    return [
                      createTextVNode("Masuk")
                    ];
                  }
                }),
                _: 1
                /* STABLE */
              }, _parent2, _scopeId));
              _push2(`</div>`);
            } else if (unref(wishlistItems).length === 0) {
              _push2(`<!--[--><!-- Empty wishlist --><div class="text-center py-8"${_scopeId}>`);
              _push2(ssrRenderComponent(_component_UIcon, {
                name: "i-heroicons-heart",
                class: "w-12 h-12 text-gray-300 mx-auto mb-3"
              }, null, _parent2, _scopeId));
              _push2(`<p class="text-gray-500"${_scopeId}>Wishlist kosong</p></div><!--]-->`);
            } else {
              _push2(`<!--[--><!-- Wishlist items --><div${_scopeId}><div class="max-h-80 overflow-y-auto divide-y divide-gray-200 dark:divide-gray-700"${_scopeId}><!--[-->`);
              ssrRenderList(unref(wishlistItems), (item) => {
                _push2(`<div class="py-3 flex gap-3"${_scopeId}><img${ssrRenderAttr("src", item.product.images[0]?.url || "/placeholder.png")}${ssrRenderAttr("alt", item.product.name)} class="w-16 h-16 object-cover rounded-lg shrink-0"${_scopeId}><div class="flex-1 min-w-0"${_scopeId}><a${ssrRenderAttr("href", `/products/${item.product.slug}`)} class="text-sm font-medium text-gray-900 dark:text-white hover:text-primary-600 line-clamp-2"${_scopeId}>${ssrInterpolate(item.product.name)}</a><div class="flex items-center gap-2 mt-1"${_scopeId}><span class="text-sm font-semibold text-primary-600"${_scopeId}>${ssrInterpolate(formatPrice(getProductPrice(item.product)))}</span>`);
                if (item.product.discountPrice) {
                  _push2(`<span class="text-xs text-gray-400 line-through"${_scopeId}>${ssrInterpolate(formatPrice(item.product.price))}</span>`);
                } else {
                  _push2(`<!---->`);
                }
                _push2(`</div><div class="flex items-center gap-2 mt-2"${_scopeId}>`);
                _push2(ssrRenderComponent(_component_UButton, {
                  size: "xs",
                  color: "primary",
                  variant: "soft",
                  loading: addingToCart.value === item.productId,
                  disabled: unref(cartLoading),
                  onClick: ($event) => handleAddToCart(item)
                }, {
                  default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      _push3(ssrRenderComponent(_component_UIcon, {
                        name: "i-heroicons-shopping-cart",
                        class: "w-3.5 h-3.5"
                      }, null, _parent3, _scopeId2));
                      _push3(` Keranjang `);
                    } else {
                      return [
                        createVNode(_component_UIcon, {
                          name: "i-heroicons-shopping-cart",
                          class: "w-3.5 h-3.5"
                        }),
                        createTextVNode(" Keranjang ")
                      ];
                    }
                  }),
                  _: 2
                  /* DYNAMIC */
                }, _parent2, _scopeId));
                _push2(ssrRenderComponent(_component_UButton, {
                  size: "xs",
                  color: "error",
                  variant: "ghost",
                  disabled: unref(wishlistLoading),
                  onClick: ($event) => handleRemoveFromWishlist(item.productId)
                }, {
                  default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      _push3(ssrRenderComponent(_component_UIcon, {
                        name: "i-heroicons-trash",
                        class: "w-3.5 h-3.5"
                      }, null, _parent3, _scopeId2));
                    } else {
                      return [
                        createVNode(_component_UIcon, {
                          name: "i-heroicons-trash",
                          class: "w-3.5 h-3.5"
                        })
                      ];
                    }
                  }),
                  _: 2
                  /* DYNAMIC */
                }, _parent2, _scopeId));
                _push2(`</div></div></div>`);
              });
              _push2(`<!--]--></div><!-- View all link --><div class="pt-3 border-t border-gray-200 dark:border-gray-700 mt-2"${_scopeId}>`);
              _push2(ssrRenderComponent(_component_UButton, {
                to: "/wishlist",
                color: "neutral",
                variant: "outline",
                block: "",
                onClick: ($event) => isOpen.value = false
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(` Lihat Semua Wishlist `);
                  } else {
                    return [
                      createTextVNode(" Lihat Semua Wishlist ")
                    ];
                  }
                }),
                _: 1
                /* STABLE */
              }, _parent2, _scopeId));
              _push2(`</div></div><!--]-->`);
            }
            _push2(`</div>`);
          } else {
            return [
              createVNode("div", { class: "p-4" }, [
                createVNode("div", { class: "flex items-center justify-between mb-4" }, [
                  createVNode("h3", { class: "font-semibold text-gray-900 dark:text-white" }, "Wishlist"),
                  createVNode(
                    "span",
                    { class: "text-sm text-gray-500" },
                    toDisplayString(unref(wishlistCount)) + " item",
                    1
                    /* TEXT */
                  )
                ]),
                createCommentVNode(" Not logged in "),
                !__props.isLoggedIn ? (openBlock(), createBlock("div", {
                  key: 0,
                  class: "text-center py-8"
                }, [
                  createVNode(_component_UIcon, {
                    name: "i-heroicons-heart",
                    class: "w-12 h-12 text-gray-300 mx-auto mb-3"
                  }),
                  createVNode("p", { class: "text-gray-500 mb-4" }, "Silakan login untuk melihat wishlist"),
                  createVNode(_component_UButton, {
                    to: "/login",
                    color: "primary",
                    size: "sm"
                  }, {
                    default: withCtx(() => [
                      createTextVNode("Masuk")
                    ]),
                    _: 1
                    /* STABLE */
                  })
                ])) : unref(wishlistItems).length === 0 ? (openBlock(), createBlock(
                  Fragment,
                  { key: 1 },
                  [
                    createCommentVNode(" Empty wishlist "),
                    createVNode("div", { class: "text-center py-8" }, [
                      createVNode(_component_UIcon, {
                        name: "i-heroicons-heart",
                        class: "w-12 h-12 text-gray-300 mx-auto mb-3"
                      }),
                      createVNode("p", { class: "text-gray-500" }, "Wishlist kosong")
                    ])
                  ],
                  2112
                  /* STABLE_FRAGMENT, DEV_ROOT_FRAGMENT */
                )) : (openBlock(), createBlock(
                  Fragment,
                  { key: 2 },
                  [
                    createCommentVNode(" Wishlist items "),
                    createVNode("div", null, [
                      createVNode("div", { class: "max-h-80 overflow-y-auto divide-y divide-gray-200 dark:divide-gray-700" }, [
                        (openBlock(true), createBlock(
                          Fragment,
                          null,
                          renderList(unref(wishlistItems), (item) => {
                            return openBlock(), createBlock("div", {
                              key: item.id,
                              class: "py-3 flex gap-3"
                            }, [
                              createVNode("img", {
                                src: item.product.images[0]?.url || "/placeholder.png",
                                alt: item.product.name,
                                class: "w-16 h-16 object-cover rounded-lg shrink-0"
                              }, null, 8, ["src", "alt"]),
                              createVNode("div", { class: "flex-1 min-w-0" }, [
                                createVNode("a", {
                                  href: `/products/${item.product.slug}`,
                                  class: "text-sm font-medium text-gray-900 dark:text-white hover:text-primary-600 line-clamp-2"
                                }, toDisplayString(item.product.name), 9, ["href"]),
                                createVNode("div", { class: "flex items-center gap-2 mt-1" }, [
                                  createVNode(
                                    "span",
                                    { class: "text-sm font-semibold text-primary-600" },
                                    toDisplayString(formatPrice(getProductPrice(item.product))),
                                    1
                                    /* TEXT */
                                  ),
                                  item.product.discountPrice ? (openBlock(), createBlock(
                                    "span",
                                    {
                                      key: 0,
                                      class: "text-xs text-gray-400 line-through"
                                    },
                                    toDisplayString(formatPrice(item.product.price)),
                                    1
                                    /* TEXT */
                                  )) : createCommentVNode("v-if", true)
                                ]),
                                createVNode("div", { class: "flex items-center gap-2 mt-2" }, [
                                  createVNode(_component_UButton, {
                                    size: "xs",
                                    color: "primary",
                                    variant: "soft",
                                    loading: addingToCart.value === item.productId,
                                    disabled: unref(cartLoading),
                                    onClick: ($event) => handleAddToCart(item)
                                  }, {
                                    default: withCtx(() => [
                                      createVNode(_component_UIcon, {
                                        name: "i-heroicons-shopping-cart",
                                        class: "w-3.5 h-3.5"
                                      }),
                                      createTextVNode(" Keranjang ")
                                    ]),
                                    _: 1
                                    /* STABLE */
                                  }, 8, ["loading", "disabled", "onClick"]),
                                  createVNode(_component_UButton, {
                                    size: "xs",
                                    color: "error",
                                    variant: "ghost",
                                    disabled: unref(wishlistLoading),
                                    onClick: ($event) => handleRemoveFromWishlist(item.productId)
                                  }, {
                                    default: withCtx(() => [
                                      createVNode(_component_UIcon, {
                                        name: "i-heroicons-trash",
                                        class: "w-3.5 h-3.5"
                                      })
                                    ]),
                                    _: 1
                                    /* STABLE */
                                  }, 8, ["disabled", "onClick"])
                                ])
                              ])
                            ]);
                          }),
                          128
                          /* KEYED_FRAGMENT */
                        ))
                      ]),
                      createCommentVNode(" View all link "),
                      createVNode("div", { class: "pt-3 border-t border-gray-200 dark:border-gray-700 mt-2" }, [
                        createVNode(_component_UButton, {
                          to: "/wishlist",
                          color: "neutral",
                          variant: "outline",
                          block: "",
                          onClick: ($event) => isOpen.value = false
                        }, {
                          default: withCtx(() => [
                            createTextVNode(" Lihat Semua Wishlist ")
                          ]),
                          _: 1
                          /* STABLE */
                        }, 8, ["onClick"])
                      ])
                    ])
                  ],
                  2112
                  /* STABLE_FRAGMENT, DEV_ROOT_FRAGMENT */
                ))
              ])
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_UButton, {
              color: "neutral",
              variant: "ghost",
              class: "relative"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_UIcon, {
                    name: "i-heroicons-heart",
                    class: "w-5 h-5"
                  }, null, _parent3, _scopeId2));
                  if (unref(wishlistCount) > 0) {
                    _push3(ssrRenderComponent(_component_UBadge, {
                      label: unref(wishlistCount).toString(),
                      color: "primary",
                      class: "absolute -top-1 -right-1 min-w-4.5 h-4.5 text-[10px]"
                    }, null, _parent3, _scopeId2));
                  } else {
                    _push3(`<!---->`);
                  }
                } else {
                  return [
                    createVNode(_component_UIcon, {
                      name: "i-heroicons-heart",
                      class: "w-5 h-5"
                    }),
                    unref(wishlistCount) > 0 ? (openBlock(), createBlock(_component_UBadge, {
                      key: 0,
                      label: unref(wishlistCount).toString(),
                      color: "primary",
                      class: "absolute -top-1 -right-1 min-w-4.5 h-4.5 text-[10px]"
                    }, null, 8, ["label"])) : createCommentVNode("v-if", true)
                  ];
                }
              }),
              _: 1
              /* STABLE */
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(
                _component_UButton,
                {
                  color: "neutral",
                  variant: "ghost",
                  class: "relative"
                },
                {
                  default: withCtx(() => [
                    createVNode(_component_UIcon, {
                      name: "i-heroicons-heart",
                      class: "w-5 h-5"
                    }),
                    unref(wishlistCount) > 0 ? (openBlock(), createBlock(_component_UBadge, {
                      key: 0,
                      label: unref(wishlistCount).toString(),
                      color: "primary",
                      class: "absolute -top-1 -right-1 min-w-4.5 h-4.5 text-[10px]"
                    }, null, 8, ["label"])) : createCommentVNode("v-if", true)
                  ]),
                  _: 2
                  /* DYNAMIC */
                },
                1024
                /* DYNAMIC_SLOTS */
              )
            ];
          }
        }),
        _: 1
        /* STABLE */
      }, _parent));
    };
  }
});

const _sfc_setup$5 = _sfc_main$5.setup;
_sfc_main$5.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("inertia/components/WishlistDropdown.vue");
  return _sfc_setup$5 ? _sfc_setup$5(props, ctx) : void 0;
};

const _sfc_main$4 = /* @__PURE__ */ defineComponent({
  __name: "HeaderActions",
  __ssrInlineRender: true,
  props: {
    isLoggedIn: { type: Boolean, default: false },
    user: { type: Object, default: null },
    userMenuItems: { type: Array, default: () => [] }
  },
  emits: ["logout"],
  setup(__props, { emit: __emit }) {
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UColorModeButton = _sfc_main$v;
      const _component_UDropdownMenu = _sfc_main$z;
      const _component_UButton = _sfc_main$r;
      const _component_UAvatar = _sfc_main$u;
      const _component_UIcon = _sfc_main$p;
      _push(`<!--[--><!-- Cart Dropdown -->`);
      _push(ssrRenderComponent(_sfc_main$6, { "is-logged-in": __props.isLoggedIn }, null, _parent));
      _push(`<!-- Wishlist Dropdown -->`);
      _push(ssrRenderComponent(_sfc_main$5, { "is-logged-in": __props.isLoggedIn }, null, _parent));
      _push(`<!-- Color Mode (desktop) -->`);
      _push(ssrRenderComponent(_component_UColorModeButton, {
        color: "neutral",
        variant: "ghost",
        class: "hidden md:flex"
      }, null, _parent));
      _push(`<!-- User Menu / Auth (desktop) -->`);
      if (__props.isLoggedIn) {
        _push(ssrRenderComponent(_component_UDropdownMenu, {
          items: __props.userMenuItems,
          ui: { content: "z-[200]" },
          class: "hidden md:flex"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(_component_UButton, {
                color: "neutral",
                variant: "ghost",
                class: "gap-2"
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(_component_UAvatar, {
                      src: __props.user?.avatar || void 0,
                      alt: __props.user?.fullName || "User",
                      size: "sm"
                    }, null, _parent3, _scopeId2));
                    _push3(`<span class="hidden lg:inline font-medium"${_scopeId2}>${ssrInterpolate(__props.user?.fullName || "User")}</span>`);
                    _push3(ssrRenderComponent(_component_UIcon, {
                      name: "i-heroicons-chevron-down",
                      class: "w-4 h-4"
                    }, null, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(_component_UAvatar, {
                        src: __props.user?.avatar || void 0,
                        alt: __props.user?.fullName || "User",
                        size: "sm"
                      }, null, 8, ["src", "alt"]),
                      createVNode(
                        "span",
                        { class: "hidden lg:inline font-medium" },
                        toDisplayString(__props.user?.fullName || "User"),
                        1
                        /* TEXT */
                      ),
                      createVNode(_component_UIcon, {
                        name: "i-heroicons-chevron-down",
                        class: "w-4 h-4"
                      })
                    ];
                  }
                }),
                _: 1
                /* STABLE */
              }, _parent2, _scopeId));
            } else {
              return [
                createVNode(_component_UButton, {
                  color: "neutral",
                  variant: "ghost",
                  class: "gap-2"
                }, {
                  default: withCtx(() => [
                    createVNode(_component_UAvatar, {
                      src: __props.user?.avatar || void 0,
                      alt: __props.user?.fullName || "User",
                      size: "sm"
                    }, null, 8, ["src", "alt"]),
                    createVNode(
                      "span",
                      { class: "hidden lg:inline font-medium" },
                      toDisplayString(__props.user?.fullName || "User"),
                      1
                      /* TEXT */
                    ),
                    createVNode(_component_UIcon, {
                      name: "i-heroicons-chevron-down",
                      class: "w-4 h-4"
                    })
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
      } else {
        _push(`<div class="hidden md:flex items-center gap-2">`);
        _push(ssrRenderComponent(_component_UButton, {
          to: "/login",
          color: "neutral",
          variant: "outline",
          size: "sm"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`Masuk`);
            } else {
              return [
                createTextVNode("Masuk")
              ];
            }
          }),
          _: 1
          /* STABLE */
        }, _parent));
        _push(ssrRenderComponent(_component_UButton, {
          to: "/register",
          color: "primary",
          size: "sm"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`Daftar`);
            } else {
              return [
                createTextVNode("Daftar")
              ];
            }
          }),
          _: 1
          /* STABLE */
        }, _parent));
        _push(`</div>`);
      }
      _push(`<!--]-->`);
    };
  }
});

const _sfc_setup$4 = _sfc_main$4.setup;
_sfc_main$4.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("inertia/components/HeaderActions.vue");
  return _sfc_setup$4 ? _sfc_setup$4(props, ctx) : void 0;
};

const _sfc_main$3 = /* @__PURE__ */ defineComponent({
  __name: "SearchBar",
  __ssrInlineRender: true,
  props: {
    modelValue: { type: String, default: "" },
    placeholder: { type: String, default: "Cari produk, brand, atau kategori..." },
    size: { type: String, default: "lg" },
    showSubmit: { type: Boolean, default: true },
    class: { type: String, default: "" }
  },
  emits: ["update:modelValue", "submit"],
  setup(__props, { emit: __emit }) {
    const emit = __emit;
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UInput = _sfc_main$q;
      const _component_UButton = _sfc_main$r;
      _push(`<form${ssrRenderAttrs(mergeProps({ class: __props.class }, _attrs))}>`);
      _push(ssrRenderComponent(_component_UInput, {
        "model-value": __props.modelValue,
        "onUpdate:modelValue": ($event) => emit("update:modelValue", $event),
        placeholder: __props.placeholder,
        icon: "i-heroicons-magnifying-glass",
        size: __props.size,
        class: "w-full",
        ui: { icon: { trailing: { pointer: "" } }, rounded: "rounded-lg" }
      }, createSlots({
        _: 2
        /* DYNAMIC */
      }, [
        __props.showSubmit ? {
          name: "trailing",
          fn: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(_component_UButton, {
                type: "submit",
                size: "sm",
                color: "primary",
                label: "Cari"
              }, null, _parent2, _scopeId));
            } else {
              return [
                createVNode(_component_UButton, {
                  type: "submit",
                  size: "sm",
                  color: "primary",
                  label: "Cari"
                })
              ];
            }
          }),
          key: "0"
        } : void 0
      ]), _parent));
      _push(`</form>`);
    };
  }
});

const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("inertia/components/SearchBar.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};

const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "ImpersonationBanner",
  __ssrInlineRender: true,
  setup(__props) {
    const page = usePage();
    const impersonating = computed(() => {
      const data = page.props.impersonating;
      return {
        isImpersonating: data?.isImpersonating || false,
        customerName: data?.customerName || null
      };
    });
    const stopImpersonating = () => {
      router.post("/admin/impersonate/stop", {}, {
        onSuccess: () => {
        }
      });
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UIcon = _sfc_main$p;
      const _component_UButton = _sfc_main$r;
      if (impersonating.value.isImpersonating) {
        _push(`<div${ssrRenderAttrs(mergeProps({ class: "bg-amber-500 text-amber-950 px-4 py-2 text-center text-sm font-medium" }, _attrs))}><div class="max-w-7xl mx-auto flex items-center justify-center gap-3">`);
        _push(ssrRenderComponent(_component_UIcon, {
          name: "i-heroicons-eye",
          class: "w-4 h-4"
        }, null, _parent));
        _push(`<span> Anda sedang login sebagai <strong>${ssrInterpolate(impersonating.value.customerName)}</strong></span>`);
        _push(ssrRenderComponent(_component_UButton, {
          size: "xs",
          color: "neutral",
          variant: "solid",
          onClick: stopImpersonating
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(` Kembali ke Admin `);
            } else {
              return [
                createTextVNode(" Kembali ke Admin ")
              ];
            }
          }),
          _: 1
          /* STABLE */
        }, _parent));
        _push(`</div></div>`);
      } else {
        _push(`<!---->`);
      }
    };
  }
});

const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("inertia/components/ImpersonationBanner.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};

const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "Header",
  __ssrInlineRender: true,
  setup(__props) {
    const page = usePage();
    const searchQuery = ref("");
    const isMobileMenuOpen = ref(false);
    const { fetchCartItems } = useCart();
    const { fetchWishlistItems } = useWishlist();
    const closeMobileMenu = () => {
      isMobileMenuOpen.value = false;
    };
    const auth = computed(() => page.props.auth || { isLoggedIn: false, user: null });
    const isLoggedIn = computed(() => auth.value.isLoggedIn);
    const currentUser = computed(() => auth.value.user);
    onMounted(() => {
      if (isLoggedIn.value) {
        fetchCartItems();
        fetchWishlistItems();
      }
    });
    watch(isLoggedIn, (loggedIn) => {
      if (loggedIn) {
        fetchCartItems();
        fetchWishlistItems();
      }
    });
    const categories = computed(() => {
      const navCategories = page.props.navCategories;
      return navCategories || [];
    });
    const quickLinks = computed(() => [
      {
        label: "Artikel",
        to: "/artikel",
        icon: "i-heroicons-fire",
        badge: { label: "Hot", color: "error" }
      },
      {
        label: "Best Seller",
        to: "/best-seller",
        icon: "i-heroicons-trophy"
      },
      {
        label: "New Arrival",
        to: "/new-arrival",
        icon: "i-heroicons-sparkles",
        badge: { label: "New", color: "success" }
      }
    ]);
    const userMenuItems = computed(() => [
      [
        { label: "Dashboard", icon: "i-heroicons-squares-2x2", to: "/dashboard" },
        { label: "Pesanan Saya", icon: "i-heroicons-shopping-bag", to: "/orders" },
        { label: "Wishlist", icon: "i-heroicons-heart", to: "/wishlist" }
      ],
      [
        { label: "Profil Saya", icon: "i-heroicons-user-circle", to: "/profile" },
        { label: "Alamat", icon: "i-heroicons-map-pin", to: "/dashboard" }
      ],
      [
        { label: "Logout", icon: "i-heroicons-arrow-right-on-rectangle", onSelect: logout }
      ]
    ]);
    const handleSearch = () => {
      if (searchQuery.value.trim()) {
        window.location.href = `/products?search=${encodeURIComponent(searchQuery.value)}`;
      }
    };
    const logout = () => {
      router.post("/logout", {}, {
        onSuccess: () => {
        }
      });
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UHeader = _sfc_main$b;
      const _component_UIcon = _sfc_main$p;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "relative z-50" }, _attrs))}><!-- Impersonation Banner -->`);
      _push(ssrRenderComponent(_sfc_main$2, null, null, _parent));
      _push(`<!-- Top Bar -->`);
      _push(ssrRenderComponent(Topbar, null, null, _parent));
      _push(`<!-- Main Header with glassmorphism matching global background -->`);
      _push(ssrRenderComponent(_component_UHeader, {
        open: isMobileMenuOpen.value,
        "onUpdate:open": ($event) => isMobileMenuOpen.value = $event,
        title: "OGITU Vape Marketplace",
        class: "sticky top-0 z-50 bg-linear-to-r from-gray-50/90 via-primary-50/80 to-gray-50/90 dark:from-gray-950/90 dark:via-black/80 dark:to-gray-950/90 backdrop-blur-xl border-b border-primary-200/30 dark:border-white/10 shadow-lg shadow-primary-500/5 dark:shadow-primary-500/10"
      }, {
        title: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="flex items-center gap-2"${_scopeId}><div class="w-10 h-10 bg-linear-to-br from-primary-500 to-secondary-500 rounded-xl flex items-center justify-center shadow-lg shadow-primary-500/30"${_scopeId}>`);
            _push2(ssrRenderComponent(_component_UIcon, {
              name: "i-heroicons-bolt",
              class: "w-6 h-6 text-white"
            }, null, _parent2, _scopeId));
            _push2(`</div><div class="hidden sm:block"${_scopeId}><div class="text-lg font-bold text-gray-900 dark:text-white"${_scopeId}>ogitu.com</div><div class="text-xs text-gray-600 dark:text-gray-400"${_scopeId}>Vape Marketplace</div></div></div>`);
          } else {
            return [
              createVNode("div", { class: "flex items-center gap-2" }, [
                createVNode("div", { class: "w-10 h-10 bg-linear-to-br from-primary-500 to-secondary-500 rounded-xl flex items-center justify-center shadow-lg shadow-primary-500/30" }, [
                  createVNode(_component_UIcon, {
                    name: "i-heroicons-bolt",
                    class: "w-6 h-6 text-white"
                  })
                ]),
                createVNode("div", { class: "hidden sm:block" }, [
                  createVNode("div", { class: "text-lg font-bold text-gray-900 dark:text-white" }, "ogitu.com"),
                  createVNode("div", { class: "text-xs text-gray-600 dark:text-gray-400" }, "Vape Marketplace")
                ])
              ])
            ];
          }
        }),
        right: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_sfc_main$4, {
              "is-logged-in": isLoggedIn.value,
              user: currentUser.value,
              "user-menu-items": userMenuItems.value,
              onLogout: logout
            }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(_sfc_main$4, {
                "is-logged-in": isLoggedIn.value,
                user: currentUser.value,
                "user-menu-items": userMenuItems.value,
                onLogout: logout
              }, null, 8, ["is-logged-in", "user", "user-menu-items"])
            ];
          }
        }),
        body: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_sfc_main$8, {
              "is-logged-in": isLoggedIn.value,
              user: currentUser.value,
              "quick-links": quickLinks.value,
              categories: categories.value,
              "search-query": searchQuery.value,
              "onUpdate:searchQuery": (v) => searchQuery.value = v,
              onLogout: logout,
              onClose: closeMobileMenu
            }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(_sfc_main$8, {
                "is-logged-in": isLoggedIn.value,
                user: currentUser.value,
                "quick-links": quickLinks.value,
                categories: categories.value,
                "search-query": searchQuery.value,
                "onUpdate:searchQuery": (v) => searchQuery.value = v,
                onLogout: logout,
                onClose: closeMobileMenu
              }, null, 8, ["is-logged-in", "user", "quick-links", "categories", "search-query", "onUpdate:searchQuery"])
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="w-full"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$3, {
              "model-value": searchQuery.value,
              "onUpdate:modelValue": (v) => searchQuery.value = v,
              placeholder: "Cari produk, brand, atau kategori...",
              size: "lg",
              "show-submit": false,
              onSubmit: handleSearch
            }, null, _parent2, _scopeId));
            _push2(`</div>`);
          } else {
            return [
              createVNode("div", { class: "w-full" }, [
                createVNode(_sfc_main$3, {
                  "model-value": searchQuery.value,
                  "onUpdate:modelValue": (v) => searchQuery.value = v,
                  placeholder: "Cari produk, brand, atau kategori...",
                  size: "lg",
                  "show-submit": false,
                  onSubmit: handleSearch
                }, null, 8, ["model-value", "onUpdate:modelValue"])
              ])
            ];
          }
        }),
        _: 1
        /* STABLE */
      }, _parent));
      _push(`<!-- Secondary Navigation - Categories & Quick Links -->`);
      _push(ssrRenderComponent(_sfc_main$7, {
        categories: categories.value,
        "quick-links": quickLinks.value
      }, null, _parent));
      _push(ssrRenderComponent(BannerInfo, null, null, _parent));
      _push(`</div>`);
    };
  }
});

const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("inertia/layouts/ecommerce/Header.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "default",
  __ssrInlineRender: true,
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UApp = _sfc_main$A;
      const _component_UMain = _sfc_main$o;
      _push(ssrRenderComponent(_component_UApp, _attrs, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_sfc_main$1, null, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_UMain, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  ssrRenderSlot(_ctx.$slots, "default", {}, null, _push3, _parent3, _scopeId2);
                } else {
                  return [
                    renderSlot(_ctx.$slots, "default")
                  ];
                }
              }),
              _: 3
              /* FORWARDED */
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$e, null, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$B, null, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(_sfc_main$1),
              createVNode(_component_UMain, null, {
                default: withCtx(() => [
                  renderSlot(_ctx.$slots, "default")
                ]),
                _: 3
                /* FORWARDED */
              }),
              createVNode(_sfc_main$e),
              createVNode(_sfc_main$B)
            ];
          }
        }),
        _: 3
        /* FORWARDED */
      }, _parent));
    };
  }
});

const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("inertia/layouts/default.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as _, _sfc_main$n as a, _sfc_main$d as b, useWishlist as c, useCart as u };
