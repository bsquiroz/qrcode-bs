<script setup lang="ts">
import { ref } from "vue";
import { generateQR, generateImgBase64 } from "../utils/plugins/qrcode";
import Layout from "./components/Layout/Layout.vue";

import { toast } from "vue3-toastify";

const valueInputQr = ref("");
const ShowInfoQr = ref(false);

const handleGenerateQr = async () => {
  const url = valueInputQr.value;

  if (!url)
    return toast("Introducce una URL", {
      theme: "dark",
      type: "warning",
    });

  try {
    const { href } = new URL(url);

    generateQR(
      document.querySelector("#canvasQrCode") as HTMLCanvasElement,
      href
    );

    ShowInfoQr.value = true;

    toast("QR generado con exito", {
      theme: "dark",
      type: "success",
    });
  } catch (error) {
    toast("Lo siento, no es una URL valida", {
      theme: "dark",
      type: "error",
    });
  }

  return;
};

const handleDownloadQr = async () => {
  const res = await generateImgBase64(valueInputQr.value);

  const link = document.createElement("a");
  link.download = "qrcode.jpeg";
  link.href = res as string;
  link.click();

  toast("QR descargado con exito", {
    theme: "dark",
    type: "success",
  });
};

const handleSharedQr = async () => {
  const res = await generateImgBase64(valueInputQr.value);

  const data = await fetch(res as string);
  const blob = await data.blob();

  await navigator.clipboard.write([
    new ClipboardItem({
      [blob.type]: blob,
    }),
  ]);

  toast("El QR se encuentra en el portapapeles, compartelo", {
    theme: "dark",
    type: "success",
  });
};

const handleReset = () => {
  valueInputQr.value = "";
  ShowInfoQr.value = false;

  toast("Genera un nuevo QR", {
    theme: "dark",
    type: "success",
  });
};
</script>

<template>
  <Layout>
    <section class="qrcodeapp">
      <div class="flex gap-5 flex-wrap">
        <input
          class="qrcodeapp__input"
          type="text"
          placeholder="https://ejemplo.com"
          v-model="valueInputQr"
        />
        <button
          v-show="!ShowInfoQr"
          @click="handleGenerateQr"
          class="qrcodeapp__btn qrcodeapp__btn--generate"
        >
          generar QR
        </button>
      </div>

      <Transition>
        <section class="qrcodeapp__info" v-show="ShowInfoQr">
          <canvas class="m-auto" id="canvasQrCode"></canvas>

          <div class="qrcodeapp__actions">
            <button
              class="qrcodeapp__btn qrcodeapp__btn--shared"
              @click="handleSharedQr"
            >
              Compartir QR
            </button>
            <button
              class="qrcodeapp__btn qrcodeapp__btn--download"
              @click="handleDownloadQr"
            >
              Descargar QR
            </button>
            <button
              class="qrcodeapp__btn qrcodeapp__btn--reset"
              @click="handleReset"
            >
              Generar un nuevo QR
            </button>
          </div>
        </section>
      </Transition>
    </section>
  </Layout>
</template>

<style scope>
.qrcodeapp {
  @apply flex flex-col items-center gap-5 pt-10;
}

.qrcodeapp__input {
  @apply text-white px-5 py-2 rounded-full outline-none placeholder:font-bold font-bold bg-transparent border-2 border-yellow-500 flex-1;
}

.qrcodeapp__info {
  @apply flex gap-5 flex-col;
}

.qrcodeapp__actions {
  @apply flex gap-5 flex-wrap justify-center;
}

.qrcodeapp__btn {
  @apply px-5 py-2 rounded-md font-bold uppercase hover:opacity-90 active:scale-95 transition-all flex-1;
}

.qrcodeapp__btn--generate {
  @apply bg-yellow-500;
}

.qrcodeapp__btn--shared {
  @apply bg-green-500;
}

.qrcodeapp__btn--download {
  @apply bg-blue-500;
}

.qrcodeapp__btn--reset {
  @apply bg-red-500;
}

.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease, transform 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
  transform: translateY(2rem);
}
</style>
