<script setup lang="ts">
import { RouterView } from "vue-router";
</script>

<template>
  <main>
    <RouterView></RouterView>
  </main>
</template>

<style lang="scss">
$mainHeight: 100vh;
main {
  height: $mainHeight;
}
</style>
