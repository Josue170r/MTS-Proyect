<template>
  <div>
    <button @click="goBack">
      <RatingIcon />
    </button>
  </div>
</template>

<script>
import RatingIcon from "@/components/icons/RatingIcon.vue"
export default {
  name: "RatingButton",
  components: {
    RatingIcon,
  },
  methods: {
    showRatingPopup() {
      // Emitir un evento para indicar al componente principal que debe mostrar el PopUp
      this.$emit("show-popup")
    },
  },
}
</script>
