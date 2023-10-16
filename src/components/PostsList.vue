<template>
    <div v-if="posts.length > 0">
        <h3>Список постов</h3>
        <div class="post" v-for="post in posts" :key="post.id">
            <h2 class="post-title">{{ post.title }}</h2>
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
                <div class="post-delete">
                    <a-space warp>
                        <a-button class="delete" @click="delPost(id)" danger>Удалить пост</a-button>
                    </a-space>
                </div>
            </div>
            <!-- <div>Название: {{ post.title }}</div>
            <div>Описание: {{ post.body }}</div> -->
        </div>
        
    </div>
    <h2 v-else style="color: red">Список постов пуст</h2>
    <!-- <div v-show="posts.length > 0">
        <h3>Список постов</h3>
    </div> -->
</template>

<script>

import {LikeOutlined, DislikeOutlined, CommentOutlined} from '@ant-design/icons-vue';
export default{
    props:{
        posts:{
            type: Array,
            required: true
        },
        delPost:{
            type: Function,
            required: true
        }
    },
    components:{
        LikeOutlined, DislikeOutlined, CommentOutlined
    }
}
</script>

<style scoped>

h3{
    font-size: 40px;
    color:darkslategray;
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
.post-like{
    margin-left: 20px;
    cursor: pointer;
}
.post-dislike{
    margin-left: 20px;
    cursor: pointer;
}
.comment{
    font-size: 20px;
    cursor: pointer;
    /* text-decoration: none; */
}
.post-delete{
    margin: 0 0 10px 60%;
}


</style>
