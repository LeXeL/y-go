<template>
    <q-layout class="y-go-font">
        <!-- SOCIAL LINKS -->
        <SocialBar />
        <!-- END SOCIAL LINKS -->

        <!-- NAVIGATION BAR -->
        <Navbar />
        <!-- END NAVIGATION BAR -->
        <q-page-container>
            <router-view />
        </q-page-container>
        <q-drawer
            v-model="drawer"
            side="right"
            overlay
            behavior="mobile"
            elevated
            class="hide-in-desktop"
        >
            <div class="bg-primary text-white" style="height: 100vh">
                <div class="row q-pa-md">
                    <div class="text-h6 text-weight-bolder">Menu</div>
                    <q-space />
                    <q-btn flat color="secondary" round size="sm" @click="drawer = false">
                        <i class="fas fa-times"></i>
                    </q-btn>
                </div>
                <q-separator dark class="q-mb-lg" />
                <div class="q-px-md">
                    <q-btn
                        push
                        label="Iniciar sesion"
                        color="accent"
                        style="float: right; margin-top: 12px"
                        to="/login"
                    />
                </div>
            </div>
        </q-drawer>
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
</style>
