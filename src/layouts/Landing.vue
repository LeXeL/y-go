<template>
    <q-layout class="y-go-font">
        <!-- SOCIAL LINKS -->
        <!-- <SocialBar /> -->
        <!-- END SOCIAL LINKS -->

        <!-- NAVIGATION BAR -->
        <Navbar :navLinks="navLinks" @open-drawer="drawer = true" />
        <!-- END NAVIGATION BAR -->

        <!-- RECYCLE BANNER -->
        <div class="row bg-green-7" v-if="!$route.fullPath.includes('ygo-reciclando')">
            <q-space />
            <div class="col-lg-7 col-md-10 col-sm-12 col-xs-12 q-px-lg q-pt-md q-pb-sm">
                <div class="row sm-hide md-hide lg-hide xl-hide">
                    <q-space />
                    <div class="text-text2 text-white text-right on-left text-bold">
                        <i class="fas fa-recycle"></i>
                        Recicla tus cajas con nosotros.
                    </div>
                    <q-btn
                        label="Leer mas"
                        no-caps
                        outline
                        color="white"
                        size="sm"
                        rounded
                        class="text-bold on-right"
                        to="/ygo-reciclando"
                    />
                </div>
                <div class="row xs-hide">
                    <q-space />
                    <div class="text-h6 text-white text-right on-left text-bold">
                        <i class="fas fa-recycle"></i>
                        Recicla tus cajas con nosotros.
                    </div>
                    <q-btn
                        label="Leer mas"
                        no-caps
                        outline
                        color="white"
                        rounded
                        class="text-bold on-right"
                        to="/ygo-reciclando"
                    />
                </div>
            </div>
            <q-space />
        </div>
        <!-- END RECYCLE BANNER -->

        <q-page-container>
            <router-view />
        </q-page-container>
        <!-- FOOTER -->
        <Footer />
        <!-- END FOOTER -->
    </q-layout>
</template>

<script>
import SocialBar from '@/components/general/SocialBar'
import Navbar from '@/components/general/Navbar'
import Footer from '@/components/general/Footer'

export default {
    data() {
        return {
            drawer: false,
            navLinks: [
                {
                    text: 'Inicio',
                    route: '/',
                },
                {
                    text: 'Tarifas',
                    route: '/tarifas',
                },
                {
                    text: 'Programa de lealtad',
                    route: '/programa-de-lealtad',
                },
                {
                    text: 'Nosotros',
                    route: '/nosotros',
                },
                {
                    text: 'Contacto',
                    route: '/contacto',
                },
            ],
        }
    },

    components: {
        SocialBar,
        Navbar,
        Footer,
    },
}
</script>

<style>
@import './../styles/style.css';

.drawer-link {
    text-align: right;
    list-style-type: none;
    font-size: 30px;
}

.drawer-link li {
    margin-bottom: 15px;
}
</style>
