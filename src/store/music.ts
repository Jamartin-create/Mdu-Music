import { defineStore } from 'pinia'
import { MusicState } from './interface'
import piniaPersistConfig from '../config/piniaPersist'
import { searchByKeyWords } from '../api/music'


export const MusicStore = defineStore({
    id: "MusicStore",
    state: (): MusicState => ({
        searchPage: {
            limit: 30,
            offset: 0
        },
        curPlayList: [],
        curPlayListId: null,
    }),
    getters: {},
    actions: {
        async searchMusic(keywords: string) {
            try {
                const res = await searchByKeyWords({ keywords });
                console.log(res);
            } catch (e) {
                console.error(e);
            }
        }
    },
    persist: piniaPersistConfig("MusicState")
})
