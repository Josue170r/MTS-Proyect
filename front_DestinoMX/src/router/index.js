import { createRouter, createWebHashHistory } from "vue-router"
import LoginForm from "@/modules/auth/views/LoginForm.vue"
import AddToTrip from "@/components/Viajes/AddToTrip.vue"
import PlaceDescription from "@/components/images/PlaceDescription.vue"
import StartupScreen from "@/modules/auth/views/StartupScreen.vue"
import RegisterForm from "@/modules/auth/views/RegisterForm.vue"
import GoogleMaps from "@/components/Viajes/GoogleMaps.vue"
import PreferencesScreen from "@/components/Viajes/PreferencesScreen.vue"
//import Pree from "@/components/Viajes/Preferences.vue"
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
    path: "/register",
    name: "register-form",
    component: RegisterForm,
  },
  {
    path: "/addtotrip",
    name: "addtotrip",
    component: AddToTrip,
  },
  {
    path: "/placedescription",
    name: "placedescription",
    component: PlaceDescription,
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
  {
    path: "/map",
    name: "mapa-interactivo",
    component: GoogleMaps,
  },
  {
    path: "/preferencesscreen",
    name: "preferences-screen",
    component: PreferencesScreen,
  },
  /*  
  {
    path: "/Preferences",
    name: "Pre-ferences",
    component: Pree,
  },*/
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

export default router
