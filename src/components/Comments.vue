<template>
    <div class="comments">
      <!-- <a-list
        v-if="commentsResponse && commentsResponse.length"
        :data-source="commentsResponse"
        :header="`${commentsResponse.length} ${commentsResponse.length > 1 ? 'comments' : 'comment'}`"
        item-layout="horizontal"
        class="comment-list"
      > -->

      <a-list
        v-if="commentsResponse && commentsResponse.length"
        :data-source="commentsResponse"
        :header="`${commentsResponse.length} ${commentsResponse.length > 1 ? 'comments' : 'comment'}`"
        item-layout="horizontal"
        class="comment-list"
      >
        <a-list-item v-for="comment in commentsResponse" :key="comment.id">
          <a-comment
            :author="comment.users.name"
            :content="comment.comment_text"
            :datetime="formattedDate(comment.users.created_at)"
          />
        </a-list-item>
      </a-list>
      <div class="no-comments" v-else>
        <p>No comments</p>
      </div>
      <a-comment class="comment">
        <template #content>
          <a-form-item>
            <quill-editor v-model:content="value" contentType="text" theme="snow"></quill-editor>
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
  import { useUserStore } from '@/store/user';
  import dayjs from 'dayjs';
  import relativeTime from 'dayjs/plugin/relativeTime';
  import { instance } from '@/axios/axiosInstance';
  import moment from 'moment';
  
  dayjs.extend(relativeTime);
  
  export default {
    data() {
      return {
        comments: [],
        submitting: false,
        value: '',
        userName: ''
      };
    },
    props: {
      postId: {
        type: String,
        required: true
      },
      commentsResponse:{
        type: Object,
        required: true
      }
    },
    methods: {
      async handleSubmit() {
        if (!this.value) {
          return;
        }
  
        this.submitting = true;

        const userStore = useUserStore();
        
        const userID = userStore.user.id;
        this.userName = userStore.user.name;
  
        try {
          const response = await instance.post('/comments', {
            comment_text: this.value,
            post_id: this.postId,
            user_id: userID
          });
          
          
          this.commentsResponse.push(response.data.data);
          
          
          const commentStore = useCommentStore();
          commentStore.incrementCommentCount(this.postId);

          this.value = '';
        } catch (error) {
          console.error('Error adding comment', error);
        } finally {
          this.submitting = false;
        }
      },
      formattedDate(created_at){
            return moment(created_at).format("MMMM Do YYYY, h:mm:ss");
      }
    }
  };
  </script>

<style scoped>
.comment-list{
    margin-top: 30px;
}

.comment{
  max-width: 500px;
  margin-left: 20px;
  
}
.comments{
    width: 700px;
    margin-left: 27%;
    background-color: white;
    border-radius: 10px;
    cursor: pointer;
    box-shadow: 4px 4px 4px 4px rgba(0, 0, 0, 0.2), 0 25px 50px 0 rgba(0, 0, 0, 0.1);
}

.no-comments p{
  font-size: 30px;
  margin: 70px 0 0 30px;
  padding-top: 10px;
}

</style>