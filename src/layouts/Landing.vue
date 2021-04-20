<template>
    <q-layout class="y-go-font">
        <!-- SOCIAL LINKS -->
        <!-- <SocialBar /> -->
        <!-- END SOCIAL LINKS -->

        <!-- NAVIGATION BAR -->
        <Navbar :navLinks="navLinks" @open-drawer="drawer = true" />
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
                    text: 'Y-GO Reciclando',
                    route: '/ygo-reciclando',
                },
                {
                    text: 'Programa de Lealtad',
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
