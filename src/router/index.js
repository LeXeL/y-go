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
import Register from '@/views/Auth/Register'

import Home from '@/views/Landing/Home'
import UserHome from '@/views/Landing/UserHome'
import UserProfile from '@/views/Landing/UserProfile'

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
            {
                path: '/emailverification',
                component: EmailVerification,
            },
        ],
    },

    {
        path: '/',
        component: Landing,
        children: [
            {
                path: '/',
                name: 'Landing Home',
                component: Home,
            },
        ],
    },
    {
        path: '/user',
        component: User,
        children: [
            {
                path: '/user',
                name: 'User Home',
                component: UserHome,
            },
            {
                path: '/profile',
                name: 'User Profile',
                component: UserProfile,
            },
        ],
    },
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes,
})

export default router
