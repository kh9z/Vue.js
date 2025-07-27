<template>
  <div class="weather-card p-6 bg-white rounded shadow-md space-y-2">
    <h2 class="text-xl font-bold">
      Погода в місті ({{ city }})
    </h2>
    <p>Температура: {{ weather.main.temp }}°C</p>
    <p>Відчувається як: {{ weather.main.feels_like }}°C</p>
    <p>Стан неба: {{ weather.weather[0].description }}</p>
    <p>Схід сонця: {{ formatTime(weather.sys.sunrise) }}</p>
    <p>Захід сонця: {{ formatTime(weather.sys.sunset) }}</p>
    <p>Вологість: {{ weather.main.humidity }}%</p>
    <p>Хмарність: {{ weather.clouds.all }}%</p>
    <p>Швидкість вітру: {{ weather.wind.speed }} м/с</p>
  </div>
</template>

<script>
export default {
  props: {
    weather: {
      type: Object,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
  },
  methods: {
    formatTime(unix) {
      const date = new Date(unix * 1000);
      return date.toLocaleTimeString("uk-UA", {
        hour: "2-digit",
        minute: "2-digit",
      });
    },
  },
};
</script>

<style scoped>
.weather-card {
  max-width: 400px;
  margin: auto;
}
</style>
