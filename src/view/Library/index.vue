<template>
  <div class="content-page">
    <div class="user-info">
      <div class="avatar">
        <BgPic :url="userStore.profile.avatarUrl" :width="100" :is-round="true" :is-hover-blur="false" />
      </div>
      <div class="info">
        <div class="nick-name">{{ userStore.profile.nickname }}</div>
        <div class="other-info">
          <div>
            个人介绍：{{
                userStore.profile.description
                  ? userStore.profile.description
                  : "暂无介绍"
            }}
          </div>
        </div>
      </div>
    </div>
    <PlayMusicList :list="userStore.playList" :loading="false" :no-more="true" />
  </div>
</template>

<script setup lang="ts">
import { reactive, watch } from "vue";
import BgPic from "../../components/BgPic.vue";
import PlayMusicList from "../../components/PlayMusicList.vue";
import { UserStore } from "../../store/user";
const userStore = UserStore();

const list = reactive<any[]>([]);

watch(() => userStore.playList.length,
  () => {
    list.splice(0, list.length);
    Array.prototype.push(list, userStore.playList)
  }, {
  immediate: true,
})
</script>

<style scoped lang="scss">
.user-info {
  display: flex;
  margin-bottom: 20px;

  .avatar {
    margin-right: 20px;
  }

  .info {
    padding: 15px 0;
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    .nick-name {
      font-size: 22px;
      font-weight: bold;
    }
  }
}
</style>
