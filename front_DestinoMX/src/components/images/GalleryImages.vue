<template>
  <swiper
    :slidesPerView="2"
    :spaceBetween="5"
    :pagination="{
      clickable: true,
      el: '.swiper-pagination-custom',
    }"
    :modules="modules"
    class="swiper-slide"
  >
    <!-- <swiper-slide v-for="(image, index) in this.images" :key="index"> -->
    <swiper-slide>
      <img src="./arena.jpg" alt="Imagen 1" />
    </swiper-slide>
    <swiper-slide>
      <img src="./colores.jpg" alt="Imagen 2" />
    </swiper-slide>
    <swiper-slide>
      <img src="./espacio.jpg" alt="Imagen 3" />
    </swiper-slide>
    <swiper-slide>
      <img src="./mesa.jpg" alt="Imagen 1" />
    </swiper-slide>
    <swiper-slide>
      <img src="./playa.jpg" alt="Imagen 2" />
    </swiper-slide>
    <swiper-slide>
      <img src="./rayo.jpg" alt="Imagen 3" />
    </swiper-slide>
  </swiper>
</template>

<script>
// Import Swiper Vue.js components
import { Swiper, SwiperSlide } from "swiper/vue"

// Import Swiper styles
import "swiper/css"

import "swiper/css/pagination"

// import required modules
import { Pagination } from "swiper/modules"
//  import arena from ""
// import colores from "@/assets/images/colores.jpg"
// import espacio from "@/assets/images/espacio.jpg"
// import mesa from "@/assets/images/mesa.jpg"
// import playa from "@/assets/images/playa.jpg"
// import rayo from "@/assets/images/rayo.jpg"

export default {
  name: "GalleryImages",
  components: {
    Swiper,
    SwiperSlide,
  },
  data() {
    return {
      // images: [arena, colores, espacio, mesa, playa, rayo],
      // images: ["@/arena.jpg"],
    }
  },
  setup() {
    return {
      modules: [Pagination],
    }
  },
}
</script>

<style scoped>
/* Personaliza la paginación para posicionarla debajo de las imágenes y hacerla más grande */
.swiper-slide {
  /* Elimina el fondo de cada slide */
  background: transparent;
  text-align: center;
  font-size: 18px;

  /* Center slide content vertically */
  display: flex;
  justify-content: center;
  align-items: center;
}

.swiper-slide img {
  display: block;
  width: 100%;
  height: 200px;
  object-fit: cover;
  background: transparent;
}
</style>
