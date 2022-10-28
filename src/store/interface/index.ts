export interface UserState {
    profile: object;
    likedPlayListId: string;
    loginMode: "ACCOUNT" | "CUSTOM" | "NOTLOGIN";
}

export interface SysState {
    toast: {
        show: boolean;
        title: string;
    }
}