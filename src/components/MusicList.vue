<template>
  <div class="list-page">
    <div class="col-list">
      <MusicItem
        v-for="item in props.list"
        :key="item.id"
        :id="item.id"
        :album="item.album ? item.album : item.al"
        :artists="item.artists ? item.artists : item.ar"
        :name="item.name"
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
import MusicItem from "./MusicItem.vue";
const props = defineProps<{
  list: any[];
  loading?: boolean;
  noMore?: boolean;
  showLoading?: boolean;
}>();
const emits = defineEmits(["loadMore"]);
function loadMore() {
  emits("loadMore");
}
</script>
