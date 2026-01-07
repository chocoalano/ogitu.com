<script setup lang="ts">
import { ref } from 'vue'
import NewsletterCTA from '~/components/NewsletterCTA.vue'
import FooterBrand from '~/components/FooterBrand.vue'
import FooterLinksColumn from '~/components/FooterLinksColumn.vue'
import AppDownload from '~/components/AppDownload.vue'
import PaymentMethods from '~/components/PaymentMethods.vue'
import ShippingPartners from '~/components/ShippingPartners.vue'
import LegalBar from '~/components/LegalBar.vue'

const subscribed = ref(false)
const subscribe = () => {
  subscribed.value = true
  alert('Terima kasih! Anda telah berlangganan newsletter.')
}
</script>

<template>
  <footer class="bg-gray-50 dark:bg-gray-900">
    <!-- Newsletter CTA -->
    <NewsletterCTA @subscribe="subscribe" />

    <!-- Main Footer Content -->
    <div class="border-t border-gray-200 dark:border-gray-800">
      <UContainer>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-8 py-12">
          <FooterBrand class="lg:col-span-2" />

          <FooterLinksColumn
            title="Kategori"
            :links="[
              { label: 'Pod System', to: '/collections/pod-system' },
              { label: 'Mod & Kit', to: '/collections/mod-kit' },
              { label: 'Liquid Premium', to: '/collections/liquid-premium' },
              { label: 'Salt Nic', to: '/collections/salt-nicotine' },
              { label: 'Coil & Atomizer', to: '/collections/atomizer-coil' },
              { label: 'Aksesoris', to: '/collections/accessories' }
            ]"
          />

          <FooterLinksColumn
            title="Layanan Pelanggan"
            :links="[
              { label: 'Pusat Bantuan', to: '/help' },
              { label: 'Lacak Pesanan', to: '/track' },
              { label: 'Cara Belanja', to: '/shipping' },
              { label: 'Metode Pembayaran', to: '/payment' },
              { label: 'Pengembalian', to: '/returns' },
              { label: 'Hubungi Kami', to: '/contact' }
            ]"
          />

          <FooterLinksColumn
            title="Tentang ogitu.com"
            :links="[
              { label: 'Tentang Kami', to: '/about' },
              { label: 'Blog & Artikel', to: '/blog' },
              { label: 'Karir', to: '/careers' },
              { label: 'Press Release', to: '/press' },
              { label: 'Program Afiliasi', to: '/affiliate' }
            ]"
          />

          <AppDownload />
        </div>
      </UContainer>
    </div>

    <!-- Payment & Shipping -->
    <div class="border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950">
      <UContainer>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6 py-6">
          <PaymentMethods />
          <ShippingPartners />
        </div>
      </UContainer>
    </div>

    <!-- Legal Bar -->
    <LegalBar />
  </footer>
</template>
