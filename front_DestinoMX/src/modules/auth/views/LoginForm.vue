<template>
  <div class="min-h-screen w-full flex flex-col md:flex-row">
    <div
      class="flex flex-col md:w-1/2 py-5 justify-center items-center bg-orange-400"
    >
      <img src="@/assets/images/imagen001.jpg" alt="imagen001" class="-mt-8" />
      <img
        src="@/assets/images/DestinoMX.png"
        alt="logo"
        class="mx-auto -mt-48 w-96 justify-center"
      />
      <div class="mt-3">
        <h1 class="text-white font-bold text-4xl font-sans">Destino MX</h1>
        <h3 class="text-white mt-1">by Mexico Travel Solutions</h3>
      </div>
    </div>
    <div class="flex md:w-1/2 flex-1 justify-center items-center bg-gray-200">
      <div class="bg-accent w-full px-5">
        <h1 class="text-gray-800 font-bold text-2xl mb-1">¡Hola!</h1>
        <p class="text-sm font-normal text-gray-800 mb-7">
          Coloca tus credenciales para iniciar sesión
        </p>
        <form @submit.prevent="loginJWT">
          <div
            class="flex items-center border-2 py-2 px-3 rounded-lg mb-4 bg-white"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5 text-gray-400 bg-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
              />
            </svg>
            <input
              id="username"
              v-model="user.username"
              class="w-full pl-2 outline-none border-none bg-white"
              type="text"
              name="email"
              placeholder="Usuario o Email"
            />
          </div>
          <div
            class="flex items-center border-2 py-2 px-3 rounded-lg mb-4 bg-white"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5 text-gray-400"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fill-rule="evenodd"
                d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                clip-rule="evenodd"
              />
            </svg>
            <input
              id="password"
              v-model="user.password"
              class="w-full pl-2 outline-none border-none"
              type="password"
              name="password"
              placeholder="Password"
            />
          </div>
          <div class="text-start">
            <router-link
              :to="{ name: 'about' }"
              class="font-normal mx-4 text-sm text-gray-700 cursor-pointer text-gray-600"
            >
              <u
                >¿Necesitas ayuda?
                <span class="text-orange-400">Olvidé mi contraseña</span></u
              >
            </router-link>
          </div>
          <button
            type="submit"
            class="block w-full mt-4 py-2 rounded-lg text-white font-semibold mb-2 bg-orange-400 hover:outline hover:outline-1 hover:outline-orange-500"
          >
            Iniciar Sesión
          </button>
          <div class="sm:text-start text-center mb-4 mt-4">
            <router-link
              :to="{ name: 'about' }"
              class="font-normal mx-4 text-sm text-gray-700 cursor-pointer text-gray-600"
            >
              <u
                >No tengo una cuenta
                <span class="text-orange-400">Registrarse</span></u
              >
            </router-link>
          </div>
          <div class="sm:text-start text-center">
            <router-link
              :to="{ name: 'about' }"
              class="font-normal mx-4 text-sm text-gray-700 cursor-pointer text-gray-600"
            >
              <u><span class="text-orange-400">Términos y condiciones</span></u>
            </router-link>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "LoginForm",
  components: {},
  data() {
    return {
      user: {
        username: "",
        password: "",
      },
      error: null,
    };
  },
  methods: {
    async loginJWT() {
      console.log("Aquí se enviará el formulario");
    },
  },
};
</script>
