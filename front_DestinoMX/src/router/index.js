import { createRouter, createWebHashHistory } from "vue-router"
import LoginForm from "@/modules/auth/views/LoginForm.vue"
import AddToTrip from "@/components/Viajes/AddToTrip.vue"
import PlaceDescription from "@/components/images/PlaceDescription.vue"
import StartupScreen from "@/modules/auth/views/StartupScreen.vue"
import RegisterForm from "@/modules/auth/views/RegisterForm.vue"
import GoogleMaps from "@/components/Viajes/GoogleMaps.vue"
import homeScreen from "@/modules/user/loged/homeScreen.vue"
import NewTrip from "@/components/Viajes/NewTrip.vue"
import ItinerarioViajes from "@/components/Viajes/ItinerarioViajes.vue"
import PreferencesScreen from "@/modules/user/PreferencesScreen.vue"
import NotFoundPage from "@/screens/NotFoundPage"
import EditTripScreen from "@/components/Viajes/EditViewTrip.vue"
import AboutUs from "@/components/Viajes/AboutUs.vue"
import Favoritos from "@/modules/user/Favoritos.vue"
import HistoryScreenVue from "@/components/Viajes/HistoryScreen.vue"
import rePasword from "@/modules/auth/views/rePasword.vue"
import newPassword from "@/modules/auth/views/newPassword"

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
    path: "/forgot-password",
    name: "about",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(
        /* webpackChunkName: "about" */ "@/modules/user/screens/ForgotPassword.vue"
      ),
  },
  {
    path: "/user/profile",
    name: "user-profile",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(
        /* webpackChunkName: "about" */ "@/modules/user/loged/UserProfile.vue"
      ),
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
    path: "/favoritos",
    name: "favoritos",
    component: Favoritos,
  },
  {
    path: "/History",
    name: "History",
    component: HistoryScreenVue,
  },
  {
    path: "/aboutus",
    name: "aboutus",
    component: AboutUs,
  },
  {
    path: "/rePasword",
    name: "rePasword",
    component: rePasword,
  },
  {
    path: "/newPassword",
    name: "newPassword",
    component: newPassword,
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

export default router
