<script setup lang="ts">
import { ref, reactive, onMounted, watch, provide, computed } from 'vue'
import { usePage } from '@inertiajs/vue3'
import ToastContainer from '~/components/ToastContainer.vue'
import { useToast } from '~/composables/use_toast'

// Admin Components (barrel import)
import {
  AdminSidebarLogo,
  AdminNavigation,
  AdminMobileNavigation,
  AdminSidebarActions,
  AdminHeader,
  AdminFooter,
  menuItems,
  type AdminData,
} from '~/components/admin'

// Toast
const toast = useToast()

// State
const sidebarOpen = ref(true)
const mobileSidebarOpen = ref(false)
const currentPath = ref('')
const expandedMenus = reactive(new Set<string>())

// Page data
const page = usePage()

// Flash messages from session
const flash = computed(() => page.props.flash as { success?: string; error?: string } | undefined)

// Watch for flash messages and show toasts
watch(
  () => flash.value,
  (newFlash) => {
    if (newFlash?.success) {
      toast.success('Berhasil', newFlash.success)
    }
    if (newFlash?.error) {
      toast.error('Gagal', newFlash.error)
    }
  },
  { immediate: true }
)

// Admin data
const admin = ref<AdminData>({
  id: 0,
  name: 'Admin',
  email: '',
  avatar: null,
  role: 'admin',
  storeName: 'Admin Panel',
  status: 'active',
  rating: 0,
  totalSales: 0,
})

// Badges for notification counts
const badges = ref<Record<string, number>>({
  orderCount: 0,
  notificationCount: 0,
})

// Provide admin data to child components
provide('currentAdmin', admin)

// Get XSRF token for forms
const getToken = () => {
  if (typeof document === 'undefined') return ''
  const match = document.cookie.match(/XSRF-TOKEN=([^;]+)/)
  return match ? decodeURIComponent(match[1]) : ''
}

// Fetch admin data from API
const fetchAdminData = async () => {
  try {
    const response = await fetch('/admin/api/me', {
      headers: { Accept: 'application/json' },
    })
    const data = await response.json()
    if (data.success && data.admin) {
      admin.value = data.admin
    }
  } catch (error) {
    console.error('Failed to fetch admin data:', error)
  }
}

// Logout handler
const logout = async () => {
  try {
    await fetch('/admin/logout', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'X-XSRF-TOKEN': getToken(),
      },
    })
    window.location.href = '/admin/login'
  } catch (error) {
    console.error('Logout error:', error)
  }
}

// Toggle handlers
const toggleSidebar = () => {
  sidebarOpen.value = !sidebarOpen.value
}

const toggleMobileSidebar = () => {
  mobileSidebarOpen.value = !mobileSidebarOpen.value
}

const toggleSubmenu = (label: string) => {
  if (expandedMenus.has(label)) {
    expandedMenus.delete(label)
  } else {
    expandedMenus.add(label)
  }
}

// Auto expand active menu on mount
const autoExpandActiveMenus = () => {
  menuItems.forEach((item) => {
    if (item.children) {
      const isActive = item.children.some((child) =>
        currentPath.value.startsWith(child.to.split('?')[0])
      )
      if (isActive) {
        expandedMenus.add(item.label)
      }
    }
  })
}

// Watch for route changes
watch(
  () => page.url,
  (newUrl) => {
    currentPath.value = newUrl?.split('?')[0] || ''
    mobileSidebarOpen.value = false
  }
)

onMounted(() => {
  currentPath.value = window.location.pathname
  fetchAdminData()
  autoExpandActiveMenus()
})
</script>

<template>
  <UApp>
    <div class="min-h-screen bg-slate-100 dark:bg-slate-950">
      <!-- Mobile Sidebar Overlay -->
      <Transition name="fade">
        <div
          v-if="mobileSidebarOpen"
          class="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
          @click="toggleMobileSidebar"
        />
      </Transition>

      <!-- Mobile Sidebar -->
      <Transition name="slide">
        <aside
          v-if="mobileSidebarOpen"
          class="fixed inset-y-0 left-0 w-72 bg-linear-to-b from-slate-900 via-slate-900 to-slate-800 z-50 lg:hidden flex flex-col"
        >
          <AdminSidebarLogo :sidebar-open="true" @toggle-sidebar="toggleMobileSidebar" />
          <AdminMobileNavigation
            :menu-items="menuItems"
            :current-path="currentPath"
            :badges="badges"
          />
          <AdminSidebarActions :sidebar-open="true" @logout="logout" />
        </aside>
      </Transition>

      <!-- Desktop Sidebar -->
      <aside
        class="fixed inset-y-0 left-0 hidden lg:flex flex-col bg-linear-to-b from-slate-900 via-slate-900 to-slate-800 border-r border-slate-700/50 transition-all duration-300 z-30"
        :class="sidebarOpen ? 'w-72' : 'w-20'"
      >
        <AdminSidebarLogo :sidebar-open="sidebarOpen" @toggle-sidebar="toggleSidebar" />
        <AdminNavigation
          :menu-items="menuItems"
          :sidebar-open="sidebarOpen"
          :current-path="currentPath"
          :badges="badges"
          :expanded-menus="expandedMenus"
          @toggle-submenu="toggleSubmenu"
        />
        <AdminSidebarActions :sidebar-open="sidebarOpen" @logout="logout" />
      </aside>

      <!-- Main Content Area -->
      <div
        class="transition-all duration-300"
        :class="sidebarOpen ? 'lg:ml-72' : 'lg:ml-20'"
      >
        <AdminHeader
          :admin="admin"
          :sidebar-open="sidebarOpen"
          @toggle-sidebar="toggleSidebar"
          @toggle-mobile-sidebar="toggleMobileSidebar"
          @logout="logout"
        />

        <!-- Page Content (slot) -->
        <main class="p-4 lg:p-6 min-h-[calc(100vh-130px)]">
          <slot />
        </main>

        <AdminFooter />
      </div>
    </div>

    <ToastContainer />
  </UApp>
</template>

<style scoped>
.slide-enter-active,
.slide-leave-active {
  transition: transform 0.3s ease;
}
.slide-enter-from,
.slide-leave-to {
  transform: translateX(-100%);
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
