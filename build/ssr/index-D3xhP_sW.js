import { _ as _sfc_main$b } from './Pagination-C9h35VkF.js';
import { _ as _sfc_main$a } from './DropdownMenu-DnaZdPLR.js';
import { _ as _sfc_main$9 } from './Tooltip-N44Fzd4m.js';
import { a as _sfc_main$1, _ as _sfc_main$6, b as _sfc_main$8 } from './Button-BBveOjhJ.js';
import { _ as _sfc_main$3, a as _sfc_main$7 } from './Badge-DaOjA2YD.js';
import { _ as _sfc_main$5 } from './Checkbox-9gbT5PLz.js';
import { _ as _sfc_main$4 } from './Select-1_-G9zx4.js';
import { _ as _sfc_main$2 } from './Card-Ci6a5H8H.js';
import { defineComponent, ref, watch, computed, unref, withCtx, createTextVNode, createVNode, toDisplayString, createCommentVNode, createBlock, openBlock, Fragment, renderList, useSSRContext } from 'vue';
import { ssrRenderComponent, ssrInterpolate, ssrRenderList, ssrRenderAttr } from 'vue/server-renderer';
import { router, Head } from '@inertiajs/vue3';
import { A as AdminLayout } from './admin-CGUULoJY.js';
import { e as getCategoryColor, g as getStatusColor, b as getStatusLabel } from './admin_article-Cy4gA9-J.js';
import 'reka-ui';
import '@vueuse/core';
import './virtual_nuxt-ui-plugins-BqI2j5ZJ.js';
import '@unhead/vue/client';
import 'tailwindcss/colors';
import 'hookable';
import 'defu';
import 'ohash/utils';
import '@unhead/vue';
import 'reka-ui/namespaced';
import 'tailwind-variants';
import '@iconify/vue';
import 'ufo';

