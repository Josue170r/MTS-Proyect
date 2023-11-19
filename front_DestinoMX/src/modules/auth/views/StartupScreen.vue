<template>
  <div
    class="startup-screen min-h-screen w-full flex flex-col md:flex-row justify-center"
  >
    <div class="flex flex-col items-center mx-auto">
      <div class="justify-center items-center">
        <img
          src="@/assets/images/DestinoMX.png"
          alt="logo"
          class="mx-auto w-64 sm:-mt-34 p-2 pl-8"
        />

        <button
          type="button"
          @click="goToLoginView"
          class="block w-64 mt-96 py-4 rounded-lg text-black font-semibold bg-orange-300 mb-2"
        >
          Iniciar Sesión
        </button>
        <button
          @click="goToRegisterForm"
          type="button"
          class="block w-64 py-4 rounded-lg text-black font-semibold bg-white"
        >
          Crear cuenta
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "StartupScreen",
  components: {},
  methods: {
    goToLoginView() {
      this.$router.push({
        name: "login",
      })
    },
    goToRegisterForm() {
      this.$router.push({
        name: "register-form",
      })
    },
  },
}
</script>

<style scoped>
.startup-screen {
  background-image: url("@/assets/images/fondoPantallaInicio.jpg");
  background-size: cover;
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-position: center;
  height: 100vh;
}
</style>
