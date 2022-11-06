<template>
  <div class="banner">
    <div class="banner-wrapper">
      <div
        class="banner-item"
        :class="
          index === pageChose
            ? 'middle'
            : index === prePage
            ? 'left'
            : index === nextPage
            ? 'right'
            : ''
        "
        v-for="(banner, index) in props.list"
        :key="index"
      >
        <img :src="banner.imageUrl" alt="" loading="lazy" />
      </div>

      <button class="left-arrow" @click="changePage(prePage)">
        <i class="fas fa-angle-left"></i>
      </button>
      <button class="right-arrow" @click="changePage(nextPage)">
        <i class="fas fa-angle-right"></i>
      </button>

      <div class="pagenation-wrapper">
        <span
          :class="pageChose === index ? 'chose' : ''"
          v-for="(item, index) in props.list"
          :key="index"
          @mouseover="changePage(index)"
        ></span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from "vue";

const props = defineProps<{
  list: any[];
}>();
const pageChose = ref<number>(0);
const prePage = computed(() => {
  return (pageChose.value - 1 + props.list.length) % props.list.length;
});
const nextPage = computed(() => {
  return (pageChose.value + 1) % props.list.length;
});

let bannerInterval: any = null;
function setBannerInterval() {
  bannerInterval = setInterval(() => {
    pageChose.value = (pageChose.value + 1) % props.list.length;
  }, 3000);
}
function changePage(pageIndex: number) {
  clearInterval(bannerInterval);
  pageChose.value = pageIndex;
  setBannerInterval();
}

setBannerInterval();

onUnmounted(() => {
  clearInterval(bannerInterval);
});
</script>

<style scoped lang="scss">
.banner {
  position: relative;
  margin: 30px auto;
  height: 300px;
  max-width: 1200px;
  min-width: 800px;
  .banner-wrapper {
    position: relative;
    height: 100%;
    width: 100%;
    .banner-item {
      position: absolute;
      bottom: 50%;
      left: 50%;
      width: 50%;
      height: 90%;
      transform: translateX(-50%) translateY(50%);
      box-sizing: border-box;
      overflow: hidden;
      border-radius: 10px;
      transition: all 0.3s ease-in-out;
      z-index: -1;
      > img {
        display: none;
        width: 100%;
        border-radius: 10px;
        opacity: 0.5;
        object-fit: cover;
      }
      &.middle,
      &.left,
      &.right {
        > img {
          display: block;
        }
      }
      &.middle {
        width: 70%;
        height: 90%;
        z-index: 1;
        > img {
          opacity: 1;
        }
      }
      &.left {
        left: 2%;
        transform: translateX(-10%) translateY(60%);
        z-index: 0;
      }
      &.right {
        left: 98%;
        transform: translateX(-90%) translateY(60%);
        z-index: 0;
      }
    }

    .left-arrow,
    .right-arrow {
      position: absolute;
      top: 50%;
      z-index: 200;
      width: 40px;
      height: 40px;
      font-size: 15px;
      text-align: center;
      font-weight: 900;
      color: #b4b4b4;
      border: none;
      border-radius: 50%;
      background-color: transparent;
      transition: var(--tran-03);
      &:hover {
        color: rgb(233, 233, 233);
        background-color: rgba(0, 0, 0, 0.2);
      }
    }
    .left-arrow {
      left: 2%;
      transform: translateY(-50%);
    }
    .right-arrow {
      right: 2%;
      transform: translateY(-50%);
    }
  }
  .pagenation-wrapper {
    position: absolute;
    top: 85%;
    width: 100%;
    display: flex;
    justify-content: center;
    z-index: 3;
    > span {
      width: 8px;
      height: 8px;
      border-radius: 50%;
      margin: 0 4px;
      background-color: rgba(0, 0, 0, 0.5);
      &.chose {
        background-color: #da2828;
      }
    }
  }
}
</style>
