<template>
    <q-card>
        <q-card-section class="text-center">
            <i class="far fa-laugh-wink fa-5x text-primary"></i>
        </q-card-section>
        <q-card-section class="text-center">
            <div class="text-h5 text-bold">Bienvenido!</div>
        </q-card-section>
        <q-card-section>
            <div class="row">
                <div class="col desktop-only"></div>
                <div class="col-lg-5">
                    <div class="text-subtitle1 text-center">
                        Para continuar, porfavor termina de llenar la informacion personal de tu
                        cuenta.
                    </div>
                    <div class="row q-mb-md">
                        <div class="col">
                            <q-input
                                filled
                                label="Nombre"
                                class="on-left"
                                v-model="registrationData.name"
                            />
                        </div>
                        <div class="col">
                            <q-input
                                filled
                                label="Apellido"
                                class="on-right"
                                v-model="registrationData.lastName"
                            />
                        </div>
                    </div>
                    <div class="row q-mb-md">
                        <div class="col">
                            <q-input filled label="Telefono" v-model="registrationData.phone" />
                        </div>
                    </div>
                    <div class="row q-mb-md">
                        <div class="col-lg-4 col-xs-12 q-pa-sm">
                            <div
                                :class="
                                    registrationData.selectedRateId == 'plan_basico_id'
                                        ? 'rateTileSelected q-pa-md rounded-borders text-center'
                                        : 'rateTile q-pa-md rounded-borders text-center'
                                "
                                @click="registrationData.selectedRateId = 'plan_basico_id'"
                            >
                                <i class="fas fa-weight fa-2x q-mb-sm"></i>
                                <div class="text-h6 q-mb-sm text-bold">
                                    Plan Basico
                                </div>
                                <q-separator
                                    class="q-mb-sm"
                                    :dark="registrationData.selectedRateId == 'plan_basico_id'"
                                />
                                <div class="text-subtitle2">Texto punto 1</div>
                                <div class="text-subtitle2 q-mt-sm">Texto punto 2</div>
                                <div class="text-subtitle2 q-mt-sm">Texto punto 3</div>
                                <div class="text-h5 text-bold q-mt-md">$ 2.50</div>
                            </div>
                        </div>
                        <div class="col-lg-4 col-xs-12 q-pa-sm">
                            <div
                                :class="
                                    registrationData.selectedRateId == 'plan_cerovol_id'
                                        ? 'rateTileSelected q-pa-md rounded-borders text-center'
                                        : 'rateTile q-pa-md rounded-borders text-center'
                                "
                                @click="registrationData.selectedRateId = 'plan_cerovol_id'"
                            >
                                <i class="fas fa-ruler-combined fa-2x q-mb-sm"></i>
                                <div class="text-h6 q-mb-sm text-bold">
                                    Plan Cero Volumen
                                </div>
                                <q-separator
                                    class="q-mb-sm"
                                    :dark="registrationData.selectedRateId == 'plan_cerovol_id'"
                                />
                                <div class="text-subtitle2">Texto punto 1</div>
                                <div class="text-subtitle2 q-mt-sm">Texto punto 2</div>
                                <div class="text-subtitle2 q-mt-sm">Texto punto 3</div>
                                <div class="text-h5 text-bold q-mt-md">$ 3.00</div>
                            </div>
                        </div>
                        <div class="col-lg-4 col-xs-12 q-pa-sm">
                            <div class="bg-grey-3 q-pa-md rounded-borders text-center">
                                <i class="fas fa-building fa-2x q-mb-md"></i>
                                <div class="text-h6 q-mb-sm text-primary text-bold">
                                    Plan Business
                                </div>
                                <q-separator class="q-mb-sm" />
                                <div class="text-subtitle2">Texto punto 1</div>
                                <div class="text-subtitle2 q-mt-sm">Texto punto 2</div>
                                <div class="text-subtitle2 q-mt-sm">Texto punto 3</div>
                                <q-btn
                                    class="q-mt-md"
                                    label="Contactar"
                                    size="sm"
                                    color="accent"
                                    push
                                />
                            </div>
                        </div>
                    </div>
                    <div class="row q-mb-md">
                        <div class="col">
                            <q-input
                                type="textarea"
                                filled
                                rows="4"
                                label="Direccion de entrega"
                                v-model="registrationData.address"
                            />
                        </div>
                    </div>
                    <div class="row q-mb-md">
                        <div class="col">
                            insert map here
                        </div>
                    </div>
                </div>
                <div class="col desktop-only"></div>
            </div>
        </q-card-section>
        <q-card-actions>
            <div class="col desktop-only"></div>
            <div class="col-lg-5">
                <q-btn
                    color="accent"
                    label="Continuar"
                    push
                    style="float: right"
                    @click="submitForm()"
                />
            </div>
            <div class="col desktop-only"></div>
        </q-card-actions>
    </q-card>
</template>

<script>
export default {
    data() {
        return {
            registrationData: {
                name: '',
                lastName: '',
                phone: '',
                selectedRateId: '',
                address: '',
            },
        }
    },
    methods: {
        submitForm() {
            // 1. Validate info
            // 2. Push data to DB
            // 3. Await response
            // 4. Dismiss dialog
            console.log(this.registrationData)
            this.$emit('close-registration-dialog')
        },
    },
}
</script>
