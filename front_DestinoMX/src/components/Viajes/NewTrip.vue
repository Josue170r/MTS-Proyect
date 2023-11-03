<template>
  <div class="min-h-screen w-full flex flex-col md:flex-col bg-gray-100">
    <div
      class="min-w-screen flex md:flex-col md:bg-orange-300 md:w-1/2 md:min-h-screen relative"
    >
      <router-link
        to="/login"
        class="absolute top-1 left-1 transform -translate-x-1"
      >
        <BackButtonIcon />
      </router-link>

      <img
        src="@/assets/images/imagen002.png"
        alt="imagen002"
        class="md:my-auto rounded-b-xl"
      />
    </div>
    <div class></div>
  </div>
</template>

<script>
import BackButtonIcon from "@/components/icons/BackButtonIcon"
export default {
  name: "NewTrip",
  components: {
    BackButtonIcon,
  },
}
</script>
