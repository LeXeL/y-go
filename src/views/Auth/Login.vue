<template>
    <q-page class="bg-primary">
        <div class="absolute-center">
            <q-card style="width: 400px" class="q-pa-md rounded-borders">
                <q-card-section>
                    <q-img :src="require('@/assets/logo_ygo.png')" class="q-mb-md" />
                    <router-link to="/" class="text-grey-6">
                        <i class="fas fa-long-arrow-alt-left"></i>
                        Inicio
                    </router-link>
                    <q-input
                        filled
                        label="Correo electronico"
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
                        <span v-if="!displayLoading">Iniciar sesion</span>
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
                        <router-link to="/forgot-password">aqui</router-link>.
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
        }
    },
    methods: {
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
        if (this.isAuthenticated && this.role === 'admin') this.$router.push('/admin')
        if (this.isAuthenticated && this.role === 'user') this.$router.push('/profile')
    },
}
</script>
