<template>
    <div>
      <h1>{{ currentCategory }}</h1>
      <div>
        <h2>Список постов категории "{{ currentCategory }}"</h2>
        
          <ul class="category-list">
            <li v-for="post in filteredPosts" :key="post.id">
              {{ post.title }}
            </li>
          </ul>
      </div>
    </div>
</template>
  
<script>
import { ref, computed} from 'vue';
import { usePostsStore } from '@/store/postsStore';
import { useRoute } from 'vue-router';

export default {
  setup() {
    const route = useRoute();
    const currentCategory = ref(route.params.category);
    const postsStore = usePostsStore();

    
    const storedData = localStorage.getItem('posts');
    if (storedData) {
      postsStore.setPosts(JSON.parse(storedData));
    }

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







