<template>
  <div id="app">
    <!-- Contenedor de la imagen de fondo -->
    <div class="relative">
      <!-- Contenedor del botón de avatar -->
      <div class="absolute top-6 right-2 transform -translate-x-1">
        <AvatarButton />
      </div>
      <div>
        <BurgerMenu />
      </div>

      <!-- Contenedor de la barra de búsqueda y botón -->
      <div
        class="mt-24 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-2 bg-white rounded-md flex items-center"
      >
        <!-- Barra de búsqueda -->
        <input
          type="text"
          class="w-48 p-2 outline-none border-none bg-white"
          placeholder="Buscar..."
        />
        <button>
          <SearchIcon />
        </button>
      </div>

      <img
        src="@/assets/images/imagen003.png"
        alt="imagen003"
        class="w-full h-full object-cover"
      />
    </div>
    <div class="flex items-center justify-center w-full flex-col">
      <h1 class="text-xl text-center">Usted está aqui</h1>
      <GoogleMap
        @click="goToMapScreen"
        :api-key="apiKey"
        mapTypeId="terrain"
        style="width: 88%; height: 210px; border-radius: 20px; overflow: hidden"
        :center="relativePosition"
        :zoom="14"
      >
        <Marker :options="{ position: relativePosition }" />
      </GoogleMap>
    </div>

    <div class="flex items-center justify-center w-full flex-col">
      <h1 class="text-xl text-center mt-4">Explora cerca de ti</h1>
      <swiper
        :slides-per-view="3"
        :space-between="5"
        :pagination="{
          clickable: true,
          el: '.swiper-pagination-custom',
        }"
        :modules="modules"
        class="swiper-slide"
      >
        <swiper-slide v-for="place in nearPlaces" :key="place">
          <p class="font-calibri mt-8">{{ place.name }}</p>
          <!-- <img
            v-for="image in nearPlaces"
            :key="image"
            :src="image.photos.photo_reference"
            alt="PlaceImage"
            class="mb-2"
          /> -->
          <!-- <p class="font-quicksand">Rating: {{ place.rating }}</p> -->
        </swiper-slide>
      </swiper>
    </div>
  </div>
</template>

<script>
import { toRaw } from "vue"
import AvatarButton from "@/components/buttons/AvatarButton"
import SearchIcon from "@/components/icons/SearchIcon"
import { GoogleMap, Marker } from "vue3-google-map"
import BurgerMenu from "@/components/buttons/BurgerMenu"
import { toast } from "vue3-toastify"
import { getApiPreferences } from "@/components/Viajes/helpers/ApiPreferences"
import { Swiper, SwiperSlide } from "swiper/vue"
import { Pagination } from "swiper/modules"
import { getImgPlaceApi } from "@/components/images/helpers/getImagePlace"
import "swiper/css"
import "swiper/css/pagination"
export default {
  name: "homeScreen",
  components: {
    AvatarButton,
    SearchIcon,
    GoogleMap,
    Marker,
    BurgerMenu,
    Swiper,
    SwiperSlide,
  },
  data() {
    return {
      apiKey: "AIzaSyA7zLTbiIG9CpbTiNfZMQZZUoPMo8kbh70",
      relativePosition: "",
      preference: "restaurant",
      radio: 300,
      nearPlaces: [],
      photosReferences: [],
      placeImages: [],
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
    setTimeout(() => {
      this.getArrayPlaces()
      this.getNearImages()
    }, 2000)
  },
  methods: {
    goToMapScreen() {
      this.$router.push({
        name: "mapa-interactivo",
      })
    },
    async getArrayPlaces() {
      let { lat, lng } = this.relativePosition
      try {
        const { data } = await getApiPreferences.get("/json", {
          params: {
            location: `${lat}, ${lng}`,
            radius: this.radio,
            type: this.preference,
            key: this.apiKey,
          },
        })
        this.nearPlaces = toRaw(data.results)
        this.nearPlaces.forEach((place) => {
          if (place.photos && place.photos.length > 0) {
            this.photosReferences.push(place.photos[0].photo_reference)
          }
        })
        console.log("Arreglo de referencias:", this.photosReferences)
        // console.log("Arreglo de lugares:", this.photosReferences)
      } catch (error) {
        toast.error("No se obtuvo el arreglo de lugares", {
          theme: "colored",
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 1500,
          hideProgressBar: true,
        })
      }
    },
    async getNearImages() {
      try {
        const imageURLs = []
        for (const photoReference of this.photosReferences) {
          const response = await getImgPlaceApi.get("/photo", {
            params: {
              maxwidth: "400",
              photoreference: photoReference,
              key: this.apiKey,
            },
            responseType: "blob",
          })
          const imgUrl = URL.createObjectURL(response.data)
          imageURLs.push(imgUrl)
        }
        this.placeImages = toRaw(imageURLs)
        console.log("Desde getNearImages:", imageURLs)
      } catch (error) {
        toast.error("Ha ocurrido algún error", {
          theme: "colored",
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 1500,
          hideProgressBar: true,
        })
      }
    },
  },
  setup() {
    return {
      modules: [Pagination],
    }
  },
}
</script>

<style scoped>
/* Personaliza la paginación para posicionarla debajo de las imágenes y hacerla más grande */
.swiper-slide {
  /* Elimina el fondo de cada slide */
  background: transparent;
  text-align: center;
  font-size: 18px;

  /* Center slide content vertically */
  display: flex;
  justify-content: center;
  align-items: center;
}

.swiper-slide img {
  display: block;
  width: 100%;
  height: 200px;
  object-fit: cover;
  background: transparent;
}
</style>
