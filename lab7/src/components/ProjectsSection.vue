<template>
    <v-container class="block text-dark shadow-box-lg rounded-xl">
      <h2>Мої проекти</h2>
      <v-row>
        <v-col
          v-for="project in projects"
          :key="project.title"
          cols="12"
          md="4"
        >
          <v-card class="shadow-box-sm text-white text-center">
            <v-img :src="project.image" height="300px" />
            <v-card-title>{{ project.title }}</v-card-title>
            <v-card-text>{{ project.description }}</v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </template>
  
  <script>
  export default {
    data() {
      return {
        projects: [
          {
            title: '1',
            image: 'https://media1.tenor.com/m/PfiuP87QTQUAAAAC/cat-orange-cat.gif',
            description: '1/05/2025',
          },
          {
            title: '2',
            image: 'https://media1.tenor.com/m/rfi695IFRwoAAAAC/cummins.gif',
            description: '1/05/2025',
          },
          {
            title: '3',
            image: 'https://media1.tenor.com/m/9ylofhczSfgAAAAC/time-to-dev-cat.gif',
            description: '1/05/2025',
          },
        ],
      };
    },
  };
  </script>
  