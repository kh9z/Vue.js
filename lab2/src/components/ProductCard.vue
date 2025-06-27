<template>
  <div class="product-card bg-white rounded-xl p-6 flex flex-col items-center space-y-4 border-4 border-emerald-400">
    <div class="product-image-container mb-4">
      <img :src="product.image" :alt="product.name" class="product-image" />
    </div>
          <router-link :to="`/products/${product.id}`" class="view-details text-lg text-indigo-700 hover:text-indigo-900 hover:underline">

    <div class="product-info text-center">
      <h2 class="product-name text-2xl font-bold text-purple-800">{{ product.name }}</h2>
      <p class="product-description text-sm text-gray-600">{{ product.description }}</p>
      <p class="product-price text-xl text-green-600 font-semibold mt-3">₴{{ product.price.toFixed(2) }}</p>
    </div>
    </router-link>
    <div class="product-actions space-x-4">
      <button @click="addToCart" class="w-full add-to-cart-btn bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-3 rounded-lg transition-all duration-300">
        {{ $t('product.add_to_cart') }}
      </button>      
    </div>
  </div>
</template>
<script setup>
import { useCartStore } from '../stores/cart';
const props = defineProps({ product: { type: Object, required: true } });
const cartStore = useCartStore();
function addToCart() { cartStore.addItem(props.product); }
</script>
<style scoped>
.product-image { width: 120px; height: 120px; border-radius: 12px; object-fit: cover; }
.product-image-container { display: flex; justify-content: center; align-items: center; }

</style>
