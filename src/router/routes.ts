export default [
    {
        path: '/',
        name: 'home',
        component: () => import('../view/Home/index.vue'),
        meta: {
            requireLogin: false,
        }
    }, {
        path: '/library',
        name: 'library',
        component: () => import('../view/Library/index.vue'),
        meta: {
            requireLogin: true,
        }
    }, {
        path: '/login',
        name: 'login',
        component: () => import('../view/Login/index.vue'),
        meta: {
            requireLogin: false,
        }
    }, {
        path: '/search',
        name: 'search',
        component: () => import('../view/Search/index.vue'),
        meta: {
            requireLogin: false,
        }
    }
]