<template>
  <div>
    <swiper
      :slidesPerView="2"
      :spaceBetween="5"
      :autoplay="{
        delay: 2000,
      }"
      :modules="modules"
      class="swiper-slide"
    >
      <swiper-slide v-for="image in photosSwiper" :key="image">
        <img :src="image" alt="Imagen" />
      </swiper-slide>
    </swiper>
  </div>
</template>

<script>
import { Swiper, SwiperSlide } from "swiper/vue"
import "swiper/css"
import "swiper/css/pagination"
import "swiper/css/navigation"
import { Autoplay, Pagination } from "swiper/modules"

export default {
  name: "GalleryImages",
  data() {
    return {
      showImage: false,
      zoomedImage: "",
      photosSwiper: [],
    }
  },
  props: {
    photosArray: {
      type: Array,
      required: false,
    },
  },
  components: {
    Swiper,
    SwiperSlide,
  },
  updated() {
    this.photosSwiper = this.photosArray
  },
  methods: {
    zoomImage(image) {
      this.showImage = true
      this.zoomedImage = image
    },
    closeZoomImage() {
      this.showImage = false
    },
  },
  setup() {
    return {
      modules: [Autoplay, Pagination],
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
