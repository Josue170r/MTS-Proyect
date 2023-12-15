<template>
  <div class="popup-overlay relative z-10 h-flex">
    <div class="popup-container">
      <h1 class="text-2xl font-bold mb-2">
        ¿A qué viaje le gustaría agregar este destino?
      </h1>

      <div v-if="travels" class="overflow-auto max-h-[400px]">
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
            <v-expansion-panel-text
              class="text-start"
              v-for="date in dates[index]"
              :key="date"
              @click="addToTrip(date, travel)"
            >
              {{ date }}
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
import { format, addDays, parseISO } from "date-fns"
import { es } from "date-fns/locale"

export default {
  props: {
    placeName: {
      required: true,
      type: String,
    },
    imgPlace: {
      required: true,
      type: String,
    },
    placeId: {
      required: true,
      type: String,
    },
  },
  data() {
    return {
      travels: [],
      dates: [],
      namePlace: this.placeName,
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
        this.travels.forEach((travel) => {
          const dateRange = this.setDateArray(travel.diaInicio, travel.diaFinal)
          this.dates.push(dateRange)
        })
      } catch (error) {
        console.error(error)
      }
    },
    async addToTrip(date, travel) {
      try {
        const response = await apiFromBackend.post("/api/sitios", {
          placeID: this.placeId,
          idViajes: travel.idViajes,
          fechaEspecifica: date,
          nombrePlaces: this.namePlace,
          imagePlaces: this.imgPlace,
        })
        console.log(response)
      } catch (error) {
        console.log(error)
      }
    },
    UpperDate(texto) {
      return texto.charAt(0).toUpperCase() + texto.slice(1)
    },
    setDateArray(startDate, endDate) {
      const fechas = []
      let fechaActual = parseISO(startDate)

      while (fechaActual <= parseISO(endDate)) {
        const fechaFormateada = format(fechaActual, "EEEE d 'de' MMMM", {
          locale: es,
        })
        fechas.push(this.UpperDate(fechaFormateada))
        fechaActual = addDays(fechaActual, 1)
      }
      return fechas
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
