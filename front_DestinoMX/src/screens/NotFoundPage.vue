<template>
  <div class="h-screen flex flex-col justify-center items-center">
    <h1 class="text-black text-8xl sm:text-9xl">404</h1>
    <img
      src="https://cdn.dribbble.com/users/285475/screenshots/2083086/dribbble_1.gif"
      alt="NotFoundGif"
      class="justify-center"
    />
    <h1
      class="font-semibold text-black text-center text-3xl sm:text-4xl -mt-16 sm:-mt-32"
    >
      !Parece que estás perdido!
    </h1>
    <h1 class="font-medium mt-4 text-center text-black text-2xl">
      La paágina que estás buscando no está disponible
    </h1>
    <div class="flex justify-around w-full">
      <button
        @click="goToHomePage"
        class="text-xl mt-8 font-quicksand w-44 text-white bg-orange-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mb-2"
      >
        Inicio
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "NotFoundScreen",
  methods: {
    goToHomePage() {
      this.$router.push({
        name: "startup",
      })
    },
  },
}
</script>

<style></style>
