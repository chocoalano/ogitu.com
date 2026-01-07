import { _ as _sfc_main$2, a as _sfc_main$4 } from './Button-BTdvmZ8N.js';
import { _ as _sfc_main$3 } from './Badge-CQlYH3Fo.js';
import { defineComponent, ref, computed, unref, withCtx, createVNode, toDisplayString, createTextVNode, useSSRContext } from 'vue';
import { ssrRenderComponent, ssrInterpolate, ssrRenderList, ssrRenderClass } from 'vue/server-renderer';
import { Head, Link } from '@inertiajs/vue3';
import { _ as _sfc_main$1 } from './default-pjkA2Ka0.js';
import 'defu';
import 'reka-ui';
import './virtual_nuxt-ui-plugins-CrG8Uaxr.js';
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
import './Modal-VctJV7vb.js';
import 'vaul-vue';
import './DropdownMenu-Zcq6i1qV.js';
import './Checkbox-DCS-_c5K.js';

const _sfc_main = /* @__PURE__ */ defineComponent({
  ...{ layout: _sfc_main$1 },
  __name: "blog",
  __ssrInlineRender: true,
  props: {
    blogData: {}
  },
  setup(__props) {
    const props = __props;
    const selectedCategory = ref("All");
    const filteredPosts = computed(() => {
      if (selectedCategory.value === "All") {
        return props.blogData.posts;
      }
      return props.blogData.posts.filter((post) => post.category === selectedCategory.value);
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UIcon = _sfc_main$2;
      const _component_UInput = _sfc_main$3;
      const _component_UButton = _sfc_main$4;
      _push(`<!--[-->`);
      _push(ssrRenderComponent(unref(Head), { title: "Blog & Artikel - Ogitu" }, null, _parent));
      _push(`<div class="min-h-screen bg-linear-to-b from-gray-50 via-white to-gray-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-900"><!-- Hero Section --><div class="relative bg-linear-to-r from-violet-500 via-purple-500 to-fuchsia-500 overflow-hidden"><div class="absolute inset-0 opacity-10"><svg class="w-full h-full" xmlns="http://www.w3.org/2000/svg"><defs><pattern id="blog-pattern" x="0" y="0" width="60" height="60" patternUnits="userSpaceOnUse"><rect x="10" y="10" width="40" height="40" rx="4" fill="none" stroke="white" stroke-width="1"></rect><line x1="15" y1="25" x2="45" y2="25" stroke="white" stroke-width="1"></line><line x1="15" y1="35" x2="35" y2="35" stroke="white" stroke-width="1"></line></pattern></defs><rect width="100%" height="100%" fill="url(#blog-pattern)"></rect></svg></div><div class="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16"><nav class="flex items-center gap-2 text-sm mb-6 text-white/80">`);
      _push(ssrRenderComponent(unref(Link), {
        href: "/",
        class: "hover:text-white transition-colors"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_UIcon, {
              name: "i-heroicons-home",
              class: "w-4 h-4"
            }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_UIcon, {
                name: "i-heroicons-home",
                class: "w-4 h-4"
              })
            ];
          }
        }),
        _: 1
        /* STABLE */
      }, _parent));
      _push(ssrRenderComponent(_component_UIcon, {
        name: "i-heroicons-chevron-right",
        class: "w-4 h-4"
      }, null, _parent));
      _push(`<span class="text-white font-medium">Blog</span></nav><div class="text-center"><div class="w-16 h-16 mx-auto mb-4 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center">`);
      _push(ssrRenderComponent(_component_UIcon, {
        name: "i-heroicons-newspaper",
        class: "w-8 h-8 text-white"
      }, null, _parent));
      _push(`</div><h1 class="text-3xl sm:text-4xl font-bold text-white mb-3">Blog &amp; Artikel</h1><p class="text-white/80 max-w-2xl mx-auto"> Tips, tutorial, review, dan berita terbaru seputar dunia vaping </p></div></div></div><div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12"><!-- Featured Post --><div class="mb-12">`);
      _push(ssrRenderComponent(unref(Link), {
        href: `/blog/${__props.blogData.featured.slug}`,
        class: "block group bg-white dark:bg-gray-800/80 rounded-3xl border border-gray-200/80 dark:border-gray-700/50 overflow-hidden hover:shadow-xl transition-all"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="grid grid-cols-1 lg:grid-cols-2 gap-0"${_scopeId}><div class="aspect-video lg:aspect-auto bg-gray-200 dark:bg-gray-700"${_scopeId}><div class="w-full h-full flex items-center justify-center text-gray-400"${_scopeId}>`);
            _push2(ssrRenderComponent(_component_UIcon, {
              name: "i-heroicons-photo",
              class: "w-16 h-16"
            }, null, _parent2, _scopeId));
            _push2(`</div></div><div class="p-6 sm:p-8 flex flex-col justify-center"${_scopeId}><div class="flex items-center gap-3 mb-4"${_scopeId}><span class="px-3 py-1 bg-primary-500/10 text-primary-600 dark:text-primary-400 text-sm font-medium rounded-full"${_scopeId}>${ssrInterpolate(__props.blogData.featured.category)}</span><span class="text-sm text-gray-500 dark:text-gray-400"${_scopeId}>${ssrInterpolate(__props.blogData.featured.readTime)} read </span></div><h2 class="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-4 group-hover:text-primary-500 transition-colors"${_scopeId}>${ssrInterpolate(__props.blogData.featured.title)}</h2><p class="text-gray-600 dark:text-gray-400 mb-6"${_scopeId}>${ssrInterpolate(__props.blogData.featured.excerpt)}</p><div class="flex items-center justify-between"${_scopeId}><div class="flex items-center gap-3"${_scopeId}><div class="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center"${_scopeId}>`);
            _push2(ssrRenderComponent(_component_UIcon, {
              name: "i-heroicons-user",
              class: "w-5 h-5 text-gray-400"
            }, null, _parent2, _scopeId));
            _push2(`</div><div${_scopeId}><p class="text-sm font-medium text-gray-900 dark:text-white"${_scopeId}>${ssrInterpolate(__props.blogData.featured.author)}</p><p class="text-xs text-gray-500 dark:text-gray-400"${_scopeId}>${ssrInterpolate(__props.blogData.featured.date)}</p></div></div><span class="text-primary-500 font-medium flex items-center gap-1 group-hover:gap-2 transition-all"${_scopeId}> Baca `);
            _push2(ssrRenderComponent(_component_UIcon, {
              name: "i-heroicons-arrow-right",
              class: "w-4 h-4"
            }, null, _parent2, _scopeId));
            _push2(`</span></div></div></div>`);
          } else {
            return [
              createVNode("div", { class: "grid grid-cols-1 lg:grid-cols-2 gap-0" }, [
                createVNode("div", { class: "aspect-video lg:aspect-auto bg-gray-200 dark:bg-gray-700" }, [
                  createVNode("div", { class: "w-full h-full flex items-center justify-center text-gray-400" }, [
                    createVNode(_component_UIcon, {
                      name: "i-heroicons-photo",
                      class: "w-16 h-16"
                    })
                  ])
                ]),
                createVNode("div", { class: "p-6 sm:p-8 flex flex-col justify-center" }, [
                  createVNode("div", { class: "flex items-center gap-3 mb-4" }, [
                    createVNode(
                      "span",
                      { class: "px-3 py-1 bg-primary-500/10 text-primary-600 dark:text-primary-400 text-sm font-medium rounded-full" },
                      toDisplayString(__props.blogData.featured.category),
                      1
                      /* TEXT */
                    ),
                    createVNode(
                      "span",
                      { class: "text-sm text-gray-500 dark:text-gray-400" },
                      toDisplayString(__props.blogData.featured.readTime) + " read ",
                      1
                      /* TEXT */
                    )
                  ]),
                  createVNode(
                    "h2",
                    { class: "text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-4 group-hover:text-primary-500 transition-colors" },
                    toDisplayString(__props.blogData.featured.title),
                    1
                    /* TEXT */
                  ),
                  createVNode(
                    "p",
                    { class: "text-gray-600 dark:text-gray-400 mb-6" },
                    toDisplayString(__props.blogData.featured.excerpt),
                    1
                    /* TEXT */
                  ),
                  createVNode("div", { class: "flex items-center justify-between" }, [
                    createVNode("div", { class: "flex items-center gap-3" }, [
                      createVNode("div", { class: "w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center" }, [
                        createVNode(_component_UIcon, {
                          name: "i-heroicons-user",
                          class: "w-5 h-5 text-gray-400"
                        })
                      ]),
                      createVNode("div", null, [
                        createVNode(
                          "p",
                          { class: "text-sm font-medium text-gray-900 dark:text-white" },
                          toDisplayString(__props.blogData.featured.author),
                          1
                          /* TEXT */
                        ),
                        createVNode(
                          "p",
                          { class: "text-xs text-gray-500 dark:text-gray-400" },
                          toDisplayString(__props.blogData.featured.date),
                          1
                          /* TEXT */
                        )
                      ])
                    ]),
                    createVNode("span", { class: "text-primary-500 font-medium flex items-center gap-1 group-hover:gap-2 transition-all" }, [
                      createTextVNode(" Baca "),
                      createVNode(_component_UIcon, {
                        name: "i-heroicons-arrow-right",
                        class: "w-4 h-4"
                      })
                    ])
                  ])
                ])
              ])
            ];
          }
        }),
        _: 1
        /* STABLE */
      }, _parent));
      _push(`</div><!-- Category Filter --><div class="flex flex-wrap gap-2 mb-8"><!--[-->`);
      ssrRenderList(__props.blogData.categories, (category) => {
        _push(`<button class="${ssrRenderClass([
          "px-4 py-2 rounded-full text-sm font-medium transition-colors",
          selectedCategory.value === category ? "bg-primary-500 text-white" : "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700"
        ])}">${ssrInterpolate(category)}</button>`);
      });
      _push(`<!--]--></div><!-- Posts Grid --><div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12"><!--[-->`);
      ssrRenderList(filteredPosts.value, (post) => {
        _push(ssrRenderComponent(unref(Link), {
          key: post.id,
          href: `/blog/${post.slug}`,
          class: "group bg-white dark:bg-gray-800/80 rounded-2xl border border-gray-200/80 dark:border-gray-700/50 overflow-hidden hover:shadow-lg transition-all"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<div class="aspect-video bg-gray-200 dark:bg-gray-700"${_scopeId}><div class="w-full h-full flex items-center justify-center text-gray-400"${_scopeId}>`);
              _push2(ssrRenderComponent(_component_UIcon, {
                name: "i-heroicons-photo",
                class: "w-10 h-10"
              }, null, _parent2, _scopeId));
              _push2(`</div></div><div class="p-5"${_scopeId}><div class="flex items-center gap-3 mb-3"${_scopeId}><span class="px-2 py-0.5 bg-primary-500/10 text-primary-600 dark:text-primary-400 text-xs font-medium rounded-full"${_scopeId}>${ssrInterpolate(post.category)}</span><span class="text-xs text-gray-500 dark:text-gray-400"${_scopeId}>${ssrInterpolate(post.readTime)}</span></div><h3 class="font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-primary-500 transition-colors line-clamp-2"${_scopeId}>${ssrInterpolate(post.title)}</h3><p class="text-sm text-gray-600 dark:text-gray-400 line-clamp-2 mb-4"${_scopeId}>${ssrInterpolate(post.excerpt)}</p><div class="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400"${_scopeId}><span${_scopeId}>${ssrInterpolate(post.author)}</span><span${_scopeId}>•</span><span${_scopeId}>${ssrInterpolate(post.date)}</span></div></div>`);
            } else {
              return [
                createVNode("div", { class: "aspect-video bg-gray-200 dark:bg-gray-700" }, [
                  createVNode("div", { class: "w-full h-full flex items-center justify-center text-gray-400" }, [
                    createVNode(_component_UIcon, {
                      name: "i-heroicons-photo",
                      class: "w-10 h-10"
                    })
                  ])
                ]),
                createVNode("div", { class: "p-5" }, [
                  createVNode("div", { class: "flex items-center gap-3 mb-3" }, [
                    createVNode(
                      "span",
                      { class: "px-2 py-0.5 bg-primary-500/10 text-primary-600 dark:text-primary-400 text-xs font-medium rounded-full" },
                      toDisplayString(post.category),
                      1
                      /* TEXT */
                    ),
                    createVNode(
                      "span",
                      { class: "text-xs text-gray-500 dark:text-gray-400" },
                      toDisplayString(post.readTime),
                      1
                      /* TEXT */
                    )
                  ]),
                  createVNode(
                    "h3",
                    { class: "font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-primary-500 transition-colors line-clamp-2" },
                    toDisplayString(post.title),
                    1
                    /* TEXT */
                  ),
                  createVNode(
                    "p",
                    { class: "text-sm text-gray-600 dark:text-gray-400 line-clamp-2 mb-4" },
                    toDisplayString(post.excerpt),
                    1
                    /* TEXT */
                  ),
                  createVNode("div", { class: "flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400" }, [
                    createVNode(
                      "span",
                      null,
                      toDisplayString(post.author),
                      1
                      /* TEXT */
                    ),
                    createVNode("span", null, "•"),
                    createVNode(
                      "span",
                      null,
                      toDisplayString(post.date),
                      1
                      /* TEXT */
                    )
                  ])
                ])
              ];
            }
          }),
          _: 2
          /* DYNAMIC */
        }, _parent));
      });
      _push(`<!--]--></div><!-- Newsletter CTA --><div class="bg-linear-to-r from-violet-500 to-purple-600 rounded-3xl p-8 sm:p-12 text-center text-white"><h2 class="text-2xl sm:text-3xl font-bold mb-4">Dapatkan Update Terbaru</h2><p class="text-white/80 max-w-xl mx-auto mb-8"> Subscribe newsletter untuk mendapatkan tips vaping, promo eksklusif, dan artikel terbaru langsung ke inbox Anda. </p><form class="max-w-md mx-auto flex gap-3">`);
      _push(ssrRenderComponent(_component_UInput, {
        type: "email",
        placeholder: "Email Anda",
        size: "lg",
        class: "flex-1",
        ui: { base: "bg-white/90" }
      }, null, _parent));
      _push(ssrRenderComponent(_component_UButton, {
        color: "white",
        size: "lg"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` Subscribe `);
          } else {
            return [
              createTextVNode(" Subscribe ")
            ];
          }
        }),
        _: 1
        /* STABLE */
      }, _parent));
      _push(`</form></div></div></div><!--]-->`);
    };
  }
});

const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("inertia/pages/pages/blog.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
