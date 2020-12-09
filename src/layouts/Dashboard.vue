<template>
    <q-layout view="hHh lpR fFf">
        <q-header elevated class="bg-primary text-white">
            <q-toolbar>
                <q-btn dense flat round icon="fas fa-bars" @click="left = !left" />

                <q-toolbar-title>
                    <img
                        src="@/assets/logo_ygo.png"
                        width="4%"
                        style="padding-top: 5px; cursor: pointer"
                    />
                </q-toolbar-title>
                <q-space />
                <q-btn flat round dense>
                    <i class="fas fa-user"></i>
                    <q-menu>
                        <q-list style="width: 150px">
                            <q-item clickable v-close-popup :to="'/user'">
                                <q-item-section>
                                    <span> <i class="fas fa-user on-left"></i>Mi Perfil </span>
                                </q-item-section>
                            </q-item>
                            <q-separator />
                            <q-item clickable v-close-popup @click="logout()">
                                <q-item-section>
                                    <span>
                                        <i class="fas fa-sign-out-alt on-left"></i>Cerrar sesion
                                    </span>
                                </q-item-section>
                            </q-item>
                        </q-list>
                    </q-menu>
                </q-btn>
            </q-toolbar>
        </q-header>

        <q-drawer show-if-above v-model="left" side="left" elevated content-class="bg-accent">
            <q-scroll-area style="height: calc(100% - 150px)">
                <q-list padding>
                    <q-item
                        active
                        clickable
                        v-ripple
                        v-for="(link, i) in drawerLinks"
                        :key="i"
                        :to="link.link"
                        class="text-white"
                    >
                        <q-avatar rounded>
                            <i :class="link.icon" style="font-size: 15px"></i>
                        </q-avatar>
                        <q-item-section>{{ link.name }}</q-item-section>
                    </q-item>
                </q-list>
            </q-scroll-area>
        </q-drawer>

        <q-page-container>
            <router-view />
        </q-page-container>
    </q-layout>
</template>

<script>
import firebase from 'firebase/app'
import 'firebase/auth'
export default {
    data() {
        return {
            left: false,
            drawerLinks: [
                {
                    name: 'Inicio',
                    link: '/admin',
                    icon: 'fas fa-home',
                },
                {
                    name: 'Paquete registrados',
                    link: '/package-manager',
                    icon: 'fas fa-dolly',
                },
                {
                    name: 'Facturas Y-Go',
                    link: '/invoice-manager',
                    icon: 'fas fa-file-alt',
                },
                {
                    name: 'Usuarios Y-Go',
                    link: '/users-manager',
                    icon: 'fas fa-user-circle',
                },
                {
                    name: 'Reportes',
                    link: '/reports',
                    icon: 'fas fa-chart-line',
                },
            ],
        }
    },
    methods: {
        async logout() {
            firebase
                .auth()
                .signOut()
                .then(async () => {
                    await this.$store.dispatch('UserLogout')
                    this.$router.push('/login')
                })
                .catch(error => {
                    console.log(error)
                })
        },
    },
}
</script>
