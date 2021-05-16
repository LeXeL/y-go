<template>
    <q-page style="min-height: auto !important">
        <div class="row bg-primary">
            <q-space />
            <div class="col-lg-7 col-xs-12 q-pa-lg text-center">
                <div class="text-h4 text-white text-bold">CONTÁCTANOS</div>
            </div>
            <q-space />
        </div>
        <div class="row bg-cyan-2 q-py-xl q-px-md">
            <q-space />
            <div class="col-lg-7 col-md-7 col-xs-11">
                <q-form>
                    <q-card>
                        <q-card-section>
                            <div class="text-h5">Llena el formulario:</div>
                        </q-card-section>
                        <q-separator />
                        <q-card-section>
                            <q-input
                                label="Nombre"
                                color="accent"
                                class="full-width q-mb-sm"
                                filled
                                :rules="[val => !!val || 'Este campo es requerido']"
                                v-model="form.name"
                            />
                            <q-input
                                label="Apellido"
                                color="accent"
                                class="full-width q-mb-sm"
                                filled
                                :rules="[val => !!val || 'Este campo es requerido']"
                                v-model="form.lastName"
                            />
                            <q-input
                                label="Correo electrónico"
                                color="accent"
                                class="full-width q-mb-sm"
                                filled
                                :rules="[val => validEmail.test(val) || 'Ingrese un correo valido']"
                                v-model="form.email"
                            />
                            <q-input
                                label="Mensaje"
                                color="accent"
                                type="textarea"
                                rows="5"
                                class="full-width"
                                filled
                                :rules="[val => !!val || 'Este campo es requerido']"
                                v-model="form.message"
                            />
                        </q-card-section>
                        <q-card-actions align="right">
                            <q-btn
                                label="Enviar"
                                class="text-bold q-px-md"
                                push
                                color="accent"
                                type="submit"
                            />
                        </q-card-actions>
                    </q-card>
                </q-form>
            </div>
            <q-space />
        </div>
    </q-page>
</template>

<script>
export default {
    data() {
        return {
            form: {
                name: '',
                lastName: '',
                email: '',
                message: '',
            },
            validEmail: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        }
    },
    mounted() {
        window.scrollTo(0, 0)
    },
}
</script>
