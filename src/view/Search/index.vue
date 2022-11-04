<template>
  <div class="content-page">
    <SubNavBar @change="changeType" />
    <Transition name="page" mode="out-in">
      <component
        :is="tabComponents[curSelect].component"
        :list="list"
        :loading="searchLoading"
        @load-more="loadMore"
      ></component>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import MusicList from "../../components/MusicList.vue";
import AlbumList from "../../components/AlbumList.vue";
import SingerList from "../../components/SingerList.vue";
import SubNavBar from "./components/SubNavBar.vue";
import { computed, markRaw, onMounted, reactive, ref, watch } from "vue";
import { useRouter, useRoute } from "vue-router";
import { searchByKeyWords } from "../../api/music";
import { MusicKeyWordsParam, SearchType } from "../../api/interface/music";
type Component = {
  id: SearchType;
  component: any;
};

const route = useRoute();
const router = useRouter();

const tabComponents = reactive<Component[]>([
  {
    id: 1,
    component: markRaw(MusicList),
  },
  {
    id: 10,
    component: markRaw(AlbumList),
  },
  {
    id: 100,
    component: markRaw(SingerList),
  },
]);
const searchPage = reactive<MusicKeyWordsParam>({
  limit: 50,
  offset: 0,
  keywords: "",
  type: 1,
});

const searchLoading = ref<boolean>(false);
const list = reactive<any[]>([]);
const curSelect = ref<number>(0);

function loadMore() {
  searchPage.offset!++;
}

function changeType(type: SearchType) {
  if (type === tabComponents[curSelect.value].id) return;
  tabComponents.forEach((item, index) => {
    if (item.id === type) curSelect.value = index;
  });
  list.splice(0, list.length);
  searchPage.offset = 0;
  searchPage.type = type;
}

async function searchMusic() {
  searchLoading.value = true;
  try {
    const res: any = await searchByKeyWords({
      ...searchPage,
    });
    const type: SearchType = tabComponents[curSelect.value].id;
    console.log(res);
    Array.prototype.push.apply(
      list,
      type == 1
        ? res.result.songs
        : type == 10
        ? res.result.albums
        : type == 100
        ? res.result.artists
        : []
    );
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
      list.splice(0, list.length);
      searchPage.keywords = newVal.keywords;
    }
  },
  { immediate: true }
);

watch(
  () => searchPage,
  (
    newVal: MusicKeyWordsParam | undefined,
    oldVal: MusicKeyWordsParam | undefined
  ) => {
    searchMusic();
  },
  { deep: true, immediate: true }
);

onMounted(() => {
  searchPage.keywords = route.query.keywords as string;
});
</script>

<style lang="scss" scoped>
.page-enter-active,
.page-leave-active {
  transition: 600ms ease all;
}

.page-enter-from,
.page-leave-to {
  opacity: 0;
}
</style>
