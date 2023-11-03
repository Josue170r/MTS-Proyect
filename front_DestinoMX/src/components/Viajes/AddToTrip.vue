<template>
  <div class="min-h-screen w-full flex flex-col md:flex-row">
    <h1>{{ message }}</h1>

    <div
      class="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl"
    >
      <div class="md:flex">
        <div class="md:shrink-0">
          <img
            class="h-48 w-full object-cover md:h-full md:w-48"
            src="/img/building.jpg"
            alt="Modern building architecture"
          />
        </div>
        <div class="p-8">
          <div
            class="uppercase tracking-wide text-sm text-indigo-500 font-semibold"
          >
            Company retreats
          </div>
          <a
            href="#"
            class="block mt-1 text-lg leading-tight font-medium text-black hover:underline"
            >Incredible accommodation for your team</a
          >
          <p class="mt-2 text-slate-500">
            Looking to take your team away on a retreat to enjoy awesome food
            and take in some sunshine? We have a list of places to do just that.
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "AddToTrip",
  data() {
    return {
      message: "Hello World with Vue!",
    }
  },
}
</script>
