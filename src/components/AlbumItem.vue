<template>
  <div class="col-list-item media-list-item" @click="toDetail">
    <div>
      <BgPic :url="props.blurPicUrl!" :width="70" :is-hover-blur="false" />
    </div>
    <div>{{ props.name }}</div>
    <div>
      {{ props.artists.map((item) => item.name).join("/") }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";
import BgPic from "./BgPic.vue";

const router = useRouter();
const props = defineProps<{
  id: number;
  name: string;
  size: number | undefined;
  artist: any | undefined;
  artists: any[];
  picUrl?: string | undefined;
  blurPicUrl?: string | undefined;
}>();

function toDetail() {
  router.push({ name: "albumDetail", query: { id: props.id } });
}
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
