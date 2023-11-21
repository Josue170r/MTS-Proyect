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
      <router-link :to="{ name: 'startup' }" class="flex items-center"
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
        <h1 class="text-black">Mi perfil</h1></router-link
      >
      <router-link :to="{ name: 'favoritos' }" class="flex items-center"
        ><FavoriteIcon class="mr-2" />
        <h1 class="text-black">Favoritos</h1></router-link
      >
      <router-link :to="{ name: 'Itinerario' }" class="flex items-center"
        ><TravelIcon class="mr-2" />
        <h1 class="text-black">Itinerario de viajes</h1></router-link
      >
      <router-link :to="{ name: 'History' }" class="flex items-center"
        ><ClockIcon class="mr-2" />
        <h1 class="text-black">Historial de viajes</h1></router-link
      >
      <router-link :to="{ name: 'Itinerario' }" class="flex items-center"
        ><supportIcon class="mr-2" />
        <h1 class="text-black">Contactar a soporte</h1></router-link
      >
      <router-link
        :to="{ name: 'Preferences-Screen' }"
        class="flex items-center"
        ><settingsIcon class="mr-2" />
        <h1 class="text-black">Preferencias</h1></router-link
      >
      <router-link :to="{ name: 'startup' }" class="flex items-center"
        ><CloseSesionIcon class="mr-2" />
        <h1 class="text-black">Cerrar Sesión</h1></router-link
      >
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
}
</script>
