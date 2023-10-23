<template>
    <h1>Комментарии к посту: {{ $route.params.id }}</h1>
    <comments></comments>
</template>

<script>
import Comments from '@/components/Comments.vue';
export default {
    components:{
        Comments
    }
}
</script>

<style scoped>
h1{
    margin: 20px 0 0 100px;
    color: darkcyan;
}
</style>

