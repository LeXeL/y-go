<template>
    <section>
        <div class="row q-py-xl">
            <q-space />
            <div class="col-lg-7 col-md-9 q-py-md q-px-xl">
                <div class="row q-mb-lg">
                    <div class="col-lg-4 col-md-4 col-sm-12 col-xs-12">
                        <div class="q-mb-md">
                            <q-img :src="require('@/assets/logo_ygo.png')" width="50px" />
                        </div>

                        <div class="text-body2 text-bold q-mb-sm">Y-Go</div>
                        <div class="text-body q-mb-md weight-300">De la web a tus manos</div>
                        <router-link
                            to="/terminos-y-condiciones"
                            class="q-mb-sm text-primary text-bold"
                            style="text-decoration: none; display: block"
                            >Términos y Condiciones</router-link
                        >
                        <router-link
                            to="/politicas-de-privacidad"
                            class="q-mb-sm text-primary text-bold"
                            style="text-decoration: none; display: block"
                            >Políticas de privacidad</router-link
                        >
                    </div>
                    <q-space />
                    <div class="col-lg-2 col-md-2 col-sm-4 col-xs-6">
                        <div class="text-body2 adicon-font-2 text-bold q-mb-sm">Enlaces</div>
                        <router-link
                            class="q-mb-sm text-primary"
                            to="/"
                            style="text-decoration: none; display: block"
                            >Inicio</router-link
                        >
                        <router-link
                            class="q-mb-sm text-primary"
                            to="/tarifas"
                            style="text-decoration: none; display: block"
                            >Tarifas</router-link
                        >
                        <router-link
                            class="q-mb-sm text-primary"
                            to="/programa-de-lealtad"
                            style="text-decoration: none; display: block"
                            >Programa de lealtad</router-link
                        >
                        <router-link
                            class="q-mb-sm text-primary"
                            to="/nosotros"
                            style="text-decoration: none; display: block"
                            >Nosotros</router-link
                        >
                        <router-link
                            class="q-mb-sm text-primary"
                            to="/contacto"
                            style="text-decoration: none; display: block"
                            >Contacto</router-link
                        >
                    </div>
                    <div class="col-lg-2 col-md-2 col-sm-4 col-xs-6">
                        <div class="text-body2 adicon-font-2 text-bold q-mb-sm">Siguenos</div>
                        <a
                            href="#"
                            rel="noopener"
                            target="_blank"
                            class="q-mb-sm text-primary"
                            style="text-decoration: none; display: block"
                            ><i class="fab fa-instagram"></i>&nbsp;y-go-panama</a
                        >
                        <a
                            href="#"
                            rel="noopener"
                            target="_blank"
                            class="q-mb-sm text-primary"
                            style="text-decoration: none; display: block"
                            ><i class="fab fa-facebook"></i>&nbsp;Y-Go Panama</a
                        >
                    </div>
                    <div class="col-lg-3">
                        <div class="text-body2 adicon-font-2 text-bold q-mb-sm">Contáctanos</div>
                        <a
                            href="tel:6565-6565"
                            target="_blank"
                            class="q-mb-sm text-primary"
                            style="text-decoration: none; display: block"
                            ><i class="fas fa-phone-alt"></i>&nbsp;66565-6565</a
                        >
                        <a
                            href="mailto:info@y-go.com.pa"
                            target="_blank"
                            class="q-mb-sm text-primary"
                            style="text-decoration: none; display: block"
                            ><i class="far fa-envelope"></i>&nbsp;info@y-go.com.pa</a
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
                            href="https://www.blueballoonpa.com"
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
