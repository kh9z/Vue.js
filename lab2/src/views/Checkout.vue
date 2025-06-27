<template>
  <div class="checkout max-w-3xl mx-auto p-6 bg-white shadow-md rounded-lg">
    <h1 class="text-3xl font-bold text-center my-8 text-gray-800">{{ $t('checkout.title') }}</h1>

    <div v-if="cartItems.length > 0">
      <div class="mb-8">
        <h2 class="text-xl font-semibold mb-4">{{ $t('cart.title') }}</h2>
        <ul class="space-y-2">
          <li v-for="item in cartItems" :key="item.id">
            <p class="text-gray-700">{{ item.name }} x {{ item.quantity }} - ${{ (item.price * item.quantity).toFixed(2) }}</p>
          </li>
        </ul>
        <p class="text-xl font-semibold text-right mt-4 text-gray-900">
          {{ $t('cart.total') }}: ${{ totalAmount.toFixed(2) }}
        </p>
      </div>

      <form @submit.prevent="confirmOrder" class="bg-gray-50 p-6 rounded-lg border shadow-sm">
        <h2 class="text-xl font-semibold mb-4 text-gray-800">{{ $t('checkout.title') }}</h2>

        <label class="block mb-2 text-gray-700">{{ $t('checkout.name') }}</label>
        <input v-model="name" type="text" class="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500" required />

        <label class="block mb-2 text-gray-700">{{ $t('checkout.address') }}</label>
        <input v-model="address" type="text" class="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500" required />

        <label class="block mb-2 text-gray-700">{{ $t('checkout.payment_method') }}</label>
        <select v-model="paymentMethod" class="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500" required>
          <option value="credit_card">{{ $t('checkout.credit_card') }}</option>
          <option value="paypal">PayPal</option>
        </select>

        <button type="submit" class="mt-4 w-full bg-teal-600 hover:bg-teal-700 text-white py-3 px-6 rounded-lg">
          {{ $t('checkout.confirm') }}
        </button>
      </form>
    </div>

    <div v-else class="text-center text-gray-600">
      <p>{{ $t('cart.empty') }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useCartStore } from '../stores/cart';


const cartStore = useCartStore();
const cartItems = cartStore.items;
const totalAmount = cartStore.totalAmount;


const name = ref('');
const address = ref('');
const paymentMethod = ref('credit_card');


function confirmOrder() {
  alert(`Order confirmed for ${name.value}!\nAddress: ${address.value}\nPayment Method: ${paymentMethod.value}`);
  cartStore.clearCart();
}
</script>


