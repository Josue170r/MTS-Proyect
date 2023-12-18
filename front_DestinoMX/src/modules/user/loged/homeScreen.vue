<template>
  <div>
    <div class="min-h-screen w-full flex flex-col md:flex-row">
      <div class="relative z-50 md:w-1/2 md:order-1">
        <div class="absolute top-6 right-2 transform -translate-x-1">
          <AvatarButton />
        </div>
        <div>
          <BurgerMenu />
        </div>
        <div
          class="mt-24 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-2 bg-white flex items-center shadow-md"
          :class="[
            places.length > 5
              ? 'rounded-t-xl rounded-b-xl'
              : 'rounded-t-xl rounded-b-xl',
          ]"
        >
          <div class="relative">
            <div class="flex items-center">
              <input
                v-model="namePlaceToFind"
                type="text"
                class="w-64 md:w-96 px-2 py-2 outline-none border-none flex-grow mr-2"
                placeholder="Busca tu próximo DestinoMX ..."
                @input="FindPlacesFromInput"
              />
              <button v-if="namePlaceToFind.length > 0" @click="closeSearch">
                <CloseIcon class="text-left" />
              </button>
            </div>
            <ul
              ref="placesList"
              class="absolute w-72 mt-3 mr-8 bg-white rounded-b shadow-md overflow-hidden rounded-md"
              v-if="places.length > 5 && showSearch"
            >
              <li
                v-for="(place, index) in places.slice(0, 5)"
                :key="index"
                class="w-full py-2 border-b last:border-b-0 transition duration-300 ease-in-out hover:bg-orange-100 focus:bg-orange-200"
              >
                <div>
                  <button
                    class="w-full py-2 px-4 transition-all duration-300 ease-in-out hover:bg-orange-100 hover:text-gray-800 focus:text-gray-800 rounded-md transition duration-300 ease-in-out transform-gpu"
                    :class="{
                      'bg-orange-100 text-gray-800 focus:text-gray-800':
                        isSelected,
                    }"
                    @click="handleButtonClick"
                  >
                    <div class="flex items-center">
                      <img
                        :src="place.icon"
                        class="w-6 h-6 brightness object-cover rounded-md mr-2"
                      />
                      <div class="flex flex-col">
                        <h1
                          class="text-sm text-lowercase text-left cursor-pointer transition-all duration-300 ease-in-out transform-gpu"
                          @click="goToPlaceDescriptionFromSearch(place)"
                        >
                          {{ place.name }}
                        </h1>
                        <h1 class="text-sm text-gray-500">
                          {{ place.address }}
                        </h1>
                      </div>
                    </div>
                  </button>
                </div>
              </li>
            </ul>
          </div>
        </div>
        <img
          src="@/assets/images/imagen003.png"
          alt="imagen003"
          class="w-full h-full object-cover"
        />
      </div>
      <div class="md:w-1/2 md:order-2">
        <div class="flex items-center justify-center w-full flex-col">
          <h1 class="text-xl text-center mt-2 mb-2">Usted está aqui</h1>
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
          <div
            class="flex flex-col items-center justify-center mt-8 bg-gray-50 p-4 rounded-lg"
            v-if="preference.length === 0"
          >
            <BellIcon />
            <h1 class="text-gray-800 py-6 text-center text-xl font-bold">
              ¡Vaya! <br />
              Aún no tienes preferencias
            </h1>

            <button
              type="button"
              @click="goToPreferencesScreen"
              class="block w-64 mt-2 rounded-r-md py-4 rounded-lg text-black font-semibold bg-orange-300 mb-2"
            >
              Elegir preferencias
            </button>
          </div>
          <div class="flex items-center justify-center w-full flex-col mb-8">
            <h1
              v-if="preference.length !== 0"
              class="text-xl text-center mt-2 mb-2"
            >
              Explora cerca de ti
            </h1>
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
                  <div
                    class="mt-4 flex items-center justify-between flex-col mb-4"
                  >
                    <img
                      @click="goToPlaceDescription(place)"
                      :src="placeImages[index]"
                      :alt="place.name"
                      class="mx-8 rounded-lg mt-2"
                    />
                    <h1 class="text-md text-center mt-2 mb-2">
                      {{ place.name }}
                    </h1>
                    <v-rating
                      half-increments
                      hover
                      :length="5"
                      :size="16"
                      :model-value="place.rating"
                      readonly
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
import { Swiper, SwiperSlide } from "swiper/vue"
import { Pagination } from "swiper/modules"
import "swiper/css"
import "swiper/css/pagination"
import { apiFromBackend } from "@/helpers/ApiFromBackend"
import CloseIcon from "@/components/icons/CloseIcon.vue"
import BellIcon from "@/components/icons/BellIcon.vue"

