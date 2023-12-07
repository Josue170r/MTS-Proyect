<template>
  <div class="popup-overlay relative z-10 h-flex">
    <div class="popup-container">
      <h1 class="text-2xl font-bold mb-2">
        ¿A qué viaje le gustaría agregar este destino?
      </h1>

      <div v-if="travels.length" class="overflow-auto max-h-[400px]">
        <v-expansion-panels v-if="travels.length" multiple>
          <v-expansion-panel v-for="(travel, index) in travels" :key="index">
            <v-expansion-panel-title>
              <v-avatar
                class="mr-4"
                :color="
                  travel.colorPlantilla ? travel.colorPlantilla : '#FFB74D'
                "
                size="x-small"
              ></v-avatar>
              {{ travel.nombreMiViaje }}
            </v-expansion-panel-title>
            <v-expansion-panel-text @click="addToTrip">
              Some content
            </v-expansion-panel-text>
          </v-expansion-panel>
        </v-expansion-panels>
      </div>

      <div v-else>
        <!-- Si no se tienen viajes -->
        <p
          class="flex font-quicksand rounded-lg text-black text-xl relative z-20"
          style="
            max-width: 80%;
            margin: auto;
            text-align: center;
            padding: 0px;
            margin-top: 40px;
          "
        >
          ¡Vaya!, aún no tienes ningún viaje creado
        </p>
        <img
          v-if="!travels.length"
          src="@/assets/images/piramide.png"
          class="relative z-10"
          style="opacity: 0.3"
        />
      </div>

      <!-- Botones -->
      <div class="flex justify-between mt-4">
        <button
          @click="cancel"
          class="flex font-quicksand rounded-lg text-black text-base font-semibold mb-4 ml-4 mr-4 bg-gray-100 p-2 custom-button"
        >
          Cancelar
        </button>
        <button
          @click="createNewTrip"
          class="flex font-quicksand rounded-lg text-black text-base font-semibold mb-4 mr-4 ml-4 bg-orange-500 p-2 custom-button"
        >
          Crear nuevo viaje
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { apiFromBackend } from "@/helpers/ApiFromBackend"

export default {
  data() {
    return {
      travels: [],
    }
  },
  created() {
    this.getTrip()
  },
  methods: {
    cancel() {
      this.$emit("close-popup")
    },
    createNewTrip() {
      this.$router.push({ name: "newtrip" })
      this.$emit("close-popup")
    },
    async getTrip() {
      try {
        const { data } = await apiFromBackend.get("/api/viaje")
        this.travels = data.info
        console.log(this.travels)
      } catch (error) {
        console.error(error)
      }
    },
    async addToTrip() {
      console.log("Hola")
    },
  },
}
</script>

<style scoped>
/* Estilos para el popup, ajusta según sea necesario */
.popup-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.popup-container {
  background: #dad4bd;
  padding: 20px;
  border-radius: 8px;
  max-width: 350px;
  height: 600px;
  width: 100%;
  text-align: center;
}
.hide-arrows {
  display: none !important;
}
</style>
