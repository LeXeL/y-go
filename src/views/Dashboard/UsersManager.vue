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
        <confirm-dialog
            :display="displayConfirm"
            :title="alertTitle"
            :message="alertMessage"
            @accept="deleteRate"
            @cancel="displayConfirm = false"
        ></confirm-dialog>
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
                                    returnRateName(props.row.rate)
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
                                    >$
                                    {{ parseFloat(props.row.rate).toFixed(2) }}
                                    <q-popup-edit
                                        v-model="props.row.rate"
                                        @save="
                                            updateRate(
                                                props.row.id,
                                                props.row.rate
                                            )
                                        "
                                        title="Actualizar Tarifa"
                                        buttons
                                    >
                                        <q-input
                                            type="text"
                                            v-model="props.row.rate"
                                            dense
                                            autofocus
                                            :rules="[
                                                val =>
                                                    !!val ||
                                                    'El campo es obligatorio',
                                            ]" /></q-popup-edit
                                ></q-td>
                                <q-td auto-width>
                                    <q-btn
                                        v-if="props.row.name !== 'Default'"
                                        size="sm"
                                        color="red-7"
                                        round
                                        dense
                                        icon="fas fa-times"
                                        flat
                                        @click="askForDeleteRate(props.row.id)"
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
                                v-model="rateName"
                                class="on-left"
                            />
                        </div>
                        <div class="col-6">
                            <q-input
                                filled
                                dense
                                label="Tarifa"
                                type="number"
                                v-model.number="rateRate"
                                class="on-right"
                            />
                        </div>
                    </div>
                </q-card-section>

                <q-card-actions align="right" class="text-primary">
                    <q-btn flat color="red-7" label="Cancelar" v-close-popup />
                    <q-btn flat label="Crear" @click="createNewRate()" />
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
            ratesData: [],
            usersData: [],
            filteredUserData: [],
        }
    },
    methods: {
        returnRateName(rateId) {
            let rateName
            rateName = this.ratesData.filter(rate => {
                if (rate.id === rateId) {
                    return rate
                }
            })[0]

            return rateName === null ? 'NaN' : rateName.name
        },
        updateRate(id, rate) {
            this.displayLoading = true
            this.displayAlert = false
            api.UpdateRateInformationById({
                id: id,
                rate: {rate: parseFloat(rate)},
            })
                .then(() => {
                    this.displayLoading = false
                    this.alertTitle = 'Exito!'
                    this.alertMessage = 'Se ha cambiado la tarifa con exito'
                    this.alertType = 'success'
                    this.displayAlert = true
                })
                .catch(error => {
                    console.log(error)
                    this.displayLoading = false
                    this.alertTitle = 'Error'
                    this.alertMessage =
                        'Hubo un error con tu peticion intentalo mas tarde.'
                    this.alertType = 'error'
                    this.displayAlert = true
                })
        },
        getAllRates() {
            try {
                api.ReturnAllRates().then(response => {
                    this.ratesData = response.data.data
                    this.ratesData = this.ratesData.sort(function (x, y) {
                        return x.name == 'Default'
                            ? -1
                            : y.name == 'Default'
                            ? 1
                            : 0
                    })
                })
            } catch (error) {
                console.log(error)
            }
        },
        deleteRate() {
            this.displayLoading = true
            this.displayAlert = false
            this.displayConfirm = false
            api.DeleteRateOnDatabase({
                id: this.workingDeletedId,
            })
                .then(() => {
                    this.displayLoading = false
                    this.alertTitle = 'Exito!'
                    this.alertMessage = 'Se ha eliminado la tarifa con exito'
                    this.alertType = 'success'
                    this.displayAlert = true
                    this.getAllRates()
                })
                .catch(error => {
                    console.log(error)
                    this.displayLoading = false
                    this.alertTitle = 'Error'
                    this.alertMessage = error
                    this.alertType = 'error'
                    this.displayAlert = true
                })
        },
        askForDeleteRate(id) {
            this.alertTitle = 'Esta seguro?'
            this.alertMessage = 'Se va a proceder a eliminar este paquete'
            this.workingDeletedId = id
            this.displayConfirm = true
        },
        createNewRate() {
            this.displayLoading = true
            if (this.rateName === '' || this.rateRate === '') {
                this.displayLoading = false
                this.alertTitle = 'Error'
                this.alertMessage =
                    'Por favor asegurate que llenaste los datos de nombre y precio correctamente'
                this.alertType = 'error'
                this.displayAlert = true
                return
            }
            api.CreateRateOnDatabase({
                rate: {name: this.rateName, rate: this.rateRate},
            }).then(response => {
                this.displayLoading = false
                this.alertTitle = 'Exito!'
                this.alertMessage = 'Se ha creado con exito la tarifa'
                this.alertType = 'success'
                this.displayAlert = true
                this.getAllRates()
                this.rateName = ''
                this.rateRate = ''
            })
        },
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