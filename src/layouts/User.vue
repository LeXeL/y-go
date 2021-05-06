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
        <q-page-container v-if="Object.keys(userInformation).length > 0" class="pattern-bg">
            <q-page>
                <div class="row q-mt-lg">
                    <div class="col desktop-only"></div>
                    <div class="col-lg-7 col-md-9 q-pt-lg">
                        <div class="q-pa-sm">
                            <q-card
                                :class="
                                    userInformation.user.affiliateCardNo != null
                                        ? 'q-mb-lg bronze-frame'
                                        : 'q-mb-lg '
                                "
                            >
                                <q-card-section>
                                    <div class="row">
                                        <div
                                            class="col-lg-8 col-md-8 col-sm-8 col-xs-12 column"
                                            v-if="showBusinessNotApproved()"
                                        >
                                            <div class="text-accent">
                                                <span class="text-h5">Bienvenido,</span>
                                                &nbsp;
                                                <span class="text-h4 text-bold">{{
                                                    userName
                                                }}</span>
                                            </div>
                                            <div class="text-h5 q-mt-lg">
                                                Tu peticion de plan business esta en proceso.
                                            </div>
                                        </div>
                                        <div
                                            class="col-lg-8 col-md-8 col-sm-8 col-xs-12 column"
                                            v-else
                                        >
                                            <div class="text-accent">
                                                <span class="text-h5">Bienvenido,</span>
                                                &nbsp;
                                                <span class="text-h4 text-bold">{{
                                                    userName
                                                }}</span>
                                            </div>
                                            <div class="text-h5 text-accent">
                                                Casillero:
                                                <strong>{{ userInformation.user.box }}</strong>
                                            </div>
                                            <div class="text-subtitle2">
                                                <br />
                                                2478 NW 89TH AVE SUITE
                                                {{ userInformation.user.box }}

                                                <span class="text-caption on-right">
                                                    <i
                                                        class="fas fa-plane-departure text-primary"
                                                        style="cursor: pointer; margin-right: 3px"
                                                        @click="copyAddressToClipboard('air')"
                                                    ></i>
                                                    <i
                                                        class="fas fa-ship text-primary"
                                                        style="cursor: pointer; margin-left: 3px"
                                                        @click="copyAddressToClipboard('ship')"
                                                    ></i>
                                                </span>
                                                <br />
                                                DORAL, FLORIDA 33143
                                                <br />
                                                United States
                                                <br />Phone number: 7866673688
                                            </div>
                                        </div>
                                        <div class="mobile-only q-pa-md"></div>
                                        <template v-if="!isBusinessAccount()">
                                            <div
                                                class="col-lg-4 col-md-4 col-sm-3 col-xs-12 column flex-center"
                                                v-if="userInformation.user.affiliateCardNo != null"
                                            >
                                                <div class="text-h5 text-bold text-bronze">
                                                    BRONZE
                                                </div>
                                                <q-circular-progress
                                                    show-value
                                                    class="text-white q-ma-md"
                                                    :value="value"
                                                    color="bronze"
                                                    center-color="blue-grey-10"
                                                    size="150px"
                                                    :thickness="0.175"
                                                >
                                                    <div
                                                        class="text-h4 text-bold full-width text-center"
                                                    >
                                                        {{ value }}
                                                    </div>
                                                    <div class="text-h6 full-width text-center">
                                                        Puntos
                                                    </div>
                                                </q-circular-progress>
                                            </div>
                                            <div
                                                class="col-lg-4 col-md-4 col-sm-3 col-xs-12 column flex-center"
                                                v-else
                                            >
                                                <i
                                                    class="far fa-star fa-3x text-primary q-mb-md"
                                                ></i>
                                                <div class="text-h5 text-bold q-mb-md">
                                                    Programa de lealtad
                                                </div>
                                                <q-btn
                                                    push
                                                    label="Afíliate aqui"
                                                    color="accent"
                                                    size="sm"
                                                    @click="loyaltyAffiliationDialog = true"
                                                />
                                            </div>
                                        </template>
                                    </div>
                                </q-card-section>
                            </q-card>
                        </div>

                        <div class="row">
                            <div class="col-lg-4 col-md-4 col-xs-12 q-pa-sm">
                                <div
                                    :class="
                                        userInformation.user.affiliateCardNo != null
                                            ? 'bronze-frame'
                                            : ''
                                    "
                                >
                                    <q-list bordered padding class="bg-white y-go-1x">
                                        <q-item-label header class="text-bold">Menú</q-item-label>
                                        <q-separator />
                                        <q-item clickable v-ripple @click="showUserProfile = false">
                                            <q-item-section avatar top>
                                                <q-avatar color="primary" text-color="white">
                                                    <i class="fas fa-box"></i>
                                                </q-avatar>
                                            </q-item-section>

                                            <q-item-section>
                                                <q-item-label lines="1">Mis paquetes</q-item-label>
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
                                        <q-item
                                            v-if="user.role === 'admin'"
                                            clickable
                                            v-ripple
                                            to="/admin"
                                        >
                                            <q-item-section avatar top>
                                                <q-avatar color="primary" text-color="white">
                                                    <i class="fas fa-cogs"></i>
                                                </q-avatar>
                                            </q-item-section>

                                            <q-item-section>
                                                <q-item-label lines="1"
                                                    >Panel Administrativo</q-item-label
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
                            </div>
                            <div class="col-lg-8 col-md-8 col-xs-12 q-pa-sm">
                                <div
                                    :class="
                                        userInformation.user.affiliateCardNo != null
                                            ? 'q-mb-xl bronze-frame'
                                            : 'q-mb-xl '
                                    "
                                >
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
                    </div>
                    <div class="col desktop-only"></div>
                </div>
            </q-page>
        </q-page-container>
        <Footer />
        <q-dialog v-model="loyaltyAffiliationDialog">
            <q-card class="y-go-font">
                <q-form @submit="sendAffiliatedNo">
                    <q-card-section>
                        <div class="text-h6 text-center text-bold">
                            Afíliate a nuestro programa de lealtad!
                        </div>
                    </q-card-section>
                    <q-card-section>
                        <div class="text-subtitle1 text-center">
                            Solo debes solicitar la tarjeta en su sucursal mas cercana, activarla
                            con el numero en la cuenta y ya esta participando.
                        </div>
                    </q-card-section>
                    <q-card-section>
                        <q-input
                            filled
                            type="number"
                            label="Registra tu tarjeta"
                            color="primary"
                            v-model="affiliatedNo"
                            :rules="[
                                val => val.length > 0 || 'El campo es obligatorio',
                                val =>
                                    !allAffiliatedNo.includes(parseInt(val)) ||
                                    'Por favor revisa el numero introducido',
                            ]"
                        />
                    </q-card-section>
                    <q-card-actions>
                        <q-btn
                            color="accent"
                            push
                            class="full-width text-bold"
                            type="submit"
                            :disable="displayLoadingForAffiliated"
                        >
                            <span v-if="!displayLoadingForAffiliated">Registrar</span>
                            <q-spinner-facebook
                                v-if="displayLoadingForAffiliated"
                                color="white"
                                size="1em"
                        /></q-btn>
                    </q-card-actions>
                </q-form>
            </q-card>
        </q-dialog>
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
            loyaltyAffiliationDialog: false,
            allAffiliatedNo: [],
            value: 0,
            affiliatedNo: '',
            showAffiliateError: false,
            displayLoadingForAffiliated: false,
            allRates: [],
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
        showBusinessNotApproved() {
            let rate = this.allRates.find(rate => rate.id === this.userInformation.user.rate)
            if (!!rate && rate.name === 'Plan Business') {
                if (!this.userInformation.user.businessAproved) return true
            }
            return false
        },
        isBusinessAccount() {
            let rate = this.allRates.find(rate => rate.id === this.userInformation.user.rate)
            if (!!rate && rate.name === 'Plan Business') return true
            return false
        },
        sendAffiliatedNo() {
            this.displayLoadingForAffiliated = true
            this.userInformation.user.affiliateCardNo = parseInt(this.affiliatedNo)
            this.userInformation.user.poundsCount = 0
            this.value = 0
            api.UpdateUserInformationById({
                uid: this.uid,
                user: this.userInformation.user,
            })
                .then(async response => {
                    this.displayLoadingForAffiliated = false
                    this.loyaltyAffiliationDialog = false
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
                    this.displayLoadingForAffiliated = false
                    this.alertTitle = 'Error'
                    this.alertMessage =
                        'Hubo un error con la solicitud por favor inténtelo más tarde'
                    this.alertType = 'error'
                    this.displayAlert = true
                })
        },
        copyAddressToClipboard(type) {
            let text = ''
            if (type == 'air') {
                text = `air address ${this.userInformation.user.box}`
            }
            if (type == 'ship') {
                text = `ship address ${this.userInformation.user.box}`
            }
            navigator.clipboard.writeText(text).then(
                () => {
                    this.displayLoading = false
                    this.alertTitle = 'Copiado'
                    this.alertMessage = `Direccion ${
                        type == 'air' ? 'aérea' : 'marítima'
                    } copiada correctamente`
                    this.alertType = 'success'
                    this.displayAlert = true
                },
                function (err) {
                    console.error('Async: Could not copy text: ', err)
                }
            )
        },
        async closeRegistrationDialogAndRefreshContent() {
            api.returnUserProfileInformation({uid: this.uid}).then(response => {
                this.userInformation = response.data.data
                this.displayLoading = false
                this.userName = `${this.userInformation.user.name} ${this.userInformation.user.lastName}`
                this.completeRegistrationDialog = false
            })
        },
        async updateUserProfile() {
            this.displayLoading = true
            this.displayAlert = false
            api.UpdateUserInformationById({
                uid: this.uid,
                user: this.userInformation.user,
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
                    this.$router.push('/')
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
            this.$store.commit(
                'SET_CART',
                this.userInformation.invoices.filter(inv => inv.status === 'unpaid')
            )
            this.displayLoading = false
            this.userName = `${this.userInformation.user.name} ${this.userInformation.user.lastName}`
            this.value = this.userInformation.user.poundsCount
            if (this.userInformation.user.affiliateCardNo == null) {
                api.ReturnAllAffiliateCardNo().then(
                    response => (this.allAffiliatedNo = response.data.data)
                )
            }
        })
        api.ReturnAllRates().then(response => (this.allRates = response.data.data))
    },
}
</script>

<style>
.bronze-frame {
    border: 10px solid;
    border-image-slice: 1;
    border-width: 5px;
    border-image-source: linear-gradient(to right, #f5c987, #b68d4c);
}

.text-bronze {
    color: #d0a665;
}
.bg-bronze {
    background: #d0a665;
}
</style>
