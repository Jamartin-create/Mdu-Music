<template>
  <header>
    <nav>
      <RouterLink :to="{ name: 'home' }"> 首页 </RouterLink>
      <RouterLink :to="{ name: 'library' }"> 个人中心 </RouterLink>
    </nav>
  </header>
</template>

<script setup lang="ts">
import { RouterLink } from "vue-router";
</script>

<style scoped lang="scss">
$primaryColor: var(--primary-color);
$secondaryColor: var(--second-color);
header {
  position: sticky;
  top: 0;
  box-shadow: 0px 2px 10px rgba($color: #000000, $alpha: 0.6);
  height: 50px;
  background-color: $primaryColor;
  > nav {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    gap: 10px;
    font-size: 16px;
  }
}
</style>
