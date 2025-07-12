<template>
  <div class="hero">
    <v-container>
      <v-row class="text-center d-flex align-center text-dark shadow-box-lg rounded-xl">
        <v-col cols="6" class="text-center">
          <h1 class="">Євгеній</h1>
          <h2><i>Чи то пес чи то пацюк</i></h2>
          <v-btn class="btn text-white bg-black p-4" @click="scrollToNext">
            Погнали
          </v-btn>
        </v-col>
        <v-col cols="6" class="d-flex justify-end">
          <img
            src="https://media.tenor.com/_AZJmhAry0gAAAAi/rat-dancing-meme.gif"
            class="hero-image"
          />
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  methods: {
    scrollToNext() {
      window.scrollTo({ top: window.innerHeight, behavior: "smooth" });
    },
  },
};
</script>

<style scoped>
.hero {
  min-height: 100vh;
  display: flex;
  align-items: center;
  position: relative;
}

.hero-image {
  max-width: 100vh;
  height: auto;
}
</style>
