const BLOCK_DEFINITIONS = [
  { type: "heading", label: "Heading", icon: "i-heroicons-h1", category: "text" },
  {
    type: "paragraph",
    label: "Paragraf",
    icon: "i-heroicons-bars-3-bottom-left",
    category: "text"
  },
  { type: "image", label: "Gambar", icon: "i-heroicons-photo", category: "media" },
  { type: "gallery", label: "Galeri", icon: "i-heroicons-squares-2x2", category: "media" },
  { type: "list", label: "Daftar", icon: "i-heroicons-list-bullet", category: "text" },
  {
    type: "quote",
    label: "Kutipan",
    icon: "i-heroicons-chat-bubble-bottom-center-text",
    category: "text"
  },
  { type: "code", label: "Kode", icon: "i-heroicons-code-bracket", category: "text" },
  { type: "table", label: "Tabel", icon: "i-heroicons-table-cells", category: "data" },
  { type: "divider", label: "Pembatas", icon: "i-heroicons-minus", category: "layout" },
  { type: "embed", label: "Embed Video", icon: "i-heroicons-play-circle", category: "media" },
  { type: "alert", label: "Peringatan", icon: "i-heroicons-exclamation-triangle", category: "ui" },
  { type: "accordion", label: "Akordion", icon: "i-heroicons-chevron-down", category: "ui" },
  { type: "button", label: "Tombol", icon: "i-heroicons-cursor-arrow-rays", category: "ui" },
  {
    type: "product-card",
    label: "Kartu Produk",
    icon: "i-heroicons-shopping-bag",
    category: "commerce"
  },
  {
    type: "product-list",
    label: "Daftar Produk",
    icon: "i-heroicons-shopping-cart",
    category: "commerce"
  },
  { type: "cta-box", label: "CTA Box", icon: "i-heroicons-megaphone", category: "ui" },
  { type: "pros-cons", label: "Pro & Kontra", icon: "i-heroicons-scale", category: "review" },
  { type: "rating-box", label: "Rating", icon: "i-heroicons-star", category: "review" },
  {
    type: "comparison-table",
    label: "Perbandingan",
    icon: "i-heroicons-arrows-right-left",
    category: "review"
  },
  { type: "toc", label: "Daftar Isi", icon: "i-heroicons-queue-list", category: "navigation" },
  { type: "author-box", label: "Info Penulis", icon: "i-heroicons-user-circle", category: "meta" },
  {
    type: "related-articles",
    label: "Artikel Terkait",
    icon: "i-heroicons-document-duplicate",
    category: "meta"
  },
  { type: "newsletter", label: "Newsletter", icon: "i-heroicons-envelope", category: "marketing" },
  { type: "spacer", label: "Spasi", icon: "i-heroicons-arrows-pointing-out", category: "layout" },
  { type: "columns", label: "Kolom", icon: "i-heroicons-view-columns", category: "layout" },
  {
    type: "html",
    label: "HTML Kustom",
    icon: "i-heroicons-code-bracket-square",
    category: "advanced"
  }
];
const BLOCK_CATEGORIES = [
  { id: "text", label: "Teks" },
  { id: "media", label: "Media" },
  { id: "layout", label: "Layout" },
  { id: "ui", label: "UI Elements" },
  { id: "data", label: "Data" },
  { id: "commerce", label: "E-Commerce" },
  { id: "review", label: "Review" },
  { id: "meta", label: "Meta" },
  { id: "navigation", label: "Navigasi" },
  { id: "marketing", label: "Marketing" },
  { id: "advanced", label: "Lanjutan" }
];
const STATUS_OPTIONS = [
  { value: "draft", label: "Draft", color: "neutral" },
  { value: "published", label: "Dipublikasikan", color: "success" },
  { value: "archived", label: "Diarsipkan", color: "warning" }
];
const CATEGORY_COLORS = {
  tips: "primary",
  review: "success",
  news: "info",
  guide: "warning",
  promo: "error"
};
function getStatusColor(status) {
  const option = STATUS_OPTIONS.find((s) => s.value === status);
  return option?.color || "neutral";
}
function getStatusLabel(status) {
  const option = STATUS_OPTIONS.find((s) => s.value === status);
  return option?.label || status;
}
function getCategoryColor(category) {
  return CATEGORY_COLORS[category] || "neutral";
}
function createEmptyFormData() {
  return {
    title: "",
    slug: "",
    excerpt: "",
    blocks: [],
    thumbnail: null,
    banner: null,
    thumbnailUrl: "",
    bannerUrl: "",
    category: "tips",
    tags: [],
    status: "draft",
    isFeatured: false,
    isPinned: false,
    metaTitle: "",
    metaDescription: "",
    metaKeywords: "",
    authorId: null
  };
}
function articleToFormData(article) {
  return {
    title: article.title,
    slug: article.slug,
    excerpt: article.excerpt || "",
    blocks: article.blocks,
    thumbnail: null,
    banner: null,
    thumbnailUrl: article.thumbnail || "",
    bannerUrl: article.banner || "",
    category: article.category,
    tags: article.tags,
    status: article.status,
    isFeatured: Boolean(article.isFeatured),
    isPinned: Boolean(article.isPinned),
    metaTitle: article.metaTitle || "",
    metaDescription: article.metaDescription || "",
    metaKeywords: article.metaKeywords || "",
    authorId: article.author?.id || null
  };
}

export { BLOCK_DEFINITIONS as B, articleToFormData as a, getStatusLabel as b, createEmptyFormData as c, BLOCK_CATEGORIES as d, getCategoryColor as e, getStatusColor as g };
