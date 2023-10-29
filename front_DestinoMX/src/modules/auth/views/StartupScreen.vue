<template>
  <div class="min-h-screen w-full flex flex-col md:flex-row justify-center">
    <div class="min-h-screen flex flex-col items-center mx-auto">
      <div class="justify-center items-center">
        <img
          src="@/assets/images/DestinoMX.png"
          alt="logo"
          class="mx-auto w-64 sm:-mt-34 p-2 pl-8"
        />

        <button
          type="button"
          class="block w-64 mt-96 py-4 rounded-lg text-black font-semibold bg-orange-300 mb-2"
        >
          Iniciar Sesión
        </button>
        <button
          type="button"
          class="block w-64 py-4 rounded-lg text-black font-semibold bg-white"
        >
          Crear cuenta
        </button>
      </div>
    </div>
  </div>
</template>

<style>
body {
  background-image: url("@/assets/images/fondoPantallaInicio.jpg");
  background-size: cover;
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-position: center;
  height: 100vh;
}
</style>

<script>
export default {
  name: "StartupScreen",
  components: {},
};
</script>
