import { createRouter, createWebHashHistory } from "vue-router"
import LoginForm from "@/modules/auth/views/LoginForm.vue"
import AddToTrip from "@/components/Viajes/AddToTrip.vue"
import PlaceDescription from "@/components/images/PlaceDescription.vue"
import StartupScreen from "@/modules/auth/views/StartupScreen.vue"
import RegisterForm from "@/modules/auth/views/RegisterForm.vue"
import GoogleMaps from "@/components/Viajes/GoogleMaps.vue"
<<<<<<< HEAD
import PreferencesScreen from "@/components/Viajes/PreferencesScreen.vue"
//import Pree from "@/components/Viajes/Preferences.vue"
=======
import NewTrip from "@/components/Viajes/NewTrip.vue"
import ItinerarioViajes from "@/components/Viajes/ItinerarioViajes.vue"

>>>>>>> e87d9d2a96a4a09bd49cc96e456f22a270fc87d7
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
    path: "/newtrip",
    name: "newtrip",
    component: NewTrip,
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
<<<<<<< HEAD
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
=======
    path: "/calendartrip",
    name: "Itinerario",
    component: ItinerarioViajes,
  },
>>>>>>> e87d9d2a96a4a09bd49cc96e456f22a270fc87d7
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

export default router
