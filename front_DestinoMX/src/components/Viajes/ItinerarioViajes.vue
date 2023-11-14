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

      <v-container>
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

      <!--INCIIO ISEMPTYTRIP=TRUE-->

      <div class="flex flex-col items-center justify-center" v-if="isemptytrip">
        <h1 class="text-gray-800 py-6 text-center text-xl font-bold">
          Vaya... Aún no tienes Viajes en tu itinerario
        </h1>
        <button
          type="button"
          @click="goToNewTripForm"
          class="block w-64 mt-2 rounded-r-md py-4 rounded-lg text-black font-semibold bg-orange-300 mb-2"
        >
          Crear Nuevo Viaje
        </button>
      </div>

      <!--FIN ISEMPTYTRIP=TRUE-->

      <!--INICIO ISnotEMPTYTRIP=TRUE-->
      <br />

      <div
        class="flex flex-col items-center justify-center"
        v-if="isnotemptytrip"
      >
        <div
          class="flex items-center justify-between p-4 bg-gray-200 rounded-md"
        >
          <h1 class="mr-auto text-xl font-bold">Viajes Proximos</h1>
          <button class="flex items-center bg-white rounded-full p-2 ml-auto">
            <img
              src="@/assets/images/CalendaryImages/PlusIcon.png"
              alt="Icono"
              class="w-6 h-6 object-contain"
            />
          </button>
        </div>
        <br />
        <!-- Divs adicionales -->
        <div class="flex flex-col md:flex-row md:space-x-4">
          <div class="flex item-center flex-1 bg-white p-4 rounded-md">
            <button class="mr-3 bg-gray-200 rounded-full">
              <img
                src="@/assets/images/CalendaryImages/LocationIcon.png"
                alt="Icono"
                class="w-9 h-9 object-contain"
              />
            </button>
            <p>Mi Viaje a Mazatlan</p>
            <button class="ml-12 p-2 bg-gray-200 rounded-full">
              <img
                src="@/assets/images/CalendaryImages/greaterThanIcon.png"
                alt="Icono"
                class="w-4 h-4 object-contain"
              />
            </button>
          </div>
          <br />

          <div class="flex item-center flex-1 bg-white p-4 rounded-md">
            <button class="mr-3 bg-gray-200 rounded-full">
              <img
                src="@/assets/images/CalendaryImages/LocationIcon.png"
                alt="Icono"
                class="w-9 h-9 object-contain"
              />
            </button>
            <p>Mi Viaje a Queretaro</p>
            <button class="ml-12 p-2 bg-gray-200 rounded-full">
              <img
                src="@/assets/images/CalendaryImages/greaterThanIcon.png"
                alt="Icono"
                class="w-4 h-4 object-contain"
              />
            </button>
          </div>
          <br />

          <div class="flex item-center flex-1 bg-white p-4 rounded-md">
            <button class="mr-3 bg-gray-200 rounded-full">
              <img
                src="@/assets/images/CalendaryImages/LocationIcon.png"
                alt="Icono"
                class="w-9 h-9 object-contain"
              />
            </button>
            <p>Mi Viaje a CDMX</p>
            <button class="ml-16 p-2 bg-gray-200 rounded-full">
              <img
                src="@/assets/images/CalendaryImages/greaterThanIcon.png"
                alt="Icono"
                class="w-4 h-4 object-contain"
              />
            </button>
          </div>
        </div>
        <br />
      </div>

      <!--divs adicionales -->
    </div>

    <div>
      <!--LISTA DE VIAJES-->
      <!--LISTA DE VIAJES-->

      <!--FIN ISnotEMPTYTRIP=TRUE-->
    </div>
  </div>
</template>

<script>
import BackButtonIcon from "@/components/icons/BackButtonIcon"
import AvatarButton from "@/components/buttons/AvatarButton"

export default {
  name: "ItinerarioViajes",
  components: {
    BackButtonIcon,
    AvatarButton,
  },

  data() {
    return {
      isemptytrip: false,
      isnotemptytrip: true,
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
