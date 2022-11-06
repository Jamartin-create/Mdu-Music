import request from "../utils/request";

//轮播图
export const fetchBanner = () => {
    return request({
        url: "/banner",
        method: 'get',
    })
};


//推荐播放列表
export const fetchRecomPlayList = () => {
    return request({
        method: "get",
        url: "/personalized",
    });
};


//推荐新歌
export const fetchRecomNewSongs = (limit: number) => {
    return request({
        method: "get",
        url: "/personalized/newsong",
        params: {
            limit,
        },
    });
};