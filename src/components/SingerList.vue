<template>
  <div class="list-page">
    <div class="row-list">
      <SingerItem
        v-for="item in props.list"
        :key="item.id"
        :id="item.id"
        :alias="item.alias"
        :name="item.name"
        :pic-url="item.picUrl"
      />
    </div>
    <button class="hover-button" @click="loadMore">
      {{
        noMore ? "没有更多啦" : props.loading ? "loading..." : "点击加载更多"
      }}
    </button>
  </div>
</template>

<script setup lang="ts">
import SingerItem from "./SingerItem.vue";

const props = defineProps<{
  list: any[];
  loading: boolean;
  noMore: boolean;
}>();
const emits = defineEmits(["loadMore"]);
function loadMore() {
  emits("loadMore");
}
</script>

<style scoped></style>
