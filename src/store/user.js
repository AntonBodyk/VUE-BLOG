import { defineStore } from 'pinia';


export const useUserStore = defineStore('user', {
  state: () => ({
    token: null,
  }),
  actions: {
    setToken(token) {
      this.token = token;
      localStorage.setItem('auth_token', token);
    },
    clearToken() {
      this.token = null;
      localStorage.removeItem('auth_token');
    },
  },
});

