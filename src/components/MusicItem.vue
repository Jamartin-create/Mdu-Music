<template>
  <div class="col-list-item media-list-item">
    <div>{{ props.name }}</div>
    <div>{{ props.album.name }}</div>
    <div>{{ props.artists.map((item) => item.name).join("/") }}</div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  id: number;
  name: string;
  album: any;
  artists: any[];
}>();
</script>

<style scoped lang="scss">
.col-list-item {
  font-size: 18px;
}
</style>
