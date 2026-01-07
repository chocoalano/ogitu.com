const withdrawalStatusOptions = [
  { label: "Semua Status", value: "all" },
  { label: "Menunggu", value: "pending" },
  { label: "Selesai", value: "completed" },
  { label: "Gagal", value: "failed" },
  { label: "Dibatalkan", value: "cancelled" }
];
const transactionTypeOptions = [
  { label: "Semua Tipe", value: "all" },
  { label: "Top Up", value: "topup" },
  { label: "Penarikan", value: "withdrawal" },
  { label: "Komisi", value: "commission" },
  { label: "Pembayaran", value: "payment" },
  { label: "Refund", value: "refund" },
  { label: "Cashback", value: "cashback" }
];
const transactionStatusOptions = [
  { label: "Semua Status", value: "all" },
  { label: "Menunggu", value: "pending" },
  { label: "Selesai", value: "completed" },
  { label: "Gagal", value: "failed" },
  { label: "Dibatalkan", value: "cancelled" }
];
const formatCurrency = (amount) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0
  }).format(amount);
};
const formatDate = (dateStr) => {
  return new Date(dateStr).toLocaleDateString("id-ID", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit"
  });
};

export { transactionStatusOptions as a, formatDate as b, formatCurrency as f, transactionTypeOptions as t, withdrawalStatusOptions as w };
