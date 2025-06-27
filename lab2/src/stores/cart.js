import { defineStore } from 'pinia';

export const useCartStore = defineStore('cart', {
  state: () => ({
    items: [],
  }),
  actions: {
    addItem(product) {
      const item = this.items.find((item) => item.id === product.id);
      if (item) {
        item.quantity += 1; 
      } else {
        this.items.push({ ...product, quantity: 1 }); 
      }
    },
    removeItem(productId) {
      this.items = this.items.filter((item) => item.id !== productId);
    },
    clearCart() {
      this.items = [];
    },
  },
  getters: {
   
    totalAmount: (state) => state.items.reduce((total, item) => total + item.price * item.quantity, 0),
  },
});
