<template>
  <div class="content-page">
    <MusicList
      :play-list="playList"
      :loading="searchLoading"
      @load-more="loadMore"
    />
  </div>
</template>

<script setup lang="ts">
import MusicList from "../../components/MusicList.vue";
import { onMounted, reactive, ref, watch } from "vue";
import { useRouter, useRoute } from "vue-router";
import { searchByKeyWords } from "../../api/music";
const route = useRoute();

onMounted(() => {
  searchPage.keywords = route.query.keywords as string;
  loadMore();
});

const searchPage = reactive<{
  limit: number;
  offset: number;
  keywords: string;
}>({
  limit: 50,
  offset: 0,
  keywords: "",
});

const playList = reactive<any[]>([]);
const searchLoading = ref<boolean>(false);

function loadMore() {
  console.log("dd");
  searchPage.offset++;
  searchMusic();
}

const router = useRouter();
watch(
  () => router.currentRoute.value.query,
  (newVal: any, oldVal: any) => {
    if (newVal.keywords ?? newVal.keywords === searchPage.keywords) {
      searchPage.keywords = newVal.keywords;
      playList.splice(0, playList.length);
      searchMusic();
    }
  },
  { immediate: true }
);

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
</script>

<style scoped lang="scss">
.test {
  font-size: 20px;
}
</style>
