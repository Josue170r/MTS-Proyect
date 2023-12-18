<template>
  <div class="min-h-screen w-full flex flex-col md:flex-row bg-gray-100">
    <div
      class="min-w-screen flex md:bg-orange-300 md:w-1/2 md:min-h-screen relative"
    >
      <button class="absolute top-7 left-1 transform">
        <BackButton />
      </button>
      <div class="absolute top-6 right-2 transform -translate-x-1">
        <AvatarButton />
      </div>
      <img
        src="@/assets/images/imagen002.png"
        alt="imagen002"
        class="md:my-auto rounded-b-xl"
      />
    </div>
    <div class="md:w-1/2 md:min-h-screen relative">
      <!-- empieza el formulario -->
      <form @submit.prevent="onSubmit" class="bg-accent w-full px-5">
        <h1 class="text-gray-800 py-8 text-center text-xl font-bold">
          Creación de nuevo viaje
        </h1>
        <h2 class="mb-3">¿Cómo te gustaría nombrar este viaje?</h2>
        <div class="flex justify-center">
          <div class="border-2 rounded-lg">
            <input
              id="TripName"
              v-model="trip.TripName"
              class="outline-none py-2 px-3 rounded-lg bg-white w-full"
              type="text"
              name="TripName"
              placeholder="Título del viaje *"
            />
          </div>
          <div>
            <div class="text-center ml-4">
              <v-btn
                color="pink-lighten-3"
                class="text-white"
                @click="dialogColor = true"
              >
                Elegir Color
              </v-btn>

              <v-dialog v-model="dialogColor" width="auto">
                <v-card>
                  <v-card-text>
                    <v-color-picker hide-inputs v-model="ColorInputPicker">
                    </v-color-picker>
                  </v-card-text>
                  <v-card-actions>
                    <v-btn color="primary" block @click="dialogColor = false"
                      >Guardar</v-btn
                    >
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </div>
          </div>
        </div>
        <span class="block text-red-700 text-sm mb-2"></span>
        <h2 class="mb-3">
          Escribe algunas anotaciones importantes para tu viaje, tienes un
          máximo de 100 caracteres.
        </h2>

        <div
          class="flex items-center border-2 py-2 px-3 rounded-lg mb-4 bg-white"
        >
          <input
            id="DescriptionTrip"
            v-model="trip.DescriptionTrip"
            class="pl-2 outline-none border-none w-full h-[50px]"
            type="text"
            name="DescriptionTrip"
            placeholder="Descripción del viaje *"
            maxlength="100"
          />
        </div>
        <span class="block text-red-700 text-sm mb-2"></span>

        <!-- +++++++++aqui empieza el calendario++++++++++ -->
        <h2 class="mb-3">
          Selecciona la fecha de inicio de tu viaje y la fecha en que finalizará
          tu viaje.
        </h2>
        <div class="container min-w-screen" style="overflow-x: auto">
          <!-- fecha de inicio -->
          <v-dialog v-model="dialog" persistent>
            <template v-slot:activator="{ props }">
              <div
                class="bg-white flex flex-row md:flex-row space-x-4 flex md:h-1/3 rounded-lg"
              >
                <v-btn
                  :disabled="isEdit"
                  v-bind="props"
                  class="text-center mt-4 my-5"
                >
                  Fecha de inicio
                </v-btn>
                <h2 class="mb-3 my-5">
                  Fecha de inicio: <br />{{ startDate }}
                </h2>
              </div>
            </template>
            <div class="flex items-center justify-center h-[1px]">
              <v-card class="max-w-md w-full">
                <v-card-text>
                  <v-container class="custom-container">
                    <v-row justify="space-around">
                      <v-col cols="12">
                        <v-date-picker
                          width="0"
                          elevation="0"
                          color="#fdba74"
                          show-adjacent-months
                          v-model="startDate"
                          min="2023-05-12"
                          max="2070-03-20"
                        ></v-date-picker>
                      </v-col>
                    </v-row>
                  </v-container>
                </v-card-text>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn text @click="cancelDateSelection">Cancelar</v-btn>
                  <v-btn text @click="saveDateSelection">Añadir fecha</v-btn>
                </v-card-actions>
              </v-card>
            </div>
          </v-dialog>
        </div>
        <!-- fecha de FIN -->
        <div class="container mt-10px">
          <v-dialog v-model="dialog2" persistent>
            <template v-slot:activator="{ props }">
              <div
                class="bg-white flex flex-row md:flex-row space-x-4 min-w-screen flex md:h-1/3 rounded-lg"
              >
                <v-btn
                  :disabled="isEdit"
                  v-bind="props"
                  class="text-center mt-4 my-5"
                >
                  Fecha de fin
                </v-btn>
                <h2 class="mb-3 my-5">Fecha de fin: <br />{{ endDate }}</h2>
              </div>
            </template>
            <div class="flex items-center justify-center h-[1px]">
              <v-card class="max-w-md w-full">
                <v-card-text>
                  <v-container class="custom-container">
                    <v-row justify="space-around">
                      <v-col cols="12">
                        <v-date-picker
                          elevation="0"
                          width="0"
                          color="#fdba74"
                          show-adjacent-months
                          v-model="endDate"
                          min="2023-05-12"
                          max="2070-03-20"
                        ></v-date-picker>
                      </v-col>
                    </v-row>
                  </v-container>
                </v-card-text>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn text @click="cancelDateSelection2">Cancelar</v-btn>
                  <v-btn text @click="saveDateSelection2">Añadir fecha</v-btn>
                </v-card-actions>
              </v-card>
            </div>
          </v-dialog>
        </div>
        <div class="flex justify-center items-center space-x-4">
          <button
            type="button"
            class="font-quicksand block w-1/2 mt-4 py-2 rounded-lg text-white font-semibold mb-2 bg-pink-300"
          >
            Añadir lugares
          </button>
          <button
            :disabled="isFormEmpty"
            type="submit"
            class="font-quicksand block w-1/2 mt-4 py-2 rounded-lg text-white font-semibold mb-2 bg-orange-300"
            :class="[
              isFormEmpty
                ? 'opacity-60 cursor-not-allowed'
                : 'hover:outline hover:outline-1 hover:outline-orange-400',
            ]"
          >
            Guardar
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import BackButton from "@/components/buttons/BackButton.vue"
import AvatarButton from "@/components/buttons/AvatarButton"
import { apiFromBackend } from "@/helpers/ApiFromBackend"
import { toast } from "vue3-toastify"
import "vue3-toastify/dist/index.css"

