<template>
    <div>
      <a-list
        v-if="comments.length"
        :data-source="comments"
        :header="`${comments.length} ${comments.length > 1 ? 'comments' : 'comment'}`"
        item-layout="horizontal"
        class="comment-list"
      >
        <a-list-item v-for="comment in comments" :key="comment.id">
          <a-comment
            :author="comment.author"
            :content="comment.comment_text"
            :datetime="comment.datetime"
          />
        </a-list-item>
      </a-list>
      <a-comment class="comment">
        <template #content>
          <a-form-item>
            <a-textarea v-model:value="value" :rows="4" />
          </a-form-item>
          <a-form-item>
            <a-button html-type="submit" :loading="submitting" type="primary" @click="handleSubmit">
              Добавить
            </a-button>
          </a-form-item>
        </template>
      </a-comment>
    </div>
  </template>
  
  <script>
  import { useCommentStore } from '@/store/commentStore';
  import dayjs from 'dayjs';
  import relativeTime from 'dayjs/plugin/relativeTime';
  import { instance } from '@/axios/axiosInstance';
  
  dayjs.extend(relativeTime);
  
  export default {
    data() {
      return {
        comments: [],
        submitting: false,
        value: '',
      };
    },
    props: {
      postId: {
        type: String,
        required: true
      }
    },
    created() {
      this.loadCommentsFromLocalStorage();
    },
    methods: {
      async handleSubmit() {
        if (!this.value) {
          return;
        }
  
        this.submitting = true;
  
        try {
          const response = await instance.post('/comments', {
            comment_text: this.value,
            post_id: this.postId,
            user_name: this.user_name
          });
  
          
          this.comments.unshift(response.data.data);

          const commentStorageKey = `post_${this.postId}_comments`;
          localStorage.setItem(commentStorageKey, JSON.stringify(this.comments));
  
          this.saveCommentsToLocalStorage();
          
          const commentStore = useCommentStore();
          commentStore.incrementCommentCount(this.postId);

          this.value = '';
        } catch (error) {
          console.error('Error adding comment', error);
        } finally {
          this.submitting = false;
        }
      },
      saveCommentsToLocalStorage() {
    // Use a unique storage key for this post's comments
        const commentStorageKey = `post_${this.postId}_comments`;
        localStorage.setItem(commentStorageKey, JSON.stringify(this.comments));
      },
      loadCommentsFromLocalStorage() {
        // Use a unique storage key for this post's comments
        const commentStorageKey = `post_${this.postId}_comments`;
        const storedComments = localStorage.getItem(commentStorageKey);
        if (storedComments) {
          this.comments = JSON.parse(storedComments);
        }
      },
    },
    created() {
      // Use the unique storage key for this post's comments
      const commentStorageKey = `post_${this.postId}_comments`;
      this.loadCommentsFromLocalStorage(commentStorageKey);
    },
  };
  </script>

<style scoped>
.comment{
    width: 500px;
    margin-left: 90px;
}
.comment-list{
    width: 500px;
    margin-left: 100px;
}
</style>