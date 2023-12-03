<template>
  <div
    class="min-h-screen w-full flex flex-col md:flex-row bg-gray-100"
    :class="[isLoading ? 'fixed opacity-50' : '...']"
  >
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
          @click="hideRatingPopUp"
          :src="placeImage"
          alt="Imagen del lugar"
          class="opacity-100 rounded-t-xl rounded-b-xl max-h-96 w-[400px]"
        />
      </div>
      <div v-else>
        <router-link
          :to="{ name: 'mapa-interactivo' }"
          class="button absolute top-7 left-1 transform"
          ><BackButton
        /></router-link>
        <img
          @click="hideRatingPopUp"
          src="@/assets/images/noimages.jpg"
          alt="Imagen por defecto"
        />
      </div>
    </div>
    <div
      class="h-[600px] sm:flex flex-col md:w-1/2 flex-1 justify-center bg-gray-100 mt-0 sm:h-[700px]"
    >
      <div class="flex mx-4 mr-0" @click="hideRatingPopUp">
        <!-- Nombre y Compartir-->
        <h1 class="text-orange-500 py-3 text-left text-2xl font-bold">
          {{ placeName }}
        </h1>
        <button class="ml-2 py-3 mr-4">
          <ShareIcon />
        </button>
      </div>

      <div
        v-if="location"
        class="ml-3 mx-2 flex flex-row mt-2"
        @click="hideRatingPopUp"
      >
        <!-- Dirección -->
        <LocalitationIcon2 class="mb-3 mr-1" />
        <div class="underline text-blue-800 text-left text-md mt-0.5">
          {{ location }}
        </div>
      </div>
      <div v-if="phone" class="flex flex-row ml-2 mr-0">
        <PhoneIcon class="mb-3 mr-0.3 ml-1" />
        <div class="ml-2 mb-2 text-orange-600 text-left text-md mt-0.5">
          {{ phone }}
        </div>
      </div>
      <div class="flex flex-row ml-2 mr-0" v-if="status">
        <ClockIcon2
          class="mb-3 ml-1 w-5 h-5 text-red-700"
          stroke-width="1.2"
          color-stroke="red"
        />
        <div class="ml-1 text-orange-600 text-left text-md mt-0">
          <div class="flex flex-col">
            {{ status }}
            <div class="flex flex-row">
              <p class="font-quicksand mr-2">Abre a las</p>
              {{ openTime }}
              <p class="font-quicksand ml-2 mr-2">Cierra a las</p>
              {{ closeTime }}
            </div>
          </div>
        </div>
      </div>

      <div class="grid justify-items-end">
        <PopUpRating
          @click="hideRatingPopUp"
          ref="ratingPopup"
          v-if="showPopup2"
          :rating="rating"
          :numratings="reviews.length"
          class="mr-16"
          :style="{
            maxWidth: '100%',
            textAlign: 'center',
            position: 'absolute',
            zIndex: 300,
          }"
        />
      </div>
      <!-- Acerca de -->

      <div>
        <div class="flex flex-row ml-auto items-center justify-end mr-4">
          <h1 class="ml-4 text-black py-1 mr-auto text-lg font-bold mt-2 mb-0">
            {{ "Acerca de" }}
          </h1>
          <button
            ref="ratingButton"
            class="py-1 px-1 rounded-lg text-gray text-base mt-0 mb-0"
          >
            <div class="flex text-md" @click="showPopUpRating">
              <RatingButton class="ml-1 mr-2 mt-0 mb-0" />
              <p class="text-center text-lg mt-1">{{ rating }}</p>
            </div>
          </button>
          <div class="flex text-md mr-2">
            <WeatherIcon class="mr-2" />
            <p class="mr-4 text-lg">{{ placeWeather }} °C</p>
          </div>
        </div>
        <div
          v-if="about"
          class="ml-3 mr-1 text-black font-quicksand py-0 text-left text-sm"
        >
          <p class="mt-0 mb-2 mr-4 font-quicksand text-justify">
            {{ about }}
          </p>
        </div>
        <div v-else>
          <p class="mt-4 mx-4">
            {{
              "Más información sobre el clima o datos del lugar (por definir)"
            }}
          </p>
        </div>
      </div>

      <!-- Galería -->
      <div
        @click="hideRatingPopUp"
        class="h-[600] sm:flex flex-col mt-2 sm:h-[400px]"
      >
        <h1 class="ml-3 mb-4 text-black py-1 text-left text-lg font-bold">
          {{ "Galería de imágenes" }}
        </h1>

        <div class="flex justify-center items-center flex-col" v-if="isLoading">
          <div
            class="custom-loader mt-16"
            :class="{ 'animate-custom': index === 0 }"
          ></div>
          <h1>Cargando imágenes</h1>
        </div>
        <GalleryImages class="mb-4" :photosArray="placeImages" />
      </div>
      <div class="flex justify-center mt-4">
        <button
          :class="[isInFavorites ? 'opacity-60 cursor-not-allowed' : '...']"
          :disabled="isInFavorites"
          class="flex flex-row font-quicksand py-1 px-1 rounded-lg text-gray text-base font-semibold mr-3 ml-3 mb-4 mt-6 bg-pink-300"
          @click="AddToFavorites"
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

      <!-- Ratings -->

      <div class="mt-4">
        <swiper
          :slidesPerView="1"
          :spaceBetween="2"
          :modules="modules"
          class="swiper-slide mb-8"
        >
          <swiper-slide v-for="review in reviews" :key="review">
            <div class="flex flex-col items-center">
              <div class="flex flex-row ml-1 mr-4 mt-2">
                <v-avatar :image="review.profile_photo_url"></v-avatar>
              </div>
              <div class="flex flex-row ml-1 mr-4 mt-2">
                <h1>{{ review.author_name }}</h1>
              </div>
              <div class="flex flex-row ml-1 mr-4 mt-2">
                <v-rating
                  half-increments
                  hover
                  :length="5"
                  :size="16"
                  :model-value="review.rating"
                  readonly
                  color="rgb(232, 176, 36)"
                  active-color="rgb(232, 176, 36)"
                />
              </div>
              <div class="flex flex-row ml-1 mr-4 mt-2">
                <p class="text-blue-500">
                  {{ review.relative_time_description }}
                </p>
              </div>
              <div class="flex flex-row justify ml-1 mr-4 mt-2">
                <p>{{ review.text }}</p>
              </div>
            </div>
          </swiper-slide>
        </swiper>
      </div>
    </div>
  </div>
