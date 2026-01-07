<script setup lang="ts">
import type { PropType } from 'vue'
import CartDropdown from '~/components/CartDropdown.vue'
import WishlistDropdown from '~/components/WishlistDropdown.vue'

interface User {
  id: number
  fullName: string
  email: string
  avatar?: string | null
}

const props = defineProps({
  isLoggedIn: { type: Boolean, default: false },
  user: { type: Object as PropType<User | null>, default: null },
  userMenuItems: { type: Array as PropType<any[]>, default: () => [] }
})

const emit = defineEmits<{ (e: 'logout'): void }>()
</script>

<template>
  <!-- Cart Dropdown -->
  <CartDropdown :is-logged-in="isLoggedIn" />

  <!-- Wishlist Dropdown -->
  <WishlistDropdown :is-logged-in="isLoggedIn" />

  <!-- Color Mode (desktop) -->
  <UColorModeButton color="neutral" variant="ghost" class="hidden md:flex" />

  <!-- User Menu / Auth (desktop) -->
  <template v-if="isLoggedIn">
    <UDropdownMenu :items="userMenuItems" :ui="{ content: 'z-[200]' }" class="hidden md:flex">
      <UButton color="neutral" variant="ghost" class="gap-2">
        <UAvatar :src="user?.avatar || undefined" :alt="user?.fullName || 'User'" size="sm" />
        <span class="hidden lg:inline font-medium">{{ user?.fullName || 'User' }}</span>
        <UIcon name="i-heroicons-chevron-down" class="w-4 h-4" />
      </UButton>
    </UDropdownMenu>
  </template>
  <template v-else>
    <div class="hidden md:flex items-center gap-2">
      <UButton to="/login" color="neutral" variant="outline" size="sm">Masuk</UButton>
      <UButton to="/register" color="primary" size="sm">Daftar</UButton>
    </div>
  </template>
</template>
