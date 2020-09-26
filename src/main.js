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
firebase.initializeApp(firebaseConfig)

// firebase.auth().onAuthStateChanged(user => {
//     // store.dispatch('fetchUser', user)
//     if (user && store.getters.user === '') {
//         store.dispatch('setCurrentUser', user)
//         api.getUserInformationById({uid: user.uid}).then(response => {
//             store.commit('SET_USER', response.data.data)
//         })
//     }
// })

new Vue({
    router,
    store,
    render: h => h(App),
}).$mount('#app')
