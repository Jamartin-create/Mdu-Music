import request from '../utils/request'
import { MusicKeyWordsParam } from './interface/music'

/**
 * @description 根据关键词搜索
 * @param params 
 * @returns 
 */
export const searchByKeyWords = async (params: MusicKeyWordsParam) => {
    return request({
        url: '/search',
        method: 'get',
        params
    })
}