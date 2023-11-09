<template>
    <div>
      <div>
        <h2>Список постов по теме "{{ currentCategory }}"</h2>
        
          <ol class="category-list">
            <li v-for="post in filteredPosts" :key="post.id">
              Название поста: {{ post.title }}
            </li>
          </ol>
      </div>
    </div>
</template>
  
<script>
import { ref, computed, onMounted} from 'vue';
import {usePostsStore} from '@/store/postsStore';
import { useRoute } from 'vue-router';
import { instance } from '@/axios/axiosInstance';

export default {
  setup() {
    const route = useRoute();
    const currentCategory = ref(route.params.category);
    const postsStore = usePostsStore();

    
    onMounted(async () => {
          const response = await instance.get('/posts');
          postsStore.setPosts(response.data);
    });
            
            
        
    const filteredPosts = computed(() => {
      return postsStore.posts.filter(post => post.category === currentCategory.value);
    });

    return {
      currentCategory,
      filteredPosts,
    };
  },
};
</script>

<style scoped>

h2{
  font-size: 30px;
  color: cadetblue;
  margin: 50px 0 0 28%;
}

.category-list{
  margin: 20px 0 0 34%;
  width: 500px;
}

.category-list li{
  margin-top: 10px;
  font-size: 20px;
  color: cadetblue;
}
</style>




