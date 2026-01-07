import { createHead } from '@unhead/vue/client';
import { reactive, computed, unref, isRef, ref, toRef, inject } from 'vue';
import colors from 'tailwindcss/colors';
import { createHooks } from 'hookable';
import { usePage } from '@inertiajs/vue3';
import { createSharedComposable, useColorMode as useColorMode$1, useDark } from '@vueuse/core';
import { defu } from 'defu';
import { isEqual } from 'ohash/utils';
import { useHead } from '@unhead/vue';

const _47Users_47ict_47Documents_47AdonisJs_47ogitu_46com_47node_modules_47_64nuxt_47ui_47dist_47runtime_47vue_47plugins_47head_46js = {
  install(app) {
    if (app._context.provides.usehead) {
      return;
    }
    const head = createHead();
    app.use(head);
  }
};

const appConfig = {"ui":{"colors":{"primary":"purple","secondary":"blue","success":"green","info":"blue","warning":"yellow","error":"red","neutral":"slate"},"icons":{"arrowDown":"i-lucide-arrow-down","arrowLeft":"i-lucide-arrow-left","arrowRight":"i-lucide-arrow-right","arrowUp":"i-lucide-arrow-up","caution":"i-lucide-circle-alert","check":"i-lucide-check","chevronDoubleLeft":"i-lucide-chevrons-left","chevronDoubleRight":"i-lucide-chevrons-right","chevronDown":"i-lucide-chevron-down","chevronLeft":"i-lucide-chevron-left","chevronRight":"i-lucide-chevron-right","chevronUp":"i-lucide-chevron-up","close":"i-lucide-x","copy":"i-lucide-copy","copyCheck":"i-lucide-copy-check","dark":"i-lucide-moon","ellipsis":"i-lucide-ellipsis","error":"i-lucide-circle-x","external":"i-lucide-arrow-up-right","eye":"i-lucide-eye","eyeOff":"i-lucide-eye-off","file":"i-lucide-file","folder":"i-lucide-folder","folderOpen":"i-lucide-folder-open","hash":"i-lucide-hash","info":"i-lucide-info","light":"i-lucide-sun","loading":"i-lucide-loader-circle","menu":"i-lucide-menu","minus":"i-lucide-minus","panelClose":"i-lucide-panel-left-close","panelOpen":"i-lucide-panel-left-open","plus":"i-lucide-plus","reload":"i-lucide-rotate-ccw","search":"i-lucide-search","stop":"i-lucide-square","success":"i-lucide-circle-check","system":"i-lucide-monitor","tip":"i-lucide-lightbulb","upload":"i-lucide-upload","warning":"i-lucide-triangle-alert"},"tv":{"twMergeConfig":{}},"header":{"slots":{"center":"hidden lg:flex w-full max-w-lg px-2"}}},"colorMode":true};

const _appConfig = reactive(appConfig);
const useAppConfig = () => _appConfig;

// @__NO_SIDE_EFFECTS__
function defineLocale(options) {
  return defu(options, { dir: "ltr" });
}

function omit(data, keys) {
  const result = { ...data };
  for (const key of keys) {
    delete result[key];
  }
  return result;
}
function get(object, path, defaultValue) {
  if (typeof path === "string") {
    path = path.split(".").map((key) => {
      const numKey = Number(key);
      return Number.isNaN(numKey) ? key : numKey;
    });
  }
  let result = object;
  for (const key of path) {
    if (result === void 0 || result === null) {
      return defaultValue;
    }
    result = result[key];
  }
  return result !== void 0 ? result : defaultValue;
}
function looseToNumber(val) {
  const n = Number.parseFloat(val);
  return Number.isNaN(n) ? val : n;
}
function compare(value, currentValue, comparator) {
  if (value === void 0 || currentValue === void 0) {
    return false;
  }
  if (typeof value === "string") {
    return value === currentValue;
  }
  if (typeof comparator === "function") {
    return comparator(value, currentValue);
  }
  if (typeof comparator === "string") {
    return get(value, comparator) === get(currentValue, comparator);
  }
  return isEqual(value, currentValue);
}
function isEmpty(value) {
  if (value == null) {
    return true;
  }
  if (typeof value === "boolean" || typeof value === "number") {
    return false;
  }
  if (typeof value === "string") {
    return value.trim().length === 0;
  }
  if (Array.isArray(value)) {
    return value.length === 0;
  }
  if (value instanceof Map || value instanceof Set) {
    return value.size === 0;
  }
  if (value instanceof Date || value instanceof RegExp || typeof value === "function") {
    return false;
  }
  if (typeof value === "object") {
    for (const _ in value) {
      if (Object.prototype.hasOwnProperty.call(value, _)) {
        return false;
      }
    }
    return true;
  }
  return false;
}
function getDisplayValue(items, value, options = {}) {
  const { valueKey, labelKey } = options;
  const foundItem = items.find((item) => {
    const itemValue = typeof item === "object" && item !== null && valueKey ? get(item, valueKey) : item;
    return compare(itemValue, value);
  });
  if (isEmpty(value) && foundItem) {
    return labelKey ? get(foundItem, labelKey) : void 0;
  }
  if (isEmpty(value)) {
    return void 0;
  }
  const source = foundItem ?? value;
  if (source === null || source === void 0) {
    return void 0;
  }
  if (typeof source === "object") {
    return labelKey ? get(source, labelKey) : void 0;
  }
  return String(source);
}
function isArrayOfArray(item) {
  return Array.isArray(item[0]);
}
function mergeClasses(appConfigClass, propClass) {
  if (!appConfigClass && !propClass) {
    return "";
  }
  return [
    ...Array.isArray(appConfigClass) ? appConfigClass : [appConfigClass],
    propClass
  ].filter(Boolean);
}
function getSlotChildrenText(children) {
  return children.map((node) => {
    if (!node.children || typeof node.children === "string") return node.children || "";
    else if (Array.isArray(node.children)) return getSlotChildrenText(node.children);
    else if (node.children.default) return getSlotChildrenText(node.children.default());
  }).join("");
}

