<template>
  <div class="col-list-item media-list-item">
    <div><BgPic :url="props.blurPicUrl!" :width="70" /></div>
    <div>{{ props.name }}</div>
    <div>
      {{ props.artists.map((item) => item.name).join("/") }}
    </div>
  </div>
</template>

<script setup lang="ts">
import BgPic from "./BgPic.vue";
const props = defineProps<{
  id: number;
  name: string;
  size: number | undefined;
  artist: any | undefined;
  artists: any[];
  picUrl?: string | undefined;
  blurPicUrl?: string | undefined;
}>();
</script>

<style scoped lang="scss">
.col-list-item {
  font-size: 22px;
  > div {
    &:first-of-type {
      flex: 1;
    }
  }
}
</style>
