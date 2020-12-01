<template>
    <q-card>
        <q-card-section class="text-center">
            <i class="far fa-laugh-wink fa-5x text-primary"></i>
        </q-card-section>
        <q-card-section class="text-center">
            <div class="text-h5 text-bold text-accent">¡Bienvenido!</div>
        </q-card-section>
        <q-card-section>
            <div class="row">
                <div class="col desktop-only"></div>
                <div class="col-lg-5">
                    <div class="text-subtitle1 text-center q-mb-lg">
                        Para continuar a tu casillero, porfavor termina de llenar la informacion
                        personal de tu cuenta.
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
                                <div class="text-h6 q-mb-sm text-bold">Plan Basico</div>
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
                                <div class="text-h6 q-mb-sm text-bold">Plan Cero Volumen</div>
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
                            <GoogleMaps
                                class="q-mb-md"
                                @markerPosition="setMarkerPosition"
                                :editable="true"
                                :markers="markers"
                                :mapCenter="center"
                            ></GoogleMaps>
                        </div>
                    </div>
                    <div class="row">
                        <q-space />
                        <q-btn color="accent" label="Continuar" push @click="submitForm()" />
                    </div>
                </div>
                <div class="col desktop-only"></div>
            </div>
        </q-card-section>
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
                phone: '',
                selectedRateId: '',
                address: '',
            },
            location: [],
            markers: [],
            center: {},
        }
    },
    watch: {
        userData(newValue, oldValue) {
            this.registrationData.name = newValue.name
            this.registrationData.lastName = newValue.lastName
        },
    },
    computed: {
        uid() {
            return this.$store.getters.uid
        },
    },
    methods: {
        showLoading() {
            this.$q.loading.show()

            // hiding in 2s
            this.timer = setTimeout(() => {
                this.$q.loading.hide()
                this.timer = void 0
            }, 2000)
        },
        submitForm() {
            if (
                this.registrationData.name === '' ||
                this.registrationData.lastName === '' ||
                this.registrationData.phone === '' ||
                this.registrationData.address === ''
            ) {
                alert('Por Favor revisa todos los campos no pueden estar vacios')
                return
            }
            Loading.show()
            if (this.location.length === 0) this.location = this.center
            this.registrationData.coordinates = this.location
            this.registrationData.isUpdated = true
            api.UpdateUserInformationById({
                uid: this.uid,
                user: this.registrationData,
            })
                .then(async response => {
                    Loading.hide()
                    alert('EXITO')
                    api.getUserInformationById({
                        uid: this.uid,
                    }).then(response => {
                        this.$store.commit('SET_USER', response.data.data)
                        this.$emit('close-registration-dialog')
                    })
                })
                .catch(error => {
                    Loading.hide()
                    console.log(error)
                    alert('Error')
                })

            //
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
    },
    components: {
        GoogleMaps,
    },
    async mounted() {
        this.geolocate()
    },
}
</script>
