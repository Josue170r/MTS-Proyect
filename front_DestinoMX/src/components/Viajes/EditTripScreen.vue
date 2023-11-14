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
      </div>

      <div class="absolute top-6 right-2 transform -translate-x-1">
        <!-- componente para el avatar del usuario -->
        <AvatarButton />
      </div>
      <img
        src="@/assets/images/imagen003.png"
        alt="imagen002"
        class="md:my-auto rounded-b-xl"
      />
    </div>
    <div class="relative flex rounded-2xl items-center w-full flex-col">
      <h1 class="text-gray-800 py-5 text-center text-3xl font-bold">
        Mi Viaje a: CDMX
      </h1>
    </div>
    <div class="flex flex-col items-right justify-center">
      <button
        type="button"
        @click="calendartrip"
        class="block w-50 mt-2 rounded-r-md py-4 rounded-lg text-black font-semibold bg-orange-300 mb-2"
      >
        Guardar cambios
      </button>
    </div>
    <div class="flex flex-col items-left justify-center">
      <button
        type="button"
        @click="calendartrip"
        class="block w-50 mt-2 rounded-r-md py-4 rounded-lg text-black font-semibold bg-gray-300 mb-2"
      >
        Descartar cambios
      </button>
    </div>
  </div>
</template>

<script>
import BackButtonIcon from "@/components/icons/BackButtonIcon"
import AvatarButton from "@/components/buttons/AvatarButton"
export default {
  name: "EditTripScreen",
  components: {
    BackButtonIcon,
    AvatarButton,
  },

  data() {
    return {
      isemptytrip: true,
      tripdate: true,
    }
  },

  methods: {
    saveChanges() {
      this.$router.push({
        name: "calendartrip",
      })
    },
  },
}
</script>
