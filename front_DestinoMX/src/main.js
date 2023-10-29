import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./assets/css/tailwind.css";
import "./assets/css/styles.css";
// import "./plugins/vuesax";

createApp(App).use(store).use(router).mount("#app");
