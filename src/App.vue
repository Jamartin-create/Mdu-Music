<script setup lang="ts">
import SiteNav from "./components/SiteNavigition.vue";
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
  <SiteNav />
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

.page-enter-active,
.page-leave-active {
  transition: 600ms ease all;
}

.page-enter-from,
.page-leave-to {
  opacity: 0;
}
main {
  width: 100%;
  display: flex;
  justify-content: center;
}
</style>
