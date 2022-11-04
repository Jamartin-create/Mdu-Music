<template>
  <div class="list-page">
    <div class="row-list">
      <UserItem
        v-for="item in props.list"
        :key="item.userId"
        :id="item.userId"
        :gender="item.gender"
        :name="item.nickname"
        :pic-url="item.avatarUrl"
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
import UserItem from "./UserItem.vue";
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
