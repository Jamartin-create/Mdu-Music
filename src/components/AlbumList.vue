<template>
  <div class="col-list">专辑列表</div>
</template>

<script setup lang="ts">
import { onMounted } from "vue";

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
