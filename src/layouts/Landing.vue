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
                        style="width: 75px; margin-top: 7px"
                    />
                    <ul>
                        <li>
                            <router-link to="/"><div class="text-h6">INICIO</div></router-link>
                        </li>
                        <li>
                            <router-link to="/"><div class="text-h6">TARIFAS</div></router-link>
                        </li>
                        <li>
                            <router-link to="/"><div class="text-h6">NOSOTROS</div></router-link>
                        </li>
                        <li>
                            <router-link to="/"><div class="text-h6">CONTACTO</div></router-link>
                        </li>
                    </ul>
                </div>
                <div class="col desktop-only"></div>
            </div>
        </div>
        <!-- END NAVIGATION BAR -->
        <q-page-container>
            <router-view />
        </q-page-container>
        <!-- FOOTER -->
        <div class="footer-info bg-primary text-white q-py-md">
            <div class="row">
                <div class="col desktop-only"></div>
                <div class="col-lg-7 col-md-7 col-sm-12 col-xs-12 q-px-md text-right">
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

<style>
@import './../styles/style.css';
</style>
