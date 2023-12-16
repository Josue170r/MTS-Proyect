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
          <h1 class="text-gray-800 font-bold text-2xl mb-1">¡Hola!</h1>
          <p class="text-md text-gray-800 mb-7 mt-3">
            Coloca tus credenciales para iniciar sesión
          </p>
          <form @submit.prevent="loginJWT">
            <div
              class="flex items-center border-2 py-2 px-3 rounded-lg mb-4 bg-white"
            >
              <AtIcon />
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
            <div class="text-start">
              <router-link
                :to="{ name: 'about' }"
                class="font-baskerville mx-4 text-md text-gray-700 cursor-pointer text-gray-600"
              >
                <u
                  >¿Necesitas ayuda?
                  <span class="text-orange-300 text-md"
                    >Olvidé mi contraseña</span
                  ></u
                >
              </router-link>
            </div>
            <button
              :disabled="isFormEmpty"
              type="submit"
              class="text-lg text-white h-11 font-quicksand block w-full mt-4 py-2 rounded-lg font-semibold mb-2 bg-orange-300"
              :class="[
                isFormEmpty
                  ? 'opacity-60 cursor-not-allowed'
                  : 'hover:outline hover:outline-1 hover:outline-orange-400',
              ]"
            >
              Iniciar Sesión
            </button>
            <div class="font-baskerville sm:text-start text-center mb-4 mt-4">
              <router-link
                :to="{ name: 'register-form' }"
                class="mx-4 text-md text-gray-700 cursor-pointer text-gray-600"
              >
                <u
                  >No tengo una cuenta
                  <span class="text-orange-300">Registrarse</span></u
                >
              </router-link>
            </div>
          </form>
          <div class="flex items-center ml-4">
            <div class="ml-20">
              <v-row>
                <v-dialog v-model="dialogVerification" persistent width="1024">
                  <v-card>
                    <v-card-title class="text-center font-baskerville mt-2">
                      <div
                        class="text-center ml-3 mr-1 py-0 text-left text-xl"
                        style="white-space: normal"
                      >
                        El correo no se encuentra verificado
                      </div>
                    </v-card-title>
                    <v-card-text class="text-center"
                      >¿Desea verificar su correo?</v-card-text
                    >
                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn
                        color="grey lighten-3"
                        variant="text"
                        @click="dialogVerification = false"
                      >
                        Cancelar
                      </v-btn>
                      <v-btn
                        color="orange-darken-1"
                        variant="text"
                        @click="verificationCorreo()"
                      >
                        Aceptar
                      </v-btn>
                    </v-card-actions>
                  </v-card>
                </v-dialog>
              </v-row>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AtIcon from "@/components/icons/atIcon"
import PasswordIcon from "@/components/icons/PasswordIcon.vue"
import { apiFromBackend } from "@/helpers/ApiFromBackend"
import { toast } from "vue3-toastify"

export default {
  name: "LoginForm",
  components: {
    AtIcon,
    PasswordIcon,
  },
  data() {
    return {
      username: "",
      password: "",
      dialogVerification: false,
      email: "",
    }
  },
  computed: {
    isFormEmpty() {
      return !this.username || !this.password
    },
  },
  methods: {
    async loginJWT() {
      try {
        const response = await apiFromBackend.post("/api/iniciar-sesion", {
          Usuario: this.username,
          contrasena: this.password,
        })
        console.log(response)
        this.email = response.data.correo
        const validation = response.data.validacion
        if (validation == 0) {
          this.$router.push({ name: "user-profile" })
        } else {
          this.dialogVerification = true
        }
      } catch ({ response }) {
        toast(response.data.mensaje, {
          hideProgressBar: true,
          autoClose: 1500,
          type: "error",
          theme: "colored",
        })
      }
      try {
        const response = await apiFromBackend.post("/api/cuenta-activa")
        console.log("Respuesta exitosa:", response)

        // Aquí puedes manejar la respuesta exitosa, por ejemplo, actualizar el estado en el frontend.
      } catch (error) {
        if (error.response) {
          // El servidor respondió con un status diferente de 2xx
          console.error("Respuesta de error del servidor:", error.response.data)
        } else if (error.request) {
          // La solicitud fue hecha pero no se recibió respuesta
          console.error("No se recibió respuesta del servidor:", error.request)
        } else {
          // Ocurrió un error durante la configuración de la solicitud
          console.error(
            "Error durante la configuración de la solicitud:",
            error.message,
          )
        }
      }
    },
    async verificationCorreo() {
      try {
        this.$router.push({
          name: "rePasword",
          query: { email: this.email },
        })
        const { data } = await apiFromBackend.post(
          "/api/cookie-cifra-creacion",
          {
            correo: this.email,
          },
        )
        console.log(data)
      } catch (response) {
        console.log(response.response.data.mensaje)
      }
    },
  },
}
</script>

<style scoped>
.cursor-not-allowed {
  cursor: not-allowed;
}
</style>
