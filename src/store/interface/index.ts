import { MusicLevelType } from '../../api/interface/music'

export interface UserState {
    profile: any;
    playList: any[];
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
    curSong: SongInfo | null;
    curPlayList: any[];
    curPlayListId: number | null;
    songLevel: MusicLevelType;
    player: {
        play: boolean;
        circleMode: CircleMode;
    }
}
export type SongInfo = {
    id: number;
    url: string;
    name: string;
    duration: number;
    passDuration: number;
    picUrl: string;
    album: {
        id: number;
        name: string;
        picUrl: string;
    };
    alia: string;
    artists: {
        id: number;
        name: string;
    }[]

};
export type CircleMode = 'SINGLECIRCLE' | 'LISTCIRCLE' | 'LISTRANDOM';