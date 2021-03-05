<template>
    <q-page style="min-height: auto !important">
        <div class="row bg-amber-8">
            <q-space />
            <div class="col-lg-7 col-md-10 col-xs-12 q-px-lg q-py-xl">
                <div class="text-h4 text-white text-italic">CONOCENOS</div>
            </div>
            <q-space />
        </div>
        <div class="row bg-grey-3">
            <q-space />
            <div class="col-lg-7 col-md-10">
                <div class="row q-pa-lg q-mt-xl">
                    <div class="text-h4 text-bold text-accent full-width">Y-Go</div>
                    <div class="text-h4 text-italic text-primary">De la web a tus manos</div>
                    <q-separator />
                </div>
                <div class="row q-pa-lg">
                    <div class="text-h5 text-bold">
                        Somos un equipo de trabajo con más de 10 años de experiencia en el servicio
                        y manejo de carga aérea y marítima, brindándote una atención personalizada a
                        la hora de realizar tus compras por internet de manera rápida, eficiente y
                        segura.
                    </div>
                </div>
                <div class="row q-pa-lg">
                    <div class="q-mb-md">
                        <q-btn
                            label="Conoce nuestras tarifas"
                            push
                            color="primary"
                            to="/tarifas"
                            class="text-bold on-left"
                        />
                    </div>
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