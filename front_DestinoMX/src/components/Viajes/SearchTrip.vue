<template>
  <div id="app">
    <!-- Contenedor de la imagen de fondo -->
    <div class="relative">
      <!-- Contenedor del botón de avatar -->
      <div class="absolute top-6 right-2 transform -translate-x-1">
        <AvatarButton />
      </div>
      <div>
        <BurgerMenu />
      </div>

      <!-- Contenedor de la barra de búsqueda y botón -->
      <div
        class="mt-16 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-2 bg-white border border-gray-300 rounded-md flex items-center"
      >
        <!-- Barra de búsqueda -->
        <input
          type="text"
          class="w-48 p-2 rounded-l-md"
          placeholder="Buscar..."
        />
        <!-- Botón de búsqueda -->
        <button class="bg-orange-300 text-gray-700 p-2 rounded-r-md"></button>
        <SearchButton class="bg-black" />
      </div>

      <img
        src="@/assets/images/imagen003.png"
        alt="imagen003"
        class="w-full h-full object-cover"
      />
    </div>
    <div class="flex items-center justify-center w-full flex-col">
      <h1 class="text-xl text-center">
        ELIJA AL MENOS 3 DE LAS CATEGORIAS MAS INTERESANTES PARA TI
      </h1>
      <!-- 

       
      <GoogleMap
        :api-key="apiKey"
        mapTypeId="terrain"
        style="width: 88%; height: 210px; border-radius: 20px; overflow: hidden"
        :center="relativePosition"
        :zoom="14"
      >
      
        <Marker :options="{ position: relativePosition }" />
      </GoogleMap>
      -->

      <!--AQUI DIVIDIREMOS LA PANTALLA EN 2 COLUMNAS Y 7 FILAS  -->
    </div>
    <div>
      <h1></h1>
    </div>
  </div>
</template>

<script>
import AvatarButton from "@/components/buttons/AvatarButton"
import SearchButton from "@/components/buttons/SearchButton"
import BurgerMenu from "@/components/buttons/BurgerMenu.vue"
import { toast } from "vue3-toastify"

export default {
  name: "SearchTripScreen",
  components: {
    AvatarButton,
    SearchButton,
    BurgerMenu,
  },
  data() {
    return {
      apiKey: "AIzaSyA7zLTbiIG9CpbTiNfZMQZZUoPMo8kbh70",
      relativePosition: "",
    }
  },
  created() {
    this.$getLocation()
      .then((coordinates) => {
        this.relativePosition = { lat: coordinates.lat, lng: coordinates.lng }
        console.log(coordinates)
      })
      .catch((error) => {
        toast(error, {
          hideProgressBar: true,
          autoClose: 1500,
          type: "error",
          theme: "colored",
        })
      })
  },
}
</script>
