<template>
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
                    <q-btn type="submit" color="accent" label="Restablecer" push class="q-mr-sm" />
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
        return {}
    },
    methods: {},
    created() {
        this.mode = this.$route.query.mode
        this.actionCode = this.$route.query.oobCode
    },
}
</script>