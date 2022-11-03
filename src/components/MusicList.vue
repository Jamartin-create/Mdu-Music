<template>
  <div class="col-list">
    <MusicItem
      v-for="item in props.list"
      :key="item.id"
      :id="item.id"
      :album="item.album"
      :artists="item.artists"
      :name="item.name"
    />
    <button class="hover-button" @click="loadMore">
      {{ props.loading ? "loading..." : "点击加载更多" }}
    </button>
  </div>
</template>

<script setup lang="ts">
import MusicItem from "./MusicItem.vue";
const props = defineProps<{
  list: any[];
  loading: boolean;
}>();
const emits = defineEmits(["loadMore"]);
function loadMore() {
  emits("loadMore");
}
</script>
