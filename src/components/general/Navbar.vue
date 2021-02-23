<template>
    <div class="navigation-bar bg-white text-white" style="padding: 5px 0">
        <div class="row">
            <q-space />
            <div class="col-lg-7 col-md-12 col-sm-12 col-xs-12 q-px-md">
                <div class="row full-width q-my-sm">
                    <div class="col-lg-2 col-md-2 col-sm-12 col-xs-12 column flex-center">
                        <q-img :src="require('@/assets/logo_ygo.png')" style="width: 150px" />
                    </div>
                    <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12 column flex-center">
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
                    <div class="col-lg-2 col-md-2 col-sm-12 col-xs-12 q-py-md column flex-center">
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
            </div>
            <q-space />
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
