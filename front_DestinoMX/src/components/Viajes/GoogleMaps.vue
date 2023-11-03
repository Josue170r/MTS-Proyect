<template>
  <div class="h-screen w-full">
    <div
      class="flex rounded-2xl items-center justify-center bg-orange-300 w-full"
    >
      <BackButton class="mx-2 mt-2" />
      <h1 class="text-white py-8 text-center text-xl">
        ¡Explora lugares cerca de ti!
      </h1>
    </div>
    <GoogleMap
      @click="SelectedPlace"
      :api-key="apiKey"
      mapTypeId="terrain"
      :style="{ width: '100%', height: isEmpyCurrenName ? '90%' : '73%' }"
      :center="relativePosition"
      :zoom="17"
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
          class="font-quicksand w-40 text-red-700 hover:text-white border border-red-700 hover:bg-red-800 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mb-2"
        >
          Ver descripción
        </button>
        <button
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
import { getNameApi } from "@/components/Viajes/helpers/ApiPlaceName"
import LocalitationIcon from "@/components/icons/LocalitationIcon"

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
    }
  },
  methods: {
    SelectedPlace(event) {
      console.log(event.placeId)
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
        this.CurrentNamePlace = data.result.name
        this.isEmpyCurrenName = false
      } catch (e) {
        console.log(e.message)
      }
    },
  },
  created() {
    this.$getLocation()
      .then((coordinates) => {
        this.relativePosition = { lat: coordinates.lat, lng: coordinates.lng }
      })
      .catch((error) => {
        console.log(`El error es este: ${error}`)
      })
  },
}
</script>

<style></style>
