<template>
<div>
    <div v-if="postNotFound">
        <not-found-page></not-found-page>
    </div>
    <div v-else>
        <div class="post-page">
            <div v-if="post" class="post">
            <h2 class="post-title">{{ post.title }}</h2>
            <div class="post-create-date">
                Дата создания поста: {{ formattedDate(post.created_at) }}
            </div>
            <div class="post-category">
                Тема: {{ post.category }}
            </div>
            <div class="post-body">
                <p>{{ post.body }}</p>
            </div>
            </div>

            <comments :postId="$route.params.id" :commentsArray="commentsArray"></comments>
        </div>
    </div>
</div>
</template>

<script>
import { ref, onMounted } from 'vue';
import Comments from '@/components/Comments.vue';
import NotFoundPage from './NotFoundPage.vue';
import { instance } from '@/axios/axiosInstance';
import moment from 'moment';
import { useRoute } from 'vue-router';

export default {
components: {
    Comments,
    NotFoundPage,
},
setup() {
    const post = ref({});
    const commentsArray = ref([]);
    const postNotFound = ref(false);
    const route = useRoute();

    const getPost = async (id) => {
        try {
            const [postResponse, commentsResponse] = await Promise.all([
                instance.get(`/posts/${id}`),
                instance.get(`/comments/${id}`),
            ]);

            console.log(commentsResponse.data)
            post.value = postResponse.data;
            commentsArray.value = commentsResponse.data;
        } catch (error) {
            if (error.response && error.response.status === 404) {
                postNotFound.value = true;
            } else {
                console.error('Error fetching post data', error);
            }
        }
    };

    const formattedDate = (created_at) => {
        return moment(created_at).format('MMMM Do YYYY, h:mm:ss');
    };

    onMounted(() => {
        getPost(route.params.id);
    });

    return {
        post,
        commentsArray,
        postNotFound,
        formattedDate,
    };
},
};
</script>

<style scoped>
.post-page{
    background-color: aliceblue;
    padding-top: 50px;
    min-height: 700px;
}

h1{
    padding: 20px 0 0 100px;
    color: darkcyan;
}

.post{
    width: 700px;
    max-height: 600px;
    background-color: white;
    border-radius: 10px;
    margin-left: 27%;
    padding-left: 10px;
    cursor: pointer;
    margin-bottom: 30px;
    box-shadow: 4px 4px 4px 4px rgba(0, 0, 0, 0.2), 0 25px 50px 0 rgba(0, 0, 0, 0.1);
}
.post h2{
    padding: 10px 0 0 10px;
}
.post-body{
    max-width: 680px;
    padding: 10px 0 10px 10px;
}

.post-category{
    padding: 10px 0 0 10px;
    font-size: 15px;
    color: cornflowerblue;
}

.post-create-date{
    margin: 10px 0 10px 10px;
    font-size: 15px;
    color: cadetblue;
}
</style>

