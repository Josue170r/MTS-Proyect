import { createRouter, createWebHashHistory } from "vue-router";
import LoginForm from "@/modules/auth/views/LoginForm.vue";
import StartupScreen from "@/modules/auth/views/StartupScreen.vue";
import RegisterForm from "@/modules/auth/views/RegisterForm.vue";
import VisualizarRuta from "@/modules/auth/views/VisualizarRuta.vue";

const routes = [
  {
    path: "/", // Cambia la ruta principal a "/startup" o cualquier otra que desees
    name: "startup",
    component: StartupScreen, // Asocia la ruta principal al componente StartupScreen
  },
  {
    path: "/login",
    name: "login",
    component: LoginForm,
  },
  {
    path: "/Ruta",
    name: "VisualizarRuta",
    component: VisualizarRuta,
  },
  {
    path: "/register",
    name: "register-form",
    component: RegisterForm,
  },
  {
    path: "/about",
    name: "about",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/AboutView.vue"),
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
