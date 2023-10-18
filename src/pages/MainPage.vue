<template>
    <div class="main">
        <posts-list></posts-list>
        <sidebar></sidebar>
    </div>
</template>

<script>
import PostsList from '@/components/PostsList.vue';
import Sidebar from "@/components/Sidebar.vue";
export default{
    components:{
        PostsList, Sidebar
    }
}
</script>

<style>
    .main{
        background-color: aliceblue;
        display: flex;
    }

</style>