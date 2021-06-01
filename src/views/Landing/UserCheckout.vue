<template>
    <q-page-container class="pattern-bg">
        <loading-alert :display="displayLoading"></loading-alert>
        <ygo-alert
            :display="displayAlert"
            :title="alertTitle"
            :message="alertMessage"
            :type="alertType"
            @accept="displayAlert = false"
            :redirect="redirect"
        ></ygo-alert>
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
                <!-- <div align="center">
                    <div id="container-form" style="width: 100%; height: 800px"></div>
                </div> -->
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
                                        class="text-bold"
                                        color="primary"
                                        v-if="step > 0"
                                        @click="step = 0"
                                    />
                                </div>
                            </q-card-section>
                            <q-separator />
                            <q-card-section v-if="step == 0">
                                <div class="q-mb-sm" v-for="(inv, i) in cart" :key="i">
                                    <div class="text-body2 text-bold q-mb-sm full-width">
                                        <span class="text-accent">Factura No. {{ inv.No }}</span> -
                                        $ {{ inv.price }}
                                    </div>
                                    <div v-for="(pkg, i) in inv.packages" :key="i">
                                        <div class="row">
                                            <div class="col">
                                                <div class="text-body">{{ pkg.tracking }}</div>
                                            </div>
                                            <div class="col">
                                                <div class="text-body">{{ pkg.weight }} lb.</div>
                                            </div>
                                            <div class="col">
                                                <div class="text-body">$ {{ pkg.price }}</div>
                                            </div>
                                        </div>
                                        <div class="text-subtitle2 text-bold">
                                            Cargos adicionales
                                        </div>
                                        <template v-if="pkg.aditionalCharges">
                                            <div
                                                class="row"
                                                v-for="(aC, i) in pkg.aditionalCharges"
                                                :key="i"
                                            >
                                                <div class="col-8">
                                                    <div class="text-body">{{ aC.chargeName }}</div>
                                                </div>
                                                <div class="col-2">
                                                    <div class="text-body">
                                                        $ {{ aC.chargeAmount.toFixed(2) }}
                                                    </div>
                                                </div>
                                            </div>
                                        </template>
                                        <q-separator
                                            class="q-my-md"
                                            v-if="i < inv.packages.length - 1"
                                        />
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
                                        class="text-bold"
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

                                    <!-- <form @submit.prevent="payWithVisaorMasterCard($event)">
                                        <div>
                                            <input
                                                type="text"
                                                name="firstName"
                                                placeholder="First
                                            Name"
                                                id="first_name"
                                            />
                                        </div>
                                        <div>
                                            <input
                                                type="text"
                                                name="lastName"
                                                placeholder="Last
                                            Name"
                                                id="last_name"
                                            />
                                        </div>
                                        <div>
                                            <input type="text" name="amount" placeholder="Amount" />
                                        </div>
                                        <div id="ccnumber" />
                                        <div id="ccexp" />
                                        <div id="cvv" />
                                        <button type="submit">Submit</button>
                                    </form> -->
                                    <q-input
                                        label="Numero de tarjeta"
                                        class="full-width q-mb-md"
                                        filled
                                        v-model="paymentInfo.cardNo"
                                        mask="#### #### #### ####"
                                        fill-mask="#"
                                    />
                                    <div class="row">
                                        <div class="col on-left" id="ccexp">
                                            <q-input
                                                label="Fecha de expiracion"
                                                filled
                                                class="full-width"
                                                v-model="paymentInfo.expDate"
                                                mask="##/##"
                                                fill-mask="####"
                                            />
                                        </div>
                                        <div class="col" id="cvv">
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
                                    <q-file
                                        outlined
                                        v-model="paymentInfo.proofOfPayment"
                                        label="Comprobante de pago"
                                    >
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
                                    <div class="text-body2">
                                        Facturas a pagar: ({{ totalItemsToPay }})
                                    </div>
                                    <q-space />
                                    <div class="text-body2">$ {{ totalAmount.toFixed(2) }}</div>
                                </div>
                                <!-- <div class="row q-mb-sm">
                                    <div class="text-body2">Delivery</div>
                                    <q-space />
                                    <div class="text-body2">$ 5.00</div>
                                </div>
                                <div class="row">
                                    <div class="text-body2">ITBMS:</div>
                                    <q-space />
                                    <div class="text-body2">$ {{ itbms }}</div>
                                </div> -->
                            </q-card-section>
                            <q-separator />
                            <q-card-section>
                                <div class="row">
                                    <div class="text-body2">TOTAL:</div>
                                    <q-space />
                                    <div class="text-body2 text-bold">$ {{ totalAmountToPay }}</div>
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
import * as api from '@/api/api'
export default {
    data() {
        return {
            step: 0,
            group: null,
            options: [{label: 'Recoger en local', value: 'pickup'}],
            paymentMethod: [],
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
            totalItemsToPay: 0,
            totalAmount: 0,
            itbms: 10.51,
            totalAmountToPay: 0,
            displayLoading: false,
            displayAlert: false,
            alertTitle: '',
            alertMessage: '',
            alertType: '',
            redirect: '',
        }
    },
    computed: {
        user() {
            const user = this.$store.getters.user
            if (!user.hasOwnProperty('businessAproved')) {
                this.options.push({label: `Delivery - ${user.address}`, value: 'delivery_1'})
                if (user.address2)
                    this.options.push({label: `Delivery - ${user.address2}`, value: 'delivery_2'})
            }
            return user
        },
        cart() {
            const cart = this.$store.getters.cart
            this.totalItemsToPay = cart.length
            cart.forEach(inv => {
                this.totalAmount += parseFloat(inv.price)
            })
            this.totalAmountToPay = this.totalAmount.toFixed(2)
            return cart
        },
    },

    methods: {
        //BUG: refresh del store, direcciones
        collectJSConfigurator(event) {
            if (event === 'visa' || event === 'mastercard') {
                window.CollectJS.configure({
                    variant: 'inline',
                    styleSniffer: true,
                    callback: token => {
                        console.log(token)
                    },
                    fields: {
                        ccnumber: {
                            placeholder: 'CC Number',
                            selector: '#ccnumber',
                        },
                        ccexp: {
                            placeholder: 'CC Expiration',
                            selector: '#ccexp',
                        },
                        cvv: {
                            placeholder: 'CVV',
                            selector: '#cvv',
                        },
                    },
                    price: '21.00',
                    currency: 'USD',
                    country: 'US',
                    validationCallback: function (field, status, message) {
                        if (status) {
                            var message = field + ' is now OK: ' + message
                        } else {
                            var message = field + ' is now Invalid: ' + message
                        }
                        console.log(message)
                    },
                })
            }
        },
        advanceStep() {
            switch (this.step) {
                case 0:
                    this.step++
                    break
                case 1:
                    if (!!this.group) {
                        this.checkPaymentMethodAvailable()
                        this.step++
                    }
                    break
                case 2:
                    switch (this.paymentInfo.method) {
                        case 'ach':
                            this.uploadPayment()
                            break
                        case 'visa':
                            this.payWithVisaorMasterCard()
                            break
                        case 'mastercard':
                            this.payWithVisaorMasterCard()
                            break
                    }
                    break
            }
        },
        async checkPaymentMethodAvailable() {
            if (this.cart) {
                this.paymentMethod.push({
                    label: 'Yappy / Transferencia / ACH',
                    value: 'ach',
                })
                if (parseFloat(this.totalAmountToPay) > 12.5) {
                    this.paymentMethod.push(
                        {
                            label: 'Visa',
                            value: 'visa',
                        },
                        {
                            label: 'MasterCard',
                            value: 'mastercard',
                        }
                    )
                }
            }
            // if (this.paymentInfo.method === 'visa' || this.paymentInfo.method === 'mastercard') {
            //     if (parseFloat(this.totalAmount) > 1.0) return true
            //     return false
            // }
        },
        async payWithVisaorMasterCard() {
            this.displayLoading = true
            let payload = await this.buildPayloadForVisaOrMasterCard()
            api.payInvoices({
                invoices: this.cart,
                paymentMethod: 'VISA',
                payload: payload,
            }).then(response => {
                console.log(response)
                if (response.data.data.responseStatus === '100') {
                    this.alertMessage = 'Transaccion Existosa'
                    this.alertType = 'success'
                    this.displayLoading = false
                    this.displayAlert = true
                    this.redirect = '/user'
                    return
                }
                if (response.data.data.responseStatus === '200') {
                    this.alertTitle = 'Error'
                    this.alertMessage =
                        'Lo sentimos no pudimos procesar tu pago, intentalo mas tarde'
                    this.alertType = 'error'
                    this.displayLoading = false
                    this.displayAlert = true
                    return
                } else {
                    this.alertTitle = 'Error'
                    this.alertMessage = response.data.data.responseTranslation
                    this.alertType = 'error'
                    this.displayLoading = false
                    this.displayAlert = true
                }
            })
            // console.log(window.CollectJS)
            // try {
            //     await window.CollectJS.startPaymentRequest()
            // } catch (error) {
            //     console.log(error)
            // }
        },
        async uploadPayment() {
            if (!this.paymentInfo.proofOfPayment) {
                this.alertTitle = 'Error'
                this.alertMessage = 'Se necesita subir el comprobante de pago!'
                this.alertType = 'error'
                this.displayAlert = true
                return
            }
            let cart = this.cart
            let file = this.paymentInfo.proofOfPayment
            let reader = new FileReader()
            reader.onloadend = function () {
                let base64Image = reader.result
                api.payInvoices({
                    invoices: cart,
                    paymentMethod: 'ACH',
                    image: base64Image.replace('data:image/jpeg;base64,', ''),
                }).then(response => {
                    console.log(response)
                })
            }
            reader.readAsDataURL(file)
        },

        async buildPayloadForVisaOrMasterCard() {
            let payload = {
                amount: parseFloat(this.totalAmountToPay) + 8.0,
                type: 'sale',
                description: `${this.user.box} payment`,
                ccnumber: this.paymentInfo.cardNo.replaceAll(' ', ''),
                ccexp: this.paymentInfo.expDate.replaceAll('/', ''),
                cvv: this.paymentInfo.code,
                first_name: this.paymentInfo.name,
                last_name: this.paymentInfo.lastName,
                address1: this.user.address || '',
                city: 'Panama',
                state: 'PA',
                zip: '12345',
            }
            return payload
        },
    },
}
</script>
