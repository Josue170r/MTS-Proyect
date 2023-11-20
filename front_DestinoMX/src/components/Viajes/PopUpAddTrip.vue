<template>
  <div class="popup-overlay relative z-10">
    <div class="popup-container">
      <h1 class="text-2xl font-bold mb-4">
        ¿A qué viaje le gustaría agregar este destino?
      </h1>

      <!--Slider-->

      <!-- <p class="mt-4">Slider</p>
      {{ viaje.img }}
      {{ viaje.name }}
      {{ viaje.rango }}
      {{ viaje.description }}
    </EditTrip>
    </AddTrip>  -->

      <!-- Botones -->
      <div class="flex justify-between mt-4">
        <button
          @click="cancel"
          class="flex font-quicksand rounded-lg text-black text-base font-semibold mb-4 ml-8 bg-gray-100 p-2 custom-button"
        >
          Cancelar
        </button>
        <button
          @click="createNewTrip"
          class="flex font-quicksand rounded-lg text-black text-base font-semibold mb-4 mr-8 bg-orange-500 p-2 custom-button"
        >
          Crear nuevo viaje
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
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
  max-width: 400px;
  height: 680px;
  width: 100%;
  text-align: center;
}

.popup-container .custom-button {
  margin-top: 130%;
}
</style>
