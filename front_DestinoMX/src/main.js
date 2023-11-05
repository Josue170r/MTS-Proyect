import { createApp } from "vue"
import App from "./App.vue"
import router from "./router"
import store from "./store"
import "./assets/css/tailwind.css"
import "./assets/css/styles.css"
import "./assets/css/vuetify.css"
import Vue3Geolocation from "vue3-geolocation"
import { vuetify } from "./plugins/vuetify"
import { toast } from "./plugins/toastifyNotification"

const app = createApp(App)
app
  .use(store)
  .use(router)
  .use(toast)
  .use(Vue3Geolocation)
  .use(vuetify)
  .mount("#app")
