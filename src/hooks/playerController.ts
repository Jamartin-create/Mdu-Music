import { ref, watch } from "vue";
/**
 * @description 控制歌曲播放进度
 * @param musicStore 
 * @returns
 *  musicProcess 实时监听歌曲播放进度，更新进度条
 *  processPositionChange  当手动点击进度条后出发该事件
 */
export default function useProcessWatch(musicStore: any) {
    const musicProcess = ref<number>(musicStore.curSong?.passDuration!);
    watch(
        () => musicStore.curSong?.passDuration,
        (nv: any, ov: any) => { musicProcess.value = nv; },
        { immediate: true }
    );
    return {
        musicProcess,
        processPositionChange: (percentage: number) => {
            musicStore.curSongPassChangeValue = percentage;
        },
    }
}