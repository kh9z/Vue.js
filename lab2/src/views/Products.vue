<template>
    <div class="list pt-2">
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-4">
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

  