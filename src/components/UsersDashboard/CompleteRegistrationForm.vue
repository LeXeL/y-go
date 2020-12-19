<template>
    <q-card>
        <div class="pattern-bg">
            <div class="row">
                <div class="col desktop-only"></div>
                <div class="col-lg-6 y-go-font">
                    <div class="text-center q-py-lg">
                        <q-img :src="require('@/assets/logo_ygo.png')" style="width: 150px" />
                    </div>
                    <div class="text-h5 text-bold text-accent text-center">¡Y-GASTE!</div>
                    <div class="text-h6 text-center q-mb-lg">
                        Termina de llenar los siguientes campos y estarás listo para empezar a pedir
                        con nosotros.
                    </div>
                    <q-form @submit="checkSteppers()">
                        <q-stepper
                            v-model="step"
                            ref="stepper"
                            color="primary"
                            animated
                            style="border-top: solid 5px #ff5722"
                            class="q-mb-xl"
                        >
                            <q-step :name="1" title="Informacion personal" :done="step > 1">
                                <div class="text-h4 text-center text-primary">
                                    <span class="text-bold text-secondary">1.</span> Informacion
                                    personal
                                </div>
                                <q-separator
                                    color="accent"
                                    style="
                                        width: 50%;
                                        margin: 0 auto;
                                        height: 2px;
                                        margin-bottom: 20px;
                                    "
                                />
                                <div class="row">
                                    <div class="col q-pa-sm">
                                        <q-input
                                            filled
                                            label="Nombre *"
                                            v-model="registrationData.name"
                                            :rules="[
                                                val => val.length > 0 || 'El campo es obligatorio',
                                            ]"
                                        />
                                    </div>
                                    <div class="col q-pa-sm">
                                        <q-input
                                            filled
                                            label="Apellido *"
                                            class="on-right"
                                            v-model="registrationData.lastName"
                                            :rules="[
                                                val => val.length > 0 || 'El campo es obligatorio',
                                            ]"
                                        />
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-lg-2 q-pa-sm">
                                        <q-select
                                            filled
                                            label="Pais"
                                            :options="countryCodes"
                                            v-model="registrationData.countryCode"
                                            emit-value
                                        />
                                    </div>
                                    <div class="col-lg-10 q-pa-sm">
                                        <q-input
                                            filled
                                            label="Celular *"
                                            v-model="registrationData.phone"
                                            fill-mask
                                            :rules="[
                                                val => val.length > 0 || 'El campo es obligatorio',
                                            ]"
                                        />
                                    </div>
                                </div>
                            </q-step>

                            <q-step
                                :name="2"
                                title="Estoce tu plan"
                                icon="fas fa-dollar-sign"
                                :done="step > 2"
                            >
                                <div class="text-h4 text-center text-primary">
                                    <span class="text-bold text-secondary">2.</span> Escoge tu plan
                                </div>
                                <q-separator
                                    color="accent"
                                    style="
                                        width: 50%;
                                        margin: 0 auto;
                                        height: 2px;
                                        margin-bottom: 20px;
                                    "
                                />
                                <div class="row">
                                    <div class="col q-pa-sm">
                                        <q-select
                                            filled
                                            label="Sucursal de preferencia *"
                                            :options="[
                                                'Sucursal de Panamá',
                                                'Sucursal de Penonomé',
                                            ]"
                                            :rules="[
                                                val => val.length > 0 || 'El campo es obligatorio',
                                            ]"
                                            v-model="selectedSubsidiary"
                                        />
                                    </div>
                                </div>
                                <div class="row q-mb-md">
                                    <div class="col-lg-4 col-xs-12 q-pa-sm">
                                        <div
                                            :class="returnRateClass('Plan Basico')"
                                            @click="
                                                selectedSubsidiary !== ''
                                                    ? (registrationData.rate = ratesAcordingToSelectedSubsidiary.find(
                                                          rate => rate.name === 'Plan Basico'
                                                      ).id)
                                                    : ''
                                            "
                                        >
                                            <i class="fas fa-box-open fa-2x q-mb-sm"></i>
                                            <div class="text-h6 q-mb-sm text-bold">Plan Basico</div>
                                            <q-separator
                                                class="q-mb-sm"
                                                :dark="registrationData.rate == 'plan_basico_id'"
                                            />
                                            <div class="text-subtitle2">Texto punto 1</div>
                                            <div class="text-subtitle2 q-mt-sm">Texto punto 2</div>
                                            <div class="text-subtitle2 q-mt-sm">Texto punto 3</div>
                                            <div
                                                v-if="selectedSubsidiary !== ''"
                                                class="text-h5 text-bold q-mt-md"
                                            >
                                                $
                                                {{
                                                    ratesAcordingToSelectedSubsidiary
                                                        .find(rate => rate.name === 'Plan Basico')
                                                        .rate.toFixed(2)
                                                }}
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-lg-4 col-xs-12 q-pa-sm">
                                        <div
                                            :class="returnRateClass('Plan Cero Volumen')"
                                            @click="
                                                selectedSubsidiary !== ''
                                                    ? (registrationData.rate = ratesAcordingToSelectedSubsidiary.find(
                                                          rate => rate.name === 'Plan Cero Volumen'
                                                      ).id)
                                                    : ''
                                            "
                                        >
                                            <i class="fas fa-weight-hanging fa-2x q-mb-sm"></i>
                                            <div class="text-h6 q-mb-sm text-bold">
                                                Plan Cero Volumen
                                            </div>
                                            <q-separator
                                                class="q-mb-sm"
                                                :dark="registrationData.rate == 'plan_cerovol_id'"
                                            />
                                            <div class="text-subtitle2">Texto punto 1</div>
                                            <div class="text-subtitle2 q-mt-sm">Texto punto 2</div>
                                            <div class="text-subtitle2 q-mt-sm">Texto punto 3</div>
                                            <div
                                                v-if="selectedSubsidiary !== ''"
                                                class="text-h5 text-bold q-mt-md"
                                            >
                                                $
                                                {{
                                                    ratesAcordingToSelectedSubsidiary
                                                        .find(
                                                            rate =>
                                                                rate.name === 'Plan Cero Volumen'
                                                        )
                                                        .rate.toFixed(2)
                                                }}
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-lg-4 col-xs-12 q-pa-sm">
                                        <div class="bg-grey-3 q-pa-md rounded-borders text-center">
                                            <i class="fas fa-building fa-2x q-mb-sm"></i>
                                            <div class="text-h6 q-mb-sm text-primary text-bold">
                                                Plan Business
                                            </div>
                                            <q-separator class="q-mb-sm" />
                                            <div class="text-subtitle2">Texto punto 1</div>
                                            <div class="text-subtitle2 q-mt-sm">Texto punto 2</div>
                                            <div class="text-subtitle2 q-mt-sm">Texto punto 3</div>
                                            <q-btn
                                                v-if="selectedSubsidiary !== ''"
                                                class="q-mt-md"
                                                label="Contactar"
                                                size="sm"
                                                color="accent"
                                                push
                                            />
                                        </div>
                                    </div>
                                    <div
                                        v-if="showRateWarning"
                                        class="row q-px-md text-red text-bold text-h6"
                                    >
                                        **Debes escojer una tarifa
                                    </div>
                                </div>
                            </q-step>

                            <q-step
                                :name="3"
                                title="Direccion de entrega"
                                icon="fas fa-map-marker-alt"
                                :done="step > 3"
                            >
                                <div class="text-h4 text-center text-primary">
                                    <span class="text-bold text-secondary">3.</span> Direccion de
                                    entrega
                                </div>
                                <q-separator
                                    color="accent"
                                    style="
                                        width: 50%;
                                        margin: 0 auto;
                                        height: 2px;
                                        margin-bottom: 20px;
                                    "
                                />
                                <div class="row">
                                    <div class="col q-pa-sm">
                                        <q-input
                                            filled
                                            label="Direccion de entrega *"
                                            v-model="registrationData.address"
                                            :rules="[
                                                val => val.length > 0 || 'El campo es obligatorio',
                                            ]"
                                        />
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col q-pa-sm">
                                        <q-input
                                            filled
                                            label="Notas adicionales de dirección"
                                            v-model="registrationData.addressExtra"
                                        />
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col q-pa-sm">
                                        <GoogleMaps
                                            @markerPosition="setMarkerPosition"
                                            @newMarkerPosition="setNewMarkerPosition"
                                            :editable="true"
                                            :markers="markers"
                                            :mapCenter="center"
                                        ></GoogleMaps>
                                    </div>
                                </div>
                                <div
                                    v-if="showMapPinWarning"
                                    class="row q-px-md text-red text-bold text-h6"
                                >
                                    **Por favor asegurate de mover el pin a tu direcion correcta
                                </div>
                            </q-step>

                            <q-step :name="4" title="Completado" icon="fas fa-check-double">
                                <div v-if="!successResponse">
                                    <div class="full-width text-center q-mb-md">
                                        <q-spinner-puff color="primary" size="5em" />
                                    </div>

                                    <div class="text-h5 text-center text-bold text-accent q-mb-md">
                                        Estamos guardando tu información<br />En unos momentos tu
                                        casillero estara listo.
                                    </div>
                                    <q-linear-progress
                                        dark
                                        stripe
                                        rounded
                                        size="20px"
                                        :value="progress"
                                        color="primary"
                                    />
                                </div>
                                <div v-else>
                                    <div class="full-width text-center q-mb-md">
                                        <i class="fas fa-check fa-4x text-secondary" />
                                    </div>
                                    <div class="text-h5 text-center text-bold text-accent q-mb-md">
                                        ¡GUARDADO CON EXITO!<br />
                                        Ya puedes acceder a tu casillero.
                                    </div>

                                    <div class="full-width text-center">
                                        <!-- ESTE BOTON DEBE CERRAR EL DIALOG -->
                                        <q-btn
                                            push
                                            label="Ver mi casillero"
                                            class="text-bold"
                                            color="accent"
                                            @click="$emit('close-registration-dialog')"
                                        />
                                    </div>
                                </div>
                            </q-step>

                            <template v-slot:navigation v-if="step <= 3">
                                <q-stepper-navigation>
                                    <q-btn
                                        color="accent"
                                        push
                                        class="text-bold"
                                        :label="step === 3 ? 'Finalizar' : 'Siguiente'"
                                        type="submit"
                                    />
                                    <q-btn
                                        v-if="step > 1"
                                        flat
                                        color="primary"
                                        @click="$refs.stepper.previous()"
                                        label="Atras"
                                        class="q-ml-sm"
                                    />
                                </q-stepper-navigation>
                            </template>
                        </q-stepper>
                    </q-form>
                </div>
                <div class="col desktop-only"></div>
            </div>
        </div>
    </q-card>
