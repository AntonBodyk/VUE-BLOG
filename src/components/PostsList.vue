<template>
    <div v-if="posts.length > 0">
        <h3>Список постов</h3>
        <create-new-post v-model:open="modalVisible">
            <post-form @create="addPost" :hideModal="hideModal" :posts="posts"></post-form>
        </create-new-post>
        <a-space>
            <a-button class="new-post" @click="showModalCreate" style="width: 150px; height: 40px;">Создать пост</a-button>
        </a-space>
        <div class="post" v-for="post in pagedPosts" :key="post.id">
            <div @click="$router.push(`/${post.id}`)">
                <h2 class="post-title">{{ post.title }}</h2>
                <div class="post-create-date">
                Дата создания поста: {{ formattedDate(post.created_at) }}
                </div>
                    <div class="post-body">
                    <p>{{ post.body }}</p>
                </div>
            </div>
            <div class="post-icons">
                    <div class="post-comment">
                        <a href="#"><CommentOutlined class="comment"/></a>
                        <span>0</span>
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

export default{
    components:{
        LikeOutlined, DislikeOutlined, CommentOutlined, PostForm, CreateNewPost
    },
    data(){
        return{
            modalVisible: false,
            posts: [],
            dateArray: [],
            likes: 0,
            pageSize: 10,
            currentPage: 1,
            totalPosts: 0,
        }
    },
    methods:{
        showModalCreate(){
            this.modalVisible = true;
        },
        hideModal(){
            this.modalVisible = false;
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
                    // If likesCount exists in local storage, use it; otherwise, default to 0
                    post.likes_count = likesCount !== undefined ? likesCount : 0;
                    post.dislikes_count = dislikesCount !== undefined ? dislikesCount : 0;
                });

                console.log(postsResponse);
            } catch (error) {
                message.error('Ошибка'); 
            }
        },
        // async getPosts() {
        //     try {
                
        //        const post =  await instance.get('/posts')
        //         .then(response =>{
        //             this.posts = response.data;
        //             this.totalPosts = this.posts.length;
        //             console.log(response);
        //         });
        //     }catch(e) {
        //         message.error('Ошибка');
        //     }
        // },
        async addPost(newPost){
                console.log(newPost.body);
                if(newPost.title && newPost.body && newPost.category !== ''){
                    try{
                        const post = await instance.post('/posts', {title: newPost.title, body: newPost.body, category: newPost.category})
                        .then(response => {
                            console.log(response.data);
                            this.posts = response.data;
                        })
                        .finally(() => {
                            this.modalVisible = false;
                        });
                    }catch{
                        message.error('Ошибка');
                    }
                }else{
                    message.error('Заполните данные');
                }

        },
        async removePost(postId){
            try{
                const deletePost = await instance.delete(`/posts/${postId}`)
                .then(response =>{
                    console.log(response.data);
                    this.posts = response.data;
                })

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
    },
    computed:{
        startIndex() {
            return (this.currentPage - 1) * this.pageSize;
        },
        pagedPosts() {
            return this.posts.slice(this.startIndex, this.startIndex + this.pageSize);
        },
        
    },
    mounted(){
        this.getPosts();
        
        // const likesData = JSON.parse(localStorage.getItem('likesData')) || {};

        // this.posts.forEach(post => {
        //     post.likes_count = likesData[post.id] || 0;
        // });
    }
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
    /* margin-top: -15px; */
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
    /* padding-left: 20px; */
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
    margin: -25px 0 0px 75%;
    padding-bottom: 10px;
}
.pagination{
    margin: 30px 0 0 100px;
}

.post-create-date{
    margin: 10px 0 10px 20px;
    font-size: 15px;
    color: cadetblue;
}

</style>
