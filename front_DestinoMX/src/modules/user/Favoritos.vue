<template>
  <div class="min-h-screen w-full flex flex-col md:flex-row bg-gray-100">
    <div
      class="min-w-screen flex md:bg-orange-300 md:w-1/2 md:min-h-screen relative"
    >
      <router-link to="/home" class="absolute top-7 left-1 transform">
        <BackButtonIcon />
      </router-link>
      <div class="absolute top-6 right-2 transform -translate-x-1">
        <AvatarButton />
      </div>
      <img
        src="@/assets/images/imagen006.png"
        alt="imagen004"
        class="md:my-auto rounded-b-xl"
      />
    </div>
    <div class="md:w-1/2 md:min-h-screen relative">
      <!-- aqui empieza el viaje y los datos  -->

      <h1 class="text-gray-800 pt-4 text-center text-xl font-bold">
        Mis lugares favoritos
      </h1>

      <span class="block text-sm mb-2"></span>

      <!-- empieza div para favoritos -->

      <!-- v if cuando SI hay favoritos en la BD -->
      <v-container v-if="places.length != 0">
        <v-row>
          <!-- Utiliza v-for para iterar sobre los lugares -->
          <v-col>
            <v-card class="mx-auto" max-width="90%">
              <v-list lines="two">
                <!-- Itera sobre la info de los lugares -->
                <v-list-item v-for="(place, index) in places" :key="index">
                  <div class="d-flex flex-column justify-center align-center">
                    <!-- Imagen cuadrada con bordes redondeados -->
                    <v-img
                      :src="placeImages[index]"
                      height="13rem"
                      width="80%"
                      @click="goToPlaceDescription(place.reference)"
                    ></v-img>
                  </div>
                  <br />
                  <div class="d-flex flex-column align-center">
                    <v-list-item-title
                      class="text-center"
                      style="white-space: normal; overflow: hidden"
                      >{{ place.name }}</v-list-item-title
                    >
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
                    <v-list-item-subtitle class="text-center mt-3">{{
                      place.formatted_address
                    }}</v-list-item-subtitle>
                  </div>

                  <!-- Botón para eliminar el lugar-->
                  <div class="absolute top-4 right-3">
                    <button @click="deletePlace(place.reference)">
                      <deleteFav />
                    </button>
                  </div>
                </v-list-item>
              </v-list>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
      <v-container
        v-else
        class="d-flex flex-column justify-center align-center"
      >
        <!-- Pantalla alternativa v-if cuando NO hay lugares favoritos -->
        <h1>¡Vaya!</h1>
        <h2>Aún no tienes lugares favoritos</h2>
        <img src="@/assets/images/piramide.png" />
      </v-container>

      <span class="block text-red-700 text-sm mb-2"></span>
    </div>
  </div>
</template>

<script>
import { toRaw } from "vue"
import { toast } from "vue3-toastify"
import "vue3-toastify/dist/index.css"
import BackButtonIcon from "@/components/icons/BackButtonIcon"
import AvatarButton from "@/components/buttons/AvatarButton"
import deleteFav from "@/components/icons/deleteFav"
import { apiFromBackend } from "@/helpers/ApiFromBackend"

export default {
  name: "LugaresFavoritos",
  components: {
    BackButtonIcon,
    AvatarButton,
    deleteFav,
  },
  data() {
    return {
      placesImgsReferences: [],
      places: [],
      placeImages: [],
    }
  },
  created() {
    this.getFavorites()
  },

  methods: {
    async getFavorites() {
      try {
        // Hacer la solicitud al back-end para obtener lugares favoritos
        const { data } = await apiFromBackend.get("/api/favoritos")
        // Actualizar los datos locales en el componente con los favoritos obtenidos
        this.placeIds = data.info
        this.placeIds = this.placeIds
          .filter((place) => place.idPlaceLugar.startsWith("ChIJ"))
          .map((place) => place.idPlaceLugar)
        this.getNamePlaces().then(() => {
          this.getImgsPlaces()
        })
      } catch (error) {
        console.error("Error al obtener lugares del favoritos:", error)
      }
    },
    async getNamePlaces() {
      try {
        // Utiliza Promise.all para realizar las solicitudes de manera simultánea
        const requests = this.placeIds.map(async (placeid) => {
          const { data } = await apiFromBackend.get("/api/placeName", {
            params: {
              place_id: placeid,
            },
          })
          return data.result
        })
        const results = await Promise.all(requests)
        this.places.push(...results)

        // Imprime el arreglo de places después de que todas las solicitudes se completen
        console.log("Arreglo de lugares: ", this.places)
        // Agrega las referencias de imágenes al arreglo
        this.placesImgsReferences.push(
          ...results.map((result) =>
            result.photos && result.photos.length > 0
              ? result.photos[0].photo_reference
              : "AcJnMuGWfw7Ua2fdzEnPQpBetCNLCfkzn7E8w_YU5drBbSnfMSEEdAyMn-D8VA6bk7dWmKRrw1_Qu4_kpwnxYEJLUJcdWa1xx1KBUx3X8vSMHWKFSfi41nv-X-2666CaHtTiXlJw0KB7UhSzltI11Ie3CfLzy8Uq2wvryKcjQI8K7KqORhc6",
          ),
        )
        console.log("Arreglo de referencias: ", this.placesImgsReferences)
      } catch (error) {
        console.log(error.message)
      }
    },
    async getImgsPlaces() {
      try {
        console.log(
          "References desde getImgsPlaces: ",
          toRaw(this.placesImgsReferences),
        )
        const imageUrls = []
        for (const photoReference of toRaw(this.placesImgsReferences)) {
          const response = await apiFromBackend.get("/api/imgPlace", {
            params: {
              maxwidth: "400",
              photoreference: photoReference,
            },
            responseType: "blob",
          })
          const imgUrl = URL.createObjectURL(response.data)
          imageUrls.push(imgUrl)
        }
        this.placeImages = toRaw(imageUrls)
        console.log("Urls de fotos this.placeImages: ", this.placeImages)
      } catch (error) {
        toast.error("No hay imágenes disponibles", {
          theme: "colored",
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 1500,
          hideProgressBar: true,
        })
      }
    },
    async deletePlace(place) {
      try {
        const { data } = await apiFromBackend.delete("/api/favoritos", {
          params: {
            idPlaceLugar: place,
          },
        })
        toast.success(data.mensaje, {
          theme: "colored",
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 1500,
          hideProgressBar: true,
        })
        window.location.reload()
      } catch (error) {
        console.log(error)
      }
    },
    goToPlaceDescription(place_id) {
      this.$router.push({
        name: "placedescription",
        query: {
          placeid: place_id,
        },
      })
    },
  },
}
</script>
