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
        <form @submit="onSubmit" class="bg-accent w-full px-5">
          <p class="text-sm text-center font-normal text-gray-800 mb-7">
            Porfavor llena los siguientes campos para la creación de tu cuenta
          </p>

          <AtIcon />
          <div class="flex border-2 py-2 w-full rounded-lg mb-4">
            <input
              id="email"
              v-model="email"
              class="pl-2 outline-none border-none w-full"
              type="email"
              name="email"
              placeholder="Email"
            />
          </div>
          <span class="block text-red-700 text-sm mt-1 ml-1 h-1">{{
            emailError
          }}</span>

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
          <span class="block text-red-700 text-sm mb-2">{{ nameError }}</span>

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
          <span class="block text-red-700 text-sm mb-2">ERROR:</span>

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
          <span class="block text-red-700 text-sm mb-2">ERROR:</span>

          <PasswordIcon />
          <div
            class="flex items-center border-2 py-2 px-3 rounded-lg mb-4 bg-white"
          >
            <input
              id="password"
              v-model="password"
              autocomplete="off"
              class="w-full pl-2 outline-none border-non"
              type="password"
              name="password"
              placeholder="Contraseña *"
            />
          </div>
          <span class="block text-red-700 text-sm mb-2">ERROR:</span>

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
          <span class="block text-red-700 text-sm mb-2">ERROR:</span>

          <div
            class="flex items-center border-2 py-2 px-3 rounded-lg mb-4 bg-white"
          >
            <button type="submit">Crear Cuenta</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import AtIcon from "@/components/icons/atIcon.vue";
import PasswordIcon from "@/components/icons/PasswordIcon";
import UserIcon from "@/components/icons/UserIcon";
import { useForm, useField } from "vee-validate";
import * as yup from "yup";
import { configure } from "vee-validate";
import { localize } from "@vee-validate/i18n";
import es from "@vee-validate/i18n/dist/locale/es.json";

configure({
  generateMessage: localize({ es }),
});
export default {
  name: "LoginForm",
  components: {
    AtIcon,
    PasswordIcon,
    UserIcon,
  },
  data() {
    return {
      username: "",
      lastname: "",
      secondLastName: "",
      password: "",
      passwordConfirmation: "",
    };
  },
  setup() {
    const schema = yup.object({
      email: yup.string().required().email(),
      name: yup.string().required(),
    });
    const { handleSubmit, isSubmitting, errors } = useForm({
      validationSchema: schema,
    });

    console.log(errors);

    const { value: email, errorMessage: emailError } = useField("email");
    const { value: name, errorMessage: nameError } = useField("name");

    const onSubmit = handleSubmit((values) => {
      console.log(values);
    });

    return {
      email,
      emailError,
      name,
      nameError,
      isSubmitting,
      onSubmit,
    };
  },
};
</script>
