import { defineStore } from 'pinia';


export const useUserStore = defineStore('user', {
  state: () => ({
    token: null,
    user: JSON.parse(localStorage.getItem('user')) || null,
  }),
  actions: {
    setToken(token) {
      this.token = token;
      localStorage.setItem('auth_token', token);
    },
    setUser(user) {
      this.user = user.user;
      localStorage.setItem('auth_user', JSON.stringify(user.user));
    },
    clearToken() {
      this.token = null;
      localStorage.removeItem('auth_token');
    },
    clearAuthUser(){
      this.user = null;
      localStorage.removeItem('auth_user');
    }
  },
});

