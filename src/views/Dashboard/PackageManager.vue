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
        <div>
            <div class="row q-mb-lg">
                <div class="text-h5">
                    <div class="col q-px-md">Gestor de paquetes</div>
                </div>
            </div>
            <div class="row q-mb-lg">
                <div class="col-lg-2 q-px-md">
                    <q-input dense filled label="Casillero" ref="box" v-model="searchBox" />
                </div>
                <div class="col-lg-2 q-px-md">
                    <q-input filled mask="date" label="Fecha" dense v-model="searchDate">
                        <template v-slot:append>
                            <q-icon name="fas fa-calendar" class="cursor-pointer">
                                <q-popup-proxy
                                    ref="qDateProxy"
                                    transition-show="scale"
                                    transition-hide="scale"
                                >
                                    <q-date
                                        v-model="searchDate"
                                        @input="() => $refs.qDateProxy.hide()"
                                    >
                                        <div class="row items-center justify-end">
                                            <q-btn
                                                v-close-popup
                                                label="Cerrar"
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
                <div class="col-lg-2 q-px-md">
                    <q-input dense filled label="Tracking" v-model="searchTracking" />
                </div>

                <div class="col-lg-2 q-px-md">
                    <q-input dense filled label="Factura" type="number" v-model="searchInvoice" />
                </div>
            </div>
            <div class="row q-mb-xl">
                <div class="col q-px-md">
                    <q-table
                        :data="filterTableData"
                        :columns="packagesColumns"
                        row-key="name"
                        :pagination.sync="initialPagination"
                        class="full-width"
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
                                <q-td key="tracking" :props="props">
                                    {{ props.row.tracking }}
                                </q-td>
                                <q-td key="box" :props="props">
                                    {{ props.row.box }}
                                </q-td>
                                <q-td key="invoice" :props="props">
                                    {{ props.row.invoice }}
                                </q-td>
                                <q-td key="dimensions" :props="props">
                                    {{ returnDimensions(props.row) }}
                                </q-td>
                                <q-td key="weight" :props="props">
                                    {{ props.row.weight }}
                                </q-td>
                                <q-td key="volumetricWeight" :props="props">
                                    {{ props.row.volumetricWeight }}
                                </q-td>
                                <q-td key="price" :props="props">
                                    $ {{ props.row.totalPrice }}
                                    <q-tooltip
                                        anchor="bottom middle"
                                        self="top middle"
                                        content-class="bg-primary"
                                        :offset="[10, 10]"
                                    >
                                        <div class="text-subtitle2">
                                            <strong>$ {{ props.row.price }}</strong>
                                            - Costo
                                        </div>
                                        <div
                                            class="text-subtitle2"
                                            v-for="(addchrg, i) in props.row.aditionalCharges"
                                            :key="i"
                                        >
                                            <strong>$ {{ addchrg.chargeAmount.toFixed(2) }}</strong>
                                            - {{ addchrg.chargeName }}
                                        </div>
                                    </q-tooltip>
                                </q-td>
                                <q-td key="date" :props="props">
                                    {{ returnFormatedTime(props.row.creationTime) }}
                                </q-td>
                                <q-td key="admin" :props="props">
                                    {{ `${props.row.by.name} ${props.row.by.lastName}` }}
                                </q-td>
                                <q-td key="supplierInvoice" :props="props">
                                    <q-chip>Ver</q-chip>
                                    <q-tooltip
                                        anchor="bottom middle"
                                        self="top middle"
                                        content-class="bg-primary"
                                        :offset="[10, 10]"
                                    >
                                        <div class="text-subtitle2">
                                            <strong>No. Factura: </strong>
                                            {{ props.row.supplierInvoice }}
                                        </div>
                                        <div class="text-subtitle2">
                                            <strong>Fecha. Factura: </strong>
                                            {{ props.row.supplierInvoiceDate }}
                                        </div>
                                    </q-tooltip>
                                </q-td>
                                <!-- <q-td key="supplierInvoiceDate" :props="props">
                                    {{ props.row.supplierInvoiceDate }}
                                </q-td> -->
                                <!-- <q-td auto-width>
                <q-btn size="sm" color="red-7" round dense icon="fas fa-times" />
              </q-td>-->
                            </q-tr>
                        </template>
                    </q-table>
                </div>
            </div>
            <q-page-sticky position="bottom-right" :offset="[18, 18]">
                <q-btn fab icon="fas fa-boxes" color="accent" to="/package-register" />
            </q-page-sticky>
        </div>
    </q-page>
