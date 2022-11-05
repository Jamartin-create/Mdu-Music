<template>
  <audio ref="player" :src="curMusicUrl" />
</template>

<script setup lang="ts">
import { nextTick, ref, watch } from "vue";
import { MusicStore } from "../store/music";
import { SongInfo } from "../store/interface/index";
const musicStore = MusicStore();
const player = ref<HTMLAudioElement>();

const curMusicUrl = ref<string>();

watch(
  () => musicStore.curSong,
  async (
    newVal: SongInfo | null | undefined,
    oldVal: SongInfo | null | undefined
  ) => {
    curMusicUrl.value = newVal?.url;
    nextTick(() => {
      musicStore.play();
    });
  },
  {
    deep: true,
  }
);
watch(
  () => musicStore.player.play,
  (newVal: any, oldVal: any) => {
    if (!newVal) player.value?.pause();
    else player.value?.play();
  },
  {
    immediate: true,
    deep: true,
  }
);
</script>

<style scoped></style>