function buildTranslator(locale) {
  return (path, option) => translate(path, option, unref(locale));
}
function translate(path, option, locale) {
  const prop = get(locale, `messages.${path}`, path);
  return prop.replace(
    /\{(\w+)\}/g,
    (_, key) => `${option?.[key] ?? `{${key}}`}`
  );
}
function buildLocaleContext(locale) {
  const lang = computed(() => unref(locale).name);
  const code = computed(() => unref(locale).code);
  const dir = computed(() => unref(locale).dir);
  const localeRef = isRef(locale) ? locale : ref(locale);
  return {
    lang,
    code,
    dir,
    locale: localeRef,
    t: buildTranslator(locale)
  };
}

const en = defineLocale({
  name: "English",
  code: "en",
  messages: {
    alert: {
      close: "Close"
    },
    authForm: {
      hidePassword: "Hide password",
      showPassword: "Show password",
      submit: "Continue"
    },
    banner: {
      close: "Close"
    },
    calendar: {
      nextMonth: "Next month",
      nextYear: "Next year",
      prevMonth: "Previous month",
      prevYear: "Previous year"
    },
    carousel: {
      dots: "Choose slide to display",
      goto: "Go to slide {slide}",
      next: "Next",
      prev: "Prev"
    },
    chatPrompt: {
      placeholder: "Type your message here\u2026"
    },
    chatPromptSubmit: {
      label: "Send prompt"
    },
    colorMode: {
      dark: "Dark",
      light: "Light",
      switchToDark: "Switch to dark mode",
      switchToLight: "Switch to light mode",
      system: "System"
    },
    commandPalette: {
      back: "Back",
      close: "Close",
      noData: "No data",
      noMatch: "No matching data",
      placeholder: "Type a command or search\u2026"
    },
    contentSearch: {
      links: "Links",
      theme: "Theme"
    },
    contentSearchButton: {
      label: "Search\u2026"
    },
    contentToc: {
      title: "On this page"
    },
    dashboardSearch: {
      theme: "Theme"
    },
    dashboardSearchButton: {
      label: "Search\u2026"
    },
    dashboardSidebarCollapse: {
      collapse: "Collapse sidebar",
      expand: "Expand sidebar"
    },
    dashboardSidebarToggle: {
      close: "Close sidebar",
      open: "Open sidebar"
    },
    error: {
      clear: "Back to home"
    },
    fileUpload: {
      removeFile: "Remove {filename}"
    },
    header: {
      close: "Close menu",
      open: "Open menu"
    },
    inputMenu: {
      create: 'Create "{label}"',
      noData: "No data",
      noMatch: "No matching data"
    },
    inputNumber: {
      decrement: "Decrement",
      increment: "Increment"
    },
    modal: {
      close: "Close"
    },
    pricingTable: {
      caption: "Pricing plan comparison"
    },
    prose: {
      codeCollapse: {
        closeText: "Collapse",
        name: "code",
        openText: "Expand"
      },
      collapsible: {
        closeText: "Hide",
        name: "properties",
        openText: "Show"
      },
      pre: {
        copy: "Copy code to clipboard"
      }
    },
    selectMenu: {
      create: 'Create "{label}"',
      noData: "No data",
      noMatch: "No matching data",
      search: "Search\u2026"
    },
    slideover: {
      close: "Close"
    },
    table: {
      noData: "No data"
    },
    toast: {
      close: "Close"
    }
  }
});