</template>

<script>
import {
    Loading,

    // optional!, for example below
    // with custom spinner
    QSpinnerGears,
} from 'quasar'
import GoogleMaps from '../../components/general/GoogleMaps'
import * as api from '@/api/api'
export default {
    props: {
        userData: {
            type: Object,
            default: () => {},
        },
    },
    data() {
        return {
            registrationData: {
                name: '',
                lastName: '',
                countryCode: '+507',
                phone: '',
                rate: '',
                address: '',
                addressExtra: '',
                subsidiary: '',
            },
            selectedSubsidiary: '',
            selectedRate: '',
            ratesAcordingToSelectedSubsidiary: [],
            location: [],
            markers: [],
            center: {},
            countryCodes: require('@/assets/country_codes.json'),
            step: 1,
            progress: 0,
            allRates: [],
            showRateWarning: false,
            showMapPinWarning: false,
            successResponse: false,
        }
    },
    watch: {
        userData: {
            immediate: true,
            handler(newValue, oldValue) {
                this.registrationData.name = newValue.name
                this.registrationData.lastName = newValue.lastName
            },
        },
        selectedSubsidiary(newValue, oldValue) {
            if (newValue === 'Sucursal de Panamá') {
                this.ratesAcordingToSelectedSubsidiary = this.allRates.filter(
                    rate => rate.subsidiary === 0
                )
                this.registrationData.subsidiary = 0
                return
            }
            this.ratesAcordingToSelectedSubsidiary = this.allRates.filter(
                rate => rate.subsidiary === 1
            )
            this.registrationData.subsidiary = 1
            return
        },
    },
    computed: {
        uid() {
            return this.$store.getters.uid
        },
    },
    methods: {
        returnRateClass(rateName) {
            if (!this.ratesAcordingToSelectedSubsidiary.length <= 0) {
                let selectedRate = this.ratesAcordingToSelectedSubsidiary.find(
                    rate => rate.id === this.registrationData.rate
                )
                if (selectedRate !== undefined && selectedRate.name === rateName) {
                    return 'rateTileSelected q-pa-md rounded-borders text-center'
                }
            }
            return 'rateTile q-pa-md rounded-borders text-center'
        },
        splitNParts: function* (num, parts) {
            let sumParts = 0
            for (let i = 0; i < parts - 1; i++) {
                const pn = Math.ceil(Math.random() * (num - sumParts))
                yield pn
                sumParts += pn
            }
            yield num - sumParts
        },
        checkSteppers() {
            if (this.step == 3) {
                let customProgress = [...this.splitNParts(90, 10)]
                for (let i = 0; i < 10; i++) {
                    let time = Math.random() * 3500
                    setTimeout(() => {
                        this.progress = this.progress + customProgress[i] / 100
                    }, time)
                }
                setTimeout(() => {
                    this.registrationData.isUpdated = true
                    this.registrationData.coordinates = this.location
                    api.UpdateUserInformationById({
                        uid: this.uid,
                        user: this.registrationData,
                    })
                        .then(async response => {
                            setTimeout(() => {
                                this.progress = 1
                                this.successResponse = true
                            }, 500)
                            api.getUserInformationById({
                                uid: this.uid,
                            }).then(response => {
                                this.$store.commit('SET_USER', response.data.data)
                            })
                        })
                        .catch(error => {
                            console.log(error)
                        })
                }, 3000)
            }
            switch (this.$refs.stepper.panelIndex) {
                case 0:
                    this.$refs.stepper.next()
                    break
                case 1:
                    if (this.registrationData.rate === '') {
                        this.showRateWarning = true
                        return
                    }
                    this.showRateWarning = false
                    this.$refs.stepper.next()
                    break
                case 2:
                    if (this.location.length <= 0) {
                        this.showMapPinWarning = true
                        return
                    }
                    this.$refs.stepper.next()
                    break
            }
        },
        geolocate() {
            navigator.geolocation.getCurrentPosition(
                position => {
                    this.center = {
                        lat: parseFloat(position.coords.latitude),
                        lng: parseFloat(position.coords.longitude),
                    }
                    this.markers.push({position: this.center})
                },
                error => {
                    this.center = {
                        lat: parseFloat(9.068463),
                        lng: parseFloat(-79.452694),
                    }
                    this.markers.push({position: this.center})
                }
            )
        },
        setMarkerPosition(event) {
            this.location = event
        },
        setNewMarkerPosition(event) {
            this.markers = [{position: event}]
            this.location = event
        },
    },
    components: {
        GoogleMaps,
    },
    async mounted() {
        this.geolocate()
        api.ReturnAllRates().then(response => (this.allRates = response.data.data))
    },
}
</script>
