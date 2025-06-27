<template>
  <div class="max-w-3xl mx-auto p-8 bg-gray-100 rounded-xl shadow-lg">
    <h2 class="text-2xl font-bold mb-6 text-center text-gray-800">{{ t('cart.title') }}</h2>
    <div v-if="cartStore.items.length" class="border-t border-gray-300 pt-4">
      <CartItem v-for="item in cartStore.items" :key="item.id" :item="item" />
      <div class="text-right text-xl font-bold mt-8 text-gray-800">
        <p>{{ t('cart.total') }}: ₴{{ cartStore.totalAmount.toFixed(2) }}</p>
        <button @click="$router.push('/checkout')" class="mt-4 w-full bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-md transition-colors">
          {{ $t('cart.checkout') }}
        </button>
      </div>
    </div>
    <div v-else class="text-center text-lg text-gray-500 mt-8">
      <p>{{ t('cart.empty') }}</p>
    </div>
  </div>
</template>

<script setup>
import { useCartStore } from '../stores/cart';
import { useI18n } from 'vue-i18n';
import CartItem from '../components/CartItem.vue';

const cartStore = useCartStore();
const { t } = useI18n();
</script>

