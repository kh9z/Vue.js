<template>
  <div id="app" class="font-sans text-gray-800 p-8">
    <nav class="flex justify-between items-center mb-6">
      <h1 class="text-3xl font-semibold">Auth in Vue.js</h1>

      <ul class="flex gap-3">
        <template v-if="!isAuthenticated">
          <li>
            <router-link
              to="/login"
              class="px-4 py-2 border border-black text-black rounded hover:bg-black hover:text-white transition"
            >
              Login
            </router-link>
          </li>
          <li>
            <router-link
              to="/register"
              class="px-4 py-2 border border-black text-black rounded hover:bg-black hover:text-white transition"
            >
              Register
            </router-link>
          </li>
        </template>

        <li v-else>
          <button
            @click="logout"
            class="px-4 py-2 border border-black text-black rounded hover:bg-black hover:text-white transition"
          >
            Logout
          </button>
        </li>
      </ul>
    </nav>

    <router-view />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { useRouter } from 'vue-router';
import { auth } from './firebaseConfig';

const router = useRouter();
const isAuthenticated = ref(false);

onMounted(() => {
  onAuthStateChanged(auth, (user) => {
    isAuthenticated.value = !!user;
  });
});

const logout = async () => {
  try {
    await signOut(auth);
    isAuthenticated.value = false;
    router.push('/login');
  } catch (error) {
    console.error('Logout failed:', error);
  }
};
</script>