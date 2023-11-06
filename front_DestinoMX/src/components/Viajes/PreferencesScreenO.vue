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

    <!--PRUEBA BOTONES-->

    <div>
      <div class="button-container">
        <div class="column">
          <!--BOTONES DE LA 1 COLUMNA-->

          <button class="botones">
            <img
              src="@/assets/images/fairIcon.png"
              alt="Icono"
              class="button-image"
            /><span>Parque de Atracciones</span>
          </button>

          <button class="botones">
            <img
              src="@/assets/images/churchIcon.jpg"
              alt="Icono"
              class="button-image"
            /><spann>Lugares Religiosos</spann>
          </button>

          <button class="botones">
            <img
              src="@/assets/images/nature.png"
              alt="Icono"
              class="button-image"
            /><span>Parques y Areas Naturales</span>
          </button>

          <button class="botones">
            <img
              src="@/assets/images/museumIcon.jpg"
              alt="Icono"
              class="button-image"
            /><span>Museos Y Galerias</span>
          </button>

          <button class="botones">
            <img
              src="@/assets/images/barIcon.png"
              alt="Icono"
              class="button-image"
            /><span>Clubes Nocturnos</span>
          </button>

          <button class="botones">
            <img
              src="@/assets/images/barIcon.png"
              alt="Icono"
              class="button-image"
            /><sppan>Bares y Pubs</sppan>
          </button>

          <button class="botones">
            <img
              src="@/assets/images/cinemaIcon.png"
              alt="Icono"
              class="button-image"
            /><span>Centros de Entretenimiento</span>
          </button>

          <!-- FIN BOTONES DE LA 1 COLUMNA-->
        </div>

        <div class="column">
          <!--BOTONES DE LA 2 COLUMNA-->

          <button class="botones">
            <img
              src="@/assets/images/resIcon.png"
              alt="Icono"
              class="button-image"
            /><span>Restaurantes</span>
          </button>

          <button class="botones">
            <img
              src="@/assets/images/coffeeIcon.png"
              alt="Icono"
              class="button-image"
            /><span>cafeterias</span>
          </button>

          <button class="botones">
            <img
              src="@/assets/images/gymIcon.jpg"
              alt="Icono"
              class="button-image"
            /><span>GYM</span>
          </button>

          <button class="botones">
            <img
              src="@/assets/images/mallicon.png"
              alt="Icono"
              class="button-image"
            /><span>Plazas</span>
          </button>

          <button class="botones">
            <img
              src="@/assets/images/hoteIcon.png"
              alt="Icono"
              class="button-image"
            /><span>Hoteles</span>
          </button>

          <button class="botones">
            <img
              src="@/assets/images/libraryIcon.png"
              alt="Icono"
              class="button-image"
            />
            <span>Bibliotecas</span>
          </button>

          <button class="botones">
            <img
              src="@/assets/images/monumentIcon.png"
              alt="Icono"
              class="button-image"
            /><span>Monumentos</span>
          </button>

          <!--fin BOTONES DE LA 2 COLUMNA-->
        </div>
      </div>
    </div>

    <!--PRUEBA BOTONES-->
  </div>
  <!--div del ap-->
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

export default {
  name: "PreferencesScreenO",
  components: {
    AvatarButton,
  },
}
</script>

<style>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
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

.button-image {
  width: 24px; /* Ajusta el tamaño de la imagen según tus preferencias */
  height: 24px;
  margin-right: 8px; /* Agrega un margen a la derecha para separar la imagen del texto */
  background-position: right; /* Posición de la imagen */
}

.button-images {
  width: 12px;
  height: 12px;
  background-size: contain; /* Ajusta la imagen al tamaño del elemento */
  background-position: left center; /* Posición de la imagen a la izquierda del texto */
  background-repeat: no-repeat; /* Evita la repetición de la imagen de fondo */
  padding: 10px 20px; /* Ajusta el relleno según tus necesidades */
  text-align: center; /* Centra el texto horizontalmente */
  border: none; /* Elimina el borde del botón */
  cursor: pointer;
}
.button-container {
  display: flex;
  justify-content: center;
}

.column {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 20px; /* Agrega un margen entre las columnas si lo deseas */
}

.botones {
  margin: 5px; /* Agrega margen entre los botones si lo deseas */
  padding: 10px;
  border: none;
  cursor: pointer;
  color: black;
  font-weight: bold; /* font-semibold */
  background-color: #ffa500; /* bg-orange-300 */
  background-position: right center;
}
</style>
