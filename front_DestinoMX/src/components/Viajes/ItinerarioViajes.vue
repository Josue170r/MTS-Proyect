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
          v-model="search"
          type="text"
          class="rounded-lg w-48 md:w-96 px-2 py-2 outline-none border-none flex-grow mr-2"
          placeholder="Buscar..."
          @input="filterName"
        />
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
      <div class="bg-white rounded-lg p-8">
        <!--Empieza el condicional-->
        <div
          class="flex flex-col items-center justify-center"
          v-if="isemptytrip"
        >
          <BellIcon />
          <h1 class="text-gray-800 py-6 text-center text-xl font-bold">
            ¡Vaya! <br />
            Aún no tienes viajes.
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
          v-if="!isemptytrip"
          class="flex flex-row md:w-1/2 md:min-h-screen relative flex justify-center rounded-2xl items-center w-full flex-col mb-2"
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

        <div v-if="!isemptytrip">
          <div
            v-for="travel in travels"
            :key="travel.id"
            class="flex flex-row ml-4 items-center justify-center"
          >
            <v-avatar
              :color="travel.colorPlantilla ? travel.colorPlantilla : '#FFB74D'"
              size="x-small"
            ></v-avatar>

            <div class="flex flex-col place-items-center mx-12">
              <h1 class="text-gray-800 py-1 text-xl ml-8 font-bold">
                {{ travel.nombreMiViaje }}
              </h1>
              <h1 class="text-gray-300 py-1 text-l font-bold">
                {{ travel.diaInicio.slice(0, 10) }} -
                {{ travel.diaFinal.slice(0, 10) }}
              </h1>
              <h1 class="text-gray-300 py-1 text-l font-bold mb-2">
                {{ travel.descripcionViaje }}
              </h1>
            </div>
            <button type="button" @click="goToEditTrip(travel)" class="ml-auto">
              <GreaterThanIcon class="ml-auto" />
            </button>
          </div>
        </div>
        <!--Div del else-->
      </div>
    </div>
  </div>
</template>

<script>
import { toRaw } from "vue"
import BackButtonIcon from "@/components/icons/BackButtonIcon"
import AvatarButton from "@/components/buttons/AvatarButton"
import BellIcon from "@/components/icons/BellIcon.vue"
import PlusIcon from "@/components/icons/PlusIcon.vue"
import GreaterThanIcon from "@/components/icons/GreaterThanIcon.vue"
import { apiFromBackend } from "@/helpers/ApiFromBackend"
import { toast } from "vue3-toastify"

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
      alertShow: false,
      isemptytrip: true,
      tripdate: true,
      travels: [],
      AllTravels: [],
    }
  },
  async created() {
    try {
      // Consulta para obtener los viajes del usuario.
      const { data } = await apiFromBackend.get("/api/viaje")

      // Los viajes se encuentran en el arreglo travels
      // const travels = data.info
      this.travels = data.info
      this.AllTravels = data.info

      this.isemptytrip = this.travels.length === 0

      // Por ahora solo mostramos ese arreglo en cosnsola. Se debe agregar el codigo para mostrarlo en la pantalla.
      //console.log(travels)
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
    filterName() {
      if (this.search === "") {
        this.alertShow = false
        this.travels = this.AllTravels
      } else {
        this.travels = this.AllTravels.filter((travel) =>
          travel.nombreMiViaje.includes(this.search),
        )
      }
      if (this.travels.length === 0 && !this.alertShow) {
        toast.error("No hay viajes con este nombre", {
          theme: "colored",
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 1500,
          hideProgressBar: true,
        })
        this.alertShow = true
      }
    },
    goToEditTrip(travel) {
      const trip = toRaw(travel)
      console.log(trip)
      this.$router.push({
        name: "EditTrip",
        query: {
          travel: trip.nombreMiViaje,
          diaInicio: trip.diaInicio,
          diaFinal: trip.diaFinal,
        },
      })
    },
  },
}
</script>

<style></style>
