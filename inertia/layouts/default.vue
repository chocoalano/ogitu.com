<script setup lang="ts">
import Footer from './ecommerce/Footer.vue'
import Header from './ecommerce/Header.vue'
import ToastContainer from '~/components/ToastContainer.vue'
</script>

<template>
  <UApp>
    <Header />

    <UMain>
      <slot />
    </UMain>

    <Footer />

    <ToastContainer />
  </UApp>
</template>
