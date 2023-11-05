<template>
  <div class="h-screen w-full">
    <div
      class="flex rounded-2xl items-center justify-center bg-orange-300 w-full"
    >
      <BackButton class="mx-2 mt-2" />
      <h1 class="text-white py-8 text-center text-xl font-bold">
        ¡Explora lugares cerca de ti!
      </h1>
    </div>
    <GoogleMap
      @click="SelectedPlace"
      :api-key="apiKey"
      mapTypeId="terrain"
      :style="{ width: '100%', height: isEmpyCurrenName ? '90%' : '73%' }"
      :center="relativePosition"
      :zoom="18"
    >
      <Marker :options="{ position: relativePosition }" />
    </GoogleMap>
    <div
      v-if="CurrentNamePlace"
      class="flex rounded-2xl items-center justify-center bg-white w-full flex-col"
    >
      <div class="flex flex-col items-center w-full">
        <div class="flex items-center">
          <LocalitationIcon />
          <h1 class="ml-3 text-gray-800 py-3 text-center text-xl">
            {{ CurrentNamePlace }}
          </h1>
        </div>
        <div class="flex justify-around">
          <h2 class="mx-10 mb-3">
            Distancia: <span class="font-bold">60m</span>
          </h2>
          <h2 class="mx-10 mb-3">
            Tiempo: <span class="font-bold">60min</span>
          </h2>
        </div>
      </div>
      <div class="flex justify-around w-full">
        <button
          @click="goToDescriptionPlace"
          class="font-quicksand w-40 text-red-700 hover:text-white border border-red-700 hover:bg-red-800 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mb-2"
        >
          Ver descripción
        </button>
        <button
          @click="getRoute"
          class="font-quicksand w-40 text-red-700 hover:text-white border border-red-700 hover:bg-red-800 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mb-2"
        >
          Visualizar ruta
        </button>
      </div>
    </div>
    <!-- aqui empieza la visulizacion de la ruta -->
    <div
      v-if="EmptyVerRuta"
      class="flex rounded-2xl items-center justify-center bg-white w-full flex-col"
    >
      <div class="flex flex-col items-center w-full">
        <div class="flex items-center">
          <LocalitationIcon />
          <h1 class="ml-3 text-gray-800 py-3 text-center text-xl">
            {{ CurrentNamePlace }}
          </h1>
        </div>
        <div class="flex justify-around">
          <h2 class="mx-10 mb-3">prueba: <span class="font-bold">60m</span></h2>
          <h2 class="mx-10 mb-3">
            Tiempo: <span class="font-bold">60min</span>
          </h2>
        </div>
      </div>
      <div class="flex justify-around w-full">
        <button
          @click="goToDescriptionPlace"
          class="font-quicksand w-40 text-red-700 hover:text-white border border-red-700 hover:bg-red-800 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mb-2"
        >
          Ver descripción
        </button>
        <button
          @click="getRoute"
          class="font-quicksand w-40 text-red-700 hover:text-white border border-red-700 hover:bg-red-800 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mb-2"
        >
          Visualizar ruta
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { GoogleMap, Marker } from "vue3-google-map"
import BackButton from "@/components/buttons/BackButton"
import LocalitationIcon from "@/components/icons/LocalitationIcon"
import { toast } from "vue3-toastify"
import { getNameApi } from "@/components/Viajes/helpers/ApiPlaceName"
import { getRouteApi } from "@/components/Viajes/helpers/ApiRoute"

export default {
  name: "GoogleMaps",
  components: {
    GoogleMap,
    Marker,
    BackButton,
    LocalitationIcon,
  },
  data() {
    return {
      apiKey: "AIzaSyA7zLTbiIG9CpbTiNfZMQZZUoPMo8kbh70",
      isEmpyCurrenName: true,
      CurrentNamePlace: "",
      relativePosition: "",
      localitation: "",
      currentPlace: "",
      placePhothos: "",
      placeRatings: "",
      placeAbouts: "",
      placeLats: "",
      placeLongs: "",
      imageReferences: [],
      selectedReferences: [],
      isEmptyVerRuta: true,
      EmptyVerRuta: "",
    }
  },
  methods: {
    SelectedPlace(event) {
      this.placeLats = event.latLng.lat()
      this.placeLongs = event.latLng.lng()
      this.getNamePlace(event.placeId)
    },
    async getNamePlace(placeId) {
      try {
        const { data } = await getNameApi.get("/json", {
          params: {
            place_id: placeId,
            key: this.apiKey,
          },
        })
        console.log(data)
        this.CurrentNamePlace = data.result.name
        this.CurrentNamePlace
          ? (this.isEmpyCurrenName = false)
          : (this.isEmpyCurrenName = true)
        this.imageReferences = data.result.photos.map(
          (photo) => photo.photo_reference,
        )
        this.placePhothos = data.result.photos[0].photo_reference
        this.localitation = data.result.vicinity
        this.placeRatings = data.result.rating
        const startingIndex = 1 // Índice de la segunda imagen
        this.selectedReferences = this.imageReferences.slice(startingIndex)
        this.placeAbouts = data.result.editorial_summary.overview
      } catch (e) {
        console.log("e.message")
      }
    },
    goToDescriptionPlace() {
      this.$router.push({
        name: "placedescription",
        query: {
          photos: this.placePhothos,
          names: this.CurrentNamePlace,
          locations: this.localitation,
          ratings: this.placeRatings,
          abouts: this.placeAbouts,
          lats: this.placeLats,
          longs: this.placeLongs,
          photosrefs: this.selectedReferences,
        },
      })
    },
    async getRoute(event) {
      this.isEmptyVerRuta = false
      this.EmptyVerRuta = "prueb"
      this.getNamePlace(event.placeId)
      const origin = this.localitation
      const destination = this.relativePosition
      try {
        const response = await getRouteApi.get("/json", {
          params: {
            origin: origin,
            destination: destination,
            key: "AIzaSyA7zLTbiIG9CpbTiNfZMQZZUoPMo8kbh70",
          },
        })
        // Maneja la respuesta de la API aquí, por ejemplo, puedes imprimir la respuesta en la consola.
        console.log(response.data)
        // A continuación, puedes utilizar los datos de la respuesta para mostrar la ruta en tu mapa.
      } catch (error) {
        // Maneja errores aquí, por ejemplo, muestra un mensaje de error al usuario.
        console.error("Error al obtener la ruta:", error)
      }
    },
  },
  created() {
    this.$getLocation()
      .then((coordinates) => {
        this.relativePosition = { lat: coordinates.lat, lng: coordinates.lng }
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
