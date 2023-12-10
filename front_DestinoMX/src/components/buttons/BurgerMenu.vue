<template>
  <div class="bg-white round-lg">
    <BurgerButton />
    <Slide>
      <div class="justify-center items-center">
        <img
          src="@/assets/images/DestinoMX.png"
          alt="logo"
          class="mx-auto sm:-mt-4 pl-4"
        />
      </div>
      <router-link :to="{ name: 'home' }" class="flex items-center"
        ><svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="w-6 h-6 mr-2 text-blue-500"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
          />
        </svg>

        <h1>Inicio</h1></router-link
      >
      <router-link :to="{ name: 'user-profile' }" class="flex items-center"
        ><svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="w-6 h-6 text-purple-900 mr-2"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
          />
        </svg>
        <h1>Mi perfil</h1></router-link
      >
      <router-link :to="{ name: 'favoritos' }" class="flex items-center"
        ><FavoriteIcon class="mr-2" />
        <h1>Favoritos</h1></router-link
      >
      <router-link :to="{ name: 'Itinerario' }" class="flex items-center"
        ><TravelIcon class="mr-2" />
        <h1>Itinerario de viajes</h1></router-link
      >
      <router-link :to="{ name: 'History' }" class="flex items-center"
        ><ClockIcon class="mr-2" />
        <h1>Historial</h1></router-link
      >
      <router-link :to="{ name: 'aboutus' }" class="flex items-center"
        ><supportIcon class="mr-2" />
        <h1>Contactar a soporte</h1></router-link
      >
      <router-link
        :to="{ name: 'Preferences-Screen' }"
        class="flex items-center"
        ><settingsIcon class="mr-2" />
        <h1>Preferencias</h1></router-link
      >
      <button @click="CloseSesion" class="flex items-center">
        <CloseSesionIcon class="mr-2" />
        <h1 class="text-black">Cerrar Sesión</h1>
      </button>
    </Slide>
  </div>
</template>

<script>
import { Slide, BurgerButton } from "vue3-burger-menu"
import FavoriteIcon from "@/components/icons/FavoriteIcon.vue"
import TravelIcon from "@/components/icons/TravelIcon.vue"
import ClockIcon from "@/components/icons/ClockIcon.vue"
import supportIcon from "@/components/icons/supportIcon.vue"
import settingsIcon from "@/components/icons/settingsIcon.vue"
import CloseSesionIcon from "@/components/icons/CloseSesionIcon.vue"
import { apiFromBackend } from "@/helpers/ApiFromBackend"

export default {
  name: "BurgerMenu",
  components: {
    Slide,
    BurgerButton,
    FavoriteIcon,
    TravelIcon,
    ClockIcon,
    supportIcon,
    settingsIcon,
    CloseSesionIcon,
  },
  methods: {
    async CloseSesion() {
      try {
        const response = await apiFromBackend.get("/api/cerrar-sesion", {})
        console.log(response)
        this.$router.push({
          name: "startup",
        })
      } catch (error) {
        console.log(error)
      }
    },
  },
}
</script>

<style scoped>
a {
  color: black;
}
.router-link-exact-active {
  color: #3498db;
}
</style>
