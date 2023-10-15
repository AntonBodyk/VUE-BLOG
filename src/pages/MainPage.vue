<template>
    <create-new-post v-model:show="modalVisible">
        <post-form></post-form>
    </create-new-post>
    <button @click="showModalCreate">Создать пост</button>
    <posts-list></posts-list>
</template>

<script>
import PostForm from '@/components/PostForm.vue';
import PostsList from '@/components/PostsList.vue';
import CreateNewPost from '@/components/UI/CreateNewPost.vue';
export default{
    components:{
        PostForm, PostsList, CreateNewPost
    },
    data(){
        return{
            modalVisible: false
        }
    },
    methods:{
        showModalCreate(){
            this.modalVisible = true;
        }
    }
}
</script>

<style>

</style>