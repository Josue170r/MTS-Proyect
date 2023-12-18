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
                      :src="place.imagePlaces"
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
      places: [],
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
        this.places = data.info.filter((place) =>
          place.idPlaceLugar.includes("ChIJ"),
        )
        console.log(this.places)
      } catch (error) {
        console.error("Error al obtener lugares del favoritos:", error)
      }
    },
    async deletePlace(place_id) {
      try {
        const { data } = await apiFromBackend.delete("/api/favoritos", {
          params: {
            idPlaceLugar: place_id,
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
