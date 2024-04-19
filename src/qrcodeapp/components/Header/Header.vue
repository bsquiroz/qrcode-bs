<template>
  <header class="header">
    <a class="logo" href="https://github.com/bsquiroz" target="_blank"
      >qrcode-bs</a
    >
    <a
      class="icon__github"
      href="https://github.com/bsquiroz/qrcode-bs"
      target="_blank"
    >
      <i class="bx bxl-github"></i>
    </a>
  </header>
</template>

<style scope>
.header {
  @apply flex justify-between items-center;
}

.logo {
  @apply font-extrabold uppercase bg-gradient-to-r from-yellow-500 to-white text-transparent bg-clip-text;
}

.icon__github {
  @apply text-2xl;
}
</style>
