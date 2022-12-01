<template>
  <div class="col-list-item media-list-item" @dblclick="changeMusicAndList">
    <div>{{ props.name }}</div>
    <div>{{ props.album.name }}</div>
    <div>{{ props.artists.map((item) => item.name).join("/") }}</div>
  </div>
</template>

<script setup lang="ts">
import { MusicStore } from "../store/music";
const emit = defineEmits(["chose-music"]);
const props = defineProps<{
  id: number;
  name: string;
  album: any;
  artists: any[];
}>();

function changeMusicAndList() {
  const musicStore = MusicStore();
  musicStore.changeMusic(props.id);
  emit("chose-music");
}
</script>

<style scoped lang="scss">
.col-list-item {
  font-size: 18px;
  padding: 10px 10px;
}
</style>
