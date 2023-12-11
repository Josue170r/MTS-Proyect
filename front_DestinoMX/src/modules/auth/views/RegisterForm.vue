<template>
  <div class="min-h-screen w-full flex flex-col md:flex-row">
    <div class="flex md:w-1/2 justify-center items-center bg-orange-300">
      <img src="@/assets/images/imagen001.jpg" alt="imagen001" />
    </div>
    <div class="md:flex flex-1 bg-white mx-8 my-8 sm:-my-0">
      <div
        class="h-flex sm:h-flex md:flex flex-col md:w-1/2 flex-1 justify-center items-center bg-gray-100 mt-32"
      >
        <img
          src="@/assets/images/DestinoMX.png"
          alt="logo"
          class="mx-auto w-64 -mt-64 sm:-mt-16 p-2 pl-8"
        />
        <Form
          @submit="onSubmit"
          class="bg-accent w-full px-5 py-5"
          :validation-schema="schema"
        >
          <p class="text-md text-center font-normal text-gray-800 mb-7">
            Porfavor llena los siguientes campos para la creación de tu cuenta
          </p>
          <label
            v-if="user.email"
            for="email"
            class="top-0 left-2 transition-all duration-300 text-gray-500"
          >
            Correo Elctrónico *
          </label>
          <div
            class="flex items-center border-2 py-2 px-3 rounded-lg mb-4 bg-white"
          >
            <AtIcon />
            <Field
              id="email"
              v-model="user.email"
              class="pl-2 outline-none border-none w-full"
              type="email"
              name="email"
              placeholder="Correo electrónico *"
            />
          </div>
          <div class="ml-1 mb-2 -mt-1">
            <ErrorMessage
              class="flex block text-red-700 text-md"
              name="email"
            ></ErrorMessage>
          </div>
          <label
            v-if="user.username"
            for="username"
            class="top-0 left-2 transition-all duration-300 text-gray-500"
          >
            Nombre de usuario *
          </label>
          <div
            class="flex items-center border-2 py-2 px-3 rounded-lg mb-4 bg-white"
          >
            <UserIcon />
            <Field
              id="username"
              v-model="user.username"
              class="pl-2 outline-none border-none w-full"
              type="text"
              name="username"
              placeholder="Nombre de usuario *"
            />
          </div>
          <div class="ml-1 mb-2 -mt-1">
            <ErrorMessage
              class="flex block text-red-700 text-md"
              name="username"
            ></ErrorMessage>
          </div>
          <label
            v-if="user.name"
            for="name"
            class="top-0 left-2 transition-all duration-300 text-gray-500"
          >
            Nombre *
          </label>
          <div
            class="flex items-center border-2 py-2 px-3 rounded-lg mb-4 bg-white"
          >
            <UserIcon />
            <Field
              id="name"
              v-model="user.name"
              class="pl-2 outline-none border-none w-full"
              type="text"
              name="name"
              placeholder="Nombre(s) *"
            />
          </div>
          <div class="ml-1 mb-2 -mt-1">
            <ErrorMessage
              class="flex block text-red-700 text-md"
              name="name"
            ></ErrorMessage>
          </div>
          <label
            v-if="user.lastName"
            for="latName"
            class="top-0 left-2 transition-all duration-300 text-gray-500"
          >
            Apellido paterno *
          </label>
          <div
            class="flex items-center border-2 py-2 px-3 rounded-lg mb-4 bg-white"
          >
            <Field
              id="lastName"
              v-model="user.lastName"
              class="pl-2 outline-none border-none w-full"
              type="text"
              name="lastName"
              placeholder="Apellido paterno *"
            />
          </div>
          <div class="ml-1 mb-2 -mt-1">
            <ErrorMessage
              class="flex block text-red-700 text-md"
              name="lastName"
            ></ErrorMessage>
          </div>
          <label
            v-if="user.secondLastName"
            for="secondLastName"
            class="top-0 left-2 transition-all duration-300 text-gray-500"
          >
            Apellido materno *
          </label>
          <div
            class="flex items-center border-2 py-2 px-3 rounded-lg mb-4 bg-white"
          >
            <Field
              id="secondLastName"
              v-model="user.secondLastName"
              class="pl-2 outline-none border-none w-full"
              type="text"
              name="secondLastName"
              placeholder="Apellido materno *"
            />
          </div>
          <div class="ml-1 mb-2 -mt-1">
            <ErrorMessage
              class="flex block text-red-700 text-md"
              name="secondLastName"
            ></ErrorMessage>
          </div>
          <label
            v-if="user.password"
            for="secondLastName"
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
            :disabled="isFormEmpty"
            type="submit"
            class="font-quicksand block w-full mt-4 py-2 rounded-lg text-white font-semibold mb-2 bg-orange-300"
            :class="[
              isFormEmpty
                ? 'opacity-60 cursor-not-allowed'
                : 'hover:outline hover:outline-1 hover:outline-orange-400',
            ]"
          >
            Crear Cuenta
          </button>
        </Form>
      </div>
    </div>
  </div>
</template>

<script>
import AtIcon from "@/components/icons/atIcon.vue"
import PasswordIcon from "@/components/icons/PasswordIcon"
import UserIcon from "@/components/icons/UserIcon"
import { apiFromBackend } from "@/helpers/ApiFromBackend"
import { toast } from "vue3-toastify"

export default {
  name: "LoginForm",
  components: {
    AtIcon,
    PasswordIcon,
    UserIcon,
    Field,
    Form,
    ErrorMessage,
  },
  data() {
    return {
      showPassword: false,
      showPassword2: false,
      user: {
        email: "",
        username: "",
        name: "",
        lastName: "",
        secondLastName: "",
        password: "",
        passwordConfirmation: "",
      },
    }
  },
  methods: {
    async onSubmit() {
      try {
        const { data } = await apiFromBackend.post("/api/crear-cuenta", {
          Nombre: this.user.name,
          ApellidoP: this.user.lastName,
          ApellidoM: this.user.secondLastName,
          CorreoElectronico: this.user.email,
          Usuario: this.user.username,
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
        this.verificationCorreo()
      } catch (error) {
        toast(error.response.data.mensaje, {
          hideProgressBar: true,
          autoClose: 1500,
          type: "error",
          theme: "colored",
        })
      }
    },
    async verificationCorreo() {
      try {
        const { data } = await apiFromBackend.post(
          "/api/cookie-cifra-creacion",
          {
            correo: this.user.email,
          },
        )
        console.log(data)
      } catch (response) {
        console.log(response.response.data.mensaje)
      }
    },
  },
  computed: {
    isFormEmpty() {
      return !this.user.name || !this.user.passwordConfirmation
    },
  },
}
</script>

<script setup>
import * as yup from "yup"
import { Field, Form, ErrorMessage } from "vee-validate"

const schema = yup.object({
  email: yup
    .string()
    .required("El correo electrónico es obligatorio")
    .email("Ingrese un correo electrónico válido")
    .matches(/@.*\..*/, "Ingrese un correo electrónico válido"),
  username: yup.string().required("El usuario es obligatorio"),
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
      "Este campo solo puede contener letras",
    ),
  secondLastName: yup
    .string()
    .matches(
      /^[a-zA-ZáéíóúÁÉÍÓÚüÜñÑ]+$/,
      "Este campo solo puede contener letras",
    ),
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
