<template>
  <div class="absolute-screen flex justify-center items-center">
    <div class="w-54 mx-4 md:w-96 bg-gray-100 rounded-xl">
      <img
        src="@/assets/images/DestinoMX.png"
        alt="logo"
        class="mx-auto w-56"
      />
      <Form
        @submit="onSubmit"
        class="items-center w-full px-6 py-8 pb-8 rounded-xl"
        :validation-schema="schema"
      >
        <h1 class="text-md text-center font-normal text-gray-800 mb-7">
          Crea una nueva contraseña
        </h1>
        <label
          v-if="user.password"
          for="password"
          class="top-0 left-2 transition-all duration-300 text-gray-500"
        >
          Contraseña *
        </label>
        <div
          class="flex items-center border-2 py-2 px-3 rounded-lg mb-4 bg-white"
        >
          <PasswordIcon />
          <Field
            id="password"
            v-model="user.password"
            autocomplete="off"
            class="w-full pl-2 outline-none border-non"
            :type="showPassword ? 'text' : 'password'"
            name="password"
            placeholder="Contraseña *"
          />
        </div>
        <div class="ml-1 mb-2 -mt-1">
          <ErrorMessage
            class="flex block text-red-700 text-md"
            name="password"
          ></ErrorMessage>
        </div>

        <label
          v-if="user.passwordConfirmation.length"
          for="passwordConfirmation"
          class="top-0 left-2 transition-all duration-300 text-gray-500"
        >
          Confirmar Contraseña *
        </label>
        <div
          class="flex items-center border-2 py-2 px-3 rounded-lg mb-6 bg-white"
        >
          <PasswordIcon />
          <Field
            id="passwordConfirmation"
            v-model="user.passwordConfirmation"
            autocomplete="off"
            class="pl-2 outline-none border-none w-full"
            :type="showPassword2 ? 'text' : 'password'"
            name="passwordConfirmation"
            placeholder="Confirmar contraseña *"
          />
        </div>
        <div class="ml-1 mb-2 -mt-1">
          <ErrorMessage
            class="flex block text-red-700 text-md"
            name="passwordConfirmation"
          ></ErrorMessage>
        </div>
        <div>
          <button
            :disabled="isFormEmpty"
            type="submit"
            class="text-center font-quicksand block w-full mt-4 py-2 rounded-lg text-white font-semibold mb-2 bg-orange-300"
            :class="[
              isFormEmpty
                ? 'opacity-60 cursor-not-allowed'
                : 'hover:outline hover:outline-1 hover:outline-orange-400',
            ]"
          >
            Validar contraseña
          </button>
        </div>
      </Form>
    </div>
  </div>
</template>

<script>
import PasswordIcon from "@/components/icons/PasswordIcon"
import { apiFromBackend } from "@/helpers/ApiFromBackend"
import { toast } from "vue3-toastify"

export default {
  name: "LoginForm",
  components: {
    PasswordIcon,
    Field,
  },
  created() {
    this.cookie()
  },
  data() {
    return {
      showPassword: false,
      showPassword2: false,
      user: {
        password: "",
        passwordConfirmation: "",
      },
    }
  },
  computed: {
    isFormEmpty() {
      return !this.user.password || !this.user.passwordConfirmation
    },
  },
  methods: {
    redirectToLogin() {
      console.log("Redirigiendo a login")
      this.$router.push({
        name: "login",
      })
    },
    async cookie() {
      try {
        const data = await apiFromBackend.post("/api/cookieCorreo")
        console.log(data)
      } catch ({ response }) {
        console.log(response)
        if (response.data.mensaje == "No hay cookie existente") {
          this.redirectToLogin()
        }
      }
    },
    async onSubmit() {
      try {
        const data = await apiFromBackend.post("/api/contrasena-nueva", {
          contrasena1: this.user.password,
          contrasena2: this.user.passwordConfirmation,
        })
        console.log(data)
        if (data.data.exito == true) {
          toast(data.data.mensaje, {
            hideProgressBar: true,
            autoClose: 2000,
            type: "success",
            theme: "colored",
          })
          setTimeout(() => {
            this.$router.push({ name: "login" })
          }, 2000)
        }
      } catch ({ response }) {
        toast.error(response.data.mensaje, {
          theme: "colored",
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 2000,
          hideProgressBar: true,
        })
        if (response.data.mensaje == "Se ha agotado su tiempo") {
          setTimeout(() => {
            this.$router.push({ name: "login" })
          }, 2000)
        }
      }
    },
  },
}
</script>

<script setup>
import * as yup from "yup"
import { Field, Form, ErrorMessage } from "vee-validate"

const schema = yup.object({
  password: yup
    .string()
    .required("La contraseña es obligatoria")
    .min(8, "La contraseña debe tener al menos 8 caracteres")
    .max(32, "La contraseña no debe exceder los 32 caracteres")
    .matches(/[A-Z]/, "Debe contener al menos una letra mayúscula")
    .matches(
      /[!@#$%^&*(),.?":{}|<>]/,
      "Debe contener al menos un carácter especial",
    ),
  passwordConfirmation: yup
    .string()
    .required("La confirmación de contraseña es obligatoria")
    .oneOf([yup.ref("password"), null], "Las contraseñas deben coincidir"),
})
</script>

<style scoped>
.absolute-screen {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url("@/assets/images/imagen009.jpg");
  background-size: cover;
  background-position: center;
}
</style>
