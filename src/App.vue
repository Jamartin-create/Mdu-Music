<script setup lang="ts">
import PlayerController from "./components/PlayerController.vue";
import SiteNav from "./components/SiteNavigition.vue";
import Lryics from "./components/Lryics.vue";
import Toast from "./components/Toast.vue";
import { MusicStore } from "./store/music";
import { UserStore } from "./store/user";
import { RouterView } from "vue-router";
import { ref, watch } from "vue";
const musicStore = MusicStore();
musicStore.player.play = false;
const loadBasicData = async () => {
  const userStore = UserStore();
  await userStore.fetchUserAccount();
  await userStore.fetchUserPlayList();
};
const lryicsPageShow = ref<boolean>(false);
function showLryicsPage() {
  lryicsPageShow.value = true;
  window.document.getElementsByTagName("body")[0].classList.add("no-scroll");
}
function unShowLryicsPage() {
  lryicsPageShow.value = false;
  window.document.getElementsByTagName("body")[0].classList.remove("no-scroll");
}
loadBasicData();
</script>

<template>
  <SiteNav />
  <Lryics :show="lryicsPageShow" @un-show="unShowLryicsPage" />
  <Toast />
  <main>
    <RouterView v-slot="{ Component }">
      <Transition name="page" mode="out-in">
        <component :is="Component"></component>
      </Transition>
    </RouterView>
  </main>
  <Teleport to="body">
    <PlayerController @toggle-lryics="showLryicsPage" />
  </Teleport>
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
