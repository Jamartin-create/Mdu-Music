export interface UserState {
    profile: object;
    likedPlayListId: string;
    loginMode: "ACCOUNT" | "CUSTOM" | "NOTLOGIN";
}