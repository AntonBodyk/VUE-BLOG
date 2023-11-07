<template>
    <div class="comments">
      <a-list
        v-if="commentsResponse && commentsResponse.length"
        :data-source="commentsResponse"
        item-layout="horizontal"
        class="comment-list"
      >

      <template v-slot:header>
        <div class="left-align-header">
          {{ commentsResponse.length }} {{ commentsResponse.length > 1 ? 'comments' : 'comment' }}
        </div>
      </template>

        <a-list-item v-for="comment in commentsResponse" :key="comment.id">
          <a-comment
            :author="comment.users.name"
            :content="comment.comment_text"
            :datetime="formattedDate(comment.created_at)"
          />
        </a-list-item>
      </a-list>
      <div class="no-comments" v-else>
        <p>No comments</p>
      </div>
      <a-comment class="comment">
        <template #content>
          <a-form
            :model="this.commentState"
            ref="form"
            name="basic"
            :label-col="{ span: 8 }"
            :wrapper-col="{ span: 16 }"
            autocomplete="off"
            @submit.prevent="handleSubmit"
          >
          <a-form-item name="comment"
          :rules="[
            { required: true, message: 'Пожалуйста, введите комментарий!' },
            {validator: validateComment}
          ]">
            <a-textarea v-model:value="this.commentState.comment" :rows="4" :placeholder="'Введите комментарий'"/>
          </a-form-item>
          <a-form-item>
            <a-button html-type="submit" :loading="submitting" type="primary">
              Добавить
            </a-button>
          </a-form-item>
          </a-form>
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
        commentState: {
          comment: ''
        },
        userName: '',
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
      handleSubmit() {
        setTimeout(() => {
                this.$refs.form.validate().then(res => {
                  const userStore = useUserStore();
        
                  const userID = userStore.user.id;
                  this.userName = userStore.user.name;

                  const response = instance.post('/comments', {
                    comment_text: this.commentState.comment,
                    post_id: this.postId,
                    user_id: userID
                  });
          
                  const newComment = {
                      users: {
                        name: this.userName, 
                        created_at: moment().format(), 
                      },
                      comment_text: this.commentState.comment, 
                  };

                  this.commentsResponse.push(newComment);
                  this.commentState.comment = '';
                  
                  const commentStore = useCommentStore();
                  commentStore.incrementCommentCount(this.postId);
                }).catch(error => {
                    console.log(error)
                
                })
            }, 0);
      },
      formattedDate(created_at){
            return moment(created_at).format("MMMM Do YYYY, h:mm:ss");
      },
      validateComment(rule, value) {
        if(value){
          const commentPattern = /[А-ЯA-Z][ \t]*[а-яА-ЯA-Za-z\s]*$/;
              if (commentPattern.test(value)) {
                  return Promise.resolve(); 
              } else {
                  return Promise.reject('Комментарий должен начинаться с большой буквы!');
              }
          }else{
              return Promise.resolve();
          }
      }
    }
  };
  </script>

<style scoped>
.comment-list{
    margin-top: 30px;
}
.left-align-header{
  margin-left: 20px;
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