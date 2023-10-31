import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./assets/css/tailwind.css";
import "./assets/css/styles.css";
import "vuesax/dist/vuesax.css"; // Estilos de Vuesax
// import { ValidationProvider, ValidationObserver } from "vee-validate";

const app = createApp(App);

app
  .use(store)
  .use(router)
  // .component("ValidationObserver", ValidationObserver)
  // .component("ValidationProvider", ValidationProvider)
  .mount("#app");
