import { ref, computed } from 'vue';
import { router } from '@inertiajs/vue3';

function useOrders(options) {
  const { orders, pagination, filters, statusOptions } = options;
  const selectedStatus = ref(filters.status);
  const isLoading = ref(false);
  const hasOrders = computed(() => orders.length > 0);
  const hasPagination = computed(() => pagination.lastPage > 1);
  const statusOptionsWithIcons = computed(() => {
    const icons = {
      all: "i-heroicons-squares-2x2",
      pending_payment: "i-heroicons-clock",
      paid: "i-heroicons-check-circle",
      processing: "i-heroicons-cog-6-tooth",
      shipped: "i-heroicons-truck",
      delivered: "i-heroicons-check-badge",
      cancelled: "i-heroicons-x-circle"
    };
    return statusOptions.map((opt) => ({
      ...opt,
      icon: icons[opt.value] || "i-heroicons-tag"
    }));
  });
  const filterByStatus = (status) => {
    if (isLoading.value) return;
    selectedStatus.value = status;
    isLoading.value = true;
    router.get(
      "/orders",
      { status: status !== "all" ? status : void 0 },
      {
        preserveState: true,
        preserveScroll: true,
        onFinish: () => {
          isLoading.value = false;
        }
      }
    );
  };
  const goToPage = (page) => {
    if (isLoading.value) return;
    isLoading.value = true;
    router.get(
      "/orders",
      {
        page,
        status: selectedStatus.value !== "all" ? selectedStatus.value : void 0
      },
      {
        preserveState: true,
        preserveScroll: true,
        onFinish: () => {
          isLoading.value = false;
        }
      }
    );
  };
  const refreshOrders = () => {
    isLoading.value = true;
    router.reload({
      only: ["orders", "pagination"],
      onFinish: () => {
        isLoading.value = false;
      }
    });
  };
  return {
    // State
    selectedStatus,
    isLoading,
    // Computed
    hasOrders,
    hasPagination,
    statusOptionsWithIcons,
    // Methods
    filterByStatus,
    goToPage,
    refreshOrders
  };
}
function useOrderFormatters() {
  const formatPrice = (price) => {
    const numPrice = Number(price) || 0;
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0
    }).format(numPrice);
  };
  const formatDate = (dateStr) => {
    if (!dateStr) return "-";
    return new Date(dateStr).toLocaleDateString("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    });
  };
  const formatShortDate = (dateStr) => {
    if (!dateStr) return "-";
    return new Date(dateStr).toLocaleDateString("id-ID", {
      day: "numeric",
      month: "short",
      year: "numeric"
    });
  };
  const formatRelativeTime = (dateStr) => {
    if (!dateStr) return "-";
    const date = new Date(dateStr);
    const now = /* @__PURE__ */ new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffDays = Math.floor(diffMs / (1e3 * 60 * 60 * 24));
    if (diffDays === 0) return "Hari ini";
    if (diffDays === 1) return "Kemarin";
    if (diffDays < 7) return `${diffDays} hari lalu`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} minggu lalu`;
    if (diffDays < 365) return `${Math.floor(diffDays / 30)} bulan lalu`;
    return `${Math.floor(diffDays / 365)} tahun lalu`;
  };
  return {
    formatPrice,
    formatDate,
    formatShortDate,
    formatRelativeTime
  };
}
function useOrderActions() {
  const isProcessing = ref(false);
  const error = ref(null);
  const getXsrfToken = () => {
    if (typeof document === "undefined") return null;
    const match = document.cookie.match(/XSRF-TOKEN=([^;]+)/);
    return match ? decodeURIComponent(match[1]) : null;
  };
  const cancelOrder = async (orderId) => {
    isProcessing.value = true;
    error.value = null;
    try {
      const xsrfToken = getXsrfToken();
      const response = await fetch(`/api/orders/${orderId}/cancel`, {
        method: "POST",
        headers: {
          "X-Requested-With": "XMLHttpRequest",
          ...xsrfToken && { "X-XSRF-TOKEN": xsrfToken }
        },
        credentials: "include"
      });
      const result = await response.json();
      if (!result.success) {
        error.value = result.message || "Gagal membatalkan pesanan";
      }
      return { success: result.success, message: result.message || "" };
    } catch (err) {
      error.value = "Terjadi kesalahan jaringan";
      return { success: false, message: error.value };
    } finally {
      isProcessing.value = false;
    }
  };
  const confirmReceived = async (orderId) => {
    isProcessing.value = true;
    error.value = null;
    try {
      const xsrfToken = getXsrfToken();
      const response = await fetch(`/api/orders/${orderId}/confirm-received`, {
        method: "POST",
        headers: {
          "X-Requested-With": "XMLHttpRequest",
          ...xsrfToken && { "X-XSRF-TOKEN": xsrfToken }
        },
        credentials: "include"
      });
      const result = await response.json();
      if (!result.success) {
        error.value = result.message || "Gagal konfirmasi pesanan";
      }
      return { success: result.success, message: result.message || "" };
    } catch (err) {
      error.value = "Terjadi kesalahan jaringan";
      return { success: false, message: error.value };
    } finally {
      isProcessing.value = false;
    }
  };
  const payOrder = async (orderId) => {
    isProcessing.value = true;
    error.value = null;
    try {
      const xsrfToken = getXsrfToken();
      const response = await fetch(`/api/orders/${orderId}/pay`, {
        method: "POST",
        headers: {
          "X-Requested-With": "XMLHttpRequest",
          ...xsrfToken && { "X-XSRF-TOKEN": xsrfToken }
        },
        credentials: "include"
      });
      const result = await response.json();
      if (!result.success) {
        error.value = result.message || "Gagal memproses pembayaran";
        return { success: false, message: error.value };
      }
      return {
        success: true,
        message: "Token pembayaran berhasil dibuat",
        snapToken: result.data?.snapToken,
        redirectUrl: result.data?.redirectUrl
      };
    } catch (err) {
      error.value = "Terjadi kesalahan jaringan";
      return { success: false, message: error.value };
    } finally {
      isProcessing.value = false;
    }
  };
  const verifyPayment = async (orderId, transactionStatus, transactionId) => {
    try {
      const xsrfToken = getXsrfToken();
      const response = await fetch(`/api/orders/${orderId}/verify-payment`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Requested-With": "XMLHttpRequest",
          ...xsrfToken && { "X-XSRF-TOKEN": xsrfToken }
        },
        credentials: "include",
        body: JSON.stringify({ transactionStatus, transactionId })
      });
      const result = await response.json();
      if (!result.success) {
        return { success: false, message: result.message || "Gagal memverifikasi pembayaran" };
      }
      return {
        success: true,
        message: result.message || "",
        orderStatus: result.data?.orderStatus,
        paymentStatus: result.data?.paymentStatus
      };
    } catch (err) {
      return { success: false, message: "Terjadi kesalahan jaringan" };
    }
  };
  return {
    isProcessing,
    error,
    cancelOrder,
    confirmReceived,
    payOrder,
    verifyPayment
  };
}

export { useOrderActions as a, useOrders as b, useOrderFormatters as u };
