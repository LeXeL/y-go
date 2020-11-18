<template>
    <q-card class="q-mb-xl">
        <ygo-alert
            :display="displayAlert"
            :title="alertTitle"
            :message="alertMessage"
            :type="alertType"
            @accept="displayAlert = false"
        ></ygo-alert>
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
            <div class="row q-mb-md">
                <div class="col q-pa-sm">
                    <div
                        class="bg-grey-3 q-pa-md rounded-borders text-center"
                        style="cursor: pointer;"
                    >
                        <div class="text-h6 q-mb-sm text-bold text-primary">
                            Plan Basico
                        </div>
                        <q-separator class="q-mb-sm" />
                        <div class="text-subtitle2">Texto punto 1</div>
                        <div class="text-subtitle2 q-mt-sm">Texto punto 2</div>
                        <div class="text-subtitle2 q-mt-sm">Texto punto 3</div>
                        <div class="text-h5 text-bold q-mt-md text-accent">$ 2.50</div>
                    </div>
                </div>
                <div class="col q-pa-sm">
                    <div
                        class="bg-grey-3 q-pa-md rounded-borders text-center"
                        style="cursor: pointer;"
                    >
                        <div class="text-h6 q-mb-sm text-bold text-primary">
                            Plan Cero Volumen
                        </div>
                        <q-separator class="q-mb-sm" />
                        <div class="text-subtitle2">Texto punto 1</div>
                        <div class="text-subtitle2 q-mt-sm">Texto punto 2</div>
                        <div class="text-subtitle2 q-mt-sm">Texto punto 3</div>
                        <div class="text-h5 text-bold q-mt-md text-accent">$ 3.00</div>
                    </div>
                </div>
                <div class="col q-pa-sm">
                    <div class="bg-grey-3 q-pa-md rounded-borders text-center">
                        <div class="text-h6 q-mb-sm text-primary text-bold">Plan Business</div>
                        <q-separator class="q-mb-sm" />
                        <div class="text-subtitle2">Texto punto 1</div>
                        <div class="text-subtitle2 q-mt-sm">Texto punto 2</div>
                        <div class="text-subtitle2 q-mt-sm">Texto punto 3</div>
                        <q-btn class="q-mt-md" label="Contactar" size="sm" color="accent" push />
                    </div>
                </div>
                <!-- <div class="col">
                    <q-select
                        :options="['Basico', 'Cero Volumen']"
                        filled
                        label="Tarifa"
                        bottom-slots
                        v-model="userInformationData.user.rate"
                        :disable="!editInformation"
                    >
                        <template v-slot:hint> Ultima actualizacion: 10/09/2020 </template>
                    </q-select>
                </div> -->
            </div>
            <div class="row q-mb-md">
                <div class="col">
                    <q-input
                        type="textarea"
                        filled
                        rows="4"
                        label="Direccion"
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
    </q-card>
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
    },
}
</script>
