<template>
  <div :class="[isLoading ? 'fixed opacity-50' : '...']">
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
      <div class="flex items-center justify-center w-full flex-col mr-4 ml-4">
        <div class="flex justify-center items-center flex-col" v-if="isLoading">
          <div
            class="custom-loader mt-16"
            :class="{ 'animate-custom': index === 0 }"
          ></div>
          <h1>Cargando sugerencias</h1>
        </div>

        <swiper
          v-else
          :slides-per-view="3"
          :space-between="10"
          :pagination="{
            clickable: true,
            el: '.swiper-pagination-custom',
          }"
          :modules="modules"
          class="swiper-slide"
        >
          <swiper-slide
            v-for="(place, index) in nearPlaces"
            :key="place"
            class="..."
          >
            <div class="mt-8 mb-6 flex items-center justify-between flex-col">
              <img
                @click="goToPlaceDescription(place)"
                :src="placeImages[index]"
                :alt="place.name"
                class="mx-8 rounded-lg"
              />
              <p class="font-calibri mt-8">{{ place.name }}</p>
              <!-- <p class="mt-4">{{ place.rating }}</p> -->
              <v-rating
                half-increments
                hover
                :length="5"
                :size="16"
                :model-value="place.rating"
                color="rgb(232, 176, 36)"
                active-color="rgb(232, 176, 36)"
              />
            </div>
          </swiper-slide>
        </swiper>
      </div>
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
      isLoading: true,
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
    }, 500)
  },
  methods: {
    goToMapScreen() {
      this.$router.push({
        name: "mapa-interactivo",
      })
    },
    goToPlaceDescription(place) {
      this.$router.push({
        name: "placedescription",
        query: {
          placeid: place.reference,
        },
      })
    },
    async getArrayPlaces() {
      this.isLoading = true
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
        // console.log(this.nearPlaces)
        this.nearPlaces.forEach((place) => {
          if (place.photos && place.photos.length > 0) {
            this.photosReferences.push(place.photos[0].photo_reference)
          } else {
            this.photosReferences.push(
              "AcJnMuGWfw7Ua2fdzEnPQpBetCNLCfkzn7E8w_YU5drBbSnfMSEEdAyMn-D8VA6bk7dWmKRrw1_Qu4_kpwnxYEJLUJcdWa1xx1KBUx3X8vSMHWKFSfi41nv-X-2666CaHtTiXlJw0KB7UhSzltI11Ie3CfLzy8Uq2wvryKcjQI8K7KqORhc6",
            )
          }
        })
        this.getNearImages()
        console.log(this.nearPlaces)
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
        this.isLoading = false
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
.swiper-slide {
  width: 100%;
  background: transparent;
  text-align: center;
  font-size: 18px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.swiper-slide img {
  display: block;
  width: 200px;
  height: 200px;
  object-fit: cover;
  background: transparent;
}

.custom-loader {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  border: 4px solid rgb(232, 176, 36);
  border-top: 4px solid transparent;
  animation: spin 1s linear infinite;
}

.animate-custom {
  animation: bounce 1s infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

@keyframes bounce {
  0%,
  20%,
  50%,
  80%,
  100% {
    transform: translateY(0);
  }
  40% {
    transform: translateY(-20px);
  }
  60% {
    transform: translateY(-10px);
  }
}
</style>
