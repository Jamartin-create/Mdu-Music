<script setup lang="ts">
import { RouterView } from "vue-router";
import Toast from "./components/Toast.vue";
</script>

<template>
  <main>
    <RouterView></RouterView>
    <Toast />
  </main>
</template>

<style lang="scss">
$primaryColor: var(--primary-color);
$secondaryColor: var(--second-color);

$mainHeight: 100vh;

main {
  height: $mainHeight;
}
</style>
