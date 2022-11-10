<template>
  <div
    class="img-container"
    :class="`${props.isHoverBlur ? 'is-hover-blur' : ''} ${
      props.isDefaultBlur ? 'is-default-blur' : ''
    }`"
  >
    <div
      class="img"
      :class="props.isRound ? 'is-round' : ''"
      :style="style"
    ></div>
    <div
      class="shadow"
      :class="props.isRound ? 'is-round' : ''"
      :style="shadowStyle"
    ></div>
  </div>
</template>

<script setup lang="ts">
import { CSSProperties, reactive, watch } from "vue";
const props = withDefaults(
  defineProps<{
    isRound?: boolean;
    isHoverBlur?: boolean;
    isDefaultBlur?: boolean;
    isMv?: boolean;
    url?: string;
    width: number;
  }>(),
  {
    isDefaultBlur: false,
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
  backgroundImage: `url(${props.url})`,
  width: props.width + "px",
  height: props.width + "px",
});

watch(
  () => props.url,
  (nv: any, ov: any) => {
    shadowStyle.backgroundImage = `url(${nv})`;
    style.backgroundImage = `url(${nv})`;
  }
);
</script>

<style scoped lang="scss">
.img-container {
  position: relative;
  .img {
    cursor: pointer;
    border-radius: 12px;
    transition: 0.3s all;
    z-index: 10;
    background-position: center;
    background-size: cover;
    &.is-round {
      border-radius: 50%;
    }
  }
  &.is-default-blur {
    .shadow {
      transform: scale(0.95) translate(8px, 8px);
      filter: blur(20px) opacity(0.6);
    }
  }
  &.is-hover-blur {
    .img {
      &:hover + .shadow {
        transform: scale(0.95) translate(8px, 8px);
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
        filter: blur(20px) opacity(0.6);
      }
    }
  }
  .shadow {
    position: absolute;
    top: 0;
    z-index: -1;
    background-size: cover;
    background-position: center;
    transition: 0.3s all;
    border-radius: 12px;
    &.is-round {
      border-radius: 50%;
    }
  }
}
</style>
