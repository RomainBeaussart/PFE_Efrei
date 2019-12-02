import 'material-design-icons-iconfont/dist/material-design-icons.css'
import '@fortawesome/fontawesome-free/css/all.css'
import Vue from 'vue'
import Vuetify from 'vuetify/lib'
import fr from 'vuetify/src/locale/fr'

Vue.use(Vuetify);

export default new Vuetify({
    icons: {
        iconfont: 'fa',
    },
    lang: {
        locales: { fr },
        current: 'fr'
    },
    theme: {
        themes: {
            light: {
                primary: '#222222',
                secondary: '#ecf0f1',
                red: '#e74c3c',
                yellow: '#f1c40f',
                blue: '#2980b9',
                green: '#2ecc71',
                white: '#ffffff'
            }
        }
    }
});
