import { defineStore } from 'pinia';

const LOCAL_STORAGE_KEY = 'commentCounts';

export const useCommentStore = defineStore('comment', {
  state: () => ({
    postCommentCounts: {},
  }),
  actions: {
    incrementCommentCount(postId) {
      if (!this.postCommentCounts[postId]) {
        this.postCommentCounts[postId] = 1;
      } else {
        this.postCommentCounts[postId] += 1;
      }
      
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(this.postCommentCounts));
    },
    getCommentCount(postId) {
      return this.postCommentCounts[postId] || 0;
    },
    loadCommentCountsFromLocalStorage() {
      const storedCommentCounts = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (storedCommentCounts) {
        this.postCommentCounts = JSON.parse(storedCommentCounts);
      }
    },
  },
});