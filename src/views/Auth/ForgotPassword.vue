<template>
    <q-page class="bg-primary">
        <loading-alert :display="displayLoading"></loading-alert>
        <ygo-alert
            :display="displayAlert"
            :title="alertTitle"
            :message="alertMessage"
            :type="alertType"
            @accept="displayAlert = false"
        ></ygo-alert>
        <q-card class="absolute-center">
            <q-form @submit.prevent.stop="requestForgotPassword()">
                <q-card-section class="text-center">
                    <q-img :src="require('@/assets/logo_ygo.png')" width="200px" />
                </q-card-section>
                <q-card-section>
                    <div class="text-h5 text-center text-bold q-mb-md">
                        Has olvidado tu contraseña?
                    </div>
                    <div class="text-subtitle2">
                        Ingresa tu correo electronico y te enviaremos un enlace para que puedas
                        restablecer tu contraseña.
                    </div>
                </q-card-section>
                <q-card-section>
                    <q-input
                        ref="emailInput"
                        filled
                        label="Correo electronico"
                        placeholder="correo@gmail.com"
                        v-model="emailInput"
                        lazy-rules
                        :rules="[val => !!val || 'Este campo es obligatorio.']"
                    />
                </q-card-section>
                <q-card-actions>
                    <q-space />
                    <q-btn
                        type="submit"
                        color="accent"
                        label="Solicitar cambio"
                        push
                        class="q-mr-sm"
                    />
                </q-card-actions>
            </q-form>
        </q-card>
    </q-page>
</template>

<script>
import firebase from 'firebase/app'
import 'firebase/auth'
export default {
    data() {
        return {
            emailInput: '',
            displayLoading: false,
            displayAlert: false,
            alertTitle: '',
            alertMessage: '',
            alertType: '',
        }
    },
    methods: {
        requestForgotPassword() {
            this.displayLoading = true
            firebase
                .auth()
                .sendPasswordResetEmail(this.emailInput)
                .then(() => {
                    this.displayLoading = false
                    this.alertTitle = 'Exito!'
                    this.alertMessage =
                        'Hemos enviado a tu correo un email para resetear la contraseña. Porfavor tambien verifica en tu carpeta de SPAM.'
                    this.alertType = 'success'
                    this.displayAlert = true
                    this.redirect = '/'
                })
                .catch(error => {
                    this.displayLoading = false
                    console.log(error)
                    this.alertTitle = 'Hey AWANTA!'
                    this.alertMessage =
                        'Hubo un error con tu peticion por favor intentalo mas tarde.'
                    this.alertType = 'error'
                    this.displayAlert = true
                })
        },
    },
}
</script>