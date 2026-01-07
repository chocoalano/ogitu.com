import { Transmit } from '@adonisjs/transmit-client';
import { ref, onMounted, onUnmounted } from 'vue';

let transmitInstance = null;
function getTransmitInstance() {
  if (!transmitInstance) {
    transmitInstance = new Transmit({
      baseUrl: typeof globalThis.window !== "undefined" ? globalThis.window.location.origin : ""
    });
  }
  return transmitInstance;
}
function useAdminNotifications() {
  const notifications = ref([]);
  const unreadCount = ref(0);
  const isConnected = ref(false);
  let subscription = null;
  const connect = async () => {
    if (subscription) return;
    const transmit = getTransmitInstance();
    const channel = "admin/notifications";
    try {
      subscription = transmit.subscription(channel);
      await subscription.create();
      subscription.onMessage((message) => {
        if (message.event === "new_notification") {
          notifications.value.unshift({
            id: message.id,
            type: message.type,
            title: message.title,
            message: message.message,
            data: null,
            isRead: message.isRead,
            createdAt: message.createdAt,
            icon: message.icon,
            color: message.color
          });
          if (!message.isRead) {
            unreadCount.value++;
          }
        }
      });
      isConnected.value = true;
    } catch (error) {
      console.error("Failed to connect to admin notifications channel:", error);
      isConnected.value = false;
    }
  };
  const disconnect = async () => {
    if (subscription) {
      await subscription.delete();
      subscription = null;
      isConnected.value = false;
    }
  };
  onMounted(() => {
    connect();
  });
  onUnmounted(() => {
    disconnect();
  });
  return {
    notifications,
    unreadCount,
    isConnected,
    connect,
    disconnect,
    setNotifications: (data) => {
      notifications.value = data;
    },
    setUnreadCount: (count) => {
      unreadCount.value = count;
    },
    markAsRead: (id) => {
      const notification = notifications.value.find((n) => n.id === id);
      if (notification && !notification.isRead) {
        notification.isRead = true;
        notification.readAt = (/* @__PURE__ */ new Date()).toISOString();
        unreadCount.value = Math.max(0, unreadCount.value - 1);
      }
    },
    markAllAsRead: () => {
      notifications.value.forEach((n) => {
        if (!n.isRead) {
          n.isRead = true;
          n.readAt = (/* @__PURE__ */ new Date()).toISOString();
        }
      });
      unreadCount.value = 0;
    },
    removeNotification: (id) => {
      const index = notifications.value.findIndex((n) => n.id === id);
      if (index !== -1) {
        const notification = notifications.value[index];
        if (!notification.isRead) {
          unreadCount.value = Math.max(0, unreadCount.value - 1);
        }
        notifications.value.splice(index, 1);
      }
    }
  };
}
function useAdminReviews() {
  const isConnected = ref(false);
  const lastReplyUpdate = ref(null);
  let subscription = null;
  const onReplyCallbacks = [];
  const connect = async () => {
    if (subscription) return;
    const transmit = getTransmitInstance();
    const channel = "admin/reviews";
    try {
      subscription = transmit.subscription(channel);
      await subscription.create();
      subscription.onMessage((message) => {
        if (message.event === "review_replied") {
          lastReplyUpdate.value = message;
          onReplyCallbacks.forEach((cb) => cb(message));
        }
      });
      isConnected.value = true;
    } catch (error) {
      console.error("Failed to connect to admin reviews channel:", error);
      isConnected.value = false;
    }
  };
  const disconnect = async () => {
    if (subscription) {
      await subscription.delete();
      subscription = null;
      isConnected.value = false;
    }
  };
  const onReplyReceived = (callback) => {
    onReplyCallbacks.push(callback);
    return () => {
      const index = onReplyCallbacks.indexOf(callback);
      if (index > -1) {
        onReplyCallbacks.splice(index, 1);
      }
    };
  };
  onMounted(() => {
    connect();
  });
  onUnmounted(() => {
    disconnect();
    onReplyCallbacks.length = 0;
  });
  return {
    isConnected,
    lastReplyUpdate,
    connect,
    disconnect,
    onReplyReceived
  };
}

export { useAdminReviews as a, useAdminNotifications as u };
