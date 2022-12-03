import { SysStore } from "../store/sys";

/**
 * @description 获取系统状态属性
 * @return {Function} showMessage 提示控件
 */
export function useSystemTools() {
    const sysStore = SysStore()
    return {
        showMessage: (msg: string) => {
            sysStore.showSeconds(3000, msg)
        }
    }
}