import Vue from 'vue';
import VueApollo from 'vue-apollo'

import VueUploadComponent from 'vue-upload-component'
// import AirbnbStyleDatepicker from 'vue-airbnb-style-datepicker'
// import '../src/assets/style/vue-airbnb-style-datepicker.css'

import vuetify from './plugins/vuetify'
import App from './App.vue';
import router from './router';
import store from './store/store';

import { createProvider } from './vue-apollo'

//
// end register
//
Vue.config.productionTip = false;

// const datepickerOptions = {
// }

Vue.use(VueApollo)
// Vue.use(AirbnbStyleDatepicker, datepickerOptions)
Vue.component('file-upload', VueUploadComponent)

new Vue({
    router,
    store,

    vuetify,
    // @ts-ignore
    // AirbnbStyleDatepicker,

    apolloProvider: createProvider(),
    render: h => h(App)
} as any).$mount('#app');
