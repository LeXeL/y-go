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
        <Navbar />
        <q-page-container v-if="Object.keys(userInformation).length > 0">
            <q-page>
                <div class="row q-mt-lg">
                    <div class="col desktop-only"></div>
                    <div class="col-lg-7">
                        <div class="q-pa-sm">
                            <q-card class="q-mb-lg">
                                <q-card-section>
                                    <div class="row">
                                        <div class="col-lg-8 col-xs-12 column">
                                            <div class="text-primary">
                                                <span class="text-h5">Bienvenido,</span>
                                                &nbsp;
                                                <span class="text-h4">{{ userName }}</span>
                                            </div>
                                            <div class="text-h5 text-accent">
                                                Casillero:
                                                <strong>{{ userInformation.user.box }}</strong>
                                            </div>
                                            <div class="text-subtitle2">
                                                <br />
                                                2478 NW 89TH AVE SUITE
                                                {{ userInformation.user.box }}
                                                <br />
                                                DORAL, FLORIDA 33143
                                                <br />
                                                United States
                                                <br />Phone number: 7866673688
                                            </div>
                                        </div>
                                        <div class="mobile-only q-pa-md"></div>
                                        <div class="col-lg-4 col-xs-12 column flex-center">
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
                                            <!-- <div class="text-h6 text-primary">Division Platino</div>
                                        <q-linear-progress
                                            stripe
                                            rounded
                                            size="15px"
                                            :value="0.75"
                                            color="accent"
                                            class="q-mt-sm q-mb-xs"
                                        />
                                        <div class="text-caption">75/100 pts.</div> -->
                                        </div>
                                    </div>
                                </q-card-section>
                            </q-card>
                        </div>

                        <div class="row">
                            <div class="col-lg-4 col-xs-12 q-pa-sm">
                                <q-list bordered padding class="rounded-borders">
                                    <q-item-label header>Menu</q-item-label>
                                    <q-separator />
                                    <q-item clickable v-ripple @click="showUserProfile = false">
                                        <q-item-section avatar top>
                                            <q-avatar color="primary" text-color="white">
                                                <i class="fas fa-home"></i>
                                            </q-avatar>
                                        </q-item-section>

                                        <q-item-section>
                                            <q-item-label lines="1">Inicio</q-item-label>
                                        </q-item-section>
                                    </q-item>

                                    <q-item clickable v-ripple @click="showUserProfile = true">
                                        <q-item-section avatar top>
                                            <q-avatar color="primary" text-color="white">
                                                <i class="fas fa-map-marker-alt"></i>
                                            </q-avatar>
                                        </q-item-section>

                                        <q-item-section>
                                            <q-item-label lines="1"
                                                >Perfil y direccion de entrega</q-item-label
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

                                        <q-item-section @click="logout()">
                                            <q-item-label lines="1">Cerrar sesion</q-item-label>
                                        </q-item-section>
                                    </q-item>
                                </q-list>
                            </div>
                            <div class="col-lg-8 col-xs-12 q-pa-sm">
                                <UserHome
                                    v-if="!showUserProfile"
                                    :data="userInformation.invoices"
                                ></UserHome>
                                <UserProfile
                                    v-else
                                    :userInformationData="userInformation"
                                    :forceUpdateOnUser="needsUpdate"
                                    @saveUserProfile="updateUserProfile"
                                ></UserProfile>
                            </div>
                        </div>
                    </div>
                    <div class="col desktop-only"></div>
                </div>
            </q-page>
        </q-page-container>
        <Footer />
        <q-dialog
            v-model="completeRegistrationDialog"
            persistent
            maximized
            transition-show="slide-down"
            transition-hide="slide-up"
        >
            <CompleteRegistrationForm
                v-if="Object.keys(user).length > 0"
                @close-registration-dialog="closeRegistrationDialogAndRefreshContent()"
                :userData="user"
            />
        </q-dialog>
    </q-layout>
</template>

<script>
import SocialBar from '@/components/general/SocialBar'
import Navbar from '@/components/general/Navbar'
import Footer from '@/components/general/Footer'
import UserHome from '@/views/Landing/UserHome'
import UserProfile from '@/views/Landing/UserProfile'
import CompleteRegistrationForm from '@/components/UsersDashboard/CompleteRegistrationForm'
import * as api from '@/api/api'
import firebase from 'firebase/app'
import 'firebase/auth'

export default {
    components: {
        SocialBar,
        Navbar,
        Footer,
        UserHome,
        UserProfile,
        CompleteRegistrationForm,
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
            showUserProfile: false,
            userName: '',
            needsUpdate: false,
            completeRegistrationDialog: false,
        }
    },
    computed: {
        user() {
            return this.$store.getters.user
        },
        uid() {
            return this.$store.getters.uid
        },
    },
    methods: {
        async closeRegistrationDialogAndRefreshContent() {
            api.returnUserProfileInformation({uid: this.uid}).then(response => {
                this.userInformation = response.data.data
                this.displayLoading = false
                this.userName = `${this.userInformation.user.name} ${this.userInformation.user.lastName}`
                this.completeRegistrationDialog = false
            })
        },
        async updateUserProfile(obj) {
            this.displayLoading = true
            this.displayAlert = false
            api.UpdateUserInformationById({
                uid: this.uid,
                user: obj,
            })
                .then(async response => {
                    this.displayLoading = false
                    this.alertTitle = 'Exito!'
                    this.alertMessage = 'Se ha actualizado con exito la informacion'
                    this.alertType = 'success'
                    this.displayAlert = true
                    api.getUserInformationById({
                        uid: this.uid,
                    }).then(response => {
                        this.$store.commit('SET_USER', response.data.data)
                    })
                })
                .catch(error => {
                    console.log(error)
                    this.displayLoading = false
                    this.alertTitle = 'Error'
                    this.alertMessage =
                        'Hubo un error con la solicitud por favor inténtelo más tarde'
                    this.alertType = 'error'
                    this.displayAlert = true
                })
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

    mounted() {
        this.displayLoading = true
        if (typeof this.user === 'string') {
            api.getUserInformationById({uid: this.uid}).then(async response => {
                await this.$store.commit('SET_USER', response.data.data)
                if (!this.user.isUpdated) {
                    this.completeRegistrationDialog = true
                }
            })
        } else {
            if (!this.user.isUpdated) {
                this.completeRegistrationDialog = true
            }
        }
        api.returnUserProfileInformation({uid: this.uid}).then(response => {
            this.userInformation = response.data.data
            this.displayLoading = false
            this.userName = `${this.userInformation.user.name} ${this.userInformation.user.lastName}`
        })
    },
}
</script>
