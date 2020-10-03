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
                    <div class="col q-px-md">Gestor de usuarios</div>
                </div>
            </div>
            <div class="row q-mb-lg">
                <q-space />
                <div class="col-lg-2 q-px-md">
                    <q-input dense filled label="Nombre" v-model="searchName" />
                </div>
                <div class="col-lg-2 q-px-md">
                    <q-input
                        dense
                        filled
                        label="Apellido"
                        v-model="searchLastName"
                    />
                </div>
                <div class="col-lg-2 q-px-md">
                    <q-input
                        dense
                        filled
                        label="Correo"
                        v-model="searchEmail"
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
                        :columns="usersColumns"
                        row-key="name"
                        :pagination.sync="initialPagination"
                        class="full-width"
                        title="Usuarios"
                    >
                        <template v-slot:header="props">
                            <q-tr :props="props">
                                <q-th
                                    v-for="col in props.cols"
                                    :key="col.name"
                                    :props="props"
                                    >{{ col.label }}</q-th
                                >
                                <q-th>Editar</q-th>
                            </q-tr>
                        </template>

                        <template v-slot:body="props">
                            <q-tr :props="props">
                                <q-td key="name" :props="props">{{
                                    props.row.name
                                }}</q-td>
                                <q-td key="lastName" :props="props">{{
                                    props.row.lastName
                                }}</q-td>
                                <q-td key="email" :props="props">{{
                                    props.row.email
                                }}</q-td>
                                <q-td key="box" :props="props">{{
                                    props.row.box
                                }}</q-td>
                                <q-td key="rate" :props="props">{{
                                    props.row.rate
                                }}</q-td>
                                <q-td key="role" :props="props">{{
                                    props.row.role
                                }}</q-td>
                                <q-td auto-width>
                                    <q-btn
                                        size="sm"
                                        color="primary"
                                        round
                                        dense
                                        icon="fas fa-user-edit"
                                        flat
                                        :to="`/user-details/${props.row.id}`"
                                    />
                                </q-td>
                            </q-tr>
                        </template>
                    </q-table>
                </div>
            </div>
        </div>
        <q-dialog v-model="ratesDialog" persistent>
            <q-card style="width: 700px; max-width: 80vw">
                <q-card-section>
                    <div class="text-h6">Tarifas existentes</div>
                </q-card-section>
                <q-card-section>
                    <q-table
                        :data="ratesData"
                        :columns="ratesColumns"
                        row-key="name"
                        :pagination.sync="initialPagination"
                        class="full-width"
                    >
                        <template v-slot:header="props">
                            <q-tr :props="props">
                                <q-th
                                    v-for="col in props.cols"
                                    :key="col.name"
                                    :props="props"
                                    >{{ col.label }}</q-th
                                >
                                <q-th>Eliminar</q-th>
                            </q-tr>
                        </template>

                        <template v-slot:body="props">
                            <q-tr :props="props">
                                <q-td key="name" :props="props">{{
                                    props.row.name
                                }}</q-td>
                                <q-td key="rate" :props="props"
                                    >$ {{ props.row.rate.toFixed(2) }}</q-td
                                >
                                <q-td auto-width>
                                    <q-btn
                                        size="sm"
                                        color="red-7"
                                        round
                                        dense
                                        icon="fas fa-times"
                                        flat
                                    />
                                </q-td>
                            </q-tr>
                        </template>
                    </q-table>
                </q-card-section>
                <q-separator />
                <q-card-section>
                    <div class="text-h6">Crear nueva tarifa</div>
                </q-card-section>
                <q-card-section>
                    <div class="row">
                        <div class="col-6">
                            <q-input
                                filled
                                dense
                                label="Nombre"
                                class="on-left"
                            />
                        </div>
                        <div class="col-6">
                            <q-input
                                filled
                                dense
                                label="Tarifa"
                                type="number"
                                class="on-right"
                            />
                        </div>
                    </div>
                </q-card-section>

                <q-card-actions align="right" class="text-primary">
                    <q-btn flat color="red-7" label="Cancelar" v-close-popup />
                    <q-btn flat label="Crear" />
                </q-card-actions>
            </q-card>
        </q-dialog>
        <q-page-sticky position="bottom-right" :offset="[18, 18]">
            <q-btn
                fab
                icon="fas fa-dollar-sign"
                color="accent"
                @click="ratesDialog = true"
            />
        </q-page-sticky>
    </q-page>
