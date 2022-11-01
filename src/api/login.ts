import request from '../utils/request'

//获取生成二维码的key
export const qrKey = () => {
  return request({
    url: `/login/qr/key`,
    method: 'get',
  })
}

//检测二维码状态
export const checkQrKey = (key: string) => {
  return request({
    url: `/login/qr/check?key=${key}`,
    method: 'get',
    headers: {
      isLoading: false
    }
  })
}

//登出
export const logOut = () => {
  return request({
    method: "get",
    url: "/logout",
  })
}