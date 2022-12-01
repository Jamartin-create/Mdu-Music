<template>
  <audio
    ref="player"
    @ended="nextMusic"
    @pause="pauseMuisc"
    @timeupdate="handleTimeUpdate"
    :src="curMusicUrl"
  />
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useMusicListener, useMusicController } from "../hooks/useMusicControl";
const { watchCurSongPassChange, watchPlayingStatus } = useMusicListener();
const { curMusicUrl, nextMusic, pauseMuisc, changeMusicPosition } =
  useMusicController();
const player = ref<HTMLAudioElement>();

function handleTimeUpdate(e: Event) {
  const audio = e.target as HTMLAudioElement;
  changeMusicPosition(audio.currentTime / audio.duration);
}
//进度条被拖拽后触发该监听器，更新播放器音乐进度
watchCurSongPassChange((nv: any, ov: any) => {
  player.value!.currentTime = nv * player.value?.duration!;
});
//暂停、播放控件点击后触发该监听器，自动暂停/播放音乐
watchPlayingStatus(
  (nv: any, ov: any) => {
    if (!nv) player.value?.pause();
    else player.value?.play();
  },
  {
    immediate: true,
    deep: true,
  }
);
</script>

<style scoped></style>
