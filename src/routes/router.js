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
// const routes = [
//     {
//         path: '/',
//         component: MainPage
//     },
//     {
//         path: '/:id',
//         component: PostPage
//     },
//     {
//         path: '/sign',
//         component: SignPage
//     },
//     {
//         path: '/registration',
//         component: RegistrationPage
//     },
// ]
// const router = createRouter({
//     routes,
//     history: createWebHashHistory(process.env.BASE_URL)
    
//   });
  
//   router.beforeEach((to, from, next) => {
//     // Check if the user is authenticated
//     if (to.path !== '/sign' && !isAuthenticated()) {
//       next('/sign'); // Redirect to the login page if not authenticated
//     } else {
//       next(); // Allow access to the route
//     }
//   });