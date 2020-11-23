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
        <div class="row q-mb-lg">
            <div class="text-h5">
                <div class="col q-px-md">Gestor de facturas</div>
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
                                <q-date v-model="searchDate">
                                    <div class="row items-center justify-end">
                                        <q-btn v-close-popup label="Close" color="primary" flat />
                                    </div>
                                </q-date>
                            </q-popup-proxy>
                        </q-icon>
                    </template>
                </q-input>
            </div>
            <div class="col-lg-2 q-px-md">
                <q-select
                    :options="statusOptions"
                    label="Estatus"
                    dense
                    filled
                    v-model="searchStatus"
                    emit-value
                    map-options
                />
            </div>
            <div class="col-lg-2 q-px-md">
                <q-input dense filled label="Factura" type="number" v-model="searchInvoice" />
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
                            <q-th v-for="col in props.cols" :key="col.name" :props="props">{{
                                col.label
                            }}</q-th>
                            <q-th>Reenviar</q-th>
                        </q-tr>
                    </template>

                    <template v-slot:body="props">
                        <q-tr :props="props">
                            <q-td key="No" :props="props">
                                <router-link
                                    :to="`/invoice-details/${props.row.id}`"
                                    class="text-primary"
                                    >{{ props.row.No }}</router-link
                                >
                            </q-td>
                            <q-td key="box" :props="props">
                                <router-link
                                    :to="returnBoxId(props.row.box)"
                                    class="text-primary"
                                    >{{ props.row.box }}</router-link
                                >
                            </q-td>
                            <q-td key="price" :props="props">
                                {{ props.row.price }}
                            </q-td>
                            <q-td key="status" :props="props">
                                <q-btn
                                    :color="returnStatus(props.row.status).color"
                                    class="text-white"
                                    rounded
                                    size="sm"
                                    @click="assignWorkingInvoice(props.row)"
                                >
                                    <i
                                        :class="`fas fa-${
                                            returnStatus(props.row.status).icon
                                        } q-mr-sm`"
                                    ></i>
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
                    <div class="text-h6">Estado de factura</div>
                </q-card-section>
                <q-card-section>
                    <div class="row">
                        <q-btn
                            outline
                            color="red"
                            label="Pendiente"
                            class="full-width q-mb-md"
                            @click="changeInvoiceStatus('unpaid')"
                        />
                    </div>
                    <div class="row">
                        <q-btn
                            outline
                            color="green"
                            label="Pagado"
                            class="full-width q-mb-md"
                            @click="changeInvoiceStatus('payed')"
                        />
                    </div>
                    <div class="row">
                        <q-btn
                            outline
                            color="primary"
                            label="Entregado"
                            class="full-width q-mb-md"
                            @click="changeInvoiceStatus('delivered')"
                        />
                    </div>
                    <div class="row">
                        <q-btn
                            outline
                            color="amber"
                            label="..STATUS.."
                            class="full-width q-mb-md"
                            @click="changeInvoiceStatus('somethingelse')"
                        />
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
            searchStatus: 'unpaid',
            statusDialog: false,
            searchBox: '',
            searchInvoice: '',
            searchDate: '',
            statusOptions: [
                {
                    label: 'Pendiente',
                    value: 'unpaid',
                },
                {
                    label: 'Pagado',
                    value: 'payed',
                },
                {
                    label: 'Entregado',
                    value: 'delivered',
                },
            ],
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
            allUsers: [],
            workingInvoice: '',
            displayLoading: false,
            displayAlert: false,
            alertTitle: '',
            alertMessage: '',
            alertType: '',
        }
    },
    methods: {
        assignWorkingInvoice(invoice) {
            this.workingInvoice = invoice
            this.statusDialog = true
        },
        changeInvoiceStatus(status) {
            this.displayLoading = true
            this.displayAlert = false
            let obj = {...this.workingInvoice}
            obj.status = status
            let id = obj.id
            delete obj.id
            api.UpdateInvoiceInformationById({id: id, invoice: obj})
                .then(response => {
                    this.displayLoading = false
                    this.alertTitle = 'Exito!'
                    this.alertMessage = 'Se ha actualizado con exito'
                    this.alertType = 'success'
                    this.displayAlert = true
                })
                .catch(error => {
                    console.log(error)
                    this.displayLoading = false
                    this.alertTitle = 'Error'
                    this.alertMessage = 'Hubo un error con la peticion'
                    this.alertType = 'error'
                    this.displayAlert = true
                })
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
            if (status == 'unpaid') return {status: 'Pendiente', color: 'red', icon: 'dollar-sign'}
            if (status == 'payed') return {status: 'Pagado', color: 'green', icon: 'dollar-sign'}
            if (status == 'delivered') return {status: 'Entregado', color: 'primary', icon: 'box'}
        },
    },
    computed: {
        filterTableData() {
            let data = []
            this.invoicesData.forEach(invoice => {
                if (
                    invoice.No.toString(10).includes(this.searchInvoice) &&
                    invoice.box.includes(this.searchBox) &&
                    moment(invoice.creationTime).format('YYYY/MM/DD').includes(this.searchDate) &&
                    invoice.status.includes(this.searchStatus)
                )
                    data.push(invoice)
            })
            return data
        },
    },
    watch: {
        invoicesData(newValue, oldValue) {
            this.filterInvoicesData = newValue
        },
    },
    mounted() {
        this.$refs.box.focus()
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
        api.ReturnAllUsers().then(response => (this.allUsers = response.data.data))
    },
}
</script>
