<template>
  <v-container class="block text-dark shadow-box-lg rounded-xl px-8 py-4">
    <h2 class="mb-6">Мої навички</h2>
    <v-row class="d-flex justify-center">
      <v-col
        v-for="(skill, index) in skills"
        :key="index"
        cols="12"
        md="4"
        class="d-flex justify-center mb-4"
      >
        <v-card class="px-4 shadow-box-sm text-white" outlined>
          <v-card-title class="text-center">
            <h3>
              {{ skill.name }}
            </h3>
          </v-card-title>
          <v-card-subtitle class="ico">
            <icon-component :name="skill.icon" class="skill-icon" />
          </v-card-subtitle>
          <v-card-text>
            <v-progress-linear
              :value="skill.level"
              color="red"
              height="15"
              class="mb-4"
            ></v-progress-linear>
            <div class="text-center"><p>{{ skill.level }}%</p></div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import IconComponent from './IconComponent.vue';

export default {
  components: {
    IconComponent
  },
  data() {
    return {
      skills: [
        { name: 'PHP', level: 70, icon: 'lang' },
        { name: 'JS', level: 80, icon: 'lang' },
        { name: 'Vue', level: 80, icon: 'lang' },
        { name: 'Терпіння', level: 0.0001, icon: 'empathy' },
        { name: 'Голод', level: 100, icon: 'kill' },
      ],
    };
  },
};
</script>

<style scoped>
.skill-icon {
  width: 60px;
  height: 60px;
  color: var(--v-primary-base);
}
.ico {
  display: flex;
  justify-content: center;
}
</style>

