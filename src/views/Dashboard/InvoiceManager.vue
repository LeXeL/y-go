<template>
    <q-page class="q-pa-lg">
        <div class="row q-mb-lg">
            <div class="text-h5">
                <div class="col q-px-md">Gestor de facturas</div>
            </div>
        </div>
        <div class="row q-mb-lg">
            <q-space />
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
                <q-input dense filled label="Casillero" v-model="searchBox" />
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
                        <q-icon name="fas fa-calendar" class="cursor-pointer">
                            <q-popup-proxy
                                ref="qDateProxy"
                                transition-show="scale"
                                transition-hide="scale"
                            >
                                <q-date v-model="searchDate">
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
                    :data="filterTableData"
                    :columns="invoicesColumns"
                    row-key="name"
                    :pagination.sync="initialPagination"
                    class="full-width"
                    title="Facturas"
                >
                    <template v-slot:header="props">
                        <q-tr :props="props">
                            <q-th
                                v-for="col in props.cols"
                                :key="col.name"
                                :props="props"
                                >{{ col.label }}</q-th
                            >
                            <q-th>Reenviar</q-th>
                        </q-tr>
                    </template>

                    <template v-slot:body="props">
                        <q-tr :props="props">
                            <q-td
                                key="No"
                                :props="props"
                            >
                                <router-link :to="`/invoice-details/${props.row.id}`" class="text-primary">{{ props.row.No }}</router-link>
                            </q-td>
                            <q-td
                                key="box"
                                :props="props"
                            >
                                <router-link :to="returnBoxId(props.row.box)" class="text-primary">{{ props.row.box }}</router-link>
                            </q-td>
                            <q-td key="price" :props="props">
                                {{ props.row.price }}
                            </q-td>
                            <q-td key="status" :props="props">
                                <q-btn :color="returnStatus(props.row.status).color" class="text-white" rounded size="sm" @click="statusDialog = true">
                                    <i :class="`fas fa-${returnStatus(props.row.status).icon} q-mr-sm`"></i>
                                    {{ returnStatus(props.row.status).status }}
                                </q-btn>
                            </q-td>
                            <q-td key="packages" :props="props">
                                {{ returnPackagesAmount(props.row.packages) }}
                            </q-td>

                            <q-td key="date" :props="props">
                                {{ returnFormatedTime(props.row.creationTime) }}
                            </q-td>

                            <q-td auto-width>
                                <q-btn
                                    size="sm"
                                    color="primary"
                                    round
                                    dense
                                    icon="fas fa-envelope"
                                    flat
                                />
                            </q-td>
                        </q-tr>
                    </template>
                </q-table>
            </div>
        </div>
        <q-dialog v-model="statusDialog">
            <q-card style="width: 300px">
                <q-card-section>
                    <div class="text-h6">
                        Estado de factura
                    </div>
                </q-card-section>
                <q-card-section>
                    <div class="row">
                        <q-btn outline color="red" label="Pendiente" class="full-width q-mb-md" />
                    </div>
                    <div class="row">
                        <q-btn outline color="green" label="Pagado" class="full-width q-mb-md" />
                    </div>
                    <div class="row">
                        <q-btn outline color="primary" label="Entregado" class="full-width q-mb-md" />
                    </div>
                    <div class="row">
                        <q-btn outline color="amber" label="..STATUS.." class="full-width q-mb-md" />
                    </div>
                </q-card-section>
            </q-card>
        </q-dialog>
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
            statusDialog: false,
            searchBox: '',
            searchInvoice: '',
            searchDate: '',
            initialPagination: {
                sortBy: 'desc',
                descending: false,
                page: 1,
                rowsPerPage: 10,
            },
            invoicesColumns: [
                {
                    name: 'No',
                    align: 'left',
                    label: 'Factura',
                    field: 'No',
                    sortable: true,
                },
                {
                    name: 'box',
                    align: 'left',
                    label: 'Casillero',
                    field: 'box',
                    sortable: true,
                },
                {
                    name: 'price',
                    align: 'left',
                    label: 'Monto ($)',
                    field: 'price',
                    sortable: true,
                },
                {
                    name: 'status',
                    align: 'left',
                    label: 'Estado',
                    field: 'status',
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
            filterInvoicesData: [],
            allUsers: [],
        }
    },
    methods: {
        clear() {
            this.searchBox = ''
            this.searchInvoice = ''
            this.searchDate = ''
        },
        filterContent() {
            if (
                this.searchBox === '' &&
                this.searchInvoice === '' &&
                this.searchDate === ''
            )
                this.filterInvoicesData = this.invoicesData
            if (this.searchBox) {
                this.filterInvoicesData = this.invoicesData.filter(invoice =>
                    invoice.box
                        .toLowerCase()
                        .includes(this.searchBox.toLowerCase())
                )
            }
            if (this.searchInvoice) {
                this.filterInvoicesData = this.invoicesData.filter(invoice =>
                    invoice.No.toString().includes(this.searchInvoice)
                )
            }
            if (this.searchDate) {
                this.filterInvoicesData = this.invoicesData.filter(packages => {
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
        returnBoxId(box) {
            let userId = this.allUsers.find(user => user.box === box).id
            return `/user-details/${userId}`
        },
        returnFormatedTime(time) {
            return moment(time).format('DD/MM/YYYY')
        },
        returnPackagesAmount(packages) {
            return parseInt(packages.length)
        },
        addToData(id, data) {
            data.id = id
            this.invoicesData.push(data)
        },
        editData(id, data) {
            data.id = id
            this.invoicesData.forEach((d, index) => {
                if (d.id === id) {
                    this.invoicesData.splice(index, 1, data)
                }
            })
        },
        removeData(id) {
            this.invoicesData.forEach((d, index) => {
                if (d.id === id) {
                    this.invoicesData.splice(index, 1)
                }
            })
        },
        returnStatus(status) {
            if (status == 'unpaid')
                return { status: 'Pendiente', color: 'red', icon: 'dollar-sign'}
            if (status == 'payed')
                return { status: 'Pagado', color: 'green', icon: 'dollar-sign'}
            if (status == 'delivered')
                return { status: 'Entregado', color: 'primary', icon: 'box'}
        }
    },
    computed: {
        filterTableData() {
            let data = []
            this.invoicesData.forEach(invoice => {
                if (invoice.No.toString(10).includes(this.searchInvoice))
                    data.push(invoice)
            })
            return data
        }
    },
    watch: {
        invoicesData(newValue, oldValue) {
            this.filterInvoicesData = newValue
        },
    },
    mounted() {
        let db = firebase.firestore()
        db.collection('invoices').onSnapshot(
            snapshot => {
                snapshot.docChanges().forEach(change => {
                    if (change.type === 'added') {
                        this.addToData(change.doc.id, change.doc.data())
                    }
                    if (change.type === 'modified') {
                        this.editData(change.doc.id, change.doc.data())
                    }
                    if (change.type === 'removed') {
                        this.removeData(change.doc.id)
                    }
                })
            },
            error => {
                console.log(error)
            }
        )
        api.ReturnAllUsers().then(
            response => (this.allUsers = response.data.data)
        )
    },
}
</script>