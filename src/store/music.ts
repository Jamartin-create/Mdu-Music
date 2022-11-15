import { defineStore } from 'pinia'
import { CircleMode, MusicState, SongInfo } from './interface'
import { fetchMusicUrl, fetchMusicDetail, checkMusicUseful, fetchMusicLryic } from '../api/music'
import piniaPersistConfig from '../config/piniaPersist'
import { SysStore } from './sys'
import { parseLryic } from '../utils/lryics'


export const MusicStore = defineStore({
    id: "MusicStore",
    state: (): MusicState => ({
        curSong: null,
        curSongIdx: 0,
        curPlayList: [],
        curPlayListId: null,
        songLevel: 'standard',
        lyric: {
            timeLine: [],
            lyrics: [],
        },
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
        songPassed: (state) => {
            const songInfo = state.curSong as SongInfo;
            return songInfo.passDuration;
        },
        playing: (state) => state.player.play,
        circleMode: (state) => state.player.circleMode
    },
    actions: {
        async changeMusic(musicId: number) {
            const sysStore = SysStore();
            try {
                if (musicId == this.curSong?.id) return;
                this.fetchMusicLryic(musicId)
                const detailRes: any = await fetchMusicDetail(musicId)
                const isUse: any = await checkMusicUseful(musicId);
                if (!isUse.success) {
                    sysStore.showSeconds(3000, `歌曲 '${detailRes.songs[0].name}' 暂无版权`)
                    return false;
                }
                const urlRes: any = await fetchMusicUrl({
                    id: musicId,
                    level: this.songLevel
                });
                if (detailRes.code != 200 || detailRes.code != 200) {
                    sysStore.showSeconds(3000, "获取音乐信息异常")
                    return false;
                }
                const { songs } = detailRes;
                const songInfo: SongInfo = {
                    id: songs[0].id,
                    url: urlRes.data[0].url,
                    name: songs[0].name,
                    duration: songs[0].dt,
                    passDuration: 0,
                    picUrl: songs[0].picUrl,
                    album: {
                        id: songs[0].al.id,
                        name: songs[0].al.name,
                        picUrl: songs[0].al.picUrl
                    },
                    alia: songs[0].alia,
                    artists: songs[0].ar.map((item: any) => {
                        return { id: item.id, name: item.name }
                    })
                }
                this.curSong = songInfo;
                return true
            } catch (error) {
                console.error(error)
            }
        },
        async fetchMusicLryic(musicId: number) {
            try {
                const res: any = await fetchMusicLryic(musicId);
                const data = parseLryic(res.lrc.lyric);
                this.lyric.timeLine = data.timeLine
                this.lyric.lyrics = data.lyric
            } catch (error) {

            }
        },
        changePlayList(playList: any[], playListId: number, curSongIdx: number) {
            this.curPlayList = playList;
            this.curPlayListId = playListId;
            this.curSongIdx = curSongIdx;
        },
        changeCircleMode(circleMode: CircleMode) {
            this.player.circleMode = circleMode;
        },
        play() {
            this.player.play = true;
        },
        pause() {
            this.player.play = false;
        },
        async next() {
            this.curSongIdx = (this.curSongIdx + 1) % this.curPlayList.length;
            if (!await this.changeMusic(this.curPlayList[this.curSongIdx].id)) this.next()
        },
        async prev() {
            this.curSongIdx = (this.curSongIdx - 1 + this.curPlayList.length) % this.curPlayList.length;
            if (!await this.changeMusic(this.curPlayList[this.curSongIdx].id)) this.prev()
        },
        changeDuration(curDur: number) {
            this.curSong!.passDuration = curDur
        }
    },
    persist: piniaPersistConfig("MusicState")
})
