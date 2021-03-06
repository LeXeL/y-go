import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import * as api from '@/api/api'
import LoadingAlert from '@/components/general/LoadingAlert'
import Alert from '@/components/general/Alert'
import Confirm from '@/components/general/Confirm'

import './quasar'
import firebase from 'firebase/app'
import 'firebase/auth'

import * as VueGoogleMaps from 'vue2-google-maps'

Vue.config.productionTip = false

Vue.component('ygo-alert', Alert)
Vue.component('loading-alert', LoadingAlert)
Vue.component('confirm-dialog', Confirm)

const firebaseConfig = {
    apiKey: 'AIzaSyBb7W1hwlBU5YNjiNYwKxocYWL4Wx5v7jY',
    authDomain: 'y-go-9fa3f.firebaseapp.com',
    databaseURL: 'https://y-go-9fa3f.firebaseio.com',
    projectId: 'y-go-9fa3f',
    storageBucket: 'y-go-9fa3f.appspot.com',
    messagingSenderId: '608574804962',
    appId: '1:608574804962:web:f7b51dbf64278d75b95fbb',
    measurementId: 'G-S10T249YXG',
}
Vue.use(VueGoogleMaps, {
    load: {
        key: 'AIzaSyCDzDbwg-PqYOIAMgNE7A70gauYHeOel5A',
        libraries: 'places', // necessary for places input
    },
})
firebase.initializeApp(firebaseConfig)

if (process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'testing') {
    firebase.auth().useEmulator('http://localhost:9099/')
    firebase.firestore().useEmulator('localhost', 8081)
}

firebase.auth().onAuthStateChanged(user => {
    if (user) {
        store.dispatch('setCurrentUser', user)
        api.getUserInformationById({uid: user.uid}).then(response => {
            store.commit('SET_USER', response.data.data)
        })
    }
})

new Vue({
    router,
    store,
    render: function(h) {
        return h(App)
    },
}).$mount('#app')
