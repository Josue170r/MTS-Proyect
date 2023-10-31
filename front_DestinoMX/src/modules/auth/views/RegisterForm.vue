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
          <ValidationObserver v-slot="{ invalid }">
            <ValidationProvider
              v-slot="{ errors }"
              name="Email"
              rules="required|email"
            >
              <AtIcon />
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
              <UserIcon />
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
              name="Contraseña"
              rules="required|min:8|max:32"
            >
              <PasswordIcon />
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
                  id="password"
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
                Crear Cuenta
              </button>
            </div>
          </ValidationObserver>
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
      secondLastName: "",
      password: "",
      passwordConfirmation: "",
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
