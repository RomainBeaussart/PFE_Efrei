import 'material-design-icons-iconfont/dist/material-design-icons.css'
import Vue from 'vue'
import Vuetify from 'vuetify/lib'
import fr from 'vuetify/src/locale/fr'

Vue.use(Vuetify);

export default new Vuetify({
    icons: {
        iconfont: 'md',
    },
    lang: {
        locales: { fr },
        current: 'fr'
    },
    theme: {
        themes: {
            light: {
                primary: '#1c233f',
                secondary: '#6DC0BD',
                accent: '#8c9eff',
                error: '#F44336',
                blue_custom: '#1c233f',
                yellow_custom: '#fad282',
                green_custom: '#6DC0BD',
                dark_grey: "#EDEDED"
            }
        }
    }
});
