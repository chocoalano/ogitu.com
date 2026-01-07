const CATEGORY_COLORS = {
  tips: "primary",
  review: "success",
  news: "info",
  guide: "warning",
  promo: "error"
};
function formatDate(date) {
  if (!date) return "";
  return new Date(date).toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric"
  });
}
function formatCount(count) {
  if (count >= 1e6) return `${(count / 1e6).toFixed(1)}M`;
  if (count >= 1e3) return `${(count / 1e3).toFixed(1)}K`;
  return count.toString();
}

export { CATEGORY_COLORS as C, formatCount as a, formatDate as f };
