<template>
  <div>
    <button @click="goBack">
      <BackButtonIcon />
    </button>
  </div>
</template>

<script>
import BackButtonIcon from "@/components/icons/BackButtonIcon.vue"
export default {
  name: "BackButton",
  components: {
    BackButtonIcon,
  },
  methods: {
    goBack() {
      this.$router.go(-1) // Utiliza $router para acceder al router de Vue.js
    },
  },
}
</script>

<style>
/* Agrega tus estilos aquí si es necesario */
</style>
