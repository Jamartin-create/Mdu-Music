<template>
  <div class="bar" :style="{ width: props.width }">
    <button @click.stop="prevMusic">
      <i class="fas fa-step-backward"></i>
    </button>
    <button class="center" @click.stop="tooglePlayPause">
      <i
        class="fas"
        :class="musicStore.player.play ? ' fa-pause' : 'fa-play'"
      ></i>
    </button>
    <button @click.stop="nextMusic">
      <i class="fas fa-step-forward"></i>
    </button>
  </div>
</template>

<script setup lang="ts">
import { useMusicController } from "../../hooks/useMusicControl";
import { MusicStore } from "../../store/music";
const musicStore = MusicStore();
const { prevMusic, nextMusic, tooglePlayPause } = useMusicController();

const props = withDefaults(defineProps<{ width?: string }>(), {
  width: "100%",
});
</script>

<style scoped lang="scss">
.bar {
  display: flex;
  justify-content: center;
  align-items: center;
  > button {
    background-color: transparent;
    border: none;
    font-size: 24px;
    transition: all 0.2s ease;
    &.center {
      font-size: 30px;
      margin: 0 30px;
    }
    &:hover {
      transform: scale(1.1);
    }
    &:active {
      transform: scale(0.8);
    }
  }
}
</style>
