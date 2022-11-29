<template>
  <audio
    ref="player"
    @ended="musicEnded"
    @timeupdate="handleTimeUpdate"
    :src="curMusicUrl"
  />
</template>

<script setup lang="ts">
import { nextTick, ref, watch } from "vue";
import { MusicStore } from "../store/music";
const musicStore = MusicStore();
const player = ref<HTMLAudioElement>();
const curMusicUrl = ref<string>();
curMusicUrl.value = musicStore.curSong?.url;

function handleTimeUpdate(e: Event) {
  const audio = e.target as HTMLAudioElement;
  musicStore.changeDuration(audio.currentTime / audio.duration);
}

function changeCurrentTime(duration: number) {
  player.value!.currentTime = duration * player.value?.duration!;
}

function musicEnded() {
  musicStore.next();
}

watch(
  () => musicStore.curSongPassChangeValue,
  (nv: any, ov: any) => {
    player.value!.currentTime = nv * player.value?.duration!;
  }
);

watch(
  () => player.value?.paused,
  (nv: any, ov: any) => {
    if (nv) musicStore.pause();
  },
  { immediate: true }
);

watch(
  () => musicStore.curSong?.id,
  async (nv: any, ov: any) => {
    curMusicUrl.value = musicStore.songUrl;
    nextTick(() => {
      musicStore.pause();
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
defineExpose({
  changeCurrentTime,
});
</script>

<style scoped></style>
