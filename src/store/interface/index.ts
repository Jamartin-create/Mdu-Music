export interface UserState {
    profile: any;
    likedPlayListId: string;
    loginMode: "ACCOUNT" | "CUSTOM" | "NOTLOGIN";
}

export interface SysState {
    toast: {
        show: boolean;
        title: string;
    }
}