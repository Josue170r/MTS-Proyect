<template>
  <div class="min-h-screen w-full flex flex-col md:flex-row bg-gray-100">
    <div
      class="min-w-screen flex md:bg-orange-300 md:w-1/2 md:min-h-screen relative"
    >
      <router-link to="/login" class="absolute top-7 left-1 transform">
        <BackButtonIcon />
      </router-link>
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
      <form @submit="onSubmit" class="bg-accent w-full px-5">
        <h1 class="text-gray-800 py-8 text-center text-xl font-bold">
          Creación de nuevo viaje
        </h1>
        <h2 class="mb-3">¿Cómo te gustaría nombrar este viaje?</h2>
        <div
          class="flex items-center border-2 py-2 px-3 rounded-lg mb-4 bg-white"
        >
          <input
            id="TripName"
            v-model="TripName"
            class="pl-2 outline-none border-none w-full"
            type="text"
            name="TripName"
            placeholder="Título del viaje *"
          />
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
            v-model="DescriptionTrip"
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
                <v-btn v-bind="props" class="text-center mt-4 my-5">
                  Fecha de inicio
                </v-btn>
                <h2 class="mb-3 my-5">
                  Fecha de inicio: <br />{{ startDate }}
                </h2>
              </div>
            </template>
            <v-card>
              <v-card-text>
                <v-container class="custom-container">
                  <v-row justify="space-around">
                    <v-date-picker
                      width="0"
                      elevation="0"
                      color="#fdba74"
                      show-adjacent-months
                      v-model="startDate"
                      :allowed-dates="allowedDates"
                      min="2023-05-12"
                      max="2070-03-20"
                      @input="validateDateRange"
                    ></v-date-picker>
                  </v-row>
                </v-container>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn text @click="cancelDateSelection">Cancelar</v-btn>
                <v-btn text @click="saveDateSelection">Añadir fecha</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </div>
        <!-- fecha de FIN -->
        <div class="container mt-10px">
          <v-dialog v-model="dialog2" persistent>
            <template v-slot:activator="{ props }">
              <div
                class="bg-white flex flex-row md:flex-row space-x-4 min-w-screen flex md:h-1/3 rounded-lg"
              >
                <v-btn v-bind="props" class="text-center mt-4 my-5">
                  Fecha de fin
                </v-btn>
                <h2 class="mb-3 my-5">Fecha de Fin: <br />{{ endDate }}</h2>
              </div>
            </template>

            <v-card>
              <v-card-text>
                <v-container class="custom-container">
                  <v-row justify="space-around">
                    <v-date-picker
                      elevation="0"
                      width="0"
                      color="#fdba74"
                      show-adjacent-months
                      v-model="endDate"
                      :allowed-dates="allowedDates"
                      min="2023-05-12"
                      max="2070-03-20"
                      @input="validateDateRange2"
                    ></v-date-picker>
                  </v-row>
                </v-container>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn text @click="cancelDateSelection2">Cancelar</v-btn>
                <v-btn text @click="saveDateSelection2">OK</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </div>
        <div class="flex-row flex w-full items-center space-x-4">
          <button
            type="button"
            @click="goToLoginView"
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
import BackButtonIcon from "@/components/icons/BackButtonIcon"
import AvatarButton from "@/components/buttons/AvatarButton"
import { useForm, useField } from "vee-validate"
import * as yup from "yup"
import { configure } from "vee-validate"
import { localize } from "@vee-validate/i18n"
import es from "@vee-validate/i18n/dist/locale/es.json"

configure({
  generateMessage: localize({ es }),
})

export default {
  name: "NewTrip",
  components: {
    BackButtonIcon,
    AvatarButton,
  },
  computed: {
    isFormEmpty() {
      return !this.DescriptionTrip || !this.TripName
    },
  },
  setup() {
    const schema = yup.object({
      TripName: yup.string().required(),
      DescriptionTrip: yup.string().required(),
    })
    const { handleSubmit, isSubmitting, errors } = useForm({
      validationSchema: schema,
    })

    console.log(errors)

    const { value: TripName, errorMessage: TripNameError } =
      useField("TripName")
    const { value: DescriptionTrip, errorMessage: DescriptionTripError } =
      useField("DescriptionTrip")

    const onSubmit = handleSubmit((values) => {
      console.log(values)
    })

    return {
      TripName,
      TripNameError,
      DescriptionTrip,
      DescriptionTripError,
      isSubmitting,
      onSubmit,
    }
  },
  data() {
    return {
      startDate: null,
      endDate: null,
      dialog: false,
      dialog2: false,
    }
  },
  methods: {
    validateDateRange() {
      // Agrega lógica para validar el rango de fechas aquí.
      // if (this.startDate && this.endDate && this.startDate > this.endDate) {
      //   // Si la fecha de inicio es posterior a la fecha de fin, ajusta las fechas.
      //   const temp = this.startDate
      //   this.startDate = this.endDate
      //   this.endDate = temp
      // }
    },
    validateDateRange2() {
      // Agrega lógica para validar el rango de fechas aquí.
      // if (this.startDate && this.endDate && this.startDate > this.endDate) {
      //   // Si la fecha de inicio es posterior a la fecha de fin, ajusta las fechas.
      //   const temp = this.startDate
      //   this.startDate = this.endDate
      //   this.endDate = temp
      // }
    },
    cancelDateSelection() {
      this.dialog = false
    },
    cancelDateSelection2() {
      this.dialog2 = false
    },
    saveDateSelection() {
      // Realiza cualquier acción que necesites con las fechas seleccionadas
      console.log("Fecha de inicio:", this.startDate)
      this.dialog = false
    },
    saveDateSelection2() {
      // Realiza cualquier acción que necesites con las fechas seleccionadas
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
