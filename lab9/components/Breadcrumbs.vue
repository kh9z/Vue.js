<template>
  <div>
    <NuxtLink to="/">Головна</NuxtLink> > 
    <span v-if="route.path !== '/'">{{ currentPage }}</span>
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router';
import { computed } from 'vue';

const route = useRoute();

const currentPage = computed(() => {
  if (route.path.includes('/article/')) {
    const slug = route.params.slug;
    return `Стаття: ${slug}`;
  }
    return 'Сторінка не знайдена';
});
</script>
  