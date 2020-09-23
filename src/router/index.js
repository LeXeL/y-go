import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

//Layouts
import Dashboard from '@/layouts/Dashboard'
import Auth from '@/layouts/Auth'

//Views
import DashboardIndex from '@/views/Dashboard/Index'
import PackageManager from '@/views/Dashboard/PackageManager'
import InvoiceManager from '@/views/Dashboard/InvoiceManager'
import UsersManager from '@/views/Dashboard/UsersManager'
import Reports from '@/views/Dashboard/Reports'
import PackageRegister from '@/views/Dashboard/PackageRegister'
import UserDetails from '@/views/Dashboard/UserDetails'
import Login from '@/views/Auth/Login'
import InvoiceDetails from '@/views/Dashboard/InvoiceDetails'

Vue.use(VueRouter)

const routes = [
    {
        path: '/admin',
        component: Dashboard,
        children: [
            {
                path: '',
                name: 'DashboardIndex',
                component: DashboardIndex,
            },
            {
                path: '/package-manager',
                name: 'PackageManager',
                component: PackageManager,
            },
            {
                path: '/package-register',
                name: 'PackageRegister',
                component: PackageRegister,
            },
            {
                path: '/invoice-manager',
                name: 'InvoiceManager',
                component: InvoiceManager,
            },
            {
                path: '/invoice-details',
                name: 'InvoiceDetails',
                component: InvoiceDetails,
            },
            {
                path: '/users-manager',
                name: 'UsersManager',
                component: UsersManager,
            },
            {
                path: '/user-details',
                name: 'UserDetails',
                component: UserDetails,
            },
            {
                path: '/reports',
                name: 'Reports',
                component: Reports,
            },
        ],
    },
    {
        path: '/login',
        component: Auth,
        children: [
            {
                path: '',
                name: 'Login',
                component: Login,
            },
        ],
    },
    {
        path: '/',
        name: 'Home',
        component: Home,
    },
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes,
})

export default router
