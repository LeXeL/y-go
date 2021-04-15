<template>
    <q-card>
        <div class="pattern-bg">
            <div class="row">
                <div class="col desktop-only"></div>
                <div class="col-lg-6 y-go-font">
                    <div class="text-center q-py-lg q-mb-md">
                        <q-img :src="require('@/assets/logo_ygo.png')" style="width: 150px" />
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
                                            class="y-go-1x"
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
                                            class="on-right y-go-1x"
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
                                            class="y-go-1x"
                                            label="Pais"
                                            :options="countryCodes"
                                            v-model="registrationData.countryCode"
                                            emit-value
                                        />
                                    </div>
                                    <div class="col-lg-10 q-pa-sm">
                                        <q-input
                                            filled
                                            class="y-go-1x"
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
                                            class="y-go-1x"
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
                                            <div class="text-h6 q-mb-sm text-bold">
                                                PLAN STANDARD
                                            </div>
                                            <q-separator class="q-mb-sm" dark />
                                            <div class="text-subtitle2 text-bold q-mb-sm">
                                                PO Box personal en Miami
                                            </div>
                                            <div class="text-subtitle2 text-bold q-mb-sm">
                                                Carga aérea y carga maritima
                                            </div>
                                            <div class="text-subtitle2 text-bold q-mb-sm">
                                                Vuelos diarios Miami - Panam&aacute;
                                            </div>
                                            <div class="text-subtitle2 text-bold q-mb-sm">
                                                <a
                                                    class="text-primary"
                                                    href="/terminos-y-condiciones#reclamos-y-seguros"
                                                    target="_blank"
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
                                                Servicio de compras por internet
                                            </div>
                                            <div class="text-subtitle2 text-bold q-mb-sm">
                                                Notificaci&oacute;n via web
                                            </div>
                                            <div class="text-subtitle2 text-bold q-mb-sm">
                                                Acceso a tu perfil personal
                                            </div>
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
                                            <div
                                                class="text-caption"
                                                v-if="selectedSubsidiary !== ''"
                                            >
                                                * La libra a considerar es la mayor entre el peso
                                                real y el peso volumetrico del paquete.
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
                                            <i class="fas fa-ruler-combined fa-2x q-mb-sm"></i>
                                            <div class="text-h6 q-mb-sm text-bold">
                                                PLAN PREMIUM
                                            </div>
                                            <q-separator class="q-mb-sm" dark />
                                            <div class="text-subtitle2 text-bold q-mb-sm">
                                                PO Box personal en Miami
                                            </div>
                                            <div class="text-subtitle2 text-bold q-mb-sm">
                                                Carga aérea y carga maritima
                                            </div>
                                            <div class="text-subtitle2 text-bold q-mb-sm">
                                                Vuelos diarios Miami - Panam&aacute;
                                            </div>
                                            <div class="text-subtitle2 text-bold q-mb-sm">
                                                <a
                                                    class="text-primary"
                                                    href="/terminos-y-condiciones#reclamos-y-seguros"
                                                    target="_blank"
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
                                                Servicio de compras por internet
                                            </div>
                                            <div class="text-subtitle2 text-bold q-mb-sm">
                                                Notificaci&oacute;n via web
                                            </div>
                                            <div class="text-subtitle2 text-bold q-mb-sm">
                                                Acceso a tu perfil personal
                                            </div>
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
                                            <div
                                                class="text-caption"
                                                v-if="selectedSubsidiary !== ''"
                                            >
                                                * La libra a considerar es unicamente el peso real
                                                del paquete.
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-lg-4 col-xs-12 q-pa-sm">
                                        <div
                                            :class="returnRateClass('Plan Business')"
                                            @click="
                                                selectedSubsidiary !== ''
                                                    ? (registrationData.rate = ratesAcordingToSelectedSubsidiary.find(
                                                          rate => rate.name === 'Plan Business'
                                                      ).id)
                                                    : ''
                                            "
                                        >
                                            <i class="fas fa-building fa-2x q-mb-sm"></i>
                                            <div class="text-h6 q-mb-sm text-bold">
                                                PLAN BUSINESS
                                            </div>
                                            <q-separator class="q-mb-sm" dark />
                                            <div class="text-subtitle2 text-bold text-primary">
                                                ESPECIAL PARA NEGOCIOS
                                            </div>
                                            <div class="text-h4" style="padding: 75px 0">
                                                Contactanos para mas informaci&oacute;n
                                            </div>
                                            <q-btn
                                                label="Mas info"
                                                v-if="selectedSubsidiary !== ''"
                                                color="primary"
                                                class="text-bold q-px-md"
                                                push
                                                @click="businessRateDialog = true"
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
                                        <GoogleMaps
                                            @markerPosition="setMarkerPosition"
                                            @newMarkerPosition="setNewMarkerPosition"
                                            :editable="true"
                                            :markers="markers"
                                            :mapCenter="center"
                                        ></GoogleMaps>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col q-pa-sm">
                                        <q-input
                                            filled
                                            class="y-go-1x"
                                            label="Direccion de entrega"
                                            v-model="registrationData.address"
                                            readonly
                                        />
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col q-pa-sm">
                                        <q-input
                                            filled
                                            class="y-go-1x"
                                            label="Notas adicionales de dirección"
                                            v-model="registrationData.addressExtra"
                                        />
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
                                        v-if="!locationVerified && step === 3"
                                        color="accent"
                                        push
                                        class="text-bold"
                                        label="Validar Dirrecion"
                                        @click="validateLocation()"
                                    />
                                    <q-btn
                                        v-else
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
        <q-dialog v-model="businessRateDialog" persistent>
            <q-card>
                <!-- <q-card-section class="text-center">
                    <i class="fas fa-building fa-3x q-mb-sm" />
                </q-card-section> -->
                <q-card-section>
                    <div class="text-h6 text-center">
                        Al seleccionar este plan se enviara una solicitud para ser revisada por uno
                        de nuestros administradores.
                    </div>
                </q-card-section>
                <q-card-actions>
                    <q-space />
                    <!-- <q-btn
                        flat
                        color="red-7"
                        label="cancelar"
                        @click="businessRateDialog = false"
                    /> -->
                    <q-btn
                        flat
                        color="primary"
                        label="Aceptar"
                        @click="businessRateDialog = false"
                    />
                </q-card-actions>
            </q-card>
        </q-dialog>
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
            businessRateDialog: false,
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
            locationVerified: false,
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
        splitNParts: function*(num, parts) {
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
            this.locationVerified = false
            this.location = event
        },
        setNewMarkerPosition(event) {
            this.locationVerified = false
            this.markers = [{position: event}]
            this.location = event
        },
        validateLocation() {
            if (this.location.length <= 0) {
                this.showMapPinWarning = true
                return
            }
            fetch(
                `https://maps.googleapis.com/maps/api/geocode/json?latlng=${this.location.lat},${this.location.lng}&key=AIzaSyCDzDbwg-PqYOIAMgNE7A70gauYHeOel5A`
            )
                .then(response => response.json())
                .then(data => {
                    if (data.status !== 'REQUEST_DENIED') {
                        this.registrationData.address = data.results[0].formatted_address
                        this.locationVerified = true
                    }
                })
                .catch(error => console.log(error))
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
