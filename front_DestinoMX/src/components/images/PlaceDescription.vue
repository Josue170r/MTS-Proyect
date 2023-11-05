<template>
  <div class="min-h-screen w-full flex flex-col md:flex-row bg-gray-100">
    <div
      class="flex md:w-1/2 justify-center items-center md:bg-orange-300 bg-gray-200"
    >
      <!-- imagen -->
      <div v-if="placeImage">
        <!-- botón para regresar -->
        <router-link
          :to="{ name: 'mapa-interactivo' }"
          class="button absolute top-7 left-1 transform"
          ><BackButton
        /></router-link>
        <img
          :src="placeImage"
          alt="Imagen del lugar"
          class="opacity-100 rounded-t-xl rounded-b-xl w-full"
        />
      </div>
      <div v-else>
        <img src="./noimages.jpg" alt="Imagen por defecto" />
      </div>
    </div>
    <div
      class="h-[600px] sm:flex flex-col md:w-1/2 flex-1 justify-center bg-gray-100 mt-0 sm:h-[700px]"
    >
      <div class="flex flex-row ml-2 mr-0">
        <!-- Nombre y Compartir-->
        <h1 class="ml-3 text-orange-500 py-3 text-left text-xl font-bold">
          {{ placeName }}
        </h1>
        <button class="ml-0 mr-2 py-3">
          <ShareIcon />
        </button>
      </div>

      <div class="flex flex-row ml-2 mr-0">
        <!-- Dirección -->
        <LocalitationIcon2 />
        <div class="ml-0 underline text-blue-800 text-left text-xs">
          {{ location }}
        </div>
        <!-- Rating -->
        <div class="flex flex-row ml-1 mr-0">
          <RatingIcon />
          <div class="ml-0 mr-4 text-black-900 text-left text-sm">
            {{ rating }}
          </div>
        </div>
      </div>

      <!-- Acerca de -->

      <div v-if="about">
        <div class="flex flex-col">
          <h1 class="ml-3 text-black py-1 text-left text-sm font-bold">
            {{ "Acerca de" }}
          </h1>
          <div class="flex flex-row items-center text-sm py-0 px-0 ml-auto">
            <WeatherIcon class="mr-2" />
            {{ placeWeather }}
            <p class="mr-4">{{ "°C" }}</p>
          </div>
        </div>

        <div
          class="ml-3 mr-1 text-black font-Baskerville py-0 text-left text-sm"
        >
          <p>
            {{ about }}
          </p>
        </div>
      </div>
      <div v-else>
        <p class="mt-4">
          {{ "Más información sobre el clima o datos del lugar (por definir)" }}
        </p>
      </div>

      <!-- Botón de reseñas -->
      <button
        class="flex flex-row font-quicksand py-1 px-1 rounded-lg text-gray text-base font-semibold mr-2 ml-auto bg-orange-300"
      >
        <div class="flex items-center">
          <span>Reseñas</span>
          <ForwardIcon class="ml-1" />
        </div>
      </button>

      <!-- Galería -->
      <div class="h-[600] sm:flex flex-col mt-2 sm:h-[400px]">
        <h1 class="ml-3 text-black py-1 text-left text-sm font-bold">
          {{ "Galería de imágenes" }}
        </h1>
        <!-- Agrega el componente GalleryImages aquí -->
        <GalleryImages class="mb-4" />
      </div>
      <div class="flex justify-center mt-4">
        <button
          class="flex flex-row font-quicksand py-1 px-1 rounded-lg text-gray text-base font-semibold mr-3 ml-3 mb-4 bg-pink-300"
        >
          <div class="flex items-center">
            <span>Favoritos</span>
            <FavoriteIcon class="ml-1" />
          </div>
        </button>

        <button
          class="flex font-quicksand py-1 px-1 rounded-lg text-gray text-base font-semibold mr-3 ml-3 mb-4 bg-green-300"
        >
          <div class="flex items-center">
            <span>Añadir a viaje</span>
            <AddIcon class="ml-1" />
          </div>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { getImgPlaceApi } from "@/components/images/helpers/getImagePlace"
