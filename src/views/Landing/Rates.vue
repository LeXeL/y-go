<template>
    <q-page style="min-height: auto !important">
        <div class="row bg-amber-8">
            <q-space />
            <div class="col-lg-7 col-xs-12 q-pa-lg text-center">
                <div class="text-h4 text-white text-bold">NUESTRAS TARIFAS</div>
            </div>
            <q-space />
        </div>
        <div class="row bg-cyan-2">
            <q-space />
            <div class="col-lg-8">
                <div class="row q-py-lg">
                    <q-space />
                    <q-btn
                        label="tarifa aerea"
                        :color="ratesOnDisplay == 'air' ? 'primary' : 'grey-5'"
                        class="text-bold on-left"
                        push
                        @click="ratesOnDisplay = 'air'"
                    />
                    <q-btn
                        label="tarifa maritima"
                        :color="ratesOnDisplay == 'sea' ? 'primary' : 'grey-5'"
                        class="text-bold on-right"
                        push
                        @click="ratesOnDisplay = 'sea'"
                    />
                    <q-space />
                </div>
                <div class="row">
                    <div class="col-lg-3 col-md-4 col-sm-6 col-xs-12 q-pa-md">
                        <q-card flat style="height: 625px;">
                            <q-card-section class="text-center">
                                <i class="fas fa-box-open fa-4x q-mb-md text-grey-7"></i>
                                <div class="text-h6 text-bold text-accent">
                                    PLAN STANDARD
                                </div>
                            </q-card-section>
                            <q-separator />
                            <q-card-section class="text-center">
                                <div class="text-subtitle2 text-bold q-mb-sm">
                                    PO Box personal en Miami
                                </div>
                                <div class="text-subtitle2 text-bold q-mb-sm">
                                    Carga aerea y carga maritima
                                </div>
                                <div class="text-subtitle2 text-bold q-mb-sm">
                                    Vuelos diarios Miami - Panam&aacute;
                                </div>
                                <div class="text-subtitle2 text-bold q-mb-sm">
                                    <a
                                        class="text-primary"
                                        href="/terminos-y-condiciones#reclamos-y-seguros"
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
                                    Servicio de compra de internet
                                </div>
                                <div class="text-subtitle2 text-bold q-mb-sm">
                                    Notificaci&oacute;n via web
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
                            <q-card-section class="text-center" v-if="ratesOnDisplay == 'air'">
                                <div class="text-caption">
                                    La libra a considerar es la mayor entre el peso real y el peso
                                    volumetrico del paquete.
                                </div>
                            </q-card-section>
                        </q-card>
                    </div>
                    <div class="col-lg-3 col-md-4 col-sm-6 col-xs-12 q-pa-md">
                        <q-card flat style="height: 625px;">
                            <q-card-section class="text-center">
                                <i class="fas fa-ruler-combined fa-4x q-mb-md text-grey-7"></i>
                                <div class="text-h6 text-bold text-accent">
                                    PLAN PREMIUM
                                </div>
                            </q-card-section>
                            <q-separator />
                            <q-card-section class="text-center">
                                <div class="text-subtitle2 text-bold q-mb-sm">
                                    PO Box personal en Miami
                                </div>
                                <div class="text-subtitle2 text-bold q-mb-sm">
                                    Carga aerea y carga maritima
                                </div>
                                <div class="text-subtitle2 text-bold q-mb-sm">
                                    Vuelos diarios Miami - Panam&aacute;
                                </div>
                                <div class="text-subtitle2 text-bold q-mb-sm">
                                    <a
                                        class="text-primary"
                                        href="/terminos-y-condiciones#reclamos-y-seguros"
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
                                    Servicio de compra de internet
                                </div>
                                <div class="text-subtitle2 text-bold q-mb-sm">
                                    Notificaci&oacute;n via web
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
                            <q-card-section class="text-center" v-if="ratesOnDisplay == 'air'">
                                <div class="text-caption">
                                    La libra a considerar es unicamente el peso real del paquete.
                                </div>
                            </q-card-section>
                        </q-card>
                    </div>
                    <div class="col-lg-3 col-md-4 col-sm-6 col-xs-12 q-pa-md">
                        <q-card flat style="height: 625px;">
                            <q-card-section class="text-center">
                                <i class="fas fa-building fa-4x q-mb-md text-grey-7"></i>
                                <div class="text-h6 text-bold text-accent">
                                    PLAN BUSINESS
                                </div>
                            </q-card-section>
                            <q-separator />
                            <q-card-section class="text-center">
                                <div class="text-subtitle2 text-bold text-primary">
                                    ESPECIAL PARA NEGOCIOS
                                </div>
                                <div class="text-h4" style="padding: 117px 0">
                                    Contactanos para mas informaci&oacute;n
                                </div>
                            </q-card-section>
                            <q-card-section class="text-center">
                                <q-btn
                                    label="ESCRIBENOS"
                                    color="accent"
                                    class="text-bold q-px-md"
                                    push
                                    to="/contacto"
                                />
                            </q-card-section>
                        </q-card>
                    </div>
                    <div class="col-lg-3 col-md-4 col-sm-6 col-xs-12 q-pa-md">
                        <q-card flat style="height: 625px;">
                            <q-card-section class="text-center">
                                <i class="fas fa-building fa-4x q-mb-md text-grey-7"></i>
                                <div class="text-h6 text-bold text-accent">
                                    PROGRAMA DE LEALTAD
                                </div>
                            </q-card-section>
                            <q-separator />
                            <q-card-section class="text-center">
                                <div class="text-subtitle2 text-bold text-primary">
                                    AFILIATE AL PROGRAMA DE LEALTAD Y-GO Y OBTEN MAS BENEFICIOS
                                </div>
                                <div style="padding: 111px 0">
                                    <div class="text-subtitle2 text-bold">
                                        Entrega a domicilio gratis
                                    </div>
                                    <div class="text-subtitle2 text-bold">
                                        Acumula puntos por cada traida
                                    </div>
                                    <div class="text-subtitle2 text-bold">
                                        Canjea tus puntos por libra
                                    </div>
                                    <div class="text-subtitle2 text-bold">
                                        Sube de rango haciendo pedidos
                                    </div>
                                </div>
                            </q-card-section>
                            <q-card-section class="text-center">
                                <q-btn
                                    label="Inscribete"
                                    color="accent"
                                    class="text-bold q-px-md"
                                    push
                                    to="/"
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
            ratesOnDisplay: 'sea',
        }
    },
    mounted() {
        window.scrollTo(0, 0)
    },
}
</script>
