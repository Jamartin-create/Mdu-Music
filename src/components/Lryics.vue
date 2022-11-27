<template>
  <div class="page" :class="props.show ? 'full-page' : ''">
    <button class="close" @click="emits('un-show')">
      <i class="fas fa-times"></i>
    </button>
    <div class="controller">
      <BgPic
        :url="musicStore.curSong?.album.picUrl"
        :width="400"
        :is-hover-blur="false"
      />
      <div class="title">{{ musicStore.curSong?.name }}</div>
      <div class="ctl-btn"></div>
    </div>
    <div class="lyrics">
      <div
        class="lyric"
        v-for="(lyric, index) in lyrics"
        :class="{
          active: index === highLightLyric,
        }"
        :key="lyric.time"
      >
        {{ lyric.lyric }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import BgPic from "./BgPic.vue";
import { MusicStore } from "../store/music";
import { Lyric } from "../store/interface";
import { computed, reactive, watch, ref } from "vue";
const musicStore = MusicStore();
const emits = defineEmits(["un-show"]);
const props = defineProps<{
  show: Boolean;
}>();
let interval: any = null;
const highLightLyric = ref<number>(-1);
const lyrics = reactive<Lyric[]>(musicStore.lyric);
function setLyricInterval() {
  clearInterval(interval);
  interval = setInterval(() => {
    lyrics.forEach((item, index) => {
      const nextLyric = lyrics[index + 1];
      if (
        curTime.value >= item.time &&
        (nextLyric ? curTime.value < nextLyric.time : true)
      ) {
        console.log(item.time, curTime.value);
      }
    });
    console.log(highLightLyric.value);
  }, 1000);
}
const curTime = computed<number>(() => {
  return musicStore.songPassed * musicStore.curSong?.duration!;
});
watch(
  () => musicStore.player.play,
  (nv: any, ov: any) => {
    if (nv) setLyricInterval();
    else clearInterval(interval);
  },
  {
    immediate: true,
  }
);
</script>

<style scoped lang="scss">
.close {
  position: absolute;
  right: 1%;
  top: 1%;
  border: none;
  width: 50px;
  height: 50px;
  border-radius: 12px;
  background-color: transparent;
  font-size: 24px;
  cursor: pointer;
  transition: all 0.3s;
  z-index: 1000;
  &:active {
    transform: scale(0.8);
  }
}
.page {
  position: fixed;
  z-index: 100;
  bottom: 0;
  left: 0;
  height: 100%;
  width: 100%;
  transform: translateY(100%);
  transition: all 1s ease;
  background-color: #fff;
  display: flex;
  justify-content: space-around;
  align-items: center;
}
.full-page {
  transform: translateY(0);
}

.controller {
  flex: 1;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 22px;
  > * {
    margin: 10px 0;
  }
}
.lyrics {
  flex: 1;
  z-index: 110;
  height: 80%;
  overflow-y: scroll;
  .lyric {
    text-align: center;
    line-height: 40px;
    font-size: 24px;
    margin: 10px 0;
    transition: all 0.1s ease;
    &.active,
    &:hover {
      font-size: 28px;
    }
  }
}
</style>