</template>

<script>
import * as api from '@/api/api'
import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'
export default {
    data() {
        return {
            displayLoading: false,
            displayAlert: false,
            ratesDialog: false,
            alertTitle: '',
            alertMessage: '',
            alertType: '',
            searchName: '',
            searchLastName: '',
            searchEmail: '',
            searchBox: '',
            initialPagination: {
                sortBy: 'desc',
                descending: false,
                page: 1,
                rowsPerPage: 10,
            },
            usersColumns: [
                {
                    name: 'name',
                    align: 'left',
                    label: 'Nombre',
                    field: 'name',
                    sortable: true,
                },
                {
                    name: 'lastName',
                    align: 'left',
                    label: 'Apellido',
                    field: 'lastName',
                    sortable: true,
                },
                {
                    name: 'email',
                    align: 'left',
                    label: 'Correo',
                    field: 'email',
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
                    name: 'rate',
                    align: 'left',
                    label: 'Tarifa',
                    field: 'rate',
                    sortable: true,
                },
                {
                    name: 'role',
                    align: 'left',
                    label: 'Acceso',
                    field: 'role',
                    sortable: true,
                },
            ],
            ratesColumns: [
                {
                    name: 'name',
                    align: 'left',
                    label: 'Nombre',
                    field: 'name',
                    sortable: true,
                },
                {
                    name: 'rate',
                    align: 'left',
                    label: 'Tarifa',
                    field: 'rate',
                    sortable: true,
                },
            ],
            ratesData: [
                {
                    name: 'Base',
                    rate: 2.5,
                },
                {
                    name: 'Family & Friends',
                    rate: 2,
                },
            ],
            usersData: [],
            filteredUserData: [],
        }
    },
    methods: {
        clear() {
            this.searchName = ''
            this.searchLastName = ''
            this.searchEmail = ''
            this.searchBox = ''
        },
        filterContent() {
            if (
                this.searchName === '' &&
                this.searchLastName === '' &&
                this.searchEmail === '' &&
                this.searchBox === ''
            )
                this.filteredUserData = this.usersData
            if (this.searchName) {
                this.filteredUserData = this.usersData.filter(user => {
                    if (
                        user.name
                            .toLowerCase()
                            .includes(this.searchName.toLowerCase())
                    ) {
                        return user
                    }
                })
            }
            if (this.searchLastName) {
                this.filteredUserData = this.usersData.filter(user => {
                    if (
                        user.lastName
                            .toLowerCase()
                            .includes(this.searchLastName.toLowerCase())
                    ) {
                        return user
                    }
                })
            }
            if (this.searchEmail) {
                this.filteredUserData = this.usersData.filter(user => {
                    if (
                        user.email
                            .toLowerCase()
                            .includes(this.searchEmail.toLowerCase())
                    ) {
                        return user
                    }
                })
            }
            if (this.searchBox) {
                this.filteredUserData = this.usersData.filter(user => {
                    if (
                        user.box
                            .toLowerCase()
                            .includes(this.searchBox.toLowerCase())
                    ) {
                        return user
                    }
                })
            }

            this.clear()
        },
        addToUsers(id, data) {
            data.id = id
            this.usersData.push(data)
        },
        editInUsers(id, data) {
            let name = data.name + ' ' + data.lastName
            data.name = name
            data.id = id
            this.usersData.forEach((user, index) => {
                if (user.id === id) {
                    this.usersData.splice(index, 1, data)
                }
            })
        },
        removeInUsers(id) {
            this.usersData.forEach((user, index) => {
                if (user.id === id) {
                    this.usersData.splice(index, 1)
                }
            })
        },
    },
    watch: {
        usersData(newValue, oldValue) {
            this.filteredUserData = newValue
        },
    },
    mounted() {
        let db = firebase.firestore()
        db.collection('users').onSnapshot(
            snapshot => {
                snapshot.docChanges().forEach(change => {
                    if (change.type === 'added') {
                        this.addToUsers(change.doc.id, change.doc.data())
                    }
                    if (change.type === 'modified') {
                        this.editInUsers(change.doc.id, change.doc.data())
                    }
                    if (change.type === 'removed') {
                        this.removeInUsers(change.doc.id)
                    }
                })
            },
            error => {
                console.log(error)
            }
        )
    },
}
</script>