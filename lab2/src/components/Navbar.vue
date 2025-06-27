<template>
  <nav
    class="bg-emerald-500 text-white p-4 flex justify-between items-center shadow-md"
  >
    <div class="flex items-center space-x-6">
      <router-link
        to="/"
        class="text-2xl font-bold hover:text-gray-300 transition-colors"
      >
        {{ $t("navbar.home") }}
      </router-link>
      <router-link to="/products" class="hover:text-gray-300 transition-colors">
        {{ $t("navbar.products") }}
      </router-link>
    </div>
    <div class="flex items-center space-x-6">
      <router-link to="/login" class="hover:text-gray-300 transition-colors">{{ $t('navbar.login') }}</router-link>
      <router-link to="/cart" class="hover:text-gray-300 transition-colors flex">
        <span class="ml-1">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
          </svg>
        </span>
        <span class="ml-1 bg-red-500 rounded-full text-xs px-2 py-1">
          {{ cartStore.items.reduce((sum, item) => sum + item.quantity, 0) }}
        </span>
      </router-link>
      <LanguageSwitcher />
    </div>
  </nav>
</template>
<script setup>
import { useI18n } from "vue-i18n";
import LanguageSwitcher from "./LanguageSwitcher.vue";
import { useCartStore } from "../stores/cart";
const cartStore = useCartStore();
const links = [
  { to: '/', label: 'navbar.home' },
  { to: '/products', label: 'navbar.products' }
];
useI18n();
</script>
