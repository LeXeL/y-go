<template>
    <q-page>
        <loading-alert :display="displayLoading"></loading-alert>
        <ygo-alert
            :display="displayAlert"
            :title="alertTitle"
            :message="alertMessage"
            :type="alertType"
            @accept="displayAlert = false"
        ></ygo-alert>
        <div class="row">
            <div class="col-lg-8 col-md-8 col-sm-12 col-xs-12">
                <q-carousel
                    arrows
                    animated
                    v-model="slide"
                    class="full-width frontpage-carousell"
                    transition-prev="slide-right"
                    transition-next="slide-left"
                    infinite
                    autoplay
                    swipeable
                    control-color="accent"
                >
                    <q-carousel-slide
                        v-for="(slide, i) in slidesContent"
                        :key="i"
                        :name="slide.name"
                        :img-src="slide.pic"
                    >
                        <div class="absolute-center full-width custom-caption column flex-center">
                            <div class="text-subtitle2 q-mb-sm">{{ slide.subtitle }}</div>
                            <div class="text-h2 text-weight-bolder q-mb-md">{{ slide.title }}</div>
                            <div class="text-subtitle1">
                                {{ slide.text }}
                            </div>
                        </div>
                    </q-carousel-slide>
                </q-carousel>
            </div>
            <div class="col-lg-4 col-md-4 col-sm-12 col-xs-12">
                <div class="full-width bg-grey-2 column flex-center frontpage-hero">
                    <div class="text-center" v-if="!showRegisterForm">
                        <q-img
                            :src="require('@/assets/logo_ygo.png')"
                            class="q-mb-lg"
                            style="width: 60%"
                        />
                        <div class="text-h4 text-center text-primary text-weight-bolder q-mb-sm">
                            ABRE TU CASILLERO GRATIS
                        </div>
                        <div class="text-subtitle2 q-mb-lg">
                            Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                        </div>
                        <q-btn
                            color="accent"
                            push
                            label="Regístrate aquí"
                            size="lg"
                            @click="showRegisterForm = !showRegisterForm"
                        />
                    </div>
                    <div class="q-pa-lg full-width" v-else>
                        <div class="text-h4 text-weight-bolder text-center text-primary q-mb-md">
                            REGÍSTRATE
                        </div>
                        <q-separator
                            color="accent"
                            style="width: 150px; margin: 0 auto; height: 2px"
                        />
                        <div class="text-body1 text-center q-mt-md">
                            ¿Ya tienes cuenta con nosotros? Inicia sesión
                            <router-link to="/login">aquí</router-link>.
                        </div>
                        <q-input
                            filled
                            label="Nombre"
                            color="accent"
                            placeholder="John"
                            class="q-mb-md q-mt-xl"
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
                        <q-btn
                            color="accent"
                            label="Registrar"
                            push
                            style="float: right"
                            size="lg"
                            @click="registerUser()"
                        />
                    </div>
                </div>
            </div>
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
            slidesContent: [
                {
                    name: 'slide_1',
                    pic:
                        'https://www.lawdonut.co.uk/business/sites/lawdonut-business/files/courierservice1_0.jpg',
                    title: 'This Is Title 1',
                    subtitle: 'This is subtitle 1',
                    text:
                        'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Itaque voluptatem totam, architecto cupiditate officia rerum slide 1.',
                },
                {
                    name: 'slide_2',
                    pic:
                        'https://businessexpresscourier.com/wp-content/uploads/2019/08/Post-Office-vs.-Courier-Service.jpg',
                    title: 'This Is Title 2',
                    subtitle: 'This is subtitle 2',
                    text:
                        'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Itaque voluptatem totam, architecto cupiditate officia rerum slide 2.',
                },
                {
                    name: 'slide_3',
                    pic:
                        'https://images.jdmagicbox.com/comp/def_content/domestic_courier_services/default-domestic-courier-services-172.jpg?clr=#808080',
                    title: 'This Is Title 3',
                    subtitle: 'This is subtitle 3',
                    text:
                        'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Itaque voluptatem totam, architecto cupiditate officia rerum slide 3.',
                },
            ],
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
            return this.$store.getter.user
        },
    },
    methods: {
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
                            // await api
                            //     .getUserInformationById({
                            //         uid: user.user.uid,
                            //     })
                            //     .then(response => {

                            // this.$store.commit('SET_USER', response.data.data)
                            //     })
                            this.displayLoading = false
                            this.alertTitle = 'Exito!'
                            this.alertMessage =
                                'Te has registrado satisfactoriamente, te hemos enviado un correo de confirmación.'
                            this.alertType = 'success'
                            this.displayAlert = true
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
