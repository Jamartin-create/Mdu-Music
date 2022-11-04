<template>
  <div
    class="img-container"
    :class="
      props.isHoverBlur ? 'is-hover-blur' : '' + ' ' + props.isMv ? 'is-mv' : ''
    "
  >
    <img
      :src="props.url"
      :class="props.isRound ? 'is-round' : ''"
      :style="style"
    />
  </div>
</template>

<script setup lang="ts">
import { CSSProperties, reactive } from "vue";
const props = withDefaults(
  defineProps<{
    isRound?: boolean;
    isHoverBlur?: boolean;
    isMv?: boolean;
    url: string;
    width: number;
  }>(),
  {
    isHoverBlur: true,
    isMv: false,
    isRound: false,
  }
);

const style = reactive<CSSProperties>({
  width: props.width + "px",
  height: props.width + "px",
});
</script>

<style scoped lang="scss">
.img-container {
  img {
    border-radius: 6px;
    &.is-round {
      border-radius: 50%;
    }
  }
}
</style>
