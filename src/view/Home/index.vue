<template>
  <div class="content-page">
    <Banner :list="bannerList" />
  </div>
</template>

<script setup lang="ts">
import Banner from "./components/Banner.vue";
import { fetchBanner } from "../../api/sys";
import { reactive } from "vue";
const bannerList = reactive<any[]>([]);

async function fetchBanners() {
  try {
    const res: any = await fetchBanner();
    Array.prototype.push.apply(bannerList, res.banners);
  } catch (e) {
    console.error(e);
  }
}

fetchBanners();
</script>

<style scoped lang="scss">
.content-page {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
