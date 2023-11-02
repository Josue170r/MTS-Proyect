<template>
  <div class="min-h-screen w-full flex flex-col md:flex-col md:w-20/2">
    <div class="flex items-center py-6 px-7 rounded-lg bg-orange-300">
      <router-link to="/login">
        <RegresarIcon />
      </router-link>

      <h1 class="text-white font-bold text-2xl mb-1 p-2 pl-8">
        Visualizar Ruta hacia tu destino<br />
      </h1>
    </div>

    <div class="items-center min-h-screen w-full flex flex-col md:flex-row">
      <img src="@/assets/images/mapaxd.png" alt="logo" class="min-h-screen" />
    </div>

    <div
      class="bg-white w-full flex items-stretch flex-row space-x-4 rounded-lg md:w-1/3"
    >
      <button
        type="button"
        @click="goToLoginView"
        class="font-quicksand py-4 px-4 rounded-lg text-black bg-gray-200 my-4 mx-9 font-baskerville"
      >
        Cancelar
      </button>
      <button
        @click="goToRegisterForm"
        type="button"
        class="font-quicksand w-auto py-4 px-4 rounded-lg text-black bg-orange-300 my-4 mx-7"
      >
        Comenzar ruta
      </button>
    </div>
  </div>
</template>

<script>
import RegresarIcon from "@/components/icons/RegresarIcon";

export default {
  name: "VisualizarRuta",
  components: {
    RegresarIcon,
  },
};
</script>
