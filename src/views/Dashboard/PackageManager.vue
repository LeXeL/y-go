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
                <q-space />
                <div class="col-lg-2 q-px-md">
                    <q-input
                        dense
                        filled
                        label="Tracking"
                        v-model="searchTracking"
                    />
                </div>
                <div class="col-lg-2 q-px-md">
                    <q-input
                        dense
                        filled
                        label="Casillero"
                        v-model="searchBox"
                    />
                </div>
                <div class="col-lg-2 q-px-md">
                    <q-input
                        dense
                        filled
                        label="Factura"
                        type="number"
                        v-model="searchInvoice"
                    />
                </div>
                <div class="col-lg-2 q-px-md">
                    <q-input
                        dense
                        filled
                        label="Factura de proveedor"
                        type="number"
                    />
                </div>
                <div class="col-lg-2 q-px-md">
                    <q-input
                        filled
                        mask="date"
                        label="Fecha"
                        dense
                        v-model="searchDate"
                    >
                        <template v-slot:append>
                            <q-icon
                                name="fas fa-calendar"
                                class="cursor-pointer"
                            >
                                <q-popup-proxy
                                    ref="qDateProxy"
                                    transition-show="scale"
                                    transition-hide="scale"
                                >
                                    <q-date
                                        v-model="searchDate"
                                        @input="() => $refs.qDateProxy.hide()"
                                    >
                                        <div
                                            class="row items-center justify-end"
                                        >
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
                <div class="col-lg-1 q-px-md">
                    <q-btn
                        color="primary"
                        label="Buscar"
                        @click="filterContent()"
                    />
                </div>
            </div>
            <div class="row q-mb-xl">
                <div class="col q-px-md">
                    <q-table
                        :data="filteredUserData"
                        :columns="packagesColumns"
                        row-key="name"
                        :pagination.sync="initialPagination"
                        class="full-width"
                        title="Paquetes facturados"
                    >
                        <template v-slot:header="props">
                            <q-tr :props="props">
                                <q-th
                                    v-for="col in props.cols"
                                    :key="col.name"
                                    :props="props"
                                    >{{ col.label }}</q-th
                                >
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
                                    {{ calculateVolumetric(props.row) }}
                                </q-td>
                                <q-td key="price" :props="props">
                                    {{ props.row.totalPrice }}
                                </q-td>
                                <q-td key="date" :props="props">
                                    {{
                                        returnFormatedTime(
                                            props.row.creationTime
                                        )
                                    }}
                                </q-td>
                                <q-td key="admin" :props="props">
                                    {{
                                        `${props.row.by.name} ${props.row.by.lastName}`
                                    }}
                                </q-td>
                                <q-td key="supplierInvoice" :props="props">
                                    {{ props.row.supplierInvoice }}
                                </q-td>
                                <q-td key="supplierInvoiceDate" :props="props">
                                    {{ props.row.supplierInvoiceDate }}
                                </q-td>
                                <!-- <q-td auto-width>
                <q-btn size="sm" color="red-7" round dense icon="fas fa-times" />
              </q-td>-->
                            </q-tr>
                        </template>
                    </q-table>
                </div>
            </div>
            <q-page-sticky position="bottom-right" :offset="[18, 18]">
                <q-btn
                    fab
                    icon="fas fa-boxes"
                    color="accent"
                    to="/package-register"
                />
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
            searchDate: moment(new Date()).format('YYYY/MM/DD'),
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
                    label: 'Factura proveedor',
                    field: 'supplierInvoice',
                    sortable: true,
                },
                {
                    name: 'supplierInvoiceDate',
                    align: 'left',
                    label: 'Fecha proveedor',
                    field: 'supplierInvoiceDate',
                    sortable: true,
                },
            ],
            packagesData: [],
            filteredUserData: [],
        }
    },
    methods: {
        clear() {
            this.searchTracking = ''
            this.searchBox = ''
            this.searchInvoice = ''
            this.searchDate = ''
        },
        filterContent() {
            if (
                this.searchTracking === '' &&
                this.searchBox === '' &&
                this.searchInvoice === '' &&
                this.searchDate === ''
            )
                this.filteredUserData = this.packagesData
            if (this.searchTracking) {
                this.filteredUserData = this.packagesData.filter(packages => {
                    if (
                        packages.tracking
                            .toLowerCase()
                            .includes(this.searchTracking.toLowerCase())
                    ) {
                        return packages
                    }
                })
            }
            if (this.searchBox) {
                this.filteredUserData = this.packagesData.filter(packages => {
                    if (
                        packages.box
                            .toLowerCase()
                            .includes(this.searchBox.toLowerCase())
                    ) {
                        return packages
                    }
                })
            }
            if (this.searchInvoice) {
                this.filteredUserData = this.packagesData.filter(
                    packages =>
                        packages.invoice === parseInt(this.searchInvoice)
                )
            }
            if (this.searchDate) {
                this.filteredUserData = this.packagesData.filter(packages => {
                    let dataDate = moment(packages.creationTime).format(
                        'YYYY/MM/DD'
                    )
                    if (moment(dataDate).isSame(this.searchDate)) {
                        return packages
                    }
                })
            }

            this.clear()
        },
        returnDimensions(row) {
            return `${row.long} x ${row.height} x ${row.width}`
        },
        returnFormatedTime(time) {
            return moment(time).format('DD/MM/YYYY')
        },
        calculateVolumetric(row) {
            return (
                parseInt(row.long) * parseInt(row.height) * parseInt(row.width)
            )
        },
    },
    watch: {
        packagesData(newValue, oldValue) {
            this.filteredUserData = newValue
        },
    },
    mounted() {
        let db = firebase.firestore()
        try {
            api.ReturnAllPackagesWithInvoice().then(
                response => (this.packagesData = response.data.data)
            )
            api.returnAllInvoices().then(
                response => (this.invoices = response.data.data)
            )
        } catch (error) {
            console.log(error)
        }
    },
}
</script>
