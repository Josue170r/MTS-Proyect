<template>
  <div class="min-h-screen w-full flex flex-col md:flex-row">
    <div class="md:1/2">
      <img
        src="@/assets/images/imagen008.png"
        alt="DESTINOMX"
        class="absolute w-full h-full object-cover md:"
      />
    </div>
    <div
      class="relative z-50 flex justify-center items-center mt-10 mx-auto py-8 px-6 text-center md:w-1/2"
    >
      <v-sheet
        class="mt-64 opacity"
        elevation="5"
        rounded="lg"
        max-width="500"
        width="100%"
        color="white"
      >
        <h3 class="mt-4 text-2xl font-semibold">
          Validacion de correo electrónico
        </h3>

        <div class="text-center text-subtitle-3 font-weight-light mb-3">
          <h1>
            Introduce el código de verificación que se envió al correo que
            registraste
          </h1>
        </div>

        <v-otp-input
          class="mb-2"
          length="6"
          variant="outlined"
          v-model="otp"
        ></v-otp-input>

        <div>
          <v-btn
            :loading="validating"
            class="mt-2 bg-orange"
            rounded
            variant="plain"
            height="30"
            width="300"
            @click="onClick"
            :disabled="otp.length !== 6"
          >
            <h1 class="font-bold">Validar código de verificación</h1>
          </v-btn>
        </div>

        <div class="text-caption">
          <v-btn
            color="red"
            size="x-small"
            class="mb-6 mt-6 text-none"
            variant="text"
            @click="resetOtp"
            :disabled="newCode === 0"
          >
            <h1 class="font-bold">Enviar nuevo código</h1>
          </v-btn>
        </div>
        <div v-if="otpError" class="text-hint red--text">
          {{ otpError }}
        </div>
      </v-sheet>
    </div>
  </div>
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
    newCode: 5,
  }),
  methods: {
    async onClick() {
      if (this.otp.length > 0) {
        this.validating = true
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
          this.newCode--
        } catch (response) {
          toast(response.response.data.mensaje, {
            hideProgressBar: true,
            autoClose: 1500,
            type: "error",
            theme: "colored",
          })
        } finally {
          this.validating = false
        }
      }
    },
    async resetOtp() {
      if (this.newCode > 0) {
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
        this.newCode--
      }
    },
  },
  mounted() {
    this.email = this.$route.query.email
  },
}
</script>

<style scoped>
.opacity {
  opacity: 0.85;
}
</style>
