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
      :style="{ width: '100%', height: isEmpyCurrenName ? '90%' : '74%' }"
      :center="relativePosition"
      :zoom="18"
    >
      <Polyline v-if="showRoute" :options="flightPath" />
      <Marker :options="{ position: relativePosition }" />
      <Marker
        v-if="showRoute"
        :options="{ position: steps[steps.length - 1] }"
      />
    </GoogleMap>
    <div
      v-if="CurrentNamePlace"
      class="flex items-center justify-center bg-neutral-50 flex-col"
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
            Distancia: <span class="font-bold">{{ distance }}</span>
          </h2>
          <h2 class="mx-10 mb-3">
            Tiempo: <span class="font-bold">{{ duration }}</span>
          </h2>
        </div>
      </div>
      <div class="flex justify-around w-full mb-3">
        <button
          class="font-quicksand w-40 text-white border bg-red-800 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mb-2"
          @click="goToDescriptionPlace"
        >
          Ver descripción
        </button>
        <button
          @click="goToRoutePlace"
          class="font-quicksand w-40 text-white bg-red-800 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mb-2"
        >
          Visualizar ruta
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { toRaw } from "vue"
import { GoogleMap, Marker, Polyline } from "vue3-google-map"
import BackButton from "@/components/buttons/BackButton"
import LocalitationIcon from "@/components/icons/LocalitationIcon"
import { toast } from "vue3-toastify"
import { apiFromBackend } from "@/helpers/ApiFromBackend"

export default {
  name: "GoogleMaps",
  components: {
    GoogleMap,
    Marker,
    BackButton,
    LocalitationIcon,
    Polyline,
  },
  created() {
    // Usar las coordenadas recibidas

    this.$getLocation()
      .then((coordinates) => {
        // Utilizar las coordenadas recibidas o las coordenadas actuales si no hay error
        this.relativePosition = {
          lat: coordinates.lat,
          lng: coordinates.lng,
        }
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
  data() {
    return {
      //Pantalla de GoogleMaps normal
      apiKey: "AIzaSyBmZXrvgoPOwG1kNIHtND761VmqQSx4NXA",
      isEmpyCurrenName: true,
      CurrentNamePlace: "",
      relativePosition: "",
      distance: "",
      duration: "",
      flightPath: {},
      localitation: "",
      placePhothos: "",
      placeRatings: "",
      placeAbouts: "",
      placeLats: "",
      placeLongs: "",
      showRoute: false,
      placeID: "",
    }
  },
  methods: {
    SelectedPlace(event) {
      this.showRoute = false
      this.placeLats = event.latLng.lat()
      this.placeLongs = event.latLng.lng()
      this.placeID = event.placeId
      let destination = {
        latdestino: this.placeLats,
        lngdestino: this.placeLongs,
      }
      this.getNamePlace(event.placeId)
      this.getRoute(destination)
    },
    async getNamePlace(placeId) {
      try {
        const { data } = await apiFromBackend.get("/api/placeName", {
          params: {
            place_id: placeId,
          },
        })
        this.CurrentNamePlace = data.result.name
        this.CurrentNamePlace
          ? (this.isEmpyCurrenName = false)
          : (this.isEmpyCurrenName = true)
      } catch (error) {
        console.log(error.message)
      }
    },
    goToDescriptionPlace() {
      this.$router.push({
        name: "placedescription",
        query: {
          placeid: this.placeID,
        },
      })
    },
    async getRoute(Destination) {
      let { latdestino, lngdestino } = Destination
      let { lat, lng } = this.relativePosition
      try {
        const { data } = await apiFromBackend.get("/api/routePlace", {
          params: {
            origin: `${lat}, ${lng}`,
            destination: `${latdestino}, ${lngdestino}`,
          },
        })
        let apiRoutes = data.routes[0].legs[0]
        this.distance = apiRoutes.distance.text
        this.duration = apiRoutes.duration.text
        let steps = apiRoutes.steps
        let stepsArray = []
        stepsArray[0] = toRaw(this.relativePosition)
        steps.forEach((step) => stepsArray.push(step.end_location))
        this.steps = stepsArray
      } catch (error) {
        console("Error en la solicitud de la API de direcciones", error)
      }
    },
    goToRoutePlace() {
      this.showRoute = true
      const flightPlanCoordinates = this.steps
      const flightPath = {
        path: flightPlanCoordinates,
        geodesic: true,
        strokeColor: "#FF4500",
        strokeOpacity: 2.0,
        strokeWeight: 4.5,
      }
      this.flightPath = flightPath
    },
  },
}
</script>
