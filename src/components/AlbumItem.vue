<template>
  <div class="album-item">
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
$primaryColor: var(--primary-color);
$secondaryColor: var(--second-color);
$primaryReverseColor: #3d3d3d;
.album-item {
  display: flex;
  justify-content: space-between;
  width: 100%;
  min-width: 600px;
  padding: 5px 50px;
  margin: 10px 0;
  border-radius: 6px;
  font-size: 22px;
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
    display: flex;
    align-items: center;
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
