<template>
    <q-page-container class="pattern-bg">
        <loading-alert :display="displayLoading"></loading-alert>
        <ygo-alert
            :display="displayAlert"
            :title="alertTitle"
            :message="alertMessage"
            :type="alertType"
            @accept="displayAlert = false"
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
                                    <div class="row" v-for="(pkg, i) in inv.packages" :key="i">
                                        <div class="col">
                                            <div class="text-body">{{ pkg.tracking }}</div>
                                        </div>
                                        <div class="col">
                                            <div class="text-body">{{ pkg.weight }} lb.</div>
                                        </div>
                                        <div class="col">
                                            <div class="text-body">$ {{ pkg.price }}</div>
                                        </div>
                                        <div class="row" v-if="pkg.aditionalCharges">
                                            <br />
                                            <div v-for="(aC, i) in pkg.aditionalCharges" :key="i">
                                                <div class="text-body">{{ aC.chargeName }}</div>
                                                <div class="text-body">$ {{ aC.chargeAmount }}</div>
                                            </div>
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
                                    <q-input
                                        label="Numero de tarjeta"
                                        class="full-width q-mb-md"
                                        filled
                                        v-model="paymentInfo.cardNo"
                                        mask="#### #### #### ####"
                                        fill-mask="#"
                                    />
                                    <div class="row">
                                        <div class="col on-left">
                                            <q-input
                                                label="Fecha de expiracion"
                                                filled
                                                class="full-width"
                                                v-model="paymentInfo.expDate"
                                                mask="##/##"
                                                fill-mask="####"
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
                                    <div class="text-body2">$ {{ totalAmount }}</div>
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
import {ResponseMap} from '@/utils/paymentGatewayResponseMap'
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
            totalAmount: 0.0,
            itbms: 10.51,
            totalAmountToPay: 0,
            displayLoading: false,
            displayAlert: false,
            alertTitle: '',
            alertMessage: '',
            alertType: '',
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
            this.totalAmountToPay = this.totalAmount
            return cart
        },
    },
    methods: {
        //TODO: mandar correos cuando se reciba un pago
        //BUGS: refresh del store, direcciones
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
                        case 'clave':
                            this.test()
                            break
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
            // let paymentCorrect = await this.checkPaymentMethodAvailable()
            // if (!paymentCorrect) {
            //     this.alertTitle = 'Error'
            //     this.alertMessage =
            //         'Lo sentimos, para poder procesar este pago tiene que ser mayor a $12, \n Puedes escojer otro metodo de pago'
            //     this.alertType = 'error'
            //     this.displayLoading = false
            //     this.displayAlert = true
            //     return
            // }

            this.displayLoading = true
            let payload = await this.buildPayloadForVisaOrMasterCard()
            fetch(process.env.VUE_APP_YGO_NMIURL, {
                method: 'POST',
                cache: 'no-cache',
                credentials: 'same-origin',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: new URLSearchParams(payload),
            })
                .then(res => res.text())
                .then(responseData => {
                    let data = responseData.split('&')
                    // console.log(data)
                    let response = data[8].split('=')[1]
                    // console.log(response)
                    if (response === '100') {
                        // console.log('transaccion exitosa')
                        api.payInvoices({
                            invoices: this.cart,
                            paymentMethod: 'VISA',
                            orderId: data[3].split('=')[1],
                        }).then(response => {
                            this.alertMessage = 'Transaccion Existosa'
                            this.alertType = 'success'
                            this.displayLoading = false
                            this.displayAlert = true
                        })
                        return
                    }
                    if (response === '200') {
                        console.log('transaccion declinada')
                        this.alertTitle = 'Error'
                        this.alertMessage =
                            'Lo sentimos no pudimos procesar tu pago, intentalo mas tarde'
                        this.alertType = 'error'
                        this.displayLoading = false
                        this.displayAlert = true
                        return
                    } else {
                        console.log(ResponseMap.get(response))
                        this.alertTitle = 'Error'
                        this.alertMessage = ResponseMap.get(response).translation
                        this.alertType = 'error'
                        this.displayLoading = false
                        this.displayAlert = true
                    }
                })
                .catch(error => console.error(error))
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
            console.log(this.cart)
            reader.onloadend = function () {
                let base64Image = reader.result
                api.payInvoices({
                    invoices: cart,
                    paymentMethod: 'ACH',
                    image: base64Image,
                }).then(response => {
                    console.log(response)
                })
            }
            reader.readAsDataURL(file)
        },
        // test() {
        //     let accessTokenApi = process.env.VUE_APP_YGO_PAGUELOFACILAPI
        //     let cclw = process.env.VUE_APP_YGO_PAGUELOFACILCCLW
        //     console.log(accessTokenApi, cclw)
        //     pfClave.useAsSandbox(true) //en caso de que desee realizar transacciones para pruebas.

        //     pfClave
        //         .openService({
        //             apiKey: accessTokenApi,
        //             cclw: cclw,
        //         })
        //         .then(
        //             function (merchantSetup) {
        //                 let paymentInfo = {
        //                     amount: 15.0, //Monto de la compra
        //                     taxAmount: 0.0, //Monto de los impuestos
        //                     description: 'descripcion personalizada', //Descripción corta del motivo del pago
        //                 }
        //                 let userInfo = {
        //                     email: 'diego.r2892@gmail.com', //Correo electrónico del usuario que realiza la compra
        //                     phone: '+50764806778', //Teléfono movil del usuario que realiza la compra
        //                 }

        //                 let setup = {
        //                     lang: 'es', //Idioma los valores posibles son "es", "en"
        //                     embedded: true, // sí desea que se embebido o muestre un botón.
        //                     container: 'container-form', //Elemento html donde se introducirá el formulario de pago de clave
        //                     onError: function (data) {
        //                         console.error('onError errors', data)
        //                     },
        //                     onTxSuccess: function (data) {
        //                         console.log('onTxSuccess', data)
        //                         window.location.href =
        //                             pfClave.pfHostViews + `/pf/default-receipt/${data?.Oper}`
        //                     },
        //                     onTxError: function (data) {
        //                         console.error('when the onTxError, in other process', data)
        //                     },
        //                     onClose: function () {
        //                         console.log('onClose called')
        //                     },
        //                 }
        //                 merchantSetup.init(merchantSetup.dataMerchant, paymentInfo, setup, userInfo)
        //             },
        //             function (error) {
        //                 console.log(error)
        //             }
        //         )
        // },
        // async payWithClave() {
        //     // this.orderNo = await this.generateOrder()
        //     let payload = await this.buildPayload()
        //     console.log(`payload:${JSON.stringify(payload)}`)
        //     this.loadingRequest = true
        //     fetch(process.env.VUE_APP_YGO_PAGUELOFACILLINK, {
        //         method: 'POST',
        //         mode: 'cors', // no-cors, *cors, same-origin
        //         cache: 'no-cache',
        //         credentials: 'same-origin',
        //         headers: {
        //             authorization: process.env.VUE_APP_YGO_PAGUELOFACILAPI,
        //             'content-type': 'application/json',
        //         },
        //         body: JSON.stringify(payload),
        //     })
        //         .then(response => response.json())
        //         .then(data => {
        //             if (data.success) {
        //                 console.log(data)
        //             }
        //             if (!data.success) {
        //                 console.log(data)
        //                 this.loadingRequest = false
        //                 this.errorPayment = true
        //                 if (data.headerStatus.code === 607)
        //                     this.errMsg = 'La tarjeta de Credito no es valida'
        //                 if (data.headerStatus.code === 605)
        //                     this.errMsg = 'La tarjeta de Credito no es valida'
        //                 if (data.headerStatus.code === 611)
        //                     this.errMsg = 'El numero de telefono no es valido, por favor chekealo!'
        //                 if (data.headerStatus.code === 609)
        //                     this.errMsg =
        //                         'El nombre de la tarjeta tiene un error, por favor chekealo!'
        //                 if (data.headerStatus.code === 551)
        //                     this.errMsg =
        //                         'La informacion suministrada tiene un error, por favor chekeala!'
        //             }
        //         })
        // },

        async buildPayloadForVisaOrMasterCard() {
            let payload = {
                security_key: process.env.VUE_APP_YGO_NMISECURITYKEY,
                amount: this.totalAmountToPay,
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
        mounted() {},
    },
}
</script>
