<template>
  <header>
    <div class="drop-shadow">
      <div class="glass"></div>
      <nav>
        <RouterLink :to="{ name: 'home' }"> 发现 </RouterLink>
        <RouterLink :to="{ name: 'library' }"> 音乐库 </RouterLink>
        <!-- <RouterLink :to="{ name: 'setting' }"> 设置 </RouterLink> -->
      </nav>
      <div class="navigate">
        <button @click="routerChange(-1)">
          <i class="fas fa-angle-left"></i>
        </button>
        <button @click="routerChange(1)">
          <i class="fas fa-angle-right"></i>
        </button>
      </div>
      <div class="search-bar">
        <i class="fas fa-search icon"></i>
        <input
          v-model="keywords"
          type="text"
          placeholder="Search..."
          @keydown.enter="enter"
        />
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { RouterLink, useRouter, useRoute } from "vue-router";

const router = useRouter();
const route = useRoute();
const keywords = ref<string>("");

console.log(router);

function enter() {
  router.push({ name: "search", query: { keywords: keywords.value } });
}

function routerChange(number: -1 | 1) {
  router.go(number);
}
</script>

<style scoped lang="scss">
$primaryColor: var(--primary-color);
$secondaryColor: var(--second-color);
header {
  position: sticky;
  top: 0;
  box-shadow: 0px 2px 10px rgba($color: #000000, $alpha: 0.3);
  height: 60px;
  background-color: $primaryColor;
  background: hsla(0, 0%, 100%, 0.3);
  backdrop-filter: blur(6px);
  z-index: 100;
  .drop-shadow {
    height: 100%;
    > nav {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 100%;
      gap: 30px;
      font-size: 18px;
    }
    .navigate {
      position: absolute;
      top: 50%;
      left: 11%;
      transform: translateY(-50%);
      > button {
        margin: 5px;
        width: 25px;
        height: 25px;
        background-color: transparent;
        border-radius: 3px;
        border: none;
        transition: all 0.3s ease-in;
        &:hover {
          background-color: rgba($color: #000000, $alpha: 0.3);
          color: #fff;
        }
        &:active {
          transform: scale(0.6);
        }
        > i {
          font-size: 20px;
        }
      }
    }
    .search-bar {
      position: absolute;
      top: 50%;
      right: 11%;
      transform: translateY(-50%);
      padding: 8px;
      border: 1px solid rgba($color: #000000, $alpha: 0.2);
      border-radius: 12px;
      > input {
        width: 150px;
        border: 0;
        font-size: 14px;
        background-color: transparent;
        &::placeholder {
          color: rgba($color: #000000, $alpha: 0.4);
        }
      }
      .icon {
        color: rgba($color: #000000, $alpha: 0.4);
        font-size: 16px;
        margin: 0 10px 0 5px;
      }
    }
  }
}
</style>
