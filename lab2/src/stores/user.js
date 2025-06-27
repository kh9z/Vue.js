import { defineStore } from 'pinia';

export const useUserStore = defineStore('user', {
  state: () => ({
    isAuthenticated: false,
    userInfo: null, 
  }),
  actions: {
    login(userData) {
      this.isAuthenticated = true;
      this.userInfo = userData;
    },
    logout() {
      this.isAuthenticated = false;
      this.userInfo = null;
    },
  },
});
