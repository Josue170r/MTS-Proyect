<template>
  <div
    class="absolute-screen min-h-screen flex justify-center"
    :class="[loading ? 'opacity-75' : '...']"
  >
    <div class="justify-center items-center">
      <div class="pt-16 flex justify-center text-center">
        <router-link :to="{ name: 'home' }" class="...">
          <BackButtonIcon class="-ml-12 mt-1" />
        </router-link>
        <h1 class="text-4xl mb-8 text-white font-baskerville">
          ¡Hola {{ user.username }}!
        </h1>
      </div>
      <div class="flex flex-col items-center">
        <img
          src="@/assets/images/user_image2.png"
          alt="logo"
          class="mx-auto w-64 p-2 pl-8"
        />
        <button class="bg-white rounded-full h-10 w-10 ml-32 -mt-10">
          <PlusCircleIcon />
        </button>
      </div>
      <div class="opacity-100 mb-64">
        <v-progress-circular
          v-if="loading"
          indeterminate
          size="64"
          color="orange-300"
          style="
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            margin-bottom: 16px;
          "
        ></v-progress-circular>
      </div>
      <div class="flex-1 bg-gray-100 md:w-full rounded-lg -mt-24">
        <v-card class="mx-auto w-[340px] rounded-lg" max-width="600">
          <v-list>
            <div class="mt-4 mb-8">
              <div class="flex items-center ml-4">
                <v-icon color="#fed7aa" size="30">mdi-account</v-icon>
                <v-list-item class="ml-3 font-baskerville text-lg">
                  {{ user.name }}
                </v-list-item>
                <div class="ml-[75px]">
                  <v-row justify="center">
                    <v-dialog v-model="dialog" persistent width="1024">
                      <template v-slot:activator="{ props }">
                        <button v-bind="props">
                          <v-icon color="#fed7aa" size="30">mdi-pencil</v-icon>
                        </button>
                      </template>
                      <v-card>
                        <v-card-title class="text-center font-baskerville mt-2">
                          <span class="text-2xl">Editar Perfil</span>
                        </v-card-title>
                        <v-card-text>
                          <v-container :validation-schema="schema">
                            <v-row>
                              <v-col cols="12" sm="6" md="4">
                                <div>
                                  <v-text-field
                                    class="font-baskerville text-lg"
                                    v-model="updateProfile.name"
                                    label="Nombre"
                                    required
                                    name="name"
                                  ></v-text-field>
                                </div>
                                <div class="ml-1 mb-2 -mt-1">
                                  <ErrorMessage
                                    class="flex block text-red-700 text-sm"
                                    name="name"
                                  ></ErrorMessage>
                                </div>
                              </v-col>
                              <v-col cols="12" sm="6" md="4">
                                <v-text-field
                                  class="font-baskerville text-lg"
                                  v-model="updateProfile.lastname"
                                  label="Apellido Paterno"
                                  required
                                ></v-text-field>
                              </v-col>
                              <v-col cols="12" sm="6" md="4">
                                <v-text-field
                                  class="font-baskerville text-lg"
                                  v-model="updateProfile.secondlastname"
                                  label="Apellido Materno"
                                  persistent-hint
                                  required
                                ></v-text-field>
                              </v-col>
                            </v-row>
                          </v-container>
                        </v-card-text>
                        <v-card-actions>
                          <v-spacer></v-spacer>
                          <v-btn
                            color="blue-darken-1"
                            variant="text"
                            @click="dialog = false"
                          >
                            Cerrar
                          </v-btn>
                          <v-btn
                            color="blue-darken-1"
                            variant="text"
                            @click="updateProfileFunction"
                          >
                            Guardar
                          </v-btn>
                        </v-card-actions>
                      </v-card>
                    </v-dialog>
                  </v-row>
                </div>
              </div>

              <v-divider
                :thickness="3"
                class="border-opacity-100"
                inset
              ></v-divider>

              <div class="flex items-center ml-4">
                <v-icon color="#fed7aa" size="30">mdi-lock</v-icon>
                <v-list-item class="ml-3 font-baskerville text-lg">
                  Cambiar Contraseña
                </v-list-item>
                <div class="ml-12">
                  <v-row justify="center">
                    <v-dialog
                      v-model="dialogfromPassword"
                      persistent
                      width="1024"
                    >
                      <template v-slot:activator="{ props }">
                        <button v-bind="props">
                          <v-icon color="#fed7aa" size="30"
                            >mdi-arrow-right-bold-circle-outline</v-icon
                          >
                        </button>
                      </template>
                      <v-card>
                        <v-card-title class="text-center font-baskerville mt-2">
                          <span class="text-2xl">Cambiar Contraseña</span>
                        </v-card-title>
                        <v-card-text>
                          <v-container>
                            <v-row>
                              <v-col cols="12" sm="6" md="4">
                                <v-text-field
                                  class="font-baskerville text-lg"
                                  v-model="updatePassword.currentPassword"
                                  label="Contraseña Actual"
                                  required
                                ></v-text-field>
                              </v-col>
                              <v-col cols="12" sm="6" md="4">
                                <v-text-field
                                  class="font-baskerville text-lg"
                                  v-model="updatePassword.newPassword"
                                  label="Nueva Contraseña"
                                  required
                                ></v-text-field>
                              </v-col>
                              <v-col cols="12" sm="6" md="4">
                                <v-text-field
                                  class="font-baskerville text-lg"
                                  v-model="updatePassword.confirmPassword"
                                  label="Confirmar nueva contraseña"
                                  required
                                ></v-text-field>
                              </v-col>
                            </v-row>
                          </v-container>
                        </v-card-text>
                        <v-card-actions>
                          <v-spacer></v-spacer>
                          <v-btn
                            color="blue-darken-1"
                            variant="text"
                            @click="dialogfromPassword = false"
                          >
                            Cerrar
                          </v-btn>
                          <v-btn
                            color="blue-darken-1"
                            variant="text"
                            @click="updatePasswordFuntion"
                          >
                            Guardar
                          </v-btn>
                        </v-card-actions>
                      </v-card>
                    </v-dialog>
                  </v-row>
                </div>
              </div>

              <v-divider
                :thickness="3"
                class="border-opacity-100"
                inset
              ></v-divider>

              <div class="flex items-center ml-4 font-baskerville">
                <v-icon color="#fed7aa" size="30">mdi-email</v-icon>
                <v-list-item class="ml-3 text-lg">
                  {{ user.email }}
                </v-list-item>
              </div>

              <v-divider
                :thickness="3"
                class="border-opacity-100"
                inset
              ></v-divider>

              <div class="flex items-center ml-4">
                <v-icon color="#fed7aa" size="30">mdi-close-circle</v-icon>
                <v-list-item class="ml-3 font-baskerville text-lg">
                  Eliminar Cuenta
                </v-list-item>
                <div class="ml-16">
                  <v-tooltip text="Eliminar Cuenta">
                    <template v-slot:activator="{ props }">
                      <button class="ml-2" v-bind="props">
                        <v-icon color="#fed7aa" size="30"
                          >mdi-arrow-right-bold-circle-outline</v-icon
                        >
                      </button>
                    </template>
                  </v-tooltip>
                </div>
              </div>
            </div>
          </v-list>
        </v-card>
      </div>
    </div>
  </div>
