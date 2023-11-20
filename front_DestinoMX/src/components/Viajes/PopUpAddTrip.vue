<template>
  <div class="popup-overlay relative z-10">
    <div class="popup-container">
      <h1 class="text-2xl font-bold mb-2">
        ¿A qué viaje le gustaría agregar este destino?
      </h1>

      <div v-if="viajes.length">
        <!--Slider-->
        <v-carousel class="hide-arrows" vertical>
          <v-carousel-item v-for="(viaje, index) in viajes" :key="index">
            <v-row>
              <!-- Contenido del slider -->
              <v-col cols="12" md="6">
                <img :src="viaje.img" alt="Imagen del viaje" />
              </v-col>
              <v-col cols="12" md="6">
                <h2 class="text-xl font-semibold">{{ viaje.name }}</h2>
                <p>{{ viaje.fechas }}</p>
                <p>{{ viaje.description }}</p>
              </v-col>
            </v-row>
          </v-carousel-item>
        </v-carousel>
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
          v-if="!viajes.length"
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
export default {
  data() {
    return {
      viajes: [],
    }
  },
  methods: {
    cancel() {
      this.$emit("close-popup")
    },
    createNewTrip() {
      this.$router.push({ name: "newtrip" })
      this.$emit("close-popup")
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
.hide-arrows .v-carousel__controls {
  display: none !important;
}
</style>