const _sfc_main = /* @__PURE__ */ defineComponent({
  ...{ layout: AdminLayout },
  __name: "index",
  __ssrInlineRender: true,
  props: {
    articles: {},
    filters: {},
    stats: {},
    categories: {}
  },
  setup(__props) {
    const props = __props;
    const filters = ref({
      search: props.filters.search,
      status: props.filters.status,
      category: props.filters.category,
      sortBy: props.filters.sortBy,
      sortOrder: props.filters.sortOrder
    });
    const searchTimeout = ref(null);
    watch(
      () => filters.value.search,
      () => {
        if (searchTimeout.value) clearTimeout(searchTimeout.value);
        searchTimeout.value = setTimeout(() => {
          applyFilters();
        }, 500);
      }
    );
    function applyFilters() {
      router.get(
        "/admin/articles",
        {
          search: filters.value.search || void 0,
          status: filters.value.status || void 0,
          category: filters.value.category || void 0,
          sortBy: filters.value.sortBy || void 0,
          sortOrder: filters.value.sortOrder || void 0
        },
        { preserveState: true, preserveScroll: true }
      );
    }
    function resetFilters() {
      filters.value = {
        search: "",
        status: "",
        category: "",
        sortBy: "createdAt",
        sortOrder: "desc"
      };
      router.get("/admin/articles");
    }
    function goToPage(page) {
      router.get(
        "/admin/articles",
        { ...filters.value, page },
        { preserveState: true, preserveScroll: true }
      );
    }
    const selectedArticles = ref([]);
    const isDeleting = ref(null);
    function toggleSelectAll(checked) {
      if (checked) {
        selectedArticles.value = props.articles.data.map((a) => a.id);
      } else {
        selectedArticles.value = [];
      }
    }
    function toggleArticleSelection(articleId) {
      const index = selectedArticles.value.indexOf(articleId);
      if (index === -1) {
        selectedArticles.value.push(articleId);
      } else {
        selectedArticles.value.splice(index, 1);
      }
    }
    function toggleStatus(article) {
      router.patch(
        `/admin/articles/${article.id}/status`,
        {},
        { preserveState: true, preserveScroll: true }
      );
    }
    function toggleFeatured(article) {
      router.patch(
        `/admin/articles/${article.id}/featured`,
        {},
        { preserveState: true, preserveScroll: true }
      );
    }
    function duplicateArticle(article) {
      router.post(
        `/admin/articles/${article.id}/duplicate`,
        {},
        { preserveState: false }
      );
    }
    function deleteArticle(article) {
      if (!confirm(`Apakah Anda yakin ingin menghapus artikel "${article.title}"?`)) return;
      isDeleting.value = article.id;
      router.delete(`/admin/articles/${article.id}`, {
        preserveState: true,
        preserveScroll: true,
        onFinish: () => {
          isDeleting.value = null;
        }
      });
    }
    function formatDate(date) {
      return new Date(date).toLocaleDateString("id-ID", {
        day: "numeric",
        month: "short",
        year: "numeric"
      });
    }
    const statusOptions = [
      { value: "", label: "Semua Status" },
      { value: "draft", label: "Draft" },
      { value: "published", label: "Dipublikasikan" },
      { value: "archived", label: "Diarsipkan" }
    ];
    const categoryOptions = computed(() => [
      { value: "", label: "Semua Kategori" },
      ...props.categories
    ]);
    const sortOptions = [
      { value: "createdAt", label: "Tanggal Dibuat" },
      { value: "title", label: "Judul" },
      { value: "viewCount", label: "Views" },
      { value: "publishedAt", label: "Tanggal Publish" }
    ];
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UButton = _sfc_main$1;
      const _component_UCard = _sfc_main$2;
      const _component_UInput = _sfc_main$3;
      const _component_USelect = _sfc_main$4;
      const _component_UCheckbox = _sfc_main$5;
      const _component_UIcon = _sfc_main$6;
      const _component_UBadge = _sfc_main$7;
      const _component_UAvatar = _sfc_main$8;
      const _component_UTooltip = _sfc_main$9;
      const _component_UDropdownMenu = _sfc_main$a;
      const _component_UPagination = _sfc_main$b;
      _push(`<!--[-->`);
      _push(ssrRenderComponent(unref(Head), { title: "Kelola Artikel" }, null, _parent));
      _push(`<div class="space-y-6"><!-- Header --><div class="flex items-center justify-between"><div><h1 class="text-2xl font-bold text-gray-900 dark:text-white">Kelola Artikel</h1><p class="mt-1 text-sm text-gray-500 dark:text-gray-400"> Kelola semua artikel dan konten blog </p></div>`);
      _push(ssrRenderComponent(_component_UButton, {
        to: "/admin/articles/create",
        icon: "i-heroicons-plus",
        color: "primary"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` Tambah Artikel `);
          } else {
            return [
              createTextVNode(" Tambah Artikel ")
            ];
          }
        }),
        _: 1
        /* STABLE */
      }, _parent));
      _push(`</div><!-- Stats Cards --><div class="grid grid-cols-2 gap-4 md:grid-cols-4">`);
      _push(ssrRenderComponent(_component_UCard, { class: "text-center" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<p class="text-sm text-gray-500 dark:text-gray-400"${_scopeId}>Total</p><p class="text-2xl font-bold text-gray-900 dark:text-white"${_scopeId}>${ssrInterpolate(__props.stats.total)}</p>`);
          } else {
            return [
              createVNode("p", { class: "text-sm text-gray-500 dark:text-gray-400" }, "Total"),
              createVNode(
                "p",
                { class: "text-2xl font-bold text-gray-900 dark:text-white" },
                toDisplayString(__props.stats.total),
                1
                /* TEXT */
              )
            ];
          }
        }),
        _: 1
        /* STABLE */
      }, _parent));
      _push(ssrRenderComponent(_component_UCard, { class: "text-center" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<p class="text-sm text-gray-500 dark:text-gray-400"${_scopeId}>Dipublikasikan</p><p class="text-2xl font-bold text-green-600"${_scopeId}>${ssrInterpolate(__props.stats.published)}</p>`);
          } else {
            return [
              createVNode("p", { class: "text-sm text-gray-500 dark:text-gray-400" }, "Dipublikasikan"),
              createVNode(
                "p",
                { class: "text-2xl font-bold text-green-600" },
                toDisplayString(__props.stats.published),
                1
                /* TEXT */
              )
            ];
          }
        }),
        _: 1
        /* STABLE */
      }, _parent));
      _push(ssrRenderComponent(_component_UCard, { class: "text-center" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<p class="text-sm text-gray-500 dark:text-gray-400"${_scopeId}>Draft</p><p class="text-2xl font-bold text-yellow-600"${_scopeId}>${ssrInterpolate(__props.stats.draft)}</p>`);
          } else {
            return [
              createVNode("p", { class: "text-sm text-gray-500 dark:text-gray-400" }, "Draft"),
              createVNode(
                "p",
                { class: "text-2xl font-bold text-yellow-600" },
                toDisplayString(__props.stats.draft),
                1
                /* TEXT */
              )
            ];
          }
        }),
        _: 1
        /* STABLE */
      }, _parent));
      _push(ssrRenderComponent(_component_UCard, { class: "text-center" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<p class="text-sm text-gray-500 dark:text-gray-400"${_scopeId}>Unggulan</p><p class="text-2xl font-bold text-primary-600"${_scopeId}>${ssrInterpolate(__props.stats.featured)}</p>`);
          } else {
            return [
              createVNode("p", { class: "text-sm text-gray-500 dark:text-gray-400" }, "Unggulan"),
              createVNode(
                "p",
                { class: "text-2xl font-bold text-primary-600" },
                toDisplayString(__props.stats.featured),
                1
                /* TEXT */
              )
            ];
          }
        }),
        _: 1
        /* STABLE */
      }, _parent));
      _push(`</div><!-- Filters -->`);
      _push(ssrRenderComponent(_component_UCard, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="flex flex-col gap-4 md:flex-row md:items-center"${_scopeId}>`);
            _push2(ssrRenderComponent(_component_UInput, {
              modelValue: filters.value.search,
              "onUpdate:modelValue": ($event) => filters.value.search = $event,
              icon: "i-heroicons-magnifying-glass",
              placeholder: "Cari artikel...",
              class: "w-full md:w-64"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_USelect, {
              modelValue: filters.value.status,
              "onUpdate:modelValue": [($event) => filters.value.status = $event, applyFilters],
              options: statusOptions,
              "option-attribute": "label",
              "value-attribute": "value",
              placeholder: "Status",
              class: "w-full md:w-40"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_USelect, {
              modelValue: filters.value.category,
              "onUpdate:modelValue": [($event) => filters.value.category = $event, applyFilters],
              options: categoryOptions.value,
              "option-attribute": "label",
              "value-attribute": "value",
              placeholder: "Kategori",
              class: "w-full md:w-48"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_USelect, {
              modelValue: filters.value.sortBy,
              "onUpdate:modelValue": [($event) => filters.value.sortBy = $event, applyFilters],
              options: sortOptions,
              "option-attribute": "label",
              "value-attribute": "value",
              class: "w-full md:w-40"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_UButton, {
              color: "neutral",
              variant: "ghost",
              icon: "i-heroicons-arrow-path",
              onClick: resetFilters
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Reset `);
                } else {
                  return [
                    createTextVNode(" Reset ")
                  ];
                }
              }),
              _: 1
              /* STABLE */
            }, _parent2, _scopeId));
            _push2(`</div>`);
          } else {
            return [
              createVNode("div", { class: "flex flex-col gap-4 md:flex-row md:items-center" }, [
                createVNode(_component_UInput, {
                  modelValue: filters.value.search,
                  "onUpdate:modelValue": ($event) => filters.value.search = $event,
                  icon: "i-heroicons-magnifying-glass",
                  placeholder: "Cari artikel...",
                  class: "w-full md:w-64"
                }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                createVNode(_component_USelect, {
                  modelValue: filters.value.status,
                  "onUpdate:modelValue": [($event) => filters.value.status = $event, applyFilters],
                  options: statusOptions,
                  "option-attribute": "label",
                  "value-attribute": "value",
                  placeholder: "Status",
                  class: "w-full md:w-40"
                }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                createVNode(_component_USelect, {
                  modelValue: filters.value.category,
                  "onUpdate:modelValue": [($event) => filters.value.category = $event, applyFilters],
                  options: categoryOptions.value,
                  "option-attribute": "label",
                  "value-attribute": "value",
                  placeholder: "Kategori",
                  class: "w-full md:w-48"
                }, null, 8, ["modelValue", "onUpdate:modelValue", "options"]),
                createVNode(_component_USelect, {
                  modelValue: filters.value.sortBy,
                  "onUpdate:modelValue": [($event) => filters.value.sortBy = $event, applyFilters],
                  options: sortOptions,
                  "option-attribute": "label",
                  "value-attribute": "value",
                  class: "w-full md:w-40"
                }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                createVNode(_component_UButton, {
                  color: "neutral",
                  variant: "ghost",
                  icon: "i-heroicons-arrow-path",
                  onClick: resetFilters
                }, {
                  default: withCtx(() => [
                    createTextVNode(" Reset ")
                  ]),
                  _: 1
                  /* STABLE */
                })
              ])
            ];
          }
        }),
        _: 1
        /* STABLE */
      }, _parent));
      _push(`<!-- Articles Table -->`);
      _push(ssrRenderComponent(_component_UCard, { class: "overflow-hidden" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="overflow-x-auto"${_scopeId}><table class="min-w-full divide-y divide-gray-200 dark:divide-gray-700"${_scopeId}><thead class="bg-gray-50 dark:bg-gray-800"${_scopeId}><tr${_scopeId}><th class="w-10 px-4 py-3"${_scopeId}>`);
            _push2(ssrRenderComponent(_component_UCheckbox, {
              "model-value": selectedArticles.value.length === __props.articles.data.length && __props.articles.data.length > 0,
              "onUpdate:modelValue": toggleSelectAll
            }, null, _parent2, _scopeId));
            _push2(`</th><th class="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400"${_scopeId}> Judul </th><th class="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400"${_scopeId}> Kategori </th><th class="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400"${_scopeId}> Penulis </th><th class="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400"${_scopeId}> Status </th><th class="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400"${_scopeId}> Statistik </th><th class="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400"${_scopeId}> Dibuat </th><th class="px-4 py-3"${_scopeId}></th></tr></thead><tbody class="divide-y divide-gray-200 bg-white dark:divide-gray-700 dark:bg-gray-900"${_scopeId}><!--[-->`);
            ssrRenderList(__props.articles.data, (article) => {
              _push2(`<tr class="hover:bg-gray-50 dark:hover:bg-gray-800"${_scopeId}><td class="px-4 py-3"${_scopeId}>`);
              _push2(ssrRenderComponent(_component_UCheckbox, {
                "model-value": selectedArticles.value.includes(article.id),
                "onUpdate:modelValue": ($event) => toggleArticleSelection(article.id)
              }, null, _parent2, _scopeId));
              _push2(`</td><td class="px-4 py-3"${_scopeId}><div class="flex items-center gap-3"${_scopeId}>`);
              if (article.thumbnail) {
                _push2(`<img${ssrRenderAttr("src", article.thumbnail)}${ssrRenderAttr("alt", article.title)} class="h-12 w-16 rounded object-cover"${_scopeId}>`);
              } else {
                _push2(`<div class="flex h-12 w-16 items-center justify-center rounded bg-gray-100 dark:bg-gray-800"${_scopeId}>`);
                _push2(ssrRenderComponent(_component_UIcon, {
                  name: "i-heroicons-photo",
                  class: "text-gray-400"
                }, null, _parent2, _scopeId));
                _push2(`</div>`);
              }
              _push2(`<div class="min-w-0 flex-1"${_scopeId}><p class="truncate font-medium text-gray-900 dark:text-white"${_scopeId}>${ssrInterpolate(article.title)}</p><p class="truncate text-sm text-gray-500 dark:text-gray-400"${_scopeId}>${ssrInterpolate(article.slug)}</p><div class="mt-1 flex items-center gap-2"${_scopeId}>`);
              if (article.isFeatured) {
                _push2(ssrRenderComponent(_component_UBadge, {
                  color: "warning",
                  variant: "soft",
                  size: "xs"
                }, {
                  default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      _push3(ssrRenderComponent(_component_UIcon, {
                        name: "i-heroicons-star",
                        class: "mr-1 h-3 w-3"
                      }, null, _parent3, _scopeId2));
                      _push3(` Unggulan `);
                    } else {
                      return [
                        createVNode(_component_UIcon, {
                          name: "i-heroicons-star",
                          class: "mr-1 h-3 w-3"
                        }),
                        createTextVNode(" Unggulan ")
                      ];
                    }
                  }),
                  _: 2
                  /* DYNAMIC */
                }, _parent2, _scopeId));
              } else {
                _push2(`<!---->`);
              }
              if (article.isPinned) {
                _push2(ssrRenderComponent(_component_UBadge, {
                  color: "info",
                  variant: "soft",
                  size: "xs"
                }, {
                  default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      _push3(ssrRenderComponent(_component_UIcon, {
                        name: "i-heroicons-map-pin",
                        class: "mr-1 h-3 w-3"
                      }, null, _parent3, _scopeId2));
                      _push3(` Disematkan `);
                    } else {
                      return [
                        createVNode(_component_UIcon, {
                          name: "i-heroicons-map-pin",
                          class: "mr-1 h-3 w-3"
                        }),
                        createTextVNode(" Disematkan ")
                      ];
                    }
                  }),
                  _: 2
                  /* DYNAMIC */
                }, _parent2, _scopeId));
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div></div></div></td><td class="px-4 py-3"${_scopeId}>`);
              _push2(ssrRenderComponent(_component_UBadge, {
                color: unref(getCategoryColor)(article.category),
                variant: "soft"
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`${ssrInterpolate(__props.categories.find((c) => c.value === article.category)?.label || article.category)}`);
                  } else {
                    return [
                      createTextVNode(
                        toDisplayString(__props.categories.find((c) => c.value === article.category)?.label || article.category),
                        1
                        /* TEXT */
                      )
                    ];
                  }
                }),
                _: 2
                /* DYNAMIC */
              }, _parent2, _scopeId));
              _push2(`</td><td class="px-4 py-3"${_scopeId}>`);
              if (article.author) {
                _push2(`<div class="flex items-center gap-2"${_scopeId}>`);
                _push2(ssrRenderComponent(_component_UAvatar, {
                  src: article.author.avatar || void 0,
                  alt: article.author.fullName,
                  size: "xs"
                }, null, _parent2, _scopeId));
                _push2(`<span class="text-sm text-gray-700 dark:text-gray-300"${_scopeId}>${ssrInterpolate(article.author.fullName)}</span></div>`);
              } else {
                _push2(`<span class="text-sm text-gray-400"${_scopeId}>-</span>`);
              }
              _push2(`</td><td class="px-4 py-3"${_scopeId}>`);
              _push2(ssrRenderComponent(_component_UBadge, {
                color: unref(getStatusColor)(article.status),
                variant: "soft"
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`${ssrInterpolate(unref(getStatusLabel)(article.status))}`);
                  } else {
                    return [
                      createTextVNode(
                        toDisplayString(unref(getStatusLabel)(article.status)),
                        1
                        /* TEXT */
                      )
                    ];
                  }
                }),
                _: 2
                /* DYNAMIC */
              }, _parent2, _scopeId));
              _push2(`</td><td class="px-4 py-3"${_scopeId}><div class="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400"${_scopeId}><span class="flex items-center gap-1"${_scopeId}>`);
              _push2(ssrRenderComponent(_component_UIcon, {
                name: "i-heroicons-eye",
                class: "h-4 w-4"
              }, null, _parent2, _scopeId));
              _push2(` ${ssrInterpolate(article.viewCount)}</span><span class="flex items-center gap-1"${_scopeId}>`);
              _push2(ssrRenderComponent(_component_UIcon, {
                name: "i-heroicons-heart",
                class: "h-4 w-4"
              }, null, _parent2, _scopeId));
              _push2(` ${ssrInterpolate(article.likeCount)}</span><span class="flex items-center gap-1"${_scopeId}>`);
              _push2(ssrRenderComponent(_component_UIcon, {
                name: "i-heroicons-clock",
                class: "h-4 w-4"
              }, null, _parent2, _scopeId));
              _push2(` ${ssrInterpolate(article.readTime)} mnt </span></div></td><td class="px-4 py-3 text-sm text-gray-500 dark:text-gray-400"${_scopeId}>${ssrInterpolate(formatDate(article.createdAt))}</td><td class="px-4 py-3"${_scopeId}><div class="flex items-center justify-end gap-2"${_scopeId}>`);
              _push2(ssrRenderComponent(_component_UTooltip, { text: "Lihat" }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(_component_UButton, {
                      icon: "i-heroicons-eye",
                      color: "neutral",
                      variant: "ghost",
                      size: "xs",
                      to: `/admin/articles/${article.id}`
                    }, null, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(_component_UButton, {
                        icon: "i-heroicons-eye",
                        color: "neutral",
                        variant: "ghost",
                        size: "xs",
                        to: `/admin/articles/${article.id}`
                      }, null, 8, ["to"])
                    ];
                  }
                }),
                _: 2
                /* DYNAMIC */
              }, _parent2, _scopeId));
              _push2(ssrRenderComponent(_component_UTooltip, { text: "Edit" }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(_component_UButton, {
                      icon: "i-heroicons-pencil",
                      color: "primary",
                      variant: "ghost",
                      size: "xs",
                      to: `/admin/articles/${article.id}/edit`
                    }, null, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(_component_UButton, {
                        icon: "i-heroicons-pencil",
                        color: "primary",
                        variant: "ghost",
                        size: "xs",
                        to: `/admin/articles/${article.id}/edit`
                      }, null, 8, ["to"])
                    ];
                  }
                }),
                _: 2
                /* DYNAMIC */
              }, _parent2, _scopeId));
              _push2(ssrRenderComponent(_component_UDropdownMenu, {
                items: [
                  [
                    {
                      label: article.status === "published" ? "Jadikan Draft" : "Publikasikan",
                      icon: article.status === "published" ? "i-heroicons-archive-box" : "i-heroicons-paper-airplane",
                      onSelect: () => toggleStatus(article)
                    },
                    {
                      label: article.isFeatured ? "Hapus Unggulan" : "Jadikan Unggulan",
                      icon: "i-heroicons-star",
                      onSelect: () => toggleFeatured(article)
                    },
                    {
                      label: "Duplikat",
                      icon: "i-heroicons-document-duplicate",
                      onSelect: () => duplicateArticle(article)
                    }
                  ],
                  [
                    {
                      label: "Hapus",
                      icon: "i-heroicons-trash",
                      color: "error",
                      onSelect: () => deleteArticle(article)
                    }
                  ]
                ],
                content: { align: "end" },
                modal: false
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(_component_UButton, {
                      icon: "i-heroicons-ellipsis-vertical",
                      color: "neutral",
                      variant: "ghost",
                      size: "xs"
                    }, null, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(_component_UButton, {
                        icon: "i-heroicons-ellipsis-vertical",
                        color: "neutral",
                        variant: "ghost",
                        size: "xs"
                      })
                    ];
                  }
                }),
                _: 2
                /* DYNAMIC */
              }, _parent2, _scopeId));
              _push2(`</div></td></tr>`);
            });
            _push2(`<!--]-->`);
            if (__props.articles.data.length === 0) {
              _push2(`<tr${_scopeId}><td colspan="8" class="px-4 py-12 text-center"${_scopeId}>`);
              _push2(ssrRenderComponent(_component_UIcon, {
                name: "i-heroicons-document-text",
                class: "mx-auto mb-4 h-12 w-12 text-gray-300"
              }, null, _parent2, _scopeId));
              _push2(`<p class="text-gray-500 dark:text-gray-400"${_scopeId}>Tidak ada artikel ditemukan</p>`);
              _push2(ssrRenderComponent(_component_UButton, {
                to: "/admin/articles/create",
                color: "primary",
                variant: "soft",
                class: "mt-4"
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(` Buat Artikel Baru `);
                  } else {
                    return [
                      createTextVNode(" Buat Artikel Baru ")
                    ];
                  }
                }),
                _: 1
                /* STABLE */
              }, _parent2, _scopeId));
              _push2(`</td></tr>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</tbody></table></div><!-- Pagination -->`);
            if (__props.articles.meta.lastPage > 1) {
              _push2(`<div class="flex items-center justify-between border-t border-gray-200 px-4 py-3 dark:border-gray-700"${_scopeId}><div class="text-sm text-gray-500 dark:text-gray-400"${_scopeId}> Menampilkan ${ssrInterpolate((__props.articles.meta.currentPage - 1) * __props.articles.meta.perPage + 1)} - ${ssrInterpolate(Math.min(__props.articles.meta.currentPage * __props.articles.meta.perPage, __props.articles.meta.total))} dari ${ssrInterpolate(__props.articles.meta.total)} artikel </div>`);
              _push2(ssrRenderComponent(_component_UPagination, {
                "model-value": __props.articles.meta.currentPage,
                "page-count": __props.articles.meta.perPage,
                total: __props.articles.meta.total,
                "onUpdate:modelValue": goToPage
              }, null, _parent2, _scopeId));
              _push2(`</div>`);
            } else {
              _push2(`<!---->`);
            }
          } else {
            return [
              createVNode("div", { class: "overflow-x-auto" }, [
                createVNode("table", { class: "min-w-full divide-y divide-gray-200 dark:divide-gray-700" }, [
                  createVNode("thead", { class: "bg-gray-50 dark:bg-gray-800" }, [
                    createVNode("tr", null, [
                      createVNode("th", { class: "w-10 px-4 py-3" }, [
                        createVNode(_component_UCheckbox, {
                          "model-value": selectedArticles.value.length === __props.articles.data.length && __props.articles.data.length > 0,
                          "onUpdate:modelValue": toggleSelectAll
                        }, null, 8, ["model-value"])
                      ]),
                      createVNode("th", { class: "px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400" }, " Judul "),
                      createVNode("th", { class: "px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400" }, " Kategori "),
                      createVNode("th", { class: "px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400" }, " Penulis "),
                      createVNode("th", { class: "px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400" }, " Status "),
                      createVNode("th", { class: "px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400" }, " Statistik "),
                      createVNode("th", { class: "px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400" }, " Dibuat "),
                      createVNode("th", { class: "px-4 py-3" })
                    ])
                  ]),
                  createVNode("tbody", { class: "divide-y divide-gray-200 bg-white dark:divide-gray-700 dark:bg-gray-900" }, [
                    (openBlock(true), createBlock(
                      Fragment,
                      null,
                      renderList(__props.articles.data, (article) => {
                        return openBlock(), createBlock("tr", {
                          key: article.id,
                          class: "hover:bg-gray-50 dark:hover:bg-gray-800"
                        }, [
                          createVNode("td", { class: "px-4 py-3" }, [
                            createVNode(_component_UCheckbox, {
                              "model-value": selectedArticles.value.includes(article.id),
                              "onUpdate:modelValue": ($event) => toggleArticleSelection(article.id)
                            }, null, 8, ["model-value", "onUpdate:modelValue"])
                          ]),
                          createVNode("td", { class: "px-4 py-3" }, [
                            createVNode("div", { class: "flex items-center gap-3" }, [
                              article.thumbnail ? (openBlock(), createBlock("img", {
                                key: 0,
                                src: article.thumbnail,
                                alt: article.title,
                                class: "h-12 w-16 rounded object-cover"
                              }, null, 8, ["src", "alt"])) : (openBlock(), createBlock("div", {
                                key: 1,
                                class: "flex h-12 w-16 items-center justify-center rounded bg-gray-100 dark:bg-gray-800"
                              }, [
                                createVNode(_component_UIcon, {
                                  name: "i-heroicons-photo",
                                  class: "text-gray-400"
                                })
                              ])),
                              createVNode("div", { class: "min-w-0 flex-1" }, [
                                createVNode(
                                  "p",
                                  { class: "truncate font-medium text-gray-900 dark:text-white" },
                                  toDisplayString(article.title),
                                  1
                                  /* TEXT */
                                ),
                                createVNode(
                                  "p",
                                  { class: "truncate text-sm text-gray-500 dark:text-gray-400" },
                                  toDisplayString(article.slug),
                                  1
                                  /* TEXT */
                                ),
                                createVNode("div", { class: "mt-1 flex items-center gap-2" }, [
                                  article.isFeatured ? (openBlock(), createBlock(_component_UBadge, {
                                    key: 0,
                                    color: "warning",
                                    variant: "soft",
                                    size: "xs"
                                  }, {
                                    default: withCtx(() => [
                                      createVNode(_component_UIcon, {
                                        name: "i-heroicons-star",
                                        class: "mr-1 h-3 w-3"
                                      }),
                                      createTextVNode(" Unggulan ")
                                    ]),
                                    _: 1
                                    /* STABLE */
                                  })) : createCommentVNode("v-if", true),
                                  article.isPinned ? (openBlock(), createBlock(_component_UBadge, {
                                    key: 1,
                                    color: "info",
                                    variant: "soft",
                                    size: "xs"
                                  }, {
                                    default: withCtx(() => [
                                      createVNode(_component_UIcon, {
                                        name: "i-heroicons-map-pin",
                                        class: "mr-1 h-3 w-3"
                                      }),
                                      createTextVNode(" Disematkan ")
                                    ]),
                                    _: 1
                                    /* STABLE */
                                  })) : createCommentVNode("v-if", true)
                                ])
                              ])
                            ])
                          ]),
                          createVNode("td", { class: "px-4 py-3" }, [
                            createVNode(_component_UBadge, {
                              color: unref(getCategoryColor)(article.category),
                              variant: "soft"
                            }, {
                              default: withCtx(() => [
                                createTextVNode(
                                  toDisplayString(__props.categories.find((c) => c.value === article.category)?.label || article.category),
                                  1
                                  /* TEXT */
                                )
                              ]),
                              _: 2
                              /* DYNAMIC */
                            }, 1032, ["color"])
                          ]),
                          createVNode("td", { class: "px-4 py-3" }, [
                            article.author ? (openBlock(), createBlock("div", {
                              key: 0,
                              class: "flex items-center gap-2"
                            }, [
                              createVNode(_component_UAvatar, {
                                src: article.author.avatar || void 0,
                                alt: article.author.fullName,
                                size: "xs"
                              }, null, 8, ["src", "alt"]),
                              createVNode(
                                "span",
                                { class: "text-sm text-gray-700 dark:text-gray-300" },
                                toDisplayString(article.author.fullName),
                                1
                                /* TEXT */
                              )
                            ])) : (openBlock(), createBlock("span", {
                              key: 1,
                              class: "text-sm text-gray-400"
                            }, "-"))
                          ]),
                          createVNode("td", { class: "px-4 py-3" }, [
                            createVNode(_component_UBadge, {
                              color: unref(getStatusColor)(article.status),
                              variant: "soft"
                            }, {
                              default: withCtx(() => [
                                createTextVNode(
                                  toDisplayString(unref(getStatusLabel)(article.status)),
                                  1
                                  /* TEXT */
                                )
                              ]),
                              _: 2
                              /* DYNAMIC */
                            }, 1032, ["color"])
                          ]),
                          createVNode("td", { class: "px-4 py-3" }, [
                            createVNode("div", { class: "flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400" }, [
                              createVNode("span", { class: "flex items-center gap-1" }, [
                                createVNode(_component_UIcon, {
                                  name: "i-heroicons-eye",
                                  class: "h-4 w-4"
                                }),
                                createTextVNode(
                                  " " + toDisplayString(article.viewCount),
                                  1
                                  /* TEXT */
                                )
                              ]),
                              createVNode("span", { class: "flex items-center gap-1" }, [
                                createVNode(_component_UIcon, {
                                  name: "i-heroicons-heart",
                                  class: "h-4 w-4"
                                }),
                                createTextVNode(
                                  " " + toDisplayString(article.likeCount),
                                  1
                                  /* TEXT */
                                )
                              ]),
                              createVNode("span", { class: "flex items-center gap-1" }, [
                                createVNode(_component_UIcon, {
                                  name: "i-heroicons-clock",
                                  class: "h-4 w-4"
                                }),
                                createTextVNode(
                                  " " + toDisplayString(article.readTime) + " mnt ",
                                  1
                                  /* TEXT */
                                )
                              ])
                            ])
                          ]),
                          createVNode(
                            "td",
                            { class: "px-4 py-3 text-sm text-gray-500 dark:text-gray-400" },
                            toDisplayString(formatDate(article.createdAt)),
                            1
                            /* TEXT */
                          ),
                          createVNode("td", { class: "px-4 py-3" }, [
                            createVNode("div", { class: "flex items-center justify-end gap-2" }, [
                              createVNode(
                                _component_UTooltip,
                                { text: "Lihat" },
                                {
                                  default: withCtx(() => [
                                    createVNode(_component_UButton, {
                                      icon: "i-heroicons-eye",
                                      color: "neutral",
                                      variant: "ghost",
                                      size: "xs",
                                      to: `/admin/articles/${article.id}`
                                    }, null, 8, ["to"])
                                  ]),
                                  _: 2
                                  /* DYNAMIC */
                                },
                                1024
                                /* DYNAMIC_SLOTS */
                              ),
                              createVNode(
                                _component_UTooltip,
                                { text: "Edit" },
                                {
                                  default: withCtx(() => [
                                    createVNode(_component_UButton, {
                                      icon: "i-heroicons-pencil",
                                      color: "primary",
                                      variant: "ghost",
                                      size: "xs",
                                      to: `/admin/articles/${article.id}/edit`
                                    }, null, 8, ["to"])
                                  ]),
                                  _: 2
                                  /* DYNAMIC */
                                },
                                1024
                                /* DYNAMIC_SLOTS */
                              ),
                              createVNode(_component_UDropdownMenu, {
                                items: [
                                  [
                                    {
                                      label: article.status === "published" ? "Jadikan Draft" : "Publikasikan",
                                      icon: article.status === "published" ? "i-heroicons-archive-box" : "i-heroicons-paper-airplane",
                                      onSelect: () => toggleStatus(article)
                                    },
                                    {
                                      label: article.isFeatured ? "Hapus Unggulan" : "Jadikan Unggulan",
                                      icon: "i-heroicons-star",
                                      onSelect: () => toggleFeatured(article)
                                    },
                                    {
                                      label: "Duplikat",
                                      icon: "i-heroicons-document-duplicate",
                                      onSelect: () => duplicateArticle(article)
                                    }
                                  ],
                                  [
                                    {
                                      label: "Hapus",
                                      icon: "i-heroicons-trash",
                                      color: "error",
                                      onSelect: () => deleteArticle(article)
                                    }
                                  ]
                                ],
                                content: { align: "end" },
                                modal: false
                              }, {
                                default: withCtx(() => [
                                  createVNode(_component_UButton, {
                                    icon: "i-heroicons-ellipsis-vertical",
                                    color: "neutral",
                                    variant: "ghost",
                                    size: "xs"
                                  })
                                ]),
                                _: 1
                                /* STABLE */
                              }, 8, ["items"])
                            ])
                          ])
                        ]);
                      }),
                      128
                      /* KEYED_FRAGMENT */
                    )),
                    __props.articles.data.length === 0 ? (openBlock(), createBlock("tr", { key: 0 }, [
                      createVNode("td", {
                        colspan: "8",
                        class: "px-4 py-12 text-center"
                      }, [
                        createVNode(_component_UIcon, {
                          name: "i-heroicons-document-text",
                          class: "mx-auto mb-4 h-12 w-12 text-gray-300"
                        }),
                        createVNode("p", { class: "text-gray-500 dark:text-gray-400" }, "Tidak ada artikel ditemukan"),
                        createVNode(_component_UButton, {
                          to: "/admin/articles/create",
                          color: "primary",
                          variant: "soft",
                          class: "mt-4"
                        }, {
                          default: withCtx(() => [
                            createTextVNode(" Buat Artikel Baru ")
                          ]),
                          _: 1
                          /* STABLE */
                        })
                      ])
                    ])) : createCommentVNode("v-if", true)
                  ])
                ])
              ]),
              createCommentVNode(" Pagination "),
              __props.articles.meta.lastPage > 1 ? (openBlock(), createBlock("div", {
                key: 0,
                class: "flex items-center justify-between border-t border-gray-200 px-4 py-3 dark:border-gray-700"
              }, [
                createVNode(
                  "div",
                  { class: "text-sm text-gray-500 dark:text-gray-400" },
                  " Menampilkan " + toDisplayString((__props.articles.meta.currentPage - 1) * __props.articles.meta.perPage + 1) + " - " + toDisplayString(Math.min(__props.articles.meta.currentPage * __props.articles.meta.perPage, __props.articles.meta.total)) + " dari " + toDisplayString(__props.articles.meta.total) + " artikel ",
                  1
                  /* TEXT */
                ),
                createVNode(_component_UPagination, {
                  "model-value": __props.articles.meta.currentPage,
                  "page-count": __props.articles.meta.perPage,
                  total: __props.articles.meta.total,
                  "onUpdate:modelValue": goToPage
                }, null, 8, ["model-value", "page-count", "total"])
              ])) : createCommentVNode("v-if", true)
            ];
          }
        }),
        _: 1
        /* STABLE */
      }, _parent));
      _push(`</div><!--]-->`);
    };
  }
});

const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("inertia/pages/admin/articles/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
