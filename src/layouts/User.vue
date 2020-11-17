<template>
    <q-layout class="y-go-font">
        <loading-alert :display="displayLoading"></loading-alert>
        <ygo-alert
            :display="displayAlert"
            :title="alertTitle"
            :message="alertMessage"
            :type="alertType"
            @accept="displayAlert = false"
        ></ygo-alert>
        <SocialBar />
        <Navbar />
        <q-page-container>
            <q-page>
                <div class="row q-mt-lg">
                    <div class="col desktop-only"></div>
                    <div class="col-lg-7">
                        <q-card class="q-mb-lg">
                            <q-card-section>
                                <div class="row">
                                    <div class="col column">
                                        <div class="text-primary">
                                            <span class="text-h5">Bienvenido,</span>
                                            &nbsp;
                                            <span class="text-h3">{{
                                                `${userInformation.name} ${userInformation.lastName}`
                                            }}</span>
                                        </div>
                                        <div class="text-h5 text-accent">
                                            Casillero: <strong>{{ userInformation.box }}</strong>
                                        </div>
                                        <div class="text-subtitle2">
                                            <br />
                                            2478 NW 89TH AVE SUITE Y GO 5683
                                            <br />
                                            DORAL, FLORIDA 33143
                                            <br />
                                            United States
                                            <br />Phone number: 7866673688
                                        </div>
                                    </div>
                                    <div class="col-4 column flex-center">
                                        <div class="row full-width q-mb-lg">
                                            <div class="col">
                                                <q-img
                                                    :src="require('@/assets/logo_ygo.png')"
                                                    style="width: 150px; display: inline-block"
                                                />
                                            </div>
                                            <div class="col column flex-center">
                                                <div class="text-h3 text-primary">
                                                    <strong>24</strong>
                                                </div>
                                                <div class="text-subtitle2 text-accent">
                                                    <strong>Y-Go Libras</strong>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="text-h6 text-primary">Division Platino</div>
                                        <q-linear-progress
                                            stripe
                                            rounded
                                            size="15px"
                                            :value="0.75"
                                            color="accent"
                                            class="q-mt-sm q-mb-xs"
                                        />
                                        <div class="text-caption">75/100 pts.</div>
                                    </div>
                                </div>
                            </q-card-section>
                        </q-card>
                        <div class="row">
                            <div class="col-4">
                                <q-list
                                    bordered
                                    padding
                                    class="rounded-borders"
                                    style="max-width: 350px"
                                >
                                    <q-item-label header>Menu</q-item-label>
                                    <q-separator />
                                    <q-item clickable v-ripple to="/user">
                                        <q-item-section avatar top>
                                            <q-avatar color="primary" text-color="white">
                                                <i class="fas fa-home"></i>
                                            </q-avatar>
                                        </q-item-section>

                                        <q-item-section>
                                            <q-item-label lines="1">Inicio</q-item-label>
                                        </q-item-section>
                                    </q-item>

                                    <q-item clickable v-ripple to="profile">
                                        <q-item-section avatar top>
                                            <q-avatar color="primary" text-color="white">
                                                <i class="fas fa-map-marker-alt"></i>
                                            </q-avatar>
                                        </q-item-section>

                                        <q-item-section>
                                            <q-item-label lines="1"
                                                >Perfil y direccion</q-item-label
                                            >
                                            <q-item-label caption
                                                >Edita tu informacion y direccion de
                                                entrega</q-item-label
                                            >
                                        </q-item-section>
                                    </q-item>
                                    <q-item clickable v-ripple>
                                        <q-item-section avatar top>
                                            <q-avatar color="accent" text-color="white">
                                                <i class="fas fa-sign-out-alt"></i>
                                            </q-avatar>
                                        </q-item-section>

                                        <q-item-section>
                                            <q-item-label @click="logout()" lines="1"
                                                >Cerrar sesion</q-item-label
                                            >
                                        </q-item-section>
                                    </q-item>
                                </q-list>
                            </div>
                            <div class="col">
                                <router-view />
                            </div>
                        </div>
                    </div>
                    <div class="col desktop-only"></div>
                </div>
            </q-page>
        </q-page-container>
        <Footer />
    </q-layout>
</template>

<script>
import SocialBar from '@/components/general/SocialBar'
import Navbar from '@/components/general/Navbar'
import Footer from '@/components/general/Footer'
import * as api from '@/api/api'
import firebase from 'firebase/app'
import 'firebase/auth'

export default {
    components: {
        SocialBar,
        Navbar,
        Footer,
    },
    data() {
        return {
            displayLoading: false,
            confirmationDialog: false,
            displayAlert: false,
            alertTitle: '',
            alertMessage: '',
            alertType: '',
            userInformation: '',
        }
    },
    computed: {
        uid() {
            return this.$store.getters.uid
        },
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
    mounted() {
        this.displayLoading = true
        api.returnUserProfileInformation({uid: this.uid}).then(response => {
            console.log(response)
            this.displayLoading = false
        })
    },
}
</script>