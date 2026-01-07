const periodOptions = [
  { label: "7 Hari Terakhir", value: "7days" },
  { label: "30 Hari Terakhir", value: "30days" },
  { label: "90 Hari Terakhir", value: "90days" },
  { label: "1 Tahun Terakhir", value: "year" },
  { label: "Custom", value: "custom" }
];
const sortByOptions = [
  { label: "Terjual Terbanyak", value: "totalSold" },
  { label: "Rating Tertinggi", value: "rating" },
  { label: "Dilihat Terbanyak", value: "viewCount" },
  { label: "Stok Terendah", value: "stock" }
];
const formatCurrency = (amount) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0
  }).format(amount);
};
const formatNumber = (num) => {
  return new Intl.NumberFormat("id-ID").format(num);
};
const formatDate = (dateStr) => {
  return new Date(dateStr).toLocaleDateString("id-ID", {
    day: "numeric",
    month: "short",
    year: "numeric"
  });
};
const formatPercent = (num) => {
  const sign = num >= 0 ? "+" : "";
  return `${sign}${num.toFixed(1)}%`;
};
const orderStatusLabels = {
  pending_payment: "Menunggu Pembayaran",
  paid: "Dibayar",
  processing: "Diproses",
  shipped: "Dikirim",
  delivered: "Selesai",
  cancelled: "Dibatalkan"
};
const orderStatusColors = {
  pending_payment: "warning",
  paid: "success",
  processing: "info",
  shipped: "primary",
  delivered: "success",
  cancelled: "error"
};

export { formatNumber as a, formatPercent as b, formatDate as c, orderStatusColors as d, formatCurrency as f, orderStatusLabels as o, periodOptions as p, sortByOptions as s };
