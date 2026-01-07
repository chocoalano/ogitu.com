<script setup lang="ts">
import { computed } from 'vue'

// Vape tips for admin
const vapeTips = [
  'Upload foto produk dengan background bersih dan pencahayaan yang baik',
  'Lengkapi spesifikasi produk seperti wattage, kapasitas tank, dan coil resistance',
  'Berikan deskripsi rasa liquid secara detail untuk membantu customer',
  'Pastikan stok selalu update untuk menghindari pembatalan pesanan',
  'Tambahkan label "Best Seller" pada produk terlaris untuk menarik pembeli',
  'Respond chat pembeli dalam waktu 15 menit untuk rating yang lebih baik',
  'Gunakan foto produk asli untuk meningkatkan kepercayaan pembeli',
  'Update harga secara berkala agar tetap kompetitif di pasar',
]

const currentTip = computed(() => {
  // Use date-based random selection for consistency during the day
  const today = new Date().toDateString()
  const seed = today.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0)
  return vapeTips[seed % vapeTips.length]
})
</script>

<template>
  <div
    class="p-5 bg-linear-to-br from-violet-500/10 to-fuchsia-500/10 border border-violet-500/20 rounded-2xl"
  >
    <div class="flex items-start gap-3">
      <div
        class="w-10 h-10 rounded-xl bg-linear-to-br from-violet-500 to-fuchsia-600 flex items-center justify-center shrink-0"
      >
        <UIcon name="i-heroicons-light-bulb" class="w-5 h-5 text-white" />
      </div>
      <div>
        <p class="font-semibold text-violet-700 dark:text-violet-300">💡 Tips Admin</p>
        <p class="text-sm text-violet-600 dark:text-violet-400 mt-1">
          {{ currentTip }}
        </p>
      </div>
    </div>
  </div>
</template>
