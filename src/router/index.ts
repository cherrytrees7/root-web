import { createRouter, createWebHashHistory } from 'vue-router'
import { getLocal } from '@/common/js/utils';

const router = createRouter({
    history: createWebHashHistory(),
    routes: [
        {
            path: '/',
            redirect: '/home'
        },
        {
            path: '/home',
            name: 'home',
            component: () => import('@/views/Home.vue'),
            meta: {
                index: 1
            }
        },
        {
            path: '/login',
            name: 'login',
            component: () => import('@/views/Login.vue'),
            meta: {
                index: 1
            }
        },
        {
            path: '/history',
            name: 'history',
            component: () => import('@/views/History.vue'),
            meta: {
                index: 1
            }
        },
        {
            path: '/user',
            name: 'user',
            component: () => import('@/views/User.vue'),
            meta: {
                index: 1
            }
        },
    ]
})

router.beforeEach((to, from, next) => {
    const token = getLocal('token'); // 使用工具方法获取本地存储中的 token
    if (to.name !== 'login' && !token) {
        // 如果尝试访问的不是登录页面，并且没有 token，重定向到登录页面
        next({ name: 'login' });
    } else {
        // 如果访问的是登录页面，或者已有 token，继续路由导航
        next();
    }
});
export default router
