<template>
    <q-page>
        <div class="row q-py-lg">
            <div class="col desktop-only"></div>
            <div class="col-lg-9">
                <div class="text-h6 q-mb-md">Register here</div>
                <div class="row">
                    <q-input filled label="Nombre" class="full-width q-mb-md" />
                    <q-input
                        filled
                        label="Apellido"
                        class="full-width q-mb-md"
                    />
                    <q-input filled label="Correo" class="full-width q-mb-md" />
                    <q-input
                        filled
                        label="Contraseña"
                        type="password"
                        class="full-width q-mb-md"
                    />
                    <q-input
                        filled
                        label="Repetir contraseña"
                        type="password"
                        class="full-width q-mb-md"
                    />
                    <q-btn label="registrar" color="primary" />
                </div>
            </div>
            <div class="col desktop-only"></div>
        </div>
    </q-page>
</template>
