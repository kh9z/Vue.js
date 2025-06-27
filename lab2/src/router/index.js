import { createRouter, createWebHistory } from 'vue-router';
import DefaultLayout from '../layouts/DefaultLayout.vue';
import Home from '../views/Home.vue';
import Products from '../views/Products.vue';
import ProductDetail from '../views/ProductDetail.vue';
import Cart from '../views/Cart.vue';
import Checkout from '../views/Checkout.vue';
import Login from '../views/Login.vue';

const routes = [
  {
    path: '/',
    component: DefaultLayout,
    children: [
      { path: '', name: 'Home', component: Home },
      { path: '/products', name: 'Products', component: Products },
      { path: '/products/:id', name: 'ProductDetail', component: ProductDetail, props: true },
      { path: 'cart', name: 'Cart', component: Cart },
      { path: 'checkout', name: 'Checkout', component: Checkout },
      { path: 'login', name: 'Login', component: Login },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
