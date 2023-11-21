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
      <v-container v-if="days.length != 0">
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
import BackButtonIcon from "@/components/icons/BackButtonIcon"
import AvatarButton from "@/components/buttons/AvatarButton"
import deleteFav from "@/components/icons/deleteFav"
// import favIcon from "@/components/icons/favIcon"

export default {
  name: "MyTrip",
  components: {
    BackButtonIcon,
    AvatarButton,
    deleteFav,
    // favIcon,
  },
  data() {
    return {
      // Más días y actividades aquí------> back lo conecta a un arreglo en la BD para que itere con el v-for
      days: [
        {
          activities: [
            {
              title: "Palacio de Bellas Artes",
              description:
                "El Palacio de Bellas Artes es un recinto cultural ubicado en el Centro Histórico de la CDMX    ",
              image:
                "https://upload.wikimedia.org/wikipedia/commons/9/97/Bellas_Artes_01.jpg",
            },
          ],
        },
        {
          activities: [
            {
              title: "Pirámides de Teotihuacán",
              description:
                "Teotihuacán es uno de los destinos más conocidos de México. Yacimiento espectacular con las gigantescas pirámides. Excursiones paseos globo.",
              image:
                "https://historia.nationalgeographic.com.es/medio/2023/05/15/istock_1f1795c2_501453380_230515114913_1280x853.jpg",
            },
          ],
        },
        {
          activities: [
            {
              title: "Villa de Guadalupe",
              description:
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do",
              image:
                "https://upload.wikimedia.org/wikipedia/commons/thumb/5/54/Bas%C3%ADlica_de_Santa_Mar%C3%ADa_de_Guadalupe_2018.jpg/1200px-Bas%C3%ADlica_de_Santa_Mar%C3%ADa_de_Guadalupe_2018.jpg",
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
  },
  setup() {
    return {
      //***** */
    }
  },
}
</script>