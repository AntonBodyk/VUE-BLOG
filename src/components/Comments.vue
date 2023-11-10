<template>
    <div class="comments">
      <a-list
        v-if="commentsArray && commentsArray.length"
        :data-source="commentsArray"
        item-layout="horizontal"
        class="comment-list"
      >

      <template v-slot:header>
        <div class="left-align-header">
          {{ commentsArray.length }} {{ commentsArray.length > 1 ? 'comments' : 'comment' }}
        </div>
      </template>

        <a-list-item v-for="comment in commentsArray" :key="comment.id">
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
            ref="formRef"
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
            <a-textarea v-model:value="commentState.comment" :rows="4" :placeholder="'Введите комментарий'"/>
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
  import {ref} from 'vue';

  dayjs.extend(relativeTime);
  

  export default {
    props: {
      postId: {
        type: String,
        required: true
      },
      commentsArray:{
        type: Array,
        required: true
      }
    },
    setup(props){
      const comments = ref([]);
      const submitting = ref(false);
      const commentState = ref({
          comment: ''
      });
      // const userName = ref('');
      const userStore = useUserStore();
      const formRef = ref(null);

      const handleSubmit = () => {
        setTimeout(() => {
                formRef.value.validate().then(res => {
                  
                  const userID = userStore.user.id;
                  // userName.value = userStore.user.name;

                  const response = instance.post('/comments', {
                    comment_text: commentState.value.comment,
                    post_id: props.postId,
                    user_id: userID
                  });
          
                  const newComment = {
                      users: {
                        name: userStore.user.name, 
                        created_at: moment().format(), 
                      },
                      comment_text: commentState.value.comment, 
                  };

                  props.commentsArray.push(newComment);
                  commentState.value.comment = '';
                  
                  const commentStore = useCommentStore();
                  commentStore.incrementCommentCount(props.postId);
                }).catch(error => {
                    console.log(error)
                })
            }, 0);
      };

      const formattedDate = (created_at) =>{
            return moment(created_at).format("MMMM Do YYYY, h:mm:ss");
      };

      const validateComment = (rule, value) => {
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
      };

      return{
        comments,
        submitting,
        commentState,
        handleSubmit,
        formattedDate,
        validateComment,
        formRef
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