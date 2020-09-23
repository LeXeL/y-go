<template>
    <q-dialog v-model="display" persistent>
        <q-card style="width: auto; background-color: #e6e6e6">
            <q-card-section class="q-pb-none">
                <div class="text-h6 text-center">
                    {{ loading[Math.floor(Math.random() * loading.length)] }}...
                </div>
            </q-card-section>
            <div class="row justify-center">
                <q-card-section class="q-pt-none">
                    <q-img
                        :src="require('@/assets/Vd4Gp.gif')"
                        width="150px"
                        class="justify-center"
                    />
                </q-card-section>
            </div>
        </q-card>
    </q-dialog>
</template>

<script>
export default {
    props: ['display'],
    data() {
        return {
            loading: ['Cargando'],
        }
    },
}
</script>
