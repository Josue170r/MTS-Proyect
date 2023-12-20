<template>
  <div class="min-h-screen w-full flex flex-col md:flex-row bg-gray-100">
    <div
      class="min-w-screen flex md:bg-orange-300 md:w-1/2 md:min-h-screen relative"
    >
      <div class="absolute top-6 right-2 transform -translate-x-1">
        <AvatarButton />
      </div>
      <div class="mt-8">
        <BurgerMenu />
      </div>
      <img
        src="@/assets/images/imagen004.png"
        alt="imagen004"
        class="md:my-auto rounded-b-xl"
      />
    </div>
    <div class="md:w-1/2 md:min-h-screen relative">
      <!-- aqui empieza el viaje y los datos  -->

      <h1 class="text-gray-800 py-8 text-center text-xl font-bold">
        {{ travelName }}
      </h1>

      <!-- div de botones -->

      <div class="flex-row flex w-full items-center space-x-4">
        <button
          type="button"
          @click="goToMapScreen()"
          class="font-quicksand block w-1/2 py-2 rounded-lg text-white font-semibold mb-2 bg-pink-300"
        >
          Agregar lugar
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            data-slot="icon"
            class="w-7 h-7 inline-block ml-2 mb-1"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
            />
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
            />
          </svg>
        </button>
        <button
          type="button"
          class="font-quicksand block w-1/2 py-2 rounded-lg text-white font-semibold mb-2 bg-orange-300"
          @click="goToitinerary()"
        >
          Regresar
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            data-slot="icon"
            class="w-7 h-7 inline-block ml-2 mb-1"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="m15 15 6-6m0 0-6-6m6 6H9a6 6 0 0 0 0 12h3"
            />
          </svg>
        </button>
      </div>
      <!-- termina div de botones  -->

      <span class="block text-sm mb-1"></span>

      <!-- empieza div para lugares del viaje -->

      <v-container>
        <v-row>
          <v-col
            v-for="(day, index) in dates"
            :key="index"
            cols="13"
            sm="5"
            md="10"
          >
            <v-card class="mx-auto items-center" max-width="90%">
              <v-list lines="two">
                <v-list-subheader>
                  <h1 class="text-gray-800 py-4 text-center text-xl font-bold">
                    {{ day.nombre }}
                  </h1>
                </v-list-subheader>

                <div v-for="(activity, index) in activities" :key="index">
                  <div>
                    <v-list-item
                      v-if="day.nombre === activity.fechaEspecifica"
                      :prepend-avatar="activity.imagePlaces"
                    >
                      <div class="flex flex-row">
                        <h1 class="text-xl mr-3">
                          {{ activity.nombrePlaces }}
                        </h1>
                        <v-icon
                          @click="delteSite(activity)"
                          color="#e53935"
                          size="30"
                          >mdi-close-circle
                        </v-icon>
                      </div>
                    </v-list-item>
                  </div>
                </div>
                <div class="flex justify-center">
                  <button
                    v-if="day.esHoy"
                    class="items-center font-quicksand block w-64 mt-2 py-2 rounded-lg text-white font-semibold mb-2 bg-green-700"
                    @click="startTour(day.nombre)"
                  >
                    Iniciar Recorrido
                  </button>
                </div>
              </v-list>
            </v-card>
          </v-col>
        </v-row>
      </v-container>

      <span class="block text-red-700 text-sm mb-4"></span>
    </div>
  </div>
</template>

<script>
import BurgerMenu from "@/components/buttons/BurgerMenu.vue"
import AvatarButton from "@/components/buttons/AvatarButton"
import { apiFromBackend } from "@/helpers/ApiFromBackend"
import { toast } from "vue3-toastify"
import { format, addDays, parseISO } from "date-fns"
import { es } from "date-fns/locale"

export default {
  name: "MyTrip",
  components: {
    BurgerMenu,
    AvatarButton,
  },
  data() {
    return {
      dates: [],
      travelName: "",
      diaInicio: "",
      diaFinal: "",
      idViajes: "",
      activities: [],
    }
  },
  created() {
    this.travelName = this.$route.query.travel
    this.diaInicio = this.$route.query.diaInicio
    this.diaFinal = this.$route.query.diaFinal
    this.idViajes = this.$route.query.idViajes
    this.setDateArray(this.diaInicio, this.diaFinal)
    this.getArraySites()
  },
  methods: {
    async getArraySites() {
      try {
        const { data } = await apiFromBackend.get("api/sitios", {
          params: {
            idViajes: this.idViajes,
          },
        })
        this.activities = data.info
      } catch (error) {
        console.log(error)
      }
    },
    UpperDate(texto) {
      return texto.charAt(0).toUpperCase() + texto.slice(1)
    },
    setDateArray(startDate, endDate) {
      const fechas = []
      let fechaActual = parseISO(startDate)

      while (fechaActual <= parseISO(endDate)) {
        const fechaFormateada = format(fechaActual, "EEEE d 'de' MMMM", {
          locale: es,
        })
        const fechaObj = {
          nombre: this.UpperDate(fechaFormateada),
          fecha: fechaActual,
          esHoy: this.isToday(fechaActual),
        }
        fechas.push(fechaObj)
        fechaActual = addDays(fechaActual, 1)
      }
      this.dates = fechas
    },
    async delteSite(site) {
      console.log(site)
      try {
        const { data } = await apiFromBackend.delete("api/sitios", {
          params: {
            placeID: site.placeID,
            fechaEspecifica: site.fechaEspecifica,
            idViajes: site.idViajes,
          },
        })
        toast.success(data.mensaje, {
          theme: "colored",
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 1500,
          hideProgressBar: true,
        })
        window.location.reload()
        console.log(data)
      } catch (error) {
        console.log(error)
      }
    },
    //Metodo para verificar si es hoy
    isToday(date) {
      const today = new Date()
      return (
        date.getDate() === today.getDate() &&
        date.getMonth() === today.getMonth() &&
        date.getFullYear() === today.getFullYear()
      )
    },
    startTour(day) {
      this.activities.forEach((activity) => {
        if (activity.fechaEspecifica === day) {
          console.log(activity)
        }
      })
    },
    goToMapScreen() {
      this.$router.push({
        name: "mapa-interactivo",
      })
    },
    goToitinerary() {
      this.$router.push({
        name: "Itinerario",
      })
    },
  },
}
</script>
