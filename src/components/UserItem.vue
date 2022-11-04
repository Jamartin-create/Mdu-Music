<template>
  <div class="row-list-item">
    <div>
      <BgPic :url="props.picUrl!" :width="150" />
    </div>
    <div class="title">
      <i
        class="fas fa-circle"
        :class="props.gender === 1 ? 'blue' : 'pink'"
      ></i>
      {{ props.name }}
    </div>
  </div>
</template>

<script setup lang="ts">
import BgPic from "./BgPic.vue";
const props = defineProps<{
  id: number;
  name: string;
  picUrl?: string;
  gender: number;
}>();
</script>

<style scoped lang="scss">
.row-list-item {
  .title {
    width: 150px;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    font-size: 16px;
    .blue,
    .pink {
      font-size: 8px;
    }
    .blue {
      color: rgb(143, 222, 222);
    }
    .pink {
      color: pink;
    }
  }
}
</style>
