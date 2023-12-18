<template>
  <div>
    <!-- Contenedor de la imagen de fondo -->
    <div class="relative">
      <!-- Contenedor del botón de avatar -->
      <div class="absolute top-6 right-2 transform -translate-x-1">
        <AvatarButton />
      </div>

      <div class="letf-2">
        <BurgerMenu />
      </div>

      <!-- TITULO PREFERENCIAS -->
      <div
        class="mt-16 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-2 border-gray-300 rounded-md flex items-center justify-center w-full flex-col"
      >
        <h1 style="font-size: 45px; font-weight: bold">Preferencias</h1>
      </div>

      <img
        src="@/assets/images/imagen003.png"
        alt="imagen003"
        class="w-full h-full object-cover"
      />
    </div>
    <div class="flex items-center justify-center w-full flex-col">
      <h1 class="text-xl text-center">
        Elija al menos 3 de las categorias mas interesantes para ti
      </h1>
    </div>

    <!--PRUEBA BOTONES-->

    <!--DIV DE PRUEBA PARA BORDE -->
    <div class="p-4">
      <div>
        <div
          class="grid grid-cols-1 hover:outline hover:outline-1 hover:outline-orange-400 sm:grid-cols-2 gap-2 gap-y-1 gap-x-3 hover:outline hover:outline-1 hover:outline-orange-400 sm:w-max"
        ></div>
        <!--CLASE ANTIGUA-->
        <div
          class="grid grid-cols-2 gap-2 gap-y-1 gap-x-3 flex items-center justify-center"
        >
          <!--CLASE ANTIGUA-->
          <!--BOTON1-->

          <div>
            <!-- <button
              class="w-full hover:outline hover:outline-1 hover:outline-orange-400 sm:w-max py-2 rounded-lg text-black font-semibold bg-orange-300 mb-2 flex items-center justify-center pl-4 pr-4"
            >  -->
            <button
              @click="toggleButton(0)"
              :class="{
                'bg-orange-300': selectedButtons.includes(0),
                'bg-green-200': highlightedButton === 0,
                'bg-orange-100':
                  !selectedButtons.includes(0) && highlightedButton !== 0,
              }"
              class="w-full hover:outline hover:outline-1 hover:outline-orange-400 sm:w-max py-2 rounded-lg text-black font-semibold mb-2 flex items-center justify-center pl-4 pr-4"
            >
              <img
                src="@/assets/images/PreferencesImages/fairIcon.png"
                alt="Icono"
                class="w-6 h-6 items-center mr-1"
              /><span>Parque De Atracciones</span>
            </button>
          </div>

          <div>
            <button
              @click="toggleButton(1)"
              :class="{
                'bg-orange-300': selectedButtons.includes(1),
                'bg-green-200': highlightedButton === 1,
                'bg-orange-100':
                  !selectedButtons.includes(1) && highlightedButton !== 1,
              }"
              class="w-full hover:outline hover:outline-1 hover:outline-orange-400 sm:w-max py-2 rounded-lg text-black font-semibold mb-2 flex items-center justify-center pl-4 pr-4"
            >
              <img
                src="@/assets/images/PreferencesImages/churchIcon.jpg"
                alt="Icono"
                class="w-6 h-6 items-center mr-1"
              /><span>Lugares Religiosos</span>
            </button>
          </div>

          <div>
            <button
              @click="toggleButton(2)"
              :class="{
                'bg-orange-300': selectedButtons.includes(2),
                'bg-green-200': highlightedButton === 2,
                'bg-orange-100':
                  !selectedButtons.includes(2) && highlightedButton !== 2,
              }"
              class="w-full hover:outline hover:outline-1 hover:outline-orange-400 sm:w-max py-2 rounded-lg text-black font-semibold mb-2 flex items-center justify-center pl-4 pr-4"
            >
              <img
                src="@/assets/images/PreferencesImages/nature.png"
                alt="Icono"
                class="w-9 h-9 items-center mr-1"
              /><span>Parques y Areas Naturales</span>
            </button>
          </div>

          <div>
            <button
              @click="toggleButton(3)"
              :class="{
                'bg-orange-300': selectedButtons.includes(3),
                'bg-green-200': highlightedButton === 3,
                'bg-orange-100':
                  !selectedButtons.includes(3) && highlightedButton !== 3,
              }"
              class="w-full hover:outline hover:outline-1 hover:outline-orange-400 sm:w-max py-2 rounded-lg text-black font-semibold mb-2 flex items-center justify-center pl-4 pr-4"
            >
              <img
                src="@/assets/images/PreferencesImages/museumIcon.jpg"
                alt="Icono"
                class="w-6 h-6 items-center mr-1"
              /><span>Museos Y Galerias</span>
            </button>
          </div>

          <div>
            <button
              @click="toggleButton(4)"
              :class="{
                'bg-orange-300': selectedButtons.includes(4),
                'bg-green-200': highlightedButton === 4,
                'bg-orange-100':
                  !selectedButtons.includes(4) && highlightedButton !== 4,
              }"
              class="w-full hover:outline hover:outline-1 hover:outline-orange-400 sm:w-max py-2 rounded-lg text-black font-semibold mb-2 flex items-center justify-center pl-4 pr-4"
            >
              <img
                src="@/assets/images/PreferencesImages/barIcon.png"
                alt="Icono"
                class="w-6 h-6 items-center mr-1"
              /><span>Bares y Pubs</span>
            </button>
          </div>

          <div>
            <button
              @click="toggleButton(5)"
              :class="{
                'bg-orange-300': selectedButtons.includes(5),
                'bg-green-200': highlightedButton === 5,
                'bg-orange-100':
                  !selectedButtons.includes(5) && highlightedButton !== 5,
              }"
              class="w-full hover:outline hover:outline-1 hover:outline-orange-400 sm:w-max py-2 rounded-lg text-black font-semibold mb-2 flex items-center justify-center pl-4 pr-4"
            >
              <img
                src="@/assets/images/PreferencesImages/nightclubIcon.png"
                alt="Icono"
                class="w-6 h-6 items-center mr-1"
              /><span>Clubes Nocturnos</span>
            </button>
          </div>

          <div>
            <button
              @click="toggleButton(6)"
              :class="{
                'bg-orange-300': selectedButtons.includes(6),
                'bg-green-200': highlightedButton === 6,
                'bg-orange-100':
                  !selectedButtons.includes(6) && highlightedButton !== 6,
              }"
              class="w-full hover:outline hover:outline-1 hover:outline-orange-400 sm:w-max py-2 rounded-lg text-black font-semibold mb-2 flex items-center justify-center pl-4 pr-4"
            >
              <img
                src="@/assets/images/PreferencesImages/cinemaIcon.png"
                alt="Icono"
                class="w-9 h-9 items-center mr-1"
              /><span>Centros de Entretenimiento</span>
            </button>
          </div>

          <div>
            <button
              @click="toggleButton(7)"
              :class="{
                'bg-orange-300': selectedButtons.includes(7),
                'bg-green-200': highlightedButton === 7,
                'bg-orange-100':
                  !selectedButtons.includes(7) && highlightedButton !== 7,
              }"
              class="w-full hover:outline hover:outline-1 hover:outline-orange-400 sm:w-max py-2 rounded-lg text-black font-semibold mb-2 flex items-center justify-center pl-4 pr-4"
            >
              <img
                src="@/assets/images/PreferencesImages/resIcon.png"
                alt="Icono"
                class="w-6 h-6 items-center mr-1"
              /><span>Restaurantes</span>
            </button>
          </div>

          <div>
            <button
              @click="toggleButton(8)"
              :class="{
                'bg-orange-300': selectedButtons.includes(8),
                'bg-green-200': highlightedButton === 8,
                'bg-orange-100':
                  !selectedButtons.includes(8) && highlightedButton !== 8,
              }"
              class="w-full hover:outline hover:outline-1 hover:outline-orange-400 sm:w-max py-2 rounded-lg text-black font-semibold mb-2 flex items-center justify-center pl-4 pr-4"
            >
              <img
                src="@/assets/images/PreferencesImages/coffeeIcon.png"
                alt="Icono"
                class="w-6 h-6 items-center mr-1"
              /><span>Cafeterias</span>
            </button>
          </div>

          <div>
            <button
              @click="toggleButton(9)"
              :class="{
                'bg-orange-300': selectedButtons.includes(9),
                'bg-green-200': highlightedButton === 9,
                'bg-orange-100':
                  !selectedButtons.includes(9) && highlightedButton !== 9,
              }"
              class="w-full hover:outline hover:outline-1 hover:outline-orange-400 sm:w-max py-2 rounded-lg text-black font-semibold mb-2 flex items-center justify-center pl-4 pr-4"
            >
              <img
                src="@/assets/images/PreferencesImages/gymIcon.jpg"
                alt="Icono"
                class="w-6 h-6 items-center mr-1"
              /><span>GYM</span>
            </button>
          </div>

          <div>
            <button
              @click="toggleButton(10)"
              :class="{
                'bg-orange-300': selectedButtons.includes(10),
                'bg-green-200': highlightedButton === 10,
                'bg-orange-100':
                  !selectedButtons.includes(10) && highlightedButton !== 10,
              }"
              class="w-full hover:outline hover:outline-1 hover:outline-orange-400 sm:w-max py-2 rounded-lg text-black font-semibold mb-2 flex items-center justify-center pl-4 pr-4"
            >
              <img
                src="@/assets/images/PreferencesImages/mallicon.png"
                alt="Icono"
                class="w-6 h-6 items-center mr-1"
              /><span>Plazas</span>
            </button>
          </div>

          <div>
            <button
              @click="toggleButton(11)"
              :class="{
                'bg-orange-300': selectedButtons.includes(11),
                'bg-green-200': highlightedButton === 11,
                'bg-orange-100':
                  !selectedButtons.includes(11) && highlightedButton !== 11,
              }"
              class="w-full hover:outline hover:outline-1 hover:outline-orange-400 sm:w-max py-2 rounded-lg text-black font-semibold mb-2 flex items-center justify-center pl-4 pr-4"
            >
              <img
                src="@/assets/images/PreferencesImages/hoteIcon.png"
                alt="Icono"
                class="w-6 h-6 items-center mr-1"
              /><span>Hoteles</span>
            </button>
          </div>

          <div>
            <button
              @click="toggleButton(12)"
              :class="{
                'bg-orange-300': selectedButtons.includes(12),
                'bg-green-200': highlightedButton === 12,
                'bg-orange-100':
                  !selectedButtons.includes(12) && highlightedButton !== 12,
              }"
              class="w-full hover:outline hover:outline-1 hover:outline-orange-400 sm:w-max py-2 rounded-lg text-black font-semibold mb-2 flex items-center justify-center pl-4 pr-4"
            >
              <img
                src="@/assets/images/PreferencesImages/libraryIcon.png"
                alt="Icono"
                class="w-6 h-6 items-center mr-1"
              />
              <span>Bibliotecas</span>
            </button>
          </div>

          <div>
            <button
              @click="toggleButton(13)"
              :class="{
                'bg-orange-300': selectedButtons.includes(13),
                'bg-green-200': highlightedButton === 13,
                'bg-orange-100':
                  !selectedButtons.includes(13) && highlightedButton !== 13,
              }"
              class="w-full hover:outline hover:outline-1 hover:outline-orange-400 sm:w-max py-2 rounded-lg text-black font-semibold mb-2 flex items-center justify-center pl-4 pr-4"
            >
              <img
                src="@/assets/images/PreferencesImages/monumentIcon.png"
                alt="Icono"
                class="w-6 h-6 items-center mr-1"
              /><span>Monumentos</span>
            </button>
          </div>
        </div>
        <!--DIV DE PRUEBA PARA BORDE -->
        <!--FIN BOTONES-->
      </div>
    </div>
    <div class="flex items-center justify-center">
      <button
        @click="guardar"
        class="w-64 hover:outline hover:outline-1 hover:outline-yellow-500 h-11 mt-2 py-6 rounded-lg text-black font-semibold bg-yellow-400 mb-6 flex items-center justify-center"
      >
        <img
          src="@/assets/images/PreferencesImages/saveIcon.png"
          alt="Icono"
          class="w-6 h-6 items-center mr-1"
        />
        <span>Guardar</span>
      </button>
    </div>
  </div>
