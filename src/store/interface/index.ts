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

export interface MusicState {
    searchPage: {
        limit: number,
        offset: number,
    };
    curPlayList: any[];
    curPlayListId: number | null;
}