<template>
  <v-app>
    <Header />
    <v-main>
      <v-container class="pt-16">
        <v-row>
          <v-col cols="12">
            <SearchBar @search="getWeatherData" />
          </v-col>
        </v-row>

        <v-row v-if="weather">
          <v-col cols="12">
            <WeatherCard :weather="weather" />
          </v-col>
        </v-row>

        <!-- <v-row v-if="forecast && forecast.list?.length">
          <v-col cols="12">
            <ForecastList :forecast="forecast" />
          </v-col>
        </v-row>

        <v-row v-if="chartData">
          <v-col cols="12">
            <ForecastChart :data="chartData" />
          </v-col>
        </v-row> -->
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import Header from "./components/Header.vue";
import SearchBar from "./components/SearchBar.vue";
import WeatherCard from "./components/WeatherCard.vue";
import ForecastList from "./components/ForecastList.vue";
import ForecastChart from "./components/ForecastChart.vue";
import ToggleTheme from "./components/ToggleTheme.vue";

import { fetchWeather, fetchForecast } from "./services/weatherService";

export default {
  components: {
    Header,
    SearchBar,
    WeatherCard,
    ForecastList,
    ForecastChart,
    ToggleTheme,
  },
  data() {
    return {
      weather: null,
      forecast: null,
      chartData: null,
      city: "",
    };
  },
  methods: {
    async getWeatherData(city) {
      this.city = city;
      try {
        const weatherData = await fetchWeather(this.city);
        this.weather = weatherData;

        const forecastData = await fetchForecast(this.city);
        this.forecast = forecastData;

        // Захист від відсутності списку
        if (forecastData?.list?.length) {
          this.chartData = {
            temperature: forecastData.list.map((item) => item.main.temp),
            feels_like: forecastData.list.map((item) => item.main.feels_like),
            precipitation: forecastData.list.map(
              (item) => item.rain?.["3h"] || 0
            ),
          };
        } else {
          this.chartData = null;
        }
      } catch (error) {
        console.error("Error fetching weather data:", error);
        this.weather = null;
        this.forecast = null;
        this.chartData = null;
      }
    },
  },
};
</script>

<style scoped>
body {
  background-color: #f5f5f5;
  color: #333;
}

.v-app {
  background-color: #ffffff;
}

.v-container {
  width: 100% !important;
}
</style>
