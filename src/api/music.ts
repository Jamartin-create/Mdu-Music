import request from '../utils/request'
import { MusicFetchUrlParams, MusicKeyWordsParam, PlayListDetailParams, PlayListPageParams } from './interface/music'

/**
 * @description 根据关键词搜索
 */
export const searchByKeyWords = async (params: MusicKeyWordsParam) => {
    return request({ url: '/search', method: 'get', params })
}

/**
 * @description 获取音乐链接
 */
export const fetchMusicUrl = async (params: MusicFetchUrlParams) => {
    return request({ url: '/song/url/v1', method: 'get', params })
}

/**
 * @description 根据id获取音乐详情
 */
export const fetchMusicDetail = async (musicId: number) => {
    return request({ url: '/song/detail', method: 'get', params: { ids: musicId } })
}

/**
 * @description 检测音乐是否可用
 */
export const checkMusicUseful = async (musicId: number, br?: number) => {
    return request({ url: '/check/music', method: 'get', params: { id: musicId } })
}

/**
 * @description 获取歌单详情
 */
export const fetchPlayListSongs = async (params: PlayListPageParams) => {
    return request({ url: '/playlist/track/all', method: 'get', params })
}

/**
 * @description 获取歌单详情
 */
export const fetchPlayListDetails = async (params: PlayListDetailParams) => {
    return request({ url: '/playlist/detail', method: 'get', params })
}