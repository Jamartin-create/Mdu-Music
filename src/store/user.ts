import { defineStore } from 'pinia'
import { UserState } from './interface'
import { fetchUserAccount, fetchUserPlayList } from '../api/user'
import { setCookies, doLogout } from '../utils/auth'
import piniaPersistConfig from '../config/piniaPersist'
import { SysStore } from './sys'
import router from '../router'

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
            try {
                const res: any = await fetchUserAccount();
                if (res.code === 200 && res.account != null) {
                    this.profile = res.profile;
                    this.loginMode = "ACCOUNT";
                } else {
                    const sysStore = SysStore();
                    sysStore.showSeconds(3000, "获取账号信息失败，请重新登录");
                    doLogout();
                    router.push({ name: 'login' });
                }
            } catch (e) {
                console.error(e);
            }
        },
        async fetchUserPlayList() {
            try {
                const res: any = await fetchUserPlayList(this.profile.userId);
                this.likedPlayListId = res.playlist[0].id;
            } catch (e) {
                console.error(e);
            }
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