import { getWeatherPlace } from "@/components/images/helpers/getWeatherPlace"
import { toRaw } from "vue"
import LocalitationIcon2 from "@/components/icons/LocalitationIcon2.vue"
import RatingIcon from "@/components/icons/RatingIcon.vue"
import ShareIcon from "@/components/icons/ShareIcon.vue"
import ForwardIcon from "@/components/icons/ForwardButtonIcon.vue"
import BackButton from "@/components/buttons/BackButton"
import FavoriteIcon from "@/components/icons/FavoriteIcon.vue"
import AddIcon from "@/components/icons/AddIcon.vue"
import WeatherIcon from "@/components/icons/WeatherIcon.vue"
import GalleryImages from "@/components/images/GalleryImages.vue"
import { toast } from "vue3-toastify"
import "vue3-toastify/dist/index.css"

export default {
  name: "PlaceDescription",
  components: {
    LocalitationIcon2,
    RatingIcon,
    ShareIcon,
    ForwardIcon,
    FavoriteIcon,
    AddIcon,
    WeatherIcon,
    GalleryImages,
    BackButton,
  },
  data() {
    return {
      placeImage: "",
      apiKey: "AIzaSyA7zLTbiIG9CpbTiNfZMQZZUoPMo8kbh70",
      apiKey2: "a4e3d3b9019328f729700ec96a75dc66",
      placePhotoReference: "",
      placeName: "",
      location: "",
      rating: "",
      about: "",
      lat: "",
      long: "",
      placeWeather: "",
      placePhotosReferences: [],
      placeImages: [],
    }
  },
  created() {
    this.placePhotoReference = this.$route.query.photos
    this.placePhotosReferences = this.$route.query.photosrefs
    this.getImgPlace()
    this.getImgsPlaces()
    this.placeName = this.$route.query.names
    this.location = this.$route.query.locations
    this.rating = this.$route.query.ratings
    this.about = this.$route.query.abouts
    this.lat = this.$route.query.lats
    this.long = this.$route.query.longs
    this.getWeather()
  },
  methods: {
    async getImgPlace() {
      try {
        const img = await getImgPlaceApi.get("/photo", {
          params: {
            maxwidth: "400",
            photoreference: this.placePhotoReference,
            key: this.apiKey,
          },
        })
        this.placeImage = toRaw(img.request.responseURL)
        // console.log(this.placeName)
      } catch (error) {
        toast.error("Ha ocurrido algún error", {
          theme: "colored",
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 1500,
          hideProgressBar: true,
        })
      }
    },
    async getImgsPlaces() {
      try {
        //arreglo para almacenar las URLs
        const imageUrls = []
        // Itera a través de las referencias de fotos
        for (const photoReference of this.placePhotosReferences) {
          const response = await getImgPlaceApi.get("/photo", {
            params: {
              maxwidth: "400",
              photoreference: photoReference, // Usa la referencia de foto actual
              key: this.apiKey,
            },
            responseType: "blob", // Establece el tipo de respuesta como blob
          })

          // Convierte la respuesta blob a una URL
          const imgUrl = URL.createObjectURL(response.data)
          imageUrls.push(imgUrl)
        }

        // Ahora imageUrls contiene todas las URLs de las imágenes
        this.placeImages = imageUrls
        console.log(this.placeImages)
      } catch (e) {
        toast.error("Ha ocurrido algún error", {
          theme: "colored",
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 1500,
          hideProgressBar: true,
        })
      }
    },

    async getWeather() {
      try {
        const { data } = await getWeatherPlace.get("/weather", {
          params: {
            lat: this.lat,
            lon: this.long,
            appid: this.apiKey2,
          },
        })
        this.placeWeather = parseInt(data.main.temp - 273.15)
        //console.log(data)
      } catch (e) {
        toast.error("Ha ocurrido algún error", {
          theme: "colored",
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 1500,
          hideProgressBar: true,
        })
      }
    },
  },
}
</script>
