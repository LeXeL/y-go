<template>
    <q-layout class="y-go-font">
        <!-- NAVIGATION BAR -->
        <Navbar class="xs-hide" :navLinks="navLinks" />
        <NavbarMobile class="sm-hide md-hide lg-hide xl-hide" :navLinks="navLinks" />
        <!-- END NAVIGATION BAR -->
        <q-page-container>
            <router-view />
            <q-page-sticky position="bottom-right" :offset="[30, 30]">
                <a href="https://wa.me/50767210200" target="_blank" style="text-decoration: none;">
                    <q-btn fab icon="fab fa-whatsapp" color="accent" push />
                </a>
            </q-page-sticky>
        </q-page-container>
        <!-- FOOTER -->
        <Footer />
        <!-- END FOOTER -->
    </q-layout>
</template>

<script>
import Navbar from '@/components/general/Navbar'
import NavbarMobile from '@/components/general/NavbarMobile'
import Footer from '@/components/general/Footer'

export default {
    data() {
        return {
            navLinks: [
                {
                    label: 'INICIO',
                    route: '/',
                },
                {
                    label: 'QUIENES SOMOS',
                    route: '/quienes-somos',
                },
                {
                    label: 'PLANES',
                    route: '/planes',
                },
                {
                    label: 'PROGRAMA DE LEALTAD',
                    route: '/programa-de-lealtad',
                },
                {
                    label: 'Y-GA Y RECICLA',
                    route: '/yga-y-recicla',
                },
                {
                    label: 'CONTÁCTANOS',
                    route: '/contactanos',
                },
            ],
        }
    },
    components: {
        Navbar,
        Footer,
        NavbarMobile,
    },
}
</script>

<style>
@import './../styles/style.css';
</style>