const localeContextInjectionKey = Symbol.for("nuxt-ui.locale-context");
const _useLocale = (localeOverrides) => {
  const locale = localeOverrides || toRef(inject(localeContextInjectionKey, en));
  return buildLocaleContext(computed(() => locale.value || en));
};
const useLocale = createSharedComposable(_useLocale) ;

const useRoute = () => {
  const page = usePage();
  return {
    fullPath: page.url
  };
};
const useColorMode = () => {
  if (!appConfig.colorMode) {
    return {
      forced: true
    };
  }
  const { store, system } = useColorMode$1();
  return {
    get preference() {
      return store.value === "auto" ? "system" : store.value;
    },
    set preference(value) {
      store.value = value === "system" ? "auto" : value;
    },
    get value() {
      return store.value === "auto" ? system.value : store.value;
    },
    forced: false
  };
};
const state = {};
const useState = (key, init) => {
  if (state[key]) {
    return state[key];
  }
  const value = ref(init());
  state[key] = value;
  return value;
};
const hooks = createHooks();
function useNuxtApp() {
  return {
    isHydrating: true,
    payload: { serverRendered: typeof window === "undefined" },
    hooks,
    hook: hooks.hook
  };
}
function defineNuxtPlugin(plugin) {
  return {
    install(app) {
      app.runWithContext(() => plugin({ vueApp: app }));
    }
  };
}

const shades = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950];
function getColor(color, shade) {
  if (color in colors && typeof colors[color] === "object" && shade in colors[color]) {
    return colors[color][shade];
  }
  return "";
}
function generateShades(key, value, prefix) {
  const prefixStr = prefix ? `${prefix}-` : "";
  return `${shades.map((shade) => `--ui-color-${key}-${shade}: var(--${prefixStr}color-${value === "neutral" ? "old-neutral" : value}-${shade}, ${getColor(value, shade)});`).join("\n  ")}`;
}
function generateColor(key, shade) {
  return `--ui-${key}: var(--ui-color-${key}-${shade});`;
}
const _47Users_47ict_47Documents_47AdonisJs_47ogitu_46com_47node_modules_47_64nuxt_47ui_47dist_47runtime_47plugins_47colors_46js = defineNuxtPlugin(() => {
  const appConfig = useAppConfig();
  const nuxtApp = useNuxtApp();
  const root = computed(() => {
    const { neutral, ...colors2 } = appConfig.ui.colors;
    const prefix = appConfig.ui.prefix;
    return `@layer theme {
  :root, :host {
  ${Object.entries(appConfig.ui.colors).map(([key, value]) => generateShades(key, value, prefix)).join("\n  ")}
  }
  :root, :host, .light {
  ${Object.keys(colors2).map((key) => generateColor(key, 500)).join("\n  ")}
  }
  .dark {
  ${Object.keys(colors2).map((key) => generateColor(key, 400)).join("\n  ")}
  }
}`;
  });
  const headData = {
    style: [{
      innerHTML: () => root.value,
      tagPriority: -2,
      id: "nuxt-ui-colors"
    }]
  };
  if (!nuxtApp.payload.serverRendered) {
    const style = document.createElement("style");
    style.innerHTML = root.value;
    style.setAttribute("data-nuxt-ui-colors", "");
    document.head.appendChild(style);
    headData.script = [{
      innerHTML: "document.head.removeChild(document.querySelector('[data-nuxt-ui-colors]'))"
    }];
  }
  useHead(headData);
});

const _47Users_47ict_47Documents_47AdonisJs_47ogitu_46com_47node_modules_47_64nuxt_47ui_47dist_47runtime_47vue_47plugins_47color_45mode_46js = {
  install() {
    useDark();
  }
};

const ui = {
  install (app) {
    app.use(_47Users_47ict_47Documents_47AdonisJs_47ogitu_46com_47node_modules_47_64nuxt_47ui_47dist_47runtime_47vue_47plugins_47head_46js);
    app.use(_47Users_47ict_47Documents_47AdonisJs_47ogitu_46com_47node_modules_47_64nuxt_47ui_47dist_47runtime_47plugins_47colors_46js);
    app.use(_47Users_47ict_47Documents_47AdonisJs_47ogitu_46com_47node_modules_47_64nuxt_47ui_47dist_47runtime_47vue_47plugins_47color_45mode_46js);
  }
};

export { useAppConfig as a, appConfig as b, useState as c, useLocale as d, localeContextInjectionKey as e, useColorMode as f, get as g, compare as h, isArrayOfArray as i, getDisplayValue as j, useRoute as k, looseToNumber as l, mergeClasses as m, getSlotChildrenText as n, omit as o, ui as u };
