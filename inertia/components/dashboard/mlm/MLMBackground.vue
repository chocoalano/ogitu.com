<template>
  <div class="absolute inset-0 bg-linear-to-br from-gray-900 via-gray-800 to-gray-900">
    <!-- Animated Grid Pattern -->
    <div
      class="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=%2260%22 height=%2260%22 viewBox=%220 0 60 60%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cg fill=%22none%22 fill-rule=%22evenodd%22%3E%3Cg fill=%22%239C92AC%22 fill-opacity=%220.05%22%3E%3Cpath d=%22M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-40"
    ></div>
    <!-- Glow Effects -->
    <div class="absolute -top-20 -left-20 w-40 h-40 bg-violet-500/20 rounded-full blur-3xl"></div>
    <div class="absolute -bottom-10 -right-10 w-32 h-32 bg-cyan-500/20 rounded-full blur-2xl"></div>
  </div>

  <!-- Floating Particles -->
  <div class="absolute top-8 right-8 w-1.5 h-1.5 bg-violet-400 rounded-full animate-pulse"></div>
  <div class="absolute top-20 left-6 w-1 h-1 bg-cyan-400 rounded-full animate-ping opacity-60"></div>
  <div
    class="absolute bottom-24 right-12 w-1 h-1 bg-pink-400 rounded-full animate-bounce opacity-50"
  ></div>
</template>
