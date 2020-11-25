<template>
    <div id="app">
        <router-view />
    </div>
</template>

<script>
import * as api from '@/api/api'
export default {
    computed: {
        uid() {
            return this.$store.getters.uid
        },
        user() {
            return this.$store.getters.user
        },
    },
    mounted() {
        if (this.$store.getters.uid !== '' && this.$store.getters.user === '') {
            api.getUserInformationById({uid: this.uid}).then(response => {
                this.$store.commit('SET_USER', response.data.data)
            })
        }
    },
}
</script>

<style>
</style>
