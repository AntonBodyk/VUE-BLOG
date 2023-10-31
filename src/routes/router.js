import MainPage from '@/pages/MainPage';
import PostPage from '@/pages/PostPage';
import SignPage from '@/pages/SignPage';
import NotFoundPage from '@/pages/NotFoundPage';
import AdminPage from '@/pages/AdminPage';

import RegistrationPage from '@/pages/RegistrationPage';
import { createRouter, createWebHashHistory } from 'vue-router';
import { useUserStore } from '@/store/user';

function adminRouteGuard(to, from, next) {
  const userStore = useUserStore(); 
  const userRole = userStore.user ? userStore.user.role : null;
  console.log(userRole);
  if (userRole === 'admin') {
    next();
  } else {
    next('/:pathMatch(.*)*');
    alert('Вы не являетесь админом!');
  }
}

const routes = [
    {
      path: '/',
      component: MainPage
    },
    {
      path: '/sign',
      component: SignPage
    },
    {
      path: '/registration',
      component: RegistrationPage
    },
    {
        path: '/:id',
        component: PostPage,
    },
    {
        path: '/:pathMatch(.*)*',
        component: NotFoundPage
    },
    {
      path: '/admin',
      component: AdminPage,
      beforeEnter: adminRouteGuard, 
    },
  ];

const router = createRouter({
    routes,
    history: createWebHashHistory(process.env.BASE_URL)
})

export default router;