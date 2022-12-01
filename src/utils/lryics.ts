import { Lyric } from "../store/interface"

/**
 * @description 解析歌词
 * @param lryics 
 * @returns 
 */
export const parseLryic = (lryics: string) => {
    const res: Lyric[] = []
    lryics.split('\n').forEach((item, index) => {
        const sp = item.split(']')
        res.push({
            time: timeTranslate(sp[0].slice(1, sp[0].length)),
            lyric: typeof sp[1] == "string" ? sp[1] : '',
            active: index === 0 ? true : false
        })
    })
    return res
}

/**
 * @description 歌词时间节点的时间转换为毫秒级别
 * @param time 
 * @returns 
 */
function timeTranslate(time: string): number {
    const tr: string[] = time.split('.');
    const min: number = parseInt(tr[0].split(':')[0]);
    const sec: number = parseInt(tr[0].split(':')[1]);
    let sum = 0;
    sum += parseInt(tr[1]);
    sum += min * 60 * 1000;
    sum += sec * 1000
    return isNaN(sum) ? new Date().getTime() : sum;
}