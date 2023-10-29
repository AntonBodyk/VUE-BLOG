import MainPage from '@/pages/MainPage';
import PostPage from '@/pages/PostPage';
import SignPage from '@/pages/SignPage';

import RegistrationPage from '@/pages/RegistrationPage';
import { createRouter, createWebHashHistory } from 'vue-router';

const routes = [
    {
        path: '/',
        component: MainPage
    },
    {
        path: '/:id',
        component: PostPage
    },
    {
        path: '/sign',
        component: SignPage
    },
    {
        path: '/registration',
        component: RegistrationPage
    },
]

const router = createRouter({
    routes,
    history: createWebHashHistory(process.env.BASE_URL)
})

export default router;