</template>

<script>
import AvatarButton from "@/components/buttons/AvatarButton"
import { toast } from "vue3-toastify"
import BurgerMenu from "@/components/buttons/BurgerMenu.vue"
import { apiFromBackend } from "@/helpers/ApiFromBackend"

export default {
  name: "PreferencesScreen",
  components: {
    AvatarButton,
    BurgerMenu,
  },
  created() {
    this.consultarPreferencias()
  },
  data() {
    return {
      selectedButtons: [],
      highlightedButton: null,
    }
  },
  methods: {
    toggleButton(index) {
      if (this.selectedButtons.includes(index)) {
        this.selectedButtons = this.selectedButtons.filter((i) => i !== index)
        this.highlightedButton = null
      } else {
        this.selectedButtons.push(index)
        this.highlightedButton = index
      }
    },

    async guardar() {
      //
      if (this.selectedButtons.length > 0) {
        const selectedButtonNames = this.selectedButtons.map((index) => {
          switch (index) {
            case 0:
              return "parque de atracciones"
            case 1:
              return "lugares religiosos"
            case 2:
              return "parque y areas naturales"
            case 3:
              return "museos y galerias"
            case 4:
              return "bares y pubs"
            case 5:
              return "clubes nocturnos"
            case 6:
              return "centros de entretenimiento"
            case 7:
              return "restaurantes"
            case 8:
              return "cafeterias"
            case 9:
              return "gym"
            case 10:
              return "plazas"
            case 11:
              return "hoteles"
            case 12:
              return "bibliotecas"
            case 13:
              return "momumentos y lugares publicos"
            default:
              return ""
          }
        })

        console.log("Botones Guardados: ", selectedButtonNames)

        try {
          const { data } = await apiFromBackend.put(
            "/api/modificar-preferencias",
            {
              idPreferencias: selectedButtonNames,
            },
          )
          console.log(data)
          toast("Preferencias modificadas correctamente", {
            hideProgressBar: true,
            autoClose: 1500,
            type: "success",
            theme: "colored",
          })
          setTimeout(() => {
            this.$router.push({ name: "home" })
          }, 1500)
        } catch ({ response }) {
          toast.error(response.data.mensaje, {
            theme: "colored",
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 1500,
            hideProgressBar: true,
          })
        }
      } else {
        toast.error("No has seleccionado preferencias.", {
          theme: "colored",
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 1500,
          hideProgressBar: true,
        })
      }
    },

    async consultarPreferencias() {
      try {
        const { data } = await apiFromBackend.post(
          "/api/consultar-Pantalla-Preferencias/",
        )
        const selectedButtonNames = data.map((result) => {
          switch (result) {
            case "parque de atracciones":
              this.toggleButton(0)
              return 0
            case "lugares religiosos":
              this.toggleButton(1)
              return 1
            case "parque y areas naturales":
              this.toggleButton(2)
              return 2
            case "museos y galerias":
              this.toggleButton(3)
              return 3
            case "bares y pubs":
              this.toggleButton(4)
              return 4
            case "clubes nocturnos":
              this.toggleButton(5)
              return 5
            case "centros de entretenimiento":
              this.toggleButton(6)
              return 6
            case "restaurantes":
              this.toggleButton(7)
              return 7
            case "cafeterias":
              this.toggleButton(8)
              return 8
            case "gym":
              this.toggleButton(9)
              return 9
            case "plazas":
              this.toggleButton(10)
              return 10
            case "hoteles":
              this.toggleButton(11)
              return 11
            case "bibliotecas":
              this.toggleButton(12)
              return 12
            case "momumentos y lugares publicos":
              this.toggleButton(13)
              return 13
            default:
              return ""
          }
        })

        console.log(selectedButtonNames)
      } catch ({ response }) {
        toast.error(response.data.mensaje, {
          theme: "colored",
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 1500,
          hideProgressBar: true,
        })
      }
    },
  },
}
</script>

<style scoped>
/* Estilos adicionales si es necesario */
</style>
