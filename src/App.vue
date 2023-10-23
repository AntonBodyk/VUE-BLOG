<template>
    <div class="app">
        <navbar :toggleTheme="toggleTheme"></navbar>
        <router-view></router-view>
        <main-page></main-page>
    </div>
    
</template>

<script>
import Navbar from './components/UI/Navbar.vue';

export default{
    components:{
        Navbar
    }
    
}
</script>

<style>
*{
    margin: 0;
    padding: 0;
}

</style>