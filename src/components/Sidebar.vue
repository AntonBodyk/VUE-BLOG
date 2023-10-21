<template>
    <div class="sidebar">
        <h1>Лучшие посты</h1>

        <div class="popular-posts" v-for="popularPost in filteredAndSortedByLikes()" :key="popularPost.id">
            <h2>Название: {{ popularPost.title }}</h2>
            <p>Лайки: {{ popularPost.likes_count }}</p>
        </div>
    </div>
</template>

<script>
import { instance } from "../axios/axiosInstance";
export default {
    data(){
        return{
            popularPosts: []
        }
    },
    methods:{
        async getPopularPosts(){
            const response = await instance.get('/posts');

            this.popularPosts = response.data;
            
        },
        filteredAndSortedByLikes() {
            return this.popularPosts = this.popularPosts
                    .filter(post => post.likes_count > 1)
                    .sort((a, b) => b.likes_count - a.likes_count);
        }
    },
    mounted(){
        this.getPopularPosts();
        this.filteredAndSortedByLikes();
    }
}
</script>

<style scoped>
.sidebar{
    margin: 195px 0 0 150px;
    width: 400px;
    height: 700px;
    background-color: white;
    border-radius: 10px;
}
h1{
    padding: 30px 0 0 50px;
    color:darkslategray;
}
.popular-posts{
    width: 300px;
    margin: 20px 0 0 50px;
}
.popular-posts h2{
    font-size: 18px;
    color:rgb(43, 69, 69);
}
.popular-posts p{
    font-size: 15px;
    color:darkmagenta
}
</style>