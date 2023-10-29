<template>
    <div>
        <h1>Страница поста: {{ $route.params.id }}</h1>
        <div class="post">
                <h2 class="post-title">{{ post.title }}</h2>
                <!-- <div class="post-create-date">
                    Дата создания поста: {{ formattedDate(post.created_at) }}
                </div> -->
                <h3>{{ post.id }}</h3>
                <div class="post-category">
                    Тема: {{ post.category }}
                </div>
                    <div class="post-body">
                    <p>{{ post.body }}</p>
                </div>
            </div>
        
        <comments :postId="$route.params.id" :commentsResponse="commentsResponse"></comments>
    </div>
</template>

<script>
import Comments from '@/components/Comments.vue';
import { instance } from '@/axios/axiosInstance';
// import moment from 'moment';
export default {
    components:{
        Comments
    },
    data() {
        return {
            post: {},
            commentsResponse: {}
        };
    },
    methods:{
        async getPost(id){
            try {
                
                const [postResponse, commentsResponse] = await Promise.all([
                    instance.get(`/posts/${id}`),
                    instance.get(`/comments/${id}`),
                ]);
                this.post = postResponse.data.data;
                console.log(this.post)
                this.commentsResponse = commentsResponse.data;
                console.log(commentsResponse.data)
            } catch (error) {
                console.error('Error fetching post data', error);
            }
        },
        // formattedDate(created_at){
        //     return moment(created_at).format("MMMM Do YYYY, h:mm:ss");
        // }
    },
    created() {
        this.getPost(this.$route.params.id);
    }
}
</script>

<style scoped>
h1{
    margin: 20px 0 0 100px;
    color: darkcyan;
}

.post{
    width: 700px;
    max-height: 500px;
    background-color: white;
    border-radius: 10px;
    margin: 20px 0 0 100px;
    cursor: pointer;
}
.post-body{
    max-width: 680px;
}

.post-category{
    margin: 10px 0 10px 0px;
    font-size: 15px;
    color: cornflowerblue;
}
</style>

