import { defineStore } from 'pinia';


export const useUserStore = defineStore('user', {
  state: () => ({
    token: null,
    userData: null,
  }),
  actions: {
    setToken(token) {
      this.token = token;
      localStorage.setItem('auth_token', token);
    },
    setUserData(userData) {
      this.userData = userData;
    },
    clearToken() {
      this.token = null;
      localStorage.removeItem('auth_token');
    },
  },
});

