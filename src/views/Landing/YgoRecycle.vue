<template>
    <q-page style="min-height: auto !important">
        <div class="row bg-green-7">
            <q-space />
            <div class="col-lg-7 col-xs-12 q-pa-lg text-center">
                <div class="text-h4 text-white text-bold">PROGRAMA Y-GO RECICLANDO</div>
            </div>
            <q-space />
        </div>
        <div class="row bg-grey-3">
            <q-space />
            <div class="col-lg-8 col-md-10 q-pa-lg">
                <div class="row">
                    <q-space />
                    <q-img
                        :src="require('@/assets/Landing/ICO_logo_rec.svg')"
                        style="width: 200px"
                        class="q-mt-md"
                    />
                    <q-space />
                </div>
                <div class="text-h6 text-bold q-mb-lg recycle-text text-center">
                    El Programa "Y-GO RECICLANDO" tiene como objetivo general reducir la disposición
                    de residuos a través de la implementación de las llamadas tres erres (reducir,
                    reutilizar y reciclar)
                </div>
                <div class="row q-mb-lg">
                    <div class="col-lg-3 col-md-3 col-sm-6 q-pa-md">
                        <div class="recycle-bg recycle-tile text-center flex flex-center">
                            <div>
                                <i class="fas fa-leaf fa-3x q-mb-lg" />
                                <div class="text-body2 text-bold">
                                    Por cada caja de cartón o material que pueda ser reclicado,
                                    sumarás para puntos a tu cuenta del programa de lealtad.
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-3 col-md-3 col-sm-6 q-pa-md">
                        <div class="recycle-bg recycle-tile text-center flex flex-center">
                            <div>
                                <div class="text-body2 text-bold q-mb-md" style="font-size: 16px;">
                                    ¿En qué estado deben estar las cajas al momento de entregar?
                                </div>
                                <div class="text-body2 text-bold">
                                    Al momento de entrega las cajas (cartón, cartón corrugado)
                                    pueden tener la cinta adhesiva y labels en ella. Fíjate que
                                    tengan el símbolo de reciclaje en ella para garantizar que en
                                    efecto la caja puede ser reciclada.
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-3 col-md-3 col-sm-6 q-pa-md">
                        <div class="recycle-bg recycle-tile text-center flex flex-center">
                            <div>
                                <div class="text-body2 text-bold">
                                    Deben ser entregadas ya desarmadas o "aplanadas" y remover
                                    cualquier otro material de empaque utilizado (bubblewrap, etc.).
                                    Si tu caja está abollada, golpeada, dañada o doblada, ¡No hay
                                    problema! Todavía la puedes traer para canjearla por puntos.
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-3 col-md-3 col-sm-6 q-pa-md">
                        <div class="recycle-bg recycle-tile text-center flex flex-center">
                            <div>
                                <i class="fas fa-leaf fa-3x q-mb-lg" />
                                <div class="text-body2 text-bold">
                                    Sin embargo, si la caja ha sido mojada, manchada con químicos y
                                    grasas, no podremos recibirla para su debido proceso.
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="text-h5 recycle-text text-bold text-center">
                    Y recuerda ¡Recicla porque el planeta lo vale!
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

<style>
.recycle-text {
    color: #70be44;
}
.recycle-bg {
    background-color: #70be44;
}
.recycle-tile {
    height: 300px;
    padding: 15px;
    color: white;
}
</style>
