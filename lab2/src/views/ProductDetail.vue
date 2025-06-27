<template>
  <div v-if="product" class="product-detail max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg text-center">
    <img :src="product.image" :alt="product.name" class="w-64 h-auto mx-auto mb-6 rounded" />
    <h1 class="text-3xl font-bold text-center mb-4 text-gray-900">{{ product.name }}</h1>
    <p class="text-gray-600 text-center mb-2">{{ product.description }}</p>
    <p class="text-center text-emerald-500 text-xl font-semibold mb-6">${{ product.price.toFixed(2) }}</p>
    
    <button @click="addToCart" class="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg transition duration-300 ease-in-out">
      {{ $t('product.add_to_cart') }}
    </button>
  </div>
  
  <div v-else class="text-center p-4">
    <p class="text-gray-500">{{ $t('product.not_found') }}</p>
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router';
import { useProductsStore } from '../stores/products';
import { useCartStore } from '../stores/cart';


const route = useRoute();
const productId = Number(route.params.id);


const productsStore = useProductsStore();
const cartStore = useCartStore();


const product = productsStore.getProductById(productId);


function addToCart() {
  cartStore.addItem(product);
}
</script>
