import { createRouter, createWebHashHistory } from 'vue-router'
import HomePage from '@/views/home/HomePage.vue'
import ApplyPage from '@/views/applies/ApplyPage.vue'
import CirclePage from '@/views/circle/CirclePage.vue'
import LoginPage from '@/views/login/LoginPage.vue'
import RegisterPage from '@/views/login/RegisterPage.vue'
import TopicPage from '@/views/topic/TopicPage.vue'
import UserPage from '@/views/user/UserPage.vue'
import ShopPage from '@/views/shop/ShopPage.vue'
import TomatoClock from '@/views/applies/TomatoClock.vue'
import RestTime from '@/views/home/RestTime.vue'
import ArticlePage from '@/views/home/ArticlePage.vue'

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/home'
    },
    {
      path: '/home',
      component: HomePage
    },
    {
      path: '/tomato',
      component: TomatoClock
    },
    {
      path: '/rest',
      component: RestTime
    },
    {
      path: '/shop',
      component: ShopPage
    },
    {
      path: '/article',
      component: ArticlePage
    },
    {
      path: '/login',
      component: LoginPage
    },
    {
      path: '/register',
      component: RegisterPage
    },
    {
      path: '/apply',
      component: ApplyPage
    },
    {
      path: '/circle',
      component: CirclePage
    },
    {
      path: '/topic',
      component: TopicPage
    },
    {
      path: '/user',
      component: UserPage
    }
  ]
})

export default router
