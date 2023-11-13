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
          @click="goToDescriptionPlace"
          class="font-quicksand w-40 text-white border bg-red-800 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mb-2"
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
import { getNameApi } from "@/components/Viajes/helpers/ApiPlaceName"
<<<<<<< HEAD
import { getRouteApi } from "@/components/Viajes/helpers/ApiRoute"
import { getApiPreferences } from "@/components/Viajes/helpers/ApiPreferences"
=======
import { getApiRoute } from "@/components/Viajes/helpers/ApiRoute"
>>>>>>> 9b270d5c45fe00e259b08db37c537e91a43eefbf

export default {
  name: "GoogleMaps",
  components: {
    GoogleMap,
    Marker,
    BackButton,
    LocalitationIcon,
    Polyline,
  },
  data() {
    return {
      apiKey: "AIzaSyA7zLTbiIG9CpbTiNfZMQZZUoPMo8kbh70",
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
      imageReferences: [],
      selectedReferences: [],
<<<<<<< HEAD
      isEmptyVerRuta: true,
      EmptyVerRuta: "",
      preferences: [],
=======
      showRoute: false,
>>>>>>> 9b270d5c45fe00e259b08db37c537e91a43eefbf
    }
  },
  methods: {
    SelectedPlace(event) {
      this.showRoute = false
      this.placeLats = event.latLng.lat()
      this.placeLongs = event.latLng.lng()

      let destination = {
        latdestino: this.placeLats,
        lngdestino: this.placeLongs,
      }

      this.getNamePlace(event.placeId)
      this.getRoute(destination)
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
        console.log(data)
      } catch (e) {
        console.log(e.message)
      }
    },
<<<<<<< HEAD

    async getApiPreferences() {
      try {
        const { data } = await getApiPreferences.get("/json", {
          params: {
            lattitude: this.placeLats,
            longitude: this.placeLongs,
            radius: 10000,
            type: "restaurant",
            apikey: this.apiKey,
          },
        })
        console.log(data)
      } catch (e) {
        console.log(e.message)
=======
    goToDescriptionPlace() {
      this.$router.push({
        name: "placedescription",
        query: {
          photos: this.placePhothos,
          names: this.CurrentNamePlace,
          locations: this.localitation,
          ratings: this.placeRatings,
          lats: this.placeLats,
          longs: this.placeLongs,
          photosrefs: this.selectedReferences,
          abouts: this.placeAbouts,
        },
      })
    },
    async getRoute(Destination) {
      let { latdestino, lngdestino } = Destination
      let { lat, lng } = this.relativePosition
      try {
        const { data } = await getApiRoute.get("", {
          params: {
            origin: `${lat}, ${lng}`,
            destination: `${latdestino}, ${lngdestino}`,
            key: this.apiKey,
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
>>>>>>> 9b270d5c45fe00e259b08db37c537e91a43eefbf
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

  goToDescriptionPlace() {
    this.$router.push({
      name: "placedescription",
      query: {
        photos: this.placePhothos,
        names: this.CurrentNamePlace,
        locations: this.localitation,
        ratings: this.placeRatings,
        lats: this.placeLats,
        longs: this.placeLongs,
        photosrefs: this.selectedReferences,
        abouts: this.placeAbouts,
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
