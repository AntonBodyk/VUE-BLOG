<template>
<div v-if="pagedPosts.length > 0">
    <h3>Список постов</h3>
    <create-new-post v-model:open="modalVisible">
        <PostForm :addPost="addPost" />
    </create-new-post>
    <default-button @click="showModalCreate">Создать пост</default-button>
    <default-button @click="userHandler">Привествие</default-button>
    <div :class="{ 'dark-theme': isDarkTheme }" class="post" v-for="post in pagedPosts" :key="post.id">
    <transition-group name="post-list">
        <div @click="navigateToPost(post.id)">
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
    </transition-group>
    <div class="post-icons">
        <div class="post-comment">
            <CommentOutlined class="comment" />
            <span>{{ commentCounts[post.id] || 0 }}</span>
        </div>
        <div class="post-like">
            <LikeOutlined class="like" @click="likePost(post)" />
            <span>{{ post.likes_count }}</span>
        </div>
        <div class="post-dislike" @click="dislikePost(post)">
            <DislikeOutlined class="dislike" />
            <span>{{ post.dislikes_count }}</span>
        </div>
    </div>
    <div v-if="userAuth" class="post-delete">
        <a-space warp>
            <a-button class="delete" @click="removePost(post.id)" danger>Удалить пост</a-button>
        </a-space>
    </div>
    </div>
    <a-pagination class="pagination" :current="currentPage" :total="totalPosts" :defaultPageSize="pageSize" @change="handlePageChange" show-less-items/>
</div>
<h2 class="error" v-else style="color: red">Список постов пуст</h2>
</template>

<script>
import { ref, computed, onMounted, getCurrentInstance } from 'vue';
import { instance } from "../axios/axiosInstance";
import { message } from 'ant-design-vue';
import PostForm from './PostForm.vue';
import CreateNewPost from '@/components/UI/CreateNewPost.vue';
import moment from 'moment';
import { LikeOutlined, DislikeOutlined, CommentOutlined } from '@ant-design/icons-vue';
import LifecycleLoggerMixin from '@/components/mixins/LifecycleHookMixin';
import { useUserStore } from '@/store/user';
import { usePostsStore } from '@/store/postsStore';

