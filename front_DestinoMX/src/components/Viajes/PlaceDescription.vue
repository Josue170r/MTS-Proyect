<template>
  <div>
    <!-- Contenido de tu vista -->
    <place-image placeName="Basilica" />
  </div>
</template>

<script>
import PlaceImage from "@/components/images/PlaceImage" // Asegúrate de ajustar la ruta al archivo del componente

export default {
  name: "PlaceDescription",
  components: {
    PlaceImage,
  },
  // Resto de la configuración de tu vista
}
</script>
