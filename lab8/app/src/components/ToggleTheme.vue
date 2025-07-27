<template>
    <v-switch v-model="theme" label="Темна тема" @change="toggleTheme" />
  </template>
  
  <script>
  export default {
    data() {
      return {
        theme: false,
      };
    },
    methods: {
      toggleTheme() {
        if (this.theme) {
          document.body.classList.add('dark-theme');
        } else {
          document.body.classList.remove('dark-theme');
        }
      },
    },
  };
  </script>
  