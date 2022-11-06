/**
 * @description 获取歌单详情请求参数
 * @param id 歌单id
 * @param s 歌单最近的s个收藏者
 */
export interface PlayListDetailParams {
    id: number;
    s?: number;
}

/**
 * @description 分页获取歌单所有歌曲
 */
export interface PlayListPageParams {
    id: number;
    limit?: number;
    offset?: number;
}
/**
 * @description 调用searchByKeywords时所需参数
 * @param keywords 搜索关键词
 * @param limit 返回数量，默认为30
 * @param offset 偏移数量，用于分页，默认为0
 * @param type
 */
export interface MusicKeyWordsParam {
    keywords: string;
    limit?: number;
    offset?: number;
    type?: SearchType;
}
/**
 * @description 查询的类型
 *  1: 单曲
 *  10: 专辑
 *  100: 歌手
 *  1000: 歌单
 *  1002: 用户
 *  1004: MV
 *  1006: 歌词
 *  1009: 电台
 *  1014: 视频
 *  1018:综合
 *  2000:声音
 */
export type SearchType = 1 | 10 | 100 | 1000 | 1002 | 1004 | 1006 | 1009 | 1014 | 1018 | 2000;


/**
 * @description 获取音乐链接
 * @param id 音乐id
 * @param level 音乐格式
 */
export interface MusicFetchUrlParams {
    id: number;
    level: MusicLevelType;
}
/**
 * @description 获取的音乐流的品质格式
 * standard => 标准, exhigh=>极高, lossless=>无损, hires=>Hi-Res
 */
export type MusicLevelType = "standard" | "exhigh" | "lossless" | "hires";