<template>
  <div>
    <h1>{{ placeName }}</h1>
    <img :src="placeImage" alt="Imagen del lugar" />
  </div>
</template>

<script>
import { getImgPlaceApi } from "@/components/images/helpers/getImagePlace"
import { toRaw } from "vue"
export default {
  name: "PlaceImage",
  data() {
    return {
      placeImage: "",
      apiKey: "AIzaSyA7zLTbiIG9CpbTiNfZMQZZUoPMo8kbh70",
      placeName: "",
      placePhotoReference: "",
    }
  },
  // mounted() {
  //   if (this.placeName) {
  //     this.getPlaceDetails()
  //     // this.getPlacePhoto()
  //   }
  // },
  created() {
    this.placePhotoReference = this.$route.query.photos
    console.log(this.placePhotoReference)
    this.getImgPlace()
  },
  methods: {
    // getPlaceDetails() {
    //   // Codifica el nombre del lugar para incluirlo en la URL de la solicitud
    //   const encodedPlaceName = encodeURIComponent(this.placeName)
    //   console.log(encodedPlaceName)
    //   console.log(this.apiKey)
    //   // Realiza una solicitud a la API de Google Places para buscar el lugar por nombre
    //   fetch(
    //     `https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=${encodedPlaceName}&inputtype=textquery&fields=photos&key=${this.apiKey}`,
    //   )
    //     .then((response) => console.log(response))
    //     .then((data) => {
    //       console.log(data)
    //       // if (data.candidates && data.candidates.length > 0) {
    //       //   this.getPlacePhoto(data.candidates[0].place_id)
    //       // }
    //     })
    //     .catch((error) => {
    //       console.error("Error al buscar el lugar:", error)
    //     })
    // },
    async getImgPlace() {
      try {
        const img = await getImgPlaceApi.get("/photo", {
          params: {
            maxwidth: "400",
            photoreference: this.placePhotoReference,
            key: this.apiKey,
          },
        })
        this.placeImage = toRaw(img.request.responseURL)
        console.log(this.placeImage)
      } catch (error) {
        console.log(error)
      }
    },
  },
}
</script>
