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
  </div>
</template>

<script setup lang="ts">
import BgPic from "./BgPic.vue";
import { MusicStore } from "../store/music";
const musicStore = MusicStore();
const emits = defineEmits(["un-show"]);
const props = defineProps<{
  show: Boolean;
}>();
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
  transform: translateY(120%);
  transition: all 1s ease;
  background-color: #fff;
}
.full-page {
  transform: translateY(0);
}

.controller {
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
</style>
