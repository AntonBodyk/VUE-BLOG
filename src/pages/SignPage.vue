<template>
    <div>
        <h1 class="sign">Вход в аккаунт</h1>
        <a-form
            :model="this.FormState"
            name="basic"
            :label-col="{ span: 8 }"
            :wrapper-col="{ span: 16 }"
            autocomplete="off"
            style="width: 600px; margin: 100px 0 0 25%;"
            @submit.prevent="loginUser"
            >
            <a-form-item
                label="Имя"
                name="username"
                :rules="[{ required: true, message: 'Please input your username!' }]"
                >
                <a-input v-model:value="this.formState.username" />
            </a-form-item>

            <a-form-item
                label="Пароль"
                name="password"
                :rules="[{ required: true, message: 'Please input your password!' }]"
                >
                <a-input-password v-model:value="this.formState.password" />
            </a-form-item>

            <a-form-item name="remember" :wrapper-col="{ offset: 8, span: 16 }">
                <a-checkbox v-model:checked="this.formState.remember">Запомнить меня</a-checkbox>
            </a-form-item>

            <a-form-item :wrapper-col="{ offset: 8, span: 16 }">
                <a-button type="primary" html-type="submit">Войти</a-button>
            </a-form-item>
        </a-form>
    </div>
   
</template>

<script>
import { instance } from '@/axios/axiosInstance';
import { message } from 'ant-design-vue';
import { useUserStore } from '@/store/user';
export default {
    data(){
        return{
            formState: {
                name: '',
                password: '',
                remember: false
            }
        }
    },
    methods: {
        async loginUser() {
            try {
                const response = await instance.post('/users', {
                    name: this.formState.name,
                    password: this.formState.password,
                });

                // If the server responds with a token
                if (response.data && response.data.token) {
                // Store the token in a store or local storage
                // Redirect to the user's dashboard or perform other actions
                    const token = 'your-auth-token'; // Replace with the actual token

                    // Store the token in the user store
                    const userStore = useUserStore();
                    userStore.setToken(token);
                } else {
                    message.error('Ошибка, вход не выполнен!');
                }
            } catch (error) {
                message.error('Ошибка сервера!');
            }
        },
    }
}
  
</script>

<style scoped>
    h1{
        margin: 50px 0 0 43%;
        font-size: 40px;
        color: darkcyan;
    }
</style>