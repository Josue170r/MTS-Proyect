<template>
  <button
    @click="toggleMenu"
    class="block md:hidden text-white p-2 focus:outline-none"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      class="h-6 w-6"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M4 6h16M4 12h16M4 18h16"
      />
    </svg>
  </button>
</template>

<script>
export default {
  methods: {
    toggleMenu() {
      // Implementa la lógica para mostrar u ocultar el menú desplegable aquí
      this.$emit("toggle-menu")
    },
  },
}
</script>

<style scoped>
/* Puedes agregar estilos específicos para este botón si lo deseas */
</style>
