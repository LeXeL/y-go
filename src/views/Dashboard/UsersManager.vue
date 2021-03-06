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
                    <div class="col q-px-md">Usuarios Y-Go</div>
                </div>
            </div>
            <div class="row q-mb-lg">
                <div class="col-lg-2 q-px-md">
                    <q-input dense filled label="Casillero" v-model="searchBox" ref="box" />
                </div>
                <div class="col-lg-2 q-px-md">
                    <q-input dense filled label="Correo" v-model="searchEmail" />
                </div>
                <div class="col-lg-2 q-px-md">
                    <q-input dense filled label="Nombre" v-model="searchName" />
                </div>
                <div class="col-lg-2 q-px-md">
                    <q-input dense filled label="Apellido" v-model="searchLastName" />
                </div>
            </div>
            <div class="row q-mb-xl">
                <div class="col q-px-md">
                    <q-table
                        :data="filterUserTable"
                        :columns="usersColumns"
                        row-key="name"
                        :pagination.sync="initialPagination"
                        class="full-width"
                        title="Usuarios"
                    >
                        <template v-slot:header="props">
                            <q-tr :props="props">
                                <q-th v-for="col in props.cols" :key="col.name" :props="props">{{
                                    col.label
                                }}</q-th>
                                <q-th>Editar</q-th>
                            </q-tr>
                        </template>

                        <template v-slot:body="props">
                            <q-tr :props="props">
                                <q-td key="name" :props="props">{{ props.row.name }}</q-td>
                                <q-td key="lastName" :props="props">{{ props.row.lastName }}</q-td>
                                <q-td key="email" :props="props">{{ props.row.email }}</q-td>
                                <q-td key="box" :props="props">{{ props.row.box }}</q-td>
                                <q-td key="rate" :props="props">{{
                                    returnRateName(props.row.rate)
                                }}</q-td>
                                <q-td key="role" :props="props">{{ props.row.role }}</q-td>
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
            displayConfirm: false,
            ratesDialog: false,
            alertTitle: '',
            alertMessage: '',
            alertType: '',
            searchName: '',
            searchLastName: '',
            searchEmail: '',
            searchBox: '',
            rateName: '',
            rateRate: '',
            workingDeletedId: '',
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
            ratesData: [],
            usersData: [],
            filteredUserData: [],
        }
    },
    methods: {
        returnRateName(rateId) {
            let rateName = this.ratesData.find(rate => rate.id === rateId)
            return rateName !== undefined ? rateName.name : 'NaN'
        },
        getAllRates() {
            try {
                api.ReturnAllRates().then(response => {
                    this.ratesData = response.data.data
                    this.ratesData = this.ratesData.sort(function(x, y) {
                        return x.name == 'Default' ? -1 : y.name == 'Default' ? 1 : 0
                    })
                })
            } catch (error) {
                console.log(error)
            }
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
    computed: {
        filterUserTable() {
            let filteredData = []
            this.usersData.forEach(user => {
                if (
                    user.box.includes(this.searchBox) &&
                    user.email.toLowerCase().includes(this.searchEmail.toLowerCase()) &&
                    user.name.toLowerCase().includes(this.searchName.toLowerCase()) &&
                    user.lastName.toLowerCase().includes(this.searchLastName.toLowerCase())
                )
                    filteredData.push(user)
            })
            return filteredData
        },
    },
    watch: {
        usersData(newValue, oldValue) {
            this.filteredUserData = newValue
        },
    },
    mounted() {
        this.$refs.box.focus()
        let db = firebase.firestore()
        this.getAllRates()
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
