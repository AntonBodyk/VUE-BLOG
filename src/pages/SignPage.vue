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
            >
            <a-form-item
                label="Имя"
                name="username"
                :rules="[{ required: true, message: 'Please input your username!' }]"
                >
                <a-input v-model:value="this.FormState.username" />
            </a-form-item>

            <a-form-item
                label="Пароль"
                name="password"
                :rules="[{ required: true, message: 'Please input your password!' }]"
                >
                <a-input-password v-model:value="this.FormState.password" />
            </a-form-item>

            <a-form-item name="remember" :wrapper-col="{ offset: 8, span: 16 }">
                <a-checkbox v-model:checked="this.FormState.remember">Запомнить меня</a-checkbox>
            </a-form-item>

            <a-form-item :wrapper-col="{ offset: 8, span: 16 }">
                <a-button type="primary" html-type="submit">Войти</a-button>
            </a-form-item>
        </a-form>
    </div>
   
</template>

<script>
export default {
    data(){
        return{
            FormState: {
                username: '',
                password: '',
                remember: false
            }
        }
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