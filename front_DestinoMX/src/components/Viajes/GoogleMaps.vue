<template>
  <div>
    <GoogleMap
      :api-key="apiKey"
      class="w-full, h-screen"
      :center="initialPosition"
      :zoom="15"
    >
      <Marker :options="{ position: initialPosition }" />
    </GoogleMap>
  </div>
</template>

<script>
import { GoogleMap, Marker } from 'vue3-google-map'

export default {
  name: 'GoogleMaps',
  components: {
    GoogleMap,
    Marker,
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
