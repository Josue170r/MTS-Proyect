<template>
  <div class="min-h-screen w-full flex flex-col md:flex-row">
    <div class="relative md:w-1/2 md:order-1">
      <div class="absolute top-6 right-2 transform -translate-x-1">
        <AvatarButton />
      </div>
      <div>
        <BurgerMenu />
      </div>

      <img
        src="@/assets/images/imagen003.png"
        alt="imagen003"
        class="w-full h-70 object-cover filter grayscale-50 brightness-70"
      />
    </div>

    <div class="md:w-1/2 md:order-2">
      <div class="flex items-center justify-center w-full flex-col">
        <h1 class="text-gray-800 py-4 text-center text-xl font-bold">
          Quienes somos
        </h1>
        <h2
          class="text-gray-800 py-2 px-4 text-center justify-center text-m leading-5"
        >
          Bienvenidos a MTS (Mexico Travel Solutions), tu compañero de viaje
          definitivo para explorar los tesoros turísticos de México, estamos
          apasionados por conectar a los viajeros con los destinos más
          impresionantes de México, y hemos dedicado nuestros esfuerzos a hacer
          que tu experiencia de viaje sea inolvidable.
        </h2>
        <img src="@/assets/images/MTS.jpeg" alt="MTS" class="w-45 h-33" />

        <h1
          class="text-gray-800 py-4 px-4 text-center justify-center text-xl font-bold"
        >
          Nuestra Mision
        </h1>
        <h2
          class="text-gray-800 py-2 px-4 text-center justify-center text-m leading-5"
        >
          En MTS (Mexico Travel Solutions), la misión que tenemos es simplificar
          y enriquecer tus viajes al permitirte descubrir los lugares más
          emocionantes y auténticos de México con facilidad. Creemos que cada
          rincón de este hermoso país tiene algo especial que ofrecer, y
          queremos ayudarte a encontrarlo.
        </h2>

        <img src="@/assets/images/Mision.jpeg" alt="MTS" class="w-25 h-auto" />
      </div>
    </div>
  </div>
</template>

<script>
import AvatarButton from "@/components/buttons/AvatarButton"
import BurgerMenu from "@/components/buttons/BurgerMenu"

export default {
  name: "AboutUs",
  components: {
    AvatarButton,
    BurgerMenu,
  },
}
</script>

<style></style>
