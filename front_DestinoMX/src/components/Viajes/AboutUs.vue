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
        src="@/assets/images/QuestionsF.jpeg"
        alt="imagen003"
        class="w-full h-40 object-cover filter grayscale-50 brightness-70"
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
        <!--EMPIEZA DESCUBRIMIENTO PERSONALIZADO-->

        <h1
          class="text-gray-800 py-4 px-4 text-center justify-center text-xl font-bold"
        >
          Descubrimiento Personalizado
        </h1>
        <h2
          class="text-gray-800 py-2 px-4 text-center justify-center text-m leading-5"
        >
          Utilizando la última tecnología de geolocalización, te proporcionamos
          recomendaciones personalizadas basadas en tu ubicación actual.
        </h2>

        <img
          src="@/assets/images/LocationIm.jpeg"
          alt="LOCATION"
          class="w-25 h-auto"
        />
        <h2
          class="text-gray-800 py-2 px-6 text-center justify-center text-m leading-5"
        >
          Ya sea que estés en la bulliciosa Ciudad de México, en las playas
          paradisíacas de Cancún o en los pueblos mágicos del interior, MTS
          (Mexico Travel Solutions) te mostrará lo mejor de cada lugar. En MTS
          (Mexico Travel Solutions), creemos que los viajes son la mejor manera
          de crear recuerdos duraderos y enriquecer nuestras vidas. Permítenos
          ser tu guía confiable en tu próxima aventura por México.
        </h2>
        <!--Boton empezar-->
        <button type="button" @click="goToHome" class="p-1 rounded-full">
          <img
            src="@/assets/images/Start.jpeg"
            alt="START"
            class="w-17 h-12 rounded-full"
          />
        </button>

        <!--Botones descargar APPSTORE & GOOGLEPLAY
        <div class="flex-row flex w-full items-center space-x-4">
          <button class="p-2 rounded-full" @click="redirectToAppStore">
            <img
              src="@/assets/images/AppStore.jpeg"
              alt="APP STORE"
              class="w-full h-auto"
            />
          </button>

          <button class="p-2 rounded-full" @click="redirectToGooglePlay">
            <img
              src="@/assets/images/GooglePlay.jpeg"
              alt="GOOGLE PLAY"
              class="w-full h-auto"
            />
          </button>
        </div>
        -->

        <!--TERMINA DESCUBRIMIENTO PERSONALIZADO-->

        <!--SOPORTE TECNICO-->
        <h1
          class="text-gray-800 py-4 px-4 text-center justify-center text-2xl font-bold"
        >
          Soporte Técnico:
        </h1>

        <div>
          <h2 class="text-blue-800 py-4 px-4 text-center text-2xl font-bold">
            Preguntas frecuentes
          </h2>
          <ul class="justify-start">
            <li
              class="text-gray-800 py-2 px-6 text-center text-m leading-5 underline font-bold"
            >
              ¿Qué debo hacer si no recuerdo mi usuario y/o contraseña?
            </li>
            <li
              class="text-gray-800 py-2 px-6 text-center text-m leading-5 underline font-bold"
            >
              ¿Existen compras dentro de la aplicación?
            </li>
            <li
              class="text-gray-800 py-2 px-6 text-center text-m leading-5 underline font-bold"
            >
              ¿Cómo puedo volver a consultar los lugares favoritos que
              seleccioné anteriormente?
            </li>
            <li
              class="text-gray-800 py-2 px-6 text-center text-m leading-5 underline font-bold"
            >
              ¿Por qué la aplicación me pide mis datos personales?
            </li>
            <li
              class="text-gray-800 py-2 px-6 text-center justify-center text-m leading-5 underline font-bold"
            >
              ¿Cómo puedo agregar una reseña del lugar que visité?
            </li>
            <li
              class="text-gray-800 py-2 px-6 text-center justify-center text-m leading-5 underline font-bold"
            >
              ¿Cómo puedo encontrar el lugar exacto que me gustaría visitar?
            </li>
          </ul>
        </div>

        <h2
          class="text-gray-800 py-2 px-6 text-center justify-center text-m leading-5"
        >
          Si las anteriores preguntas no han resuelto su problema o le gustaría
          aportar una sugerencia, comuníquese con nosotros a través de los
          siguientes medios oficiales:
        </h2>

        <h2
          class="text-gray-800 py-2 px-6 text-center justify-center text-m leading-5"
        >
          Teléfono: <span class="text-orange-500">(+52) 55 1234 5678</span>
        </h2>

        <h2
          class="text-gray-800 py-2 px-6 text-center justify-center text-m leading-5"
        >
          Correo electrónico:
          <span class="text-orange-500">mts_offcial@gmail.com</span>
        </h2>

        <!--FIN SOPORTE TECNNICO-->
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
  methods: {
    goToHome() {
      this.$router.push("/home")
    },

    // redirectToGooglePlay() {
    //   window.open("https://play.google.com/store/apps", "_blank")
    // },
    // redirectToAppStore() {
    //   window.open("https://www.apple.com/app-store/", "_blank")
    // },
  },
}
</script>

<style></style>
