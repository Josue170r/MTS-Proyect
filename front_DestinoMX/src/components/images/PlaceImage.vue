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
      apiKey: "AIzaSyA7zLTbiIG9CpbTiNfZMQZZUoPMo8kbh70",
    };
  },
  mounted() {
    if (this.placeName) {
      this.getPlaceDetails();
      // this.getPlacePhoto()
    }
  },
  methods: {
    getPlaceDetails() {
      // Codifica el nombre del lugar para incluirlo en la URL de la solicitud
      const encodedPlaceName = encodeURIComponent(this.placeName);
      console.log(encodedPlaceName);
      console.log(this.apiKey);
      // Realiza una solicitud a la API de Google Places para buscar el lugar por nombre
      fetch(
        `https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=${encodedPlaceName}&inputtype=textquery&fields=photos&key=${this.apiKey}`,
      )
        .then((response) => console.log(response))
        .then((data) => {
          console.log(data);
          // if (data.candidates && data.candidates.length > 0) {
          //   this.getPlacePhoto(data.candidates[0].place_id)
          // }
        })
        .catch((error) => {
          console.error("Error al buscar el lugar:", error);
        });
    },
    // getPlacePhoto(placeId) {
    //   console.log(placeId)
    //   // Realiza una solicitud a la API de Google Places para obtener detalles de fotos del lugar
    //   fetch(
    //     `https://maps.googleapis.com/maps/api/place/details/json?placeid=${placeId}&fields=photos&key=${this.apiKey}`,
    //   )
    //     .then((response) => response.json())
    //     .then((data) => {
    //       console.log("Resultados de findplacefromtext:", data) //línea para ver los resultados
    //       if (
    //         data.result &&
    //         data.result.photos &&
    //         data.result.photos.length > 0
    //       ) {
    //         // Si se encontraron fotos, muestra la primera foto
    //         this.placeImage = this.getPlacePhotoURL(
    //           data.result.photos[0].photo_reference,
    //         )
    //       }
    //     })
    //     .catch((error) => {
    //       console.error("Error al obtener detalles del lugar:", error)
    //     })
    // },
    // getPlacePhotoURL(photoReference) {
    //   // Construye la URL de la imagen del lugar
    //   return `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${photoReference}&key=${this.apiKey}`
    // },
  },
};
</script>
