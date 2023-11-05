<template>
  <div id="app">
    <!-- Contenedor de la imagen de fondo -->
    <div class="relative">
      <AvatarButton />
      <img
        src="@/assets/images/imagen003.png"
        alt="imagen003"
        class="w-full h-full object-cover"
      />
      <input
        type="text"
        class="mt-16 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-2 bg-white border border-gray-300 rounded-md"
        placeholder="Buscar..."
      />
    </div>
    <div>
      <a>Primera parte</a>
    </div>
    <div>
      <a>Segunda parte</a>
    </div>
  </div>
</template>

<script>
import AvatarButton from "@/components/buttons/AvatarButton"
export default {
  name: "homeScreen",
  components: {
    AvatarButton,
  },
}
</script>
