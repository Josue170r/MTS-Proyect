<template>
  <div>
    <h1>{{ placeName }}</h1>
    <img :src="placeImage" alt="Imagen del lugar" />
  </div>
</template>

<script>
export default {
  name: "PlaceImage",
  props: {
    placeName: String, // Nombre del lugar
  },
  data() {
    return {
      placeImage: "",
    };
  },
  mounted() {
    if (this.placeName) {
      this.getPlaceDetails();
    }
  },
  methods: {
    getPlaceDetails() {
      // Reemplaza 'TU_CLAVE_DE_API' con tu propia clave de API de Google Places
      const apiKey = "AIzaSyA7zLTbiIG9CpbTiNfZMQZZUoPMo8kbh70";

      // Codifica el nombre del lugar para incluirlo en la URL de la solicitud
      const encodedPlaceName = encodeURIComponent(this.placeName);

      // Realiza una solicitud a la API de Google Places para buscar el lugar por nombre
      fetch(
        `https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=${encodedPlaceName}&inputtype=textquery&fields=photos&key=${apiKey}`,
      )
        .then((response) => response.json())
        .then((data) => {
          if (data.candidates && data.candidates.length > 0) {
            // Si se encontraron resultados, obtén detalles del primer resultado
            this.getPlacePhoto(data.candidates[0].place_id);
          }
        })
        .catch((error) => {
          console.error("Error al buscar el lugar:", error);
        });
    },
    getPlacePhoto(placeId) {
      const apiKey = "AIzaSyA7zLTbiIG9CpbTiNfZMQZZUoPMo8kbh70";
      // Realiza una solicitud a la API de Google Places para obtener detalles de fotos del lugar
      fetch(
        `https://maps.googleapis.com/maps/api/place/details/json?placeid=${placeId}&fields=photos&key=${apiKey}`,
      )
        .then((response) => response.json())
        .then((data) => {
          console.log("Resultados de findplacefromtext:", data); //línea para ver los resultados
          if (
            data.result &&
            data.result.photos &&
            data.result.photos.length > 0
          ) {
            // Si se encontraron fotos, muestra la primera foto
            this.placeImage = this.getPlacePhotoURL(
              data.result.photos[0].photo_reference,
            );
          }
        })
        .catch((error) => {
          console.error("Error al obtener detalles del lugar:", error);
        });
    },
    getPlacePhotoURL(photoReference) {
      const apiKey = "AIzaSyA7zLTbiIG9CpbTiNfZMQZZUoPMo8kbh70";
      // Construye la URL de la imagen del lugar
      return `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${photoReference}&key=${apiKey}`;
    },
  },
};
</script>
