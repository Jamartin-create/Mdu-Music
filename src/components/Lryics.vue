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
      <div class="ctl-btn">
        <ProcessBar
          :percentage="musicProcess"
          :background-color="'rgba(0,0,0,0.4)'"
          :width="'300px'"
          @change-position="processPositionChange"
        />
        <ControllerBar />
      </div>
    </div>
    <div class="lryic-wrapper">
      <div class="lyrics" :style="lryStyle">
        <div
          class="lyric"
          v-for="(lyric, index) in lyrics"
          :class="{
            active: index === highLightLyric,
          }"
          ref="lryicItem"
          :key="lyric.time"
        >
          {{ lyric.lyric }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import BgPic from "./BgPic.vue";
import ProcessBar from "./ProcessBar.vue";
import ControllerBar from "./PlayerController/ControllerBar.vue";
import { MusicStore } from "../store/music";
import { Lyric } from "../store/interface";
import { reactive, watch, ref, CSSProperties } from "vue";
import { useMusicController, useMusicListener } from "../hooks/useMusicControl";
const musicStore = MusicStore();
const emits = defineEmits(["un-show"]);
const props = defineProps<{
  show: Boolean;
}>();
let interval: any = null;
const highLightLyric = ref<number>(0);
const highLightLryicHeight = ref<number>(0);
const { watchMusicChange, watchPlayingStatus } = useMusicListener();
const { curProcess, musicProcess, processPositionChange } =
  useMusicController();
const lyrics = reactive<Lyric[]>([]);
const lryicItem = ref<HTMLElement[]>();

const lryStyle = reactive<CSSProperties>({
  transform: `translateY(calc(35vh - ${highLightLryicHeight.value}px))`,
});

//歌词计数器
function setLyricInterval() {
  clearInterval(interval);
  interval = setInterval(() => {
    try {
      const ct = curProcess.value;
      let centerHight = 0;
      lyrics.forEach((item, index) => {
        centerHight += getHeight(
          lryicItem.value![index].getBoundingClientRect().height
        );
        if (item.time < ct && lyrics[index + 1].time > ct) {
          highLightLryicHeight.value = 50 * centerHight;
          highLightLyric.value = index;
          throw new Error("over");
        }
      });
    } catch (e) {}
  }, 100);
}

//获取歌词的行高
function getHeight(h: number): number {
  return h <= 10
    ? 0
    : h <= 60
    ? 1
    : h <= 120
    ? 2
    : h <= 180
    ? 3
    : h <= 240
    ? 4
    : h <= 300
    ? 5
    : h <= 360
    ? 6
    : h <= 420
    ? 7
    : h <= 480
    ? 8
    : 9;
}

watch(
  () => highLightLyric.value,
  (nv: any, ov: any) => {
    lryStyle.transform = `translateY(calc(35vh - ${highLightLryicHeight.value}px))`;
  }
);

watchMusicChange(
  (nv: any, ov: any) => {
    highLightLryicHeight.value = 0;
    highLightLyric.value = 0;
    lyrics.splice(0, lyrics.length);
    Array.prototype.push.apply(lyrics, musicStore.lyric);
  },
  { immediate: true }
);
watchPlayingStatus(
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
  min-width: 800px;
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
  width: 50%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 22px;
  .ctl-btn {
    width: 80%;
    display: flex;
    flex-direction: column;
    gap: 20px;
    align-items: center;
  }
  > * {
    margin: 10px 0;
  }
}
.lryic-wrapper {
  height: 80%;
  overflow-y: hidden;
  flex: 1;
  z-index: 110;
  .lyrics {
    transition: all 0.3s ease;
    .lyric {
      text-align: center;
      line-height: 40px;
      font-size: 22px;
      margin: 10px 0;
      transition: all 0.1s ease;
      color: rgba($color: #000000, $alpha: 0.4);
      &.active,
      &:hover {
        color: rgba($color: #000000, $alpha: 1);
      }
    }
  }
}
</style>
