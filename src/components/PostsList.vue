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
                <div class="post-icons">
                    <div class="post-comment">
                        <a href="#"><CommentOutlined class="comment"/></a>
                        <span>0</span>
                    </div>
                    <div class="post-like">
                        <LikeOutlined class="like"/>
                        <span>0</span>
                    </div>
                    <div class="post-dislike">
                        <DislikeOutlined class="dislike"/>
                        <span>0</span>
                    </div>
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
            pageSize: 10,
            currentPage: 1,
            totalPosts: 0
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
                const response = await instance.get('/posts')
                .then(response =>{
                    this.posts = response.data;
                    this.totalPosts = this.posts.length;
                    console.log(this.posts);
                });
            }catch(e) {
                message.error('Ошибка');
            }
        },
        async addPost(newPost){
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
        // Handle page change event from Ant Design Vue Pagination
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
        // Get the posts for the current page
        pagedPosts() {
            return this.posts.slice(this.startIndex, this.startIndex + this.pageSize);
        }
    },
    mounted(){
        this.getPosts();
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
