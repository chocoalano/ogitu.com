import { _ as _sfc_main$c } from './Checkbox-DCS-_c5K.js';
import { _ as _sfc_main$b } from './Select-mEsLh9Ds.js';
import { a as _sfc_main$1, _ as _sfc_main$a } from './Button-BTdvmZ8N.js';
import { _ as _sfc_main$8 } from './Textarea-yrK84h3-.js';
import { a as _sfc_main$2, _ as _sfc_main$7 } from './Badge-CQlYH3Fo.js';
import { _ as _sfc_main$6 } from './FormField-CdECN7pk.js';
import { _ as _sfc_main$5, a as _sfc_main$9 } from './ArticlePageBuilder-CtCKseJu.js';
import { _ as _sfc_main$4 } from './Card-h3oZeDee.js';
import { _ as _sfc_main$3 } from './DropdownMenu-Zcq6i1qV.js';
import { defineComponent, ref, watch, computed, unref, withCtx, createTextVNode, toDisplayString, createVNode, createCommentVNode, createBlock, openBlock, Fragment, renderList, useSSRContext } from 'vue';
import { ssrRenderComponent, ssrInterpolate, ssrRenderStyle, ssrRenderAttr, ssrRenderList } from 'vue/server-renderer';
import { useForm, Head, router } from '@inertiajs/vue3';
import { A as AdminLayout } from './admin-ELJtfEoX.js';
import { a as articleToFormData, g as getStatusColor, b as getStatusLabel } from './admin_article-Cy4gA9-J.js';
import 'reka-ui';
import '@vueuse/core';
import './virtual_nuxt-ui-plugins-CrG8Uaxr.js';
import '@unhead/vue/client';
import 'tailwindcss/colors';
import 'hookable';
import 'defu';
import 'ohash/utils';
import '@unhead/vue';
import 'tailwind-variants';
import '@iconify/vue';
import 'ufo';
import 'reka-ui/namespaced';
import './Modal-VctJV7vb.js';
import './Alert-B0mCzyXY.js';
import './Tooltip-C54KurGy.js';

