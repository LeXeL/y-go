<template>
    <q-page class="bg-primary y-go-font">
        <div class="absolute-center">
            <q-card class="text-center">
                <q-card-section>
                    <q-img :src="require('@/assets/logo_ygo.png')" class="q-mb-md" width="30%" />
                    <div class="text-h5 q-mb-md">
                        Gracias por confirmar tu correo electronico, puedes proceder al perfil de tu
                        cuenta.
                    </div>
                    <q-btn
                        push
                        label="Continuar"
                        color="accent"
                        size="lg"
                        @click="$router.push('/login')"
                    />
                </q-card-section>
            </q-card>
        </div>
    </q-page>
</template>
<script>
import firebase from 'firebase/app'
import 'firebase/auth'
export default {
    created() {
        let mode = this.$route.query.mode
        let actionCode = this.$route.query.oobCode
        firebase
            .auth()
            .applyActionCode(this.actionCode)
            .then(() => {})
            .catch(error => {
                console.log(error)
            })
    },
}
</script>
