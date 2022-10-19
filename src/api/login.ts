import {createAxiosInstance} from '../utils/request'

const request = createAxiosInstance()

//获取生成二维码的key
export const qrKey = () => {
    return request.get('/login/qr/key')
}