const _sfc_main = /* @__PURE__ */ defineComponent({
  ...{ layout: AdminLayout },
  __name: "edit",
  __ssrInlineRender: true,
  props: {
    article: {},
    authors: {},
    categories: {}
  },
  setup(__props) {
    const props = __props;
    const form = useForm(articleToFormData(props.article));
    const activeTab = ref("content");
    const isSaving = ref(false);
    const hasUnsavedChanges = ref(false);
    const thumbnailInputRef = ref(null);
    const bannerInputRef = ref(null);
    const thumbnailPreview = ref(props.article.thumbnail || null);
    const bannerPreview = ref(props.article.banner || null);
    function handleThumbnailSelect(event) {
      const input = event.target;
      const file = input.files?.[0];
      if (file) {
        form.thumbnail = file;
        const reader = new FileReader();
        reader.onload = (e) => {
          thumbnailPreview.value = e.target?.result;
        };
        reader.readAsDataURL(file);
      }
    }
    function handleBannerSelect(event) {
      const input = event.target;
      const file = input.files?.[0];
      if (file) {
        form.banner = file;
        const reader = new FileReader();
        reader.onload = (e) => {
          bannerPreview.value = e.target?.result;
        };
        reader.readAsDataURL(file);
      }
    }
    function removeThumbnail() {
      form.thumbnail = null;
      form.thumbnailUrl = "";
      thumbnailPreview.value = null;
      if (thumbnailInputRef.value) {
        thumbnailInputRef.value.value = "";
      }
    }
    function removeBanner() {
      form.banner = null;
      form.bannerUrl = "";
      bannerPreview.value = null;
      if (bannerInputRef.value) {
        bannerInputRef.value.value = "";
      }
    }
    watch(
      () => form.data(),
      () => {
        hasUnsavedChanges.value = true;
      },
      { deep: true }
    );
    const tagInput = ref("");
    function addTag() {
      const tag = tagInput.value.trim();
      if (tag && !form.tags.includes(tag)) {
        form.tags.push(tag);
      }
      tagInput.value = "";
    }
    function removeTag(index) {
      form.tags.splice(index, 1);
    }
    function handleTagKeydown(event) {
      if (event.key === "Enter" || event.key === ",") {
        event.preventDefault();
        addTag();
      }
    }
    function handleSubmit(status) {
      if (status) {
        form.status = status;
      }
      isSaving.value = true;
      form.put(`/admin/articles/${props.article.id}`, {
        preserveScroll: true,
        onSuccess: () => {
          hasUnsavedChanges.value = false;
        },
        onFinish: () => {
          isSaving.value = false;
        }
      });
    }
    function handleDelete() {
      if (!confirm(`Apakah Anda yakin ingin menghapus artikel "${props.article.title}"?`)) return;
      router.delete(`/admin/articles/${props.article.id}`);
    }
    function openPreview() {
      window.open(`/artikel/${props.article.slug}`, "_blank");
    }
    const tabs = [
      { value: "content", label: "Konten", icon: "i-heroicons-document-text" },
      { value: "media", label: "Media", icon: "i-heroicons-photo" },
      { value: "seo", label: "SEO", icon: "i-heroicons-magnifying-glass" },
      { value: "settings", label: "Pengaturan", icon: "i-heroicons-cog-6-tooth" }
    ];
    const metaDescriptionCount = computed(() => form.metaDescription?.length || 0);
    const metaTitleCount = computed(() => form.metaTitle?.length || 0);
    function formatDate(date) {
      return new Date(date).toLocaleDateString("id-ID", {
        day: "numeric",
        month: "long",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit"
      });
    }
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UButton = _sfc_main$1;
      const _component_UBadge = _sfc_main$2;
      const _component_UDropdownMenu = _sfc_main$3;
      const _component_UCard = _sfc_main$4;
      const _component_UTabs = _sfc_main$5;
      const _component_UFormField = _sfc_main$6;
      const _component_UInput = _sfc_main$7;
      const _component_UTextarea = _sfc_main$8;
      const _component_UIcon = _sfc_main$a;
      const _component_USelect = _sfc_main$b;
      const _component_UCheckbox = _sfc_main$c;
      _push(`<!--[-->`);
      _push(ssrRenderComponent(unref(Head), {
        title: `Edit: ${__props.article.title}`
      }, null, _parent));
      _push(`<div class="space-y-6"><!-- Header --><div class="flex flex-col gap-4 md:flex-row md:items-center md:justify-between"><div class="flex items-center gap-4">`);
      _push(ssrRenderComponent(_component_UButton, {
        icon: "i-heroicons-arrow-left",
        color: "neutral",
        variant: "ghost",
        to: "/admin/articles"
      }, null, _parent));
      _push(`<div><div class="flex items-center gap-3"><h1 class="text-2xl font-bold text-gray-900 dark:text-white">Edit Artikel</h1>`);
      _push(ssrRenderComponent(_component_UBadge, {
        color: unref(getStatusColor)(__props.article.status),
        variant: "soft"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`${ssrInterpolate(unref(getStatusLabel)(__props.article.status))}`);
          } else {
            return [
              createTextVNode(
                toDisplayString(unref(getStatusLabel)(__props.article.status)),
                1
                /* TEXT */
              )
            ];
          }
        }),
        _: 1
        /* STABLE */
      }, _parent));
      if (hasUnsavedChanges.value) {
        _push(ssrRenderComponent(_component_UBadge, {
          color: "warning",
          variant: "soft"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(` Belum disimpan `);
            } else {
              return [
                createTextVNode(" Belum disimpan ")
              ];
            }
          }),
          _: 1
          /* STABLE */
        }, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(`</div><p class="mt-1 text-sm text-gray-500 dark:text-gray-400"> Terakhir diubah: ${ssrInterpolate(formatDate(__props.article.updatedAt))}</p></div></div><div class="flex items-center gap-2">`);
      _push(ssrRenderComponent(_component_UButton, {
        color: "neutral",
        variant: "soft",
        icon: "i-heroicons-eye",
        onClick: openPreview
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` Preview `);
          } else {
            return [
              createTextVNode(" Preview ")
            ];
          }
        }),
        _: 1
        /* STABLE */
      }, _parent));
      _push(ssrRenderComponent(_component_UDropdownMenu, {
        items: [
          [
            {
              label: __props.article.status === "published" ? "Jadikan Draft" : "Publikasikan",
              icon: __props.article.status === "published" ? "i-heroicons-archive-box" : "i-heroicons-paper-airplane",
              onSelect: () => handleSubmit(__props.article.status === "published" ? "draft" : "published")
            },
            {
              label: "Arsipkan",
              icon: "i-heroicons-archive-box-arrow-down",
              onSelect: () => handleSubmit("archived"),
              disabled: __props.article.status === "archived"
            }
          ],
          [
            {
              label: "Hapus",
              icon: "i-heroicons-trash",
              color: "error",
              onSelect: handleDelete
            }
          ]
        ],
        content: { align: "end" },
        modal: false
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_UButton, {
              color: "neutral",
              variant: "outline",
              icon: "i-heroicons-ellipsis-vertical"
            }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_UButton, {
                color: "neutral",
                variant: "outline",
                icon: "i-heroicons-ellipsis-vertical"
              })
            ];
          }
        }),
        _: 1
        /* STABLE */
      }, _parent));
      _push(ssrRenderComponent(_component_UButton, {
        color: "primary",
        loading: isSaving.value,
        disabled: isSaving.value,
        icon: "i-heroicons-check",
        onClick: ($event) => handleSubmit()
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` Simpan Perubahan `);
          } else {
            return [
              createTextVNode(" Simpan Perubahan ")
            ];
          }
        }),
        _: 1
        /* STABLE */
      }, _parent));
      _push(`</div></div><!-- Article stats --><div class="grid grid-cols-2 gap-4 md:grid-cols-5">`);
      _push(ssrRenderComponent(_component_UCard, { class: "text-center" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<p class="text-xs text-gray-500"${_scopeId}>Views</p><p class="text-xl font-semibold"${_scopeId}>${ssrInterpolate(__props.article.viewCount.toLocaleString("id-ID"))}</p>`);
          } else {
            return [
              createVNode("p", { class: "text-xs text-gray-500" }, "Views"),
              createVNode(
                "p",
                { class: "text-xl font-semibold" },
                toDisplayString(__props.article.viewCount.toLocaleString("id-ID")),
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
            _push2(`<p class="text-xs text-gray-500"${_scopeId}>Likes</p><p class="text-xl font-semibold"${_scopeId}>${ssrInterpolate(__props.article.likeCount.toLocaleString("id-ID"))}</p>`);
          } else {
            return [
              createVNode("p", { class: "text-xs text-gray-500" }, "Likes"),
              createVNode(
                "p",
                { class: "text-xl font-semibold" },
                toDisplayString(__props.article.likeCount.toLocaleString("id-ID")),
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
            _push2(`<p class="text-xs text-gray-500"${_scopeId}>Shares</p><p class="text-xl font-semibold"${_scopeId}>${ssrInterpolate(__props.article.shareCount.toLocaleString("id-ID"))}</p>`);
          } else {
            return [
              createVNode("p", { class: "text-xs text-gray-500" }, "Shares"),
              createVNode(
                "p",
                { class: "text-xl font-semibold" },
                toDisplayString(__props.article.shareCount.toLocaleString("id-ID")),
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
            _push2(`<p class="text-xs text-gray-500"${_scopeId}>Waktu Baca</p><p class="text-xl font-semibold"${_scopeId}>${ssrInterpolate(__props.article.readTime)} menit</p>`);
          } else {
            return [
              createVNode("p", { class: "text-xs text-gray-500" }, "Waktu Baca"),
              createVNode(
                "p",
                { class: "text-xl font-semibold" },
                toDisplayString(__props.article.readTime) + " menit",
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
            _push2(`<p class="text-xs text-gray-500"${_scopeId}>Blok Konten</p><p class="text-xl font-semibold"${_scopeId}>${ssrInterpolate(unref(form).blocks.length)}</p>`);
          } else {
            return [
              createVNode("p", { class: "text-xs text-gray-500" }, "Blok Konten"),
              createVNode(
                "p",
                { class: "text-xl font-semibold" },
                toDisplayString(unref(form).blocks.length),
                1
                /* TEXT */
              )
            ];
          }
        }),
        _: 1
        /* STABLE */
      }, _parent));
      _push(`</div><!-- Tabs -->`);
      _push(ssrRenderComponent(_component_UTabs, {
        modelValue: activeTab.value,
        "onUpdate:modelValue": ($event) => activeTab.value = $event,
        items: tabs
      }, null, _parent));
      _push(`<!-- Form --><form><!-- Content Tab --><div class="space-y-6" style="${ssrRenderStyle(activeTab.value === "content" ? null : { display: "none" })}">`);
      _push(ssrRenderComponent(_component_UCard, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="space-y-4"${_scopeId}><!-- Title -->`);
            _push2(ssrRenderComponent(_component_UFormField, {
              label: "Judul Artikel",
              required: "",
              error: unref(form).errors.title
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_UInput, {
                    modelValue: unref(form).title,
                    "onUpdate:modelValue": ($event) => unref(form).title = $event,
                    placeholder: "Masukkan judul artikel...",
                    size: "lg",
                    class: [{ "text-xl font-semibold": true }, "w-full"]
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_UInput, {
                      modelValue: unref(form).title,
                      "onUpdate:modelValue": ($event) => unref(form).title = $event,
                      placeholder: "Masukkan judul artikel...",
                      size: "lg",
                      class: [{ "text-xl font-semibold": true }, "w-full"]
                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                  ];
                }
              }),
              _: 1
              /* STABLE */
            }, _parent2, _scopeId));
            _push2(`<!-- Slug -->`);
            _push2(ssrRenderComponent(_component_UFormField, {
              label: "Slug (URL)",
              error: unref(form).errors.slug
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_UInput, {
                    modelValue: unref(form).slug,
                    "onUpdate:modelValue": ($event) => unref(form).slug = $event,
                    placeholder: "url-artikel",
                    icon: "i-heroicons-link",
                    class: "w-full"
                  }, {
                    leading: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<span class="text-sm text-gray-500"${_scopeId3}>/artikel/</span>`);
                      } else {
                        return [
                          createVNode("span", { class: "text-sm text-gray-500" }, "/artikel/")
                        ];
                      }
                    }),
                    _: 1
                    /* STABLE */
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_UInput, {
                      modelValue: unref(form).slug,
                      "onUpdate:modelValue": ($event) => unref(form).slug = $event,
                      placeholder: "url-artikel",
                      icon: "i-heroicons-link",
                      class: "w-full"
                    }, {
                      leading: withCtx(() => [
                        createVNode("span", { class: "text-sm text-gray-500" }, "/artikel/")
                      ]),
                      _: 1
                      /* STABLE */
                    }, 8, ["modelValue", "onUpdate:modelValue"])
                  ];
                }
              }),
              _: 1
              /* STABLE */
            }, _parent2, _scopeId));
            _push2(`<!-- Excerpt -->`);
            _push2(ssrRenderComponent(_component_UFormField, {
              label: "Ringkasan",
              error: unref(form).errors.excerpt
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_UTextarea, {
                    modelValue: unref(form).excerpt,
                    "onUpdate:modelValue": ($event) => unref(form).excerpt = $event,
                    placeholder: "Tulis ringkasan singkat artikel (akan ditampilkan di daftar artikel)...",
                    rows: 3,
                    class: "w-full"
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_UTextarea, {
                      modelValue: unref(form).excerpt,
                      "onUpdate:modelValue": ($event) => unref(form).excerpt = $event,
                      placeholder: "Tulis ringkasan singkat artikel (akan ditampilkan di daftar artikel)...",
                      rows: 3,
                      class: "w-full"
                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                  ];
                }
              }),
              _: 1
              /* STABLE */
            }, _parent2, _scopeId));
            _push2(`</div>`);
          } else {
            return [
              createVNode("div", { class: "space-y-4" }, [
                createCommentVNode(" Title "),
                createVNode(_component_UFormField, {
                  label: "Judul Artikel",
                  required: "",
                  error: unref(form).errors.title
                }, {
                  default: withCtx(() => [
                    createVNode(_component_UInput, {
                      modelValue: unref(form).title,
                      "onUpdate:modelValue": ($event) => unref(form).title = $event,
                      placeholder: "Masukkan judul artikel...",
                      size: "lg",
                      class: [{ "text-xl font-semibold": true }, "w-full"]
                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                  ]),
                  _: 1
                  /* STABLE */
                }, 8, ["error"]),
                createCommentVNode(" Slug "),
                createVNode(_component_UFormField, {
                  label: "Slug (URL)",
                  error: unref(form).errors.slug
                }, {
                  default: withCtx(() => [
                    createVNode(_component_UInput, {
                      modelValue: unref(form).slug,
                      "onUpdate:modelValue": ($event) => unref(form).slug = $event,
                      placeholder: "url-artikel",
                      icon: "i-heroicons-link",
                      class: "w-full"
                    }, {
                      leading: withCtx(() => [
                        createVNode("span", { class: "text-sm text-gray-500" }, "/artikel/")
                      ]),
                      _: 1
                      /* STABLE */
                    }, 8, ["modelValue", "onUpdate:modelValue"])
                  ]),
                  _: 1
                  /* STABLE */
                }, 8, ["error"]),
                createCommentVNode(" Excerpt "),
                createVNode(_component_UFormField, {
                  label: "Ringkasan",
                  error: unref(form).errors.excerpt
                }, {
                  default: withCtx(() => [
                    createVNode(_component_UTextarea, {
                      modelValue: unref(form).excerpt,
                      "onUpdate:modelValue": ($event) => unref(form).excerpt = $event,
                      placeholder: "Tulis ringkasan singkat artikel (akan ditampilkan di daftar artikel)...",
                      rows: 3,
                      class: "w-full"
                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                  ]),
                  _: 1
                  /* STABLE */
                }, 8, ["error"])
              ])
            ];
          }
        }),
        _: 1
        /* STABLE */
      }, _parent));
      _push(`<!-- Page Builder -->`);
      _push(ssrRenderComponent(_component_UCard, null, {
        header: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="flex items-center justify-between"${_scopeId}><h3 class="font-semibold"${_scopeId}>Konten Artikel</h3>`);
            _push2(ssrRenderComponent(_component_UBadge, {
              color: "info",
              variant: "soft"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`${ssrInterpolate(unref(form).blocks.length)} blok `);
                } else {
                  return [
                    createTextVNode(
                      toDisplayString(unref(form).blocks.length) + " blok ",
                      1
                      /* TEXT */
                    )
                  ];
                }
              }),
              _: 1
              /* STABLE */
            }, _parent2, _scopeId));
            _push2(`</div>`);
          } else {
            return [
              createVNode("div", { class: "flex items-center justify-between" }, [
                createVNode("h3", { class: "font-semibold" }, "Konten Artikel"),
                createVNode(_component_UBadge, {
                  color: "info",
                  variant: "soft"
                }, {
                  default: withCtx(() => [
                    createTextVNode(
                      toDisplayString(unref(form).blocks.length) + " blok ",
                      1
                      /* TEXT */
                    )
                  ]),
                  _: 1
                  /* STABLE */
                })
              ])
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_sfc_main$9, {
              modelValue: unref(form).blocks,
              "onUpdate:modelValue": ($event) => unref(form).blocks = $event,
              "upload-url": "/admin/articles/upload-image",
              class: "w-full"
            }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(_sfc_main$9, {
                modelValue: unref(form).blocks,
                "onUpdate:modelValue": ($event) => unref(form).blocks = $event,
                "upload-url": "/admin/articles/upload-image",
                class: "w-full"
              }, null, 8, ["modelValue", "onUpdate:modelValue"])
            ];
          }
        }),
        _: 1
        /* STABLE */
      }, _parent));
      _push(`</div><!-- Media Tab --><div class="space-y-6" style="${ssrRenderStyle(activeTab.value === "media" ? null : { display: "none" })}">`);
      _push(ssrRenderComponent(_component_UCard, null, {
        header: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<h3 class="font-semibold"${_scopeId}>Gambar Artikel</h3>`);
          } else {
            return [
              createVNode("h3", { class: "font-semibold" }, "Gambar Artikel")
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="grid gap-6 md:grid-cols-2"${_scopeId}><!-- Thumbnail -->`);
            _push2(ssrRenderComponent(_component_UFormField, {
              label: "Thumbnail",
              help: "Gambar yang ditampilkan di daftar artikel (rasio 16:9)"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="space-y-3"${_scopeId2}><input type="file" accept="image/jpeg,image/png,image/webp,image/gif" class="hidden"${_scopeId2}>`);
                  if (thumbnailPreview.value) {
                    _push3(`<div class="relative aspect-video overflow-hidden rounded-lg border dark:border-gray-700"${_scopeId2}><img${ssrRenderAttr("src", thumbnailPreview.value)} alt="Thumbnail" class="h-full w-full object-cover"${_scopeId2}>`);
                    _push3(ssrRenderComponent(_component_UButton, {
                      icon: "i-heroicons-x-mark",
                      color: "error",
                      variant: "solid",
                      size: "xs",
                      class: "absolute right-2 top-2",
                      onClick: removeThumbnail
                    }, null, _parent3, _scopeId2));
                    _push3(`</div>`);
                  } else {
                    _push3(`<div class="flex aspect-video cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 transition-colors hover:border-primary-500 dark:border-gray-600"${_scopeId2}>`);
                    _push3(ssrRenderComponent(_component_UIcon, {
                      name: "i-heroicons-photo",
                      class: "mb-2 h-8 w-8 text-gray-400"
                    }, null, _parent3, _scopeId2));
                    _push3(`<span class="text-sm text-gray-500"${_scopeId2}>Klik untuk upload thumbnail</span></div>`);
                  }
                  _push3(ssrRenderComponent(_component_UButton, {
                    type: "button",
                    color: "neutral",
                    variant: "outline",
                    size: "sm",
                    onClick: ($event) => thumbnailInputRef.value?.click()
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_UIcon, {
                          name: "i-heroicons-arrow-up-tray",
                          class: "mr-2 h-4 w-4"
                        }, null, _parent4, _scopeId3));
                        _push4(` ${ssrInterpolate(thumbnailPreview.value ? "Ganti Thumbnail" : "Upload Thumbnail")}`);
                      } else {
                        return [
                          createVNode(_component_UIcon, {
                            name: "i-heroicons-arrow-up-tray",
                            class: "mr-2 h-4 w-4"
                          }),
                          createTextVNode(
                            " " + toDisplayString(thumbnailPreview.value ? "Ganti Thumbnail" : "Upload Thumbnail"),
                            1
                            /* TEXT */
                          )
                        ];
                      }
                    }),
                    _: 1
                    /* STABLE */
                  }, _parent3, _scopeId2));
                  _push3(`</div>`);
                } else {
                  return [
                    createVNode("div", { class: "space-y-3" }, [
                      createVNode(
                        "input",
                        {
                          ref_key: "thumbnailInputRef",
                          ref: thumbnailInputRef,
                          type: "file",
                          accept: "image/jpeg,image/png,image/webp,image/gif",
                          class: "hidden",
                          onChange: handleThumbnailSelect
                        },
                        null,
                        544
                        /* NEED_HYDRATION, NEED_PATCH */
                      ),
                      thumbnailPreview.value ? (openBlock(), createBlock("div", {
                        key: 0,
                        class: "relative aspect-video overflow-hidden rounded-lg border dark:border-gray-700"
                      }, [
                        createVNode("img", {
                          src: thumbnailPreview.value,
                          alt: "Thumbnail",
                          class: "h-full w-full object-cover"
                        }, null, 8, ["src"]),
                        createVNode(_component_UButton, {
                          icon: "i-heroicons-x-mark",
                          color: "error",
                          variant: "solid",
                          size: "xs",
                          class: "absolute right-2 top-2",
                          onClick: removeThumbnail
                        })
                      ])) : (openBlock(), createBlock("div", {
                        key: 1,
                        class: "flex aspect-video cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 transition-colors hover:border-primary-500 dark:border-gray-600",
                        onClick: ($event) => thumbnailInputRef.value?.click()
                      }, [
                        createVNode(_component_UIcon, {
                          name: "i-heroicons-photo",
                          class: "mb-2 h-8 w-8 text-gray-400"
                        }),
                        createVNode("span", { class: "text-sm text-gray-500" }, "Klik untuk upload thumbnail")
                      ], 8, ["onClick"])),
                      createVNode(_component_UButton, {
                        type: "button",
                        color: "neutral",
                        variant: "outline",
                        size: "sm",
                        onClick: ($event) => thumbnailInputRef.value?.click()
                      }, {
                        default: withCtx(() => [
                          createVNode(_component_UIcon, {
                            name: "i-heroicons-arrow-up-tray",
                            class: "mr-2 h-4 w-4"
                          }),
                          createTextVNode(
                            " " + toDisplayString(thumbnailPreview.value ? "Ganti Thumbnail" : "Upload Thumbnail"),
                            1
                            /* TEXT */
                          )
                        ]),
                        _: 1
                        /* STABLE */
                      }, 8, ["onClick"])
                    ])
                  ];
                }
              }),
              _: 1
              /* STABLE */
            }, _parent2, _scopeId));
            _push2(`<!-- Banner -->`);
            _push2(ssrRenderComponent(_component_UFormField, {
              label: "Banner",
              help: "Gambar header yang ditampilkan di halaman artikel"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="space-y-3"${_scopeId2}><input type="file" accept="image/jpeg,image/png,image/webp,image/gif" class="hidden"${_scopeId2}>`);
                  if (bannerPreview.value) {
                    _push3(`<div class="relative aspect-video overflow-hidden rounded-lg border dark:border-gray-700"${_scopeId2}><img${ssrRenderAttr("src", bannerPreview.value)} alt="Banner" class="h-full w-full object-cover"${_scopeId2}>`);
                    _push3(ssrRenderComponent(_component_UButton, {
                      icon: "i-heroicons-x-mark",
                      color: "error",
                      variant: "solid",
                      size: "xs",
                      class: "absolute right-2 top-2",
                      onClick: removeBanner
                    }, null, _parent3, _scopeId2));
                    _push3(`</div>`);
                  } else {
                    _push3(`<div class="flex aspect-video cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 transition-colors hover:border-primary-500 dark:border-gray-600"${_scopeId2}>`);
                    _push3(ssrRenderComponent(_component_UIcon, {
                      name: "i-heroicons-photo",
                      class: "mb-2 h-8 w-8 text-gray-400"
                    }, null, _parent3, _scopeId2));
                    _push3(`<span class="text-sm text-gray-500"${_scopeId2}>Klik untuk upload banner</span></div>`);
                  }
                  _push3(ssrRenderComponent(_component_UButton, {
                    type: "button",
                    color: "neutral",
                    variant: "outline",
                    size: "sm",
                    onClick: ($event) => bannerInputRef.value?.click()
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_UIcon, {
                          name: "i-heroicons-arrow-up-tray",
                          class: "mr-2 h-4 w-4"
                        }, null, _parent4, _scopeId3));
                        _push4(` ${ssrInterpolate(bannerPreview.value ? "Ganti Banner" : "Upload Banner")}`);
                      } else {
                        return [
                          createVNode(_component_UIcon, {
                            name: "i-heroicons-arrow-up-tray",
                            class: "mr-2 h-4 w-4"
                          }),
                          createTextVNode(
                            " " + toDisplayString(bannerPreview.value ? "Ganti Banner" : "Upload Banner"),
                            1
                            /* TEXT */
                          )
                        ];
                      }
                    }),
                    _: 1
                    /* STABLE */
                  }, _parent3, _scopeId2));
                  _push3(`</div>`);
                } else {
                  return [
                    createVNode("div", { class: "space-y-3" }, [
                      createVNode(
                        "input",
                        {
                          ref_key: "bannerInputRef",
                          ref: bannerInputRef,
                          type: "file",
                          accept: "image/jpeg,image/png,image/webp,image/gif",
                          class: "hidden",
                          onChange: handleBannerSelect
                        },
                        null,
                        544
                        /* NEED_HYDRATION, NEED_PATCH */
                      ),
                      bannerPreview.value ? (openBlock(), createBlock("div", {
                        key: 0,
                        class: "relative aspect-video overflow-hidden rounded-lg border dark:border-gray-700"
                      }, [
                        createVNode("img", {
                          src: bannerPreview.value,
                          alt: "Banner",
                          class: "h-full w-full object-cover"
                        }, null, 8, ["src"]),
                        createVNode(_component_UButton, {
                          icon: "i-heroicons-x-mark",
                          color: "error",
                          variant: "solid",
                          size: "xs",
                          class: "absolute right-2 top-2",
                          onClick: removeBanner
                        })
                      ])) : (openBlock(), createBlock("div", {
                        key: 1,
                        class: "flex aspect-video cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 transition-colors hover:border-primary-500 dark:border-gray-600",
                        onClick: ($event) => bannerInputRef.value?.click()
                      }, [
                        createVNode(_component_UIcon, {
                          name: "i-heroicons-photo",
                          class: "mb-2 h-8 w-8 text-gray-400"
                        }),
                        createVNode("span", { class: "text-sm text-gray-500" }, "Klik untuk upload banner")
                      ], 8, ["onClick"])),
                      createVNode(_component_UButton, {
                        type: "button",
                        color: "neutral",
                        variant: "outline",
                        size: "sm",
                        onClick: ($event) => bannerInputRef.value?.click()
                      }, {
                        default: withCtx(() => [
                          createVNode(_component_UIcon, {
                            name: "i-heroicons-arrow-up-tray",
                            class: "mr-2 h-4 w-4"
                          }),
                          createTextVNode(
                            " " + toDisplayString(bannerPreview.value ? "Ganti Banner" : "Upload Banner"),
                            1
                            /* TEXT */
                          )
                        ]),
                        _: 1
                        /* STABLE */
                      }, 8, ["onClick"])
                    ])
                  ];
                }
              }),
              _: 1
              /* STABLE */
            }, _parent2, _scopeId));
            _push2(`</div>`);
          } else {
            return [
              createVNode("div", { class: "grid gap-6 md:grid-cols-2" }, [
                createCommentVNode(" Thumbnail "),
                createVNode(_component_UFormField, {
                  label: "Thumbnail",
                  help: "Gambar yang ditampilkan di daftar artikel (rasio 16:9)"
                }, {
                  default: withCtx(() => [
                    createVNode("div", { class: "space-y-3" }, [
                      createVNode(
                        "input",
                        {
                          ref_key: "thumbnailInputRef",
                          ref: thumbnailInputRef,
                          type: "file",
                          accept: "image/jpeg,image/png,image/webp,image/gif",
                          class: "hidden",
                          onChange: handleThumbnailSelect
                        },
                        null,
                        544
                        /* NEED_HYDRATION, NEED_PATCH */
                      ),
                      thumbnailPreview.value ? (openBlock(), createBlock("div", {
                        key: 0,
                        class: "relative aspect-video overflow-hidden rounded-lg border dark:border-gray-700"
                      }, [
                        createVNode("img", {
                          src: thumbnailPreview.value,
                          alt: "Thumbnail",
                          class: "h-full w-full object-cover"
                        }, null, 8, ["src"]),
                        createVNode(_component_UButton, {
                          icon: "i-heroicons-x-mark",
                          color: "error",
                          variant: "solid",
                          size: "xs",
                          class: "absolute right-2 top-2",
                          onClick: removeThumbnail
                        })
                      ])) : (openBlock(), createBlock("div", {
                        key: 1,
                        class: "flex aspect-video cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 transition-colors hover:border-primary-500 dark:border-gray-600",
                        onClick: ($event) => thumbnailInputRef.value?.click()
                      }, [
                        createVNode(_component_UIcon, {
                          name: "i-heroicons-photo",
                          class: "mb-2 h-8 w-8 text-gray-400"
                        }),
                        createVNode("span", { class: "text-sm text-gray-500" }, "Klik untuk upload thumbnail")
                      ], 8, ["onClick"])),
                      createVNode(_component_UButton, {
                        type: "button",
                        color: "neutral",
                        variant: "outline",
                        size: "sm",
                        onClick: ($event) => thumbnailInputRef.value?.click()
                      }, {
                        default: withCtx(() => [
                          createVNode(_component_UIcon, {
                            name: "i-heroicons-arrow-up-tray",
                            class: "mr-2 h-4 w-4"
                          }),
                          createTextVNode(
                            " " + toDisplayString(thumbnailPreview.value ? "Ganti Thumbnail" : "Upload Thumbnail"),
                            1
                            /* TEXT */
                          )
                        ]),
                        _: 1
                        /* STABLE */
                      }, 8, ["onClick"])
                    ])
                  ]),
                  _: 1
                  /* STABLE */
                }),
                createCommentVNode(" Banner "),
                createVNode(_component_UFormField, {
                  label: "Banner",
                  help: "Gambar header yang ditampilkan di halaman artikel"
                }, {
                  default: withCtx(() => [
                    createVNode("div", { class: "space-y-3" }, [
                      createVNode(
                        "input",
                        {
                          ref_key: "bannerInputRef",
                          ref: bannerInputRef,
                          type: "file",
                          accept: "image/jpeg,image/png,image/webp,image/gif",
                          class: "hidden",
                          onChange: handleBannerSelect
                        },
                        null,
                        544
                        /* NEED_HYDRATION, NEED_PATCH */
                      ),
                      bannerPreview.value ? (openBlock(), createBlock("div", {
                        key: 0,
                        class: "relative aspect-video overflow-hidden rounded-lg border dark:border-gray-700"
                      }, [
                        createVNode("img", {
                          src: bannerPreview.value,
                          alt: "Banner",
                          class: "h-full w-full object-cover"
                        }, null, 8, ["src"]),
                        createVNode(_component_UButton, {
                          icon: "i-heroicons-x-mark",
                          color: "error",
                          variant: "solid",
                          size: "xs",
                          class: "absolute right-2 top-2",
                          onClick: removeBanner
                        })
                      ])) : (openBlock(), createBlock("div", {
                        key: 1,
                        class: "flex aspect-video cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 transition-colors hover:border-primary-500 dark:border-gray-600",
                        onClick: ($event) => bannerInputRef.value?.click()
                      }, [
                        createVNode(_component_UIcon, {
                          name: "i-heroicons-photo",
                          class: "mb-2 h-8 w-8 text-gray-400"
                        }),
                        createVNode("span", { class: "text-sm text-gray-500" }, "Klik untuk upload banner")
                      ], 8, ["onClick"])),
                      createVNode(_component_UButton, {
                        type: "button",
                        color: "neutral",
                        variant: "outline",
                        size: "sm",
                        onClick: ($event) => bannerInputRef.value?.click()
                      }, {
                        default: withCtx(() => [
                          createVNode(_component_UIcon, {
                            name: "i-heroicons-arrow-up-tray",
                            class: "mr-2 h-4 w-4"
                          }),
                          createTextVNode(
                            " " + toDisplayString(bannerPreview.value ? "Ganti Banner" : "Upload Banner"),
                            1
                            /* TEXT */
                          )
                        ]),
                        _: 1
                        /* STABLE */
                      }, 8, ["onClick"])
                    ])
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
      _push(`</div><!-- SEO Tab --><div class="space-y-6" style="${ssrRenderStyle(activeTab.value === "seo" ? null : { display: "none" })}">`);
      _push(ssrRenderComponent(_component_UCard, null, {
        header: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<h3 class="font-semibold"${_scopeId}>Pengaturan SEO</h3>`);
          } else {
            return [
              createVNode("h3", { class: "font-semibold" }, "Pengaturan SEO")
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="space-y-4"${_scopeId}><!-- Meta Title -->`);
            _push2(ssrRenderComponent(_component_UFormField, {
              label: "Meta Title",
              help: `${metaTitleCount.value}/70 karakter`
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_UInput, {
                    modelValue: unref(form).metaTitle,
                    "onUpdate:modelValue": ($event) => unref(form).metaTitle = $event,
                    placeholder: "Judul untuk mesin pencari (kosongkan untuk menggunakan judul artikel)...",
                    maxlength: 70,
                    class: "w-full"
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_UInput, {
                      modelValue: unref(form).metaTitle,
                      "onUpdate:modelValue": ($event) => unref(form).metaTitle = $event,
                      placeholder: "Judul untuk mesin pencari (kosongkan untuk menggunakan judul artikel)...",
                      maxlength: 70,
                      class: "w-full"
                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                  ];
                }
              }),
              _: 1
              /* STABLE */
            }, _parent2, _scopeId));
            _push2(`<!-- Meta Description -->`);
            _push2(ssrRenderComponent(_component_UFormField, {
              label: "Meta Description",
              help: `${metaDescriptionCount.value}/160 karakter`
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_UTextarea, {
                    modelValue: unref(form).metaDescription,
                    "onUpdate:modelValue": ($event) => unref(form).metaDescription = $event,
                    placeholder: "Deskripsi untuk mesin pencari (kosongkan untuk menggunakan ringkasan)...",
                    rows: 3,
                    maxlength: 160,
                    class: "w-full"
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_UTextarea, {
                      modelValue: unref(form).metaDescription,
                      "onUpdate:modelValue": ($event) => unref(form).metaDescription = $event,
                      placeholder: "Deskripsi untuk mesin pencari (kosongkan untuk menggunakan ringkasan)...",
                      rows: 3,
                      maxlength: 160,
                      class: "w-full"
                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                  ];
                }
              }),
              _: 1
              /* STABLE */
            }, _parent2, _scopeId));
            _push2(`<!-- Meta Keywords -->`);
            _push2(ssrRenderComponent(_component_UFormField, { label: "Meta Keywords" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_UInput, {
                    modelValue: unref(form).metaKeywords,
                    "onUpdate:modelValue": ($event) => unref(form).metaKeywords = $event,
                    placeholder: "kata kunci, dipisah, koma...",
                    class: "w-full"
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_UInput, {
                      modelValue: unref(form).metaKeywords,
                      "onUpdate:modelValue": ($event) => unref(form).metaKeywords = $event,
                      placeholder: "kata kunci, dipisah, koma...",
                      class: "w-full"
                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                  ];
                }
              }),
              _: 1
              /* STABLE */
            }, _parent2, _scopeId));
            _push2(`<!-- SEO Preview --><div class="mt-6 rounded-lg border bg-white p-4 dark:border-gray-700 dark:bg-gray-800"${_scopeId}><p class="mb-2 text-xs text-gray-500"${_scopeId}>Preview di Google:</p><div class="space-y-1"${_scopeId}><p class="text-lg text-blue-600 hover:underline"${_scopeId}>${ssrInterpolate(unref(form).metaTitle || unref(form).title || "Judul Artikel")}</p><p class="text-sm text-green-600"${_scopeId}> https://ogitu.com/artikel/${ssrInterpolate(unref(form).slug || "url-artikel")}</p><p class="text-sm text-gray-600 dark:text-gray-400"${_scopeId}>${ssrInterpolate(unref(form).metaDescription || unref(form).excerpt || "Deskripsi artikel akan muncul di sini...")}</p></div></div></div>`);
          } else {
            return [
              createVNode("div", { class: "space-y-4" }, [
                createCommentVNode(" Meta Title "),
                createVNode(_component_UFormField, {
                  label: "Meta Title",
                  help: `${metaTitleCount.value}/70 karakter`
                }, {
                  default: withCtx(() => [
                    createVNode(_component_UInput, {
                      modelValue: unref(form).metaTitle,
                      "onUpdate:modelValue": ($event) => unref(form).metaTitle = $event,
                      placeholder: "Judul untuk mesin pencari (kosongkan untuk menggunakan judul artikel)...",
                      maxlength: 70,
                      class: "w-full"
                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                  ]),
                  _: 1
                  /* STABLE */
                }, 8, ["help"]),
                createCommentVNode(" Meta Description "),
                createVNode(_component_UFormField, {
                  label: "Meta Description",
                  help: `${metaDescriptionCount.value}/160 karakter`
                }, {
                  default: withCtx(() => [
                    createVNode(_component_UTextarea, {
                      modelValue: unref(form).metaDescription,
                      "onUpdate:modelValue": ($event) => unref(form).metaDescription = $event,
                      placeholder: "Deskripsi untuk mesin pencari (kosongkan untuk menggunakan ringkasan)...",
                      rows: 3,
                      maxlength: 160,
                      class: "w-full"
                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                  ]),
                  _: 1
                  /* STABLE */
                }, 8, ["help"]),
                createCommentVNode(" Meta Keywords "),
                createVNode(_component_UFormField, { label: "Meta Keywords" }, {
                  default: withCtx(() => [
                    createVNode(_component_UInput, {
                      modelValue: unref(form).metaKeywords,
                      "onUpdate:modelValue": ($event) => unref(form).metaKeywords = $event,
                      placeholder: "kata kunci, dipisah, koma...",
                      class: "w-full"
                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                  ]),
                  _: 1
                  /* STABLE */
                }),
                createCommentVNode(" SEO Preview "),
                createVNode("div", { class: "mt-6 rounded-lg border bg-white p-4 dark:border-gray-700 dark:bg-gray-800" }, [
                  createVNode("p", { class: "mb-2 text-xs text-gray-500" }, "Preview di Google:"),
                  createVNode("div", { class: "space-y-1" }, [
                    createVNode(
                      "p",
                      { class: "text-lg text-blue-600 hover:underline" },
                      toDisplayString(unref(form).metaTitle || unref(form).title || "Judul Artikel"),
                      1
                      /* TEXT */
                    ),
                    createVNode(
                      "p",
                      { class: "text-sm text-green-600" },
                      " https://ogitu.com/artikel/" + toDisplayString(unref(form).slug || "url-artikel"),
                      1
                      /* TEXT */
                    ),
                    createVNode(
                      "p",
                      { class: "text-sm text-gray-600 dark:text-gray-400" },
                      toDisplayString(unref(form).metaDescription || unref(form).excerpt || "Deskripsi artikel akan muncul di sini..."),
                      1
                      /* TEXT */
                    )
                  ])
                ])
              ])
            ];
          }
        }),
        _: 1
        /* STABLE */
      }, _parent));
      _push(`</div><!-- Settings Tab --><div class="space-y-6" style="${ssrRenderStyle(activeTab.value === "settings" ? null : { display: "none" })}"><div class="grid gap-6 md:grid-cols-2"><!-- Category & Tags -->`);
      _push(ssrRenderComponent(_component_UCard, null, {
        header: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<h3 class="font-semibold"${_scopeId}>Kategori &amp; Tags</h3>`);
          } else {
            return [
              createVNode("h3", { class: "font-semibold" }, "Kategori & Tags")
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="space-y-4"${_scopeId}><!-- Category -->`);
            _push2(ssrRenderComponent(_component_UFormField, {
              label: "Kategori",
              required: "",
              error: unref(form).errors.category
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_USelect, {
                    modelValue: unref(form).category,
                    "onUpdate:modelValue": ($event) => unref(form).category = $event,
                    items: __props.categories,
                    "label-key": "label",
                    "value-key": "value",
                    placeholder: "Pilih kategori...",
                    class: "w-full",
                    portal: false
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_USelect, {
                      modelValue: unref(form).category,
                      "onUpdate:modelValue": ($event) => unref(form).category = $event,
                      items: __props.categories,
                      "label-key": "label",
                      "value-key": "value",
                      placeholder: "Pilih kategori...",
                      class: "w-full",
                      portal: false
                    }, null, 8, ["modelValue", "onUpdate:modelValue", "items"])
                  ];
                }
              }),
              _: 1
              /* STABLE */
            }, _parent2, _scopeId));
            _push2(`<!-- Tags -->`);
            _push2(ssrRenderComponent(_component_UFormField, { label: "Tags" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="space-y-2"${_scopeId2}><div class="flex gap-2"${_scopeId2}>`);
                  _push3(ssrRenderComponent(_component_UInput, {
                    modelValue: tagInput.value,
                    "onUpdate:modelValue": ($event) => tagInput.value = $event,
                    placeholder: "Tambah tag...",
                    class: "flex-1 w-full",
                    onKeydown: handleTagKeydown
                  }, null, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_UButton, {
                    icon: "i-heroicons-plus",
                    color: "primary",
                    variant: "soft",
                    onClick: addTag
                  }, null, _parent3, _scopeId2));
                  _push3(`</div>`);
                  if (unref(form).tags.length > 0) {
                    _push3(`<div class="flex flex-wrap gap-2"${_scopeId2}><!--[-->`);
                    ssrRenderList(unref(form).tags, (tag, index) => {
                      _push3(ssrRenderComponent(_component_UBadge, {
                        key: index,
                        color: "neutral",
                        variant: "soft",
                        class: "cursor-pointer",
                        onClick: ($event) => removeTag(index)
                      }, {
                        default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                          if (_push4) {
                            _push4(`${ssrInterpolate(tag)} `);
                            _push4(ssrRenderComponent(_component_UIcon, {
                              name: "i-heroicons-x-mark",
                              class: "ml-1 h-3 w-3"
                            }, null, _parent4, _scopeId3));
                          } else {
                            return [
                              createTextVNode(
                                toDisplayString(tag) + " ",
                                1
                                /* TEXT */
                              ),
                              createVNode(_component_UIcon, {
                                name: "i-heroicons-x-mark",
                                class: "ml-1 h-3 w-3"
                              })
                            ];
                          }
                        }),
                        _: 2
                        /* DYNAMIC */
                      }, _parent3, _scopeId2));
                    });
                    _push3(`<!--]--></div>`);
                  } else {
                    _push3(`<!---->`);
                  }
                  _push3(`</div>`);
                } else {
                  return [
                    createVNode("div", { class: "space-y-2" }, [
                      createVNode("div", { class: "flex gap-2" }, [
                        createVNode(_component_UInput, {
                          modelValue: tagInput.value,
                          "onUpdate:modelValue": ($event) => tagInput.value = $event,
                          placeholder: "Tambah tag...",
                          class: "flex-1 w-full",
                          onKeydown: handleTagKeydown
                        }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                        createVNode(_component_UButton, {
                          icon: "i-heroicons-plus",
                          color: "primary",
                          variant: "soft",
                          onClick: addTag
                        })
                      ]),
                      unref(form).tags.length > 0 ? (openBlock(), createBlock("div", {
                        key: 0,
                        class: "flex flex-wrap gap-2"
                      }, [
                        (openBlock(true), createBlock(
                          Fragment,
                          null,
                          renderList(unref(form).tags, (tag, index) => {
                            return openBlock(), createBlock(_component_UBadge, {
                              key: index,
                              color: "neutral",
                              variant: "soft",
                              class: "cursor-pointer",
                              onClick: ($event) => removeTag(index)
                            }, {
                              default: withCtx(() => [
                                createTextVNode(
                                  toDisplayString(tag) + " ",
                                  1
                                  /* TEXT */
                                ),
                                createVNode(_component_UIcon, {
                                  name: "i-heroicons-x-mark",
                                  class: "ml-1 h-3 w-3"
                                })
                              ]),
                              _: 2
                              /* DYNAMIC */
                            }, 1032, ["onClick"]);
                          }),
                          128
                          /* KEYED_FRAGMENT */
                        ))
                      ])) : createCommentVNode("v-if", true)
                    ])
                  ];
                }
              }),
              _: 1
              /* STABLE */
            }, _parent2, _scopeId));
            _push2(`</div>`);
          } else {
            return [
              createVNode("div", { class: "space-y-4" }, [
                createCommentVNode(" Category "),
                createVNode(_component_UFormField, {
                  label: "Kategori",
                  required: "",
                  error: unref(form).errors.category
                }, {
                  default: withCtx(() => [
                    createVNode(_component_USelect, {
                      modelValue: unref(form).category,
                      "onUpdate:modelValue": ($event) => unref(form).category = $event,
                      items: __props.categories,
                      "label-key": "label",
                      "value-key": "value",
                      placeholder: "Pilih kategori...",
                      class: "w-full",
                      portal: false
                    }, null, 8, ["modelValue", "onUpdate:modelValue", "items"])
                  ]),
                  _: 1
                  /* STABLE */
                }, 8, ["error"]),
                createCommentVNode(" Tags "),
                createVNode(_component_UFormField, { label: "Tags" }, {
                  default: withCtx(() => [
                    createVNode("div", { class: "space-y-2" }, [
                      createVNode("div", { class: "flex gap-2" }, [
                        createVNode(_component_UInput, {
                          modelValue: tagInput.value,
                          "onUpdate:modelValue": ($event) => tagInput.value = $event,
                          placeholder: "Tambah tag...",
                          class: "flex-1 w-full",
                          onKeydown: handleTagKeydown
                        }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                        createVNode(_component_UButton, {
                          icon: "i-heroicons-plus",
                          color: "primary",
                          variant: "soft",
                          onClick: addTag
                        })
                      ]),
                      unref(form).tags.length > 0 ? (openBlock(), createBlock("div", {
                        key: 0,
                        class: "flex flex-wrap gap-2"
                      }, [
                        (openBlock(true), createBlock(
                          Fragment,
                          null,
                          renderList(unref(form).tags, (tag, index) => {
                            return openBlock(), createBlock(_component_UBadge, {
                              key: index,
                              color: "neutral",
                              variant: "soft",
                              class: "cursor-pointer",
                              onClick: ($event) => removeTag(index)
                            }, {
                              default: withCtx(() => [
                                createTextVNode(
                                  toDisplayString(tag) + " ",
                                  1
                                  /* TEXT */
                                ),
                                createVNode(_component_UIcon, {
                                  name: "i-heroicons-x-mark",
                                  class: "ml-1 h-3 w-3"
                                })
                              ]),
                              _: 2
                              /* DYNAMIC */
                            }, 1032, ["onClick"]);
                          }),
                          128
                          /* KEYED_FRAGMENT */
                        ))
                      ])) : createCommentVNode("v-if", true)
                    ])
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
      _push(`<!-- Author & Options -->`);
      _push(ssrRenderComponent(_component_UCard, null, {
        header: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<h3 class="font-semibold"${_scopeId}>Pengaturan Lainnya</h3>`);
          } else {
            return [
              createVNode("h3", { class: "font-semibold" }, "Pengaturan Lainnya")
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="space-y-4"${_scopeId}><!-- Author -->`);
            _push2(ssrRenderComponent(_component_UFormField, { label: "Penulis" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_USelect, {
                    modelValue: unref(form).authorId,
                    "onUpdate:modelValue": ($event) => unref(form).authorId = $event,
                    items: __props.authors.map((a) => ({ value: a.id, label: a.fullName })),
                    "label-key": "label",
                    "value-key": "value",
                    placeholder: "Pilih penulis...",
                    class: "w-full",
                    portal: false
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_USelect, {
                      modelValue: unref(form).authorId,
                      "onUpdate:modelValue": ($event) => unref(form).authorId = $event,
                      items: __props.authors.map((a) => ({ value: a.id, label: a.fullName })),
                      "label-key": "label",
                      "value-key": "value",
                      placeholder: "Pilih penulis...",
                      class: "w-full",
                      portal: false
                    }, null, 8, ["modelValue", "onUpdate:modelValue", "items"])
                  ];
                }
              }),
              _: 1
              /* STABLE */
            }, _parent2, _scopeId));
            _push2(`<!-- Status -->`);
            _push2(ssrRenderComponent(_component_UFormField, { label: "Status" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_USelect, {
                    modelValue: unref(form).status,
                    "onUpdate:modelValue": ($event) => unref(form).status = $event,
                    items: [
                      { value: "draft", label: "Draft" },
                      { value: "published", label: "Dipublikasikan" },
                      { value: "archived", label: "Diarsipkan" }
                    ],
                    "label-key": "label",
                    "value-key": "value",
                    class: "w-full",
                    portal: false
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_USelect, {
                      modelValue: unref(form).status,
                      "onUpdate:modelValue": ($event) => unref(form).status = $event,
                      items: [
                        { value: "draft", label: "Draft" },
                        { value: "published", label: "Dipublikasikan" },
                        { value: "archived", label: "Diarsipkan" }
                      ],
                      "label-key": "label",
                      "value-key": "value",
                      class: "w-full",
                      portal: false
                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                  ];
                }
              }),
              _: 1
              /* STABLE */
            }, _parent2, _scopeId));
            _push2(`<!-- Options --><div class="space-y-3 pt-4"${_scopeId}>`);
            _push2(ssrRenderComponent(_component_UCheckbox, {
              modelValue: unref(form).isFeatured,
              "onUpdate:modelValue": ($event) => unref(form).isFeatured = $event,
              label: "Artikel Unggulan",
              help: "Artikel ini akan ditampilkan di bagian unggulan"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_UCheckbox, {
              modelValue: unref(form).isPinned,
              "onUpdate:modelValue": ($event) => unref(form).isPinned = $event,
              label: "Sematkan di Atas",
              help: "Artikel ini akan selalu muncul di atas daftar"
            }, null, _parent2, _scopeId));
            _push2(`</div></div>`);
          } else {
            return [
              createVNode("div", { class: "space-y-4" }, [
                createCommentVNode(" Author "),
                createVNode(_component_UFormField, { label: "Penulis" }, {
                  default: withCtx(() => [
                    createVNode(_component_USelect, {
                      modelValue: unref(form).authorId,
                      "onUpdate:modelValue": ($event) => unref(form).authorId = $event,
                      items: __props.authors.map((a) => ({ value: a.id, label: a.fullName })),
                      "label-key": "label",
                      "value-key": "value",
                      placeholder: "Pilih penulis...",
                      class: "w-full",
                      portal: false
                    }, null, 8, ["modelValue", "onUpdate:modelValue", "items"])
                  ]),
                  _: 1
                  /* STABLE */
                }),
                createCommentVNode(" Status "),
                createVNode(_component_UFormField, { label: "Status" }, {
                  default: withCtx(() => [
                    createVNode(_component_USelect, {
                      modelValue: unref(form).status,
                      "onUpdate:modelValue": ($event) => unref(form).status = $event,
                      items: [
                        { value: "draft", label: "Draft" },
                        { value: "published", label: "Dipublikasikan" },
                        { value: "archived", label: "Diarsipkan" }
                      ],
                      "label-key": "label",
                      "value-key": "value",
                      class: "w-full",
                      portal: false
                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                  ]),
                  _: 1
                  /* STABLE */
                }),
                createCommentVNode(" Options "),
                createVNode("div", { class: "space-y-3 pt-4" }, [
                  createVNode(_component_UCheckbox, {
                    modelValue: unref(form).isFeatured,
                    "onUpdate:modelValue": ($event) => unref(form).isFeatured = $event,
                    label: "Artikel Unggulan",
                    help: "Artikel ini akan ditampilkan di bagian unggulan"
                  }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                  createVNode(_component_UCheckbox, {
                    modelValue: unref(form).isPinned,
                    "onUpdate:modelValue": ($event) => unref(form).isPinned = $event,
                    label: "Sematkan di Atas",
                    help: "Artikel ini akan selalu muncul di atas daftar"
                  }, null, 8, ["modelValue", "onUpdate:modelValue"])
                ])
              ])
            ];
          }
        }),
        _: 1
        /* STABLE */
      }, _parent));
      _push(`</div></div></form></div><!--]-->`);
    };
  }
});

const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("inertia/pages/admin/articles/edit.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
