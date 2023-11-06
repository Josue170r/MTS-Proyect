<template>
  <div id="app">
    <!-- Contenedor de la imagen de fondo -->
    <div class="relative">
      <!-- Contenedor del botón de avatar -->
      <div class="absolute top-6 right-2 transform -translate-x-1">
        <AvatarButton />
      </div>
      <div>
        <BurgerMenu />
      </div>

      <!-- TITULO PREFERENCIAS -->
      <div
        class="mt-16 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-2 border-gray-300 rounded-md flex items-center"
      >
        <h1 style="font-size: 45px; font-weight: bold">PREFERENCIAS</h1>
      </div>

      <img
        src="@/assets/images/imagen003.png"
        alt="imagen003"
        class="w-full h-full object-cover"
      />
    </div>
    <div class="flex items-center justify-center w-full flex-col">
      <h1 class="text-xl text-center">
        ELIJA AL MENOS 3 DE LAS CATEGORIAS MAS INTERESANTES PARA TI
      </h1>
    </div>
    <!--
    AQUI EMPIEZA

-->

    <div class="container">
      <div class="column">
        <div class="row">
          <div class="col-md-6">
            <!-- Columna izquierda -->
            <div class="row">
              <div class="col-md-12">
                <button class="caseB">
                  <img
                    src="@/assets/images/fairIcon.png"
                    alt="Icono"
                    class="button-image"
                  /><span>Parque de Atracciones</span>
                </button>
              </div>
              <div class="col-md-12">
                <button class="caseB">
                  <img
                    src="@/assets/images/barIcon.png"
                    alt="Icono"
                    class="button-image"
                  /><sppan>Bares y Pubs</sppan>
                </button>
              </div>
              <div class="col-md-12">
                <button class="caseB">
                  <img
                    src="@/assets/images/churchIcon.jpg"
                    alt="Icono"
                    class="button-image"
                  /><spann>Lugares Religiosos</spann>
                </button>
              </div>
              <div class="col-md-12">
                <button class="caseB">
                  <img
                    src="@/assets/images/nature.png"
                    alt="Icono"
                    class="button-image"
                  /><span>Parques y Areas Naturales</span>
                </button>
              </div>
              <div class="col-md-12">
                <button class="caseB">
                  <img
                    src="@/assets/images/museumIcon.jpg"
                    alt="Icono"
                    class="button-image"
                  /><span>Museos</span>
                </button>
              </div>
              <div class="col-md-12">
                <button class="caseB">
                  <img
                    src="@/assets/images/barIcon.png"
                    alt="Icono"
                    class="button-image"
                  /><span>Clubes Nocturnos</span>
                </button>
              </div>

              <div class="col-md-12">
                <button class="caseB">
                  <img
                    src="@/assets/images/nightIcon.png"
                    alt="Icono"
                    class="button-image"
                  /><span>Centros de Entretenimiento</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        <div class="col-md-6">
          <!-- Columna derecha -->

          <div class="column">
            <div class="row">
              <div class="col-md-12">
                <button class="caseB1">
                  <img
                    src="@/assets/images/resIcon.png"
                    alt="Icono"
                    class="button-image"
                  /><span>Restaurantes</span>
                </button>
              </div>
              <div class="col-md-12">
                <button class="caseB1">
                  <img
                    src="@/assets/images/coffeeIcon.png"
                    alt="Icono"
                    class="button-image"
                  /><span>cafeterias</span>
                </button>
              </div>

              <div class="col-md-12">
                <button class="caseB1">
                  <img
                    src="@/assets/images/gymIcon.jpg"
                    alt="Icono"
                    class="button-image"
                  /><span>GYM</span>
                </button>
              </div>

              <div class="col-md-12">
                <button class="caseB1">
                  <img
                    src="@/assets/images/mallicon.png"
                    alt="Icono"
                    class="button-image"
                  /><span>Plazas</span>
                </button>
              </div>

              <div class="col-md-12">
                <button class="caseB1">
                  <img
                    src="@/assets/images/hoteIcon.png"
                    alt="Icono"
                    class="button-image"
                  /><span>Hoteles</span>
                </button>
              </div>

              <div class="col-md-12">
                <button class="caseB1">
                  <img
                    src="@/assets/images/libraryIcon.png"
                    alt="Icono"
                    class="button-image"
                  />
                  <span>Bibliotecas</span>
                </button>
              </div>

              <div class="col-md-12">
                <button class="caseB1">
                  <img
                    src="@/assets/images/monumentIcon.png"
                    alt="Icono"
                    class="button-image"
                  /><span>Monumentos</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!--Boton guardar-->
  <div class="container">
    <button class="caseB1G">
      <img
        src="@/assets/images/saveIcon.png"
        alt="Icono"
        class="button-image"
      />
      <span>GUARDAR</span>
    </button>
  </div>
</template>

<script>
import AvatarButton from "@/components/buttons/AvatarButton"
import BurgerMenu from "@/components/buttons/BurgerMenu.vue"
import { toast } from "vue3-toastify"

export default {
  name: "PreferencesScreen",
  components: {
    AvatarButton,
    BurgerMenu,
  },
  data() {
    return {
      apiKey: "AIzaSyA7zLTbiIG9CpbTiNfZMQZZUoPMo8kbh70",
      relativePosition: "",
    }
  },
  created() {
    this.$getLocation()
      .then((coordinates) => {
        this.relativePosition = { lat: coordinates.lat, lng: coordinates.lng }
        console.log(coordinates)
      })
      .catch((error) => {
        toast(error, {
          hideProgressBar: true,
          autoClose: 1500,
          type: "error",
          theme: "colored",
        })
      })
  },
}
</script>

<style>
.caseB {
  display: flex;
  align-items: center;
  width: 165px;
  margin-top: 4px;
  padding: 4px;
  border-radius: 10px; /* rounded-lg */
  color: black;
  font-weight: bold; /* font-semibold */
  background-color: #ffa500; /* bg-orange-300 */
  margin-bottom: 2px;
}

.caseB1 {
  width: 165px;
  margin-top: 4px;
  padding: 4px;
  border-radius: 10px; /* rounded-lg */
  color: black;
  font-weight: bold; /* font-semibold */
  background-color: #ffa500; /* bg-orange-300 */
  margin-bottom: 2px;
}

.caseB1G {
  width: 165px;
  margin-top: 4px;
  padding: 4px;
  border-radius: 10px; /* rounded-lg */
  color: black;
  font-weight: bold; /* font-semibold */
  background-color: #5ba85b; /* bg-orange-300 */
  margin-bottom: 2px;
}
.button-with-image {
  display: flex;
  align-items: center;
  padding: 10px;
  background-color: #007bff;
  color: white;
  border: none;
  cursor: pointer;
}
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.column {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 20px; /* Agrega un margen entre las columnas si lo deseas */
}

.button-image {
  width: 24px; /* Ajusta el tamaño de la imagen según tus preferencias */
  height: 24px;
  margin-right: 8px; /* Agrega un margen a la derecha para separar la imagen del texto */
}
</style>
