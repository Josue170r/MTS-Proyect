<template>
  <v-card
    ref="popup"
    elevation="24"
    height="160"
    width="250"
    class="d-flex flex-column mx-auto py-2 font-quicksand rounded-lg text-black text-base"
  >
    <div class="d-flex justify-center font-semibold mt-1 text-xl">Ratings</div>

    <div class="d-flex align-center flex-column my-auto">
      <div class="text-h5 mt-2">
        {{ rating }}
        <span class="text-h5 ml-n1">/5</span>
      </div>

      <v-rating
        :model-value="rating"
        color="yellow-darken-3"
        readonly
        density="comfortable"
        half-increments
      ></v-rating>
      <div class="px-2 py-2">{{ numratings }} rating(s)</div>
    </div>

    <!-- <v-list
      bg-color="transparent"
      class="d-flex flex-column-reverse"
      density="compact"
    >
      <v-list-item v-for="(rating, i) in 5" :key="i">
        <v-progress-linear
          :model-value="rating * 15"
          class="mx-n5"
          color="yellow-darken-3"
          height="20"
          rounded
        ></v-progress-linear>

        <template v-slot:prepend>
          <span>{{ rating }}</span>
          <v-icon icon="mdi-star" class="mx-3"></v-icon>
        </template>

        <template v-slot:append>
          <div class="rating">
            <span class="d-flex justify-end"> {{ rating * 224 }} </span>
          </div>
        </template>
      </v-list-item>
    </v-list> -->
  </v-card>
</template>

<script>
export default {
  props: {
    rating: {
      type: Number,
      required: true,
    },
    numratings: {
      type: Number,
      required: true,
    },
  },
}
</script>

<style scoped>
.rating-values {
  width: 25px;
}
</style>
