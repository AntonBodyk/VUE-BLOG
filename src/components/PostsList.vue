<template>
    <div v-if="posts.length > 0">
        <h3>Список постов</h3>
        <div class="post" v-for="post in posts" :key="post.id">
            <h2 class="post-title">{{ post.title }}</h2>
            <div class="post-body">
                <p>{{ post.body }}</p>
            </div>
            <!-- <div>Название: {{ post.title }}</div>
            <div>Описание: {{ post.body }}</div> -->
        </div>
        
    </div>
    <h2 v-else style="color: red">Список постов пуст</h2>
    <!-- <div v-show="posts.length > 0">
        <h3>Список постов</h3>
    </div> -->
</template>

<script>
import { instance } from "../axios/axiosInstance";
export default{
    data(){
        return{
            posts: []
        }
    },
    methods: {
        async getPosts() {
                try {
                    const response = await instance.get('/posts')
                    .then(response =>{
                        this.posts = response.data;
                        console.log(this.posts);
                    });
                }catch(e) {
                    alert('Ошибка');
                }
        }
    },
    mounted(){
        this.getPosts();
    }
}
</script>

<style scoped>

h3{
    font-size: 40px;
    color:darkslategray;
    margin: 30px 0 0 100px;
}
h2{
    font-family: serif;
    margin: 20px 0 0 100px;
}
</style>
