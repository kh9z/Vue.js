<template>
  <div class="home bg-gray-50 py-8">
    <h1 class="text-3xl font-bold text-center text-gray-800 my-8">{{ $t('home.title') }}</h1>
    <p class="text-2xl text-center text-gray-500 mb-12">{{ $t('home.description') }}</p>

    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-8 px-4">
      <ProductCard v-for="product in products" :key="product.id" :product="product" />
    </div>
  </div>
</template>

<script setup>
import { useProductsStore } from '../stores/products';
import ProductCard from '../components/ProductCard.vue';

const productsStore = useProductsStore();
const products = productsStore.products;
</script>