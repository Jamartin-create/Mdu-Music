import { createRouter, createWebHashHistory } from 'vue-router'
import { isLogin } from '../utils/auth'
import { SysStore } from '../store/sys'
import routes from './routes'

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

router.beforeEach((to, from, next) => {
    const sysStore = SysStore();
    if (to.meta.requireLogin && !isLogin()) {
        sysStore.showSeconds(3000, "该操作需要登录哦!")
        next({ name: 'login' })
    } else {
        next();
    }
})

export default router;