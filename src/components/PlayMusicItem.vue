<template>
  <div class="row-list-item" @click="toDetail">
    <div>
      <BgPic :url="props.picUrl!" :width="150" />
    </div>
    <div class="title">{{ props.name }}</div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";
import BgPic from "./BgPic.vue";
const router = useRouter();
const props = defineProps<{
  id: number;
  name: string;
  picUrl?: string;
}>();

function toDetail() {
  router.push({ name: "playList", query: { id: props.id } });
}
</script>

<style scoped lang="scss">
.row-list-item {
  .title {
    width: 150px;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    font-size: 16px;
  }
}
</style>
