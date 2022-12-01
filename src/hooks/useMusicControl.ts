import { ref, watch, WatchOptions, nextTick } from "vue";
import { MusicStore } from "../store/music";

/**
 * @description 音乐仓库的监听器
 * @return {Function} watchMusicChange 当音乐切换时触发
 * @return {Function} watchCurSongPassChange 当音乐进度改变时处罚
 * @return {Function} watchPlayingStatus 当音乐播放状态改变时触发
 * @return {Function} watchMusicChangePosition 当音乐播放播放位置被手动改变时触发改变时触发
 */
export function useMusicListener() {
    const musicStore = MusicStore();
    const watchMusicChange = (callback: Function, option?: WatchOptions) => {
        watch(() => musicStore.curSong?.id, (nv: any, ov: any) => {
            callback(nv, ov)
        }, option)
    }
    const watchCurSongPassChange = (callback: Function, option?: WatchOptions) => {
        watch(() => musicStore.curSongPassChangeValue, (nv: any, ov: any) => {
            callback(nv, ov)
        }, option)
    }
    const watchPlayingStatus = (callback: Function, option?: WatchOptions) => {
        watch(() => musicStore.player.play, (nv: any, ov: any) => {
            callback(nv, ov)
        }, option)
    }
    const watchMusicChangePosition = (callback: Function, option?: WatchOptions) => {
        watch(() => musicStore.curSong?.passDuration, (nv: any, ov: any) => {
            callback(nv, ov)
        }, option)
    }
    return {
        watchMusicChange,
        watchCurSongPassChange,
        watchPlayingStatus,
        watchMusicChangePosition
    }
}


/**
 * @description 控制歌曲播放进度Hook
 * @return {String} curMusicUrl 当前播放歌曲链接
 * @return {Number} musicProcess 实时监听歌曲播放进度，更新进度条
 * @return {Number} curProcess 歌曲播放进度，毫秒
 * @return {Function} nextMusic 下一首
 * @return {Function} prevMusic 上一首
 * @return {Function} playMusic 播放
 * @return {Function} pauseMuisc 暂停
 * @return {Function} tooglePlayPause 切换播放暂停状态
 * @return {Function} processPositionChange  当手动点击进度条后出发该事件
 */
export function useMusicController() {
    const musicStore = MusicStore();
    const { watchMusicChange, watchMusicChangePosition } = useMusicListener()
    const musicProcess = ref<number>(musicStore.curSong?.passDuration!);
    const curMusicUrl = ref<string>(musicStore.curSong?.url!);
    const curProcess = ref<number>(musicProcess.value * musicStore.curSong?.duration!)
    watchMusicChangePosition((nv: any, ov: any) => {
        musicProcess.value = nv;
        curProcess.value = nv * musicStore.curSong?.duration!
    }, { immediate: true });
    watchMusicChange(() => {
        curMusicUrl.value = musicStore.songUrl;
        nextTick(() => { musicStore.pause(); musicStore.play(); });
    }, { deep: true });
    return {
        curMusicUrl,
        curProcess,
        musicProcess,
        nextMusic: () => { musicStore.next() },
        prevMusic: () => { musicStore.prev() },
        playMusic: () => { musicStore.play() },
        pauseMuisc: () => { musicStore.pause() },
        tooglePlayPause: () => { musicStore.playing ? musicStore.pause() : musicStore.play() },
        changeMusicPosition: (percentage: number) => {
            musicStore.changeDuration(percentage)
        },
        processPositionChange: (percentage: number) => {
            musicStore.curSongPassChangeValue = percentage;
        },
    }
}