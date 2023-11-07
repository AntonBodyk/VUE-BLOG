import MainPage from '@/pages/MainPage';
import PostPage from '@/pages/PostPage';
import SignPage from '@/pages/SignPage';
import AdminPage from '@/pages/AdminPage';
import CategoryPage from '@/pages/CategoryPage';

import RegistrationPage from '@/pages/RegistrationPage';
import { createRouter, createWebHashHistory } from 'vue-router';
import { useUserStore } from '@/store/user';
import { message } from 'ant-design-vue';

function adminRouteGuard(to, from, next) {
  const userStore = useUserStore(); 
  const userRole = userStore.user ? userStore.user.role : null;

  if (userRole === 'admin') {
    next();
  } else {
    next('/:pathMatch(.*)*');
    message.error('Вы не являетесь админом!');
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
      path: '/admin',
      component: AdminPage,
      beforeEnter: adminRouteGuard
    },
    {
      path: '/:id',
      component: PostPage
    },
    {
      path: '/categories/:category',
      component: CategoryPage
    }
  ];

const router = createRouter({
    routes,
    history: createWebHashHistory(process.env.BASE_URL)
})

export default router;