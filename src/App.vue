<script setup lang="ts">
import { onMounted } from "vue";
import { RouterView } from "vue-router";
import Toast from "./components/Toast.vue";
import { UserStore } from './store/user'
const userStore = UserStore();
userStore.fetchUserAccount();
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
