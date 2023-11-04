<template>
  <div class="min-h-screen w-full flex flex-col md:flex-row bg-gray-100">
    <div
      class="min-w-screen flex md:bg-orange-300 md:w-1/2 md:min-h-screen relative"
    >
      <router-link to="/login" class="absolute top-7 left-1 transform">
        <BackButtonIcon />
      </router-link>

      <img
        src="@/assets/images/user_image.png"
        alt="imagenUser"
        class="absolute top-5 right-1 transform -translate-x-1"
        style="width: 13%; height: auto"
      />

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

        <div class="container mt-30px"></div>

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
}
</script>
