<template>
  <div id="app">
    <!-- Contenedor de la imagen de fondo -->
    <div class="relative">
      <!-- Contenedor del botón de avatar -->
      <div class="absolute top-6 right-2 transform -translate-x-1">
        <AvatarButton />
      </div>

      <!-- TITULO PREFERENCIAS -->
      <div
        class="mt-16 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-2 border-gray-300 rounded-md flex items-center justify-center w-full flex-col"
      >
        <h1 style="font-size: 45px; font-weight: bold">Preferencias</h1>
      </div>

      <img
        src="@/assets/images/imagen003.png"
        alt="imagen003"
        class="w-full h-full object-cover"
      />
    </div>
    <div class="flex items-center justify-center w-full flex-col">
      <h1 class="text-xl text-center">
        Elija al menos 3 de las categorias mas interesantes para ti
      </h1>
    </div>

    <!--PRUEBA BOTONES-->

    <!--DIV DE PRUEBA PARA BORDE -->
    <div class="p-4">
      <div>
        <div
          class="grid grid-cols-1 sm:grid-cols-2 gap-2 gap-y-1 gap-x-3 sm:w-max"
        ></div>
        <!--CLASE ANTIGUA-->
        <div
          class="grid grid-cols-2 gap-2 gap-y-1 gap-x-3 flex items-center justify-center"
        >
          <!--CLASE ANTIGUA-->
          <!--BOTON1-->

          <div>
            <button
              class="w-full sm:w-max py-2 rounded-lg text-black font-semibold bg-orange-300 mb-2 flex items-center justify-center pl-4 pr-4"
            >
              <img
                src="@/assets/images/PreferencesImages/fairIcon.png"
                alt="Icono"
                class="w-6 h-6 items-center mr-1"
              /><span>Parque de Atracciones</span>
            </button>
          </div>

          <div>
            <button
              class="w-full sm:w-max py-2 rounded-lg text-black font-semibold bg-orange-300 mb-2 flex items-center justify-center"
            >
              <img
                src="@/assets/images/PreferencesImages/churchIcon.jpg"
                alt="Icono"
                class="w-6 h-6 items-center mr-1"
              /><span>Lugares Religiosos</span>
            </button>
          </div>

          <div>
            <button
              class="w-full sm:w-max py-2 rounded-lg text-black font-semibold bg-orange-300 mb-2 flex items-center justify-center"
            >
              <img
                src="@/assets/images/PreferencesImages/nature.png"
                alt="Icono"
                class="w-9 h-9 items-center mr-1"
              /><span>Parques y Areas Naturales</span>
            </button>
          </div>

          <div>
            <button
              class="w-full sm:w-max py-2 rounded-lg text-black font-semibold bg-orange-300 mb-2 flex items-center justify-center"
            >
              <img
                src="@/assets/images/PreferencesImages/museumIcon.jpg"
                alt="Icono"
                class="w-6 h-6 items-center mr-1"
              /><span>Museos Y Galerias</span>
            </button>
          </div>

          <div>
            <button
              class="w-full sm:w-max py-2 rounded-lg text-black font-semibold bg-orange-300 mb-2 flex items-center justify-center"
            >
              <img
                src="@/assets/images/PreferencesImages/barIcon.png"
                alt="Icono"
                class="w-6 h-6 items-center mr-1"
              /><sppan>Bares y Pubs</sppan>
            </button>
          </div>

          <div>
            <button
              class="w-full sm:w-max py-2 rounded-lg text-black font-semibold bg-orange-300 mb-2 flex items-center justify-center"
            >
              <img
                src="@/assets/images/PreferencesImages/nightclubIcon.png"
                alt="Icono"
                class="w-6 h-6 items-center mr-1"
              /><span>Clubes Nocturnos</span>
            </button>
          </div>

          <div>
            <button
              class="w-full sm:w-max py-2 rounded-lg text-black font-semibold bg-orange-300 mb-2 flex items-center justify-center"
            >
              <img
                src="@/assets/images/PreferencesImages/cinemaIcon.png"
                alt="Icono"
                class="w-9 h-9 items-center mr-1"
              /><span>Centros de Entretenimiento</span>
            </button>
          </div>

          <div>
            <button
              class="w-full sm:w-max py-2 rounded-lg text-black font-semibold bg-orange-300 mb-2 flex items-center justify-center"
            >
              <img
                src="@/assets/images/PreferencesImages/resIcon.png"
                alt="Icono"
                class="w-6 h-6 items-center mr-1"
              /><span>Restaurantes</span>
            </button>
          </div>

          <div>
            <button
              class="w-full sm:w-max py-2 rounded-lg text-black font-semibold bg-orange-300 mb-2 flex items-center justify-center"
            >
              <img
                src="@/assets/images/PreferencesImages/coffeeIcon.png"
                alt="Icono"
                class="w-6 h-6 items-center mr-1"
              /><span>Cafeterias</span>
            </button>
          </div>

          <div>
            <button
              class="w-full sm:w-max py-2 rounded-lg text-black font-semibold bg-orange-300 mb-2 flex items-center justify-center"
            >
              <img
                src="@/assets/images/PreferencesImages/gymIcon.jpg"
                alt="Icono"
                class="w-6 h-6 items-center mr-1"
              /><span>GYM</span>
            </button>
          </div>

          <div>
            <button
              class="w-full sm:w-max py-2 rounded-lg text-black font-semibold bg-orange-300 mb-2 flex items-center justify-center"
            >
              <img
                src="@/assets/images/PreferencesImages/mallicon.png"
                alt="Icono"
                class="w-6 h-6 items-center mr-1"
              /><span>Plazas</span>
            </button>
          </div>

          <div>
            <button
              class="w-full sm:w-max py-2 rounded-lg text-black font-semibold bg-orange-300 mb-2 flex items-center justify-center"
            >
              <img
                src="@/assets/images/PreferencesImages/hoteIcon.png"
                alt="Icono"
                class="w-6 h-6 items-center mr-1"
              /><span>Hoteles</span>
            </button>
          </div>

          <div>
            <button
              class="w-full sm:w-max py-2 rounded-lg text-black font-semibold bg-orange-300 mb-2 flex items-center justify-center"
            >
              <img
                src="@/assets/images/PreferencesImages/libraryIcon.png"
                alt="Icono"
                class="w-6 h-6 items-center mr-1"
              />
              <span>Bibliotecas</span>
            </button>
          </div>

          <div>
            <button
              class="w-full sm:w-max py-2 rounded-lg text-black font-semibold bg-orange-300 mb-2 flex items-center justify-center"
            >
              <img
                src="@/assets/images/PreferencesImages/monumentIcon.png"
                alt="Icono"
                class="w-6 h-6 items-center mr-1"
              /><span>Monumentos</span>
            </button>
          </div>
        </div>
        <!--DIV DE PRUEBA PARA BORDE -->
        <!--FIN BOTONES-->
      </div>
    </div>
    <!--div de botones inicio-->
    <div class="flex items-center justify-center">
      <button
        class="w-72 mt-2 py-6 rounded-lg text-black font-semibold bg-yellow-400 mb-6 flex items-center justify-center"
      >
        <img
          src="@/assets/images/PreferencesImages/saveIcon.png"
          alt="Icono"
          class="w-6 h-6 items-center mr-1"
        />
        <span>Guardar</span>
      </button>
    </div>
  </div>
  <!--div del ap-->

  <!--Boton guardar-->
</template>

<script>
import AvatarButton from "@/components/buttons/AvatarButton"

export default {
  name: "PreferencesScreen",
  components: {
    AvatarButton,
  },
}
</script>

<style></style>
