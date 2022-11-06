<template>
  <div class="list-page">
    <div class="row-list">
      <PlayMusicItem
        v-for="item in props.list"
        :key="item.id"
        :id="item.id"
        :name="item.name"
        :pic-url="item.coverImgUrl ? item.coverImgUrl : item.picUrl"
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
import { onMounted } from "vue";
import PlayMusicItem from "./PlayMusicItem.vue";
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
onMounted(() => {
  console.log(props);
});
</script>

<style scoped></style>
