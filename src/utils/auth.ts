import { UserStore } from '../store/user'
import { logOut } from '../api/login'
import Cookies from 'js-cookie'

export function setCookies(cookieString: string): void {
    const cookies = cookieString.split("; HTTPOnly;");
    cookies.forEach(cookie => {
        document.cookie = cookie;
        const cookieKeyValue = cookie.split(";")[0].split("=");
        localStorage.setItem(`cookie-${cookieKeyValue[0]}`, cookieKeyValue[1]);
    })
}

export function getCookie(key: string) {
    return Cookies.get(key) ?? localStorage.getItem(`cookie-${key}`)
}

export function removeCookie(key: string): void {
    Cookies.remove(key);
    localStorage.removeItem(`cookie-${key}`)
}

export function isLogin(): boolean {
    const userStore = UserStore();
    return userStore.loginMode === "ACCOUNT";
}

//登出
export function doLogout(): void {
    logOut();
    removeCookie('MUSIC_U');
    removeCookie('__csrf');
    const userStore = UserStore();
    userStore.reset();
}