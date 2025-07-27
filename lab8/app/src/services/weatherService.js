import axios from 'axios';

const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
const BASE_URL = 'https://api.openweathermap.org/data/2.5/';

export async function fetchWeather(city = 'Kyiv') {
  try {
    const encodedCity = encodeURIComponent(city.trim());
    const response = await axios.get(`/api/data/2.5/weather?q=${encodedCity}&appid=${API_KEY}&units=metric&lang=ua`);
    return [
      response.data, 
      city
    ];
  } catch (error) {
    if (error.response && error.response.status === 404) {
      throw new Error('City not found. Please check the spelling.');
    }
    throw error;
  }
}

export async function fetchForecast(city) {
  try {
    const encodedCity = encodeURIComponent(city.trim());
    const response = await axios.get(`/api/data/2.5/forecast?q=${encodedCity}&appid=${API_KEY}&units=metric&lang=ua`);
    return response.data;
  } catch (error) {
    if (error.response && error.response.status === 404) {
      throw new Error('City not found. Please check the spelling.');
    }
    throw error;
  }
}