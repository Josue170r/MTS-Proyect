<template>
  <div class="min-h-screen w-full flex flex-col md:flex-row bg-gray-100">
    <div
      class="min-w-screen flex md:bg-orange-300 md:w-1/2 md:min-h-screen relative"
    >
      <div class="absolute top-6 right-2 transform -translate-x-1">
        <AvatarButton />
      </div>
      <div>
        <BurgerMenu />
      </div>

      <img
        src="@/assets/images/imagen007.png"
        alt="imagen004"
        class="md:my-auto rounded-b-xl"
      />
    </div>
    <div class="md:w-1/2 md:min-h-screen relative">
      <!-- aqui empieza el viaje y los datos  -->

      <h1 class="text-gray-800 py-1.5 text-center text-xl font-bold">
        Historial de lugares visitados
      </h1>

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

                    <div class="flex flex-row items-center">
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
                      <v-list-item-subtitle class="text-center mt-3 ml-4">
                        <FavoriteIcon2
                          :isFavorite="
                            placeIdsFavs.indexOf(place.reference) !== -1
                          "
                          @toggle-favorite="
                            updateFavorites(place.reference, $event)
                          "
                        />
                      </v-list-item-subtitle>
                    </div>
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
        <!-- Pantalla alternativa v-if cuando NO hay lugares visitados -->
        <h1>¡Vaya!</h1>
        <h2>Aún tienes mucho por recorrer...</h2>
        <img src="@/assets/images/ajolote.png" />

        <button
          @click="goToHome"
          type="button"
          class="font-quicksand block w-1/2 mt-4 py-3 px-4 rounded-lg text-white font-semibold mb-2 bg-pink-300"
        >
          Descubrir ahora
        </button>
      </v-container>
    </div>
  </div>
</template>

<script>
import AvatarButton from "@/components/buttons/AvatarButton"
import deleteFav from "@/components/icons/deleteFav"
import BurgerMenu from "@/components/buttons/BurgerMenu"
import { apiFromBackend } from "@/helpers/ApiFromBackend"
import FavoriteIcon2 from "@/components/icons/FavoriteIcon2.vue"
import { toast } from "vue3-toastify"
import "vue3-toastify/dist/index.css"
import { toRaw } from "vue"

export default {
  name: "MyTrip",
  components: {
    BurgerMenu,
    AvatarButton,
    deleteFav,
    FavoriteIcon2,
  },
  data() {
    return {
      isLoading: true,
      placesImgsReferences: [],
      places: [],
      placeImages: [],
      placeIds: [],
      placeIdsFavs: [],
    }
  },
  created() {
    this.getFavorites()
    this.getHistory()
  },

  methods: {
    async getHistory() {
      try {
        // Hacer la solicitud al back-end para obtener lugares favoritos
        const { data } = await apiFromBackend.get("/api/historial")
        // Actualizar los datos locales en el componente con los favoritos obtenidos
        this.placeIds = data.info
        this.placeIds = this.placeIds
          .filter((place) => place.idPlaceLugar.startsWith("ChIJ"))
          .map((place) => place.idPlaceLugar)

        // console.log("Desde getHistory:", toRaw(this.placeIds))
        this.getNamePlaces()
      } catch (error) {
        console.error("Error al obtener lugares del historial:", error)
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
        this.placesImgsReferences.push(
          ...results.map((result) =>
            result.photos && result.photos.length > 0
              ? result.photos[0].photo_reference
              : "AcJnMuGWfw7Ua2fdzEnPQpBetCNLCfkzn7E8w_YU5drBbSnfMSEEdAyMn-D8VA6bk7dWmKRrw1_Qu4_kpwnxYEJLUJcdWa1xx1KBUx3X8vSMHWKFSfi41nv-X-2666CaHtTiXlJw0KB7UhSzltI11Ie3CfLzy8Uq2wvryKcjQI8K7KqORhc6",
          ),
        )
        this.getImgsPlaces()
        // console.log("Arreglo de referencias: ", this.placesImgsReferences)
      } catch (error) {
        console.log(error.message)
      }
    },

    async getImgsPlaces() {
      try {
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
      } catch (error) {
        toast.error("No hay imágenes disponibles", {
          theme: "colored",
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 1500,
          hideProgressBar: true,
        })
      }
    },
    async updateFavorites(placeReference, isFavorite) {
      // Lógica para actualizar la lista de favoritos
      if (isFavorite) {
        this.addToFavorites(placeReference)
      } else {
        this.removeFromFavorites(placeReference)
      }
    },
    async removeFromFavorites(place) {
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
    async addToFavorites(place) {
      try {
        const response = await apiFromBackend.post("/api/favoritos", {
          idPlaceLugar: place,
        })
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
    async deletePlace(place) {
      try {
        const { data } = await apiFromBackend.delete("/api/historial", {
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
    async getFavorites() {
      try {
        // Hacer la solicitud al back-end para obtener lugares favoritos
        const { data } = await apiFromBackend.get("/api/favoritos")
        // Actualizar los datos locales en el componente con los favoritos obtenidos
        this.placeIdsFavs = data.info
        this.placeIdsFavs = this.placeIdsFavs
          .filter((place) => place.idPlaceLugar.startsWith("ChIJ"))
          .map((place) => place.idPlaceLugar)

        // const isFavorite = this.placeIdsFavs.some(
        //   (favorite) => favorite === placeReference,
        // )
        // console.log("Is in favorites:", isFavorite)
        // console.log("Arreglo de favoritos: ", this.placeIdsFavs)
        // console.log("Referencia de lugar de historial: ", placeReference)
        // return isFavorite
      } catch (error) {
        console.error("Error al obtener lugares del favoritos:", error)
      }
    },
    // async isInFavorites(placeReference) {

    // },
    goToHome() {
      this.$router.push({
        name: "home",
      })
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
