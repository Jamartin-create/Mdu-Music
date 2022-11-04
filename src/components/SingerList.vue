<template>
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
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import SingerItem from "./SingerItem.vue";

const props = defineProps<{
  list: any[];
  loading: boolean;
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
