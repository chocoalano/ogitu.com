const statusConfig = {
  active: { label: "Aktif", color: "success" },
  draft: { label: "Draft", color: "neutral" },
  inactive: { label: "Nonaktif", color: "warning" },
  out_of_stock: { label: "Stok Habis", color: "error" }
};
const conditionConfig = {
  new: { label: "Baru", color: "success" },
  used: { label: "Bekas", color: "neutral" }
};
function getStatusConfig(status) {
  return statusConfig[status] || { label: status, color: "neutral" };
}
function getConditionConfig(condition) {
  return conditionConfig[condition] || { label: condition, color: "neutral" };
}
function formatPrice(price) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(price);
}
function formatNumber(num) {
  return new Intl.NumberFormat("id-ID").format(num);
}

export { formatPrice as a, getStatusConfig as b, formatNumber as f, getConditionConfig as g };
