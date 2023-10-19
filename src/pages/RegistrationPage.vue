<template>
    <div>
        <h1 class="registration">Регистрация пользователя</h1>
        <a-form
            :model="this.registrationState"
            name="basic"
            :label-col="{ span: 8 }"
            :wrapper-col="{ span: 16 }"
            autocomplete="off"
            style="width: 600px; margin: 100px 0 0 25%;"
            @submit.prevent="registrationUser"
            >
            <a-form-item
                label="Имя"
                name="username"
                :rules="[{ required: true, message: 'Please input your username!' }]"
                >
                <a-input v-model:value="this.registrationState.username" />
            </a-form-item>

            <a-form-item :name="['user', 'email']" label="Email" :rules="[{ type: 'email' }]">
                <a-input v-model:value="this.registrationState.email" />
            </a-form-item>

            <a-form-item
                label="Пароль"
                name="password"
                :rules="[{ required: true, message: 'Please input your password!' }]"
                >
                <a-input-password v-model:value="this.registrationState.password" />
            </a-form-item>

            <a-form-item has-feedback label="Confirm" name="checkPass">
                <a-input v-model:value="this.registrationState.checkPass" type="password" autocomplete="off" />
            </a-form-item>

            <a-form-item :wrapper-col="{ offset: 8, span: 16 }">
                <a-button type="primary" html-type="submit">Зарегистрироваться</a-button>
            </a-form-item>
        </a-form>
    </div>
</template>

<script>
import { instance } from '@/axios/axiosInstance';
import { message } from 'ant-design-vue';
export default{
    data(){
        return{
            registrationState: {
                username: '',
                email: '',
                password: '',
                checkPass: '',
                remember: false
            }
        }
    },
    methods:{
        async registrationUser(){
            try{
                const registration = await instance.post('/users', {name: this.registrationState.username, email: this.registrationState.email, password: this.registrationState.password})
                .then(response => {
                    console.log(response.data);

                    this.registrationState = {
                        username: '',
                        email: '',
                        password: '',
                        checkPass: '',
                        remember: false
                    }
                    
                    message.info('Регистрация прошла успешно');
                })
            }catch{
                message.error('Ошибка при регистрации!');
            }
        }
        
    }
}
</script>

<style scoped>
    h1{
        margin-top: 50px;
        margin-left: 34%;
        font-size: 40px;
        color: darkcyan;
    }
</style>