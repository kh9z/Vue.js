<template>
  <ul class="divide-y divide-gray-200 rounded-md shadow-sm bg-white dark:bg-gray-800">
    <li
      v-if="forecast?.list?.length"
      class="p-4 hover:bg-gray-50 dark:hover:bg-gray-700 transition"
    >
      <div class="text-lg font-semibold text-gray-900 dark:text-white">
        {{ forecast.date }}
      </div>
      <div class="text-sm text-gray-600 dark:text-gray-300">
        {{ forecast.temp }}°C
      </div>
    </li>
  </ul>
</template>

<script>
export default {
  props: {
    forecast: Object,
  }
};
</script>
