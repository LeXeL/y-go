<template>
    <q-table
        title="Mis facturas"
        :data="filterInvoices"
        :columns="columns"
        row-key="No"
        style="border-radius: 0"
    >
        <template v-slot:top-right>
            <q-input dense debounce="300" v-model="searchTracking" placeholder="Buscar tracking">
                <q-icon slot="append" name="fas fa-search" />
            </q-input>
            <q-btn
                label="Pagar facturas"
                color="accent"
                push
                size="sm"
                class="text-bold q-ml-lg"
                icon-right="fas fa-dollar-sign"
                to="/checkout"
                :disable="isAnInvoiceUnpaid()"
            />
        </template>

        <template v-slot:header="props">
            <q-tr :props="props">
                <q-th auto-width />
                <q-th v-for="col in props.cols" :key="col.name" :props="props">
                    <span class="text-bold">{{ col.label }}</span>
                </q-th>
            </q-tr>
        </template>

        <template v-slot:body="props">
            <q-tr :props="props">
                <q-td auto-width>
                    <q-btn
                        size="sm"
                        color="primary"
                        round
                        dense
                        @click="props.expand = !props.expand"
                    >
                        <i :class="props.expand ? 'fas fa-minus' : 'fas fa-plus'"></i>
                    </q-btn>
                </q-td>
                <q-td :key="'No'" :props="props" class="y-go-1x">
                    {{ props.row.No }}
                </q-td>
                <q-td key="price" :props="props" class="y-go-1x">
                    $ {{ parseFloat(props.row.price).toFixed(2) }}
                </q-td>
                <q-td key="status" :props="props">
                    <q-badge :color="returnStatus(props.row.status).color">
                        {{ returnStatus(props.row.status).status }}
                    </q-badge>
                </q-td>
            </q-tr>
            <q-tr v-show="props.expand" :props="props">
                <q-td colspan="100%" class="y-go-1x">
                    <div>
                        Fecha:
                        <span class="text-bold text-accent">{{
                            returnFormatedTime(props.row.creationTime)
                        }}</span>
                    </div>
                    <div>
                        Paquetes:
                        <span class="text-bold text-accent">{{ props.row.packages.length }}</span>
                    </div>
                    <br />
                    <div v-for="(pckg, i) in props.row.packages" :key="i">
                        <div class="row text-left">
                            <div class="col-8">{{ pckg.tracking }}</div>
                            <div class="col-2">
                                {{
                                    pckg.volumetricWeight === 0
                                        ? pckg.weight
                                        : pckg.volumetricWeight
                                }}
                                lbs
                            </div>
                            <div class="col-2">$ {{ pckg.price }}</div>
                        </div>
                        <div v-if="pckg.aditionalCharges">
                            <div class="text-subtitle2 text-bold">
                                Cargos adicionales
                            </div>
                            <div class="row" v-for="(aC, i) in pckg.aditionalCharges" :key="i">
                                <div class="col-10">
                                    <div class="text-body">{{ aC.chargeName }}</div>
                                </div>
                                <div class="col-2">
                                    <div class="text-body">$ {{ aC.chargeAmount.toFixed(2) }}</div>
                                </div>
                            </div>
                        </div>
                        <q-separator class="q-my-md" v-if="i < props.row.packages.length - 1" />
                    </div>
                </q-td>
            </q-tr>
        </template>
    </q-table>
</template>

<script>
import moment from 'moment'
export default {
    props: {
        data: {
            type: Array,
            default: () => [],
        },
    },
    data() {
        return {
            searchTracking: '',
            columns: [
                {name: 'No', label: 'No. Factura', field: 'No', sortable: true},
                {name: 'price', label: 'Monto ($)', field: 'price', sortable: true},
                // {name: 'packages', label: 'Paquetes', field: 'packages', sortable: true},
                // {name: 'creationTime', label: 'Fecha', field: 'creationTime', sortable: true},
                {name: 'status', label: 'Estatus', field: 'status', sortable: true},
            ],
        }
    },
    methods: {
        returnFormatedTime(time) {
            return moment(time).format('DD/MM/YYYY')
        },
        returnStatus(status) {
            if (status == 'unpaid') return {status: 'Pendiente', color: 'red', icon: 'dollar-sign'}
            if (status == 'paid') return {status: 'Pagado', color: 'green', icon: 'dollar-sign'}
            if (status == 'review')
                return {status: 'En Proceso', color: 'amber', icon: 'dollar-sign'}
            if (status == 'delivered') return {status: 'Entregado', color: 'primary', icon: 'box'}
        },
        isAnInvoiceUnpaid() {
            let data = this.data.filter(inv => inv.status === 'unpaid')
            return !(data.length > 0)
        },
    },
    computed: {
        filterInvoices() {
            let filteredInvoices = []
            this.data.forEach(inv => {
                inv.packages.forEach(pckg => {
                    if (pckg.tracking.toLowerCase().includes(this.searchTracking.toLowerCase())) {
                        if (!filteredInvoices.includes(inv)) {
                            filteredInvoices.push(inv)
                        }
                    }
                })
            })
            return filteredInvoices
        },
    },
}
</script>
