import { createRouter, createWebHashHistory } from 'vue-router'
import GuidePage from '@/views/guide/GuidePage.vue'
import HomePage from '@/views/home/HomePage.vue'
import ApplyPage from '@/views/applies/ApplyPage.vue'
import AccountPage from '@/views/applies/AccountPage.vue'
import DrinkWater from '@/views/applies/DrinkWater.vue'
import DrinkStats from '@/views/applies/DrinkStats.vue'
import DrinkSettingsPage from '@/views/applies/DrinkSettingsPage.vue'
import CirclePage from '@/views/circle/CirclePage.vue'
import LoginPage from '@/views/login/LoginPage.vue'
import RegisterPage from '@/views/login/RegisterPage.vue'
import ModifyPasswordPage from '@/views/login/ModifyPasswordPage.vue'
import TopicPage from '@/views/topic/TopicPage.vue'
import UserPage from '@/views/user/UserPage.vue'
import ShopPage from '@/views/shop/ShopPage.vue'
import RestTime from '@/views/home/RestTime.vue'
import PostComments from '@/views/circle/PostComments.vue'
import ArticlePage from '@/views/home/ArticlePage.vue'

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/guide'
    },
    {
      path: '/guide',
      component: GuidePage
    },
    {
      path: '/home',
      component: HomePage
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
      path: '/modify',
      component: ModifyPasswordPage
    },
    {
      path: '/apply',
      component: ApplyPage
    },
    {
      path: '/apply/account',
      component: AccountPage
    },
    {
      path: '/apply/drink',
      component: DrinkWater
    },
    { path: '/apply/drink/stats', component: DrinkStats },
    { path: '/apply/drink/settings', component: DrinkSettingsPage },
    {
      path: '/circle',
      component: CirclePage
    },
    {
      path: '/comments/:postId',
      name: 'PostComments',
      component: PostComments,
      props: true
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
