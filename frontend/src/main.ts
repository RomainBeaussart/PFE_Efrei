import Vue from 'vue';
import VueApollo from 'vue-apollo'

import VueUploadComponent from 'vue-upload-component'

import vuetify from './plugins/vuetify'
import App from './App.vue';
import router from './router';
import store from './store/store';

import { createProvider } from './vue-apollo'
import VideoBg from './components/VideoBackground.vue'
import VueSelectImage from 'vue-select-image'
import { Hooper, Slide, Navigation } from 'hooper';

//
// end register
//
Vue.config.productionTip = false;

// const datepickerOptions = {
// }

Vue.use(VueApollo)
Vue.use(VueSelectImage)
Vue.component('file-upload', VueUploadComponent)
Vue.component('video-bg', VideoBg)
Vue.component('hooper', Hooper)
Vue.component('slide', Slide)
Vue.component('hooper-navigation', Navigation)

require('vue-select-image/dist/vue-select-image.css')

new Vue({
    router,
    store,

    vuetify,
    // @ts-ignore

    apolloProvider: createProvider(),
    render: h => h(App)
} as any).$mount('#app');
