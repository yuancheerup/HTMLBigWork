import { createRouter, createWebHashHistory } from 'vue-router'
import GuidePage from '@/views/guide/GuidePage.vue'
import HomePage from '@/views/home/HomePage.vue'
import FruitVegetable from '@/views/home/FruitVegetable.vue'
import LifeSkill from '@/views/home/LifeSkill.vue'
import KeepHealthy from '@/views/home/KeepHealthy.vue'
import RestTime from '@/views/home/RestTime.vue'
import Music from '@/views/home/components/Music.vue'
import ApplyPage from '@/views/applies/ApplyPage.vue'
import AccountPage from '@/views/applies/AccountPage.vue'
import StatisticPage from '@/views/applies/accountComponents/StatisticPage.vue'
import DrinkWater from '@/views/applies/DrinkWater.vue'
import DrinkStats from '@/views/applies/drinkComponents/DrinkStats.vue'
import DrinkSettingsPage from '@/views/applies/drinkComponents/DrinkSettingsPage.vue'
import WeatherPage from '@/views/applies/WeatherPage.vue'
import DiaryPage from '@/views/applies/DiaryPage.vue'
import MemorialDay from '@/views/applies/MemorialDay.vue'
import DailySchedule from '@/views/applies/DailySchedule.vue'
import CirclePage from '@/views/circle/CirclePage.vue'
import LoginPage from '@/views/login/LoginPage.vue'
import RegisterPage from '@/views/login/RegisterPage.vue'
import ModifyPasswordPage from '@/views/login/ModifyPasswordPage.vue'
import TopicPage from '@/views/topic/TopicPage.vue'
import UserPage from '@/views/user/UserPage.vue'
import SettingPage from '@/views/user/SettingPage.vue'
import MyMessage from '@/views/user/MyMessage.vue'
import Service from '@/views/user/Service.vue'
import PostComments from '@/views/circle/PostComments.vue'
import ArticlePage from '@/views/home/ArticlePage.vue'
import PlayVideo from '@/views/home/components/PlayVedio.vue'
import AlbumPage from '@/views/applies/AlbumPage.vue'
import CipherBoxPage from '@/views/applies/CipherBoxPage.vue'
import SpringPage from '@/views/home/components/SpringPage.vue'

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
      path: '/fruit',
      component: FruitVegetable,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/life',
      component: LifeSkill,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/spring',
      component: SpringPage,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/play-video',
      name: 'PlayVideo',
      component: PlayVideo,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/healthy',
      component: KeepHealthy,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/rest',
      component: RestTime,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/music',
      component: Music,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/article',
      component: ArticlePage,
      meta: {
        requiresAuth: true
      }
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
      component: AccountPage,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/apply/account/statistics',
      component: StatisticPage,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/apply/drink',
      component: DrinkWater,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/apply/drink/stats',
      component: DrinkStats,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/apply/drink/settings',
      component: DrinkSettingsPage,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/apply/weather',
      component: WeatherPage,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/apply/memory',
      component: MemorialDay,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/apply/schedule',
      component: DailySchedule,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/apply/drink',
      component: DrinkWater,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/apply/diary',
      component: DiaryPage,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/apply/album',
      component: AlbumPage,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/apply/cipherBox',
      component: CipherBoxPage,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/circle',
      component: CirclePage,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/comments/:postId',
      name: 'PostComments',
      component: PostComments,
      props: true,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/topic',
      component: TopicPage,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/user',
      component: UserPage
    },
    {
      path: '/user/setting',
      component: SettingPage,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/user/message',
      component: MyMessage,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/user/service',
      component: Service,
      meta: {
        requiresAuth: true
      }
    }
  ]
})

// 拦截未登录用户
router.beforeEach((to, from, next) => {
  const user = JSON.parse(localStorage.getItem('user'))

  if (to.matched.some((record) => record.meta.requiresAuth) && !user) {
    next('/login')
  } else {
    next()
  }
})

export default router
