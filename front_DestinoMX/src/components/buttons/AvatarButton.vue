<template>
  <v-container fluid style="height: 300px">
    <v-row justify="center">
      <v-menu min-width="200px" rounded>
        <template v-slot:activator="{ props }">
          <v-btn icon v-bind="props">
            <v-avatar size="large">
              <img src="@\assets\images\user_image2.png" />
            </v-avatar>
          </v-btn>
        </template>
        <v-card>
          <v-card-text>
            <div class="mx-auto text-center">
              <v-avatar color="grey">
                <span class="text">{{ user.initials }}</span>
              </v-avatar>
              <h3>{{ user.fullName }}</h3>
              <p class="text-caption mt-1">{{ user.email }}</p>
              <v-divider class="my-3"></v-divider>
              <v-btn rounded variant="text" @click="account">
                Editar cuenta
              </v-btn>
              <v-divider class="my-3"></v-divider>
              <v-btn rounded variant="text" @click="logout">
                Cerrar sesión
              </v-btn>
            </div>
          </v-card-text>
        </v-card>
      </v-menu>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "AvatarButton",
  data: () => ({
    //estos datos de la BD los manejarian los del equipo de back
    user: {
      initials: "DM",
      fullName: "Daniela Martínez",
      email: "danielaM@outlook.com",
    },
  }),
  methods: {
    logout() {
      // lógica para cerrar la sesión del usuario -> limpiar el token de autenticación, eliminar cookies, etc.
      // se manda al usuario a home
      this.$router.push({ name: "startup" })
    },
    account() {
      // se manda al usuario a la pag de su cuenta pero por el momento a HOME -> en el sig sprint dde front se crea esa pantalla
      this.$router.push({ name: "user-profile" })
    },
  },
}
</script>
