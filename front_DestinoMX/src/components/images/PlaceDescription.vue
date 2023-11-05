<template>
  <div class="min-h-screen w-full flex flex-col md:flex-row bg-gray-100">
    <div>
      <!-- imagen -->
      <img
        :src="placeImage"
        alt="Imagen del lugar"
        class="h-[200px] opacity-50 rounded-b-xl w-full"
      />
    </div>
    <div class="flex flex-col w-full">
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
          <div class="ml-0 mr-1 text-black-900 text-left text-xs">
            {{ rating }}
          </div>
        </div>
      </div>
    </div>

    <!-- Acerca de -->
    <div class="flex flex-col">
      <h1 class="ml-3 text-black py-1 text-left text-sm font-bold">
        {{ "Acerca de" }}
      </h1>
      <div class="ml-3 mr-1 text-black py-0 text-left text-sm">
        <p>
          {{ about }}
        </p>
      </div>
    </div>
    <!-- Botón de reseñas -->
    <button
      :disabled="isFormEmpty"
      type="submit"
      class="flex flex-row font-quicksand py-1 px-1 rounded-lg text-gray text-base font-semibold mr-2 ml-auto bg-orange-300"
      :class="[
        isFormEmpty
          ? 'opacity-80 cursor-not-allowed'
          : 'hover:outline hover:outline-1 hover:outline-orange-500',
      ]"
    >
      <div class="flex items-center">
        <span>Reseñas</span>
        <ForwardIcon class="ml-1" />
      </div>
    </button>

    <!-- Galería -->
    <div class="flex flex-col">
      <h1 class="ml-3 text-black py-1 text-left text-sm font-bold">
        {{ "Galería de imágenes" }}
      </h1>
    </div>
    <div class="flex flex-row">
      <button
        :disabled="isFormEmpty"
        type="submit"
        class="flex flex-row font-quicksand py-1 px-1 rounded-lg text-gray text-base font-semibold mr-2 ml-auto bg-pink-300"
        :class="[
          isFormEmpty
            ? 'opacity-80 cursor-not-allowed'
            : 'hover:outline hover:outline-1 hover:outline-pink-500',
        ]"
      >
        <div class="flex items-center">
          <span>Favoritos</span>
          <FavoriteIcon class="ml-1" />
        </div>
      </button>

      <button
        :disabled="isFormEmpty"
        type="submit"
        class="flex font-quicksand py-1 px-1 rounded-lg text-gray text-base font-semibold mr-2 ml-auto bg-green-300"
        :class="[
          isFormEmpty
            ? 'opacity-80 cursor-not-allowed'
            : 'hover:outline hover:outline-1 hover:outline-green-500',
        ]"
      >
        <div class="flex items-center">
          <span>Añadir a viaje</span>
          <AddIcon class="ml-1" />
        </div>
      </button>
    </div>
  </div>
</template>

<script>
import { getImgPlaceApi } from "@/components/images/helpers/getImagePlace"
import { toRaw } from "vue"
import LocalitationIcon2 from "@/components/icons/LocalitationIcon2.vue"
import RatingIcon from "@/components/icons/RatingIcon.vue"
import ShareIcon from "@/components/icons/ShareIcon.vue"
import ForwardIcon from "@/components/icons/ForwardButtonIcon.vue"
import FavoriteIcon from "@/components/icons/FavoriteIcon.vue"
import AddIcon from "@/components/icons/AddIcon.vue"

export default {
  name: "PlaceDescription",
  components: {
    LocalitationIcon2,
    RatingIcon,
    ShareIcon,
    ForwardIcon,
    FavoriteIcon,
    AddIcon,
  },
  data() {
    return {
      placeImage: "",
      apiKey: "AIzaSyA7zLTbiIG9CpbTiNfZMQZZUoPMo8kbh70",
      placePhotoReference: "",
      placeName: "",
      location: "",
      rating: "",
      about: "",
    }
  },
  created() {
    this.placePhotoReference = this.$route.query.photos
    //Obtención de referencia de foto
    console.log(this.placePhotoReference)
    this.getImgPlace()
    //Obtención de nombre
    this.placeName = this.$route.query.names
    this.location = this.$route.query.locations
    this.rating = this.$route.query.ratings
    this.about = this.$route.query.abouts
    console.log(this.about)
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
        console.log(this.placeName)
      } catch (error) {
        console.log(error)
      }
    },
  },
}
</script>
