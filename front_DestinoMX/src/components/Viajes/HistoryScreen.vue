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
      <v-container v-if="days.length > 0">
        <v-row>
          <!-- Utiliza v-for para iterar sobre los lugares -->
          <v-col v-for="(day, index) in days" :key="index" cols="12">
            <v-card class="mx-auto" max-width="90%">
              <v-list lines="two">
                <!-- Itera sobre la info de los lugares -->
                <v-list-item
                  v-for="(activity, activityIndex) in day.activities"
                  :key="activityIndex"
                >
                  <!-- *******************div principal de historial********************************** -->
                  <div class="d-flex flex-column justify-center align-center">
                    <!-- Imagen cuadrada con bordes redondeados -->
                    <v-img
                      v-if="activity.image"
                      :src="activity.image"
                      height="80%"
                      width="80%"
                    ></v-img>
                    <br />
                    <!-- Descripcion -->
                    <v-list-item-title>{{ activity.title }}</v-list-item-title>
                    <v-list-item-subtitle>{{
                      activity.description
                    }}</v-list-item-subtitle>
                    <br />
                    <div
                      class="d-flex flex-row px-5 mx-10 items-center space-x-8"
                    >
                      <!-- boton para ver la Descripcion del lugar -->
                      <button
                        @click="goToHome"
                        type="button"
                        class="font-quicksand block w-1/2 py-1 px-1 rounded-lg text-white bg-pink-300"
                      >
                        Explorar
                      </button>
                      <!-- icon favoritos -->
                      <favIcon
                        :class="[
                          isInFavorites
                            ? 'opacity-60 cursor-not-allowed'
                            : '...',
                        ]"
                        :disabled="isInFavorites"
                        @click="AddToFavorites"
                      />
                      <!-- icon de eliminar -->
                      <deleteFav @click="deletePlace(index)" />
                    </div>
                  </div>
                  <!-- ******************************************************************************** -->
                  <br />
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
          Descubre ahora
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
import favIcon from "@/components/icons/favIcon"
import { toast } from "vue3-toastify"
import "vue3-toastify/dist/index.css"

export default {
  name: "MyTrip",
  components: {
    BurgerMenu,
    AvatarButton,
    deleteFav,
    favIcon,
    // placeiD: "",
    // placeImage: "",
    // placePhotoReference: "",
    // placeName: "",
    // location: "",
    // rating: "",
    // numratings: "",
    // about: "",
  },
  data() {
    return {
      isInFavorites: false,
      isLoading: true,
      // Más días y actividades aquí------> back lo conecta a un arreglo en la BD para que itere con el v-for
      days: [
        {
          activities: [
            {
              description:
                "El Palacio de Bellas Artes es un recinto cultural ubicado en el Centro Histórico de la CDMX    ",
              image:
                "https://upload.wikimedia.org/wikipedia/commons/9/97/Bellas_Artes_01.jpg",
            },
          ],
        },

        //mas dias aqui en adelante para iterar etc
      ],
    }
  },
  methods: {
    deletePlace(index) {
      // Elimina el lugar de la lista según el índice
      this.days.splice(index, 1)
    },
    goToHome() {
      this.$router.push({
        name: "home",
      })
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
  },

  setup() {
    return {
      //***** */
    }
  },
}
</script>
