<template>
  <div class="min-h-screen w-full flex flex-col md:flex-row bg-gray-100">
    <div
      class="min-w-screen flex md:bg-orange-300 md:w-1/2 md:min-h-screen relative"
    >
      <button @click="$router.go(-1)" class="absolute top-7 left-1 transform">
        <BackButtonIcon />
      </button>
      <div
        class="mt-16 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-1 pt-1 bg-white border border-gray-300 rounded-md flex items-center"
      >
        <!-- Barra de búsqueda -->
        <input
          type="text"
          class="w-48 p-2 rounded-l-md p-1"
          placeholder="Buscar..."
        />
        <!-- Botón de búsqueda -->
        <button class="bg-orange-300 text-gray-700 p-2 rounded-r-md"></button>
        <SearchButton class="bg-black" />
      </div>

      <div class="absolute top-6 right-2 transform -translate-x-1">
        <!-- componente para el avatar del usuario -->
        <AvatarButton />
      </div>
      <img
        src="@/assets/images/imagen002.png"
        alt="imagen002"
        class="md:my-auto rounded-b-xl"
      />
    </div>
    <!-- Calendario -->
    <div
      class="md:w-1/2 md:min-h-screen relative flex rounded-2xl items-center w-full flex-col mb-8"
    >
      <h1 class="text-gray-800 py-8 text-center text-xl font-bold">
        Calendario de Viajes
      </h1>

      <v-container class="mb-4">
        <v-row justify="space-around">
          <v-date-picker
            elevation="0"
            style="width: 360px"
            color="#fdba74"
            show-adjacent-months
          >
          </v-date-picker>
        </v-row>
      </v-container>

      <!--INSERTAR DIV GLOBAL CON FONDO-->
      <div class="bg-white rounded-lg p-8">
        <!--Empieza el condicional-->
        <div
          class="md:w-1/2 md:min-h-screen relative flex rounded-2xl items-center w-full flex-col mb-8"
        >
          <h1 class="text-gray-800 py-6 text-center text-2xl font-bold">
            Viajes Proximos
          </h1>
        </div>

        <div
          class="flex flex-col items-center justify-center"
          v-if="isemptytrip"
        >
          <BellIcon />
          <h1 class="text-gray-800 py-6 text-center text-xl font-bold">
            ¡Aun tienes mucho por descubrir!
          </h1>

          <button
            type="button"
            @click="goToNewTripForm"
            class="block w-64 mt-2 rounded-r-md py-4 rounded-lg text-black font-semibold bg-yellow-300 mb-2"
          >
            Crear Mi Primer Viaje
          </button>
        </div>
        <!--div del condicional v-if isemptytrip=true-->

        <!--Div del else-->
        <div class="flex flex-row ml-2 mr-0 items-center justify-center">
          <div class="flex-col items-center justify-center">
            <h1 class="text-gray-800 py-4 ml-8 text-2xl text-center font-bold">
              Viajes Proximos
            </h1>
          </div>
          <PlusIcon class="ml-auto" />
        </div>
        <!--Div para la ruta 1 de viajes-->
        <div class="flex flex-row ml-2 mr-0 items-center justify-center">
          <LocalitationIcon3 />
          <div class="flex-col">
            <h1 class="text-gray-800 ml-4 py-1 text-center text-xl font-bold">
              Mi Viaje a Mazatlan
            </h1>
            <h1 class="text-gray-300 py-1 text-center text-l font-bold">
              08 octubre-10 octubre
            </h1>
          </div>
          <GreaterThanIcon class="ml-auto" />
        </div>
        <!--Div para la ruta 1 de viajes-->

        <!--Div para la ruta 2 de viajes-->
        <div class="flex flex-row ml-2 mr-0 items-center justify-center">
          <LocalitationIcon3 />
          <div class="flex-col">
            <h1 class="text-gray-800 ml-4 py-1 text-center text-xl font-bold">
              Mi Viaje a CDMX
            </h1>
            <h1 class="text-gray-300 py-1 text-center text-l font-bold">
              25 octubre-27 octubre
            </h1>
          </div>
          <GreaterThanIcon class="ml-auto" />
        </div>
        <!--Div para la ruta21 de viajes-->

        <!--Div para la ruta 3 de viajes-->
        <div class="flex flex-row ml-2 mr-0 items-center justify-center">
          <LocalitationIcon3 />
          <div class="flex-col">
            <h1 class="text-gray-800 ml-4 py-1 text-center text-xl font-bold">
              Mi Viaje a Queretaro
            </h1>
            <h1 class="text-gray-300 py-1 text-center text-l font-bold">
              29 octubre-30 octubre
            </h1>
          </div>
          <GreaterThanIcon class="ml-auto" />
        </div>
        <!--Div para la ruta 3 de viajes-->

        <!--Div del else-->
      </div>
    </div>
  </div>
</template>

<script>
import BackButtonIcon from "@/components/icons/BackButtonIcon"
import AvatarButton from "@/components/buttons/AvatarButton"
import BellIcon from "@/components/icons/BellIcon.vue"
import PlusIcon from "@/components/icons/PlusIcon.vue"
import GreaterThanIcon from "@/components/icons/GreaterThanIcon.vue"
import LocalitationIcon3 from "@/components/icons/LocalitationIcon3.vue"
export default {
  name: "ItinerarioViajes",
  components: {
    BackButtonIcon,
    AvatarButton,
    BellIcon,
    PlusIcon,
    GreaterThanIcon,
    LocalitationIcon3,
  },

  data() {
    return {
      isemptytrip: true,
      tripdate: true,
    }
  },

  methods: {
    goToNewTripForm() {
      this.$router.push({
        name: "newtrip",
      })
    },
  },
}
</script>

<style></style>
