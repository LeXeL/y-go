<template>
    <div v-if="!loading">
        <ygo-alert
            :display="displayAlert"
            :title="alertTitle"
            :message="alertMessage"
            :type="alertType"
            @accept="displayAlert = false"
        ></ygo-alert>
        <q-tabs
            v-model="tab"
            inline-label
            :breakpoint="0"
            align="justify"
            class="bg-white text-accent shadow-2"
        >
            <q-tab name="info" label="Informacion" />
            <q-tab name="plan" label="Plan" />
            <q-tab name="address" label="Direccion" />
        </q-tabs>

        <q-tab-panels v-model="tab" animated>
            <q-tab-panel name="info">
                <div class="row q-mb-md">
                    <div class="col q-pa-sm">
                        <q-input
                            filled
                            label="Nombre"
                            class="on-left"
                            v-model="userInformationData.user.name"
                            :disable="!editInformation"
                            ref="name"
                        />
                    </div>
                    <div class="col q-pa-sm">
                        <q-input
                            filled
                            label="Apellido"
                            class="on-right"
                            v-model="userInformationData.user.lastName"
                            :disable="!editInformation"
                        />
                    </div>
                </div>
                <div class="row q-mb-md">
                    <div class="col q-pa-sm">
                        <q-input
                            filled
                            readonly
                            label="Correo electronico"
                            v-model="userInformationData.user.email"
                        />
                    </div>
                </div>
                <div class="row">
                    <div class="col-lg-2 col-md-2 col-sm-2 col-xs-4 q-pa-sm">
                        <q-select
                            filled
                            label="Pais"
                            :options="countryCodes"
                            emit-value
                            v-model="userInformationData.user.countryCode"
                            :disable="!editInformation"
                        />
                    </div>
                    <div class="col-lg-10 col-md-10 col-sm-10 col-xs-8 q-pa-sm">
                        <q-input
                            filled
                            label="Celular *"
                            v-model="userInformationData.user.phone"
                            :disable="!editInformation"
                            :rules="[val => val.length > 0 || 'El campo es obligatorio']"
                        />
                    </div>
                </div>
                <div class="row">
                    <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12 q-pa-sm">
                        <q-input
                            filled
                            label="Fecha de Nacimiento"
                            v-model="userInformationData.user.birthdate"
                            mask="date"
                            :rules="['date']"
                            :disable="!editInformation"
                        >
                            <template v-slot:append>
                                <q-icon name="fas fa-calendar" class="cursor-pointer">
                                    <q-popup-proxy
                                        ref="qDateProxy"
                                        transition-show="scale"
                                        transition-hide="scale"
                                    >
                                        <q-date v-model="userInformationData.user.birthdate">
                                            <div class="row items-center justify-end">
                                                <q-btn
                                                    v-close-popup
                                                    label="Close"
                                                    color="primary"
                                                    flat
                                                />
                                            </div>
                                        </q-date>
                                    </q-popup-proxy>
                                </q-icon>
                            </template>
                        </q-input>
                    </div>
                </div>
                <div class="row">
                    <q-btn
                        push
                        size="sm"
                        color="accent"
                        label="Guardar"
                        @click="$emit('saveUserProfile')"
                    />
                </div>
            </q-tab-panel>

            <q-tab-panel name="plan">
                <div class="row q-mb-md">
                    <div class="col-lg-4 col-xs-12 q-pa-sm">
                        <div class="rateTileSelected q-pa-md rounded-borders text-center">
                            <i :class="returnIconAcordingToRate()"></i>
                            <div class="text-h6 q-mb-sm text-bold">
                                {{ returnRateName() }}
                                <!-- PLAN STANDARD -->
                            </div>
                            <q-separator class="q-mb-sm" dark />
                            <div class="text-h5 text-bold q-mt-md q-mb-md" v-if="showPrice()">
                                *$
                                {{ returnRatePrice() }}
                                <!-- 3.50 -->
                            </div>
                            <div class="text-body2" v-if="returnRateName() === 'Plan Cero Volumen'">
                                * La libra a considerar es unicamente el peso real del paquete.
                                <br />
                            </div>
                            <div class="text-body2" v-else>
                                * La libra a considerar es la mayor entre el peso real y el peso
                                volumetrico del paquete. <br />
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-6 q-pa-sm">
                        <q-input
                            readonly
                            filled
                            color="primary"
                            label="Sucursal"
                            :value="
                                userInformationData.user.subsidiary === 0
                                    ? 'Cuidad de Panamá'
                                    : 'Cuidad de Penonomé'
                            "
                            class="q-mb-md"
                        />
                        <div class="text-body full-width">
                            Para solicitar cambio de tarifa o sucursal, escribenos a
                            <a href="mailto:contacto@y-go.com.pa" class="text-primary text-bold">
                                contacto@y-go.com.pa</a
                            >.
                        </div>
                        <br />
                        <div class="text-body full-width">
                            Lee mas sobre nuestras tarifas
                            <a href="#" class="text-primary text-bold">aqui</a>.
                        </div>
                    </div>
                </div>
            </q-tab-panel>

            <q-tab-panel name="address">
                <q-list bordered class="rounded-borders q-mb-md">
                    <q-expansion-item
                        expand-separator
                        label="Direccion 1"
                        class="text-bold text-white"
                        default-opened
                        group="addressGroup"
                        header-class="bg-primary text-white"
                        expand-icon-class="text-white"
                    >
                        <q-card>
                            <q-card-section>
                                <div class="row q-mb-md">
                                    <div class="col">
                                        <GoogleMaps
                                            class="q-mb-md"
                                            v-if="Object.keys(center).length > 0"
                                            @markerPosition="setMarkerPosition"
                                            @newMarkerPosition="setNewMarkerPosition"
                                            :editable="editInformation"
                                            :markers="markers"
                                            :mapCenter="center"
                                        ></GoogleMaps>
                                    </div>
                                </div>
                                <div class="row q-mb-md">
                                    <div class="col">
                                        <q-select
                                            v-if="userInformationData.user.subsidiary === 0"
                                            filled
                                            class="y-go-1x q-mb-md"
                                            label="Distrito"
                                            :options="locations"
                                            map-options
                                            emit-value
                                            v-model="userInformationData.user.district"
                                        />
                                        <q-input
                                            filled
                                            label="Direccion de entrega"
                                            class="q-mb-md"
                                            v-model="userInformationData.user.address"
                                            readonly
                                        />
                                        <q-input
                                            filled
                                            label="Notas adicionales de direccion"
                                            v-model="userInformationData.user.addressExtra"
                                            :disable="!editInformation"
                                        />
                                    </div>
                                </div>
                                <div class="row">
                                    <q-btn
                                        push
                                        size="sm"
                                        color="accent"
                                        label="Guardar"
                                        @click="sendAddressUpdate()"
                                    />
                                </div>
                            </q-card-section>
                        </q-card>
                    </q-expansion-item>

                    <q-expansion-item
                        expand-separator
                        label="Direccion 2"
                        class="text-bold"
                        group="addressGroup"
                        header-class="bg-primary text-white"
                        expand-icon-class="text-white"
                    >
                        <q-card>
                            <q-card-section>
                                <div class="row q-mb-md">
                                    <div class="col">
                                        <GoogleMaps
                                            class="q-mb-md"
                                            v-if="Object.keys(center2).length > 0"
                                            @markerPosition="setMarkerPosition2"
                                            @newMarkerPosition="setNewMarkerPosition2"
                                            :editable="editInformation"
                                            :markers="markers2"
                                            :mapCenter="center2"
                                        ></GoogleMaps>
                                    </div>
                                </div>
                                <div class="row q-mb-md">
                                    <div class="col">
                                        <q-select
                                            v-if="userInformationData.user.subsidiary === 0"
                                            filled
                                            class="y-go-1x q-mb-md"
                                            label="Distrito"
                                            :options="locations"
                                            map-options
                                            emit-value
                                            v-model="userInformationData.user.district2"
                                        />
                                        <q-input
                                            filled
                                            label="Direccion de entrega"
                                            class="q-mb-md"
                                            v-model="userInformationData.user.address2"
                                            readonly
                                        />
                                        <q-input
                                            filled
                                            label="Notas adicionales de direccion"
                                            v-model="userInformationData.user.addressExtra2"
                                            :disable="!editInformation"
                                        />
                                    </div>
                                </div>
                                <div class="row">
                                    <q-btn
                                        push
                                        size="sm"
                                        color="accent"
                                        label="Guardar"
                                        @click="sendAddress2Update()"
                                    />
                                </div>
                            </q-card-section>
                        </q-card>
                    </q-expansion-item>
                </q-list>
            </q-tab-panel>
        </q-tab-panels>
    </div>
