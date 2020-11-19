<template>
    <q-page class="bg-primary y-go-font">
        <loading-alert :display="displayLoading"></loading-alert>
        <ygo-alert
            :display="displayAlert"
            :title="alertTitle"
            :message="alertMessage"
            :type="alertType"
            @accept="displayAlert = false"
        ></ygo-alert>
        <div v-if="mode === 'verifyEmail'">
            <div class="absolute-center">
                <q-card class="text-center">
                    <q-card-section>
                        <q-img
                            :src="require('@/assets/logo_ygo.png')"
                            class="q-mb-md"
                            width="30%"
                        />
                        <div class="text-h5 q-mb-md">
                            Gracias por confirmar tu correo electronico, puedes proceder al perfil
                            de tu cuenta.
                        </div>
                        <q-btn push label="Continuar" color="accent" size="lg" @click="logout()" />
                    </q-card-section>
                </q-card>
            </div>
        </div>
        <div v-if="mode === 'resetPassword'">
            <q-page class="bg-primary">
                <q-card class="absolute-center">
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
                                v-model="password"
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
                            <q-btn
                                type="submit"
                                color="accent"
                                label="Restablecer"
                                push
                                class="q-mr-sm"
                            />
                        </q-card-actions>
                    </q-form>
                </q-card>
            </q-page>
        </div>
    </q-page>
</template>
<script>
import firebase from 'firebase/app'
import 'firebase/auth'
export default {
    data() {
        return {
            password: '',
            repassword: '',
            displayLoading: false,
            displayAlert: false,
            alertTitle: '',
            alertMessage: '',
            alertType: '',
            mode: '',
        }
    },
    methods: {
        logout() {
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
        requestForgotPassword() {
            if (this.password === this.repassword) {
                firebase
                    .auth()
                    .confirmPasswordReset(this.actionCode, this.password)
                    .then(resp => {
                        alert('Contraseña cambiada con éxito')
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
    },
    created() {
        this.mode = this.$route.query.mode
        let actionCode = this.$route.query.oobCode
        if (this.mode === 'resetPassword') {
            firebase
                .auth()
                .verifyPasswordResetCode(actionCode)
                .then(email => {
                    this.email = email
                })
                .catch(error => {
                    this.dismissCountDown = this.dismissSecs
                    this.errorMessage = error
                })
            return
        }
        firebase
            .auth()
            .applyActionCode(actionCode)
            .then(() => {
                console.log('Email is verified')
            })
            .catch(error => {
                console.log(error)
            })
    },
}
</script>
