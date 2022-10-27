import { defineStore } from 'pinia'
import { UserState } from './interface'
import { setCookies } from '../utils/auth'

export const UserStore = defineStore({
    id: "UserStore",
    state: (): UserState => ({
        profile: {},
        likedPlayListId: '',
        loginMode: "NOTLOGIN"
    }),
    getters: {},
    actions: {
        userLogin(cookieString: string) {
            setCookies(cookieString);
        },
        reset() {
            this.$reset();
        }
    }
})