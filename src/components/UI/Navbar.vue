<template>
    <div class="navbar">
        <div>
            <p>Vue-Blog</p>
        </div>
        <div class="navbar-btns">
            <UserOutlined class="user" @click="showModal"/>
            <a-space wrap>
                <a-button @click="toggleTheme">Сменить цвет</a-button>
            </a-space>
        </div>
        <a-modal v-model:open="open" class="registration" :width="modalWidth">
            <template #footer>
                <a-button style="background: darkcyan; color: white;" class="sign-in" @click="$router.push('/sign'), removeModal()">Войти</a-button>
                <a-button class="sign-up" @click="removeModal()">Выход</a-button>
            </template>
        </a-modal>
    </div>
</template>

<script>
import {UserOutlined} from '@ant-design/icons-vue';
import {useThemeStore} from "@/store/colorStore";
export default{
    components:{
        UserOutlined
    },
    data(){
        return{
            open: false,
            modalWidth: "250px"
        }
    },
    methods:{
        showModal(){
            this.open = true;
        },
        removeModal(){
            this.open = false;
        },
        toggleTheme() {
            const themeStore = useThemeStore();
            themeStore.toggleTheme();
        },
    }
}
</script>

<style scoped>

.navbar{
    height: 50px;
    background-color: darkslategray;
    box-shadow: 2px 2px 4px grey;
    display: flex;
}
.navbar p{
    font-family: 'Pixelify Sans', sans-serif;
    font-size: 40px;
    color: aliceblue;
    padding-left: 100px;
}
.navbar-btns{
    margin: 9px 0 0 50%;
}
.navbar-btns button{
    margin-left: 15px;
}
.user{
    font-size: 20px;
    color: white;
    cursor: pointer;
    padding: 5px 0 0 200px;
}
.sign-in{
    margin-top: 20px;
}
.sign-up{
    margin-right: 30px;
}
</style>