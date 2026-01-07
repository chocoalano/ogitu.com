<script setup lang="ts">
import { ref } from 'vue'
import { router } from '@inertiajs/vue3'
import ReviewStars from './ReviewStars.vue'
import type { Review } from '~/types/review'

const props = defineProps<{
  review: Review
}>()

const showReplyModal = ref(false)
const replyText = ref(props.review.adminReply || '')
const isSubmitting = ref(false)
const showImageModal = ref(false)
const selectedImage = ref('')

const formatDate = (dateStr: string) => {
  return new Date(dateStr).toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

const openImageModal = (image: string) => {
  selectedImage.value = image
  showImageModal.value = true
}

const approveReview = () => {
  router.patch(`/admin/reviews/${props.review.id}/approve`, {}, {
    preserveScroll: true,
  })
}

const submitReply = () => {
  if (!replyText.value.trim()) return

  isSubmitting.value = true
  router.post(
    `/admin/reviews/${props.review.id}/reply`,
    { reply: replyText.value },
    {
      preserveScroll: true,
      onFinish: () => {
        isSubmitting.value = false
        showReplyModal.value = false
      },
    }
  )
}

const deleteReply = () => {
  router.delete(`/admin/reviews/${props.review.id}/reply`, {
    preserveScroll: true,
  })
}
</script>

<template>
  <div class="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
    <div class="p-4 sm:p-6">
      <!-- Header -->
      <div class="flex flex-col sm:flex-row sm:items-start gap-4">
        <!-- Product Info -->
        <div class="flex items-center gap-3 flex-1 min-w-0">
          <img
            :src="review.product.image"
            :alt="review.product.name"
            class="w-14 h-14 rounded-lg object-cover bg-gray-100 dark:bg-gray-700 shrink-0"
          />
          <div class="min-w-0">
            <p class="font-medium text-gray-900 dark:text-white truncate">
              {{ review.product.name }}
            </p>
            <p class="text-sm text-gray-500 dark:text-gray-400">
              SKU: {{ review.product.sku }}
            </p>
          </div>
        </div>

        <!-- Status Badges -->
        <div class="flex items-center gap-2 shrink-0">
          <UBadge v-if="review.isVerifiedPurchase" color="success" variant="soft" size="xs">
            <UIcon name="i-heroicons-check-badge" class="w-3 h-3 mr-1" />
            Terverifikasi
          </UBadge>
          <UBadge
            :color="review.isApproved ? 'success' : 'warning'"
            variant="soft"
            size="xs"
          >
            {{ review.isApproved ? 'Disetujui' : 'Menunggu' }}
          </UBadge>
        </div>
      </div>

      <!-- Divider -->
      <div class="my-4 border-t border-gray-200 dark:border-gray-700" />

      <!-- Review Content -->
      <div class="space-y-3">
        <!-- Customer & Rating -->
        <div class="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
          <div class="flex items-center gap-2">
            <UAvatar
              :src="review.customer.avatar || undefined"
              :alt="review.customer.name"
              size="sm"
            />
            <span class="font-medium text-gray-900 dark:text-white">
              {{ review.customer.name }}
            </span>
          </div>
          <div class="flex items-center gap-2">
            <ReviewStars :rating="review.rating" size="sm" />
            <span class="text-sm text-gray-500 dark:text-gray-400">
              {{ formatDate(review.createdAt) }}
            </span>
          </div>
        </div>

        <!-- Comment -->
        <p v-if="review.comment" class="text-gray-700 dark:text-gray-300 whitespace-pre-wrap">
          {{ review.comment }}
        </p>
        <p v-else class="text-gray-400 dark:text-gray-500 italic">
          Tidak ada komentar
        </p>

        <!-- Images -->
        <div v-if="review.images && review.images.length > 0" class="flex flex-wrap gap-2">
          <button
            v-for="(image, index) in review.images"
            :key="index"
            class="relative group"
            @click="openImageModal(image)"
          >
            <img
              :src="image"
              :alt="`Review image ${index + 1}`"
              class="w-16 h-16 rounded-lg object-cover bg-gray-100 dark:bg-gray-700 cursor-pointer hover:opacity-80 transition-opacity"
            />
            <div class="absolute inset-0 flex items-center justify-center bg-black/50 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity">
              <UIcon name="i-heroicons-magnifying-glass-plus" class="w-5 h-5 text-white" />
            </div>
          </button>
        </div>

        <!-- Order Info -->
        <div v-if="review.order" class="text-sm text-gray-500 dark:text-gray-400">
          Order: #{{ review.order.orderNumber }}
        </div>
      </div>

      <!-- Admin Reply -->
      <div v-if="review.adminReply" class="mt-4 p-4 rounded-lg bg-primary-50 dark:bg-primary-900/20 border border-primary-200 dark:border-primary-800">
        <div class="flex items-start justify-between gap-2">
          <div class="flex items-center gap-2 mb-2">
            <UIcon name="i-heroicons-chat-bubble-left-right" class="w-4 h-4 text-primary-600 dark:text-primary-400" />
            <span class="text-sm font-medium text-primary-700 dark:text-primary-300">Balasan Anda</span>
            <span v-if="review.adminRepliedAt" class="text-xs text-primary-500 dark:text-primary-400">
              {{ formatDate(review.adminRepliedAt) }}
            </span>
          </div>
          <UButton
            size="xs"
            color="error"
            variant="ghost"
            icon="i-heroicons-trash"
            @click="deleteReply"
          />
        </div>
        <p class="text-sm text-primary-700 dark:text-primary-300 whitespace-pre-wrap">
          {{ review.adminReply }}
        </p>
      </div>

      <!-- Actions -->
      <div class="mt-4 flex flex-wrap items-center gap-2">
        <UButton
          v-if="!review.isApproved"
          size="sm"
          color="success"
          variant="soft"
          icon="i-heroicons-check"
          @click="approveReview"
        >
          Setujui
        </UButton>
        <UButton
          v-if="!review.adminReply"
          size="sm"
          color="primary"
          variant="soft"
          icon="i-heroicons-chat-bubble-left-right"
          @click="showReplyModal = true"
        >
          Balas
        </UButton>
        <UButton
          v-else
          size="sm"
          color="neutral"
          variant="soft"
          icon="i-heroicons-pencil"
          @click="showReplyModal = true"
        >
          Edit Balasan
        </UButton>
      </div>
    </div>

    <!-- Reply Modal -->
    <UModal
      v-model:open="showReplyModal"
      :title="review.adminReply ? 'Edit Balasan' : 'Balas Review'"
      :description="`Balas review dari ${review.customer.name}`"
      :ui="{ overlay: 'z-[100]', content: 'z-[100]' }"
    >
      <template #content>
        <div class="p-6 max-h-[85vh] overflow-y-auto">
          <div class="mb-4 p-3 rounded-lg bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
            <div class="flex items-center gap-2 mb-2">
              <ReviewStars :rating="review.rating" size="sm" />
              <span class="text-sm text-gray-500 dark:text-gray-400">
                oleh {{ review.customer.name }}
              </span>
            </div>
            <p class="text-sm text-gray-600 dark:text-gray-400 line-clamp-3">
              {{ review.comment || 'Tidak ada komentar' }}
            </p>
          </div>

          <UFormField label="Balasan Anda">
            <UTextarea
              v-model="replyText"
              placeholder="Tulis balasan untuk review ini..."
              :rows="4"
              class="w-full"
            />
          </UFormField>

          <div class="mt-6 flex justify-end gap-3">
            <UButton color="neutral" variant="ghost" @click="showReplyModal = false">
              Batal
            </UButton>
            <UButton
              color="primary"
              :loading="isSubmitting"
              :disabled="!replyText.trim()"
              @click="submitReply"
            >
              Simpan Balasan
            </UButton>
          </div>
        </div>
      </template>
    </UModal>

    <!-- Image Modal -->
    <UModal
      v-model:open="showImageModal"
      title="Gambar Review"
      description="Lihat gambar review dalam ukuran penuh"
      :ui="{ overlay: 'z-[100]', content: 'z-[100]', width: 'max-w-4xl' }"
    >
      <template #content>
        <div class="p-2 max-h-[85vh] overflow-y-auto">
          <img
            :src="selectedImage"
            alt="Review image"
            class="max-w-full max-h-[80vh] object-contain rounded-lg"
          />
        </div>
      </template>
    </UModal>
  </div>
</template>
