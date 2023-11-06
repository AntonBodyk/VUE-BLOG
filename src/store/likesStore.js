import { defineStore } from 'pinia';

export const usePostsLikesStore = defineStore({
  id: 'posts',
  state: () => ({
    posts: [],
  }),
  actions: {
    setPosts(newPosts) {
      this.posts = newPosts;
    },
    updateLikesCount(postId, newLikesCount) {
      const post = this.posts.find(post => post.id === postId);
      if (post) {
        post.likes_count = newLikesCount;
      }
    },
  },
});