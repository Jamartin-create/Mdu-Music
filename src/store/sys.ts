import { defineStore } from 'pinia'
import { SysState } from './interface'

export const SysStore = defineStore({
    id: "SysStore",
    state: (): SysState => ({
        toast: {
            show: false,
            title: ''
        }
    }),
    getters: {
        show: (state) => state.toast.show,
        title: (state) => state.toast.title
    },
    actions: {
        showSeconds(delay: number, title: string) {
            this.toast.show = true;
            this.toast.title = title;
            setTimeout(() => {
                this.toast.show = false;
            }, delay)
        }
    }
})