<template>
    <div>
        <h1 class="registration">Регистрация пользователя</h1>
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

            <a-form-item :name="['user', 'email']" label="Email" :rules="[{ type: 'email' }]">
                <a-input v-model:value="this.FormState.email" />
            </a-form-item>

            <a-form-item
                label="Пароль"
                name="password"
                :rules="[{ required: true, message: 'Please input your password!' }]"
                >
                <a-input-password v-model:value="this.FormState.password" />
            </a-form-item>

            <a-form-item has-feedback label="Confirm" name="checkPass">
                <a-input v-model:value="this.FormState.checkPass" type="password" autocomplete="off" />
            </a-form-item>

            <a-form-item :wrapper-col="{ offset: 8, span: 16 }">
                <a-button type="primary" html-type="submit">Войти</a-button>
            </a-form-item>
        </a-form>
    </div>
</template>

<script>
export default{
    data(){
        return{
            FormState: {
                username: '',
                email: '',
                password: '',
                checkPass: '',
                remember: false
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