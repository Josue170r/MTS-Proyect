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
      :center="$route.query.placeID ? relativePosition : actuallyPosition"
      :zoom="18"
    >
      <Polyline v-if="showRoute" :options="flightPath" />
      <Marker :options="{ position: actuallyPosition }" />
      <Marker
        v-if="$route.query.placeID"
        :options="{ position: relativePosition, icon: customMarkerIcon }"
      />
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
    this.$getLocation()
      .then((coordinates) => {
        // Utilizar las coordenadas recibidas o las coordenadas actuales si no hay error
        this.actuallyPosition = {
          lat: coordinates.lat,
          lng: coordinates.lng,
        }
        if (this.$route.query.placeID) {
          this.SelectedPlace()
          this.relativePosition = {
            lat: Number(this.$route.query.lat),
            lng: Number(this.$route.query.lng),
          }
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
  unmounted() {
    this.$route.query.placeID = ""
  },
  data() {
    return {
      customMarkerIcon: {
        fillColor: "#FF0000",
        fillOpacity: 1,
        scale: 0.8,
        strokeColor: "#6BC4FF",
        strokeWeight: 3,
      },
      apiKey: "AIzaSyAhwwoDK1RzWm2uMdhGCnTIhRFGWN9GDFI",
      isEmpyCurrenName: true,
      CurrentNamePlace: "",
      actuallyPosition: "",
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
      this.placeLats = event
        ? event.latLng.lat()
        : Number(this.$route.query.lat)
      this.placeLongs = event
        ? event.latLng.lng()
        : Number(this.$route.query.lng)
      this.placeID = event ? event.placeId : this.$route.query.placeID
      let destination = {
        latdestino: this.placeLats,
        lngdestino: this.placeLongs,
      }
      this.getNamePlace(this.placeID)
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
      console.log(Destination)
      console.log(this.actuallyPosition)
      let { latdestino, lngdestino } = Destination
      let { lat, lng } = this.actuallyPosition
      try {
        const { data } = await apiFromBackend.get("/api/routePlace", {
          params: {
            origin: `${lat}, ${lng}`,
            destination: `${latdestino}, ${lngdestino}`,
          },
        })
        console.log(data)
        let apiRoutes = data.routes[0].legs[0]
        this.distance = apiRoutes.distance.text
        this.duration = apiRoutes.duration.text
        let steps = apiRoutes.steps
        let stepsArray = []
        stepsArray[0] = toRaw(this.actuallyPosition)
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
