<template>
  <v-sheet
    class="py-8 px-6 mx-auto ma-4 text-center"
    elevation="5"
    rounded="lg"
    max-width="500"
    width="100%"
  >
    <h3 class="text-h5">Recuperar contraseña</h3>

    <div class="text-subtitle-2 font-weight-light mb-3">
      Por favor, intruce el código de verificación
    </div>

    <v-otp-input class="mb-2" length="6" variant="outlined"></v-otp-input>
    <div class="text-caption">
      <v-btn
        color="primary"
        size="x-small"
        text="Enviar nuevo código"
        variant="text"
        @click="otp = ''"
      ></v-btn>
    </div>
  </v-sheet>
</template>

<script>
export default {
  data: () => ({
    otp: "",
  }),
}
</script>
