import { defineStore } from 'pinia'
import { CircleMode, MusicState, SongInfo } from './interface'
import { fetchMusicUrl, fetchMusicDetail, checkMusicUseful } from '../api/music'
import piniaPersistConfig from '../config/piniaPersist'
import { SysStore } from './sys'


export const MusicStore = defineStore({
    id: "MusicStore",
    state: (): MusicState => ({
        curSong: null,
        curPlayList: [],
        curPlayListId: null,
        songLevel: 'standard',
        player: {
            play: false,
            circleMode: 'LISTCIRCLE',
        }
    }),
    getters: {
        songUrl: (state) => {
            const songInfo = state.curSong as SongInfo;
            return songInfo.url;
        },
        playing: (state) => state.player.play,
        circleMode: (state) => state.player.circleMode
    },
    actions: {
        async changeMusic(musicId: number) {
            if (musicId == this.curSong?.id) return;
            const isUse: any = await checkMusicUseful(musicId);
            if (!isUse.success) {
                const sysStore = SysStore();
                sysStore.showSeconds(3000, "暂无版权")
                return;
            }
            const detailRes: any = await fetchMusicDetail(musicId)
            const urlRes: any = await fetchMusicUrl({
                id: musicId,
                level: this.songLevel
            });
            const { songs } = detailRes;
            const songInfo: SongInfo = {
                id: songs[0].id,
                url: urlRes.data[0].url,
                name: songs[0].name,
                duration: songs[0].dt,
                picUrl: songs[0].picUrl,
                album: {
                    id: songs[0].al.id,
                    name: songs[0].al.name,
                },
                alia: songs[0].alia,
                artists: songs[0].ar.map((item: any) => {
                    return { id: item.id, name: item.name }
                })
            }
            this.curSong = songInfo;
        },
        changePlayList(playList: any[], playListId: number) {
            this.curPlayList = playList;
            this.curPlayListId = playListId;
        },
        changeCircleMode(circleMode: CircleMode) {
            this.player.circleMode = circleMode;
        },
        play() {
            this.player.play = true;
        },
        pause() {
            this.player.play = false;
        }
    },
    persist: piniaPersistConfig("MusicState")
})
