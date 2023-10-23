<template>
    <div>
      <a-list
        v-if="comments.length"
        :data-source="comments"
        :header="`${comments.length} ${comments.length > 1 ? 'replies' : 'reply'}`"
        item-layout="horizontal"
        class="comment-list"
      >
        <template #renderItem="{ item }">
          <a-list-item>
            <a-comment
              :author="item.author"
              :content="item.content"
              :datetime="item.datetime"
            />
          </a-list-item>
        </template>
      </a-list>
      <a-comment class="comment">
        <template #content>
          <a-form-item>
            <a-textarea v-model:value="value" :rows="4" />
          </a-form-item>
          <a-form-item>
            <a-button html-type="submit" :loading="submitting" type="primary" @click="handleSubmit">
              Add Comment
            </a-button>
          </a-form-item>
        </template>
      </a-comment>
    </div>
  </template>
  
  <!-- <script>
  import dayjs from 'dayjs';
  import relativeTime from 'dayjs/plugin/relativeTime';
  
  dayjs.extend(relativeTime);
  
  export default {
    data() {
      return {
        comments: [],
        submitting: false,
        value: '',
      };
    },
    methods: {
      handleSubmit() {
        if (!this.value) {
          return;
        }
  
        this.submitting = true;
  
        setTimeout(() => {
          this.submitting = false;
          this.comments.unshift({
            author: 'Han Solo',
            content: this.value,
            datetime: dayjs().fromNow(),
          });
  
          this.value = '';
        }, 1000);
      },
    },
  };
  </script> -->
  <script setup>
  import { useCommentStore } from '@/store/user';

  const commentStore = useCommentStore();
  const { comments, submitting, value } = commentStore;

  const handleSubmit = async () => {
    if (!value) {
      return;
    }

    const newComment = new Comment('Han Solo', value, dayjs().fromNow());

    
    await commentStore.addComment(newComment);

    
    value.value = '';
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