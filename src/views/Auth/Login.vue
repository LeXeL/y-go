<template>
    <q-page class="bg-primary">
        <q-banner v-if="showVerifyBanner" class="bg-accent text-white text-center shadow-3">
            <div class="text-bold">
                Gracias por confirmar tu correo electronico, puedes proceder al perfil de tu cuenta.
            </div>
        </q-banner>
        <q-banner v-if="showPasswordBanner" class="bg-green text-white text-center shadow-3">
            <div class="text-bold">Hemos cambiado la contraseña con exito</div>
        </q-banner>
        <q-card class="absolute-center" v-if="mode === 'resetPassword'">
            <q-form @submit.prevent.stop="requestForgotPassword()">
                <q-card-section class="text-center">
                    <q-img :src="require('@/assets/logo_ygo.png')" width="200px" />
                </q-card-section>
                <q-card-section>
                    <div class="text-h5 text-center text-bold q-mb-md">
                        Restablece tu contraseña
                    </div>
                    <div class="text-subtitle2">
                        Ingresa tu nueva contraseña para acceder a tu cuenta.
                    </div>
                </q-card-section>
                <q-card-section>
                    <q-input
                        class="q-mb-md"
                        ref="password"
                        filled
                        label="Contraseña"
                        type="password"
                        placeholder="**********"
                        v-model="newPassword"
                        lazy-rules
                        :rules="[val => !!val || 'Este campo es obligatorio.']"
                    />
                    <q-input
                        ref="repassword"
                        filled
                        label="Repite tu contraseña"
                        type="password"
                        placeholder="**********"
                        v-model="repassword"
                        lazy-rules
                        :rules="[val => !!val || 'Este campo es obligatorio.']"
                    />
                </q-card-section>
                <q-card-actions>
                    <q-space />
                    <q-btn type="submit" color="accent" label="Restablecer" push class="q-mr-sm" />
                </q-card-actions>
            </q-form>
        </q-card>
        <div class="absolute-center" v-else>
            <q-card style="width: 400px" class="q-pa-md rounded-borders">
                <q-card-section>
                    <q-img :src="require('@/assets/logo_ygo.png')" class="q-mb-md" />
                    <router-link to="/" class="text-grey-6">
                        <i class="fas fa-long-arrow-alt-left"></i>
                        Inicio
                    </router-link>
                    <q-input
                        filled
                        label="Correo electrónico"
                        class="full-width q-mb-md q-mt-md"
                        type="text"
                        v-model="email"
                    />
                    <q-input
                        filled
                        label="Contraseña"
                        class="full-width q-mb-md"
                        type="password"
                        v-model="password"
                        @keyup.enter="login"
                    />
                    <q-btn
                        color="accent"
                        class="q-mb-md full-width text-weight-bolder"
                        push
                        @click="login"
                        :disable="displayLoading"
                    >
                        <span v-if="!displayLoading">Iniciar sesión</span>
                        <q-spinner-facebook v-if="displayLoading" color="white" size="1em"
                    /></q-btn>
                    <q-card-section v-if="dismissCountDown > 0" class="q-px-none">
                        <q-banner inline-actions rounded class="bg-red text-white">
                            {{ errorMessage }}
                            <template v-slot:action>
                                <q-btn flat @click="dismissCountDown = 0" round size="sm">
                                    <i class="fas fa-times"></i>
                                </q-btn>
                            </template>
                        </q-banner>
                    </q-card-section>
                    <div class="text-body2">
                        ¿Olvidaste tu contraseña? Haz click
                        <router-link to="/forgot-password">aquí</router-link>.
                    </div>
                </q-card-section>
            </q-card>
        </div>
    </q-page>
</template>

<script>
import firebase from 'firebase/app'
import 'firebase/auth'
import * as api from '@/api/api'

export default {
    name: 'Login',
    computed: {
        user() {
            return this.$store.getters.user
        },
        isAuthenticated() {
            return this.$store.getters.isAuthenticated
        },
        role() {
            return this.$store.getters.role
        },
    },
    data() {
        return {
            email: '',
            password: '',
            dismissSecs: 15,
            dismissCountDown: 0,
            errorMessage: '',
            currentUser: '',
            displayLoading: false,
            mode: '',
            actionCode: '',
            showVerifyBanner: false,
            showPasswordBanner: false,
            newPassword: '',
            repassword: '',
        }
    },
    methods: {
        requestForgotPassword() {
            if (this.newPassword === this.repassword) {
                firebase
                    .auth()
                    .confirmPasswordReset(this.actionCode, this.newPassword)
                    .then(resp => {
                        firebase
                            .auth()
                            .signOut()
                            .then(async () => {
                                await this.$store.dispatch('UserLogout')
                                this.mode = ''
                                this.showPasswordBanner = true
                            })
                            .catch(error => {
                                console.log(error)
                            })
                    })
                    .catch(error => {
                        this.dismissCountDown = this.dismissSecs
                        this.errorMessage = error
                    })
            } else {
                this.dismissCountDown = this.dismissSecs
                this.errorMessage = 'Las Contraseñas no son iguales'
            }
        },
        async login() {
            this.displayLoading = true
            firebase
                .auth()
                .signInWithEmailAndPassword(this.email, this.password)
                .then(async () => {
                    this.currentUser = await firebase.auth().currentUser
                    await this.$store.dispatch('setCurrentUser', this.currentUser)
                    if (this.currentUser.emailVerified) {
                        await api
                            .getUserInformationById({
                                uid: this.currentUser.uid,
                            })
                            .then(response => {
                                this.$store.commit('SET_USER', response.data.data)
                                if (this.isAuthenticated && this.role === 'admin')
                                    this.$router.push('/admin')
                                if (this.isAuthenticated && this.role === 'user')
                                    this.$router.push('/user')
                            })
                    } else {
                        this.dismissCountDown = this.dismissSecs
                        this.errorMessage =
                            'La cuenta aun no se ha verificado, por favor revisa tu correo'
                        this.displayLoading = false
                    }
                })
                .catch(error => {
                    this.dismissCountDown = this.dismissSecs
                    this.displayLoading = false

                    switch (error.code) {
                        case 'auth/user-disabled':
                            this.errorMessage =
                                'La cuenta esta deshabilitada por favor comunicarse con un administrador.'
                            break
                        case 'auth/user-not-found':
                            this.errorMessage =
                                'No se ha encontrado ese correo en nuestra base de datos por favor crea una cuenta.'
                            break
                        case 'auth/wrong-password':
                            this.errorMessage =
                                'El usuario o la contraseña está equivocado por favor revisar.'
                            break
                        case 'auth/invalid-email':
                            this.errorMessage =
                                'El usuario o la contraseña está equivocado por favor revisar.'
                            break
                        default:
                            this.errorMessage = error.message
                            break
                    }
                })
        },
    },
    mounted() {
        this.mode = this.$route.query.mode
        this.actionCode = this.$route.query.oobCode
        if (this.mode === 'verifyEmail') {
            firebase
                .auth()
                .applyActionCode(this.actionCode)
                .then(() => {
                    this.showVerifyBanner = true
                })
                .catch(error => {
                    console.log(error)
                })
        }
        if (this.mode === 'resetPassword') {
            firebase
                .auth()
                .verifyPasswordResetCode(this.actionCode)
                .then(email => {
                    this.email = email
                })
                .catch(error => {
                    this.dismissCountDown = this.dismissSecs
                    this.errorMessage = error
                })
        }
        if (this.isAuthenticated && this.role === 'admin') this.$router.push('/admin')
        if (this.isAuthenticated && this.role === 'user') this.$router.push('/profile')
    },
}
</script>
