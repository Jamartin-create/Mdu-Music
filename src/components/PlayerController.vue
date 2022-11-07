<template>
  <footer>
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
        <button class="center">
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
          <div class="process"></div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import BgPic from "./BgPic.vue";
import { MusicStore } from "../store/music";
const musicStore = MusicStore();
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
        .process {
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
