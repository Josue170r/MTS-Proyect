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
        <!-- Botón de búsqueda 
        <button class="bg-orange-300 text-gray-700 p-2 rounded-r-md"></button>
        <SearchButton class="bg-black" />
        -->
        <!--INICIO BARRA DE BUSQUEDA COPIA DEL HOME-->
        <div
          class="mt-24 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-2 bg-white flex items-center shadow-md"
          :class="[
            places.length > 5
              ? 'rounded-t-xl rounded-b-xl'
              : 'rounded-t-xl rounded-b-xl',
          ]"
        >
          <div class="relative">
            <div class="flex items-center">
              <input
                v-model="namePlaceToFind"
                type="text"
                class="w-64 md:w-96 px-2 py-2 outline-none border-none flex-grow mr-2"
                placeholder="Busca tu próximo DestinoMX ..."
                @input="FindPlacesFromInput"
              />
              <button v-if="namePlaceToFind.length > 0" @click="closeSearch">
                <CloseIcon class="text-left" />
              </button>
            </div>
            <ul
              ref="placesList"
              class="absolute w-72 mt-3 mr-8 bg-white rounded-b shadow-md overflow-hidden rounded-md"
              v-if="places.length > 5 && showSearch"
            >
              <li
                v-for="(place, index) in places.slice(0, 5)"
                :key="index"
                class="w-full py-2 border-b last:border-b-0 transition duration-300 ease-in-out hover:bg-orange-100 focus:bg-orange-200"
              >
                <div>
                  <button
                    class="w-full py-2 px-4 transition-all duration-300 ease-in-out hover:bg-orange-100 hover:text-gray-800 focus:text-gray-800 rounded-md transition duration-300 ease-in-out transform-gpu"
                    :class="{
                      'bg-orange-100 text-gray-800 focus:text-gray-800':
                        isSelected,
                    }"
                    @click="handleButtonClick"
                  >
                    <div class="flex items-center">
                      <img
                        :src="place.icon"
                        class="w-6 h-6 brightness object-cover rounded-md mr-2"
                      />
                      <div class="flex flex-col">
                        <h1
                          class="text-sm text-lowercase text-left cursor-pointer transition-all duration-300 ease-in-out transform-gpu"
                          @click="goToPlaceDescriptionFromSearch(place)"
                        >
                          {{ place.name }}
                        </h1>
                        <h1 class="text-sm text-gray-500">
                          {{ place.address }}
                        </h1>
                      </div>
                    </div>
                  </button>
                </div>
              </li>
            </ul>
          </div>
        </div>
        <!--FIN BARRA DE BUSQUEDA COPIA DEL HOME  -->
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
      <!--INSERTAR DIV GLOBAL CON FONDO-->
      <div class="bg-white rounded-lg p-8 mt-8">
        <!--Empieza el condicional-->

        <div
          class="flex-row md:w-1/2 md:min-h-screen relative flex rounded-2xl items-center w-full flex-col mb-8"
        >
          <h1 class="text-gray-800 py-6 text-center text-2xl font-bold">
            Tus Proximos Viajes
          </h1>
          <div class="flex ml-4 mr-0 items-center justify-center">
            <button type="button" @click="goToNewTripForm" class="ml-auto">
              <PlusIcon class="ml-auto" />
            </button>
          </div>
        </div>

        <div
          class="flex flex-col items-center justify-center"
          v-if="isemptytrip"
        >
          <BellIcon />
          <h1 class="text-gray-800 py-6 text-center text-xl font-bold">
            ¡Vaya! <br />
            Aun no tienes ningun viaje.
          </h1>

          <button
            type="button"
            @click="goToNewTripForm"
            class="block w-64 mt-2 rounded-r-md py-4 rounded-lg text-black font-semibold bg-yellow-300 mb-2"
          >
            Crear Mi Primer Viaje
          </button>
        </div>

        <div
          v-for="travel in travels"
          :key="travel.id"
          class="flex flex-row ml-2 mr-0 items-center justify-center"
        >
          <v-avatar :color="travel.colorPlantilla" size="x-small"></v-avatar>
          <div class="flex flex-col ml-2 mr-0 items-center justify-center">
            <h1 class="text-gray-800 ml-4 py-1 text-center text-xl font-bold">
              {{ travel.nombreMiViaje }}
            </h1>

            <h1 class="text-gray-300 py-1 text-center text-l font-bold">
              {{ travel.diaInicio.slice(0, 10) }} -
              {{ travel.diaFinal.slice(0, 10) }}
            </h1>
            <h1 class="text-gray-300 py-1 text-center text-l font-bold mb-2">
              {{ travel.descripcionViaje }}
            </h1>
          </div>
          <button type="button" @click="goToEditTrip" class="ml-auto">
            <GreaterThanIcon class="ml-4" />
          </button>
        </div>
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
import { apiFromBackend } from "@/helpers/ApiFromBackend"
//import EditTripScreen from "./EditTripScreen.vue"
export default {
  name: "ItinerarioViajes",
  components: {
    BackButtonIcon,
    AvatarButton,
    BellIcon,
    PlusIcon,
    GreaterThanIcon,
  },

  data() {
    return {
      isemptytrip: true,
      tripdate: true,
      travels: [],
    }
  },
  async created() {
    try {
      // Consulta para obtener los viajes del usuario.
      const { data } = await apiFromBackend.get("/api/viaje")

      // Los viajes se encuentran en el arreglo travels
      // const travels = data.info
      this.travels = data.info

      this.isemptytrip = this.travels.length === 0

      // Por ahora solo mostramos ese arreglo en cosnsola. Se debe agregar el codigo para mostrarlo en la pantalla.
      //console.log(travels)
      console.log(this.travels)
    } catch (error) {
      // Error al obtener los viajes del usuario. Hacer lo que se deba hacer en caso de error.
      //console.log(error)
      console.error(error)
    }

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

    goToEditTrip() {
      this.$router.push({
        name: "EditTrip",
      })
    },
  },
}
</script>

<style></style>
