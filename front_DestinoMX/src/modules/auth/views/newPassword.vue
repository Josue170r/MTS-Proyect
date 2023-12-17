<template>
  <div class="min-h-screen w-full flex flex-col md:flex-row">
    <div class="flex md:w-1/2 justify-center items-center bg-orange-300">
      <img src="@/assets/images/imagen009.png" alt="imagen009" />
    </div>
    <div class="md:flex flex-1 bg-white mx-8 my-8 sm:-my-0 order-1 md:order-2">
      <div
        class="mt-[-28] h-flex sm:h-flex md:flex flex-col md:w-1/2 flex-1 justify-center items-center bg-gray-100"
      >
        <Form
          @submit="onSubmit"
          class="bg-accent w-full px-5 py-5"
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
            v-if="user.passwordConfirmation"
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
          <button
            :disabled="isFormEmpty || !passwordsMatch"
            type="submit"
            class="font-quicksand block w-full mt-4 py-2 rounded-lg text-white font-semibold mb-2 bg-orange-300"
            :class="[
              isFormEmpty || !passwordsMatch
                ? 'opacity-60 cursor-not-allowed'
                : 'hover:outline hover:outline-1 hover:outline-orange-400',
            ]"
          >
            Validar contraseña
          </button>
        </Form>
      </div>
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
  methods: {
    async onSubmit() {
      if (!this.isPasswordValid()) {
        toast("La contraseña no cumple con los requisitos mínimos", {
          hideProgressBar: true,
          autoClose: 1500,
          type: "error",
          theme: "colored",
        })
        return
      }

      try {
        const { data } = await apiFromBackend.post("/api/crear-cuenta", {
          contrasena: this.user.password,
        })
        toast(data.mensaje, {
          hideProgressBar: true,
          autoClose: 600,
          type: "success",
          theme: "colored",
          onClose: () => {
            this.$router.push({
              name: "rePasword",
              query: { email: this.user.email },
            })
          },
        })
      } catch (error) {
        toast(error.response.data.mensaje, {
          hideProgressBar: true,
          autoClose: 1500,
          type: "error",
          theme: "colored",
        })
      }
    },
  },

  computed: {
    isPasswordValid() {
      const regex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/
      return regex.test(this.user.password)
    },
    passwordsMatch() {
      return this.user.password === this.user.passwordConfirmation
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
