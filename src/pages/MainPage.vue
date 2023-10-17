<template>
    <div class="main">
        <posts-list></posts-list>
    </div>
</template>

<script>
import PostsList from '@/components/PostsList.vue';
export default{
    components:{
        PostsList
    }
}
</script>

<style>
.main{
    background-color: aliceblue;
    margin-top: -25px;
}

</style>