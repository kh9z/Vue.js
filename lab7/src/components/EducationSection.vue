<template>
    <v-container class="block text-dark shadow-box-lg rounded-xl">
      <h2>Освіта</h2>
      <v-row>
        <v-col
          v-for="education in educationList"
cols="12" md="12"
        >
          <v-container>
                <h3>{{ education.title }}</h3>

                <p>
                  {{ education.description }}
                </p>
                <p>
                  <i>
                    {{ education.period }}
                  </i>
                </p>
          </v-container>
          <hr class="border-4 border-indigo-600">
        </v-col>
      </v-row>
    </v-container>
  </template>
  
  <script>
  export default {
    data() {
      return {
        educationList: [
          {
            title: 'Середня загальноосвітня школа №32',
            period: '2015-2021',
            description: 'Повна середня освіта',
          },
          {
            title: 'Step IT Academy',
            period: '2019-2022',
            description: 'Курси',
          },
          {
            title: 'Житомирська політехніка',
            period: '2021-2025',
            description: 'Бакалавр',
          },
        ],
      };
    },
  };
  </script>
  