<!-- 控制条组件 -->
<template>
  <div
    ref="process"
    class="process"
    :class="processDraging ? 'active' : ''"
    :style="processStyle"
    @mouseup.stop="changeProcessPercentage"
    @click.stop=""
  >
    <div class="passed" :style="passedStyle"></div>
    <div
      class="dragger"
      :style="draggerStyle"
      @mousedown.stop="dragStart"
      @mouseup.stop="dragEnd"
    ></div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, CSSProperties, watch, onMounted } from "vue";
//进度条
const process = ref<HTMLElement>();
const emits = defineEmits(["change-position"]);
const props = withDefaults(
  defineProps<{
    width?: string;
    backgroundColor?: string;
    percentage?: number;
  }>(),
  {
    width: "100%",
    backgroundColor: "transparent",
  }
);
//拖拽状态
const processDraging = ref<boolean>(false);
const processStyle = reactive<CSSProperties>({
  width: props.width,
  backgroundColor: props.backgroundColor,
});
//进度
const draggerStyle = reactive<CSSProperties>({
  left: "0%",
});
const passedStyle = reactive<CSSProperties>({
  width: "0%",
});

//鼠标按下
function dragStart(e: MouseEvent) {
  processDraging.value = true;
  initMouseEventGlb();
}
//鼠标按下并移动
function dragMove(e: MouseEvent) {
  if (!processDraging.value) return;
  changeProcessPosition(computedProcess(e.clientX));
}
//鼠标抬起
function dragEnd(e: MouseEvent) {
  if (processDraging.value) changeProcessPercentage(e);
  processDraging.value = false;
  resetMouseEventGlb();
}
//拖拽结束或点击进度条后获取移动的比例（小数）
function changeProcessPercentage(e: MouseEvent) {
  emits("change-position", computedProcess(e.clientX));
}
//移动拖拽点和进度条的passed部分
function changeProcessPosition(percentage: number) {
  draggerStyle.left = percentage * 100 + "%";
  passedStyle.width = percentage * 100 + "%";
}
//计算当前的比例
function computedProcess(clientWidth: number): number {
  const processInfo = process.value?.getBoundingClientRect();
  const realWidth = clientWidth - processInfo?.left!;
  //获取当前整个组件的具体宽度
  const maxWidth: number = processInfo?.width! - 10;
  //如果超出屏幕左边界则为0，如果超出屏幕右边界则为最大值，否则为当前所在的横坐标位置与最大长度的比例
  return realWidth < 0 ? 0 : realWidth >= maxWidth ? 1 : realWidth / maxWidth;
}

function initMouseEventGlb() {
  window.onmousemove = dragMove;
  window.onmouseup = dragEnd;
}

function resetMouseEventGlb() {
  window.onmousemove = null;
  window.onmouseup = null;
}

//监听父组件对进度的控制
watch(
  () => props.percentage,
  (nv: any, ov: any) => {
    if (processDraging.value) return;
    changeProcessPosition(nv);
  }
);
</script>

<style scoped lang="scss">
.process {
  position: relative;
  height: 2px;
  .dragger {
    position: absolute;
    height: 12px;
    width: 12px;
    background-color: rgba($color: #fff, $alpha: 1);
    box-shadow: 0 1px 10px rgba($color: #000000, $alpha: 0.3);
    transform: translate(-50%, calc(-50% - 3px));
    border-radius: 50%;
    opacity: 0;
  }
  &.active,
  &:hover {
    .passed {
      height: 4px;
      transform: translateY(-1px);
    }
    .dragger {
      opacity: 1;
    }
  }
  .passed {
    height: 2px;
    border-radius: 1px;
    background-color: rgba(#000000, 0.6);
  }
}
</style>
