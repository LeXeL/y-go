<template>
    <q-page class="q-pa-md">
        <div class="row q-mt-lg">
            <div class="col desktop-only"></div>
            <div class="col-lg-7">
                <q-card class="q-mb-lg">
                    <q-card-section>
                        <div class="row">
                            <div class="col column">
                                <div class="text-primary">
                                    <span class="text-h5">Bienvenido,</span>
                                    &nbsp;
                                    <span class="text-h3">Fulanito Perez</span>
                                </div>
                                <div class="text-h5 text-accent">Casillero: 5683</div>
                                <div class="text-subtitle2">
                                    <br />
                                    2478 NW 89TH AVE SUITE Y GO 5683
                                    <br />
                                    DORAL, FLORIDA 33143
                                    <br />
                                    United States
                                    <br />Phone number: 7866673688
                                </div>
                            </div>
                            <div class="col-4 column flex-center">
                                <div class="row full-width q-mb-lg">
                                    <div class="col">
                                        <q-img
                                            :src="require('@/assets/logo_ygo.png')"
                                            style="width: 150px; display: inline-block"
                                        />
                                    </div>
                                    <div class="col column flex-center">
                                        <div class="text-h3 text-primary"><strong>24</strong></div>
                                        <div class="text-subtitle2 text-accent">
                                            <strong>Y-Go Libras</strong>
                                        </div>
                                    </div>
                                </div>
                                <div class="text-h6 text-primary">Division Platino</div>
                                <q-linear-progress
                                    stripe
                                    rounded
                                    size="15px"
                                    :value="0.75"
                                    color="accent"
                                    class="q-mt-sm q-mb-xs"
                                />
                                <div class="text-caption">75/100 pts.</div>
                            </div>
                        </div>
                    </q-card-section>
                </q-card>
                <div class="row">
                    <div class="col-4">
                        <q-list bordered padding class="rounded-borders" style="max-width: 350px">
                            <q-item-label header>Menu</q-item-label>
                            <q-separator />
                            <q-item clickable v-ripple>
                                <q-item-section avatar top>
                                    <q-avatar color="primary" text-color="white">
                                        <i class="fas fa-home"></i>
                                    </q-avatar>
                                </q-item-section>

                                <q-item-section>
                                    <q-item-label lines="1">Inicio</q-item-label>
                                </q-item-section>
                            </q-item>

                            <q-item clickable v-ripple>
                                <q-item-section avatar top>
                                    <q-avatar color="primary" text-color="white">
                                        <i class="fas fa-map-marker-alt"></i>
                                    </q-avatar>
                                </q-item-section>

                                <q-item-section>
                                    <q-item-label lines="1">Perfil y direccion</q-item-label>
                                    <q-item-label caption
                                        >Edita tu informacion y direccion de entrega</q-item-label
                                    >
                                </q-item-section>
                            </q-item>
                            <q-item clickable v-ripple>
                                <q-item-section avatar top>
                                    <q-avatar color="accent" text-color="white">
                                        <i class="fas fa-sign-out-alt"></i>
                                    </q-avatar>
                                </q-item-section>

                                <q-item-section>
                                    <q-item-label lines="1">Cerrar sesion</q-item-label>
                                </q-item-section>
                            </q-item>
                        </q-list>
                    </div>
                    <div class="col">
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
                    </div>
                </div>
            </div>
            <div class="col desktop-only"></div>
        </div>
    </q-page>
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
