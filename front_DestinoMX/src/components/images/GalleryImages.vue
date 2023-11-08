<template>
  <div>
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
      <swiper-slide v-for="image in photosSwiper" :key="image">
        <img :src="image" alt="Imagen" />
      </swiper-slide>
    </swiper>
    <!-- <div class="modal" v-if="showImage">
      <div class="modal-content">
        <img @click="closeZoomImage" :src="zoomedImage" :alt="zoomedImage" />
      </div>
    </div> -->
  </div>
</template>

<script>
import { Swiper, SwiperSlide } from "swiper/vue"
import "swiper/css"
import "swiper/css/pagination"
import { Pagination } from "swiper/modules"
// import { toRaw } from "vue"
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
    console.log("Desde galería de imágenes:", this.photosArray)
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

/* Estilos para la ventana modal */
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
}

.modal-content {
  background: #fff;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
}

.modal-content img {
  width: 100%;
  height: auto;
}
</style>
