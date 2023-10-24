import { defineStore } from 'pinia';

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