</template>
<script>
import GoogleMaps from '../../components/general/GoogleMaps'
import * as api from '@/api/api'

export default {
    props: {
        userInformationData: {
            type: Object,
            default: () => {},
        },
    },
    data() {
        return {
            location: [],
            markers: [],
            center: {},
            location2: [],
            markers2: [],
            center2: {},
            editInformation: true,
            displayAlert: false,
            alertTitle: '',
            alertMessage: '',
            alertType: '',
            tab: 'info',
            countryCodes: require('@/assets/country_codes.json'),
            allRates: [],
            loading: false,
            locations: [
                {
                    label: '24 DE DICIEMBRE ',
                    value: '24 De Diciembre',
                },
                {
                    label: 'ALCALDE DÍAZ',
                    value: 'Alcalde Diaz',
                },
                {
                    label: 'ANCÓN',
                    value: 'Ancon',
                },
                {
                    label: 'BETANIA',
                    value: 'Betania',
                },
                {
                    label: 'BELLA VISTA',
                    value: 'Bella Vista',
                },
                {
                    label: 'CALIDONIA',
                    value: 'Calidonia',
                },
                {
                    label: 'CAIMITILLO',
                    value: 'Caimitillo',
                },
                {
                    label: 'CHILIBRE',
                    value: 'Chilibre',
                },
                {
                    label: 'CURUNDU',
                    value: 'Curundu',
                },
                {
                    label: 'DON BOSCO',
                    value: 'Don Bosco',
                },
                {
                    label: 'EL CHORRILLO',
                    value: 'El Chorrillo',
                },
                {
                    label: 'ERNESTO CORDOBA CAMPOS',
                    value: 'Ernesto Cordoba Campos',
                },
                {
                    label: 'JUAN DIAZ',
                    value: 'Juan Diaz',
                },
                {
                    label: 'LAS CUMBRES',
                    value: 'Las Cumbres',
                },
                {
                    label: 'LAS GARZAS',
                    value: 'Las Garzas',
                },
                {
                    label: 'LAS MAÑANITAS',
                    value: 'Las Mañanitas',
                },
                {
                    label: 'PACORA',
                    value: 'Pacora',
                },
                {
                    label: 'PARQUE LEFEVRE',
                    value: 'Parque Lefevre',
                },
                {
                    label: 'PEDREGAL',
                    value: 'Pedregal',
                },
                {
                    label: 'PUEBLO NUEVO',
                    value: 'Pueblo Nuevo',
                },
                {
                    label: 'RIO ABAJO',
                    value: 'Rio Abajo',
                },
                {
                    label: 'SAN FELIPE',
                    value: 'San Felipe',
                },
                {
                    label: 'SAN FRANCISCO',
                    value: 'San Francisco',
                },
                {
                    label: 'SAN MARTIN',
                    value: 'San Martin',
                },
                {
                    label: 'SAN MIGUELITO',
                    value: 'San Miguelito',
                },
                {
                    label: 'SANTA ANA',
                    value: 'Santa Ana',
                },
                {
                    label: 'TOCUMEN',
                    value: 'Tocumen',
                },
            ],
        }
    },
    methods: {
        showPrice() {
            let rate = this.allRates.find(rate => rate.id === this.userInformationData.user.rate)
            if (!!rate && rate.name === 'Plan Business') {
                if (!this.userInformationData.user.businessAproved) return false
            }
            return true
        },
        returnRateName() {
            let rate = this.allRates.find(rate => rate.id === this.userInformationData.user.rate)
            return !!rate ? rate.name : 'NaN'
        },
        returnRatePrice() {
            let rate = this.allRates.find(rate => rate.id === this.userInformationData.user.rate)
            return !!rate ? rate.rate.toFixed(2) : 'NaN'
        },
        returnIconAcordingToRate() {
            let classes = 'fa-2x q-mb-sm'
            let rateName = this.allRates.find(
                rate => rate.id === this.userInformationData.user.rate
            )
            if (rateName != undefined && rateName.name === 'Plan Basico')
                classes += ' fas fa-box-open'
            if (rateName != undefined && rateName.name === 'Plan Cero Volumen')
                classes += ' fas fa-weight-hanging'
            if (rateName != undefined && rateName.name === 'Plan Business')
                classes += ' fas fa-building'
            return classes
        },
        async sendAddressUpdate() {
            if (Object.keys(this.location).length > 0) {
                this.userInformationData.user.coordinates = this.location
                await fetch(
                    `https://maps.googleapis.com/maps/api/geocode/json?latlng=${this.location.lat},${this.location.lng}&key=AIzaSyCDzDbwg-PqYOIAMgNE7A70gauYHeOel5A`
                )
                    .then(response => response.json())
                    .then(data => {
                        if (data.status !== 'REQUEST_DENIED') {
                            this.userInformationData.user.address =
                                data.results[0].formatted_address
                        }
                    })
                    .catch(error => console.log(error))
            }
            this.$emit('saveUserProfile')
        },
        async sendAddress2Update() {
            if (Object.keys(this.location2).length > 0) {
                this.userInformationData.user.coordinates2 = this.location2
                await fetch(
                    `https://maps.googleapis.com/maps/api/geocode/json?latlng=${this.location2.lat},${this.location2.lng}&key=AIzaSyCDzDbwg-PqYOIAMgNE7A70gauYHeOel5A`
                )
                    .then(response => response.json())
                    .then(data => {
                        if (data.status !== 'REQUEST_DENIED') {
                            this.userInformationData.user.address2 =
                                data.results[0].formatted_address
                        }
                    })
                    .catch(error => console.log(error))
            }
            this.$emit('saveUserProfile')
        },
        setNewMarkerPosition(event) {
            this.markers = [{position: event}]
            this.location = event
        },
        setMarkerPosition(event) {
            this.location = event
        },
        setNewMarkerPosition2(event) {
            this.markers2 = [{position: event}]
            this.location2 = event
        },
        setMarkerPosition2(event) {
            this.location2 = event
        },
        geolocate() {
            navigator.geolocation.getCurrentPosition(
                position => {
                    this.center2 = {
                        lat: parseFloat(position.coords.latitude),
                        lng: parseFloat(position.coords.longitude),
                    }
                    this.markers2.push({position: this.center2})
                },
                error => {
                    this.center2 = {
                        lat: parseFloat(9.068463),
                        lng: parseFloat(-79.452694),
                    }
                    this.markers2.push({position: this.center2})
                }
            )
        },
    },
    components: {
        GoogleMaps,
    },
    mounted() {
        this.loading = true
        this.center = this.userInformationData.user.coordinates
        this.markers.push({position: this.center})
        if (this.userInformationData.user.coordinates2 === undefined) {
            this.geolocate()
        } else {
            this.center2 = this.userInformationData.user.coordinates2
            this.markers2.push({position: this.center2})
        }
        api.ReturnAllRates()
            .then(response => (this.allRates = response.data.data))
            .then(() => (this.loading = false))
    },
}
</script>

<style>
.rateTile {
    background-color: #eee;
    cursor: pointer;
}

.rateTile .text-h6 {
    color: #01bcd4;
}

.rateTile .text-h5 {
    color: #ff5722;
}

.rateTile .text-subtitle2 {
    color: #000;
}

.rateTileSelected {
    background-color: #ff5722;
    color: #fff;
    cursor: pointer;
}
</style>
