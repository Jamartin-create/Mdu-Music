import { defineStore } from 'pinia'
import { UserState } from './interface'
import { fetchUserAccount } from '../api/user'
import { setCookies } from '../utils/auth'
import piniaPersistConfig from '../config/piniaPersist'

export const UserStore = defineStore({
    id: "UserStore",
    state: (): UserState => ({
        profile: {},
        likedPlayListId: '',
        loginMode: "NOTLOGIN"
    }),
    getters: {},
    actions: {
        async fetchUserAccount() {
            const res: any = await fetchUserAccount();
            this.profile = res.profile
        },
        userLogin(cookieString: string) {
            setCookies(cookieString);
        },
        reset() {
            this.$reset();
        }
    },
    persist: piniaPersistConfig("UserState")
})