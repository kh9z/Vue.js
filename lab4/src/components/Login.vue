<template>
  <div class="max-w-md mx-auto p-6 border rounded-xl shadow-md bg-white">
    <h2 class="text-2xl font-semibold mb-6 text-center">Login</h2>

    <form @submit.prevent="login" class="space-y-4">
      <div>
        <label for="email" class="block mb-1 font-medium text-gray-700">Email</label>
        <input
          type="email"
          id="email"
          v-model.trim="email"
          required
          autocomplete="email"
          placeholder="Enter your email"
          class="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div>
        <label for="password" class="block mb-1 font-medium text-gray-700">Password</label>
        <input
          type="password"
          id="password"
          v-model="password"
          required
          autocomplete="current-password"
          placeholder="Enter your password"
          class="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <button
        :disabled="loading"
        type="submit"
        class="w-full py-2 font-semibold rounded text-white transition duration-200 bg-gray-800 hover:bg-gray-500 disabled:bg-gray-200"
      >
        <span v-if="loading">Logging in...</span>
        <span v-else>Login</span>
      </button>
    </form>

    <p v-if="errorMessage" class="text-red-500 text-center mt-4">{{ errorMessage }}</p>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { auth } from '../firebaseConfig';
import { signInWithEmailAndPassword } from 'firebase/auth';

const email = ref('');
const password = ref('');
const loading = ref(false);
const errorMessage = ref('');
const router = useRouter();

const login = async () => {
  loading.value = true;
  errorMessage.value = '';

  try {
    await signInWithEmailAndPassword(auth, email.value, password.value);
    router.push('/items');
  } catch (error) {
    errorMessage.value = error.code === 'auth/user-not-found'
      ? 'User not found. Please check your email.'
      : error.code === 'auth/wrong-password'
      ? 'Incorrect password.'
      : error.message;
  } finally {
    loading.value = false;
  }
};
</script>
