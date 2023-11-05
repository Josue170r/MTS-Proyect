<template>
  <button @click="search">
    <SearchIcon />
  </button>
</template>

<script>
import SearchIcon from "../icons/SearchIcon.vue"
export default {
  name: "SearchButton",
  methods: {
    search() {
      // Aquí puedes agregar la lógica para realizar la búsqueda
      // Puedes emitir un evento o llamar a una función que maneje la búsqueda.
    },
  },
  components: {
    SearchIcon,
  },
}
</script>
