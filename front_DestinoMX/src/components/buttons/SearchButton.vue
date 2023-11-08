<template>
  <button @click="search">
    <SearchIcon />
  </button>
</template>

<script>
import SearchIcon from "@/components/icons/SearchIcon.vue"
export default {
  name: "SearchButton",
  methods: {
    search() {
      // search
    },
  },
  components: {
    SearchIcon,
  },
}
</script>
