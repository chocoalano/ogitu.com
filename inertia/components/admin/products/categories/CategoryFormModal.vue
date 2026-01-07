<script setup lang="ts">
import { ref, watch, computed } from 'vue'
import type { Category, ParentCategory, CategoryFormData } from './types'
import { useImageHelper } from '~/composables/use_image_helper'

interface Props {
  open: boolean
  category?: Category | null
  parentCategories: ParentCategory[]
  isSubmitting: boolean
}

const props = defineProps<Props>()

const emit = defineEmits<{
  (e: 'update:open', value: boolean): void
  (e: 'submit', data: FormData): void
}>()

const { isValidImageUrl } = useImageHelper()

// Form state
const form = ref<CategoryFormData>({
  name: '',
  description: '',
  parentId: null,
  isActive: true,
  image: null,
})

// Image preview
const imagePreview = ref<string | null>(null)
const fileInputRef = ref<HTMLInputElement | null>(null)

// Computed
const isEditing = computed(() => !!props.category)
const modalTitle = computed(() => isEditing.value ? 'Edit Kategori' : 'Tambah Kategori Baru')

// Parent options (exclude current category when editing)
const parentOptions = computed(() => {
  const options: { label: string; value: number | null }[] = [
    { label: 'Tidak ada (Kategori Utama)', value: null },
  ]

  props.parentCategories.forEach((cat) => {
    // Don't allow setting itself as parent
    if (!props.category || cat.id !== props.category.id) {
      options.push({ label: cat.name, value: cat.id })
    }
  })

  return options
})

// Reset form when modal opens/closes or category changes
watch(
  () => [props.open, props.category],
  () => {
    if (props.open) {
      if (props.category) {
        // Edit mode - populate form
        form.value = {
          name: props.category.name,
          description: props.category.description || '',
          parentId: props.category.parentId,
          isActive: props.category.isActive,
          image: null,
        }
        imagePreview.value = isValidImageUrl(props.category.image) ? props.category.image : null
      } else {
        // Create mode - reset form
        form.value = {
          name: '',
          description: '',
          parentId: null,
          isActive: true,
          image: null,
        }
        imagePreview.value = null
      }
    }
  },
  { immediate: true }
)

// Handle file selection
const handleFileSelect = (event: Event) => {
  const input = event.target as HTMLInputElement
  const file = input.files?.[0]

  if (file) {
    form.value.image = file

    // Create preview URL
    const reader = new FileReader()
    reader.onload = (e) => {
      imagePreview.value = e.target?.result as string
    }
    reader.readAsDataURL(file)
  }
}

// Trigger file input
const triggerFileInput = () => {
  fileInputRef.value?.click()
}

// Remove image
const removeImage = () => {
  form.value.image = null
  imagePreview.value = null
  if (fileInputRef.value) {
    fileInputRef.value.value = ''
  }
}

// Submit form
const handleSubmit = () => {
  if (!form.value.name.trim()) {
    return
  }

  const formData = new FormData()
  formData.append('name', form.value.name.trim())
  formData.append('description', form.value.description.trim())
  formData.append('parentId', form.value.parentId?.toString() || '')
  formData.append('isActive', form.value.isActive ? 'true' : 'false')

  if (form.value.image) {
    formData.append('image', form.value.image)
  }

  emit('submit', formData)
}

// Close modal
const closeModal = () => {
  emit('update:open', false)
}
</script>

<template>
  <UModal
    :open="open"
    @update:open="closeModal"
    :title="modalTitle"
    description="Isi informasi kategori produk"
  >
    <template #content>
      <div class="p-6">
        <!-- Header -->
        <div class="flex items-center gap-4 mb-6">
          <div class="w-12 h-12 rounded-full bg-violet-100 dark:bg-violet-900/30 flex items-center justify-center">
            <UIcon :name="isEditing ? 'i-heroicons-pencil-square' : 'i-heroicons-folder-plus'" class="w-6 h-6 text-violet-500" />
          </div>
          <div>
            <h3 class="text-lg font-semibold text-slate-900 dark:text-white">{{ modalTitle }}</h3>
            <p class="text-sm text-slate-500 dark:text-slate-400">
              {{ isEditing ? 'Perbarui informasi kategori' : 'Tambahkan kategori baru untuk produk' }}
            </p>
          </div>
        </div>

        <!-- Form -->
        <UForm @submit.prevent="handleSubmit" class="space-y-4">
          <!-- Name -->
          <div>
            <label class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
              Nama Kategori <span class="text-red-500">*</span>
            </label>
            <UInput
              v-model="form.name"
              placeholder="Masukkan nama kategori"
              :disabled="isSubmitting"
              class="w-full"
            />
          </div>

          <!-- Parent Category -->
          <div>
            <label class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
              Kategori Induk
            </label>
            <USelect
              v-model="form.parentId"
              :items="parentOptions"
              value-key="value"
              placeholder="Pilih kategori induk"
              :disabled="isSubmitting"
              class="w-full"
            />
            <p class="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Kosongkan untuk membuat kategori utama
            </p>
          </div>

          <!-- Description -->
          <div>
            <label class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
              Deskripsi
            </label>
            <UTextarea
              v-model="form.description"
              placeholder="Deskripsi singkat kategori (opsional)"
              :rows="3"
              :disabled="isSubmitting"
              class="w-full"
            />
          </div>

          <!-- Image Upload -->
          <div>
            <label class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
              Gambar Kategori
            </label>

            <input
              ref="fileInputRef"
              type="file"
              accept="image/jpeg,image/png,image/webp,image/gif"
              class="hidden"
              @change="handleFileSelect"
            />

            <!-- Preview -->
            <div v-if="imagePreview" class="relative w-32 h-32 mb-3">
              <img
                :src="imagePreview"
                alt="Preview"
                class="w-full h-full object-cover rounded-lg border border-slate-200 dark:border-slate-700"
              />
              <button
                type="button"
                class="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-red-500 text-white flex items-center justify-center hover:bg-red-600 transition-colors"
                @click="removeImage"
              >
                <UIcon name="i-heroicons-x-mark" class="w-4 h-4" />
              </button>
            </div>

            <!-- Upload Button -->
            <UButton
              type="button"
              color="neutral"
              variant="outline"
              @click="triggerFileInput"
              :disabled="isSubmitting"
            >
              <UIcon name="i-heroicons-photo" class="w-4 h-4 mr-2" />
              {{ imagePreview ? 'Ganti Gambar' : 'Pilih Gambar' }}
            </UButton>
            <p class="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Format: JPG, PNG, WebP, GIF. Maks. 2MB
            </p>
          </div>

          <!-- Active Status -->
          <div class="flex items-center gap-3">
            <UCheckbox
              v-model="form.isActive"
              :disabled="isSubmitting"
            />
            <label class="text-sm text-slate-700 dark:text-slate-300">
              Kategori aktif
            </label>
          </div>

          <!-- Actions -->
          <div class="flex justify-end gap-3 pt-4 border-t border-slate-200 dark:border-slate-700">
            <UButton
              type="button"
              color="neutral"
              variant="outline"
              @click="closeModal"
              :disabled="isSubmitting"
            >
              Batal
            </UButton>
            <UButton
              type="submit"
              color="primary"
              :loading="isSubmitting"
              :disabled="!form.name.trim()"
            >
              {{ isEditing ? 'Simpan Perubahan' : 'Tambah Kategori' }}
            </UButton>
          </div>
        </UForm>
      </div>
    </template>
  </UModal>
</template>
