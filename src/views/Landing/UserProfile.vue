<template>
    <div>
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
                            v-model="countryCode"
                            :disable="!editInformation"
                        />
                    </div>
                    <div class="col-lg-10 col-md-10 col-sm-10 col-xs-8 q-pa-sm">
                        <q-input
                            filled
                            label="Celular *"
                            v-model="userInformationData.user.phone"
                            :disable="!editInformation"
                            mask="####-####"
                            fill-mask
                            :rules="[val => val.length > 0 || 'El campo es obligatorio']"
                        />
                    </div>
                </div>
            </q-tab-panel>

            <q-tab-panel name="plan">
                <div class="row q-mb-md">
                    <div class="col-lg-4 col-xs-12 q-pa-sm">
                        <div
                            :class="
                                selectedRateId == 'plan_basico_id'
                                    ? 'rateTileSelected q-pa-md rounded-borders text-center'
                                    : 'rateTile q-pa-md rounded-borders text-center'
                            "
                            @click="selectedRateId = 'plan_basico_id'"
                        >
                            <i class="fas fa-weight fa-2x q-mb-sm"></i>
                            <div class="text-h6 q-mb-sm text-bold">
                                Plan Basico
                            </div>
                            <q-separator
                                class="q-mb-sm"
                                :dark="selectedRateId == 'plan_basico_id'"
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
                                selectedRateId == 'plan_cerovol_id'
                                    ? 'rateTileSelected q-pa-md rounded-borders text-center'
                                    : 'rateTile q-pa-md rounded-borders text-center'
                            "
                            @click="selectedRateId = 'plan_cerovol_id'"
                        >
                            <i class="fas fa-ruler-combined fa-2x q-mb-sm"></i>
                            <div class="text-h6 q-mb-sm text-bold">
                                Plan Cero Volumen
                            </div>
                            <q-separator
                                class="q-mb-sm"
                                :dark="selectedRateId == 'plan_cerovol_id'"
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
                            <div class="text-h6 q-mb-sm text-primary text-bold">Plan Business</div>
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
            </q-tab-panel>

            <q-tab-panel name="address">
                <div class="row q-mb-md">
                    <div class="col">
                        <q-input
                            filled
                            label="Direccion de entrega"
                            v-model="userInformationData.user.address"
                            :disable="!editInformation"
                        />
                    </div>
                </div>
                <div class="row q-mb-md">
                    <div class="col">
                        <GoogleMaps
                            class="q-mb-md"
                            v-if="Object.keys(center).length > 0"
                            @markerPosition="setMarkerPosition"
                            :editable="editInformation"
                            :markers="markers"
                            :mapCenter="center"
                        ></GoogleMaps>
                    </div>
                </div>
            </q-tab-panel>
        </q-tab-panels>
        <!-- <q-card style="border-radius: 0;">
            <q-card-section>
                <div class="text-h6">Mi Perfil</div>
            </q-card-section>
            <q-card-section>
                <div class="row q-mb-md">
                    <div class="col">
                        <q-input
                            filled
                            label="Nombre"
                            class="on-left"
                            v-model="userInformationData.user.name"
                            :disable="!editInformation"
                            ref="name"
                        />
                    </div>
                    <div class="col">
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
                    <div class="col">
                        <q-input
                            filled
                            readonly
                            label="Correo electronico"
                            v-model="userInformationData.user.email"
                        />
                    </div>
                </div>
                <div class="row q-mb-md">
                    <div class="col">
                        <q-input
                            filled
                            label="Telefono"
                            v-model="userInformationData.user.phone"
                            :disable="!editInformation"
                        />
                    </div>
                </div>
                <div class="row q-mb-md" v-if="editInformation">
                    <div class="col-lg-4 col-xs-12 q-pa-sm">
                        <div
                            :class="
                                selectedRateId == 'plan_basico_id'
                                    ? 'rateTileSelected q-pa-md rounded-borders text-center'
                                    : 'rateTile q-pa-md rounded-borders text-center'
                            "
                            @click="selectedRateId = 'plan_basico_id'"
                        >
                            <i class="fas fa-weight fa-2x q-mb-sm"></i>
                            <div class="text-h6 q-mb-sm text-bold">
                                Plan Basico
                            </div>
                            <q-separator
                                class="q-mb-sm"
                                :dark="selectedRateId == 'plan_basico_id'"
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
                                selectedRateId == 'plan_cerovol_id'
                                    ? 'rateTileSelected q-pa-md rounded-borders text-center'
                                    : 'rateTile q-pa-md rounded-borders text-center'
                            "
                            @click="selectedRateId = 'plan_cerovol_id'"
                        >
                            <i class="fas fa-ruler-combined fa-2x q-mb-sm"></i>
                            <div class="text-h6 q-mb-sm text-bold">
                                Plan Cero Volumen
                            </div>
                            <q-separator
                                class="q-mb-sm"
                                :dark="selectedRateId == 'plan_cerovol_id'"
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
                            <div class="text-h6 q-mb-sm text-primary text-bold">Plan Business</div>
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
                <div class="row q-mb-md" v-else>
                    <div class="col">
                        <q-input
                            filled
                            label="Tarifa"
                            bottom-slots
                            v-model="userInformationData.user.rate"
                            disable
                        >
                            <template v-slot:hint> Ultima actualizacion: 10/09/2020 </template>
                        </q-input>
                    </div>
                </div>

                <div class="row q-mb-md">
                    <div class="col">
                        <q-input
                            type="textarea"
                            filled
                            rows="4"
                            label="Direccion de entrega"
                            v-model="userInformationData.user.address"
                            :disable="!editInformation"
                        />
                    </div>
                </div>
                <div class="row q-mb-md">
                    <div class="col">
                        <GoogleMaps
                            class="q-mb-md"
                            v-if="Object.keys(center).length > 0"
                            @markerPosition="setMarkerPosition"
                            :editable="editInformation"
                            :markers="markers"
                            :mapCenter="center"
                        ></GoogleMaps>
                    </div>
                </div>
            </q-card-section>
            <q-card-actions>
                <q-space />
                <q-btn
                    :label="editInformation ? 'Guardar' : 'Editar'"
                    color="primary"
                    flat
                    @click="handleData()"
                />
            </q-card-actions>
        </q-card> -->
    </div>
