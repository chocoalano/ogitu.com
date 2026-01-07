import { computed, ref, watch, onMounted, onBeforeUnmount, unref, mergeProps, withCtx, createVNode, createBlock, createCommentVNode, openBlock, Fragment, renderList, renderSlot, useSSRContext } from 'vue';
import { ssrRenderComponent, ssrRenderClass, ssrRenderList, ssrRenderAttrs, ssrRenderSlot, ssrRenderAttr } from 'vue/server-renderer';
import useEmblaCarousel from 'embla-carousel-vue';
import { useForwardProps, Primitive } from 'reka-ui';
import { reactivePick } from '@vueuse/core';
import { d as useLocale, a as useAppConfig } from './virtual_nuxt-ui-plugins-BqI2j5ZJ.js';
import { t as tv, a as _sfc_main$1 } from './Button-BBveOjhJ.js';

const theme = {
  "slots": {
    "root": "relative focus:outline-none",
    "viewport": "overflow-hidden",
    "container": "flex items-start",
    "item": "min-w-0 shrink-0 basis-full",
    "controls": "",
    "arrows": "",
    "prev": "absolute rounded-full",
    "next": "absolute rounded-full",
    "dots": "absolute inset-x-0 -bottom-7 flex flex-wrap items-center justify-center gap-3",
    "dot": [
      "cursor-pointer size-3 bg-accented rounded-full",
      "transition"
    ]
  },
  "variants": {
    "orientation": {
      "vertical": {
        "container": "flex-col -mt-4",
        "item": "pt-4",
        "prev": "top-4 sm:-top-12 left-1/2 -translate-x-1/2 rotate-90 rtl:-rotate-90",
        "next": "bottom-4 sm:-bottom-12 left-1/2 -translate-x-1/2 rotate-90 rtl:-rotate-90"
      },
      "horizontal": {
        "container": "flex-row -ms-4",
        "item": "ps-4",
        "prev": "start-4 sm:-start-12 top-1/2 -translate-y-1/2",
        "next": "end-4 sm:-end-12 top-1/2 -translate-y-1/2"
      }
    },
    "active": {
      "true": {
        "dot": "data-[state=active]:bg-inverted"
      }
    }
  }
};

