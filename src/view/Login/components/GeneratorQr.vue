<template>
  <img :src="qrCodeSvg" alt="" />
</template>

<script setup lang="ts">
import { nextTick, ref } from "vue";
import QRCode from "qrcode";

type Prop = {
  unikey: string;
  width?: number;
  darkColor?: string;
  ligthColor?: string;
};
const props = withDefaults(defineProps<Prop>(), {
  width: 180,
  darkColor: "#272727",
  ligthColor: "#00000000",
});

const qrCodeSvg = ref<string>();
const generatorQrCode = async () => {
  try {
    const svg = await QRCode.toString(
      `https://music.163.com/login?codekey=${props.unikey}`,
      {
        width: props.width,
        color: {
          dark: props.darkColor,
          light: props.ligthColor,
        },
        type: "svg",
      }
    );
    qrCodeSvg.value = `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
  } catch (e) {
    console.error(e);
  }
};

defineExpose({
  generatorQrCode,
});
</script>

<style scoped></style>
