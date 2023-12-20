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
              class="text-start mt-4"
              v-for="date in dates[index]"
              :key="date"
              @click="toggleOpacity(date, travel)"
              :class="[
                'flex',
                'font-quicksand',
                'rounded-lg',
                'text-black',
                'text-base',
                'font-semibold',
                'mb-4',
                'ml-4',
                'mr-4',
                'p-2',
                'custom-button',
                isSelected[date] === travel.idViajes
                  ? 'bg-gray-300'
                  : 'bg-gray-100',
              ]"
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
          class="flex font-quicksand rounded-lg text-gray-700 text-base font-semibold mb-4 ml-4 mr-4 bg-gray-100 p-2 custom-button"
        >
          Cancelar
        </button>
        <button
          v-if="!selected"
          @click="createNewTrip"
          class="flex font-quicksand rounded-lg text-white text-base font-semibold mb-4 mr-4 ml-4 bg-orange-300 p-2 custom-button"
        >
          Crear nuevo viaje
        </button>
        <button
          v-if="selected"
          @click="addToTrip"
          class="flex font-quicksand rounded-lg text-white text-base font-semibold mb-4 mr-4 ml-4 bg-orange-300 p-2 custom-button px-5"
        >
          Agregar
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { apiFromBackend } from "@/helpers/ApiFromBackend"
import { format, addDays, parseISO } from "date-fns"
import { es } from "date-fns/locale"
import { toast } from "vue3-toastify"

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
      isSelected: {},
      selected: false,
      currentDate: "",
      currenTrip: [],
    }
  },
  created() {
    this.getTrip()
  },
  methods: {
    toggleOpacity(date, travel) {
      if (!this.isSelected[date]) {
        // Deseleccionar todas las fechas
        Object.keys(this.isSelected).forEach((key) => {
          this.isSelected[key] = false
        })

        // Seleccionar la fecha clickeada
        this.isSelected[date] = travel.idViajes
        console.log(this.isSelected)
        this.selected = true
        this.currentDate = date
        this.currenTrip = travel
      } else {
        // Deseleccionar la fecha clickeada
        this.isSelected[date] = false
        this.selected = false
      }
    },
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
    async addToTrip() {
      const date = this.currentDate
      const travel = this.currenTrip
      try {
        const { data } = await apiFromBackend.post("/api/sitios", {
          placeID: this.placeId,
          idViajes: travel.idViajes,
          fechaEspecifica: date,
          nombrePlaces: this.namePlace,
          imagePlaces: this.imgPlace,
        })
        toast.success(data.mensaje, {
          theme: "colored",
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 1500,
          hideProgressBar: true,
        })
      } catch ({ response }) {
        toast.error(response.data.mensaje, {
          theme: "colored",
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 1500,
          hideProgressBar: true,
        })
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
