<template>
  <div class="absolute-screen h-full flex justify-center">
    <div class="justify-center items-center rounded-xl">
      <div class="flex-1 bg-white mx-8 md:w-full rounded-xl">
        <div
          class="mt-80 h-flex justify-center items-center bg-gray-100 rounded-xl"
        >
          <img
            src="@/assets/images/DestinoMX.png"
            alt="logo"
            class="mx-auto w-64 p-2 pl-8 pt-8"
          />
          <div class="w-full px-5 py-5 pb-8 rounded-xl">
            <h1 class="text-gray-800 font-bold text-2xl mb-4 rounded-xl">
              Recupera tu contraseña
            </h1>
            <p class="text-sm text-gray-800 mb-7">
              Favor de introducir su email para recuperar la contraseña.
            </p>
            <form @submit.prevent="recoveryPassword">
              <div class="flex items-center border-2 py-2 px-3 mb-4 bg-white">
                <AtIcon />
                <input
                  id="username"
                  v-model="user.correo"
                  class="w-full pl-2 outline-none border-none bg-white"
                  type="text"
                  name="email"
                  placeholder="Usuario o Email"
                />
              </div>
              <button
                :disabled="isFormEmpty"
                type="submit"
                class="font-quicksand block w-full mt-4 py-2 rounded-xl text-white font-semibold mb-6 bg-orange-300"
                :class="[
                  isFormEmpty
                    ? 'opacity-60 cursor-not-allowed'
                    : 'hover:outline hover:outline-1 hover:outline-orange-400',
                ]"
              >
                Recuperar Contraseña
              </button>
              <router-link
                :to="{
                  name: 'login',
                }"
                class="font-baskerville mx-4 text-xl text-orange-300 mt-8 cursor-pointer hover:text-black"
              >
                Iniciar Sesión
              </router-link>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AtIcon from "@/components/icons/atIcon"
import { apiFromBackend } from "@/helpers/ApiFromBackend"
import { toast } from "vue3-toastify"

export default {
  name: "LoginForm",
  components: {
    AtIcon,
  },
  data() {
    return {
      user: {
        correo: "",
      },
    }
  },
  computed: {
    isFormEmpty() {
      return !this.user.correo
    },
  },
  methods: {
    async recoveryPassword() {
      try {
        const data = await apiFromBackend.post("/api/cookie-correo-mandar", {
          correo: this.user.correo,
        })
        console.log(data)
        toast(data.data.mensaje, {
          hideProgressBar: true,
          autoClose: 2000,
          type: "success",
          theme: "colored",
        })
        setTimeout(() => {
          this.$router.push({ name: "login" })
        }, 2000)
      } catch (response) {
        toast(response.data.mensaje, {
          hideProgressBar: true,
          autoClose: 1500,
          type: "error",
          theme: "colored",
        })
      }
    },
  },
}
</script>

<style scoped>
.cursor-not-allowed {
  cursor: not-allowed;
}

.absolute-screen {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url("@/assets/images/image005.png");
  background-size: cover;
  background-position: center;
}
</style>
