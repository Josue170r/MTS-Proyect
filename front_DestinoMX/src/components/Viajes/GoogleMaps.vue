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
      :api-key="apiKey"
      style="width: 100%; height: 90%"
      :center="initialPosition"
      :zoom="15"
    >
      <Marker :options="{ position: initialPosition }" />
    </GoogleMap>
  </div>
</template>

<script>
<<<<<<< HEAD
import { GoogleMap, Marker } from "vue3-google-map";
import BackButton from "@/components/buttons/BackButton";
=======
import { GoogleMap, Marker } from 'vue3-google-map'
>>>>>>> 242e0d185c827a47c5ff575ad232a0d3e7ce8524

export default {
  name: 'GoogleMaps',
  components: {
    GoogleMap,
    Marker,
    BackButton,
  },
  data() {
    return {
      apiKey: 'AIzaSyA7zLTbiIG9CpbTiNfZMQZZUoPMo8kbh70',
      initialPosition: '',
      localitation: '',
    }
  },
  methods: {},
  created() {
    this.$getLocation()
      .then((coordinates) => {
        this.initialPosition = { lat: coordinates.lat, lng: coordinates.lng }
        console.log(this.initialPosition)
        console.log(coordinates)
      })
      .catch((error) => {
        console.log(`El error es este: ${error}`)
      })
  },
}
</script>

<style></style>
