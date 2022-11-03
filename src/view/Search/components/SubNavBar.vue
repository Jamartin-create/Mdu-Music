<template>
  <nav class="nav">
    <button
      class="hover-button"
      :class="item.active ? 'active' : ''"
      v-for="item in navList"
      :key="item.id"
      @click="onChange(item.id)"
    >
      {{ item.label }}
    </button>
  </nav>
</template>

<script setup lang="ts">
import { SearchType } from "../../../api/interface/music";
import { reactive } from "vue";
const emits = defineEmits(["change"]);
const navList = reactive<
  {
    id: SearchType;
    label: string;
    active: boolean;
  }[]
>([
  { id: 1, label: "单曲", active: true },
  { id: 10, label: "专辑", active: false },
  { id: 100, label: "歌手", active: false },
  { id: 1000, label: "歌单", active: false },
  { id: 1004, label: "用户", active: false },
]);
function onChange(id: SearchType) {
  emits("change", id);
  navList.forEach((item) => {
    item.active = false;
    if (item.id === id) item.active = true;
  });
}
</script>

<style lang="scss" scoped>
.nav {
  display: flex;
  justify-content: center;
  gap: 20px;
  font-size: 16px;
  margin-bottom: 20px;
}
</style>
