<template>
    <q-layout class="y-go-font">
        <!-- SOCIAL LINKS -->
        <div class="social-ribbon bg-accent text-white">
            <div class="row">
                <div class="col desktop-only"></div>
                <div class="col-lg-7 col-md-7 col-sm-12 col-xs-12 q-px-md">
                    <ul>
                        <li>
                            <a href="#" target="_blank"
                                ><i class="fab fa-instagram q-mr-sm"></i>Instagram</a
                            >
                        </li>
                        <li>
                            <a href="#" target="_blank"
                                ><i class="fab fa-facebook q-mr-sm"></i>Facebook</a
                            >
                        </li>
                    </ul>
                </div>
                <div class="col desktop-only"></div>
            </div>
        </div>
        <!-- END SOCIAL LINKS -->

        <!-- NAVIGATION BAR -->
        <div class="navigation-bar bg-primary text-white shadow-5">
            <div class="row">
                <div class="col desktop-only"></div>
                <div class="col-lg-7 col-md-7 col-sm-12 col-xs-12 q-px-md">
                    <q-img
                        :src="require('@/assets/logo_ygo.png')"
                        style="width: 75px; margin-top: 5px"
                    />
                    <q-btn
                        push
                        label="Iniciar sesion"
                        color="accent"
                        style="float: right; margin-top: 12px"
                        class="hide-in-mobile"
                        to="/login"
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
                <div class="row q-px-md q-py-sm text-right" v-for="(link, i) in navLinks" :key="i">
                    <div class="text-h5 full-width">
                        <router-link
                            :to="link.route"
                            style="color: #fff; text-decoration: none"
                            >{{ link.text }}</router-link
                        >
                    </div>
                </div>
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
        <div class="footer-info bg-primary text-white q-py-md">
            <div class="row">
                <div class="col desktop-only"></div>
                <div class="col-lg-7 col-md-7 col-sm-12 col-xs-12 q-px-md text-center">
                    Developed by
                    <a href="https://www.blueballoon.io" target="_blank" class="text-white"
                        >BlueBalloon Inc.</a
                    >
                </div>
                <div class="col desktop-only"></div>
            </div>
        </div>
        <!-- END FOOTER -->
    </q-layout>
</template>

<script>
export default {
  data() {
    return {
      drawer: false,
      navLinks: [
        {
          text: 'Inicio',
          route: '/'
        },
        {
          text: 'Tarifas',
          route: '/'
        },
        {
          text: 'Nosotros',
          route: '/'
        },
        {
          text: 'Contacto',
          route: '/'
        },
      ]
    }
  }
}
</script>

<style>
@import './../styles/style.css';
</style>
