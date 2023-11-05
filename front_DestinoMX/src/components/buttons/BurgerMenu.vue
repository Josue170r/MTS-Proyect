<template>
  <div class="bg-white round-lg">
    <BurgerButton />
    <Slide>
      <router-link :to="{ name: 'startup' }">Inicio</router-link>
    </Slide>
  </div>
</template>

<script>
import { Slide, BurgerButton } from "vue3-burger-menu"
import UserIcon from "../icons/UserIcon.vue";
export default {
  name: "BurgerMenu",
  components: {
    Slide,
    BurgerButton,
    UserIcon
  },
}
</script>
