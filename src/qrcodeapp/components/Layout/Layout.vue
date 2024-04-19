<script setup lang="ts">
import Header from "../Header/Header.vue";
</script>

<template>
  <main class="bg-gray-900 text-white">
    <section class="max-w-7xl min-h-screen m-auto p-5">
      <Header />
      <slot />
    </section>
  </main>
</template>
