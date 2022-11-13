<template>
  <audio ref="player" :src="curMusicUrl" />
</template>

<script setup lang="ts">
import { nextTick, onMounted, onUnmounted, ref, watch } from "vue";
import { MusicStore } from "../store/music";
const musicStore = MusicStore();
const player = ref<HTMLAudioElement>();
const curMusicUrl = ref<string>();
let musicDtInterval: any = null;
curMusicUrl.value = musicStore.curSong?.url;

function setMusicDtInterval() {
  clearMusicDtInterval();
  musicDtInterval = setInterval(() => {
    const curDur = player.value!.currentTime!;
    const dur = player.value?.duration!;
    musicStore.changeDuration(curDur / dur);
  }, 100);
}

function clearMusicDtInterval() {
  clearInterval(musicDtInterval);
}

function changeCurrentTime(duration: number) {
  clearMusicDtInterval();
  player.value!.currentTime = duration * player.value?.duration!;
  setMusicDtInterval();
}

function musicEnded() {
  musicStore.next();
}

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
onMounted(() => {
  player.value!.onended = () => {
    musicEnded();
  };
});

if (musicStore.curSong != null) setMusicDtInterval();
onUnmounted(() => {
  clearMusicDtInterval();
});
defineExpose({
  changeCurrentTime,
});
</script>

<style scoped></style>
