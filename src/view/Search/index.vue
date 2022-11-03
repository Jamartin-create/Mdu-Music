<template>
  <div class="content-page">
    <SubNavBar @change="changeType" />
    <MusicList
      :play-list="playList"
      :loading="searchLoading"
      @load-more="loadMore"
    />
  </div>
</template>

<script setup lang="ts">
import MusicList from "../../components/MusicList.vue";
import SubNavBar from "./components/SubNavBar.vue";
import { onMounted, reactive, ref, watch } from "vue";
import { useRouter, useRoute } from "vue-router";
import { searchByKeyWords } from "../../api/music";
import { MusicKeyWordsParam, SearchType } from "../../api/interface/music";
const route = useRoute();
const router = useRouter();

const playList = reactive<any[]>([]);
const searchLoading = ref<boolean>(false);

const searchPage = reactive<MusicKeyWordsParam>({
  limit: 50,
  offset: 0,
  keywords: "",
  type: 1,
});

function loadMore() {
  searchPage.offset!++;
}

function changeType(type: SearchType) {
  searchPage.type = type;
}

async function searchMusic() {
  searchLoading.value = true;
  try {
    const res: any = await searchByKeyWords({
      ...searchPage,
    });
    Array.prototype.push.apply(playList, res.result.songs);
  } catch (e) {
    console.error(e);
  } finally {
    searchLoading.value = false;
  }
}

//监听路由变化
watch(
  () => router.currentRoute.value.query,
  (newVal: any, oldVal: any) => {
    if (newVal.keywords ?? newVal.keywords === searchPage.keywords) {
      playList.splice(0, playList.length);
      searchPage.keywords = newVal.keywords;
    }
  },
  { immediate: true }
);

watch(
  () => searchPage,
  (newVal: any, oldVal: any) => {
    searchMusic();
  },
  { deep: true, immediate: true }
);

onMounted(() => {
  searchPage.keywords = route.query.keywords as string;
  loadMore();
});
</script>
