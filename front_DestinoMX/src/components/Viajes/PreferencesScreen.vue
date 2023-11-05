<template>
  <div
    class="preferences-screen min-h-screen w-full flex flex-col md:flex-row justify-center"
  >
    <div class="flex flex-col items-center mx-auto">
      <div class="justify-center items-center">
        <img
          src="@/assets/images/DestinoMX.png"
          alt="logo"
          class="mx-auto w-48 sm:-mt-34 p-2 pl-8"
        />
        <button
          type="button"
          class="block w-64 py-4 rounded-lg text-black font-semibold bg-white"
        >
          Elije almenos 3 de las categorías más interesantes para ti
        </button>
        <button
          type="button"
          class="inline-flex w-64 mt-10 py-1 rounded-lg text-black font-semibold bg-orange-300 mb-1"
        >
          <RestaurantIcon class="icon-lg" />
          Restaurantes
        </button>

        <button
          type="button"
          class="block w-64 mt-10 py-1 rounded-lg text-black font-semibold bg-orange-300 mb-1"
        >
          Bares y Pubs<BarIcon class="icon-lg" />
        </button>

        <button
          type="button"
          class="block w-64 mt-10 py-1 rounded-lg text-black font-semibold bg-orange-300 mb-1"
        >
          Cafeterias<CoffeeIcon class="icon-lg" />
        </button>

        <button
          type="button"
          class="block w-64 mt-10 py-1 rounded-lg text-black font-semibold bg-orange-300 mb-1"
        >
          Parques y Areas Naturales<ParkIcon class="icon-lg" />
        </button>

        <button
          type="button"
          class="block w-64 mt-10 py-1 rounded-lg text-black font-semibold bg-orange-300 mb-1"
        >
          Museos y Galerias<MuseumIcon class="icon-lg" />
        </button>

        <button
          type="button"
          class="block w-64 mt-10 py-1 rounded-lg text-black font-semibold bg-orange-300 mb-1"
        >
          Plazas<MallIcon class="icon-lg" />
        </button>

        <button
          type="button"
          class="block w-64 mt-10 py-1 rounded-lg text-black font-semibold bg-orange-300 mb-1"
        >
          Centros de Entretenimiento<CinemaIcon class="icon-lg" />
        </button>

        <button
          type="button"
          class="block w-64 mt-10 py-1 rounded-lg text-black font-semibold bg-orange-300 mb-1"
        >
          Bibliotecas y Librerias<LibraryIcon class="icon-lg" />
        </button>

        <button
          type="button"
          class="block w-64 mt-10 py-1 rounded-lg text-black font-semibold bg-orange-300 mb-1"
        >
          GYM<GymIcon class="icon-lg" />
        </button>

        <button
          type="button"
          class="block w-64 mt-10 py-1 rounded-lg text-black font-semibold bg-orange-300 mb-1"
        >
          Monumentos<MonumentsIcon class="icon-lg" />
        </button>

        <button
          type="button"
          class="block w-64 mt-10 py-1 rounded-lg text-black font-semibold bg-orange-300 mb-1"
        >
          Hoteles<HotelIcon class="icon-lg" />
        </button>

        <button
          type="button"
          class="block w-64 mt-10 py-1 rounded-lg text-black font-semibold bg-orange-300 mb-1"
        >
          Clubs Nocturnos<NightclubIcon class="icon-lg" />
        </button>

        <button
          type="button"
          class="block w-64 mt-10 py-1 rounded-lg text-black font-semibold bg-orange-300 mb-1"
        >
          Parque de Atracciones<FairIcon class="icon-lg" />
        </button>

        <button
          type="button"
          class="block w-64 mt-10 py-1 rounded-lg text-black font-semibold bg-orange-300 mb-1"
        >
          Lugares Religiosos<ChurchIcon class="icon-lg" />
        </button>
        <button
          type="button"
          class="block w-64 py-4 rounded-lg text-black font-semibold bg-green"
        >
          GUARDAR
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.preferences-screen {
  background-image: url("@/assets/images/fondoPantallaInicio.jpg");
  background-size: cover;
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-position: center;
  height: 100vh;
}

.icon-lg {
  font-size: 2em;
  margin-left: 4px;
  margin-right: 7px;
}
</style>

<script>
import RestaurantIcon from "@/components/icons/RestaurantIcon.vue"
import BarIcon from "@/components/icons/BarIcon.vue"
import CoffeeIcon from "@/components/icons/CoffeeIcon.vue"
import ParkIcon from "@/components/icons/ParkIcon.vue"
import MuseumIcon from "@/components/icons/MuseumIcon.vue"
import MallIcon from "@/components/icons/MallIcon.vue"
import CinemaIcon from "@/components/icons/CinemaIcon.vue"
import LibraryIcon from "@/components/icons/LibraryIcon.vue"
import GymIcon from "@/components/icons/GymIcon.vue"
import MonumentsIcon from "@/components/icons/MonumentsIcon.vue"
import HotelIcon from "@/components/icons/HotelIcon.vue"
import NightclubIcon from "@/components/icons/NightclubIcon.vue"
import FairIcon from "@/components/icons/FairIcon.vue"
import ChurchIcon from "@/components/icons/ChurchIcon.vue"

export default {
  name: "preferencesScreen",
  components: {
    RestaurantIcon,
    BarIcon,
    CoffeeIcon,
    ParkIcon,
    MuseumIcon,
    MallIcon,
    CinemaIcon,
    LibraryIcon,
    GymIcon,
    MonumentsIcon,
    HotelIcon,
    NightclubIcon,
    FairIcon,
    ChurchIcon,
  },
}
</script>
