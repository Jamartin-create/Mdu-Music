<template>
  <div class="row-list-item">
    <div>
      <BgPic :url="props.picUrl!" :width="200" :is-round="true" />
    </div>
    <div>{{ props.name }}</div>
  </div>
</template>

<script setup lang="ts">
import BgPic from "./BgPic.vue";
const props = defineProps<{
  id: number;
  name: string;
  alias?: any[];
  picUrl?: string;
}>();
</script>

<style scoped lang="scss">
.row-list-item {
  font-size: 18px;
}
</style>
