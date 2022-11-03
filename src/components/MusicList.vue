<template>
  <div class="music-list">
    <MusicItem
      v-for="item in props.playList"
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
  playList: any[];
  loading: boolean;
}>();
const emits = defineEmits(["loadMore"]);
function loadMore() {
  emits("loadMore");
}
</script>

<style scoped lang="scss">
.music-list {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