const _sfc_main = {
  __name: 'Carousel',
  __ssrInlineRender: true,
  props: {
  as: { type: null, required: false },
  prev: { type: Object, required: false },
  prevIcon: { type: null, required: false },
  next: { type: Object, required: false },
  nextIcon: { type: null, required: false },
  arrows: { type: Boolean, required: false, default: false },
  dots: { type: Boolean, required: false, default: false },
  orientation: { type: null, required: false, default: "horizontal" },
  items: { type: Array, required: false },
  autoplay: { type: [Boolean, Object], required: false, default: false },
  autoScroll: { type: [Boolean, Object], required: false, default: false },
  autoHeight: { type: [Boolean, Object], required: false, default: false },
  classNames: { type: [Boolean, Object], required: false, default: false },
  fade: { type: [Boolean, Object], required: false, default: false },
  wheelGestures: { type: [Boolean, Object], required: false, default: false },
  class: { type: null, required: false },
  ui: { type: null, required: false },
  align: { type: [String, Function], required: false, default: "center" },
  containScroll: { type: [Boolean, String], required: false, default: "trimSnaps" },
  slidesToScroll: { type: [String, Number], required: false, default: 1 },
  dragFree: { type: Boolean, required: false, default: false },
  dragThreshold: { type: Number, required: false, default: 10 },
  inViewThreshold: { type: null, required: false, default: 0 },
  loop: { type: Boolean, required: false, default: false },
  skipSnaps: { type: Boolean, required: false, default: false },
  duration: { type: Number, required: false, default: 25 },
  startIndex: { type: Number, required: false, default: 0 },
  watchDrag: { type: [Boolean, Function], required: false, default: true },
  watchResize: { type: [Boolean, Function], required: false, default: true },
  watchSlides: { type: [Boolean, Function], required: false, default: true },
  watchFocus: { type: [Boolean, Function], required: false, default: true },
  active: { type: Boolean, required: false, default: true },
  breakpoints: { type: Object, required: false, default: () => ({}) }
},
  emits: ["select"],
  setup(__props, { expose: __expose, emit: __emit }) {

const props = __props;

const emits = __emit;
const { dir, t } = useLocale();
const appConfig = useAppConfig();
const rootProps = useForwardProps(reactivePick(props, "active", "align", "breakpoints", "containScroll", "dragFree", "dragThreshold", "duration", "inViewThreshold", "loop", "skipSnaps", "slidesToScroll", "startIndex", "watchDrag", "watchResize", "watchSlides", "watchFocus"));
const prevIcon = computed(() => props.prevIcon || (dir.value === "rtl" ? appConfig.ui.icons.arrowRight : appConfig.ui.icons.arrowLeft));
const nextIcon = computed(() => props.nextIcon || (dir.value === "rtl" ? appConfig.ui.icons.arrowLeft : appConfig.ui.icons.arrowRight));
const ui = computed(() => tv({ extend: tv(theme), ...appConfig.ui?.carousel || {} })({
  orientation: props.orientation
}));
const options = computed(() => ({
  ...props.fade ? { align: "center", containScroll: false } : {},
  ...rootProps.value,
  axis: props.orientation === "horizontal" ? "x" : "y",
  direction: dir.value === "rtl" ? "rtl" : "ltr"
}));
const plugins = ref([]);
async function loadPlugins() {
  const emblaPlugins = [];
  if (props.autoplay) {
    const AutoplayPlugin = await import('embla-carousel-autoplay').then((r) => r.default);
    emblaPlugins.push(AutoplayPlugin(typeof props.autoplay === "boolean" ? {} : props.autoplay));
  }
  if (props.autoScroll) {
    const AutoScrollPlugin = await import('embla-carousel-auto-scroll').then((r) => r.default);
    emblaPlugins.push(AutoScrollPlugin(typeof props.autoScroll === "boolean" ? {} : props.autoScroll));
  }
  if (props.autoHeight) {
    const AutoHeightPlugin = await import('embla-carousel-auto-height').then((r) => r.default);
    emblaPlugins.push(AutoHeightPlugin(typeof props.autoHeight === "boolean" ? {} : props.autoHeight));
  }
  if (props.classNames) {
    const ClassNamesPlugin = await import('embla-carousel-class-names').then((r) => r.default);
    emblaPlugins.push(ClassNamesPlugin(typeof props.classNames === "boolean" ? {} : props.classNames));
  }
  if (props.fade) {
    const FadePlugin = await import('embla-carousel-fade').then((r) => r.default);
    emblaPlugins.push(FadePlugin(typeof props.fade === "boolean" ? {} : props.fade));
  }
  if (props.wheelGestures) {
    const { WheelGesturesPlugin } = await import('embla-carousel-wheel-gestures');
    emblaPlugins.push(WheelGesturesPlugin(typeof props.wheelGestures === "boolean" ? {} : props.wheelGestures));
  }
  plugins.value = emblaPlugins;
}
watch(() => [props.autoplay, props.autoScroll, props.autoHeight, props.classNames, props.fade, props.wheelGestures], async () => {
  await loadPlugins();
  emblaApi.value?.reInit(options.value, plugins.value);
}, { immediate: true });
const [emblaRef, emblaApi] = useEmblaCarousel(options, plugins);
watch(options, () => {
  emblaApi.value?.reInit(options.value, plugins.value);
}, { flush: "post" });
function scrollPrev() {
  emblaApi.value?.scrollPrev();
}
function scrollNext() {
  emblaApi.value?.scrollNext();
}
function scrollTo(index) {
  emblaApi.value?.scrollTo(index);
}
function onKeyDown(event) {
  let prevKey;
  let nextKey;
  if (props.orientation === "horizontal") {
    prevKey = dir.value === "ltr" ? "ArrowLeft" : "ArrowRight";
    nextKey = dir.value === "ltr" ? "ArrowRight" : "ArrowLeft";
  } else {
    prevKey = "ArrowUp";
    nextKey = "ArrowDown";
  }
  if (event.key === prevKey) {
    event.preventDefault();
    scrollPrev();
    return;
  }
  if (event.key === nextKey) {
    event.preventDefault();
    scrollNext();
  }
}
const canScrollNext = ref(false);
const canScrollPrev = ref(false);
const selectedIndex = ref(0);
const scrollSnaps = ref([]);
function onInit(api) {
  scrollSnaps.value = api?.scrollSnapList() || [];
}
function onSelect(api) {
  canScrollNext.value = api?.canScrollNext() || false;
  canScrollPrev.value = api?.canScrollPrev() || false;
  selectedIndex.value = api?.selectedScrollSnap() || 0;
  emits("select", selectedIndex.value);
}
function isCarouselItem(item) {
  return typeof item === "object" && item !== null;
}
onMounted(() => {
  if (!emblaApi.value) {
    return;
  }
  emblaApi.value.on("init", onInit);
  emblaApi.value.on("init", onSelect);
  emblaApi.value.on("reInit", onInit);
  emblaApi.value.on("reInit", onSelect);
  emblaApi.value.on("select", onSelect);
});
onBeforeUnmount(() => {
  if (!emblaApi.value) {
    return;
  }
  emblaApi.value.off("init", onInit);
  emblaApi.value.off("init", onSelect);
  emblaApi.value.off("reInit", onInit);
  emblaApi.value.off("reInit", onSelect);
  emblaApi.value.off("select", onSelect);
});
__expose({
  emblaRef,
  emblaApi
});

return (_ctx, _push, _parent, _attrs) => {
  _push(ssrRenderComponent(unref(Primitive), mergeProps({
    as: __props.as,
    role: "region",
    "aria-roledescription": "carousel",
    "data-orientation": __props.orientation,
    tabindex: "0",
    "data-slot": "root",
    class: ui.value.root({ class: [props.ui?.root, props.class] }),
    onKeydown: onKeyDown
  }, _attrs), {
    default: withCtx((_, _push, _parent, _scopeId) => {
      if (_push) {
        _push(`<div data-slot="viewport" class="${
          ssrRenderClass(ui.value.viewport({ class: props.ui?.viewport }))
        }"${
          _scopeId
        }><div data-slot="container" class="${
          ssrRenderClass(ui.value.container({ class: props.ui?.container }))
        }"${
          _scopeId
        }><!--[-->`);
        ssrRenderList(__props.items, (item, index) => {
          _push(`<div${
            ssrRenderAttrs(mergeProps({ key: index }, { ref_for: true }, __props.dots ? { role: 'tabpanel' } : { 'role': 'group', 'aria-roledescription': 'slide' }, {
              "data-slot": "item",
              class: ui.value.item({ class: [props.ui?.item, isCarouselItem(item) && item.ui?.item, isCarouselItem(item) && item.class] })
            }))
          }${
            _scopeId
          }>`);
          ssrRenderSlot(_ctx.$slots, "default", {
            item: item,
            index: index
          }, null, _push, _parent, _scopeId);
          _push(`</div>`);
        });
        _push(`<!--]--></div></div>`);
        if (__props.arrows || __props.dots) {
          _push(`<div data-slot="controls" class="${
            ssrRenderClass(ui.value.controls({ class: props.ui?.controls }))
          }"${
            _scopeId
          }>`);
          if (__props.arrows) {
            _push(`<div data-slot="arrows" class="${
              ssrRenderClass(ui.value.arrows({ class: props.ui?.arrows }))
            }"${
              _scopeId
            }>`);
            _push(ssrRenderComponent(_sfc_main$1, mergeProps({
              disabled: !canScrollPrev.value,
              icon: prevIcon.value,
              color: "neutral",
              variant: "outline",
              "aria-label": unref(t)('carousel.prev')
            }, typeof __props.prev === 'object' ? __props.prev : void 0, {
              "data-slot": "prev",
              class: ui.value.prev({ class: props.ui?.prev }),
              onClick: scrollPrev
            }), null, _parent, _scopeId));
            _push(ssrRenderComponent(_sfc_main$1, mergeProps({
              disabled: !canScrollNext.value,
              icon: nextIcon.value,
              color: "neutral",
              variant: "outline",
              "aria-label": unref(t)('carousel.next')
            }, typeof __props.next === 'object' ? __props.next : void 0, {
              "data-slot": "next",
              class: ui.value.next({ class: props.ui?.next }),
              onClick: scrollNext
            }), null, _parent, _scopeId));
            _push(`</div>`);
          } else {
            _push(`<!---->`);
          }
          if (__props.dots) {
            _push(`<div role="tablist"${
              ssrRenderAttr("aria-label", unref(t)('carousel.dots'))
            } data-slot="dots" class="${
              ssrRenderClass(ui.value.dots({ class: props.ui?.dots }))
            }"${
              _scopeId
            }><!--[-->`);
            ssrRenderList(scrollSnaps.value, (_, index) => {
              _push(`<button type="button" role="tab"${
                ssrRenderAttr("aria-label", unref(t)('carousel.goto', { slide: index + 1 }))
              }${
                ssrRenderAttr("aria-selected", selectedIndex.value === index)
              } data-slot="dot" class="${
                ssrRenderClass(ui.value.dot({ class: props.ui?.dot, active: selectedIndex.value === index }))
              }"${
                ssrRenderAttr("data-state", selectedIndex.value === index ? 'active' : void 0)
              }${
                _scopeId
              }></button>`);
            });
            _push(`<!--]--></div>`);
          } else {
            _push(`<!---->`);
          }
          _push(`</div>`);
        } else {
          _push(`<!---->`);
        }
      } else {
        return [
          createVNode("div", {
            ref_key: "emblaRef",
            ref: emblaRef,
            "data-slot": "viewport",
            class: ui.value.viewport({ class: props.ui?.viewport })
          }, [
            createVNode("div", {
              "data-slot": "container",
              class: ui.value.container({ class: props.ui?.container })
            }, [
              (openBlock(true), createBlock(Fragment, null, renderList(__props.items, (item, index) => {
                return (openBlock(), createBlock("div", mergeProps({ key: index }, { ref_for: true }, __props.dots ? { role: 'tabpanel' } : { 'role': 'group', 'aria-roledescription': 'slide' }, {
                  "data-slot": "item",
                  class: ui.value.item({ class: [props.ui?.item, isCarouselItem(item) && item.ui?.item, isCarouselItem(item) && item.class] })
                }), [
                  renderSlot(_ctx.$slots, "default", {
                    item: item,
                    index: index
                  })
                ], 16 /* FULL_PROPS */))
              }), 128 /* KEYED_FRAGMENT */))
            ], 2 /* CLASS */)
          ], 2 /* CLASS */),
          (__props.arrows || __props.dots)
            ? (openBlock(), createBlock("div", {
                key: 0,
                "data-slot": "controls",
                class: ui.value.controls({ class: props.ui?.controls })
              }, [
                (__props.arrows)
                  ? (openBlock(), createBlock("div", {
                      key: 0,
                      "data-slot": "arrows",
                      class: ui.value.arrows({ class: props.ui?.arrows })
                    }, [
                      createVNode(_sfc_main$1, mergeProps({
                        disabled: !canScrollPrev.value,
                        icon: prevIcon.value,
                        color: "neutral",
                        variant: "outline",
                        "aria-label": unref(t)('carousel.prev')
                      }, typeof __props.prev === 'object' ? __props.prev : void 0, {
                        "data-slot": "prev",
                        class: ui.value.prev({ class: props.ui?.prev }),
                        onClick: scrollPrev
                      }), null, 16 /* FULL_PROPS */, ["disabled", "icon", "aria-label", "class"]),
                      createVNode(_sfc_main$1, mergeProps({
                        disabled: !canScrollNext.value,
                        icon: nextIcon.value,
                        color: "neutral",
                        variant: "outline",
                        "aria-label": unref(t)('carousel.next')
                      }, typeof __props.next === 'object' ? __props.next : void 0, {
                        "data-slot": "next",
                        class: ui.value.next({ class: props.ui?.next }),
                        onClick: scrollNext
                      }), null, 16 /* FULL_PROPS */, ["disabled", "icon", "aria-label", "class"])
                    ], 2 /* CLASS */))
                  : createCommentVNode("v-if", true),
                (__props.dots)
                  ? (openBlock(), createBlock("div", {
                      key: 1,
                      role: "tablist",
                      "aria-label": unref(t)('carousel.dots'),
                      "data-slot": "dots",
                      class: ui.value.dots({ class: props.ui?.dots })
                    }, [
                      (openBlock(true), createBlock(Fragment, null, renderList(scrollSnaps.value, (_, index) => {
                        return (openBlock(), createBlock("button", {
                          key: index,
                          type: "button",
                          role: "tab",
                          "aria-label": unref(t)('carousel.goto', { slide: index + 1 }),
                          "aria-selected": selectedIndex.value === index,
                          "data-slot": "dot",
                          class: ui.value.dot({ class: props.ui?.dot, active: selectedIndex.value === index }),
                          "data-state": selectedIndex.value === index ? 'active' : void 0,
                          onClick: $event => (scrollTo(index))
                        }, null, 10 /* CLASS, PROPS */, ["aria-label", "aria-selected", "data-state", "onClick"]))
                      }), 128 /* KEYED_FRAGMENT */))
                    ], 10 /* CLASS, PROPS */, ["aria-label"]))
                  : createCommentVNode("v-if", true)
              ], 2 /* CLASS */))
            : createCommentVNode("v-if", true)
        ]
      }
    }),
    _: 3 /* FORWARDED */
  }, _parent));
}
}

};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext()
  ;(ssrContext.modules || (ssrContext.modules = new Set())).add("node_modules/@nuxt/ui/dist/runtime/components/Carousel.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : undefined
};

export { _sfc_main as _ };
