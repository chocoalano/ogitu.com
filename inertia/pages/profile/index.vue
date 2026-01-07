<script setup lang="ts">
/**
 * Profile Page
 * Refactored to use modular components and composables for better maintainability
 */
import { Head } from '@inertiajs/vue3'
import AppLayout from '~/layouts/default.vue'
import { useProfile } from '~/composables/use_profile'
import {
  ProfileBreadcrumb,
  ProfileHeader,
  ProfileStatsCards,
  ProfileForm,
  ProfileQuickMenu,
  ProfileTipCard,
  ProfileBackground,
  type ProfilePageProps,
  type ProfileMenuItem,
} from '~/components/profile'

const props = defineProps<ProfilePageProps>()

// Use profile composable for all business logic
const {
  isEditing,
  isSaving,
  form,
  initials,
  formatPrice,
  formatDate,
  startEditing,
  cancelEdit,
  saveProfile,
} = useProfile({ customer: props.customer })

// Menu items configuration
const menuItems: ProfileMenuItem[] = [
  { icon: 'i-heroicons-shopping-bag', label: 'Pesanan Saya', href: '/orders', color: 'text-blue-500' },
  { icon: 'i-heroicons-map-pin', label: 'Alamat', href: '/dashboard', color: 'text-emerald-500' },
  { icon: 'i-heroicons-wallet', label: 'E-Wallet', href: '/dashboard', color: 'text-purple-500' },
  { icon: 'i-heroicons-heart', label: 'Wishlist', href: '/dashboard', color: 'text-pink-500' },
  { icon: 'i-heroicons-users', label: 'Program Afiliasi', href: '/dashboard', color: 'text-orange-500' },
  { icon: 'i-heroicons-cog-6-tooth', label: 'Pengaturan', href: '/dashboard', color: 'text-gray-500' },
]

// Handle form updates
const handleFormUpdate = (newForm: typeof form.value) => {
  form.value = newForm
}

defineOptions({ layout: AppLayout })
</script>

<template>
  <Head title="Profil Saya - Ogitu" />

  <div class="min-h-screen bg-linear-to-b from-gray-50 via-white to-gray-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-900">
    <!-- Background Effects -->
    <ProfileBackground />

    <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      <!-- Breadcrumb -->
      <ProfileBreadcrumb />

      <!-- Profile Header Card -->
      <ProfileHeader
        :customer="customer"
        :current-rank="currentRank"
        :initials="initials"
        :is-editing="isEditing"
        :format-date="formatDate"
        @edit="startEditing"
      />

      <!-- Stats Cards -->
      <ProfileStatsCards
        :stats="stats"
        :wallet="wallet"
        :format-price="formatPrice"
      />

      <!-- Main Content Grid -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <!-- Profile Form -->
        <div class="lg:col-span-2">
          <ProfileForm
            :customer="customer"
            :form="form"
            :is-editing="isEditing"
            :is-saving="isSaving"
            :format-date="formatDate"
            @update:form="handleFormUpdate"
            @save="saveProfile"
            @cancel="cancelEdit"
          />
        </div>

        <!-- Sidebar -->
        <div class="lg:col-span-1 space-y-6">
          <!-- Quick Menu -->
          <ProfileQuickMenu :menu-items="menuItems" />

          <!-- Tip Card -->
          <ProfileTipCard />
        </div>
      </div>
    </div>
  </div>
</template>
