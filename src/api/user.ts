import { createAxiosInstance } from '../utils/request'
const request = createAxiosInstance();

export const fetchUserAccount = () => {
    return request({
        method: 'get',
        url: '/user/account'
    })
}