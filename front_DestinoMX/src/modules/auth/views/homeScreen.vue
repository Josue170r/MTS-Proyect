<template>
  <div>
    <div class="relative">
      <img
        src="@/assets/images/imagen001.jpg"
        alt="Imagen Normal"
        class="w-full h-auto"
      />
      <img
        src="@/assets/images/DestinoMX.png"
        alt="Imagen Superpuesta"
        class="absolute top-0 left-0 w-full h-auto"
        style="z-index: 1"
      />
    </div>
    <!-- Agrega aquí el contenido del menú desplegable -->
    <div v-if="showMenu" class="md:hidden bg-gray-800 text-white p-4">
      <ul>
        <li><a href="#">Inicio</a></li>
        <li><a href="#">Acerca de</a></li>
        <li><a href="#">Contacto</a></li>
      </ul>
    </div>
  </div>
</template>

<script>
/*import BurgerButton from "@/components/buttons/BurgerButton"

export default {
  components: {
    BurgerButton,
  },
  data() {
    return {
      showMenu: false,
    }
  },
  methods: {
    toggleMenu() {
      this.showMenu = !this.showMenu
    },
  },
}*/
</script>
