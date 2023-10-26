import * as VueRouter from 'vue-router'
import login from './Pages/login/index.vue'
import Signin from '@/Pages/Signin.vue'
import RelaisListing from '@/Pages/relais/RelaisListing.vue'
import CustomersListing from '@/Pages/customers/CustomersListing.vue' 
import Dashboard from '@/Pages/dashboards/index.vue'
import CommandesListing from '@/Pages/commandes/index.vue'
import CommandesDetails from '@/Pages/commandes/details.vue'

const router = VueRouter.createRouter({
    history: VueRouter.createWebHistory(),
    routes: [
        {
            path: '/login',
            component: Signin,
            name: 'login'
        },
        {
            path: '/relais',
            component: RelaisListing,
            name: 'relais'
        },
        {
            path: '/customers',
            component: CustomersListing,
            name: 'customers'
        },
        {
            path: '/dashboard',
            component: Dashboard,
            name: 'dashboard'
        },
        {
            path: '/',
            component: Dashboard,
            name: 'index' 
        },
        {
            path: '/commandes',
            component: CommandesListing,
            name: 'commandes' 
        },
        {
            path: '/commandes/details/:id',
            component: CommandesDetails,
            name: 'commandesDet' 
        }
      ]
})
export default router;