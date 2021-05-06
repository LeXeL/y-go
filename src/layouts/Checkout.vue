<template>
    <q-layout class="y-go-font">
        <Navbar />
        <router-view />
    </q-layout>
</template>

<script>
import Navbar from '@/components/general/Navbar'

export default {
    components: {
        Navbar,
    },
}
</script>