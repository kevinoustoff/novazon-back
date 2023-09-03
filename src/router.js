import * as VueRouter from 'vue-router'
import login from './Pages/login/index.vue'
import Signin from '@/Pages/Signin.vue'

const router = VueRouter.createRouter({
    history: VueRouter.createWebHistory(),
    routes: [
        {
            path: '/login',
            component: Signin
        },
      ]
})
export default router;