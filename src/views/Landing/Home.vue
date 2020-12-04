<template>
    <q-page style="min-height: auto;">
        <loading-alert :display="displayLoading"></loading-alert>
        <ygo-alert
            :display="displayAlert"
            :title="alertTitle"
            :message="alertMessage"
            :type="alertType"
            @accept="displayAlert = false"
        ></ygo-alert>
        <div class="row">
            <q-carousel
                v-model="slide"
                transition-prev="scale"
                transition-next="scale"
                swipeable
                animated
                infinite
                height="260px"
                class="bg-amber-8 text-white full-width"
            >
                <q-carousel-slide class="q-pa-none" name="slide_1" style="overflow: hidden;">
                    <div class="row" style="height: 100%">
                        <div class="col desktop-only"></div>
                        <div class="col-lg-7 col-md-12 col-sm-12 col-xs-12">
                            <div class="row" style="height: 100%">
                                <div
                                    class="col-lg-8 col-md-6 col-sm-6 col-xs-12 column flex-center q-pa-md"
                                >
                                    <div class="text-h4 text-bold text-italic">
                                        MENSAJE RAPIDOS<br />FACIL BLA BLA BLA...
                                    </div>
                                </div>
                                <div class="col-lg-4 col-md-6 col-sm-6">
                                    <q-img :src="require('@/assets/Landing/girl_with_box.png')" />
                                </div>
                            </div>
                        </div>
                        <div class="col desktop-only"></div>
                    </div>
                </q-carousel-slide>
            </q-carousel>
        </div>
        <div class="row form-section">
            <div class="col desktop-only"></div>
            <div class="col-lg-7 col-xs-12">
                <div class="row">
                    <div class="col-lg-4 col-sm-6 col-xs-12 q-py-xl q-px-md">
                        <q-card style="border-left: solid 5px #FF5722">
                            <q-card-section>
                                <div class="text-h5 text-center text-primary q-mb-xs">
                                    REGÍSTRATE
                                </div>
                                <q-separator
                                    color="accent"
                                    style="width: 150px; margin: 0 auto; height: 2px"
                                />
                                <div class="text-body1 text-center q-mt-md">
                                    ¿Ya tienes cuenta con nosotros? <br />Inicia sesión
                                    <router-link to="/login" class="text-accent text-bold"
                                        >aquí</router-link
                                    >.
                                </div>
                            </q-card-section>
                            <q-card-section>
                                <q-input
                                    filled
                                    label="Nombre"
                                    color="accent"
                                    placeholder="John"
                                    class="q-mb-md"
                                    v-model="form.name"
                                />
                                <q-input
                                    filled
                                    label="Apellido"
                                    color="accent"
                                    placeholder="Doe"
                                    class="q-mb-md"
                                    v-model="form.lastName"
                                />
                                <q-input
                                    filled
                                    label="Correo"
                                    type="email"
                                    color="accent"
                                    placeholder="john.doe@gmail.com"
                                    class="q-mb-md"
                                    v-model="form.email"
                                />
                                <q-input
                                    filled
                                    label="Contraseña"
                                    type="password"
                                    color="accent"
                                    placeholder="********"
                                    class="q-mb-md"
                                    v-model="form.password"
                                />
                                <q-input
                                    filled
                                    label="Repetir contraseña"
                                    type="password"
                                    color="accent"
                                    placeholder="********"
                                    class="q-mb-md"
                                    v-model="form.repassword"
                                />
                            </q-card-section>
                            <q-card-actions>
                                <q-space />
                                <q-btn
                                    color="accent"
                                    label="Registrar"
                                    class="text-bold"
                                    push
                                    @click="registerUser()"
                                />
                            </q-card-actions>
                        </q-card>
                    </div>
                </div>
            </div>
            <div class="col desktop-only"></div>
        </div>
    </q-page>
</template>

<script>
import * as api from '@/api/api'
import firebase from 'firebase/app'
import 'firebase/auth'

