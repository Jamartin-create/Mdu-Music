<template>
  <div class="row-list-item" @click="toDetail">
    <div>
      <BgPic :url="props.picUrl!" :width="150" :is-round="true" />
    </div>
    <div>{{ props.name }}</div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";
import BgPic from "./BgPic.vue";
const router = useRouter();

const props = defineProps<{
  id: number;
  name: string;
  alias?: any[];
  picUrl?: string;
}>();

function toDetail() {
  router.push({ name: "artistDetail", query: { id: props.id } });
}
</script>

<style scoped lang="scss">
.row-list-item {
  font-size: 18px;
}
</style>
