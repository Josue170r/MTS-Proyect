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

      <h1 class="text-gray-800 py-8 text-center text-xl font-bold">
        Mis lugares favoritos
      </h1>

      <span class="block text-sm mb-2"></span>

      <!-- empieza div para favoritos -->

      <!-- v if cuando SI hay favoritos en la BD -->
      <v-container v-if="places.length != 0">
        <v-row>
          <!-- Utiliza v-for para iterar sobre los lugares -->
          <v-col v-for="(place, index) in places" :key="index" cols="12">
            <v-card class="mx-auto" max-width="90%">
              <v-list lines="two">
                <!-- Itera sobre la info de los lugares -->
                <v-list-item
                  v-for="(activity, activityIndex) in place.name"
                  :key="activityIndex"
                >
                  <div class="d-flex flex-column justify-center align-center">
                    <!-- Imagen cuadrada con bordes redondeados -->
                    <v-img
                      v-if="activity.image"
                      :src="activity.image"
                      height="80%"
                      width="80%"
                    ></v-img>
                  </div>
                  <br />
                  <div class="d-flex flex-column justify-center align-center">
                    <v-list-item-title>{{ activity.title }}</v-list-item-title>
                    <v-list-item-subtitle>{{
                      activity.description
                    }}</v-list-item-subtitle>
                  </div>

                  <!-- Botón para eliminar el lugar-->
                  <div class="absolute top-4 right-3">
                    <deleteFav @click="deletePlace(index)" />
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
// import favIcon from "@/components/icons/favIcon"
// this.days = [
//       {
//         activities: [
//           {
//             title: "Palacio de Bellas Artes",
//             description:
//               "El Palacio de Bellas Artes es un recinto cultural ubicado en el Centro Histórico de la CDMX",
//             image:
//               "https://upload.wikimedia.org/wikipedia/commons/9/97/Bellas_Artes_01.jpg",
//           },
//         ],
//       },
//     ]
export default {
  name: "LugaresFavoritos",
  components: {
    BackButtonIcon,
    AvatarButton,
    deleteFav,
    // favIcon,
  },
  data() {
    return {
      placePhotoReferences: "",
      places: [],
    }
  },
  created() {
    this.getFavorites()
  },
  // Aqui se debe hacer la consulta a las APIS para obtener informacion de cada lugar e insertarla en el arreglo days.

  /* Tambien se debe actualizar days. Por ahora solo retorna infomacion hardcodeada.
     Más días y actividades aquí------> back lo conecta a un arreglo en la BD para que itere con el v-for */

  methods: {
    async getFavorites() {
      try {
        // Hacer la solicitud al back-end para obtener lugares favoritos
        const { data } = await apiFromBackend.get("/api/favoritos")

        // Actualizar los datos locales en el componente con los favoritos obtenidos
        if (data.exito) {
          this.placeIds = data.info
          console.log("This.placeIds: ", this.placeIds)
          this.getNamePlaces()
        }
      } catch (error) {
        console.error("Error al obtener lugares favoritos:", error)
      }
    },
    async getNamePlaces() {
      try {
        for (const place_id of this.placeIds) {
          console.log(place_id.idPlaceLugar)
          const { data } = await apiFromBackend.get("/api/placeName", {
            params: {
              place_id: place_id.idPlaceLugar,
            },
          })
          this.places.push(data.result)
        }
        // this.placePhotoReferences = data.result.photos.photo_reference
        console.log("Desde getNamePlace de Favoritos: ", this.places)
      } catch (error) {
        console.log(error.message)
      }
    },
    async getImgPlaces() {
      try {
        const imgageURLs = []
        for (const photoReference of this.placePhotoReferences) {
          const imgs = await apiFromBackend.get("/api/imgPlace", {
            params: {
              maxwidth: "400",
              photoreference: photoReference,
            },
            responseType: "blob",
          })
          const imgUrl = URL.createObjectURL(imgs.data)
          imgageURLs.push(imgUrl)
          this.placeImages = toRaw(imgageURLs)
          console.log(this.placeImages)
        }
      } catch (error) {
        toast.error("No hay imágenes disponibles", {
          theme: "colored",
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 1500,
          hideProgressBar: true,
        })
      }
    },

    deletePlace(index) {
      // Elimina el lugar de la lista según el índice
      this.favplaces.splice(index, 1)
    },
  },
}
</script>
