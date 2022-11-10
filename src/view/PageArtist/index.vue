<template>
  <div class="content-page">
    <div class="header">
      <div class="img" :class="showDesc ? '' : 'show'">
        <BgPic
          :url="artistInfo.cover"
          :width="300"
          @click="showDesc = !showDesc"
        />
      </div>
      <div class="description" :class="showDesc ? 'show' : ''">
        {{ artistInfo.briefDesc }}
      </div>
    </div>
    <div class="title">专辑</div>
    <AlbumList
      :list="albumList"
      :loading="searchLoading"
      :no-more="noMore"
      @load-more="loadMore"
    />
  </div>
</template>

<script setup lang="ts">
import { reactive, ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { ArtistAlbums } from "../../api/interface/music";
import { fetchArtistDetails, fetchArtistAlbums } from "../../api/music";
import BgPic from "../../components/BgPic.vue";
import AlbumList from "../../components/AlbumList.vue";
const route = useRoute();
const router = useRouter();
const showDesc = ref<boolean>(false);
const searchLoading = ref<boolean>(false);
const noMore = ref<boolean>(false);
const albumList = reactive<any[]>([]);

const searchPage = reactive<ArtistAlbums>({
  id: 0,
  limit: 50,
  offset: 0,
});

const artistInfo = reactive<{
  name?: string;
  musicSize?: string;
  cover?: string;
  identities?: string;
  briefDesc?: string;
}>({});

function loadMore() {
  if (noMore.value) return;
  searchPage.offset!++;
}

async function fetchArtistDetail() {
  try {
    const artistId: any = route.query.id;
    const res: any = await fetchArtistDetails(artistId as number);
    const { artist } = res.data;
    artistInfo.name = artist.name;
    artistInfo.musicSize = artist.musicSize;
    artistInfo.cover = artist.cover;
    artistInfo.identities = artist.identities;
    artistInfo.briefDesc = artist.briefDesc;
  } catch (error) {}
}

async function fetchArtistAlbum() {
  try {
    const artistId: any = route.query.id;
    const res: any = await fetchArtistAlbums(searchPage);
    if (res) {
      Array.prototype.push.apply(albumList, res.hotAlbums);
      noMore.value = res.more;
    }
  } catch (error) {}
}
//监听路由变化
watch(
  () => router.currentRoute.value.query,
  (newVal: any, oldVal: any) => {
    if (newVal.id ?? newVal.id === searchPage.id) {
      albumList.splice(0, albumList.length);
      searchPage.id = newVal.id;
    }
  },
  { immediate: true }
);

watch(
  () => searchPage,
  (newVal: any, oldVal: any) => {
    fetchArtistAlbum();
  },
  { immediate: true, deep: true }
);

fetchArtistDetail();
</script>

<style scoped lang="scss">
.header {
  position: relative;
  height: 320px;
  .img {
    position: absolute;
    transition: all 1s ease-in;
    left: 0%;
    &.show {
      left: 50%;
      transform: translateX(-50%);
    }
  }
  .description {
    &::first-letter {
      font-size: 30px;
    }
    position: absolute;
    top: 0;
    transition: all 1s ease-in;
    transform: translateX(400%);
    width: calc(100% - 320px);
    height: 300px;
    font-size: 16px;
    word-spacing: 10px;
    line-height: 50px;
    overflow-y: scroll;
    padding: 0px 20px 5px;
    &.show {
      transform: translateX(300px);
    }
  }
}
.title {
  font-size: 30px;
  margin: 10px 20px 0;
  font-weight: bold;
}
</style>
