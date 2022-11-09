<template>
  <div class="content-page">
    <div class="content-box">
      <BgPic
        :url="albumInfo.picUrl"
        :is-default-blur="true"
        :is-hover-blur="false"
        :width="300"
      />
      <div class="info">
        <div class="title">{{ albumInfo.name }}</div>
        <div class="other-info">
          <div class="creator">
            <div class="nickname">
              {{ albumInfo.artists?.map((item) => item.name).join("/") }}
            </div>
            <div class="create-time">{{ createTimeFormat }} 发布</div>
          </div>
          <div class="count">
            <div>歌曲：{{ albumInfo.size }}</div>
            <div>分享：{{ albumInfo.shareCount }}</div>
          </div>
          <div class="description">
            {{ albumInfo.description ? albumInfo.description : "暂无介绍" }}
          </div>
        </div>
      </div>
    </div>
    <MusicList :list="musicList" :show-loading="true" />
  </div>
</template>

<script setup lang="ts">
import { reactive, computed } from "vue";
import { useRoute } from "vue-router";
import { fetchAlbumDetails } from "../../api/music";
import BgPic from "../../components/BgPic.vue";
import MusicList from "../../components/MusicList.vue";

const route = useRoute();

const musicList = reactive<any[]>([]);

const albumInfo = reactive<{
  picUrl: string;
  name: string;
  size?: number;
  shareCount?: number;
  description?: string;
  publishTime?: number;
  artists?: any[];
}>({
  picUrl: "",
  name: "",
});

async function fetchAlbumDetail() {
  try {
    const albumId: any = route.query.id;
    const res: any = await fetchAlbumDetails(albumId as number);
    console.log(res);
    const album = res.album;
    albumInfo.picUrl = album.picUrl;
    albumInfo.description = album.description;
    albumInfo.shareCount = album.info.shareCount;
    albumInfo.size = album.size;
    albumInfo.name = album.name;
    albumInfo.publishTime = album.publishTime;
    albumInfo.artists = album.artists;
    Array.prototype.push.apply(musicList, res.songs);
  } catch (error) {}
}

const createTimeFormat = computed(() => {
  const date: Date = new Date(albumInfo.publishTime!);
  const year = date.getFullYear() != null ? date.getFullYear() : "0000";
  const month = date.getMonth() != null ? date.getMonth() + 1 : "0";
  const day = date.getDay() != null ? date.getDay() : "00";
  return `${year}年${month}月${day}日`;
});

fetchAlbumDetail();
</script>

<style scoped lang="scss">
.content-box {
  margin-bottom: 20px;
  display: flex;
  .info {
    margin-left: 40px;
    padding: 10px 0;
    display: flex;
    flex-direction: column;
    .title {
      font-size: 30px;
      font-weight: bold;
      flex: 1;
    }
    .other-info {
      flex: 2;
      .creator {
        display: flex;
        align-items: center;
        font-size: 20px;
        > * {
          margin-right: 10px;
        }
        .create-time {
          color: rgba($color: #000000, $alpha: 0.5);
        }
      }
      .count {
        margin-top: 20px;
        font-size: 16px;
        display: flex;
        color: rgba($color: #000000, $alpha: 0.6);
        > * {
          margin-right: 20px;
        }
      }
      .description {
        padding-right: 10px;
        line-height: 30px;
        max-height: 90px;
        margin-top: 20px;
        font-size: 18px;
        overflow-y: scroll;
      }
    }
  }
}
</style>
