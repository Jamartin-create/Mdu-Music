import request from '../utils/request'

export const fetchUserAccount = () => {
    return request({
        method: 'get',
        url: '/user/account'
    })
}


export const fetchUserPlayList = (uid: number, limit?: number) => {
    return request({
        method: 'get',
        url: "/user/playlist",
        params: {
            uid,
        }
    })
}