<template>
    <q-page class="bg-primary">
        <div class="absolute-center">
            <q-card style="width: 400px" class="q-pa-md rounded-borders">
                <q-card-section>
                    <q-img
                        :src="require('@/assets/logo_ygo.png')"
                        class="q-mb-md"
                    />
                    <q-input
                        filled
                        label="Correo electronico"
                        class="full-width q-mb-md"
                        type="text"
                        v-model="email"
                    />
                    <q-input
                        filled
                        label="Contraseña"
                        class="full-width q-mb-md"
                        type="password"
                        v-model="password"
                    />
                    <q-btn
                        color="warning"
                        label="Iniciar sesion"
                        class="q-mb-md full-width"
                        @click="login"
                    />
                    <q-card-section v-if="dismissCountDown > 0">
                        <q-banner
                            inline-actions
                            rounded
                            class="bg-red text-white"
                        >
                            {{ errorMessage }}
                            <template v-slot:action>
                                <q-btn flat @click="dismissCountDown = 0">
                                    <i class="fas fa-times"></i>
                                </q-btn>
                            </template>
                        </q-banner>
                    </q-card-section>
                    <div class="text-body2">
                        ¿Olvidaste tu contraseña? Haz click
                        <router-link to="/">aqui</router-link>.
                    </div>
                </q-card-section>
            </q-card>
        </div>
    </q-page>
</template>

<script>
import firebase from 'firebase/app'
import 'firebase/auth'

export default {
    name: 'Login',
    computed: {
        user() {
            return this.$store.getters.user
        },
    },
    data() {
        return {
            email: '',
            password: '',
            dismissSecs: 15,
            dismissCountDown: 0,
            errorMessage: '',
        }
    },
    methods: {
        async login() {
            firebase
                .auth()
                .signInWithEmailAndPassword(this.email, this.password)
                .then(async () => {
                    let user = await firebase.auth().currentUser
                    await this.$store.dispatch('setCurrentUser', user)
                    this.$router.push('/admin')
                })
                .catch(error => {
                    this.dismissCountDown = this.dismissSecs
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
        if (this.user) this.$router.push('/admin')
    },
}
</script>