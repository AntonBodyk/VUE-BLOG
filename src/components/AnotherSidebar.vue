<template>
    <div class="sidebar">
        <h1>Популярные темы</h1>

        <div class="popular-category" v-for="category in getPopularCategories()" :key="category">
            <p class="category" @click="navigateToPost(category)">
                {{ category }}
            </p>
        </div>
    </div>
</template>

<script>
import {usePostsStore} from '@/store/postsStore';
import { message } from 'ant-design-vue';
import Icon from '@ant-design/icons-vue';
import { onMounted, getCurrentInstance } from 'vue';
export default {
    components:{
        Icon
    },
    setup(){
        const router = getCurrentInstance().appContext.config.globalProperties.$router;

        const navigateToPost = (category) => {
            if (localStorage.getItem('auth_user') && localStorage.getItem('auth_token') !== null) {
                router.push(`${'/categories/' + category}`);
            } else {
                message.error('Войдите или зарегистрируйтесь чтобы продолжить!');
                router.push('/sign');
            }
        };

        const postsStore = usePostsStore();

        const getPopularCategories = () => {
            
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
        };

        // const getPopularCategoryPosts = () => {
        //     const popularCategories = this.getPopularCategories();
        //     return popularCategories;
        // };

        const filteredAndSortedByCategory = () => {
            const popularCategories = getPopularCategories();

            return postsStore.posts.filter(post => popularCategories.includes(post.category));
        };

        onMounted(() => {
            getPopularCategories();
            filteredAndSortedByCategory();
        });

        return{
            navigateToPost,
            getPopularCategories
        }

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