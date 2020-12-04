<template>
    <div class="navigation-bar bg-white text-white" style="padding: 5px 0">
        <div class="row">
            <div class="col desktop-only"></div>
            <div class="col-lg-7 col-md-12 col-sm-12 col-xs-12 q-px-md">
                <div class="row full-width">
                    <div class="col-lg-2 col-md-2 col-sm-12 col-xs-12 column flex-center">
                        <q-img
                            :src="require('@/assets/logo_ygo.png')"
                            style="width: 175px; margin-top: 5px"
                        />
                    </div>
                    <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12 column flex-center">
                        <ul class="q-pa-none">
                            <li v-for="(link, i) in navLinks" :key="i">
                                <router-link :to="link.route"
                                    ><div class="text-h6" style="font-weight: 600;">
                                        {{ link.text }}
                                    </div></router-link
                                >
                            </li>
                        </ul>
                    </div>
                    <div class="col-lg-2 col-md-2 col-sm-12 col-xs-12 column flex-center">
                        <div>
                            <q-btn
                                push
                                label="Iniciar sesion"
                                color="accent"
                                class="text-bold"
                                to="/user"
                                v-if="$router.currentRoute.path == '/'"
                            />
                        </div>
                    </div>
                    <div class="col-lg-2 col-md-2 col-sm-12 col-xs-12  q-py-md  column flex-center">
                        <div>
                            <q-btn outline round color="accent" class="on-left">
                                <i class="fab fa-facebook-f"></i>
                            </q-btn>
                            <q-btn outline round color="accent">
                                <i class="fab fa-instagram"></i>
                            </q-btn>
                        </div>
                    </div>
                </div>

                <!-- <q-btn
                    flat
                    color="secondary"
                    class="hide-in-desktop q-mt-sm on-right"
                    style="float: right"
                    round
                    @click="openDrawer"
                >
                    <i class="fas fa-bars"></i>
                </q-btn> -->
                <!-- <q-btn
                    v-if="!isAuthenticated"
                    push
                    label="Iniciar sesion"
                    color="accent"
                    style="float: right; margin-top: 10px"
                    to="/login"
                /> -->
                <!-- <q-btn
                    push
                    color="accent"
                    style="float: right; margin-top: 10px"
                    v-if="isAuthenticated && user"
                >
                    <i class="fas fa-user"></i>
                    <q-menu>
                        <q-list style="width: 150px">
                            <q-item clickable v-close-popup>
                                <q-item-section @click="$router.push('/user')">
                                    <span>
                                        <i class="fas fa-box-open on-left"></i>Mi Casillero
                                    </span>
                                </q-item-section>
                            </q-item>
                            <q-separator />
                            <q-item clickable v-close-popup v-if="user.role === 'admin'">
                                <q-item-section @click="$router.push('/admin')">
                                    <span> <i class="fas fa-cogs on-left"></i>Admin Panel </span>
                                </q-item-section>
                            </q-item>
                            <q-separator v-if="user.role === 'admin'" />
                            <q-item clickable v-close-popup @click="logout()">
                                <q-item-section>
                                    <span>
                                        <i class="fas fa-sign-out-alt on-left"></i>Cerrar sesion
                                    </span>
                                </q-item-section>
                            </q-item>
                        </q-list>
                    </q-menu>
                </q-btn> -->
            </div>
            <div class="col desktop-only"></div>
        </div>
    </div>
</template>
<script>
import firebase from 'firebase/app'
import 'firebase/auth'
export default {
    props: ['navLinks'],
    data() {
        return {}
    },
    computed: {
        user() {
            return this.$store.getters.user
        },
    },
    methods: {
        openDrawer() {
            this.$emit('open-drawer')
        },
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
    computed: {
        user() {
            return this.$store.getters.user
        },
        isAuthenticated() {
            return this.$store.getters.isAuthenticated
        },
    },
}
</script>
