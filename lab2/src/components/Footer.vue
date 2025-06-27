<template>
  <footer class="bg-gray-900 text-white py-6 text-center">
    <div class="flex justify-center gap-6 mb-6">
      <router-link v-for="link in links" :key="link.to" :to="link.to" class="hover:text-gray-400 transition-colors duration-300">
        {{ $t(link.label) }}
      </router-link>
    </div>
    <p class="text-sm">&copy; 2025. Біля дому</p>
    <p class="text-xs mt-2">{{ $t('footer.contact') }}: support@bilyadomu.com</p>
  </footer>
</template>
<script setup>
const links = [
  { to: '/', label: 'navbar.home' },
  { to: '/products', label: 'navbar.products' },
  { to: '/cart', label: 'navbar.cart' },
];
</script>
