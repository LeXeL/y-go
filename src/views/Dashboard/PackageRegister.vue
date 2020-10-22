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
            @accept="deletePackage"
            @cancel="displayConfirm = false"
        ></confirm-dialog>
        <div>
            <div class="row q-mb-lg">
                <div class="text-h5">
                    <div class="col q-px-md">Registro de paquetes</div>
                </div>
            </div>
            <div class="row q-mb-lg">
                <div class="col-lg-3 q-px-md">
                    <q-file
                        filled
                        v-model="uploadFile"
                        label="Subir por archivo"
                        dense
                    >
                        <template v-slot:prepend>
                            <q-icon name="fas fa-paperclip" />
                        </template>
                        <template v-slot:after>
                            <q-btn
                                round
                                dense
                                flat
                                color="primary"
                                icon="fas fa-paper-plane"
                            />
                        </template>
                    </q-file>
                </div>
            </div>
            <div class="row" style="margin-bottom: 65px">
                <div class="col-lg-8 q-px-md">
                    <q-table
                        :data="filteredPackagesData"
                        :columns="packagesColumns"
                        row-key="name"
                        :pagination.sync="initialPagination"
                        class="full-width"
                        title="Paquetes por facturar"
                    >
                        <template v-slot:header="props">
                            <q-tr :props="props">
                                <q-th
                                    v-for="col in props.cols"
                                    :key="col.name"
                                    :props="props"
                                    >{{ col.label }}</q-th
                                >
                                <q-th>Acciones</q-th>
                            </q-tr>
                        </template>

                        <!-- <template v-slot:body="props">
            <q-tr :props="props">
              <q-td v-for="col in props.cols" :key="col.name" :props="props">{{ col.value }}</q-td>
              <q-td auto-width>
                <q-btn size="sm" color="red-7" round dense icon="fas fa-times" />
              </q-td>
            </q-tr>
          </template> -->
                        <template v-slot:body="props">
                            <q-tr :props="props">
                                <q-td key="tracking" :props="props">
                                    {{ props.row.tracking }}
                                    <q-popup-edit
                                        v-model="props.row.tracking"
                                        @save="
                                            updatePackageWithChange(props.row)
                                        "
                                        title="Editar tracking"
                                        buttons
                                    >
                                        <q-input
                                            type="text"
                                            v-model="props.row.tracking"
                                            dense
                                            autofocus
                                        />
                                    </q-popup-edit>
                                </q-td>

                                <q-td key="box" :props="props">
                                    {{ props.row.box }}
                                    <q-popup-edit
                                        v-model="props.row.box"
                                        @save="
                                            updatePackageWithChange(props.row)
                                        "
                                        title="Editar casillero"
                                        buttons
                                    >
                                        <q-input
                                            type="text"
                                            v-model="props.row.box"
                                            dense
                                            autofocus
                                        />
                                    </q-popup-edit>
                                </q-td>
                                <q-td key="dimensions" :props="props">
                                    {{ returnDimensions(props.row) }}
                                </q-td>
                                <q-td key="weight" :props="props">
                                    {{ props.row.weight }}
                                    <q-popup-edit
                                        v-model="props.row.weight"
                                        @save="
                                            updatePackageWithChange(props.row)
                                        "
                                        title="Editar peso"
                                        buttons
                                    >
                                        <q-input
                                            type="text"
                                            v-model="props.row.weight"
                                            dense
                                            autofocus
                                        />
                                    </q-popup-edit>
                                </q-td>
                                <q-td auto-width>
                                    <!-- <q-btn
                                        size="sm"
                                        color="red-7"
                                        round
                                        flat
                                        dense
                                        icon="fas fa-times"
                                        @click="
                                            askForDeletePackage(props.row.id)
                                        "
                                    /> -->
                                    <q-btn-group>
                                        <q-btn
                                            icon="fas fa-edit"
                                            size="sm"
                                            round
                                            flat
                                            color="primary"
                                        />
                                        <q-btn
                                            icon="fas fa-times"
                                            size="sm"
                                            round
                                            flat
                                            color="red-7"
                                            @click="
                                                askForDeletePackage(
                                                    props.row.id
                                                )
                                            "
                                        />
                                    </q-btn-group>
                                </q-td>
                            </q-tr>
                        </template>
                    </q-table>
                </div>
                <div class="col-lg-4 q-px-md">
                    <q-card class="full-width">
                        <q-card-section>
                            <div class="text-h6">Registrar</div>
                        </q-card-section>

                        <q-card-section>
                            <q-input
                                filled
                                v-model="form.tracking"
                                label="Tracking"
                                class="q-mb-md"
                                :rules="[
                                    val => !!val || 'El campo es obligatorio',
                                ]"
                            />
                            <q-input
                                filled
                                v-model="form.box"
                                label="Casillero"
                                class="q-mb-md"
                                :rules="[
                                    val => !!val || 'El campo es obligatorio',
                                ]"
                            />
                            <q-input
                                filled
                                v-model="form.weight"
                                type="number"
                                label="Peso"
                                class="q-mb-md"
                                :rules="[
                                    val => !!val || 'El campo es obligatorio',
                                ]"
                            />
                            <q-input
                                filled
                                v-model="form.long"
                                type="number"
                                label="Largo"
                                class="q-mb-md"
                                :rules="[
                                    val => !!val || 'El campo es obligatorio',
                                ]"
                            />
                            <q-input
                                filled
                                v-model="form.height"
                                type="number"
                                label="Alto"
                                class="q-mb-md"
                                :rules="[
                                    val => !!val || 'El campo es obligatorio',
                                ]"
                            />
                            <q-input
                                filled
                                v-model="form.width"
                                type="number"
                                label="Ancho"
                                class="q-mb-md"
                                :rules="[
                                    val => !!val || 'El campo es obligatorio',
                                ]"
                            />
                            <q-input
                                filled
                                type="number"
                                label="No. factura de proveedor"
                                class="q-mb-md"
                                :rules="[
                                    val => !!val || 'El campo es obligatorio',
                                ]"
                            />
                            <q-input
                                filled
                                mask="date"
                                class="q-mb-md"
                                label="Fecha de factura de proveedor"
                                :rules="[
                                    val => !!val || 'El campo es obligatorio',
                                ]"
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
                                                @input="
                                                    () =>
                                                        $refs.qDateProxy.hide()
                                                "
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
                            <q-input
                                filled
                                type="number"
                                label="Cargos adicionales"
                                readonly
                                class="q-mb-md"
                                :value="calculateAdditionalCharges()"
                            >
                                <template v-slot:after>
                                    <q-btn
                                        round
                                        dense
                                        flat
                                        color="primary"
                                        icon="far fa-list-alt"
                                        @click="additionalChargesDialog = true"
                                    />
                                </template>
                            </q-input>
                        </q-card-section>

                        <q-separator />

                        <q-card-actions align="right">
                            <q-btn flat color="warning" @click="clear()"
                                >Cancelar</q-btn
                            >
                            <q-btn flat color="primary" @click="Generate()"
                                >Registrar</q-btn
                            >
                        </q-card-actions>
                    </q-card>
                </div>
            </div>
            <q-dialog v-model="additionalChargesDialog" persistent>
                <q-card style="width: 700px; max-width: 80vw">
                    <q-card-section>
                        <div class="text-h6">Cargos adicionales</div>
                    </q-card-section>
                    <q-card-section>
                        <q-table
                            :data="additionalChargesData"
                            :columns="additionalChargesColumns"
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
                                    <q-td key="desc" :props="props">{{
                                        props.row.desc
                                    }}</q-td>
                                    <q-td key="amount" :props="props"
                                        >$
                                        {{ props.row.amount.toFixed(2) }}</q-td
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
                        <div class="text-h6">Agregar cargo</div>
                    </q-card-section>
                    <q-card-section>
                        <div class="row">
                            <div class="col-6">
                                <q-input
                                    filled
                                    dense
                                    label="Descripcion"
                                    class="on-left"
                                />
                            </div>
                            <div class="col-6">
                                <q-input
                                    filled
                                    dense
                                    label="Monto"
                                    type="number"
                                    class="on-right"
                                />
                            </div>
                        </div>
                    </q-card-section>

                    <q-card-actions align="right" class="text-primary">
                        <q-btn
                            flat
                            color="red-7"
                            label="Cerrar"
                            v-close-popup
                        />
                        <q-btn flat label="Agregar" />
                    </q-card-actions>
                </q-card>
            </q-dialog>
            <q-page-sticky position="bottom-right" :offset="[18, 18]">
                <q-btn
                    fab
                    icon="fas fa-file-alt"
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

