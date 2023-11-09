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
    setPosts(newPost) {
      this.posts = newPost;
    },
    selectCategory(category) {
        this.selectedCategory = category;
    },
    addPost(newPost) {
      this.posts.push(newPost);
    },
    updateLikesCount(postId, newLikesCount) {
      const post = this.posts.find(post => post.id === postId);
      if (post) {
        post.likes_count = newLikesCount;
      }
    },
    removePost(postId) {
      const index = this.posts.findIndex(post => post.id === postId);
      if (index !== -1) {
        this.posts.splice(index, 1);
      }
    },
  },
});







