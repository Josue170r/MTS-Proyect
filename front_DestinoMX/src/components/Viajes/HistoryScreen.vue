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
                      :src="place.imagePlaces"
                      height="13rem"
                      width="80%"
                      @click="goToPlaceDescription(place.idPlaceLugar)"
                    ></v-img>
                  </div>
                  <br />
                  <div class="d-flex flex-column align-center">
                    <v-list-item-title
                      class="text-center"
                      style="white-space: normal; overflow: hidden"
                      >{{ place.nombrePlaces }}</v-list-item-title
                    >

                    <div class="flex flex-row items-center">
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
                      <v-list-item-subtitle class="text-center mt-3 ml-4">
                        <v-btn color="#EF9A9A">
                          <FavoriteIcon2
                            :isFavorite="
                              placeIdsFavs.indexOf(place.idPlaceLugar) !== -1
                            "
                            @toggle-favorite="updateFavorites(place, $event)"
                          />
                        </v-btn>
                      </v-list-item-subtitle>
                    </div>
                    <v-list-item-subtitle class="text-center mt-3">{{
                      place.direccionPlaces
                    }}</v-list-item-subtitle>
                  </div>

                  <!-- Botón para eliminar el lugar-->
                  <div class="absolute top-4 right-3">
                    <button @click="deletePlace(place.idPlaceLugar)">
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
