<template>
    <q-page style="min-height: auto !important">
        <div class="row bg-amber-8">
            <q-space />
            <div class="col-lg-7 col-xs-12 q-pa-lg text-center">
                <div class="text-h4 text-white text-bold">ESCRIBENOS</div>
            </div>
            <q-space />
        </div>
        <div class="row bg-grey-3">
            <q-space />
            <div class="col-lg-7 col-md-7">
                <div class="row q-pa-lg q-mt-xl">
                    <div class="text-h5 q-mb-md">Llena el formulario:</div>
                    <q-input label="Nombre completo" class="full-width q-mb-md" filled />
                    <q-input label="Correo electrónico" class="full-width q-mb-md" filled />
                    <q-input label="Asunto" class="full-width q-mb-md" filled />
                    <q-input label="Mensaje" type="textarea" rows="5" class="full-width" filled />
                </div>
                <div class="row q-pa-lg">
                    <q-space />
                    <q-btn label="Enviar" class="text-bold" push color="accent" />
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
