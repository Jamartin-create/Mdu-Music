import {createAxiosInstance} from '../utils/request'

const request = createAxiosInstance()

//获取生成二维码的key
export const qrKey = () => {
    return request.get('/login/qr/key')
}

//检测二维码状态
export const checkQrKey = (key:string) => {
    return request({
        url: `/login/qr/check?key=${key}`,
        method: 'get'
    })
}