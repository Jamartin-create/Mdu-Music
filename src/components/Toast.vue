
<template>
    <Transition name="fade">
        <div class="toast" v-show="sysStore.show">{{ sysStore.title }}</div>
    </Transition>
</template>

<script setup lang="ts">
import { Transition } from 'vue';
import { SysStore } from '../store/sys'
const sysStore = SysStore();

</script>

<style scoped lang="scss">
$secondaryColor: var(--second-color);
$primaryColor: var(--primary-color);

.toast {
    position: fixed;
    font-weight: bolder;
    top: 2%;
    right: 2%;
    z-index: 1000;
    font-size: 16px;
    color: $primaryColor;
    background: $secondaryColor;
    box-shadow: 0 6px 12px -4px rgba(0, 0, 0, 0.08);
    border: 1px solid rgba(0, 0, 0, 0.06);
    backdrop-filter: blur(12px);
    border-radius: 8px;
    box-sizing: border-box;
    padding: 6px 12px;
}

body.dark #toast {
    backdrop-filter: blur(16px) contrast(120%);
    border: 1px solid rgba(255, 255, 255, 0.08);
}

.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.2s;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}
</style>
