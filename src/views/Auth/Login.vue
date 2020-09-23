<template>
  <q-page class="bg-primary">
    <div class="absolute-center">
      <q-card style="width: 400px;" class="q-pa-md rounded-borders">
        <q-card-section>
          <q-img :src="require('@/assets/logo_ygo.png')" class="q-mb-md" />
          <q-input filled label="Correo electronico" class="full-width q-mb-md" type="text" />
          <q-input filled label="Contraseña" class="full-width q-mb-md" type="password" />
          <q-btn color="warning" label="Iniciar sesion" class="q-mb-md full-width" />
          <div class="text-body2">
            ¿Olvidaste tu contraseña? Haz click
            <router-link to="/">aqui</router-link>.
          </div>
        </q-card-section>
      </q-card>
    </div>
  </q-page>
</template>