<template>
    <q-page style="min-height: auto">
        <div class="row bg-green-7">
            <q-space />
            <div class="col-lg-7 q-px-lg q-py-xl">
                <div class="text-h4 text-white text-italic">Y-Go Reciclando</div>
            </div>
            <q-space />
        </div>
        <div class="row bg-grey-3" style="height: 675px">
            <q-space />
            <div class="col-lg-7 q-pa-lg">
                <div class="row">
                    <q-space />
                    <q-img
                        :src="require('@/assets/Landing/ygo-reciclando.webp')"
                        style="width: 200px"
                        class="q-mt-md q-mb-xl"
                    />
                    <q-space />
                </div>
                <div class="text-body2 text-bold q-mb-lg">
                    El Programa "Y-GO RECICLANDO" tiene como objetivo general reducir la disposición
                    de residuos a través de la implementación de las llamadas tres erres (reducir,
                    reutilizar y reciclar)
                </div>
                <div class="text-h6 text-bold">¿Como funciona?</div>
                <div class="text-body2 text-bold q-mb-lg">
                    - Por cada caja de carton o material que pueda ser reclicado, sumaras para
                    puntos a tu cuenta del programa de lealtad.
                </div>
                <div class="text-h6 text-bold">
                    ¿En que estado deben estar las cajas al momento de entregar?
                </div>
                <div class="text-body2 text-bold q-mb-sm">
                    - Al momento de entrega las cajas (carton, carton corrugado) pueden tener la
                    cinta adhesiva y labels en ella. Fijate que tengan el simbolo de reciclaje en
                    ella para garantizar que en efecto la caja puede ser reciclada.
                </div>
                <div class="text-body2 text-bold q-mb-sm">
                    - Deben ser entregadas ya desarmadas o "aplanada" y remover cualquier otro
                    material de empaque utilizado (bubblewrap,etc.). Si tu caja esta abollada,
                    golpeada, dañada o doblada, no hay problema! Todavia la puedes traer para
                    canjearla por puntos.
                </div>
                <div class="text-body2 text-bold q-mb-lg">
                    - Sin embargo, si la caja ha sido mojada, manchada con quimicos y grasas, no
                    podremos recibirla para su debido proceso.
                </div>
                <div class="text-h6 text-bold text-green-7 q-mb-lg">
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
}
</script>