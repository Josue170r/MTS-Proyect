<template>
  <div class="min-h-screen w-full flex flex-col md:flex-row">
    <div class="flex md:w-1/2 justify-center items-center bg-orange-300">
      <img src="@/assets/images/imagen001.jpg" alt="imagen001" />
    </div>
    <div class="sm:flex flex-1 bg-white mx-8 my-8 sm:-my-0">
      <div
        class="h-[700px] sm:flex flex-col md:w-1/2 flex-1 justify-center items-center bg-gray-100 mt-32"
      >
        <img
          src="@/assets/images/DestinoMX.png"
          alt="logo"
          class="mx-auto w-64 -mt-64 sm:-mt-16 p-2 pl-8"
        />
        <div class="bg-accent w-full px-5">
          <p class="text-sm text-center font-normal text-gray-800 mb-7">
            Porfavor llena los siguientes campos para la creación de tu cuenta
          </p>
          <form @submit.prevent="loginJWT">
            <div
              class="flex items-center border-2 py-2 px-3 rounded-lg mb-4 bg-white"
            >
              <UserIcon />
              <input
                id="username"
                v-model="username"
                class="w-full pl-2 outline-none border-none"
                type="text"
                name="email"
                placeholder="Nombre de usuario"
              />
            </div>
            <div
              class="flex items-center border-2 py-2 px-3 rounded-lg mb-4 bg-white"
            >
              <AtIcon />
              <input
                id="email"
                v-model="email"
                class="w-full pl-2 outline-none border-none"
                type="text"
                name="email"
                placeholder="Correo electrónico"
              />
            </div>
            <div
              class="flex items-center border-2 py-2 px-3 rounded-lg mb-4 bg-white"
            >
              <input
                id="name"
                v-model="name"
                class="w-full pl-2 outline-none border-none"
                type="text"
                name="email"
                placeholder="Nombre"
              />
            </div>
            <div
              class="flex items-center border-2 py-2 px-3 rounded-lg mb-4 bg-white"
            >
              <input
                id="lastname"
                v-model="lastname"
                class="w-full pl-2 outline-none border-none"
                type="text"
                name="email"
                placeholder="Apellidos"
              />
            </div>
            <div
              class="flex items-center border-2 py-2 px-3 rounded-lg mb-4 bg-white"
            >
              <PasswordIcon />
              <input
                id="password"
                v-model="password"
                class="w-full pl-2 outline-none border-none"
                type="password"
                name="password"
                placeholder="Contraseña"
              />
            </div>
            <div
              class="flex items-center border-2 py-2 px-3 rounded-lg mb-4 bg-white"
            >
              <PasswordIcon />
              <input
                id="confirmedPassword"
                v-model="confirmedPassword"
                class="w-full pl-2 outline-none border-none"
                type="password"
                name="password"
                placeholder="Confirmar contraseña"
              />
            </div>
            <button
              :disabled="isFormEmpty"
              type="submit"
              class="font-quicksand block w-full mt-8 py-2 rounded-lg text-white font-semibold mb-2 bg-orange-300"
              :class="[
                isFormEmpty
                  ? 'opacity-60 cursor-not-allowed'
                  : 'hover:outline hover:outline-1 hover:outline-orange-400',
              ]"
            >
              Crear Cuenta
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AtIcon from "@/components/icons/atIcon.vue";
import PasswordIcon from "@/components/icons/PasswordIcon";
import UserIcon from "@/components/icons/UserIcon";

export default {
  name: "LoginForm",
  components: {
    AtIcon,
    PasswordIcon,
    UserIcon,
  },
  data() {
    return {
      email: "",
      username: "",
      name: "",
      lastname: "",
      confirmedPassword: "",
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
