import { UserStore } from '../store/user'
import { logOut } from '../api/login'
import Cookies from 'js-cookie'
import { useRouter } from 'vue-router';

/**
 * @description 解析接口传来的Cookie
 * @param cookieString 
 */
export function setCookies(cookieString: string): void {
    const cookies = cookieString.split("; HTTPOnly;");
    cookies.forEach(cookie => {
        document.cookie = cookie;
        const cookieKeyValue = cookie.split(";")[0].split("=");
        localStorage.setItem(`cookie-${cookieKeyValue[0]}`, cookieKeyValue[1]);
    })
}

/**
 * @description 读取Cookie
 * @param key cookie key
 * @returns cookie value
 */
export function getCookie(key: string): any {
    return Cookies.get(key) ?? localStorage.getItem(`cookie-${key}`)
}

/**
 * @description 删除cookie
 * @param key 
 */
export function removeCookie(key: string): void {
    Cookies.remove(key);
    localStorage.removeItem(`cookie-${key}`)
}

/**
 * @description 检测当前是否登录
 * @returns Boolean
 */
export function isLogin(): boolean {
    const userStore = UserStore();
    return userStore.loginMode === "ACCOUNT";
}

/**
 * @description 登出
 */
export function doLogout(): void {
    logOut();
    removeCookie('MUSIC_U');
    removeCookie('__csrf');
    const userStore = UserStore();
    userStore.reset();
}