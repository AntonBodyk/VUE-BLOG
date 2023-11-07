import { defineStore } from 'pinia';

export const usePostsStore = defineStore({
  id: 'posts',
  state: () => ({
    posts: [],
    selectedCategory: '', 
  }),
  getters: {
        filteredPosts() {
            const category = this.selectedCategory;
            return this.posts.filter(post => post.category === category);
        },
  },
  actions: {
    setPosts(newPosts) {
      this.posts = newPosts;
    },
    selectCategory(category) {
        this.selectedCategory = category;
    }
  },
});







