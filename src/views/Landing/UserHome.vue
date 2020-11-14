<template>
    <q-table
        title="Mis facturas"
        :data="data"
        :columns="columns"
        row-key="name"
    >
        <template v-slot:header="props">
            <q-tr :props="props">
                <q-th auto-width />
                <q-th v-for="col in props.cols" :key="col.name" :props="props">
                    {{ col.label }}
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
                        <i
                            :class="
                                props.row.expand
                                    ? 'fas fa-minus'
                                    : 'fas fa-plus'
                            "
                        ></i>
                    </q-btn>
                </q-td>
                <q-td key="invoice" :props="props">
                    {{ props.row.invoice }}
                </q-td>
                <q-td key="amount" :props="props">
                    $ {{ props.row.amount.toFixed(2) }}
                </q-td>
                <q-td key="packages" :props="props">
                    {{ props.row.packages.length }}
                </q-td>
                <q-td key="date" :props="props">
                    {{ props.row.date }}
                </q-td>
                <q-td key="status" :props="props">
                    {{ props.row.status }}
                </q-td>
            </q-tr>
            <q-tr v-show="props.expand" :props="props">
                <q-td colspan="100%">
                    <div
                        class="text-left"
                        v-for="(pckg, i) in props.row.packages"
                        :key="i"
                    >
                        {{ pckg }}
                    </div>
                </q-td>
            </q-tr>
        </template>
    </q-table>
</template>

<script>
export default {
    data() {
        return {
            columns: [
                {name: 'invoice', label: 'No. Factura', field: 'invoice', sortable: true},
                {name: 'amount', label: 'Monto ($)', field: 'amount', sortable: true},
                {name: 'packages', label: 'Paquetes', field: 'packages', sortable: true},
                {name: 'date', label: 'Fecha', field: 'date', sortable: true},
                {name: 'status', label: 'Estatus', field: 'status', sortable: true},
            ],
            data: [
                {
                    invoice: 1050,
                    amount: 7.75,
                    packages: ['TBAMIA517882633', 'TBAMIA517861850', 'TBAMIA517684612'],
                    date: '11/11/2020',
                    status: 'pending',
                },
                {
                    invoice: 1050,
                    amount: 7.75,
                    packages: ['TBAMIA517882633', 'TBAMIA517861850', 'TBAMIA517684612'],
                    date: '11/11/2020',
                    status: 'pending',
                },
                {
                    invoice: 1050,
                    amount: 7.75,
                    packages: ['TBAMIA517882633', 'TBAMIA517861850', 'TBAMIA517684612'],
                    date: '11/11/2020',
                    status: 'pending',
                },
                {
                    invoice: 1050,
                    amount: 7.75,
                    packages: ['TBAMIA517882633', 'TBAMIA517861850', 'TBAMIA517684612'],
                    date: '11/11/2020',
                    status: 'pending',
                },
            ],
        }
    },
}
</script>