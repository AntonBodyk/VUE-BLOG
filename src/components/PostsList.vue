<template>
    <div v-if="posts.length > 0">
        <h3>Список постов</h3>
        <create-new-post v-model:open="modalVisible">
            <post-form @create="addPost" :hideModal="hideModal" :posts="posts"></post-form>
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
                        <CommentOutlined class="comment"/>
                        <span>{{ this.comments.length }}</span>
                    </div>
                    <div class="post-like">
                        <LikeOutlined class="like" @click="likePost(post)"/>
                        <span>{{ post.likes_count }}</span>
                    </div>
                    <div class="post-dislike" @click="dislikePost(post)">
                        <DislikeOutlined class="dislike"/>
                        <span>{{ post.dislikes_count }}</span>
                    </div>
                </div>
            <div class="post-delete">
                <a-space warp>
                    <a-button class="change" @click="toggleColor" type="primary" ghost>Сменить цвет</a-button>
                </a-space>
                <a-space warp>
                    <a-button class="delete" @click="removePost(post.id)" danger>Удалить пост</a-button>
                </a-space>
            </div>
            
            
        </div>
        <a-pagination class="pagination" :current="currentPage" :total="totalPosts"  :defaultPageSize="pageSize" @change="handlePageChange"  show-less-items/>
    </div>
    <h2 class="error" v-else style="color: red">Список постов пуст</h2>
    <!-- <div v-show="posts.length > 0">
        <h3>Список постов</h3>
    </div> -->
</template>

<script>
import { instance } from "../axios/axiosInstance";
import { message } from 'ant-design-vue';
import PostForm from './PostForm.vue';
import CreateNewPost from '@/components/UI/CreateNewPost.vue';
import moment from 'moment';
import {LikeOutlined, DislikeOutlined, CommentOutlined} from '@ant-design/icons-vue';
import { useCommentStore } from '@/store/commentStore';
import LifecycleLoggerMixin from '@/components/mixins/LifecycleHookMixin';

export default{
    components:{
        LikeOutlined, DislikeOutlined, CommentOutlined, PostForm, CreateNewPost
    },
    mixins: [LifecycleLoggerMixin],
    data(){
        return{
            isDarkTheme: false,
            modalVisible: false,
            posts: [],
            dateArray: [],
            pageSize: 10,
            currentPage: 1,
            totalPosts: 0,
            userHello: true,
            componentData: 'Данные компонента',
            comments: []
        }
    },
    methods:{
        showModalCreate(){
            if(localStorage.getItem('auth_user') && localStorage.getItem('auth_token') !== null){
                this.modalVisible = true;
            }else{
                message.error('Войдите или зарегистрируйтесь чтобы продолжить!');
                window.location.href = '#/sign';
            }
        },
        hideModal(){
            this.modalVisible = false;
        },
        toggleColor() {
            this.isDarkTheme = !this.isDarkTheme;
        },
        navigateToPost(postId) {
            if (localStorage.getItem('auth_user') && localStorage.getItem('auth_token') !== null) {
                this.$router.push(`/${postId}`);
            } else {
                message.error('Войдите или зарегистрируйтесь чтобы продолжить!');
                window.location.href = '#/sign';
            }
        },
        async getPosts() {
            try {
                const [postsResponse, likesResponse] = await Promise.all([
                    instance.get('/posts'),
                    instance.get('/likes'),
                ]);
                
                this.posts = postsResponse.data;
                this.totalPosts = this.posts.length;

                const likesData = JSON.parse(localStorage.getItem('likesData')) || {};
                const dislikesData = JSON.parse(localStorage.getItem('dislikesData')) || {};

                this.posts.forEach(post => {
                    let likesCount = likesData[post.id];
                    let dislikesCount = dislikesData[post.id];
                    
                    post.likes_count = likesCount !== undefined ? likesCount : 0;
                    post.dislikes_count = dislikesCount !== undefined ? dislikesCount : 0;
                });

                console.log(postsResponse);
            } catch (error) {
                message.error('Ошибка'); 
            }
        },
        async addPost(newPost){
                    try{
                        const response = await instance.post('/posts', {
                            title: newPost.title,
                            body: newPost.body,
                            category: newPost.category,
                        });

                        if (response.status === 201) { 
                            const createdPost = response.data.data;


                            createdPost.likes_count = 0;
                            createdPost.dislikes_count = 0;

                            this.posts.push(createdPost); 
                            message.success('Пост успешно создан.');
                        } else {
                            message.error('Ошибка при создании поста.');
                        }
                    }catch{
                        message.error('Ошибка');
                    }
                
                this.modalVisible = false;
        },
        async removePost(postId){
            try{
                const deletePost = await instance.delete(`/posts/${postId}`)
                if (deletePost.status === 200) {
                    this.posts = this.posts.filter(post => post.id !== postId);
                    message.success('Пост успешно удален');
                } else {
                    message.error('Ошибка при удалении поста');
                }

            }catch{
                message.error('Ошибка');
            }
        },
        async likePost(post) {
            try {
                
                const response = await instance.post('/likes', {post_id: post.id, likes: post.likes_count});
                
                post.likes_count += 1;

                const likesData = JSON.parse(localStorage.getItem('likesData')) || {};
                likesData[post.id] = post.likes_count;
                localStorage.setItem('likesData', JSON.stringify(likesData));

                await instance.put(`/posts/${post.id}`, { likes_count: post.likes_count });
                
            } catch (error) {
                message.error('Ошибка');
            }
        },
        async dislikePost(post) {
            try {
                
                const response = await instance.post('/likes', {post_id: post.id, dislikes: post.dislikes_count});
                
                post.dislikes_count += 1;

                const dislikesData = JSON.parse(localStorage.getItem('dislikesData')) || {};
                dislikesData[post.id] = post.dislikes_count;
                localStorage.setItem('dislikesData', JSON.stringify(dislikesData));

                await instance.put(`/posts/${post.id}`, { dislikes_count: post.dislikes_count });
                
            } catch (error) {
                message.error('Ошибка');
            }
        },
        handlePageChange(page) {
            this.currentPage = page;
        },
        formattedDate(created_at){
            return moment(created_at).format("MMMM Do YYYY, h:mm:ss");
        },
        helloUser(){
            message.success('Добро пожаловать в мой блог!');
        },
        goodbyeUser(){
            message.error('Всего хорошего!');
        },
        userHandler(){
            this.clickHandler();
        },
        commentCount(post) {
            const commentStore = useCommentStore();
            return commentStore.getCommentCount(post.id);
        },
    },
    computed:{
        startIndex() {
            return (this.currentPage - 1) * this.pageSize;
        },
        pagedPosts() {
            return this.posts.slice(this.startIndex, this.startIndex + this.pageSize);
        },
        clickHandler() {
            return this.userHello ? this.helloUser : this.goodbyeUser;
        },
        combinedData() {
            return `${this.mixinData} - ${this.componentData}`;
        },
        
    },
    mounted(){
        this.getPosts();
    },
}
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
    /* text-decoration: none; */
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
