import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import { useUserStore } from '@/store/user'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    beforeEnter: (to, from, next) => {
      const store = useUserStore()

      if (store.isLogged()) next()
      else next('/login')
    },
    component: () => import('../views/Home.vue')
  },
  {
    path: '/login',
    name: 'Login',
    beforeEnter: (_to, _from, next) => {
        const store = useUserStore()
        const user  = localStorage.getItem('user')

        if (user) {
            store.login(JSON.parse(user) as {
                name: string,
                account: string,
                from: string
            })
        }

        if (store.isLogged()) next('/')
        else next()
    },
    component: () => import('../views/Login.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
