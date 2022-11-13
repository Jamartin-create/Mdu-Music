<template>
  <div class="list-page">
    <div class="col-list">
      <MusicItem
        v-for="(item, index) in props.list"
        :key="item.id"
        :id="item.id"
        :album="item.album ? item.album : item.al"
        :artists="item.artists ? item.artists : item.ar"
        :name="item.name"
        @chose-music="MusicChoose(index)"
      />
    </div>
    <button v-if="!props.showLoading" class="hover-button" @click="loadMore">
      {{
        noMore ? "没有更多啦" : props.loading ? "loading..." : "点击加载更多"
      }}
    </button>
  </div>
</template>

<script setup lang="ts">
import { MusicStore } from "../store/music";
import MusicItem from "./MusicItem.vue";
//PL = PlayList; AL = ALbumList; SL = SearchList
type playListType = "PL" | "AL" | "SL";
const musicStore = MusicStore();
const props = defineProps<{
  fromPlayListId: number;
  fromPlayListType: playListType;
  list: any[];
  loading?: boolean;
  noMore?: boolean;
  showLoading?: boolean;
}>();
const emits = defineEmits(["loadMore"]);
function loadMore() {
  emits("loadMore");
}
function MusicChoose(idx: number) {
  musicStore.changePlayList(props.list, props.fromPlayListId, idx);
}
</script>
