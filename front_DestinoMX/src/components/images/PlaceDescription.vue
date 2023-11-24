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
          class="opacity-100 rounded-t-xl rounded-b-xl"
        />
      </div>
      <div v-else>
        <router-link
          :to="{ name: 'mapa-interactivo' }"
          class="button absolute top-7 left-1 transform"
          ><BackButton
        /></router-link>
        <img src="@/assets/images/noimages.jpg" alt="Imagen por defecto" />
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

      <div>
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
          v-if="about"
          class="ml-3 mr-1 text-black font-quicksand py-0 text-left text-sm"
        >
          <p class="mt-2 mb-2 font-quicksand">
            {{ about }}
          </p>
        </div>
        <div v-else>
          <p class="mt-4">
            {{
              "Más información sobre el clima o datos del lugar (por definir)"
            }}
          </p>
        </div>
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
        <h1 class="ml-3 mb-4 text-black py-1 text-left text-sm font-bold">
          {{ "Galería de imágenes" }}
        </h1>
        <!-- Agrega el componente GalleryImages aquí -->
        <GalleryImages class="mb-4" :photosArray="placeImages" />
      </div>
      <div class="flex justify-center mt-4">
        <button
          class="flex flex-row font-quicksand py-1 px-1 rounded-lg text-gray text-base font-semibold mr-3 ml-3 mb-4 mt-6 bg-pink-300"
        >
          <div class="flex items-center">
            <span>Favoritos</span>
            <FavoriteIcon class="ml-1" />
          </div>
        </button>

        <button
          class="flex font-quicksand py-1 px-1 rounded-lg text-gray text-base font-semibold mr-3 ml-3 mb-4 mt-6 bg-green-300"
          @click="PopUpAddTrip"
        >
          <div class="flex items-center">
            <span>Añadir a viaje</span>
            <AddIcon class="ml-1" />
          </div>
        </button>
        <PopUpAddTrip v-if="showPopup" @close-popup="hideAddToTripPopup" />
      </div>
    </div>
  </div>
</template>

<script>
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
import PopUpAddTrip from "@/components/Viajes/PopUpAddTrip.vue"
import { apiFromBackend } from "@/helpers/ApiFromBackend"

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
    PopUpAddTrip,
  },
  data() {
    return {
      placeImage: "",
      placePhotoReference: "",
      placeName: "",
      location: "",
      rating: "",
      about: "",
      lat: "",
      long: "",
      placeWeather: "",
      imageReferences: [],
      selectedReferences: [],
      placePhotosReferences: [],
      placeImages: [],
      showPopup: false,
    }
  },
  created() {
    this.placeiD = this.$route.query.placeid
    this.getNamePlace(this.placeiD).then(() => {
      this.getWeather()
      this.getImgPlace()
      this.getImgsPlaces()
    })
  },
  methods: {
    async getWeather() {
      try {
        const { data } = await apiFromBackend.get("/api/Weather", {
          params: {
            lat: "19.606069",
            lon: "-98.971432",
          },
        })
        this.placeWeather = parseInt(data.main.temp - 273.15)
        console.log("Desde getWeather: ", data)
      } catch (e) {
        toast.error("Ha ocurrido algún error", {
          theme: "colored",
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 1500,
          hideProgressBar: true,
        })
      }
    },
    async getNamePlace(placeID) {
      try {
        const { data } = await apiFromBackend.get("/api/placeName", {
          params: {
            place_id: placeID,
          },
        })
        console.log("Desde getNamePlace: ", data)
        this.placeName = data.result.name
        this.lat = data.result.geometry.location.lat
        this.long = data.result.geometry.location.lng
        this.imageReferences = data.result.photos.map(
          (photo) => photo.photo_reference,
        )
        this.placePhotoReference = data.result.photos[0].photo_reference
        this.location = data.result.vicinity
        this.rating = data.result.rating
        const startingIndex = 1 // Índice de la segunda imagen
        this.placePhotosReferences = this.imageReferences.slice(startingIndex)
        this.about = data.result.editorial_summary.overview
        console.log(this.placePhotosReferences)
        return data
      } catch (error) {
        console.log(error.message)
      }
    },
    async getImgPlace() {
      try {
        const img = await apiFromBackend.get("/api/imgPlace", {
          params: {
            maxwidth: "400",
            photoreference: this.placePhotoReference,
          },
        })
        this.placeImage = toRaw(img.request.responseURL)
        console.log("Desde getImgPlace: ", this.placeImage)
      } catch (error) {
        toast.error("No hay imágenes disponibles", {
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
          const response = await apiFromBackend.get("/api/imgPlace", {
            params: {
              maxwidth: "400",
              photoreference: photoReference, // Usa la referencia de foto actual
            },
            responseType: "blob", // Establece el tipo de respuesta como blob
          })

          // Convierte la respuesta blob a una URL
          const imgUrl = URL.createObjectURL(response.data)
          imageUrls.push(imgUrl)
        }

        // Ahora imageUrls contiene todas las URLs de las imágenes
        this.placeImages = toRaw(imageUrls)
        console.log("Desde getImgsPlaces:", this.placeImages)
      } catch (e) {
        toast.error(e, {
          theme: "colored",
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 1500,
          hideProgressBar: true,
        })
      }
    },

    PopUpAddTrip() {
      this.showPopup = true
    },
    hideAddToTripPopup() {
      this.showPopup = false
    },
  },
}
</script>