</template>
<script>
import GoogleMaps from '../../components/general/GoogleMaps'

export default {
    props: {
        userInformationData: {
            type: Object,
            default: () => {},
        },
        forceUpdateOnUser: {
            type: Boolean,
            default: false,
        },
    },
    data() {
        return {
            location: [],
            markers: [],
            center: {},
            editInformation: false,
            displayAlert: false,
            alertTitle: '',
            alertMessage: '',
            alertType: '',
            selectedRateId: 'plan_basico_id',
            tab: 'info',
            countryCodes: [],
            countryCode: '+507',
        }
    },
    methods: {
        handleData() {
            //Si editGeneralInfo es falso ponlo true y ya.
            if (!this.editInformation) {
                this.editInformation = true
                return
            }
            this.editInformation = false
            this.sendUpdate()
        },
        async sendUpdate() {
            if (this.forceUpdateOnUser) {
                if (
                    this.userInformationData.user.phone === undefined ||
                    this.userInformationData.user.address === undefined
                ) {
                    this.editInformation = true
                    this.displayLoading = false
                    this.alertTitle = 'Error'
                    this.alertMessage =
                        'No puedes dejar ningun campo vacio por favor llenalos todos con tus datos'
                    this.alertType = 'error'
                    this.displayAlert = true
                    return
                }
            }
            let obj = {...this.userInformationData.user}
            obj.isUpdated = true
            if (Object.keys(this.location).length > 0) obj.coordinates = this.location
            this.$emit('saveUserProfile', obj)
        },
        setMarkerPosition(event) {
            this.location = event
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
    },
    components: {
        GoogleMaps,
    },
    async mounted() {
        if (this.forceUpdateOnUser) {
            this.editInformation = true
        }
        if (this.userInformationData.user.coordinates === undefined) {
            this.geolocate()
            return
        }
        this.center = this.userInformationData.user.coordinates
        this.markers.push({position: this.center})
        this.countryCodes = require('@/assets/country_codes.json')
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
    cursor: pointer;
    color: #fff;
}
</style>
