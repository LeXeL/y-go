import Vue from 'vue'
import VueRouter from 'vue-router'

//Layouts
import Dashboard from '@/layouts/Dashboard'
import Auth from '@/layouts/Auth'
import Landing from '@/layouts/Landing'
import User from '@/layouts/User'

//Views
import DashboardIndex from '@/views/Dashboard/Index'
import PackageManager from '@/views/Dashboard/PackageManager'
import InvoiceManager from '@/views/Dashboard/InvoiceManager'
import UsersManager from '@/views/Dashboard/UsersManager'
import Reports from '@/views/Dashboard/Reports'
import PackageRegister from '@/views/Dashboard/PackageRegister'
import UserDetails from '@/views/Dashboard/UserDetails'
import InvoiceDetails from '@/views/Dashboard/InvoiceDetails'
import Login from '@/views/Auth/Login'
import EmailVerification from '@/views/Auth/EmailVerification'
import ForgotPassword from '@/views/Auth/ForgotPassword'
import ResetPassword from '@/views/Auth/ResetPassword'
import Home from '@/views/Landing/Home'
import Rates from '@/views/Landing/Rates'
import YgoRecycle from '@/views/Landing/YgoRecycle'

import store from '@/store'

Vue.use(VueRouter)

const ifAuthenticated = (to, from, next) => {
    if (store.getters.isAuthenticated) {
        next()
    } else next('/login')
}
const ifAuthenticatedAndAdmin = (to, from, next) => {
    if (store.getters.isAuthenticated && store.getters.role === 'admin') {
        next()
    } else next('/')
}

const routes = [
    {
        path: '/admin',
        component: Dashboard,
        beforeEnter: ifAuthenticatedAndAdmin,
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
                path: '/invoice-details/:id',
                name: 'InvoiceDetails',
                component: InvoiceDetails,
            },
            {
                path: '/users-manager',
                name: 'UsersManager',
                component: UsersManager,
            },
            {
                path: '/user-details/:id',
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
                path: '/login',
                name: 'Login',
                component: Login,
            },
            // {
            //     path: '/emailverification',
            //     component: EmailVerification,
            // },
            {
                path: '/forgot-password',
                component: ForgotPassword,
            },
            // {
            //     path: '/reset-password',
            //     component: ResetPassword
            // }
        ],
    },

    {
        path: '/',
        component: Landing,
        children: [
            {
                path: '/',
                name: 'LandingHome',
                component: Home,
            },
            {
                path: '/tarifas',
                name: 'Tarfias',
                component: Rates,
            },
            {
                path: '/ygo-reciclando',
                name: 'Ygo-Reciclando',
                component: YgoRecycle,
            },
        ],
    },
    {
        path: '/user',
        component: User,
        beforeEnter: ifAuthenticated,
    },
    {
        path: '/profile',
        component: User,
        beforeEnter: ifAuthenticated,
    },
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes,
})

export default router
