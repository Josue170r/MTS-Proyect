<template>
  <div class="min-h-screen w-full flex flex-col md:flex-row">
    <div class="flex md:w-1/2 justify-center items-center bg-orange-300">
      <img src="@/assets/images/imagen001.jpg" alt="imagen001" />
    </div>
    <div class="sm:flex flex-1 bg-white mx-8 my-8 sm:-my-0">
      <div
        class="h-[600px] sm:flex flex-col md:w-1/2 flex-1 justify-center items-center bg-gray-100 mt-32 sm:h-[700px]"
      >
        <img
          src="@/assets/images/DestinoMX.png"
          alt="logo"
          class="mx-auto w-64 -mt-64 sm:-mt-32 p-2 pl-8"
        />
        <div class="bg-accent w-full px-5">
          <p class="text-sm text-center font-normal text-gray-800 mb-7">
            Porfavor llena los siguientes campos para la creación de tu cuenta
          </p>
          <VueDatePicker v-model="date" />
          <form @submit.prevent="loginJWT">
            <div
              class="flex items-center border-2 py-2 px-3 rounded-lg mb-4 bg-white"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5 text-gray-400"
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
                v-model="username"
                class="w-full pl-2 outline-none border-none bg-white"
                type="text"
                name="email"
                placeholder="Usuario o Email"
              />
            </div>
            <div
              class="flex items-center border-2 py-2 px-3 rounded-lg mb-4 bg-white"
            >
              <ValidationObserver v-slot="{ invalid }">
                <ValidationProvider
                  v-slot="{ errors }"
                  name="Email"
                  rules="required|email"
                >
                  <div class="flex border-2 py-2 w-full rounded-lg mb-4">
                    <input
                      id="email"
                      v-model="email"
                      class="pl-2 outline-none border-none w-full"
                      type="email"
                      name="email"
                      placeholder="Email"
                      disabled
                    />
                  </div>
                  <span class="block text-red-700 text-sm mt-1 ml-1 h-1">{{
                    errors[0]
                  }}</span>
                </ValidationProvider>
                <ValidationProvider
                  v-slot="{ errors }"
                  name="Nombre"
                  rules="required|min:2"
                >
                  <div class="flex border-2 py-2 w-full rounded-lg mb-4">
                    <input
                      id="nombre"
                      v-model="name"
                      class="pl-2 outline-none border-none w-full"
                      type="text"
                      name="nombre"
                      placeholder="Nombre(s) *"
                    />
                  </div>
                  <span class="block text-red-700 text-sm mb-2">{{
                    errors[0]
                  }}</span>
                </ValidationProvider>
                <ValidationProvider
                  v-slot="{ errors }"
                  name="Apellido paterno"
                  rules="required|min:2"
                >
                  <div class="flex border-2 py-2 w-full rounded-lg mb-4">
                    <input
                      id="Apellidopaterno"
                      v-model="lastName"
                      class="pl-2 outline-none border-none w-full"
                      type="text"
                      name="Apellidopaterno"
                      placeholder="Apellido paterno *"
                    />
                  </div>
                  <span class="block text-red-700 text-sm mb-2">{{
                    errors[0]
                  }}</span>
                </ValidationProvider>
                <ValidationProvider
                  v-slot="{ errors }"
                  name="Apellido materno"
                  rules="min:2"
                >
                  <div class="flex border-2 py-2 w-full rounded-lg mb-4">
                    <input
                      id="Apellidomaterno"
                      v-model="secondLastName"
                      class="pl-2 outline-none border-none w-full"
                      type="text"
                      name="Apellidomaterno"
                      placeholder="Apellido materno"
                    />
                  </div>
                  <span class="block text-red-700 text-sm mb-2">{{
                    errors[0]
                  }}</span>
                </ValidationProvider>
                <ValidationProvider
                  v-slot="{ errors }"
                  name="Número de teléfono"
                  rules="required|min:10|max:10|numeric"
                >
                  <div class="flex border-2 py-2 w-full rounded-lg mb-4">
                    <input
                      id="phoneNumber"
                      v-model="phoneNumber"
                      class="pl-2 outline-none border-none w-full"
                      type="tel"
                      name="phoneNumber"
                      placeholder="Número celular *"
                    />
                  </div>
                  <span class="block text-red-700 text-sm mb-2">{{
                    errors[0]
                  }}</span>
                </ValidationProvider>
                <ValidationProvider
                  v-slot="{ errors }"
                  name="Contraseña"
                  rules="required|min:8|max:32"
                >
                  <div class="flex border-2 py-2 w-full rounded-lg mb-4">
                    <input
                      id="password"
                      v-model="password"
                      autocomplete="off"
                      class="pl-2 outline-none border-none w-full"
                      type="password"
                      name="password"
                      placeholder="Contraseña *"
                    />
                  </div>
                  <span class="block text-red-700 text-sm mb-2">{{
                    errors[0]
                  }}</span>
                </ValidationProvider>
                <ValidationProvider
                  v-slot="{ errors }"
                  name="Confirmar contraseña"
                  rules="required"
                >
                  <div class="flex border-2 py-2 w-full rounded-lg mb-4">
                    <input
                      id="passwordn"
                      v-model="passwordConfirmation"
                      autocomplete="off"
                      class="pl-2 outline-none border-none w-full"
                      type="password"
                      name="passwordn"
                      placeholder="Confirmar contraseña *"
                    />
                  </div>
                  <span class="block text-red-700 text-sm mb-2">{{
                    errors[0]
                  }}</span>
                </ValidationProvider>
                <div class="space-x-8">
                  <button
                    class="block w-full mt-4 py-2 rounded-lg text-white font-semibold mb-2 bg-dark-accent hover:outline hover:outline-1 hover:outline-gray-700"
                    :disabled="invalid"
                    :class="{ 'opacity-25 cursor-not-allowed': invalid }"
                    @click="registerUserJWt"
                  >
                    Registrarme
                  </button>
                </div>
              </ValidationObserver>
            </div>
            <div class="text-start">
              <router-link
                :to="{ name: 'about' }"
                class="font-normal mx-4 text-sm text-gray-700 cursor-pointer text-gray-600"
              >
                <u
                  >¿Necesitas ayuda?
                  <span class="text-orange-300">Olvidé mi contraseña</span></u
                >
              </router-link>
            </div>
            <button
              :disabled="isFormEmpty"
              type="submit"
              class="block w-full mt-4 py-2 rounded-lg text-white font-semibold mb-2 bg-orange-300"
              :class="[
                isFormEmpty
                  ? 'opacity-60 cursor-not-allowed'
                  : 'hover:outline hover:outline-1 hover:outline-orange-400',
              ]"
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
                  <span class="text-orange-300">Registrarse</span></u
                >
              </router-link>
            </div>
            <div class="sm:text-start text-center">
              <router-link
                :to="{ name: 'about' }"
                class="font-normal mx-4 text-sm text-gray-700 cursor-pointer text-gray-600"
              >
                <u
                  ><span class="text-orange-300"
                    >Términos y condiciones</span
                  ></u
                >
              </router-link>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "LoginForm",
  data() {
    return {
      username: "",
      password: "",
    };
  },
  computed: {
    isFormEmpty() {
      return !this.username || !this.password;
    },
  },
  methods: {
    async loginJWT() {
      console.log(this.username, this.password);
    },
  },
};
</script>
