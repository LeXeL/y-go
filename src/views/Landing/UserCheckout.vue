<template>
    <q-page-container class="pattern-bg">
        <div class="row">
            <q-space />
            <div class="col-md-7 col-xs-12">
                <div class="row q-pa-md q-mt-xl">
                    <q-card class="full-width">
                        <q-card-section>
                            <div class="row">
                                <div class="text-h6 text-accent text-bold">Checkout</div>
                                <q-space />
                                <q-btn
                                    label="Volver al inicio"
                                    color="primary"
                                    class="text-bold"
                                    flat
                                    rounded
                                    to="/user"
                                    size="sm"
                                    icon="fas fa-home"
                                />
                            </div>
                        </q-card-section>
                    </q-card>
                </div>

                <div class="row">
                    <div class="col-md-8 col-xs-12 q-pa-md">
                        <q-card class="q-mb-md">
                            <q-card-section>
                                <div class="row">
                                    <div class="text-h6">Facturas a cancelar</div>
                                    <q-space />
                                    <q-btn
                                        label="Ver"
                                        flat
                                        rounded
                                        color="primary"
                                        size="sm"
                                        v-if="step > 0"
                                        @click="step = 0"
                                    />
                                </div>
                            </q-card-section>
                            <q-separator />
                            <q-card-section v-if="step == 0">
                                <div class="q-mb-sm" v-for="(inv, i) in 2" :key="i">
                                    <div class="text-body2 text-bold q-mb-sm full-width">
                                        <span class="text-accent">Factura No. 4456</span> - $ 23.67
                                    </div>
                                    <div class="row" v-for="(pkg, i) in 3" :key="i">
                                        <div class="col">
                                            <div class="text-body">TBD4293879234</div>
                                        </div>
                                        <div class="col">
                                            <div class="text-body">5 lb.</div>
                                        </div>
                                        <div class="col">
                                            <div class="text-body">$ 3.00</div>
                                        </div>
                                    </div>
                                </div>
                            </q-card-section>
                            <q-separator />
                            <q-card-actions v-if="step == 0">
                                <q-space />
                                <q-btn
                                    label="Continuar"
                                    color="accent"
                                    class="text-bold"
                                    push
                                    @click="advanceStep()"
                                />
                            </q-card-actions>
                        </q-card>
                        <q-card class="q-mb-md">
                            <q-card-section>
                                <div class="row">
                                    <div class="text-h6">Entrega</div>
                                    <q-space />
                                    <q-btn
                                        label="Editar"
                                        flat
                                        rounded
                                        color="primary"
                                        size="sm"
                                        v-if="step > 1"
                                        @click="step = 1"
                                    />
                                </div>
                            </q-card-section>
                            <q-separator />
                            <q-card-section v-if="step == 1">
                                <q-option-group
                                    :options="options"
                                    label="Notifications"
                                    type="radio"
                                    v-model="group"
                                />
                            </q-card-section>
                            <q-separator />
                            <q-card-actions v-if="step == 1">
                                <q-space />
                                <q-btn
                                    label="Continuar"
                                    color="accent"
                                    class="text-bold"
                                    push
                                    @click="advanceStep()"
                                />
                            </q-card-actions>
                        </q-card>
                        <q-card>
                            <q-card-section>
                                <div class="text-h6">Pago</div>
                            </q-card-section>
                            <q-separator />
                            <q-card-section v-if="step == 2">
                                <q-select
                                    label="Metodo de pago"
                                    filled
                                    class="full-width q-mb-md"
                                    :options="paymentMethod"
                                    v-model="paymentInfo.method"
                                    map-options
                                    emit-value
                                />
                                <template v-if="paymentInfo.method && paymentInfo.method != 'ach'">
                                    <div class="row q-mb-md">
                                        <div class="col on-left">
                                            <q-input
                                                label="Nombre"
                                                filled
                                                class="full-width"
                                                v-model="paymentInfo.name"
                                            />
                                        </div>
                                        <div class="col">
                                            <q-input
                                                label="Apellido"
                                                filled
                                                class="full-width"
                                                v-model="paymentInfo.lastName"
                                            />
                                        </div>
                                    </div>
                                    <q-input
                                        label="Numero de tarjeta"
                                        class="full-width q-mb-md"
                                        filled
                                        v-model="paymentInfo.cardNo"
                                    />
                                    <div class="row">
                                        <div class="col on-left">
                                            <q-input
                                                label="Fecha de expiracion"
                                                filled
                                                class="full-width"
                                                v-model="paymentInfo.expDate"
                                            />
                                        </div>
                                        <div class="col">
                                            <q-input
                                                label="Codigo de seguridad"
                                                filled
                                                class="full-width"
                                                v-model="paymentInfo.code"
                                            />
                                        </div>
                                        <div
                                            class="col on-right"
                                            v-if="paymentInfo.method == 'clave'"
                                        >
                                            <q-input
                                                label="PIN"
                                                filled
                                                class="full-width"
                                                v-model="paymentInfo.pin"
                                            />
                                        </div>
                                    </div>
                                </template>
                                <template v-if="paymentInfo.method == 'ach'">
                                    <q-file outlined v-model="paymentInfo.proofOfPayment">
                                        <template v-slot:prepend>
                                            <q-icon name="fas fa-paperclip" />
                                        </template>
                                    </q-file>
                                </template>
                            </q-card-section>
                            <q-separator />
                            <q-card-actions v-if="step == 2">
                                <q-space />
                                <q-btn
                                    label="Confirmar pago"
                                    color="accent"
                                    class="text-bold"
                                    push
                                    @click="advanceStep()"
                                />
                            </q-card-actions>
                        </q-card>
                    </div>
                    <div class="col-md-4 col-xs-12 q-pa-md">
                        <q-card>
                            <q-card-section>
                                <div class="text-h6">Monto a pagar</div>
                            </q-card-section>
                            <q-separator />
                            <q-card-section>
                                <div class="row q-mb-sm">
                                    <div class="text-body2">Facturas a pagar: (3)</div>
                                    <q-space />
                                    <div class="text-body2">$ 34.56</div>
                                </div>
                                <div class="row q-mb-sm">
                                    <div class="text-body2">Delivery</div>
                                    <q-space />
                                    <div class="text-body2">$ 5.00</div>
                                </div>
                                <div class="row">
                                    <div class="text-body2">ITBMS:</div>
                                    <q-space />
                                    <div class="text-body2">$ 5.67</div>
                                </div>
                            </q-card-section>
                            <q-separator />
                            <q-card-section>
                                <div class="row">
                                    <div class="text-body2">TOTAL:</div>
                                    <q-space />
                                    <div class="text-body2 text-bold">$ 35.98</div>
                                </div>
                            </q-card-section>
                        </q-card>
                    </div>
                </div>
            </div>
            <q-space />
        </div>
    </q-page-container>
</template>

<script>
export default {
    data() {
        return {
            step: 0,
            group: null,
            options: [
                {label: 'Recoger en local', value: 'pickup'},
                {label: 'Delivery - Direccion de entrega 1', value: 'delivery_1'},
                {label: 'Delivery - Direccion de entrega 2', value: 'delivery_2'},
            ],
            paymentMethod: [
                {
                    label: 'Visa',
                    value: 'visa',
                },
                {
                    label: 'MasterCard',
                    value: 'mastercard',
                },
                {
                    label: 'Clave',
                    value: 'clave',
                },
                {
                    label: 'Yappy / Transferencia / ACH',
                    value: 'ach',
                },
            ],
            paymentInfo: {
                method: '',
                name: '',
                lastName: '',
                cardNo: '',
                expDate: '',
                code: '',
                pin: '',
                proofOfPayment: null,
            },
        }
    },
    methods: {
        advanceStep() {
            this.step++
        },
    },
}
</script>
