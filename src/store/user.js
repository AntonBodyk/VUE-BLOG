import { defineStore } from 'pinia';
import { instance } from '@/axios/axiosInstance';
import CommentModel from '@/models/CommentModel';

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

export const useCommentStore = defineStore({
  id: 'comment',
  state: () => ({
    comments: [],
  }),
  actions: {
    async addComment(comment) {
      
      try {
        // await fetch('/api/comments', {
        //   method: 'POST',
        //   headers: {
        //     'Content-Type': 'application/json',
        //   },
        //   body: JSON.stringify(comment),
        // });
        await instance.post('/posts', {comments: comment.content})
        
        this.comments.unshift(comment);
      } catch (error) {
        console.error('Error adding comment:', error);
      }
    },
  },
});