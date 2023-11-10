<template>
<div>
    <h1 class="registration">Регистрация пользователя</h1>
    <a-form
    :model="registrationState"
    name="basic"
    ref="formRef"
    :label-col="{ span: 8 }"
    :wrapper-col="{ span: 16 }"
    autocomplete="off"
    style="width: 600px; margin: 100px 0 0 25%;"
    @submit.prevent="registrationUser"
    >
        <a-form-item
            label="Имя"
            name="username"
            :rules="[
            { required: true, message: 'Пожалуйста, введите имя!' },
            {
                validator: validateName,
            },
            ]"
        >
            <a-input v-model:value="registrationState.username" />
        </a-form-item>

        <a-form-item name="email" label="Email" :rules="[
            { required: true, message: 'Пожалуйста, введите адрес электронной почты!' },
            { type: 'email', message: 'Неверный формат электронной почты!' },
            { validator: validateEmail },
        ]">
            <a-input v-model:value="registrationState.email" @input="clearEmailValidation" />
        </a-form-item>

        <a-form-item
            label="Пароль"
            name="password"
            :rules="[
            { required: true, message: 'Пожалуйста, введите пароль!' },
            {
                pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/,
                message: 'Пароль должен содержать хотя бы одну большую букву, одну строчную букву, одну цифру и иметь длину не менее 8 символов!',
            },
            ]"
        >
            <a-input-password v-model:value="registrationState.password" />
        </a-form-item>

        <a-form-item has-feedback
            label="Confirm"
            name="checkPass"
            :rules="[
            { required: true, message: 'Please input your password!' },
            {
                validator: validatePasswordMatch,
            },
            ]">
            <a-input v-model:value="registrationState.checkPass" type="password" autocomplete="off" />
        </a-form-item>

        <a-form-item :wrapper-col="{ offset: 8, span: 16 }">
            <a-button type="primary" html-type="submit">Зарегистрироваться</a-button>
        </a-form-item>
    </a-form>
</div>
</template>

<script>
import { ref, getCurrentInstance } from 'vue';
import { instance } from '@/axios/axiosInstance';
import { message } from 'ant-design-vue';


export default {
setup() {
    const registrationState = ref({
        username: '',
        email: '',
        password: '',
        checkPass: '',
    });
    const formRef = ref(null);
    const router = getCurrentInstance().appContext.config.globalProperties.$router;

    const registrationUser = async () => {
        try {
            const registration = await instance.post('/users', {
                name: registrationState.value.username,
                email: registrationState.value.email,
                password: registrationState.value.password,
            });

            await formRef.value.validate();
            console.log('Validation passed, sending API request...');

            console.log('API request succeeded:', registration.data);

            registrationState.value = {
                username: '',
                email: '',
                password: '',
                checkPass: '',
            };

            message.success('Регистрация прошла успешно');
            router.push('/sign');
        } catch (error) {
            console.error('Error during API request:', error);
            message.error('Ошибка при регистрации!');
        }
    };

    const validateName = (rule, value) => {
        if (value) {
            const namePattern = /^[А-ЯA-Z][а-яА-ЯA-Za-z]*$/;
            const containsNumber = /\d/.test(value);

            if (!containsNumber && namePattern.test(value)) {
                return Promise.resolve();
            } else {
                return Promise.reject('Имя должно начинаться с большой буквы и не содержать чисел!');
            }
        } else {
            return Promise.resolve();
        }
    };

    const validateEmail = (rule, value) => {
        if (value) {
            const emailPattern = /@/;

            if (emailPattern.test(value)) {
                return Promise.resolve();
            } else {
                return Promise.reject('Адрес электронной почты должен содержать символ "@"!');
            }
        } else {
            return Promise.resolve();
        }
    };

    const clearEmailValidation = () => {
        formRef.value.clearValidate('user.email');
    };

    const validatePasswordMatch = (rule, value) => {
        if (value !== registrationState.value.password) {
            return Promise.reject('Пароли не совпадают!');
        }
        return Promise.resolve();
    };

    return {
        formRef,
        registrationState,
        registrationUser,
        validateName,
        validateEmail,
        clearEmailValidation,
        validatePasswordMatch,
    };
},
};
</script>
 
  
  
  
  
  
  

<style scoped>
    h1{
        margin-top: 50px;
        margin-left: 34%;
        font-size: 40px;
        color: darkcyan;
    }
</style>