import router from '../router'
import { defineStore } from 'pinia'
import { UserState } from './interface'
import { setCookies, doLogout } from '../utils/auth'
import piniaPersistConfig from '../config/piniaPersist'
import { useSystemTools } from '../hooks/useSystemTools'
import { fetchUserAccount, fetchUserPlayList } from '../api/user'

export const UserStore = defineStore({
    id: "UserStore",
    state: (): UserState => ({
        profile: {},
        playList: [],
        likedPlayListId: '',
        loginMode: "NOTLOGIN"
    }),
    getters: {},
    actions: {
        //获取用户信息
        async fetchUserAccount() {
            try {
                const { showMessage } = useSystemTools()
                const res: any = await fetchUserAccount();
                if (res.code === 200 && res.account != null) {
                    this.profile = res.profile;
                    this.loginMode = "ACCOUNT";
                } else {
                    showMessage("获取账号信息失败，请重新登录");
                    doLogout();
                    router.push({ name: 'login' });
                }
            } catch (e: any) {
                console.error(e.message);
            }
        },
        //获取用户歌单信息
        async fetchUserPlayList() {
            try {
                const { showMessage } = useSystemTools()
                const res: any = await fetchUserPlayList(this.profile.userId);
                if (res.code === 200) {
                    this.likedPlayListId = res.playlist[0].id;
                    this.playList = res.playlist;
                } else {
                    showMessage("获取账号信息失败，请重新登录");
                    doLogout();
                    router.push({ name: 'login' });
                }
            } catch (e: any) {
                console.error(e.message);
            }
        },
        //用户登录
        userLogin(cookieString: string) {
            setCookies(cookieString);
        },
        reset() {
            this.$reset();
        }
    },
    persist: piniaPersistConfig("UserState")
})