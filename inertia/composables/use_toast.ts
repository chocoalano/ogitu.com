import { ref } from 'vue'

export interface Toast {
  id: number
  type: 'success' | 'error' | 'warning' | 'info'
  title: string
  message?: string
  duration?: number
}

const toasts = ref<Toast[]>([])
let toastId = 0

export function useToast() {
  const addToast = (toast: Omit<Toast, 'id'>) => {
    const id = ++toastId
    const duration = toast.duration ?? 5000

    toasts.value.push({ ...toast, id })

    if (duration > 0) {
      setTimeout(() => {
        removeToast(id)
      }, duration)
    }

    return id
  }

  const removeToast = (id: number) => {
    const index = toasts.value.findIndex((t) => t.id === id)
    if (index > -1) {
      toasts.value.splice(index, 1)
    }
  }

  const success = (title: string, message?: string, duration?: number) => {
    return addToast({ type: 'success', title, message, duration })
  }

  const error = (title: string, message?: string, duration?: number) => {
    return addToast({ type: 'error', title, message, duration })
  }

  const warning = (title: string, message?: string, duration?: number) => {
    return addToast({ type: 'warning', title, message, duration })
  }

  const info = (title: string, message?: string, duration?: number) => {
    return addToast({ type: 'info', title, message, duration })
  }

  const clearAll = () => {
    toasts.value = []
  }

  return {
    toasts,
    addToast,
    removeToast,
    success,
    error,
    warning,
    info,
    clearAll,
  }
}
