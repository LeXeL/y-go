<template>
    <q-card class="q-mb-xl">
        <q-card-section>
            <div class="text-h6">Mi Perfil</div>
        </q-card-section>
        <q-card-section>
            <div class="row q-mb-md">
                <div class="col">
                    <q-input filled label="Nombre" class="on-left" />
                </div>
                <div class="col">
                    <q-input filled label="Apellido" class="on-right" />
                </div>
            </div>
            <div class="row q-mb-md">
                <div class="col">
                    <q-input filled readonly label="Correo electronico" />
                </div>
            </div>
            <div class="row q-mb-md">
                <div class="col">
                    <q-select
                        :options="['Basico', 'Cero Volumen']"
                        filled
                        label="Tarifa"
                        bottom-slots
                    >
                        <template v-slot:hint>
                            Ultima actualizacion: 10/09/2020
                        </template>
                    </q-select>
                </div>
            </div>
            <div class="row q-mb-md">
                <div class="col">
                    <q-input type="textarea" filled rows="4" label="Direccion" />
                </div>
            </div>
            <div class="row q-mb-md">
                <div class="col">
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d985.2133507732598!2d-79.53128217078586!3d8.985634324243136!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zOMKwNTknMDguMyJOIDc5wrAzMSc1MC43Ilc!5e0!3m2!1sen!2spa!4v1605273968747!5m2!1sen!2spa"
                        width="100%"
                        height="450"
                        frameborder="0"
                        style="border:0;"
                        allowfullscreen=""
                        aria-hidden="false"
                        tabindex="0"
                    ></iframe>
                </div>
            </div>
        </q-card-section>
        <q-card-actions>
            <q-space />
            <q-btn label="Editar" color="primary" flat />
        </q-card-actions>
    </q-card>
</template>
