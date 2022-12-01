<template>
  <div class="content-page">
    <SubNavBar @change="changeType" />
    <Transition name="page" mode="out-in">
      <component
        :is="tabComponents[curSelect].component"
        :list="list"
        :no-more="noMore"
        :loading="searchLoading"
        :from-play-list-id="0"
        :from-play-list-type="'SL'"
        @load-more="loadMore"
      ></component>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import MusicList from "../../components/MusicList.vue";
import AlbumList from "../../components/AlbumList.vue";
import SingerList from "../../components/SingerList.vue";
import PlayMusicList from "../../components/PlayMusicList.vue";
import UserList from "../../components/UserList.vue";
import SubNavBar from "./components/SubNavBar.vue";
import { markRaw, onMounted, reactive, ref, watch } from "vue";
import { useRouter, useRoute } from "vue-router";
import { searchByKeyWords } from "../../api/music";
import { MusicKeyWordsParam, SearchType } from "../../api/interface/music";
type Component = {
  id: SearchType;
  component: any;
};

const route = useRoute();
const router = useRouter();
//子组件
const tabComponents = reactive<Component[]>([
  { id: 1, component: markRaw(MusicList) },
  { id: 10, component: markRaw(AlbumList) },
  { id: 100, component: markRaw(SingerList) },
  { id: 1000, component: markRaw(PlayMusicList) },
  { id: 1002, component: markRaw(UserList) },
]);
//分页查询参数
const searchPage = reactive<MusicKeyWordsParam>({
  limit: 50,
  offset: 0,
  keywords: "",
  type: 1,
});
const searchLoading = ref<boolean>(false); //搜索状态
const noMore = ref<boolean>(false); //是否还有更多
const list = reactive<any[]>([]); //列表
const curSelect = ref<number>(0); //当前选中的tab

//加载更多
function loadMore() {
  if (noMore.value) return;
  searchPage.offset!++;
}
//切换page
function changeType(type: SearchType) {
  if (type === tabComponents[curSelect.value].id) return;
  tabComponents.forEach((item, index) => {
    if (item.id === type) curSelect.value = index;
  });
  list.splice(0, list.length);
  searchPage.offset = 0;
  searchPage.type = type;
}
//搜索接口
async function searchMusic() {
  searchLoading.value = true;
  try {
    const res: any = await searchByKeyWords({
      ...searchPage,
    });
    const type: SearchType = tabComponents[curSelect.value].id;
    updatePlayList(res.result, type);
    checkListLength(res.result, type);
  } catch (e) {
    console.error(e);
  } finally {
    searchLoading.value = false;
  }
}
//更新列表
function updatePlayList(lists: any, type: SearchType) {
  Array.prototype.push.apply(
    list,
    type == 1
      ? lists.songs
      : type == 10
      ? lists.albums
      : type == 100
      ? lists.artists
      : type == 1000
      ? lists.playlists
      : type == 1002
      ? lists.userprofiles
      : []
  );
}
//更新列表长度
function checkListLength(lists: any, type: SearchType) {
  const count =
    type == 1
      ? lists.songCount
      : type == 10
      ? lists.albumCount
      : type == 100
      ? lists.artistCount
      : type == 1000
      ? lists.playlistCount
      : type == 1002
      ? lists.profileCount
      : [];
  noMore.value = list.length >= count;
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
//当分页查询条件其中之一发生变化则重新请求界面
watch(
  () => searchPage,
  () => {
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