export default {
  name: "NewTrip",
  components: {
    BackButton,
    AvatarButton,
  },
  computed: {
    isFormEmpty() {
      return (
        !this.trip.DescriptionTrip ||
        !this.trip.TripName ||
        !this.startDate ||
        !this.endDate
      )
    },
  },
  data() {
    return {
      trip: {
        DescriptionTrip: "",
        TripName: "",
      },
      ColorInputPicker: "",
      startDate: "",
      endDate: "",
      dialogColor: false,
      dialog: false,
      dialog2: false,
      isEdit: false,
    }
  },
  created() {
    this.startDate = this.$route.query.diaInicio
      ? this.$route.query.diaInicio
      : ""
    this.endDate = this.$route.query.diaFinal ? this.$route.query.diaFinal : ""
    this.trip.TripName = this.$route.query.travel
      ? this.$route.query.travel
      : ""
    this.trip.DescriptionTrip = this.$route.query.descripcion
      ? this.$route.query.descripcion
      : ""
    this.ColorInputPicker = this.$route.query.colorPlantilla
      ? this.$route.query.colorPlantilla
      : ""
    this.isEdit = this.$route.query.isEdit ? true : false
  },
  methods: {
    onSubmit() {
      if (this.isEdit) {
        this.updateTrip()
      } else {
        this.saveTrip()
      }
    },
    async saveTrip() {
      try {
        const { data } = await apiFromBackend.post("/api/viaje", {
          nombreMiViaje: this.trip.TripName,
          descripcionViaje: this.trip.DescriptionTrip,
          colorPlantilla: this.ColorInputPicker,
          diaInicio: this.startDate.toString(),
          diaFinal: this.endDate.toString(),
        })
        console.log(data)
        toast.success("Viaje creado con éxito", {
          theme: "colored",
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 1500,
          hideProgressBar: true,
        })
        setTimeout(() => {
          this.$router.push({ name: "Itinerario" })
        }, 1200)
      } catch ({ response }) {
        toast.error(response.data.mensaje, {
          theme: "colored",
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 1500,
          hideProgressBar: true,
        })
      }
    },
    async updateTrip() {
      try {
        const { data } = await apiFromBackend.put("/api/viaje", {
          nombreMiViaje: this.trip.TripName,
          descripcionViaje: this.trip.DescriptionTrip,
          colorPlantilla: this.ColorInputPicker,
          diaInicio: this.startDate.toString(),
          diaFinal: this.endDate.toString(),
          idViajes: this.$route.query.idViajes,
        })
        console.log(data)
        toast.success("Viaje actualizado con éxito", {
          theme: "colored",
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 1500,
          hideProgressBar: true,
        })
        setTimeout(() => {
          this.$router.push({ name: "Itinerario" })
        }, 1200)
      } catch ({ response }) {
        toast.error(response.data.mensaje, {
          theme: "colored",
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 1500,
          hideProgressBar: true,
        })
      }
    },
    cancelDateSelection() {
      this.dialog = false
    },
    cancelDateSelection2() {
      this.dialog2 = false
    },
    saveDateSelection() {
      // Convertir las fechas a objetos Date
      const currentDate = new Date()
      const selectedDate = new Date(this.startDate)

      // Comparar las fechas, teniendo en cuenta solo el día
      currentDate.setHours(0, 0, 0, 0)
      selectedDate.setHours(0, 0, 0, 0)

      if (selectedDate < currentDate) {
        // Muestra un mensaje de alerta en pantalla
        toast.error("La fecha de inicio no puede ser anterior a hoy", {
          theme: "colored",
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 3000,
          hideProgressBar: true,
        })

        // Abre de nuevo el diálogo para seleccionar la fecha
        this.dialog = true
        return
      }

      // Realiza cualquier acción que necesites con la fecha de inicio
      console.log("Fecha de inicio:", this.startDate)
      this.dialog = false
    },

    saveDateSelection2() {
      // Convertir las fechas a objetos Date
      const startDate = new Date(this.startDate)
      const endDate = new Date(this.endDate)

      // Comparar las fechas
      if (endDate < startDate) {
        // Muestra un mensaje de alerta en pantalla
        toast.error(
          "La fecha de fin no puede ser anterior a la fecha de inicio",
          {
            theme: "colored",
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 3000,
            hideProgressBar: true,
          },
        )

        // Abre de nuevo el diálogo para seleccionar la fecha
        this.dialog2 = true
        return
      }

      // Realiza cualquier acción que necesites con la fecha de fin
      console.log("Fecha de fin:", this.endDate)
      this.dialog2 = false
    },
  },
}
</script>

<style>
.custom-container {
  width: 100%; /* Ajusta el ancho según tus necesidades */
  padding: 0 0; /* Ajusta el padding horizontal según tus necesidades */
  overflow-x: auto;
}
</style>