export default {
    data() {
        return {
            additionalChargesDialog: false,
            uploadFile: null,
            displayLoading: false,
            displayAlert: false,
            displayConfirm: false,
            alertTitle: '',
            alertMessage: '',
            alertType: '',
            form: {
                tracking: '',
                box: '',
                weight: '',
                long: '',
                height: '',
                width: '',
            },
            initialPagination: {
                sortBy: 'desc',
                descending: false,
                page: 1,
                rowsPerPage: 0,
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
                    name: 'additionalCharges',
                    align: 'left',
                    label: 'Cargos adicionales',
                    field: 'additionalCharges',
                    sortable: true,
                },
                {
                    name: 'providerInvoice',
                    align: 'left',
                    label: 'Factura proveedor',
                    field: 'providerInvoice',
                    sortable: true,
                },
                {
                    name: 'providerInvoiceDate',
                    align: 'left',
                    label: 'Fecha proveedor',
                    field: 'providerInvoiceDate',
                    sortable: true,
                },
            ],
            packagesData: [],
            workingDeletedId: '',
            usersRegistered: [],
            usersBox: [],
            additionalChargesColumns: [
                {
                    name: 'desc',
                    align: 'left',
                    label: 'Descripcion',
                    field: 'desc',
                },
                {
                    name: 'amount',
                    align: 'left',
                    label: 'Monto',
                    field: 'amount',
                },
            ],
            additionalChargesData: [
                {
                    desc: 'Almacenamiento',
                    amount: 5.75,
                },
                {
                    desc: 'Impuestos de importacion',
                    amount: 6,
                },
            ],
        }
    },
    computed: {
        filteredPackagesData() {
            return this.packagesData.filter(package1 => {
                if (package1.invoice === null) {
                    return package1
                }
            })
        },
        user() {
            return this.$store.getters.user
        },
    },
    methods: {
        updatePackageWithChange(packages) {
            this.displayLoading = true
            this.displayAlert = false
            api.UpdatePackageInformationById({
                id: packages.id,
                package: packages,
            })
                .then(() => {
                    this.displayLoading = false
                    this.alertTitle = 'Exito!'
                    this.alertMessage = 'Se ha cambiado con exito'
                    this.alertType = 'success'
                    this.displayAlert = true
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
        validateBox(input) {
            if (input.includes('YGO')) {
                return input
            }
            return `YGO-${input}`
        },
        deletePackage() {
            this.displayLoading = true
            this.displayAlert = false
            this.displayConfirm = false
            api.DeletePackageOnDatabase({
                id: this.workingDeletedId,
            })
                .then(() => {
                    this.displayLoading = false
                    this.alertTitle = 'Exito!'
                    this.alertMessage = 'Se ha eliminado el paquete con exito'
                    this.alertType = 'success'
                    this.displayAlert = true
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
        askForDeletePackage(id) {
            this.displayConfirm = true
            this.alertTitle = 'Esta seguro?'
            this.alertMessage = 'Se va a proceder a eliminar este paquete'
            this.workingDeletedId = id
        },
        clear() {
            this.form.tracking = ''
            this.form.box = ''
            this.form.weight = ''
            this.form.long = ''
            this.form.height = ''
            this.form.width = ''
        },
        async Generate() {
            this.displayLoading = true
            this.form.by = this.user
            this.form.box = await this.validateBox(this.form.box)
            if (this.usersBox.includes(this.form.box)) {
                api.CreatePackageOnDatabase({package: this.form})
                    .then(response => {
                        this.clear()
                        this.displayLoading = false
                        this.alertTitle = 'Exito!'
                        this.alertMessage = 'Se ha creado el paquete con exito'
                        this.alertType = 'success'
                        this.displayAlert = true
                    })
                    .catch(error => {
                        console.log(error)
                        this.displayLoading = false
                        this.alertTitle = 'Error'
                        this.alertMessage =
                            'Hubo un error por favor vuelve a intentarlo'
                        this.alertType = 'error'
                        this.displayAlert = true
                    })
            } else {
                this.displayLoading = false
                this.alertTitle = 'Error'
                this.alertMessage =
                    'El usuario casillero ingresado no existe en la base de datos por favor revisar'
                this.alertType = 'error'
                this.displayAlert = true
            }
        },
        addToData(id, data) {
            data.id = id
            this.packagesData.push(data)
        },
        editData(id, data) {
            data.id = id
            this.packagesData.forEach((d, index) => {
                if (d.id === id) {
                    this.packagesData.splice(index, 1, data)
                }
            })
        },
        removeData(id) {
            this.packagesData.forEach((d, index) => {
                if (d.id === id) {
                    this.packagesData.splice(index, 1)
                }
            })
        },
        returnDimensions(row) {
            return `${row.long} x ${row.height} x ${row.width}`
        },
        calculateAdditionalCharges() {
            let total = 0
            this.additionalChargesData.forEach(el => {
                total += el.amount
            })
            return total
        },
    },
    mounted() {
        let db = firebase.firestore()
        api.ReturnAllUsers().then(response => {
            this.usersRegistered = response.data.data
            this.usersBox = this.usersRegistered.map(user => {
                return user.box
            })
        })
        db.collection('packages').onSnapshot(
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
    },
}
</script>
