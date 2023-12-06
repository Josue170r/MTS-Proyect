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
export default {
  data: () => ({
    otp: "",
    validating: false,
    otpError: "",
  }),
  methods: {
    onClick() {
      this.validating = true
      setTimeout(() => {
        this.validating = false
        if (this.otp !== "123456") {
          //harcodeado
          this.otpError = "Código de verificación inválido"
          console.log(this.otpError)
        } else {
          this.otpError = "Codigo verificado"
          console.log(this.otpError)
        }
      }, 2000)
    },
    resetOtp() {
      this.otp = ""
      this.otpError = ""
    },
  },
}
</script>
