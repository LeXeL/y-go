<template>
    <div class="navigation-bar bg-primary text-white shadow-5" style="padding: 5px 0">
        <div class="row">
            <div class="col desktop-only"></div>
            <div class="col-lg-7 col-md-7 col-sm-12 col-xs-12 q-px-md">
                <q-img :src="require('@/assets/logo_ygo.png')" style="width: 75px" />
                <q-btn
                    v-if="!isAuthenticated"
                    push
                    label="Iniciar sesion"
                    color="accent"
                    style="float: right; margin-top: 6px"
                    class="hide-in-mobile"
                    to="/login"
                />
                <q-btn
                    v-if="isAuthenticated && user"
                    push
                    label="Mi casillero"
                    color="accent"
                    style="float: right; margin-top: 6px"
                    class="hide-in-mobile"
                    to="/user"
                />
                <ul class="hide-in-mobile">
                    <li v-for="(link, i) in navLinks" :key="i">
                        <router-link :to="link.route"
                            ><div class="text-h6">{{ link.text }}</div></router-link
                        >
                    </li>
                </ul>

                <q-btn
                    flat
                    color="secondary"
                    class="hide-in-desktop q-mt-sm"
                    style="float: right"
                    round
                    @click="drawer = true"
                >
                    <i class="fas fa-bars"></i>
                </q-btn>
            </div>
            <div class="col desktop-only"></div>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            navLinks: [
                {
                    text: 'Inicio',
                    route: '/',
                },
                {
                    text: 'Tarifas',
                    route: '/',
                },
                {
                    text: 'Nosotros',
                    route: '/',
                },
                {
                    text: 'Contacto',
                    route: '/',
                },
            ],
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
}
</script>