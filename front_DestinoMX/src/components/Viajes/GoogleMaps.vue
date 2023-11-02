<template>
  <div>
    <p>Google Mpas Component</p>
  </div>
  <div>
    <GoogleMap
      api-key="YOUR_GOOGLE_MAPS_API_KEY"
      style="width: 100%; height: 500px"
      :center="center"
      :zoom="15"
    >
      <Marker :options="{ position: center }" />
    </GoogleMap>
  </div>
</template>

<script>
import { GoogleMap, Marker } from "vue3-google-map";

export default {
  name: "GoogleMaps",
  components: {
    GoogleMap,
    Marker,
  },
  data() {
    return {
      initialPosition: "",
      localitation: "",
    };
  },
  methods: {},
  created() {
    this.$getLocation()
      .then((coordinates) => {
        const center = { lat: 40.689247, lng: -74.044502 };
        this.initialPosition = center;

        console.log(this.initialPosition);
        console.log(coordinates);
      })
      .catch((error) => {
        console.log(`El error es este: ${error}`);
      });
  },
};
</script>

<style></style>
