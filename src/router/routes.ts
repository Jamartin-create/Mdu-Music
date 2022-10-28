export default [
    {
        path: '/',
        name: 'library',
        component: () => import('../view/Library/index.vue')
    },
    {
        path: '/login',
        name: 'login',
        component: () => import('../view/Login/index.vue')
    }
]