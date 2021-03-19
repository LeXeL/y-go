<template>
    <q-layout class="y-go-font">
        <loading-alert :display="displayLoading"></loading-alert>
        <ygo-alert
            :display="displayAlert"
            :title="alertTitle"
            :message="alertMessage"
            :type="alertType"
            @accept="displayAlert = false"
        ></ygo-alert>
        <Navbar />
        <router-view />
    </q-layout>
</template>

<script>
import Navbar from '@/components/general/Navbar'

export default {
    data() {
        return {
            displayLoading: false,
            displayAlert: false,
            alertTitle: '',
            alertMessage: '',
            alertType: '',
        }
    },
    components: {
        Navbar,
    },
}
</script>