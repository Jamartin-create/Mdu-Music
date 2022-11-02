<template>
  <div class="music-item">
    <div>{{ props.name }}</div>
    <div>{{ props.artists.map((item) => item.name).join("/") }}</div>
    <div>{{ props.album.name }}</div>
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
$primaryColor: var(--primary-color);
$secondaryColor: var(--second-color);
$primaryReverseColor: #3d3d3d;
.music-item {
  display: flex;
  justify-content: space-around;
  width: 100%;
  min-width: 600px;
  padding: 5px 10px;
  margin: 10px 0;
  border-radius: 6px;
  font-size: 14px;
  transition: all 0.1s;
  &:hover {
    background-color: $primaryReverseColor;
    color: $primaryColor;
  }
  > div {
    width: calc(100% / 3);
    padding: 0 10px 0;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
}
</style>
