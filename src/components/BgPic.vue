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
    <div class="shadow" :style="shadowStyle"></div>
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

const shadowStyle = reactive<CSSProperties>({
  backgroundImage: `url(${props.url})`,
  width: props.width + "px",
  height: props.width + "px",
});

const style = reactive<CSSProperties>({
  width: props.width + "px",
  height: props.width + "px",
});
</script>

<style scoped lang="scss">
.img-container {
  position: relative;
  img {
    cursor: pointer;
    border-radius: 6px;
    transition: 0.3s all;
    aspect-ratio: 1 / 1;
    &.is-round {
      border-radius: 50%;
    }

    &:hover + .shadow {
      transform: scale(0.9) translate(8px, 8px);
      filter: blur(10px) opacity(0.6);
    }
    &:hover {
      transform: scale(1.02);
    }
    &:active {
      transform: scale(0.98);
    }
    &:active + .shadow {
      transform: scale(0.86) translate(8px, 8px);
      filter: blur(10px) opacity(0.6);
    }
  }
  .shadow {
    position: absolute;
    top: 0;
    z-index: -1;
    border-radius: 50%;
    background-size: cover;
    transition: 0.3s all;
    aspect-ratio: 1 / 1;
  }
}
</style>
