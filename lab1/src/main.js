import './assets/tailwind.css'

import {createApp} from 'vue'
import App from "./App.vue"
import {VueReCaptcha} from 'vue-recaptcha-v3'

createApp(App)
    .use(VueReCaptcha, { siteKey: import.meta.env.VITE_RECAPTCHA_SITE_KEY })
    .mount('#app')