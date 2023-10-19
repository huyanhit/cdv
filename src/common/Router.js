import {createRouter, createWebHistory} from 'vue-router';
import {useCookies} from 'vue3-cookies';
const routes = [
    {
        path: '',
        component: () => import('../views/layouts/Main.vue'),
        // beforeEnter: (to, from, next) => {
        //     const {cookies}  = useCookies();
        //     let access_token = cookies.get('access_token')
        //     if (access_token === null) {
        //         next('login')
        //     } 
        //     next();
        // },
        children: [{
            path: '', 
            name: 'home',
            component: () => import('../views/pages/Home.vue'),
            children: [{
                path: 'home',
                name: 'home',
            }],
        },{
            path: '/nhom/:name',
            name: 'category',
            component: () => import('../views/pages/Category.vue'),
        }]
    },
    {
        path: '/login',
        name: 'login',
        component: () => import('../views/pages/auth/Login.vue')
    },
    {
        path: '/logout',
        name: 'logout',
        component:  () => import('../views/pages/auth/Logout.vue')
    },
    {
        path: '/register',
        name: 'register',
        component:  () => import('../views/pages/auth/Register.vue')
    },
    {
        path: '/chinh-sua/:name/:id',
        name: 'setup',
        component: () => import('../views/layouts/PageSetup.vue'),
        children: [{
            path: '', 
            name: 'setup',
            component: () => import('../views/pages/PageSetup.vue'),
        }]
    },
    {
        path: '/:name/:id',
        name: 'page',
        component: () => import('../views/layouts/Page.vue'),
        children: [{
            path: '', 
            name: 'page',
            component: () => import('../views/pages/Page.vue'),
        }]
    },
    {
        path: '/init',
        name: 'default',
        component: () => import('../views/layouts/PageInit.vue'),
        children: [{
            path: '', 
            name: 'default',
            component: () => import('../views/pages/PageInit.vue'),
            children: [{
                path: ':layout_id/:theme_id', 
                name: 'default',
                component: () => import('../views/pages/PageInit.vue'),
            }]
        }]
    },
    
]

const router = createRouter({
    history: createWebHistory(),
    routes: routes,
})

export default router