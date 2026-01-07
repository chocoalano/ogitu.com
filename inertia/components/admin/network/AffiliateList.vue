<script setup lang="ts">
import type { Affiliate } from './types'

interface Props {
  affiliates: Affiliate[]
  selectedAffiliateId?: number | null
}

interface Emits {
  (e: 'select', affiliate: Affiliate): void
  (e: 'viewTree', affiliate: Affiliate): void
  (e: 'setupReferralCodes', affiliate: Affiliate): void
  (e: 'addMember', affiliate: Affiliate): void
}

defineProps<Props>()
defineEmits<Emits>()
</script>

<template>
  <div
    class="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden"
  >
    <div class="px-4 py-3 border-b border-slate-200 dark:border-slate-800">
      <h2 class="text-lg font-semibold text-slate-900 dark:text-white">Daftar Affiliate</h2>
      <p class="text-sm text-slate-500 dark:text-slate-400">
        Pilih affiliate untuk mengelola tree network
      </p>
    </div>

    <div class="divide-y divide-slate-200 dark:divide-slate-800 max-h-125 overflow-y-auto">
      <div
        v-for="affiliate in affiliates"
        :key="affiliate.id"
        class="p-4 hover:bg-slate-50 dark:hover:bg-slate-800/50 cursor-pointer transition-colors"
        :class="{ 'bg-violet-50 dark:bg-violet-500/10': selectedAffiliateId === affiliate.id }"
        @click="$emit('select', affiliate)"
      >
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-3">
            <div
              class="w-10 h-10 rounded-full bg-violet-500/10 flex items-center justify-center overflow-hidden"
            >
              <img
                v-if="affiliate.customerAvatar"
                :src="affiliate.customerAvatar"
                :alt="affiliate.customerName"
                class="w-full h-full object-cover"
              />
              <UIcon v-else name="i-heroicons-user" class="w-5 h-5 text-violet-500" />
            </div>
            <div>
              <p class="font-medium text-slate-900 dark:text-white">{{ affiliate.customerName }}</p>
              <p class="text-sm text-slate-500 dark:text-slate-400">{{ affiliate.referralCode }}</p>
            </div>
          </div>
          <div class="flex items-center gap-2">
            <UBadge color="primary" variant="subtle" size="xs">
              {{ affiliate.totalReferrals }} referral
            </UBadge>
            <UButton
              icon="i-heroicons-user-plus"
              color="primary"
              variant="ghost"
              size="xs"
              title="Tambah Member ke Tree"
              @click.stop="$emit('addMember', affiliate)"
            />
            <UButton
              icon="i-heroicons-sparkles"
              color="violet"
              variant="ghost"
              size="xs"
              title="Setup Kode Referral"
              @click.stop="$emit('setupReferralCodes', affiliate)"
            />
            <UButton
              icon="i-heroicons-eye"
              color="neutral"
              variant="ghost"
              size="xs"
              title="Lihat Tree"
              @click.stop="$emit('viewTree', affiliate)"
            />
          </div>
        </div>
      </div>

      <div v-if="affiliates.length === 0" class="p-8 text-center">
        <UIcon
          name="i-heroicons-user-group"
          class="w-12 h-12 text-slate-300 dark:text-slate-600 mx-auto mb-4"
        />
        <p class="text-slate-500 dark:text-slate-400">Belum ada affiliate</p>
      </div>
    </div>
  </div>
</template>
