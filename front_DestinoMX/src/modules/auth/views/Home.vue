<template>
  <nav class="bg-gray-800 p-4">
    <div class="flex items-center justify-between">
      <button @click="toggleMenu" class="text-white p-2 md:hidden">
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
    </div>
  </nav>
</template>

<script>
export default {
  methods: {
    toggleMenu() {
      // Agrega la lógica para mostrar o ocultar el menú desplegable aquí
    },
  },
}
</script>
