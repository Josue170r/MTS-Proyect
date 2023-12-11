<template>
  <div class="min-h-screen w-full flex flex-col md:flex-row bg-gray-100">
    <div
      class="min-w-screen flex md:bg-orange-300 md:w-1/2 md:min-h-screen relative"
    >
      <button @click="$router.go(-1)" class="absolute top-7 left-1 transform">
        <BackButtonIcon />
      </button>
      <div class="absolute top-6 right-2 transform -translate-x-1">
        <AvatarButton />
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
          @click="goToLoginView"
          class="font-quicksand block w-1/2 mt-4 py-2 rounded-lg text-white font-semibold mb-2 bg-pink-300"
        >
          Descartar cambios
        </button>
        <button
          type="button"
          class="font-quicksand block w-1/2 mt-4 py-2 rounded-lg text-white font-semibold mb-2 bg-orange-300"
          @click="goToLoginView"
        >
          Guardar cambios
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
            <!--modifico esto para el vfor-->
            <v-card class="mx-auto" max-width="90%">
              <v-list lines="two">
                <v-list-subheader>
                  <h1 class="text-gray-800 py-4 text-center text-xl font-bold">
                    {{ day.nombre }}
                  </h1>
                  <!-- Agregar botón solo si es hoy -->
                  <button
                    v-if="day.esHoy"
                    @click="iniciarRecorrido(day.fecha)"
                    class="font-quicksand block w-full mt-2 py-2 rounded-lg text-white font-semibold mb-2 bg-green-700"
                  >
                    Iniciar Recorrido
                  </button>
                </v-list-subheader>

                <!-- <v-list-item
                  v-for="(activity, activityIndex) in day.activities"
                  :key="activityIndex"
                  :prepend-avatar="activity.image"
                >
                  <v-list-item-title>{{ activity.title }}</v-list-item-title>
                  <v-list-item-subtitle>{{
                    activity.description
                  }}</v-list-item-subtitle>
                  <div
                    class="h-10 grid grid-cols-3 gap-12 content-center ml-2 py-2"
                  >
                    <div></div>
                    <div></div>
                    <div>
                      <v-icon color="#fed7aa" size="30"
                        >mdi-close-circle</v-icon
                      >
                    </div>
                  </div>
                </v-list-item> -->
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
import BackButtonIcon from "@/components/icons/BackButtonIcon"
import AvatarButton from "@/components/buttons/AvatarButton"
import { format, addDays, parseISO } from "date-fns"
import { es } from "date-fns/locale"

export default {
  name: "MyTrip",
  components: {
    BackButtonIcon,
    AvatarButton,
  },
  data() {
    return {
      dates: [],
      travelName: "",
      diaInicio: "",
      diaFinal: "",
    }
  },
  created() {
    this.travelName = this.$route.query.travel
    this.diaInicio = this.$route.query.diaInicio
    this.diaFinal = this.$route.query.diaFinal
    this.setDateArray(this.diaInicio, this.diaFinal)
  },
  methods: {
    UpperDate(texto) {
      return texto.charAt(0).toUpperCase() + texto.slice(1)
    },
    /*
    setDateArray(startDate, endDate) {
      const fechas = []
      let fechaActual = parseISO(startDate)

      while (fechaActual <= parseISO(endDate)) {
        const fechaFormateada = format(fechaActual, "EEEE d 'de' MMMM", {
          locale: es,
        })
        fechas.push(this.UpperDate(fechaFormateada))
        fechaActual = addDays(fechaActual, 1)
      }
      this.dates = fechas
      console.log(this.dates)
    }, */
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
    //Metodo para verificar si es hoy
    isToday(date) {
      const today = new Date()
      return (
        date.getDate() === today.getDate() &&
        date.getMonth() === today.getMonth() &&
        date.getFullYear() === today.getFullYear()
      )
    },
    iniciarRecorrido(fecha) {
      // Lógica para iniciar el recorrido en el día seleccionado
      console.log(
        `Iniciar recorrido para el día ${format(fecha, "yyyy-MM-dd")}`,
      )
    },
  },
}
</script>
