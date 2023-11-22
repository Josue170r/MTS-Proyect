<template>
  <div :class="[isLoading ? 'fixed opacity-50' : '...']">
    <div class="min-h-screen w-full flex flex-col md:flex-row">
      <div class="relative z-50 md:w-1/2 md:order-1">
        <div class="absolute top-6 right-2 transform -translate-x-1">
          <AvatarButton />
        </div>
        <div>
          <BurgerMenu />
        </div>
        <div
          class="mt-24 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-2 bg-white rounded-full flex items-center shadow-md"
        >
          <input
            v-model="namePlaceToFind"
            type="text"
            class="w-48 p-2 outline-none border-none rounded-full"
            placeholder="Buscar..."
            @input="FindPlacesFromInput"
          />
          <ul
            class="mt-[450px] absolute w-56 bg-white rounded-md shadow-md overflow-hidden"
            v-if="places.length > 0"
          >
            <li
              v-for="(place, index) in places.slice(0, 6)"
              :key="index"
              class="py-2 border-b last:border-b-0"
            >
              <div
                class="transition-all duration-300 ease-in-out hover:bg-gray-200 hover:text-gray-800"
              >
                <button class="text-black py-2 px-4">
                  <div class="flex items-center">
                    <img :src="place.icon" />
                    <div class="px-2 flex items-center">
                      <h1 class="text-sm text-lowercase">
                        {{ place.name }}
                      </h1>
                    </div>
                  </div>
                </button>
              </div>
            </li>
          </ul>
        </div>
        <img
          src="@/assets/images/imagen003.png"
          alt="imagen003"
          class="w-full h-full object-cover"
        />
      </div>
      <div class="md:w-1/2 md:order-2">
        <div class="flex items-center justify-center w-full flex-col">
          <h1 class="text-xl text-center mt-4">Usted está aqui</h1>
          <GoogleMap
            @click="goToMapScreen"
            :api-key="apiKey"
            mapTypeId="terrain"
            :class="[
              'w-full',
              'md:w-3/4',
              'lg:w-2/3',
              'xl:w-1/2',
              'h-64',
              'md:h-60',
              'lg:h-80',
              'xl:h-100',
            ]"
            style="border-radius: 20px; width: 88%; overflow: hidden"
            :center="relativePosition"
            :zoom="14"
          >
            <Marker :options="{ position: relativePosition }" />
          </GoogleMap>
          <div class="flex items-center justify-center w-full flex-col mb-8">
            <h1 class="text-xl text-center mt-8">Explora cerca de ti</h1>
            <div
              class="flex items-center justify-center w-full flex-col mr-4 ml-4"
            >
              <div
                class="flex justify-center items-center flex-col"
                v-if="isLoading"
              >
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
                  <div class="mt-4 flex items-center justify-between flex-col">
                    <img
                      @click="goToPlaceDescription(place)"
                      :src="placeImages[index]"
                      :alt="place.name"
                      class="mx-8 rounded-lg mt-2"
                    />
                    <p class="mt-4">{{ place.name }}</p>
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
      </div>
    </div>
  </div>
</template>

<script>
import { toRaw } from "vue"
import AvatarButton from "@/components/buttons/AvatarButton"
import { GoogleMap, Marker } from "vue3-google-map"
import BurgerMenu from "@/components/buttons/BurgerMenu"
import { toast } from "vue3-toastify"
import { getApiPreferences } from "@/components/Viajes/helpers/ApiPreferences"
import { Swiper, SwiperSlide } from "swiper/vue"
import { Pagination } from "swiper/modules"
import { getImgPlaceApi } from "@/components/images/helpers/getImagePlace"
import "swiper/css"
import "swiper/css/pagination"
import { getSearchPlaceApi } from "@/helpers/ApiSearchPlace"
import { apiFromBackend } from "@/helpers/ApiFromBackend"

export default {
  name: "homeScreen",
  components: {
    AvatarButton,
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
      radio: 900,
      nearPlaces: [],
      photosReferences: [],
      placeImages: [],
      isLoading: true,
      showModal: false,
      searchResults: [],
      namePlaceToFind: "",
      places: [],
      showPlacesList: false,
      iconPlaceToFind: [],
    }
  },
  created() {
    this.$getLocation()
      .then((coordinates) => {
        this.relativePosition = { lat: coordinates.lat, lng: coordinates.lng }
        this.getArrayPlaces()
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
        //console.log(this.nearPlaces)
        console.log(this.nearPlaces)
        this.getNearImages()
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
    async FindPlacesFromInput() {
      try {
        const response = await getSearchPlaceApi.get("", {
          params: {
            query: this.namePlaceToFind,
            key: this.apiKey,
          },
        })
        console.log("Desde la API", response)
        this.places = response.data.results
        console.log(this.response.data.results)
        this.iconPlaceToFind = response.data.result.place.icon
        console.log("Icono")
      } catch (error) {
        console.log("Todo bien")
      }
    },
    async loginJWT() {
      try {
        const response = await apiFromBackend.post("/api/cuenta-activa")
        console.log("Respuesta exitosa:", response)

        // Aquí puedes manejar la respuesta exitosa, por ejemplo, actualizar el estado en el frontend.
      } catch (error) {
        if (error.response) {
          // El servidor respondió con un status diferente de 2xx
          console.error("Respuesta de error del servidor:", error.response.data)
          toast(error.response.data.mensaje, {
            hideProgressBar: true,
            autoClose: 1500,
            type: "error",
            theme: "colored",
          })
        } else if (error.request) {
          // La solicitud fue hecha pero no se recibió respuesta
          console.error("No se recibió respuesta del servidor:", error.request)
          toast("No se recibió respuesta del servidor", {
            hideProgressBar: true,
            autoClose: 1500,
            type: "error",
            theme: "colored",
          })
        } else {
          // Ocurrió un error durante la configuración de la solicitud
          console.error(
            "Error durante la configuración de la solicitud:",
            error.message,
          )
          toast("Error durante la configuración de la solicitud", {
            hideProgressBar: true,
            autoClose: 1500,
            type: "error",
            theme: "colored",
          })
        }
      }
    },
  },
  setup() {
    return {
      modules: [Pagination],
    }
  },
  verificar: {},
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