</template>

<script>
import BackButtonIcon from "@/components/icons/BackButtonIcon"
import PlusCircleIcon from "@/components/icons/PlusCircleIcon"
import { apiFromBackend } from "@/helpers/ApiFromBackend"
import { toast } from "vue3-toastify"

export default {
  name: "LoginForm",
  components: {
    BackButtonIcon,
    PlusCircleIcon,
  },
  data() {
    return {
      user: {
        username: "",
        name: "",
        email: "",
      },
      dialog: false,
      loading: false,
      dialogfromPassword: false,
      updateProfile: {
        name: "",
        lastname: "",
        secondlastname: "",
      },
      updatePassword: {
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      },
    }
  },
  created() {
    this.getUserInformation()
  },
  computed: {
    isFormEmpty() {
      return !this.username
    },
  },
  methods: {
    async getUserInformation() {
      try {
        this.loading = true

        const { data } = await apiFromBackend.get("/api/perfil", {})
        const { Usuario, Nombre, ApellidoP, CorreoElectronico } =
          data.datosUsuario
        console.log()
        this.user.username = Usuario
        this.user.name = `${Nombre} ${ApellidoP}`
        this.user.email = `${CorreoElectronico}`
      } catch ({ response }) {
        console.log(response)
        toast(response.data.mensaje, {
          hideProgressBar: true,
          autoClose: 1500,
          type: "error",
          theme: "colored",
        })
      } finally {
        setTimeout(() => {
          this.loading = false
        }, 2000)
      }
    },
    async updateProfileFunction() {
      try {
        const { data } = await apiFromBackend.put("/api/editar-perfil", {
          Nombre: this.updateProfile.name,
          ApellidoP: this.updateProfile.lastname,
          ApellidoM: this.updateProfile.secondlastname,
        })
        toast(data.mensaje, {
          hideProgressBar: true,
          autoClose: 600,
          type: "success",
          theme: "colored",
        })
        window.location.reload()
        console.log(data)
      } catch (error) {
        console.log(error)
      }
      this.dialog = false
    },
    async updatePasswordFuntion() {
      console.log(this.updatePassword)
      this.dialogfromPassword = false
    },
  },
}
</script>

<script setup>
import * as yup from "yup"
import { ErrorMessage } from "vee-validate"

const schema = yup.object({
  name: yup
    .string()
    .required("Este campo es obligatorio")
    .matches(
      /^[a-zA-ZáéíóúÁÉÍÓÚüÜñÑ]+$/,
      "El nombre solo puede contener letras",
    ),
  lastName: yup
    .string()
    .required("Este campo es obligatorio")
    .matches(
      /^[a-zA-ZáéíóúÁÉÍÓÚüÜñÑ]+$/,
      "El apellido solo puede contener letras",
    ),
  secondLastName: yup
    .string()
    .matches(
      /^[a-zA-ZáéíóúÁÉÍÓÚüÜñÑ]+$/,
      "El segundo apellido solo puede contener",
    ),
  password: yup
    .string()
    .required("La contraseña es obligatoria")
    .min(8, "La contraseña debe tener al menos 8 caracteres")
    .matches(/[A-Z]/, "Debe contener al menos una letra mayúscula")
    .matches(
      /[!@#$%^&*(),.?":{}|<>]/,
      "Debe contener al menos un carácter especial",
    )
    .max(32, "La contraseña no debe exceder los 32 caracteres"),
  passwordConfirmation: yup
    .string()
    .required("La confirmación de contraseña es obligatoria")
    .oneOf([yup.ref("password"), null], "Las contraseñas deben coincidir")
    .min(8, "La contraseña debe tener al menos 8 caracteres"),
})
</script>

<style scoped>
.cursor-not-allowed {
  cursor: not-allowed;
}

.absolute-screen {
  background-image: url("@/assets/images/imagen005.jpg");
  background-size: cover;
  background-attachment: absolute;
  background-position: center;
  height: 100vh;
  /* Ajusta el valor de alpha (a) para cambiar la opacidad (0 es transparente, 1 es opaco) */
  background-color: rgba(0, 0, 0, 0.5); /* Ejemplo con opacidad al 50% */
}

.customize-color {
  color: #fed7aa;
}
</style>