</template>

<script>
import { toRaw } from "vue"
import LocalitationIcon2 from "@/components/icons/LocalitationIcon2.vue"
import PhoneIcon from "@/components/icons/PhoneIcon.vue"
import ClockIcon2 from "@/components/icons/ClockIcon2.vue"
import RatingButton from "@/components/buttons/RatingButton.vue"
import ShareIcon from "@/components/icons/ShareIcon.vue"
import BackButton from "@/components/buttons/BackButton"
import FavoriteIcon from "@/components/icons/FavoriteIcon.vue"
import AddIcon from "@/components/icons/AddIcon.vue"
import WeatherIcon from "@/components/icons/WeatherIcon.vue"
import GalleryImages from "@/components/images/GalleryImages.vue"
import { toast } from "vue3-toastify"
import "vue3-toastify/dist/index.css"
import PopUpAddTrip from "@/components/Viajes/PopUpAddTrip.vue"
import PopUpRating from "@/components/Viajes/PopUpRating.vue"
import { apiFromBackend } from "@/helpers/ApiFromBackend"
import { Swiper, SwiperSlide } from "swiper/vue"
import "swiper/css"
import "swiper/css/pagination"
import { Pagination } from "swiper/modules"

export default {
  name: "PlaceDescription",
  components: {
    LocalitationIcon2,
    PhoneIcon,
    ClockIcon2,
    ShareIcon,
    RatingButton,
    FavoriteIcon,
    AddIcon,
    WeatherIcon,
    GalleryImages,
    BackButton,
    PopUpAddTrip,
    PopUpRating,
    Swiper,
    SwiperSlide,
  },
  data() {
    return {
      placeiD: "",
      placeImage: "",
      placePhotoReference: "",
      placeName: "",
      location: "",
      rating: "",
      numratings: "",
      about: "",
      lat: "",
      long: "",
      placeWeather: "",
      phone: "",
      imageReferences: [],
      selectedReferences: [],
      placePhotosReferences: [],
      placeImages: [],
      reviews: [],
      showPopup: false,
      showPopup2: false,
      showRatingPopup: false,
      isInFavorites: false,
      isLoading: true,
    }
  },
  created() {
    this.placeiD = this.$route.query.placeid
    this.getNamePlace(this.placeiD).then(() => {
      this.getImgPlace()
      this.getImgsPlaces()
      this.getWeather()
    })
    this.getFavorites()
  },
  mounted() {
    this.$el.addEventListener("click", this.handleDocumentClick)
  },
  beforeUnmount() {
    this.$el.removeEventListener("click", this.handleDocumentClick)
  },
  methods: {
    async getFavorites() {
      try {
        const { data } = await apiFromBackend.get("/api/favoritos")
        const favorites = data.info
        favorites.forEach((favorite) => {
          if (favorite.idPlaceLugar === this.placeiD) {
            this.isInFavorites = true
          }
        })
      } catch (error) {
        console.log(error)
      }
    },
    async AddToFavorites() {
      try {
        const response = await apiFromBackend.post("/api/favoritos", {
          idPlaceLugar: this.placeiD,
        })
        this.isInFavorites = true
        toast.success("Lugar añadido a favoritos", {
          theme: "colored",
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 1500,
          hideProgressBar: true,
        })
        console.log(response)
      } catch ({ response }) {
        const { data } = response
        console.log(data)
      }
    },
    async getWeather() {
      try {
        const { data } = await apiFromBackend.get("/api/Weather", {
          params: {
            lat: "19.606069",
            lon: "-98.971432",
          },
        })
        this.placeWeather = parseInt(data.main.temp - 273.15)
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
        this.rating = data.result.rating
        this.reviews = data.result.reviews
        this.placeName = data.result.name
        this.lat = data.result.geometry.location.lat
        this.long = data.result.geometry.location.lng
        this.placePhotoReference = data.result.photos[0].photo_reference
        this.imageReferences = data.result.photos.map(
          (photo) => photo.photo_reference,
        )
        this.location = data.result.vicinity
        const isOpen = data.result.current_opening_hours
          ? data.result.current_opening_hours.open_now
          : ""
        this.status = isOpen ? "Abierto - Hoy" : "Cerrado - Hoy"
        const openhour = data.result.current_opening_hours
          ? data.result.current_opening_hours.periods[0].open.time
          : ""
        this.openTime = openhour ? this.formatDate(openhour) : ""
        const closehour = data.result.current_opening_hours
          ? data.result.current_opening_hours.periods[0].close.time
          : ""
        this.closeTime = closehour ? this.formatDate(closehour) : ""
        this.phone = data.result.formatted_phone_number
        // console.log(this.reviews)
        const startingIndex = 1 // Índice de la segunda imagen
        this.placePhotosReferences = this.imageReferences.slice(startingIndex)
        this.about = data.result.editorial_summary.overview
        console.log("Imágenes", this.imageReferences)
      } catch (error) {
        console.log(error.message)
      }
    },
    formatDate(hour) {
      const [hours, minutes] = hour.match(/.{1,2}/g)
      const formattedHours = hours.padStart(2, "0")
      const formattedMinutes = minutes.padEnd(2, "0")
      return ` ${formattedHours}:${formattedMinutes} horas`
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
        this.isLoading = false
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
    showPopUpRating() {
      this.showPopup2 = true
    },
    hideRatingPopUp() {
      this.showPopup2 = false
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
  background-color: transparent;
  text-align: center;
  font-size: 18px;
  display: flex;
  justify-content: center;
  align-items: center;
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
