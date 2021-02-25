<template>
    <q-page style="min-height: auto !important">
        <div class="row bg-amber-8">
            <q-space />
            <div class="col-lg-7 q-px-lg q-py-xl">
                <div class="text-h4 text-white text-italic">CONOCE NUESTRAS TARIFAS</div>
            </div>
            <q-space />
        </div>
        <div class="row bg-grey-3">
            <q-space />
            <div class="col-lg-7">
                <div class="row q-mt-xl q-mb-lg">
                    <q-space />
                    <q-btn
                        label="TARIFAS AEREAS"
                        :color="ratesOnDisplay == 'aero' ? 'primary' : 'grey-5'"
                        class="text-bold on-left"
                        push
                        @click="ratesOnDisplay = 'aero'"
                    />
                    <q-btn
                        label="TARIFAS MARITIMAS"
                        :color="ratesOnDisplay == 'maritime' ? 'primary' : 'grey-5'"
                        class="text-bold on-right"
                        push
                        @click="ratesOnDisplay = 'maritime'"
                    />
                    <q-space />
                </div>
                <div class="row q-mb-xl">
                    <div class="col-lg-4 col-md-4 q-pa-lg">
                        <q-card class="text-center" flat style="border-left: solid 5px #ff5722">
                            <q-card-section>
                                <i class="fas fa-box-open fa-2x text-grey-8"></i>
                            </q-card-section>
                            <q-card-section>
                                <div class="text-h6 text-bold text-center text-primary">
                                    Plan Basico
                                    {{ ratesOnDisplay == 'aero' ? 'Aereo' : 'Maritimo' }}
                                </div>
                            </q-card-section>
                            <q-card-section>
                                <div class="text-subtitle2 text-bold">
                                    Calculamos el costo de tu paquete en base al peso real o
                                    volumetrico.
                                </div>
                            </q-card-section>
                            <q-separator />
                            <q-card-section>
                                <div class="text-h5 text-bold text-accent">
                                    $ {{ ratesOnDisplay == 'aero' ? '2.50' : '10.00' }} x libra
                                </div>
                            </q-card-section>
                        </q-card>
                    </div>
                    <div class="col-lg-4 col-md-4 q-pa-lg">
                        <q-card class="text-center" flat style="border-left: solid 5px #ff5722">
                            <q-card-section>
                                <i class="fas fa-weight-hanging fa-2x text-grey-8"></i>
                            </q-card-section>
                            <q-card-section>
                                <div class="text-h6 text-bold text-center text-primary">
                                    Plan Cero Volumen
                                    {{ ratesOnDisplay == 'aero' ? 'Aereo' : 'Maritimo' }}
                                </div>
                            </q-card-section>
                            <q-card-section>
                                <div class="text-subtitle2 text-bold">
                                    Trae tu mercancia y despreocupate por el volumen de tus
                                    paquetes.
                                </div>
                            </q-card-section>
                            <q-separator />
                            <q-card-section>
                                <div class="text-h5 text-bold text-accent">
                                    $ {{ ratesOnDisplay == 'aero' ? '3.00' : '10.00' }} x libra
                                </div>
                            </q-card-section>
                        </q-card>
                    </div>
                    <div class="col-lg-4 col-md-4 q-pa-lg">
                        <q-card class="text-center" flat style="border-left: solid 5px #ff5722">
                            <q-card-section>
                                <i class="fas fa-building fa-2x text-grey-8"></i>
                            </q-card-section>
                            <q-card-section>
                                <div class="text-h6 text-bold text-center text-primary">
                                    Plan Business
                                    {{ ratesOnDisplay == 'aero' ? 'Aereo' : 'Maritimo' }}
                                </div>
                            </q-card-section>
                            <q-card-section>
                                <div class="text-subtitle2 text-bold">
                                    Especial para negocios. Contactanos para mas informacion.
                                </div>
                            </q-card-section>
                            <q-separator />
                            <q-card-section>
                                <div
                                    class="text-h5 text-bold text-accent"
                                    style="cursor: pointer; text-decoration: underline"
                                    @click="$router.push('/contacto')"
                                >
                                    Escribenos
                                </div>
                            </q-card-section>
                        </q-card>
                    </div>
                </div>
                <div class="row">
                    <q-space />
                    <q-btn
                        label="¡Abre tu casillero YA!"
                        no-caps
                        push
                        color="accent"
                        class="text-bold q-mb-lg"
                        to="/"
                    />
                    <q-space />
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
            ratesOnDisplay: 'aero',
        }
    },
    mounted() {
        window.scrollTo(0, 0)
    },
}
</script>