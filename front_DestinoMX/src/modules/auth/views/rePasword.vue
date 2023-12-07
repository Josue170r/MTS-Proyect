<template>
  <v-sheet
    class="py-8 px-6 mx-auto ma-4 text-center"
    elevation="5"
    rounded="lg"
    max-width="500"
    width="100%"
  >
    <h3 class="text-h5">Validacion de correo electrónico</h3>

    <div class="text-subtitle-2 font-weight-light mb-3">
      Por favor, introduce el código de verificación
    </div>

    <v-otp-input
      class="mb-2"
      length="6"
      variant="outlined"
      :error="otpError"
      v-model="otp"
    ></v-otp-input>

    <div>
      <v-btn
        :loading="validating"
        class="mt-6 text-black bg-violet-light"
        rounded
        variant="plain"
        text="Validar código de verificación"
        height="40"
        width="135"
        @click="onClick"
      >
      </v-btn>
    </div>

    <div class="text-caption">
      <v-btn
        color="primary"
        size="x-small"
        text="Enviar nuevo código"
        class="mt-6 text-none"
        variant="text"
        @click="resetOtp"
      ></v-btn>
    </div>
    <div v-if="otpError" class="text-hint red--text">
      {{ otpError }}
    </div>
  </v-sheet>
</template>

<script>
import { apiFromBackend } from "@/helpers/ApiFromBackend"
import { toast } from "vue3-toastify"

export default {
  data: () => ({
    otp: "",
    validating: false,
    otpError: "",
    email: "",
  }),
  methods: {
    onClick() {
      this.validating = true
      setTimeout(async () => {
        this.validating = false
        try {
          const { data } = await apiFromBackend.post(
            "/api/cookie-cifra-validacion",
            {
              codigoUsuario: this.otp,
              correo: this.email,
            },
          )
          console.log(data.mensaje)
          toast(data.mensaje, {
            hideProgressBar: true,
            autoClose: 600,
            type: "success",
            theme: "colored",
            onClose: () => {
              this.$router.push({ name: "login" })
            },
          })
        } catch (response) {
          toast(response.response.data.mensaje, {
            hideProgressBar: true,
            autoClose: 1500,
            type: "error",
            theme: "colored",
          })
        }
      }, 2000)
    },
    async resetOtp() {
      this.otp = ""
      this.otpError = ""
      try {
        const { data } = await apiFromBackend.post(
          "/api/cookie-cifra-creacion",
          {
            correo: this.email,
          },
        )
        toast(data.mensaje, {
          hideProgressBar: true,
          autoClose: 600,
          type: "success",
          theme: "colored",
        })
      } catch (response) {
        toast(response.response.data.mensaje, {
          hideProgressBar: true,
          autoClose: 1500,
          type: "error",
          theme: "colored",
        })
      }
    },
  },
  mounted() {
    this.email = this.$route.query.email
  },
}
</script>
