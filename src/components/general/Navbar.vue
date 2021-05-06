<template>
    <div class="navigation-bar bg-white text-white" style="padding: 5px 0">
        <div class="row">
            <q-space />
            <div class="col-lg-9 col-md-12 col-sm-12 col-xs-12 q-px-md">
                <div class="row full-width q-my-sm">
                    <div class="col-lg-1 col-md-1 col-sm-12 col-xs-3 column flex-center">
                        <router-link to="/">
                            <q-img
                                :src="require('@/assets/logo_ygo.png')"
                                style="width: 135px; cursor: pointer"
                            />
                        </router-link>
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
                    <div class="col-lg-9 col-md-9 col-sm-12 col-xs-12 column flex-center xs-hide">
                        <ul class="q-pa-none">
                            <li>
                                <router-link to="/">
                                    <div
                                        class="text-caption text-bold"
                                        :style="
                                            $route.fullPath == '/'
                                                ? 'border-bottom: solid 3px #01bcd4'
                                                : 'border-bottom: solid 3px #fff'
                                        "
                                    >
                                        INICIO
                                    </div>
                                </router-link>
                            </li>
                            <li>
                                <a href="javascript:void(0)">
                                    <div class="text-caption" style="font-weight: 600">
                                        INFORMACIÓN <i class="fas fa-caret-down"></i>
                                    </div>
                                    <q-menu fit anchor="bottom right" self="top right">
                                        <q-list style="min-width: 100px">

                                            <q-item clickable v-close-popup>
                                                <q-item-section @click="$router.push('/nosotros')">
                                                    <div
                                                        class="text-caption y-go-font text-bold text-right"
                                                    >
                                                        QUIÉNES SOMOS
                                                    </div>
                                                </q-item-section>
                                            </q-item>
                                            <q-item clickable v-close-popup>
                                                <q-item-section
                                                    @click="$router.push('/terminos-y-condiciones')"
                                                >
                                                    <div
                                                        class="text-caption y-go-font text-bold text-right"
                                                    >
                                                        TÉRMINOS Y CONDICIONES
                                                    </div>
                                                </q-item-section>
                                            </q-item>
                                            <q-item clickable v-close-popup>
                                                <q-item-section
                                                    @click="
                                                        $router.push('/politicas-de-privacidad')
                                                    "
                                                >
                                                    <div
                                                        class="text-caption y-go-font text-bold text-right"
                                                    >
                                                        POLÍTICAS DE PRIVACIDAD
                                                    </div>
                                                </q-item-section>
                                            </q-item>
                                        </q-list>
                                    </q-menu>
                                </a>
                            </li>
                            <li>
                                <router-link to="/tarifas">
                                    <div
                                        class="text-caption text-bold"
                                        :style="
                                            $route.fullPath.includes('/tarifas')
                                                ? 'border-bottom: solid 3px #01bcd4'
                                                : 'border-bottom: solid 3px #fff'
                                        "
                                    >
                                        PLANES
                                    </div>
                                </router-link>
                            </li>
                            <li>
                                <router-link to="/programa-de-lealtad">
                                    <div
                                        class="text-caption text-bold"
                                        :style="
                                            $route.fullPath.includes('/programa-de-lealtad')
                                                ? 'border-bottom: solid 3px #01bcd4'
                                                : 'border-bottom: solid 3px #fff'
                                        "
                                    >
                                        PROGRAMA DE LEALTAD
                                    </div>
                                </router-link>
                            </li>
                            <li>
                                <router-link to="/ygo-reciclando">
                                    <div
                                        class="text-caption text-bold"
                                        :style="
                                            $route.fullPath.includes('/ygo-reciclando')
                                                ? 'border-bottom: solid 3px #01bcd4'
                                                : 'border-bottom: solid 3px #fff'
                                        "
                                    >
                                        Y-GO RECICLANDO
                                    </div>
                                </router-link>
                            </li>
                            <li>
                                <a href="javascript:void(0)">
                                    <div class="text-caption" style="font-weight: 600">
                                        HERRAMIENTAS
                                    </div>
                                </a>
                            </li>
                            <li>
                                <router-link to="/contacto">
                                    <div
                                        class="text-caption text-bold"
                                        :style="
                                            $route.fullPath.includes('/contacto')
                                                ? 'border-bottom: solid 3px #01bcd4'
                                                : 'border-bottom: solid 3px #fff'
                                        "
                                    >
                                        CONTÁCTANOS
                                    </div>
                                </router-link>
                            </li>
                        </ul>
                    </div>
                    <div class="col-lg-2 col-md-2 col-sm-12 col-xs-12 column flex-center xs-hide">
                        <q-btn
                            push
                            label="Iniciar sesión"
                            color="accent"
                            class="text-bold"
                            to="/user"
                            v-if="
                                $router.currentRoute.path != '/user' ||
                                $router.currentRoute.path != '/checkout'
                            "
                        />
                    </div>
                    <!-- <div
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
                    </div> -->
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
                        label="Iniciar sesión"
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
