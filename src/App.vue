<script setup lang="ts">
import { RouterView } from "vue-router";
import Toast from "./components/Toast.vue";
import { UserStore } from "./store/user";
const loadBasicData = async () => {
  const userStore = UserStore();
  await userStore.fetchUserAccount();
  await userStore.fetchUserPlayList();
};
loadBasicData();
</script>

<template>
  <main>
    <RouterView v-slot="{ Component }">
      <Transition name="page" mode="out-in">
        <component :is="Component"></component>
      </Transition>
    </RouterView>
  </main>
  <Toast />
</template>

<style lang="scss">
$primaryColor: var(--primary-color);
$secondaryColor: var(--second-color);

$mainHeight: 100vh;

main {
  height: $mainHeight;
}
</style>
