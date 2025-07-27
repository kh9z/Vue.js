<template>
  <v-text-field
    v-model="searchTerm"
    label="Введіть місто"
    @input="searchCity"
  />
</template>

<script>
export default {
  data() {
    return {
      searchTerm: "",
    };
  },
  methods: {
    searchCity() {
      this.$emit("search", this.searchTerm);
    },
  },
};
</script>
