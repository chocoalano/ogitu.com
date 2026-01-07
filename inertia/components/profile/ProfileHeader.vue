<script setup lang="ts">
import type { ProfileCustomer, ProfileRank } from './types'

const props = defineProps<{
  customer: ProfileCustomer
  currentRank: ProfileRank | null
  initials: string
  isEditing: boolean
  formatDate: (date: string) => string
}>()

const emit = defineEmits<{
  edit: []
}>()
</script>

<template>
  <div class="relative bg-white dark:bg-gray-800/80 rounded-3xl border border-gray-200/80 dark:border-gray-700/50 overflow-hidden mb-8">
    <!-- Header Background with Gradient -->
    <div class="h-32 sm:h-40 bg-linear-to-r from-primary-500 via-purple-500 to-cyan-500 relative">
      <!-- Pattern Overlay -->
      <div class="absolute inset-0 opacity-20">
        <svg class="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="vape-pattern" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
              <circle cx="20" cy="20" r="2" fill="white" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#vape-pattern)" />
        </svg>
      </div>
      <!-- Smoke Effect -->
      <div class="absolute bottom-0 left-0 right-0 h-16 bg-linear-to-t from-white dark:from-gray-800/80 to-transparent" />
    </div>

    <!-- Profile Content -->
    <div class="relative px-6 sm:px-8 pb-6">
      <!-- Avatar -->
      <div class="absolute -top-16 left-6 sm:left-8">
        <div class="relative">
          <div class="w-28 h-28 sm:w-32 sm:h-32 rounded-2xl bg-linear-to-br from-primary-500 to-purple-600 p-1 shadow-xl shadow-primary-500/30">
            <div class="w-full h-full rounded-xl bg-white dark:bg-gray-800 flex items-center justify-center overflow-hidden">
              <img
                v-if="customer.avatar"
                :src="customer.avatar"
                :alt="customer.fullName"
                class="w-full h-full object-cover"
              />
              <span v-else class="text-3xl sm:text-4xl font-bold bg-linear-to-br from-primary-500 to-purple-600 bg-clip-text text-transparent">
                {{ initials }}
              </span>
            </div>
          </div>
          <!-- Verified Badge -->
          <div
            v-if="customer.isVerified"
            class="absolute -bottom-1 -right-1 w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center shadow-lg"
          >
            <UIcon name="i-heroicons-check-badge-solid" class="w-5 h-5 text-white" />
          </div>
        </div>
      </div>

      <!-- User Info -->
      <div class="pt-16 sm:pt-20 sm:ml-40">
        <div class="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
          <div>
            <div class="flex items-center gap-3 mb-1">
              <h1 class="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
                {{ customer.fullName }}
              </h1>
              <!-- Rank Badge -->
              <div
                v-if="currentRank"
                :class="['inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-medium', currentRank.color]"
              >
                <UIcon :name="currentRank.icon" class="w-4 h-4" />
                {{ currentRank.name }}
              </div>
            </div>
            <p class="text-gray-500 dark:text-gray-400">{{ customer.email }}</p>
            <p class="text-sm text-gray-400 dark:text-gray-500 mt-1">
              Bergabung sejak {{ formatDate(customer.createdAt) }}
            </p>
          </div>
          <UButton
            v-if="!isEditing"
            color="primary"
            variant="soft"
            @click="emit('edit')"
          >
            <UIcon name="i-heroicons-pencil-square" class="w-4 h-4 mr-2" />
            Edit Profil
          </UButton>
        </div>
      </div>
    </div>
  </div>
</template>
