import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './assets/css/tailwind.css'
import './assets/css/styles.css'
import Vue3Geolocation from 'vue3-geolocation'

const app = createApp(App)
app.use(store).use(router).use(Vue3Geolocation).mount('#app')
