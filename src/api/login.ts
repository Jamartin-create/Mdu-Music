import {createAxiosInstance} from '../utils/request'

const request = createAxiosInstance()

//获取生成二维码的key
export const qrKey = () => {
    return request({
        url: `/login/qr/key?timestamp`,
        method: 'get',
        params: {
          timestamp: new Date().getTime(),
        },
    })
}

//检测二维码状态
export const checkQrKey = (key:string) => {
    return request({
        url: `/login/qr/check?key=${key}`,
        method: 'get',
        params: {
          timestamp: new Date().getTime(),
        },
    })
}