<template>
    <v-app-bar app class="mb-12">
      <v-toolbar-title>Weather App</v-toolbar-title>
      <ToggleTheme />
    </v-app-bar>
  </template>
  
  <script>
  import ToggleTheme from './ToggleTheme.vue';
  
  export default {
    components: {
      ToggleTheme,
    },
  };
  </script>
  