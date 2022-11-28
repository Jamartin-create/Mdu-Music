<template>
  <div class="container">
    <i class="iconfont icon-lil-netease"></i>
    <h1 class="title">登录网易云账号</h1>
    <div class="qrcode-container">
      <img :src="qrCodeSvg" alt="" />
    </div>
    <div class="qrScanDesc">
      {{ qrCodeDesc }}
      <button @click="refreshQrCode">
        <i class="fas fa-sync-alt"></i>
      </button>
    </div>
    <p class="tips">暂不支持手机登录和邮箱登录</p>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { generatorQrCode } from "../../../utils/qrCode";
import { qrKey, checkQrKey } from "../../../api/login";
import { CODEMESSAGE } from "../../../enum/QRCODE";
import { UserStore } from "../../../store/user";
import router from "../../../router";
const userStore = UserStore();

//获取父组件传值
const props = withDefaults(
  defineProps<{
    width?: number;
    darkColor?: string;
    ligthColor?: string;
  }>(),
  {
    width: 180,
    darkColor: "#272727",
    ligthColor: "#00000000",
  }
);

const qrCodeDesc = ref<string>();
const qrCodeSvg = ref<string>();
const qrCode = ref<string>();
let interval: any = null;

async function refreshQrCode() {
  const {
    data: { unikey },
  } = await qrKey();
  qrCode.value = unikey;
  qrCodeSvg.value = await generatorQrCode(unikey, {
    width: props.width,
    color: {
      dark: props.darkColor,
      light: props.ligthColor,
    },
    type: "svg",
  });
  checkQrStatus();
}

function checkQrStatus() {
  clearInterval(interval);
  interval = setInterval(async () => {
    if (qrCode.value === "") return;
    const res: any = await checkQrKey(qrCode.value!);
    const { code, cookie } = res;
    if (code === 800) {
      refreshQrCode();
    }
    qrCodeDesc.value =
      code === 801
        ? CODEMESSAGE.CODEMSG_801
        : code === 802
        ? CODEMESSAGE.CODEMSG_802
        : CODEMESSAGE.CODEMSG_803;
    if (code === 803) {
      clearInterval(interval);
      userStore.userLogin(cookie);
      await userStore.fetchUserAccount();
      await userStore.fetchUserPlayList();
      router.push({ name: "library" });
    }
  }, 1000);
}

defineExpose({
  refreshQrCode,
});

onMounted(() => {
  refreshQrCode();
});
</script>

<style scoped lang="scss">
.container {
  height: 90vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .qrcode-container {
    background-color: rgba(134, 134, 134, 0.1);
    height: 200px;
    width: 200px;
    border-radius: 12px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 20px auto;
  }

  .qrScanDesc {
    margin-bottom: 3px;

    > button {
      border: none;
      padding: 3px;
      background-color: transparent;

      > i {
        color: rgba($color: #000000, $alpha: 0.3);
      }

      &:active {
        transform: scale(0.8);
      }
    }
  }

  .iconfont {
    font-size: 60px;
    color: #d81e06;
  }

  .title {
    font-size: 26px;
  }

  .tips {
    font-size: 12px;
    color: #b0b0b0;
  }
}
</style>
