<template>
    <div class="navigation-bar bg-white text-white" style="padding: 5px 0">
        <div class="row">
            <q-space />
            <div class="col-lg-7 col-md-10 col-sm-12 col-xs-12 q-px-md">
                <div class="row full-width q-my-sm">
                    <div class="col-lg-1 col-md-1 col-sm-12 col-xs-3 column flex-center">
                        <q-img :src="require('@/assets/logo_ygo.png')" />
                    </div>
                    <q-space />
                    <div class="col-xs-2 column flex-center sm-hide md-hide lg-hide xl-hide">
                        <q-btn
                            icon="fas fa-bars"
                            flat
                            color="accent"
                            round
                            @click="mobileDrawer = true"
                        />
                    </div>
                    <div class="col-lg-8 col-md-7 col-sm-12 col-xs-12 column flex-center xs-hide">
                        <ul class="q-pa-none">
                            <li v-for="(link, i) in navLinks" :key="i">
                                <router-link :to="link.route"
                                    ><div class="text-h6" style="font-weight: 600">
                                        {{ link.text }}
                                    </div></router-link
                                >
                            </li>
                        </ul>
                    </div>
                    <div class="col-lg-2 col-md-2 col-sm-12 col-xs-12 column flex-center xs-hide">
                        <q-btn
                            push
                            label="Iniciar sesion"
                            color="accent"
                            class="text-bold"
                            to="/user"
                            v-if="$router.currentRoute.path == '/'"
                        />
                    </div>
                    <div
                        class="col-lg-1 col-md-1 col-sm-12 col-xs-12 q-py-md column flex-center xs-hide"
                    >
                        <div>
                            <q-btn outline round color="accent" class="on-left" size="sm">
                                <i class="fab fa-facebook-f"></i>
                            </q-btn>
                            <q-btn outline round color="accent" size="sm">
                                <i class="fab fa-instagram"></i>
                            </q-btn>
                        </div>
                    </div>
                </div>
            </div>
            <q-space />
        </div>

        <!-- MOBILE NAV DRAWER -->
        <q-dialog
            v-model="mobileDrawer"
            persistent
            maximized
            transition-show="slide-left"
            transition-hide="slide-right"
        >
            <q-card class="bg-accent">
                <q-card-actions>
                    <q-space />
                    <q-btn
                        flat
                        color="white"
                        round
                        icon="fas fa-times"
                        @click="mobileDrawer = false"
                    />
                </q-card-actions>
                <q-card-section class="text-right">
                    <div v-for="(link, i) in navLinks" :key="i" @click="mobileDrawer = false">
                        <router-link
                            :to="link.route"
                            class="text-h5 text-white y-go-font text-bold q-mb-lg"
                            style="text-decoration: none; display: block"
                            >{{ link.text }}</router-link
                        >
                    </div>
                </q-card-section>
                <q-card-actions>
                    <q-space />
                    <q-btn
                        label="Iniciar sesion"
                        push
                        color="primary"
                        class="text-bold q-px-md"
                        to="/login"
                    />
                </q-card-actions>
            </q-card>
        </q-dialog>
        <!-- END MOBILE NAV DRAWER -->
    </div>
</template>
<script>
import firebase from 'firebase/app'
import 'firebase/auth'
export default {
    props: ['navLinks'],
    data() {
        return {
            mobileDrawer: false,
        }
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
                    this.$router.push('/')
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
