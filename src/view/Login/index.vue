<script setup lang="ts">
import GeneratorQr from "./components/GeneratorQr.vue";
import { nextTick, onMounted, onUnmounted, ref } from "vue";
import { checkQrKey, qrKey } from "../../api/login";

//获取unikey用于生成二维码
const qrkey = ref<string>("");
async function generatorKey() {
  const res = await qrKey();
  qrkey.value = res.data.unikey;
}

//调用子组件生成二维码
const qr = ref<InstanceType<typeof GeneratorQr>>();
async function reGenerator() {
  await generatorKey();
  qr.value?.generatorQrCode();
  setQrStatusInterval();
}

//获取二维码当前状态
const qrScanDesc = ref<string>("");
let timeInterval: any = null;
function setQrStatusInterval() {
  if (timeInterval != null) timeInterval = null;
  timeInterval = setInterval(() => {
    checkQrStatus();
  }, 400);
}
function clearQrStatusInterval() {
  clearInterval(timeInterval);
}
async function checkQrStatus() {
  console.log(qrkey.value);
  const res = await checkQrKey(qrkey.value);
  if (res.code === 800) {
    clearQrStatusInterval();
    reGenerator();
  } else if (res.code === 801) {
    qrScanDesc.value = "打开网易云音乐APP扫码登录";
  } else if (res.code === 802) {
    qrScanDesc.value = "扫描成功，请点击确认登陆";
  } else if (res.code === 803) {
    clearQrStatusInterval();
    qrScanDesc.value = "登录成功，请稍等...";
  }
}

onMounted(() => {
  reGenerator();
});
onUnmounted(() => {
  clearQrStatusInterval();
});
</script>

<template>
  <div class="container">
    <i class="iconfont icon-lil-netease"></i>
    <h1 class="title">登录网易云账号</h1>
    <div class="qrcode-container">
      <GeneratorQr ref="qr" :unikey="qrkey" :width="195" />
    </div>
    <div class="qrScanDesc">{{ qrScanDesc }}</div>
    <p class="tips">暂不支持手机登录和邮箱登录</p>
  </div>
</template>

<style scoped lang="scss">
.container {
  height: 100%;
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
