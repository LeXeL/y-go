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
        <div class="row q-py-lg">
            <div class="col desktop-only"></div>
            <div class="col-lg-9">
                <div class="text-h6 q-mb-md">Register here</div>
                <div class="row">
                    <q-input
                        filled
                        label="Nombre"
                        class="full-width q-mb-md"
                        v-model="form.name"
                        :rules="[
                            val => val.length > 0 || 'El campo es obligatorio',
                        ]"
                    />
                    <q-input
                        filled
                        label="Apellido"
                        class="full-width q-mb-md"
                        v-model="form.lastName"
                        :rules="[
                            val => val.length > 0 || 'El campo es obligatorio',
                        ]"
                    />
                    <q-input
                        filled
                        label="Correo"
                        class="full-width q-mb-md"
                        v-model="form.email"
                        :rules="[
                            val => val.length > 0 || 'El campo es obligatorio',
                            val =>
                                validEmail.test(val) ||
                                'Formato de correo incorrecto',
                        ]"
                    />
                    <q-input
                        filled
                        label="Contraseña"
                        type="password"
                        class="full-width q-mb-md"
                        v-model="form.password"
                        :rules="[
                            val => val.length > 0 || 'El campo es obligatorio',
                            val =>
                                strongPass.test(val) ||
                                'Debe tener 8 caracteres e incluir mayuscula, miniscula, numero, y caracter especial.',
                        ]"
                    />
                    <q-input
                        filled
                        label="Repetir contraseña"
                        type="password"
                        class="full-width q-mb-md"
                        v-model="form.repassword"
                        :rules="[
                            val => val.length > 0 || 'El campo es obligatorio',
                            val =>
                                val == form.password ||
                                'Las contraseñas no coinciden',
                        ]"
                    />
                    <q-checkbox v-model="terms"
                        >Acepto los terminos y condiciones.</q-checkbox
                    >
                    <a
                        class="on-right"
                        href="/terms-and-conditions"
                        target="_blank"
                        >Leer aqui.</a
                    >
                    <q-btn
                        label="registrar"
                        color="primary"
                        @click="createuser"
                    />
                </div>
            </div>
            <q-dialog v-model="confirmationDialog">
                <q-card
                    class="text-white"
                    style="width: 700px; max-width: 80vw"
                >
                    <q-card-section>
                        <div class="text-h6">
                            ¡Hemos recibido tu información!
                        </div>
                    </q-card-section>

                    <q-card-section class="q-pt-none">
                        Hemos recivido tu información satisfactoriamente. Uno de
                        nuestros administradores aprobará tu cuenta para que
                        empieces a realizar pedidos.
                        <br />
                        <br />
                    </q-card-section>

                    <q-card-actions align="right">
                        <router-link to="/">
                            <q-btn
                                flat
                                label="Aceptar"
                                color="primary"
                                v-close-popup
                            />
                        </router-link>
                    </q-card-actions>
                </q-card>
            </q-dialog>
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
    methods: {
        setMarkerPosition(event) {
            this.form.location = event
        },
        createuser() {
            if (!this.terms) {
                this.alertTitle = 'Error'
                this.alertMessage =
                    'Debes llenar todos los campos y aceptar los terminos y condiciones.'
                this.alertType = 'error'
                this.displayAlert = true
                return
            }

            this.displayLoading = true
            if (this.form.password === this.form.repassword) {
                firebase
                    .auth()
                    .createUserWithEmailAndPassword(
                        this.form.email,
                        this.form.password
                    )
                    .then(async user => {
                        await this.$store.dispatch('setCurrentUser', user.user)
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
                                await api
                                    .getUserInformationById({
                                        uid: user.user.uid,
                                    })
                                    .then(response => {
                                        this.$store.commit(
                                            'SET_USER',
                                            response.data.data
                                        )
                                    })
                            })
                    })
                    .catch(error => {
                        // Handle Errors here.
                        console.log(error)
                        this.displayLoading = false
                        this.alertTitle = 'Error'
                        this.alertType = 'error'
                        if (error.code === 'auth/email-already-in-use') {
                            this.alertMessage =
                                'Este correo ya esta en uso registrado'
                        }
                        this.displayAlert = true
                        // ...
                    })
            } else {
                this.dismissCountDown = this.dismissSecs
                this.errorMessage = 'Las Contraseñas no son iguales'
            }
        },
    },
}
</script>