export default {
  name: "homeScreen",
  components: {
    AvatarButton,
    GoogleMap,
    Marker,
    BurgerMenu,
    Swiper,
    SwiperSlide,
    CloseIcon,
    BellIcon,
  },
  data() {
    return {
      apiKey: "AIzaSyBmZXrvgoPOwG1kNIHtND761VmqQSx4NXA",
      relativePosition: "",
      preference: [],
      radio: 400,
      nearPlaces: [],
      photosReferences: [],
      placeImages: [],
      isLoading: true,
      showModal: false,
      showSearch: true,
      searchResults: [],
      namePlaceToFind: "",
      places: [],
      iconPlaceToFind: [],
      filteredPlaces: [],
      isSelected: false,
    }
  },
  created() {
    this.$getLocation()
      .then((coordinates) => {
        this.relativePosition = { lat: coordinates.lat, lng: coordinates.lng }
        this.getArrayPlacesPreferences()
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
    async getArrayPlacesPreferences() {
      try {
        const { data } = await apiFromBackend.get("/api/leer-Preferencias")
        this.preference = data.idTypesArray
        console.log(this.preference)
        this.getArrayPlaces()
      } catch ({ response }) {
        if (response.data.mensaje === "No hay preferencias configuradas.") {
          this.getArrayPlaces()
        }
      }
    },
    closeSearch() {
      this.showSearch = false
      this.namePlaceToFind = ""
      this.places = []
      this.filteredPlaces = []
      this.showSearch = true
    },
    handleButtonClick() {
      this.isSelected = !this.isSelected
    },
    goToMapScreen() {
      this.$router.push({
        name: "mapa-interactivo",
      })
    },
    goToPreferencesScreen() {
      this.$router.push({
        name: "Preferences-Screen",
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
    goToPlaceDescriptionFromSearch(place) {
      const placeId = place.place_id
      this.$router.push({
        name: "placedescription",
        query: {
          placeid: placeId,
        },
      })
    },
    async getArrayPlaces() {
      this.isLoading = true
      let { lat, lng } = this.relativePosition
      try {
        for (let i = 0; i < this.preference.length; i++) {
          const { data } = await apiFromBackend.get("/api/nearBySearh", {
            params: {
              location: `${lat}, ${lng}`,
              radius: this.radio,
              type: this.preference[i],
            },
          })
          if (data.results.length != 0) {
            this.nearPlaces.push(...Object.values(data.results))
          }
        }
        const uniqueNearPlaces = new Set(
          this.nearPlaces.map((place) => place.reference),
        )
        this.nearPlaces = Array.from(uniqueNearPlaces).map((reference) => {
          return this.nearPlaces.find((place) => place.reference === reference)
        })

        this.nearPlaces = this.nearPlaces.slice(0, 25)

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
      } catch (error) {
        console.log(error)
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
        console.log(this.photosReferences)
        for (const photoReference of this.photosReferences) {
          const response = await apiFromBackend.get("/api/imgPlace", {
            params: {
              maxwidth: "400",
              photoreference: photoReference,
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
        const response = await apiFromBackend.get("/api/searchPlace", {
          params: {
            query: this.namePlaceToFind,
          },
        })
        console.log("Desde la API", response)
        this.places = response.data.results
        console.log(this.response.data.results)
        this.iconPlaceToFind = response.data.result.place.icon
        console.log("Icono")
        this.filteredPlaces = this.places
          .filter((place) =>
            place.name
              .toLowerCase()
              .includes(this.namePlaceToFind.toLowerCase()),
          )
          .slice(0, 6)
      } catch (error) {
        console.log("Todo bien")
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

.brightness {
  filter: brightness(0%);
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
