<template>
    <q-page class="q-pa-lg">
        <loading-alert :display="displayLoading"></loading-alert>
        <ygo-alert
            :display="displayAlert"
            :title="alertTitle"
            :message="alertMessage"
            :type="alertType"
            @accept="displayAlert = false"
        ></ygo-alert>
        <div v-if="Object.keys(data).length !== 0">
            <div class="row q-mb-lg">
                <div class="text-h5">
                    <div class="col q-px-md">{{ data.box }}</div>
                </div>
            </div>
            <div class="row">
                <div class="col-lg-6 q-px-md">
                    <q-card class="full-width">
                        <q-card-section>
                            <div class="text-h6">Datos generales</div>
                        </q-card-section>
                        <q-separator />
                        <q-card-section>
                            <q-input
                                filled
                                label="Nombre"
                                v-model="data.name"
                                :disable="!editInformation"
                                class="q-mb-md"
                            />
                            <q-input
                                filled
                                label="Apellido"
                                v-model="data.lastName"
                                :disable="!editInformation"
                                class="q-mb-md"
                            />
                            <q-input
                                filled
                                label="Correo"
                                v-model="data.email"
                                :disable="!editInformation"
                                class="q-mb-md"
                            />
                            <q-input
                                filled
                                label="Direccion"
                                v-model="data.address"
                                :disable="!editInformation"
                                type="textarea"
                                rows="3"
                                class="q-mb-md"
                            />
                            <q-input
                                filled
                                label="Numero de Affiliado"
                                v-model.number="data.affiliateCardNo"
                                :disable="!editInformation"
                                class="q-mb-md"
                            />
                            <q-select
                                filled
                                v-model="currentlySelectedRole"
                                :disable="!editInformation"
                                :options="['Usuario', 'Administrador']"
                                label="Acceso"
                                class="q-mb-md"
                            />
                            <q-select
                                filled
                                v-model="data.subsidiary"
                                :disable="!editInformation"
                                :options="[
                                    {value: 0, label: 'Panamá'},
                                    {value: 1, label: 'Penonome'},
                                ]"
                                emit-value
                                map-options
                                label="Sucursal"
                                class="q-mb-md"
                            />
                            <q-select
                                filled
                                v-model="currentlySelectedRate"
                                :disable="!editInformation"
                                :options="
                                    rates
                                        .filter(rate => rate.subsidiary === data.subsidiary)
                                        .map(rate => {
                                            return rate.name
                                        })
                                "
                                label="Tarifa"
                                class="q-mb-md"
                            />
                            <q-select
                                filled
                                v-model="data.absorbedCompany"
                                :disable="!editInformation"
                                :options="['Ernel']"
                                label="Compañia absorvida"
                                class="q-mb-md"
                            />
                            <div
                                v-if="
                                    currentlySelectedRate === 'Plan Business' &&
                                    !data.businessAproved
                                "
                            >
                                <div class="text-caption q-mb-sm">Solicitud Plan Business</div>
                                <q-btn
                                    label="Aprobar"
                                    color="primary"
                                    outline
                                    size="sm"
                                    class="on-left"
                                    @click="approveBusinessRequest()"
                                />
                                <q-btn
                                    label="Rechazar"
                                    color="red-7"
                                    outline
                                    size="sm"
                                    @click="rejectBusinessRequest()"
                                />
                            </div>
                        </q-card-section>
                        <q-separator />
                        <q-card-actions>
                            <q-space />
                            <q-btn
                                color="primary"
                                :label="editInformation ? 'Guardar' : 'Editar'"
                                @click="handleData()"
                                flat
                            />
                        </q-card-actions>
                    </q-card>
                </div>
                <div class="col-lg-6 q-px-md">
                    <q-table
                        :data="invoicesData"
                        :columns="invoicesColumns"
                        row-key="name"
                        :pagination.sync="initialPagination"
                        class="full-width"
                        title="Facturas"
                    >
                        <template v-slot:header="props">
                            <q-tr :props="props">
                                <q-th v-for="col in props.cols" :key="col.name" :props="props">{{
                                    col.label
                                }}</q-th>
                                <!-- <q-th>Eliminar</q-th> -->
                            </q-tr>
                        </template>

                        <template v-slot:body="props">
                            <q-tr :props="props">
                                <q-td v-for="col in props.cols" :key="col.name" :props="props">{{
                                    col.value
                                }}</q-td>
                                <!-- <q-td auto-width>
                <q-btn size="sm" color="red-7" round dense icon="fas fa-times" />
              </q-td>-->
                            </q-tr>
                        </template>
                    </q-table>
                </div>
            </div>
        </div>
    </q-page>
</template>

<script>
import * as api from '@/api/api'

