<template>
    <q-page style="min-height: auto !important">
        <div class="row bg-primary">
            <q-space />
            <div class="col-lg-7 col-xs-12 q-pt-md q-mb-sm text-center">
                <div class="text-h4 text-white text-bold">NUESTROS PLANES</div>
            </div>
            <q-space />
        </div>
        <div class="row bg-cyan-2">
            <q-space />
            <div class="col-lg-8">
                <div class="row q-py-lg">
                    <q-space />
                    <q-btn
                        label="planes aéreo"
                        :color="ratesOnDisplay == 'air' ? 'primary' : 'grey-5'"
                        class="text-bold on-left"
                        unelevated
                        @click="ratesOnDisplay = 'air'"
                    />
                    <q-btn
                        label="planes maritimo"
                        :color="ratesOnDisplay == 'sea' ? 'primary' : 'grey-5'"
                        class="text-bold on-right"
                        unelevated
                        @click="ratesOnDisplay = 'sea'"
                    />
                    <q-space />
                </div>
                <div class="row">
                    <div class="col-lg-3 col-md-4 col-sm-6 col-xs-12 q-pa-md">
                        <q-card flat style="height: 845px;">
                            <q-card-section class="text-center">
                                <!-- <i class="fas fa-box-open fa-4x q-mb-md text-grey-7"></i> -->
                                <img
                                    src="@/assets/Landing/icons/ICO_standard.svg"
                                    style="width: 65px;"
                                    v-if="ratesOnDisplay == 'air'"
                                />
                                <img
                                    src="@/assets/Landing/icons/ICO_m_standard.svg"
                                    style="width: 65px;"
                                    v-else
                                />
                                <div class="text-h6 text-bold text-accent">
                                    PLAN STANDARD
                                </div>
                            </q-card-section>
                            <q-separator color="primary" />
                            <q-card-section>
                                <div class="text-subtitle2 text-center text-bold q-mb-sm">
                                    Ideal para tu paquetería pequeña
                                </div>
                                <div class="text-subtitle2 text-center text-bold">
                                    * La libra a considerar es la mayor entre el peso real y el peso
                                    volumétrico del paquete
                                </div>
                            </q-card-section>
                            <q-card-section class="text-center q-pt-none">
                                <div class="text-h6 text-bold q-mb-md text-primary">
                                    Incluido en tu plan
                                </div>
                                <div class="text-subtitle2 text-bold q-mb-sm">
                                    PO Box personal en Miami
                                </div>
                                <div class="text-subtitle2 text-bold q-mb-sm">
                                    Carga aérea y carga marítima
                                </div>
                                <div class="text-subtitle2 text-bold q-mb-sm">
                                    Vuelos diarios Miami - Panam&aacute;
                                </div>
                                <div class="text-subtitle2 text-bold q-mb-sm">
                                    <a
                                        class="text-primary"
                                        href="/terminos-y-condiciones#reclamos-y-seguros"
                                        target="_blank"
                                        >Paqueteria asegurada</a
                                    >
                                </div>
                                <div class="text-subtitle2 text-bold q-mb-sm">
                                    Entrega a domicilio (ciudad y provincia)
                                </div>
                                <div class="text-subtitle2 text-bold q-mb-sm">
                                    Servicio de retorno
                                </div>
                                <div class="text-subtitle2 text-bold q-mb-sm">
                                    Servicio de compras por internet
                                </div>
                                <div class="text-subtitle2 text-bold q-mb-sm">
                                    Notificaci&oacute;n vía web
                                </div>
                                <div class="text-subtitle2 text-bold q-mb-sm">
                                    Acceso a tu perfil personal
                                </div>
                            </q-card-section>
                            <q-card-section class="text-center">
                                <div class="text-h4 text-accent" v-if="ratesOnDisplay == 'air'">
                                    *$ <strong>2.50</strong>/lb
                                </div>
                                <div class="text-h4 text-accent" v-if="ratesOnDisplay == 'sea'">
                                    *$ <strong>10.00</strong>/pie<sup>3</sup>
                                </div>
                            </q-card-section>
                            <q-card-actions align="center">
                                <q-btn
                                    label="Contáctanos"
                                    dense
                                    color="accent"
                                    class="text-bold q-mb-sm"
                                    to="/contactanos"
                                />
                                <div class="text-caption text-center">
                                    No estas seguro de cual plan escoger, contactanos y con gusto te
                                    asesoramos.
                                </div>
                            </q-card-actions>
                        </q-card>
                    </div>
                    <div class="col-lg-3 col-md-4 col-sm-6 col-xs-12 q-pa-md">
                        <q-card flat style="height: 845px;">
                            <q-card-section class="text-center">
                                <img
                                    src="@/assets/Landing/icons/ICO_premium.svg"
                                    style="width: 65px;"
                                    v-if="ratesOnDisplay == 'air'"
                                />
                                <img
                                    src="@/assets/Landing/icons/ICO_m_premium.svg"
                                    style="width: 65px;"
                                    v-else
                                />
                                <div class="text-h6 text-bold text-accent">
                                    PLAN PREMIUM
                                </div>
                            </q-card-section>
                            <q-separator color="primary" />
                            <q-card-section>
                                <div class="text-subtitle2 text-center text-bold q-mb-sm">
                                    Mas flexibilidad para tu paqueteria mediana y grande
                                </div>
                                <div class="text-subtitle2 text-center text-bold">
                                    * La libra a considerar es únicamente el peso real del producto.
                                </div>
                            </q-card-section>
                            <q-card-section class="q-pt-none text-center">
                                <div class="text-h6 text-bold q-mb-md text-primary">
                                    Incluido en tu plan
                                </div>
                                <div class="text-subtitle2 text-bold q-mb-sm">
                                    PO Box personal en Miami
                                </div>
                                <div class="text-subtitle2 text-bold q-mb-sm">
                                    Carga aérea y carga marítima
                                </div>
                                <div class="text-subtitle2 text-bold q-mb-sm">
                                    Vuelos diarios Miami - Panam&aacute;
                                </div>
                                <div class="text-subtitle2 text-bold q-mb-sm">
                                    <a
                                        class="text-primary"
                                        href="/terminos-y-condiciones#reclamos-y-seguros"
                                        target="_blank"
                                        >Paqueteria asegurada</a
                                    >
                                </div>
                                <div class="text-subtitle2 text-bold q-mb-sm">
                                    Entrega a domicilio (ciudad y provincia)
                                </div>
                                <div class="text-subtitle2 text-bold q-mb-sm">
                                    Servicio de retorno
                                </div>
                                <div class="text-subtitle2 text-bold q-mb-sm">
                                    Servicio de compras por internet
                                </div>
                                <div class="text-subtitle2 text-bold q-mb-sm">
                                    Notificaci&oacute;n vía web
                                </div>
                                <div class="text-subtitle2 text-bold q-mb-sm">
                                    Acceso a tu perfil personal
                                </div>
                            </q-card-section>
                            <q-card-section class="text-center">
                                <div class="text-h4 text-accent" v-if="ratesOnDisplay == 'air'">
                                    *$ <strong>3.50</strong>/lb
                                </div>
                                <div class="text-h4 text-accent" v-if="ratesOnDisplay == 'sea'">
                                    *$ <strong>10.00</strong>/pie<sup>3</sup>
                                </div>
                            </q-card-section>
                            <q-card-actions align="center">
                                <q-btn
                                    label="Contáctanos"
                                    dense
                                    color="accent"
                                    class="text-bold q-mb-sm"
                                    to="/contactanos"
                                />
                                <div class="text-caption text-center">
                                    No estas seguro de cual plan escoger, contactanos y con gusto te
                                    asesoramos.
                                </div>
                            </q-card-actions>
                        </q-card>
                    </div>
                    <div class="col-lg-3 col-md-4 col-sm-6 col-xs-12 q-pa-md">
                        <q-card flat style="height: 845px;">
                            <q-card-section class="text-center">
                                <img
                                    src="@/assets/Landing/icons/ICO_business.svg"
                                    style="width: 65px;"
                                    v-if="ratesOnDisplay == 'air'"
                                />
                                <img
                                    src="@/assets/Landing/icons/ICO_m_business.svg"
                                    style="width: 65px;"
                                    v-else
                                />
                                <div class="text-h6 text-bold text-accent">
                                    PLAN BUSINESS
                                </div>
                            </q-card-section>
                            <q-separator color="primary" />
                            <q-card-section class="text-center">
                                <div class="text-subtitle2 text-bold text-primary">
                                    ESPECIAL PARA NEGOCIOS
                                </div>
                                <div class="text-h4" style="padding: 117px 0">
                                    Contáctanos para m&aacute;s informaci&oacute;n
                                </div>
                            </q-card-section>
                            <q-card-section class="text-center">
                                <q-btn
                                    label="ESCRÍBENOS"
                                    color="accent"
                                    class="text-bold q-px-md"
                                    unelevated
                                    to="/contacto"
                                />
                            </q-card-section>
                        </q-card>
                    </div>
                    <div class="col-lg-3 col-md-4 col-sm-6 col-xs-12 q-pa-md">
                        <q-card flat style="height: 845px;" class="loyalty-frame">
                            <q-card-section class="text-center">
                                <img
                                    src="@/assets/Landing/icons/ICO_lealtad.svg"
                                    style="width: 65px;"
                                />
                                <div class="text-h6 text-bold loyalty-text">
                                    PROGRAMA DE LEALTAD
                                </div>
                            </q-card-section>
                            <q-separator />
                            <q-card-section class="text-center">
                                <div class="text-subtitle2 text-bold loyalty-text">
                                    AFÍLIATE AL PROGRAMA DE LEALTAD Y-GO Y OBTÉN MÁS BENEFICIOS
                                </div>
                                <div style="padding: 75px 0" class="loyalty-text">
                                    <div class="text-subtitle3 text-bold q-mb-sm">
                                        Entrega a domicilio gratis
                                    </div>
                                    <div class="text-subtitle3 text-bold q-mb-sm">
                                        Acumula puntos por cada traida
                                    </div>
                                    <div class="text-subtitle3 text-bold q-mb-sm">
                                        Canjea tus puntos por libra
                                    </div>
                                    <div class="text-subtitle3 text-bold q-mb-sm">
                                        Sube de rango haciendo pedidos
                                    </div>
                                </div>
                            </q-card-section>
                            <q-card-section class="text-center">
                                <q-btn
                                    label="Inscríbete"
                                    class="text-bold q-px-md loyalty-cta text-white"
                                    unelevated
                                    to="/programa-de-lealtad"
                                />
                            </q-card-section>
                        </q-card>
                    </div>
                </div>
            </div>
            <q-space />
        </div>
    </q-page>
</template>

<script>
export default {
    data() {
        return {
            ratesOnDisplay: 'air',
        }
    },
    mounted() {
        window.scrollTo(0, 0)
    },
}
</script>

<style>
.loyalty-frame {
    border: 10px solid;
    border-image-slice: 1;
    border-width: 7px;
    border-image-source: linear-gradient(to right, #f5c987, #b68d4c);
}
.loyalty-text {
    background: linear-gradient(to top right, #333, #969696, #333);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    border: solid 1px 3000;
}
.loyalty-cta {
    background: linear-gradient(to top right, #333, #bfbfbf, #333) !important;
}
.text-subtitle3 {
    font-size: 15px;
}
</style>
