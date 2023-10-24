import { defineStore } from 'pinia';
import { instance } from '@/axios/axiosInstance';
import CommentModel from '@/models/CommentModel';

export const useCommentStore = defineStore({
    id: 'comment',
    state: () => ({
      comments: [],
    }),
    actions: {
      async addComment(comment) {
        
        try {
          await instance.post('/posts', {comments: comment.content})
          
          this.comments.unshift(comment);
        } catch (error) {
          console.error('Error adding comment:', error);
        }
      },
    },
  });