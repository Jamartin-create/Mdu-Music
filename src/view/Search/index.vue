<template>
  <div>
    <div class="test" v-for="item in playList" :key="item.id">
      {{ item.name }}
    </div>
    <div class="loadmore" @click="loadMore">点击加载更多</div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, reactive } from "vue";

import { useRouter, useRoute, LocationQuery } from "vue-router";
import { searchByKeyWords } from "../../api/music";
const route = useRoute();

onMounted(() => {
  searchPage.keywords = route.query.keywords as string;
  loadMore();
});

type Page = {
  limit: number;
  offset: number;
  keywords: string;
};

const searchPage = reactive<Page>({
  limit: 50,
  offset: 0,
  keywords: "",
});

const playList = reactive<any[]>([]);

function loadMore() {
  console.log("dd");
  searchPage.offset++;
  searchMusic();
}

async function searchMusic() {
  try {
    const res: any = await searchByKeyWords({
      ...searchPage,
    });
    console.log(res.result.songs);
    Array.prototype.push.apply(playList, res.result.songs);
    console.log(res);
  } catch (e) {
    console.error(e);
  }
}
</script>

<style scoped lang="scss">
.test {
  font-size: 20px;
}
</style>
