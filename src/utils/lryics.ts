export const parseLryic = (lryics: string) => {
    const timeLine: any[] = []
    const lyric: any[] = []
    lryics.split('\n').forEach(item => {
        const sp = item.split(']')
        timeLine.push(
            timeTranslate(sp[0].slice(1, sp[0].length))
        );
        lyric.push(sp[1])
    })
    return {
        timeLine: timeLine.filter(item => !isNaN(item)),
        lyric: lyric.filter(item => item)
    }
}

function timeTranslate(time: string): number {
    const tr: string[] = time.split('.');
    const min: number = parseInt(tr[0].split(':')[0]);
    const sec: number = parseInt(tr[0].split(':')[1]);
    let sum = 0;
    sum += parseInt(tr[1])
    sum += min * 60 * 1000;
    sum += sec * 100
    return sum;
}