export default {
    data() {
        return {
            showRegisterForm: false,
            slide: 'slide_1',
            terms: false,
            displayLoading: false,
            confirmationDialog: false,
            displayAlert: false,
            alertTitle: '',
            alertMessage: '',
            alertType: '',
            form: {
                name: '',
                lastName: '',
                email: '',
                contactPhone: '',
                password: '',
                repassword: '',
            },
            strongPass: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
            validEmail: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        }
    },
    computed: {
        user() {
            return this.$store.getters.user
        },
        isAuthenticated() {
            return this.$store.getters.isAuthenticated
        },
    },
    methods: {
        clear() {
            this.form.name = ''
            this.form.lastName = ''
            this.form.email = ''
            this.form.contactPhone = ''
            this.form.password = ''
            this.form.repassword = ''
        },
        getUrlParam(sParam) {
            var sPageURL = window.location.search.substring(1)
            var sURLVariables = sPageURL.split('&')
            for (var i = 0; i < sURLVariables.length; i++) {
                var sParameterName = sURLVariables[i].split('=')
                if (sParameterName[0] == sParam) {
                    return sParameterName[1]
                }
            }
        },
        setMarkerPosition(event) {
            this.form.location = event
        },
        registerUser() {
            // if (!this.terms) {
            //     this.alertTitle = 'Error'
            //     this.alertMessage =
            //         'Debes llenar todos los campos y aceptar los terminos y condiciones.'
            //     this.alertType = 'error'
            //     this.displayAlert = true
            //     return
            // }
            if (
                this.form.name === '' ||
                this.form.lastName === '' ||
                this.form.email === '' ||
                this.form.password === ''
            ) {
                this.alertTitle = 'Error'
                this.alertMessage = 'Debes llenar todos los campos.'
                this.alertType = 'error'
                this.displayAlert = true
                return
            }
            if (this.form.password != this.form.repassword) {
                this.alertTitle = 'Error'
                this.alertMessage = 'Las contraseñas con coinciden.'
                this.alertType = 'error'
                this.displayAlert = true
                return
            }
            this.displayLoading = true
            firebase
                .auth()
                .createUserWithEmailAndPassword(this.form.email, this.form.password)
                .then(async user => {
                    // await this.$store.dispatch('setCurrentUser', user.user)
                    firebase
                        .auth()
                        .currentUser.sendEmailVerification({
                            url: 'https://y-go.com.pa/login',
                        })
                        .then(() => {
                            // Verification email sent.
                        })
                        .catch(error => {
                            // Error occurred. Inspect error.code.
                            console.log(error)
                        })
                    await api
                        .createuserondatabase({
                            user: user.user,
                        })
                        .then(() => {
                            this.displayLoading = false
                            this.confirmationDialog = true
                            api.updateUserWithInfo({
                                uid: user.user.uid,
                                obj: this.form,
                            })
                        })
                        .then(async () => {
                            firebase
                                .auth()
                                .signOut()
                                .then(async () => {
                                    await this.$store.dispatch('UserLogout')
                                })
                                .catch(error => {
                                    console.log(error)
                                })
                            this.displayLoading = false
                            this.alertTitle = '¡Bienvenido!'
                            this.alertMessage =
                                'Te has registrado satisfactoriamente, te hemos enviado un correo de confirmación.'
                            this.alertType = 'success'
                            this.displayAlert = true
                            this.clear()
                        })
                })
                .catch(error => {
                    // Handle Errors here.
                    console.log(error)
                    this.displayLoading = false
                    this.alertTitle = 'Error'
                    this.alertType = 'error'
                    if (error.code === 'auth/email-already-in-use') {
                        this.alertMessage = 'Este correo ya esta en uso registrado'
                    }
                    if (error.code === 'auth/weak-password') {
                        this.alertMessage = 'La contraseña es demasiado devil, intenta otra'
                    }
                    if (error.code === 'auth/invalid-email') {
                        this.alertMessage = 'El email no es valido por favor revisalo'
                    }
                    this.displayAlert = true
                    // ...
                })
        },
    },
    mounted() {
        if (this.getUrlParam('reg') == 'true') this.showRegisterForm = true
    },
}
</script>

<style scoped>
.custom-caption {
    text-align: center;
    height: 100%;
    color: white;
    background-color: rgba(0, 0, 0, 0.3);
}
</style>
