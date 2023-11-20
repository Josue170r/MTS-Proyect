<template>
  <div class="absolute-screen min-h-screen flex justify-center">
    <div class="justify-center items-center">
      <div class="pt-16 flex justify-center text-center">
        <div>
          <BackButton class="-ml-24" />
        </div>
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
      <div class="flex-1 bg-gray-100 md:w-full rounded-xl mt-32">
        <v-card class="mx-auto w-[340px] rounded-xl" max-width="600">
          <v-list>
            <div class="mt-4 mb-8">
              <div class="flex items-center ml-4">
                <v-icon color="#fed7aa" size="30">mdi-account</v-icon>
                <v-list-item class="ml-3">
                  {{ user.name }}
                </v-list-item>
                <div class="ml-20">
                  <v-row justify="center">
                    <v-dialog v-model="dialog" persistent width="1024">
                      <template v-slot:activator="{ props }">
                        <button v-bind="props">
                          <v-icon color="#fed7aa" size="30">mdi-pencil</v-icon>
                        </button>
                      </template>
                      <v-card>
                        <v-card-title>
                          <span class="text-h5">Editar Perfil</span>
                        </v-card-title>
                        <v-card-text>
                          <v-container>
                            <v-row>
                              <v-col cols="12" sm="6" md="4">
                                <v-text-field
                                  v-model="updateProfile.lastname"
                                  label="Nombre"
                                  required
                                ></v-text-field>
                              </v-col>
                              <v-col cols="12" sm="6" md="4">
                                <v-text-field
                                  v-model="updateProfile.lastname"
                                  label="Apellido Paterno"
                                  required
                                ></v-text-field>
                              </v-col>
                              <v-col cols="12" sm="6" md="4">
                                <v-text-field
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
                            @click="changeUserInformation"
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
                <v-list-item class="ml-3" title="Cambiar Contraseña">
                </v-list-item>
                <div class="ml-9">
                  <v-tooltip text="Cambiar Contraseña">
                    <template v-slot:activator="{ props }">
                      <button v-bind="props">
                        <v-icon color="#fed7aa" size="30"
                          >mdi-arrow-right-bold-circle-outline</v-icon
                        >
                      </button>
                    </template>
                  </v-tooltip>
                </div>
              </div>

              <v-divider
                :thickness="3"
                class="border-opacity-100"
                inset
              ></v-divider>

              <div class="flex items-center ml-4">
                <v-icon color="#fed7aa" size="30">mdi-email</v-icon>
                <v-list-item class="ml-3">
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
                <v-list-item class="ml-3" title="Eliminar Cuenta">
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
// import AtIcon from "@/components/icons/atIcon"
import BackButton from "@/components/buttons/BackButton"
import PlusCircleIcon from "@/components/icons/PlusCircleIcon"
import { apiFromBackend } from "@/helpers/ApiFromBackend"
import { toast } from "vue3-toastify"

export default {
  name: "LoginForm",
  components: {
    BackButton,
    PlusCircleIcon,
  },
  data() {
    return {
      user: {
        username: "Josue",
        name: "Josue Montalban",
        email: "josuemonro@gmail.com",
      },
      dialog: false,
      updateProfile: {
        name: "",
        lastname: "",
        secondlastname: "",
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
        const response = await apiFromBackend.get("/api/perfil", {})
        console.log(response)
      } catch ({ response }) {
        console.log("Reesponse:", response)
        toast(response.data.mensaje, {
          hideProgressBar: true,
          autoClose: 1500,
          type: "error",
          theme: "colored",
        })
      }
    },
    async changeUserInformation() {
      console.log(this.changeuser.email)
      this.dialog = false
    },
  },
}
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
