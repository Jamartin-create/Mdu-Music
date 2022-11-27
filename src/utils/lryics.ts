import { Lyric } from "../store/interface"
export const parseLryic = (lryics: string) => {
    const res: Lyric[] = []
    lryics.split('\n').forEach((item, index) => {
        const sp = item.split(']')
        res.push({
            time: timeTranslate(sp[0].slice(1, sp[0].length)),
            lyric: sp[1],
            active: index === 0 ? true : false
        })
    })
    return res
}

function timeTranslate(time: string): number {
    const tr: string[] = time.split('.');
    const min: number = parseInt(tr[0].split(':')[0]);
    const sec: number = parseInt(tr[0].split(':')[1]);
    let sum = 0;
    sum += parseInt(tr[1]);
    sum += min * 60 * 1000;
    sum += sec * 100
    return sum;
}