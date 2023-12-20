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
          ¿Quiénes somos?
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
          Nuestra Misión
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
        <!-- <button type="button" @click="goToHome" class="p-1 rounded-full">
          <img
            src="@/assets/images/Start.jpeg"
            alt="START"
            class="w-17 h-12 rounded-full"
          />
        </button> -->
        <button
          @click="goToHome"
          class="flex font-quicksand rounded-lg text-white text-base font-semibold mt-8 mb-4 mr-4 ml-4 bg-red-500 p-2 custom-button px-5"
        >
          Empezar
        </button>

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
              @click="toggleAnswer(1)"
              :class="{
                'text-orange-500': showAnswer[1],
                'text-gray-800': !showAnswer[1],
              }"
              class="py-2 px-6 text-center text-m leading-5 underline font-bold cursor-pointer"
            >
              ¿Qué debo hacer si no recuerdo mi usuario y/o contraseña?
            </li>
            <li
              v-if="showAnswer[1]"
              class="text-gray-800 py-2 px-6 text-center text-m leading-5"
            >
              Si olvidaste tu contraseña o usuario no te preocupes, dirígete a
              la sección de “Recuperar contraseña“ presionando en la palabra
              “Olvidé mi contraseña“ que se encuentra en el inicio de sesión.
              Así mismo, si tu cuenta está registrada por correo de Google
              revisa si cuentas con conexión a Internet o cierra y vuelve abrir
              la aplicación.
            </li>
            <!-- Repite el patrón para las demás preguntas -->

            <li
              @click="toggleAnswer(2)"
              :class="{
                'text-orange-500': showAnswer[2],
                'text-gray-800': !showAnswer[2],
              }"
              class="py-2 px-6 text-center text-m leading-5 underline font-bold cursor-pointer"
            >
              ¿Existen compras dentro de la aplicación?
            </li>
            <li
              v-if="showAnswer[2]"
              class="text-gray-800 py-2 px-6 text-center text-m leading-5"
            >
              La aplicación de DestinoMX© no cuenta con compras dentro de la
              aplicación ni tampoco debes pagar por usar nuestro servicio, por
              lo que DestinoMX© no te obligará a compartir tus datos ni pedirte
              medios de pago dentro o fuera de la aplicación. Si recibes
              mensajes u otros medios de comunicación que se hacen pasar por
              DestinoMX© para pagar por nuestros servicios, denúncialo ante las
              autoridades correspondientes y evita a toda costa de caer en una
              estafa.
            </li>
            <li
              @click="toggleAnswer(3)"
              :class="{
                'text-orange-500': showAnswer[3],
                'text-gray-800': !showAnswer[3],
              }"
              class="py-2 px-6 text-center text-m leading-5 underline font-bold cursor-pointer"
            >
              ¿Cómo puedo volver a consultar los lugares favoritos que
              seleccioné anteriormente?
            </li>
            <li
              v-if="showAnswer[3]"
              class="text-gray-800 py-2 px-6 text-center text-m leading-5"
            >
              En la sección de “Favoritos“ que se encuentra en la aplicación, se
              encontrarán todos los lugares favoritos que elegiste para volver a
              consultar la información que necesites, y puedas tenerla accesible
              en todo momento que uses la aplicación.
            </li>
            <li
              @click="toggleAnswer(4)"
              :class="{
                'text-orange-500': showAnswer[4],
                'text-gray-800': !showAnswer[4],
              }"
              class="py-2 px-6 text-center text-m leading-5 underline font-bold cursor-pointer"
            >
              ¿Por qué la aplicación me pide mis datos personales?
            </li>
            <li
              v-if="showAnswer[4]"
              class="text-gray-800 py-2 px-6 text-center text-m leading-5"
            >
              Tus datos personales como Nombre, Correo y/o Ubicación actual, los
              usamos para poderte ofrecer un servicio eficiente al momento de
              que uses nuestra aplicación. Si tienes más dudas acerca de cómo
              usamos tus datos y para qué los usamos, puedes consultar nuestros
              Términos y Condiciones como también nuestra Política de Privacidad
              para que obtengas información más detallada, estas secciones las
              puedes encontrar en la configuración de la aplicación, presionando
              en el botón de las “tres barras“ y después en el botón del
              “engrane“ correspondientemente.
            </li>
            <li
              @click="toggleAnswer(5)"
              :class="{
                'text-orange-500': showAnswer[5],
                'text-gray-800': !showAnswer[5],
              }"
              class="py-2 px-6 text-center text-m leading-5 underline font-bold cursor-pointer"
            >
              ¿Cómo puedo agregar una reseña del lugar que visité?
            </li>
            <li
              v-if="showAnswer[5]"
              class="text-gray-800 py-2 px-6 text-center text-m leading-5"
            >
              Por el momento no es posible agregar reseñas dentro de la
              aplicación.
            </li>
            <li
              @click="toggleAnswer(6)"
              :class="{
                'text-orange-500': showAnswer[6],
                'text-gray-800': !showAnswer[6],
              }"
              class="py-2 px-6 text-center text-m leading-5 underline font-bold cursor-pointer"
            >
              ¿Cómo puedo encontrar el lugar exacto que me gustaría visitar?
            </li>
            <li
              v-if="showAnswer[6]"
              class="text-gray-800 py-2 px-6 text-center text-m leading-5"
            >
              Dentro de la publicación del lugar, encontrarás un botón que dirá
              “Cómo llegar“, presionando dicho botón, te redigirá a una
              aplicación de transporte que te recomendará los medios de
              transporte y tiempos de horas más adecuados y efectivos para
              llegar al destino a partir de tu ubicación.
            </li>
          </ul>
        </div>
        <h2
          class="text-gray-800 py-2 px-6 text-center justify-center text-m leading-5"
        >
          Si las preguntas anteriores no han resuelto tu problema o te gustaría
          aportar una sugerencia, comunícate con nosotros a través de los
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
  data() {
    return {
      showAnswer: [false, false, false, false, false, false],
    }
  },
  methods: {
    goToHome() {
      this.$router.push("/home")
    },
    toggleAnswer(index) {
      this.showAnswer[index] = !this.showAnswer[index]
    },
  },
}
</script>

<style></style>
