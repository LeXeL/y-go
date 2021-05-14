<template>
    <q-page style="min-height: auto !important">
        <div class="row bg-primary">
            <q-space />
            <div class="col-lg-7 col-xs-12 q-pt-md q-mb-sm text-center">
                <div class="text-h4 text-white text-bold">QUIENES SOMOS</div>
            </div>
            <q-space />
        </div>
        <div class="row bg-grey-3">
            <q-space />
            <div class="col-lg-5 col-md-10">
                <div class="row q-mt-xl q-mb-sm">
                    <q-img
                        :src="require('@/assets/logo_ygo.png')"
                        style="width: 300px; margin: 0 auto;"
                    />
                </div>
                <div class="row q-mb-lg">
                    <div class="text-h5 text-bold text-primary text-center full-width">
                        DE LA WEB A TUS MANOS
                    </div>
                </div>
                <q-separator color="accent" />
                <div class="row q-pa-lg">
                    <div class="text-h6 text-bold">
                        Somos un equipo de trabajo con más de 10 años de experiencia en el servicio
                        y manejo de carga aérea y marítima, brindándote una atención personalizada a
                        la hora de realizar tus compras por internet de manera rápida, eficiente y
                        segura.
                    </div>
                </div>
                <div class="row q-mb-xl">
                    <q-space />
                    <q-btn
                        label="Conoce nuestras tarifas"
                        push
                        color="primary"
                        to="/tarifas"
                        class="text-bold on-left"
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
    mounted() {
        window.scrollTo(0, 0)
    },
}
</script>
