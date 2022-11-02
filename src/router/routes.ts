export default [
    {
        path: '/',
        name: 'home',
        component: () => import('../view/Home/index.vue')
    }, {
        path: '/library',
        name: 'library',
        component: () => import('../view/Library/index.vue')
    }, {
        path: '/login',
        name: 'login',
        component: () => import('../view/Login/index.vue')
    }, {
        path: '/search',
        name: 'search',
        component: () => import('../view/Search/index.vue')
    }
]