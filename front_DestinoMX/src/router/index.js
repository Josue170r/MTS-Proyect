import { createRouter, createWebHashHistory } from "vue-router"
import LoginForm from "@/modules/auth/views/LoginForm.vue"
import AddToTrip from "@/components/Viajes/AddToTrip.vue"
import PlaceDescription from "@/components/images/PlaceDescription.vue"
import StartupScreen from "@/modules/auth/views/StartupScreen.vue"
import RegisterForm from "@/modules/auth/views/RegisterForm.vue"
import GoogleMaps from "@/components/Viajes/GoogleMaps.vue"
import homeScreen from "@/modules/auth/views/homeScreen.vue"
import NewTrip from "@/components/Viajes/NewTrip.vue"
import ItinerarioViajes from "@/components/Viajes/ItinerarioViajes.vue"
import PreferencesScreen from "@/modules/user/PreferencesScreen.vue"
//import SearchTrip from "@/components/Viajes/SearchTrip.vue"
import NotFoundPage from "@/screens/NotFoundPage"
import EditTripScreen from "@/components/Viajes/EditTripScreen.vue"
import MyTrip from "@/components/Viajes/MyTrip.vue"

const routes = [
  {
    path: "/",
    name: "startup",
    component: StartupScreen,
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
    path: "/newtrip",
    name: "newtrip",
    component: NewTrip,
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
    path: "/calendartrip",
    name: "Itinerario",
    component: ItinerarioViajes,
  },
  {
    path: "/home",
    name: "home",
    component: homeScreen,
  },
  {
    path: "/preferences",
    name: "Preferences-Screen",
    component: PreferencesScreen,
  },
  {
    name: "Search-Trip",
    name: "NoPageFound",
    path: "/:pathMatch(.*)*",
    component: NotFoundPage,
  },
  {
    path: "/editTrip",
    name: "EditTrip",
    component: EditTripScreen,
  },
  {
    path: "/mytrip",
    name: "mytrip",
    component: MyTrip,
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

export default router
