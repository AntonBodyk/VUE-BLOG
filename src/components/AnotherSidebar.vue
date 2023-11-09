<template>
    <div class="sidebar">
        <h1>Популярные темы</h1>

        <div class="popular-category" v-for="category in getPopularCategories()" :key="category">
            <p class="category" @click="navigateToPost(category)">
                <!-- <router-link :to="'/categories/' + category">{{ category }}</router-link>  -->
                {{ category }}
            </p>
        </div>
    </div>
</template>

<script>
import { instance } from "../axios/axiosInstance";
import {usePostsStore} from '@/store/postsStore';
import { message } from 'ant-design-vue';
import Icon from '@ant-design/icons-vue';
export default {
    components:{
        Icon
    },
    methods:{
        navigateToPost(category) {
            if (localStorage.getItem('auth_user') && localStorage.getItem('auth_token') !== null) {
                this.$router.push(`${'/categories/' + category}`);
            } else {
                message.error('Войдите или зарегистрируйтесь чтобы продолжить!');
                this.$router.push('/sign');
            }
        },
        getPopularCategories() {
            const postsStore = usePostsStore();
            const categoryCounts = {};

            postsStore.posts.forEach(post => {
                if (categoryCounts[post.category]) {
                    categoryCounts[post.category]++;
                } else {
                    categoryCounts[post.category] = 1;
                }
            });

            const popularCategories = Object.keys(categoryCounts).filter(category => categoryCounts[category] >= 10);

            return popularCategories;
    },
    getPopularCategoryPosts() {
        const popularCategories = this.getPopularCategories();
        return popularCategories;
    },
    filteredAndSortedByCategory() {
        const postsStore = usePostsStore();
        const popularCategories = this.getPopularCategories();

        return postsStore.posts.filter(post => popularCategories.includes(post.category));
    },
    },
    mounted(){
        this.getPopularCategoryPosts();
        this.filteredAndSortedByCategory();
    }
}
</script>

<style scoped>
.sidebar{
    margin: 65% 0 0 -27%;
    width: 400px;
    height: 700px;
    background-color: white;
    border-radius: 10px;
}
h1{
    padding: 30px 0 0 50px;
    color:darkslategray;
}
.popular-category{
    width: 300px;
    margin: 30px 0 0 50px;
}
.popular-category h2{
    font-size: 18px;
    color:rgb(43, 69, 69);
    cursor: pointer;
}

.category{
    color:darkslateblue;
    font-size: 18px;
    cursor: pointer;
}
</style>