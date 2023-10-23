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

export const useThemeStore = defineStore({
  id: 'theme',
  state: () => ({
    isDarkTheme: false,
  }),
  getters: {
    getThemeColor: (state) => (state.isDarkTheme ? 'black' : 'aliceblue'),
  },
  actions: {
    toggleTheme() {
      this.isDarkTheme = !this.isDarkTheme;
    },
  },
});