export default {
components: {
    LikeOutlined, DislikeOutlined, CommentOutlined, PostForm, CreateNewPost
},
mixins: [LifecycleLoggerMixin],
setup() {
    const isDarkTheme = ref(false);
    const modalVisible = ref(false);
    const pageSize = ref(10);
    const currentPage = ref(1);
    const totalPosts = ref(0);
    const userHello = ref(true);
    const commentCounts = ref({});
    const postsStore = usePostsStore();
    const userStore = useUserStore();
    const router = getCurrentInstance().appContext.config.globalProperties.$router;

    const startIndex = computed(() => (currentPage.value - 1) * pageSize.value);
    const pagedPosts = computed(() => postsStore.posts.slice(startIndex.value, startIndex.value + pageSize.value));
    const clickHandler = computed(() => userHello.value ? showHelloMessage : showGoodbyeMessage);

    const showHelloMessage = () => {
        message.success('Добро пожаловать в мой блог!');
    };

    const showGoodbyeMessage = () => {
        message.error('Всего хорошего!');
    };
    
    const showModalCreate = () => {
        if (localStorage.getItem('auth_user') && localStorage.getItem('auth_token') !== null) {
            modalVisible.value = true;
        } else {
            message.error('Войдите или зарегистрируйтесь, чтобы продолжить!');
            router.push('/sign'); 
        }
    };

    const hideModal = () => {
        modalVisible.value = false;
    };

    const userAuth = computed(() => {
        const auth = useUserStore();
        return auth.user !== null && auth.user.role === 'admin';
    });

    const getPosts = async () => {
        try {
            const [postsResponse, commentsResponse] = await Promise.all([
                instance.get('/posts'),
                instance.get('/comments'),
            ]);

            postsStore.setPosts(postsResponse.data);
            totalPosts.value = postsStore.posts.length;

            const likesData = JSON.parse(localStorage.getItem('likesData')) || {};
            const dislikesData = JSON.parse(localStorage.getItem('dislikesData')) || {};

            postsStore.posts.forEach(post => {
                let likesCount = likesData[post.id];
                let dislikesCount = dislikesData[post.id];

                post.likes_count = likesCount !== undefined ? likesCount : 0;
                post.dislikes_count = dislikesCount !== undefined ? dislikesCount : 0;
            });

            commentsResponse.data.forEach((comment) => {
                const postId = comment.post_id;

                if (commentCounts.value[postId]) {
                    commentCounts.value[postId] += 1;
                } else {
                    commentCounts.value[postId] = 1;
                }
            });

        } catch (error) {
            message.error('Ошибка');
        }
    };

    const addPost = async (newPost) => {
        console.log('Adding post in parent:', newPost);
        try {
            const response = await instance.post('/posts', {
                id: newPost.id,
                title: newPost.title,
                body: newPost.body,
                category: newPost.category,
                user_id: userStore.user.id
            });

            if (response.status === 201) {
                const createdPost = response.data.data;

                createdPost.likes_count = 0;
                createdPost.dislikes_count = 0;

                postsStore.addPost(createdPost);
                message.success('Пост успешно создан.');
                modalVisible.value = false;
            } else {
                message.error('Ошибка при создании поста.');
            }

        } catch {
            message.error('Ошибка');
        }
    };

    const removePost = async (postId) => {
        try {
            const userRole = userStore.user ? userStore.user.role : null;
            if (userRole === 'admin') {
            const deletePost = await instance.delete(`/posts/${postId}`);
            if (deletePost.status === 200) {
                postsStore.removePost(postId);
                message.success('Пост успешно удален');
            } else {
                message.error('Ошибка при удалении поста');
            }
            } else {
                message.error('Вы не являетесь админом!');
                router.push({name: 'NotFoundPage'});
            }
        } catch {
            message.error('Ошибка');
        }
    };

    const likePost = async (post) => {
        if (userStore.user && localStorage.getItem('auth_token') !== null) {
            try {
                const response = await instance.post('/likes', { post_id: post.id, likes: post.likes_count });

                post.likes_count += 1;

                const likesData = JSON.parse(localStorage.getItem('likesData')) || {};
                likesData[post.id] = post.likes_count;
                localStorage.setItem('likesData', JSON.stringify(likesData));

                await instance.put(`/posts/${post.id}`, { likes_count: post.likes_count });

                postsStore.updateLikesCount(post.id, post.likes_count);

            } catch (error) {
                message.error('Ошибка');
            }
        } else {
            message.error('Войдите или зарегистрируйтесь чтобы продолжить!');
            router.push('/sign');
        }
    };

    const dislikePost = async (post) => {
        if (userStore.user && localStorage.getItem('auth_token') !== null) {
            try {
                const response = await instance.post('/likes', { post_id: post.id, dislikes: post.dislikes_count });

                post.dislikes_count += 1;

                const dislikesData = JSON.parse(localStorage.getItem('dislikesData')) || {};
                dislikesData[post.id] = post.dislikes_count;
                localStorage.setItem('dislikesData', JSON.stringify(dislikesData));

                await instance.put(`/posts/${post.id}`, { dislikes_count: post.dislikes_count });

            } catch (error) {
                message.error('Ошибка');
            }
        } else {
            message.error('Войдите или зарегистрируйтесь чтобы продолжить!');
            router.push('/sign');
        }
    };

    const handlePageChange = (page) => {
        currentPage.value = page;
    };

    const formattedDate = (created_at) => {
        return moment(created_at).format("MMMM Do YYYY, h:mm:ss");
    };

    const navigateToPost = (postId) => {
        if (localStorage.getItem('auth_user') && localStorage.getItem('auth_token') !== null) {
            router.push(`/${postId}`);
        } else {
            message.error('Войдите или зарегистрируйтесь чтобы продолжить!');
            router.push('/sign');
        }
    };

    const helloUser = () => {
        message.success('Добро пожаловать в мой блог!');
    };

    const goodbyeUser = () => {
        message.error('Всего хорошего!');
    };

    const userHandler = () => {
        clickHandler.value();
    };

    onMounted(() => {
        getPosts();
    });

    return {
        isDarkTheme,
        modalVisible,
        pageSize,
        currentPage,
        totalPosts,
        userHello,
        commentCounts,
        pagedPosts,
        clickHandler,
        formattedDate,
        helloUser,
        goodbyeUser,
        userHandler,
        navigateToPost,
        addPost,
        removePost,
        likePost,
        dislikePost,
        handlePageChange,
        userAuth,
        showModalCreate,
        hideModal
    };
},
};
</script>

<style scoped>
.error{
    font-size: 30px;
    margin: 25px 0 0 100px;
}
h3{
    font-size: 40px;
    color:darkslategray;
    margin: 30px 0 0 100px;
    padding-top: 30px;
}
.new-post{
    margin: 30px 0 0 100px;
}
.post-title{
    padding: 20px 0 0 20px;
    max-width: 600px;
    color:darkslategray;
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
    padding-left: 20px;
    max-width: 680px;
}

.post-icons{
    display: flex;
    margin: 100px 0 0 20px;
    padding-bottom: 10px;
}
.delete{
    margin-left: 100px;
    margin-top: -20px;
}
.post-comment{
    margin-top: -3px;
}

.post-comment span{
    padding-left: 4px;
}
.post-like{
    margin-left: 20px;
    cursor: pointer;
}
.post-like span{
    padding-left: 4px;
}
.post-dislike{
    margin-left: 20px;
    cursor: pointer;
}
.post-dislike span{
    padding-left: 4px;
}
.comment{
    font-size: 20px;
    cursor: pointer;
}
.post-delete{
    margin: -25px 0 0px 60%;
    padding-bottom: 10px;
    display: flex;
}

.change{
    margin-right: 10px;
}

.dark-theme{
    background-color: #333;
}
.pagination{
    margin: 30px 0 0 100px;
}

.post-create-date{
    margin: 10px 0 10px 20px;
    font-size: 15px;
    color: cadetblue;
}

.post-category{
    margin: 10px 0 10px 20px;
    font-size: 15px;
    color: cornflowerblue;
}

.post-list-enter-active,
.post-list-leave-active {
    transition: all 0.4s ease;
}
.post-list-enter-from,
.post-list-leave-to {
    opacity: 0;
    transform: translateX(130px);
}
.post-list-move {
    transition: transform 0.8s ease;
}
</style>
