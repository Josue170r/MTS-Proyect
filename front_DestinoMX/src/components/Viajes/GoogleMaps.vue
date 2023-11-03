<template>
  <div class="h-screen w-full">
    <div
      class="flex rounded-lg items-center justify-center bg-orange-300 w-full"
    >
      <BackButton class="mx-2" />
      <h1 class="text-white py-8 text-center text-xl">
        ¡Explora lugares cerca de ti!
      </h1>
    </div>
    <GoogleMap
      @click="SelectedPlace"
      :api-key="apiKey"
      mapTypeId="terrain"
      style="width: 100%; height: 90%"
      :center="relativePosition"
      :zoom="17"
    >
      <Marker :options="{ position: relativePosition }" />
    </GoogleMap>
    <div class="flex rounded-lg items-center justify-center bg-white w-full">
      <h1 class="text-gray-800 py-8 text-center text-xl">
        {{ CurrentNamePlace }}
      </h1>
    </div>
  </div>
</template>

<script>
import { GoogleMap, Marker } from "vue3-google-map"
import BackButton from "@/components/buttons/BackButton"
import { getNameApi } from "@/components/Viajes/helpers/ApiPlaceName"

export default {
  name: "GoogleMaps",
  components: {
    GoogleMap,
    Marker,
    BackButton,
  },
  data() {
    return {
      apiKey: "AIzaSyA7zLTbiIG9CpbTiNfZMQZZUoPMo8kbh70",
      CurrentNamePlace: "",
      relativePosition: "",
      localitation: "",
      currentPlace: "",
    }
  },
  methods: {
    SelectedPlace(event) {
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
