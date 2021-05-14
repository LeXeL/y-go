<template>
    <q-page style="min-height: auto !important">
        <loading-alert :display="displayLoading"></loading-alert>
        <ygo-alert
            :display="displayAlert"
            :title="alertTitle"
            :message="alertMessage"
            :type="alertType"
            @accept="displayAlert = false"
        ></ygo-alert>
        <!-- DESKTOP SLIDES -->
        <VueSlickCarousel :arrows="false" :dots="false" :autoplay="true" :autoplaySpeed="10000" class="xs-hide">
            <q-img :src="require('@/assets/Landing/BANNER-03.svg')" />
            <q-img :src="require('@/assets/Landing/BANNER-01.svg')" />
            <q-img :src="require('@/assets/Landing/BANNER-02.svg')" />
        </VueSlickCarousel>
        <!-- /DESKTOP SLIDES -->

        <!-- MOBILE SLIDES -->
        <VueSlickCarousel :arrows="false" :dots="false" :autoplay="true" :autoplaySpeed="10000" class="xl-hide lg-hide md-hide sm-hide">
            <q-img :src="require('@/assets/Landing/BANNER_mobile-03.svg')" />
            <q-img :src="require('@/assets/Landing/BANNER_mobile-01.svg')" />
            <q-img :src="require('@/assets/Landing/BANNER_mobile-02.svg')" />
        </VueSlickCarousel>
        <!-- /MOBILE SLIDES -->
        <div class="row q-pa-md xl-hide lg-hide md-hide sm-hide">
            <div class="text-h6 q-px-lg text-center text-accent q-mb-md">
                Afíliate al programa de lealtad de <strong>Y-GO! <br /></strong>Y llevate libras
                <strong>GRATIS</strong> con tu primer pedido.
            </div>
            <q-btn
                label="Conoce más"
                color="primary"
                push
                class="text-bold"
                to="/programa-de-lealtad"
                style="margin: 0 auto;"
            />
        </div>
        <div class="row form-section">
            <q-space />
            <div class="col-lg-7 col-md-9 col-xs-12 q-px-md">
                <div class="row">
                    <div class="col-lg-4 col-md-5 col-sm-6 col-xs-12 q-py-lg q-px-md">
                        <q-card style="border-left: solid 5px #ff5722">
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
                                    class="q-mb-md"
                                    v-model="form.name"
                                    name="name"
                                />
                                <q-input
                                    filled
                                    label="Apellido"
                                    color="accent"
                                    class="q-mb-md"
                                    v-model="form.lastName"
                                    name="lastname"
                                />
                                <q-input
                                    filled
                                    label="Correo"
                                    type="email"
                                    color="accent"
                                    class="q-mb-md"
                                    v-model="form.email"
                                    name="email"
                                />
                                <q-input
                                    filled
                                    label="Contraseña"
                                    type="password"
                                    color="accent"
                                    class="q-mb-md"
                                    v-model="form.password"
                                />
                                <q-input
                                    filled
                                    label="Repetir contraseña"
                                    type="password"
                                    color="accent"
                                    v-model="form.repassword"
                                />
                            </q-card-section>
                            <q-card-actions class="q-px-md">
                                <q-btn
                                    color="accent"
                                    label="Regístrate"
                                    class="text-bold full-width"
                                    push
                                    @click="registerUser()"
                                />
                            </q-card-actions>
                            <q-card-section>
                                <div class="text-body2">
                                    Al hacer clic en
                                    <span class="text-bold">"REGISTRAR"</span> acepto los terminos y
                                    condiciones. Leer
                                    <a
                                        href="/terminos-y-condiciones"
                                        target="_blank"
                                        class="text-bold text-accent"
                                        >aquí.</a
                                    >
                                </div>
                            </q-card-section>
                        </q-card>
                    </div>
                    <div class="col-lg-8 col-md-7 col-sm-6 col-xs-12 column flex-center xs-hide">
                        <div class="text-h4 q-px-lg text-center text-white q-mb-lg">
                            Afíliate al programa de lealtad de <strong>Y-GO! <br /></strong>Y
                            llevate libras <strong>GRATIS</strong> con tu primer pedido.
                        </div>
                        <q-btn
                            label="Conoce más"
                            color="accent"
                            push
                            class="text-bold"
                            to="/programa-de-lealtad"
                        />
                    </div>
                </div>
            </div>
            <q-space />
        </div>
    </q-page>
</template>

<script>
import * as api from '@/api/api'
import firebase from 'firebase/app'
import 'firebase/auth'

import VueSlickCarousel from 'vue-slick-carousel'
import 'vue-slick-carousel/dist/vue-slick-carousel.css'

export default {
    data() {
        return {
            slide: 1,
            showRegisterForm: false,
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
    components: {
        VueSlickCarousel
    },
    mounted() {
        window.scrollTo(0, 0)
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
