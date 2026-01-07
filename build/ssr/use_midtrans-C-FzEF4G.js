import { ref } from 'vue';

function useMidtrans() {
  const isPaymentOpen = ref(false);
  const paymentResult = ref(null);
  const paymentError = ref(null);
  const isSnapLoaded = () => {
    return typeof globalThis.window !== "undefined" && globalThis.window.snap !== void 0;
  };
  const openSnapPopup = (snapToken, options) => {
    return new Promise((resolve) => {
      if (!isSnapLoaded()) {
        const error = "Midtrans Snap belum dimuat. Silakan refresh halaman.";
        paymentError.value = error;
        resolve({ success: false, error });
        return;
      }
      isPaymentOpen.value = true;
      paymentError.value = null;
      paymentResult.value = null;
      globalThis.window.snap.pay(snapToken, {
        onSuccess: (result) => {
          console.log("Payment success:", result);
          paymentResult.value = result;
          isPaymentOpen.value = false;
          options?.onSuccess?.(result);
          resolve({ success: true, result });
        },
        onPending: (result) => {
          console.log("Payment pending:", result);
          paymentResult.value = result;
          isPaymentOpen.value = false;
          options?.onPending?.(result);
          resolve({ success: true, result });
        },
        onError: (result) => {
          console.error("Payment error:", result);
          paymentResult.value = result;
          paymentError.value = result.status_message || "Pembayaran gagal";
          isPaymentOpen.value = false;
          options?.onError?.(result);
          resolve({ success: false, result, error: paymentError.value ?? void 0 });
        },
        onClose: () => {
          console.log("Payment popup closed");
          isPaymentOpen.value = false;
          options?.onClose?.();
          if (!paymentResult.value) {
            resolve({ success: false, error: "Pembayaran dibatalkan" });
          }
        }
      });
    });
  };
  const payWithSnap = async (snapToken, options) => {
    const result = await openSnapPopup(snapToken, {
      onSuccess: async (res) => {
        console.log("Midtrans success result:", res);
        await options?.onSuccess?.(res);
      },
      onPending: async (res) => {
        console.log("Midtrans pending result:", res);
        await options?.onPending?.(res);
      },
      onError: (res) => {
        options?.onError?.(res.status_message || "Pembayaran gagal");
      },
      onClose: () => {
        options?.onClose?.();
      }
    });
    return result;
  };
  return {
    isPaymentOpen,
    paymentResult,
    paymentError,
    isSnapLoaded,
    openSnapPopup,
    payWithSnap
  };
}

export { useMidtrans as u };