</template>

<script>
import firebase from 'firebase/app'
import 'firebase/firestore'

import * as api from '@/api/api'

import moment from 'moment'
export default {
    data() {
        return {
            displayLoading: false,
            displayAlert: false,
            displayConfirm: false,
            alertTitle: '',
            alertMessage: '',
            alertType: '',
            searchTracking: '',
            searchBox: '',
            searchInvoice: '',
            invoices: [],
            searchDate: '',
            initialPagination: {
                sortBy: 'desc',
                descending: false,
                page: 1,
                rowsPerPage: 10,
            },
            packagesColumns: [
                {
                    name: 'tracking',
                    align: 'left',
                    label: 'Tracking',
                    field: 'tracking',
                },
                {
                    name: 'box',
                    align: 'left',
                    label: 'Casillero',
                    field: 'box',
                    sortable: true,
                },
                {
                    name: 'invoice',
                    align: 'left',
                    label: 'Factura',
                    field: 'invoice',
                    sortable: true,
                },
                {
                    name: 'dimensions',
                    align: 'left',
                    label: 'Dimensiones LxHxA (plg)',
                    field: 'dimensions',
                },
                {
                    name: 'weight',
                    align: 'left',
                    label: 'Peso fisico (lb)',
                    field: 'weight',
                    sortable: true,
                },
                {
                    name: 'volumetricWeight',
                    align: 'left',
                    label: 'Peso volumetrico (lb)',
                    field: 'volumetricWeight',
                    sortable: true,
                },
                {
                    name: 'price',
                    align: 'left',
                    label: 'Precio ($)',
                    field: 'price',
                    sortable: true,
                },
                {
                    name: 'date',
                    align: 'left',
                    label: 'Recibido el',
                    field: 'date',
                    sortable: true,
                },
                {
                    name: 'admin',
                    align: 'left',
                    label: 'Recibido por',
                    field: 'admin',
                    sortable: true,
                },
                {
                    name: 'supplierInvoice',
                    align: 'left',
                    label: 'Info Proveedor',
                },
            ],
            packagesData: [],
            filteredUserData: [],
        }
    },
    methods: {
        returnDimensions(row) {
            return `${row.long} x ${row.height} x ${row.width}`
        },
        returnFormatedTime(time) {
            return moment(time).format('DD/MM/YYYY')
        },
        calculateVolumetric(row) {
            return parseInt(row.long) * parseInt(row.height) * parseInt(row.width)
        },
    },
    computed: {
        filterTableData() {
            let data = []
            this.packagesData.forEach(pckg => {
                if (
                    pckg.box.includes(this.searchBox) &&
                    moment(pckg.creationTime).format('YYYY/MM/DD').includes(this.searchDate) &&
                    pckg.tracking.toLowerCase().includes(this.searchTracking.toLowerCase()) &&
                    pckg.invoice.toString(10).includes(this.searchInvoice)
                )
                    data.push(pckg)
            })
            return data
        },
    },
    watch: {
        packagesData(newValue, oldValue) {
            this.filteredUserData = newValue
        },
    },
    mounted() {
        this.$refs.box.focus()
        let db = firebase.firestore()
        try {
            api.ReturnAllPackagesWithInvoice().then(
                response => (this.packagesData = response.data.data)
            )
            api.returnAllInvoices().then(response => (this.invoices = response.data.data))
        } catch (error) {
            console.log(error)
        }
    },
}
</script>
