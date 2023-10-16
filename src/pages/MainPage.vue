<template>
    <div class="main">
        <create-new-post v-model:show="modalVisible">
            <post-form @create="addPost" :hideModal="hideModal"></post-form>
        </create-new-post>
        <!-- <button @click="showModalCreate">Создать пост</button> -->
        <a-space>
            <a-button @click="showModalCreate">Создать пост</a-button>
        </a-space>
        <posts-list :posts="posts" :delPost="delPost(id)"></posts-list>
    </div>
    
</template>

<script>
import { instance } from "../axios/axiosInstance";
import PostForm from '@/components/PostForm.vue';
import PostsList from '@/components/PostsList.vue';
import CreateNewPost from '@/components/UI/CreateNewPost.vue';
export default{
    components:{
        PostForm, PostsList, CreateNewPost
    },
    data(){
        return{
            modalVisible: false,
            posts: []
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
                    console.log(this.posts);
                });
            }catch(e) {
                alert('Ошибка');
            }
        },
        async addPost(newPost){
            try{
                const post = await instance.post('/posts', {title: newPost.title, body: newPost.body, category: newPost.category})
                .then(response => {
                    console.log(response.data);
                });
            }catch{
                alert('Ошибка');
            }
        },
        async delPost(id){
            try{
                const deletePost = await instance.delete(`/posts/${id}`)
                .then(response => {
                    console.log(response.data);
                });
            }catch{
                alert('Ошибка');
            }
        }
    },
    mounted(){
        this.getPosts();
    }
}
</script>

<style>
.main{
    background-color: aliceblue;
}
a-button{
    background: darkslategray;
}
</style>