<template>
    <section>
        <div class="row q-py-xl">
            <q-space />
            <div class="col-lg-7 col-md-9 q-py-md q-px-xl">
                <div class="row">
                    <div class="col-lg-4 col-md-4 col-sm-12 col-xs-12">
                        <div class="q-mb-md">
                            <q-img :src="require('@/assets/logo_ygo.png')" width="50px" />
                        </div>

                        <div class="text-body2 text-bold q-mb-sm">Y-GO</div>
                        <div class="text-body q-mb-md weight-300">De la web a tus manos</div>
                    </div>
                    <q-space />

                    <div class="col-lg-2 col-md-2 col-sm-4 col-xs-6 q-mb-md">
                        <div class="text-body2 adicon-font-2 text-bold q-mb-sm">Síguenos</div>
                        <a
                            href="https://www.instagram.com/ygopanama/"
                            rel="noopener"
                            target="_blank"
                            class="q-mb-sm text-primary"
                            style="text-decoration: none; display: block"
                            ><i class="fab fa-instagram"></i>&nbsp;Y-GO</a
                        >
                        <a
                            href="https://www.facebook.com/Y-GO-105664918356952"
                            rel="noopener"
                            target="_blank"
                            class="q-mb-sm text-primary"
                            style="text-decoration: none; display: block"
                            ><i class="fab fa-facebook"></i>&nbsp;Y-GO</a
                        >
                    </div>
                    <div class="col-lg-2 q-mb-md">
                        <div class="text-body2 adicon-font-2 text-bold q-mb-sm">Contáctanos</div>
                        <a
                            href="https://wa.me/50767210200"
                            target="_blank"
                            class="q-mb-sm text-primary"
                            style="text-decoration: none; display: block"
                            ><i class="fas fa-phone-alt"></i>&nbsp;6721-0200</a
                        >
                        <a
                            href="mailto:info@y-go.com.pa"
                            target="_blank"
                            class="q-mb-sm text-primary"
                            style="text-decoration: none; display: block"
                            ><i class="far fa-envelope"></i>&nbsp;info@y-go.com.pa</a
                        >
                    </div>
                    <div class="col-lg-2">
                        <div class="text-body2 adicon-font-2 text-bold q-mb-sm">Información</div>
                        <router-link
                            to="/terminos-y-condiciones"
                            class="q-mb-sm text-primary"
                            style="text-decoration: none; display: block"
                            >Términos y Condiciones</router-link
                        >
                        <router-link
                            to="/politicas-de-privacidad"
                            class="q-mb-sm text-primary"
                            style="text-decoration: none; display: block"
                            >Políticas de privacidad</router-link
                        >
                    </div>
                </div>
                <div class="row">
                    <q-separator color="white" class="q-mb-lg" />
                    <div class="text-body2 text-center full-width q-mb-sm">
                        Copyright &copy; {{ new Date().getFullYear() }} Todos los derechos
                        reservados.
                    </div>
                    <div class="text-body2 text-center full-width">
                        Desarrollado por
                        <a
                            href="https://www.blueballoon.io"
                            class="text-accent text-bold"
                            target="_blank"
                            >Blue Balloon Inc.</a
                        >
                    </div>
                </div>
            </div>
            <q-space />
        </div>
    </section>
</template>
