historyscreen
<template>
  <div class="min-h-screen w-full flex flex-col md:flex-row bg-gray-100">
    <div
      class="min-w-screen flex md:bg-orange-300 md:w-1/2 md:min-h-screen relative"
    >
      <router-link to="/home" class="absolute top-7 left-2 transform">
        <BackButtonIcon />
      </router-link>
      <div class="absolute top-6 right-2 transform -translate-x-1">
        <AvatarButton />
      </div>
      <router-link to="/home">
        <img
          src="@/assets/images/imagen007.png"
          alt="imagen004"
          class="md:my-auto rounded-b-xl w-32 h-auto cursor-pointer"
      /></router-link>
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
                <v-list-item
                  v-for="(place, index) in places"
                  :key="index"
                  :class="{
                    'list-item-with-divider': index !== places.length - 1,
                  }"
                >
                  <div class="d-flex flex-column justify-center align-center">
                    <!-- Imagen cuadrada con bordes redondeados -->
                    <v-img
                      v-if="place.imagePlaces"
                      :src="place.imagePlaces"
                      height="13rem"
                      width="80%"
                      @click="goToPlaceDescription(place.idPlaceLugar)"
                    ></v-img>
                    <img
                      v-else
                      @click="goToPlaceDescription(place.idPlaceLugar)"
                      src="@/assets/images/noimages.jpg"
                      alt="Imagen por defecto"
                      class="w-80% h-64"
                    />
                  </div>
                  <div class="d-flex flex-column align-center">
                    <v-list-item-title
                      class="text-center font-quicksand font-weight-bold mt-1"
                      style="white-space: normal; overflow: hidden"
                      >{{ place.nombrePlaces }}</v-list-item-title
                    >
                    <v-rating
                      half-increments
                      hover
                      :length="5"
                      :size="16"
                      :model-value="place.ratingPlaces"
                      readonly
                      color="rgb(232, 176, 36)"
                      active-color="rgb(232, 176, 36)"
                    />
                    <v-list-item-subtitle
                      class="text-center font-quicksand mt-1"
                      >{{ place.direccionPlaces }}</v-list-item-subtitle
                    >

                    <div class="flex flex-row items-center">
                      <v-btn
                        class="py-2 px-3 rounded-lg text-white font-weight-bold ml-1 mt-3 elevation-0 custom-font"
                        color="pink-accent-1"
                        @click="goToPlaceDescription(place.idPlaceLugar)"
                      >
                        Ver lugar
                      </v-btn>
                      <v-list-item-subtitle class="text-center mt-3 ml-2">
                        <v-btn color="pink-lighten-3">
                          <FavoriteIcon2
                            :isFavorite="
                              placeIdsFavs.indexOf(place.idPlaceLugar) !== -1
                            "
                            @toggle-favorite="updateFavorites(place, $event)"
                          />
                        </v-btn>
                      </v-list-item-subtitle>
                      <!-- Botón para eliminar el lugar-->
                      <v-btn
                        class="ml-2 mt-3 elevation-0"
                        @click="deletePlace(place.idPlaceLugar)"
                        color="red-accent-1"
                      >
                        <deleteFav />
                      </v-btn>
                    </div>
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
import BackButtonIcon from "@/components/icons/BackButtonIcon"
import { apiFromBackend } from "@/helpers/ApiFromBackend"
import FavoriteIcon2 from "@/components/icons/FavoriteIcon2.vue"
import { toast } from "vue3-toastify"
import "vue3-toastify/dist/index.css"

export default {
  name: "MyTrip",
  components: {
    BackButtonIcon,
    AvatarButton,
    deleteFav,
    FavoriteIcon2,
  },
  data() {
    return {
      places: [],
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
        const { data } = await apiFromBackend.get("/api/historial")
        this.places = data.info.filter((place) =>
          place.idPlaceLugar.startsWith("ChIJ"),
        )
        console.log(this.places)
      } catch (error) {
        console.error("Error al obtener lugares del historial:", error)
      }
    },
    async getFavorites() {
      try {
        // Hacer la solicitud al back-end para obtener lugares favoritos
        const { data } = await apiFromBackend.get("/api/favoritos")
        // Actualizar los datos locales en el componente con los favoritos obtenidos
        this.placeIdsFavs = data.info
          .filter((place) => place.idPlaceLugar.startsWith("ChIJ"))
          .map((place) => place.idPlaceLugar)
        if (this.placeIdsFavs.length === 0) {
          this.placeIdsFavs.push("ChIJQ2pBT6gCzoURkj76UTxgxyI")
        }
      } catch (error) {
        console.error("Error al obtener lugares del favoritos:", error)
      }
    },
    async updateFavorites(place, isFavorite) {
      // Lógica para actualizar la lista de favoritos
      if (isFavorite) {
        this.addToFavorites(place)
      } else {
        this.removeFromFavorites(place.idPlaceLugar)
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
      } catch (error) {
        console.log(error)
      }
    },
    async addToFavorites(place) {
      try {
        const response = await apiFromBackend.post("/api/favoritos", {
          idPlaceLugar: place.idPlaceLugar,
          nombrePlaces: place.nombrePlaces,
          imagePlaces: place.imagePlaces,
          direccionPlaces: place.direccionPlaces,
          ratingPlaces: place.ratingPlaces,
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

<style scoped>
.custom-font {
  font-family: "Quicksand", sans-serif;
  font-size: 12px;
}

.list-item-with-divider {
  border-bottom: 2px solid rgb(219, 219, 219); /* Ajusta el color y estilo del borde según tus preferencias */
}
</style>
