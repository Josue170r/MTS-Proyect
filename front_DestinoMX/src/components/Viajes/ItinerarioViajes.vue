<template>
  <div class="min-h-screen w-full flex flex-col md:flex-row bg-gray-100">
    <div
      class="min-w-screen flex md:bg-orange-300 md:w-1/2 md:min-h-screen relative"
    >
      <router-link to="/login" class="absolute top-7 left-1 transform">
        <BackButtonIcon />
      </router-link>

      <img
        src="@/assets/images/imagen002.png"
        alt="imagen002"
        class="md:my-auto rounded-b-xl"
      />
    </div>

    <!-- componente para el avatar del usuario -->
    <div class="absolute top-6 right-2 transform -translate-x-1">
      <AvatarButton />
    </div>

    <!-- Calendario -->
    <h1 class="text-3xl text-center p-2">Calendario de viajes</h1>
    <div class="w-150">
      <v-container>
        <v-row justify="space-around">
          <v-date-picker elevation="0" width="100" show-adjacent-months>
          </v-date-picker>
        </v-row>
      </v-container>
    </div>
  </div>
</template>

<script>
import BackButtonIcon from "@/components/icons/BackButtonIcon"
import AvatarButton from "@/components/buttons/AvatarButton"
export default {
  name: "ItinerarioViajes",
  components: {
    BackButtonIcon,
    AvatarButton,
  },

  data() {},
  methods: {},
}
</script>

<style></style>
