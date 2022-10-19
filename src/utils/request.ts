import axios, {AxiosInstance, AxiosRequestConfig} from 'axios'

/**
 * 请求成功拦截器
 * @param config 
 * @returns 
 */
function requestInceptorsSuccess(config: any){
    console.log("请求成功config:", config)
    return config
}

/**
 * 请求失败拦截器
 * @param error 
 * @returns 
 */
function requestInceptorsError(error:any){
    console.log("请求失败:", error)
    return Promise.reject(error)
}

/**
 * 响应成功拦截器
 * @param response 
 * @returns 
 */
function responseInceptorsSuccess(response:any){
    console.log("响应response：", response);
    return response.data
}

/**
 * 响应失败拦截器
 * @param error 
 * @returns 
 */
function responseInceptorsError(error: any){
    console.log("响应失败", error);
    if(
        error.response &&
        typeof error.response.data === 'object' &&
        error.response.data.code === 301
    ){
        console.warn("token已失效，请重新登录")
    }
    return Promise.reject(error)
}

export const createAxiosInstance = ( config?: AxiosRequestConfig):AxiosInstance => {
    //基础配置
    const instance = axios.create({
        baseURL: import.meta.env.VITE_RES_URL,
        timeout: 15000,
        withCredentials: true,
        ...config
    })

    //请求拦截器
    instance.interceptors.request.use(
        requestInceptorsSuccess,
        requestInceptorsError
    )

    //响应拦截器
    instance.interceptors.response.use(
        responseInceptorsSuccess,
        responseInceptorsError
    )

    return instance;
}