import request from "../utils/request";

//轮播图
export const fetchBanner = () => {
    return request({
        url: "/banner",
        method: 'get',
    })
};