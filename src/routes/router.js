import MainPage from '@/pages/MainPage';
import PostPage from '@/pages/PostPage';
import SignPage from '@/pages/SignPage';
import AdminPage from '@/pages/AdminPage';
import CategoryPage from '@/pages/CategoryPage';
import NotFoundPage from '@/pages/NotFoundPage';
import RegistrationPage from '@/pages/RegistrationPage';
import { createRouter, createWebHistory } from 'vue-router';
import { useUserStore } from '@/store/user';
import { message } from 'ant-design-vue';

function adminRouteGuard(to, from, next) {
  const userStore = useUserStore(); 
  const userRole = userStore.user ? userStore.user.role : null;

  if (userRole === 'admin') {
    next();
  } else {
    next({name: 'NotFoundPage'});
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
      path: '/:pathMatch(.*)*',
      name: 'NotFoundPage',
      component: NotFoundPage,
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
    history: createWebHistory(process.env.BASE_URL)
})

export default router;