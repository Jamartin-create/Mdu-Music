import QRCode from "qrcode";

export type Color = {
    dark: string;
    light: string;
}

export interface QROption {
    width: number;
    color: Color;
    type: string;
}

export async function generatorQrCode(unikey: string, option: QROption): Promise<string> {
    try {
        console.log(unikey)
        const svg = await QRCode.toString(
            `https://music.163.com/login?codekey=${unikey}`,
            option
        );
        return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
    } catch (e) {
        console.error(e);
        return 'error';
    }
};
