import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./assets/css/tailwind.css";
import "./assets/css/styles.css";
// import "./plugins/vuesax";
import vuetify from "./plugins/vuetify";

createApp(App).use(store).use(vuetify).use(router).mount("#app");
