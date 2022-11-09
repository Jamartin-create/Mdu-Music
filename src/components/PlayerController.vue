<template>
  <footer>
    <div
      ref="process"
      class="process"
      :class="processDraging ? 'active' : ''"
      @mouseup="processMouseDown"
    >
      <div class="passed" :style="passedStyle"></div>
      <div
        class="dragger"
        :style="draggerStyle"
        @mousedown="processDragStart"
      ></div>
    </div>
    <div class="content">
      <div class="song-info">
        <BgPic
          :url="musicStore.curSong?.album.picUrl"
          :width="70"
          :is-hover-blur="false"
          :is-default-blur="false"
        />
        <div class="other-info">
          <div class="title">
            {{ musicStore.curSong?.name }}
          </div>
          <div class="artists">
            {{ musicStore.curSong?.artists.map((item) => item.name).join("/") }}
          </div>
        </div>
      </div>
      <div class="controller">
        <button>
          <i class="fas fa-step-backward"></i>
        </button>
        <button class="center" @click="togglePlayPause">
          <i
            class="fas"
            :class="musicStore.player.play ? ' fa-pause' : 'fa-play'"
          ></i>
        </button>
        <button>
          <i class="fas fa-step-forward"></i>
        </button>
      </div>
      <div class="controller other-ctrl">
        <button>
          <i class="fas fa-volume-down"></i>
        </button>
        <div class="volume">
          <div class="v-process"></div>
        </div>
      </div>
    </div>
  </footer>
  <Player ref="musicPlayer" />
</template>

<script setup lang="ts">
import BgPic from "./BgPic.vue";
import Player from "./Player.vue";
import { MusicStore } from "../store/music";
import { CSSProperties, reactive, ref, watch } from "vue";
const musicStore = MusicStore();
const process = ref<HTMLElement>();
const musicPlayer = ref<InstanceType<typeof Player>>();

const processDraging = ref<boolean>();
window.onmousemove = dragMove;
window.onmouseup = dragEnd;

function processDragStart() {
  processDraging.value = true;
}

function dragMove(e: MouseEvent) {
  if (!processDraging.value) return;
  if (processDraging.value) changeProcess(computedProcess(e.clientX));
}

function dragEnd(e: MouseEvent) {
  //调整音乐进度
  if (processDraging.value)
    musicPlayer.value?.changeCurrentTime(computedProcess(e.clientX));
  processDraging.value = false;
}

//点击进度条控制进度
function processMouseDown(e: MouseEvent) {
  musicPlayer.value?.changeCurrentTime(computedProcess(e.clientX));
}

//获取dragger位置百分比
function computedProcess(clientWidth: number) {
  //减10是右侧的scrollbar
  const maxWidth: number = process.value?.getBoundingClientRect().width! - 10;
  if (clientWidth < 0) return 0;
  else if (clientWidth >= maxWidth) return 1;
  else return clientWidth / maxWidth;
}

function togglePlayPause() {
  if (musicStore.playing) musicStore.pause();
  else musicStore.play();
}

const draggerStyle = reactive<CSSProperties>({
  left: "0%",
});
const passedStyle = reactive<CSSProperties>({
  width: "0%",
});

function changeProcess(duration: number) {
  draggerStyle.left = duration * 100 + "%";
  passedStyle.width = duration * 100 + "%";
}

watch(
  () => musicStore.curSong?.passDuration,
  (nv: any, ov: any) => {
    if (processDraging.value) return;
    changeProcess(nv);
  },
  {
    immediate: true,
  }
);
</script>

<style scoped lang="scss">
$primaryColor: var(--primary-color);
$secondaryColor: var(--second-color);
footer {
  position: sticky;
  bottom: 0;
  height: 90px;
  width: 100%;
  background-color: $primaryColor;
  background: hsla(0, 0%, 100%, 0.3);
  backdrop-filter: blur(20px);
  z-index: 100;
  display: flex;
  justify-content: center;
  .process {
    position: absolute;
    width: 100%;
    height: 10px;
    background-color: transparent;
    .dragger {
      position: absolute;
      height: 12px;
      width: 12px;
      background-color: rgba($color: #fff, $alpha: 1);
      box-shadow: 0 1px 10px rgba($color: #000000, $alpha: 0.3);
      transform: translate(-50%, calc(-50% - 5px));
      border-radius: 50%;
      opacity: 0;
    }
    &.active,
    &:hover {
      .passed {
        height: 6px;
        transform: translateY(-2px);
      }
      .dragger {
        opacity: 1;
      }
    }
    .passed {
      height: 4px;
      border-radius: 3px;
      background-color: rgba(#000000, 0.3);
    }
  }
  .content {
    width: 80%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .song-info {
      display: flex;
      align-items: center;
      width: 30%;
      .other-info {
        margin-left: 10px;
        .title {
          font-size: 20px;
          font-weight: bold;
        }
        .artists {
          color: rgba($color: #000000, $alpha: 0.6);
        }
      }
    }
  }
  .controller {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 30%;
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
    &.other-ctrl {
      justify-content: flex-end;
      .volume {
        width: 80px;
        background-color: rgb(200, 200, 200);
        height: 4px;
        border-radius: 2px;
        margin-left: 10px;
        .v-process {
          height: 100%;
          width: 60px;
          border-radius: 2px;
          background-color: rgb(62, 62, 62);
          &:hover {
            height: 6px;
            box-shadow: 0 1px 4px rgba($color: #000000, $alpha: 0.4);
            transform: translateY(-1px);
          }
        }
      }
    }
  }
}
</style>
