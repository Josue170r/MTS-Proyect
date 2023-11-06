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
        ><UserIcon class="mr-2" />
        <h1 class="text-black">Mi perfil</h1></router-link
      >
      <router-link :to="{ name: 'startup' }" class="flex items-center"
        ><FavoriteIcon class="mr-2" />
        <h1 class="text-black">Favoritos</h1></router-link
      >
      <router-link :to="{ name: 'Itinerario' }" class="flex items-center"
        ><TravelIcon class="mr-2" />
        <h1 class="text-black">Itinerario de viajes</h1></router-link
      >
      <router-link :to="{ name: 'Itinerario' }" class="flex items-center"
        ><ClockIcon class="mr-2" />
        <h1 class="text-black">Historial de viajes</h1></router-link
      >
      <router-link :to="{ name: 'Itinerario' }" class="flex items-center"
        ><supportIcon class="mr-2" />
        <h1 class="text-black">Contactar a soporte</h1></router-link
      >
      <router-link :to="{ name: 'Itinerario' }" class="flex items-center"
        ><settingsIcon class="mr-2" />
        <h1 class="text-black">Ajustes</h1></router-link
      >
    </Slide>
  </div>
</template>

<script>
import { Slide, BurgerButton } from "vue3-burger-menu"
import UserIcon from "@/components/icons/UserIcon.vue"
import FavoriteIcon from "@/components/icons/FavoriteIcon.vue"
import TravelIcon from "@/components/icons/TravelIcon.vue"
import ClockIcon from "@/components/icons/ClockIcon.vue"
import supportIcon from "@/components/icons/supportIcon.vue"
import settingsIcon from "@/components/icons/settingsIcon.vue"
export default {
  name: "BurgerMenu",
  components: {
    Slide,
    BurgerButton,
    UserIcon,
    FavoriteIcon,
    TravelIcon,
    ClockIcon,
    supportIcon,
    settingsIcon,
  },
}
</script>
