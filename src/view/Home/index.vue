<template>
  <div class="content-page">
    <Banner :list="bannerList" />
    <div class="content-box">
      <div class="title">推荐歌单 <i class="fas fa-angle-right"></i></div>
      <PlayMusicList :list="recomendPlayList" :show-loading="true" />
    </div>
    <div class="content-box">
      <div class="title">最新单曲 <i class="fas fa-angle-right"></i></div>
      <MusicList :list="recomendNewSongs" :show-loading="true" />
    </div>
  </div>
</template>

<script setup lang="ts">
import Banner from "./components/Banner.vue";
import MusicList from "../../components/MusicList.vue";
import PlayMusicList from "../../components/PlayMusicList.vue";
import {
  fetchBanner,
  fetchRecomPlayList,
  fetchRecomNewSongs,
} from "../../api/sys";
import { reactive } from "vue";
const bannerList = reactive<any[]>([]);
const recomendPlayList = reactive<any[]>([]);
const recomendNewSongs = reactive<any[]>([]);

async function fetchBanners() {
  try {
    const res: any = await fetchBanner();
    Array.prototype.push.apply(bannerList, res.banners);
  } catch (e) {
    console.error(e);
  }
}

async function fetchRecomendPlayList() {
  try {
    const res: any = await fetchRecomPlayList();
    Array.prototype.push.apply(recomendPlayList, res.result.slice(0, 10));
  } catch (e) {
    console.error(e);
  }
}

async function fetchRecomendNewSongs() {
  try {
    const res: any = await fetchRecomNewSongs(12);
    Array.prototype.push.apply(
      recomendNewSongs,
      res.result.map((item: any) => item.song)
    );
  } catch (e) {
    console.error(e);
  }
}

fetchBanners();
fetchRecomendPlayList();
fetchRecomendNewSongs();
</script>

<style scoped lang="scss">
.content-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  .content-box {
    margin-bottom: 20px;
    width: 100%;
    .title {
      font-size: 25px;
      margin-bottom: 10px;
      margin-left: 10px;
      display: inline-block;
      transition: all 0.3;
      > i {
        color: rgba($color: #000000, $alpha: 0.3);
      }
      &:hover {
        font-weight: bold;
        > i {
          color: rgba($color: #000000, $alpha: 1);
        }
      }
      &:active {
        transform: scale(0.98);
      }
    }
  }
}
</style>
