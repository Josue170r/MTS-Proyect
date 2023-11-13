<template>
  <div class="min-h-screen w-full flex flex-col md:flex-row bg-gray-100">
    <div
      class="min-w-screen flex md:bg-orange-300 md:w-1/2 md:min-h-screen relative"
    >
      <router-link to="/login" class="absolute top-7 left-1 transform">
        <BackButtonIcon />
      </router-link>
      <div class="absolute top-6 right-2 transform -translate-x-1">
        <AvatarButton />
      </div>
      <img
        src="@/assets/images/imagen004.png"
        alt="imagen004"
        class="md:my-auto rounded-b-xl"
      />
    </div>
    <div class="md:w-1/2 md:min-h-screen relative">
      <!-- aqui empieza el viaje y los datos  -->

      <h1 class="text-gray-800 py-8 text-center text-xl font-bold">
        Mi viaje a: CDMX
      </h1>

      <!-- div de botones -->

      <div class="flex-row flex w-full items-center space-x-4">
        <button
          type="button"
          @click="goToLoginView"
          class="font-quicksand block w-1/2 mt-4 py-2 rounded-lg text-white font-semibold mb-2 bg-pink-300"
        >
          Editar ruta
        </button>
        <button
          type="button"
          class="font-quicksand block w-1/2 mt-4 py-2 rounded-lg text-white font-semibold mb-2 bg-orange-300"
          @click="goToLoginView"
        >
          Iniciar ruta
        </button>
      </div>
      <!-- termina div de botones  -->

      <span class="block text-sm mb-2"></span>

      <!-- empieza div para lugares del viaje -->

      <v-container>
        <v-row>
          <!-- Utiliza v-for para iterar sobre los días -->
          <v-col v-for="(day, index) in days" :key="index" cols="12">
            <v-card class="mx-auto" max-width="90%">
              <v-list lines="two">
                <v-list-subheader>
                  <h1 class="text-gray-800 py-8 text-center text-xl font-bold">
                    {{ day.date }}
                  </h1>
                </v-list-subheader>

                <!-- Itera sobre las actividades del día -->
                <v-list-item
                  v-for="(activity, activityIndex) in day.activities"
                  :key="activityIndex"
                  :prepend-avatar="activity.image"
                >
                  <v-list-item-title>{{ activity.title }}</v-list-item-title>
                  <v-list-item-subtitle>{{
                    activity.description
                  }}</v-list-item-subtitle>
                </v-list-item>
              </v-list>
            </v-card>
          </v-col>
        </v-row>
      </v-container>

      <span class="block text-red-700 text-sm mb-2"></span>
    </div>
  </div>
</template>

<script>
import BackButtonIcon from "@/components/icons/BackButtonIcon"
import AvatarButton from "@/components/buttons/AvatarButton"

export default {
  name: "MyTrip",
  components: {
    BackButtonIcon,
    AvatarButton,
  },
  data() {
    return {
      // Más días y actividades aquí------> back lo conecta a un arreglo en la BD para que itere con el v-for
      days: [
        {
          date: "Martes 13 de octubre",
          activities: [
            {
              title: "Museo de Frida Khalo",
              description: "Descripción uno",
              image:
                "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Museo_Frida_Kahlo.JPG/640px-Museo_Frida_Kahlo.JPG",
            },
            {
              title: "Palacio de Bellas Artes",
              description: "Llevar cartera y suéteres",
              image:
                "https://upload.wikimedia.org/wikipedia/commons/9/97/Bellas_Artes_01.jpg",
            },
          ],
        },
        {
          date: " Miércoles 14 de octubre",
          activities: [
            {
              title: "Pirámides de Teotihuacán",
              description: "Llevar sombrilla, sandaloias, bloqueador y cartera",
              image:
                "https://historia.nationalgeographic.com.es/medio/2023/05/15/istock_1f1795c2_501453380_230515114913_1280x853.jpg",
            },
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
  setup() {
    return {
      //***** */
    }
  },
}
</script>
