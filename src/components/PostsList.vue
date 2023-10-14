<template>
    <div v-if="posts.length > 0">
        <h3>Список постов</h3>
        <!-- <div class="post" v-for="post in posts">
            <div>Название: {{ post.title }}</div>
            <div>Описание: {{ post.body }}</div>
        </div> -->
    </div>
    <h2 v-else style="color: red">Список постов пуст</h2>
    <!-- <div v-show="posts.length > 0">
        <h3>Список постов</h3>
    </div> -->
</template>

<script>
export default{
    data(){
        return{
            posts: []
        }
    },
    methods: {
        async getPosts() {
                    try {
                        // this.isPostsLoading = true;
                        const response = await axios.get('http://api-laravel-project/api/V1/posts');
                            // params: {
                            //     _page: this.page,
                            //     _limit: this.limit
                            // }
                        
                        // this.totalPages = Math.ceil(response.headers['x-total-count'] / this.limit); //-------Округляет число в большую сторону
                        this.posts = response;
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

h2{
    font-family: serif;
    margin: 20px 0 0 100px;
}
</style>
