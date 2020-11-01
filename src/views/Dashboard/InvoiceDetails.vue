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
        <div v-if="!loading">
            <div class="row q-mb-lg">
                <div class="text-h5">
                    <div class="col q-px-md">Factura No. {{ form.No }}</div>
                </div>
            </div>
            <div class="row">
                <div class="col-lg-6 q-px-md">
                    <q-card class="full-width">
                        <q-card-section>
                            <div class="text-h6">Datos de factura</div>
                        </q-card-section>
                        <q-separator />
                        <q-card-section>
                            <q-input
                                filled
                                label="Casillero"
                                readonly
                                class="q-mb-md"
                                v-model="form.box"
                            />
                            <q-input
                                filled
                                label="Monto"
                                readonly
                                class="q-mb-md"
                                v-model="form.price"
                            />
                            <q-input
                                filled
                                label="Facturado el"
                                :value="returnFormatedTime(form.date)"
                                readonly
                                class="q-mb-md"
                            />
                            <q-input
                                filled
                                label="Facturado por"
                                readonly
                                class="q-mb-md"
                                v-model="form.by"
                            />
                        </q-card-section>
                        <q-separator />
                        <q-card-actions>
                            <q-space />
                            <q-btn color="primary" label="Reenviar correo" flat />
                        </q-card-actions>
                    </q-card>
                </div>
                <div class="col-lg-6 q-px-md">
                    <q-table
                        :data="packagesData"
                        :columns="packagesColumns"
                        row-key="name"
                        :pagination.sync="initialPagination"
                        class="full-width"
                        title="Detalle de paquetes"
                    >
                        <template v-slot:header="props">
                            <q-tr :props="props">
                                <q-th v-for="col in props.cols" :key="col.name" :props="props">{{
                                    col.label
                                }}</q-th>
                            </q-tr>
                        </template>

                        <template v-slot:body="props">
                            <q-tr :props="props">
                                <q-td key="tracking" :props="props">
                                    {{ props.row.tracking }}
                                </q-td>
                                <q-td key="dimensions" :props="props">
                                    {{ props.row.dimensions }}
                                </q-td>
                                <q-td key="weight" :props="props">
                                    {{ props.row.weight }}
                                </q-td>
                                <q-td key="volumetricWeight" :props="props">
                                    {{ props.row.volumetricWeight }}
                                </q-td>
                                <q-td key="price" :props="props">
                                    {{ props.row.price }}
                                    <q-tooltip
                                        anchor="bottom middle"
                                        self="top middle"
                                        content-class="bg-primary"
                                        :offset="[10, 10]"
                                    >
                                        <div class="text-subtitle2">
                                            <strong
                                                >$ {{ props.row.price }}</strong
                                            >
                                            - Costo
                                        </div>
                                        <div
                                            class="text-subtitle2"
                                            v-for="(addchrg, i) in props.row
                                                .aditionalCharges"
                                            :key="i"
                                        >
                                            <strong
                                                >$
                                                {{
                                                    addchrg.chargeAmount.toFixed(
                                                        2
                                                    )
                                                }}</strong
                                            >
                                            - {{ addchrg.chargeName }}
                                        </div>
                                    </q-tooltip>
                                </q-td>
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
            initialPagination: {
                sortBy: 'desc',
                descending: false,
                page: 1,
                rowsPerPage: 10,
            },
            form: {
                box: '',
                price: '',
                date: '',
                by: '',
            },
            packagesColumns: [
                {
                    name: 'tracking',
                    align: 'left',
                    label: 'Tracking',
                    field: 'tracking',
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
            ],
            loading: false,
            packagesData: [],
        }
    },
    methods: {
        returnFormatedTime(time) {
            return moment(time).format('DD/MM/YYYY')
        },
    },
    mounted() {
        this.displayLoading = true
        this.loading = true
        api.returnInvoiceById({id: this.$route.params.id})
            .then(response => {
                let obj = response.data.data
                this.form.box = obj.box
                this.form.price = obj.price
                this.form.date = obj.creationTime
                this.form.No = obj.No
                this.form.by = `${obj.by.name} ${obj.by.lastName}`
                obj.packages.forEach(element => {
                    this.packagesData.push({
                        tracking: element.tracking,
                        dimensions: `${element.long} x ${element.height} x ${element.width}`,
                        weight: element.weight,
                        volumetricWeight:
                            parseInt(element.long) *
                            parseInt(element.height) *
                            parseInt(element.width),
                        price: element.totalPrice,
                    })
                })
            })
            .then(() => {
                this.loading = false
                this.displayLoading = false
            })
            .catch(error => {
                console.log(error)
                this.displayLoading = false
                this.alertTitle = 'Error'
                this.alertMessage = 'Hubo un error con la solicitud por favor inténtelo más tarde'
                this.alertType = 'error'
                this.displayAlert = true
            })
    },
}
</script>
