<template>
    <div class="main" :style="{ backgroundColor: themeColor }">
        <posts-list></posts-list>
        <sidebar @change-color="updateBgColor"></sidebar>
        <another-sidebar></another-sidebar>
    </div>
</template>

<script>
import PostsList from '@/components/PostsList.vue';
import Sidebar from "@/components/Sidebar.vue";
import AnotherSidebar from '@/components/AnotherSidebar.vue';
import {useThemeStore} from "@/store/colorStore";
import { computed } from 'vue';
export default{
    components:{
        PostsList, Sidebar, AnotherSidebar
    },
    setup() {
        const themeStore = useThemeStore();
        const themeColor = computed(() => themeStore.getThemeColor);

        return { themeColor };
    },
}
</script>

<style>
    .main{
        background-color: aliceblue;
        display: flex;
    }
    .dark-theme{
        background-color: #333;
    }

</style>