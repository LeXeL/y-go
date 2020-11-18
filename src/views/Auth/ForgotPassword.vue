<template>
  <q-page class="bg-primary">
    <q-card class="absolute-center">
      <q-form @submit.prevent.stop="requestForgotPassword()">
      <q-card-section class="text-center">
        <q-img :src="require('@/assets/logo_ygo.png')" width="200px"/>
      </q-card-section>
      <q-card-section>
        <div class="text-h5 text-center text-bold q-mb-md">Has olvidado tu contraseña?</div>
        <div class="text-subtitle2">Ingresa tu correo electronico y te enviaremos un enlace para que puedas restablecer tu contraseña.</div>
      </q-card-section>
      <q-card-section>
          <q-input ref="emailInput" filled label="Correo electronico" placeholder="correo@gmail.com" v-model="emailInput" lazy-rules :rules="[val => !!val || 'Este campo es obligatorio.']"/>
      </q-card-section>
      <q-card-actions>
        <q-space/>
          <q-btn type="submit" color="accent" label="Solicitar cambio" push class="q-mr-sm"/>
      </q-card-actions>
      </q-form>
    </q-card>
  </q-page>
</template>

<script>
export default {
  data() {
    return {
      emailInput: ''
    }
  },
  methods: {
    requestForgotPassword() {
      alert('requested')
    }
  }
}
</script>