export default {
    computed: {
        user() {
            return this.$store.getters.user
        },
    },
    data() {
        return {
            displayLoading: false,
            displayAlert: false,
            alertTitle: '',
            alertMessage: '',
            alertType: '',
            role: '',
            rates: [],
            currentlySelectedRate: '',
            currentlySelectedRole: '',
            initialPagination: {
                sortBy: 'desc',
                descending: false,
                page: 1,
                rowsPerPage: 10,
            },
            data: [],
            editInformation: false,
            invoicesColumns: [
                {
                    name: 'invoice',
                    align: 'left',
                    label: 'Factura',
                    field: 'invoice',
                    sortable: true,
                },
                {
                    name: 'amount',
                    align: 'left',
                    label: 'Monto ($)',
                    field: 'amount',
                    sortable: true,
                },
                {
                    name: 'packages',
                    align: 'left',
                    label: 'Paquetes (cant.)',
                    field: 'packages',
                    sortable: true,
                },
                {
                    name: 'date',
                    align: 'left',
                    label: 'Facturado el',
                    field: 'date',
                    sortable: true,
                },
            ],
            invoicesData: [],
        }
    },
    methods: {
        rejectBusinessRequest() {
            this.displayLoading = true
            this.displayAlert = false
            this.data.rate = this.rates.find(
                rate => rate.name === 'Plan Basico' && rate.subsidiary === this.data.subsidiary
            ).id
            api.UpdateUserInformationById({uid: this.$route.params.id, user: this.data})
                .then(response => {
                    this.displayLoading = false
                    this.data.businessAproved = true
                    this.alertTitle = 'Exito!'
                    this.alertMessage = 'Se ha cancelado con exito la peticion'
                    this.alertType = 'success'
                    this.displayAlert = true
                })
                .catch(error => {
                    console.log(error)
                    this.displayLoading = false
                    this.alertTitle = 'Error'
                    this.alertMessage =
                        'Hubo un error con la solicitud por favor inténtelo más tarde'
                    this.alertType = 'error'
                    this.displayAlert = true
                })
        },
        approveBusinessRequest() {
            this.displayLoading = true
            this.displayAlert = false
            api.ApproveBusinessRequest({uid: this.$route.params.id})
                .then(response => {
                    this.displayLoading = false
                    this.data.businessAproved = true
                    this.alertTitle = 'Exito!'
                    this.alertMessage = 'Se ha aprobado con exito la peticion'
                    this.alertType = 'success'
                    this.displayAlert = true
                })
                .catch(error => {
                    console.log(error)
                    this.displayLoading = false
                    this.alertTitle = 'Error'
                    this.alertMessage =
                        'Hubo un error con la solicitud por favor inténtelo más tarde'
                    this.alertType = 'error'
                    this.displayAlert = true
                })
        },
        handleData() {
            //Si editGeneralInfo es falso ponlo true y ya.
            if (!this.editInformation) {
                this.editInformation = true
                return
            }
            this.editInformation = false
            this.update()
        },
        async update() {
            let obj = this.data
            this.displayLoading = true
            this.displayAlert = false
            this.currentlySelectedRole === 'Administrador'
                ? (obj.role = 'admin')
                : (obj.role = 'user')
            obj.rate = this.rates.find(rate => rate.name === this.currentlySelectedRate).id
            if (this.currentlySelectedRate === 'Plan Business') obj.businessAproved = true
            api.UpdateUserInformationById({
                uid: this.$route.params.id,
                user: obj,
            })
                .then(response => {
                    this.displayLoading = false
                    this.alertTitle = 'Exito!'
                    this.alertMessage = 'Se ha actualizado con exito la informacion'
                    this.alertType = 'success'
                    this.displayAlert = true
                })
                .catch(error => {
                    console.log(error)
                    this.displayLoading = false
                    this.alertTitle = 'Error'
                    this.alertMessage =
                        'Hubo un error con la solicitud por favor inténtelo más tarde'
                    this.alertType = 'error'
                    this.displayAlert = true
                })
        },
    },
    mounted() {
        this.displayLoading = true
        api.getUserInformationById({uid: this.$route.params.id})
            .then(user => {
                this.data = user.data.data
                api.ReturnAllRates().then(response => {
                    this.rates = response.data.data
                    this.currentlySelectedRate = this.rates.filter(rate => {
                        if (rate.id === this.data.rate) {
                            return rate
                        }
                    })[0].name
                })
                this.currentlySelectedRole =
                    this.data.role === 'admin' ? 'Administrador' : 'Usuario'
            })
            .then(() => {
                this.displayLoading = false
            })
            .catch(error => {
                console.log(error)
            })
    },
}
</script>
