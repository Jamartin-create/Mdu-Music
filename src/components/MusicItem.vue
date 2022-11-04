<template>
  <div class="music-item">
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
$primaryColor: var(--primary-color);
$secondaryColor: var(--second-color);
$primaryReverseColor: #3d3d3d;
.music-item {
  display: flex;
  justify-content: space-between;
  width: 100%;
  min-width: 600px;
  padding: 5px 50px;
  margin: 10px 0;
  border-radius: 6px;
  font-size: 18px;
  transition: all 0.2s;
  &:hover {
    background-color: $primaryReverseColor;
    color: $primaryColor;
    cursor: pointer;
  }
  &:active {
    transform: scale(0.98);
  }
  > div {
    width: calc(100% / 3);
    padding: 5px 10px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    flex: 2;
    &:first-of-type {
      font-weight: bolder;
    }
    &:last-of-type {
      text-align: right;
      flex: 1;
    }
  }
}
</style>
