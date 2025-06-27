<template>
  <div class="login max-w-md m-auto p-8 bg-white shadow-lg rounded-lg">
    <h1 class="text-3xl font-bold text-center mb-6 text-emerald-600">{{ $t('login.title') }}</h1>

    <form @submit.prevent="loginUser">
      <label class="block text-lg font-medium mb-2">{{ $t('login.username') }}</label>
      <input
        v-model="username"
        type="text"
        class="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
        required
      />

      <label class="block text-lg font-medium mb-2">{{ $t('login.password') }}</label>
      <input
        v-model="password"
        type="password"
        class="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
        required
      />

      <button
        type="submit"
        class="w-full bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg transition duration-300 ease-in-out"
      >
        {{ $t('login.login_button') }}
      </button>
    </form>

    <p v-if="errorMessage" class="text-red-500 mt-4 text-center text-sm">{{ errorMessage }}</p>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useUserStore } from '../stores/user';


const userStore = useUserStore();


const username = ref('');
const password = ref('');
const errorMessage = ref('');


function loginUser() {
  if (username.value === 'user' && password.value === 'password') { // Simple check for example
    userStore.login({ username: username.value }); // Log the user in with a dummy username
    errorMessage.value = '';
    alert(`Welcome, ${username.value}!`);
  } else {
    errorMessage.value = 'Invalid username or password.';
  }
}
</script>
